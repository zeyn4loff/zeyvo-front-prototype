import { useEffect, useState } from "react";
import type { BusinessSession } from "../auth/businessSession";
import { readProductData, saveProductData, type ProductData } from "./products";
export function useProducts(session: BusinessSession) {
  const [data, setData] = useState<ProductData>(() => readProductData(session));
  useEffect(() => { const refresh = () => setData(readProductData(session)); window.addEventListener("zeyvo-pos-sale", refresh); return () => window.removeEventListener("zeyvo-pos-sale", refresh); }, [session]);
  function update(next: ProductData) {
    if (!saveProductData(session.id, next)) return false;
    setData(next);
    return true;
  }
  return { data, update };
}
