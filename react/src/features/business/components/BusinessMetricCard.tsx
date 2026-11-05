import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string | number;
  detail: ReactNode;
  icon: LucideIcon;
  iconClassName: string;
  valueClassName?: string;
  compactValue?: boolean;
  onClick?: () => void;
  selected?: boolean;
};

export default function BusinessMetricCard({ label, value, detail, icon: Icon, iconClassName, valueClassName = "text-slate-900", compactValue = false, onClick, selected = false }: Props) {
  const className = `group min-w-0 rounded-2xl border bg-white p-3 text-left shadow-sm transition sm:p-5 ${selected ? "border-slate-900 ring-2 ring-brand-primary/40" : "border-slate-200/80"} ${onClick ? "cursor-pointer hover:border-slate-400" : ""}`;
  const content = <>
    <div className="mb-1 flex items-center justify-between gap-1 sm:mb-2">
      <span className="min-w-0 text-xs font-semibold text-slate-600">{label}</span>
      <span className={`hidden size-8 shrink-0 items-center justify-center rounded-xl sm:flex ${iconClassName}`}><Icon size={16} aria-hidden="true" /></span>
    </div>
    <strong className={`block break-words font-bold ${compactValue ? "text-lg sm:text-2xl" : "text-xl sm:text-3xl"} ${valueClassName}`}>{value}</strong>
    <span className="mt-0.5 block break-words text-xs text-slate-500 sm:mt-1">{detail}</span>
  </>;
  return onClick ? <button type="button" onClick={onClick} aria-pressed={selected} className={className}>{content}</button> : <div className={className}>{content}</div>;
}
