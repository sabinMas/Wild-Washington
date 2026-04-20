import Link from "next/link";
import { LearningHubExplorer } from "@/components/species/LearningHubExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Learning Hub",
};

export default function LearnPage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-8 sm:py-12">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] xl:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker">Learning hub</p>
          <h1 className="hero-title mt-4 font-bold text-ocean">
            Learn through the animals of Washington
          </h1>
          <p className="lede mt-5">
            Start with a species, a question, or an activity. Each lesson path uses the same wildlife
            evidence from the rest of the site, with prompts, vocabulary, and ways to look closer.
          </p>
        </div>

        <div className="story-card p-5">
          <p className="eyebrow">Start here</p>
          <h2 className="supporting-title mt-3 font-semibold text-ocean">
            Pick a path that matches the age group, then follow the species story.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            You can move from one lesson into the species page or conservation section whenever you want more context.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/explore" className="button-secondary">
          Browse wildlife first
        </Link>
        <Link href="/conservation-action" className="button-secondary">
          Connect lessons to action
        </Link>
      </div>

      <div className="mt-8 sm:mt-10">
        <LearningHubExplorer species={species} />
      </div>
    </div>
  );
}
