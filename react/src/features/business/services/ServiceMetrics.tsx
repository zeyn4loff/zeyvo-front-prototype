import { Check, CircleDollarSign, Clock3, Scissors } from "lucide-react";
import type { Service } from "./services";

export default function ServiceMetrics({ services, categoryCount, onlineOnly, onToggleOnline }: { services: Service[]; categoryCount: number; onlineOnly: boolean; onToggleOnline: () => void }) {
  const count = services.length;
  const online = services.filter((service) => service.onlineBooking).length;
  const prices = services.map((service) => service.price);
  const averagePrice = count ? services.reduce((sum, service) => sum + service.price, 0) / count : 0;
  const averageDuration = count ? Math.round(services.reduce((sum, service) => sum + service.duration, 0) / count) : 0;
  const card = "min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-xs sm:p-5";
  const metrics = [
    { title: "Ümumi xidmətlər", value: count, detail: `${categoryCount} kateqoriya`, icon: Scissors, iconClass: "bg-amber-50 text-amber-700", valueClass: "text-2xl sm:text-3xl" },
    { title: "Onlayn qəbul", value: online, detail: `${count ? Math.round(online / count * 100) : 0}% aktiv`, icon: Check, iconClass: "bg-emerald-50 text-emerald-600", valueClass: "text-2xl sm:text-3xl" },
    { title: "Orta qiymət", value: `${averagePrice.toFixed(2)} ₼`, detail: `${count ? Math.min(...prices) : 0} ₼ – ${count ? Math.max(...prices) : 0} ₼ aralığında`, icon: CircleDollarSign, iconClass: "bg-blue-50 text-blue-600", valueClass: "text-xl sm:text-2xl" },
    { title: "Orta müddət", value: `${averageDuration} dəq`, detail: "İcra və xidmət vaxtı", icon: Clock3, iconClass: "bg-purple-50 text-purple-600", valueClass: "text-xl sm:text-2xl" },
  ];
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">{metrics.map((metric, index) => {
    const content = <><div className="mb-2 flex items-center justify-between gap-1"><span className="text-xs font-semibold text-slate-500">{metric.title}</span><span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${metric.iconClass}`}><metric.icon size={16} /></span></div><div className={`${metric.valueClass} font-bold text-slate-900`}>{metric.value}</div><p className="mt-1 truncate text-[11px] font-semibold text-slate-400">{metric.detail}</p></>;
    return index === 1 ? <button key={metric.title} type="button" onClick={onToggleOnline} aria-pressed={onlineOnly} className={`${card} cursor-pointer transition hover:border-slate-300 ${onlineOnly ? "border-[#101114] ring-2 ring-brand-primary/40" : ""}`}>{content}</button> : <div key={metric.title} className={card}>{content}</div>;
  })}</div>;
}
