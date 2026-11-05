import SectionHeader from "@/components/common/SectionHeader";
import EmptyState from "../../../components/common/EmptyState";
import { SearchX } from "lucide-react";
import BeautyLocationCard from "@/features/marketplace/components/SalonCard";
import type { Category, Salon } from "@/features/marketplace/data";
import { categoryName, useTranslations } from "@/features/locale/language";
import { useCustomerText } from "@/features/locale/customerText";

type SortOrder = "default" | "rating" | "price";
interface Props {
  category: Category;
  items: Salon[];
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
  favoriteIds: number[];
  onToggleFavorite: (id: number) => void;
  query: string;
  onClearFilters: () => void;
}

export default function BeautyLocation({ category, items, sortOrder, onSortChange, favoriteIds, onToggleFavorite, query, onClearFilters }: Props) {
  const { language, t } = useTranslations();
  const ct = useCustomerText();
  const name = categoryName(language, category.id, category.azName);
  return <section id="salons" className="my-5 scroll-mt-5 sm:my-8">
    <SectionHeader title={language === "az" ? `${name} məkanları` : `${name} · ${t("places")}`} subtitle={`${items.length} ${t("places")}`} description={t("onlineRequest")}>
      <label className="sr-only" htmlFor="sort-salons">{t("sort")}</label>
      <select id="sort-salons" value={sortOrder} onChange={(event) => onSortChange(event.target.value as SortOrder)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold">
        <option value="default">{t("popularity")}</option>
        <option value="rating">{t("rating")}</option>
        <option value="price">{t("price")}</option>
      </select>
    </SectionHeader>
    {query && <p className="mb-4 text-sm text-slate-600">Axtarış: “{query}”</p>}
    {items.length ? <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => <BeautyLocationCard key={item.id} item={item} isFavorite={favoriteIds.includes(item.id)} onToggleFavorite={() => onToggleFavorite(item.id)} />)}
    </div> : <EmptyState title={ct("Bu kriteriyada nəticə tapılmadı")} description={ct("Başqa kateqoriya seçin və ya filtrləri sıfırlayın.")} icon={SearchX} actionLabel={ct("Filtrləri sıfırla")} onAction={onClearFilters} />}
  </section>;
}
