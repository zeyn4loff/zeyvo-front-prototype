import type { BusinessSession } from "../auth/businessSession";
export type ServiceGender = "all" | "women" | "men" | "kids";
export type PriceType = "fixed" | "from" | "range";
export type ServiceFormat = "individual" | "combo" | "group";
export interface ServiceCategory { id: string; name: string; description: string; icon?: string }
export interface ServiceComboItem { serviceId: string; price: number; duration: number }
export interface ServiceOnlineSettings { minAdvanceHours: number; maxAdvanceDays: number; reminderEnabled: boolean; reminderHours: number; reminderText: string; onlineTitle?: string; imageUrls?: string[]; depositType?: "none" | "fixed" | "percent"; depositValue?: number; cancellationRule?: "free_2h" | "free_12h" | "free_24h" | "free_any" | "strict"; clientNote?: string; reviewRequestEnabled?: boolean; reviewRequestDays?: number; reviewRequestText?: string; repeatReminderEnabled?: boolean; repeatReminderDays?: number; repeatReminderText?: string }
export interface ServiceMaterialItem { productId: string; quantity: number }
export interface ServiceStaffOverride { price?: number; duration?: number; useCustomMaterials?: boolean; techCardId?: string; materials?: ServiceMaterialItem[] }
export interface ServiceTranslation { name: string; description: string }
export interface Service { id: string; businessId?: string; name: string; categoryId: string; description: string; price: number; priceMax: number; priceType: PriceType; duration: number; breakTime: number; bufferTime: number; gender: ServiceGender; format: ServiceFormat; isCombo?: boolean; capacity: number; staffIds: string[]; resourceIds: string[]; productIds: string[]; techCardId?: string; materialItems?: ServiceMaterialItem[]; comboIds: string[]; onlineBooking: boolean; comboItems?: ServiceComboItem[]; staffProductIds?: Record<string, string[]>; staffOverrides?: Record<string, ServiceStaffOverride>; onlineSettings?: ServiceOnlineSettings; translations?: Record<string, ServiceTranslation> }
export interface ServiceData { categories: ServiceCategory[]; services: Service[] }
const key = (id: string) => `zeyvo_business_services_demo_v1_${id}`;
export const genderLabels: Record<ServiceGender, string> = { all: "Hamısı", women: "Qadın", men: "Kişi", kids: "Uşaq" };
export const formatLabels: Record<ServiceFormat, string> = { individual: "Fərdi", combo: "Kompleks", group: "Qrup" };
export function formatPrice(service: Service): string { if (service.priceType === "from") return `${service.price} ₼+`; if (service.priceType === "range") return `${service.price}–${service.priceMax} ₼`; return `${service.price} ₼`; }
function seedService(id: string, name: string, categoryId: string, price: number, duration: number, gender: ServiceGender, staffIds: string[], options: Partial<Service> = {}): Service { return { id, name, categoryId, price, priceMax: price, priceType: "fixed", duration, gender, staffIds, description: "", format: "individual", capacity: 1, breakTime: 0, bufferTime: 0, resourceIds: [], productIds: [], comboIds: [], onlineBooking: true, ...options }; }
function demoData(): ServiceData { return { categories: [
  { id: "scat_hair", name: "Saç xidmətləri", description: "Saç kəsimi, boyama, forma və qulluq" },
  { id: "scat_nail", name: "Dırnaq servisi", description: "Manikür, pedikür və dırnaq dizaynı" },
  { id: "scat_skin", name: "Dəri & Kosmetologiya", description: "Dəri baxımı və kosmetoloji prosedurlar" },
  { id: "scat_massage", name: "Masaj & SPA", description: "Masaj və relaks terapiyalar" },
  { id: "scat_barber", name: "Barbershop", description: "Saç və saqqal xidmətləri" },
], services: [
  seedService("srv_1", "Kişi Saç Kəsimi & Stil", "scat_barber", 35, 45, "men", ["st_1", "st_3"], { description: "Klassik və müasir bərbər kəsimi, saç yuma və stilizasiya." }),
  seedService("srv_2", "Kral Təraşı & Saqqal Dizaynı", "scat_barber", 25, 30, "men", ["st_3"]),
  seedService("srv_3", "Qadın Saç Kəsimi & Fen", "scat_hair", 40, 60, "women", ["st_1", "st_4"], { priceType: "from" }),
  seedService("srv_4", "Saç Boyama & Balayage", "scat_hair", 130, 120, "women", ["st_4"], { priceType: "range", priceMax: 180 }),
  seedService("srv_5", "Aparat Manikür & Shellac Gel", "scat_nail", 45, 60, "women", ["st_2"]),
  seedService("srv_6", "Smart Pedikür Kompleks", "scat_nail", 55, 75, "all", ["st_2"]),
  seedService("srv_7", "Ultrasonik Üz Təmizlənməsi", "scat_skin", 70, 60, "all", ["st_4"]),
  seedService("srv_8", "Üz Masajı & Nəmləndirici Spa", "scat_skin", 50, 45, "women", ["st_4"], { onlineBooking: false }),
  seedService("srv_9", "Klassik Bədən Masajı", "scat_massage", 80, 60, "all", ["st_1"]),
  seedService("srv_10", "Uşaq Saç Kəsimi", "scat_hair", 20, 30, "kids", ["st_1", "st_3"]),
  seedService("srv_11", "Full Grooming Kompleksi (Saç + Saqqal)", "scat_barber", 35, 75, "men", ["st_1", "st_3"], { format: "combo", comboIds: ["srv_1", "srv_2"] }),
  seedService("srv_12", "Ekspress Konsultasiya & Stil Seçimi", "", 20, 20, "all", ["st_1", "st_4"]),
  seedService("srv_13", "Gözəllik Günü Paketi (Saç + Manikür)", "", 70, 120, "women", ["st_2", "st_4"], { format: "combo", comboIds: ["srv_3", "srv_5"], breakTime: 15, bufferTime: 15 }),
  seedService("srv_14", "Tam Üz Qulluğu Kompleksi (Təmizləmə + Masaj)", "scat_skin", 100, 105, "women", ["st_4"], { format: "combo", comboIds: ["srv_7", "srv_8"] }),
  seedService("srv_15", "Qrup Spa & Aromaterapiya Paketi", "scat_skin", 85, 90, "all", ["st_4"], { format: "group", capacity: 6 }),
  seedService("srv_gbl_1", "Kişi saç kəsimi + yuyulma", "scat_barber", 30, 45, "men", [], { businessId: "biz_grand_barber" }),
  seedService("srv_gbl_2", "Saqqal modelləşdirməsi", "scat_barber", 20, 30, "men", [], { businessId: "biz_grand_barber" }),
  seedService("srv_gbl_3", "Saç və saqqal kompleksi", "scat_barber", 45, 75, "men", [], { businessId: "biz_grand_barber", format: "combo", comboIds: ["srv_gbl_1", "srv_gbl_2"] }),
  seedService("srv_de_1", "Həkim müayinəsi və rentgen", "", 20, 30, "all", [], { businessId: "biz_dentestet" }),
  seedService("srv_de_2", "Diş daşlarının təmizlənməsi", "", 45, 45, "all", [], { businessId: "biz_dentestet" }),
  seedService("srv_de_3", "Diş ağardılması", "", 150, 60, "all", [], { businessId: "biz_dentestet" }),
] }; }
function validData(value: unknown): value is ServiceData { if (!value || typeof value !== "object") return false; const data = value as Partial<ServiceData>; return Array.isArray(data.categories) && data.categories.every((item) => item && typeof item.id === "string" && typeof item.name === "string") && Array.isArray(data.services) && data.services.every((item) => item && typeof item.id === "string" && typeof item.name === "string" && Number.isFinite(item.price) && Array.isArray(item.staffIds) && Array.isArray(item.resourceIds) && Array.isArray(item.productIds)); }
export function readServiceData(session: BusinessSession): ServiceData { try { const raw = localStorage.getItem(key(session.id)); if (raw !== null) { const value: unknown = JSON.parse(raw); if (validData(value)) {
  if (session.id !== "baku-beauty-demo") return value;
  const migrationKey = "zeyvo_seed_services_split_v1";
  if (localStorage.getItem(migrationKey)) return value;
  const additions = demoData().services.filter((item) => item.businessId && !value.services.some((existing) => existing.id === item.id));
  const migrated = { ...value, services: [...value.services, ...additions] };
  localStorage.setItem(key(session.id), JSON.stringify(migrated));
  localStorage.setItem(migrationKey, "1");
  return migrated;
} } } catch { /* Browser storage may be unavailable. */ } return session.id === "baku-beauty-demo" ? demoData() : { categories: [], services: [] }; }
export function saveServiceData(id: string, data: ServiceData): boolean { try { localStorage.setItem(key(id), JSON.stringify(data)); window.dispatchEvent(new Event("zeyvo-marketplace-change")); return true; } catch { return false; } }
