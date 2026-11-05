import { useState } from "react";
import { formatPhone } from "@/lib/formatPhone";

type Props = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
};

function fullPhone(value: string) {
  const local = formatPhone(value);
  return local ? `+994 ${local}` : "";
}

/** The same +994 control used by the source prototype; form values keep the full number. */
export default function AzPhoneInput({ name, value, defaultValue = "", onValueChange, required }: Props) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const displayed = formatPhone(value === undefined ? localValue : value);

  return <span className="mt-1.5 flex h-11 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-slate-900 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-primary/40">
    <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-2 border-r border-[#dbe4ee] bg-slate-100 px-3 text-xs font-extrabold text-[#101114]">
      <svg viewBox="0 0 120 60" className="h-[14px] w-5 rounded-[2px] border border-slate-200" aria-hidden="true"><rect width="120" height="20" fill="#00B5E2" /><rect y="20" width="120" height="20" fill="#EF3340" /><rect y="40" width="120" height="20" fill="#509E2F" /><circle cx="56" cy="30" r="10" fill="white" /><circle cx="60" cy="30" r="8" fill="#EF3340" /></svg>
      +994
    </span>
    <input type="tel" inputMode="tel" autoComplete="tel-national" maxLength={15} required={required} value={displayed} onChange={(event) => { const next = fullPhone(event.target.value); setLocalValue(next); onValueChange?.(next); }} placeholder="(50) 000-00-00" className="min-w-0 flex-1 bg-transparent px-3 text-xs font-semibold text-[#101114] outline-none placeholder:text-[#9aa4b4]" />
    {name && <input type="hidden" name={name} value={fullPhone(value === undefined ? localValue : value)} />}
  </span>;
}
