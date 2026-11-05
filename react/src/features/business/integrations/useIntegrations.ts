import { useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readIntegrations, saveIntegrations, type IntegrationsData } from "./integrations";
export function useIntegrations(session: BusinessSession) { const [data, setData] = useState<IntegrationsData>(() => readIntegrations(session)); function update(next: IntegrationsData) { if (!saveIntegrations(session.id, next)) return false; setData(next); return true; } return { data, update }; }
