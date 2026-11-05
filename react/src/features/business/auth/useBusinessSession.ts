import { useContext } from "react";
import { BusinessSessionContext } from "./business-session-context";

export function useBusinessSession() {
  const value = useContext(BusinessSessionContext);
  if (!value) throw new Error("BusinessSessionProvider is missing");
  return value;
}
