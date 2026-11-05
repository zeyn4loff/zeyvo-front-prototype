import { useState, type FormEvent } from "react";
import type { StaffMember } from "../staff/staff";
import { accountBalance, formatMoney, localDate, type FinanceData, type ShiftFormValues } from "./finance";
import { Buttons, Frame } from "./FinanceDialogUi";
import { businessControlClass, businessLabelClass } from "../components/BusinessField";

type Props = {
  mode: "open" | "close";
  accountId: string;
  data: FinanceData;
  staff: StaffMember[];
  onClose: () => void;
  onSave: (values: ShiftFormValues) => string | null;
};

export function ShiftDialog({ mode, accountId, data, staff, onClose, onSave }: Props) {
  const shift = data.shifts.find((item) => !item.closedAt);
  const today = localDate();
  const cashTurnover = data.transactions.filter((item) => item.date === today && item.accountId === accountId && item.type === "income").reduce((sum, item) => sum + item.amount, 0);
  const cardTurnover = data.transactions.filter((item) => item.date === today && item.type === "income" && data.accounts.find((account) => account.id === item.accountId)?.type === "pos").reduce((sum, item) => sum + item.amount, 0);
  const expectedCash = (shift?.openingCash ?? 0) + cashTurnover;
  const [cashier, setCashier] = useState(shift?.cashier ?? staff[0]?.name ?? "Administrator");
  const [openingCash, setOpeningCash] = useState(accountBalance(data, accountId));
  const [actualCash, setActualCash] = useState(expectedCash);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const cashierOptions = staff.some((member) => member.name === cashier) ? staff : [{ id: "cashier", name: cashier, specialization: "Administrator / Kassir" }, ...staff];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issue = onSave({ cashier, openingCash, actualCash, note: note.trim() });
    if (issue) setError(issue);
    else onClose();
  }

  return <Frame
    title={mode === "close" ? "Kassa Növbəsini Bağla (Z-Hesabat)" : "Yeni Kassa Növbəsi Aç"}
    description={mode === "close" ? "Günün yekunlaşdırılması və nağd pulun təhvili" : "Gündəlik xidmət və ödənişlərin qəbulu üçün növbə"}
    onClose={onClose}
  >
    <form onSubmit={submit} className="space-y-4">
      {mode === "close" ? <>
        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs">
          <div className="flex justify-between gap-2"><span className="text-slate-600">Növbə nömrəsi:</span><strong>#{shift?.number ?? data.shifts.length + 103}</strong></div>
          <div className="flex justify-between gap-2"><span className="text-slate-600">Açılış vaxtı:</span><strong className="text-right font-medium">{shift ? new Date(shift.openedAt).toLocaleString("az-AZ") : ""}</strong></div>
          <div className="flex justify-between gap-2"><span className="text-slate-600">İlkin nağd qalıq:</span><strong className="font-mono">{formatMoney(shift?.openingCash ?? 0)}</strong></div>
          <div className="flex justify-between gap-2 text-emerald-700"><span>Nağd dövriyyə:</span><strong className="font-mono">+ {formatMoney(cashTurnover)}</strong></div>
          <div className="flex justify-between gap-2 text-indigo-700"><span>POS Terminal dövriyyəsi:</span><strong className="font-mono">+ {formatMoney(cardTurnover)}</strong></div>
          <div className="flex justify-between gap-2 border-t border-slate-200 pt-2 text-sm font-bold"><span>Kassada gözlənilən nağd:</span><strong className="font-mono text-emerald-600">{formatMoney(expectedCash)}</strong></div>
        </div>
        <label className={businessLabelClass}>Faktiki sayılmış nağd pul (₼) *
          <input required type="number" min="0" step="0.01" value={actualCash} onChange={(event) => setActualCash(Number(event.target.value))} className={`${businessControlClass} font-mono text-sm font-bold`} />
        </label>
        <label className={businessLabelClass}>Növbənin yekun qeydi
          <input value={note} onChange={(event) => setNote(event.target.value)} maxLength={200} placeholder="məs. Növbə fərqsiz bağlandı" className={businessControlClass} />
        </label>
      </> : <>
        <label className={businessLabelClass}>Kassir / Administrator *
          <select required value={cashier} onChange={(event) => setCashier(event.target.value)} className={businessControlClass}>
            {cashierOptions.map((member) => <option key={member.id} value={member.name}>{member.name} ({member.specialization || "Əməkdaş"})</option>)}
          </select>
        </label>
        <label className={businessLabelClass}>Açılış nağd qalığı (Yeşikdə olan pul) (₼) *
          <input required type="number" min="0" step="0.01" value={openingCash} onChange={(event) => setOpeningCash(Number(event.target.value))} className={`${businessControlClass} font-mono text-sm font-bold`} />
        </label>
        <label className={businessLabelClass}>Qeyd
          <input value={note} onChange={(event) => setNote(event.target.value)} maxLength={200} placeholder="məs. Səhər növbəsi" className={businessControlClass} />
        </label>
      </>}
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700">{error}</p>}
      <Buttons onClose={onClose} submitLabel={mode === "close" ? "Növbəni bağla və Z-hesabat təsdiqlə" : "Növbəni aç"} />
    </form>
  </Frame>;
}
