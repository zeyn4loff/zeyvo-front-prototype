import EmptyState from "../../../components/common/EmptyState";
import { UsersRound } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import { MasterCard } from "@/features/marketplace/components/MasterCard";
import type { Category, Specialist } from "@/features/marketplace/data";
import { categoryName, useTranslations } from "@/features/locale/language";

export default function SelectMasters({ category, items }: { category: Category; items: Specialist[] }) {
  const { language, t } = useTranslations();
  return <section className="my-8">
    <SectionHeader title={`${t("selectedMasters")} (${categoryName(language, category.id, category.title)})`} description={t("mastersDescription")} />
    {items.length ? <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((item) => <MasterCard key={item.id} showcase master={{ id: item.id, name: item.name, role: item.title, salon: item.salonName, rating: item.rating, avatar: item.photo }} />)}</div>
      : <EmptyState title="Mütəxəssis tapılmadı" description="Bu kateqoriya üzrə hələ mütəxəssis əlavə edilməyib." icon={UsersRound} compact />}
  </section>;
}
