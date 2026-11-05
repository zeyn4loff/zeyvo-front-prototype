import { useState, type FormEvent } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { balance, type Client } from "./clients";
import { clientField, clientLabel } from "./clientProfileStyles";

export type DepositDirection = "topup" | "spend";

export default function ClientBalanceDialog({ client, account, initialDirection, onClose, onSave }: {
  client: Client;
  account: "deposit" | "cashback";
  initialDirection: DepositDirection;
  onClose: () => void;
  onSave: (direction: DepositDirection, amount: number, method: string, note: string) => boolean;
}) {
  const [direction, setDirection] = useState<DepositDirection>(initialDirection);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const current = balance(client, account);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value < 0.01 || Math.abs(Math.round(value * 100) - value * 100) > 1e-6) {
      setError("Ən azı 0.01 ₼ məbləğ daxil edin.");
      return;
    }
    if (direction === "spend" && value > current) {
      setError(account === "deposit" ? "Depozit balansı kifayət etmir." : "Bonus balansı kifayət etmir.");
      return;
    }
    const form = new FormData(event.currentTarget);
    if (onSave(direction, value, String(form.get("method") ?? ""), String(form.get("note") ?? "").trim())) onClose();
    else setError("Əməliyyatı yadda saxlamaq mümkün olmadı.");
  }

  return <BusinessFormDialog title={account === "deposit" ? "Depozit əməliyyatı" : "Bonus əməliyyatı"} description={`${client.name} • Cari qalıq: ${current.toFixed(2)} ₼`} size="compact" onClose={onClose}>
    <form onSubmit={submit} className="space-y-4 text-xs">
      <div className={clientLabel}>Əməliyyat növü<div className="mt-1.5 grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-slate-100 p-1">{(["topup", "spend"] as const).map((item) => <button key={item} type="button" aria-pressed={direction === item} onClick={() => { setDirection(item); setError(""); }} className={`min-h-9 rounded-lg px-2 font-bold ${direction === item ? "bg-brand-primary text-slate-900 shadow-sm" : "text-slate-600"}`}>{item === "topup" ? "+ Mədaxil (Artır)" : "− Məxaric (Sil / Ödə)"}</button>)}</div></div>
      <div className={clientLabel}>Məbləğ (₼)<input type="number" inputMode="decimal" min="0.01" step="0.01" required autoFocus value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" className={`${clientField} font-mono`} /><div className="mt-2 flex flex-wrap gap-1.5">{[20, 50, 100, 200].map((value) => <button key={value} type="button" onClick={() => setAmount(String(value))} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{value} ₼</button>)}</div></div>
      {account === "deposit" && direction === "topup" && <label className={clientLabel}>Ödəniş üsulu<select name="method" defaultValue="Bank kartı (POS Terminal)" className={clientField}><option>Nağd ödəniş</option><option>Bank kartı (POS Terminal)</option><option>Bank köçürməsi</option></select></label>}
      <label className={clientLabel}>Təsvir və ya qeyd<input name="note" maxLength={200} placeholder="Məs: Avans depoziti, paket ödənişi..." className={clientField} /></label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-2.5 text-rose-700">{error}</p>}
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4"><button type="button" onClick={onClose} className="min-h-10 rounded-xl bg-slate-100 px-4 font-semibold">İmtina</button><button type="submit" className="min-h-10 rounded-xl bg-brand-primary px-5 font-bold">Təsdiq et</button></div>
    </form>
  </BusinessFormDialog>;
}
