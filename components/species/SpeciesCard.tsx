"use client";

import Image from "next/image";
import Link from "next/link";
import { CardContentStack } from "@/components/ui/CardContentStack";
import { moveFocusInCardGrid, formatNumber } from "@/lib/utils";
import { type SpeciesRecord } from "@/types/species";

function statusTone(status: SpeciesRecord["trend"]) {
  if (status === "declining") {
    return "bg-danger text-white";
  }

  if (status === "improving") {
    return "bg-success text-white";
  }

  return "bg-warning text-[var(--color-text)]";
}

function statusLabel(status: SpeciesRecord["trend"]) {
  if (status === "declining") {
    return "Declining";
  }

  if (status === "improving") {
    return "Improving";
  }

  return "Stable";
}

export function SpeciesCard({ species }: { species: SpeciesRecord }) {
  const label = statusLabel(species.trend);
  const metricText = `${formatNumber(species.currentPopulation.estimate)} ${species.currentPopulation.unit} in ${species.currentPopulation.year}`;

  return (
    <Link
      href={`/species/${species.slug}`}
      data-species-card="true"
      aria-label={`Explore ${species.commonName}`}
      onKeyDown={(event) => {
        const currentTarget = event.currentTarget;

        if (moveFocusInCardGrid(currentTarget, event.key)) {
          event.preventDefault();
        }
      }}
      className="group block h-full rounded-[var(--radius-xl)] focus-visible:rounded-[var(--radius-xl)]"
    >
      <article className="panel relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-xl)] transition-shadow duration-200 group-hover:shadow-[var(--shadow-lg)] group-focus-visible:shadow-[var(--shadow-lg)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={species.media.src}
            alt={species.media.alt}
            fill
            sizes="(min-width: 1280px) 20rem, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.12) 45%, transparent 100%)",
            }}
          />
          <span
            className={`absolute left-4 top-4 shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] ${statusTone(species.trend)}`}
          >
            {label}
          </span>
        </div>

        <CardContentStack
          eyebrow={
            <span className="eyebrow" aria-hidden="true">
              {species.speciesGroup}
            </span>
          }
          title={<h3 className="display-type">{species.commonName}</h3>}
          metric={<p>{metricText}</p>}
          description={<p className="line-clamp-3">{species.quickFact}</p>}
          footer={
            <span
              aria-hidden="true"
              className="text-sm font-semibold text-ocean underline-offset-4 group-hover:underline group-focus-visible:underline"
            >
              Explore species
            </span>
          }
          className="bg-[var(--color-surface)]"
          titleClassName="display-type text-[1.6rem] sm:text-[1.9rem]"
        />
      </article>
    </Link>
  );
}
