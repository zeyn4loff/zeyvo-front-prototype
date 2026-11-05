import { Info } from "lucide-react";
import type { StaffSalaryScheme } from "./staff";

type Props = {
  scheme: StaffSalaryScheme;
  onSchemeChange: (value: StaffSalaryScheme) => void;
  serviceCommission: number;
  onServiceCommissionChange: (value: number) => void;
  productCommission: number;
  onProductCommissionChange: (value: number) => void;
  fixedSalary: number;
  onFixedSalaryChange: (value: number) => void;
  rentalType: "daily" | "monthly";
  onRentalTypeChange: (value: "daily" | "monthly") => void;
  rentalAmount: number;
  onRentalAmountChange: (value: number) => void;
  rentalCardCommission: number;
  onRentalCardCommissionChange: (value: number) => void;
};

const hints: Record<StaffSalaryScheme, { title: string; text: string }> = {
  commission: { title: "Xalis faiz:", text: "Ustanın qazancı yalnız faktiki yerinə yetirdiyi xidmətlərin və satdığı məhsulların faizi əsasında hesablanır. Sabit baza maaşı tətbiq edilmir." },
  fixed_plus_commission: { title: "Sabit baza + Komissiya:", text: "Usta hər ay zəmanətli sabit baza əməkhaqqı və əlavə olaraq göstərdiyi xidmət və satışlardan komissiya faizi əldə edir." },
  fixed: { title: "Yalnız sabit əməkhaqqı:", text: "Usta göstərdiyi xidmətlərin və ya satışların həcmindən asılı olmayaraq hər ay yalnız göstərilən məbləğdə sabit maaş alır. Xidmət və məhsul satışından əlavə faiz hesablanmır." },
  booth_rental: { title: "Kreslo / Otaq icarəsi:", text: "Usta salondan iş yeri icarəyə götürür və salona sabit icarə haqqı ödəyir. Xidmət gəliri tam ustanın özünə qalır. Məhsul satışından faiz və POS ödəniş komissiyası qeyd edilə bilər." },
};

function NumberField({ label, value, onChange, unit, max, step = 1, hint }: { label: string; value: number; onChange: (value: number) => void; unit: string; max?: number; step?: number; hint?: string }) {
  return <label className="block min-w-0 space-y-1 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
    <span className="flex items-center justify-between gap-2 text-xs font-bold text-slate-700">{label}{hint && <small className="shrink-0 text-[10px] font-normal text-slate-400">{hint}</small>}</span>
    <span className="flex min-w-0 items-center gap-2"><input type="number" min="0" max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-9 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-center text-sm font-bold text-slate-900 outline-none focus:border-slate-900" /><span className="shrink-0 text-sm font-bold text-slate-600">{unit}</span></span>
  </label>;
}

export default function StaffSalaryPane(props: Props) {
  const { scheme, onSchemeChange, serviceCommission, onServiceCommissionChange, productCommission, onProductCommissionChange, fixedSalary, onFixedSalaryChange, rentalType, onRentalTypeChange, rentalAmount, onRentalAmountChange, rentalCardCommission, onRentalCardCommissionChange } = props;
  return <section className="space-y-4">
    <div className="flex items-start gap-2 rounded-xl border border-amber-200/70 bg-amber-50/60 p-3 text-[11px] text-amber-900"><Info size={16} className="mt-0.5 shrink-0 text-amber-600" /><span>Bu parametr maliyyə və əməkhaqqı hesabatında ustanın qazancını avtomatik hesablamaq üçün tətbiq edilir.</span></div>
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-700">Hesablama sxemi<select value={scheme} onChange={(event) => onSchemeChange(event.target.value as StaffSalaryScheme)} className="mt-1 h-11 w-full min-w-0 cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs font-semibold text-slate-900 outline-none focus:border-slate-900"><option value="commission">Xalis faiz (Xidmət və məhsul satışından %)</option><option value="fixed_plus_commission">Sabit baza maaş + Komissiya faizi</option><option value="fixed">Yalnız sabit aylıq əməkhaqqı</option><option value="booth_rental">Kreslo / Otaq icarəsi (Usta salona icarə haqqı ödəyir)</option></select></label>
      {(scheme === "commission" || scheme === "fixed_plus_commission") && <div className="grid gap-3.5 sm:grid-cols-2"><NumberField label="Xidmətlərdən faiz (%)" value={serviceCommission} onChange={onServiceCommissionChange} max={100} unit="%" /><NumberField label="Məhsul satışından faiz (%)" value={productCommission} onChange={onProductCommissionChange} max={100} unit="%" /></div>}
      {(scheme === "fixed" || scheme === "fixed_plus_commission") && <NumberField label="Sabit baza əməkhaqqı (₼)" value={fixedSalary} onChange={onFixedSalaryChange} step={10} unit="₼ / ay" />}
      {scheme === "booth_rental" && <div className="space-y-3.5"><div className="grid gap-3.5 sm:grid-cols-2"><label className="block rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs font-bold text-slate-700">İcarə növü<select value={rentalType} onChange={(event) => onRentalTypeChange(event.target.value as "daily" | "monthly")} className="mt-1 h-9 w-full min-w-0 cursor-pointer rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-bold text-slate-900 outline-none focus:border-slate-900"><option value="monthly">Aylıq sabit icarə haqqı</option><option value="daily">Günlük icarə (iş günlərinə görə)</option></select></label><NumberField label={rentalType === "daily" ? "Günlük icarə haqqı (₼)" : "Aylıq icarə haqqı (₼)"} value={rentalAmount} onChange={onRentalAmountChange} step={5} unit={rentalType === "daily" ? "₼ / gün" : "₼ / ay"} /></div><div className="grid gap-3.5 sm:grid-cols-2"><NumberField label="Salon məhsullarından faiz (%)" hint="İstəyə görə" value={productCommission} onChange={onProductCommissionChange} max={100} unit="%" /><NumberField label="Kassa / Bank komissiyası (%)" hint="POS ödənişlər" value={rentalCardCommission} onChange={onRentalCardCommissionChange} max={100} unit="%" /></div></div>}
      <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600"><Info size={16} className="mt-0.5 shrink-0 text-slate-500" /><span><strong>{hints[scheme].title}</strong> {hints[scheme].text}</span></div>
    </div>
  </section>;
}
