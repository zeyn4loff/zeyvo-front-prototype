import { useState, type FormEvent } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { balance, phoneDigits, readClients } from "../clients/clients";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { readFinance } from "../finance/finance";
import { paymentLabels, type PaymentMethod } from "../pos/pos";
import type { Booking } from "./bookings";

export default function BookingCheckoutDialog({ session, booking, initialMethod = "cash", onClose, onConfirm }: {
  session: BusinessSession;
  booking: Booking;
  initialMethod?: PaymentMethod;
  onClose: () => void;
  onConfirm: (method: PaymentMethod, accountId: string) => string | null;
}) {
  const finance = readFinance(session);
  const accounts = finance.accounts;
  const clients = readClients(session);
  const client = clients.find((item) => item.id === booking.clientId || (phoneDigits(booking.phone).length >= 9 && phoneDigits(item.phone) === phoneDigits(booking.phone)));
  const [method, setMethod] = useState<PaymentMethod>(initialMethod);
  const [accountId, setAccountId] = useState(accounts.find((account) => account.type === (initialMethod === "terminal" ? "pos" : "cash"))?.id ?? "");
  const [error, setError] = useState("");
  function chooseMethod(next: PaymentMethod) { setMethod(next); if (next === "cash" || next === "terminal") setAccountId(accounts.find((account) => account.type === (next === "cash" ? "cash" : "pos"))?.id ?? ""); }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const result = onConfirm(method, accountId); if (result) setError(result); }
  return <BusinessFormDialog size="medium" title="Qəbulu tamamla" onClose={onClose}><form onSubmit={submit} className="space-y-4 text-sm"><div className="rounded-xl bg-slate-50 p-3"><p className="font-bold">{booking.clientName}</p><p className="mt-1 text-slate-500">{booking.service} · {booking.date} {booking.time}</p><strong className="mt-2 block text-lg">{booking.price.toFixed(2)} ₼</strong></div><fieldset><legend className="mb-2 font-bold">Ödəniş üsulu</legend><div className="grid grid-cols-2 gap-2">{(Object.keys(paymentLabels) as PaymentMethod[]).map((item) => <button key={item} type="button" aria-pressed={method === item} onClick={() => chooseMethod(item)} className={`min-h-11 cursor-pointer rounded-xl border px-2 font-bold ${method === item ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white"}`}>{paymentLabels[item]}</button>)}</div></fieldset>{method === "deposit" || method === "bonus" ? <p className="rounded-xl bg-slate-50 p-3 text-slate-600">Müştəri balansı: {client ? balance(client, method === "deposit" ? "deposit" : "cashback").toFixed(2) : "0.00"} ₼</p> : <label className="block font-bold">Kassa hesabı<select required value={accountId} onChange={(event) => setAccountId(event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3"><option value="">Hesab seçin</option>{accounts.filter((account) => account.type === (method === "cash" ? "cash" : "pos")).map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}</select></label>}{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 font-bold">İmtina</button><button type="submit" className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 font-bold">Ödənişi təsdiqlə</button></div></form></BusinessFormDialog>;
}
