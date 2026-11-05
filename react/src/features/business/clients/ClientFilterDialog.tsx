import { useState, type Dispatch, type SetStateAction } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import type { ClientCategory, ClientGender } from "./clients";

type Category = ClientCategory | "all";
interface Props { category: Category; setCategory: Dispatch<SetStateAction<Category>>; gender: ClientGender | "all"; setGender: Dispatch<SetStateAction<ClientGender | "all">>; sort: string; setSort: Dispatch<SetStateAction<string>>; setPage: Dispatch<SetStateAction<number>>; onClose: () => void }
const categories: { value: Category; label: string }[] = [{ value: "all", label: "Hamısı" }, { value: "vip", label: "VIP" }, { value: "regular", label: "Daimi" }, { value: "new", label: "Yeni" }, { value: "risk", label: "Risk qrupu" }];
const genders: { value: ClientGender | "all"; label: string }[] = [{ value: "all", label: "Hamısı" }, { value: "female", label: "Xanımlar" }, { value: "male", label: "Bəylər" }];
const sorts = [{ value: "recent", label: "Ən son ziyarətə görə" }, { value: "visits_desc", label: "Ziyarət sayı (çoxdan aza)" }, { value: "spent_desc", label: "Cəmi məbləğ (çoxdan aza)" }, { value: "name_asc", label: "Müştəri adı (A - Z)" }, { value: "name_desc", label: "Müştəri adı (Z - A)" }];
const choice = (active: boolean) => `min-h-11 cursor-pointer rounded-xl border p-2.5 text-center text-[11px] font-semibold transition ${active ? "border-slate-900 bg-white text-slate-900 ring-1 ring-slate-900" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"}`;

export default function ClientFilterDialog({ category, setCategory, gender, setGender, sort, setSort, setPage, onClose }: Props) {
  const [draft, setDraft] = useState({ category, gender, sort });
  function apply() { setCategory(draft.category); setGender(draft.gender); setSort(draft.sort); setPage(1); onClose(); }
  return <BusinessFormDialog title="Müştəri filtrləri" description="Kateqoriya, cinsiyyət və sıralama meyarları" size="compact" mobileSheet onClose={onClose}>
    <div className="space-y-4">
      <fieldset className="space-y-2"><legend className="text-xs font-medium text-slate-700">Müştəri kateqoriyası</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{categories.map((item) => <button key={item.value} type="button" aria-pressed={draft.category === item.value} onClick={() => setDraft((old) => ({ ...old, category: item.value }))} className={choice(draft.category === item.value)}>{item.label}</button>)}</div></fieldset>
      <fieldset className="space-y-2"><legend className="text-xs font-medium text-slate-700">Cinsiyyət</legend><div className="grid grid-cols-3 gap-2">{genders.map((item) => <button key={item.value} type="button" aria-pressed={draft.gender === item.value} onClick={() => setDraft((old) => ({ ...old, gender: item.value }))} className={choice(draft.gender === item.value)}>{item.label}</button>)}</div></fieldset>
      <fieldset className="space-y-2"><legend className="text-xs font-medium text-slate-700">Sıralama meyarı</legend><div className="space-y-1.5">{sorts.map((item) => <button key={item.value} type="button" aria-pressed={draft.sort === item.value} onClick={() => setDraft((old) => ({ ...old, sort: item.value }))} className={`${choice(draft.sort === item.value)} w-full text-left`}>{item.label}</button>)}</div></fieldset>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4"><button type="button" onClick={() => setDraft({ category: "all", gender: "all", sort: "recent" })} className="min-h-10 cursor-pointer text-xs font-medium text-slate-500">Filtrləri sıfırla</button><div className="flex gap-2"><button type="button" onClick={onClose} className="min-h-10 cursor-pointer rounded-xl bg-slate-100 px-4 text-xs font-semibold">Bağla</button><button type="button" onClick={apply} className="min-h-10 cursor-pointer rounded-xl bg-brand-primary px-4 text-xs font-bold">Tətbiq et</button></div></div>
    </div>
  </BusinessFormDialog>;
}
