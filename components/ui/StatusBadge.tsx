import { cn } from "@/lib/utils";
import { type TrendDirection } from "@/types/species";

const labelMap: Record<TrendDirection, string> = {
  improving: "Improving",
  declining: "Declining",
  stable: "Stable",
};

const toneMap: Record<TrendDirection, string> = {
  improving: "bg-success/14 text-success border-success/22",
  declining: "bg-danger/14 text-danger border-danger/22",
  stable: "bg-warning/14 text-warning border-warning/22",
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
