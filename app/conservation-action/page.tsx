import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { SectionIntro } from "@/components/site/SectionIntro";
import { getActionGroups } from "@/lib/data/site-content";
import { getSpeciesRecords } from "@/lib/data/species";

export const metadata = {
  title: "Conservation Action",
};

export default function ConservationActionPage() {
  const species = getSpeciesRecords();
  const actionGroups = getActionGroups(species);

  return (
    <div className="shell py-8 sm:py-12">
      <PageHero
        kicker="Conservation action"
        title="Connect species stories to stewardship, field experiences, and partner organizations"
        description="This route extends the learning journey into real-world action. It is designed for visitors, educators, and institutional partners who want to move from understanding a species trend to finding a practical local next step."
        actions={[
          { href: "/learn", label: "Connect to lessons", variant: "secondary" },
          { href: "/support", label: "Support the program", variant: "ghost" },
        ]}
        aside={{
          kicker: "Public-program framing",
          title: "Choose the action type first, then decide which species story or habitat you want to extend.",
          description:
            "Field experiences, citizen science, volunteer programs, and partner organizations are grouped to work for museum visitors, educators, and community stewards.",
        }}
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actionGroups.map((group) => (
          <div key={group.type} className="mini-stat">
            <p className="eyebrow">{group.label}</p>
            <p className="mt-2 text-2xl font-bold text-ink">{group.items.length}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{group.description}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 grid gap-6 sm:mt-10">
        {actionGroups.map((group) => (
          <article key={group.type} className="panel rounded-[1.75rem] p-5 sm:p-6">
            <SectionIntro
              kicker={group.label}
              title={group.description}
              description={`${group.items.length} linked opportunities currently connect this action type back to the wildlife stories in the platform.`}
            />

            <div className="grid gap-4 lg:grid-cols-2">
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
                      Visit {action.title}
                    </a>
                    <Link
                      href={`/species/${action.speciesSlug}`}
                      className="text-sm font-semibold text-ocean"
                    >
                      View {action.speciesName}
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
