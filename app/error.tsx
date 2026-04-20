"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="shell py-20">
      <div className="panel rounded-[2rem] p-10 text-center">
        <p className="section-kicker">Something went wrong</p>
        <h1 className="display-type mt-5 text-4xl font-semibold text-ocean">
          We hit a problem loading this part of Wild Washington.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
          Try again. If the issue persists, the dataset for this route may be incomplete or
          temporarily unavailable.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => reset()} className="button-primary">
            Retry
          </button>
          <Link href="/explore" className="button-secondary">
            Return to Explore Wildlife
          </Link>
        </div>
      </div>
    </div>
  );
}
