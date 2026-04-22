import Link from "next/link";
import { ArrowLeftRight, Bird, Leaf } from "lucide-react";
import { RotatingSpeciesShowcase } from "@/components/home/RotatingSpeciesShowcase";
import { SpeciesCard } from "@/components/species/SpeciesCard";
import { FeatureLinkCard } from "@/components/ui/FeatureLinkCard";
import { getMethodologySummary } from "@/lib/data/site-content";
import { getSpeciesBySlug, getSpeciesRecords } from "@/lib/data/species";

const explorationCards = [
  {
    href: "/explore",
    title: "Explore species",
    description: "Start with one animal and look closer.",
    cta: "Browse animals",
    Icon: Bird,
  },
  {
    href: "/compare",
    title: "Compare change",
    description: "See which species are declining, improving, or holding on.",
    cta: "Compare now",
    Icon: ArrowLeftRight,
  },
  {
    href: "/conservation",
    title: "Learn what helps",
    description: "Find the actions, habitats, and recovery efforts behind the data.",
    cta: "See what helps",
    Icon: Leaf,
  },
] as const;

export default function HomePage() {
  const species = getSpeciesRecords();
  const methodology = getMethodologySummary(species);
  const orca = getSpeciesBySlug("southern-resident-orca");

  if (!orca) {
    return null;
  }

  const featuredSpecies = [
    orca,
    ...species.filter((record) => record.slug !== orca.slug),
  ];

  return (
    <div className="pb-16 sm:pb-20">
      <RotatingSpeciesShowcase
        species={featuredSpecies}
        totalSpecies={species.length}
        totalObservedCheckpoints={methodology.totalObservedCheckpoints}
      />

      <section className="shell pt-8">
        <div className="panel rounded-[1.5rem] px-5 py-4 sm:px-6">
          <p className="eyebrow text-ocean">Built with Codex</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted sm:text-base">
            Wild Washington was built with OpenAI Codex as a pair-programming partner for route
            scaffolding, chart iteration, metadata setup, and UI refactors, with final editorial
            direction and data choices reviewed by hand.
          </p>
          <Link href="/about" className="mt-3 inline-flex text-sm font-semibold text-ocean">
            See how the project was built
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="wildlife-grid-heading"
        id="wildlife-grid"
        className="shell pt-12 sm:pt-16"
      >
        <div className="max-w-2xl">
          <h2 id="wildlife-grid-heading" className="section-title text-ink">
            Washington Wildlife at Risk
          </h2>
          <p className="mt-3 text-base font-medium text-muted">
            Pick an animal to start.
          </p>
        </div>
        <ul
          className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6"
          data-card-grid
        >
          {species.map((record) => (
            <li key={record.slug} className="list-none h-full min-w-0">
              <SpeciesCard species={record} />
            </li>
          ))}
        </ul>
      </section>

      <section className="shell section-space">
        <div className="max-w-2xl">
          <h2 className="section-title text-ink">Go deeper</h2>
          <p className="mt-3 text-base text-muted">
            Three ways to keep exploring.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-[minmax(0,1.15fr)_repeat(2,minmax(0,1fr))]">
          {explorationCards.map(({ href, title, description, cta, Icon }, index) => (
            <div
              key={title}
              className={index === 0 ? "h-full md:col-span-2 xl:col-span-1" : "h-full"}
            >
              <FeatureLinkCard
                href={href}
                title={title}
                description={description}
                cta={cta}
                Icon={Icon}
                featured={index === 0}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="section-space bg-[var(--color-primary-hover)] py-16 text-center text-white">
        <div className="shell flex flex-col items-center">
          <h2 className="section-title text-3xl text-white">Every count matters.</h2>
          <p className="mt-4 text-base text-white/75">
            These species depend on the places, waterways, and forests of Washington. Understanding
            the story is the first step to protecting it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/conservation" className="button-secondary w-full sm:w-auto">
              Take Action
            </Link>
            <Link
              href="/support"
              className="button-outline w-full border-white text-white hover:bg-white/10 sm:w-auto"
            >
              Support the Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
