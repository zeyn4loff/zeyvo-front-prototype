import { showToast as setMessage } from "../../../components/common/toast";
import { useContext, useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { BusinessSession } from "../auth/businessSession";
import BusinessDeleteDialog from "../components/BusinessDeleteDialog";
import BusinessHeaderPortal from "../components/BusinessHeaderPortal";
import BusinessHeaderButton from "../components/BusinessHeaderButton";
import { BusinessTabButton, BusinessTabNav } from "../components/BusinessTabs";
import { BusinessHeaderContext } from "../components/businessHeaderContext";
import { readStaffData } from "../staff/staff";
import { AccountDialog, CategoryDialog, PayrollDialog, ShiftDialog, TransactionDialog, TransferDialog } from "./FinanceDialogs";
import { accountBalance, canPost, localDate, payrollPaid, roundMoney, type FinanceAccount, type FinanceCategory, type FinanceData, type FinanceKind, type FinanceTab, type FinanceTransaction, type PayrollAccrual, type PayrollPaymentType, type ShiftFormValues } from "./finance";
import { FinanceAccountsView, FinanceTransactionsView, FinancePayrollView, FinanceCategoriesView, type FinanceDeleteTarget } from "./FinanceViews";
import { useFinance } from "./useFinance";
const tabs: { id: FinanceTab; label: string }[] = [{ id: "accounts", label: "Kassalar və Növbə" }, { id: "transactions", label: "Əməliyyatlar (Gəlir & Xərc)" }, { id: "payroll", label: "Maaş və Komissiya" }, { id: "categories", label: "Xərc kateqoriyaları" }];
export default function BusinessFinance({ session }: { session: BusinessSession }) {
  const { data, update } = useFinance(session);
  const { openPos } = useContext(BusinessHeaderContext);
  const staff = readStaffData(session).members;
  const [tab, setTab] = useState<FinanceTab>("accounts");
  const [accountDialog, setAccountDialog] = useState<FinanceAccount | null | undefined>(undefined);
  const [categoryDialog, setCategoryDialog] = useState<FinanceCategory | null | undefined>(undefined);
  const [categoryType, setCategoryType] = useState<FinanceCategory["type"]>("expense");
  const [transactionDialog, setTransactionDialog] = useState<FinanceTransaction | null | undefined>(undefined);
  const [transactionType, setTransactionType] = useState<FinanceKind>("income");
  const [transferSourceId, setTransferSourceId] = useState<string | undefined>();
  const [payrollDialog, setPayrollDialog] = useState<"accrue" | "pay" | null>(null);
  const [selectedPayrollId, setSelectedPayrollId] = useState<string | undefined>();
  const [shiftDialog, setShiftDialog] = useState<"open" | "close" | null>(null);
  const [deleting, setDeleting] = useState<FinanceDeleteTarget | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [accountFilter, setAccountFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const cashAccount = data.accounts.find((x) => x.type === "cash");
  const openShift = data.shifts.find((x) => !x.closedAt);
  const today = localDate();
  const todayTxs = data.transactions.filter((x) => x.date === today);
  const totalBalance = roundMoney(data.accounts.reduce((sum, x) => sum + accountBalance(data, x.id), 0));
  const transactions = [...data.transactions].filter((x) => (typeFilter === "all" || x.type === typeFilter) && (accountFilter === "all" || x.accountId === accountFilter || x.toAccountId === accountFilter) && (categoryFilter === "all" || x.categoryId === categoryFilter) && (!monthFilter || x.date.startsWith(monthFilter)) && (!search.trim() || `${x.title} ${x.counterparty} ${x.note}`.toLocaleLowerCase("az-AZ").includes(search.trim().toLocaleLowerCase("az-AZ")))).sort((a, b) => b.date.localeCompare(a.date) || (b.time ?? "").localeCompare(a.time ?? "") || b.id.localeCompare(a.id));
  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize));
  const shown = transactions.slice((Math.min(page, totalPages) - 1) * pageSize, Math.min(page, totalPages) * pageSize);
  function saved(next: FinanceData, success: string) { if (!update(next)) return "Brauzer yaddaşına yazmaq mümkün olmadı."; setMessage(success); return null; }
  function saveAccount(item: FinanceAccount) { if (!item.name) return "Kassa adını daxil edin."; if (!Number.isFinite(item.openingBalance) || item.openingBalance < 0) return "Başlanğıc qalıq mənfi ola bilməz."; if (data.accounts.some((x) => x.id !== item.id && x.name.toLocaleLowerCase("az-AZ") === item.name.toLocaleLowerCase("az-AZ"))) return "Bu adda kassa artıq var."; const next = { ...data, accounts: data.accounts.some((x) => x.id === item.id) ? data.accounts.map((x) => x.id === item.id ? item : x) : [...data.accounts, item] }; if (next.accounts.some((x) => accountBalance(next, x.id) < 0)) return "Dəyişiklikdən sonra kassa qalığı mənfi olar."; return saved(next, "Kassa yadda saxlanıldı."); }
  function saveCategory(item: FinanceCategory) { if (!item.name) return "Kateqoriya adını daxil edin."; if (data.categories.some((x) => x.id !== item.id && x.type === item.type && x.name.toLocaleLowerCase("az-AZ") === item.name.toLocaleLowerCase("az-AZ"))) return "Bu adda kateqoriya artıq var."; if (data.transactions.some((x) => x.categoryId === item.id && x.type !== item.type)) return "İstifadə olunan kateqoriyanın növünü dəyişmək olmaz."; const categories = data.categories.some((x) => x.id === item.id) ? data.categories.map((x) => x.id === item.id ? item : x) : [...data.categories, item]; return saved({ ...data, categories }, "Kateqoriya yadda saxlanıldı."); }
  function saveTransaction(item: FinanceTransaction) { if (!item.title || !item.date) return "Təyinat və tarix tələb olunur."; if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date)) return "Tarixi düzgün daxil edin."; const issue = canPost(data, item, data.transactions.some((x) => x.id === item.id) ? item.id : undefined); if (issue) return issue; const transactions = data.transactions.some((x) => x.id === item.id) ? data.transactions.map((x) => x.id === item.id ? item : x) : [item, ...data.transactions]; return saved({ ...data, transactions }, "Əməliyyat yadda saxlanıldı."); }
  function saveAccrual(item: PayrollAccrual) { if (!item.staffId || !item.period || !Number.isFinite(item.amount) || item.amount <= 0) return "Əməkdaş, ay və məbləği daxil edin."; if (data.payroll.some((x) => x.staffId === item.staffId && x.period === item.period)) return "Bu əməkdaş üçün həmin ayın maaşı artıq hesablanıb."; return saved({ ...data, payroll: [item, ...data.payroll] }, "Maaş hesablandı. Ödəniş ayrıca qeydə alınmalıdır."); }
  function payPayroll(payrollId: string, accountId: string, amount: number, date: string, note: string, paymentType: PayrollPaymentType) { const accrual = data.payroll.find((x) => x.id === payrollId); if (!accrual) return "Maaş hesabını seçin."; const due = roundMoney(accrual.amount - payrollPaid(data, payrollId)); const rounded = roundMoney(amount); if (!Number.isFinite(rounded) || rounded <= 0 || rounded > due) return "Məbləğ qalan borcdan böyük ola bilməz."; const category = data.categories.find((x) => x.id === "cat_exp_salary") ?? data.categories.find((x) => x.type === "expense"); if (!category) return "Xərc kateqoriyası yaradın."; const staffName = staff.find((x) => x.id === accrual.staffId)?.name ?? "Əməkdaş"; const entry: FinanceTransaction = { id: crypto.randomUUID(), date, type: "expense", accountId, toAccountId: "", categoryId: category.id, amount: rounded, title: `${paymentType === "advance" ? "Avans ödənişi" : paymentType === "bonus" ? "Bonus ödənişi" : "Maaş ödənişi"} (${staffName})`, counterparty: staffName, note, payrollId }; const issue = canPost(data, entry); if (issue) return issue; return saved({ ...data, transactions: [entry, ...data.transactions] }, "Maaş ödənişi xərc jurnalına yazıldı."); }
  function saveShift(values: ShiftFormValues) {
    if (!cashAccount) return "Əvvəlcə nağd kassa yaradın.";
    if (shiftDialog === "open") {
      if (openShift) return "Açıq növbə artıq var.";
      if (!values.cashier.trim()) return "Kassiri seçin.";
      if (!Number.isFinite(values.openingCash) || values.openingCash < 0) return "Açılış qalığı düzgün deyil.";
      const number = Math.max(104, ...data.shifts.map((shift) => shift.number ?? 0)) + 1;
      const shift = { id: crypto.randomUUID(), number, cashier: values.cashier.trim(), accountId: cashAccount.id, openedAt: new Date().toISOString(), openingCash: roundMoney(values.openingCash), closedAt: "", closingCash: 0, note: values.note.trim() };
      return saved({ ...data, shifts: [shift, ...data.shifts] }, `Növbə #${number} açıldı.`);
    }
    if (!openShift) return "Açıq növbə yoxdur.";
    if (!Number.isFinite(values.actualCash) || values.actualCash < 0) return "Faktiki nağd məbləğ düzgün deyil.";
    return saved({ ...data, shifts: data.shifts.map((shift) => shift.id === openShift.id ? { ...shift, closedAt: new Date().toISOString(), closingCash: roundMoney(values.actualCash), actualCash: roundMoney(values.actualCash), note: values.note.trim() || shift.note } : shift) }, "Növbə bağlandı və Z-hesabat təsdiqləndi.");
  }
  function remove() { if (!deleting) return; let next: FinanceData = data; if (deleting.kind === "account") { if (data.accounts.find((account) => account.id === deleting.id)?.isDefault || deleting.id === "acc_cash") { setMessage("Əsas kassa silinə bilməz."); setDeleting(null); return; } if (accountBalance(data, deleting.id) !== 0 || data.transactions.some((x) => x.accountId === deleting.id || x.toAccountId === deleting.id) || data.shifts.some((x) => x.accountId === deleting.id)) { setMessage("Qalığı olan, əməliyyatda və ya növbədə istifadə olunan kassa silinə bilməz."); setDeleting(null); return; } next = { ...data, accounts: data.accounts.filter((x) => x.id !== deleting.id) }; } else if (deleting.kind === "category") { if (data.transactions.some((x) => x.categoryId === deleting.id) || (deleting.id === "cat_exp_salary" && data.payroll.length > 0)) { setMessage("Əməliyyatda və ya maaş hesabında istifadə olunan kateqoriya silinə bilməz."); setDeleting(null); return; } next = { ...data, categories: data.categories.filter((x) => x.id !== deleting.id) }; } else if (deleting.kind === "payroll") { if (data.transactions.some((x) => x.payrollId === deleting.id)) { setMessage("Ödənişi olan maaş hesabı silinə bilməz."); setDeleting(null); return; } next = { ...data, payroll: data.payroll.filter((x) => x.id !== deleting.id) }; } else { const tx = data.transactions.find((x) => x.id === deleting.id); if (tx?.payrollId) { setMessage("Maaş ödənişi bu ekranda silinə bilməz."); setDeleting(null); return; } next = { ...data, transactions: data.transactions.filter((x) => x.id !== deleting.id) }; if (next.accounts.some((x) => accountBalance(next, x.id) < 0)) { setMessage("Bu əməliyyatı silmək kassa qalığını mənfi edər."); setDeleting(null); return; } } saved(next, "Silindi."); setDeleting(null); }
  const badge = (id: FinanceTab) => id === "accounts" ? data.accounts.length : id === "transactions" ? data.transactions.length : id === "payroll" ? data.payroll.length : data.categories.length;
  return <main className="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:px-7 sm:py-7"><BusinessHeaderPortal slot="subtitle">Hesab qalıqları, kassa növbəsi və maliyyə əməliyyatları</BusinessHeaderPortal><BusinessHeaderPortal slot="actions">{tab === "accounts" && <BusinessHeaderButton onClick={openPos}><ShoppingBag />Kassa satışı (POS)</BusinessHeaderButton>}</BusinessHeaderPortal><BusinessTabNav label="Maliyyə bölmələri">{tabs.map((item) => <BusinessTabButton key={item.id} active={tab === item.id} count={badge(item.id)} onClick={() => { setTab(item.id); setMessage(""); }}>{item.label}</BusinessTabButton>)}</BusinessTabNav>
    {tab === "accounts" && <FinanceAccountsView data={data} totalBalance={totalBalance} todayTxs={todayTxs} openShift={openShift} cashAccount={cashAccount} onOpenPos={openPos} onTransfer={(accountId) => { setTransferSourceId(accountId); setTransactionType("transfer"); setTransactionDialog(null); }} setShiftDialog={setShiftDialog} setAccountDialog={setAccountDialog} setDeleting={setDeleting} />}
    {tab === "transactions" && <FinanceTransactionsView data={data} reportEmail={session.email} transactions={transactions} shown={shown} totalPages={totalPages} page={page} pageSize={pageSize} setPageSize={setPageSize} search={search} typeFilter={typeFilter} accountFilter={accountFilter} categoryFilter={categoryFilter} monthFilter={monthFilter} setPage={setPage} setSearch={setSearch} setTypeFilter={setTypeFilter} setAccountFilter={setAccountFilter} setCategoryFilter={setCategoryFilter} setMonthFilter={setMonthFilter} setTransactionType={setTransactionType} setTransactionDialog={setTransactionDialog} setDeleting={setDeleting} />}
    {tab === "payroll" && <FinancePayrollView data={data} staff={staff} setPayrollDialog={setPayrollDialog} setSelectedPayrollId={setSelectedPayrollId} setDeleting={setDeleting} />}
    {tab === "categories" && <FinanceCategoriesView data={data} setCategoryType={setCategoryType} setCategoryDialog={setCategoryDialog} setDeleting={setDeleting} onViewTransactions={(categoryId) => { setCategoryFilter(categoryId); setPage(1); setTab("transactions"); }} />}
    {accountDialog !== undefined && <AccountDialog key={accountDialog?.id ?? "new-account"} account={accountDialog} data={data} onClose={() => setAccountDialog(undefined)} onSave={saveAccount} />}{categoryDialog !== undefined && <CategoryDialog key={categoryDialog?.id ?? "new-category"} category={categoryDialog} defaultType={categoryType} onClose={() => setCategoryDialog(undefined)} onSave={saveCategory} />}{transactionDialog !== undefined && (transactionDialog?.type === "transfer" || (!transactionDialog && transactionType === "transfer") ? <TransferDialog key={transactionDialog?.id ?? `new-transfer-${transferSourceId ?? "all"}`} entry={transactionDialog} initialAccountId={transferSourceId} data={data} onClose={() => setTransactionDialog(undefined)} onSave={saveTransaction} /> : <TransactionDialog key={transactionDialog?.id ?? `new-${transactionType}`} entry={transactionDialog} initialType={transactionType} data={data} onClose={() => setTransactionDialog(undefined)} onSave={saveTransaction} />)}{payrollDialog && <PayrollDialog key={payrollDialog} mode={payrollDialog} initialPayrollId={selectedPayrollId} data={data} staff={staff} onClose={() => setPayrollDialog(null)} onAccrue={saveAccrual} onPay={payPayroll} />}{shiftDialog && cashAccount && <ShiftDialog mode={shiftDialog} accountId={cashAccount.id} data={data} staff={staff} onClose={() => setShiftDialog(null)} onSave={saveShift} />}{deleting && <BusinessDeleteDialog name={deleting.name} onClose={() => setDeleting(null)} onDelete={remove} />}
  </main>;
}
