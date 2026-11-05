import { createContext } from "react";
import type { BusinessSession } from "./businessSession";

export interface BusinessSessionValue {
  session: BusinessSession | null;
  startSession: (session: BusinessSession, remember: boolean) => void;
  updateSession: (session: BusinessSession) => boolean;
  endSession: () => void;
}

export const BusinessSessionContext = createContext<BusinessSessionValue | null>(null);
