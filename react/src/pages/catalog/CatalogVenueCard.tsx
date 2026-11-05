import { Link } from "react-router";
import { ArrowUpRight, Heart, MapPin, Star } from "lucide-react";
import type { Salon } from "@/features/marketplace/data";
import { categories } from "@/features/marketplace/data";
import { categoryName, useTranslations } from "@/features/locale/language";

interface Props { item: Salon; isFavorite: boolean; onToggleFavorite: () => void; onBook: () => void }

export default function CatalogVenueCard({ item, isFavorite, onToggleFavorite, onBook }: Props) {
  const { language, t } = useTranslations();
  const branches = item.branches?.length || 1;
  const startingPrice = item.services.length ? Math.min(...item.services.map((service) => service.price)) : null;
  const category = categories.find((entry) => entry.id === item.topCategory)?.subcategories.find((entry) => entry.id === item.category);
  const label = categoryName(language, item.category, category?.azName || item.tag);
  const area = item.location.match(/\(m\.\s*([^)]+)\)/)?.[1] || item.city || "Bakı";

  return <article className="group flex min-w-0 flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_30px_-24px_rgba(15,23,42,.55)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-24px_rgba(15,23,42,.5)]">
    <div className="relative aspect-[1.75] w-full overflow-hidden bg-[#e9eee8]">
      <Link to={`/salon/${item.id}`} aria-label={`${item.name} — ${t("details")}`} className="block size-full focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-primary">
        {item.image && <img src={item.image} alt="" loading="lazy" className="size-full object-cover transition duration-300 group-hover:scale-[1.03]" />}
      </Link>
      <span className="pointer-events-none absolute bottom-3 left-3 max-w-[calc(100%-5rem)] truncate rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-primary shadow-sm backdrop-blur-sm">{label}</span>
      <button type="button" onClick={onToggleFavorite} aria-label={isFavorite ? t("removeFavorite") : t("addFavorite")} aria-pressed={isFavorite} className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition hover:text-rose-500"><Heart size={19} className={isFavorite ? "fill-rose-500 text-rose-500" : ""} /></button>
    </div>
    <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-3"><Link to={`/salon/${item.id}`} className="min-w-0 text-base font-black leading-snug text-primary hover:underline sm:text-lg">{item.name}</Link>{item.reviewsCount > 0 && <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-primary"><Star size={13} className="fill-amber-400 text-amber-500" />{item.rating}</span>}</div>
      <p className="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs text-slate-500"><MapPin size={14} className="shrink-0" /><span className="truncate">{branches > 1 ? `${area} · ${branches} filial` : area}</span></p>
      {item.services[0] && <p className="mt-4 line-clamp-1 text-xs text-slate-600"><span className="font-bold text-slate-800">{item.services[0].name}</span>{item.services.length > 1 ? ` · +${item.services.length - 1}` : ""}</p>}
      <div className="mt-auto flex items-end justify-between gap-2 border-t border-slate-100 pt-4">
        <div className="min-w-0"><span className="block text-[11px] text-slate-500">{t("startingAt")}</span><strong className="text-lg font-black text-primary">{startingPrice !== null ? `${startingPrice} ₼` : "—"}</strong></div>
        {branches > 1 ? <Link to={`/salon/${item.id}`} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full bg-brand-primary px-4 text-xs font-black text-primary transition hover:bg-[#b9dc65]">Filial seç <ArrowUpRight size={16} /></Link> : <button type="button" onClick={onBook} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full bg-brand-primary px-4 text-xs font-black text-primary transition hover:bg-[#b9dc65]">Vaxt seç <ArrowUpRight size={16} /></button>}
      </div>
    </div>
  </article>;
}
