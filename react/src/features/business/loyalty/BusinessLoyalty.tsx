import { showToast as setMessage } from "../../../components/common/toast";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import BusinessDeleteDialog from "../components/BusinessDeleteDialog";
import BusinessHeaderButton from "../components/BusinessHeaderButton";
import BusinessHeaderPortal from "../components/BusinessHeaderPortal";
import BusinessPagination from "../components/BusinessPagination";
import { BusinessTabButton, BusinessTabNav } from "../components/BusinessTabs";
import { readServiceData } from "../services/services";
import { useActiveBusinessContext } from "../directory/activeContext";
import LoyaltyDialog from "./LoyaltyDialog";
import LoyaltyFilters, { type FilterKey, type FilterValues } from "./LoyaltyFilters";
import LoyaltySummary from "./LoyaltySummary";
import LoyaltyTable from "./LoyaltyTable";
import type { GiftCard, LoyaltyRule, LoyaltyTab, Subscription } from "./loyalty";
import { useLoyalty } from "./useLoyalty";

type Entry = LoyaltyRule | GiftCard | Subscription;
const emptyLoyaltyFilters = () => ({ status: "all", type: "all", sale: "all", online: "all", target: "all" });
const tabs: { id: LoyaltyTab; label: string; action: string }[] = [
  { id: "cards_cashback", label: "Loyallıq kartları və cashback", action: "Yeni kart / qayda" },
  { id: "gift_cards", label: "Hədiyyə kartları", action: "Yeni hədiyyə kartı" },
  { id: "subscriptions", label: "Abunəliklər", action: "Yeni abunəlik" },
];

export default function BusinessLoyalty({ session }: { session: BusinessSession }) {
  const { data, update } = useLoyalty(session);
  const activeBusiness = useActiveBusinessContext(session);
  const serviceData = readServiceData(session);
  const services = serviceData.services.filter((service) => (service.businessId ?? (session.id === "baku-beauty-demo" ? "biz_baku_beauty" : activeBusiness?.businessId)) === activeBusiness?.businessId);
  const serviceCategories = serviceData.categories.filter((category) => services.some((service) => service.categoryId === category.id));
  const [tab, setTab] = useState<LoyaltyTab>("cards_cashback");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(emptyLoyaltyFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editing, setEditing] = useState<Entry | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<Entry | null>(null);
  const items: Entry[] = tab === "cards_cashback" ? data.rules : tab === "gift_cards" ? data.giftCards : data.subscriptions;
  const counts = { cards_cashback: data.rules.length, gift_cards: data.giftCards.filter((x) => x.status === "active").length, subscriptions: data.subscriptions.filter((x) => x.status === "active").length };
  const filtered = items.filter((item) => {
    if (filters.status !== "all" && item.status !== filters.status) return false;
    if (filters.type !== "all" && (!("type" in item) || item.type !== filters.type)) return false;
    if (filters.target !== "all" && (!("target" in item) || item.target !== (filters.target === "all_clients" ? "all" : filters.target))) return false;
    if (filters.sale !== "all" && (!("availableForSale" in item) || item.availableForSale !== (filters.sale === "available"))) return false;
    if (filters.online !== "all" && (!("availableOnline" in item) || item.availableOnline !== (filters.online === "online"))) return false;
    const searchText = "nominal" in item ? `${item.name} ${item.serviceName} ${item.nominal} ${item.salePrice}` : "visitsCount" in item ? `${item.name} ${item.serviceNames}` : item.name;
    return searchText.toLocaleLowerCase("az-AZ").includes(query.trim().toLocaleLowerCase("az-AZ"));
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const shown = filtered.slice((Math.min(page, totalPages) - 1) * pageSize, Math.min(page, totalPages) * pageSize);
  function selectTab(next: LoyaltyTab) { setTab(next); setQuery(""); setFilters(emptyLoyaltyFilters()); setPage(1); setMessage(""); }
  function changeFilter(key: FilterKey, value: string) { setFilters((current) => ({ ...current, [key]: value })); setPage(1); }
  function resetFilters() { setFilters(emptyLoyaltyFilters()); setQuery(""); setPage(1); }
  function applyFilters(values: FilterValues) { setFilters(values); setPage(1); }
  function save(item: Entry) {
    const list = items.some((x) => x.id === item.id) ? items.map((x) => x.id === item.id ? item : x) : [item, ...items];
    const next = { ...data, [tab === "cards_cashback" ? "rules" : tab === "gift_cards" ? "giftCards" : "subscriptions"]: list };
    const ok = update(next);
    setMessage(ok ? "Yadda saxlanıldı." : "Yadda saxlamaq mümkün olmadı.");
    return ok;
  }
  function remove() {
    if (!deleting) return;
    const list = items.filter((x) => x.id !== deleting.id);
    const next = { ...data, [tab === "cards_cashback" ? "rules" : tab === "gift_cards" ? "giftCards" : "subscriptions"]: list };
    if (update(next)) { setMessage("Silindi."); setDeleting(null); } else setMessage("Silmək mümkün olmadı.");
  }
  return <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-5 sm:px-7 sm:py-7">
    <BusinessHeaderPortal slot="title">Loyallıq Proqramı</BusinessHeaderPortal>
    <BusinessHeaderPortal slot="subtitle">Loyallıq kartları, hədiyyə kartları və abunəliklər</BusinessHeaderPortal>
    <BusinessHeaderPortal slot="actions"><BusinessHeaderButton onClick={() => setEditing(null)}><Plus />{tabs.find((x) => x.id === tab)?.action}</BusinessHeaderButton></BusinessHeaderPortal>
    <BusinessTabNav label="Loyallıq bölmələri">{tabs.map((item) => <BusinessTabButton key={item.id} active={tab === item.id} count={counts[item.id]} onClick={() => selectTab(item.id)}>{item.label}</BusinessTabButton>)}</BusinessTabNav>
    <LoyaltySummary tab={tab} data={data} />
    <LoyaltyFilters tab={tab} query={query} onQuery={(value) => { setQuery(value); setPage(1); }} filters={filters} onFilter={changeFilter} onApply={applyFilters} open={filterOpen} onOpen={setFilterOpen} onReset={resetFilters} />

    <LoyaltyTable tab={tab} entries={shown} onEdit={setEditing} onDelete={setDeleting} onCreate={() => setEditing(null)} />
    <BusinessPagination totalItems={filtered.length} currentPage={page} pageSize={pageSize} onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} itemFromLabel={tab === "cards_cashback" ? "kart / qaydadan" : tab === "gift_cards" ? "hədiyyə kartından" : "abunəlikdən"} onPageChange={setPage} />
    {editing !== undefined && <LoyaltyDialog key={`${tab}-${editing?.id ?? "new"}`} tab={tab} entry={editing} services={services} categories={serviceCategories} onClose={() => setEditing(undefined)} onSave={save} />}
    {deleting && <BusinessDeleteDialog name={deleting.name} onClose={() => setDeleting(null)} onDelete={remove} />}
  </main>;
}
