import Link from "next/link";
import { Suspense } from "react";
import { ComparisonExplorer } from "@/components/species/ComparisonExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Compare",
};

export default function ComparePage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-8 sm:py-12">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)] xl:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker">Comparison view</p>
          <h1 className="hero-title mt-4 max-w-4xl font-semibold text-ocean">
            Compare recovery trajectories without flattening different kinds of evidence
          </h1>
          <p className="lede mt-5">
            This is the app&apos;s signature feature. Use normalized change to compare how species
            respond to habitat loss, restoration, disturbance, or prey shifts, even when their
            underlying indicators are counts, territories, occupied units, or other different metrics.
          </p>
        </div>

        <div className="story-card p-5">
          <p className="eyebrow">Why compare?</p>
          <h2 className="supporting-title mt-3 font-semibold text-ocean">
            One species story is useful. Two or three together can reveal the landscape-level pattern.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Comparison helps students and public users see that recovery is shaped by habitat, data
            quality, and management choices, not just by whether a line goes up or down.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/dashboard" className="button-secondary">
          Start from the dashboard
        </Link>
        <Link href="/methodology" className="button-secondary">
          Review methodology first
        </Link>
      </div>

      <div className="mt-8 sm:mt-10">
        <Suspense
          fallback={
            <div className="panel rounded-[1.75rem] p-5">
              <p className="section-kicker">Loading comparison</p>
              <div className="mt-5 h-[420px] animate-pulse rounded-[1.5rem] bg-mist" />
            </div>
          }
        >
          <ComparisonExplorer species={species} />
        </Suspense>
      </div>
    </div>
  );
}
