export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/8 bg-[linear-gradient(180deg,#17211e_0%,#101715_100%)] py-10 text-sand sm:mt-20 sm:py-12">
      <div className="shell grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
        <div className="space-y-4">
          <p className="section-kicker border-white/12 bg-white/10 text-sand">
            Wild Washington
          </p>
          <p className="display-type max-w-2xl text-3xl font-semibold leading-tight text-sand sm:text-4xl">
            A calmer, clearer way to understand endangered wildlife in Washington.
          </p>
          <p className="max-w-2xl text-sm leading-6 text-[rgba(232,222,206,0.76)] sm:text-[0.98rem]">
            A classroom-ready species dashboard built to help learners understand
            Washington&apos;s endangered wildlife through data, geography, and conservation stories.
          </p>
        </div>
        <div className="grid gap-4 text-sm leading-6 text-[rgba(232,222,206,0.74)]">
          <div className="rounded-[1.6rem] border border-white/8 bg-white/5 p-5">
            <p className="eyebrow text-[rgba(232,222,206,0.58)]">Built with</p>
            <p className="mt-2">
              Next.js, Recharts, Leaflet, and an adapter-based species schema.
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-white/8 bg-white/5 p-5">
            <p className="eyebrow text-[rgba(232,222,206,0.58)]">Read next</p>
            <p className="mt-2">
              Visit the Methodology page to review source links, assumptions, and data limitations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
