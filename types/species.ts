export type TrendDirection = "improving" | "declining" | "stable";
export type ConfidenceLevel = "high" | "moderate" | "limited";
export type LearningAudience = "elementary" | "middle" | "high" | "educators";

export interface PopulationCheckpoint {
  year: number;
  estimate: number;
  low?: number;
  high?: number;
}

export interface PopulationDatum extends PopulationCheckpoint {
  displayValue: string;
}

export interface DistributionRegion {
  name: string;
  center: [number, number];
  radiusKm: number;
  note: string;
}

export interface ThreatItem {
  title: string;
  description: string;
}

export interface ConservationEffort {
  title: string;
  description: string;
  partners: string[];
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export interface LearningModule {
  title: string;
  focus: string;
  bullets: string[];
  extension: string;
}

export interface ActionLink {
  title: string;
  description: string;
  href: string;
  type: "field-trip" | "citizen-science" | "volunteer" | "organization";
}

export interface DataSourceReference {
  label: string;
  organization: string;
  href: string;
  note: string;
}

export interface CurrentPopulationSnapshot {
  year: number;
  estimate: number;
  low?: number;
  high?: number;
  unit: string;
  summary: string;
  confidence: ConfidenceLevel;
}

export interface RawSpeciesRecord {
  slug: string;
  commonName: string;
  scientificName: string;
  shortLabel: string;
  speciesGroup: string;
  listingStatus: string;
  heroSummary: string;
  quickFact: string;
  primaryColor: string;
  sourceSystem: string;
  dataNotes: string[];
  range: {
    center: [number, number];
    zoom: number;
    habitats: string[];
    regions: DistributionRegion[];
  };
  population: {
    unit: string;
    startYear: number;
    endYear: number;
    checkpoints: PopulationCheckpoint[];
    confidence: ConfidenceLevel;
    summary: string;
  };
  threats: ThreatItem[];
  conservationEfforts: ConservationEffort[];
  timeline: TimelineEvent[];
  learning: Record<LearningAudience, LearningModule>;
  actions: ActionLink[];
  sources: DataSourceReference[];
}

export interface SpeciesRecord {
  slug: string;
  commonName: string;
  scientificName: string;
  shortLabel: string;
  speciesGroup: string;
  listingStatus: string;
  heroSummary: string;
  quickFact: string;
  primaryColor: string;
  sourceSystem: string;
  dataNotes: string[];
  trend: TrendDirection;
  populationSeries: PopulationDatum[];
  currentPopulation: CurrentPopulationSnapshot;
  range: RawSpeciesRecord["range"];
  threats: ThreatItem[];
  conservationEfforts: ConservationEffort[];
  timeline: TimelineEvent[];
  learning: Record<LearningAudience, LearningModule>;
  actions: ActionLink[];
  sources: DataSourceReference[];
}
