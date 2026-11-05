import type { Customer } from "./CustomerContext";

const key = "zeyvo_react_phone_accounts";

export function phoneIdentity(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("994") ? digits : `994${digits}`;
}

export function customerIdentity(user: Customer): string {
  return user.email || phoneIdentity(user.phone);
}

function readAccounts(): Record<string, Customer> {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, Customer> : {};
  } catch { return {}; }
}

export function readPhoneAccount(phone: string): Customer | null {
  const value = readAccounts()[phoneIdentity(phone)];
  return value && typeof value.name === "string" && typeof value.phone === "string" ? value : null;
}

export function savePhoneAccount(user: Customer): boolean {
  try {
    localStorage.setItem(key, JSON.stringify({ ...readAccounts(), [phoneIdentity(user.phone)]: user }));
    return true;
  } catch { return false; }
}

export function createLocalConfirmationCode(): string {
  const value = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000;
  return String(value).padStart(6, "0");
}
