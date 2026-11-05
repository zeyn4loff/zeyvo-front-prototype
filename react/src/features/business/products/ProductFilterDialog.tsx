import { businessControlClass } from "../components/BusinessField";
import { businessLabelClass } from "../components/BusinessField";
import type { Dispatch, SetStateAction } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import type { ProductData } from "./products";

type Props = { data: ProductData; warehouse: string; category: string; stockFilter: string; setWarehouse: Dispatch<SetStateAction<string>>; setCategory: Dispatch<SetStateAction<string>>; setStockFilter: Dispatch<SetStateAction<string>>; onClose: () => void };
export default function ProductFilterDialog({ data, warehouse, category, stockFilter, setWarehouse, setCategory, setStockFilter, onClose }: Props) {
  return (
    <BusinessFormDialog title="Məhsul filtrləri" size="medium" onClose={onClose}><div className="space-y-3">
      <label className={businessLabelClass}>Anbar<select value={warehouse} onChange={(event) => setWarehouse(event.target.value)} className={businessControlClass}><option value="auto">Cari filial</option><option value="all">Bütün anbarlar</option>{data.warehouses.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label className={businessLabelClass}>Kateqoriya<select value={category} onChange={(event) => setCategory(event.target.value)} className={businessControlClass}><option value="all">Bütün kateqoriyalar</option>{data.categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label className={businessLabelClass}>Qalıq<select value={stockFilter} onChange={(event) => setStockFilter(event.target.value)} className={businessControlClass}><option value="all">Bütün qalıqlar</option><option value="low">Kritik qalıq</option><option value="out">Bitmiş</option><option value="available">Kifayət qədər</option></select></label>
      <div className="flex gap-2 pt-2"><button type="button" onClick={() => { setWarehouse("auto"); setCategory("all"); setStockFilter("all"); }} className="min-h-11 flex-1 cursor-pointer rounded-xl bg-slate-100 px-4 font-semibold">Sıfırla</button><button type="button" onClick={onClose} className="min-h-11 flex-1 cursor-pointer rounded-xl bg-brand-primary px-4 font-semibold">Göstər</button></div>
    </div></BusinessFormDialog>
  );
}
