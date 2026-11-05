import type { ReactNode } from "react";

type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const tones: Record<Tone, { badge: string; dot: string }> = {
  success: { badge: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  warning: { badge: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  danger: { badge: "border-rose-200 bg-rose-50 text-rose-700", dot: "bg-rose-500" },
  info: { badge: "border-blue-200 bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  neutral: { badge: "border-slate-200 bg-slate-50 text-slate-600", dot: "bg-slate-400" },
};

export default function BusinessStatusBadge({ children, tone, className = "" }: { children: ReactNode; tone: Tone; className?: string }) {
  const style = tones[tone];
  return <span className={`inline-flex w-fit max-w-full items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-semibold ${style.badge} ${className}`}>
    <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${style.dot}`} />
    <span>{children}</span>
  </span>;
}
