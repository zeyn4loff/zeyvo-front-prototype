export type SocialNetwork = "instagram" | "facebook" | "whatsapp";

export default function SocialIcon({ type }: { type: SocialNetwork }) {
  if (type === "instagram") return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" />
  </svg>;
  if (type === "facebook") return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 21v-8h2.8l.5-3H14V8c0-1.3.4-2 2-2h1.5V3.1A18 18 0 0 0 15.4 3C12.1 3 10 5 10 8.5V10H7v3h3v8" />
  </svg>;
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.5 11.7a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z" />
    <path d="M8.4 8.1c.4-.3.8-.2 1 .2l.9 1.3c.2.3.1.7-.1.9l-.6.7a7 7 0 0 0 3.2 3.2l.7-.6c.2-.2.6-.3.9-.1l1.3.9c.4.2.5.6.2 1-.4.6-.9.9-1.6.9-2.9 0-6.9-4-6.9-6.9 0-.7.3-1.2 1-1.5Z" />
  </svg>;
}
