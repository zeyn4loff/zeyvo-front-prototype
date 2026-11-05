import { useState } from "react";
import { useSearchParams } from "react-router";
import CategoryTabMenu from "@/features/marketplace/components/CategoryTabMenu";
import BeautyCategories from "./components/BeautyCategories";
import BeautyLocation from "./components/BeautyLocation";
import SelectMasters from "./components/SelectMasters";
import { categories } from "@/features/marketplace/data";
import { getCatalogSalons, getPublicSpecialists, useMarketplaceRevision } from "@/features/marketplace/publicCatalog";
import { useCustomer } from "@/features/customer/useCustomer";
import { useLocationCity } from "@/features/location/useLocationCity";

type SortOrder = "default" | "rating" | "price";

export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("beauty");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const { favoriteSalonIds, toggleSalonFavorite } = useCustomer();
  const { city } = useLocationCity();
  useMarketplaceRevision();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLocaleLowerCase("az");
  const category = categories.find((item) => item.id === selectedCategoryId) || categories[0];

  const visibleSalons = (() => {
    const filtered = getCatalogSalons().filter((salon) =>
      (salon.city || "Bakı") === city && salon.topCategory === selectedCategoryId &&
      (!selectedSubcategoryId || salon.category === selectedSubcategoryId) &&
      (!query || [salon.name, salon.tag, salon.location, ...salon.services.map((service) => service.name)]
        .some((value) => value.toLocaleLowerCase("az").includes(query)))
    );
    return [...filtered].sort((a, b) => sortOrder === "rating"
      ? b.rating - a.rating
      : sortOrder === "price"
        ? (a.services[0]?.price || 0) - (b.services[0]?.price || 0)
        : b.reviewsCount - a.reviewsCount);
  })();

  const publicSalons = getCatalogSalons();
  const visibleSpecialists = getPublicSpecialists().filter((item) =>
    item.topCategory === selectedCategoryId && (publicSalons.find((salon) => salon.id === item.salonId)?.city || "Bakı") === city,
  ).slice(0, 4);

  return (
    <div className="container mx-auto my-5 px-4 sm:my-12">
      <CategoryTabMenu activeId={selectedCategoryId} onSelect={(id) => {
        setSelectedCategoryId(id);
        setSelectedSubcategoryId(null);
      }} />
      <BeautyCategories category={category} selectedId={selectedSubcategoryId} onSelect={(id) => { setSelectedSubcategoryId(!id || id === selectedSubcategoryId ? null : id); document.getElementById("salons")?.scrollIntoView({ behavior: "smooth" }); }} />
      <BeautyLocation category={category} items={visibleSalons} sortOrder={sortOrder} onSortChange={setSortOrder} favoriteIds={favoriteSalonIds} onToggleFavorite={toggleSalonFavorite} query={query} onClearFilters={() => { setSelectedSubcategoryId(null); setSearchParams({}); }} />
      <SelectMasters category={category} items={visibleSpecialists} />
    </div>
  );
}
