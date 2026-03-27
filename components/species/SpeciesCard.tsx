import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatNumber } from "@/lib/utils";
import { type SpeciesRecord } from "@/types/species";

export function SpeciesCard({ species }: { species: SpeciesRecord }) {
  return (
    <Link
      href={`/species/${species.slug}`}
      className="panel group flex h-full flex-col overflow-hidden rounded-[1.75rem] transition duration-200 hover:-translate-y-1 hover:shadow-2xl"
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
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 className="display-type text-2xl font-bold text-ocean">
              {species.commonName}
            </h3>
            <p className="mt-1 text-sm italic text-muted">{species.scientificName}</p>
          </div>
        </div>

        <div className="mb-4">
          <StatusBadge trend={species.trend} />
        </div>

        <p className="text-sm leading-6 text-muted">{species.heroSummary}</p>

        <div className="mt-6 grid gap-3 rounded-2xl bg-sand/70 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Population snapshot
            </p>
            <p className="mt-1 text-2xl font-bold text-ink">
              {formatNumber(species.currentPopulation.estimate)}{" "}
              <span className="text-base font-semibold text-muted">{species.currentPopulation.unit}</span>
            </p>
          </div>
          <div className="flex items-center justify-between text-sm text-muted">
            <span>{species.currentPopulation.year}</span>
            <span>{species.listingStatus}</span>
          </div>
        </div>

        <p className="mt-5 text-sm font-semibold text-ocean">{species.quickFact}</p>
      </div>
    </Link>
  );
}
