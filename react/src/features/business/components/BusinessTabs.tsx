import type { ReactNode } from "react";
import { businessTabClass } from "./businessTabStyles";

export function BusinessTabNav({ label, children, centered = true }: { label: string; children: ReactNode; centered?: boolean }) {
  return <nav aria-label={label} className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
    <BusinessTabRail centered={centered}>{children}</BusinessTabRail>
  </nav>;
}

export function BusinessTabRail({ children, centered = false }: { children: ReactNode; centered?: boolean }) {
  return <div className={`flex w-max gap-1 rounded-2xl bg-slate-100 p-1 ${centered ? "mx-auto" : ""}`}>{children}</div>;
}

export function BusinessTabButton({ active, children, count, onClick }: { active: boolean; children: ReactNode; count?: number; onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-current={active ? "page" : undefined} className={businessTabClass(active)}>{children}{count !== undefined && <span className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none text-slate-700 ${active ? "bg-slate-100" : "bg-slate-200"}`}>{count}</span>}</button>;
}
