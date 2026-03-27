"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
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
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
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
      <div className="panel rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-5">
        <p className="text-sm leading-6 text-muted">
          Select up to four species. This view compares change relative to each
          species&apos; first observed checkpoint so we do not treat whales, territories,
          occupied units, and minimum counts as the same kind of number.
        </p>

        <div className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {species.map((record) => {
            const active = selected.includes(record.slug);

            return (
              <button
                key={record.slug}
                type="button"
                onClick={() => toggleSpecies(record.slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active ? "border-transparent text-white" : "border-border bg-white text-muted"
                }`}
                style={active ? { backgroundColor: record.primaryColor } : undefined}
              >
                {record.commonName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="panel rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-5">
        <div className="mb-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="section-kicker">Normalized comparison</p>
            <h2 className="section-title mt-3 font-bold text-ocean">
              Change from the first observed checkpoint
            </h2>
          </div>
          <p className="text-sm leading-6 text-muted">
            A value of 100 means the same level as the first observed data point for that
            species. Values above 100 show growth relative to the baseline; values below
            100 show decline.
          </p>
        </div>

        <div className="h-[320px] sm:h-[420px]">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: compact ? 4 : 12, left: compact ? -24 : 0, bottom: 0 }}
              >
                <CartesianGrid stroke="rgba(86,101,106,0.18)" vertical={false} />
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
                    borderRadius: 18,
                    borderColor: "rgba(86,101,106,0.18)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
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
            <article key={record.slug} className="rounded-[1.25rem] bg-white p-4">
              <div className="flex items-center gap-3">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: record.primaryColor }}
                  aria-hidden="true"
                />
                <p className="font-semibold text-ink">{record.commonName}</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">
                Baseline: {formatNumber(record.populationSeries[0]?.estimate ?? 0)}{" "}
                {record.currentPopulation.unit} in {record.populationSeries[0]?.year}. Metric:
                {" "}{record.populationMetric.label.toLowerCase()}.
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
