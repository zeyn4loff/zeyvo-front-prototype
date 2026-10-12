// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {
    /* =========================================================================
       FINANCE & CASH REGISTER MODULE (MALİYYƏ & KASSA)
       ========================================================================= */

    financeActiveTab: 'accounts',
    financeTxSearch: '',
    financeTxFilterType: 'all',
    financeTxFilterAcc: 'all',
    financeTxFilterCat: 'all',
    financeTxFilterPeriod: 'all',
    financeTxPage: 1,
    financeTxPageSize: 10,
    financePayrollSearch: '',
    financePayrollFilterRole: 'all',
    financePayrollPage: 1,
    financePayrollPageSize: 10,
    financeEditingTxId: null,
    financeEditingAccId: null,
    financeEditingCatId: null,
    financeSelectedPayrollStaffId: null,
    collapsedFinanceCatGroups: { expense: false, income: false },
    expandedFinanceCategoryItems: {},

    getFinanceData: function() {
        const key = this.storageKey('zeyvo_finance_data_v1');
        const raw = localStorage.getItem(key);
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (parsed && Array.isArray(parsed.accounts) && Array.isArray(parsed.transactions)) {
                    return parsed;
                }
            } catch (e) {
                console.error('Error parsing finance data:', e);
            }
        }

        // Initialize default finance data
        const defaultData = {
            accounts: [
                {
                    id: 'acc_cash',
                    name: 'Əsas nağd kassa',
                    type: 'cash',
                    balance: 1420.00,
                    currency: '₼',
                    isDefault: true,
                    details: 'Salonun əsas nağd pul yeşiyi'
                },
                {
                    id: 'acc_pos',
                    name: 'Kapital Bank POS',
                    type: 'pos',
                    balance: 2980.50,
                    currency: '₼',
                    isDefault: false,
                    details: 'Terminal ID: 782190'
                },
                {
                    id: 'acc_bank',
                    name: 'ABB Cari Hesab',
                    type: 'bank',
                    balance: 2140.00,
                    currency: '₼',
                    isDefault: false,
                    details: 'AZ21ABBB38019440023412'
                },
                {
                    id: 'acc_safe',
                    name: 'Daxili Seyf',
                    type: 'safe',
                    balance: 300.00,
                    currency: '₼',
                    isDefault: false,
                    details: 'Ehtiyat nağd vəsait seyfi'
                }
            ],
            shift: {
                id: 'shift_104',
                number: 104,
                cashier: 'Leyla Əliyeva',
                status: 'open',
                openedAt: '2026-10-05 09:00',
                closedAt: null,
                openingCash: 250.00,
                cashTurnover: 1170.00,
                cardTurnover: 1810.50,
                totalTurnover: 2980.50,
                notes: 'Səhər növbəsi uğurla açıldı'
            },
            categories: [
                { id: 'cat_inc_service', name: 'Xidmət gəliri', type: 'income', icon: 'scissors', count: 18, total: 2450.00 },
                { id: 'cat_inc_product', name: 'Məhsul satışı', type: 'income', icon: 'bag', count: 7, total: 530.50 },
                { id: 'cat_inc_gift', name: 'Hədiyyə kartı və depozit', type: 'income', icon: 'card', count: 3, total: 280.00 },
                { id: 'cat_inc_other', name: 'Digər gəlirlər', type: 'income', icon: 'trend-up', count: 1, total: 100.00 },
                { id: 'cat_exp_salary', name: 'Əmək haqqı və avans', type: 'expense', icon: 'users', count: 4, total: 1200.00 },
                { id: 'cat_exp_rent', name: 'İcarə haqqı', type: 'expense', icon: 'building', count: 1, total: 1500.00 },
                { id: 'cat_exp_supplies', name: 'Məhsul və xammal alışı', type: 'expense', icon: 'box', count: 3, total: 640.00 },
                { id: 'cat_exp_utilities', name: 'Kommunal və internet', type: 'expense', icon: 'bolt', count: 2, total: 180.00 },
                { id: 'cat_exp_marketing', name: 'Marketinq və reklam', type: 'expense', icon: 'speaker', count: 2, total: 350.00 },
                { id: 'cat_exp_tax', name: 'Vergilər və bank faizi', type: 'expense', icon: 'receipt', count: 1, total: 125.00 },
                { id: 'cat_exp_other', name: 'Təsərrüfat xərcləri', type: 'expense', icon: 'dots', count: 3, total: 85.00 }
            ],
            transactions: [
                {
                    id: 'tx_101',
                    date: '2026-10-05',
                    time: '14:30',
                    type: 'income',
                    accountId: 'acc_pos',
                    categoryId: 'cat_inc_service',
                    amount: 65.00,
                    title: 'Saç kəsimi və rənglənmə',
                    counterparty: 'Nərmin Qasımova',
                    note: 'POS Terminal ilə ödəniş'
                },
                {
                    id: 'tx_102',
                    date: '2026-10-05',
                    time: '13:15',
                    type: 'income',
                    accountId: 'acc_cash',
                    categoryId: 'cat_inc_service',
                    amount: 35.00,
                    title: 'Manikür xidməti',
                    counterparty: 'Aytən Məmmədova',
                    note: 'Nağd ödəniş'
                },
                {
                    id: 'tx_103',
                    date: '2026-10-05',
                    time: '12:00',
                    type: 'expense',
                    accountId: 'acc_cash',
                    categoryId: 'cat_exp_supplies',
                    amount: 45.00,
                    title: 'Dezinfeksiya və birdəfəlik vasitələr',
                    counterparty: 'MedBeauty MMC',
                    note: 'Təcili çatdırılma xərci'
                },
                {
                    id: 'tx_104',
                    date: '2026-10-05',
                    time: '11:20',
                    type: 'income',
                    accountId: 'acc_pos',
                    categoryId: 'cat_inc_product',
                    amount: 72.00,
                    title: 'Şampun və keratin maskası satışı',
                    counterparty: 'Səbinə Rəhimova',
                    note: 'Məhsul kassa satışı'
                },
                {
                    id: 'tx_105',
                    date: '2026-10-04',
                    time: '18:40',
                    type: 'transfer',
                    accountId: 'acc_cash',
                    toAccountId: 'acc_safe',
                    categoryId: '',
                    amount: 400.00,
                    title: 'Nağd vəsaitin daxili seyfə köçürülməsi',
                    counterparty: 'Kassa inkassasiyası',
                    note: 'Günün sonunda təhlükəsizlik seyfinə qoyuldu'
                },
                {
                    id: 'tx_106',
                    date: '2026-10-04',
                    time: '16:00',
                    type: 'expense',
                    accountId: 'acc_bank',
                    categoryId: 'cat_exp_utilities',
                    amount: 110.00,
                    title: 'Optik internet və rabitə ödənişi',
                    counterparty: 'CityNet Provayder',
                    note: 'Bank köçürməsi ilə'
                },
                {
                    id: 'tx_107',
                    date: '2026-10-04',
                    time: '14:20',
                    type: 'expense',
                    accountId: 'acc_cash',
                    categoryId: 'cat_exp_salary',
                    amount: 150.00,
                    title: 'Avans ödənişi (Aysel Məmmədova)',
                    counterparty: 'Aysel Məmmədova',
                    note: 'Növbədənkənar avans ödənişi'
                },
                {
                    id: 'tx_108',
                    date: '2026-10-03',
                    time: '15:10',
                    type: 'income',
                    accountId: 'acc_bank',
                    categoryId: 'cat_inc_gift',
                    amount: 100.00,
                    title: 'Hədiyyə sertifikatı satışı (Gold)',
                    counterparty: 'Fərid Əliyev',
                    note: 'Onlayn bank ödənişi'
                }
            ],
            payroll: [
                {
                    staffId: '1',
                    staffName: 'Aysel Məmmədova',
                    role: 'Aparıcı Stalist',
                    serviceTurnover: 2850.00,
                    serviceRate: 40,
                    productSales: 420.00,
                    productRate: 10,
                    totalEarned: 1182.00,
                    paidAdvance: 350.00,
                    balanceDue: 832.00
                },
                {
                    staffId: '2',
                    staffName: 'Günel Əliyeva',
                    role: 'Kolorist / Vizajist',
                    serviceTurnover: 2150.00,
                    serviceRate: 40,
                    productSales: 310.00,
                    productRate: 10,
                    totalEarned: 891.00,
                    paidAdvance: 200.00,
                    balanceDue: 691.00
                },
                {
                    staffId: '3',
                    staffName: 'Rəşad Kərimov',
                    role: 'Barber Stalist',
                    serviceTurnover: 1980.00,
                    serviceRate: 45,
                    productSales: 150.00,
                    productRate: 10,
                    totalEarned: 906.00,
                    paidAdvance: 250.00,
                    balanceDue: 656.00
                },
                {
                    staffId: '4',
                    staffName: 'Leyla Nəsirova',
                    role: 'Dırnaq Ustası (Nail)',
                    serviceTurnover: 1640.00,
                    serviceRate: 50,
                    productSales: 80.00,
                    productRate: 10,
                    totalEarned: 828.00,
                    paidAdvance: 150.00,
                    balanceDue: 678.00
                }
            ]
        };

        if (key !== 'zeyvo_finance_data_v1') {
            defaultData.accounts.forEach(account => { account.balance = 0; });
            defaultData.transactions = [];
            defaultData.payroll = [];
            defaultData.categories.forEach(category => { category.count = 0; category.total = 0; });
            if (defaultData.shift) {
                defaultData.shift.status = 'closed';
                defaultData.shift.cashTurnover = 0;
                defaultData.shift.cardTurnover = 0;
                defaultData.shift.totalTurnover = 0;
            }
        }
        this.saveFinanceData(defaultData);
        return defaultData;
    },

    saveFinanceData: function(data) {
        localStorage.setItem(this.storageKey('zeyvo_finance_data_v1'), JSON.stringify(data));
    },

    refreshFinanceCanvas: function() {
        const body = document.getElementById('bizCanvasBody');
        if (body) {
            body.innerHTML = this.renderActiveTabContent();
        }
        // Also refresh top canvas header if needed
        const header = document.querySelector('main > header');
        if (header && typeof this.renderCanvasHeader === 'function') {
            header.outerHTML = this.renderCanvasHeader();
        }
    },

    /* =========================================================================
       FINANCE MAIN CONTAINER
       ========================================================================= */

    renderFinanceModule: function() {
        const data = this.getFinanceData();
        const sub = this.financeActiveTab || 'accounts';

        const subTabs = [
            { id: 'accounts', label: 'Kassalar və Növbə', badge: (data.accounts || []).length },
            { id: 'transactions', label: 'Əməliyyatlar (Gəlir & Xərc)', badge: (data.transactions || []).length },
            { id: 'payroll', label: 'Maaş və Komissiya', badge: (data.payroll || []).length },
            { id: 'categories', label: 'Xərc kateqoriyaları', badge: (data.categories || []).length }
        ];

        let contentHtml = '';
        if (sub === 'transactions') {
            contentHtml = this.renderFinanceTransactionsSubTab(data);
        } else if (sub === 'payroll') {
            contentHtml = this.renderFinancePayrollSubTab(data);
        } else if (sub === 'categories') {
            contentHtml = this.renderFinanceCategoriesSubTab(data);
        } else {
            contentHtml = this.renderFinanceAccountsSubTab(data);
        }

        return `
            <div class="max-w-7xl mx-auto px-4 py-5 sm:px-7 sm:py-7 space-y-6">
                <!-- SUB-TABS NAVIGATION (Unified Segmented Control) -->
                <div>
                    ${this.renderSegmentedTabs({
                        tabs: subTabs,
                        activeId: sub,
                        onSelect: 'BusinessDashboardView.switchFinanceSubTab'
                    })}
                </div>

                <!-- SUB-TAB CONTENT -->
                <div id="bizFinanceSubContent">
                    ${contentHtml}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 1: KASSALAR VƏ NÖVBƏ (ACCOUNTS & SHIFT)
       ========================================================================= */

    renderFinanceAccountsSubTab: function(data) {
        const accounts = data.accounts || [];
        const shift = data.shift || {};
        const transactions = data.transactions || [];

        // Calculate KPI totals
        const totalBalance = accounts.reduce((acc, a) => acc + (Number(a.balance) || 0), 0);
        
        // Today calculations
        const todayStr = new Date().toISOString().slice(0, 10);
        const todayTxs = transactions.filter(t => t.date === todayStr || t.date === '2026-10-05');
        const todayIncome = todayTxs.filter(t => t.type === 'income').reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
        const todayExpense = todayTxs.filter(t => t.type === 'expense').reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
        const activeShiftCash = shift.status === 'open' ? (Number(shift.openingCash || 0) + Number(shift.cashTurnover || 0)) : 0;

        const isShiftOpen = shift.status === 'open';

        return `
            <div class="space-y-6">
                <!-- 1. KPI CARDS -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Ümumi qalıq</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl font-black text-slate-900 mt-2 font-mono">${totalBalance.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼</div>
                        <p class="text-[11px] text-slate-400 mt-1 font-medium">Bütün kassa və bank hesabları</p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Bugünkü mədaxil (Gəlir)</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl font-black text-emerald-600 mt-2 font-mono">+ ${todayIncome.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼</div>
                        <p class="text-[11px] text-slate-400 mt-1 font-medium">Xidmətlər və satışlardan</p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Bugünkü məxaric (Xərc)</span>
                            <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7l-7 7-7-7"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl font-black text-rose-600 mt-2 font-mono">- ${todayExpense.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼</div>
                        <p class="text-[11px] text-slate-400 mt-1 font-medium">Avans və xammal ödənişləri</p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Aktiv növbə kassası</span>
                            <div class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl font-black text-slate-900 mt-2 font-mono">${activeShiftCash.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼</div>
                        <p class="text-[11px] text-slate-400 mt-1 font-medium">${isShiftOpen ? 'Növbə #' + shift.number + ' açıqdır' : 'Növbə bağlıdır'}</p>
                    </div>
                </div>

                <!-- 2. ACTIVE SHIFT BANNER / CARD -->
                <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                    <div class="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="flex items-start sm:items-center gap-3.5">
                            <div class="w-11 h-11 rounded-2xl ${isShiftOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'} flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <h3 class="text-base font-bold text-slate-900">Kassa Növbəsi</h3>
                                    ${isShiftOpen ? `
                                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <span>Növbə #${shift.number} açıqdır</span>
                                        </span>
                                    ` : `
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                                            Növbə bağlıdır
                                        </span>
                                    `}
                                </div>
                                <p class="text-xs text-slate-500 mt-0.5">
                                    ${isShiftOpen ? `Açılış vaxtı: ${shift.openedAt} • Kassir: ${shift.cashier}` : 'Gündəlik kassa əməliyyatlarına başlamaq üçün yeni növbə açın'}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 w-full sm:w-auto">
                            <button type="button" onclick="BusinessDashboardView.openPosModal()" class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95" title="Sürətli pərakəndə satış">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                                <span>Kassa satışı (POS)</span>
                            </button>
                            ${isShiftOpen ? `
                                <button type="button" onclick="BusinessDashboardView.openFinanceShiftModal('close')" class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition border border-rose-200/60 flex items-center justify-center gap-2 cursor-pointer">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                    <span>Növbəni bağla</span>
                                </button>
                            ` : `
                                <button type="button" onclick="BusinessDashboardView.openFinanceShiftModal('open')" class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                    <span>Növbə aç</span>
                                </button>
                            `}
                        </div>
                    </div>

                    ${isShiftOpen ? `
                        <div class="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/50">
                            <div class="p-4 sm:p-5">
                                <span class="text-[11px] font-semibold text-slate-400 block">İlkin nağd qalıq</span>
                                <span class="text-base font-bold text-slate-800 font-mono mt-1 block">${(Number(shift.openingCash) || 0).toFixed(2)} ₼</span>
                            </div>
                            <div class="p-4 sm:p-5">
                                <span class="text-[11px] font-semibold text-slate-400 block">Nağd dövriyyə</span>
                                <span class="text-base font-bold text-emerald-600 font-mono mt-1 block">+ ${(Number(shift.cashTurnover) || 0).toFixed(2)} ₼</span>
                            </div>
                            <div class="p-4 sm:p-5">
                                <span class="text-[11px] font-semibold text-slate-400 block">POS Terminal (Kart)</span>
                                <span class="text-base font-bold text-indigo-600 font-mono mt-1 block">+ ${(Number(shift.cardTurnover) || 0).toFixed(2)} ₼</span>
                            </div>
                            <div class="p-4 sm:p-5">
                                <span class="text-[11px] font-semibold text-slate-400 block">Cəmi növbə dövriyyəsi</span>
                                <span class="text-base font-bold text-slate-900 font-mono mt-1 block">${(Number(shift.totalTurnover) || 0).toFixed(2)} ₼</span>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- 3. ACCOUNTS GRID -->
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h3 class="text-base font-bold text-slate-900">Hesablar və Kassalar</h3>
                            <p class="text-xs text-slate-400">Nağd kassalar, POS terminallar və bank hesabları</p>
                        </div>
                        <button type="button" onclick="BusinessDashboardView.openFinanceAccountModal()" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                            <span>Hesab əlavə et</span>
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        ${accounts.map(acc => {
                            let typeBadge = '';
                            let iconSvg = '';
                            if (acc.type === 'cash') {
                                typeBadge = '<span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700">Nağd kassa</span>';
                                iconSvg = '<svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>';
                            } else if (acc.type === 'pos') {
                                typeBadge = '<span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 text-indigo-700">POS Terminal</span>';
                                iconSvg = '<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M7 15h.01M11 15h2"/></svg>';
                            } else if (acc.type === 'bank') {
                                typeBadge = '<span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-50 text-sky-700">Bank hesabı</span>';
                                iconSvg = '<svg class="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3l9 7H3l9-7z"/></svg>';
                            } else {
                                typeBadge = '<span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-700">Daxili seyf</span>';
                                iconSvg = '<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
                            }

                            return `
                                <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition group">
                                    <div>
                                        <div class="flex items-center justify-between mb-3">
                                            <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-105 transition">
                                                ${iconSvg}
                                            </div>
                                            <div class="flex items-center gap-1.5">
                                                ${acc.isDefault ? '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFDD2D]/40 text-slate-800">Əsas</span>' : ''}
                                                ${typeBadge}
                                            </div>
                                        </div>

                                        <h4 class="text-sm font-bold text-slate-900 truncate" title="${acc.name}">${acc.name}</h4>
                                        <p class="text-[11px] text-slate-400 mt-0.5 truncate">${acc.details || 'Aktiv hesab'}</p>

                                        <div class="text-2xl font-black text-slate-900 mt-4 font-mono">
                                            ${(Number(acc.balance) || 0).toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
                                        <button type="button" onclick="BusinessDashboardView.openFinanceTransferModal('${acc.id}')" class="text-slate-600 hover:text-slate-900 font-semibold transition cursor-pointer flex items-center gap-1">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                                            <span>Köçürmə</span>
                                        </button>
                                        <div class="flex items-center gap-1">
                                            <button type="button" onclick="BusinessDashboardView.openFinanceAccountModal('${acc.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                                            </button>
                                            ${!acc.isDefault ? `
                                                <button type="button" onclick="BusinessDashboardView.deleteFinanceAccount('${acc.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sil">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 2: ƏMƏLİYYATLAR (TRANSACTIONS LEDGER)
       ========================================================================= */

    renderFinanceTransactionsSubTab: function(data) {
        let transactions = [...(data.transactions || [])];
        const accounts = data.accounts || [];
        const categories = data.categories || [];

        // Sorting by date & time descending
        transactions.sort((a, b) => {
            const timeA = new Date(`${a.date} ${a.time || '00:00'}`).getTime();
            const timeB = new Date(`${b.date} ${b.time || '00:00'}`).getTime();
            return timeB - timeA;
        });

        // Filter by search query
        const q = (this.financeTxSearch || '').trim().toLowerCase();
        if (q) {
            transactions = transactions.filter(t => 
                (t.title && t.title.toLowerCase().includes(q)) ||
                (t.counterparty && t.counterparty.toLowerCase().includes(q)) ||
                (t.note && t.note.toLowerCase().includes(q))
            );
        }

        // Filter by Type
        if (this.financeTxFilterType && this.financeTxFilterType !== 'all') {
            transactions = transactions.filter(t => t.type === this.financeTxFilterType);
        }

        // Filter by Account
        if (this.financeTxFilterAcc && this.financeTxFilterAcc !== 'all') {
            transactions = transactions.filter(t => t.accountId === this.financeTxFilterAcc || t.toAccountId === this.financeTxFilterAcc);
        }

        // Filter by Category
        if (this.financeTxFilterCat && this.financeTxFilterCat !== 'all') {
            transactions = transactions.filter(t => t.categoryId === this.financeTxFilterCat);
        }

        // Active filter counter
        let activeTxFilterCount = 0;
        if (this.financeTxFilterType && this.financeTxFilterType !== 'all') activeTxFilterCount++;
        if (this.financeTxFilterAcc && this.financeTxFilterAcc !== 'all') activeTxFilterCount++;
        if (this.financeTxFilterCat && this.financeTxFilterCat !== 'all') activeTxFilterCount++;

        // Pagination
        const totalItems = transactions.length;
        const pageSize = this.financeTxPageSize || 10;
        const currentPage = Math.min(this.financeTxPage || 1, Math.max(1, Math.ceil(totalItems / pageSize)));
        const startIndex = (currentPage - 1) * pageSize;
        const pageItems = transactions.slice(startIndex, startIndex + pageSize);

        // Account & Category map lookups
        const accMap = {};
        accounts.forEach(a => { accMap[a.id] = a.name; });
        const catMap = {};
        categories.forEach(c => { catMap[c.id] = c.name; });

        return `
            <div class="space-y-4">
                <!-- 2. FILTER & SEARCH TOOLBAR (Loyalty module style) -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <!-- Search Input -->
                        <div class="relative flex-1">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input 
                                type="text" 
                                id="bizFinanceTxSearchInput"
                                value="${this.escapeHtml(this.financeTxSearch || '')}" 
                                oninput="BusinessDashboardView.setFinanceTxSearch(this.value)" 
                                placeholder="Əməliyyat, təsvir və ya kontragent axtar..." 
                                class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs"
                            />
                            ${this.financeTxSearch ? `
                                <button type="button" onclick="BusinessDashboardView.clearFinanceTxSearch()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer" title="Təmizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            ` : ''}
                        </div>

                        <!-- Filter Modal Trigger Button -->
                        <button type="button" onclick="BusinessDashboardView.openFinanceTxFilterModal()" class="h-11 px-4 rounded-2xl bg-white border ${activeTxFilterCount > 0 ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 bg-amber-50/20' : 'border-slate-200/80 hover:border-slate-300'} text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0">
                            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                            <span class="hidden sm:inline">Filtrlər</span>
                            ${activeTxFilterCount > 0 ? `
                                <span class="w-5 h-5 rounded-full bg-[#101114] text-white text-[10px] font-bold flex items-center justify-center -mr-1">
                                    ${activeTxFilterCount}
                                </span>
                            ` : ''}
                        </button>

                        <!-- Export Button -->
                        <button type="button" onclick="BusinessDashboardView.openFinanceExportEmailModal()" class="h-11 px-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0" title="Hesabatı e-poçtla göndər / eksport et">
                            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                            <span class="hidden sm:inline">Eksport</span>
                        </button>
                    </div>

                    <!-- Active Filter Pills (Loyalty style) -->
                    ${(activeTxFilterCount > 0 || this.financeTxSearch) ? `
                        <div class="flex items-center gap-2 flex-wrap pt-1 text-xs">
                            <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                            ${this.financeTxFilterType && this.financeTxFilterType !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Növ: ${this.financeTxFilterType === 'income' ? 'Gəlirlər' : (this.financeTxFilterType === 'expense' ? 'Xərclər' : 'Köçürmələr')}</span>
                                    <button type="button" onclick="BusinessDashboardView.setFinanceTxType('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${this.financeTxFilterAcc && this.financeTxFilterAcc !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/70 font-semibold text-[11px]">
                                    <span>Hesab: ${this.escapeHtml(accMap[this.financeTxFilterAcc] || 'Hesab')}</span>
                                    <button type="button" onclick="BusinessDashboardView.setFinanceTxAccount('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${this.financeTxFilterCat && this.financeTxFilterCat !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 text-purple-900 border border-purple-200/70 font-semibold text-[11px]">
                                    <span>Kateqoriya: ${this.escapeHtml(catMap[this.financeTxFilterCat] || 'Kateqoriya')}</span>
                                    <button type="button" onclick="BusinessDashboardView.setFinanceTxCategory('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${this.financeTxSearch ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-[11px]">
                                    <span>Axtarış: "${this.escapeHtml(this.financeTxSearch)}"</span>
                                    <button type="button" onclick="BusinessDashboardView.clearFinanceTxSearch()" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            <button type="button" onclick="BusinessDashboardView.resetAllFinanceTxFilters()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer ml-1">
                                Hamısını sıfırla
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- TRANSACTIONS TABLE -->
                <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500">
                                    <th class="py-3 px-4 sm:px-6">Tarix və vaxt</th>
                                    <th class="py-3 px-4 sm:px-6">Əməliyyat / Təyinat</th>
                                    <th class="py-3 px-4 sm:px-6">Kateqoriya</th>
                                    <th class="py-3 px-4 sm:px-6">Hesab</th>
                                    <th class="py-3 px-4 sm:px-6">Məbləğ</th>
                                    <th class="py-3 px-4 sm:px-6 text-right">Əməliyyatlar</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-xs">
                                ${pageItems.length > 0 ? pageItems.map(tx => {
                                    let typeBadge = '';
                                    let amountFormatted = '';
                                    if (tx.type === 'income') {
                                        typeBadge = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>';
                                        amountFormatted = `<span class="font-mono font-bold text-emerald-600">+ ${(Number(tx.amount) || 0).toFixed(2)} ₼</span>`;
                                    } else if (tx.type === 'expense') {
                                        typeBadge = '<span class="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>';
                                        amountFormatted = `<span class="font-mono font-bold text-rose-600">- ${(Number(tx.amount) || 0).toFixed(2)} ₼</span>`;
                                    } else {
                                        typeBadge = '<span class="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block"></span>';
                                        amountFormatted = `<span class="font-mono font-bold text-indigo-600">${(Number(tx.amount) || 0).toFixed(2)} ₼</span>`;
                                    }

                                    const accName = accMap[tx.accountId] || 'Hesab';
                                    const targetAccName = tx.toAccountId ? (accMap[tx.toAccountId] || 'Hesab') : '';
                                    const catName = catMap[tx.categoryId] || (tx.type === 'transfer' ? 'Daxili köçürmə' : 'Digər');

                                    return `
                                        <tr class="hover:bg-slate-50/70 transition">
                                            <td class="py-3.5 px-4 sm:px-6 text-slate-500 whitespace-nowrap">
                                                <div class="font-semibold text-slate-700">${tx.date}</div>
                                                <div class="text-[11px] text-slate-400 font-mono">${tx.time || ''}</div>
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-6 min-w-[200px]">
                                                <div class="flex items-center gap-2">
                                                    ${typeBadge}
                                                    <span class="font-bold text-slate-900">${tx.title}</span>
                                                </div>
                                                ${tx.counterparty ? `<div class="text-[11px] text-slate-400 mt-0.5">${tx.counterparty}</div>` : ''}
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                                                <span class="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700">${catName}</span>
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-6 whitespace-nowrap text-slate-600 font-medium">
                                                ${tx.type === 'transfer' ? `${accName} → ${targetAccName}` : accName}
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                                                ${amountFormatted}
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                                                <div class="flex items-center justify-end gap-1">
                                                    <button type="button" onclick="BusinessDashboardView.openFinanceTransactionModal('${tx.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.deleteFinanceTransaction('${tx.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sil">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('') : `
                                    <tr>
                                        <td colspan="6" class="py-12 px-4 text-center">
                                            <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                            </div>
                                            <div class="text-sm font-bold text-slate-800">Heç bir əməliyyat tapılmadı</div>
                                            <div class="text-xs text-slate-400 mt-1">Axtarış və ya filter parametrlərini dəyişin</div>
                                        </td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    ${this.renderTablePagination({
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        onPageChange: 'BusinessDashboardView.setFinanceTxPage',
                        onPageSizeChange: 'BusinessDashboardView.setFinanceTxPageSize',
                        itemName: 'əməliyyat'
                    })}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 3: MAAŞ VƏ KOMİSSİYA (PAYROLL)
       ========================================================================= */

    renderFinancePayrollSubTab: function(data) {
        let payrollList = [...(data.payroll || [])];

        // Search query
        const q = (this.financePayrollSearch || '').trim().toLowerCase();
        if (q) {
            payrollList = payrollList.filter(p => 
                (p.staffName && p.staffName.toLowerCase().includes(q)) ||
                (p.role && p.role.toLowerCase().includes(q))
            );
        }

        // Summary calculations
        const totalTurnover = payrollList.reduce((acc, p) => acc + (Number(p.serviceTurnover) || 0) + (Number(p.productSales) || 0), 0);
        const totalEarned = payrollList.reduce((acc, p) => acc + (Number(p.totalEarned) || 0), 0);
        const totalPaid = payrollList.reduce((acc, p) => acc + (Number(p.paidAdvance) || 0), 0);
        const totalDue = payrollList.reduce((acc, p) => acc + (Number(p.balanceDue) || 0), 0);

        // Pagination
        const totalItems = payrollList.length;
        const pageSize = this.financePayrollPageSize || 10;
        const currentPage = Math.min(this.financePayrollPage || 1, Math.max(1, Math.ceil(totalItems / pageSize)));
        const startIndex = (currentPage - 1) * pageSize;
        const pageItems = payrollList.slice(startIndex, startIndex + pageSize);

        return `
            <div class="space-y-6">
                <!-- 1. PAYROLL STATS -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Cəmi ustaların dövriyyəsi</span>
                            <div class="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl font-black text-slate-900 mt-2 font-mono">${totalTurnover.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼</div>
                        <p class="text-[11px] text-slate-400 mt-1 font-medium">Xidmətlər və məhsul satışları</p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Hesablanmış komissiya</span>
                            <div class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl font-black text-indigo-600 mt-2 font-mono">${totalEarned.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼</div>
                        <p class="text-[11px] text-slate-400 mt-1 font-medium">Ustaların ümumi qazancı</p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Ödənilmiş avanslar</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl font-black text-amber-600 mt-2 font-mono">${totalPaid.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼</div>
                        <p class="text-[11px] text-slate-400 mt-1 font-medium">Kassadan verilən məbləğlər</p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Qalıq ödəniləcək</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl font-black text-slate-900 mt-2 font-mono">${totalDue.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼</div>
                        <p class="text-[11px] text-slate-400 mt-1 font-medium">Ustaların xalis borcu</p>
                    </div>
                </div>

                <!-- 2. SEARCH & ACTIONS BAR -->
                <div class="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div class="relative flex-1">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </span>
                        <input 
                            type="text" 
                            value="${this.financePayrollSearch || ''}" 
                            oninput="BusinessDashboardView.setFinancePayrollSearch(this.value)" 
                            placeholder="Usta adı və ya ixtisas üzrə axtarış..." 
                            class="w-full h-11 pl-10 pr-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] transition outline-none text-slate-900 placeholder-slate-400 font-medium"
                        />
                    </div>
                    <button type="button" onclick="BusinessDashboardView.openFinancePayrollModal()" class="h-11 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Maaş / Avans ödə</span>
                    </button>
                </div>

                <!-- 3. PAYROLL TABLE -->
                <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500">
                                    <th class="py-3 px-4 sm:px-6">Əməkdaş</th>
                                    <th class="py-3 px-4 sm:px-6">Xidmət dövriyyəsi</th>
                                    <th class="py-3 px-4 sm:px-6">Xidmət komissiyası</th>
                                    <th class="py-3 px-4 sm:px-6">Məhsul satışı</th>
                                    <th class="py-3 px-4 sm:px-6">Cəmi qazanılan</th>
                                    <th class="py-3 px-4 sm:px-6">Ödənilmiş avans</th>
                                    <th class="py-3 px-4 sm:px-6">Qalıq ödəniləcək</th>
                                    <th class="py-3 px-4 sm:px-6 text-right">Əməliyyat</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-xs">
                                ${pageItems.length > 0 ? pageItems.map(p => `
                                    <tr class="hover:bg-slate-50/70 transition">
                                        <td class="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                                            <div class="flex items-center gap-3">
                                                <div class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                                                    ${p.staffName.charAt(0)}
                                                </div>
                                                <div>
                                                    <div class="font-bold text-slate-900">${p.staffName}</div>
                                                    <div class="text-[11px] text-slate-400">${p.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-3.5 px-4 sm:px-6 whitespace-nowrap font-mono font-medium text-slate-700">
                                            ${(Number(p.serviceTurnover) || 0).toFixed(2)} ₼
                                        </td>
                                        <td class="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                                            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">${p.serviceRate}%</span>
                                        </td>
                                        <td class="py-3.5 px-4 sm:px-6 whitespace-nowrap font-mono text-slate-500">
                                            ${(Number(p.productSales) || 0).toFixed(2)} ₼ (${p.productRate}%)
                                        </td>
                                        <td class="py-3.5 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-indigo-600">
                                            ${(Number(p.totalEarned) || 0).toFixed(2)} ₼
                                        </td>
                                        <td class="py-3.5 px-4 sm:px-6 whitespace-nowrap font-mono text-amber-600">
                                            ${(Number(p.paidAdvance) || 0).toFixed(2)} ₼
                                        </td>
                                        <td class="py-3.5 px-4 sm:px-6 whitespace-nowrap font-mono font-black text-slate-900">
                                            ${(Number(p.balanceDue) || 0).toFixed(2)} ₼
                                        </td>
                                        <td class="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                                            <button type="button" onclick="BusinessDashboardView.openFinancePayrollModal('${p.staffId}')" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#FFDD2D] text-slate-800 hover:text-black font-bold text-xs transition cursor-pointer">
                                                Ödəniş et
                                            </button>
                                        </td>
                                    </tr>
                                `).join('') : `
                                    <tr>
                                        <td colspan="8" class="py-12 px-4 text-center">
                                            <div class="text-sm font-bold text-slate-800">Heç bir usta tapılmadı</div>
                                        </td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    ${this.renderTablePagination({
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        onPageChange: 'BusinessDashboardView.setFinancePayrollPage',
                        onPageSizeChange: 'BusinessDashboardView.setFinancePayrollPageSize',
                        itemName: 'əməkdaş'
                    })}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 4: XƏRC VƏ GƏLİR KATEQORİYALARI (CATEGORIES)
       ========================================================================= */

    renderFinanceCategoriesSubTab: function(data) {
        const categories = data.categories || [];
        const transactions = data.transactions || [];

        // Compute counts and totals dynamically for precision
        categories.forEach(c => {
            const txs = transactions.filter(t => t.categoryId === c.id);
            c.count = txs.length;
            c.total = txs.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        });

        const incomeCats = categories.filter(c => c.type === 'income');
        const expenseCats = categories.filter(c => c.type === 'expense');

        const totalExpense = expenseCats.reduce((sum, c) => sum + (Number(c.total) || 0), 0);
        const totalIncome = incomeCats.reduce((sum, c) => sum + (Number(c.total) || 0), 0);

        const isExpenseCollapsed = !!(this.collapsedFinanceCatGroups && this.collapsedFinanceCatGroups.expense);
        const isIncomeCollapsed = !!(this.collapsedFinanceCatGroups && this.collapsedFinanceCatGroups.income);

        const renderCategoryBranch = (c, type) => {
            const isIncome = type === 'income';
            const catTransactions = transactions.filter(t => t.categoryId === c.id);
            const isItemsExpanded = !!(this.expandedFinanceCategoryItems && this.expandedFinanceCategoryItems[c.id]);

            return `
                <div class="relative group">
                    <!-- Tree branch horizontal connector line -->
                    <div class="absolute -left-[18px] sm:-left-[22px] top-5 sm:top-5.5 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>

                    <div class="rounded-xl bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/80 transition overflow-hidden">
                        <div class="p-3 sm:p-3.5 flex items-center justify-between gap-3 text-xs">
                            <!-- Left: Indicator, chevron, Name & Metrics -->
                            <div class="min-w-0 flex items-center gap-2.5 sm:gap-3">
                                ${catTransactions.length > 0 ? `
                                    <button type="button" onclick="BusinessDashboardView.toggleFinanceCategoryItems('${c.id}')" class="w-5 h-5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition flex items-center justify-center shrink-0 cursor-pointer" title="${isItemsExpanded ? 'Əməliyyatları bağla' : 'Əməliyyatları göstər'}">
                                        <svg class="w-3 h-3 transition-transform duration-200 ${isItemsExpanded ? 'rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                                    </button>
                                ` : `
                                    <div class="w-5 h-5 flex items-center justify-center shrink-0">
                                        <span class="w-2 h-2 rounded-full ${isIncome ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
                                    </div>
                                `}

                                <div class="w-8 h-8 rounded-lg ${isIncome ? 'bg-emerald-100/70 text-emerald-700' : 'bg-rose-100/70 text-rose-700'} flex items-center justify-center shrink-0">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                                </div>

                                <div class="min-w-0">
                                    <div class="flex items-center gap-2 flex-wrap">
                                        <span class="font-bold text-xs text-slate-900">${this.escapeHtml(c.name)}</span>
                                        <span class="text-[11px] text-slate-400 font-normal">• ${c.count || 0} əməliyyat</span>
                                        <span class="text-[11px] font-mono font-bold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}">• ${(Number(c.total) || 0).toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: Category Action Buttons -->
                            <div class="flex items-center gap-1.5 shrink-0">
                                <button type="button" onclick="BusinessDashboardView.viewFinanceCategoryTransactions('${c.id}')" class="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 bg-white transition text-[11px] font-semibold flex items-center gap-1 shadow-2xs cursor-pointer" title="Əməliyyatlar jurnalında filtr et">
                                    <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                    <span class="hidden md:inline">Jurnalda bax</span>
                                </button>
                                <button type="button" onclick="BusinessDashboardView.openFinanceCategoryModal('${c.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition cursor-pointer" title="Kateqoriyanı redaktə et">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                </button>
                                <button type="button" onclick="BusinessDashboardView.deleteFinanceCategory('${c.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition cursor-pointer" title="Kateqoriyanı sil">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Sub-tree: Recent Transactions inside this category (hierarchical 2nd level) -->
                        ${(isItemsExpanded && catTransactions.length > 0) ? `
                            <div class="px-3 pb-3 pt-1 border-t border-slate-200/60 bg-white/70">
                                <div class="relative ml-4 pl-4 border-l-2 border-slate-200 space-y-1.5 pt-2">
                                    ${catTransactions.slice(0, 5).map(tx => `
                                        <div class="relative flex items-center justify-between text-[11px] text-slate-600 py-1">
                                            <div class="absolute -left-[20px] top-1/2 -translate-y-1/2 w-3.5 h-[2px] bg-slate-200"></div>
                                            <div class="flex items-center gap-2 min-w-0">
                                                <span class="w-1.5 h-1.5 rounded-full ${isIncome ? 'bg-emerald-400' : 'bg-rose-400'}"></span>
                                                <span class="font-medium text-slate-900 truncate">${this.escapeHtml(tx.title || 'Əməliyyat')}</span>
                                                ${tx.date ? `<span class="text-slate-400 font-mono text-[10px] truncate">• ${tx.date}</span>` : ''}
                                                ${tx.counterparty ? `<span class="text-slate-400 truncate">• ${this.escapeHtml(tx.counterparty)}</span>` : ''}
                                            </div>
                                            <span class="font-mono font-bold ${isIncome ? 'text-emerald-600' : 'text-rose-600'} shrink-0 ml-2">
                                                ${isIncome ? '+' : '-'} ${(Number(tx.amount) || 0).toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼
                                            </span>
                                        </div>
                                    `).join('')}
                                    ${catTransactions.length > 5 ? `
                                        <div class="relative pt-1 text-[11px]">
                                            <div class="absolute -left-[20px] top-1/2 -translate-y-1/2 w-3.5 h-[2px] bg-slate-200"></div>
                                            <button type="button" onclick="BusinessDashboardView.viewFinanceCategoryTransactions('${c.id}')" class="text-amber-700 hover:text-amber-800 font-semibold cursor-pointer">
                                                Daha ${catTransactions.length - 5} əməliyyata jurnalda bax →
                                            </button>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        };

        return `
            <!-- TREE VIEW (Ağac strukturu - Business module style) -->
            <div class="space-y-4">
                <!-- ROOT 1: XƏRC KATEQORİYALARI -->
                    <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                        <div class="p-4 sm:p-5 hover:bg-slate-50/40 transition space-y-3">
                            <!-- Root Header -->
                            <div class="flex items-center justify-between gap-4">
                                <div class="min-w-0 flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100/80 text-rose-600 flex items-center justify-center shrink-0">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7l-7 7-7-7"/></svg>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                            <button type="button" onclick="BusinessDashboardView.toggleFinanceCategoryGroupCollapse('expense')" class="w-6 h-6 -ml-1 rounded-lg text-slate-400 hover:text-tbank-graphite hover:bg-slate-100 transition flex items-center justify-center shrink-0 cursor-pointer" title="${isExpenseCollapsed ? 'Kateqoriyaları göstər' : 'Kateqoriyaları qatla'}">
                                                <svg class="w-3.5 h-3.5 transition-transform duration-200 ${isExpenseCollapsed ? '-rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            </button>
                                            <h4 onclick="BusinessDashboardView.toggleFinanceCategoryGroupCollapse('expense')" class="font-bold text-sm text-tbank-graphite hover:underline cursor-pointer truncate">
                                                Xərc kateqoriyaları
                                            </h4>
                                            <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-rose-100/70 text-rose-900 border border-rose-200/60">
                                                ${expenseCats.length} kateqoriya
                                            </span>
                                            <span class="text-[11px] font-mono font-bold text-rose-600">
                                                • Cəmi: - ${totalExpense.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼
                                            </span>
                                        </div>
                                        <p class="text-[11px] text-slate-400 font-normal truncate mt-0.5">Xərc maddələri, icarə, əmək haqqı və təsərrüfat təsnifatı</p>
                                    </div>
                                </div>

                                <!-- Right: Quick Add Button -->
                                <div class="flex items-center gap-1.5 shrink-0">
                                    <button type="button" onclick="BusinessDashboardView.openFinanceCategoryModal(null, 'expense')" class="px-3 py-1.5 rounded-xl border border-rose-200/80 hover:border-rose-300 text-rose-700 bg-rose-50/50 hover:bg-rose-100/70 transition text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-2xs" title="Yeni xərc kateqoriyası">
                                        <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                        <span class="hidden sm:inline">Xərc kateqoriyası</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Tree Structure (Budaqlar) -->
                            <div class="${isExpenseCollapsed ? 'hidden ' : ''}pt-1 transition-all">
                                <div class="relative ml-2 sm:ml-3 pl-4 sm:pl-5 border-l-2 border-slate-200/90 space-y-2 my-1">
                                    ${expenseCats.length === 0 ? `
                                        <div class="py-3 text-center text-xs text-slate-400 font-medium">Heç bir xərc kateqoriyası tapılmadı.</div>
                                    ` : expenseCats.map(c => renderCategoryBranch(c, 'expense')).join('')}

                                    <!-- + Əlavə et düyməsi (Ağacın son budağı) -->
                                    <div class="relative pt-0.5">
                                        <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>
                                        <button type="button" onclick="BusinessDashboardView.openFinanceCategoryModal(null, 'expense')" class="w-full py-2.5 px-3 rounded-xl bg-slate-100/90 hover:bg-[#FFDD2D] text-slate-800 hover:text-[#101114] font-medium text-xs transition flex items-center justify-center gap-1.5 active:scale-[0.99] border border-slate-200/80 hover:border-amber-300 shadow-2xs cursor-pointer">
                                            <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                            <span>Yeni xərc kateqoriyası əlavə et</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ROOT 2: GƏLİR KATEQORİYALARI -->
                    <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                        <div class="p-4 sm:p-5 hover:bg-slate-50/40 transition space-y-3">
                            <!-- Root Header -->
                            <div class="flex items-center justify-between gap-4">
                                <div class="min-w-0 flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                            <button type="button" onclick="BusinessDashboardView.toggleFinanceCategoryGroupCollapse('income')" class="w-6 h-6 -ml-1 rounded-lg text-slate-400 hover:text-tbank-graphite hover:bg-slate-100 transition flex items-center justify-center shrink-0 cursor-pointer" title="${isIncomeCollapsed ? 'Kateqoriyaları göstər' : 'Kateqoriyaları qatla'}">
                                                <svg class="w-3.5 h-3.5 transition-transform duration-200 ${isIncomeCollapsed ? '-rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            </button>
                                            <h4 onclick="BusinessDashboardView.toggleFinanceCategoryGroupCollapse('income')" class="font-bold text-sm text-tbank-graphite hover:underline cursor-pointer truncate">
                                                Gəlir kateqoriyaları
                                            </h4>
                                            <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-100/70 text-emerald-900 border border-emerald-200/60">
                                                ${incomeCats.length} kateqoriya
                                            </span>
                                            <span class="text-[11px] font-mono font-bold text-emerald-600">
                                                • Cəmi: + ${totalIncome.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼
                                            </span>
                                        </div>
                                        <p class="text-[11px] text-slate-400 font-normal truncate mt-0.5">Xidmət, satış və digər daxilolma mənbələrinin təsnifatı</p>
                                    </div>
                                </div>

                                <!-- Right: Quick Add Button -->
                                <div class="flex items-center gap-1.5 shrink-0">
                                    <button type="button" onclick="BusinessDashboardView.openFinanceCategoryModal(null, 'income')" class="px-3 py-1.5 rounded-xl border border-emerald-200/80 hover:border-emerald-300 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100/70 transition text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-2xs" title="Yeni gəlir kateqoriyası">
                                        <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                        <span class="hidden sm:inline">Gəlir kateqoriyası</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Tree Structure (Budaqlar) -->
                            <div class="${isIncomeCollapsed ? 'hidden ' : ''}pt-1 transition-all">
                                <div class="relative ml-2 sm:ml-3 pl-4 sm:pl-5 border-l-2 border-slate-200/90 space-y-2 my-1">
                                    ${incomeCats.length === 0 ? `
                                        <div class="py-3 text-center text-xs text-slate-400 font-medium">Heç bir gəlir kateqoriyası tapılmadı.</div>
                                    ` : incomeCats.map(c => renderCategoryBranch(c, 'income')).join('')}

                                    <!-- + Əlavə et düyməsi (Ağacın son budağı) -->
                                    <div class="relative pt-0.5">
                                        <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>
                                        <button type="button" onclick="BusinessDashboardView.openFinanceCategoryModal(null, 'income')" class="w-full py-2.5 px-3 rounded-xl bg-slate-100/90 hover:bg-[#FFDD2D] text-slate-800 hover:text-[#101114] font-medium text-xs transition flex items-center justify-center gap-1.5 active:scale-[0.99] border border-slate-200/80 hover:border-amber-300 shadow-2xs cursor-pointer">
                                            <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                            <span>Yeni gəlir kateqoriyası əlavə et</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    },

    /* =========================================================================
       FINANCE MODALS RENDERER (6 DEDICATED MODALS)
       ========================================================================= */

    renderFinanceModals: function() {
        const partner = (typeof this.getPartnerUser === 'function') ? this.getPartnerUser() : null;
        const defaultAccountEmail = (partner && partner.email) ? partner.email : (
            (typeof App !== 'undefined' && App.currentUser && App.currentUser.email) ? App.currentUser.email : 'demo@zeyvobusiness.az'
        );
        return `
            <!-- 1. TRANSACTION MODAL (GƏLİR / XƏRC) -->
            <div id="bizFinanceTransactionModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
                    <!-- Clean Header (Strictly compliant with GEMINI.md - Rule 5) -->
                    ${ZeyvoUI.modalHeader({ title: 'Yeni maliyyə əməliyyatı', titleId: 'bizFinanceTxModalTitle', description: 'Kassaya gəlir və ya xərc qeydiyyatı', onClose: 'BusinessDashboardView.closeFinanceTransactionModal()' })}

                    <form id="bizFinanceTxForm" onsubmit="BusinessDashboardView.handleSaveFinanceTransaction(event)" class="space-y-4">
                        <input type="hidden" id="bizFinanceTxId" value="" />

                        <!-- Type toggle -->
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">Əməliyyat növü</label>
                            <div class="grid grid-cols-2 gap-2">
                                <label class="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-500 has-[:checked]:text-emerald-700 text-xs font-bold text-slate-600 transition">
                                    <input type="radio" name="financeTxType" value="income" checked onchange="BusinessDashboardView.onFinanceTxTypeChanged('income')" class="hidden" />
                                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>
                                    <span>Mədaxil (Gəlir)</span>
                                </label>
                                <label class="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer has-[:checked]:bg-rose-50 has-[:checked]:border-rose-500 has-[:checked]:text-rose-700 text-xs font-bold text-slate-600 transition">
                                    <input type="radio" name="financeTxType" value="expense" onchange="BusinessDashboardView.onFinanceTxTypeChanged('expense')" class="hidden" />
                                    <svg class="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7l-7 7-7-7"/></svg>
                                    <span>Məxaric (Xərc)</span>
                                </label>
                            </div>
                        </div>

                        <!-- Amount & Date -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1">Məbləğ (₼) *</label>
                                <div class="relative">
                                    <input type="number" step="0.01" min="0.01" id="bizFinanceTxAmount" required placeholder="0.00" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-bold font-mono focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-900 bg-slate-50/50 focus:bg-white transition" />
                                    <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₼</span>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1">Tarix və vaxt *</label>
                                <input type="text" id="bizFinanceTxDateTime" required placeholder="2026-10-05 14:00" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition" />
                            </div>
                        </div>

                        <!-- Account & Category -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1">Kassa / Hesab *</label>
                                <select id="bizFinanceTxAccount" required class="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50 focus:bg-white focus:border-[#FFDD2D] outline-none transition cursor-pointer">
                                    <!-- injected dynamically -->
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1">Kateqoriya *</label>
                                <select id="bizFinanceTxCategory" required class="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50 focus:bg-white focus:border-[#FFDD2D] outline-none transition cursor-pointer">
                                    <!-- injected dynamically -->
                                </select>
                            </div>
                        </div>

                        <!-- Title / Purpose -->
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Əməliyyatın təyinatı *</label>
                            <input type="text" id="bizFinanceTxTitle" required placeholder="məs. Saç kəsimi xidmət haqqı, Təchizat alışı..." class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition" />
                        </div>

                        <!-- Counterparty -->
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Qarşı tərəf (Müştəri / Usta / Kontragent)</label>
                            <input type="text" id="bizFinanceTxCounterparty" placeholder="məs. Nərmin Qasımova, MedBeauty MMC..." class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition" />
                        </div>

                        <!-- Note -->
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Əlavə qeyd</label>
                            <textarea id="bizFinanceTxNote" rows="2" placeholder="Əlavə məlumat və ya çek nömrəsi..." class="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition"></textarea>
                        </div>

                        <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeFinanceTransactionModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- 2. SHIFT MANAGEMENT MODAL (OPEN / CLOSE Z-REPORT) -->
            <div id="bizFinanceShiftModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
                    ${ZeyvoUI.modalHeader({ title: 'Kassa Növbəsi', titleId: 'bizFinanceShiftModalTitle', description: 'Növbənin idarə edilməsi', descriptionId: 'bizFinanceShiftModalSubtitle', onClose: 'BusinessDashboardView.closeFinanceShiftModal()' })}

                    <form id="bizFinanceShiftForm" onsubmit="BusinessDashboardView.handleSaveShiftAction(event)" class="space-y-4">
                        <input type="hidden" id="bizFinanceShiftActionType" value="open" />

                        <!-- Container for Dynamic Shift Info (Closing Z-report summary or Open instructions) -->
                        <div id="bizFinanceShiftBody" class="space-y-4">
                            <!-- Injected dynamically -->
                        </div>

                        <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeFinanceShiftModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Təsdiq et", type: "submit", id: "bizFinanceShiftSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- 3. TRANSFER MODAL (DAXİLİ KÖÇÜRMƏ) -->
            <div id="bizFinanceTransferModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
                    ${ZeyvoUI.modalHeader({ title: 'Daxili köçürmə', description: 'Hesablar və kassalar arasında vəsait köçürülməsi', onClose: 'BusinessDashboardView.closeFinanceTransferModal()' })}

                    <form id="bizFinanceTransferForm" onsubmit="BusinessDashboardView.handleSaveFinanceTransfer(event)" class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Çıxarılan hesab (Haradan) *</label>
                            <select id="bizFinanceTransferFromAcc" required onchange="BusinessDashboardView.updateTransferBalanceDisplay()" class="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50 focus:bg-white focus:border-[#FFDD2D] outline-none transition cursor-pointer">
                                <!-- injected dynamically -->
                            </select>
                            <div id="bizFinanceTransferFromBalanceHint" class="text-[11px] text-slate-400 mt-1 font-mono"></div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Mədaxil olan hesab (Haraya) *</label>
                            <select id="bizFinanceTransferToAcc" required class="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50 focus:bg-white focus:border-[#FFDD2D] outline-none transition cursor-pointer">
                                <!-- injected dynamically -->
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Köçürülən məbləğ (₼) *</label>
                            <div class="relative">
                                <input type="number" step="0.01" min="0.01" id="bizFinanceTransferAmount" required placeholder="0.00" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-bold font-mono focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-900 bg-slate-50/50 focus:bg-white transition" />
                                <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₼</span>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Təsvir / Qeyd</label>
                            <input type="text" id="bizFinanceTransferNote" placeholder="məs. Kassa inkassasiyası, Seyfə köçürmə..." class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition" />
                        </div>

                        <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeFinanceTransferModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Köçürməni icra et", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- 4. PAYROLL PAYOUT MODAL (MAAŞ / AVANS ÖDƏ) -->
            <div id="bizFinancePayrollModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
                    ${ZeyvoUI.modalHeader({ title: 'Maaş və ya Avans ödənişi', description: 'Əməkdaşa qazancının ödənilməsi', onClose: 'BusinessDashboardView.closeFinancePayrollModal()' })}

                    <form id="bizFinancePayrollForm" onsubmit="BusinessDashboardView.handleSavePayrollPayout(event)" class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Əməkdaş *</label>
                            <select id="bizFinancePayrollStaffSelect" required onchange="BusinessDashboardView.onPayrollStaffChanged()" class="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50 focus:bg-white focus:border-[#FFDD2D] outline-none transition cursor-pointer">
                                <!-- injected dynamically -->
                            </select>
                            <div id="bizFinancePayrollStaffBalanceHint" class="text-[11px] text-slate-500 mt-1 font-mono"></div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Ödəniş növü *</label>
                            <select id="bizFinancePayrollType" class="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50 focus:bg-white focus:border-[#FFDD2D] outline-none transition cursor-pointer">
                                <option value="salary">Qalıq maaşın ödənişi</option>
                                <option value="advance">Avans ödənişi</option>
                                <option value="bonus">Bonus / Mükafat</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Ödəniş hesabı / Kassa *</label>
                            <select id="bizFinancePayrollAccount" required class="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50 focus:bg-white focus:border-[#FFDD2D] outline-none transition cursor-pointer">
                                <!-- injected dynamically -->
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Ödənilən məbləğ (₼) *</label>
                            <div class="relative">
                                <input type="number" step="0.01" min="0.01" id="bizFinancePayrollAmount" required placeholder="0.00" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-bold font-mono focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-900 bg-slate-50/50 focus:bg-white transition" />
                                <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₼</span>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Qeyd</label>
                            <input type="text" id="bizFinancePayrollNote" placeholder="məs. Cari ay üzrə yekun hesablaşma..." class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition" />
                        </div>

                        <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeFinancePayrollModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Ödənişi təsdiqlə", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- 5. ACCOUNT MODAL (HESAB ƏLAVƏ ET / REDAKTƏ) -->
            <div id="bizFinanceAccountModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
                    ${ZeyvoUI.modalHeader({ title: 'Yeni kassa / hesab', titleId: 'bizFinanceAccountModalTitle', description: 'Hesab məlumatlarının daxil edilməsi', onClose: 'BusinessDashboardView.closeFinanceAccountModal()' })}

                    <form id="bizFinanceAccountForm" onsubmit="BusinessDashboardView.handleSaveFinanceAccount(event)" class="space-y-4">
                        <input type="hidden" id="bizFinanceAccId" value="" />

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Hesabın adı *</label>
                            <input type="text" id="bizFinanceAccName" required placeholder="məs. Əsas nağd kassa, ABB Bank hesabı..." class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition" />
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Hesabın növü *</label>
                            <select id="bizFinanceAccType" required class="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50 focus:bg-white focus:border-[#FFDD2D] outline-none transition cursor-pointer">
                                <option value="cash">Nağd kassa (Pul yeşiyi)</option>
                                <option value="pos">POS Terminal</option>
                                <option value="bank">Bank hesabı (Cari)</option>
                                <option value="safe">Daxili seyf (Rezerv)</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">İlkin balans (₼)</label>
                            <input type="number" step="0.01" min="0" id="bizFinanceAccBalance" placeholder="0.00" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-bold font-mono focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-900 bg-slate-50/50 focus:bg-white transition" />
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">İzah və ya rekvizit (IBAN / Terminal ID)</label>
                            <input type="text" id="bizFinanceAccDetails" placeholder="məs. AZ21ABBB... və ya Terminal #12" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition" />
                        </div>

                        <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeFinanceAccountModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- 6. CATEGORY MODAL (KATEQORİYA ƏLAVƏ ET / REDAKTƏ) -->
            <div id="bizFinanceCategoryModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
                    ${ZeyvoUI.modalHeader({ title: 'Maliyyə kateqoriyası', titleId: 'bizFinanceCategoryModalTitle', description: 'Gəlir və ya xərc təsnifatı', onClose: 'BusinessDashboardView.closeFinanceCategoryModal()' })}

                    <form id="bizFinanceCategoryForm" onsubmit="BusinessDashboardView.handleSaveFinanceCategory(event)" class="space-y-4">
                        <input type="hidden" id="bizFinanceCatId" value="" />

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Kateqoriyanın adı *</label>
                            <input type="text" id="bizFinanceCatName" required placeholder="məs. İcarə haqqı, Reklam xərcləri..." class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition" />
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">Növ *</label>
                            <select id="bizFinanceCatType" required class="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50/50 focus:bg-white focus:border-[#FFDD2D] outline-none transition cursor-pointer">
                                <option value="expense">Xərc kateqoriyası</option>
                                <option value="income">Gəlir kateqoriyası</option>
                            </select>
                        </div>

                        <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeFinanceCategoryModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- 7. TRANSACTIONS FILTER MODAL (SÜZGƏC) -->
            <div id="bizFinanceTxFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeFinanceTxFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    <!-- Clean Modal Header (GEMINI.md compliant: text only on left, close ✕ on right) -->
                    ${ZeyvoUI.modalHeader({ title: "Əməliyyat filtrləri", description: "Əməliyyat növü, hesab və kateqoriya üzrə süzgəc", onClose: "BusinessDashboardView.closeFinanceTxFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Əməliyyat növü -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Əməliyyat növü</label>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <button type="button" id="bizTxFilterTypeBtn_all" onclick="BusinessDashboardView.selectFinanceFilterType('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="bizTxFilterTypeBtn_income" onclick="BusinessDashboardView.selectFinanceFilterType('income')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Gəlirlər</span>
                                </button>
                                <button type="button" id="bizTxFilterTypeBtn_expense" onclick="BusinessDashboardView.selectFinanceFilterType('expense')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Xərclər</span>
                                </button>
                                <button type="button" id="bizTxFilterTypeBtn_transfer" onclick="BusinessDashboardView.selectFinanceFilterType('transfer')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Köçürmələr</span>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Hesab -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-medium">Hesab</label>
                            <select id="bizFinanceFilterModalAcc" class="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-xs font-semibold text-slate-800 outline-none focus:border-[#FFDD2D] transition cursor-pointer">
                                <option value="all">Bütün hesablar</option>
                            </select>
                        </div>

                        <!-- 3. Kateqoriya -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-medium">Kateqoriya</label>
                            <select id="bizFinanceFilterModalCat" class="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-xs font-semibold text-slate-800 outline-none focus:border-[#FFDD2D] transition cursor-pointer">
                                <option value="all">Bütün kateqoriyalar</option>
                            </select>
                        </div>
                    </div>

                    <!-- Modal Actions -->
                    <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
                        <button type="button" onclick="BusinessDashboardView.resetFinanceTxModalFilters()" class="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition cursor-pointer">
                            Sıfırla
                        </button>
                        <button type="button" onclick="BusinessDashboardView.applyFinanceTxModalFilters()" class="px-5 py-2.5 rounded-xl bg-[#101114] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer">
                            Tətbiq et
                        </button>
                    </div>
                </div>
            </div>

            <!-- 8. EXPORT REPORT TO EMAIL MODAL -->
            <div id="bizFinanceExportEmailModal" onclick="if(event.target === this) BusinessDashboardView.closeFinanceExportEmailModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    <!-- Clean Modal Header (GEMINI.md compliant: text only on left, close ✕ on right) -->
                    ${ZeyvoUI.modalHeader({ title: "Maliyyə hesabatının eksportu", description: "Hesabatı göstərilən e-poçt ünvanına göndərin", onClose: "BusinessDashboardView.closeFinanceExportEmailModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSendFinanceExportEmail(event)" class="space-y-4 text-xs font-normal">
                        <!-- Summary info box -->
                        <div class="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-slate-700 flex items-start gap-3">
                            <div class="w-7 h-7 rounded-xl bg-[#FFDD2D]/40 text-[#101114] flex items-center justify-center shrink-0 mt-0.5">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-bold text-slate-900 text-xs">Maliyyə əməliyyatları arxivi</div>
                                <div id="bizFinanceExportSummaryText" class="text-[11px] text-slate-500 mt-0.5">Bütün seçilmiş əməliyyatlar və balans detalları daxildir.</div>
                            </div>
                        </div>

                        <!-- Email Input -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-semibold">
                                E-poçt ünvanı <span class="text-rose-500">*</span>
                            </label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                </span>
                                <input 
                                    type="email" 
                                    id="bizFinanceExportEmailInput"
                                    required 
                                    value="${this.escapeHtml(defaultAccountEmail)}"
                                    placeholder="${this.escapeHtml(defaultAccountEmail)}"
                                    class="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] transition"
                                />
                            </div>
                            <p id="bizFinanceExportEmailError" class="text-[11px] text-rose-500 hidden font-medium">Zəhmət olmasa düzgün e-poçt ünvanı daxil edin.</p>
                        </div>

                        <!-- Format Selector -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-semibold">Fayl formatı</label>
                            <div class="grid grid-cols-2 gap-2">
                                <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 cursor-pointer has-[:checked]:bg-amber-50/50 has-[:checked]:border-slate-900 has-[:checked]:shadow-2xs transition">
                                    <div class="flex items-center gap-2">
                                        <span class="font-bold text-slate-900 text-xs">Excel cədvəli</span>
                                        <span class="text-[10px] text-slate-400 font-mono">.xlsx</span>
                                    </div>
                                    <input type="radio" name="bizFinanceExportFormat" value="xlsx" checked class="accent-slate-900 cursor-pointer">
                                </label>
                                <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 cursor-pointer has-[:checked]:bg-amber-50/50 has-[:checked]:border-slate-900 has-[:checked]:shadow-2xs transition">
                                    <div class="flex items-center gap-2">
                                        <span class="font-bold text-slate-900 text-xs">CSV formatı</span>
                                        <span class="text-[10px] text-slate-400 font-mono">.csv</span>
                                    </div>
                                    <input type="radio" name="bizFinanceExportFormat" value="csv" class="accent-slate-900 cursor-pointer">
                                </label>
                            </div>
                        </div>

                        <!-- Period Scope -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-semibold">Hesabat dövrü</label>
                            <select id="bizFinanceExportPeriod" class="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-xs font-semibold text-slate-800 outline-none focus:border-[#FFDD2D] transition cursor-pointer">
                                <option value="filtered">Cari filtrlərə uyğun dövr</option>
                                <option value="this_month">Cari ay</option>
                                <option value="last_month">Keçən ay</option>
                                <option value="this_year">Cari il</option>
                                <option value="all">Bütün tarixçə</option>
                            </select>
                        </div>

                        <!-- Modal Actions -->
                        <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeFinanceExportEmailModal()", size: "md", type: "button" })}
                            <button type="submit" id="bizFinanceExportSendBtn" class="px-5 py-2.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer active:scale-95">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                                <span>Hesabatı göndər</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       ACTION & MODAL HANDLERS
       ========================================================================= */

    // 1. Transaction Handlers
    openFinanceTransactionModal: function(txId) {
        const data = this.getFinanceData();
        const accounts = data.accounts || [];
        const categories = data.categories || [];
        const modal = document.getElementById('bizFinanceTransactionModal');
        if (!modal) return;

        this.financeEditingTxId = txId || null;
        const titleEl = document.getElementById('bizFinanceTxModalTitle');
        const idInput = document.getElementById('bizFinanceTxId');
        const amountInput = document.getElementById('bizFinanceTxAmount');
        const dtInput = document.getElementById('bizFinanceTxDateTime');
        const accSelect = document.getElementById('bizFinanceTxAccount');
        const catSelect = document.getElementById('bizFinanceTxCategory');
        const titleInput = document.getElementById('bizFinanceTxTitle');
        const cpInput = document.getElementById('bizFinanceTxCounterparty');
        const noteInput = document.getElementById('bizFinanceTxNote');

        // Populate accounts
        accSelect.innerHTML = accounts.map(a => `<option value="${a.id}">${a.name} (${Number(a.balance).toFixed(2)} ₼)</option>`).join('');

        let currentType = 'income';

        if (txId) {
            const tx = (data.transactions || []).find(t => t.id === txId);
            if (tx) {
                titleEl.textContent = 'Əməliyyatı redaktə et';
                idInput.value = tx.id;
                currentType = tx.type;
                amountInput.value = tx.amount;
                dtInput.value = `${tx.date} ${tx.time || ''}`;
                accSelect.value = tx.accountId;
                titleInput.value = tx.title || '';
                cpInput.value = tx.counterparty || '';
                noteInput.value = tx.note || '';
            }
        } else {
            titleEl.textContent = 'Yeni maliyyə əməliyyatı';
            idInput.value = '';
            amountInput.value = '';
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10);
            const timeStr = now.toTimeString().slice(0, 5);
            dtInput.value = `${dateStr} ${timeStr}`;
            titleInput.value = '';
            cpInput.value = '';
            noteInput.value = '';
        }

        // Set radio
        const radios = document.getElementsByName('financeTxType');
        for (let r of radios) {
            r.checked = (r.value === currentType);
        }

        // Populate categories for type
        this.populateFinanceTxCategories(currentType, txId ? (data.transactions || []).find(t => t.id === txId)?.categoryId : null);

        modal.classList.remove('hidden');
    },

    closeFinanceTransactionModal: function() {
        const modal = document.getElementById('bizFinanceTransactionModal');
        if (modal) modal.classList.add('hidden');
        this.financeEditingTxId = null;
    },

    onFinanceTxTypeChanged: function(type) {
        this.populateFinanceTxCategories(type, null);
    },

    populateFinanceTxCategories: function(type, selectedCatId) {
        const data = this.getFinanceData();
        const catSelect = document.getElementById('bizFinanceTxCategory');
        if (!catSelect) return;
        const filtered = (data.categories || []).filter(c => c.type === type);
        catSelect.innerHTML = filtered.map(c => `<option value="${c.id}" ${c.id === selectedCatId ? 'selected' : ''}>${c.name}</option>`).join('');
    },

    handleSaveFinanceTransaction: function(e) {
        e.preventDefault();
        const data = this.getFinanceData();
        const id = document.getElementById('bizFinanceTxId').value;
        const amount = parseFloat(document.getElementById('bizFinanceTxAmount').value) || 0;
        const dtStr = document.getElementById('bizFinanceTxDateTime').value.trim();
        const accountId = document.getElementById('bizFinanceTxAccount').value;
        const categoryId = document.getElementById('bizFinanceTxCategory').value;
        const title = document.getElementById('bizFinanceTxTitle').value.trim();
        const counterparty = document.getElementById('bizFinanceTxCounterparty').value.trim();
        const note = document.getElementById('bizFinanceTxNote').value.trim();

        let type = 'income';
        const radios = document.getElementsByName('financeTxType');
        for (let r of radios) {
            if (r.checked) type = r.value;
        }

        if (amount <= 0) {
            if (typeof App !== 'undefined') App.showToast('Məbləğ 0-dan böyük olmalıdır');
            return;
        }

        const dateParts = dtStr.split(' ');
        const date = dateParts[0] || new Date().toISOString().slice(0, 10);
        const time = dateParts[1] || '12:00';

        if (id) {
            // Edit existing
            const idx = (data.transactions || []).findIndex(t => t.id === id);
            if (idx !== -1) {
                const oldTx = data.transactions[idx];
                // Revert old account balance
                const oldAcc = (data.accounts || []).find(a => a.id === oldTx.accountId);
                if (oldAcc) {
                    if (oldTx.type === 'income') oldAcc.balance -= oldTx.amount;
                    else if (oldTx.type === 'expense') oldAcc.balance += oldTx.amount;
                }
                // Apply new account balance
                const newAcc = (data.accounts || []).find(a => a.id === accountId);
                if (newAcc) {
                    if (type === 'income') newAcc.balance += amount;
                    else if (type === 'expense') newAcc.balance -= amount;
                }

                data.transactions[idx] = {
                    ...oldTx,
                    amount,
                    type,
                    date,
                    time,
                    accountId,
                    categoryId,
                    title,
                    counterparty,
                    note
                };
            }
        } else {
            // New transaction
            const newTx = {
                id: 'tx_' + Date.now(),
                amount,
                type,
                date,
                time,
                accountId,
                categoryId,
                title,
                counterparty,
                note
            };
            if (!data.transactions) data.transactions = [];
            data.transactions.unshift(newTx);

            // Update account balance
            const acc = (data.accounts || []).find(a => a.id === accountId);
            if (acc) {
                if (type === 'income') acc.balance += amount;
                else if (type === 'expense') acc.balance -= amount;
            }

            // Update shift turnover if cash or pos
            if (data.shift && data.shift.status === 'open') {
                if (type === 'income') {
                    if (accountId === 'acc_cash') data.shift.cashTurnover = (Number(data.shift.cashTurnover) || 0) + amount;
                    else if (accountId === 'acc_pos') data.shift.cardTurnover = (Number(data.shift.cardTurnover) || 0) + amount;
                    data.shift.totalTurnover = (Number(data.shift.totalTurnover) || 0) + amount;
                }
            }
        }

        this.saveFinanceData(data);
        this.closeFinanceTransactionModal();
        this.refreshFinanceCanvas();
        if (typeof App !== 'undefined') App.showToast(id ? 'Əməliyyat yeniləndi' : 'Yeni əməliyyat əlavə edildi');
    },

    deleteFinanceTransaction: function(id) {
        const data = this.getFinanceData();
        const tx = (data.transactions || []).find(t => t.id === id);
        if (!tx) return;

        const txTitle = tx.title || 'Əməliyyat';
        const formattedAmount = `${(Number(tx.amount) || 0).toFixed(2)} ₼`;

        this.openDeleteConfirmModal({
            title: 'Əməliyyatı sil',
            message: `<strong>"${txTitle}"</strong> (${formattedAmount}) əməliyyatını silmək istədiyinizə əminsiniz?<br><span class="text-amber-600 mt-1.5 inline-block text-xs">Müvafiq kassa və bank balansı avtomatik bərpa olunacaq.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const idx = (data.transactions || []).findIndex(t => t.id === id);
                if (idx !== -1) {
                    const tItem = data.transactions[idx];
                    // Revert balance
                    const acc = (data.accounts || []).find(a => a.id === tItem.accountId);
                    if (acc) {
                        if (tItem.type === 'income') acc.balance -= tItem.amount;
                        else if (tItem.type === 'expense') acc.balance += tItem.amount;
                    }
                    if (tItem.type === 'transfer' && tItem.toAccountId) {
                        const toAcc = (data.accounts || []).find(a => a.id === tItem.toAccountId);
                        if (toAcc) toAcc.balance -= tItem.amount;
                        if (acc) acc.balance += tItem.amount;
                    }
                    data.transactions.splice(idx, 1);
                    this.saveFinanceData(data);
                    this.refreshFinanceCanvas();
                    if (typeof App !== 'undefined') App.showToast('Əməliyyat silindi');
                }
            }
        });
    },

    // 2. Shift Management Handlers
    openFinanceShiftModal: function(action) {
        const data = this.getFinanceData();
        const shift = data.shift || {};
        const modal = document.getElementById('bizFinanceShiftModal');
        if (!modal) return;

        const actionInput = document.getElementById('bizFinanceShiftActionType');
        actionInput.value = action;
        const titleEl = document.getElementById('bizFinanceShiftModalTitle');
        const subtitleEl = document.getElementById('bizFinanceShiftModalSubtitle');
        const bodyEl = document.getElementById('bizFinanceShiftBody');
        const submitBtn = document.getElementById('bizFinanceShiftSubmitBtn');

        if (action === 'close') {
            titleEl.textContent = 'Kassa Növbəsini Bağla (Z-Hesabat)';
            subtitleEl.textContent = 'Günün yekunlaşdırılması və nağd pulun təhvili';
            submitBtn.textContent = 'Növbəni bağla və Z-hesabat təsdiqlə';

            const expectedCash = (Number(shift.openingCash) || 0) + (Number(shift.cashTurnover) || 0);

            bodyEl.innerHTML = `
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                    <div class="flex justify-between text-slate-600">
                        <span>Növbə nömrəsi:</span>
                        <span class="font-bold text-slate-800">#${shift.number || 104}</span>
                    </div>
                    <div class="flex justify-between text-slate-600">
                        <span>Açılış vaxtı:</span>
                        <span class="font-medium text-slate-800">${shift.openedAt || ''}</span>
                    </div>
                    <div class="flex justify-between text-slate-600">
                        <span>İlkin nağd qalıq:</span>
                        <span class="font-mono font-bold text-slate-800">${(Number(shift.openingCash) || 0).toFixed(2)} ₼</span>
                    </div>
                    <div class="flex justify-between text-emerald-700">
                        <span>Nağd dövriyyə:</span>
                        <span class="font-mono font-bold">+ ${(Number(shift.cashTurnover) || 0).toFixed(2)} ₼</span>
                    </div>
                    <div class="flex justify-between text-indigo-700">
                        <span>POS Terminal dövriyyəsi:</span>
                        <span class="font-mono font-bold">+ ${(Number(shift.cardTurnover) || 0).toFixed(2)} ₼</span>
                    </div>
                    <div class="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                        <span>Kassada gözlənilən nağd:</span>
                        <span class="font-mono text-emerald-600">${expectedCash.toFixed(2)} ₼</span>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Faktiki sayılmış nağd pul (₼) *</label>
                    <input type="number" step="0.01" min="0" id="bizFinanceShiftActualCash" required value="${expectedCash.toFixed(2)}" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-bold font-mono focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-900 bg-slate-50/50 focus:bg-white transition" />
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Növbənin yekun qeydi</label>
                    <input type="text" id="bizFinanceShiftNote" placeholder="məs. Növbə fərqsiz bağlandı" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition" />
                </div>
            `;
        } else {
            titleEl.textContent = 'Yeni Kassa Növbəsi Aç';
            subtitleEl.textContent = 'Gündəlik xidmət və ödənişlərin qəbulu üçün növbə';
            submitBtn.textContent = 'Növbəni aç';

            // Retrieve staff and participants
            const staffList = (typeof this.getStaffList === 'function') ? this.getStaffList() : [];
            const staffOptions = [];

            if (Array.isArray(staffList) && staffList.length > 0) {
                staffList.forEach(s => {
                    if (s && s.name) {
                        staffOptions.push({
                            name: s.name,
                            role: s.role || s.specialization || 'Əməkdaş'
                        });
                    }
                });
            }

            if (Array.isArray(data.payroll)) {
                data.payroll.forEach(p => {
                    if (p && p.staffName && !staffOptions.some(o => o.name === p.staffName)) {
                        staffOptions.push({
                            name: p.staffName,
                            role: p.role || 'Əməkdaş'
                        });
                    }
                });
            }

            const currentCashier = (shift && shift.cashier) ? shift.cashier : (staffOptions[0] ? staffOptions[0].name : 'Leyla Əliyeva');
            if (!staffOptions.some(o => o.name === currentCashier)) {
                staffOptions.unshift({
                    name: currentCashier,
                    role: 'Administrator / Kassir'
                });
            }

            bodyEl.innerHTML = `
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Kassir / Administrator *</label>
                    <div class="relative">
                        <select id="bizFinanceShiftCashier" required class="w-full h-11 px-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition cursor-pointer appearance-none">
                            ${staffOptions.map(st => `
                                <option value="${this.escapeHtml(st.name)}" ${(st.name === currentCashier) ? 'selected' : ''}>
                                    ${this.escapeHtml(st.name)} (${this.escapeHtml(st.role)})
                                </option>
                            `).join('')}
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Açılış nağd qalığı (Yeşikdə olan pul) (₼) *</label>
                    <input type="number" step="0.01" min="0" id="bizFinanceShiftOpeningCash" required value="250.00" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-bold font-mono focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-900 bg-slate-50/50 focus:bg-white transition" />
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Qeyd</label>
                    <input type="text" id="bizFinanceShiftNote" placeholder="məs. Səhər növbəsi" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none text-slate-800 bg-slate-50/50 focus:bg-white transition" />
                </div>
            `;
        }

        modal.classList.remove('hidden');
    },

    closeFinanceShiftModal: function() {
        const modal = document.getElementById('bizFinanceShiftModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveShiftAction: function(e) {
        e.preventDefault();
        const data = this.getFinanceData();
        const action = document.getElementById('bizFinanceShiftActionType').value;

        if (action === 'close') {
            const actualCash = parseFloat(document.getElementById('bizFinanceShiftActualCash').value) || 0;
            const note = document.getElementById('bizFinanceShiftNote').value.trim();
            const now = new Date();
            const nowStr = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`;

            data.shift = {
                ...data.shift,
                status: 'closed',
                closedAt: nowStr,
                actualCash,
                notes: note || 'Növbə uğurla yekunlaşdırıldı'
            };

            this.saveFinanceData(data);
            this.closeFinanceShiftModal();
            this.refreshFinanceCanvas();
            if (typeof App !== 'undefined') App.showToast('Növbə bağlandı və Z-hesabat formalaşdırıldı');
        } else {
            const cashier = document.getElementById('bizFinanceShiftCashier').value.trim();
            const openingCash = parseFloat(document.getElementById('bizFinanceShiftOpeningCash').value) || 0;
            const note = document.getElementById('bizFinanceShiftNote').value.trim();
            const now = new Date();
            const nowStr = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`;
            const nextNumber = ((data.shift && data.shift.number) || 104) + 1;

            data.shift = {
                id: 'shift_' + nextNumber,
                number: nextNumber,
                cashier,
                status: 'open',
                openedAt: nowStr,
                closedAt: null,
                openingCash,
                cashTurnover: 0,
                cardTurnover: 0,
                totalTurnover: 0,
                notes: note || 'Yeni növbə açıldı'
            };

            this.saveFinanceData(data);
            this.closeFinanceShiftModal();
            this.refreshFinanceCanvas();
            if (typeof App !== 'undefined') App.showToast('Növbə #' + nextNumber + ' açıldı');
        }
    },

    // 3. Transfer Handlers
    openFinanceTransferModal: function(preselectedFromAccId) {
        const data = this.getFinanceData();
        const accounts = data.accounts || [];
        const modal = document.getElementById('bizFinanceTransferModal');
        if (!modal) return;

        const fromSelect = document.getElementById('bizFinanceTransferFromAcc');
        const toSelect = document.getElementById('bizFinanceTransferToAcc');
        const amountInput = document.getElementById('bizFinanceTransferAmount');
        const noteInput = document.getElementById('bizFinanceTransferNote');

        fromSelect.innerHTML = accounts.map(a => `<option value="${a.id}">${a.name} (${Number(a.balance).toFixed(2)} ₼)</option>`).join('');
        toSelect.innerHTML = accounts.map(a => `<option value="${a.id}">${a.name} (${Number(a.balance).toFixed(2)} ₼)</option>`).join('');

        if (preselectedFromAccId) {
            fromSelect.value = preselectedFromAccId;
            // pick a different toAcc
            const other = accounts.find(a => a.id !== preselectedFromAccId);
            if (other) toSelect.value = other.id;
        } else if (accounts.length >= 2) {
            fromSelect.value = accounts[0].id;
            toSelect.value = accounts[1].id;
        }

        amountInput.value = '';
        noteInput.value = '';
        this.updateTransferBalanceDisplay();
        modal.classList.remove('hidden');
    },

    closeFinanceTransferModal: function() {
        const modal = document.getElementById('bizFinanceTransferModal');
        if (modal) modal.classList.add('hidden');
    },

    updateTransferBalanceDisplay: function() {
        const data = this.getFinanceData();
        const fromAccId = document.getElementById('bizFinanceTransferFromAcc')?.value;
        const hintEl = document.getElementById('bizFinanceTransferFromBalanceHint');
        if (hintEl && fromAccId) {
            const acc = (data.accounts || []).find(a => a.id === fromAccId);
            if (acc) {
                hintEl.textContent = `Mövcud qalıq: ${Number(acc.balance).toFixed(2)} ₼`;
            }
        }
    },

    handleSaveFinanceTransfer: function(e) {
        e.preventDefault();
        const data = this.getFinanceData();
        const fromId = document.getElementById('bizFinanceTransferFromAcc').value;
        const toId = document.getElementById('bizFinanceTransferToAcc').value;
        const amount = parseFloat(document.getElementById('bizFinanceTransferAmount').value) || 0;
        const note = document.getElementById('bizFinanceTransferNote').value.trim();

        if (fromId === toId) {
            if (typeof App !== 'undefined') App.showToast('Çıxarılan və daxil olan hesab eyni ola bilməz');
            return;
        }

        const fromAcc = (data.accounts || []).find(a => a.id === fromId);
        const toAcc = (data.accounts || []).find(a => a.id === toId);

        if (!fromAcc || !toAcc) return;

        if (amount <= 0) {
            if (typeof App !== 'undefined') App.showToast('Köçürmə məbləği 0-dan böyük olmalıdır');
            return;
        }

        if (fromAcc.balance < amount) {
            if (typeof App !== 'undefined') App.showToast('Göndərən hesabda kifayət qədər vəsait yoxdur');
            return;
        }

        // Deduct & Add
        fromAcc.balance -= amount;
        toAcc.balance += amount;

        // Create transaction record
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10);
        const timeStr = now.toTimeString().slice(0, 5);

        const newTx = {
            id: 'tx_' + Date.now(),
            date: dateStr,
            time: timeStr,
            type: 'transfer',
            accountId: fromId,
            toAccountId: toId,
            categoryId: '',
            amount,
            title: `Köçürmə: ${fromAcc.name} → ${toAcc.name}`,
            counterparty: 'Daxili inkassasiya',
            note: note || 'Daxili hesablararası vəsait köçürməsi'
        };

        if (!data.transactions) data.transactions = [];
        data.transactions.unshift(newTx);

        this.saveFinanceData(data);
        this.closeFinanceTransferModal();
        this.refreshFinanceCanvas();
        if (typeof App !== 'undefined') App.showToast('Köçürmə uğurla tamamlandı');
    },

    // 4. Payroll Handlers
    openFinancePayrollModal: function(staffId) {
        const data = this.getFinanceData();
        const modal = document.getElementById('bizFinancePayrollModal');
        if (!modal) return;

        const staffSelect = document.getElementById('bizFinancePayrollStaffSelect');
        const accSelect = document.getElementById('bizFinancePayrollAccount');
        const amountInput = document.getElementById('bizFinancePayrollAmount');
        const noteInput = document.getElementById('bizFinancePayrollNote');

        const payrollList = data.payroll || [];
        staffSelect.innerHTML = payrollList.map(p => `
            <option value="${p.staffId}" ${p.staffId === staffId ? 'selected' : ''}>
                ${p.staffName} (${p.role}) - Qalıq: ${Number(p.balanceDue).toFixed(2)} ₼
            </option>
        `).join('');

        const accounts = data.accounts || [];
        accSelect.innerHTML = accounts.map(a => `
            <option value="${a.id}">${a.name} (${Number(a.balance).toFixed(2)} ₼)</option>
        `).join('');

        this.onPayrollStaffChanged();
        noteInput.value = '';
        modal.classList.remove('hidden');
    },

    closeFinancePayrollModal: function() {
        const modal = document.getElementById('bizFinancePayrollModal');
        if (modal) modal.classList.add('hidden');
    },

    onPayrollStaffChanged: function() {
        const data = this.getFinanceData();
        const staffSelect = document.getElementById('bizFinancePayrollStaffSelect');
        const hintEl = document.getElementById('bizFinancePayrollStaffBalanceHint');
        const amountInput = document.getElementById('bizFinancePayrollAmount');
        if (!staffSelect || !hintEl) return;

        const p = (data.payroll || []).find(item => item.staffId === staffSelect.value);
        if (p) {
            hintEl.textContent = `Qazanılan: ${Number(p.totalEarned).toFixed(2)} ₼ • Verilmiş avans: ${Number(p.paidAdvance).toFixed(2)} ₼ • Qalıq borc: ${Number(p.balanceDue).toFixed(2)} ₼`;
            amountInput.value = Number(p.balanceDue).toFixed(2);
        }
    },

    handleSavePayrollPayout: function(e) {
        e.preventDefault();
        const data = this.getFinanceData();
        const staffId = document.getElementById('bizFinancePayrollStaffSelect').value;
        const type = document.getElementById('bizFinancePayrollType').value;
        const accountId = document.getElementById('bizFinancePayrollAccount').value;
        const amount = parseFloat(document.getElementById('bizFinancePayrollAmount').value) || 0;
        const note = document.getElementById('bizFinancePayrollNote').value.trim();

        if (amount <= 0) {
            if (typeof App !== 'undefined') App.showToast('Ödəniş məbləği 0-dan böyük olmalıdır');
            return;
        }

        const acc = (data.accounts || []).find(a => a.id === accountId);
        if (!acc) return;

        if (acc.balance < amount) {
            if (typeof App !== 'undefined') App.showToast('Seçilmiş kassa hesabında kifayət qədər vəsait yoxdur');
            return;
        }

        const p = (data.payroll || []).find(item => item.staffId === staffId);
        if (!p) return;

        // Deduct from account balance
        acc.balance -= amount;

        // Update staff payroll
        p.paidAdvance = (Number(p.paidAdvance) || 0) + amount;
        p.balanceDue = Math.max(0, (Number(p.totalEarned) || 0) - (Number(p.paidAdvance) || 0));

        // Create transaction in ledger
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10);
        const timeStr = now.toTimeString().slice(0, 5);

        const typeName = type === 'advance' ? 'Avans ödənişi' : (type === 'bonus' ? 'Bonus ödənişi' : 'Maaş ödənişi');

        const newTx = {
            id: 'tx_' + Date.now(),
            date: dateStr,
            time: timeStr,
            type: 'expense',
            accountId: accountId,
            categoryId: 'cat_exp_salary',
            amount,
            title: `${typeName} (${p.staffName})`,
            counterparty: p.staffName,
            note: note || `Usta ${p.staffName} üçün ${typeName.toLowerCase()}`
        };

        if (!data.transactions) data.transactions = [];
        data.transactions.unshift(newTx);

        this.saveFinanceData(data);
        this.closeFinancePayrollModal();
        this.refreshFinanceCanvas();
        if (typeof App !== 'undefined') App.showToast('Ödəniş uğurla qeydə alındı və kassa balansından silindi');
    },

    // 5. Account Management Handlers
    openFinanceAccountModal: function(accId) {
        const data = this.getFinanceData();
        const modal = document.getElementById('bizFinanceAccountModal');
        if (!modal) return;

        this.financeEditingAccId = accId || null;
        const titleEl = document.getElementById('bizFinanceAccountModalTitle');
        const idInput = document.getElementById('bizFinanceAccId');
        const nameInput = document.getElementById('bizFinanceAccName');
        const typeSelect = document.getElementById('bizFinanceAccType');
        const balanceInput = document.getElementById('bizFinanceAccBalance');
        const detailsInput = document.getElementById('bizFinanceAccDetails');

        if (accId) {
            const acc = (data.accounts || []).find(a => a.id === accId);
            if (acc) {
                titleEl.textContent = 'Hesabı redaktə et';
                idInput.value = acc.id;
                nameInput.value = acc.name || '';
                typeSelect.value = acc.type || 'cash';
                balanceInput.value = acc.balance || 0;
                balanceInput.disabled = true; // prevent direct balance edits, must use adjustments/tx
                detailsInput.value = acc.details || '';
            }
        } else {
            titleEl.textContent = 'Yeni kassa / hesab';
            idInput.value = '';
            nameInput.value = '';
            typeSelect.value = 'cash';
            balanceInput.value = '';
            balanceInput.disabled = false;
            detailsInput.value = '';
        }

        modal.classList.remove('hidden');
    },

    closeFinanceAccountModal: function() {
        const modal = document.getElementById('bizFinanceAccountModal');
        if (modal) modal.classList.add('hidden');
        this.financeEditingAccId = null;
    },

    handleSaveFinanceAccount: function(e) {
        e.preventDefault();
        const data = this.getFinanceData();
        const id = document.getElementById('bizFinanceAccId').value;
        const name = document.getElementById('bizFinanceAccName').value.trim();
        const type = document.getElementById('bizFinanceAccType').value;
        const details = document.getElementById('bizFinanceAccDetails').value.trim();
        const balance = parseFloat(document.getElementById('bizFinanceAccBalance').value) || 0;

        if (id) {
            const acc = (data.accounts || []).find(a => a.id === id);
            if (acc) {
                acc.name = name;
                acc.type = type;
                acc.details = details;
            }
        } else {
            const newAcc = {
                id: 'acc_' + Date.now(),
                name,
                type,
                balance,
                currency: '₼',
                isDefault: false,
                details
            };
            if (!data.accounts) data.accounts = [];
            data.accounts.push(newAcc);
        }

        this.saveFinanceData(data);
        this.closeFinanceAccountModal();
        this.refreshFinanceCanvas();
        if (typeof App !== 'undefined') App.showToast(id ? 'Hesab yeniləndi' : 'Yeni hesab yaradıldı');
    },

    deleteFinanceAccount: function(id) {
        const data = this.getFinanceData();
        const acc = (data.accounts || []).find(a => a.id === id);
        if (!acc) return;
        if (acc.isDefault) {
            if (typeof App !== 'undefined') App.showToast('Əsas kassa hesabı silinə bilməz');
            return;
        }

        const confirmMsg = acc.balance > 0
            ? `<strong>"${acc.name}"</strong> hesabında <strong>${acc.balance.toFixed(2)} ₼</strong> vəsait var.<br><span class="text-amber-600 mt-1.5 inline-block text-xs">Silmədən öncə vəsaiti başqa hesaba köçürməyiniz tövsiyə olunur. Yenə də silinsin?</span>`
            : `<strong>"${acc.name}"</strong> hesabını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`;

        this.openDeleteConfirmModal({
            title: 'Hesabı sil',
            message: confirmMsg,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                data.accounts = data.accounts.filter(a => a.id !== id);
                this.saveFinanceData(data);
                this.refreshFinanceCanvas();
                if (typeof App !== 'undefined') App.showToast('Hesab silindi');
            }
        });
    },

    // 6. Category Management Handlers
    openFinanceCategoryModal: function(catId, prefillType) {
        const data = this.getFinanceData();
        const modal = document.getElementById('bizFinanceCategoryModal');
        if (!modal) return;

        this.financeEditingCatId = catId || null;
        const titleEl = document.getElementById('bizFinanceCategoryModalTitle');
        const idInput = document.getElementById('bizFinanceCatId');
        const nameInput = document.getElementById('bizFinanceCatName');
        const typeSelect = document.getElementById('bizFinanceCatType');

        if (catId) {
            const cat = (data.categories || []).find(c => c.id === catId);
            if (cat) {
                titleEl.textContent = 'Kateqoriyanı redaktə et';
                idInput.value = cat.id;
                nameInput.value = cat.name || '';
                typeSelect.value = cat.type || 'expense';
            }
        } else {
            titleEl.textContent = 'Yeni maliyyə kateqoriyası';
            idInput.value = '';
            nameInput.value = '';
            typeSelect.value = prefillType || 'expense';
        }

        modal.classList.remove('hidden');
    },

    toggleFinanceCategoryGroupCollapse: function(group) {
        if (!this.collapsedFinanceCatGroups) {
            this.collapsedFinanceCatGroups = { expense: false, income: false };
        }
        this.collapsedFinanceCatGroups[group] = !this.collapsedFinanceCatGroups[group];
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'categories') {
            sub.innerHTML = this.renderFinanceCategoriesSubTab(this.getFinanceData());
        }
    },

    toggleFinanceCategoryItems: function(catId) {
        if (!this.expandedFinanceCategoryItems) {
            this.expandedFinanceCategoryItems = {};
        }
        this.expandedFinanceCategoryItems[catId] = !this.expandedFinanceCategoryItems[catId];
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'categories') {
            sub.innerHTML = this.renderFinanceCategoriesSubTab(this.getFinanceData());
        }
    },

    viewFinanceCategoryTransactions: function(catId) {
        this.financeTxFilterCat = catId;
        this.switchFinanceSubTab('transactions');
    },

    closeFinanceCategoryModal: function() {
        const modal = document.getElementById('bizFinanceCategoryModal');
        if (modal) modal.classList.add('hidden');
        this.financeEditingCatId = null;
    },

    handleSaveFinanceCategory: function(e) {
        e.preventDefault();
        const data = this.getFinanceData();
        const id = document.getElementById('bizFinanceCatId').value;
        const name = document.getElementById('bizFinanceCatName').value.trim();
        const type = document.getElementById('bizFinanceCatType').value;

        if (id) {
            const cat = (data.categories || []).find(c => c.id === id);
            if (cat) {
                cat.name = name;
                cat.type = type;
            }
        } else {
            const newCat = {
                id: 'cat_' + Date.now(),
                name,
                type,
                icon: 'tag',
                count: 0,
                total: 0
            };
            if (!data.categories) data.categories = [];
            data.categories.push(newCat);
        }

        this.saveFinanceData(data);
        this.closeFinanceCategoryModal();
        this.refreshFinanceCanvas();
        if (typeof App !== 'undefined') App.showToast(id ? 'Kateqoriya yeniləndi' : 'Yeni kateqoriya əlavə edildi');
    },

    deleteFinanceCategory: function(id) {
        const data = this.getFinanceData();
        const cat = (data.categories || []).find(c => c.id === id);
        const catName = cat ? cat.name : 'Kateqoriya';

        this.openDeleteConfirmModal({
            title: 'Kateqoriyanı sil',
            message: `<strong>"${catName}"</strong> kateqoriyasını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                data.categories = (data.categories || []).filter(c => c.id !== id);
                this.saveFinanceData(data);
                this.refreshFinanceCanvas();
                if (typeof App !== 'undefined') App.showToast('Kateqoriya silindi');
            }
        });
    },

    // 7. Search, Filter & Pagination Helpers
    setFinanceTxSearch: function(val) {
        this.financeTxSearch = val;
        this.financeTxPage = 1;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'transactions') {
            sub.innerHTML = this.renderFinanceTransactionsSubTab(this.getFinanceData());
            const input = document.getElementById('bizFinanceTxSearchInput');
            if (input) {
                input.focus();
                const len = input.value.length;
                input.setSelectionRange(len, len);
            }
        }
    },

    clearFinanceTxSearch: function() {
        this.financeTxSearch = '';
        this.financeTxPage = 1;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'transactions') {
            sub.innerHTML = this.renderFinanceTransactionsSubTab(this.getFinanceData());
        }
    },

    setFinanceTxType: function(val) {
        this.financeTxFilterType = val;
        this.financeTxPage = 1;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'transactions') {
            sub.innerHTML = this.renderFinanceTransactionsSubTab(this.getFinanceData());
        }
    },

    setFinanceTxAccount: function(val) {
        this.financeTxFilterAcc = val;
        this.financeTxPage = 1;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'transactions') {
            sub.innerHTML = this.renderFinanceTransactionsSubTab(this.getFinanceData());
        }
    },

    setFinanceTxCategory: function(val) {
        this.financeTxFilterCat = val;
        this.financeTxPage = 1;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'transactions') {
            sub.innerHTML = this.renderFinanceTransactionsSubTab(this.getFinanceData());
        }
    },

    resetAllFinanceTxFilters: function() {
        this.financeTxSearch = '';
        this.financeTxFilterType = 'all';
        this.financeTxFilterAcc = 'all';
        this.financeTxFilterCat = 'all';
        this.financeTxPage = 1;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'transactions') {
            sub.innerHTML = this.renderFinanceTransactionsSubTab(this.getFinanceData());
        }
    },

    setFinanceTxPage: function(page) {
        this.financeTxPage = page;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'transactions') {
            sub.innerHTML = this.renderFinanceTransactionsSubTab(this.getFinanceData());
        }
    },

    setFinanceTxPageSize: function(size) {
        this.financeTxPageSize = parseInt(size, 10) || 10;
        this.financeTxPage = 1;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'transactions') {
            sub.innerHTML = this.renderFinanceTransactionsSubTab(this.getFinanceData());
        }
    },

    // 8. Finance Transactions Filter Modal Handlers
    filterModalTempTxType: 'all',

    openFinanceTxFilterModal: function() {
        const modal = document.getElementById('bizFinanceTxFilterModal');
        if (!modal) return;

        const data = this.getFinanceData();
        const accounts = data.accounts || [];
        const categories = data.categories || [];

        this.filterModalTempTxType = this.financeTxFilterType || 'all';
        this.selectFinanceFilterType(this.filterModalTempTxType);

        const accSelect = document.getElementById('bizFinanceFilterModalAcc');
        if (accSelect) {
            accSelect.innerHTML = `<option value="all">Bütün hesablar</option>` + accounts.map(a => `<option value="${a.id}" ${this.financeTxFilterAcc === a.id ? 'selected' : ''}>${a.name}</option>`).join('');
            accSelect.value = this.financeTxFilterAcc || 'all';
        }

        const catSelect = document.getElementById('bizFinanceFilterModalCat');
        if (catSelect) {
            catSelect.innerHTML = `<option value="all">Bütün kateqoriyalar</option>` + categories.map(c => `<option value="${c.id}" ${this.financeTxFilterCat === c.id ? 'selected' : ''}>${c.name}</option>`).join('');
            catSelect.value = this.financeTxFilterCat || 'all';
        }

        modal.classList.remove('hidden');
    },

    closeFinanceTxFilterModal: function() {
        const modal = document.getElementById('bizFinanceTxFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectFinanceFilterType: function(type) {
        this.filterModalTempTxType = type;
        ['all', 'income', 'expense', 'transfer'].forEach(t => {
            const btn = document.getElementById(`bizTxFilterTypeBtn_${t}`);
            if (btn) {
                if (t === type) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    applyFinanceTxModalFilters: function() {
        this.financeTxFilterType = this.filterModalTempTxType || 'all';
        const accSelect = document.getElementById('bizFinanceFilterModalAcc');
        if (accSelect) this.financeTxFilterAcc = accSelect.value;
        const catSelect = document.getElementById('bizFinanceFilterModalCat');
        if (catSelect) this.financeTxFilterCat = catSelect.value;

        this.financeTxPage = 1;
        this.closeFinanceTxFilterModal();
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'transactions') {
            sub.innerHTML = this.renderFinanceTransactionsSubTab(this.getFinanceData());
        }
    },

    resetFinanceTxModalFilters: function() {
        this.filterModalTempTxType = 'all';
        this.selectFinanceFilterType('all');
        const accSelect = document.getElementById('bizFinanceFilterModalAcc');
        if (accSelect) accSelect.value = 'all';
        const catSelect = document.getElementById('bizFinanceFilterModalCat');
        if (catSelect) catSelect.value = 'all';
    },

    // 9. Finance Export to Email Handlers
    openFinanceExportEmailModal: function() {
        const modal = document.getElementById('bizFinanceExportEmailModal');
        if (!modal) return;

        const data = this.getFinanceData();
        let txs = data.transactions || [];
        const q = (this.financeTxSearch || '').trim().toLowerCase();
        if (q) {
            txs = txs.filter(t => (t.title && t.title.toLowerCase().includes(q)) || (t.counterparty && t.counterparty.toLowerCase().includes(q)) || (t.note && t.note.toLowerCase().includes(q)));
        }
        if (this.financeTxFilterType && this.financeTxFilterType !== 'all') {
            txs = txs.filter(t => t.type === this.financeTxFilterType);
        }
        if (this.financeTxFilterAcc && this.financeTxFilterAcc !== 'all') {
            txs = txs.filter(t => t.accountId === this.financeTxFilterAcc || t.toAccountId === this.financeTxFilterAcc);
        }
        if (this.financeTxFilterCat && this.financeTxFilterCat !== 'all') {
            txs = txs.filter(t => t.categoryId === this.financeTxFilterCat);
        }

        const summaryEl = document.getElementById('bizFinanceExportSummaryText');
        if (summaryEl) {
            summaryEl.textContent = `Cari filtrlərə uyğun: ${txs.length} əməliyyat daxildir.`;
        }

        const emailInput = document.getElementById('bizFinanceExportEmailInput');
        if (emailInput) {
            const partner = (typeof this.getPartnerUser === 'function') ? this.getPartnerUser() : null;
            const accountEmail = (partner && partner.email) ? partner.email : (
                (typeof App !== 'undefined' && App.currentUser && App.currentUser.email) ? App.currentUser.email : ''
            );
            const defaultEmail = accountEmail || localStorage.getItem('zeyvo_finance_export_email') || 'demo@zeyvobusiness.az';
            emailInput.value = defaultEmail;
        }

        const errEl = document.getElementById('bizFinanceExportEmailError');
        if (errEl) errEl.classList.add('hidden');

        modal.classList.remove('hidden');
    },

    closeFinanceExportEmailModal: function() {
        const modal = document.getElementById('bizFinanceExportEmailModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSendFinanceExportEmail: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const emailInput = document.getElementById('bizFinanceExportEmailInput');
        const errEl = document.getElementById('bizFinanceExportEmailError');
        const sendBtn = document.getElementById('bizFinanceExportSendBtn');

        const email = emailInput ? emailInput.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            if (errEl) errEl.classList.remove('hidden');
            if (emailInput) emailInput.focus();
            return;
        }
        if (errEl) errEl.classList.add('hidden');

        // Remember email
        localStorage.setItem('zeyvo_finance_export_email', email);

        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.innerHTML = `
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                <span>Göndərilir...</span>
            `;
        }

        setTimeout(() => {

            if (sendBtn) {
                sendBtn.disabled = false;
                sendBtn.innerHTML = `
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    <span>Hesabatı göndər</span>
                `;
            }

            this.closeFinanceExportEmailModal();

            if (typeof App !== 'undefined') {
                App.showToast(`Maliyyə hesabatı uğurla ${email} ünvanına göndərildi!`);
            }
        }, 500);
    },

    setFinancePayrollSearch: function(val) {
        this.financePayrollSearch = val;
        this.financePayrollPage = 1;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'payroll') {
            sub.innerHTML = this.renderFinancePayrollSubTab(this.getFinanceData());
        }
    },

    setFinancePayrollPage: function(page) {
        this.financePayrollPage = page;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'payroll') {
            sub.innerHTML = this.renderFinancePayrollSubTab(this.getFinanceData());
        }
    },

    setFinancePayrollPageSize: function(size) {
        this.financePayrollPageSize = parseInt(size, 10) || 10;
        this.financePayrollPage = 1;
        const sub = document.getElementById('bizFinanceSubContent');
        if (sub && this.financeActiveTab === 'payroll') {
            sub.innerHTML = this.renderFinancePayrollSubTab(this.getFinanceData());
        }
    },

    exportFinanceTransactionsCsv: function() {
        const data = this.getFinanceData();
        const txs = data.transactions || [];
        if (txs.length === 0) {
            if (typeof App !== 'undefined') App.showToast('İxrac üçün əməliyyat tapılmadı');
            return;
        }

        let csv = 'ID,Tarix,Vaxt,Nov,Mebleg,Teyinat,QarsiTeref,Hesab,Qeyd\n';
        txs.forEach(t => {
            csv += `"${t.id}","${t.date}","${t.time || ''}","${t.type}","${t.amount}","${(t.title || '').replace(/"/g, '""')}","${(t.counterparty || '').replace(/"/g, '""')}","${t.accountId}","${(t.note || '').replace(/"/g, '""')}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `zeyvo_maliyye_emeliyyatlar_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if (typeof App !== 'undefined') App.showToast('Maliyyə hesabatı CSV kimi endirildi');
    },

    // ==========================================
});
