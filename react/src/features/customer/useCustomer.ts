import { useContext } from "react";
import { CustomerContext } from "./customer-context";
export function useCustomer() { const context = useContext(CustomerContext); if (!context) throw new Error("CustomerProvider is missing"); return context; }
