import type { LucideIcon } from "lucide-react";

type Item = { title: string; value: string; detail: string; icon: LucideIcon; tone: string; active: boolean; onClick: () => void };

export default function ClientSummaryCards({ items }: { items: Item[] }) {
  return <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">{items.map(({ title, value, detail, icon: Icon, tone, active, onClick }) => <button key={title} type="button" onClick={onClick} aria-pressed={active} className={`min-w-0 cursor-pointer rounded-2xl border bg-white p-3 text-left shadow-sm transition hover:border-slate-300 sm:p-5 ${active ? "border-brand-primary ring-2 ring-brand-primary/20" : "border-slate-200"}`}><div className="flex min-w-0 items-start justify-between gap-1"><span className="min-w-0 text-xs font-semibold text-slate-600">{title}</span><span className={`hidden size-8 shrink-0 items-center justify-center rounded-xl sm:flex ${tone}`}><Icon size={16} /></span></div><strong className="mt-1 block break-words text-lg font-bold text-slate-900 sm:mt-2 sm:text-2xl">{value}</strong><span className="mt-0.5 block text-xs text-slate-500 sm:mt-2">{detail}</span></button>)}</div>;
}
