import { showToast as setMessage } from "../../../components/common/toast";
import EmptyState from "../../../components/common/EmptyState";
import { Wallet } from "lucide-react";
import { businessLabelClass } from "../components/BusinessField";
import { businessControlClass } from "../components/BusinessField";
import { useState, type FormEvent } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { balance, type Client, type ClientLedgerEntry } from "../clients/clients";
import { useClients } from "../clients/useClients";

const box = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm";
const field = businessControlClass;
const labels = { deposit: "Depozit", cashback: "Keşbek" };

export default function LoyaltyBalancesPanel({ session }: { session: BusinessSession }) {
  const { clients, update } = useClients(session);
  const [clientId, setClientId] = useState("");
  const [account, setAccount] = useState<ClientLedgerEntry["account"]>("deposit");
  const [direction, setDirection] = useState("topup");
  const selected = clients.find((item) => item.id === clientId);
  const transactions = clients.flatMap((client) => client.ledger.map((entry) => ({ client, entry }))).sort((a, b) => b.entry.date.localeCompare(a.entry.date));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) { setMessage("Müştəri seçin."); return; }
    const form = new FormData(event.currentTarget);
    const amount = Number(form.get("amount"));
    const signed = direction === "spend" ? -amount : amount;
    if (!Number.isFinite(amount) || amount <= 0) { setMessage("Məbləği yoxlayın."); return; }
    if (balance(selected, account) + signed < 0) { setMessage("Balans kifayət etmir."); return; }
    const entry: ClientLedgerEntry = { id: crypto.randomUUID(), account, amount: signed, date: new Date().toISOString(), note: String(form.get("note") ?? "").trim() };
    const next: Client = { ...selected, ledger: [entry, ...selected.ledger] };
    if (!update(clients.map((client) => client.id === selected.id ? next : client))) { setMessage("Əməliyyat saxlanmadı."); return; }
    setMessage(`${labels[account]} balansı yeniləndi.`);
    event.currentTarget.reset();
  }

  return <div className="space-y-4"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{[{ label: "Depozit qalığı", value: clients.reduce((sum, client) => sum + balance(client, "deposit"), 0) }, { label: "Keşbek qalığı", value: clients.reduce((sum, client) => sum + balance(client, "cashback"), 0) }, { label: "Əməliyyat", value: transactions.length }].map((item) => <div key={item.label} className={box}><p className="text-xs text-slate-500">{item.label}</p><strong className="mt-1 block text-xl">{item.value.toFixed(item.label === "Əməliyyat" ? 0 : 2)}{item.label === "Əməliyyat" ? "" : " ₼"}</strong></div>)}</div>
    <form onSubmit={submit} className={`${box} space-y-3`}><h3 className="font-bold">Balans əməliyyatı</h3><div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold">Müştəri<select value={clientId} onChange={(event) => setClientId(event.target.value)} required className={field}><option value="">Seçin</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name} · {client.phone}</option>)}</select></label><label className="text-sm font-semibold">Balans növü<select value={account} onChange={(event) => setAccount(event.target.value as ClientLedgerEntry["account"])} className={field}><option value="deposit">Depozit</option><option value="cashback">Keşbek</option></select></label><label className="text-sm font-semibold">Əməliyyat<select value={direction} onChange={(event) => setDirection(event.target.value)} className={field}><option value="topup">Artır</option><option value="spend">Çıx</option></select></label><label className="text-sm font-semibold">Məbləğ ₼<input type="number" name="amount" min="0.01" step="0.01" required className={field} /></label></div>{selected && <p className="text-xs text-slate-500">Cari balans: {balance(selected, account).toFixed(2)} ₼</p>}<label className={businessLabelClass}>Qeyd<input name="note" maxLength={200} className={field} /></label><div className="flex justify-end"><button type="submit" className="min-h-11 w-full cursor-pointer rounded-xl bg-brand-primary px-5 text-sm font-bold sm:w-auto">Əməliyyatı saxla</button></div></form>
    <section className="space-y-2"><h3 className="font-bold">Əməliyyat tarixçəsi</h3>{transactions.map(({ client, entry }) => <article key={entry.id} className={`${box} flex flex-wrap items-start justify-between gap-2`}><div className="min-w-0"><strong className="block text-sm">{client.name} · {labels[entry.account]}</strong><p className="mt-1 break-words text-xs text-slate-500">{new Date(entry.date).toLocaleString("az-AZ")}{entry.note ? ` · ${entry.note}` : ""}</p></div><strong className={`text-sm ${entry.amount > 0 ? "text-emerald-700" : "text-rose-700"}`}>{entry.amount > 0 ? "+" : ""}{entry.amount.toFixed(2)} ₼</strong></article>)}{!transactions.length && <EmptyState title="Əməliyyat yoxdur" description="Balans əməliyyatları burada görünəcək." icon={Wallet} compact />}</section></div>;
}
