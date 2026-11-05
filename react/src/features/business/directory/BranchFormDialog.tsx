import EmptyState from "../../../components/common/EmptyState";
import { businessLabelClass } from "../components/BusinessField";
import { businessControlClass } from "../components/BusinessField";
import AzPhoneInput from "../components/AzPhoneInput";
import { useState, type FormEvent, type ReactNode } from "react";
import { Building2, Camera, ExternalLink, ImagePlus, MapPin, Plus, Trash2, UserRound, X } from "lucide-react";
import BusinessEntryDialog from "../components/BusinessEntryDialog";
import type { Branch } from "./businesses";
import BranchAmenitiesField from "./BranchAmenitiesField";
import BranchCategories from "./BranchCategories";
import BranchSchedulePane from "./BranchSchedulePane";
import { branchWeekdays, type BranchDay } from "./branchSchedule";
import { BusinessTabButton, BusinessTabRail } from "../components/BusinessTabs";

type Tab = "main" | "address" | "interior" | "schedule" | "messengers" | "socials";
type Draft = Omit<Branch, "id"> & { phones: string[]; categories: string[]; photos: string[]; scheduleDays: Record<string, BranchDay>; amenities: string[] };

const tabs: { id: Tab; label: string }[] = [
  { id: "main", label: "Əsas" }, { id: "address", label: "Ünvan" },
  { id: "interior", label: "İnteryer" }, { id: "schedule", label: "İş qrafiki" },
  { id: "messengers", label: "Mesencerlər" }, { id: "socials", label: "Sosial şəbəkələr" },
];
const cities = ["Bakı", "Sumqayıt", "Gəncə", "Xırdalan", "Mingəçevir", "Şəki", "Quba", "Lənkəran", "Naxçıvan"];
const fieldClass = businessControlClass;
const labelClass = businessLabelClass;
const normalizePhone = (value: string) => value.trim().replace(/^\+?994\s*/, "");
const fullPhone = (value: string) => value.trim() ? `+994 ${normalizePhone(value)}` : "";

function initialDraft(initial?: Branch, individual = false): Draft {
  const range = initial?.hours?.match(/(\d{2}:\d{2})\s*[–-]\s*(\d{2}:\d{2})/);
  const open = range?.[1] ?? (individual ? "10:00" : "09:00");
  const close = range?.[2] ?? (individual ? "20:00" : "21:00");
  return {
    name: initial?.name ?? "", city: initial?.city ?? "Bakı", address: initial?.address ?? "",
    phone: initial?.phone ?? "", hours: initial?.hours ?? "", amenities: initial?.amenities ?? [],
    logo: initial?.logo ?? "", category: initial?.category ?? (individual ? "beauty/hair" : ""), categories: initial?.categories ?? (initial?.category ? [initial.category] : individual ? ["beauty/hair"] : []),
    phones: (initial?.phones?.length ? initial.phones : [initial?.phone ?? ""]).map(normalizePhone),
    description: initial?.description ?? "", mapUrl: initial?.mapUrl ?? "",
    photos: initial?.photos ?? [], scheduleDays: Object.fromEntries(branchWeekdays.map(([key]) => [key, initial?.scheduleDays?.[key] ?? { isOff: individual && key === "sun", open, close }])),
    whatsapp: normalizePhone(initial?.whatsapp ?? ""), telegram: initial?.telegram ?? "",
    instagram: initial?.instagram ?? "", facebook: initial?.facebook ?? "", tiktok: initial?.tiktok ?? "", linkedin: initial?.linkedin ?? "",
  };
}

async function imageToDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Yalnız şəkil faylları seçin.");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.76);
}

function PhoneInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <AzPhoneInput value={value} onValueChange={(next) => onChange(normalizePhone(next))} />;
}

function TextField({ label, value, onChange, placeholder, required = false, prefix }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean; prefix?: string }) {
  return <label className={labelClass}>{label}{required && " *"}{prefix ? <div className="mt-1.5 flex h-10 min-w-0 items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition focus-within:border-slate-900 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-primary/40"><span className="shrink-0 select-none text-xs font-bold text-slate-400">{prefix}</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} maxLength={160} className="h-full min-w-0 flex-1 bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400" /></div> : <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} maxLength={160} className={fieldClass} />}</label>;
}

function MainPane({ draft, patch, upload, error, individual }: { draft: Draft; patch: (value: Partial<Draft>) => void; upload: (files: FileList | null, kind: "logo" | "photos") => void; error: string; individual: boolean }) {
  return <div className="space-y-4">
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"><label className="relative flex size-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-white text-slate-400">{draft.logo ? <img src={draft.logo} alt={individual ? "Ustanın fotosu" : "Filial loqosu"} className="size-full object-cover" /> : individual ? <UserRound size={24} /> : <Building2 size={24} />}<input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(event) => { upload(event.target.files, "logo"); event.target.value = ""; }} /><span className="absolute right-0 bottom-0 rounded-full bg-brand-primary p-1 text-slate-900"><Camera size={12} /></span></label><div className="min-w-0 flex-1"><p className="text-xs font-bold">{individual ? "Ustanın fotosu / loqo" : "Filial loqosu"}</p><p className="mt-0.5 text-[11px] text-slate-500">{individual ? "Profil fotosu və ya loqo" : "Loqo və ya foto"} (PNG, JPG, WebP)</p></div>{draft.logo && <button type="button" onClick={() => patch({ logo: "" })} aria-label="Loqonu sil" className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-rose-600"><Trash2 size={15} /></button>}</div>
    <TextField label={individual ? "Ustanın adı və soyadı" : "Filialın adı"} required value={draft.name} onChange={(name) => patch({ name })} placeholder={individual ? "Məs: Samir Əliyev (Bərbər)" : "Məs: Nizami Filialı"} />
    {error === "name" && <p role="alert" className="text-xs text-red-600">{individual ? "Ustanın adını" : "Filialın adını"} daxil edin.</p>}
    <BranchCategories selected={draft.categories} onChange={(value) => patch({ categories: value, category: value[0] ?? "" })} individual={individual} />
    <div><div className="flex items-center justify-between gap-2"><span className={labelClass}>Əlaqə nömrələri</span><button type="button" onClick={() => patch({ phones: [...draft.phones, ""] })} className="flex min-h-8 cursor-pointer items-center gap-1 text-xs font-semibold"><Plus size={14} />Nömrə əlavə et</button></div><div className="space-y-2">{draft.phones.map((phone, index) => <div key={index} className="flex min-w-0 items-center gap-2"><div className="min-w-0 flex-1"><PhoneInput value={phone} onChange={(value) => patch({ phones: draft.phones.map((item, current) => current === index ? value : item) })} /></div>{draft.phones.length > 1 && <button type="button" onClick={() => patch({ phones: draft.phones.filter((_, current) => current !== index) })} aria-label="Nömrəni sil" className="mt-1.5 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-slate-100 text-slate-500"><X size={16} /></button>}</div>)}</div></div>
    <label className={labelClass}>{individual ? "Usta haqqında qısa məlumat" : "Filial haqqında qısa məlumat"}<textarea value={draft.description} onChange={(event) => patch({ description: event.target.value })} maxLength={500} rows={3} placeholder={individual ? "Təcrübə, xidmət yanaşması və ya qeydlər..." : "Filial haqqında qısa təsvir və ya qeydlər..."} className={`${fieldClass} h-auto resize-y py-3`} /></label>
    {!individual && <BranchAmenitiesField selected={draft.amenities} onChange={(amenities) => patch({ amenities })} />}
  </div>;
}

function AddressPane({ draft, patch, error, individual }: { draft: Draft; patch: (value: Partial<Draft>) => void; error: string; individual: boolean }) {
  const query = [draft.address, draft.city, "Azərbaycan"].filter(Boolean).join(", ");
  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(query)}`;
  return <div className="space-y-4"><div className="grid gap-3 min-[430px]:grid-cols-2"><label className={labelClass}>Ölkə<div className={`${fieldClass} flex items-center gap-2 bg-slate-100 text-slate-600`}><span>🇦🇿</span>Azərbaycan</div></label><label className={labelClass}>Şəhər *<select value={draft.city} onChange={(event) => patch({ city: event.target.value })} className={fieldClass}>{!cities.includes(draft.city) && <option value={draft.city}>{draft.city}</option>}{cities.map((city) => <option key={city}>{city}</option>)}</select></label></div>
    <TextField label="Dəqiq ünvan (küçə, bina)" required value={draft.address} onChange={(address) => patch({ address })} placeholder="Məs: Nizami küç. 45" />{error === "address" && <p role="alert" className="text-xs text-red-600">{individual ? "Ustanın iş ünvanını" : "Filialın dəqiq ünvanını"} daxil edin.</p>}
    <div><div className="flex flex-wrap items-center justify-between gap-2"><span className="flex items-center gap-1 text-xs font-semibold"><MapPin size={15} className="text-amber-600" />Xəritədə məkan (Google Maps)</span><a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-semibold text-slate-600 underline">Google Maps-da aç <ExternalLink size={13} /></a></div><div className="mt-2 flex h-48 items-center justify-center rounded-2xl border border-slate-200 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[length:18px_18px] p-4 text-center sm:h-56"><div className="max-w-full rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow"><MapPin size={15} className="mx-auto mb-1 text-brand-primary" /><span className="break-words">{query}</span></div></div><p className="mt-1 text-[11px] text-slate-400">Dəqiq yeri Google Maps-da yoxlayın.</p></div>
  </div>;
}

function InteriorPane({ photos, upload, remove, individual }: { photos: string[]; upload: (files: FileList | null, kind: "logo" | "photos") => void; remove: (index: number) => void; individual: boolean }) {
  const photoType = individual ? "Portfolio" : "İnteryer";
  return <div className="space-y-4"><label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-4 text-center hover:border-amber-400 hover:bg-amber-50/20"><ImagePlus className="mb-2 text-amber-600" size={25} /><strong className="text-xs">{photoType} şəkillərini yükləmək üçün klikləyin</strong><span className="mt-1 text-[11px] text-slate-400">PNG, JPG, WebP · birdən çox şəkil seçə bilərsiniz</span><input type="file" accept="image/png,image/jpeg,image/webp" multiple className="sr-only" onChange={(event) => { upload(event.target.files, "photos"); event.target.value = ""; }} /></label><p className="text-xs font-semibold">{photoType} şəkilləri <span className="rounded-full bg-slate-100 px-2 py-0.5">{photos.length}</span></p>{photos.length ? <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{photos.map((photo, index) => <div key={`${photo.slice(0, 30)}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200"><img src={photo} alt={`${photoType} ${index + 1}`} className="size-full object-cover" /><button type="button" onClick={() => remove(index)} aria-label={`${index + 1}-ci şəkli sil`} className="absolute top-1.5 right-1.5 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white text-rose-600 shadow"><Trash2 size={15} /></button></div>)}</div> : <EmptyState title="Hələ şəkil əlavə edilməyib" compact />}</div>;
}

function SocialPane({ children }: { children: ReactNode }) { return <div className="space-y-4">{children}</div>; }

export default function BranchFormDialog({ open, initial, individual = false, creating = !initial, saveError, onClose, onSave }: { open: boolean; initial?: Branch; individual?: boolean; creating?: boolean; saveError?: string; onClose: () => void; onSave: (value: Branch) => void }) {
  const [draft, setDraft] = useState<Draft>(() => initialDraft(initial, individual));
  const [tab, setTab] = useState<Tab>("main");
  const [error, setError] = useState("");
  const [mediaError, setMediaError] = useState("");
  function patch(value: Partial<Draft>) { setDraft((current) => ({ ...current, ...value })); setError(""); }
  async function upload(files: FileList | null, kind: "logo" | "photos") {
    if (!files?.length) return;
    setMediaError("");
    try {
      const selected = Array.from(files);
      if (kind === "photos" && draft.photos.length + selected.length > 8) throw new Error("Ən çox 8 şəkil əlavə edə bilərsiniz.");
      const images = await Promise.all(selected.map(imageToDataUrl));
      if (images.some((image) => image.length > 550_000)) throw new Error("Şəkil çox böyükdür. Daha kiçik şəkil seçin.");
      patch(kind === "logo" ? { logo: images[0] } : { photos: [...draft.photos, ...images] });
    } catch (issue) { setMediaError(issue instanceof Error ? issue.message : "Şəkil yüklənmədi."); }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.name.trim()) { setTab("main"); setError("name"); return; }
    if (!draft.address.trim()) { setTab("address"); setError("address"); return; }
    const invalidDay = branchWeekdays.find(([key]) => !draft.scheduleDays[key].isOff && draft.scheduleDays[key].open >= draft.scheduleDays[key].close);
    if (invalidDay) { setTab("schedule"); setError("schedule"); return; }
    const firstWorking = branchWeekdays.map(([key]) => draft.scheduleDays[key]).find((day) => !day.isOff);
    const phones = draft.phones.map(fullPhone).filter(Boolean);
    const { ...values } = draft;
    onSave({ ...values, id: initial?.id ?? crypto.randomUUID(), name: draft.name.trim(), address: draft.address.trim(), city: draft.city.trim(), phone: phones[0] ?? "", phones, hours: firstWorking ? `${firstWorking.open} – ${firstWorking.close}` : "İstirahət", whatsapp: fullPhone(draft.whatsapp ?? ""), mapUrl: `https://maps.google.com/?q=${encodeURIComponent([draft.address, draft.city, "Azərbaycan"].join(", "))}` });
  }
  return <BusinessEntryDialog open={open} title={individual ? creating ? "Yeni fərdi usta əlavə et" : "Fərdi usta profilini redaktə et" : creating ? "Yeni filial əlavə et" : "Filialı redaktə et"} description={individual ? "Fərdi ustanın profili, xidmətləri, ünvanı, portfolio şəkilləri və iş qrafiki" : "Filial məlumatlarını, interyer şəkillərini və iş rejimini daxil edin"} onClose={onClose} width="large" scrollContent bodyPadding={false}>
    <nav aria-label={individual ? "Fərdi usta məlumatları" : "Filial məlumatları"} className="min-w-0 shrink-0 overflow-x-auto px-5 pb-2 sm:px-7"><BusinessTabRail centered>{tabs.map((item) => <BusinessTabButton key={item.id} active={tab === item.id} onClick={() => setTab(item.id)} count={item.id === "interior" ? draft.photos.length : undefined}>{individual && item.id === "interior" ? "Portfolio" : item.label}</BusinessTabButton>)}</BusinessTabRail></nav>
    <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col"><div className="min-h-0 flex-1 overflow-y-auto px-5 py-3 sm:px-7">
      {tab === "main" && <MainPane draft={draft} patch={patch} upload={upload} error={error} individual={individual} />}
      {tab === "address" && <AddressPane draft={draft} patch={patch} error={error} individual={individual} />}
      {tab === "interior" && <InteriorPane photos={draft.photos} upload={upload} remove={(index) => patch({ photos: draft.photos.filter((_, current) => current !== index) })} individual={individual} />}
      {tab === "schedule" && <><BranchSchedulePane days={draft.scheduleDays} onChange={(scheduleDays) => patch({ scheduleDays })} />{error === "schedule" && <p role="alert" className="mt-2 text-xs text-red-600">Bağlanış saatı açılış saatından sonra olmalıdır.</p>}</>}
      {tab === "messengers" && <SocialPane><label className={labelClass}>WhatsApp nömrəsi<PhoneInput value={draft.whatsapp ?? ""} onChange={(whatsapp) => patch({ whatsapp })} /><span className="mt-1 block text-[11px] font-normal text-slate-400">Müştərilər {individual ? "ustanın" : "filialın"} WhatsApp nömrəsinə yaza bilər.</span></label><TextField label="Telegram istifadəçi adı" value={draft.telegram ?? ""} onChange={(telegram) => patch({ telegram })} prefix="t.me/" placeholder={individual ? "usta_adi" : "filial_adi"} /></SocialPane>}
      {tab === "socials" && <SocialPane><TextField label="Instagram səhifəsi" value={draft.instagram ?? ""} onChange={(instagram) => patch({ instagram })} prefix="instagram.com/" placeholder="istifadəçi_adı" /><TextField label="Facebook səhifəsi" value={draft.facebook ?? ""} onChange={(facebook) => patch({ facebook })} prefix="facebook.com/" placeholder="səhifə_adı" /><TextField label="TikTok hesabı" value={draft.tiktok ?? ""} onChange={(tiktok) => patch({ tiktok })} prefix="tiktok.com/@" placeholder="istifadəçi_adı" /><TextField label="LinkedIn səhifəsi" value={draft.linkedin ?? ""} onChange={(linkedin) => patch({ linkedin })} prefix="linkedin.com/" placeholder="səhifə_adı" /></SocialPane>}
      {(mediaError || saveError) && <p role="alert" className="mt-3 text-xs text-red-600">{mediaError || saveError}</p>}
    </div><div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-100 bg-white px-5 py-3 min-[430px]:flex-row min-[430px]:justify-end sm:px-7"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-5 text-sm font-semibold">Ləğv et</button><button type="submit" className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-5 text-sm font-bold">{creating ? individual ? "Fərdi ustanı yarat" : "Filialı əlavə et" : "Yadda saxla"}</button></div></form>
  </BusinessEntryDialog>;
}
