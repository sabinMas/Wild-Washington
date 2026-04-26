import { type SpeciesMedia, type SpeciesMotionMedia } from "@/types/species";

interface SpeciesMediaBundle {
  featured: SpeciesMedia;
  gallery: SpeciesMedia[];
  motionMedia?: SpeciesMotionMedia[];
}

function commonsFilePath(fileName: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=1280`;
}

function commonsFilePage(fileName: string) {
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileName).replace(/%3A/g, ":")}`;
}

function commonsStill({
  fileName,
  alt,
  photographer,
  licenseLabel,
  licenseHref,
}: {
  fileName: string;
  alt: string;
  photographer: string;
  licenseLabel: string;
  licenseHref: string;
}): SpeciesMedia {
  const filePage = commonsFilePage(fileName);

  return {
    src: commonsFilePath(fileName),
    alt,
    photographer,
    photographerHref: filePage,
    sourceLabel: "Wikimedia Commons",
    sourceHref: filePage,
    licenseLabel,
    licenseHref,
  };
}

function commonsMotion({
  fileName,
  title,
  description,
  creator,
  licenseLabel,
  licenseHref,
}: {
  fileName: string;
  title: string;
  description: string;
  creator: string;
  licenseLabel: string;
  licenseHref: string;
}): SpeciesMotionMedia {
  const filePage = commonsFilePage(fileName);

  return {
    title,
    description,
    href: filePage,
    creator,
    sourceLabel: "Wikimedia Commons",
    sourceHref: filePage,
    licenseLabel,
    licenseHref,
  };
}

export const speciesMediaBySlug: Record<string, SpeciesMediaBundle> = {
  "pacific-salmon": {
    featured: {
      src: "/images/species/pacific-salmon.jpg",
      alt: "A Chinook salmon in side profile underwater.",
      photographer: "Ryan Hagerty / USFWS Fish and Aquatic Conservation",
      photographerHref: "https://commons.wikimedia.org/wiki/File:Chinook_Salmon_-_49588728982.jpg",
      sourceLabel: "Wikimedia Commons",
      sourceHref: "https://commons.wikimedia.org/wiki/File:Chinook_Salmon_-_49588728982.jpg",
      licenseLabel: "Public domain",
      licenseHref: "https://commons.wikimedia.org/wiki/File:Chinook_Salmon_-_49588728982.jpg",
    },
    gallery: [
      commonsStill({
        fileName: "File:Chinook salmon (54283466395).jpg",
        alt: "Adult Chinook salmon returning to spawn in freshwater in western Washington.",
        photographer: "USFWS Pacific",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:Chinook_salmon_(54283466395).jpg",
      }),
      commonsStill({
        fileName: "File:Chinook Salmon.jpg",
        alt: "Spawning fall Chinook salmon photographed underwater in the Pacific Northwest.",
        photographer: "USFWS Fish and Aquatic Conservation",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:Chinook_Salmon.jpg",
      }),
    ],
    motionMedia: [
      commonsMotion({
        fileName: "File:Chinook salmon. Oncorhynchus tshawytscha video.webm",
        title: "Open a Chinook salmon video",
        description: "A short freely licensed clip of a Chinook salmon after spawning.",
        creator: "Gail Ewing",
        licenseLabel: "CC BY 2.0",
        licenseHref: "https://creativecommons.org/licenses/by/2.0/",
      }),
    ],
  },
  "southern-resident-orca": {
    featured: {
      src: "/images/species/southern-resident-orca.jpg",
      alt: "A Southern Resident orca surfaces in Puget Sound.",
      photographer: "Erik Stockdale",
      photographerHref: "https://commons.wikimedia.org/wiki/File:Male_orca_whale_L79_southern_resident_puget_sound.jpg",
      sourceLabel: "Wikimedia Commons",
      sourceHref: "https://commons.wikimedia.org/wiki/File:Male_orca_whale_L79_southern_resident_puget_sound.jpg",
      licenseLabel: "CC0 1.0",
      licenseHref: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
    gallery: [
      commonsStill({
        fileName: "File:OCNMS - Southern Resident Orca (32494961903).jpg",
        alt: "A Southern Resident orca surfacing with its dorsal fin clear above the water.",
        photographer: "National Marine Sanctuaries / NOAA",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:OCNMS_-_Southern_Resident_Orca_(32494961903).jpg",
      }),
      commonsStill({
        fileName: "File:OCNMS - Southern Resident Orca (27908134611).jpg",
        alt: "Southern Resident orcas traveling together near the Olympic Coast.",
        photographer: "National Marine Sanctuaries / NOAA",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:OCNMS_-_Southern_Resident_Orca_(27908134611).jpg",
      }),
    ],
  },
  "northern-spotted-owl": {
    featured: {
      src: "/images/species/northern-spotted-owl.jpg",
      alt: "A Northern spotted owl perched on a mossy branch.",
      photographer: "Bureau of Land Management",
      photographerHref: "https://commons.wikimedia.org/wiki/File:Northern_Spotted_Owl_(8434205482).jpg",
      sourceLabel: "Wikimedia Commons",
      sourceHref: "https://commons.wikimedia.org/wiki/File:Northern_Spotted_Owl_(8434205482).jpg",
      licenseLabel: "Public domain",
      licenseHref: "https://commons.wikimedia.org/wiki/File:Northern_Spotted_Owl_(8434205482).jpg",
    },
    gallery: [
      commonsStill({
        fileName: "File:Northern Spotted Owl.USFWS.jpg",
        alt: "A Northern spotted owl in central Oregon with bright eyes and a pale face disk.",
        photographer: "John and Karen Hollingsworth / USFS Region 5",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:Northern_Spotted_Owl.USFWS.jpg",
      }),
      commonsStill({
        fileName: "File:Female adult northern spotted owl perched.jpg",
        alt: "An adult female Northern spotted owl perched upright on a branch.",
        photographer: "Sounds Wild",
        licenseLabel: "CC BY-SA 4.0",
        licenseHref: "https://creativecommons.org/licenses/by-sa/4.0/",
      }),
    ],
  },
  "gray-wolf": {
    featured: {
      src: "/images/species/gray-wolf.jpg",
      alt: "A gray wolf looking directly toward the camera.",
      photographer: "USFWS / Gary Kramer",
      photographerHref: "https://commons.wikimedia.org/wiki/File:Grey_Wolf_Portrait.jpg",
      sourceLabel: "Wikimedia Commons",
      sourceHref: "https://commons.wikimedia.org/wiki/File:Grey_Wolf_Portrait.jpg",
      licenseLabel: "Public domain",
      licenseHref: "https://commons.wikimedia.org/wiki/File:Grey_Wolf_Portrait.jpg",
    },
    gallery: [
      commonsStill({
        fileName: "File:Front view of a resting Canis lupus ssp.jpg",
        alt: "A resting gray wolf facing forward with its paws tucked underneath.",
        photographer: "Gary Kramer",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:Front_view_of_a_resting_Canis_lupus_ssp.jpg",
      }),
      commonsStill({
        fileName: "File:Canis lupus standing in snow.jpg",
        alt: "A gray wolf standing in snowy habitat with its ears alert.",
        photographer: "Tracy Brooks",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:Canis_lupus_standing_in_snow.jpg",
      }),
    ],
  },
  "northern-leopard-frog": {
    featured: {
      src: "/images/species/northern-leopard-frog.jpg",
      alt: "A northern leopard frog sitting among floating vegetation.",
      photographer: "Gary Eslinger / USFWS Mountain-Prairie",
      photographerHref: "https://commons.wikimedia.org/wiki/File:Northern_Leopard_Frog_(14541054827).jpg",
      sourceLabel: "Wikimedia Commons",
      sourceHref: "https://commons.wikimedia.org/wiki/File:Northern_Leopard_Frog_(14541054827).jpg",
      licenseLabel: "Public domain",
      licenseHref: "https://commons.wikimedia.org/wiki/File:Northern_Leopard_Frog_(14541054827).jpg",
    },
    gallery: [
      commonsStill({
        fileName: "File:Lithobates pipiens - Northern Leopard Frog 01.jpg",
        alt: "A Northern leopard frog crouched on grass in Minnesota.",
        photographer: "Jasper Shide",
        licenseLabel: "CC0 1.0",
        licenseHref: "https://creativecommons.org/publicdomain/zero/1.0/",
      }),
      commonsStill({
        fileName: "File:Northern leopard frog release (48553274531).jpg",
        alt: "Northern leopard frogs being released into the wild in central Washington.",
        photographer: "USFWS Pacific",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:Northern_leopard_frog_release_(48553274531).jpg",
      }),
    ],
  },
  "columbia-basin-pygmy-rabbit": {
    featured: {
      src: "/images/species/columbia-basin-pygmy-rabbit.jpg",
      alt: "A young Columbia Basin pygmy rabbit in a caregiver's hand.",
      photographer: "Z. Radmer / USFWS Pacific",
      photographerHref: "https://commons.wikimedia.org/wiki/File:Two-week-old_Columbia_Basin_Pygmy_Rabbit_(52948321689).jpg",
      sourceLabel: "Wikimedia Commons",
      sourceHref: "https://commons.wikimedia.org/wiki/File:Two-week-old_Columbia_Basin_Pygmy_Rabbit_(52948321689).jpg",
      licenseLabel: "Public domain",
      licenseHref: "https://commons.wikimedia.org/wiki/File:Two-week-old_Columbia_Basin_Pygmy_Rabbit_(52948321689).jpg",
    },
    gallery: [
      commonsStill({
        fileName: "File:Columbia Basin Pygmy Rabbit (54978242753).jpg",
        alt: "A Columbia Basin pygmy rabbit during population monitoring in Washington.",
        photographer: "USFWS Pacific",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:Columbia_Basin_Pygmy_Rabbit_(54978242753).jpg",
      }),
      commonsStill({
        fileName: "File:Columbia Basin Pygmy Rabbit.jpg",
        alt: "A Columbia Basin pygmy rabbit photographed on open ground.",
        photographer: "H. Ulmscheider and R. Dixon",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:Columbia_Basin_Pygmy_Rabbit.jpg",
      }),
    ],
  },
  "marbled-murrelet": {
    featured: {
      src: "/images/species/marbled-murrelet.jpg",
      alt: "A marbled murrelet floating on calm water.",
      photographer: "Robin Corcoran / USFWS Alaska",
      photographerHref: "https://commons.wikimedia.org/wiki/File:Marbled_murrelet_(30400003546).jpg",
      sourceLabel: "Wikimedia Commons",
      sourceHref: "https://commons.wikimedia.org/wiki/File:Marbled_murrelet_(30400003546).jpg",
      licenseLabel: "Public domain",
      licenseHref: "https://commons.wikimedia.org/wiki/File:Marbled_murrelet_(30400003546).jpg",
    },
    gallery: [
      commonsStill({
        fileName: "File:Marbled murrelet (Brachyramphus marmoratus) 2023 01.jpg",
        alt: "A marbled murrelet floating on water near Homer, Alaska.",
        photographer: "TRinaud",
        licenseLabel: "CC BY 4.0",
        licenseHref: "https://creativecommons.org/licenses/by/4.0/",
      }),
      commonsStill({
        fileName: "File:Marbled murrelet breeding plumage.jpg",
        alt: "A marbled murrelet showing mottled breeding plumage while afloat.",
        photographer: "USFWS",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:Marbled_murrelet_breeding_plumage.jpg",
      }),
    ],
  },
  "greater-sage-grouse": {
    featured: {
      src: "/images/species/greater-sage-grouse.jpg",
      alt: "A male greater sage-grouse displaying on a lek.",
      photographer: "Bob Wick / Bureau of Land Management",
      photographerHref: "https://commons.wikimedia.org/wiki/File:Greater_sage-grouse_(Centrocercus_urophasianus).jpg",
      sourceLabel: "Wikimedia Commons",
      sourceHref: "https://commons.wikimedia.org/wiki/File:Greater_sage-grouse_(Centrocercus_urophasianus).jpg",
      licenseLabel: "Public domain",
      licenseHref: "https://commons.wikimedia.org/wiki/File:Greater_sage-grouse_(Centrocercus_urophasianus).jpg",
    },
    gallery: [
      commonsStill({
        fileName: "File:Sage-grouse (15759389805).jpg",
        alt: "A greater sage-grouse standing in sagebrush habitat in Oregon.",
        photographer: "Bureau of Land Management Oregon and Washington",
        licenseLabel: "Public domain",
        licenseHref: "https://commons.wikimedia.org/wiki/File:Sage-grouse_(15759389805).jpg",
      }),
      commonsStill({
        fileName: "File:Greater sage grouse at Seedskadee National Wildlife Refuge (43879481182).jpg",
        alt: "A greater sage-grouse at Seedskadee National Wildlife Refuge.",
        photographer: "USFWS Mountain-Prairie / Tom Koerner",
        licenseLabel: "CC BY 2.0",
        licenseHref: "https://creativecommons.org/licenses/by/2.0/",
      }),
    ],
    motionMedia: [
      commonsMotion({
        fileName: "File:Greater sage-grouse (Centrocercus urophasianus).webm",
        title: "Open a greater sage-grouse video",
        description: "A freely licensed clip showing a greater sage-grouse in Oregon.",
        creator: "Bureau of Land Management Oregon and Washington",
        licenseLabel: "CC BY 2.0",
        licenseHref: "https://creativecommons.org/licenses/by/2.0/",
      }),
    ],
  },
};
