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
  const [selected, setSelected] = useState<string[]>(species.slice(0, 3).map((record) => record.slug));
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
    const years = species[0]?.populationSeries.map((point) => point.year) ?? [];

    return years.map((year) => {
      const row: Record<string, number | string> = { year };

      species.forEach((record) => {
        row[record.slug] =
          record.populationSeries.find((point) => point.year === year)?.estimate ?? 0;
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
          Select up to four species. Because units differ by species, use the chart to
          compare the direction and shape of trajectories rather than exact values.
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
        <div className="h-[320px] sm:h-[420px]">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: compact ? 4 : 12, left: compact ? -24 : 0, bottom: 0 }}>
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
                  width={compact ? 42 : 56}
                  tick={{ fontSize: compact ? 11 : 12 }}
                  tickFormatter={(value) => formatNumber(value)}
                />
                <Tooltip
                  formatter={(value) =>
                    typeof value === "number" ? formatNumber(value) : String(value ?? "")
                  }
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
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full animate-pulse rounded-[1.5rem] bg-mist" />
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {visibleSpecies.map((record) => (
            <span
              key={record.slug}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-ink sm:text-sm"
            >
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: record.primaryColor }}
                aria-hidden="true"
              />
              {record.commonName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
