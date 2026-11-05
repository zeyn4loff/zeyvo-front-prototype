import { Filter } from "lucide-react";

type Props = {
  onClick: () => void;
  count?: number;
};

/** Matches the shared filter button in the original partner UI. */
export default function BusinessFilterButton({ onClick, count = 0 }: Props) {
  const active = count > 0;
  return <button
    type="button"
    onClick={onClick}
    aria-label={active ? `Filtrlər, ${count} aktiv` : "Filtrlər"}
    className={`relative inline-flex h-11 min-w-[104px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-2xl border px-3.5 text-xs font-bold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101114] sm:px-4 ${active ? "border-[#101114] bg-[#101827] text-white" : "border-[#dbe1e8] bg-white text-slate-700 hover:border-[#101114]"}`}
  >
    <Filter size={16} aria-hidden="true" />
    <span>Filtrlər</span>
    {active && <span className="absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full border-2 border-white bg-brand-primary text-[9px] font-extrabold text-[#101114] sm:static sm:size-[22px] sm:border-0 sm:text-[10px]">{count}</span>}
  </button>;
}
