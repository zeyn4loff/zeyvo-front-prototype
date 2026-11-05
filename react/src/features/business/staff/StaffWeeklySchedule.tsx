import { CalendarDays, Clock3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { showToast } from "@/components/common/toast";
import { dayLabels, weekdays, type Shift, type Weekday, type WeekSchedule } from "./staff";

const timeOptions = Array.from({ length: 24 * 4 }, (_, index) => `${String(Math.floor(index / 4)).padStart(2, "0")}:${String(index % 4 * 15).padStart(2, "0")}`);

function TimeChoice({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const trigger = useRef<HTMLButtonElement>(null);
  const popover = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function close(event: PointerEvent) {
      if (!trigger.current?.contains(event.target as Node) && !popover.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } }
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [open]);
  function toggle() {
    if (open) { setOpen(false); return; }
    const rect = trigger.current?.getBoundingClientRect();
    if (rect) setPosition({ top: rect.bottom + 6 + 220 > innerHeight ? Math.max(8, rect.top - 226) : rect.bottom + 6, left: Math.max(8, Math.min(rect.left, innerWidth - 172)) });
    setOpen(true);
  }
  return <>
    <button ref={trigger} type="button" aria-label={label} aria-expanded={open} onClick={toggle} className="flex h-8 min-w-[76px] cursor-pointer items-center justify-between gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 font-mono text-xs font-bold text-slate-800 shadow-xs hover:bg-white focus-visible:outline-2 focus-visible:outline-brand-primary"><span>{value}</span><Clock3 size={14} className="shrink-0 text-slate-400" /></button>
    {open && createPortal(<div ref={popover} role="listbox" aria-label={label} className="fixed z-[100] max-h-52 w-40 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl" style={position}>{timeOptions.map((time) => <button key={time} type="button" role="option" aria-selected={time === value} onClick={() => { onChange(time); setOpen(false); trigger.current?.focus(); }} className={`w-full cursor-pointer rounded-lg px-3 py-1.5 text-left font-mono text-xs hover:bg-slate-100 ${time === value ? "bg-brand-primary font-bold" : "text-slate-700"}`}>{time}</button>)}</div>, document.body)}
  </>;
}

function presetSchedule(kind: "5_2" | "6_1" | "all"): WeekSchedule {
  return Object.fromEntries(weekdays.map((day, index) => {
    if (kind === "5_2") return [day, { enabled: index < 5, start: index < 5 ? "09:00" : "10:00", end: "18:00", breakStart: index < 5 ? "13:00" : undefined, breakEnd: index < 5 ? "14:00" : undefined }];
    if (kind === "6_1") return [day, { enabled: index < 6, start: "10:00", end: index < 6 ? "19:00" : "18:00", breakStart: index < 6 ? "14:00" : undefined, breakEnd: index < 6 ? "15:00" : undefined }];
    return [day, { enabled: true, start: "10:00", end: "20:00", breakStart: "14:00", breakEnd: "15:00" }];
  })) as WeekSchedule;
}

export default function StaffWeeklySchedule({ schedule, exceptionsCount, onChange, onShowExceptions }: { schedule: WeekSchedule; exceptionsCount: number; onChange: (schedule: WeekSchedule) => void; onShowExceptions: () => void }) {
  function change(day: Weekday, patch: Partial<Shift>) { onChange({ ...schedule, [day]: { ...schedule[day], ...patch } }); }
  function applyPreset(kind: "5_2" | "6_1" | "all", message: string) { onChange(presetSchedule(kind)); showToast(message); }
  return <div className="space-y-3.5">
    <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-3 sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-center gap-2.5"><span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-900"><CalendarDays size={16} /></span><div className="min-w-0"><strong className="text-xs text-slate-900">Konkret tarixdə istirahət günü və ya fərdi saatlar?</strong><p className="text-[11px] font-normal text-slate-500">Məsələn: gələn həftə cümə günü işləmir və ya qısaldılmış saatlarla çıxır</p></div></div>
      <button type="button" onClick={onShowExceptions} className="min-h-8 shrink-0 cursor-pointer rounded-xl bg-slate-900 px-3 text-xs font-bold text-white">+ Tarix qeyd et</button>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3"><strong className="text-xs text-slate-800">Hazır cədvəl şablonları:</strong><div className="flex flex-wrap gap-1.5"><button type="button" onClick={() => applyPreset("5_2", "5/2 şablonu tətbiq edildi") } className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">5/2 (09:00 - 18:00)</button><button type="button" onClick={() => applyPreset("6_1", "6/1 şablonu tətbiq edildi") } className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">6/1 (10:00 - 19:00)</button><button type="button" onClick={() => applyPreset("all", "Bütün günlər aktiv edildi") } className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">Bütün günlər</button></div></div>
    {exceptionsCount > 0 && <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-[11px] font-bold text-rose-900"><span>Təyin edilmiş xüsusi tarixlər və istirahət günləri: {exceptionsCount}</span><button type="button" onClick={onShowExceptions} className="cursor-pointer underline">Hamısına bax →</button></div>}
    <div className="space-y-2">{weekdays.map((day) => { const shift = schedule[day]; return <div key={day} className={`rounded-2xl border p-3 transition ${shift.enabled ? "border-slate-200/90 bg-white shadow-xs" : "border-slate-200/60 bg-slate-50/70 opacity-80"}`}><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><label className="flex min-w-0 cursor-pointer items-center gap-3 sm:min-w-[170px]"><input type="checkbox" checked={shift.enabled} onChange={(event) => change(day, { enabled: event.target.checked })} className="peer sr-only" /><span aria-hidden="true" className="relative h-5 w-9 shrink-0 rounded-full bg-slate-200 after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-transform peer-checked:bg-brand-primary peer-checked:after:translate-x-4 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-slate-900" /><span><strong className={`block text-xs ${shift.enabled ? "text-slate-900" : "text-slate-400"}`}>{dayLabels[day]}</strong><span className={`block text-[10px] ${shift.enabled ? "font-semibold text-emerald-600" : "text-slate-400"}`}>{shift.enabled ? "İş günü" : "İstirahət"}</span></span></label>
      {shift.enabled ? <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2 sm:justify-end"><div className="flex items-center gap-1.5"><span className="text-[10px] font-medium text-slate-400">Növbə:</span><TimeChoice label={`${dayLabels[day]} növbə başlanğıcı`} value={shift.start} onChange={(start) => change(day, { start })} /><span className="text-xs text-slate-400">–</span><TimeChoice label={`${dayLabels[day]} növbə bitişi`} value={shift.end} onChange={(end) => change(day, { end })} /></div><div className="flex items-center gap-1.5 border-slate-200 sm:border-l sm:pl-2"><span className="text-[10px] font-medium text-slate-400">Fasilə:</span><TimeChoice label={`${dayLabels[day]} fasilə başlanğıcı`} value={shift.breakStart || "13:00"} onChange={(breakStart) => change(day, { breakStart, breakEnd: shift.breakEnd || "14:00" })} /><span className="text-xs text-slate-400">–</span><TimeChoice label={`${dayLabels[day]} fasilə bitişi`} value={shift.breakEnd || "14:00"} onChange={(breakEnd) => change(day, { breakStart: shift.breakStart || "13:00", breakEnd })} /></div></div> : <span className="text-[11px] italic text-slate-400">Qəbul yoxdur</span>}</div></div>; })}</div>
  </div>;
}
