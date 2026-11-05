import { Link } from "react-router";
import { categories } from "@/features/marketplace/data";
import { categoryName, useTranslations } from "@/features/locale/language";

export default function CatalogCategoryRail({ activeId, onSelect }: { activeId?: string; onSelect: () => void }) {
  const { language, t } = useTranslations();
  return <nav id="catalog-categories" aria-label={t("categories")} className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
    <div className="flex w-max min-w-full gap-2">
      {categories.map((item) => <Link key={item.id} to={`/catalog/${item.id}`} onClick={onSelect} aria-current={activeId === item.id ? "page" : undefined} className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-xs font-semibold transition sm:text-sm ${activeId === item.id ? "border-brand-primary bg-brand-primary text-primary shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-primary"}`}>{categoryName(language, item.id, item.azName)}</Link>)}
    </div>
  </nav>;
}
