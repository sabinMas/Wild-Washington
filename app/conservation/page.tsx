import Link from "next/link";
import { getActionGroups } from "@/lib/data/site-content";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Conservation",
};

export default function ConservationPage() {
  const species = getSpeciesRecords();
  const actionGroups = getActionGroups(species);

  return (
    <div className="shell py-8 sm:py-12">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] xl:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker">Conservation and action</p>
          <h1 className="hero-title mt-4 font-semibold text-ocean">
            Turn learning into a next step that feels real and local
          </h1>
          <p className="lede mt-5">
            This route collects field experiences, citizen science, volunteer opportunities, and
            organizations connected to the species and habitats featured across Wild Washington. It
            is designed to feel like a continuation of the learning journey, not an appendix.
          </p>
        </div>

        <div className="story-card p-5">
          <p className="eyebrow">Best use</p>
          <h2 className="supporting-title mt-3 font-semibold text-ocean">
            Choose the kind of action first, then decide which species story you want to extend
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Teachers can use this page for field extensions and service learning. Curious public
            users can use it to find local observation, volunteer, or support pathways.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actionGroups.map((group) => (
          <div key={group.type} className="mini-stat">
            <p className="eyebrow">{group.label}</p>
            <p className="mt-2 text-2xl font-bold text-ink">{group.items.length}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{group.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/learn" className="button-secondary">
          Bring this back to the learning hub
        </Link>
        <Link href="/dashboard" className="button-secondary">
          Revisit the species dashboard
        </Link>
      </div>

      <section className="mt-8 grid gap-6 sm:mt-10">
        {actionGroups.map((group) => (
          <article key={group.type} className="panel rounded-[1.75rem] p-5 sm:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="section-kicker">{group.label}</p>
                <h2 className="section-title mt-4 font-semibold text-ocean">
                  {group.description}
                </h2>
              </div>
              <p className="text-sm font-semibold text-muted">
                {group.items.length} linked opportunities
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {group.items.map((action) => (
                <article key={`${action.speciesName}-${action.title}`} className="route-link-card">
                  <div className="flex flex-wrap gap-2">
                    <span className="info-pill">{action.speciesGroup}</span>
                    <span className="info-pill">{action.speciesName}</span>
                  </div>
                  <h3 className="supporting-title mt-4 font-semibold text-ocean">
                    {action.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{action.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-ocean"
                    >
                      Open resource
                    </a>
                    <Link
                      href={`/species/${action.speciesSlug}`}
                      className="text-sm font-semibold text-ocean"
                    >
                      View species context
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
