import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import BusinessDatePicker from "../components/BusinessDatePicker";
import type { BusinessSession } from "../auth/businessSession";
import { BusinessTabButton, BusinessTabRail } from "../components/BusinessTabs";
import { readStaffData } from "../staff/staff";
import BookingDialog from "./BookingDialog";
import { addDays, localDate, type Booking, type BookingStatus } from "./bookings";
import { DailyView, PendingView, WeeklyView, type CalendarView, type EditingBooking } from "./CalendarViews";
import { useBookings } from "./useBookings";
import { useActiveBusinessContext } from "../directory/activeContext";
import { readCalendarAppearance } from "./calendarAppearance";
import { readServiceData } from "../services/services";
import { readResourceData } from "../resources/resources";
import { readBusinesses } from "../directory/businesses";
import { bookingSlotIssue } from "./bookingRules";
import { readClients } from "../clients/clients";
import { syncBookingClient } from "./syncBookingClient";
import BookingCheckoutDialog from "./BookingCheckoutDialog";
import { checkoutBooking } from "./checkoutBooking";
import type { PaymentMethod } from "../pos/pos";
import { showToast } from "@/components/common/toast";
import MasterFilter from "./MasterFilter";

export default function BusinessCalendar({ session }: { session: BusinessSession }) {
  const { bookings, update } = useBookings(session);
  const activeBusiness = useActiveBusinessContext(session);
  const scopedBookings = bookings.filter((booking) =>
    (booking.businessId ?? (session.id === "baku-beauty-demo" ? "biz_baku_beauty" : activeBusiness?.businessId)) === activeBusiness?.businessId &&
    (!booking.branchId || booking.branchId === activeBusiness?.branchId),
  );
  const [date, setDate] = useState(localDate);
  const [view, setView] = useState<CalendarView>("daily");
  const [master, setMaster] = useState("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EditingBooking | null>(null);
  const [appearance] = useState(() => readCalendarAppearance(session.id));
  const [actionError, setActionError] = useState("");
  const [pendingCheckout, setPendingCheckout] = useState<Booking | null>(null);
  const [checkoutMethod, setCheckoutMethod] = useState<PaymentMethod>("cash");

  // Current staff appears in new bookings; historical names remain visible.
  const staffData = readStaffData(session);
  const activeStaff = staffData.members.filter((person) => person.status !== "dismissed" && person.branchId === activeBusiness?.branchId);
  const activeMasters = activeStaff.map((person) => person.name);
  const masters = [...new Set([...activeMasters, ...scopedBookings.map((booking) => booking.masterName).filter(Boolean)])];
  const visibleMasters = master === "all" ? masters : [master];
  const pendingCount = scopedBookings.filter((booking) => booking.status === "Gözlənilir").length;
  const filtered = scopedBookings.filter((booking) =>
    (master === "all" || booking.masterName === master) &&
    (!search || `${booking.clientName} ${booking.service} ${booking.phone}`.toLocaleLowerCase("az-AZ").includes(search.toLocaleLowerCase("az-AZ"))),
  );
  const daily = filtered.filter((booking) => booking.date === date).sort((a, b) => a.time.localeCompare(b.time));

  function openNewBooking() {
    const candidates = Array.from({ length: 56 }, (_, index) => {
      const minutes = 8 * 60 + index * 15;
      return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
    });
    const now = new Date();
    const earliest = date === localDate() ? now.getHours() * 60 + now.getMinutes() : 0;
    const available = candidates.filter((time) => { const [hours, minutes] = time.split(":").map(Number); return hours * 60 + minutes >= earliest; })
      .flatMap((time) => (master === "all" ? activeMasters : [master]).map((masterName) => ({ time, masterName })))
      .find(({ time, masterName }) => !scopedBookings.some((booking) => {
        if (booking.date !== date || booking.masterName !== masterName || booking.status === "Ləğv edildi") return false;
        const start = (value: string) => { const [hours, minutes] = value.split(":").map(Number); return hours * 60 + minutes; };
        return start(time) < start(booking.time) + booking.durationMinutes && start(booking.time) < start(time) + 30;
      }));
    setEditing({ date, time: available?.time ?? "10:00", masterName: available?.masterName });
  }

  function editBooking(booking: Booking) {
    setEditing({ booking, date: booking.date, time: booking.time });
  }

  function saveBooking(next: Booking, method: PaymentMethod = "cash"): string | null {
    if (!next.clientName || !next.service || !next.masterName || !next.date || !next.time) return "Məcburi sahələri doldurun.";
    if (!Number.isFinite(next.price) || next.price < 0 || !Number.isFinite(next.durationMinutes) || next.durationMinutes <= 0) return "Qiyməti və müddəti yoxlayın.";
    const previous = bookings.find((booking) => booking.id === next.id);
    const slotChanged = !previous || previous.date !== next.date || previous.time !== next.time || previous.masterName !== next.masterName || previous.durationMinutes !== next.durationMinutes || previous.serviceId !== next.serviceId || previous.service !== next.service;
    if (slotChanged && next.status !== "Ləğv edildi") {
      const services = readServiceData(session).services;
      const service = services.find((item) => item.id === next.serviceId || (item.name === next.service && (!item.businessId || item.businessId === next.businessId)));
      const business = readBusinesses(session).find((item) => item.id === next.businessId);
      const branchHours = business?.branches.find((item) => item.id === next.branchId)?.hours;
      const issue = bookingSlotIssue({ candidate: next, bookings: scopedBookings, service, services, staff: readStaffData(session).members, resources: readResourceData(session).resources, branchHours });
      if (issue) return issue;
    }
    if (previous?.paymentMethod && (next.price !== previous.price || next.status !== "Tamamlandı")) return "Ödənilmiş qəbulun məbləğini və statusunu dəyişmək üçün ayrıca kassa düzəlişi lazımdır.";
    if (next.status === "Tamamlandı" && !previous?.paymentMethod) { setCheckoutMethod(method); setPendingCheckout(next); setEditing(null); return null; }
    if (!syncBookingClient(session, next)) return "Tamamlanmış qəbulu müştəri kartında saxlamaq mümkün olmadı. Müştəri və əlaqə nömrəsini yoxlayın.";
    const saved = update(bookings.some((booking) => booking.id === next.id)
      ? bookings.map((booking) => booking.id === next.id ? next : booking)
      : [...bookings, next]);
    if (!saved) return "Qəbulu yadda saxlamaq mümkün olmadı.";
    setEditing(null);
    setDate(next.date);
    showToast(previous ? "Qəbul yeniləndi." : "Qəbul əlavə edildi.");
    return null;
  }

  function setBookingStatus(id: string, next: BookingStatus) {
    const booking = bookings.find((item) => item.id === id);
    if (!booking) return;
    if (next === "Tamamlandı" && !booking.paymentMethod) { setCheckoutMethod("cash"); setPendingCheckout(booking); return; }
    if (booking.paymentMethod && next !== "Tamamlandı") { setActionError("Ödənişi qeydə alınmış qəbulun statusunu dəyişmək üçün kassa düzəlişi lazımdır."); return; }
    if (!syncBookingClient(session, { ...booking, status: next })) { setActionError("Qəbulu tamamlamaq üçün müştəri kartı və ya telefon nömrəsi lazımdır."); return; }
    setActionError("");
    if (update(bookings.map((item) => item.id === id ? { ...item, status: next } : item))) showToast("Qəbul statusu yeniləndi.");
    else setActionError("Qəbul statusunu yadda saxlamaq mümkün olmadı.");
  }

  function deleteBooking(id: string) {
    const booking = bookings.find((item) => item.id === id);
    if (booking?.paymentMethod) { setActionError("Ödənişi qeydə alınmış qəbulu silmək üçün əvvəlcə kassa düzəlişi lazımdır."); setEditing(null); return; }
    if (booking) syncBookingClient(session, { ...booking, status: "Ləğv edildi" });
    if (update(bookings.filter((booking) => booking.id !== id))) { setEditing(null); showToast("Qəbul silindi."); }
    else setActionError("Qəbulu silmək mümkün olmadı.");
  }

  function confirmCheckout(method: PaymentMethod, accountId: string): string | null {
    if (!pendingCheckout) return "Qəbul tapılmadı.";
    const next = { ...pendingCheckout, status: "Tamamlandı" as const, paymentMethod: method, paymentAccountId: accountId };
    const error = checkoutBooking(session, next, method, accountId,
      () => update(bookings.some((booking) => booking.id === next.id) ? bookings.map((booking) => booking.id === next.id ? next : booking) : [...bookings, next]),
      () => update(bookings),
    );
    if (error) return error;
    setDate(next.date);
    setPendingCheckout(null);
    setActionError("");
    showToast("Qəbul və ödəniş qeydə alındı.");
    return null;
  }

  return <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-5 sm:px-7 sm:py-7">
    <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex shrink-0 items-center rounded-xl bg-slate-100 p-0.5 sm:p-1">
          <button type="button" onClick={() => setDate(addDays(date, view === "weekly" ? -7 : -1))} aria-label="Əvvəlki tarix" className="flex size-8 cursor-pointer items-center justify-center rounded-lg hover:bg-white sm:size-9"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => setDate(localDate())} className="min-h-8 cursor-pointer rounded-lg px-1.5 text-[11px] font-semibold hover:bg-white sm:min-h-9 sm:px-3 sm:text-xs">Bu gün</button>
          <button type="button" onClick={() => setDate(addDays(date, view === "weekly" ? 7 : 1))} aria-label="Növbəti tarix" className="flex size-8 cursor-pointer items-center justify-center rounded-lg hover:bg-white sm:size-9"><ChevronRight size={18} /></button>
        </div>
        <div className="min-w-0 flex-1 text-xs font-bold sm:w-44 sm:flex-none"><BusinessDatePicker label="Tarix seçin" value={date} onChange={setDate} /></div>
      </div>
      <div className="flex min-w-0 flex-wrap items-center gap-2 xl:justify-end"><div className="max-w-full overflow-x-auto"><BusinessTabRail>{([
        { value: "daily", label: "Günlük (Ustalar)" },
        { value: "weekly", label: "Həftəlik" },
        { value: "pending", label: `Onlayn müraciətlər${pendingCount ? ` (${pendingCount})` : ""}` },
      ] as { value: CalendarView; label: string }[]).map((item) => <BusinessTabButton key={item.value} active={view === item.value} onClick={() => setView(item.value)}>{item.label}</BusinessTabButton>)}</BusinessTabRail></div>
        <MasterFilter masters={masters} value={master} onChange={setMaster} />
        <button type="button" onClick={openNewBooking} className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-xl bg-brand-primary px-4 text-xs font-bold sm:ml-auto sm:w-auto"><Plus size={16} />Yeni qəbul</button>
      </div>
    </section>

    {actionError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}
    {view === "daily" && <DailyView date={date} bookings={daily} masters={visibleMasters} staff={activeStaff} roles={staffData.roles} appearance={appearance} onEdit={editBooking} onStatus={setBookingStatus} onCreate={(time, masterName) => setEditing({ date, time, masterName })} />}
    {view === "weekly" && <WeeklyView date={date} bookings={filtered} appearance={appearance} onSelectDay={(day) => { setDate(day); setView("daily"); }} onEdit={editBooking} />}
    {view === "pending" && <PendingView bookings={filtered} appearance={appearance} search={search} onSearch={setSearch} onEdit={editBooking} onStatus={setBookingStatus} />}
    {editing && <BookingDialog key={editing.booking?.id ?? `${editing.date}-${editing.time}`} initial={editing.booking} businessId={activeBusiness?.businessId} branchId={activeBusiness?.branchId} date={editing.date} time={editing.time} masterName={editing.masterName} masters={activeMasters} clients={readClients(session)} services={readServiceData(session).services.filter((item) => !item.businessId || item.businessId === activeBusiness?.businessId)} categories={readServiceData(session).categories} bookings={scopedBookings} onClose={() => setEditing(null)} onSave={saveBooking} onDelete={deleteBooking} />}
    {pendingCheckout && <BookingCheckoutDialog session={session} booking={pendingCheckout} initialMethod={checkoutMethod} onClose={() => setPendingCheckout(null)} onConfirm={confirmCheckout} />}
  </div>;
}
