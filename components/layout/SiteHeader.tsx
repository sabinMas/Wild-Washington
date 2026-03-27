"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/compare", label: "Compare" },
  { href: "/learn", label: "Learn" },
  { href: "/conservation", label: "Conservation" },
  { href: "/methodology", label: "Methodology" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/45 bg-white/80 backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-ocean text-lg font-bold text-white shadow-lg shadow-ocean/20">
            WW
          </div>
          <div>
            <p className="display-type text-lg font-bold text-ocean">Wild Washington</p>
            <p className="text-sm text-muted">Endangered species dashboard</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active ? "bg-ocean text-white" : "text-ink hover:bg-mist hover:text-ocean",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-ocean md:hidden"
        >
          Menu
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="shell grid gap-2 border-t border-border/80 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-semibold",
                  active ? "bg-ocean text-white" : "bg-white text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
