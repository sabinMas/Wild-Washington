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
    <header className="sticky top-0 z-40 border-b border-white/45 bg-white/78 backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-3 py-3 sm:gap-4 sm:py-4">
        <Link href="/" className="min-w-0 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-ocean text-base font-bold text-white shadow-lg shadow-ocean/20 sm:size-11 sm:text-lg">
            WW
          </div>
          <div className="min-w-0">
            <p className="display-type truncate text-base font-bold text-ocean sm:text-lg">Wild Washington</p>
            <p className="truncate text-xs text-muted sm:text-sm">Endangered species dashboard</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-ocean text-white shadow-lg shadow-ocean/15"
                    : "text-ink hover:bg-white hover:text-ocean",
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
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white/88 px-3 py-2 text-sm font-semibold text-ocean shadow-sm lg:hidden"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="grid gap-[3px]" aria-hidden="true">
            <span className={cn("block h-0.5 w-4 rounded-full bg-ocean transition", open && "translate-y-[5px] rotate-45")} />
            <span className={cn("block h-0.5 w-4 rounded-full bg-ocean transition", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-4 rounded-full bg-ocean transition", open && "-translate-y-[5px] -rotate-45")} />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-border/80 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="shell py-4">
            <div className="grid gap-2 rounded-[1.5rem] bg-white/90 p-2 shadow-lg shadow-ocean/5">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-semibold",
                      active ? "bg-ocean text-white" : "bg-sand/80 text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
