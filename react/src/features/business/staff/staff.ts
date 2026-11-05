import type { BusinessSession } from "../auth/businessSession";
import { readBusinesses } from "../directory/businesses";
export const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type Weekday = typeof weekdays[number];
export const dayLabels: Record<Weekday, string> = { mon: "Bazar ertəsi", tue: "Çərşənbə axşamı", wed: "Çərşənbə", thu: "Cümə axşamı", fri: "Cümə", sat: "Şənbə", sun: "Bazar" };
export interface Shift { enabled: boolean; start: string; end: string; breakStart?: string; breakEnd?: string }
export type WeekSchedule = Record<Weekday, Shift>;
export interface StaffRole { id: string; name: string; description: string; commission: number; isDefault: boolean }
export type StaffStatus = "active" | "vacation" | "inactive" | "dismissed";
export type StaffSalaryScheme = "commission" | "fixed_plus_commission" | "fixed" | "booth_rental";
export interface DismissalInfo { reason: string; date: string; docNo: string; note: string }
export type EmploymentEvent = { type: "dismissed"; date: string; reason: string; docNo: string; note: string } | { type: "rehire"; date: string; roleId: string; note: string };
export interface StaffScheduleException { id: string; date: string; available: boolean; start: string; end: string; note: string }
export interface StaffReview { id: string; author: string; rating: number; date: string; comment: string; reply: string }
export interface StaffMember { id: string; name: string; roleId: string; specialization: string; phone: string; email: string; branchId: string; status: StaffStatus; onlineBooking: boolean; onlineNote?: string; gender?: "female" | "male"; avatar?: string; salaryScheme?: StaffSalaryScheme; rentalType?: "daily" | "monthly"; rentalAmount?: number; rentalCardCommission?: number; permissionTemplate?: string; permissions?: Record<string, boolean>; serviceCommission: number; productCommission: number; fixedSalary: number; schedule: WeekSchedule; color: string; bio: string; rating?: number; reviewsCount?: number; scheduleExceptions?: StaffScheduleException[]; reviews?: StaffReview[]; dismissalInfo?: DismissalInfo | null; employmentHistory?: EmploymentEvent[] }
export interface StaffData { roles: StaffRole[]; members: StaffMember[] }
export function staffAvailableAt(member: StaffMember, dateText: string, time: string, durationMinutes: number) {
  const [year, month, day] = dateText.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return false;
  const dayKey = weekdays[(date.getDay() + 6) % 7];
  const exception = member.scheduleExceptions?.find((item) => item.date === dateText);
  const shift = exception ? { enabled: exception.available, start: exception.start, end: exception.end } : member.schedule[dayKey];
  if (!shift?.enabled) return false;
  const toMinutes = (value: string) => { const [hours, mins] = value.split(":").map(Number); return hours * 60 + mins; };
  return toMinutes(time) >= toMinutes(shift.start) && toMinutes(time) + durationMinutes <= toMinutes(shift.end);
}
const key = (id: string) => `zeyvo_business_staff_demo_v1_${id}`;
export function todayLocalDate(date = new Date()): string { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
export function dismissStaff(member: StaffMember, info: DismissalInfo): StaffMember { return { ...member, status: "dismissed", onlineBooking: false, dismissalInfo: info, employmentHistory: [...(member.employmentHistory ?? []), { type: "dismissed", ...info }] }; }
export function rehireStaff(member: StaffMember, details: { date: string; roleId: string; onlineBooking: boolean; note: string }): StaffMember { return { ...member, status: "active", roleId: details.roleId, onlineBooking: details.onlineBooking, dismissalInfo: null, employmentHistory: [...(member.employmentHistory ?? []), { type: "rehire", date: details.date, roleId: details.roleId, note: details.note }] }; }
export function defaultSchedule(start = "09:00", end = "19:00"): WeekSchedule { return Object.fromEntries(weekdays.map((day) => [day, { enabled: day !== "sun", start: day === "sat" && start === "09:00" ? "10:00" : start, end: day === "sat" && end === "19:00" ? "18:00" : end }])) as WeekSchedule; }
function demoData(): StaffData {
  return { roles: [
    { id: "role_stylist", name: "Top Stilist", description: "Saç kəsimi və stilləşdirmə", commission: 40, isDefault: true },
    { id: "role_nail", name: "Nail Master", description: "Manikür və pedikür", commission: 45, isDefault: true },
    { id: "role_barber", name: "Master Barber", description: "Kişi saç və saqqal xidməti", commission: 35, isDefault: true },
    { id: "role_colorist", name: "Kolorist / Kosmetoloq", description: "Saç boyama və dəri baxımı", commission: 45, isDefault: true },
  ], members: [
    { id: "st_1", name: "Samir Əliyev", roleId: "role_stylist", specialization: "Saç kəsimi & Stil", phone: "+994 50 234-56-78", email: "samir.aliyev@zeyvo.az", branchId: "br_bbs_1", status: "active", onlineBooking: true, serviceCommission: 40, productCommission: 10, fixedSalary: 0, schedule: defaultSchedule(), color: "#D0F482", bio: "10+ il peşəkar təcrübə.", rating: 4.95, reviewsCount: 142 },
    { id: "st_2", name: "Aygün Məmmədova", roleId: "role_nail", specialization: "Dırnaq servisi & Shellac", phone: "+994 55 345-67-89", email: "aygun.m@zeyvo.az", branchId: "br_bbs_1", status: "active", onlineBooking: true, serviceCommission: 45, productCommission: 12, fixedSalary: 0, schedule: defaultSchedule("10:00", "20:00"), color: "#EC4899", bio: "Aparat manikür və dırnaq incəsənəti üzrə mütəxəssis.", rating: 4.92, reviewsCount: 98 },
    { id: "st_3", name: "Kamran Bağırov", roleId: "role_barber", specialization: "Kişi saç və saqqal stilizasiyası", phone: "+994 70 876-54-32", email: "kamran.b@zeyvo.az", branchId: "br_bbs_1", status: "active", onlineBooking: true, serviceCommission: 35, productCommission: 10, fixedSalary: 500, schedule: { ...defaultSchedule("09:00", "20:00"), mon: { enabled: false, start: "09:00", end: "20:00" }, sun: { enabled: true, start: "10:00", end: "18:00" } }, color: "#3B82F6", bio: "Klassik və müasir barber sənəti.", rating: 4.88, reviewsCount: 115 },
    { id: "st_4", name: "Nigar Quliyeva", roleId: "role_colorist", specialization: "Saç boyama & Kosmetologiya", phone: "+994 51 654-98-70", email: "nigar.q@zeyvo.az", branchId: "br_bbs_2", status: "active", onlineBooking: true, serviceCommission: 45, productCommission: 15, fixedSalary: 0, schedule: { ...defaultSchedule("10:00", "19:00"), wed: { enabled: false, start: "10:00", end: "19:00" } }, color: "#10B981", bio: "AirTouch və Balayage üzrə mütəxəssis.", rating: 4.98, reviewsCount: 164 },
  ] };
}
function validData(value: unknown): value is StaffData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<StaffData>;
  return Array.isArray(data.roles) && data.roles.every((item) => item && typeof item.id === "string" && typeof item.name === "string" && Number.isFinite(item.commission)) && Array.isArray(data.members) && data.members.every((item) => item && typeof item.id === "string" && typeof item.name === "string" && typeof item.schedule === "object" && weekdays.every((day) => item.schedule?.[day] && typeof item.schedule[day].enabled === "boolean"));
}
function withIndividualMembers(session: BusinessSession, data: StaffData): StaffData {
  const solo = readBusinesses(session).filter((business) => business.type === "individual");
  const missing = solo.filter((business) => !data.members.some((member) => member.id === `solo_${business.id}`));
  if (!missing.length) return data;
  return { ...data, members: [...data.members, ...missing.map((business): StaffMember => {
    const hours = business.hours?.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
    const schedule = defaultSchedule(hours?.[1] ?? "10:00", hours?.[2] ?? "20:00");
    for (const day of weekdays) {
      const configured = business.scheduleDays?.[day];
      if (configured) schedule[day] = { enabled: !configured.isOff, start: configured.open, end: configured.close };
    }
    return { id: `solo_${business.id}`, name: business.name, roleId: "solo", specialization: business.category ?? "Fərdi usta", phone: business.phone ?? "", email: "", branchId: business.id, status: "active", onlineBooking: true, serviceCommission: 0, productCommission: 0, fixedSalary: 0, schedule, color: "#D0F482", bio: business.description ?? "", avatar: business.image || business.logo };
  })] };
}
export function readStaffData(session: BusinessSession): StaffData {
  try { const raw = localStorage.getItem(key(session.id)); if (raw !== null) { const value: unknown = JSON.parse(raw); if (validData(value)) {
    if (session.id !== "baku-beauty-demo") return withIndividualMembers(session, value);
    const demoRatings = new Map(demoData().members.map((member) => [member.id, { rating: member.rating, reviewsCount: member.reviewsCount }]));
    return withIndividualMembers(session, { ...value, members: value.members.map((member) => ({ ...demoRatings.get(member.id), ...member })) });
  } } } catch { /* Browser storage may be unavailable. */ }
  return withIndividualMembers(session, session.id === "baku-beauty-demo" ? demoData() : { roles: [], members: [] });
}
export function saveStaffData(id: string, data: StaffData) { try { localStorage.setItem(key(id), JSON.stringify(data)); window.dispatchEvent(new Event("zeyvo-marketplace-change")); return true; } catch { return false; } }
