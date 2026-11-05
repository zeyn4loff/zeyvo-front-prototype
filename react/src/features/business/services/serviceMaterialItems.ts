import type { TechCard } from "../products/products";
import type { ServiceMaterialItem } from "./services";
export function cardItems(card: TechCard | undefined): ServiceMaterialItem[] { return card ? (card.items ?? [{ productId: card.productId, quantity: card.quantity }]).map((item) => ({ ...item })) : []; }
