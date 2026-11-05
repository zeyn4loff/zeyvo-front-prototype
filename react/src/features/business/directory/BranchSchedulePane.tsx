import { Check } from "lucide-react";
import { branchWeekdays, type BranchDay } from "./branchSchedule";

type Props = { days: Record<string, BranchDay>; onChange: (value: Record<string, BranchDay>) => void };

export default function BranchSchedulePane({ days, onChange }: Props) {
  function setDay(key: string, value: Partial<BranchDay>) {
    onChange({ ...days, [key]: { ...days[key], ...value } });
  }

  return <div className="space-y-2">
    <p className="text-xs font-medium text-slate-700">Həftəlik günlər üzrə iş rejimi</p>
    <div className="space-y-2">{branchWeekdays.map(([key, label]) => {
      const day = days[key];
      return <div key={key} className="flex min-w-0 flex-col gap-2 rounded-xl border border-slate-200/80 bg-slate-50 p-2.5 text-xs min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between">
        <span className="min-w-0 font-medium text-slate-700 min-[560px]:w-32 min-[560px]:shrink-0">{label}</span>
        <div className="flex min-w-0 items-center gap-2 min-[560px]:ml-auto">
          <input type="time" aria-label={`${label} açılış`} disabled={day.isOff} value={day.open} onChange={(event) => setDay(key, { open: event.target.value })} className="h-8 min-w-0 flex-1 cursor-pointer rounded-lg border border-slate-200 bg-white px-1 text-center text-xs text-slate-800 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-brand-primary/40 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-40 min-[560px]:w-24 min-[560px]:flex-none" />
          <span className="shrink-0 text-slate-400">–</span>
          <input type="time" aria-label={`${label} bağlanış`} disabled={day.isOff} value={day.close} onChange={(event) => setDay(key, { close: event.target.value })} className="h-8 min-w-0 flex-1 cursor-pointer rounded-lg border border-slate-200 bg-white px-1 text-center text-xs text-slate-800 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-brand-primary/40 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-40 min-[560px]:w-24 min-[560px]:flex-none" />
          <label className="group inline-flex shrink-0 cursor-pointer select-none items-center gap-1.5 rounded-lg px-1 py-0.5 transition hover:bg-slate-200/50">
            <input type="checkbox" aria-label={`${label} istirahət günü`} checked={day.isOff} onChange={(event) => setDay(key, { isOff: event.target.checked })} className="peer sr-only" />
            <span className="flex size-4 items-center justify-center rounded-md border border-slate-300 bg-white shadow-xs transition group-hover:border-slate-400 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary/50 peer-checked:border-amber-400 peer-checked:bg-brand-primary">
              {day.isOff && <Check size={11} strokeWidth={3} className="text-[#101114]" aria-hidden="true" />}
            </span>
            <span className="font-medium text-slate-600 transition group-hover:text-slate-900">İstirahət</span>
          </label>
        </div>
      </div>;
    })}</div>
  </div>;
}
