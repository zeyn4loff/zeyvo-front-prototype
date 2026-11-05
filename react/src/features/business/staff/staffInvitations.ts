export type StaffInvitation = {
  id: string;
  senderId: string;
  senderName: string;
  businessName: string;
  staffId: string;
  staffName: string;
  email: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
};

const KEY = "zeyvo_staff_invitations_v1";
export const INVITATIONS_CHANGED = "zeyvo-staff-invitations-changed";
const normalizeEmail = (email: string) => email.trim().toLocaleLowerCase();
const acceptedExampleInvitations: StaffInvitation[] = [
  { id: "demo_staff_invite_st_1", senderId: "baku-beauty-demo", senderName: "Leyla Məmmədova", businessName: "Baku Beauty Studio", staffId: "st_1", staffName: "Samir Əliyev", email: "samir.aliyev@zeyvo.az", status: "accepted", createdAt: "2026-01-15T10:00:00.000Z" },
  { id: "demo_staff_invite_st_3", senderId: "baku-beauty-demo", senderName: "Leyla Məmmədova", businessName: "Baku Beauty Studio", staffId: "st_3", staffName: "Kamran Bağırov", email: "kamran.b@zeyvo.az", status: "accepted", createdAt: "2026-01-16T10:00:00.000Z" },
];
const incomingExampleInvitations: StaffInvitation[] = [
  { id: "incoming_invite_caspian_studio", senderId: "caspian-studio", senderName: "Nərgiz Həsənova", businessName: "Caspian Studio", staffId: "caspian_stylist_1", staffName: "Leyla Məmmədova", email: "admin@bakubeauty.az", status: "pending", createdAt: "2026-11-02T09:30:00.000Z" },
  { id: "incoming_invite_city_beauty", senderId: "city-beauty", senderName: "Rəşad Quliyev", businessName: "City Beauty", staffId: "city_stylist_1", staffName: "Leyla Məmmədova", email: "admin@bakubeauty.az", status: "pending", createdAt: "2026-11-01T14:15:00.000Z" },
];
const exampleInvitations = [...acceptedExampleInvitations, ...incomingExampleInvitations];

export function readStaffInvitations(): StaffInvitation[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    const stored = Array.isArray(value) ? value.filter((item): item is StaffInvitation =>
      Boolean(item && typeof item.id === "string" && typeof item.email === "string" && typeof item.senderId === "string" && typeof item.staffId === "string" && ["pending", "accepted", "declined"].includes(item.status))) : [];
    return [...stored, ...exampleInvitations.filter((example) => !stored.some((item) => item.id === example.id))];
  } catch { return exampleInvitations; }
}

function save(items: StaffInvitation[]): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(INVITATIONS_CHANGED));
    return true;
  } catch { return false; }
}

export function invitationsForEmail(email: string): StaffInvitation[] {
  return readStaffInvitations().filter((item) => item.email === normalizeEmail(email)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function invitationForStaff(senderId: string, staffId: string): StaffInvitation | undefined {
  return readStaffInvitations().filter((item) => item.senderId === senderId && item.staffId === staffId).sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}

export function createStaffInvitation(input: Omit<StaffInvitation, "id" | "status" | "createdAt">): boolean {
  const items = readStaffInvitations();
  const email = normalizeEmail(input.email);
  if (items.some((item) => item.senderId === input.senderId && item.staffId === input.staffId && item.email === email && item.status === "pending")) return false;
  return save([...items, { ...input, email, id: crypto.randomUUID(), status: "pending", createdAt: new Date().toISOString() }]);
}

export function answerStaffInvitation(id: string, email: string, status: "accepted" | "declined"): boolean {
  const items = readStaffInvitations();
  const item = items.find((entry) => entry.id === id && entry.email === normalizeEmail(email) && entry.status === "pending");
  if (!item) return false;
  return save(items.map((entry) => entry.id === id ? { ...entry, status } : entry));
}
