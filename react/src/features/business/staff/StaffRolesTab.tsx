import { useState } from "react";
import { BriefcaseBusiness, Check, Pencil, Search, Trash2, UsersRound, X } from "lucide-react";
import EmptyState from "../../../components/common/EmptyState";
import type { StaffMember, StaffRole } from "./staff";

type Props = { roles: StaffRole[]; members: StaffMember[]; onEdit: (role: StaffRole) => void; onDelete: (role: StaffRole) => void };
type Filter = "all" | "assigned" | "unassigned" | "default" | "custom";

export default function StaffRolesTab({ roles, members, onEdit, onDelete }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const assigned = roles.filter((role) => members.some((member) => member.roleId === role.id)).length;
  const defaultCount = roles.filter((role) => role.isDefault).length;
  const customCount = roles.length - defaultCount;
  const cards = [
    { id: "all" as Filter, title: "Ümumi vəzifələr", value: roles.length, detail: "Mövcud bütün ixtisaslar", color: "text-slate-900", icon: <UsersRound size={16} />, iconStyle: "bg-slate-100 text-slate-700" },
    { id: "assigned" as Filter, title: "Təyin olunmuş", value: assigned, detail: "Ustası olan vəzifələr", color: "text-emerald-600", icon: <Check size={16} />, iconStyle: "bg-emerald-50 text-emerald-600" },
    { id: "default" as Filter, title: "Standart şablonlar", value: defaultCount, detail: "Sistem şablonları", color: "text-slate-900", icon: <span className="text-[10px] font-black">STD</span>, iconStyle: "bg-blue-50 text-blue-600" },
    { id: "custom" as Filter, title: "Fərdi vəzifələr", value: customCount, detail: "Salon tərəfindən yaradılan", color: "text-slate-900", icon: <span className="text-[10px] font-black">FƏRDİ</span>, iconStyle: "bg-amber-50 text-amber-700" },
  ];
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: `Bütün vəzifələr (${roles.length})` },
    { id: "assigned", label: `Təyin olunmuş heyət (${assigned})` },
    { id: "unassigned", label: `Təyin edilməmiş vəzifələr (${roles.length - assigned})` },
    { id: "default", label: `Standart şablonlar (${defaultCount})` },
    { id: "custom", label: `Fərdi vəzifələr (${customCount})` },
  ];
  const normalized = query.trim().toLocaleLowerCase("az-AZ");
  const visible = roles.filter((role) => {
    const hasStaff = members.some((member) => member.roleId === role.id);
    return (!normalized || `${role.name} ${role.description}`.toLocaleLowerCase("az-AZ").includes(normalized))
      && (filter === "all" || (filter === "assigned" && hasStaff) || (filter === "unassigned" && !hasStaff)
        || (filter === "default" && role.isDefault) || (filter === "custom" && !role.isDefault));
  });

  return <div className="space-y-5 sm:space-y-6">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">{cards.map((card) => <button type="button" key={card.id} onClick={() => setFilter(card.id)} aria-pressed={filter === card.id} className={`group min-w-0 cursor-pointer rounded-2xl border bg-white p-4 text-left shadow-xs transition sm:p-5 ${filter === card.id ? "border-slate-900 ring-2 ring-brand-primary/40" : "border-slate-200/80 hover:border-slate-300"}`}><div className="mb-2 flex items-start justify-between gap-1"><span className="text-xs font-semibold text-slate-500">{card.title}</span><span className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${card.iconStyle}`}>{card.icon}</span></div><strong className={`block font-mono text-2xl font-black sm:text-3xl ${card.color}`}>{card.value}</strong><p className="mt-1 text-[11px] text-slate-400">{card.detail}</p></button>)}</div>

    <div className="space-y-2.5"><div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3"><label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-3.5 shadow-xs focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/10"><Search size={16} className="shrink-0 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Vəzifə axtar" placeholder="Vəzifə adı və ya təsvir üzrə axtarış..." className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none placeholder:text-slate-400" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Axtarışı təmizlə" className="cursor-pointer text-slate-400 hover:text-slate-700"><X size={16} /></button>}</label><select aria-label="Vəzifə filtri" value={filter} onChange={(event) => setFilter(event.target.value as Filter)} className={`h-11 w-full cursor-pointer rounded-2xl border bg-white px-3.5 text-xs font-semibold shadow-xs outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 sm:w-64 ${filter === "all" ? "border-slate-200/80 text-slate-700" : "border-slate-900 text-slate-900 ring-2 ring-brand-primary/40"}`}>{filters.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div>{(filter !== "all" || query) && <div className="flex flex-wrap items-center gap-2 text-[11px]"><span className="font-medium text-slate-400">Aktiv:</span>{filter !== "all" && <span className="rounded-xl border border-amber-200/70 bg-amber-50 px-2.5 py-1 font-semibold text-amber-900">{filters.find((item) => item.id === filter)?.label}</span>}{query && <span className="rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 font-semibold text-slate-800">Axtarış: “{query}”</span>}<button type="button" onClick={() => { setFilter("all"); setQuery(""); }} className="cursor-pointer font-semibold text-rose-600 underline">Hamısını sıfırla</button></div>}</div>

    <div className="grid gap-3.5 md:grid-cols-2">{visible.map((role) => {
      const assignedMembers = members.filter((member) => member.roleId === role.id);
      return <article key={role.id} className="flex min-w-0 flex-col justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs transition hover:border-slate-300 sm:p-5"><div className="flex items-start justify-between gap-2"><div className="flex min-w-0 items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber-200/50 bg-amber-50/80 text-amber-900"><BriefcaseBusiness size={20} /></span><div className="min-w-0"><div className="flex flex-wrap items-center gap-1.5"><h3 className="break-words text-sm font-bold text-slate-900">{role.name}</h3><span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${role.isDefault ? "bg-slate-100 text-slate-600" : "border border-amber-200/60 bg-amber-50 text-amber-800"}`}>{role.isDefault ? "Standart" : "Fərdi"}</span><span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{role.commission}% komissiya</span></div><p className="mt-1 line-clamp-2 break-words text-xs font-normal text-slate-500">{role.description || "Xüsusi qeyd yoxdur"}</p></div></div><div className="flex shrink-0 items-center"><button type="button" onClick={() => onEdit(role)} aria-label={`${role.name} redaktə et`} className="flex size-8 cursor-pointer items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-800"><Pencil size={16} /></button><button type="button" onClick={() => onDelete(role)} aria-label={`${role.name} sil`} className="flex size-8 cursor-pointer items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button></div></div><div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs"><span className="text-slate-500">Təyin edilmiş heyət: <strong className="text-slate-900">{assignedMembers.length} usta</strong></span>{assignedMembers.length ? <div className="flex -space-x-1.5" aria-label={assignedMembers.map((member) => member.name).join(", ")}>{assignedMembers.slice(0, 4).map((member) => <span key={member.id} tabIndex={0} aria-label={member.name} className="group/avatar relative flex size-6 items-center justify-center rounded-full bg-slate-200 text-[9px] font-bold text-slate-700 ring-2 ring-white outline-none focus-visible:ring-slate-900">{member.name[0]}<span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-max max-w-40 -translate-x-1/2 rounded-lg bg-slate-900 px-2 py-1 text-center text-[11px] font-medium text-white shadow-lg group-hover/avatar:block group-focus/avatar:block">{member.name}</span></span>)}{assignedMembers.length > 4 && <span className="flex size-6 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-500 ring-2 ring-white">+{assignedMembers.length - 4}</span>}</div> : <span className="text-[11px] text-slate-400">Heç bir ustaya təyin edilməyib</span>}</div></article>;
    })}</div>
    {!visible.length && <EmptyState title="Uyğun vəzifə tapılmadı" description="Axtarış sözünü dəyişin və ya filtri sıfırlayın." icon={BriefcaseBusiness} />}
  </div>;
}
