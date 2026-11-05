import { useState, type ReactNode } from "react";
import { BusinessSessionContext } from "./business-session-context";
import { clearBusinessSession, readBusinessSession, saveBusinessSession, updateBusinessSession, type BusinessSession } from "./businessSession";
import { readProfile } from "../profile/profile";
import { rememberBusinessPhone } from "./businessCredentials";

export default function BusinessSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<BusinessSession | null>(readBusinessSession);

  function startSession(next: BusinessSession, remember: boolean) {
    const profile = readProfile(next);
    const restored = { ...next, ownerName: profile.ownerName || next.ownerName, phone: profile.phone || next.phone };
    saveBusinessSession(restored, remember);
    if (restored.phone) rememberBusinessPhone(restored.phone);
    setSession(restored);
  }

  function endSession() {
    clearBusinessSession();
    setSession(null);
  }

  function updateSession(next: BusinessSession) {
    if (!updateBusinessSession(next)) return false;
    setSession(next);
    return true;
  }

  return <BusinessSessionContext.Provider value={{ session, startSession, updateSession, endSession }}>{children}</BusinessSessionContext.Provider>;
}
