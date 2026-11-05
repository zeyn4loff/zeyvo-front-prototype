export type BusinessNotification = {
  id: string;
  title: string;
  message: string;
  date: string;
  kind: "booking" | "review" | "schedule";
  read: boolean;
};

const KEY = "zeyvo_business_notifications_read_v1";
const sampleNotifications: Omit<BusinessNotification, "read">[] = [
  { id: "booking-nigar", title: "Yeni qəbul", message: "Nigar Quliyeva sabah saat 11:00 üçün qəbul yazdı.", date: "03.11.2026 · 09:20", kind: "booking" },
  { id: "review-samir", title: "Yeni rəy", message: "Samir Əliyevin xidməti üçün 5 ulduzlu rəy əlavə edildi.", date: "02.11.2026 · 16:45", kind: "review" },
  { id: "schedule-aygun", title: "İş qrafiki dəyişdi", message: "Aygün Məmmədovanın şənbə növbəsi yeniləndi.", date: "02.11.2026 · 10:15", kind: "schedule" },
];

function readIds(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch { return []; }
}

export function readBusinessNotifications(email: string): BusinessNotification[] {
  if (email.trim().toLocaleLowerCase() !== "admin@bakubeauty.az") return [];
  const read = new Set(readIds());
  return sampleNotifications.map((item) => ({ ...item, read: read.has(item.id) }));
}

export function markBusinessNotificationRead(id: string): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify([...new Set([...readIds(), id])]));
    return true;
  } catch { return false; }
}
