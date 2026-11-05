import { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import CatalogCategoryRail from "./CatalogCategoryRail";
import Breadcrumbs from "@/features/marketplace/components/Breadcrumbs";
import { categories } from "@/features/marketplace/data";
import { useMarketplaceRevision } from "@/features/marketplace/publicCatalog";
import { useLocationCity } from "@/features/location/useLocationCity";
import CatalogFilters from "./CatalogFilters";
import CatalogIntro from "./CatalogIntro";
import CatalogResults from "./CatalogResults";
import { getCatalogResults } from "./buildCatalogResults";
import type { ResultType, SortOrder } from "./catalogTypes";
import { categoryName, useTranslations } from "@/features/locale/language";

export default function CatalogPage() {
  const { category: categoryId, subcategory: subcategoryId } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [resultType, setResultType] = useState<ResultType>(() => params.get("type") === "masters" ? "masters" : "all");
  const [sort, setSort] = useState<SortOrder>("popular");
  const [visibleCount, setVisibleCount] = useState(12);
  const { city } = useLocationCity();
  const { language, t } = useTranslations();
  useMarketplaceRevision();
  const query = params.get("q") || "";
  // An explicit search covers every category; browsing starts with beauty.
  const category = query ? undefined : categories.find((item) => item.id === categoryId) ?? categories[0];
  const subcategory = category?.subcategories.find((item) => item.id === subcategoryId);
  const results = getCatalogResults({ city, category, subcategoryId: subcategory?.id, query, resultType, sort });
  const title = subcategory ? categoryName(language, subcategory.id, subcategory.azName) : category ? categoryName(language, category.id, category.azName) : t("catalog");

  function updateQuery(value: string) {
    setVisibleCount(12);
    navigate(value ? `/catalog?q=${encodeURIComponent(value)}` : "/catalog", { replace: true });
  }

  return (
    <div className="container mx-auto space-y-4 px-4 py-4 pb-24 sm:space-y-6 sm:py-8">
      <div role="search" className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-[0_8px_24px_-18px_rgba(15,23,42,.45)] transition focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/25 sm:px-5">
        <Search size={20} className="shrink-0 text-slate-500" aria-hidden="true" />
        <input type="text" inputMode="search" enterKeyHint="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder={t("searchPlaceholder")} aria-label={t("searchPlaceholder")} className="h-12 min-w-0 flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-slate-500 sm:h-14 sm:text-base" />
        {query && <button type="button" onClick={() => updateQuery("")} aria-label="Axtarışı təmizlə" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600"><X size={17} /></button>}
      </div>
      <CatalogCategoryRail activeId={category?.id} onSelect={() => { setVisibleCount(12); setResultType("all"); }} />
      <div className="hidden sm:block"><Breadcrumbs items={[{ label: t("catalog"), to: category ? "/catalog" : undefined }, ...(category ? [{ label: categoryName(language, category.id, category.azName), to: subcategory ? `/catalog/${category.id}` : undefined }] : []), ...(subcategory ? [{ label: title }] : [])]} /></div>
      <CatalogIntro category={category} subcategoryId={subcategory?.id} title={title} resultCount={results.length} resultType={resultType} onSubcategoryChange={() => { setVisibleCount(12); setResultType("all"); }} />
      <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_260px]">
        <CatalogResults results={results} visibleCount={visibleCount} city={city} onLoadMore={() => setVisibleCount((count) => count + 12)} onClearFilters={() => { updateQuery(""); setResultType("all"); }} />
        <CatalogFilters sort={sort} resultType={resultType} categoryTitle={category ? categoryName(language, category.id, category.azName) : undefined} onSortChange={setSort} onResultTypeChange={(value) => { setResultType(value); setVisibleCount(12); }} />
      </div>
    </div>
  );
}
