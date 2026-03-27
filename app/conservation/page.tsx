import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Conservation",
};

export default function ConservationPage() {
  const species = getSpeciesRecords();
  const actions = species.flatMap((record) =>
    record.actions.map((action) => ({
      ...action,
      speciesName: record.commonName,
    })),
  );

  return (
    <div className="shell py-12">
      <div className="max-w-3xl">
        <p className="section-kicker">Conservation and action</p>
        <h1 className="display-type mt-4 text-5xl font-bold text-ocean">Take the next step from learning to stewardship</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          These links support field experiences, community science, habitat
          stewardship, and deeper research connected to the species in the dashboard.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {actions.map((action) => (
          <a
            key={`${action.speciesName}-${action.title}`}
            href={action.href}
            target="_blank"
            rel="noreferrer"
            className="panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {action.type.replace("-", " ")} · {action.speciesName}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-ink">{action.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{action.description}</p>
            <p className="mt-5 text-sm font-semibold text-ocean">Open resource ↗</p>
          </a>
        ))}
      </div>
    </div>
  );
}
