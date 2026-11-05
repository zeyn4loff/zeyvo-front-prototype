import { useRef, useState, type ChangeEvent } from "react";
import { Download, Upload } from "lucide-react";
import BusinessFormDialog from "../components/BusinessFormDialog";

export function ClientExportDialog({ onClose, onDownload }: { onClose: () => void; onDownload: () => void }) {
  return <BusinessFormDialog title="Müştəri bazasını ixrac et" description="Müştərilərin siyahısını CSV formatında əldə edin" size="compact" onClose={onClose}>
    <div className="space-y-4 text-xs"><section className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"><strong className="block text-slate-900">Birbaşa CSV faylı kimi endir</strong><p className="leading-relaxed text-slate-500">Müştəri profilləri və əlaqə məlumatları UTF-8 kodlaşdırması ilə fayla yazılır.</p><button type="button" onClick={onDownload} className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 font-bold text-white"><Download size={16} />CSV faylını endir</button></section><div className="flex justify-end border-t border-slate-100 pt-4"><button type="button" onClick={onClose} className="min-h-10 cursor-pointer rounded-xl bg-slate-100 px-4 font-semibold">Bağla</button></div></div>
  </BusinessFormDialog>;
}

export function ClientImportDialog({ onClose, onImport, onImportText }: { onClose: () => void; onImport: (file: File) => Promise<void>; onImportText: (text: string) => Promise<void> }) {
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  function select(event: ChangeEvent<HTMLInputElement>) { setFile(event.target.files?.[0] ?? null); }
  async function submit() { if (!file && !text.trim()) return; setBusy(true); try { if (file) await onImport(file); else await onImportText(text); onClose(); } finally { setBusy(false); } }
  return <BusinessFormDialog title="Müştəri bazasını idxal et" description="CSV faylından müştəri siyahısını bazaya yükləyin" size="compact" onClose={onClose}>
    <div className="space-y-4 text-xs"><section className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"><strong className="block text-slate-900">1. CSV faylı seçin</strong><p className="leading-relaxed text-slate-500">Sütunlar: name, phone, email, gender, category, birthDate, discountPercent, note.</p><input ref={input} type="file" accept=".csv,.txt,text/csv,text/plain" onChange={select} className="sr-only" aria-label="CSV və ya TXT faylını seç" /><button type="button" onClick={() => input.current?.click()} className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 font-bold"><Upload size={16} />{file?.name ?? "Fayl seçin (.csv, .txt)"}</button></section><section className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4"><label htmlFor="client-import-text" className="block font-bold text-slate-900">2. Və ya məlumatı birbaşa yapışdırın</label><p className="text-slate-500">Format: Ad Soyad, Mobil nömrə, Kateqoriya, Email, Qeyd</p><textarea id="client-import-text" value={text} onChange={(event) => setText(event.target.value)} rows={4} placeholder="Nərgiz Məmmədova, 050 234-56-78, VIP, nargiz@mail.az, Daimi qonaq" className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs outline-none focus:border-slate-700" /></section><div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4"><button type="button" onClick={onClose} className="min-h-10 cursor-pointer rounded-xl bg-slate-100 px-4 font-semibold">Bağla</button><button type="button" disabled={(!file && !text.trim()) || busy} onClick={submit} className="min-h-10 cursor-pointer rounded-xl bg-brand-primary px-4 font-bold disabled:cursor-not-allowed disabled:opacity-50">Bazaya əlavə et</button></div></div>
  </BusinessFormDialog>;
}
