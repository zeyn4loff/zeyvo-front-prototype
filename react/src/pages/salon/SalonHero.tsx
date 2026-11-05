import { Heart, MapPin, Phone, Star } from "lucide-react";
import type { Salon } from "@/features/marketplace/data";
import SocialIcon from "@/features/marketplace/components/SocialIcon";
import { useCustomerText } from "@/features/locale/customerText";
import { useTranslations } from "@/features/locale/language";

interface Props {
  salon: Salon;
  branchName?: string;
  location?: string;
  hours?: string;
  phone?: string;
  scheduleDays?: Record<string, { isOff: boolean; open: string; close: string }>;
  image?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBook: () => void;
}

function getOpenStatus(hours?: string, scheduleDays?: Props["scheduleDays"]) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Baku", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const time = `${parts.find((part) => part.type === "hour")?.value}:${parts.find((part) => part.type === "minute")?.value}`;
  const match = hours?.match(/(\d{2}:\d{2})\s*[–-]\s*(\d{2}:\d{2})/);
  if (scheduleDays && weekday) {
    const key = weekday.toLocaleLowerCase("en");
    const day = scheduleDays[key];
    return !!day && !day.isOff && time >= day.open && time < day.close;
  }
  return weekday !== "Sun" && !!match && time >= match[1] && time < match[2];
}

export default function SalonHero({ salon, branchName, location, hours, phone, scheduleDays, image, whatsapp, instagram: branchInstagram, facebook, isFavorite, onToggleFavorite, onBook }: Props) {
  const ct = useCustomerText();
  const { t } = useTranslations();
  const open = getOpenStatus(hours || salon.workHours, scheduleDays);
  const contactPhone = phone?.trim() || salon.contact?.phone?.trim() || "";
  const digits = contactPhone.replace(/\D/g, "");
  const instagram = branchInstagram ? `https://instagram.com/${branchInstagram.replace(/^@|^https?:\/\/(www\.)?instagram\.com\//, "")}` : salon.contact?.instagram;
  const facebookUrl = facebook ? `https://facebook.com/${facebook.replace(/^https?:\/\/(www\.)?facebook\.com\//, "")}` : undefined;
  const whatsappDigits = (whatsapp || "").replace(/\D/g, "");
  const socialLinks = [
    { type: "instagram" as const, href: instagram, color: "bg-pink-50 text-pink-600 hover:bg-pink-100" },
    { type: "facebook" as const, href: facebookUrl, color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
    { type: "whatsapp" as const, href: whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined, color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" },
  ].filter((item) => item.href);
  return <section className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 md:flex-row md:items-center">
    <div className="flex min-w-0 flex-1 flex-col items-start gap-4 sm:flex-row">
      <img src={image || salon.image} alt={salon.name} className="h-36 w-full shrink-0 rounded-2xl border border-slate-200 object-cover shadow-sm sm:size-20" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2"><h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl md:text-3xl">{salon.name}</h1><span className={`rounded-lg border px-2 py-0.5 text-[10px] font-extrabold ${open ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>{open ? ct("Açıqdır") : ct("Bağlıdır")}</span></div>
        <p className="mt-1 flex items-start gap-1 text-xs font-medium text-slate-500"><MapPin size={14} className="mt-px shrink-0 text-slate-400" />{branchName && branchName !== salon.name ? `${branchName} · ` : ""}{location || salon.location}</p>
        {(digits || socialLinks.length > 0) && <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
          {digits && <a href={`tel:+${digits}`} className="inline-flex items-center gap-1 font-semibold text-slate-600"><Phone size={14} className="text-slate-400" />{contactPhone}</a>}
          {socialLinks.length > 0 && <div className="flex items-center gap-1.5" aria-label="Sosial şəbəkələr">{socialLinks.map(({ type, href, color }) => <a key={type} href={href} target="_blank" rel="noopener noreferrer" aria-label={type} className={`flex size-7 items-center justify-center rounded-lg ${color}`}><SocialIcon type={type} /></a>)}</div>}
        </div>}
        <div className="mt-2.5 flex items-center gap-1">{salon.reviewsCount ? <><strong className="text-sm">{salon.rating}</strong><span className="flex gap-0.5 text-amber-400">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={12} fill={index < Math.round(salon.rating) ? "currentColor" : "none"} />)}</span><span className="text-xs text-slate-400">({salon.reviewsCount})</span></> : <span className="text-xs text-slate-500">{ct("Hələ rəy yoxdur")}</span>}</div>
      </div>
    </div>
    <div className="hidden shrink-0 items-center gap-2 sm:flex"><button type="button" onClick={onToggleFavorite} aria-label={isFavorite ? t("removeFavorite") : t("addFavorite")} aria-pressed={isFavorite} className="flex size-10 items-center justify-center rounded-xl border border-slate-200"><Heart size={18} className={isFavorite ? "fill-rose-500 text-rose-500" : ""} /></button><button type="button" onClick={onBook} className="h-10 rounded-xl bg-brand-primary px-6 text-xs font-black">{ct("Onlayn yazıl")}</button></div>
  </section>;
}
