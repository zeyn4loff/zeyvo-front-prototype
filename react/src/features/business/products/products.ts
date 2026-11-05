import type { BusinessSession } from "../auth/businessSession";

export type ProductKind = "retail" | "internal";
export interface ProductCategory { id: string; name: string; description?: string; icon?: string }
export interface Warehouse { id: string; name: string; branchId: string; responsible: string; address?: string; notes?: string; typeName?: string; isDefault?: boolean }
export interface Product { id: string; name: string; sku: string; kind: ProductKind; categoryId: string; warehouseId: string; unit: string; cost: number; price: number; quantity: number; minimum: number; description?: string }
export interface StockOperation { id: string; documentId?: string; documentNumber?: string; productId: string; productName: string; warehouseName: string; type: "receipt" | "writeoff" | "adjustment" | "transfer"; difference: number; unitCost?: number; date: string; note: string; supplierId?: string; supplierName?: string; destinationWarehouseName?: string }
export interface Inventory { id: string; documentId?: string; documentNumber?: string; productName: string; expected: number; actual: number; unitCost?: number; date: string; warehouseName?: string; responsible?: string; note?: string }
export interface Supplier { id: string; name: string; phone: string; email: string; note: string; contact?: string; voen?: string; address?: string }
export interface TechCard { id: string; name: string; productId: string; quantity: number; note: string; serviceId?: string; items?: { productId: string; quantity: number }[] }
export interface ProductData { categories: ProductCategory[]; warehouses: Warehouse[]; products: Product[]; operations: StockOperation[]; inventories: Inventory[]; suppliers: Supplier[]; techCards: TechCard[] }

const key = (id: string) => `zeyvo_business_products_demo_v1_${id}`;
const categories: ProductCategory[] = [
  { id: "pcat_hair", name: "Saç qulluğu və stilləşdirmə" }, { id: "pcat_skin", name: "Dəri baxımı və kosmetologiya" },
  { id: "pcat_nails", name: "Manikür və dırnaq materialları" }, { id: "pcat_consumables", name: "Sərfiyyat və gigiyena" },
  { id: "pcat_medical", name: "Tibbi və stomatoloji vasitələr" },
];
function demoData(): ProductData {
  return { categories, warehouses: [
    { id: "wh_1", name: "Əsas anbar", branchId: "br_bbs_1", responsible: "Rauf Əliyev", address: "Nizami küç. 142", notes: "Mərkəzi təchizat və qəbul anbarı", typeName: "Mərkəzi anbar", isDefault: true },
    { id: "wh_2", name: "Kabinet və vitrin anbarı", branchId: "br_bbs_2", responsible: "Aysel Qasımova", address: "Gənclik filialı, 2-ci mərtəbə", notes: "Usta və mütəxəssislərin gündəlik sərfiyyatı üçün", typeName: "Kabinet vitrini" },
    { id: "wh_3", name: "Gənclik filial anbarı", branchId: "br_bbs_2", responsible: "Samir Kərimov", address: "Atatürk pr. 45", notes: "Gənclik filialının ehtiyat anbarı", typeName: "Filial anbarı" },
  ], products: [
    { id: "prod_1", name: "Kerastase Nutritive Magistral Şampun 250ml", sku: "KRT-NUT-250", kind: "retail", categoryId: "pcat_hair", warehouseId: "wh_1", unit: "ədəd", cost: 28, price: 45, quantity: 14, minimum: 4 },
    { id: "prod_2", name: "Olaplex No.3 Hair Perfector 100ml", sku: "OLP-03-100", kind: "retail", categoryId: "pcat_hair", warehouseId: "wh_1", unit: "ədəd", cost: 34, price: 58, quantity: 3, minimum: 5 },
    { id: "prod_3", name: "La Roche-Posay Anthelios SPF50+ Fluide 50ml", sku: "LRP-SPF50-FL", kind: "retail", categoryId: "pcat_skin", warehouseId: "wh_1", unit: "ədəd", cost: 24, price: 42, quantity: 19, minimum: 4 },
    { id: "prod_4", name: "Birdəfəlik steril nitril əlcək (Qara, M)", sku: "GLV-NIT-BK-M", kind: "internal", categoryId: "pcat_consumables", warehouseId: "wh_1", unit: "qutu", cost: 9.5, price: 0, quantity: 2, minimum: 5 },
    { id: "prod_5", name: "Kodi Professional Kauçuk Baza 15ml", sku: "KD-BASE-15", kind: "internal", categoryId: "pcat_nails", warehouseId: "wh_2", unit: "ədəd", cost: 14, price: 25, quantity: 9, minimum: 3 },
    { id: "prod_6", name: "Alətlər üçün sürətli dezinfeksiya spreyi 1L", sku: "DES-SPR-1000", kind: "internal", categoryId: "pcat_consumables", warehouseId: "wh_2", unit: "ədəd", cost: 11, price: 0, quantity: 0, minimum: 2 },
    { id: "prod_7", name: "Curaprox Ultra Soft 5460 Diş fırçası", sku: "CURA-5460", kind: "retail", categoryId: "pcat_medical", warehouseId: "wh_1", unit: "ədəd", cost: 8, price: 16, quantity: 15, minimum: 5 },
  ], operations: [], inventories: [], suppliers: [], techCards: [] };
}
function validData(value: unknown): value is ProductData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<ProductData>;
  return Array.isArray(data.categories) && Array.isArray(data.warehouses) && Array.isArray(data.products) && Array.isArray(data.operations) && Array.isArray(data.inventories) && Array.isArray(data.suppliers) && Array.isArray(data.techCards) && data.products.every((item) => item && typeof item.id === "string" && typeof item.name === "string" && Number.isFinite(item.quantity) && item.quantity >= 0);
}
export function readProductData(session: BusinessSession): ProductData {
  try { const raw = localStorage.getItem(key(session.id)); if (raw !== null) { const value: unknown = JSON.parse(raw); if (validData(value)) return value; } } catch { /* Browser storage may be unavailable. */ }
  return session.id === "baku-beauty-demo" ? demoData() : { categories: [], warehouses: [], products: [], operations: [], inventories: [], suppliers: [], techCards: [] };
}
export function saveProductData(sessionId: string, data: ProductData) {
  try { localStorage.setItem(key(sessionId), JSON.stringify(data)); return true; } catch { return false; }
}
export function applyStockChange(data: ProductData, productId: string, difference: number, type: StockOperation["type"], note: string): ProductData | null {
  const product = data.products.find((item) => item.id === productId);
  if (!product || !Number.isFinite(difference) || !Number.isInteger(difference) || product.quantity + difference < 0) return null;
  const warehouseName = data.warehouses.find((item) => item.id === product.warehouseId)?.name ?? "Anbarsız";
  return { ...data, products: data.products.map((item) => item.id === productId ? { ...item, quantity: item.quantity + difference } : item), operations: [{ id: crypto.randomUUID(), productId, productName: product.name, warehouseName, type, difference, unitCost: product.cost, note, date: new Date().toISOString() }, ...data.operations] };
}
export const money = (value: number) => `${value.toLocaleString("az-AZ", { maximumFractionDigits: 2 })} ₼`;
