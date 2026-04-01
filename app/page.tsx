import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatCard } from "@/components/ui/StatCard";
import {
  getMethodologySummary,
  getStoryAngle,
} from "@/lib/data/site-content";
import { getDashboardSummary, getSpeciesRecords } from "@/lib/data/species";
import { formatNumber } from "@/lib/utils";

const audienceRoutes = [
  {
    kicker: "For learners",
    title: "Understand what the data is actually saying",
    description:
      "Browse species stories, interpret trend charts, and connect a number on the page to real habitats, threats, and recovery efforts in Washington.",
    href: "/dashboard",
    cta: "Explore species stories",
  },
  {
    kicker: "For classrooms",
    title: "Teach from the same evidence students can inspect",
    description:
      "Open audience-specific lesson paths with objectives, prompts, visuals, and assessment ideas tied directly to the species data.",
    href: "/learn",
    cta: "Open the learning hub",
  },
  {
    kicker: "For curious public users",
    title: "Compare patterns instead of reading species in isolation",
    description:
      "Use the normalized comparison view to see how marine, forest, inland, and river species move differently over time.",
    href: "/compare",
    cta: "Try the comparison view",
  },
] as const;

const signatureMoments = [
  {
    title: "Start with a species, then widen the frame",
    description:
      "Every profile connects trend, map, threats, recovery work, lesson paths, and next-step actions so the story feels coherent instead of scattered.",
  },
  {
    title: "Compare trajectories without pretending the metrics are identical",
    description:
      "Wild Washington normalizes each line to its own baseline so users can compare direction and scale while still seeing metric differences clearly.",
  },
  {
    title: "Keep the source story visible",
    description:
      "Methodology, confidence, and limitations sit near the interface itself so users can learn from the data without losing sight of what remains uncertain.",
  },
] as const;

export default function HomePage() {
  const allSpecies = getSpeciesRecords();
  const summary = getDashboardSummary();
  const methodology = getMethodologySummary(allSpecies);
  const species = allSpecies.slice(0, 4);
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
          <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,1.02fr)_minmax(18rem,0.98fr)] xl:items-end">
            <div className="max-w-4xl pb-6 sm:pb-10">
              <p className="section-kicker border-white/12 bg-white/10 text-sand">
                Washington wildlife field guide
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="info-pill border-white/12 bg-white/10 text-sand">Learners</span>
                <span className="info-pill border-white/12 bg-white/10 text-sand">Classrooms</span>
                <span className="info-pill border-white/12 bg-white/10 text-sand">
                  Educators
                </span>
                <span className="info-pill border-white/12 bg-white/10 text-sand">
                  Curious public
                </span>
              </div>
              <h1 className="hero-title mt-6 max-w-4xl font-semibold text-white">
                Learn Washington wildlife through evidence you can actually use.
              </h1>
              <p className="display-type mt-4 max-w-3xl text-2xl font-medium leading-tight text-[rgba(255,255,255,0.92)] sm:text-3xl">
                Wild Washington helps people move from species names to trend stories, place-based
                context, classroom-ready learning, and conservation next steps.
              </p>
              <p className="lede mt-5 max-w-2xl text-[rgba(232,222,206,0.82)]">
                It is built for the moments when a generic wildlife website is not enough: when you
                want to compare trajectories, teach from evidence, or understand what the chart can
                and cannot really claim.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/dashboard" className="button-primary text-center">
                  Explore the species dashboard
                </Link>
                <Link href="/compare" className="button-secondary text-center">
                  Try the comparison feature
                </Link>
                <Link href="/learn" className="button-secondary text-center">
                  Start with guided lessons
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="mini-stat bg-white/10 text-sand">
                  <p className="eyebrow text-[rgba(232,222,206,0.72)]">Species tracked</p>
                  <p className="mt-2 text-2xl font-bold text-white">{summary.totalSpecies}</p>
                </div>
                <div className="mini-stat bg-white/10 text-sand">
                  <p className="eyebrow text-[rgba(232,222,206,0.72)]">Observed checkpoints</p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {methodology.totalObservedCheckpoints}
                  </p>
                </div>
                <div className="mini-stat bg-white/10 text-sand">
                  <p className="eyebrow text-[rgba(232,222,206,0.72)]">Source systems</p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {methodology.sourceSystems.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-dark rounded-[1.9rem] p-5 sm:p-6">
              <p className="eyebrow text-[rgba(232,222,206,0.68)]">
                Why it feels different
              </p>
              <h2 className="supporting-title mt-3 font-semibold text-white">
                A calmer way to explore species trends, and a more useful way to teach from them.
              </h2>
              <div className="mt-5 grid gap-3">
                <article className="mini-stat bg-white/6 text-sand">
                  <p className="eyebrow text-[rgba(232,222,206,0.62)]">Explore</p>
                  <p className="mt-2 text-sm leading-6 text-[rgba(232,222,206,0.86)]">
                    Browse species cards that tell you what kind of story you are about to open,
                    not just what category the animal belongs to.
                  </p>
                </article>
                <article className="mini-stat bg-white/6 text-sand">
                  <p className="eyebrow text-[rgba(232,222,206,0.62)]">Compare</p>
                  <p className="mt-2 text-sm leading-6 text-[rgba(232,222,206,0.86)]">
                    Use normalized comparison to see how recovery differs across forests, marine
                    systems, wetlands, grasslands, and river corridors.
                  </p>
                </article>
                <article className="mini-stat bg-white/6 text-sand">
                  <p className="eyebrow text-[rgba(232,222,206,0.62)]">Teach and trust</p>
                  <p className="mt-2 text-sm leading-6 text-[rgba(232,222,206,0.86)]">
                    Lesson paths, methodology notes, and source links stay close to the experience
                    so students can ask better questions about the evidence itself.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section-space">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Start with your goal</p>
            <h2 className="section-title mt-3 font-semibold text-ocean">
              Three clear ways into the product
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted">
            Wild Washington is designed to work whether you are discovering species for the first
            time, preparing a lesson, or looking for a stronger comparison story than a single page
            can provide.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {audienceRoutes.map((item) => (
            <Link key={item.href} href={item.href} className="route-link-card">
              <p className="eyebrow">{item.kicker}</p>
              <h3 className="supporting-title mt-3 font-semibold text-ocean">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
              <p className="mt-4 text-sm font-semibold text-ocean">{item.cta}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell section-space">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div className="panel rounded-[1.9rem] p-6 sm:p-7">
            <p className="section-kicker">What makes it useful</p>
            <h2 className="section-title mt-4 font-semibold text-ocean">
              This is not just a species gallery with nicer cards.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              The product is organized around how people actually learn from wildlife data: open a
              species, understand the indicator, compare it with another system, and decide what
              recovery work or classroom question should come next.
            </p>
            <Link href="/methodology" className="mt-5 inline-flex text-sm font-semibold text-ocean">
              See how the data is adapted and limited
            </Link>
          </div>

          <div className="grid gap-4">
            {signatureMoments.map((item) => (
              <article key={item.title} className="story-card p-5 sm:p-6">
                <p className="eyebrow">Signature move</p>
                <h3 className="supporting-title mt-3 font-semibold text-ocean">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section-space">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">At a glance</p>
            <h2 className="section-title mt-3 font-semibold text-ocean">
              A credible, classroom-ready dataset experience
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted">
            The app keeps trend direction, source differences, and learning pathways visible so
            people can move quickly without losing the trust story.
          </p>
        </div>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Species tracked"
            value={summary.totalSpecies}
            detail="Washington species told through one shared structure for charts, maps, sources, and learning."
            icon="WW"
          />
          <StatCard
            label="Observed checkpoints"
            value={methodology.totalObservedCheckpoints}
            detail="The experience favors observed years over invented annual values, so the lines stay honest."
            icon="Obs"
          />
          <StatCard
            label="Learning tiers"
            value="4"
            detail="Elementary, middle school, high school, and educator pathways are built into the product."
            icon="Ed"
          />
          <StatCard
            label="Source systems"
            value={methodology.sourceSystems.length}
            detail="NOAA, WDFW, USFWS, and Center for Whale Research sources remain visible alongside each story."
            icon="Src"
          />
        </div>
      </section>

      <section className="shell section-space">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Featured species</p>
            <h2 className="section-title mt-3 font-semibold text-ocean">
              Four strong entry points into the experience
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
              These profiles make good first reads because each one opens into a distinct recovery
              story, not just a different animal card.
            </p>
          </div>
          <Link href="/dashboard" className="link-inline text-sm">
            See all species
          </Link>
        </div>

        <div className="mt-7 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {species.map((record) => {
            const storyAngle = getStoryAngle(record);

            return (
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
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge trend={record.trend} />
                    <span className="info-pill">{storyAngle.label}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{record.heroSummary}</p>
                  <div className="story-card mt-4 p-4">
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
            );
          })}
        </div>
      </section>

      <section className="shell section-space">
        <div className="cta-band p-6 sm:p-8">
          <div className="relative z-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-kicker border-white/12 bg-white/10 text-sand">
                Build the full story
              </p>
              <h2 className="section-title mt-4 font-semibold text-white">
                Move from species discovery to comparison, teaching, and real-world action.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[rgba(232,222,206,0.82)] sm:text-base">
                Wild Washington works best when the pages connect: browse species on the dashboard,
                compare trajectories, teach from the learning hub, and end on transparent methods
                or conservation next steps.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/compare" className="button-secondary text-center">
                Compare species
              </Link>
              <Link href="/conservation" className="button-secondary text-center">
                Explore action pathways
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
