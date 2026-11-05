import type { BusinessSession } from "../auth/businessSession";
import { balance, phoneDigits, readClients, saveClients } from "../clients/clients";
import { readFinance, saveFinance, type FinanceTransaction } from "../finance/finance";
import { paymentLabels, type PaymentMethod } from "../pos/pos";
import type { Booking } from "./bookings";
import { syncBookingClient } from "./syncBookingClient";

export function checkoutBooking(session: BusinessSession, booking: Booking, method: PaymentMethod, accountId: string, saveCompleted: () => boolean, restoreBooking: () => boolean): string | null {
  const clientsBefore = readClients(session);
  const financeBefore = readFinance(session);
  const phone = phoneDigits(booking.phone);
  const client = clientsBefore.find((item) => item.id === booking.clientId || (phone.length >= 9 && phoneDigits(item.phone) === phone));
  const balanceMethod = method === "deposit" || method === "bonus";
  const incomeCategory = financeBefore.categories.find((item) => item.id === "cat_income_service" && item.type === "income") ?? financeBefore.categories.find((item) => item.type === "income");
  if (!client && phone.length < 9) return "Müştəri kartı və ya düzgün telefon nömrəsi lazımdır.";
  if (balanceMethod && (!client || balance(client, method === "deposit" ? "deposit" : "cashback") < booking.price)) return "Müştəri balansında kifayət qədər vəsait yoxdur.";
  if (!balanceMethod && booking.price > 0 && !financeBefore.accounts.some((account) => account.id === accountId && account.type === (method === "cash" ? "cash" : "pos"))) return "Uyğun kassa hesabı seçin.";
  if (!balanceMethod && booking.price > 0 && !incomeCategory) return "Əvvəlcə gəlir kateqoriyası yaradın.";
  if (financeBefore.transactions.some((item) => item.id === `booking-payment:${booking.id}`)) return "Bu qəbul üçün ödəniş artıq qeydə alınıb.";
  if (!saveCompleted()) return "Qəbulu yadda saxlamaq mümkün olmadı. Ödəniş qeydə alınmadı.";
  const rollback = (message: string) => {
    const bookingRestored = restoreBooking();
    const clientsRestored = saveClients(session.id, clientsBefore);
    const financeRestored = saveFinance(session.id, financeBefore);
    return bookingRestored && clientsRestored && financeRestored ? message : `${message} Əvvəlki məlumatları tam bərpa etmək mümkün olmadı; kassanı və qəbulu yoxlayın.`;
  };
  if (!syncBookingClient(session, { ...booking, status: "Tamamlandı" })) return rollback("Müştəri tarixçəsini saxlamaq mümkün olmadı.");
  const clientsAfter = readClients(session);
  if (balanceMethod && booking.price > 0) {
    const updated = clientsAfter.map((item) => item.id === (client?.id ?? booking.clientId) ? { ...item, ledger: [{ id: `booking-payment:${booking.id}`, date: booking.date, account: method === "deposit" ? "deposit" as const : "cashback" as const, amount: -booking.price, note: `Qəbul: ${booking.service}` }, ...item.ledger] } : item);
    if (!saveClients(session.id, updated)) return rollback("Balans əməliyyatı saxlanmadı.");
  }
  if (!balanceMethod && booking.price > 0) {
    const transaction: FinanceTransaction = { id: `booking-payment:${booking.id}`, date: booking.date, type: "income", accountId, toAccountId: "", categoryId: incomeCategory?.id ?? "", amount: booking.price, title: `Qəbul: ${booking.service}`, counterparty: booking.clientName, note: `${paymentLabels[method]} · ${booking.masterName}`, payrollId: "" };
    if (!saveFinance(session.id, { ...financeBefore, transactions: [transaction, ...financeBefore.transactions] })) return rollback("Kassa əməliyyatı saxlanmadı.");
  }
  return null;
}
