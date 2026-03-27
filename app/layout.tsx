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
    "An educational endangered species dashboard for Washington State with population trends, maps, learning modules, and conservation actions.",
  openGraph: {
    title: "Wild Washington",
    description:
      "Explore endangered species across Washington State through population data, classroom-ready learning tools, and conservation pathways.",
    type: "website",
    siteName: "Wild Washington",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wild Washington",
    description:
      "Washington State endangered species dashboard built for learners, educators, and conservation-minded communities.",
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
