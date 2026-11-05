import { Search } from "lucide-react";
import { useState } from "react";
import BusinessFilterButton from "../components/BusinessFilterButton";
import BusinessFormDialog from "../components/BusinessFormDialog";

import type { LoyaltyTab } from "./loyalty";

export type FilterKey = "status" | "type" | "sale" | "online" | "target";
export type FilterValues = Record<FilterKey, string>;
const defaults: FilterValues = { status: "all", type: "all", sale: "all", online: "all", target: "all" };
export default function LoyaltyFilters({ tab, query, onQuery, filters, onFilter, onApply, open, onOpen, onReset }: { tab: LoyaltyTab; query: string; onQuery: (value: string) => void; filters: FilterValues; onFilter: (key: FilterKey, value: string) => void; onApply: (values: FilterValues) => void; open: boolean; onOpen: (open: boolean) => void; onReset: () => void }) {
  const active = (Object.keys(defaults) as FilterKey[]).filter((key) => filters[key] !== "all");
  const placeholder = tab === "cards_cashback" ? "Kart və ya qayda adı ilə axtarın..." : tab === "gift_cards" ? "Hədiyyə kartı axtarın..." : "Abunəlik adı ilə axtarın...";
  const options: { key: FilterKey; label: string; values: [string, string][] }[] = [
    ...(tab === "cards_cashback" ? [{ key: "type" as const, label: "Proqram tipi", values: [["all", "Bütün tiplər"], ["discount", "Endirim"], ["cashback", "Keşbek"]] as [string, string][] }, { key: "target" as const, label: "Kimlərə tətbiq olunur", values: [["all", "Hamısı"], ["all_clients", "Bütün müştərilər"], ["new", "Yalnız yeni müştərilər"]] as [string, string][] }] : []),
    ...(tab === "gift_cards" ? [{ key: "type" as const, label: "Kart tipi", values: [["all", "Bütün tiplər"], ["general", "Ümumi kart"], ["service", "Xüsusi xidmət"]] as [string, string][] }] : []),
    ...(tab !== "cards_cashback" ? [{ key: "sale" as const, label: "Satış vəziyyəti", values: [["all", "Hamısı"], ["available", "Satışda aktiv"], ["unavailable", "Satışda deyil"]] as [string, string][] }] : []),
    ...(tab === "subscriptions" ? [{ key: "online" as const, label: "Onlayn sifariş", values: [["all", "Hamısı"], ["online", "Onlayn"], ["offline", "Yalnız daxili"]] as [string, string][] }] : []),
    { key: "status", label: "Status", values: [["all", "Bütün statuslar"], ["active", "Aktiv"], ["inactive", "Qeyri-aktiv"]] },
  ];
  return <div className="space-y-3"><div className="flex min-w-0 gap-2"><label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 shadow-sm"><Search size={16} className="shrink-0 text-slate-400" /><input aria-label="Loyallıq axtarışı" value={query} onChange={(e) => onQuery(e.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none placeholder:text-slate-400" />{query && <button type="button" onClick={() => onQuery("")} aria-label="Axtarışı təmizlə" className="cursor-pointer text-slate-400">×</button>}</label><BusinessFilterButton onClick={() => onOpen(true)} count={active.length} /></div>
    {(active.length > 0 || query) && <div className="flex flex-wrap items-center gap-2 text-[11px]"><span className="text-slate-400">Aktiv:</span>{options.filter((option) => active.includes(option.key)).map((option) => <button key={option.key} type="button" onClick={() => onFilter(option.key, "all")} className="cursor-pointer rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1 font-semibold text-amber-900">{option.label}: {option.values.find(([id]) => id === filters[option.key])?.[1]} ×</button>)}{query && <button type="button" onClick={() => onQuery("")} className="cursor-pointer rounded-xl bg-slate-100 px-2.5 py-1 font-semibold">Axtarış: “{query}” ×</button>}<button type="button" onClick={onReset} className="cursor-pointer font-semibold text-rose-600 underline">Hamısını sıfırla</button></div>}
    {open && <FilterDialog options={options} initial={filters} onApply={(values) => { onApply(values); onOpen(false); }} onClose={() => onOpen(false)} />}
  </div>;
}

function FilterDialog({ options, initial, onApply, onClose }: { options: { key: FilterKey; label: string; values: [string, string][] }[]; initial: FilterValues; onApply: (values: FilterValues) => void; onClose: () => void }) {
  const [draft, setDraft] = useState<FilterValues>({ ...initial });
  return <BusinessFormDialog title="Filtrlər" size="medium" onClose={onClose}><div className="space-y-4">{options.map((option) => <fieldset key={option.key}><legend className="mb-1.5 text-xs font-bold text-slate-700">{option.label}</legend><div className="grid grid-cols-3 gap-2">{option.values.map(([value, title]) => <button key={value} type="button" aria-pressed={draft[option.key] === value} onClick={() => setDraft((current) => ({ ...current, [option.key]: value }))} className={`min-h-11 cursor-pointer rounded-xl border p-2 text-center text-xs font-semibold transition ${draft[option.key] === value ? "border-slate-900 bg-white text-slate-900 shadow-sm" : "border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100"}`}>{title}</button>)}</div></fieldset>)}<div className="flex gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={() => setDraft({ ...defaults })} className="min-h-10 flex-1 cursor-pointer rounded-xl bg-slate-100 px-3 text-xs font-bold">Sıfırla</button><button type="button" onClick={() => onApply(draft)} className="min-h-10 flex-1 cursor-pointer rounded-xl bg-brand-primary px-3 text-xs font-bold">Nəticələri göstər</button></div></div></BusinessFormDialog>;
}
