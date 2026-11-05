import { businessControlClass } from "../components/BusinessField";
import { useState, type ComponentType, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

const inputClass = businessControlClass;

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
}

export function BusinessAuthField({ label, icon: Icon, ...inputProps }: FieldProps) {
  return <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
    <span>{label}</span>
    <span className="relative block">
      {Icon && <Icon size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />}
      <input {...inputProps} className={`${inputClass} ${Icon ? "pl-10" : ""}`} />
    </span>
  </label>;
}

export function BusinessPasswordField({ label = "Şifrə", ...inputProps }: Omit<FieldProps, "icon" | "type" | "label"> & { label?: string }) {
  const [visible, setVisible] = useState(false);
  return <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
    <span>{label}</span>
    <span className="relative block">
      <LockKeyhole size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input {...inputProps} type={visible ? "text" : "password"} className={`${inputClass} pl-10 pr-11`} />
      <button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? "Şifrəni gizlət" : "Şifrəni göstər"} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200">
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </span>
  </label>;
}
