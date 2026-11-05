import { useState, type FormEvent } from "react";
import { Camera, LockKeyhole, MessageSquare, Star } from "lucide-react";
import AzPhoneInput from "../components/AzPhoneInput";
import { businessControlClass, businessLabelClass } from "../components/BusinessField";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { BusinessTabButton, BusinessTabRail } from "../components/BusinessTabs";
import type { ServiceData } from "../services/services";
import { defaultSchedule, weekdays, type StaffMember, type StaffRole, type StaffSalaryScheme } from "./staff";
import StaffServicesPane from "./StaffServicesPane";
import StaffWeeklySchedule from "./StaffWeeklySchedule";
import StaffSalaryPane from "./StaffSalaryPane";
import { StaffAvailabilityEditor, StaffReviewsEditor } from "./StaffAvailabilityEditor";
import StaffPermissionsPane from "./StaffPermissionsPane";
import { normalizePermissions, permissionGroups, templates } from "./staffPermissions";

const field = businessControlClass;
const label = businessLabelClass;
const colors = ["#D0F482", "#EC4899", "#3B82F6", "#10B981", "#8B5CF6", "#F97316"];
type FormTab = "info" | "online" | "services" | "schedule" | "pay" | "permissions";

function Actions({ onClose }: { onClose: () => void }) {
  return <div className="flex shrink-0 justify-end gap-2 border-t border-slate-100 pt-4">
    <button type="button" onClick={onClose} className="min-h-10 cursor-pointer rounded-xl bg-slate-100 px-4 text-sm font-semibold">İmtina</button>
    <button type="submit" className="min-h-10 cursor-pointer rounded-xl bg-brand-primary px-4 text-sm font-bold">Yadda saxla</button>
  </div>;
}

export function StaffFormDialog({ initial, roles, branchId, serviceData, initialTab = "info", onClose, onSave }: {
  initial?: StaffMember; roles: StaffRole[]; branchId: string; serviceData: ServiceData;
  initialTab?: "info" | "online" | "services" | "schedule" | "pay"; onClose: () => void; onSave: (item: StaffMember, serviceIds: string[]) => void;
}) {
  const [tab, setTab] = useState<FormTab>(initialTab);
  const [scheduleTab, setScheduleTab] = useState<"base" | "exceptions">("base");
  const [schedule, setSchedule] = useState(() => initial?.schedule ?? defaultSchedule());
  const [exceptions, setExceptions] = useState(() => initial?.scheduleExceptions ?? []);
  const [reviews, setReviews] = useState(() => initial?.reviews ?? []);
  const [serviceIds] = useState(() => initial ? serviceData.services.filter((service) => service.staffIds.includes(initial.id)).map((service) => service.id) : []);
  const [name, setName] = useState(initial?.name ?? "");
  const [roleId, setRoleId] = useState(initial?.roleId ?? roles[0]?.id ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [gender, setGender] = useState<"female" | "male">(initial?.gender ?? "male");
  const [color, setColor] = useState(initial?.color ?? "#D0F482");
  const [salaryScheme, setSalaryScheme] = useState<StaffSalaryScheme>(initial?.salaryScheme ?? "commission");
  const [serviceCommission, setServiceCommission] = useState(initial?.serviceCommission ?? 40);
  const [productCommission, setProductCommission] = useState(initial?.productCommission ?? 10);
  const [fixedSalary, setFixedSalary] = useState(initial?.fixedSalary ?? 0);
  const [rentalType, setRentalType] = useState(initial?.rentalType ?? "monthly");
  const [rentalAmount, setRentalAmount] = useState(initial?.rentalAmount ?? 300);
  const [rentalCardCommission, setRentalCardCommission] = useState(initial?.rentalCardCommission ?? 0);
  const [permissionTemplate, setPermissionTemplate] = useState(initial?.permissionTemplate ?? "specialist");
  const [permissions, setPermissions] = useState<Record<string, boolean>>(() => normalizePermissions(initial?.permissions));
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(initial?.avatar ?? "");
  const initials = name.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toLocaleUpperCase("az-AZ") || "UA";

  function selectTemplate(value: string) {
    setPermissionTemplate(value);
    if (value !== "custom") setPermissions(Object.fromEntries(permissionGroups.flatMap((group) => group.items.map(([id]) => [id, templates[value].includes(id)]))));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!name.trim()) { setTab("info"); setError("Ad və soyad daxil edin."); return; }
    if (!roleId) { setTab("info"); setError("Vəzifə seçin."); return; }
    if (!phone.trim()) { setTab("info"); setError("Mobil nömrə daxil edin."); return; }
    if (weekdays.some((day) => schedule[day].enabled && (schedule[day].start >= schedule[day].end || (schedule[day].breakStart && schedule[day].breakEnd && (schedule[day].breakStart! >= schedule[day].breakEnd! || schedule[day].breakStart! < schedule[day].start || schedule[day].breakEnd! > schedule[day].end))))) {
      setTab("schedule"); setScheduleTab("base"); setError("İş və fasilə saatlarını yoxlayın."); return;
    }
    onSave({
      ...initial, id: initial?.id ?? crypto.randomUUID(), name: name.trim(), roleId, gender, avatar,
      specialization: String(form.get("specialization") ?? "").trim(), phone: phone.trim(),
      email: String(form.get("email") ?? "").trim(), branchId,
      status: initial?.status === "dismissed" ? "dismissed" : String(form.get("status") || "active") as StaffMember["status"],
      onlineBooking: initial?.status === "dismissed" ? false : form.get("onlineBooking") === "on",
      onlineNote: String(form.get("onlineNote") ?? "").trim(), salaryScheme,
      serviceCommission, productCommission, fixedSalary, rentalType, rentalAmount, rentalCardCommission, permissionTemplate, permissions,
      schedule, scheduleExceptions: exceptions, reviews, color, bio: String(form.get("bio") ?? "").trim(),
    }, serviceIds);
  }

  return <BusinessFormDialog title={initial ? "Ustanı redaktə et" : "Yeni usta əlavə et"} description="Mütəxəssis profili, iş saatları, təyin olunmuş xidmətlər və komissiya" size="large" mobileSheet onClose={onClose}>
    <form onSubmit={submit} className="flex min-h-0 flex-col gap-4 text-xs">
      <div className="-mx-1 overflow-x-auto px-1 pb-1" aria-label="Usta forması bölmələri">
        <BusinessTabRail>{([
          { id: "info", name: "Şəxsi məlumatlar" }, { id: "online", name: "Onlayn qəbul", count: initial?.reviewsCount || reviews.length },
          { id: "services", name: "Xidmətlər", count: serviceIds.length }, { id: "schedule", name: "İş qrafiki" },
          { id: "pay", name: "Əməkhaqqı" }, { id: "permissions", name: "İcazələr" },
        ] as { id: FormTab; name: string; count?: number }[]).map((item) => <BusinessTabButton key={item.id} active={tab === item.id} count={item.count || undefined} onClick={() => { setTab(item.id); setError(""); }}>{item.name}</BusinessTabButton>)}</BusinessTabRail>
      </div>
      <div className="min-h-0 max-h-[52vh] space-y-4 overflow-y-auto pr-1 sm:max-h-[56vh]">
        <section className={tab === "info" ? "space-y-4" : "hidden"}>
          {initial?.status === "dismissed" && <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 font-semibold text-rose-800">Usta işdən azad edilib · Bərpa üçün siyahıdakı əməliyyatı seçin</div>}
          <div className="flex min-w-0 items-center gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#121316] p-4 text-white">
            <label className="relative flex size-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-brand-primary/60 bg-white/10 text-xl font-black text-brand-primary" title="Foto yüklə">
              {avatar ? <img src={avatar} alt="" className="size-full object-cover" /> : initials}
              <input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; if (file.size > 400_000) { setError("Şəkil 400 KB-dan kiçik olmalıdır."); return; } const reader = new FileReader(); reader.onload = () => setAvatar(String(reader.result ?? "")); reader.readAsDataURL(file); }} />
              <Camera size={15} className="absolute bottom-0 right-0 rounded-full bg-brand-primary p-0.5 text-slate-900" />
            </label>
            <div className="min-w-0"><strong className="block truncate text-base">{name || "Usta adı"}</strong><span className="block truncate text-amber-300">{roles.find((role) => role.id === roleId)?.name ?? "Vəzifə"}</span><span className="block truncate text-slate-400">{phone || "+994 50 000-00-00"}</span></div>
            {avatar && <button type="button" onClick={() => setAvatar("")} className="ml-auto shrink-0 cursor-pointer text-rose-300">Şəkli sil</button>}
          </div>
          <div><span className={label}>Cins</span><div className="mt-1 grid max-w-xs grid-cols-2 gap-2">{([["female", "Qadın"], ["male", "Kişi"]] as const).map(([value, text]) => <button key={value} type="button" onClick={() => setGender(value)} aria-pressed={gender === value} className={`min-h-10 cursor-pointer rounded-xl border px-3 font-bold ${gender === value ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>{text}</button>)}</div></div>
          <div className="grid gap-3 sm:grid-cols-2"><label className={label}>Ad və Soyad *<input name="name" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} className={field} /></label><label className={label}>Vəzifə / Peşə *<select name="roleId" value={roleId} onChange={(event) => setRoleId(event.target.value)} className={field}><option value="">Seçin</option>{roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select></label></div>
          <div className="grid gap-3 sm:grid-cols-2"><label className={label}>İxtisaslaşma sahəsi<input name="specialization" maxLength={100} defaultValue={initial?.specialization} className={field} /></label><label className={label}>Status{initial?.status === "dismissed" ? <span className={`${field} flex items-center`}>İşdən ayrılıb</span> : <select name="status" defaultValue={initial?.status ?? "active"} className={field}><option value="active">Aktiv (İşdə və qəbulda)</option><option value="vacation">Məzuniyyətdə / Xəstəlikdə</option><option value="inactive">Qeyri-aktiv</option></select>}</label></div>
          <div className="grid gap-3 sm:grid-cols-2"><label className={label}>Mobil nömrə *<AzPhoneInput name="phone" value={phone} onValueChange={setPhone} /></label><label className={label}>E-poçt ünvanı<input name="email" type="email" maxLength={100} defaultValue={initial?.email} className={field} /></label></div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><strong>Təqvimdə rəng kodu</strong><p className="mt-1 text-slate-500">Jurnalda ustanın qəbullarını fərqləndirmək üçün</p><div className="mt-3 flex flex-wrap gap-3">{colors.map((value) => <button type="button" key={value} onClick={() => setColor(value)} aria-label={`Rəng ${value}`} aria-pressed={color === value} style={{ backgroundColor: value }} className={`size-8 cursor-pointer rounded-full ${color === value ? "ring-2 ring-slate-900 ring-offset-2" : ""}`} />)}</div></div>
          <label className={label}>Usta haqqında bio və təcrübə<textarea name="bio" rows={3} maxLength={500} defaultValue={initial?.bio} className={`${field} py-3`} /></label>
        </section>
        <section className={tab === "online" ? "space-y-4" : "hidden"}>
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4"><span className="min-w-0"><strong className="block text-xs font-bold text-slate-900">Onlayn sifarişə icazə verilsin</strong><span className="block text-[11px] font-normal text-slate-400">Müştərilər veb-sayt və tətbiqdən bu ustanı seçərək qəbula yazıla bilsinlər</span></span><span className="relative inline-flex shrink-0 items-center"><input name="onlineBooking" type="checkbox" defaultChecked={initial?.onlineBooking ?? true} className="peer sr-only" /><span aria-hidden="true" className="h-6 w-11 rounded-full bg-slate-200 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-transform peer-checked:bg-brand-primary peer-checked:after:translate-x-5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-slate-900" /></span></label>
          <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><strong className="flex items-center gap-1.5 text-xs text-slate-800"><Star size={16} fill="currentColor" className="text-amber-500" />Müştəri reytinqi və rəylər</strong><span className="inline-flex items-center gap-1 rounded-lg border border-slate-200/80 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500 shadow-xs"><LockKeyhole size={12} className="text-emerald-600" />Real müştəri rəyləri</span></div><div className="grid grid-cols-2 gap-3"><div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs"><span className="block text-[11px] font-semibold text-slate-400">Cari reytinq balı</span><div className="mt-1 flex flex-wrap items-baseline gap-1.5"><strong className="inline-flex items-center gap-1 text-2xl font-black tracking-tight text-slate-900"><Star size={20} fill="currentColor" className="shrink-0 text-amber-400" />{reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : initial?.rating?.toFixed(1) ?? "5.0"}</strong><span className="text-[11px] font-medium text-slate-400">/ 5.0</span></div></div><div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs"><span className="block text-[11px] font-semibold text-slate-400">Rəy sayı</span><div className="mt-1 flex flex-wrap items-baseline gap-1.5"><strong className="text-2xl font-black tracking-tight text-slate-900">{reviews.length || initial?.reviewsCount || 0}</strong><span className="text-[11px] font-medium text-slate-400">müştəri rəyi</span></div></div></div><p className="text-[11px] font-normal leading-relaxed text-slate-400">Bu göstəricilər qəbulda olmuş real müştərilərin rəyləri əsasında avtomatik formalaşır və əl ilə dəyişdirilə bilməz.</p></div>
          <label className={label}>Müştəriyə onlayn tövsiyə və ya qeyd<textarea name="onlineNote" rows={2} maxLength={500} defaultValue={initial?.onlineNote} placeholder="Məsələn: Rəngləmə prosedurları öncəsi saçın 1 gün əvvəl yuyulması tövsiyə olunur..." className={`${field} py-3 text-xs font-normal leading-relaxed`} /></label>
          <div className="border-t border-slate-100 pt-3"><div className="flex items-center gap-1.5"><MessageSquare size={16} className="text-slate-500" /><strong className="text-xs text-slate-900">Müştəri rəyləri və cavablar</strong><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">{reviews.length} rəy</span></div><p className="text-[11px] font-normal text-slate-400">Müştərilərin şərhlərinə baxın və birbaşa salondan rəsmi cavab yazın</p></div>
          <StaffReviewsEditor items={reviews} onChange={setReviews} />
        </section>
        {tab === "services" && <StaffServicesPane data={serviceData} selected={serviceIds} memberId={initial?.id} />}
        <section className={tab === "schedule" ? "space-y-4" : "hidden"}>
          <div className="flex gap-1.5 rounded-xl bg-slate-100 p-1">{([["base", "Həftəlik baza qrafik"], ["exceptions", "Xüsusi tarixlər və istisnalar"]] as const).map(([id, text]) => <button key={id} type="button" onClick={() => setScheduleTab(id)} className={`min-h-9 min-w-0 flex-1 cursor-pointer rounded-lg px-2 text-[11px] font-bold sm:text-xs ${scheduleTab === id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{text}{id === "exceptions" && exceptions.length > 0 && <span className="ml-1 rounded-full bg-brand-primary px-1.5 text-[10px] text-slate-900">{exceptions.length}</span>}</button>)}</div>
          {scheduleTab === "base" ? <StaffWeeklySchedule schedule={schedule} exceptionsCount={exceptions.length} onChange={(next) => { setSchedule(next); setError(""); }} onShowExceptions={() => setScheduleTab("exceptions")} /> : <StaffAvailabilityEditor items={exceptions} onChange={setExceptions} />}
        </section>
        {tab === "pay" && <StaffSalaryPane scheme={salaryScheme} onSchemeChange={setSalaryScheme} serviceCommission={serviceCommission} onServiceCommissionChange={setServiceCommission} productCommission={productCommission} onProductCommissionChange={setProductCommission} fixedSalary={fixedSalary} onFixedSalaryChange={setFixedSalary} rentalType={rentalType === "daily" ? "daily" : "monthly"} onRentalTypeChange={setRentalType} rentalAmount={rentalAmount} onRentalAmountChange={setRentalAmount} rentalCardCommission={rentalCardCommission} onRentalCardCommissionChange={setRentalCardCommission} />}
        <section className={tab === "permissions" ? "block" : "hidden"}>
          <StaffPermissionsPane role={permissionTemplate} permissions={permissions} name={name} email={initial?.email ?? ""} staffId={initial?.id} onRoleChange={selectTemplate} onPermissionChange={(id, checked) => { setPermissions((current) => ({ ...current, [id]: checked })); setPermissionTemplate("custom"); }} />
        </section>
      </div>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-rose-700">{error}</p>}
      <Actions onClose={onClose} />
    </form>
  </BusinessFormDialog>;
}

export function RoleFormDialog({ initial, error, onClose, onSave }: { initial?: StaffRole; error?: string; onClose: () => void; onSave: (item: StaffRole) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); onSave({ id: initial?.id ?? crypto.randomUUID(), name: String(form.get("name")).trim(), description: String(form.get("description")).trim(), commission: Number(form.get("commission")), isDefault: initial?.isDefault ?? false }); }
  return <BusinessFormDialog title={initial ? "Vəzifəni redaktə et" : "Yeni vəzifə"} size="medium" onClose={onClose}><form onSubmit={submit} className="space-y-4"><label className={label}>Vəzifənin adı *<input name="name" required maxLength={100} autoFocus defaultValue={initial?.name} className={field} /></label><label className={label}>Təsvir<textarea name="description" maxLength={300} rows={3} defaultValue={initial?.description} className={`${field} py-3`} /></label><label className={label}>Standart komissiya %<input name="commission" type="number" min="0" max="100" step="1" required defaultValue={initial?.commission ?? 40} className={field} /></label>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<Actions onClose={onClose} /></form></BusinessFormDialog>;
}
