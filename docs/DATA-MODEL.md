# Datový model IKI (Data Model Documentation)

Tento dokument detailně popisuje datové entity, význam polí, jednotky, vazby a životní cyklus dat v aplikaci IKI. Schéma odpovídá TypeScript kontraktu v [`contracts/iki.ts`](file:///c:/xampp/htdocs/ikigai/contracts/iki.ts) a JSON schématům v [`contracts/`](file:///c:/xampp/htdocs/ikigai/contracts/).

---

## 1. Principy a formáty hodnot

1. **Kalendářní datum vs. Časový okamžik:**
   * **Datum (`IsoDateString`):** `YYYY-MM-DD` (např. `"2026-10-10"`). Reprezentuje lokální kalendářní den v uživatelem nastaveném časovém pásmu. Nesmí obsahovat časovou složku.
   * **Časový okamžik (`IsoTimestampString`):** `ISO 8601 UTC` s příponou `Z` (např. `"2026-10-10T18:45:12.000Z"`). Určuje přesný globální moment události.
2. **Časové pásmo (`timeZone`):**
   * IANA řetězec zadaný aplikací (např. `"Europe/Prague"`). Jádro se nespoléhá na lokální čas serveru.
3. **Stabilní identifikátory:**
   * Všechny vazby mezi entitami používají stabilní ID řetězce (např. `exp_tvorba_01`, `hyp_struktura_99`), nikoliv textové názvy.
4. **Subjektivní energie (Semafor):**
   * Hodnoty: `"energized"` (zelená), `"neutral"` (oranžová/žlutá), `"drained"` (červená).
   * Reprezentuje čistě subjektivní pocit uživatele z kontextu, nikoliv měření osobní zdatnosti nebo objektivní pravdu.

---

## 2. Přehled entit a polí

### `UserProfile`
* `userId`: string, povinné — unikátní ID uživatele.
* `ownerType`: `"anonymous" | "authenticated"`, povinné — pilot začíná v anonymním lokálním režimu s možností pozdějšího spárování.
* `timeZone`: string, povinné — např. `"Europe/Prague"`.
* `dataSchemaVersion`: string, povinné — verze schématu (`"1.0.0"`).
* `contentVersion`: string, povinné — verze katalogu (`"2026-10-09"`).

### `UserExperience`
* `id`: string, povinné — ID záznamu.
* `userId`: string, povinné — vazba na uživatele.
* `promptQuestionId`: string, povinné — identifikátor otázky (např. `"q_flow_moment"`).
* `responseContent`: string | null — text odpovědi; `null` pokud byla otázka přeskočena.
* `isSkipped`: boolean, povinné — explicitní příznak přeskočení (žádné domýšlení).
* `recordedAt`: IsoTimestampString, povinné.

### `DirectionHypothesis`
* `id`: string, povinné — ID hypotézy.
* `userId`: string, povinné.
* `title`: string, povinné — krátký název směru.
* `description`: string, povinné — vysvětlení směru.
* `evidenceIds`: string[], povinné — seznam ID z `UserExperience`, ze kterých hypotéza přímo čerpá.
* `alternativeExplanation`: string, volitelné — proti-hypotéza.
* `status`: `"draft" | "confirmed" | "rejected" | "customized"`, povinné.
* `userNotes`: string, volitelné — uživatelská úprava.

### `CatalogExperiment`
* `id`: string, povinné — např. `"exp_01"`.
* `code`: string, povinné — např. `"EXP-01"`.
* `title`: string, povinné.
* `summary`: string, povinné.
* `instructions`: string, povinné.
* `estimatedMinutes`: integer (1–120), povinné — jednotka: minuty.
* `tags`: string[], povinné.
* `variants`: ExperimentVariant[], povinné — zkrácené verze (min. 1 Kaizen 5minutová varianta).

### `PlannedExperiment`
* `id`: string, povinné.
* `userId`: string, povinné.
* `experimentId`: string, povinné — vazba na `CatalogExperiment.id`.
* `hypothesisId`: string, povinné — vazba na `DirectionHypothesis.id`.
* `variantId`: string, volitelné — vazba na konkrétní variantu pokusu.
* `targetDate`: IsoDateString, povinné — den, pro který je pokus naplánován.
* `result`: ExperimentResult, volitelné — přítomno po vyhodnocení pokusu.

### `RestEntry`
* `id`: string, povinné.
* `userId`: string, povinné.
* `date`: IsoDateString, povinné — kalendářní den odpočinku.
* `note`: string, volitelné — poznámka o kontextu dne (přesčas, únava).

### `VisualMemory`
* `id`: string, povinné.
* `userId`: string, povinné.
* `itemId`: string, povinné — grafický identifikátor předmětu dílny.
* `title`: string, povinné.
* `originExperimentId`: string, povinné — vazba na dokončený pokus v realitě.

---

## 3. Pravidla vlastnictví, exportu, smazání a migrace

1. **Vlastnictví dat:**
   * Veškerá data o pokusech a reflexích patří výhradně uživateli.
   * V pilotní verzi jsou data uložena v lokálním úložišti (`localStorage` / IndexedDB) a synchronizována pouze v rámci schválené relace.
2. **Export dat:**
   * Aplikace poskytuje export celé struktury `JourneyState` do formátu JSON a Karty průzkumníka do formátu HTML/PDF.
3. **Smazání dat (Právo na výmaz):**
   * Uživatel může kdykoliv smazat celý svůj profil a historii jedním kliknutím v nastavení. Smazání lokálně vyprázdní úložiště a odešle požadavek na výmaz serverových záloh.
4. **Verzování a budoucí migrace:**
   * Pole `dataSchemaVersion` umožňuje transformaci starších stavů při vydání nových verzí. Migrační funkce běží na straně klienta při načtení stavu.

---

## 4. Tři syntetické příklady

### Příklad 1: Zkušenost z onboarding rozhovoru a vytvořená hypotéza
```json
{
  "experience": {
    "id": "exp_user_01",
    "userId": "usr_pilot_42",
    "promptQuestionId": "q_flow_moment",
    "responseContent": "Pomáhal jsem kolegovi překopat chaotickou tabulku rozpočtu do přehledného dashboardu.",
    "isSkipped": false,
    "recordedAt": "2026-10-10T08:15:00.000Z"
  },
  "hypothesis": {
    "id": "hyp_struktura_01",
    "userId": "usr_pilot_42",
    "title": "Tvorba struktury pro druhé",
    "description": "Zkoumat, jak vytvářet přehledné systémy, které druhým lidem šetří nervy a čas.",
    "evidenceIds": ["exp_user_01"],
    "alternativeExplanation": "Může jít spíše o radost z osobního kontaktu 1 na 1 než o samotný systém.",
    "status": "confirmed",
    "createdAt": "2026-10-10T08:16:30.000Z",
    "updatedAt": "2026-10-10T08:17:00.000Z"
  }
}
```

### Příklad 2: Plánovaný pokus se zkrácenou variantou a reflexí
```json
{
  "id": "plan_exp_102",
  "userId": "usr_pilot_42",
  "experimentId": "exp_01",
  "hypothesisId": "hyp_struktura_01",
  "variantId": "var_5min_sketch",
  "targetDate": "2026-10-11",
  "result": {
    "status": "completed",
    "reflection": {
      "energy": "energized",
      "notes": "Kreslení schématu na papír mě chytlo, trvalo to jen 10 minut a hned jsem měl jasněji.",
      "reflectedAt": "2026-10-11T19:20:00.000Z"
    },
    "completedAt": "2026-10-11T19:20:00.000Z"
  },
  "createdAt": "2026-10-10T08:20:00.000Z",
  "updatedAt": "2026-10-11T19:20:00.000Z"
}
```

### Příklad 3: Záznam odpočinkového dne a reprezentace v kalendáři
```json
{
  "restEntry": {
    "id": "rest_103",
    "userId": "usr_pilot_42",
    "date": "2026-10-12",
    "note": "Náročný pracovní den a přesčas. Vědomá pauza na dočerpání sil.",
    "recordedAt": "2026-10-12T20:05:00.000Z"
  },
  "calendarViewDay": {
    "dayNumber": 3,
    "date": "2026-10-12",
    "type": "rest",
    "rest": {
      "id": "rest_103",
      "userId": "usr_pilot_42",
      "date": "2026-10-12",
      "note": "Náročný pracovní den a přesčas. Vědomá pauza na dočerpání sil.",
      "recordedAt": "2026-10-12T20:05:00.000Z"
    }
  }
}
```
