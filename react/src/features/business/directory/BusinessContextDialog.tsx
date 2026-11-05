import EmptyState from "../../../components/common/EmptyState";
import { useState } from "react";
import { Building2, Check, MapPin, Scissors, Search } from "lucide-react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import type { BusinessSession } from "../auth/businessSession";
import { readBusinesses } from "./businesses";
import { selectActiveContext, type ActiveBusinessContext } from "./activeContext";

export default function BusinessContextDialog({ session, active, onClose }: { session: BusinessSession; active: ActiveBusinessContext | null; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const businesses = readBusinesses(session);
  const search = query.trim().toLocaleLowerCase("az-AZ");
  const shown = businesses.map((business) => ({ ...business, branches: !search || business.name.toLocaleLowerCase("az-AZ").includes(search) ? business.branches : business.branches.filter((branch) => [branch.name, branch.address, branch.city].some((value) => value.toLocaleLowerCase("az-AZ").includes(search))) })).filter((business) => !search || business.name.toLocaleLowerCase("az-AZ").includes(search) || business.branches.length > 0);

  function choose(businessId: string, branchId: string) {
    if (selectActiveContext(session, businessId, branchId)) onClose();
    else setError("Seçimi yadda saxlamaq mümkün olmadı.");
  }

  return <BusinessFormDialog title="Biznes və filial seçimi" description="İdarə etmək istədiyiniz biznes və ya filialı seçin" onClose={onClose} size="stock" scrollContent>
    <label className="flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3"><Search size={17} className="shrink-0 text-slate-400" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Biznes və ya filial axtar..." aria-label="Biznes və ya filial axtar" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
    {error && <p role="alert" className="text-xs text-rose-600">{error}</p>}
    <div className="mt-4 min-h-0 space-y-3 overflow-y-auto overscroll-contain pr-1">
      {!shown.length && <EmptyState title="Uyğun biznes və ya filial tapılmadı" description="Başqa axtarış sözü daxil edin." compact />}
      {shown.map((business) => business.type === "individual" ? <button key={business.id} type="button" onClick={() => choose(business.id, business.id)} aria-current={active?.businessId === business.id ? "true" : undefined} className={`flex min-h-16 w-full cursor-pointer items-center gap-3 rounded-2xl border p-3 text-left ${active?.businessId === business.id ? "border-brand-primary bg-amber-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100"><Scissors size={19} /></span><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{business.name}</strong><span className="text-xs text-slate-500">Fərdi usta</span></span>{active?.businessId === business.id && <Check size={18} className="shrink-0 text-emerald-600" />}</button> : <section key={business.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 p-3"><Building2 size={18} className="shrink-0 text-amber-700" /><strong className="min-w-0 flex-1 truncate text-sm">{business.name}</strong><span className="shrink-0 text-xs text-slate-500">{business.branches.length} filial</span></div><div className="space-y-1 p-1.5">{business.branches.map((branch) => { const selected = active?.businessId === business.id && active.branchId === branch.id; return <button key={branch.id} type="button" onClick={() => choose(business.id, branch.id)} aria-current={selected ? "true" : undefined} className={`flex min-h-14 w-full cursor-pointer items-center gap-2 rounded-xl border p-2.5 text-left ${selected ? "border-brand-primary bg-amber-50" : "border-transparent hover:bg-slate-50"}`}><span className={`size-2 shrink-0 rounded-full ${selected ? "bg-emerald-500" : "bg-slate-300"}`} /><span className="min-w-0 flex-1"><strong className="block truncate text-xs sm:text-sm">{branch.name}</strong><span className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-slate-500"><MapPin size={12} className="shrink-0" />{[branch.city, branch.address].filter(Boolean).join(" · ") || "Ünvan qeyd edilməyib"}</span></span>{selected && <Check size={18} className="shrink-0 text-emerald-600" />}</button>; })}{!business.branches.length && <EmptyState title="Filial əlavə edilməyib" compact />}</div></section>)}
    </div>
  </BusinessFormDialog>;
}
