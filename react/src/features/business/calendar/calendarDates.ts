import { addDays } from "./bookings";

export function prettyDate(value: string, withWeekday = false) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const valid = year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31 && !Number.isNaN(date.getTime());
  if (!valid) return value;
  const months = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"];
  const weekdays = ["Bz", "Be", "Ça", "Ç", "Ca", "C", "Ş"];
  return withWeekday ? `${weekdays[date.getDay()]}, ${day}` : `${day} ${months[month - 1]} ${year}`;
}

export function weekDates(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = new Date(year, month - 1, day).getDay();
  const monday = addDays(date, -((weekday + 6) % 7));
  return Array.from({ length: 7 }, (_, index) => addDays(monday, index));
}

export function minutes(time: string) {
  const [hours, mins] = time.split(":").map(Number);
  return hours * 60 + mins;
}
