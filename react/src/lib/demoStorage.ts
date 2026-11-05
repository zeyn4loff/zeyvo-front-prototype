// Browser-only persistence for the frontend demo. The API can replace this
// adapter later without making page components depend on localStorage.
export function readJson<T>(key: string, fallback: T, isValid?: (value: unknown) => value is T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const value: unknown = JSON.parse(raw);
    return isValid ? (isValid(value) ? value : fallback) : (value ?? fallback) as T;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T): boolean {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}

export function removeStored(key: string): void {
  try { localStorage.removeItem(key); } catch { /* Storage may be unavailable. */ }
}

export function readString(key: string, fallback: string): string {
  try { return localStorage.getItem(key) || fallback; }
  catch { return fallback; }
}

export function writeString(key: string, value: string): boolean {
  try { localStorage.setItem(key, value); return true; }
  catch { return false; }
}
