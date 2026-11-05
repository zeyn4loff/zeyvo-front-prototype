import { Navigate } from "react-router";
import { useBusinessSession } from "@/features/business/auth/useBusinessSession";
import BusinessShell from "@/features/business/dashboard/BusinessShell";
import BusinessFinance from "@/features/business/finance/BusinessFinance";
export default function BusinessFinancePage() { const { session } = useBusinessSession(); if (!session) return <Navigate to="/partner/auth" replace />; return <BusinessShell session={session} section="finance"><BusinessFinance session={session} /></BusinessShell>; }
