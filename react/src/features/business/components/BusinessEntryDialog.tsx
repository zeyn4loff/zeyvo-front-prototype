import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  extra?: ReactNode;
  width?: "confirm" | "compact" | "medium" | "large" | "profile" | "wide" | "extraWide";
  scrollContent?: boolean;
  bodyPadding?: boolean;
  open?: boolean;
  mobileSheet?: boolean;
  headerIcon?: ReactNode;
};

/** Shared frame for full business forms, with an independently scrolling body. */
export default function BusinessEntryDialog({ title, description, onClose, children, footer, extra, width = "medium", scrollContent = false, bodyPadding = true, open = true, mobileSheet = false, headerIcon }: Props) {
  return <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
    <DialogContent showCloseButton={false} overlayClassName="bg-black/60 backdrop-blur-xs" className={`business-dialog flex max-h-[calc(100vh-1rem)] w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden rounded-[28px] border border-slate-200 bg-white p-0 shadow-2xl sm:max-h-[92vh] sm:w-[calc(100%-2rem)] ${mobileSheet ? "max-sm:!top-auto max-sm:!bottom-0 max-sm:!translate-y-0 max-sm:!w-full max-sm:!rounded-b-none" : ""} ${width === "confirm" ? "max-w-sm sm:max-w-sm" : width === "compact" ? "max-w-md sm:max-w-md" : width === "large" ? "max-w-2xl sm:max-w-2xl" : width === "profile" ? "max-w-3xl sm:max-w-3xl" : width === "wide" ? "max-w-5xl sm:max-w-5xl" : width === "extraWide" ? "max-w-6xl sm:max-w-6xl" : "max-w-xl sm:max-w-xl"}`}>
      <header className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex min-w-0 items-center gap-3">{headerIcon}<div className="min-w-0"><DialogTitle className="break-words text-xl font-bold leading-tight text-slate-900">{title}</DialogTitle>{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}</div></div>
        <button type="button" onClick={onClose} aria-label="Bağla" className="z-ui-close shrink-0"><X size={18} /></button>
      </header>
      <div className={`min-h-0 flex-1 ${bodyPadding ? "px-5 py-5 sm:px-7 sm:py-6" : ""} ${scrollContent ? "flex flex-col overflow-hidden" : "overflow-y-auto"}`}>{children}</div>
      {footer && <footer className="flex shrink-0 justify-end gap-2 border-t border-slate-100 px-5 py-4 sm:px-7">{footer}</footer>}
    </DialogContent>
    {extra}
  </Dialog>;
}
