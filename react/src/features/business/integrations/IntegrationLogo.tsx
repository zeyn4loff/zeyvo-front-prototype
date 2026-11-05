type Props = { size?: "card" | "header" };

export default function IntegrationLogo({ size = "card" }: Props) {
  return <img
    src="/whatsapp-wamingo.avif"
    alt="WhatsApp"
    className={`shrink-0 rounded-2xl object-cover ${size === "header" ? "size-10 sm:size-11" : "size-12"}`}
  />;
}
