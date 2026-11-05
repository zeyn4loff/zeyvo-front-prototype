import { useState } from "react";
import { ChevronDown, Package, Pencil, Plus, Trash2 } from "lucide-react";
import EmptyState from "../../../components/common/EmptyState";
import { CategoryIconView } from "../components/CategoryIconPicker";
import { money, type Product, type ProductCategory } from "./products";

interface Props {
  categories: ProductCategory[];
  products: Product[];
  showEmptyCategories: boolean;
  onCreateCategory: () => void;
  onEditCategory: (category: ProductCategory) => void;
  onDeleteCategory: (category: ProductCategory) => void;
  onCreateProduct: (categoryId: string) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

const categoryAction = "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 sm:size-7";
const productAction = "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700 sm:size-7";

function ProductRow({ product, onEdit, onDelete }: { product: Product; onEdit: () => void; onDelete: () => void }) {
  const stockTone = product.quantity === 0 ? "border-rose-200 bg-rose-50 text-rose-700" : product.quantity <= product.minimum ? "border-amber-200 bg-amber-50 text-amber-800" : "border-emerald-200 bg-emerald-50 text-emerald-700";
  return <div className="relative rounded-xl border border-slate-200/70 bg-slate-50/80 p-3 transition hover:bg-white sm:p-3.5 before:absolute before:-left-[18px] before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-slate-200 sm:before:-left-[22px] sm:before:w-5">
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2"><strong className="min-w-0 break-words text-sm text-slate-900">{product.name}</strong><span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-900">{product.kind === "retail" ? "Satış üçün" : "Sərfiyyat"}</span></div>
        <p className="mt-1 break-all text-xs text-slate-400">{product.sku || "Artikol yoxdur"}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 sm:justify-end">
        <div className="text-left sm:text-right"><strong className="block text-sm text-slate-900">{product.kind === "retail" ? money(product.price) : "—"}</strong><span className="text-xs text-slate-400">Maya: {money(product.cost)}</span></div>
        <span className={`rounded-lg border px-2 py-1 text-xs font-semibold ${stockTone}`}>● {product.quantity} {product.unit}</span>
        <div className="flex items-center gap-1"><button type="button" onClick={onEdit} aria-label={`${product.name} redaktə et`} className={productAction}><Pencil size={16} /></button><button type="button" onClick={onDelete} aria-label={`${product.name} sil`} className={`${productAction} hover:text-rose-600`}><Trash2 size={16} /></button></div>
      </div>
    </div>
  </div>;
}

function CategoryGroup({ category, products, onEditCategory, onDeleteCategory, onCreateProduct, onEditProduct, onDeleteProduct }: Omit<Props, "categories" | "showEmptyCategories" | "onCreateCategory"> & { category: ProductCategory }) {
  const [collapsed, setCollapsed] = useState(false);
  return <article className="min-w-0 px-4 py-5 sm:px-6 sm:py-6">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-700"><CategoryIconView name={category.icon} size={20} /></span>
        <button type="button" onClick={() => setCollapsed(!collapsed)} aria-expanded={!collapsed} aria-label={`${category.name}: ${collapsed ? "məhsulları göstər" : "məhsulları qatla"}`} className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100"><ChevronDown size={16} className={`transition-transform duration-200 ${collapsed ? "-rotate-90" : ""}`} /></button>
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><button type="button" onClick={() => setCollapsed(!collapsed)} className="min-w-0 cursor-pointer break-words text-left text-sm font-bold text-slate-900 hover:underline">{category.name}</button><span className="shrink-0 rounded-md border border-amber-200/60 bg-amber-100/70 px-2 py-0.5 text-[10px] font-semibold text-amber-900">{products.length} məhsul</span></div>{category.description && <p className="mt-1 break-words text-xs text-slate-500">{category.description}</p>}</div>
      </div>
      <div className="flex shrink-0 self-end items-center gap-1"><button type="button" onClick={() => onEditCategory(category)} aria-label={`${category.name} kateqoriyasını redaktə et`} className={categoryAction}><Pencil size={15} /></button><button type="button" onClick={() => onDeleteCategory(category)} aria-label={`${category.name} kateqoriyasını sil`} className={`${categoryAction} hover:border-rose-200 hover:text-rose-600`}><Trash2 size={15} /></button></div>
    </div>
    {!collapsed && <div className="ml-2 mt-3 space-y-2 border-l-2 border-slate-200 pl-4 sm:ml-3 sm:pl-5">
      {products.map((product) => <ProductRow key={product.id} product={product} onEdit={() => onEditProduct(product)} onDelete={() => onDeleteProduct(product)} />)}
      <button type="button" onClick={() => onCreateProduct(category.id)} className="relative flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-medium text-slate-800 transition hover:border-amber-300 hover:bg-brand-primary before:absolute before:-left-[18px] before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-slate-200 sm:before:-left-[22px] sm:before:w-5"><Plus size={16} />Məhsul əlavə et</button>
    </div>}
  </article>;
}

export default function ProductCatalog({ categories, products, showEmptyCategories, onCreateCategory, onEditCategory, onDeleteCategory, onCreateProduct, onEditProduct, onDeleteProduct }: Props) {
  const groups = categories.filter((category) => showEmptyCategories || products.some((product) => product.categoryId === category.id));
  const uncategorized = products.filter((product) => !categories.some((category) => category.id === product.categoryId));
  if (!groups.length && !uncategorized.length) return <EmptyState icon={Package} title={categories.length ? "Heç bir məhsul tapılmadı" : "Kateqoriya əlavə edilməyib"} description={categories.length ? "Axtarış və ya filtr meyarlarını dəyişin." : "Məhsulları əlavə etmək üçün əvvəlcə kateqoriya yaradın."} actionLabel="Yeni kateqoriya" onAction={onCreateCategory} />;
  return <section aria-label="Məhsul kateqoriyaları" className="min-w-0 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    {groups.map((category) => <CategoryGroup key={category.id} category={category} products={products.filter((product) => product.categoryId === category.id)} onEditCategory={onEditCategory} onDeleteCategory={onDeleteCategory} onCreateProduct={onCreateProduct} onEditProduct={onEditProduct} onDeleteProduct={onDeleteProduct} />)}
    {uncategorized.length > 0 && <div className="p-4 sm:p-5"><h3 className="mb-3 text-sm font-bold">Kateqoriyasız</h3><div className="space-y-2">{uncategorized.map((product) => <ProductRow key={product.id} product={product} onEdit={() => onEditProduct(product)} onDelete={() => onDeleteProduct(product)} />)}</div></div>}
  </section>;
}
