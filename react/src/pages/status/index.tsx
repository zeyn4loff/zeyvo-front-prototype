import { Link } from "react-router";
import EmptyState from "@/components/common/EmptyState";
import { FileQuestion } from "lucide-react";

export default function StatusPage() {
  return <div className="container mx-auto px-4 py-8 sm:py-12"><EmptyState title="Səhifə tapılmadı" description="Axtardığınız səhifə mövcud deyil." icon={FileQuestion} action={<Link to="/" className="inline-flex min-h-11 items-center rounded-xl bg-brand-primary px-5 text-sm font-bold text-slate-900">Əsas səhifəyə qayıt</Link>} /></div>;
}
