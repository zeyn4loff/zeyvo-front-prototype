import { useEffect, useState } from "react";
import { toastEvent, type ToastDetail } from "./toast";

export default function ToastViewport() {
  const [toast, setToast] = useState<(ToastDetail & { id: number }) | null>(null);
  useEffect(() => {
    function onToast(event: Event) {
      const detail = (event as CustomEvent<ToastDetail>).detail;
      setToast({ ...detail, id: Date.now() });
    }
    window.addEventListener(toastEvent, onToast);
    return () => window.removeEventListener(toastEvent, onToast);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);
  return <div className="pointer-events-none fixed inset-x-4 bottom-20 z-[9999] flex justify-end sm:inset-x-auto sm:bottom-6 sm:right-6" aria-live="polite" aria-atomic="true">
    {toast && <div key={toast.id} role={toast.tone === "error" ? "alert" : "status"} className="flex max-w-full items-center gap-3 rounded-2xl border border-white/10 bg-[#101114] px-4 py-3 text-xs font-semibold text-slate-100 shadow-2xl sm:max-w-sm"><span className={`size-2 shrink-0 rounded-full ${toast.tone === "error" ? "bg-rose-400" : "bg-emerald-400"}`} /><span className="min-w-0 break-words">{toast.message}</span></div>}
  </div>;
}
