import { ChevronDown, Pencil, Plus, Trash2, UserRound } from "lucide-react";
import { categories } from "@/features/marketplace/data";
import type { Branch, Business } from "./businesses";

interface Props {
  business: Business;
  collapsed: boolean;
  onToggle: () => void;
  onEditBusiness: () => void;
  onDeleteBusiness: () => void;
  onEditBranch: (branch: Branch) => void;
  onDeleteBranch: (branch: Branch) => void;
  onAddBranch: () => void;
}

const actionButton = "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-white sm:size-7";
const branchActionButton = "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-white sm:size-6";

export default function BusinessDirectoryCard({ business, collapsed, onToggle, onEditBusiness, onDeleteBusiness, onEditBranch, onDeleteBranch, onAddBranch }: Props) {
  const isBusiness = business.type === "business";
  const [categoryId, subcategoryId] = (business.category ?? "").split("/");
  const category = categories.find((item) => item.id === categoryId);
  const categoryName = category?.subcategories.find((item) => item.id === subcategoryId)?.azName ?? category?.azName;
  const individualDetails = [categoryName, business.address, business.phone, business.hours].filter(Boolean).join(" • ");

  return <article className="space-y-3 p-4 transition-colors hover:bg-slate-50/50 sm:p-5">
    <div className="flex items-start justify-between gap-4 sm:items-center">
      <div className="flex min-w-0 items-center gap-3">
        {!isBusiness && <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600"><UserRound size={20} /></span>}
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
          {isBusiness && <button type="button" onClick={onToggle} aria-label={collapsed ? "Filialları göstər" : "Filialları qatla"} aria-expanded={!collapsed} className="-ml-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"><ChevronDown size={14} className={`transition-transform duration-200 ${collapsed ? "-rotate-90" : ""}`} /></button>}
          <button type="button" onClick={isBusiness ? onToggle : onEditBusiness} className="min-w-0 cursor-pointer truncate text-left text-sm font-bold text-slate-900 hover:underline">{business.name}</button>
          <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${isBusiness ? "border-amber-200/50 bg-amber-100/70 text-amber-900" : "border-blue-200/50 bg-blue-100/70 text-blue-900"}`}>{isBusiness ? "Biznes" : "Fərdi usta"}</span>
          {isBusiness && <button type="button" onClick={onToggle} aria-expanded={!collapsed} className="cursor-pointer text-[11px] text-slate-400 hover:text-slate-600">({business.branches.length} filial)</button>}
          {!isBusiness && <p className="w-full truncate text-[11px] text-slate-400">{individualDetails || business.description}</p>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button type="button" onClick={onEditBusiness} aria-label={`${business.name} redaktə et`} className={actionButton}><Pencil size={14} /></button>
        <button type="button" onClick={onDeleteBusiness} aria-label={`${business.name} sil`} className={`${actionButton} hover:border-red-200 hover:bg-red-50 hover:text-red-600`}><Trash2 size={14} /></button>
      </div>
    </div>
    {isBusiness && !collapsed && <div className="relative my-1 ml-2 space-y-2 border-l-2 border-slate-200/90 pl-4 pt-1 sm:ml-3 sm:pl-5">
      {business.branches.map((branch) => <div key={branch.id} className="relative before:absolute before:-left-[18px] before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-slate-200 sm:before:-left-[22px] sm:before:w-5">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-slate-50/80 p-2.5 text-xs transition hover:bg-slate-100/70 sm:p-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-amber-400" />
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
              <strong className="min-w-0 break-words text-xs text-slate-900">{branch.name}</strong>
              {branch.address && <span className="min-w-0 break-words text-[11px] text-slate-400">• {branch.address}</span>}
              {branch.phone && <span className="hidden min-w-0 truncate text-[11px] text-slate-400 sm:inline">• {branch.phone}</span>}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <button type="button" onClick={() => onEditBranch(branch)} aria-label={`${branch.name} redaktə et`} className={`${branchActionButton} hover:text-slate-700`}><Pencil size={14} /></button>
            <button type="button" onClick={() => onDeleteBranch(branch)} aria-label={`${branch.name} sil`} className={`${branchActionButton} hover:text-red-600`}><Trash2 size={14} /></button>
          </div>
        </div>
      </div>)}
      <div className="relative pt-0.5 before:absolute before:-left-[18px] before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-slate-200 sm:before:-left-[22px] sm:before:w-5">
        <button type="button" onClick={onAddBranch} className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-100/90 px-3 py-2 text-xs font-medium text-slate-800 transition hover:border-amber-300 hover:bg-brand-primary"><Plus size={14} />Filial əlavə et</button>
      </div>
    </div>}
  </article>;
}
