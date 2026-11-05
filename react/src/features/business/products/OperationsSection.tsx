import { useState } from "react";
import { ClipboardList, Search, Trash2, X } from "lucide-react";
import EmptyState from "../../../components/common/EmptyState";
import BusinessStatusBadge from "../components/BusinessStatusBadge";
import BusinessFilterButton from "../components/BusinessFilterButton";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { businessControlClass, businessLabelClass } from "../components/BusinessField";
import type { ProductData, StockOperation } from "./products";

type OperationType = "all" | StockOperation["type"];
type Period = "all" | "today" | "week" | "month";
type Filters = { type: OperationType; warehouse: string; period: Period };
type Document = { id: string; number: string; lines: StockOperation[]; first: StockOperation; amount: number };
type Props = { data: ProductData; onCreate: () => void; onDelete: (item: { id: string; name: string }) => void };
const emptyFilters: Filters = { type: "all", warehouse: "all", period: "all" };
const typeNames: Record<StockOperation["type"], string> = { receipt: "Mədaxil", writeoff: "Məxaric", transfer: "Yerdəyişmə", adjustment: "İnventarizasiya" };
const typeColors: Record<StockOperation["type"], string> = {
  receipt: "border-emerald-200 bg-emerald-50 text-emerald-800",
  writeoff: "border-rose-200 bg-rose-50 text-rose-800",
  transfer: "border-blue-200 bg-blue-50 text-blue-800",
  adjustment: "border-purple-200 bg-purple-50 text-purple-800",
};
const prefixes: Record<StockOperation["type"], string> = { receipt: "MED", writeoff: "MEX", transfer: "YER", adjustment: "INV" };
const formatDate = (value: string) => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[3]}.${match[2]}.${match[1]}` : value;
};

function documentsFrom(data: ProductData): Document[] {
  const groups = new Map<string, StockOperation[]>();
  for (const item of data.operations) {
    const id = item.documentId ?? item.id;
    groups.set(id, [...(groups.get(id) ?? []), item]);
  }
  const ordered = [...groups].sort((a, b) => b[1][0].date.localeCompare(a[1][0].date));
  return ordered.map(([id, lines], index) => {
    const first = lines[0];
    const year = first.date.slice(0, 4);
    const number = first.documentNumber ?? first.note.match(/Kassa satışı (SAT-[A-Z0-9]+)/)?.[1] ?? `${prefixes[first.type]}-${year}-${String(ordered.length - index).padStart(3, "0")}`;
    const amount = lines.reduce((total, line) => total + Math.abs(line.difference) * (line.unitCost ?? data.products.find((product) => product.id === line.productId)?.cost ?? 0), 0);
    return { id, number, lines, first, amount };
  });
}

function matchesPeriod(date: string, period: Period) {
  if (period === "all") return true;
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return false;
  const now = new Date();
  if (period === "today") return value.toDateString() === now.toDateString();
  if (period === "month") return value.getMonth() === now.getMonth() && value.getFullYear() === now.getFullYear();
  const days = (now.getTime() - value.getTime()) / 86400000;
  return days >= 0 && days <= 7;
}

function DeleteButton({ document, onDelete }: { document: Document; onDelete: Props["onDelete"] }) {
  return <button type="button" title="Sənədi sil" aria-label={`${document.number} sənədini sil`} onClick={() => onDelete({ id: document.id, name: document.number })} className="inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"><Trash2 size={17} /></button>;
}

function OperationsFilterDialog({ data, value, onApply, onClose }: { data: ProductData; value: Filters; onApply: (filters: Filters) => void; onClose: () => void }) {
  const [draft, setDraft] = useState(value);
  return <BusinessFormDialog title="Anbar əməliyyatlarını filtrlə" onClose={onClose} size="medium">
    <div className="space-y-4">
      <label className={businessLabelClass}>Əməliyyat növü<select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as OperationType })} className={businessControlClass}><option value="all">Bütün əməliyyatlar</option>{Object.entries(typeNames).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>
      <label className={businessLabelClass}>Anbar<select value={draft.warehouse} onChange={(event) => setDraft({ ...draft, warehouse: event.target.value })} className={businessControlClass}><option value="all">Bütün anbarlar</option>{data.warehouses.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label>
      <label className={businessLabelClass}>Tarix<select value={draft.period} onChange={(event) => setDraft({ ...draft, period: event.target.value as Period })} className={businessControlClass}><option value="all">Bütün tarixlər</option><option value="today">Bu gün</option><option value="week">Son 7 gün</option><option value="month">Bu ay</option></select></label>
      <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => { setDraft(emptyFilters); onApply(emptyFilters); }} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 text-sm font-bold">Filtrləri sıfırla</button><button type="button" onClick={() => onApply(draft)} className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 text-sm font-bold">Nəticələri göstər</button></div>
    </div>
  </BusinessFormDialog>;
}

export default function OperationsSection({ data, onCreate, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const documents = documentsFrom(data);
  const query = search.trim().toLocaleLowerCase("az-AZ");
  const filtered = documents.filter(({ first, number, lines }) => {
    if (filters.type !== "all" && first.type !== filters.type) return false;
    if (filters.warehouse !== "all" && first.warehouseName !== filters.warehouse && first.destinationWarehouseName !== filters.warehouse) return false;
    if (!matchesPeriod(first.date, filters.period)) return false;
    return !query || [number, first.warehouseName, first.destinationWarehouseName, first.supplierName, first.note, ...lines.map((line) => line.productName)].some((part) => part?.toLocaleLowerCase("az-AZ").includes(query));
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const shown = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const activeCount = Number(filters.type !== "all") + Number(filters.warehouse !== "all") + Number(filters.period !== "all");
  const reset = () => { setSearch(""); setFilters(emptyFilters); setPage(1); };
  const dateAndWarehouse = (document: Document) => `${document.first.warehouseName || "Əsas anbar"}${document.first.destinationWarehouseName ? ` → ${document.first.destinationWarehouseName}` : ""}`;
  return <div className="space-y-4">
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4"><div className="flex min-w-0 flex-col gap-2.5 sm:flex-row">
      <label className="relative min-w-0 flex-1"><Search aria-hidden="true" size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><span className="sr-only">Sənəd, anbar və ya məhsul axtar</span><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Sənəd №, anbar və ya məhsul axtarışı..." className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-xs font-medium outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10" />{search && <button type="button" aria-label="Axtarışı təmizlə" onClick={() => { setSearch(""); setPage(1); }} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center text-slate-400"><X size={16} /></button>}</label>
      <BusinessFilterButton count={activeCount} onClick={() => setFilterOpen(true)} />
    </div>{activeCount > 0 && <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-600"><span>Aktiv filtrlər:</span>{filters.type !== "all" && <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1">{typeNames[filters.type]}</span>}{filters.warehouse !== "all" && <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1">{filters.warehouse}</span>}{filters.period !== "all" && <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1">{({ today: "Bu gün", week: "Son 7 gün", month: "Bu ay" } as const)[filters.period]}</span>}<button type="button" onClick={reset} className="cursor-pointer font-semibold text-rose-600">Filtrləri sıfırla</button></div>}</div>
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{shown.length ? <>
      <div className="divide-y divide-slate-100 md:hidden">{shown.map((document) => <article key={document.id} className="p-4"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><strong className="block text-sm text-slate-900">{document.number}</strong><span className="text-xs text-slate-400">{formatDate(document.first.date)}</span></div><DeleteButton document={document} onDelete={onDelete} /></div><div className="mt-2 flex flex-wrap items-center gap-2"><span className={`rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold ${typeColors[document.first.type]}`}>{typeNames[document.first.type]}</span><BusinessStatusBadge tone="success">Tamamlandı</BusinessStatusBadge></div><p className="mt-2 break-words text-xs font-medium text-slate-700">{dateAndWarehouse(document)}</p><p className="mt-0.5 break-words text-xs text-slate-400">{document.first.supplierName || document.first.note || "Qeyd yoxdur"}</p><div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs"><span>{document.lines.length} növ</span><strong>{document.amount.toFixed(2)} ₼</strong></div></article>)}</div>
      <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[820px] text-left text-xs"><thead className="border-b border-slate-100 bg-slate-50/80 text-slate-600"><tr><th className="px-4 py-3 sm:px-5">Sənəd № və tarix</th><th className="px-3 py-3">Əməliyyat növü</th><th className="px-3 py-3">Anbar / Kontragent</th><th className="px-3 py-3 text-center">Məhsul sayı</th><th className="px-3 py-3 text-right">Məbləğ</th><th className="px-3 py-3 text-center">Status</th><th className="px-4 py-3 text-right sm:px-5">Fəaliyyət</th></tr></thead><tbody className="divide-y divide-slate-100 text-slate-800">{shown.map((document) => <tr key={document.id} className="transition hover:bg-slate-50/60"><td className="px-4 py-3.5 sm:px-5"><strong className="text-slate-900">{document.number}</strong><span className="mt-0.5 block text-[11px] text-slate-400">{formatDate(document.first.date)}</span></td><td className="px-3 py-3.5"><span className={`inline-flex rounded-lg border px-2.5 py-0.5 text-[10px] font-semibold ${typeColors[document.first.type]}`}>{typeNames[document.first.type]}</span></td><td className="max-w-52 px-3 py-3.5"><div className="truncate font-medium text-slate-900">{dateAndWarehouse(document)}</div><div className="mt-0.5 truncate text-[11px] text-slate-400">{document.first.supplierName || document.first.note || "Qeyd yoxdur"}</div></td><td className="px-3 py-3.5 text-center font-medium">{document.lines.length} növ</td><td className="px-3 py-3.5 text-right font-bold text-slate-900">{document.amount.toFixed(2)} ₼</td><td className="px-3 py-3.5 text-center"><BusinessStatusBadge tone="success">Tamamlandı</BusinessStatusBadge></td><td className="px-4 py-3.5 text-right sm:px-5"><DeleteButton document={document} onDelete={onDelete} /></td></tr>)}</tbody></table></div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 p-4 text-xs text-slate-500"><div className="flex flex-wrap items-center gap-2">Cəmi <strong className="text-slate-900">{filtered.length}</strong> əməliyyatdan <strong className="text-slate-900">{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)}</strong> göstərilir <label className="ml-1">Səhifədə: <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="ml-1 cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-2 py-1"><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option></select></label></div><div className="flex items-center gap-1"><button type="button" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)} className="min-h-8 cursor-pointer rounded-lg border border-slate-200 px-2 disabled:cursor-not-allowed disabled:opacity-40">‹ Əvvəlki</button><span className="flex min-h-8 min-w-8 items-center justify-center rounded-lg bg-brand-primary px-2 font-bold text-slate-900">{currentPage}</span><button type="button" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)} className="min-h-8 cursor-pointer rounded-lg border border-slate-200 px-2 disabled:cursor-not-allowed disabled:opacity-40">Növbəti ›</button></div></div>
    </> : <EmptyState title="Sənəd tapılmadı" description={documents.length ? "Bu filtr meyarlarına uyğun anbar əməliyyatı tapılmadı" : "Anbar hərəkətlərini qeyd etmək üçün yeni əməliyyat yaradın"} icon={ClipboardList} action={documents.length ? <button type="button" onClick={reset} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 text-sm font-bold">Filtrləri sıfırla</button> : undefined} actionLabel={documents.length ? undefined : "Yeni əməliyyat yarat"} onAction={onCreate} className="border-0 shadow-none" />}</div>
    {filterOpen && <OperationsFilterDialog data={data} value={filters} onClose={() => setFilterOpen(false)} onApply={(next) => { setFilters(next); setPage(1); setFilterOpen(false); }} />}
  </div>;
}
