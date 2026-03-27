import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Methodology",
};

export default function MethodologyPage() {
  const species = getSpeciesRecords();

  return (
    <div className="shell py-12">
      <div className="max-w-3xl">
        <p className="section-kicker">Data sources and methodology</p>
        <h1 className="display-type mt-4 text-5xl font-bold text-ocean">Transparent about where the numbers come from</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Source-specific records from NOAA, the Center for Whale Research, and WDFW-style
          reviews are mapped into one standard schema for charts, cards, maps, and learning modules.
        </p>
      </div>

      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        <div className="panel rounded-[1.75rem] p-6">
          <h2 className="text-xl font-bold text-ink">1. Raw source format</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Each record starts with source-aware metadata, checkpoints, geography, educational content, and action links.</p>
        </div>
        <div className="panel rounded-[1.75rem] p-6">
          <h2 className="text-xl font-bold text-ink">2. Adapter layer</h2>
          <p className="mt-3 text-sm leading-6 text-muted">The adapter interpolates annual values, derives current population snapshots, and labels overall trend direction.</p>
        </div>
        <div className="panel rounded-[1.75rem] p-6">
          <h2 className="text-xl font-bold text-ink">3. Shared UI schema</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Once adapted, every species can use the same card, chart, map, comparison, and learning components.</p>
        </div>
      </section>

      <section className="mt-10 panel rounded-[1.75rem] p-6">
        <h2 className="display-type text-3xl font-bold text-ocean">Data limitations to keep in mind</h2>
        <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
          <li>Some series represent modeled abundance, occupied territories, or minimum counts rather than full censuses.</li>
          <li>Annual values between major checkpoints are interpolated to create continuous educational trend lines.</li>
          <li>Confidence levels are qualitative and reflect how direct, complete, and consistent the monitoring is.</li>
          <li>Range maps show important Washington regions, not exact occupied boundaries.</li>
        </ul>
      </section>

      <section className="mt-10 grid gap-6">
        {species.map((record) => (
          <article key={record.slug} className="panel rounded-[1.75rem] p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">{record.sourceSystem}</p>
                <h2 className="display-type mt-2 text-3xl font-bold text-ocean">{record.commonName}</h2>
              </div>
              <p className="text-sm text-muted">{record.currentPopulation.year} current snapshot</p>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h3 className="text-lg font-bold text-ink">Dataset notes</h3>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
                  {record.dataNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">Source links</h3>
                <div className="mt-3 grid gap-3">
                  {record.sources.map((source) => (
                    <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="rounded-2xl bg-white p-4">
                      <p className="font-semibold text-ink">{source.label}</p>
                      <p className="text-sm text-muted">{source.organization}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{source.note}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
