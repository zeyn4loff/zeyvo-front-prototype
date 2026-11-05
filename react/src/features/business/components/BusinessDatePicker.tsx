import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { businessControlClass } from "./BusinessField";
import { localToday } from "./businessDate";

const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
const weekdays = ["B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş.", "B."];
const pad = (value: number) => String(value).padStart(2, "0");
const display = (date: string) => date ? `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}` : "Tarix seçin";

type Props = { value: string; onChange: (value: string) => void; name?: string; label?: string; precision?: "day" | "month" };

/** Project calendar used by business forms instead of the browser's native date popup. */
export default function BusinessDatePicker({ value, onChange, name, label = "Tarix", precision = "day" }: Props) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 288, maxHeight: 400 });
  const [view, setView] = useState<"days" | "months" | "years">(precision === "month" ? "months" : "days");
  const [year, setYear] = useState(Number(value.slice(0, 4)) || new Date().getFullYear());
  const [month, setMonth] = useState((Number(value.slice(5, 7)) || new Date().getMonth() + 1) - 1);
  const [yearPage, setYearPage] = useState(year - year % 12);

  useEffect(() => {
    if (!open) return;
    function close(event: PointerEvent) {
      const target = event.target as Node;
      if (!root.current?.contains(target) && !popup.current?.contains(target)) setOpen(false);
    }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    setPortalTarget(root.current?.closest('[data-slot="dialog-content"]')?.parentElement ?? document.body);
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    function place() {
      const anchor = root.current?.getBoundingClientRect();
      if (!anchor) return;
      const margin = 8;
      const width = Math.min(288, window.innerWidth - margin * 2);
      const height = popup.current?.offsetHeight || 370;
      const left = Math.max(margin, Math.min(anchor.left, window.innerWidth - width - margin));
      const below = window.innerHeight - anchor.bottom - margin;
      const above = anchor.top - margin;
      const showAbove = below < height && above > below;
      const maxHeight = Math.max(180, Math.min(height, showAbove ? above - margin : below - margin));
      const top = showAbove ? Math.max(margin, anchor.top - Math.min(height, maxHeight) - 6) : anchor.bottom + 6;
      setPosition({ top, left, width, maxHeight });
    }
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => { window.removeEventListener("resize", place); window.removeEventListener("scroll", place, true); };
  }, [open, view, year, month, portalTarget]);

  function toggle() {
    if (!open) { const base = value || localToday(); const nextYear = Number(base.slice(0, 4)); setYear(nextYear); setMonth(Number(base.slice(5, 7)) - 1); setYearPage(nextYear - nextYear % 12); setView(precision === "month" ? "months" : "days"); }
    setOpen(!open);
  }
  function shiftMonth(delta: number) { const next = new Date(year, month + delta, 1); setYear(next.getFullYear()); setMonth(next.getMonth()); }
  function choose(date: string) { onChange(date); setOpen(false); }

  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevious = new Date(year, month, 0).getDate();
  const trailing = (7 - (firstWeekday + daysInMonth) % 7) % 7;
  const today = localToday();

  return <div ref={root} className="relative min-w-0">
    <input type="hidden" name={name} value={value} readOnly />
    <button type="button" id={id} aria-label={label} aria-expanded={open} aria-haspopup="dialog" onClick={toggle} className={`${businessControlClass} flex items-center justify-between text-left cursor-pointer`}>
      <span>{precision === "month" ? value ? `${months[Number(value.slice(5, 7)) - 1]} ${value.slice(0, 4)}` : "Ay seçin" : display(value)}</span><CalendarDays size={17} className="shrink-0 text-slate-400" />
    </button>
    {open && portalTarget && createPortal(<div ref={popup} role="dialog" aria-label={`${label} seçimi`} style={position} className="fixed z-[100] box-border min-w-0 space-y-3 overflow-x-hidden overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xl">
      {view === "days" ? <>
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <button type="button" onClick={() => setView("months")} className="flex cursor-pointer items-center gap-1 text-xs font-bold hover:text-amber-700">{months[month]} {year}<ChevronDown size={14} /></button>
          <div className="flex gap-1"><button type="button" aria-label="Əvvəlki ay" onClick={() => shiftMonth(-1)} className="flex size-7 cursor-pointer items-center justify-center rounded-lg hover:bg-slate-100"><ChevronLeft size={17} /></button><button type="button" aria-label="Növbəti ay" onClick={() => shiftMonth(1)} className="flex size-7 cursor-pointer items-center justify-center rounded-lg hover:bg-slate-100"><ChevronRight size={17} /></button></div>
        </div>
        <div className="grid min-w-0 grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400">{weekdays.map((day, index) => <span key={index} className="min-w-0">{day}</span>)}</div>
        <div className="grid min-w-0 grid-cols-7 gap-1">
          {Array.from({ length: firstWeekday }, (_, index) => <span key={`before-${index}`} className="flex h-8 items-center justify-center text-xs text-slate-300">{daysInPrevious - firstWeekday + index + 1}</span>)}
          {Array.from({ length: daysInMonth }, (_, index) => { const day = index + 1; const iso = `${year}-${pad(month + 1)}-${pad(day)}`; return <button key={iso} type="button" onClick={() => choose(iso)} aria-label={display(iso)} aria-pressed={iso === value} className={`min-w-0 h-8 cursor-pointer rounded-xl text-xs transition active:scale-95 ${iso === value ? "bg-brand-primary font-bold text-slate-900" : iso === today ? "border border-amber-300 bg-amber-50 font-bold" : "font-medium text-slate-700 hover:bg-slate-100"}`}>{day}</button>; })}
          {Array.from({ length: trailing }, (_, index) => <span key={`after-${index}`} className="flex h-8 items-center justify-center text-xs text-slate-300">{index + 1}</span>)}
        </div>
        <div className="flex min-w-0 items-center justify-between gap-2 border-t border-slate-100 pt-2"><button type="button" onClick={() => choose(localToday())} className="min-w-0 cursor-pointer rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800 hover:bg-amber-100">Bugün</button><button type="button" onClick={() => setOpen(false)} className="min-w-0 cursor-pointer rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold">Bağla</button></div>
      </> : <>
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">{view === "months" ? <button type="button" onClick={() => { setYearPage(year - year % 12); setView("years"); }} className="flex cursor-pointer items-center gap-1 text-xs font-bold">{year}<ChevronDown size={14} /></button> : <strong className="text-xs">{yearPage} – {yearPage + 11}</strong>}{view === "years" && <div className="flex gap-1"><button type="button" aria-label="Əvvəlki illər" onClick={() => setYearPage(yearPage - 12)} className="flex size-7 cursor-pointer items-center justify-center rounded-lg hover:bg-slate-100"><ChevronLeft size={17} /></button><button type="button" aria-label="Növbəti illər" onClick={() => setYearPage(yearPage + 12)} className="flex size-7 cursor-pointer items-center justify-center rounded-lg hover:bg-slate-100"><ChevronRight size={17} /></button></div>}</div>
        <div className="grid grid-cols-3 gap-1.5">{view === "months" ? months.map((name, index) => <button key={name} type="button" onClick={() => { if (precision === "month") choose(`${year}-${pad(index + 1)}`); else { setMonth(index); setView("days"); } }} className={`h-10 cursor-pointer rounded-xl text-xs hover:bg-slate-100 ${index === month && Number(value.slice(0, 4)) === year ? "bg-brand-primary font-bold" : ""}`}>{name}</button>) : Array.from({ length: 12 }, (_, index) => yearPage + index).map((option) => <button key={option} type="button" onClick={() => { setYear(option); setView("months"); }} className={`h-10 cursor-pointer rounded-xl text-xs hover:bg-slate-100 ${option === Number(value.slice(0, 4)) ? "bg-brand-primary font-bold" : ""}`}>{option}</button>)}</div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-2">{precision === "day" ? <button type="button" onClick={() => setView("days")} className="cursor-pointer rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold">Günlərə qayıt</button> : <span />}<button type="button" onClick={() => setOpen(false)} className="cursor-pointer rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold">Bağla</button></div>
      </>}
    </div>, portalTarget)}
  </div>;
}
