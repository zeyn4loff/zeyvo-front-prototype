import { applyStockChange, type ProductData } from "./products";

export interface StockLine { productId: string; amount: number }
export type StockMode = "receipt" | "writeoff" | "transfer" | "inventory";
export interface StockInput {
  lines: StockLine[];
  mode: StockMode;
  warehouseId: string;
  destinationWarehouseId: string;
  supplierId: string;
  date: string;
  responsible: string;
  note: string;
}

type StockResult = { data: ProductData; error?: never } | { data?: never; error: string };

/** Build the complete document in memory so a failed line cannot partially change stock. */
export function createStockDocument(data: ProductData, input: StockInput): StockResult {
  const { lines, mode, warehouseId, destinationWarehouseId, supplierId, date, responsible, note } = input;
  const parsedDate = new Date(`${date}T12:00:00`);
  if (!data.warehouses.some((item) => item.id === warehouseId) || !date || Number.isNaN(parsedDate.getTime()) ||
    (mode === "transfer" && (!destinationWarehouseId || destinationWarehouseId === warehouseId || !data.warehouses.some((item) => item.id === destinationWarehouseId)))) {
    return { error: "Anbar və tarixi yoxlayın." };
  }
  if (!lines.length || lines.some((line) => !line.productId || !Number.isInteger(line.amount) || line.amount < (mode === "inventory" ? 0 : 1)) || new Set(lines.map((line) => line.productId)).size !== lines.length) {
    return { error: "Məhsulları və miqdarları yoxlayın." };
  }

  let next = data;
  const inventoryEntries: ProductData["inventories"] = [];
  const operationDate = parsedDate.toISOString();
  const documentId = crypto.randomUUID();
  const documentYear = parsedDate.getFullYear();
  const prefix = mode === "receipt" ? "MED" : mode === "writeoff" ? "MEX" : mode === "transfer" ? "YER" : "INV";
  const operationSequence = data.operations.map((item) => item.documentNumber?.match(new RegExp(`^${prefix}-${documentYear}-(\\d+)$`))?.[1]).filter((value): value is string => Boolean(value)).map(Number);
  const operationNumber = `${prefix}-${documentYear}-${String(Math.max(0, ...operationSequence) + 1).padStart(3, "0")}`;
  const inventorySequence = data.inventories.map((item) => item.documentNumber?.match(new RegExp(`^INV-${documentYear}-(\\d+)$`))?.[1]).filter((value): value is string => Boolean(value)).map(Number);
  const inventoryNumber = mode === "inventory" ? `INV-${documentYear}-${String(Math.max(0, ...inventorySequence) + 1).padStart(3, "0")}` : undefined;
  const warehouseName = data.warehouses.find((item) => item.id === warehouseId)?.name ?? "";
  const destinationWarehouseName = data.warehouses.find((item) => item.id === destinationWarehouseId)?.name;
  const supplierName = data.suppliers.find((item) => item.id === supplierId)?.name;

  for (const line of lines) {
    const product = next.products.find((item) => item.id === line.productId);
    if (!product || product.warehouseId !== warehouseId) return { error: "Məhsul seçilmiş anbarda tapılmadı." };
    const difference = mode === "receipt" ? line.amount : mode === "inventory" ? line.amount - product.quantity : -line.amount;
    if (mode === "inventory" && difference === 0) {
      inventoryEntries.push({ id: crypto.randomUUID(), documentId, documentNumber: inventoryNumber, productName: product.name, expected: product.quantity, actual: line.amount, unitCost: product.cost, date: operationDate, warehouseName, responsible, note });
      continue;
    }
    const changed = applyStockChange(next, line.productId, difference, mode === "inventory" ? "adjustment" : mode, note);
    if (!changed) return { error: `${product.name}: miqdar düzgün deyil və ya qalıq kifayət etmir.` };
    next = { ...changed, operations: changed.operations.map((operation, index) => index === 0 ? { ...operation, documentId, documentNumber: operationNumber, date: operationDate, supplierId: supplierId || undefined, supplierName, destinationWarehouseName } : operation) };
    if (mode === "transfer") {
      const destination = next.products.find((item) => item.warehouseId === destinationWarehouseId && (product.sku ? item.sku === product.sku : item.name === product.name));
      next = destination
        ? { ...next, products: next.products.map((item) => item.id === destination.id ? { ...item, quantity: item.quantity + line.amount } : item) }
        : { ...next, products: [...next.products, { ...product, id: crypto.randomUUID(), warehouseId: destinationWarehouseId, quantity: line.amount }] };
    }
    if (mode === "inventory") inventoryEntries.push({ id: crypto.randomUUID(), documentId, documentNumber: inventoryNumber, productName: product.name, expected: product.quantity, actual: line.amount, unitCost: product.cost, date: operationDate, warehouseName, responsible, note });
  }
  return { data: mode === "inventory" ? { ...next, inventories: [...inventoryEntries, ...next.inventories] } : next };
}
