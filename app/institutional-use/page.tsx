import { ContentCard } from "@/components/site/ContentCard";
import { PageHero } from "@/components/site/PageHero";
import { institutionalUseCards } from "@/lib/data/institutional-content";

export const metadata = {
  title: "For Museums & Educators",
};

export default function InstitutionalUsePage() {
  return (
    <div className="shell py-8 sm:py-12">
      <PageHero
        kicker="For museums and educators"
        title="Designed to support exhibits, public programs, classrooms, and conservation outreach"
        description="Wild Washington is structured as a shared educational platform rather than a single-purpose app. That makes it easier for museums, schools, and nonprofits to adapt it for public interpretation, youth engagement, and donor education."
        actions={[
          { href: "/partnerships", label: "View partnerships", variant: "secondary" },
          { href: "/support", label: "Support the program", variant: "ghost" },
        ]}
        aside={{
          kicker: "Adoption note",
          title: "The current architecture is aimed at making future CMS or flat-file management realistic for non-engineers.",
          description:
            "Structured content, reusable sections, and clearer route boundaries are part of the handoff strategy as much as the visual design.",
        }}
      />

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {institutionalUseCards.map((item) => (
          <ContentCard
            key={item.title}
            kicker={item.kicker}
            title={item.title}
            description={item.description}
          />
        ))}
      </section>
    </div>
  );
}
