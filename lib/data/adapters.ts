import {
  type CurrentPopulationSnapshot,
  type PopulationDatum,
  type RawSpeciesRecord,
  type SpeciesRecord,
  type TrendDirection,
} from "@/types/species";
import { speciesMediaBySlug } from "@/lib/data/species-media";
import { formatNumber } from "@/lib/utils";

function interpolateSeries(record: RawSpeciesRecord): PopulationDatum[] {
  return [...record.population.checkpoints]
    .sort((a, b) => a.year - b.year)
    .map((point) => ({
      ...point,
      displayValue: formatNumber(point.estimate),
    }));
}

function deriveTrend(series: PopulationDatum[]): TrendDirection {
  const first = series[0]?.estimate ?? 0;
  const last = series.at(-1)?.estimate ?? 0;

  if (!first || !last) {
    return "stable";
  }

  const change = (last - first) / first;

  if (change >= 0.08) {
    return "improving";
  }

  if (change <= -0.08) {
    return "declining";
  }

  return "stable";
}

function createCurrentPopulation(
  record: RawSpeciesRecord,
  series: PopulationDatum[],
): CurrentPopulationSnapshot {
  const latest = series.at(-1);

  if (!latest) {
    throw new Error(`Missing population series for ${record.slug}.`);
  }

  return {
    year: latest.year,
    estimate: latest.estimate,
    low: latest.low,
    high: latest.high,
    unit: record.population.unit,
    summary: record.population.summary,
    confidence: record.population.confidence,
  };
}

export function adaptSpeciesRecord(record: RawSpeciesRecord): SpeciesRecord {
  const populationSeries = interpolateSeries(record);
  const media = speciesMediaBySlug[record.slug];

  if (!media) {
    throw new Error(`Missing media definition for ${record.slug}.`);
  }

  return {
    slug: record.slug,
    commonName: record.commonName,
    scientificName: record.scientificName,
    shortLabel: record.shortLabel,
    suggestedComparisonSlug: record.suggestedComparisonSlug,
    speciesGroup: record.speciesGroup,
    listingStatus: record.listingStatus,
    heroSummary: record.heroSummary,
    quickFact: record.quickFact,
    primaryColor: record.primaryColor,
    media,
    sourceSystem: record.sourceSystem,
    dataNotes: record.dataNotes,
    trend: deriveTrend(populationSeries),
    populationSeries,
    currentPopulation: createCurrentPopulation(record, populationSeries),
    populationMetric: record.population.metric,
    range: record.range,
    threats: record.threats,
    conservationEfforts: record.conservationEfforts,
    timeline: record.timeline,
    learning: record.learning,
    actions: record.actions,
    sources: record.sources,
  };
}
