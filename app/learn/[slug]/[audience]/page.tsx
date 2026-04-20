import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PopulationTrendChart } from "@/components/species/PopulationTrendChart";
import {
  buildLessonPage,
  learningAudienceLabels,
  learningAudiencePlanner,
  learningAudiences,
} from "@/lib/data/learning";
import { getStoryAngle } from "@/lib/data/site-content";
import { getSpeciesBySlug, getSpeciesSlugs } from "@/lib/data/species";
import { type LearningAudience } from "@/types/species";

function isLearningAudience(value: string): value is LearningAudience {
  return learningAudiences.includes(value as LearningAudience);
}

export async function generateStaticParams() {
  return getSpeciesSlugs().flatMap((slug) =>
    learningAudiences.map((audience) => ({ slug, audience })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; audience: string }>;
}): Promise<Metadata> {
  const { slug, audience } = await params;
  const species = getSpeciesBySlug(slug);

  if (!species || !isLearningAudience(audience)) {
    return {};
  }

  const lesson = buildLessonPage(species, audience);

  return {
    title: `${species.commonName} lesson for ${lesson.audienceLabel}`,
    description: lesson.summary,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; audience: string }>;
}) {
  const { slug, audience } = await params;
  const species = getSpeciesBySlug(slug);

  if (!species || !isLearningAudience(audience)) {
    notFound();
  }

  const lesson = buildLessonPage(species, audience);
  const planner = learningAudiencePlanner[audience];
  const storyAngle = getStoryAngle(species);

  return (
    <div className="shell py-8 sm:py-12">
      <section className="panel rounded-[1.75rem] px-5 py-6 sm:rounded-[2rem] sm:px-6 sm:py-8 md:px-10 md:py-10">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-ocean">
              <Link href="/learn" className="link-inline">
                Learning hub
              </Link>
              <span className="text-muted">/</span>
              <Link href={`/species/${species.slug}`} className="link-inline">
                {species.commonName}
              </Link>
            </div>
            <p className="section-kicker mt-4">{lesson.audienceLabel}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="info-pill">{storyAngle.label}</span>
              <span className="info-pill">{species.populationMetric.label}</span>
            </div>
            <h1 className="hero-title mt-4 font-bold text-ocean">
              {species.commonName}: {lesson.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {lesson.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {learningAudiences.map((audienceOption) => {
                const active = audienceOption === audience;

                return (
                  <Link
                    key={audienceOption}
                    href={`/learn/${species.slug}/${audienceOption}`}
                    className={`filter-chip ${active ? "pointer-events-none" : ""}`}
                    data-active={active}
                  >
                    {learningAudienceLabels[audienceOption]}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4">
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
              <figcaption className="p-4 text-sm leading-6 text-muted">
                {species.media.alt}
              </figcaption>
            </figure>

            <div className="story-card p-5">
              <p className="eyebrow">Essential question</p>
              <p className="mt-3 text-lg font-bold text-ink">{lesson.essentialQuestion}</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Visual focus: {lesson.visualCaption}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="mini-stat">
          <p className="eyebrow">Best for</p>
          <p className="mt-2 text-sm leading-6 text-muted">{planner.bestFor}</p>
        </div>
        <div className="mini-stat">
          <p className="eyebrow">Pacing</p>
          <p className="mt-2 text-sm leading-6 text-muted">{planner.pacing}</p>
        </div>
        <div className="mini-stat">
          <p className="eyebrow">Likely output</p>
          <p className="mt-2 text-sm leading-6 text-muted">{planner.deliverable}</p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="section-kicker">Objectives</p>
          <h2 className="section-title mt-4 font-bold text-ocean">
            What learners should understand
          </h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted sm:mt-6">
            {lesson.objectives.map((objective) => (
              <li key={objective} className="story-card p-4">
                {objective}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="section-kicker">Materials and vocabulary</p>
          <h2 className="section-title mt-4 font-bold text-ocean">
            What to prepare before the walkthrough
          </h2>
          <div className="mt-5 grid gap-4 sm:mt-6">
            <article className="story-card p-5">
              <h3 className="text-lg font-bold text-ink">Materials</h3>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
                {lesson.materials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="story-card p-5">
              <h3 className="text-lg font-bold text-ink">Vocabulary</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {lesson.vocabulary.map((term) => (
                  <span key={term} className="info-pill">
                    {term}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="mt-6 sm:mt-8">
        <PopulationTrendChart species={species} />
      </div>

      <section className="mt-6 panel rounded-[1.5rem] p-5 sm:mt-8 sm:rounded-[1.75rem] sm:p-6">
        <p className="section-kicker">Walkthrough</p>
        <h2 className="section-title mt-4 font-bold text-ocean">
          Step-by-step lesson flow
        </h2>
        <div className="mt-5 grid gap-4 sm:mt-6 lg:grid-cols-2">
          {lesson.walkthrough.map((step) => (
            <article key={step.title} className="story-card p-5">
              <h3 className="text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-2">
        <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="section-kicker">Visual investigation</p>
          <h2 className="section-title mt-4 font-bold text-ocean">
            How to use the picture, graph, and map
          </h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted sm:mt-6">
            {lesson.visualStudy.map((prompt) => (
              <li key={prompt} className="story-card p-4">
                {prompt}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="section-kicker">Assessment</p>
          <h2 className="section-title mt-4 font-bold text-ocean">
            What learners should produce
          </h2>
          <div className="mt-5 grid gap-4 sm:mt-6">
            <article className="story-card p-5">
              <h3 className="text-lg font-bold text-ink">Assessment task</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{lesson.assessment}</p>
            </article>
            <article className="story-card p-5">
              <h3 className="text-lg font-bold text-ink">Suggested extension</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{lesson.extension}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-2">
        <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="section-kicker">Discussion</p>
          <h2 className="section-title mt-4 font-bold text-ocean">
            Questions to deepen the lesson
          </h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted sm:mt-6">
            {lesson.discussionPrompts.map((prompt) => (
              <li key={prompt} className="story-card p-4">
                {prompt}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
          <p className="section-kicker">Carry it forward</p>
          <h2 className="section-title mt-4 font-bold text-ocean">
            Move from lesson to species context and action
          </h2>
          <div className="mt-5 grid gap-4 sm:mt-6">
            <article className="story-card p-5">
              <h3 className="text-lg font-bold text-ink">Teacher move</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{planner.teachingMove}</p>
            </article>
            <article className="story-card p-5">
              <h3 className="text-lg font-bold text-ink">Where to go next</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Move from the lesson to the full species page, the conservation action route, or the
                about-the-data page to connect classroom evidence with Washington organizations,
                stewardship options, and measurement limits.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={`/species/${species.slug}`} className="button-primary">
                  Open species page
                </Link>
                <Link href="/conservation-action" className="button-secondary">
                  Open conservation action
                </Link>
                <Link href="/about-data" className="button-secondary">
                  Review the data approach
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
