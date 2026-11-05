import { useState } from "react";
import { Clock3, CreditCard, FileText, MessageSquare, Scissors, UserRoundPlus } from "lucide-react";
import type { Booking } from "../calendar/bookings";
import type { Client } from "./clients";

type TimelineEvent = {
  id: string;
  date: string;
  kind: "visit" | "booking" | "register" | "deposit" | "cashback" | "file" | "message" | "other";
  title: string;
  detail?: string;
  staff?: string;
  amount?: number;
};

function displayDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();
  if (!value.includes("T")) return `${day}.${month}.${year}`;
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

function getEvents(client: Client, bookings: Booking[]): TimelineEvent[] {
  const firstVisit = [...client.visits].sort((a, b) => a.date.localeCompare(b.date))[0]?.date;
  const registeredAt = firstVisit ?? client.createdAt;
  const events: TimelineEvent[] = [
    { id: `register-${client.id}`, date: registeredAt, kind: "register", title: "Müştəri bazaya əlavə edildi" },
    ...client.visits.map((visit) => ({ id: `visit-${visit.id}`, date: visit.date, kind: "visit" as const, title: `Ziyarət: ${visit.service}`, staff: visit.staff, amount: visit.amount })),
    ...client.ledger.map((entry) => ({ id: `balance-${entry.id}`, date: entry.date, kind: entry.account === "deposit" ? "deposit" as const : "cashback" as const, title: `${entry.account === "deposit" ? "Depozit" : "Keşbek"}: ${entry.note || "Balans əməliyyatı"}`, detail: `${entry.amount > 0 ? "+" : ""}${entry.amount.toFixed(2)} ₼` })),
    ...client.files.map((file) => ({ id: `file-${file.id}`, date: file.date, kind: "file" as const, title: `Fayl yükləndi: ${file.name}` })),
    ...(client.messages ?? []).map((message) => ({ id: `message-${message.id}`, date: message.date, kind: "message" as const, title: `${message.channel === "sms" ? "SMS" : "WhatsApp"} mesajı hazırlandı`, detail: message.text })),
    ...client.notes.map((note) => ({ id: `note-${note.id}`, date: note.date, kind: "other" as const, title: "Şərh əlavə edildi", detail: note.text })),
    ...bookings.filter((booking) => !client.visits.some((visit) => visit.date === booking.date && visit.service === booking.service)).map((booking) => ({ id: `booking-${booking.id}`, date: `${booking.date}T${booking.time}`, kind: "booking" as const, title: `Qəbul: ${booking.service}`, staff: booking.masterName, detail: booking.status })),
  ];
  return events.sort((a, b) => b.date.localeCompare(a.date) || (a.kind === "register" ? 1 : b.kind === "register" ? -1 : 0));
}

const icons = {
  visit: { Icon: Scissors, className: "border-emerald-100 bg-emerald-50 text-emerald-600" },
  booking: { Icon: Scissors, className: "border-emerald-100 bg-emerald-50 text-emerald-600" },
  register: { Icon: UserRoundPlus, className: "border-blue-100 bg-blue-50 text-blue-600" },
  deposit: { Icon: CreditCard, className: "border-amber-100 bg-amber-50 text-amber-600" },
  cashback: { Icon: CreditCard, className: "border-emerald-100 bg-emerald-50 text-emerald-600" },
  file: { Icon: FileText, className: "border-lime-100 bg-lime-50 text-lime-600" },
  message: { Icon: MessageSquare, className: "border-slate-200 bg-slate-100 text-slate-700" },
  other: { Icon: MessageSquare, className: "border-slate-200 bg-slate-100 text-slate-500" },
};

export default function ClientTimeline({ client, bookings, compact = false }: { client: Client; bookings: Booking[]; compact?: boolean }) {
  const [limit, setLimit] = useState(compact ? 4 : 10);
  const events = getEvents(client, bookings);
  return <section className={compact ? "space-y-3" : "mt-4 space-y-4 text-xs"}>
    {!compact && <div className="flex items-start justify-between gap-2"><div className="min-w-0"><h3 className="text-sm font-bold text-slate-900">Tarixçə</h3><p className="mt-0.5 text-[11px] font-medium text-slate-400">Müştəri ilə bağlı bütün hadisələr: ziyarətlər, fayllar, mesajlar və dəyişikliklər</p></div><span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">{events.length}</span></div>}
    <div className="space-y-4">{events.slice(0, limit).map((event) => {
      const { Icon, className } = icons[event.kind];
      return <article key={event.id} className="flex min-w-0 gap-2.5"><span className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${className}`}><Icon size={16} /></span><div className="min-w-0 flex-1 pt-0.5"><p className="break-words text-xs font-medium leading-snug text-slate-700">{event.kind === "visit" ? <><strong className="text-slate-900">{event.title.split(":")[0]}:</strong>{event.title.slice(event.title.indexOf(":") + 1)}</> : event.title}</p>{(event.staff || event.amount !== undefined || event.detail) && <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-slate-500">{event.staff && <span>{event.staff}</span>}{event.staff && event.amount !== undefined && <span className="text-slate-300">•</span>}{event.amount !== undefined && <strong className="text-slate-800">{event.amount.toFixed(2)} ₼</strong>}{event.kind === "visit" && <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">Tamamlandı</span>}{event.detail && <span className="break-words">{event.detail}</span>}</div>}<time className="mt-0.5 block text-[11px] font-medium text-slate-400">{displayDate(event.date)}</time></div></article>;
    })}{!events.length && <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center"><span className="mx-auto mb-2 flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400"><Clock3 size={20} /></span><strong className="block text-slate-700">Hələ hadisə yoxdur</strong><p className="mt-0.5 text-[11px] text-slate-400">Ziyarətlər və dəyişikliklər burada görünəcək</p></div>}</div>
    {events.length > limit && <div className="flex flex-col items-center gap-1.5 pt-1"><button type="button" onClick={() => setLimit((current) => current + 10)} className="min-h-9 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700">Daha çox</button><span className="text-[11px] text-slate-400">{Math.min(limit, events.length)} / {events.length} göstərilir</span></div>}
  </section>;
}
