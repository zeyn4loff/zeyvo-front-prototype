import type { Salon, Specialist } from "@/features/marketplace/data";

export type ResultType = "all" | "salons" | "masters";
export type SortOrder = "popular" | "rating" | "price";
export type CatalogResult = { kind: "salon"; item: Salon } | { kind: "master"; item: Specialist };
