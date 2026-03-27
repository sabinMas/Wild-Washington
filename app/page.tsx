import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/ui/StatCard";
import { getDashboardSummary, getSpeciesRecords } from "@/lib/data/species";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatNumber } from "@/lib/utils";

export default function HomePage() {
  const summary = getDashboardSummary();
  const species = getSpeciesRecords().slice(0, 4);

  return (
    <div className="pb-14 sm:pb-16">
      <section className="shell pt-8 sm:pt-12">
        <div className="panel overflow-hidden rounded-[1.75rem] px-5 py-8 sm:rounded-[2rem] sm:px-6 sm:py-10 md:px-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
            <div>
              <p className="section-kicker">Washington State endangered species dashboard</p>
              <h1 className="hero-title mt-5 max-w-3xl font-bold text-ocean">
                See how Washington&apos;s endangered wildlife is changing.
              </h1>
              <p className="lede mt-5 sm:mt-6">
                Wild Washington helps learners, educators, and curious residents understand
                how each species is doing, what recovery actually looks like, what its recovery metric actually measures,
                and where conservation work is happening across the state.
              </p>
              <div className="mt-6 grid gap-3 text-sm leading-6 text-muted sm:grid-cols-3">
                <div className="panel-soft rounded-[1.15rem] px-4 py-3">
                  Source-aware charts that explain what each number means
                </div>
                <div className="panel-soft rounded-[1.15rem] px-4 py-3">
                  Washington habitat maps grounded in place, not abstraction
                </div>
                <div className="panel-soft rounded-[1.15rem] px-4 py-3">
                  Lesson-ready pathways for classrooms and independent learning
                </div>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="button-primary text-center"
                >
                  Explore the species dashboard
                </Link>
                <Link
                  href="/learn"
                  className="button-secondary text-center"
                >
                  Open lesson walkthroughs
                </Link>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                Start with the full species dashboard, or jump into lessons if you want a guided way to explore the data.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-ocean to-forest p-5 text-white shadow-[0_24px_56px_rgba(15,95,98,0.26)] sm:rounded-[1.75rem] sm:p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-white/80">Why this exists</p>
                <h2 className="display-type mt-3 text-2xl font-bold leading-tight text-white sm:text-[2rem]">
                  Conservation data is easier to care about when it is tied to real species, real places, and clear explanations.
                </h2>
                <p className="mt-4 text-sm leading-6 text-white/88">
                  This project brings together status trends, habitat context, and classroom-ready storytelling so the numbers do not feel detached from the species they represent.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="panel-accent rounded-[1.35rem] p-4">
                  <p className="eyebrow">Inside the experience</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Trend charts, range maps, recovery pressures, learning tools, and source links all live in one shared product flow.
                  </p>
                </div>
                <div className="panel-accent rounded-[1.35rem] p-4">
                  <p className="eyebrow">Built for</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Learners, teachers, and anyone who wants a clearer way to understand how Washington&apos;s species are faring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-8 sm:mt-10">
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">At a glance</p>
            <h2 className="section-title mt-3 font-bold text-ocean">A fast read on the current dashboard mix</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted">
            These headline numbers help orient first-time visitors before they dive into individual species profiles.
          </p>
        </div>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Species tracked"
          value={summary.totalSpecies}
          detail="Eight Washington species presented through one consistent, source-aware structure."
          icon="WW"
        />
        <StatCard
          label="Improving"
          value={summary.improving}
          detail="Species with a clearly upward long-term trend in the current indicator series."
          icon="Up"
        />
        <StatCard
          label="Declining"
          value={summary.declining}
          detail="Species whose current indicators still point to pressure, loss, or incomplete recovery."
          icon="Dn"
        />
        <StatCard
          label="Learning tiers"
          value="4"
          detail="Elementary, middle school, high school, and educator pathways built into the product."
          icon="Ed"
        />
        </div>
      </section>

      <section className="shell mt-14 sm:mt-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Featured species</p>
            <h2 className="section-title mt-3 font-bold text-ocean">Four places to start if you want to see how the dashboard works</h2>
            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
              Each featured profile pairs a recovery indicator with habitat context, pressure points, and a clearer explanation of what the metric can and cannot tell you.
            </p>
          </div>
          <Link href="/dashboard" className="link-inline text-sm">
            See all species
          </Link>
        </div>

        <div className="mt-7 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {species.map((record) => (
            <Link
              key={record.slug}
              href={`/species/${record.slug}`}
              className="panel overflow-hidden rounded-[1.75rem] transition hover:-translate-y-1 hover:[box-shadow:var(--shadow-lift)]"
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
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                    {record.speciesGroup}
                  </p>
                  <StatusBadge trend={record.trend} />
                </div>
                <h3 className="display-type mt-3 text-2xl font-bold text-ocean">
                  {record.commonName}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {record.heroSummary}
                </p>
                <div className="panel-soft mt-4 rounded-[1.15rem] p-4">
                  <p className="eyebrow">Current indicator</p>
                  <p className="mt-2 text-xl font-bold text-ink">
                    {formatNumber(record.currentPopulation.estimate)}{" "}
                    <span className="text-sm font-semibold text-muted">{record.currentPopulation.unit}</span>
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {record.populationMetric.label} in {record.currentPopulation.year}
                  </p>
                </div>
                <p className="mt-4 text-sm font-semibold text-ocean">{record.quickFact}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
