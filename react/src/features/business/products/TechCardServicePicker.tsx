import { useMemo, useState } from "react";
import { Search, Wrench } from "lucide-react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import type { Service, ServiceCategory } from "../services/services";

type Props = {
  services: Service[];
  categories: ServiceCategory[];
  selectedId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export default function TechCardServicePicker({ services, categories, selectedId, onSelect, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const categoryNames = useMemo(() => new Map(categories.map((category) => [category.id, category.name])), [categories]);
  const availableCategories = useMemo(() => {
    const used = new Set(services.map((service) => service.categoryId));
    return [
      ...categories.filter((category) => used.has(category.id)).map((category) => ({ id: category.id, name: category.name })),
      ...(used.has("") || [...used].some((id) => !categoryNames.has(id)) ? [{ id: "other", name: "Digər" }] : []),
    ];
  }, [services, categories, categoryNames]);
  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("az-AZ");
    return services.filter((service) => {
      const category = categoryNames.get(service.categoryId) ?? "Digər";
      const matchesCategory = categoryId === "all" || (categoryId === "other" ? !categoryNames.has(service.categoryId) : service.categoryId === categoryId);
      return matchesCategory && (!search || `${service.name} ${category}`.toLocaleLowerCase("az-AZ").includes(search));
    });
  }, [services, categoryId, query, categoryNames]);

  return (
    <BusinessFormDialog size="stock" title="Xidmət seçimi" description="Texnoloji kart üçün salon xidmətini seçin" onClose={onClose}>
      <div className="min-w-0 space-y-3 text-xs">
        <div className="space-y-2.5">
          <label className="relative block">
            <span className="sr-only">Xidmət adı ilə axtarın</span>
            <Search aria-hidden="true" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Xidmət adı ilə axtarın..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-primary/40"
            />
          </label>
          <div aria-label="Xidmət kateqoriyaları" className="flex max-w-full gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[{ id: "all", name: "Bütün xidmətlər" }, ...availableCategories].map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={categoryId === category.id}
                onClick={() => setCategoryId(category.id)}
                className={`min-h-9 shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-3 py-1 font-semibold transition ${categoryId === category.id ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50">
          {filtered.map((service) => {
            const selected = service.id === selectedId;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelect(service.id)}
                aria-label={`${service.name} xidmətini seç`}
                className={`flex min-h-16 w-full cursor-pointer items-center justify-between gap-2 p-3 text-left transition hover:bg-amber-50/50 sm:gap-3 sm:px-4 ${selected ? "border-l-4 border-brand-primary bg-amber-50/70" : ""}`}
              >
                <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-brand-primary text-[#101114]" : "bg-slate-100 text-slate-700"}`}>
                    <Wrench aria-hidden="true" size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block break-words font-bold text-slate-900">{service.name}</span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-400">
                      <span className="rounded bg-slate-100 px-1.5 font-medium text-slate-600">{categoryNames.get(service.categoryId) ?? "Xidmət"}</span>
                      <span aria-hidden="true">•</span>
                      <span>{service.duration} dəq</span>
                    </span>
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-2.5">
                  <span className="font-mono font-bold text-slate-900">{service.price.toFixed(2)}{service.priceType === "range" ? `–${service.priceMax.toFixed(2)}` : ""} ₼{service.priceType === "from" ? "+" : ""}</span>
                  <span className={`rounded-lg px-3 py-1.5 font-bold transition ${selected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-800"}`}>
                    {selected ? "Seçildi" : "Seç"}
                  </span>
                </span>
              </button>
            );
          })}
          {!filtered.length && <div className="space-y-1 p-8 text-center text-slate-400"><Search aria-hidden="true" size={30} className="mx-auto text-slate-300" /><p className="font-bold text-slate-700">Axtarışa uyğun xidmət tapılmadı</p><p>{services.length ? "Başqa açar söz və ya kateqoriya seçin" : "Əvvəlcə xidmət əlavə edin"}</p></div>}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <span aria-live="polite" className="font-medium text-slate-400">{filtered.length} xidmət tapıldı</span>
          <button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 font-bold text-slate-900">Bağla</button>
        </div>
      </div>
    </BusinessFormDialog>
  );
}
