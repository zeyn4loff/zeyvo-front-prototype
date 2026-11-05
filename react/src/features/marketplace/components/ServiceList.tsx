import { groupServices, type Service } from "@/features/marketplace/data";
import { useCustomerText } from "@/features/locale/customerText";

interface Props {
  services: Service[];
  onBook?: (service: Service) => void;
  title?: string;
}

export default function ServiceList({ services, onBook, title = "Xidmətlər və qiymətlər" }: Props) {
  const ct = useCustomerText();
  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-bold">{ct(title)}</h2>
      <div className="space-y-4">
        {groupServices(services).map((group) => (
          <div key={group.name || "all"}>
            {group.name && <h3 className="mb-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold">{group.name}</h3>}
            <div className="divide-y divide-slate-100">
              {group.services.map((service) => (
                <div key={service.id} className="flex min-w-0 items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold break-words">{service.name}</p>
                    <p className="text-xs text-slate-500">{service.duration}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <span className="whitespace-nowrap font-semibold">{service.price} ₼</span>
                    {onBook && <button type="button" onClick={() => onBook(service)} className="rounded-lg bg-brand-primary px-3 py-2 text-xs font-semibold">{ct("Yazıl")}</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
