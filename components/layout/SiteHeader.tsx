"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/explore", label: "Wildlife" },
  { href: "/compare", label: "Compare" },
  { href: "/conservation", label: "Conservation" },
  { href: "/learn", label: "Learn" },
];

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
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

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      const current = document.documentElement.dataset.theme;

      if (current === "dark" || current === "light") {
        return current;
      }
    }

    return "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("wild-washington-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const navElement = mobileNavRef.current;
    const menuButton = menuButtonRef.current;

    if (!navElement) {
      return;
    }

    const nav = navElement;

    const selectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function getFocusableElements() {
      return Array.from(nav.querySelectorAll<HTMLElement>(selectors)).filter(
        (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
      );
    }

    const focusFirstItem = window.setTimeout(() => {
      getFocusableElements()[0]?.focus();
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements();
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === first || !nav.contains(document.activeElement)) {
          event.preventDefault();
          last.focus();
        }

        return;
      }

      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusFirstItem);
      document.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [open]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function toggleTheme() {
    setTheme((value) => (value === "light" ? "dark" : "light"));
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-[var(--color-surface)] backdrop-blur"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="shell flex min-h-[4.75rem] items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center justify-start">
          <Link href="/" className="flex min-w-0 items-center gap-3 overflow-hidden">
            <LogoMark className="h-10 w-10 text-ocean" />
            <div className="min-w-0 overflow-hidden">
              <p className="display-type truncate text-[1.6rem] font-bold text-ink">
                Wild Washington
              </p>
            </div>
          </Link>
        </div>

        <nav
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "text-base font-semibold text-muted transition-colors hover:text-ink",
                isActive(item.href) && "text-ocean",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-[var(--color-surface-2)] text-ink"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-[var(--color-surface-2)] text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-x-0 top-[4.75rem] h-[calc(100dvh-4.75rem)] bg-black/30"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav"
            ref={mobileNavRef}
            className="fixed inset-x-0 top-[4.75rem] h-[calc(100dvh-4.75rem)] overflow-y-auto overscroll-contain bg-[var(--color-surface)] px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex min-h-full max-w-sm flex-col">
              <div className="grid gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-[var(--radius-lg)] border border-border px-5 py-4 text-lg font-semibold text-ink",
                      isActive(item.href) && "border-ocean text-ocean",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
