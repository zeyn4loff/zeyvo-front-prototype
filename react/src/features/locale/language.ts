import { useSyncExternalStore } from "react";

export type Language = "az" | "ru" | "tr" | "en";
const storageKey = "zeyvo_customer_language";
const eventName = "zeyvo-language-change";
export const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: "az", label: "Azərbaycan", flag: "🇦🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

function readLanguage(): Language {
  try {
    const value = localStorage.getItem(storageKey);
    return value === "ru" || value === "tr" || value === "en" ? value : "az";
  } catch { return "az"; }
}

function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener(eventName, callback); window.removeEventListener("storage", callback); };
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribe, readLanguage, () => "az" as Language);
  function setLanguage(next: Language) {
    try { localStorage.setItem(storageKey, next); } catch { /* Keep the selection for this tab. */ }
    document.documentElement.lang = next;
    window.dispatchEvent(new Event(eventName));
  }
  return { language, setLanguage };
}

const translations = {
  catalog: ["Kataloq", "Каталог", "Katalog", "Catalog"],
  masters: ["Ustalar", "Мастера", "Uzmanlar", "Specialists"],
  partnersFor: ["Partnyorlar üçün", "Для партнёров", "İşletmeler için", "For businesses"],
  favorites: ["Seçilmişlər", "Избранное", "Favoriler", "Favorites"],
  bookings: ["Yazılarım", "Мои записи", "Randevularım", "My bookings"],
  login: ["Daxil ol", "Войти", "Giriş yap", "Log in"],
  register: ["Qeydiyyat", "Регистрация", "Kayıt ol", "Sign up"],
  heroStart: ["Xidmətləri tap", "Найдите услуги", "Hizmetleri bulun", "Find services"],
  heroEnd: [" və qəbul üçün müraciət et", " и запишитесь онлайн", " ve randevu alın", " and book an appointment"],
  searchPlaceholder: ["Xidmət, salon və ya usta...", "Услуга, салон или мастер...", "Hizmet, salon veya uzman...", "Service, salon or specialist..."],
  search: ["Axtar", "Найти", "Ara", "Search"],
  categories: ["Kateqoriyalar", "Категории", "Kategoriler", "Categories"],
  categoriesDescription: ["Xidmət üzrə mütəxəssislər və salonlar tapın", "Найдите специалистов и салоны по услугам", "Hizmete göre uzman ve salon bulun", "Find specialists and salons by service"],
  all: ["Hamısı", "Все", "Tümü", "All"],
  places: ["məkan", "мест", "mekân", "places"],
  onlineRequest: ["Onlayn müraciət edin, məkan təsdiqlədikdən sonra qəbula gedin", "Отправьте заявку онлайн и приходите после подтверждения", "Çevrimiçi başvurun, onaylandıktan sonra gidin", "Request online and visit after confirmation"],
  sort: ["Sıralama", "Сортировка", "Sıralama", "Sort"],
  popularity: ["Populyarlığa görə", "По популярности", "Popülerliğe göre", "Most popular"],
  rating: ["Reytinqə görə", "По рейтингу", "Puana göre", "Top rated"],
  price: ["Qiymətə görə", "По цене", "Fiyata göre", "By price"],
  selectedMasters: ["Seçilmiş mütəxəssislər", "Рекомендуемые специалисты", "Öne çıkan uzmanlar", "Featured specialists"],
  mastersDescription: ["Müştərilərin ən çox tövsiyə etdiyi peşəkarlar", "Специалисты, которых рекомендуют клиенты", "Müşterilerin önerdiği uzmanlar", "Specialists recommended by customers"],
  allMasters: ["Bütün ustalar", "Все мастера", "Tüm uzmanlar", "All specialists"],
  createAccount: ["Yeni hesab yarat", "Создать аккаунт", "Hesap oluştur", "Create account"],
  confirmPhone: ["Nömrəni təsdiqlə", "Подтвердить номер", "Numarayı doğrula", "Verify phone"],
  authDescription: ["Xidmətləri kəşf etmək və qəbullarınızı idarə etmək üçün mobil nömrənizdən istifadə edin.", "Используйте номер телефона для записи и управления визитами.", "Randevularınızı yönetmek için telefon numaranızı kullanın.", "Use your phone number to book and manage appointments."],
  fullName: ["Ad və soyad", "Имя и фамилия", "Ad ve soyad", "Full name"],
  phone: ["Mobil nömrə", "Номер телефона", "Telefon numarası", "Mobile number"],
  getCode: ["Kodu al", "Получить код", "Kod al", "Get code"],
  code: ["Təsdiq kodu", "Код подтверждения", "Doğrulama kodu", "Verification code"],
  verify: ["Təsdiqlə", "Подтвердить", "Doğrula", "Verify"],
  changeNumber: ["Nömrəni dəyiş", "Изменить номер", "Numarayı değiştir", "Change number"],
  localCodeNotice: ["WhatsApp ilə kod göndərilməsi hələ qoşulmayıb. Bu mərhələni yoxlamaq üçün yerli kod:", "Отправка через WhatsApp пока не подключена. Тестовый код:", "WhatsApp ile gönderim henüz bağlı değil. Test kodu:", "WhatsApp delivery is not connected yet. Local test code:"],
  phoneRequired: ["9 rəqəmli mobil nömrə daxil edin.", "Введите номер из 9 цифр.", "9 haneli telefon numarası girin.", "Enter a 9-digit phone number."],
  accountMissing: ["Bu nömrə ilə hesab tapılmadı. Qeydiyyat bölməsinə keçin.", "Аккаунт с этим номером не найден. Зарегистрируйтесь.", "Bu numarayla hesap bulunamadı. Kayıt olun.", "No account found for this number. Sign up first."],
  accountExists: ["Bu nömrə ilə hesab artıq mövcuddur. Daxil ol bölməsinə keçin.", "Аккаунт уже существует. Перейдите ко входу.", "Bu numarayla hesap zaten var. Giriş yapın.", "An account already exists. Log in instead."],
  nameRequired: ["Ad və soyadınızı daxil edin.", "Введите имя и фамилию.", "Adınızı ve soyadınızı girin.", "Enter your full name."],
  acceptTerms: ["Davam etmək üçün şərtləri qəbul edin.", "Примите условия, чтобы продолжить.", "Devam etmek için koşulları kabul edin.", "Accept the terms to continue."],
  expiredCode: ["Kodun vaxtı bitib. Yeni kod yaradın.", "Срок кода истёк. Получите новый.", "Kodun süresi doldu. Yeni kod alın.", "The code expired. Get a new one."],
  attemptLimit: ["Cəhd limiti doldu. Yeni kod yaradın.", "Превышено число попыток. Получите новый код.", "Deneme sınırına ulaşıldı. Yeni kod alın.", "Too many attempts. Get a new code."],
  wrongCode: ["Kod yanlışdır.", "Неверный код.", "Kod yanlış.", "Incorrect code."],
  saveFailed: ["Hesabı saxlamaq mümkün olmadı. Yenidən cəhd edin.", "Не удалось сохранить аккаунт. Повторите попытку.", "Hesap kaydedilemedi. Tekrar deneyin.", "Could not save the account. Try again."],
  termsIntro: ["Hesab yaratmaqla", "Создавая аккаунт, я принимаю", "Hesap oluşturarak", "By creating an account, I accept"],
  terms: ["Şərtlər", "Условия", "Koşullar", "Terms"],
  and: ["və", "и", "ve", "and"],
  privacy: ["Məxfilik", "Политику конфиденциальности", "Gizlilik", "Privacy Policy"],
  termsOutro: ["məlumatlarına razıyam.", "", "politikasını kabul ediyorum.", ""],
  more: ["Daha çox", "Ещё", "Daha fazla", "More"],
  less: ["Gizlət", "Скрыть", "Gizle", "Less"],
  startingAt: ["Başlayır", "От", "Başlangıç", "From"],
  addFavorite: ["Sevimlilərə əlavə et", "В избранное", "Favorilere ekle", "Add to favorites"],
  removeFavorite: ["Sevimlilərdən çıxar", "Убрать из избранного", "Favorilerden çıkar", "Remove from favorites"],
  details: ["ətraflı", "подробнее", "ayrıntılar", "details"],
  footerDescription: ["Azərbaycanda xidmətləri kəşf etmək və onlayn rezervasiya etmək üçün rəqəmsal platforma.", "Платформа для поиска услуг и онлайн-записи в Азербайджане.", "Azerbaycan'da hizmet keşfi ve çevrimiçi randevu platformu.", "Discover services and book appointments online in Azerbaijan."],
  forUsers: ["İstifadəçilərə", "Клиентам", "Müşteriler için", "For customers"],
  citySelection: ["Şəhər seçimi", "Выбор города", "Şehir seçimi", "Choose a city"],
  contact: ["Əlaqə", "Контакты", "İletişim", "Contact"],
  rights: ["Bütün hüquqlar qorunur.", "Все права защищены.", "Tüm hakları saklıdır.", "All rights reserved."],
} as const;

export type TranslationKey = keyof typeof translations;
const indexes: Record<Language, number> = { az: 0, ru: 1, tr: 2, en: 3 };
export function translate(language: Language, key: TranslationKey): string { return translations[key][indexes[language]]; }
export function useTranslations() {
  const { language } = useLanguage();
  return { language, t: (key: TranslationKey) => translate(language, key) };
}

const categoryNames: Record<string, [string, string, string, string]> = {
  beauty: ["Gözəllik & Baxım", "Красота и уход", "Güzellik ve bakım", "Beauty & care"],
  health: ["Sağlamlıq & Tibb", "Здоровье и медицина", "Sağlık ve tıp", "Health & medicine"],
  auto: ["Avto xidmətlər", "Автоуслуги", "Oto hizmetleri", "Auto services"],
  entertainment: ["Əyləncə & Asudə", "Развлечения и досуг", "Eğlence ve boş zaman", "Entertainment & leisure"],
  services: ["Məişət xidmətləri", "Бытовые услуги", "Ev hizmetleri", "Home services"],
  education: ["Təhsil & Kurslar", "Образование и курсы", "Eğitim ve kurslar", "Education & courses"],
  rent: ["İcarə & Kirayə", "Аренда", "Kiralama", "Rentals"],
  other: ["Digər xidmətlər", "Другие услуги", "Diğer hizmetler", "Other services"],
  sport: ["İdman & Fitnes", "Спорт и фитнес", "Spor ve fitness", "Sport & fitness"],
  animals: ["Zooxidmətlər & Baytarlıq", "Животные и ветеринария", "Evcil hayvanlar ve veteriner", "Pets & veterinary"],
  restaurants: ["Restoranlar & Kafe", "Рестораны и кафе", "Restoran ve kafe", "Restaurants & cafes"],
  style: ["Dizayn, Foto & Stil", "Дизайн, фото и стиль", "Tasarım, fotoğraf ve stil", "Design, photo & style"],
  lawyers: ["Hüquq & Notariat", "Юристы и нотариусы", "Hukuk ve noterlik", "Legal & notary"],
  hair: ["Saç kəsimi & Stil", "Стрижки и укладки", "Saç kesimi ve stil", "Haircuts & styling"],
  lashes: ["Qaş & Kirpik", "Брови и ресницы", "Kaş ve kirpik", "Brows & lashes"],
  barber: ["Kişi bərbəri", "Барбершоп", "Berber", "Barber"],
  cosmetology: ["Kosmetologiya & Dəri", "Косметология и кожа", "Kozmetoloji ve cilt", "Cosmetology & skin"],
  tattoo: ["Tatu studiyası", "Тату-студия", "Dövme stüdyosu", "Tattoo studio"],
  nails: ["Manikür & Pedikür", "Маникюр и педикюр", "Manikür ve pedikür", "Manicure & pedicure"],
  laser: ["Lazer epilyasiyası", "Лазерная эпиляция", "Lazer epilasyon", "Laser hair removal"],
  brows: ["Qaş dizaynı", "Оформление бровей", "Kaş tasarımı", "Brow styling"],
  makeup: ["Vizaj & Makiyaj", "Визаж и макияж", "Makyaj", "Makeup"],
  piercing: ["Pirsing & SPA", "Пирсинг и SPA", "Piercing ve SPA", "Piercing & SPA"],
};
export function categoryName(language: Language, id: string, fallback: string) {
  return categoryNames[id]?.[indexes[language]] ?? fallback;
}
