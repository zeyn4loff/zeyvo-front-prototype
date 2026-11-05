import EmptyState from "../../../components/common/EmptyState";
import { FileInput, Handshake, Mail, MapPin, Pencil, Phone, Plus, Search, Trash2, UserRound, X, Truck } from "lucide-react";
import { useState } from "react";
import type { ProductData, Supplier } from "./products";
import ProductMetricCard from "./ProductMetricCard";

type Props = {
  suppliers: Supplier[];
  operations: ProductData["operations"];
  onCreate: () => void;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
  onReceipt: (supplier: Supplier) => void;
};

function documentCount(supplier: Supplier, operations: ProductData["operations"]) {
  const name = supplier.name.trim().toLocaleLowerCase("az-AZ");
  return new Set(operations.filter((item) => item.type === "receipt" && (item.supplierId ? item.supplierId === supplier.id : item.supplierName?.trim().toLocaleLowerCase("az-AZ") === name)).map((item) => item.documentId ?? item.id)).size;
}

function SupplierDetail({ icon: Icon, label, children }: { icon: typeof UserRound; label: string; children: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2 text-xs leading-5">
    <Icon size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
    <span className="shrink-0 text-slate-400">{label}:</span>
    <span className="min-w-0 truncate font-medium text-slate-800">{children}</span>
  </div>;
}

function SupplierCard({ supplier, operations, onEdit, onDelete, onReceipt }: { supplier: Supplier; operations: ProductData["operations"]; onEdit: () => void; onDelete: () => void; onReceipt: () => void }) {
  const initials = supplier.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toLocaleUpperCase("az-AZ") ?? "").join("") || "T";
  return <article className="flex min-w-0 flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
    <div className="min-w-0 space-y-3">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-100 text-xs font-bold text-amber-900" aria-hidden="true">{initials}</div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900" title={supplier.name}>{supplier.name}</h3>
            {supplier.voen ? <span className="mt-0.5 inline-block max-w-full truncate rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">VÖEN: {supplier.voen}</span> : <span className="mt-0.5 block text-[10px] text-slate-400">Kontragent</span>}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={onEdit} aria-label={`${supplier.name} redaktə et`} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"><Pencil size={16} /></button>
          <button type="button" onClick={onDelete} aria-label={`${supplier.name} sil`} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button>
        </div>
      </div>
      <div className="space-y-1.5 border-t border-slate-100 pt-2 text-slate-600">
        {supplier.contact && <SupplierDetail icon={UserRound} label="Şəxs">{supplier.contact}</SupplierDetail>}
        {supplier.phone && <SupplierDetail icon={Phone} label="Tel"><a href={`tel:${supplier.phone}`} className="hover:text-amber-700">{supplier.phone}</a></SupplierDetail>}
        {supplier.email && <SupplierDetail icon={Mail} label="E-poçt"><a href={`mailto:${supplier.email}`} className="hover:text-amber-700">{supplier.email}</a></SupplierDetail>}
        {supplier.address && <SupplierDetail icon={MapPin} label="Ünvan">{supplier.address}</SupplierDetail>}
      </div>
      {supplier.note && <p className="line-clamp-2 rounded-xl border border-slate-100 bg-slate-50 p-2 text-[11px] font-normal text-slate-500" title={supplier.note}>{supplier.note}</p>}
    </div>
    <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
      <span className="text-slate-500">Sənədlər: <strong className="font-semibold text-slate-800">{documentCount(supplier, operations)}</strong></span>
      <button type="button" onClick={onReceipt} className="inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-1 rounded-lg bg-slate-100 px-2.5 text-[11px] font-semibold text-slate-700 transition hover:bg-brand-primary hover:text-slate-900"><Plus size={13} />Mədaxil et</button>
    </div>
  </article>;
}

export default function SupplierSection({ suppliers, operations, onCreate, onEdit, onDelete, onReceipt }: Props) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("az-AZ");
  const filtered = suppliers.filter((item) => [item.name, item.contact, item.phone, item.email, item.voen, item.address].some((value) => value?.toLocaleLowerCase("az-AZ").includes(normalizedQuery)));
  const receiptCount = new Set(operations.filter((item) => item.type === "receipt").map((item) => item.documentId ?? item.id)).size;

  return <section className="space-y-5" aria-label="Təchizatçılar siyahısı">
    <div className="grid gap-3 sm:grid-cols-3">
      <ProductMetricCard label="Ümumi təchizatçılar" value={suppliers.length} detail="kontragent" icon={Truck} iconClassName="bg-blue-50 text-blue-600" />
      <ProductMetricCard label="Aktiv tərəfdaşlar" value={suppliers.length} detail="şirkət" icon={Handshake} iconClassName="bg-emerald-50 text-emerald-600" valueClassName="text-emerald-700" />
      <ProductMetricCard label="Mədaxil əməliyyatları" value={receiptCount} detail="sənəd" icon={FileInput} iconClassName="bg-amber-50 text-amber-600" />
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
      <label className="flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 focus-within:border-slate-900 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-primary/40">
        <Search size={16} className="shrink-0 text-slate-400" aria-hidden="true" />
        <input aria-label="Təchizatçı axtar" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Təchizatçı adı, VÖEN, əlaqədar şəxs və ya nömrə ilə axtarın..." className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none placeholder:text-slate-400" />
        {query && <button type="button" onClick={() => setQuery("")} aria-label="Axtarışı təmizlə" className="flex size-8 shrink-0 cursor-pointer items-center justify-center text-slate-400 hover:text-slate-700"><X size={16} /></button>}
      </label>
    </div>
    {filtered.length ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{filtered.map((supplier) => <SupplierCard key={supplier.id} supplier={supplier} operations={operations} onEdit={() => onEdit(supplier)} onDelete={() => onDelete(supplier)} onReceipt={() => onReceipt(supplier)} />)}</div> : <EmptyState title={normalizedQuery ? "Axtarışa uyğun təchizatçı tapılmadı" : "Təchizatçı siyahısı boşdur"} description={normalizedQuery ? "Axtarışı dəyişərək yenidən yoxlayın" : "Yeni təchizatçı əlavə edin"} icon={Truck} actionLabel={normalizedQuery ? "Axtarışı sıfırla" : "Yeni təchizatçı əlavə et"} onAction={normalizedQuery ? () => setQuery("") : onCreate} />}
  </section>;
}
