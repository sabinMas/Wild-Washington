import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LazySpeciesMap } from "@/components/species/LazySpeciesMap";
import { PopulationTrendChart } from "@/components/species/PopulationTrendChart";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getSpeciesBySlug, getSpeciesSlugs } from "@/lib/data/species";
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

  return (
    <div className="shell py-12">
      <section className="panel rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">{species.speciesGroup}</p>
            <h1 className="display-type mt-4 text-5xl font-bold text-ocean md:text-6xl">{species.commonName}</h1>
            <p className="mt-3 text-lg italic text-muted">{species.scientificName}</p>
            <p className="mt-6 text-lg leading-8 text-muted">{species.heroSummary}</p>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] bg-white p-6 lg:min-w-[320px]">
            <StatusBadge trend={species.trend} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Current status</p>
              <p className="mt-2 text-3xl font-bold text-ink">
                {formatNumber(species.currentPopulation.estimate)}{" "}
                <span className="text-lg font-semibold text-muted">{species.currentPopulation.unit}</span>
              </p>
            </div>
            <p className="text-sm leading-6 text-muted">{species.currentPopulation.summary}</p>
            <p className="text-sm font-semibold text-ocean">
              {species.currentPopulation.year} confidence: {species.currentPopulation.confidence}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="panel rounded-[1.75rem] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Listing status</p>
          <p className="mt-3 text-2xl font-bold text-ink">{species.listingStatus}</p>
        </div>
        <div className="panel rounded-[1.75rem] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Confidence interval</p>
          <p className="mt-3 text-2xl font-bold text-ink">
            {species.currentPopulation.low && species.currentPopulation.high
              ? `${formatNumber(species.currentPopulation.low)}–${formatNumber(species.currentPopulation.high)}`
              : "Range unavailable"}
          </p>
        </div>
        <div className="panel rounded-[1.75rem] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Habitat highlights</p>
          <p className="mt-3 text-sm leading-6 text-muted">{species.range.habitats.join(" · ")}</p>
        </div>
      </section>

      <div className="mt-8 grid gap-8">
        <PopulationTrendChart species={species} />
        <LazySpeciesMap species={species} />
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="panel rounded-[1.75rem] p-6">
          <p className="section-kicker">Threats</p>
          <h2 className="display-type mt-4 text-3xl font-bold text-ocean">Key pressures on this species</h2>
          <div className="mt-6 grid gap-4">
            {species.threats.map((threat) => (
              <article key={threat.title} className="rounded-[1.5rem] bg-white p-5">
                <h3 className="text-lg font-bold text-ink">{threat.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{threat.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel rounded-[1.75rem] p-6">
          <p className="section-kicker">Conservation efforts</p>
          <h2 className="display-type mt-4 text-3xl font-bold text-ocean">What recovery looks like on the ground</h2>
          <div className="mt-6 grid gap-4">
            {species.conservationEfforts.map((effort) => (
              <article key={effort.title} className="rounded-[1.5rem] bg-white p-5">
                <h3 className="text-lg font-bold text-ink">{effort.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{effort.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Partners: {effort.partners.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 panel rounded-[1.75rem] p-6">
        <p className="section-kicker">Historical context</p>
        <h2 className="display-type mt-4 text-3xl font-bold text-ocean">Timeline and turning points</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {species.timeline.map((event) => (
            <article key={`${event.year}-${event.title}`} className="rounded-[1.5rem] bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">{event.year}</p>
              <h3 className="mt-3 text-lg font-bold text-ink">{event.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{event.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 panel rounded-[1.75rem] p-6">
        <p className="section-kicker">Learn sections</p>
        <h2 className="display-type mt-4 text-3xl font-bold text-ocean">Age-appropriate ways to teach this species</h2>
        <div className="mt-6 grid gap-4 xl:grid-cols-4">
          {Object.entries(species.learning).map(([audience, module]) => (
            <article key={audience} className="rounded-[1.5rem] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{audience}</p>
              <h3 className="mt-3 text-xl font-bold text-ink">{module.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{module.focus}</p>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted">
                {module.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-ocean">{module.extension}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="panel rounded-[1.75rem] p-6">
          <p className="section-kicker">Take action</p>
          <h2 className="display-type mt-4 text-3xl font-bold text-ocean">Field trips, citizen science, and volunteer options</h2>
          <div className="mt-6 grid gap-4">
            {species.actions.map((action) => (
              <a key={action.href} href={action.href} target="_blank" rel="noreferrer" className="rounded-[1.5rem] bg-white p-5 transition hover:bg-mist">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{action.type.replace("-", " ")}</p>
                <h3 className="mt-3 text-lg font-bold text-ink">{action.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{action.description}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="panel rounded-[1.75rem] p-6">
          <p className="section-kicker">Sources</p>
          <h2 className="display-type mt-4 text-3xl font-bold text-ocean">Where to verify the data story</h2>
          <div className="mt-6 grid gap-4">
            {species.sources.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="rounded-[1.5rem] bg-white p-5 transition hover:bg-mist">
                <h3 className="text-lg font-bold text-ink">{source.label}</h3>
                <p className="mt-2 text-sm text-muted">{source.organization}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{source.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
