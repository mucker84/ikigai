# Smlouva doménového jádra (Engine Contract)

Tento dokument specifikuje rozhraní čistých doménových funkcí jádra IKI (`core/engine.ts`). Funkce jsou deterministické, bez vedlejších efektů a nezávislé na frameworku, UI nebo databázi.

---

## 1. `planExperiment`

Plánuje pokus na konkrétní kalendářní den.

* **Signatura:**
  ```typescript
  function planExperiment(
    state: JourneyState,
    input: {
      experimentId: string;
      hypothesisId: string;
      targetDate: IsoDateString;
      variantId?: string;
    },
    now: IsoTimestampString
  ): { nextState: JourneyState; plannedExperiment: PlannedExperiment };
  ```
* **Vstupy:**
  * `state`: Aktuální stav cesty.
  * `input.experimentId`: Stabilní ID z katalogu pokusů.
  * `input.hypothesisId`: ID aktivní nebo potvrzené hypotézy.
  * `input.targetDate`: Kalendářní datum ve formátu `YYYY-MM-DD`.
  * `input.variantId`: Volitelné ID zkrácené varianty.
  * `now`: Aktuální časový okamžik ISO 8601.
* **Výstup:**
  * `nextState`: Neměnná (immutable) kopie stavu s přidaným plánovaným pokusem.
  * `plannedExperiment`: Nově vytvořený objekt pokusu.
* **Chybové stavy:**
  * `ERR_HYPOTHESIS_NOT_FOUND`: Zadané `hypothesisId` v profilu neexistuje.
  * `ERR_EXPERIMENT_ALREADY_PLANNED`: Pro daný `targetDate` již existuje aktivní naplánovaný pokus.
  * `ERR_REST_ALREADY_RECORDED`: Pro daný `targetDate` je již nahlášen odpočinek.

---

## 2. `recordResult`

Zaznamenává výsledek provedeného pokusu (Semafor a postřeh).

* **Signatura:**
  ```typescript
  function recordResult(
    state: JourneyState,
    input: {
      plannedExperimentId: string;
      status: "completed" | "rescheduled" | "abandoned";
      reflection?: {
        energy: EnergyLevel;
        notes?: string;
      };
      reason?: string;
    },
    now: IsoTimestampString
  ): { nextState: JourneyState; updatedExperiment: PlannedExperiment };
  ```
* **Vstupy:**
  * `input.plannedExperimentId`: ID plánovaného pokusu.
  * `input.status`: Výsledný stav pokusu.
  * `input.reflection`: Povinné, pokud je status `"completed"`.
  * `now`: ISO 8601 okamžik uložení.
* **Výstup:**
  * `nextState`: Aktualizovaný stav se zapsaným výsledkem.
  * `updatedExperiment`: Upravený plánovaný pokus.
* **Chybové stavy:**
  * `ERR_PLANNED_EXP_NOT_FOUND`: Zadané ID neexistuje.
  * `ERR_EXP_ALREADY_EVALUATED`: Pokus již byl dříve uzavřen.
  * `ERR_MISSING_REFLECTION`: Při stavu `"completed"` chybí hodnocení energie.

---

## 3. `recordRest`

Zaznamenává vědomý odpočinek pro daný den.

* **Signatura:**
  ```typescript
  function recordRest(
    state: JourneyState,
    input: {
      date: IsoDateString;
      note?: string;
    },
    now: IsoTimestampString
  ): { nextState: JourneyState; restEntry: RestEntry };
  ```
* **Vstupy:**
  * `input.date`: Datum ve formátu `YYYY-MM-DD`.
  * `input.note`: Volitelný komentář k odpočinku.
  * `now`: ISO 8601 okamžik.
* **Výstup:**
  * `nextState`: Stav obohacený o položku odpočinku. Pokud byl pro daný den naplánován pokus, je automaticky označen jako `"rescheduled"`.
  * `restEntry`: Vytvořený záznam odpočinku.
* **Chybové stavy:**
  * `ERR_REST_ALREADY_EXISTS`: Pro daný den je již odpočinek zaznamenán.

---

## 4. `getCalendarView`

Generuje matici 14 dnů s odpovídajícími stavy pro vykreslení v UI.

* **Signatura:**
  ```typescript
  function getCalendarView(
    state: JourneyState,
    startDate: IsoDateString
  ): CalendarDayView[];
  ```
* **Vstupy:**
  * `state`: Stav cesty.
  * `startDate`: Výchozí datum 1. dne cesty (`YYYY-MM-DD`).
* **Výstup:**
  * Pole přesně 14 položek `CalendarDayView` indexovaných od 1 do 14.
  * Každý den má přiřazen typ (`"experiment"` | `"rest"` | `"unrecorded"`), datum a relevantní záznam.
* **Chybové stavy:**
  * `ERR_INVALID_START_DATE`: Neplatný formát data.

---

## 5. `evaluateVisualMemories`

Vyhodnocuje, které vizuální předměty dílny byly odemčeny na základě skutečně provedených pokusů.

* **Signatura:**
  ```typescript
  function evaluateVisualMemories(
    state: JourneyState,
    now: IsoTimestampString
  ): { nextState: JourneyState; newlyUnlockedMemories: VisualMemory[] };
  ```
* **Pravidla odemykání:**
  * Předmět se odemkne pouze z pokusů se stavem `"completed"`.
  * **Idempotence:** Opakované volání nesmí vytvořit duplicitní předměty pro tentýž pokus.
* **Výstup:**
  * `nextState`: Stav s aktualizovaným seznamem `visualMemories`.
  * `newlyUnlockedMemories`: Seznam předmětů nově přidaných tímto voláním.
