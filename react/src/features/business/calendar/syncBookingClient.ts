import type { BusinessSession } from "../auth/businessSession";
import { phoneDigits, readClients, saveClients, type Client } from "../clients/clients";
import type { Booking } from "./bookings";

const visitId = (booking: Booking) => `booking:${booking.id}`;

/** Keeps a completed appointment in the customer history without counting it twice. */
export function syncBookingClient(session: BusinessSession, booking: Booking): boolean {
  const clients = readClients(session);
  const phone = phoneDigits(booking.phone);
  const index = clients.findIndex((client) => client.id === booking.clientId || (phone.length >= 9 && phoneDigits(client.phone) === phone));
  const hadVisit = clients.some((client) => client.visits.some((visit) => visit.id === visitId(booking)));
  if (booking.status !== "Tamamlandı" && !hadVisit) return true;
  const cleaned = clients.map((client) => ({ ...client, visits: client.visits.filter((visit) => visit.id !== visitId(booking)) }));
  if (booking.status !== "Tamamlandı") return saveClients(session.id, cleaned);
  if (index < 0 && phone.length < 9) return false;
  const client: Client = index >= 0 ? cleaned[index] : {
    id: crypto.randomUUID(), name: booking.clientName, phone: booking.phone, email: "", gender: "other", category: "new", birthDate: "", preferredStaffId: "", discountPercent: 0, note: "", visits: [], ledger: [], notes: [], files: [], createdAt: new Date().toISOString(),
  };
  const visits = [...client.visits];
  visits.unshift({ id: visitId(booking), date: booking.date, service: booking.service, staff: booking.masterName, amount: booking.price, note: booking.note });
  const updated = { ...client, visits };
  return saveClients(session.id, index >= 0 ? cleaned.map((item, position) => position === index ? updated : item) : [updated, ...cleaned]);
}
