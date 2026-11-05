import { Navigate } from "react-router";
import { useBusinessSession } from "@/features/business/auth/useBusinessSession";
import BusinessShell from "@/features/business/dashboard/BusinessShell";
import BusinessServices from "@/features/business/services/BusinessServices";
export default function BusinessServicesPage() { const { session } = useBusinessSession(); if (!session) return <Navigate to="/partner/auth" replace />; return <BusinessShell session={session} section="services"><BusinessServices session={session} /></BusinessShell>; }
