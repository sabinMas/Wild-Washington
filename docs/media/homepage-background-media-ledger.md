# Homepage Background Media Ledger

Last updated: 2026-03-27

## Download Location

Downloaded source media lives in:

- `assets/homepage-background/downloads/video`

## Downloaded Video Assets

| Species | Local file | Duration | Source page | License | Attribution requirement | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Southern Resident Orca | `assets/homepage-background/downloads/video/southern-resident-orca-j50-noaa.mp4` | 1:00 | <https://videos.fisheries.noaa.gov/detail/video/5818700481001/b-roll%3A-southern-resident-killer-whale-j50---tracking-by-researchers> | Public domain NOAA Fisheries b-roll package | Yes, credit NOAA Fisheries | Cleanest short opener for hero use. Review opening slate before final edit in case any clip-specific credit is included. |
| Southern Resident Orca | `assets/homepage-background/downloads/video/southern-resident-orca-photogrammetry-noaa.mp4` | 7:33 | <https://videos.fisheries.noaa.gov/detail/video/4562510330001/b-roll%3A-photogrammetry-research-on-southern-resident-killer-whales> | Public domain NOAA Fisheries b-roll package | Yes, credit NOAA Fisheries | Strong backup reel with drone and body-condition footage. Large file. Review opening slate before use. |
| Pacific Salmon | `assets/homepage-background/downloads/video/pacific-salmon-chinook-commons.webm` | 0:13 | <https://commons.wikimedia.org/wiki/File:Chinook_salmon._Oncorhynchus_tshawytscha_video.webm> | CC BY 2.0 | Yes | Commons metadata lists creator as Gail Hampshire. Source credit points to Flickr. Good short species-specific insert shot. |
| Pacific Salmon | `assets/homepage-background/downloads/video/pacific-salmon-elwha-river-restoration-noaa.mp4` | 7:39 | <https://videos.fisheries.noaa.gov/detail/video/1741901755001/b-roll:-elwha-river-restoration> | Public domain NOAA Fisheries b-roll package | Yes, credit NOAA Fisheries | Habitat and restoration-heavy backup footage for salmon-adjacent transitions. Review opening slate before extracting clips. |
| Gray Wolf | `assets/homepage-background/downloads/video/gray-wolf-trail-camera-commons.webm` | 0:10 | <https://commons.wikimedia.org/wiki/File:Wolf_on_Trail_Camera.webm> | Public domain | No | Commons metadata identifies USFWS Mountain-Prairie and Kari Cieszkiewicz. Short but very usable for the homepage reel. |
| Greater Sage-Grouse | `assets/homepage-background/downloads/video/greater-sage-grouse-seedskadee-commons.webm` | 1:00 | <https://commons.wikimedia.org/wiki/File:Greater_sage-grouse_on_Seedskadee_National_Wildlife_Refuge.webm> | Public domain | No | Commons metadata identifies USFWS Mountain-Prairie and Tom Koerner. Good species-specific landscape footage. |

## Existing Still Image Coverage Already In Repo

These files already exist in the project and are usable as still-image backups or for subtle motion treatment if we cannot find enough clean video for every species.

| Species | Local image | Source | License | Attribution requirement |
| --- | --- | --- | --- | --- |
| Pacific Salmon | `public/images/species/pacific-salmon.jpg` | Ryan Hagerty / USFWS Fish and Aquatic Conservation via Wikimedia Commons | Public domain | No |
| Southern Resident Orca | `public/images/species/southern-resident-orca.jpg` | Erik Stockdale via Wikimedia Commons | CC0 1.0 | No |
| Northern Spotted Owl | `public/images/species/northern-spotted-owl.jpg` | Bureau of Land Management via Wikimedia Commons | Public domain | No |
| Gray Wolf | `public/images/species/gray-wolf.jpg` | USFWS / Gary Kramer via Wikimedia Commons | Public domain | No |
| Northern Leopard Frog | `public/images/species/northern-leopard-frog.jpg` | Gary Eslinger / USFWS Mountain-Prairie via Wikimedia Commons | Public domain | No |
| Columbia Basin Pygmy Rabbit | `public/images/species/columbia-basin-pygmy-rabbit.jpg` | Z. Radmer / USFWS Pacific via Wikimedia Commons | Public domain | No |
| Marbled Murrelet | `public/images/species/marbled-murrelet.jpg` | Robin Corcoran / USFWS Alaska via Wikimedia Commons | Public domain | No |
| Greater Sage-Grouse | `public/images/species/greater-sage-grouse.jpg` | Bob Wick / Bureau of Land Management via Wikimedia Commons | Public domain | No |

## License Notes

### NOAA Fisheries b-roll

NOAA Fisheries states that:

- Narrative videos may only be reused in full
- B-roll packages are in the public domain
- B-roll packages can be downloaded and used as long as NOAA Fisheries is credited
- Opening slates may include clip-specific attribution and permit details

Because of that, every NOAA asset in this folder should be reviewed at the opening slate before we cut it into the homepage montage.

### Wikimedia Commons videos

Commons API metadata was used to verify the current license state for the downloaded files:

- `Chinook salmon. Oncorhynchus tshawytscha video.webm`: CC BY 2.0, attribution required
- `Wolf on Trail Camera.webm`: Public domain
- `Greater sage-grouse on Seedskadee National Wildlife Refuge.webm`: Public domain

## Remaining Gaps

We still need true video coverage for:

- Northern Spotted Owl
- Northern Leopard Frog
- Columbia Basin Pygmy Rabbit
- Marbled Murrelet

For those four species, the current fallback is still-image motion treatment using the existing repo images until we find clean downloadable footage with clear reuse rights.

## Best Current First Edit Set

If we start a first Canva cut immediately, the strongest mix right now is:

1. `southern-resident-orca-j50-noaa.mp4`
2. `pacific-salmon-chinook-commons.webm`
3. `gray-wolf-trail-camera-commons.webm`
4. `greater-sage-grouse-seedskadee-commons.webm`
5. `southern-resident-orca-photogrammetry-noaa.mp4`
6. `pacific-salmon-elwha-river-restoration-noaa.mp4`
7. Still-image motion treatment from `public/images/species/northern-spotted-owl.jpg`
8. Still-image motion treatment from `public/images/species/marbled-murrelet.jpg`
9. Still-image motion treatment from `public/images/species/columbia-basin-pygmy-rabbit.jpg`
10. Still-image motion treatment from `public/images/species/northern-leopard-frog.jpg`
