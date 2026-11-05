import { useState } from "react";
import { useNavigate } from "react-router";
import type { BusinessSession } from "../auth/businessSession";
import { useBusinessSession } from "../auth/useBusinessSession";
import { deleteBusinessAccount } from "../auth/businessCredentials";
import BusinessDeleteDialog from "../components/BusinessDeleteDialog";
import { useLanguage } from "@/features/locale/language";
import { profileCopy } from "./profileLocale";

export default function SecurityPanel({ session }: { session: BusinessSession }) {
  const { endSession } = useBusinessSession();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { language } = useLanguage();
  const text = profileCopy(language);

  function removeProfile() {
    if (!deleteBusinessAccount(session)) { setError("Profili silmək mümkün olmadı."); setDeleting(false); return; }
    endSession();
    navigate("/partner/auth", { replace: true });
  }

  return <div className="space-y-4">
    <section className="rounded-2xl border border-rose-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-rose-600">{text.delete}</h2>
          <p className="mt-1 text-xs font-medium text-slate-400">{text.deleteDetail}</p>
        </div>
        <button type="button" onClick={() => setDeleting(true)} className="min-h-11 shrink-0 cursor-pointer rounded-xl border border-rose-200 bg-rose-50 px-5 text-xs font-bold text-rose-600 hover:bg-rose-100">{text.delete}</button>
      </div>
      {error && <p role="alert" className="mt-3 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
    </section>
    {deleting && <BusinessDeleteDialog name={session.businessName} detail="Profil, xidmətlər, müştərilər və qəbullar silinəcək. Bu əməliyyatı geri qaytarmaq mümkün deyil." onClose={() => setDeleting(false)} onDelete={removeProfile} />}
  </div>;
}
