import type { BusinessSession } from "../auth/businessSession";

export type ResourceType = "chair" | "room" | "device";
export type ResourceStatus = "active" | "busy" | "maintenance";
export interface ResourceUnit { id: string; status: ResourceStatus }

export interface ResourceCategory { id: string; name: string; description: string; icon?: string }
export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  /** Legacy group status; new records store a status for every physical unit. */
  status?: ResourceStatus;
  branchId: string;
  categoryId: string;
  notes: string;
  quantity?: number;
  units?: ResourceUnit[];
}
export interface ResourceData { categories: ResourceCategory[]; resources: Resource[] }

const statuses: ResourceStatus[] = ["active", "busy", "maintenance"];

/** Preserve older locally stored resources that had one status for the whole quantity. */
export function resourceUnits(resource: Resource): ResourceUnit[] {
  if (Array.isArray(resource.units) && resource.units.length > 0) {
    const valid = resource.units.filter((unit): unit is ResourceUnit => !!unit && typeof unit.id === "string" && statuses.includes(unit.status));
    if (valid.length > 0) return valid;
  }
  const count = Math.max(1, Math.min(1000, Math.floor(Number(resource.quantity) || 1)));
  const status = resource.status && statuses.includes(resource.status) ? resource.status : "active";
  return Array.from({ length: count }, (_, index) => ({ id: `${resource.id}-unit-${index + 1}`, status }));
}

const key = (sessionId: string) => `zeyvo_business_resources_demo_v1_${sessionId}`;

function demoData(): ResourceData {
  return {
    categories: [
      { id: "rcat_1", name: "Bərbər və saç zalı", description: "Saç kəsimi, fen və saç baxımı zonası." },
      { id: "rcat_2", name: "Kosmetologiya və dəri baxımı", description: "Kosmetoloji prosedurlar üçün kabinetlər." },
      { id: "rcat_3", name: "Lazer və epilyasiya şöbəsi", description: "Lazer cihazları və epilyasiya avadanlıqları." },
      { id: "rcat_4", name: "Dırnaq xidməti (Nail Art)", description: "Manikür və pedikür stansiyaları." },
    ],
    resources: [
      { id: "res_1", name: "Kreslo #1 (Barber)", type: "chair", status: "active", branchId: "br_bbs_1", categoryId: "rcat_1", notes: "Master kreslosu, hidravlik tənzimləmə." },
      { id: "res_2", name: "Kreslo #2 (Kolorist)", type: "chair", status: "busy", branchId: "br_bbs_1", categoryId: "rcat_1", notes: "Boya və fen bölməsi." },
      { id: "res_3", name: "Manikür Masası #1", type: "chair", status: "active", branchId: "br_bbs_2", categoryId: "rcat_4", notes: "LED qurutma lampası." },
      { id: "res_4", name: "VIP Kabinet (Kosmetologiya)", type: "room", status: "active", branchId: "br_bbs_1", categoryId: "rcat_2", notes: "Kosmetoloji kuşetka." },
      { id: "res_5", name: "Masaj və SPA Otağı", type: "room", status: "busy", branchId: "br_bbs_3", categoryId: "rcat_2", notes: "Aromaterapiya və masaj stolu." },
      { id: "res_6", name: "Candela GentleLase Pro (Lazer)", type: "device", status: "active", branchId: "br_bbs_1", categoryId: "rcat_3", notes: "Aleksandrit lazer cihazı." },
      { id: "res_7", name: "Hydrafacial Elite MD", type: "device", status: "maintenance", branchId: "br_bbs_2", categoryId: "rcat_3", notes: "Planlı profilaktik baxış." },
    ],
  };
}

function validData(value: unknown): value is ResourceData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<ResourceData>;
  return Array.isArray(data.categories) && data.categories.every((item) => item && typeof item.id === "string" && typeof item.name === "string") &&
    Array.isArray(data.resources) && data.resources.every((item) => item && typeof item.id === "string" && typeof item.name === "string" &&
      ["chair", "room", "device"].includes(item.type) &&
      ((Array.isArray(item.units) && item.units.length > 0 && item.units.every((unit) => unit && typeof unit.id === "string" && statuses.includes(unit.status))) ||
        (typeof item.status === "string" && statuses.includes(item.status))));
}

export function readResourceData(session: BusinessSession): ResourceData {
  try {
    const raw = localStorage.getItem(key(session.id));
    if (raw !== null) {
      const value: unknown = JSON.parse(raw);
      if (validData(value)) return value;
    }
  } catch { /* Browser storage may be unavailable. */ }
  return session.id === "baku-beauty-demo" ? demoData() : { categories: [], resources: [] };
}

export function saveResourceData(sessionId: string, data: ResourceData): boolean {
  try { localStorage.setItem(key(sessionId), JSON.stringify(data)); return true; }
  catch { return false; }
}

export const typeLabels: Record<ResourceType, string> = { chair: "Kreslo", room: "Otaq / kabinet", device: "Aparat / cihaz" };
export const statusLabels: Record<ResourceStatus, string> = { active: "Aktiv / Boş", busy: "Məşğul", maintenance: "Təmirdə" };
