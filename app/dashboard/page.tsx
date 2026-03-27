import { SpeciesExplorer } from "@/components/species/SpeciesExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-8 sm:py-12">
      <div className="max-w-3xl">
        <p className="section-kicker">Species overview</p>
        <h1 className="hero-title mt-4 font-bold text-ocean">Endangered species at a glance</h1>
        <p className="lede mt-5">
          Browse Washington&apos;s featured species, filter by trend, and open each profile
          to see what the recovery metric measures, where the species is found, and what
          conservation work is underway.
        </p>
      </div>

      <div className="mt-8 sm:mt-10">
        <SpeciesExplorer species={species} />
      </div>
    </div>
  );
}
