import type { Booking } from "./bookings";

export type CalendarColorMode = "status" | "service" | "staff";
export interface CalendarAppearance { mode: CalendarColorMode; serviceColors: Record<string, string>; staffColors: Record<string, string> }

const defaults: CalendarAppearance = { mode: "status", serviceColors: {}, staffColors: {} };
const palette = ["#d8b4fe", "#93c5fd", "#6ee7b7", "#5eead4", "#fcd34d", "#f9a8d4", "#fdba74"];
const key = (sessionId: string) => `zeyvo_calendar_appearance_v1_${sessionId}`;

export function readCalendarAppearance(sessionId: string): CalendarAppearance {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(key(sessionId)) ?? "null");
    if (stored && typeof stored === "object") {
      const item = stored as Partial<CalendarAppearance>;
      if (["status", "service", "staff"].includes(item.mode ?? "")) return { mode: item.mode!, serviceColors: item.serviceColors ?? {}, staffColors: item.staffColors ?? {} };
    }
  } catch { /* Keep default colors when storage is unavailable. */ }
  return defaults;
}

export function saveCalendarAppearance(sessionId: string, appearance: CalendarAppearance) {
  try { localStorage.setItem(key(sessionId), JSON.stringify(appearance)); return true; }
  catch { return false; }
}

function fallback(value: string) {
  let hash = 0;
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

export function bookingColor(booking: Booking, appearance: CalendarAppearance) {
  if (appearance.mode === "service") return appearance.serviceColors[booking.service] ?? fallback(booking.service);
  if (appearance.mode === "staff") return appearance.staffColors[booking.masterName] ?? fallback(booking.masterName);
  return { "Gözlənilir": "#d8b4fe", "Təsdiqləndi": "#93c5fd", "Gəldi": "#facc15", "Xidmət göstərilir": "#fb923c", "Tamamlandı": "#5eead4", "Gəlmədi": "#cbd5e1", "Ləğv edildi": "#fda4af" }[booking.status];
}
