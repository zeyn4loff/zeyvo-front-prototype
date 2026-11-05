import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function BusinessHeaderButton({ children, className = "", type = "button", variant = "primary", ...props }: Props) {
  return <button
    {...props}
    type={type}
    className={`inline-flex min-h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-4 text-xs font-medium leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101114] disabled:cursor-not-allowed disabled:opacity-45 [&>svg]:size-4 [&>svg]:shrink-0 ${variant === "primary" ? "bg-brand-primary text-[#101114] hover:bg-[#b9dc65]" : "bg-slate-100 text-slate-800 hover:bg-slate-200"} ${className}`}
  >{children}</button>;
}
