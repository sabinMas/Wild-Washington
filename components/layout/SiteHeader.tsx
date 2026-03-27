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
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(16,23,21,0.82)] text-sand backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-3 py-3 sm:gap-5 sm:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/10 text-base font-bold text-white shadow-[0_16px_32px_rgba(0,0,0,0.18)] sm:size-11 sm:text-lg">
            WW
          </div>
          <div className="min-w-0">
            <p className="display-type truncate text-base font-semibold text-sand sm:text-lg">
              Wild Washington
            </p>
            <p className="truncate text-xs text-[rgba(232,222,206,0.7)] sm:text-sm">
              Endangered species dashboard
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/10 p-1 lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-ocean text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
                    : "text-[rgba(232,222,206,0.78)] hover:bg-white/10 hover:text-white",
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
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-2 text-sm font-semibold text-sand shadow-sm lg:hidden"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="grid gap-[3px]" aria-hidden="true">
            <span
              className={cn(
                "block h-0.5 w-4 rounded-full bg-sand transition",
                open && "translate-y-[5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-4 rounded-full bg-sand transition",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-4 rounded-full bg-sand transition",
                open && "-translate-y-[5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-white/8 lg:hidden" aria-label="Mobile navigation">
          <div className="shell py-4">
            <div className="grid gap-2 rounded-[1.75rem] border border-white/10 bg-[rgba(21,32,29,0.96)] p-2 shadow-[0_22px_54px_rgba(0,0,0,0.24)]">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-semibold",
                      active ? "bg-ocean text-white" : "bg-white/5 text-[rgba(232,222,206,0.84)]",
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
