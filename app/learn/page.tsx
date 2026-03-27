import Link from "next/link";
import {
  learningAudienceLabels,
  learningAudiences,
} from "@/lib/data/learning";
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
          Dedicated lesson paths for every species and audience
        </h1>
        <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          Each lesson now has its own page with materials, vocabulary, a visual-analysis
          plan, a walkthrough, discussion prompts, and an assessment tied to the species metric.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6">
        {species.map((record) => (
          <section
            key={record.slug}
            className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                  {record.speciesGroup}
                </p>
                <h2 className="section-title mt-2 font-bold text-ocean">
                  {record.commonName}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                  Metric used: {record.populationMetric.label}. {record.populationMetric.precisionNote}
                </p>
              </div>
              <Link href={`/species/${record.slug}`} className="text-sm font-semibold text-ocean">
                Open species dashboard
              </Link>
            </div>

            <div className="mt-5 grid gap-4 lg:mt-6 lg:grid-cols-4">
              {learningAudiences.map((audience) => {
                const lesson = record.learning[audience];

                return (
                  <Link
                    key={audience}
                    href={`/learn/${record.slug}/${audience}`}
                    className="rounded-[1.5rem] bg-white p-5 transition hover:bg-mist"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {learningAudienceLabels[audience]}
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-ink">{lesson.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{lesson.focus}</p>
                    <p className="mt-4 text-sm font-semibold text-ocean">
                      Open walkthrough
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
