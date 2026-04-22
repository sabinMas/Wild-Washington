import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const themeScript = `
  (() => {
    try {
      const stored = localStorage.getItem("wild-washington-theme");
      const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.theme = stored || system;
    } catch {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://wild-washington.vercel.app"),
  title: {
    default: "Wild Washington",
    template: "%s | Wild Washington",
  },
  description:
    "Explore Washington wildlife through species stories, comparison tools, conservation context, and exhibit-ready learning paths built with Codex.",
  openGraph: {
    title: "Wild Washington",
    description:
      "A Codex-built Washington wildlife explorer for educators, learners, and curious public visitors.",
    type: "website",
    siteName: "Wild Washington",
    url: "https://wild-washington.vercel.app",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Wild Washington social card showing wildlife, maps, and comparison storytelling.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wild Washington",
    description:
      "Meet Washington wildlife through real species stories, data, and conservation context.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full`}
      data-theme="light"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-surface)] focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
