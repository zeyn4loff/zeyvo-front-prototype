import { useEffect, useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readBookings, saveBookings, type Booking } from "./bookings";

export function useBookings(session: BusinessSession) {
  const [bookings, setBookings] = useState<Booking[]>(() => readBookings(session));
  useEffect(() => {
    const refresh = () => setBookings(readBookings(session));
    window.addEventListener("zeyvo-business-bookings-change", refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("zeyvo-business-bookings-change", refresh); window.removeEventListener("storage", refresh); };
  }, [session]);
  function update(next: Booking[]) {
    if (!saveBookings(session.id, next)) return false;
    setBookings(next);
    return true;
  }
  return { bookings, update };
}
