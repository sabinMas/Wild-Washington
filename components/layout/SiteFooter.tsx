import Link from "next/link";

const footerLinks = [
  { href: "/dashboard", label: "Explore species" },
  { href: "/compare", label: "Compare trajectories" },
  { href: "/learn", label: "Teaching pathways" },
  { href: "/conservation", label: "Conservation actions" },
  { href: "/methodology", label: "Methodology and sources" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/8 bg-[linear-gradient(180deg,#17211e_0%,#101715_100%)] py-10 text-sand sm:mt-20 sm:py-12">
      <div className="shell grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="space-y-4">
          <p className="section-kicker border-white/12 bg-white/10 text-sand">
            Wild Washington
          </p>
          <p className="display-type max-w-2xl text-3xl font-semibold leading-tight text-sand sm:text-4xl">
            A field guide for understanding Washington wildlife through evidence, place, and stewardship.
          </p>
          <p className="max-w-2xl text-sm leading-6 text-[rgba(232,222,206,0.76)] sm:text-[0.98rem]">
            Wild Washington is designed for learners, classrooms, educators, and curious public
            users who want a clearer read on species trends, habitat context, conservation work,
            and what the limits of the data actually are.
          </p>
        </div>

        <div className="grid gap-4 text-sm leading-6 text-[rgba(232,222,206,0.74)]">
          <div className="rounded-[1.6rem] border border-white/8 bg-white/5 p-5">
            <p className="eyebrow text-[rgba(232,222,206,0.58)]">Explore next</p>
            <div className="mt-3 grid gap-2">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 font-semibold text-[rgba(232,222,206,0.88)] transition hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-[1.6rem] border border-white/8 bg-white/5 p-5">
            <p className="eyebrow text-[rgba(232,222,206,0.58)]">Trust and build</p>
            <p className="mt-2">
              Source systems in the project draw from NOAA Fisheries, WDFW, US Fish and Wildlife
              Service, and the Center for Whale Research. The app itself is built with Next.js,
              Recharts, Leaflet, and an adapter-based species schema that keeps source caveats visible.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
