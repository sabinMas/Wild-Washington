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
        <h1 className="hero-title mt-4 max-w-3xl font-bold text-ocean">
          Compare recovery trajectories without flattening different kinds of evidence
        </h1>
        <p className="lede mt-5">
          Use normalized change to compare how species respond to habitat loss, prey shifts,
          wetland restoration, or dryland disturbance, even when the underlying metrics are
          counts, territories, occupied units, or other different indicators.
        </p>
      </div>

      <div className="mt-8 sm:mt-10">
        <ComparisonExplorer species={species} />
      </div>
    </div>
  );
}
