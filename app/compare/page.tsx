import { ComparisonExplorer } from "@/components/species/ComparisonExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Compare",
};

export default function ComparePage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-8 sm:py-12">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker">Comparison view</p>
          <h1 className="hero-title mt-4 max-w-4xl font-semibold text-ocean">
            Compare recovery trajectories without flattening different kinds of evidence
          </h1>
          <p className="lede mt-5">
            Use normalized change to compare how species respond to habitat loss, prey shifts,
            wetland restoration, or dryland disturbance, even when the underlying metrics are
            counts, territories, occupied units, or other different indicators.
          </p>
        </div>

        <div className="panel-accent rounded-[1.7rem] p-5">
          <p className="eyebrow">What normalized means</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Each line starts from that species&apos; own first observed checkpoint. The goal is
            to compare direction and scale of change, not pretend every dataset measures the same thing.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <ComparisonExplorer species={species} />
      </div>
    </div>
  );
}
