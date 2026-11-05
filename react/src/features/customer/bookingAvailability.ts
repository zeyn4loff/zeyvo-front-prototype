import type { Booking } from "@/features/business/calendar/bookings";
import { bookingSlotIssue, branchOpenAt } from "@/features/business/calendar/bookingRules";
import type { StaffMember } from "@/features/business/staff/staff";
import type { Service as BusinessService } from "@/features/business/services/services";
import type { Resource } from "@/features/business/resources/resources";
import type { Salon, Specialist } from "@/features/marketplace/data";

interface SlotRequest {
  salon: Salon;
  specialist: Specialist | null;
  service?: BusinessService;
  services: BusinessService[];
  staff: StaffMember[];
  resources: Resource[];
  bookings: Booking[];
  branchId?: string;
  branchHours?: string;
  date: string;
  time: string;
  duration: number;
  takenTimes: string[];
  now: number;
}

export function findAvailableMaster({ salon, specialist, service, services, staff, resources, bookings, branchId, branchHours, date, time, duration, takenTimes, now }: SlotRequest): string | null {
  const start = new Date(`${date}T${time}:00`).getTime();
  if (!Number.isFinite(start) || start < now || !branchOpenAt(branchHours, date, time, duration)) return null;
  if (service?.onlineSettings) {
    if (start < now + service.onlineSettings.minAdvanceHours * 3600000) return null;
    if (start > now + service.onlineSettings.maxAdvanceDays * 86400000) return null;
  }
  if (takenTimes.includes(time)) return null;
  if (!salon.partner) return specialist?.name ?? "";
  const candidates = staff.filter((member) => member.status === "active" && member.onlineBooking && member.branchId === branchId &&
    (!specialist?.partnerStaffId || member.id === specialist.partnerStaffId) &&
    (!service?.staffIds.length || service.staffIds.includes(member.id)));
  for (const member of candidates) {
    const candidate: Booking = {
      id: "__candidate__", businessId: salon.partner.businessId, branchId, serviceId: service?.id,
      clientName: "", phone: "", service: service?.name ?? "", masterName: member.name,
      date, time, durationMinutes: duration, price: service?.price ?? 0,
      status: "Gözlənilir", source: "online", note: "",
    };
    if (!bookingSlotIssue({ candidate, bookings, service, services, staff, resources, branchHours, online: true })) return member.name;
  }
  return null;
}

export function isSlotAvailable(request: SlotRequest): boolean {
  return findAvailableMaster(request) !== null;
}

export function bookingTimeOptions(hours: string | undefined, duration: number, fallback: string[]): string[] {
  const match = hours?.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
  if (!match) return fallback;
  const start = Number(match[1]) * 60 + Number(match[2]);
  const end = Number(match[3]) * 60 + Number(match[4]);
  if (end <= start || duration <= 0) return fallback;
  const options: string[] = [];
  for (let minute = start; minute + duration <= end; minute += 30) {
    options.push(`${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`);
  }
  return options;
}
