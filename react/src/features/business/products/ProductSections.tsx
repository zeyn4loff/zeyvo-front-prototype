import type { Dispatch, SetStateAction } from "react";
import { type ProductCategory, type ProductData, type Supplier, type TechCard, type Warehouse } from "./products";
import TechCardSection from "./TechCardSection";
import WarehouseSection from "./WarehouseSection";

export type SimpleKind = "category" | "warehouse" | "supplier" | "techcard";
export type Editing = { kind: SimpleKind; initial?: ProductCategory | Warehouse | Supplier | TechCard };
export type Deleting = { kind: SimpleKind | "product" | "operation" | "inventory"; id: string; name: string };
type Props = {
  tab: string; data: ProductData; services: { id: string; name: string }[];
  setEditing: Dispatch<SetStateAction<Editing | null>>;
  openDelete: (kind: Deleting["kind"], item: { id: string; name: string }) => void;
};
export default function ProductSections({ tab, data, services, setEditing, openDelete }: Props) {
  return <>
    {tab === "warehouses" && <WarehouseSection warehouses={data.warehouses} products={data.products} onEdit={(item) => setEditing({ kind: "warehouse", initial: item })} onDelete={(item) => openDelete("warehouse", item)} />}
    {tab === "techcards" && <TechCardSection cards={data.techCards} products={data.products} services={services} onCreate={() => setEditing({ kind: "techcard" })} onEdit={(item) => setEditing({ kind: "techcard", initial: item })} onDelete={(item) => openDelete("techcard", item)} />}
  </>;
}
