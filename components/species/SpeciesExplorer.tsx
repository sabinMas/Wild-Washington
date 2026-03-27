"use client";

import { useMemo, useState } from "react";
import { SpeciesCard } from "@/components/species/SpeciesCard";
import { cn } from "@/lib/utils";
import { type SpeciesRecord, type TrendDirection } from "@/types/species";

const trendFilters = [
  {
    value: "all",
    label: "All species",
    description: "See the full dashboard collection.",
  },
  {
    value: "improving",
    label: "Improving",
    description: "Species showing stronger recovery trends.",
  },
  {
    value: "declining",
    label: "Declining",
    description: "Species still under clear pressure.",
  },
  {
    value: "stable",
    label: "Stable",
    description: "Species holding relatively steady right now.",
  },
] as const;

const sortOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "trend", label: "Trend status" },
  { value: "group", label: "Species group" },
] as const;

const trendPriority: Record<TrendDirection, number> = {
  improving: 0,
  stable: 1,
  declining: 2,
};

function resetControls(
  setQuery: (value: string) => void,
  setTrend: (value: (typeof trendFilters)[number]["value"]) => void,
  setSortBy: (value: (typeof sortOptions)[number]["value"]) => void,
) {
  setQuery("");
  setTrend("all");
  setSortBy("name");
}

export function SpeciesExplorer({ species }: { species: SpeciesRecord[] }) {
  const [query, setQuery] = useState("");
  const [trend, setTrend] = useState<(typeof trendFilters)[number]["value"]>("all");
  const [sortBy, setSortBy] = useState<(typeof sortOptions)[number]["value"]>("name");

  const counts = useMemo(() => {
    return {
      all: species.length,
      improving: species.filter((record) => record.trend === "improving").length,
      declining: species.filter((record) => record.trend === "declining").length,
      stable: species.filter((record) => record.trend === "stable").length,
    };
  }, [species]);

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();

    return species
      .filter((record) => {
        const matchesTrend = trend === "all" ? true : record.trend === trend;
        const matchesQuery =
          lower.length === 0 ||
          record.commonName.toLowerCase().includes(lower) ||
          record.speciesGroup.toLowerCase().includes(lower) ||
          record.shortLabel.toLowerCase().includes(lower) ||
          record.listingStatus.toLowerCase().includes(lower);

        return matchesTrend && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "trend") {
          return (
            trendPriority[a.trend] - trendPriority[b.trend] ||
            a.commonName.localeCompare(b.commonName)
          );
        }

        if (sortBy === "group") {
          return (
            a.speciesGroup.localeCompare(b.speciesGroup) ||
            a.commonName.localeCompare(b.commonName)
          );
        }

        return a.commonName.localeCompare(b.commonName);
      });
  }, [query, sortBy, species, trend]);

  const hasActiveControls = query.trim().length > 0 || trend !== "all" || sortBy !== "name";
  const helperText =
    trend === "all"
      ? "Use the trend chips to narrow the dashboard, then sort or search when you know what you want to compare."
      : `Filtered to ${trend} species so you can browse that recovery pattern more quickly.`;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="panel rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-5 lg:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.95fr)]">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_14rem]">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-muted">Search by species, group, or listing status</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try orca, bird, rabbit, threatened..."
                  className="input-field"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-muted">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as (typeof sortOptions)[number]["value"])
                  }
                  className="input-field"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              {trendFilters.map((option) => {
                const active = trend === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTrend(option.value)}
                    data-active={active}
                    className="filter-chip shrink-0"
                  >
                    {option.label}
                    <span
                      className={cn(
                        "ml-2 rounded-full px-2 py-0.5 text-xs font-bold",
                        active ? "bg-white/18 text-white" : "bg-ocean/8 text-ocean",
                      )}
                    >
                      {counts[option.value]}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-sm leading-6 text-muted">{helperText}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {trendFilters.slice(1).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTrend(option.value)}
                className={cn(
                  "panel-soft rounded-[1.2rem] p-4 text-left transition",
                  trend === option.value && "ring-2 ring-[var(--ring-strong)]",
                )}
              >
                <p className="eyebrow">{option.label}</p>
                <p className="mt-2 text-2xl font-bold text-ink">{counts[option.value]}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{option.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">
            Showing {filtered.length} of {species.length} species
          </p>
          <p className="mt-1 text-sm leading-6 text-muted">
            Each card opens a species profile with trend context, habitat mapping, actions, and lesson-ready detail.
          </p>
        </div>
        {hasActiveControls ? (
          <button
            type="button"
            onClick={() => resetControls(setQuery, setTrend, setSortBy)}
            className="button-secondary"
          >
            Reset dashboard controls
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="panel rounded-[1.5rem] p-6 text-center sm:p-8">
          <p className="eyebrow">No matching species</p>
          <h2 className="section-title mt-3 text-ocean">Try a broader search or reset the current filters</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted">
            Search works across common names, species groups, and listing status. If you are not finding a match, clear the current trend filter or start with the full list.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => resetControls(setQuery, setTrend, setSortBy)}
              className="button-primary"
            >
              Show all species
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((record) => (
            <SpeciesCard key={record.slug} species={record} />
          ))}
        </div>
      )}
    </div>
  );
}
