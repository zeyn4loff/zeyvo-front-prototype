import { Download, FileText, Pencil, Trash2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState, type DragEvent } from "react";
import type { Client, ClientFile } from "./clients";
import { deleteClientFile, formatFileSize, getClientFile } from "./clientFileStorage";
import { clientBox, clientField, clientLabel } from "./clientProfileStyles";

function fileKind(file: ClientFile) {
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf") return "pdf";
  return "other";
}

function FileCard({ file, onPreview, onRename, onDelete }: { file: ClientFile; onPreview: () => void; onRename: () => void; onDelete: () => void }) {
  const [url, setUrl] = useState(file.dataUrl ?? "");
  useEffect(() => {
    if (file.dataUrl || fileKind(file) !== "image") return;
    let objectUrl = "";
    let active = true;
    getClientFile(file.id).then((blob) => { if (blob && active) { objectUrl = URL.createObjectURL(blob); setUrl(objectUrl); } }).catch(() => undefined);
    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [file]);
  const ext = file.name.includes(".") ? `.${file.name.split(".").pop()?.toLowerCase()}` : "";
  return <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><button type="button" onClick={onPreview} className="relative flex h-20 w-full items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50">{fileKind(file) === "image" && url ? <img src={url} alt="" className="h-full w-full object-cover" /> : <span className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500"><FileText size={20} /></span>}{ext && <span className="absolute left-1.5 top-1.5 rounded border border-slate-200 bg-white/90 px-1 text-[9px] font-bold text-slate-600">{ext}</span>}</button><div className="flex flex-1 flex-col gap-1.5 p-2"><div className="min-w-0"><strong className="block truncate text-[11px]" title={file.name}>{file.name}</strong><span className="block truncate text-[10px] text-slate-400">{file.size !== undefined ? `${formatFileSize(file.size)} · ` : ""}{file.date.slice(0, 10).split("-").reverse().join(".")}</span></div><div className="mt-auto flex gap-1"><button type="button" onClick={onPreview} className="min-h-7 flex-1 rounded-md bg-slate-100 px-1 font-bold">Bax</button><button type="button" onClick={async () => { const blob = file.dataUrl ? await fetch(file.dataUrl).then((response) => response.blob()) : await getClientFile(file.id); if (!blob) return; const link = document.createElement("a"); const downloadUrl = URL.createObjectURL(blob); link.href = downloadUrl; link.download = file.name; link.click(); setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000); }} aria-label={`${file.name} yüklə`} className="flex size-7 items-center justify-center rounded-md bg-slate-100"><Download size={13} /></button><button type="button" onClick={onRename} aria-label={`${file.name} adını dəyiş`} className="flex size-7 items-center justify-center rounded-md bg-slate-100"><Pencil size={13} /></button><button type="button" onClick={onDelete} aria-label={`${file.name} sil`} className="flex size-7 items-center justify-center rounded-md bg-rose-50 text-rose-700"><Trash2 size={13} /></button></div></div></article>;
}

export default function ClientFilesSection({ client, upload, persist }: { client: Client; upload: (files: FileList) => Promise<void>; persist: (client: Client) => boolean }) {
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<ClientFile | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [renaming, setRenaming] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  useEffect(() => {
    if (!preview) return;
    let objectUrl = "";
    let active = true;
    if (!preview.dataUrl) getClientFile(preview.id).then((blob) => { if (blob && active) { objectUrl = URL.createObjectURL(blob); setPreviewUrl(objectUrl); } }).catch(() => undefined);
    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [preview]);
  function drop(event: DragEvent<HTMLButtonElement>) { event.preventDefault(); setDragging(false); if (event.dataTransfer.files.length) void upload(event.dataTransfer.files); }
  async function remove(file: ClientFile) { if (persist({ ...client, files: client.files.filter((item) => item.id !== file.id) })) { await deleteClientFile(file.id).catch(() => undefined); if (preview?.id === file.id) setPreview(null); } }
  const totalSize = client.files.reduce((sum, file) => sum + (file.size ?? 0), 0);
  const activePreviewUrl = preview?.dataUrl || previewUrl;
  return <div className="mt-4 space-y-4 text-xs"><input ref={input} type="file" multiple onChange={(event) => { if (event.target.files) void upload(event.target.files); event.target.value = ""; }} className="sr-only" aria-label="Müştəri fayllarını seç" /><button type="button" onClick={() => input.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={drop} className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition ${dragging ? "border-slate-900 bg-brand-primary/10" : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"}`}><span className="mb-2 flex size-11 items-center justify-center rounded-full bg-brand-primary text-slate-900 shadow-sm"><Upload size={20} /></span><strong className="text-sm">Faylları bura sürükləyin və ya seçin</strong><span className="mt-0.5 text-[11px] font-medium text-slate-400">Şəkil, PDF, sənəd və cədvəllər • hər fayl maks. 10 MB</span></button><div className="flex items-center justify-between gap-2"><h3 className="text-sm font-bold">Yüklənmiş fayllar <span className="font-semibold text-slate-400">({client.files.length})</span></h3>{client.files.length > 0 && <span className="text-[11px] text-slate-400">Cəmi: {formatFileSize(totalSize)}</span>}</div>{client.files.length ? <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">{client.files.map((file) => <FileCard key={file.id} file={file} onPreview={() => setPreview(file)} onRename={() => { setRenaming(file.id); setNewName(file.name); }} onDelete={() => void remove(file)} />)}</div> : <div className="rounded-2xl border border-slate-200 bg-white py-10 text-center"><span className="mx-auto mb-2 flex size-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400"><FileText size={20} /></span><strong className="block text-xs text-slate-700">Hələ fayl yoxdur</strong><p className="mt-0.5 text-[11px] font-medium text-slate-400">Müqavilə, foto &quot;əvvəl/sonra&quot;, analizlər və s. yükləyin</p></div>}{renaming && <div className={clientBox}><label className={clientLabel}>Faylın yeni adı<input value={newName} onChange={(event) => setNewName(event.target.value)} maxLength={120} className={clientField} /></label><div className="mt-2 flex justify-end gap-2"><button type="button" onClick={() => setRenaming(null)} className="rounded-lg bg-slate-100 px-3 py-2">İmtina</button><button type="button" onClick={() => { if (newName.trim() && persist({ ...client, files: client.files.map((item) => item.id === renaming ? { ...item, name: newName.trim() } : item) })) setRenaming(null); }} className="rounded-lg bg-brand-primary px-3 py-2 font-bold">Yadda saxla</button></div></div>}{preview && <div role="dialog" aria-label="Fayla bax" className={`${clientBox} space-y-3`}><div className="flex items-center justify-between gap-2"><div className="min-w-0"><strong className="block truncate">{preview.name}</strong><span className="text-slate-400">{preview.size !== undefined && `${formatFileSize(preview.size)} · `}{preview.date.slice(0, 10)}</span></div><button type="button" onClick={() => setPreview(null)} aria-label="Önizləməni bağla" className="flex size-8 items-center justify-center rounded-full bg-slate-100"><X size={16} /></button></div><div className="flex min-h-48 items-center justify-center overflow-auto rounded-xl bg-slate-50">{activePreviewUrl && fileKind(preview) === "image" ? <img src={activePreviewUrl} alt={preview.name} className="max-h-80 max-w-full object-contain" /> : activePreviewUrl && fileKind(preview) === "pdf" ? <iframe src={activePreviewUrl} title={preview.name} className="h-80 w-full" /> : <FileText size={36} className="text-slate-400" />}</div><div className="flex justify-end gap-2"><button type="button" onClick={() => void remove(preview)} className="rounded-xl bg-rose-50 px-4 py-2 font-bold text-rose-700">Sil</button><a href={activePreviewUrl} download={preview.name} className="rounded-xl bg-brand-primary px-4 py-2 font-bold">Yüklə</a></div></div>}</div>;
}
