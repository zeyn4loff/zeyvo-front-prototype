import { Pencil, Trash2 } from "lucide-react";
import type { StaffMember } from "./staff";
import BusinessStatusBadge from "../components/BusinessStatusBadge";

type Props = {
  member: StaffMember;
  roleName: string;
  branchName: string;
  serviceCount: number;
  onEdit: () => void;
  onDelete: () => void;
  onOnline: () => void;
  onServices: () => void;
  onSchedule: () => void;
  onPay: () => void;
  onEmployment: () => void;
  onHistory: () => void;
};

const statusLabels: Record<StaffMember["status"], string> = {
  active: "Aktiv",
  vacation: "Məzuniyyət",
  inactive: "Qeyri-aktiv",
  dismissed: "İşdən ayrılıb",
};

function CardActions({ name, onEdit, onDelete, className }: { name: string; onEdit: () => void; onDelete: () => void; className: string }) {
  return <div className={className}>
    <button type="button" onClick={onEdit} aria-label={`${name} redaktə et`} className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><Pencil size={16} /></button>
    <button type="button" onClick={onDelete} aria-label={`${name} sil`} className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button>
  </div>;
}

export default function StaffMemberCard({ member, roleName, branchName, serviceCount, onEdit, onDelete, onOnline, onServices, onSchedule, onPay, onEmployment, onHistory }: Props) {
  const active = member.status === "active";
  const initials = member.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toLocaleUpperCase("az-AZ");
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ backgroundColor: member.color }}>{initials}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words font-bold">{member.name}</h3>
            <BusinessStatusBadge tone={active ? "success" : member.status === "vacation" ? "warning" : "danger"}>{statusLabels[member.status]}</BusinessStatusBadge>
          </div>
          <p className="mt-1 break-words text-sm text-slate-600">{roleName} · {member.specialization || "İxtisas qeyd edilməyib"}</p>
          <p className="mt-1 break-words text-xs text-slate-500">{branchName}{member.phone && <> · <a className="underline" href={`tel:${member.phone.replace(/[^+\d]/g, "")}`}>{member.phone}</a></>}</p>
        </div>
        <CardActions name={member.name} onEdit={onEdit} onDelete={onDelete} className="hidden shrink-0 gap-1 sm:flex" />
      </div>
      <CardActions name={member.name} onEdit={onEdit} onDelete={onDelete} className="mt-2 flex justify-end gap-1 sm:hidden" />
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <button type="button" onClick={onOnline} aria-label={`${member.name}: onlayn qəbul ayarlarını redaktə et`} className={`min-h-9 rounded-lg px-3 text-xs font-bold cursor-pointer ${active && member.onlineBooking ? "bg-brand-primary" : "bg-slate-100 text-slate-500"}`}>Onlayn qəbul {active && member.onlineBooking ? "aktiv" : "bağlı"}</button>
        <button type="button" onClick={onServices} className="min-h-9 cursor-pointer rounded-lg bg-slate-100 px-3 text-xs font-bold">{serviceCount} xidmət</button>
        <button type="button" onClick={onSchedule} className="min-h-9 cursor-pointer rounded-lg bg-slate-100 px-3 text-xs font-bold">İş qrafiki</button>
        <button type="button" onClick={onPay} className="min-h-9 cursor-pointer rounded-lg bg-slate-100 px-3 text-xs font-bold">Komissiya: {member.serviceCommission}%</button>
        <button type="button" onClick={onEmployment} className={`min-h-9 cursor-pointer rounded-lg px-3 text-xs font-bold ${member.status === "dismissed" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{member.status === "dismissed" ? "İşə bərpa et" : "İşdən azad et"}</button>
        {!!member.employmentHistory?.length && <button type="button" onClick={onHistory} className="min-h-9 cursor-pointer rounded-lg bg-slate-100 px-3 text-xs font-bold">Tarixçə ({member.employmentHistory.length})</button>}
      </div>
    </article>
  );
}
