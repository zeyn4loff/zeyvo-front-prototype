import { useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readLoyalty, saveLoyalty, type LoyaltyData } from "./loyalty";
export function useLoyalty(session: BusinessSession) { const [data, setData] = useState<LoyaltyData>(() => readLoyalty(session)); function update(next: LoyaltyData) { if (!saveLoyalty(session.id, next)) return false; setData(next); return true; } return { data, update }; }
