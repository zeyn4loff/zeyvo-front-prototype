import { CalendarDays, Coffee, Pencil, UsersRound } from "lucide-react";
import EmptyState from "../../../components/common/EmptyState";
import BusinessMetricCard from "../components/BusinessMetricCard";
import { dayLabels, weekdays, type StaffMember, type Weekday } from "./staff";

type Props = {
  members: StaffMember[]; today: Weekday; roleName: (id: string) => string;
  onEditSchedule: (member: StaffMember) => void;
};

const shortDays: Record<Weekday, string> = { mon: "Be", tue: "Ça", wed: "Ç", thu: "Ca", fri: "C", sat: "Ş", sun: "B" };

export default function StaffScheduleTab({ members, today, roleName, onEditSchedule }: Props) {
  const workingToday = members.filter((member) => member.status === "active" && member.schedule[today].enabled).length;
  const summary = [
    { title: "Cəmi heyət", value: members.length, detail: "Qrafikdə qeydiyyatda olanlar", icon: UsersRound, iconClassName: "bg-blue-50 text-blue-600", valueClassName: "text-slate-900" },
    { title: "Bu gün növbədə", value: workingToday, detail: "Aktiv xidmət göstərənlər", icon: CalendarDays, iconClassName: "bg-emerald-50 text-emerald-600", valueClassName: "text-emerald-700" },
    { title: "İstirahət günü", value: members.length - workingToday, detail: "Bu gün növbəsi olmayanlar", icon: Coffee, iconClassName: "bg-amber-50 text-amber-700", valueClassName: "text-slate-900" },
  ];

  return <div className="space-y-5 sm:space-y-6">
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">{summary.map((item) => <BusinessMetricCard key={item.title} label={item.title} value={item.value} detail={item.detail} icon={item.icon} iconClassName={item.iconClassName} valueClassName={item.valueClassName} />)}</div>

    <section className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs">
      <header className="border-b border-slate-100 p-4 sm:p-5"><h3 className="text-sm font-bold text-slate-900">Həftəlik Növbə Cədvəli</h3><p className="text-xs font-medium text-slate-400">Hər bir ustanın günlər üzrə iş saatları</p></header>
      {members.length ? <div className="max-w-full overflow-x-auto overscroll-x-contain"><table className="w-full min-w-[950px] border-collapse text-left text-xs"><thead><tr className="border-y border-slate-200 bg-slate-50/80 font-semibold text-slate-600"><th className="sticky left-0 z-10 min-w-[180px] bg-slate-50 p-3.5">Usta</th>{weekdays.map((day) => <th key={day} className="min-w-[110px] p-3.5 text-center">{dayLabels[day]}<br /><span className="text-[10px] font-normal text-slate-400">({shortDays[day]})</span></th>)}</tr></thead><tbody className="divide-y divide-slate-100 font-medium">{members.map((member) => <tr key={member.id} className="group hover:bg-slate-50/60"><th className="sticky left-0 z-10 border-r border-slate-100 bg-white p-3.5 group-hover:bg-slate-50"><div className="flex items-center justify-between gap-2"><div className="flex min-w-0 items-center gap-2.5"><span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-bold text-slate-700 ring-1 ring-slate-200">{member.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><span className="min-w-0"><span className="block truncate font-bold text-slate-900">{member.name}</span><span className="block truncate text-[10px] font-normal text-slate-400">{roleName(member.roleId)}</span></span></div><button type="button" onClick={() => onEditSchedule(member)} aria-label={`${member.name} qrafikini redaktə et`} className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-brand-primary hover:text-black focus-visible:outline-2 focus-visible:outline-brand-primary"><Pencil size={14} /></button></div></th>{weekdays.map((day) => { const shift = member.schedule[day]; const active = member.status === "active" && shift.enabled; return <td key={day} className="p-3 text-center"><button type="button" onClick={() => onEditSchedule(member)} aria-label={`${member.name} · ${dayLabels[day]} · qrafiki redaktə et`} title="Qrafiki redaktə et" className={`inline-block min-h-7 cursor-pointer rounded-xl px-2.5 py-1 text-[11px] font-bold transition focus-visible:outline-2 focus-visible:outline-brand-primary ${member.status === "vacation" ? "bg-amber-50 text-amber-800" : active ? "border border-emerald-200/60 bg-emerald-50 font-mono text-emerald-800 shadow-xs hover:bg-emerald-100" : "text-slate-400 hover:bg-slate-100"}`}>{member.status === "vacation" ? "Məzuniyyət" : active ? `${shift.start} – ${shift.end}` : "—"}</button></td>; })}</tr>)}</tbody></table></div> : <EmptyState title="Heyət yoxdur" description="İş qrafikini görmək üçün usta əlavə edin." compact />}
    </section>
  </div>;
}
