import { businessLabelClass } from "../components/BusinessField";
import { useState, type FormEvent } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { type Booking, type BookingStatus } from "./bookings";
import type { Client } from "../clients/clients";
import type { Service, ServiceCategory } from "../services/services";
import AzPhoneInput from "../components/AzPhoneInput";
import BusinessDatePicker from "../components/BusinessDatePicker";
import { paymentLabels, type PaymentMethod } from "../pos/pos";

const inputClass = "mt-1 min-h-10 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-900 outline-none focus:border-amber-400";
const textareaClass = `${inputClass} h-auto resize-none py-3 font-normal leading-relaxed`;

export default function BookingDialog({ initial, businessId, branchId, date, time, masterName, masters, clients, services, categories, bookings, onClose, onSave, onDelete }: { initial?: Booking; businessId?: string; branchId?: string; date: string; time: string; masterName?: string; masters: string[]; clients: Client[]; services: Service[]; categories: ServiceCategory[]; bookings: Booking[]; onClose: () => void; onSave: (booking: Booking, method?: PaymentMethod) => string | null; onDelete: (id: string) => void }) {
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const matchedClient = clients.find((client) => client.id === initial?.clientId || (initial?.phone && client.phone.replace(/\D/g, "") === initial.phone.replace(/\D/g, "")) || (initial?.clientName && client.name.toLocaleLowerCase("az-AZ") === initial.clientName.toLocaleLowerCase("az-AZ")));
  const [clientId, setClientId] = useState(matchedClient?.id ?? "");
  const [clientMode, setClientMode] = useState<"existing" | "new">(initial && !matchedClient ? "new" : clients.length ? "existing" : "new");
  const [clientName, setClientName] = useState(initial?.clientName ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [serviceId, setServiceId] = useState(initial?.serviceId ?? services.find((service) => service.name === initial?.service)?.id ?? "");
  const [serviceName, setServiceName] = useState(initial?.service ?? "");
  const [duration, setDuration] = useState(initial?.durationMinutes ?? 30);
  const [price, setPrice] = useState(initial?.price ?? services[0]?.price ?? 0);
  const [bookingDate, setBookingDate] = useState(initial?.date ?? date);
  const [bookingTime, setBookingTime] = useState(initial?.time ?? time);
  const [selectedMaster, setSelectedMaster] = useState(initial?.masterName ?? masterName ?? masters[0] ?? "");
  const [status, setStatus] = useState<BookingStatus>(initial?.status ?? "Təsdiqləndi");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(initial?.paymentMethod ?? "cash");
  const [showPayment, setShowPayment] = useState(Boolean(initial));
  const startMinutes = (value: string) => { const [hours, minutes] = value.split(":").map(Number); return hours * 60 + minutes; };
  const selectedService = services.find((service) => service.id === serviceId);
  const conflict = selectedMaster && bookingDate && bookingTime && status !== "Ləğv edildi" ? bookings.find((booking) => {
    if (booking.id === initial?.id || booking.date !== bookingDate || booking.status === "Ləğv edildi" || booking.masterName !== selectedMaster) return false;
    if (selectedService?.format === "group" && booking.serviceId === serviceId && booking.time === bookingTime) return false;
    const requestedStart = startMinutes(bookingTime);
    const occupiedStart = startMinutes(booking.time);
    return requestedStart < occupiedStart + booking.durationMinutes && occupiedStart < requestedStart + duration;
  }) : undefined;
  function chooseClient(id: string) { const client = clients.find((item) => item.id === id); setClientId(id); if (client) { setClientName(client.name); setPhone(client.phone); } }
  function chooseService(id: string) { const service = services.find((item) => item.id === id); setServiceId(id); if (service) { setServiceName(service.name); setDuration(service.duration); setPrice(service.price); } }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (confirmDelete) return;
    const data = new FormData(event.currentTarget);
    const booking: Booking = {
      businessId: initial?.businessId ?? businessId,
      branchId: initial?.branchId ?? branchId,
      customerEmail: initial?.customerEmail,
      paymentMethod: initial?.paymentMethod,
      paymentAccountId: initial?.paymentAccountId,
      id: initial?.id ?? crypto.randomUUID(),
      clientId: clientId || undefined,
      serviceId: serviceId || undefined,
      clientName: String(data.get("clientName") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      service: String(data.get("service") || "").trim(),
      masterName: String(data.get("masterName") || "").trim(),
      date: String(data.get("date") || ""),
      time: String(data.get("time") || ""),
      durationMinutes: Number(data.get("durationMinutes")),
      price: Number(data.get("price")),
      status: String(data.get("status")) as BookingStatus,
      source: initial?.source ?? "manual",
      note: String(data.get("note") || "").trim(),
    };
    const validationError = onSave(booking, paymentMethod);
    if (validationError) setError(validationError);
  }

  return <BusinessFormDialog title={initial ? "Qəbul məlumatları və idarəetmə" : "Yeni qəbul əlavə et"} description={initial ? `${initial.clientName} • ${initial.date}` : "Müştəri, xidmət və vaxt detallarını daxil edin"} onClose={onClose} size="medium">
    <form onSubmit={submit} className="space-y-4 pt-1 text-xs">
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-bold">Müştəri *</span><div className="inline-flex rounded-xl bg-slate-200 p-1 text-xs font-semibold"><button type="button" onClick={() => setClientMode("existing")} className={`min-h-9 rounded-lg px-3 ${clientMode === "existing" ? "bg-white shadow-sm" : "text-slate-600"}`}>Mövcud müştəri</button><button type="button" onClick={() => { setClientMode("new"); setClientId(""); }} className={`min-h-9 rounded-lg px-3 ${clientMode === "new" ? "bg-white shadow-sm" : "text-slate-600"}`}>+ Yeni müştəri</button></div></div>
        {clientMode === "existing" ? <><select aria-label="Müştəri seçin" value={clientId} onChange={(event) => chooseClient(event.target.value)} className={inputClass}><option value="">Siyahıdan müştəri seçin ({clients.length} müştəri)</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name} — {client.phone || "Nömrəsiz"} (Ziyarət: {client.visits.length + (client.historicVisits ?? 0)})</option>)}</select>{clientId && <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-xs"><span className="rounded-md bg-slate-100 px-2 py-1 font-semibold">{phone || "Nömrəsiz"}</span><span className="rounded-md bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">Depozit: {Math.max(0, clients.find((item) => item.id === clientId)?.ledger.filter((item) => item.account === "deposit").reduce((sum, item) => sum + item.amount, 0) ?? 0).toFixed(2)} ₼</span><span className="rounded-md bg-amber-50 px-2 py-1 font-semibold text-amber-700">Keşbek: {Math.max(0, clients.find((item) => item.id === clientId)?.ledger.filter((item) => item.account === "cashback").reduce((sum, item) => sum + item.amount, 0) ?? 0).toFixed(2)} ₼</span></div>}</> : <div className="grid gap-3 sm:grid-cols-2"><label className={businessLabelClass}>Müştərinin adı və soyadı *<input required maxLength={100} autoFocus value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Məs: Aysel Məmmədova" className={inputClass} /></label><label className={businessLabelClass}>Əlaqə nömrəsi<AzPhoneInput value={phone} onValueChange={setPhone} /></label></div>}
        <input type="hidden" name="clientName" value={clientName} /><input type="hidden" name="phone" value={phone} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2"><label className={businessLabelClass}>Xidmət *<select value={serviceId} onChange={(event) => chooseService(event.target.value)} className={inputClass}><option value="">{serviceName || "Xidmət seçin"}</option>{[...new Set(services.map((service) => service.categoryId))].map((categoryId) => <optgroup key={categoryId} label={categories.find((category) => category.id === categoryId)?.name ?? "Xidmətlər"}>{services.filter((service) => service.categoryId === categoryId).map((service) => <option key={service.id} value={service.id}>{service.name} — {service.price} ₼ ({service.duration} dəq)</option>)}</optgroup>)}</select><input type="hidden" name="service" value={serviceName} /></label><label className={businessLabelClass}>Mütəxəssis (Usta) *<select name="masterName" required value={selectedMaster} onChange={(event) => setSelectedMaster(event.target.value)} className={inputClass}><option value="">Usta seçin</option>{initial?.masterName && !masters.includes(initial.masterName) && <option value={initial.masterName}>{initial.masterName}</option>}{masters.map((name) => <option value={name} key={name}>{name}</option>)}</select></label></div>
      <div className="grid gap-3 sm:grid-cols-3"><div className="block min-w-0 font-semibold">Tarix *<BusinessDatePicker name="date" label="Qəbul tarixi" value={bookingDate} onChange={setBookingDate} /></div><label className="block min-w-0 font-semibold">Başlama vaxtı *<select name="time" required value={bookingTime} onChange={(event) => setBookingTime(event.target.value)} className={inputClass}>{bookingTime && !Array.from({ length: 56 }, (_, index) => { const minutes = 8 * 60 + index * 15; return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`; }).includes(bookingTime) && <option value={bookingTime}>{bookingTime}</option>}{Array.from({ length: 56 }, (_, index) => { const minutes = 8 * 60 + index * 15; const value = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`; return <option key={value} value={value}>{value}</option>; })}</select></label><label className="block min-w-0 font-semibold">Müddət (dəq)<select name="durationMinutes" value={duration} onChange={(event) => setDuration(Number(event.target.value))} className={inputClass}>{![15, 30, 45, 60, 90, 120, 180].includes(duration) && <option value={duration}>{duration} dəq</option>}{[15, 30, 45, 60, 90, 120, 180].map((minutes) => <option key={minutes} value={minutes}>{minutes} dəq</option>)}</select></label></div>
      <div className="grid gap-3 sm:grid-cols-2"><label className={businessLabelClass}>Məbləğ (₼) *<input name="price" required type="number" min="0" max="100000" step="0.5" value={price} onChange={(event) => setPrice(Number(event.target.value))} className={inputClass} /></label><label className={businessLabelClass}>Qəbul statusu<select name="status" value={status} onChange={(event) => { const next = event.target.value as BookingStatus; setStatus(next); if (next === "Tamamlandı") setShowPayment(true); }} className={inputClass}>{(["Təsdiqləndi", "Gözlənilir", "Gəldi", "Xidmət göstərilir", "Tamamlandı", "Gəlmədi", "Ləğv edildi"] as BookingStatus[]).map((item) => <option key={item} value={item}>{item === "Gəldi" ? "Gəldi (Salondadır)" : item}</option>)}</select></label></div>
      {conflict && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"><strong className="block text-sm text-rose-900">Bu vaxt aralığında ustanın artıq qəbulu var!</strong><span className="mt-1 block">{conflict.time} — {conflict.clientName} ({conflict.service})</span><span className="mt-1 block">Başqa saat və ya başqa usta seçin.</span></div>}
      {!showPayment && <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600"><span>Ödəniş qəbul tamamlandıqda qeyd edilir</span><button type="button" onClick={() => { setStatus("Tamamlandı"); setShowPayment(true); }} className="cursor-pointer font-semibold text-amber-700 underline">İndi ödəniş qeyd et</button></div>}
      {showPayment && <fieldset className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5"><div className="mb-2 flex items-center justify-between gap-2"><legend className="font-bold">Ödəniş üsulu</legend><span className="text-xs text-slate-500">Hesablaşma kanalı</span></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{(Object.keys(paymentLabels) as PaymentMethod[]).map((method) => <button key={method} type="button" aria-pressed={paymentMethod === method} onClick={() => setPaymentMethod(method)} className={`min-h-10 cursor-pointer rounded-xl border p-2 text-xs font-semibold ${paymentMethod === method ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white"}`}>{method === "terminal" ? "POS-Terminal" : method === "bonus" ? "Keşbek / Bonus" : paymentLabels[method]}</button>)}</div>{initial?.paymentMethod && <p className="mt-2 text-xs text-slate-500">Bu qəbulun ödənişi qeydə alınıb.</p>}</fieldset>}
      <label className={businessLabelClass}>Qeyd və şərhlər<textarea name="note" defaultValue={initial?.note} rows={2} maxLength={500} className={textareaClass} placeholder="Xüsusi istəklər, allergiyalar və ya qeydlər..." /></label>
      {error && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {confirmDelete && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">Bu qəbulu silmək istəyirsiniz?</p>}
      <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:flex-wrap sm:justify-end">{initial && (confirmDelete ? <button type="button" onClick={() => onDelete(initial.id)} className="min-h-10 cursor-pointer rounded-xl bg-red-600 px-4 font-bold text-white">Silməyi təsdiqlə</button> : <button type="button" onClick={() => setConfirmDelete(true)} className="min-h-10 cursor-pointer rounded-xl bg-red-50 px-4 font-semibold text-red-700 sm:mr-auto">Sil</button>)}{(!initial || confirmDelete) && <button type="button" onClick={confirmDelete ? () => setConfirmDelete(false) : onClose} className="min-h-10 cursor-pointer rounded-xl bg-slate-100 px-4 font-semibold">{confirmDelete ? "İmtina" : "Ləğv et"}</button>}{!confirmDelete && initial && status !== "Tamamlandı" && <button type="button" onClick={() => { setStatus("Tamamlandı"); setShowPayment(true); }} className="min-h-10 cursor-pointer rounded-xl bg-emerald-600 px-4 font-bold text-white">Tamamla</button>}{!confirmDelete && <button type="submit" disabled={Boolean(conflict)} className="min-h-10 cursor-pointer rounded-xl bg-brand-primary px-4 font-bold disabled:cursor-not-allowed disabled:opacity-50">{initial ? "Yadda saxla" : "Qəbula əlavə et"}</button>}</div>
    </form>
  </BusinessFormDialog>;
}
