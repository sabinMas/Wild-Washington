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
import {
  getConfidenceLabel,
  getTrendDelta,
  getTrendSummary,
} from "@/lib/data/site-content";
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
  const changeRatio = getTrendDelta(species);
  const roundedChange = Math.round(Math.abs(changeRatio));
  const chartSummary =
    firstPoint && lastPoint
      ? `${species.commonName} uses ${species.populationMetric.label.toLowerCase()} data from ${firstPoint.year} to ${lastPoint.year}. The latest observed value is ${formatNumber(species.currentPopulation.estimate)} ${species.currentPopulation.unit} in ${species.currentPopulation.year}. This is about ${roundedChange}% ${changeRatio >= 0 ? "above" : "below"} the first observed checkpoint.`
      : `${species.commonName} chart summary is unavailable.`;
  const trendTableLabel = `${species.commonName} observed trend data`;

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
    <div className="panel min-w-0 rounded-[1.75rem] p-4 sm:p-5">
      <div className="mb-5 grid gap-5 sm:mb-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]">
        <div className="min-w-0">
          <span className="section-kicker" aria-hidden="true">
            Trend chart
          </span>
          <h3 className="section-title mt-3 max-w-[12ch] font-bold text-ocean sm:max-w-[14ch]">
            What the indicator suggests over time
          </h3>
          <p className="mt-4 max-w-[52ch] text-sm font-semibold leading-7 text-ocean">
            {getTrendSummary(species)}
          </p>
          <p className="mt-3 max-w-[56ch] text-sm leading-6 text-muted">
            {species.populationMetric.whatItTracks}
          </p>
        </div>

        <div className="story-grid xl:grid-cols-1">
          <article className="mini-stat">
            <p className="eyebrow">Metric type</p>
            <p className="mt-2 text-xl font-bold leading-8 text-ink">{species.populationMetric.label}</p>
            <p className="mt-3 max-w-none text-sm leading-7 text-muted">
              {species.populationMetric.precisionNote}
            </p>
          </article>

          <article className="mini-stat">
            <p className="eyebrow">Confidence</p>
            <p className="mt-2 text-xl font-bold leading-8 text-ink">
              {getConfidenceLabel(species.currentPopulation.confidence)}
            </p>
            <p className="mt-3 max-w-none text-sm leading-7 text-muted">
              Use the methodology notes and source links when you need to understand what the
              number captures and where it stays approximate.
            </p>
          </article>
        </div>
      </div>

      <div className="h-[320px] sm:h-[340px]" role="img" aria-label={chartSummary}>
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
                  borderRadius: 22,
                  borderColor: "rgba(89,100,95,0.18)",
                  backgroundColor: "rgba(255,251,245,0.96)",
                  boxShadow: "0 18px 38px rgba(24,33,30,0.14)",
                }}
              />
              {hasInterval ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="high"
                    stroke="transparent"
                    fill={`${species.primaryColor}20`}
                    activeDot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="low"
                    stroke="transparent"
                    fill="#fffdfa"
                    activeDot={false}
                  />
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

      <details className="mt-5 rounded-[1.25rem] border border-border bg-[var(--color-surface-2)] p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ocean">
          Read the observed data as a table
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
            <caption className="sr-only">{trendTableLabel}</caption>
            <thead>
              <tr>
                <th scope="col" className="pr-4 font-semibold text-ink">
                  Year
                </th>
                <th scope="col" className="pr-4 font-semibold text-ink">
                  {species.populationMetric.label}
                </th>
                {hasInterval ? (
                  <>
                    <th scope="col" className="pr-4 font-semibold text-ink">
                      Lower bound
                    </th>
                    <th scope="col" className="font-semibold text-ink">
                      Upper bound
                    </th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {species.populationSeries.map((point) => (
                <tr key={point.year}>
                  <th scope="row" className="pr-4 font-semibold text-ink">
                    <time dateTime={String(point.year)}>{point.year}</time>
                  </th>
                  <td className="pr-4 text-muted">
                    {formatNumber(point.estimate)} {species.currentPopulation.unit}
                  </td>
                  {hasInterval ? (
                    <>
                      <td className="pr-4 text-muted">
                        {point.low !== undefined
                          ? `${formatNumber(point.low)} ${species.currentPopulation.unit}`
                          : "Not reported"}
                      </td>
                      <td className="text-muted">
                        {point.high !== undefined
                          ? `${formatNumber(point.high)} ${species.currentPopulation.unit}`
                          : "Not reported"}
                      </td>
                    </>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="panel-soft rounded-[1.25rem] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Latest observed value
          </p>
          <p className="mt-2 text-xl font-bold text-ink">
            {formatNumber(species.currentPopulation.estimate)} {species.currentPopulation.unit}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Reported for{" "}
            <time dateTime={String(species.currentPopulation.year)}>
              {species.currentPopulation.year}
            </time>
            .
          </p>
        </article>

        <article className="panel-soft rounded-[1.25rem] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Change from baseline
          </p>
          <p className="mt-2 text-xl font-bold text-ink">
            {changeRatio >= 0 ? "+" : "-"}
            {roundedChange}%
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Compared with the first observed checkpoint in{" "}
            {firstPoint ? (
              <time dateTime={String(firstPoint.year)}>{firstPoint.year}</time>
            ) : (
              "the baseline year"
            )}
            .
          </p>
        </article>

        <article className="panel-soft rounded-[1.25rem] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Observed window
          </p>
          <p className="mt-2 text-xl font-bold text-ink">
            {firstPoint && lastPoint ? (
              <>
                <time dateTime={String(firstPoint.year)}>{firstPoint.year}</time>
                {" - "}
                <time dateTime={String(lastPoint.year)}>{lastPoint.year}</time>
              </>
            ) : (
              "Observed window"
            )}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Only observed checkpoints are shown so the chart does not imply false year-by-year precision.
          </p>
        </article>

        <article className="panel-soft rounded-[1.25rem] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Read with care
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            {hasInterval
              ? "Shaded bounds appear only where the source reported lower and upper estimates."
              : "No shaded uncertainty band appears because the source did not publish lower and upper bounds."}
          </p>
        </article>
      </div>
    </div>
  );
}
