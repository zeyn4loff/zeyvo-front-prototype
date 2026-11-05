import type { Salon } from "./data";

export interface GalleryPhoto { src: string; label: string; type: "interior" | "works" }

const url = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
const beauty: GalleryPhoto[] = [
  { src: url("photo-1560066984-138dadb4c035"), label: "Salon interyeri", type: "interior" },
  { src: url("photo-1600948836101-f9ffda59d250"), label: "Qəbul sahəsi", type: "interior" },
  { src: url("photo-1527799820374-dcf8d9d4a388"), label: "İş zonası", type: "interior" },
  { src: url("photo-1544161515-4ab6ce6db874"), label: "SPA zonası", type: "interior" },
  { src: url("photo-1632345031435-8727f6897d53"), label: "Manikür nümunəsi", type: "works" },
  { src: url("photo-1562322140-8baeececf3df"), label: "Saç düzümü nümunəsi", type: "works" },
  { src: url("photo-1583001931096-959e9a1a6223"), label: "Kirpik və qaş nümunəsi", type: "works" },
  { src: url("photo-1519014816548-bf5fe059798b"), label: "Pedikür nümunəsi", type: "works" },
];
const barber: GalleryPhoto[] = [
  { src: url("photo-1503951914875-452162b0f3f1"), label: "Bərbər salonu", type: "interior" },
  { src: url("photo-1585747860715-2ba37e788b70"), label: "Gözləmə sahəsi", type: "interior" },
  { src: url("photo-1622286342621-4bd786c2447c"), label: "Saç kəsimi nümunəsi", type: "works" },
  { src: url("photo-1517832606589-715753b0e352"), label: "Saqqal qulluq nümunəsi", type: "works" },
];
const health: GalleryPhoto[] = [
  { src: url("photo-1588776814546-1ffcf47267a5"), label: "Kabinet nümunəsi", type: "interior" },
  { src: url("photo-1519494026892-80bbd2d6fd0d"), label: "Klinika interyeri", type: "interior" },
  { src: url("photo-1606811841689-23dfddce3e95"), label: "Stomatoloji iş nümunəsi", type: "works" },
];
const auto: GalleryPhoto[] = [
  { src: url("photo-1601362840469-51e4d8d58785"), label: "Avto xidmət zonası", type: "interior" },
  { src: url("photo-1520340356584-f9917d1eea6f"), label: "Avto interyeri", type: "interior" },
  { src: url("photo-1617814076367-b759c7d7e738"), label: "Avto qulluq nümunəsi", type: "works" },
];

export function getDemoGallery(salon: Salon): GalleryPhoto[] {
  if (salon.category === "barber" || salon.topCategory === "barber") return barber;
  if (salon.topCategory === "health") return health;
  if (salon.topCategory === "auto") return auto;
  if (salon.topCategory === "beauty") return beauty;
  return [];
}
