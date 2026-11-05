import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { languageOptions, useLanguage, type Language } from "@/features/locale/language";

export default function LanguageIndicator() {
  const { language, setLanguage } = useLanguage();
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const current = languageOptions.find((item) => item.code === language)!;
  return <label className="relative flex h-9 shrink-0 items-center gap-1 rounded-xl px-1.5 text-xs font-semibold text-primary transition hover:bg-black/10 focus-within:ring-2 focus-within:ring-black/30 sm:px-2.5">
    <span aria-hidden="true" className="text-base leading-none">{current.flag}</span>
    <span aria-hidden="true">{language.toUpperCase()}</span>
    <ChevronDown aria-hidden="true" size={12} />
    <select aria-label="Dil / Язык / Language" value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0">
      {languageOptions.map((item) => <option key={item.code} value={item.code}>{item.flag} {item.label} ({item.code.toUpperCase()})</option>)}
    </select>
  </label>;
}
