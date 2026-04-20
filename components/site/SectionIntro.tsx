import { cn } from "@/lib/utils";

export function SectionIntro({
  kicker,
  title,
  description,
  align = "split",
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "split" | "stack";
}) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-3",
        align === "split" && "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className="max-w-2xl">
        <span className="section-kicker" aria-hidden="true">
          {kicker}
        </span>
        <h2 className="section-title mt-3 font-semibold text-ocean">{title}</h2>
      </div>
      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-muted sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
