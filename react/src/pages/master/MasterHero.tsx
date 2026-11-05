import { Link } from "react-router";
import { Heart, MapPin, Star } from "lucide-react";
import type { Salon, Specialist } from "@/features/marketplace/data";
import { useCustomerText } from "@/features/locale/customerText";
import { useTranslations } from "@/features/locale/language";

interface Props {
  master: Specialist;
  salon?: Salon;
  location?: string;
  hasBooking?: boolean;
  hasSlots?: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBook: () => void;
}

export default function MasterHero({ master, salon, location, hasBooking, hasSlots, isFavorite, onToggleFavorite, onBook }: Props) {
  const ct = useCustomerText();
  const { t } = useTranslations();
  return (
    <section className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-7">
      <div className="relative w-fit shrink-0 self-start"><img src={master.photo} alt={master.name} className="size-20 rounded-2xl object-cover sm:size-24" />{hasSlots ? <span className="absolute bottom-1 right-1 size-3.5 rounded-full border-2 border-white bg-emerald-500" aria-label={ct("Boş saatlar var")} /> : null}</div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold sm:text-3xl">{master.name}</h1>{hasSlots ? <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">● {ct("Boş saatlar var")}</span> : null}</div>
        <p className="mt-1 text-sm font-semibold text-slate-600">{master.title}{master.experience && <span className="font-normal"> · {master.experience}</span>}</p>
        {salon && <Link to={`/salon/${salon.id}`} className="mt-2 flex items-center gap-1 text-xs font-semibold hover:underline"><MapPin size={14} />{salon.name} <span className="font-normal text-slate-400">({location || salon.location}) →</span></Link>}
        {!salon && location && <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-slate-600"><MapPin size={14} />{location}</p>}
        <p className="mt-3 flex items-center gap-1 text-sm font-bold">{master.rating ? <><span>{master.rating}</span>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} className={index < Math.round(master.rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"} />)}</> : <span className="font-normal text-slate-500">{ct("Hələ rəy yoxdur")}</span>}</p>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={onToggleFavorite} aria-pressed={isFavorite} aria-label={isFavorite ? t("removeFavorite") : t("addFavorite")} className="flex size-10 items-center justify-center rounded-xl border border-slate-200"><Heart size={18} className={isFavorite ? "fill-rose-500 text-rose-500" : ""} /></button>
        {hasBooking && <button type="button" onClick={onBook} className="min-h-10 rounded-xl bg-brand-primary px-5 py-2 text-sm font-semibold">{ct("Qəbula yazıl")}</button>}
      </div>
    </section>
  );
}
