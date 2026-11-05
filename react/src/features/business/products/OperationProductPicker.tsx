import EmptyState from "../../../components/common/EmptyState";
import { useState } from "react";
import { Package, Search } from "lucide-react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { businessControlClass } from "../components/BusinessField";
import type { ProductData } from "./products";
import type { StockLine } from "./stockDocuments";

type Props = {
  data: ProductData;
  warehouseId: string;
  lines: StockLine[];
  onClose: () => void;
  onApply: (warehouseId: string, lines: StockLine[]) => void;
};

export default function OperationProductPicker({ data, warehouseId, lines, onClose, onApply }: Props) {
  const [selectedWarehouse, setSelectedWarehouse] = useState(warehouseId);
  const [selected, setSelected] = useState<StockLine[]>(lines);
  const [query, setQuery] = useState("");
  const products = data.products.filter((product) => product.warehouseId === selectedWarehouse);
  const visible = products.filter((product) => `${product.name} ${product.sku}`.toLocaleLowerCase("az-AZ").includes(query.toLocaleLowerCase("az-AZ")));

  function chooseWarehouse(id: string) { setSelectedWarehouse(id); setSelected([]); }
  function toggle(id: string) { setSelected((current) => current.some((line) => line.productId === id) ? current.filter((line) => line.productId !== id) : [...current, { productId: id, amount: 1 }]); }
  function quantity(id: string, amount: number) { setSelected((current) => current.map((line) => line.productId === id ? { ...line, amount: Math.max(1, Math.floor(amount) || 1) } : line)); }

  return <BusinessFormDialog size="stock" title="Məhsul seçimi" description="Sənədə daxil ediləcək məhsulları seçin və miqdarını təyin edin" onClose={onClose}>
    <div className="space-y-3 text-sm">
      <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div><strong className="block text-xs">Məhsul anbarı *</strong><span className="text-[11px] text-slate-500">Əvvəlcə anbarı seçin, sonra məhsulları qeyd edin</span></div>
        <select aria-label="Məhsul anbarı" value={selectedWarehouse} onChange={(event) => chooseWarehouse(event.target.value)} className={`${businessControlClass} bg-white sm:w-64`}>
          {data.warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
        </select>
      </div>
      <div className="relative"><Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Məhsul adı və ya artikol ilə axtarın..." className={`${businessControlClass} pl-10`} /></div>
      <div className="flex items-center justify-between gap-2 text-xs"><div className="flex gap-2"><button type="button" onClick={() => setSelected(products.map((product) => selected.find((line) => line.productId === product.id) ?? { productId: product.id, amount: 1 }))} className="cursor-pointer rounded-lg bg-slate-100 px-2.5 py-1 font-semibold">Hamısını seç</button><button type="button" onClick={() => setSelected([])} className="cursor-pointer rounded-lg bg-slate-100 px-2.5 py-1 font-semibold">Təmizlə</button></div><span className="rounded-lg bg-amber-50 px-2.5 py-1 font-semibold text-amber-800">{selected.length} məhsul seçilib</span></div>
      <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200">
        {visible.length ? visible.map((product) => { const line = selected.find((item) => item.productId === product.id); return <div key={product.id} className={`flex flex-wrap items-center justify-between gap-2 p-3 ${line ? "bg-amber-50/40" : "bg-white"}`}>
          <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3"><input type="checkbox" checked={Boolean(line)} onChange={() => toggle(product.id)} className="mt-1 size-4 accent-amber-500" /><span className="min-w-0"><strong className="block break-words text-xs">{product.name}</strong><small className="block text-[11px] text-slate-500">Qalıq: {product.quantity} {product.unit}{product.sku ? ` · ${product.sku}` : ""}</small></span></label>
          {line && <div className="flex items-center rounded-lg border border-slate-200 bg-white"><button type="button" onClick={() => quantity(product.id, line.amount - 1)} className="min-h-9 min-w-9 cursor-pointer">−</button><input aria-label={`${product.name} miqdarı`} type="number" min="1" step="1" value={line.amount} onChange={(event) => quantity(product.id, Number(event.target.value))} className="w-12 border-x border-slate-200 text-center text-xs outline-none" /><button type="button" onClick={() => quantity(product.id, line.amount + 1)} className="min-h-9 min-w-9 cursor-pointer">+</button></div>}
        </div>; }) : <EmptyState title="Seçilmiş anbarda məhsul tapılmadı" description="Başqa anbar seçin və ya axtarışı dəyişin." icon={Package} compact className="border-0 shadow-none" />}
      </div>
      <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 font-semibold">Ləğv et</button><button type="button" onClick={() => onApply(selectedWarehouse, selected)} className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 font-bold">{selected.length} məhsul əlavə et</button></div>
    </div>
  </BusinessFormDialog>;
}
