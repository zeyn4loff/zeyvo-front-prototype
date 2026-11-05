import { Navigate } from "react-router";
import { useBusinessSession } from "@/features/business/auth/useBusinessSession";
import BusinessShell from "@/features/business/dashboard/BusinessShell";
import BusinessLoyalty from "@/features/business/loyalty/BusinessLoyalty";
export default function BusinessLoyaltyPage() { const { session } = useBusinessSession(); if (!session) return <Navigate to="/partner/auth" replace />; return <BusinessShell session={session} section="loyalty"><BusinessLoyalty session={session} /></BusinessShell>; }
