import SectionHeader from "@/components/common/SectionHeader";
import type { Category } from "@/features/marketplace/data";
import { categoryName, useTranslations } from "@/features/locale/language";

export default function BeautyCategories({ category, selectedId, onSelect }: { category: Category; selectedId: string | null; onSelect: (id: string) => void }) {
  const { language, t } = useTranslations();
  return <section id="categories" className="my-4 sm:my-8">
    <div className="hidden sm:block"><SectionHeader title={t("categories")} subtitle={categoryName(language, category.id, category.azName)} description={t("categoriesDescription")} /></div>
    <div className="flex min-w-0 gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible" aria-label="Xidmət kateqoriyaları">
      <button type="button" aria-pressed={!selectedId} onClick={() => onSelect("")} className={`min-h-11 shrink-0 rounded-2xl border px-4 text-sm font-semibold transition-colors ${!selectedId ? "border-brand-primary bg-brand-primary text-primary" : "border-slate-200 bg-white text-slate-700 hover:border-brand-primary"}`}>{t("all")}</button>
      {category.subcategories.map((item) => <button key={item.id} type="button" aria-pressed={selectedId === item.id} onClick={() => onSelect(item.id)} className={`min-h-11 shrink-0 rounded-2xl border px-4 text-sm font-semibold transition-colors ${selectedId === item.id ? "border-brand-primary bg-brand-primary text-primary" : "border-slate-200 bg-white text-slate-700 hover:border-brand-primary"}`}>{categoryName(language, item.id, item.azName)}</button>)}
    </div>
  </section>;
}
