# Kontrolní seznam UX a přístupnosti (UX Acceptance & A11y Checklist)

Tento dokument slouží jako akceptační kritéria pro implementaci obrazovek, interakcí a přístupnosti v aplikaci IKI.

---

## 1. Funkční přechody a interakce
- [ ] **Přechod Onboarding → Výběr směrů:** Po odeslání 2–3 odpovědí nebo po kliknutí na *Přeskočit* se rozhraní plynule přepne na zobrazení karet směrů bez ztráty kontextu.
- [ ] **Výběr a změna pokusu:** Uživatel může kdykoliv před uložením reflexe kliknout na *Vyměnit pokus* nebo *Zmenšit na 5 minut*; vybraný pokus se okamžitě aktualizuje.
- [ ] **Záznam Semaforu:** Kliknutí na zelenou/oranžovou/červenou energii poskytne okamžitou vizuální odezvu (aktivní zvýraznění); textové pole zůstává striktně volitelné.
- [ ] **Odpočinek / Dnes nemám kapacitu:** Kliknutí na odpočinek nevyžaduje žádné další vysvětlování ani potvrzovací varovné dialogy („Opravdu chcete skončit?“). Akce je okamžitě přijata.
- [ ] **Zobrazení detailu v Kalendáři:** Kliknutím na jakýkoli den v 14denní matici se pod maticí otevře odpovídající záznam, aniž by došlo k nežádoucímu posunu stránky (scroll jump).

---

## 2. Přístupnost (Accessibility / WCAG 2.1 AA)

### Ovládání z klávesnice a správa fokusu (Keyboard Navigation & Focus)
- [ ] **Klávesová navigace:** Všechny interaktivní prvky (tlačítka semaforu, volby pokusů, textová pole, dny v matici) jsou dosažitelné pomocí klávesy `Tab`.
- [ ] **Viditelný fokus:** Každý zaostřený prvek má zřetelný a kontrastní obrys fokusu (např. 2px solid `#2B4C6F` s odsazením 2px). Žádný prvek nesmí mít `outline: none` bez náhrady.
- [ ] **Správa fokusu při změně obrazovky:** Při přechodu na novou obrazovku se fokus logicky přesune na hlavní nadpis obrazovky (`h1` s `tabindex="-1"`), aby čtečky obrazovky ihned přečetly nový kontext.

### Textové popisky a sémantika (Semantics & Labels)
- [ ] **Semafor energie:** Barevná tlačítka nespoléhají pouze na barvu. Každé tlačítko má textový popisek a sémantický atribut:
  * 🟢 `aria-label="Dodalo mi to energii"`
  * 🟡 `aria-label="Neutrální výsledek"`
  * 🔴 `aria-label="Vysálo mi to energii (slepá ulička)"`
- [ ] **Formulářové prvky:** Každé textové pole má přiřazen viditelný `<label>` nebo přesný atribut `aria-label`.

### Čitelnost a kontrasty (Readability & Contrast)
- [ ] **Kontrast textu:** Poměr kontrastu běžného textu vůči pozadí dosahuje minimálně 4.5:1 (grafitový text `#22252A` na lněném pozadí `#FAF7F2` splňuje poměr > 12:1).
- [ ] **Velikost dotykových ploch:** Všechna tlačítka a interaktivní prvky mají na mobilním displeji minimální dotykovou plochu 44 × 44 px.

### Živá oznámení změn (Screen Reader Live Announcements)
- [ ] **Stavy ukládání a chyby:** Indikátor probíhajícího ukládání i úspěšné potvrzení mají atribut `role="status"` a `aria-live="polite"`.
- [ ] **Chybová hlášení sítě:** Chybové oznámení má `role="alert"` a `aria-live="assertive"`.

### Omezený pohyb (Prefers-reduced-motion)
- [ ] **Respektování uživatelského nastavení:** Pro uživatele se zapnutou volbou `prefers-reduced-motion: reduce` jsou veškeré přechody, animace rozsvícení lampičky a rozbalování karet okamžité (`transition: none; animation: none;`).
