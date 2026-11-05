import { useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readServiceData, saveServiceData, type ServiceData } from "./services";
export function useServices(session: BusinessSession) { const [data, setData] = useState<ServiceData>(() => readServiceData(session)); function update(next: ServiceData): boolean { if (!saveServiceData(session.id, next)) return false; setData(next); return true; } return { data, update }; }
