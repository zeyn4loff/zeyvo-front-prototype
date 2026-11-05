import { useState, type FormEvent } from "react";
import type { StaffMember } from "../staff/staff";
import { accountBalance, formatMoney, localDate, payrollPaid, type FinanceData, type PayrollAccrual, type PayrollPaymentType } from "./finance";
import { Buttons, Frame } from "./FinanceDialogUi";
import { businessControlClass, businessLabelClass } from "../components/BusinessField";
import BusinessDatePicker from "../components/BusinessDatePicker";

type Props = {
  mode: "accrue" | "pay";
  initialPayrollId?: string;
  data: FinanceData;
  staff: StaffMember[];
  onClose: () => void;
  onAccrue: (item: PayrollAccrual) => string | null;
  onPay: (payrollId: string, accountId: string, amount: number, date: string, note: string, paymentType: PayrollPaymentType) => string | null;
};

export function PayrollDialog({ mode, initialPayrollId, data, staff, onClose, onAccrue, onPay }: Props) {
  const payable = data.payroll.filter((item) => item.amount > payrollPaid(data, item.id));
  const [staffId, setStaffId] = useState(staff[0]?.id ?? "");
  const [payrollId, setPayrollId] = useState(initialPayrollId ?? payable[0]?.id ?? "");
  const [paymentType, setPaymentType] = useState<PayrollPaymentType>("salary");
  const [accountId, setAccountId] = useState(data.accounts[0]?.id ?? "");
  const [period, setPeriod] = useState(localDate().slice(0, 7));
  const [amount, setAmount] = useState(() => {
    const selected = payable.find((item) => item.id === initialPayrollId) ?? payable[0];
    return mode === "pay" && selected ? selected.amount - payrollPaid(data, selected.id) : 0;
  });
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const selected = payable.find((item) => item.id === payrollId);
  const due = selected ? selected.amount - payrollPaid(data, selected.id) : 0;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issue = mode === "accrue"
      ? onAccrue({ id: crypto.randomUUID(), staffId, period, amount, note: note.trim() })
      : onPay(payrollId, accountId, amount, localDate(), note.trim(), paymentType);
    if (issue) setError(issue);
    else onClose();
  }

  return <Frame title={mode === "accrue" ? "Maaş hesabla" : "Maaş və ya Avans ödənişi"} description={mode === "accrue" ? "Əməkdaşın qazancını hesablayın" : "Əməkdaşa qazancının ödənilməsi"} onClose={onClose}>
    <form onSubmit={submit} className="space-y-4">
      {mode === "accrue" ? <>
        <label className={businessLabelClass}>Əməkdaş *
          <select required value={staffId} onChange={(event) => setStaffId(event.target.value)} className={businessControlClass}>
            <option value="">Seçin</option>
            {staff.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
          </select>
        </label>
        <label className={businessLabelClass}>Ay *
          <BusinessDatePicker value={period} onChange={setPeriod} label="Maaş ayı" precision="month" />
        </label>
      </> : <>
        <label className={businessLabelClass}>Əməkdaş *
          <select required value={payrollId} onChange={(event) => {
            const nextId = event.target.value;
            const next = payable.find((item) => item.id === nextId);
            setPayrollId(nextId);
            setAmount(next ? next.amount - payrollPaid(data, next.id) : 0);
            setError("");
          }} className={businessControlClass}>
            <option value="">Seçin</option>
            {payable.map((item) => <option key={item.id} value={item.id}>{staff.find((member) => member.id === item.staffId)?.name ?? "Əməkdaş"} — Qalıq: {formatMoney(item.amount - payrollPaid(data, item.id))}</option>)}
          </select>
          {selected && <span className="mt-1 block font-mono text-[11px] text-slate-500">Qazanılan: {formatMoney(selected.amount)} · Verilmiş avans: {formatMoney(payrollPaid(data, selected.id))} · Qalıq borc: {formatMoney(due)}</span>}
        </label>
        <label className={businessLabelClass}>Ödəniş növü *
          <select required value={paymentType} onChange={(event) => setPaymentType(event.target.value as PayrollPaymentType)} className={businessControlClass}>
            <option value="salary">Qalıq maaşın ödənişi</option>
            <option value="advance">Avans ödənişi</option>
            <option value="bonus">Bonus / Mükafat</option>
          </select>
        </label>
        <label className={businessLabelClass}>Ödəniş hesabı / Kassa *
          <select required value={accountId} onChange={(event) => setAccountId(event.target.value)} className={businessControlClass}>
            <option value="">Seçin</option>
            {data.accounts.map((account) => <option key={account.id} value={account.id}>{account.name} ({formatMoney(accountBalance(data, account.id))})</option>)}
          </select>
        </label>
      </>}
      <label className={businessLabelClass}>{mode === "pay" ? "Ödənilən məbləğ (₼) *" : "Hesablanan məbləğ (₼) *"}
        <input type="number" min="0.01" max={mode === "pay" ? due : undefined} step="0.01" required value={amount || ""} onChange={(event) => setAmount(Number(event.target.value))} placeholder="0.00" className={`${businessControlClass} font-mono text-sm font-bold`} />
      </label>
      <label className={businessLabelClass}>Qeyd
        <input value={note} onChange={(event) => setNote(event.target.value)} maxLength={250} placeholder={mode === "pay" ? "məs. Cari ay üzrə yekun hesablaşma..." : undefined} className={businessControlClass} />
      </label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700">{error}</p>}
      <Buttons onClose={onClose} submitLabel={mode === "pay" ? "Ödənişi təsdiqlə" : "Yadda saxla"} />
    </form>
  </Frame>;
}
