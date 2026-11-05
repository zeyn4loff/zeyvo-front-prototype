import { Link, Navigate, useNavigate, useParams } from "react-router";
import Breadcrumbs from "@/features/marketplace/components/Breadcrumbs";
import ServiceList from "@/features/marketplace/components/ServiceList";
import { getPublicSalons, getPublicSpecialists, useMarketplaceRevision } from "@/features/marketplace/publicCatalog";
import { useCustomer } from "@/features/customer/useCustomer";
import SalonHero from "./SalonHero";
import SalonSpecialists from "./SalonSpecialists";
import SalonDetails from "./SalonDetails";
import PhotoGallery from "@/features/marketplace/components/PhotoGallery";
import LocalReviews from "@/features/marketplace/components/LocalReviews";
import { getPublicBranches } from "@/features/marketplace/publicDetails";
import { useState } from "react";
import EmptyState from "@/components/common/EmptyState";
import { Store } from "lucide-react";
import { useCustomerText } from "@/features/locale/customerText";
import { useTranslations } from "@/features/locale/language";

export default function SalonPage() {
  const ct = useCustomerText();
  const { t } = useTranslations();
  const { id } = useParams();
  const navigate = useNavigate();
  useMarketplaceRevision();
  const salon = getPublicSalons().find((item) => item.id === Number(id));
  const [branchId, setBranchId] = useState<string | null>(null);
  const { favoriteSalonIds, toggleSalonFavorite, openBooking } = useCustomer();

  if (!salon) return <div className="container mx-auto px-4 py-8 sm:py-12"><EmptyState title={ct("Məkan tapılmadı")} description={ct("Axtardığınız məkan mövcud deyil.")} icon={Store} action={<Link to="/catalog" className="inline-flex min-h-11 items-center rounded-xl bg-brand-primary px-5 text-sm font-bold text-slate-900">{ct("Kataloqa qayıt")}</Link>} /></div>;
  if (salon.isIndividual) return <Navigate to={`/master/${salon.specialists?.[0]?.id ?? ""}`} replace />;

  const branches = getPublicBranches(salon);
  const selectedBranch = branches.find((branch) => branch.id === branchId) || branches[0];
  const specialists = getPublicSpecialists().filter((item) => item.salonId === salon.id && (!item.partnerBranchId || item.partnerBranchId === selectedBranch.id));
  const gallery = selectedBranch.photos?.length ? selectedBranch.photos.map((src, index) => ({ src, label: `${selectedBranch.name} · İnteryer ${index + 1}`, type: "interior" as const })) : salon.gallery ?? [];
  const book = (service?: (typeof salon.services)[number]) => openBooking(salon, undefined, service, undefined, selectedBranch);

  return (
    <div className="container mx-auto space-y-4 px-4 py-5 pb-28 sm:space-y-6 sm:py-7">
      <div className="flex items-center gap-2"><button type="button" onClick={() => navigate(-1)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold sm:hidden">← {ct("Geri")}</button><Breadcrumbs items={[{ label: t("catalog"), to: "/catalog" }, { label: salon.name }]} /></div>
      <SalonHero salon={salon} branchName={selectedBranch.name} location={selectedBranch.address} hours={selectedBranch.hours} phone={selectedBranch.phone} scheduleDays={selectedBranch.scheduleDays} image={selectedBranch.logo} whatsapp={selectedBranch.whatsapp} instagram={selectedBranch.instagram} facebook={selectedBranch.facebook} isFavorite={favoriteSalonIds.includes(salon.id)} onToggleFavorite={() => toggleSalonFavorite(salon.id)} onBook={book} />
      <SalonDetails salon={salon} branches={branches} selectedBranch={selectedBranch} onSelectBranch={setBranchId} />
      {gallery.length > 0 && <PhotoGallery images={gallery} title={ct("Fotoqalereya")} />}
      <SalonSpecialists specialists={specialists} />
      <ServiceList services={salon.services} onBook={book} />
      <LocalReviews subject={`salon-${salon.id}`} title={ct("Müştəri rəyləri")} />
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:hidden"><div><p className="text-[10px] font-bold text-slate-400">{ct("Başlanğıc qiymət:")}</p><strong className="text-base">{Math.min(...salon.services.map((service) => service.price))} ₼-dan</strong></div><button type="button" onClick={() => book()} className="h-11 rounded-xl bg-brand-primary px-8 text-xs font-black">{ct("Onlayn yazıl")}</button></div>
    </div>
  );
}
