import type { BusinessSession } from "../auth/businessSession";
import { sampleFinanceData } from "./financeSeed";

export type FinanceTab = "accounts" | "transactions" | "payroll" | "categories";
export type AccountType = "cash" | "pos" | "bank" | "safe";
export type FinanceKind = "income" | "expense" | "transfer";
export interface FinanceAccount { id: string; name: string; type: AccountType; openingBalance: number; details: string; isDefault?: boolean }
export interface FinanceCategory { id: string; name: string; type: "income" | "expense" }
export interface FinanceTransaction { id: string; date: string; time?: string; type: FinanceKind; accountId: string; toAccountId: string; categoryId: string; amount: number; title: string; counterparty: string; note: string; payrollId: string }
export interface CashShift { id: string; accountId: string; openedAt: string; openingCash: number; closedAt: string; closingCash: number; note: string; number?: number; cashier?: string; actualCash?: number }
export interface ShiftFormValues { cashier: string; openingCash: number; actualCash: number; note: string }
export interface PayrollAccrual { id: string; staffId: string; period: string; amount: number; note: string; serviceTurnover?: number; serviceRate?: number; productSales?: number; productRate?: number }
export type PayrollPaymentType = "salary" | "advance" | "bonus";
export interface FinanceData { accounts: FinanceAccount[]; categories: FinanceCategory[]; transactions: FinanceTransaction[]; shifts: CashShift[]; payroll: PayrollAccrual[] }
const key = (id: string) => `zeyvo_business_finance_demo_v1_${id}`;
export const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
export const formatMoney = (value: number) => `${value.toLocaleString("az-AZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼`;
export const accountTypes: Record<AccountType, string> = { cash: "Nağd kassa", pos: "POS terminal", bank: "Bank hesabı", safe: "Seyf" };
function defaults(): FinanceData { return { accounts: [{ id: "acc_cash", name: "Əsas nağd kassa", type: "cash", openingBalance: 0, details: "", isDefault: true }, { id: "acc_pos", name: "Kart / POS", type: "pos", openingBalance: 0, details: "" }], categories: [
  { id: "cat_income_service", name: "Xidmət gəliri", type: "income" }, { id: "cat_income_product", name: "Məhsul satışı", type: "income" }, { id: "cat_income_other", name: "Digər gəlir", type: "income" },
  { id: "cat_exp_salary", name: "Əmək haqqı və avans", type: "expense" }, { id: "cat_exp_rent", name: "İcarə", type: "expense" }, { id: "cat_exp_supplies", name: "Məhsul və xammal", type: "expense" }, { id: "cat_exp_other", name: "Digər xərc", type: "expense" },
], transactions: [], shifts: [], payroll: [] }; }
function isData(value: unknown): value is FinanceData { if (!value || typeof value !== "object") return false; const data = value as Partial<FinanceData>; return Array.isArray(data.accounts) && Array.isArray(data.categories) && Array.isArray(data.transactions) && Array.isArray(data.shifts) && Array.isArray(data.payroll) && data.accounts.every((item) => item && typeof item.id === "string" && typeof item.name === "string" && Number.isFinite(item.openingBalance)) && data.transactions.every((item) => item && typeof item.id === "string" && Number.isFinite(item.amount) && item.amount > 0); }
export function readFinance(session: BusinessSession): FinanceData {
  const initial = defaults();
  try {
    const raw = localStorage.getItem(key(session.id));
    if (raw !== null) {
      const value: unknown = JSON.parse(raw);
      if (isData(value)) {
        if (session.id === "baku-beauty-demo") {
          const sample = sampleFinanceData();
          const reference = sample.payroll;
          const payroll = value.payroll.map((item) => {
            const seeded = reference.find((entry) => entry.id === item.id && entry.amount === item.amount && entry.staffId === item.staffId);
            return seeded && item.serviceTurnover === undefined ? { ...item, serviceTurnover: seeded.serviceTurnover, serviceRate: seeded.serviceRate, productSales: seeded.productSales, productRate: seeded.productRate } : item;
          });
          const transactions = value.transactions.map((item) => {
            const seeded = sample.transactions.find((entry) => entry.id === item.id && entry.title === item.title);
            return seeded && !item.time ? { ...item, time: seeded.time } : item;
          });
          if (payroll.some((item, index) => item !== value.payroll[index]) || transactions.some((item, index) => item !== value.transactions[index])) {
            const upgraded = { ...value, payroll, transactions };
            saveFinance(session.id, upgraded);
            return upgraded;
          }
        }
        // Upgrade only the untouched, previously empty sample account. Keep all edits.
        if (session.id === "baku-beauty-demo" && JSON.stringify(value) === JSON.stringify(initial)) {
          const seeded = sampleFinanceData();
          saveFinance(session.id, seeded);
          return seeded;
        }
        return value;
      }
    }
  } catch { /* Browser storage may be unavailable. */ }
  if (session.id === "baku-beauty-demo") {
    const seeded = sampleFinanceData();
    saveFinance(session.id, seeded);
    return seeded;
  }
  return initial;
}
export function saveFinance(sessionId: string, data: FinanceData): boolean { try { localStorage.setItem(key(sessionId), JSON.stringify(data)); return true; } catch { return false; } }
export function accountBalance(data: FinanceData, accountId: string): number { const account = data.accounts.find((item) => item.id === accountId); if (!account) return 0; return roundMoney(data.transactions.reduce((balance, item) => balance + (item.type === "income" && item.accountId === accountId ? item.amount : 0) - (item.type === "expense" && item.accountId === accountId ? item.amount : 0) - (item.type === "transfer" && item.accountId === accountId ? item.amount : 0) + (item.type === "transfer" && item.toAccountId === accountId ? item.amount : 0), account.openingBalance)); }
export function payrollPaid(data: FinanceData, payrollId: string): number { return roundMoney(data.transactions.filter((item) => item.payrollId === payrollId && item.type === "expense").reduce((sum, item) => sum + item.amount, 0)); }
export function canPost(data: FinanceData, entry: FinanceTransaction, replacingId?: string): string | null { const account = data.accounts.find((item) => item.id === entry.accountId); if (!account) return "Kassa seçin."; if (!Number.isFinite(entry.amount) || entry.amount <= 0) return "Məbləğ sıfırdan böyük olmalıdır."; if (entry.type === "transfer") { if (!data.accounts.some((item) => item.id === entry.toAccountId) || entry.toAccountId === entry.accountId) return "Fərqli hədəf kassa seçin."; } else if (!data.categories.some((item) => item.id === entry.categoryId && item.type === entry.type)) return "Uyğun kateqoriya seçin."; const base = replacingId ? { ...data, transactions: data.transactions.filter((item) => item.id !== replacingId) } : data; const candidate = { ...base, transactions: [entry, ...base.transactions] }; if (candidate.accounts.some((item) => accountBalance(candidate, item.id) < 0)) return "Əməliyyat nəticəsində kassa qalığı mənfi ola bilməz."; return null; }
export function localDate(): string { const date = new Date(); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
