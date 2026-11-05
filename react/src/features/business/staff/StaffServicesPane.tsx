import { useState } from "react";
import { ChevronRight, ExternalLink, FileText, Info, Search } from "lucide-react";
import type { Service, ServiceData } from "../services/services";

function AssignedService({ service, memberId }: { service: Service; memberId?: string }) {
  const custom = memberId ? service.staffOverrides?.[memberId] : undefined;
  const customPrice = custom?.price !== undefined && custom.price !== service.price;
  const customDuration = custom?.duration !== undefined && custom.duration !== service.duration;

  return <article className="flex min-w-0 flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:gap-3">
    <div className="min-w-0 flex-1">
      <div className="flex min-w-0 items-center gap-2"><strong className="min-w-0 truncate text-xs text-slate-900">{service.name}</strong>{service.isCombo && <span className="shrink-0 rounded-md bg-purple-100 px-1.5 py-0.5 text-[9px] font-bold text-purple-800">Kompleks</span>}</div>
      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] text-slate-400"><span>Baza: <b>{service.price} ₼</b></span><span>•</span><span>{service.duration || 30} dəq</span>{customPrice && <span className="font-semibold text-amber-700">• Fərdi qiymət: {custom.price} ₼</span>}{customDuration && <span className="font-semibold text-amber-700">• Fərdi vaxt: {custom.duration} dəq</span>}</div>
    </div>
    <div className="flex shrink-0 items-center gap-2"><span className="rounded-md border border-emerald-200/80 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Təyin edilib</span><a href={`/partner/services?edit=${encodeURIComponent(service.id)}`} title="Xidməti «Xidmətlər» bölməsində redaktə et" className="inline-flex min-h-8 items-center gap-1 rounded-lg bg-slate-100 px-2.5 text-[11px] font-semibold text-slate-700 shadow-xs hover:bg-slate-200">Xidmətə bax<ChevronRight size={12} className="text-slate-400" /></a></div>
  </article>;
}

/** Assignments are changed in each service's staff tab, as in the prototype. */
export default function StaffServicesPane({ data, selected, memberId }: { data: ServiceData; selected: string[]; memberId?: string }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase("az-AZ");
  const assigned = data.services.filter((service) => selected.includes(service.id));
  const filtered = assigned.filter((service) => !normalized || `${service.name} ${service.description}`.toLocaleLowerCase("az-AZ").includes(normalized));
  const groups = data.categories.map((category) => ({ id: category.id, name: category.name, services: filtered.filter((service) => service.categoryId === category.id) })).filter((group) => group.services.length);
  const uncategorized = filtered.filter((service) => !service.categoryId || !data.categories.some((category) => category.id === service.categoryId));
  if (uncategorized.length) groups.push({ id: "other", name: "Digər xidmətlər", services: uncategorized });

  return <section className="min-w-0 space-y-3.5 text-xs">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-1"><div><h3 className="font-bold text-slate-900">Ustanın göstərdiyi xidmətlər</h3><p className="text-[11px] font-normal text-slate-400">Xidmət təyinatları «Xidmətlər» bölməsindən idarə olunur</p></div><a href="/partner/services" className="inline-flex min-h-8 items-center gap-1.5 rounded-xl bg-slate-100 px-3 font-semibold text-slate-700 shadow-xs hover:bg-slate-200"><ExternalLink size={14} className="text-slate-500" />Xidmətlər bölməsi</a></div>
    <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50 p-3 text-[11px] leading-relaxed text-slate-600"><Info size={16} className="mt-0.5 shrink-0 text-slate-400" /><p>Bu ustaya yeni xidmət təyin etmək və ya mövcud xidmətlərdən çıxarmaq üçün <b>Xidmətlər</b> bölməsində müvafiq xidmətin daxilində heyət siyahısından ustanı seçin.</p></div>
    <label className="relative block"><Search size={16} className="pointer-events-none absolute left-2.5 top-2.5 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Təyin olunmuş xidmətləri axtar" placeholder="Təyin olunmuş xidmətlər üzrə axtarış..." className="h-9 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900 focus:bg-white" /></label>
    <div className="max-h-[46vh] space-y-3 overflow-y-auto pr-1">
      {groups.map((group) => <div key={group.id} className="space-y-2"><div className="flex items-center justify-between px-1 pt-1 text-xs font-semibold text-slate-600"><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-slate-400" />{group.name}</span><span className="text-[10px] font-normal text-slate-400">{group.services.length} xidmət</span></div><div className="space-y-1.5">{group.services.map((service) => <AssignedService key={service.id} service={service} memberId={memberId} />)}</div></div>)}
      {!assigned.length && <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center"><div className="mx-auto flex size-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 shadow-xs"><FileText size={20} /></div><div className="space-y-1"><p className="font-bold text-slate-800">Bu ustaya hələ heç bir xidmət təyin edilməyib</p><p className="text-[11px] text-slate-400">Xidməti təyin etmək üçün «Xidmətlər» bölməsinə keçərək istənilən xidmətin daxilində bu ustanı heyət siyahısından seçin.</p></div><a href="/partner/services" className="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-brand-primary px-3.5 font-bold text-slate-900">Xidmətlər bölməsinə keç<ExternalLink size={14} /></a></div>}
      {!!assigned.length && !filtered.length && <div className="space-y-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center"><p className="font-medium text-slate-700">«{query.trim()}» üzrə təyin olunmuş xidmət tapılmadı</p><p className="text-[11px] text-slate-400">Axtarış sorğusunu dəyişin və ya filtri təmizləyin</p></div>}
    </div>
  </section>;
}
