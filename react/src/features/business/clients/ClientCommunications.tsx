import { useRef, useState } from "react";
import { showToast } from "@/components/common/toast";
import { MessageSquare, Send } from "lucide-react";
import { balance, phoneDigits, type Client, type ClientMessage, type ClientMessageTemplate } from "./clients";
import { clientBox, clientField } from "./clientProfileStyles";

const builtIns: ClientMessageTemplate[] = [
  { id: "welcome", name: "Salamlama", text: "Salam, {ad}! {biznes} komandası sizi salamlayır. Sizə necə kömək edə bilərik?" },
  { id: "reminder", name: "Vizit xatırlatması", text: "Salam, {ad}! Sizə xatırladırıq ki, {biznes}-də qeydiyyatınız var. Gəlişinizi təsdiq edə bilərsinizmi? Sizi gözləyirik!" },
  { id: "thanks", name: "Təşəkkür", text: "Salam, {ad}! Bizi seçdiyiniz üçün təşəkkür edirik. Xidmətimizdən razı qaldınızmı? Rəyiniz bizim üçün çox önəmlidir." },
  { id: "birthday", name: "Ad günü təbriki", text: "Hörmətli {ad}, ad gününüz mübarək! {biznes} komandası sizə xoşbəxtlik arzulayır. Bu həftə ərzində sizi xüsusi endirim gözləyir." },
  { id: "comeback", name: "Geri dönüş", text: "Salam, {ad}! Sizi çoxdandır görmürük. {mutexessis} sizi gözləyir, növbəti vizit üçün rahat vaxt seçin." },
  { id: "deposit", name: "Depozit balansı", text: "Salam, {ad}! {biznes}-də depozit balansınız: {depozit}. Növbəti vizitdə istifadə edə bilərsiniz." },
];

const variables = [
  { key: "ad", label: "Ad" }, { key: "biznes", label: "Biznes adı" },
  { key: "mutexessis", label: "Mütəxəssis" }, { key: "depozit", label: "Depozit" },
  { key: "endirim", label: "Endirim" },
];

function renderMessage(text: string, client: Client, businessName: string, staffName: string) {
  const values: Record<string, string> = {
    ad: client.name.trim().split(/\s+/)[0] || client.name,
    biznes: businessName,
    mutexessis: staffName || "Mütəxəssisimiz",
    depozit: `${balance(client, "deposit").toFixed(2)} ₼`,
    endirim: `${client.discountPercent}%`,
  };
  return text.replace(/\{(ad|biznes|mutexessis|depozit|endirim)\}/g, (_, key: string) => values[key]);
}

export function ClientCommunications({ client, businessName, staffName, persist, onEditInfo }: { client: Client; businessName: string; staffName: string; persist: (next: Client) => boolean; onEditInfo: () => void }) {
  const [channel, setChannel] = useState<ClientMessage["channel"]>("sms");
  const [draft, setDraft] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [naming, setNaming] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [error, setError] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const phone = phoneDigits(client.phone);
  const validPhone = /^\d{9}$/.test(phone);
  const custom = client.messageTemplates ?? [];
  const messages = client.messages ?? [];
  const rendered = renderMessage(draft, client, businessName, staffName);
  const activeCustom = custom.find((item) => item.id === selectedTemplate);

  function insertVariable(key: string) {
    const element = textarea.current;
    const start = element?.selectionStart ?? draft.length;
    const end = element?.selectionEnd ?? draft.length;
    const token = `{${key}}`;
    setDraft(`${draft.slice(0, start)}${token}${draft.slice(end)}`);
    requestAnimationFrame(() => { element?.focus(); element?.setSelectionRange(start + token.length, start + token.length); });
  }
  function saveTemplate() {
    const name = templateName.trim();
    if (!name || !draft.trim()) { setError("Şablon adı və mesaj mətni tələb olunur."); return; }
    if (custom.some((item) => item.name.toLocaleLowerCase("az-AZ") === name.toLocaleLowerCase("az-AZ"))) { setError("Bu adda şablon artıq var."); return; }
    const next = { id: crypto.randomUUID(), name, text: draft.trim() };
    if (persist({ ...client, messageTemplates: [...custom, next] })) { setSelectedTemplate(next.id); setNaming(false); setTemplateName(""); setError(""); showToast("Şablon saxlanıldı."); }
  }
  function sendMessage() {
    const text = rendered.trim();
    if (!validPhone || !text) { setError("Düzgün telefon nömrəsi və mesaj mətni daxil edin."); return; }
    const address = channel === "whatsapp" ? `https://wa.me/994${phone}?text=${encodeURIComponent(text)}` : `sms:+994${phone}?body=${encodeURIComponent(text)}`;
    const opened = window.open(address, "_blank", "noopener,noreferrer");
    if (!opened && channel === "whatsapp") { setError("Mesaj tətbiqi açılmadı. Brauzerdə yeni pəncərələrə icazə verin."); return; }
    if (persist({ ...client, messages: [{ id: crypto.randomUUID(), date: new Date().toISOString(), channel, text, status: "opened" }, ...messages] })) { setDraft(""); setSelectedTemplate(null); setError(""); showToast("Mesaj tətbiqi açıldı."); }
  }

  return <div className="mt-4 space-y-4 text-xs">
    <section className={`${clientBox} flex flex-wrap items-center justify-between gap-3`}><div className="min-w-0"><strong className="block truncate text-sm">{client.name}</strong><p className={`mt-1 font-medium ${validPhone ? "text-slate-500" : "text-rose-600"}`}>{validPhone ? client.phone : "Telefon nömrəsi düzgün deyil və ya qeyd olunmayıb"}</p></div>{validPhone ? <div className="flex flex-wrap items-center gap-2"><span className="text-[11px] font-medium text-slate-400">Göndərmə kanalı:</span><div className="inline-flex gap-1 rounded-xl bg-slate-100 p-1">{(["sms", "whatsapp"] as const).map((item) => <button key={item} type="button" onClick={() => setChannel(item)} aria-pressed={channel === item} className={`h-8 rounded-lg px-4 ${channel === item ? "bg-white font-bold text-slate-900 shadow-sm" : "font-semibold text-slate-500"}`}>{item === "sms" ? "SMS" : "WhatsApp"}</button>)}</div></div> : <button type="button" onClick={onEditInfo} className="min-h-9 rounded-xl bg-slate-100 px-3.5 font-bold">Nömrəni düzəlt</button>}</section>
    <section className="space-y-2"><h3 className="font-bold text-slate-700">Hazır şablonlar</h3><div className="flex flex-wrap gap-1.5">{[...builtIns, ...custom].map((item) => <div key={item.id} className={`inline-flex items-center rounded-full border ${selectedTemplate === item.id ? "border-brand-primary bg-brand-primary text-slate-900" : "border-slate-200 bg-white text-slate-700"}`}><button type="button" onClick={() => { setDraft(item.text); setSelectedTemplate(item.id); textarea.current?.focus(); }} className="h-8 whitespace-nowrap px-3 font-semibold">{item.name}</button>{custom.some((entry) => entry.id === item.id) && <button type="button" aria-label={`${item.name} şablonunu sil`} onClick={() => { if (persist({ ...client, messageTemplates: custom.filter((entry) => entry.id !== item.id) }) && selectedTemplate === item.id) setSelectedTemplate(null); }} className="mr-1 flex size-6 items-center justify-center rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600">×</button>}</div>)}</div></section>
    <section className={`${clientBox} space-y-3`}><div className="flex items-center justify-between gap-2"><label htmlFor="client-message-text" className="font-bold text-slate-700">Mesaj mətni</label><span className="text-[11px] font-medium text-slate-400">{rendered.length} simvol</span></div><textarea id="client-message-text" ref={textarea} value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={1000} rows={5} className={`${clientField} resize-none py-3 text-sm`} placeholder="Mesajınızı yazın və ya şablon seçin..." /><div className="flex flex-wrap items-center gap-1.5"><span className="mr-1 text-[11px] font-medium text-slate-400">Dəyişənlər:</span>{variables.map((item) => <button key={item.key} type="button" onClick={() => insertVariable(item.key)} className="h-7 rounded-lg bg-slate-100 px-2.5 text-[11px] font-semibold text-slate-600">{item.label}</button>)}</div><div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><strong className="text-[11px] font-semibold text-slate-500">Önizləmə</strong><p className={`mt-2 whitespace-pre-wrap break-words leading-relaxed ${rendered.trim() ? "text-slate-800" : "text-slate-400"}`}>{rendered.trim() || "Mesaj burada görünəcək"}</p></div>{naming && <div className="flex flex-wrap gap-2"><input aria-label="Şablonun adı" autoFocus value={templateName} onChange={(event) => setTemplateName(event.target.value)} maxLength={60} placeholder="Məs. Ad günü təbriki" className={`${clientField} min-w-0 flex-1`} /><button type="button" onClick={saveTemplate} className="min-h-10 rounded-xl bg-brand-primary px-3.5 font-bold">Yadda saxla</button><button type="button" onClick={() => setNaming(false)} className="min-h-10 rounded-xl bg-slate-100 px-3.5 font-bold">İmtina</button></div>}{error && <p role="alert" className="text-rose-700">{error}</p>}<div className="flex flex-wrap items-center justify-between gap-2 pt-1"><div className="flex flex-wrap gap-2">{activeCustom && <button type="button" onClick={() => { if (persist({ ...client, messageTemplates: custom.map((item) => item.id === activeCustom.id ? { ...item, text: draft.trim() } : item) })) { setError(""); showToast("Şablon yeniləndi."); } }} disabled={!draft.trim()} className="min-h-10 rounded-xl bg-slate-100 px-3.5 font-bold disabled:opacity-40">Şablonu yenilə</button>}<button type="button" onClick={() => setNaming(true)} disabled={!draft.trim()} className="min-h-10 rounded-xl bg-slate-100 px-3.5 font-bold disabled:opacity-40">{activeCustom ? "Yeni şablon kimi saxla" : "Şablon kimi saxla"}</button></div><button type="button" onClick={sendMessage} disabled={!validPhone || !rendered.trim()} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-brand-primary px-4 font-bold disabled:opacity-40"><Send size={16} />{channel === "whatsapp" ? "WhatsApp ilə göndər" : "SMS ilə göndər"}</button></div></section>
    <section className="space-y-2"><h3 className="text-sm font-bold">Göndərilmiş mesajlar <span className="font-semibold text-slate-400">({messages.length})</span></h3>{messages.length ? <div className="max-h-[360px] space-y-2 overflow-y-auto">{[...messages].sort((a, b) => b.date.localeCompare(a.date)).map((item) => <article key={item.id} className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm"><div className="mb-1.5 flex items-center justify-between gap-2"><span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{item.channel === "sms" ? "SMS" : "WhatsApp"}</span><time className="text-[11px] text-slate-400">{new Date(item.date).toLocaleString("az-AZ")}</time></div><p className="whitespace-pre-wrap break-words text-slate-800">{item.text}</p><div className="mt-2 flex justify-end gap-3 text-[11px]"><button type="button" onClick={() => { setChannel(item.channel); setDraft(item.text); }} className="text-slate-500">Yenidən göndər</button><button type="button" onClick={() => persist({ ...client, messages: messages.filter((entry) => entry.id !== item.id) })} className="text-rose-600">Sil</button></div></article>)}</div> : <div className="rounded-2xl border border-slate-200 bg-white py-8 text-center"><span className="mx-auto mb-2 flex size-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400"><MessageSquare size={20} /></span><strong className="block text-slate-700">Hələ mesaj göndərilməyib</strong><p className="mt-0.5 text-[11px] font-medium text-slate-400">Göndərilən mesajlar burada saxlanılacaq</p></div>}</section>
  </div>;
}

