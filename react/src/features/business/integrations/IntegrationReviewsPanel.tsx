import { showToast } from "../../../components/common/toast";
import { Star } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { BusinessSession } from "../auth/businessSession";
import type { IntegrationReview } from "./integrations";

const inputClass = "mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-slate-900 focus:bg-white";

function formatReviewDate(date: string) {
  const isoDate = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);
  if (isoDate) return `${isoDate[3]}.${isoDate[2]}.${isoDate[1]}`;
  const value = new Date(date);
  return Number.isNaN(value.getTime()) ? date : new Intl.DateTimeFormat("az-AZ", { day: "2-digit", month: "2-digit", year: "numeric" }).format(value);
}

export default function IntegrationReviewsPanel({ reviews, session, onAdd }: { reviews: IntegrationReview[]; session: BusinessSession; onAdd: (review: IntegrationReview) => boolean }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const ratedReviews = reviews.filter((item) => item.rating > 0);
  const average = ratedReviews.length ? (ratedReviews.reduce((sum, item) => sum + item.rating, 0) / ratedReviews.length).toFixed(2) : "—";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (comment.trim().length < 5) { setError("Ən azı 5 simvoldan ibarət şərh yazın."); return; }
    const item: IntegrationReview = { id: crypto.randomUUID(), userName: session.ownerName || "İstifadəçi", businessTitle: session.businessName, rating: 0, comment: comment.trim(), date: new Date().toISOString().slice(0, 10) };
    if (!onAdd(item)) { setError("Rəyi saxlamaq mümkün olmadı."); return; }
    setComment(""); setError(""); showToast("Şərh əlavə edildi.");
  }
  return <div className="space-y-5">
    <section className="flex flex-col items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:p-5" aria-label="Qiymətlərin xülasəsi">
      <div className="flex shrink-0 flex-col items-center sm:border-r sm:border-slate-200 sm:pr-6"><strong className="font-mono text-3xl font-black text-slate-900 sm:text-4xl">{average}</strong>{ratedReviews.length > 0 && <div className="my-1 flex text-amber-400">{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={16} fill="currentColor" />)}</div>}<span className="text-xs text-slate-500">{ratedReviews.length} qiymətləndirmə</span></div>
      <div className="w-full flex-1 space-y-1.5">{[5, 4, 3, 2, 1].map((stars) => { const count = ratedReviews.filter((item) => Math.round(item.rating) === stars).length; return <div key={stars} className="flex items-center gap-2"><span className="w-12 shrink-0 text-[11px] font-semibold text-slate-500">{stars} ulduz</span><div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-amber-400" style={{ width: `${ratedReviews.length ? count / ratedReviews.length * 100 : 0}%` }} /></div><span className="w-8 text-right font-mono text-[11px] text-slate-400">{count}</span></div>; })}</div>
    </section>
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <h3 className="text-sm font-bold text-slate-900">Şərh yaz</h3>
      <form onSubmit={submit} className="mt-3 space-y-3">
        <label htmlFor="integration-comment" className="block text-xs font-semibold text-slate-700">Şərhiniz</label>
        <textarea id="integration-comment" required minLength={5} maxLength={500} rows={4} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="İnteqrasiya haqqında şərhinizi yazın..." className={`${inputClass} min-h-28 resize-y py-3 font-normal`} />
        {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
        <div className="flex justify-end"><button type="submit" className="min-h-10 cursor-pointer rounded-xl bg-[#101114] px-5 text-xs font-bold text-white">Şərhi əlavə et</button></div>
      </form>
    </section>
    <section className="space-y-3"><div className="flex justify-between gap-2"><h3 className="text-xs font-bold text-slate-800">Şərhlər ({reviews.length})</h3><span className="text-[11px] text-slate-400">Ən yenilər yuxarıda</span></div><div className="space-y-2.5">{reviews.map((item) => <article key={item.id} className="space-y-1.5 rounded-2xl border border-slate-100 bg-slate-50 p-3.5"><div className="flex flex-wrap items-center justify-between gap-2"><div className="flex min-w-0 items-center gap-2"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[11px] font-bold text-slate-700">{item.userName.slice(0, 1).toUpperCase()}</span><div><h4 className="text-xs font-bold text-slate-900">{item.userName}</h4><p className="text-[10px] text-slate-400">{item.businessTitle || "Biznes Sahibi"}</p></div></div><div className="flex items-center gap-2">{item.rating > 0 && <span className="flex text-amber-400" aria-label={`${item.rating} ulduz`}>{Array.from({ length: Math.round(item.rating) }, (_, n) => <Star key={n} size={14} fill="currentColor" />)}</span>}<time className="text-[11px] text-slate-400">{formatReviewDate(item.date)}</time></div></div><p className="pl-9 text-xs leading-relaxed text-slate-700">«{item.comment}»</p></article>)}</div></section>
  </div>;
}
