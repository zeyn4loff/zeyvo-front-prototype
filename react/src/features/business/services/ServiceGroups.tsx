import type { Dispatch, ReactNode, SetStateAction } from "react";
import { ChevronDown, Pencil, Plus, Scissors, Tag, Trash2 } from "lucide-react";
import EmptyState from "../../../components/common/EmptyState";
import { CategoryIconView } from "../components/CategoryIconPicker";
import type { Service, ServiceCategory, ServiceFormat, ServiceGender } from "./services";

interface Props {
  categories: ServiceCategory[];
  filtered: Service[];
  categoryFilter: string;
  genderFilter: ServiceGender | "all-filter";
  formatFilter: ServiceFormat | "all";
  onlineFilter: string;
  search: string;
  collapsed: string[];
  setCollapsed: Dispatch<SetStateAction<string[]>>;
  onEditCategory: (category: ServiceCategory) => void;
  onDeleteCategory: (category: ServiceCategory) => void;
  onAddService: (categoryId: string) => void;
  onAddCategory: () => void;
  onResetFilters: () => void;
  renderService: (service: Service) => ReactNode;
}

const actionClass = "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-white";

function ServiceTree({ services, onAdd, renderService, emptyMessage }: {
  services: Service[];
  onAdd: () => void;
  renderService: Props["renderService"];
  emptyMessage: string;
}) {
  return (
    <div className="relative my-1 ml-2 space-y-2 border-l-2 border-slate-200/90 pl-4 sm:ml-3 sm:pl-5">
      {services.length ? services.map(renderService) : <p className="py-3 text-center text-xs font-medium text-slate-400">{emptyMessage}</p>}
      <div className="relative pt-0.5 before:absolute before:-left-[18px] before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-slate-200/90 sm:before:-left-[22px] sm:before:w-5">
        <button type="button" onClick={onAdd} className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-100/90 px-3 py-2 text-xs font-medium text-slate-800 shadow-2xs transition hover:border-amber-300 hover:bg-brand-primary active:scale-[0.99]">
          <Plus size={14} strokeWidth={2.5} /> Xidmət əlavə et
        </button>
      </div>
    </div>
  );
}

export default function ServiceGroups({ categories, filtered, categoryFilter, genderFilter, formatFilter, onlineFilter, search, collapsed, setCollapsed, onEditCategory, onDeleteCategory, onAddService, onAddCategory, onResetFilters, renderService }: Props) {
  const filtersActive = Boolean(search || genderFilter !== "all-filter" || formatFilter !== "all" || onlineFilter !== "all");
  const uncategorized = filtered.filter((service) => !service.categoryId || !categories.some((category) => category.id === service.categoryId));

  function toggleCategory(id: string) {
    setCollapsed((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  }

  if (!filtered.length) return <EmptyState title="Heç bir xidmət tapılmadı" description="Axtarış və ya filtr meyarlarını dəyişin, yaxud kateqoriya üzrə yeni xidmət əlavə edin" icon={Scissors} action={<>
    <button type="button" onClick={onResetFilters} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-4 text-xs font-medium text-slate-800 transition hover:bg-slate-200">Filtrləri sıfırla</button>
    <button type="button" onClick={() => onAddService("")} className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-4 text-xs font-medium text-slate-900 transition hover:brightness-95">Yeni xidmət</button>
    <button type="button" onClick={onAddCategory} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-4 text-xs font-medium text-slate-800 transition hover:bg-slate-200">Yeni kateqoriya</button>
  </>} />;

  return (
    <section aria-label="Xidmət kateqoriyaları" className="min-w-0 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {categories.filter((category) => categoryFilter === "all" || categoryFilter === category.id).map((category) => {
        const services = filtered.filter((service) => service.categoryId === category.id);
        if (!services.length && filtersActive) return null;
        const isCollapsed = collapsed.includes(category.id);

        return (
          <div key={category.id} className="space-y-3 p-4 sm:p-5">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2 sm:items-center sm:gap-4">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber-100/80 bg-amber-50 text-amber-700">
                    <CategoryIconView name={category.icon} size={20} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <button type="button" onClick={() => toggleCategory(category.id)} aria-label={`${category.name} ${isCollapsed ? "aç" : "bağla"}`} aria-expanded={!isCollapsed} className="-ml-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900">
                        <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${isCollapsed ? "-rotate-90" : ""}`} />
                      </button>
                      <button type="button" onClick={() => toggleCategory(category.id)} className="min-w-0 cursor-pointer text-left text-sm font-bold text-slate-900 hover:underline">{category.name}</button>
                      <span className="rounded-md border border-amber-200/50 bg-amber-100/70 px-2 py-0.5 text-[10px] font-semibold text-amber-900">{services.length} xidmət</span>
                    </div>
                    {category.description && <p className="mt-0.5 truncate text-[11px] text-slate-400">{category.description}</p>}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button type="button" onClick={() => onEditCategory(category)} aria-label={`${category.name} redaktə et`} className={actionClass}><Pencil size={14} /></button>
                  <button type="button" onClick={() => onDeleteCategory(category)} aria-label={`${category.name} sil`} className={`${actionClass} hover:border-red-200 hover:bg-red-50 hover:text-red-600`}><Trash2 size={14} /></button>
                </div>
              </div>
              {!isCollapsed && <ServiceTree services={services} onAdd={() => onAddService(category.id)} renderService={renderService} emptyMessage="Bu kateqoriyaya hələ xidmət əlavə edilməyib." />}
            </div>
          </div>
        );
      })}

      {(categoryFilter === "all" || categoryFilter === "uncategorized") && uncategorized.length > 0 && (
        <div className="p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600"><Tag size={20} /></span>
            <div className="min-w-0 flex-1">
              <button type="button" onClick={() => toggleCategory("uncategorized")} className="flex cursor-pointer items-center gap-1.5 text-left text-sm font-bold text-slate-900">
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${collapsed.includes("uncategorized") ? "-rotate-90" : ""}`} /> Kateqoriyasız xidmətlər
                <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold">{uncategorized.length} xidmət</span>
              </button>
              <p className="mt-0.5 truncate text-[11px] text-slate-400">Xüsusi kateqoriyaya təyin edilməmiş xidmətlər</p>
            </div>
          </div>
          {!collapsed.includes("uncategorized") && <ServiceTree services={uncategorized} onAdd={() => onAddService("")} renderService={renderService} emptyMessage="Kateqoriyasız heç bir xidmət yoxdur." />}
        </div>
      )}
    </section>
  );
}
