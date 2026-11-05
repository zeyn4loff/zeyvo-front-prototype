export const permissionGroups = [
  { title: "Təqvim və Qrafik", items: [["canViewAllCalendar", "Bütün salon təqviminə baxış"], ["canEditOthersBookings", "Başqalarının qəbullarını redaktə etmək"], ["canManageSchedule", "İş qrafikini və saatları dəyişmək"]] },
  { title: "Müştərilər və Əlaqə", items: [["canViewClientContacts", "Müştəri telefon nömrələrini görmək"], ["canExportClients", "Müştəri bazasını yükləmək (Excel / CSV)"]] },
  { title: "Kassa və Maliyyə", items: [["canCollectPayment", "Kassa və ödənişləri qəbul etmək"], ["canApplyDiscounts", "Fərdi endirim və promokod tətbiqi"], ["canViewRevenue", "Salonun gəlir və kassa hesabatları"], ["canViewStaffSalaries", "Digər ustaların maaşlarına baxış"]] },
  { title: "Kataloq və Anbar", items: [["canManageServices", "Xidmətlər kataloqunu idarə etmək"], ["canManageInventory", "Anbar və material qalıqlarını idarə etmək"]] },
] as const;

const all = permissionGroups.flatMap((group) => group.items.map(([id]) => id));
export const templates: Record<string, readonly string[]> = {
  specialist: [],
  senior: ["canViewAllCalendar", "canEditOthersBookings", "canManageSchedule", "canViewClientContacts", "canApplyDiscounts", "canManageInventory"],
  manager: all.filter((id) => id !== "canViewStaffSalaries"),
  owner: all,
};
export const roles = [
  { id: "specialist", label: "Usta", badge: "Usta", description: "Yalnız öz təqvimi, iş qrafiki və təyin olunmuş müştəriləri idarə edir." },
  { id: "senior", label: "Baş Usta", badge: "Baş Usta", description: "Öz qəbulları ilə yanaşı komandanın qrafikini və qəbullarını idarə edir." },
  { id: "manager", label: "Administrator", badge: "Administrator", description: "Bütün salon qəbulları, kassa, ödənişlər, endirimlər və müştəri bazasını idarə edir." },
  { id: "owner", label: "Tam İcazə", badge: "Tam İcazə", description: "Bütün bölmələr, maliyyə hesabatları, kassa və əməkhaqqı üzrə tam giriş hüququ." },
  { id: "custom", label: "Fərdi", badge: "Fərdi Rol", description: "Hüquqlar aşağıdakı siyahıdan fərdi qaydada seçilib." },
] as const;

export function normalizePermissions(input?: Record<string, boolean>) {
  const legacy: Record<string, string> = { canViewClientContacts: "canViewClients", canApplyDiscounts: "canApplyDiscount", canViewStaffSalaries: "canViewSalaries" };
  return Object.fromEntries(all.map((id) => [id, Boolean(input?.[id] ?? input?.[legacy[id]])]));
}

