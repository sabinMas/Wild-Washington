"use client";

import { useEffect, useMemo, useState } from "react";
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
import { formatNumber } from "@/lib/utils";
import { type SpeciesRecord } from "@/types/species";

export function ComparisonExplorer({ species }: { species: SpeciesRecord[] }) {
  const [selected, setSelected] = useState<string[]>(
    species.slice(0, 3).map((record) => record.slug),
  );
  const [mounted, setMounted] = useState(false);
  const [compact, setCompact] = useState(false);

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

  const data = useMemo(() => {
    const years = [...new Set(
      species.flatMap((record) => record.populationSeries.map((point) => point.year)),
    )].sort((a, b) => a - b);

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

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="panel min-w-0 rounded-[1.75rem] p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
          <div>
            <p className="section-kicker">Choose species</p>
            <h2 className="section-title mt-3 font-bold text-ocean">
              Compare up to four recovery stories on the same normalized scale
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Each line starts at its own first observed checkpoint, so the chart compares direction and magnitude of change rather than pretending every species uses the same kind of count.
            </p>
          </div>

          <div className="panel-soft rounded-[1.35rem] p-4">
            <p className="eyebrow">How to read this</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              The `100%` line is the baseline for each species. Above `100%` means growth relative to that starting point. Below `100%` means decline.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Pick species with different habitats or threats to see how their trajectories separate over time.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-semibold text-ink">
            {selectedCount} of 4 species selected
          </p>
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
        <div className="mb-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="section-kicker">Normalized comparison</p>
            <h2 className="section-title mt-3 font-bold text-ocean">
              Change from each species&apos; own baseline
            </h2>
          </div>
          <p className="text-sm leading-6 text-muted">
            The baseline line at `100%` marks the first observed value for each species. That keeps whales, birds, occupied territories, and minimum counts comparable without flattening their differences.
          </p>
        </div>

        {selectedCount === 0 ? (
          <div className="panel-soft rounded-[1.5rem] p-6 text-center sm:p-8">
            <p className="eyebrow">No species selected</p>
            <h3 className="section-title mt-3 text-ocean">Choose at least one species to start the comparison</h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted">
              The selector above lets you compare up to four trajectories. Try pairing species from different habitats to see how their recovery patterns diverge.
            </p>
          </div>
        ) : (
          <>
            <div className="h-[320px] min-w-0 w-full sm:h-[420px]">
              {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: compact ? 4 : 12, left: compact ? -24 : 0, bottom: 0 }}
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
          {visibleSpecies.map((record) => (
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
              <p className="mt-2 text-sm leading-6 text-muted">
                Baseline: {formatNumber(record.populationSeries[0]?.estimate ?? 0)}{" "}
                {record.currentPopulation.unit} in {record.populationSeries[0]?.year}. Metric:
                {" "}{record.populationMetric.label.toLowerCase()}.
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Latest observed reading: {formatNumber(record.currentPopulation.estimate)} {record.currentPopulation.unit} in {record.currentPopulation.year}.
              </p>
            </article>
          ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
