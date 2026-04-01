"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SpeciesCard } from "@/components/species/SpeciesCard";
import { cn } from "@/lib/utils";
import { type SpeciesRecord, type TrendDirection } from "@/types/species";

const trendFilters = [
  {
    value: "all",
    label: "All species",
    description: "See the full Washington collection.",
  },
  {
    value: "improving",
    label: "Improving",
    description: "Species showing clearer recovery momentum.",
  },
  {
    value: "declining",
    label: "Declining",
    description: "Species still under strong pressure.",
  },
  {
    value: "stable",
    label: "Stable",
    description: "Species holding relatively steady for now.",
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

function buildGroupFilters(species: SpeciesRecord[]) {
  return ["all", ...new Set(species.map((record) => record.speciesGroup))];
}

export function SpeciesExplorer({ species }: { species: SpeciesRecord[] }) {
  const [query, setQuery] = useState("");
  const [trend, setTrend] = useState<(typeof trendFilters)[number]["value"]>("all");
  const [group, setGroup] = useState<string>("all");
  const [sortBy, setSortBy] = useState<(typeof sortOptions)[number]["value"]>("name");

  const groupFilters = useMemo(() => buildGroupFilters(species), [species]);

  const counts = useMemo(() => {
    const byGroup = Object.fromEntries(
      groupFilters.map((value) => [
        value,
        value === "all"
          ? species.length
          : species.filter((record) => record.speciesGroup === value).length,
      ]),
    );

    return {
      all: species.length,
      improving: species.filter((record) => record.trend === "improving").length,
      declining: species.filter((record) => record.trend === "declining").length,
      stable: species.filter((record) => record.trend === "stable").length,
      byGroup,
    };
  }, [groupFilters, species]);

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();

    return species
      .filter((record) => {
        const matchesTrend = trend === "all" ? true : record.trend === trend;
        const matchesGroup = group === "all" ? true : record.speciesGroup === group;
        const matchesQuery =
          lower.length === 0 ||
          record.commonName.toLowerCase().includes(lower) ||
          record.speciesGroup.toLowerCase().includes(lower) ||
          record.shortLabel.toLowerCase().includes(lower) ||
          record.listingStatus.toLowerCase().includes(lower);

        return matchesTrend && matchesGroup && matchesQuery;
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
  }, [group, query, sortBy, species, trend]);

  const hasActiveControls =
    query.trim().length > 0 || trend !== "all" || group !== "all" || sortBy !== "name";
  const helperText =
    query.trim().length > 0
      ? `Searching for "${query.trim()}". Search checks species name, group, and listing status so educators and students can find a teaching set quickly.`
      : trend === "all" && group === "all"
        ? "Start broad, then use trend or group chips to build a smaller set for discussion, comparison, or classroom use."
        : `Showing a narrower browse lens${group !== "all" ? ` for ${group.toLowerCase()} species` : ""}${trend !== "all" ? ` with a ${trend} trend` : ""}.`;

  function resetControls() {
    setQuery("");
    setTrend("all");
    setGroup("all");
    setSortBy("name");
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="panel rounded-[1.75rem] p-4 sm:p-5 lg:p-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.9fr)]">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_14rem]">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-muted">
                  Search by species, group, or listing status
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try orca, bird, threatened, salmon..."
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

            <div className="grid gap-4">
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-muted">Browse by trend</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Story direction
                  </p>
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
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-muted">Browse by group</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Teaching set
                  </p>
                </div>
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
                  {groupFilters.map((option) => {
                    const active = group === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setGroup(option)}
                        data-active={active}
                        className="filter-chip shrink-0"
                      >
                        {option === "all" ? "All groups" : option}
                        <span
                          className={cn(
                            "ml-2 rounded-full px-2 py-0.5 text-xs font-bold",
                            active ? "bg-white/18 text-white" : "bg-ocean/8 text-ocean",
                          )}
                        >
                          {counts.byGroup[option]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="text-sm leading-6 text-muted">{helperText}</p>
          </div>

          <div className="grid gap-3">
            <div className="guidance-box">
              <p className="eyebrow">Start here</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Open a single species when you want the full story. Jump to Compare when you want
                to see why different habitats and pressures produce different trajectories.
              </p>
            </div>

            <Link href="/compare" className="route-link-card">
              <p className="eyebrow">Signature move</p>
              <h3 className="supporting-title mt-3 font-semibold text-ocean">
                Turn this browse list into a comparison set
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Compare up to four species on one normalized chart to show how recovery stories
                diverge across Washington landscapes.
              </p>
            </Link>

            <Link href="/learn" className="route-link-card">
              <p className="eyebrow">Classroom shortcut</p>
              <h3 className="supporting-title mt-3 font-semibold text-ocean">
                Need a lesson path instead of open browsing?
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Start in the learning hub when you want audience-specific activities, prompts, and
                assessments tied to the same species evidence.
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">
            Showing {filtered.length} of {species.length} species
          </p>
          <p className="mt-1 text-sm leading-6 text-muted">
            Each card opens a story-driven species profile with a trend chart, map context, source
            notes, lesson paths, and conservation next steps.
          </p>
        </div>
        {hasActiveControls ? (
          <button type="button" onClick={resetControls} className="button-secondary">
            Reset dashboard controls
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="panel rounded-[1.5rem] p-6 text-center sm:p-8">
          <p className="eyebrow">No matching species</p>
          <h2 className="section-title mt-3 text-ocean">
            Try a broader search or switch back to all groups
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted">
            Search works across names, groups, and listing status. If you are building a classroom
            comparison, reset the filters and start with a trend chip or species group instead.
          </p>
          <div className="mt-6 flex justify-center">
            <button type="button" onClick={resetControls} className="button-primary">
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
