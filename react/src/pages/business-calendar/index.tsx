import { Navigate } from "react-router";
import { useBusinessSession } from "@/features/business/auth/useBusinessSession";
import BusinessShell from "@/features/business/dashboard/BusinessShell";
import BusinessCalendar from "@/features/business/calendar/BusinessCalendar";

export default function BusinessCalendarPage() {
  const { session } = useBusinessSession();
  if (!session) return <Navigate to="/partner/auth" replace />;
  return <BusinessShell session={session} section="calendar"><BusinessCalendar session={session} /></BusinessShell>;
}
