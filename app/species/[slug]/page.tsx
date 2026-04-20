import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LazySpeciesMap } from "@/components/species/LazySpeciesMap";
import { PopulationTrendChart } from "@/components/species/PopulationTrendChart";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  getConfidenceLabel,
  getStoryAngle,
  getSuggestedCompareSpecies,
  getTrendSummary,
} from "@/lib/data/site-content";
import {
  learningAudienceLabels,
  learningAudiences,
} from "@/lib/data/learning";
import {
  getSpeciesBySlug,
  getSpeciesRecords,
  getSpeciesSlugs,
} from "@/lib/data/species";
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

  const allSpecies = getSpeciesRecords();
  const habitatPreview = species.range.habitats.slice(0, 3).join(", ");
  const confidenceLabel = getConfidenceLabel(species.currentPopulation.confidence);
  const storyAngle = getStoryAngle(species);
  const compareSuggestion = getSuggestedCompareSpecies(species, allSpecies);
  const compareHref = compareSuggestion
    ? `/compare?species=${species.slug},${compareSuggestion.slug}`
    : "/compare";

  return (
    <div className="shell py-8 sm:py-12">
      <section className="panel rounded-[1.9rem] px-5 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
        <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-start">
          <div className="max-w-3xl">
            <span className="section-kicker" aria-hidden="true">
              {species.speciesGroup}
            </span>
            <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Species status labels">
              <li className="list-none">
                <StatusBadge trend={species.trend} />
              </li>
              <li className="list-none">
                <span className="info-pill">{storyAngle.label}</span>
              </li>
              <li className="list-none">
                <span className="rounded-full bg-sand/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {species.listingStatus}
                </span>
              </li>
            </ul>
            <h1 className="hero-title mt-4 font-semibold text-ocean">{species.commonName}</h1>
            <p className="mt-3 text-base italic text-muted sm:text-lg">{species.scientificName}</p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">
              {species.heroSummary}
            </p>

            <div className="story-card mt-6 p-5">
              <h2 className="eyebrow text-ink">What is happening with this species?</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{getTrendSummary(species)}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <article className="mini-stat">
                <p className="eyebrow">Current observed indicator</p>
                <p className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                  {formatNumber(species.currentPopulation.estimate)}{" "}
                  <span className="text-base font-semibold text-muted sm:text-lg">
                    {species.currentPopulation.unit}
                  </span>
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {species.populationMetric.label} in{" "}
                  <time dateTime={String(species.currentPopulation.year)}>
                    {species.currentPopulation.year}
                  </time>
                </p>
              </article>
              <article className="mini-stat">
                <p className="eyebrow">Confidence</p>
                <p className="mt-2 text-lg font-bold text-ink">{confidenceLabel}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{species.sourceSystem}</p>
              </article>
              <article className="mini-stat">
                <p className="eyebrow">Key habitat</p>
                <p className="mt-2 text-lg font-bold text-ink">{habitatPreview}</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Recovery depends on where this species can still feed, shelter, nest, or migrate.
                </p>
              </article>
            </div>

            <div className="mt-5 max-w-[48rem] space-y-4">
              <div className="guidance-box max-w-[65ch]">
                <span className="eyebrow" aria-hidden="true">
                  What to do next
                </span>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Start with the chart and range map to understand the evidence, then move into the
                  threats, recovery work, lesson paths, source notes, and action links that give the
                  number context.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#species-evidence" className="button-primary text-center">
                  Read the evidence
                </a>
                <Link href={compareHref} className="button-secondary text-center">
                  {compareSuggestion
                    ? `Compare with ${compareSuggestion.commonName}`
                    : "Open comparison view"}
                </Link>
                <a href="#species-lessons" className="button-secondary text-center">
                  Open lesson paths
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <figure className="media-frame bg-white/40">
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
              <figcaption className="grid gap-2 bg-[rgba(255,251,245,0.88)] p-4 text-sm leading-6 text-muted">
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

            <div className="story-card p-5">
              <span className="eyebrow" aria-hidden="true">
                Why this page matters
              </span>
              <h2 className="supporting-title mt-3 font-semibold text-ocean">
                {species.quickFact}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Use this profile when you want the number, habitat context, and recovery narrative
                in one place instead of hopping between disconnected wildlife resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="species-evidence" className="mt-6 sm:mt-8">
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="section-kicker" aria-hidden="true">
              Read the evidence
            </span>
            <h2 className="section-title mt-4 font-semibold text-ocean">
              Start with the observed trend and the places that still matter most
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted">
            This section answers the two biggest questions first: what the indicator tracks, and
            where the species is still found or recovering in Washington.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
          <PopulationTrendChart species={species} />
          <div className="grid gap-6">
            <div className="panel rounded-[1.75rem] p-5 sm:p-6">
              <h3 className="section-title mt-1 font-semibold text-ocean">Metric guide</h3>
              <div className="mt-5 grid gap-4">
                <article className="story-card p-4">
                  <h4 className="eyebrow text-ink">What this number is</h4>
                  <p className="mt-2 text-xl font-bold text-ink">{species.populationMetric.label}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {species.populationMetric.whatItTracks}
                  </p>
                </article>
                <article className="story-card p-4">
                  <h4 className="eyebrow text-ink">Why it matters</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {species.populationMetric.whyItMatters}
                  </p>
                </article>
                <article className="story-card p-4">
                  <h4 className="eyebrow text-ink">Read with care</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {species.populationMetric.precisionNote}
                  </p>
                </article>
              </div>
            </div>
            <LazySpeciesMap species={species} />
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]">
          <div className="story-card p-5">
            <span className="eyebrow" aria-hidden="true">
              Interpret the chart
            </span>
            <p className="mt-3 text-sm leading-6 text-muted">
              Use the trend chart first for direction, then the map for place, and then the
              threats and recovery work below for explanation. The sequence matters because a line
              alone rarely tells the whole conservation story.
            </p>
          </div>

          <div className="story-card p-5">
            <span className="eyebrow" aria-hidden="true">
              Keep the context visible
            </span>
            <p className="mt-3 text-sm leading-6 text-muted">
              When you need a second species to sharpen the story, move to comparison mode rather
              than treating this page like a complete answer by itself.
            </p>
            <Link href={compareHref} className="mt-3 inline-flex text-sm font-semibold text-ocean">
              {compareSuggestion
                ? `Compare ${species.commonName} and ${compareSuggestion.commonName}`
                : "Open comparison mode"}
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 panel rounded-[1.75rem] p-5 sm:mt-8 sm:p-6">
        <div className="max-w-2xl">
          <span className="section-kicker" aria-hidden="true">
            What is shaping the story
          </span>
          <h2 className="section-title mt-4 font-semibold text-ocean">
            Put the pressure points next to the recovery work
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            Recovery becomes easier to understand when the obstacles and the responses sit beside
            each other instead of living in different parts of the page.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="species-threats-heading">
            <h3 id="species-threats-heading" className="eyebrow text-ink">
              Threats
            </h3>
            <div className="mt-4 grid gap-4">
              {species.threats.map((threat) => (
                <article key={threat.title} className="story-card p-5">
                  <h4 className="text-lg font-bold text-ink">{threat.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">{threat.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="species-recovery-heading">
            <h3 id="species-recovery-heading" className="eyebrow text-ink">
              Recovery work
            </h3>
            <div className="mt-4 grid gap-4">
              {species.conservationEfforts.map((effort) => (
                <article key={effort.title} className="story-card p-5">
                  <h4 className="text-lg font-bold text-ink">{effort.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">{effort.description}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Partners: {effort.partners.join(", ")}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="mt-6 grid gap-6 sm:mt-8 xl:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)]">
        <div className="panel rounded-[1.75rem] p-5 sm:p-6">
          <div className="max-w-2xl">
            <span className="section-kicker" aria-hidden="true">
              Context over time
            </span>
            <h2 className="section-title mt-4 font-semibold text-ocean">
              Recovery moments and data notes that shape this page
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              These milestones and notes explain why the trend looks the way it does and what
              limits sit behind the current indicator.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
            <section aria-labelledby="species-timeline-heading">
              <h3 id="species-timeline-heading" className="eyebrow text-ink">
                Timeline
              </h3>
              <ol className="mt-4 grid gap-4" aria-label={`${species.commonName} timeline`}>
                {species.timeline.map((event) => (
                  <li key={`${event.year}-${event.title}`} className="list-none story-card p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ocean">
                      <time dateTime={String(event.year)}>{event.year}</time>
                    </p>
                    <h4 className="mt-2 text-lg font-bold text-ink">{event.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">{event.description}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="species-data-notes-heading">
              <h3 id="species-data-notes-heading" className="eyebrow text-ink">
                Data notes
              </h3>
              <ul className="mt-4 grid gap-4">
                {species.dataNotes.map((note) => (
                  <li key={note} className="list-none story-card p-5">
                    <p className="text-sm leading-6 text-muted">{note}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="panel rounded-[1.75rem] p-5 sm:p-6">
          <span className="section-kicker" aria-hidden="true">
            Sources
          </span>
          <h2 className="section-title mt-4 font-semibold text-ocean">
            Where to verify the data story
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            These links point back to the agencies, organizations, and datasets used to build the
            story on this page.
          </p>
          <div className="mt-5 grid gap-4 sm:mt-6">
            {species.sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="route-link-card"
              >
                <span className="eyebrow" aria-hidden="true">
                  {source.organization}
                </span>
                <h3 className="supporting-title mt-3 font-semibold text-ocean">
                  {source.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{source.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="species-lessons" className="mt-6 grid gap-6 sm:mt-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
        <div className="panel rounded-[1.75rem] p-5 sm:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="section-kicker" aria-hidden="true">
                Lesson paths
              </span>
              <h2 className="section-title mt-4 font-semibold text-ocean">
                Use this species with different audiences
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
                  className="story-card p-5 transition hover:-translate-y-1"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {learningAudienceLabels[audience]}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-ink">{lessonModule.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{lessonModule.focus}</p>
                  <p className="mt-4 text-sm font-semibold text-ocean">Open lesson walkthrough</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="story-card p-5">
            <span className="eyebrow" aria-hidden="true">
              Next move
            </span>
            <h3 className="supporting-title mt-3 font-semibold text-ocean">
              {compareSuggestion
                ? `Pair this story with ${compareSuggestion.commonName}`
                : "Move this story into comparison mode"}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Comparison works especially well after a single species page because you already know
              what the indicator means before you ask how another habitat or species differs.
            </p>
            <Link href={compareHref} className="mt-3 inline-flex text-sm font-semibold text-ocean">
              Open comparison view
            </Link>
          </div>

          <div className="panel rounded-[1.75rem] p-5 sm:p-6">
            <span className="section-kicker" aria-hidden="true">
              Take action
            </span>
            <h2 className="section-title mt-4 font-semibold text-ocean">
              Field trips, citizen science, and volunteer options
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              These links help turn the species story into a next step, whether that means getting
              outside, contributing data, or supporting recovery organizations.
            </p>
            <div className="mt-5 grid gap-4 sm:mt-6">
              {species.actions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="route-link-card"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {action.type.replace("-", " ")}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-ink">{action.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{action.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
