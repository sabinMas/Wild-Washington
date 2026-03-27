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

  return (
    <div className="panel rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-5">
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Population trend</p>
          <h2 className="section-title mt-3 font-bold text-ocean">
            {species.commonName} through time
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted">
          The shaded band represents the estimated confidence range where source data
          provided lower and upper bounds.
        </p>
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
                formatter={(value) =>
                  typeof value === "number" ? formatNumber(value) : String(value ?? "")
                }
                contentStyle={{
                  borderRadius: 18,
                  borderColor: "rgba(86,101,106,0.18)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                }}
              />
              <Area type="monotone" dataKey="high" stroke="transparent" fill={`${species.primaryColor}20`} activeDot={false} />
              <Area type="monotone" dataKey="low" stroke="transparent" fill="#fffdfa" activeDot={false} />
              <Line type="monotone" dataKey="estimate" stroke={species.primaryColor} strokeWidth={3} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full animate-pulse rounded-[1.5rem] bg-mist" />
        )}
      </div>
    </div>
  );
}
