import { Navigate } from "react-router";
import { useBusinessSession } from "@/features/business/auth/useBusinessSession";
import BusinessShell from "@/features/business/dashboard/BusinessShell";
import BusinessIntegrations from "@/features/business/integrations/BusinessIntegrations";
export default function BusinessIntegrationsPage() { const { session } = useBusinessSession(); if (!session) return <Navigate to="/partner/auth" replace />; return <BusinessShell session={session} section="integrations"><BusinessIntegrations session={session} /></BusinessShell>; }
