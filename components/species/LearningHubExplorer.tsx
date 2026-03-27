"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  learningAudienceDescriptions,
  learningAudienceLabels,
  learningAudiences,
} from "@/lib/data/learning";
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

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
          <div>
            <p className="section-kicker">Start by audience</p>
            <h2 className="section-title mt-4 font-bold text-ocean">
              Choose who the lesson is for, then browse species inside that path
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              This keeps the learning hub focused. Instead of scanning every species and every audience at once, pick the teaching level first and then open the lesson that fits.
            </p>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-muted">Search species inside the selected audience</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try salmon, owl, frog..."
              className="input-field"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {learningAudiences.map((audience) => {
            const active = selectedAudience === audience;

            return (
              <button
                key={audience}
                type="button"
                onClick={() => setSelectedAudience(audience)}
                className={`rounded-[1.5rem] p-5 text-left transition ${
                  active ? "panel bg-ocean text-white" : "panel-soft"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${active ? "text-white/78" : "text-muted"}`}>
                  {learningAudienceLabels[audience]}
                </p>
                <p className={`mt-3 text-sm leading-6 ${active ? "text-white/92" : "text-muted"}`}>
                  {learningAudienceDescriptions[audience]}
                </p>
              </button>
            );
          })}
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
              Showing {filteredSpecies.length} species lessons for this audience. Each card opens directly into the selected lesson path.
            </p>
          </div>
          <Link href="/dashboard" className="link-inline text-sm">
            Browse the full species dashboard
          </Link>
        </div>

        {filteredSpecies.length === 0 ? (
          <div className="panel-soft mt-6 rounded-[1.5rem] p-6 text-center sm:p-8">
            <p className="eyebrow">No matching lesson paths</p>
            <h3 className="section-title mt-3 text-ocean">Try a broader species search</h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted">
              Search by species name or group, or switch to another audience to see a different lesson pathway.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {filteredSpecies.map((record) => {
              const lesson = record.learning[selectedAudience];

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

                  <p className="mt-4 text-sm leading-6 text-muted">{lesson.focus}</p>

                  <div className="mt-5 rounded-[1.25rem] bg-white px-4 py-4">
                    <p className="eyebrow">Lesson path</p>
                    <p className="mt-2 text-lg font-bold text-ink">{lesson.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {lesson.bullets[0]}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/learn/${record.slug}/${selectedAudience}`}
                      className="button-primary"
                    >
                      Open lesson
                    </Link>
                    <Link
                      href={`/species/${record.slug}`}
                      className="button-secondary"
                    >
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
