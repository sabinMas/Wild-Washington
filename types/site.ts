export interface SiteAction {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
}

export interface SiteNavItem {
  href: string;
  label: string;
  description: string;
}

export interface LinkCard {
  kicker: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface ContentCard {
  kicker?: string;
  title: string;
  description: string;
}

export interface BulletSection {
  title: string;
  bullets: string[];
}

export interface FeaturedStory {
  speciesSlug: string;
  kicker: string;
  title: string;
  description: string;
}

export interface SupportAllocation {
  amount: string;
  title: string;
  description: string;
}

export interface GovernanceSignal {
  title: string;
  description: string;
}
