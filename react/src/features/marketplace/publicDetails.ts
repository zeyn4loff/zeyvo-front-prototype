import type { Salon, SalonBranch } from "./data";

// Branch examples carried over from the prototype CRM demo.
const demoBranches: Record<number, SalonBranch[]> = {
  1: [
    { id: "br_bbs_1", name: "Mərkəz Filialı", address: "Nizami küç. 45", hours: "09:00 – 21:00", phone: "+994 (12) 493-00-11" },
    { id: "br_bbs_2", name: "Gənclik Filialı", address: "Fətəli Xan Xoyski 83", hours: "10:00 – 22:00", phone: "+994 (12) 564-20-30" },
    { id: "br_bbs_3", name: "Yasamal Filialı", address: "Həsən bəy Zərdabi pr. 78", hours: "09:00 – 20:00", phone: "+994 (12) 434-55-90" },
  ],
  2: [
    { id: "br_gbl_1", name: "Port Baku Filialı", address: "Neftçilər pr. 153", hours: "10:00 – 22:00", phone: "+994 (12) 404-77-88" },
    { id: "br_gbl_2", name: "Sahil Filialı", address: "Xəqani küç. 18", hours: "09:00 – 21:00", phone: "+994 (12) 498-10-20" },
  ],
};

export function getPublicBranches(salon: Salon): SalonBranch[] {
  return salon.branches?.length ? salon.branches : [{ id: `salon-${salon.id}`, name: salon.name, address: salon.location, hours: salon.workHours }];
}

export function getDemoNetworkBranches(id: 1 | 2): SalonBranch[] { return demoBranches[id]; }
