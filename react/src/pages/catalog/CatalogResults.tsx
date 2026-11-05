import EmptyState from "../../components/common/EmptyState";
import { SearchX } from "lucide-react";
import { MasterCard } from "@/features/marketplace/components/MasterCard";
import { useCustomer } from "@/features/customer/useCustomer";
import type { CatalogResult } from "./catalogTypes";
import SalonCard from "@/features/marketplace/components/SalonCard";
import { useCustomerText } from "@/features/locale/customerText";

interface Props {
  results: CatalogResult[];
  visibleCount: number;
  city: string;
  onLoadMore: () => void;
  onClearFilters: () => void;
}

export default function CatalogResults({ results, visibleCount, city, onLoadMore, onClearFilters }: Props) {
  const ct = useCustomerText();
  const { favoriteSalonIds, toggleSalonFavorite } = useCustomer();
  const visibleResults = results.slice(0, visibleCount);
  return (
    <section className="min-w-0 space-y-4" aria-label="Kataloq nəticələri">
      {visibleResults.length > 0 && <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {visibleResults.map((result) => result.kind === "salon"
          ? <SalonCard key={`s${result.item.id}`} item={result.item} isFavorite={favoriteSalonIds.includes(result.item.id)} onToggleFavorite={() => toggleSalonFavorite(result.item.id)} />
          : <MasterCard key={`m${result.item.id}`} showcase master={{ id: result.item.id, name: result.item.name, role: result.item.title, salon: result.item.salonName, rating: result.item.rating, avatar: result.item.photo }} />)}
      </div>}
      {results.length === 0 && <EmptyState title={ct("Nəticə tapılmadı")} description={city === "Bakı" ? ct("Axtarışı və ya filtrləri dəyişin.") : ct("Bu şəhərdə hələ məkan tapılmadı.")} icon={SearchX} actionLabel={ct("Filtrləri sıfırla")} onAction={onClearFilters} />}
      {visibleResults.length < results.length && <button type="button" onClick={onLoadMore} className="mx-auto block rounded-xl bg-brand-primary px-6 py-2.5 text-sm font-semibold">{ct("Daha çox göstər")}</button>}
    </section>
  );
}
