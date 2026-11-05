import { useState } from "react";
import { Armchair, ChartNoAxesCombined, DoorOpen, X, Zap } from "lucide-react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import type { ResourceCategory, ResourceType } from "./resources";

type FilterType = ResourceType | "all";

type Props = {
  categories: ResourceCategory[];
  type: FilterType;
  category: string;
  onApply: (type: FilterType, category: string) => void;
  onReset: () => void;
  onClose: () => void;
};

const typeOptions = [
  { value: "all", label: "Hamısı", Icon: ChartNoAxesCombined },
  { value: "chair", label: "Kreslo", Icon: Armchair },
  { value: "room", label: "Otaq", Icon: DoorOpen },
  { value: "device", label: "Aparat", Icon: Zap },
] as const;

export default function ResourceFilterDialog({ categories, type, category, onApply, onReset, onClose }: Props) {
  const [draftType, setDraftType] = useState<FilterType>(type);
  const [draftCategory, setDraftCategory] = useState(category);

  return <BusinessFormDialog title="Resurs filtrləri" description="Növ, kateqoriya və filial üzrə detallı seçim" onClose={onClose} size="compact">
    <div className="space-y-4 text-xs">
      <fieldset className="space-y-2"><legend className="mb-2 font-medium text-slate-700">Resurs növü</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{typeOptions.map(({ value, label, Icon }) => <button type="button" key={value} aria-pressed={draftType === value} onClick={() => setDraftType(value)} className={`flex min-h-20 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl p-3 text-center transition ${draftType === value ? "border-2 border-slate-900 bg-slate-900 text-white shadow-xs" : "border border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100"}`}><Icon size={20} className={draftType === value ? "text-brand-primary" : "text-slate-500"} aria-hidden="true" /><span className="text-[11px] font-semibold">{label}</span></button>)}</div></fieldset>
      <label className="block space-y-1.5 font-medium text-slate-700"><span>Kateqoriya</span><select value={draftCategory} onChange={(event) => setDraftCategory(event.target.value)} className="h-11 w-full min-w-0 cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs font-medium text-slate-800 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"><option value="all">Bütün kateqoriyalar ({categories.length})</option><option value="uncategorized">Kateqoriyasız resurslar</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3"><button type="button" onClick={onReset} className="flex min-h-10 cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-rose-600"><X size={14} aria-hidden="true" />Filtrləri sıfırla</button><div className="ml-auto flex items-center gap-2"><button type="button" onClick={onClose} className="min-h-10 cursor-pointer rounded-[14px] border border-slate-200 bg-slate-100 px-4 text-xs font-bold transition hover:bg-slate-200">Bağla</button><button type="button" onClick={() => onApply(draftType, draftCategory)} className="min-h-10 cursor-pointer rounded-[14px] bg-brand-primary px-4 text-xs font-bold transition hover:bg-[#B9DC65]">Tətbiq et</button></div></div>
    </div>
  </BusinessFormDialog>;
}
