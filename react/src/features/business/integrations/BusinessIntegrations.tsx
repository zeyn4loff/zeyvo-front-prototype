import { showToast as setMessage } from "../../../components/common/toast";
import { useState } from "react";
import { Check, Link2, Search, Star } from "lucide-react";
import type { BusinessSession } from "../auth/businessSession";
import BusinessHeaderPortal from "../components/BusinessHeaderPortal";
import { BusinessTabButton, BusinessTabNav } from "../components/BusinessTabs";
import IntegrationDialog from "./IntegrationDialog";
import { useIntegrations } from "./useIntegrations";
import IntegrationLogo from "./IntegrationLogo";

const integration = {
  name: "Whatsapp by Wamingo",
  description: "Qəbul təsdiqi, avtomatik xatırlatma və xidmətdən sonra rəy sorğusu üçün WhatsApp bildirişlərini idarə edin.",
  features: ["Avtomatik qəbul xatırlatması", "Müştəri təsdiq bildirişi", "Fərdiləşdirilmiş şablonlar"],
};

type DialogTab = "connect" | "reviews";

function WhatsAppMarketplaceCard({ reviewCount, rating, onOpen }: { reviewCount: number; rating: string | null; onOpen: (tab: DialogTab) => void }) {
  return <article className="flex min-w-0 flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm sm:p-6">
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <IntegrationLogo />
        <div className="flex flex-wrap items-center gap-1.5"><span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Pulsuz</span><span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">Qoşulmayıb</span></div>
      </div>
      <div><h2 className="text-sm font-bold leading-tight text-slate-900 sm:text-base">{integration.name}</h2><p className="mt-0.5 text-[11px] font-medium text-slate-400">Mesencerlər · Wamingo</p></div>
      <p className="text-xs leading-relaxed text-slate-600">{integration.description}</p>
      <div className="flex items-center justify-between gap-2 text-xs"><div className="flex items-center gap-1.5 text-slate-700"><Star size={14} className="text-amber-500" fill={rating ? "currentColor" : "none"} /><span className="font-semibold">{rating ?? "—"}</span><button type="button" onClick={() => onOpen("reviews")} className="cursor-pointer text-slate-500 underline underline-offset-2 hover:text-slate-900">({reviewCount} rəy)</button></div><span className="text-[11px] text-slate-400">0 ₼</span></div>
      <ul className="space-y-1 border-t border-slate-100 pt-3">{integration.features.map((feature) => <li key={feature} className="flex items-center gap-1.5 text-[11px] text-slate-600"><Check size={13} className="shrink-0 text-emerald-600" />{feature}</li>)}</ul>
    </div>
    <div className="flex gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={() => onOpen("connect")} className="flex min-h-10 min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-brand-primary px-3 text-xs font-bold text-slate-900 hover:bg-lime-400"><Link2 size={15} />Qoşulma statusu</button><button type="button" onClick={() => onOpen("reviews")} className="min-h-10 cursor-pointer rounded-xl bg-slate-100 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-200">Rəy</button></div>
  </article>;
}

export default function BusinessIntegrations({ session }: { session: BusinessSession }) {
  const { data, update } = useIntegrations(session);
  const [category, setCategory] = useState<"all" | "notifications">("all");
  const [query, setQuery] = useState("");
  const [dialogTab, setDialogTab] = useState<DialogTab | null>(null);
  const ratedReviews = data.reviews.filter((review) => review.rating > 0);
  const rating = ratedReviews.length ? (ratedReviews.reduce((sum, review) => sum + review.rating, 0) / ratedReviews.length).toFixed(1) : null;
  const visible = integration.name.toLocaleLowerCase("az-AZ").includes(query.trim().toLocaleLowerCase("az-AZ"));

  function save(next: typeof data) {
    const saved = update(next);
    setMessage(saved ? "Ayarlar yadda saxlanıldı." : "Yadda saxlamaq mümkün olmadı.");
    return saved;
  }

  return <main className="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:px-7 sm:py-7">
    <BusinessHeaderPortal slot="subtitle">İnteqrasiyalar kataloqu və bağlantı ayarları</BusinessHeaderPortal>
    <BusinessTabNav label="İnteqrasiya bölmələri"><BusinessTabButton active={category === "all"} count={1} onClick={() => setCategory("all")}>Bütün xidmətlər</BusinessTabButton><BusinessTabButton active={category === "notifications"} count={1} onClick={() => setCategory("notifications")}>Bildirişlər</BusinessTabButton></BusinessTabNav>
    <label className="business-search-control flex min-h-11 w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 shadow-sm focus-within:border-slate-400"><Search size={17} className="shrink-0 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="İnteqrasiya axtar" placeholder="İnteqrasiya axtar..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
    {visible ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><WhatsAppMarketplaceCard reviewCount={data.reviews.length} rating={rating} onOpen={setDialogTab} /></div> : <section className="flex min-h-56 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-8 text-center shadow-sm sm:min-h-64 sm:py-10"><span className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Search size={23} strokeWidth={1.8} /></span><h2 className="mt-3 text-base font-bold text-slate-900">İnteqrasiya tapılmadı</h2><p className="mt-1 max-w-sm text-sm text-slate-500">Axtarış sözünü dəyişin və yenidən yoxlayın.</p></section>}
    {dialogTab && <IntegrationDialog data={data} session={session} initialTab={dialogTab} onClose={() => setDialogTab(null)} onSave={save} />}
  </main>;
}
