import {
  type BulletSection,
  type ContentCard,
  type FeaturedStory,
  type GovernanceSignal,
  type LinkCard,
  type SiteAction,
  type SiteNavItem,
  type SupportAllocation,
} from "@/types/site";

function ensureNonEmpty<T>(label: string, items: T[]): T[] {
  if (items.length === 0) {
    throw new Error(`${label} must contain at least one entry.`);
  }

  return items;
}

export const siteIdentity = {
  name: "Wild Washington",
  shortName: "Wild Washington",
  programLabel: "Wildlife education and conservation program",
  tagline:
    "A public-facing learning platform for Washington wildlife restoration, stewardship, and evidence-based interpretation.",
  description:
    "Wild Washington is an institution-ready educational platform that helps public visitors, educators, and conservation partners explore wildlife stories, understand the limits of species data, and move toward stewardship.",
  locationContext: "Washington state",
};

export const primaryNavigation = ensureNonEmpty<SiteNavItem>("Primary navigation", [
  {
    href: "/explore",
    label: "Explore Wildlife",
    description: "Browse species stories, habitat context, and field-guide style profiles.",
  },
  {
    href: "/learn",
    label: "Learning Hub",
    description: "Open classroom, youth, and educator-ready pathways grounded in real species data.",
  },
  {
    href: "/compare",
    label: "Compare Species",
    description: "Read multiple recovery stories side by side with clear normalized comparisons.",
  },
  {
    href: "/conservation-action",
    label: "Conservation Action",
    description: "Connect species stories to stewardship, field learning, and partner organizations.",
  },
  {
    href: "/about-data",
    label: "About the Data",
    description: "Review data sources, methodology, confidence notes, and project limitations.",
  },
]);

export const utilityNavigation = ensureNonEmpty<SiteNavItem>("Utility navigation", [
  {
    href: "/about",
    label: "Project Overview",
    description: "Mission, audiences served, stewardship intent, and program context.",
  },
  {
    href: "/institutional-use",
    label: "For Museums & Educators",
    description: "Institutional use cases, adoption notes, and public-program fit.",
  },
  {
    href: "/partnerships",
    label: "Partnerships",
    description: "Credits, collaborators, and partnership pathways for content and programming.",
  },
  {
    href: "/accessibility",
    label: "Accessibility",
    description: "Accessibility statement, commitments, and known limitations.",
  },
  {
    href: "/support",
    label: "Support",
    description: "Program support, donation framing, and stewardship impact.",
  },
]);

export const homepageAudiencePaths = ensureNonEmpty<LinkCard>("Homepage audience paths", [
  {
    kicker: "For public visitors",
    title: "Start with a species story that connects numbers to place",
    description:
      "Explore wildlife profiles that pair trend interpretation with habitat regions, threats, recovery work, and trusted sources.",
    href: "/explore",
    cta: "Explore wildlife stories",
  },
  {
    kicker: "For educators",
    title: "Open lesson pathways built for classrooms, nature centers, and youth programs",
    description:
      "Use audience-specific learning routes with objectives, prompts, vocabulary, and evidence moves tied to the same species records visitors can inspect.",
    href: "/learn",
    cta: "Open the learning hub",
  },
  {
    kicker: "For partners",
    title: "Use the platform as a public interpretation and outreach layer",
    description:
      "Wild Washington is structured to support museum exhibits, nonprofit programming, field interpretation, and institutional storytelling.",
    href: "/institutional-use",
    cta: "See institutional use cases",
  },
  {
    kicker: "For donors and stewards",
    title: "Support education, transparency, and local conservation engagement",
    description:
      "Contribution pathways emphasize stewardship impact, trustworthy interpretation, and long-term maintainability rather than one-off campaign language.",
    href: "/support",
    cta: "Support the program",
  },
]);

export const homepageTrustMarkers = ensureNonEmpty<ContentCard>("Homepage trust markers", [
  {
    kicker: "Transparent data practice",
    title: "Sources, confidence, and caveats stay close to the story",
    description:
      "Each species page keeps its measurement notes, source links, and interpretive limits visible so visitors can understand both what the data says and what it cannot claim.",
  },
  {
    kicker: "Education value",
    title: "The same platform supports public learning and classroom use",
    description:
      "Species stories, comparison tools, and lesson paths are aligned so museums, schools, and conservation organizations can work from a shared public resource.",
  },
  {
    kicker: "Operational readiness",
    title: "Structured content and reusable components make handoff easier",
    description:
      "The platform is organized around shared content models, reusable sections, and maintainable route patterns so future contributors can expand beyond the current species set.",
  },
  {
    kicker: "Accessibility commitment",
    title: "Readable, keyboard-friendly, and calm by design",
    description:
      "The experience favors semantic structure, strong focus treatment, descriptive link text, reduced-motion support, and chart summaries intended to move the product closer to WCAG 2.1 AA expectations.",
  },
]);

export const homepageFeaturedStories = ensureNonEmpty<FeaturedStory>("Homepage featured stories", [
  {
    speciesSlug: "southern-resident-orca",
    kicker: "Featured wildlife story",
    title: "Southern Resident Orca",
    description:
      "A marine recovery story shaped by prey availability, vessel disturbance, and regional stewardship decisions.",
  },
  {
    speciesSlug: "northern-spotted-owl",
    kicker: "Featured wildlife story",
    title: "Northern Spotted Owl",
    description:
      "An old-growth forest interpretation case that connects habitat fragmentation, long-term monitoring, and recovery uncertainty.",
  },
  {
    speciesSlug: "pacific-salmon",
    kicker: "Featured wildlife story",
    title: "Pacific Salmon",
    description:
      "A watershed-scale story that helps visitors link river systems, migration barriers, and restoration work across regions.",
  },
  {
    speciesSlug: "gray-wolf",
    kicker: "Featured wildlife story",
    title: "Gray Wolf",
    description:
      "A public-facing case study in coexistence, policy, and how population recovery can still produce complex community questions.",
  },
]);

export const homepageProgramHighlights = ensureNonEmpty<ContentCard>("Homepage program highlights", [
  {
    kicker: "Mission",
    title: "Interpret wildlife restoration through evidence, place, and stewardship",
    description:
      "Wild Washington helps museums, educators, and conservation organizations translate source-specific wildlife records into a calm, trustworthy public learning experience.",
  },
  {
    kicker: "Who it serves",
    title: "Built for visitors, educators, youth programs, and partner organizations",
    description:
      "The platform supports self-guided exploration, exhibit-linked learning, classroom extension, and institutional outreach without forcing each audience into a separate product.",
  },
  {
    kicker: "Conservation relevance",
    title: "Designed to connect interpretation with real-world action",
    description:
      "Species pages and action pathways make it easier to move from learning about trends to understanding habitat pressures, partner roles, and stewardship opportunities.",
  },
]);

export const homepagePrimaryActions: SiteAction[] = [
  { href: "/explore", label: "Explore Wildlife", variant: "primary" },
  { href: "/learn", label: "Learn With the Platform", variant: "secondary" },
  { href: "/support", label: "Support the Program", variant: "secondary" },
];

export const homepageSecondaryActions: SiteAction[] = [
  { href: "/about-data", label: "Review the data approach", variant: "ghost" },
  { href: "/institutional-use", label: "See institutional use cases", variant: "ghost" },
];

export const aboutProgramSections = ensureNonEmpty<BulletSection>("About program sections", [
  {
    title: "What Wild Washington is",
    bullets: [
      "A public-facing educational platform for wildlife restoration and conservation interpretation in Washington.",
      "A bridge between species datasets, public storytelling, classroom use, and institutional stewardship.",
      "A modular codebase designed so museums, nonprofits, and educational organizations can adapt it with less rework.",
    ],
  },
  {
    title: "Why it exists",
    bullets: [
      "Many wildlife websites surface facts or status labels without helping visitors interpret what the underlying data actually means.",
      "Teachers and interpretive staff often need a calmer, more trustworthy resource than a generic dashboard or a long PDF report.",
      "Conservation organizations benefit from a shared public layer that can explain both progress and limits without flattening complexity.",
    ],
  },
  {
    title: "How the program is structured",
    bullets: [
      "Species profiles pair trend summaries, range context, conservation pressures, recovery work, and sources in one story flow.",
      "Learning pathways reuse the same evidence base across audiences rather than creating a separate education-only product.",
      "Shared content models make room for future species, lessons, partner credits, institutional notes, and content contributors.",
    ],
  },
]);

export const institutionalUseCards = ensureNonEmpty<ContentCard>("Institutional use cards", [
  {
    kicker: "Museums and nature centers",
    title: "A public interpretation layer for exhibits, kiosks, and companion learning",
    description:
      "Use the platform as a digital field guide, exhibit extension, or program companion that helps visitors move from headline species stories into habitat, evidence, and stewardship.",
  },
  {
    kicker: "Schools and youth programs",
    title: "Evidence-based lesson support without losing public readability",
    description:
      "Audience-specific learning paths make the site usable for classrooms, after-school programs, field learning, and educator preparation.",
  },
  {
    kicker: "Conservation nonprofits",
    title: "A partner-ready communications and education resource",
    description:
      "The platform can support outreach, stewardship framing, donor education, and public program storytelling while keeping source caveats visible.",
  },
  {
    kicker: "Future contributors",
    title: "Designed for content stewardship beyond the original builder",
    description:
      "Structured content and reusable route patterns make it easier for non-engineers, editors, and partner institutions to maintain and expand the experience over time.",
  },
]);

export const governanceSignals = ensureNonEmpty<GovernanceSignal>("Governance signals", [
  {
    title: "Editorial transparency",
    description:
      "Methodology notes, source attributions, and confidence language are treated as first-class content rather than hidden documentation.",
  },
  {
    title: "Content stewardship readiness",
    description:
      "Core public-facing content is moving toward structured collections that can later migrate to flat files or a CMS without rewriting the interface.",
  },
  {
    title: "Institutional handoff support",
    description:
      "The platform now includes routes for accessibility, partnerships, support, and project overview so adopting organizations inherit the governance signals visitors expect.",
  },
  {
    title: "Operational flexibility",
    description:
      "Support language includes placeholder-ready structures for fiscal hosts, museum foundations, or nonprofit sponsorship models that can be filled in during handoff.",
  },
]);

export const partnershipCards = ensureNonEmpty<ContentCard>("Partnership cards", [
  {
    kicker: "Content partners",
    title: "Species expertise, regional interpretation, and educational review",
    description:
      "Potential partners can contribute species narratives, public-program framing, educator guidance, or review of local stewardship language.",
  },
  {
    kicker: "Data and source partners",
    title: "Agencies, labs, and organizations that maintain wildlife records",
    description:
      "The platform is strongest when source organizations remain visible and credited as the origin of the monitoring, reporting, and conservation knowledge represented here.",
  },
  {
    kicker: "Institutional adopters",
    title: "Museums, wildlife centers, and nonprofits seeking a ready-to-adapt platform",
    description:
      "Adopters can use the current structure as a public program foundation, then extend content, partner pages, and regional datasets with their own stewardship model.",
  },
]);

export const supportAllocations = ensureNonEmpty<SupportAllocation>("Support allocations", [
  {
    amount: "40%",
    title: "Education and interpretation",
    description:
      "Supports lesson development, exhibit-linked interpretation, audience testing, and regionally grounded public storytelling.",
  },
  {
    amount: "30%",
    title: "Content stewardship and data updates",
    description:
      "Supports source review, species updates, citation maintenance, editorial QA, and contributor coordination.",
  },
  {
    amount: "20%",
    title: "Accessibility and public usability",
    description:
      "Supports accessibility review, content refinement, plain-language editing, and improvements to charts, navigation, and mobile reading.",
  },
  {
    amount: "10%",
    title: "Platform operations",
    description:
      "Supports hosting, technical maintenance, and the shared infrastructure required for long-term public use and institutional handoff.",
  },
]);

export const supportSignals = ensureNonEmpty<ContentCard>("Support signals", [
  {
    kicker: "Stewardship impact",
    title: "Support helps people understand conservation work, not just encounter species facts",
    description:
      "Funding strengthens public interpretation, educator access, source transparency, and the connective tissue between wildlife stories and local stewardship.",
  },
  {
    kicker: "Credibility signal",
    title: "Donor messaging stays tied to evidence, partners, and public benefit",
    description:
      "The platform avoids exaggerated impact claims and instead emphasizes transparent sources, educator value, institutional collaboration, and long-term maintainability.",
  },
  {
    kicker: "Operations placeholder",
    title: "Ready for fiscal host or nonprofit implementation details",
    description:
      "Replace the placeholder donation administrator, tax language, and mailing information with museum foundation, fiscal sponsor, or nonprofit details during handoff.",
  },
]);

export const supportPrimaryActions: SiteAction[] = [
  { href: "/partnerships", label: "Explore partnership pathways", variant: "secondary" },
  { href: "/institutional-use", label: "Review institutional use", variant: "ghost" },
];

export const accessibilityCommitments = ensureNonEmpty<ContentCard>("Accessibility commitments", [
  {
    kicker: "Reading and structure",
    title: "Semantic sections, clear hierarchy, and descriptive calls to action",
    description:
      "The site is being refactored to use clearer headings, stronger landmarks, descriptive link text, and calmer content structure across public and educational routes.",
  },
  {
    kicker: "Interaction",
    title: "Keyboard access, visible focus, and reduced-motion support",
    description:
      "Navigation, filters, and CTAs are being improved to support keyboard use, stronger focus treatment, and fewer motion-dependent interactions.",
  },
  {
    kicker: "Data interpretation",
    title: "Chart guidance and screen-reader-friendly summaries",
    description:
      "Visualizations are paired with explanation, current-value summaries, and additional context so chart meaning does not depend on sight alone.",
  },
  {
    kicker: "Ongoing work",
    title: "Accessibility is treated as a maintained practice, not a one-time statement",
    description:
      "Because maps and data-rich experiences can introduce barriers, the project includes known-limitations language and invites future institutional review during handoff.",
  },
]);

export const footerExploreLinks = [
  ...primaryNavigation,
  ...utilityNavigation,
];
