import type { Dispatch, SetStateAction } from "react";
import type { FinanceKind } from "./finance";

export const panel = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";
export const txLabels: Record<FinanceKind, string> = { income: "Gəlir", expense: "Xərc", transfer: "Köçürmə" };
export type FinanceDeleteTarget = { kind: "account" | "category" | "transaction" | "payroll"; id: string; name: string };
export type DeleteSetter = Dispatch<SetStateAction<FinanceDeleteTarget | null>>;
