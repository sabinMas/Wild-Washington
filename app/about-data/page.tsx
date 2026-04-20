import { SectionIntro } from "@/components/site/SectionIntro";
import { getMethodologySummary } from "@/lib/data/site-content";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "About the Data",
};

export default function AboutDataPage() {
  const species = getSpeciesRecords();
  const summary = getMethodologySummary(species);

  return (
    <div className="shell py-8 sm:py-12">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] xl:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker">About the data</p>
          <h1 className="hero-title mt-4 font-semibold text-ocean">
            Transparent about what Wild Washington standardizes, and what it does not
          </h1>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Wild Washington adapts source-specific records from NOAA Fisheries, Washington Department
            of Fish and Wildlife reporting, US Fish and Wildlife Service material, and the Center
            for Whale Research into one shared interface. The platform standardizes presentation,
            not meaning.
          </p>
        </div>

        <aside className="story-card p-5">
          <p className="eyebrow">Reading rule</p>
          <h2 className="supporting-title mt-3 font-semibold text-ocean">
            Similar layouts do not mean identical evidence
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Some species use direct counts, some use minimum counts, and some rely on proxy or estimate-style indicators. Confidence and caveats remain close to the data story for that reason.
          </p>
        </aside>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="mini-stat">
          <p className="eyebrow">Species covered</p>
          <p className="mt-2 text-2xl font-bold text-ink">{species.length}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Each species keeps its own metric, source notes, range context, and conservation pathways.
          </p>
        </div>
        <div className="mini-stat">
          <p className="eyebrow">Observed checkpoints</p>
          <p className="mt-2 text-2xl font-bold text-ink">{summary.totalObservedCheckpoints}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Charts prefer observed checkpoints over invented annual interpolation.
          </p>
        </div>
        <div className="mini-stat">
          <p className="eyebrow">Observed year range</p>
          <p className="mt-2 text-2xl font-bold text-ink">{summary.observedYearRange}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Comparison focuses on baseline-normalized change because different species are observed across different windows.
          </p>
        </div>
        <div className="mini-stat">
          <p className="eyebrow">Source systems</p>
          <p className="mt-2 text-2xl font-bold text-ink">{summary.sourceSystems.length}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Source organizations remain visible so educators, visitors, and partners can verify the story.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="panel rounded-[1.75rem] p-5 sm:p-6">
          <SectionIntro
            kicker="What the platform standardizes"
            title="Shared story order, chart framing, source placement, and learning structure"
            align="stack"
          />
          <ul className="grid gap-3 text-sm leading-6 text-muted">
            <li className="story-card p-4">
              Species profiles use a consistent narrative order so visitors can scan across different animals without relearning the interface each time.
            </li>
            <li className="story-card p-4">
              The comparison view normalizes each trajectory to its own baseline rather than forcing incompatible metrics into one raw-scale chart.
            </li>
            <li className="story-card p-4">
              Lesson pages and conservation links sit close to the data experience so the product supports real use cases beyond passive browsing.
            </li>
          </ul>
        </article>

        <article className="panel rounded-[1.75rem] p-5 sm:p-6">
          <SectionIntro
            kicker="What stays species-specific"
            title="Metric meaning, confidence, source caveats, and habitat context"
            align="stack"
          />
          <ul className="grid gap-3 text-sm leading-6 text-muted">
            <li className="story-card p-4">
              A salmon series, owl territory count, orca census, and frog estimate do not mean the same thing, even when they appear in matching layouts.
            </li>
            <li className="story-card p-4">
              Confidence is qualitative and reflects how direct, complete, and consistent the monitoring appears to be for that species and indicator.
            </li>
            <li className="story-card p-4">
              Range maps are simplified teaching aids that highlight important Washington regions rather than exact occupied boundaries.
            </li>
          </ul>
        </article>
      </section>

      <section className="mt-8 panel rounded-[1.75rem] p-5 sm:p-6">
        <SectionIntro
          kicker="Metric types in the project"
          title="Different species use different kinds of evidence"
          description="These categories explain what kind of number appears behind a species chart or comparison line so visitors can ask better questions about what the data really measures."
          align="stack"
        />

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
        <SectionIntro
          kicker="Confidence profile"
          title="Confidence is qualitative, but it should still shape how the chart is read"
          align="stack"
        />

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
        <SectionIntro
          kicker="Limitations"
          title="Trust improves when the limits are easy to scan"
          align="stack"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article className="story-card p-5">
            <h3 className="supporting-title font-semibold text-ocean">Not every number is a full census</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Some series represent modeled abundance, occupied territories, or minimum counts rather than direct population totals.
            </p>
          </article>
          <article className="story-card p-5">
            <h3 className="supporting-title font-semibold text-ocean">Observed years matter</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              The platform charts observed checkpoints only, so the interface does not imply more precision than the source actually provides.
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
    </div>
  );
}
