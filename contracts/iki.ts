/**
 * IKI — Přenositelné TypeScript doménové typy a kontrakty
 * 
 * Tyto typy definují společné rozhraní pro obsah, prototyp, AI rozhraní i doménové jádro.
 * Neobsahují žádné závislosti na Next.js, Firebase ani externích knihovnách.
 */

/** Verze schématu uložených dat a obsahu */
export const DATA_SCHEMA_VERSION = "1.0.0";
export const CONTENT_VERSION = "2026-10-09";

/** Formát lokálního kalendářního dne: YYYY-MM-DD */
export type IsoDateString = string;

/** Formát časového okamžiku: ISO 8601 UTC řetězec, např. 2026-10-09T17:00:00.000Z */
export type IsoTimestampString = string;

/** Subjektivní stav energie zaznamenaný v Semaforu */
export type EnergyLevel = "energized" | "neutral" | "drained";

/** Typ vlastníka profilu */
export type OwnerType = "anonymous" | "authenticated";

/** Stav potvrzení hypotézy uživatelem */
export type HypothesisStatus = "draft" | "confirmed" | "rejected" | "customized";

/** Stav plánovaného pokusu */
export type ExperimentStatus = "planned" | "completed" | "rescheduled" | "abandoned";

/** Typ dne v kalendáři */
export type DayEntryType = "experiment" | "rest" | "unrecorded";

/** Profil a vlastník relace */
export interface UserProfile {
  userId: string;
  ownerType: OwnerType;
  /** IANA identifikátor časového pásma zadaný aplikací, např. 'Europe/Prague' */
  timeZone: string;
  createdAt: IsoTimestampString;
  updatedAt: IsoTimestampString;
  dataSchemaVersion: string;
  contentVersion: string;
}

/** Záznam konkrétní zkušenosti uživatele (odpověď z rozhovoru) */
export interface UserExperience {
  id: string;
  userId: string;
  promptQuestionId: string;
  /** Skutečný text uživatele nebo null, pokud uživatel otázku přeskočil */
  responseContent: string | null;
  isSkipped: boolean;
  recordedAt: IsoTimestampString;
}

/** Pracovní hypotéza směru formulovaná AI průvodcem */
export interface DirectionHypothesis {
  id: string;
  userId: string;
  title: string;
  description: string;
  /** ID záznamů UserExperience, ze kterých tato hypotéza přímo vychází */
  evidenceIds: string[];
  /** Alternativní interpretace nebo proti-hypotéza, pokud existují protichůdná data */
  alternativeExplanation?: string;
  status: HypothesisStatus;
  userNotes?: string;
  createdAt: IsoTimestampString;
  updatedAt: IsoTimestampString;
}

/** Zkrácená varianta katalogového pokusu (např. 5minutový Kaizen krok) */
export interface ExperimentVariant {
  id: string;
  title: string;
  instructions: string;
  estimatedMinutes: number;
}

/** Položka katalogu pokusů */
export interface CatalogExperiment {
  id: string;
  code: string; // např. "EXP-01"
  title: string;
  summary: string;
  instructions: string;
  estimatedMinutes: number;
  tags: string[];
  variants: ExperimentVariant[];
  version: string;
}

/** Večerní reflexe provedeného pokusu (Semafor) */
export interface ExperimentReflection {
  energy: EnergyLevel;
  /** Subjektivní postřeh (1–2 věty); striktně volitelný */
  notes?: string;
  reflectedAt: IsoTimestampString;
}

/** Výsledek pokusu nahlášený uživatelem */
export interface ExperimentResult {
  status: ExperimentStatus;
  reflection?: ExperimentReflection;
  /** Důvod v případě přesunutí či opuštění */
  reason?: string;
  completedAt?: IsoTimestampString;
}

/** Plánovaný pokus pro konkrétní den */
export interface PlannedExperiment {
  id: string;
  userId: string;
  /** Vazba na katalogový pokus */
  experimentId: string;
  /** Vazba na směr/hypotézu, kterou pokus ověřuje */
  hypothesisId: string;
  /** Vybraná varianta pokusu, pokud byla zvolena */
  variantId?: string;
  /** Den v kalendáři, na který je pokus naplánován (YYYY-MM-DD) */
  targetDate: IsoDateString;
  result?: ExperimentResult;
  createdAt: IsoTimestampString;
  updatedAt: IsoTimestampString;
}

/** Záznam o vědomém odpočinku (Dnes nemám kapacitu) */
export interface RestEntry {
  id: string;
  userId: string;
  date: IsoDateString;
  note?: string;
  recordedAt: IsoTimestampString;
}

/** Jeden den v matici 14denního programu (Matrix Level) */
export interface CalendarDayView {
  dayNumber: number; // 1 až 14
  date: IsoDateString;
  type: DayEntryType;
  experiment?: PlannedExperiment;
  rest?: RestEntry;
}

/** Týdenní syntéza (Den 7 a Den 14) */
export interface WeeklySummary {
  id: string;
  userId: string;
  weekNumber: 1 | 2;
  generatedAt: IsoTimestampString;
  analyzedDays: IsoDateString[];
  /** Citovaná zjištění z pokusů s odkazy na id experimentů */
  keyFindings: {
    observation: string;
    energyEvidence: EnergyLevel;
    referencedExperimentIds: string[];
  }[];
  suggestedDirectionIds: string[];
  userApproved: boolean;
  userFeedback?: string;
}

/** Vizuální vzpomínka v dílně (odvozená ze zkušenosti uživatele) */
export interface VisualMemory {
  id: string;
  userId: string;
  /** Předmět na poličce či lístek na nástěnce */
  itemId: string;
  title: string;
  description: string;
  /** Vazba na skutečně dokončený pokus */
  originExperimentId: string;
  unlockedAt: IsoTimestampString;
}

/** Celkový stav 14denní cesty uživatele */
export interface JourneyState {
  profile: UserProfile;
  currentDayNumber: number; // 1 až 14
  activeHypothesisId?: string;
  experiences: UserExperience[];
  hypotheses: DirectionHypothesis[];
  plannedExperiments: PlannedExperiment[];
  restEntries: RestEntry[];
  weeklySummaries: WeeklySummary[];
  visualMemories: VisualMemory[];
}

/** Strukturovaný kontrakt pro výstup AI průvodce */
export interface AiDialogueOutput {
  replyMessage: string;
  isTerminal: boolean; // Zda konverzace končí a uživatel má jít do reality
  generatedHypotheses?: {
    title: string;
    description: string;
    evidenceQuotes: string[];
    alternativeExplanation?: string;
  }[];
  suggestedExperimentIds?: string[];
  confidenceNote?: string;
}
