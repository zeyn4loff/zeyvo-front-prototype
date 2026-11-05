import { useState, type FormEvent } from "react";
import { accountBalance, formatMoney, type FinanceAccount, type FinanceData } from "./finance";
import { Buttons, Frame } from "./FinanceDialogUi";
import { businessControlClass, businessLabelClass } from "../components/BusinessField";

type Props = {
  account: FinanceAccount | null;
  data: FinanceData;
  onClose: () => void;
  onSave: (entry: FinanceAccount) => string | null;
};

const accountTypeOptions: { value: FinanceAccount["type"]; label: string }[] = [
  { value: "cash", label: "Nağd kassa (Pul yeşiyi)" },
  { value: "pos", label: "POS Terminal" },
  { value: "bank", label: "Bank hesabı (Cari)" },
  { value: "safe", label: "Daxili seyf (Rezerv)" },
];

export function AccountDialog({ account, data, onClose, onSave }: Props) {
  const [draft, setDraft] = useState<FinanceAccount>(() => account ?? { id: crypto.randomUUID(), name: "", type: "cash", openingBalance: 0, details: "" });
  const [error, setError] = useState("");
  const update = (patch: Partial<FinanceAccount>) => { setDraft((value) => ({ ...value, ...patch })); setError(""); };
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issue = onSave({ ...draft, name: draft.name.trim(), details: draft.details.trim() });
    if (issue) setError(issue);
    else onClose();
  }

  return <Frame title={account ? "Kassa / hesabı redaktə et" : "Yeni kassa / hesab"} description="Hesab məlumatlarının daxil edilməsi" onClose={onClose}>
    <form onSubmit={submit} className="space-y-4">
      <label className={businessLabelClass}>Hesabın adı *
        <input required maxLength={80} value={draft.name} onChange={(event) => update({ name: event.target.value })} placeholder="məs. Əsas nağd kassa, ABB Bank hesabı..." className={businessControlClass} />
      </label>
      <label className={businessLabelClass}>Hesabın növü *
        <select required value={draft.type} onChange={(event) => update({ type: event.target.value as FinanceAccount["type"] })} className={businessControlClass}>
          {accountTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
      <label className={businessLabelClass}>İlkin balans (₼)
        <input type="number" min="0" step="0.01" value={draft.openingBalance || ""} onChange={(event) => update({ openingBalance: Number(event.target.value) })} placeholder="0.00" className={`${businessControlClass} font-mono text-sm font-bold`} />
      </label>
      {account && <p className="text-[11px] text-slate-500">Cari qalıq: {formatMoney(accountBalance(data, account.id))}. İlkin balans dəyişdikdə cari qalıq da yenilənir.</p>}
      <label className={businessLabelClass}>İzah və ya rekvizit (IBAN / Terminal ID)
        <input maxLength={200} value={draft.details} onChange={(event) => update({ details: event.target.value })} placeholder="məs. AZ21ABBB... və ya Terminal #12" className={businessControlClass} />
      </label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700">{error}</p>}
      <Buttons onClose={onClose} />
    </form>
  </Frame>;
}
