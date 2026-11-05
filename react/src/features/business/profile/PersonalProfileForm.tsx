import { businessLabelClass } from "../components/BusinessField";
import { businessControlClass } from "../components/BusinessField";
import AzPhoneInput from "../components/AzPhoneInput";
import type { FormEvent } from "react";
import { formatPhone } from "@/lib/formatPhone";
import type { BusinessProfile } from "./profile";
import { useLanguage } from "@/features/locale/language";

const cities = ["Bakı", "Sumqayıt", "Gəncə", "Xırdalan", "Mingəçevir", "Şəki", "Quba", "Lənkəran", "Naxçıvan"];
const field = businessControlClass;
const label = businessLabelClass;

interface Props {
  name: string;
  phone: string;
  draft: BusinessProfile;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  onChange: <K extends keyof BusinessProfile>(key: K, value: BusinessProfile[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const labels = {
  az: { title: "Şəxsi məlumatlar", detail: "Əlaqə və profil məlumatlarınız", gender: "Cins", female: "Qadın", male: "Kişi", name: "Ad və soyad", phone: "Mobil nömrə", language: "İnterfeys dili", country: "Ölkə", city: "Şəhər", about: "Haqqında", save: "Dəyişiklikləri yadda saxla" },
  ru: { title: "Личные данные", detail: "Ваши контактные данные и профиль", gender: "Пол", female: "Женщина", male: "Мужчина", name: "Имя и фамилия", phone: "Номер телефона", language: "Язык интерфейса", country: "Страна", city: "Город", about: "О себе", save: "Сохранить изменения" },
  tr: { title: "Kişisel bilgiler", detail: "İletişim ve profil bilgileriniz", gender: "Cinsiyet", female: "Kadın", male: "Erkek", name: "Ad ve soyad", phone: "Telefon numarası", language: "Arayüz dili", country: "Ülke", city: "Şehir", about: "Hakkında", save: "Değişiklikleri kaydet" },
  en: { title: "Personal details", detail: "Your contact and profile details", gender: "Gender", female: "Woman", male: "Man", name: "Full name", phone: "Mobile number", language: "Interface language", country: "Country", city: "City", about: "About", save: "Save changes" },
};

export default function PersonalProfileForm({ name, phone, draft, onNameChange, onPhoneChange, onChange, onSubmit }: Props) {
  const { language, setLanguage } = useLanguage();
  const text = labels[language];
  return <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
    <div className="border-b border-slate-100 pb-4">
      <h3 className="text-sm font-bold text-slate-900">{text.title}</h3>
      <p className="mt-1 text-xs font-medium text-slate-400">{text.detail}</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <span className={label}>{text.gender}</span>
        <div className="mt-1.5 grid grid-cols-2 gap-2 sm:max-w-xs">
          {([{ id: "female", title: text.female }, { id: "male", title: text.male }] as const).map((item) => {
            const selected = draft.gender === item.id;
            const selectedStyle = item.id === "female" ? "border-2 border-pink-500 bg-pink-50 text-pink-700" : "border-2 border-blue-600 bg-blue-50 text-blue-700";
            return <button key={item.id} type="button" aria-pressed={selected} onClick={() => onChange("gender", item.id)} className={`min-h-11 cursor-pointer rounded-xl text-xs font-bold transition ${selected ? selectedStyle : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>{item.title}</button>;
          })}
        </div>
      </div>
      <label className={label}>{text.name} *<input value={name} onChange={(event) => onNameChange(event.target.value)} className={field} required minLength={2} autoComplete="name" /></label>
      <label className={label}>{text.phone} *
        <AzPhoneInput required value={phone} onValueChange={(next) => onPhoneChange(formatPhone(next))} />
      </label>
      <label className={label}>{text.language}<select value={language} onChange={(event) => { const next = event.target.value as BusinessProfile["language"]; onChange("language", next); setLanguage(next); }} className={field}><option value="az">Azərbaycan dili (AZ)</option><option value="ru">Русский (RU)</option><option value="tr">Türkçe (TR)</option><option value="en">English (EN)</option></select></label>
      <label className={label}>{text.country}<span className="mt-1.5 flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3.5 text-sm font-semibold text-slate-600"><img src="/az-flag.svg" alt="" className="h-3.5 w-5 rounded-[2px] border border-slate-200 object-cover" />Azərbaycan</span></label>
      <label className={label}>{text.city}<select value={draft.city} onChange={(event) => onChange("city", event.target.value)} className={field}>{!cities.includes(draft.city) && <option value={draft.city}>{draft.city}</option>}{cities.map((city) => <option key={city} value={city}>{city}</option>)}</select></label>
      <label className={`${label} sm:col-span-2`}>{text.about}<textarea rows={3} value={draft.bio} onChange={(event) => onChange("bio", event.target.value)} className={`${field} h-auto min-h-24 resize-y py-3`} /></label>
    </div>
    <div className="flex justify-end pt-1"><button type="submit" className="min-h-11 w-full cursor-pointer rounded-xl bg-brand-primary px-5 text-sm font-bold sm:w-auto">{text.save}</button></div>
  </form>;
}
