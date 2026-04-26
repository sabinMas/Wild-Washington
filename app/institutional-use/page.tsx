import { ContentCard } from "@/components/site/ContentCard";
import { PageHero } from "@/components/site/PageHero";
import { institutionalUseCards } from "@/lib/data/institutional-content";

export const metadata = {
  title: "For Educators",
};

export default function InstitutionalUsePage() {
  return (
    <div className="shell py-8 sm:py-12">
      <PageHero
        kicker="For educators"
        title="Designed to support classrooms, informal learning, and public interpretation"
        description="Wild Washington is structured as a shared educational platform rather than a single-purpose app. That makes it useful for classroom teaching, exhibit-adjacent learning, self-guided discovery, and conservation communication."
        actions={[
          { href: "/learn", label: "Open the learning hub", variant: "secondary" },
          { href: "/about", label: "See project overview", variant: "ghost" },
        ]}
        aside={{
          kicker: "Teaching note",
          title: "The current architecture keeps species stories, lessons, and methodology aligned across the site.",
          description:
            "Structured content, reusable sections, and clearer route boundaries make it easier to reuse the same evidence in multiple learning contexts.",
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
