import { Navigate } from "react-router";
import { useBusinessSession } from "@/features/business/auth/useBusinessSession";
import BusinessShell from "@/features/business/dashboard/BusinessShell";
import BusinessProducts from "@/features/business/products/BusinessProducts";
export default function BusinessProductsPage() { const { session } = useBusinessSession(); if (!session) return <Navigate to="/partner/auth" replace />; return <BusinessShell session={session} section="products"><BusinessProducts session={session} /></BusinessShell>; }
