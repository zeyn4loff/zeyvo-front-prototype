import { useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readMarketing, saveMarketing, type MarketingData } from "./marketing";
export function useMarketing(session: BusinessSession) { const [data, setData] = useState<MarketingData>(() => readMarketing(session)); function update(next: MarketingData) { if (!saveMarketing(session.id, next)) return false; setData(next); return true; } return { data, update }; }
