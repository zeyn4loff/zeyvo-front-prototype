import { Building2, MapPin, Pencil, Trash2, UserRound } from "lucide-react";
import EmptyState from "../../../components/common/EmptyState";
import type { Product, Warehouse } from "./products";

type Props = {
  warehouses: Warehouse[];
  products: Product[];
  onEdit: (warehouse: Warehouse) => void;
  onDelete: (warehouse: Warehouse) => void;
};

function WarehouseCard({ warehouse, productCount, onEdit, onDelete }: { warehouse: Warehouse; productCount: number; onEdit: () => void; onDelete: () => void }) {
  const isDefault = warehouse.isDefault || warehouse.id === "wh_1";
  const typeName = warehouse.typeName ?? (isDefault ? "Mərkəzi anbar" : "Filial anbarı");
  const typeTone = isDefault ? "border-amber-200 bg-amber-50 text-amber-900" : typeName === "Kabinet vitrini" ? "border-blue-200 bg-blue-50 text-blue-900" : "border-slate-200 bg-slate-100 text-slate-800";

  return <article className="flex min-w-0 flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300">
    <div className="min-w-0 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-700"><Building2 size={20} /></span>
          <div className="min-w-0"><h3 className="truncate text-sm font-bold text-slate-900" title={warehouse.name}>{warehouse.name}</h3><span className={`mt-0.5 inline-block rounded-md border px-2 py-0.5 text-[10px] font-semibold ${typeTone}`}>{typeName}</span></div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={onEdit} aria-label={`${warehouse.name}: redaktə et`} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"><Pencil size={16} /></button>
          {!isDefault && <button type="button" onClick={onDelete} aria-label={`${warehouse.name}: sil`} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button>}
        </div>
      </div>
      <div className="space-y-1.5 border-t border-slate-100 pt-1 text-xs text-slate-600">
        <div className="flex min-w-0 items-center gap-2"><UserRound size={14} className="shrink-0 text-slate-400" /><span className="shrink-0 text-slate-500">Məsul:</span><span className="truncate font-semibold text-slate-800">{warehouse.responsible || "Təyin edilməyib"}</span></div>
        <div className="flex min-w-0 items-center gap-2"><MapPin size={14} className="shrink-0 text-slate-400" /><span className="shrink-0 text-slate-500">Ünvan:</span><span className="truncate font-medium text-slate-700" title={warehouse.address}>{warehouse.address || "Ünvan qeyd edilməyib"}</span></div>
      </div>
      {warehouse.notes && <p className="line-clamp-2 rounded-xl border border-slate-100 bg-slate-50 p-2 text-[11px] text-slate-500">{warehouse.notes}</p>}
    </div>
    <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs"><span className="text-slate-500">Saxlanılan məhsul:</span><strong className="text-slate-900">{productCount} növ</strong></div>
  </article>;
}

export default function WarehouseSection({ warehouses, products, onEdit, onDelete }: Props) {
  if (!warehouses.length) return <EmptyState title="Anbar yoxdur" description="Məhsulları saxlamaq üçün yeni anbar əlavə edin." icon={Building2} />;
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{warehouses.map((warehouse) => <WarehouseCard key={warehouse.id} warehouse={warehouse} productCount={products.filter((product) => product.warehouseId === warehouse.id).length} onEdit={() => onEdit(warehouse)} onDelete={() => onDelete(warehouse)} />)}</div>;
}
