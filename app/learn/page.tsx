import Link from "next/link";
import { LearningHubExplorer } from "@/components/species/LearningHubExplorer";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Learn",
};

export default function LearnPage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-8 sm:py-12">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] xl:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker">Learning hub</p>
          <h1 className="hero-title mt-4 font-bold text-ocean">
            Start with the audience, then choose the species lesson that fits
          </h1>
          <p className="lede mt-5">
            Wild Washington&apos;s learning area is built for real classroom and self-guided use.
            Pick the learner context first, then open a lesson path with objectives, vocabulary,
            visual analysis, prompts, and assessment ideas tied to the same species evidence used
            across the app.
          </p>
        </div>

        <div className="story-card p-5">
          <p className="eyebrow">Teaching principle</p>
          <h2 className="supporting-title mt-3 font-semibold text-ocean">
            Reduce scanning fatigue first, then make the next teaching move obvious
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            The learning hub is organized so educators can find a lesson path quickly and then move
            back into the species page or conservation route when they want more context.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/dashboard" className="button-secondary">
          Browse all species first
        </Link>
        <Link href="/conservation" className="button-secondary">
          Connect lessons to action
        </Link>
      </div>

      <div className="mt-8 sm:mt-10">
        <LearningHubExplorer species={species} />
      </div>
    </div>
  );
}
