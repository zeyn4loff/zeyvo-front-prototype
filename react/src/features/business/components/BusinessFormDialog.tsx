import type { ReactNode } from "react";
import BusinessEntryDialog from "./BusinessEntryDialog";

type BusinessFormDialogProps = {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  size?: "compact" | "medium" | "stock" | "large" | "profile" | "wide" | "extraWide";
  mobileSheet?: boolean;
  scrollContent?: boolean;
  error?: string;
};

/** Shared frame for business forms; the body scrolls independently on short screens. */
export default function BusinessFormDialog({ title, description, onClose, children, size = "large", scrollContent, error, mobileSheet }: BusinessFormDialogProps) {
  const width = size === "stock" ? "medium" : size;
  return <BusinessEntryDialog title={title} description={description} onClose={onClose} width={width} scrollContent={scrollContent} mobileSheet={mobileSheet}>
    {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {children}
  </BusinessEntryDialog>;
}
