import { showToast } from "@/components/common/toast";
import EmptyState from "../../../components/common/EmptyState";
import { useState } from "react";
import { Building2, Plus } from "lucide-react";
import type { BusinessSession } from "../auth/businessSession";
import { type Branch, type Business } from "./businesses";
import { useBusinesses } from "./useBusinesses";
import { BusinessFormDialog } from "./BusinessDialogs";
import BranchFormDialog from "./BranchFormDialog";
import BusinessDeleteDialog from "../components/BusinessDeleteDialog";
import BusinessHeaderPortal from "../components/BusinessHeaderPortal";
import BusinessHeaderButton from "../components/BusinessHeaderButton";
import { readBookings } from "../calendar/bookings";
import { readServiceData } from "../services/services";
import { readStaffData } from "../staff/staff";
import { readResourceData } from "../resources/resources";
import { readProductData } from "../products/products";
import BusinessDirectoryCard from "./BusinessDirectoryCard";

type EditingBranch = { businessId: string; branch?: Branch };
type Deleting = { businessId: string; branchId?: string; name: string };

export default function BusinessDirectory({ session }: { session: BusinessSession }) {
  const { businesses, update } = useBusinesses(session);
  const [editingBusiness, setEditingBusiness] = useState<Business | null | undefined>(undefined);
  const [editingIndividual, setEditingIndividual] = useState<{ business: Business; creating: boolean } | null>(null);
  const [editingBranch, setEditingBranch] = useState<EditingBranch | null>(null);
  const [deleting, setDeleting] = useState<Deleting | null>(null);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [saveError, setSaveError] = useState("");
  const deletionBlock = deleting ? (() => {
    const business = businesses.find((item) => item.id === deleting.businessId);
    if (!business) return "Profil tapılmadı.";
    const branchIds = deleting.branchId ? [deleting.branchId] : business.type === "individual" ? [business.id] : business.branches.map((branch) => branch.id);
    const bookings = readBookings(session).some((item) => (item.businessId === business.id || (!item.businessId && business.id === businesses[0]?.id)) && (!deleting.branchId || item.branchId === deleting.branchId));
    const staff = readStaffData(session).members.some((item) => branchIds.includes(item.branchId));
    const resources = readResourceData(session).resources.some((item) => branchIds.includes(item.branchId));
    const productData = readProductData(session);
    const warehouseIds = productData.warehouses.filter((item) => branchIds.includes(item.branchId)).map((item) => item.id);
    const products = productData.products.some((item) => warehouseIds.includes(item.warehouseId));
    const services = !deleting.branchId && readServiceData(session).services.some((item) => (item.businessId ?? businesses[0]?.id) === business.id);
    const links = [bookings && "qəbullar", staff && "ustalar", resources && "resurslar", warehouseIds.length > 0 && "anbarlar", products && "məhsullar", services && "xidmətlər", !deleting.branchId && business.branches.length > 0 && "filiallar"].filter(Boolean);
    return links.length ? `Bu profilə bağlı ${links.join(", ")} var. Silməzdən əvvəl bağlı məlumatları başqa profilə köçürün və ya ayrıca silin.` : "";
  })() : "";

  function saveBusiness(item: Business) {
    if (!update(businesses.some((business) => business.id === item.id) ? businesses.map((business) => business.id === item.id ? item : business) : [...businesses, item])) { setSaveError("Məlumat saxlanmadı. Brauzer yaddaşında yer boşaldın."); return; }
    setSaveError("");
    setEditingBusiness(undefined);
    showToast("Biznes məlumatları saxlanıldı.");
  }

  function configureIndividual(item: Business) {
    setEditingIndividual({ business: item, creating: !businesses.some((business) => business.id === item.id) });
    setEditingBusiness(undefined);
    setSaveError("");
  }

  function editBusiness(business: Business) {
    if (business.type === "individual") configureIndividual(business);
    else setEditingBusiness(business);
  }

  function saveIndividual(profile: Branch) {
    if (!editingIndividual) return;
    const item: Business = {
      ...editingIndividual.business,
      ...profile,
      type: "individual",
      id: editingIndividual.business.id,
      branches: editingIndividual.business.branches,
      image: profile.logo || editingIndividual.business.image,
      category: profile.categories?.[0] ?? profile.category,
    };
    if (!update(businesses.some((business) => business.id === item.id) ? businesses.map((business) => business.id === item.id ? item : business) : [...businesses, item])) {
      setSaveError("Məlumat saxlanmadı. Brauzer yaddaşında yer boşaldın.");
      return;
    }
    setSaveError("");
    setEditingIndividual(null);
    showToast("Fərdi profil saxlanıldı.");
  }

  function saveBranch(item: Branch) {
    if (!editingBranch) return;
    if (!update(businesses.map((business) => business.id === editingBranch.businessId ? { ...business, branches: business.branches.some((branch) => branch.id === item.id) ? business.branches.map((branch) => branch.id === item.id ? item : branch) : [...business.branches, item] } : business))) { setSaveError("Məlumat saxlanmadı. Şəkillərin sayını azaldın və yenidən cəhd edin."); return; }
    setSaveError("");
    setEditingBranch(null);
    showToast("Filial saxlanıldı.");
  }

  function deleteItem() {
    if (!deleting || deletionBlock) return;
    if (!update(deleting.branchId ? businesses.map((business) => business.id === deleting.businessId ? { ...business, branches: business.branches.filter((branch) => branch.id !== deleting.branchId) } : business) : businesses.filter((business) => business.id !== deleting.businessId))) { setSaveError("Silmək mümkün olmadı. Brauzer yaddaşını yoxlayın."); return; }
    setSaveError("");
    setDeleting(null);
    showToast("Silindi.");
  }

  return <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-7 sm:py-7">
    <BusinessHeaderPortal><BusinessHeaderButton onClick={() => setEditingBusiness(null)} className="w-full sm:w-auto"><Plus />Yeni biznes və ya fərdi usta</BusinessHeaderButton></BusinessHeaderPortal>
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {businesses.length === 0 ? <EmptyState title="Hələ heç bir profil tapılmadı" description="İlk biznesinizi və ya fərdi fəaliyyətinizi əlavə edin." icon={Building2} actionLabel="Yeni profil yarat" onAction={() => setEditingBusiness(null)} className="border-0 shadow-none" /> : <div className="divide-y divide-slate-100">{businesses.map((business) => <BusinessDirectoryCard
        key={business.id}
        business={business}
        collapsed={collapsed.includes(business.id)}
        onToggle={() => setCollapsed((current) => current.includes(business.id) ? current.filter((id) => id !== business.id) : [...current, business.id])}
        onEditBusiness={() => editBusiness(business)}
        onDeleteBusiness={() => setDeleting({ businessId: business.id, name: business.name })}
        onEditBranch={(branch) => setEditingBranch({ businessId: business.id, branch })}
        onDeleteBranch={(branch) => setDeleting({ businessId: business.id, branchId: branch.id, name: branch.name })}
        onAddBranch={() => setEditingBranch({ businessId: business.id })}
      />)}</div>}
    </div>
    {saveError && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{saveError}</p>}
    {editingBusiness !== undefined && <BusinessFormDialog key={editingBusiness?.id ?? "new-business"} open initial={editingBusiness ?? undefined} saveError={saveError} onClose={() => { setEditingBusiness(undefined); setSaveError(""); }} onSave={saveBusiness} onConfigureIndividual={configureIndividual} />}
    {editingIndividual && <BranchFormDialog key={editingIndividual.business.id} open individual creating={editingIndividual.creating} initial={{ ...editingIndividual.business, id: editingIndividual.business.id, name: editingIndividual.business.name, city: editingIndividual.business.city ?? "Bakı", address: editingIndividual.business.address ?? "", phone: editingIndividual.business.phone ?? "", hours: editingIndividual.business.hours ?? "", logo: editingIndividual.business.logo ?? editingIndividual.business.image }} saveError={saveError} onClose={() => { setEditingIndividual(null); setSaveError(""); }} onSave={saveIndividual} />}
    {editingBranch && <BranchFormDialog key={editingBranch.branch?.id ?? `${editingBranch.businessId}-new`} open initial={editingBranch.branch} saveError={saveError} onClose={() => { setEditingBranch(null); setSaveError(""); }} onSave={saveBranch} />}
    {deleting && <BusinessDeleteDialog name={deleting.name} detail={deletionBlock} error={saveError} blocked={!!deletionBlock} onClose={() => { setDeleting(null); setSaveError(""); }} onDelete={deleteItem} />}
  </div>;
}
