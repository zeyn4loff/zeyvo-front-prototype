import { createContext, useContext } from "react";

export const CityPickerContext = createContext<(() => void) | null>(null);

export function useCityPicker() {
  const open = useContext(CityPickerContext);
  if (!open) throw new Error("CityPickerContext is missing");
  return open;
}
