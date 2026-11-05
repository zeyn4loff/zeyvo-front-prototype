import type { BusinessSession } from "../auth/businessSession";
export type MarketingTab = "campaigns" | "promocodes" | "segments" | "referral" | "reviews";
export type Status = "active" | "inactive" | "draft" | "expired";
export interface Campaign { id: string; name: string; channel: "whatsapp" | "sms" | "email"; type: "automated" | "broadcast"; target: "all" | "vip" | "new" | "risk" | "birthdays"; message: string; schedule?: "auto" | "immediate" | "draft"; status: Status; sentCount?: number; deliveredCount?: number; convertedCount?: number; createdAt?: string }
export const campaignScheduleLabels = { auto: "Avtomatik qrafik", immediate: "Təsdiqdən sonra", draft: "Qaralama" } as const;
export interface Promo { id: string; name: string; code: string; discountType: "percent" | "fixed"; discountValue: number; minOrder: number; usageLimit: number; usedCount: number; startDate: string; endDate: string; status: Status; serviceScope?: "all" | "specific" }
export interface Referrer { id: string; clientName: string; phone: string; code: string; invitedCount: number; successfulCount: number; earnedBonus: number; lastInviteDate: string }
export interface ReferralSettings { enabled: boolean; referrerReward: number; refereeDiscount: number; minOrder: number; referrers?: Referrer[] }
export interface Review { id: string; clientName: string; phone?: string; serviceName: string; masterName?: string; rating: number; comment: string; reply: string; date: string; status: "published" | "hidden" }
export interface Segment { id: string; name: string; description: string; clientCount: number; avgCheck: number; totalRevenue: number; color: string; criteria: string; target: Campaign["target"] }
export interface MarketingData { campaigns: Campaign[]; promos: Promo[]; segments?: Segment[]; referral: ReferralSettings; reviews: Review[] }
export function marketingStatusLabel(item: Campaign | Promo) { return item.status === "expired" ? "Müddəti bitib" : item.status === "draft" ? "Qaralama" : item.status === "inactive" ? "Qeyri-aktiv" : "Aktiv"; }
const key = (id: string) => `zeyvo_business_marketing_demo_v1_${id}`;
const empty: MarketingData = { campaigns: [], promos: [], referral: { enabled: false, referrerReward: 10, refereeDiscount: 15, minOrder: 25 }, reviews: [] };
const demo: MarketingData = {
  campaigns: [
    { id: "campaign-1", name: "Ad günü təbriki və 15% hədiyyə endirimi", channel: "whatsapp", type: "automated", target: "birthdays", message: "Salam, {ad}! Ad gününüz mübarək! Sizə 15% endirim hədiyyə edirik.", status: "active", sentCount: 164, deliveredCount: 161, convertedCount: 38 },
    { id: "campaign-2", name: "45 gün gəlməyən müştərilərə xatırlatma", channel: "whatsapp", type: "automated", target: "risk", message: "Salam, {ad}! Sizi yenidən salonumuzda görmək istərdik.", status: "active", sentCount: 89, deliveredCount: 86, convertedCount: 19 },
    { id: "campaign-3", name: "Payız gözəllik kampaniyası - 20% kütləvi aksiya", channel: "sms", type: "broadcast", target: "all", message: "Zeyvo salonunda payız baxımı üçün xüsusi təkliflər.", status: "active", sentCount: 420, deliveredCount: 412, convertedCount: 76 },
    { id: "campaign-4", name: "Yeni qeydiyyatdan keçənlərə xoş gəldin bonusu", channel: "whatsapp", type: "automated", target: "new", message: "Salam, {ad}! Zeyvo ailəsinə xoş gəlmisiniz.", status: "active", sentCount: 54, deliveredCount: 54, convertedCount: 28 },
    { id: "campaign-5", name: "VIP müştərilər üçün qapalı Master-Class dəvəti", channel: "whatsapp", type: "broadcast", target: "vip", message: "VIP müştərilərimiz üçün yeni xidmətlər və xüsusi təkliflər.", status: "active", sentCount: 38, deliveredCount: 38, convertedCount: 22 },
    { id: "campaign-6", name: "Xidmətdən sonra rəy sorğusu və təşəkkür", channel: "sms", type: "automated", target: "all", message: "Ziyarətiniz üçün təşəkkür edirik! Rəyinizi bölüşün.", status: "active", sentCount: 310, deliveredCount: 304, convertedCount: 88 },
  ],
  promos: [
    { id: "promo-1", name: "Yay gözəllik kampaniyası", code: "ZEYVO20", discountType: "percent", discountValue: 20, minOrder: 40, usageLimit: 100, usedCount: 45, startDate: "2026-06-01", endDate: "2026-11-30", status: "active", serviceScope: "all" },
    { id: "promo-2", name: "İlk qəbul xüsusi təklifi", code: "WELCOME10", discountType: "fixed", discountValue: 10, minOrder: 25, usageLimit: 150, usedCount: 68, startDate: "2026-01-01", endDate: "2026-12-31", status: "active", serviceScope: "all" },
    { id: "promo-3", name: "Payız baxım kompleksi", code: "PAYIZ2026", discountType: "percent", discountValue: 15, minOrder: 35, usageLimit: 80, usedCount: 28, startDate: "2026-09-01", endDate: "2026-11-30", status: "active", serviceScope: "all" },
    { id: "promo-4", name: "VIP qapalı endirim", code: "VIPBEAUTY", discountType: "percent", discountValue: 25, minOrder: 70, usageLimit: 30, usedCount: 18, startDate: "2026-08-15", endDate: "2026-12-31", status: "active", serviceScope: "specific" },
    { id: "promo-5", name: "Avqust ayı endirim kodu", code: "SUMMEREND", discountType: "percent", discountValue: 10, minOrder: 20, usageLimit: 50, usedCount: 50, startDate: "2026-08-01", endDate: "2026-08-31", status: "expired", serviceScope: "all" },
  ],
  segments: [
    { id: "seg_vip", name: "VIP daimi müştərilər", description: "5+ ziyarət edən və ümumi xərci 300 ₼-dən çox olan sadiq müştərilər", clientCount: 38, avgCheck: 85, totalRevenue: 3230, color: "purple", criteria: "Ziyarət sayı ≥ 5 və Cəmi xərc ≥ 300 ₼", target: "vip" },
    { id: "seg_new", name: "Yeni müştərilər (Son 30 gün)", description: "Son 30 gündə ilk dəfə qeydiyyatdan keçib xidmət alanlar", clientCount: 46, avgCheck: 42, totalRevenue: 1932, color: "emerald", criteria: "İlk ziyarət son 30 gün ərzində", target: "new" },
    { id: "seg_inactive", name: "Passiv / Yatan müştərilər (45-90 gün)", description: "Son 45-90 gündür salona təşrif buyurmayan potensial qaytarılacaq müştərilər", clientCount: 29, avgCheck: 50, totalRevenue: 1450, color: "amber", criteria: "Son ziyarətdən 45-90 gün keçib", target: "risk" },
    { id: "seg_lost", name: "İtirilmiş müştərilər (90+ gün)", description: "Son 90 gündən çoxdur aktivliyi olmayan, xüsusi təklif tələb edən müştərilər", clientCount: 17, avgCheck: 48, totalRevenue: 816, color: "rose", criteria: "Son ziyarətdən 90 gündən çox keçib", target: "risk" },
    { id: "seg_high", name: "Yüksək çekli müştərilər", description: "Hər ziyarətində orta hesabla 80+ ₼ xərcləyən premium müştərilər", clientCount: 22, avgCheck: 110, totalRevenue: 2420, color: "blue", criteria: "Orta sifariş çeki ≥ 80 ₼", target: "vip" },
  ],
  referral: { enabled: true, referrerReward: 10, refereeDiscount: 15, minOrder: 25, referrers: [
    { id: "ref_1", clientName: "Nigar Quliyeva", phone: "+994 (50) 234-56-78", code: "NIGAR24", invitedCount: 8, successfulCount: 6, earnedBonus: 60, lastInviteDate: "2026-10-02" },
    { id: "ref_2", clientName: "Aygün Məmmədova", phone: "+994 (55) 345-67-89", code: "AYGUN10", invitedCount: 5, successfulCount: 4, earnedBonus: 40, lastInviteDate: "2026-09-29" },
    { id: "ref_3", clientName: "Samir Əliyev", phone: "+994 (70) 567-89-01", code: "SAMIR07", invitedCount: 4, successfulCount: 3, earnedBonus: 30, lastInviteDate: "2026-09-20" },
    { id: "ref_4", clientName: "Elnur Həsənov", phone: "+994 (51) 678-90-12", code: "ELNUR99", invitedCount: 2, successfulCount: 2, earnedBonus: 20, lastInviteDate: "2026-09-15" },
    { id: "ref_5", clientName: "Sevda Qasımova", phone: "+994 (50) 789-01-23", code: "SEVDA12", invitedCount: 2, successfulCount: 1, earnedBonus: 10, lastInviteDate: "2026-09-10" },
  ] },
  reviews: [
    { id: "rev_1", clientName: "Leyla Əliyeva", phone: "+994 (50) 111-22-33", serviceName: "Saç kəsimi və ukladka", masterName: "Aygün Rzayeva", rating: 5, comment: "Çox razı qaldım, saçım tam istədiyim kimi alındı! Salonun təmizliyi və münasibət də əla idi.", reply: "Dəyərli rəyiniz üçün təşəkkür edirik! Hər zaman yolunuzu gözləyirik.", date: "2026-10-03 16:40", status: "published" },
    { id: "rev_2", clientName: "Rəşad Məmmədov", phone: "+994 (55) 222-33-44", serviceName: "Saqqal korreksiyası", masterName: "Murad Qasımov", rating: 5, comment: "Peşəkar yanaşma, dəqiq vaxtında qəbul etdilər. Təşəkkürlər!", reply: "Təşəkkür edirik Rəşad bəy! Sizə xidmət etməkdən məmnunuq.", date: "2026-10-02 14:15", status: "published" },
    { id: "rev_3", clientName: "Günel İsmayılova", phone: "+994 (70) 333-44-55", serviceName: "Klassik manikür və gel-lak", masterName: "Nərmin Məmmədova", rating: 5, comment: "Dırnaqlarım çox səliqəli və keyfiyyətli oldu. Nərmin xanıma xüsusi təşəkkürlər!", reply: "Çox sağ olun Günel xanım, növbəti ziyarətinizdə görüşənədək!", date: "2026-09-30 18:20", status: "published" },
    { id: "rev_4", clientName: "Fərid Əhmədov", phone: "+994 (50) 444-55-66", serviceName: "Kişi saç kəsimi", masterName: "Kamran Əliyev", rating: 4, comment: "Ümumilikdə yaxşıdır, kəsim bəyənildi. Sadəcə 10 dəqiqə gözləməli oldum.", reply: "Gözləmə üçün üzr istəyirik Fərid bəy, iş qrafikimizi daha da optimallaşdırırıq.", date: "2026-09-28 11:30", status: "published" },
    { id: "rev_5", clientName: "Könül Babayeva", phone: "+994 (55) 555-66-77", serviceName: "Spa üz baxımı", masterName: "Zemfira Quliyeva", rating: 5, comment: "Möhtəşəm dincəldim, dərim parlaq və təravətli oldu. Hamıya tövsiyə edirəm!", reply: "", date: "2026-09-25 15:00", status: "published" },
  ],
};
function isData(value: unknown): value is MarketingData { if (!value || typeof value !== "object") return false; const data = value as Partial<MarketingData>; return Array.isArray(data.campaigns) && Array.isArray(data.promos) && Array.isArray(data.reviews) && !!data.referral; }
export function readMarketing(session: BusinessSession): MarketingData {
  try {
    const raw = localStorage.getItem(key(session.id));
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isData(parsed)) {
        if (session.id !== "baku-beauty-demo") return parsed;
        const reviewMigrationKey = `${key(session.id)}_reviews_v2`;
        const migrateReviews = !localStorage.getItem(reviewMigrationKey);
        const promoMigrationKey = `${key(session.id)}_promos_v2`;
        const migratePromo = !localStorage.getItem(promoMigrationKey);
        const expiredPromo = demo.promos.find((promo) => promo.id === "promo-5");
        const reviews = migrateReviews && parsed.reviews.length === 0 ? structuredClone(demo.reviews) : parsed.reviews.map((item) => { const sample = demo.reviews.find((review) => review.id === item.id); return sample ? { ...sample, ...item, serviceName: item.serviceName.includes(" · ") ? sample.serviceName : item.serviceName, phone: item.phone ?? sample.phone, masterName: item.masterName ?? sample.masterName } : item; });
        const migrated: MarketingData = { ...parsed, campaigns: parsed.campaigns.map((item) => { const sample = demo.campaigns.find((campaign) => campaign.id === item.id); return sample ? { ...sample, ...item, sentCount: item.sentCount ?? sample.sentCount, deliveredCount: item.deliveredCount ?? sample.deliveredCount, convertedCount: item.convertedCount ?? sample.convertedCount } : item; }), promos: migratePromo && expiredPromo && !parsed.promos.some((item) => item.id === expiredPromo.id) ? [...parsed.promos, structuredClone(expiredPromo)] : parsed.promos, segments: parsed.segments ?? structuredClone(demo.segments), referral: { ...parsed.referral, referrers: parsed.referral.referrers ?? structuredClone(demo.referral.referrers) }, reviews };
        if (migrateReviews || migratePromo || !parsed.segments || !parsed.referral.referrers) localStorage.setItem(key(session.id), JSON.stringify(migrated));
        if (migrateReviews) localStorage.setItem(reviewMigrationKey, "1");
        if (migratePromo) localStorage.setItem(promoMigrationKey, "1");
        return migrated;
      }
    }
  } catch { /* Storage may be unavailable. */ }
  return structuredClone(session.id === "baku-beauty-demo" ? demo : empty);
}
export function saveMarketing(id: string, data: MarketingData): boolean { try { localStorage.setItem(key(id), JSON.stringify(data)); return true; } catch { return false; } }
