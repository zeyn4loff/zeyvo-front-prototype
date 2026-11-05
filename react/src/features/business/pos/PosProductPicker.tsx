import EmptyState from "../../../components/common/EmptyState";
import { Package, Search } from "lucide-react";
import { BusinessTabButton, BusinessTabRail } from "../components/BusinessTabs";
import { formatMoney } from "../finance/finance";
import type { Product, ProductData } from "../products/products";
import type { CartItem } from "./pos";
import { field } from "./posUi";

type Props = { products: ProductData; sellable: Product[]; visible: Product[]; cart: CartItem[]; query: string; category: string; onQuery: (value: string) => void; onCategory: (value: string) => void; onQuantity: (productId: string, difference: number) => void };
export default function PosProductPicker({ products, sellable, visible, cart, query, category, onQuery, onCategory, onQuantity }: Props) {
  return (
        <div className="min-w-0 p-4 sm:p-6 lg:overflow-y-auto"><div className="relative"><Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={18} /><input aria-label="Məhsul axtar" value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Məhsul adı və ya SKU" className={`${field} pl-10`} /></div>
          <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" aria-label="POS məhsul kateqoriyaları"><BusinessTabRail centered><BusinessTabButton active={category === "all"} onClick={() => onCategory("all")}>Bütün məhsullar ({sellable.length})</BusinessTabButton>{products.categories.filter((item) => sellable.some((product) => product.categoryId === item.id)).map((item) => <BusinessTabButton key={item.id} active={category === item.id} onClick={() => onCategory(item.id)}>{item.name}</BusinessTabButton>)}</BusinessTabRail></div>
          {visible.length ? <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">{visible.map((item) => { const inCart = cart.find((line) => line.productId === item.id)?.quantity ?? 0; return <button key={item.id} type="button" onClick={() => onQuantity(item.id, 1)} disabled={item.quantity <= inCart} className="min-w-0 cursor-pointer rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-lime-400 disabled:cursor-not-allowed disabled:opacity-50"><span className="flex size-9 items-center justify-center rounded-xl bg-slate-100"><Package size={18} /></span><span className="mt-2 block break-words text-sm font-bold">{item.name}</span><span className="mt-1 block truncate text-xs text-slate-500">{item.sku}</span><span className="mt-3 flex items-end justify-between gap-2"><strong className="text-sm">{formatMoney(item.price)}</strong><span className="text-xs text-slate-500">Qalıq: {item.quantity}</span></span>{inCart > 0 && <span className="mt-2 block text-xs font-bold text-amber-700">Səbətdə: {inCart}</span>}</button>; })}</div> : <EmptyState title="Satış üçün məhsul tapılmadı" description="Başqa anbar seçin və ya axtarışı dəyişin." icon={Package} compact className="mt-4" />}
        </div>
  );
}
