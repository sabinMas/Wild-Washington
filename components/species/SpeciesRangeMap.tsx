"use client";

import { Circle, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { type SpeciesRecord } from "@/types/species";

export function SpeciesRangeMap({ species }: { species: SpeciesRecord }) {
  return (
    <div className="panel rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-5">
      <div className="mb-5 sm:mb-6">
        <p className="section-kicker">Range map</p>
        <h2 className="section-title mt-3 font-bold text-ocean">
          Where this species is found in Washington
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Circles highlight important distribution or recovery regions rather than exact
          occupied boundaries.
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-border">
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

      <div className="mt-5 grid gap-4">
        <div>
          <p className="eyebrow">Habitats in focus</p>
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
        <p className="text-sm leading-6 text-muted">
          Regional circles are simplified teaching aids, not exact habitat boundaries or occupied range outlines.
        </p>
      </div>
    </div>
  );
}
