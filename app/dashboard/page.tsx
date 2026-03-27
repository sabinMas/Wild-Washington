import { SpeciesExplorer } from "@/components/species/SpeciesExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-12">
      <div className="max-w-3xl">
        <p className="section-kicker">Species overview</p>
        <h1 className="display-type mt-4 text-5xl font-bold text-ocean">Endangered species at a glance</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Search across Washington&apos;s featured species, compare trend status, and open
          any card for detailed profiles with maps, learning modules, and action steps.
        </p>
      </div>

      <div className="mt-10">
        <SpeciesExplorer species={species} />
      </div>
    </div>
  );
}
