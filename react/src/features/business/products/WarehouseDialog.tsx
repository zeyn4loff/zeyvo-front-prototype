import { type FormEvent } from "react";
import BusinessFormDialog from "../components/BusinessFormDialog";
import { BusinessField, BusinessInput, BusinessTextarea } from "../components/BusinessField";
import type { Warehouse } from "./products";

export default function WarehouseDialog({ initial, defaultBranchId = "", error, onClose, onSave }: { initial?: Warehouse; defaultBranchId?: string; error?: string; onClose: () => void; onSave: (warehouse: Warehouse) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    if (!name) return;
    onSave({
      id: initial?.id ?? crypto.randomUUID(),
      name,
      branchId: initial?.branchId || defaultBranchId,
      responsible: String(form.get("responsible") ?? "").trim(),
      address: String(form.get("address") ?? "").trim(),
      notes: String(form.get("notes") ?? "").trim(),
      typeName: initial?.typeName ?? "Filial anbarı",
      isDefault: initial?.isDefault ?? initial?.id === "wh_1",
    });
  }

  return <BusinessFormDialog size="compact" title={initial ? "Anbarı redaktə et" : "Yeni anbar əlavə et"} description="Saxlanc məntəqəsi və ya kabinet vitrini" error={error} onClose={onClose}>
    <form onSubmit={submit} className="space-y-4 text-xs font-normal">
      <BusinessField label="Anbarın adı *"><BusinessInput name="name" required maxLength={120} autoFocus defaultValue={initial?.name} placeholder="Məs: Əsas anbar və ya Vitrin anbarı" /></BusinessField>
      <BusinessField label="Məsul şəxs"><BusinessInput name="responsible" maxLength={100} defaultValue={initial?.responsible} placeholder="Məs: Leyla Məmmədova" /></BusinessField>
      <BusinessField label="Ünvan və ya yerləşmə zonası"><BusinessInput name="address" maxLength={160} defaultValue={initial?.address} placeholder="Məs: Əsas zal, 2-ci mərtəbə" /></BusinessField>
      <BusinessField label="Qeydlər"><BusinessTextarea name="notes" maxLength={300} rows={3} defaultValue={initial?.notes} placeholder="Anbar təyinatı və ya xüsusi təlimatlar..." /></BusinessField>
      <div className="flex items-center justify-end gap-2.5 pt-2"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-4 font-medium text-slate-900 transition hover:bg-slate-200">Ləğv et</button><button type="submit" className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-4 font-medium text-slate-900 transition hover:brightness-95">{initial ? "Dəyişiklikləri saxla" : "Anbarı saxla"}</button></div>
    </form>
  </BusinessFormDialog>;
}
