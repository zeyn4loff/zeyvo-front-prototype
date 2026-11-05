import { Link } from "react-router";
import { useTranslations } from "@/features/locale/language";
import { useCityPicker } from "@/features/location/city-picker-context";

const currentYear = new Date().getFullYear();

export default function Footer() {
    const { t } = useTranslations();
    const openCityPicker = useCityPicker();
    return (
        <footer className="border-t border-gray-200 bg-white pb-16 md:pb-0">
            <div className="mx-auto max-w-7xl px-5">
                {/* Main footer */}
                <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-[2fr_0.85fr_1fr] sm:gap-10">
                    {/* Brand */}
                    <div className="space-y-3">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1 text-2xl font-extrabold tracking-tight text-gray-900"
                        >
                            zeyvo
                            <span className="mb-2 size-2 rounded-full bg-gray-900" />
                        </Link>

                        <p className="max-w-md text-xs leading-5 text-gray-500">
                            {t("footerDescription")}
                        </p>

                    </div>

                    {/* Users */}
                    <div>
                        <h3 className="mb-3 text-xs font-semibold text-gray-900">
                            {t("forUsers")}
                        </h3>

                        <ul className="space-y-2 text-xs text-gray-600">
                            <li><Link to="/catalog" className="hover:text-black">{t("catalog")}</Link></li>
                            <li><button type="button" onClick={openCityPicker} className="hover:text-black">{t("citySelection")}</button></li>
                            <li><Link to="/partner/auth?mode=register" className="hover:text-black">{t("partnersFor")}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-3 text-xs font-semibold text-gray-900">
                            {t("contact")}
                        </h3>

                        <ul className="space-y-2 text-xs text-gray-600">
                            <li>
                                <a
                                    href="tel:+994125002026"
                                    className="font-semibold text-gray-900 hover:text-black"
                                >
                                    +994 (12) 500-20-26
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@zeyvo.az"
                                    className="hover:text-black"
                                >
                                    support@zeyvo.az
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom footer */}
                <div className="flex flex-col gap-4 border-t border-gray-200 py-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {currentYear} Zeyvo Technologies LLC. {t("rights")}
                    </p>

                    <div className="flex items-center gap-6">
                        <Link to="/terms" className="hover:text-black">
                            {t("terms")}
                        </Link>

                        <Link to="/privacy" className="hover:text-black">
                            {t("privacy")}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
