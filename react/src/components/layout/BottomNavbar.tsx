
import {
    LayoutGrid,
    Heart,
    CalendarDays,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { menuItems } from "@/consts";
import { useCustomer } from "@/features/customer/useCustomer";
import { useTranslations } from "@/features/locale/language";

const icons = [
    LayoutGrid,
];

const bottomItems = [
    ...menuItems.map((item, index) => ({
        ...item,
        icon: icons[index],
    })),
    {
        label: "Seçilmişlər",
        path: "/favorites",
        icon: Heart,
    },
    {
        label: "Yazılarım",
        path: "/bookings",
        icon: CalendarDays,
    },
];

export default function BottomNavbar() {
    const location = useLocation();
    const { openModal } = useCustomer();
    const { t } = useTranslations();
    if (location.pathname.startsWith("/salon/")) return null;
    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
            <div className="flex h-14 items-center justify-around px-2">
                {bottomItems.map((item) => {
                    const Icon = item.icon;
                    const label = item.path === "/favorites" ? t("favorites") : item.path === "/bookings" ? t("bookings") : t("catalog");

                    if (item.path === "/favorites" || item.path === "/bookings") return <button key={item.path} type="button" onClick={() => openModal(item.path === "/favorites" ? "favorites" : "bookings")} className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-muted-foreground"><span className="flex h-8 w-12 items-center justify-center rounded-xl"><Icon size={19} strokeWidth={1.8} /></span><span className="whitespace-nowrap text-[10px] font-medium leading-none">{label}</span></button>;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-colors ${
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div
                                        className={`flex h-8 w-12 items-center justify-center rounded-xl transition-colors ${
                                            isActive ? "bg-brand-primary" : ""
                                        }`}
                                    >
                                        <Icon
                                            size={19}
                                            strokeWidth={isActive ? 2.5 : 1.8}
                                        />
                                    </div>

                                    <span className="whitespace-nowrap text-[10px] font-medium leading-none">
                    {label}
                  </span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
