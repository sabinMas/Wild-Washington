"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  learningAudienceDescriptions,
  learningAudienceLabels,
  learningAudiencePlanner,
  learningAudiences,
} from "@/lib/data/learning";
import { getStoryAngle } from "@/lib/data/site-content";
import { type LearningAudience, type SpeciesRecord } from "@/types/species";

export function LearningHubExplorer({ species }: { species: SpeciesRecord[] }) {
  const [selectedAudience, setSelectedAudience] = useState<LearningAudience>("middle");
  const [query, setQuery] = useState("");

  const filteredSpecies = useMemo(() => {
    const lower = query.trim().toLowerCase();

    return species.filter((record) => {
      if (!lower) {
        return true;
      }

      return (
        record.commonName.toLowerCase().includes(lower) ||
        record.speciesGroup.toLowerCase().includes(lower) ||
        record.shortLabel.toLowerCase().includes(lower)
      );
    });
  }, [query, species]);

  const planner = learningAudiencePlanner[selectedAudience];

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
          <div>
            <p className="section-kicker">Start by audience</p>
            <h2 className="section-title mt-4 font-bold text-ocean">
              Choose the learner context first, then build the species lesson from there
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              The learning hub is designed to reduce browsing fatigue. Pick the audience, scan the
              teaching snapshot, then open the species lesson that best fits the class or learner.
            </p>

            <label className="mt-5 grid gap-2">
              <span className="text-sm font-semibold text-muted">
                Search species inside the selected audience
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try salmon, owl, frog..."
                className="input-field"
              />
            </label>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {learningAudiences.map((audience) => {
                const active = selectedAudience === audience;

                return (
                  <button
                    key={audience}
                    type="button"
                    onClick={() => setSelectedAudience(audience)}
                    aria-pressed={active}
                    className={`rounded-[1.5rem] p-5 text-left transition ${
                      active ? "panel bg-ocean text-white" : "panel-soft"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                        active ? "text-white/78" : "text-muted"
                      }`}
                    >
                      {learningAudienceLabels[audience]}
                    </p>
                    <p
                      className={`mt-3 text-sm leading-6 ${
                        active ? "text-white/92" : "text-muted"
                      }`}
                    >
                      {learningAudienceDescriptions[audience]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="story-card p-5">
            <p className="eyebrow">Teaching snapshot</p>
            <h3 className="supporting-title mt-3 font-semibold text-ocean">
              {learningAudienceLabels[selectedAudience]}
            </h3>
            <div className="mt-4 grid gap-3">
              <article className="mini-stat">
                <p className="eyebrow">Best for</p>
                <p className="mt-2 text-sm leading-6 text-muted">{planner.bestFor}</p>
              </article>
              <article className="mini-stat">
                <p className="eyebrow">Pacing</p>
                <p className="mt-2 text-sm leading-6 text-muted">{planner.pacing}</p>
              </article>
              <article className="mini-stat">
                <p className="eyebrow">Likely student output</p>
                <p className="mt-2 text-sm leading-6 text-muted">{planner.deliverable}</p>
              </article>
              <article className="mini-stat">
                <p className="eyebrow">Teacher move</p>
                <p className="mt-2 text-sm leading-6 text-muted">{planner.teachingMove}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Audience path</p>
            <h2 className="section-title mt-4 font-bold text-ocean">
              {learningAudienceLabels[selectedAudience]}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              Showing {filteredSpecies.length} lesson paths. Open a lesson when you want a guided
              walkthrough, or jump to the species page when you need more background evidence.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/explore" className="button-secondary">
              Browse wildlife
            </Link>
            <Link href="/conservation-action" className="button-secondary">
              Connect lessons to action
            </Link>
          </div>
        </div>

        {filteredSpecies.length === 0 ? (
          <div className="panel-soft mt-6 rounded-[1.5rem] p-6 text-center sm:p-8">
            <p className="eyebrow">No matching lesson paths</p>
            <h3 className="section-title mt-3 text-ocean">Try a broader species search</h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted">
              Search by species name or group, or switch to another audience to see a different
              lesson pathway.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {filteredSpecies.map((record) => {
              const lesson = record.learning[selectedAudience];
              const storyAngle = getStoryAngle(record);

              return (
                <article
                  key={`${record.slug}-${selectedAudience}`}
                  className="panel-soft flex h-full flex-col rounded-[1.5rem] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        {record.speciesGroup}
                      </p>
                      <h3 className="display-type mt-3 text-2xl font-bold text-ocean">
                        {record.commonName}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {record.populationMetric.label}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="info-pill">{storyAngle.label}</span>
                    <span className="info-pill">{learningAudienceLabels[selectedAudience]}</span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted">{lesson.focus}</p>

                  <div className="story-card mt-5 p-4">
                    <p className="eyebrow">Lesson path</p>
                    <p className="mt-2 text-lg font-bold text-ink">{lesson.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{lesson.bullets[0]}</p>
                  </div>

                  <div className="mini-stat mt-5">
                    <p className="eyebrow">Likely learner output</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{planner.deliverable}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={`/learn/${record.slug}/${selectedAudience}`} className="button-primary">
                      Open lesson
                    </Link>
                    <Link href={`/species/${record.slug}`} className="button-secondary">
                      Species page
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
