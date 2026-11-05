import { createContext } from "react";
import type { CustomerContextValue } from "./CustomerContext";
export const CustomerContext = createContext<CustomerContextValue | null>(null);
