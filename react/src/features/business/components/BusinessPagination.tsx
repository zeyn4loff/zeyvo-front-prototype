type Props = {
  totalItems: number;
  currentPage: number;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  itemFromLabel: string;
  onPageChange: (page: number) => void;
};

/** Source prototype pagination, with a horizontally scrollable page rail on small screens. */
export default function BusinessPagination({ totalItems, currentPage, pageSize = 10, onPageSizeChange, itemFromLabel, onPageChange }: Props) {
  if (totalItems <= 0) return null;
  const pages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(1, currentPage), pages);
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);
  const numbers: (number | "…")[] = pages <= 7 ? Array.from({ length: pages }, (_, index) => index + 1)
    : page <= 3 ? [1, 2, 3, 4, "…", pages]
    : page >= pages - 2 ? [1, "…", pages - 3, pages - 2, pages - 1, pages]
    : [1, "…", page - 1, page, page + 1, "…", pages];
  const pageButton = (target: number, label: string, disabled = false, active = false) => <button key={`${label}-${target}`} type="button" disabled={disabled} aria-current={active ? "page" : undefined} onClick={() => onPageChange(target)} className={`inline-flex min-h-8 min-w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border px-2 text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${active ? "border-brand-primary bg-brand-primary text-[#101114]" : "border-[#e2e5eb] bg-white text-slate-700 hover:bg-slate-50"}`}>{label}</button>;

  return <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-4 py-3 text-xs">
    <div className="flex flex-wrap items-center gap-1 text-slate-500">Cəmi <strong className="text-[#101114]">{totalItems}</strong> {itemFromLabel} <strong className="text-[#101114]">{from}-{to}</strong> göstərilir{onPageSizeChange && <label className="ml-2 inline-flex items-center gap-1">Səhifədə: <select value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))} className="min-h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700">{[10, 25, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}</select></label>}</div>
    <nav aria-label="Səhifələr" className="flex max-w-full items-center gap-1 overflow-x-auto pb-1">
      {pageButton(page - 1, "‹ Əvvəlki", page === 1)}
      {numbers.map((number, index) => number === "…" ? <span key={`ellipsis-${index}`} className="px-1 text-slate-400">…</span> : pageButton(number, String(number), false, number === page))}
      {pageButton(page + 1, "Növbəti ›", page === pages)}
    </nav>
  </div>;
}
