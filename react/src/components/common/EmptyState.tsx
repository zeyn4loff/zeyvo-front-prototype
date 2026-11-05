import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ClipboardList } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
};

export default function EmptyState({ title, description, icon: Icon = ClipboardList, actionLabel, onAction, action, compact = false, className = "" }: Props) {
  return <div className={`flex w-full flex-col items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white px-4 text-center shadow-sm ${compact ? "min-h-44 py-7 sm:py-9" : "min-h-64 py-10 sm:py-14"} ${className}`}>
    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 sm:size-16"><Icon size={28} strokeWidth={1.8} /></span>
    <h3 className="mt-4 max-w-full break-words text-base font-bold text-slate-900 sm:text-lg">{title}</h3>
    {description && <p className="mt-2 max-w-xl break-words text-sm text-slate-400 sm:text-base">{description}</p>}
    {(action || (actionLabel && onAction)) && <div className="mt-5 flex max-w-full flex-wrap justify-center gap-2 [&_a]:font-medium [&_button]:font-medium">{action ?? <button type="button" onClick={onAction} className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 text-sm font-medium text-slate-900 transition hover:brightness-95 active:scale-[0.98]">{actionLabel}</button>}</div>}
  </div>;
}
