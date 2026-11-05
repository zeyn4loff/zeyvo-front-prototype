import type { Dispatch, SetStateAction } from "react";
import { ArrowLeftRight, Banknote, Building2, CreditCard, LockKeyhole, Pencil, Plus, Trash2 } from "lucide-react";
import { accountBalance, accountTypes, formatMoney, type CashShift, type FinanceAccount, type FinanceData, type FinanceTransaction } from "./finance";
import { panel, type DeleteSetter } from "./FinanceViewShared";
import BusinessStatusBadge from "../components/BusinessStatusBadge";

type AccountsProps = {
  data: FinanceData;
  totalBalance: number;
  todayTxs: FinanceTransaction[];
  openShift: CashShift | undefined;
  cashAccount: FinanceAccount | undefined;
  onOpenPos: () => void;
  onTransfer: (accountId: string) => void;
  setShiftDialog: Dispatch<SetStateAction<"open" | "close" | null>>;
  setAccountDialog: Dispatch<SetStateAction<FinanceAccount | null | undefined>>;
  setDeleting: DeleteSetter;
};

const accountIcons = { cash: Banknote, pos: CreditCard, bank: Building2, safe: LockKeyhole };

export function FinanceAccountsView({ data, totalBalance, todayTxs, openShift, cashAccount, onOpenPos, onTransfer, setShiftDialog, setAccountDialog, setDeleting }: AccountsProps) {
  const income = todayTxs.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
  const expense = todayTxs.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
  const cashTurnover = todayTxs.filter((item) => item.type === "income" && item.accountId === cashAccount?.id).reduce((sum, item) => sum + item.amount, 0);
  const cardTurnover = todayTxs.filter((item) => item.type === "income" && data.accounts.find((account) => account.id === item.accountId)?.type === "pos").reduce((sum, item) => sum + item.amount, 0);
  return <>
    <section className={`${panel} p-0`} aria-label="Maliyyə xülasəsi">
      <div className="grid divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="px-4 py-3 sm:p-5"><p className="text-xs font-semibold text-slate-500">Ümumi qalıq</p><strong className="mt-0.5 block break-words text-xl font-bold tabular-nums text-slate-900 sm:mt-1 sm:text-2xl">{formatMoney(totalBalance)}</strong></div>
        <div className="grid grid-cols-2 gap-3 px-4 py-3 sm:col-span-2 sm:p-5"><div><p className="text-xs font-semibold text-slate-500">Bugünkü gəlir</p><strong className="mt-1 block break-words text-base font-bold tabular-nums text-emerald-700 sm:text-lg">+ {formatMoney(income)}</strong></div><div><p className="text-xs font-semibold text-slate-500">Bugünkü xərc</p><strong className="mt-1 block break-words text-base font-bold tabular-nums text-rose-700 sm:text-lg">− {formatMoney(expense)}</strong></div></div>
      </div>
    </section>

    <section className={`${panel} overflow-hidden p-0`}>
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">Kassa növbəsi</h3><BusinessStatusBadge tone={openShift ? "success" : "neutral"}>{openShift ? "Açıqdır" : "Bağlıdır"}</BusinessStatusBadge></div><p className="mt-1 text-xs text-slate-500">{openShift ? `Açılış: ${new Date(openShift.openedAt).toLocaleString("az-AZ")}` : "Növbə açılmayıb"}</p></div>
        <div className="flex w-full items-center gap-2 sm:w-auto"><button type="button" onClick={onOpenPos} className="min-h-11 flex-1 cursor-pointer rounded-xl bg-brand-primary px-3 py-2.5 text-xs font-bold sm:hidden">POS satış</button><button type="button" onClick={() => setShiftDialog(openShift ? "close" : "open")} disabled={!cashAccount} className={`min-h-11 flex-1 cursor-pointer rounded-xl px-3 py-2.5 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none sm:px-4 ${openShift ? "bg-rose-50 text-rose-700" : "bg-brand-primary"}`}>{openShift ? "Növbəni bağla" : "Növbəni aç"}</button></div>
      </div>
      {openShift && <details className="border-t border-slate-100"><summary className="cursor-pointer px-4 py-3 text-xs font-semibold text-slate-600 sm:px-5">Növbənin dövriyyəsinə bax · {formatMoney(cashTurnover + cardTurnover)}</summary><div className="grid grid-cols-2 border-t border-slate-100 sm:grid-cols-4">{[
        ["İlkin nağd qalıq", formatMoney(openShift.openingCash)],
        ["Nağd dövriyyə", `+ ${formatMoney(cashTurnover)}`],
        ["POS Terminal (Kart)", `+ ${formatMoney(cardTurnover)}`],
        ["Cəmi növbə dövriyyəsi", formatMoney(cashTurnover + cardTurnover)],
      ].map(([label, value]) => <div key={label} className="border-b border-r border-slate-100 p-3 sm:border-b-0 sm:p-4"><p className="text-xs text-slate-500">{label}</p><strong className="mt-1 block break-words text-sm sm:text-base">{value}</strong></div>)}</div></details>}
    </section>

    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-lg font-bold">Hesablar və kassalar</h3><p className="text-xs text-slate-500">Nağd kassalar, POS terminallar və bank hesabları</p></div><button type="button" onClick={() => setAccountDialog(null)} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold hover:bg-slate-200 sm:min-h-0"><Plus size={14} />Hesab əlavə et</button></div>
    <div className={`${panel} divide-y divide-slate-100 p-0`}>{data.accounts.map((account) => { const Icon = accountIcons[account.type]; return <article key={account.id} className="flex min-w-0 flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5"><div className="flex min-w-0 flex-1 items-start gap-3"><span className="shrink-0 rounded-xl bg-slate-50 p-2.5 text-slate-600"><Icon size={20} /></span><div className="min-w-0"><h4 className="break-words text-sm font-bold">{account.name}{(account.isDefault || account.id === "acc_cash") && <span className="ml-2 rounded bg-brand-primary/40 px-1.5 py-0.5 text-[10px]">Əsas</span>}</h4><p className="mt-0.5 break-words text-xs text-slate-500">{accountTypes[account.type]}{account.details ? ` · ${account.details}` : ""}</p></div></div><div className="flex items-center justify-between gap-3 sm:justify-end"><strong className="break-words text-base font-bold tabular-nums sm:mr-3">{formatMoney(accountBalance(data, account.id))}</strong><div className="flex shrink-0 items-center gap-1"><button type="button" onClick={() => onTransfer(account.id)} disabled={data.accounts.length < 2} aria-label={`${account.name} köçürmə`} className="flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"><ArrowLeftRight size={15} /><span className="hidden sm:inline">Köçür</span></button><button type="button" onClick={() => setAccountDialog(account)} aria-label={`${account.name} redaktə et`} className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><Pencil size={16} /></button>{!(account.isDefault || account.id === "acc_cash") && <button type="button" onClick={() => setDeleting({ kind: "account", id: account.id, name: account.name })} aria-label={`${account.name} sil`} className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-700"><Trash2 size={16} /></button>}</div></div></article>; })}</div>

  </>;
}
