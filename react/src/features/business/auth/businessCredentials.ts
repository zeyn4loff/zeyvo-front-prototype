import { listLocalAccountProfiles, removeLocalAccount } from "@/lib/localCredentials";
import { demoBusinessSession, type BusinessSession } from "./businessSession";

const accountsKey = "zeyvo_business_phone_accounts_v1";
const removedKey = "zeyvo_business_starter_removed_v1";
const lastPhoneKey = "zeyvo_business_last_phone_v1";

export function rememberedBusinessPhone(): string {
  try { return localStorage.getItem(lastPhoneKey) ?? ""; } catch { return ""; }
}

export function rememberBusinessPhone(phone: string): void {
  try { localStorage.setItem(lastPhoneKey, phone); } catch { /* Remembering a number is optional. */ }
}

export function normalizeBusinessPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("994") && digits.length === 12 ? digits.slice(3) : digits;
}

function phoneAccounts(): BusinessSession[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(accountsKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is BusinessSession =>
      !!item && typeof item.id === "string" && typeof item.ownerName === "string" &&
      typeof item.phone === "string" && item.kind === "demo") : [];
  } catch { return []; }
}

export function listBusinessSessions(): BusinessSession[] {
  const saved = phoneAccounts();
  const legacy = listLocalAccountProfiles<BusinessSession>("business");
  let removed = false;
  try { removed = localStorage.getItem(removedKey) === "1"; } catch { /* Use available profiles. */ }
  return [...saved, ...legacy.filter((item) => !saved.some((entry) => entry.id === item.id)),
    ...(!removed && !saved.some((item) => item.id === demoBusinessSession.id) && !legacy.some((item) => item.id === demoBusinessSession.id) ? [demoBusinessSession] : [])];
}

export function findBusinessByPhone(phone: string): BusinessSession | null {
  const digits = normalizeBusinessPhone(phone);
  if (digits.length !== 9) return null;
  return listBusinessSessions().find((item) => normalizeBusinessPhone(item.phone ?? "") === digits) ?? null;
}

export function createBusinessAccount(session: BusinessSession): boolean {
  if (findBusinessByPhone(session.phone ?? "")) return false;
  try {
    localStorage.setItem(accountsKey, JSON.stringify([...phoneAccounts(), session]));
    return true;
  } catch { return false; }
}

export function updateBusinessPhoneAccount(session: BusinessSession): boolean {
  const accounts = phoneAccounts();
  if (listBusinessSessions().some((item) => item.id !== session.id && normalizeBusinessPhone(item.phone ?? "") === normalizeBusinessPhone(session.phone ?? ""))) return false;
  try {
    localStorage.setItem(accountsKey, JSON.stringify(accounts.some((item) => item.id === session.id) ? accounts.map((item) => item.id === session.id ? session : item) : [...accounts, session]));
    return true;
  } catch { return false; }
}

export function deleteBusinessAccount(session: BusinessSession): boolean {
  try {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith("zeyvo_business_") && key.endsWith(`_${session.id}`));
    keys.forEach((key) => localStorage.removeItem(key));
    localStorage.setItem(accountsKey, JSON.stringify(phoneAccounts().filter((item) => item.id !== session.id)));
    if (normalizeBusinessPhone(rememberedBusinessPhone()) === normalizeBusinessPhone(session.phone ?? "")) localStorage.removeItem(lastPhoneKey);
    if (session.email) removeLocalAccount("business", session.email);
    if (session.id === demoBusinessSession.id) localStorage.setItem(removedKey, "1");
    return true;
  } catch { return false; }
}
