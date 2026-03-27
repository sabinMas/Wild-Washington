import { ComparisonExplorer } from "@/components/species/ComparisonExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Compare",
};

export default function ComparePage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-12">
      <div className="max-w-3xl">
        <p className="section-kicker">Comparison view</p>
        <h1 className="display-type mt-4 text-5xl font-bold text-ocean">Overlay species trajectories and look for patterns</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Compare how different species respond to habitat loss, prey shifts,
          wetland restoration, or dryland disturbance.
        </p>
      </div>

      <div className="mt-10">
        <ComparisonExplorer species={species} />
      </div>
    </div>
  );
}
