import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getSpecialistsForSalon } from "@/features/marketplace/data";
import { readPartnerBookings } from "@/features/business/calendar/bookings";
import { readServiceData } from "@/features/business/services/services";
import { readStaffData } from "@/features/business/staff/staff";
import { readResourceData } from "@/features/business/resources/resources";
import type { BusinessSession } from "@/features/business/auth/businessSession";
import { bookingTimeOptions, findAvailableMaster } from "./bookingAvailability";
import { BookingContactStep, BookingMasterStep, BookingServiceStep, BookingTimeStep } from "./BookingSteps";
import { formatPhone } from "./formatPhone";
import { useCustomer } from "./useCustomer";
import { useCustomerText } from "@/features/locale/customerText";

const bookingStepTitles = ["Xidmət", "Usta", "Vaxt", "Məlumatlar"] as const;

export default function BookingModal() {
  const ct = useCustomerText();
  const { modal, closeModal, selectedSalon, selectedSpecialist, selectedService, selectedTime, selectedDate, selectedBranch, selectBookingSpecialist, bookings, user, addBooking, openModal } = useCustomer();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [now] = useState(Date.now);

  if (!selectedSalon) return null;

  function close() {
    setStep(0); setService(null); setDate(null); setTime(null);
    setCustomerName(""); setPhone(""); setError(""); closeModal();
  }

  const activeBranch = selectedBranch ?? selectedSalon.branches?.[0];
  const services = selectedSalon.services;
  const chosenService = services.find((item) => item.name === (service ?? selectedService?.name));
  const partnerSession = selectedSalon.partner ? { id: selectedSalon.partner.ownerId } as BusinessSession : null;
  const businessServices = partnerSession ? readServiceData(partnerSession).services : [];
  const businessService = businessServices.find((item) => item.id === chosenService?.partnerServiceId);
  const partnerStaff = partnerSession ? readStaffData(partnerSession).members : [];
  const partnerResources = partnerSession ? readResourceData(partnerSession).resources : [];
  const partnerBookings = selectedSalon.partner ? readPartnerBookings(selectedSalon.partner.ownerId, selectedSalon.partner.businessId, activeBranch?.id) : [];
  const specialists = getSpecialistsForSalon(selectedSalon)
    .filter((item) => !item.partnerBranchId || !activeBranch || item.partnerBranchId === activeBranch.id)
    .filter((item) => !chosenService || (selectedSalon.partner
      ? !businessService?.staffIds.length || !item.partnerStaffId || businessService.staffIds.includes(item.partnerStaffId)
      : !item.services?.length || item.services.some((offering) => offering.name === chosenService.name)));
  const visibleSteps = specialists.length ? [0, 1, 2, 3] : [0, 2, 3];
  const progressIndex = visibleSteps.indexOf(step);
  const chosenSpecialist = specialists.find((item) => item.id === selectedSpecialist?.id) ?? null;
  const duration = businessService?.duration ?? (Number.parseInt(chosenService?.duration ?? "60", 10) || 60);
  const branchId = activeBranch?.id ?? selectedSalon.partner?.businessId;
  const branchHours = activeBranch?.hours || selectedSalon.workHours;
  const slotOptions = selectedSalon.partner ? bookingTimeOptions(branchHours, duration, selectedSalon.slots) : selectedSalon.slots;
  const dates = Array.from({ length: 14 }, (_, index) => {
    const day = new Date(now); day.setHours(12, 0, 0, 0); day.setDate(day.getDate() + index);
    const value = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
    return { value, label: `${String(day.getDate()).padStart(2, "0")}.${String(day.getMonth() + 1).padStart(2, "0")}` };
  });
  const slotRequest = (slotDate: string, slotTime: string, timestamp = now) => ({
    salon: selectedSalon, specialist: chosenSpecialist, service: businessService, services: businessServices,
    staff: partnerStaff, resources: partnerResources, bookings: partnerBookings, branchId, branchHours,
    date: slotDate, time: slotTime, duration,
    takenTimes: bookings.filter((booking) => booking.status !== "Ləğv edildi" && booking.salonId === selectedSalon.id && booking.branchName === activeBranch?.name && booking.date === slotDate && (booking.masterName || "") === (chosenSpecialist?.name || "")).map((booking) => booking.time),
    now: timestamp,
  });
  const availableDates = dates.filter((day) => !businessService?.onlineSettings || new Date(`${day.value}T00:00:00`).getTime() <= now + businessService.onlineSettings.maxAdvanceDays * 86400000);
  const bookableDates = chosenService ? availableDates.filter((day) => slotOptions.some((slot) => findAvailableMaster(slotRequest(day.value, slot)) !== null)) : [];
  const selectedDay = date ?? selectedDate ?? "";
  const chosenDate = bookableDates.some((day) => day.value === selectedDay) ? selectedDay : "";
  const availableSlots = chosenDate ? slotOptions.filter((slot) => findAvailableMaster(slotRequest(chosenDate, slot)) !== null) : [];
  const selectedSlot = time ?? selectedTime ?? "";
  const chosenTime = availableSlots.includes(selectedSlot) ? selectedSlot : "";
  const name = customerName || user?.name || "";
  const phoneValue = phone || formatPhone(user?.phone || "");

  function chooseService(value: string) {
    if (value === chosenService?.name) return;
    setService(value); setDate(""); setTime(""); setError("");
    const nextService = services.find((item) => item.name === value);
    const nextBusinessService = businessServices.find((item) => item.id === nextService?.partnerServiceId);
    const masterOffersService = !selectedSpecialist?.services?.length || selectedSpecialist.services.some((item) => item.name === value);
    const masterIsAssigned = !nextBusinessService?.staffIds.length || !selectedSpecialist?.partnerStaffId || nextBusinessService.staffIds.includes(selectedSpecialist.partnerStaffId);
    if (!masterOffersService || !masterIsAssigned) selectBookingSpecialist(null);
  }

  function chooseSpecialist(value: typeof chosenSpecialist) {
    if (value?.id === chosenSpecialist?.id) return;
    selectBookingSpecialist(value); setDate(""); setTime(""); setError("");
  }

  function next() {
    if (step === 0 && !chosenService) { setError(ct("Xidmət seçin.")); return; }
    if (step === 2 && (!chosenDate || !chosenTime || findAvailableMaster(slotRequest(chosenDate, chosenTime, Date.now())) === null)) {
      setError(ct("Boş gün və saat seçin.")); return;
    }
    setError(""); setStep(visibleSteps[Math.min(progressIndex + 1, visibleSteps.length - 1)]);
  }

  function submit() {
    const salon = selectedSalon;
    if (!salon || !chosenService) return;
    const freshSlot = slotRequest(chosenDate, chosenTime, Date.now());
    if (salon.partner) {
      freshSlot.bookings = readPartnerBookings(salon.partner.ownerId, salon.partner.businessId, activeBranch?.id);
      freshSlot.staff = readStaffData({ id: salon.partner.ownerId } as BusinessSession).members;
      freshSlot.resources = readResourceData({ id: salon.partner.ownerId } as BusinessSession).resources;
    }
    const availableMaster = chosenDate && chosenTime ? findAvailableMaster(freshSlot) : null;
    if (availableMaster === null) { setStep(2); setTime(""); setError(ct("Seçilən vaxt artıq mövcud deyil. Başqa vaxt seçin.")); return; }
    if (name.trim().length < 2 || phoneValue.replace(/\D/g, "").length !== 9) { setError(ct("Adınızı və 9 rəqəmli mobil nömrənizi daxil edin.")); return; }
    if (!user) { openModal("auth"); return; }
    const issue = addBooking({ salonId: salon.id, salonName: salon.name, branchName: activeBranch?.name ?? (salon.isIndividual ? salon.name : undefined), branchId: activeBranch?.id ?? (salon.isIndividual ? salon.partner?.businessId : undefined), masterName: availableMaster || chosenSpecialist?.name, service: chosenService.name, partnerServiceId: chosenService.partnerServiceId, date: chosenDate, time: chosenTime, customerName: name.trim(), phone: `+994 ${phoneValue}`, status: "Gözlənilir", partnerOwnerId: salon.partner?.ownerId, businessId: salon.partner?.businessId });
    if (issue) { setError(issue); return; }
    setStep(0); setService(null); setDate(null); setTime(null);
  }

  return <Dialog open={modal === "booking"} onOpenChange={(open) => { if (!open) close(); }}>
    <DialogContent className="customer-modal customer-sheet flex max-h-[92dvh] w-full min-w-0 max-w-none flex-col gap-0 overflow-hidden rounded-t-3xl p-0 sm:w-[calc(100vw-1rem)] sm:max-w-2xl sm:rounded-3xl" overlayClassName="customer-overlay">
      <DialogHeader className="shrink-0 px-4 pb-4 pt-5 pr-14 sm:px-6 sm:pt-6">
        <DialogTitle className="break-words text-xl font-bold">{selectedSalon.name}</DialogTitle>
        <p className="text-xs text-slate-500">{activeBranch?.address || selectedSalon.location}</p>
      </DialogHeader>
      <div className="shrink-0 border-b border-slate-100 px-4 py-3 sm:px-6" aria-label={`Addım ${progressIndex + 1} / ${visibleSteps.length}: ${ct(bookingStepTitles[step])}`}>
        <div className="mb-2 flex justify-between text-sm font-semibold"><span>{ct(bookingStepTitles[step])}</span><span className="text-slate-500">{progressIndex + 1} / {visibleSteps.length}</span></div>
        <div className="flex gap-1.5" aria-hidden="true">{visibleSteps.map((value, index) => <span key={value} className={`h-1.5 flex-1 rounded-full ${index <= progressIndex ? "bg-brand-primary" : "bg-slate-100"}`} />)}</div>
      </div>
      <form onSubmit={(event) => { event.preventDefault(); if (step === 3) submit(); else next(); }} className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-5 sm:px-6">
          {step === 0 && <BookingServiceStep services={services} selected={chosenService?.name || ""} onSelect={chooseService} />}
          {step === 1 && <BookingMasterStep specialists={specialists} selected={chosenSpecialist} onSelect={chooseSpecialist} />}
          {step === 2 && <BookingTimeStep dates={availableDates} bookableDates={bookableDates} slots={slotOptions} availableSlots={availableSlots} date={chosenDate} time={chosenTime} onDate={(value) => { setDate(value); setTime(""); setError(""); }} onTime={(value) => { setTime(value); setError(""); }} />}
          {step === 3 && <BookingContactStep service={chosenService?.name || ""} price={chosenService?.price ?? 0} specialist={chosenSpecialist?.name || ct("İstənilən usta")} date={chosenDate} time={chosenTime} name={name} phone={phoneValue} onName={setCustomerName} onPhone={setPhone} />}
          {error && <p role="alert" className="mt-4 text-xs font-semibold text-red-600">{error}</p>}
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-slate-200 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
          <button type="button" onClick={() => { if (step === 0) close(); else { setStep(visibleSteps[progressIndex - 1]); setError(""); } }} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-2 text-sm font-semibold">{step === 0 ? ct("İmtina") : ct("Geri")}</button>
          <button type="button" onClick={step < 3 ? next : submit} className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-2 text-sm font-bold">{step < 3 ? ct("Davam et") : user ? ct("Müraciəti göndər") : ct("Daxil ol və davam et")}</button>
        </div>
      </form>
    </DialogContent>
  </Dialog>;
}
