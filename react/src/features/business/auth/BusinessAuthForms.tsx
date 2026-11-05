import { useState, type FormEvent } from "react";
import { ArrowRight, UserRound } from "lucide-react";
import AzPhoneInput from "../components/AzPhoneInput";
import { formatPhone } from "@/lib/formatPhone";
import type { BusinessSession } from "./businessSession";
import { createBusinessAccount, findBusinessByPhone, normalizeBusinessPhone, rememberedBusinessPhone } from "./businessCredentials";
import { BusinessAuthField } from "./BusinessAuthFields";
import CodeInput from "@/components/common/CodeInput";

interface AuthProps {
  onStart: (session: BusinessSession, remember: boolean) => void;
  onError: (message: string) => void;
}

type Pending = { session: BusinessSession; code: string; phone: string; register: boolean; expiresAt: number };

function PhoneAuthForm({ onStart, onError, register }: AuthProps & { register: boolean }) {
  const [phone, setPhone] = useState(() => register ? "" : formatPhone(rememberedBusinessPhone()));
  const [name, setName] = useState("");
  const [pending, setPending] = useState<Pending | null>(null);
  const [code, setCode] = useState("");

  function newLocalCode() {
    return String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000).padStart(6, "0");
  }

  function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError("");
    const digits = normalizeBusinessPhone(phone);
    if (digits.length !== 9) return onError("9 rəqəmli mobil nömrəni yoxlayın.");
    const existing = findBusinessByPhone(digits);
    if (register && existing) return onError("Bu nömrə ilə profil artıq mövcuddur. Daxil ol bölməsini seçin.");
    if (!register && !existing) return onError("Bu nömrə ilə profil tapılmadı. Qeydiyyat bölməsini seçin.");
    if (register && name.trim().length < 2) return onError("Ad və soyadı daxil edin.");
    const session: BusinessSession = existing ?? {
      id: crypto.randomUUID(), ownerName: name.trim(), businessName: name.trim(),
      email: "", phone: `+994 ${formatPhone(digits)}`, kind: "demo",
    };
    setPending({ session, phone: digits, code: newLocalCode(), register, expiresAt: Date.now() + 5 * 60_000 });
    setCode("");
  }

  function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!pending || Date.now() > pending.expiresAt) return onError("Kodun vaxtı bitib. Yeni kod alın.");
    if (code.trim() !== pending.code) return onError("Təsdiq kodu yanlışdır.");
    if (pending.register && !createBusinessAccount(pending.session)) return onError("Profili yaratmaq mümkün olmadı.");
    onError("");
    onStart(pending.session, true);
  }

  if (pending) return <form onSubmit={verifyCode} className="space-y-4">
    <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
      <p className="font-bold">+994 {formatPhone(pending.phone)}</p>
      <p className="mt-1">WhatsApp ilə təsdiq kodunu daxil edin.</p>
      <p className="mt-2 text-xs text-slate-500">WhatsApp göndərişi hələ qoşulmayıb. 5 dəqiqəlik test kodu: <strong className="text-slate-900">{pending.code}</strong></p>
    </div>
    <div className="space-y-1.5"><p className="text-sm font-semibold text-slate-700">Təsdiq kodu</p><CodeInput value={code} onChange={setCode} label="Təsdiq kodu" autoFocus /></div>
    <button type="submit" disabled={code.length !== 6} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50">Təsdiqlə <ArrowRight size={17} /></button>
    <button type="button" onClick={() => { setPending({ ...pending, code: newLocalCode(), expiresAt: Date.now() + 5 * 60_000 }); setCode(""); onError(""); }} className="min-h-11 w-full rounded-xl border border-slate-200 text-sm font-semibold text-slate-700">Yeni kod al</button>
    <button type="button" onClick={() => { setPending(null); onError(""); }} className="min-h-11 w-full text-sm font-semibold text-slate-600">Nömrəni dəyiş</button>
  </form>;

  return <form onSubmit={requestCode} className="space-y-4">
    {register && <BusinessAuthField label="Ad və soyad" icon={UserRound} name="ownerName" type="text" autoComplete="name" required minLength={2} placeholder="Məs: Əli Əliyev" value={name} onChange={(event) => setName(event.target.value)} />}
    <label className="block space-y-1.5 text-sm font-semibold text-slate-700"><span>Mobil nömrə</span><AzPhoneInput name="phone" required value={phone} onValueChange={(next) => setPhone(formatPhone(next))} /></label>
    <p className="text-xs leading-5 text-slate-500">Hər girişdə nömrənizi kodla təsdiqləyəcəksiniz. Şifrə lazım deyil.</p>
    <button type="submit" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-bold">{register ? "Kod al və profil yarat" : "Kod al və daxil ol"} <ArrowRight size={17} /></button>
  </form>;
}

export function BusinessLoginForm(props: AuthProps) { return <PhoneAuthForm {...props} register={false} />; }
export function BusinessRegisterForm(props: AuthProps) { return <PhoneAuthForm {...props} register />; }
