import type { StaffStatus } from "./staff";

export type StaffFilters = { role: string; status: "all" | StaffStatus; shift: "all" | "working"; online: "all" | "online" };
export const emptyStaffFilters: StaffFilters = { role: "all", status: "all", shift: "all", online: "all" };
