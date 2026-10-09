# Návrh pilotního testování IKI (15–20 účastníků)

> **Poznámka k metodice:** Všechna kritéria, čísla a postupy v tomto dokumentu jsou formulovány jako **návrhy a pracovní hypotézy** k ověření. Nejsou zde uváděny žádné smyšlené průmyslové benchmarky ani nepodložená data o chování uživatelů.

---

## 1. Získání dobrovolníků a zadání pilotu

### Výběr účastníků (15–20 osob)
* **Kritéria pro zařazení:**
  * Dospělý člověk s pravidelným zaměstnáním nebo obdobným stálým úvazkem.
  * Subjektivní pocit rutiny / touha věnovat se něčemu vlastnímu a smysluplnému.
  * Schopnost otevřít mobilní web 1× denně na 3 minuty po dobu 14 dní.
  * Zájem o zkoumání v reálném životě (ne pouhé pasivní čtení textů).
* **Náborový kanál:**
  * Osobní síť a přímé oslovení v profesních či komunitních kruzích (žádné placené kampaně).
  * Krátký předvýběrový dotazník (3 otázky: profese, jak vnímá svou volnou kapacitu, co od 14 dnů očekává).

### Zadání pro dobrovolníky (Onboarding komunikace)
* *„Nejde o zkoušku tvé disciplíny ani o hledání jediného životního poslání. Jde o 14denní průzkumnou hru. Otestuješ několik drobných pokusů v reálném světě, zaznamenáš, jak se u nich cítíš, a na konci získáš souhrnnou mapu toho, co ti dodává energii a kam dál směřovat. Pokud nějaký pokus nestihneš nebo se ukáže jako blbost, je to úplně v pořádku a je to platný výsledek.“*

### Na co se ptát v průběhu a po skončení
* **V polovině (Den 7):**
  * *„Byl pro tebe některý z pokusů moc náročný na čas nebo energii?“*
  * *„Měl/a jsi pocit, že ti AI průvodce rozumí, nebo ti nabízel generické rady?“*
* **Po skončení (Den 14 — strukturovaný 20minutový rozhovor):**
  * *„Který moment byl pro tebe nejužitečnější?“*
  * *„Pomohla ti finální Karta průzkumníka zformulovat další krok, nebo je to jen další hezký papír?“*
  * *„Kdy ses během těch 14 dnů cítil/a přetížen/a aplikací?“*

---

## 2. Klíčové definice stavů uživatele

1. **Aktivace:**
   * Uživatel prošel úvodním rozhovorem (odpověděl na minulé zkušenosti), schválil či upravil alespoň 1 nabízenou hypotézu a potvrdil svůj první mikro-pokus na Den 2.
2. **Skutečně provedený pokus:**
   * Uživatel provedl aktivitu v reálném světě mimo aplikaci a v aplikaci označil stav energie v Semaforu (Zelená / Oranžová / Červená).
   * *Poznámka:* Pokud uživatel pokus zkusil a vzdal po 5 minutách, protože „tohle vážně není pro mě“, počítá se to jako úspěšně provedený pokus se zjištěním slepé uličky.
3. **Užitečná reflexe:**
   * Záznam, který obsahuje minimálně barvu energie v Semaforu a alespoň jednu větu kontextu (např. *„Zkusil jsem to, ale vadilo mi sedět u počítače sám“*), ze které lze odvodit budoucí směřování.
4. **Návrat (Zdravá retence):**
   * Uživatel se vrátí do aplikace alespoň 4× během 14 dní (nemusí jít o každodenní streak). Důležitý je návrat na týdenní a závěrečnou syntézu.

---

## 3. Kandidátní rozhodovací kritéria (Návrh k vyhodnocení)

Následující hranice jsou pracovní hypotézy autorů projektu pro vyhodnocení úspěšnosti pilotu:

| Metrika (pracovní hypotéza) | Návrh cílové hodnoty | Co znamená nesplnění |
|---|---|---|
| **Míra aktivace** | $\ge 75\,\%$ přihlášených (12 z 16) | Úvodní onboarding je moc dlouhý, matoucí nebo klade příliš vysoké nároky na první odpovědi. |
| **Realizace alespoň 3 pokusů** | $\ge 60\,\%$ aktivovaných | Pokusy jsou příliš náročné na čas v reálném životě; nutno zmenšit zátěž na mikrokroky. |
| **Užitečnost závěrečného výstupu** | $\ge 70\,\%$ těch, co dokončili den 14 | Karta průzkumníka je příliš vágní; syntéza AI nevytváří hmatatelnou hodnotu. |
| **Subjektivní pocit tlaku/viny** | $\le 15\,\%$ účastníků | Aplikace vyvolává výčitky z neplnění; nutno ještě více uvolnit tón a zrušit očekávání denní frekvence. |

---

## 4. Zachycení selhání, zátěže a asynchronního používání

### Jak měřit přetížení a selhání:
* **Tlačítko úlevy:** V každém pokusu je možnost *„Dnes nemám kapacitu / pokus byl mimo moje síly“*. Kliknutí na toto tlačítko se zaznamená jako úspěšný záznam kontextu (žádná červená chybová hláška).
* **Indikátor zátěže:** Pokud uživatel 3 dny v řadě nic nezadá, aplikace při dalším otevření nabídne: *„Vypadá to, že je teď rušnější období. Chceš zmenšit pokusy na 5minutové pozorování, nebo si dát pauzu?“*

### Přínos pro uživatele, který se nevrací denně:
* I člověk, který vstoupí jen 3× za 14 dní (začátek, půlka, konec) a provede pouze 2 pokusy, musí z aplikace odejít s užitečným poznatkem.
* Závěrečná syntéza funguje i s minimem dat: AI otevřeně přizná: *„Máme data jen ze dvou pokusů, ale i z nich je patrné, že...“*

---

## 5. Dvě cenové hypotézy k budoucímu ověření

> Tyto hypotézy slouží čistě jako podklad pro budoucí experimenty, nikoliv jako tvrzení, že uživatelé jsou dnes ochotni platit.

1. **Hypotéza A (Jednorázový program):**
   * *Model:* Uživatelé v této cílové skupině preferují jednorázovou platbu za ohraničený program (např. 14denní nebo 30denní průzkum s garantovaným výstupem v podobě Karty průzkumníka za cenu jedné knihy či večeře, cca 350–590 Kč), protože se nechtějí vázat dalším měsíčním předplatným.
   * *Ověření:* V závěrečném rozhovoru pilotu se zeptat: *„Kdyby byl tento 14denní program placený jako ucelený balíček s výslednou kartou, zvažoval/a bys ho, nebo máš raději měsíční předplatné / freemium?“*
2. **Hypotéza B (B2B / zaměstnanecký benefit na prevenci vyhoření):**
   * *Model:* Zaměstnavatelé mají zájem nabídnout IKI jako wellbeing / rozvojový nástroj pro zaměstnance, kteří hledají vnitřní motivaci a smysluplné uplatnění sil v rámci firmy (tzv. job crafting).
   * *Ověření:* Dotaz na účastníky pilotu: *„Dávalo by ti smysl, kdyby ti takový nástroj nabídl zaměstnavatel v rámci rozpočtu na vzdělávání nebo osobní rozvoj?“*
