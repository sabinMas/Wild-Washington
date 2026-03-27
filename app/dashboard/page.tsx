import { SpeciesExplorer } from "@/components/species/SpeciesExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-8 sm:py-12">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker">Species overview</p>
          <h1 className="hero-title mt-4 font-semibold text-ocean">
            Browse the species story, then narrow in with evidence
          </h1>
          <p className="lede mt-5">
            Browse Washington&apos;s featured species, filter by trend, and open each profile
            to see what the recovery metric measures, where the species is found, and what
            conservation work is underway.
          </p>
        </div>

        <div className="panel-accent rounded-[1.7rem] p-5">
          <p className="eyebrow">How to use this dashboard</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Start broad, narrow by trend, then open a profile when you want the chart,
            habitat map, and conservation context behind the headline number.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <SpeciesExplorer species={species} />
      </div>
    </div>
  );
}
