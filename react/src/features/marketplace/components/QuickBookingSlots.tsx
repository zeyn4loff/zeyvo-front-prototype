import { useMemo, useState } from "react";
import type { BusinessSession } from "@/features/business/auth/businessSession";
import { readPartnerBookings } from "@/features/business/calendar/bookings";
import { readResourceData } from "@/features/business/resources/resources";
import { readServiceData } from "@/features/business/services/services";
import { readStaffData } from "@/features/business/staff/staff";
import { useCustomer } from "@/features/customer/useCustomer";
import { bookingTimeOptions, findAvailableMaster } from "@/features/customer/bookingAvailability";
import type { Salon } from "@/features/marketplace/data";

export default function QuickBookingSlots({ salon }: { salon: Salon }) {
  const { bookings, openBooking } = useCustomer();
  const [now] = useState(Date.now);
  const slots = useMemo(() => {
    const service = salon.services[0];
    if (!service || (salon.branches?.length ?? 0) > 1) return [];
    const branch = salon.branches?.[0];
    const session = salon.partner ? { id: salon.partner.ownerId } as BusinessSession : null;
    const services = session ? readServiceData(session).services : [];
    const businessService = services.find((item) => item.id === service.partnerServiceId);
    const staff = session ? readStaffData(session).members : [];
    const resources = session ? readResourceData(session).resources : [];
    const partnerBookings = salon.partner ? readPartnerBookings(salon.partner.ownerId, salon.partner.businessId, branch?.id) : [];
    const duration = businessService?.duration ?? (Number.parseInt(service.duration, 10) || 60);
    const hours = branch?.hours || salon.workHours;
    const options = salon.partner ? bookingTimeOptions(hours, duration, salon.slots) : salon.slots;
    const result: { date: string; time: string; label: string }[] = [];
    for (let offset = 0; offset < 2 && result.length < 3; offset += 1) {
      const day = new Date(now);
      day.setHours(12, 0, 0, 0);
      day.setDate(day.getDate() + offset);
      const date = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
      for (const time of options) {
        const takenTimes = bookings.filter((booking) => booking.status !== "Ləğv edildi" && booking.salonId === salon.id && booking.branchName === branch?.name && booking.date === date && !booking.masterName).map((booking) => booking.time);
        if (findAvailableMaster({ salon, specialist: null, service: businessService, services, staff, resources, bookings: partnerBookings, branchId: branch?.id ?? salon.partner?.businessId, branchHours: hours, date, time, duration, takenTimes, now }) !== null) {
          result.push({ date, time, label: offset === 0 ? time : `Sabah ${time}` });
          if (result.length === 3) break;
        }
      }
    }
    return result;
  }, [salon, bookings, now]);

  if (!slots.length) return null;
  return <div className="mt-3 border-t border-slate-100 pt-3">
    <p className="mb-2 text-xs font-semibold text-slate-600">Yaxın boş vaxtlar · {salon.services[0].name}</p>
    <div className="flex flex-wrap gap-2">{slots.map((slot) => <button key={`${slot.date}-${slot.time}`} type="button" onClick={() => openBooking(salon, undefined, salon.services[0], slot.time, salon.branches?.[0], slot.date)} className="min-h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-primary hover:border-brand-primary hover:bg-brand-primary/20">{slot.label}</button>)}</div>
  </div>;
}
