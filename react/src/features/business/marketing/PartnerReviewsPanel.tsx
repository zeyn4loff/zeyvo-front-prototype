import { useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { getPublicSalons, getPublicSpecialists, useMarketplaceRevision } from "@/features/marketplace/publicCatalog";
import { readReviews, saveReviews, type PublicReview } from "@/features/marketplace/reviews";
import ReviewsPanel from "./ReviewsPanel";
import type { Review } from "./marketing";

const reviewKey = (subject: string, reviewId: string) => `${subject}:${reviewId}`;

export default function PartnerReviewsPanel({ session, fallbackReviews, onChangeFallback }: { session: BusinessSession; fallbackReviews: Review[]; onChangeFallback: (reviews: Review[]) => boolean }) {
  useMarketplaceRevision();
  const [error, setError] = useState("");
  const salons = getPublicSalons().filter((salon) => salon.partner?.ownerId === session.id);
  const salonIds = new Set(salons.map((salon) => salon.id));
  const subjects = [
    ...salons.map((salon) => ({ key: `salon-${salon.id}`, label: salon.name })),
    ...getPublicSpecialists().filter((master) => master.salonId !== undefined && salonIds.has(master.salonId)).map((master) => ({ key: `master-${master.id}`, label: master.name })),
  ];
  const marketplaceEntries = subjects.flatMap((subject) => readReviews(subject.key).map((review): Review => ({
    id: reviewKey(subject.key, review.id),
    clientName: review.name,
    serviceName: subject.label,
    rating: review.rating,
    comment: review.text,
    reply: review.reply ?? "",
    date: review.date,
    status: review.status ?? "published",
  })));
  const entries = marketplaceEntries.length ? marketplaceEntries : fallbackReviews;

  function update(next: Review[]) {
    if (!marketplaceEntries.length) return onChangeFallback(next);
    const previous = new Map(subjects.map((subject) => [subject.key, readReviews(subject.key)]));
    const nextIds = new Set(next.map((item) => item.id));
    const originalIds = new Set(entries.map((item) => item.id));
    const changed = subjects.map((subject) => {
      const reviews = previous.get(subject.key) ?? [];
      const updated = reviews.filter((review) => !originalIds.has(reviewKey(subject.key, review.id)) || nextIds.has(reviewKey(subject.key, review.id))).map((review): PublicReview => {
        const edit = next.find((item) => item.id === reviewKey(subject.key, review.id));
        return edit ? { ...review, reply: edit.reply, status: edit.status } : review;
      });
      return { subject: subject.key, reviews: updated };
    }).filter((item) => JSON.stringify(item.reviews) !== JSON.stringify(previous.get(item.subject) ?? []));
    const written: string[] = [];
    for (const item of changed) {
      if (!saveReviews(item.subject, item.reviews)) {
        written.forEach((key) => saveReviews(key, previous.get(key) ?? []));
        setError("Rəy dəyişikliklərini saxlamaq mümkün olmadı.");
        return false;
      }
      written.push(item.subject);
    }
    setError("");
    return true;
  }

  return <>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<ReviewsPanel reviews={entries} onChange={update} /></>;
}
