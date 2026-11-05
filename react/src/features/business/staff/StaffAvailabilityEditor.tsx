import EmptyState from "../../../components/common/EmptyState";
import { businessLabelClass } from "../components/BusinessField";
import { businessControlClass } from "../components/BusinessField";
import { useRef, useState, type KeyboardEvent } from "react";
import BusinessDatePicker from "../components/BusinessDatePicker";
import type { StaffReview, StaffScheduleException } from "./staff";
import { MessageSquare, Star } from "lucide-react";

const field = businessControlClass;
const card = "space-y-3 rounded-xl border border-slate-200 p-3";

type ExceptionDraft = { date: string; available: boolean; start: string; end: string; note: string };
const emptyException: ExceptionDraft = { date: "", available: false, start: "09:00", end: "18:00", note: "" };

export function StaffAvailabilityEditor({ items, onChange }: { items: StaffScheduleException[]; onChange: (next: StaffScheduleException[]) => void }) {
  const [draft, setDraft] = useState<ExceptionDraft>(emptyException);
  const [error, setError] = useState("");
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const change = (patch: Partial<ExceptionDraft>) => { setDraft((current) => ({ ...current, ...patch })); setError(""); };

  function addException() {
    const next = { ...draft, start: startRef.current?.value ?? draft.start, end: endRef.current?.value ?? draft.end };
    if (!next.date) { setError("Tarix seçin."); return; }
    if (next.available && next.start >= next.end) { setError("Bitiş vaxtı başlanğıcdan sonra olmalıdır."); return; }
    if (items.some((item) => item.date === next.date)) { setError("Bu tarix üçün istisna artıq var."); return; }
    onChange([...items, { id: crypto.randomUUID(), ...next, note: next.note.trim() }].sort((a, b) => a.date.localeCompare(b.date)));
    setDraft(emptyException);
    setError("");
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      addException();
    }
  }

  return <div className="space-y-3">
    <h3 className="text-sm font-bold">Qrafik istisnaları</h3>
    <p className="text-xs text-slate-500">Məzuniyyət, bağlı gün və ya fərqli iş saatını ayrıca qeyd edin.</p>
    <div className={card} onKeyDown={onInputKeyDown}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="text-xs font-semibold">Tarix<BusinessDatePicker value={draft.date} onChange={(date) => change({ date })} label="İstisna tarixi" /></div>
        <label className="text-xs font-semibold">Gün<select value={draft.available ? "yes" : "no"} onChange={(event) => change({ available: event.target.value === "yes" })} className={field}><option value="no">İstirahət / bağlı</option><option value="yes">Fərqli iş saatı</option></select></label>
        {draft.available && <>
          <label className="text-xs font-semibold">Başlanğıc<input ref={startRef} type="time" defaultValue="09:00" onChange={(event) => change({ start: event.target.value })} className={field} /></label>
          <label className="text-xs font-semibold">Bitiş<input ref={endRef} type="time" defaultValue="18:00" onChange={(event) => change({ end: event.target.value })} className={field} /></label>
        </>}
      </div>
      <label className={businessLabelClass}>Qeyd<input maxLength={200} value={draft.note} onChange={(event) => change({ note: event.target.value })} className={field} /></label>
      {error && <p role="alert" className="text-xs text-rose-700">{error}</p>}
      <button type="button" onClick={addException} className="min-h-10 w-full cursor-pointer rounded-xl bg-slate-900 px-4 text-xs font-bold text-white sm:w-auto">İstisna əlavə et</button>
    </div>
    <div className="space-y-2">
      {items.map((item) => <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 text-xs">
        <div><strong>{item.date} · {item.available ? `${item.start}–${item.end}` : "İşləmir"}</strong>{item.note && <p className="mt-1 text-slate-500">{item.note}</p>}</div>
        <button type="button" onClick={() => onChange(items.filter((entry) => entry.id !== item.id))} className="min-h-9 cursor-pointer rounded-lg bg-rose-50 px-3 font-bold text-rose-700">Sil</button>
      </div>)}
      {!items.length && <EmptyState title="İstisna yoxdur" compact />}
    </div>
  </div>;
}

export function StaffReviewsEditor({ items, onChange }: { items: StaffReview[]; onChange: (next: StaffReview[]) => void }) {
  const [visibleLimit, setVisibleLimit] = useState(3);
  const [editingId, setEditingId] = useState<string | null>(null);
  return <div className="max-h-96 space-y-2.5 overflow-y-auto pr-1">
    {items.slice(0, visibleLimit).map((item) => <article key={item.id} className="space-y-2.5 rounded-2xl border border-slate-200/90 bg-white p-3.5 text-xs shadow-xs">
      <div className="flex items-start justify-between gap-2"><div className="flex min-w-0 items-center gap-2.5"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-primary font-black text-slate-900">{item.author.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "M"}</span><div className="min-w-0"><strong className="block truncate text-slate-900">{item.author || "Anonim müştəri"}</strong><time className="text-[10px] text-slate-400">{item.date ? new Date(item.date).toLocaleDateString("az-AZ") : "Son günlər"}</time></div></div><span className="flex shrink-0 items-center gap-0.5">{[1, 2, 3, 4, 5].map((number) => <Star key={number} size={12} fill="currentColor" className={number <= Math.round(item.rating) ? "text-amber-400" : "text-slate-200"} />)}</span></div>
      <p className="break-words leading-relaxed text-slate-700">{item.comment}</p>
      {editingId === item.id ? <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50/70 p-3"><strong className="text-[11px]">Salon adından rəsmi cavab</strong><div className="flex flex-wrap gap-1">{["Təşəkkür edirik! Sizi yenidən salonda görməyə çox şad olarıq!", "Xoş sözləriniz və bizi seçdiyiniz üçün minnətdarıq!", "Fikriniz bizim üçün dəyərlidir, xidmətimizi daim təkmilləşdiririk."].map((template, index) => <button key={template} type="button" onClick={() => onChange(items.map((entry) => entry.id === item.id ? { ...entry, reply: template } : entry))} className="rounded-md border border-amber-200 bg-white px-2 py-0.5 text-[10px]">{["Təşəkkür edirik", "Minnətdarıq", "Fikriniz dəyərlidir"][index]}</button>)}</div><textarea aria-label="Salonun rəsmi cavabı" value={item.reply} onChange={(event) => onChange(items.map((entry) => entry.id === item.id ? { ...entry, reply: event.target.value } : entry))} rows={2} maxLength={500} placeholder="Müştəriyə cavabınızı yazın..." className="w-full rounded-lg border border-amber-300 bg-white p-2.5 text-xs outline-none focus:border-slate-900" /><div className="flex justify-end gap-1.5"><button type="button" onClick={() => setEditingId(null)} className="rounded-lg bg-slate-200 px-2.5 py-1 font-semibold">Ləğv et</button><button type="button" onClick={() => setEditingId(null)} className="rounded-lg bg-brand-primary px-3.5 py-1 font-bold">Dərc et</button></div></div> : item.reply ? <div className="space-y-1 rounded-xl border border-amber-200/70 bg-amber-50/40 p-3"><div className="flex flex-wrap items-center justify-between gap-2"><strong>Salonun rəsmi cavabı</strong><button type="button" onClick={() => setEditingId(item.id)} className="font-bold text-amber-700">Redaktə</button></div><p className="break-words text-slate-700">{item.reply}</p></div> : <button type="button" onClick={() => setEditingId(item.id)} className="rounded-lg bg-amber-50 px-2.5 py-1 font-bold text-amber-900">Cavab yaz</button>}
    </article>)}
    {!items.length && <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center"><span className="mx-auto mb-1.5 flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400"><MessageSquare size={20} /></span><strong className="block text-xs text-slate-700">Hələ ki rəy yoxdur</strong><p className="mt-0.5 text-[11px] text-slate-400">Müştərilər onlayn qeydiyyatdan sonra rəy bildirdikdə burada əks olunacaq.</p></div>}
    {items.length > visibleLimit && <button type="button" onClick={() => setVisibleLimit((value) => value + 3)} className="mx-auto block min-h-10 rounded-xl bg-slate-100 px-5 text-xs font-bold text-slate-800">Daha çox rəy göstər ({items.length - visibleLimit})</button>}
  </div>;
}
