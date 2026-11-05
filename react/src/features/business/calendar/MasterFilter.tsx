import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export default function MasterFilter({ masters, value, onChange }: { masters: string[]; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const options = masters.filter((name) => name.toLocaleLowerCase("az-AZ").includes(query.trim().toLocaleLowerCase("az-AZ")));

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const closeOutside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  function select(next: string) { onChange(next); setQuery(""); setOpen(false); }

  return <div ref={root} className="relative min-w-0 flex-1 sm:flex-none">
    <button type="button" aria-label="Usta üzrə filtr" aria-expanded={open} aria-controls="calendar-master-options" onClick={() => { setQuery(""); setOpen((current) => !current); }} className="flex min-h-10 w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 text-left text-xs font-semibold sm:min-w-36">
      <span className="truncate">{value === "all" ? "Bütün ustalar" : value}</span><ChevronDown size={15} className="shrink-0 text-slate-500" />
    </button>
    {open && <div id="calendar-master-options" onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); setOpen(false); } }} className="absolute right-0 z-30 mt-1 w-max min-w-full max-w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
      <label className="flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-2"><Search size={15} className="shrink-0 text-slate-400" /><input ref={input} aria-label="Usta axtar" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Usta axtar..." className="min-w-0 flex-1 bg-transparent text-xs outline-none" /></label>
      <div className="mt-1 max-h-56 overflow-y-auto">
        {(!query || "bütün ustalar".includes(query.trim().toLocaleLowerCase("az-AZ"))) && <button type="button" onClick={() => select("all")} className="flex min-h-10 w-full items-center justify-between gap-2 rounded-lg px-2 text-left text-xs hover:bg-slate-50">Bütün ustalar{value === "all" && <Check size={15} />}</button>}
        {options.map((name) => <button key={name} type="button" onClick={() => select(name)} className="flex min-h-10 w-full items-center justify-between gap-2 rounded-lg px-2 text-left text-xs hover:bg-slate-50">{name}{value === name && <Check size={15} />}</button>)}
        {!options.length && query && <p className="px-2 py-3 text-xs text-slate-500">Usta tapılmadı.</p>}
      </div>
    </div>}
  </div>;
}
