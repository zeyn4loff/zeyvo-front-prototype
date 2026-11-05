import EmptyState from "../../../components/common/EmptyState";
import { NotebookPen, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Booking } from "../calendar/bookings";
import BusinessDatePicker from "../components/BusinessDatePicker";
import { localToday } from "../components/businessDate";
import type { StaffMember } from "../staff/staff";
import { latestVisit, totalVisits, type Client } from "./clients";
import { clientBox as box, clientField as field, clientLabel as label } from "./clientProfileStyles";

const money = (value: number) => `${value.toFixed(2)} ₼`;
const dateText = (value: string) => value?.slice(0, 10).split("-").reverse().join(".") || "—";

type HistoryProps = {
  client: Client;
  matchedBookings: Booking[];
  staff: StaffMember[];
  visitOpen: boolean;
  setVisitOpen: (open: boolean) => void;
  addVisit: (event: FormEvent<HTMLFormElement>) => void;
  persist: (next: Client) => boolean;
};
export function ClientHistorySection({ client, matchedBookings, staff, visitOpen, setVisitOpen, addVisit, persist }: HistoryProps) {
  const [visitDate, setVisitDate] = useState(localToday);
  const visits = [...client.visits].sort((a, b) => b.date.localeCompare(a.date));
  return <div className="mt-4 space-y-4 text-xs">
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 sm:flex-row sm:items-center sm:justify-between">
      <div><h3 className="font-bold text-slate-900">Ziyarət və xidmət jurnalı</h3><p className="mt-1 text-[11px] text-slate-500">Cəmi: <strong className="text-slate-800">{totalVisits(client)} qəbul</strong>{latestVisit(client) && <> · Sonuncu ziyarət: {dateText(latestVisit(client))}</>}</p></div>
      <div className="flex flex-wrap gap-2"><button type="button" onClick={() => setVisitOpen(!visitOpen)} className={`min-h-9 cursor-pointer rounded-xl px-3 font-bold ${visitOpen ? "bg-slate-200" : "bg-brand-primary"}`}>{visitOpen ? "Formu bağla" : "+ Ziyarət əlavə et"}</button><a href="/partner/calendar" className="inline-flex min-h-9 items-center rounded-xl border border-slate-200 bg-white px-3 font-semibold">Təqvimdə qəbul yaz</a></div>
    </div>
    {visitOpen && <form onSubmit={addVisit} className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4"><h4 className="font-bold text-amber-950">Yeni ziyarət qeydi əlavə et</h4><div className="grid gap-2.5 sm:grid-cols-4"><div className={label}>Tarix<BusinessDatePicker name="date" value={visitDate} onChange={setVisitDate} label="Ziyarət tarixi" /></div><label className={`${label} sm:col-span-2`}>Göstərilən xidmət *<input name="service" required maxLength={120} placeholder="Məsələn: Saç kəsimi və saqqal" className={`${field} bg-white`} /></label><label className={label}>Məbləğ (₼)<input name="amount" type="number" min="0" step="0.01" required placeholder="0.00" className={`${field} bg-white`} /></label></div><div className="grid gap-2.5 sm:grid-cols-2"><label className={label}>Xidmət göstərən mütəxəssis<select name="staff" defaultValue={staff.find((item) => item.id === client.preferredStaffId)?.name ?? ""} className={`${field} bg-white`}><option value="">Seçilməyib</option>{staff.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label><div className="flex items-end justify-end gap-2"><button type="button" onClick={() => setVisitOpen(false)} className="min-h-10 rounded-xl bg-slate-100 px-4 font-semibold">İmtina</button><button type="submit" className="min-h-10 rounded-xl bg-brand-primary px-5 font-bold">Yadda saxla</button></div></div><label className={label}>Qeyd<input name="note" maxLength={200} className={`${field} bg-white`} /></label></form>}
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[550px] text-left text-xs"><thead className="border-b border-slate-200 bg-slate-50 text-slate-500"><tr>{["Tarix", "Xidmət", "Mütəxəssis", "Məbləğ", "Status", "Fəaliyyət"].map((heading) => <th key={heading} className="whitespace-nowrap px-3 py-2.5">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{visits.map((visit) => <tr key={visit.id}><td className="whitespace-nowrap px-3 py-2.5 font-mono">{dateText(visit.date)}</td><td className="px-3 py-2.5 font-bold">{visit.service}</td><td className="px-3 py-2.5">{visit.staff || "—"}</td><td className="whitespace-nowrap px-3 py-2.5 font-mono font-bold">{money(visit.amount)}</td><td className="px-3 py-2.5"><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">● Tamamlandı</span></td><td className="px-3 py-2.5 text-right"><button type="button" aria-label={`${visit.service} ziyarətini sil`} onClick={() => persist({ ...client, visits: client.visits.filter((item) => item.id !== visit.id) })} className="inline-flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-700"><Trash2 size={15} /></button></td></tr>)}{!visits.length && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">Hələlik ziyarət qeydə alınmayıb</td></tr>}</tbody></table></div></div>
    {!!matchedBookings.length && <section className="space-y-2"><h4 className="font-bold">Təqvimdəki qəbullar</h4>{matchedBookings.map((booking) => <div key={booking.id} className={`${box} flex flex-wrap justify-between gap-2`}><div><strong>{booking.service}</strong><p className="mt-1 text-slate-500">{dateText(booking.date)} {booking.time} · {booking.masterName}</p></div><span className="text-slate-500">{booking.status}</span></div>)}</section>}
  </div>;
}

type NotesProps = { client: Client; addNote: (event: FormEvent<HTMLFormElement>) => void };
export function ClientNotesSection({ client, addNote }: NotesProps) {
  return <div className="mt-4 space-y-3"><form onSubmit={addNote} className={`${box} space-y-2`}><label className={label}>Yeni şərh<textarea name="text" required rows={3} maxLength={800} className={`${field} py-3`} /></label><button type="submit" className="min-h-10 w-full cursor-pointer rounded-xl bg-brand-primary text-xs font-bold">Şərhi əlavə et</button></form>{client.note && <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs"><strong>Əsas qeyd (profil)</strong><p className="mt-1">{client.note}</p></div>}{client.notes.map((item) => <div key={item.id} className={box}><p className="break-words text-xs">{item.text}</p><p className="mt-2 text-[11px] text-slate-400">{new Date(item.date).toLocaleString("az-AZ")}</p></div>)}{!client.notes.length && <EmptyState title="Hələ şərh yoxdur" description="İlk şərhi yuxarıdakı sahədən əlavə edin" icon={NotebookPen} compact />}</div>;
}

