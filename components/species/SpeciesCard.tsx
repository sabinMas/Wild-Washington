import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatNumber } from "@/lib/utils";
import { type SpeciesRecord } from "@/types/species";

export function SpeciesCard({ species }: { species: SpeciesRecord }) {
  const habitatPreview = species.range.habitats.slice(0, 2).join(", ");

  return (
    <Link
      href={`/species/${species.slug}`}
      className="panel group flex h-full flex-col overflow-hidden rounded-[1.75rem] transition duration-200 hover:-translate-y-1 hover:[box-shadow:var(--shadow-lift)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border/60">
        <Image
          src={species.media.src}
          alt={species.media.alt}
          fill
          sizes="(min-width: 1280px) 28rem, (min-width: 768px) 44vw, 92vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
          <p className="rounded-full bg-white/88 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ocean shadow-sm">
            {species.speciesGroup}
          </p>
          <span
            className="mt-1 size-4 rounded-full border border-white/80 shadow-sm"
            style={{ backgroundColor: species.primaryColor }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="display-type text-2xl font-bold text-ocean">
              {species.commonName}
            </h3>
            <p className="mt-1 text-sm italic text-muted">{species.scientificName}</p>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <StatusBadge trend={species.trend} />
          <span className="rounded-full bg-sand/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            {species.listingStatus}
          </span>
        </div>

        <p className="text-sm leading-6 text-muted">{species.heroSummary}</p>

        <div className="panel-soft mt-5 grid gap-3 rounded-2xl p-4">
          <div>
            <p className="eyebrow">
              Current indicator
            </p>
            <p className="mt-1 text-2xl font-bold text-ink">
              {formatNumber(species.currentPopulation.estimate)}{" "}
              <span className="text-base font-semibold text-muted">{species.currentPopulation.unit}</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {species.populationMetric.label}
            </p>
          </div>
          <div className="grid gap-3 border-t border-border/60 pt-3 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Latest year</p>
              <p className="mt-1 text-sm font-semibold text-ink">{species.currentPopulation.year}</p>
            </div>
            <div>
              <p className="eyebrow">Key habitat</p>
              <p className="mt-1 text-sm font-semibold text-ink">{habitatPreview}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[1.15rem] bg-ocean/[0.07] px-4 py-3">
          <p className="text-sm font-semibold text-ocean">{species.quickFact}</p>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm font-semibold text-ocean">
          <span>Open species profile</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
}
