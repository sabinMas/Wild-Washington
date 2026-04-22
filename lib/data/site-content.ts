import {
  type ActionLink,
  type ConfidenceLevel,
  type PopulationMetricKind,
  type SpeciesRecord,
  type TrendDirection,
} from "@/types/species";

export interface ComparisonPreset {
  key: string;
  title: string;
  description: string;
  slugs: string[];
}

const trendLabels: Record<TrendDirection, string> = {
  improving: "Improving",
  declining: "Declining",
  stable: "Stable",
};

const confidenceLabels: Record<ConfidenceLevel, string> = {
  high: "High confidence",
  moderate: "Moderate confidence",
  limited: "Limited confidence",
};

const metricKindLabels: Record<PopulationMetricKind, string> = {
  census: "Direct census",
  "minimum-count": "Minimum confirmed count",
  estimate: "Modeled estimate",
  proxy: "Indicator or proxy metric",
};

const metricKindDescriptions: Record<PopulationMetricKind, string> = {
  census: "Direct counts or repeated monitoring designed to measure the population itself.",
  "minimum-count":
    "Confirmed minimums where the true total may be higher than the reported number.",
  estimate:
    "Best-fit estimates derived from surveys or summarized agency reporting rather than a full count.",
  proxy:
    "A substitute indicator such as occupied habitat units or territories when a direct population count is not available.",
};

const actionTypeMeta: Record<
  ActionLink["type"],
  { label: string; description: string }
> = {
  "field-trip": {
    label: "See the landscape for yourself",
    description:
      "Field experiences help learners connect a chart or map to the real habitats that support recovery.",
  },
  "citizen-science": {
    label: "Contribute observations or data",
    description:
      "Citizen-science projects turn curiosity into evidence and give communities a practical way to support monitoring.",
  },
  volunteer: {
    label: "Join hands-on stewardship",
    description:
      "Volunteer opportunities make recovery work tangible, from habitat restoration to community-led monitoring.",
  },
  organization: {
    label: "Support the organizations doing the work",
    description:
      "These groups provide deeper reading, policy context, and long-term recovery programs connected to featured species.",
  },
};

const storyAngles: Record<
  TrendDirection,
  { label: string; description: string }
> = {
  improving: {
    label: "Recovery story",
    description:
      "Useful for studying where habitat protection or targeted management may be helping the species climb.",
  },
  declining: {
    label: "Pressure story",
    description:
      "Useful for exploring how disturbance, habitat loss, or food-web change can still overwhelm recovery work.",
  },
  stable: {
    label: "Watchpoint story",
    description:
      "Useful for discussing species that are holding on, but still depend on steady monitoring and support.",
  },
};

function uniqueRecords(records: Array<SpeciesRecord | undefined>) {
  const seen = new Set<string>();

  return records.filter((record): record is SpeciesRecord => {
    if (!record || seen.has(record.slug)) {
      return false;
    }

    seen.add(record.slug);
    return true;
  });
}

export function getTrendLabel(trend: TrendDirection) {
  return trendLabels[trend];
}

export function getConfidenceLabel(confidence: ConfidenceLevel) {
  return confidenceLabels[confidence];
}

export function getMetricKindLabel(kind: PopulationMetricKind) {
  return metricKindLabels[kind];
}

export function getMetricKindDescription(kind: PopulationMetricKind) {
  return metricKindDescriptions[kind];
}

export function getStoryAngle(species: SpeciesRecord) {
  return storyAngles[species.trend];
}

export function getTrendDelta(species: SpeciesRecord) {
  const first = species.populationSeries[0]?.estimate ?? 0;
  const last = species.populationSeries.at(-1)?.estimate ?? 0;

  if (!first || !last) {
    return 0;
  }

  return ((last - first) / first) * 100;
}

export function getTrendSummary(species: SpeciesRecord) {
  const delta = getTrendDelta(species);
  const roundedDelta = Math.round(Math.abs(delta));

  if (species.trend === "improving") {
    return `${species.commonName} is currently about ${roundedDelta}% above its first observed checkpoint, which makes it a strong recovery case study without implying the work is finished.`;
  }

  if (species.trend === "declining") {
    return `${species.commonName} is currently about ${roundedDelta}% below its first observed checkpoint, which makes the chart especially useful for discussing ongoing pressure and incomplete recovery.`;
  }

  return `${species.commonName} is staying close to its baseline, which makes it a useful example of why stable does not automatically mean secure or fully recovered.`;
}

export function getSuggestedCompareSpecies(
  species: SpeciesRecord,
  collection: SpeciesRecord[],
) {
  if (species.suggestedComparisonSlug) {
    const curatedMatch = collection.find(
      (candidate) =>
        candidate.slug === species.suggestedComparisonSlug && candidate.slug !== species.slug,
    );

    if (curatedMatch) {
      return curatedMatch;
    }
  }

  return [...collection]
    .filter((candidate) => candidate.slug !== species.slug)
    .sort((a, b) => {
      const score = (candidate: SpeciesRecord) =>
        (candidate.trend !== species.trend ? 3 : 0) +
        (candidate.speciesGroup !== species.speciesGroup ? 2 : 0) +
        (candidate.range.habitats.some((habitat) => !species.range.habitats.includes(habitat))
          ? 1
          : 0);

      return score(b) - score(a);
    })[0];
}

export function buildComparisonPresets(species: SpeciesRecord[]): ComparisonPreset[] {
  const presets: ComparisonPreset[] = [];

  const trendMix = uniqueRecords([
    species.find((record) => record.trend === "improving"),
    species.find((record) => record.trend === "stable"),
    species.find((record) => record.trend === "declining"),
  ]);

  if (trendMix.length >= 2) {
    presets.push({
      key: "trend-mix",
      title: "Mixed recovery patterns",
      description:
        "Start with species moving in different directions so the normalized chart shows why one-size-fits-all conservation stories break down.",
      slugs: trendMix.map((record) => record.slug),
    });
  }

  const birds = species.filter(
    (record) => record.speciesGroup === "Bird" || record.speciesGroup === "Seabird",
  );

  if (birds.length >= 2) {
    presets.push({
      key: "birds",
      title: "Birds under different pressures",
      description:
        "Use bird species to compare what forest loss, marine food webs, and nesting conditions do to recovery trajectories.",
      slugs: birds.slice(0, 3).map((record) => record.slug),
    });
  }

  const landAndWater = uniqueRecords([
    species.find(
      (record) =>
        record.speciesGroup === "Fish" || record.speciesGroup === "Marine mammal",
    ),
    species.find(
      (record) =>
        record.speciesGroup === "Mammal" || record.speciesGroup === "Amphibian",
    ),
    species.find(
      (record) =>
        record.speciesGroup === "Bird" || record.speciesGroup === "Seabird",
    ),
  ]);

  if (landAndWater.length >= 2) {
    presets.push({
      key: "land-water",
      title: "Land, coast, and inland habitats",
      description:
        "Compare species tied to different Washington landscapes so the chart becomes a conversation about place as much as population change.",
      slugs: landAndWater.map((record) => record.slug),
    });
  }

  return presets;
}

export function getMethodologySummary(species: SpeciesRecord[]) {
  const totalObservedCheckpoints = species.reduce(
    (sum, record) => sum + record.populationSeries.length,
    0,
  );
  const earliestYear = Math.min(
    ...species.map((record) => record.populationSeries[0]?.year ?? Number.POSITIVE_INFINITY),
  );
  const latestYear = Math.max(
    ...species.map((record) => record.populationSeries.at(-1)?.year ?? 0),
  );
  const sourceSystems = [...new Set(species.map((record) => record.sourceSystem))].sort();

  const metricKinds = (Object.keys(metricKindLabels) as PopulationMetricKind[])
    .map((kind) => ({
      kind,
      label: getMetricKindLabel(kind),
      description: getMetricKindDescription(kind),
      count: species.filter((record) => record.populationMetric.kind === kind).length,
    }))
    .filter((entry) => entry.count > 0);

  const confidenceLevels = (["high", "moderate", "limited"] as const).map(
    (confidence) => ({
      confidence,
      label: getConfidenceLabel(confidence),
      count: species.filter((record) => record.currentPopulation.confidence === confidence)
        .length,
    }),
  );

  return {
    totalObservedCheckpoints,
    observedYearRange: `${earliestYear}-${latestYear}`,
    sourceSystems,
    metricKinds,
    confidenceLevels,
  };
}

export function getActionGroups(species: SpeciesRecord[]) {
  return (Object.keys(actionTypeMeta) as ActionLink["type"][])
    .map((type) => ({
      type,
      label: actionTypeMeta[type].label,
      description: actionTypeMeta[type].description,
      items: species
        .flatMap((record) =>
          record.actions
            .filter((action) => action.type === type)
            .map((action) => ({
              ...action,
              speciesName: record.commonName,
              speciesSlug: record.slug,
              speciesGroup: record.speciesGroup,
            })),
        )
        .sort((a, b) =>
          `${a.speciesName}-${a.title}`.localeCompare(`${b.speciesName}-${b.title}`),
        ),
    }))
    .filter((group) => group.items.length > 0);
}
