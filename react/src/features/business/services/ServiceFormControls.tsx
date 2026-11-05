import { useState } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";

export function SegmentedChoice<T extends string>({ value, options, onChange }: { value: T; options: readonly { value: T; label: string }[]; onChange: (value: T) => void }) {
  return <div className="flex flex-wrap gap-2" role="group">
    {options.map((option) => <button key={option.value} type="button" aria-pressed={value === option.value} onClick={() => onChange(option.value)} className={`min-h-11 min-w-[calc(50%-0.25rem)] flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition active:scale-[.98] sm:min-w-28 ${value === option.value ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"}`}>{option.label}</button>)}
  </div>;
}

export function EntityPicker({ title, subtitle, items, selectedIds, onChange, emptyText }: { title: string; subtitle?: string; items: { id: string; name: string; description?: string }[]; selectedIds: string[]; onChange: (ids: string[]) => void; emptyText?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = items.filter((item) => selectedIds.includes(item.id));
  const visible = items.filter((item) => `${item.name} ${item.description ?? ""}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  function toggle(id: string) { onChange(selectedIds.includes(id) ? selectedIds.filter((entry) => entry !== id) : [...selectedIds, id]); }
  return <section className="space-y-3">
    <div className="flex flex-wrap items-center justify-between gap-2"><div><h3 className="text-sm font-semibold text-slate-900">{title}</h3>{subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}</div><button type="button" onClick={() => setOpen(true)} className="min-h-10 rounded-xl bg-brand-primary px-4 text-sm font-semibold">+ Seç</button></div>
    {selected.length ? <div className="space-y-2">{selected.map((item) => <div key={item.id} className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3"><span className="min-w-0 truncate text-sm font-semibold">{item.name}</span><button type="button" onClick={() => toggle(item.id)} aria-label={`${item.name} sil`} className="shrink-0 rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-200">×</button></div>)}</div> : <p className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-500">{emptyText ?? "Heç nə seçilməyib"}</p>}
    {open && <BusinessFormDialog title={title} description={subtitle} onClose={() => setOpen(false)} size="medium"><div className="space-y-3"><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ad ilə axtarın..." className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-slate-900" /><div className="max-h-[50dvh] overflow-y-auto rounded-xl border border-slate-200">{visible.map((item) => <label key={item.id} className="flex min-h-12 cursor-pointer items-center gap-3 border-b border-slate-100 px-3 py-2 last:border-0 hover:bg-slate-50"><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggle(item.id)} className="size-4 accent-slate-900" /><span className="min-w-0 text-sm font-semibold">{item.name}{item.description && <small className="block font-normal text-slate-500">{item.description}</small>}</span></label>)}{!visible.length && <p className="p-5 text-center text-sm text-slate-500">Nəticə tapılmadı</p>}</div><div className="flex justify-end"><button type="button" onClick={() => setOpen(false)} className="min-h-11 rounded-xl bg-slate-100 px-5 font-semibold">Bağla</button></div></div></BusinessFormDialog>}
  </section>;
}
