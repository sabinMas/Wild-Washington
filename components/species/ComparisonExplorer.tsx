"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  buildComparisonPresets,
  getStoryAngle,
  getTrendSummary,
} from "@/lib/data/site-content";
import { formatNumber } from "@/lib/utils";
import { type SpeciesRecord } from "@/types/species";

function parseSelection(
  value: string | null,
  validSlugs: Set<string>,
  fallback: string[],
) {
  const parsed =
    value
      ?.split(",")
      .map((slug) => slug.trim())
      .filter((slug, index, collection) => {
        return slug.length > 0 && validSlugs.has(slug) && collection.indexOf(slug) === index;
      })
      .slice(0, 4) ?? [];

  return parsed.length > 0 ? parsed : fallback;
}

export function ComparisonExplorer({ species }: { species: SpeciesRecord[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [compact, setCompact] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  const validSlugs = useMemo(() => new Set(species.map((record) => record.slug)), [species]);
  const defaultSelection = useMemo(
    () => species.slice(0, 3).map((record) => record.slug),
    [species],
  );
  const speciesParam = searchParams.get("species");
  const [selected, setSelected] = useState<string[]>(() =>
    parseSelection(speciesParam, validSlugs, defaultSelection),
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    function syncViewport() {
      setCompact(window.innerWidth < 640);
    }

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    const normalized = selected.join(",");
    const current = speciesParam ?? "";

    if (normalized === current) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (normalized.length > 0) {
      params.set("species", normalized);
    } else {
      params.delete("species");
    }

    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [pathname, router, searchParams, selected, speciesParam]);

  useEffect(() => {
    if (!shareMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setShareMessage(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [shareMessage]);

  const presets = useMemo(() => buildComparisonPresets(species), [species]);

  const data = useMemo(() => {
    const years = [
      ...new Set(species.flatMap((record) => record.populationSeries.map((point) => point.year))),
    ].sort((a, b) => a - b);

    return years.map((year) => {
      const row: Record<string, number | null> & { year: number } = { year };

      species.forEach((record) => {
        const baseline = record.populationSeries[0]?.estimate ?? 0;
        const point = record.populationSeries.find((entry) => entry.year === year);

        row[record.slug] =
          point && baseline > 0 ? Number(((point.estimate / baseline) * 100).toFixed(1)) : null;
      });

      return row;
    });
  }, [species]);

  const visibleSpecies = species.filter((record) => selected.includes(record.slug));
  const selectedCount = visibleSpecies.length;
  const mixedMetrics =
    new Set(visibleSpecies.map((record) => record.populationMetric.kind)).size > 1;

  function toggleSpecies(slug: string) {
    setSelected((current) => {
      if (current.includes(slug)) {
        return current.filter((value) => value !== slug);
      }

      if (current.length >= 4) {
        return [...current.slice(1), slug];
      }

      return [...current, slug];
    });
  }

  async function handleShare() {
    const url = window.location.href;

    try {
      if (navigator.share && window.innerWidth < 640) {
        await navigator.share({
          title: "Wild Washington comparison",
          text: "Compare these Wild Washington species trajectories.",
          url,
        });
        setShareMessage("Share sheet opened.");
        return;
      }

      await navigator.clipboard.writeText(url);
      setShareMessage("Comparison link copied.");
    } catch {
      setShareMessage("Could not copy the link on this device.");
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="panel min-w-0 rounded-[1.75rem] p-4 sm:p-5">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <div>
            <p className="section-kicker">Signature feature</p>
            <h2 className="section-title mt-3 font-bold text-ocean">
              Build a comparison set that tells a real ecological story
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Choose up to four species, or start from one of the preset bundles below. The goal
              is not just to compare lines, but to compare habitats, pressures, and recovery
              strategies that would be harder to see on a single species page.
            </p>
          </div>

          <div className="guidance-box">
            <p className="eyebrow">How to read this</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              The `100%` line marks each species&apos; own baseline. Above `100%` means growth
              relative to that starting point. Below it means decline relative to that same first
              observed checkpoint.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {presets.map((preset) => (
            <button
              key={preset.key}
              type="button"
              onClick={() => setSelected(preset.slugs)}
              className="route-link-card text-left"
            >
              <p className="eyebrow">Starter set</p>
              <h3 className="supporting-title mt-3 font-semibold text-ocean">
                {preset.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{preset.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">{selectedCount} of 4 species selected</p>
            <p className="mt-1 text-sm leading-6 text-muted">
              {selectedCount > 0
                ? "Share this selection or remove one species to make room for another."
                : "Choose at least one species, then use the chart to compare direction, pace, and baseline changes."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {selectedCount > 0 ? (
              <button type="button" onClick={handleShare} className="button-secondary">
                Share this comparison
              </button>
            ) : null}
            {selectedCount > 0 ? (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="button-secondary"
              >
                Clear comparison
              </button>
            ) : null}
          </div>
        </div>

        {shareMessage ? (
          <p className="mt-3 text-sm font-semibold text-ocean">{shareMessage}</p>
        ) : null}

        <div className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {species.map((record) => {
            const active = selected.includes(record.slug);

            return (
              <button
                key={record.slug}
                type="button"
                onClick={() => toggleSpecies(record.slug)}
                data-active={active}
                className="filter-chip shrink-0"
                style={active ? { backgroundColor: record.primaryColor } : undefined}
              >
                {record.commonName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="panel rounded-[1.75rem] p-4 sm:p-5">
        <div className="mb-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="section-kicker">Normalized comparison</p>
            <h2 className="section-title mt-3 font-bold text-ocean">
              Change from each species&apos; own baseline
            </h2>
          </div>

          <div className="story-card p-4">
            <p className="eyebrow">Interpretation tip</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Start with the overall shape of the lines, then check each species card below for
              the actual metric and baseline year. That keeps the comparison honest when counts,
              territory units, and estimates appear together.
            </p>
            <Link href="/methodology" className="mt-3 inline-flex text-sm font-semibold text-ocean">
              Review methodology notes
            </Link>
          </div>
        </div>

        {selectedCount === 0 ? (
          <div className="panel-soft rounded-[1.5rem] p-6 text-center sm:p-8">
            <p className="eyebrow">No species selected</p>
            <h3 className="section-title mt-3 text-ocean">
              Choose a starter set or build your own comparison
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted">
              Try a preset above if you are new to normalized comparison. The starter bundles are
              designed to make the reading question obvious right away.
            </p>
          </div>
        ) : (
          <>
            {mixedMetrics ? (
              <div className="mb-4 rounded-[1.35rem] border border-border/60 bg-white/70 px-4 py-3 text-sm leading-6 text-muted">
                These selected species use different kinds of indicators. Use the chart to compare
                direction and scale first, then read each species card for the exact metric type.
              </div>
            ) : null}

            <div className="h-[320px] min-w-0 w-full sm:h-[420px]">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{
                      top: 10,
                      right: compact ? 4 : 12,
                      left: compact ? -24 : 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid stroke="rgba(86,101,106,0.18)" vertical={false} />
                    <ReferenceLine
                      y={100}
                      stroke="rgba(15,95,98,0.35)"
                      strokeDasharray="4 4"
                      ifOverflow="extendDomain"
                    />
                    <XAxis
                      dataKey="year"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: compact ? 11 : 12 }}
                      interval={compact ? "preserveStartEnd" : 0}
                      minTickGap={compact ? 28 : 14}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      width={compact ? 52 : 68}
                      tick={{ fontSize: compact ? 11 : 12 }}
                      tickFormatter={(value) => `${formatNumber(value)}%`}
                    />
                    <Tooltip
                      formatter={(value, name) =>
                        typeof value === "number"
                          ? [`${value}% of baseline`, name]
                          : [String(value ?? ""), name]
                      }
                      labelFormatter={(value) => `Observed year: ${value}`}
                      contentStyle={{
                        borderRadius: 22,
                        borderColor: "rgba(89,100,95,0.18)",
                        backgroundColor: "rgba(255,251,245,0.96)",
                        boxShadow: "0 18px 38px rgba(24,33,30,0.14)",
                      }}
                    />
                    {visibleSpecies.map((record) => (
                      <Line
                        key={record.slug}
                        type="monotone"
                        dataKey={record.slug}
                        name={record.commonName}
                        stroke={record.primaryColor}
                        strokeWidth={3}
                        dot={{ r: 3, fill: record.primaryColor, strokeWidth: 0 }}
                        activeDot={{ r: 5 }}
                        connectNulls={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full animate-pulse rounded-[1.5rem] bg-mist" />
              )}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {visibleSpecies.map((record) => {
                const storyAngle = getStoryAngle(record);

                return (
                  <article key={record.slug} className="metric-card">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="size-3 rounded-full"
                          style={{ backgroundColor: record.primaryColor }}
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-semibold text-ink">{record.commonName}</p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                            {record.populationMetric.label}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleSpecies(record.slug)}
                        className="text-sm font-semibold text-ocean"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="info-pill">{storyAngle.label}</span>
                      <span className="info-pill">
                        Baseline {record.populationSeries[0]?.year ?? "start"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-muted">{getTrendSummary(record)}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      Latest observed reading: {formatNumber(record.currentPopulation.estimate)}{" "}
                      {record.currentPopulation.unit} in {record.currentPopulation.year}.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href={`/species/${record.slug}`}
                        className="text-sm font-semibold text-ocean"
                      >
                        Open species page
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
