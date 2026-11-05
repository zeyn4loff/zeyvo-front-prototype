import { useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readResourceData, saveResourceData, type ResourceData } from "./resources";

export function useResources(session: BusinessSession) {
  const [data, setData] = useState<ResourceData>(() => readResourceData(session));
  function update(next: ResourceData) {
    if (!saveResourceData(session.id, next)) return false;
    setData(next);
    return true;
  }
  return { data, update };
}
