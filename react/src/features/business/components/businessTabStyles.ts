// Match the compact segmented control used throughout the original partner UI.
const tabBase = "inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2";

export function businessTabClass(active: boolean) {
  return `${tabBase} ${active ? "bg-white text-[#101114] shadow-sm" : "text-slate-600 hover:bg-white/60"}`;
}
