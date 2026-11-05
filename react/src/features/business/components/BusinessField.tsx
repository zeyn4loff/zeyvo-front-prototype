import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";

/** Shared sizing and focus treatment for business form controls. */
export const businessControlClass = "mt-1.5 min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-primary/40";
export const businessTextareaClass = `${businessControlClass} h-auto resize-none py-3 font-normal leading-relaxed`;
export const businessLabelClass = "block min-w-0 text-xs font-medium text-slate-700";

export function BusinessField({ label, children, className }: { label: ReactNode; children: ReactNode; className?: string }) {
  return <label className={cn(businessLabelClass, className)}>{label}{children}</label>;
}

export function BusinessInput({ className, ...props }: ComponentProps<"input">) {
  return <input {...props} className={cn(businessControlClass, className)} />;
}

export function BusinessTextarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(businessTextareaClass, className)} />;
}

export function BusinessSelect({ className, ...props }: ComponentProps<"select">) {
  return <select {...props} className={cn(businessControlClass, "cursor-pointer", className)} />;
}
