import EmptyState from "../../../components/common/EmptyState";
import { Pencil, Trash2, Package } from "lucide-react";
import BusinessStatusBadge from "../components/BusinessStatusBadge";
import { money, type Product, type ProductData } from "./products";
import ProductTable from "./ProductTable";

export const card = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";
export function Empty({ children }: { children: string }) { return <EmptyState title={children} icon={Package} />; }
export function RowActions({ edit, remove }: { edit: () => void; remove: () => void }) { return <div className="flex shrink-0 items-center gap-1"><button type="button" onClick={edit} aria-label="Redaktə et" className="flex size-10 cursor-pointer items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"><Pencil size={17} /></button><button type="button" onClick={remove} aria-label="Sil" className="flex size-10 cursor-pointer items-center justify-center rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={17} /></button></div>; }
export function ProductList({ products, data, onEdit, onDelete }: { products: Product[]; data: ProductData; onEdit: (item: Product) => void; onDelete: (item: Product) => void }) {
  if (!products.length) return <Empty>Məhsul tapılmadı.</Empty>;
  return <><div className="space-y-2 lg:hidden">{products.map((item) => <article key={item.id} className={`${card} flex flex-wrap items-start gap-2`}><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="break-words text-sm font-bold">{item.name}</h3><BusinessStatusBadge tone={item.quantity === 0 ? "danger" : item.quantity <= item.minimum ? "warning" : "success"}>{item.quantity === 0 ? "Bitib" : item.quantity <= item.minimum ? "Kritik qalıq" : "Stokda var"}</BusinessStatusBadge></div><p className="mt-1 break-words text-xs text-slate-500">{item.sku || "SKU yoxdur"} · {data.categories.find((cat) => cat.id === item.categoryId)?.name ?? "Kateqoriyasız"} · {data.warehouses.find((wh) => wh.id === item.warehouseId)?.name ?? "Anbarsız"}</p><p className="mt-2 text-sm"><strong>{item.quantity} {item.unit}</strong><span className="ml-2 text-slate-500">Min: {item.minimum} · Maya: {money(item.cost)} · Satış: {money(item.price)}</span></p></div><RowActions edit={() => onEdit(item)} remove={() => onDelete(item)} /></article>)}</div><div className="hidden lg:block"><ProductTable products={products} data={data} onEdit={onEdit} onDelete={onDelete} /></div></>;
}
