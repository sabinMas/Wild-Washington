"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { formatNumber } from "@/lib/utils";

type FeaturedSpecies = {
  slug: string;
  commonName: string;
  shortLabel: string;
  listingStatus: string;
  media: {
    src: string;
    alt: string;
  };
  currentPopulation: {
    year: number;
    estimate: number;
    unit: string;
  };
};

const ROTATION_MS = 7000;

function formatListingStatus(listingStatus: string) {
  return listingStatus.toUpperCase();
}

function formatHeroStat(species: FeaturedSpecies) {
  return `${species.currentPopulation.unit} in ${species.currentPopulation.year}`;
}

function formatBandLabel(species: FeaturedSpecies) {
  return species.currentPopulation.unit;
}

export function RotatingSpeciesShowcase({
  species,
  totalSpecies,
  totalObservedCheckpoints,
}: {
  species: FeaturedSpecies[];
  totalSpecies: number;
  totalObservedCheckpoints: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || species.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") {
        return;
      }

      setActiveIndex((current) => (current + 1) % species.length);
    }, ROTATION_MS);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, species.length]);

  const activeSpecies = species[activeIndex];

  function showPreviousSpecies() {
    setActiveIndex((current) => (current - 1 + species.length) % species.length);
  }

  function showNextSpecies() {
    setActiveIndex((current) => (current + 1) % species.length);
  }

  return (
    <>
      <section
        className="relative min-h-[85svh] overflow-hidden bg-black text-white sm:min-h-[100svh]"
        style={{
          backgroundImage: `url(${activeSpecies.media.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Image
          key={activeSpecies.slug}
          src={activeSpecies.media.src}
          alt={activeSpecies.media.alt}
          fill
          priority={activeIndex === 0}
          loading="eager"
          fetchPriority={activeIndex === 0 ? "high" : "auto"}
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.48) 55%, rgba(0, 0, 0, 0.12) 100%)",
          }}
        />

        <div className="shell relative flex min-h-[85svh] items-end pb-12 pt-20 sm:min-h-[100svh] sm:pb-20 sm:pt-28 lg:pb-20 lg:pt-32">
          <div className="w-full max-w-4xl rounded-[var(--radius-xl)] border border-white/12 bg-black/42 px-4 py-5 shadow-[var(--shadow-lg)] backdrop-blur-sm sm:px-7 sm:py-7 lg:px-8">
            <div className="flex min-w-0 flex-col gap-6">
              <div className="min-w-0 max-w-3xl">
                <p className="eyebrow text-[var(--color-accent)]">
                  {formatListingStatus(activeSpecies.listingStatus)}
                </p>
                <h1 className="hero-title mt-4 max-w-[14ch] text-balance leading-[0.96] text-white sm:max-w-[16ch]">
                  {activeSpecies.commonName}
                </h1>
                <div className="mt-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
                  <span className="display-type shrink-0 text-[clamp(2.9rem,16vw,5.75rem)] font-black leading-none text-white">
                    {formatNumber(activeSpecies.currentPopulation.estimate)}
                  </span>
                  <span className="max-w-xl text-base font-medium leading-6 tracking-[0.02em] text-white/88 sm:pb-2 sm:text-lg">
                    {formatHeroStat(activeSpecies)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <Link
                  href={`/species/${activeSpecies.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white px-6 py-3 text-base font-semibold !text-[#17130f] shadow-[var(--shadow-sm)] transition hover:bg-white/90 sm:w-auto"
                >
                  Meet this species
                </Link>

                <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/20 bg-black/20 px-2 py-2 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={showPreviousSpecies}
                    aria-label={`Show previous species before ${activeSpecies.commonName}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 sm:h-10 sm:w-10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="min-w-[3.5rem] text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                    {activeIndex + 1}/{species.length}
                  </span>
                  <button
                    type="button"
                    onClick={showNextSpecies}
                    aria-label={`Show species after ${activeSpecies.commonName}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 sm:h-10 sm:w-10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div aria-label="Featured species choices" className="min-w-0">
                <div className="scrollbar-hidden overflow-x-auto whitespace-nowrap">
                  <div className="flex w-max gap-2 px-1">
                    {species.map((entry, index) => {
                      const active = entry.slug === activeSpecies.slug;

                      return (
                        <button
                          key={entry.slug}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          aria-pressed={active}
                          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                            active
                              ? "bg-white text-black"
                              : "border border-white/25 bg-black/20 text-white/88 hover:bg-white/10"
                          }`}
                        >
                          {entry.shortLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-center text-sm font-medium text-white/80 md:block">
          <a href="#wildlife-grid" className="inline-flex flex-col items-center gap-1">
            <span>scroll for more</span>
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </section>

      <section className="mt-10 bg-[var(--color-primary)] py-8 text-white sm:mt-12 sm:py-10">
        <div className="shell grid gap-4 sm:grid-cols-3 sm:gap-5">
          <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-5 text-left backdrop-blur-sm">
            <p className="display-type text-5xl font-bold text-white">
              {formatNumber(activeSpecies.currentPopulation.estimate)}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.08em] text-white/85">
              {activeSpecies.shortLabel.toLowerCase()}
            </p>
            <p className="text-sm uppercase tracking-[0.08em] text-white/85">
              {formatBandLabel(activeSpecies)}
            </p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-5 text-left backdrop-blur-sm">
            <p className="display-type text-5xl font-bold text-white">{totalSpecies}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.08em] text-white/85">species</p>
            <p className="text-sm uppercase tracking-[0.08em] text-white/85">at risk</p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-5 text-left backdrop-blur-sm">
            <p className="display-type text-5xl font-bold text-white">
              {totalObservedCheckpoints}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.08em] text-white/85">data points</p>
            <p className="text-sm uppercase tracking-[0.08em] text-white/85">tracked</p>
          </div>
        </div>
      </section>
    </>
  );
}

