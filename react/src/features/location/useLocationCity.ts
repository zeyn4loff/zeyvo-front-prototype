import { useContext } from "react";
import { LocationContext } from "./location-context";
export function useLocationCity() { const value = useContext(LocationContext); if (!value) throw new Error("LocationProvider is missing"); return value; }
