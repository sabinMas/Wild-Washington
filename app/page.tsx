import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/ui/StatCard";
import { getDashboardSummary, getSpeciesRecords } from "@/lib/data/species";

export default function HomePage() {
  const summary = getDashboardSummary();
  const species = getSpeciesRecords().slice(0, 4);

  return (
    <div className="pb-16">
      <section className="shell pt-12">
        <div className="panel overflow-hidden rounded-[2rem] px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="section-kicker">
                Washington State endangered species dashboard
              </p>
              <h1 className="display-type mt-5 max-w-4xl text-5xl font-bold leading-tight text-ocean md:text-6xl">
                Follow the stories behind eight species shaping Washington&apos;s future.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                Wild Washington turns conservation data into a clearer, classroom-ready
                experience with source-aware trend charts, range maps, and dedicated lesson pages.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-ocean px-6 py-3 text-center font-semibold text-white transition hover:bg-forest"
                >
                  Explore the species dashboard
                </Link>
                <Link
                  href="/learn"
                  className="rounded-full border border-border bg-white px-6 py-3 text-center font-semibold text-ocean transition hover:bg-mist"
                >
                  Open lesson walkthroughs
                </Link>
              </div>
            </div>

            <div className="grid gap-4 rounded-[1.75rem] bg-gradient-to-br from-ocean to-forest p-6 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-white/80">
                What this dashboard includes
              </p>
              <ul className="grid gap-3 text-sm leading-6 text-white/92">
                <li>Observed checkpoints that explain what each recovery indicator tracks</li>
                <li>Interactive distribution maps focused on Washington habitats</li>
                <li>Dedicated lesson pages for elementary, middle school, high school, and educators</li>
                <li>Transparent methodology and action-oriented conservation links</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-10 grid gap-5 md:grid-cols-4">
        <StatCard
          label="Species tracked"
          value={summary.totalSpecies}
          detail="Eight endangered or at-risk Pacific Northwest species with one shared schema."
          icon="WW"
        />
        <StatCard
          label="Improving"
          value={summary.improving}
          detail="Species showing a clear upward trend in the current indicator series."
          icon="Up"
        />
        <StatCard
          label="Declining"
          value={summary.declining}
          detail="Species whose indicators are still moving downward overall."
          icon="Dn"
        />
        <StatCard
          label="Learning tiers"
          value="4"
          detail="Elementary, middle school, high school, and educator-ready lesson paths."
          icon="Ed"
        />
      </section>

      <section className="shell mt-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Featured species</p>
            <h2 className="display-type mt-3 text-4xl font-bold text-ocean">
              A quick look at the dashboard experience
            </h2>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-ocean">
            See all species
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {species.map((record) => (
            <Link
              key={record.slug}
              href={`/species/${record.slug}`}
              className="panel overflow-hidden rounded-[1.75rem] transition hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] border-b border-border/60">
                <Image
                  src={record.media.src}
                  alt={record.media.alt}
                  fill
                  sizes="(min-width: 1280px) 18rem, (min-width: 768px) 42vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                  {record.speciesGroup}
                </p>
                <h3 className="display-type mt-3 text-2xl font-bold text-ocean">
                  {record.commonName}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Metric: {record.populationMetric.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
