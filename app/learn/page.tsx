import Link from "next/link";
import { getSpeciesRecords } from "@/lib/data/species";

const audiences = [
  { key: "elementary", label: "Elementary (K-5)" },
  { key: "middle", label: "Middle School (6-8)" },
  { key: "high", label: "High School (9-12)" },
  { key: "educators", label: "Educators" },
] as const;

export const metadata = {
  title: "Learn",
};

export default function LearnPage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-12">
      <div className="max-w-3xl">
        <p className="section-kicker">Learning hub</p>
        <h1 className="display-type mt-4 text-5xl font-bold text-ocean">Four tiers of learning content for every species</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Preview the instructional angle for each audience, then open a species
          profile for the full chart, map, and classroom extension ideas.
        </p>
      </div>

      <div className="mt-10 grid gap-6">
        {species.map((record) => (
          <section key={record.slug} className="panel rounded-[1.75rem] p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">{record.speciesGroup}</p>
                <h2 className="display-type mt-2 text-3xl font-bold text-ocean">{record.commonName}</h2>
              </div>
              <Link href={`/species/${record.slug}`} className="text-sm font-semibold text-ocean">
                Open full profile →
              </Link>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-4">
              {audiences.map((audience) => {
                const lesson = record.learning[audience.key];

                return (
                  <article key={audience.key} className="rounded-[1.5rem] bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{audience.label}</p>
                    <h3 className="mt-3 text-lg font-bold text-ink">{lesson.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{lesson.focus}</p>
                    <p className="mt-4 text-sm font-semibold text-ocean">{lesson.extension}</p>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
