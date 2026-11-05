import { useState, type FormEvent } from "react";
import type { FinanceCategory } from "./finance";
import { Buttons, Frame } from "./FinanceDialogUi";
import { businessControlClass, businessLabelClass } from "../components/BusinessField";

type Props = {
  category: FinanceCategory | null;
  defaultType: FinanceCategory["type"];
  onClose: () => void;
  onSave: (entry: FinanceCategory) => string | null;
};

export function CategoryDialog({ category, defaultType, onClose, onSave }: Props) {
  const [draft, setDraft] = useState<FinanceCategory>(() => category ?? { id: crypto.randomUUID(), name: "", type: defaultType });
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issue = onSave({ ...draft, name: draft.name.trim() });
    if (issue) setError(issue);
    else onClose();
  }
  return <Frame title={category ? "Kateqoriyanı redaktə et" : "Maliyyə kateqoriyası"} description="Gəlir və ya xərc təsnifatı" onClose={onClose}>
    <form onSubmit={submit} className="space-y-4">
      <label className={businessLabelClass}>Kateqoriyanın adı *
        <input required maxLength={80} value={draft.name} onChange={(event) => { setDraft({ ...draft, name: event.target.value }); setError(""); }} placeholder="məs. İcarə haqqı, Reklam xərcləri..." className={businessControlClass} />
      </label>
      <label className={businessLabelClass}>Növ *
        <select required value={draft.type} onChange={(event) => { setDraft({ ...draft, type: event.target.value as FinanceCategory["type"] }); setError(""); }} className={businessControlClass}>
          <option value="expense">Xərc kateqoriyası</option>
          <option value="income">Gəlir kateqoriyası</option>
        </select>
      </label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700">{error}</p>}
      <Buttons onClose={onClose} />
    </form>
  </Frame>;
}
