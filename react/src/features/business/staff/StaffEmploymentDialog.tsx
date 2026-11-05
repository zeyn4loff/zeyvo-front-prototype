import EmptyState from "../../../components/common/EmptyState";
import { businessLabelClass } from "../components/BusinessField";
import { businessControlClass } from "../components/BusinessField";
import { useState, type FormEvent } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import BusinessDatePicker from "../components/BusinessDatePicker";
import { dismissStaff, rehireStaff, todayLocalDate, type DismissalInfo, type StaffMember, type StaffRole } from "./staff";

type Mode = "dismiss" | "rehire" | "history";
const reasons = ["Öz istəyi ilə (Ərizə əsasında)", "Müqavilə müddətinin bitməsi", "Tərəflərin qarşılıqlı razılığı ilə", "Əmək və intizam qaydalarının pozulması", "Ştat ixtisarı / Yenidən təşkilatlanma", "Sınaq müddətindən keçməməsi", "Digər səbəb"];
const field = businessControlClass;

export default function StaffEmploymentDialog({ member, roles, mode, onClose, onSave, onModeChange }: { member: StaffMember; roles: StaffRole[]; mode: Mode; onClose: () => void; onSave: (member: StaffMember) => void; onModeChange: (mode: Mode) => void }) {
  const [error, setError] = useState("");
  const [eventDate, setEventDate] = useState(todayLocalDate());
  const roleName = (id: string) => roles.find((role) => role.id === id)?.name ?? "Vəzifəsiz";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const date = String(form.get("date") ?? "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { setError("Tarixi seçin."); return; }
    if (mode === "dismiss") {
      if (member.status === "dismissed") return;
      const info: DismissalInfo = { reason: String(form.get("reason") ?? ""), date, docNo: String(form.get("docNo") ?? "").trim(), note: String(form.get("note") ?? "").trim() };
      if (!info.reason) { setError("İşdən ayrılma səbəbini seçin."); return; }
      onSave(dismissStaff(member, info));
    } else if (mode === "rehire") {
      if (member.status !== "dismissed") return;
      onSave(rehireStaff(member, { date, roleId: String(form.get("roleId") ?? ""), onlineBooking: form.get("onlineBooking") === "on", note: String(form.get("note") ?? "").trim() }));
    }
  }

  return <BusinessFormDialog title={mode === "dismiss" ? "Ustanı işdən azad et" : mode === "rehire" ? "Yenidən işə qəbul et" : "Məşğulluq tarixçəsi"} description={`Heyət məlumatları · ${member.name}`} onClose={onClose} size="medium">
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3"><strong className="block break-words text-sm">{member.name}</strong><p className="mt-1 break-words text-xs text-slate-500">{roleName(member.roleId)} · {member.phone || "Telefon yoxdur"}</p>{member.dismissalInfo && <p className="mt-2 break-words text-xs text-rose-700">Son xitam: {member.dismissalInfo.reason} · {member.dismissalInfo.date}</p>}</div>
    {mode === "history" ? <div className="space-y-3"><h3 className="text-sm font-bold">Məşğulluq tarixçəsi</h3>{[...(member.employmentHistory ?? [])].reverse().map((event, index) => <article key={`${event.type}-${event.date}-${index}`} className="rounded-xl border border-slate-200 p-3 text-sm"><div className="flex flex-wrap items-center justify-between gap-2"><strong className={event.type === "dismissed" ? "text-rose-700" : "text-emerald-700"}>{event.type === "dismissed" ? "İşdən azad edilib" : "Yenidən işə qəbul edilib"}</strong><time className="text-xs text-slate-500">{event.date}</time></div><p className="mt-1 break-words text-xs text-slate-600">{event.type === "dismissed" ? event.reason : roleName(event.roleId)}</p>{event.type === "dismissed" && event.docNo && <p className="mt-1 break-words text-xs text-slate-500">Sənəd: {event.docNo}</p>}{event.note && <p className="mt-1 break-words text-xs text-slate-500">{event.note}</p>}</article>)}{!member.employmentHistory?.length && <EmptyState title="Hələ tarixçə yoxdur" compact />}<button type="button" onClick={() => onModeChange(member.status === "dismissed" ? "rehire" : "dismiss")} className="min-h-11 w-full cursor-pointer rounded-xl bg-slate-900 px-4 text-sm font-bold text-white">{member.status === "dismissed" ? "İşə bərpa et" : "İşdən azad et"}</button></div> : <form onSubmit={submit} className="space-y-4"><div className="grid gap-3 sm:grid-cols-2"><div className={businessLabelClass}>{mode === "dismiss" ? "Xitam tarixi *" : "İşə başlama tarixi *"}<BusinessDatePicker name="date" value={eventDate} onChange={setEventDate} label={mode === "dismiss" ? "Xitam tarixi" : "İşə başlama tarixi"} /></div>{mode === "dismiss" ? <label className={businessLabelClass}>Sənəd nömrəsi<input name="docNo" maxLength={80} placeholder="Əmr № 14-K" className={field} /></label> : <label className={businessLabelClass}>Vəzifə<select name="roleId" defaultValue={member.roleId} className={field}><option value="">Vəzifəsiz</option>{roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select></label>}</div>{mode === "dismiss" ? <label className={businessLabelClass}>İşdən ayrılma səbəbi *<select name="reason" required className={field}>{reasons.map((reason) => <option key={reason} value={reason}>{reason}</option>)}</select></label> : <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm font-semibold"><input type="checkbox" name="onlineBooking" defaultChecked className="size-4 accent-slate-900" />Onlayn qəbul aktiv olsun</label>}<label className={businessLabelClass}>Əlavə qeyd<textarea name="note" maxLength={500} rows={3} className={`${field} py-3`} /></label>{mode === "dismiss" && <p className="rounded-xl bg-rose-50 p-3 text-xs leading-5 text-rose-800">Ustanın onlayn qəbulu bağlanacaq. Tarixçə saxlanacaq və usta sonradan bərpa edilə bilər.</p>}{error && <p role="alert" className="text-xs text-rose-600">{error}</p>}<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 text-sm font-semibold">İmtina</button><button type="submit" className={`min-h-11 cursor-pointer rounded-xl px-5 text-sm font-bold ${mode === "dismiss" ? "bg-rose-600 text-white" : "bg-brand-primary text-slate-900"}`}>{mode === "dismiss" ? "İşdən azad et" : "İşə bərpa et"}</button></div></form>}
  </BusinessFormDialog>;
}
