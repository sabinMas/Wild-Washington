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
    <div className="panel rounded-[1.75rem] p-5 sm:p-6">
      <div className="panel-soft mb-5 flex size-11 items-center justify-center rounded-2xl text-lg text-ocean sm:size-12 sm:text-xl">
        {icon}
      </div>
      <p className="eyebrow">{label}</p>
      <p className="display-type mt-3 text-4xl font-semibold text-ink sm:text-[2.85rem]">
        {value}
      </p>
      <div className="story-divider mt-4" />
      <p className="mt-4 text-sm leading-6 text-muted">{detail}</p>
    </div>
  );
}
