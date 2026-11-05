import type { BusinessSession } from "../auth/businessSession";
import { bookingKey, readBookings as readCustomerBookings } from "@/features/customer/customerStorage";

export type BookingStatus = "Gözlənilir" | "Təsdiqləndi" | "Gəldi" | "Xidmət göstərilir" | "Tamamlandı" | "Gəlmədi" | "Ləğv edildi";
export type BookingSource = "online" | "manual";

export interface Booking {
  id: string;
  clientId?: string;
  serviceId?: string;
  paymentMethod?: "cash" | "terminal" | "deposit" | "bonus";
  paymentAccountId?: string;
  businessId?: string;
  branchId?: string;
  customerEmail?: string;
  customerAccountKey?: string;
  clientName: string;
  phone: string;
  service: string;
  masterName: string;
  date: string;
  time: string;
  durationMinutes: number;
  price: number;
  status: BookingStatus;
  source: BookingSource;
  note: string;
}

const key = (sessionId: string) => `zeyvo_business_calendar_v1_${sessionId}`;

export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function addDays(dateText: string, days: number): string {
  const [year, month, day] = dateText.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return localDate(date);
}

function demoBookings(): Booking[] {
  const today = localDate();
  return [
    { id: "demo-online-1", clientName: "Nigar Rəhimova", phone: "+994 50 444-88-99", service: "Kişi saç kəsimi & stil", masterName: "Samir Əliyev", date: today, time: "14:30", durationMinutes: 45, price: 35, status: "Gözlənilir", source: "online", note: "Onlayn müraciət. Təsdiq gözləyir." },
    { id: "demo-online-2", clientName: "Aytən Kərimli", phone: "+994 55 777-33-22", service: "Nail Art & Shellac Gel", masterName: "Aygün Məmmədova", date: today, time: "16:00", durationMinutes: 60, price: 45, status: "Gözlənilir", source: "online", note: "Onlayn müraciət." },
    { id: "demo-confirmed-1", clientName: "Fidan Qasımova", phone: "+994 50 234-56-78", service: "Saç kəsimi & stil", masterName: "Samir Əliyev", date: today, time: "10:00", durationMinutes: 60, price: 35, status: "Təsdiqləndi", source: "manual", note: "" },
    { id: "demo-confirmed-2", clientName: "Aysel Quliyeva", phone: "+994 55 999-44-55", service: "Manikür & Shellac", masterName: "Aygün Məmmədova", date: addDays(today, 1), time: "11:00", durationMinutes: 60, price: 45, status: "Təsdiqləndi", source: "manual", note: "" },
  ];
}

function validBooking(value: unknown): value is Booking {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Booking>;
  return typeof item.id === "string" && typeof item.clientName === "string" && typeof item.date === "string" &&
    typeof item.time === "string" && typeof item.service === "string" && typeof item.masterName === "string" &&
    typeof item.durationMinutes === "number" && typeof item.price === "number" &&
    ["Gözlənilir", "Təsdiqləndi", "Gəldi", "Xidmət göstərilir", "Tamamlandı", "Gəlmədi", "Ləğv edildi"].includes(item.status ?? "");
}

export function readBookings(session: BusinessSession): Booking[] {
  try {
    const raw = localStorage.getItem(key(session.id));
    if (raw !== null) {
      const value: unknown = JSON.parse(raw);
      if (Array.isArray(value) && value.every(validBooking)) return value;
    }
  } catch { /* Browser storage may be unavailable. */ }
  return session.id === "baku-beauty-demo" ? demoBookings() : [];
}

export function saveBookings(sessionId: string, bookings: Booking[]): boolean {
  try {
    const previous = readBookings({ id: sessionId } as BusinessSession);
    localStorage.setItem(key(sessionId), JSON.stringify(bookings));
    const linked = previous.filter((item) => item.customerAccountKey || item.customerEmail);
    for (const item of bookings) if ((item.customerAccountKey || item.customerEmail) && !linked.some((old) => old.id === item.id)) linked.push(item);
    for (const item of linked) {
      const accountKey = item.customerAccountKey || item.customerEmail!;
      const current = bookings.find((next) => next.id === item.id);
      const customerBookings = readCustomerBookings(accountKey);
      if (!customerBookings.some((entry) => entry.id === item.id)) continue;
      localStorage.setItem(bookingKey(accountKey), JSON.stringify(customerBookings.map((entry) => entry.id === item.id
        ? { ...entry, status: current?.status === "Gəldi" || current?.status === "Xidmət göstərilir" ? "Təsdiqləndi" : current?.status === "Gəlmədi" ? "Ləğv edildi" : current?.status ?? "Ləğv edildi", date: current?.date ?? entry.date, time: current?.time ?? entry.time, masterName: current?.masterName ?? entry.masterName }
        : entry)));
    }
    window.dispatchEvent(new Event("zeyvo-customer-bookings-change"));
    window.dispatchEvent(new Event("zeyvo-business-bookings-change"));
    return true;
  }
  catch { return false; }
}

export function readPartnerBookings(ownerId: string, businessId: string, branchId?: string): Booking[] {
  const entries = readBookings({ id: ownerId } as BusinessSession);
  return entries.filter((item) => (item.businessId ?? (ownerId === "baku-beauty-demo" ? "biz_baku_beauty" : "")) === businessId && (!branchId || !item.branchId || item.branchId === branchId));
}

export function createOnlineBooking(ownerId: string, booking: Booking): boolean {
  const current = readBookings({ id: ownerId } as BusinessSession);
  try { localStorage.setItem(key(ownerId), JSON.stringify([booking, ...current])); window.dispatchEvent(new Event("zeyvo-business-bookings-change")); return true; }
  catch { return false; }
}

export function cancelOnlineBooking(ownerId: string, id: string): boolean {
  const next = readBookings({ id: ownerId } as BusinessSession).map((item) => item.id === id ? { ...item, status: "Ləğv edildi" as const } : item);
  try { localStorage.setItem(key(ownerId), JSON.stringify(next)); window.dispatchEvent(new Event("zeyvo-business-bookings-change")); return true; }
  catch { return false; }
}
