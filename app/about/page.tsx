import { ContentCard } from "@/components/site/ContentCard";
import { PageHero } from "@/components/site/PageHero";
import { SectionIntro } from "@/components/site/SectionIntro";
import { aboutProgramSections, governanceSignals } from "@/lib/data/institutional-content";

export const metadata = {
  title: "Project Overview",
};

export default function AboutPage() {
  return (
    <div className="shell py-8 sm:py-12">
      <PageHero
        kicker="Project overview"
        title="A public-facing wildlife education platform designed for institutional stewardship"
        description="Wild Washington began as a Washington wildlife field guide and is now being refactored into a museum-ready, nonprofit-ready educational program that can support public interpretation, classroom learning, and conservation storytelling."
        actions={[
          { href: "/institutional-use", label: "For museums and educators", variant: "secondary" },
          { href: "/about-data", label: "About the data", variant: "secondary" },
        ]}
        aside={{
          kicker: "Program intent",
          title: "The goal is to make wildlife evidence understandable without flattening the complexity that public trust depends on.",
          description:
            "The platform treats transparency, accessibility, and public readability as core product requirements rather than optional add-ons.",
        }}
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {aboutProgramSections.map((section) => (
          <article key={section.title} className="panel rounded-[1.75rem] p-5 sm:p-6">
            <p className="section-kicker">{section.title}</p>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="story-card p-4">
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <SectionIntro
          kicker="Governance and trust"
          title="Operational signals that help institutions evaluate handoff readiness"
          description="These signals are now part of the product shell so the site feels governed, maintained, and adoption-ready."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {governanceSignals.map((item) => (
            <ContentCard
              key={item.title}
              title={item.title}
              description={item.description}
              muted
            />
          ))}
        </div>
      </section>
    </div>
  );
}
