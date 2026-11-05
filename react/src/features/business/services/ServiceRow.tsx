import { Clock3, Pencil, Trash2 } from "lucide-react";
import type { StaffMember } from "../staff/staff";
import { formatLabels, formatPrice, genderLabels, type Service } from "./services";

interface Props {
  service: Service;
  staff: StaffMember[];
  onEdit: () => void;
  onDelete: () => void;
}

export default function ServiceRow({ service, staff, onEdit, onDelete }: Props) {
  const assignedStaff = staff.filter((member) => service.staffIds.includes(member.id));
  const online = service.onlineBooking;

  return (
    <div className="relative before:absolute before:-left-[18px] before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-slate-200/90 sm:before:-left-[22px] sm:before:w-5">
      <article className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 shadow-2xs transition hover:border-slate-300/80 hover:bg-white sm:flex-row sm:items-center sm:p-3.5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="min-w-0 break-words text-xs font-bold text-slate-900 sm:text-sm">{service.name}</h4>
            {(service.isCombo || service.format !== "individual") && <span className="rounded-md border border-indigo-200 bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-900">{service.isCombo ? formatLabels.combo : formatLabels[service.format]}</span>}
            {service.gender !== "all" && <span className="rounded-md border border-purple-100 bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700">{genderLabels[service.gender]}</span>}
            <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${online ? "border-emerald-200/60 bg-emerald-50 text-emerald-800" : "border-slate-200/60 bg-slate-100 text-slate-600"}`}>
              <span className={`size-1.5 rounded-full ${online ? "bg-emerald-500" : "bg-slate-400"}`} />{online ? "Onlayn qəbul" : "Salonda"}
            </span>
          </div>
          {assignedStaff.length > 0 && <p className="mt-1.5 truncate text-[10px] font-medium text-slate-500">Ustalar: {assignedStaff.map((member) => member.name).join(", ")}</p>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 sm:shrink-0 sm:flex-nowrap sm:justify-end sm:gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs"><Clock3 size={14} className="text-slate-400" />{service.duration} dəq</span>
          <div className="min-w-[70px] text-right"><strong className="text-xs text-slate-900 sm:text-sm">{formatPrice(service)}</strong>{service.priceType !== "fixed" && <p className={`text-[9px] font-medium ${service.priceType === "from" ? "text-amber-700" : "text-blue-700"}`}>{service.priceType === "from" ? "başlanğıc" : "aralıq"}</p>}</div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={onEdit} aria-label={`${service.name} redaktə et`} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700"><Pencil size={14} /></button>
            <button type="button" onClick={onDelete} aria-label={`${service.name} sil`} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-red-600"><Trash2 size={14} /></button>
          </div>
        </div>
      </article>
    </div>
  );
}
