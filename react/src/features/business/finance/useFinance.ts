import { useEffect, useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readFinance, saveFinance, type FinanceData } from "./finance";
export function useFinance(session: BusinessSession) { const [data, setData] = useState<FinanceData>(() => readFinance(session)); useEffect(() => { const refresh = () => setData(readFinance(session)); window.addEventListener("zeyvo-pos-sale", refresh); return () => window.removeEventListener("zeyvo-pos-sale", refresh); }, [session]); function update(next: FinanceData) { if (!saveFinance(session.id, next)) return false; setData(next); return true; } return { data, update }; }
