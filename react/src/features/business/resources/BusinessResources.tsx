import { showToast } from "@/components/common/toast";
import { useState } from "react";
import BusinessFilterButton from "../components/BusinessFilterButton";
import { Armchair, ChartNoAxesCombined, DoorOpen, Plus, Search, Zap } from "lucide-react";
import BusinessMetricCard from "../components/BusinessMetricCard";
import type { BusinessSession } from "../auth/businessSession";
import BusinessDeleteDialog from "../components/BusinessDeleteDialog";
import BusinessHeaderPortal from "../components/BusinessHeaderPortal";
import BusinessHeaderButton from "../components/BusinessHeaderButton";
import { readBusinesses } from "../directory/businesses";
import { useActiveBusinessContext } from "../directory/activeContext";
import { CategoryFormDialog } from "./ResourceDialogs";
import ResourceFormDialog from "./ResourceFormDialog";
import ResourceFilterDialog from "./ResourceFilterDialog";
import { type Resource, type ResourceCategory, type ResourceType } from "./resources";
import ResourceGroups from "./ResourceGroups";
import { useResources } from "./useResources";

type Deleting = { kind: "category" | "resource"; id: string; name: string };

export default function BusinessResources({ session }: { session: BusinessSession }) {
  const { data, update } = useResources(session);
  const activeContext = useActiveBusinessContext(session);
  const businesses = readBusinesses(session);
  const branches = businesses.flatMap((business) => business.branches.map((branch) => ({ id: branch.id, label: `${branch.name} · ${business.name}` })));
  const [type, setType] = useState<ResourceType | "all">("all");
  const branch = activeContext?.branchId ?? "all";
  const [category, setCategory] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editingResource, setEditingResource] = useState<Resource | null | undefined>(undefined);
  const [defaultCategoryId, setDefaultCategoryId] = useState("");
  const [editingCategory, setEditingCategory] = useState<ResourceCategory | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<Deleting | null>(null);
  const [saveError, setSaveError] = useState("");
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const branchLabel = new Map(branches.map((item) => [item.id, item.label]));
  const filtered = data.resources.filter((item) => (type === "all" || item.type === type) && (branch === "all" || item.branchId === branch) && (category === "all" || (category === "uncategorized" ? !item.categoryId || !data.categories.some((cat) => cat.id === item.categoryId) : item.categoryId === category)) && (!search || `${item.name} ${item.notes}`.toLocaleLowerCase("az-AZ").includes(search.toLocaleLowerCase("az-AZ"))));

  function saveResource(resource: Resource) {
    if (!update({ ...data, resources: data.resources.some((item) => item.id === resource.id) ? data.resources.map((item) => item.id === resource.id ? resource : item) : [...data.resources, resource] })) { setSaveError("Məlumat saxlanmadı. Brauzer yaddaşında yer boşaldın."); return; }
    setSaveError("");
    setEditingResource(undefined);
    showToast("Resurs saxlanıldı.");
  }
  function saveCategory(next: ResourceCategory) {
    if (!update({ ...data, categories: data.categories.some((item) => item.id === next.id) ? data.categories.map((item) => item.id === next.id ? next : item) : [...data.categories, next] })) { setSaveError("Məlumat saxlanmadı. Brauzer yaddaşında yer boşaldın."); return; }
    setSaveError("");
    setEditingCategory(undefined);
    showToast("Kateqoriya saxlanıldı.");
  }
  function remove() {
    if (!deleting) return;
    const next = deleting.kind === "resource"
      ? { ...data, resources: data.resources.filter((item) => item.id !== deleting.id) }
      : { categories: data.categories.filter((item) => item.id !== deleting.id), resources: data.resources.map((item) => item.categoryId === deleting.id ? { ...item, categoryId: "" } : item) };
    if (!update(next)) { setSaveError("Silmək mümkün olmadı. Brauzer yaddaşını yoxlayın."); return; }
    if (deleting.kind === "category" && category === deleting.id) setCategory("all");
    setSaveError("");
    setDeleting(null);
    showToast("Silindi.");
  }
  function openResource(initial?: Resource, categoryId = "") { setSaveError(""); setDefaultCategoryId(categoryId); setEditingResource(initial ?? null); }
  function resetFilters() { setType("all"); setCategory("all"); setSearch(""); setFilterOpen(false); }

  const groups = data.categories.filter((item) => category === "all" || category === item.id).map((item) => ({ ...item, resources: filtered.filter((resource) => resource.categoryId === item.id) }));
  const uncategorized = filtered.filter((item) => !item.categoryId || !data.categories.some((cat) => cat.id === item.categoryId));
  const hasFilter = type !== "all" || category !== "all" || search !== "";
  return <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-5 sm:px-7 sm:py-7">
    <BusinessHeaderPortal><BusinessHeaderButton variant="secondary" onClick={() => { setSaveError(""); setEditingCategory(null); }} className="flex-1 sm:flex-none"><Plus />Yeni kateqoriya</BusinessHeaderButton><BusinessHeaderButton onClick={() => openResource()} className="flex-1 sm:flex-none"><Plus />Yeni resurs</BusinessHeaderButton></BusinessHeaderPortal>
    {saveError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{saveError}</p>}
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">{([
      { value: "all", label: "Ümumi", count: data.resources.filter((item) => branch === "all" || item.branchId === branch).length, detail: <><span className="font-semibold text-emerald-600">{data.resources.filter((item) => (branch === "all" || item.branchId === branch) && item.status === "active").length} aktiv</span><span className="mx-1">•</span><span className="font-semibold text-amber-600">{data.categories.length} kateqoriya</span></>, icon: ChartNoAxesCombined, iconClassName: "bg-slate-100 text-slate-700 group-hover:bg-brand-primary group-hover:text-black" },
      { value: "chair", label: "Kreslolar", count: data.resources.filter((item) => item.type === "chair" && (branch === "all" || item.branchId === branch)).length, detail: "İş yerləri & masalar", icon: Armchair, iconClassName: "bg-blue-50 text-blue-600 group-hover:bg-blue-100" },
      { value: "room", label: "Otaqlar", count: data.resources.filter((item) => item.type === "room" && (branch === "all" || item.branchId === branch)).length, detail: "Kabinetlər & zonalar", icon: DoorOpen, iconClassName: "bg-purple-50 text-purple-600 group-hover:bg-purple-100" },
      { value: "device", label: "Aparatlar", count: data.resources.filter((item) => item.type === "device" && (branch === "all" || item.branchId === branch)).length, detail: "Avadanlıq & cihazlar", icon: Zap, iconClassName: "bg-amber-50 text-amber-600 group-hover:bg-amber-100" },
    ] as const).map((item) => <BusinessMetricCard key={item.value} label={item.label} value={item.count} detail={item.detail} icon={item.icon} iconClassName={item.iconClassName} selected={type === item.value} onClick={() => setType(item.value)} />)}</div>
    <div className="flex min-w-0 gap-2"><label className="business-search-control flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3"><Search size={16} className="shrink-0 text-slate-400" /><input aria-label="Resurs axtar" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Resurs adı və ya qeydlər üzrə axtarış" className="min-w-0 flex-1 bg-transparent text-xs outline-none" /></label><BusinessFilterButton onClick={() => setFilterOpen(true)} count={Number(type !== "all") + Number(category !== "all")} /></div>
    {hasFilter && <button type="button" onClick={resetFilters} className="cursor-pointer text-xs font-semibold text-red-600 hover:underline">Filtrləri sıfırla</button>}
    {filterOpen && <ResourceFilterDialog categories={data.categories} type={type} category={category} onClose={() => setFilterOpen(false)} onReset={resetFilters} onApply={(nextType, nextCategory) => { setType(nextType); setCategory(nextCategory); setFilterOpen(false); }} />}
    <ResourceGroups groups={groups} uncategorized={uncategorized} collapsed={collapsed} category={category} hasFilter={hasFilter} search={search} filteredLength={filtered.length} categoriesLength={data.categories.length} branchLabel={branchLabel} onToggleGroup={(id) => setCollapsed((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])} onEditCategory={setEditingCategory} onDeleteCategory={(item) => setDeleting({ kind: "category", id: item.id, name: item.name })} onAddResource={(categoryId) => openResource(undefined, categoryId)} onEditResource={(item) => openResource(item)} onDeleteResource={(item) => setDeleting({ kind: "resource", id: item.id, name: item.name })} />
    {editingResource !== undefined && <ResourceFormDialog key={editingResource?.id ?? "new-resource"} initial={editingResource ?? undefined} categories={data.categories} defaultCategoryId={defaultCategoryId} defaultBranchId={activeContext?.branchId ?? branches[0]?.id} error={saveError} onClose={() => { setEditingResource(undefined); setSaveError(""); }} onSave={saveResource} />}
    {editingCategory !== undefined && <CategoryFormDialog key={editingCategory?.id ?? "new-category"} initial={editingCategory ?? undefined} error={saveError} onClose={() => { setEditingCategory(undefined); setSaveError(""); }} onSave={saveCategory} />}
    {deleting && <BusinessDeleteDialog name={deleting.name} detail={deleting.kind === "category" ? "Bu kateqoriyadakı resurslar kateqoriyasız siyahıya keçiriləcək." : undefined} error={saveError} onClose={() => { setDeleting(null); setSaveError(""); }} onDelete={remove} />}
  </div>;
}
