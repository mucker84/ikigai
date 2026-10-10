# Klikací prototyp IKI (HTML / CSS / Vanilla JS)

Tento prototyp představuje samostatnou, plně funkční a klikatelnou verzi aplikace IKI. Je vytvořen v čistém HTML, CSS a JavaScriptu bez závislosti na externích knihovnách, CDN, buildech nebo placených AI API.

---

## 1. Jak prototyp spustit

1. **V běžícím XAMPPu (přes Apache):**
   * Otevři webový prohlížeč a zadej:  
     👉 **`http://localhost/ikigai/prototype/`**
2. **Nebo přímo ze souborového systému:**
   * Dvakrát klikni na soubor [`prototype/index.html`](file:///c:/xampp/htdocs/ikigai/prototype/index.html).
   * Běží i přes protokol `file:///`, protože veškerá data jsou vložena přímo a nevyžadují CORS fetch.

---

## 2. Rozsah a implementované funkce

* **Onboarding rozhovor (Obrazovka 1):** Naskriptovaný dialog na 2 otázky (moment zaujetí / moment vyčerpání) s možností přeskočení.
* **Výběr směrů (Obrazovka 2):** 3 pracovní hypotézy vygenerované na základě uživatelských odpovědí s explicitními citacemi důkazů.
* **Dnešní krok (Obrazovka 3):**
  * Karta pokusu s možností volby časové náročnosti (2 min / 5 min / 15 min).
  * Tlačítko pro výměnu pokusu (rotace z katalogu).
  * Tlačítko pro vědomý odpočinek (☕).
  * Tříbarevný Semafor energie (🟢 / 🟡 / 🔴) s volitelným zápisem postřehu.
* **Matice 14 dnů (Obrazovka 4):**
  * 14denní interaktivní kalendář (Matrix Level), který se okamžitě překresluje po uložení reflexe nebo odpočinku.
  * Kliknutím na kterýkoliv den se zobrazí podrobný zápis.
* **Karta průzkumníka (Obrazovka 5):**
  * Syntéza výsledků (kolik bylo zelených zdrojů energie, kolik odhalených slepých uliček, kolik odpočinků).
  * Tlačítko pro stažení Karty průzkumníka v JSON formátu.
* **Ukládání stavu:** Veškerý postup se automaticky ukládá do `localStorage`. Tlačítko **🔄 Reset** v záhlaví umožňuje kdykoliv restartovat průchod od Dne 1.

---

## 3. Místa pro převod do React / Next.js komponent

Pro budoucí integraci Codexem do Next.js + TypeScript:

| Prototyp element | Cílová React komponenta | Cesta v Next.js |
|---|---|---|
| `#screen-dialogue` | `<OnboardingDialogue />` | `components/onboarding/Dialogue.tsx` |
| `#screen-directions` | `<DirectionSelector />` | `components/directions/DirectionList.tsx` |
| `#screen-today` | `<TodayExperimentCard />` | `components/experiment/TunelCard.tsx` |
| `.semafor-box` | `<SemaforEnergyInput />` | `components/experiment/Semafor.tsx` |
| `#screen-calendar` | `<MatrixCalendarGrid />` | `components/calendar/MatrixGrid.tsx` |
| `#screen-summary` | `<ExplorerCardSummary />` | `components/summary/ExplorerCard.tsx` |
| `.workshop-scene` | `<WorkshopHeaderScene />` | `components/workshop/WorkshopScene.tsx` |
