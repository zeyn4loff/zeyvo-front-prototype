import { useState } from "react";
import { useLanguage } from "@/features/locale/language";
import { profileCopy } from "./profileLocale";

export default function ConnectedAppsPanel() {
  const [showDetails, setShowDetails] = useState(false);
  const { language } = useLanguage();
  const text = profileCopy(language);

  return <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
    <div className="border-b border-slate-100 pb-3">
      <h2 className="text-sm font-bold">{text.apps}</h2>
      <p className="mt-1 text-xs font-medium text-slate-400">{text.appsDetail}</p>
    </div>

    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex min-w-0 items-center gap-3.5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <img src="/google-calendar.png" alt="" className="size-full object-contain" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold">Google Calendar</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
              <span className="size-1.5 rounded-full bg-slate-400" />{text.disconnected}
            </span>
          </div>
          <p className="mt-0.5 text-xs font-medium text-slate-500">{text.googleDisconnected}</p>
        </div>
      </div>

      <div className="grid gap-2 min-[400px]:grid-cols-2 sm:flex sm:shrink-0">
        <button type="button" disabled title={text.googleDisconnected} className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-400 shadow-sm disabled:cursor-not-allowed">
          {text.sync}
        </button>
        <button type="button" aria-expanded={showDetails} onClick={() => setShowDetails((value) => !value)} className="min-h-11 cursor-pointer rounded-xl bg-brand-primary px-4 text-xs font-bold hover:bg-[#b9dc65]">
          {text.settings}
        </button>
      </div>
    </div>

    {showDetails && <p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
      {text.appsNotice}
    </p>}
  </section>;
}
