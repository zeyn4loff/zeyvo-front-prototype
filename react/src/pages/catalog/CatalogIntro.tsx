import { Link } from "react-router";
import type { Category } from "@/features/marketplace/data";
import { categoryName, useTranslations } from "@/features/locale/language";
import SectionHeader from "@/components/common/SectionHeader";

interface Props {
  category?: Category;
  subcategoryId?: string;
  title: string;
  resultCount: number;
  resultType?: "all" | "salons" | "masters";
  onSubcategoryChange: () => void;
}

export default function CatalogIntro({ category, subcategoryId, title, resultCount, resultType, onSubcategoryChange }: Props) {
  const { language, t } = useTranslations();
  return (
    <section className="min-w-0">
      <SectionHeader title={resultType === "masters" ? `${title} · ${t("masters")}` : category && language === "az" ? `${title} məkanları` : title} subtitle={`${resultCount} ${language === "az" ? "nəticə" : language === "ru" ? "результатов" : language === "tr" ? "sonuç" : "results"}`} description={t("onlineRequest")} />
      {category && <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0"><div className="flex w-max min-w-full gap-2" aria-label="Alt-kateqoriyalar">
        <Link to={`/catalog/${category.id}`} onClick={onSubcategoryChange} aria-current={!subcategoryId ? "page" : undefined} className={`inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 text-xs font-semibold transition ${!subcategoryId ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>{t("all")}</Link>
        {category.subcategories.map((item) => <Link key={item.id} to={`/catalog/${category.id}/${item.id}`} onClick={onSubcategoryChange} aria-current={subcategoryId === item.id ? "page" : undefined} className={`inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 text-xs font-semibold transition ${subcategoryId === item.id ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>{categoryName(language, item.id, item.azName)}</Link>)}
      </div></div>}
    </section>
  );
}
