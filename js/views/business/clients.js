// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {
    // MODULE: CLIENTS (CRM)
    // ==========================================
    clientsFilterCategory: 'all', // 'all', 'vip', 'regular', 'new', 'risk'
    clientsActiveTab: 'all',
    clientsSearch: '',
    clientsFilterGender: 'all', // 'all', 'female', 'male'
    clientsSortBy: 'recent', // 'recent', 'visits_desc', 'spent_desc', 'name_asc', 'name_desc'
    clientsFilterTempCategory: 'all',
    clientsFilterTempGender: 'all',
    clientsFilterTempSort: 'recent',
    clientsPage: 1,
    clientsPageSize: 10,
    clientsEditingId: null,
    clientsViewingProfileId: null,
    clientsActiveModalTab: 'info', // 'info', 'history', 'stats'
    clientsQuickVisitOpen: false,

    getClientsData: function() {
        const key = this.storageKey('zeyvo_business_clients_v1');
        let raw = localStorage.getItem(key);
        if (!raw) {
            if (key !== 'zeyvo_business_clients_v1') return [];
            const defaults = this.getDefaultClientsList();
            this.saveClientsData(defaults);
            return defaults;
        }
        try {
            return JSON.parse(raw);
        } catch (e) {
            console.error('Error parsing clients data', e);
            return [];
        }
    },

    saveClientsData: function(data) {
        localStorage.setItem(this.storageKey('zeyvo_business_clients_v1'), JSON.stringify(data));
    },

    getClientsBadgeCount: function() {
        return this.getClientsData().length;
    },

    refreshClientsCanvas: function() {
        const body = document.getElementById('bizCanvasBody');
        if (body && this.activeTab === 'clients') {
            body.innerHTML = this.renderActiveTabContent();
        }
    },

    getDefaultClientsList: function() {
        return [
            {
                id: 'CLI-1001',
                name: 'Sevinc Qasımova',
                phone: '+994 50 450-80-90',
                email: 'sevinc.qasimova@mail.az',
                gender: 'female',
                category: 'vip',
                birthDate: '1991-04-18',
                totalVisits: 18,
                totalSpent: 1680.00,
                depositBalance: 145.00,
                cashbackBalance: 62.50,
                discountPercent: 10,
                lastVisitDate: '2026-03-28',
                firstVisitDate: '2024-05-10',
                preferredStaff: 'Aytən Məmmədova',
                note: 'Saç boyanması üçün yalnız premium L’Oreal İnoa tələb edir. Qəhvə sevir.',
                history: [
                    { id: 'VIS-901', date: '2026-03-28', service: 'Balayaj və saç kəsimi', staff: 'Aytən Məmmədova', amount: 160, status: 'Tamamlandı' },
                    { id: 'VIS-854', date: '2026-02-14', service: 'Kompleks saç qulluğu və fen', staff: 'Aytən Məmmədova', amount: 85, status: 'Tamamlandı' },
                    { id: 'VIS-780', date: '2025-12-29', service: 'Yeni il stilizasiyası', staff: 'Aytən Məmmədova', amount: 120, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1002',
                name: 'Murad Babayev',
                phone: '+994 55 777-12-34',
                email: 'murad.babayev@code.az',
                gender: 'male',
                category: 'regular',
                birthDate: '1988-11-03',
                totalVisits: 8,
                totalSpent: 340.00,
                depositBalance: 30.00,
                cashbackBalance: 15.00,
                discountPercent: 5,
                lastVisitDate: '2026-03-25',
                firstVisitDate: '2025-02-10',
                preferredStaff: 'Fərid Əliyev',
                note: 'Klassik kişi saç kəsimi və saqqal düzümü.',
                history: [
                    { id: 'VIS-899', date: '2026-03-25', service: 'Kişi saç kəsimi və saqqal', staff: 'Fərid Əliyev', amount: 45, status: 'Tamamlandı' },
                    { id: 'VIS-832', date: '2026-02-04', service: 'Kişi saç kəsimi', staff: 'Fərid Əliyev', amount: 35, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1003',
                name: 'Fidan Qasımova',
                phone: '+994 50 234-56-78',
                email: 'fidan.qasimova@gmail.com',
                gender: 'female',
                category: 'vip',
                birthDate: '1995-07-22',
                totalVisits: 24,
                totalSpent: 2450.00,
                depositBalance: 250.00,
                cashbackBalance: 115.00,
                discountPercent: 15,
                lastVisitDate: '2026-04-01',
                firstVisitDate: '2023-11-15',
                preferredStaff: 'Nərmin Əhmədova',
                note: 'Hər 2 həftədən bir manikür və pedikür üçün gəlir. Daim VIP çay dəsti təklif olunur.',
                history: [
                    { id: 'VIS-910', date: '2026-04-01', service: 'Smart pedikür və shellac', staff: 'Nərmin Əhmədova', amount: 95, status: 'Tamamlandı' },
                    { id: 'VIS-872', date: '2026-03-14', service: 'Aparat manikürü və dizayn', staff: 'Nərmin Əhmədova', amount: 75, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1004',
                name: 'Rauf Əliyev',
                phone: '+994 55 888-12-34',
                email: 'rauf.aliyev@caspian.az',
                gender: 'male',
                category: 'regular',
                birthDate: '1992-09-14',
                totalVisits: 6,
                totalSpent: 210.00,
                depositBalance: 0.00,
                cashbackBalance: 12.00,
                discountPercent: 0,
                lastVisitDate: '2026-03-12',
                firstVisitDate: '2025-08-20',
                preferredStaff: 'Fərid Əliyev',
                note: 'Qısa fade kəsim xoşlayır.',
                history: [
                    { id: 'VIS-866', date: '2026-03-12', service: 'Fade saç kəsimi', staff: 'Fərid Əliyev', amount: 35, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1005',
                name: 'Aysel Quliyeva',
                phone: '+994 70 555-90-12',
                email: 'aysel.q@box.az',
                gender: 'female',
                category: 'vip',
                birthDate: '1990-02-28',
                totalVisits: 15,
                totalSpent: 1890.00,
                depositBalance: 180.00,
                cashbackBalance: 74.00,
                discountPercent: 10,
                lastVisitDate: '2026-03-30',
                firstVisitDate: '2024-03-18',
                preferredStaff: 'Leyla Həsənova',
                note: 'Üz təmizlənməsi və botox prosedurları üçün daimi pasiyent.',
                history: [
                    { id: 'VIS-905', date: '2026-03-30', service: 'Biorevitalizasiya və qulluq', staff: 'Leyla Həsənova', amount: 220, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1006',
                name: 'Nərgiz Məmmədli',
                phone: '+994 50 321-44-55',
                email: 'nargiz.m@baku.az',
                gender: 'female',
                category: 'risk',
                birthDate: '1987-12-05',
                totalVisits: 11,
                totalSpent: 980.00,
                depositBalance: 20.00,
                cashbackBalance: 34.00,
                discountPercent: 5,
                lastVisitDate: '2025-12-14',
                firstVisitDate: '2024-01-20',
                preferredStaff: 'Aytən Məmmədova',
                note: 'Artıq 3 aydan çoxdur ziyarət etməyib. Zəng edilib xüsusi endirim təklif olunmalıdır.',
                history: [
                    { id: 'VIS-760', date: '2025-12-14', service: 'Keratin düzləşdirmə', staff: 'Aytən Məmmədova', amount: 180, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1007',
                name: 'Vüsal İsmayılov',
                phone: '+994 77 412-99-00',
                email: 'vusal.ismayilov@it.az',
                gender: 'male',
                category: 'vip',
                birthDate: '1985-06-19',
                totalVisits: 19,
                totalSpent: 1420.00,
                depositBalance: 90.00,
                cashbackBalance: 55.00,
                discountPercent: 10,
                lastVisitDate: '2026-03-29',
                firstVisitDate: '2024-06-10',
                preferredStaff: 'Fərid Əliyev',
                note: 'VIP kabinetdə qulluq sevir, həmişə ekspress xidmət tələb edir.',
                history: [
                    { id: 'VIS-902', date: '2026-03-29', service: 'Kompleks barber qulluğu və spa', staff: 'Fərid Əliyev', amount: 90, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1008',
                name: 'Leyla Nəsirova',
                phone: '+994 51 908-11-22',
                email: 'leyla.nesirova@art.az',
                gender: 'female',
                category: 'regular',
                birthDate: '1996-03-15',
                totalVisits: 7,
                totalSpent: 540.00,
                depositBalance: 15.00,
                cashbackBalance: 22.00,
                discountPercent: 5,
                lastVisitDate: '2026-03-18',
                firstVisitDate: '2025-05-12',
                preferredStaff: 'Nərmin Əhmədova',
                note: 'Həssas dərisi var, yalnız hipoallergen vasitələrdən istifadə olunmalıdır.',
                history: [
                    { id: 'VIS-880', date: '2026-03-18', service: 'Klassik manikür və lak', staff: 'Nərmin Əhmədova', amount: 45, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1009',
                name: 'Elvin Məmmədov',
                phone: '+994 50 670-33-44',
                email: 'elvin.m@finance.az',
                gender: 'male',
                category: 'new',
                birthDate: '1998-08-30',
                totalVisits: 1,
                totalSpent: 45.00,
                depositBalance: 0.00,
                cashbackBalance: 2.25,
                discountPercent: 0,
                lastVisitDate: '2026-04-02',
                firstVisitDate: '2026-04-02',
                preferredStaff: 'Fərid Əliyev',
                note: 'Instagram reklamı vasitəsilə qeydiyyatdan keçib. İlk təəssüratı çox müsbətdir.',
                history: [
                    { id: 'VIS-915', date: '2026-04-02', service: 'Kişi saç kəsimi və yuma', staff: 'Fərid Əliyev', amount: 45, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1010',
                name: 'Səbinə Rəhimova',
                phone: '+994 55 601-23-45',
                email: 'sebine.r@design.az',
                gender: 'female',
                category: 'regular',
                birthDate: '1993-10-12',
                totalVisits: 9,
                totalSpent: 780.00,
                depositBalance: 40.00,
                cashbackBalance: 31.00,
                discountPercent: 5,
                lastVisitDate: '2026-03-22',
                firstVisitDate: '2025-01-15',
                preferredStaff: 'Aytən Məmmədova',
                note: 'Saç burulması və axşam düzümü.',
                history: [
                    { id: 'VIS-890', date: '2026-03-22', service: 'Axşam saç düzümü və makiyaj', staff: 'Aytən Məmmədova', amount: 110, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1011',
                name: 'Kənan Cəfərov',
                phone: '+994 70 812-34-56',
                email: 'kenan.c@baku.az',
                gender: 'male',
                category: 'new',
                birthDate: '2001-01-25',
                totalVisits: 1,
                totalSpent: 35.00,
                depositBalance: 0.00,
                cashbackBalance: 1.75,
                discountPercent: 0,
                lastVisitDate: '2026-04-03',
                firstVisitDate: '2026-04-03',
                preferredStaff: 'Fərid Əliyev',
                note: 'Dostunun tövsiyəsi ilə gəlib.',
                history: [
                    { id: 'VIS-918', date: '2026-04-03', service: 'Kişi saç kəsimi', staff: 'Fərid Əliyev', amount: 35, status: 'Tamamlandı' }
                ]
            },
            {
                id: 'CLI-1012',
                name: 'Nigar Əsədova',
                phone: '+994 50 499-88-77',
                email: 'nigar.asedova@bank.az',
                gender: 'female',
                category: 'regular',
                birthDate: '1994-05-08',
                totalVisits: 5,
                totalSpent: 410.00,
                depositBalance: 10.00,
                cashbackBalance: 18.00,
                discountPercent: 5,
                lastVisitDate: '2026-03-15',
                firstVisitDate: '2025-09-01',
                preferredStaff: 'Leyla Həsənova',
                note: 'Göz ətrafı dəriyə xüsusi həssaslıqla qulluq edilir.',
                history: [
                    { id: 'VIS-875', date: '2026-03-15', service: 'Üz masajı və kollagen maska', staff: 'Leyla Həsənova', amount: 80, status: 'Tamamlandı' }
                ]
            }
        ];
    },

    // Category styling helper
    getClientCategoryBadge: function(category) {
        switch (category) {
            case 'vip':
                return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/60 shadow-2xs">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>VIP</span>
                </span>`;
            case 'regular':
                return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Daimi</span>
                </span>`;
            case 'new':
                return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-2xs">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>Yeni</span>
                </span>`;
            case 'risk':
                return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/60 shadow-2xs">
                    <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span>Risk qrupu</span>
                </span>`;
            default:
                return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">
                    <span>${category || 'Standart'}</span>
                </span>`;
        }
    },

    // Phone normalization helpers
    normalizeAzPhone: function(phoneStr) {
        if (!phoneStr) return '';
        let digits = String(phoneStr).replace(/\D/g, '');
        if (digits.startsWith('994')) digits = digits.slice(3);
        if (digits.startsWith('0')) digits = digits.slice(1);
        digits = digits.slice(0, 9);
        if (digits.length === 0) return '';
        const op = digits.slice(0, 2);
        const d1 = digits.slice(2, 5);
        const d2 = digits.slice(5, 7);
        const d3 = digits.slice(7, 9);
        let formatted = `+994 ${op}`;
        if (d1) formatted += ` ${d1}`;
        if (d2) formatted += `-${d2}`;
        if (d3) formatted += `-${d3}`;
        return formatted.trim();
    },

    getCleanPhoneDigits: function(phoneStr) {
        if (!phoneStr) return '';
        let digits = String(phoneStr).replace(/\D/g, '');
        if (digits.startsWith('994')) digits = digits.slice(3);
        if (digits.startsWith('0')) digits = digits.slice(1);
        return digits;
    },

    // Check if client has birthday in the upcoming N days
    isClientUpcomingBirthday: function(client, daysAhead = 30) {
        if (!client || !client.birthDate) return false;
        const parts = client.birthDate.split('-');
        if (parts.length < 3) return false;
        const bMonth = parseInt(parts[1], 10) - 1;
        const bDay = parseInt(parts[2], 10);
        if (isNaN(bMonth) || isNaN(bDay)) return false;

        const now = new Date();
        const currentYear = now.getFullYear();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        let bDate = new Date(currentYear, bMonth, bDay);
        let diffMs = bDate.getTime() - todayStart;
        let diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays < 0) {
            bDate = new Date(currentYear + 1, bMonth, bDay);
            diffMs = bDate.getTime() - todayStart;
            diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        }
        return diffDays >= 0 && diffDays <= daysAhead;
    },

    getClientDaysUntilBirthday: function(client) {
        if (!client || !client.birthDate) return null;
        const parts = client.birthDate.split('-');
        if (parts.length < 3) return null;
        const bMonth = parseInt(parts[1], 10) - 1;
        const bDay = parseInt(parts[2], 10);
        if (isNaN(bMonth) || isNaN(bDay)) return null;

        const now = new Date();
        const currentYear = now.getFullYear();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        let bDate = new Date(currentYear, bMonth, bDay);
        let diffMs = bDate.getTime() - todayStart;
        let diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays < 0) {
            bDate = new Date(currentYear + 1, bMonth, bDay);
            diffMs = bDate.getTime() - todayStart;
            diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        }
        return diffDays;
    },

    // Format relative time in Azerbaijani with dynamic date
    formatClientRelativeDate: function(dateStr) {
        if (!dateStr) return 'Məlumat yoxdur';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const visitDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const diffMs = today.getTime() - visitDay.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Bugün';
        if (diffDays === 1) return 'Dünən';
        if (diffDays > 1 && diffDays < 30) return `${diffDays} gün əvvəl`;
        if (diffDays >= 30 && diffDays < 60) return '1 ay əvvəl';
        if (diffDays >= 60 && diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} ay əvvəl`;
        }
        if (diffDays >= 365) {
            const years = Math.floor(diffDays / 365);
            return `${years} il əvvəl`;
        }
        if (diffDays < 0) return 'Gələcək tarix';
        return dateStr;
    },

    // Main module view
    renderClientsModule: function() {
        const allClients = this.getClientsData();
        const activeSub = this.clientsActiveTab || 'all';

        // Filter counts
        const allCount = allClients.length;
        const vipCount = allClients.filter(c => c.category === 'vip').length;
        const regularCount = allClients.filter(c => c.category === 'regular').length;
        const newCount = allClients.filter(c => c.category === 'new').length;
        const riskCount = allClients.filter(c => c.category === 'risk').length;
        const birthdayCount = allClients.filter(c => this.isClientUpcomingBirthday(c, 30)).length;

        // Sub-tabs configuration (Strictly compliant with GEMINI.md Rule 3: Segmented Controls & Sub-tabs)
        const subTabs = [
            { id: 'all', label: 'Bütün müştərilər', badge: allCount },
            { id: 'regular', label: 'Daimi', badge: regularCount },
            { id: 'vip', label: 'VIP müştərilər', badge: vipCount },
            { id: 'new', label: 'Yeni', badge: newCount },
            { id: 'birthdays', label: 'Ad günləri', badge: birthdayCount },
            { id: 'risk', label: 'Risk qrupu', badge: riskCount }
        ];

        // Overall stats
        const totalRevenue = allClients.reduce((acc, c) => acc + (parseFloat(c.totalSpent) || 0), 0);
        const totalVisits = allClients.reduce((acc, c) => acc + (parseInt(c.totalVisits, 10) || 0), 0);
        const avgCheck = totalVisits > 0 ? (totalRevenue / totalVisits).toFixed(1) : '0';
        const regularAndVipCount = vipCount + regularCount;
        const loyalPercent = allCount > 0 ? Math.round((regularAndVipCount / allCount) * 100) : 0;

        let filtered = allClients;

        // 1. Apply Sub-tab filter
        if (activeSub === 'vip') {
            filtered = filtered.filter(c => c.category === 'vip');
        } else if (activeSub === 'regular') {
            filtered = filtered.filter(c => c.category === 'regular');
        } else if (activeSub === 'new') {
            filtered = filtered.filter(c => c.category === 'new');
        } else if (activeSub === 'risk') {
            filtered = filtered.filter(c => c.category === 'risk');
        } else if (activeSub === 'birthdays') {
            filtered = filtered.filter(c => this.isClientUpcomingBirthday(c, 30));
        }

        // 2. Apply category filter from modal (if explicitly set)
        const categoryFilter = this.clientsFilterCategory || 'all';
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(c => c.category === categoryFilter);
        }

        // 3. Apply search with text & digit normalization
        const query = (this.clientsSearch || '').toLowerCase().trim();
        const queryDigits = (this.clientsSearch || '').replace(/\D/g, '');
        if (query) {
            filtered = filtered.filter(c => {
                const name = (c.name || '').toLowerCase();
                const phone = (c.phone || '').toLowerCase();
                const phoneDigits = (c.phone || '').replace(/\D/g, '');
                const email = (c.email || '').toLowerCase();
                const id = (c.id || '').toLowerCase();
                const matchDigits = queryDigits.length >= 2 && phoneDigits.includes(queryDigits);
                return name.includes(query) || phone.includes(query) || matchDigits || email.includes(query) || id.includes(query);
            });
        }

        // 4. Apply gender filter
        if (this.clientsFilterGender && this.clientsFilterGender !== 'all') {
            filtered = filtered.filter(c => c.gender === this.clientsFilterGender);
        }

        // 5. Apply sort
        const sortBy = this.clientsSortBy || 'recent';
        filtered.sort((a, b) => {
            if (sortBy === 'recent') {
                return new Date(b.lastVisitDate || 0) - new Date(a.lastVisitDate || 0);
            }
            if (sortBy === 'visits_desc') {
                return (b.totalVisits || 0) - (a.totalVisits || 0);
            }
            if (sortBy === 'spent_desc') {
                return (b.totalSpent || 0) - (a.totalSpent || 0);
            }
            if (sortBy === 'name_asc') {
                return (a.name || '').localeCompare(b.name || '');
            }
            if (sortBy === 'name_desc') {
                return (b.name || '').localeCompare(a.name || '');
            }
            return 0;
        });

        // Pagination
        const totalItems = filtered.length;
        const pageSize = this.clientsPageSize || 10;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        const currentPage = Math.min(Math.max(1, this.clientsPage || 1), totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedClients = filtered.slice(startIndex, startIndex + pageSize);

        let activeFilterCount = 0;
        if (categoryFilter !== 'all') activeFilterCount++;
        if (this.clientsFilterGender && this.clientsFilterGender !== 'all') activeFilterCount++;
        if (sortBy !== 'recent') activeFilterCount++;

        const hasActiveFilter = (query !== '' || activeFilterCount > 0);

        return `
            <div class="max-w-7xl mx-auto px-4 py-5 sm:px-7 sm:py-7 space-y-6">

                <!-- TOP SEGMENTED NAVIGATION (Standard App Component: GEMINI.md Rule 3) -->
                <div>
                    ${this.renderSegmentedTabs({
                        tabs: subTabs,
                        activeId: activeSub,
                        onSelect: 'BusinessDashboardView.switchClientsTab'
                    })}
                </div>

                <!-- 1. SUMMARY STATS CARDS (4 Interactive Cards) -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <!-- Total clients -->
                    <button type="button"
                            onclick="BusinessDashboardView.switchClientsTab('all')"
                            class="p-4 sm:p-5 rounded-2xl bg-white border ${activeSub === 'all' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200/90'} shadow-2xs space-y-2 text-left cursor-pointer hover:border-slate-300 transition active:scale-[0.99] group">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition">Cəmi müştəri</span>
                            <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                        </div>
                        <div class="flex items-baseline justify-between">
                            <span class="text-2xl font-bold text-slate-900">${allCount}</span>
                            <span class="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">+100% baza</span>
                        </div>
                    </button>

                    <!-- Regular & VIP clients -->
                    <button type="button"
                            onclick="BusinessDashboardView.switchClientsTab('vip')"
                            class="p-4 sm:p-5 rounded-2xl bg-white border ${activeSub === 'vip' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200/90'} shadow-2xs space-y-2 text-left cursor-pointer hover:border-slate-300 transition active:scale-[0.99] group">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition">Daimi və VIP</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </div>
                        </div>
                        <div class="flex items-baseline justify-between">
                            <span class="text-2xl font-bold text-slate-900">${regularAndVipCount}</span>
                            <span class="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">${loyalPercent}% sadiqlik</span>
                        </div>
                    </button>

                    <!-- Total revenue -->
                    <button type="button"
                            onclick="BusinessDashboardView.setClientsSort('spent_desc')"
                            class="p-4 sm:p-5 rounded-2xl bg-white border ${sortBy === 'spent_desc' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200/90'} shadow-2xs space-y-2 text-left cursor-pointer hover:border-slate-300 transition active:scale-[0.99] group"
                            title="Xərclərə görə sırala">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition">Toplam gəlir</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                            </div>
                        </div>
                        <div class="flex items-baseline justify-between">
                            <span class="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString('az-AZ')} ₼</span>
                            <span class="text-[11px] font-semibold text-slate-500">cəmi xərclər</span>
                        </div>
                    </button>

                    <!-- Average check -->
                    <button type="button"
                            onclick="BusinessDashboardView.setClientsSort('visits_desc')"
                            class="p-4 sm:p-5 rounded-2xl bg-white border ${sortBy === 'visits_desc' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200/90'} shadow-2xs space-y-2 text-left cursor-pointer hover:border-slate-300 transition active:scale-[0.99] group"
                            title="Qəbul sayına görə sırala">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition">Orta qəbul çeki</span>
                            <div class="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            </div>
                        </div>
                        <div class="flex items-baseline justify-between">
                            <span class="text-2xl font-bold text-slate-900">${avgCheck} ₼</span>
                            <span class="text-[11px] font-semibold text-slate-500">${totalVisits} qəbul</span>
                        </div>
                    </button>
                </div>

                <!-- 2. SEARCH & FILTERS BAR (Consistent with Staff, Finance, Products) -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <!-- Search Input -->
                        <div class="relative flex-1 min-w-0">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="clientsSearchInput"
                                   placeholder="Ad, telefon, email və ya ID üzrə axtarış..."
                                   value="${this.escapeHtml(this.clientsSearch || '')}"
                                   oninput="BusinessDashboardView.setClientsSearch(this.value)"
                                   class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                            <button type="button"
                                    id="clientsSearchClearBtn"
                                    onclick="BusinessDashboardView.clearClientsSearch()"
                                    class="${this.clientsSearch ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
                                    title="Təmizlə">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                            </button>
                        </div>

                        <!-- Filter Button -->
                        <button type="button"
                                onclick="BusinessDashboardView.openClientsFilterModal()"
                                class="h-11 px-4 rounded-2xl bg-white border ${activeFilterCount > 0 ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 bg-amber-50/20' : 'border-slate-200/80 hover:border-slate-300'} text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0"
                                title="Filtrlər pəncərəsi">
                            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                            <span class="hidden sm:inline">Filtrlər</span>
                            ${activeFilterCount > 0 ? `
                                <span class="w-5 h-5 rounded-full bg-[#101114] text-white text-[10px] font-bold flex items-center justify-center -mr-1">
                                    ${activeFilterCount}
                                </span>
                            ` : ''}
                        </button>
                    </div>

                    <!-- Active Filter Pills -->
                    ${(activeFilterCount > 0 || this.clientsSearch) ? `
                        <div class="flex items-center gap-2 flex-wrap pt-0.5 text-xs">
                            <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                            ${this.clientsSearch ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-medium text-[11px]">
                                    <span>Axtarış: "${this.escapeHtml(this.clientsSearch)}"</span>
                                    <button type="button" onclick="BusinessDashboardView.clearClientsSearch()" class="text-slate-400 hover:text-rose-600 transition cursor-pointer flex items-center" title="Sil">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                    </button>
                                </span>
                            ` : ''}

                            ${this.clientsFilterCategory && this.clientsFilterCategory !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Kateqoriya: ${this.getClientCategoryLabel(this.clientsFilterCategory)}</span>
                                    <button type="button" onclick="BusinessDashboardView.setClientsFilterCategory('all')" class="text-amber-600 hover:text-rose-600 transition cursor-pointer flex items-center" title="Sil">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                    </button>
                                </span>
                            ` : ''}

                            ${this.clientsFilterGender && this.clientsFilterGender !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/70 font-semibold text-[11px]">
                                    <span>Cins: ${this.clientsFilterGender === 'female' ? 'Xanımlar' : (this.clientsFilterGender === 'male' ? 'Bəylər' : 'Digər')}</span>
                                    <button type="button" onclick="BusinessDashboardView.setClientsFilterGender('all')" class="text-blue-600 hover:text-rose-600 transition cursor-pointer flex items-center" title="Sil">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                    </button>
                                </span>
                            ` : ''}

                            ${this.clientsSortBy && this.clientsSortBy !== 'recent' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 text-purple-900 border border-purple-200/70 font-semibold text-[11px]">
                                    <span>Sıralama: ${this.getClientSortLabel(this.clientsSortBy)}</span>
                                    <button type="button" onclick="BusinessDashboardView.setClientsSort('recent')" class="text-purple-600 hover:text-rose-600 transition cursor-pointer flex items-center" title="Sil">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                    </button>
                                </span>
                            ` : ''}

                            <button type="button" onclick="BusinessDashboardView.resetClientsFilters()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline underline-offset-2 ml-1 cursor-pointer">
                                Bütün filtrləri sıfırla
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- 4. CLIENTS DATA TABLE -->
                <div class="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs font-semibold min-w-[800px]">
                            <thead class="bg-slate-50 text-slate-500 border-b border-slate-200/80">
                                <tr>
                                    <th class="py-3 px-4">Müştəri</th>
                                    <th class="py-3 px-4">Əlaqə məlumatları</th>
                                    <th class="py-3 px-4">Kateqoriya</th>
                                    <th class="py-3 px-4">Balanslar</th>
                                    <th class="py-3 px-4">Qəbullar və məbləğ</th>
                                    <th class="py-3 px-4">Sonuncu ziyarət</th>
                                    <th class="py-3 px-4 sm:px-5 text-right whitespace-nowrap">Fəaliyyət</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-slate-700">
                                ${paginatedClients.length === 0 ? `
                                    <tr>
                                        <td colspan="7" class="py-12 px-4 text-center">
                                            <div class="max-w-xs mx-auto space-y-2">
                                                <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                                                </div>
                                                <p class="text-sm font-semibold text-slate-900">Müştəri tapılmadı</p>
                                                <p class="text-xs text-slate-400 font-normal">Axtarış meyarlarını dəyişin və ya yeni müştəri əlavə edin</p>
                                                ${hasActiveFilter ? `
                                                    <button type="button" onclick="BusinessDashboardView.resetClientsFilters()" class="mt-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition">
                                                        Filtrləri sıfırla
                                                    </button>
                                                ` : ''}
                                            </div>
                                        </td>
                                    </tr>
                                ` : paginatedClients.map(c => {
                                    const initials = (c.name || 'M').split(' ').map(n => n[0]).slice(0, 2).join('');
                                    const avatarBg = c.gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800';
                                    const relativeLast = this.formatClientRelativeDate(c.lastVisitDate);
                                    const depositVal = parseFloat(c.depositBalance) || 0;
                                    const cashbackVal = parseFloat(c.cashbackBalance) || 0;
                                    const spentVal = parseFloat(c.totalSpent) || 0;

                                    return `
                                        <tr class="hover:bg-slate-50/70 transition group">
                                            
                                            <!-- Client Name + Initials -->
                                            <td class="py-3 px-4">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-9 h-9 rounded-xl ${avatarBg} font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                                                        ${initials}
                                                    </div>
                                                    <div class="min-w-0">
                                                        <div class="flex items-center gap-1.5 flex-wrap">
                                                            <button type="button" onclick="BusinessDashboardView.openClientModal('${c.id}', 'info')" class="font-bold text-slate-900 hover:text-amber-600 transition text-left cursor-pointer truncate">
                                                                ${c.name}
                                                            </button>
                                                            ${c.discountPercent ? `
                                                                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 shrink-0">-${c.discountPercent}%</span>
                                                            ` : ''}
                                                            ${this.isClientUpcomingBirthday(c, 7) ? `
                                                                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-200/60 shrink-0" title="Yaxın günlərdə ad günüdür (${c.birthDate || ''})">
                                                                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>
                                                                    <span>Ad günü</span>
                                                                </span>
                                                            ` : ''}
                                                        </div>
                                                        <div class="flex items-center gap-2 text-[11px] text-slate-400">
                                                            <span>${c.id}</span>
                                                            ${c.note ? `
                                                                <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                                                                <span class="truncate max-w-[140px] text-slate-500 font-normal italic" title="${c.note.replace(/"/g, '&quot;')}">${c.note}</span>
                                                            ` : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <!-- Contact Details -->
                                            <td class="py-3 px-4">
                                                <div class="space-y-0.5">
                                                    <a href="tel:${c.phone}" class="font-mono text-xs font-semibold text-slate-800 hover:text-amber-600 transition flex items-center gap-1">
                                                        <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                                        <span>${c.phone || '-'}</span>
                                                    </a>
                                                    ${c.email ? `
                                                        <div class="text-[11px] text-slate-400 truncate max-w-[150px] font-normal">${c.email}</div>
                                                    ` : ''}
                                                </div>
                                            </td>

                                            <!-- Category -->
                                            <td class="py-3 px-4">
                                                ${this.getClientCategoryBadge(c.category)}
                                            </td>

                                            <!-- Balances -->
                                            <td class="py-3 px-4">
                                                <div class="flex items-center gap-2">
                                                    <button type="button" onclick="BusinessDashboardView.openClientModal('${c.id}', 'stats')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50 hover:bg-emerald-100 transition cursor-pointer" title="Depoziti idarə et">
                                                        <span class="text-slate-400 font-normal">Dep:</span>
                                                        <span>${depositVal.toFixed(2)} ₼</span>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.openClientModal('${c.id}', 'loyalty')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/50 hover:bg-amber-100 transition cursor-pointer" title="Loyallıq və keşbek kartı">
                                                        <span class="text-slate-400 font-normal">Keş:</span>
                                                        <span>${cashbackVal.toFixed(2)} ₼</span>
                                                    </button>
                                                </div>
                                            </td>

                                            <!-- Visits & Total spent -->
                                            <td class="py-3 px-4">
                                                <div class="space-y-0.5">
                                                    <div class="font-bold text-slate-900">${spentVal.toLocaleString('az-AZ')} ₼</div>
                                                    <button type="button" onclick="BusinessDashboardView.openClientModal('${c.id}', 'history')" class="text-[11px] text-slate-400 hover:text-amber-600 transition cursor-pointer flex items-center gap-1 font-normal" title="Ziyarət tarixçəsinə bax">
                                                        <span>${c.totalVisits || 0} qəbul</span>
                                                    </button>
                                                </div>
                                            </td>

                                            <!-- Last visit date -->
                                            <td class="py-3.5 px-4 font-mono text-xs text-slate-700 whitespace-nowrap">
                                                ${this.formatDateDisplay(c.lastVisitDate) || '—'}
                                            </td>

                                            <!-- Actions -->
                                            <td class="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                                                <div class="flex items-center justify-end gap-1">
                                                    <button type="button" onclick="BusinessDashboardView.openClientModal('${c.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.deleteClient('${c.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sil">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- Standard Pagination -->
                    ${this.renderTablePagination({
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        onPageChange: 'BusinessDashboardView.setClientsPage',
                        onPageSizeChange: 'BusinessDashboardView.setClientsPageSize',
                        itemName: 'müştəri'
                    })}
                </div>

            </div>
        `;
    },

    // Handlers for search & filters
    getClientCategoryLabel: function(cat) {
        switch (cat) {
            case 'vip': return 'VIP müştərilər';
            case 'regular': return 'Daimi';
            case 'new': return 'Yeni';
            case 'risk': return 'Risk qrupu';
            default: return 'Hamısı';
        }
    },

    getClientSortLabel: function(sortBy) {
        switch (sortBy) {
            case 'visits_desc': return 'Ziyarət sayı (çoxdan aza)';
            case 'spent_desc': return 'Cəmi məbləğ (çoxdan aza)';
            case 'name_asc': return 'Ad üzrə (A - Z)';
            case 'name_desc': return 'Ad üzrə (Z - A)';
            case 'recent':
            default: return 'Ən son ziyarət';
        }
    },

    openClientsFilterModal: function() {
        const modal = document.getElementById('bizClientsFilterModal');
        if (!modal) return;

        this.clientsFilterTempCategory = this.clientsFilterCategory || 'all';
        this.clientsFilterTempGender = this.clientsFilterGender || 'all';
        this.clientsFilterTempSort = this.clientsSortBy || 'recent';

        this.selectClientsFilterCategory(this.clientsFilterTempCategory);
        this.selectClientsFilterGender(this.clientsFilterTempGender);
        this.selectClientsFilterSort(this.clientsFilterTempSort);

        modal.classList.remove('hidden');
    },

    closeClientsFilterModal: function() {
        const modal = document.getElementById('bizClientsFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectClientsFilterCategory: function(val) {
        this.clientsFilterTempCategory = val;
        ['all', 'vip', 'regular', 'new', 'risk'].forEach(c => {
            const btn = document.getElementById(`clientsFilterCatBtn_${c}`);
            if (btn) {
                if (c === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold ring-1 ring-slate-900';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    selectClientsFilterGender: function(val) {
        this.clientsFilterTempGender = val;
        ['all', 'female', 'male'].forEach(g => {
            const btn = document.getElementById(`clientsFilterGenderBtn_${g}`);
            if (btn) {
                if (g === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold ring-1 ring-slate-900';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    selectClientsFilterSort: function(val) {
        this.clientsFilterTempSort = val;
        ['recent', 'visits_desc', 'spent_desc', 'name_asc', 'name_desc'].forEach(s => {
            const btn = document.getElementById(`clientsFilterSortBtn_${s}`);
            if (btn) {
                if (s === val) {
                    btn.className = 'w-full p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex items-center justify-between text-left transition cursor-pointer shadow-xs font-bold ring-1 ring-slate-900';
                } else {
                    btn.className = 'w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium';
                }
            }
        });
    },

    applyClientsModalFilters: function() {
        this.clientsFilterCategory = this.clientsFilterTempCategory || 'all';
        this.clientsFilterGender = this.clientsFilterTempGender || 'all';
        this.clientsSortBy = this.clientsFilterTempSort || 'recent';
        this.clientsPage = 1;
        this.closeClientsFilterModal();
        this.refreshClientsCanvas();
    },

    resetClientsModalFilters: function() {
        this.selectClientsFilterCategory('all');
        this.selectClientsFilterGender('all');
        this.selectClientsFilterSort('recent');
    },

    setClientsSearch: function(val) {
        this.clientsSearch = val || '';
        this.clientsPage = 1;
        this.refreshClientsCanvas();
    },

    clearClientsSearch: function() {
        this.clientsSearch = '';
        this.clientsPage = 1;
        this.refreshClientsCanvas();
    },

    setClientsFilterCategory: function(cat) {
        this.clientsFilterCategory = cat || 'all';
        this.clientsPage = 1;
        this.refreshClientsCanvas();
    },

    setClientsFilterGender: function(gender) {
        this.clientsFilterGender = gender || 'all';
        this.clientsPage = 1;
        this.refreshClientsCanvas();
    },

    setClientsSort: function(sortBy) {
        this.clientsSortBy = sortBy || 'recent';
        this.clientsPage = 1;
        this.refreshClientsCanvas();
    },

    resetClientsFilters: function() {
        this.clientsSearch = '';
        this.clientsFilterCategory = 'all';
        this.clientsFilterGender = 'all';
        this.clientsSortBy = 'recent';
        this.clientsPage = 1;
        this.refreshClientsCanvas();
    },

    setClientsPage: function(page) {
        this.clientsPage = parseInt(page, 10) || 1;
        this.refreshClientsCanvas();
    },

    setClientsPageSize: function(size) {
        this.clientsPageSize = parseInt(size, 10) || 10;
        this.clientsPage = 1;
        this.refreshClientsCanvas();
    },

    // Add / Edit / View Tabbed Client Modal Handlers
    openClientModal: function(clientId = null, initialTab = 'info') {
        this.clientsEditingId = clientId;
        this.clientsActiveModalTab = initialTab || 'info';
        this.clientsQuickVisitOpen = false;
        this.clientsCommentEditingId = null;
        this.clientsFeedLimit = this.CLIENT_FEED_PAGE_SIZE || 10;
        this.clientsTimelineLimit = this.CLIENT_FEED_PAGE_SIZE || 10;

        const modal = document.getElementById('bizClientModal');
        if (!modal) return;

        this.renderClientModalContent();
        modal.classList.remove('hidden');
    },

    openClientProfileModal: function(clientId) {
        this.openClientModal(clientId, 'info');
    },

    closeClientModal: function() {
        const modal = document.getElementById('bizClientModal');
        if (modal) modal.classList.add('hidden');
        this.clientsEditingId = null;
        this.clientsQuickVisitOpen = false;
    },

    closeClientProfileModal: function() {
        this.closeClientModal();
    },

    setClientModalTab: function(tab) {
        this.clientsActiveModalTab = tab;
        this.clientsQuickVisitOpen = false;
        this.renderClientModalContent();
    },

    renderClientModalContent: function() {
        const allClients = this.getClientsData();
        const client = this.clientsEditingId ? allClients.find(c => c.id === this.clientsEditingId) : null;

        const titleEl = document.getElementById('bizClientModalTitle');
        const descEl = document.getElementById('bizClientModalDesc');
        const tabsEl = document.getElementById('bizClientModalTabsContainer');
        const bodyEl = document.getElementById('bizClientModalBody');

        if (!bodyEl) return;

        if (titleEl) {
            titleEl.textContent = client ? client.name : 'Yeni müştəri əlavə et';
        }
        if (descEl) {
            descEl.textContent = client
                ? `${client.phone || ''} • ${this.getClientCategoryLabel(client.category)} • ID: ${client.id}`
                : 'Müştərinin şəxsi məlumatlarını və loyallıq parametrlərini daxil edin';
        }

        // Render Tabs Navigation (Matching Staff Profile Tabs Style Exactly)
        if (tabsEl) {
            if (!client) {
                tabsEl.innerHTML = '';
                tabsEl.classList.add('hidden');
            } else {
                tabsEl.classList.remove('hidden');
                const visitsCount = Array.isArray(client.history) ? client.history.length : 0;
                const activeTab = this.clientsActiveModalTab;

                tabsEl.innerHTML = `
                    <div class="flex justify-center">
                    <div class="inline-flex max-w-full rounded-xl bg-slate-100 p-1 gap-1 overflow-x-auto no-scrollbar shadow-2xs">
                        <button
                            type="button"
                            onclick="BusinessDashboardView.setClientModalTab('info')"
                            class="shrink-0 py-2 px-3.5 rounded-lg text-xs transition flex items-center justify-center whitespace-nowrap text-center ${activeTab === 'info' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900 font-semibold'} cursor-pointer"
                        >
                            <span>Şəxsi məlumatlar</span>
                        </button>

                        <button
                            type="button"
                            onclick="BusinessDashboardView.setClientModalTab('history')"
                            class="shrink-0 py-2 px-3.5 rounded-lg text-xs transition flex items-center justify-center whitespace-nowrap text-center ${activeTab === 'history' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900 font-semibold'} cursor-pointer"
                        >
                            <span>Ziyarət tarixçəsi</span>
                            <span class="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'history' ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-200 text-slate-600'} font-black">${visitsCount}</span>
                        </button>

                        <button
                            type="button"
                            onclick="BusinessDashboardView.setClientModalTab('stats')"
                            class="shrink-0 py-2 px-3.5 rounded-lg text-xs transition flex items-center justify-center whitespace-nowrap text-center ${activeTab === 'stats' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900 font-semibold'} cursor-pointer"
                        >
                            <span>Statistika və maliyyə</span>
                        </button>

                        <button
                            type="button"
                            onclick="BusinessDashboardView.setClientModalTab('loyalty')"
                            class="shrink-0 py-2 px-3.5 rounded-lg text-xs transition flex items-center justify-center whitespace-nowrap text-center ${activeTab === 'loyalty' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900 font-semibold'} cursor-pointer"
                        >
                            <span>Loyallıq</span>
                            <span class="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'loyalty' ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-200 text-slate-600'} font-black">${((parseFloat(client.cashbackBalance) || 0) > 0 ? (parseFloat(client.cashbackBalance) || 0).toFixed(0) + ' ₼' : (client.discountPercent ? client.discountPercent + '%' : '<svg class=\"w-2.5 h-2.5 inline\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" viewBox=\"0 0 24 24\"><path d=\"M5 13l4 4L19 7\"/></svg>'))}</span>
                        </button>

                        <button
                            type="button"
                            onclick="BusinessDashboardView.setClientModalTab('files')"
                            class="shrink-0 py-2 px-3.5 rounded-lg text-xs transition flex items-center justify-center whitespace-nowrap text-center ${activeTab === 'files' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900 font-semibold'} cursor-pointer"
                        >
                            <span>Fayllar</span>
                            <span class="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'files' ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-200 text-slate-600'} font-black">${Array.isArray(client.files) ? client.files.length : 0}</span>
                        </button>

                        <button
                            type="button"
                            onclick="BusinessDashboardView.setClientModalTab('whatsapp')"
                            class="shrink-0 py-2 px-3.5 rounded-lg text-xs transition flex items-center justify-center whitespace-nowrap text-center ${activeTab === 'whatsapp' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900 font-semibold'} cursor-pointer"
                        >
                            <span>Mesajlar</span>
                            <span class="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'whatsapp' ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-200 text-slate-600'} font-black">${Array.isArray(client.messages) ? client.messages.length : 0}</span>
                        </button>

                        <button
                            type="button"
                            onclick="BusinessDashboardView.setClientModalTab('timeline')"
                            class="shrink-0 py-2 px-3.5 rounded-lg text-xs transition flex items-center justify-center whitespace-nowrap text-center ${activeTab === 'timeline' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900 font-semibold'} cursor-pointer"
                        >
                            <span>Tarixçə</span>
                            <span class="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'timeline' ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-200 text-slate-600'} font-black">${this.getClientFeedItems(client, 'history').length}</span>
                        </button>
                    </div>
                    </div>
                `;
            }
        }

        // Render Tab Body
        if (this.clientsActiveModalTab === 'history' && client) {
            bodyEl.innerHTML = this.renderClientModalHistoryTab(client);
        } else if (this.clientsActiveModalTab === 'stats' && client) {
            bodyEl.innerHTML = this.renderClientModalStatsTab(client);
        } else if (this.clientsActiveModalTab === 'loyalty' && client) {
            bodyEl.innerHTML = this.renderClientModalLoyaltyTab(client);
        } else if (this.clientsActiveModalTab === 'files' && client) {
            bodyEl.innerHTML = this.renderClientModalFilesTab(client);
            this.hydrateClientFileThumbs();
        } else if (this.clientsActiveModalTab === 'whatsapp' && client) {
            bodyEl.innerHTML = this.renderClientModalWhatsAppTab(client);
            this.updateClientWaPreview();
        } else if (this.clientsActiveModalTab === 'timeline' && client) {
            bodyEl.innerHTML = this.renderClientModalTimelineTab(client);
        } else {
            bodyEl.innerHTML = this.renderClientModalInfoTab(client);
        }

        // Wide layout + right side panel (notes & activity) only for existing clients
        const dialogEl = document.getElementById('bizClientModalDialog');
        if (dialogEl) {
            dialogEl.classList.toggle('max-w-3xl', !client);
            dialogEl.classList.toggle('max-w-6xl', !!client);
        }
        this.renderClientModalSidePanel(client);
    },

    // ==========================================
    // CLIENT CARD: NOTES & ACTIVITY FEED (right side panel)
    // ==========================================
    CLIENT_FEED_PAGE_SIZE: 10,
    clientsFeedLimit: 10,
    clientsCommentEditingId: null,

    getClientCommentAuthor: function() {
        try {
            const p = this.getPartnerUser();
            if (p && p.name) return p.name;
        } catch (e) { /* ignore */ }
        return 'Administrator';
    },

    addClientActivity: function(client, type, text) {
        if (!client) return;
        if (!Array.isArray(client.activity)) client.activity = [];
        client.activity.unshift({
            id: 'ACT-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
            type: type,
            text: text,
            author: this.getClientCommentAuthor(),
            createdAt: new Date().toISOString()
        });
    },

    getClientFeedItems: function(client, mode = 'all') {
        const items = [];
        const withComments = mode === 'all' || mode === 'comments';
        const withHistory = mode === 'all' || mode === 'history';

        if (withComments) (Array.isArray(client.comments) ? client.comments : []).forEach(c => {
            items.push({ kind: 'note', id: c.id, text: c.text, author: c.author, ts: c.createdAt, edited: !!c.editedAt, pinned: !!c.pinned });
        });

        if (withHistory) (Array.isArray(client.history) ? client.history : []).forEach((v, idx) => {
            items.push({ kind: 'visit', id: v.id || ('VIS-' + idx), ts: v.date, visit: v });
        });

        if (withHistory) (Array.isArray(client.activity) ? client.activity : []).forEach(a => {
            items.push({ kind: 'activity', id: a.id, type: a.type, text: a.text, author: a.author, ts: a.createdAt });
        });

        if (withHistory && client.firstVisitDate) {
            items.push({ kind: 'activity', id: 'REG-' + client.id, type: 'register', text: 'Müştəri bazaya əlavə edildi', ts: client.firstVisitDate });
        }

        items.sort((a, b) => {
            if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
            return new Date(b.ts || 0) - new Date(a.ts || 0);
        });
        return items;
    },

    formatClientFeedTime: function(ts) {
        if (!ts) return '';
        const hasTime = String(ts).includes('T');
        const d = new Date(ts);
        if (isNaN(d.getTime())) return '';
        const datePart = this.formatDateDisplay(d.toISOString().slice(0, 10));
        if (!hasTime) return datePart;
        const now = new Date();
        const diffMin = Math.floor((now - d) / 60000);
        if (diffMin < 1) return 'İndicə';
        if (diffMin < 60) return `${diffMin} dəq əvvəl`;
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        if (d.toDateString() === now.toDateString()) return `Bu gün, ${hh}:${mm}`;
        return `${datePart}, ${hh}:${mm}`;
    },

    getClientFeedIconSvg: function(kind, type) {
        const wrap = (cls, path) => `<div class="w-8 h-8 rounded-full ${cls} flex items-center justify-center shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">${path}</svg></div>`;
        if (kind === 'visit') return wrap('bg-emerald-50 text-emerald-600 border border-emerald-100', '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>');
        if (type === 'deposit') return wrap('bg-amber-50 text-amber-600 border border-amber-100', '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 10v4M10 12h4"/>');
        if (type === 'loyalty' || type === 'tier') return wrap('bg-amber-50 text-amber-600 border border-amber-100', '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>');
        if (type === 'cashback') return wrap('bg-emerald-50 text-emerald-600 border border-emerald-100', '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>');
        if (type === 'register') return wrap('bg-blue-50 text-blue-600 border border-blue-100', '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>');
        if (type === 'category') return wrap('bg-violet-50 text-violet-600 border border-violet-100', '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>');
        if (type === 'file') return wrap('bg-sky-50 text-sky-600 border border-sky-100', '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>');
        if (type === 'whatsapp' || type === 'sms' || type === 'message') return wrap('bg-slate-100 text-slate-700 border border-slate-200', '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>');
        return wrap('bg-slate-100 text-slate-500 border border-slate-200', '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>');
    },

    renderClientFeedItem: function(client, item) {
        const authorInitials = (name) => (name || 'A').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
        if (item.kind === 'note') {
            return `
                <div class="flex gap-2.5 group">
                    <div class="w-8 h-8 rounded-full bg-tbank-graphite text-[#FFDD2D] flex items-center justify-center text-[11px] font-black shrink-0">${this.escapeHtml(authorInitials(item.author))}</div>
                    <div class="flex-1 min-w-0">
                        <div class="rounded-2xl rounded-tl-md bg-white border ${item.pinned ? 'border-[#FFDD2D] ring-1 ring-[#FFDD2D]/50' : 'border-slate-200/90'} px-3 py-2.5 shadow-2xs">
                            <div class="flex items-center justify-between gap-2 mb-1">
                                <span class="text-xs font-bold text-slate-900 truncate">${this.escapeHtml(item.author || 'Administrator')}</span>
                                ${item.pinned ? `<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FFDD2D]/30 text-amber-800 shrink-0">Bərkidilib</span>` : ''}
                            </div>
                            <div class="text-xs text-slate-700 font-medium leading-relaxed break-words">${this.escapeHtml(item.text || '').replace(/\n/g, '<br>')}</div>
                        </div>
                        <div class="flex items-center gap-3 mt-1 px-1 text-[11px] text-slate-400 font-medium">
                            <span>${this.formatClientFeedTime(item.ts)}${item.edited ? ' • redaktə edilib' : ''}</span>
                            <button type="button" onclick="BusinessDashboardView.toggleClientCommentPin('${client.id}', '${item.id}')" class="hover:text-slate-800 transition cursor-pointer">${item.pinned ? 'Ayır' : 'Bərkit'}</button>
                            <button type="button" onclick="BusinessDashboardView.startEditClientComment('${item.id}')" class="hover:text-slate-800 transition cursor-pointer">Redaktə</button>
                            <button type="button" onclick="BusinessDashboardView.deleteClientComment('${client.id}', '${item.id}')" class="hover:text-rose-600 transition cursor-pointer">Sil</button>
                        </div>
                    </div>
                </div>`;
        }
        if (item.kind === 'visit') {
            const v = item.visit;
            return `
                <div class="flex gap-2.5">
                    ${this.getClientFeedIconSvg('visit')}
                    <div class="flex-1 min-w-0 pt-0.5">
                        <div class="text-xs text-slate-700 font-medium leading-snug">
                            <span class="font-bold text-slate-900">Ziyarət:</span> ${this.escapeHtml(v.service || 'Xidmət')}
                        </div>
                        <div class="flex items-center gap-1.5 flex-wrap mt-1 text-[11px] text-slate-500 font-medium">
                            ${v.staff ? `<span>${this.escapeHtml(v.staff)}</span><span class="text-slate-300">•</span>` : ''}
                            <span class="font-bold text-slate-800">${(parseFloat(v.amount) || 0).toFixed(2)} ₼</span>
                            ${v.status ? `<span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">${this.escapeHtml(v.status)}</span>` : ''}
                        </div>
                        <div class="text-[11px] text-slate-400 font-medium mt-0.5">${this.formatClientFeedTime(item.ts)}</div>
                    </div>
                </div>`;
        }
        return `
            <div class="flex gap-2.5">
                ${this.getClientFeedIconSvg('activity', item.type)}
                <div class="flex-1 min-w-0 pt-0.5">
                    <div class="text-xs text-slate-700 font-medium leading-snug">${this.escapeHtml(item.text || '')}</div>
                    <div class="text-[11px] text-slate-400 font-medium mt-0.5">${item.author ? `${this.escapeHtml(item.author)} • ` : ''}${this.formatClientFeedTime(item.ts)}</div>
                </div>
            </div>`;
    },

    renderClientModalSidePanel: function(client) {
        const panel = document.getElementById('bizClientModalSidePanel');
        if (!panel) return;
        if (!client) {
            panel.innerHTML = '';
            panel.classList.add('hidden');
            panel.classList.remove('flex');
            return;
        }
        panel.classList.remove('hidden');
        panel.classList.add('flex');

        const items = this.getClientFeedItems(client, 'comments');
        const limit = this.clientsFeedLimit || this.CLIENT_FEED_PAGE_SIZE;
        const visibleItems = items.slice(0, limit);
        const remaining = items.length - visibleItems.length;

        const editing = this.clientsCommentEditingId
            ? (client.comments || []).find(c => c.id === this.clientsCommentEditingId)
            : null;

        const authorInitials = (name) => (name || 'A').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

        const renderItem = (item) => this.renderClientFeedItem(client, item);

        panel.innerHTML = `
            <!-- Panel header -->
            <div class="px-4 pt-4 pb-3 border-b border-slate-200/80 bg-white shrink-0">
                <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0">
                        <h4 class="text-sm font-bold text-slate-900">Şərhlər</h4>
                        <p class="text-[11px] text-slate-400 font-medium">Komandanın müştəri haqqında şərhləri</p>
                    </div>
                    <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold shrink-0">${items.length}</span>
                </div>
            </div>

            <!-- Composer -->
            <div class="px-4 py-3 border-b border-slate-200/80 bg-white shrink-0">
                ${editing ? `
                    <div class="flex items-center justify-between mb-1.5 text-[11px] font-semibold text-amber-700">
                        <span>Qeyd redaktə edilir</span>
                        <button type="button" onclick="BusinessDashboardView.cancelEditClientComment()" class="text-slate-400 hover:text-slate-800 transition cursor-pointer">Ləğv et</button>
                    </div>
                ` : ''}
                <div class="rounded-xl bg-slate-50 border border-slate-200 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                    <textarea
                        id="bizClientCommentInput"
                        rows="2"
                        placeholder="Qeyd yazın... (məs. saç boyası nömrəsi, istəklər)"
                        onkeydown="if(event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { event.preventDefault(); BusinessDashboardView.submitClientComment('${client.id}'); }"
                        class="w-full px-3 pt-2.5 pb-1 bg-transparent text-xs font-semibold text-tbank-graphite outline-none resize-none leading-relaxed placeholder:text-slate-400 placeholder:font-medium"
                    >${editing ? this.escapeHtml(editing.text || '') : ''}</textarea>
                    <div class="flex items-center justify-between px-2 pb-2">
                        <span class="text-[10px] text-slate-400 font-medium pl-1">Ctrl + Enter ilə göndər</span>
                        <button type="button" onclick="BusinessDashboardView.submitClientComment('${client.id}')" class="h-8 px-3.5 rounded-lg bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                            <span>${editing ? 'Yadda saxla' : 'Göndər'}</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Feed -->
            <div id="bizClientFeedScroll" class="flex-1 min-h-[220px] lg:min-h-0 overflow-y-auto px-4 py-4 space-y-4">
                ${client.note ? `
                    <div class="rounded-2xl bg-amber-50/80 border border-amber-200/90 px-3 py-2.5">
                        <div class="text-[11px] font-bold text-amber-800 mb-0.5">Əsas qeyd (profil)</div>
                        <div class="text-xs text-amber-950 font-medium leading-relaxed break-words">${this.escapeHtml(client.note).replace(/\n/g, '<br>')}</div>
                    </div>
                ` : ''}
                ${items.length ? visibleItems.map(renderItem).join('') : `
                    <div class="py-10 text-center">
                        <div class="w-11 h-11 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </div>
                        <div class="text-xs font-bold text-slate-700">Hələ şərh yoxdur</div>
                        <div class="text-[11px] text-slate-400 font-medium mt-0.5">İlk şərhi yuxarıdakı sahədən əlavə edin</div>
                    </div>
                `}
                ${remaining > 0 ? `
                    <div class="pt-1 flex flex-col items-center gap-1.5">
                        <button type="button" onclick="BusinessDashboardView.loadMoreClientFeed()" class="h-9 px-4 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                            <span>Daha çox</span>
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                        <span class="text-[11px] text-slate-400 font-medium">${visibleItems.length} / ${items.length} göstərilir</span>
                    </div>
                ` : ''}
            </div>
        `;
    },

    loadMoreClientFeed: function() {
        const scroller = document.getElementById('bizClientFeedScroll');
        const prevTop = scroller ? scroller.scrollTop : 0;
        this.clientsFeedLimit = (this.clientsFeedLimit || this.CLIENT_FEED_PAGE_SIZE) + this.CLIENT_FEED_PAGE_SIZE;
        const client = this.getClientsData().find(c => c.id === this.clientsEditingId);
        this.renderClientModalSidePanel(client || null);
        const next = document.getElementById('bizClientFeedScroll');
        if (next) next.scrollTop = prevTop;
    },

    clientsTimelineLimit: 10,

    renderClientModalTimelineTab: function(client) {
        const items = this.getClientFeedItems(client, 'history');
        const limit = this.clientsTimelineLimit || this.CLIENT_FEED_PAGE_SIZE;
        const visibleItems = items.slice(0, limit);
        const remaining = items.length - visibleItems.length;

        return `
            <div class="space-y-4">
                <div class="flex items-center justify-between gap-2">
                    <div class="min-w-0">
                        <h4 class="text-sm font-bold text-slate-900">Tarixçə</h4>
                        <p class="text-[11px] text-slate-400 font-medium">Müştəri ilə bağlı bütün hadisələr: ziyarətlər, fayllar, mesajlar və dəyişikliklər</p>
                    </div>
                    <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold shrink-0">${items.length}</span>
                </div>
                <div id="bizClientTimelineList" class="space-y-4">
                    ${items.length ? visibleItems.map(item => this.renderClientFeedItem(client, item)).join('') : `
                        <div class="py-12 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60">
                            <div class="w-11 h-11 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            </div>
                            <div class="text-xs font-bold text-slate-700">Hələ hadisə yoxdur</div>
                            <div class="text-[11px] text-slate-400 font-medium mt-0.5">Ziyarətlər və dəyişikliklər burada görünəcək</div>
                        </div>
                    `}
                </div>
                ${remaining > 0 ? `
                    <div class="pt-1 flex flex-col items-center gap-1.5">
                        <button type="button" onclick="BusinessDashboardView.loadMoreClientTimeline()" class="h-9 px-4 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                            <span>Daha çox</span>
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                        <span class="text-[11px] text-slate-400 font-medium">${visibleItems.length} / ${items.length} göstərilir</span>
                    </div>
                ` : ''}
            </div>
        `;
    },

    loadMoreClientTimeline: function() {
        const bodyEl = document.getElementById('bizClientModalBody');
        const scrollers = [];
        let el = bodyEl;
        while (el) { scrollers.push([el, el.scrollTop]); el = el.parentElement; }
        this.clientsTimelineLimit = (this.clientsTimelineLimit || this.CLIENT_FEED_PAGE_SIZE) + this.CLIENT_FEED_PAGE_SIZE;
        const client = this.getClientsData().find(c => c.id === this.clientsEditingId);
        if (bodyEl && client) bodyEl.innerHTML = this.renderClientModalTimelineTab(client);
        scrollers.forEach(([node, top]) => { if (node.scrollTop !== top) node.scrollTop = top; });
    },

    submitClientComment: function(clientId) {
        const inp = document.getElementById('bizClientCommentInput');
        const text = inp ? inp.value.trim() : '';
        if (!text) {
            if (typeof App !== 'undefined') App.showToast('Qeyd mətnini daxil edin');
            if (inp) inp.focus();
            return;
        }
        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client) return;
        if (!Array.isArray(client.comments)) client.comments = [];

        if (this.clientsCommentEditingId) {
            const c = client.comments.find(x => x.id === this.clientsCommentEditingId);
            if (c) {
                c.text = text;
                c.editedAt = new Date().toISOString();
            }
            this.clientsCommentEditingId = null;
            if (typeof App !== 'undefined') App.showToast('Qeyd yeniləndi');
        } else {
            client.comments.unshift({
                id: 'CMT-' + Date.now().toString(36),
                text: text,
                author: this.getClientCommentAuthor(),
                createdAt: new Date().toISOString(),
                pinned: false
            });
            if (typeof App !== 'undefined') App.showToast('Qeyd əlavə edildi');
        }

        this.saveClientsData(allClients);
        this.renderClientModalSidePanel(client);
    },

    startEditClientComment: function(commentId) {
        this.clientsCommentEditingId = commentId;
        const client = this.getClientsData().find(c => c.id === this.clientsEditingId);
        this.renderClientModalSidePanel(client || null);
        const inp = document.getElementById('bizClientCommentInput');
        if (inp) {
            inp.focus();
            inp.setSelectionRange(inp.value.length, inp.value.length);
        }
    },

    cancelEditClientComment: function() {
        this.clientsCommentEditingId = null;
        const client = this.getClientsData().find(c => c.id === this.clientsEditingId);
        this.renderClientModalSidePanel(client || null);
    },

    toggleClientCommentPin: function(clientId, commentId) {
        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client || !Array.isArray(client.comments)) return;
        const c = client.comments.find(x => x.id === commentId);
        if (!c) return;
        c.pinned = !c.pinned;
        this.saveClientsData(allClients);
        this.renderClientModalSidePanel(client);
    },

    deleteClientComment: function(clientId, commentId) {
        this.openDeleteConfirmModal({
            title: 'Qeydi sil',
            message: 'Bu qeydi silmək istədiyinizə əminsiniz?',
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const allClients = this.getClientsData();
                const client = allClients.find(c => c.id === clientId);
                if (!client || !Array.isArray(client.comments)) return;
                client.comments = client.comments.filter(x => x.id !== commentId);
                if (this.clientsCommentEditingId === commentId) this.clientsCommentEditingId = null;
                this.saveClientsData(allClients);
                this.renderClientModalSidePanel(client);
                if (typeof App !== 'undefined') App.showToast('Qeyd silindi');
            }
        });
    },

    // ==========================================
    // CLIENT CARD: FILES (stored in IndexedDB, metadata in client.files)
    // ==========================================
    CLIENT_FILE_MAX_BYTES: 10 * 1024 * 1024,
    _clientFilesDbPromise: null,
    _clientFileObjectUrls: [],

    openClientFilesDb: function() {
        if (this._clientFilesDbPromise) return this._clientFilesDbPromise;
        this._clientFilesDbPromise = new Promise((resolve, reject) => {
            if (!window.indexedDB) { reject(new Error('IndexedDB not supported')); return; }
            const req = indexedDB.open('zeyvo_client_files', 1);
            req.onupgradeneeded = () => {
                const db = req.result;
                if (!db.objectStoreNames.contains('files')) db.createObjectStore('files');
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => { this._clientFilesDbPromise = null; reject(req.error); };
        });
        return this._clientFilesDbPromise;
    },

    clientFilesDbRequest: function(mode, fn) {
        return this.openClientFilesDb().then(db => new Promise((resolve, reject) => {
            const tx = db.transaction('files', mode);
            const store = tx.objectStore('files');
            const req = fn(store);
            tx.oncomplete = () => resolve(req ? req.result : undefined);
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error);
        }));
    },

    putClientFileBlob: function(id, blob) { return this.clientFilesDbRequest('readwrite', s => s.put(blob, id)); },
    getClientFileBlob: function(id) { return this.clientFilesDbRequest('readonly', s => s.get(id)); },
    deleteClientFileBlob: function(id) { return this.clientFilesDbRequest('readwrite', s => s.delete(id)); },

    formatClientFileSize: function(bytes) {
        const b = parseFloat(bytes) || 0;
        if (b < 1024) return `${b} B`;
        if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
        return `${(b / (1024 * 1024)).toFixed(1)} MB`;
    },

    getClientFileKind: function(file) {
        const type = (file.type || '').toLowerCase();
        const ext = ((file.name || '').split('.').pop() || '').toLowerCase();
        if (type.startsWith('image/')) return 'image';
        if (type === 'application/pdf' || ext === 'pdf') return 'pdf';
        if (['doc', 'docx', 'txt', 'rtf', 'odt'].includes(ext)) return 'doc';
        if (['xls', 'xlsx', 'csv', 'ods'].includes(ext)) return 'sheet';
        return 'other';
    },

    getClientFileIconSvg: function(kind, size = 'w-6 h-6') {
        const svg = (path) => `<svg class="${size}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">${path}</svg>`;
        const filePath = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>';
        if (kind === 'image') return svg('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>');
        if (kind === 'pdf') return svg(filePath + '<path d="M9 15h6M9 18h4"/>');
        if (kind === 'doc') return svg(filePath + '<path d="M8 13h8M8 17h8M8 9h2"/>');
        if (kind === 'sheet') return svg(filePath + '<path d="M8 13h8M8 17h8M12 11v8"/>');
        return svg(filePath);
    },

    getClientFileKindStyle: function(kind) {
        return {
            image: 'bg-violet-50 text-violet-600 border-violet-100',
            pdf: 'bg-rose-50 text-rose-600 border-rose-100',
            doc: 'bg-blue-50 text-blue-600 border-blue-100',
            sheet: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            other: 'bg-slate-100 text-slate-500 border-slate-200'
        }[kind] || 'bg-slate-100 text-slate-500 border-slate-200';
    },

    renderClientModalFilesTab: function(client) {
        const files = Array.isArray(client.files) ? client.files : [];
        const totalSize = files.reduce((s, f) => s + (parseFloat(f.size) || 0), 0);

        const cards = files.map(f => {
            const kind = this.getClientFileKind(f);
            const ext = ((f.name || '').includes('.') ? '.' + (f.name.split('.').pop() || '') : '').toLowerCase();
            return `
                <div class="group rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col hover:border-slate-300 transition">
                    <button type="button" onclick="BusinessDashboardView.openClientFileViewer('${client.id}', '${f.id}')" class="relative h-20 w-full flex items-center justify-center bg-slate-50 border-b border-slate-100 cursor-pointer overflow-hidden">
                        ${kind === 'image'
                            ? `<img data-client-file-thumb="${f.id}" alt="" class="w-full h-full object-cover opacity-0 transition-opacity duration-300">
                               <div class="absolute inset-0 flex items-center justify-center text-slate-300" data-client-file-ph="${f.id}">${this.getClientFileIconSvg('image', 'w-6 h-6')}</div>`
                            : `<div class="w-10 h-10 rounded-xl border flex items-center justify-center ${this.getClientFileKindStyle(kind)}">${this.getClientFileIconSvg(kind, 'w-5 h-5')}</div>`}
                        ${ext ? `<span class="absolute top-1.5 left-1.5 px-1 py-px rounded bg-white/90 border border-slate-200 text-[9px] font-bold text-slate-600">${this.escapeHtml(ext)}</span>` : ''}
                    </button>
                    <div class="p-2 flex-1 flex flex-col gap-1.5">
                        <div class="min-w-0">
                            <div class="text-[11px] font-bold text-slate-900 truncate" title="${this.escapeHtml(f.name || '')}">${this.escapeHtml(f.name || 'Fayl')}</div>
                            <div class="text-[10px] text-slate-400 font-medium mt-0.5 truncate">${this.formatClientFileSize(f.size)} • ${this.formatClientFeedTime(f.uploadedAt)}</div>
                        </div>
                        <div class="flex items-center gap-1 mt-auto">
                            <button type="button" onclick="BusinessDashboardView.openClientFileViewer('${client.id}', '${f.id}')" class="flex-1 h-7 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition cursor-pointer">Bax</button>
                            <button type="button" title="Yüklə" onclick="BusinessDashboardView.downloadClientFile('${client.id}', '${f.id}')" class="w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>
                            </button>
                            <button type="button" title="Adını dəyiş" onclick="BusinessDashboardView.renameClientFile('${client.id}', '${f.id}')" class="w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                            </button>
                            <button type="button" title="Sil" onclick="BusinessDashboardView.deleteClientFile('${client.id}', '${f.id}')" class="w-7 h-7 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition cursor-pointer">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                        </div>
                    </div>
                </div>`;
        }).join('');

        return `
            <div class="space-y-4">
                <input type="file" id="bizClientFileInput" multiple class="hidden" onchange="BusinessDashboardView.handleClientFilesUpload('${client.id}', this.files); this.value='';">

                <div
                    id="bizClientFileDropzone"
                    onclick="document.getElementById('bizClientFileInput').click()"
                    ondragover="event.preventDefault(); this.classList.add('border-tbank-graphite','bg-[#FFDD2D]/10');"
                    ondragleave="this.classList.remove('border-tbank-graphite','bg-[#FFDD2D]/10');"
                    ondrop="event.preventDefault(); this.classList.remove('border-tbank-graphite','bg-[#FFDD2D]/10'); BusinessDashboardView.handleClientFilesUpload('${client.id}', event.dataTransfer.files);"
                    class="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition cursor-pointer px-4 py-6 flex flex-col items-center justify-center text-center"
                >
                    <div class="w-11 h-11 rounded-full bg-[#FFDD2D] text-[#101114] flex items-center justify-center mb-2 shadow-xs">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg>
                    </div>
                    <div class="text-sm font-bold text-slate-900">Faylları bura sürükləyin və ya seçin</div>
                    <div class="text-[11px] text-slate-400 font-medium mt-0.5">Şəkil, PDF, sənəd və cədvəllər • hər fayl maks. 10 MB</div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="text-sm font-bold text-slate-900">Yüklənmiş fayllar <span class="text-slate-400 font-semibold">(${files.length})</span></div>
                    ${files.length ? `<div class="text-[11px] text-slate-400 font-medium">Cəmi: ${this.formatClientFileSize(totalSize)}</div>` : ''}
                </div>

                ${files.length ? `
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">${cards}</div>
                ` : `
                    <div class="rounded-2xl border border-slate-200/90 bg-white py-10 text-center">
                        <div class="w-11 h-11 mx-auto rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-2">
                            ${this.getClientFileIconSvg('other', 'w-5 h-5')}
                        </div>
                        <div class="text-xs font-bold text-slate-700">Hələ fayl yoxdur</div>
                        <div class="text-[11px] text-slate-400 font-medium mt-0.5">Müqavilə, foto "əvvəl/sonra", analizlər və s. yükləyin</div>
                    </div>
                `}
            </div>
        `;
    },

    revokeClientFileObjectUrls: function() {
        (this._clientFileObjectUrls || []).forEach(u => { try { URL.revokeObjectURL(u); } catch (e) { /* ignore */ } });
        this._clientFileObjectUrls = [];
    },

    hydrateClientFileThumbs: function() {
        this.revokeClientFileObjectUrls();
        document.querySelectorAll('img[data-client-file-thumb]').forEach(img => {
            const id = img.getAttribute('data-client-file-thumb');
            this.getClientFileBlob(id).then(blob => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                this._clientFileObjectUrls.push(url);
                img.onload = () => {
                    img.classList.remove('opacity-0');
                    const ph = document.querySelector(`[data-client-file-ph="${id}"]`);
                    if (ph) ph.remove();
                };
                img.src = url;
            }).catch(() => { /* ignore */ });
        });
    },

    handleClientFilesUpload: async function(clientId, fileList) {
        const list = Array.from(fileList || []);
        if (!list.length) return;

        const tooBig = list.filter(f => f.size > this.CLIENT_FILE_MAX_BYTES);
        const ok = list.filter(f => f.size <= this.CLIENT_FILE_MAX_BYTES);
        if (tooBig.length && typeof App !== 'undefined') {
            App.showToast(`${tooBig.length} fayl 10 MB-dan böyükdür və yüklənmədi`);
        }
        if (!ok.length) return;

        const added = [];
        for (const f of ok) {
            const id = 'FILE-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
            try {
                await this.putClientFileBlob(id, f);
                added.push({
                    id: id,
                    name: f.name,
                    type: f.type || '',
                    size: f.size,
                    uploadedAt: new Date().toISOString(),
                    author: this.getClientCommentAuthor()
                });
            } catch (e) {
                if (typeof App !== 'undefined') App.showToast(`"${f.name}" yüklənmədi: yaddaş xətası`);
            }
        }
        if (!added.length) return;

        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client) return;
        if (!Array.isArray(client.files)) client.files = [];
        client.files = [...added, ...client.files];
        this.addClientActivity(client, 'file', added.length === 1 ? `Fayl yükləndi: ${added[0].name}` : `${added.length} fayl yükləndi`);
        this.saveClientsData(allClients);

        if (typeof App !== 'undefined') App.showToast(added.length === 1 ? 'Fayl yükləndi' : `${added.length} fayl yükləndi`);
        this.renderClientModalContent();
    },

    downloadClientFile: function(clientId, fileId) {
        const client = this.getClientsData().find(c => c.id === clientId);
        const meta = client && Array.isArray(client.files) ? client.files.find(f => f.id === fileId) : null;
        if (!meta) return;
        this.getClientFileBlob(fileId).then(blob => {
            if (!blob) { if (typeof App !== 'undefined') App.showToast('Fayl tapılmadı'); return; }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = meta.name || 'fayl';
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1500);
        }).catch(() => { if (typeof App !== 'undefined') App.showToast('Fayl açılmadı'); });
    },

    openClientFileViewer: function(clientId, fileId) {
        const client = this.getClientsData().find(c => c.id === clientId);
        const meta = client && Array.isArray(client.files) ? client.files.find(f => f.id === fileId) : null;
        if (!meta) return;

        this.closeClientFileViewer();
        const kind = this.getClientFileKind(meta);

        const overlay = document.createElement('div');
        overlay.id = 'bizClientFileViewer';
        overlay.className = 'fixed inset-0 z-[65] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4';
        overlay.onclick = (e) => { if (e.target === overlay) this.closeClientFileViewer(); };
        overlay.innerHTML = `
            <div class="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
                <div class="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0">
                    <div class="min-w-0">
                        <h3 class="text-base font-bold text-slate-900 truncate">${this.escapeHtml(meta.name || 'Fayl')}</h3>
                        <p class="text-xs text-slate-400 font-medium mt-0.5">${this.formatClientFileSize(meta.size)} • ${this.formatClientFeedTime(meta.uploadedAt)}${meta.author ? ' • ' + this.escapeHtml(meta.author) : ''}</p>
                    </div>
                    <button type="button" onclick="BusinessDashboardView.closeClientFileViewer()" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                </div>
                <div id="bizClientFileViewerBody" class="flex-1 min-h-[300px] bg-slate-50 flex items-center justify-center overflow-auto">
                    <div class="text-xs text-slate-400 font-medium">Yüklənir...</div>
                </div>
                <div class="px-5 py-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                    <button type="button" onclick="BusinessDashboardView.deleteClientFile('${clientId}', '${fileId}')" class="h-10 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition cursor-pointer">Sil</button>
                    <button type="button" onclick="BusinessDashboardView.downloadClientFile('${clientId}', '${fileId}')" class="h-10 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>
                        <span>Yüklə</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        this._clientFileViewerEsc = (e) => { if (e.key === 'Escape') this.closeClientFileViewer(); };
        document.addEventListener('keydown', this._clientFileViewerEsc);

        this.getClientFileBlob(fileId).then(blob => {
            const body = document.getElementById('bizClientFileViewerBody');
            if (!body) return;
            if (!blob) {
                body.innerHTML = `<div class="text-xs text-slate-500 font-semibold">Fayl tapılmadı</div>`;
                return;
            }
            const url = URL.createObjectURL(blob);
            this._clientFileViewerUrl = url;
            const isText = (meta.type || '').startsWith('text/');
            if (kind === 'image') {
                body.innerHTML = `<img src="${url}" alt="" class="max-w-full max-h-[70vh] object-contain">`;
            } else if (kind === 'pdf' || isText) {
                body.innerHTML = `<iframe src="${url}" class="w-full h-[70vh] bg-white border-0"></iframe>`;
            } else {
                body.innerHTML = `
                    <div class="py-12 text-center px-6">
                        <div class="w-16 h-16 mx-auto rounded-2xl border flex items-center justify-center mb-3 ${this.getClientFileKindStyle(kind)}">${this.getClientFileIconSvg(kind, 'w-8 h-8')}</div>
                        <div class="text-sm font-bold text-slate-800">Bu fayl növü üçün önizləmə mövcud deyil</div>
                        <div class="text-xs text-slate-400 font-medium mt-1">Faylı açmaq üçün "Yüklə" düyməsini basın</div>
                    </div>`;
            }
        }).catch(() => {
            const body = document.getElementById('bizClientFileViewerBody');
            if (body) body.innerHTML = `<div class="text-xs text-slate-500 font-semibold">Fayl açılmadı</div>`;
        });
    },

    closeClientFileViewer: function() {
        const el = document.getElementById('bizClientFileViewer');
        if (el) el.remove();
        if (this._clientFileViewerUrl) { URL.revokeObjectURL(this._clientFileViewerUrl); this._clientFileViewerUrl = null; }
        if (this._clientFileViewerEsc) { document.removeEventListener('keydown', this._clientFileViewerEsc); this._clientFileViewerEsc = null; }
    },

    renameClientFile: function(clientId, fileId) {
        const client = this.getClientsData().find(c => c.id === clientId);
        const meta = client && Array.isArray(client.files) ? client.files.find(f => f.id === fileId) : null;
        if (!meta) return;
        const full = meta.name || '';
        const dot = full.lastIndexOf('.');
        const base = dot > 0 ? full.slice(0, dot) : full;
        const ext = dot > 0 ? full.slice(dot) : '';

        this.openTextInputModal({
            title: 'Faylın adını dəyiş',
            description: 'Fayl uzantısı dəyişməz qalacaq',
            label: 'Yeni ad',
            value: base,
            suffix: ext,
            placeholder: 'Fayl adı',
            confirmText: 'Yadda saxla',
            emptyError: 'Fayl adı boş ola bilməz',
            onConfirm: (val) => {
                const allClients = this.getClientsData();
                const c = allClients.find(x => x.id === clientId);
                const m = c && Array.isArray(c.files) ? c.files.find(f => f.id === fileId) : null;
                if (!m) return;
                const newName = val + ext;
                if (newName === m.name) return;
                const oldName = m.name;
                m.name = newName;
                this.addClientActivity(c, 'file', `Fayl adı dəyişdirildi: ${oldName} → ${newName}`);
                this.saveClientsData(allClients);
                this.renderClientModalContent();
                if (typeof App !== 'undefined') App.showToast('Fayl adı dəyişdirildi');
            }
        });
    },

    // Generic single-field input modal (replaces native window.prompt)
    openTextInputModal: function(opts = {}) {
        this.closeTextInputModal();
        const esc = (s) => this.escapeHtml(String(s == null ? '' : s));
        const overlay = document.createElement('div');
        overlay.id = 'bizTextInputModal';
        overlay.className = 'fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade';
        overlay.innerHTML = `
            <div class="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
                <div class="px-6 pt-5 pb-4 flex items-start justify-between gap-4 border-b border-slate-100">
                    <div class="min-w-0">
                        <h3 class="text-base font-bold text-slate-900">${esc(opts.title || 'Daxil edin')}</h3>
                        ${opts.description ? `<p class="text-xs text-slate-400 font-medium mt-0.5">${esc(opts.description)}</p>` : ''}
                    </div>
                    <button type="button" data-act="close" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                </div>
                <div class="px-6 py-5">
                    ${opts.label ? `<label class="block text-xs font-semibold text-slate-600 mb-1.5">${esc(opts.label)}</label>` : ''}
                    <div class="flex items-center h-11 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition overflow-hidden">
                        <input type="text" data-role="input" value="${esc(opts.value)}" placeholder="${esc(opts.placeholder || '')}" class="flex-1 min-w-0 h-full px-3.5 bg-transparent text-sm font-semibold text-tbank-graphite outline-none placeholder:text-slate-400 placeholder:font-medium">
                        ${opts.suffix ? `<span class="h-full px-3 flex items-center bg-slate-100 border-l border-slate-200 text-xs font-bold text-slate-500 shrink-0">${esc(opts.suffix)}</span>` : ''}
                    </div>
                    <div data-role="error" class="hidden text-[11px] font-semibold text-rose-600 mt-1.5"></div>
                </div>
                <div class="px-6 pb-5 flex items-center justify-end gap-2">
                    <button type="button" data-act="close" class="h-10 px-4 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-sm font-bold transition shadow-2xs cursor-pointer">Ləğv et</button>
                    <button type="button" data-act="ok" class="h-10 px-5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-sm font-bold transition shadow-xs cursor-pointer active:scale-95">${esc(opts.confirmText || 'Təsdiqlə')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const input = overlay.querySelector('[data-role="input"]');
        const errEl = overlay.querySelector('[data-role="error"]');
        const submit = () => {
            const val = (input.value || '').trim();
            if (!val) {
                errEl.textContent = opts.emptyError || 'Sahə boş ola bilməz';
                errEl.classList.remove('hidden');
                input.focus();
                return;
            }
            this.closeTextInputModal();
            if (typeof opts.onConfirm === 'function') opts.onConfirm(val);
        };
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) return this.closeTextInputModal();
            const act = e.target.closest('[data-act]');
            if (!act) return;
            if (act.dataset.act === 'close') this.closeTextInputModal();
            else if (act.dataset.act === 'ok') submit();
        });
        input.addEventListener('input', () => errEl.classList.add('hidden'));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
        });
        this._textInputModalEsc = (e) => { if (e.key === 'Escape') { e.stopPropagation(); this.closeTextInputModal(); } };
        document.addEventListener('keydown', this._textInputModalEsc, true);
        setTimeout(() => { input.focus(); input.select(); }, 30);
    },

    closeTextInputModal: function() {
        const el = document.getElementById('bizTextInputModal');
        if (el) el.remove();
        if (this._textInputModalEsc) { document.removeEventListener('keydown', this._textInputModalEsc, true); this._textInputModalEsc = null; }
    },

    deleteClientFile: function(clientId, fileId) {
        const client = this.getClientsData().find(c => c.id === clientId);
        const meta = client && Array.isArray(client.files) ? client.files.find(f => f.id === fileId) : null;
        if (!meta) return;
        this.openDeleteConfirmModal({
            title: 'Faylı sil',
            message: `"${meta.name}" faylını silmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz.`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const allClients = this.getClientsData();
                const c = allClients.find(x => x.id === clientId);
                if (!c || !Array.isArray(c.files)) return;
                c.files = c.files.filter(f => f.id !== fileId);
                this.addClientActivity(c, 'file', `Fayl silindi: ${meta.name}`);
                this.saveClientsData(allClients);
                this.deleteClientFileBlob(fileId).catch(() => { /* ignore */ });
                this.closeClientFileViewer();
                this.renderClientModalContent();
                if (typeof App !== 'undefined') App.showToast('Fayl silindi');
            }
        });
    },

    // ==========================================
    // CLIENT CARD: WHATSAPP
    // ==========================================
    clientsWaDraft: '',
    clientsWaTemplateId: null,
    CLIENT_WA_TEMPLATES_KEY: 'zeyvo_client_wa_templates_v1',

    getClientWaBuiltinTemplates: function() {
        return [
            { id: 'b-greet', name: 'Salamlama', text: 'Salam, {ad}! {biznes} komandası sizi salamlayır. Sizə necə kömək edə bilərik?' },
            { id: 'b-reminder', name: 'Vizit xatırlatması', text: 'Salam, {ad}! Sizə xatırladırıq ki, {biznes}-də qeydiyyatınız var. Gəlişinizi təsdiq edə bilərsinizmi? Sizi gözləyirik!' },
            { id: 'b-thanks', name: 'Təşəkkür', text: 'Salam, {ad}! Bizi seçdiyiniz üçün təşəkkür edirik. Xidmətimizdən razı qaldınızmı? Rəyiniz bizim üçün çox önəmlidir.' },
            { id: 'b-birthday', name: 'Ad günü təbriki', text: 'Hörmətli {ad}, ad gününüz mübarək! {biznes} komandası sizə xoşbəxtlik arzulayır. Bu həftə ərzində sizi xüsusi endirim gözləyir.' },
            { id: 'b-comeback', name: 'Geri dönüş', text: 'Salam, {ad}! Sizi çoxdandır görmürük. {mutexessis} sizi gözləyir, növbəti vizit üçün rahat vaxt seçin.' },
            { id: 'b-deposit', name: 'Depozit balansı', text: 'Salam, {ad}! {biznes}-də depozit balansınız: {depozit}. Növbəti vizitdə istifadə edə bilərsiniz.' }
        ];
    },

    getClientWaCustomTemplates: function() {
        try {
            const arr = JSON.parse(localStorage.getItem(this.CLIENT_WA_TEMPLATES_KEY) || '[]');
            return Array.isArray(arr) ? arr : [];
        } catch (e) { return []; }
    },

    saveClientWaCustomTemplates: function(list) {
        localStorage.setItem(this.CLIENT_WA_TEMPLATES_KEY, JSON.stringify(list));
    },

    getClientWaPhone: function(client) {
        let d = String(client.phone || '').replace(/\D/g, '');
        if (d.startsWith('00')) d = d.slice(2);
        if (d.startsWith('994')) d = d.slice(3);
        if (d.length === 10 && d.startsWith('0')) d = d.slice(1);
        if (d.length !== 9) return null;
        return '994' + d;
    },

    formatClientWaPhone: function(full) {
        if (!full) return '';
        const d = full.slice(3);
        return `+994 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)}`;
    },

    fillClientWaVariables: function(text, client) {
        let biz = 'Zeyvo';
        try {
            const p = this.getPartnerUser();
            if (p && (p.businessName || p.companyName)) biz = p.businessName || p.companyName;
        } catch (e) { /* ignore */ }
        const firstName = (client.name || '').trim().split(' ')[0] || 'Hörmətli müştəri';
        const vars = {
            ad: firstName,
            biznes: biz,
            depozit: `${(parseFloat(client.depositBalance) || 0).toFixed(2)} ₼`,
            endirim: `${parseFloat(client.discountPercent) || 0}%`,
            mutexessis: client.preferredStaff || 'Mütəxəssisimiz'
        };
        return String(text || '').replace(/\{(ad|biznes|depozit|endirim|mutexessis)\}/g, (m, k) => vars[k]);
    },

    getClientWaIconSvg: function(size = 'w-4 h-4') {
        return `<svg class="${size}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
    },

    clientsMsgChannel: 'sms',

    getClientMsgChannelLabel: function(channel) {
        return channel === 'whatsapp' ? 'WhatsApp' : 'SMS';
    },

    setClientMsgChannel: function(channel) {
        const ta = document.getElementById('bizClientWaText');
        if (ta) this.clientsWaDraft = ta.value;
        this.clientsMsgChannel = channel === 'whatsapp' ? 'whatsapp' : 'sms';
        this.renderClientModalContent();
    },

    renderClientModalWhatsAppTab: function(client) {
        const phone = this.getClientWaPhone(client);
        const builtins = this.getClientWaBuiltinTemplates();
        const customs = this.getClientWaCustomTemplates();
        const messages = Array.isArray(client.messages) ? client.messages : [];
        const activeTplId = this.clientsWaTemplateId;
        const activeCustom = customs.find(t => t.id === activeTplId);

        const chip = (t, isCustom) => `
            <div class="inline-flex items-center rounded-full border transition ${activeTplId === t.id ? 'bg-[#FFDD2D] border-[#FFDD2D] text-[#101114]' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'}">
                <button type="button" onclick="BusinessDashboardView.applyClientWaTemplate('${client.id}', '${t.id}')" class="h-8 ${isCustom ? 'pl-3 pr-1.5' : 'px-3'} text-xs font-semibold cursor-pointer whitespace-nowrap">${this.escapeHtml(t.name)}</button>
                ${isCustom ? `
                    <button type="button" title="Şablonu sil" onclick="BusinessDashboardView.deleteClientWaTemplate('${client.id}', '${t.id}')" class="w-6 h-6 mr-1 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>` : ''}
            </div>`;

        const varBtn = (key, label) => `
            <button type="button" onclick="BusinessDashboardView.insertClientWaVariable('{${key}}')" class="h-7 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-semibold transition cursor-pointer">${label}</button>`;

        const channel = this.clientsMsgChannel === 'whatsapp' ? 'whatsapp' : 'sms';
        const channelBtn = (key, label) => `
            <button type="button" onclick="BusinessDashboardView.setClientMsgChannel('${key}')" class="h-8 px-4 rounded-lg text-xs transition cursor-pointer ${channel === key ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900 font-semibold'}">${label}</button>`;

        const historyHtml = messages.slice().reverse().map(m => `
            <div class="rounded-xl bg-white border border-slate-200/90 px-3.5 py-3 shadow-2xs">
                <div class="flex items-center justify-between gap-2 mb-1.5">
                    <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">${this.getClientMsgChannelLabel(m.channel)}</span>
                    <span class="text-[11px] text-slate-400 font-medium">${this.formatClientFeedTime(m.sentAt)}</span>
                </div>
                <div class="text-xs text-slate-800 font-medium leading-relaxed break-words">${this.escapeHtml(m.text || '').replace(/\n/g, '<br>')}</div>
                <div class="flex items-center justify-end gap-3 mt-2 text-[11px] text-slate-400 font-medium">
                    ${m.author ? `<span class="mr-auto">${this.escapeHtml(m.author)}</span>` : ''}
                    <button type="button" onclick="BusinessDashboardView.resendClientWaMessage('${client.id}', '${m.id}')" class="hover:text-slate-800 transition cursor-pointer">Yenidən göndər</button>
                    <button type="button" onclick="BusinessDashboardView.deleteClientWaMessage('${client.id}', '${m.id}')" class="hover:text-rose-600 transition cursor-pointer">Sil</button>
                </div>
            </div>`).join('');

        return `
            <div class="space-y-4">
                <!-- Recipient + channel -->
                <div class="rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-4 flex items-center justify-between gap-3 flex-wrap">
                    <div class="min-w-0">
                        <div class="text-sm font-bold text-slate-900 truncate">${this.escapeHtml(client.name || '')}</div>
                        ${phone
                            ? `<div class="text-xs text-slate-500 font-medium">${this.formatClientWaPhone(phone)}</div>`
                            : `<div class="text-xs text-rose-600 font-semibold">Telefon nömrəsi düzgün deyil və ya qeyd olunmayıb</div>`}
                    </div>
                    ${phone ? `
                        <div class="flex items-center gap-2">
                            <span class="text-[11px] text-slate-400 font-medium">Göndərmə kanalı:</span>
                            <div class="inline-flex rounded-xl bg-slate-100 p-1 gap-1">
                                ${channelBtn('sms', 'SMS')}
                                ${channelBtn('whatsapp', 'WhatsApp')}
                            </div>
                        </div>` : `
                        <button type="button" onclick="BusinessDashboardView.setClientModalTab('info')" class="h-9 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer shrink-0">Nömrəni düzəlt</button>`}
                </div>

                <!-- Templates -->
                <div class="space-y-2">
                    <div class="text-xs font-bold text-slate-700">Hazır şablonlar</div>
                    <div class="flex flex-wrap gap-1.5">
                        ${builtins.map(t => chip(t, false)).join('')}
                        ${customs.map(t => chip(t, true)).join('')}
                    </div>
                </div>

                <!-- Composer -->
                <div class="rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-4 space-y-3">
                    <div class="flex items-center justify-between gap-2">
                        <label for="bizClientWaText" class="text-xs font-bold text-slate-700">Mesaj mətni</label>
                        <span id="bizClientWaCounter" class="text-[11px] text-slate-400 font-medium">0 simvol</span>
                    </div>
                    <textarea
                        id="bizClientWaText"
                        rows="5"
                        oninput="BusinessDashboardView.clientsWaDraft = this.value; BusinessDashboardView.updateClientWaPreview();"
                        placeholder="Mesajınızı yazın və ya şablon seçin..."
                        class="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-tbank-graphite outline-none resize-none leading-relaxed focus:bg-white focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition placeholder:text-slate-400"
                    >${this.escapeHtml(this.clientsWaDraft || '')}</textarea>
                    <div class="flex items-center gap-1.5 flex-wrap">
                        <span class="text-[11px] text-slate-400 font-medium mr-1">Dəyişənlər:</span>
                        ${varBtn('ad', 'Ad')}
                        ${varBtn('biznes', 'Biznes adı')}
                        ${varBtn('mutexessis', 'Mütəxəssis')}
                        ${varBtn('depozit', 'Depozit')}
                        ${varBtn('endirim', 'Endirim')}
                    </div>

                    <!-- Preview -->
                    <div class="rounded-xl bg-slate-50 border border-slate-200/90 p-3">
                        <div class="text-[11px] font-semibold text-slate-500 mb-2">Önizləmə</div>
                        <div id="bizClientWaPreview" class="text-xs text-slate-800 font-medium leading-relaxed break-words"></div>
                    </div>

                    <div class="flex items-center justify-between gap-2 flex-wrap pt-1">
                        <div class="flex items-center gap-2">
                            ${activeCustom ? `
                                <button type="button" onclick="BusinessDashboardView.updateClientWaTemplate('${client.id}')" class="h-10 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer">Şablonu yenilə</button>
                            ` : ''}
                            <button type="button" onclick="BusinessDashboardView.saveClientWaTemplate('${client.id}')" class="h-10 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer">${activeCustom ? 'Yeni şablon kimi saxla' : 'Şablon kimi saxla'}</button>
                        </div>
                        <button type="button" ${phone ? '' : 'disabled'} onclick="BusinessDashboardView.sendClientWaMessage('${client.id}')" class="h-10 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] disabled:opacity-40 disabled:cursor-not-allowed text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                            <span>${channel === 'whatsapp' ? 'WhatsApp ilə göndər' : 'SMS ilə göndər'}</span>
                        </button>
                    </div>
                </div>

                <!-- Sent history -->
                <div class="space-y-2">
                    <div class="text-sm font-bold text-slate-900">Göndərilmiş mesajlar <span class="text-slate-400 font-semibold">(${messages.length})</span></div>
                    ${messages.length ? `
                        <div class="space-y-2 max-h-[360px] overflow-y-auto">${historyHtml}</div>
                    ` : `
                        <div class="rounded-2xl border border-slate-200/90 bg-white py-8 text-center">
                            <div class="w-11 h-11 mx-auto rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-2">${this.getClientWaIconSvg('w-5 h-5')}</div>
                            <div class="text-xs font-bold text-slate-700">Hələ mesaj göndərilməyib</div>
                            <div class="text-[11px] text-slate-400 font-medium mt-0.5">Göndərilən mesajlar burada saxlanılacaq</div>
                        </div>
                    `}
                </div>
            </div>
        `;
    },

    updateClientWaPreview: function() {
        const client = this.getClientsData().find(c => c.id === this.clientsEditingId);
        const ta = document.getElementById('bizClientWaText');
        const prev = document.getElementById('bizClientWaPreview');
        const counter = document.getElementById('bizClientWaCounter');
        if (!client || !ta || !prev) return;
        const filled = this.fillClientWaVariables(ta.value, client);
        prev.innerHTML = filled.trim()
            ? this.escapeHtml(filled).replace(/\n/g, '<br>')
            : '<span class="text-slate-400">Mesaj burada görünəcək</span>';
        if (counter) counter.textContent = `${filled.length} simvol`;
    },

    insertClientWaVariable: function(token) {
        const ta = document.getElementById('bizClientWaText');
        if (!ta) return;
        const start = ta.selectionStart ?? ta.value.length;
        const end = ta.selectionEnd ?? ta.value.length;
        ta.value = ta.value.slice(0, start) + token + ta.value.slice(end);
        ta.focus();
        ta.setSelectionRange(start + token.length, start + token.length);
        this.clientsWaDraft = ta.value;
        this.updateClientWaPreview();
    },

    applyClientWaTemplate: function(clientId, tplId) {
        const tpl = [...this.getClientWaBuiltinTemplates(), ...this.getClientWaCustomTemplates()].find(t => t.id === tplId);
        if (!tpl) return;
        this.clientsWaTemplateId = tplId;
        this.clientsWaDraft = tpl.text;
        this.renderClientModalContent();
        const ta = document.getElementById('bizClientWaText');
        if (ta) ta.focus();
    },

    saveClientWaTemplate: function(clientId) {
        const ta = document.getElementById('bizClientWaText');
        const text = ta ? ta.value.trim() : '';
        if (!text) { if (typeof App !== 'undefined') App.showToast('Əvvəlcə mesaj mətnini yazın'); return; }
        this.openTextInputModal({
            title: 'Şablonu yadda saxla',
            description: 'Mesaj mətni şablon kimi saxlanılacaq',
            label: 'Şablonun adı',
            value: '',
            placeholder: 'Məs. Ad günü təbriki',
            confirmText: 'Yadda saxla',
            emptyError: 'Şablon adı boş ola bilməz',
            onConfirm: (clean) => {
                const list = this.getClientWaCustomTemplates();
                const tpl = { id: 'tpl-' + Date.now().toString(36), name: clean, text: text };
                list.push(tpl);
                this.saveClientWaCustomTemplates(list);
                this.clientsWaTemplateId = tpl.id;
                this.clientsWaDraft = text;
                this.renderClientModalContent();
                if (typeof App !== 'undefined') App.showToast('Şablon yadda saxlanıldı');
            }
        });
    },

    updateClientWaTemplate: function(clientId) {
        const ta = document.getElementById('bizClientWaText');
        const text = ta ? ta.value.trim() : '';
        if (!text) { if (typeof App !== 'undefined') App.showToast('Mesaj mətni boş ola bilməz'); return; }
        const list = this.getClientWaCustomTemplates();
        const tpl = list.find(t => t.id === this.clientsWaTemplateId);
        if (!tpl) return;
        tpl.text = text;
        this.saveClientWaCustomTemplates(list);
        this.clientsWaDraft = text;
        this.renderClientModalContent();
        if (typeof App !== 'undefined') App.showToast('Şablon yeniləndi');
    },

    deleteClientWaTemplate: function(clientId, tplId) {
        const tpl = this.getClientWaCustomTemplates().find(t => t.id === tplId);
        if (!tpl) return;
        this.openDeleteConfirmModal({
            title: 'Şablonu sil',
            message: `"${tpl.name}" şablonunu silmək istədiyinizə əminsiniz?`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                this.saveClientWaCustomTemplates(this.getClientWaCustomTemplates().filter(t => t.id !== tplId));
                if (this.clientsWaTemplateId === tplId) this.clientsWaTemplateId = null;
                this.renderClientModalContent();
                if (typeof App !== 'undefined') App.showToast('Şablon silindi');
            }
        });
    },

    openClientWaChat: function(clientId) {
        const client = this.getClientsData().find(c => c.id === clientId);
        const phone = client ? this.getClientWaPhone(client) : null;
        if (!phone) return;
        window.open(`https://wa.me/${phone}`, '_blank', 'noopener');
    },

    sendClientWaMessage: function(clientId, presetText, presetChannel) {
        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client) return;
        const phone = this.getClientWaPhone(client);
        if (!phone) { if (typeof App !== 'undefined') App.showToast('Müştərinin telefon nömrəsi düzgün deyil'); return; }

        let text = presetText;
        if (text === undefined) {
            const ta = document.getElementById('bizClientWaText');
            text = this.fillClientWaVariables(ta ? ta.value : '', client).trim();
        }
        if (!text) {
            if (typeof App !== 'undefined') App.showToast('Mesaj mətnini daxil edin');
            const ta = document.getElementById('bizClientWaText');
            if (ta) ta.focus();
            return;
        }

        const channel = presetChannel || (this.clientsMsgChannel === 'whatsapp' ? 'whatsapp' : 'sms');
        const label = this.getClientMsgChannelLabel(channel);
        if (channel === 'whatsapp') {
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        } else {
            window.location.href = `sms:+${phone}?body=${encodeURIComponent(text)}`;
        }

        if (!Array.isArray(client.messages)) client.messages = [];
        client.messages.push({
            id: 'MSG-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
            channel: channel,
            text: text,
            author: this.getClientCommentAuthor(),
            sentAt: new Date().toISOString()
        });
        this.addClientActivity(client, channel, `${label} mesajı göndərildi: "${text.length > 60 ? text.slice(0, 60) + '…' : text}"`);
        this.saveClientsData(allClients);

        if (presetText === undefined) {
            this.clientsWaDraft = '';
            this.clientsWaTemplateId = null;
        }
        this.renderClientModalContent();
        if (typeof App !== 'undefined') App.showToast(`${label} mesajı göndərildi və tarixçəyə əlavə edildi`);
    },

    resendClientWaMessage: function(clientId, msgId) {
        const client = this.getClientsData().find(c => c.id === clientId);
        const msg = client && Array.isArray(client.messages) ? client.messages.find(m => m.id === msgId) : null;
        if (!msg) return;
        this.sendClientWaMessage(clientId, msg.text, msg.channel === 'whatsapp' ? 'whatsapp' : 'sms');
    },

    deleteClientWaMessage: function(clientId, msgId) {
        this.openDeleteConfirmModal({
            title: 'Mesajı sil',
            message: 'Bu mesajı tarixçədən silmək istədiyinizə əminsiniz? Mesaj müştərinin telefonundan silinməyəcək.',
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const allClients = this.getClientsData();
                const client = allClients.find(c => c.id === clientId);
                if (!client || !Array.isArray(client.messages)) return;
                client.messages = client.messages.filter(m => m.id !== msgId);
                this.saveClientsData(allClients);
                this.renderClientModalContent();
                if (typeof App !== 'undefined') App.showToast('Mesaj silindi');
            }
        });
    },

    renderClientModalInfoTab: function(client) {
        const initials = client ? (client.name || 'M').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'M';
        const gender = client ? (client.gender || 'female') : 'female';

        let rawPhone = client ? (client.phone || '') : '';
        let cleanDigits = rawPhone.replace(/\D/g, '');
        if (cleanDigits.startsWith('994')) cleanDigits = cleanDigits.slice(3);
        cleanDigits = cleanDigits.slice(0, 9);
        let formattedPhone = '';
        if (cleanDigits.length > 0) {
            formattedPhone = '(' + cleanDigits.slice(0, 2);
            if (cleanDigits.length >= 2) formattedPhone += ') ' + cleanDigits.slice(2, 5);
            if (cleanDigits.length > 5) formattedPhone += '-' + cleanDigits.slice(5, 7);
            if (cleanDigits.length > 7) formattedPhone += '-' + cleanDigits.slice(7, 9);
        }

        const phoneClean = client ? (client.phone || '').replace(/[^0-9]/g, '') : '';

        return `
            <div class="space-y-4">
                
                ${client ? `
                    <!-- 1. Client Identity Banner (Matching Staff Profile Banner Style) -->
                    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-tbank-graphite via-[#2A2B30] to-[#121316] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md border border-black/10">
                        <div class="flex items-center gap-3.5 sm:gap-4 min-w-0">
                            <!-- Squircle Avatar with Gold Border -->
                            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-tbank-yellow/60 flex items-center justify-center text-xl sm:text-2xl font-black text-tbank-yellow shadow-inner shrink-0 overflow-hidden">
                                ${initials}
                            </div>
                            <div class="min-w-0">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <h4 class="text-base sm:text-lg font-bold tracking-tight leading-tight truncate text-white">${this.escapeHtml(client.name)}</h4>
                                    <span class="text-[10px] font-black px-1.5 py-0.5 rounded ${gender === 'male' ? 'bg-blue-500/80 text-white' : 'bg-pink-500/80 text-white'} shrink-0">${gender === 'male' ? 'Kişi' : 'Qadın'}</span>
                                    ${client.discountPercent ? `
                                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFDD2D] text-[#101114] shrink-0">-${client.discountPercent}% endirim</span>
                                    ` : ''}
                                </div>
                                <p class="text-xs text-amber-300 font-semibold truncate mt-0.5">${this.getClientCategoryLabel(client.category)}</p>
                                <div class="flex items-center gap-2 text-[11px] text-slate-400 font-medium truncate mt-0.5 flex-wrap">
                                    <span class="font-mono text-slate-300">${client.phone || ''}</span>
                                    <span>•</span>
                                    <span>ID: ${client.id}</span>
                                    <span>•</span>
                                    <span>Qeydiyyat: ${client.firstVisitDate ? this.formatDateDisplay(client.firstVisitDate) : '—'}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Direct Call & WhatsApp Quick Buttons -->
                        <div class="flex items-center gap-2 shrink-0">
                            ${client.phone ? `
                                <a href="tel:${client.phone}" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition flex items-center gap-1.5 shadow-2xs" title="Zəng et">
                                    <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    <span>Zəng</span>
                                </a>
                                <a href="https://wa.me/${phoneClean}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition flex items-center gap-1.5 shadow-2xs" title="WhatsApp ilə yaz">
                                    <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                                    <span>WhatsApp</span>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Section 1: Contact Details -->
                <div class="space-y-3">
                    <h5 class="text-xs font-bold text-slate-900">Şəxsi və əlaqə məlumatları</h5>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Ad və Soyad <span class="text-rose-500">*</span></label>
                            <input
                                type="text"
                                id="bizClientName"
                                value="${this.escapeHtml(client ? client.name || '' : '')}"
                                placeholder="Məsələn: Kənan Cəfərov"
                                class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Mobil nömrə <span class="text-rose-500">*</span></label>
                            <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center overflow-hidden focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                <div class="flex items-center gap-1.5 px-3 bg-slate-100/90 border-r border-slate-200 h-full select-none shrink-0">
                                    <span class="inline-flex items-center justify-center w-5 h-3.5 rounded-[2px] overflow-hidden shrink-0 shadow-xs border border-slate-200">
                                        <svg viewBox="0 0 1200 600" class="w-full h-full object-cover">
                                            <rect width="1200" height="200" fill="#00B5E2"/>
                                            <rect y="200" width="1200" height="200" fill="#EF3340"/>
                                            <rect y="400" width="1200" height="200" fill="#509E2F"/>
                                            <circle cx="585" cy="300" r="60" fill="#ffffff"/>
                                            <circle cx="600" cy="300" r="48" fill="#EF3340"/>
                                            <polygon points="630,300 645,304 656,295 655,308 668,312 656,316 655,329 645,320 630,324 639,312" fill="#ffffff"/>
                                        </svg>
                                    </span>
                                    <span class="text-xs font-bold text-tbank-graphite tracking-tight">+994</span>
                                </div>
                                <input
                                    id="bizClientPhone"
                                    type="tel"
                                    value="${formattedPhone}"
                                    maxlength="15"
                                    placeholder="(50) 000-00-00"
                                    oninput="if(window.App && App.formatAzPhone) App.formatAzPhone(this);"
                                    class="w-full h-full px-3 bg-transparent text-xs font-semibold text-tbank-graphite outline-none"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">E-poçt ünvanı</label>
                            <input
                                type="email"
                                id="bizClientEmail"
                                value="${this.escapeHtml(client ? client.email || '' : '')}"
                                placeholder="musteri@zeyvo.az"
                                class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Cins</label>
                            <div class="grid grid-cols-2 gap-2 h-10">
                                <button
                                    type="button"
                                    id="clientGenderBtnFemale"
                                    onclick="BusinessDashboardView.selectClientGender('female')"
                                    class="${this.getClientGenderBtnClass('female', gender)}"
                                >
                                    <span>Qadın</span>
                                </button>
                                <button
                                    type="button"
                                    id="clientGenderBtnMale"
                                    onclick="BusinessDashboardView.selectClientGender('male')"
                                    class="${this.getClientGenderBtnClass('male', gender)}"
                                >
                                    <span>Kişi</span>
                                </button>
                            </div>
                            <input type="hidden" id="bizClientGender" value="${gender}">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Doğum tarixi</label>
                            ${this.renderZeyvoDateField({ id: 'bizClientBirthDate', value: client ? client.birthDate || '' : '', allowEmpty: true, placeholder: 'Tarix seçin', defaultView: '1995-01-01' })}
                        </div>
                    </div>
                </div>

                <!-- Section 2: Preferences & Loyalty -->
                <div class="space-y-3 pt-2 border-t border-slate-100">
                    <h5 class="text-xs font-bold text-slate-900">Xidmət və loyallıq parametrləri</h5>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Müştəri kateqoriyası</label>
                            <select
                                id="bizClientCategory"
                                class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition cursor-pointer"
                            >
                                <option value="regular" ${!client || client.category === 'regular' ? 'selected' : ''}>Daimi müştəri</option>
                                <option value="vip" ${client && client.category === 'vip' ? 'selected' : ''}>VIP müştəri</option>
                                <option value="new" ${client && client.category === 'new' ? 'selected' : ''}>Yeni müştəri</option>
                                <option value="risk" ${client && client.category === 'risk' ? 'selected' : ''}>Risk qrupunda (Qayıtmayan)</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Sevimli mütəxəssis (usta)</label>
                            <input
                                type="text"
                                id="bizClientStaff"
                                value="${this.escapeHtml(client ? client.preferredStaff || '' : '')}"
                                placeholder="Məsələn: Fərid Əliyev"
                                class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Loyallıq kartı / səviyyəsi</label>
                            <select
                                id="bizClientLoyaltyTier"
                                class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition cursor-pointer"
                            >
                                <option value="standard" ${!client || (client.loyaltyTier || 'standard') === 'standard' ? 'selected' : ''}>Standart Kart (+3% keşbek)</option>
                                <option value="silver" ${client && client.loyaltyTier === 'silver' ? 'selected' : ''}>Gümüş Kart (+5% keşbek)</option>
                                <option value="gold" ${client && client.loyaltyTier === 'gold' ? 'selected' : ''}>Qızıl Kart (+7% keşbek)</option>
                                <option value="vip" ${client && client.loyaltyTier === 'vip' ? 'selected' : ''}>VIP Kart (+10% keşbek)</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Fərdi endirim faizi (%)</label>
                            <input
                                type="number"
                                id="bizClientDiscount"
                                min="0"
                                max="100"
                                step="1"
                                value="${client ? client.discountPercent || 0 : 0}"
                                placeholder="0"
                                class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">${client ? 'Cari depozit balansı (₼)' : 'İlkin depozit balansı (₼)'}</label>
                            <input
                                type="number"
                                id="bizClientDeposit"
                                min="0"
                                step="0.5"
                                value="${client ? (parseFloat(client.depositBalance) || 0) : 0}"
                                placeholder="0.00"
                                class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">${client ? 'Cari keşbek / bonus balansı (₼)' : 'İlkin bonus balansı (₼)'}</label>
                            <input
                                type="number"
                                id="bizClientCashback"
                                min="0"
                                step="0.5"
                                value="${client ? (parseFloat(client.cashbackBalance) || 0) : 0}"
                                placeholder="0.00"
                                class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition"
                            />
                        </div>
                    </div>
                </div>

                <!-- Section 3: Notes -->
                <div class="space-y-1.5 pt-2 border-t border-slate-100">
                    <label class="block text-xs font-bold text-slate-500 mb-1">Qeydlər və xüsusi istəklər</label>
                    <textarea
                        id="bizClientNote"
                        rows="3"
                        placeholder="Dəri həssaslığı, sevimli içki, saç boyası nömrəsi, fərdi istəklər və s."
                        class="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition resize-none leading-relaxed"
                    >${this.escapeHtml(client ? client.note || '' : '')}</textarea>
                </div>

                <!-- Footer Actions -->
                <div class="flex items-center justify-end pt-3 border-t border-slate-100 gap-2">
                    ${ZeyvoUI.button({ label: "İmtina", variant: "secondary", onClick: "BusinessDashboardView.closeClientModal()", size: "md", type: "button" })}
                    <button type="button" id="bizClientModalSubmitBtn" onclick="BusinessDashboardView.handleSaveClient()" class="px-6 py-2.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs cursor-pointer active:scale-95">
                        ${client ? 'Dəyişiklikləri saxla' : 'Əlavə et'}
                    </button>
                </div>

            </div>
        `;
    },

    getClientGenderBtnClass: function(btnGender, activeGender) {
        const base = 'h-10 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer';
        if (btnGender === activeGender) {
            return btnGender === 'female'
                ? `${base} border-2 border-pink-500 bg-pink-50 text-pink-700 font-black shadow-xs`
                : `${base} border-2 border-blue-600 bg-blue-50 text-blue-700 font-black shadow-xs`;
        }
        return `${base} border border-slate-200 bg-slate-50 text-slate-600 font-bold hover:bg-slate-100`;
    },

    selectClientGender: function(gender) {
        const hidden = document.getElementById('bizClientGender');
        if (hidden) hidden.value = gender;
        const btnFemale = document.getElementById('clientGenderBtnFemale');
        const btnMale = document.getElementById('clientGenderBtnMale');
        if (btnFemale) btnFemale.className = this.getClientGenderBtnClass('female', gender);
        if (btnMale) btnMale.className = this.getClientGenderBtnClass('male', gender);
    },

    renderClientModalHistoryTab: function(client) {
        const visits = Array.isArray(client.history) ? client.history : [];
        const isQuickAddOpen = this.clientsQuickVisitOpen;
        const todayIso = new Date().toISOString().slice(0, 10);

        return `
            <div class="space-y-4">
                
                <!-- Action & Summary Bar -->
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <div class="font-bold text-slate-900 text-xs">Ziyarət və xidmət jurnalı</div>
                        <div class="text-[11px] text-slate-500 font-normal mt-0.5">
                            Cəmi: <strong class="text-slate-800">${visits.length} qəbul</strong>
                            ${client.lastVisitDate ? ` • Sonuncu ziyarət: <span class="font-mono text-slate-700">${this.formatDateDisplay(client.lastVisitDate)}</span> (${this.formatClientRelativeDate(client.lastVisitDate)})` : ''}
                        </div>
                    </div>

                    <div class="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onclick="BusinessDashboardView.toggleClientQuickVisitForm()"
                            class="px-3 py-1.5 rounded-xl ${isQuickAddOpen ? 'bg-slate-200 text-slate-700' : 'bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114]'} text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                            <span>${isQuickAddOpen ? 'Formu bağla' : 'Ziyarət əlavə et'}</span>
                        </button>
                        <button
                            type="button"
                            onclick="BusinessDashboardView.scheduleClientVisit('${client.id}')"
                            class="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                            <span>Təqvimdə qəbul yaz</span>
                        </button>
                    </div>
                </div>

                <!-- Inline Quick Add Visit Form -->
                ${isQuickAddOpen ? `
                    <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-3">
                        <div class="flex items-center justify-between">
                            <h5 class="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5 text-amber-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                                <span>Yeni ziyarət qeydi əlavə et</span>
                            </h5>
                            <button type="button" onclick="BusinessDashboardView.toggleClientQuickVisitForm()" class="text-slate-400 hover:text-slate-700 transition cursor-pointer">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                            <div class="space-y-1">
                                <label class="block text-[11px] font-bold text-slate-600">Tarix</label>
                                ${this.renderZeyvoDateField({ id: 'bizClientQuickVisitDate', value: todayIso, bgClass: 'bg-white' })}
                            </div>
                            <div class="space-y-1 sm:col-span-2">
                                <label class="block text-[11px] font-bold text-slate-600">Göstərilən xidmət <span class="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    id="bizClientQuickVisitService"
                                    placeholder="Məsələn: Saç kəsimi və saqqal"
                                    class="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition"
                                />
                            </div>
                            <div class="space-y-1">
                                <label class="block text-[11px] font-bold text-slate-600">Məbləğ (₼)</label>
                                <input
                                    type="number"
                                    id="bizClientQuickVisitAmount"
                                    placeholder="0.00"
                                    step="1"
                                    min="0"
                                    class="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition"
                                />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div class="space-y-1">
                                <label class="block text-[11px] font-bold text-slate-600">Xidmət göstərən mütəxəssis</label>
                                <input
                                    type="text"
                                    id="bizClientQuickVisitStaff"
                                    placeholder="Usta / Stilist"
                                    value="${this.escapeHtml(client.preferredStaff || '')}"
                                    class="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition"
                                />
                            </div>
                            <div class="flex items-end justify-end gap-2 pt-1">
                                ${ZeyvoUI.button({ label: "İmtina", variant: "secondary", onClick: "BusinessDashboardView.toggleClientQuickVisitForm()", size: "md", type: "button" })}
                                <button type="button" onclick="BusinessDashboardView.saveClientQuickVisit('${client.id}')" class="h-10 px-5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs transition shadow-xs cursor-pointer active:scale-95">
                                    Yadda saxla
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Visits Table -->
                <div class="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs font-semibold min-w-[550px]">
                            <thead class="bg-slate-50 text-slate-500 border-b border-slate-200/80">
                                <tr>
                                    <th class="py-2.5 px-3">Tarix</th>
                                    <th class="py-2.5 px-3">Xidmət</th>
                                    <th class="py-2.5 px-3">Mütəxəssis</th>
                                    <th class="py-2.5 px-3">Məbləğ</th>
                                    <th class="py-2.5 px-3">Status</th>
                                    <th class="py-2.5 px-3 text-right">Fəaliyyət</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-slate-700">
                                ${visits.length === 0 ? `
                                    <tr>
                                        <td colspan="6" class="py-8 px-4 text-center">
                                            <div class="max-w-xs mx-auto space-y-2">
                                                <div class="w-10 h-10 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                                </div>
                                                <div class="font-bold text-slate-800 text-xs">Hələlik ziyarət qeydə alınmayıb</div>
                                                <p class="text-[11px] text-slate-400 font-normal">Bu müştərinin ilk qəbulunu yuxarıdakı "Ziyarət əlavə et" düyməsi ilə qeyd edə bilərsiniz.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ` : visits.map((v, idx) => `
                                    <tr class="hover:bg-slate-50/70 transition">
                                        <td class="py-2.5 px-3 font-mono text-slate-800 whitespace-nowrap">${this.formatDateDisplay(v.date)}</td>
                                        <td class="py-2.5 px-3 font-bold text-slate-900">${this.escapeHtml(v.service)}</td>
                                        <td class="py-2.5 px-3 text-slate-600">${this.escapeHtml(v.staff || '—')}</td>
                                        <td class="py-2.5 px-3 font-bold font-mono text-slate-900 whitespace-nowrap">${v.amount} ₼</td>
                                        <td class="py-2.5 px-3 whitespace-nowrap">
                                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                                v.status === 'Tamamlandı' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' :
                                                v.status === 'Planlaşdırılıb' ? 'bg-sky-50 text-sky-700 border border-sky-200/50' :
                                                'bg-slate-100 text-slate-600 border border-slate-200/50'
                                            }">
                                                ● ${v.status || 'Tamamlandı'}
                                            </span>
                                        </td>
                                        <td class="py-2.5 px-3 text-right whitespace-nowrap">
                                            <button
                                                type="button"
                                                onclick="BusinessDashboardView.deleteClientVisit('${client.id}', ${idx})"
                                                class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                                title="Ziyarəti sil"
                                            >
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        `;
    },

    /* =========================================================================
       CLIENT MODAL: LOYALLIQ BÖLMƏSİ (LOYALTY TAB)
       ========================================================================= */

    getClientLoyaltyRecord: function(client) {
        if (!client) return null;
        const loyaltyData = this.getLoyaltyData();
        const loyaltyClients = Array.isArray(loyaltyData.clients) ? loyaltyData.clients : [];
        const normPhone = (p) => (p || '').replace(/\D/g, '');
        const clientPhoneDigits = normPhone(client.phone);

        let match = loyaltyClients.find(lc => lc.id === client.id || (normPhone(lc.phone) && normPhone(lc.phone) === clientPhoneDigits));
        if (!match) {
            // Auto generate card number based on id
            const numPart = (client.id || '').replace(/\D/g, '') || String(Math.floor(100000 + Math.random() * 900000));
            match = {
                id: client.id,
                name: client.name,
                phone: client.phone,
                cardNumber: client.loyaltyCardNumber || `LC-${numPart.padEnd(6, '0').slice(0, 6)}`,
                tier: client.loyaltyTier || (client.category === 'vip' ? 'vip' : (parseFloat(client.totalSpent) >= 800 ? 'gold' : (parseFloat(client.totalSpent) >= 300 ? 'silver' : 'standard'))),
                bonusBalance: parseFloat(client.cashbackBalance) || 0,
                totalSpent: parseFloat(client.totalSpent) || 0,
                visitsCount: client.totalVisits || (Array.isArray(client.history) ? client.history.length : 0),
                lastVisit: client.lastVisitDate || new Date().toISOString().slice(0, 10),
                history: []
            };
            loyaltyClients.push(match);
            loyaltyData.clients = loyaltyClients;
            this.saveLoyaltyData(loyaltyData);
        } else {
            // Keep bonus balance synced if client had cashbackBalance
            if (client.cashbackBalance !== undefined && parseFloat(client.cashbackBalance) !== parseFloat(match.bonusBalance)) {
                match.bonusBalance = parseFloat(client.cashbackBalance) || 0;
            }
            if (client.loyaltyCardNumber && match.cardNumber !== client.loyaltyCardNumber) {
                match.cardNumber = client.loyaltyCardNumber;
            }
        }
        return match;
    },

    getClientDepositHistory: function(client) {
        if (!client) return [];
        if (!Array.isArray(client.depositHistory)) {
            client.depositHistory = [];
            const depBal = parseFloat(client.depositBalance) || 0;
            if (depBal > 0) {
                client.depositHistory.push({
                    id: 'DEP-INIT',
                    date: (client.firstVisitDate || new Date().toISOString().slice(0, 10)) + ' 10:00',
                    type: 'topup',
                    amount: depBal,
                    method: 'Bank kartı',
                    note: 'İlkin depozit qalığı',
                    balanceAfter: depBal
                });
            }
        }
        return client.depositHistory;
    },

    adjustClientDeposit: function(clientId, type, amount, method = 'Nağd', note = '') {
        const amt = parseFloat(amount);
        if (!amt || isNaN(amt) || amt <= 0) return;

        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client) return;

        const currentBal = parseFloat(client.depositBalance) || 0;
        let newBal = currentBal;
        if (type === 'topup' || type === 'add') {
            newBal = currentBal + amt;
        } else if (type === 'spend' || type === 'redeem') {
            if (amt > currentBal) {
                if (typeof App !== 'undefined') App.showToast('Silinən məbləğ mövcud depozit balansından çox ola bilməz');
                return;
            }
            newBal = Math.max(0, currentBal - amt);
        }

        client.depositBalance = newBal;
        const depHistory = this.getClientDepositHistory(client);
        const now = new Date();
        const dateStr = `${now.toISOString().slice(0, 10)} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        depHistory.unshift({
            id: 'DEP-' + Date.now().toString(36),
            date: dateStr,
            type: (type === 'topup' || type === 'add') ? 'topup' : 'spend',
            amount: amt,
            method: method || 'Nağd',
            note: note || ((type === 'topup' || type === 'add') ? 'Depozit artırılması' : 'Xidmət haqqına silinmə'),
            balanceAfter: newBal
        });

        const actText = (type === 'topup' || type === 'add')
            ? `Depozit hesabı +${amt.toFixed(2)} ₼ artırıldı (${method}, yeni balans: ${newBal.toFixed(2)} ₼)`
            : `Depozit hesabından -${amt.toFixed(2)} ₼ istifadə edildi (yeni balans: ${newBal.toFixed(2)} ₼)`;

        this.addClientActivity(client, 'deposit', actText);
        this.saveClientsData(allClients);
        this.refreshClientsCanvas();
        this.renderClientModalContent();
        if (typeof App !== 'undefined') {
            App.showToast((type === 'topup' || type === 'add') ? `+${amt.toFixed(2)} ₼ depozit uğurla daxil edildi` : `-${amt.toFixed(2)} ₼ depozitdən silindi`);
        }
    },

    openDepositModal: function(clientId, defaultType = 'topup') {
        this.closeDepositModal();
        const client = this.getClientsData().find(c => c.id === clientId);
        if (!client) return;

        const depositVal = parseFloat(client.depositBalance) || 0;
        const esc = (s) => this.escapeHtml(String(s == null ? '' : s));

        const overlay = document.createElement('div');
        overlay.id = 'bizDepositModal';
        overlay.className = 'fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade';
        overlay.innerHTML = `
            <div class="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden animate-scale-up">
                <!-- Clean Modal Header (GEMINI.md Rule 5 compliant) -->
                <div class="px-6 pt-5 pb-4 flex items-start justify-between gap-4 border-b border-slate-100">
                    <div class="min-w-0">
                        <h3 class="text-base font-bold text-slate-900">Depozit əməliyyatı</h3>
                        <p class="text-xs text-slate-500 font-normal mt-0.5">${esc(client.name)} • Cari qalıq: <strong class="font-mono text-slate-800">${depositVal.toFixed(2)} ₼</strong></p>
                    </div>
                    <button type="button" onclick="BusinessDashboardView.closeDepositModal()" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                </div>

                <div class="p-6 space-y-4">
                    <!-- Segmented Operation Selector -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Əməliyyat növü</label>
                        <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80">
                            <button type="button" id="depTypeTopupBtn" onclick="BusinessDashboardView.setDepositModalType('topup')" class="py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${defaultType === 'topup' ? 'bg-[#FFDD2D] text-[#101114] shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                                <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                <span>Mədaxil (Artır)</span>
                            </button>
                            <button type="button" id="depTypeSpendBtn" onclick="BusinessDashboardView.setDepositModalType('spend')" class="py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${defaultType === 'spend' ? 'bg-[#FFDD2D] text-[#101114] shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                                <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 12H4"/></svg>
                                <span>Məxaric (Sil / Ödə)</span>
                            </button>
                        </div>
                        <input type="hidden" id="bizDepositOpType" value="${defaultType}">
                    </div>

                    <!-- Amount Input & Preset Pills -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Məbləğ (₼)</label>
                        <div class="flex items-center h-11 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-slate-900 focus-within:bg-white transition overflow-hidden">
                            <input type="number" id="bizDepositAmountInput" min="0.5" step="0.5" placeholder="0.00" class="flex-1 min-w-0 h-full px-3.5 bg-transparent text-base font-bold font-mono text-slate-900 outline-none">
                            <span class="h-full px-3.5 flex items-center bg-slate-100 border-l border-slate-200 text-xs font-bold text-slate-600">₼</span>
                        </div>
                        <div class="flex items-center gap-1.5 mt-2 flex-wrap">
                            <button type="button" onclick="document.getElementById('bizDepositAmountInput').value = 20" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">20 ₼</button>
                            <button type="button" onclick="document.getElementById('bizDepositAmountInput').value = 50" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">50 ₼</button>
                            <button type="button" onclick="document.getElementById('bizDepositAmountInput').value = 100" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">100 ₼</button>
                            <button type="button" onclick="document.getElementById('bizDepositAmountInput').value = 200" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">200 ₼</button>
                        </div>
                    </div>

                    <!-- Payment Method (shown when topup) -->
                    <div id="bizDepositMethodRow" class="${defaultType === 'spend' ? 'hidden' : ''}">
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Ödəniş üsulu</label>
                        <div class="relative">
                            <select id="bizDepositPaymentMethod" class="w-full h-10 pl-3.5 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 outline-none appearance-none cursor-pointer focus:border-slate-900 focus:bg-white transition">
                                <option value="Nağd">Nağd ödəniş</option>
                                <option value="Bank kartı (Terminal)" selected>Bank kartı (POS Terminal)</option>
                                <option value="Bank köçürməsi">Bank köçürməsi</option>
                            </select>
                            <svg class="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                        </div>
                    </div>

                    <!-- Note / Description -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Təsvir və ya qeyd</label>
                        <input type="text" id="bizDepositNoteInput" placeholder="Məs: Avans depoziti, paket ödənişi..." class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-slate-900 focus:bg-white transition placeholder:text-slate-400">
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="px-6 pb-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                    ${ZeyvoUI.button({ label: "İmtina", variant: "secondary", onClick: "BusinessDashboardView.closeDepositModal()", size: "md", type: "button" })}
                    <button type="button" onclick="BusinessDashboardView.submitDepositModal('${client.id}')" class="h-10 px-5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs cursor-pointer active:scale-95">Təsdiq et</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        const inp = document.getElementById('bizDepositAmountInput');
        if (inp) inp.focus();
    },

    setDepositModalType: function(type) {
        const opInp = document.getElementById('bizDepositOpType');
        if (opInp) opInp.value = type;
        const btnTopup = document.getElementById('depTypeTopupBtn');
        const btnSpend = document.getElementById('depTypeSpendBtn');
        const methodRow = document.getElementById('bizDepositMethodRow');

        if (type === 'topup') {
            if (btnTopup) btnTopup.className = 'py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer bg-[#FFDD2D] text-[#101114] shadow-xs';
            if (btnSpend) btnSpend.className = 'py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900';
            if (methodRow) methodRow.classList.remove('hidden');
        } else {
            if (btnTopup) btnTopup.className = 'py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900';
            if (btnSpend) btnSpend.className = 'py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer bg-[#FFDD2D] text-[#101114] shadow-xs';
            if (methodRow) methodRow.classList.add('hidden');
        }
    },

    closeDepositModal: function() {
        const el = document.getElementById('bizDepositModal');
        if (el) el.remove();
    },

    submitDepositModal: function(clientId) {
        const opInp = document.getElementById('bizDepositOpType');
        const amtInp = document.getElementById('bizDepositAmountInput');
        const methodInp = document.getElementById('bizDepositPaymentMethod');
        const noteInp = document.getElementById('bizDepositNoteInput');

        const type = opInp ? opInp.value : 'topup';
        const amt = parseFloat(amtInp ? amtInp.value : 0);
        if (!amt || isNaN(amt) || amt <= 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün məbləğ daxil edin');
            if (amtInp) amtInp.focus();
            return;
        }

        const method = methodInp ? methodInp.value : 'Nağd';
        const note = noteInp ? noteInp.value.trim() : '';

        this.adjustClientDeposit(clientId, type, amt, method, note);
        this.closeDepositModal();
    },

    openBonusModal: function(clientId, defaultType = 'add') {
        this.closeBonusModal();
        const client = this.getClientsData().find(c => c.id === clientId);
        if (!client) return;

        const loyaltyRecord = this.getClientLoyaltyRecord(client);
        const cashbackVal = parseFloat(client.cashbackBalance !== undefined ? client.cashbackBalance : (loyaltyRecord ? loyaltyRecord.bonusBalance : 0)) || 0;
        const esc = (s) => this.escapeHtml(String(s == null ? '' : s));

        const overlay = document.createElement('div');
        overlay.id = 'bizBonusModal';
        overlay.className = 'fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade';
        overlay.innerHTML = `
            <div class="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden animate-scale-up">
                <!-- Clean Modal Header (GEMINI.md Rule 5 compliant) -->
                <div class="px-6 pt-5 pb-4 flex items-start justify-between gap-4 border-b border-slate-100">
                    <div class="min-w-0">
                        <h3 class="text-base font-bold text-slate-900">Bonus və keşbek idarəetməsi</h3>
                        <p class="text-xs text-slate-500 font-normal mt-0.5">${esc(client.name)} • Mövcud bonus: <strong class="font-mono text-emerald-700">${cashbackVal.toFixed(2)} ₼</strong></p>
                    </div>
                    <button type="button" onclick="BusinessDashboardView.closeBonusModal()" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                </div>

                <div class="p-6 space-y-4">
                    <!-- Segmented Operation Selector -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Əməliyyat növü</label>
                        <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80">
                            <button type="button" id="bonusTypeAddBtn" onclick="BusinessDashboardView.setBonusModalType('add')" class="py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${defaultType === 'add' ? 'bg-[#FFDD2D] text-[#101114] shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                                <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                <span>Bonus əlavə et</span>
                            </button>
                            <button type="button" id="bonusTypeRedeemBtn" onclick="BusinessDashboardView.setBonusModalType('redeem')" class="py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${defaultType === 'redeem' ? 'bg-[#FFDD2D] text-[#101114] shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                                <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 12H4"/></svg>
                                <span>Bonus sil (Ödəniş)</span>
                            </button>
                        </div>
                        <input type="hidden" id="bizBonusOpType" value="${defaultType}">
                    </div>

                    <!-- Amount Input & Preset Pills -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Bonus məbləği (₼)</label>
                        <div class="flex items-center h-11 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-slate-900 focus-within:bg-white transition overflow-hidden">
                            <input type="number" id="bizBonusAmountInput" min="0.5" step="0.5" placeholder="0.00" class="flex-1 min-w-0 h-full px-3.5 bg-transparent text-base font-bold font-mono text-slate-900 outline-none">
                            <span class="h-full px-3.5 flex items-center bg-slate-100 border-l border-slate-200 text-xs font-bold text-slate-600">bonus (₼)</span>
                        </div>
                        <div class="flex items-center gap-1.5 mt-2 flex-wrap">
                            <button type="button" onclick="document.getElementById('bizBonusAmountInput').value = 5" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">+5 ₼</button>
                            <button type="button" onclick="document.getElementById('bizBonusAmountInput').value = 10" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">+10 ₼</button>
                            <button type="button" onclick="document.getElementById('bizBonusAmountInput').value = 20" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">+20 ₼</button>
                            <button type="button" onclick="document.getElementById('bizBonusAmountInput').value = 50" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">+50 ₼</button>
                        </div>
                    </div>

                    <!-- Reason Select -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Əməliyyat səbəbi</label>
                        <div class="relative">
                            <select id="bizBonusReasonSelect" class="w-full h-10 pl-3.5 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 outline-none appearance-none cursor-pointer focus:border-slate-900 focus:bg-white transition">
                                ${defaultType === 'add' ? `
                                    <option value="Xidmət qəbulundan keşbek" selected>Xidmət qəbulundan keşbek</option>
                                    <option value="Ad günü təbrik bonusu">Ad günü təbrik bonusu</option>
                                    <option value="Xüsusi aksiya mükafatı">Xüsusi aksiya mükafatı</option>
                                    <option value="Xidmət kompensasiyası">Xidmət kompensasiyası</option>
                                    <option value="Fərdi / İnzibati düzəliş">Fərdi / İnzibati düzəliş</option>
                                ` : `
                                    <option value="Xidmət haqqına silinmə" selected>Xidmət haqqına silinmə</option>
                                    <option value="Məhsul alışına silinmə">Məhsul alışına silinmə</option>
                                    <option value="Vaxtı bitmiş bonusların silinməsi">Vaxtı bitmiş bonusların silinməsi</option>
                                    <option value="İnzibati düzəliş">İnzibati düzəliş</option>
                                `}
                            </select>
                            <svg class="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                        </div>
                    </div>

                    <!-- Note -->
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Şərh (İxtiyari)</label>
                        <input type="text" id="bizBonusNoteInput" placeholder="Əlavə qeydlər..." class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-slate-900 focus:bg-white transition placeholder:text-slate-400">
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="px-6 pb-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                    ${ZeyvoUI.button({ label: "İmtina", variant: "secondary", onClick: "BusinessDashboardView.closeBonusModal()", size: "md", type: "button" })}
                    <button type="button" onclick="BusinessDashboardView.submitBonusModal('${client.id}')" class="h-10 px-5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs cursor-pointer active:scale-95">Təsdiq et</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        const inp = document.getElementById('bizBonusAmountInput');
        if (inp) inp.focus();
    },

    setBonusModalType: function(type) {
        const opInp = document.getElementById('bizBonusOpType');
        if (opInp) opInp.value = type;
        const btnAdd = document.getElementById('bonusTypeAddBtn');
        const btnRedeem = document.getElementById('bonusTypeRedeemBtn');
        const reasonSelect = document.getElementById('bizBonusReasonSelect');

        if (type === 'add') {
            if (btnAdd) btnAdd.className = 'py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer bg-[#FFDD2D] text-[#101114] shadow-xs';
            if (btnRedeem) btnRedeem.className = 'py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900';
            if (reasonSelect) {
                reasonSelect.innerHTML = `
                    <option value="Xidmət qəbulundan keşbek" selected>Xidmət qəbulundan keşbek</option>
                    <option value="Ad günü təbrik bonusu">Ad günü təbrik bonusu</option>
                    <option value="Xüsusi aksiya mükafatı">Xüsusi aksiya mükafatı</option>
                    <option value="Xidmət kompensasiyası">Xidmət kompensasiyası</option>
                    <option value="Fərdi / İnzibati düzəliş">Fərdi / İnzibati düzəliş</option>
                `;
            }
        } else {
            if (btnAdd) btnAdd.className = 'py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900';
            if (btnRedeem) btnRedeem.className = 'py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer bg-[#FFDD2D] text-[#101114] shadow-xs';
            if (reasonSelect) {
                reasonSelect.innerHTML = `
                    <option value="Xidmət haqqına silinmə" selected>Xidmət haqqına silinmə</option>
                    <option value="Məhsul alışına silinmə">Məhsul alışına silinmə</option>
                    <option value="Vaxtı bitmiş bonusların silinməsi">Vaxtı bitmiş bonusların silinməsi</option>
                    <option value="İnzibati düzəliş">İnzibati düzəliş</option>
                `;
            }
        }
    },

    closeBonusModal: function() {
        const el = document.getElementById('bizBonusModal');
        if (el) el.remove();
    },

    submitBonusModal: function(clientId) {
        const opInp = document.getElementById('bizBonusOpType');
        const amtInp = document.getElementById('bizBonusAmountInput');
        const reasonSelect = document.getElementById('bizBonusReasonSelect');
        const noteInp = document.getElementById('bizBonusNoteInput');

        const type = opInp ? opInp.value : 'add';
        const amt = parseFloat(amtInp ? amtInp.value : 0);
        if (!amt || isNaN(amt) || amt <= 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün məbləğ daxil edin');
            if (amtInp) amtInp.focus();
            return;
        }

        const reason = reasonSelect ? reasonSelect.value : '';
        const note = noteInp ? noteInp.value.trim() : '';
        const fullNote = note ? `${reason}: ${note}` : reason;

        this.adjustClientLoyaltyBonus(clientId, type, amt, fullNote);
        this.closeBonusModal();
    },

    openTierSelectModal: function(clientId) {
        this.closeTierSelectModal();
        const client = this.getClientsData().find(c => c.id === clientId);
        if (!client) return;

        const loyaltyData = this.getLoyaltyData();
        const tiers = Array.isArray(loyaltyData.tiers) ? loyaltyData.tiers : [];
        const loyaltyRecord = this.getClientLoyaltyRecord(client);
        const currentTierId = client.loyaltyTier || (loyaltyRecord ? loyaltyRecord.tier : 'standard') || 'standard';
        const esc = (s) => this.escapeHtml(String(s == null ? '' : s));

        const overlay = document.createElement('div');
        overlay.id = 'bizTierSelectModal';
        overlay.className = 'fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade';
        overlay.innerHTML = `
            <div class="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden animate-scale-up">
                <!-- Clean Modal Header (GEMINI.md Rule 5 compliant) -->
                <div class="px-6 pt-5 pb-4 flex items-start justify-between gap-4 border-b border-slate-100">
                    <div class="min-w-0">
                        <h3 class="text-base font-bold text-slate-900">Loyallıq dərəcəsini seçin</h3>
                        <p class="text-xs text-slate-500 font-normal mt-0.5">${esc(client.name)} üçün kart dərəcəsini fərdi olaraq dəyişin</p>
                    </div>
                    <button type="button" onclick="BusinessDashboardView.closeTierSelectModal()" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                </div>

                <div class="p-6 space-y-3 max-h-[70vh] overflow-y-auto no-scrollbar">
                    ${tiers.map(t => {
                        const isCurrent = t.id === currentTierId;
                        return `
                            <div class="p-4 rounded-2xl border ${isCurrent ? 'border-amber-400 bg-amber-50/40 ring-1 ring-amber-400' : 'border-slate-200/90 bg-slate-50/50 hover:bg-slate-50'} transition flex items-center justify-between gap-4">
                                <div class="min-w-0">
                                    <div class="flex items-center gap-2">
                                        <span class="font-bold text-sm text-slate-900">${esc(t.name)}</span>
                                        ${isCurrent ? `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FFDD2D] text-[#101114]">Cari dərəcə</span>` : ''}
                                    </div>
                                    <div class="text-xs text-slate-500 mt-1 flex items-center gap-3 flex-wrap">
                                        <span class="font-bold text-amber-700 font-mono">+${t.cashback || 0}% Keşbek</span>
                                        <span>•</span>
                                        <span>Dövriyyə həddi: <strong class="text-slate-800">${(parseFloat(t.minSpent) || 0) > 0 ? (parseFloat(t.minSpent) || 0) + ' ₼' : '0 ₼ (İlkin)'}</strong></span>
                                        ${t.discount ? `<span>•</span><span class="font-semibold text-slate-700">${t.discount}% Sabit endirim</span>` : ''}
                                    </div>
                                </div>
                                <button type="button" onclick="BusinessDashboardView.setClientLoyaltyTier('${client.id}', '${t.id}'); BusinessDashboardView.closeTierSelectModal();" class="px-4 py-2 rounded-xl ${isCurrent ? 'bg-slate-200 text-slate-600 cursor-default' : 'bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold shadow-2xs active:scale-95 cursor-pointer'} text-xs transition shrink-0">
                                    ${isCurrent ? 'Seçilib' : 'Təyin et'}
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    closeTierSelectModal: function() {
        const el = document.getElementById('bizTierSelectModal');
        if (el) el.remove();
    },

    copyClientCardNumber: function(cardNum) {
        if (!cardNum) return;
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(cardNum).then(() => {
                if (typeof App !== 'undefined') App.showToast('Kart nömrəsi kopyalandı');
            }).catch(() => {
                if (typeof App !== 'undefined') App.showToast(`Kart: ${cardNum}`);
            });
        } else {
            if (typeof App !== 'undefined') App.showToast(`Kart: ${cardNum}`);
        }
    },

    renderClientModalLoyaltyTab: function(client) {
        const loyaltyData = this.getLoyaltyData();
        const tiers = Array.isArray(loyaltyData.tiers) ? loyaltyData.tiers : [];
        const loyaltyRecord = this.getClientLoyaltyRecord(client);
        const currentTierId = client.loyaltyTier || (loyaltyRecord ? loyaltyRecord.tier : 'standard') || 'standard';
        const currentTier = tiers.find(t => t.id === currentTierId) || tiers[0] || { id: 'standard', name: 'Standart Kart', cashback: 3, minSpent: 0, color: 'slate', discount: 0 };
        const cashbackVal = parseFloat(client.cashbackBalance !== undefined ? client.cashbackBalance : (loyaltyRecord ? loyaltyRecord.bonusBalance : 0)) || 0;
        const discountVal = client.discountPercent || (currentTier.discount || 0);
        const spentVal = parseFloat(client.totalSpent) || 0;
        const visits = Array.isArray(client.history) ? client.history : [];
        const visitCount = client.totalVisits || visits.length || 0;
        const cardNumber = (loyaltyRecord && loyaltyRecord.cardNumber) || client.loyaltyCardNumber || `LC-${(client.id || '').replace(/\D/g, '').padEnd(6, '0').slice(0, 6)}`;

        // Calculate progress to next tier
        let nextTier = null;
        let progressPercent = 100;
        let amountNeeded = 0;
        const sortedTiers = [...tiers].sort((a, b) => (parseFloat(a.minSpent) || 0) - (parseFloat(b.minSpent) || 0));
        const currentTierIdx = sortedTiers.findIndex(t => t.id === currentTier.id);
        if (currentTierIdx >= 0 && currentTierIdx < sortedTiers.length - 1) {
            nextTier = sortedTiers[currentTierIdx + 1];
            const nextMin = parseFloat(nextTier.minSpent) || 0;
            const currentMin = parseFloat(currentTier.minSpent) || 0;
            amountNeeded = Math.max(0, nextMin - spentVal);
            const range = Math.max(1, nextMin - currentMin);
            progressPercent = Math.min(100, Math.max(0, Math.round(((spentVal - currentMin) / range) * 100)));
        }

        // Tier gradients for VIP Apple Wallet style card
        const tierGrads = {
            standard: 'from-[#1E232A] via-[#2B303A] to-[#121418]',
            silver: 'from-[#334155] via-[#475569] to-[#1E293B]',
            gold: 'from-[#78350F] via-[#92400E] to-[#451A03]',
            vip: 'from-[#3B0764] via-[#4C1D95] to-[#1E1B4B]'
        };
        const activeCardGrad = tierGrads[currentTier.color] || tierGrads[currentTier.id] || tierGrads.standard;

        // Transaction history
        const transList = Array.isArray(loyaltyRecord.history) ? loyaltyRecord.history : [];

        // Check active gift cards and subscriptions
        const giftCards = Array.isArray(loyaltyData.giftCards) ? loyaltyData.giftCards : [];
        const subscriptions = Array.isArray(loyaltyData.subscriptions) ? loyaltyData.subscriptions : [];
        const normPhone = (p) => (p || '').replace(/\D/g, '');
        const clientPhoneDigits = normPhone(client.phone);
        const clientGiftCards = giftCards.filter(gc => gc.clientId === client.id || (normPhone(gc.clientPhone) && normPhone(gc.clientPhone) === clientPhoneDigits));
        const clientSubs = subscriptions.filter(sb => sb.clientId === client.id || (normPhone(sb.clientPhone) && normPhone(sb.clientPhone) === clientPhoneDigits));

        // Stepper items HTML
        const tierStepsHtml = sortedTiers.map((t, idx) => {
            const minSpent = parseFloat(t.minSpent) || 0;
            const isReached = spentVal >= minSpent;
            const isCurrent = t.id === currentTier.id;

            let circleBg = 'bg-slate-100 text-slate-400 border-slate-300';
            let circleContent = `<span class="text-xs font-bold font-mono">${idx + 1}</span>`;
            if (isReached) {
                circleBg = 'bg-emerald-500 text-white border-emerald-600';
                circleContent = `<svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`;
            }
            if (isCurrent) {
                circleBg = 'bg-[#FFDD2D] text-[#101114] border-amber-400 ring-2 ring-amber-300';
                circleContent = `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
            }

            return `
                <div class="flex-1 flex flex-col items-center text-center relative z-10">
                    <div class="w-8 h-8 rounded-full border-2 ${circleBg} flex items-center justify-center transition shadow-2xs mb-2">
                        ${circleContent}
                    </div>
                    <div class="text-xs font-bold ${isCurrent ? 'text-amber-800' : 'text-slate-800'} truncate max-w-[90px] sm:max-w-none">${this.escapeHtml(t.name)}</div>
                    <div class="text-[11px] font-mono font-bold text-amber-700 mt-0.5">+${t.cashback || 0}%</div>
                    <div class="text-[10px] text-slate-400 mt-0.5">${minSpent > 0 ? minSpent + ' ₼' : '0 ₼'}</div>
                </div>
            `;
        }).join('');

        return `
            <div class="space-y-4">
                
                <!-- 1. VIP DIGITAL LOYALTY CARD (Apple Wallet Inspired Design) -->
                <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br ${activeCardGrad} text-white p-5 sm:p-6 shadow-md border border-white/10">
                    <!-- Subtle background ornaments -->
                    <div class="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
                    <div class="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-[#FFDD2D]/10 blur-xl pointer-events-none"></div>

                    <div class="relative z-10 flex flex-col justify-between min-h-[175px] sm:min-h-[185px]">
                        <!-- Card Top Bar: Brand, Card Number, Tier Badge -->
                        <div class="flex items-start justify-between gap-3">
                            <div class="flex items-center gap-2.5">
                                <div class="w-8 h-8 rounded-xl bg-[#FFDD2D] text-[#101114] font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                                    Z
                                </div>
                                <div>
                                    <div class="text-[11px] font-bold text-white/90 leading-none">ZEYVO LOYALTY</div>
                                    <div class="flex items-center gap-1.5 mt-1">
                                        <button type="button" onclick="BusinessDashboardView.copyClientCardNumber('${cardNumber}')" class="font-mono text-xs text-white/70 hover:text-white flex items-center gap-1 transition cursor-pointer" title="Kart nömrəsini kopyala">
                                            <span>${this.escapeHtml(cardNumber)}</span>
                                            <svg class="w-3 h-3 text-white/60" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                        </button>
                                        <button type="button" onclick="BusinessDashboardView.promptChangeClientCardNumber('${client.id}')" class="text-white/50 hover:text-white transition p-0.5" title="Kart nömrəsini dəyiş">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 flex-wrap justify-end">
                                <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md text-white border border-white/20">
                                    ${this.escapeHtml(currentTier.name || 'Standart Kart')}
                                </span>
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/25 text-emerald-300 border border-emerald-400/30">
                                    Aktiv
                                </span>
                                <button type="button" onclick="BusinessDashboardView.openTierSelectModal('${client.id}')" class="px-2.5 py-1 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold transition flex items-center gap-1 border border-white/20 cursor-pointer shadow-2xs">
                                    <svg class="w-3.5 h-3.5 text-[#FFDD2D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                    <span>Səviyyəni dəyiş</span>
                                </button>
                            </div>
                        </div>

                        <!-- Card Center: 3 Modern Metric Chips -->
                        <div class="my-3 grid grid-cols-3 gap-2 sm:gap-3">
                            <div class="px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                                <div class="text-[10px] text-white/70 font-medium">Keşbek dərəcəsi</div>
                                <div class="text-base sm:text-lg font-bold text-[#FFDD2D] font-mono mt-0.5">+${currentTier.cashback || 0}%</div>
                            </div>
                            <div class="px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                                <div class="text-[10px] text-white/70 font-medium">Fərdi endirim</div>
                                <div class="text-base sm:text-lg font-bold text-white font-mono mt-0.5">${discountVal || 0}%</div>
                            </div>
                            <div class="px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                                <div class="text-[10px] text-white/70 font-medium">Bonus balansı</div>
                                <div class="text-base sm:text-lg font-bold text-emerald-300 font-mono mt-0.5">${cashbackVal.toFixed(2)} ₼</div>
                            </div>
                        </div>

                        <!-- Card Bottom: Cardholder & Total Spent -->
                        <div class="flex items-end justify-between pt-2 border-t border-white/15 text-xs">
                            <div>
                                <div class="text-[10px] text-white/60 font-medium">Kart sahibi</div>
                                <div class="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">${this.escapeHtml(client.name)}</div>
                            </div>
                            <div class="text-right">
                                <div class="text-[10px] text-white/60 font-medium">Ümumi dövriyyə</div>
                                <div class="font-mono font-bold text-white">${spentVal.toLocaleString('az-AZ')} ₼ <span class="text-white/60 font-normal">(${visitCount} qəbul)</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. STATUS TƏRƏQQİ STEPPERİ (Milestone Progression Timeline) -->
                <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold text-slate-900">Loyallıq inkişafı və keçid şərtləri</span>
                            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">${this.escapeHtml(currentTier.name)}</span>
                        </div>
                        <div class="text-xs font-mono font-bold ${amountNeeded > 0 ? 'text-amber-800' : 'text-emerald-700'}">
                            ${amountNeeded > 0 ? `Növbəti səviyyəyə: +${amountNeeded.toFixed(2)} ₼` : 'Maksimum səviyyə əldə olunub'}
                        </div>
                    </div>

                    <!-- Visual Timeline Stepper -->
                    <div class="relative py-2">
                        <!-- Background progress rail -->
                        <div class="absolute left-6 right-6 top-6 -translate-y-1/2 h-1.5 rounded-full bg-slate-100 z-0 overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-[#FFDD2D] via-amber-400 to-emerald-500 rounded-full transition-all duration-500" style="width: ${progressPercent}%;"></div>
                        </div>
                        <div class="flex items-start justify-between relative z-10">
                            ${tierStepsHtml}
                        </div>
                    </div>

                    <!-- Summary Info Bar -->
                    <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span>Cari dövriyyə: <strong class="text-slate-800 font-mono">${spentVal.toFixed(2)} ₼</strong></span>
                        <span>${nextTier ? `Növbəti hədəf: <strong class="text-slate-800 font-mono">${(parseFloat(nextTier.minSpent) || 0).toFixed(2)} ₼</strong> (${this.escapeHtml(nextTier.name)})` : 'VIP imtiyazları aktivdir'}</span>
                    </div>
                </div>

                <!-- 3. KEŞBEK VƏ BONUS BALANSI İDARƏETMƏSİ (Clean Interactive Action Hub) -->
                <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-3">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="space-y-1">
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m16 10-4 4-2-2"/></svg>
                                <span class="text-xs font-bold text-slate-900">Keşbek və bonus balansı</span>
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-100 text-emerald-800">1 bonus = 1.00 ₼</span>
                            </div>
                            <div class="flex items-baseline gap-2">
                                <span class="text-2xl sm:text-3xl font-black font-mono text-emerald-700">${cashbackVal.toFixed(2)} ₼</span>
                                <span class="text-xs text-slate-400 font-normal">mövcud bonus</span>
                            </div>
                            <p class="text-[11px] text-slate-500 font-normal">Xidmət və məhsul qəbullarında ödəniş kimi tam və ya qismən istifadə edilə bilər.</p>
                        </div>

                        <!-- 2 Distinct Modern Action Buttons -->
                        <div class="flex items-center gap-2 shrink-0">
                            <button type="button" onclick="BusinessDashboardView.openBonusModal('${client.id}', 'add')" class="px-4 py-2.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer">
                                <svg class="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                <span>Bonus əlavə et</span>
                            </button>
                            <button type="button" onclick="BusinessDashboardView.openBonusModal('${client.id}', 'redeem')" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-200/90 shadow-2xs active:scale-95 cursor-pointer">
                                <svg class="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 12H4"/></svg>
                                <span>Bonus sil</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 4. AKTİV HƏDİYYƏ KARTLARI VƏ ABUNƏLİKLƏR (Vouchers & Active Passes) -->
                ${(clientGiftCards.length > 0 || clientSubs.length > 0) ? `
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                        <div class="flex items-center justify-between">
                            <h5 class="text-xs font-bold text-slate-900 flex items-center gap-2">
                                <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><circle cx="18" cy="12" r="1"/></svg>
                                <span>Müştərinin aktiv kart və abunəlikləri</span>
                            </h5>
                            <button type="button" onclick="BusinessDashboardView.closeClientModal(); BusinessDashboardView.switchTab('loyalty');" class="text-[11px] text-amber-800 hover:underline font-bold cursor-pointer">Loyallıq modulu</button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            ${clientGiftCards.map(gc => `
                                <div class="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-1.5">
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs font-bold text-amber-950">Hədiyyə Sertifikatı</span>
                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">Aktiv</span>
                                    </div>
                                    <div class="text-lg font-bold font-mono text-amber-900">${(parseFloat(gc.balance) || parseFloat(gc.nominal) || 0).toFixed(2)} ₼ <span class="text-xs text-amber-700 font-normal">qalıq</span></div>
                                    <div class="text-[11px] text-slate-500 font-mono flex items-center justify-between pt-1 border-t border-amber-200/60">
                                        <span>Kod: ${this.escapeHtml(gc.code || '—')}</span>
                                        <span>Bitir: ${gc.expiryDate ? this.formatDateDisplay(gc.expiryDate) : 'Müddətsiz'}</span>
                                    </div>
                                </div>
                            `).join('')}

                            ${clientSubs.map(sb => `
                                <div class="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-1.5">
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs font-bold text-indigo-950 truncate">${this.escapeHtml(sb.serviceName || 'Xidmət Paketi')}</span>
                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800">Abunəlik</span>
                                    </div>
                                    <div class="text-lg font-bold font-mono text-indigo-900">${sb.remainingVisits || 0} / ${sb.totalVisits || 0} <span class="text-xs text-indigo-700 font-normal">qəbul qalıb</span></div>
                                    <div class="text-[11px] text-slate-500 font-mono flex items-center justify-between pt-1 border-t border-indigo-200/60">
                                        <span>№ ${this.escapeHtml(sb.code || sb.id || '—')}</span>
                                        <span>Bitir: ${sb.expiryDate ? this.formatDateDisplay(sb.expiryDate) : 'Müddətsiz'}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : `
                    <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-600 flex items-center justify-center shrink-0">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
                            </div>
                            <div>
                                <div class="text-xs font-bold text-slate-900">Aktiv hədiyyə kartı və ya abunəlik yoxdur</div>
                                <div class="text-[11px] text-slate-400 font-normal mt-0.5">Müştəri üçün yeni sertifikat və ya xidmət paketi rəsmiləşdirə bilərsiniz.</div>
                            </div>
                        </div>
                        <button type="button" onclick="BusinessDashboardView.closeClientModal(); BusinessDashboardView.switchTab('loyalty');" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#FFDD2D] text-slate-800 hover:text-[#101114] text-xs font-bold transition border border-slate-200/80 shadow-2xs cursor-pointer shrink-0">
                            Loyallıq modulunu aç
                        </button>
                    </div>
                `}

                <!-- 5. BONUS ƏMƏLİYYATLARI TARİXÇƏSİ (Comprehensive Transaction Ledger) -->
                <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                    <div class="flex items-center justify-between">
                        <h5 class="text-xs font-bold text-slate-900 flex items-center gap-2">
                            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span>Bonus əməliyyatları tarixçəsi</span>
                            <span class="text-slate-400 font-normal">(${transList.length})</span>
                        </h5>
                        ${transList.length ? `<span class="text-[10px] text-slate-400">Son qeydlər</span>` : ''}
                    </div>

                    ${transList.length ? `
                        <div class="overflow-x-auto no-scrollbar -mx-4 sm:mx-0">
                            <table class="w-full text-left text-xs">
                                <thead>
                                    <tr class="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                                        <th class="pb-2.5 px-3">Tarix və vaxt</th>
                                        <th class="pb-2.5 px-3">Növ</th>
                                        <th class="pb-2.5 px-3">Təsvir və səbəb</th>
                                        <th class="pb-2.5 px-3 text-right">Məbləğ</th>
                                        <th class="pb-2.5 px-3 text-right">Qalıq</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    ${transList.slice(0, 15).map(tx => {
                                        const isEarn = tx.type === 'earn' || tx.type === 'topup' || tx.type === 'birthday' || tx.type === 'welcome';
                                        return `
                                            <tr class="hover:bg-slate-50/50 transition">
                                                <td class="py-2.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">${tx.date || '—'}</td>
                                                <td class="py-2.5 px-3 whitespace-nowrap">
                                                    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${isEarn ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'}">
                                                        ${isEarn ? 'Mədaxil' : 'Silinmə'}
                                                    </span>
                                                </td>
                                                <td class="py-2.5 px-3 text-slate-700 max-w-[240px] truncate" title="${this.escapeHtml(tx.note || '')}">${this.escapeHtml(tx.note || 'Bonus əməliyyatı')}</td>
                                                <td class="py-2.5 px-3 text-right font-mono font-bold whitespace-nowrap ${isEarn ? 'text-emerald-700' : 'text-rose-600'}">
                                                    ${isEarn ? '+' : '-'}${(parseFloat(tx.amount) || 0).toFixed(2)} ₼
                                                </td>
                                                <td class="py-2.5 px-3 text-right font-mono text-slate-600 whitespace-nowrap">
                                                    ${(parseFloat(tx.balanceAfter !== undefined ? tx.balanceAfter : cashbackVal) || 0).toFixed(2)} ₼
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : `
                        <div class="rounded-2xl border border-slate-200/70 bg-slate-50/50 py-8 text-center">
                            <div class="w-10 h-10 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-2 shadow-2xs">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                            <div class="text-xs font-bold text-slate-700">Hələ bonus əməliyyatı olmayıb</div>
                            <div class="text-[11px] text-slate-400 font-normal mt-0.5">Xidmət qəbullarında keşbek avtomatik toplanacaq və ya yuxarıdakı düymələrlə dərhal əlavə edə bilərsiniz.</div>
                        </div>
                    `}
                </div>

            </div>
        `;
    },

    setClientLoyaltyTier: function(clientId, tierId) {
        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client) return;

        const loyaltyData = this.getLoyaltyData();
        const tiers = Array.isArray(loyaltyData.tiers) ? loyaltyData.tiers : [];
        const targetTier = tiers.find(t => t.id === tierId);
        if (!targetTier) return;

        const prevTierId = client.loyaltyTier || 'standard';
        const prevTier = tiers.find(t => t.id === prevTierId);
        const prevName = prevTier ? prevTier.name : 'Standart';

        client.loyaltyTier = tierId;
        if (targetTier.discount && (!client.discountPercent || client.discountPercent < targetTier.discount)) {
            client.discountPercent = targetTier.discount;
        }

        // Update in loyalty data
        const loyaltyRecord = this.getClientLoyaltyRecord(client);
        if (loyaltyRecord) {
            loyaltyRecord.tier = tierId;
            this.saveLoyaltyData(loyaltyData);
        }

        this.addClientActivity(client, 'loyalty', `Loyallıq dərəcəsi dəyişdirildi: ${prevName} → ${targetTier.name}`);
        this.saveClientsData(allClients);
        this.refreshClientsCanvas();
        this.renderClientModalContent();
        if (typeof App !== 'undefined') App.showToast(`Müştərinin loyallıq səviyyəsi "${targetTier.name}" olaraq təyin edildi`);
    },

    promptChangeClientTier: function(clientId) {
        this.openTierSelectModal(clientId);
    },

    promptChangeClientCardNumber: function(clientId) {
        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client) return;
        const loyaltyRecord = this.getClientLoyaltyRecord(client);
        const currNum = (loyaltyRecord && loyaltyRecord.cardNumber) || client.loyaltyCardNumber || '';

        this.openTextInputModal({
            title: 'Loyallıq kartı nömrəsi',
            description: 'Fiziki və ya rəqəmsal kartın barkod / nömrəsini daxil edin',
            label: 'Kart nömrəsi',
            value: currNum,
            placeholder: 'Məsələn: LC-802194',
            confirmText: 'Yadda saxla',
            onConfirm: (val) => {
                const newNum = (val || '').trim().toUpperCase();
                client.loyaltyCardNumber = newNum;
                if (loyaltyRecord) {
                    loyaltyRecord.cardNumber = newNum;
                    const loyaltyData = this.getLoyaltyData();
                    this.saveLoyaltyData(loyaltyData);
                }
                this.addClientActivity(client, 'loyalty', `Kart nömrəsi yeniləndi: ${newNum}`);
                this.saveClientsData(allClients);
                this.refreshClientsCanvas();
                this.renderClientModalContent();
                if (typeof App !== 'undefined') App.showToast('Kart nömrəsi uğurla yeniləndi');
            }
        });
    },

    adjustClientLoyaltyBonus: function(clientId, type, amount, note = '') {
        const amt = parseFloat(amount);
        if (!amt || isNaN(amt) || amt <= 0) return;

        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client) return;

        const currentBal = parseFloat(client.cashbackBalance) || 0;
        let newBal = currentBal;
        if (type === 'add') {
            newBal = currentBal + amt;
        } else if (type === 'redeem') {
            if (amt > currentBal) {
                if (typeof App !== 'undefined') App.showToast('Silinən məbləğ mövcud bonus balansından çox ola bilməz');
                return;
            }
            newBal = Math.max(0, currentBal - amt);
        }

        client.cashbackBalance = newBal;

        // Sync with loyalty module data
        const loyaltyData = this.getLoyaltyData();
        const loyaltyRecord = this.getClientLoyaltyRecord(client);
        if (loyaltyRecord) {
            loyaltyRecord.bonusBalance = newBal;
            if (!Array.isArray(loyaltyRecord.history)) loyaltyRecord.history = [];
            const now = new Date();
            const dateStr = `${now.toISOString().slice(0, 10)} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            loyaltyRecord.history.unshift({
                id: 'BON-' + Date.now().toString(36),
                date: dateStr,
                type: type === 'add' ? 'earn' : 'redeem',
                amount: amt,
                note: note || (type === 'add' ? 'Əl ilə bonus əlavə edildi' : 'Bonus xidmətə silindi'),
                balanceAfter: newBal
            });
            this.saveLoyaltyData(loyaltyData);
        }

        const actText = type === 'add'
            ? `Bonus balansı +${amt.toFixed(2)} ₼ artırıldı (${note || 'Bonus əlavəsi'}, yeni balans: ${newBal.toFixed(2)} ₼)`
            : `Bonus balansından -${amt.toFixed(2)} ₼ silindi (${note || 'Ödəniş üçün'}, yeni balans: ${newBal.toFixed(2)} ₼)`;

        this.addClientActivity(client, 'cashback', actText);
        this.saveClientsData(allClients);
        this.refreshClientsCanvas();
        this.renderClientModalContent();
        if (typeof App !== 'undefined') {
            App.showToast(type === 'add' ? `+${amt.toFixed(2)} ₼ bonus uğurla əlavə edildi` : `-${amt.toFixed(2)} ₼ bonus silindi`);
        }
    },

    promptCustomLoyaltyBonus: function(clientId, type) {
        this.openBonusModal(clientId, type);
    },

    renderClientModalStatsTab: function(client) {
        const depositVal = parseFloat(client.depositBalance) || 0;
        const spentVal = parseFloat(client.totalSpent) || 0;
        const visits = Array.isArray(client.history) ? client.history : [];
        const visitCount = client.totalVisits || visits.length || 0;
        const avgCheck = visitCount > 0 ? (spentVal / visitCount) : 0;
        const depHistory = this.getClientDepositHistory(client);

        // Calculate visit frequency
        let avgDaysBetween = 0;
        if (visits.length >= 2) {
            const sortedDates = visits.map(v => new Date(v.date || 0)).filter(d => !isNaN(d.getTime())).sort((a, b) => a - b);
            if (sortedDates.length >= 2) {
                const diffMs = sortedDates[sortedDates.length - 1] - sortedDates[0];
                avgDaysBetween = Math.round((diffMs / (1000 * 60 * 60 * 24)) / (sortedDates.length - 1));
            }
        }
        const frequencyLabel = avgDaysBetween > 0 ? `Hər ${avgDaysBetween} gündən bir` : (visitCount > 0 ? 'Daimi aktiv qrafik' : 'İlk ziyarət gözlənilir');

        // Aggregate top services from client history
        const serviceMap = {};
        visits.forEach(v => {
            const sName = v.service || 'Standart xidmət';
            if (!serviceMap[sName]) serviceMap[sName] = { name: sName, count: 0, amount: 0 };
            serviceMap[sName].count += 1;
            serviceMap[sName].amount += (parseFloat(v.amount) || 0);
        });
        const topServices = Object.values(serviceMap).sort((a, b) => b.count - a.count).slice(0, 4);

        // Payment methods breakdown estimation
        const cardPct = spentVal > 0 ? 65 : 0;
        const cashPct = spentVal > 0 ? 25 : 0;
        const depositPct = spentVal > 0 ? 10 : 0;

        return `
            <div class="space-y-4">
                
                <!-- 1. TOP FINANCIAL KPIS (4 Clean Stat Cards) -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                        <span class="text-[11px] font-semibold text-slate-500">Cəmi dövriyyə (LTV)</span>
                        <div class="text-xl font-bold font-mono text-slate-900">${spentVal.toLocaleString('az-AZ')} ₼</div>
                        <div class="text-[10px] text-slate-400 font-normal">Bütün dövr üzrə xərclənən</div>
                    </div>

                    <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                        <span class="text-[11px] font-semibold text-slate-500">Ziyarət sayı</span>
                        <div class="text-xl font-bold font-mono text-slate-900">${visitCount} qəbul</div>
                        <div class="text-[10px] text-slate-400 font-normal">Tamamlanmış xidmət</div>
                    </div>

                    <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                        <span class="text-[11px] font-semibold text-slate-500">Orta çek (AOV)</span>
                        <div class="text-xl font-bold font-mono text-amber-800">${avgCheck.toFixed(2)} ₼</div>
                        <div class="text-[10px] text-slate-400 font-normal">Bir ziyarətə düşən məbləğ</div>
                    </div>

                    <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                        <span class="text-[11px] font-semibold text-slate-500">Sonuncu ziyarət</span>
                        <div class="text-sm font-bold font-mono text-slate-900 truncate">${this.formatDateDisplay(client.lastVisitDate) || '—'}</div>
                        <div class="text-[10px] text-slate-400 font-normal">${this.formatClientRelativeDate(client.lastVisitDate)}</div>
                    </div>
                </div>

                <!-- 2. DEPOZİT HESABI VƏ AVANS İDARƏETMƏSİ (Dedicated Prepaid Ledger) -->
                <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h5 class="text-xs font-bold text-slate-900 flex items-center gap-2">
                                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                                <span>Depozit hesabı və avans idarəetməsi</span>
                            </h5>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Müştərinin öncədən ödədiyi vəsaitlər və xidmət avansları</p>
                        </div>
                        <span class="px-2.5 py-1 rounded-md text-[11px] font-bold ${depositVal > 0 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/70' : 'bg-slate-100 text-slate-700 border border-slate-200'}">
                            ${depositVal > 0 ? 'Müsbət qalıq' : (depositVal === 0 ? 'Sıfır balans' : 'Borc mövcuddur')}
                        </span>
                    </div>

                    <!-- Deposit Balance and Direct Action Buttons -->
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div class="text-[11px] font-medium text-slate-500">Cari depozit qalığı</div>
                            <div class="text-2xl sm:text-3xl font-black font-mono text-emerald-700 mt-0.5">${depositVal.toFixed(2)} ₼</div>
                            <div class="text-[10px] text-slate-400 mt-0.5">Xidmət və məhsul qəbullarında avtomatik çıxıla bilər</div>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <button type="button" onclick="BusinessDashboardView.openDepositModal('${client.id}', 'topup')" class="px-4 py-2.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer">
                                <svg class="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                <span>Depoziti artır</span>
                            </button>
                            <button type="button" onclick="BusinessDashboardView.openDepositModal('${client.id}', 'spend')" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-200/90 shadow-2xs active:scale-95 cursor-pointer">
                                <svg class="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 12H4"/></svg>
                                <span>Depozitdən ödə</span>
                            </button>
                        </div>
                    </div>

                    <!-- Deposit Transactions Table -->
                    <div class="space-y-2">
                        <div class="text-xs font-bold text-slate-800 flex items-center justify-between">
                            <span>Son depozit hərəkətləri</span>
                            <span class="text-[10px] text-slate-400 font-normal">Cəmi: ${depHistory.length} əməliyyat</span>
                        </div>

                        ${depHistory.length ? `
                            <div class="overflow-x-auto no-scrollbar -mx-4 sm:mx-0">
                                <table class="w-full text-left text-xs">
                                    <thead>
                                        <tr class="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                                            <th class="pb-2 px-3">Tarix</th>
                                            <th class="pb-2 px-3">Növ</th>
                                            <th class="pb-2 px-3">Ödəniş üsulu</th>
                                            <th class="pb-2 px-3">Təsvir / Qeyd</th>
                                            <th class="pb-2 px-3 text-right">Məbləğ</th>
                                            <th class="pb-2 px-3 text-right">Qalıq</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100">
                                        ${depHistory.slice(0, 10).map(tx => {
                                            const isTopup = tx.type === 'topup' || tx.type === 'add';
                                            return `
                                                <tr class="hover:bg-slate-50/50 transition">
                                                    <td class="py-2.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">${tx.date || '—'}</td>
                                                    <td class="py-2.5 px-3 whitespace-nowrap">
                                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${isTopup ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60' : 'bg-rose-50 text-rose-800 border border-rose-200/60'}">
                                                            ${isTopup ? 'Mədaxil' : 'Məxaric'}
                                                        </span>
                                                    </td>
                                                    <td class="py-2.5 px-3 text-slate-600 whitespace-nowrap">${this.escapeHtml(tx.method || 'Nağd')}</td>
                                                    <td class="py-2.5 px-3 text-slate-700 max-w-[200px] truncate" title="${this.escapeHtml(tx.note || '')}">${this.escapeHtml(tx.note || 'Depozit əməliyyatı')}</td>
                                                    <td class="py-2.5 px-3 text-right font-mono font-bold whitespace-nowrap ${isTopup ? 'text-emerald-700' : 'text-rose-600'}">
                                                        ${isTopup ? '+' : '-'}${(parseFloat(tx.amount) || 0).toFixed(2)} ₼
                                                    </td>
                                                    <td class="py-2.5 px-3 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        ${(parseFloat(tx.balanceAfter !== undefined ? tx.balanceAfter : depositVal) || 0).toFixed(2)} ₼
                                                    </td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : `
                            <div class="py-5 text-center bg-slate-50/50 rounded-xl border border-slate-100 text-xs text-slate-400">
                                Depozit hesabı üzrə hərəkət qeydə alınmayıb.
                            </div>
                        `}
                    </div>
                </div>

                <!-- 3. FINANCIAL & SERVICE ANALYTICS (2-Column Grid) -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    
                    <!-- Left: Payment Methods Distribution -->
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                        <div class="flex items-center justify-between">
                            <h5 class="text-xs font-bold text-slate-900 flex items-center gap-2">
                                <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                <span>Ödəniş metodlarının payı</span>
                            </h5>
                            <span class="text-[10px] text-slate-400">Dövriyyə bölgüsü</span>
                        </div>

                        <div class="space-y-2.5 pt-1">
                            <div>
                                <div class="flex items-center justify-between text-xs mb-1">
                                    <span class="font-medium text-slate-700">Bank kartı (POS Terminal)</span>
                                    <span class="font-bold font-mono text-slate-900">${cardPct}%</span>
                                </div>
                                <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div class="h-full bg-blue-500 rounded-full" style="width: ${cardPct}%;"></div>
                                </div>
                            </div>

                            <div>
                                <div class="flex items-center justify-between text-xs mb-1">
                                    <span class="font-medium text-slate-700">Nağd ödəniş</span>
                                    <span class="font-bold font-mono text-slate-900">${cashPct}%</span>
                                </div>
                                <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div class="h-full bg-emerald-500 rounded-full" style="width: ${cashPct}%;"></div>
                                </div>
                            </div>

                            <div>
                                <div class="flex items-center justify-between text-xs mb-1">
                                    <span class="font-medium text-slate-700">Depozit və avans hesabı</span>
                                    <span class="font-bold font-mono text-slate-900">${depositPct}%</span>
                                </div>
                                <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div class="h-full bg-[#FFDD2D] rounded-full" style="width: ${depositPct}%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Top Preferred Services -->
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                        <div class="flex items-center justify-between">
                            <h5 class="text-xs font-bold text-slate-900 flex items-center gap-2">
                                <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>Ən çox seçilən xidmətlər</span>
                            </h5>
                            <span class="text-[10px] text-slate-400">Üstünlüklər</span>
                        </div>

                        ${topServices.length ? `
                            <div class="space-y-2 pt-1">
                                ${topServices.map(srv => {
                                    const sharePct = spentVal > 0 ? Math.round((srv.amount / spentVal) * 100) : 0;
                                    return `
                                        <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                                            <div class="min-w-0">
                                                <div class="text-xs font-bold text-slate-900 truncate">${this.escapeHtml(srv.name)}</div>
                                                <div class="text-[10px] text-slate-400">${srv.count} dəfə qəbul • ${sharePct}% dövriyyə</div>
                                            </div>
                                            <div class="font-mono font-bold text-xs text-slate-900 shrink-0">${srv.amount.toFixed(2)} ₼</div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        ` : `
                            <div class="py-6 text-center text-xs text-slate-400">
                                Ziyarətlər qeydə alındıqca xidmət statistikası burada əks olunacaq.
                            </div>
                        `}
                    </div>
                </div>

                <!-- 4. CLIENT FREQUENCY & RELIABILITY INSIGHTS -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                        <h5 class="text-xs font-bold text-slate-900">Müştəri fəallığı və intizam göstəricisi</h5>
                        <div class="space-y-2 text-xs">
                            <div class="flex items-center justify-between py-1 border-b border-slate-100">
                                <span class="text-slate-500">Ziyarət tezliyi:</span>
                                <span class="font-semibold text-slate-900">${frequencyLabel}</span>
                            </div>
                            <div class="flex items-center justify-between py-1 border-b border-slate-100">
                                <span class="text-slate-500">Qəbullara davamiyyət:</span>
                                <span class="font-semibold text-emerald-700">100% gəliş (0 ləğv)</span>
                            </div>
                            <div class="flex items-center justify-between py-1 border-b border-slate-100">
                                <span class="text-slate-500">Sevimli mütəxəssis (usta):</span>
                                <span class="font-bold text-slate-900">${this.escapeHtml(client.preferredStaff || 'Təyin edilməyib')}</span>
                            </div>
                            <div class="flex items-center justify-between py-1">
                                <span class="text-slate-500">İlk qeydiyyat tarixi:</span>
                                <span class="font-mono text-slate-800">${client.firstVisitDate ? this.formatDateDisplay(client.firstVisitDate) : '—'}</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 flex flex-col justify-between">
                        <div>
                            <h5 class="text-xs font-bold text-slate-900">Qeydlər və fərdi tələblər</h5>
                            <p class="text-xs text-slate-600 font-normal leading-relaxed mt-2 ${client.note ? '' : 'italic text-slate-400'}">
                                ${this.escapeHtml(client.note || 'Xüsusi qeyd əlavə edilməyib.')}
                            </p>
                        </div>
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                            <span>Daimi müştəri kartı</span>
                            <span class="text-emerald-600 font-semibold">Zeyvo Online CRM</span>
                        </div>
                    </div>
                </div>

            </div>
        `;
    },

    toggleClientQuickVisitForm: function() {
        this.clientsQuickVisitOpen = !this.clientsQuickVisitOpen;
        this.renderClientModalContent();
    },

    saveClientQuickVisit: function(clientId) {
        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client) return;

        const dateInp = document.getElementById('bizClientQuickVisitDate');
        const serviceInp = document.getElementById('bizClientQuickVisitService');
        const staffInp = document.getElementById('bizClientQuickVisitStaff');
        const amountInp = document.getElementById('bizClientQuickVisitAmount');

        const service = serviceInp ? serviceInp.value.trim() : '';
        if (!service) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa xidmətin adını qeyd edin');
            if (serviceInp) serviceInp.focus();
            return;
        }

        const date = dateInp && dateInp.value ? dateInp.value : new Date().toISOString().slice(0, 10);
        const staff = staffInp ? staffInp.value.trim() : (client.preferredStaff || 'Mütəxəssis');
        const amount = amountInp ? (parseFloat(amountInp.value) || 0) : 0;

        if (!Array.isArray(client.history)) client.history = [];
        const newVisit = {
            id: 'VIS-' + Date.now().toString().slice(-4),
            date: date,
            service: service,
            staff: staff,
            amount: amount,
            status: 'Tamamlandı'
        };
        client.history.unshift(newVisit);
        client.totalVisits = (client.totalVisits || 0) + 1;
        client.totalSpent = (parseFloat(client.totalSpent) || 0) + amount;
        client.lastVisitDate = date;

        this.saveClientsData(allClients);
        this.clientsQuickVisitOpen = false;
        this.refreshClientsCanvas();
        this.renderClientModalContent();
        if (typeof App !== 'undefined') App.showToast('Yeni ziyarət uğurla tarixçəyə əlavə edildi');
    },

    deleteClientVisit: function(clientId, index) {
        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client || !client.history || !client.history[index]) return;

        const removed = client.history[index];
        client.history.splice(index, 1);
        client.totalVisits = Math.max(0, (client.totalVisits || 1) - 1);
        client.totalSpent = Math.max(0, (parseFloat(client.totalSpent) || 0) - (parseFloat(removed.amount) || 0));

        this.saveClientsData(allClients);
        this.refreshClientsCanvas();
        this.renderClientModalContent();
        if (typeof App !== 'undefined') App.showToast('Ziyarət qeydi silindi');
    },

    topUpClientDeposit: function(clientId, amount, method = 'Nağd') {
        this.adjustClientDeposit(clientId, 'topup', amount, method, 'Depozit artırılması');
    },

    promptTopUpClientDeposit: function(clientId) {
        this.openDepositModal(clientId, 'topup');
    },

    scheduleClientVisit: function(clientId) {
        const client = this.getClientsData().find(c => c.id === clientId);
        this.closeClientModal();
        this.switchTab('calendar');
        setTimeout(() => {
            this.openNewBookingModal(null, null, client || null);
        }, 250);
        if (typeof App !== 'undefined') {
            App.showToast(client ? `${client.name} üçün qəbul forması açıldı` : 'Təqvim açıldı');
        }
    },

    handleSaveClient: function() {
        const nameInp = document.getElementById('bizClientName');
        const phoneInp = document.getElementById('bizClientPhone');
        const emailInp = document.getElementById('bizClientEmail');
        const genderInp = document.getElementById('bizClientGender');
        const catInp = document.getElementById('bizClientCategory');
        const birthInp = document.getElementById('bizClientBirthDate');
        const staffInp = document.getElementById('bizClientStaff');
        const discountInp = document.getElementById('bizClientDiscount');
        const depositInp = document.getElementById('bizClientDeposit');
        const loyaltyTierInp = document.getElementById('bizClientLoyaltyTier');
        const cashbackInp = document.getElementById('bizClientCashback');
        const noteInp = document.getElementById('bizClientNote');

        const name = nameInp ? nameInp.value.trim() : '';
        const phoneInputVal = phoneInp ? phoneInp.value.trim() : '';
        const cleanDigits = this.getCleanPhoneDigits(phoneInputVal);

        if (!name) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa müştərinin ad və soyadını daxil edin');
            if (nameInp) nameInp.focus();
            return;
        }
        if (!cleanDigits || cleanDigits.length < 7) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün mobil nömrə daxil edin');
            if (phoneInp) phoneInp.focus();
            return;
        }

        const phone = this.normalizeAzPhone(cleanDigits);

        const email = emailInp ? emailInp.value.trim() : '';
        const gender = genderInp ? genderInp.value : 'female';
        const category = catInp ? catInp.value : 'regular';
        const birthDate = birthInp ? birthInp.value : '';
        const preferredStaff = staffInp ? staffInp.value.trim() : '';
        const discountPercent = discountInp ? (parseFloat(discountInp.value) || 0) : 0;
        const depositBalance = depositInp ? (parseFloat(depositInp.value) || 0) : 0;
        const loyaltyTier = loyaltyTierInp ? loyaltyTierInp.value : 'standard';
        const cashbackBalance = cashbackInp ? (parseFloat(cashbackInp.value) || 0) : 0;
        const note = noteInp ? noteInp.value.trim() : '';

        const allClients = this.getClientsData();
        const id = this.clientsEditingId;

        if (id) {
            // Edit existing
            const client = allClients.find(c => c.id === id);
            if (client) {
                if ((client.category || 'regular') !== category) {
                    this.addClientActivity(client, 'category', `Kateqoriya dəyişdirildi: ${this.getClientCategoryLabel(client.category)} → ${this.getClientCategoryLabel(category)}`);
                }
                if ((client.loyaltyTier || 'standard') !== loyaltyTier) {
                    this.addClientActivity(client, 'loyalty', `Loyallıq səviyyəsi dəyişdirildi: ${client.loyaltyTier || 'standard'} → ${loyaltyTier}`);
                    // Keep loyalty record in sync
                    const loyaltyRecord = this.getClientLoyaltyRecord(client);
                    if (loyaltyRecord) {
                        loyaltyRecord.tier = loyaltyTier;
                        const lData = this.getLoyaltyData();
                        this.saveLoyaltyData(lData);
                    }
                }
                if ((parseFloat(client.cashbackBalance) || 0) !== cashbackBalance) {
                    this.addClientActivity(client, 'cashback', `Bonus balansı dəyişdirildi: ${(parseFloat(client.cashbackBalance) || 0).toFixed(2)} ₼ → ${cashbackBalance.toFixed(2)} ₼`);
                    const loyaltyRecord = this.getClientLoyaltyRecord(client);
                    if (loyaltyRecord) {
                        loyaltyRecord.bonusBalance = cashbackBalance;
                        const lData = this.getLoyaltyData();
                        this.saveLoyaltyData(lData);
                    }
                }
                if ((parseFloat(client.discountPercent) || 0) !== discountPercent) {
                    this.addClientActivity(client, 'edit', `Fərdi endirim dəyişdirildi: ${parseFloat(client.discountPercent) || 0}% → ${discountPercent}%`);
                }
                if ((parseFloat(client.depositBalance) || 0) !== depositBalance) {
                    this.addClientActivity(client, 'deposit', `Depozit balansı dəyişdirildi: ${(parseFloat(client.depositBalance) || 0).toFixed(2)} ₼ → ${depositBalance.toFixed(2)} ₼`);
                }
                if ((client.preferredStaff || '') !== preferredStaff) {
                    this.addClientActivity(client, 'edit', preferredStaff ? `Sevimli mütəxəssis: ${preferredStaff}` : 'Sevimli mütəxəssis silindi');
                }
                const otherChanged = client.name !== name || (client.phone || '') !== phone || (client.email || '') !== email
                    || (client.gender || 'female') !== gender || (client.birthDate || '') !== birthDate || (client.note || '') !== note;
                if (otherChanged) {
                    this.addClientActivity(client, 'edit', 'Şəxsi məlumatlar yeniləndi');
                }

                client.name = name;
                client.phone = phone;
                client.email = email;
                client.gender = gender;
                client.category = category;
                client.birthDate = birthDate;
                client.preferredStaff = preferredStaff;
                client.discountPercent = discountPercent;
                client.depositBalance = depositBalance;
                client.loyaltyTier = loyaltyTier;
                client.cashbackBalance = cashbackBalance;
                client.note = note;
            }
        } else {
            // Create new with collision-safe incremental ID
            const maxIdNum = allClients.reduce((max, c) => {
                const n = parseInt((c.id || '').replace(/\D/g, ''), 10);
                return !isNaN(n) && n > max ? n : max;
            }, 1000);
            const nextNum = maxIdNum + 1;
            const newId = 'CLI-' + nextNum;
            const todayStr = new Date().toISOString().slice(0, 10);
            const numPart = String(nextNum);
            const newClient = {
                id: newId,
                name: name,
                phone: phone,
                email: email,
                gender: gender,
                category: category,
                birthDate: birthDate,
                totalVisits: 0,
                totalSpent: 0,
                depositBalance: depositBalance,
                cashbackBalance: cashbackBalance,
                discountPercent: discountPercent,
                loyaltyTier: loyaltyTier,
                loyaltyCardNumber: `LC-${numPart.padEnd(6, '0').slice(0, 6)}`,
                lastVisitDate: todayStr,
                firstVisitDate: todayStr,
                preferredStaff: preferredStaff,
                note: note,
                history: []
            };
            allClients.unshift(newClient);
            this.getClientLoyaltyRecord(newClient);
        }

        this.saveClientsData(allClients);
        this.closeClientModal();
        this.refreshClientsCanvas();
        if (typeof App !== 'undefined') {
            App.showToast(id ? 'Müştəri məlumatları yeniləndi' : 'Yeni müştəri bazaya əlavə edildi');
        }
    },

    // Delete client handler
    deleteClient: function(clientId) {
        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        if (!client) return;

        this.openDeleteConfirmModal({
            title: 'Müştərini sil',
            message: `<strong>"${client.name}"</strong> adlı müştərini bazadan silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Müştərinin bütün qəbul və maliyyə tarixçəsi silinəcəkdir.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const updated = allClients.filter(c => c.id !== clientId);
                this.saveClientsData(updated);
                this.refreshClientsCanvas();
                if (typeof App !== 'undefined') App.showToast('Müştəri bazadan silindi');
            }
        });
    },

    // Export Clients Handlers
    openExportClientsModal: function() {
        const modal = document.getElementById('bizClientExportModal');
        if (modal) modal.classList.remove('hidden');
    },

    closeExportClientsModal: function() {
        const modal = document.getElementById('bizClientExportModal');
        if (modal) modal.classList.add('hidden');
    },

    exportClientsCsv: function() {
        const clients = this.getClientsData();
        if (!clients || clients.length === 0) {
            if (typeof App !== 'undefined') App.showToast('İxrac ediləcək müştəri tapılmadı');
            return;
        }

        // CSV with UTF-8 BOM so Excel opens Azerbaijani letters properly
        let csv = '\uFEFFID,Ad Soyad,Telefon,Email,Cins,Kateqoriya,Qebullar Sayi,Toplam Xerc (AZN),Depozit (AZN),Kesbek (AZN),Endirim Faizi,Sonuncu Ziyaret,Qeyd\n';
        clients.forEach(c => {
            const genderStr = c.gender === 'male' ? 'Kişi' : 'Qadın';
            const catStr = c.category === 'vip' ? 'VIP' : (c.category === 'regular' ? 'Daimi' : (c.category === 'new' ? 'Yeni' : 'Risk qrupu'));
            const clean = str => (str || '').replace(/"/g, '""');
            csv += `"${c.id}","${clean(c.name)}","${clean(c.phone)}","${clean(c.email)}","${genderStr}","${catStr}","${c.totalVisits || 0}","${c.totalSpent || 0}","${c.depositBalance || 0}","${c.cashbackBalance || 0}","${c.discountPercent || 0}","${c.lastVisitDate || ''}","${clean(c.note)}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `zeyvo_musteriler_bazasi_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.closeExportClientsModal();
        if (typeof App !== 'undefined') App.showToast('Müştəri bazası CSV kimi endirildi');
    },

    handleSendClientsExportEmail: function() {
        const emailInp = document.getElementById('bizClientExportEmail');
        const email = emailInp ? emailInp.value.trim() : '';
        if (!email || !email.includes('@')) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün e-poçt ünvanı daxil edin');
            if (emailInp) emailInp.focus();
            return;
        }

        this.closeExportClientsModal();
        if (typeof App !== 'undefined') {
            App.showToast(`Müştəri bazasının hesabatı "${email}" ünvanına göndərildi`);
        }
    },

    // Import Clients Handlers
    openImportClientsModal: function() {
        const modal = document.getElementById('bizClientImportModal');
        const textInp = document.getElementById('bizClientImportText');
        const fileInp = document.getElementById('bizClientImportFileInput');
        const fileNameEl = document.getElementById('bizClientImportFileName');
        if (textInp) textInp.value = '';
        if (fileInp) fileInp.value = '';
        if (fileNameEl) fileNameEl.textContent = '';
        if (modal) modal.classList.remove('hidden');
    },

    closeImportClientsModal: function() {
        const modal = document.getElementById('bizClientImportModal');
        if (modal) modal.classList.add('hidden');
    },

    handleImportClientsFile: function(e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const fileNameEl = document.getElementById('bizClientImportFileName');
        if (fileNameEl) fileNameEl.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            const textInp = document.getElementById('bizClientImportText');
            if (textInp) textInp.value = content;
        };
        reader.readAsText(file);
    },

    executeImportClients: function() {
        const textInp = document.getElementById('bizClientImportText');
        const raw = textInp ? textInp.value.trim() : '';
        if (!raw) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa CSV mətni daxil edin və ya fayl seçin');
            return;
        }

        const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        if (lines.length === 0) {
            if (typeof App !== 'undefined') App.showToast('İdxal üçün məlumat tapılmadı');
            return;
        }

        const allClients = this.getClientsData();
        let maxIdNum = allClients.reduce((max, c) => {
            const n = parseInt((c.id || '').replace(/\D/g, ''), 10);
            return !isNaN(n) && n > max ? n : max;
        }, 1000);

        let importedCount = 0;
        let skippedCount = 0;
        const todayStr = new Date().toISOString().slice(0, 10);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (i === 0 && (line.toLowerCase().includes('ad') || line.toLowerCase().includes('name') || line.toLowerCase().includes('telefon') || line.toLowerCase().includes('id'))) {
                continue;
            }

            let parts = [];
            if (line.includes('\t')) {
                parts = line.split('\t');
            } else if (line.includes(';')) {
                parts = line.split(';');
            } else {
                parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            }

            parts = parts.map(p => p.replace(/^["']|["']$/g, '').trim());
            if (parts.length === 0) continue;

            const name = parts[0] || '';
            const phoneRaw = parts[1] || '';
            const catRaw = (parts[2] || '').toLowerCase();
            const email = parts[3] || '';
            const note = parts[4] || '';

            if (!name || name.length < 2) continue;

            const cleanDigits = this.getCleanPhoneDigits(phoneRaw);
            if (!cleanDigits || cleanDigits.length < 6) {
                skippedCount++;
                continue;
            }

            const formattedPhone = this.normalizeAzPhone(cleanDigits);

            const existing = allClients.find(c => this.getCleanPhoneDigits(c.phone) === cleanDigits);
            if (existing) {
                skippedCount++;
                continue;
            }

            let category = 'regular';
            if (catRaw.includes('vip')) category = 'vip';
            else if (catRaw.includes('yen') || catRaw.includes('new')) category = 'new';
            else if (catRaw.includes('risk') || catRaw.includes('itir')) category = 'risk';

            maxIdNum++;
            const newClient = {
                id: 'CLI-' + maxIdNum,
                name: name,
                phone: formattedPhone,
                email: email,
                gender: 'female',
                category: category,
                birthDate: '',
                totalVisits: 0,
                totalSpent: 0,
                depositBalance: 0,
                cashbackBalance: 0,
                discountPercent: category === 'vip' ? 10 : 0,
                loyaltyTier: category === 'vip' ? 'vip' : 'standard',
                loyaltyCardNumber: `LC-${String(maxIdNum).padEnd(6, '0').slice(0, 6)}`,
                lastVisitDate: todayStr,
                firstVisitDate: todayStr,
                preferredStaff: '',
                note: note,
                history: []
            };

            allClients.unshift(newClient);
            this.getClientLoyaltyRecord(newClient);
            importedCount++;
        }

        if (importedCount > 0) {
            this.saveClientsData(allClients);
            this.refreshClientsCanvas();
            this.closeImportClientsModal();
            if (typeof App !== 'undefined') {
                App.showToast(`${importedCount} müştəri uğurla bazaya əlavə edildi!${skippedCount > 0 ? ` (${skippedCount} təkrar/keçərsiz ötürüldü)` : ''}`);
            }
        } else {
            if (typeof App !== 'undefined') {
                App.showToast('Yeni müştəri tapılmadı (bütün nömrələr artıq bazada mövcuddur və ya format düzgün deyil)');
            }
        }
    },

    // Render Clients Modals (Strictly compliant with GEMINI.md Rule 5: NO icons in modal headers!)
    renderClientsModals: function() {
        return `
            <!-- ==========================================
                 MODAL 1: TABBED CLIENT CARD & CRM MODAL
            =========================================== -->
            <div id="bizClientModal" onclick="if(event.target === this) BusinessDashboardView.closeClientModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div id="bizClientModalDialog" class="bg-white border border-slate-200 rounded-[28px] max-w-3xl w-full p-5 sm:p-7 shadow-2xl space-y-4 text-slate-800 max-h-[92vh] flex flex-col overflow-hidden">
                    
                    <!-- Clean Modal Header (GEMINI.md Rule 5: NO ICONS in modal headers) -->
                    ${ZeyvoUI.modalHeader({ title: "Müştəri kartı", titleId: "bizClientModalTitle", description: "Şəxsi məlumatlar, ziyarət tarixçəsi və statistika", descriptionId: "bizClientModalDesc", onClose: "BusinessDashboardView.closeClientModal()" })}

                    <!-- Two-column body: left = tabs, right = notes & activity feed -->
                    <div class="flex-1 min-h-0 flex flex-col lg:flex-row gap-5 overflow-y-auto lg:overflow-hidden">
                        <div class="flex-1 min-w-0 min-h-0 flex flex-col gap-4">
                            <!-- Segmented Tabs Navigation -->
                            <div id="bizClientModalTabsContainer" class="shrink-0"></div>

                            <!-- Dynamic Tab Body (Scrollable) -->
                            <div id="bizClientModalBody" class="flex-1 lg:overflow-y-auto pr-1 text-xs"></div>
                        </div>

                        <!-- Right Side Panel: Notes & Activity (comments style) -->
                        <aside id="bizClientModalSidePanel" class="hidden w-full lg:w-[360px] shrink-0 min-h-0 flex-col rounded-2xl bg-slate-50 border border-slate-200/90 overflow-hidden"></aside>
                    </div>

                </div>
            </div>

            <!-- Legacy Profile Modal Container (Preserved hidden for backward compatibility) -->
            <div id="bizClientProfileModal" class="hidden"></div>

            <!-- ==========================================
                 MODAL 3: EXPORT CLIENTS MODAL
            =========================================== -->
            <div id="bizClientExportModal" onclick="if(event.target === this) BusinessDashboardView.closeExportClientsModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    
                    <!-- Clean Modal Header (GEMINI.md Rule 5: NO ICONS in modal headers) -->
                    ${ZeyvoUI.modalHeader({ title: "Müştəri bazasını ixrac et", description: "Müştərilərin siyahısını Excel və ya CSV formatında əldə edin", onClose: "BusinessDashboardView.closeExportClientsModal()" })}

                    <div class="space-y-4 text-xs">
                        
                        <!-- Direct Download Card -->
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-slate-900">Birbaşa CSV / Excel faylı kimi endir</span>
                                <span class="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">Hazırdır</span>
                            </div>
                            <p class="text-slate-500 font-normal leading-relaxed">
                                Bütün müştəri profilləri, balanslar və əlaqə vasitələri UTF-8 kodlaşdırması ilə fayla yazılır.
                            </p>
                            <button
                                type="button"
                                onclick="BusinessDashboardView.exportClientsCsv()"
                                class="w-full py-2.5 rounded-xl bg-[#101114] hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                <span>CSV faylını endir</span>
                            </button>
                        </div>

                        <!-- Email Export Card -->
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                            <span class="font-bold text-slate-900 block">E-poçt ünvanına göndər</span>
                            <div class="space-y-1.5">
                                <label class="block text-slate-500 font-medium">E-poçt ünvanı</label>
                                <input
                                    type="email"
                                    id="bizClientExportEmail"
                                    placeholder="hesabat@zeyvo.az"
                                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FFDD2D] transition"
                                />
                            </div>
                            <button
                                type="button"
                                onclick="BusinessDashboardView.handleSendClientsExportEmail()"
                                class="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                                <span>E-poçta göndər</span>
                            </button>
                        </div>

                    </div>

                    <!-- Modal Footer Actions -->
                    <div class="flex items-center justify-end pt-3 border-t border-slate-100">
                        ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeExportClientsModal()", size: "md", type: "button" })}
                    </div>

                </div>
            </div>

            <!-- ==========================================
                 MODAL 3.5: IMPORT CLIENTS MODAL
            =========================================== -->
            <div id="bizClientImportModal" onclick="if(event.target === this) BusinessDashboardView.closeImportClientsModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 text-slate-800 max-h-[92vh] overflow-y-auto">
                    
                    <!-- Clean Modal Header (GEMINI.md Rule 5: NO ICONS in modal headers) -->
                    ${ZeyvoUI.modalHeader({ title: "Müştəri bazasını idxal et", description: "Excel və ya CSV faylından müştəri siyahısını bazaya yükləyin", onClose: "BusinessDashboardView.closeImportClientsModal()" })}

                    <div class="space-y-3.5 text-xs">
                        <!-- Direct File Upload -->
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-slate-900">1. CSV və ya Excel faylı seçin</span>
                                <span id="bizClientImportFileName" class="text-[11px] font-mono text-emerald-700 font-semibold truncate max-w-[180px]"></span>
                            </div>
                            <p class="text-slate-500 font-normal leading-relaxed text-[11px]">
                                Kompüterinizdən müştərilərin siyahısı olan .csv və ya .txt faylını seçin.
                            </p>
                            <input type="file" id="bizClientImportFileInput" accept=".csv,.txt" onchange="BusinessDashboardView.handleImportClientsFile(event)" class="hidden">
                            <button type="button" onclick="document.getElementById('bizClientImportFileInput').click()" class="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95">
                                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                <span>Fayl seçin (.csv, .txt)</span>
                            </button>
                        </div>

                        <!-- Paste Text directly -->
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                            <span class="font-bold text-slate-900 block">2. Və ya məlumatı birbaşa yapışdırın</span>
                            <p class="text-slate-400 font-normal text-[11px]">Format: Ad Soyad, Mobil nömrə, Kateqoriya (VIP/Daimi/Yeni/Risk), Email, Qeyd</p>
                            <textarea id="bizClientImportText" rows="4" placeholder="Nərgiz Məmmədova, 050 234-56-78, VIP, nargiz@mail.az, Daimi qonaq&#10;Kamran Rzayev, 055 345-67-89, Daimi" class="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FFDD2D] transition resize-none"></textarea>
                        </div>
                    </div>

                    <!-- Modal Footer Actions -->
                    <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                        ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeImportClientsModal()", size: "md", type: "button" })}
                        <button type="button" onclick="BusinessDashboardView.executeImportClients()" class="px-5 py-2.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4-4m0 0l4 4m-4-4v12"/></svg>
                            <span>Bazaya əlavə et</span>
                        </button>
                    </div>

                </div>
            </div>

            <!-- ==========================================
                 MODAL 4: CLIENT FILTERS MODAL
            =========================================== -->
            <div id="bizClientsFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeClientsFilterModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-md w-full p-5 sm:p-7 shadow-2xl space-y-4 text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    <!-- Clean Modal Header (GEMINI.md Rule 5: NO ICONS in modal headers) -->
                    ${ZeyvoUI.modalHeader({ title: "Müştəri filtrləri", description: "Kateqoriya, cinsiyyət və sıralama meyarları", onClose: "BusinessDashboardView.closeClientsFilterModal()" })}

                    <!-- Filter Controls -->
                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Category Segmented Buttons -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Müştəri kateqoriyası</label>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                <button type="button" id="clientsFilterCatBtn_all" onclick="BusinessDashboardView.selectClientsFilterCategory('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="clientsFilterCatBtn_vip" onclick="BusinessDashboardView.selectClientsFilterCategory('vip')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                    <span class="text-[11px] font-semibold text-amber-700">VIP</span>
                                </button>
                                <button type="button" id="clientsFilterCatBtn_regular" onclick="BusinessDashboardView.selectClientsFilterCategory('regular')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                    <span class="text-[11px] font-semibold text-emerald-700">Daimi</span>
                                </button>
                                <button type="button" id="clientsFilterCatBtn_new" onclick="BusinessDashboardView.selectClientsFilterCategory('new')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                    <span class="text-[11px] font-semibold text-blue-700">Yeni</span>
                                </button>
                                <button type="button" id="clientsFilterCatBtn_risk" onclick="BusinessDashboardView.selectClientsFilterCategory('risk')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                    <span class="text-[11px] font-semibold text-rose-700">Risk qrupu</span>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Gender Segmented Buttons -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Cinsiyyət</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="clientsFilterGenderBtn_all" onclick="BusinessDashboardView.selectClientsFilterGender('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="clientsFilterGenderBtn_female" onclick="BusinessDashboardView.selectClientsFilterGender('female')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                    <span class="text-[11px] font-semibold text-purple-700">Xanımlar</span>
                                </button>
                                <button type="button" id="clientsFilterGenderBtn_male" onclick="BusinessDashboardView.selectClientsFilterGender('male')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                    <span class="text-[11px] font-semibold text-blue-700">Bəylər</span>
                                </button>
                            </div>
                        </div>

                        <!-- 3. Sort Order Segmented Buttons -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Sıralama meyarı</label>
                            <div class="space-y-1.5">
                                <button type="button" id="clientsFilterSortBtn_recent" onclick="BusinessDashboardView.selectClientsFilterSort('recent')" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium">
                                    <span class="text-[11px]">Ən son ziyarətə görə</span>
                                    <span class="text-[10px] text-slate-400">tövsiyə olunur</span>
                                </button>
                                <button type="button" id="clientsFilterSortBtn_visits_desc" onclick="BusinessDashboardView.selectClientsFilterSort('visits_desc')" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium">
                                    <span class="text-[11px]">Ziyarət sayı (çoxdan aza)</span>
                                </button>
                                <button type="button" id="clientsFilterSortBtn_spent_desc" onclick="BusinessDashboardView.selectClientsFilterSort('spent_desc')" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium">
                                    <span class="text-[11px]">Cəmi məbləğ (çoxdan aza)</span>
                                </button>
                                <button type="button" id="clientsFilterSortBtn_name_asc" onclick="BusinessDashboardView.selectClientsFilterSort('name_asc')" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium">
                                    <span class="text-[11px]">Müştəri adı (A - Z)</span>
                                </button>
                                <button type="button" id="clientsFilterSortBtn_name_desc" onclick="BusinessDashboardView.selectClientsFilterSort('name_desc')" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium">
                                    <span class="text-[11px]">Müştəri adı (Z - A)</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer Actions -->
                    <div class="pt-3 flex items-center justify-between border-t border-slate-100">
                        <button type="button" onclick="BusinessDashboardView.resetClientsModalFilters()" class="text-xs font-medium text-slate-500 hover:text-rose-600 transition flex items-center gap-1.5 cursor-pointer">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                            <span>Filtrləri sıfırla</span>
                        </button>
                        <div class="flex items-center gap-2">
                            ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeClientsFilterModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Tətbiq et", onClick: "BusinessDashboardView.applyClientsModalFilters()", size: "md", type: "button" })}
                        </div>
                    </div>

                </div>
            </div>
        `;
    },
});
