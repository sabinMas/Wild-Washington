export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/80 bg-white/70 py-10">
      <div className="shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="display-type text-xl font-bold text-ocean">Wild Washington</p>
          <p className="text-sm leading-6 text-muted">
            A classroom-ready species dashboard built to help learners understand
            Washington&apos;s endangered wildlife through data, geography, and conservation stories.
          </p>
        </div>
        <div className="text-sm text-muted">
          <p>Built with Next.js, Recharts, Leaflet, and an adapter-based species schema.</p>
          <p>Visit the Methodology page to review source links, assumptions, and data limitations.</p>
        </div>
      </div>
    </footer>
  );
}
