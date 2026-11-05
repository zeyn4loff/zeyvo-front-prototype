import { showToast as setMessage } from "../../../components/common/toast";
import BusinessPagination from "../components/BusinessPagination";
import { useState } from "react";
import BusinessFilterButton from "../components/BusinessFilterButton";
import { BadgeCheck, Clock3, Megaphone, Plus, Search, Send, Ticket, TrendingUp, Zap } from "lucide-react";
import type { BusinessSession } from "../auth/businessSession";
import BusinessDeleteDialog from "../components/BusinessDeleteDialog";
import BusinessHeaderPortal from "../components/BusinessHeaderPortal";
import BusinessHeaderButton from "../components/BusinessHeaderButton";
import { BusinessTabButton, BusinessTabNav } from "../components/BusinessTabs";
import MarketingDialog from "./MarketingDialog";
import MarketingTable from "./MarketingTable";
import MarketingSegments from "./MarketingSegments";
import MarketingMetrics, { type MarketingMetric } from "./MarketingMetrics";
import MarketingFilterDialog from "./MarketingFilterDialog";
import MarketingReferral from "./MarketingReferral";
import { type Campaign, type MarketingTab, type Promo, type ReferralSettings } from "./marketing";
import PartnerReviewsPanel from "./PartnerReviewsPanel";
import { getPublicSalons, getPublicSpecialists, useMarketplaceRevision } from "@/features/marketplace/publicCatalog";
import { reviewSummary } from "@/features/marketplace/reviews";
import { useMarketing } from "./useMarketing";
const tabs: { id: MarketingTab; label: string }[] = [{ id: "campaigns", label: "Kampaniyalar və bildirişlər" }, { id: "promocodes", label: "Promokodlar" }, { id: "segments", label: "Müştəri seqmentləri" }, { id: "referral", label: "Referal proqramı" }, { id: "reviews", label: "Rəylər və reputasiya" }];
export default function BusinessMarketing({ session }: { session: BusinessSession }) {
  useMarketplaceRevision();
  const { data, update } = useMarketing(session);
  const [tab, setTab] = useState<MarketingTab>("campaigns");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [campaignType, setCampaignType] = useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Campaign | Promo | null | undefined>(undefined);
  const [campaignTarget, setCampaignTarget] = useState<Campaign["target"] | null>(null);
  const [deleting, setDeleting] = useState<Campaign | Promo | null>(null);
  const list: (Campaign | Promo)[] = tab === "campaigns" ? data.campaigns : tab === "promocodes" ? data.promos : [];
  const filtered = list.filter((item) => (status === "all" || item.status === status) && (type === "all" || ("channel" in item ? item.channel === type : item.discountType === type)) && (campaignType === "all" || ("channel" in item && item.type === campaignType)) && (!query.trim() || `${item.name} ${"code" in item ? item.code : item.message}`.toLocaleLowerCase("az-AZ").includes(query.toLocaleLowerCase("az-AZ").trim())));
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const shown = filtered.slice((Math.min(page, totalPages) - 1) * pageSize, Math.min(page, totalPages) * pageSize);
  const ownedSalons = getPublicSalons().filter((salon) => salon.partner?.ownerId === session.id);
  const ownedSalonIds = new Set(ownedSalons.map((salon) => salon.id));
  const segments = data.segments ?? [];
  const marketplaceReviewsCount = ownedSalons.reduce((sum, salon) => sum + salon.reviewsCount, 0) + getPublicSpecialists().filter((master) => master.salonId !== undefined && ownedSalonIds.has(master.salonId)).reduce((sum, master) => sum + reviewSummary(`master-${master.id}`).count, 0);
  const counts: Record<MarketingTab, number> = { campaigns: data.campaigns.filter((x) => x.status === "active").length, promocodes: data.promos.filter((x) => x.status === "active").length, segments: segments.length, referral: data.referral.referrers?.length ?? 0, reviews: marketplaceReviewsCount || data.reviews.length };
  function save(item: Campaign | Promo) { if ("message" in item) { const campaigns = data.campaigns.some((x) => x.id === item.id) ? data.campaigns.map((x) => x.id === item.id ? item : x) : [item, ...data.campaigns]; const ok = update({ ...data, campaigns }); setMessage(ok ? "Yadda saxlanıldı. Bildiriş göndərilmədi." : "Yadda saxlamaq mümkün olmadı."); return ok; } const promos = data.promos.some((x) => x.id === item.id) ? data.promos.map((x) => x.id === item.id ? item : x) : [item, ...data.promos]; const ok = update({ ...data, promos }); setMessage(ok ? "Yadda saxlanıldı." : "Yadda saxlamaq mümkün olmadı."); return ok; }
  function remove() { if (!deleting) return; const next = "message" in deleting ? { ...data, campaigns: data.campaigns.filter((x) => x.id !== deleting.id) } : { ...data, promos: data.promos.filter((x) => x.id !== deleting.id) }; setMessage(update(next) ? "Silindi." : "Silmək mümkün olmadı."); setDeleting(null); }
  function saveReferral(next: ReferralSettings) { setMessage(update({ ...data, referral: next }) ? "Referal qaydaları saxlanıldı." : "Yadda saxlamaq mümkün olmadı."); }
  const metrics: MarketingMetric[] = tab === "campaigns" ? [
    { title: "Hazır kampaniyalar", value: data.campaigns.filter((x) => x.status === "active").length, unit: "ədəd", detail: "Göndəriş üçün hazırlanıb", icon: Megaphone, tone: "purple" },
    { title: "Göndərilən bildirişlər", value: "—", unit: "", detail: "Göndəriş xidməti qoşulmayıb", icon: Send, tone: "slate" },
    { title: "Çatdırılma faizi", value: "—", unit: "", detail: "Göndəriş xidməti qoşulmayıb", icon: Send, tone: "slate" },
    { title: "Avtomatik kampaniyalar", value: data.campaigns.filter((x) => x.type === "automated").length, unit: "ədəd", detail: "Hazırlanmış avtomatik qaydalar", icon: Zap, tone: "amber" },
  ] : [
    { title: "Aktiv promokodlar", value: data.promos.filter((x) => x.status === "active").length, unit: "kod", detail: "İstifadəyə açıq kodlar", icon: Ticket, tone: "purple" },
    { title: "Cəmi istifadə", value: data.promos.reduce((sum, x) => sum + x.usedCount, 0), unit: "dəfə", detail: "Müştərilər tərəfindən tətbiq edilib", icon: BadgeCheck, tone: "emerald" },
    { title: "Maksimum limit", value: data.promos.reduce((sum, x) => sum + x.usageLimit, 0), unit: "ümumi", detail: "Müəyyən edilmiş ümumi kvota", icon: TrendingUp, tone: "blue" },
    { title: "Müddəti bitənlər", value: data.promos.filter((x) => x.status === "expired" || (x.endDate && x.endDate < new Date().toISOString().slice(0, 10))).length, unit: "kod", detail: "Vaxtı və ya limiti tamamlanıb", icon: Clock3, tone: "slate" },
  ];
  return <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-5 sm:px-7 sm:py-7">
    <BusinessHeaderPortal slot="subtitle">Kampaniyalar, bildirişlər, promokodlar, seqmentlər, referal və rəylər</BusinessHeaderPortal>
    {(tab === "campaigns" || tab === "promocodes") && <BusinessHeaderPortal slot="actions"><BusinessHeaderButton onClick={() => setEditing(null)}><Plus />{tab === "campaigns" ? "Yeni kampaniya" : "Yeni promokod"}</BusinessHeaderButton></BusinessHeaderPortal>}
    <BusinessTabNav label="Marketinq bölmələri">{tabs.map((x) => <BusinessTabButton key={x.id} active={tab === x.id} count={counts[x.id]} onClick={() => { setTab(x.id); setQuery(""); setStatus("all"); setType("all"); setPage(1); setMessage(""); }}>{x.label}</BusinessTabButton>)}</BusinessTabNav>

    {(tab === "campaigns" || tab === "promocodes") && <>{tab === "campaigns" && <p role="status" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">Bildiriş göndərişi qoşulmayıb. Kampaniyaları hazırlaya bilərsiniz, lakin mesajlar göndərilmir.</p>}<MarketingMetrics items={metrics} /><div className="space-y-3"><div className="flex min-w-0 gap-2"><label className="business-search-control flex h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 shadow-sm"><Search size={16} className="shrink-0 text-slate-400" /><input aria-label="Marketinq axtarışı" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder={tab === "campaigns" ? "Kampaniya adı və ya mətn ilə axtarın..." : "Promokod adı və ya təsviri ilə axtarın..."} className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none placeholder:text-slate-400" /></label><BusinessFilterButton onClick={() => setFilterOpen(true)} count={Number(status !== "all") + Number(type !== "all") + Number(campaignType !== "all")} /></div>{(query || status !== "all" || type !== "all" || campaignType !== "all") && <div className="flex flex-wrap items-center gap-2 text-[11px]"><span className="text-slate-400">Aktiv:</span>{query && <button type="button" onClick={() => setQuery("")} className="rounded-xl bg-slate-100 px-2.5 py-1">Axtarış: {query} ×</button>}{type !== "all" && <button type="button" onClick={() => setType("all")} className="rounded-xl bg-amber-50 px-2.5 py-1">{type} ×</button>}{campaignType !== "all" && <button type="button" onClick={() => setCampaignType("all")} className="rounded-xl bg-amber-50 px-2.5 py-1">{campaignType} ×</button>}{status !== "all" && <button type="button" onClick={() => setStatus("all")} className="rounded-xl bg-amber-50 px-2.5 py-1">{status} ×</button>}<button type="button" onClick={() => { setQuery(""); setStatus("all"); setType("all"); setCampaignType("all"); }} className="font-semibold text-rose-600 underline">Hamısını sıfırla</button></div>}</div><MarketingTable kind={tab} entries={shown} onEdit={setEditing} onDelete={setDeleting} onCopy={(code) => { void navigator.clipboard.writeText(code).then(() => setMessage("Kod kopyalandı.")).catch(() => setMessage("Kodu kopyalamaq mümkün olmadı.")); }} /><BusinessPagination totalItems={filtered.length} currentPage={page} pageSize={pageSize} onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} itemFromLabel={tab === "campaigns" ? "kampaniyadan" : "promokoddan"} onPageChange={setPage} /></>}
    {tab === "segments" && <MarketingSegments segments={segments} onCampaign={(segment) => { setCampaignTarget(segment.target); setEditing(null); }} />}
    {tab === "referral" && <MarketingReferral settings={data.referral} onSave={saveReferral} />}
    {tab === "reviews" && <PartnerReviewsPanel session={session} fallbackReviews={data.reviews} onChangeFallback={(reviews) => update({ ...data, reviews })} />}
    {filterOpen && <MarketingFilterDialog tab={tab} status={status} type={type} campaignType={campaignType} onApply={(next) => { setStatus(next.status); setType(next.type); setCampaignType(next.campaignType); setPage(1); setFilterOpen(false); }} onClose={() => setFilterOpen(false)} />}
    {editing !== undefined && <MarketingDialog key={`${tab}-${editing?.id ?? "new"}`} kind={(editing && "message" in editing) || campaignTarget || tab === "campaigns" ? "campaign" : "promo"} initialTarget={campaignTarget ?? undefined} item={editing} usedCodes={data.promos.map((x) => x.code)} onClose={() => { setEditing(undefined); setCampaignTarget(null); }} onSave={save} />}{deleting && <BusinessDeleteDialog name={deleting.name} onClose={() => setDeleting(null)} onDelete={remove} />}

  </main>;
}
