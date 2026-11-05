import { createContext } from "react";
export const LocationContext = createContext<{ city: string; setCity: (city: string) => void } | null>(null);
