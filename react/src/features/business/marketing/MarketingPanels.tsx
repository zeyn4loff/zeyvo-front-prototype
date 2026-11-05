import { businessLabelClass } from "../components/BusinessField";
import BusinessFormDialog from "../components/BusinessFormDialog";

export function ReviewReplyDialog({ reply, onChange, onClose, onSave }: {
  reply: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  return <BusinessFormDialog title="Rəyə cavab" onClose={onClose} size="medium">
    <label className={businessLabelClass}>Cavab
      <textarea autoFocus value={reply} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-28 w-full min-w-0 rounded-xl border border-slate-200 p-3 text-sm" maxLength={1000} />
    </label>
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl bg-slate-100 px-4">İmtina</button>
      <button type="button" onClick={onSave} className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-4 font-bold">Saxla</button>
    </div>
  </BusinessFormDialog>;
}
