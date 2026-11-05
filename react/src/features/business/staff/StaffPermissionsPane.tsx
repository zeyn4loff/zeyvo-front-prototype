import { useEffect, useState } from "react";
import { showToast } from "@/components/common/toast";
import { useBusinessSession } from "../auth/useBusinessSession";
import { createStaffInvitation, invitationForStaff, INVITATIONS_CHANGED, type StaffInvitation } from "./staffInvitations";

import { permissionGroups, roles } from "./staffPermissions";

export default function StaffPermissionsPane({ role, permissions, name, email, staffId, onRoleChange, onPermissionChange }: {
  role: string; permissions: Record<string, boolean>; name: string; email: string; staffId?: string;
  onRoleChange: (role: string) => void; onPermissionChange: (id: string, checked: boolean) => void;
}) {
  const selected = roles.find((item) => item.id === role) ?? roles[0];
  const { session } = useBusinessSession();
  const [inviteEmail, setInviteEmail] = useState(email);
  const [invitation, setInvitation] = useState<StaffInvitation | undefined>(() => session && staffId ? invitationForStaff(session.id, staffId) : undefined);
  const [inviteError, setInviteError] = useState("");
  useEffect(() => {
    const refresh = () => setInvitation(session && staffId ? invitationForStaff(session.id, staffId) : undefined);
    window.addEventListener(INVITATIONS_CHANGED, refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener(INVITATIONS_CHANGED, refresh); window.removeEventListener("storage", refresh); };
  }, [session, staffId]);
  function sendInvite() {
    const recipient = inviteEmail.trim().toLocaleLowerCase();
    if (!staffId || !session) { setInviteError("Əvvəlcə usta profilini yadda saxlayın."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) { setInviteError("Düzgün e-poçt ünvanı daxil edin."); return; }
    if (recipient === session.email.toLocaleLowerCase()) { setInviteError("Özünüzə dəvət göndərə bilməzsiniz."); return; }
    if (!createStaffInvitation({ senderId: session.id, senderName: session.ownerName, businessName: session.businessName, staffId, staffName: name, email: recipient })) { setInviteError("Bu ünvana cavab gözləyən dəvət var."); return; }
    setInviteError("");
    showToast("Dəvət yaradıldı. Alıcı hesabına daxil olduqda bildirişdə görünəcək.");
  }
  return <div className="space-y-3.5 text-xs">
    <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
      <div className="flex items-center justify-between gap-2"><strong className="text-slate-800">Sistemdə rolu və hüquqlar</strong><span className="shrink-0 rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-800">{selected.badge}</span></div>
      <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-slate-200/60 p-1 sm:grid-cols-5" role="group" aria-label="Sistemdə rol">{roles.map((item) => <button key={item.id} type="button" aria-pressed={role === item.id} onClick={() => onRoleChange(item.id)} className={`min-h-9 cursor-pointer rounded-lg px-2.5 py-2 font-semibold transition ${item.id === "custom" ? "col-span-2 sm:col-span-1" : ""} ${role === item.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>{item.label}</button>)}</div>
      <p className="text-[11px] leading-5 text-slate-500"><span aria-hidden="true">ⓘ </span>{selected.description}</p>
    </div>
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-100 pb-2"><strong className="text-slate-900">Dəqiq icazələrin siyahısı</strong><span className="text-[11px] text-slate-400">İstənilən bəndi fərdi dəyişə bilərsiniz</span></div>
      {permissionGroups.map((group, index) => <div key={group.title} className={`space-y-1 ${index ? "border-t border-slate-100 pt-2" : ""}`}><h3 className="text-[10px] font-bold text-slate-400">{group.title}</h3><div className="grid grid-cols-1 gap-1 sm:grid-cols-2">{group.items.map(([id, text]) => <label key={id} className="flex min-h-9 cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 font-medium text-slate-800 hover:bg-slate-50"><input type="checkbox" checked={Boolean(permissions[id])} onChange={(event) => onPermissionChange(id, event.target.checked)} className="size-4 shrink-0 cursor-pointer accent-slate-900" />{text}</label>)}</div></div>)}
    </div>
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
      <div><strong className="text-slate-900">{invitation?.status === "accepted" && invitation.email === email.trim().toLocaleLowerCase() ? "Ustanın dəvəti" : "Ustaya dəvət göndər"}</strong><p className="text-[11px] text-slate-500">{invitation?.status === "accepted" && invitation.email === email.trim().toLocaleLowerCase() ? "Usta dəvəti öz hesabında qəbul edib." : "Alıcı öz hesabındakı bildirişdən dəvəti qəbul və ya rədd edə bilər."}</p></div>
      {invitation?.status === "accepted" && invitation.email === email.trim().toLocaleLowerCase()
        ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5"><strong className="text-emerald-800">Dəvət qəbul edildi</strong><p className="mt-0.5 break-all text-emerald-700">{invitation.email}</p></div>
        : <><div className="flex flex-col gap-2 sm:flex-row"><label className="min-w-0 flex-1"><span className="sr-only">Alıcının e-poçt ünvanı</span><input type="email" value={inviteEmail} onChange={(event) => { setInviteEmail(event.target.value); setInviteError(""); }} placeholder="Alıcının e-poçt ünvanı" className="min-h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-lime-400" /></label><button type="button" onClick={sendInvite} className="min-h-10 cursor-pointer rounded-xl bg-brand-primary px-4 font-bold text-slate-900">Dəvət göndər</button></div>{inviteError && <p role="alert" className="text-rose-600">{inviteError}</p>}{invitation && <p className="text-slate-600">Son dəvət: {invitation.email} · {invitation.status === "pending" ? "Cavab gözlənilir" : invitation.status === "accepted" ? "Qəbul edildi" : "Rədd edildi"}</p>}</>}
    </div>
  </div>;
}
