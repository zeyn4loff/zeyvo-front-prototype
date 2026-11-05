import { useEffect, useMemo, useRef, useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { phoneDigits, readClients, saveClients, type Client } from "../clients/clients";
import { readFinance } from "../finance/finance";
import { readProductData } from "../products/products";
import { readStaffData } from "../staff/staff";
import { completeSale, readSales, saleTotals, type CartItem, type PaymentMethod, type PosSale } from "./pos";
import { useActiveBusinessContext } from "../directory/activeContext";
import { readMarketing } from "../marketing/marketing";
import { promoIssue } from "../marketing/promoRules";
import { localDate } from "../finance/finance";

export default function usePosCheckout(session: BusinessSession, onClose: () => void) {
  const activeContext = useActiveBusinessContext(session);
  const [products, setProducts] = useState(() => readProductData(session));
  const [clients, setClients] = useState(() => readClients(session));
  const [addingClient, setAddingClient] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [staff] = useState(() => readStaffData(session));
  const [finance] = useState(() => readFinance(session));
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobilePane, setMobilePane] = useState<"products" | "cart">("products");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [clientId, setClientId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [accountId, setAccountId] = useState(finance.accounts.find((item) => item.type === "cash")?.id ?? "");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">("percent");
  const [discountValue, setDiscountValue] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<PosSale | null>(null);
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const [recentSale, setRecentSale] = useState(() => readSales(session.id).find((sale) => sale.branchId === activeContext?.branchId));
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [onClose]);
  const client = clients.find((item) => item.id === clientId);
  const sellable = useMemo(() => products.products.filter((item) => item.kind === "retail" && item.price > 0 && products.warehouses.some((warehouse) => warehouse.id === item.warehouseId && warehouse.branchId === activeContext?.branchId)), [products, activeContext?.branchId]);
  const visible = sellable.filter((item) => (category === "all" || item.categoryId === category) && `${item.name} ${item.sku}`.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()));
  const subtotal = cart.reduce((sum, item) => sum + (sellable.find((product) => product.id === item.productId)?.price ?? 0) * item.quantity, 0);
  const selectedPromo = readMarketing(session).promos.find((item) => item.code.toLocaleUpperCase("az-AZ") === promoCode.trim().toLocaleUpperCase("az-AZ"));
  const promoError = promoCode.trim() ? promoIssue(selectedPromo, subtotal, localDate()) : null;
  const totals = saleTotals(subtotal, !promoError && selectedPromo ? selectedPromo.discountType : discountType, !promoError && selectedPromo ? selectedPromo.discountValue : Number(discountValue) || 0);
  const balanceMethod = method === "deposit" || method === "bonus";
  const accounts = finance.accounts.filter((item) => method === "cash" ? item.type === "cash" || item.type === "safe" : item.type === "pos" || item.type === "bank");
  function changeQuantity(productId: string, difference: number) {
    const product = sellable.find((item) => item.id === productId);
    if (!product) return;
    setCart((previous) => {
      const current = previous.find((item) => item.productId === productId)?.quantity ?? 0;
      const next = Math.max(0, Math.min(product.quantity, current + difference));
      return next === 0 ? previous.filter((item) => item.productId !== productId) : current === 0 ? [...previous, { productId, quantity: next }] : previous.map((item) => item.productId === productId ? { ...item, quantity: next } : item);
    });
    setError("");
  }
  function changeMethod(next: PaymentMethod) { setMethod(next); setAccountId(finance.accounts.find((item) => next === "cash" ? item.type === "cash" : item.type === "pos" || item.type === "bank")?.id ?? ""); setError(""); }
  function addClient() {
    const digits = phoneDigits(clientPhone);
    if (!clientName.trim() || digits.length !== 9) { setError("Müştəri adı və 9 rəqəmli mobil nömrə daxil edin."); return; }
    if (clients.some((item) => phoneDigits(item.phone) === digits)) { setError("Bu mobil nömrə artıq müştərilər siyahısındadır."); return; }
    const client: Client = { id: crypto.randomUUID(), name: clientName.trim(), phone: `+994 ${digits.slice(0, 2)} ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7)}`, email: "", gender: "other", category: "new", birthDate: "", preferredStaffId: "", discountPercent: 0, note: "", visits: [], ledger: [], notes: [], files: [], createdAt: new Date().toISOString() };
    const next = [client, ...clients];
    if (!saveClients(session.id, next)) { setError("Müştəri saxlanmadı."); return; }
    setClients(next); setClientId(client.id); setClientName(""); setClientPhone(""); setAddingClient(false); setError("");
  }
  function submit() {
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    const result = completeSale(session, { cart, clientId, sellerName: staff.members.find((item) => item.id === sellerId && item.branchId === activeContext?.branchId)?.name ?? "", method, accountId, discountType, discountValue: Number(discountValue) || 0, promoCode });
    setBusy(false);
    if ("error" in result) { submitting.current = false; setError(result.error); return; }
    setReceipt(result.sale); setRecentSale(result.sale); setCart([]); setError(""); setProducts(readProductData(session)); window.dispatchEvent(new Event("zeyvo-pos-sale"));
  }
  function newSale() { submitting.current = false; setReceipt(null); setProducts(readProductData(session)); setMobilePane("products"); }
  return { activeContext, products, clients, addingClient, setAddingClient, clientName, setClientName, clientPhone, setClientPhone, staff, cart, mobilePane, setMobilePane, query, setQuery, category, setCategory, clientId, setClientId, sellerId, setSellerId, method, accountId, setAccountId, discountType, setDiscountType, discountValue, setDiscountValue, promoCode, setPromoCode, promoError, error, receipt, busy, recentSale, sellable, visible, subtotal, totals, balanceMethod, accounts, client, changeQuantity, changeMethod, addClient, submit, newSale };
}
