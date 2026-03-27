import { LearningHubExplorer } from "@/components/species/LearningHubExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Learn",
};

export default function LearnPage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-8 sm:py-12">
      <div className="max-w-3xl">
        <p className="section-kicker">Learning hub</p>
        <h1 className="hero-title mt-4 font-bold text-ocean">
          Start with the audience, then choose the species lesson that fits
        </h1>
        <p className="lede mt-5">
          Wild Washington&apos;s learning area is built to feel guided instead of overwhelming.
          Pick the classroom or learner context first, then open a lesson path with materials,
          vocabulary, visual analysis, discussion prompts, and an assessment tied to the species evidence.
        </p>
      </div>

      <div className="mt-8 sm:mt-10">
        <LearningHubExplorer species={species} />
      </div>
    </div>
  );
}
