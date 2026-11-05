import { useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readStaffData, saveStaffData, type StaffData } from "./staff";
export function useStaff(session: BusinessSession) { const [data, setData] = useState<StaffData>(() => readStaffData(session)); function update(next: StaffData) { if (!saveStaffData(session.id, next)) return false; setData(next); return true; } return { data, update }; }
