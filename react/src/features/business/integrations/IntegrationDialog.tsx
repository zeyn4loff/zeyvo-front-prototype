import { useState } from "react";
import BusinessEntryDialog from "../components/BusinessEntryDialog";
import { BusinessTabButton, BusinessTabRail } from "../components/BusinessTabs";
import type { IntegrationsData } from "./integrations";
import type { BusinessSession } from "../auth/businessSession";
import IntegrationReviewsPanel from "./IntegrationReviewsPanel";
import WhatsAppConnectionPanel from "./WhatsAppConnectionPanel";
import IntegrationLogo from "./IntegrationLogo";

type Tab = "connect" | "security" | "reviews";
export default function IntegrationDialog({ data, session, initialTab, onClose, onSave }: { data: IntegrationsData; session: BusinessSession; initialTab: Tab; onClose: () => void; onSave: (next: IntegrationsData) => boolean }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  return <BusinessEntryDialog title="Whatsapp by Wamingo" description="Bağlantı vəziyyəti, təhlükəsizlik və rəylər" headerIcon={<IntegrationLogo size="header" />} onClose={onClose} width="large" scrollContent bodyPadding={false}>
    <div className="shrink-0 overflow-x-auto border-b border-slate-100 px-5 py-3 sm:px-7" aria-label="WhatsApp bölmələri"><BusinessTabRail centered>{([{ id: "connect", label: "Qoşulma" }, { id: "security", label: "Təhlükəsizlik və tövsiyələr" }, { id: "reviews", label: `Rəylər və qiymət (${data.reviews.length})` }] as const).map((item) => <BusinessTabButton key={item.id} active={tab === item.id} onClick={() => { setTab(item.id);  }}>{item.label}</BusinessTabButton>)}</BusinessTabRail></div>
    <div className="min-h-0 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
      {tab === "connect" && <WhatsAppConnectionPanel />}
      {tab === "security" && <div className="space-y-3"><h3 className="text-base font-bold">Təhlükəsizlik və mesaj tövsiyələri</h3>{[{ title: "Rəsmi bağlantı", body: "Mesaj göndərmə yalnız təsdiqlənmiş bağlantıda aktiv olmalıdır. Bağlantı təsdiqlənmədən mesaj göndərilmir." }, { title: "Müştəri razılığı", body: "Bildirişləri yalnız razılıq vermiş müştərilərə göndərin və abunəlikdən çıxma istəyinə əməl edin." }, { title: "Məlumatların qorunması", body: "Şablonda yalnız qəbul üçün lazım olan məlumatları istifadə edin. Məxfi məlumatları mesajlarda paylaşmayın." }, { title: "Göndərmə vaxtı", body: "Xatırlatmaları iş saatlarında planlaşdırın və tezliyi müştərinin gözləntilərinə uyğun saxlayın." }].map((item) => <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><h4 className="font-bold">{item.title}</h4><p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p></article>)}</div>}
      {tab === "reviews" && <IntegrationReviewsPanel reviews={data.reviews} session={session} onAdd={(review) => onSave({ ...data, reviews: [review, ...data.reviews] })} />}
    </div></BusinessEntryDialog>;
}
