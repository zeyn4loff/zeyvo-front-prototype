import { useState } from "react";
import { useCustomerText } from "@/features/locale/customerText";
import { useTranslations } from "@/features/locale/language";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLocationCity } from "@/features/location/useLocationCity";
import { useCityPicker } from "@/features/location/city-picker-context";
import type { ResultType, SortOrder } from "./catalogTypes";

interface Props {
  sort: SortOrder;
  resultType: ResultType;
  categoryTitle?: string;
  onSortChange: (value: SortOrder) => void;
  onResultTypeChange: (value: ResultType) => void;
}

function FilterFields({ sort, resultType, categoryTitle, onSortChange, onResultTypeChange, radioName, onCategorySelect, onCitySelect }: Props & { radioName: string; onCategorySelect?: () => void; onCitySelect?: () => void }) {
  const ct = useCustomerText();
  const { t } = useTranslations();
  const { city } = useLocationCity();
  const openCityPicker = useCityPicker();
  return <div className="space-y-5">
    <label className="block space-y-2 text-xs font-bold text-slate-500">{ct("Sırala")}<select value={sort} onChange={(event) => onSortChange(event.target.value as SortOrder)} className="h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-primary outline-none focus:border-brand-primary"><option value="popular">{t("popularity")}</option><option value="rating">{t("rating")}</option><option value="price">{t("price")}</option></select></label>
    <div className="space-y-2"><div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-500"><span>{ct("Şəhər")}</span><button type="button" onClick={() => { onCitySelect?.(); openCityPicker(); }} className="text-primary underline underline-offset-2">{ct("Dəyiş")}</button></div><div className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-primary"><MapPin size={17} className="text-slate-500" />{city}</div></div>
    <div className="space-y-2"><div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-500"><span>{ct("Kateqoriya")}</span><a href="#catalog-categories" onClick={onCategorySelect} className="text-primary underline underline-offset-2">{ct("Dəyiş")}</a></div><div className="rounded-2xl border border-brand-primary bg-brand-primary/20 px-3 py-3 text-sm font-semibold text-primary">{categoryTitle || t("all")}</div></div>
    <fieldset className="space-y-2 border-t border-slate-100 pt-4"><legend className="mb-2 text-xs font-bold text-slate-500">{ct("Nəticə növü")}</legend>{(["all", "salons", "masters"] as const).map((value) => <label key={value} className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3 text-sm font-semibold transition ${resultType === value ? "border-brand-primary bg-brand-primary/20 text-primary" : "border-transparent bg-slate-50 text-slate-600 hover:border-slate-200"}`}><input type="radio" name={radioName} checked={resultType === value} onChange={() => onResultTypeChange(value)} className="size-4 accent-primary" />{value === "all" ? t("all") : value === "salons" ? ct("Salonlar və məkanlar") : ct("Ustalar")}</label>)}</fieldset>
  </div>;
}

export default function CatalogFilters(props: Props) {
  const [open, setOpen] = useState(false);
  const ct = useCustomerText();
  return <>
    <div className="order-first lg:hidden"><button type="button" onClick={() => setOpen(true)} className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-primary shadow-sm hover:border-brand-primary"><SlidersHorizontal size={18} />{ct("Filtrlər")}</button></div>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="customer-modal bottom-0 top-auto max-h-[85dvh] w-full max-w-none translate-y-0 overflow-y-auto rounded-t-3xl rounded-b-none p-5 sm:top-1/2 sm:bottom-auto sm:max-w-xl sm:-translate-y-1/2 sm:rounded-3xl" overlayClassName="customer-overlay"><DialogHeader><DialogTitle>{ct("Filtrlər")}</DialogTitle></DialogHeader><FilterFields {...props} radioName="catalog-mobile-result-type" onCategorySelect={() => setOpen(false)} onCitySelect={() => setOpen(false)} /><button type="button" onClick={() => setOpen(false)} className="w-full rounded-xl bg-brand-primary px-4 py-3 text-sm font-semibold">{ct("Nəticələrə bax")}</button></DialogContent></Dialog>
    <aside className="hidden min-w-0 rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_-24px_rgba(15,23,42,.55)] lg:sticky lg:top-5 lg:block"><h2 className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4 text-lg font-black text-primary"><span className="flex size-9 items-center justify-center rounded-xl bg-brand-primary/35"><SlidersHorizontal size={18} /></span> Filtrlər</h2><FilterFields {...props} radioName="catalog-desktop-result-type" /></aside>
  </>;
}
