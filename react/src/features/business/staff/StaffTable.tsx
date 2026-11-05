import { CalendarDays, Check, Pencil, Star, Trash2, UserMinus, X } from "lucide-react";
import type { StaffMember } from "./staff";
import BusinessStatusBadge from "../components/BusinessStatusBadge";

type Props = {
  members: StaffMember[];
  today: keyof StaffMember["schedule"];
  roleName: (id: string) => string;
  serviceCount: (id: string) => number;
  onEdit: (item: StaffMember) => void;
  onDelete: (item: StaffMember) => void;
  onOnline: (item: StaffMember) => void;
  onServices: (item: StaffMember) => void;
  onSchedule: (item: StaffMember) => void;
  onEmployment: (item: StaffMember) => void;
};

export default function StaffTable({ members, today, roleName, serviceCount, onEdit, onDelete, onOnline, onServices, onSchedule, onEmployment }: Props) {
  return <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
    <table className="w-full min-w-[860px] border-collapse text-left text-xs">
      <thead className="bg-slate-50 text-slate-600"><tr>{["Usta", "Vəzifə və ixtisas", "Əlaqə", "Status və növbə", "Xidmətlər", "Əməkhaqqı / Faiz", "Onlayn", "Əməliyyatlar"].map((title) => <th key={title} scope="col" className="px-3 py-4 font-bold first:pl-5">{title}</th>)}</tr></thead>
      <tbody className="divide-y divide-slate-100">{members.map((member) => {
        const working = member.status === "active" && member.schedule[today].enabled;
        const initials = member.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toLocaleUpperCase("az-AZ");
        const salary = member.fixedSalary ? `${member.fixedSalary} ₼ + ${member.serviceCommission}%` : `${member.serviceCommission}% faiz`;
        return <tr key={member.id} className="hover:bg-slate-50/60">
          <td className="px-3 py-4 pl-5"><div className="flex items-center gap-2"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white" style={{ backgroundColor: member.color }}>{initials}</span><span className="min-w-0"><strong className="block max-w-28 leading-tight">{member.name}</strong>{member.rating != null && <span className="mt-1 flex items-center gap-1 whitespace-nowrap text-[11px] text-amber-500"><Star size={12} fill="currentColor" />{member.rating.toFixed(2)} <span className="text-slate-400">({member.reviewsCount ?? 0})</span></span>}</span></div></td>
          <td className="px-3 py-4"><strong className="block">{roleName(member.roleId)}</strong><span className="mt-1 block max-w-32 text-[11px] text-slate-400">{member.specialization}</span></td>
          <td className="px-3 py-4"><a href={`tel:${member.phone.replace(/[^+\d]/g, "")}`} className="block whitespace-nowrap hover:underline">{member.phone}</a><span className="mt-1 block text-[11px] text-slate-400">{member.email}</span></td>
          <td className="px-3 py-4"><BusinessStatusBadge tone={member.status === "dismissed" ? "danger" : working ? "success" : "neutral"}>{member.status === "dismissed" ? "İşdən ayrılıb" : member.status === "vacation" ? "Məzuniyyət" : member.status === "inactive" ? "Qeyri-aktiv" : working ? `Növbədə (${member.schedule[today].start})` : "İstirahət günü"}</BusinessStatusBadge></td>
          <td className="px-3 py-4"><button type="button" onClick={() => onServices(member)} className="min-h-9 cursor-pointer rounded-lg bg-slate-100 px-2.5 font-bold hover:bg-slate-200">{serviceCount(member.id)} xidmət</button></td>
          <td className="px-3 py-4 font-bold">{salary}</td>
          <td className="px-3 py-4"><button type="button" onClick={() => onOnline(member)} aria-label={`${member.name}: onlayn qəbul ayarlarını redaktə et`} title="Onlayn qəbul ayarlarını redaktə et" className={`flex size-9 cursor-pointer items-center justify-center rounded-xl ${member.onlineBooking ? "bg-brand-primary" : "bg-slate-100 text-slate-400"}`}>{member.onlineBooking ? <Check size={17} /> : <X size={17} />}</button></td>
          <td className="px-3 py-4"><div className="flex items-center gap-1"><button type="button" onClick={() => onSchedule(member)} aria-label={`${member.name}: iş qrafiki`} className="flex size-9 cursor-pointer items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100"><CalendarDays size={16} /></button><button type="button" onClick={() => onEmployment(member)} aria-label={`${member.name}: iş vəziyyəti`} className="flex size-9 cursor-pointer items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100"><UserMinus size={16} /></button><button type="button" onClick={() => onEdit(member)} aria-label={`${member.name}: redaktə et`} className="flex size-9 cursor-pointer items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100"><Pencil size={16} /></button><button type="button" onClick={() => onDelete(member)} aria-label={`${member.name}: sil`} className="flex size-9 cursor-pointer items-center justify-center rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button></div></td>
        </tr>;
      })}</tbody>
    </table>
  </div>;
}
