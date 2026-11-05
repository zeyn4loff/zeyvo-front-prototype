import { useState } from "react";
import { CarFront, Check, CircleHelp, Dumbbell, GraduationCap, HeartPulse, Home, MoreHorizontal, Palette, PawPrint, Scale, Scissors, Search, Utensils, Wrench, X } from "lucide-react";
import { categories } from "@/features/marketplace/data";
import EmptyState from "@/components/common/EmptyState";

type Props = { selected: string[]; onChange: (value: string[]) => void; individual?: boolean };

const icons: Record<string, typeof Scissors> = {
  beauty: Scissors, health: HeartPulse, auto: CarFront, entertainment: CircleHelp,
  services: Wrench, education: GraduationCap, rent: Home, sport: Dumbbell,
  animals: PawPrint, restaurants: Utensils, style: Palette, lawyers: Scale, other: MoreHorizontal,
};

function normalizedSelections(selected: string[]) {
  const values = selected.flatMap((id) => {
    const category = categories.find((item) => item.id === id);
    if (category) return category.subcategories.map((sub) => `${category.id}/${sub.id}`);
    if (id.includes("/")) return [id];
    const parent = categories.find((item) => item.subcategories.some((sub) => sub.id === id));
    return parent ? [`${parent.id}/${id}`] : [id];
  });
  return [...new Set(values)];
}

export default function BranchCategories({ selected, onChange, individual = false }: Props) {
  const [query, setQuery] = useState("");
  const [warning, setWarning] = useState("");
  const current = normalizedSelections(selected);
  const lower = query.trim().toLocaleLowerCase("az");

  function change(next: string[]) {
    if (current.length > 0 && next.length === 0) {
      setWarning("Ən azı 1 kateqoriya seçilməlidir");
      return;
    }
    setWarning("");
    onChange(next);
  }

  function toggle(id: string) {
    change(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function toggleAll(categoryId: string) {
    const category = categories.find((item) => item.id === categoryId);
    if (!category) return;
    const ids = category.subcategories.map((sub) => `${categoryId}/${sub.id}`);
    const allSelected = ids.every((id) => current.includes(id));
    change(allSelected ? current.filter((id) => !ids.includes(id)) : [...new Set([...current, ...ids])]);
  }

  const visible = categories.map((category) => {
    const categoryMatches = `${category.azName} ${category.title}`.toLocaleLowerCase("az").includes(lower);
    const subs = category.subcategories.filter((sub) => !lower || categoryMatches || `${sub.azName} ${sub.name}`.toLocaleLowerCase("az").includes(lower));
    return { category, subs };
  }).filter(({ subs }) => subs.length > 0);

  return <div className="min-w-0 space-y-2">
    <div className="flex items-center justify-between gap-2">
      <label htmlFor="branch-category-search" className="text-xs font-medium text-slate-700">Kateqoriyalar və alt-xidmətlər *</label>
      <span className="shrink-0 text-[11px] font-normal text-slate-400">Seçilib: <strong className="font-bold text-slate-900">{current.length}</strong></span>
    </div>

    <div className="flex max-h-28 min-h-[38px] flex-wrap gap-1.5 overflow-y-auto rounded-xl border border-slate-200/90 bg-slate-50 p-2">
      {current.length ? current.map((id) => {
        const [categoryId, subId] = id.split("/");
        const category = categories.find((item) => item.id === categoryId);
        const name = category?.subcategories.find((sub) => sub.id === subId)?.azName ?? category?.azName ?? id;
        const Icon = icons[categoryId] ?? CircleHelp;
        return <span key={id} className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-brand-primary bg-brand-primary px-2.5 py-1 text-xs font-semibold text-[#101114] shadow-xs">
          <Icon size={14} aria-hidden="true" className="shrink-0" /><span className="truncate">{name}</span>
          <button type="button" onClick={() => toggle(id)} aria-label={`${name} seçimini sil`} className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-black/70 transition hover:bg-black/15 hover:text-black"><X size={12} /></button>
        </span>;
      }) : <span className="py-1 text-[11px] font-normal italic text-slate-400">Heç bir kateqoriya seçilməyib. Aşağıdakı siyahıdan seçin və ya axtarın.</span>}
    </div>

    <div className="relative">
      <Search size={16} aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 my-auto text-slate-400" />
      <input id="branch-category-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Kateqoriya və ya alt-xidmət axtar (məs: Saç, Manikür, Diş, Avto...)" className="h-10 w-full min-w-0 rounded-xl border border-slate-200 bg-white pr-9 pl-9 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-brand-primary/40" />
      {query && <button type="button" onClick={() => setQuery("")} aria-label="Axtarışı təmizlə" className="absolute inset-y-0 right-2 flex w-7 cursor-pointer items-center justify-center text-slate-400 transition hover:text-slate-700"><X size={14} /></button>}
    </div>

    <div className="max-h-56 space-y-2 overflow-y-auto rounded-xl border border-slate-200/90 bg-slate-50/70 p-2">
      {visible.length ? visible.map(({ category, subs }) => {
        const Icon = icons[category.id] ?? CircleHelp;
        const count = category.subcategories.filter((sub) => current.includes(`${category.id}/${sub.id}`)).length;
        const allSelected = count === category.subcategories.length;
        return <div key={category.id} className="space-y-2 rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-xs">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
            <div className="flex min-w-0 items-center gap-1.5"><Icon size={14} aria-hidden="true" className="shrink-0" /><strong className="min-w-0 text-xs font-bold text-slate-900">{category.azName}</strong><span className="shrink-0 text-[10px] font-medium text-slate-400">({count}/{category.subcategories.length})</span></div>
            <button type="button" onClick={() => toggleAll(category.id)} className="shrink-0 cursor-pointer text-[10px] font-semibold text-slate-600 transition hover:text-black hover:underline">{allSelected ? "Seçimi ləğv et" : "+ Hamısını seç"}</button>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">{subs.map((sub) => {
            const id = `${category.id}/${sub.id}`;
            const active = current.includes(id);
            return <button key={id} type="button" aria-pressed={active} onClick={() => toggle(id)} className={`flex min-h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1 text-left text-xs transition active:scale-95 ${active ? "border-brand-primary bg-brand-primary font-semibold text-[#101114] shadow-xs" : "border-slate-200 bg-slate-50 font-medium text-slate-600 hover:bg-slate-100"}`}>{sub.azName}{active && <Check size={12} strokeWidth={3} aria-hidden="true" />}</button>;
          })}</div>
        </div>;
      }) : <EmptyState title={`“${query}” üzrə heç bir xidmət tapılmadı`} description="Axtarış sözünü dəyişin və ya axtarışı sıfırlayın" icon={Search} compact actionLabel="Axtarışı sıfırla" onAction={() => setQuery("")} />}
    </div>
    {warning && <p role="alert" className="text-[11px] text-amber-700">{warning}</p>}
    <p className="text-[11px] text-slate-400">{individual ? "Ustanın" : "Filialın"} aid olduğu əsas kateqoriyanı və təqdim etdiyi bütün alt-xidmətləri seçə bilərsiniz</p>
  </div>;
}
