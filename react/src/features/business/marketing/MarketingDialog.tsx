import { useRef, useState, type FormEvent, type ReactNode } from "react";
import BusinessEntryDialog from "../components/BusinessEntryDialog";
import BusinessDatePicker from "@/features/business/components/BusinessDatePicker";
import type { Campaign, Promo } from "./marketing";

const control = "mt-1.5 h-10 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white";
function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block min-w-0 text-xs font-bold text-slate-700">{label}{children}</label>;
}
function newCampaign(target: Campaign["target"] = "all"): Campaign { return { id: crypto.randomUUID(), name: "", channel: "whatsapp", type: "automated", target, message: "", schedule: "auto", status: "active", sentCount: 0, deliveredCount: 0, convertedCount: 0 }; }
function newPromo(): Promo { return { id: crypto.randomUUID(), name: "", code: "", discountType: "percent", discountValue: 15, minOrder: 30, usageLimit: 100, usedCount: 0, startDate: "", endDate: "", status: "active", serviceScope: "all" }; }

export default function MarketingDialog({ kind, item, initialTarget, usedCodes, onClose, onSave }: { kind: "campaign" | "promo"; item: Campaign | Promo | null; initialTarget?: Campaign["target"]; usedCodes: string[]; onClose: () => void; onSave: (item: Campaign | Promo) => boolean }) {
  const [draft, setDraft] = useState<Campaign | Promo>(() => item ?? (kind === "campaign" ? newCampaign(initialTarget) : newPromo()));
  const [error, setError] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);
  function change(patch: Partial<Campaign & Promo>) { setDraft((current) => ({ ...current, ...patch } as Campaign | Promo)); }
  function insertVariable(token: string) {
    if (!("message" in draft)) return;
    const field = messageRef.current;
    const start = field?.selectionStart ?? draft.message.length;
    const end = field?.selectionEnd ?? start;
    change({ message: draft.message.slice(0, start) + token + draft.message.slice(end) });
    requestAnimationFrame(() => { field?.focus(); field?.setSelectionRange(start + token.length, start + token.length); });
  }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (kind === "campaign" && "message" in draft) {
      if (!draft.name.trim() || !draft.message.trim()) return setError("Kampaniyanın adı və mesaj mətni tələb olunur.");
      if (onSave({ ...draft, name: draft.name.trim(), message: draft.message.trim() })) onClose();
      else setError("Yadda saxlamaq mümkün olmadı.");
      return;
    }
    if (!("code" in draft)) return;
    const code = draft.code.trim().toLocaleUpperCase("az-AZ");
    if (!/^[A-Z0-9_-]{3,30}$/.test(code)) return setError("Promokod 3–30 latın hərfi, rəqəm, _ və ya - ola bilər.");
    if (usedCodes.some((value) => value === code && value !== (item && "code" in item ? item.code : ""))) return setError("Bu promokod artıq mövcuddur.");
    if (!draft.name.trim() || draft.discountValue <= 0 || (draft.discountType === "percent" && draft.discountValue > 100) || draft.minOrder < 0 || draft.usageLimit < 0) return setError("Promokod şərtlərini düzgün daxil edin.");
    if (draft.startDate && draft.endDate && draft.endDate < draft.startDate) return setError("Bitmə tarixi başlanğıcdan əvvəl ola bilməz.");
    if (onSave({ ...draft, name: draft.name.trim(), code })) onClose();
    else setError("Yadda saxlamaq mümkün olmadı.");
  }
  return <BusinessEntryDialog title={item ? kind === "campaign" ? "Kampaniyanı redaktə et" : "Promokodu redaktə et" : kind === "campaign" ? "Yeni Kampaniya" : "Yeni Promokod"} description={kind === "campaign" ? "SMS və WhatsApp bildiriş kampaniyasının parametrləri" : "Endirim promokodunun şərtləri və istifadə limiti"} onClose={onClose} footer={<><button type="button" onClick={onClose} className="min-h-10 cursor-pointer rounded-xl bg-slate-100 px-4 text-xs font-bold text-slate-800">Ləğv et</button><button type="submit" form="marketing-entry-form" className="min-h-10 cursor-pointer rounded-xl bg-brand-primary px-4 text-xs font-bold text-slate-900">Yadda saxla</button></>}>
    <form id="marketing-entry-form" onSubmit={save} className="space-y-4 text-xs">
      {kind === "campaign" && "message" in draft && <>
        <Field label="Kampaniyanın adı *"><input className={control} value={draft.name} onChange={(e) => change({ name: e.target.value })} placeholder="Məs: Ad günü təbriki və 15% endirim" maxLength={100} required /></Field>
        <div className="grid gap-3 sm:grid-cols-2"><Field label="Kanal"><select className={control} value={draft.channel} onChange={(e) => change({ channel: e.target.value as Campaign["channel"] })}><option value="whatsapp">WhatsApp Bildirişi</option><option value="sms">SMS Mesajı</option></select></Field><Field label="Kampaniya növü"><select className={control} value={draft.type} onChange={(e) => change({ type: e.target.value as Campaign["type"] })}><option value="automated">Avtomatik zəncir (Trigger)</option><option value="broadcast">Birdəfəlik kütləvi göndəriş</option></select></Field></div>
        <Field label="Hədəf auditoriya / Seqment"><select className={control} value={draft.target} onChange={(e) => change({ target: e.target.value as Campaign["target"] })}><option value="all">Bütün müştərilər</option><option value="birthdays">Ad günü yaxınlaşanlar (3 gün əvvəl)</option><option value="risk">Passiv müştərilər (45+ gündür gəlməyənlər)</option><option value="vip">VIP daimi müştərilər</option><option value="new">Yeni qeydiyyatdan keçənlər</option></select></Field>
        <Field label="Mesaj mətni *"><textarea ref={messageRef} className={`${control} min-h-28 resize-y py-3`} value={draft.message} onChange={(e) => change({ message: e.target.value })} placeholder="Salam, {ad}! Sizə xüsusi hədiyyəmiz var..." maxLength={1000} required /></Field>
        <div className="flex flex-wrap items-center gap-1.5"><span className="mr-1 text-[11px] text-slate-500">Dəyişənlər:</span>{["{ad}", "{salon}", "{promokod}", "{vaxt}"].map((token) => <button key={token} type="button" onClick={() => insertVariable(token)} className="cursor-pointer rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-700 hover:bg-slate-200">{token}</button>)}</div>
        <div className="grid gap-3 sm:grid-cols-2"><Field label="Göndərilmə rejimi"><select className={control} value={draft.schedule ?? "auto"} onChange={(e) => change({ schedule: e.target.value as Campaign["schedule"] })}><option value="auto">Avtomatik qrafik üzrə</option><option value="immediate">Təsdiqdən dərhal sonra</option><option value="draft">Yalnız qaralama kimi saxla</option></select></Field><Field label="Status"><select className={control} value={draft.status} onChange={(e) => change({ status: e.target.value as Campaign["status"] })}><option value="active">Aktiv</option><option value="inactive">Qeyri-aktiv</option><option value="draft">Qaralama</option></select></Field></div>
      </>}
      {kind === "promo" && "code" in draft && <>
        <div className="grid gap-3 sm:grid-cols-2"><Field label="Promokod *"><input className={`${control} font-mono font-bold`} value={draft.code} onChange={(e) => change({ code: e.target.value.toUpperCase() })} placeholder="Məs: YAY2026" maxLength={30} required /></Field><Field label="Kampaniya təsviri"><input className={control} value={draft.name} onChange={(e) => change({ name: e.target.value })} placeholder="Məs: Yay endirimi kampaniyası" maxLength={100} required /></Field></div>
        <div className="grid gap-3 sm:grid-cols-2"><Field label="Endirim növü"><select className={control} value={draft.discountType} onChange={(e) => change({ discountType: e.target.value as Promo["discountType"] })}><option value="percent">Faizlə endirim (%)</option><option value="fixed">Sabit məbləğ (₼)</option></select></Field><Field label={draft.discountType === "percent" ? "Endirim miqdarı (%) *" : "Endirim miqdarı (₼) *"}><input className={control} type="number" min="1" max={draft.discountType === "percent" ? 100 : undefined} step={draft.discountType === "percent" ? "1" : "0.01"} value={draft.discountValue} onChange={(e) => change({ discountValue: Number(e.target.value) })} required /></Field></div>
        <div className="grid gap-3 sm:grid-cols-2"><Field label="Min. sifariş məbləği (₼)"><input className={control} type="number" min="0" step="1" value={draft.minOrder} onChange={(e) => change({ minOrder: Number(e.target.value) })} /></Field><Field label="İstifadə limiti (0 = limitsiz)"><input className={control} type="number" min="0" step="1" value={draft.usageLimit} onChange={(e) => change({ usageLimit: Number(e.target.value) })} /></Field></div>
        <div className="grid gap-3 sm:grid-cols-2"><div className="min-w-0 text-xs font-bold text-slate-700"><div className="mb-1.5">Başlama tarixi</div><BusinessDatePicker value={draft.startDate} onChange={(value) => change({ startDate: value })} label="Başlama tarixi" /></div><div className="min-w-0 text-xs font-bold text-slate-700"><div className="mb-1.5">Bitmə tarixi</div><BusinessDatePicker value={draft.endDate} onChange={(value) => change({ endDate: value })} label="Bitmə tarixi" /></div></div>
        <div className="grid gap-3 sm:grid-cols-2"><Field label="Xidmət təyinatı"><select className={control} value={draft.serviceScope ?? "all"} onChange={(e) => change({ serviceScope: e.target.value as Promo["serviceScope"] })}><option value="all">Bütün xidmətlər</option><option value="specific">Yalnız xüsusi xidmətlər</option></select></Field><Field label="Status"><select className={control} value={draft.status} onChange={(e) => change({ status: e.target.value as Promo["status"] })}><option value="active">Aktiv</option><option value="inactive">Qeyri-aktiv</option></select></Field></div>
      </>}
      {error && <p role="alert" className="text-xs font-semibold text-rose-700">{error}</p>}
    </form>
  </BusinessEntryDialog>;
}
