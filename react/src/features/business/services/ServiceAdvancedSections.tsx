import { businessLabelClass } from "../components/BusinessField";
import { businessControlClass } from "../components/BusinessField";
import { useState } from "react";
import type { Service, ServiceComboItem, ServiceOnlineSettings } from "./services";
import BusinessFormDialog from "../components/BusinessFormDialog";

const field = businessControlClass;

export function ServiceComboEditor({ selectedIds, services, items, onChange, onSelectedChange }: { selectedIds: string[]; services: Service[]; items: ServiceComboItem[]; onChange: (items: ServiceComboItem[]) => void; onSelectedChange: (ids: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(0);
  const selected = selectedIds.map((id) => services.find((service) => service.id === id)).filter((item): item is Service => !!item);
  const current = services.find((service) => service.id === serviceId);
  const itemFor = (service: Service) => items.find((item) => item.serviceId === service.id) ?? { serviceId: service.id, price: service.price, duration: service.duration };
  const totalPrice = selected.reduce((sum, service) => sum + itemFor(service).price, 0);
  const totalDuration = selected.reduce((sum, service) => sum + itemFor(service).duration, 0);
  function show(service?: Service) {
    setEditId(service?.id ?? ""); setServiceId(service?.id ?? "");
    setDuration(service ? itemFor(service).duration : 30);
    setPrice(service ? itemFor(service).price : 0);
    setOpen(true);
  }
  function choose(id: string) {
    const service = services.find((entry) => entry.id === id);
    setServiceId(id); setDuration(service?.duration ?? 30); setPrice(service?.price ?? 0);
  }
  function save() {
    if (!current || duration < 5 || price < 0) return;
    if (!selectedIds.includes(current.id)) onSelectedChange([...selectedIds, current.id]);
    onChange([...items.filter((item) => item.serviceId !== current.id), { serviceId: current.id, duration, price }]);
    setOpen(false);
  }
  function remove(id: string) { onSelectedChange(selectedIds.filter((entry) => entry !== id)); onChange(items.filter((item) => item.serviceId !== id)); }
  return <div className="space-y-3">
    <button type="button" onClick={() => show()} className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700"><span className="text-base leading-none">+</span>Paketə xidmət əlavə et</button>
    {selected.map((service) => <div key={service.id} className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-indigo-200/80 bg-white p-3 text-xs"><div className="min-w-0"><strong className="block truncate text-slate-900">{service.name}</strong><span className="text-slate-500">{itemFor(service).duration} dəq · {itemFor(service).price.toFixed(2)} ₼</span></div><div className="flex shrink-0 gap-1"><button type="button" onClick={() => show(service)} className="rounded-lg px-2 py-1 font-semibold text-indigo-700 hover:bg-indigo-50">Dəyiş</button><button type="button" onClick={() => remove(service.id)} className="rounded-lg px-2 py-1 font-semibold text-red-600 hover:bg-red-50">Sil</button></div></div>)}
    {!!selected.length && <div className="space-y-2 rounded-xl border border-indigo-200/80 bg-white p-3 text-xs"><div className="flex justify-between"><span>Cəmi xidmət müddəti:</span><strong>{totalDuration} dəq</strong></div><div className="flex justify-between"><span>Ayrı-ayrı qiymətlərin cəmi:</span><strong>{totalPrice.toFixed(2)} ₼</strong></div></div>}
    {open && <BusinessFormDialog title={editId ? "Paket xidmətini redaktə et" : "Paketə xidmət əlavə et"} description="Xidməti seçin, paket üçün fərdi müddət və qiymət təyin edin" onClose={() => setOpen(false)} size="compact" scrollContent><div className="min-h-0 flex-1 space-y-4 overflow-y-auto py-3.5 pr-0.5 text-xs"><label className={businessLabelClass}>Xidmət seçin *<select value={serviceId} onChange={(event) => choose(event.target.value)} disabled={!!editId} className={field}><option value="">-- Kataloqdan xidmət seçin --</option>{services.filter((service) => !selectedIds.includes(service.id) || service.id === editId).map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}</select></label>{current && <div className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-3 text-indigo-950"><strong>{current.name}</strong><p className="mt-1 text-[11px]">Kataloq müddəti: {current.duration} dəq · Kataloq qiyməti: {current.price} ₼</p></div>}<div><label className={businessLabelClass}>Paketdəki icra müddəti (dəqiqə) *<input type="number" min="5" max="720" step="5" value={duration} onChange={(event) => setDuration(Number(event.target.value))} className={field} /></label><div className="mt-1.5 flex gap-1 overflow-x-auto">{[15,20,30,45,60,90].map((value) => <button key={value} type="button" onClick={() => setDuration(value)} className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-[10px]">{value}</button>)}</div></div><div><label className={businessLabelClass}>Paketdəki qiymət (₼) *<input type="number" min="0" step="0.5" value={price} onChange={(event) => setPrice(Number(event.target.value))} className={field} /></label><div className="mt-1.5 flex gap-1 overflow-x-auto">{[0,10,20,30,50].map((discount) => <button key={discount} type="button" disabled={!current} onClick={() => setPrice(Number(((current?.price ?? 0) * (1-discount/100)).toFixed(2)))} className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-[10px]">{discount ? `-${discount}%` : "Əsas (100%)"}</button>)}</div></div></div><div className="flex shrink-0 justify-end gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={() => setOpen(false)} className="min-h-9 rounded-xl bg-slate-100 px-4">Ləğv et</button><button type="button" onClick={save} disabled={!current || duration < 5 || price < 0} className="min-h-9 rounded-xl bg-indigo-600 px-4 font-bold text-white disabled:opacity-50">{editId ? "Yadda saxla" : "Paketə əlavə et"}</button></div></BusinessFormDialog>}
  </div>;
}

export function ServiceOnlineEditor({ value, onChange }: { value: ServiceOnlineSettings; onChange: (next: ServiceOnlineSettings) => void }) {
  const [imageError, setImageError] = useState("");
  const images = value.imageUrls ?? [];
  async function upload(files: FileList | null) {
    if (!files?.length) return;
    const selected = Array.from(files);
    if (selected.some((file) => !["image/png", "image/jpeg", "image/webp"].includes(file.type))) { setImageError("PNG, JPG və ya WebP şəkilləri seçin."); return; }
    if (images.length + selected.length > 8) { setImageError("Ən çox 8 şəkil əlavə etmək olar."); return; }
    try {
      const urls: string[] = [];
      for (const file of selected) {
        if (file.size > 10_000_000) throw new Error("Şəkil 10 MB-dan böyük ola bilməz.");
        const bitmap = await createImageBitmap(file);
        const scale = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(bitmap.width * scale));
        canvas.height = Math.max(1, Math.round(bitmap.height * scale));
        canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();
        urls.push(canvas.toDataURL("image/webp", 0.72));
      }
      if ([...images, ...urls].join("").length > 3_000_000) throw new Error("Şəkillərin ümumi həcmi çox böyükdür. Daha az şəkil seçin.");
      onChange({ ...value, imageUrls: [...images, ...urls] });
      setImageError("");
    } catch (error) { setImageError(error instanceof Error ? error.message : "Şəkli yükləmək mümkün olmadı."); }
  }
  return <div className="space-y-4 text-xs">
    <div><div className="mb-1.5 flex items-center justify-between gap-2"><label htmlFor="service-online-title" className={businessLabelClass}>Onlayn vitrində xüsusi ad</label><span className="text-[11px] text-slate-400">İstəyə bağlı</span></div><input id="service-online-title" value={value.onlineTitle ?? ""} onChange={(event) => onChange({ ...value, onlineTitle: event.target.value })} placeholder="Boş buraxıldıqda əsas xidmət adı istifadə olunacaq" className={field} /></div>
    <div className="space-y-4"><label className="group block cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 p-5 text-center transition hover:border-amber-400 hover:bg-amber-50/20"><input type="file" accept="image/png,image/jpeg,image/webp" multiple className="sr-only" onChange={(event) => { void upload(event.target.files); event.target.value = ""; }} /><span className="mx-auto mb-2 flex size-10 items-center justify-center rounded-xl bg-amber-50 text-xl text-amber-600 group-hover:bg-amber-100">▧</span><strong className="block text-xs text-slate-800">İş nümunələrini yükləmək üçün klikləyin</strong><span className="mt-0.5 block text-[11px] text-slate-400">PNG, JPG, WebP formatları (eyni anda bir neçə şəkil seçə bilərsiniz)</span></label>{imageError && <p role="alert" className="text-xs text-red-600">{imageError}</p>}<div><div className="flex items-center justify-between gap-2 pb-2"><span className="font-medium text-slate-700">Yüklənmiş şəkillər ({images.length})</span>{!!images.length && <button type="button" onClick={() => onChange({ ...value, imageUrls: [] })} className="text-[11px] text-red-500">Bütün şəkilləri sil</button>}</div><div className="grid min-h-[90px] grid-cols-2 gap-3 sm:grid-cols-3">{images.map((url, index) => <div key={`${url}-${index}`} className="relative min-w-0 overflow-hidden rounded-xl border border-slate-200"><img src={url} alt={`İş nümunəsi ${index + 1}`} className="h-24 w-full object-cover" /><button type="button" onClick={() => onChange({ ...value, imageUrls: images.filter((_, i) => i !== index) })} aria-label={`Şəkil ${index + 1} sil`} className="absolute right-1 top-1 rounded-md bg-white/90 px-2 py-1 font-bold text-red-600">×</button></div>)}</div></div></div>
    <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5"><p className={businessLabelClass}>Öncədən ödəniş (Depozit tələbi)</p><div className="grid grid-cols-3 gap-2">{([['none','Yoxdur'],['fixed','Sabit (₼)'],['percent','Faiz (%)']] as const).map(([type,label]) => <button key={type} type="button" aria-pressed={(value.depositType ?? 'none') === type} onClick={() => onChange({ ...value, depositType: type })} className={`h-9 min-w-0 rounded-xl border px-1 text-[11px] sm:text-xs ${(value.depositType ?? 'none') === type ? 'border-slate-900 bg-white font-bold text-slate-900 shadow-xs' : 'border-slate-200 font-medium text-slate-600'}`}>{label}</button>)}</div>{value.depositType && value.depositType !== 'none' && <label className={businessLabelClass}>{value.depositType === 'percent' ? 'Depozit faizi (%)' : 'Depozit məbləği (₼)'}<input type="number" min="0" step="0.5" value={value.depositValue ?? 0} onChange={(event) => onChange({ ...value, depositValue: Number(event.target.value) })} className={`${field} bg-white font-bold`} /></label>}</div>
    <label className={businessLabelClass}>Ləğvetmə və dəyişdirmə qaydası<select value={value.cancellationRule ?? "free_2h"} onChange={(event) => onChange({ ...value, cancellationRule: event.target.value as ServiceOnlineSettings["cancellationRule"] })} className={field}><option value="free_2h">Ən azı 2 saat öncədən ödənişsiz ləğv</option><option value="free_12h">Ən azı 12 saat öncədən ödənişsiz ləğv</option><option value="free_24h">Ən azı 24 saat öncədən ödənişsiz ləğv</option><option value="free_any">İstənilən vaxt ödənişsiz ləğv</option><option value="strict">Ləğv edilə bilməz (Depozit geri qaytarılmır)</option></select></label>
    <label className={businessLabelClass}>Müştəri üçün qeyd və təlimatlar (Sifariş zamanı)<textarea rows={2} value={value.clientNote ?? ""} onChange={(event) => onChange({ ...value, clientNote: event.target.value })} placeholder="Məs: Zəhmət olmasa təyin olunmuş vaxtdan 10 dəqiqə əvvəl yaxınlaşın və prosedura makiyajsız gəlin..." className={`${field} resize-none py-3 font-normal leading-relaxed`} /></label>
  </div>;
}

export function ServiceNotifications({ value, onChange }: { value: ServiceOnlineSettings; onChange: (next: ServiceOnlineSettings) => void }) {
  const reminderTags = ["{müştəri}", "{xidmət}", "{tarix}", "{vaxt}", "{usta}", "{ünvan}"];
  const repeatTags = ["{müştəri}", "{xidmət}", "{gün}", "{link}", "{usta}", "{ünvan}"];
  const switchClass = "relative h-6 w-11 shrink-0 rounded-full bg-slate-200 transition-colors peer-checked:bg-brand-primary after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5";
  const tagButtonClass = "min-h-8 cursor-pointer rounded-lg bg-slate-100 px-2 text-xs font-medium text-slate-700 hover:bg-amber-100";
  return <div className="space-y-4">
    <div><h3 className="text-sm font-bold">Müştəri bildirişləri və Xatırlatmalar</h3><p className="text-xs text-slate-500">Bu xidmət üzrə SMS və WhatsApp vasitəsilə göndərilən avtomatik xəbərdarlıqlar</p></div>
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
      <span><strong className="block text-xs text-slate-900">Avtomatik xatırlatma göndərilsin</strong><span className="text-[11px] text-slate-500">Müştəriyə təyin olunmuş vaxtdan əvvəl SMS və WhatsApp göndərilir</span></span>
      <input type="checkbox" className="peer sr-only" checked={value.reminderEnabled} onChange={(event) => onChange({ ...value, reminderEnabled: event.target.checked })} />
      <span aria-hidden="true" className={switchClass} />
    </label>
    {value.reminderEnabled && <div className="space-y-3.5">
      <div><p className="mb-2 text-sm font-medium text-slate-700">Xatırlatma nə vaxt göndərilsin?</p><div className="grid grid-cols-3 gap-2">{[24, 2, 1].map((hours) => <button key={hours} type="button" aria-pressed={value.reminderHours === hours} onClick={() => onChange({ ...value, reminderHours: hours })} className={`min-h-10 cursor-pointer rounded-xl border px-2 text-xs sm:text-sm ${value.reminderHours === hours ? "border-slate-900 bg-white font-bold text-slate-900" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{hours} saat əvvəl</button>)}</div></div>
      <div><label className={businessLabelClass}>Fərdi bildiriş mətni<textarea rows={3} value={value.reminderText} onChange={(event) => onChange({ ...value, reminderText: event.target.value })} placeholder="Salam {müştəri}, {tarix} saat {vaxt}-da {xidmət} üçün qəbulunuzu xatırladırıq." className={`${field} py-3`} /></label><div className="mt-2 flex flex-wrap items-center gap-1.5"><span className="text-xs text-slate-500">Teq əlavə et:</span>{reminderTags.map((tag) => <button key={tag} type="button" className={tagButtonClass} onClick={() => onChange({ ...value, reminderText: `${value.reminderText}${tag}` })}>{tag}</button>)}</div></div>
    </div>}
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
      <span><strong className="block text-xs text-slate-900">Xidmətdən sonra rəy sorğusu</strong><span className="text-[11px] text-slate-500">Xidmət bitdikdən 2 saat sonra müştəriyə reytinq və rəy linki göndərilsin</span></span>
      <input type="checkbox" className="peer sr-only" checked={value.reviewRequestEnabled ?? true} onChange={(event) => onChange({ ...value, reviewRequestEnabled: event.target.checked })} />
      <span aria-hidden="true" className={switchClass} />
    </label>
    <div className="space-y-3.5 rounded-2xl border border-amber-200/70 bg-amber-50/40 p-4">
      <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3">
        <span><strong className="block text-xs text-slate-900">Təkrar ziyarət və ya Korreksiya xatırlatması <span className="ml-1 rounded-md bg-brand-primary px-2 py-0.5 text-[10px]">Faydalı</span></strong><span className="mt-0.5 block text-[11px] text-slate-500">Məsələn: 30 gündən sonra saç rənglənməsi, dırnaq korreksiyası və ya təkrar baxım üçün müştəriyə avtomatik dəvət göndərilir</span></span>
        <input type="checkbox" className="peer sr-only" checked={value.repeatReminderEnabled ?? false} onChange={(event) => onChange({ ...value, repeatReminderEnabled: event.target.checked })} />
        <span aria-hidden="true" className={switchClass} />
      </label>
      {value.repeatReminderEnabled && <div className="space-y-3 border-t border-amber-200 pt-3">
        <div><p className="mb-2 text-sm font-medium text-slate-700">Neçə gündən sonra göndərilsin?</p><div className="flex flex-wrap items-center gap-2">{[14, 21, 30, 45, 60].map((days) => <button key={days} type="button" aria-pressed={(value.repeatReminderDays ?? 30) === days} onClick={() => onChange({ ...value, repeatReminderDays: days })} className={`min-h-9 cursor-pointer rounded-lg border px-3 text-xs ${(value.repeatReminderDays ?? 30) === days ? "border-slate-900 bg-slate-900 font-bold text-white" : "border-slate-200 bg-white text-slate-700"}`}>{days} gün sonra</button>)}<label className="flex items-center gap-1 text-xs">Fərdi: <input type="number" min="1" max="365" value={value.repeatReminderDays ?? 30} onChange={(event) => onChange({ ...value, repeatReminderDays: Number(event.target.value) })} className="h-9 w-16 rounded-lg border border-slate-200 bg-white px-2 text-center" /> gün</label></div></div>
        <div><label className={businessLabelClass}>Korreksiya / Təkrar bildiriş mətni<textarea rows={3} value={value.repeatReminderText ?? ""} onChange={(event) => onChange({ ...value, repeatReminderText: event.target.value })} placeholder="Salam {müştəri}, {xidmət} qəbulundan {gün} gün keçdi. Yenidən vaxt seçin: {link}." className={`${field} py-3`} /></label><div className="mt-2 flex flex-wrap items-center gap-1.5"><span className="text-xs text-slate-500">Teq əlavə et:</span>{repeatTags.map((tag) => <button key={tag} type="button" className={tagButtonClass} onClick={() => onChange({ ...value, repeatReminderText: `${value.repeatReminderText ?? ""}${tag}` })}>{tag}</button>)}</div></div>
      </div>}
    </div>
  </div>;
}

