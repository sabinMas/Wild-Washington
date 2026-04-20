import { ContentCard } from "@/components/site/ContentCard";
import { PageHero } from "@/components/site/PageHero";
import { partnershipCards } from "@/lib/data/institutional-content";

export const metadata = {
  title: "Partnerships",
};

export default function PartnershipsPage() {
  return (
    <div className="shell py-8 sm:py-12">
      <PageHero
        kicker="Partnerships and credits"
        title="Make collaborators, source organizations, and future institutional stewards visible"
        description="This route creates space for partner recognition, contributor credit, and adoption pathways. It is designed so museums, nonprofits, and educational organizations can explain who shaped the platform and how collaboration works."
        actions={[
          { href: "/about-data", label: "Review source transparency", variant: "secondary" },
          { href: "/support", label: "Support the work", variant: "ghost" },
        ]}
        aside={{
          kicker: "Partner-ready language",
          title: "Use this area for source acknowledgment, interpretive advisors, funders, and implementation partners.",
          description:
            "During handoff, replace or expand these sections with named collaborators, institutional credits, advisory roles, and local stewardship organizations.",
        }}
      />

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {partnershipCards.map((item) => (
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
