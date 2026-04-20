import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CardContentStack({
  eyebrow,
  title,
  metric,
  description,
  footer,
  className,
  titleClassName,
  descriptionClassName,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  metric?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className={cn("flex h-full min-w-0 flex-col p-5 sm:p-6", className)}>
      {eyebrow ? <div className="shrink-0">{eyebrow}</div> : null}

      <div className={cn("min-h-[3.5rem]", eyebrow ? "mt-4" : undefined)}>
        <div
          className={cn(
            "text-balance line-clamp-2 text-lg font-semibold leading-tight text-ink sm:text-[1.4rem]",
            titleClassName,
          )}
        >
          {title}
        </div>
      </div>

      {metric ? (
        <div className="mt-3 min-h-[3.25rem] text-sm leading-6 text-muted">
          {metric}
        </div>
      ) : null}

      {description ? (
        <div className={cn("mt-4 text-sm leading-6 text-muted", descriptionClassName)}>
          {description}
        </div>
      ) : null}

      {footer ? <div className="mt-auto pt-5">{footer}</div> : null}
    </div>
  );
}
