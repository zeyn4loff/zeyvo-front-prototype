import {Link} from "react-router";
import { useCustomer } from "@/features/customer/useCustomer";
import type {Master} from "@/types";
import { findSalonForSpecialist } from "@/features/marketplace/data";
import { getPublicSalons, getPublicSpecialists } from "@/features/marketplace/publicCatalog";
import {Heart, Star} from "lucide-react";

export function MasterCard({ master, detailed = false, showcase = false }: { master: Master; detailed?: boolean; showcase?: boolean }) {
    const { favoriteMasterIds, toggleMasterFavorite, openBooking } = useCustomer();
    const liked = favoriteMasterIds.includes(master.id);
    const specialist = getPublicSpecialists().find((item) => item.id === master.id);
    const salon = specialist ? getPublicSalons().find((item) => item.id === specialist.salonId) ?? findSalonForSpecialist(specialist) : undefined;

    if (showcase) return <article className="group relative min-w-0">
        <Link to={`/master/${master.id}`} className="block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" aria-label={`${master.name} — profilə bax`}>
            <div className="relative aspect-[1.45] overflow-hidden rounded-3xl bg-[#EBF0ED] transition-transform duration-200 group-hover:-translate-y-0.5">
                <img src={master.avatar} alt="" loading="lazy" className="size-full object-cover" />
                <span className="absolute bottom-3 left-3 max-w-[calc(100%-5rem)] truncate rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">{master.role}</span>
            </div>
            <div className="pt-3">
                <div className="flex min-w-0 items-start justify-between gap-2"><h3 className="min-w-0 line-clamp-2 text-base font-bold leading-snug text-primary">{master.name}</h3>{master.rating > 0 && <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary"><Star size={13} className="fill-amber-400 text-amber-500" />{master.rating}</span>}</div>
                <p className="mt-1 truncate text-sm text-slate-600">{salon?.isIndividual ? "Fərdi usta" : salon?.name || master.salon}</p>
            </div>
        </Link>
        <button type="button" aria-label={liked ? "Sevimlilərdən çıxar" : "Sevimlilərə əlavə et"} aria-pressed={liked} onClick={() => toggleMasterFavorite(master.id)} className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm hover:text-rose-500"><Heart size={20} className={liked ? "fill-rose-500 text-rose-500" : ""} /></button>
    </article>;

    if (detailed) return <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex min-w-0 gap-3"><Link to={`/master/${master.id}`} className="shrink-0"><img src={master.avatar} alt={master.name} className="size-14 rounded-xl object-cover" /></Link><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><Link to={`/master/${master.id}`} className="min-w-0 text-sm font-bold hover:underline">{master.name}</Link><span className="flex shrink-0 items-center gap-1 rounded-lg bg-slate-50 px-1.5 py-0.5 text-xs font-bold">{master.rating ? <><Star size={12} className="fill-amber-400 text-amber-400" />{master.rating}</> : "Yeni"}</span><button type="button" onClick={() => toggleMasterFavorite(master.id)} aria-label={liked ? "Sevimlilərdən çıxar" : "Sevimlilərə əlavə et"} aria-pressed={liked} className="shrink-0 text-slate-500"><Heart size={18} className={liked ? "fill-rose-500 text-rose-500" : ""} /></button></div><p className="mt-0.5 text-xs font-semibold text-slate-600">{master.role}</p><p className="truncate text-xs text-slate-400">{salon?.isIndividual ? "Fərdi usta" : `Məkan: ${salon?.name || master.salon}`}</p>{specialist?.experience && <p className="text-xs text-slate-400">{specialist.experience}</p>}</div></div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3"><Link to={`/master/${master.id}`} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold">Profilə bax</Link>{salon && specialist && <button type="button" onClick={() => openBooking(salon, specialist)} className="rounded-xl bg-brand-primary px-3 py-2 text-xs font-bold">Qəbula yazıl</button>}</div>
    </article>;
    return (
        <article className="flex w-full min-w-0 items-center gap-3 rounded-3xl border border-slate-100 bg-white p-3 shadow-sm sm:gap-4 sm:p-3.5">
            <img
                src={master.avatar}
                alt={master.name}
                className="size-[50px] shrink-0 rounded-2xl object-cover"
            />

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex min-w-0 items-start justify-between gap-2">
                    <h3 className="min-w-0 break-words text-[15px] font-semibold text-slate-900">
                        {master.name}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                        <span className="flex items-center gap-1 rounded-sm bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-800">
                            {master.rating ? <><Star className="size-3 fill-amber-400 text-amber-400" />{master.rating}</> : "Yeni"}
                        </span>
                        <button
                            type="button"
                            aria-label={liked ? "Sevimlilərdən çıxar" : "Sevimlilərə əlavə et"}
                            aria-pressed={liked}
                            onClick={() => toggleMasterFavorite(master.id)}
                            className="text-slate-500 transition-colors hover:text-rose-500"
                        >
                            <Heart
                                className={`size-[18px] ${liked ? "fill-rose-500 text-rose-500" : ""}`}
                            />
                        </button>
                    </div>
                </div>

                <p className="mt-0.5 text-[11px] text-slate-500">{master.role}</p>
                <p className="truncate text-[10px] text-slate-400">{salon?.isIndividual ? "Fərdi usta" : master.salon}</p>

                <div className="mt-1.5 flex flex-wrap items-center justify-between gap-1 text-xs font-semibold">
                    <Link
                        to={`/master/${master.id}`}
                        className="text-slate-500 hover:text-slate-800"
                    >
                        Profilə bax
                    </Link>
                    {salon && specialist && <button type="button" onClick={() => openBooking(salon, specialist)} className="text-slate-900 hover:underline">Qəbula yaz →</button>}
                </div>
            </div>
        </article>
    );
}
