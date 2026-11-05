import { readJson, writeJson } from "@/lib/demoStorage";

export interface PublicReview {
  id: string;
  name: string;
  email?: string;
  rating: number;
  text: string;
  date: string;
  reply?: string;
  status?: "published" | "hidden";
}

const key = (subject: string) => `zeyvo_reviews_${subject}`;

export function readReviews(subject: string): PublicReview[] {
  return readJson(key(subject), [] as PublicReview[], (value): value is PublicReview[] =>
    Array.isArray(value) && value.every((item) => item && typeof item.id === "string" && typeof item.name === "string" && Number.isInteger(item.rating) && item.rating >= 1 && item.rating <= 5 && typeof item.text === "string" && typeof item.date === "string"));
}

export function saveReviews(subject: string, reviews: PublicReview[]): boolean {
  if (!writeJson(key(subject), reviews)) return false;
  window.dispatchEvent(new Event("zeyvo-marketplace-change"));
  return true;
}

export function reviewSummary(subject: string) {
  const reviews = readReviews(subject).filter((item) => item.status !== "hidden");
  return { count: reviews.length, rating: reviews.length ? Number((reviews.reduce((total, item) => total + item.rating, 0) / reviews.length).toFixed(2)) : 0 };
}
