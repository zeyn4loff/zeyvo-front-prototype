import type { ChangeEvent, RefObject } from "react";
import { Camera, X } from "lucide-react";
import type { BusinessSession } from "../auth/businessSession";
import type { BusinessProfile } from "./profile";
import { useLanguage } from "@/features/locale/language";

interface Props {
  session: BusinessSession;
  profile: BusinessProfile;
  fileInput: RefObject<HTMLInputElement | null>;
  onRemoveAvatar: () => void;
  onUploadAvatar: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileIdentityBanner({ session, profile, fileInput, onRemoveAvatar, onUploadAvatar }: Props) {
  const { language } = useLanguage();
  const labels = { az: { female: "Qadın", male: "Kişi", upload: "Profil şəkli yüklə", remove: "Profil şəklini sil", noPhone: "Mobil nömrə qeyd edilməyib" }, ru: { female: "Женщина", male: "Мужчина", upload: "Загрузить фото профиля", remove: "Удалить фото профиля", noPhone: "Номер телефона не указан" }, tr: { female: "Kadın", male: "Erkek", upload: "Profil fotoğrafı yükle", remove: "Profil fotoğrafını sil", noPhone: "Telefon numarası belirtilmedi" }, en: { female: "Woman", male: "Man", upload: "Upload profile photo", remove: "Remove profile photo", noPhone: "Mobile number not provided" } }[language];
  const initials = session.ownerName.split(" ").map((part) => part[0]).join("").slice(0, 2).toLocaleUpperCase("az-AZ");
  return <section className="flex min-w-0 items-center gap-4 rounded-2xl border border-black/10 bg-gradient-to-r from-[#1f2024] via-[#2a2b30] to-[#121316] p-4 text-white shadow-md sm:p-5">
    <div className="relative shrink-0">
      <button type="button" onClick={() => fileInput.current?.click()} aria-label={labels.upload} className="flex size-16 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-brand-primary/60 bg-white/10 text-xl font-black text-brand-primary">
        {profile.avatar ? <img src={profile.avatar} alt={session.ownerName} className="size-full object-cover" /> : initials}
      </button>
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-[#1f2024] bg-brand-primary text-slate-900"><Camera size={14} /></span>
      {profile.avatar && <button type="button" onClick={onRemoveAvatar} aria-label={labels.remove} className="absolute -right-1.5 -top-1.5 flex size-5 cursor-pointer items-center justify-center rounded-full border-2 border-[#1f2024] bg-rose-500 text-white"><X size={12} /></button>}
      <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp" onChange={onUploadAvatar} className="sr-only" tabIndex={-1} />
    </div>
    <div className="min-w-0">
      <div className="flex min-w-0 flex-wrap items-center gap-1.5"><h2 className="max-w-full truncate text-base font-bold tracking-tight sm:text-lg">{session.ownerName}</h2>{profile.gender && <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-black text-white ${profile.gender === "female" ? "bg-pink-500/80" : "bg-blue-500/80"}`}>{profile.gender === "female" ? labels.female : labels.male}</span>}</div>
      <p className="mt-0.5 truncate text-[11px] font-medium text-slate-400">{session.phone || labels.noPhone}</p>
    </div>
  </section>;
}
