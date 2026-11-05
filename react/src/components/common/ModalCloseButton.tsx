import { X } from "lucide-react";

/** Close control shared by dialogs with custom headers. */
export default function ModalCloseButton({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-label="Bağla" title="Bağla" className="z-ui-close"><X size={16} strokeWidth={2} aria-hidden="true" /></button>;
}
