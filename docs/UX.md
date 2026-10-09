# UX a architektura obrazovek IKI

Tento dokument definuje uživatelský zážitek, wireframy a stavovou logiku mobilního webového rozhraní aplikace IKI. Cílovým primárním zařízením je mobilní telefon (viewport 390 × 844 px), s responzivním centrovaným zobrazením na desktopu (max-width 560 px).

---

## 1. Pět základních obrazovek aplikace

### Obrazovka 1: Začátek a krátký rozhovor (Onboarding & Dialogue)
* **Účel:** Vstřícné seznámení s principem malých pokusů bez nutnosti vyplňovat rozsáhlé psychologické testy. Získání 2–3 reálných situací z minulosti.
* **Hierarchie prvků:**
  1. Hlava dílny (drobná postavička průvodce + uvítací věta).
  2. Dialogová bublina s otázkou na konkrétní minulou zkušenost (např. moment zaujetí / moment vyčerpání).
  3. Textové pole pro odpověď (max. 2–3 věty, žádný román).
  4. Hlavní akce (CTA): Tlačítko **Odeslat odpověď**.
  5. Vedlejší akce: Tlačítko **Přeskočit tuto otázku** (AI zareaguje: *„V pořádku, můžeme začít i bez toho.“*).
* **Přechody:** Po 2–3 odpovědích (nebo přeskočeních) přechází plynule do Obrazovky 2 (Mapa možných směrů).

### Obrazovka 2: Mapa možných směrů (Hypotheses Map)
* **Účel:** Zpřehlednit 2–3 pracovní hypotézy vygenerované z rozhovoru a nechat uživatele svobodně vybrat, co chce zkoumat jako první.
* **Hierarchie prvků:**
  1. Shrnutí: *„Na základě tvých vzpomínek se rýsují tyto 3 možné směry:“*
  2. Karty směrů (např. *Směr A: Tvorba s hmatatelným výsledkem*, *Směr B: Mentoring a přímá podpora lidí*). Každá karta obsahuje:
     - Název směru a 1 větu popisu.
     - Značku „Pracovní odhad AI“ s odkazem na citaci uživatele.
  3. Hlavní akce: **Zvolit tento směr pro první týden**.
  4. Vedlejší akce: **Upravit vlastními slovy** nebo **Vytvořit úplně jiný směr**.
* **Přechody:** Výběr směru otevře Obrazovku 3 (Dnešní malý pokus).

### Obrazovka 3: Dnešní malý pokus (Tunel & Semafor)
* **Účel:** Ohnisko každodenní interakce (2–3 minuty). Zobrazení dnešního mikro-kroku a večerní reflexe energie.
* **Hierarchie prvků:**
  1. Stavový řádek dne (např. *Den 3 ze 14 · Pokus v běhu*).
  2. Karta pokusu (Tunel):
     - Titulek pokusu (např. *30 minut tichého skicování bez hodnocení*).
     - Proč tento pokus děláme (vazba na zvolený směr).
     - Odhadovaná náročnost (např. *15–20 minut · nulové náklady*).
  3. Sekce večerní reflexe (Semafor energie):
     - 3 velká dotyková tlačítka: 🟢 **Dodalo energii** / 🟡 **Neutrální / smíšené** / 🔴 **Vysálo baterky**.
     - Volitelné pole pro postřeh (1–2 věty, striktně nepovinné).
  4. Hlavní akce: **Uložit reflexi pokusu**.
  5. Vedlejší akce: **Dnes nestíhám / Odložit na zítra**, **Vyměnit pokus za jiný**.
* **Přechody:** Po uložení reflexe se zobrazí vizuální odezva na mapě a nabídne se náhled zítřejšího dne v Kalendáři (Obrazovka 4).

### Obrazovka 4: Kalendář a historie (Matrix Level)
* **Účel:** Vizuální časová osa 14denního programu. Dává okamžitý přehled o provedených pokusech, odpočincích i slepých uličkách bez pocitu viny.
* **Hierarchie prvků:**
  1. Matice 14 dnů (2 řádky po 7 dnech).
     - Zelená/žlutá/červená ikona: dokončený pokus s energií.
     - Neutrální ikona (hrnek čaje/obláček): vědomý odpočinek / nestíhání.
     - Tečkovaný obrys: dnešní a budoucí dny.
  2. Detail vybraného dne pod maticí (kliknutím na kterýkoli den se zobrazí název pokusu, výsledek a případná poznámka).
  3. Hlavní akce: **Přejít na dnešní pokus**.
  4. Vedlejší akce: **Zobrazit dosavadní poznatky dílny**.
* **Přechody:** Klik na den 7 nebo 14 otevírá Týdenní reflexi (Obrazovka 5).

### Obrazovka 5: Týdenní a závěrečná reflexe (Synthesis)
* **Účel:** Klíčový moment bilance (Den 7 a Den 14). AI průvodce propojí data ze Semaforu a nabídne souhrnný vzorec.
* **Hierarchie prvků:**
  1. Hlava reflexe: *„Poločas průzkumu: Co ti uplynulých 7 dní prozradilo.“*
  2. Zrcadlo energie: Porovnání pokusů, které energii dodaly, oproti těm, které ji vzaly.
  3. Poznatek AI průvodce s přímými citacemi: *„Ukázalo se, že tě bavila analýza, ale vyčerpalo tě prezentování.“*
  4. Rozhodovací volba pro další týden:
     - *Pokračovat v tomto směru s odvážnějším pokusem.*
     - *Upravit kurz (zaměřit se na nově objevený detail).*
     - *Změnit směr (tento směr je slepá ulička — ušetřili jsme čas!).*
  5. Hlavní akce: **Potvrdit směr pro další dny** (nebo v Dni 14: **Stáhnout Kartu průzkumníka**).
  6. Vedlejší akce: **Upravit interpretaci vlastními slovy**.

---

## 2. Textové wireframy (Šířka 390 px)

### Wireframe: Obrazovka 3 — Dnešní malý pokus (390 px)
```text
+---------------------------------------+
|  [Dílna]     DEN 4 / 14     [Kalendář]|
+---------------------------------------+
|                                       |
|  (o_o) Průzkumník:                    |
|  "Dnešní mise míří na tvůj směr       |
|   'Tvorba s hmatatelným výsledkem'."  |
|                                       |
|  +---------------------------------+  |
|  | TUNEL: Dnešní mikro-pokus       |  |
|  |                                 |  |
|  | 20 minut tichého náčrtu         |  |
|  | Vezmi papír a tužku. Nakresli   |  |
|  | jednoduché schéma procesu,      |  |
|  | který tě v práci štve.          |  |
|  |                                 |  |
|  | [Změnit pokus] [Zmenšit nároč.] |  |
|  +---------------------------------+  |
|                                       |
|  VEČERNÍ SEMAFOR ENERGIE:             |
|  Jak ti při tom reálně bylo?          |
|                                       |
|  [ 🟢 Dodalo ] [ 🟡 Neutr. ] [ 🔴 Vzalo ]|
|                                       |
|  Stručný postřeh (nepovinné):         |
|  [ Kreslení fajn, ale chyběl mi...  ] |
|                                       |
|  +---------------------------------+  |
|  |      [ ULOŽIT REFLEXI ]         |  |
|  +---------------------------------+  |
|                                       |
|  [ Dnes nemám kapacitu (Odpočinek) ]  |
+---------------------------------------+
```

### Wireframe: Obrazovka 4 — Kalendář a historie (390 px)
```text
+---------------------------------------+
|  [Dílna]   MATICE POKUSŮ    [Zpět]    |
+---------------------------------------+
|                                       |
|  TÝDEN 1:                             |
|  [ 🟢 D1 ] [ 🟢 D2 ] [ ☕ D3 ] [ 🟡 D4 ]  |
|  [ 🔴 D5 ] [ 🟢 D6 ] [ 🔍 D7*]        |
|                                       |
|  TÝDEN 2:                             |
|  [ ·· D8 ] [ ·· D9 ] [ ··D10 ] [ ··D11]  |
|  [ ··D12 ] [ ··D13 ] [ 🏆D14*]        |
|                                       |
|  Legenda:                             |
|  🟢 Energie  🟡 Neutrál  🔴 Slepá ulička |
|  ☕ Odpočinek  🔍 Reflexe                |
|                                       |
|  +---------------------------------+  |
|  | DETAIL: Den 3 (Včera)           |  |
|  | Odpočinkový den                 |  |
|  | Poznámka: "Přesčas v práci,     |  |
|  | pokus vědomě odložen."          |  |
|  +---------------------------------+  |
|                                       |
|  +---------------------------------+  |
|  |     [ POKRAČOVAT NA DNES ]      |  |
|  +---------------------------------+  |
+---------------------------------------+
```

### Stručný wireframe pro Desktop (Responsive container)
Na šířce $\ge 768\,\text{px}$ je aplikace centrovaná do mobilního layoutu (`max-width: 480px`) uprostřed obrazovky, případně na desktopech s šířkou $\ge 1024\,\text{px}$ je rozhraní rozděleno na dva sloupce:
* **Levý sloupec (320 px):** Vizuální dílna, postava průzkumníka, 14denní matice pokusů (Matrix Level).
* **Pravý sloupec (500 px):** Aktivní pracovní plocha (aktuální rozhovor, karta pokusu, semafor reflexe).

---

## 3. Zvládání hraničních a výjimečných stavů

1. **První použití (Cold start):**
   * Žádná prázdná strašidelná tabulka. Průzkumník sedí u stolu v dílně, rozsvítí se lampička a začne jedinou přátelskou otázkou na nedávný moment energie.
2. **Bez dat (Empty state):**
   * Matice pokusů zobrazuje dny jako „neobjevená území“ (jemná obrysová tečka), nikoliv jako chybu nebo červené prázdno.
3. **Odložený pokus (Dnes nemám kapacitu):**
   * Uživatel klikne na *„Dnes nemám kapacitu“*. Zobrazí se vlídná hláška: *„Zaznamenáno. Odpočinek a uznání limitů je plnohodnotná součást kaizen průzkumu. Pokus přesouváme na zítra.“* V kalendáři se objeví ikona šálku čaje.
4. **Návrat po pauze (např. 3 dny neotevřeno):**
   * Žádná výčitka, žádný nápis *„Ztratil jsi svůj streak!“*.
   * Průvodce přivítá: *„Vítej zpátky v dílně. Pokračujeme tam, kde jsme skončili, nebo chceš dnešní krok zmenšit na 5 minut?“*
5. **AI služba nedostupná (Offline / Timeout / Rate limit):**
   * Aplikace nespadne do chyby. Místo AI generování nabídne 3 předpřipravené ověřené pokusy z offline katalogu a zprávu: *„Průzkumník teď luští staré mapy (AI má chvilku pauzu). Tady jsou 3 univerzální pokusy, ze kterých můžeš vybrat.“*
6. **Stav ukládání (Saving state):**
   * Tlačítko Semaforu zobrazí drobný pulzující indikátor: *„Zapisuji do deníku dílny...“*, akce je chráněna proti vícenásobnému kliknutí (disable).
7. **Neúspěšné uložení (Network error):**
   * Záznam reflexe se uloží lokálně do `localStorage` prohlížeče. Zobrazí se nenásilná lišta: *„Spojení se nezdařilo, ale tvůj záznam je v bezpečí v telefonu. Zkusíme ho odeslat za chvíli.“* Tlačítko **Zkusit znovu**.
8. **Změna vybraného pokusu:**
   * Pokud uživateli dnešní pokus nesedí, klikne na **Vyměnit pokus**. Může si vybrat ze 2 alternativ nebo pokus zmenšit na poloviční čas.
