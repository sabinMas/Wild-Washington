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
      ? `Searching for "${query.trim()}". Search checks species name, group, and listing status so you can quickly find the animals you want to explore.`
      : trend === "all" && group === "all"
        ? "Start broad, then use the trend and group filters to narrow the set and follow a few animal stories at a time."
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
        <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.9fr)]">
          <div className="grid min-w-0 gap-4">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_14rem]">
              <div className="grid gap-2">
                <label htmlFor="species-search" className="text-sm font-semibold text-muted">
                  Search by species, group, or listing status
                </label>
                <input
                  id="species-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try orca, bird, threatened, salmon..."
                  className="input-field"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="species-sort" className="text-sm font-semibold text-muted">
                  Sort by
                </label>
                <select
                  id="species-sort"
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
              </div>
            </div>

            <div className="grid gap-4">
              <fieldset className="m-0 min-w-0 border-0 p-0">
                <legend className="text-sm font-semibold text-muted">Browse by trend</legend>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Story direction
                </p>
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
                  {trendFilters.map((option) => {
                    const active = trend === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTrend(option.value)}
                        aria-label={`${option.label}, ${counts[option.value]} species`}
                        aria-pressed={active}
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
              </fieldset>

              <fieldset className="m-0 min-w-0 border-0 p-0">
                <legend className="text-sm font-semibold text-muted">Browse by group</legend>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Teaching set
                </p>
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
                  {groupFilters.map((option) => {
                    const active = group === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setGroup(option)}
                        aria-label={`${option === "all" ? "All groups" : option}, ${counts.byGroup[option]} species`}
                        aria-pressed={active}
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
              </fieldset>
            </div>

            <p className="min-w-0 text-sm leading-6 text-muted">{helperText}</p>
          </div>

          <div className="grid min-w-0 gap-3">
            <div className="guidance-box min-w-0 p-4 sm:p-5">
              <span className="eyebrow" aria-hidden="true">
                Start here
              </span>
              <p className="mt-2 text-sm leading-6 text-muted">
                Open a single species when you want the full story. Jump to Compare when you want
                to see how different animals respond to habitat change, pressure, and recovery work.
              </p>
            </div>

            <Link href="/compare" className="route-link-card min-w-0 p-4 sm:p-5">
              <span className="eyebrow" aria-hidden="true">
                Look side by side
              </span>
              <h3 className="supporting-title mt-3 break-words font-semibold text-ocean">
                Put two or more species on the same chart
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Compare up to four species at once to spot where their stories line up and where they change.
              </p>
            </Link>

            <Link href="/learn" className="route-link-card min-w-0 p-4 sm:p-5">
              <span className="eyebrow" aria-hidden="true">
                Try an activity
              </span>
              <h3 className="supporting-title mt-3 break-words font-semibold text-ocean">
                Follow your wildlife questions into the learning hub
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Find prompts, vocabulary, and lesson paths that use the same species evidence you see here.
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm font-semibold text-ink">
              Showing {filtered.length} of {species.length} species
            </p>
          </div>
          <p className="mt-1 text-sm leading-6 text-muted">
            Each card opens a story-driven species profile with a trend chart, map context, source
            notes, lesson paths, and conservation next steps.
          </p>
        </div>
        {hasActiveControls ? (
          <button type="button" onClick={resetControls} className="button-secondary">
            Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="panel rounded-[1.5rem] p-6 text-center sm:p-8">
          <span className="eyebrow" aria-hidden="true">
            No matching species
          </span>
          <h2 className="section-title mt-3 text-ocean">
            Try a broader search or switch back to all groups
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted">
            Search works across names, groups, and listing status. Reset the filters and start with
            a trend or species group if you want to widen the animal set again.
          </p>
          <div className="mt-6 flex justify-center">
            <button type="button" onClick={resetControls} className="button-primary">
              Show all species
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3" data-card-grid>
          {filtered.map((record) => (
            <SpeciesCard key={record.slug} species={record} />
          ))}
        </div>
      )}
    </div>
  );
}
