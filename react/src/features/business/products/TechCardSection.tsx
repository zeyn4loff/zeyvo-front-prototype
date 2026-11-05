import { useState } from "react";
import { FileText, Search, Wrench } from "lucide-react";
import EmptyState from "../../../components/common/EmptyState";
import { RowActions } from "./ProductList";
import type { Product, TechCard } from "./products";

export default function TechCardSection({ cards, products, services, onCreate, onEdit, onDelete }: {
  cards: TechCard[];
  products: Product[];
  services: { id: string; name: string }[];
  onCreate: () => void;
  onEdit: (card: TechCard) => void;
  onDelete: (card: TechCard) => void;
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("az-AZ");
  const visible = cards.filter((card) => {
    const service = services.find((item) => item.id === card.serviceId);
    return `${card.name} ${service?.name ?? ""} ${card.note}`.toLocaleLowerCase("az-AZ").includes(normalizedQuery);
  });

  return <section className="space-y-5">
    <label className="relative block">
      <Search size={17} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <span className="sr-only">Texnoloji kartları axtar</span>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Texnoloji kart və ya xidmət adı ilə axtarın..." className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-brand-primary/40" />
    </label>
    {visible.length ? <div className="grid gap-4 lg:grid-cols-2">
      {visible.map((card) => {
        const ingredients = card.items?.length ? card.items : card.productId ? [{ productId: card.productId, quantity: card.quantity }] : [];
        const cost = ingredients.reduce((sum, ingredient) => sum + (products.find((item) => item.id === ingredient.productId)?.cost ?? 0) * ingredient.quantity, 0);
        const service = services.find((item) => item.id === card.serviceId);
        return <article key={card.id} className="flex min-w-0 flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 sm:p-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0"><h3 className="break-words text-sm font-bold text-slate-900">{card.name}</h3>
                <span className="mt-1 inline-flex max-w-full items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900"><Wrench size={12} className="shrink-0 text-amber-600" /><span className="truncate">{service?.name ?? "Xidmət təyin edilməyib"}</span></span>
              </div>
              <RowActions edit={() => onEdit(card)} remove={() => onDelete(card)} />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-slate-500">Sərfiyyat tərkibi ({ingredients.length} növ məhsul)</p>
              <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70">
                {ingredients.map((ingredient) => {
                  const product = products.find((item) => item.id === ingredient.productId);
                  return <li key={ingredient.productId} className="flex items-start justify-between gap-2 px-3 py-2 text-xs"><span className="min-w-0 break-words font-medium text-slate-800">{product?.name ?? "Silinmiş məhsul"}</span><span className="shrink-0 font-semibold text-slate-500">{ingredient.quantity} {product?.unit ?? "ədəd"}</span></li>;
                })}
              </ul>
            </div>
            {card.note && <p className="text-[11px] leading-relaxed text-slate-500"><strong className="text-slate-700">Qeyd:</strong> {card.note}</p>}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs"><span className="text-slate-500">Xidmət üzrə sərfiyyat maya dəyəri:</span><strong className="rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1 font-black text-slate-900">{cost.toFixed(2)} ₼</strong></div>
        </article>;
      })}
    </div> : <EmptyState icon={FileText} title="Texnoloji kart tapılmadı" description={normalizedQuery ? "Axtarışa uyğun kart yoxdur." : "Xidmətlər üçün material sərfiyyat normasını müəyyən etmək üçün yeni kart əlavə edin"} actionLabel={!normalizedQuery ? "Yeni texnoloji kart əlavə et" : undefined} onAction={onCreate} />}
  </section>;
}
