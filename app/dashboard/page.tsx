import Link from "next/link";
import { SpeciesExplorer } from "@/components/species/SpeciesExplorer";
import { getDashboardSummary, getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const species = getSpeciesRecords();
  const summary = getDashboardSummary();

  return (
    <div className="shell py-8 sm:py-12">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] xl:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker">Species dashboard</p>
          <h1 className="hero-title mt-4 font-semibold text-ocean">
            Find a species story worth opening, teaching, or comparing
          </h1>
          <p className="lede mt-5">
            Use the dashboard to browse Washington species by trend and group, then open the full
            profile for the chart, map, lesson pathways, source notes, and conservation context
            behind the headline number.
          </p>
        </div>

        <div className="story-card p-5">
          <p className="eyebrow">Best use</p>
          <h2 className="supporting-title mt-3 font-semibold text-ocean">
            Start broad here, then branch into Compare, Learn, or a single species page
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            This route is the browse surface for the whole product. It works best when you want to
            shortlist a species set before going deeper.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="mini-stat">
          <p className="eyebrow">Species tracked</p>
          <p className="mt-2 text-2xl font-bold text-ink">{summary.totalSpecies}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Browse one shared Washington collection without losing species-specific context.
          </p>
        </div>
        <div className="mini-stat">
          <p className="eyebrow">Compare-ready groups</p>
          <p className="mt-2 text-2xl font-bold text-ink">3+</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Trend and group filters are designed to help users build meaningful comparison sets fast.
          </p>
        </div>
        <div className="mini-stat">
          <p className="eyebrow">Learning handoff</p>
          <p className="mt-2 text-2xl font-bold text-ink">4 audiences</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Every species also connects to audience-specific lesson pages for classroom or self-guided use.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/compare" className="button-secondary">
          Compare shortlisted species
        </Link>
        <Link href="/learn" className="button-secondary">
          Open the learning hub
        </Link>
      </div>

      <div className="mt-8 sm:mt-10">
        <SpeciesExplorer species={species} />
      </div>
    </div>
  );
}
