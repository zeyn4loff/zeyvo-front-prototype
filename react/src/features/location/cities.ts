import { salons } from "@/features/marketplace/data";

const names = ["Bakı", "Sumqayıt", "Gəncə", "Xırdalan"];
export const cities = names.map((name) => {
  const count = salons.filter((salon) => (salon.city || "Bakı") === name).length;
  return { name, count: count ? `${count} məkan` : "Məkan yoxdur" };
});
