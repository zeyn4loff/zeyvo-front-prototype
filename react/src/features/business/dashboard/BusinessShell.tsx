import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useBusinessSession } from "../auth/useBusinessSession";
import BusinessPosDialog from "../pos/BusinessPosDialog";
import type { BusinessSession } from "../auth/businessSession";
import { useActiveBusinessContext } from "../directory/activeContext";
import BusinessContextDialog from "../directory/BusinessContextDialog";
import { BusinessHeaderContext } from "../components/businessHeaderContext";
import type { ReactNode } from "react";
import BusinessSidebarFooter from "./BusinessSidebarFooter";
import BusinessSidebarNav, { type BusinessSection } from "./BusinessSidebarNav";
import StaffInvitationInbox from "../staff/StaffInvitationInbox";
import { useLanguage } from "@/features/locale/language";
import { businessNavigationLabel } from "./businessNavigationLocale";

export default function BusinessShell({ session, section = "business", children }: { session: BusinessSession; section?: BusinessSection; children: ReactNode }) {
  const { language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [posOpen, setPosOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const [headerActions, setHeaderActions] = useState<HTMLElement | null>(null);
  const [headerSubtitle, setHeaderSubtitle] = useState<HTMLElement | null>(null);
  const [headerTitle, setHeaderTitle] = useState<HTMLElement | null>(null);
  const activeContext = useActiveBusinessContext(session);
  const { endSession } = useBusinessSession();
  const navigate = useNavigate();
  function logout() { endSession(); navigate("/partner/auth", { replace: true }); }

  return <BusinessHeaderContext.Provider value={{ actions: headerActions, subtitle: headerSubtitle, title: headerTitle, openPos: () => setPosOpen(true) }}><div className="flex h-dvh w-full overflow-hidden bg-[#101114] p-2 text-[#101114] sm:p-3 lg:p-3.5">
    {menuOpen && <button type="button" aria-label="Menyunu bağla" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 cursor-pointer bg-black/60 lg:hidden" />}
    <aside className={`fixed inset-y-2 left-2 z-50 flex w-64 flex-col overflow-y-auto bg-[#101114] p-4 text-white transition-transform duration-300 lg:static lg:h-full lg:w-72 lg:shrink-0 lg:translate-none ${menuOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"}`} aria-label="Partner menyusu">
      <div className="flex items-center justify-between border-b border-white/10 pb-3"><Link to="/partner" onClick={() => setMenuOpen(false)} className="flex items-center gap-2"><span className="flex items-center gap-0.5 text-2xl font-black tracking-[-0.055em]">zeyvo<span className="mb-1 size-2 rounded-full bg-brand-primary" /></span><span className="rounded-lg bg-brand-primary px-2 py-0.5 text-[10px] font-bold text-[#101114]">Partner</span></Link><button type="button" onClick={() => setMenuOpen(false)} aria-label="Bağla" className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-zinc-400 lg:hidden"><X size={16} /></button></div>
      <button type="button" onClick={() => { setMenuOpen(false); setPosOpen(true); }} className="mt-6 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-primary px-3.5 text-xs font-bold text-[#101114]"><ShoppingBag size={16} />{{ az: "Kassa satışı (POS)", ru: "Продажа (POS)", tr: "Kasa satışı (POS)", en: "POS sale" }[language]}</button>
      <div className="mt-6"><BusinessSidebarNav section={section} session={session} onNavigate={() => setMenuOpen(false)} /></div>
      <BusinessSidebarFooter session={session} activeContext={activeContext} profileActive={section === "profile"} onSwitch={() => { setMenuOpen(false); setContextOpen(true); }} onProfile={() => setMenuOpen(false)} onLogout={logout} />
    </aside>
    <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[28px] bg-white sm:rounded-[32px]">
      <header className="shrink-0 border-b border-slate-100 bg-white"><div className={"mx-auto flex min-h-16 max-w-7xl flex-col gap-3 px-4 py-3.5 sm:px-7 sm:py-4 sm:flex-row sm:items-center sm:justify-between"}><div className="flex min-w-0 items-center gap-3 sm:gap-4"><button type="button" onClick={() => setMenuOpen(true)} aria-label="Menyunu aç" className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-slate-100 lg:hidden"><Menu size={16} /></button><div className="min-w-0"><h1 className="business-header-title truncate text-lg font-bold tracking-tight sm:text-xl"><span ref={setHeaderTitle} className="business-header-title-override" /><span className="business-header-title-default">{businessNavigationLabel(section, language)}</span></h1><div ref={setHeaderSubtitle} className="text-xs text-slate-400" /></div></div><div className="flex min-w-0 items-center gap-2"><div ref={setHeaderActions} className="flex w-full flex-wrap gap-2 empty:hidden sm:w-auto sm:justify-end" /><StaffInvitationInbox email={session.email} /></div></div></header>
      <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
    </main>
    {posOpen && <BusinessPosDialog session={session} onClose={() => setPosOpen(false)} />}
    {contextOpen && <BusinessContextDialog session={session} active={activeContext} onClose={() => setContextOpen(false)} />}
  </div></BusinessHeaderContext.Provider>;
}
