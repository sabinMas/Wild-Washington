import {
  getMethodologySummary,
} from "@/lib/data/site-content";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Methodology",
};

export default function MethodologyPage() {
  const species = getSpeciesRecords();
  const summary = getMethodologySummary(species);

  return (
    <div className="shell py-8 sm:py-12">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] xl:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker">Data sources and methodology</p>
          <h1 className="hero-title mt-4 font-semibold text-ocean">
            Transparent about what Wild Washington standardizes, and what it does not
          </h1>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Wild Washington adapts source-specific records from NOAA Fisheries, Washington
            Department of Fish and Wildlife reporting, US Fish and Wildlife Service material, and
            the Center for Whale Research into one shared interface. The product standardizes
            presentation, not meaning.
          </p>
        </div>

        <div className="story-card p-5">
          <p className="eyebrow">Reading rule</p>
          <h2 className="supporting-title mt-3 font-semibold text-ocean">
            Similar cards do not mean identical evidence
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Some species use direct counts, some use minimum counts, and some rely on proxy or
            estimate-style indicators. This page explains how those differences stay visible in the
            app.
          </p>
        </div>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="mini-stat">
          <p className="eyebrow">Species covered</p>
          <p className="mt-2 text-2xl font-bold text-ink">{species.length}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Each species keeps its own metric, source notes, and action links.
          </p>
        </div>
        <div className="mini-stat">
          <p className="eyebrow">Observed checkpoints</p>
          <p className="mt-2 text-2xl font-bold text-ink">{summary.totalObservedCheckpoints}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            The charts prefer observed checkpoints over invented annual interpolation.
          </p>
        </div>
        <div className="mini-stat">
          <p className="eyebrow">Observed year range</p>
          <p className="mt-2 text-2xl font-bold text-ink">{summary.observedYearRange}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            The timeline varies by species, so comparisons focus on baseline-normalized change.
          </p>
        </div>
        <div className="mini-stat">
          <p className="eyebrow">Source systems</p>
          <p className="mt-2 text-2xl font-bold text-ink">{summary.sourceSystems.length}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Source systems stay attached to each species so users can verify the story.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="panel rounded-[1.75rem] p-5 sm:p-6">
          <p className="section-kicker">What Wild Washington standardizes</p>
          <h2 className="section-title mt-4 font-semibold text-ocean">
            Shared cards, charts, maps, lesson paths, and source placement
          </h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
            <li className="story-card p-4">
              Species profiles use a consistent narrative order so users can scan across different
              animals without relearning the interface each time.
            </li>
            <li className="story-card p-4">
              The comparison view normalizes each trajectory to its own baseline rather than forcing
              incompatible metrics into one raw-scale chart.
            </li>
            <li className="story-card p-4">
              Lesson pages and conservation links sit close to the data experience so the product
              supports real use cases beyond passive browsing.
            </li>
          </ul>
        </article>

        <article className="panel rounded-[1.75rem] p-5 sm:p-6">
          <p className="section-kicker">What stays species-specific</p>
          <h2 className="section-title mt-4 font-semibold text-ocean">
            Metric meaning, confidence, source caveats, and habitat context
          </h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
            <li className="story-card p-4">
              A salmon series, owl territory count, orca census, and frog estimate do not mean the
              same thing, even when they appear in matching card layouts.
            </li>
            <li className="story-card p-4">
              Confidence is qualitative and reflects how direct, complete, and consistent the
              monitoring appears to be for that species and indicator.
            </li>
            <li className="story-card p-4">
              Range maps are simplified teaching aids. They highlight important Washington regions
              rather than exact occupied boundaries.
            </li>
          </ul>
        </article>
      </section>

      <section className="mt-8 panel rounded-[1.75rem] p-5 sm:p-6">
        <div className="max-w-3xl">
          <p className="section-kicker">Metric types in this project</p>
          <h2 className="section-title mt-4 font-semibold text-ocean">
            Different species use different kinds of evidence
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            These categories explain what kind of number appears behind a species chart or
            comparison line. They are intentionally surfaced so students and public users can ask
            better questions about what the data really measures.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summary.metricKinds.map((metric) => (
            <article key={metric.kind} className="story-card p-5">
              <p className="eyebrow">Used by {metric.count} species</p>
              <h3 className="supporting-title mt-3 font-semibold text-ocean">{metric.label}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{metric.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 panel rounded-[1.75rem] p-5 sm:p-6">
        <div className="max-w-3xl">
          <p className="section-kicker">Confidence profile</p>
          <h2 className="section-title mt-4 font-semibold text-ocean">
            Confidence is qualitative, but it should still shape how you read the chart
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {summary.confidenceLevels.map((level) => (
            <article key={level.confidence} className="story-card p-5">
              <p className="eyebrow">{level.label}</p>
              <p className="mt-3 text-3xl font-bold text-ink">{level.count}</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Species currently present this confidence level in their latest observed snapshot.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 panel rounded-[1.75rem] p-5 sm:p-6">
        <div className="max-w-3xl">
          <p className="section-kicker">Data limitations to keep in mind</p>
          <h2 className="section-title mt-4 font-semibold text-ocean">
            Trust improves when the limits are easy to scan
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article className="story-card p-5">
            <h3 className="supporting-title font-semibold text-ocean">Not every number is a full census</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Some series represent modeled abundance, occupied territories, or minimum counts
              rather than direct population totals.
            </p>
          </article>
          <article className="story-card p-5">
            <h3 className="supporting-title font-semibold text-ocean">Observed years matter</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              The product charts observed checkpoints only, so the interface does not imply more
              precision than the source actually provides.
            </p>
          </article>
          <article className="story-card p-5">
            <h3 className="supporting-title font-semibold text-ocean">Maps are simplified</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Regional circles show important Washington habitats and recovery areas, not exact occupied boundaries.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-8 grid gap-5 sm:gap-6">
        {species.map((record) => (
          <article key={record.slug} className="panel rounded-[1.75rem] p-5 sm:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                  {record.sourceSystem}
                </p>
                <h2 className="section-title mt-2 font-semibold text-ocean">
                  {record.commonName}
                </h2>
              </div>
              <p className="text-sm text-muted">
                {record.currentPopulation.year} current snapshot
              </p>
            </div>

            <div className="mt-5 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="grid gap-4">
                <article className="story-card p-5">
                  <p className="eyebrow">Dataset notes</p>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
                    <li>
                      {record.populationMetric.label}: {record.populationMetric.whatItTracks}
                    </li>
                    <li>{record.populationMetric.precisionNote}</li>
                    {record.dataNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </article>
              </div>

              <div className="grid gap-4">
                {record.sources.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="route-link-card"
                  >
                    <p className="eyebrow">{source.organization}</p>
                    <h3 className="supporting-title mt-3 font-semibold text-ocean">
                      {source.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{source.note}</p>
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
