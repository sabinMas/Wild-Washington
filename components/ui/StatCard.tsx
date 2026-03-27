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
    <div className="panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
      <div className="panel-soft mb-4 flex size-11 items-center justify-center rounded-2xl text-lg text-ocean sm:size-12 sm:text-xl">
        {icon}
      </div>
      <p className="eyebrow">{label}</p>
      <p className="display-type mt-3 text-3xl font-bold text-ocean sm:text-4xl">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted">{detail}</p>
    </div>
  );
}
