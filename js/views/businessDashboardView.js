// ========================================================
// BUSINESS DASHBOARD VIEW: ZEYVO BUSINESS ADMIN CALENDAR & CRM
// Designed in Zeyvo Brand Style:
// - Left Sidebar & Outer Frame in Signature Zeyvo Yellow #FFDD2D
// - Dark Graphite #1F2024 for Active Tabs & Brand Contrast
// - Floating White Canvas with Large Curved Corners (rounded-[28px] sm:rounded-[32px])
// - Hourly Weekly Schedule Grid with Pastel Cards & Live Red Indicator
// ========================================================
const BusinessDashboardView = {
    activeTab: 'calendar',
    profileActiveTab: 'personal', // 'personal' | 'startpage' | 'messengers' | 'social' | 'apps' | 'security' // 'calendar' | 'dashboard' | 'clients' | 'services' | 'staff' | 'finance' | 'settings'
    activeDay: 24,
    currentMonthName: 'Mart 2025',
    currentWeekLabel: 'Mart 2025 / Həftə 4',
    sidebarOpen: false,
    selectedEvent: null,
    resourceTypeFilter: 'all',
    resourceBranchFilter: 'all',
    resourceCategoryFilter: 'all',
    resourceSearchQuery: '',
    collapsedResourceCategories: {},

    localDateString: function(date = new Date()) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    },

    storageKey: function(key) {
        // Keep the original demo branch data intact; new branches get independent data.
        if (key === 'zeyvo_partner_user' || key === 'zeyvo_active_context_v1' || key === 'zeyvo_user_businesses_v3' || key === 'zeyvo_user_bookings') return key;
        try {
            const context = JSON.parse(localStorage.getItem('zeyvo_active_context_v1') || 'null');
            return context && context.branchId && context.branchId !== 'br_bbs_1'
                ? `${key}__${context.branchId}` : key;
        } catch (e) { return key; }
    },

    getPartnerUser: function() {
        const stored = localStorage.getItem('zeyvo_partner_user');
        if (stored) {
            try { 
                const u = JSON.parse(stored);
                if (u && typeof u === 'object') {
                    if (u.avatar === undefined) {
                        u.avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
                    }
                    if (!u.email) {
                        u.email = "demo@zeyvobusiness.az";
                    }
                    if (!u.gender) {
                        u.gender = "female";
                    }
                    if (!u.country) {
                        u.country = "Azərbaycan";
                    }
                    if (!u.city) {
                        u.city = "Bakı";
                    }
                    if (!u.language) {
                        u.language = "az";
                    }
                    if (u.bio === undefined) {
                        u.bio = "Zeyvo Business partnyoru. Baku Beauty Studio baş admini.";
                    }
                    if (!u.startBusiness) {
                        u.startBusiness = "baku_beauty";
                    }
                    if (!u.startBranch) {
                        u.startBranch = "center";
                    }
                    if (!u.startView || u.startView === 'calendar' || !['biznes', 'profile'].includes(u.startView)) {
                        u.startView = "biznes";
                    }
                    if (!u.whatsapp) {
                        u.whatsapp = "+994 (50) 234-56-78";
                    }
                    if (!u.telegram) {
                        u.telegram = "bakubeautystudio";
                    }
                    if (!u.instagram) {
                        u.instagram = "bakubeautystudio";
                    }
                    if (!u.facebook) {
                        u.facebook = "bakubeautystudio";
                    }
                    if (!u.tiktok) {
                        u.tiktok = "bakubeautystudio";
                    }
                    if (!u.linkedin) {
                        u.linkedin = "bakubeautystudio";
                    }
                    return u;
                }
            } catch (e) {}
        }
        return {
            id: 'biz_demo_1',
            businessName: "Baku Beauty Studio",
            ownerName: "Leyla Məmmədova",
            role: "Mülkiyyətçi / Salon Admini",
            email: "demo@zeyvobusiness.az",
            phone: "+994 (50) 234-56-78",
            country: "Azərbaycan",
            city: "Bakı",
            language: "az",
            bio: "Zeyvo Business partnyoru. Baku Beauty Studio baş admini.",
            startBusiness: "baku_beauty",
            startBranch: "center",
            startView: "biznes",
            whatsapp: "+994 (50) 234-56-78",
            telegram: "bakubeautystudio",
            instagram: "bakubeautystudio",
            facebook: "bakubeautystudio",
            tiktok: "bakubeautystudio",
            linkedin: "bakubeautystudio",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        };
    },

    getBookings: function() {
        const todayStr = this.localDateString();
        let bookings = localStorage.getItem(this.storageKey('zeyvo_business_bookings_v3'));
        if (!bookings) {
            if (this.storageKey('zeyvo_business_bookings_v3') !== 'zeyvo_business_bookings_v3') return [];
            const defaultBookings = [
                {
                    id: 'b_on_1',
                    clientName: 'Nigar Rəhimova',
                    phone: '+994 50 444-88-99',
                    service: 'Samir Ə. — Kişi Saç Kəsimi & Stil',
                    serviceId: 's1',
                    masterName: 'Samir Əliyev',
                    masterKey: 'samir',
                    masterId: 'st1',
                    date: todayStr,
                    time: '14:30',
                    startHour: 14.5,
                    durationMinutes: 45,
                    durationHours: 0.75,
                    price: 35,
                    status: 'Gözlənilir',
                    source: 'online',
                    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
                    note: 'Müştəri veb saytdan onlayn qeydiyyatdan keçib. Təsdiq gözləyir.'
                },
                {
                    id: 'b_on_2',
                    clientName: 'Aytən Kərimli',
                    phone: '+994 55 777-33-22',
                    service: 'Aygün M. — Nail Art & Shellac Gel',
                    serviceId: 's2',
                    masterName: 'Aygün Məmmədova',
                    masterKey: 'aygun',
                    masterId: 'st2',
                    date: todayStr,
                    time: '16:00',
                    startHour: 16,
                    durationMinutes: 60,
                    durationHours: 1,
                    price: 45,
                    status: 'Gözlənilir',
                    source: 'online',
                    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
                    note: 'Onlayn müraciət. Zənglə dəqiqləşdirmək istəyir.'
                },
                { id: 'b101', clientName: 'Fidan Qasımova', phone: '+994 50 234-56-78', service: 'Samir Ə. — Kişi Saç Kəsimi & Stil', masterKey: 'samir', day: 'MON 24', time: '07:00 – 08:00', startHour: 7, durationHours: 1, price: 35, status: 'Təsdiqləndi', color: 'yellow', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
                { id: 'b102', clientName: 'Kamran Bağırov & Qrup', phone: '+994 55 888-12-34', service: 'Kamran B. — Saqqal Korreksiyası', masterKey: 'kamran', day: 'MON 24', time: '07:00 – 09:00', startHour: 7, durationHours: 2, price: 20, status: 'Təsdiqləndi', color: 'blue', avatars: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'] },
                { id: 'b103', clientName: 'Nərgiz Məmmədova', phone: '+994 70 555-90-12', service: 'Samir Ə. — Saç Boyama & Stil', masterKey: 'samir', day: 'MON 24', time: '10:00 – 11:00', startHour: 10, durationHours: 1, price: 65, status: 'Təsdiqləndi', color: 'blue', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
                { id: 'b104', clientName: 'Bütün Usta Heyəti', phone: '+994 51 444-22-11', service: 'Bütün Heyət — Qrup Təlimi & İclas', masterKey: 'all', day: 'TUE 25', time: '06:00 – 06:45', startHour: 6, durationHours: 0.75, spanDays: 2, price: 0, status: 'Planlaşdırılıb', color: 'green' },
                { id: 'b105', clientName: 'Yeni Kolorist Namizədi', phone: '+994 50 711-33-88', service: 'Müsahibə — Yeni Kolorist Seçimi', masterKey: 'nigar', day: 'TUE 25', time: '06:30 – 07:15', startHour: 6.5, durationHours: 0.75, price: 0, status: 'Gözlənilir', color: 'purple' },
                { id: 'b106', clientName: 'Aysel Quliyeva', phone: '+994 55 999-44-55', service: 'Aygün M. — Nail Art & Shellac Gel', masterKey: 'aygun', day: 'TUE 25', time: '07:00 – 08:00', startHour: 7, durationHours: 1, price: 45, status: 'Təsdiqləndi', color: 'green', icon: '' },
                { id: 'b107', clientName: 'Leyla Əhmədova', phone: '+994 77 333-66-99', service: 'Aygün M. — Aparat Manikür & SPA', masterKey: 'aygun', day: 'TUE 25', time: '08:30 – 11:00', startHour: 8.5, durationHours: 2.5, price: 55, status: 'Təsdiqləndi', color: 'green', avatars: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'], extraCount: '+2' },
                { id: 'b108', clientName: 'Günay İsmayılova', phone: '+994 50 120-40-60', service: 'Nigar Q. — Ombre & Balayage Boyama', masterKey: 'nigar', day: 'WED 26', time: '07:30 – 09:30', startHour: 7.5, durationHours: 2, price: 130, status: 'Təsdiqləndi', color: 'peach', avatars: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80'] },
                { id: 'b109', clientName: 'Admin Heyəti', phone: '+994 50 120-40-61', service: 'Salon İclası — Həftəlik Planlama', masterKey: 'all', day: 'WED 26', time: '11:30 – 12:15', startHour: 11.5, durationHours: 0.75, price: 0, status: 'Təsdiqləndi', color: 'purple' },
                { id: 'b110', clientName: 'Rauf Əliyev', phone: '+994 50 999-11-22', service: 'Kamran B. — Saqqal & Qaynar Dəsmal', masterKey: 'kamran', day: 'THU 27', time: '08:00 – 09:00', startHour: 8, durationHours: 1, price: 25, status: 'Təsdiqləndi', color: 'purple', icon: '' },
                { id: 'b111', clientName: 'Brend Tərəfdaşlığı', phone: '+994 50 999-11-23', service: 'Təlim — Yeni Kosmetika Təqdimatı', masterKey: 'all', day: 'THU 27', time: '09:00 – 09:45', startHour: 9, durationHours: 0.75, price: 0, status: 'Təsdiqləndi', color: 'purple' },
                { id: 'b112', clientName: 'Tural Həsənov', phone: '+994 55 444-12-12', service: 'Samir Ə. — VIP Saç Kəsimi & Baş Masajı', masterKey: 'samir', day: 'FRI 28', time: '07:00 – 08:00', startHour: 7, durationHours: 1, price: 40, status: 'Təsdiqləndi', color: 'blue', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
                { id: 'b113', clientName: 'Səbinə Əliyeva', phone: '+994 55 444-12-13', service: 'Aygün M. — Pedikür & Daban Qulluğu', masterKey: 'aygun', day: 'FRI 28', time: '09:30 – 10:30', startHour: 9.5, durationHours: 1, price: 50, status: 'Təsdiqləndi', color: 'yellow', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
                { id: 'b114', clientName: 'Salon sanitariya', phone: '+994 50 000-00-01', service: 'İstirahət / Təmizlik fasiləsi', masterKey: 'breaks', day: 'SAT 29', time: '06:30 – 07:30', startHour: 6.5, durationHours: 1, price: 0, status: 'Tamamlandı', color: 'rose' },
                { id: 'b115', clientName: 'Salon İstirahət', phone: '+994 50 000-00-02', service: 'İstirahət / Qeyri-iş vaxtı', masterKey: 'breaks', day: 'SAT 29', time: '08:00 – 09:00', startHour: 8, durationHours: 1, price: 0, status: 'Tamamlandı', color: 'rose' }
            ];
            localStorage.setItem(this.storageKey('zeyvo_business_bookings_v3'), JSON.stringify(defaultBookings));
            return defaultBookings;
        }
        try {
            let list = JSON.parse(bookings);
            if (!Array.isArray(list)) list = [];
            let migratedDates = false;
            list.forEach((b, idx) => {
                if (!b.date) {
                    const offset = (idx % 7) - 1; // today and next/prev days
                    const d = new Date();
                    d.setDate(d.getDate() + offset);
                    b.date = this.localDateString(d);
                    migratedDates = true;
                }
            });
            if (migratedDates) {
                localStorage.setItem(this.storageKey('zeyvo_business_bookings_v3'), JSON.stringify(list));
            }

            // Synchronize with client-side user bookings if any exist
            try {
                const userBookings = JSON.parse(localStorage.getItem('zeyvo_user_bookings') || '[]');
                if (Array.isArray(userBookings) && userBookings.length > 0) {
                    let synced = false;
                    userBookings.forEach(ub => {
                        if ((ub.branchId || 'br_bbs_1') !== this.getActiveContext().branchId) return;
                        const ubId = 'b_online_' + ub.id;
                        if (!list.some(b => b.id === ubId || (b.clientName === ub.clientName && b.time === ub.time && b.service === ub.serviceName))) {
                            list.unshift({
                                id: ubId,
                                clientName: ub.clientName || 'Onlayn Müştəri',
                                phone: ub.clientPhone || '+994 50 000-00-00',
                                service: ub.serviceName || 'Xidmət',
                                masterName: ub.masterName || 'Usta',
                                salonId: ub.salonId,
                                branchId: ub.branchId || 'br_bbs_1',
                                price: parseFloat(ub.price) || 30,
                                date: ub.date === 'Bugün' ? todayStr : ub.date,
                                time: ub.time || '12:00',
                                startHour: parseInt((ub.time || '12:00').split(':')[0]) || 12,
                                durationMinutes: 45,
                                durationHours: 0.75,
                                status: ub.status || 'Gözlənilir',
                                source: 'online',
                                createdAt: new Date(ub.id || Date.now()).toISOString(),
                                note: 'Müştəri tərəfindən veb/mobil platformadan onlayn yazılıb.'
                            });
                            synced = true;
                        }
                    });
                    if (synced) {
                        localStorage.setItem(this.storageKey('zeyvo_business_bookings_v3'), JSON.stringify(list));
                    }
                }
            } catch(e) {}

            return list;
        } catch (e) { return []; }
    },

    saveBookings: function(bookings) {
        localStorage.setItem(this.storageKey('zeyvo_business_bookings_v3'), JSON.stringify(bookings));
    },

    render: function(params) {
        const partner = this.getPartnerUser();
        const bookings = this.getBookings();
        const activeContext = this.getActiveContext();

        // Detect route and subtab from router parameters and window.location.hash
        let hash = (window.location.hash.slice(1).split('?')[0] || '').replace(/\/+$/, '');
        if (hash && !hash.startsWith('/')) hash = '/' + hash;
        if (params && params.tab && ['personal', 'startpage', 'messengers', 'social', 'apps', 'security'].includes(params.tab)) {
            this.activeTab = 'profile';
            this.profileActiveTab = params.tab;
        } else if (hash.startsWith('/business/profile')) {
            this.activeTab = 'profile';
            const parts = hash.split('/');
            if (parts[3] && ['personal', 'startpage', 'messengers', 'social', 'apps', 'security'].includes(parts[3])) {
                this.profileActiveTab = parts[3];
            } else if (!this.profileActiveTab) {
                this.profileActiveTab = 'personal';
            }
        } else if (hash.startsWith('/business/settings')) {
            this.activeTab = 'profile';
            const parts = hash.split('/');
            if (parts[3] && ['personal', 'startpage', 'messengers', 'social', 'apps', 'security'].includes(parts[3])) {
                this.profileActiveTab = parts[3];
            } else if (!this.profileActiveTab) {
                this.profileActiveTab = 'personal';
            }
        } else if (hash.startsWith('/business/calendar') || hash.startsWith('/business/teqvim') || hash.startsWith('/business/qebullar')) {
            this.activeTab = 'calendar';
        } else if (hash.startsWith('/business/hesabatlar') || hash.startsWith('/business/reports') || hash.startsWith('/business/dashboard') || hash.startsWith('/business/analitika')) {
            window.location.hash = '#/business/biznes';
            this.activeTab = 'biznes';
        } else if (hash === '/business/resources' || hash === '/business/resurslar') {
            this.activeTab = 'resources';
        } else if (hash.startsWith('/business/products') || hash.startsWith('/business/mehsullar')) {
            this.activeTab = 'products';
            const parts = hash.split('/');
            if (parts[3]) {
                this.productsActiveTab = parts[3];
            } else if (!this.productsActiveTab) {
                this.productsActiveTab = 'balances';
            }
        } else if (hash === '/business/services' || hash === '/business/xidmetler') {
            this.activeTab = 'services';
        } else if (hash.startsWith('/business/clients') || hash.startsWith('/business/musteriler')) {
            this.activeTab = 'clients';
            const parts = hash.split('/');
            let sub = parts[3] || this.clientsActiveTab || 'all';
            this.clientsActiveTab = sub;
        } else if (hash.startsWith('/business/staff') || hash.startsWith('/business/ustalar')) {
            this.activeTab = 'staff';
            const parts = hash.split('/');
            if (parts[3] && parts[3] !== 'schedule') {
                this.staffActiveTab = parts[3];
            } else {
                this.staffActiveTab = (this.staffActiveTab === 'schedule' || !this.staffActiveTab) ? 'team' : this.staffActiveTab;
            }
        } else if (hash.startsWith('/business/integrations') || hash.startsWith('/business/inteqrasiyalar')) {
            this.activeTab = 'integrations';
            const parts = hash.split('/');
            this.integrationsSelectedId = parts[3] || null;
        } else if (hash.startsWith('/business/loyalty') || hash.startsWith('/business/loyalliq')) {
            this.activeTab = 'loyalty';
            const parts = hash.split('/');
            let sub = parts[3] || this.loyaltyActiveTab || 'cards_cashback';
            if (sub === 'cashback') sub = 'cards_cashback';
            if (sub === 'certificates') sub = 'gift_cards';
            if (sub === 'deposits') sub = 'cards_cashback';
            this.loyaltyActiveTab = sub;
        } else if (hash.startsWith('/business/marketing') || hash.startsWith('/business/marketinq')) {
            this.activeTab = 'marketing';
            const parts = hash.split('/');
            let sub = parts[3] || this.marketingActiveTab || 'campaigns';
            this.marketingActiveTab = sub;
        } else if (hash.startsWith('/business/finance') || hash.startsWith('/business/maliyye')) {
            this.activeTab = 'finance';
            const parts = hash.split('/');
            let sub = parts[3] || this.financeActiveTab || 'accounts';
            this.financeActiveTab = sub;
        } else {
            this.activeTab = 'biznes';
        }

        return `
            <!-- BLACK OUTER FRAME (#101114) WITH FLOATING ROUNDED CANVAS -->
            <div class="h-screen w-screen bg-[#101114] text-white p-2 sm:p-3 lg:p-3.5 flex font-sans antialiased overflow-hidden select-none selection:bg-[#FFDD2D] selection:text-[#101114]">
                
                <!-- MOBILE SIDEBAR BACKDROP -->
                <div id="bizSidebarBackdrop" onclick="BusinessDashboardView.toggleSidebar(false)" class="hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"></div>

                <!-- ==========================================
                     LEFT SIDEBAR (ZEYVO YELLOW WITH MENU)
                =========================================== -->
                <aside id="bizSidebar" class="fixed inset-y-2 left-2 z-50 w-64 lg:w-72 bg-[#101114] border-r border-white/10 lg:border-none flex flex-col justify-between p-4 transition-transform duration-300 -translate-x-full lg:translate-x-0 lg:static lg:z-auto shrink-0 overflow-y-auto">
                    
                    <div class="space-y-6">
                        
                        <!-- 1. Top Brand Header: Zeyvo Business (matches Login branding) -->
                        <div class="flex items-center justify-between pb-3 border-b border-white/10">
                            <a href="#/business/biznes" class="flex items-center gap-2 group">
                                <span class="text-2xl font-black tracking-[-0.055em] text-white flex items-center gap-0.5">
                                    <span>zeyvo</span>
                                    <span class="w-2 h-2 rounded-full bg-[#FFDD2D] inline-block mb-1"></span>
                                </span>
                                <span class="px-2 py-0.5 rounded-lg bg-[#FFDD2D] text-[#101114] text-[10px] font-bold shadow-xs">
                                    Business
                                </span>
                            </a>

                            <!-- Mobile Close -->
                            <button onclick="BusinessDashboardView.toggleSidebar(false)" class="lg:hidden text-zinc-400 hover:text-white p-1" title="Bağla"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                        </div>

                        <!-- Quick POS Cashier Action Button -->
                        <button type="button" onclick="BusinessDashboardView.openPosModal()" class="w-full h-10 px-3.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95 group" title="Sürətli pərakəndə satış">
                            <svg class="w-4 h-4 text-[#101114]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                            <span>Kassa satışı (POS)</span>
                        </button>

                        <!-- 2. Primary Navigation Menu in Zeyvo Yellow Theme -->
                        <div>
                            <div class="text-[10px] font-bold text-zinc-500 px-2 mb-2">
                                Əsas menyu
                            </div>

                            <nav class="space-y-1.5 text-xs">
                                <!-- Tab: Qəbullar & Təqvim (Jurnal və Təqvim) -->
                                <a href="#/business/calendar" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'calendar' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'calendar' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                                        </svg>
                                        <span>Qəbullar & Təqvim</span>
                                    </div>
                                    <span class="px-1.5 py-0.5 rounded-md text-[10px] ${this.activeTab === 'calendar' ? 'bg-black/10 text-[#101114] font-black' : 'bg-white/10 text-zinc-400 font-medium'}">${this.getBookings ? this.getBookings().length : 0}</span>
                                </a>


                                <!-- Tab: Biznes -->
                                <a href="#/business/biznes" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'biznes' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'biznes' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span>Biznes</span>
                                    </div>
                                </a>

                                <!-- Tab: Resurslar (Kreslolar, Kabinetlər, Aparatlar) -->
                                <a href="#/business/resources" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'resources' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'resources' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                                        </svg>
                                        <span>Resurslar</span>
                                    </div>
                                    <span class="px-1.5 py-0.5 rounded-md text-[10px] ${this.activeTab === 'resources' ? 'bg-black/10 text-[#101114] font-black' : 'bg-white/10 text-zinc-400 font-medium'}">${this.getResources ? this.getResources().length : 0}</span>
                                </a>

                                <!-- Tab: Məhsullar (İnventar & Satış) -->
                                <a href="#/business/products" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'products' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'products' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                                        </svg>
                                        <span>Məhsullar</span>
                                    </div>
                                    <span class="px-1.5 py-0.5 rounded-md text-[10px] ${this.activeTab === 'products' ? 'bg-black/10 text-[#101114] font-black' : 'bg-white/10 text-zinc-400 font-medium'}">${this.getProducts ? this.getProducts().length : 0}</span>
                                </a>

                                <!-- Tab: Ustalar (Mütəxəssislər & Qrafik) -->
                                <a href="#/business/staff" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'staff' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'staff' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                        </svg>
                                        <span>Ustalar</span>
                                    </div>
                                    <span class="px-1.5 py-0.5 rounded-md text-[10px] ${this.activeTab === 'staff' ? 'bg-black/10 text-[#101114] font-black' : 'bg-white/10 text-zinc-400 font-medium'}">${this.getStaffList ? this.getStaffList().length : 0}</span>
                                </a>

                                <!-- Tab: Xidmətlər (Qiymət kataloqu və müddət) -->
                                <a href="#/business/services" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'services' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'services' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>
                                        </svg>
                                        <span>Xidmətlər</span>
                                    </div>
                                    <span class="px-1.5 py-0.5 rounded-md text-[10px] ${this.activeTab === 'services' ? 'bg-black/10 text-[#101114] font-black' : 'bg-white/10 text-zinc-400 font-medium'}">${this.getServices ? this.getServices().length : 0}</span>
                                </a>

                                <!-- Tab: Müştərilər (CRM & Ziyarət tarixçəsi) -->
                                <a href="#/business/clients" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'clients' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'clients' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                        </svg>
                                        <span>Müştərilər</span>
                                    </div>
                                    <span class="px-1.5 py-0.5 rounded-md text-[10px] ${this.activeTab === 'clients' ? 'bg-black/10 text-[#101114] font-black' : 'bg-white/10 text-zinc-400 font-medium'}">${this.getClientsBadgeCount ? this.getClientsBadgeCount() : 0}</span>
                                </a>

                                <!-- Tab: Loyallıq (Keşbek & Hədiyyə sertifikatları) -->
                                <a href="#/business/loyalty" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'loyalty' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'loyalty' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
                                        </svg>
                                        <span>Loyallıq</span>
                                    </div>
                                    <span class="px-1.5 py-0.5 rounded-md text-[10px] ${this.activeTab === 'loyalty' ? 'bg-black/10 text-[#101114] font-black' : 'bg-white/10 text-zinc-400 font-medium'}">${this.getLoyaltyBadgeCount ? this.getLoyaltyBadgeCount() : 0}</span>
                                </a>

                                <!-- Tab: Marketinq (Kampaniyalar, Promokodlar, Seqmentlər, Referal, Rəylər) -->
                                <a href="#/business/marketing" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'marketing' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'marketing' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                                        </svg>
                                        <span>Marketinq</span>
                                    </div>
                                    <span class="px-1.5 py-0.5 rounded-md text-[10px] ${this.activeTab === 'marketing' ? 'bg-black/10 text-[#101114] font-black' : 'bg-white/10 text-zinc-400 font-medium'}">${this.getMarketingBadgeCount ? this.getMarketingBadgeCount() : 0}</span>
                                </a>

                                <!-- Tab: İnteqrasiyalar (WhatsApp & Marketplace) -->
                                <a href="#/business/integrations" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'integrations' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'integrations' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                        </svg>
                                        <span>İnteqrasiyalar</span>
                                    </div>
                                    <span class="px-1.5 py-0.5 rounded-md text-[10px] ${this.activeTab === 'integrations' ? 'bg-black/10 text-[#101114] font-black' : 'bg-emerald-500/20 text-emerald-400 font-bold'}">${this.getInstalledIntegrationsCount ? this.getInstalledIntegrationsCount() : 1}</span>
                                </a>

                                <!-- Tab: Maliyyə & Kassa -->
                                <a href="#/business/finance" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${this.activeTab === 'finance' ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-sm' : 'text-zinc-400 font-medium hover:text-white hover:bg-white/[0.06]'}">
                                    <div class="flex items-center gap-2.5">
                                        <svg class="w-4 h-4 ${this.activeTab === 'finance' ? 'text-[#101114]' : 'text-zinc-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
                                        </svg>
                                        <span>Maliyyə & Kassa</span>
                                    </div>
                                    <span class="px-1.5 py-0.5 rounded-md text-[10px] ${this.activeTab === 'finance' ? 'bg-black/10 text-[#101114] font-black' : 'bg-white/10 text-zinc-400 font-medium'}">${this.getFinanceBadgeCount ? this.getFinanceBadgeCount() : '₼'}</span>
                                </a>
                            </nav>
                        </div>

                    </div>

                    <!-- 3. Bottom Context Switcher & User Profile -->
                    <div class="pt-3 border-t border-white/10 mt-auto space-y-2 shrink-0">
                        <!-- Active Business & Branch Switcher Widget -->
                        <div onclick="BusinessDashboardView.openSwitchContextModal()" class="flex items-center justify-between p-2 sm:p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-[#FFDD2D]/40 transition-all cursor-pointer group active:scale-[0.98]" title="Aktiv biznes və ya filialı dəyişmək üçün klikləyin">
                            <div class="flex items-center gap-2.5 min-w-0 flex-1 mr-1.5">
                                <div class="w-8 h-8 rounded-xl bg-[#FFDD2D]/15 text-[#FFDD2D] flex items-center justify-center shrink-0 border border-[#FFDD2D]/30 text-sm font-bold shadow-xs">
                                    ${activeContext.type === 'individual' ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>' : '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>'}
                                </div>
                                <div class="min-w-0 flex-1">
                                    <div class="text-[11px] font-bold text-white truncate group-hover:text-[#FFDD2D] transition leading-tight">
                                        ${activeContext.businessName}
                                    </div>
                                    <div class="text-[10px] text-zinc-400 font-medium truncate flex items-center gap-1.5 mt-0.5">
                                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                                        <span class="truncate">${activeContext.branchName}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Switch Icon -->
                            <div class="w-6 h-6 rounded-lg bg-white/5 group-hover:bg-[#FFDD2D] group-hover:text-[#101114] text-zinc-400 flex items-center justify-center transition shrink-0">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                                </svg>
                            </div>
                        </div>

                        <!-- User Profile Card -->
                        <div class="flex items-center justify-between p-2 px-2.5 rounded-2xl bg-transparent hover:bg-[#27282D] transition-colors duration-150 group">
                            <!-- Direct profile open on click -->
                            <div onclick="BusinessDashboardView.switchTab('profile')" class="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1 mr-2" title="Profilə keçin">
                                <div class="relative shrink-0">
                                    <div class="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10 shadow-2xs bg-zinc-800 flex items-center justify-center">
                                        ${partner.avatar ? `
                                            <img src="${partner.avatar}" 
                                                 alt="${partner.ownerName}" 
                                                 onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');" 
                                                 class="w-full h-full object-cover">
                                            <div class="hidden w-full h-full flex items-center justify-center bg-[#FFDD2D] text-[#101114] text-[11px] font-black">
                                                ${(partner.ownerName || 'LM').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                            </div>
                                        ` : `
                                            <div class="w-full h-full flex items-center justify-center bg-[#FFDD2D] text-[#101114] text-[11px] font-black">
                                                ${(partner.ownerName || 'LM').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                            </div>
                                        `}
                                    </div>
                                    <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#101114]"></span>
                                </div>
                                <div class="min-w-0">
                                    <div class="text-xs font-black text-white truncate group-hover:text-tbank-yellow transition">${partner.ownerName}</div>
                                    <div class="text-[10px] text-zinc-400 font-medium truncate">${partner.email || 'leyla@bakubeauty.az'}</div>
                                </div>
                            </div>

                            <!-- Right Exit / Logout Icon Button -->
                            <button type="button" onclick="BusinessDashboardView.logout()" class="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-rose-400 hover:bg-rose-500/20 transition shrink-0" title="Hesabdan çıxış">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </aside>

                <!-- ==========================================
                     MAIN WORKSPACE CANVAS: FLOATING ROUNDED WHITE RECTANGLE
                     (Curved top & bottom bordered by the warm Zeyvo Yellow frame!)
                =========================================== -->
                <main class="flex-1 bg-white text-slate-900 rounded-[28px] sm:rounded-[32px] flex flex-col overflow-hidden shadow-2xl relative min-w-0">
                    
                    <!-- Top Bar inside Canvas (adapts dynamically to active tab) -->
                    ${this.renderCanvasHeader()}

                    <!-- Inner Canvas Body -->
                    <div id="bizCanvasBody" class="flex-1 overflow-auto relative">
                        ${this.renderActiveTabContent()}
                    </div>
                </main>
            <!-- ==========================================
                 MODAL: CREATE / EDIT BUSINESS
            =========================================== -->
            <div id="bizCreateBusinessModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateBusinessModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-lg w-full max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-7 shadow-2xl space-y-4 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: 'Yeni biznes və ya fərdi usta', titleId: 'bizModalTitle', description: 'Biznes və ya fərdi fəaliyyət məlumatlarını daxil edin', onClose: 'BusinessDashboardView.closeCreateBusinessModal()' })}

                    <form onsubmit="BusinessDashboardView.handleSaveBusiness(event)" class="space-y-4 text-xs">
                        <input type="hidden" id="bizFormEditId" value="">

                        <!-- 1. Selection: Biznes vs Fərdi usta -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-2">Fəaliyyət növü *</label>
                            <div class="grid grid-cols-2 gap-3">
                                <label id="bizTypeCard_business" onclick="BusinessDashboardView.selectBusinessType('business')" class="p-3.5 rounded-2xl border-2 transition cursor-pointer flex flex-col gap-2 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs">
                                    <div class="flex items-center justify-between">
                                        <div class="w-8 h-8 rounded-xl bg-[#FFDD2D] text-[#101114] flex items-center justify-center">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                        </div>
                                        <input type="radio" name="bizType" value="business" checked class="accent-tbank-graphite w-4 h-4 cursor-pointer">
                                    </div>
                                    <div>
                                        <div class="font-medium text-xs text-tbank-graphite">Biznes</div>
                                        <div class="text-[11px] text-slate-400 font-normal">Salon, studiya və ya mərkəz</div>
                                    </div>
                                </label>

                                <label id="bizTypeCard_individual" onclick="BusinessDashboardView.selectBusinessType('individual')" class="p-3.5 rounded-2xl border-2 transition cursor-pointer flex flex-col gap-2 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300">
                                    <div class="flex items-center justify-between">
                                        <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                        </div>
                                        <input type="radio" name="bizType" value="individual" class="accent-tbank-graphite w-4 h-4 cursor-pointer">
                                    </div>
                                    <div>
                                        <div class="font-medium text-xs text-tbank-graphite">Fərdi usta</div>
                                        <div class="text-[11px] text-slate-400 font-normal">Fərdi çalışan mütəxəssis</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- 2. Name field -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5" id="bizFormNameLabel">Biznesin adı *</label>
                            <input type="text" id="bizFormName" required placeholder="Məs: Baku Beauty Studio" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <!-- 3. Description field (Optional) -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Təsvir</label>
                            <textarea id="bizFormDesc" rows="3" placeholder="Biznesiniz və ya təqdim etdiyiniz xidmətlər haqqında qısa məlumat..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                        </div>

                        <!-- Actions -->
                        <div class="pt-2 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateBusinessModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Biznesi yarat", type: "submit", id: "bizModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: SWITCH ACTIVE BUSINESS & BRANCH (BİZNES VƏ FİLİAL SEÇİMİ)
            =========================================== -->
            <div id="bizSwitchContextModal" onclick="if(event.target === this) BusinessDashboardView.closeSwitchContextModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-800 flex flex-col max-h-[90vh]">
                    <!-- Header -->
                    ${ZeyvoUI.modalHeader({ title: 'Biznes və filial seçimi', description: 'İdarə etmək istədiyiniz biznes və ya filialı seçin', onClose: 'BusinessDashboardView.closeSwitchContextModal()' })}

                    <!-- Search Input -->
                    <div class="relative shrink-0">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </span>
                        <input type="text" id="bizSwitchSearchInput" oninput="BusinessDashboardView.filterSwitchContextList(this.value)" placeholder="Biznes və ya filial axtar..." class="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-medium">
                    </div>

                    <!-- Scrollable Businesses & Branches List -->
                    <div id="bizSwitchListContainer" class="overflow-y-auto space-y-3 flex-1 pr-1 -mr-1">
                        <!-- Populated dynamically via BusinessDashboardView.renderSwitchContextListHtml() -->
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: DELETE CONFIRMATION (SİLMƏNİ TƏSDİQLƏMƏ MODALI)
            =========================================== -->
            <div id="bizDeleteConfirmModal" onclick="if(event.target === this) BusinessDashboardView.closeDeleteConfirmModal()" class="hidden fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-sm w-full p-6 sm:p-7 shadow-2xl text-center space-y-4 text-slate-800 animate-in fade-in zoom-in-95">
                    <!-- Title & Message -->
                    <div class="space-y-2">
                        <h3 id="deleteConfirmTitle" class="text-base sm:text-lg font-bold text-slate-900">
                            Silinməni təsdiqləyin
                        </h3>
                        <div id="deleteConfirmMessage" class="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed px-1">
                            Bu elementi silmək istədiyinizə əminsiniz?
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="pt-2 flex items-center gap-2.5">
                        ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeDeleteConfirmModal()", size: "lg", type: "button", className: "flex-1" })}
                        <button type="button" id="deleteConfirmBtn" onclick="BusinessDashboardView.executeDeleteConfirm()" class="flex-1 h-11 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition shadow-xs active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer">
                            Bəli, sil
                        </button>
                    </div>
                </div>
            </div>


            <!-- ==========================================
                 MODAL: RESOURCE FILTERS (RESURS FİLTRLƏRİ)
            =========================================== -->
            <div id="bizResourceFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeResourceFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: 'Resurs filtrləri', description: 'Növ, kateqoriya və filial üzrə detallı seçim', onClose: 'BusinessDashboardView.closeResourceFilterModal()' })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Resource Type Selection -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Resurs növü</label>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <button type="button" id="resFilterTypeBtn_all" onclick="BusinessDashboardView.selectFilterModalType('all')" class="p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1.5 transition text-center cursor-pointer">
                                    <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="resFilterTypeBtn_chair" onclick="BusinessDashboardView.selectFilterModalType('chair')" class="p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1.5 transition text-center cursor-pointer">
                                    <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5Z"/><path d="M6 18v3M18 18v3"/></svg>
                                    <span class="text-[11px] font-semibold">Kreslo</span>
                                </button>
                                <button type="button" id="resFilterTypeBtn_room" onclick="BusinessDashboardView.selectFilterModalType('room')" class="p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1.5 transition text-center cursor-pointer">
                                    <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><circle cx="14" cy="12" r="1"/></svg>
                                    <span class="text-[11px] font-semibold">Otaq</span>
                                </button>
                                <button type="button" id="resFilterTypeBtn_device" onclick="BusinessDashboardView.selectFilterModalType('device')" class="p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1.5 transition text-center cursor-pointer">
                                    <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                    <span class="text-[11px] font-semibold">Aparat</span>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Category Select -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-medium">Kateqoriya</label>
                            <select id="resFilterModalCategory" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition cursor-pointer">
                                <!-- Populated dynamically -->
                            </select>
                        </div>



                        <!-- Actions -->
                        <div class="pt-3 flex items-center justify-between border-t border-slate-100">
                            <button type="button" onclick="BusinessDashboardView.resetAllResourceFilters()" class="text-xs font-medium text-slate-500 hover:text-rose-600 transition flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                <span>Filtrləri sıfırla</span>
                            </button>
                            <div class="flex items-center gap-2">
                                ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeResourceFilterModal()", size: "md", type: "button" })}
                                ${ZeyvoUI.button({ label: "Tətbiq et", onClick: "BusinessDashboardView.applyResourceFilterModal()", size: "md", type: "button" })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT RESOURCE CATEGORY
            =========================================== -->
            <div id="bizCreateResourceCategoryModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateResourceCategoryModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: "Yeni resurs kateqoriyası", titleId: "resCategoryModalTitle", description: "Məs: Bərbər zonası, Kosmetologiya, Masaj otaqları", onClose: "BusinessDashboardView.closeCreateResourceCategoryModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveResourceCategory(event)" class="space-y-4 text-xs font-normal">
                        <input type="hidden" id="resCategoryFormEditId" value="">

                        <!-- Icon / SVG Selector + Name in row -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-medium">Kateqoriya adı *</label>
                            <input type="text" id="resCategoryFormName" required placeholder="Məs: Bərbər və saç zalı" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                            <input type="hidden" id="resCategoryFormIcon" value="folder">
                            <div class="pt-2">
                                <label class="block text-slate-500 text-[11px] font-medium mb-1.5">İkon seçin:</label>
                                <div class="grid grid-cols-6 sm:grid-cols-9 gap-1.5 p-2 bg-slate-50/70 border border-slate-100 rounded-xl" id="resCatIconOptions">
                                    <button type="button" data-icon="folder" onclick="BusinessDashboardView.selectCategoryFormIcon('folder', this)" class="w-9 h-9 rounded-xl border-2 border-slate-900 bg-white text-slate-950 transition flex items-center justify-center shadow-xs scale-105 cursor-pointer" title="Qovluq (Ümumi)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg></button>
                                    <button type="button" data-icon="medical" onclick="BusinessDashboardView.selectCategoryFormIcon('medical', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Həkim & klinika"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg></button>
                                    <button type="button" data-icon="dental" onclick="BusinessDashboardView.selectCategoryFormIcon('dental', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Stomatologiya"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 7.5 2 11 .3 2 2.5 3 4 3s3.7-1 4-3c.5-3.5 2-7.5 2-11 0-3.5-2.5-6-6-6Z"/><path d="M12 2v6"/></svg></button>
                                    <button type="button" data-icon="heart" onclick="BusinessDashboardView.selectCategoryFormIcon('heart', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Müayinə & sağlamlıq"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M7 11h2.5l1.5-3 2 6 1.5-3H17"/></svg></button>
                                    <button type="button" data-icon="scissors" onclick="BusinessDashboardView.selectCategoryFormIcon('scissors', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Bərbər & saç"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg></button>
                                    <button type="button" data-icon="spa" onclick="BusinessDashboardView.selectCategoryFormIcon('spa', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Kosmetologiya & baxım"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/><path d="M18 11c1.5 0 3 .5 3 2s-1.5 2-3 2"/><path d="M6 11C4.5 11 3 11.5 3 13s1.5 2 3 2"/></svg></button>
                                    <button type="button" data-icon="nail" onclick="BusinessDashboardView.selectCategoryFormIcon('nail', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Manikür & dırnaq"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></button>
                                    <button type="button" data-icon="laser" onclick="BusinessDashboardView.selectCategoryFormIcon('laser', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Lazer & aparat"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></button>
                                    <button type="button" data-icon="chair" onclick="BusinessDashboardView.selectCategoryFormIcon('chair', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Kreslo & iş masası"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5Z"/><path d="M6 18v3M18 18v3"/></svg></button>
                                    <button type="button" data-icon="room" onclick="BusinessDashboardView.selectCategoryFormIcon('room', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Otaq & kabinet"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><circle cx="14" cy="12" r="1"/></svg></button>
                                    <button type="button" data-icon="bed" onclick="BusinessDashboardView.selectCategoryFormIcon('bed', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Kuşetka & masaj stolu"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg></button>
                                    <button type="button" data-icon="wrench" onclick="BusinessDashboardView.selectCategoryFormIcon('wrench', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Usta & təmir alətləri"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></button>
                                    <button type="button" data-icon="car" onclick="BusinessDashboardView.selectCategoryFormIcon('car', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Avto servis & qaraj"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M5 11l1.5-5h11l1.5 5"/><rect x="3" y="11" width="18" height="6" rx="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></button>
                                    <button type="button" data-icon="dumbbell" onclick="BusinessDashboardView.selectCategoryFormIcon('dumbbell', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Fitnes & trenajor"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m6.5 6.5 11 11M5 9l-2-2 4-4 2 2M15 19l2 2 4-4-2-2M8 4l2 2M18 14l2 2M4 8l2 2M14 18l2 2"/></svg></button>
                                    <button type="button" data-icon="book" onclick="BusinessDashboardView.selectCategoryFormIcon('book', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Təhsil & kabinet"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg></button>
                                    <button type="button" data-icon="paw" onclick="BusinessDashboardView.selectCategoryFormIcon('paw', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Baytarlıq & heyvanlar"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="15" r="4"/><circle cx="7" cy="8" r="2"/><circle cx="17" cy="8" r="2"/><circle cx="10" cy="4" r="1.8"/><circle cx="14" cy="4" r="1.8"/></svg></button>
                                    <button type="button" data-icon="sparkles" onclick="BusinessDashboardView.selectCategoryFormIcon('sparkles', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="VIP & xüsusi xidmət"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></button>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Təsvir (İstəyə bağlı)</label>
                            <textarea id="resCategoryFormDesc" rows="2.5" placeholder="Kateqoriya haqqında qısa məlumat..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                        </div>

                        <!-- Actions -->
                        <div class="pt-2 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateResourceCategoryModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Kateqoriyanı Yarat", type: "submit", id: "resCategoryModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT RESOURCE (RESURS ƏLAVƏ ET / REDAKTƏ ET)
            =========================================== -->
            <div id="bizCreateResourceModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateResourceModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-lg w-full max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-7 shadow-2xl space-y-4 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: "Yeni resurs əlavə et", titleId: "resModalTitle", description: "Kreslo, kabinet və ya avadanlıq məlumatlarını daxil edin", onClose: "BusinessDashboardView.closeCreateResourceModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveResource(event)" class="space-y-4 text-xs font-normal">
                        <input type="hidden" id="resFormEditId" value="">

                        <!-- 1. Resource Type Selection Cards -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-2">Resurs növü *</label>
                            <div class="grid grid-cols-3 gap-2.5">
                                <label id="resTypeCard_chair" onclick="BusinessDashboardView.selectResourceFormType('chair')" class="p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1.5 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs">
                                    <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5Z"/><path d="M6 18v3M18 18v3"/></svg></span>
                                    <div>
                                        <div class="font-semibold text-xs text-tbank-graphite">Kreslo</div>
                                        <div class="text-[10px] text-slate-400">İş yeri</div>
                                    </div>
                                    <input type="radio" name="resType" value="chair" checked class="sr-only">
                                </label>

                                <label id="resTypeCard_room" onclick="BusinessDashboardView.selectResourceFormType('room')" class="p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1.5 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300">
                                    <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><circle cx="14" cy="12" r="1"/></svg></span>
                                    <div>
                                        <div class="font-semibold text-xs text-tbank-graphite">Otaq</div>
                                        <div class="text-[10px] text-slate-400">Kabinet</div>
                                    </div>
                                    <input type="radio" name="resType" value="room" class="sr-only">
                                </label>

                                <label id="resTypeCard_device" onclick="BusinessDashboardView.selectResourceFormType('device')" class="p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1.5 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300">
                                    <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
                                    <div>
                                        <div class="font-semibold text-xs text-tbank-graphite">Aparat</div>
                                        <div class="text-[10px] text-slate-400">Avadanlıq</div>
                                    </div>
                                    <input type="radio" name="resType" value="device" class="sr-only">
                                </label>
                            </div>
                        </div>

                        <!-- 2. Resource Name -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5" id="resFormNameLabel">Resursun adı *</label>
                            <input type="text" id="resFormName" required placeholder="Məs: Kreslo #1 (Barber)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <!-- 3. Category Select -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Kateqoriya (İstəyə bağlı)</label>
                            <select id="resFormCategory" class="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-medium">
                                <option value="">— Kateqoriyasız (Sərbəst resurs) —</option>
                                <!-- Populated dynamically via BusinessDashboardView.populateResourceCategoryOptions() -->
                            </select>
                            <input type="hidden" id="resFormBranch" value="">
                        </div>

                        <!-- 4. Status (Cards) -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-2">Vəziyyət (Status) *</label>
                            <div class="grid grid-cols-3 gap-2.5">
                                <label id="resStatusCard_active" onclick="BusinessDashboardView.selectResourceFormStatus('active')" class="p-2.5 sm:p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1.5 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs">
                                    <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
                                    </span>
                                    <div>
                                        <div class="font-semibold text-xs text-tbank-graphite">Aktiv</div>
                                        <div class="text-[10px] text-slate-400">İşlək</div>
                                    </div>
                                    <input type="radio" name="resStatusRadio" value="active" checked class="sr-only">
                                </label>

                                <label id="resStatusCard_busy" onclick="BusinessDashboardView.selectResourceFormStatus('busy')" class="p-2.5 sm:p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1.5 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300">
                                    <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                        <span class="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200"></span>
                                    </span>
                                    <div>
                                        <div class="font-semibold text-xs text-tbank-graphite">Məşğul</div>
                                        <div class="text-[10px] text-slate-400">İstifadədə</div>
                                    </div>
                                    <input type="radio" name="resStatusRadio" value="busy" class="sr-only">
                                </label>

                                <label id="resStatusCard_maintenance" onclick="BusinessDashboardView.selectResourceFormStatus('maintenance')" class="p-2.5 sm:p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1.5 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300">
                                    <span class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                                        <span class="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-200"></span>
                                    </span>
                                    <div>
                                        <div class="font-semibold text-xs text-tbank-graphite">Təmirdə</div>
                                        <div class="text-[10px] text-slate-400">Qeyri-aktiv</div>
                                    </div>
                                    <input type="radio" name="resStatusRadio" value="maintenance" class="sr-only">
                                </label>
                            </div>
                            <input type="hidden" id="resFormStatus" value="active">
                        </div>

                        <!-- 5. Quantity (Say / Miqdar) -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Resursun sayı *</label>
                            <div class="flex items-center gap-2">
                                <button type="button" onclick="BusinessDashboardView.adjustResourceQuantity(-1)" class="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-lg font-bold flex items-center justify-center transition border border-slate-200 active:scale-95 select-none" title="Azalt">−</button>
                                <input type="number" id="resFormQuantity" min="1" value="1" required class="flex-1 h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-center font-bold text-sm outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition" oninput="if(parseInt(this.value)<1||isNaN(parseInt(this.value)))this.value='1';" onblur="if(parseInt(this.value)<1||isNaN(parseInt(this.value)))this.value='1';">
                                <button type="button" onclick="BusinessDashboardView.adjustResourceQuantity(1)" class="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-lg font-bold flex items-center justify-center transition border border-slate-200 active:scale-95 select-none" title="Artır">+</button>
                            </div>
                            <p class="text-[11px] text-slate-400 mt-1">Minimum 1 olmalıdır (0 ola bilməz)</p>
                        </div>

                        <!-- 6. Description / Notes -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Təsvir və ya qeydlər</label>
                            <textarea id="resFormDesc" rows="3" placeholder="Resurs haqqında əlavə qeydlər, avadanlıq modeli və ya təlimatlar..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                        </div>

                        <!-- Actions -->
                        <div class="pt-2 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateResourceModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Resursu əlavə et", type: "submit", id: "resModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT PRODUCT CATEGORY
            =========================================== -->
            <div id="bizCreateProductCategoryModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateProductCategoryModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: "Yeni məhsul kateqoriyası", titleId: "prodCategoryModalTitle", description: "Məs: Saç baxımı, Dəri qulluğu, Sərfiyyat malları", onClose: "BusinessDashboardView.closeCreateProductCategoryModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveProductCategory(event)" class="space-y-4 text-xs font-normal">
                        <input type="hidden" id="prodCategoryFormEditId" value="">

                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-medium">Kateqoriya adı *</label>
                            <input type="text" id="prodCategoryFormName" required placeholder="Məs: Saç baxımı və stilləşdirmə" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                            <input type="hidden" id="prodCategoryFormIcon" value="package">
                            <div class="pt-2">
                                <label class="block text-slate-500 text-[11px] font-medium mb-1.5">İkon seçin:</label>
                                <div class="grid grid-cols-6 sm:grid-cols-9 gap-1.5 p-2 bg-slate-50/70 border border-slate-100 rounded-xl" id="prodCatIconOptions">
                                    <button type="button" data-icon="package" onclick="BusinessDashboardView.selectProductCategoryFormIcon('package', this)" class="w-9 h-9 rounded-xl border-2 border-slate-900 bg-white text-slate-950 transition flex items-center justify-center shadow-xs scale-105 cursor-pointer" title="Məhsul bağlaması"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg></button>
                                    <button type="button" data-icon="folder" onclick="BusinessDashboardView.selectProductCategoryFormIcon('folder', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Qovluq (Ümumi)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg></button>
                                    <button type="button" data-icon="scissors" onclick="BusinessDashboardView.selectProductCategoryFormIcon('scissors', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Saç və bərbər"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg></button>
                                    <button type="button" data-icon="spa" onclick="BusinessDashboardView.selectProductCategoryFormIcon('spa', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Kosmetologiya və dəri"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/><path d="M18 11c1.5 0 3 .5 3 2s-1.5 2-3 2"/><path d="M6 11C4.5 11 3 11.5 3 13s1.5 2 3 2"/></svg></button>
                                    <button type="button" data-icon="nail" onclick="BusinessDashboardView.selectProductCategoryFormIcon('nail', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Manikür və dırnaq"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></button>
                                    <button type="button" data-icon="medical" onclick="BusinessDashboardView.selectProductCategoryFormIcon('medical', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Tibb və klinika"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg></button>
                                    <button type="button" data-icon="dental" onclick="BusinessDashboardView.selectProductCategoryFormIcon('dental', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Stomatologiya"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 7.5 2 11 .3 2 2.5 3 4 3s3.7-1 4-3c.5-3.5 2-7.5 2-11 0-3.5-2.5-6-6-6Z"/><path d="M12 2v6"/></svg></button>
                                    <button type="button" data-icon="wrench" onclick="BusinessDashboardView.selectProductCategoryFormIcon('wrench', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Alətlər və texnika"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></button>
                                    <button type="button" data-icon="car" onclick="BusinessDashboardView.selectProductCategoryFormIcon('car', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Avto kimya və qulluq"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M5 11l1.5-5h11l1.5 5"/><rect x="3" y="11" width="18" height="6" rx="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></button>
                                    <button type="button" data-icon="sparkles" onclick="BusinessDashboardView.selectProductCategoryFormIcon('sparkles', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Sərfiyyat və xüsusi"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></button>
                                    <button type="button" data-icon="tag" onclick="BusinessDashboardView.selectProductCategoryFormIcon('tag', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Aksessuar və etiket"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r=".5" fill="currentColor"/></svg></button>
                                    <button type="button" data-icon="paw" onclick="BusinessDashboardView.selectProductCategoryFormIcon('paw', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Zooxudmət və qulluq"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="15" r="4"/><circle cx="7" cy="8" r="2"/><circle cx="17" cy="8" r="2"/><circle cx="10" cy="4" r="1.8"/><circle cx="14" cy="4" r="1.8"/></svg></button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Təsvir (İstəyə bağlı)</label>
                            <textarea id="prodCategoryFormDesc" rows="2.5" placeholder="Kateqoriya haqqında qısa məlumat..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                        </div>

                        <div class="pt-2 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateProductCategoryModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Kateqoriyanı Saxla", type: "submit", id: "prodCategoryModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT PRODUCT (MƏHSUL ƏLAVƏ ET / REDAKTƏ ET)
            =========================================== -->
            <div id="bizCreateProductModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateProductModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl space-y-4 text-slate-800 max-h-[92vh] overflow-y-auto">
                    ${ZeyvoUI.modalHeader({ title: 'Yeni məhsul əlavə et', titleId: 'prodModalTitle', description: 'Pərakəndə satış malı və ya daxili sərfiyyat məhsulu', onClose: 'BusinessDashboardView.closeCreateProductModal()' })}

                    <form onsubmit="BusinessDashboardView.handleSaveProduct(event)" class="space-y-4 text-xs font-normal">
                        <input type="hidden" id="prodFormEditId" value="">

                        <!-- 1. Product Usage Type Selection Cards (Satış üçün & Daxili Sərfiyyat) -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-2">Təyinat növü *</label>
                            <div class="grid grid-cols-2 gap-3">
                                <label id="prodTypeCard_retail" onclick="BusinessDashboardView.selectProductFormType('retail')" class="p-3 rounded-2xl border-2 transition cursor-pointer flex items-center gap-3 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs">
                                    <span class="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></span>
                                    <div class="min-w-0 text-left">
                                        <div class="font-bold text-xs text-tbank-graphite">Satış üçün</div>
                                        <div class="text-[10px] text-slate-500 truncate">Pərakəndə satış</div>
                                    </div>
                                    <input type="radio" name="prodType" value="retail" checked class="sr-only">
                                </label>

                                <label id="prodTypeCard_internal" onclick="BusinessDashboardView.selectProductFormType('internal')" class="p-3 rounded-2xl border-2 transition cursor-pointer flex items-center gap-3 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300">
                                    <span class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg></span>
                                    <div class="min-w-0 text-left">
                                        <div class="font-bold text-xs text-tbank-graphite">Sərfiyyat</div>
                                        <div class="text-[10px] text-slate-500 truncate">Daxili istifadə</div>
                                    </div>
                                    <input type="radio" name="prodType" value="internal" class="sr-only">
                                </label>
                            </div>
                        </div>

                        <!-- 2. Product Name -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Məhsulun adı *</label>
                            <input type="text" id="prodFormName" required placeholder="Məs: Kerastase Nutritive Şampun 250ml" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <!-- 3. Category & SKU in 2 cols -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-slate-700 font-medium mb-1.5">Kateqoriya *</label>
                                <!-- Fixed badge when creating (read-only) -->
                                <div id="prodFormCategoryBadgeWrap" class="hidden">
                                    <div class="h-11 px-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-800">
                                        <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                                        <span id="prodFormCategoryBadgeText" class="truncate">—</span>
                                    </div>
                                </div>
                                <!-- Dropdown when editing (mandatory) -->
                                <div id="prodFormCategorySelectWrap">
                                    <select id="prodFormCategory" required class="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-medium">
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-slate-700 font-medium mb-1.5">Artikol / Barkod</label>
                                <input type="text" id="prodFormSku" placeholder="Məs: KRT-01 və ya 47600123" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs font-mono">
                            </div>
                        </div>

                        <!-- 4. Prices: Maya dəyəri & Satış qiyməti -->
                        <div class="space-y-2">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                                <div>
                                    <label class="block text-slate-700 font-medium mb-1.5">Maya dəyəri (Alış qiyməti, ₼)</label>
                                    <div class="relative">
                                        <input type="number" step="0.01" min="0" id="prodFormCostPrice" placeholder="0.00" class="w-full h-10 px-3.5 pr-8 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition font-medium text-xs">
                                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 text-xs font-bold pointer-events-none">₼</span>
                                    </div>
                                </div>

                                <div id="prodFormSalePriceContainer">
                                    <label class="block text-slate-700 font-medium mb-1.5" id="prodFormSalePriceLabel">Satış qiyməti (₼)</label>
                                    <div class="relative">
                                        <input type="number" step="0.01" min="0" id="prodFormSalePrice" placeholder="0.00" class="w-full h-10 px-3.5 pr-8 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition font-medium text-xs">
                                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 text-xs font-bold pointer-events-none">₼</span>
                                    </div>
                                </div>
                            </div>
                            <div id="prodFormInternalPriceHint" class="hidden px-3.5 py-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-[11px] text-blue-700 flex items-center gap-2">
                                <svg class="w-4 h-4 shrink-0 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                                <span>Daxili sərfiyyat məhsulları üçün yalnız maya (alış) dəyəri qeyd olunur.</span>
                            </div>
                        </div>

                        <!-- 5. Stock & Units -->
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <!-- 5.1 Mövcud stok sayı -->
                            <div class="min-w-0">
                                <label class="block text-slate-700 font-medium mb-1.5 truncate">Mövcud stok sayı *</label>
                                <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center overflow-hidden focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                    <button type="button" onclick="BusinessDashboardView.adjustProductFormStock(-1)" class="w-8 h-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold flex items-center justify-center transition border-r border-slate-200 shrink-0 select-none cursor-pointer" title="Azalt">−</button>
                                    <input type="number" id="prodFormStock" min="0" value="1" required class="w-full min-w-0 h-full px-1.5 bg-transparent text-slate-900 text-center font-bold text-xs outline-none" oninput="if(parseInt(this.value)<0||isNaN(parseInt(this.value)))this.value='0';">
                                    <button type="button" onclick="BusinessDashboardView.adjustProductFormStock(1)" class="w-8 h-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold flex items-center justify-center transition border-l border-slate-200 shrink-0 select-none cursor-pointer" title="Artır">+</button>
                                </div>
                            </div>

                            <!-- 5.2 Ölçü vahidi -->
                            <div class="min-w-0">
                                <label class="block text-slate-700 font-medium mb-1.5 truncate">Ölçü vahidi</label>
                                <select id="prodFormUnit" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-semibold">
                                    <option value="ədəd" selected>ədəd</option>
                                    <option value="ml">ml</option>
                                    <option value="litr">litr</option>
                                    <option value="qram">qram</option>
                                    <option value="qutu">qutu</option>
                                    <option value="dəst">dəst</option>
                                </select>
                            </div>

                            <!-- 5.3 Kritik limit (Bildiriş) -->
                            <div class="min-w-0">
                                <label class="block text-slate-700 font-medium mb-1.5 truncate">Kritik limit (Bildiriş)</label>
                                <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center overflow-hidden focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus:bg-white transition">
                                    <button type="button" onclick="BusinessDashboardView.adjustProductFormMinStock(-1)" class="w-8 h-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold flex items-center justify-center transition border-r border-slate-200 shrink-0 select-none cursor-pointer" title="Azalt">−</button>
                                    <input type="number" id="prodFormMinStock" min="0" value="3" placeholder="3" class="w-full min-w-0 h-full px-1.5 bg-transparent text-slate-900 text-center font-bold text-xs outline-none" oninput="if(parseInt(this.value)<0||isNaN(parseInt(this.value)))this.value='0';">
                                    <button type="button" onclick="BusinessDashboardView.adjustProductFormMinStock(1)" class="w-8 h-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold flex items-center justify-center transition border-l border-slate-200 shrink-0 select-none cursor-pointer" title="Artır">+</button>
                                </div>
                            </div>
                        </div>

                        <!-- 6. Description / Notes -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Təsvir və ya qeydlər</label>
                            <textarea id="prodFormDesc" rows="2.5" placeholder="İstifadə qaydaları, tərkib, təchizatçı və ya digər qeydlər..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                        </div>

                        <!-- Actions -->
                        <div class="pt-2 flex items-center justify-end gap-2 w-full">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateProductModal()", size: "lg", type: "button", className: "flex-1 sm:flex-initial" })}
                            ${ZeyvoUI.button({ label: "Məhsulu əlavə et", type: "submit", id: "prodModalSubmitBtn", className: "flex-1 sm:flex-initial", size: "lg" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: PRODUCT FILTERS (MƏHSUL FİLTRLƏRİ)
            =========================================== -->
            <div id="bizProductFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeProductFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: "Məhsul filtrləri", description: "Təyinat, kateqoriya və stok vəziyyəti üzrə seçim", onClose: "BusinessDashboardView.closeProductFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Product Type -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Təyinat növü</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="prodFilterTypeBtn_all" onclick="BusinessDashboardView.selectProductFilterType('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="prodFilterTypeBtn_retail" onclick="BusinessDashboardView.selectProductFilterType('retail')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Satış üçün</span>
                                </button>
                                <button type="button" id="prodFilterTypeBtn_internal" onclick="BusinessDashboardView.selectProductFilterType('internal')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Sərfiyyat</span>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Stock Status -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Stok vəziyyəti</label>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <button type="button" id="prodFilterStockBtn_all" onclick="BusinessDashboardView.selectProductFilterStock('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="prodFilterStockBtn_in_stock" onclick="BusinessDashboardView.selectProductFilterStock('in_stock')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Stokda var</span>
                                </button>
                                <button type="button" id="prodFilterStockBtn_low_stock" onclick="BusinessDashboardView.selectProductFilterStock('low_stock')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Kritik qalıq</span>
                                </button>
                                <button type="button" id="prodFilterStockBtn_out_of_stock" onclick="BusinessDashboardView.selectProductFilterStock('out_of_stock')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Bitib</span>
                                </button>
                            </div>
                        </div>

                        <!-- 3. Category Select -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-medium">Kateqoriya</label>
                            <select id="prodFilterModalCategory" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition cursor-pointer">
                            </select>
                        </div>

                        <!-- Actions -->
                        <div class="pt-3 flex items-center justify-between border-t border-slate-100">
                            <button type="button" onclick="BusinessDashboardView.resetAllProductFilters()" class="text-xs font-medium text-slate-500 hover:text-rose-600 transition flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                <span>Filtrləri sıfırla</span>
                            </button>
                            <div class="flex items-center gap-2">
                                ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeProductFilterModal()", size: "md", type: "button" })}
                                ${ZeyvoUI.button({ label: "Tətbiq et", onClick: "BusinessDashboardView.applyProductFilterModal()", size: "md", type: "button" })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: BALANCE FILTERS (QALIQLAR FİLTR PƏNCƏRƏSİ)
            =========================================== -->
            <div id="bizBalanceFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeBalanceFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: "Qalıq filtrləri", description: "Anbar, stok vəziyyəti və kateqoriya üzrə seçim", onClose: "BusinessDashboardView.closeBalanceFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Warehouse Selection -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Anbar seçimi</label>
                            <div id="balanceFilterWarehouseButtons" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <!-- Generated dynamically -->
                            </div>
                        </div>

                        <!-- 2. Stock Status -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Stok vəziyyəti</label>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <button type="button" id="balFilterStockBtn_all" onclick="BusinessDashboardView.selectBalanceFilterStock('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="balFilterStockBtn_in_stock" onclick="BusinessDashboardView.selectBalanceFilterStock('in_stock')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Stokda var</span>
                                </button>
                                <button type="button" id="balFilterStockBtn_low_stock" onclick="BusinessDashboardView.selectBalanceFilterStock('low_stock')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Kritik qalıq</span>
                                </button>
                                <button type="button" id="balFilterStockBtn_out_of_stock" onclick="BusinessDashboardView.selectBalanceFilterStock('out_of_stock')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Bitib</span>
                                </button>
                            </div>
                        </div>

                        <!-- 3. Category Select -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-medium">Kateqoriya</label>
                            <select id="balFilterModalCategory" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition cursor-pointer">
                            </select>
                        </div>

                        <!-- Actions -->
                        <div class="pt-3 flex items-center justify-between border-t border-slate-100">
                            <button type="button" onclick="BusinessDashboardView.resetAllBalanceFilters()" class="text-xs font-medium text-slate-500 hover:text-rose-600 transition flex items-center gap-1.5 cursor-pointer">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                <span>Filtrləri sıfırla</span>
                            </button>
                            <div class="flex items-center gap-2">
                                ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeBalanceFilterModal()", size: "md", type: "button" })}
                                ${ZeyvoUI.button({ label: "Tətbiq et", onClick: "BusinessDashboardView.applyBalanceFilterModal()", size: "md", type: "button" })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: OPERATIONS FILTER (ƏMƏLİYYAT FİLTRLƏRİ)
            =========================================== -->
            <div id="bizOperationsFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeOperationsFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl sm:max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
                    ${ZeyvoUI.modalHeader({ title: "Əməliyyat filtrləri", description: "Anbar, növ, tarix və status üzrə axtarış", onClose: "BusinessDashboardView.closeOperationsFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Warehouse Selection -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Anbar seçimi</label>
                            <div id="opFilterWarehouseButtons" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <!-- Generated dynamically -->
                            </div>
                        </div>

                        <!-- 2. Operation Type -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Əməliyyat növü</label>
                            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2" id="opFilterTypeButtons">
                                <!-- Generated dynamically -->
                            </div>
                        </div>

                        <!-- 3. Date Period -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Tarix aralığı</label>
                            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2" id="opFilterPeriodButtons">
                                <!-- Generated dynamically -->
                            </div>
                            <!-- Custom Date Range with Calendar Pickers -->
                            <div id="opFilterCustomDateContainer" class="hidden pt-2 space-y-1.5">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <div>
                                        <label class="block text-[11px] text-slate-500 font-medium mb-1">Başlanğıc tarixi</label>
                                        <div class="relative" id="opFilterStartDateWrapper">
                                            <input type="hidden" id="opFilterStartDate" value="">
                                            <button type="button" id="opFilterStartDateDisplay" onclick="BusinessDashboardView.toggleCustomDatePicker('opFilterStartDate', event)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition font-medium text-xs flex items-center justify-between cursor-pointer text-left">
                                                <span id="opFilterStartDateText" class="text-slate-800 font-medium truncate">Seçin</span>
                                                <svg class="w-4 h-4 text-slate-400 shrink-0 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                            </button>
                                            <div id="opFilterStartDateDropdown" onclick="event.stopPropagation()" class="hidden absolute top-full left-0 mt-1.5 z-50 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200 shadow-2xl p-3.5 space-y-3"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-[11px] text-slate-500 font-medium mb-1">Bitmə tarixi</label>
                                        <div class="relative" id="opFilterEndDateWrapper">
                                            <input type="hidden" id="opFilterEndDate" value="">
                                            <button type="button" id="opFilterEndDateDisplay" onclick="BusinessDashboardView.toggleCustomDatePicker('opFilterEndDate', event)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition font-medium text-xs flex items-center justify-between cursor-pointer text-left">
                                                <span id="opFilterEndDateText" class="text-slate-800 font-medium truncate">Seçin</span>
                                                <svg class="w-4 h-4 text-slate-400 shrink-0 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                            </button>
                                            <div id="opFilterEndDateDropdown" onclick="event.stopPropagation()" class="hidden absolute top-full right-0 mt-1.5 z-50 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200 shadow-2xl p-3.5 space-y-3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 4. Status -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Sənəd statusu</label>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2" id="opFilterStatusButtons">
                                <!-- Generated dynamically -->
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="pt-3 flex items-center justify-between border-t border-slate-100">
                            <button type="button" onclick="BusinessDashboardView.resetAllOperationFilters()" class="text-xs font-medium text-slate-500 hover:text-rose-600 transition flex items-center gap-1.5 cursor-pointer">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                <span>Filtrləri sıfırla</span>
                            </button>
                            <div class="flex items-center gap-2">
                                ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeOperationsFilterModal()", size: "md", type: "button" })}
                                ${ZeyvoUI.button({ label: "Tətbiq et", onClick: "BusinessDashboardView.applyOperationsFilterModal()", size: "md", type: "button" })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: SUPPLIERS FILTER (TƏCHİZATÇI FİLTRLƏRİ)
            =========================================== -->
            <div id="bizSupplierFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeSupplierFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-2xl sm:rounded-[28px] max-w-md w-full p-4 sm:p-6 shadow-2xl space-y-4 sm:space-y-5 text-slate-800 max-h-[92vh] overflow-y-auto">
                    ${ZeyvoUI.modalHeader({ title: "Təchizatçı filtrləri", description: "Status, sənəd mövcudluğu və VÖEN üzrə seçim", onClose: "BusinessDashboardView.closeSupplierFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Status -->
                        <div class="space-y-1.5 sm:space-y-2">
                            <label class="block text-slate-700 font-medium">Təchizatçı statusu</label>
                            <div class="grid grid-cols-3 gap-1.5 sm:gap-2">
                                <button type="button" id="supFilterStatusBtn_all" onclick="BusinessDashboardView.selectSupplierFilterStatus('all')" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[10px] sm:text-[11px] font-semibold leading-tight">Hamısı</span>
                                </button>
                                <button type="button" id="supFilterStatusBtn_active" onclick="BusinessDashboardView.selectSupplierFilterStatus('active')" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[10px] sm:text-[11px] font-semibold leading-tight">Aktiv</span>
                                </button>
                                <button type="button" id="supFilterStatusBtn_inactive" onclick="BusinessDashboardView.selectSupplierFilterStatus('inactive')" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[10px] sm:text-[11px] font-semibold leading-tight">Qeyri-aktiv</span>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Operations / Documents -->
                        <div class="space-y-1.5 sm:space-y-2">
                            <label class="block text-slate-700 font-medium">Mədaxil sənədləri</label>
                            <div class="grid grid-cols-3 gap-1.5 sm:gap-2">
                                <button type="button" id="supFilterOpsBtn_all" onclick="BusinessDashboardView.selectSupplierFilterOps('all')" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[10px] sm:text-[11px] font-semibold leading-tight">Hamısı</span>
                                </button>
                                <button type="button" id="supFilterOpsBtn_with_ops" onclick="BusinessDashboardView.selectSupplierFilterOps('with_ops')" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[10px] sm:text-[11px] font-semibold leading-tight">Sənədi olanlar</span>
                                </button>
                                <button type="button" id="supFilterOpsBtn_no_ops" onclick="BusinessDashboardView.selectSupplierFilterOps('no_ops')" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[10px] sm:text-[11px] font-semibold leading-tight">Sənədsiz</span>
                                </button>
                            </div>
                        </div>

                        <!-- 3. VOEN -->
                        <div class="space-y-1.5 sm:space-y-2">
                            <label class="block text-slate-700 font-medium">VÖEN məlumatı</label>
                            <div class="grid grid-cols-3 gap-1.5 sm:gap-2">
                                <button type="button" id="supFilterVoenBtn_all" onclick="BusinessDashboardView.selectSupplierFilterVoen('all')" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[10px] sm:text-[11px] font-semibold leading-tight">Hamısı</span>
                                </button>
                                <button type="button" id="supFilterVoenBtn_with_voen" onclick="BusinessDashboardView.selectSupplierFilterVoen('with_voen')" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[10px] sm:text-[11px] font-semibold leading-tight">VÖEN var</span>
                                </button>
                                <button type="button" id="supFilterVoenBtn_without_voen" onclick="BusinessDashboardView.selectSupplierFilterVoen('without_voen')" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[10px] sm:text-[11px] font-semibold leading-tight">VÖEN yoxdur</span>
                                </button>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="pt-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 border-t border-slate-100">
                            <button type="button" onclick="BusinessDashboardView.resetAllSupplierFilters()" class="text-xs font-medium text-slate-500 hover:text-rose-600 transition flex items-center gap-1.5 cursor-pointer py-1">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                <span>Filtrləri sıfırla</span>
                            </button>
                            <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                                ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeSupplierFilterModal()", size: "md", type: "button", className: "flex-1 sm:flex-initial" })}
                                ${ZeyvoUI.button({ label: "Tətbiq et", onClick: "BusinessDashboardView.applySupplierFilterModal()", size: "md", type: "button", className: "flex-1 sm:flex-initial" })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT WAREHOUSE (ANBAR ƏLAVƏ ET / REDAKTƏ ET)
            =========================================== -->
            <div id="bizCreateWarehouseModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateWarehouseModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: "Yeni anbar əlavə et", titleId: "warehouseModalTitle", description: "Saxlanc məntəqəsi və ya kabinet vitrini", onClose: "BusinessDashboardView.closeCreateWarehouseModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveWarehouse(event)" class="space-y-4 text-xs font-normal">
                        <input type="hidden" id="warehouseFormEditId" value="">

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Anbarın adı *</label>
                            <input type="text" id="warehouseFormName" required placeholder="Məs: Əsas anbar və ya Vitrin anbarı" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Məsul şəxs</label>
                            <input type="text" id="warehouseFormResponsible" placeholder="Məs: Leyla Məmmədova" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Ünvan və ya yerləşmə zonası</label>
                            <input type="text" id="warehouseFormAddress" placeholder="Məs: Əsas zal, 2-ci mərtəbə" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Qeydlər</label>
                            <textarea id="warehouseFormNotes" rows="2.5" placeholder="Anbar təyinatı və ya xüsusi təlimatlar..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                        </div>

                        <div class="pt-2 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateWarehouseModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Anbarı saxla", type: "submit", id: "warehouseModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT SUPPLIER (TƏCHİZATÇI ƏLAVƏ ET / REDAKTƏ ET)
            =========================================== -->
            <div id="bizCreateSupplierModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateSupplierModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-2xl sm:rounded-[28px] max-w-lg w-full p-4 sm:p-6 sm:p-7 shadow-2xl space-y-4 text-slate-800 max-h-[92vh] overflow-y-auto">
                    ${ZeyvoUI.modalHeader({ title: 'Yeni təchizatçı əlavə et', titleId: 'supplierModalTitle', description: 'Tərəfdaş şirkət və ya kontragent məlumatları', onClose: 'BusinessDashboardView.closeCreateSupplierModal()' })}

                    <form onsubmit="BusinessDashboardView.handleSaveSupplier(event)" class="space-y-3.5 text-xs font-normal">
                        <input type="hidden" id="supplierFormEditId" value="">

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Şirkət və ya kontragent adı *</label>
                            <input type="text" id="supplierFormName" required placeholder="Məs: Beauty Trade MMC və ya L'Oréal Paris" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Əlaqədar şəxs</label>
                            <input type="text" id="supplierFormContact" placeholder="Məs: Emin Məmmədov" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Əlaqə nömrəsi</label>
                            <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center overflow-hidden focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
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
                                <input type="tel" id="supplierFormPhone" maxlength="15" placeholder="(50) 000-00-00" oninput="App.formatAzPhone ? App.formatAzPhone(this) : null" class="w-full h-full px-3.5 bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">E-poçt ünvanı</label>
                            <input type="email" id="supplierFormEmail" placeholder="orders@supplier.az" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">VÖEN</label>
                            <input type="text" id="supplierFormVoen" placeholder="Məs: 1402847291" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Hüquqi və ya çatdırılma ünvanı</label>
                            <input type="text" id="supplierFormAddress" placeholder="Məs: Bakı ş., Əhməd Rəcəbli 19" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Qeydlər</label>
                            <textarea id="supplierFormNotes" rows="2" placeholder="Şərtlər, ödəniş qaydası və ya distribütorluq..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                        </div>

                        <div class="pt-2 flex items-center justify-end gap-2 w-full">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateSupplierModal()", size: "lg", type: "button", className: "flex-1 sm:flex-initial" })}
                            ${ZeyvoUI.button({ label: "Təchizatçını saxla", type: "submit", id: "supplierModalSubmitBtn", className: "flex-1 sm:flex-initial", size: "lg" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT TECH CARD (TEXNOLOJİ KART)
            =========================================== -->
            <div id="bizCreateTechCardModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateTechCardModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl sm:max-w-2xl w-full p-5 sm:p-7 shadow-2xl space-y-4 text-slate-800 max-h-[92vh] overflow-y-auto">
                    ${ZeyvoUI.modalHeader({ title: 'Yeni texnoloji kart', titleId: 'techCardModalTitle', description: 'Xidmət üzrə material və vasitələrin sərfiyyat norması', onClose: 'BusinessDashboardView.closeCreateTechCardModal()' })}

                    <form onsubmit="BusinessDashboardView.handleSaveTechCard(event)" class="space-y-4 text-xs font-normal">
                        <input type="hidden" id="techCardFormEditId" value="">

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Texnoloji kartın adı *</label>
                            <input type="text" id="techCardFormName" required placeholder="Məs: Saç boyama (Orta uzunluq)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                        </div>

                        <!-- Service selection (via dedicated modal picker) -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Aid olduğu xidmət *</label>
                            <input type="hidden" id="techCardFormService" value="">
                            <div class="flex items-center gap-2">
                                <div onclick="BusinessDashboardView.openTechCardServicePickerModal()" class="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 flex items-center justify-between cursor-pointer hover:border-slate-400 hover:bg-white transition group">
                                    <div class="flex items-center gap-2.5 min-w-0">
                                        <span class="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                                        </span>
                                        <span id="techCardSelectedServiceText" class="text-xs font-semibold text-slate-400 truncate">Kataloqdan xidmət seçin...</span>
                                    </div>
                                    <span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 group-hover:border-slate-900 group-hover:text-black transition shrink-0">Xidmət seç</span>
                                </div>
                                <button type="button" id="techCardClearServiceBtn" onclick="BusinessDashboardView.clearTechCardService()" class="hidden w-11 h-11 rounded-xl border border-slate-200 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition cursor-pointer" title="Seçimi ləğv et">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Ingredients / Products Consumption Items List (via dedicated modal picker) -->
                        <div class="space-y-2.5">
                            <div class="flex items-center justify-between">
                                <div>
                                    <label class="block text-slate-800 font-bold text-xs">Sərfiyyat tərkibi (Məhsullar və miqdarlar) *</label>
                                    <span class="text-[11px] text-slate-400">Xidmət üzrə istifadə edilən materialların norması</span>
                                </div>
                                <button type="button" onclick="BusinessDashboardView.openTechCardProductPickerModal()" class="px-3 py-1.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs shadow-2xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                                    <span>Məhsul əlavə et</span>
                                </button>
                            </div>

                            <div id="techCardIngredientsContainer" class="space-y-2">
                                <!-- Populated dynamically -->
                            </div>
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Təlimat və qeydlər</label>
                            <textarea id="techCardFormNotes" rows="2.5" placeholder="Usta üçün qarışdırma və tətbiq qaydaları..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                        </div>

                        <div class="pt-2 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateTechCardModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Kartı saxla", type: "submit", id: "techCardModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: TECH CARD SERVICE PICKER (XİDMƏT SEÇİMİ)
            =========================================== -->
            <div id="bizTechCardServicePickerModal" onclick="if(event.target === this) BusinessDashboardView.closeTechCardServicePickerModal()" class="hidden fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-800 max-h-[88vh] flex flex-col animate-in fade-in zoom-in-95">
                    <!-- Header -->
                    ${ZeyvoUI.modalHeader({ title: "Xidmət seçimi", description: "Texnoloji kart üçün salon xidmətini seçin", onClose: "BusinessDashboardView.closeTechCardServicePickerModal()" })}

                    <!-- Search & Filter Category Chips -->
                    <div class="space-y-2.5 shrink-0">
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="tcServicePickerSearchInput"
                                   oninput="BusinessDashboardView.onTcServicePickerSearch(this.value)"
                                   placeholder="Xidmət adı ilə axtarın..."
                                   class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition">
                        </div>

                        <!-- Category filter pills -->
                        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs" id="tcServiceCategoryPills">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <!-- Services List -->
                    <div class="flex-1 overflow-y-auto rounded-xl border border-slate-200/80 bg-slate-50/50 divide-y divide-slate-100 max-h-72" id="tcServiceListContainer">
                        <!-- Populated dynamically -->
                    </div>

                    <!-- Footer actions -->
                    <div class="pt-2 flex items-center justify-between gap-3 shrink-0 border-t border-slate-100">
                        <span class="text-xs text-slate-400 font-medium" id="tcServiceCountHint"></span>
                        ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeTechCardServicePickerModal()", size: "md", type: "button" })}
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: TECH CARD PRODUCT PICKER (SƏRFİYYAT MƏHSUL SEÇİMİ)
            =========================================== -->
            <div id="bizTechCardProductPickerModal" onclick="if(event.target === this) BusinessDashboardView.closeTechCardProductPickerModal()" class="hidden fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-800 max-h-[88vh] flex flex-col animate-in fade-in zoom-in-95">
                    <!-- Header -->
                    ${ZeyvoUI.modalHeader({ title: "Sərfiyyat məhsullarının seçimi", description: "Texnoloji karta daxil ediləcək material və preparatları seçin", onClose: "BusinessDashboardView.closeTechCardProductPickerModal()" })}

                    <!-- Warehouse Selection Banner: Select warehouse first -->
                    <div class="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-xl bg-[#FFDD2D] text-[#101114] flex items-center justify-center shrink-0 font-bold shadow-2xs">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                            </div>
                            <div>
                                <div class="font-bold text-xs text-slate-900">Məhsul anbarı *</div>
                                <div class="text-[11px] text-slate-500 font-normal">Əvvəlcə anbarı seçin, sonra məhsulları qeyd edin</div>
                            </div>
                        </div>
                        <div class="sm:w-64 sm:min-w-[260px] shrink-0">
                            <select id="tcProductPickerWarehouseSelect" aria-label="Anbar seçin" onchange="BusinessDashboardView.onTcProductPickerWarehouseChange(this.value)" class="w-full h-10 px-3.5 pr-8 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-xs outline-none focus:border-slate-900 shadow-2xs transition cursor-pointer">
                            </select>
                        </div>
                    </div>

                    <!-- Search and fast selection -->
                    <div class="space-y-2.5 shrink-0">
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="tcProductPickerSearchInput"
                                   oninput="BusinessDashboardView.onTcProductPickerSearch(this.value)"
                                   placeholder="Məhsul adı və ya kateqoriyası ilə axtarın..."
                                   class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition">
                        </div>

                        <div class="flex items-center justify-between text-xs pt-0.5">
                            <div class="flex items-center gap-2">
                                <button type="button" onclick="BusinessDashboardView.toggleTcProductPickerSelectAll(true)" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition cursor-pointer">
                                    Hamısını seç
                                </button>
                                <button type="button" onclick="BusinessDashboardView.toggleTcProductPickerSelectAll(false)" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-rose-600 font-medium text-[11px] transition cursor-pointer">
                                    Təmizlə
                                </button>
                            </div>
                            <span id="tcProductPickerCounterBadge" class="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/70">
                                0 məhsul seçilib
                            </span>
                        </div>
                    </div>

                    <!-- Product Items List -->
                    <div class="flex-1 overflow-y-auto rounded-xl border border-slate-200/80 bg-slate-50/50 divide-y divide-slate-100 max-h-72" id="tcProductPickerListContainer">
                        <!-- Populated dynamically -->
                    </div>

                    <!-- Footer actions -->
                    <div class="pt-2 flex items-center justify-between gap-3 shrink-0 border-t border-slate-100">
                        <div class="text-xs text-slate-600 font-medium">
                            <span>Seçilən maya dəyəri: </span>
                            <strong id="tcProductPickerCostPreview" class="text-slate-900 font-mono">0.00 ₼</strong>
                        </div>
                        <div class="flex items-center gap-2">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeTechCardProductPickerModal()", size: "md", type: "button" })}
                            <button type="button" id="tcProductPickerConfirmBtn" onclick="BusinessDashboardView.applyTechCardProductPicker()" class="px-5 h-10 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold transition text-xs shadow-xs active:scale-95 flex items-center gap-1.5 cursor-pointer">
                                <span>Əlavə et</span>
                                <span id="tcProductPickerBtnCount" class="w-5 h-5 rounded-full bg-black/10 text-slate-900 text-[10px] flex items-center justify-center font-bold">0</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE INVENTORY OPERATION (ANBAR ƏMƏLİYYATI)
            =========================================== -->
            <div id="bizCreateOperationModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateOperationModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl w-full p-5 sm:p-7 shadow-2xl space-y-4 text-slate-800 max-h-[92vh] overflow-y-auto">
                    ${ZeyvoUI.modalHeader({ title: "Yeni anbar əməliyyatı", titleId: "operationModalTitle", description: "Mədaxil, məxaric və ya yerdəyişmə", onClose: "BusinessDashboardView.closeCreateOperationModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveOperation(event)" class="space-y-4 text-xs font-normal">
                        <!-- 1. Operation Type Cards -->
                        <div>
                            <label class="block text-slate-700 font-medium mb-2">Əməliyyat növü *</label>
                            <div class="grid grid-cols-3 gap-2.5">
                                <label id="opTypeCard_inflow" onclick="BusinessDashboardView.selectOperationType('inflow')" class="p-2.5 rounded-xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs">
                                    <span class="text-xs font-bold text-emerald-700">Mədaxil</span>
                                    <span class="text-[10px] text-slate-400">Gələn mal</span>
                                    <input type="radio" name="opType" value="inflow" checked class="sr-only">
                                </label>
                                <label id="opTypeCard_writeoff" onclick="BusinessDashboardView.selectOperationType('writeoff')" class="p-2.5 rounded-xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300">
                                    <span class="text-xs font-bold text-rose-700">Məxaric</span>
                                    <span class="text-[10px] text-slate-400">Silinmə</span>
                                    <input type="radio" name="opType" value="writeoff" class="sr-only">
                                </label>
                                <label id="opTypeCard_transfer" onclick="BusinessDashboardView.selectOperationType('transfer')" class="p-2.5 rounded-xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300">
                                    <span class="text-xs font-bold text-blue-700">Yerdəyişmə</span>
                                    <span class="text-[10px] text-slate-400">Transfer</span>
                                    <input type="radio" name="opType" value="transfer" class="sr-only">
                                </label>
                            </div>
                        </div>

                        <!-- Hidden warehouse input (selected inside product picker) -->
                        <input type="hidden" id="opFormWarehouse" value="wh_1">

                        <!-- 2. Supplier / Counterparty (Full width for maximum clarity) -->
                        <div id="opSupplierContainer" class="space-y-1.5">
                            <div class="flex items-center justify-between">
                                <label class="block text-slate-700 font-medium text-xs" id="opSupplierLabel">Təchizatçı / Kontragent</label>
                                <button type="button" id="opNewSupplierQuickBtn" onclick="BusinessDashboardView.openCreateSupplierModal(null, true)" class="text-[11px] font-semibold text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1 cursor-pointer" title="Yeni təchizatçı əlavə et">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                                    <span>Yeni təchizatçı</span>
                                </button>
                            </div>
                            <div class="space-y-1.5">
                                <select id="opFormSupplierSelect" aria-label="Təchizatçı seçin" onchange="BusinessDashboardView.onOpSupplierSelectChange(this.value)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-medium cursor-pointer">
                                    <!-- Dynamically populated from getSuppliers() -->
                                </select>
                                <input type="text" id="opFormSupplier" placeholder="Məs: Beauty Trade MMC və ya L'Oréal Paris" class="hidden w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                            </div>
                        </div>

                        <!-- 3. Date & Reference / Notes (Compact 2 columns) -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-slate-700 font-medium mb-1.5 text-xs">Tarix *</label>
                                <div class="relative" id="opDatePickerWrapper">
                                    <input type="hidden" id="opFormDate" value="">
                                    <button type="button" id="opFormDateDisplay" onclick="BusinessDashboardView.toggleCustomDatePicker('opFormDate', event)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs flex items-center justify-between cursor-pointer text-left">
                                        <span id="opFormDateText" class="text-slate-900 font-medium">01.10.2026</span>
                                        <svg class="w-4 h-4 text-slate-400 pointer-events-none shrink-0 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    </button>
                                    <div id="opFormDateDropdown" onclick="event.stopPropagation()" class="hidden absolute top-full left-0 mt-1.5 z-50 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200 shadow-2xl p-3.5 space-y-3"></div>
                                </div>
                            </div>
                            <div>
                                <label class="block text-slate-700 font-medium mb-1.5 text-xs">Qeyd və ya sənəd №</label>
                                <input type="text" id="opFormNotes" placeholder="Məs: Qaimə №104 və ya təhvil aktı" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                            </div>
                        </div>

                        <!-- 4. Product Items list in document -->
                        <div class="space-y-2.5">
                            <div class="flex items-center justify-between flex-wrap gap-2">
                                <div>
                                    <label class="block text-slate-800 font-bold text-xs">Sənədə daxil olan məhsullar *</label>
                                    <span class="text-[11px] text-slate-400">Əməliyyat üçün məhsul və miqdarları təyin edin</span>
                                </div>
                                <button type="button" onclick="BusinessDashboardView.openOperationProductPickerModal()" class="px-3 py-1.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs shadow-2xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                                    <span>Məhsul əlavə et</span>
                                </button>
                            </div>
                            <div id="opProductRowsContainer" class="space-y-2">
                                <!-- Populated dynamically -->
                            </div>
                        </div>

                        <div class="pt-2 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateOperationModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Əməliyyatı təsdiqlə", type: "submit", id: "opModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE INVENTORY AUDIT (İNVENTARİZASİYA APAR)
            =========================================== -->
            <div id="bizCreateAuditModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateAuditModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-2xl w-full p-5 sm:p-7 shadow-2xl space-y-4 text-slate-800 max-h-[92vh] overflow-y-auto">
                    ${ZeyvoUI.modalHeader({ title: "Yeni inventarizasiya aktı", description: "Faktiki sayım nəticələrini qeyd edin və qalıqları uyğunlaşdırın", onClose: "BusinessDashboardView.closeCreateAuditModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveAudit(event)" class="space-y-4 text-xs font-normal">
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label class="block text-slate-700 font-medium mb-1.5">Anbar *</label>
                                <select id="auditFormWarehouse" onchange="BusinessDashboardView.onAuditWarehouseChange()" class="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-medium cursor-pointer">
                                    <!-- Populated dynamically -->
                                </select>
                            </div>
                            <div>
                                <label class="block text-slate-700 font-medium mb-1.5">Tarix *</label>
                                <div class="relative" id="auditDatePickerWrapper">
                                    <input type="hidden" id="auditFormDate" value="">
                                    <button type="button" id="auditFormDateDisplay" onclick="BusinessDashboardView.toggleCustomDatePicker('auditFormDate', event)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs flex items-center justify-between cursor-pointer text-left">
                                        <span id="auditFormDateText" class="text-slate-900 font-medium">01.10.2026</span>
                                        <svg class="w-4 h-4 text-slate-400 pointer-events-none shrink-0 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    </button>
                                    <div id="auditFormDateDropdown" onclick="event.stopPropagation()" class="hidden absolute top-full left-0 mt-1.5 z-50 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl p-3.5 space-y-3"></div>
                                </div>
                            </div>
                            <div>
                                <label class="block text-slate-700 font-medium mb-1.5">Məsul komissiya</label>
                                <input type="text" id="auditFormResponsible" placeholder="Məs: Rauf Ə. və Aysel Q." class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                            </div>
                        </div>

                        <!-- Sayım cədvəli və məhsul əlavə etmə -->
                        <div class="space-y-2.5">
                            <div class="flex items-center justify-between flex-wrap gap-2">
                                <div>
                                    <label class="block text-slate-800 font-bold text-xs">Sayım cədvəli</label>
                                    <span class="text-[11px] text-slate-400">Yoxlanılacaq məhsulların faktiki miqdarını daxil edin</span>
                                </div>
                                <div class="flex items-center gap-1.5">
                                    <button type="button" onclick="BusinessDashboardView.openAuditProductPickerModal()" class="px-3 py-1.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs shadow-2xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14"/></svg>
                                        <span>Məhsul seç</span>
                                    </button>
                                    <button type="button" onclick="BusinessDashboardView.addAllWarehouseProductsToAudit()" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer" title="Bu anbardakı bütün məhsulları cədvələ əlavə et">
                                        <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                        <span class="hidden sm:inline">Bütün anbarı doldur</span>
                                        <span class="sm:hidden">Hamısı</span>
                                    </button>
                                    <button type="button" id="auditClearTableBtn" onclick="BusinessDashboardView.clearAuditItemsTable()" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 font-medium text-xs transition cursor-pointer" title="Cədvəli təmizlə">
                                        Təmizlə
                                    </button>
                                </div>
                            </div>

                            <!-- Products list container -->
                            <div class="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/50">
                                <div class="max-h-64 overflow-y-auto divide-y divide-slate-100" id="auditProductsContainer">
                                    <!-- Populated dynamically -->
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Qeyd və nəticə</label>
                            <textarea id="auditFormNotes" rows="2" placeholder="Komissiya rəyi və ya səbəblər..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                        </div>

                        <div class="pt-2 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateAuditModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "İnventarizasiyanı təsdiqlə", type: "submit", id: "auditModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: AUDIT PRODUCT PICKER (MƏHSUL SEÇİMİ)
            =========================================== -->
            <div id="bizAuditProductPickerModal" onclick="if(event.target === this) BusinessDashboardView.closeAuditProductPickerModal()" class="hidden fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-800 max-h-[88vh] flex flex-col animate-in fade-in zoom-in-95">
                    <!-- Header -->
                    ${ZeyvoUI.modalHeader({ title: "Məhsul seçimi", description: "İnventarizasiya aktına daxil ediləcək məhsulları işarələyin", onClose: "BusinessDashboardView.closeAuditProductPickerModal()" })}

                    <!-- Warehouse Selection Banner: Select warehouse first -->
                    <div class="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-xl bg-[#FFDD2D] text-[#101114] flex items-center justify-center shrink-0 font-bold shadow-2xs">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                            </div>
                            <div>
                                <div class="font-bold text-xs text-slate-900">Sayım anbarı *</div>
                                <div class="text-[11px] text-slate-500 font-normal">Əvvəlcə sayım aparılan anbarı seçin, sonra məhsulları qeyd edin</div>
                            </div>
                        </div>
                        <div class="sm:w-64 sm:min-w-[260px] shrink-0">
                            <select id="auditPickerWarehouseSelect" aria-label="Anbar seçin" onchange="BusinessDashboardView.onAuditPickerWarehouseChange(this.value)" class="w-full h-10 px-3.5 pr-8 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-xs outline-none focus:border-slate-900 shadow-2xs transition cursor-pointer">
                            </select>
                        </div>
                    </div>

                    <!-- Search and fast selection -->
                    <div class="space-y-2.5 shrink-0">
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="auditPickerSearchInput"
                                   oninput="BusinessDashboardView.onAuditPickerSearch(this.value)"
                                   placeholder="Məhsul adı və ya artikol ilə axtarın..."
                                   class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition">
                        </div>

                        <div class="flex items-center justify-between text-xs pt-0.5">
                            <div class="flex items-center gap-2">
                                <button type="button" onclick="BusinessDashboardView.togglePickerSelectAll(true)" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition cursor-pointer">
                                    Hamısını seç
                                </button>
                                <button type="button" onclick="BusinessDashboardView.togglePickerSelectAll(false)" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-rose-600 font-medium text-[11px] transition cursor-pointer">
                                    Təmizlə
                                </button>
                            </div>
                            <span id="auditPickerCounterBadge" class="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200/70">
                                0 məhsul seçilib
                            </span>
                        </div>
                    </div>

                    <!-- Product Items List -->
                    <div class="flex-1 overflow-y-auto rounded-xl border border-slate-200/80 bg-slate-50/50 divide-y divide-slate-100 max-h-72" id="auditPickerProductsContainer">
                        <!-- Populated dynamically -->
                    </div>

                    <!-- Footer actions -->
                    <div class="pt-2 flex items-center justify-between gap-3 shrink-0 border-t border-slate-100">
                        <span class="text-xs text-slate-400 font-medium truncate" id="auditPickerWarehouseHint"></span>
                        <div class="flex items-center gap-2">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeAuditProductPickerModal()", size: "md", type: "button" })}
                            <button type="button" id="auditPickerConfirmBtn" onclick="BusinessDashboardView.applyAuditProductPicker()" class="px-5 h-10 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold transition text-xs shadow-xs active:scale-95 flex items-center gap-1.5 cursor-pointer">
                                <span>Əlavə et</span>
                                <span id="auditPickerBtnCount" class="w-5 h-5 rounded-full bg-black/10 text-slate-900 text-[10px] flex items-center justify-center font-bold">0</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: OPERATION PRODUCT PICKER (ƏMƏLİYYAT MƏHSUL SEÇİMİ)
            =========================================== -->
            <div id="bizOperationProductPickerModal" onclick="if(event.target === this) BusinessDashboardView.closeOperationProductPickerModal()" class="hidden fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-800 max-h-[88vh] flex flex-col animate-in fade-in zoom-in-95">
                    <!-- Header -->
                    ${ZeyvoUI.modalHeader({ title: "Məhsul seçimi", description: "Sənədə daxil ediləcək məhsulları seçin və miqdarını təyin edin", onClose: "BusinessDashboardView.closeOperationProductPickerModal()" })}

                    <!-- Warehouse Selection Banner: Select warehouse first -->
                    <div class="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-xl bg-[#FFDD2D] text-[#101114] flex items-center justify-center shrink-0 font-bold shadow-2xs">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                            </div>
                            <div>
                                <div class="font-bold text-xs text-slate-900">Məhsul anbarı *</div>
                                <div class="text-[11px] text-slate-500 font-normal">Əvvəlcə anbarı seçin, sonra əməliyyat məhsullarını qeyd edin</div>
                            </div>
                        </div>
                        <div class="sm:w-64 sm:min-w-[260px] shrink-0">
                            <select id="opPickerWarehouseSelect" aria-label="Anbar seçin" onchange="BusinessDashboardView.onOpPickerWarehouseChange(this.value)" class="w-full h-10 px-3.5 pr-8 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-xs outline-none focus:border-slate-900 shadow-2xs transition cursor-pointer">
                            </select>
                        </div>
                    </div>

                    <!-- Search and fast selection -->
                    <div class="space-y-2.5 shrink-0">
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="opPickerSearchInput"
                                   oninput="BusinessDashboardView.onOpPickerSearch(this.value)"
                                   placeholder="Məhsul adı və ya artikol ilə axtarın..."
                                   class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition">
                        </div>

                        <div class="flex items-center justify-between text-xs pt-0.5">
                            <div class="flex items-center gap-2">
                                <button type="button" onclick="BusinessDashboardView.toggleOpPickerSelectAll(true)" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition cursor-pointer">
                                    Hamısını seç
                                </button>
                                <button type="button" onclick="BusinessDashboardView.toggleOpPickerSelectAll(false)" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-rose-600 font-medium text-[11px] transition cursor-pointer">
                                    Təmizlə
                                </button>
                            </div>
                            <span id="opPickerCounterBadge" class="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/70">
                                0 məhsul seçilib
                            </span>
                        </div>
                    </div>

                    <!-- Product Items List -->
                    <div class="flex-1 overflow-y-auto rounded-xl border border-slate-200/80 bg-slate-50/50 divide-y divide-slate-100 max-h-72" id="opPickerProductsContainer">
                        <!-- Populated dynamically -->
                    </div>

                    <!-- Footer actions -->
                    <div class="pt-2 flex items-center justify-between gap-3 shrink-0 border-t border-slate-100">
                        <span class="text-xs text-slate-400 font-medium truncate" id="opPickerWarehouseHint"></span>
                        <div class="flex items-center gap-2">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeOperationProductPickerModal()", size: "md", type: "button" })}
                            <button type="button" id="opPickerConfirmBtn" onclick="BusinessDashboardView.applyOperationProductPicker()" class="px-5 h-10 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold transition text-xs shadow-xs active:scale-95 flex items-center gap-1.5 cursor-pointer">
                                <span>Əlavə et</span>
                                <span id="opPickerBtnCount" class="w-5 h-5 rounded-full bg-black/10 text-slate-900 text-[10px] flex items-center justify-center font-bold">0</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT SERVICE CATEGORY (XİDMƏT KATEQORİYASI)
            =========================================== -->
            <div id="bizCreateServiceCategoryModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateServiceCategoryModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: "Yeni xidmət kateqoriyası", titleId: "srvCategoryModalTitle", description: "Məs: Saç xidmətləri, Dırnaq servisi, Masaj & SPA", onClose: "BusinessDashboardView.closeCreateServiceCategoryModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveServiceCategory(event)" class="space-y-4 text-xs font-normal">
                        <input type="hidden" id="srvCategoryFormEditId" value="">

                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-medium">Kateqoriya adı *</label>
                            <input type="text" id="srvCategoryFormName" required placeholder="Məs: Saç kəsimi və rəngləmə" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                            <input type="hidden" id="srvCategoryFormIcon" value="scissors">
                            <div class="pt-2">
                                <label class="block text-slate-500 text-[11px] font-medium mb-1.5">İkon seçin:</label>
                                <div class="grid grid-cols-6 sm:grid-cols-9 gap-1.5 p-2 bg-slate-50/70 border border-slate-100 rounded-xl" id="srvCatIconOptions">
                                    <button type="button" data-icon="scissors" onclick="BusinessDashboardView.selectServiceCategoryFormIcon('scissors', this)" class="w-9 h-9 rounded-xl border-2 border-slate-900 bg-white text-slate-950 transition flex items-center justify-center shadow-xs scale-105 cursor-pointer" title="Saç və bərbər"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg></button>
                                    <button type="button" data-icon="nail" onclick="BusinessDashboardView.selectServiceCategoryFormIcon('nail', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Manikür və dırnaq"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></button>
                                    <button type="button" data-icon="spa" onclick="BusinessDashboardView.selectServiceCategoryFormIcon('spa', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Kosmetologiya və dəri"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/><path d="M18 11c1.5 0 3 .5 3 2s-1.5 2-3 2"/><path d="M6 11C4.5 11 3 11.5 3 13s1.5 2 3 2"/></svg></button>
                                    <button type="button" data-icon="heart" onclick="BusinessDashboardView.selectServiceCategoryFormIcon('heart', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Masaj və SPA"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M7 11h2.5l1.5-3 2 6 1.5-3H17"/></svg></button>
                                    <button type="button" data-icon="sparkles" onclick="BusinessDashboardView.selectServiceCategoryFormIcon('sparkles', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Gözəllik & Stil"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></button>
                                    <button type="button" data-icon="folder" onclick="BusinessDashboardView.selectServiceCategoryFormIcon('folder', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Ümumi kateqoriya"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg></button>
                                    <button type="button" data-icon="medical" onclick="BusinessDashboardView.selectServiceCategoryFormIcon('medical', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Tibb və klinika"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg></button>
                                    <button type="button" data-icon="dental" onclick="BusinessDashboardView.selectServiceCategoryFormIcon('dental', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Stomatologiya"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 7.5 2 11 .3 2 2.5 3 4 3s3.7-1 4-3c.5-3.5 2-7.5 2-11 0-3.5-2.5-6-6-6Z"/><path d="M12 2v6"/></svg></button>
                                    <button type="button" data-icon="dumbbell" onclick="BusinessDashboardView.selectServiceCategoryFormIcon('dumbbell', this)" class="w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer" title="Fitness və bərpa"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m6.5 6.5 11 11M5 9l-2-2 4-4 2 2M15 19l2 2 4-4-2-2M8 4l2 2M18 14l2 2M4 8l2 2M14 18l2 2"/></svg></button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-slate-700 font-medium mb-1.5">Təsvir (İstəyə bağlı)</label>
                            <textarea id="srvCategoryFormDesc" rows="2.5" placeholder="Kateqoriya haqqında qısa məlumat..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                        </div>

                        <div class="pt-2 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateServiceCategoryModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Kateqoriyanı Saxla", type: "submit", id: "srvCategoryModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT SERVICE (XİDMƏT ƏLAVƏ ET / REDAKTƏ ET)
            =========================================== -->
            <div id="bizCreateServiceModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateServiceModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-2xl w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh]">
                    <!-- Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: "Yeni xidmət əlavə et", titleId: "srvModalTitle", description: "Xidmətin adı, qiyməti, icra müddəti və mütəxəssislər", onClose: "BusinessDashboardView.closeCreateServiceModal()" })}

                    <!-- Tabs Segmented Control -->
                    <div id="bizServiceTabsContainer" class="shrink-0 mt-3 mb-1">
                        <!-- Rendered dynamically via renderServiceModalTabs() -->
                    </div>

                    <!-- Modal Body / Form -->
                    <form onsubmit="BusinessDashboardView.handleSaveService(event)" class="flex flex-col flex-1 overflow-hidden pt-3 text-xs font-normal">
                        <input type="hidden" id="srvFormEditId" value="">
                        <input type="hidden" id="srvFormCategoryId" value="">

                        <!-- Scrollable Panes Container -->
                        <div class="flex-1 overflow-y-auto pr-1 space-y-4">
                            
                            <!-- TAB 1: ƏSAS MƏLUMATLAR (GENERAL) -->
                            <div id="srvPane_general" class="space-y-4">
                                <!-- 1. Service Name -->
                                <div>
                                    <label class="block text-slate-700 font-medium mb-1.5">Xidmətin adı *</label>
                                    <input type="text" id="srvFormName" required placeholder="Məs: Kişi Saç Kəsimi & Stil" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                                </div>

                                <!-- 2. Category Selection (Optional: with '-- Kateqoriyasız --') -->
                                <div id="srvFormCategoryBlock" class="space-y-1.5">
                                    <div class="flex items-center justify-between">
                                        <label class="block text-slate-700 font-medium">Kateqoriya</label>
                                        <span class="text-[11px] text-slate-400 font-normal">İstəyə görə (boş saxlanılsa kateqoriyasız qalır)</span>
                                    </div>
                                    <select id="srvFormCategory" class="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-medium cursor-pointer">
                                    </select>
                                </div>

                                <!-- 3. Gender / Kimin üçün -->
                                <div>
                                    <label class="block text-slate-700 font-medium mb-1.5">Kimin üçün (Auditoriya)</label>
                                    <div class="grid grid-cols-4 gap-2">
                                        <button type="button" id="srvFormGenderBtn_all" onclick="BusinessDashboardView.selectServiceFormGender('all')" class="h-9 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold transition flex items-center justify-center shadow-xs cursor-pointer">
                                            Hamısı
                                        </button>
                                        <button type="button" id="srvFormGenderBtn_women" onclick="BusinessDashboardView.selectServiceFormGender('women')" class="h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer">
                                            Qadın
                                        </button>
                                        <button type="button" id="srvFormGenderBtn_men" onclick="BusinessDashboardView.selectServiceFormGender('men')" class="h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer">
                                            Kişi
                                        </button>
                                        <button type="button" id="srvFormGenderBtn_kids" onclick="BusinessDashboardView.selectServiceFormGender('kids')" class="h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer">
                                            Uşaq
                                        </button>
                                    </div>
                                    <input type="hidden" id="srvFormGender" value="all">
                                </div>

                                <!-- 4. Service Format (Fərdi vs Qrup) and Independent Kompleks Toggle -->
                                <div class="space-y-3">
                                    <div>
                                        <label class="block text-slate-700 font-medium mb-1.5">Xidmət növü (Format)</label>
                                        <div class="grid grid-cols-2 gap-2">
                                            <button type="button" id="srvFormFormatBtn_individual" onclick="BusinessDashboardView.selectServiceFormFormat('individual')" class="h-9 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-xs">
                                                <svg class="w-4 h-4 text-slate-700 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                                <span class="truncate">Fərdi xidmət</span>
                                            </button>
                                            <button type="button" id="srvFormFormatBtn_group" onclick="BusinessDashboardView.selectServiceFormFormat('group')" class="h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center gap-1.5 cursor-pointer text-xs">
                                                <svg class="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                                                <span class="truncate">Qrup xidməti</span>
                                            </button>
                                        </div>
                                        <input type="hidden" id="srvFormFormat" value="individual">

                                        <!-- Group Capacity Box (Visible when Qrup is selected) -->
                                        <div id="srvFormGroupSettingsWrap" class="hidden mt-2.5 p-3 rounded-2xl bg-purple-50/60 border border-purple-200/70 space-y-2">
                                            <div class="flex items-center justify-between gap-3">
                                                <div class="min-w-0">
                                                    <label class="block text-purple-950 font-bold text-xs">Maksimum iştirakçı sayı (Qrup tutumu) *</label>
                                                    <p class="text-[11px] text-purple-700/80 font-normal">Eyni seansa yazıla biləcək maksimum müştəri sayı</p>
                                                </div>
                                                <div class="flex items-center gap-1.5 shrink-0">
                                                    <button type="button" onclick="BusinessDashboardView.adjustServiceFormCapacity(-1)" class="w-8 h-8 rounded-lg bg-white border border-purple-200 text-purple-900 text-base font-bold flex items-center justify-center hover:bg-purple-100 transition shadow-2xs active:scale-95 cursor-pointer">−</button>
                                                    <input type="number" id="srvFormMaxCapacity" min="2" max="100" value="6" class="w-14 h-8 px-1 rounded-lg bg-white border border-purple-200 text-purple-950 font-black text-center text-xs outline-none focus:border-purple-600 transition">
                                                    <button type="button" onclick="BusinessDashboardView.adjustServiceFormCapacity(1)" class="w-8 h-8 rounded-lg bg-white border border-purple-200 text-purple-900 text-base font-bold flex items-center justify-center hover:bg-purple-100 transition shadow-2xs active:scale-95 cursor-pointer">+</button>
                                                </div>
                                            </div>
                                            <!-- Quick Presets -->
                                            <div class="flex items-center gap-1.5 pt-0.5 overflow-x-auto no-scrollbar">
                                                <span class="text-[10px] text-purple-600 font-semibold mr-1">Hazır:</span>
                                                <button type="button" onclick="BusinessDashboardView.setServiceFormCapacity(4)" class="px-2 py-0.5 rounded-md bg-white border border-purple-200/80 hover:bg-purple-100 text-purple-800 text-[10px] font-semibold transition shrink-0 cursor-pointer">4 nəfər</button>
                                                <button type="button" onclick="BusinessDashboardView.setServiceFormCapacity(6)" class="px-2 py-0.5 rounded-md bg-white border border-purple-200/80 hover:bg-purple-100 text-purple-800 text-[10px] font-semibold transition shrink-0 cursor-pointer">6 nəfər</button>
                                                <button type="button" onclick="BusinessDashboardView.setServiceFormCapacity(8)" class="px-2 py-0.5 rounded-md bg-white border border-purple-200/80 hover:bg-purple-100 text-purple-800 text-[10px] font-semibold transition shrink-0 cursor-pointer">8 nəfər</button>
                                                <button type="button" onclick="BusinessDashboardView.setServiceFormCapacity(10)" class="px-2 py-0.5 rounded-md bg-white border border-purple-200/80 hover:bg-purple-100 text-purple-800 text-[10px] font-semibold transition shrink-0 cursor-pointer">10 nəfər</button>
                                                <button type="button" onclick="BusinessDashboardView.setServiceFormCapacity(15)" class="px-2 py-0.5 rounded-md bg-white border border-purple-200/80 hover:bg-purple-100 text-purple-800 text-[10px] font-semibold transition shrink-0 cursor-pointer">15 nəfər</button>
                                                <button type="button" onclick="BusinessDashboardView.setServiceFormCapacity(20)" class="px-2 py-0.5 rounded-md bg-white border border-purple-200/80 hover:bg-purple-100 text-purple-800 text-[10px] font-semibold transition shrink-0 cursor-pointer">20 nəfər</button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Complex (Combo / Package) Card & Toggle -->
                                    <div class="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100/90 space-y-3 transition">
                                        <div class="flex items-center justify-between cursor-pointer select-none" onclick="BusinessDashboardView.toggleServiceFormIsCombo()">
                                            <div class="flex items-center gap-2.5">
                                                <div class="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                                                </div>
                                                <div>
                                                    <div class="flex items-center gap-2">
                                                        <label class="block text-indigo-950 font-bold text-xs cursor-pointer">Kompleks (Paket) xidmət</label>
                                                        <span id="srvComboItemCountBadge" class="hidden px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-200/80 text-indigo-900 border border-indigo-300">0 xidmət</span>
                                                    </div>
                                                    <p class="text-[11px] text-indigo-700/80 font-normal">Bir neçə xidməti vahid paket halında birləşdirin (həm fərdi, həm də qrup üçün təyin edilə bilər)</p>
                                                </div>
                                            </div>
                                            <label class="relative inline-flex items-center cursor-pointer shrink-0" onclick="event.stopPropagation()">
                                                <input type="checkbox" id="srvFormIsCombo" class="sr-only peer" onchange="BusinessDashboardView.onServiceFormIsComboChange(this.checked)">
                                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>

                                        <!-- Complex (Combo / Package) Settings Box (Visible when toggle is ON) -->
                                        <div id="srvFormComboSettingsWrap" class="hidden pt-3 border-t border-indigo-100 space-y-3">
                                            <!-- Add Service to Package Trigger Button -->
                                            <div>
                                                <button type="button" onclick="BusinessDashboardView.openComboItemModal()" class="w-full py-2.5 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99]">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                                                    <span>Paketə xidmət əlavə et</span>
                                                </button>
                                            </div>

                                            <!-- Container for Selected Combo Services -->
                                            <div id="srvComboItemsContainer" class="space-y-2">
                                                <!-- Rendered by renderComboItemsList() -->
                                            </div>

                                            <!-- Total calculations summary bar -->
                                            <div id="srvComboSummaryBar" class="hidden p-3 rounded-xl bg-white border border-indigo-200/80 text-xs space-y-2 shadow-2xs">
                                                <div class="flex items-center justify-between text-slate-600">
                                                    <span>Cəmi xidmət müddəti:</span>
                                                    <span id="srvComboTotalDurationText" class="font-bold text-slate-800">0 dəq</span>
                                                </div>
                                                <div class="flex items-center justify-between text-slate-600">
                                                    <span>Ayrı-ayrı qiymətlərin cəmi:</span>
                                                    <span id="srvComboTotalPriceText" class="font-bold text-slate-800">0 ₼</span>
                                                </div>
                                                <div class="pt-2 border-t border-indigo-100 flex items-center justify-between gap-2 flex-wrap">
                                                    <div class="text-[11px] text-indigo-700 font-medium flex items-center gap-1.5">
                                                        <svg class="w-3.5 h-3.5 text-indigo-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2m-7.07-3.07 1.41-1.41M4 12H2m3.07-7.07 1.41 1.41M22 12h-2m-3.07-7.07-1.41 1.41M16.95 16.95l-1.41-1.41M9 16h6m-5 3h4m-5-8a4 4 0 1 1 6 0c0 1.5-1 2-1 3H10c0-1-1-1.5-1-3Z"/></svg>
                                                        <span id="srvComboSavingsHint">Cəmi: 0 ₼</span>
                                                    </div>
                                                    <button type="button" onclick="BusinessDashboardView.applyComboCalculationsToForm()" class="px-2.5 py-1 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-[11px] transition cursor-pointer shrink-0">
                                                        Müddət və Qiyməti tətbiq et
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 4. Price & Price Type -->
                                <div class="space-y-2 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100">
                                    <div>
                                        <label class="block text-slate-700 font-medium mb-1.5">Qiymət növü</label>
                                        <div class="grid grid-cols-3 gap-2">
                                            <button type="button" id="srvFormPriceTypeBtn_fixed" onclick="BusinessDashboardView.selectServiceFormPriceType('fixed')" class="h-9 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold transition flex items-center justify-center shadow-xs cursor-pointer">
                                                Sabit
                                            </button>
                                            <button type="button" id="srvFormPriceTypeBtn_from" onclick="BusinessDashboardView.selectServiceFormPriceType('from')" class="h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer">
                                                Başlanğıc (+)
                                            </button>
                                            <button type="button" id="srvFormPriceTypeBtn_range" onclick="BusinessDashboardView.selectServiceFormPriceType('range')" class="h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer">
                                                Aralıq (Min-Maks)
                                            </button>
                                        </div>
                                        <input type="hidden" id="srvFormPriceType" value="fixed">
                                    </div>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        <div>
                                            <label class="block text-slate-700 font-medium mb-1.5" id="srvFormPriceLabel">Qiymət (₼) *</label>
                                            <div class="relative">
                                                <input type="number" step="0.5" min="0" id="srvFormPrice" required placeholder="0.00" class="w-full h-10 px-3.5 pr-8 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition font-bold text-xs">
                                                <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 text-xs font-bold pointer-events-none">₼</span>
                                            </div>
                                        </div>
                                        <div id="srvFormPriceMaxWrap" class="hidden">
                                            <label class="block text-slate-700 font-medium mb-1.5">Maksimum qiymət (₼)</label>
                                            <div class="relative">
                                                <input type="number" step="0.5" min="0" id="srvFormPriceMax" placeholder="0.00" class="w-full h-10 px-3.5 pr-8 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition font-bold text-xs">
                                                <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 text-xs font-bold pointer-events-none">₼</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 5 & 6. Duration and Post-service Break (Vaxt və Fasilə) -->
                                <div class="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3">
                                    <!-- Header with Total Badge -->
                                    <div class="flex items-center justify-between pb-2 border-b border-slate-200/70">
                                        <div class="flex items-center gap-2">
                                            <span class="text-xs font-bold text-slate-800">Xidmət vaxtı və Fasilə</span>
                                            <span class="text-[11px] text-slate-400 font-normal">Qrafik və rezervasiya üçün</span>
                                        </div>
                                        <span id="srvFormTotalTimeBadge" class="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#FFDD2D]/40 border border-[#FFDD2D] text-slate-900 shadow-2xs">Cəmi: 45 dəq</span>
                                    </div>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <!-- Duration -->
                                        <div>
                                            <label class="block text-slate-700 font-medium text-xs mb-1.5">İcra müddəti *</label>
                                            <div class="flex items-center gap-1.5">
                                                <button type="button" onclick="BusinessDashboardView.adjustServiceFormDuration(-15)" class="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-base font-bold flex items-center justify-center transition border border-slate-200 active:scale-95 select-none cursor-pointer shrink-0" title="15 dəqiqə azalt">−</button>
                                                <div class="relative flex-1">
                                                    <input type="number" id="srvFormDuration" min="5" max="720" step="5" value="45" required class="w-full h-9 px-2 pr-9 rounded-xl bg-white border border-slate-200 text-slate-900 text-center font-bold text-xs outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition" oninput="BusinessDashboardView.updateServiceTotalTimePreview();" onblur="if(parseInt(this.value)<5||isNaN(parseInt(this.value)))this.value='45'; BusinessDashboardView.updateServiceTotalTimePreview();">
                                                    <span class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 text-[11px] font-semibold pointer-events-none">dəq</span>
                                                </div>
                                                <button type="button" onclick="BusinessDashboardView.adjustServiceFormDuration(15)" class="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-base font-bold flex items-center justify-center transition border border-slate-200 active:scale-95 select-none cursor-pointer shrink-0" title="15 dəqiqə artır">+</button>
                                            </div>
                                            <!-- Quick Duration Chips -->
                                            <div class="grid grid-cols-6 gap-1 mt-2">
                                                <button type="button" id="srvFormDurBtn_15" onclick="BusinessDashboardView.setServiceFormDuration(15)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">15</button>
                                                <button type="button" id="srvFormDurBtn_30" onclick="BusinessDashboardView.setServiceFormDuration(30)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">30</button>
                                                <button type="button" id="srvFormDurBtn_45" onclick="BusinessDashboardView.setServiceFormDuration(45)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">45</button>
                                                <button type="button" id="srvFormDurBtn_60" onclick="BusinessDashboardView.setServiceFormDuration(60)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">60</button>
                                                <button type="button" id="srvFormDurBtn_90" onclick="BusinessDashboardView.setServiceFormDuration(90)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">90</button>
                                                <button type="button" id="srvFormDurBtn_120" onclick="BusinessDashboardView.setServiceFormDuration(120)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">120</button>
                                            </div>
                                        </div>

                                        <!-- Break / Buffer -->
                                        <div>
                                            <label class="block text-slate-700 font-medium text-xs mb-1.5">Fasilə (Təmizlik / Bufer)</label>
                                            <div class="flex items-center gap-1.5">
                                                <button type="button" onclick="BusinessDashboardView.adjustServiceFormBuffer(-5)" class="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-base font-bold flex items-center justify-center transition border border-slate-200 active:scale-95 select-none cursor-pointer shrink-0" title="5 dəqiqə azalt">−</button>
                                                <div class="relative flex-1">
                                                    <input type="number" id="srvFormBufferTime" min="0" max="180" step="5" value="0" class="w-full h-9 px-2 pr-9 rounded-xl bg-white border border-slate-200 text-slate-900 text-center font-bold text-xs outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition" oninput="BusinessDashboardView.updateServiceTotalTimePreview();" onblur="if(parseInt(this.value)<0||isNaN(parseInt(this.value)))this.value='0'; BusinessDashboardView.updateServiceTotalTimePreview();">
                                                    <span class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 text-[11px] font-semibold pointer-events-none">dəq</span>
                                                </div>
                                                <button type="button" onclick="BusinessDashboardView.adjustServiceFormBuffer(5)" class="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-base font-bold flex items-center justify-center transition border border-slate-200 active:scale-95 select-none cursor-pointer shrink-0" title="5 dəqiqə artır">+</button>
                                            </div>
                                            <!-- Quick Break Chips -->
                                            <div class="grid grid-cols-6 gap-1 mt-2">
                                                <button type="button" id="srvFormBufferBtn_0" onclick="BusinessDashboardView.setServiceFormBuffer(0)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">0</button>
                                                <button type="button" id="srvFormBufferBtn_5" onclick="BusinessDashboardView.setServiceFormBuffer(5)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">5</button>
                                                <button type="button" id="srvFormBufferBtn_10" onclick="BusinessDashboardView.setServiceFormBuffer(10)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">10</button>
                                                <button type="button" id="srvFormBufferBtn_15" onclick="BusinessDashboardView.setServiceFormBuffer(15)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">15</button>
                                                <button type="button" id="srvFormBufferBtn_20" onclick="BusinessDashboardView.setServiceFormBuffer(20)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">20</button>
                                                <button type="button" id="srvFormBufferBtn_30" onclick="BusinessDashboardView.setServiceFormBuffer(30)" class="h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[10px] font-semibold transition cursor-pointer flex items-center justify-center">30</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 7. Description -->
                                <div>
                                    <label class="block text-slate-700 font-medium mb-1.5">Təsvir və ya qeydlər (İstəyə bağlı)</label>
                                    <textarea id="srvFormDescription" rows="3" placeholder="Xidmət haqqında əlavə məlumat, prosedur qaydaları..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                                </div>
                            </div>

                            <!-- TAB 2: ONLAYN QƏBUL (ONLINE BOOKING) -->
                            <div id="srvPane_online" class="hidden space-y-4">
                                <!-- Online Booking Switch Card -->
                                <div class="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                                    <div class="min-w-0">
                                        <div class="font-bold text-xs text-slate-900">Onlayn qəbul üçün aktivdir</div>
                                        <div class="text-[11px] text-slate-500 font-normal">Müştərilər bu xidməti veb sayt və tətbiqdən sifariş edə bilsin</div>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                        <input type="checkbox" id="srvFormOnlineBooking" checked onchange="BusinessDashboardView.toggleServiceOnlineBookingFields()" class="sr-only peer">
                                        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                                    </label>
                                </div>

                                <!-- Disabled notice banner when offline -->
                                <div id="srvFormOnlineDisabledBanner" class="hidden p-3.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 text-slate-600 text-xs flex items-center gap-2.5">
                                    <svg class="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                                    <div class="text-[11px] leading-relaxed">
                                        <b class="text-slate-800">Onlayn qəbul söndürülüb:</b> Bu xidmət veb sayt və tətbiqdə müştərilərə göstərilməyəcək, yalnız administrator tərəfindən daxili jurnalda təyin oluna bilər. Aşağıdakı onlayn parametrlər qeyri-aktivdir.
                                    </div>
                                </div>

                                <!-- Online Settings Container (Becomes inactive/dimmed when toggle is OFF) -->
                                <div id="srvFormOnlineDetailsWrap" class="space-y-4 transition-all duration-200">
                                    <!-- Online Display Name Override -->
                                    <div>
                                        <div class="flex items-center justify-between mb-1.5">
                                            <label class="block text-slate-700 font-medium">Onlayn vitrində xüsusi ad</label>
                                            <span class="text-[11px] text-slate-400">İstəyə bağlı</span>
                                        </div>
                                        <input type="text" id="srvFormOnlineTitle" placeholder="Boş buraxıldıqda əsas xidmət adı istifadə olunacaq" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal">
                                    </div>

                                    <!-- Service Work Images / Portfolio (İş nümunələri və şəkillər) -->
                                    <div class="space-y-4">
                                        <input type="file" id="srvFormImageFileInput" accept="image/*" multiple class="hidden" onchange="BusinessDashboardView.handleServiceImageUpload(event)">

                                        <!-- Upload box -->
                                        <div onclick="document.getElementById('srvFormImageFileInput').click()" class="border-2 border-dashed border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 rounded-2xl p-5 text-center cursor-pointer transition group">
                                            <div class="w-10 h-10 mx-auto rounded-xl bg-amber-50 group-hover:bg-amber-100 text-amber-600 flex items-center justify-center transition mb-2">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                            </div>
                                            <p class="text-xs font-semibold text-slate-800">İş nümunələrini yükləmək üçün klikləyin</p>
                                            <p class="text-[11px] text-slate-400 mt-0.5">PNG, JPG, WebP formatları (eyni anda bir neçə şəkil seçə bilərsiniz)</p>
                                        </div>

                                        <!-- URL Input -->
                                        <div class="flex items-center gap-2">
                                            <div class="relative flex-1">
                                                <input type="url" id="srvFormImageUrlInput" placeholder="və ya şəkil linkini (URL) daxil edin..." class="w-full h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-400 focus:bg-white text-xs font-normal transition" onkeydown="if(event.key==='Enter'){event.preventDefault();BusinessDashboardView.addServiceImageByUrl();}">
                                            </div>
                                            <button type="button" onclick="BusinessDashboardView.addServiceImageByUrl()" class="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs transition shrink-0 cursor-pointer shadow-2xs">
                                                Əlavə et
                                            </button>
                                        </div>

                                        <!-- Photo Gallery List with Delete -->
                                        <div>
                                            <div class="flex items-center justify-between pb-2">
                                                <span class="text-xs font-medium text-slate-700">Yüklənmiş şəkillər (<span id="srvFormGalleryCount">0</span>)</span>
                                                <button type="button" onclick="BusinessDashboardView.clearAllServiceImages()" id="btnClearAllServicePhotos" class="hidden text-[11px] text-red-500 hover:text-red-700 font-medium cursor-pointer">Bütün şəkilləri sil</button>
                                            </div>

                                            <div id="srvFormImagesGrid" class="grid grid-cols-2 sm:grid-cols-3 gap-3 min-h-[90px]">
                                                <!-- Rendered dynamically -->
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Prepayment / Deposit -->
                                    <div class="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2.5">
                                        <label class="block text-slate-700 font-medium">Öncədən ödəniş (Depozit tələbi)</label>
                                        <div class="grid grid-cols-3 gap-2">
                                            <button type="button" id="srvFormDepositBtn_none" onclick="BusinessDashboardView.selectServiceFormDepositType('none')" class="h-9 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold transition flex items-center justify-center shadow-xs cursor-pointer">
                                                Yoxdur
                                            </button>
                                            <button type="button" id="srvFormDepositBtn_fixed" onclick="BusinessDashboardView.selectServiceFormDepositType('fixed')" class="h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer">
                                                Sabit (₼)
                                            </button>
                                            <button type="button" id="srvFormDepositBtn_percent" onclick="BusinessDashboardView.selectServiceFormDepositType('percent')" class="h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer">
                                                Faiz (%)
                                            </button>
                                        </div>
                                        <input type="hidden" id="srvFormDepositType" value="none">

                                        <div id="srvFormDepositValueWrap" class="hidden pt-1">
                                            <label class="block text-slate-700 font-medium mb-1.5" id="srvFormDepositValueLabel">Depozit məbləği (₼)</label>
                                            <input type="number" step="0.5" min="0" id="srvFormDepositValue" placeholder="0.00" class="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition font-bold text-xs">
                                        </div>
                                    </div>

                                    <!-- Cancellation Policy -->
                                    <div>
                                        <label class="block text-slate-700 font-medium mb-1.5">Ləğvetmə və dəyişdirmə qaydası</label>
                                        <select id="srvFormCancelRule" class="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-medium">
                                            <option value="free_2h">Ən azı 2 saat öncədən ödənişsiz ləğv</option>
                                            <option value="free_12h">Ən azı 12 saat öncədən ödənişsiz ləğv</option>
                                            <option value="free_24h">Ən azı 24 saat öncədən ödənişsiz ləğv</option>
                                            <option value="free_any">İstənilən vaxt ödənişsiz ləğv</option>
                                            <option value="strict">Ləğv edilə bilməz (Depozit geri qaytarılmır)</option>
                                        </select>
                                    </div>

                                    <!-- Client Note / Instructions -->
                                    <div>
                                        <label class="block text-slate-700 font-medium mb-1.5">Müştəri üçün qeyd və təlimatlar (Sifariş zamanı)</label>
                                        <textarea id="srvFormClientNote" rows="2" placeholder="Məs: Zəhmət olmasa təyin olunmuş vaxtdan 10 dəqiqə əvvəl yaxınlaşın və prosedura makiyajsız gəlin..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                                    </div>
                                </div>
                            </div>

                            <!-- TAB 3: USTALAR (STAFF & SPECIALISTS) -->
                            <div id="srvPane_staff" class="hidden space-y-3.5">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h4 class="font-bold text-xs text-slate-900">Bu xidməti icra edən heyət</h4>
                                        <p id="srvFormStaffSubhead" class="text-[11px] text-slate-400 font-normal">Xidmət üzrə təyin edilmiş mütəxəssislər</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button type="button" onclick="BusinessDashboardView.openStaffPickerModal()" class="h-8 px-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                                            <span>Usta seç</span>
                                        </button>
                                        <button type="button" id="srvFormStaffClearBtn" onclick="BusinessDashboardView.clearAllServiceStaff()" class="h-8 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 font-medium text-xs transition hidden cursor-pointer" title="Bütün ustaları xidmətdən çıxar">
                                            Təmizlə
                                        </button>
                                    </div>
                                </div>

                                <div id="srvFormStaffOptions" class="space-y-2.5">
                                    <!-- Populated dynamically -->
                                </div>
                            </div>

                            <!-- TAB 4: RESURSLAR (ROOMS & EQUIPMENT) -->
                            <div id="srvPane_resources" class="hidden space-y-3.5">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h4 class="font-bold text-xs text-slate-900">Tələb olunan resurslar</h4>
                                        <p id="srvFormResourcesSubhead" class="text-[11px] text-slate-400 font-normal">Xidmət üçün tələb olunan kabinetlər, kreslolar və aparatlar</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button type="button" onclick="BusinessDashboardView.openResourcePickerModal()" class="h-8 px-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                                            <span>Resurs seç</span>
                                        </button>
                                        <button type="button" id="srvFormResourceClearBtn" onclick="BusinessDashboardView.clearAllServiceResources()" class="h-8 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 font-medium text-xs transition hidden cursor-pointer" title="Bütün resursları xidmətdən çıxar">
                                            Təmizlə
                                        </button>
                                    </div>
                                </div>

                                <div class="p-3 bg-blue-50/60 border border-blue-200/70 rounded-xl text-[11px] text-blue-900 flex items-start gap-2">
                                    <svg class="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                                    <span>Xidmət qeydə alındıqda seçilmiş resurs həmin vaxt intervalında avtomatik bron edilir və ikiqat rezervasiyaların qarşısı alınır.</span>
                                </div>

                                <div id="srvFormResourceOptions" class="space-y-2">
                                    <!-- Populated dynamically -->
                                </div>
                            </div>

                            <!-- TAB 5: MATERİALLAR (CONSUMABLES & TECH MAP) -->
                            <div id="srvPane_materials" class="hidden space-y-4">
                                <div class="flex items-center justify-between gap-3">
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <h4 class="font-bold text-xs text-slate-900">Baza Texnoloji Xəritəsi</h4>
                                            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200/60">Ümumi standart</span>
                                        </div>
                                        <p id="srvFormMaterialsSubhead" class="text-[11px] text-slate-400 font-normal">Xidmət üzrə standart anbar sərfiyyatı. Ustanın fərdi xəritəsi olmadıqda tətbiq olunur.</p>
                                    </div>
                                    <div id="srvFormMaterialHeaderActions" class="flex items-center gap-2">
                                        <button type="button" id="srvFormMaterialHeaderPickerBtn" onclick="BusinessDashboardView.openServiceMaterialPickerModal()" class="h-8 px-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 hidden">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                            <span id="srvFormMaterialPickerBtnLabel">Kartı dəyiş</span>
                                        </button>
                                        <button type="button" id="srvFormMaterialClearBtn" onclick="BusinessDashboardView.clearAllServiceMaterials()" class="h-8 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 font-medium text-xs transition hidden cursor-pointer" title="Texnoloji kartı təmizlə">
                                            Təmizlə
                                        </button>
                                    </div>
                                </div>

                                <!-- Attached Materials List or Clean Minimal Empty State -->
                                <div id="srvFormMaterialList" class="space-y-3">
                                    <!-- Rendered dynamically -->
                                </div>

                                <!-- Cost Summary -->
                                <div id="srvFormMaterialCostSummary" class="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between text-xs font-semibold text-slate-800 hidden">
                                    <span>Materialların cəmi maya dəyəri:</span>
                                    <span id="srvFormMaterialCostTotal" class="font-bold text-slate-900 font-mono">0.00 ₼</span>
                                </div>
                            </div>

                            <!-- TAB 6: DİLLƏR (MULTILINGUAL LOCALIZATION) -->
                            <div id="srvPane_languages" class="hidden space-y-4">
                                <div>
                                    <h4 class="font-bold text-xs text-slate-900">Çoxdillilik və Lokalizasiya</h4>
                                    <p class="text-[11px] text-slate-400 font-normal">Onlayn sifariş vidjeti və tətbiq üçün digər dillərdə tərcümələr</p>
                                </div>

                                <div class="p-3 bg-purple-50/60 border border-purple-200/70 rounded-xl text-[11px] text-purple-900 flex items-start gap-2">
                                    <svg class="w-4 h-4 text-purple-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                                    <span>Əgər hər hansı dil üzrə xüsusi tərcümə seçilməzsə, <b>«Əsas məlumatlar»</b> bölməsindəki ad və təsvir avtomatik olaraq bütün dillərdə istifadə olunacaq. Dəstəklənən dillər: <b>Azərbaycan</b>, <b>Русский</b>, <b>Türkçe</b>, <b>English</b>.</span>
                                </div>

                                <!-- Dynamic Languages Container -->
                                <div id="srvFormLanguageContainer" class="space-y-4">
                                    <!-- Rendered dynamically -->
                                </div>
                            </div>

                            <!-- TAB 7: BİLDİRİŞLƏR (NOTIFICATIONS & SMS REMINDERS) -->
                            <div id="srvPane_notifications" class="hidden space-y-4">
                                <div>
                                    <h4 class="font-bold text-xs text-slate-900">Müştəri bildirişləri və Xatırlatmalar</h4>
                                    <p class="text-[11px] text-slate-400 font-normal">Bu xidmət üzrə SMS və WhatsApp vasitəsilə göndərilən avtomatik xəbərdarlıqlar</p>
                                </div>

                                <!-- Toggle Automatic Reminder -->
                                <div class="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                                    <div class="min-w-0">
                                        <div class="font-bold text-xs text-slate-900">Avtomatik xatırlatma göndərilsin</div>
                                        <div class="text-[11px] text-slate-500 font-normal">Müştəriyə təyin olunmuş vaxtdan əvvəl SMS və WhatsApp göndərilir</div>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                        <input type="checkbox" id="srvFormNotifEnabled" checked onchange="BusinessDashboardView.toggleServiceReminderFields()" class="sr-only peer">
                                        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                                    </label>
                                </div>

                                <div id="srvFormNotifDetailsWrap" class="space-y-3.5 transition-all duration-200">
                                    <!-- Reminder Timing -->
                                    <div>
                                        <label class="block text-slate-700 font-medium mb-1.5">Xatırlatma nə vaxt göndərilsin?</label>
                                        <div class="grid grid-cols-3 gap-2">
                                            <button type="button" id="srvFormNotifTimingBtn_24h" onclick="BusinessDashboardView.selectServiceFormNotifTiming('24h')" class="h-9 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold transition flex items-center justify-center shadow-xs cursor-pointer">
                                                24 saat əvvəl
                                            </button>
                                            <button type="button" id="srvFormNotifTimingBtn_2h" onclick="BusinessDashboardView.selectServiceFormNotifTiming('2h')" class="h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer">
                                                2 saat əvvəl
                                            </button>
                                            <button type="button" id="srvFormNotifTimingBtn_1h" onclick="BusinessDashboardView.selectServiceFormNotifTiming('1h')" class="h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer">
                                                1 saat əvvəl
                                            </button>
                                        </div>
                                        <input type="hidden" id="srvFormNotifTiming" value="24h">
                                    </div>

                                    <!-- Custom SMS / WhatsApp Template -->
                                    <div>
                                        <div class="flex items-center justify-between mb-1.5">
                                            <label class="block text-slate-700 font-medium">Fərdi bildiriş mətni</label>
                                            <span class="text-[11px] text-slate-400">Dinamik teqlər mövcuddur</span>
                                        </div>
                                        <textarea id="srvFormNotifTemplate" rows="3" placeholder="Salam {müştəri}, {tarix} saat {vaxt}-da {xidmət} üçün təyin olunmuş qəbulunuzu xatırladırıq. Ünvan: {ünvan}." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                                        
                                        <!-- Dynamic Tag Chips -->
                                        <div class="flex items-center gap-1.5 mt-2 flex-wrap">
                                            <span class="text-[11px] text-slate-400">Teq əlavə et:</span>
                                            <button type="button" onclick="BusinessDashboardView.insertServiceNotifTag('{müştəri}')" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{müştəri}</button>
                                            <button type="button" onclick="BusinessDashboardView.insertServiceNotifTag('{xidmət}')" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{xidmət}</button>
                                            <button type="button" onclick="BusinessDashboardView.insertServiceNotifTag('{tarix}')" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{tarix}</button>
                                            <button type="button" onclick="BusinessDashboardView.insertServiceNotifTag('{vaxt}')" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{vaxt}</button>
                                            <button type="button" onclick="BusinessDashboardView.insertServiceNotifTag('{usta}')" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{usta}</button>
                                            <button type="button" onclick="BusinessDashboardView.insertServiceNotifTag('{ünvan}')" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{ünvan}</button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Post-service review request -->
                                <div class="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                                    <div class="min-w-0">
                                        <div class="font-bold text-xs text-slate-900">Xidmətdən sonra rəy sorğusu</div>
                                        <div class="text-[11px] text-slate-500 font-normal">Xidmət bitdikdən 2 saat sonra müştəriyə reytinq və rəy linki göndərilsin</div>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                        <input type="checkbox" id="srvFormNotifReview" checked class="sr-only peer">
                                        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                                    </label>
                                </div>

                                <!-- Repeat Visit & Correction Reminder -->
                                <div class="p-4 bg-amber-50/40 rounded-2xl border border-amber-200/70 space-y-3.5">
                                    <div class="flex items-center justify-between gap-3">
                                        <div class="min-w-0">
                                            <div class="flex items-center gap-2">
                                                <span class="font-bold text-xs text-slate-900">Təkrar ziyarət və ya Korreksiya xatırlatması</span>
                                                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FFDD2D] text-[#101114]">Faydalı</span>
                                            </div>
                                            <div class="text-[11px] text-slate-500 font-normal mt-0.5">Məsələn: 30 gündən sonra saç rənglənməsi, dırnaq korreksiyası və ya təkrar baxım üçün müştəriyə avtomatik dəvət göndərilir</div>
                                        </div>
                                        <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                            <input type="checkbox" id="srvFormNotifRepeatEnabled" onchange="BusinessDashboardView.toggleServiceRepeatNotifBlock()" class="sr-only peer">
                                            <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                                        </label>
                                    </div>

                                    <!-- Collapsible Repeat Settings Container -->
                                    <div id="srvFormNotifRepeatContainer" class="hidden space-y-3 pt-3 border-t border-amber-200/50">
                                        <div>
                                            <label class="block text-slate-700 font-medium mb-1.5 text-xs">Neçə gündən sonra göndərilsin?</label>
                                            <div class="flex items-center gap-2 flex-wrap">
                                                <button type="button" id="srvFormRepeatBtn_14" onclick="BusinessDashboardView.selectServiceRepeatNotifDays(14)" class="h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-xs hover:border-slate-900 transition cursor-pointer">
                                                    14 gün sonra
                                                </button>
                                                <button type="button" id="srvFormRepeatBtn_21" onclick="BusinessDashboardView.selectServiceRepeatNotifDays(21)" class="h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-xs hover:border-slate-900 transition cursor-pointer">
                                                    21 gün sonra
                                                </button>
                                                <button type="button" id="srvFormRepeatBtn_30" onclick="BusinessDashboardView.selectServiceRepeatNotifDays(30)" class="h-8 px-3 rounded-lg border border-slate-900 bg-slate-900 text-white font-bold text-xs transition cursor-pointer shadow-xs">
                                                    30 gün sonra
                                                </button>
                                                <button type="button" id="srvFormRepeatBtn_45" onclick="BusinessDashboardView.selectServiceRepeatNotifDays(45)" class="h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-xs hover:border-slate-900 transition cursor-pointer">
                                                    45 gün sonra
                                                </button>
                                                <button type="button" id="srvFormRepeatBtn_60" onclick="BusinessDashboardView.selectServiceRepeatNotifDays(60)" class="h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-xs hover:border-slate-900 transition cursor-pointer">
                                                    60 gün sonra
                                                </button>
                                                <div class="flex items-center gap-1.5 ml-auto">
                                                    <span class="text-xs text-slate-500 font-medium">Fərdi:</span>
                                                    <input type="number" id="srvFormNotifRepeatDays" min="1" max="365" value="30" oninput="BusinessDashboardView.onServiceRepeatDaysCustomInput(this.value)" class="w-16 h-8 px-2 text-center rounded-lg bg-white border border-slate-200 text-slate-900 font-bold text-xs outline-none focus:border-slate-900">
                                                    <span class="text-xs text-slate-500 font-medium">gün</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div class="flex items-center justify-between mb-1.5">
                                                <label class="block text-slate-700 font-medium text-xs">Korreksiya / Təkrar bildiriş mətni</label>
                                                <span class="text-[11px] text-slate-400">SMS / WhatsApp</span>
                                            </div>
                                            <textarea id="srvFormNotifRepeatTemplate" rows="3" placeholder="Salam {müştəri}, sonuncu dəfə {xidmət} qəbulumuzdan {gün} gün keçdi. Yenidən qəbula yazılmaq və ya korreksiya üçün vaxt seçin: {link}." class="w-full p-3 rounded-xl bg-white border border-amber-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition text-xs font-normal resize-none leading-relaxed"></textarea>

                                            <!-- Repeat Dynamic Tag Chips -->
                                            <div class="flex items-center gap-1.5 mt-2 flex-wrap">
                                                <span class="text-[11px] text-slate-400">Teq əlavə et:</span>
                                                <button type="button" onclick="BusinessDashboardView.insertServiceRepeatNotifTag('{müştəri}')" class="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{müştəri}</button>
                                                <button type="button" onclick="BusinessDashboardView.insertServiceRepeatNotifTag('{xidmət}')" class="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{xidmət}</button>
                                                <button type="button" onclick="BusinessDashboardView.insertServiceRepeatNotifTag('{gün}')" class="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{gün}</button>
                                                <button type="button" onclick="BusinessDashboardView.insertServiceRepeatNotifTag('{link}')" class="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{link}</button>
                                                <button type="button" onclick="BusinessDashboardView.insertServiceRepeatNotifTag('{usta}')" class="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{usta}</button>
                                                <button type="button" onclick="BusinessDashboardView.insertServiceRepeatNotifTag('{ünvan}')" class="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[10px] font-semibold transition cursor-pointer">{ünvan}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- Modal Footer Actions (Permanent on all tabs) -->
                        <div class="pt-3.5 mt-2 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateServiceModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Xidməti Saxla", type: "submit", id: "srvModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: STAFF PERSONAL TECH MAP (USTA ÜZRƏ FƏRDİ TEXNOLOJİ XƏRİTƏ)
            =========================================== -->
            <div id="bizStaffMaterialsModal" style="z-index: 9999;" onclick="if(event.target === this) BusinessDashboardView.closeStaffMaterialsModal()" class="hidden fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl w-full p-5 sm:p-6 shadow-2xl flex flex-col text-slate-800 max-h-[90vh] overflow-hidden">
                    <!-- Header -->
                    <div class="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <img id="staffMatModalAvatar" src="" class="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-200">
                            <div class="min-w-0">
                                <h3 id="staffMatModalTitle" class="font-bold text-sm text-slate-900 truncate">Fərdi texnoloji xəritə</h3>
                                <p id="staffMatModalSubtitle" class="text-[11px] text-slate-400 font-normal truncate">Usta üçün xüsusi material sərfiyyatı</p>
                            </div>
                        </div>
                        ${ZeyvoUI.closeButton({ onClick: 'BusinessDashboardView.closeStaffMaterialsModal()' })}
                    </div>

                    <!-- Body -->
                    <div class="flex-1 overflow-y-auto py-3 space-y-3.5 text-xs pr-1">
                        <input type="hidden" id="staffMatModalStaffId" value="">

                        <!-- Mode Switch -->
                        <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
                            <div class="min-w-0">
                                <div class="font-bold text-slate-900 text-xs">Fərdi material sərfiyyatı təyin edilsin</div>
                                <div class="text-[11px] text-slate-400">Aktiv edilmədikdə xidmətin ümumi materialları tətbiq olunur</div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" id="staffMatUseCustom" onchange="BusinessDashboardView.toggleStaffCustomMaterialsMode()" class="sr-only peer">
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                            </label>
                        </div>

                        <!-- Custom Materials Section (Tech Card Selection) -->
                        <div id="staffMatCustomSection" class="hidden space-y-3">
                            <!-- Search & Count -->
                            <div class="space-y-2">
                                <div class="relative">
                                    <input type="text" id="staffMatTechCardSearchInput" placeholder="Texnoloji kart adı və ya tərkib üzrə axtarış..." oninput="BusinessDashboardView.filterStaffTechCardsList()" class="w-full h-9 pl-8 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition text-xs font-medium">
                                    <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                </div>
                                <div class="flex items-center justify-between text-xs px-1">
                                    <span id="staffMatTechCardCountLabel" class="text-slate-500 font-medium text-[11px]">Mövcud texnoloji kartlar: 0</span>
                                </div>
                            </div>

                            <!-- Tech Cards Interactive List -->
                            <div id="staffMatTechCardsContainer" class="space-y-2 max-h-52 overflow-y-auto pr-0.5">
                                <!-- Populated dynamically -->
                            </div>

                            <!-- Selected Tech Card's Ingredients breakdown -->
                            <div class="space-y-1.5 pt-2 border-t border-slate-100">
                                <div class="flex items-center justify-between px-1">
                                    <span class="text-slate-700 font-semibold text-xs">Kart üzrə material sərfiyyatı:</span>
                                    <span id="staffMatIngredientsCount" class="text-[11px] text-slate-400"></span>
                                </div>
                                <div id="staffMatList" class="space-y-1.5 max-h-48 overflow-y-auto pr-0.5">
                                    <!-- Rendered dynamically -->
                                </div>
                            </div>

                            <div class="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-800">
                                <span>Bu usta üçün cəmi maya dəyəri:</span>
                                <span id="staffMatTotalCost" class="font-bold text-slate-900 font-mono text-sm">0.00 ₼</span>
                            </div>
                        </div>

                        <!-- Default Service Materials Info when disabled -->
                        <div id="staffMatDefaultSection" class="p-4 text-center rounded-2xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-900">
                            Bu usta xidmətin «Materiallar» bölməsində göstərilmiş ümumi texnoloji xəritədən və standart sərfiyyat normasından istifadə edir.
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                        ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeStaffMaterialsModal()", size: "sm", type: "button" })}
                        ${ZeyvoUI.button({ label: "Yadda saxla", onClick: "BusinessDashboardView.saveStaffMaterialsModal()", size: "sm", type: "button" })}
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: STAFF SELECTION PICKER (USTA SEÇİMİ MODALI)
            =========================================== -->
            <div id="bizStaffPickerModal" style="z-index: 9999;" onclick="if(event.target === this) BusinessDashboardView.closeStaffPickerModal()" class="hidden fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-lg w-full p-5 sm:p-6 shadow-2xl flex flex-col text-slate-800 max-h-[88vh] overflow-hidden">
                    <!-- Header -->
                    ${ZeyvoUI.modalHeader({ title: "Heyəti seçin", description: "Bu xidmət üzrə müştəri qəbul edəcək ustalar", onClose: "BusinessDashboardView.closeStaffPickerModal()" })}

                    <!-- Search & Quick Selection -->
                    <div class="pt-3 pb-2 space-y-2.5 shrink-0">
                        <div class="relative">
                            <input type="text" id="staffPickerSearchInput" placeholder="Usta adı və ya vəzifə üzrə axtarış..." oninput="BusinessDashboardView.filterStaffPickerList()" class="w-full h-9 pl-8 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition text-xs font-medium">
                            <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                        <div class="flex items-center justify-between text-xs px-1">
                            <span id="staffPickerCountLabel" class="text-slate-500 font-medium text-[11px]">Seçilib: 0 usta</span>
                            <div class="flex items-center gap-2">
                                <button type="button" onclick="BusinessDashboardView.pickerSelectAllStaff()" class="text-[11px] font-semibold text-amber-800 hover:underline cursor-pointer">
                                    Hamısını seç
                                </button>
                                <span class="text-slate-300">•</span>
                                <button type="button" onclick="BusinessDashboardView.pickerClearAllStaff()" class="text-[11px] font-semibold text-slate-400 hover:text-slate-700 cursor-pointer">
                                    Sıfırla
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Staff List -->
                    <div id="staffPickerListContainer" class="flex-1 overflow-y-auto py-1 space-y-1.5 min-h-[160px] max-h-[50vh] pr-0.5">
                        <!-- Populated dynamically -->
                    </div>

                    <!-- Footer -->
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                        ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeStaffPickerModal()", size: "sm", type: "button" })}
                        ${ZeyvoUI.button({ label: "Təsdiq et", onClick: "BusinessDashboardView.applyStaffPickerSelection()", size: "sm", type: "button" })}
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT MASTER (USTA ƏLAVƏ ET / REDAKTƏ ET)
            =========================================== -->
            <div id="bizMasterModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateMasterModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-2xl w-full p-4 sm:p-6 shadow-2xl flex flex-col text-slate-800 h-[94vh] sm:h-auto sm:max-h-[90vh] overflow-hidden">
                    <!-- Mobile drag handle -->
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    <!-- Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: 'Yeni usta əlavə et', titleId: 'masterModalTitle', description: 'Mütəxəssis profili, iş saatları, təyin olunmuş xidmətlər və komissiya', descriptionId: 'masterModalSubtitle', onClose: 'BusinessDashboardView.closeCreateMasterModal()' })}

                    <!-- Horizontal Tabs Navigation -->
                    <div class="pt-3 pb-2 shrink-0">
                        <div id="bizMasterTabsContainer">
                            <!-- Rendered dynamically -->
                        </div>
                    </div>

                    <!-- Modal Body / Form -->
                    <form id="bizMasterForm" onsubmit="BusinessDashboardView.handleSaveMaster(event)" class="flex flex-col flex-1 min-h-0 overflow-hidden pt-2 text-xs">
                        <input type="hidden" id="masterFormEditId" value="">

                        <!-- Scrollable Panes Container -->
                        <div id="bizMasterPanesScroll" class="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4">
                            <!-- TAB 1: ŞƏXSİ MƏLUMATLAR (EXACT PROFILE DESIGN) -->
                            <div id="masterPane_info" class="space-y-4">
                            <!-- Dismissed Status Banner -->
                            <div id="masterDismissedBanner" class="hidden p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200 text-xs flex items-center justify-between gap-3">
                                <div class="flex items-center gap-2.5 min-w-0">
                                    <div class="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="font-bold text-rose-900">Usta işdən azad edilib</div>
                                        <div class="text-[11px] text-rose-700 truncate" id="masterDismissedBannerText">Səbəb: —</div>
                                    </div>
                                </div>
                                <button type="button" onclick="BusinessDashboardView.openRehireMasterModal(BusinessDashboardView.editingMasterId)" class="px-3 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m19 11 2 2 4-4"/></svg>
                                    <span>Yenidən işə qəbul et</span>
                                </button>
                            </div>

                            <!-- 1. Master Identity Banner (Exact Profile Banner Style) -->
                            <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-tbank-graphite via-[#2A2B30] to-[#121316] text-white flex items-center justify-between gap-4 shadow-md border border-black/10">
                                <div class="flex items-center gap-3.5 sm:gap-4 min-w-0">
                                    <!-- Squircle Avatar with Gold Border -->
                                    <div class="relative group cursor-pointer shrink-0" onclick="document.getElementById('masterAvatarFileInput').click()" title="Foto yükləmək üçün klikləyin">
                                        <div class="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-tbank-yellow/60 flex items-center justify-center text-2xl font-black text-tbank-yellow shadow-inner overflow-hidden relative">
                                            <img id="masterFormAvatarPreview" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80" alt="Usta" class="w-full h-full object-cover">
                                            <div id="masterFormAvatarFallback" class="hidden w-full h-full flex items-center justify-center bg-white/10 text-tbank-yellow text-xl font-black">
                                                UA
                                            </div>
                                        </div>
                                        <!-- Camera badge -->
                                        <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-tbank-yellow text-tbank-graphite flex items-center justify-center shadow-md border-2 border-[#1F2024] group-hover:scale-110 transition" title="Foto dəyiş">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                                        </div>
                                        <!-- Delete button (matching regular profile exactly) -->
                                        <button id="masterFormDeleteAvatarBtn" type="button" onclick="event.stopPropagation(); BusinessDashboardView.removeMasterAvatar()" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md border-2 border-[#1F2024] transition transform hover:scale-110 cursor-pointer" title="Şəkli sil">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                        </button>
                                        <input type="file" id="masterAvatarFileInput" accept="image/*" class="hidden" onchange="BusinessDashboardView.handleMasterAvatarFileUpload(event)">
                                    </div>

                                    <div class="min-w-0">
                                        <div class="flex items-center gap-1.5 flex-wrap">
                                            <h4 id="masterCardDisplayName" class="text-base sm:text-lg font-bold tracking-tight leading-tight truncate text-white">Usta adı</h4>
                                            <span id="masterCardGenderBadge" class="text-[10px] font-black px-1.5 py-0.2 rounded bg-blue-500/80 text-white shrink-0">Kişi</span>
                                        </div>
                                        <p id="masterCardDisplayRole" class="text-xs text-amber-300 font-semibold truncate mt-0.5">Top Stilist</p>
                                        <p id="masterCardDisplayPhone" class="text-[11px] text-slate-400 font-medium truncate mt-0.5">+994 50 000-00-00</p>
                                    </div>
                                </div>

                            </div>

                            <input type="hidden" id="masterFormAvatar" value="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80">

                            <!-- 2. Gender Selection (Cins - Exact Profile Style) -->
                            <div>
                                <label class="block text-xs font-bold text-slate-500 mb-1.5">Cins</label>
                                <div class="grid grid-cols-2 gap-2 sm:max-w-xs">
                                    <button type="button" id="masterGenderBtnFemale" onclick="BusinessDashboardView.selectMasterGender('female')" class="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100 cursor-pointer">
                                        <span>Qadın</span>
                                    </button>
                                    <button type="button" id="masterGenderBtnMale" onclick="BusinessDashboardView.selectMasterGender('male')" class="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100 cursor-pointer">
                                        <span>Kişi</span>
                                    </button>
                                </div>
                                <input type="hidden" id="masterFormGender" value="male">
                            </div>

                            <!-- 3. Name & Role -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">Ad və Soyad *</label>
                                    <input type="text" id="masterFormName" required oninput="BusinessDashboardView.onMasterNameInput(this.value)" placeholder="Məsələn: Samir Əliyev" class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition">
                                </div>
                                <div>
                                    <div class="flex items-center justify-between mb-1">
                                        <label class="block text-xs font-bold text-slate-500">Vəzifə / Peşə *</label>
                                        <button type="button" onclick="BusinessDashboardView.openMasterRolesModal()" class="text-[11px] text-amber-600 hover:text-amber-700 font-bold transition flex items-center gap-1 cursor-pointer" title="Vəzifələri idarə et və ya yenisini yarat">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                                            <span>Vəzifələri idarə et</span>
                                        </button>
                                    </div>
                                    <select id="masterFormRole" required onchange="BusinessDashboardView.onMasterRoleSelect(this.value)" class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition cursor-pointer">
                                    </select>
                                </div>
                            </div>

                            <!-- 4. Specialization & Status -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">İxtisaslaşma sahəsi</label>
                                    <input type="text" id="masterFormSpec" placeholder="Məsələn: Saç kəsimi, AirTouch, Shellac" class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">Status</label>
                                    <select id="masterFormStatus" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition cursor-pointer">
                                        <option value="active">Aktiv (İşdə və qəbulda)</option>
                                        <option value="vacation">Məzuniyyətdə / Xəstəlikdə</option>
                                        <option value="inactive">Qeyri-aktiv (Müvəqqəti dayandırılıb)</option>
                                        <option value="dismissed">İşdən azad edilib</option>
                                    </select>
                                </div>
                            </div>

                            <!-- 5. Phone & Email (Exact Profile Phone Style) -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">Mobil nömrə *</label>
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
                                        <input id="masterFormPhone" type="tel" maxlength="15" placeholder="(50) 000-00-00" oninput="BusinessDashboardView.onMasterPhoneInput(this.value); if(App.formatAzPhone) App.formatAzPhone(this);" class="w-full h-full px-3 bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">E-poçt ünvanı</label>
                                    <input type="email" id="masterFormEmail" placeholder="usta@zeyvo.az" class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition">
                                </div>
                            </div>

                            <!-- 6. Calendar Color Selector -->
                            <div class="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
                                <div class="flex items-center justify-between">
                                    <label class="block text-xs font-bold text-slate-700">Təqvimdə rəng kodu</label>
                                    <span class="text-[11px] text-slate-400 font-medium">Jurnalda ustanın qəbullarını fərqləndirmək üçün</span>
                                </div>
                                <input type="hidden" id="masterFormColor" value="#FFDD2D">
                                <div class="flex items-center gap-2.5 flex-wrap" id="masterColorSwatchesContainer">
                                    <!-- Rendered dynamically -->
                                </div>
                            </div>

                            <!-- 7. Bio / Notes -->
                            <div>
                                <label class="block text-xs font-bold text-slate-500 mb-1">Usta haqqında bio və təcrübə</label>
                                <textarea id="masterFormBio" rows="2.5" placeholder="Təhsil, sertifikatlar, təcrübə illəri və ustalığın əsas istiqamətləri..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-normal text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition resize-none leading-relaxed"></textarea>
                            </div>
                        </div>

                        <!-- TAB 2: ONLAYN QƏBUL -->
                        <div id="masterPane_online" class="hidden space-y-4">
                            <!-- Toggle Online Booking -->
                            <div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
                                <div>
                                    <div class="font-bold text-xs text-slate-900">Onlayn sifarişə icazə verilsin</div>
                                    <div class="text-[11px] text-slate-400 font-normal">Müştərilər veb-sayt və tətbiqdən bu ustanı seçərək qəbula yazıla bilsinlər</div>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                    <input type="checkbox" id="masterFormOnlineBooking" class="sr-only peer" checked>
                                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                                </label>
                            </div>

                            <!-- Ratings & Reviews Display (Read-only real customer metrics) -->
                            <div class="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                        <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        Müştəri reytinqi və rəylər
                                    </span>
                                    <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200/80 shadow-2xs">
                                        <svg class="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                        Real müştəri rəyləri
                                    </span>
                                </div>

                                <div class="grid grid-cols-2 gap-3">
                                    <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                                        <div class="text-[11px] text-slate-400 font-semibold mb-1">Cari reytinq balı</div>
                                        <div class="flex items-baseline gap-1.5">
                                            <span class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1">
                                                <svg class="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                                <span id="masterFormRatingDisplay">5.0</span>
                                            </span>
                                            <span class="text-[11px] text-slate-400 font-medium">/ 5.0</span>
                                        </div>
                                    </div>

                                    <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                                        <div class="text-[11px] text-slate-400 font-semibold mb-1">Rəy sayı</div>
                                        <div class="flex items-baseline gap-1.5">
                                            <span class="text-2xl font-black text-slate-900 tracking-tight" id="masterFormReviewsDisplay">0</span>
                                            <span class="text-[11px] text-slate-400 font-medium">müştəri rəyi</span>
                                        </div>
                                    </div>
                                </div>

                                <p class="text-[11px] text-slate-400 font-normal leading-relaxed">
                                    Bu göstəricilər qəbulda olmuş real müştərilərin rəyləri əsasında avtomatik formalaşır və əl ilə dəyişdirilə bilməz.
                                </p>

                                <input type="hidden" id="masterFormRating" value="5.00">
                                <input type="hidden" id="masterFormReviewsCount" value="0">
                            </div>

                            <!-- Client Advice Note -->
                            <div>
                                <label class="block text-slate-700 font-bold mb-1">Müştəriyə onlayn tövsiyə və ya qeyd</label>
                                <textarea id="masterFormOnlineNote" rows="2" placeholder="Məsələn: Rəngləmə prosedurları öncəsi saçın 1 gün əvvəl yuyulması tövsiyə olunur..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition text-xs font-normal resize-none leading-relaxed"></textarea>
                            </div>

                            <!-- Customer Reviews & Comments History -->
                            <div class="space-y-3 pt-3 border-t border-slate-100">
                                <div>
                                    <h4 class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                                        <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                        <span>Müştəri rəyləri və cavablar</span>
                                        <span id="masterReviewsCountHeaderBadge" class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">0 rəy</span>
                                    </h4>
                                    <p class="text-[11px] text-slate-400 font-normal">Müştərilərin şərhlərinə baxın və birbaşa salondan rəsmi cavab yazın</p>
                                </div>

                                <!-- Reviews List Container -->
                                <div id="masterReviewsListContainer" class="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                                    <!-- Populated dynamically by renderMasterReviewsList() -->
                                </div>
                            </div>
                        </div>

                        <!-- TAB 3: TƏYİN OLUNMUŞ XİDMƏTLƏR & FƏRDİ QİYMƏT -->
                        <div id="masterPane_services" class="hidden space-y-3.5">
                            <div class="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
                                <div>
                                    <h4 class="font-bold text-xs text-slate-900">Ustanın göstərdiyi xidmətlər</h4>
                                    <p class="text-[11px] text-slate-400 font-normal">Xidmət təyinatları «Xidmətlər» bölməsindən idarə olunur</p>
                                </div>
                                <button type="button" onclick="BusinessDashboardView.navigateToServicesFromMasterModal()" class="h-8 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs">
                                    <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                    <span>Xidmətlər bölməsi</span>
                                </button>
                            </div>

                            <!-- Helpful Guidance Banner -->
                            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
                                <svg class="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
                                <div class="text-[11px] leading-relaxed">
                                    Bu ustaya yeni xidmət təyin etmək və ya mövcud xidmətlərdən çıxarmaq üçün <b>Xidmətlər</b> bölməsində müvafiq xidmətin daxilində heyət siyahısından ustanı seçin.
                                </div>
                            </div>

                            <!-- Service Search Filter -->
                            <div class="relative">
                                <input type="text" id="masterServiceSearchInput" oninput="BusinessDashboardView.filterMasterModalServices(this.value)" placeholder="Təyin olunmuş xidmətlər üzrə axtarış..." class="w-full h-9 pl-8 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition text-xs font-medium">
                                <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </div>

                            <!-- Services List Container -->
                            <div id="masterModalServicesListContainer" class="space-y-3 max-h-[46vh] overflow-y-auto pr-1">
                                <!-- Populated dynamically -->
                            </div>
                        </div>

                        <!-- TAB 4: İŞ QRAFİKİ VƏ SAATLAR -->
                        <div id="masterPane_schedule" class="hidden space-y-4">
                            <!-- Sub-tabs navigation: Weekly base vs Date exceptions -->
                            <div class="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                                <button type="button" id="masterScheduleSubTab_base" onclick="BusinessDashboardView.switchMasterScheduleSubTab('base')" class="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 bg-white text-slate-900 shadow-xs cursor-pointer">
                                    <svg class="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                                    <span>Həftəlik baza qrafik</span>
                                </button>
                                <button type="button" id="masterScheduleSubTab_exceptions" onclick="BusinessDashboardView.switchMasterScheduleSubTab('exceptions')" class="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900 transition flex items-center justify-center gap-1.5 cursor-pointer">
                                    <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
                                    <span>Xüsusi tarixlər və istisnalar</span>
                                    <span id="masterScheduleExceptionsCountBadge" class="hidden ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-[#FFDD2D] text-[#101114] font-black">0</span>
                                </button>
                            </div>

                            <!-- SUB-PANE 1: HƏFTƏLİK BAZA QRAFİK -->
                            <div id="masterSchedulePane_base" class="space-y-3.5">
                                <!-- Direct Exception / Day Off Entry Banner -->
                                <div class="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div class="flex items-center gap-2.5 min-w-0">
                                        <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><circle cx="12" cy="14" r="2"/></svg>
                                        </div>
                                        <div class="min-w-0">
                                            <div class="text-xs font-bold text-slate-900">Konkret tarixdə istirahət günü və ya fərdi saatlar?</div>
                                            <div class="text-[11px] text-slate-500 font-normal">Məsələn: gələn həftə cümə günü işləmir və ya qısaldılmış saatlarla çıxır</div>
                                        </div>
                                    </div>
                                    <button type="button" onclick="BusinessDashboardView.openAddExceptionDirect()" class="h-8 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer shrink-0 active:scale-95">
                                        <span class="text-xs font-bold">+</span>
                                        <span>Tarix qeyd et</span>
                                    </button>
                                </div>

                                <!-- Preset Buttons -->
                                <div class="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-2 flex-wrap">
                                    <span class="text-xs font-bold text-slate-800">Hazır cədvəl şablonları:</span>
                                    <div class="flex items-center gap-1.5 flex-wrap">
                                        <button type="button" onclick="BusinessDashboardView.applyMasterSchedulePreset('5_2')" class="h-7 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-semibold transition cursor-pointer">5/2 (09:00 - 18:00)</button>
                                        <button type="button" onclick="BusinessDashboardView.applyMasterSchedulePreset('6_1')" class="h-7 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-semibold transition cursor-pointer">6/1 (10:00 - 19:00)</button>
                                        <button type="button" onclick="BusinessDashboardView.applyMasterSchedulePreset('all')" class="h-7 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-semibold transition cursor-pointer">Bütün günlər</button>
                                    </div>
                                </div>

                                <!-- Active Exceptions Notice on Base Schedule -->
                                <div id="masterActiveExceptionsNoticeBox" class="hidden p-3 bg-rose-50/60 border border-rose-200/70 rounded-2xl space-y-1.5">
                                    <div class="flex items-center justify-between">
                                        <span class="text-[11px] font-bold text-rose-900 flex items-center gap-1.5">
                                            <svg class="w-3.5 h-3.5 text-rose-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
                                            <span>Təyin edilmiş xüsusi tarixlər və istirahət günləri:</span>
                                        </span>
                                        <button type="button" onclick="BusinessDashboardView.switchMasterScheduleSubTab('exceptions')" class="text-[11px] font-bold text-slate-800 hover:text-slate-900 underline cursor-pointer">Hamısına bax →</button>
                                    </div>
                                    <div id="masterActiveExceptionsNoticeList" class="flex flex-wrap gap-1.5">
                                        <!-- Mini badges populated dynamically -->
                                    </div>
                                </div>

                                <!-- Days Table -->
                                <div class="space-y-2" id="masterScheduleDaysContainer">
                                    <!-- Rendered dynamically for Mon - Sun -->
                                </div>
                            </div>

                            <!-- SUB-PANE 2: XÜSUSİ TARİXLƏR VƏ İSTİSNALAR -->
                            <div id="masterSchedulePane_exceptions" class="hidden space-y-3.5">
                                <div class="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
                                    <div>
                                        <h4 class="font-bold text-xs text-slate-900">Tarix üzrə fərdi qrafik və qeyri-iş günləri</h4>
                                        <p class="text-[11px] text-slate-400 font-normal">Müəyyən tarixdə istirahət günü (işləmir) və ya qısaldılmış saatlar təyin edin</p>
                                    </div>
                                    <button type="button" onclick="BusinessDashboardView.toggleMasterExceptionForm(true)" class="h-8 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95">
                                        <span class="text-xs">+</span>
                                        <span>Tarix əlavə et</span>
                                    </button>
                                </div>

                                <!-- Add / Edit Exception Form (Collapsible) -->
                                <div id="masterExceptionFormBox" class="hidden p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 shadow-2xs space-y-3">
                                    <div class="flex items-center justify-between text-xs font-bold text-slate-900">
                                        <span>Xüsusi tarix təyin et</span>
                                        <button type="button" onclick="BusinessDashboardView.toggleMasterExceptionForm(false)" class="text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕</button>
                                    </div>

                                    <!-- Date input + Quick chips -->
                                    <div class="space-y-1.5">
                                        <div class="flex items-center justify-between gap-2">
                                            <label class="block text-[11px] font-bold text-slate-700">Tarix *</label>
                                            <div class="flex items-center gap-1 flex-wrap">
                                                <button type="button" onclick="BusinessDashboardView.setMasterExceptionQuickDate('tomorrow')" class="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200 cursor-pointer">Sabah</button>
                                                <button type="button" onclick="BusinessDashboardView.setMasterExceptionQuickDate('next_friday')" class="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200 cursor-pointer">Gələn cümə</button>
                                                <button type="button" onclick="BusinessDashboardView.setMasterExceptionQuickDate('next_saturday')" class="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200 cursor-pointer">Gələn şənbə</button>
                                            </div>
                                        </div>
                                        <div class="relative" id="masterExceptionDateWrapper">
                                            <input type="hidden" id="masterExceptionDate" value="">
                                            <button type="button" id="masterExceptionDateDisplay" onclick="BusinessDashboardView.toggleCustomDatePicker('masterExceptionDate', event)" class="w-full h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-slate-900 transition font-bold text-xs flex items-center justify-between cursor-pointer text-left shadow-2xs">
                                                <span id="masterExceptionDateText" class="text-slate-900 font-bold truncate">Tarix seçin</span>
                                                <svg class="w-4 h-4 text-slate-400 shrink-0 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                            </button>
                                            <div id="masterExceptionDateDropdown" onclick="event.stopPropagation()" class="hidden absolute top-full left-0 mt-1.5 z-50 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200 shadow-2xl p-3.5 space-y-3"></div>
                                        </div>
                                    </div>

                                    <!-- Mode selection: Day Off vs Custom Hours -->
                                    <div class="space-y-1.5">
                                        <label class="block text-[11px] font-bold text-slate-700">Günün rejimi *</label>
                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <div onclick="BusinessDashboardView.setMasterExceptionMode('off')" id="exceptionModeBtn_off" class="p-2.5 rounded-xl border-2 border-slate-900 bg-white flex items-center gap-2.5 cursor-pointer transition select-none">
                                                <span class="w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center shrink-0">
                                                    <span id="exceptionDot_off" class="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                                                </span>
                                                <div>
                                                    <div class="text-xs font-bold text-slate-900">İstirahət günü (İşləmir)</div>
                                                    <div class="text-[10px] text-slate-400 font-normal">Bu tarixdə tam istirahət edir</div>
                                                </div>
                                            </div>
                                            <div onclick="BusinessDashboardView.setMasterExceptionMode('custom')" id="exceptionModeBtn_custom" class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2.5 cursor-pointer transition select-none">
                                                <span class="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0">
                                                    <span id="exceptionDot_custom" class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                                                </span>
                                                <div>
                                                    <div class="text-xs font-bold text-slate-900">Fərdi / Qısaldılmış saatlar</div>
                                                    <div class="text-[10px] text-slate-400 font-normal">Növbə saatlarını fərdi daxil edin</div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="hidden" id="masterExceptionType" value="off">
                                    </div>

                                    <!-- Custom shift hours container (hidden if off) -->
                                    <div id="masterExceptionCustomHoursContainer" class="hidden grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white/80 rounded-xl border border-amber-200/60">
                                        <div>
                                            <label class="block text-[10px] font-bold text-slate-500 mb-1">İşə başlama saatı</label>
                                            <input type="text" id="masterExceptionStart" value="10:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, 'masterExceptionStart', 'input', this.value)" readonly class="w-full h-8 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 text-center cursor-pointer">
                                        </div>
                                        <div>
                                            <label class="block text-[10px] font-bold text-slate-500 mb-1">İşin bitmə saatı</label>
                                            <input type="text" id="masterExceptionEnd" value="15:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, 'masterExceptionEnd', 'input', this.value)" readonly class="w-full h-8 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 text-center cursor-pointer">
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-[11px] font-bold text-slate-700 mb-1">Səbəb və ya qeyd (İstəyə görə)</label>
                                        <input type="text" id="masterExceptionNote" placeholder="Məsələn: Təlim, Şəxsi səbəb, Məzuniyyət və s." class="w-full h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 outline-none focus:border-slate-900 placeholder:text-slate-400">
                                    </div>

                                    <div class="flex justify-end gap-2 pt-1 border-t border-amber-200/50">
                                        ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.toggleMasterExceptionForm(false)", size: "sm", type: "button" })}
                                        ${ZeyvoUI.button({ label: "Yadda saxla", onClick: "BusinessDashboardView.saveMasterException()", size: "sm", type: "button" })}
                                    </div>
                                </div>

                                <!-- Exceptions List Container -->
                                <div id="masterScheduleExceptionsList" class="space-y-2">
                                    <!-- Populated dynamically -->
                                </div>
                            </div>
                        </div>

                        <!-- TAB 5: ƏMƏKHAQQI VƏ KOMİSSİYA -->
                        <div id="masterPane_salary" class="hidden space-y-4">
                            <div class="p-3 bg-amber-50/60 border border-amber-200/70 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                                <svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                                <span>Bu parametr maliyyə və əməkhaqqı hesabatında ustanın qazancını avtomatik hesablamaq üçün tətbiq edilir.</span>
                            </div>

                            <div class="space-y-3">
                                <div>
                                    <label class="block text-slate-700 font-bold mb-1">Hesablama sxemi</label>
                                    <select id="masterFormSalaryType" onchange="BusinessDashboardView.onMasterSalarySchemeChange(this.value)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold outline-none focus:border-slate-900 focus:bg-white transition cursor-pointer">
                                        <option value="commission">Xalis faiz (Xidmət və məhsul satışından %)</option>
                                        <option value="fixed_plus_commission">Sabit baza maaş + Komissiya faizi</option>
                                        <option value="fixed">Yalnız sabit aylıq əməkhaqqı</option>
                                        <option value="booth_rental">Kreslo / Otaq icarəsi (Usta salona icarə haqqı ödəyir)</option>
                                    </select>
                                </div>

                                <div id="masterSalaryCommissionFields" class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 transition-all">
                                    <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                                        <label class="block text-slate-700 font-bold text-xs">Xidmətlərdən faiz (%)</label>
                                        <div class="flex items-center gap-2">
                                            <input type="number" id="masterFormServiceCommission" min="0" max="100" value="40" placeholder="40" class="flex-1 h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-center font-bold text-sm outline-none focus:border-slate-900">
                                            <span class="text-sm font-bold text-slate-600">%</span>
                                        </div>
                                    </div>
                                    <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                                        <label class="block text-slate-700 font-bold text-xs">Məhsul satışından faiz (%)</label>
                                        <div class="flex items-center gap-2">
                                            <input type="number" id="masterFormProductCommission" min="0" max="100" value="10" placeholder="10" class="flex-1 h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-center font-bold text-sm outline-none focus:border-slate-900">
                                            <span class="text-sm font-bold text-slate-600">%</span>
                                        </div>
                                    </div>
                                </div>

                                <div id="masterSalaryFixedField" class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 transition-all">
                                    <label class="block text-slate-700 font-bold text-xs">Sabit baza əməkhaqqı (₼)</label>
                                    <div class="flex items-center gap-2">
                                        <input type="number" id="masterFormFixedSalary" min="0" step="10" value="0" placeholder="0" class="flex-1 h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm outline-none focus:border-slate-900">
                                        <span class="text-sm font-bold text-slate-600">₼ / ay</span>
                                    </div>
                                </div>

                                <!-- Booth / Chair Rental Container -->
                                <div id="masterSalaryRentalFields" class="hidden space-y-3.5 transition-all">
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                                            <label class="block text-slate-700 font-bold text-xs">İcarə növü</label>
                                            <select id="masterFormRentalType" onchange="BusinessDashboardView.onMasterRentalTypeChange(this.value)" class="w-full h-9 px-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-bold outline-none focus:border-slate-900 cursor-pointer">
                                                <option value="monthly">Aylıq sabit icarə haqqı</option>
                                                <option value="daily">Günlük icarə (iş günlərinə görə)</option>
                                            </select>
                                        </div>
                                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                                            <label id="masterFormRentalAmountLabel" class="block text-slate-700 font-bold text-xs">Aylıq icarə haqqı (₼)</label>
                                            <div class="flex items-center gap-2">
                                                <input type="number" id="masterFormRentalAmount" min="0" step="5" value="300" placeholder="300" class="flex-1 h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm text-center outline-none focus:border-slate-900">
                                                <span id="masterFormRentalUnitText" class="text-sm font-bold text-slate-600">₼ / ay</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                                            <div class="flex items-center justify-between">
                                                <label class="block text-slate-700 font-bold text-xs">Salon məhsullarından faiz (%)</label>
                                                <span class="text-[10px] text-slate-400">İstəyə görə</span>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <input type="number" id="masterFormRentalProductComm" min="0" max="100" value="10" placeholder="10" class="flex-1 h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm text-center outline-none focus:border-slate-900">
                                                <span class="text-sm font-bold text-slate-600">%</span>
                                            </div>
                                        </div>
                                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                                            <div class="flex items-center justify-between">
                                                <label class="block text-slate-700 font-bold text-xs">Kassa / Bank komissiyası (%)</label>
                                                <span class="text-[10px] text-slate-400">POS ödənişlər</span>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <input type="number" id="masterFormRentalCardComm" min="0" max="100" value="0" placeholder="0" class="flex-1 h-9 px-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm text-center outline-none focus:border-slate-900">
                                                <span class="text-sm font-bold text-slate-600">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="masterSalarySchemeHint" class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                                    <svg class="w-4 h-4 text-slate-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                                    <span id="masterSalarySchemeHintText">Ustanın qazancı yalnız faktiki yerinə yetirdiyi xidmətlərin və satdığı məhsulların faizi əsasında hesablanır. Sabit baza maaşı tətbiq edilmir.</span>
                                </div>
                            </div>
                        </div>

                        <!-- TAB 6: İCAZƏLƏR & DƏVƏT -->
                        <div id="masterPane_permissions" class="hidden space-y-3.5">
                            <input type="hidden" id="masterFormRolePermission" value="specialist">

                            <!-- Modern Role Selector -->
                            <div class="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2.5">
                                <div class="flex items-center justify-between">
                                    <span class="text-xs font-bold text-slate-800">Sistemdə rolu və hüquqlar</span>
                                    <span id="masterRoleBadgeStatus" class="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold">Usta</span>
                                </div>

                                <!-- Segmented Role Pills -->
                                <div class="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-slate-200/60 rounded-xl" id="masterRolePillGroup">
                                    <button type="button" onclick="BusinessDashboardView.selectMasterRoleTemplate('specialist')" id="roleCard_specialist" class="py-2 px-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 bg-white text-slate-900 shadow-xs cursor-pointer">
                                        <span>Usta</span>
                                    </button>
                                    <button type="button" onclick="BusinessDashboardView.selectMasterRoleTemplate('senior')" id="roleCard_senior" class="py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5 cursor-pointer">
                                        <span>Baş Usta</span>
                                    </button>
                                    <button type="button" onclick="BusinessDashboardView.selectMasterRoleTemplate('manager')" id="roleCard_manager" class="py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5 cursor-pointer">
                                        <span>Administrator</span>
                                    </button>
                                    <button type="button" onclick="BusinessDashboardView.selectMasterRoleTemplate('owner')" id="roleCard_owner" class="py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5 cursor-pointer">
                                        <span>Tam İcazə</span>
                                    </button>
                                    <button type="button" onclick="BusinessDashboardView.selectMasterRoleTemplate('custom')" id="roleCard_custom" class="py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5 cursor-pointer col-span-2 sm:col-span-1">
                                        <span>Fərdi</span>
                                    </button>
                                </div>

                                <div class="flex items-center gap-2 pt-0.5">
                                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                                    <p id="masterRoleDescriptionText" class="text-[11px] text-slate-500 font-normal">
                                        Yalnız öz təqvimi, iş qrafiki və təyin olunmuş müştəriləri idarə edir.
                                    </p>
                                </div>
                            </div>

                            <!-- Granular Permissions Details Box -->
                            <div class="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                                    <span class="text-xs font-bold text-slate-900">Dəqiq icazələrin siyahısı</span>
                                    <span class="text-[11px] text-slate-400 font-normal">İstənilən bəndi fərdi dəyişə bilərsiniz</span>
                                </div>

                                <!-- Group 1: Qrafik və Təqvim -->
                                <div class="space-y-1">
                                    <div class="text-[10px] font-bold text-slate-400">Təqvim və Qrafik</div>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canViewAllCalendar" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">Bütün salon təqviminə baxış</span>
                                        </label>
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canEditOthersBookings" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">Başqalarının qəbullarını redaktə etmək</span>
                                        </label>
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canManageSchedule" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">İş qrafikini və saatları dəyişmək</span>
                                        </label>
                                    </div>
                                </div>

                                <!-- Group 2: Müştərilər və Əlaqə -->
                                <div class="pt-2 border-t border-slate-100 space-y-1">
                                    <div class="text-[10px] font-bold text-slate-400">Müştərilər və Əlaqə</div>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canViewClientContacts" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">Müştəri telefon nömrələrini görmək</span>
                                        </label>
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canExportClients" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">Müştəri bazasını yükləmək (Excel / CSV)</span>
                                        </label>
                                    </div>
                                </div>

                                <!-- Group 3: Kassa və Maliyyə -->
                                <div class="pt-2 border-t border-slate-100 space-y-1">
                                    <div class="text-[10px] font-bold text-slate-400">Kassa və Maliyyə</div>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canCollectPayment" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">Kassa və ödənişləri qəbul etmək</span>
                                        </label>
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canApplyDiscounts" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">Fərdi endirim və promokod tətbiqi</span>
                                        </label>
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canViewRevenue" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">Salonun gəlir və kassa hesabatları</span>
                                        </label>
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canViewStaffSalaries" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">Digər ustaların maaşlarına baxış</span>
                                        </label>
                                    </div>
                                </div>

                                <!-- Group 4: Kataloq və Anbar -->
                                <div class="pt-2 border-t border-slate-100 space-y-1">
                                    <div class="text-[10px] font-bold text-slate-400">Kataloq və Anbar</div>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canManageServices" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">Xidmətlər kataloqunu idarə etmək</span>
                                        </label>
                                        <label class="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none">
                                            <input type="checkbox" id="perm_canManageInventory" onchange="BusinessDashboardView.onMasterCustomPermissionChange()" class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                                            <span class="text-xs text-slate-800 font-medium">Anbar və material qalıqlarını idarə etmək</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Mobile App Invitation Box -->
                            <div class="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                <div>
                                    <div class="font-bold text-xs text-slate-900">Zeyvo Usta mobil tətbiqi</div>
                                    <p class="text-[11px] text-slate-400 font-normal">Ustanın öz smartfonundan qrafikinə baxması üçün dəvət göndərin</p>
                                </div>
                                <div class="flex items-center gap-2 shrink-0">
                                    <button type="button" onclick="BusinessDashboardView.copyMasterInviteLink()" class="h-8 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs">
                                        <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                        <span>Linki kopyala</span>
                                    </button>
                                    <button type="button" onclick="BusinessDashboardView.sendMasterWhatsAppInvite()" class="h-8 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                                        <span>WhatsApp</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        </div>

                        <!-- Modal Bottom Actions (Permanent pinned footer) -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 shrink-0 bg-white">
                            <div class="flex items-center gap-1.5 flex-wrap">
                                <button type="button" id="masterFormDeleteBtn" onclick="BusinessDashboardView.onCurrentMasterDeleteClick()" class="hidden px-2.5 py-1.5 rounded-xl text-rose-500 hover:bg-rose-50 font-semibold text-xs transition cursor-pointer">
                                    Sil
                                </button>
                                <button type="button" id="masterFormDismissBtn" onclick="BusinessDashboardView.openDismissMasterModal(BusinessDashboardView.editingMasterId)" class="hidden px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
                                    <span>İşdən azad et</span>
                                </button>
                                <button type="button" id="masterFormRehireBtn" onclick="BusinessDashboardView.openRehireMasterModal(BusinessDashboardView.editingMasterId)" class="hidden px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m19 11 2 2 4-4"/></svg>
                                    <span>İşə bərpa et</span>
                                </button>
                            </div>
                            <div class="flex items-center gap-2">
                                ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateMasterModal()", size: "md", type: "button" })}
                                ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: MASTER SCHEDULE OVERVIEW (ÜMUMİ İŞ QRAFİKİ)
            =========================================== -->
            <div id="bizMasterScheduleModal" onclick="if(event.target === this) BusinessDashboardView.closeMasterScheduleOverviewModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-4xl w-full p-4 sm:p-6 shadow-2xl flex flex-col text-slate-800 h-[92vh] sm:h-auto sm:max-h-[90vh] overflow-hidden">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    <!-- Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: "Heyətin Həftəlik İş Qrafiki", description: "Bütün ustaların həftəlik növbə saatları və istirahət günləri icmalı", onClose: "BusinessDashboardView.closeMasterScheduleOverviewModal()" })}

                    <!-- Matrix Schedule Table Container -->
                    <div class="py-4 overflow-x-auto flex-1 min-h-0">
                        <div id="masterScheduleMatrixContainer">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
                        <span class="text-xs text-slate-400 font-medium">Ustanın qrafikini dəyişmək üçün adının yanındakı qələm ikonuna klikləyin</span>
                        <button type="button" onclick="BusinessDashboardView.closeMasterScheduleOverviewModal()" class="px-5 h-9 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition text-xs shadow-xs cursor-pointer">
                            Bağla
                        </button>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT MASTER ROLE (VƏZİFƏ YARAT / REDAKTƏ ET)
            =========================================== -->
            <div id="bizMasterRoleEditModal" onclick="if(event.target === this) BusinessDashboardView.closeCreateMasterRoleModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800">
                    <!-- Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: "Yeni vəzifə yarat", titleId: "masterRoleModalTitle", description: "Vəzifə adı, standart komissiya və məsuliyyət təsviri", onClose: "BusinessDashboardView.closeCreateMasterRoleModal()" })}

                    <!-- Modal Body Form -->
                    <form onsubmit="BusinessDashboardView.handleSaveMasterRole(event)" class="pt-4 space-y-4">
                        <input type="hidden" id="masterRoleFormEditId" value="">

                        <!-- Hidden Icon Input -->
                        <input type="hidden" id="masterRoleFormIcon" value="briefcase">

                        <!-- Role Name -->
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">Vəzifə adı *</label>
                            <input type="text" id="masterRoleFormName" required placeholder="Vəzifə və ya ixtisas adını daxil edin (məs: Administrator, Stilist, Kosmetoloq, Baş mütəxəssis...)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-tbank-yellow/40 outline-none transition">
                        </div>

                        <!-- Commission -->
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">Standart xidmət komissiyası (%)</label>
                            <div class="flex items-center h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:bg-white focus-within:border-slate-900 transition">
                                <input type="number" id="masterRoleFormCommission" min="0" max="100" value="40" required class="w-full text-xs font-bold text-slate-900 outline-none bg-transparent">
                                <span class="text-xs font-bold text-slate-400 shrink-0">%</span>
                            </div>
                            <p class="text-[11px] text-slate-400 mt-1">Bu vəzifədə olan ustalar üçün ilkin təklif edilən komissiya faizi</p>
                        </div>

                        <!-- Description -->
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">Qısa təsvir və qeydlər</label>
                            <textarea id="masterRoleFormDesc" rows="3" placeholder="Vəzifə öhdəlikləri, tələb olunan təcrübə və ixtisas qeydləri..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 outline-none transition resize-none"></textarea>
                        </div>

                        <!-- Footer Buttons -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCreateMasterRoleModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Vəzifəni saxla", type: "submit", id: "masterRoleModalSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: STAFF / MASTER FILTERS (USTA VƏ HEYƏT FİLTRLƏRİ)
            =========================================== -->
            <div id="bizStaffFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeStaffFilterModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-md w-full p-5 sm:p-7 shadow-2xl space-y-4 text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    <!-- Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: "Heyət və Usta filtrləri", description: "Vəzifə, iş statusu, növbə və onlayn qəbul üzrə seçim", onClose: "BusinessDashboardView.closeStaffFilterModal()" })}

                    <!-- Filter Controls -->
                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Role Select -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-medium">Vəzifə və ixtisas</label>
                            <select id="staffFilterModalRole" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition cursor-pointer">
                            </select>
                        </div>

                        <!-- 2. Status Segmented Buttons -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">İş statusu</label>
                            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                <button type="button" id="staffFilterStatusBtn_all" onclick="BusinessDashboardView.selectStaffFilterStatus('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="staffFilterStatusBtn_active" onclick="BusinessDashboardView.selectStaffFilterStatus('active')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold text-emerald-700">Aktiv</span>
                                </button>
                                <button type="button" id="staffFilterStatusBtn_vacation" onclick="BusinessDashboardView.selectStaffFilterStatus('vacation')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold text-amber-700">Məzuniyyət</span>
                                </button>
                                <button type="button" id="staffFilterStatusBtn_inactive" onclick="BusinessDashboardView.selectStaffFilterStatus('inactive')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold text-slate-500">Qeyri-aktiv</span>
                                </button>
                                <button type="button" id="staffFilterStatusBtn_dismissed" onclick="BusinessDashboardView.selectStaffFilterStatus('dismissed')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold text-rose-700">İşdən azad</span>
                                </button>
                            </div>
                        </div>

                        <!-- 3. Today Shift Segmented Buttons -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Bugünkü növbə</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="staffFilterShiftBtn_all" onclick="BusinessDashboardView.selectStaffFilterShift('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="staffFilterShiftBtn_working" onclick="BusinessDashboardView.selectStaffFilterShift('working')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold text-emerald-700">Növbədə olan</span>
                                </button>
                                <button type="button" id="staffFilterShiftBtn_off" onclick="BusinessDashboardView.selectStaffFilterShift('off')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold text-slate-500">İstirahət</span>
                                </button>
                            </div>
                        </div>

                        <!-- 4. Online Booking Status -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Onlayn qəbul</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="staffFilterOnlineBtn_all" onclick="BusinessDashboardView.selectStaffFilterOnline('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="staffFilterOnlineBtn_online" onclick="BusinessDashboardView.selectStaffFilterOnline('online')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold text-emerald-700">Onlayn aktiv</span>
                                </button>
                                <button type="button" id="staffFilterOnlineBtn_offline" onclick="BusinessDashboardView.selectStaffFilterOnline('offline')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold text-slate-500">Saytdan gizli</span>
                                </button>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="pt-3 flex items-center justify-between border-t border-slate-100">
                            <button type="button" onclick="BusinessDashboardView.resetStaffFilters()" class="text-xs font-medium text-slate-500 hover:text-rose-600 transition flex items-center gap-1.5 cursor-pointer">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                <span>Filtrləri sıfırla</span>
                            </button>
                            <div class="flex items-center gap-2">
                                ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeStaffFilterModal()", size: "md", type: "button" })}
                                ${ZeyvoUI.button({ label: "Tətbiq et", onClick: "BusinessDashboardView.applyStaffFilterModal()", size: "md", type: "button" })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: DISMISS MASTER (USTANI İŞDƏN AZAD ET)
            =========================================== -->
            <div id="bizDismissMasterModal" onclick="if(event.target === this) BusinessDashboardView.closeDismissMasterModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    <!-- Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: "Ustanı işdən azad et", description: "İş münasibətlərinə xitam verilməsi və səbəbin qeyd olunması", onClose: "BusinessDashboardView.closeDismissMasterModal()" })}

                    <!-- Target Master Brief Profile -->
                    <div id="dismissMasterTargetProfile" class="my-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                        <!-- Filled dynamically -->
                    </div>

                    <!-- Dismissal Form -->
                    <form onsubmit="BusinessDashboardView.handleConfirmDismissMaster(event)" class="space-y-4">
                        <input type="hidden" id="dismissMasterTargetId" value="">

                        <!-- Reason Select -->
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">İşdən azad olunma səbəbi *</label>
                            <select id="dismissMasterReasonSelect" required class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold outline-none focus:border-slate-900 focus:bg-white transition cursor-pointer">
                                <option value="Öz istəyi ilə (Ərizə əsasında)">Öz istəyi ilə (Ərizə əsasında)</option>
                                <option value="Müqavilə müddətinin bitməsi">Müqavilə müddətinin bitməsi</option>
                                <option value="Tərəflərin qarşılıqlı razılığı ilə">Tərəflərin qarşılıqlı razılığı ilə</option>
                                <option value="Əmək və intizam qaydalarının pozulması">Əmək və intizam qaydalarının pozulması</option>
                                <option value="Ştat ixtisarı / Yenidən təşkilatlanma">Ştat ixtisarı / Yenidən təşkilatlanma</option>
                                <option value="Sınaq müddətindən keçməməsi">Sınaq müddətindən keçməməsi</option>
                                <option value="Digər səbəb">Digər səbəb</option>
                            </select>
                        </div>

                        <!-- Date & Document No -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Xitam tarixi *</label>
                                <div class="relative" id="dismissMasterDateWrapper">
                                    <input type="hidden" id="dismissMasterDate" value="">
                                    <button type="button" id="dismissMasterDateDisplay" onclick="BusinessDashboardView.toggleCustomDatePicker('dismissMasterDate', event)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold outline-none focus:border-slate-900 focus:bg-white transition flex items-center justify-between cursor-pointer text-left">
                                        <span id="dismissMasterDateText" class="text-slate-900 font-semibold truncate">Tarix seçin</span>
                                        <svg class="w-4 h-4 text-slate-400 shrink-0 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    </button>
                                    <div id="dismissMasterDateDropdown" onclick="event.stopPropagation()" class="hidden absolute top-full left-0 mt-1.5 z-50 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200 shadow-2xl p-3.5 space-y-3"></div>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Əmr / Sənəd nömrəsi</label>
                                <input type="text" id="dismissMasterDocNo" placeholder="Məsələn: Əmr № 14-K" class="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold outline-none focus:border-slate-900 focus:bg-white transition">
                            </div>
                        </div>

                        <!-- Notes / Description -->
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">Açıqlama və əlavə qeydlər</label>
                            <textarea id="dismissMasterNote" rows="2" placeholder="Xitamın təfərrüatları, rəhbərliyin qeydləri və ya səbəbin izahı..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition resize-none"></textarea>
                        </div>

                        <!-- Informational Callout -->
                        <div class="p-3 bg-rose-50/70 border border-rose-200/70 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
                            <svg class="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                            <span>Ustanın onlayn qəbulu dayandırılacaq və statusu «İşdən azad edilib» olacaq. Əvvəlki rəylər və statistikalar bazada qalacaq, istənilən an yenidən işə qəbul edə bilərsiniz.</span>
                        </div>

                        <!-- Modal Actions -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeDismissMasterModal()", size: "md", type: "button" })}
                            <button type="submit" class="px-5 h-10 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition text-xs shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
                                <span>İşdən azad et</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: REHIRE MASTER (USTANI YENİDƏN İŞƏ QƏBUL ET)
            =========================================== -->
            <div id="bizRehireMasterModal" onclick="if(event.target === this) BusinessDashboardView.closeRehireMasterModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    <!-- Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: "Yenidən işə qəbul et", description: "Mütəxəssisin iş fəaliyyətinin bərpası və profilin aktivləşdirilməsi", onClose: "BusinessDashboardView.closeRehireMasterModal()" })}

                    <!-- Target Master Brief Profile with Previous Dismissal Reason -->
                    <div id="rehireMasterTargetProfile" class="my-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                        <!-- Filled dynamically -->
                    </div>

                    <!-- Rehire Form -->
                    <form onsubmit="BusinessDashboardView.handleConfirmRehireMaster(event)" class="space-y-4">
                        <input type="hidden" id="rehireMasterTargetId" value="">

                        <!-- Role & Date -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1.5">İşə başlama tarixi *</label>
                                <div class="relative" id="rehireMasterDateWrapper">
                                    <input type="hidden" id="rehireMasterDate" value="">
                                    <button type="button" id="rehireMasterDateDisplay" onclick="BusinessDashboardView.toggleCustomDatePicker('rehireMasterDate', event)" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold outline-none focus:border-slate-900 focus:bg-white transition flex items-center justify-between cursor-pointer text-left">
                                        <span id="rehireMasterDateText" class="text-slate-900 font-semibold truncate">Tarix seçin</span>
                                        <svg class="w-4 h-4 text-slate-400 shrink-0 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    </button>
                                    <div id="rehireMasterDateDropdown" onclick="event.stopPropagation()" class="hidden absolute top-full left-0 mt-1.5 z-50 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200 shadow-2xl p-3.5 space-y-3"></div>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Təyin edilən vəzifə *</label>
                                <select id="rehireMasterRoleSelect" required class="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold outline-none focus:border-slate-900 focus:bg-white transition cursor-pointer">
                                </select>
                            </div>
                        </div>

                        <!-- Online booking toggle -->
                        <div class="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200/70 flex items-center justify-between">
                            <div class="flex items-center gap-2.5">
                                <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </div>
                                <div>
                                    <div class="font-bold text-xs text-emerald-950">Onlayn qəbulu dərhal aktiv et</div>
                                    <div class="text-[11px] text-emerald-700">Müştərilər saytdan bu ustaya yazılmağı bərpa edə biləcək</div>
                                </div>
                            </div>
                            <input type="checkbox" id="rehireMasterOnlineBooking" aria-label="Onlayn qəbulu dərhal aktiv et" checked class="w-5 h-5 rounded-md accent-[#FFDD2D] cursor-pointer">
                        </div>

                        <!-- Notes / Description -->
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1.5">İşə qəbul haqqında qeyd</label>
                            <textarea id="rehireMasterNote" rows="2" placeholder="Yenidən qəbul səbəbi, əmr nömrəsi və ya digər qeydlər..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition resize-none"></textarea>
                        </div>

                        <!-- Modal Actions -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeRehireMasterModal()", size: "md", type: "button" })}
                            <button type="submit" class="px-5 h-10 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold transition text-xs shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m19 11 2 2 4-4"/></svg>
                                <span>İşə qəbul et</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: DISMISSAL DETAILS (XİTAM TƏFƏRRÜATLARI)
            =========================================== -->
            <div id="bizDismissalDetailsModal" onclick="if(event.target === this) BusinessDashboardView.closeDismissalDetailsModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-md w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 space-y-4 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2 shrink-0"></div>
                    ${ZeyvoUI.modalHeader({ title: "İşdən azad olunma məlumatı", description: "Xitam səbəbi və tarixi", onClose: "BusinessDashboardView.closeDismissalDetailsModal()" })}

                    <div id="dismissalDetailsContent" class="space-y-3">
                        <!-- Populated dynamically -->
                    </div>

                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button type="button" id="dismissalDetailsRehireBtn" class="px-4 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-xs">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m19 11 2 2 4-4"/></svg>
                            <span>Yenidən işə qəbul et</span>
                        </button>
                        ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeDismissalDetailsModal()", size: "sm", type: "button" })}
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: COMBO PACKAGE ITEM MODAL (PAKETƏ XİDMƏT ƏLAVƏ / REDAKTƏ MODALI)
            =========================================== -->
            <div id="bizComboItemModal" style="z-index: 9999;" onclick="if(event.target === this) BusinessDashboardView.closeComboItemModal()" class="hidden fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-5 sm:p-6 shadow-2xl flex flex-col text-slate-800 max-h-[90vh] overflow-hidden">
                    <!-- Header -->
                    ${ZeyvoUI.modalHeader({ title: "Paketə xidmət əlavə et", titleId: "comboItemModalTitle", description: "Xidməti seçin, paket üçün fərdi müddət və qiymət təyin edin", descriptionId: "comboItemModalSubtitle", onClose: "BusinessDashboardView.closeComboItemModal()" })}

                    <!-- Body -->
                    <div class="py-3.5 space-y-4 overflow-y-auto flex-1 pr-0.5">
                        <input type="hidden" id="comboItemEditIndex" value="-1">

                        <!-- Service Selector -->
                        <div id="comboItemSelectWrap">
                            <label class="block text-slate-700 font-medium text-xs mb-1.5">Xidmət seçin *</label>
                            <select id="comboItemSelectService" onchange="BusinessDashboardView.onComboModalServiceSelected()" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold outline-none focus:border-indigo-600 focus:bg-white transition cursor-pointer">
                                <option value="">-- Kataloqdan xidmət seçin --</option>
                            </select>
                        </div>

                        <!-- Selected Service Info Card -->
                        <div id="comboItemServiceInfoCard" class="hidden p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-1.5">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-indigo-950 text-xs truncate" id="comboItemInfoName">Xidmət adı</span>
                                <span id="comboItemOriginalBadge" class="text-[10px] font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200/60">Əsas tarif</span>
                            </div>
                            <div class="flex items-center gap-3 text-[11px] text-indigo-800/80">
                                <span>Kataloq müddəti: <b id="comboItemInfoOriginalDur">45 dəq</b></span>
                                <span>•</span>
                                <span>Kataloq qiyməti: <b id="comboItemInfoOriginalPrice">35 ₼</b></span>
                            </div>
                        </div>

                        <!-- Custom Duration & Quick Chips -->
                        <div class="space-y-1.5">
                            <div class="flex items-center justify-between">
                                <label class="block text-slate-700 font-medium text-xs">Paketdəki icra müddəti (dəqiqə) *</label>
                                <button type="button" onclick="BusinessDashboardView.resetComboItemDurationToOriginal()" id="comboItemResetDurBtn" class="text-[10px] font-semibold text-indigo-600 hover:underline cursor-pointer hidden">
                                    Əsasa qaytar
                                </button>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <button type="button" onclick="BusinessDashboardView.adjustComboModalDuration(-5)" class="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 cursor-pointer">−</button>
                                <div class="relative flex-1">
                                    <input type="number" id="comboItemDurationInput" min="5" max="720" step="5" value="30" class="w-full h-9 px-2 pr-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-center font-bold text-xs outline-none focus:border-indigo-600 focus:bg-white transition" oninput="BusinessDashboardView.onComboModalInputsChanged()">
                                    <span class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 text-[11px] font-semibold pointer-events-none">dəq</span>
                                </div>
                                <button type="button" onclick="BusinessDashboardView.adjustComboModalDuration(5)" class="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 cursor-pointer">+</button>
                            </div>
                            <!-- Quick Chips for Duration -->
                            <div class="flex items-center gap-1 pt-0.5 overflow-x-auto no-scrollbar pb-0.5">
                                <button type="button" onclick="BusinessDashboardView.setComboModalDuration(15)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">15</button>
                                <button type="button" onclick="BusinessDashboardView.setComboModalDuration(20)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">20</button>
                                <button type="button" onclick="BusinessDashboardView.setComboModalDuration(30)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">30</button>
                                <button type="button" onclick="BusinessDashboardView.setComboModalDuration(45)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">45</button>
                                <button type="button" onclick="BusinessDashboardView.setComboModalDuration(60)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">60</button>
                                <button type="button" onclick="BusinessDashboardView.setComboModalDuration(90)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">90 dəq</button>
                            </div>
                        </div>

                        <!-- Custom Price & Discount calculation -->
                        <div class="space-y-1.5">
                            <div class="flex items-center justify-between">
                                <label class="block text-slate-700 font-medium text-xs">Paketdəki qiymət (₼) *</label>
                                <button type="button" onclick="BusinessDashboardView.resetComboItemPriceToOriginal()" id="comboItemResetPriceBtn" class="text-[10px] font-semibold text-indigo-600 hover:underline cursor-pointer hidden">
                                    Əsasa qaytar
                                </button>
                            </div>
                            <div class="relative">
                                <input type="number" id="comboItemPriceInput" min="0" step="0.5" placeholder="0.00" class="w-full h-9 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs outline-none focus:border-indigo-600 focus:bg-white transition" oninput="BusinessDashboardView.onComboModalInputsChanged()">
                                <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 text-xs font-bold pointer-events-none">₼</span>
                            </div>
                            <!-- Quick Discount Presets -->
                            <div class="flex items-center gap-1 pt-0.5 overflow-x-auto no-scrollbar pb-0.5">
                                <button type="button" onclick="BusinessDashboardView.applyComboPriceDiscount(0)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">Əsas (100%)</button>
                                <button type="button" onclick="BusinessDashboardView.applyComboPriceDiscount(10)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">-10%</button>
                                <button type="button" onclick="BusinessDashboardView.applyComboPriceDiscount(20)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">-20%</button>
                                <button type="button" onclick="BusinessDashboardView.applyComboPriceDiscount(30)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">-30%</button>
                                <button type="button" onclick="BusinessDashboardView.applyComboPriceDiscount(50)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">-50%</button>
                                <button type="button" onclick="BusinessDashboardView.setComboModalPrice(0)" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 text-[10px] font-semibold transition shrink-0 cursor-pointer">0 ₼ (Pulsuz)</button>
                            </div>
                            <div id="comboItemDiscountBadge" class="text-[11px] text-slate-500 font-medium pt-0.5"></div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                        ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeComboItemModal()", size: "sm", type: "button" })}
                        <button type="button" id="comboItemSubmitBtn" onclick="BusinessDashboardView.saveComboItemFromModal()" class="px-4 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition text-xs flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95">
                            Paketə əlavə et
                        </button>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: RESOURCE SELECTION PICKER (RESURS SEÇİMİ MODALI)
            =========================================== -->
            <div id="bizResourcePickerModal" style="z-index: 9999;" onclick="if(event.target === this) BusinessDashboardView.closeResourcePickerModal()" class="hidden fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-lg w-full p-5 sm:p-6 shadow-2xl flex flex-col text-slate-800 max-h-[88vh] overflow-hidden">
                    <!-- Header -->
                    ${ZeyvoUI.modalHeader({ title: "Resursları seçin", description: "Xidmət üçün tələb olunan kabinet, kreslo və aparatlar", onClose: "BusinessDashboardView.closeResourcePickerModal()" })}

                    <!-- Search & Category Filters & Quick Selection -->
                    <div class="pt-3 pb-2 space-y-2.5 shrink-0">
                        <!-- Search input -->
                        <div class="relative">
                            <input type="text" id="resourcePickerSearchInput" placeholder="Resurs adı və ya modeli üzrə axtarış..." oninput="BusinessDashboardView.filterResourcePickerList()" class="w-full h-9 pl-8 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition text-xs font-medium">
                            <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>

                        <!-- Category Filter Pills -->
                        <div id="resourcePickerCategoryTabs" class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                            <!-- Populated dynamically -->
                        </div>

                        <!-- Count and Quick Selection -->
                        <div class="flex items-center justify-between text-xs px-1">
                            <span id="resourcePickerCountLabel" class="text-slate-500 font-medium text-[11px]">Seçilib: 0 resurs</span>
                            <div class="flex items-center gap-2">
                                <button type="button" onclick="BusinessDashboardView.pickerSelectAllResources()" class="text-[11px] font-semibold text-amber-800 hover:underline cursor-pointer">
                                    Hamısını seç
                                </button>
                                <span class="text-slate-300">•</span>
                                <button type="button" onclick="BusinessDashboardView.pickerClearAllResources()" class="text-[11px] font-semibold text-slate-400 hover:text-slate-700 cursor-pointer">
                                    Sıfırla
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Resources List Container -->
                    <div id="resourcePickerListContainer" class="flex-1 overflow-y-auto py-1 space-y-1.5 min-h-[160px] max-h-[50vh] pr-0.5">
                        <!-- Populated dynamically -->
                    </div>

                    <!-- Footer -->
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                        ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeResourcePickerModal()", size: "sm", type: "button" })}
                        ${ZeyvoUI.button({ label: "Təsdiq et", onClick: "BusinessDashboardView.applyResourcePickerSelection()", size: "sm", type: "button" })}
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: SERVICE TECH CARD PICKER (TEXNOLOJİ KART SEÇİMİ)
            =========================================== -->
            <div id="bizServiceMaterialPickerModal" style="z-index: 9999;" onclick="if(event.target === this) BusinessDashboardView.closeServiceMaterialPickerModal()" class="hidden fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl w-full p-5 sm:p-6 shadow-2xl flex flex-col text-slate-800 max-h-[88vh] overflow-hidden">
                    <!-- Header -->
                    ${ZeyvoUI.modalHeader({ title: "Texnoloji kart seçimi", description: "Xidmət üçün baza standart sərfiyyat xəritəsi", onClose: "BusinessDashboardView.closeServiceMaterialPickerModal()" })}

                    <!-- Search & Count -->
                    <div class="pt-3 pb-2 space-y-2.5 shrink-0">
                        <div class="relative flex-1">
                            <input type="text" id="serviceMaterialPickerSearchInput" placeholder="Texnoloji kart adı və ya tərkib üzrə axtarış..." oninput="BusinessDashboardView.filterServiceMaterialPickerList()" class="w-full h-9 pl-8 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition text-xs font-medium">
                            <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                        <div class="flex items-center justify-between text-xs px-1">
                            <span id="serviceMaterialPickerCountLabel" class="text-slate-500 font-medium text-[11px]">Mövcud kartlar: 0</span>
                        </div>
                    </div>

                    <!-- Tech Cards List Container -->
                    <div id="serviceMaterialPickerListContainer" class="flex-1 overflow-y-auto py-1 space-y-2 min-h-[160px] max-h-[50vh] pr-0.5">
                        <!-- Populated dynamically -->
                    </div>

                    <!-- Footer -->
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
                        <div class="text-xs text-slate-500 truncate max-w-[260px] sm:max-w-xs">
                            <span>Seçilib: </span>
                            <span id="serviceMaterialPickerSelectedName" class="font-bold text-slate-900">Seçilməyib</span>
                            <span id="serviceMaterialPickerCostPreview" class="ml-1 text-slate-500 font-mono font-medium"></span>
                        </div>
                        <div class="flex items-center gap-2">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeServiceMaterialPickerModal()", size: "sm", type: "button" })}
                            ${ZeyvoUI.button({ label: "Təsdiq et", onClick: "BusinessDashboardView.applyServiceMaterialPickerSelection()", size: "sm", type: "button" })}
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: SERVICE FILTERS (XİDMƏT FİLTRLƏRİ)
            =========================================== -->
            <div id="bizServiceFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeServiceFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: "Xidmət filtrləri", description: "Kateqoriya, auditoriya və onlayn qəbul üzrə seçim", onClose: "BusinessDashboardView.closeServiceFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Category Select -->
                        <div class="space-y-1.5">
                            <label class="block text-slate-700 font-medium">Kateqoriya</label>
                            <select id="srvFilterModalCategory" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition cursor-pointer">
                            </select>
                        </div>

                        <!-- 2. Gender / Auditoriya -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Kimin üçün (Auditoriya)</label>
                            <div class="grid grid-cols-4 gap-2">
                                <button type="button" id="srvFilterGenderBtn_all" onclick="BusinessDashboardView.selectServiceFilterGender('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="srvFilterGenderBtn_women" onclick="BusinessDashboardView.selectServiceFilterGender('women')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Qadın</span>
                                </button>
                                <button type="button" id="srvFilterGenderBtn_men" onclick="BusinessDashboardView.selectServiceFilterGender('men')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Kişi</span>
                                </button>
                                <button type="button" id="srvFilterGenderBtn_kids" onclick="BusinessDashboardView.selectServiceFilterGender('kids')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Uşaq</span>
                                </button>
                            </div>
                        </div>

                        <!-- 3. Online Booking Status -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Onlayn qəbul</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="srvFilterOnlineBtn_all" onclick="BusinessDashboardView.selectServiceFilterOnline('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="srvFilterOnlineBtn_online" onclick="BusinessDashboardView.selectServiceFilterOnline('online')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Onlayn aktiv</span>
                                </button>
                                <button type="button" id="srvFilterOnlineBtn_offline" onclick="BusinessDashboardView.selectServiceFilterOnline('offline')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Yalnız salonda</span>
                                </button>
                            </div>
                        </div>

                        <!-- 4. Format / Növ -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Xidmət növü (Format)</label>
                            <div class="grid grid-cols-4 gap-2">
                                <button type="button" id="srvFilterFormatBtn_all" onclick="BusinessDashboardView.selectServiceFilterFormat('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="srvFilterFormatBtn_individual" onclick="BusinessDashboardView.selectServiceFilterFormat('individual')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Fərdi</span>
                                </button>
                                <button type="button" id="srvFilterFormatBtn_group" onclick="BusinessDashboardView.selectServiceFilterFormat('group')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Qrup</span>
                                </button>
                                <button type="button" id="srvFilterFormatBtn_combo" onclick="BusinessDashboardView.selectServiceFilterFormat('combo')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Kompleks</span>
                                </button>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="pt-3 flex items-center justify-between border-t border-slate-100">
                            <button type="button" onclick="BusinessDashboardView.resetServiceFilters()" class="text-xs font-medium text-slate-500 hover:text-rose-600 transition flex items-center gap-1.5 cursor-pointer">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                <span>Filtrləri sıfırla</span>
                            </button>
                            <div class="flex items-center gap-2">
                                ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeServiceFilterModal()", size: "md", type: "button" })}
                                ${ZeyvoUI.button({ label: "Tətbiq et", onClick: "BusinessDashboardView.applyServiceFilterModal()", size: "md", type: "button" })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE BRANCH (FİLİAL ƏLAVƏ ET)
            =========================================== -->
            <!-- ==========================================
                 MODAL: CREATE / EDIT BRANCH (FİLİAL ƏLAVƏ ET / REDAKTƏ ET)
            =========================================== -->
            <div id="bizCreateBranchModal" onclick="if(event.target === this) BusinessDashboardView.closeAddBranchModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-2xl w-full p-5 sm:p-7 shadow-2xl flex flex-col max-h-[92vh] text-slate-800">
                    <!-- Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: "Yeni filial əlavə et", titleId: "bizBranchModalTitle", description: "Filial məlumatlarını, interyer şəkillərini və iş rejimini daxil edin", descriptionId: "bizBranchModalSubtitle", onClose: "BusinessDashboardView.closeAddBranchModal()" })}

                    <!-- Branch Tabs Navigation (Unified Segmented Control - Standard App Component) -->
                    <div id="bizBranchTabsContainer" class="shrink-0 mt-3 mb-1">
                        ${this.renderSegmentedTabs({
                            tabs: [
                                { id: 'main', label: 'Əsas' },
                                { id: 'address', label: 'Ünvan' },
                                { id: 'interior', label: 'İnteryer', badge: 0 },
                                { id: 'schedule', label: 'İş qrafiki' },
                                { id: 'messengers', label: 'Mesencerlər' },
                                { id: 'socials', label: 'Sosial şəbəkələr' }
                            ],
                            activeId: 'main',
                            onSelect: 'BusinessDashboardView.switchBranchTab'
                        })}
                    </div>

                    <!-- Modal Body / Form -->
                    <form onsubmit="BusinessDashboardView.handleSaveBranch(event)" class="flex flex-col flex-1 overflow-hidden pt-3">
                        <input type="hidden" id="bizBranchTargetBizId" value="">
                        <input type="hidden" id="bizBranchEditIndex" value="">

                        <!-- Scrollable Tabs Content -->
                        <div class="flex-1 overflow-y-auto pr-1 space-y-4 text-xs font-normal">
                            
                            <!-- TAB 1: ƏSAS (Основное) -->
                            <div id="branchPane_main" class="space-y-3.5">
                                <!-- Filial loqosu / Şəkli (Profillə eyni komponent) -->
                                <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                                    <div class="relative group cursor-pointer shrink-0" onclick="document.getElementById('bizBranchLogoFileInput').click()" title="Şəkli yükləmək üçün klikləyin">
                                        <div id="bizBranchLogoPreview" class="w-14 h-14 rounded-2xl bg-white border-2 border-dashed border-slate-300 group-hover:border-amber-400 group-hover:bg-amber-50/20 flex items-center justify-center text-slate-400 shadow-2xs overflow-hidden transition"><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg></div>
                                        <!-- Camera badge -->
                                        <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FFDD2D] text-[#101114] flex items-center justify-center shadow-sm border-2 border-white group-hover:scale-110 transition"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div>
                                        <!-- Delete button (visible when custom logo exists) -->
                                        <button id="bizBranchDeleteLogoBtn" type="button" onclick="event.stopPropagation(); BusinessDashboardView.removeBranchLogo()" class="hidden absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md border-2 border-white transition transform hover:scale-110" title="Şəkli sil"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                                        <input type="file" id="bizBranchLogoFileInput" accept="image/*" class="hidden" onchange="BusinessDashboardView.handleBranchLogoUpload(event)">
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <label id="bizBranchLogoLabel" class="block text-xs font-bold text-slate-700">Filial loqosu</label>
                                        <p id="bizBranchLogoSubtitle" class="text-[11px] text-slate-400 mt-0.5">Müştərilərin tanıması üçün loqo və ya foto (PNG, JPG, WebP)</p>
                                    </div>
                                </div>

                                <div>
                                    <label id="bizBranchNameLabel" class="block text-slate-700 font-medium mb-1.5">Filialın adı *</label>
                                    <input type="text" id="bizBranchName" required placeholder="Məs: Nizami Filialı" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-medium text-xs">
                                </div>
                                <!-- Xidmət Kateqoriyaları və Alt-xidmətlər (Axtarışlı İerarxik Seçici) -->
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <label class="block text-slate-700 font-medium">Kateqoriyalar və alt-xidmətlər *</label>
                                        <span class="text-[11px] text-slate-400 font-normal">Seçilib: <span id="branchSelectedCatCount" class="font-bold text-slate-900">0</span></span>
                                    </div>

                                    <!-- 1. Seçilmiş Kateqoriyalar (Çiplər) -->
                                    <div id="bizBranchSelectedChipsContainer" class="flex flex-wrap gap-1.5 min-h-[38px] p-2 rounded-xl bg-slate-50 border border-slate-200/90 max-h-28 overflow-y-auto">
                                        <!-- Rendered dynamically -->
                                    </div>

                                    <!-- 2. Axtarış Qutusu -->
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/></svg>
                                        </div>
                                        <input type="text" id="bizBranchCatSearch" oninput="BusinessDashboardView.handleBranchCatSearch(this.value)" placeholder="Kateqoriya və ya alt-xidmət axtar (məs: Saç, Manikür, Diş, Avto...)" class="w-full h-10 pl-9 pr-9 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition">
                                        <button type="button" id="bizBranchCatClearSearchBtn" onclick="BusinessDashboardView.clearBranchCatSearch()" class="hidden absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition" title="Axtarışı təmizlə"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                                    </div>

                                    <!-- 3. İerarxik Kateqoriya və Alt-kateqoriyalar Siyahısı -->
                                    <div id="bizBranchCategoriesTreeContainer" class="rounded-xl border border-slate-200/90 bg-slate-50/70 p-2 max-h-56 overflow-y-auto space-y-2">
                                        <!-- Rendered dynamically via ZeyvoData.topCategories -->
                                    </div>
                                    <p class="text-[11px] text-slate-400">Filialın aid olduğu əsas kateqoriyanı və təqdim etdiyi bütün alt-xidmətləri seçə bilərsiniz</p>
                                </div>
                                <!-- Əlaqə Nömrələri (Dinamik siyahı + bayraq və +994 prefiksi) -->
                                <div>
                                    <div class="flex items-center justify-between mb-1.5">
                                        <label class="block text-slate-700 font-medium">Əlaqə nömrələri *</label>
                                        <button type="button" onclick="BusinessDashboardView.addBranchPhoneRow()" class="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-black transition">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                            <span>Nömrə əlavə et</span>
                                        </button>
                                    </div>
                                    <div id="bizBranchPhonesContainer" class="space-y-2">
                                        <!-- Dynamically populated with flag + +994 prefix rows -->
                                    </div>
                                </div>
                                <div>
                                    <label id="bizBranchDescLabel" class="block text-slate-700 font-medium mb-1.5">Filial haqqında qısa məlumat</label>
                                    <textarea id="bizBranchDesc" rows="3" placeholder="Filial haqqında qısa təsvir və ya qeydlər..." class="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none"></textarea>
                                </div>
                            </div>

                            <!-- TAB 2: ÜNVAN (Адрес) -->
                            <div id="branchPane_address" class="hidden space-y-3.5">
                                <!-- Ölkə və Şəhər -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <!-- 1. Ölkə (Sabit Azərbaycan - profillə eyni komponent) -->
                                    <div>
                                        <label class="block text-slate-700 font-medium mb-1.5">Ölkə</label>
                                        <div class="h-11 px-3.5 rounded-xl bg-slate-100/90 border border-slate-200 flex items-center gap-2 cursor-not-allowed select-none">
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
                                            <span class="text-xs font-semibold text-slate-600">Azərbaycan</span>
                                        </div>
                                    </div>

                                    <!-- 2. Şəhər (Profillə eyni seçici) -->
                                    <div>
                                        <label class="block text-slate-700 font-medium mb-1.5">Şəhər *</label>
                                        <select id="bizBranchCity" onchange="BusinessDashboardView.updateBranchMapPreview()" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-semibold">
                                            <option value="Bakı" selected>Bakı</option>
                                            <option value="Sumqayıt">Sumqayıt</option>
                                            <option value="Gəncə">Gəncə</option>
                                            <option value="Xırdalan">Xırdalan</option>
                                            <option value="Mingəçevir">Mingəçevir</option>
                                            <option value="Şəki">Şəki</option>
                                            <option value="Quba">Quba</option>
                                            <option value="Lənkəran">Lənkəran</option>
                                            <option value="Naxçıvan">Naxçıvan</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- 3. Dəqiq Ünvan -->
                                <div>
                                    <label class="block text-slate-700 font-medium mb-1.5">Dəqiq ünvan (küçə, bina) *</label>
                                    <input type="text" id="bizBranchAddress" required oninput="BusinessDashboardView.debounceMapUpdate()" placeholder="Məs: Nizami küç. 45" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal">
                                </div>

                                <!-- 4. Google Maps Canlı Xəritə -->
                                <div class="space-y-1.5">
                                    <div class="flex items-center justify-between">
                                        <label class="block text-slate-700 font-medium flex items-center gap-1.5">
                                            <svg class="w-4 h-4 text-amber-600 inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                            <span>Xəritədə məkan (Google Maps)</span>
                                        </label>
                                        <a id="bizBranchOpenGoogleMapsBtn" href="https://maps.google.com/?q=Bak%C4%B1" target="_blank" rel="noopener noreferrer" class="text-[11px] font-semibold text-slate-600 hover:text-black flex items-center gap-1 transition">
                                            <span>Google Maps-da aç</span>
                                            <span class="text-xs">↗</span>
                                        </a>
                                    </div>
                                    <div class="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs">
                                        <iframe id="bizBranchGoogleMapIframe" src="https://maps.google.com/maps?q=Bak%C4%B1&t=&z=14&ie=UTF8&iwloc=&output=embed" class="w-full h-full border-0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
                                        <div class="absolute bottom-2.5 right-2.5 pointer-events-none bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-semibold text-slate-600 shadow-xs border border-slate-200/80">
                                            Google Maps API
                                        </div>
                                    </div>
                                    <input type="hidden" id="bizBranchMapUrl" value="">
                                    <p class="text-[11px] text-slate-400">Ünvan və ya şəhər daxil edildikdə xəritə avtomatik olaraq dəqiq nöqtəni göstərir</p>
                                </div>
                            </div>

                            <!-- TAB 3: İNTERYER (Интерьер 0 - добавление и удаление фоток) -->
                            <div id="branchPane_interior" class="hidden space-y-4">
                                <input type="file" id="bizBranchPhotoInput" accept="image/*" multiple class="hidden" onchange="BusinessDashboardView.handleBranchPhotosUpload(event)">

                                <!-- Upload box -->
                                <div onclick="document.getElementById('bizBranchPhotoInput').click()" class="border-2 border-dashed border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 rounded-2xl p-5 text-center cursor-pointer transition group">
                                    <div class="w-10 h-10 mx-auto rounded-xl bg-amber-50 group-hover:bg-amber-100 text-amber-600 flex items-center justify-center transition mb-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                    </div>
                                    <p id="bizBranchInteriorUploadText" class="text-xs font-semibold text-slate-800">İnteryer şəkillərini yükləmək üçün klikləyin</p>
                                    <p class="text-[11px] text-slate-400 mt-0.5">PNG, JPG, WebP formatları (eyni anda bir neçə şəkil seçə bilərsiniz)</p>
                                </div>


                                <!-- Photo Gallery List with Delete -->
                                <div>
                                    <div class="flex items-center justify-between pb-2">
                                        <span id="bizBranchInteriorCountLabel" class="text-xs font-medium text-slate-700">Yüklənmiş şəkillər (<span id="branchInteriorGalleryCount">0</span>)</span>
                                        <button type="button" onclick="BusinessDashboardView.clearAllBranchPhotos()" id="btnClearAllPhotos" class="hidden text-[11px] text-red-500 hover:text-red-700 font-medium">Bütün şəkilləri sil</button>
                                    </div>

                                    <div id="branchPhotosGrid" class="grid grid-cols-2 sm:grid-cols-3 gap-3 min-h-[90px]">
                                        <!-- Rendered dynamically -->
                                    </div>
                                </div>
                            </div>

                            <!-- TAB 4: İŞ QRAFİKİ (График работы) -->
                            <div id="branchPane_schedule" class="hidden space-y-4">
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs font-medium text-slate-700">Həftəlik günlər üzrə iş rejimi</span>
                                        <button type="button" onclick="BusinessDashboardView.applyScheduleToAllDays()" class="text-[11px] text-amber-600 hover:text-amber-700 font-medium">
                                            İlk günü hamısına tətbiq et
                                        </button>
                                    </div>

                                    <div class="space-y-2">
                                        <!-- Bazar ertəsi -->
                                        <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                                            <span class="w-32 font-medium text-slate-700">Bazar ertəsi</span>
                                            <div class="flex items-center gap-2">
                                                <input type="text" readonly id="sched_open_mon" value="09:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <span class="text-slate-400">–</span>
                                                <input type="text" readonly id="sched_close_mon" value="21:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <label class="inline-flex items-center gap-1.5 cursor-pointer select-none group py-0.5 px-1.5 rounded-lg hover:bg-slate-200/50 transition">
                                                    <div class="relative flex items-center justify-center">
                                                        <input type="checkbox" id="sched_off_mon" onchange="BusinessDashboardView.toggleDayOff('mon')" class="peer sr-only">
                                                        <div class="w-4 h-4 rounded-md border border-slate-300 bg-white peer-checked:bg-[#FFDD2D] peer-checked:border-amber-400 flex items-center justify-center transition shadow-2xs group-hover:border-slate-400">
                                                            <svg class="w-2.5 h-2.5 text-[#101114] hidden peer-checked:block stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span class="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition">İstirahət</span>
                                                </label>
                                            </div>
                                        </div>
                                        <!-- Çərşənbə axşamı -->
                                        <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                                            <span class="w-32 font-medium text-slate-700">Çərşənbə axşamı</span>
                                            <div class="flex items-center gap-2">
                                                <input type="text" readonly id="sched_open_tue" value="09:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <span class="text-slate-400">–</span>
                                                <input type="text" readonly id="sched_close_tue" value="21:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <label class="inline-flex items-center gap-1.5 cursor-pointer select-none group py-0.5 px-1.5 rounded-lg hover:bg-slate-200/50 transition">
                                                    <div class="relative flex items-center justify-center">
                                                        <input type="checkbox" id="sched_off_tue" onchange="BusinessDashboardView.toggleDayOff('tue')" class="peer sr-only">
                                                        <div class="w-4 h-4 rounded-md border border-slate-300 bg-white peer-checked:bg-[#FFDD2D] peer-checked:border-amber-400 flex items-center justify-center transition shadow-2xs group-hover:border-slate-400">
                                                            <svg class="w-2.5 h-2.5 text-[#101114] hidden peer-checked:block stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span class="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition">İstirahət</span>
                                                </label>
                                            </div>
                                        </div>
                                        <!-- Çərşənbə -->
                                        <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                                            <span class="w-32 font-medium text-slate-700">Çərşənbə</span>
                                            <div class="flex items-center gap-2">
                                                <input type="text" readonly id="sched_open_wed" value="09:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <span class="text-slate-400">–</span>
                                                <input type="text" readonly id="sched_close_wed" value="21:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <label class="inline-flex items-center gap-1.5 cursor-pointer select-none group py-0.5 px-1.5 rounded-lg hover:bg-slate-200/50 transition">
                                                    <div class="relative flex items-center justify-center">
                                                        <input type="checkbox" id="sched_off_wed" onchange="BusinessDashboardView.toggleDayOff('wed')" class="peer sr-only">
                                                        <div class="w-4 h-4 rounded-md border border-slate-300 bg-white peer-checked:bg-[#FFDD2D] peer-checked:border-amber-400 flex items-center justify-center transition shadow-2xs group-hover:border-slate-400">
                                                            <svg class="w-2.5 h-2.5 text-[#101114] hidden peer-checked:block stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span class="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition">İstirahət</span>
                                                </label>
                                            </div>
                                        </div>
                                        <!-- Cümə axşamı -->
                                        <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                                            <span class="w-32 font-medium text-slate-700">Cümə axşamı</span>
                                            <div class="flex items-center gap-2">
                                                <input type="text" readonly id="sched_open_thu" value="09:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <span class="text-slate-400">–</span>
                                                <input type="text" readonly id="sched_close_thu" value="21:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <label class="inline-flex items-center gap-1.5 cursor-pointer select-none group py-0.5 px-1.5 rounded-lg hover:bg-slate-200/50 transition">
                                                    <div class="relative flex items-center justify-center">
                                                        <input type="checkbox" id="sched_off_thu" onchange="BusinessDashboardView.toggleDayOff('thu')" class="peer sr-only">
                                                        <div class="w-4 h-4 rounded-md border border-slate-300 bg-white peer-checked:bg-[#FFDD2D] peer-checked:border-amber-400 flex items-center justify-center transition shadow-2xs group-hover:border-slate-400">
                                                            <svg class="w-2.5 h-2.5 text-[#101114] hidden peer-checked:block stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span class="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition">İstirahət</span>
                                                </label>
                                            </div>
                                        </div>
                                        <!-- Cümə -->
                                        <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                                            <span class="w-32 font-medium text-slate-700">Cümə</span>
                                            <div class="flex items-center gap-2">
                                                <input type="text" readonly id="sched_open_fri" value="09:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <span class="text-slate-400">–</span>
                                                <input type="text" readonly id="sched_close_fri" value="21:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <label class="inline-flex items-center gap-1.5 cursor-pointer select-none group py-0.5 px-1.5 rounded-lg hover:bg-slate-200/50 transition">
                                                    <div class="relative flex items-center justify-center">
                                                        <input type="checkbox" id="sched_off_fri" onchange="BusinessDashboardView.toggleDayOff('fri')" class="peer sr-only">
                                                        <div class="w-4 h-4 rounded-md border border-slate-300 bg-white peer-checked:bg-[#FFDD2D] peer-checked:border-amber-400 flex items-center justify-center transition shadow-2xs group-hover:border-slate-400">
                                                            <svg class="w-2.5 h-2.5 text-[#101114] hidden peer-checked:block stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span class="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition">İstirahət</span>
                                                </label>
                                            </div>
                                        </div>
                                        <!-- Şənbə -->
                                        <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                                            <span class="w-32 font-medium text-slate-700">Şənbə</span>
                                            <div class="flex items-center gap-2">
                                                <input type="text" readonly id="sched_open_sat" value="10:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <span class="text-slate-400">–</span>
                                                <input type="text" readonly id="sched_close_sat" value="20:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <label class="inline-flex items-center gap-1.5 cursor-pointer select-none group py-0.5 px-1.5 rounded-lg hover:bg-slate-200/50 transition">
                                                    <div class="relative flex items-center justify-center">
                                                        <input type="checkbox" id="sched_off_sat" onchange="BusinessDashboardView.toggleDayOff('sat')" class="peer sr-only">
                                                        <div class="w-4 h-4 rounded-md border border-slate-300 bg-white peer-checked:bg-[#FFDD2D] peer-checked:border-amber-400 flex items-center justify-center transition shadow-2xs group-hover:border-slate-400">
                                                            <svg class="w-2.5 h-2.5 text-[#101114] hidden peer-checked:block stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span class="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition">İstirahət</span>
                                                </label>
                                            </div>
                                        </div>
                                        <!-- Bazar -->
                                        <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                                            <span class="w-32 font-medium text-slate-700">Bazar</span>
                                            <div class="flex items-center gap-2">
                                                <input type="text" readonly id="sched_open_sun" value="10:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <span class="text-slate-400">–</span>
                                                <input type="text" readonly id="sched_close_sun" value="20:00" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="h-8 w-16 px-2 text-center cursor-pointer rounded-lg bg-white border border-slate-200 text-slate-800 text-xs outline-none disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed transition">
                                                <label class="inline-flex items-center gap-1.5 cursor-pointer select-none group py-0.5 px-1.5 rounded-lg hover:bg-slate-200/50 transition">
                                                    <div class="relative flex items-center justify-center">
                                                        <input type="checkbox" id="sched_off_sun" onchange="BusinessDashboardView.toggleDayOff('sun')" class="peer sr-only">
                                                        <div class="w-4 h-4 rounded-md border border-slate-300 bg-white peer-checked:bg-[#FFDD2D] peer-checked:border-amber-400 flex items-center justify-center transition shadow-2xs group-hover:border-slate-400">
                                                            <svg class="w-2.5 h-2.5 text-[#101114] hidden peer-checked:block stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span class="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition">İstirahət</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- TAB 5: MESENCERLƏR (Мессенджеры) -->
                            <div id="branchPane_messengers" class="hidden space-y-3.5">
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">WhatsApp nömrəsi</label>
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
                                        <input type="tel" id="bizBranchWhatsapp" maxlength="15" placeholder="(50) 000-00-00" oninput="App.formatAzPhone ? App.formatAzPhone(this) : null" class="w-full h-full px-3 bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                    </div>
                                    <p class="text-[11px] text-slate-400 mt-1">Müştərilərin birbaşa filialın WhatsApp nömrəsinə yazması üçün</p>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">Telegram istifadəçi adı</label>
                                    <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-1 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                        <span class="text-slate-400 font-bold text-xs select-none">t.me/</span>
                                        <input type="text" id="bizBranchTelegram" placeholder="filial_adi" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                    </div>
                                </div>
                            </div>

                            <!-- TAB 6: SOSİAL ŞƏBƏKƏLƏR (Соц сети) -->
                            <div id="branchPane_socials" class="hidden space-y-3.5">
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">Instagram səhifəsi</label>
                                    <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-1 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                        <span class="text-slate-400 font-bold text-xs select-none">instagram.com/</span>
                                        <input type="text" id="bizBranchInstagram" placeholder="istifadəçi_adı" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">Facebook səhifəsi</label>
                                    <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-1 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                        <span class="text-slate-400 font-bold text-xs select-none">facebook.com/</span>
                                        <input type="text" id="bizBranchFacebook" placeholder="istifadəçi_adı" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">TikTok hesabı</label>
                                    <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-1 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                        <span class="text-slate-400 font-bold text-xs select-none">tiktok.com/@</span>
                                        <input type="text" id="bizBranchTiktok" placeholder="istifadəçi_adı" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-500 mb-1">LinkedIn səhifəsi</label>
                                    <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-1 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                        <span class="text-slate-400 font-bold text-xs select-none">linkedin.com/in/</span>
                                        <input type="text" id="bizBranchLinkedin" placeholder="istifadəçi_adı" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- Modal Footer -->
                        <div class="pt-3.5 mt-2 border-t border-slate-100 flex items-center justify-between gap-2.5 shrink-0">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeAddBranchModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Filialı əlavə et", type: "submit", id: "bizBranchSubmitBtn" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: EVENT / APPOINTMENT DETAILS
            =========================================== -->
            <div id="bizEventDetailsModal" onclick="if(event.target === this) BusinessDashboardView.closeEventDetails()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-800" id="bizEventDetailsContent">
                    <!-- Populated dynamically -->
                </div>
            </div>

            <!-- ==========================================
                 MODAL: NEW EVENT / BOOKING
            =========================================== -->
            <div id="bizNewBookingModal" onclick="if(event.target === this) BusinessDashboardView.closeBookingModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs modal-fade">
                <div id="bizBookingModalContainer" class="bg-white border border-slate-200/90 rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl text-slate-800 max-h-[92vh] overflow-y-auto">
                    <!-- Populated dynamically via renderBookingModalHtml -->
                </div>
            </div>



            <!-- ==========================================
                 MODAL: WHATSAPP INTEGRATION & MARKETPLACE DETAILS
            =========================================== -->
            <div id="bizWhatsAppIntegrationModal" onclick="if(event.target === this) BusinessDashboardView.closeWhatsAppIntegrationModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-2xl w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    <!-- Header -->
                    ${ZeyvoUI.modalHeader({ title: "WhatsApp Business İnteqrasiyası", description: "Avtomatik qəbul xatırlatmaları, təsdiqləmələr və rəylər", onClose: "BusinessDashboardView.closeWhatsAppIntegrationModal()" })}

                    <!-- Top Sub-tabs Navigation (Unified Segmented Control - Standard App Component) -->
                    <div id="whatsAppModalTabsContainer" class="shrink-0 mt-3 mb-1">
                        <!-- Populated by renderWhatsAppModalTabs -->
                    </div>

                    <!-- Dynamic Body -->
                    <div id="whatsAppModalBody" class="py-4 space-y-4">
                        <!-- Populated dynamically by renderWhatsAppModalTabContent -->
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT LOYALTY CARD (CRUD)
            =========================================== -->
            <!-- ==========================================
                 MODAL: CREATE / EDIT LOYALTY CARD / RULE (CRUD)
            =========================================== -->
            <div id="bizLoyaltyCardRuleModal" onclick="if(event.target === this) BusinessDashboardView.closeLoyaltyCardRuleModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    <!-- Clean Modal Header (GEMINI.md strictly compliant: text only, no icons) -->
                    ${ZeyvoUI.modalHeader({ title: "Yeni Kart / Qayda", titleId: "cardRuleModalTitle", description: "Endirim və ya keşbek kartının parametrləri", descriptionId: "cardRuleModalSubtitle", onClose: "BusinessDashboardView.closeLoyaltyCardRuleModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveLoyaltyCardRule(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <input type="hidden" id="cardRuleEditId" value="">

                        <!-- Kart / qayda adı -->
                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Kart / qayda adı *</label>
                            <input type="text" id="cardRuleName" required placeholder="Məs: Yeni Müştəri Xoş Gəldin Endirimi" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>

                        <!-- Proqram tipi (Selectable Cards) -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold text-slate-700">Proqram tipi *</label>
                            <input type="hidden" id="cardRuleType" value="discount">
                            
                            <div class="grid grid-cols-2 gap-2.5">
                                <!-- Card 1: Endirim -->
                                <button type="button" 
                                        id="cardRuleTypeCard_discount" 
                                        onclick="BusinessDashboardView.setCardRuleType('discount')" 
                                        class="p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between relative bg-[#FFDD2D]/10 border-slate-900 ring-2 ring-tbank-yellow/50 shadow-xs">
                                    <div class="flex items-center justify-between mb-2.5">
                                        <div id="cardRuleTypeIcon_discount" class="w-8 h-8 rounded-xl flex items-center justify-center transition bg-[#FFDD2D] text-[#101114]">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                                                <line x1="7" y1="7" x2="7.01" y2="7"/>
                                            </svg>
                                        </div>
                                        <div id="cardRuleTypeCheck_discount" class="w-5 h-5 rounded-full flex items-center justify-center transition bg-slate-900 text-white">
                                            <svg class="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold text-xs text-slate-900 leading-tight">Endirim</div>
                                        <div class="text-[10px] text-slate-400 mt-0.5 leading-snug">Çekdən birbaşa faiz çıxılır</div>
                                    </div>
                                </button>

                                <!-- Card 2: Keşbek -->
                                <button type="button" 
                                        id="cardRuleTypeCard_cashback" 
                                        onclick="BusinessDashboardView.setCardRuleType('cashback')" 
                                        class="p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between relative bg-slate-50/70 border-slate-200/90 hover:bg-slate-100/70 hover:border-slate-300">
                                    <div class="flex items-center justify-between mb-2.5">
                                        <div id="cardRuleTypeIcon_cashback" class="w-8 h-8 rounded-xl flex items-center justify-center transition bg-slate-200/80 text-slate-500">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                                                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                                                <path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>
                                            </svg>
                                        </div>
                                        <div id="cardRuleTypeCheck_cashback" class="w-5 h-5 rounded-full flex items-center justify-center transition bg-slate-200 text-transparent">
                                            <svg class="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold text-xs text-slate-900 leading-tight">Keşbek (bonuslar)</div>
                                        <div class="text-[10px] text-slate-400 mt-0.5 leading-snug">Müştəri balansına bonus toplanır</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- Faiz dərəcəsi (%) -->
                        <div class="space-y-1">
                            <label id="cardRulePercentLabel" class="block text-xs font-bold text-slate-700">Endirim faizi (%) *</label>
                            <div class="relative">
                                <input type="number" id="cardRulePercent" min="1" max="100" step="1" required placeholder="10" class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">%</span>
                            </div>
                        </div>

                        <!-- Minimum məbləğ (₼) & Müddət, gün -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Minimum məbləğ (₼)</label>
                                <div class="relative">
                                    <input type="number" id="cardRuleMinAmount" min="0" step="5" placeholder="0" class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                    <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">₼</span>
                                </div>
                                <span class="text-[10px] text-slate-400">0 daxil etsəniz məhdudiyyətsiz</span>
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Müddət, gün</label>
                                <div class="relative">
                                    <input type="number" id="cardRuleDuration" min="0" step="1" placeholder="30" class="w-full h-10 px-3 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                    <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">gün</span>
                                </div>
                                <span class="text-[10px] text-slate-400">0 daxil etsəniz müddətsiz</span>
                            </div>
                        </div>

                        <!-- Kimlərə tətbiq olunur & Status -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Kimlərə tətbiq olunur</label>
                                <select id="cardRuleTarget" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                    <option value="all">Bütün müştərilər</option>
                                    <option value="new">Yalnız yeni müştərilər</option>
                                </select>
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Status</label>
                                <select id="cardRuleStatus" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                    <option value="active">Aktiv</option>
                                    <option value="inactive">Qeyri-aktiv</option>
                                </select>
                            </div>
                        </div>

                        <!-- Kart dizaynı / Rəng stili -->
                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Kart dizaynı / Rəng stili</label>
                            <select id="cardRuleColor" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                <option value="slate">Klassik Qrafit</option>
                                <option value="silver">Gümüş</option>
                                <option value="amber">Qızıl</option>
                                <option value="purple">Bənövşəyi</option>
                                <option value="emerald">Zümrüd</option>
                                <option value="rose">Rubin</option>
                            </select>
                        </div>

                        <!-- Modal Actions -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeLoyaltyCardRuleModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: LOYALTY CARD & RULE FILTERS (LOYALLIQ FİLTRLƏRİ)
            =========================================== -->
            <div id="bizLoyaltyCardRuleFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeLoyaltyCardRuleFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    <!-- Clean Modal Header (GEMINI.md compliant: text only on left, close ✕ on right) -->
                    ${ZeyvoUI.modalHeader({ title: "Kart və qayda filtrləri", description: "Proqram tipi, status və auditoriya üzrə seçim", onClose: "BusinessDashboardView.closeLoyaltyCardRuleFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Proqram tipi -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Proqram tipi</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="lcrFilterTypeBtn_all" onclick="BusinessDashboardView.selectLcrFilterType('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="lcrFilterTypeBtn_discount" onclick="BusinessDashboardView.selectLcrFilterType('discount')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Endirim</span>
                                </button>
                                <button type="button" id="lcrFilterTypeBtn_cashback" onclick="BusinessDashboardView.selectLcrFilterType('cashback')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Keşbek</span>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Status -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Status</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="lcrFilterStatusBtn_all" onclick="BusinessDashboardView.selectLcrFilterStatus('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="lcrFilterStatusBtn_active" onclick="BusinessDashboardView.selectLcrFilterStatus('active')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Aktiv</span>
                                </button>
                                <button type="button" id="lcrFilterStatusBtn_inactive" onclick="BusinessDashboardView.selectLcrFilterStatus('inactive')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Qeyri-aktiv</span>
                                </button>
                            </div>
                        </div>

                        <!-- 3. Kimlərə tətbiq olunur (Auditoriya) -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Kimlərə tətbiq olunur</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="lcrFilterTargetBtn_all" onclick="BusinessDashboardView.selectLcrFilterTarget('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="lcrFilterTargetBtn_all_clients" onclick="BusinessDashboardView.selectLcrFilterTarget('all_clients')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Bütün müştərilər</span>
                                </button>
                                <button type="button" id="lcrFilterTargetBtn_new" onclick="BusinessDashboardView.selectLcrFilterTarget('new')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Yalnız yeni</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Actions -->
                    <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
                        <button type="button" onclick="BusinessDashboardView.resetLcrModalFilters()" class="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition cursor-pointer">
                            Sıfırla
                        </button>
                        <button type="button" onclick="BusinessDashboardView.applyLcrModalFilters()" class="px-5 py-2.5 rounded-xl bg-[#101114] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer">
                            Tətbiq et
                        </button>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: LOYALTY PROGRAM SETTINGS
            =========================================== -->
            <div id="bizLoyaltySettingsModal" onclick="if(event.target === this) BusinessDashboardView.closeLoyaltySettingsModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    <!-- Clean Modal Header (GEMINI.md strictly compliant: text only, no icons) -->
                    ${ZeyvoUI.modalHeader({ title: "Loyallıq Proqramı Qaydaları", description: "Keşbek dərəcəsi, bonus məzənnəsi və istifadə limitləri", onClose: "BusinessDashboardView.closeLoyaltySettingsModal()" })}

                    <!-- Form Body -->
                    <form onsubmit="BusinessDashboardView.handleSaveLoyaltySettings(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <!-- Program Active Toggle -->
                        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                            <div>
                                <span class="font-bold text-slate-900 block text-xs">Keşbek proqramının statusu</span>
                                <span class="text-[11px] text-slate-500 font-normal block mt-0.5">Müştərilərin qəbullardan bonus qazanmasını aktivləşdirin</span>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" id="loyaltySettingEnabled" class="sr-only peer">
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                            </label>
                        </div>

                        <!-- Grid: Cashback % and Point Value -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Keşbek dərəcəsi (%)</label>
                                <div class="relative">
                                    <input type="number" id="loyaltySettingCashbackPercent" min="1" max="100" step="1" required class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                    <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">%</span>
                                </div>
                                <span class="text-[10px] text-slate-400">Hər ödənilən çekdən geri qayıdan faiz</span>
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">1 Balın dəyəri (₼)</label>
                                <div class="relative">
                                    <input type="number" id="loyaltySettingPointValue" min="0.1" max="100" step="0.01" required class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                    <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">₼</span>
                                </div>
                                <span class="text-[10px] text-slate-400">1 bonus balının manat qarşılığı</span>
                            </div>
                        </div>

                        <!-- Grid: Max Pay % and Expiry Days -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Maksimum ödəniş faizi (%)</label>
                                <div class="relative">
                                    <input type="number" id="loyaltySettingMaxPayPercent" min="5" max="100" step="5" required class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                    <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">%</span>
                                </div>
                                <span class="text-[10px] text-slate-400">Hesabın neçə faizi balla ödənə bilər</span>
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Balların qüvvədə olma müddəti</label>
                                <select id="loyaltySettingExpiryDays" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                    <option value="90">90 gün (3 ay)</option>
                                    <option value="180">180 gün (6 ay)</option>
                                    <option value="365">365 gün (1 il)</option>
                                    <option value="0">Müddətsiz (Yanmır)</option>
                                </select>
                                <span class="text-[10px] text-slate-400">İstifadə edilməyən balların silinmə vaxtı</span>
                            </div>
                        </div>

                        <!-- Gifts / Welcomes -->
                        <div class="pt-2 border-t border-slate-100 space-y-3">
                            <div class="font-bold text-slate-800 text-xs">Hədiyyə və Təbrik bonusları</div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div class="space-y-1">
                                    <label class="block text-[11px] font-semibold text-slate-700">Xoş gəldin bonusu (İlk qəbul)</label>
                                    <div class="relative">
                                        <input type="number" id="loyaltySettingWelcomeBonus" min="0" max="1000" step="1" class="w-full h-9 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                        <span class="absolute right-3 top-2 text-[11px] font-bold text-slate-400">bal</span>
                                    </div>
                                </div>

                                <div class="space-y-1">
                                    <label class="block text-[11px] font-semibold text-slate-700">Ad günü bonusu</label>
                                    <div class="relative">
                                        <input type="number" id="loyaltySettingBirthdayBonus" min="0" max="1000" step="1" class="w-full h-9 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                        <span class="absolute right-3 top-2 text-[11px] font-bold text-slate-400">bal</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal Actions -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeLoyaltySettingsModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: MANUAL BONUS ADJUSTMENT (+ / -)
            =========================================== -->
            <div id="bizLoyaltyAdjustBonusModal" onclick="if(event.target === this) BusinessDashboardView.closeAdjustBonusModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-md w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    <!-- Clean Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: "Bonus Balansı Düzəlişi", description: "Müştərinin hesabına bal əlavə edin və ya silin", onClose: "BusinessDashboardView.closeAdjustBonusModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveBonusAdjustment(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <input type="hidden" id="adjustBonusClientId" value="">

                        <!-- Client Info Card -->
                        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <span class="text-[10px] text-slate-400 font-semibold block">Seçilmiş müştəri</span>
                            <div class="flex items-center justify-between">
                                <span id="adjustBonusClientName" class="font-bold text-slate-900 text-sm"></span>
                                <span id="adjustBonusClientBalance" class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs border border-emerald-200/60"></span>
                            </div>
                            <span id="adjustBonusClientPhone" class="text-xs text-slate-500 font-mono block"></span>
                        </div>

                        <!-- Action Type: Add or Subtract -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold text-slate-700">Əməliyyat növü</label>
                            <div class="grid grid-cols-2 gap-2">
                                <label class="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 has-checked:border-emerald-500 has-checked:bg-emerald-50/60 cursor-pointer transition">
                                    <input type="radio" name="adjustBonusType" value="add" checked class="text-emerald-600 focus:ring-emerald-500">
                                    <span class="font-bold text-xs text-slate-800">+ Bal artır</span>
                                </label>
                                <label class="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 has-checked:border-rose-500 has-checked:bg-rose-50/60 cursor-pointer transition">
                                    <input type="radio" name="adjustBonusType" value="subtract" class="text-rose-600 focus:ring-rose-500">
                                    <span class="font-bold text-xs text-slate-800">- Bal sil</span>
                                </label>
                            </div>
                        </div>

                        <!-- Amount Input -->
                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Dəyişiklik məbləği (Bal / ₼)</label>
                            <div class="relative">
                                <input type="number" id="adjustBonusAmount" min="0.5" max="10000" step="0.5" placeholder="0.00" required class="w-full h-10 px-3 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">bal</span>
                            </div>
                        </div>

                        <!-- Reason -->
                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Səbəb və ya qeyd</label>
                            <input type="text" id="adjustBonusReason" placeholder="Məsələn: Xüsusi mükafat, kompensasiya və ya aksiya" required class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>

                        <!-- Modal Actions -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeAdjustBonusModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Təsdiq et", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: BONUS TRANSACTIONS HISTORY
            =========================================== -->
            <div id="bizLoyaltyBonusHistoryModal" onclick="if(event.target === this) BusinessDashboardView.closeBonusHistoryModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-xl w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    <!-- Clean Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: "Bonus Tarixçəsi", description: "Müştərinin qazanılmış və xərclənmiş ballar üzrə çıxarışı", descriptionId: "bonusHistorySubtitle", onClose: "BusinessDashboardView.closeBonusHistoryModal()" })}

                    <!-- Client Summary Pill -->
                    <div class="py-3 flex items-center justify-between">
                        <div>
                            <span id="bonusHistoryClientName" class="font-bold text-sm text-slate-900 block"></span>
                            <span id="bonusHistoryClientPhone" class="text-xs text-slate-400 font-mono block"></span>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] text-slate-400 font-semibold block">Cari balans</span>
                            <span id="bonusHistoryCurrentBalance" class="text-base font-bold text-emerald-700 font-mono block"></span>
                        </div>
                    </div>

                    <!-- History Table -->
                    <div class="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                        <div class="max-h-80 overflow-y-auto overflow-x-auto">
                            <table class="w-full text-left text-xs min-w-[380px]">
                                <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 sticky top-0 z-10">
                                    <tr>
                                        <th class="p-3">Tarix</th>
                                        <th class="p-3">Əməliyyat</th>
                                        <th class="p-3 text-right">Məbləğ</th>
                                        <th class="p-3 text-right">Qalıq</th>
                                    </tr>
                                </thead>
                                <tbody id="bonusHistoryTableBody" class="divide-y divide-slate-100 font-medium">
                                    <!-- Populated dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Close button -->
                    <div class="pt-4 border-t border-slate-100 flex justify-end">
                        ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeBonusHistoryModal()", size: "md", type: "button" })}
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT GIFT CERTIFICATE
            =========================================== -->
            <!-- ==========================================
                 MODAL: CREATE / EDIT GIFT CARD (HƏDİYYƏ KARTI)
            =========================================== -->
            <div id="bizLoyaltyCertificateModal" onclick="if(event.target === this) BusinessDashboardView.closeCertificateModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    <!-- Clean Modal Header (GEMINI.md compliant: text only on left, close ✕ on right) -->
                    ${ZeyvoUI.modalHeader({ title: "Yeni hədiyyə kartı", titleId: "certModalTitle", description: "Hədiyyə kartının növü, nominalı, qiyməti və istifadə şərtləri", descriptionId: "certModalSubtitle", onClose: "BusinessDashboardView.closeCertificateModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveCertificate(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <input type="hidden" id="certEditId" value="">
                        <input type="hidden" id="gcFormType" value="general">
                        <input type="hidden" id="gcFormColor" value="amber">

                        <!-- 1. Hədiyyə kartının adı * -->
                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Hədiyyə kartının adı *</label>
                            <input type="text" id="certFormName" required placeholder="Məsələn: Standart Hədiyyə Kartı 50 ₼" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>

                        <!-- 2. Hədiyyə kartının tipi (Card selector) -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold text-slate-700">Hədiyyə kartının tipi *</label>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <button type="button" id="gcTypeBtn_general" onclick="BusinessDashboardView.setGiftCardType('general')" class="p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer bg-white border-slate-900 shadow-xs">
                                    <div id="gcTypeRadio_general" class="w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center mt-0.5 shrink-0">
                                        <div class="w-2 h-2 rounded-full bg-slate-900"></div>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="font-bold text-xs text-slate-900">Ümumi kart</div>
                                        <p class="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Xidmətdən asılı deyil, bütün xidmətlər üçün keçərlidir</p>
                                    </div>
                                </button>

                                <button type="button" id="gcTypeBtn_service" onclick="BusinessDashboardView.setGiftCardType('service')" class="p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer bg-slate-50/70 border-slate-200 hover:border-slate-300">
                                    <div id="gcTypeRadio_service" class="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center mt-0.5 shrink-0">
                                        <div class="w-2 h-2 rounded-full bg-transparent"></div>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="font-bold text-xs text-slate-900">Xüsusi xidmət üçün</div>
                                        <p class="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Yalnız seçilmiş konkret xidmət üçün təyin edilir</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- Service selection (via dedicated modal picker) -->
                        <div id="gcServiceSelectContainer" class="hidden space-y-2 p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/70">
                            <div class="flex items-center justify-between">
                                <label class="block text-xs font-bold text-slate-800">Bağlı xidmətlər *</label>
                                <span class="text-[10px] text-slate-400">Yalnız seçilmiş xidmətlər üçün</span>
                            </div>
                            
                            <input type="hidden" id="gcFormServiceIds" value="">
                            <input type="hidden" id="gcFormServiceId" value="">
                            <input type="hidden" id="gcFormServiceName" value="">

                            <!-- Empty state: Button to open modal -->
                            <div id="gcServiceEmptyBox" onclick="BusinessDashboardView.openGiftCardServicePickerModal()" class="w-full min-h-[50px] p-3 rounded-xl bg-white border border-dashed border-amber-300 hover:border-amber-400 hover:bg-amber-50/40 text-slate-600 flex items-center justify-between cursor-pointer transition group">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                                    </div>
                                    <div>
                                        <div class="text-xs font-bold text-slate-800 group-hover:text-amber-900 transition">Xidmət seçin</div>
                                        <div class="text-[11px] text-slate-400">Kataloqdan müvafiq xidmətləri qeyd edin</div>
                                    </div>
                                </div>
                                <span class="px-2.5 py-1 rounded-lg bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-2xs">
                                    Siyahını aç
                                </span>
                            </div>

                            <!-- Selected state: List of chosen services -->
                            <div id="gcServiceSelectedBox" class="hidden space-y-2">
                                <div id="gcSelectedServicesList" class="space-y-1.5 max-h-40 overflow-y-auto pr-0.5">
                                    <!-- Populated dynamically -->
                                </div>

                                <div class="flex items-center justify-between pt-1 border-t border-amber-200/60">
                                    <button type="button" onclick="BusinessDashboardView.openGiftCardServicePickerModal()" class="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                                        <span>Xidmət əlavə et və ya dəyiş</span>
                                    </button>
                                    <button type="button" onclick="BusinessDashboardView.clearAllGiftCardServices()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer">
                                        Təmizlə
                                    </button>
                                </div>
                            </div>

                            <p class="text-[11px] text-slate-500 leading-snug">Müştəri bu kartı təqdim etdikdə yalnız seçilmiş xidmətlər üzrə ödəniş ediləcək.</p>
                        </div>

                        <!-- 3. Nominal (₼) və Satış qiyməti (₼) -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <div class="flex items-center justify-between">
                                    <label class="block text-xs font-bold text-slate-700">Nominal (₼) *</label>
                                    <span class="text-[10px] text-slate-400">Balans dəyəri</span>
                                </div>
                                <div class="relative">
                                    <input type="number" id="gcFormNominal" min="1" step="0.5" required placeholder="50.00" oninput="BusinessDashboardView.onCertNominalInput(this.value)" class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold font-mono text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                    <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">₼</span>
                                </div>
                                <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                                    <button type="button" onclick="BusinessDashboardView.setCertNominalQuick(20)" class="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-[10px] font-semibold hover:border-slate-400 transition cursor-pointer">20 ₼</button>
                                    <button type="button" onclick="BusinessDashboardView.setCertNominalQuick(50)" class="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-[10px] font-semibold hover:border-slate-400 transition cursor-pointer">50 ₼</button>
                                    <button type="button" onclick="BusinessDashboardView.setCertNominalQuick(100)" class="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-[10px] font-semibold hover:border-slate-400 transition cursor-pointer">100 ₼</button>
                                    <button type="button" onclick="BusinessDashboardView.setCertNominalQuick(200)" class="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-[10px] font-semibold hover:border-slate-400 transition cursor-pointer">200 ₼</button>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <div class="flex items-center justify-between">
                                    <label class="block text-xs font-bold text-slate-700">Satış qiyməti (₼) *</label>
                                    <span class="text-[10px] text-slate-400">Ödənilən məbləğ</span>
                                </div>
                                <div class="relative">
                                    <input type="number" id="gcFormSalePrice" min="0" step="0.5" required placeholder="50.00" class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold font-mono text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                    <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">₼</span>
                                </div>
                                <p class="text-[11px] text-slate-400 pt-0.5">Kartı alarkən müştərinin ödəyəcəyi məbləğ</p>
                            </div>
                        </div>

                        <!-- 4. Müddət, gün və İstifadə limiti -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <div class="flex items-center justify-between">
                                    <label class="block text-xs font-bold text-slate-700">Müddət, gün *</label>
                                    <span class="text-[10px] text-slate-400">0 = Müddətsiz</span>
                                </div>
                                <input type="number" id="gcFormDuration" min="0" step="1" required placeholder="90" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                                    <button type="button" onclick="BusinessDashboardView.setCertDurationQuick(30)" class="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-[10px] font-semibold hover:border-slate-400 transition cursor-pointer">30 gün</button>
                                    <button type="button" onclick="BusinessDashboardView.setCertDurationQuick(60)" class="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-[10px] font-semibold hover:border-slate-400 transition cursor-pointer">60 gün</button>
                                    <button type="button" onclick="BusinessDashboardView.setCertDurationQuick(90)" class="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-[10px] font-semibold hover:border-slate-400 transition cursor-pointer">90 gün</button>
                                    <button type="button" onclick="BusinessDashboardView.setCertDurationQuick(0)" class="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-[10px] font-semibold hover:border-slate-400 transition cursor-pointer">Müddətsiz</button>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">İstifadə limiti</label>
                                <select id="gcFormUsageLimit" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                    <option value="unlimited">Limitsiz istifadə</option>
                                    <option value="1">1 dəfəlik (birdəfəlik)</option>
                                    <option value="2">2 dəfə</option>
                                    <option value="3">3 dəfə</option>
                                    <option value="5">5 dəfə</option>
                                    <option value="10">10 dəfə</option>
                                </select>
                                <p class="text-[11px] text-slate-400 pt-0.5">Kart neçə dəfə ziyarət üçün istifadə edilə bilər</p>
                            </div>
                        </div>

                        <!-- 5. Qismən istifadəyə icazə ver -->
                        <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                            <div class="min-w-0 pr-2">
                                <div class="text-xs font-bold text-slate-800">Qismən istifadəyə icazə ver</div>
                                <p class="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">Qismən ödənişdən sonra qalıq hədiyyə kartında saxlanılır.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" id="gcFormAllowPartial" checked class="sr-only peer">
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                            </label>
                        </div>

                        <!-- 6. Satış üçün əlçatandır -->
                        <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                            <div class="min-w-0 pr-2">
                                <div class="text-xs font-bold text-slate-800">Satış üçün əlçatandır</div>
                                <p class="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">Administratorların bu hədiyyə kartı növünü sata bilməsi üçün aktiv edin.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" id="gcFormIsAvailableForSale" checked class="sr-only peer">
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                            </label>
                        </div>

                        <!-- 7. Kart statusu (Aktiv / Qeyri-aktiv) -->
                        <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                            <div class="min-w-0 pr-2">
                                <div class="text-xs font-bold text-slate-800">Kartın statusu (Aktiv)</div>
                                <p class="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">Qeyri-aktiv edildikdə kartın qəbulu və istifadəsi dayandırılır.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" id="gcFormStatus" checked class="sr-only peer">
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                            </label>
                        </div>

                        <!-- 7. Kartın dizayn rəngi -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold text-slate-700">Kartın vizual dizaynı</label>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button type="button" onclick="BusinessDashboardView.setCertColor('amber')" id="gcColorBtn_amber" class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 ring-2 ring-slate-900 ring-offset-2 transition cursor-pointer" title="Amber"></button>
                                <button type="button" onclick="BusinessDashboardView.setCertColor('purple')" id="gcColorBtn_purple" class="w-7 h-7 rounded-full bg-gradient-to-br from-purple-700 to-indigo-900 hover:ring-2 hover:ring-slate-400 transition cursor-pointer" title="Bənövşəyi"></button>
                                <button type="button" onclick="BusinessDashboardView.setCertColor('emerald')" id="gcColorBtn_emerald" class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 hover:ring-2 hover:ring-slate-400 transition cursor-pointer" title="Zümrüd"></button>
                                <button type="button" onclick="BusinessDashboardView.setCertColor('rose')" id="gcColorBtn_rose" class="w-7 h-7 rounded-full bg-gradient-to-br from-rose-500 to-pink-700 hover:ring-2 hover:ring-slate-400 transition cursor-pointer" title="Çəhrayı"></button>
                                <button type="button" onclick="BusinessDashboardView.setCertColor('slate')" id="gcColorBtn_slate" class="w-7 h-7 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 hover:ring-2 hover:ring-slate-400 transition cursor-pointer" title="Qrafit"></button>
                            </div>
                        </div>

                        <!-- Modal Actions -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeCertificateModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: GIFT CARD SERVICE PICKER (HƏDİYYƏ KARTI ÜÇÜN XİDMƏT SEÇİMİ)
            =========================================== -->
            <div id="bizGiftCardServicePickerModal" onclick="if(event.target === this) BusinessDashboardView.closeGiftCardServicePickerModal()" class="hidden fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-800 max-h-[88vh] flex flex-col animate-in fade-in zoom-in-95">
                    <!-- Clean Modal Header (GEMINI.md compliant) -->
                    ${ZeyvoUI.modalHeader({ title: "Xidmət seçimi", description: "Hədiyyə kartının keçərli olacağı xidmətləri qeyd edin", onClose: "BusinessDashboardView.closeGiftCardServicePickerModal()" })}

                    <!-- Search & Filter Category Chips -->
                    <div class="space-y-2.5 shrink-0">
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="gcServicePickerSearchInput"
                                   oninput="BusinessDashboardView.onGcServicePickerSearch(this.value)"
                                   placeholder="Xidmət adı ilə axtarın..."
                                   class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition">
                        </div>

                        <!-- Category filter pills -->
                        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs" id="gcServiceCategoryPills">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <!-- Services List -->
                    <div class="flex-1 overflow-y-auto rounded-xl border border-slate-200/80 bg-slate-50/50 divide-y divide-slate-100 max-h-72" id="gcServiceListContainer">
                        <!-- Populated dynamically -->
                    </div>

                    <!-- Footer actions -->
                    <div class="pt-2 flex items-center justify-between gap-3 shrink-0 border-t border-slate-100">
                        <div class="text-xs text-slate-500 font-medium" id="gcServiceSummaryHint">
                            0 xidmət seçilib
                        </div>
                        <div class="flex items-center gap-2">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeGiftCardServicePickerModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Təsdiq et", onClick: "BusinessDashboardView.confirmGiftCardServiceSelection()", size: "md", type: "button" })}
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: GIFT CARD FILTERS (HƏDİYYƏ KARTI FİLTRLƏRİ)
            =========================================== -->
            <div id="bizLoyaltyGiftCardFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeGiftCardFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: "Hədiyyə kartı filtrləri", description: "Kart tipi, satış vəziyyəti və status üzrə seçim", onClose: "BusinessDashboardView.closeGiftCardFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Kart tipi -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Hədiyyə kartının tipi</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="gcFilterTypeBtn_all" onclick="BusinessDashboardView.selectGiftCardFilterType('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Hamısı</button>
                                <button type="button" id="gcFilterTypeBtn_general" onclick="BusinessDashboardView.selectGiftCardFilterType('general')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Ümumi</button>
                                <button type="button" id="gcFilterTypeBtn_service" onclick="BusinessDashboardView.selectGiftCardFilterType('service')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Xüsusi xidmət</button>
                            </div>
                        </div>

                        <!-- 2. Satış vəziyyəti -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Satış üçün əlçatanlıq</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="gcFilterSaleBtn_all" onclick="BusinessDashboardView.selectGiftCardFilterForSale('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Hamısı</button>
                                <button type="button" id="gcFilterSaleBtn_available" onclick="BusinessDashboardView.selectGiftCardFilterForSale('available')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Satışda aktiv</button>
                                <button type="button" id="gcFilterSaleBtn_unavailable" onclick="BusinessDashboardView.selectGiftCardFilterForSale('unavailable')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Satışda deyil</button>
                            </div>
                        </div>

                        <!-- 3. Status -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Status</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="gcFilterStatusBtn_all" onclick="BusinessDashboardView.selectGiftCardFilterStatus('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Hamısı</button>
                                <button type="button" id="gcFilterStatusBtn_active" onclick="BusinessDashboardView.selectGiftCardFilterStatus('active')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Aktiv</button>
                                <button type="button" id="gcFilterStatusBtn_inactive" onclick="BusinessDashboardView.selectGiftCardFilterStatus('inactive')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Qeyri-aktiv</button>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
                        <button type="button" onclick="BusinessDashboardView.resetGiftCardModalFilters()" class="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition cursor-pointer">
                            Sıfırla
                        </button>
                        <button type="button" onclick="BusinessDashboardView.applyGiftCardModalFilters()" class="px-5 py-2.5 rounded-xl bg-[#101114] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer">
                            Tətbiq et
                        </button>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: REDEEM / USE CERTIFICATE
            =========================================== -->
            <div id="bizLoyaltyUseCertModal" onclick="if(event.target === this) BusinessDashboardView.closeUseCertificateModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-md w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    <!-- Clean Modal Header -->
                    ${ZeyvoUI.modalHeader({ title: "Sertifikatdan İstifadə Et", description: "Xidmət və ya məhsul ödənişini sertifikat balansından silin", onClose: "BusinessDashboardView.closeUseCertificateModal()" })}

                    <form onsubmit="BusinessDashboardView.handleApplyCertificate(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <input type="hidden" id="useCertId" value="">

                        <!-- Certificate Info Card -->
                        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <div class="flex items-center justify-between">
                                <span id="useCertCodeDisplay" class="font-bold font-mono text-slate-900 text-sm"></span>
                                <span id="useCertBalanceDisplay" class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs border border-emerald-200/60"></span>
                            </div>
                            <span id="useCertClientDisplay" class="text-xs text-slate-600 block"></span>
                        </div>

                        <!-- Amount to Deduct -->
                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Silinəcək məbləğ (₼)</label>
                            <div class="relative">
                                <input type="number" id="useCertAmount" min="0.5" step="0.5" required placeholder="0.00" class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">₼</span>
                            </div>
                            <span id="useCertMaxHint" class="text-[10px] text-slate-400"></span>
                        </div>

                        <!-- Note / Service description -->
                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Qəbul və ya xidmət qeydi</label>
                            <input type="text" id="useCertNote" placeholder="Məsələn: Saç kəsimi qəbulu (#BK-108)" required class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>

                        <!-- Modal Actions -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeUseCertificateModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Balansdan çıx", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: CREATE / EDIT SUBSCRIPTION (ABUNƏLİK)
            =========================================== -->
            <div id="bizLoyaltySubscriptionModal" onclick="if(event.target === this) BusinessDashboardView.closeSubscriptionModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    <!-- Clean Modal Header (GEMINI.md compliant - no icon container next to title!) -->
                    ${ZeyvoUI.modalHeader({ title: "Yeni abunəlik", titleId: "subModalTitle", description: "Müştərilər üçün abunəlik paketini tərtib edin", descriptionId: "subModalSubtitle", onClose: "BusinessDashboardView.closeSubscriptionModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveSubscription(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <input type="hidden" id="subEditId" value="">
                        <input type="hidden" id="subFormColor" value="purple">

                        <!-- 1. Abunəlik adı * -->
                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Abunəlik adı *</label>
                            <input type="text" id="subFormName" required placeholder="Məsələn: Kişi Saç & Saqqal Paketi" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>

                        <!-- 2. Ziyarət sayı & Etibarlılıq müddəti (gün) -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1.5">
                                <label class="block text-xs font-bold text-slate-700">Ziyarət sayı</label>
                                <input type="number" id="subFormVisits" min="1" max="1000" step="1" required value="5" placeholder="5" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    <button type="button" onclick="BusinessDashboardView.setSubVisitsQuick(3)" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 transition cursor-pointer">3</button>
                                    <button type="button" onclick="BusinessDashboardView.setSubVisitsQuick(5)" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 transition cursor-pointer">5</button>
                                    <button type="button" onclick="BusinessDashboardView.setSubVisitsQuick(10)" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 transition cursor-pointer">10</button>
                                    <button type="button" onclick="BusinessDashboardView.setSubVisitsQuick(20)" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 transition cursor-pointer">20</button>
                                </div>
                            </div>
                            <div class="space-y-1.5">
                                <div class="flex items-center justify-between">
                                    <label class="block text-xs font-bold text-slate-700">Etibarlılıq müddəti (gün)</label>
                                    <span class="text-[10px] text-slate-400">0 = limitsiz</span>
                                </div>
                                <input type="number" id="subFormDuration" min="0" max="3650" step="1" required value="90" placeholder="90" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    <button type="button" onclick="BusinessDashboardView.setSubDurationQuick(30)" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 transition cursor-pointer">30 gün</button>
                                    <button type="button" onclick="BusinessDashboardView.setSubDurationQuick(60)" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 transition cursor-pointer">60 gün</button>
                                    <button type="button" onclick="BusinessDashboardView.setSubDurationQuick(90)" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 transition cursor-pointer">90 gün</button>
                                    <button type="button" onclick="BusinessDashboardView.setSubDurationQuick(180)" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 transition cursor-pointer">180 gün</button>
                                </div>
                            </div>
                        </div>

                        <!-- 3. Abunəlik qiyməti (₼) -->
                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Abunəlik qiyməti (₼)</label>
                            <div class="relative">
                                <input type="number" id="subFormPrice" min="0" max="50000" step="0.5" required placeholder="80.00" value="80" class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">₼</span>
                            </div>
                        </div>

                        <!-- 4. Yalnız təyin edilmiş xidmətlər (with nested service selection) -->
                        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                            <div class="flex items-start justify-between gap-3">
                                <div>
                                    <div class="text-xs font-bold text-slate-800">Yalnız təyin edilmiş xidmətlər</div>
                                    <p class="text-[11px] text-slate-500 font-normal leading-relaxed mt-0.5">Abunəlik yalnız ona bağlanan xidmətlər üçün istifadə edilə bilər.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer select-none shrink-0 mt-0.5">
                                    <input type="checkbox" id="subFormOnlyAssignedServices" onchange="BusinessDashboardView.toggleSubOnlyAssignedServices(this.checked)" class="sr-only peer" checked>
                                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                                </label>
                            </div>

                            <!-- Services Container when checked -->
                            <div id="subAssignedServicesContainer" class="pt-2 border-t border-slate-200/60 space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-xs font-semibold text-slate-700">Təyin edilmiş xidmətlər: <span id="subSelectedServicesCount" class="font-bold text-slate-900">0</span></span>
                                    <button type="button" onclick="BusinessDashboardView.openSubServicePickerModal()" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-800 font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-2xs">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                                        <span>Xidmətləri seç</span>
                                    </button>
                                </div>
                                <div id="subSelectedServicesList" class="flex flex-wrap gap-1.5 min-h-[30px] pt-1">
                                    <!-- Badges populated dynamically -->
                                </div>
                            </div>
                        </div>

                        <!-- 5. Onlayn əlçatandır -->
                        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3">
                            <div>
                                <div class="text-xs font-bold text-slate-800">Onlayn əlçatandır</div>
                                <p class="text-[11px] text-slate-500 font-normal leading-relaxed mt-0.5">Bu seçim sonradan onlayn qeydiyyatda istifadə olunacaq.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer select-none shrink-0 mt-0.5">
                                <input type="checkbox" id="subFormOnline" class="sr-only peer" checked>
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                            </label>
                        </div>

                        <!-- 6. İstifadə olunmamış ziyarətləri keçir -->
                        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3">
                            <div>
                                <div class="text-xs font-bold text-slate-800">İstifadə olunmamış ziyarətləri keçir</div>
                                <p class="text-[11px] text-slate-500 font-normal leading-relaxed mt-0.5">Abunəlik yenilənəndə qalan ziyarətlər köçürülə bilər.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer select-none shrink-0 mt-0.5">
                                <input type="checkbox" id="subFormRollover" class="sr-only peer" checked>
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                            </label>
                        </div>

                        <!-- 7. Satış üçün əlçatandır -->
                        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3">
                            <div>
                                <div class="text-xs font-bold text-slate-800">Satış üçün əlçatandır</div>
                                <p class="text-[11px] text-slate-500 font-normal leading-relaxed mt-0.5">Administratorların bu abunəlik növünü sata bilməsi üçün aktiv edin.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer select-none shrink-0 mt-0.5">
                                <input type="checkbox" id="subFormForSale" class="sr-only peer" checked>
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                            </label>
                        </div>

                        <!-- 8. Kartın statusu (Aktiv) -->
                        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3">
                            <div>
                                <div class="text-xs font-bold text-slate-800">Kartın statusu (Aktiv)</div>
                                <p class="text-[11px] text-slate-500 font-normal leading-relaxed mt-0.5">Qeyri-aktiv edildikdə abunəlik ümumi siyahıda arxiv kimi saxlanılır.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer select-none shrink-0 mt-0.5">
                                <input type="checkbox" id="subFormStatus" class="sr-only peer" checked>
                                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                            </label>
                        </div>

                        <!-- 9. Vizual dizayn rəngi -->
                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold text-slate-700">Kartın vizual dizaynı</label>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button type="button" onclick="BusinessDashboardView.setSubColor('purple')" id="subColorBtn_purple" class="w-7 h-7 rounded-full bg-gradient-to-br from-purple-700 to-indigo-900 ring-2 ring-slate-900 ring-offset-2 transition cursor-pointer" title="Bənövşəyi"></button>
                                <button type="button" onclick="BusinessDashboardView.setSubColor('amber')" id="subColorBtn_amber" class="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 hover:ring-2 hover:ring-slate-400 transition cursor-pointer" title="Kəhrəba"></button>
                                <button type="button" onclick="BusinessDashboardView.setSubColor('emerald')" id="subColorBtn_emerald" class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 hover:ring-2 hover:ring-slate-400 transition cursor-pointer" title="Zümrüd"></button>
                                <button type="button" onclick="BusinessDashboardView.setSubColor('rose')" id="subColorBtn_rose" class="w-7 h-7 rounded-full bg-gradient-to-br from-rose-500 to-pink-700 hover:ring-2 hover:ring-slate-400 transition cursor-pointer" title="Qızılı qırmızı"></button>
                                <button type="button" onclick="BusinessDashboardView.setSubColor('slate')" id="subColorBtn_slate" class="w-7 h-7 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 hover:ring-2 hover:ring-slate-400 transition cursor-pointer" title="Qrafit"></button>
                            </div>
                        </div>

                        <!-- Modal Actions -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeSubscriptionModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: SUBSCRIPTION SERVICE PICKER
            =========================================== -->
            <div id="bizSubServicePickerModal" onclick="if(event.target === this) BusinessDashboardView.closeSubServicePickerModal()" class="hidden fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-800 max-h-[88vh] flex flex-col animate-in fade-in zoom-in-95">
                    <!-- Clean Modal Header (GEMINI.md compliant) -->
                    ${ZeyvoUI.modalHeader({ title: "Xidmət seçimi", description: "Abunəliyin keçərli olacağı xidmətləri qeyd edin", onClose: "BusinessDashboardView.closeSubServicePickerModal()" })}

                    <!-- Search & Filter Category Chips -->
                    <div class="space-y-2.5 shrink-0">
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="subServicePickerSearchInput"
                                   oninput="BusinessDashboardView.onSubServicePickerSearch(this.value)"
                                   placeholder="Xidmət adı ilə axtarın..."
                                   class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white transition">
                        </div>

                        <!-- Category filter pills -->
                        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs" id="subServiceCategoryPills">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <!-- Services List -->
                    <div class="flex-1 overflow-y-auto rounded-xl border border-slate-200/80 bg-slate-50/50 divide-y divide-slate-100 max-h-72" id="subServiceListContainer">
                        <!-- Populated dynamically -->
                    </div>

                    <!-- Footer actions -->
                    <div class="pt-2 flex items-center justify-between gap-3 shrink-0 border-t border-slate-100">
                        <div class="text-xs text-slate-500 font-medium" id="subServiceSummaryHint">
                            0 xidmət seçilib
                        </div>
                        <div class="flex items-center gap-2">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeSubServicePickerModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Təsdiq et", onClick: "BusinessDashboardView.confirmSubServiceSelection()", size: "md", type: "button" })}
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: SUBSCRIPTION FILTERS
            =========================================== -->
            <div id="bizLoyaltySubFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeSubFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    ${ZeyvoUI.modalHeader({ title: "Abunəlik filtrləri", description: "Satış vəziyyəti, onlayn sifariş və status üzrə filter", onClose: "BusinessDashboardView.closeSubFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Satış vəziyyəti -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Satış üçün əlçatanlıq</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="subFilterSaleBtn_all" onclick="BusinessDashboardView.selectSubFilterSale('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Hamısı</button>
                                <button type="button" id="subFilterSaleBtn_available" onclick="BusinessDashboardView.selectSubFilterSale('available')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Satışda aktiv</button>
                                <button type="button" id="subFilterSaleBtn_unavailable" onclick="BusinessDashboardView.selectSubFilterSale('unavailable')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Satışda deyil</button>
                            </div>
                        </div>

                        <!-- 2. Onlayn sifariş -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Onlayn sifariş</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="subFilterOnlineBtn_all" onclick="BusinessDashboardView.selectSubFilterOnline('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Hamısı</button>
                                <button type="button" id="subFilterOnlineBtn_online" onclick="BusinessDashboardView.selectSubFilterOnline('online')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Onlayn aktiv</button>
                                <button type="button" id="subFilterOnlineBtn_offline" onclick="BusinessDashboardView.selectSubFilterOnline('offline')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Yalnız daxili</button>
                            </div>
                        </div>

                        <!-- 3. Status -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Status</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="subFilterStatusBtn_all" onclick="BusinessDashboardView.selectSubFilterStatus('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Hamısı</button>
                                <button type="button" id="subFilterStatusBtn_active" onclick="BusinessDashboardView.selectSubFilterStatus('active')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Aktiv</button>
                                <button type="button" id="subFilterStatusBtn_inactive" onclick="BusinessDashboardView.selectSubFilterStatus('inactive')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold">Qeyri-aktiv</button>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
                        <button type="button" onclick="BusinessDashboardView.resetSubModalFilters()" class="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition cursor-pointer">
                            Sıfırla
                        </button>
                        <button type="button" onclick="BusinessDashboardView.applySubModalFilters()" class="px-5 py-2.5 rounded-xl bg-[#101114] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer">
                            Tətbiq et
                        </button>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: TOP-UP CLIENT DEPOSIT (MƏDAXİL)
            =========================================== -->
            <div id="bizLoyaltyDepositTopupModal" onclick="if(event.target === this) BusinessDashboardView.closeDepositTopupModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-md w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    ${ZeyvoUI.modalHeader({ title: "Depozit Balansını Artır", description: "Müştərinin avans hesabına mədaxil əlavə edin", onClose: "BusinessDashboardView.closeDepositTopupModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveDepositTopup(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <input type="hidden" id="depositTopupClientId" value="">

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Müştəri adı</label>
                            <input type="text" id="depositTopupClientName" required placeholder="Ad və Soyad" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Əlaqə telefonu</label>
                            <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center overflow-hidden focus-within:border-slate-800 focus-within:ring-2 focus-within:ring-[#FFDD2D]/40 focus-within:bg-white transition">
                                <div class="flex items-center gap-1.5 px-3 bg-slate-100/90 border-r border-slate-200 h-full select-none shrink-0">
                                    <span class="inline-flex items-center justify-center w-5 h-3.5 rounded-[2px] overflow-hidden shrink-0 shadow-xs border border-slate-200">
                                        <svg viewBox="0 0 1200 600" class="w-full h-full object-cover"><rect width="1200" height="200" fill="#00B5E2"/><rect y="200" width="1200" height="200" fill="#EF3340"/><rect y="400" width="1200" height="200" fill="#509E2F"/><circle cx="585" cy="300" r="60" fill="#ffffff"/><circle cx="600" cy="300" r="48" fill="#EF3340"/><polygon points="630,300 645,304 656,295 655,308 668,312 656,316 655,329 645,320 630,324 639,312" fill="#ffffff"/></svg>
                                    </span>
                                    <span class="text-xs font-bold text-slate-800 tracking-tight">+994</span>
                                </div>
                                <input type="tel" id="depositTopupPhone" maxlength="15" placeholder="(50) 000-00-00" oninput="App.formatAzPhone ? App.formatAzPhone(this) : null" class="w-full h-full px-3 bg-transparent text-xs font-semibold text-slate-900 outline-none">
                            </div>
                        </div>

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Mədaxil məbləği (₼)</label>
                            <div class="relative">
                                <input type="number" id="depositTopupAmount" min="1" max="10000" step="1" required placeholder="0.00" class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">₼</span>
                            </div>
                        </div>

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Ödəniş üsulu</label>
                            <select id="depositTopupMethod" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                <option value="Nağd">Nağd ödəniş</option>
                                <option value="Bank kartı / Terminal">Bank kartı / Terminal</option>
                                <option value="Hesaba köçürmə">Bank köçürməsi</option>
                            </select>
                        </div>

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Qeyd</label>
                            <input type="text" id="depositTopupNote" placeholder="Məs: İlkin avans ödənişi" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>

                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeDepositTopupModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Balansı artır", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: DEDUCT FROM DEPOSIT (MƏXARİC)
            =========================================== -->
            <div id="bizLoyaltyDepositSpendModal" onclick="if(event.target === this) BusinessDashboardView.closeDepositSpendModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-md w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    ${ZeyvoUI.modalHeader({ title: "Depozitdən Ödəniş Çıx", description: "Xidmət və ya məhsul haqqını depozit balansından silin", onClose: "BusinessDashboardView.closeDepositSpendModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveDepositSpend(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <input type="hidden" id="depositSpendId" value="">

                        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <div class="flex items-center justify-between">
                                <span id="depositSpendClientName" class="font-bold text-slate-900 text-sm"></span>
                                <span id="depositSpendCurrentBalance" class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs border border-emerald-200/60"></span>
                            </div>
                            <span id="depositSpendClientPhone" class="text-xs text-slate-500 font-mono block"></span>
                        </div>

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Silinəcək məbləğ (₼)</label>
                            <div class="relative">
                                <input type="number" id="depositSpendAmount" min="0.5" step="0.5" required placeholder="0.00" class="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                                <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400">₼</span>
                            </div>
                            <span id="depositSpendMaxHint" class="text-[10px] text-slate-400"></span>
                        </div>

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Qəbul və ya xidmət qeydi</label>
                            <input type="text" id="depositSpendNote" placeholder="Məs: Saç boyama və kəsim xidməti (#BK-125)" required class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>

                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeDepositSpendModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Balansdan çıx", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL: DEPOSIT TRANSACTION HISTORY
            =========================================== -->
            <div id="bizLoyaltyDepositHistoryModal" onclick="if(event.target === this) BusinessDashboardView.closeDepositHistoryModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-xl w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    ${ZeyvoUI.modalHeader({ title: "Depozit Əməliyyat Tarixçəsi", description: "Müştərinin depozit balansı üzrə bütün mədaxil və məxaric hərəkətləri", onClose: "BusinessDashboardView.closeDepositHistoryModal()" })}

                    <div class="py-3 flex items-center justify-between">
                        <div>
                            <span id="depHistoryClientName" class="font-bold text-sm text-slate-900 block"></span>
                            <span id="depHistoryClientPhone" class="text-xs text-slate-400 font-mono block"></span>
                        </div>
                        <div class="text-right">
                            <span class="text-[10px] text-slate-400 font-semibold block">Cari depozit</span>
                            <span id="depHistoryCurrentBalance" class="text-base font-bold text-emerald-700 font-mono block"></span>
                        </div>
                    </div>

                    <div class="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                        <div class="max-h-80 overflow-y-auto overflow-x-auto">
                            <table class="w-full text-left text-xs min-w-[380px]">
                                <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 sticky top-0 z-10">
                                    <tr>
                                        <th class="p-3">Tarix</th>
                                        <th class="p-3">Əməliyyat / Üsul</th>
                                        <th class="p-3 text-right">Məbləğ</th>
                                        <th class="p-3 text-right">Qalıq</th>
                                    </tr>
                                </thead>
                                <tbody id="depHistoryTableBody" class="divide-y divide-slate-100 font-medium"></tbody>
                            </table>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-slate-100 flex justify-end">
                        ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeDepositHistoryModal()", size: "md", type: "button" })}
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL 1: CREATE / EDIT MARKETING CAMPAIGN
            =========================================== -->
            <div id="bizMarketingCampaignModal" onclick="if(event.target === this) BusinessDashboardView.closeMarketingCampaignModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    ${ZeyvoUI.modalHeader({ title: "Yeni Kampaniya", titleId: "mktCampaignModalTitle", description: "SMS və WhatsApp bildiriş kampaniyasının parametrləri", descriptionId: "mktCampaignModalSubtitle", onClose: "BusinessDashboardView.closeMarketingCampaignModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveMarketingCampaign(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <input type="hidden" id="mktCampaignEditId" value="">

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Kampaniyanın adı <span class="text-rose-500">*</span></label>
                            <input type="text" id="mktCampaignName" required placeholder="Məs: Ad günü təbriki və 15% endirim" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Kanal</label>
                                <select id="mktCampaignChannel" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                    <option value="whatsapp">WhatsApp Bildirişi</option>
                                    <option value="sms">SMS Mesajı</option>
                                </select>
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Kampaniya növü</label>
                                <select id="mktCampaignType" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                    <option value="automated">Avtomatik zəncir (Trigger)</option>
                                    <option value="broadcast">Birdəfəlik kütləvi göndəriş</option>
                                </select>
                            </div>
                        </div>

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Hədəf auditoriya / Seqment</label>
                            <select id="mktCampaignTarget" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                <option value="all">Bütün müştərilər</option>
                                <option value="birthday">Ad günü yaxınlaşanlar (3 gün əvvəl)</option>
                                <option value="inactive_45">Passiv müştərilər (45+ gündür gəlməyənlər)</option>
                                <option value="vip">VIP daimi müştərilər</option>
                                <option value="new">Yeni qeydiyyatdan keçənlər</option>
                            </select>
                        </div>

                        <div class="space-y-1.5">
                            <div class="flex items-center justify-between">
                                <label class="block text-xs font-bold text-slate-700">Mesaj mətni <span class="text-rose-500">*</span></label>
                                <span class="text-[11px] text-slate-400">Dəyişənləri əlavə edin</span>
                            </div>
                            <textarea id="mktCampaignMessage" rows="4" required placeholder="Salam, {ad}! Sizə xüsusi hədiyyəmiz var..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-black focus:bg-white transition"></textarea>
                            <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                                <span class="text-[10px] text-slate-400 font-semibold">Teqlər:</span>
                                <button type="button" onclick="BusinessDashboardView.insertMarketingVariable('{ad}')" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-mono transition cursor-pointer">{ad}</button>
                                <button type="button" onclick="BusinessDashboardView.insertMarketingVariable('{salon}')" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-mono transition cursor-pointer">{salon}</button>
                                <button type="button" onclick="BusinessDashboardView.insertMarketingVariable('{promokod}')" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-mono transition cursor-pointer">{promokod}</button>
                                <button type="button" onclick="BusinessDashboardView.insertMarketingVariable('{vaxt}')" class="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-mono transition cursor-pointer">{vaxt}</button>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Göndərilmə rejimi</label>
                                <select id="mktCampaignSchedule" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                    <option value="auto">Avtomatik qrafik üzrə</option>
                                    <option value="immediate">Təsdiqdən dərhal sonra</option>
                                    <option value="draft">Yalnız qaralama kimi saxla</option>
                                </select>
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Status</label>
                                <select id="mktCampaignStatus" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                    <option value="active">Aktiv</option>
                                    <option value="inactive">Qeyri-aktiv</option>
                                    <option value="draft">Qaralama</option>
                                </select>
                            </div>
                        </div>

                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeMarketingCampaignModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL 2: CREATE / EDIT MARKETING PROMOCODE
            =========================================== -->
            <div id="bizMarketingPromocodeModal" onclick="if(event.target === this) BusinessDashboardView.closeMarketingPromocodeModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    ${ZeyvoUI.modalHeader({ title: "Yeni Promokod", titleId: "mktPromoModalTitle", description: "Endirim promokodunun şərtləri və istifadə limiti", descriptionId: "mktPromoModalSubtitle", onClose: "BusinessDashboardView.closeMarketingPromocodeModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveMarketingPromocode(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <input type="hidden" id="mktPromoEditId" value="">

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Promokod <span class="text-rose-500">*</span></label>
                                <input type="text" id="mktPromoCode" required placeholder="Məs: YAY2026" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Kampaniya təsviri</label>
                                <input type="text" id="mktPromoName" placeholder="Məs: Yay endirimi kampaniyası" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Endirim növü</label>
                                <select id="mktPromoDiscountType" onchange="BusinessDashboardView.onPromoDiscountTypeChange(this.value)" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                    <option value="percent">Faizlə endirim (%)</option>
                                    <option value="fixed">Sabit məbləğ (₼)</option>
                                </select>
                            </div>

                            <div class="space-y-1">
                                <label id="mktPromoDiscountLabel" class="block text-xs font-bold text-slate-700">Endirim miqdarı (%) <span class="text-rose-500">*</span></label>
                                <input type="number" id="mktPromoDiscountValue" required min="1" max="100" step="1" value="15" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Min. sifariş məbləği (₼)</label>
                                <input type="number" id="mktPromoMinOrder" min="0" step="1" value="30" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">İstifadə limiti (0 = limitsiz)</label>
                                <input type="number" id="mktPromoMaxUsage" min="0" step="1" value="100" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Başlama tarixi</label>
                                ${BusinessDashboardView.renderZeyvoDateField({ id: 'mktPromoStartDate', value: '2026-10-01' })}
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Bitmə tarixi</label>
                                ${BusinessDashboardView.renderZeyvoDateField({ id: 'mktPromoEndDate', value: '2026-12-31' })}
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Xidmət təyinatı</label>
                                <select id="mktPromoServiceScope" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                    <option value="all">Bütün xidmətlər</option>
                                    <option value="specific">Yalnız xüsusi xidmətlər</option>
                                </select>
                            </div>

                            <div class="space-y-1">
                                <label class="block text-xs font-bold text-slate-700">Status</label>
                                <select id="mktPromoStatus" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                    <option value="active">Aktiv</option>
                                    <option value="inactive">Qeyri-aktiv</option>
                                </select>
                            </div>
                        </div>

                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeMarketingPromocodeModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL 3: EDIT REFERRAL PROGRAM RULES
            =========================================== -->
            <div id="bizMarketingReferralRulesModal" onclick="if(event.target === this) BusinessDashboardView.closeEditReferralRulesModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-md w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    ${ZeyvoUI.modalHeader({ title: "Referal Proqramı Qaydaları", description: "«Dostunu gətir» bonus və endirim şərtləri", onClose: "BusinessDashboardView.closeEditReferralRulesModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveReferralRules(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Proqram vəziyyəti</label>
                            <select id="mktReferralEnabled" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer">
                                <option value="true">Proqram aktivdir</option>
                                <option value="false">Proqram deaktivdir</option>
                            </select>
                        </div>

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Dəvət edən müştəriyə bonus (₼)</label>
                            <input type="number" id="mktReferralReward" required min="1" step="0.5" value="10" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                            <p class="text-[11px] text-slate-400">Dostu ilk dəfə xidmət alanda balansına əlavə edilir</p>
                        </div>

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Dəvət olunan dostuna ilk endirim (%)</label>
                            <input type="number" id="mktRefereeDiscount" required min="1" max="100" step="1" value="15" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                            <p class="text-[11px] text-slate-400">İlk sifarişində tətbiq olunacaq endirim faizi</p>
                        </div>

                        <div class="space-y-1">
                            <label class="block text-xs font-bold text-slate-700">Minimum sifariş məbləği (₼)</label>
                            <input type="number" id="mktReferralMinOrder" required min="0" step="1" value="25" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>

                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeEditReferralRulesModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL 4: REPLY TO CUSTOMER REVIEW
            =========================================== -->
            <div id="bizMarketingReviewReplyModal" onclick="if(event.target === this) BusinessDashboardView.closeReplyReviewModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-7 shadow-2xl flex flex-col text-slate-800 max-h-[92vh] overflow-y-auto">
                    <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                    
                    ${ZeyvoUI.modalHeader({ title: "Rəyə Cavab Yaz", titleId: "mktReviewReplyModalTitle", description: "Müştərinin rəyinə rəsmi cavab təqdim edin", descriptionId: "mktReviewReplyModalSubtitle", onClose: "BusinessDashboardView.closeReplyReviewModal()" })}

                    <form onsubmit="BusinessDashboardView.handleSaveReviewReply(event)" class="pt-4 space-y-4 text-xs font-normal">
                        <input type="hidden" id="mktReviewEditId" value="">

                        <!-- Review Quote Preview Card -->
                        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                            <div class="flex items-center justify-between">
                                <span id="mktReviewClientName" class="font-bold text-slate-900 text-xs"></span>
                                <div id="mktReviewRatingStars" class="flex items-center gap-0.5"></div>
                            </div>
                            <div id="mktReviewServiceInfo" class="text-[11px] text-slate-400 font-medium"></div>
                            <p id="mktReviewCommentText" class="text-xs text-slate-700 italic pt-1"></p>
                        </div>

                        <div class="space-y-1.5">
                            <label class="block text-xs font-bold text-slate-700">Salonun rəsmi cavabı <span class="text-rose-500">*</span></label>
                            <textarea id="mktReviewReplyText" rows="4" required placeholder="Dəyərli rəyiniz üçün təşəkkür edirik..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-black focus:bg-white transition"></textarea>
                        </div>

                        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeReplyReviewModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Cavabı göndər", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>

            <!-- ==========================================
                 MODAL 5: MARKETING CAMPAIGNS FILTER MODAL
            =========================================== -->
            <div id="bizMarketingCampaignFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeMarketingCampaignFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    <!-- Clean Modal Header (GEMINI.md compliant: text only on left, close ✕ on right) -->
                    ${ZeyvoUI.modalHeader({ title: "Kampaniya filtrləri", description: "Kanal, növ və status üzrə seçim", onClose: "BusinessDashboardView.closeMarketingCampaignFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Kanal -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Göndəriş kanalı</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="mktFilterChannelBtn_all" onclick="BusinessDashboardView.selectMarketingCampaignFilterChannel('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="mktFilterChannelBtn_whatsapp" onclick="BusinessDashboardView.selectMarketingCampaignFilterChannel('whatsapp')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">WhatsApp</span>
                                </button>
                                <button type="button" id="mktFilterChannelBtn_sms" onclick="BusinessDashboardView.selectMarketingCampaignFilterChannel('sms')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">SMS</span>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Növ -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Kampaniya növü</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="mktFilterTypeBtn_all" onclick="BusinessDashboardView.selectMarketingCampaignFilterType('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="mktFilterTypeBtn_automated" onclick="BusinessDashboardView.selectMarketingCampaignFilterType('automated')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Avtomatik</span>
                                </button>
                                <button type="button" id="mktFilterTypeBtn_broadcast" onclick="BusinessDashboardView.selectMarketingCampaignFilterType('broadcast')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Kütləvi</span>
                                </button>
                            </div>
                        </div>

                        <!-- 3. Status -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Status</label>
                            <div class="grid grid-cols-4 gap-2">
                                <button type="button" id="mktFilterStatusBtn_all" onclick="BusinessDashboardView.selectMarketingCampaignFilterStatus('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="mktFilterStatusBtn_active" onclick="BusinessDashboardView.selectMarketingCampaignFilterStatus('active')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Aktiv</span>
                                </button>
                                <button type="button" id="mktFilterStatusBtn_inactive" onclick="BusinessDashboardView.selectMarketingCampaignFilterStatus('inactive')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Qeyri-aktiv</span>
                                </button>
                                <button type="button" id="mktFilterStatusBtn_draft" onclick="BusinessDashboardView.selectMarketingCampaignFilterStatus('draft')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Qaralama</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Actions -->
                    <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
                        <button type="button" onclick="BusinessDashboardView.resetMarketingCampaignFilters()" class="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition cursor-pointer">
                            Sıfırla
                        </button>
                        <div class="flex items-center gap-2">
                            ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeMarketingCampaignFilterModal()", size: "md", type: "button" })}
                            <button type="button" onclick="BusinessDashboardView.applyMarketingCampaignFilters()" class="px-5 py-2.5 rounded-xl bg-[#101114] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer">
                                Tətbiq et
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL 6: MARKETING PROMOCODES FILTER MODAL
            =========================================== -->
            <div id="bizMarketingPromoFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeMarketingPromoFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    <!-- Clean Modal Header (GEMINI.md compliant) -->
                    ${ZeyvoUI.modalHeader({ title: "Promokod filtrləri", description: "Endirim növü və status üzrə seçim", onClose: "BusinessDashboardView.closeMarketingPromoFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Endirim növü -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Endirim növü</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="mktFilterPromoTypeBtn_all" onclick="BusinessDashboardView.selectMarketingPromoFilterDiscountType('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="mktFilterPromoTypeBtn_percent" onclick="BusinessDashboardView.selectMarketingPromoFilterDiscountType('percent')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Faizlə (%)</span>
                                </button>
                                <button type="button" id="mktFilterPromoTypeBtn_fixed" onclick="BusinessDashboardView.selectMarketingPromoFilterDiscountType('fixed')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Sabit (₼)</span>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Status -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Status</label>
                            <div class="grid grid-cols-4 gap-2">
                                <button type="button" id="mktFilterPromoStatusBtn_all" onclick="BusinessDashboardView.selectMarketingPromoFilterStatus('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="mktFilterPromoStatusBtn_active" onclick="BusinessDashboardView.selectMarketingPromoFilterStatus('active')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Aktiv</span>
                                </button>
                                <button type="button" id="mktFilterPromoStatusBtn_expired" onclick="BusinessDashboardView.selectMarketingPromoFilterStatus('expired')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Bitmiş</span>
                                </button>
                                <button type="button" id="mktFilterPromoStatusBtn_inactive" onclick="BusinessDashboardView.selectMarketingPromoFilterStatus('inactive')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Qeyri-aktiv</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Actions -->
                    <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
                        <button type="button" onclick="BusinessDashboardView.resetMarketingPromoFilters()" class="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition cursor-pointer">
                            Sıfırla
                        </button>
                        <div class="flex items-center gap-2">
                            ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeMarketingPromoFilterModal()", size: "md", type: "button" })}
                            <button type="button" onclick="BusinessDashboardView.applyMarketingPromoFilters()" class="px-5 py-2.5 rounded-xl bg-[#101114] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer">
                                Tətbiq et
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 MODAL 7: MARKETING REVIEWS FILTER MODAL
            =========================================== -->
            <div id="bizMarketingReviewFilterModal" onclick="if(event.target === this) BusinessDashboardView.closeMarketingReviewFilterModal()" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-fade">
                <div class="bg-white border border-slate-200 rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800">
                    <!-- Clean Modal Header (GEMINI.md compliant) -->
                    ${ZeyvoUI.modalHeader({ title: "Rəy filtrləri", description: "Qiymətləndirmə və cavab statusu üzrə seçim", onClose: "BusinessDashboardView.closeMarketingReviewFilterModal()" })}

                    <div class="space-y-4 text-xs font-normal">
                        <!-- 1. Qiymətləndirmə -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Ulduz dərəcəsi</label>
                            <div class="grid grid-cols-4 gap-2">
                                <button type="button" id="mktFilterReviewRatingBtn_all" onclick="BusinessDashboardView.selectMarketingReviewFilterRating('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="mktFilterReviewRatingBtn_5" onclick="BusinessDashboardView.selectMarketingReviewFilterRating('5')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">5 ulduz</span>
                                </button>
                                <button type="button" id="mktFilterReviewRatingBtn_4" onclick="BusinessDashboardView.selectMarketingReviewFilterRating('4')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">4 ulduz</span>
                                </button>
                                <button type="button" id="mktFilterReviewRatingBtn_low" onclick="BusinessDashboardView.selectMarketingReviewFilterRating('low')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">≤ 3 ulduz</span>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Cavab statusu -->
                        <div class="space-y-2">
                            <label class="block text-slate-700 font-medium">Cavab statusu</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" id="mktFilterReviewStatusBtn_all" onclick="BusinessDashboardView.selectMarketingReviewFilterStatus('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Hamısı</span>
                                </button>
                                <button type="button" id="mktFilterReviewStatusBtn_replied" onclick="BusinessDashboardView.selectMarketingReviewFilterStatus('replied')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Cavablı</span>
                                </button>
                                <button type="button" id="mktFilterReviewStatusBtn_pending" onclick="BusinessDashboardView.selectMarketingReviewFilterStatus('pending')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                                    <span class="text-[11px] font-semibold">Gözləyir</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Actions -->
                    <div class="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
                        <button type="button" onclick="BusinessDashboardView.resetMarketingReviewFilters()" class="px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition cursor-pointer">
                            Sıfırla
                        </button>
                        <div class="flex items-center gap-2">
                            ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeMarketingReviewFilterModal()", size: "md", type: "button" })}
                            <button type="button" onclick="BusinessDashboardView.applyMarketingReviewFilters()" class="px-5 py-2.5 rounded-xl bg-[#101114] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer">
                                Tətbiq et
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 FINANCE MODALS
            =========================================== -->
            ${this.renderFinanceModals()}

            <!-- ==========================================
                 CLIENTS (CRM) MODALS
            =========================================== -->
            ${this.renderClientsModals()}

            <!-- ==========================================
                 POS (KASSA SATIŞI) TERMINAL MODALS
            =========================================== -->
            ${this.renderPosModals()}
        `;
    },

    // ==========================================
    // TAB: WEEKLY HOURLY CALENDAR GRID
    // Replicating media_1790711412850.png in Zeyvo Brand colors
    // ==========================================
        // ==========================================
    // ==========================================
    // APPOINTMENTS & CALENDAR (JOURNAL) MODULE
};
window.BusinessDashboardView = BusinessDashboardView;
