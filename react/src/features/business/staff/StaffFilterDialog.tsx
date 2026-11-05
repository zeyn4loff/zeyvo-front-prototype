import BusinessFormDialog from "../components/BusinessFormDialog";
import type { StaffRole } from "./staff";
import { emptyStaffFilters, type StaffFilters } from "./staffFilters";

type Props = { filters: StaffFilters; roles: StaffRole[]; onChange: (filters: StaffFilters) => void; onClose: () => void };
const selectClass = "mt-1 min-h-11 w-full min-w-0 cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-sm";

export default function StaffFilterDialog({ filters, roles, onChange, onClose }: Props) {
  function change<K extends keyof StaffFilters>(key: K, value: StaffFilters[K]) { onChange({ ...filters, [key]: value }); }
  return <BusinessFormDialog title="Ustaları filtrlə" onClose={onClose} size="medium">
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="min-w-0 text-sm font-semibold">Vəzifə<select className={selectClass} value={filters.role} onChange={(event) => change("role", event.target.value)}><option value="all">Bütün vəzifələr</option>{roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select></label>
      <label className="min-w-0 text-sm font-semibold">Status<select className={selectClass} value={filters.status} onChange={(event) => change("status", event.target.value as StaffFilters["status"])}><option value="all">Bütün statuslar</option><option value="active">Aktiv</option><option value="vacation">Məzuniyyət</option><option value="inactive">Qeyri-aktiv</option><option value="dismissed">İşdən ayrılıb</option></select></label>
      <label className="min-w-0 text-sm font-semibold">Bu gün növbə<select className={selectClass} value={filters.shift} onChange={(event) => change("shift", event.target.value as StaffFilters["shift"])}><option value="all">Hamısı</option><option value="working">Növbədə olanlar</option></select></label>
      <label className="min-w-0 text-sm font-semibold sm:col-span-2">Onlayn qəbul<select className={selectClass} value={filters.online} onChange={(event) => change("online", event.target.value as StaffFilters["online"])}><option value="all">Hamısı</option><option value="online">Onlayn qəbul aktiv</option></select></label>
    </div>
    <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => onChange(emptyStaffFilters)} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-4 text-sm font-bold">Filtrləri sıfırla</button><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 text-sm font-bold">Nəticələri göstər</button></div>
  </BusinessFormDialog>;
}
