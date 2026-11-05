import EmptyState from "../../components/common/EmptyState";
import { useState } from "react";
import { CalendarDays, Clock3, MapPin, Scissors, UserRound, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCustomer } from "./useCustomer";
import { showToast } from "@/components/common/toast";
import type { Booking } from "./CustomerContext";

const statusStyle: Record<NonNullable<Booking["status"]>, string> = {
  "Gözlənilir": "bg-lime-50 text-lime-800 ring-lime-200",
  "Təsdiqləndi": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Tamamlandı": "bg-slate-100 text-slate-700 ring-slate-200",
  "Ləğv edildi": "bg-rose-50 text-rose-700 ring-rose-200",
};

function BookingCard({ booking, onCancel }: { booking: Booking; onCancel: (id: string) => void }) {
  const status = booking.status ?? "Gözlənilir";
  const date = booking.date ? booking.date.split("-").reverse().join(".") : "Tarix seçilməyib";
  const canCancel = status !== "Ləğv edildi" && status !== "Tamamlandı";
  return <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="h-1 bg-brand-primary" />
    <div className="space-y-4 p-4 sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime-50 text-lime-700"><CalendarDays size={21} /></span>
        <div className="min-w-0 flex-1"><h3 className="break-words text-sm font-bold text-slate-900 sm:text-base">{booking.salonName}</h3>{booking.branchName && <p className="mt-0.5 flex items-start gap-1 break-words text-xs text-slate-500"><MapPin size={13} className="mt-0.5 shrink-0" />{booking.branchName}</p>}</div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${statusStyle[status]}`}>{status}</span>
      </div>
      <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700"><p className="flex items-start gap-2 font-semibold"><Scissors size={15} className="mt-0.5 shrink-0 text-lime-700" /><span className="break-words">{booking.service}</span></p>{booking.masterName && <p className="mt-2 flex items-center gap-2 text-slate-500"><UserRound size={15} className="shrink-0" />{booking.masterName}</p>}</div>
      <div className="flex flex-wrap gap-2"><span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700"><CalendarDays size={14} className="text-lime-700" />{date}</span><span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700"><Clock3 size={14} className="text-lime-700" />{booking.time || "—"}</span></div>
      {canCancel && <div className="border-t border-slate-100 pt-3"><button type="button" onClick={() => onCancel(booking.id)} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"><X size={15} />Yazını ləğv et</button></div>}
    </div>
  </article>;
}

export default function BookingsModal() {
  const { modal, closeModal, bookings, cancelBooking } = useCustomer();
  const [error, setError] = useState("");
  const activeCount = bookings.filter((booking) => booking.status !== "Ləğv edildi" && booking.status !== "Tamamlandı").length;
  function cancel(id: string) { const issue = cancelBooking(id); setError(issue ?? ""); if (!issue) showToast("Rezervasiya ləğv edildi."); }
  return <Dialog open={modal === "bookings"} onOpenChange={(open) => { if (!open) { setError(""); closeModal(); } }}>
    <DialogContent className="customer-drawer" overlayClassName="customer-overlay">
      <DialogHeader className="border-b border-slate-100 pb-4"><div className="flex items-center gap-2"><span className="flex size-9 items-center justify-center rounded-xl bg-lime-50 text-lime-700"><CalendarDays size={19} /></span><DialogTitle className="text-xl font-bold text-slate-900">Rezervasiyalarım</DialogTitle></div><p className="text-xs text-slate-500">Qəbullarınızı və onların statusunu izləyin</p></DialogHeader>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-2">{bookings.length ? <><p className="text-xs font-semibold text-slate-500">{activeCount} aktiv rezervasiya · {bookings.length} cəmi</p>{bookings.map((booking) => <BookingCard key={booking.id} booking={booking} onCancel={cancel} />)}</> : <EmptyState title="Hələ heç bir rezervasiyanız yoxdur" description="Yeni rezervasiyalarınız burada görünəcək." icon={CalendarDays} compact />}</div>
    </DialogContent>
  </Dialog>;
}
