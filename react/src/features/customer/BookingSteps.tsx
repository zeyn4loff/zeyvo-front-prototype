import EmptyState from "../../components/common/EmptyState";
import { groupServices, type Service, type Specialist } from "@/features/marketplace/data";
import { formatPhone } from "./formatPhone";
import { useCustomerText } from "@/features/locale/customerText";

export function BookingServiceStep({ services, selected, onSelect }: { services: Service[]; selected: string; onSelect: (name: string) => void }) {
  const ct = useCustomerText();
  if (!services.length) return <EmptyState title={ct("Xidmət tapılmadı")} description={ct("Bu məkan üçün xidmətlər əlavə edilməyib.")} compact />;
  return <fieldset className="min-w-0"><legend className="mb-3 text-base font-bold">{ct("Xidməti seçin")}</legend>
    <div className="space-y-2">{groupServices(services).map((group) => <div key={group.name || "all"}>
      {group.name && <h3 className="mb-2 mt-4 text-xs font-semibold text-slate-500">{group.name}</h3>}
      {group.services.map((item) => <label key={item.id} className={`mb-2 flex min-w-0 cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors ${selected === item.name ? "border-slate-900 bg-amber-50/60" : "border-slate-200 hover:border-slate-400"}`}>
        <input type="radio" name="booking-service" checked={selected === item.name} onChange={() => onSelect(item.name)} className="size-4 shrink-0 accent-slate-900" />
        <span className="min-w-0 flex-1"><strong className="block break-words text-sm">{item.name}</strong><span className="text-xs text-slate-500">{item.duration}</span></span>
        <strong className="shrink-0 text-sm">{item.price} ₼</strong>
      </label>)}
    </div>)}</div>
  </fieldset>;
}

export function BookingMasterStep({ specialists, selected, onSelect }: { specialists: Specialist[]; selected: Specialist | null; onSelect: (specialist: Specialist | null) => void }) {
  const ct = useCustomerText();
  return <fieldset className="min-w-0"><legend className="mb-3 text-base font-bold">{ct("Ustanı seçin")}</legend>
    <div className="space-y-2">{[null, ...specialists].map((specialist) => {
      const active = selected?.id === specialist?.id;
      return <label key={specialist?.id ?? "any"} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors ${active ? "border-slate-900 bg-amber-50/60" : "border-slate-200 hover:border-slate-400"}`}>
        <input type="radio" name="booking-specialist" checked={active} onChange={() => onSelect(specialist)} className="size-4 shrink-0 accent-slate-900" />
        <span className="min-w-0"><strong className="block text-sm">{specialist?.name ?? ct("İstənilən usta")}</strong><span className="text-xs text-slate-500">{specialist?.title ?? ct("İlk uyğun usta")}</span></span>
      </label>;
    })}</div>
  </fieldset>;
}

interface BookingDay { value: string; label: string }

export function BookingTimeStep({ dates, bookableDates, slots, availableSlots, date, time, onDate, onTime }: {
  dates: BookingDay[]; bookableDates: BookingDay[]; slots: string[]; availableSlots: string[];
  date: string; time: string; onDate: (date: string) => void; onTime: (time: string) => void;
}) {
  const ct = useCustomerText();
  return <fieldset className="min-w-0"><legend className="mb-3 text-base font-bold">{ct("Boş vaxt seçin")}</legend>
    <p className="mb-3 text-xs text-slate-500">{ct("Əvvəl günü, sonra sizə uyğun saatı seçin.")}</p>
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-3">{dates.map((day, index) => <button key={day.value} type="button" disabled={!bookableDates.some((item) => item.value === day.value)} aria-pressed={date === day.value} onClick={() => onDate(day.value)} className={`min-h-10 shrink-0 cursor-pointer rounded-xl border px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${date === day.value ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200"}`}>{index === 0 ? ct("Bu gün") : index === 1 ? ct("Sabah") : day.label}</button>)}</div>
    {date && <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">{slots.map((slot) => <button key={slot} type="button" disabled={!availableSlots.includes(slot)} aria-pressed={time === slot} onClick={() => onTime(slot)} className={`min-h-11 cursor-pointer rounded-xl border px-2 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${time === slot ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200"}`}>{slot}</button>)}</div>}
    {!bookableDates.length && <EmptyState title={ct("Boş vaxt tapılmadı")} description={ct("Yaxın 14 gündə bu xidmət üçün boş vaxt yoxdur.")} compact className="mt-3" />}
    {date && !availableSlots.length && <EmptyState title={ct("Bu gün üçün boş vaxt yoxdur")} description={ct("Başqa gün seçin.")} compact className="mt-3" />}
  </fieldset>;
}

export function BookingContactStep({ service, price, specialist, date, time, name, phone, onName, onPhone }: {
  service: string; price: number; specialist: string; date: string; time: string; name: string; phone: string;
  onName: (value: string) => void; onPhone: (value: string) => void;
}) {
  const ct = useCustomerText();
  const displayDate = date ? date.split("-").reverse().join(".") : "";
  return <fieldset className="min-w-0 space-y-4"><legend className="mb-3 text-base font-bold">{ct("Əlaqə məlumatları")}</legend>
    <dl className="grid gap-2 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
      <div><dt className="text-xs text-slate-500">{ct("Xidmət")}</dt><dd className="font-semibold">{service}</dd></div>
      <div><dt className="text-xs text-slate-500">{ct("Usta")}</dt><dd className="font-semibold">{specialist}</dd></div>
      <div><dt className="text-xs text-slate-500">{ct("Tarix")}</dt><dd className="font-semibold">{displayDate}</dd></div>
      <div><dt className="text-xs text-slate-500">{ct("Saat")}</dt><dd className="font-semibold">{time}</dd></div>
      <div className="border-t border-slate-200 pt-2 sm:col-span-2"><dt className="text-xs text-slate-500">{ct("Xidmətin qiyməti")}</dt><dd className="text-base font-bold">{price} ₼</dd></div>
    </dl>
    <label className="block space-y-1 text-sm font-semibold">{ct("Adınız və soyadınız")}<input autoComplete="name" value={name} onChange={(event) => onName(event.target.value)} placeholder={ct("Adınız və soyadınız")} className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-brand-primary" /></label>
    <label className="block space-y-1 text-sm font-semibold">{ct("Mobil nömrə")}<span className="flex h-12 overflow-hidden rounded-xl border border-slate-200 focus-within:border-brand-primary"><span className="flex shrink-0 items-center gap-2 border-r border-slate-200 bg-slate-50 px-3 text-sm font-bold">🇦🇿 +994</span><input type="tel" inputMode="numeric" autoComplete="tel-national" value={phone} onChange={(event) => onPhone(formatPhone(event.target.value))} placeholder="(50) 000-00-00" className="min-w-0 flex-1 px-3 text-sm font-normal outline-none" /></span></label>
    <p className="text-xs text-slate-500">{ct("Məkan təsdiqləyənədək müraciət gözləmə statusunda qalacaq.")}</p>
  </fieldset>;
}
