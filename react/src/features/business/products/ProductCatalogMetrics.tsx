import { AlertTriangle, Check, CircleDollarSign, Package } from "lucide-react";
import { money, type Product } from "./products";

interface Props {
  products: Product[];
  categoryCount: number;
  stockFilter: string;
  onStockFilterChange: (filter: string) => void;
}

export default function ProductCatalogMetrics({ products, categoryCount, stockFilter, onStockFilterChange }: Props) {
  const available = products.filter((product) => product.quantity > product.minimum).length;
  const critical = products.filter((product) => product.quantity > 0 && product.quantity <= product.minimum).length;
  const out = products.filter((product) => product.quantity === 0).length;
  const cost = products.reduce((sum, product) => sum + product.quantity * product.cost, 0);
  const retail = products.reduce((sum, product) => sum + product.quantity * product.price, 0);
  const metrics = [
    { label: "Ümumi məhsullar", value: String(products.length), detail: `${categoryCount} kateqoriya`, filter: "all", Icon: Package, iconClass: "bg-slate-100 text-slate-700", valueClass: "text-slate-900" },
    { label: "Stokda var", value: String(available), detail: "Kifayət qədər qalıq", filter: "available", Icon: Check, iconClass: "bg-emerald-50 text-emerald-600", valueClass: "text-slate-900" },
    { label: "Kritik qalıq", value: String(critical), detail: `${out} bitmiş`, filter: "low", Icon: AlertTriangle, iconClass: "bg-amber-50 text-amber-600", valueClass: "text-amber-600" },
    { label: "Stok dəyəri", value: money(cost), detail: `Satış: ${money(retail)}`, filter: "", Icon: CircleDollarSign, iconClass: "bg-purple-50 text-purple-600", valueClass: "text-slate-900" },
  ];
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">{metrics.map(({ label, value, detail, filter, Icon, iconClass, valueClass }) => {
    const className = `min-w-0 rounded-2xl border bg-white p-4 text-left shadow-sm transition sm:p-5 ${filter && stockFilter === filter ? "border-slate-900 ring-2 ring-brand-primary/40" : "border-slate-200/80"} ${filter ? "cursor-pointer hover:border-slate-400" : ""}`;
    const content = <><div className="mb-2 flex items-start justify-between gap-1"><span className="text-xs font-semibold text-slate-500">{label}</span><span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${iconClass}`}><Icon size={17} /></span></div><strong className={`block text-2xl font-bold sm:text-3xl ${valueClass}`}>{value}</strong><span className="mt-1 block break-words text-[11px] text-slate-400">{detail}</span></>;
    return filter ? <button key={label} type="button" onClick={() => onStockFilterChange(filter)} aria-pressed={stockFilter === filter} className={className}>{content}</button> : <div key={label} className={className}>{content}</div>;
  })}</div>;
}
