export type ToastDetail = { message: string; tone?: "success" | "error" };
export const toastEvent = "zeyvo:toast";

export function showToast(message: string, tone: ToastDetail["tone"] = "success") {
  if (!message) return;
  const inferredTone = tone === "success" && /mümkün olmadı|yanlışdır|kifayət etmir|düzgün deyil|silinə bilməz|böyük ola bilməz|daxil edin|yoxlayın|tapılmadı|oxunmadı|saxlanmadı/i.test(message) ? "error" : tone;
  window.dispatchEvent(new CustomEvent<ToastDetail>(toastEvent, { detail: { message, tone: inferredTone } }));
}
