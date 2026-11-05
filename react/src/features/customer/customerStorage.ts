import { readJson } from "@/lib/demoStorage";
import type { Booking, Customer } from "./CustomerContext";

export const customerKey = "zeyvo_react_user";
export const favoriteKey = (type: "salons" | "masters", email: string) => `zeyvo_react_favorites_${type}_${email.toLowerCase()}`;
export const bookingKey = (email: string) => `zeyvo_react_bookings_${email.toLowerCase()}`;

const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value && typeof value === "object" && !Array.isArray(value));
const isCustomer = (value: unknown): value is Customer => isRecord(value) && typeof value.name === "string" && typeof value.email === "string" && typeof value.phone === "string" && typeof value.city === "string";
const isNumberArray = (value: unknown): value is number[] => Array.isArray(value) && value.every((item) => Number.isInteger(item));
const isBookingArray = (value: unknown): value is Booking[] => Array.isArray(value) && value.every((item) => isRecord(item) && typeof item.id === "string" && typeof item.salonId === "number" && typeof item.service === "string" && typeof item.date === "string" && typeof item.time === "string");

export function readCustomer(): Customer | null { return readJson(customerKey, null as Customer | null, (value): value is Customer | null => value === null || isCustomer(value)); }
export function readFavorites(type: "salons" | "masters", email: string): number[] { return readJson(favoriteKey(type, email), [], isNumberArray); }
export function readBookings(email: string): Booking[] { return readJson(bookingKey(email), [], isBookingArray); }
