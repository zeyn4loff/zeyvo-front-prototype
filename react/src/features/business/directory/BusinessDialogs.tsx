import { businessControlClass, businessTextareaClass } from "../components/BusinessField";
import { useState, type FormEvent } from "react";
import { ArrowRight, Building2, UserRound } from "lucide-react";
import BusinessEntryDialog from "../components/BusinessEntryDialog";
import type { Business } from "./businesses";

const inputClass = businessControlClass;
const actionButtonClass = "inline-flex min-h-11 cursor-pointer items-center justify-center gap-[0.4rem] rounded-[14px] px-4 text-xs font-bold leading-tight transition-colors min-[480px]:min-h-10";

function BusinessTypeCard({ value, selected, onSelect }: { value: Business["type"]; selected: boolean; onSelect: () => void }) {
  const individual = value === "individual";
  const Icon = individual ? UserRound : Building2;
  return (
    <label className={`flex min-w-0 cursor-pointer flex-col gap-2 rounded-2xl border-2 p-3.5 transition-colors ${selected ? "border-[#202124] bg-white ring-2 ring-brand-primary/30" : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white"}`}>
      <span className="flex items-start justify-between gap-2">
        <span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${individual ? "bg-blue-50 text-blue-600" : "bg-brand-primary text-slate-900"}`}><Icon size={18} aria-hidden="true" /></span>
        <input type="radio" name="type" value={value} checked={selected} onChange={onSelect} className="mt-1 size-4 shrink-0 cursor-pointer accent-[#202124]" />
      </span>
      <span className="min-w-0"><strong className="block text-xs font-medium text-slate-900">{individual ? "Fərdi usta" : "Biznes"}</strong><span className="mt-0.5 block text-[11px] leading-4 text-slate-400">{individual ? "Fərdi çalışan mütəxəssis" : "Salon, studiya və ya mərkəz"}</span></span>
    </label>
  );
}

export function BusinessFormDialog({ open, initial, saveError, onClose, onSave, onConfigureIndividual }: { open: boolean; initial?: Business; saveError?: string; onClose: () => void; onSave: (value: Business) => void; onConfigureIndividual: (value: Business) => void }) {
  const [type, setType] = useState<Business["type"]>(initial?.type ?? "business");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    if (!name) return;
    const value: Business = { ...initial, id: initial?.id ?? crypto.randomUUID(), type, name, description: String(data.get("description") || "").trim(), topCategory: initial?.topCategory, category: initial?.category, image: initial?.image, branches: initial?.branches ?? [] };
    if (type === "individual") onConfigureIndividual(value);
    else onSave(value);
  }
  return <BusinessEntryDialog open={open} title={initial ? "Məlumatları redaktə et" : "Yeni Biznes və ya Fərdi Usta"} description="Biznes və ya fərdi fəaliyyət məlumatlarını daxil edin" onClose={onClose} scrollContent bodyPadding={false}>
      <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 space-y-4 overflow-y-auto px-5 py-5 text-xs sm:px-7">
          <fieldset><legend className="mb-2 font-medium text-slate-700">Fəaliyyət növü *</legend><div className="grid grid-cols-2 gap-3">{(["business", "individual"] as const).map((value) => <BusinessTypeCard key={value} value={value} selected={type === value} onSelect={() => setType(value)} />)}</div></fieldset>
          <label className="block font-medium text-slate-700">{type === "business" ? "Biznesin adı *" : "Ad və Soyad (Fərdi usta) *"}<input name="name" defaultValue={initial?.name} required maxLength={100} autoFocus className={inputClass} placeholder={type === "business" ? "Məs: Baku Beauty Studio" : "Məs: Samir Əliyev (Bərbər)"} /></label>
          <label className="block font-medium text-slate-700">Təsvir<textarea name="description" defaultValue={initial?.description} maxLength={500} rows={3} className={businessTextareaClass} placeholder="Biznesiniz və ya təqdim etdiyiniz xidmətlər haqqında qısa məlumat..." /></label>
          {saveError && <p role="alert" className="text-xs text-red-600">{saveError}</p>}
        </div>
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 min-[480px]:flex-row min-[480px]:justify-end min-[480px]:gap-2.5 min-[480px]:border-0 min-[480px]:pt-2 min-[480px]:pb-7 sm:px-7"><button type="button" onClick={onClose} className={`${actionButtonClass} border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200`}>Ləğv et</button><button type="submit" className={`${actionButtonClass} bg-brand-primary text-slate-900 hover:bg-[#B9DC65]`}>{initial ? "Yadda saxla" : type === "business" ? "Biznesi yarat" : "Fərdi Ustanı Əlavə Et və Tənzimlə"}{!initial && type === "individual" && <ArrowRight size={14} aria-hidden="true" />}</button></div>
      </form>
  </BusinessEntryDialog>;
}

