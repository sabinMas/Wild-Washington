import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { SpeciesExplorer } from "@/components/species/SpeciesExplorer";
import { getDashboardSummary, getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Explore Wildlife",
};

export default function ExplorePage() {
  const species = getSpeciesRecords();
  const summary = getDashboardSummary();

  return (
    <div className="shell py-8 sm:py-12">
      <PageHero
        kicker="Explore wildlife"
        title="Meet Washington's wild neighbors"
        description="Pick an animal to see where it lives, what is changing, and why its story matters."
        actions={[
          { href: "/compare", label: "Compare species", variant: "secondary" },
          { href: "/learn", label: "Try a learning activity", variant: "secondary" },
        ]}
        aside={{
          kicker: "Start anywhere",
          title: "Every card opens a closer look at one animal, its habitat, and its trend.",
          description:
            "You can stay here and wander, jump into one species story, or place two animals side by side to spot what is different.",
        }}
      />

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <dl className="mini-stat">
          <dt className="eyebrow">Species stories</dt>
          <dd className="mt-2 text-2xl font-bold text-ink">{summary.totalSpecies}</dd>
          <dd className="mt-2 text-sm leading-6 text-muted">
            Browse one Washington collection without losing species-specific context, sources, or learning value.
          </dd>
        </dl>
        <dl className="mini-stat">
          <dt className="eyebrow">Trend directions</dt>
          <dd className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[var(--color-success)] px-3 py-1 text-sm font-semibold text-white">
              {summary.improving} recovering
            </span>
            <span className="inline-flex items-center rounded-full bg-[var(--color-danger)] px-3 py-1 text-sm font-semibold text-white">
              {summary.declining} facing pressure
            </span>
            <span className="inline-flex items-center rounded-full bg-[var(--color-surface-offset)] px-3 py-1 text-sm font-semibold text-[var(--color-text)]">
              {summary.totalSpecies} species tracked
            </span>
          </dd>
          <dd className="mt-2 text-sm leading-6 text-muted">
            Each trend tells a different story about pressure, recovery, and what might help next.
          </dd>
        </dl>
        <dl className="mini-stat">
          <dt className="eyebrow">Learning paths</dt>
          <dd className="mt-2 text-2xl font-bold text-ink">4 audience tiers</dd>
          <dd className="mt-2 text-sm leading-6 text-muted">
            Every featured species includes elementary, middle, high school, and educator walkthroughs.
          </dd>
        </dl>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/about-data" className="button-secondary">
          See how the data works
        </Link>
        <Link href="/institutional-use" className="button-secondary">
          Use in museums and classrooms
        </Link>
      </div>

      <section aria-labelledby="explore-species-heading" className="mt-8 sm:mt-10">
        <div className="mb-5 max-w-2xl">
          <span className="section-kicker" aria-hidden="true">
            Washington species
          </span>
          <h2 id="explore-species-heading" className="section-title mt-4 font-semibold text-ocean">
            Browse species stories
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Filter by trend or group, then open a card to move from the overview into a single species story.
          </p>
        </div>
        <SpeciesExplorer species={species} />
      </section>
    </div>
  );
}
