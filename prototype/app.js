/**
 * IKI — Samostatný klikací prototyp
 * 
 * Čistý JavaScript bez závislostí a bez nutnosti externího AI API.
 * Veškerá logika rozhovoru, výběru směrů a Kaizen smyčky je deterministicky naskriptována.
 */

// --- 1. EMBEDDED KATALOG EXPERIMENTŮ (24 POKUSŮ) ---
const EXPERIMENTS_CATALOG = [
  {
    id: "exp-01", code: "EXP-01", title: "Bleskový náčrt nápadu na papír",
    summary: "Ověření, zda ti energii dává samotné vymýšlení nového konceptu z čisté vody.",
    instructions: "Vezmi čistý papír a tužku. Během 15 minut navrhni koncept jedné věci, která by vyřešila drobný problém ve tvém okolí. Neřeš proveditelnost ani grafickou krásu, soustřeď se na nápad.",
    estimatedMinutes: 15, tags: ["tvoreni", "vymysleni"],
    variants: [
      { id: "v2", title: "Jeden titulek", instructions: "Napiš na papír jednou větou nápad na zlepšovák a podtrhni klíčové slovo.", estimatedMinutes: 2 },
      { id: "v5", title: "Tři hrubé odrážky", instructions: "Načrtni název nápadu a 3 základní body, jak by fungoval.", estimatedMinutes: 5 },
      { id: "v15", title: "Plné schéma", instructions: "Vezmi čistý papír a tužku. Během 15 minut navrhni koncept jedné věci, která by vyřešila drobný problém ve tvém okolí.", estimatedMinutes: 15 }
    ]
  },
  {
    id: "exp-02", code: "EXP-02", title: "Tiché psaní bez cenzury",
    summary: "Zjištění, zda ti vyhovuje formulovat myšlenky do souvislého textu o samotě.",
    instructions: "Otevři prázdný dokument nebo blok. Piš 15 minut v kuse o tématu, které tě v poslední době zaujalo. Nezastavuj se kvůli gramatice, jen zachycuj tok myšlenek.",
    estimatedMinutes: 15, tags: ["tvoreni", "text"],
    variants: [
      { id: "v2", title: "Tři silné věty", instructions: "Napiš 3 nepřerušované věty o tom, co tě dnes nejvíc zaměstnává v hlavě.", estimatedMinutes: 2 },
      { id: "v5", title: "Proud vědomí", instructions: "Nastav časovač na 5 minut a piš bez mazání jakýchkoliv slov.", estimatedMinutes: 5 },
      { id: "v15", title: "Mini-úvaha", instructions: "Otevři prázdný dokument nebo blok. Piš 15 minut v kuse o tématu, které tě zaujalo.", estimatedMinutes: 15 }
    ]
  },
  {
    id: "exp-05", code: "EXP-05", title: "Vysvětlení složité věci jako pro dítě",
    summary: "Ověření radosti z didaktického zjednodušení a strukturování vědomostí.",
    instructions: "Vyber si koncept ze svého oboru, který lidé často nechápou. Napiš na papír jeho vysvětlení tak, aby mu porozuměl desetiletý školák, bez použití jediného cizího termínu.",
    estimatedMinutes: 15, tags: ["uceni", "didaktika"],
    variants: [
      { id: "v2", title: "Jedna metafora", instructions: "Vymysli jednu přirovnávací metaforu pro složitý princip ze své práce.", estimatedMinutes: 2 },
      { id: "v5", title: "Tříkrokový tahák", instructions: "Napiš 3 body vysvětlující základní pravidlo tvého oblíbeného tématu.", estimatedMinutes: 5 },
      { id: "v15", title: "Dětské vysvětlení", instructions: "Vyber si koncept ze svého oboru a napiš vysvětlení bez cizích slov na 15 minut.", estimatedMinutes: 15 }
    ]
  },
  {
    id: "exp-09", code: "EXP-09", title: "Vyčištění jednoho úzkého hrdla procesu",
    summary: "Zjištění, zda ti přináší uspokojení optimalizace a odstraňování zbytečných kroků.",
    instructions: "Vyber si jednu běžnou denní rutinu (odchod z domu, pošta, plocha počítače). Zmapuj zbytečné mezikroky a jeden z nich trvale zruš.",
    estimatedMinutes: 15, tags: ["reseni", "procesy"],
    variants: [
      { id: "v2", title: "Zrušení kliku", instructions: "Vytvoř si klávesovou zkratku nebo smaž 3 zbytečné soubory z plochy.", estimatedMinutes: 2 },
      { id: "v5", title: "Pravidlo šuplíku", instructions: "Vyřaď z pracovního stolu 5 předmětů, které při práci jen překážejí.", estimatedMinutes: 5 },
      { id: "v15", title: "Procesní audit", instructions: "Vyber si běžnou denní rutinu, zmapuj zbytečné mezikroky a jeden trvale zruš.", estimatedMinutes: 15 }
    ]
  },
  {
    id: "exp-10", code: "EXP-10", title: "Dotažení jednoho odloženého restu",
    summary: "Ověření energie z dokončování a uzavírání otevřených smyček oproti vymýšlení nového.",
    instructions: "Vyber jeden drobný úkol, který odkládáš déle než 14 dní (přišít knoflík, zaplatit složenku, odpovědět na starý e-mail). Věnuj 15 minut jeho definitivnímu dokončení.",
    estimatedMinutes: 15, tags: ["reseni", "dokoncovani"],
    variants: [
      { id: "v2", title: "Škrtnutí úkolu", instructions: "Rozhodni se jeden odložený úkol definitivně škrtnout bez výčitek.", estimatedMinutes: 2 },
      { id: "v5", title: "Odpověď na mail", instructions: "Napiš krátkou třívětou odpověď na zprávu ležící v doručené poště.", estimatedMinutes: 5 },
      { id: "v15", title: "Úplné dotažení", instructions: "Vyber jeden drobný odložený rest a věnuj 15 minut jeho definitivnímu uzavření.", estimatedMinutes: 15 }
    ]
  },
  {
    id: "exp-11", code: "EXP-11", title: "Oprava drobné nefunkční věci",
    summary: "Zjištění, zda ti dává smysl uvádět poškozené věci zpět do provozu.",
    instructions: "Najdi doma nebo v práci předmět, který drhne, vrže nebo se viklá. Použij šroubovák, mazadlo nebo lepidlo a věnuj 15 minut jeho opravení.",
    estimatedMinutes: 15, tags: ["reseni", "manualni"],
    variants: [
      { id: "v2", title: "Promazání pantu", instructions: "Kápni olej na vrzající dveře nebo židli.", estimatedMinutes: 2 },
      { id: "v5", title: "Dotažení šroubu", instructions: "Dotáhni uvolněnou úchytku nebo nohu stolu.", estimatedMinutes: 5 },
      { id: "v15", title: "Fyzická oprava", instructions: "Najdi nefunkční předmět a věnuj 15 minut jeho uvedení zpět do provozu.", estimatedMinutes: 15 }
    ]
  },
  {
    id: "exp-13", code: "EXP-13", title: "Aktivní naslouchání bez rad",
    summary: "Ověření energie ze samotné lidské přítomnosti a empatie bez nutnosti mentorovat.",
    instructions: "Při rozhovoru s kolegou nebo blízkým se 15 minut soustřeď pouze na to, abys pozorně naslouchal/a. Nepředkládej žádná řešení ani své historky, pouze parafrázuj a ptej se.",
    estimatedMinutes: 15, tags: ["kontakt", "empatie"],
    variants: [
      { id: "v2", title: "Jedna otázka navíc", instructions: "Místo vlastní historky se zeptej: 'A jak ses v té chvíli cítil/a?'", estimatedMinutes: 2 },
      { id: "v5", title: "5 minut pro druhého", instructions: "Nech druhého mluvit 5 minut bez přerušení a udržuj oční kontakt.", estimatedMinutes: 5 },
      { id: "v15", title: "Tichá přítomnost", instructions: "Věnuj celý rozhovor druhému člověku s cílem plně pochopit jeho pohled.", estimatedMinutes: 15 }
    ]
  },
  {
    id: "exp-19", code: "EXP-19", title: "Nastavení ergonomického ticha na stole",
    summary: "Ověření, nakolik tvůj vnitřní klid závisí na řádu v bezprostředním pracovním poli.",
    instructions: "Ukliď pracovní stůl tak, aby na něm nezůstalo nic kromě počítače a bloku. Odstraň všechny účtenky a hrnky z dohledu. Pozoruj změnu dechu a soustředění.",
    estimatedMinutes: 15, tags: ["pece", "minimalismus"],
    variants: [
      { id: "v2", title: "Odnesení nádobí", instructions: "Odnes ze stolu prázdné skleničky a talířky.", estimatedMinutes: 2 },
      { id: "v5", title: "Otření monitoru", instructions: "Otři prach z monitoru a srovnej podložku pod myš.", estimatedMinutes: 5 },
      { id: "v15", title: "Vizuální ticho", instructions: "Ukliď pracovní stůl do absolutního minimalismu na 15 minut.", estimatedMinutes: 15 }
    ]
  }
];

// --- 2. VÝCHOZÍ STAV (STATE MANAGEMENT) ---
const STORAGE_KEY = "iki_prototype_state_v1";

function getInitialState() {
  return {
    onboardingStep: 0, // 0 = otázka 1, 1 = otázka 2, 2 = vygenerováno, 3 = potvrzeno
    answers: { flow: "", drain: "" },
    activeHypothesis: null,
    currentDay: 1, // 1 až 14
    selectedExperimentId: "exp-05",
    selectedVariantMinutes: 15,
    selectedEnergy: null,
    reflectionNote: "",
    // Historie 14 dní (index 0 až 13)
    days: Array.from({ length: 14 }, (_, i) => ({
      dayNumber: i + 1,
      status: "unrecorded", // "unrecorded", "completed", "rest"
      energy: null, // "energized", "neutral", "drained"
      experimentTitle: null,
      note: null
    }))
  };
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("LocalStorage není dostupné, běžíme v paměti.");
  }
  return getInitialState();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Chyba ukládání do LocalStorage:", e);
  }
  updateUI();
}

function resetState() {
  if (confirm("Chceš resetovat prototyp do výchozího stavu Dne 1?")) {
    state = getInitialState();
    saveState();
    showScreen("screen-dialogue");
    showNotification("Prototyp byl resetován do výchozího stavu.");
  }
}

// --- 3. SKRIPTOVANÝ ONBOARDING (BEZ EXTERNÍ AI) ---
const ONBOARDING_QUESTIONS = [
  {
    aiText: "Ahoj v dílně IKI. Nemusíš vyplňovat žádný test osobnosti. Začneme konkrétním momentem:\n\nVzpomeneš si za poslední měsíc na situaci, kdy tě nějaká činnost doopravdy chytla a zapomněl/a jsi na čas? Co přesně jsi dělal/a?",
    placeholder: "Např.: Pomáhal jsem kolegovi překopat chaotickou tabulku..."
  },
  {
    aiText: "Díky! A teď opačná strana: Co tě za poslední dva týdny spolehlivě a nejrychleji vycuclo z energie? (Může to být cokoliv: nekonečná porada, administrativa, řešení sporů...)",
    placeholder: "Např.: Dvouhodinová porada bez agendy, kde se nic nerozhodlo..."
  }
];

function generateScriptedDirections(flowAnswer, drainAnswer) {
  const quote1 = flowAnswer && flowAnswer.trim().length > 0 
    ? `"${flowAnswer.trim().slice(0, 50)}..."` 
    : '"Strukturování myšlenek a úleva druhému"';
    
  return [
    {
      id: "dir-1",
      code: "Směr A",
      title: "Didaktika a tvorba srozumitelné struktury",
      desc: "Zkoumat, jak vytvářet přehledné taháky a manuály, které druhým lidem šetří čas a nervy.",
      evidence: `Vychází z tvé vzpomínky: ${quote1}`,
      expId: "exp-05"
    },
    {
      id: "dir-2",
      code: "Směr B",
      title: "Usměrňování chaosu a optimalizace procesů",
      desc: "Zkoumat vyčištění úzkých hrdel a eliminaci zbytečných činností v běžném pracovním dni.",
      evidence: "Vychází z odporu k pasivní neproduktivní rutině a zbytečným schůzkám.",
      expId: "exp-09"
    },
    {
      id: "dir-3",
      code: "Směr C",
      title: "Manuální tvorba a hmatatelný výsledek",
      desc: "Zkoumat činnosti, kde fyzickýma rukama vzniká konkrétní funkční oprava či náčrt.",
      evidence: "Alternativní hypotéza: potřeba hmatatelného výstupu mimo abstraktní debaty.",
      expId: "exp-11"
    }
  ];
}

// --- 4. ZOBRAZENÍ A PŘEPÍNÁNÍ OBRAZOVEK ---
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Aktualizace spodní navigace
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-screen") === screenId);
  });
}

function showNotification(text) {
  const banner = document.getElementById("notification-banner");
  const textEl = document.getElementById("notification-text");
  textEl.textContent = text;
  banner.style.display = "flex";
  setTimeout(() => {
    banner.style.display = "none";
  }, 4000);
}

// --- 5. LOGIKA A AKTUALIZACE ROZHRANÍ (RENDER) ---
function updateUI() {
  // Stavový odznak dne
  document.getElementById("day-badge-display").textContent = `Den ${state.currentDay} / 14`;
  
  // Řeč průvodce
  const speechBubble = document.getElementById("explorer-speech-bubble");
  if (state.onboardingStep < 2) {
    speechBubble.textContent = "Rozsvěcím lampičku v dílně. Začínáme prvním krátkým rozhovorem.";
  } else if (state.days[state.currentDay - 1].status === "completed") {
    speechBubble.textContent = "Dnešní pokus máš zapsaný! Výborná práce, uvidíme se v dalším kroku.";
  } else if (state.days[state.currentDay - 1].status === "rest") {
    speechBubble.textContent = "Dnes odpočíváme s horkým čajem. Pauza je plnohodnotná část cesty.";
  } else {
    speechBubble.textContent = `Máme připravený pokus pro Den ${state.currentDay}. Zkusíš to na pár minut?`;
  }

  // 1. Render Onboarding Chatu
  renderChat();

  // 2. Render Směrů
  renderDirections();

  // 3. Render Dnešního pokusu
  renderTodayExperiment();

  // 4. Render Matice Kalendáře
  renderCalendarMatrix();

  // 5. Render Shrnutí
  renderSummary();
}

function renderChat() {
  const container = document.getElementById("chat-messages");
  container.innerHTML = "";

  // Otázka 1
  appendChatBubble(container, ONBOARDING_QUESTIONS[0].aiText, "ai");
  if (state.answers.flow) {
    appendChatBubble(container, state.answers.flow, "user");
  }

  // Otázka 2 (pokud krok >= 1)
  if (state.onboardingStep >= 1) {
    appendChatBubble(container, ONBOARDING_QUESTIONS[1].aiText, "ai");
    if (state.answers.drain) {
      appendChatBubble(container, state.answers.drain, "user");
    }
  }

  // Závěr rozhovoru (pokud krok >= 2)
  if (state.onboardingStep >= 2) {
    appendChatBubble(container, "Výborně, máme konkrétní střípky reality. Podívej se na 3 možné směry na nástěnce a vyber si jeden na zkoušku.", "ai");
    document.getElementById("chat-input-container").style.display = "none";
  } else {
    document.getElementById("chat-input-container").style.display = "flex";
    const currentQ = ONBOARDING_QUESTIONS[state.onboardingStep];
    document.getElementById("chat-user-input").placeholder = currentQ.placeholder;
  }
}

function appendChatBubble(container, text, type) {
  const div = document.createElement("div");
  div.className = `bubble bubble-${type}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function renderDirections() {
  const list = document.getElementById("directions-list");
  list.innerHTML = "";

  const directions = generateScriptedDirections(state.answers.flow, state.answers.drain);
  directions.forEach(dir => {
    const card = document.createElement("article");
    const isSelected = state.activeHypothesis && state.activeHypothesis.id === dir.id;
    card.className = `direction-card ${isSelected ? "selected" : ""}`;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", isSelected ? "true" : "false");

    card.innerHTML = `
      <div class="direction-badge">${dir.code}</div>
      <div class="direction-title">${dir.title}</div>
      <div class="direction-desc">${dir.desc}</div>
      <div class="evidence-tag">${dir.evidence}</div>
    `;

    card.addEventListener("click", () => {
      state.activeHypothesis = dir;
      state.selectedExperimentId = dir.expId;
      document.getElementById("btn-confirm-direction").disabled = false;
      renderDirections();
    });

    list.appendChild(card);
  });
}

function renderTodayExperiment() {
  const exp = EXPERIMENTS_CATALOG.find(e => e.id === state.selectedExperimentId) || EXPERIMENTS_CATALOG[0];
  const variant = exp.variants.find(v => v.estimatedMinutes === state.selectedVariantMinutes) || exp.variants[2];

  document.getElementById("exp-code").textContent = exp.code;
  document.getElementById("exp-time").textContent = `⏱️ ${variant.estimatedMinutes} minut`;
  document.getElementById("exp-title").textContent = exp.title;
  document.getElementById("exp-summary").textContent = exp.summary;
  document.getElementById("exp-instructions").textContent = variant.instructions;

  // Variant selector buttons
  document.querySelectorAll(".variant-btn").forEach(btn => {
    const m = parseInt(btn.getAttribute("data-min"), 10);
    btn.classList.toggle("active", m === state.selectedVariantMinutes);
  });

  // Semafor tlačítka
  document.querySelectorAll(".semafor-btn").forEach(btn => {
    const energy = btn.getAttribute("data-energy");
    btn.classList.toggle("selected", energy === state.selectedEnergy);
  });

  const saveBtn = document.getElementById("btn-save-reflection");
  saveBtn.disabled = !state.selectedEnergy;

  // Pokud je dnešní den již vyhodnocen
  const currentDayData = state.days[state.currentDay - 1];
  if (currentDayData.status === "completed") {
    saveBtn.textContent = "✓ Dnešní reflexe již byla uložena";
    saveBtn.disabled = true;
  } else if (currentDayData.status === "rest") {
    saveBtn.textContent = "☕ Dnes jsi zvolil/a odpočinek";
    saveBtn.disabled = true;
  } else {
    saveBtn.textContent = "Uložit reflexi do deníku";
  }
}

function renderCalendarMatrix() {
  const container = document.getElementById("matrix-grid-container");
  container.innerHTML = "";

  state.days.forEach(day => {
    const cell = document.createElement("button");
    let statusClass = "future";
    let icon = `${day.dayNumber}`;

    if (day.status === "completed") {
      statusClass = `completed-${day.energy || "green"}`;
      icon = day.energy === "energized" ? "🟢" : day.energy === "drained" ? "🔴" : "🟡";
    } else if (day.status === "rest") {
      statusClass = "rest";
      icon = "☕";
    } else if (day.dayNumber === state.currentDay) {
      statusClass = "current";
    }

    cell.className = `day-cell ${statusClass}`;
    cell.setAttribute("aria-label", `Den ${day.dayNumber}`);
    cell.innerHTML = `<span>D${day.dayNumber}</span><span style="font-size:13px; margin-top:2px;">${icon}</span>`;

    cell.addEventListener("click", () => {
      showDayDetail(day);
    });

    container.appendChild(cell);
  });
}

function showDayDetail(day) {
  const detail = document.getElementById("calendar-day-detail");
  if (day.status === "completed") {
    const energyText = day.energy === "energized" ? "🟢 Dodalo energii" : day.energy === "drained" ? "🔴 Slepá ulička / vysálo" : "🟡 Neutrální";
    detail.innerHTML = `
      <strong>Den ${day.dayNumber}: ${day.experimentTitle || "Pokus"}</strong><br>
      Stav energie: <strong>${energyText}</strong><br>
      ${day.note ? `Poznámka: <em>"${day.note}"</em>` : "<em>Bez textové poznámky.</em>"}
    `;
  } else if (day.status === "rest") {
    detail.innerHTML = `
      <strong>Den ${day.dayNumber}: Vědomý odpočinek ☕</strong><br>
      ${day.note ? `Poznámka: <em>"${day.note}"</em>` : "Tento den byl věnován načerpání sil."}
    `;
  } else if (day.dayNumber === state.currentDay) {
    detail.innerHTML = `
      <strong>Den ${day.dayNumber}: Dnešní aktivní den 🧭</strong><br>
      Pokus je připraven na kartě Dnešní krok.
    `;
  } else {
    detail.innerHTML = `
      <strong>Den ${day.dayNumber}: Budoucí neprozkoumaný den</strong><br>
      Zatím bez záznamu.
    `;
  }
}

function renderSummary() {
  const container = document.getElementById("summary-content");
  const completed = state.days.filter(d => d.status === "completed");
  const energized = completed.filter(d => d.energy === "energized");
  const drained = completed.filter(d => d.energy === "drained");
  const rests = state.days.filter(d => d.status === "rest");

  container.innerHTML = `
    <div class="experiment-card" style="border-color:var(--color-navy);">
      <h3 style="font-size:16px;">Statistika cesty (Den 1 až ${state.currentDay})</h3>
      <div style="display:flex; justify-content:space-around; text-align:center; margin-top:6px;">
        <div><strong style="font-size:20px; color:var(--color-green);">${energized.length}</strong><br><span style="font-size:11px; color:var(--text-muted);">Zdroje energie</span></div>
        <div><strong style="font-size:20px; color:var(--color-red);">${drained.length}</strong><br><span style="font-size:11px; color:var(--text-muted);">Slepé uličky</span></div>
        <div><strong style="font-size:20px; color:var(--color-navy);">${rests.length}</strong><br><span style="font-size:11px; color:var(--text-muted);">Odpočinky</span></div>
      </div>
    </div>

    <div class="day-detail-card">
      <strong style="color:var(--color-navy);">Aktivní směr průzkumu:</strong><br>
      ${state.activeHypothesis ? state.activeHypothesis.title : "Zatím nevybrán (projdi úvodní rozhovor)"}
    </div>

    <div class="day-detail-card">
      <strong>Ověřené poznatky z reality:</strong><br>
      ${energized.length > 0 
        ? energized.map(e => `• 🟢 ${e.experimentTitle} (${e.note || "pozitivní energie"})`).join("<br>") 
        : "Zatím nemáme dokončený pokus se zelenou energií."}
      ${drained.length > 0 
        ? `<br><br><span style="color:var(--color-red);"><strong>Odhalené slepé uličky:</strong></span><br>` + drained.map(e => `• 🔴 ${e.experimentTitle}`).join("<br>") 
        : ""}
    </div>

    <button id="btn-export-card" class="btn-primary" style="margin-top:8px;">📥 Stáhnout Kartu průzkumníka (JSON/HTML)</button>
  `;

  document.getElementById("btn-export-card").addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `iki-karta-pruzkumnika-den-${state.currentDay}.json`);
    dlAnchor.click();
    showNotification("Karta průzkumníka byla úspěšně stažena.");
  });
}

// --- 6. EVENT LISTENERS (INTERAKCE) ---
document.addEventListener("DOMContentLoaded", () => {
  // Inicializace stavu a obrazovky
  if (state.onboardingStep < 2) {
    showScreen("screen-dialogue");
  } else if (!state.activeHypothesis) {
    showScreen("screen-directions");
  } else {
    showScreen("screen-today");
  }
  updateUI();

  // Reset tlačítko
  document.getElementById("btn-reset-state").addEventListener("click", resetState);

  // Zavření notifikace
  document.getElementById("btn-close-notification").addEventListener("click", () => {
    document.getElementById("notification-banner").style.display = "none";
  });

  // Odeslání odpovědi v rozhovoru
  document.getElementById("btn-send-message").addEventListener("click", handleSendMessage);
  document.getElementById("chat-user-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Přeskočení otázky
  document.getElementById("btn-skip-question").addEventListener("click", () => {
    if (state.onboardingStep === 0) {
      state.answers.flow = "Otázka přeskočena (bez odpovědi).";
      state.onboardingStep = 1;
    } else if (state.onboardingStep === 1) {
      state.answers.drain = "Otázka přeskočena (bez odpovědi).";
      state.onboardingStep = 2;
    }
    saveState();
    if (state.onboardingStep === 2) {
      setTimeout(() => showScreen("screen-directions"), 500);
    }
  });

  // Potvrzení směru
  document.getElementById("btn-confirm-direction").addEventListener("click", () => {
    if (state.activeHypothesis) {
      state.onboardingStep = 3;
      saveState();
      showScreen("screen-today");
      showNotification(`Zvolen směr: ${state.activeHypothesis.title}`);
    }
  });

  // Výběr varianty pokusu (2, 5, 15 min)
  document.querySelectorAll(".variant-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selectedVariantMinutes = parseInt(btn.getAttribute("data-min"), 10);
      saveState();
    });
  });

  // Výměna pokusu za jiný
  document.getElementById("btn-switch-experiment").addEventListener("click", () => {
    const currentIndex = EXPERIMENTS_CATALOG.findIndex(e => e.id === state.selectedExperimentId);
    const nextIndex = (currentIndex + 1) % EXPERIMENTS_CATALOG.length;
    state.selectedExperimentId = EXPERIMENTS_CATALOG[nextIndex].id;
    saveState();
    showNotification(`Pokus vyměněn za: ${EXPERIMENTS_CATALOG[nextIndex].title}`);
  });

  // Dnes odpočinek
  document.getElementById("btn-rest-today").addEventListener("click", () => {
    const dayIdx = state.currentDay - 1;
    state.days[dayIdx].status = "rest";
    state.days[dayIdx].note = "Vědomý odpočinek k načerpání energie.";
    if (state.currentDay < 14) state.currentDay++;
    saveState();
    showNotification("Odpočinek zaznamenán. Dnes naber síly!");
  });

  // Výběr Semafor energie
  document.querySelectorAll(".semafor-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selectedEnergy = btn.getAttribute("data-energy");
      saveState();
    });
  });

  // Uložení reflexe pokusu
  document.getElementById("btn-save-reflection").addEventListener("click", () => {
    if (!state.selectedEnergy) return;

    const exp = EXPERIMENTS_CATALOG.find(e => e.id === state.selectedExperimentId);
    const note = document.getElementById("reflection-note").value.trim();
    const dayIdx = state.currentDay - 1;

    state.days[dayIdx].status = "completed";
    state.days[dayIdx].energy = state.selectedEnergy;
    state.days[dayIdx].experimentTitle = exp ? exp.title : "Pokus";
    state.days[dayIdx].note = note || null;

    // Postup na další den (pokud nejsme na 14)
    if (state.currentDay < 14) {
      state.currentDay++;
      // Reset výběru pro nový den
      state.selectedEnergy = null;
      document.getElementById("reflection-note").value = "";
    }

    saveState();
    showNotification("Reflexe byla úspěšně zaznamenána do matice kalendáře!");
  });

  // Navigační tlačítka dole
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetScreen = btn.getAttribute("data-screen");
      showScreen(targetScreen);
    });
  });
});

function handleSendMessage() {
  const input = document.getElementById("chat-user-input");
  const text = input.value.trim();
  if (!text) return;

  if (state.onboardingStep === 0) {
    state.answers.flow = text;
    state.onboardingStep = 1;
    input.value = "";
    saveState();
  } else if (state.onboardingStep === 1) {
    state.answers.drain = text;
    state.onboardingStep = 2;
    input.value = "";
    saveState();
    setTimeout(() => {
      showScreen("screen-directions");
      showNotification("Hypotézy byly vygenerovány na nástěnku!");
    }, 700);
  }
}
