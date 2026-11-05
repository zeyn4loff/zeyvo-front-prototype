import { useState, type FormEvent } from "react";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { accountBalance, formatMoney, localDate, roundMoney, type FinanceData, type FinanceKind, type FinanceTransaction } from "./finance";
import { Buttons, Frame } from "./FinanceDialogUi";
import { businessControlClass, businessLabelClass, businessTextareaClass } from "../components/BusinessField";
import BusinessDatePicker from "../components/BusinessDatePicker";

type Props = {
  entry: FinanceTransaction | null;
  initialType: FinanceKind;
  data: FinanceData;
  onClose: () => void;
  onSave: (item: FinanceTransaction) => string | null;
};

export function TransactionDialog({ entry, initialType, data, onClose, onSave }: Props) {
  const now = new Date();
  const [draft, setDraft] = useState<FinanceTransaction>(() => entry ?? {
    id: crypto.randomUUID(), date: localDate(), time: now.toTimeString().slice(0, 5),
    type: initialType === "expense" ? "expense" : "income",
    accountId: data.accounts[0]?.id ?? "", toAccountId: "",
    categoryId: data.categories.find((category) => category.type === initialType)?.id ?? "",
    amount: 0, title: "", counterparty: "", note: "", payrollId: "",
  });
  const [error, setError] = useState("");
  const categories = data.categories.filter((category) => category.type === draft.type);
  const patch = (value: Partial<FinanceTransaction>) => { setDraft((previous) => ({ ...previous, ...value })); setError(""); };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = `${draft.date} ${draft.time ?? ""}`.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/);
    if (!match) { setError("Tarix və vaxtı seçin."); return; }
    const [, year, month, day, hour, minute] = match;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
    if (parsed.getFullYear() !== Number(year) || parsed.getMonth() + 1 !== Number(month) || parsed.getDate() !== Number(day) || Number(hour) > 23 || Number(minute) > 59) {
      setError("Tarix və vaxt düzgün deyil."); return;
    }
    const issue = onSave({
      ...draft, date: `${year}-${month}-${day}`, time: `${hour}:${minute}`,
      amount: roundMoney(draft.amount), title: draft.title.trim(),
      counterparty: draft.counterparty.trim(), note: draft.note.trim(),
    });
    if (issue) setError(issue);
    else onClose();
  }

  return <Frame size="medium" title={entry ? "Maliyyə əməliyyatını redaktə et" : "Yeni maliyyə əməliyyatı"} description="Kassaya gəlir və ya xərc qeydiyyatı" onClose={onClose}>
    <form onSubmit={submit} className="space-y-4">
      <fieldset>
        <legend className={businessLabelClass}>Əməliyyat növü</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <label className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border p-2.5 text-center text-xs font-bold ${draft.type === "income" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600"}`}>
            <input type="radio" name="finance-type" value="income" checked={draft.type === "income"} disabled={!!entry} onChange={() => patch({ type: "income", categoryId: data.categories.find((category) => category.type === "income")?.id ?? "" })} className="sr-only" />
            <ArrowDownToLine size={16} />Mədaxil (Gəlir)
          </label>
          <label className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border p-2.5 text-center text-xs font-bold ${draft.type === "expense" ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-200 text-slate-600"}`}>
            <input type="radio" name="finance-type" value="expense" checked={draft.type === "expense"} disabled={!!entry} onChange={() => patch({ type: "expense", categoryId: data.categories.find((category) => category.type === "expense")?.id ?? "" })} className="sr-only" />
            <ArrowUpFromLine size={16} />Məxaric (Xərc)
          </label>
        </div>
      </fieldset>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={businessLabelClass}>Məbləğ (₼) *
          <input required type="number" min="0.01" step="0.01" value={draft.amount || ""} onChange={(event) => patch({ amount: Number(event.target.value) })} placeholder="0.00" className={`${businessControlClass} font-mono text-sm font-bold`} />
        </label>
        <div className={businessLabelClass}>Tarix və vaxt *
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_7rem] gap-2"><BusinessDatePicker value={draft.date} onChange={(date) => patch({ date })} label="Əməliyyat tarixi" /><input aria-label="Əməliyyat vaxtı" required type="time" value={draft.time ?? ""} onChange={(event) => patch({ time: event.target.value })} className={`${businessControlClass} min-w-0 px-2`} /></div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={businessLabelClass}>Kassa / Hesab *
          <select required value={draft.accountId} onChange={(event) => patch({ accountId: event.target.value })} className={businessControlClass}>
            <option value="">Seçin</option>
            {data.accounts.map((account) => <option key={account.id} value={account.id}>{account.name} ({formatMoney(accountBalance(data, account.id))})</option>)}
          </select>
        </label>
        <label className={businessLabelClass}>Kateqoriya *
          <select required value={draft.categoryId} onChange={(event) => patch({ categoryId: event.target.value })} className={businessControlClass}>
            <option value="">Seçin</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </label>
      </div>
      <label className={businessLabelClass}>Əməliyyatın təyinatı *
        <input required maxLength={100} value={draft.title} onChange={(event) => patch({ title: event.target.value })} placeholder="məs. Saç kəsimi xidmət haqqı, Təchizat alışı..." className={businessControlClass} />
      </label>
      <label className={businessLabelClass}>Qarşı tərəf (Müştəri / Usta / Kontragent)
        <input maxLength={100} value={draft.counterparty} onChange={(event) => patch({ counterparty: event.target.value })} placeholder="məs. Nərmin Qasımova, MedBeauty MMC..." className={businessControlClass} />
      </label>
      <label className={businessLabelClass}>Əlavə qeyd
        <textarea rows={2} maxLength={500} value={draft.note} onChange={(event) => patch({ note: event.target.value })} placeholder="Əlavə məlumat və ya çek nömrəsi..." className={businessTextareaClass} />
      </label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700">{error}</p>}
      <Buttons onClose={onClose} />
    </form>
  </Frame>;
}
