import { useEffect, useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readClients, saveClients, type Client } from "./clients";
export function useClients(session: BusinessSession) { const [clients, setClients] = useState<Client[]>(() => readClients(session)); useEffect(() => { const refresh = () => setClients(readClients(session)); window.addEventListener("zeyvo-pos-sale", refresh); return () => window.removeEventListener("zeyvo-pos-sale", refresh); }, [session]); function update(next: Client[]) { if (!saveClients(session.id, next)) return false; setClients(next); return true; } return { clients, update }; }
