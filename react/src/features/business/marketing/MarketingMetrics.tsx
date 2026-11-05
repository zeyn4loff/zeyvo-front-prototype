import type { LucideIcon } from "lucide-react";

export type MarketingMetric = { title: string; value: string | number; unit: string; detail: string; icon: LucideIcon; tone: "purple" | "blue" | "emerald" | "amber" | "slate"; valueClassName?: string };
const tones = {
  purple: "bg-purple-50 text-purple-700",
  blue: "bg-blue-50 text-blue-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  slate: "bg-slate-100 text-slate-700",
};
export default function MarketingMetrics({ items }: { items: MarketingMetric[] }) {
  return <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">{items.map(({ title, value, unit, detail, icon: Icon, tone, valueClassName }) => <article key={title} className="space-y-2 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5"><div className="flex items-start justify-between gap-2"><p className="text-xs font-semibold text-slate-500">{title}</p><span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}><Icon size={16} /></span></div><div><strong className={`font-mono text-xl font-bold sm:text-2xl ${valueClassName ?? "text-slate-900"}`}>{value}</strong><span className="ml-2 text-xs font-semibold text-slate-500">{unit}</span><p className="mt-0.5 text-[11px] font-normal text-slate-400">{detail}</p></div></article>)}</div>;
}
