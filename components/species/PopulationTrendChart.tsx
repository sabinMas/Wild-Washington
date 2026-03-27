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

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="panel rounded-[1.75rem] p-5">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Population trend</p>
          <h2 className="display-type mt-3 text-3xl font-bold text-ocean">
            {species.commonName} through time
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted">
          The shaded band represents the estimated confidence range where source data
          provided lower and upper bounds.
        </p>
      </div>

      <div className="h-[340px]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={species.populationSeries}>
              <CartesianGrid stroke="rgba(86,101,106,0.18)" vertical={false} />
              <XAxis dataKey="year" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => formatNumber(value)} />
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
