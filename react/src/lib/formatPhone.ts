export function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (value.trim().startsWith("+994") || (digits.startsWith("994") && digits.length > 9)) digits = digits.slice(3);
  digits = digits.slice(0, 9);
  if (!digits) return "";
  if (digits.length < 3) return `(${digits}`;
  const operator = digits.slice(0, 2);
  const first = digits.slice(2, 5);
  const second = digits.slice(5, 7);
  const third = digits.slice(7, 9);
  return `(${operator}) ${first}${second ? `-${second}` : ""}${third ? `-${third}` : ""}`;
}
