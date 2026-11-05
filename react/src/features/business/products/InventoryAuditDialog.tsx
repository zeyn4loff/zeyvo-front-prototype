import EmptyState from "../../../components/common/EmptyState";
import { useState, type FormEvent } from "react";
import { Building2, ClipboardList, Minus, Plus, Search, Trash2 } from "lucide-react";
import BusinessDatePicker from "../components/BusinessDatePicker";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { businessControlClass, businessLabelClass } from "../components/BusinessField";
import { localToday } from "../components/businessDate";
import type { Product, ProductData } from "./products";
import type { StockInput, StockLine } from "./stockDocuments";

type Props = {
  data: ProductData;
  defaultWarehouseId?: string;
  error?: string;
  onClose: () => void;
  onSave: (input: StockInput) => void;
};

const action = "inline-flex min-h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 text-xs font-bold transition active:scale-95";

function InventoryProductPicker({ data, warehouseId, selected, onClose, onApply }: {
  data: ProductData; warehouseId: string; selected: StockLine[]; onClose: () => void;
  onApply: (warehouseId: string, lines: StockLine[]) => void;
}) {
  const [currentWarehouse, setCurrentWarehouse] = useState(warehouseId);
  const [query, setQuery] = useState("");
  const [ids, setIds] = useState(() => new Set(selected.map((line) => line.productId)));
  const available = data.products.filter((item) => item.warehouseId === currentWarehouse);
  const visible = available.filter((item) => `${item.name} ${item.sku}`.toLocaleLowerCase("az-AZ").includes(query.toLocaleLowerCase("az-AZ")));
  function changeWarehouse(id: string) { setCurrentWarehouse(id); setIds(new Set(id === warehouseId ? selected.map((line) => line.productId) : [])); }
  function toggle(id: string) { setIds((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; }); }
  function apply() {
    onApply(currentWarehouse, available.filter((item) => ids.has(item.id)).map((item) => selected.find((line) => line.productId === item.id) ?? { productId: item.id, amount: item.quantity }));
  }
  return <BusinessFormDialog size="stock" title="Məhsul seçimi" description="İnventarizasiya aktına daxil ediləcək məhsulları işarələyin" onClose={onClose}>
    <div className="space-y-3 text-sm">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-3 sm:flex sm:items-center sm:justify-between sm:gap-3">
        <div><strong className="block text-xs">Sayım anbarı *</strong><span className="text-[11px] text-slate-500">Əvvəlcə anbarı seçin, sonra məhsulları qeyd edin</span></div>
        <select aria-label="Sayım anbarı" value={currentWarehouse} onChange={(event) => changeWarehouse(event.target.value)} className={`${businessControlClass} mt-2 bg-white sm:mt-0 sm:w-56`}>
          {data.warehouses.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>
      <div className="relative"><Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Məhsul adı və ya artikol ilə axtarın" className={`${businessControlClass} pl-9`} /></div>
      <div className="flex items-center justify-between gap-2 text-xs"><div className="flex gap-2"><button type="button" onClick={() => setIds(new Set(available.map((item) => item.id)))} className={`${action} bg-slate-100`}>Hamısını seç</button><button type="button" onClick={() => setIds(new Set())} className={`${action} bg-slate-100`}>Təmizlə</button></div><span className="text-slate-500">{ids.size} məhsul</span></div>
      <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200">{visible.length ? visible.map((item) => <label key={item.id} className="flex cursor-pointer items-center gap-3 p-3 hover:bg-slate-50"><input type="checkbox" checked={ids.has(item.id)} onChange={() => toggle(item.id)} className="size-4 accent-amber-500" /><span className="min-w-0"><strong className="block break-words text-xs">{item.name}</strong><small className="text-slate-500">{item.sku || "SKU yoxdur"} · Qalıq: {item.quantity} {item.unit}</small></span></label>) : <EmptyState title="Bu anbarda məhsul tapılmadı" description="Başqa anbar seçin və ya axtarışı dəyişin." icon={ClipboardList} compact className="border-0 shadow-none" />}</div>
      <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className={`${action} bg-slate-100 px-5`}>Ləğv et</button><button type="button" onClick={apply} className={`${action} bg-brand-primary px-5`}>{ids.size} məhsul əlavə et</button></div>
    </div>
  </BusinessFormDialog>;
}

function AuditQuantity({ product, line, onChange }: { product: Product; line: StockLine; onChange: (amount: number) => void }) {
  const difference = line.amount - product.quantity;
  const normalized = (value: number) => Math.max(0, Math.floor(value) || 0);
  return <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5">
    <button type="button" aria-label={`${product.name}: azalt`} onClick={() => onChange(normalized(line.amount - 1))} className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white"><Minus size={14} /></button>
    <input aria-label={`${product.name}: faktiki sayım`} type="number" min="0" step="1" value={line.amount} onChange={(event) => onChange(normalized(Number(event.target.value)))} className="w-12 bg-transparent text-center text-xs font-bold outline-none" />
    <button type="button" aria-label={`${product.name}: artır`} onClick={() => onChange(normalized(line.amount + 1))} className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white"><Plus size={14} /></button>
    <span className="sr-only">Fərq {difference > 0 ? "+" : ""}{difference}</span>
  </div>;
}

function AuditMobileLine({ product, line, onChange, onRemove }: { product: Product; line: StockLine; onChange: (amount: number) => void; onRemove: () => void }) {
  const difference = line.amount - product.quantity;
  const differenceColor = difference < 0 ? "border-rose-200 bg-rose-50 text-rose-700" : difference > 0 ? "border-amber-200 bg-amber-50 text-amber-800" : "border-emerald-200 bg-emerald-50 text-emerald-700";
  return <article className="space-y-3 border-b border-slate-100 bg-white p-3 last:border-b-0 sm:hidden">
    <div className="flex items-start justify-between gap-2"><div className="min-w-0"><strong className="block break-words text-xs">{product.name}</strong><span className="text-[11px] text-slate-400">{product.sku || "SKU yoxdur"}</span></div><button type="button" aria-label={`${product.name}: sil`} onClick={onRemove} className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button></div>
    <div className="flex flex-wrap items-end justify-between gap-3"><div><span className="block text-[11px] text-slate-500">Sistem qalığı</span><strong className="text-xs">{product.quantity} {product.unit}</strong></div><div><span className="mb-1 block text-[11px] text-slate-500">Faktiki sayım</span><AuditQuantity product={product} line={line} onChange={onChange} /></div></div>
    <div className="flex items-center justify-between border-t border-slate-100 pt-2"><span className="text-[11px] text-slate-500">Fərq</span><span className={`inline-flex whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-bold ${differenceColor}`}>{difference > 0 ? "+" : ""}{difference} {product.unit}</span></div>
  </article>;
}

export default function InventoryAuditDialog({ data, defaultWarehouseId, error, onClose, onSave }: Props) {
  const [warehouseId, setWarehouseId] = useState(defaultWarehouseId || data.warehouses[0]?.id || "");
  const [date, setDate] = useState(localToday);
  const [lines, setLines] = useState<StockLine[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const available = data.products.filter((item) => item.warehouseId === warehouseId);
  function patch(id: string, amount: number) { setLines((current) => current.map((item) => item.productId === id ? { ...item, amount } : item)); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSave({ mode: "inventory", lines, warehouseId, destinationWarehouseId: "", supplierId: "", date, responsible: String(form.get("responsible") ?? "").trim(), note: String(form.get("note") ?? "").trim() });
  }
  return <BusinessFormDialog size="wide" title="Yeni inventarizasiya aktı" description="Faktiki sayım nəticələrini qeyd edin və qalıqları uyğunlaşdırın" onClose={onClose}>
    <form onSubmit={submit} className="space-y-4 text-xs">
      <div className="grid gap-3 sm:grid-cols-3"><label className={businessLabelClass}>Anbar *<select required value={warehouseId} onChange={(event) => { setWarehouseId(event.target.value); setLines([]); }} className={businessControlClass}><option value="" disabled>Seçin</option>{data.warehouses.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><div className={businessLabelClass}>Tarix *<BusinessDatePicker value={date} onChange={setDate} label="İnventarizasiya tarixi" /></div><label className={businessLabelClass}>Məsul komissiya<input name="responsible" maxLength={120} placeholder="Məs: Rauf Ə. və Aysel Q." className={businessControlClass} /></label></div>
      <section className="space-y-2.5"><div className="flex flex-wrap items-center justify-between gap-2"><div><strong className="block text-xs">Sayım cədvəli</strong><span className="text-[11px] text-slate-400">Yoxlanılacaq məhsulların faktiki miqdarını daxil edin</span></div><div className="flex flex-wrap gap-1.5"><button type="button" onClick={() => setPickerOpen(true)} className={`${action} bg-brand-primary`}><Plus size={15} />Məhsul seç</button><button type="button" onClick={() => setLines(available.map((item) => lines.find((line) => line.productId === item.id) ?? { productId: item.id, amount: item.quantity }))} className={`${action} bg-slate-100 text-slate-700`}><Building2 size={15} /><span className="hidden sm:inline">Bütün anbarı doldur</span><span className="sm:hidden">Hamısı</span></button>{lines.length > 0 && <button type="button" onClick={() => setLines([])} className={`${action} bg-slate-100 text-slate-500`}>Təmizlə</button>}</div></div>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50">{lines.length ? <div className="max-h-64 overflow-auto"><div className="sm:hidden">{lines.map((line) => { const product = available.find((item) => item.id === line.productId); return product ? <AuditMobileLine key={product.id} product={product} line={line} onChange={(amount) => patch(product.id, amount)} onRemove={() => setLines((current) => current.filter((entry) => entry.productId !== product.id))} /> : null; })}</div><table className="hidden w-full min-w-[820px] text-left text-xs sm:table"><thead className="sticky top-0 bg-slate-50 text-slate-600"><tr><th className="w-[36%] px-3 py-2.5">Məhsul və artikol</th><th className="w-[16%] px-3 py-2.5 text-center">Sistem qalığı</th><th className="w-[23%] px-3 py-2.5 text-center">Faktiki sayım</th><th className="w-[17%] px-3 py-2.5 text-center">Fərq</th><th className="w-[8%] px-3 py-2.5 text-right">Sil</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{lines.map((line) => { const item = available.find((product) => product.id === line.productId); if (!item) return null; const difference = line.amount - item.quantity; return <tr key={item.id}><td className="px-3 py-2.5"><strong className="block">{item.name}</strong><span className="text-[11px] text-slate-400">{item.sku || "SKU yoxdur"}</span></td><td className="whitespace-nowrap px-3 py-2.5 text-center font-semibold">{item.quantity} {item.unit}</td><td className="px-3 py-2.5 text-center"><AuditQuantity product={item} line={line} onChange={(amount) => patch(item.id, amount)} /></td><td className="px-3 py-2.5 text-center"><span className={`inline-flex whitespace-nowrap rounded-md border px-2 py-0.5 font-bold ${difference < 0 ? "border-rose-200 bg-rose-50 text-rose-700" : difference > 0 ? "border-amber-200 bg-amber-50 text-amber-800" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>{difference > 0 ? "+" : ""}{difference} {item.unit}</span></td><td className="px-3 py-2.5 text-right"><button type="button" aria-label={`${item.name}: sil`} onClick={() => setLines((current) => current.filter((entry) => entry.productId !== item.id))} className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button></td></tr>; })}</tbody></table></div> : <EmptyState title="Sayım üçün məhsul seçilməyib" description="Məhsul seçin və ya anbardakı bütün malları əlavə edin." icon={ClipboardList} compact className="border-0 shadow-none" action={<><button type="button" onClick={() => setPickerOpen(true)} className={`${action} bg-brand-primary`}><Plus size={15} />Məhsul seç</button><button type="button" onClick={() => setLines(available.map((item) => ({ productId: item.id, amount: item.quantity })))} className={`${action} bg-slate-100`}>Bütün anbarı doldur</button></>} />}</div>
      </section>
      <label className={businessLabelClass}>Qeyd və nəticə<textarea name="note" maxLength={300} rows={2} placeholder="Komissiya rəyi və ya səbəblər..." className={`${businessControlClass} py-3`} /></label>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}
      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 font-semibold">Ləğv et</button><button type="submit" className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 font-bold">İnventarizasiyanı təsdiqlə</button></div>
    </form>
    {pickerOpen && <InventoryProductPicker data={data} warehouseId={warehouseId} selected={lines} onClose={() => setPickerOpen(false)} onApply={(nextWarehouse, nextLines) => { setWarehouseId(nextWarehouse); setLines(nextLines); setPickerOpen(false); }} />}
  </BusinessFormDialog>;
}
