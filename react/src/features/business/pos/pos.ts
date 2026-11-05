import type { BusinessSession } from "../auth/businessSession";
import { balance, readClients, saveClients, type Client } from "../clients/clients";
import { localDate, readFinance, roundMoney, saveFinance, type FinanceTransaction } from "../finance/finance";
import { applyStockChange, readProductData, saveProductData } from "../products/products";
import { resolveActiveContext } from "../directory/activeContext";
import { readMarketing, saveMarketing } from "../marketing/marketing";
import { promoIssue } from "../marketing/promoRules";

export type PaymentMethod = "cash" | "terminal" | "deposit" | "bonus";
export interface CartItem { productId: string; quantity: number }
export interface SaleLine { productId: string; name: string; sku: string; quantity: number; price: number; total: number }
export interface PosSale { id: string; number: string; createdAt: string; branchId?: string; branchName?: string; promoCode?: string; clientName: string; clientPhone: string; sellerName: string; paymentMethod: PaymentMethod; accountName: string; lines: SaleLine[]; subtotal: number; discount: number; total: number }
export interface SaleInput { cart: CartItem[]; clientId: string; sellerName: string; method: PaymentMethod; accountId: string; discountType: "percent" | "fixed"; discountValue: number; promoCode?: string }
export type SaleResult = { sale: PosSale } | { error: string };
const key = (id: string) => `zeyvo_business_pos_demo_v1_${id}`;
export const paymentLabels: Record<PaymentMethod, string> = { cash: "Nağd", terminal: "Kart / POS", deposit: "Depozit", bonus: "Bonus" };
export function readSales(sessionId: string): PosSale[] {
  try { const value: unknown = JSON.parse(localStorage.getItem(key(sessionId)) ?? "[]"); if (Array.isArray(value)) return value.filter((item) => item && typeof item.id === "string" && Array.isArray(item.lines)); } catch { /* Storage may be unavailable. */ }
  return [];
}
function saveSales(sessionId: string, sales: PosSale[]) { try { localStorage.setItem(key(sessionId), JSON.stringify(sales)); return true; } catch { return false; } }
export function saleTotals(subtotal: number, discountType: SaleInput["discountType"], discountValue: number) {
  const discount = roundMoney(discountType === "percent" ? subtotal * discountValue / 100 : discountValue);
  return { discount, total: roundMoney(subtotal - discount) };
}
export function completeSale(session: BusinessSession, input: SaleInput): SaleResult {
  const context = resolveActiveContext(session);
  if (!context) return { error: "Satış üçün filial seçin." };
  const products = readProductData(session);
  const finance = readFinance(session);
  const clients = readClients(session);
  if (!input.cart.length) return { error: "Səbət boşdur." };
  const ids = input.cart.map((item) => item.productId);
  if (new Set(ids).size !== ids.length) return { error: "Səbətdə təkrarlanan məhsul var." };
  const lines: SaleLine[] = [];
  for (const item of input.cart) {
    const product = products.products.find((candidate) => candidate.id === item.productId);
    const warehouse = products.warehouses.find((entry) => entry.id === product?.warehouseId);
    if (!product || product.kind !== "retail" || product.price <= 0 || warehouse?.branchId !== context.branchId || !Number.isInteger(item.quantity) || item.quantity < 1 || product.quantity < item.quantity) return { error: `Bu filialda məhsul qalığını yoxlayın: ${product?.name ?? "naməlum məhsul"}.` };
    lines.push({ productId: product.id, name: product.name, sku: product.sku, quantity: item.quantity, price: product.price, total: roundMoney(product.price * item.quantity) });
  }
  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.total, 0));
  if (!Number.isFinite(input.discountValue) || input.discountValue < 0 || (input.discountType === "percent" && input.discountValue > 100)) return { error: "Endirim düzgün deyil." };
  if (input.promoCode?.trim() && input.discountValue > 0) return { error: "Əl ilə endirim və promokodu eyni satışda istifadə etməyin." };
  const marketing = readMarketing(session);
  const promo = input.promoCode?.trim() ? marketing.promos.find((item) => item.code.toLocaleUpperCase("az-AZ") === input.promoCode?.trim().toLocaleUpperCase("az-AZ")) : undefined;
  if (input.promoCode?.trim()) { const issue = promoIssue(promo, subtotal, localDate()); if (issue) return { error: issue }; }
  const { discount, total } = saleTotals(subtotal, promo?.discountType ?? input.discountType, promo?.discountValue ?? input.discountValue);
  if (total <= 0) return { error: "Yekun məbləğ sıfırdan böyük olmalıdır." };
  const client = clients.find((item) => item.id === input.clientId);
  const balanceMethod = input.method === "deposit" || input.method === "bonus";
  const account = finance.accounts.find((item) => item.id === input.accountId);
  if (balanceMethod) {
    if (!client) return { error: "Depozit və bonus üçün müştəri seçin." };
    if (roundMoney(balance(client, input.method === "deposit" ? "deposit" : "cashback")) < total) return { error: "Müştəri balansında kifayət qədər vəsait yoxdur." };
  } else if (!account || (input.method === "cash" ? account.type !== "cash" && account.type !== "safe" : account.type !== "pos" && account.type !== "bank")) {
    return { error: "Ödəniş üsuluna uyğun kassa hesabı seçin." };
  }
  const now = new Date();
  const id = crypto.randomUUID();
  const number = `SAT-${Date.now().toString(36).toUpperCase()}`;
  const sale: PosSale = { id, number, createdAt: now.toISOString(), branchId: context.branchId, branchName: context.branchName, promoCode: promo?.code, clientName: client?.name ?? "Anonim alıcı", clientPhone: client?.phone ?? "", sellerName: input.sellerName || "Növbətçi kassir", paymentMethod: input.method, accountName: balanceMethod ? paymentLabels[input.method] : account?.name ?? "", lines, subtotal, discount, total };
  let nextProducts = products;
  for (const line of lines) {
    const updated = applyStockChange(nextProducts, line.productId, -line.quantity, "writeoff", `Kassa satışı ${number}`);
    if (!updated) return { error: `Məhsul qalığını yoxlayın: ${line.name}.` };
    nextProducts = { ...updated, operations: updated.operations.map((operation, index) => index === 0 ? { ...operation, documentId: id, documentNumber: number, date: now.toISOString() } : operation) };
  }
  let nextClients: Client[] = clients;
  if (client) {
    const updated: Client = { ...client, visits: [{ id, date: localDate(), service: `Məhsul satışı: ${lines.map((line) => line.name).join(", ")}`, staff: sale.sellerName, amount: total, note: `Çek ${number}` }, ...client.visits], ledger: balanceMethod ? [{ id: crypto.randomUUID(), date: localDate(), account: input.method === "deposit" ? "deposit" : "cashback", amount: -total, note: `Kassa satışı ${number}` }, ...client.ledger] : client.ledger };
    nextClients = clients.map((item) => item.id === client.id ? updated : item);
  }
  const transaction: FinanceTransaction | null = balanceMethod ? null : { id: crypto.randomUUID(), date: localDate(), type: "income", accountId: input.accountId, toAccountId: "", categoryId: "cat_income_product", amount: total, title: `Məhsul satışı ${number} · ${context.branchName}`, counterparty: sale.clientName, note: `${paymentLabels[input.method]} · ${sale.sellerName}`, payrollId: "" };
  const nextFinance = transaction ? { ...finance, categories: finance.categories.some((item) => item.id === "cat_income_product") ? finance.categories : [{ id: "cat_income_product", name: "Məhsul satışı", type: "income" as const }, ...finance.categories], transactions: [transaction, ...finance.transactions] } : finance;
  if (!saveProductData(session.id, nextProducts)) return { error: "Satışı saxlamaq mümkün olmadı." };
  if (transaction && !saveFinance(session.id, nextFinance)) { saveProductData(session.id, products); return { error: "Maliyyə əməliyyatı saxlanmadı." }; }
  if (client && !saveClients(session.id, nextClients)) { if (transaction) saveFinance(session.id, finance); saveProductData(session.id, products); return { error: "Müştəri tarixçəsi saxlanmadı." }; }
  const previousSales = readSales(session.id);
  if (!saveSales(session.id, [sale, ...previousSales])) { if (client) saveClients(session.id, clients); if (transaction) saveFinance(session.id, finance); saveProductData(session.id, products); return { error: "Çek saxlanmadı." }; }
  if (promo && !saveMarketing(session.id, { ...marketing, promos: marketing.promos.map((item) => item.id === promo.id ? { ...item, usedCount: item.usedCount + 1 } : item) })) {
    saveSales(session.id, previousSales);
    if (client) saveClients(session.id, clients);
    if (transaction) saveFinance(session.id, finance);
    saveProductData(session.id, products);
    return { error: "Promokod istifadəsi saxlanmadı." };
  }
  return { sale };
}
