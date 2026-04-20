import Link from "next/link";

export function ContentCard({
  kicker,
  title,
  description,
  href,
  cta,
  muted = false,
}: {
  kicker?: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
  muted?: boolean;
}) {
  const className = muted ? "panel-soft rounded-[1.5rem] p-5" : "story-card p-5";

  if (href) {
    return (
      <Link href={href} className={className}>
        {kicker ? (
          <span className="eyebrow" aria-hidden="true">
            {kicker}
          </span>
        ) : null}
        <h3 className="supporting-title mt-3 font-semibold text-ocean">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
        {cta ? <p className="mt-4 text-sm font-semibold text-ocean">{cta}</p> : null}
      </Link>
    );
  }

  return (
    <article className={className}>
      {kicker ? (
        <span className="eyebrow" aria-hidden="true">
          {kicker}
        </span>
      ) : null}
      <h3 className="supporting-title mt-3 font-semibold text-ocean">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}
