import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wild-washington.vercel.app"),
  title: {
    default: "Wild Washington",
    template: "%s | Wild Washington",
  },
  description:
    "A Washington wildlife field guide that helps learners, educators, and curious public users explore endangered species through trustworthy trends, maps, comparison tools, and classroom-ready learning paths.",
  keywords: [
    "Washington wildlife",
    "endangered species",
    "education",
    "classroom resources",
    "conservation data",
    "species comparison",
  ],
  openGraph: {
    title: "Wild Washington",
    description:
      "Explore Washington wildlife through trend stories, comparison tools, classroom-ready lesson paths, and transparent methodology.",
    type: "website",
    siteName: "Wild Washington",
    url: "https://wild-washington.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wild Washington",
    description:
      "A Washington wildlife field guide built for learners, educators, and curious public users who want more than a generic species website.",
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
      className={`${sourceSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ocean focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
