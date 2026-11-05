import type { FinanceData, FinanceTransaction } from "./finance";

function dateOffset(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function transaction(id: string, daysAgo: number, type: FinanceTransaction["type"], accountId: string, categoryId: string, amount: number, title: string, counterparty: string, note = "", toAccountId = ""): FinanceTransaction {
  const times: Record<string, string> = { tx_101: "14:30", tx_102: "13:15", tx_103: "12:00", tx_104: "11:20", tx_105: "18:40", tx_106: "13:25", tx_107: "10:00", tx_108: "16:15" };
  return { id, date: dateOffset(daysAgo), time: times[id], type, accountId, toAccountId, categoryId, amount, title, counterparty, note, payrollId: "" };
}

/** Initial content for the sample salon. All later edits live in browser storage. */
export function sampleFinanceData(): FinanceData {
  return {
    accounts: [
      { id: "acc_cash", name: "Əsas nağd kassa", type: "cash", openingBalance: 1680, details: "Salonun əsas nağd pul yeşiyi", isDefault: true },
      { id: "acc_pos", name: "Kapital Bank POS", type: "pos", openingBalance: 2843.5, details: "Terminal ID: 782190" },
      { id: "acc_bank", name: "ABB Cari Hesab", type: "bank", openingBalance: 2150, details: "AZ21ABBB38019440023412" },
      { id: "acc_safe", name: "Daxili Seyf", type: "safe", openingBalance: 200, details: "Ehtiyat nağd vəsait seyfi" },
    ],
    categories: [
      { id: "cat_inc_service", name: "Xidmət gəliri", type: "income" },
      { id: "cat_inc_product", name: "Məhsul satışı", type: "income" },
      { id: "cat_inc_gift", name: "Hədiyyə kartı və depozit", type: "income" },
      { id: "cat_inc_other", name: "Digər gəlirlər", type: "income" },
      { id: "cat_exp_salary", name: "Əmək haqqı və avans", type: "expense" },
      { id: "cat_exp_rent", name: "İcarə haqqı", type: "expense" },
      { id: "cat_exp_supplies", name: "Məhsul və xammal alışı", type: "expense" },
      { id: "cat_exp_utilities", name: "Kommunal və internet", type: "expense" },
      { id: "cat_exp_marketing", name: "Marketinq və reklam", type: "expense" },
      { id: "cat_exp_tax", name: "Vergilər və bank faizi", type: "expense" },
      { id: "cat_exp_other", name: "Təsərrüfat xərcləri", type: "expense" },
    ],
    transactions: [
      transaction("tx_101", 0, "income", "acc_pos", "cat_inc_service", 65, "Saç kəsimi və rənglənmə", "Nərmin Qasımova", "POS terminal ilə ödəniş"),
      transaction("tx_102", 0, "income", "acc_cash", "cat_inc_service", 35, "Manikür xidməti", "Aytən Məmmədova", "Nağd ödəniş"),
      transaction("tx_103", 0, "expense", "acc_cash", "cat_exp_supplies", 45, "Dezinfeksiya və birdəfəlik vasitələr", "MedBeauty MMC"),
      transaction("tx_104", 0, "income", "acc_pos", "cat_inc_product", 72, "Şampun və keratin maskası satışı", "Səbinə Rəhimova"),
      transaction("tx_105", 1, "transfer", "acc_cash", "", 100, "Nağd vəsaitin seyfə köçürülməsi", "Kassa inkassasiyası", "", "acc_safe"),
      transaction("tx_106", 1, "expense", "acc_bank", "cat_exp_utilities", 110, "İnternet və rabitə ödənişi", "CityNet"),
      transaction("tx_107", 1, "expense", "acc_cash", "cat_exp_salary", 150, "Avans ödənişi", "Aysel Məmmədova"),
      transaction("tx_108", 2, "income", "acc_bank", "cat_inc_gift", 100, "Hədiyyə sertifikatı satışı", "Fərid Əliyev"),
    ],
    shifts: [{ id: "shift_104", accountId: "acc_cash", openedAt: new Date().toISOString(), openingCash: 250, closedAt: "", closingCash: 0, note: "Səhər növbəsi" }],
    payroll: [
      { id: "pay_1", staffId: "st_1", period: dateOffset(0).slice(0, 7), amount: 1182, note: "Xidmət və məhsul komissiyası", serviceTurnover: 2850, serviceRate: 40, productSales: 420, productRate: 10 },
      { id: "pay_2", staffId: "st_2", period: dateOffset(0).slice(0, 7), amount: 891, note: "Xidmət və məhsul komissiyası", serviceTurnover: 2150, serviceRate: 40, productSales: 310, productRate: 10 },
      { id: "pay_3", staffId: "st_3", period: dateOffset(0).slice(0, 7), amount: 906, note: "Xidmət və məhsul komissiyası", serviceTurnover: 1980, serviceRate: 45, productSales: 150, productRate: 10 },
      { id: "pay_4", staffId: "st_4", period: dateOffset(0).slice(0, 7), amount: 828, note: "Xidmət və məhsul komissiyası", serviceTurnover: 1640, serviceRate: 50, productSales: 80, productRate: 10 },
    ],
  };
}
