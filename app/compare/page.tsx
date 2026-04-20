import Link from "next/link";
import { Suspense } from "react";
import { ComparisonExplorer } from "@/components/species/ComparisonExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Compare Species",
};

export default function ComparePage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-8 sm:py-12">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)] xl:items-end">
        <div className="max-w-3xl">
          <span className="section-kicker" aria-hidden="true">
            Compare species
          </span>
          <h1 className="hero-title mt-4 max-w-4xl font-semibold text-ocean">
            See how animal stories change side by side
          </h1>
          <p className="lede mt-5">
            Choose two to four species and compare their lines on one chart. This view helps you see
            which animals are recovering, which are struggling, and how their habitats shape the story.
          </p>
        </div>

        <div className="story-card p-5">
          <span className="eyebrow" aria-hidden="true">
            What to look for
          </span>
          <h2 className="supporting-title mt-3 font-semibold text-ocean">
            Look for the moments where two species split apart or move together.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Those shifts can point to different habitats, different pressures, or different recovery work across Washington.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/explore" className="button-secondary">
          Start from Explore Wildlife
        </Link>
        <Link href="/about-data" className="button-secondary">
          See how the chart works
        </Link>
      </div>

      <div className="mt-8 sm:mt-10">
        <Suspense
          fallback={
            <div className="panel rounded-[1.75rem] p-5">
              <span className="section-kicker" aria-hidden="true">
                Loading comparison
              </span>
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
