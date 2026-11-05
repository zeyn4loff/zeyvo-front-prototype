import { Link } from "react-router";

interface Crumb { label: string; to?: string }
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <nav aria-label="Naviqasiya yolu" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
    <Link to="/" className="hover:underline">Əsas səhifə</Link>
    {items.map((item, index) => <span key={`${item.label}-${index}`} className="flex items-center gap-1.5"><span aria-hidden="true">›</span>{item.to ? <Link to={item.to} className="hover:underline">{item.label}</Link> : <span aria-current="page" className="font-semibold text-primary">{item.label}</span>}</span>)}
  </nav>;
}
