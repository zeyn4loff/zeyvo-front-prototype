import type { BusinessSession } from "../auth/businessSession";

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  amenities?: string[];
  logo?: string;
  category?: string;
  categories?: string[];
  phones?: string[];
  description?: string;
  mapUrl?: string;
  photos?: string[];
  scheduleDays?: Record<string, { isOff: boolean; open: string; close: string }>;
  whatsapp?: string;
  telegram?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  linkedin?: string;
}

export interface Business extends Partial<Omit<Branch, "id" | "name" | "description">> {
  id: string;
  type: "business" | "individual";
  name: string;
  description: string;
  topCategory?: string;
  category?: string;
  image?: string;
  branches: Branch[];
}

const storageKey = (sessionId: string) => `zeyvo_business_directory_v1_${sessionId}`;

function validBusiness(value: unknown): value is Business {
  if (!value || typeof value !== "object") return false;
  const business = value as Partial<Business>;
  return typeof business.id === "string" && typeof business.name === "string" &&
    (business.type === "business" || business.type === "individual") && Array.isArray(business.branches) &&
    business.branches.every((branch) => branch && typeof branch.id === "string" && typeof branch.name === "string");
}

export function readBusinesses(session: BusinessSession): Business[] {
  try {
    const raw = localStorage.getItem(storageKey(session.id));
    if (raw !== null) {
      const data: unknown = JSON.parse(raw);
      if (Array.isArray(data) && data.every(validBusiness)) return data;
    }
  } catch { /* Browser storage may be unavailable. */ }
  if (session.id !== "baku-beauty-demo") return [];
  return [{
    id: "biz_baku_beauty", type: "business", name: "Baku Beauty Studio", description: "", branches: [
      { id: "br_bbs_1", name: "Mərkəz Filialı", city: "Bakı", address: "Nizami küç. 45", phone: "+994 (12) 493-00-11", hours: "09:00 – 21:00" },
      { id: "br_bbs_2", name: "Gənclik Filialı", city: "Bakı", address: "Fətəli Xan Xoyski 83", phone: "+994 (12) 564-20-30", hours: "10:00 – 22:00" },
      { id: "br_bbs_3", name: "Yasamal Filialı", city: "Bakı", address: "Həsən bəy Zərdabi pr. 78", phone: "+994 (12) 434-55-90", hours: "09:00 – 20:00" },
    ],
  }, {
    id: "biz_grand_barber", type: "business", name: "Grand Barber Lounge", description: "", branches: [
      { id: "br_gbl_1", name: "Port Baku Filialı", city: "Bakı", address: "Neftçilər pr. 153", phone: "+994 (12) 404-77-88", hours: "10:00 – 22:00" },
      { id: "br_gbl_2", name: "Sahil Filialı", city: "Bakı", address: "Xaqani küç. 18", phone: "+994 (12) 498-10-20", hours: "10:00 – 21:00" },
    ],
  }, {
    id: "biz_dentestet", type: "business", name: "DentEstet Stomatologiya", description: "", branches: [
      { id: "br_de_1", name: "Mərkəz Filialı", city: "Bakı", address: "28 May küç. 12", phone: "+994 (12) 555-10-10", hours: "09:00 – 19:00" },
    ],
  }];
}

export function saveBusinesses(sessionId: string, businesses: Business[]): boolean {
  try { localStorage.setItem(storageKey(sessionId), JSON.stringify(businesses)); }
  catch { return false; }
  window.dispatchEvent(new Event("zeyvo-business-context-change"));
  window.dispatchEvent(new Event("zeyvo-marketplace-change"));
  return true;
}
