import { useState } from "react";
import { CircleCheck, CircleDollarSign, Pencil, Search, TrendingUp, UsersRound } from "lucide-react";
import MarketingMetrics, { type MarketingMetric } from "./MarketingMetrics";
import BusinessFormDialog from "../components/BusinessFormDialog";
import BusinessPagination from "../components/BusinessPagination";
import type { ReferralSettings } from "./marketing";

export default function MarketingReferral({ settings, onSave }: { settings: ReferralSettings; onSave: (settings: ReferralSettings) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(settings);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState("");
  const people = settings.referrers ?? [];
  const shown = people.filter((person) => `${person.clientName} ${person.code} ${person.phone}`.toLocaleLowerCase("az-AZ").includes(query.trim().toLocaleLowerCase("az-AZ")));
  const totalInvited = people.reduce((sum, person) => sum + person.invitedCount, 0);
  const totalSuccessful = people.reduce((sum, person) => sum + person.successfulCount, 0);
  const totalBonus = people.reduce((sum, person) => sum + person.earnedBonus, 0);
  const metrics: MarketingMetric[] = [
    { title: "Cəmi dəvətlər", value: totalInvited, unit: "nəfər", detail: "Dost linki ilə göndərilib", icon: UsersRound, tone: "purple" },
    { title: "Uğurlu qəbullar", value: totalSuccessful, unit: "müştəri", detail: "Salona gəlib xidmət aldı", icon: CircleCheck, tone: "emerald", valueClassName: "text-emerald-700" },
    { title: "Ödənilmiş bonuslar", value: `${totalBonus.toFixed(2)} ₼`, unit: "", detail: "Dəvət edənlərin balansına köçürüldü", icon: CircleDollarSign, tone: "blue" },
    { title: "Dönüşüm nisbəti", value: `${totalInvited ? Math.round(totalSuccessful / totalInvited * 100) : 0}%`, unit: "", detail: "Dəvətin real müştəriyə çevrilməsi", icon: TrendingUp, tone: "amber" },
  ];

  function save() {
    if (draft.referrerReward < 1 || draft.refereeDiscount < 1 || draft.refereeDiscount > 100 || draft.minOrder < 0) {
      setError("Dəyərləri düzgün daxil edin.");
      return;
    }
    onSave(draft);
    setEditing(false);
    setError("");
  }

  return <div className="space-y-6">
    <section className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-white shadow-xs md:flex-row md:items-center">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${settings.enabled ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-300" : "border-rose-500/30 bg-rose-500/20 text-rose-300"}`}>{settings.enabled ? "Proqram aktivdir" : "Deaktivdir"}</span>
          <h3 className="text-sm font-bold sm:text-base">«Dostunu gətir» referal proqramı</h3>
        </div>
        <p className="text-xs text-slate-300">Dəvət edən müştəri: <strong className="font-mono text-brand-primary">{settings.referrerReward.toFixed(2)} ₼ bonus</strong> • Dəvət olunan dost: <strong className="font-mono text-brand-primary">{settings.refereeDiscount}% endirim</strong> (Min. sifariş: {settings.minOrder.toFixed(0)} ₼)</p>
      </div>
      <button type="button" onClick={() => { setDraft(settings); setEditing(true); }} className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-2 self-start rounded-xl bg-brand-primary px-4 text-xs font-bold text-slate-900 md:self-auto"><Pencil size={14} /> Qaydaları redaktə et</button>
    </section>

    <MarketingMetrics items={metrics} />

    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:p-5">
        <div><h4 className="text-sm font-bold text-slate-900">Fəal referal müştərilər</h4><p className="text-xs text-slate-400">Dostlarını ən çox salona dəvət edən müştərilərin siyahısı</p></div>
        <label className="flex h-9 w-full min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 sm:w-64"><Search size={16} className="shrink-0 text-slate-400" /><input aria-label="Referal axtarışı" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Müştəri adı və ya kod ilə axtarış..." className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none" /></label>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[750px] text-left text-xs text-slate-600">
          <thead className="bg-slate-50 font-semibold text-slate-500"><tr>
            <th className="whitespace-nowrap px-4 py-3 sm:px-5">Müştəri</th>
            <th className="whitespace-nowrap px-4 py-3">Referal kodu</th>
            <th className="whitespace-nowrap px-4 py-3">Dəvət sayı</th>
            <th className="whitespace-nowrap px-4 py-3">Uğurlu qəbul</th>
            <th className="whitespace-nowrap px-4 py-3">Qazanılan bonus</th>
            <th className="whitespace-nowrap px-4 py-3 text-right sm:px-5">Son dəvət</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {shown.slice((page - 1) * pageSize, page * pageSize).map((person) => <tr key={person.id} className="hover:bg-slate-50/70">
              <td className="px-4 py-3.5 sm:px-5"><strong className="block text-xs text-slate-900">{person.clientName}</strong><span className="font-mono text-[11px] font-normal text-slate-400">{person.phone}</span></td>
              <td className="px-4 py-3.5"><span className="inline-flex rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono font-bold text-slate-800">{person.code}</span></td>
              <td className="px-4 py-3.5 font-mono font-bold text-slate-900">{person.invitedCount} nəfər</td>
              <td className="px-4 py-3.5"><span className="inline-flex rounded border border-emerald-200/60 bg-emerald-50 px-2 py-0.5 font-mono font-bold text-emerald-700">{person.successfulCount} nəfər</span></td>
              <td className="px-4 py-3.5 font-mono font-bold text-slate-900">{person.earnedBonus.toFixed(2)} ₼</td>
              <td className="px-4 py-3.5 text-right sm:px-5">{person.lastInviteDate}</td>
            </tr>)}
            {shown.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-xs text-slate-400">Axtarışa uyğun referal tapılmadı</td></tr>}
          </tbody>
        </table>
      </div>
      <BusinessPagination totalItems={shown.length} currentPage={page} pageSize={pageSize} onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} itemFromLabel="müştəridən" onPageChange={setPage} />
    </section>

    {editing && <BusinessFormDialog title="Referal Proqramı Qaydaları" description="«Dostunu gətir» bonus və endirim şərtləri" size="compact" mobileSheet onClose={() => setEditing(false)}>
      <form onSubmit={(event) => { event.preventDefault(); save(); }} className="space-y-4 text-xs">
        <label className="block space-y-1 font-bold text-slate-700"><span>Proqram vəziyyəti</span><select value={String(draft.enabled)} onChange={(event) => setDraft({ ...draft, enabled: event.target.value === "true" })} className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 font-semibold text-slate-900 focus:border-black focus:bg-white focus:outline-none"><option value="true">Proqram aktivdir</option><option value="false">Proqram deaktivdir</option></select></label>
        {([
          ["referrerReward", "Dəvət edən müştəriyə bonus (₼)", "Dostu ilk dəfə xidmət alanda balansına əlavə edilir", 1, 0.5],
          ["refereeDiscount", "Dəvət olunan dostuna ilk endirim (%)", "İlk sifarişində tətbiq olunacaq endirim faizi", 1, 1],
          ["minOrder", "Minimum sifariş məbləği (₼)", "", 0, 1],
        ] as const).map(([key, label, hint, min, step]) => <label key={key} className="block space-y-1 font-bold text-slate-700"><span>{label}</span><input type="number" required min={min} max={key === "refereeDiscount" ? 100 : undefined} step={step} value={draft[key]} onChange={(event) => setDraft({ ...draft, [key]: Number(event.target.value) })} className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 font-mono font-bold text-slate-900 focus:border-black focus:bg-white focus:outline-none" />{hint && <span className="block text-[11px] font-normal text-slate-400">{hint}</span>}</label>)}
        {error && <p role="alert" className="text-xs text-rose-600">{error}</p>}
        <div className="flex justify-end gap-2.5 border-t border-slate-100 pt-3"><button type="button" onClick={() => setEditing(false)} className="h-10 rounded-xl bg-slate-100 px-4 font-bold">Ləğv et</button><button type="submit" className="h-10 rounded-xl bg-brand-primary px-4 font-bold">Yadda saxla</button></div>
      </form>
    </BusinessFormDialog>}
  </div>;
}
