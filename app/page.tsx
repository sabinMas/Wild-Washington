import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getDashboardSummary, getSpeciesRecords } from "@/lib/data/species";
import { formatNumber } from "@/lib/utils";

export default function HomePage() {
  const summary = getDashboardSummary();
  const species = getSpeciesRecords().slice(0, 4);
  const heroMedia = species.slice(0, 3);

  return (
    <div className="pb-16 sm:pb-20">
      <section className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#14201d_0%,#1b2925_42%,#21312b_100%)] text-sand">
        <div className="absolute inset-0">
          {heroMedia.map((record, index) => (
            <div
              key={record.slug}
              className="media-cycle-layer"
              style={{ animationDelay: `${index * 6}s` }}
            >
              <Image
                src={record.media.src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover opacity-58"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,23,21,0.24)_0%,rgba(16,23,21,0.68)_42%,rgba(16,23,21,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,222,206,0.1),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(175,111,68,0.14),transparent_22%)]" />
        </div>

        <div className="shell relative flex min-h-[calc(100vh-4rem)] items-end py-10 sm:py-14 lg:py-16">
          <div className="max-w-4xl pb-6 sm:pb-10">
            <p className="section-kicker border-white/12 bg-white/10 text-sand">
              Washington State endangered species dashboard
            </p>
            <h1 className="hero-title mt-6 max-w-4xl font-semibold text-white">
              Welcome to Wild Washington
            </h1>
            <p className="display-type mt-4 max-w-3xl text-2xl font-medium leading-tight text-[rgba(255,255,255,0.92)] sm:text-3xl">
              Explore Washington&apos;s endangered wildlife through clearer trends, real places, and guided learning.
            </p>
            <p className="lede mt-5 max-w-2xl text-[rgba(232,222,206,0.82)]">
              Start with the dashboard for the full picture, or move through the stories one
              species at a time.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="button-primary text-center">
                Explore the species dashboard
              </Link>
              <Link href="/learn" className="button-secondary text-center">
                Start with guided lessons
              </Link>
            </div>
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-semibold text-[rgba(232,222,206,0.84)]">
              <span className="text-white/68">Scroll</span>
              <span aria-hidden="true">↓</span>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section-space">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">At a glance</p>
            <h2 className="section-title mt-3 font-semibold text-ocean">
              A faster read on what this dashboard covers
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted">
            The product is built to orient visitors quickly, then invite deeper reading through
            the species profiles, comparison tools, and learning hub.
          </p>
        </div>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Species tracked"
            value={summary.totalSpecies}
            detail="Washington species presented through one consistent, source-aware story structure."
            icon="WW"
          />
          <StatCard
            label="Improving"
            value={summary.improving}
            detail="Profiles whose current indicators point to stronger long-term recovery movement."
            icon="Up"
          />
          <StatCard
            label="Declining"
            value={summary.declining}
            detail="Species still under clear pressure, loss, or incomplete recovery."
            icon="Dn"
          />
          <StatCard
            label="Learning tiers"
            value="4"
            detail="Elementary, middle school, high school, and educator pathways built into the experience."
            icon="Ed"
          />
        </div>
      </section>

      <section className="shell section-space">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div className="panel rounded-[1.9rem] p-6 sm:p-7">
            <p className="section-kicker">Why this exists</p>
            <h2 className="section-title mt-4 font-semibold text-ocean">
              Conservation data becomes easier to care about when it feels connected to real species and real places.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              Wild Washington is designed to make evidence more approachable without flattening
              it into generic dashboard language. The goal is to help people move from a number
              on a chart to a clearer sense of recovery, habitat, pressure, and action.
            </p>
          </div>

          <div className="grid gap-4">
            <article className="panel-accent rounded-[1.8rem] p-5 sm:p-6">
              <p className="eyebrow">What you can do here</p>
              <h3 className="display-type mt-3 text-3xl font-semibold text-ink">
                Browse the dashboard, open a species story, compare trajectories, or follow a guided lesson path.
              </h3>
            </article>
            <article className="panel rounded-[1.7rem] p-5">
              <p className="eyebrow">Built for clarity</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Trend charts, maps, recovery pressures, source links, and lesson pathways all live
                in one connected flow so the experience feels calmer and easier to scan.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="shell section-space">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Featured species</p>
            <h2 className="section-title mt-3 font-semibold text-ocean">
              Four strong entry points into the dashboard
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
              Each featured profile pairs a recovery indicator with habitat context, pressure
              points, and a clearer explanation of what the metric can and cannot tell you.
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
              className="panel overflow-hidden rounded-[1.85rem] transition hover:-translate-y-1 hover:[box-shadow:var(--shadow-lift)]"
            >
              <div className="relative aspect-[4/3] border-b border-border/60">
                <Image
                  src={record.media.src}
                  alt={record.media.alt}
                  fill
                  sizes="(min-width: 1280px) 18rem, (min-width: 768px) 42vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,23,21,0.72)] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                    {record.speciesGroup}
                  </p>
                  <h3 className="display-type mt-2 text-3xl font-semibold text-white">
                    {record.commonName}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <StatusBadge trend={record.trend} />
                  <p className="rounded-full border border-border/60 bg-white/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {record.currentPopulation.year}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {record.heroSummary}
                </p>
                <div className="panel-soft mt-4 rounded-[1.25rem] p-4">
                  <p className="eyebrow">Current indicator</p>
                  <p className="mt-2 text-xl font-bold text-ink">
                    {formatNumber(record.currentPopulation.estimate)}{" "}
                    <span className="text-sm font-semibold text-muted">
                      {record.currentPopulation.unit}
                    </span>
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
