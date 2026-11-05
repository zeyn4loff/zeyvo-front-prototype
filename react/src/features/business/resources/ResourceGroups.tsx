import EmptyState from "../../../components/common/EmptyState";
import { ChevronDown, Pencil, Plus, Trash2, Armchair } from "lucide-react";
import { CategoryIconView } from "../components/CategoryIconPicker";
import type { Resource, ResourceCategory } from "./resources";
import ResourceRow from "./ResourceRow";

type ResourceGroup = ResourceCategory & { resources: Resource[] };
type Props = {
  groups: ResourceGroup[]; uncategorized: Resource[]; collapsed: string[];
  category: string; hasFilter: boolean; search: string; filteredLength: number; categoriesLength: number;
  branchLabel: Map<string, string>;
  onToggleGroup: (id: string) => void; onEditCategory: (category: ResourceCategory) => void;
  onDeleteCategory: (category: ResourceCategory) => void; onAddResource: (categoryId: string) => void;
  onEditResource: (resource: Resource) => void; onDeleteResource: (resource: Resource) => void;
};

type RowActions = Pick<Props, "branchLabel" | "onEditResource" | "onDeleteResource">;

function ResourceTree({ resources, categoryId, onAddResource, branchLabel, onEditResource, onDeleteResource }: {
  resources: Resource[]; categoryId: string; onAddResource: Props["onAddResource"];
} & RowActions) {
  return <div className="relative ml-2 space-y-2 border-l-2 border-slate-200/90 pl-4 pt-1 sm:ml-3 sm:pl-5">
    {resources.map((item) => <div key={item.id} className="relative before:absolute before:-left-[18px] before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-slate-200 sm:before:-left-[22px] sm:before:w-5"><ResourceRow item={item} branchLabel={branchLabel} onEdit={onEditResource} onDelete={onDeleteResource} /></div>)}
    <div className="relative pt-0.5 before:absolute before:-left-[18px] before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-slate-200 sm:before:-left-[22px] sm:before:w-5"><button type="button" onClick={() => onAddResource(categoryId)} className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-100/90 px-3 py-2 text-xs font-medium text-slate-800 transition hover:border-amber-300 hover:bg-brand-primary"><Plus size={15} />Resurs əlavə et</button></div>
  </div>;
}

function ResourceGroupSection({ group, isCollapsed, onToggleGroup, onEditCategory, onDeleteCategory, onAddResource, ...rowActions }: {
  group: ResourceGroup; isCollapsed: boolean;
} & Pick<Props, "onToggleGroup" | "onEditCategory" | "onDeleteCategory" | "onAddResource"> & RowActions) {
  return <section className="space-y-3 p-4 transition-colors hover:bg-slate-50/50 sm:p-5">
    <div className="flex items-start justify-between gap-3 sm:items-center">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={() => onToggleGroup(group.id)} aria-expanded={!isCollapsed} aria-label={`${group.name} ${isCollapsed ? "aç" : "bağla"}`} className="flex size-10 shrink-0 cursor-pointer items-center justify-center gap-0.5 rounded-xl border border-amber-100/80 bg-amber-50 text-amber-700"><CategoryIconView name={group.icon} size={18} /><ChevronDown size={12} className={`transition-transform duration-200 ${isCollapsed ? "-rotate-90" : ""}`} /></button>
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-1.5"><button type="button" onClick={() => onToggleGroup(group.id)} aria-expanded={!isCollapsed} className="min-w-0 cursor-pointer break-words text-left text-sm font-bold text-slate-900 hover:underline sm:text-base">{group.name}</button><span className="shrink-0 rounded-md border border-amber-200/50 bg-amber-100/70 px-2 py-0.5 text-[10px] font-semibold text-amber-900">{group.resources.length} resurs</span></div>{group.description && <p className="mt-0.5 break-words text-xs text-slate-500">{group.description}</p>}</div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5"><button type="button" onClick={() => onEditCategory(group)} aria-label={`${group.name} redaktə et`} className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-white sm:size-7"><Pencil size={14} /></button><button type="button" onClick={() => onDeleteCategory(group)} aria-label={`${group.name} sil`} className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:size-7"><Trash2 size={14} /></button></div>
    </div>
    {!isCollapsed && <ResourceTree resources={group.resources} categoryId={group.id} onAddResource={onAddResource} {...rowActions} />}
  </section>;
}

export default function ResourceGroups({ groups, uncategorized, collapsed, category, hasFilter, search, filteredLength, categoriesLength, branchLabel, onToggleGroup, onEditCategory, onDeleteCategory, onAddResource, onEditResource, onDeleteResource }: Props) {
  const visibleGroups = groups.filter((group) => !hasFilter || group.resources.length > 0 || group.name.toLocaleLowerCase("az-AZ").includes(search.toLocaleLowerCase("az-AZ")));
  const showUncategorized = (category === "all" || category === "uncategorized") && uncategorized.length > 0;
  if (visibleGroups.length === 0 && !showUncategorized) return <EmptyState title={filteredLength === 0 && (hasFilter || categoriesLength === 0) ? "Resurs tapılmadı" : "Kateqoriya tapılmadı"} description="Filtrləri dəyişin və ya yeni resurs əlavə edin." icon={Armchair} />;

  const rowActions = { branchLabel, onEditResource, onDeleteResource };
  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="divide-y divide-slate-100">
    {visibleGroups.map((group) => <ResourceGroupSection key={group.id} group={group} isCollapsed={collapsed.includes(group.id)} onToggleGroup={onToggleGroup} onEditCategory={onEditCategory} onDeleteCategory={onDeleteCategory} onAddResource={onAddResource} {...rowActions} />)}
    {showUncategorized && <section className="p-4 sm:p-5"><h2 className="mb-3 text-sm font-bold">Kateqoriyasız <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px]">{uncategorized.length}</span></h2><div className="space-y-2">{uncategorized.map((item) => <ResourceRow key={item.id} item={item} branchLabel={branchLabel} onEdit={onEditResource} onDelete={onDeleteResource} />)}</div></section>}
  </div></div>;
}
