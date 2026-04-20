import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { CardContentStack } from "@/components/ui/CardContentStack";
import { cn } from "@/lib/utils";

export function FeatureLinkCard({
  href,
  title,
  description,
  cta,
  Icon,
  featured = false,
}: {
  href: string;
  title: string;
  description: string;
  cta: string;
  Icon: LucideIcon;
  featured?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group panel-soft block h-full min-w-0 rounded-[var(--radius-xl)] transition hover:shadow-[var(--shadow-md)]",
        featured && "bg-[var(--color-surface)] shadow-[var(--shadow-md)]",
      )}
    >
      <CardContentStack
        eyebrow={
          <div className="panel-soft flex size-11 items-center justify-center rounded-2xl text-ocean sm:size-12">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
          </div>
        }
        title={title}
        description={description}
        footer={
          <span className="text-sm font-semibold text-ocean underline-offset-4 group-hover:underline group-focus-visible:underline">
            {cta}
          </span>
        }
      />
    </Link>
  );
}
