import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStoryAngle, getTrendSummary } from "@/lib/data/site-content";
import { formatNumber } from "@/lib/utils";
import { type SpeciesRecord } from "@/types/species";

export function SpeciesCard({ species }: { species: SpeciesRecord }) {
  const habitatPreview = species.range.habitats.slice(0, 2).join(", ");
  const storyAngle = getStoryAngle(species);

  return (
    <Link
      href={`/species/${species.slug}`}
      className="panel group flex h-full flex-col overflow-hidden rounded-[1.9rem] transition duration-200 hover:-translate-y-1 hover:[box-shadow:var(--shadow-lift)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border/60">
        <Image
          src={species.media.src}
          alt={species.media.alt}
          fill
          sizes="(min-width: 1280px) 28rem, (min-width: 768px) 44vw, 92vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,23,21,0.72)] via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
          <p className="rounded-full border border-white/18 bg-[rgba(255,251,245,0.9)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ocean shadow-sm">
            {species.speciesGroup}
          </p>
          <span
            className="mt-1 size-4 rounded-full border border-white/80 shadow-sm"
            style={{ backgroundColor: species.primaryColor }}
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
            {species.listingStatus}
          </p>
          <h3 className="display-type mt-2 text-3xl font-semibold leading-tight text-white">
            {species.commonName}
          </h3>
          <p className="mt-1 text-sm italic text-[rgba(255,255,255,0.78)]">
            {species.scientificName}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <StatusBadge trend={species.trend} />
          <span className="info-pill">{storyAngle.label}</span>
        </div>

        <p className="text-sm leading-6 text-muted">{species.heroSummary}</p>

        <div className="story-card mt-5 p-4">
          <p className="eyebrow">Why this profile is useful</p>
          <p className="mt-2 text-sm leading-6 text-muted">{getTrendSummary(species)}</p>
        </div>

        <div className="panel-soft mt-5 grid gap-3 rounded-[1.35rem] p-4">
          <div>
            <p className="eyebrow">Current indicator</p>
            <p className="mt-1 text-2xl font-bold text-ink">
              {formatNumber(species.currentPopulation.estimate)}{" "}
              <span className="text-base font-semibold text-muted">
                {species.currentPopulation.unit}
              </span>
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {species.populationMetric.label} in {species.currentPopulation.year}
            </p>
          </div>
          <div className="grid gap-3 border-t border-border/60 pt-3 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Key habitat</p>
              <p className="mt-1 text-sm font-semibold text-ink">{habitatPreview}</p>
            </div>
            <div>
              <p className="eyebrow">Metric type</p>
              <p className="mt-1 text-sm font-semibold text-ink">
                {species.populationMetric.label}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[1.15rem] bg-ocean/[0.07] px-4 py-3">
          <p className="eyebrow">Classroom hook</p>
          <p className="mt-2 text-sm font-semibold text-ocean">{species.quickFact}</p>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm font-semibold text-ocean">
          <span>Open species story</span>
          <span aria-hidden="true">View</span>
        </div>
      </div>
    </Link>
  );
}
