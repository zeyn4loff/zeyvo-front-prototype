import type { BusinessSession } from "../auth/businessSession";

export type LoyaltyTab = "cards_cashback" | "gift_cards" | "subscriptions";
export type LoyaltyStatus = "active" | "inactive";
export interface LoyaltyRule { id: string; name: string; type: "discount" | "cashback"; percent: number; target: "all" | "new"; status: LoyaltyStatus; minAmount?: number; durationDays?: number; color?: "slate" | "silver" | "amber" | "purple" | "emerald" | "rose" }
export interface GiftCard { id: string; name: string; type: "general" | "service"; nominal: number; salePrice: number; serviceName: string; availableForSale: boolean; status: LoyaltyStatus; serviceIds?: string[]; durationDays?: number; usageLimit?: number; allowPartial?: boolean; color?: string }
export interface IssuedGiftCard { id: string; templateId: string; code: string; clientId: string; issuedAt: string; initialBalance: number; balance: number; history: { id: string; date: string; amount: number; note: string; balanceAfter: number }[] }
export interface Subscription { id: string; name: string; visitsCount: number; price: number; validityDays: number; serviceNames: string; availableForSale: boolean; availableOnline: boolean; soldCount: number; status: LoyaltyStatus; serviceIds?: string[]; onlyAssignedServices?: boolean; rollover?: boolean; color?: string }
export interface LoyaltyProgram { enabled: boolean; cashbackPercent: number; pointValueAzn: number; maxPayPercent: number; expiryDays: number; welcomeBonus: number; birthdayBonus: number; reviewBonus: number }
export const defaultLoyaltyProgram: LoyaltyProgram = { enabled: true, cashbackPercent: 5, pointValueAzn: 1, maxPayPercent: 50, expiryDays: 180, welcomeBonus: 10, birthdayBonus: 15, reviewBonus: 0 };
export interface LoyaltyData { rules: LoyaltyRule[]; giftCards: GiftCard[]; subscriptions: Subscription[]; issuedGiftCards?: IssuedGiftCard[]; program?: LoyaltyProgram }
const key = (id: string) => `zeyvo_business_loyalty_demo_v1_${id}`;
const demo: LoyaltyData = {
  rules: [
    { id: "rule-1", name: "Yeni Müştəri Xoş Gəldin Endirimi", type: "discount", percent: 10, target: "new", status: "active", minAmount: 30, durationDays: 30, color: "rose" },
    { id: "rule-2", name: "Standart Keşbek Kartı", type: "cashback", percent: 5, target: "all", status: "active", minAmount: 0, durationDays: 0, color: "slate" },
    { id: "rule-3", name: "Gümüş Loyallıq Kartı", type: "cashback", percent: 7, target: "all", status: "active", minAmount: 50, durationDays: 180, color: "silver" },
    { id: "rule-4", name: "VIP Premium Endirim Kartı", type: "discount", percent: 15, target: "all", status: "active", minAmount: 100, durationDays: 365, color: "purple" },
  ],
  giftCards: [
    { id: "gift-1", name: "Standart Hədiyyə Kartı 50 ₼", type: "general", nominal: 50, salePrice: 50, serviceName: "", availableForSale: true, status: "active", durationDays: 90, allowPartial: true, color: "amber" },
    { id: "gift-2", name: "Premium Hədiyyə Kartı 100 ₼", type: "general", nominal: 100, salePrice: 90, serviceName: "", availableForSale: true, status: "active", durationDays: 180, allowPartial: true, color: "purple" },
    { id: "gift-3", name: "Spa və Saç Baxımı Hədiyyə Kartı", type: "service", nominal: 70, salePrice: 65, serviceName: "Spa saç baxımı", availableForSale: true, status: "active", durationDays: 60, usageLimit: 1, allowPartial: false, color: "emerald" },
    { id: "gift-4", name: "VIP Kompleks Baxım Kartı", type: "general", nominal: 200, salePrice: 180, serviceName: "", availableForSale: true, status: "active", durationDays: 365, allowPartial: true, color: "slate" },
    { id: "gift-5", name: "Ekspres Manikür Hədiyyə Kartı", type: "service", nominal: 30, salePrice: 30, serviceName: "Klassik manikür", availableForSale: false, status: "inactive", durationDays: 30, usageLimit: 1, allowPartial: false, color: "rose" },
  ],
  subscriptions: [
    { id: "sub-1", name: "Kişi Saç & Saqqal Paketi (5 ziyarət)", visitsCount: 5, price: 90, validityDays: 90, serviceNames: "Klassik saç kəsimi, Saqqal korreksiyası", availableForSale: true, availableOnline: true, soldCount: 14, status: "active", onlyAssignedServices: true, rollover: true, color: "purple" },
    { id: "sub-2", name: "Aylıq Manikür & Gel-lak Paketi", visitsCount: 4, price: 75, validityDays: 30, serviceNames: "Klassik manikür, Gel örtük", availableForSale: true, availableOnline: true, soldCount: 22, status: "active", onlyAssignedServices: true, rollover: false, color: "amber" },
    { id: "sub-3", name: "Premium Spa & Relax Masaj Kursu", visitsCount: 10, price: 320, validityDays: 180, serviceNames: "Aroma masaj, Relax bədən baxımı", availableForSale: true, availableOnline: false, soldCount: 8, status: "active", onlyAssignedServices: true, rollover: true, color: "emerald" },
    { id: "sub-4", name: "Keratin & Saç Bərpası Kompleksi", visitsCount: 3, price: 150, validityDays: 90, serviceNames: "Bütün bərbər və baxım xidmətləri", availableForSale: false, availableOnline: true, soldCount: 5, status: "inactive", onlyAssignedServices: false, rollover: false, color: "slate" },
  ],
};
function validData(value: unknown): value is LoyaltyData { if (!value || typeof value !== "object") return false; const item = value as Partial<LoyaltyData>; return Array.isArray(item.rules) && Array.isArray(item.giftCards) && Array.isArray(item.subscriptions); }
export function readLoyalty(session: BusinessSession): LoyaltyData {
  try {
    const raw = localStorage.getItem(key(session.id));
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (validData(parsed)) {
        if (session.id !== "baku-beauty-demo") return parsed;
        return {
          ...parsed,
          rules: parsed.rules.map((item) => {
            const sample = demo.rules.find((rule) => rule.id === item.id);
            return sample ? { ...sample, ...item, minAmount: item.minAmount ?? sample.minAmount, durationDays: item.durationDays ?? sample.durationDays, color: item.color ?? sample.color } : item;
          }),
          giftCards: parsed.giftCards.map((item) => {
            const sample = demo.giftCards.find((card) => card.id === item.id);
            return sample ? { ...sample, ...item, durationDays: item.durationDays ?? sample.durationDays, usageLimit: item.usageLimit ?? sample.usageLimit, allowPartial: item.allowPartial ?? sample.allowPartial, color: item.color ?? sample.color } : item;
          }),
          subscriptions: parsed.subscriptions.map((item) => {
            const sample = demo.subscriptions.find((subscription) => subscription.id === item.id);
            return sample ? { ...sample, ...item, onlyAssignedServices: item.onlyAssignedServices ?? sample.onlyAssignedServices, rollover: item.rollover ?? sample.rollover, color: item.color ?? sample.color } : item;
          }),
        };
      }
    }
  } catch { /* Browser storage may be unavailable. */ }
  return session.id === "baku-beauty-demo" ? structuredClone(demo) : { rules: [], giftCards: [], subscriptions: [] };
}
export function saveLoyalty(id: string, data: LoyaltyData): boolean { try { localStorage.setItem(key(id), JSON.stringify(data)); return true; } catch { return false; } }
