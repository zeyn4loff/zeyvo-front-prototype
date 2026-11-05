import type { Promo } from "./marketing";

export function promoIssue(promo: Promo | undefined, subtotal: number, date: string): string | null {
  if (!promo) return "Promokod tapılmadı.";
  if (promo.status !== "active") return "Promokod hazırda istifadə edilmir.";
  if (promo.startDate && date < promo.startDate) return "Promokodun müddəti başlamayıb.";
  if (promo.endDate && date > promo.endDate) return "Promokodun müddəti bitib.";
  if (promo.usageLimit > 0 && promo.usedCount >= promo.usageLimit) return "Promokodun istifadə limiti dolub.";
  if (subtotal < promo.minOrder) return `Promokod üçün minimum məbləğ ${promo.minOrder} ₼-dir.`;
  return null;
}
