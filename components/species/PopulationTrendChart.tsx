"use client";

import { useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber } from "@/lib/utils";
import { type SpeciesRecord } from "@/types/species";

export function PopulationTrendChart({ species }: { species: SpeciesRecord }) {
  const [mounted, setMounted] = useState(false);
  const [compact, setCompact] = useState(false);
  const hasInterval = species.populationSeries.some(
    (point) => point.low !== undefined && point.high !== undefined,
  );
  const firstPoint = species.populationSeries[0];
  const lastPoint = species.populationSeries.at(-1);
  const changeRatio =
    firstPoint && lastPoint && firstPoint.estimate > 0
      ? ((lastPoint.estimate - firstPoint.estimate) / firstPoint.estimate) * 100
      : 0;
  const roundedChange = Math.round(Math.abs(changeRatio));
  const takeaway =
    changeRatio > 3
      ? `${species.commonName} is above its first observed checkpoint by about ${roundedChange}%.`
      : changeRatio < -3
        ? `${species.commonName} is below its first observed checkpoint by about ${roundedChange}%.`
        : `${species.commonName} is staying relatively close to its first observed checkpoint.`;

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

  return (
    <div className="panel min-w-0 rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-5">
      <div className="mb-5 grid gap-4 sm:mb-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="section-kicker">Trend chart</p>
          <h2 className="section-title mt-3 font-bold text-ocean">
            What the line measures for {species.commonName}
          </h2>
          <p className="mt-3 text-sm font-semibold text-ocean">{takeaway}</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            {species.populationMetric.whatItTracks}
          </p>
        </div>
        <div className="grid gap-3 rounded-[1.25rem] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Metric type
          </p>
          <p className="text-lg font-bold text-ink">{species.populationMetric.label}</p>
          <p className="text-sm leading-6 text-muted">
            {species.populationMetric.precisionNote}
          </p>
        </div>
      </div>

      <div className="h-[320px] sm:h-[340px]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={species.populationSeries}
              margin={{ top: 8, right: compact ? 4 : 12, left: compact ? -24 : 0, bottom: 0 }}
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
                width={compact ? 42 : 56}
                tick={{ fontSize: compact ? 11 : 12 }}
                tickFormatter={(value) => formatNumber(value)}
              />
              <Tooltip
                formatter={(value, name) => {
                  const label =
                    name === "estimate"
                      ? species.populationMetric.label
                      : name === "low"
                        ? "Lower bound"
                        : "Upper bound";

                  return typeof value === "number"
                    ? [`${formatNumber(value)} ${species.currentPopulation.unit}`, label]
                    : [String(value ?? ""), label];
                }}
                labelFormatter={(value) => `Observed year: ${value}`}
                contentStyle={{
                  borderRadius: 18,
                  borderColor: "rgba(86,101,106,0.18)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                }}
              />
              {hasInterval ? (
                <>
                  <Area type="monotone" dataKey="high" stroke="transparent" fill={`${species.primaryColor}20`} activeDot={false} />
                  <Area type="monotone" dataKey="low" stroke="transparent" fill="#fffdfa" activeDot={false} />
                </>
              ) : null}
              <Line
                type="monotone"
                dataKey="estimate"
                name={species.populationMetric.label}
                stroke={species.primaryColor}
                strokeWidth={3}
                dot={{ r: 4, fill: species.primaryColor, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full animate-pulse rounded-[1.5rem] bg-mist" />
        )}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.25rem] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Latest observed value
          </p>
          <p className="mt-2 text-xl font-bold text-ink">
            {formatNumber(species.currentPopulation.estimate)} {species.currentPopulation.unit}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Reported for {species.currentPopulation.year}.
          </p>
        </article>
        <article className="rounded-[1.25rem] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Change from baseline
          </p>
          <p className="mt-2 text-xl font-bold text-ink">
            {changeRatio >= 0 ? "+" : "-"}
            {roundedChange}%
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Compared with {firstPoint?.year ?? "the first observed year"}.
          </p>
        </article>
        <article className="rounded-[1.25rem] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Why this matters
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            {species.populationMetric.whyItMatters}
          </p>
        </article>
        <article className="rounded-[1.25rem] bg-white p-4 md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Read with care
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            {hasInterval
              ? "Only observed checkpoints are plotted. Shaded bands appear only where the source reported lower and upper bounds."
              : "Only observed checkpoints are plotted. No interval band is shown because the source did not provide lower and upper bounds."}
          </p>
        </article>
      </div>
    </div>
  );
}
