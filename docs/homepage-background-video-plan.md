# Homepage Background Video Plan

## Goal

Create a short wildlife montage for the homepage hero that can replace or complement the current cycling still images in `app/page.tsx`.

Recommended creative target:

- 20 to 30 seconds total runtime
- 16:9 master composition for desktop hero use
- Safe center framing so the same asset can be cropped for mobile
- No spoken audio
- Muted playback and seamless loop
- Slow, cinematic pacing instead of fast promo-style cuts

## Current Species Inventory

The current project includes 8 species. Every species already has one still image tracked with license metadata in `lib/data/species-media.ts`, but none currently has video coverage.

| Species | Slug | Group | Habitat cues from repo | Existing still image | Video needed |
| --- | --- | --- | --- | --- | --- |
| Columbia Basin Pygmy Rabbit | `columbia-basin-pygmy-rabbit` | Mammal | Deep-soil sagebrush, shrub-steppe preserves, managed release sites | Yes | Yes |
| Gray Wolf | `gray-wolf` | Mammal | Northeast forests, North Cascades, south-central transition zones | Yes | Yes |
| Greater Sage-Grouse | `greater-sage-grouse` | Bird | Shrub-steppe, lek complexes, sagebrush uplands | Yes | Yes |
| Marbled Murrelet | `marbled-murrelet` | Seabird | Coastal marine waters, Olympic Peninsula old forests, southwest coastal forest | Yes | Yes |
| Northern Leopard Frog | `northern-leopard-frog` | Amphibian | Pothole wetlands, managed marshes, floodplain ponds | Yes | Yes |
| Northern Spotted Owl | `northern-spotted-owl` | Bird | Cascade old-growth forest, Olympic Peninsula forest, southwest forest reserves | Yes | Yes |
| Pacific Salmon | `pacific-salmon` | Fish | Puget Sound rivers, Olympic Peninsula streams, lower Columbia tributaries | Yes | Yes |
| Southern Resident Orca | `southern-resident-orca` | Marine mammal | Salish Sea, Strait of Juan de Fuca, outer coast foraging waters | Yes | Yes |

## Recommended Montage Order

This order should feel broader and more cinematic than the current alphabetical homepage selection:

1. Southern Resident Orca
2. Pacific Salmon
3. Northern Spotted Owl
4. Gray Wolf
5. Marbled Murrelet
6. Columbia Basin Pygmy Rabbit
7. Greater Sage-Grouse
8. Northern Leopard Frog

Why this order works:

- It opens with large-scale water movement and recognizable Washington wildlife.
- It moves from marine and river life into forest species.
- It ends with smaller, more intimate land and wetland moments that can loop gently.

## Asset Checklist

For each species, collect at least:

- 1 horizontal video clip, ideally 4 to 6 seconds long
- 1 backup horizontal video clip
- 1 strong still image backup in case we need motion treatment instead of video
- Source URL
- Creator or institution name
- License type
- Attribution requirements
- Downloaded filename stored in a consistent species folder

Suggested shot types:

- Southern Resident Orca: surfacing, dorsal fin travel, pod movement, calm water
- Pacific Salmon: underwater swim, spawning movement, river current detail
- Northern Spotted Owl: perched profile, forest branch detail, slow head turn
- Gray Wolf: walking profile, alert look, forest meadow movement
- Marbled Murrelet: water drift, surface paddling, coastal atmosphere
- Columbia Basin Pygmy Rabbit: sagebrush cover, foraging, close low-angle motion
- Greater Sage-Grouse: lek display, sagebrush landscape movement, wide habitat shot
- Northern Leopard Frog: pond-edge movement, lily-pad or marsh detail, close environmental shot

## Licensing Rules

Use only media that is clearly reusable for this project.

Preferred licenses:

- Public domain
- CC0
- Government media that explicitly permits reuse
- CC BY if we are comfortable keeping attribution records and showing them where needed

Avoid by default:

- CC BY-NC
- CC BY-ND
- "Free to use" pages without a clear license statement
- YouTube or Vimeo uploads without explicit downloadable reuse rights

Minimum tracking requirements for every asset:

- Species
- Asset type: `video` or `image`
- Title
- Creator
- Source page URL
- Direct download URL if available
- License name
- License URL
- Attribution required: `yes` or `no`
- Notes on restrictions or edits

## Canva Assembly Brief

Build a homepage background reel in Canva with:

- One master landscape video
- 8 to 12 clips total
- Mostly 3 to 5 second clip durations
- Slow cross-dissolves or clean cuts only
- A subtle dark overlay so homepage text stays readable
- No titles, labels, badges, or captions burned into the video
- No heavy zooms, flashy transitions, or upbeat promo pacing

Suggested structure:

1. Open on water movement with the orca
2. Cut into salmon or underwater river footage
3. Shift into old-growth forest species: owl, wolf, murrelet
4. Move into shrub-steppe species: pygmy rabbit, sage-grouse
5. End on wetland texture with the leopard frog
6. Return to a calm ocean or river-adjacent visual to help the loop feel natural

## Implementation Notes For The Site

The current homepage hero cycles still images in `app/page.tsx`. Once assets are collected and the Canva export is approved, the likely next implementation steps are:

- Add the exported hero video under `public`
- Add a small media manifest for the hero background asset and attribution data
- Update the homepage hero to use video on supported devices
- Keep a still-image fallback for reduced motion, mobile performance, or failed video load

## Recommended Next Session

The next practical step is not Canva editing yet. It is media sourcing.

Next work block:

1. Create a source ledger for all 8 species
2. Find 2 reusable video candidates per species
3. Download only assets with clean license terms
4. Review the strongest 8 to 12 clips
5. Assemble the first Canva background reel
