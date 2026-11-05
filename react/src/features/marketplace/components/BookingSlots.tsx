import { useState } from "react";

interface Props {
  slots: string[];
  title: string;
  description: string;
  buttonLabel: string;
  onBook: () => void;
  onSlotClick?: (time: string, date: string) => void;
  onBookDate?: (date: string) => void;
}

function dateValue(offset: number) { const day = new Date(); day.setHours(12, 0, 0, 0); day.setDate(day.getDate() + offset); return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`; }
function shortDate(value: string) { const [, month, day] = value.split("-"); return `${day}.${month}`; }

export default function BookingSlots({ slots, title, description, buttonLabel, onBook, onSlotClick, onBookDate }: Props) {
  const [dayOffset, setDayOffset] = useState(0);
  const [selectedTime, setSelectedTime] = useState(slots[0] || "");
  const selectedDate = dateValue(dayOffset);
  return (
    <aside className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 lg:sticky lg:top-5">
      <p className="text-xs font-semibold text-slate-400">Onlayn rezervasiya</p><h2 className="mt-1 font-bold">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
      <p className="mt-4 text-xs font-semibold text-slate-500">Tarix seçin</p><div className="mt-2 grid grid-cols-2 gap-2">{[0, 1].map((offset) => <button key={offset} type="button" aria-pressed={dayOffset === offset} onClick={() => setDayOffset(offset)} className={`rounded-xl px-2 py-2 text-xs font-semibold ${dayOffset === offset ? "bg-slate-900 text-white" : "bg-slate-100"}`}>{offset === 0 ? "Bu gün" : "Sabah"} · {shortDate(dateValue(offset))}</button>)}</div>
      <p className="mt-4 text-xs font-semibold text-slate-500">Boş saatlar</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {slots.map((time) => <button key={time} type="button" aria-pressed={selectedTime === time} onClick={() => setSelectedTime(time)} className={`rounded-xl border px-3 py-2 text-sm font-semibold ${selectedTime === time ? "border-slate-900 bg-amber-50" : "border-slate-200"}`}>{time}</button>)}
      </div>
      <button type="button" onClick={() => selectedTime && onSlotClick ? onSlotClick(selectedTime, selectedDate) : onBookDate ? onBookDate(selectedDate) : onBook()} className="mt-5 w-full rounded-xl bg-brand-primary py-3 text-sm font-semibold">{buttonLabel}</button>
    </aside>
  );
}
