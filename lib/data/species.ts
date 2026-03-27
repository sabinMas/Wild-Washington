import { adaptSpeciesRecord } from "@/lib/data/adapters";
import { rawSpeciesRecords } from "@/lib/data/source-data";
import { type SpeciesRecord } from "@/types/species";

const speciesCollection = rawSpeciesRecords.map(adaptSpeciesRecord);

function byName(a: SpeciesRecord, b: SpeciesRecord) {
  return a.commonName.localeCompare(b.commonName);
}

export function getSpeciesRecords() {
  return [...speciesCollection].sort(byName);
}

export function getSpeciesSlugs() {
  return speciesCollection.map((record) => record.slug);
}

export function getSpeciesBySlug(slug: string) {
  return speciesCollection.find((record) => record.slug === slug);
}

export function getDashboardSummary() {
  const records = getSpeciesRecords();

  return {
    totalSpecies: records.length,
    improving: records.filter((record) => record.trend === "improving").length,
    declining: records.filter((record) => record.trend === "declining").length,
    stable: records.filter((record) => record.trend === "stable").length,
  };
}
