import { categories } from "@/features/marketplace/data";
import { Grid3X3 } from "lucide-react";
import { useState } from "react";
import { categories as categoryIcons } from "@/consts";
import { categoryName, useTranslations } from "@/features/locale/language";

interface Props { activeId: string; onSelect: (id: string) => void }

export default function CategoryTabMenu({ activeId, onSelect }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { language, t } = useTranslations();
  const activeExtraCategory = categories.slice(6).find((category) => category.id === activeId);
  const cardClass = (active: boolean) => `flex h-25 w-full min-w-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border p-2 text-center shadow-sm transition-[background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 disabled:cursor-default motion-reduce:transition-none ${active ? "border-brand-primary bg-brand-primary" : "border-slate-200 bg-white"}`;
  const categoryCard = (index: number, hidden = false) => {
    const category = categories[index];
    const Icon = categoryIcons[index]?.icon;
    return <button key={category.id} type="button" disabled={hidden} aria-pressed={activeId === category.id} onClick={() => onSelect(category.id)} className={cardClass(activeId === category.id)}>
      <span className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100">{Icon && <Icon size={22} strokeWidth={2} />}</span>
      <span className="max-w-full truncate text-xs font-bold">{categoryName(language, category.id, category.title)}</span>
    </button>;
  };
  const toggleButton = (label: string, hidden = false, showActive = false) => <button type="button" disabled={hidden} aria-expanded={expanded} aria-label={showActive ? `${label} seçilib — daha çox kateqoriya` : label} onClick={() => setExpanded((current) => !current)} className={`flex h-25 w-full min-w-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl p-2 shadow-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 disabled:cursor-default motion-reduce:transition-none ${showActive ? "bg-brand-primary text-primary hover:bg-[#b9dc65]" : "bg-primary text-white hover:bg-[#2b2c30]"}`}>
    <span className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-primary"><Grid3X3 size={22} /></span>
    <span className="text-xs font-bold">{label}</span>
  </button>;

  return <div className="overflow-x-auto pb-2">
    <div className="min-w-[640px]">
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {categories.slice(0, 6).map((_, index) => categoryCard(index))}
        <div className="relative h-25">
          <div className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${expanded ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}>{toggleButton(activeExtraCategory ? categoryName(language, activeExtraCategory.id, activeExtraCategory.title) : t("more"), expanded, Boolean(activeExtraCategory))}</div>
          <div className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${expanded ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}>{categoryCard(6, !expanded)}</div>
        </div>
      </div>
      <div className={`grid transition-[grid-template-rows,opacity,margin] duration-350 ease-in-out motion-reduce:transition-none ${expanded ? "mt-2 grid-rows-[1fr] opacity-100 sm:mt-3" : "mt-0 grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 overflow-hidden">
          <div className={`grid grid-cols-7 gap-2 transition-transform duration-350 ease-in-out motion-reduce:transition-none sm:gap-3 ${expanded ? "translate-y-0" : "-translate-y-3"}`}>
            {categories.slice(7).map((_, offset) => categoryCard(offset + 7, !expanded))}
            {toggleButton(t("less"), !expanded)}
          </div>
        </div>
      </div>
    </div>
  </div>;
}
