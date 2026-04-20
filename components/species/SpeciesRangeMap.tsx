"use client";

import { useEffect, useId, useRef } from "react";
import { Circle, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { type SpeciesRecord } from "@/types/species";

export function SpeciesRangeMap({ species }: { species: SpeciesRecord }) {
  const instructionsId = useId();
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const wrapper = mapWrapperRef.current;

      if (!wrapper) {
        return;
      }

      const zoomInButton = wrapper.querySelector<HTMLElement>(".leaflet-control-zoom-in");
      const zoomOutButton = wrapper.querySelector<HTMLElement>(".leaflet-control-zoom-out");

      zoomInButton?.setAttribute("aria-label", `Zoom in on the ${species.commonName} range map`);
      zoomInButton?.setAttribute("aria-describedby", instructionsId);
      zoomOutButton?.setAttribute(
        "aria-label",
        `Zoom out on the ${species.commonName} range map`,
      );
      zoomOutButton?.setAttribute("aria-describedby", instructionsId);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [instructionsId, species.commonName]);

  return (
    <div className="panel rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-5">
      <div className="mb-5 sm:mb-6">
        <span className="section-kicker" aria-hidden="true">
          Range map
        </span>
        <h3 className="section-title mt-3 font-bold text-ocean">
          Where this species is found in Washington
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Circles highlight important distribution or recovery regions rather than exact
          occupied boundaries.
        </p>
      </div>

      <div
        role="region"
        aria-label={`Range map for ${species.commonName}`}
        aria-describedby={instructionsId}
      >
        <div ref={mapWrapperRef} className="overflow-hidden rounded-[1.5rem] border border-border">
          <MapContainer
            center={species.range.center}
            zoom={species.range.zoom}
            scrollWheelZoom={false}
            className="h-[300px] w-full sm:h-[380px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {species.range.regions.map((region) => (
              <Circle
                key={region.name}
                center={region.center}
                radius={region.radiusKm * 1000}
                pathOptions={{
                  color: species.primaryColor,
                  fillColor: species.primaryColor,
                  fillOpacity: 0.2,
                  weight: 2,
                }}
              >
                <Tooltip>
                  <div className="max-w-xs">
                    <p className="font-semibold">{region.name}</p>
                    <p className="text-sm">{region.note}</p>
                  </div>
                </Tooltip>
              </Circle>
            ))}
          </MapContainer>
        </div>
      </div>
      <p id={instructionsId} className="mt-3 text-sm leading-6 text-muted">
        Use Tab to reach the zoom controls, then press Enter or Space on the plus and minus buttons
        to zoom in or out.
      </p>

      <div className="mt-5 grid gap-4">
        <div>
          <h4 className="eyebrow text-ink">Habitats in focus</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {species.range.habitats.map((habitat) => (
              <span
                key={habitat}
                className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink"
              >
                {habitat}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="eyebrow text-ink">Region notes</h4>
          <ul className="mt-3 grid gap-3 text-sm leading-6 text-muted">
            {species.range.regions.map((region) => (
              <li key={region.name} className="story-card p-4">
                <span className="font-semibold text-ink">{region.name}: </span>
                {region.note}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm leading-6 text-muted">
          Regional circles are simplified teaching aids, not exact habitat boundaries or occupied range outlines.
        </p>
      </div>
    </div>
  );
}
