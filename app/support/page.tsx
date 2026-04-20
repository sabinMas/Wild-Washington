import { CallToActionBand } from "@/components/site/CallToActionBand";
import { ContentCard } from "@/components/site/ContentCard";
import { PageHero } from "@/components/site/PageHero";
import {
  supportAllocations,
  supportPrimaryActions,
  supportSignals,
} from "@/lib/data/institutional-content";

export const metadata = {
  title: "Support",
};

export default function SupportPage() {
  return (
    <div className="shell py-8 sm:py-12">
      <PageHero
        kicker="Support the program"
        title="Help sustain wildlife education, accessibility, and public-facing conservation interpretation"
        description="Support for Wild Washington helps maintain the educational platform, strengthen data stewardship, improve accessibility, and keep trusted wildlife interpretation available to visitors, classrooms, and partner organizations."
        actions={supportPrimaryActions}
        aside={{
          kicker: "Donation readiness",
          title: "This page is structured so a museum foundation, fiscal host, or nonprofit sponsor can add implementation details with minimal rework.",
          description:
            "Replace placeholder payment, mailing, and tax-language details during institutional handoff. The narrative structure is already designed for public credibility and partner review.",
        }}
      />

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {supportSignals.map((item) => (
          <ContentCard
            key={item.title}
            kicker={item.kicker}
            title={item.title}
            description={item.description}
          />
        ))}
      </section>

      <section className="mt-8 panel rounded-[1.75rem] p-5 sm:p-6">
        <p className="section-kicker">Where support goes</p>
        <h2 className="section-title mt-4 font-semibold text-ocean">
          Donation framing tied to stewardship, education, and platform care
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {supportAllocations.map((item) => (
            <article key={item.title} className="story-card p-5">
              <p className="eyebrow">{item.amount}</p>
              <h3 className="supporting-title mt-3 font-semibold text-ocean">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <CallToActionBand
          kicker="Operational placeholder"
          title="Replace this band with museum foundation, fiscal-host, or nonprofit donation details during handoff."
          description="Suggested fields to add: donation processor, tax-deductible entity name, mailing address, EIN or charitable registration details, campaign contact, and stewardship reporting commitments."
          actions={[
            { href: "/partnerships", label: "Prepare partnership details", variant: "secondary" },
            { href: "/about", label: "Review project overview", variant: "secondary" },
          ]}
        />
      </section>
    </div>
  );
}
