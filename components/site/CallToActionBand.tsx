import Link from "next/link";
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

export function CallToActionBand({
  kicker,
  title,
  description,
  actions,
}: {
  kicker: string;
  title: string;
  description: string;
  actions: SiteAction[];
}) {
  return (
    <section className="cta-band p-6 sm:p-8">
      <div className="relative z-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker border-white/12 bg-white/10 text-sand">{kicker}</p>
          <h2 className="section-title mt-4 font-semibold text-white">{title}</h2>
          <p className="mt-4 text-sm leading-7 text-[rgba(232,222,206,0.82)] sm:text-base">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
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
      </div>
    </section>
  );
}
