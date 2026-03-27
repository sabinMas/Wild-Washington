"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="shell py-20">
      <div className="panel rounded-[2rem] p-10 text-center">
        <p className="section-kicker">Something went wrong</p>
        <h1 className="display-type mt-5 text-4xl font-bold text-ocean">We hit a problem loading this part of the dashboard.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
          Try again. If the issue persists, the dataset for this route may be incomplete or temporarily unavailable.
        </p>
        <button type="button" onClick={() => reset()} className="mt-8 rounded-full bg-ocean px-6 py-3 font-semibold text-white">
          Retry
        </button>
      </div>
    </div>
  );
}
