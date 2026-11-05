import { Navigate } from "react-router";
import { useBusinessSession } from "@/features/business/auth/useBusinessSession";
import BusinessShell from "@/features/business/dashboard/BusinessShell";
import BusinessMarketing from "@/features/business/marketing/BusinessMarketing";
export default function BusinessMarketingPage() { const { session } = useBusinessSession(); if (!session) return <Navigate to="/partner/auth" replace />; return <BusinessShell session={session} section="marketing"><BusinessMarketing session={session} /></BusinessShell>; }
