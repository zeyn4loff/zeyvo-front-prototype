import { useState } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import type { MarketingTab } from "./marketing";

type Values = { status: string; type: string; campaignType: string };
export default function MarketingFilterDialog({ tab, status, type, campaignType, onApply, onClose }: { tab: MarketingTab; status: string; type: string; campaignType: string; onApply: (values: Values) => void; onClose: () => void }) {
  const [draft, setDraft] = useState<Values>({ status, type, campaignType });
  const groups = tab === "campaigns" ? [
    { key: "type" as const, label: "Kanal", options: [["all", "Hamısı"], ["whatsapp", "WhatsApp"], ["sms", "SMS"]] },
    { key: "campaignType" as const, label: "Kampaniya növü", options: [["all", "Hamısı"], ["automated", "Avtomatik"], ["broadcast", "Kütləvi"]] },
    { key: "status" as const, label: "Status", options: [["all", "Hamısı"], ["active", "Aktiv"], ["inactive", "Qeyri-aktiv"], ["draft", "Qaralama"]] },
  ] : [
    { key: "type" as const, label: "Endirim növü", options: [["all", "Hamısı"], ["percent", "Faizlə (%)"], ["fixed", "Sabit məbləğ (₼)"]] },
    { key: "status" as const, label: "Status", options: [["all", "Hamısı"], ["active", "Aktiv"], ["expired", "Müddəti bitib"], ["inactive", "Qeyri-aktiv"]] },
  ];
  return <BusinessFormDialog title={tab === "campaigns" ? "Kampaniya filtrləri" : "Promokod filtrləri"} size="medium" onClose={onClose}><p className="-mt-2 text-xs text-slate-500">{tab === "campaigns" ? "Kanal, növ və status üzrə seçim" : "Endirim növü və status üzrə seçim"}</p><div className="mt-4 space-y-4">{groups.map((group) => <fieldset key={group.key}><legend className="mb-1.5 text-xs font-bold text-slate-700">{group.label}</legend><div className="grid grid-cols-3 gap-2">{group.options.map(([value, label]) => <button key={value} type="button" aria-pressed={draft[group.key] === value} onClick={() => setDraft((current) => ({ ...current, [group.key]: value }))} className={`min-h-11 cursor-pointer rounded-xl border p-2 text-xs font-semibold ${draft[group.key] === value ? "border-slate-900 bg-white text-slate-900 shadow-sm" : "border-slate-200 bg-slate-50/70 text-slate-700"}`}>{label}</button>)}</div></fieldset>)}<div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={() => setDraft({ status: "all", type: "all", campaignType: "all" })} className="min-h-10 cursor-pointer px-3 text-xs font-semibold text-rose-600">Sıfırla</button><button type="button" onClick={onClose} className="min-h-10 cursor-pointer rounded-xl bg-slate-100 px-4 text-xs font-bold">Bağla</button><button type="button" onClick={() => onApply(draft)} className="min-h-10 cursor-pointer rounded-xl bg-slate-900 px-4 text-xs font-bold text-white">Nəticələri göstər</button></div></div></BusinessFormDialog>;
}
