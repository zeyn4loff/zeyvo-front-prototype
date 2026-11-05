import { useState, type ReactNode } from "react";
import { LocationContext } from "./location-context";
import { readString, writeString } from "@/lib/demoStorage";

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState(() => readString("zeyvo_react_city", "Bakı"));
  function setCity(next: string) { setCityState(next); writeString("zeyvo_react_city", next); }
  return <LocationContext.Provider value={{ city, setCity }}>{children}</LocationContext.Provider>;
}
