import { ComparisonExplorer } from "@/components/species/ComparisonExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Compare",
};

export default function ComparePage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-8 sm:py-12">
      <div className="max-w-3xl">
        <p className="section-kicker">Comparison view</p>
        <h1 className="hero-title mt-4 font-bold text-ocean">Overlay species trajectories and look for patterns</h1>
        <p className="lede mt-5">
          Compare how different species respond to habitat loss, prey shifts,
          wetland restoration, or dryland disturbance using normalized change,
          not misleading raw values from incompatible metrics.
        </p>
      </div>

      <div className="mt-8 sm:mt-10">
        <ComparisonExplorer species={species} />
      </div>
    </div>
  );
}
