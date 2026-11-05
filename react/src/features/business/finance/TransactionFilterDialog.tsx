import { useState } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { businessControlClass, businessLabelClass } from "../components/BusinessField";
import type { FinanceData, FinanceKind } from "./finance";

type Filters = { type: string; account: string; category: string };
type Props = {
  data: FinanceData;
  current: Filters;
  onClose: () => void;
  onApply: (filters: Filters) => void;
};

const types: { value: FinanceKind | "all"; label: string }[] = [
  { value: "all", label: "Hamısı" },
  { value: "income", label: "Gəlirlər" },
  { value: "expense", label: "Xərclər" },
  { value: "transfer", label: "Köçürmələr" },
];

export function TransactionFilterDialog({ data, current, onClose, onApply }: Props) {
  const [draft, setDraft] = useState(current);
  return <BusinessFormDialog size="compact" title="Əməliyyat filtrləri" description="Əməliyyat növü, hesab və kateqoriya üzrə süzgəc" onClose={onClose}>
    <div className="space-y-4">
      <fieldset><legend className={businessLabelClass}>Əməliyyat növü</legend><div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {types.map((option) => <button key={option.value} type="button" aria-pressed={draft.type === option.value} onClick={() => setDraft({ ...draft, type: option.value })} className={`min-h-11 rounded-xl border p-2 text-center text-[11px] font-semibold ${draft.type === option.value ? "border-slate-900 bg-amber-50 text-slate-900" : "border-slate-200 bg-slate-50 text-slate-700"}`}>{option.label}</button>)}
      </div></fieldset>
      <label className={businessLabelClass}>Hesab
        <select value={draft.account} onChange={(event) => setDraft({ ...draft, account: event.target.value })} className={businessControlClass}>
          <option value="all">Bütün hesablar</option>
          {data.accounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
        </select>
      </label>
      <label className={businessLabelClass}>Kateqoriya
        <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} className={businessControlClass}>
          <option value="all">Bütün kateqoriyalar</option>
          {data.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <button type="button" onClick={() => setDraft({ type: "all", account: "all", category: "all" })} className="min-h-11 rounded-xl px-4 text-xs font-semibold text-rose-600 hover:bg-rose-50">Sıfırla</button>
        <button type="button" onClick={() => { onApply(draft); onClose(); }} className="min-h-11 rounded-xl bg-slate-900 px-5 text-xs font-bold text-white">Tətbiq et</button>
      </div>
    </div>
  </BusinessFormDialog>;
}
