import { useState } from "react";
import { DoorOpen, Sparkles, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCustomerText } from "@/features/locale/customerText";
import { useTranslations } from "@/features/locale/language";

interface Photo { src: string; label: string; type?: "interior" | "works" }

export default function PhotoGallery({ images, title }: { images: Photo[]; title: string }) {
  const ct = useCustomerText();
  const { t } = useTranslations();
  const [active, setActive] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "interior" | "works">("all");
  if (!images.length) return null;
  const visible = filter === "all" ? images : images.filter((image) => image.type === filter);
  return <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
    <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><div className="flex items-center gap-2"><h2 className="text-lg font-black">{ct(title)}</h2><span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold">{visible.length} foto</span></div><p className="mt-1 text-xs text-slate-400">Məkanın ab-havası və ustaların işləri</p></div>{images.some((image) => image.type) && <div className="flex max-w-full shrink-0 gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1 [scrollbar-width:none]">{([["all", "Hamısı"], ["interior", "İnteryer"], ["works", "İş nümunələri"]] as const).map(([key, label]) => <button key={key} type="button" aria-pressed={filter === key} onClick={() => { setFilter(key); setActive(null); }} className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold ${filter === key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{key === "interior" && <DoorOpen size={14} />}{key === "works" && <Sparkles size={14} />}{key === "all" ? t("all") : ct(label)}</button>)}</div>}</div>
    <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scroll-smooth">{visible.map((image, index) => <button key={image.src} type="button" onClick={() => setActive(index)} className="relative w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl text-left sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-2.25rem)/4)]"><img src={image.src} alt={image.label} className="aspect-[4/3] w-full object-cover" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs font-semibold text-white sm:text-sm">{image.label}</span><ZoomIn size={17} className="absolute bottom-3 right-3 rounded-lg bg-black/40 p-0.5 text-white" /></button>)}</div>
    <Dialog open={active !== null} onOpenChange={(open) => { if (!open) setActive(null); }}><DialogContent className="max-w-3xl overflow-hidden rounded-2xl p-3"><DialogTitle className="sr-only">{title}</DialogTitle>{active !== null && visible[active] && <><img src={visible[active].src} alt={visible[active].label} className="max-h-[75vh] w-full object-contain" /><div className="flex items-center justify-between gap-3 px-2 pb-2 text-sm"><button type="button" onClick={() => setActive((active - 1 + visible.length) % visible.length)} disabled={visible.length < 2} className="rounded-lg bg-slate-100 px-3 py-2 disabled:opacity-40">{ct("Əvvəlki")}</button><span>{active + 1} / {visible.length}</span><button type="button" onClick={() => setActive((active + 1) % visible.length)} disabled={visible.length < 2} className="rounded-lg bg-slate-100 px-3 py-2 disabled:opacity-40">{ct("Növbəti")}</button></div></>}</DialogContent></Dialog>
  </section>;
}
