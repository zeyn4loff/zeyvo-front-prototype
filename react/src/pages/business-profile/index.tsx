import { Navigate, useParams } from "react-router";
import { useBusinessSession } from "@/features/business/auth/useBusinessSession";
import BusinessShell from "@/features/business/dashboard/BusinessShell";
import BusinessProfile from "@/features/business/profile/BusinessProfile";
import type { ProfileTab } from "@/features/business/profile/profile";
const tabs: ProfileTab[] = ["personal", "startpage", "messengers", "social", "apps", "security"];
export default function BusinessProfilePage() { const { session } = useBusinessSession(); const { tab } = useParams(); if (!session) return <Navigate to="/partner/auth" replace />; if (!tab || !tabs.includes(tab as ProfileTab)) return <Navigate to="/partner/profile/personal" replace />; return <BusinessShell session={session} section="profile"><BusinessProfile session={session} tab={tab as ProfileTab} /></BusinessShell>; }
