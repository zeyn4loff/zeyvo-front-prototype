import { CreditCard, DollarSign, Minus, Plus, Star } from "lucide-react";
import type { Booking } from "../calendar/bookings";
import { balance, latestVisit, totalVisits, type Client } from "./clients";
import type { DepositDirection } from "./ClientBalanceDialog";
import { clientBox } from "./clientProfileStyles";

const money = (value: number) => `${value.toFixed(2)} ₼`;
const dateText = (value: string) => value?.slice(0, 10).split("-").reverse().join(".") || "—";

export default function ClientStatsSection({ client, spent, staffName, bookings, onDeposit }: {
  client: Client;
  spent: number;
  staffName: string;
  bookings: Booking[];
  onDeposit: (direction: DepositDirection) => void;
}) {
  const visits = totalVisits(client);
  const deposit = balance(client, "deposit");
  const depositEntries = client.ledger.filter((entry) => entry.account === "deposit");
  const services = Object.values(client.visits.reduce<Record<string, { name: string; count: number; amount: number }>>((result, visit) => {
    const item = result[visit.service] ?? { name: visit.service, count: 0, amount: 0 };
    item.count += 1;
    item.amount += visit.amount;
    result[visit.service] = item;
    return result;
  }, {})).sort((a, b) => b.count - a.count).slice(0, 4);
  const datedVisits = client.visits.map((visit) => new Date(visit.date).getTime()).filter(Number.isFinite).sort((a, b) => a - b);
  const averageDays = datedVisits.length > 1 ? Math.round((datedVisits.at(-1)! - datedVisits[0]) / 86400000 / (datedVisits.length - 1)) : 0;
  const canceled = bookings.filter((booking) => booking.status === "Ləğv edildi").length;
  const attended = visits + canceled ? Math.round(visits / (visits + canceled) * 100) : 0;

  return <div className="mt-4 space-y-4 text-xs">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[
      ["Cəmi dövriyyə (LTV)", money(spent), "Bütün dövr üzrə xərclənən"],
      ["Ziyarət sayı", `${visits} qəbul`, "Tamamlanmış xidmət"],
      ["Orta çek (AOV)", money(visits ? spent / visits : 0), "Bir ziyarətə düşən məbləğ"],
      ["Sonuncu ziyarət", dateText(latestVisit(client)), "Son qeyd edilən qəbul"],
    ].map(([title, value, detail], index) => <div key={title} className={`${clientBox} space-y-1`}><span className="text-[11px] font-semibold text-slate-500">{title}</span><strong className={`block break-words font-mono font-bold ${index === 3 ? "text-sm" : "text-lg"} ${index === 2 ? "text-amber-800" : "text-slate-900"}`}>{value}</strong><span className="text-[10px] text-slate-400">{detail}</span></div>)}</div>

    <section className={`${clientBox} space-y-4`}><div className="flex items-start justify-between gap-2"><div><h3 className="flex items-center gap-2 font-bold text-slate-900"><CreditCard size={16} className="text-emerald-600" />Depozit hesabı və avans idarəetməsi</h3><p className="mt-0.5 text-[11px] text-slate-400">Müştərinin öncədən ödədiyi vəsaitlər və xidmət avansları</p></div><span className={`shrink-0 rounded-md border px-2 py-1 text-[11px] font-bold ${deposit > 0 ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-slate-100 text-slate-700"}`}>{deposit > 0 ? "Müsbət qalıq" : "Sıfır balans"}</span></div>
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"><div><span className="text-[11px] text-slate-500">Cari depozit qalığı</span><strong className="mt-0.5 block font-mono text-2xl font-black text-emerald-700 sm:text-3xl">{money(deposit)}</strong><span className="mt-0.5 block text-[10px] text-slate-400">Xidmət və məhsul qəbullarında avtomatik çıxıla bilər</span></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => onDeposit("topup")} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-brand-primary px-4 font-bold"><Plus size={16} />Depoziti artır</button><button type="button" onClick={() => onDeposit("spend")} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 font-bold"><Minus size={16} />Depozitdən ödə</button></div></div>
      <div><div className="flex flex-wrap justify-between gap-2"><h4 className="font-bold">Son depozit hərəkətləri</h4><span className="text-[10px] text-slate-400">Cəmi: {depositEntries.length} əməliyyat</span></div>{depositEntries.length ? <div className="mt-2 overflow-x-auto"><table className="w-full min-w-[530px] text-left text-xs"><thead className="border-b border-slate-100 text-[11px] text-slate-400"><tr><th className="py-2">Tarix</th><th>Növ</th><th>Ödəniş üsulu</th><th>Təsvir / Qeyd</th><th className="text-right">Məbləğ</th></tr></thead><tbody>{depositEntries.slice(0, 10).map((entry) => <tr key={entry.id} className="border-b border-slate-100"><td className="py-2 font-mono">{dateText(entry.date)}</td><td>{entry.amount >= 0 ? "Mədaxil" : "Məxaric"}</td><td>{entry.method || "—"}</td><td>{entry.note || "Depozit əməliyyatı"}</td><td className={`text-right font-mono font-bold ${entry.amount >= 0 ? "text-emerald-700" : "text-rose-700"}`}>{entry.amount > 0 ? "+" : ""}{money(entry.amount)}</td></tr>)}</tbody></table></div> : <p className="mt-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-5 text-center text-slate-400">Depozit hesabı üzrə hərəkət qeydə alınmayıb.</p>}</div>
    </section>

    <div className="grid gap-3 md:grid-cols-2"><section className={`${clientBox} space-y-3`}><div className="flex items-center justify-between gap-2"><h3 className="flex items-center gap-2 font-bold"><DollarSign size={16} className="text-slate-600" />Ödəniş metodlarının payı</h3><span className="text-[10px] text-slate-400">Dövriyyə bölgüsü</span></div><p className="py-5 text-center text-slate-400">Ziyarət qeydlərində ödəniş üsulu göstərilməyib.</p></section><section className={`${clientBox} space-y-3`}><div className="flex items-center justify-between gap-2"><h3 className="flex items-center gap-2 font-bold"><Star size={16} className="text-amber-600" />Ən çox seçilən xidmətlər</h3><span className="text-[10px] text-slate-400">Üstünlüklər</span></div>{services.length ? services.map((item) => <div key={item.name} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-2.5"><div className="min-w-0"><strong className="block truncate">{item.name}</strong><span className="text-[10px] text-slate-400">{item.count} dəfə qəbul · {spent ? Math.round(item.amount / spent * 100) : 0}% dövriyyə</span></div><strong className="shrink-0 font-mono">{money(item.amount)}</strong></div>) : <p className="py-5 text-center text-slate-400">Xidmət statistikası hələ yoxdur.</p>}</section></div>

    <div className="grid gap-3 md:grid-cols-2"><section className={`${clientBox} space-y-2.5`}><h3 className="font-bold">Müştəri fəallığı və intizam göstəricisi</h3><dl className="space-y-2">{[["Ziyarət tezliyi", averageDays > 0 ? `Hər ${averageDays} gündən bir` : visits ? "Daimi aktiv qrafik" : "İlk ziyarət gözlənilir"], ["Qəbullara davamiyyət", `${attended}% gəliş (${canceled} ləğv)`], ["Sevimli mütəxəssis (usta)", staffName || "Təyin edilməyib"], ["İlk qeydiyyat tarixi", dateText(client.createdAt)]].map(([name, value]) => <div key={name} className="flex flex-wrap justify-between gap-2 border-b border-slate-100 py-1"><dt className="text-slate-500">{name}:</dt><dd className="font-semibold text-slate-900">{value}</dd></div>)}</dl></section><section className={`${clientBox} space-y-2`}><h3 className="font-bold">Qeydlər və fərdi tələblər</h3><p className="text-slate-600">{client.note || "Xüsusi qeyd əlavə edilməyib."}</p></section></div>
  </div>;
}
