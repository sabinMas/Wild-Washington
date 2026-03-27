import {
  type CurrentPopulationSnapshot,
  type PopulationCheckpoint,
  type PopulationDatum,
  type RawSpeciesRecord,
  type SpeciesRecord,
  type TrendDirection,
} from "@/types/species";
import { speciesMediaBySlug } from "@/lib/data/species-media";
import { formatNumber } from "@/lib/utils";

function interpolateValue(
  year: number,
  left: PopulationCheckpoint,
  right: PopulationCheckpoint,
  key: "estimate" | "low" | "high",
) {
  const leftValue = left[key];
  const rightValue = right[key];

  if (leftValue === undefined && rightValue === undefined) {
    return undefined;
  }

  if (leftValue === undefined) {
    return rightValue;
  }

  if (rightValue === undefined) {
    return leftValue;
  }

  if (left.year === right.year) {
    return leftValue;
  }

  const progress = (year - left.year) / (right.year - left.year);
  return leftValue + (rightValue - leftValue) * progress;
}

function interpolateSeries(record: RawSpeciesRecord): PopulationDatum[] {
  const { startYear, endYear, checkpoints } = record.population;
  const ordered = [...checkpoints].sort((a, b) => a.year - b.year);

  return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = startYear + index;
    const exact = ordered.find((point) => point.year === year);

    if (exact) {
      return {
        ...exact,
        displayValue: formatNumber(exact.estimate),
      };
    }

    const previous = [...ordered].reverse().find((point) => point.year < year);
    const next = ordered.find((point) => point.year > year);

    if (!previous || !next) {
      throw new Error(`Unable to interpolate ${record.slug} for ${year}.`);
    }

    const estimate = Math.round(
      interpolateValue(year, previous, next, "estimate") ?? 0,
    );

    return {
      year,
      estimate,
      low: Math.round(interpolateValue(year, previous, next, "low") ?? 0),
      high: Math.round(interpolateValue(year, previous, next, "high") ?? 0),
      displayValue: formatNumber(estimate),
    };
  });
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
    range: record.range,
    threats: record.threats,
    conservationEfforts: record.conservationEfforts,
    timeline: record.timeline,
    learning: record.learning,
    actions: record.actions,
    sources: record.sources,
  };
}
