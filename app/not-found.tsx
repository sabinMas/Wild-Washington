import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-20">
      <div className="panel rounded-[2rem] p-10 text-center">
        <p className="section-kicker">Not found</p>
        <h1 className="display-type mt-5 text-4xl font-bold text-ocean">That species profile could not be found.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
          The link may be outdated, or the species slug may not match the current dataset.
        </p>
        <Link href="/dashboard" className="mt-8 inline-flex rounded-full bg-ocean px-6 py-3 font-semibold text-white">
          Return to the dashboard
        </Link>
      </div>
    </div>
  );
}
