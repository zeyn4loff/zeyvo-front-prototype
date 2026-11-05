import { findSalonForSpecialist, type Category } from "@/features/marketplace/data";
import { getCatalogSalons, getPublicSalons, getPublicSpecialists } from "@/features/marketplace/publicCatalog";
import type { CatalogResult, ResultType, SortOrder } from "./catalogTypes";

interface Options {
  city: string;
  category?: Category;
  subcategoryId?: string;
  query: string;
  resultType: ResultType;
  sort: SortOrder;
}

export function getCatalogResults({ city, category, subcategoryId, query, resultType, sort }: Options): CatalogResult[] {
  const normalizedQuery = query.trim().toLocaleLowerCase("az");
  const catalogSalons = getCatalogSalons();
  const locations = new Map(getPublicSalons().map((salon) => [salon.id, salon.city]));
  const matchedSalons = catalogSalons.filter((item) =>
    (item.city || "Bakı") === city &&
    (!category || item.topCategory === category.id) &&
    (!subcategoryId || item.category === subcategoryId) &&
    (!normalizedQuery || [item.name, item.tag, item.location, ...item.services.map((service) => service.name)]
      .some((value) => value.toLocaleLowerCase("az").includes(normalizedQuery)))
  ).sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "price") {
      const aPrice = Math.min(...a.services.map((service) => service.price));
      const bPrice = Math.min(...b.services.map((service) => service.price));
      return aPrice === bPrice ? 0 : aPrice - bPrice;
    }
    return b.reviewsCount - a.reviewsCount;
  });

  const matchedMasters = getPublicSpecialists().filter((item) =>
    (locations.get(item.salonId ?? -1) || findSalonForSpecialist(item)?.city || "Bakı") === city &&
    (!category || item.topCategory === category.id) &&
    !subcategoryId &&
    (!normalizedQuery || [item.name, item.title, item.salonName]
      .some((value) => value.toLocaleLowerCase("az").includes(normalizedQuery)))
  ).sort((a, b) => b.rating - a.rating);

  const results: CatalogResult[] = [];
  if (resultType !== "masters") matchedSalons.forEach((item, index) => {
    results.push({ kind: "salon", item });
    if (resultType === "all" && !category && index % 3 === 2) {
      const master = matchedMasters[Math.floor(index / 3)];
      if (master) results.push({ kind: "master", item: master });
    }
  });
  if (resultType !== "salons") matchedMasters.slice(resultType === "all" && !category ? Math.floor(matchedSalons.length / 3) : 0)
    .forEach((item) => results.push({ kind: "master", item }));
  return results;
}
