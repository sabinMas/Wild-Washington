import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LazySpeciesMap } from "@/components/species/LazySpeciesMap";
import { PopulationTrendChart } from "@/components/species/PopulationTrendChart";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  learningAudienceLabels,
  learningAudiences,
} from "@/lib/data/learning";
import { getSpeciesBySlug, getSpeciesSlugs } from "@/lib/data/species";
import { formatNumber } from "@/lib/utils";

export async function generateStaticParams() {
  return getSpeciesSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);

  if (!species) {
    return {};
  }

  return {
    title: species.commonName,
    description: species.heroSummary,
  };
}

export default async function SpeciesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);

  if (!species) {
    notFound();
  }

  return (
    <div className="shell py-8 sm:py-12">
      <section className="panel rounded-[1.75rem] px-5 py-6 sm:rounded-[2rem] sm:px-6 sm:py-8 md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="section-kicker">{species.speciesGroup}</p>
            <h1 className="hero-title mt-4 font-bold text-ocean">
              {species.commonName}
            </h1>
            <p className="mt-3 text-base italic text-muted sm:text-lg">
              {species.scientificName}
            </p>
            <p className="mt-5 text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">
              {species.heroSummary}
            </p>

            <div className="mt-7 grid gap-4 rounded-[1.5rem] bg-white p-5 sm:mt-8 sm:rounded-[1.75rem] sm:p-6 lg:max-w-[420px]">
              <StatusBadge trend={species.trend} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                  Current observed indicator
                </p>
                <p className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                  {formatNumber(species.currentPopulation.estimate)}{" "}
                  <span className="text-base font-semibold text-muted sm:text-lg">
                    {species.currentPopulation.unit}
                  </span>
                </p>
              </div>
              <p className="text-sm leading-6 text-muted">
                {species.currentPopulation.summary}
              </p>
              <p className="text-sm font-semibold text-ocean">
                {species.populationMetric.label} | {species.currentPopulation.year}
              </p>
            </div>
          </div>

          <figure className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-white shadow-lg sm:rounded-[1.75rem]">
            <div className="relative aspect-[4/3]">
              <Image
                src={species.media.src}
                alt={species.media.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="grid gap-2 p-4 text-sm leading-6 text-muted">
              <span>{species.media.alt}</span>
              <span>
                Photo by{" "}
                <a
                  href={species.media.photographerHref}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-ocean underline decoration-ocean/30 underline-offset-3"
                >
                  {species.media.photographer}
                </a>{" "}
                via{" "}
                <a
                  href={species.media.sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-ocean underline decoration-ocean/30 underline-offset-3"
                >
                  {species.media.sourceLabel}
                </a>
                . License:{" "}
                <a
                  href={species.media.licenseHref}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-ocean underline decoration-ocean/30 underline-offset-3"
                >
                  {species.media.licenseLabel}
                </a>
                .
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-3">
        <article className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            What this number is
          </p>
          <h2 className="mt-3 text-xl font-bold text-ink sm:text-2xl">
            {species.populationMetric.label}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {species.populationMetric.whatItTracks}
          </p>
        </article>
        <article className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Why this metric matters
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            {species.populationMetric.whyItMatters}
          </p>
        </article>
        <article className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Read the chart carefully
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            {species.populationMetric.precisionNote}
          </p>
        </article>
      </section>

      <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8">
        <PopulationTrendChart species={species} />
        <LazySpeciesMap species={species} />
      </div>

      <section className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-2">
        <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="section-kicker">Threats</p>
          <h2 className="section-title mt-4 font-bold text-ocean">
            What is putting pressure on this species
          </h2>
          <div className="mt-5 grid gap-4 sm:mt-6">
            {species.threats.map((threat) => (
              <article key={threat.title} className="rounded-[1.5rem] bg-white p-5">
                <h3 className="text-lg font-bold text-ink">{threat.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {threat.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="section-kicker">Recovery work</p>
          <h2 className="section-title mt-4 font-bold text-ocean">
            What biologists and communities are doing
          </h2>
          <div className="mt-5 grid gap-4 sm:mt-6">
            {species.conservationEfforts.map((effort) => (
              <article key={effort.title} className="rounded-[1.5rem] bg-white p-5">
                <h3 className="text-lg font-bold text-ink">{effort.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {effort.description}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Partners: {effort.partners.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 panel rounded-[1.5rem] p-5 sm:mt-8 sm:rounded-[1.75rem] sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Lesson paths</p>
            <h2 className="section-title mt-4 font-bold text-ocean">
              Walkthrough lessons for each audience
            </h2>
          </div>
          <Link href="/learn" className="text-sm font-semibold text-ocean">
            Open the learning hub
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:mt-6 xl:grid-cols-4">
          {learningAudiences.map((audience) => {
            const lessonModule = species.learning[audience];

            return (
              <Link
                key={audience}
                href={`/learn/${species.slug}/${audience}`}
                className="rounded-[1.5rem] bg-white p-5 transition hover:bg-mist"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {learningAudienceLabels[audience]}
                </p>
                <h3 className="mt-3 text-xl font-bold text-ink">{lessonModule.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{lessonModule.focus}</p>
                <p className="mt-4 text-sm font-semibold text-ocean">
                  Open lesson walkthrough
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-2">
        <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="section-kicker">Take action</p>
          <h2 className="section-title mt-4 font-bold text-ocean">
            Field trips, citizen science, and volunteer options
          </h2>
          <div className="mt-5 grid gap-4 sm:mt-6">
            {species.actions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[1.5rem] bg-white p-5 transition hover:bg-mist"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {action.type.replace("-", " ")}
                </p>
                <h3 className="mt-3 text-lg font-bold text-ink">{action.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {action.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="section-kicker">Sources</p>
          <h2 className="section-title mt-4 font-bold text-ocean">
            Where to verify the data story
          </h2>
          <div className="mt-5 grid gap-4 sm:mt-6">
            {species.sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[1.5rem] bg-white p-5 transition hover:bg-mist"
              >
                <h3 className="text-lg font-bold text-ink">{source.label}</h3>
                <p className="mt-2 text-sm text-muted">{source.organization}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{source.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
