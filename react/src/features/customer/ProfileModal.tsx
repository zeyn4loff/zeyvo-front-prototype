import { showToast as setNotice } from "../../components/common/toast";
import ModalCloseButton from "@/components/common/ModalCloseButton";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Camera, LogOut, UserRound, X } from "lucide-react";
import { useNavigate } from "react-router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getPublicSalons, getPublicSpecialists } from "@/features/marketplace/publicCatalog";
import { cities } from "@/features/location/cities";
import { useCustomer } from "./useCustomer";
import { ProfileBookings, ProfileFavorites } from "./ProfileSections";

type Tab = "info" | "bookings" | "favorites";
const inputClass = "mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-900 outline-none focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-primary/40";

export default function ProfileModal() {
  const { modal, closeModal, user, updateProfile, logout, bookings, favoriteSalonIds, favoriteMasterIds, cancelBooking, toggleSalonFavorite, toggleMasterFavorite, openBooking } = useCustomer();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("info");
  const [gender, setGender] = useState<"female" | "male" | null>(null);
  const [error, setError] = useState("");
  if (!user) return null;

  const favoriteSalons = getPublicSalons().filter((item) => favoriteSalonIds.includes(item.id));
  const favoriteMasters = getPublicSpecialists().filter((item) => favoriteMasterIds.includes(item.id));
  const favoriteCount = favoriteSalons.length + favoriteMasters.length;
  const selectedGender = gender ?? user.gender ?? null;
  function close() { setTab("info"); setGender(null); setError(""); setNotice(""); closeModal(); }
  function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 1_000_000) { setError("1 MB-dan kiçik şəkil seçin."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      updateProfile({ ...user!, avatar: reader.result });
      setNotice("Profil şəkli yeniləndi."); setError("");
    };
    reader.readAsDataURL(file);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateProfile({ ...user!, name: String(data.get("name") || "").trim(), city: String(data.get("city") || "Bakı"), gender: selectedGender || undefined });
    setGender(null); setError(""); setNotice("Profil məlumatları yeniləndi.");
  }
  const tabs: { id: Tab; label: string }[] = [
    { id: "info", label: "Məlumatlar" }, { id: "bookings", label: `Yazılarım (${bookings.length})` },
    { id: "favorites", label: `Seçilmişlər (${favoriteCount})` },
  ];

  return <Dialog open={modal === "profile"} onOpenChange={(open) => { if (!open) close(); }}>
    <DialogContent showCloseButton={false} overlayClassName="customer-overlay bg-black/60" className="customer-modal customer-sheet-motion fixed bottom-0 left-1/2 top-auto grid max-h-[92dvh] w-full max-w-none -translate-x-1/2 translate-y-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden rounded-b-none rounded-t-3xl p-5 sm:top-1/2 sm:bottom-auto sm:max-h-[90dvh] sm:max-w-xl sm:-translate-y-1/2 sm:rounded-3xl sm:p-7">
      <div><div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-300 sm:hidden" /><div className="flex items-center justify-between border-b border-slate-100 pb-3.5"><h2 className="text-lg font-black text-slate-900 sm:text-xl">Şəxsi kabinet</h2><ModalCloseButton onClick={close} /></div></div>
      <div className="min-h-0 space-y-4 overflow-y-auto py-3 [scrollbar-width:none]">
        <div className="flex items-center gap-3.5 rounded-2xl border border-black/10 bg-gradient-to-r from-[#1f2024] via-[#2a2b30] to-[#121316] p-4 text-white shadow-md">
          <div className="relative shrink-0"><label title="Foto yükləmək üçün klikləyin" className="flex size-14 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-brand-primary/60 bg-white/10 text-brand-primary">{user.avatar ? <img src={user.avatar} alt="Profil şəkli" className="size-full object-cover" /> : <UserRound size={35} strokeWidth={1.7} />}<input type="file" accept="image/*" onChange={upload} className="sr-only" aria-label="Profil şəklini yüklə" /></label><span className="pointer-events-none absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-[#1f2024] bg-brand-primary text-slate-900"><Camera size={13} /></span>{user.avatar && <button type="button" onClick={() => { updateProfile({ ...user, avatar: undefined }); setNotice("Profil şəkli silindi."); }} title="Şəkli sil" aria-label="Profil şəklini sil" className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border-2 border-[#1f2024] bg-rose-500 text-white"><X size={11} /></button>}</div>
          <div className="min-w-0"><div className="flex items-center gap-1.5"><strong className="truncate text-base font-black">{user.name}</strong>{user.gender && <span className={`rounded px-1.5 py-0.5 text-[10px] font-black ${user.gender === "female" ? "bg-pink-500/80" : "bg-blue-500/80"}`}>{user.gender === "female" ? "Qadın" : "Kişi"}</span>}</div><p className="mt-0.5 truncate text-xs font-medium text-slate-300">{user.phone}</p></div>
        </div>
        <div className="overflow-x-auto [scrollbar-width:none]"><div role="tablist" aria-label="Profil bölmələri" className="mx-auto flex w-max gap-1 rounded-xl bg-slate-100 p-1">{tabs.map((item) => <button key={item.id} role="tab" aria-selected={tab === item.id} type="button" onClick={() => { setTab(item.id); setError(""); setNotice(""); }} className={`min-w-max rounded-lg px-3 py-2 text-xs transition ${tab === item.id ? "bg-white font-black text-slate-900 shadow-sm" : "font-bold text-slate-500 hover:text-slate-900"}`}>{item.label}</button>)}</div></div>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-2 text-xs font-semibold text-red-700">{error}</p>}
        {tab === "info" && <form id="profile-info-form" key={user.phone} onSubmit={submit} className="space-y-3">
          <fieldset><legend className="mb-1.5 text-xs font-bold text-slate-500">Cins</legend><div className="grid grid-cols-2 gap-2">{(["female", "male"] as const).map((value) => <button key={value} type="button" aria-pressed={selectedGender === value} onClick={() => setGender(value)} className={`h-10 rounded-xl px-3 text-xs font-bold transition ${selectedGender === value ? value === "female" ? "border-2 border-pink-500 bg-pink-50 text-pink-700" : "border-2 border-blue-600 bg-blue-50 text-blue-700" : "border border-slate-200 bg-slate-50 text-slate-600"}`}>{value === "female" ? "Qadın" : "Kişi"}</button>)}</div></fieldset>
          <label className="block text-xs font-bold text-slate-500">Ad və Soyad<input name="name" defaultValue={user.name} required className={inputClass} /></label>
          <div className="text-xs font-bold text-slate-500">Təsdiqlənmiş mobil nömrə<div className={`${inputClass} mt-1 flex items-center`}>{user.phone}</div><p className="mt-1 font-normal">Nömrəni dəyişmək üçün dəstək xidmətinə müraciət edin.</p></div>
          <label className="block text-xs font-bold text-slate-500">Şəhər<select name="city" defaultValue={user.city || "Bakı"} className={inputClass}>{cities.map((city) => <option key={city.name} value={city.name}>{city.name}</option>)}</select></label>
          <button type="submit" className="h-10 w-full rounded-xl bg-brand-primary text-xs font-black text-slate-900 hover:bg-[#b9dc65]">Dəyişiklikləri yadda saxla</button>
        </form>}
        {tab === "bookings" && <ProfileBookings bookings={bookings} onCancel={cancelBooking} onExplore={() => { close(); navigate("/catalog"); }} />}
        {tab === "favorites" && <ProfileFavorites salons={favoriteSalons} masters={favoriteMasters} onOpenSalon={(id) => { close(); navigate(`/salon/${id}`); }} onOpenMaster={(id) => { close(); navigate(`/master/${id}`); }} onBook={openBooking} onRemoveSalon={toggleSalonFavorite} onRemoveMaster={toggleMasterFavorite} />}
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 pt-3"><button type="button" onClick={logout} className="inline-flex items-center gap-1.5 rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-600"><LogOut size={16} /> Hesabdan çıxış</button><button type="button" onClick={close} className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600">Bağla</button></div>
    </DialogContent>
  </Dialog>;
}
