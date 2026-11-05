import { useState, type Dispatch, type SetStateAction } from "react";
import { Plus, Search, Trash2, TrendingUp, Wallet, Clock3, CircleCheck } from "lucide-react";
import type { StaffMember } from "../staff/staff";
import BusinessPagination from "../components/BusinessPagination";
import { formatMoney, payrollPaid, type FinanceData } from "./finance";
import { type DeleteSetter } from "./FinanceViewShared";

type Props = {
  data: FinanceData;
  staff: StaffMember[];
  setPayrollDialog: Dispatch<SetStateAction<"accrue" | "pay" | null>>;
  setSelectedPayrollId: Dispatch<SetStateAction<string | undefined>>;
  setDeleting: DeleteSetter;
};

export function FinancePayrollView({ data, staff, setPayrollDialog, setSelectedPayrollId, setDeleting }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const accruals = data.payroll.filter((item) => {
    const member = staff.find((person) => person.id === item.staffId);
    return `${member?.name ?? ""} ${member?.specialization ?? ""} ${item.period} ${item.note}`.toLocaleLowerCase("az-AZ").includes(search.trim().toLocaleLowerCase("az-AZ"));
  });
  const totalTurnover = accruals.reduce((sum, item) => sum + (item.serviceTurnover ?? 0) + (item.productSales ?? 0), 0);
  const totalEarned = accruals.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = accruals.reduce((sum, item) => sum + payrollPaid(data, item.id), 0);
  const shown = accruals.slice((page - 1) * pageSize, page * pageSize);
  const stats = [
    { title: "Cəmi ustaların dövriyyəsi", value: totalTurnover, hint: "Xidmətlər və məhsul satışları", icon: TrendingUp, tone: "text-slate-900" },
    { title: "Hesablanmış komissiya", value: totalEarned, hint: "Ustaların ümumi qazancı", icon: Wallet, tone: "text-indigo-600" },
    { title: "Ödənilmiş avanslar", value: totalPaid, hint: "Kassadan verilən məbləğlər", icon: Clock3, tone: "text-amber-600" },
    { title: "Qalıq ödəniləcək", value: totalEarned - totalPaid, hint: "Ustaların xalis borcu", icon: CircleCheck, tone: "text-slate-900" },
  ];
  return <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map((stat) => <div key={stat.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"><div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold text-slate-500">{stat.title}</span><span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><stat.icon size={16} /></span></div><strong className={`mt-2 block break-words font-mono text-2xl font-black ${stat.tone}`}>{formatMoney(stat.value)}</strong><p className="mt-1 text-[11px] text-slate-400">{stat.hint}</p></div>)}</div>
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row"><label className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3"><Search size={16} className="shrink-0 text-slate-400" /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Usta adı və ya ixtisas üzrə axtarış..." aria-label="Maaş axtarışı" className="min-w-0 flex-1 bg-transparent text-xs outline-none" /></label><button type="button" onClick={() => { setSelectedPayrollId(undefined); setPayrollDialog("pay"); }} disabled={!data.payroll.some((item) => item.amount > payrollPaid(data, item.id))} className="flex min-h-11 items-center justify-center gap-1 rounded-xl bg-brand-primary px-4 text-xs font-bold disabled:opacity-40"><Plus size={16} />Maaş / Avans ödə</button><button type="button" onClick={() => setPayrollDialog("accrue")} disabled={!staff.length} className="min-h-11 rounded-xl bg-slate-100 px-4 text-xs font-bold disabled:opacity-40">Maaş hesabla</button></div>
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs"><div className="max-w-full overflow-x-auto"><table className="w-full min-w-[1100px] border-collapse text-left text-xs"><thead className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-500"><tr>{["Əməkdaş", "Xidmət dövriyyəsi", "Xidmət komissiyası", "Məhsul satışı", "Cəmi qazanılan", "Ödənilmiş avans", "Qalıq ödəniləcək", "Əməliyyat"].map((label) => <th key={label} scope="col" className="whitespace-nowrap px-4 py-3 font-bold">{label}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{shown.map((item) => { const member = staff.find((person) => person.id === item.staffId); const paid = payrollPaid(data, item.id); return <tr key={item.id} className="hover:bg-slate-50"><td className="px-4 py-3"><div className="flex items-center gap-2"><span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-bold">{member?.name?.charAt(0) ?? "?"}</span><span><strong className="block whitespace-nowrap">{member?.name ?? "Əməkdaş silinib"}</strong><small className="text-[11px] text-slate-400">{member?.specialization}</small></span></div></td><td className="whitespace-nowrap px-4 py-3 font-mono text-slate-700">{item.serviceTurnover === undefined ? "—" : formatMoney(item.serviceTurnover)}</td><td className="whitespace-nowrap px-4 py-3"><span className="rounded-md bg-slate-100 px-2 py-1 font-bold">{item.serviceRate === undefined ? "—" : `${item.serviceRate}%`}</span></td><td className="whitespace-nowrap px-4 py-3 font-mono text-slate-500">{item.productSales === undefined ? "—" : `${formatMoney(item.productSales)} (${item.productRate ?? 0}%)`}</td><td className="whitespace-nowrap px-4 py-3 font-mono font-bold text-indigo-600">{formatMoney(item.amount)}</td><td className="whitespace-nowrap px-4 py-3 font-mono text-amber-600">{formatMoney(paid)}</td><td className="whitespace-nowrap px-4 py-3 font-mono font-black">{formatMoney(item.amount - paid)}</td><td className="whitespace-nowrap px-4 py-3"><div className="flex items-center gap-1"><button type="button" onClick={() => { setSelectedPayrollId(item.id); setPayrollDialog("pay"); }} disabled={item.amount <= paid} className="min-h-9 rounded-xl bg-slate-100 px-3 font-bold disabled:opacity-40">Ödəniş et</button><button type="button" onClick={() => setDeleting({ kind: "payroll", id: item.id, name: `${item.period} maaş hesabı` })} aria-label={`${item.period} maaş hesabını sil`} className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:text-rose-700"><Trash2 size={16} /></button></div></td></tr>; })}{!shown.length && <tr><td colSpan={8} className="px-4 py-12 text-center text-slate-500">Heç bir usta tapılmadı</td></tr>}</tbody></table></div><BusinessPagination totalItems={accruals.length} currentPage={page} pageSize={pageSize} onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} itemFromLabel="əməkdaşdan" onPageChange={setPage} /></div>
  </div>;
}
