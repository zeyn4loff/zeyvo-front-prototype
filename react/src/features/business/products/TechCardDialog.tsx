import { useState, type FormEvent } from "react";
import { Box, Search, Wrench, X } from "lucide-react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { businessControlClass as field, businessLabelClass as label, businessTextareaClass as textarea } from "../components/BusinessField";
import type { Product, TechCard, Warehouse } from "./products";
import type { Service } from "../services/services";
import type { ServiceCategory } from "../services/services";
import TechCardServicePicker from "./TechCardServicePicker";

type Ingredient = { productId: string; quantity: number };
type Picker = "service" | "product" | null;
const secondary = "min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 font-bold text-slate-900";
const primary = "min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 font-bold text-slate-900";

export default function TechCardDialog({ initial, products, warehouses: warehouseOptions, services, categories, saveError, onClose, onSave }: {
  initial?: TechCard; products: Product[]; warehouses: Warehouse[]; services: Service[]; categories: ServiceCategory[]; saveError?: string; onClose: () => void; onSave: (card: TechCard) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [serviceId, setServiceId] = useState(initial?.serviceId ?? "");
  const [note, setNote] = useState(initial?.note ?? "");
  const [items, setItems] = useState<Ingredient[]>(initial?.items?.length ? initial.items : initial?.productId ? [{ productId: initial.productId, quantity: initial.quantity }] : []);
  const [picker, setPicker] = useState<Picker>(null);
  const [query, setQuery] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [draftIds, setDraftIds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const service = services.find((item) => item.id === serviceId);
  const warehouses = [...new Set(products.map((item) => item.warehouseId))];
  const total = items.reduce((sum, item) => sum + (products.find((product) => product.id === item.productId)?.cost ?? 0) * item.quantity, 0);
  const normalizedQuery = query.trim().toLocaleLowerCase("az-AZ");
  function openPicker(kind: Picker) {
    setQuery("");
    if (kind === "product") {
      setWarehouseId(products.find((product) => product.id === items[0]?.productId)?.warehouseId ?? warehouses[0] ?? "");
      setDraftIds(items.map((item) => item.productId));
    }
    setPicker(kind);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) { setError("Texnoloji kartın adını daxil edin."); return; }
    if (!serviceId) { setError("Texnoloji kart üçün xidmət seçin."); return; }
    if (!items.length || items.some((item) => !products.some((product) => product.id === item.productId) || !Number.isFinite(item.quantity) || item.quantity <= 0)) {
      setError("Ən azı bir məhsul seçin və miqdarları yoxlayın."); return;
    }
    onSave({ id: initial?.id ?? crypto.randomUUID(), name: name.trim(), serviceId, productId: items[0].productId, quantity: items[0].quantity, items, note: note.trim() });
  }
  function updateQuantity(productId: string, quantity: number) {
    setItems((current) => current.map((item) => item.productId === productId ? { ...item, quantity } : item));
  }
  function applyProducts() {
    setItems((current) => draftIds.map((id) => current.find((item) => item.productId === id) ?? { productId: id, quantity: 1 }));
    setError(""); setPicker(null);
  }
  return <>
    <BusinessFormDialog size="large" title={initial ? "Texnoloji kartı redaktə et" : "Yeni texnoloji kart"} description="Xidmət üzrə material və vasitələrin sərfiyyat norması" error={saveError} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4 text-xs">
        <label className={label}>Texnoloji kartın adı *<input autoFocus required maxLength={120} value={name} onChange={(event) => setName(event.target.value)} placeholder="Məs: Saç boyama (Orta uzunluq)" className={field} /></label>
        <div className="space-y-1.5"><p className={label}>Aid olduğu xidmət *</p><div className="flex gap-2">
          <button type="button" onClick={() => openPicker("service")} className="flex min-h-11 min-w-0 flex-1 cursor-pointer items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-left transition hover:border-slate-400 hover:bg-white">
            <span className="flex min-w-0 items-center gap-2.5"><span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700"><Wrench size={16} /></span><span className={`truncate font-semibold ${service ? "text-slate-900" : "text-slate-400"}`}>{service?.name ?? "Kataloqdan xidmət seçin..."}</span></span><span className="shrink-0 rounded-lg border border-slate-200 bg-white px-2 py-1 font-bold text-slate-700">Xidmət seç</span>
          </button>
          {serviceId && <button type="button" onClick={() => setServiceId("")} aria-label="Xidmət seçimini sil" className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500"><X size={16} /></button>}
        </div></div>
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="font-bold text-slate-800">Sərfiyyat tərkibi (Məhsullar və miqdarlar) *</p><p className="mt-0.5 text-[11px] text-slate-400">Xidmət üzrə istifadə edilən materialların norması</p></div><button type="button" onClick={() => openPicker("product")} className="min-h-9 cursor-pointer rounded-xl bg-brand-primary px-3 font-bold">+ Məhsul əlavə et</button></div>
          {items.length ? <div className="space-y-2"><div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {items.map((item) => { const product = products.find((entry) => entry.id === item.productId); return <div key={item.productId} className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0"><p className="break-words font-bold text-slate-900">{product?.name ?? "Silinmiş məhsul"}</p><p className="mt-0.5 text-[11px] text-slate-500">Maya dəyəri: {(product?.cost ?? 0).toFixed(2)} ₼ / {product?.unit ?? "ədəd"} · <strong className="text-amber-800">Cəmi: {((product?.cost ?? 0) * item.quantity).toFixed(2)} ₼</strong></p></div>
              <div className="flex shrink-0 items-center gap-2"><div className="flex h-9 items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><button type="button" aria-label="Miqdarı azalt" onClick={() => updateQuantity(item.productId, Math.max(0.01, +(item.quantity - 1).toFixed(2)))} className="h-full w-9 cursor-pointer font-bold">−</button><input type="number" aria-label={`${product?.name ?? "Məhsul"} miqdarı`} min="0.01" step="any" value={item.quantity} onChange={(event) => updateQuantity(item.productId, Number(event.target.value))} className="w-14 bg-transparent text-center font-bold outline-none" /><button type="button" aria-label="Miqdarı artır" onClick={() => updateQuantity(item.productId, +(item.quantity + 1).toFixed(2))} className="h-full w-9 cursor-pointer font-bold">+</button></div><span className="w-9 text-center text-slate-500">{product?.unit ?? "ədəd"}</span><button type="button" aria-label="Məhsulu sil" onClick={() => setItems((current) => current.filter((entry) => entry.productId !== item.productId))} className="flex size-9 cursor-pointer items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"><X size={16} /></button></div>
            </div>; })}
          </div><div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3.5 font-bold text-amber-950"><span>Xidmət üzrə materialların cəmi maya dəyəri:</span><strong className="text-sm">{total.toFixed(2)} ₼</strong></div></div> : <div className="space-y-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center"><span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><Box size={20} /></span><p className="font-bold text-slate-800">Sərfiyyat materialı əlavə edilməyib</p><p className="text-[11px] text-slate-400">Xidmət zamanı istifadə olunan boya, preparat, şampun və ya birdəfəlik vasitələri əlavə edin</p><button type="button" onClick={() => openPicker("product")} className="min-h-9 cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 font-bold">+ Məhsul seç</button></div>}
        </div>
        <label className={label}>Təlimat və qeydlər<textarea rows={3} maxLength={300} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Usta üçün qarışdırma və tətbiq qaydaları..." className={textarea} /></label>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className={secondary}>Ləğv et</button><button type="submit" className={primary}>Kartı saxla</button></div>
      </form>
    </BusinessFormDialog>
    {picker === "service" && (
      <TechCardServicePicker
        services={services}
        categories={categories}
        selectedId={serviceId}
        onSelect={(id) => { setServiceId(id); setError(""); setPicker(null); }}
        onClose={() => setPicker(null)}
      />
    )}
    {picker === "product" && <BusinessFormDialog size="medium" title="Sərfiyyat məhsullarının seçimi" description="Texnoloji karta daxil ediləcək material və preparatları seçin" onClose={() => setPicker(null)}><div className="space-y-3"><label className={label}>Məhsul anbarı<select value={warehouseId} onChange={(event) => setWarehouseId(event.target.value)} className={`${field} cursor-pointer`}>{warehouses.map((id) => <option key={id} value={id}>{warehouseOptions.find((item) => item.id === id)?.name ?? "Anbarsız"}</option>)}</select></label><PickerSearch value={query} onChange={setQuery} placeholder="Məhsul adı ilə axtarın..." /><div className="max-h-72 divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50">{products.filter((item) => item.warehouseId === warehouseId && `${item.name} ${item.sku}`.toLocaleLowerCase("az-AZ").includes(normalizedQuery)).map((item) => <label key={item.id} className="flex min-h-11 cursor-pointer items-center gap-3 px-4 py-2 hover:bg-amber-50"><input type="checkbox" checked={draftIds.includes(item.id)} onChange={(event) => setDraftIds((current) => event.target.checked ? [...current, item.id] : current.filter((id) => id !== item.id))} className="size-4 accent-slate-900" /><span className="min-w-0 flex-1 break-words text-xs font-semibold">{item.name}</span><span className="shrink-0 text-[11px] text-slate-500">{item.cost.toFixed(2)} ₼ / {item.unit}</span></label>)}{!products.length && <p className="p-4 text-xs text-slate-500">Əvvəlcə məhsul əlavə edin.</p>}</div><div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3"><span className="text-xs text-slate-500">{draftIds.length} məhsul seçilib</span><div className="flex gap-2"><button type="button" onClick={() => setPicker(null)} className={secondary}>Bağla</button><button type="button" onClick={applyProducts} className={primary}>Tətbiq et</button></div></div></div></BusinessFormDialog>}
  </>;
}

function PickerSearch({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="relative block"><Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><span className="sr-only">{placeholder}</span><input autoFocus value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={`${field} mt-0 pl-9`} /></label>;
}
