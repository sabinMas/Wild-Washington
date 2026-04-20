import { cn } from "@/lib/utils";
import { type TrendDirection } from "@/types/species";

const labelMap: Record<TrendDirection, string> = {
  improving: "Improving",
  declining: "Declining",
  stable: "Stable",
};

const toneMap: Record<TrendDirection, string> = {
  improving: "border-transparent bg-success text-white",
  declining: "border-transparent bg-danger text-white",
  stable: "border-transparent bg-warning text-[var(--color-text)]",
};

export function StatusBadge({ trend }: { trend: TrendDirection }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]",
        toneMap[trend],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {labelMap[trend]}
    </span>
  );
}
