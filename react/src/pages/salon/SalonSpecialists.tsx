import { MasterCard } from "@/features/marketplace/components/MasterCard";
import type { Specialist } from "@/features/marketplace/data";
import { useCustomerText } from "@/features/locale/customerText";

export default function SalonSpecialists({ specialists }: { specialists: Specialist[] }) {
  const ct = useCustomerText();
  if (!specialists.length) return null;
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold">{ct("Mütəxəssislər")}</h2>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        {specialists.map((item) => <MasterCard key={item.id} master={{ id: item.id, name: item.name, role: item.title, salon: item.salonName, rating: item.rating, avatar: item.photo }} />)}
      </div>
    </section>
  );
}
