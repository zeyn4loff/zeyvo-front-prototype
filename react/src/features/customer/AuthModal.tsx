import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCustomer } from "./useCustomer";
import type { Customer } from "./CustomerContext";
import { fieldClass, primaryClass } from "./styles";
import PhoneField from "./PhoneField";
import LegalModal from "./LegalModal";
import { createLocalConfirmationCode, phoneIdentity, readPhoneAccount, savePhoneAccount } from "./phoneAccounts";
import { useTranslations } from "@/features/locale/language";
import CodeInput from "@/components/common/CodeInput";

interface PendingCode { value: string; issuedAt: number; attempts: number; profile: Customer }

export default function AuthModal() {
  const { modal, closeModal, login } = useCustomer();
  const { t } = useTranslations();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [pending, setPending] = useState<PendingCode | null>(null);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [legalTab, setLegalTab] = useState<"terms" | "privacy" | null>(null);

  function reset() { setPending(null); setEnteredCode(""); setError(""); }
  function close() { reset(); setName(""); setPhone(""); setTerms(false); setLegalTab(null); closeModal(); }
  function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 9) { setError(t("phoneRequired")); return; }
    const fullPhone = `+994 ${phone}`;
    const existing = readPhoneAccount(fullPhone);
    if (mode === "login" && !existing) { setError(t("accountMissing")); return; }
    if (mode === "register" && existing) { setError(t("accountExists")); return; }
    if (mode === "register" && name.trim().length < 2) { setError(t("nameRequired")); return; }
    if (mode === "register" && !terms) { setError(t("acceptTerms")); return; }
    setPending({ value: createLocalConfirmationCode(), issuedAt: Date.now(), attempts: 0, profile: existing ?? { name: name.trim(), email: "", phone: fullPhone, city: "Bakı" } });
    setEnteredCode(""); setError("");
  }
  function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!pending) return;
    if (Date.now() - pending.issuedAt > 5 * 60_000) { setError(t("expiredCode")); return; }
    if (pending.attempts >= 5) { setError(t("attemptLimit")); return; }
    if (enteredCode !== pending.value) { setPending({ ...pending, attempts: pending.attempts + 1 }); setError(t("wrongCode")); return; }
    if (!savePhoneAccount(pending.profile)) { setError(t("saveFailed")); return; }
    login(pending.profile);
    reset(); setName(""); setPhone(""); setTerms(false);
  }

  return <><Dialog open={modal === "auth"} onOpenChange={(open) => { if (!open) close(); }}>
    <DialogContent className="customer-modal customer-sheet max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border-0 p-5 shadow-2xl sm:w-[calc(100vw-2rem)] sm:max-w-md sm:rounded-3xl sm:p-6" overlayClassName="customer-overlay bg-black/60">
      <DialogHeader><DialogTitle className="text-lg font-bold">{pending ? t("confirmPhone") : mode === "login" ? t("login") : t("createAccount")}</DialogTitle>
        <p className="text-xs text-slate-500">{pending ? `${t("code")}: +${phoneIdentity(phone)}` : t("authDescription")}</p>
      </DialogHeader>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-2 text-xs text-red-700">{error}</p>}
      {pending ? <form onSubmit={verify} className="space-y-4">
        <div className="rounded-2xl border border-brand-primary/50 bg-brand-primary/15 p-3 text-xs text-slate-700"><p>{t("localCodeNotice")}</p><strong className="mt-1 block text-lg tracking-[0.25em] text-primary">{pending.value}</strong></div>
        <div className="space-y-1.5"><p className="text-sm font-semibold">{t("code")}</p><CodeInput value={enteredCode} onChange={setEnteredCode} label={t("code")} autoFocus /></div>
        <button type="submit" disabled={enteredCode.length !== 6} className={`${primaryClass} disabled:cursor-not-allowed disabled:opacity-50`}>{t("verify")} <ArrowRight size={16} /></button>
        <button type="button" onClick={reset} className="flex items-center gap-1 text-xs font-semibold text-slate-600"><ArrowLeft size={14} /> {t("changeNumber")}</button>
      </form> : <>
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold"><button type="button" onClick={() => { setMode("login"); reset(); }} className={`flex-1 rounded-lg py-2 ${mode === "login" ? "bg-white shadow-sm" : ""}`}>{t("login")}</button><button type="button" onClick={() => { setMode("register"); reset(); }} className={`flex-1 rounded-lg py-2 ${mode === "register" ? "bg-white shadow-sm" : ""}`}>{t("register")}</button></div>
        <form onSubmit={requestCode} className="space-y-3">
          {mode === "register" && <label className="block space-y-1 text-xs font-semibold">{t("fullName")}<input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required className={fieldClass} placeholder="Əli Əliyev" /></label>}
          <PhoneField value={phone} onChange={setPhone} />
          {mode === "register" && <div className="flex items-start gap-2 text-xs text-slate-600"><input id="auth-terms" checked={terms} onChange={(event) => setTerms(event.target.checked)} type="checkbox" className="mt-0.5 accent-brand-primary" /><span><label htmlFor="auth-terms">{t("termsIntro")} </label><button type="button" onClick={() => setLegalTab("terms")} className="font-semibold text-primary underline">{t("terms")}</button><span> {t("and")} </span><button type="button" onClick={() => setLegalTab("privacy")} className="font-semibold text-primary underline">{t("privacy")}</button><span> {t("termsOutro")}</span></span></div>}
          <button type="submit" className={primaryClass}>{t("getCode")} <ArrowRight size={16} /></button>
        </form>
      </>}
    </DialogContent>
  </Dialog><LegalModal tab={legalTab} onTabChange={setLegalTab} /></>;
}
