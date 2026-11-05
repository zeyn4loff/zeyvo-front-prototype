import { Check, Plus } from "lucide-react";
import { branchAmenityOptions } from "@/features/marketplace/amenities";

export default function BranchAmenitiesField({ selected = [], onChange }: { selected?: string[]; onChange?: (value: string[]) => void }) {
  return <section aria-labelledby="branch-amenities-title" className="min-w-0 space-y-2">
    <h3 id="branch-amenities-title" className="text-xs font-medium text-slate-700">Filialın imkanları</h3>
    <p className="text-[11px] text-slate-400">Müştərilərə göstərmək istədiyiniz imkanları seçin.</p>
    <div className="flex flex-wrap gap-1.5">{branchAmenityOptions.map((amenity) => {
      const active = selected.includes(amenity);
      return <button key={amenity} type="button" aria-pressed={active} onClick={() => onChange?.(active ? selected.filter((item) => item !== amenity) : [...selected, amenity])} className={`inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition active:scale-95 ${active ? "border-brand-primary bg-brand-primary font-semibold text-[#101114]" : "border-slate-200 bg-slate-50 font-medium text-slate-600 hover:bg-slate-100"}`}>
        {active ? <Check size={14} strokeWidth={2.5} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
        {amenity}
      </button>;
    })}</div>
  </section>;
}
