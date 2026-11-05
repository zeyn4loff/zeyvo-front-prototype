import { useState } from "react";
import { useNavigate } from "react-router";
import { SearchIcon } from "lucide-react";
import { Field } from "../ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Button } from "../ui/button";
import { useTranslations } from "@/features/locale/language";

export default function HeroBanner() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { t } = useTranslations();
    return (
        <section>
            <div className="pt-3 pb-4 sm:pt-5 sm:pb-6 max-w-4xl">
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[-0.01em] leading-snug text-primary">{t("heroStart")}
                        <span className="text-black/45">{t("heroEnd")}</span>
                    </h1>

                    <form className="mt-2 flex w-full max-w-4xl items-center gap-2" onSubmit={(event) => { event.preventDefault(); navigate(query.trim() ? `/catalog?q=${encodeURIComponent(query.trim())}` : "/"); document.getElementById("salons")?.scrollIntoView({ behavior: "smooth" }); }}>
                        <Field className="min-w-0 max-w-2xl flex-1">
                            <InputGroup className="h-11 w-full rounded-xl bg-white px-3 sm:h-12">
                                <InputGroupInput
                                    id="inline-start-input"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder={t("searchPlaceholder")}
                                />
                                <InputGroupAddon align="inline-start">
                                    <SearchIcon className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>

                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            className="h-11 shrink-0 rounded-xl px-6 sm:h-12"
                        >
                            {t("search")}
                        </Button>
                    </form>
                </div>
            </div>

        </section>

    )
}
