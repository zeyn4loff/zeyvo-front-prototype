import { clientLabel as businessLabelClass } from "./clientProfileStyles";
import AzPhoneInput from "../components/AzPhoneInput";
import { useState, type FormEvent } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import BusinessDatePicker from "../components/BusinessDatePicker";
import { BusinessTabButton, BusinessTabRail } from "../components/BusinessTabs";
import type { Booking } from "../calendar/bookings";
import type { StaffMember } from "../staff/staff";
import { balance, categoryLabels, genderLabels, phoneDigits, totalSpent, totalVisits, type Client, type ClientVisit } from "./clients";
import { ClientHistorySection, ClientNotesSection } from "./ClientProfileSections";
import ClientLoyaltySection from "./ClientLoyaltySection";
import ClientFilesSection from "./ClientFilesSection";
import ClientStatsSection from "./ClientStatsSection";
import ClientBalanceDialog, { type DepositDirection } from "./ClientBalanceDialog";
import type { LoyaltyData } from "../loyalty/loyalty";
import { ClientCommunications } from "./ClientCommunications";
import ClientTimeline from "./ClientTimeline";
import ClientProfileSidebar from "./ClientProfileSidebar";
import { clientField as field } from "./clientProfileStyles";
import { MessageCircle, Phone } from "lucide-react";
import { deleteClientFile, putClientFile } from "./clientFileStorage";
export type ClientProfileTab = "info" | "history" | "stats" | "loyalty" | "notes" | "files" | "messages" | "timeline";
export default function ClientProfileDialog({ client, clients, bookings, staff, loyaltyData, businessName, initialTab = "info", onClose, onSave }: { client: Client | null; clients: Client[]; bookings: Booking[]; staff: StaffMember[]; loyaltyData: LoyaltyData; businessName: string; initialTab?: ClientProfileTab; onClose: () => void; onSave: (item: Client) => boolean }) {
  const [tab, setTab] = useState<ClientProfileTab>(initialTab);
  const [error, setError] = useState("");
  const [depositAction, setDepositAction] = useState<DepositDirection | null>(null);
  const [bonusAction, setBonusAction] = useState<DepositDirection | null>(null);
  const [visitOpen, setVisitOpen] = useState(false);
  const [birthDate, setBirthDate] = useState(client?.birthDate ?? "");
  const [gender, setGender] = useState<Client["gender"]>(client?.gender ?? "female");
  const matchedBookings = client ? bookings.filter((item) => phoneDigits(item.phone).length >= 9 && phoneDigits(item.phone) === phoneDigits(client.phone)) : [];
  const spent = client ? totalSpent(client) : 0;
  function persist(next: Client) { if (!onSave(next)) { setError("Brauzer yaddaşı doludur. Dəyişiklik saxlanmadı."); return false; } setError(""); return true; }
  function saveInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    if (!name || phoneDigits(phone).length < 9) { setError("Ad və 9 rəqəmli telefon nömrəsi daxil edin."); return; }
    if (clients.some((item) => item.id !== client?.id && phoneDigits(item.phone) === phoneDigits(phone))) { setError("Bu telefon nömrəsi artıq başqa müştəridə var."); return; }
    const deposit = Number(form.get("depositBalance"));
    const cashback = Number(form.get("cashbackBalance"));
    if (![deposit, cashback].every((value) => Number.isFinite(value) && value >= 0)) { setError("Balansları düzgün daxil edin."); return; }
    const ledger = [...(client?.ledger ?? [])];
    for (const [account, desired] of [["deposit", deposit], ["cashback", cashback]] as const) {
      const current = client ? balance(client, account) : 0;
      const difference = Math.round((desired - current) * 100) / 100;
      if (difference) ledger.unshift({ id: crypto.randomUUID(), date: new Date().toISOString(), account, amount: difference, note: client ? "Profil balansı düzəlişi" : "İlkin balans" });
    }
    const saved = persist({ id: client?.id ?? crypto.randomUUID(), name, phone, email: String(form.get("email") ?? "").trim(), gender, category: String(form.get("category")) as Client["category"], birthDate: String(form.get("birthDate") ?? ""), preferredStaffId: String(form.get("preferredStaffId") ?? ""), loyaltyTier: String(form.get("loyaltyTier")) as Client["loyaltyTier"], discountPercent: Number(form.get("discountPercent")), note: String(form.get("note") ?? "").trim(), visits: client?.visits ?? [], historicVisits: client?.historicVisits, historicSpent: client?.historicSpent, ledger, notes: client?.notes ?? [], files: client?.files ?? [], messages: client?.messages ?? [], messageTemplates: client?.messageTemplates ?? [], createdAt: client?.createdAt ?? new Date().toISOString() });
    if (saved && !client) onClose();
  }
  function addVisit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!client) return; const form = new FormData(event.currentTarget); const service = String(form.get("service") ?? "").trim(); const date = String(form.get("date") ?? ""); const amount = Number(form.get("amount")); if (!service || !date || !Number.isFinite(amount) || amount < 0) return; const visit: ClientVisit = { id: crypto.randomUUID(), date, service, staff: String(form.get("staff") ?? ""), amount, note: String(form.get("note") ?? "").trim() }; persist({ ...client, visits: [visit, ...client.visits] }); setVisitOpen(false); event.currentTarget.reset(); }
  function saveBalance(account: "deposit" | "cashback", direction: DepositDirection, amount: number, method: string, note: string) { if (!client) return false; return persist({ ...client, ledger: [{ id: crypto.randomUUID(), date: new Date().toISOString(), account, amount: direction === "spend" ? -amount : amount, method: account === "deposit" && direction === "topup" ? method : undefined, note }, ...client.ledger] }); }
  function addNote(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!client) return; const form = new FormData(event.currentTarget); const text = String(form.get("text") ?? "").trim(); if (!text) return; persist({ ...client, notes: [{ id: crypto.randomUUID(), date: new Date().toISOString(), text }, ...client.notes] }); event.currentTarget.reset(); }
  async function upload(fileList: FileList) {
    if (!client) return;
    const accepted = [...fileList].filter((file) => file.size <= 10 * 1024 * 1024);
    const rejected = fileList.length - accepted.length;
    const added: Client["files"] = [];
    for (const file of accepted) {
      const id = crypto.randomUUID();
      try {
        await putClientFile(id, file);
        added.push({ id, name: file.name, type: file.type, size: file.size, date: new Date().toISOString() });
      } catch { setError(`"${file.name}" yüklənmədi: yaddaş xətası.`); }
    }
    if (added.length && !persist({ ...client, files: [...added, ...client.files] })) {
      await Promise.all(added.map((file) => deleteClientFile(file.id).catch(() => undefined)));
    }
    if (rejected) setError(`${rejected} fayl 10 MB-dan böyükdür və yüklənmədi.`);
  }
  const tabs: { id: ClientProfileTab; label: string }[] = [{ id: "info", label: "Şəxsi məlumatlar" }, { id: "history", label: "Ziyarət tarixçəsi" }, { id: "stats", label: "Statistika və maliyyə" }, { id: "loyalty", label: "Loyallıq" }, { id: "notes", label: "Qeydlər" }, { id: "files", label: "Fayllar" }, { id: "messages", label: "Mesajlar" }, { id: "timeline", label: "Tarixçə" }];
  return <><BusinessFormDialog title={client ? client.name : "Yeni müştəri əlavə et"} description={client ? `${client.phone} • ${categoryLabels[client.category]} • ID: ${client.id}` : "Müştərinin şəxsi məlumatlarını və loyallıq parametrlərini daxil edin"} onClose={onClose} size={client ? "extraWide" : "profile"} scrollContent={!!client}>
    <div className={client ? "flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto min-[900px]:flex-row min-[900px]:overflow-hidden" : ""}><div className="min-w-0 min-[900px]:min-h-0 min-[900px]:flex-1 min-[900px]:overflow-y-auto min-[900px]:pr-1">
    {client && <nav aria-label="Müştəri profili" className="mt-0 overflow-x-auto"><BusinessTabRail>{tabs.map((item) => <span key={item.id} className={item.id === "notes" ? "min-[900px]:hidden" : ""}><BusinessTabButton active={tab === item.id} count={item.id === "history" ? totalVisits(client) : item.id === "files" ? client.files.length : item.id === "messages" ? (client.messages ?? []).length : undefined} onClick={() => { setTab(item.id); setError(""); }}>{item.label}</BusinessTabButton></span>)}</BusinessTabRail></nav>}
    {client && tab === "info" && <div className="mt-4 flex min-w-0 flex-col gap-3 rounded-2xl border border-black/10 bg-gradient-to-r from-slate-900 via-[#2A2B30] to-[#121316] p-4 text-white shadow-md sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-primary/60 bg-white/10 text-xl font-black text-brand-primary">{client.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toLocaleUpperCase("az-AZ")}</span>
        <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><strong className="break-words text-base sm:text-lg">{client.name}</strong><span className={`rounded px-1.5 py-0.5 text-[10px] font-black ${client.gender === "male" ? "bg-blue-500/80" : "bg-pink-500/80"}`}>{genderLabels[client.gender]}</span>{client.discountPercent > 0 && <span className="rounded bg-brand-primary px-2 py-0.5 text-[10px] font-bold text-slate-900">-{client.discountPercent}% endirim</span>}</div><span className="block text-xs font-semibold text-amber-300">{categoryLabels[client.category]}</span><span className="block break-all text-[11px] text-slate-300">{client.phone} · ID: {client.id} · Qeydiyyat: {client.visits.length ? [...client.visits].sort((a, b) => a.date.localeCompare(b.date))[0].date.split("-").reverse().join(".") : "—"}</span></div>
      </div>
      {phoneDigits(client.phone).length >= 9 && <div className="flex flex-wrap gap-2 sm:shrink-0">
        <a href={`tel:+994${phoneDigits(client.phone)}`} className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold"><Phone size={14} className="text-emerald-400" />Zəng</a>
        <a href={`https://wa.me/994${phoneDigits(client.phone)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-300"><MessageCircle size={14} />WhatsApp</a>
      </div>}
    </div>}
    {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {tab === "info" && <form onSubmit={saveInfo} className="mt-5 space-y-4"><h3 className="text-xs font-bold text-slate-900">Şəxsi və əlaqə məlumatları</h3><div className="grid gap-3 sm:grid-cols-2"><label className={businessLabelClass}>Ad və soyad *<input name="name" required maxLength={100} autoFocus={!client} defaultValue={client?.name} className={field} /></label><label className={businessLabelClass}>Mobil nömrə *<AzPhoneInput name="phone" required defaultValue={client?.phone} /></label></div><div className="grid gap-3 sm:grid-cols-3"><label className={businessLabelClass}>E-poçt ünvanı<input name="email" type="email" maxLength={100} defaultValue={client?.email} className={field} /></label><div className={businessLabelClass}>Cins<div className="mt-1 grid grid-cols-2 gap-2">{(["female", "male"] as const).map((value) => <button key={value} type="button" aria-pressed={gender === value} onClick={() => setGender(value)} className={`min-h-10 rounded-xl border px-2 text-xs font-bold ${gender === value ? value === "female" ? "border-2 border-pink-500 bg-pink-50 text-pink-700" : "border-2 border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>{genderLabels[value]}</button>)}</div></div><div className={businessLabelClass}>Doğum tarixi<BusinessDatePicker name="birthDate" label="Doğum tarixi" value={birthDate} onChange={setBirthDate} /></div></div><h3 className="border-t border-slate-100 pt-4 text-xs font-bold text-slate-900">Xidmət və loyallıq parametrləri</h3><div className="grid gap-3 sm:grid-cols-2"><label className={businessLabelClass}>Müştəri kateqoriyası<select name="category" defaultValue={client?.category ?? "regular"} className={field}>{Object.entries(categoryLabels).map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></label><label className={businessLabelClass}>Sevimli mütəxəssis (usta)<select name="preferredStaffId" defaultValue={client?.preferredStaffId ?? ""} className={field}><option value="">Seçilməyib</option>{staff.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label></div><div className="grid gap-3 sm:grid-cols-2"><label className={businessLabelClass}>Loyallıq kartı / səviyyəsi<select name="loyaltyTier" defaultValue={client?.loyaltyTier ?? "standard"} className={field}><option value="standard">Standart Kart (+3% keşbek)</option><option value="silver">Gümüş Kart (+5% keşbek)</option><option value="gold">Qızıl Kart (+7% keşbek)</option><option value="vip">VIP Kart (+10% keşbek)</option></select></label><label className={businessLabelClass}>Fərdi endirim faizi (%)<input name="discountPercent" type="number" min="0" max="100" step="1" defaultValue={client?.discountPercent ?? 0} className={field} /></label></div><div className="grid gap-3 sm:grid-cols-2"><label className={businessLabelClass}>{client ? "Cari depozit balansı (₼)" : "İlkin depozit balansı (₼)"}<input name="depositBalance" type="number" min="0" step="0.01" defaultValue={client ? balance(client, "deposit") : 0} className={field} /></label><label className={businessLabelClass}>{client ? "Cari keşbek / bonus balansı (₼)" : "İlkin bonus balansı (₼)"}<input name="cashbackBalance" type="number" min="0" step="0.01" defaultValue={client ? balance(client, "cashback") : 0} className={field} /></label></div><label className={businessLabelClass}>Qeydlər və xüsusi istəklər<textarea name="note" maxLength={800} rows={3} defaultValue={client?.note} className={`${field} py-3`} /></label><div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 font-semibold">İmtina</button><button type="submit" className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 font-bold">{client ? "Dəyişiklikləri saxla" : "Əlavə et"}</button></div></form>}
    {client && tab === "history" && <ClientHistorySection client={client} persist={persist} matchedBookings={matchedBookings} staff={staff} visitOpen={visitOpen} setVisitOpen={setVisitOpen} addVisit={addVisit} />}
    {client && tab === "stats" && <ClientStatsSection client={client} spent={spent} staffName={staff.find((item) => item.id === client.preferredStaffId)?.name ?? ""} bookings={matchedBookings} onDeposit={setDepositAction} />}
    {client && tab === "loyalty" && <ClientLoyaltySection client={client} spent={spent} loyaltyData={loyaltyData} onEditInfo={() => setTab("info")} onBonus={setBonusAction} />}
    {client && tab === "notes" && <ClientNotesSection client={client} addNote={addNote} />}
    {client && tab === "files" && <ClientFilesSection client={client} upload={upload} persist={persist} />}
    {client && tab === "messages" && <ClientCommunications client={client} businessName={businessName} staffName={staff.find((item) => item.id === client.preferredStaffId)?.name ?? ""} persist={persist} onEditInfo={() => setTab("info")} />}
    {client && tab === "timeline" && <ClientTimeline client={client} bookings={matchedBookings} />}
    </div>{client && <ClientProfileSidebar client={client} bookings={matchedBookings} addNote={addNote} persist={persist} />}</div>
  </BusinessFormDialog>{client && depositAction && <ClientBalanceDialog client={client} account="deposit" initialDirection={depositAction} onClose={() => setDepositAction(null)} onSave={(direction, amount, method, note) => saveBalance("deposit", direction, amount, method, note)} />}{client && bonusAction && <ClientBalanceDialog client={client} account="cashback" initialDirection={bonusAction} onClose={() => setBonusAction(null)} onSave={(direction, amount, method, note) => saveBalance("cashback", direction, amount, method, note)} />}</>;
}
