export type TrendDirection = "improving" | "declining" | "stable";
export type ConfidenceLevel = "high" | "moderate" | "limited";
export type LearningAudience = "elementary" | "middle" | "high" | "educators";
export type PopulationMetricKind =
  | "census"
  | "minimum-count"
  | "estimate"
  | "proxy";

export interface PopulationCheckpoint {
  year: number;
  estimate: number;
  low?: number;
  high?: number;
  note?: string;
}

export interface PopulationDatum extends PopulationCheckpoint {
  displayValue: string;
}

export interface PopulationMetricMeta {
  label: string;
  kind: PopulationMetricKind;
  whatItTracks: string;
  whyItMatters: string;
  precisionNote: string;
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

export interface LessonStep {
  title: string;
  detail: string;
}

export interface LessonPage {
  audience: LearningAudience;
  audienceLabel: string;
  title: string;
  focus: string;
  summary: string;
  essentialQuestion: string;
  objectives: string[];
  materials: string[];
  vocabulary: string[];
  visualStudy: string[];
  walkthrough: LessonStep[];
  discussionPrompts: string[];
  assessment: string;
  extension: string;
  visualCaption: string;
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

export interface SpeciesMedia {
  src: string;
  alt: string;
  photographer: string;
  photographerHref: string;
  sourceLabel: string;
  sourceHref: string;
  licenseLabel: string;
  licenseHref: string;
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
  suggestedComparisonSlug?: string;
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
    metric: PopulationMetricMeta;
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
  suggestedComparisonSlug?: string;
  speciesGroup: string;
  listingStatus: string;
  heroSummary: string;
  quickFact: string;
  primaryColor: string;
  media: SpeciesMedia;
  sourceSystem: string;
  dataNotes: string[];
  trend: TrendDirection;
  populationSeries: PopulationDatum[];
  currentPopulation: CurrentPopulationSnapshot;
  populationMetric: PopulationMetricMeta;
  range: RawSpeciesRecord["range"];
  threats: ThreatItem[];
  conservationEfforts: ConservationEffort[];
  timeline: TimelineEvent[];
  learning: Record<LearningAudience, LearningModule>;
  actions: ActionLink[];
  sources: DataSourceReference[];
}
