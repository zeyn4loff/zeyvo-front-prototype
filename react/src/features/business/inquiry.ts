import { readJson, writeJson } from "@/lib/demoStorage";

export interface BusinessInquiry {
  id: string;
  businessName: string;
  contactName: string;
  phone: string;
  createdAt: string;
}

const STORAGE_KEY = "zeyvo_business_inquiries_v1";

function isInquiryList(value: unknown): value is BusinessInquiry[] {
  return Array.isArray(value) && value.every((item) =>
    item && typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.businessName === "string" &&
    typeof item.contactName === "string" &&
    typeof item.phone === "string" &&
    typeof item.createdAt === "string");
}

export function saveBusinessInquiry(input: Pick<BusinessInquiry, "businessName" | "contactName" | "phone">): boolean {
  const existing = readJson(STORAGE_KEY, [] as BusinessInquiry[], isInquiryList);
  const next: BusinessInquiry = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  return writeJson(STORAGE_KEY, [next, ...existing].slice(0, 100));
}
