import { formatPhone } from "./formatPhone";
import { useTranslations } from "@/features/locale/language";

export default function PhoneField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { t } = useTranslations();
  return <label className="block space-y-1 text-xs font-semibold text-slate-600">
    <span>{t("phone")}</span>
    <span className="flex h-11 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/30">
      <span className="flex shrink-0 items-center gap-2 border-r border-slate-200 bg-slate-100 px-3 text-sm font-bold text-primary" aria-hidden="true">
        <svg viewBox="0 0 120 60" className="h-4 w-6 rounded-[2px] shadow-sm" role="img" aria-label="Azərbaycan bayrağı">
          <rect width="120" height="20" fill="#00B5E2" /><rect y="20" width="120" height="20" fill="#EF3340" /><rect y="40" width="120" height="20" fill="#509E2F" />
          <circle cx="56" cy="30" r="10" fill="white" /><circle cx="60" cy="30" r="8" fill="#EF3340" /><path d="m75 21 2 6 6-2-4 5 4 5-6-2-2 6-2-6-6 2 4-5-4-5 6 2Z" fill="white" />
        </svg>
        +994
      </span>
      <input name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" required value={value} onChange={(event) => onChange(formatPhone(event.target.value))} maxLength={15} placeholder="(50) 000-00-00" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-medium text-primary outline-none placeholder:text-slate-400" />
    </span>
  </label>;
}
