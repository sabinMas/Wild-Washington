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
    <div className="shell py-8 sm:py-12">
      <div className="max-w-3xl">
        <p className="section-kicker">Conservation and action</p>
        <h1 className="hero-title mt-4 font-bold text-ocean">
          Take the next step from learning to stewardship
        </h1>
        <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          These links support field experiences, community science, habitat
          stewardship, and deeper research connected to the species in the dashboard.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2">
        {actions.map((action) => (
          <a
            key={`${action.speciesName}-${action.title}`}
            href={action.href}
            target="_blank"
            rel="noreferrer"
            className="panel rounded-[1.5rem] p-5 transition hover:-translate-y-1 sm:rounded-[1.75rem] sm:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {action.type.replace("-", " ")} / {action.speciesName}
            </p>
            <h2 className="mt-3 text-xl font-bold text-ink sm:text-2xl">{action.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{action.description}</p>
            <p className="mt-5 text-sm font-semibold text-ocean">Open resource</p>
          </a>
        ))}
      </div>
    </div>
  );
}
