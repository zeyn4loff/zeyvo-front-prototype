import EmptyState from "../../../components/common/EmptyState";
import { useState } from "react";
import { Box, CalendarDays, Check, CircleCheck, ClipboardList, Trash2, TriangleAlert } from "lucide-react";
import type { Inventory, ProductData } from "./products";
import ProductMetricCard from "./ProductMetricCard";
import BusinessStatusBadge from "../components/BusinessStatusBadge";

type Props = { data: ProductData; onCreate: () => void; onDelete: (item: { id: string; name: string }) => void };
type Audit = { id: string; entries: Inventory[]; date: string; warehouseName: string; responsible: string; note: string; hasDifference: boolean; differenceCount: number; differenceValue: number };

const dateText = (date: string) => {
  const [year, month, day] = date.slice(0, 10).split("-");
  return year && month && day ? `${day}.${month}.${year}` : date;
};
const amountText = (amount: number) => `${amount.toFixed(2)} ₼`;

function auditsFrom(data: ProductData): Audit[] {
  const groups = new Map<string, Inventory[]>();
  for (const item of data.inventories) {
    const id = item.documentId ?? item.id;
    groups.set(id, [...(groups.get(id) ?? []), item]);
  }
  return [...groups].map(([id, entries]) => {
    const first = entries[0];
    return { id, entries, date: first.date, warehouseName: first.warehouseName || "—", responsible: first.responsible || "Komissiya", note: first.note || "", hasDifference: entries.some((item) => item.actual !== item.expected), differenceCount: entries.reduce((total, item) => total + item.actual - item.expected, 0), differenceValue: entries.reduce((total, item) => total + (item.actual - item.expected) * (item.unitCost ?? 0), 0) };
  }).sort((a, b) => b.date.localeCompare(a.date));
}

export default function InventorySection({ data, onCreate, onDelete }: Props) {
  const audits = auditsFrom(data);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.max(1, Math.ceil(audits.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const shown = audits.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const latest = audits[0];
  const latestCount = latest?.entries.length ?? 0;
  const matching = latest?.entries.filter((item) => item.actual === item.expected).length ?? 0;
  const accuracy = latestCount ? `${Math.round(matching / latestCount * 100)}%` : "—";
  const discrepancyValue = latest?.differenceValue ?? 0;
  const metrics = [
    { label: "Sonuncu sayım", value: latest ? dateText(latest.date) : "—", detail: "Planlı dövri yoxlama", icon: CalendarDays, iconClassName: "text-purple-600 bg-purple-50" },
    { label: "Yoxlanan çeşid", value: latestCount, detail: "Son sayımda yoxlanılan məhsullar", icon: Box, iconClassName: "text-blue-600 bg-blue-50" },
    { label: "Uyğunluq faizi", value: accuracy, detail: "Faktiki və sistem nisbəti", icon: CircleCheck, iconClassName: "text-emerald-600 bg-emerald-50" },
    { label: "Kənarlaşma", value: amountText(discrepancyValue), detail: latest?.hasDifference ? `${latest.differenceCount} ədəd fərq` : "Son sayımda fərq yoxdur", icon: TriangleAlert, iconClassName: "text-amber-600 bg-amber-50" },
  ];
  return <div className="space-y-5">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{metrics.map((metric) => <ProductMetricCard key={metric.label} {...metric} />)}</div>
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{audits.length ? <>
      <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-xs"><thead className="border-b border-slate-100 bg-slate-50 text-slate-600"><tr><th className="px-4 py-3">Sənəd № və tarix</th><th className="px-3 py-3">Anbar</th><th className="px-3 py-3">Məsul şəxs</th><th className="px-3 py-3 text-center">Yoxlanılan çeşid</th><th className="px-3 py-3">Nəticə</th><th className="px-3 py-3 text-center">Status</th><th className="px-4 py-3 text-right">Fəaliyyət</th></tr></thead><tbody className="divide-y divide-slate-100">{shown.map((audit) => { const number = data.inventories.find((entry) => (entry.documentId ?? entry.id) === audit.id)?.documentNumber ?? `INV-${new Date(audit.date).getFullYear()}-${String(audits.length - audits.indexOf(audit)).padStart(3, "0")}`; return <tr key={audit.id} className="hover:bg-slate-50/60"><td className="px-4 py-3.5"><strong className="text-slate-900">{number}</strong><span className="mt-0.5 block text-[11px] text-slate-400">{dateText(audit.date)}</span></td><td className="px-3 py-3.5 font-medium">{audit.warehouseName}</td><td className="px-3 py-3.5 text-slate-600">{audit.responsible}</td><td className="px-3 py-3.5 text-center font-bold">{audit.entries.length} növ</td><td className="px-3 py-3.5">{audit.hasDifference ? <span className="font-bold text-rose-600">{audit.differenceCount > 0 ? "+" : ""}{audit.differenceCount} ədəd ({amountText(audit.differenceValue)})</span> : <span className="inline-flex items-center gap-1 font-semibold text-emerald-700"><Check size={14} />Kənarlaşma yoxdur (100%)</span>}</td><td className="px-3 py-3.5 text-center"><BusinessStatusBadge tone="success">Tamamlandı</BusinessStatusBadge></td><td className="px-4 py-3.5 text-right"><button type="button" aria-label={`${number} aktını sil`} onClick={() => onDelete({ id: audit.id, name: number })} className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button></td></tr>; })}</tbody></table></div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 p-4 text-xs text-slate-500"><div className="flex flex-wrap items-center gap-2">Cəmi <strong className="text-slate-900">{audits.length}</strong> sayım aktından <strong className="text-slate-900">{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, audits.length)}</strong> göstərilir <label className="ml-2">Səhifədə: <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="ml-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1"><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option></select></label></div><div className="flex items-center gap-1"><button type="button" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)} className="cursor-pointer rounded-lg border border-slate-200 px-2 py-1 disabled:opacity-40">‹ Əvvəlki</button><span className="rounded-lg bg-brand-primary px-3 py-1 font-bold text-slate-900">{currentPage}</span><button type="button" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)} className="cursor-pointer rounded-lg border border-slate-200 px-2 py-1 disabled:opacity-40">Növbəti ›</button></div></div>
    </> : <EmptyState title="İnventarizasiya aktı tapılmadı" description="Anbarda faktiki qalıqları yoxlamaq üçün yeni inventarizasiya başladın" icon={ClipboardList} actionLabel="Yeni inventarizasiya apar" onAction={onCreate} className="border-0 shadow-none" />}</div>
  </div>;
}
