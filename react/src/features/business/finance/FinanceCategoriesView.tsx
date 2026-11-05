import { useState, type Dispatch, type SetStateAction } from "react";
import { ChevronDown, ChevronRight, Eye, Pencil, Plus, Tag, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { formatMoney, type FinanceCategory, type FinanceData } from "./finance";
import { type DeleteSetter } from "./FinanceViewShared";

type Props = {
  data: FinanceData;
  setCategoryType: Dispatch<SetStateAction<FinanceCategory["type"]>>;
  setCategoryDialog: Dispatch<SetStateAction<FinanceCategory | null | undefined>>;
  setDeleting: DeleteSetter;
  onViewTransactions: (categoryId: string) => void;
};

export function FinanceCategoriesView({ data, setCategoryType, setCategoryDialog, setDeleting, onViewTransactions }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const add = (type: FinanceCategory["type"]) => { setCategoryType(type); setCategoryDialog(null); };

  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">{(["expense", "income"] as const).map((type) => {
    const isIncome = type === "income";
    const label = isIncome ? "Gəlir" : "Xərc";
    const categories = data.categories.filter((item) => item.type === type);
    const total = data.transactions.filter((tx) => categories.some((category) => category.id === tx.categoryId)).reduce((sum, tx) => sum + tx.amount, 0);
    const Icon = isIncome ? TrendingUp : TrendingDown;
    return <section key={type} className="p-4 first:border-t-0 border-t border-slate-200 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-3">
          <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${isIncome ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}><Icon size={20} /></span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <button type="button" onClick={() => setCollapsed((old) => ({ ...old, [type]: !old[type] }))} aria-expanded={!collapsed[type]} aria-label={`${label} kateqoriyalarını ${collapsed[type] ? "göstər" : "qatla"}`} className="flex size-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">{collapsed[type] ? <ChevronRight size={17} /> : <ChevronDown size={17} />}</button>
              <h3 className="text-sm font-bold">{label} kateqoriyaları</h3>
              <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${isIncome ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>{categories.length} kateqoriya</span>
              <span className={`text-[11px] font-bold ${isIncome ? "text-emerald-600" : "text-rose-600"}`}>• Cəmi: {isIncome ? "+" : "−"} {formatMoney(total)}</span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-400">{isIncome ? "Xidmət, satış və digər daxilolma mənbələrinin təsnifatı" : "Xərc maddələri, icarə, əmək haqqı və təsərrüfat təsnifatı"}</p>
          </div>
        </div>
        <button type="button" onClick={() => add(type)} aria-label={`${label} kateqoriyası əlavə et`} className={`flex min-h-9 shrink-0 items-center gap-1 rounded-xl border px-2 text-xs font-semibold sm:px-3 ${isIncome ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}><Plus size={15} /><span className="hidden sm:inline">{label} kateqoriyası</span></button>
      </div>
      {!collapsed[type] && <div className="ml-2 mt-4 space-y-2 border-l-2 border-slate-200 pl-4 sm:ml-3 sm:pl-5">
        {categories.map((category) => {
          const used = data.transactions.filter((tx) => tx.categoryId === category.id);
          const amount = used.reduce((sum, tx) => sum + tx.amount, 0);
          return <div key={category.id} className="rounded-xl border border-slate-200 bg-slate-50/80">
            <div className="flex min-w-0 items-center gap-1 p-2 text-xs sm:gap-2 sm:p-3">
              <button type="button" disabled={!used.length} onClick={() => setExpanded((old) => ({ ...old, [category.id]: !old[category.id] }))} aria-expanded={!!expanded[category.id]} aria-label={`${category.name} əməliyyatları`} className="flex size-8 shrink-0 items-center justify-center text-slate-500 disabled:opacity-40">{expanded[category.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</button>
              <span className={`hidden size-8 shrink-0 items-center justify-center rounded-lg sm:flex ${isIncome ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}><Tag size={16} /></span>
              <div className="min-w-0 flex-1"><strong className="break-words">{category.name}</strong><p className="text-[11px] text-slate-500">{used.length} əməliyyat · {formatMoney(amount)}</p></div>
              <div className="flex shrink-0"><button type="button" onClick={() => onViewTransactions(category.id)} aria-label={`${category.name} jurnalda bax`} className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white"><Eye size={15} /></button><button type="button" onClick={() => setCategoryDialog(category)} aria-label={`${category.name} redaktə et`} className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white"><Pencil size={15} /></button><button type="button" onClick={() => setDeleting({ kind: "category", id: category.id, name: category.name })} aria-label={`${category.name} sil`} className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-rose-700"><Trash2 size={15} /></button></div>
            </div>
            {expanded[category.id] && used.length > 0 && <div className="space-y-1 border-t border-slate-200 bg-white/70 px-3 py-2">{used.slice(0, 5).map((tx) => <div key={tx.id} className="flex justify-between gap-2 text-[11px]"><span className="min-w-0 truncate">{tx.title} <span className="text-slate-400">· {tx.date}</span></span><strong className="shrink-0">{formatMoney(tx.amount)}</strong></div>)}{used.length > 5 && <button type="button" onClick={() => onViewTransactions(category.id)} className="text-[11px] font-semibold text-amber-700">Daha {used.length - 5} əməliyyata jurnalda bax →</button>}</div>}
          </div>;
        })}
        <button type="button" onClick={() => add(type)} className="flex min-h-10 w-full items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-100 text-xs font-semibold hover:bg-brand-primary"><Plus size={15} />Yeni {label.toLocaleLowerCase("az-AZ")} kateqoriyası əlavə et</button>
      </div>}
    </section>;
  })}</div>;
}
