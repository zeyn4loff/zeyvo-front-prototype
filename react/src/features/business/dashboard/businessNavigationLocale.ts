import type { Language } from "@/features/locale/language";
import type { BusinessSection } from "./BusinessSidebarNav";

const labels: Record<BusinessSection, Record<Language, string>> = {
  calendar: { az: "Qəbullar & Təqvim", ru: "Записи и календарь", tr: "Randevular ve takvim", en: "Bookings & calendar" },
  business: { az: "Biznes", ru: "Бизнес", tr: "İşletme", en: "Business" },
  resources: { az: "Resurslar", ru: "Ресурсы", tr: "Kaynaklar", en: "Resources" },
  products: { az: "Məhsullar", ru: "Товары", tr: "Ürünler", en: "Products" },
  staff: { az: "Ustalar və Heyət", ru: "Мастера и команда", tr: "Uzmanlar ve ekip", en: "Specialists & team" },
  services: { az: "Xidmətlər", ru: "Услуги", tr: "Hizmetler", en: "Services" },
  clients: { az: "Müştərilər", ru: "Клиенты", tr: "Müşteriler", en: "Clients" },
  loyalty: { az: "Loyallıq", ru: "Лояльность", tr: "Sadakat", en: "Loyalty" },
  marketing: { az: "Marketinq", ru: "Маркетинг", tr: "Pazarlama", en: "Marketing" },
  integrations: { az: "İnteqrasiyalar", ru: "Интеграции", tr: "Entegrasyonlar", en: "Integrations" },
  finance: { az: "Maliyyə & Kassa", ru: "Финансы и касса", tr: "Finans ve kasa", en: "Finance & cash" },
  profile: { az: "Profil", ru: "Профиль", tr: "Profil", en: "Profile" },
};

export function businessNavigationLabel(section: BusinessSection, language: Language) { return labels[section][language]; }
