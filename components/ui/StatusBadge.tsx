import { cn } from "@/lib/utils";
import { type TrendDirection } from "@/types/species";

const labelMap: Record<TrendDirection, string> = {
  improving: "Improving",
  declining: "Declining",
  stable: "Stable",
};

const toneMap: Record<TrendDirection, string> = {
  improving: "bg-success/12 text-success border-success/20",
  declining: "bg-danger/12 text-danger border-danger/20",
  stable: "bg-warning/12 text-warning border-warning/20",
};

export function StatusBadge({ trend }: { trend: TrendDirection }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]",
        toneMap[trend],
      )}
    >
      {labelMap[trend]}
    </span>
  );
}
