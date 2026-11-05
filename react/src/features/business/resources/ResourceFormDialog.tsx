import { businessControlClass } from "../components/BusinessField";
import { useState, type FormEvent } from "react";
import { Armchair, DoorOpen, Zap } from "lucide-react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { resourceUnits, type Resource, type ResourceCategory, type ResourceStatus, type ResourceType } from "./resources";

type Props = {
  initial?: Resource;
  categories: ResourceCategory[];
  defaultCategoryId?: string;
  defaultBranchId?: string;
  error?: string;
  onClose: () => void;
  onSave: (resource: Resource) => void;
};

const fieldClass = businessControlClass;
const cardClass = "flex min-w-0 cursor-pointer flex-col items-center gap-1.5 rounded-2xl border-2 p-2.5 text-center transition sm:p-3";
const selectedClass = "border-slate-900 bg-white shadow-xs ring-2 ring-brand-primary/30";
const idleClass = "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white";
const typeChoices = [
  { id: "chair", name: "Kreslo", detail: "İş yeri", Icon: Armchair, color: "bg-blue-50 text-blue-600" },
  { id: "room", name: "Otaq", detail: "Kabinet", Icon: DoorOpen, color: "bg-purple-50 text-purple-600" },
  { id: "device", name: "Aparat", detail: "Avadanlıq", Icon: Zap, color: "bg-amber-50 text-amber-600" },
] as const;
const statusChoices = [
  { id: "active", name: "Aktiv", detail: "İşlək", color: "bg-emerald-50", dot: "bg-emerald-500 ring-emerald-200" },
  { id: "busy", name: "Məşğul", detail: "İstifadədə", color: "bg-amber-50", dot: "bg-amber-500 ring-amber-200" },
  { id: "maintenance", name: "Təmirdə", detail: "Qeyri-aktiv", color: "bg-rose-50", dot: "bg-rose-500 ring-rose-200" },
] as const;
const nameByType: Record<ResourceType, { label: string; placeholder: string }> = {
  chair: { label: "Kreslonun / iş yerinin adı *", placeholder: "Məs: Kreslo #1 (Barber) və ya Qrim Masası" },
  room: { label: "Otağın / kabinetin adı *", placeholder: "Məs: VIP Kabinet #2 və ya Kosmetologiya Otağı" },
  device: { label: "Aparatın / cihazın adı *", placeholder: "Məs: Candela GentleLase Pro və ya Hydrafacial MD" },
};

function TypeChoices({ value, onChange }: { value: ResourceType; onChange: (value: ResourceType) => void }) {
  return <fieldset><legend className="mb-2 text-xs font-medium text-slate-700">Resurs növü *</legend><div className="grid grid-cols-3 gap-2 sm:gap-2.5">{typeChoices.map(({ id, name, detail, Icon, color }) => <label key={id} className={`${cardClass} ${value === id ? selectedClass : idleClass}`}><span className={`flex size-8 items-center justify-center rounded-xl ${color}`}><Icon size={20} aria-hidden="true" /></span><span><span className="block text-xs font-semibold text-slate-900">{name}</span><span className="block text-[10px] text-slate-400">{detail}</span></span><input type="radio" name="resourceType" value={id} checked={value === id} onChange={() => onChange(id)} className="sr-only" /></label>)}</div></fieldset>;
}

function StatusChoices({ value, onChange }: { value: ResourceStatus; onChange: (value: ResourceStatus) => void }) {
  return <fieldset><legend className="mb-2 text-xs font-medium text-slate-700">Vəziyyət (Status) *</legend><div className="grid grid-cols-3 gap-2 sm:gap-2.5">{statusChoices.map(({ id, name, detail, color, dot }) => <label key={id} className={`${cardClass} ${value === id ? selectedClass : idleClass}`}><span className={`flex size-8 items-center justify-center rounded-xl ${color}`}><span className={`size-2.5 rounded-full ring-2 ${dot}`} /></span><span><span className="block text-xs font-semibold text-slate-900">{name}</span><span className="block text-[10px] text-slate-400">{detail}</span></span><input type="radio" name="resourceStatus" value={id} checked={value === id} onChange={() => onChange(id)} className="sr-only" /></label>)}</div></fieldset>;
}

export default function ResourceFormDialog({ initial, categories, defaultCategoryId = "", defaultBranchId = "", error, onClose, onSave }: Props) {
  const [type, setType] = useState<ResourceType>(initial?.type ?? "chair");
  const initialUnits = initial ? resourceUnits(initial) : [];
  const [unitStatuses, setUnitStatuses] = useState<ResourceStatus[]>(initialUnits.map((unit) => unit.status));
  const [quantity, setQuantity] = useState(String(initialUnits.length || 1));
  const count = Math.max(1, Math.min(1000, Math.floor(Number(quantity) || 1)));
  const changeUnitStatus = (index: number, next: ResourceStatus) => setUnitStatuses((current) => {
    const updated = [...current];
    updated[index] = next;
    return updated;
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    if (!name) return;
    onSave({
      id: initial?.id ?? crypto.randomUUID(), name, type,
      branchId: initial?.branchId ?? defaultBranchId,
      categoryId: String(data.get("categoryId") || ""),
      units: Array.from({ length: count }, (_, index) => ({ id: initialUnits[index]?.id ?? crypto.randomUUID(), status: unitStatuses[index] ?? "active" })),
      notes: String(data.get("notes") || "").trim(),
    });
  }

  return <BusinessFormDialog title={initial ? "Resursu redaktə et" : "Yeni resurs əlavə et"} description="Kreslo, kabinet və ya avadanlıq məlumatlarını daxil edin" onClose={onClose} size="medium">
    <form onSubmit={submit} className="space-y-4 text-xs">
      <TypeChoices value={type} onChange={setType} />
      <label className="block font-medium text-slate-700">{nameByType[type].label}<input name="name" required maxLength={100} defaultValue={initial?.name} placeholder={nameByType[type].placeholder} className={fieldClass} /></label>
      <label className="block font-medium text-slate-700">Kateqoriya (İstəyə bağlı)<select name="categoryId" defaultValue={initial?.categoryId ?? defaultCategoryId} className={`${fieldClass} cursor-pointer`}><option value="">— Kateqoriyasız (Sərbəst resurs) —</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
      {count === 1 && <StatusChoices value={unitStatuses[0] ?? "active"} onChange={(next) => changeUnitStatus(0, next)} />}
      <div><label htmlFor="resource-quantity" className="block font-medium text-slate-700">Resursun sayı *</label><div className="mt-1.5 flex min-w-0 items-center gap-2"><button type="button" onClick={() => setQuantity(String(Math.max(1, count - 1)))} aria-label="Resurs sayını azalt" className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-lg font-bold text-slate-700 transition hover:bg-slate-200">−</button><input id="resource-quantity" name="quantity" type="number" min="1" max="1000" step="1" required value={quantity} onChange={(event) => setQuantity(event.target.value)} onBlur={() => setQuantity(String(count))} className={`${fieldClass} mt-0 min-w-0 flex-1 text-center text-sm font-bold`} /><button type="button" onClick={() => setQuantity(String(Math.min(1000, count + 1)))} aria-label="Resurs sayını artır" className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-lg font-bold text-slate-700 transition hover:bg-slate-200">+</button></div><p className="mt-1 text-[11px] text-slate-400">Minimum 1 olmalıdır (0 ola bilməz)</p></div>
      {count > 1 && <fieldset className="space-y-2"><legend className="mb-2 text-xs font-medium text-slate-700">Hər resursun vəziyyəti *</legend><div className="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">{Array.from({ length: count }, (_, index) => <label key={initialUnits[index]?.id ?? index} className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-2.5"><span className="min-w-0 text-xs font-semibold text-slate-800">Resurs {index + 1}</span><select aria-label={`Resurs ${index + 1} vəziyyəti`} value={unitStatuses[index] ?? "active"} onChange={(event) => changeUnitStatus(index, event.target.value as ResourceStatus)} className="min-h-10 max-w-[62%] cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-slate-900 focus:ring-2 focus:ring-brand-primary/40"><option value="active">Aktiv / Boş</option><option value="busy">Məşğul</option><option value="maintenance">Təmirdə</option></select></label>)}</div></fieldset>}
      <label className="block font-medium text-slate-700">Təsvir və ya qeydlər<textarea name="notes" defaultValue={initial?.notes} maxLength={500} rows={3} placeholder="Resurs haqqında əlavə qeydlər, avadanlıq modeli və ya təlimatlar..." className={`${fieldClass} h-auto resize-none py-3 font-normal leading-relaxed`} /></label>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}
      <div className="flex flex-col-reverse gap-2 pt-2 min-[360px]:flex-row min-[360px]:justify-end min-[360px]:gap-2.5"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-[14px] border border-slate-200 bg-slate-100 px-5 text-xs font-bold transition hover:bg-slate-200 sm:min-h-10">Ləğv et</button><button type="submit" className="min-h-11 cursor-pointer rounded-[14px] bg-brand-primary px-5 text-xs font-bold transition hover:bg-[#B9DC65] sm:min-h-10">{initial ? "Dəyişiklikləri saxla" : "Resursu əlavə et"}</button></div>
    </form>
  </BusinessFormDialog>;
}
