export interface BusinessSession {
  id: string;
  ownerName: string;
  businessName: string;
  email: string;
  phone?: string;
  kind: "demo";
}

const KEY = "zeyvo_business_demo_session_v1";

function isBusinessSession(value: unknown): value is BusinessSession {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return item.kind === "demo" && typeof item.id === "string" &&
    typeof item.ownerName === "string" && typeof item.businessName === "string" &&
    typeof item.email === "string";
}

export function readBusinessSession(): BusinessSession | null {
  for (const getStorage of [() => sessionStorage, () => localStorage]) {
    try {
      const storage = getStorage();
      const raw = storage.getItem(KEY);
      if (!raw) continue;
      const value: unknown = JSON.parse(raw);
      if (isBusinessSession(value)) return value.id === "baku-beauty-demo"
        ? { ...value, email: value.email === "demo@zeyvobusiness.az" ? "admin@bakubeauty.az" : value.email, phone: value.phone || "+994 (50) 234-56-78" }
        : value;
    } catch { /* Storage may be unavailable or contain invalid data. */ }
  }
  return null;
}

export function saveBusinessSession(session: BusinessSession, remember: boolean): void {
  clearBusinessSession();
  try { (remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(session)); }
  catch { /* The current page still keeps the demo session in memory. */ }
}

export function updateBusinessSession(session: BusinessSession): boolean {
  try {
    const storage = sessionStorage.getItem(KEY) ? sessionStorage : localStorage.getItem(KEY) ? localStorage : sessionStorage;
    storage.setItem(KEY, JSON.stringify(session));
    return true;
  } catch { return false; }
}

export function clearBusinessSession(): void {
  try { sessionStorage.removeItem(KEY); } catch { /* Storage may be unavailable. */ }
  try { localStorage.removeItem(KEY); } catch { /* Storage may be unavailable. */ }
}

export const demoBusinessSession: BusinessSession = {
  id: "baku-beauty-demo",
  ownerName: "Leyla Məmmədova",
  businessName: "Baku Beauty Studio",
  email: "admin@bakubeauty.az",
  phone: "+994 (50) 234-56-78",
  kind: "demo",
};
