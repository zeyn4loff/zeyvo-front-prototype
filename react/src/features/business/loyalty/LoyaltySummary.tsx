import { BookOpen, CheckCircle2, CreditCard, Gift, Globe2, Percent, ShoppingBag, Sparkles, UserRoundPlus, Zap } from "lucide-react";
import type { LoyaltyData, LoyaltyTab } from "./loyalty";

export default function LoyaltySummary({ tab, data }: { tab: LoyaltyTab; data: LoyaltyData }) {
  const metrics = tab === "cards_cashback" ? [
    { label: "Aktiv kartlar & qaydalar", value: data.rules.filter((x) => x.status === "active").length, unit: `/ ${data.rules.length} qayda`, detail: "İstifadəyə aktiv loyallıq proqramı", icon: CreditCard, tone: "amber" },
    { label: "Endirim kartları", value: data.rules.filter((x) => x.type === "discount").length, unit: "kart", detail: "Birbaşa servis endirimi", icon: Percent, tone: "blue" },
    { label: "Keşbek (bonus) qaydaları", value: data.rules.filter((x) => x.type === "cashback").length, unit: "proqram", detail: "Çekdən toplanan keşbek balları", icon: Gift, tone: "emerald" },
    { label: "Yeni müştəri qaydaları", value: data.rules.filter((x) => x.target === "new").length, unit: "qayda", detail: "İlk gəliş üçün xüsusi imtiyaz", icon: UserRoundPlus, tone: "purple" },
  ] : tab === "gift_cards" ? [
    { label: "Aktiv hədiyyə kartları", value: data.giftCards.filter((x) => x.status === "active").length, unit: "ədəd", detail: "İstifadəyə hazır və aktiv kartlar", icon: CheckCircle2, tone: "emerald" },
    { label: "Ümumi kartlar", value: data.giftCards.filter((x) => x.type === "general").length, unit: "ədəd", detail: "Bütün xidmətlər üçün keçərli", icon: CreditCard, tone: "amber" },
    { label: "Xüsusi xidmət kartları", value: data.giftCards.filter((x) => x.type === "service").length, unit: "ədəd", detail: "Konkret xidmətlərə bağlı", icon: Zap, tone: "blue" },
    { label: "Satış üçün əlçatan", value: data.giftCards.filter((x) => x.availableForSale).length, unit: "ədəd", detail: "Satışda aktiv olan kart növləri", icon: ShoppingBag, tone: "purple" },
  ] : [
    { label: "Aktiv abunəliklər", value: data.subscriptions.filter((x) => x.status === "active").length, unit: "paket", detail: "İstifadəyə yararlı aktiv paketlər", icon: BookOpen, tone: "purple" },
    { label: "Satışda olan paketlər", value: data.subscriptions.filter((x) => x.availableForSale).length, unit: "paket", detail: "Adminlər tərəfindən satıla bilən", icon: ShoppingBag, tone: "amber" },
    { label: "Onlayn sifarişə açıq", value: data.subscriptions.filter((x) => x.availableOnline).length, unit: "paket", detail: "Onlayn qeydiyyatda əlçatan", icon: Globe2, tone: "emerald" },
    { label: "Cəmi satılan", value: data.subscriptions.reduce((sum, x) => sum + x.soldCount, 0), unit: "ədəd", detail: "Satılan abunəlik paketləri", icon: Sparkles, tone: "blue" },
  ];
  const tones: Record<string, string> = { amber: "bg-amber-50 text-amber-700", blue: "bg-blue-50 text-blue-700", emerald: "bg-emerald-50 text-emerald-700", purple: "bg-purple-50 text-purple-700" };
  return <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">{metrics.map(({ label, value, unit, detail, icon: Icon, tone }) => <article key={label} className="min-w-0 space-y-2 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5"><div className="flex items-start justify-between gap-2"><span className="text-xs font-semibold text-slate-500">{label}</span><span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}><Icon size={16} /></span></div><div><div className="font-mono text-xl font-bold leading-tight text-slate-900 sm:text-2xl">{value} <span className="font-sans text-xs font-semibold text-slate-500">{unit}</span></div><p className="mt-0.5 text-[11px] font-normal text-slate-400">{detail}</p></div></article>)}</div>;
}
