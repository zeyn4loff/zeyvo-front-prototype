import type { BusinessSession } from "../auth/businessSession";
import type { Language } from "@/features/locale/language";

export type ProfileTab = "personal" | "startpage" | "messengers" | "social" | "apps" | "security";
export type ProfileGender = "female" | "male" | "";
export interface BusinessProfile {
  ownerName: string;
  phone: string;
  gender: ProfileGender;
  language: Language;
  city: string;
  bio: string;
  avatar: string;
  startView: "business" | "profile";
  whatsapp: string;
  telegram: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  linkedin: string;
}
const key = (id: string) => `zeyvo_business_profile_demo_v1_${id}`;
export function defaultProfile(session: BusinessSession): BusinessProfile { return { ownerName: session.ownerName, phone: session.phone ?? "", gender: session.id === "baku-beauty-demo" ? "female" : "", language: "az", city: "Bakı", bio: session.id === "baku-beauty-demo" ? "Zeyvo Business partnyoru. Baku Beauty Studio baş admini." : "", avatar: "", startView: "business", whatsapp: "", telegram: "", instagram: "", facebook: "", tiktok: "", linkedin: "" }; }
export function readProfile(session: BusinessSession): BusinessProfile {
  const fallback = defaultProfile(session);
  try { const raw = localStorage.getItem(key(session.id)); if (raw) { const value: unknown = JSON.parse(raw); if (value && typeof value === "object") { const profile = value as Partial<BusinessProfile>; return { ...fallback, ...profile, gender: profile.gender || fallback.gender, bio: session.id === "baku-beauty-demo" && profile.bio === "Baku Beauty Studio baş admini." ? fallback.bio : profile.bio ?? fallback.bio, avatar: typeof profile.avatar === "string" && profile.avatar.startsWith("data:image/") ? profile.avatar : "", startView: profile.startView === "profile" ? "profile" : "business" }; } } } catch { /* Browser storage may be unavailable. */ }
  return fallback;
}
export function saveProfile(sessionId: string, profile: BusinessProfile): boolean { try { localStorage.setItem(key(sessionId), JSON.stringify(profile)); return true; } catch { return false; } }
export function normalizeHandle(value: string, service: "telegram" | "instagram" | "facebook" | "tiktok" | "linkedin") {
  const trimmed = value.trim();
  const withoutUrl = trimmed.replace(/^https?:\/\/(?:www\.)?/i, "");
  const prefixes: Record<typeof service, RegExp> = { telegram: /^(?:t\.me\/|@)/i, instagram: /^(?:instagram\.com\/|@)/i, facebook: /^facebook\.com\//i, tiktok: /^(?:tiktok\.com\/@?|@)/i, linkedin: /^linkedin\.com\/(?:in\/)?/i };
  return withoutUrl.replace(prefixes[service], "").replace(/\/$/, "");
}
export function phoneDigits(phone: string) { const digits = phone.replace(/\D/g, ""); return digits.startsWith("994") ? digits.slice(3) : digits; }
export function formattedPhone(value: string) { const digits = phoneDigits(value).slice(0, 9); return digits ? `+994 ${digits.slice(0, 2)} ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7)}` : ""; }
