"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LogoMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-9 w-9 text-ocean"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31 9C22 12 15 20 15 31C15 43 24 53 36 55C45 47 49 37 49 28C49 17 41 10 31 9Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M30 12C23 15 18 22 18 31C18 40 23 47 31 51C39 47 44 39 44 30C44 22 39 15 30 12Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="23" r="3" fill="currentColor" />
      <circle cx="37" cy="20" r="3" fill="currentColor" />
      <circle cx="42" cy="31" r="3" fill="currentColor" />
      <path
        d="M29 28C26 29 24 31 24 35C24 39 27 42 31 42C35 42 38 39 38 35C38 31 36 29 33 28"
        fill="currentColor"
      />
    </svg>
  );
}

const exploreLinks = [
  { href: "/explore", label: "Wildlife" },
  { href: "/compare", label: "Compare" },
  { href: "/conservation", label: "Conservation" },
  { href: "/learn", label: "Learn" },
];

const aboutLinks = [
  { href: "/about", label: "Project Overview" },
  { href: "/about-data", label: "About the data" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/institutional-use", label: "For educators" },
];

export function SiteFooter() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <footer className="mt-16 border-t border-border bg-[var(--color-surface)] pt-10 sm:mt-20">
      <div className="shell grid gap-10 pb-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="display-type text-[1.5rem] font-bold text-ink">Wild Washington</span>
          </div>
          <p className="text-sm text-muted">
            Washington wildlife stories for exploration, learning, and conservation.
          </p>
        </div>

        <nav aria-labelledby="footer-explore-heading">
          <h2 id="footer-explore-heading" className="eyebrow">
            Explore
          </h2>
          <ul className="mt-4 grid gap-3">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="text-base font-semibold text-ink transition-colors hover:text-ocean"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-about-heading">
          <h2 id="footer-about-heading" className="eyebrow">
            About
          </h2>
          <ul className="mt-4 grid gap-3">
            {aboutLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="text-base font-semibold text-ink transition-colors hover:text-ocean"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="shell py-4">
          <p className="text-sm text-muted">
            (c) {currentYear} Wild Washington | Built with Codex | Data from NOAA, WDFW, USFWS,
            CWR
          </p>
        </div>
      </div>
    </footer>
  );
}
