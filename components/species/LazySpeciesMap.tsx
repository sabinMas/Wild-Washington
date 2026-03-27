"use client";

import dynamic from "next/dynamic";

export const LazySpeciesMap = dynamic(
  () => import("@/components/species/SpeciesRangeMap").then((module) => module.SpeciesRangeMap),
  {
    ssr: false,
    loading: () => (
      <div className="panel rounded-[1.75rem] p-6">
        <p className="section-kicker">Range map</p>
        <div className="mt-5 h-[380px] animate-pulse rounded-[1.5rem] bg-mist" />
      </div>
    ),
  },
);
