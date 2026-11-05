import { useState, type FormEvent } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { businessControlClass, businessLabelClass } from "../components/BusinessField";
import { accountBalance, formatMoney, localDate, roundMoney, type FinanceData, type FinanceTransaction } from "./finance";

type Props = {
  data: FinanceData;
  entry: FinanceTransaction | null;
  initialAccountId?: string;
  onClose: () => void;
  onSave: (item: FinanceTransaction) => string | null;
};

export function TransferDialog({ data, entry, initialAccountId, onClose, onSave }: Props) {
  const firstId = entry?.accountId ?? initialAccountId ?? data.accounts[0]?.id ?? "";
  const [fromId, setFromId] = useState(firstId);
  const [toId, setToId] = useState(entry?.toAccountId ?? data.accounts.find((account) => account.id !== firstId)?.id ?? "");
  const [amount, setAmount] = useState(entry?.amount ?? 0);
  const [note, setNote] = useState(entry?.note === "Daxili hesablararası vəsait köçürməsi" ? "" : entry?.note ?? "");
  const [error, setError] = useState("");
  const available = accountBalance(data, fromId) + (entry?.accountId === fromId ? entry.amount : 0);

  function changeSource(id: string) {
    setFromId(id);
    if (id === toId) setToId(data.accounts.find((account) => account.id !== id)?.id ?? "");
    setError("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const from = data.accounts.find((account) => account.id === fromId);
    const to = data.accounts.find((account) => account.id === toId);
    if (!from || !to || from.id === to.id) { setError("Fərqli hesablar seçin."); return; }
    const now = new Date();
    const issue = onSave({
      id: entry?.id ?? crypto.randomUUID(),
      date: entry?.date ?? localDate(),
      time: entry?.time ?? now.toTimeString().slice(0, 5),
      type: "transfer",
      accountId: from.id,
      toAccountId: to.id,
      categoryId: "",
      amount: roundMoney(amount),
      title: `Köçürmə: ${from.name} → ${to.name}`,
      counterparty: "Daxili inkassasiya",
      note: note.trim() || "Daxili hesablararası vəsait köçürməsi",
      payrollId: "",
    });
    if (issue) setError(issue);
    else onClose();
  }

  return <BusinessFormDialog
    size="compact"
    title="Daxili köçürmə"
    description="Hesablar və kassalar arasında vəsait köçürülməsi"
    onClose={onClose}
  >
    <form onSubmit={submit} className="space-y-4">
      <label className={businessLabelClass}>Çıxarılan hesab (Haradan) *
        <select required value={fromId} onChange={(event) => changeSource(event.target.value)} className={businessControlClass}>
          <option value="">Hesab seçin</option>
          {data.accounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
        </select>
        <span className="mt-1 block font-mono text-[11px] text-slate-400">Mövcud qalıq: {formatMoney(available)}</span>
      </label>
      <label className={businessLabelClass}>Mədaxil olan hesab (Haraya) *
        <select required value={toId} onChange={(event) => { setToId(event.target.value); setError(""); }} className={businessControlClass}>
          <option value="">Hesab seçin</option>
          {data.accounts.filter((account) => account.id !== fromId).map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
        </select>
      </label>
      <label className={businessLabelClass}>Köçürülən məbləğ (₼) *
        <div className="relative"><input required type="number" min="0.01" max={available} step="0.01" value={amount || ""} onChange={(event) => { setAmount(Number(event.target.value)); setError(""); }} placeholder="0.00" className={`${businessControlClass} pr-9 font-mono font-bold`} /><span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₼</span></div>
      </label>
      <label className={businessLabelClass}>Təsvir / Qeyd
        <input value={note} onChange={(event) => setNote(event.target.value)} maxLength={500} placeholder="məs. Kassa inkassasiyası, Seyfə köçürmə..." className={businessControlClass} />
      </label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700">{error}</p>}
      <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClose} className="min-h-11 rounded-xl bg-slate-100 px-4 text-xs font-semibold text-slate-800">Ləğv et</button>
        <button type="submit" className="min-h-11 rounded-xl bg-brand-primary px-4 text-xs font-bold text-slate-900">Köçürməni icra et</button>
      </div>
    </form>
  </BusinessFormDialog>;
}
