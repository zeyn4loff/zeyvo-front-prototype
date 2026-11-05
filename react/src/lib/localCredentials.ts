type AccountKind = "business" | "customer";

interface StoredAccount<T> {
  email: string;
  salt: string;
  hash: string;
  profile: T;
}

const storageKey = (kind: AccountKind) => `zeyvo_${kind}_accounts_v1`;

function readAccounts<T>(kind: AccountKind): StoredAccount<T>[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey(kind)) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is StoredAccount<T> =>
      !!item && typeof item.email === "string" && typeof item.salt === "string" &&
      typeof item.hash === "string" && !!item.profile && typeof item.profile === "object") : [];
  } catch { return []; }
}

async function passwordHash(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: encoder.encode(salt), iterations: 120_000, hash: "SHA-256" }, key, 256);
  return [...new Uint8Array(bits)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function hasLocalAccount(kind: AccountKind, email: string): boolean {
  return readAccounts(kind).some((account) => account.email === email.trim().toLowerCase());
}

export function listLocalAccountProfiles<T>(kind: AccountKind): T[] {
  return readAccounts<T>(kind).map((account) => account.profile);
}

export async function createLocalAccount<T>(kind: AccountKind, email: string, password: string, profile: T): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const accounts = readAccounts<T>(kind);
  if (accounts.some((account) => account.email === normalized)) return false;
  const salt = crypto.randomUUID();
  const hash = await passwordHash(password, salt);
  try {
    localStorage.setItem(storageKey(kind), JSON.stringify([...accounts, { email: normalized, salt, hash, profile }]));
    return true;
  } catch { return false; }
}

export async function readLocalAccount<T>(kind: AccountKind, email: string, password: string): Promise<T | null> {
  const account = readAccounts<T>(kind).find((item) => item.email === email.trim().toLowerCase());
  return account && account.hash === await passwordHash(password, account.salt) ? account.profile : null;
}

export async function changeLocalPassword(kind: AccountKind, email: string, currentPassword: string, nextPassword: string, fallback?: { password: string; profile: unknown }): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const accounts = readAccounts(kind);
  const existing = accounts.find((item) => item.email === normalized);
  if (existing ? existing.hash !== await passwordHash(currentPassword, existing.salt) : !fallback || fallback.password !== currentPassword) return false;
  const salt = crypto.randomUUID();
  const hash = await passwordHash(nextPassword, salt);
  const profile = existing?.profile ?? fallback?.profile;
  if (!profile) return false;
  try {
    localStorage.setItem(storageKey(kind), JSON.stringify([...accounts.filter((item) => item.email !== normalized), { email: normalized, salt, hash, profile }]));
    return true;
  } catch { return false; }
}

export function removeLocalAccount(kind: AccountKind, email: string): boolean {
  try {
    localStorage.setItem(storageKey(kind), JSON.stringify(readAccounts(kind).filter((account) => account.email !== email.trim().toLowerCase())));
    return true;
  } catch { return false; }
}

export function updateLocalAccountProfile<T>(kind: AccountKind, email: string, profile: T): boolean {
  const normalized = email.trim().toLowerCase();
  const accounts = readAccounts<T>(kind);
  if (!accounts.some((account) => account.email === normalized)) return false;
  try {
    localStorage.setItem(storageKey(kind), JSON.stringify(accounts.map((account) => account.email === normalized ? { ...account, profile } : account)));
    return true;
  } catch { return false; }
}
