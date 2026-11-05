import { businessControlClass } from "../components/BusinessField";
import { useState, type FormEvent } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { defaultLoyaltyProgram, type LoyaltyProgram } from "./loyalty";

const field = businessControlClass;
const labels: { key: keyof Omit<LoyaltyProgram, "enabled">; title: string; min: number; max: number; step?: number; suffix: string }[] = [
  { key: "cashbackPercent", title: "Keşbek dərəcəsi", min: 0, max: 100, suffix: "%" },
  { key: "pointValueAzn", title: "1 balın dəyəri", min: 0.01, max: 100, step: 0.01, suffix: "₼" },
  { key: "maxPayPercent", title: "Balla maksimum ödəniş", min: 0, max: 100, suffix: "%" },
  { key: "welcomeBonus", title: "İlk qəbul bonusu", min: 0, max: 1000, suffix: "bal" },
  { key: "birthdayBonus", title: "Ad günü bonusu", min: 0, max: 1000, suffix: "bal" },
  { key: "reviewBonus", title: "Rəy bonusu", min: 0, max: 1000, suffix: "bal" },
];

export default function LoyaltyProgramDialog({ value, onClose, onSave }: { value?: LoyaltyProgram; onClose: () => void; onSave: (value: LoyaltyProgram) => boolean }) {
  const [draft, setDraft] = useState<LoyaltyProgram>({ ...defaultLoyaltyProgram, ...value });
  const [error, setError] = useState("");
  function save(event: FormEvent) {
    event.preventDefault();
    if (labels.some(({ key, min, max }) => !Number.isFinite(draft[key]) || draft[key] < min || draft[key] > max)) { setError("Dəyərləri göstərilən aralıqda daxil edin."); return; }
    if (onSave(draft)) onClose(); else setError("Ayarları saxlamaq mümkün olmadı.");
  }
  return <BusinessFormDialog title="Loyallıq proqramı qaydaları" description="Keşbek, bal dəyəri və bonuslar" onClose={onClose} size="stock"><form onSubmit={save} className="space-y-4"><label className="flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold"><span>Keşbek proqramı aktivdir</span><input type="checkbox" checked={draft.enabled} onChange={(event) => setDraft({ ...draft, enabled: event.target.checked })} className="size-5 shrink-0 accent-lime-400" /></label><div className="grid gap-3 sm:grid-cols-2">{labels.map(({ key, title, min, max, step, suffix }) => <label key={key} className="block text-sm font-semibold text-slate-700">{title}<span className="relative block"><input type="number" min={min} max={max} step={step ?? 1} value={draft[key]} onChange={(event) => setDraft({ ...draft, [key]: Number(event.target.value) })} className={`${field} pr-12`} required /><span className="pointer-events-none absolute right-3 top-4 text-xs text-slate-400">{suffix}</span></span></label>)}</div><label className="block text-sm font-semibold text-slate-700">Balların qüvvədə olma müddəti<select value={draft.expiryDays} onChange={(event) => setDraft({ ...draft, expiryDays: Number(event.target.value) })} className={field}><option value={90}>90 gün</option><option value={180}>180 gün</option><option value={365}>365 gün</option><option value={0}>Müddətsiz</option></select></label>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}<div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 text-sm font-bold">İmtina</button><button type="submit" className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 text-sm font-bold">Yadda saxla</button></div></form></BusinessFormDialog>;
}
