# Strategická rozhodnutí pro další fáze IKI (Architecture & Product Decisions)

Tento dokument zachycuje klíčová rozhodnutí pro architekturu a produkt IKI. Každé rozhodnutí má jasný důvod, dopad na implementaci a podmínku, za jaké by bylo přehodnoceno.

---

### Rozhodnutí 1: Čtrnáctidenní ohraničený cyklus místo nekonečného používání
* **Důvod:** Zaměstnaný člověk potřebuje jasně definovaný začátek, střed a konec, aby nevnímal aplikaci jako další nekonečnou povinnost na seznamu úkolů.
* **Dopad:** UX a datový model jsou navrženy pro 14denní průchod (Matrix Level 1–14) vrcholící konkrétním exportem (Karta průzkumníka).
* **Co by vedlo ke změně:** Pokud uživatelé v pilotu po 14 dnech spontánně požádají o pokračování a vyjádří frustraci, že program skončil.

### Rozhodnutí 2: Žádné trestající herní mechanismy (Streaky, ztráta životů, tresty za absenci)
* **Důvod:** Cílem je zkoumání v realitě, nikoliv závislost na aplikaci. Trestání absencí vyvolává pocit viny a vede k opuštění aplikace lidmi s náročným životem.
* **Dopad:** Absence zápisu je v systému reprezentována neutrálním stavem („pauza / odpočinek“), nikoliv ztrátou postupu.
* **Co by vedlo ke změně:** Pouze pokud by výzkum jednoznačně prokázal, že bez jemného připomenutí uživatelé zapomínají na existenci pokusu (v takovém případě by se zavedla čistě volitelná a vlídná připomínka, nikoliv penalizace).

### Rozhodnutí 3: Čtyři kruhy Ikigai pouze jako volitelný myšlenkový model, nikoliv dogma
* **Důvod:** Původní koncept ikigai v japonské kultuře nezahrnuje západní Vennův diagram (co tě baví, v čem jsi dobrý, co svět potřebuje, za co tě zaplatí). Vnucování všech 4 kruhů najednou paralyzuje.
* **Dopad:** Aplikace nehodnotí člověka podle toho, zda má pokryté všechny 4 kruhy; kruhy slouží jen jako pomocné filtry při generování hypotéz.
* **Co by vedlo ke změně:** Pokud by uživatelé výslovně vyžadovali klasický Vennův diagram a bez něj byli zmateni ze smyslu aplikace.

### Rozhodnutí 4: Oddělení doménového jádra od UI frameworku (Clean Architecture)
* **Důvod:** Možnost nezávislého testování obchodní logiky (Kaizen cyklus, Semafor, výpočet stavu pokusů) bez závislosti na Next.js, Reactu či prohlížečových API.
* **Dopad:** Krok 07 vzniká jako čistý TypeScript modul spustitelný kdekoli (Node.js, edge worker, prohlížeč) s unit testy.
* **Co by vedlo ke změně:** Pokud by požadavky na rychlost pilotu donutily tým k rychlému „monolitickému prototypu“ v jednom souboru bez separace.

### Rozhodnutí 5: AI rozhovor je asynchronní a má striktní limit výměn (žádný „nekonečný terapeut“)
* **Důvod:** Nekonečný chat podporuje prokrastinaci a konverzační únavu. IKI má uživatele poslat jednat do reálného světa.
* **Dopad:** Každý rozhovor s AI průvodcem má maximálně 3–4 interakce s jasným zakončením: výběrem konkrétního mikropokusu.
* **Co by vedlo ke změně:** Pokud by se ukázalo, že 3–4 výměny nestačí k formulaci smysluplné hypotézy a uživatelé se cítí nepochopeni.

### Rozhodnutí 6: Semafor energie jako primární reflexe (Zelená / Oranžová / Červená)
* **Důvod:** Po náročném dni v práci nemá většina lidí sílu psát deníkové eseje. Reflexe na jedno klepnutí snižuje tření na minimum.
* **Dopad:** Datový model reflexe staví na povinném stavu energie a nepovinném textovém komentáři.
* **Co by vedlo ke změně:** Pokud by data z pilotu ukázala, že tříbarevný semafor je příliš hrubý a neumožňuje AI průvodci generovat relevantní syntézu.

### Rozhodnutí 7: Mobilní web před nativní mobilní aplikací
* **Důvod:** Nejrychlejší cesta k ověření hypotéz bez nutnosti schvalování v Apple App Store a Google Play, snadná dostupnost přes odkaz.
* **Dopad:** UI a UX prototyp (Krok 06) i cílová aplikace budou optimalizovány primárně pro viewport mobilního prohlížeče.
* **Co by vedlo ke změně:** Pokud by pilot vyžadoval nativní funkce, které v mobilním webu nefungují spolehlivě (např. spolehlivé lokální push notifikace na iOS).

### Rozhodnutí 8: Odložení Three.js 3D dílny až po ověření obsahové smyčky
* **Důvod:** 3D grafika je náročná na výkon mobilních zařízení, baterii a vývojový čas. Klíčová hodnota IKI je v pokusu v realitě, nikoliv ve 3D grafice.
* **Dopad:** Pilotní verze použije stylizované, čisté 2D / SVG / CSS rozhraní dílny. Three.js zůstává jako možnost pro pozdější verzi.
* **Co by vedlo ke změně:** Pokud by testy ukázaly, že 2D grafika nedokáže vytvořit dostatečnou atmosféru „dílny průzkumníka“ a hráči neprojeví o prostředí zájem.

### Rozhodnutí 9: AI interpretace musí vždy odkazovat na doložitelná fakta od uživatele
* **Důvod:** Ochrana před halucinacemi, univerzálními klišé a ztrátou důvěry uživatele.
* **Dopad:** Prompt i doménový kontrakt vyžadují, aby každé tvrzení AI mělo referenci na id konkrétního záznamu či odpovědi uživatele.
* **Co by vedlo ke změně:** Žádná okolnost; toto je fundamentální etický a produktový princip aplikace.

### Rozhodnutí 10: Ochrana soukromí a žádné sdílení osobních reflexí bez výslovného souhlasu
* **Důvod:** Záznamy o energii a životním směřování jsou vysoce citlivé osobní údaje.
* **Dopad:** Data v pilotu zůstávají izolovaná, žádné veřejné profily ani sociální feedy. AI volání neukládá data pro trénování globálních modelů.
* **Co by vedlo ke změně:** Žádná okolnost; důvěrnost je podmínkou upřímnosti uživatele.
