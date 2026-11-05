import type { Booking } from "./bookings";
import type { Service } from "../services/services";
import type { StaffMember } from "../staff/staff";
import { staffAvailableAt } from "../staff/staff";
import { resourceUnits, type Resource } from "../resources/resources";

const minutes = (value: string) => { const [hours, mins] = value.split(":").map(Number); return hours * 60 + mins; };

export function branchOpenAt(hours: string | undefined, date: string, time: string, duration: number): boolean {
  const day = new Date(`${date}T12:00:00`);
  if (!Number.isFinite(day.getTime()) || day.getDay() === 0) return false;
  const match = hours?.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
  if (!match) return true;
  return minutes(time) >= minutes(match[1]) && minutes(time) + duration <= minutes(match[2]);
}

function overlaps(start: number, end: number, booking: Booking, service?: Service) {
  const otherStart = minutes(booking.time);
  const otherEnd = otherStart + booking.durationMinutes + (service?.breakTime ?? 0) + (service?.bufferTime ?? 0);
  return start < otherEnd && otherStart < end;
}

export function bookingSlotIssue({ candidate, bookings, service, services, staff, resources, branchHours, online = false }: {
  candidate: Booking;
  bookings: Booking[];
  service?: Service;
  services: Service[];
  staff: StaffMember[];
  resources: Resource[];
  branchHours?: string;
  online?: boolean;
}): string | null {
  if (!branchOpenAt(branchHours, candidate.date, candidate.time, candidate.durationMinutes)) return "Məkan bu tarixdə və saatda işləmir.";
  const member = staff.find((item) => item.name === candidate.masterName && item.branchId === candidate.branchId);
  if (!member || member.status !== "active" || (online && !member.onlineBooking)) return "Seçilmiş filialda uyğun usta yoxdur.";
  if (service?.staffIds.length && !service.staffIds.includes(member.id)) return "Usta bu xidməti göstərmir.";
  const reservedDuration = candidate.durationMinutes + (service?.breakTime ?? 0) + (service?.bufferTime ?? 0);
  if (!staffAvailableAt(member, candidate.date, candidate.time, reservedDuration)) return "Usta seçilmiş tarixdə və saatda işləmir.";
  const required = service?.resourceIds ?? [];
  const availableUnits = (id: string) => resources.filter((item) => item.id === id && item.branchId === candidate.branchId).reduce((sum, item) => sum + resourceUnits(item).filter((unit) => unit.status === "active").length, 0);
  if (required.some((id) => availableUnits(id) === 0)) return "Xidmət üçün tələb olunan resurs bu filialda mövcud deyil.";
  const sameDay = bookings.filter((item) => item.id !== candidate.id && item.date === candidate.date && item.status !== "Ləğv edildi" && (!candidate.businessId || !item.businessId || item.businessId === candidate.businessId) && (!item.branchId || item.branchId === candidate.branchId));
  const start = minutes(candidate.time);
  const end = start + reservedDuration;
  const serviceFor = (item: Booking) => services.find((entry) => entry.id === item.serviceId || entry.name === item.service);
  const simultaneousGroup = (item: Booking) => service?.format === "group" && item.serviceId === service.id && item.time === candidate.time && item.masterName === candidate.masterName;
  const groupCount = sameDay.filter(simultaneousGroup).length;
  if (groupCount >= (service?.capacity ?? 1)) return "Qrup qəbulunda boş yer qalmayıb.";
  if (sameDay.some((item) => (item.masterName === member.name || item.masterName === "İstənilən usta") && !simultaneousGroup(item) && overlaps(start, end, item, serviceFor(item)))) return "Bu ustanın seçilmiş vaxtda başqa qəbulu var.";
  if (required.some((id) => sameDay.filter((item) => !simultaneousGroup(item) && serviceFor(item)?.resourceIds.includes(id) && overlaps(start, end, item, serviceFor(item))).length >= availableUnits(id))) return "Tələb olunan resurs seçilmiş vaxtda məşğuldur.";
  return null;
}
