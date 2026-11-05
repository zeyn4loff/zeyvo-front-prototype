import { showToast as setMessage } from "../../../components/common/toast";
import EmptyState from "../../../components/common/EmptyState";
import BusinessPagination from "../components/BusinessPagination";
import { useState } from "react";
import BusinessFilterButton from "../components/BusinessFilterButton";
import { Download, FileText, Plus, Search, Star, Upload, UsersRound, Wallet, X } from "lucide-react";
import type { BusinessSession } from "../auth/businessSession";
import { readBookings } from "../calendar/bookings";
import { useActiveBusinessContext } from "../directory/activeContext";
import BusinessDeleteDialog from "../components/BusinessDeleteDialog";
import BusinessHeaderPortal from "../components/BusinessHeaderPortal";
import BusinessHeaderButton from "../components/BusinessHeaderButton";
import { BusinessTabButton, BusinessTabNav } from "../components/BusinessTabs";
import { readStaffData } from "../staff/staff";
import ClientProfileDialog from "./ClientProfileDialog";
import { readLoyalty } from "../loyalty/loyalty";
import type { ClientProfileTab } from "./ClientProfileDialog";
import ClientTable from "./ClientTable";
import ClientMobileList from "./ClientMobileList";
import ClientFilterDialog from "./ClientFilterDialog";
import ClientSummaryCards from "./ClientSummaryCards";
import { ClientExportDialog, ClientImportDialog } from "./ClientTransferDialogs";
import { categoryLabels, genderLabels, latestVisit, phoneDigits, totalSpent, totalVisits, upcomingBirthday, type Client, type ClientCategory, type ClientGender } from "./clients";
import { clientsToCsv, parseClientsCsv, parseClientsPaste } from "./csv";
import { useClients } from "./useClients";
type Tab = "all" | ClientCategory | "birthdays";
export default function BusinessClients({ session }: { session: BusinessSession }) {
  const { clients, update } = useClients(session);
  const bookings = readBookings(session);
  const activeBusiness = useActiveBusinessContext(session);
  const staff = readStaffData(session).members;
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState<ClientGender | "all">("all");
  const [category, setCategory] = useState<ClientCategory | "all">("all");
  const [sort, setSort] = useState("recent");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editingId, setEditingId] = useState<string | null | undefined>(undefined);
  const [openingTab, setOpeningTab] = useState<ClientProfileTab>("info");
  const [deleting, setDeleting] = useState<Client | null>(null);
  const [transferDialog, setTransferDialog] = useState<"import" | "export" | null>(null);
  const selected = editingId === null || editingId === undefined ? null : clients.find((item) => item.id === editingId) ?? null;
  const totalSpentAll = clients.reduce((sum, item) => sum + totalSpent(item), 0);
  const totalVisitCount = clients.reduce((sum, item) => sum + totalVisits(item), 0);
  const tabs: { id: Tab; name: string; count: number }[] = [
    { id: "all", name: "Bütün müştərilər", count: clients.length }, { id: "regular", name: "Daimi", count: clients.filter((item) => item.category === "regular").length },
    { id: "vip", name: "VIP müştərilər", count: clients.filter((item) => item.category === "vip").length }, { id: "new", name: "Yeni", count: clients.filter((item) => item.category === "new").length },
    { id: "birthdays", name: "Ad günləri", count: clients.filter((item) => upcomingBirthday(item)).length }, { id: "risk", name: "Risk qrupu", count: clients.filter((item) => item.category === "risk").length },
  ];
  const query = search.toLocaleLowerCase("az-AZ").trim(); const digits = phoneDigits(search);
  const filtered = clients.filter((item) => (tab === "all" || (tab === "birthdays" ? upcomingBirthday(item) : item.category === tab)) && (category === "all" || item.category === category) && (gender === "all" || item.gender === gender) && (!query || `${item.name} ${item.email} ${item.id}`.toLocaleLowerCase("az-AZ").includes(query) || (digits.length >= 2 && phoneDigits(item.phone).includes(digits)))).sort((a, b) => sort === "spent_desc" ? totalSpent(b) - totalSpent(a) : sort === "visits_desc" ? totalVisits(b) - totalVisits(a) : sort === "name_asc" ? a.name.localeCompare(b.name, "az") : sort === "name_desc" ? b.name.localeCompare(a.name, "az") : latestVisit(b).localeCompare(latestVisit(a)));
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const shown = filtered.slice((Math.min(page, pages) - 1) * pageSize, Math.min(page, pages) * pageSize);
  function saveClient(item: Client) { if (clients.some((old) => old.id !== item.id && phoneDigits(old.phone) === phoneDigits(item.phone))) { setMessage("Bu telefon nömrəsi artıq başqa müştəridə var."); return false; } const existing = clients.some((old) => old.id === item.id); const next = existing ? clients.map((old) => old.id === item.id ? item : old) : [...clients, item]; const saved = update(next); if (saved) setMessage(existing ? "Müştəri məlumatları saxlanıldı." : "Müştəri əlavə edildi."); else setMessage("Müştərini yadda saxlamaq mümkün olmadı."); return saved; }
  function openProfile(id: string, initialTab: ClientProfileTab = "info") { setOpeningTab(initialTab); setEditingId(id); }
  function remove() { if (!deleting) return; if (update(clients.filter((item) => item.id !== deleting.id))) { setMessage("Müştəri silindi."); setDeleting(null); if (editingId === deleting.id) setEditingId(undefined); } else setMessage("Müştərini silmək mümkün olmadı."); }
  function downloadCsv() { const blob = new Blob([clientsToCsv(clients)], { type: "text/csv;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "zeyvo-clients.csv"; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); setMessage("CSV faylı yükləndi."); }
  async function importCsv(file: File) { if (file.size > 1_000_000) { setMessage("CSV faylı 1 MB-dan kiçik olmalıdır."); return; } try { const result = parseClientsCsv(await file.text(), clients); if (!update(result.clients)) { setMessage("Müştəriləri yadda saxlamaq mümkün olmadı."); return; } setMessage(`${result.added} müştəri əlavə edildi, ${result.skipped} sətir ötürüldü.`); } catch (error) { setMessage(error instanceof Error ? error.message : "CSV oxunmadı."); } }
  async function importText(text: string) { try { const result = parseClientsPaste(text, clients); if (!update(result.clients)) { setMessage("Müştəriləri yadda saxlamaq mümkün olmadı."); return; } setMessage(`${result.added} müştəri əlavə edildi, ${result.skipped} sətir ötürüldü.`); } catch (error) { setMessage(error instanceof Error ? error.message : "Məlumat oxunmadı."); } }
  return <div className="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:px-7 sm:py-7">
    <BusinessHeaderPortal slot="subtitle">Bütün filiallar üzrə ortaq müştəri bazası, ziyarət tarixçəsi və fərdi balanslar</BusinessHeaderPortal>
    <BusinessHeaderPortal slot="actions"><BusinessHeaderButton variant="secondary" onClick={() => setTransferDialog("import")}><Upload />İdxal</BusinessHeaderButton><BusinessHeaderButton variant="secondary" onClick={() => setTransferDialog("export")}><Download />İxrac</BusinessHeaderButton><BusinessHeaderButton onClick={() => { setOpeningTab("info"); setEditingId(null); setMessage(""); }}><Plus />Yeni müştəri</BusinessHeaderButton></BusinessHeaderPortal>

    <BusinessTabNav label="Müştəri qrupları">{tabs.map((item) => <BusinessTabButton key={item.id} active={tab === item.id} count={item.count} onClick={() => { setTab(item.id); setPage(1); }}>{item.name}</BusinessTabButton>)}</BusinessTabNav>
    <div className="flex min-w-0 gap-2"><label className="business-search-control flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3"><Search size={17} className="shrink-0 text-slate-400" /><input aria-label="Müştəri axtar" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Ad, telefon, email və ya ID üzrə axtarış..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label><BusinessFilterButton onClick={() => setFilterOpen(true)} count={Number(category !== "all") + Number(gender !== "all") + Number(sort !== "recent")} /></div>
    <ClientSummaryCards items={[
      { title: "Cəmi müştəri", value: String(clients.length), detail: "+100% baza", icon: UsersRound, tone: "bg-slate-100 text-slate-700", active: tab === "all", onClick: () => { setTab("all"); setPage(1); } },
      { title: "Daimi və VIP", value: String(clients.filter((item) => item.category === "regular" || item.category === "vip").length), detail: `${clients.length ? Math.round(clients.filter((item) => item.category === "regular" || item.category === "vip").length / clients.length * 100) : 0}% sadiqlik`, icon: Star, tone: "bg-amber-50 text-amber-700", active: tab === "vip", onClick: () => { setTab("vip"); setPage(1); } },
      { title: "Toplam gəlir", value: `${totalSpentAll.toLocaleString("az-AZ")} ₼`, detail: "cəmi xərclər", icon: Wallet, tone: "bg-emerald-50 text-emerald-700", active: sort === "spent_desc", onClick: () => { setSort("spent_desc"); setPage(1); } },
      { title: "Orta qəbul çeki", value: `${totalVisitCount ? (totalSpentAll / totalVisitCount).toFixed(1) : 0} ₼`, detail: `${totalVisitCount} qəbul`, icon: FileText, tone: "bg-blue-50 text-blue-700", active: sort === "visits_desc", onClick: () => { setSort("visits_desc"); setPage(1); } },
    ]} />
    {(search || category !== "all" || gender !== "all" || sort !== "recent") && <div className="flex flex-wrap items-center gap-2 text-[11px]"><span className="text-slate-400">Aktiv:</span>{search && <button type="button" onClick={() => setSearch("")} className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1">Axtarış: {search}<X size={12} /></button>}{category !== "all" && <button type="button" onClick={() => setCategory("all")} className="flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1">Kateqoriya: {categoryLabels[category]}<X size={12} /></button>}{gender !== "all" && <button type="button" onClick={() => setGender("all")} className="flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1">Cins: {genderLabels[gender]}<X size={12} /></button>}{sort !== "recent" && <button type="button" onClick={() => setSort("recent")} className="flex items-center gap-1 rounded-xl border border-purple-200 bg-purple-50 px-2.5 py-1">Sıralama: {{ recent: "Ən son ziyarət", visits_desc: "Ziyarət sayı", spent_desc: "Cəmi məbləğ", name_asc: "Ad A–Z", name_desc: "Ad Z–A" }[sort]}<X size={12} /></button>}</div>}
    {transferDialog === "import" && <ClientImportDialog onClose={() => setTransferDialog(null)} onImport={importCsv} onImportText={importText} />}
    {transferDialog === "export" && <ClientExportDialog onClose={() => setTransferDialog(null)} onDownload={downloadCsv} />}
    {filterOpen && <ClientFilterDialog category={category} setCategory={setCategory} gender={gender} setGender={setGender} sort={sort} setSort={setSort} setPage={setPage} onClose={() => setFilterOpen(false)} />}
    <div className="hidden lg:block"><ClientTable clients={shown} onOpen={openProfile} onDelete={setDeleting} /></div>
    <ClientMobileList clients={shown} onOpen={openProfile} onDelete={setDeleting} />{!filtered.length && <EmptyState title="Müştəri tapılmadı" description="Axtarışı və ya filtrləri dəyişin." icon={UsersRound} />}<BusinessPagination totalItems={filtered.length} currentPage={page} pageSize={pageSize} onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} itemFromLabel="müştəridən" onPageChange={setPage} />
    {editingId !== undefined && <ClientProfileDialog key={`${editingId ?? "new"}-${openingTab}`} client={selected} initialTab={openingTab} clients={clients} bookings={bookings} staff={staff} loyaltyData={readLoyalty(session)} businessName={activeBusiness?.businessName ?? "Zeyvo"} onClose={() => setEditingId(undefined)} onSave={saveClient} />}
    {deleting && <BusinessDeleteDialog name={deleting.name} detail="Ziyarətlər, balans hərəkətləri, qeydlər və fayllar da silinəcək." onClose={() => setDeleting(null)} onDelete={remove} />}
  </div>;
}
