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
        title="A public-facing wildlife education platform designed for independent release"
        description="Wild Washington began as a Washington wildlife field guide and grew into a public educational product that supports classroom learning, self-guided exploration, and conservation storytelling without losing source transparency."
        actions={[
          { href: "/institutional-use", label: "For educators", variant: "secondary" },
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

      <section className="mt-8 panel rounded-[1.75rem] p-5 sm:p-6">
        <SectionIntro
          kicker="Why these species"
          title="The collection is curated, not exhaustive"
          description="Wild Washington focuses on eight species chosen for Washington-specific monitoring depth, longitudinal data availability, habitat diversity, and educational range across marine, forest, wetland, river, and shrub-steppe systems."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <article className="story-card p-5">
            <h3 className="text-lg font-bold text-ink">Data depth</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Every featured species needed enough public source material to support a defensible trend story rather than a one-line summary.
            </p>
          </article>
          <article className="story-card p-5">
            <h3 className="text-lg font-bold text-ink">Washington relevance</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              The set emphasizes species with meaningful Washington monitoring, recovery work, and public stewardship context rather than trying to represent every threatened animal in the region.
            </p>
          </article>
          <article className="story-card p-5">
            <h3 className="text-lg font-bold text-ink">Teaching variety</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              The species were also chosen to give educators contrasting habitats, metric types, and recovery stories that work well in comparison.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-8">
        <SectionIntro
          kicker="Governance and trust"
          title="Signals that help the project feel maintained, credible, and ready to use"
          description="These product choices make the experience feel intentional and trustworthy instead of like a rough prototype."
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

      <section className="mt-8 panel rounded-[1.75rem] p-5 sm:p-6">
        <SectionIntro
          kicker="Built with Codex"
          title="Codex was used as a build partner, not a substitute for editorial judgment"
          description="OpenAI Codex supported implementation across routing, UI composition, metadata, chart scaffolding, and refactors while the final product direction, data choices, copy edits, and source review stayed human-led."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <article className="story-card p-5">
            <h3 className="text-lg font-bold text-ink">Where Codex helped</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Route scaffolding, shared component structure, chart iteration, metadata plumbing, and cleanup passes that made the product easier to ship.
            </p>
          </article>
          <article className="story-card p-5">
            <h3 className="text-lg font-bold text-ink">What stayed human-led</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Species selection, data interpretation, Washington-specific framing, educational voice, source review, and final quality decisions.
            </p>
          </article>
          <article className="story-card p-5">
            <h3 className="text-lg font-bold text-ink">Why that matters</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              The app aims to be transparent about AI assistance while still treating public trust, editorial scope, and wildlife data context as responsibilities that require careful review.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
