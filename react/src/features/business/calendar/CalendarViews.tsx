import EmptyState from "../../../components/common/EmptyState";
import { useState } from "react";
import { Pencil, Search, CalendarDays, Filter, X, Check } from "lucide-react";
import type { Booking, BookingStatus } from "./bookings";
import { bookingColor, type CalendarAppearance } from "./calendarAppearance";
import { minutes, prettyDate, weekDates } from "./calendarDates";
import BusinessStatusBadge from "../components/BusinessStatusBadge";
import type { StaffMember, StaffRole } from "../staff/staff";

export type CalendarView = "daily" | "weekly" | "pending";
export type EditingBooking = { booking?: Booking; date: string; time: string; masterName?: string };

const statusTone: Record<BookingStatus, "warning" | "info" | "success" | "neutral"> = {
  "Gözlənilir": "warning",
  "Təsdiqləndi": "info",
  "Gəldi": "warning",
  "Xidmət göstərilir": "info",
  "Tamamlandı": "success",
  "Gəlmədi": "neutral",
  "Ləğv edildi": "neutral",
};

type BookingActions = {
  onEdit: (booking: Booking) => void;
  onStatus: (id: string, status: BookingStatus) => void;
};

function BookingCard({ booking, appearance, onEdit, onStatus }: { booking: Booking; appearance: CalendarAppearance } & BookingActions) {
  return (
    <article className="rounded-xl border border-slate-200 border-l-4 bg-white p-3 shadow-sm" style={{ borderLeftColor: bookingColor(booking, appearance) }}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <strong className="break-words text-sm">{booking.clientName}</strong>
            <BusinessStatusBadge tone={statusTone[booking.status]}>{booking.status}</BusinessStatusBadge>
          </div>
          <p className="mt-1 break-words text-xs text-slate-600">{booking.service} · {booking.masterName}</p>
          <p className="mt-1 text-xs font-semibold text-slate-600">{booking.time} · {booking.durationMinutes} dəq · {booking.price} ₼</p>
        </div>
        <button type="button" onClick={() => onEdit(booking)} aria-label={`${booking.clientName} qəbulunu redaktə et`} className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"><Pencil size={16} /></button>
      </div>
      {booking.source === "online" && <p className="mt-2 text-[11px] font-semibold text-amber-700">Onlayn müraciət</p>}
      {booking.status === "Gözlənilir" && <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => onStatus(booking.id, "Təsdiqləndi")} className="min-h-9 cursor-pointer rounded-lg bg-brand-primary px-3 text-xs font-bold">Təsdiq et</button>
        <button type="button" onClick={() => onStatus(booking.id, "Ləğv edildi")} className="min-h-9 cursor-pointer rounded-lg bg-slate-100 px-3 text-xs font-semibold">Ləğv et</button>
      </div>}
    </article>
  );
}

function MasterAvatar({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(/\s+/).map((part) => part[0]).filter(Boolean).join("").slice(0, 2).toLocaleUpperCase("az-AZ");
  return <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-black/5">{src && !failed ? <img src={src} alt="" onError={() => setFailed(true)} className="size-full object-cover" /> : initials}</span>;
}

export function DailyView({ date, bookings, masters, staff, roles, appearance, onEdit, onStatus, onCreate }: { date: string; bookings: Booking[]; masters: string[]; staff: StaffMember[]; roles: StaffRole[]; appearance: CalendarAppearance; onCreate: (time: string, masterName: string) => void } & BookingActions) {
  const gridStyle = { minWidth: Math.max(860, 80 + masters.length * 220), gridTemplateColumns: `80px repeat(${masters.length}, minmax(220px, 1fr))` };
  return <section className="space-y-3">
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
      <h2 className="text-sm font-bold">{prettyDate(date)} · Günlük qəbullar</h2>
      <div className="space-y-2 lg:hidden">{bookings.map((booking) => <BookingCard key={booking.id} booking={booking} appearance={appearance} onEdit={onEdit} onStatus={onStatus} />)}{!bookings.length && <EmptyState title="Bu tarixdə qəbul yoxdur" description="Başqa tarix seçin və ya yeni qəbul əlavə edin." icon={CalendarDays} compact />}</div>
      <div className="hidden max-h-[690px] overflow-auto rounded-xl border border-slate-200 lg:block">
        <div className="sticky top-0 z-10 grid bg-slate-50 text-xs font-bold" style={gridStyle}><span className="border-r border-slate-200 p-3">Saat</span>{masters.map((name) => { const member = staff.find((person) => person.name === name); const role = roles.find((item) => item.id === member?.roleId)?.name ?? "Mütəxəssis"; return <span key={name} className="flex min-w-0 items-center gap-2.5 border-r border-slate-200 p-2.5 sm:p-3"><MasterAvatar name={name} src={member?.avatar} /><span className="min-w-0"><strong className="block truncate text-xs text-slate-900">{name}</strong><small className="block truncate font-normal text-slate-400">{role} · {bookings.filter((booking) => booking.masterName === name).length} qəbul</small></span></span>; })}</div>
        <div className="grid" style={gridStyle}>
          <div>{Array.from({ length: 14 }, (_, index) => <div key={index} className="h-16 border-r border-t border-slate-100 p-2 text-xs text-slate-400">{String(index + 8).padStart(2, "0")}:00</div>)}</div>
          {masters.map((name) => <div key={name} className="relative border-r border-slate-200" style={{ height: 14 * 64 }}>
            <div className="absolute inset-0">{Array.from({ length: 14 }, (_, index) => {
              const time = `${String(index + 8).padStart(2, "0")}:00`;
              return <button key={index} type="button" onClick={() => onCreate(time, name)} aria-label={`${name} üçün ${time} qəbul əlavə et`} className="group block h-16 w-full cursor-pointer border-t border-slate-100 text-center text-[11px] font-semibold text-amber-800 hover:bg-amber-50 focus-visible:bg-amber-50 focus-visible:outline-2 focus-visible:outline-amber-400"><span className="opacity-50 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">+ Qəbul</span></button>;
            })}</div>
            {bookings.filter((booking) => booking.masterName === name && minutes(booking.time) >= 480 && minutes(booking.time) < 1320).map((booking) => <button key={booking.id} type="button" onClick={() => onEdit(booking)} style={{ top: `${(minutes(booking.time) - 480) / 60 * 64}px`, height: `${Math.max(34, booking.durationMinutes / 60 * 64)}px`, borderColor: bookingColor(booking, appearance), backgroundColor: `${bookingColor(booking, appearance)}66` }} className={`absolute inset-x-1 z-[1] overflow-hidden rounded-lg border p-1.5 text-left text-[11px] ${booking.status === "Ləğv edildi" ? "opacity-45" : ""}`}><strong className="block truncate">{booking.time} {booking.clientName}</strong><span className="block truncate">{booking.service}</span></button>)}
          </div>)}
        </div>
      </div>
    </div>
  </section>;
}

export function WeeklyView({ date, bookings, appearance, onSelectDay, onEdit }: { date: string; bookings: Booking[]; appearance: CalendarAppearance; onSelectDay: (date: string) => void; onEdit: (booking: Booking) => void }) {
  const week = weekDates(date);
  return <section className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
    <h2 className="mb-3 text-sm font-bold">{prettyDate(week[0])} – {prettyDate(week[6])}</h2>
    <div className="max-w-full overflow-x-auto"><div className="grid min-w-[980px] grid-cols-7 gap-3">{week.map((day) => {
      const dayBookings = bookings.filter((booking) => booking.date === day).sort((a, b) => a.time.localeCompare(b.time));
      return <div key={day} className={`flex min-h-[340px] min-w-0 flex-col rounded-xl border p-3 ${day === date ? "border-brand-primary bg-amber-50/40" : "border-slate-200 bg-slate-50/70"}`}>
        <button type="button" onClick={() => onSelectDay(day)} className="mb-2 flex w-full cursor-pointer items-center justify-between border-b border-slate-200 pb-2 text-left text-xs font-bold hover:underline"><span>{prettyDate(day, true)}</span><span className="flex size-5 items-center justify-center rounded-full bg-slate-200 text-[10px]">{dayBookings.length}</span></button>
        <div className="space-y-2">{dayBookings.map((booking) => <button key={booking.id} type="button" onClick={() => onEdit(booking)} style={{ borderLeftColor: bookingColor(booking, appearance), backgroundColor: `${bookingColor(booking, appearance)}33` }} className="w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200 border-l-4 p-2 text-left text-[11px] shadow-sm hover:shadow-md"><span className="flex items-center justify-between gap-1"><strong className="font-mono">{booking.time}</strong><BusinessStatusBadge tone={statusTone[booking.status]}>{booking.status}</BusinessStatusBadge></span><span className="mt-1 flex items-center justify-between gap-1"><strong className="truncate">{booking.clientName}</strong><b className="shrink-0 font-mono">{booking.price} ₼</b></span><span className="mt-1 block truncate text-slate-600">{booking.service}</span><span className="mt-1 block truncate border-t border-slate-200 pt-1 text-slate-500">{booking.phone || booking.masterName}</span></button>)}{!dayBookings.length && <p className="py-3 text-center text-[11px] text-slate-400">Qəbul yoxdur</p>}</div>
      </div>;
    })}</div></div>
  </section>;
}

function PendingBookingRow({ booking, onEdit, onStatus }: { booking: Booking } & BookingActions) {
  const pending = booking.status === "Gözlənilir";
  const cell = "min-w-0 px-0 py-0 before:mb-1 before:block before:text-[10px] before:font-bold before:text-slate-400 sm:px-4 sm:py-3 sm:before:hidden";
  return (
    <tr className={`grid grid-cols-2 gap-x-3 gap-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:table-row sm:rounded-none sm:border-0 sm:p-0 sm:shadow-none ${pending ? "sm:bg-amber-50/20" : ""}`}>
      <td data-label="Tarix & Vaxt" className={`${cell} before:content-[attr(data-label)]`}><strong className="block font-mono">{booking.date}</strong><span className="font-mono text-slate-500">{booking.time}</span></td>
      <td data-label="Müştəri" className={`${cell} col-span-2 before:content-[attr(data-label)] sm:col-auto`}><strong>{booking.clientName}</strong><a href={`tel:${booking.phone}`} className="block text-slate-500">{booking.phone}</a></td>
      <td data-label="Xidmət & Usta" className={`${cell} col-span-2 before:content-[attr(data-label)] sm:col-auto`}><strong>{booking.service}</strong><span className="block text-slate-500">Usta: {booking.masterName || "İstənilən usta"}</span>{booking.note && <span className="block break-words text-slate-400">Qeyd: {booking.note}</span>}</td>
      <td data-label="Məbləğ & Müddət" className={`${cell} text-right before:content-[attr(data-label)] sm:text-left`}><strong>{booking.price.toFixed(2)} ₼</strong><span className="block text-slate-500">{booking.durationMinutes} dəq</span></td>
      <td data-label="Status" className={`${cell} col-span-2 before:content-[attr(data-label)] sm:col-auto`}><BusinessStatusBadge tone={statusTone[booking.status]}>{pending ? "Təsdiq gözləyir" : booking.status === "Təsdiqləndi" ? "Təsdiqlənib" : booking.status}</BusinessStatusBadge><span className="mt-1 block text-[10px] text-blue-600">Onlayn qəbul</span></td>
      <td data-label="Əməliyyat" className={`${cell} col-span-2 before:content-[attr(data-label)] sm:col-auto`}><div className="flex flex-wrap items-center gap-1.5">{pending && <button type="button" onClick={() => onStatus(booking.id, "Təsdiqləndi")} className="min-h-9 rounded-xl bg-brand-primary px-3 py-2 font-bold">Təsdiqlə</button>}<button type="button" onClick={() => onEdit(booking)} className="min-h-9 rounded-xl bg-slate-100 px-3 py-2 font-semibold">{pending ? "Redaktə" : "Bax"}</button>{pending && <button type="button" onClick={() => { if (window.confirm(`${booking.clientName} tərəfindən göndərilən qəbul müraciətini ləğv etmək istəyirsiniz?`)) onStatus(booking.id, "Ləğv edildi"); }} className="min-h-9 rounded-xl bg-rose-50 px-3 py-2 font-semibold text-rose-700">İmtina</button>}</div></td>
    </tr>
  );
}

export function PendingView({ bookings, search, onSearch, onEdit, onStatus }: { bookings: Booking[]; appearance: CalendarAppearance; search: string; onSearch: (value: string) => void } & BookingActions) {
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("all");
  const [master, setMaster] = useState("all");
  const [sort, setSort] = useState("soonest");
  const [filterOpen, setFilterOpen] = useState(false);
  const [draft, setDraft] = useState({ status: "all", date: "all", master: "all", sort: "soonest" });
  const [page, setPage] = useState(1);
  const today = new Date();
  const key = (value: Date) => `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
  const todayKey = key(today);
  const tomorrowKey = key(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
  const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - ((today.getDay() + 6) % 7));
  const weekEndKey = key(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6));
  const weekStartKey = key(weekStart);
  const requests = bookings.filter((booking) => booking.source === "online" || booking.status === "Gözlənilir");
  const q = search.trim().toLocaleLowerCase("az");
  const online = requests.filter((booking) =>
    (status === "all" || booking.status === status) &&
    (master === "all" || booking.masterName === master) &&
    (date === "all" || (date === "today" && booking.date === todayKey) || (date === "tomorrow" && booking.date === tomorrowKey) || (date === "week" && booking.date >= weekStartKey && booking.date <= weekEndKey)) &&
    (!q || [booking.clientName, booking.phone, booking.service, booking.masterName].some((value) => value?.toLocaleLowerCase("az").includes(q)))
  ).sort((a, b) => sort === "newest" ? `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`) : sort === "price-high" ? b.price - a.price : sort === "price-low" ? a.price - b.price : sort === "name" ? a.clientName.localeCompare(b.clientName, "az") : `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const totalPages = Math.max(1, Math.ceil(online.length / 10));
  const shown = online.slice((Math.min(page, totalPages) - 1) * 10, Math.min(page, totalPages) * 10);
  const activeCount = Number(status !== "all") + Number(date !== "all") + Number(master !== "all") + Number(sort !== "soonest");
  const reset = () => { setStatus("all"); setDate("all"); setMaster("all"); setSort("soonest"); onSearch(""); setPage(1); };
  const chooseTab = (next: "all" | "pending" | "today" | "confirmed") => { setStatus(next === "all" ? "all" : next === "confirmed" ? "Təsdiqləndi" : "Gözlənilir"); setDate(next === "today" ? "today" : "all"); setPage(1); };
  const tab = status === "Gözlənilir" && date === "today" ? "today" : status === "Gözlənilir" && date === "all" ? "pending" : status === "Təsdiqləndi" && date === "all" ? "confirmed" : status === "all" && date === "all" ? "all" : "custom";
  const chip = (label: string, clear: () => void) => <span className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold">{label}<button type="button" aria-label={`${label} filtrini sil`} onClick={() => { clear(); setPage(1); }} className="rounded p-0.5 hover:bg-slate-200"><X size={12} /></button></span>;
  return <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4"><div><h2 className="text-base font-bold">Onlayn müraciətlər və gözləyənlər <span className="rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 text-xs text-amber-900">{requests.filter((booking) => booking.status === "Gözlənilir").length} təsdiq gözləyir</span></h2><p className="mt-1 text-xs text-slate-500">Müştərilər tərəfindən platformadan göndərilən rezervasiya istəkləri</p></div><span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs">Cəmi məbləğ: <b>{online.reduce((sum, booking) => sum + booking.price, 0).toFixed(2)} ₼</b></span></div>
    <div className="max-w-full overflow-x-auto"><div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs font-semibold">{([{ value: "all", label: `Bütün müraciətlər (${requests.length})` }, { value: "pending", label: `Təsdiq gözləyənlər (${requests.filter((booking) => booking.status === "Gözlənilir").length})` }, { value: "today", label: `Bugünkü (${requests.filter((booking) => booking.status === "Gözlənilir" && booking.date === todayKey).length})` }, { value: "confirmed", label: `Təsdiqlənmişlər (${requests.filter((booking) => booking.status === "Təsdiqləndi").length})` }] as const).map((item) => <button key={item.value} type="button" onClick={() => chooseTab(item.value)} className={`min-h-9 whitespace-nowrap rounded-lg px-3.5 ${tab === item.value ? "bg-white font-bold shadow-sm" : "text-slate-600"}`}>{item.label}</button>)}</div></div>
    <div className="flex gap-2"><label className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl border border-slate-200 px-3.5"><Search size={16} className="shrink-0 text-slate-400" /><input aria-label="Müraciətlərdə axtar" value={search} onChange={(event) => { onSearch(event.target.value); setPage(1); }} placeholder="Müştəri adı, telefon, xidmət və ya usta üzrə axtarış..." className="min-w-0 flex-1 text-xs outline-none" />{search && <button type="button" aria-label="Axtarışı təmizlə" onClick={() => onSearch("")}><X size={15} /></button>}</label><button type="button" onClick={() => { setDraft({ status, date, master, sort }); setFilterOpen(true); }} className="flex min-h-11 shrink-0 items-center gap-2 rounded-2xl border border-slate-200 px-3.5 text-xs font-semibold"><Filter size={16} /><span className="hidden sm:inline">Filtrlər</span>{activeCount > 0 && <span className="flex size-5 items-center justify-center rounded-full bg-slate-900 text-[10px] text-white">{activeCount}</span>}</button></div>
    {(activeCount > 0 || search) && <div className="flex flex-wrap items-center gap-2"><span className="text-[11px] text-slate-400">Aktiv:</span>{search && chip(`Axtarış: ${search}`, () => onSearch(""))}{status !== "all" && chip(`Status: ${status}`, () => setStatus("all"))}{date !== "all" && chip(`Tarix: ${date === "today" ? "Bugünkü" : date === "tomorrow" ? "Sabahkı" : "Bu həftə"}`, () => setDate("all"))}{master !== "all" && chip(`Usta: ${master}`, () => setMaster("all"))}{sort !== "soonest" && chip("Sıralama", () => setSort("soonest"))}<button type="button" onClick={reset} className="text-xs font-semibold text-rose-600">Filtrləri sıfırla</button></div>}
    {shown.length ? <div className="max-w-full sm:overflow-x-auto sm:rounded-2xl sm:border sm:border-slate-200"><table className="block w-full text-left text-xs sm:table sm:min-w-[850px]"><thead className="hidden bg-slate-50 text-slate-500 sm:table-header-group"><tr>{["Tarix & Vaxt", "Müştəri", "Xidmət & Usta", "Məbləğ & Müddət", "Status", "Əməliyyat"].map((label) => <th key={label} className="px-4 py-3 font-semibold">{label}</th>)}</tr></thead><tbody className="grid gap-3 sm:table-row-group sm:divide-y sm:divide-slate-100">{shown.map((booking) => <PendingBookingRow key={booking.id} booking={booking} onEdit={onEdit} onStatus={onStatus} />)}</tbody></table></div> : <EmptyState title="Müraciət tapılmadı" description="Seçilmiş filtrlərə və ya axtarışa uyğun onlayn qəbul müraciəti tapılmadı." icon={CalendarDays} compact />}

    {totalPages > 1 && <div className="flex items-center justify-center gap-3"><button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className="min-h-10 rounded-xl bg-slate-100 px-3 text-xs font-bold disabled:opacity-40">Əvvəlki</button><span className="text-xs">{Math.min(page, totalPages)} / {totalPages}</span><button type="button" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="min-h-10 rounded-xl bg-slate-100 px-3 text-xs font-bold disabled:opacity-40">Növbəti</button></div>}
    {filterOpen && <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFilterOpen(false); }} className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 sm:items-center sm:p-4"><div role="dialog" aria-modal="true" aria-label="Müraciət filtrləri" className="flex max-h-[92dvh] w-full max-w-md flex-col rounded-t-[28px] bg-white p-5 shadow-2xl sm:rounded-[28px] sm:p-7"><div className="mb-4 flex items-start justify-between border-b border-slate-100 pb-4"><div><h3 className="text-lg font-bold">Müraciət filtrləri</h3><p className="text-xs text-slate-500">Status, tarix, mütəxəssis və sıralama meyarları</p></div><button type="button" aria-label="Filtrləri bağla" onClick={() => setFilterOpen(false)} className="flex size-9 items-center justify-center rounded-full bg-slate-100"><X size={18} /></button></div><div className="min-h-0 space-y-4 overflow-y-auto pb-4 text-xs"><div><p className="mb-2 font-semibold">Müraciət statusu</p><div className="grid grid-cols-2 gap-2">{[["all", "Bütün statuslar"], ["Gözlənilir", "Təsdiq gözləyir"], ["Təsdiqləndi", "Təsdiqlənib"], ["Ləğv edildi", "İmtina edilib"]].map(([value, label]) => <button key={value} type="button" onClick={() => setDraft({ ...draft, status: value })} className={`min-h-10 rounded-xl border px-2 font-semibold ${draft.status === value ? "border-slate-900 bg-amber-50" : "border-slate-200 bg-slate-50"}`}>{label}</button>)}</div></div><div><p className="mb-2 font-semibold">Tarix və dövr</p><div className="grid grid-cols-2 gap-2">{[["all", "Bütün tarixlər"], ["today", "Bugünkü"], ["tomorrow", "Sabahkı"], ["week", "Bu həftə"]].map(([value, label]) => <button key={value} type="button" onClick={() => setDraft({ ...draft, date: value })} className={`min-h-10 rounded-xl border px-2 font-semibold ${draft.date === value ? "border-slate-900 bg-amber-50" : "border-slate-200 bg-slate-50"}`}>{label}</button>)}</div></div><label className="block font-semibold">Təyin olunan mütəxəssis<select value={draft.master} onChange={(event) => setDraft({ ...draft, master: event.target.value })} className="mt-2 min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3"><option value="all">Bütün mütəxəssislər</option>{[...new Set(requests.map((booking) => booking.masterName))].filter(Boolean).map((name) => <option key={name} value={name}>{name}</option>)}</select></label><label className="block font-semibold">Sıralama qaydası<select value={draft.sort} onChange={(event) => setDraft({ ...draft, sort: event.target.value })} className="mt-2 min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3"><option value="soonest">Tarix və vaxt (ən tez birinci)</option><option value="newest">Tarix və vaxt (ən son birinci)</option><option value="price-high">Yüksək qiymət</option><option value="price-low">Aşağı qiymət</option><option value="name">Ad A-Z</option></select></label></div><div className="flex justify-between gap-2 border-t border-slate-100 pt-4"><button type="button" onClick={() => setDraft({ status: "all", date: "all", master: "all", sort: "soonest" })} className="min-h-10 rounded-xl bg-slate-100 px-4 text-xs font-semibold">Sıfırla</button><button type="button" onClick={() => { setStatus(draft.status); setDate(draft.date); setMaster(draft.master); setSort(draft.sort); setPage(1); setFilterOpen(false); }} className="flex min-h-10 items-center gap-2 rounded-xl bg-brand-primary px-4 text-xs font-bold"><Check size={15} />Filtrləri tətbiq et</button></div></div></div>}
  </section>;
}
