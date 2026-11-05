import EmptyState from "../../../components/common/EmptyState";
import BusinessPagination from "../components/BusinessPagination";
import type { Dispatch, SetStateAction } from "react";
import BusinessFilterButton from "../components/BusinessFilterButton";
import { Eye, Search, Star, UsersRound } from "lucide-react";
import type { Service } from "../services/services";
import StaffMemberCard from "./StaffMemberCard";
import StaffTable from "./StaffTable";
import { emptyStaffFilters, type StaffFilters } from "./staffFilters";
import { type StaffData, type StaffMember, type Weekday } from "./staff";

const metricCard = "min-w-0 rounded-2xl border bg-white p-4 text-left shadow-sm transition sm:p-5";
const selectedMetric = "border-[#101114] ring-2 ring-brand-primary/40";
const idleMetric = "border-slate-200/80 hover:border-slate-300";
type StaffDelete = { kind: "staff" | "role"; id: string; name: string } | null;
type Employment = { id: string; mode: "dismiss" | "rehire" | "history" } | null;
type StaffEditorTab = "info" | "online" | "services" | "schedule" | "pay";
interface Props {
  data: StaffData;
  services: Service[];
  filters: StaffFilters;
  setFilters: Dispatch<SetStateAction<StaffFilters>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setFilterOpen: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  todayKey: Weekday;
  roleName: (id: string) => string;
  branchName: (id: string) => string;
  filtered: StaffMember[];
  shown: StaffMember[];
  totalPages: number;
  activeFilterCount: number;
  avgRating: StaffMember[];
  openStaff: (item?: StaffMember, selected?: StaffEditorTab) => void;
  setDeleting: Dispatch<SetStateAction<StaffDelete>>;
  setEmployment: Dispatch<SetStateAction<Employment>>;
}
export default function StaffTeamView({ data, services, filters, setFilters, search, setSearch, setFilterOpen, page, setPage, todayKey, roleName, branchName, filtered, shown, totalPages, activeFilterCount, avgRating, openStaff, setDeleting, setEmployment }: Props) {
  return <>
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <button type="button" aria-pressed={activeFilterCount === 0 && !search} onClick={() => { setFilters(emptyStaffFilters); setSearch(""); setPage(1); }} className={`${metricCard} group ${activeFilterCount === 0 && !search ? selectedMetric : idleMetric}`}><div className="flex items-start justify-between gap-1"><span className="text-xs font-semibold text-slate-500">Cəmi heyət</span><span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-brand-primary group-hover:text-black"><UsersRound size={16} /></span></div><strong className="mt-1 block font-mono text-2xl font-black text-slate-900 sm:text-3xl">{data.members.length} <span className="text-xs font-semibold text-slate-400">usta</span></strong><p className="mt-1 text-[11px] text-slate-400">Seçilmiş filialın mütəxəssisləri</p></button>
      <button type="button" aria-pressed={filters.shift === "working"} onClick={() => { setFilters({ ...filters, shift: filters.shift === "working" ? "all" : "working" }); setPage(1); }} className={`${metricCard} ${filters.shift === "working" ? selectedMetric : idleMetric}`}><div className="flex items-start justify-between gap-1"><span className="text-xs font-semibold text-slate-500">Bu gün növbədə</span><span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-emerald-50"><span className="size-2 animate-pulse rounded-full bg-emerald-500" /></span></div><strong className="mt-1 block font-mono text-2xl font-black text-emerald-600 sm:text-3xl">{data.members.filter((item) => item.status === "active" && item.schedule[todayKey].enabled).length} <span className="text-xs font-semibold text-slate-400">usta</span></strong><p className="mt-1 text-[11px] text-slate-400">Cədvəl üzrə bu gün işləyənlər</p></button>
      <button type="button" aria-pressed={filters.online === "online"} onClick={() => { setFilters({ ...filters, online: filters.online === "online" ? "all" : "online" }); setPage(1); }} className={`${metricCard} ${filters.online === "online" ? selectedMetric : idleMetric}`}><div className="flex items-start justify-between gap-1"><span className="text-xs font-semibold text-slate-500">Onlayn qəbulda</span><span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><Eye size={16} /></span></div><strong className="mt-1 block font-mono text-2xl font-black text-slate-900 sm:text-3xl">{data.members.filter((item) => item.onlineBooking && item.status === "active").length} <span className="text-xs font-semibold text-slate-400">aktiv</span></strong><p className="mt-1 text-[11px] text-slate-400">Müştərilər saytdan seçə bilir</p></button>
      <div className={`${metricCard} border-slate-200/90`}><div className="flex items-start justify-between gap-1"><span className="text-xs font-semibold text-slate-500">Orta reytinq</span><span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500"><Star size={16} fill="currentColor" /></span></div><strong className="mt-1 flex items-center gap-1.5 font-mono text-2xl font-black text-slate-900 sm:text-3xl"><Star className="shrink-0 text-amber-400" size={20} fill="currentColor" />{avgRating.length ? (avgRating.reduce((sum, item) => sum + (item.rating ?? 0), 0) / avgRating.length).toFixed(2) : "—"}</strong><p className="mt-1 text-[11px] text-slate-400">Müştəri rəylərinin yekun balı</p></div>
    </div>
    <div className="flex min-w-0 gap-2"><label className="business-search-control flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3"><Search size={17} className="shrink-0 text-slate-400" /><input aria-label="Usta axtar" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Usta adı, vəzifə, telefon və ya email üzrə axtarış" className="min-w-0 flex-1 bg-transparent text-xs outline-none" /></label><BusinessFilterButton onClick={() => setFilterOpen(true)} count={activeFilterCount} /></div>
    {(activeFilterCount > 0 || search) && <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600"><span>{filtered.length} nəticə</span><button type="button" onClick={() => { setFilters(emptyStaffFilters); setSearch(""); setPage(1); }} className="cursor-pointer font-bold text-rose-600 underline">Filtrləri sıfırla</button></div>}
    {shown.length > 0 ? <><div className="space-y-2 lg:hidden">{shown.map((item) => <StaffMemberCard key={item.id} member={item} roleName={roleName(item.roleId)} branchName={branchName(item.branchId)} serviceCount={services.filter((service) => service.staffIds.includes(item.id)).length} onEdit={() => openStaff(item)} onDelete={() => setDeleting({ kind: "staff", id: item.id, name: item.name })} onOnline={() => openStaff(item, "online")} onServices={() => openStaff(item, "services")} onSchedule={() => openStaff(item, "schedule")} onPay={() => openStaff(item, "pay")} onEmployment={() => setEmployment({ id: item.id, mode: item.status === "dismissed" ? "rehire" : "dismiss" })} onHistory={() => setEmployment({ id: item.id, mode: "history" })} />)}</div><div className="hidden lg:block"><StaffTable members={shown} today={todayKey} roleName={roleName} serviceCount={(id) => services.filter((service) => service.staffIds.includes(id)).length} onEdit={(item) => openStaff(item)} onDelete={(item) => setDeleting({ kind: "staff", id: item.id, name: item.name })} onOnline={(item) => openStaff(item, "online")} onServices={(item) => openStaff(item, "services")} onSchedule={(item) => openStaff(item, "schedule")} onEmployment={(item) => setEmployment({ id: item.id, mode: item.status === "dismissed" ? "rehire" : "dismiss" })} /></div></> : <EmptyState title="Usta tapılmadı" description="Axtarışı və ya filtrləri dəyişin." icon={UsersRound} />}
    {totalPages > 1 && <BusinessPagination totalItems={filtered.length} currentPage={page} itemFromLabel="ustadan" onPageChange={setPage} />}
  </>;
}
