import { type ReactNode } from "react";

export function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <div className="panel rounded-[1.75rem] p-6">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-mist text-xl text-ocean">
        {icon}
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="display-type mt-3 text-4xl font-bold text-ocean">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted">{detail}</p>
    </div>
  );
}
