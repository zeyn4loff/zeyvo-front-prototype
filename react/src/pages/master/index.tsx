import { Link, useNavigate, useParams } from "react-router";
import Breadcrumbs from "@/features/marketplace/components/Breadcrumbs";
import BookingSlots from "@/features/marketplace/components/BookingSlots";
import ServiceList from "@/features/marketplace/components/ServiceList";
import { findSalonForSpecialist, type Service } from "@/features/marketplace/data";
import { useCustomer } from "@/features/customer/useCustomer";
import { getPublicSalons, getPublicSpecialists } from "@/features/marketplace/publicCatalog";
import { getPublicBranches } from "@/features/marketplace/publicDetails";
import MasterHero from "./MasterHero";
import PhotoGallery from "@/features/marketplace/components/PhotoGallery";
import LocalReviews from "@/features/marketplace/components/LocalReviews";
import EmptyState from "@/components/common/EmptyState";
import { Images, UserRoundSearch } from "lucide-react";
import { useCustomerText } from "@/features/locale/customerText";
import { useTranslations } from "@/features/locale/language";

export default function MasterPage() {
  const ct = useCustomerText();
  const { t } = useTranslations();
  const { id } = useParams();
  const navigate = useNavigate();
  const master = getPublicSpecialists().find((item) => item.id === Number(id));
  const { favoriteMasterIds, toggleMasterFavorite, openBooking } = useCustomer();

  if (!master) return <div className="container mx-auto px-4 py-8 sm:py-12"><EmptyState title={ct("Usta tapılmadı")} description={ct("Axtardığınız usta mövcud deyil.")} icon={UserRoundSearch} action={<Link to="/catalog" className="inline-flex min-h-11 items-center rounded-xl bg-brand-primary px-5 text-sm font-bold text-slate-900">{ct("Kataloqa qayıt")}</Link>} /></div>;

  const salon = getPublicSalons().find((item) => item.id === master.salonId) ?? findSalonForSpecialist(master);
  const linkedSalon = salon?.isIndividual ? undefined : salon;
  const workplaceBranch = linkedSalon ? getPublicBranches(linkedSalon).find((branch) => branch.id === master.partnerBranchId) : undefined;
  const book = (service?: Service) => { if (salon) openBooking(salon, master, service); };
  const portfolio = master.portfolio ?? [];

  return (
    <div className="container mx-auto space-y-4 px-4 py-5 pb-28 sm:space-y-6 sm:py-7">
      <div className="flex items-center gap-2"><button type="button" onClick={() => navigate(-1)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold sm:hidden">← {ct("Geri")}</button><Breadcrumbs items={[{ label: t("catalog"), to: "/catalog" }, { label: master.name }]} /></div>
      <MasterHero master={master} salon={linkedSalon} location={workplaceBranch?.address || (salon?.isIndividual ? salon.location : undefined)} hasBooking={!!salon} hasSlots={!!linkedSalon?.slots.length} isFavorite={favoriteMasterIds.includes(master.id)} onToggleFavorite={() => toggleMasterFavorite(master.id)} onBook={book} />
      <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-5">
          {(master.bio || !salon?.isIndividual) && <section className="rounded-3xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold">{ct("Usta haqqında")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{master.bio || `${master.name} — ${master.experience ? `${master.experience}yə malik` : "təcrübəli"} peşəkar mütəxəssisdir. Hər bir müştəriyə fərdi yanaşır, ən son trendləri və gigiyena standartlarını tətbiq edir.`}</p>
          </section>}
          {linkedSalon && <>
            <section className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold">{ct("İşlədiyi məkan")}</h2><Link to={`/salon/${linkedSalon.id}`} className="text-xs font-semibold underline">{ct("Məkana bax →")}</Link></div>
              <Link to={`/salon/${linkedSalon.id}`} className="mt-4 flex min-w-0 items-center gap-3 rounded-2xl bg-slate-50 p-3"><img src={workplaceBranch?.logo || linkedSalon.image} alt="" className="size-14 shrink-0 rounded-xl object-cover" /><span className="min-w-0"><strong className="block break-words text-sm">{linkedSalon.name}</strong>{workplaceBranch && <span className="block text-xs font-medium text-slate-600">{workplaceBranch.name}</span>}<span className="text-xs text-slate-500">{workplaceBranch?.address || linkedSalon.location}</span></span></Link>
            </section>
          </>}
          {salon && <ServiceList services={master.services ?? salon.services} onBook={book} />}
          {portfolio.length ? <div><PhotoGallery images={portfolio} title="Portfolio" /></div> : <EmptyState title={ct("İş nümunələri hələ əlavə edilməyib")} icon={Images} />}
          <LocalReviews subject={`master-${master.id}`} title={ct("Rəylər")} />
        </div>
        {linkedSalon && <BookingSlots slots={linkedSalon.slots} title={ct("Ustanın qəbuluna yazıl")} description={ct("Zəng etmədən boş vaxtı seçin")} buttonLabel={ct("Qəbula yazıl →")} onBook={book} onSlotClick={(time, date) => openBooking(linkedSalon, master, undefined, time, undefined, date)} />}
        {salon?.isIndividual && <aside className="rounded-3xl border border-slate-200 bg-white p-5 lg:sticky lg:top-5"><p className="text-xs font-semibold text-slate-400">{ct("Onlayn rezervasiya")}</p><h2 className="mt-1 font-bold">{ct("Birbaşa ustaya yazılın")}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{ct("Xidməti seçin və ustanın iş qrafikindəki boş vaxtlara baxın.")}</p><button type="button" onClick={() => book()} className="mt-5 min-h-11 w-full rounded-xl bg-brand-primary px-4 text-sm font-bold">{ct("Vaxt seç")}</button></aside>}
      </div>
    </div>
  );
}
