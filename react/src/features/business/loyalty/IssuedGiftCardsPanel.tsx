import { businessLabelClass } from "../components/BusinessField";
import { businessControlClass } from "../components/BusinessField";
import { useState, type FormEvent } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readClients } from "../clients/clients";
import BusinessFormDialog from "../components/BusinessFormDialog";
import type { GiftCard, IssuedGiftCard } from "./loyalty";

const field = businessControlClass;
const cardClass = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm";

export default function IssuedGiftCardsPanel({ session, templates, cards, onChange }: {
  session: BusinessSession; templates: GiftCard[]; cards: IssuedGiftCard[]; onChange: (cards: IssuedGiftCard[]) => boolean;
}) {
  const [action, setAction] = useState<"issue" | "redeem" | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");
  const clients = readClients(session);
  const selected = cards.find((card) => card.id === selectedId);
  function issue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const template = templates.find((item) => item.id === data.get("templateId"));
    const clientId = String(data.get("clientId"));
    if (!template || !clients.some((client) => client.id === clientId)) { setError("Kart və müştəri seçin."); return; }
    const card: IssuedGiftCard = { id: crypto.randomUUID(), templateId: template.id, code: `ZEY-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, clientId, issuedAt: new Date().toISOString(), initialBalance: template.nominal, balance: template.nominal, history: [] };
    if (onChange([card, ...cards])) { setAction(null); setError(""); }
    else setError("Kartı saxlamaq mümkün olmadı.");
  }
  function redeem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const data = new FormData(event.currentTarget);
    const amount = Number(data.get("amount"));
    if (!Number.isFinite(amount) || amount <= 0 || amount > selected.balance) { setError("Məbləğ kartın qalıq balansından çox ola bilməz."); return; }
    const balance = Math.round((selected.balance - amount) * 100) / 100;
    const next = cards.map((card) => card.id === selected.id ? { ...card, balance, history: [{ id: crypto.randomUUID(), date: new Date().toISOString(), amount, note: String(data.get("note") ?? "").trim() || "Xidmət ödənişi", balanceAfter: balance }, ...card.history] } : card);
    if (onChange(next)) { setAction(null); setError(""); }
    else setError("Əməliyyatı saxlamaq mümkün olmadı.");
  }
  return <section className="space-y-3"><div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="text-lg font-bold">Verilmiş kartlar</h2><p className="text-sm text-slate-500">Kartların qalıqları və istifadə tarixçəsi</p></div><button type="button" onClick={() => { setError(""); setAction("issue"); }} disabled={!templates.some((item) => item.status === "active") || !clients.length} className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-4 text-sm font-bold disabled:opacity-40">+ Kart ver</button></div>
    {cards.length ? <div className="grid gap-3 sm:grid-cols-2">{cards.map((card) => <article key={card.id} className={cardClass}><div className="flex flex-wrap items-start justify-between gap-2"><div className="min-w-0"><h3 className="break-words font-bold">{templates.find((item) => item.id === card.templateId)?.name ?? "Hədiyyə kartı"}</h3><p className="text-sm text-slate-500">{clients.find((client) => client.id === card.clientId)?.name ?? "Müştəri silinib"}</p><p className="font-mono text-xs text-slate-500">{card.code}</p></div><strong>{card.balance.toFixed(2)} ₼</strong></div><div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3"><span className="text-xs text-slate-500">Verilib: {new Date(card.issuedAt).toLocaleDateString("az-AZ")}</span><button type="button" disabled={card.balance <= 0} onClick={() => { setSelectedId(card.id); setError(""); setAction("redeem"); }} className="min-h-10 cursor-pointer rounded-xl bg-slate-100 px-3 text-xs font-bold disabled:opacity-40">İstifadə et</button></div>{card.history.length > 0 && <details className="mt-2 text-xs"><summary className="cursor-pointer font-semibold">Əməliyyatlar ({card.history.length})</summary><ul className="mt-2 space-y-1 text-slate-600">{card.history.map((entry) => <li key={entry.id}>{new Date(entry.date).toLocaleDateString("az-AZ")} · −{entry.amount.toFixed(2)} ₼ · {entry.note} · Qalıq {entry.balanceAfter.toFixed(2)} ₼</li>)}</ul></details>}</article>)}</div> : <div className={`${cardClass} text-sm text-slate-500`}>Hələ müştəriyə kart verilməyib.</div>}
    {action && <BusinessFormDialog size="medium" title={action === "issue" ? "Hədiyyə kartı ver" : "Hədiyyə kartını istifadə et"} onClose={() => setAction(null)}><form onSubmit={action === "issue" ? issue : redeem} className="space-y-3 text-sm">{action === "issue" ? <><label className={businessLabelClass}>Kart<select name="templateId" required className={field}><option value="">Seçin</option>{templates.filter((item) => item.status === "active").map((item) => <option key={item.id} value={item.id}>{item.name} · {item.nominal} ₼</option>)}</select></label><label className={businessLabelClass}>Müştəri<select name="clientId" required className={field}><option value="">Seçin</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name} · {client.phone}</option>)}</select></label></> : <><p className="font-semibold">{selected?.code} · Qalıq {selected?.balance.toFixed(2)} ₼</p><label className={businessLabelClass}>Məbləğ<input name="amount" type="number" min="0.01" max={selected?.balance} step="0.01" required className={field} /></label><label className={businessLabelClass}>Qeyd<input name="note" maxLength={150} className={field} /></label></>}{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => setAction(null)} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 font-bold">İmtina</button><button type="submit" className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 font-bold">{action === "issue" ? "Kart ver" : "Təsdiq et"}</button></div></form></BusinessFormDialog>}
  </section>;
}
