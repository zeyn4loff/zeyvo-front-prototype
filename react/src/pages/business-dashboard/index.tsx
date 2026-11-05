import { Navigate } from "react-router";
import BusinessShell from "@/features/business/dashboard/BusinessShell";
import BusinessDirectory from "@/features/business/directory/BusinessDirectory";
import { useBusinessSession } from "@/features/business/auth/useBusinessSession";

export default function BusinessDashboardPage() {
  const { session } = useBusinessSession();
  if (!session) return <Navigate to="/partner/auth" replace />;
  return <BusinessShell session={session}><BusinessDirectory session={session} /></BusinessShell>;
}
