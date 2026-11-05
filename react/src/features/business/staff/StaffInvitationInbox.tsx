import { useEffect, useState } from "react";
import { Bell, CalendarDays, Clock3, Star, X } from "lucide-react";
import { showToast } from "@/components/common/toast";
import { markBusinessNotificationRead, readBusinessNotifications, type BusinessNotification } from "./businessNotifications";
import { answerStaffInvitation, invitationsForEmail, INVITATIONS_CHANGED, type StaffInvitation } from "./staffInvitations";

const notificationIcons = { booking: CalendarDays, review: Star, schedule: Clock3 };

export default function StaffInvitationInbox({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const [invitations, setInvitations] = useState<StaffInvitation[]>(() => invitationsForEmail(email));
  const [notifications, setNotifications] = useState<BusinessNotification[]>(() => readBusinessNotifications(email));
  useEffect(() => {
    const refresh = () => {
      setInvitations(invitationsForEmail(email));
      setNotifications(readBusinessNotifications(email));
    };
    refresh();
    window.addEventListener(INVITATIONS_CHANGED, refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener(INVITATIONS_CHANGED, refresh); window.removeEventListener("storage", refresh); };
  }, [email]);
  const unreadCount = invitations.filter((item) => item.status === "pending").length + notifications.filter((item) => !item.read).length;
  function answer(id: string, status: "accepted" | "declined") {
    if (!answerStaffInvitation(id, email, status)) { showToast("Dəvəti yeniləmək mümkün olmadı."); return; }
    showToast(status === "accepted" ? "Dəvət qəbul edildi." : "Dəvət rədd edildi.");
  }
  function markRead(id: string) {
    if (!markBusinessNotificationRead(id)) { showToast("Bildirişi yeniləmək mümkün olmadı."); return; }
    setNotifications(readBusinessNotifications(email));
  }
  return <div className="relative shrink-0">
    <button type="button" onClick={() => setOpen((value) => !value)} aria-label={`Bildirişlər${unreadCount ? `, ${unreadCount} yeni` : ""}`} aria-expanded={open} className="relative flex size-9 cursor-pointer items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"><Bell size={18} />{unreadCount > 0 && <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-slate-900">{unreadCount}</span>}</button>
    {open && <div className="fixed inset-0 z-[69]" onClick={() => setOpen(false)}><div className="absolute inset-0 bg-slate-900/20" /></div>}
    {open && <section aria-label="Bildirişlər" className="fixed inset-x-2 bottom-2 top-2 z-[70] flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-11 sm:max-h-[min(75dvh,36rem)] sm:w-[min(25rem,calc(100vw-2rem))]"><div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-brand-primary/30"><Bell size={17} /></span><div><strong className="block text-sm text-slate-900">Bildirişlər</strong><span className="text-[11px] text-slate-500">{unreadCount ? `${unreadCount} yeni bildiriş` : "Hamısı oxunub"}</span></div></div><button type="button" aria-label="Bağla" onClick={() => setOpen(false)} className="flex size-9 cursor-pointer items-center justify-center rounded-xl bg-slate-100 text-slate-500"><X size={17} /></button></div><div className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain p-3 sm:p-4">
      {invitations.length === 0 && notifications.length === 0 ? <p className="py-5 text-center text-sm text-slate-500">Yeni bildiriş yoxdur.</p> : <div className="space-y-2">
        {invitations.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs"><div className="flex items-start justify-between gap-2"><strong className="text-sm text-slate-900">{item.businessName}</strong><span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${item.status === "pending" ? "bg-brand-primary/30 text-slate-900" : item.status === "accepted" ? "bg-emerald-50 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>{item.status === "pending" ? "Dəvət" : item.status === "accepted" ? "Qəbul edildi" : "Rədd edildi"}</span></div><p className="mt-1 leading-5 text-slate-600">{item.senderName} sizi {item.staffName} profili üçün komandaya dəvət edir.</p>{item.status === "pending" && <div className="mt-3 flex gap-2"><button type="button" onClick={() => answer(item.id, "accepted")} className="min-h-10 flex-1 cursor-pointer rounded-xl bg-brand-primary px-2 font-bold text-slate-900">Qəbul et</button><button type="button" onClick={() => answer(item.id, "declined")} className="min-h-10 flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white px-2 font-semibold text-slate-700">Rədd et</button></div>}</article>)}
        {notifications.map((item) => { const Icon = notificationIcons[item.kind]; return <article key={item.id} className={`rounded-2xl border p-3.5 text-xs ${item.read ? "border-slate-200 bg-white" : "border-brand-primary/60 bg-brand-primary/10"}`}><div className="flex items-start gap-2.5"><span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${item.read ? "bg-slate-100" : "bg-brand-primary/25"} text-slate-700`}><Icon size={17} /></span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><strong className="text-sm text-slate-900">{item.title}</strong>{!item.read && <span className="mt-1 size-2 shrink-0 rounded-full bg-brand-primary" aria-label="Oxunmayıb" />}</div><p className="mt-1 leading-5 text-slate-600">{item.message}</p><div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-slate-400"><time>{item.date}</time>{!item.read && <button type="button" onClick={() => markRead(item.id)} className="min-h-8 cursor-pointer rounded-lg px-2 font-semibold text-slate-700 hover:bg-white">✓ Oxundu</button>}</div></div></div></article>; })}
      </div>}
    </div></section>}
  </div>;
}
