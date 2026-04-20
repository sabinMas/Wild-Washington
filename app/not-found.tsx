import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-20">
      <div className="panel rounded-[2rem] p-10 text-center">
        <p className="section-kicker">Not found</p>
        <h1 className="display-type mt-5 text-4xl font-semibold text-ocean">
          We could not find that Wild Washington page.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
          The link may be outdated, or the species slug may not match the current dataset. Try the
          wildlife guide, comparison view, or learning hub instead.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/explore" className="button-primary inline-flex">
            Return to Explore Wildlife
          </Link>
          <Link href="/compare" className="button-secondary inline-flex">
            Open comparison view
          </Link>
        </div>
      </div>
    </div>
  );
}
