import type { BusinessSession } from "../auth/businessSession";

export interface WhatsAppSettings {
  phone: string;
  notifyOnBookingCreated: boolean;
  notifyReminder: boolean;
  notifyOnBookingCancelled: boolean;
  notifyMasterOnNewBooking: boolean;
  notifyReviewRequest: boolean;
  reminderHours: number;
  template: string;
}
export interface IntegrationReview { id: string; userName: string; businessTitle?: string; rating: number; comment: string; date: string }
export interface IntegrationsData { whatsapp: WhatsAppSettings; reviews: IntegrationReview[] }
const key = (id: string) => `zeyvo_business_integrations_demo_v1_${id}`;
const initial: IntegrationsData = { whatsapp: { phone: "", notifyOnBookingCreated: true, notifyReminder: true, notifyOnBookingCancelled: true, notifyMasterOnNewBooking: false, notifyReviewRequest: false, reminderHours: 2, template: "Salam, {client_name}! {business_name} məkanında {service_name} üçün qəbulunuz {date} saat {time} tarixindədir." }, reviews: [] };
function valid(value: unknown): value is IntegrationsData { if (!value || typeof value !== "object") return false; const item = value as Partial<IntegrationsData>; return !!item.whatsapp && typeof item.whatsapp.phone === "string" && typeof item.whatsapp.template === "string" && Array.isArray(item.reviews); }
export function readIntegrations(session: BusinessSession): IntegrationsData { try { const raw = localStorage.getItem(key(session.id)); if (raw) { const parsed: unknown = JSON.parse(raw); if (valid(parsed)) return parsed; } } catch { /* Browser storage may be unavailable. */ } return structuredClone(initial); }
export function saveIntegrations(id: string, data: IntegrationsData): boolean { try { localStorage.setItem(key(id), JSON.stringify(data)); return true; } catch { return false; } }
