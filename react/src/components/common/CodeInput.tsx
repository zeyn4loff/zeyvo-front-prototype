import { useRef, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  autoFocus?: boolean;
}

export default function CodeInput({ value, onChange, label, autoFocus = false }: Props) {
  const fields = useRef<(HTMLInputElement | null)[]>([]);
  const focus = (index: number) => fields.current[Math.max(0, Math.min(5, index))]?.focus();

  function change(index: number, event: ChangeEvent<HTMLInputElement>) {
    const entered = event.target.value.replace(/\D/g, "");
    if (!entered) {
      onChange(value.slice(0, index) + value.slice(index + 1));
      return;
    }
    if (entered.length > 1) {
      onChange((value.slice(0, index) + entered + value.slice(index + entered.length)).slice(0, 6));
      focus(Math.min(5, index + entered.length));
      return;
    }
    onChange((value.slice(0, index) + entered + value.slice(index + 1)).slice(0, 6));
    if (index < 5) focus(index + 1);
  }

  function keyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      event.preventDefault();
      onChange(value.slice(0, index - 1) + value.slice(index));
      focus(index - 1);
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focus(index - 1);
    } else if (event.key === "ArrowRight" && index < 5) {
      event.preventDefault();
      focus(index + 1);
    }
  }

  function paste(event: ClipboardEvent<HTMLInputElement>) {
    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!digits) return;
    event.preventDefault();
    onChange(digits);
    focus(Math.min(5, digits.length));
  }

  return <div role="group" aria-label={label} className="grid grid-cols-6 gap-1.5 sm:gap-2">
    {Array.from({ length: 6 }, (_, index) => <input
      key={index}
      ref={(element) => { fields.current[index] = element; }}
      value={value[index] || ""}
      onChange={(event) => change(index, event)}
      onKeyDown={(event) => keyDown(index, event)}
      onPaste={paste}
      aria-label={`${label}, ${index + 1}/6`}
      type="text"
      inputMode="numeric"
      autoComplete={index === 0 ? "one-time-code" : "off"}
      maxLength={6}
      autoFocus={autoFocus && index === 0}
      className="h-12 min-w-0 w-full rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-900 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25"
    />)}
  </div>;
}
