import Link from "next/link";
import { cn } from "@/lib/utils";
import { type SiteAction } from "@/types/site";

function actionClass(variant: SiteAction["variant"]) {
  if (variant === "ghost") {
    return "button-ghost";
  }

  if (variant === "primary") {
    return "button-primary";
  }

  return "button-secondary";
}

export function PageHero({
  kicker,
  title,
  description,
  tags,
  actions,
  aside,
  centered = false,
}: {
  kicker: string;
  title: string;
  description: string;
  tags?: string[];
  actions?: SiteAction[];
  aside?: {
    kicker: string;
    title: string;
    description: string;
  };
  centered?: boolean;
}) {
  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] xl:items-end">
      <div className={cn("max-w-3xl", centered && "xl:max-w-4xl")}>
        <span className="section-kicker" aria-hidden="true">
          {kicker}
        </span>
        {tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="info-pill">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <h1 className="hero-title mt-4 font-semibold text-ocean">{title}</h1>
        <p className="lede mt-5">{description}</p>
        {actions?.length ? (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {actions.map((action) => (
              <Link
                key={`${action.href}-${action.label}`}
                href={action.href}
                className={actionClass(action.variant)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {aside ? (
        <aside className="story-card p-5">
          <span className="eyebrow" aria-hidden="true">
            {aside.kicker}
          </span>
          <h2 className="supporting-title mt-3 font-semibold text-ocean">{aside.title}</h2>
          <p className="mt-3 text-sm leading-6 text-muted">{aside.description}</p>
        </aside>
      ) : null}
    </section>
  );
}
