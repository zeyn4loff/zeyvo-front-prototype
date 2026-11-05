import { createContext } from "react";

export type BusinessHeaderTargets = { actions: HTMLElement | null; subtitle: HTMLElement | null; title: HTMLElement | null; openPos: () => void };
export const BusinessHeaderContext = createContext<BusinessHeaderTargets>({ actions: null, subtitle: null, title: null, openPos: () => {} });
