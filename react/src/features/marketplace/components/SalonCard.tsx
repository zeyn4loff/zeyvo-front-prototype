import { Heart, Scissors, Sparkles, Star, HeartPulse, CarFront, Dumbbell, GraduationCap } from "lucide-react";
import { Link } from "react-router";
import { categories, type Salon } from "@/features/marketplace/data";
import { categoryName, useTranslations } from "@/features/locale/language";

interface Props {
  item: Salon;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const categoryStyles: Record<string, { background: string; icon: typeof Sparkles }> = {
  hair: { background: "bg-[#E9E8E7]", icon: Scissors },
  barber: { background: "bg-[#E9E8E7]", icon: Scissors },
  cosmetology: { background: "bg-[#DFF4F6]", icon: Sparkles },
  lashes: { background: "bg-[#F6E9EF]", icon: Sparkles },
  brows: { background: "bg-[#F6E9EF]", icon: Sparkles },
  nails: { background: "bg-[#FCECE7]", icon: Sparkles },
  makeup: { background: "bg-[#F4EAF8]", icon: Sparkles },
  tattoo: { background: "bg-[#EEE9E5]", icon: Sparkles },
  laser: { background: "bg-[#DFF4F6]", icon: Sparkles },
  spa: { background: "bg-[#E8F2EC]", icon: Sparkles },
  health: { background: "bg-[#E5F3F0]", icon: HeartPulse },
  auto: { background: "bg-[#E8EEF5]", icon: CarFront },
  sport: { background: "bg-[#EDF0E8]", icon: Dumbbell },
  education: { background: "bg-[#F0EBF7]", icon: GraduationCap },
};

export default function SalonCard({ item, isFavorite, onToggleFavorite }: Props) {
  const { language, t } = useTranslations();
  const startingPrice = item.services.length ? Math.min(...item.services.map((service) => service.price)) : null;
  const fallback = categories.find((category) => category.id === item.topCategory)?.subcategories.find((subcategory) => subcategory.id === item.category)?.azName || item.tag;
  const categoryLabel = categoryName(language, item.category, fallback);
  const area = item.location.match(/\(m\.\s*([^)]+)\)/)?.[1] || item.city || "Bakı";
  const style = categoryStyles[item.category] || categoryStyles[item.topCategory] || { background: "bg-[#EDF1E4]", icon: Sparkles };
  const Icon = style.icon;

  return <article className="group relative min-w-0">
    <Link to={`/salon/${item.id}`} className="block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" aria-label={`${item.name} — ${t("details")}`}>
      <div className={`relative flex aspect-[1.45] items-center justify-center overflow-hidden rounded-3xl ${style.background} transition-transform duration-200 group-hover:-translate-y-0.5`}>
        <Icon size={76} strokeWidth={1.35} className="text-primary/15" aria-hidden="true" />
        {item.image && <img src={item.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />}
        <span className="absolute bottom-3 left-3 max-w-[calc(100%-5rem)] truncate rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">{categoryLabel}</span>
      </div>
      <div className="pt-3">
        <div className="flex min-w-0 items-start justify-between gap-2"><h3 className="min-w-0 line-clamp-2 text-base font-bold leading-snug text-primary">{item.name}</h3>{item.reviewsCount > 0 && <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary"><Star size={13} className="fill-amber-400 text-amber-500" />{item.rating}</span>}</div>
        <p className="mt-1 truncate text-sm text-slate-600">{area} · {categoryLabel}</p>
        {startingPrice !== null && <p className="mt-2 text-sm text-slate-600">{t("startingAt")} <strong className="font-bold text-primary">{startingPrice} ₼</strong></p>}
      </div>
    </Link>
    <button type="button" onClick={onToggleFavorite} aria-label={isFavorite ? t("removeFavorite") : t("addFavorite")} aria-pressed={isFavorite} className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm hover:text-rose-500"><Heart size={20} className={isFavorite ? "fill-rose-500 text-rose-500" : ""} /></button>
  </article>;
}
