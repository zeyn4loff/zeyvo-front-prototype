import { Link, useLocation } from "react-router";
import Breadcrumbs from "@/features/marketplace/components/Breadcrumbs";
import { content, type LegalTab } from "@/features/customer/legalContent";

export default function LegalPage() {
  const tab: LegalTab = useLocation().pathname === "/privacy" ? "privacy" : "terms";
  return <div className="container mx-auto space-y-6 px-4 py-8 pb-24">
    <Breadcrumbs items={[{ label: content[tab].title }]} />
    <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h1 className="text-2xl font-bold">{content[tab].title}</h1><p className="mt-1 text-sm text-slate-500">Zeyvo şərtləri</p><nav className="mt-5 flex rounded-xl bg-slate-100 p-1 text-sm font-semibold"><Link to="/terms" className={`flex-1 rounded-lg py-2 text-center ${tab === "terms" ? "bg-white shadow-sm" : ""}`}>Şərtlər</Link><Link to="/privacy" className={`flex-1 rounded-lg py-2 text-center ${tab === "privacy" ? "bg-white shadow-sm" : ""}`}>Məxfilik</Link></nav><div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">{content[tab].paragraphs.map((paragraph) => <p key={paragraph} className="rounded-xl border border-slate-100 bg-slate-50 p-4">{paragraph}</p>)}</div></section>
  </div>;
}
