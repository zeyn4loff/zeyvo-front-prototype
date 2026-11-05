import { showToast as setSuccess } from "../../../components/common/toast";
import { businessControlClass } from "../components/BusinessField";
import AzPhoneInput from "../components/AzPhoneInput";
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { NavLink } from "react-router";
import { useBusinessSession } from "../auth/useBusinessSession";
import type { BusinessSession } from "../auth/businessSession";
import { updateBusinessPhoneAccount } from "../auth/businessCredentials";
import BusinessHeaderPortal from "../components/BusinessHeaderPortal";
import { BusinessTabNav } from "../components/BusinessTabs";
import { businessTabClass } from "../components/businessTabStyles";
import ConnectedAppsPanel from "./ConnectedAppsPanel";
import SecurityPanel from "./SecurityPanel";
import PersonalProfileForm from "./PersonalProfileForm";
import ProfileIdentityBanner from "./ProfileIdentityBanner";
import { formatPhone } from "@/lib/formatPhone";
import { formattedPhone, normalizeHandle, phoneDigits, readProfile, saveProfile, type BusinessProfile, type ProfileTab } from "./profile";
import { createLocalConfirmationCode } from "@/features/customer/phoneAccounts";
import { findBusinessByPhone } from "../auth/businessCredentials";
import CodeInput from "@/components/common/CodeInput";
import { useLanguage } from "@/features/locale/language";
import { profileCopy } from "./profileLocale";

const tabs: { id: ProfileTab; title: string }[] = [
  { id: "personal", title: "Şəxsi məlumatlar" }, { id: "startpage", title: "Başlanğıc səhifə" },
  { id: "messengers", title: "Mesencerlər" }, { id: "social", title: "Sosial şəbəkələr" },
  { id: "apps", title: "Qoşulmuş tətbiqlər" }, { id: "security", title: "Təhlükəsizlik" },
];
const card = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6";
const field = businessControlClass;
function Field({ title, children }: { title: string; children: ReactNode }) { return <label className="block min-w-0 text-xs font-bold text-slate-600">{title}{children}</label>; }
function SaveButton({ title = "Yadda saxla" }: { title?: string }) { return <button type="submit" className="min-h-11 w-full cursor-pointer rounded-xl bg-brand-primary px-5 text-sm font-bold sm:w-auto">{title}</button>; }
function Notice({ error }: { error: string }) { return error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null; }

export default function BusinessProfile({ session, tab }: { session: BusinessSession; tab: ProfileTab }) {
  const { updateSession } = useBusinessSession();
  const fileInput = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState(() => readProfile(session));
  const [name, setName] = useState(session.ownerName);
  const [phone, setPhone] = useState(formatPhone(phoneDigits(session.phone ?? "")));
  const [draft, setDraft] = useState(profile);
  const [error, setError] = useState("");
  const [phoneCode, setPhoneCode] = useState<string | null>(null);
  const [enteredPhoneCode, setEnteredPhoneCode] = useState("");
  const { language } = useLanguage();
  const text = profileCopy(language);
  function change<K extends keyof BusinessProfile>(key: K, value: BusinessProfile[K]) { setDraft((current) => ({ ...current, [key]: value })); setError(""); setSuccess(""); }
  function save(next: BusinessProfile, message = "Məlumatlar yadda saxlanıldı.") {
    if (!saveProfile(session.id, next)) { setError("Məlumatları saxlamaq mümkün olmadı."); return false; }
    setProfile(next); setDraft(next); setError(""); setSuccess(message); return true;
  }
  function savePersonal(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const digits = phoneDigits(phone);
    if (name.trim().length < 2 || digits.length !== 9) { setError("Adı və 9 rəqəmli mobil nömrəni yoxlayın."); setSuccess(""); return; }
    if (digits !== phoneDigits(session.phone ?? "") && !phoneCode) {
      const existing = findBusinessByPhone(digits);
      if (existing && existing.id !== session.id) { setError("Bu nömrə başqa profildə istifadə olunur."); return; }
      setPhoneCode(createLocalConfirmationCode()); setEnteredPhoneCode(""); setError(""); return;
    }
    if (phoneCode && enteredPhoneCode !== phoneCode) { setError("Təsdiq kodu yanlışdır."); return; }
    const nextSession = { ...session, ownerName: name.trim(), phone: formattedPhone(digits) };
    const nextProfile = { ...draft, language, ownerName: nextSession.ownerName, phone: nextSession.phone };
    if (!updateBusinessPhoneAccount(nextSession)) { setError("Nömrə artıq istifadə olunur və ya saxlanmadı."); return; }
    if (!updateSession(nextSession)) { updateBusinessPhoneAccount(session); setError("Sessiya məlumatları saxlanmadı."); return; }
    if (!saveProfile(session.id, nextProfile)) { updateSession(session); updateBusinessPhoneAccount(session); setError("Məlumatları saxlamaq mümkün olmadı."); return; }
    setProfile(nextProfile); setDraft(nextProfile); setPhoneCode(null); setEnteredPhoneCode(""); setSuccess("Şəxsi məlumatlar yadda saxlanıldı."); setError("");
  }
  function saveContacts(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = phoneDigits(draft.whatsapp);
    if (draft.whatsapp.trim() && digits.length !== 9) { setError("WhatsApp nömrəsi 9 rəqəmdən ibarət olmalıdır."); return; }
    save({ ...draft, whatsapp: digits ? formattedPhone(digits) : "", telegram: normalizeHandle(draft.telegram, "telegram") });
  }
  function saveSocial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save({ ...draft, instagram: normalizeHandle(draft.instagram, "instagram"), facebook: normalizeHandle(draft.facebook, "facebook"), tiktok: normalizeHandle(draft.tiktok, "tiktok"), linkedin: normalizeHandle(draft.linkedin, "linkedin") });
  }
  function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 1024 * 1024) { setError("PNG, JPG və ya WebP formatında, 1 MB-dan kiçik şəkil seçin."); return; }
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") save({ ...profile, avatar: reader.result }, "Profil şəkli yadda saxlanıldı."); };
    reader.onerror = () => setError("Şəkli oxumaq mümkün olmadı.");
    reader.readAsDataURL(file);
  }
  return <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-5 sm:px-7 sm:py-7">
    <BusinessHeaderPortal slot="title">{text.title}</BusinessHeaderPortal>
    <ProfileIdentityBanner session={session} profile={profile} fileInput={fileInput} onRemoveAvatar={() => save({ ...profile, avatar: "" }, "Profil şəkli silindi.")} onUploadAvatar={uploadAvatar} />
    <BusinessTabNav label="Profil bölmələri">{tabs.map((item) => <NavLink key={item.id} to={`/partner/profile/${item.id}`} onClick={() => { setError(""); setSuccess(""); setDraft(profile); }} className={({ isActive }) => businessTabClass(isActive)}>{language === "az" ? item.title : ({ personal: { ru: "Личные данные", tr: "Kişisel bilgiler", en: "Personal details" }, startpage: { ru: "Стартовая страница", tr: "Başlangıç sayfası", en: "Start page" }, messengers: { ru: "Мессенджеры", tr: "Mesajlaşma", en: "Messengers" }, social: { ru: "Соцсети", tr: "Sosyal ağlar", en: "Social networks" }, apps: { ru: "Приложения", tr: "Bağlı uygulamalar", en: "Connected apps" }, security: { ru: "Безопасность", tr: "Güvenlik", en: "Security" } } as const)[item.id][language]}</NavLink>)}</BusinessTabNav>
    <Notice error={error} />
    {tab === "personal" && <><PersonalProfileForm name={name} phone={phone} draft={draft} onNameChange={setName} onPhoneChange={(next) => { setPhone(next); setPhoneCode(null); setEnteredPhoneCode(""); }} onChange={change} onSubmit={savePersonal} />{phoneCode && <section className={`${card} space-y-3`}><h3 className="font-bold">{text.phoneTitle}</h3><p className="text-xs text-slate-600">{text.phoneNotice} <strong>{phoneCode}</strong></p><CodeInput value={enteredPhoneCode} onChange={setEnteredPhoneCode} label={text.code} autoFocus /><div className="flex gap-2"><button type="button" onClick={() => setPhoneCode(null)} className="min-h-11 rounded-xl bg-slate-100 px-4 text-sm font-semibold">{text.cancel}</button><button type="button" disabled={enteredPhoneCode.length !== 6} onClick={() => savePersonal()} className="min-h-11 rounded-xl bg-brand-primary px-4 text-sm font-bold disabled:opacity-50">{text.confirm}</button></div></section>}</>}
    {tab === "startpage" && <form onSubmit={(event) => { event.preventDefault(); save(draft, "Başlanğıc səhifə yadda saxlanıldı."); }} className={`${card} space-y-4`}><div><h3 className="font-bold">{text.startTitle}</h3><p className="mt-1 text-xs text-slate-500">{text.startDetail}</p></div><div className="grid gap-2 sm:grid-cols-2">{([{ id: "business", title: "Biznes modulu", detail: "Bizneslər və filiallar" }, { id: "profile", title: "Sadəcə profil", detail: "Şəxsi məlumatlar və tənzimləmələr" }] as const).map((item) => <label key={item.id} className={`flex min-h-20 cursor-pointer items-center justify-between gap-2 rounded-xl border p-3 ${draft.startView === item.id ? "border-[#101114] bg-amber-50" : "border-slate-200 bg-slate-50"}`}><span><strong className="block text-sm">{(item.id === "business" ? text.business : text.profile)}</strong><span className="text-xs text-slate-500">{item.id === "business" ? text.businessDetail : text.profileDetail}</span></span><input type="radio" name="startView" checked={draft.startView === item.id} onChange={() => change("startView", item.id)} className="size-4 accent-[#101114]" /></label>)}</div><div className="flex justify-end"><SaveButton title={text.save} /></div></form>}
    {tab === "messengers" && <form onSubmit={saveContacts} className={`${card} space-y-4`}><div><h3 className="font-bold">{text.messengers}</h3><p className="mt-1 text-xs text-slate-500">{text.messengerDetail}</p></div><div className="grid gap-4 sm:grid-cols-2"><Field title={text.whatsapp}><AzPhoneInput value={draft.whatsapp} onValueChange={(next) => change("whatsapp", next)} /></Field><Field title={text.telegram}><input value={draft.telegram} onChange={(event) => change("telegram", event.target.value)} className={field} placeholder="istifadəçi_adı" /></Field></div><div className="flex justify-end"><SaveButton title={text.save} /></div></form>}
    {tab === "social" && <form onSubmit={saveSocial} className={`${card} space-y-4`}><div><h3 className="font-bold">{text.social}</h3><p className="mt-1 text-xs text-slate-500">{text.socialDetail}</p></div><div className="grid gap-4 sm:grid-cols-2">{([{ key: "instagram", title: "Instagram" }, { key: "facebook", title: "Facebook" }, { key: "tiktok", title: "TikTok" }, { key: "linkedin", title: "LinkedIn" }] as const).map((item) => <Field key={item.key} title={item.title}><input value={draft[item.key]} onChange={(event) => change(item.key, event.target.value)} className={field} placeholder="istifadəçi_adı" /></Field>)}</div><div className="flex justify-end"><SaveButton title={text.save} /></div></form>}
    {tab === "apps" && <ConnectedAppsPanel />}
    {tab === "security" && <SecurityPanel session={session} />}
  </main>;
}
