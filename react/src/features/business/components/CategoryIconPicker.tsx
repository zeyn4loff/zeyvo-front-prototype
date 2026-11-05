import { Armchair, BookOpen, Car, DoorOpen, Dumbbell, Folder, HeartPulse, Package, PawPrint, Scissors, Sparkles, Stethoscope, Tag, Wrench, Zap } from "lucide-react";

const icons = { folder: Folder, medical: Stethoscope, dental: HeartPulse, heart: HeartPulse, scissors: Scissors, spa: Sparkles, nail: Sparkles, laser: Zap, chair: Armchair, room: DoorOpen, bed: Armchair, wrench: Wrench, car: Car, dumbbell: Dumbbell, book: BookOpen, paw: PawPrint, sparkles: Sparkles, package: Package, tag: Tag };
export type CategoryIcon = keyof typeof icons;

export default function CategoryIconPicker({ value, onChange, options }: { value: CategoryIcon; onChange: (value: CategoryIcon) => void; options: CategoryIcon[] }) {
  return <fieldset><legend className="mb-2 text-xs font-semibold text-slate-500">İkon seçin</legend><div className="grid grid-cols-5 gap-2 rounded-xl border border-slate-100 bg-slate-50 p-2 sm:grid-cols-9">{options.map((name) => { const Icon = icons[name]; return <button key={name} type="button" title={name} aria-label={`${name} ikonu`} aria-pressed={value === name} onClick={() => onChange(name)} className={`flex size-10 cursor-pointer items-center justify-center rounded-xl border-2 transition ${value === name ? "border-slate-900 bg-white text-slate-900 ring-2 ring-brand-primary/40" : "border-slate-200 text-slate-500 hover:bg-white"}`}><Icon size={19} /></button>; })}</div></fieldset>;
}

export function CategoryIconView({ name, size = 18 }: { name?: string; size?: number }) {
  const Icon = icons[name as CategoryIcon] ?? Folder;
  return <Icon size={size} />;
}
