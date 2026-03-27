"use client";

import { useMemo, useState } from "react";
import { SpeciesCard } from "@/components/species/SpeciesCard";
import { type SpeciesRecord } from "@/types/species";

const trendFilters = ["all", "improving", "declining", "stable"] as const;

export function SpeciesExplorer({ species }: { species: SpeciesRecord[] }) {
  const [query, setQuery] = useState("");
  const [trend, setTrend] = useState<(typeof trendFilters)[number]>("all");

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();

    return species.filter((record) => {
      const matchesTrend = trend === "all" ? true : record.trend === trend;
      const matchesQuery =
        lower.length === 0 ||
        record.commonName.toLowerCase().includes(lower) ||
        record.speciesGroup.toLowerCase().includes(lower) ||
        record.shortLabel.toLowerCase().includes(lower);

      return matchesTrend && matchesQuery;
    });
  }, [query, species, trend]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="panel rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-muted">Search by species name or group</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try orca, bird, rabbit..."
              className="input-field"
            />
          </label>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            {trendFilters.map((option) => {
              const active = trend === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTrend(option)}
                  data-active={active}
                  className="filter-chip shrink-0 capitalize"
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted">
        Showing <strong>{filtered.length}</strong> species. Each card links to a clearer
        species dashboard with source-aware trend data, lesson pages, and action steps.
      </p>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((record) => (
          <SpeciesCard key={record.slug} species={record} />
        ))}
      </div>
    </div>
  );
}
