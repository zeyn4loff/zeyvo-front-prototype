import { useSyncExternalStore } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readBusinesses, type Business } from "./businesses";

export interface ActiveBusinessContext {
  businessId: string;
  businessName: string;
  branchId: string;
  branchName: string;
  type: Business["type"];
}

const key = (sessionId: string) => `zeyvo_business_active_context_v1_${sessionId}`;
const directoryKey = (sessionId: string) => `zeyvo_business_directory_v1_${sessionId}`;
const changeEvent = "zeyvo-business-context-change";

function storedSelection(sessionId: string): { businessId: string; branchId: string } | null {
  try {
    const raw = localStorage.getItem(key(sessionId));
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (value && typeof value === "object") {
      const item = value as Record<string, unknown>;
      if (typeof item.businessId === "string" && typeof item.branchId === "string") return { businessId: item.businessId, branchId: item.branchId };
    }
  } catch { /* Invalid or unavailable browser storage. */ }
  return null;
}

export function resolveActiveContext(session: BusinessSession): ActiveBusinessContext | null {
  const businesses = readBusinesses(session);
  const selected = storedSelection(session.id);
  const chosenBusiness = businesses.find((item) => item.id === selected?.businessId);
  const business = chosenBusiness && (chosenBusiness.type === "individual" || chosenBusiness.branches.length > 0) ? chosenBusiness : businesses.find((item) => item.type === "individual" || item.branches.length > 0);
  if (!business) return null;
  const branch = business.type === "individual" ? undefined : business.branches.find((item) => item.id === selected?.branchId) ?? business.branches[0];
  return { businessId: business.id, businessName: business.name, branchId: branch?.id ?? business.id, branchName: branch?.name ?? business.name, type: business.type };
}

export function selectActiveContext(session: BusinessSession, businessId: string, branchId: string): boolean {
  const business = readBusinesses(session).find((item) => item.id === businessId);
  if (!business || (business.type === "individual" ? branchId !== business.id : !business.branches.some((item) => item.id === branchId))) return false;
  try { localStorage.setItem(key(session.id), JSON.stringify({ businessId, branchId })); }
  catch { return false; }
  window.dispatchEvent(new Event(changeEvent));
  return true;
}

function subscribe(callback: () => void) {
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener(changeEvent, callback); window.removeEventListener("storage", callback); };
}

export function useActiveBusinessContext(session: BusinessSession) {
  useSyncExternalStore(subscribe, () => {
    try { return `${localStorage.getItem(key(session.id)) ?? ""}\n${localStorage.getItem(directoryKey(session.id)) ?? ""}`; }
    catch { return ""; }
  }, () => "");
  return resolveActiveContext(session);
}
