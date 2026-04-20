import { ContentCard } from "@/components/site/ContentCard";
import { PageHero } from "@/components/site/PageHero";
import { accessibilityCommitments } from "@/lib/data/institutional-content";

export const metadata = {
  title: "Accessibility Statement",
};

export default function AccessibilityPage() {
  return (
    <div className="shell py-8 sm:py-12">
      <PageHero
        kicker="Accessibility statement"
        title="Wild Washington is being refactored toward a calmer, more accessible public learning experience"
        description="The project is working toward WCAG 2.1 AA-aligned expectations through better semantic structure, stronger focus visibility, reduced-motion support, improved chart guidance, descriptive links, and clearer content hierarchy across the platform."
        aside={{
          kicker: "Known limitations",
          title: "Maps and dense data views can still introduce barriers and should be reviewed during institutional handoff.",
          description:
            "This statement is intended to support ongoing accessibility work. It should be reviewed with real users, assistive technology testing, and organizational accessibility contacts before public launch under a museum or nonprofit brand.",
        }}
      />

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {accessibilityCommitments.map((item) => (
          <ContentCard
            key={item.title}
            kicker={item.kicker}
            title={item.title}
            description={item.description}
            muted
          />
        ))}
      </section>
    </div>
  );
}
