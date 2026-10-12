// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {
    /* =========================================================================
       MARKETING MODULE STATE & METHODS (5 SUB-TABS)
       ========================================================================= */

    marketingActiveTab: 'campaigns',

    // Section 1: Campaigns & Notifications State
    marketingCampaignSearch: '',
    marketingCampaignChannelFilter: 'all',
    marketingCampaignTypeFilter: 'all',
    marketingCampaignStatusFilter: 'all',
    marketingCampaignCurrentPage: 1,
    marketingCampaignPageSize: 10,

    // Section 2: Promocodes State
    marketingPromoSearch: '',
    marketingPromoDiscountTypeFilter: 'all',
    marketingPromoStatusFilter: 'all',
    marketingPromoCurrentPage: 1,
    marketingPromoPageSize: 10,

    // Section 4: Referral State
    marketingReferralSearch: '',
    marketingReferralCurrentPage: 1,
    marketingReferralPageSize: 10,

    // Section 5: Reviews State
    marketingReviewSearch: '',
    marketingReviewRatingFilter: 'all',
    marketingReviewStatusFilter: 'all',
    marketingReviewCurrentPage: 1,
    marketingReviewPageSize: 10,

    // Temp state for Marketing Filter Modals
    tempMktCampaignChannel: 'all',
    tempMktCampaignType: 'all',
    tempMktCampaignStatus: 'all',

    tempMktPromoDiscountType: 'all',
    tempMktPromoStatus: 'all',

    tempMktReviewRating: 'all',
    tempMktReviewStatus: 'all',

    getMarketingData: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_marketing_data_v1'));
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing marketing data:', e);
            }
        }

        const initialData = {
            campaigns: [
                {
                    id: 'cmp_1',
                    name: 'Ad günü təbriki və 15% hədiyyə endirimi',
                    channel: 'whatsapp',
                    type: 'automated',
                    target: 'birthday',
                    targetName: 'Ad günü olanlar',
                    messageText: 'Salam, {ad}! Zeyvo gözəllik salonu Sizi ad gününüz münasibətilə təbrik edir! Sizə 15% xüsusi hədiyyə endirimi təqdim edirik. Kod: {promokod}',
                    schedule: 'auto',
                    status: 'active',
                    sentCount: 164,
                    deliveredCount: 161,
                    convertedCount: 38,
                    createdAt: '2026-09-01'
                },
                {
                    id: 'cmp_2',
                    name: '45 gün gəlməyən müştərilərə xatırlatma',
                    channel: 'whatsapp',
                    type: 'automated',
                    target: 'inactive_45',
                    targetName: 'Passiv müştərilər (45+ gün)',
                    messageText: 'Salam, {ad}! Artıq 45 gündür ki, {salon} salonumuzda qonağımız olmamısınız. Sizi çox darıxmışıq və gözləyirik!',
                    schedule: 'auto',
                    status: 'active',
                    sentCount: 89,
                    deliveredCount: 86,
                    convertedCount: 19,
                    createdAt: '2026-09-05'
                },
                {
                    id: 'cmp_3',
                    name: 'Payız gözəllik kampaniyası - 20% kütləvi aksiya',
                    channel: 'sms',
                    type: 'broadcast',
                    target: 'all',
                    targetName: 'Bütün müştərilər',
                    messageText: 'Hörmətli müştəri, Zeyvo salonunda bütün qulluq və bərbər xidmətlərinə 20% payız endirimi başladı! Kod: PAYIZ2026',
                    schedule: 'immediate',
                    status: 'active',
                    sentCount: 420,
                    deliveredCount: 412,
                    convertedCount: 76,
                    createdAt: '2026-09-15'
                },
                {
                    id: 'cmp_4',
                    name: 'Yeni qeydiyyatdan keçənlərə xoş gəldin bonusu',
                    channel: 'whatsapp',
                    type: 'automated',
                    target: 'new',
                    targetName: 'Yeni qeydiyyatdan keçənlər',
                    messageText: 'Salam, {ad}! Zeyvo ailəsinə xoş gəldiniz! İlk qəbulunuzda 10 ₼ bonus balı balansınıza hədiyyə olundu.',
                    schedule: 'auto',
                    status: 'active',
                    sentCount: 54,
                    deliveredCount: 54,
                    convertedCount: 28,
                    createdAt: '2026-09-20'
                },
                {
                    id: 'cmp_5',
                    name: 'VIP müştərilər üçün qapalı Master-Class dəvəti',
                    channel: 'whatsapp',
                    type: 'broadcast',
                    target: 'vip',
                    targetName: 'VIP daimi müştərilər',
                    messageText: 'Hörmətli {ad}, ən sevimli VIP qonağımız olaraq Sizi şənbə günü keçiriləcək qapalı saç baxımı təqdimatına dəvət edirik.',
                    schedule: 'immediate',
                    status: 'active',
                    sentCount: 38,
                    deliveredCount: 38,
                    convertedCount: 22,
                    createdAt: '2026-09-25'
                },
                {
                    id: 'cmp_6',
                    name: 'Xidmətdən sonra rəy sorğusu və təşəkkür',
                    channel: 'sms',
                    type: 'automated',
                    target: 'all',
                    targetName: 'Bütün müştərilər',
                    messageText: 'Zeyvo salonunu seçdiyiniz üçün təşəkkür edirik! Qəbulunuzu qiymətləndirmək üçün zəhmət olmasa rəyinizi bildirin.',
                    schedule: 'auto',
                    status: 'active',
                    sentCount: 310,
                    deliveredCount: 304,
                    convertedCount: 88,
                    createdAt: '2026-09-10'
                }
            ],
            promocodes: [
                {
                    id: 'pc_1',
                    code: 'ZEYVO20',
                    name: 'Yay gözəllik kampaniyası',
                    discountType: 'percent',
                    discountValue: 20,
                    minOrderAmount: 40.0,
                    maxUsageCount: 100,
                    usedCount: 45,
                    startDate: '2026-06-01',
                    endDate: '2026-11-30',
                    serviceScope: 'all',
                    status: 'active',
                    createdAt: '2026-06-01'
                },
                {
                    id: 'pc_2',
                    code: 'WELCOME10',
                    name: 'İlk qəbul xüsusi təklifi',
                    discountType: 'fixed',
                    discountValue: 10.0,
                    minOrderAmount: 25.0,
                    maxUsageCount: 150,
                    usedCount: 68,
                    startDate: '2026-01-01',
                    endDate: '2026-12-31',
                    serviceScope: 'all',
                    status: 'active',
                    createdAt: '2026-01-01'
                },
                {
                    id: 'pc_3',
                    code: 'PAYIZ2026',
                    name: 'Payız baxım kompleksi',
                    discountType: 'percent',
                    discountValue: 15,
                    minOrderAmount: 35.0,
                    maxUsageCount: 80,
                    usedCount: 28,
                    startDate: '2026-09-01',
                    endDate: '2026-11-30',
                    serviceScope: 'all',
                    status: 'active',
                    createdAt: '2026-09-01'
                },
                {
                    id: 'pc_4',
                    code: 'VIPBEAUTY',
                    name: 'VIP qapalı endirim',
                    discountType: 'percent',
                    discountValue: 25,
                    minOrderAmount: 70.0,
                    maxUsageCount: 30,
                    usedCount: 18,
                    startDate: '2026-08-15',
                    endDate: '2026-12-31',
                    serviceScope: 'specific',
                    status: 'active',
                    createdAt: '2026-08-15'
                },
                {
                    id: 'pc_5',
                    code: 'SUMMEREND',
                    name: 'Avqust ayı endirim kodu',
                    discountType: 'percent',
                    discountValue: 10,
                    minOrderAmount: 20.0,
                    maxUsageCount: 50,
                    usedCount: 50,
                    startDate: '2026-08-01',
                    endDate: '2026-08-31',
                    serviceScope: 'all',
                    status: 'expired',
                    createdAt: '2026-08-01'
                }
            ],
            segments: [
                {
                    id: 'seg_vip',
                    name: 'VIP daimi müştərilər',
                    description: '5+ ziyarət edən və ümumi xərci 300 ₼-dən çox olan sadiq müştərilər',
                    clientCount: 38,
                    avgCheck: 85.0,
                    totalRevenue: 3230.0,
                    color: 'purple',
                    criteria: 'Ziyarət sayı ≥ 5 və Cəmi xərc ≥ 300 ₼'
                },
                {
                    id: 'seg_new',
                    name: 'Yeni müştərilər (Son 30 gün)',
                    description: 'Son 30 gündə ilk dəfə qeydiyyatdan keçib xidmət alanlar',
                    clientCount: 46,
                    avgCheck: 42.0,
                    totalRevenue: 1932.0,
                    color: 'emerald',
                    criteria: 'İlk ziyarət son 30 gün ərzində'
                },
                {
                    id: 'seg_inactive',
                    name: 'Passiv / Yatan müştərilər (45-90 gün)',
                    description: 'Son 45-90 gündür salona təşrif buyurmayan potensial qaytarılacaq müştərilər',
                    clientCount: 29,
                    avgCheck: 50.0,
                    totalRevenue: 1450.0,
                    color: 'amber',
                    criteria: 'Son ziyarətdən 45-90 gün keçib'
                },
                {
                    id: 'seg_lost',
                    name: 'İtirilmiş müştərilər (90+ gün)',
                    description: 'Son 90 gündən çoxdur aktivliyi olmayan, xüsusi təklif tələb edən müştərilər',
                    clientCount: 17,
                    avgCheck: 48.0,
                    totalRevenue: 816.0,
                    color: 'rose',
                    criteria: 'Son ziyarətdən 90 gündən çox keçib'
                },
                {
                    id: 'seg_high',
                    name: 'Yüksək çekli müştərilər',
                    description: 'Hər ziyarətində orta hesabla 80+ ₼ xərcləyən premium müştərilər',
                    clientCount: 22,
                    avgCheck: 110.0,
                    totalRevenue: 2420.0,
                    color: 'blue',
                    criteria: 'Orta sifariş çeki ≥ 80 ₼'
                }
            ],
            referral: {
                enabled: true,
                referrerReward: 10.0,
                refereeDiscount: 15,
                minOrderAmount: 25.0,
                referrers: [
                    {
                        id: 'ref_1',
                        clientName: 'Nigar Quliyeva',
                        phone: '+994 (50) 234-56-78',
                        code: 'NIGAR24',
                        invitedCount: 8,
                        successfulCount: 6,
                        earnedBonus: 60.0,
                        lastInviteDate: '2026-10-02'
                    },
                    {
                        id: 'ref_2',
                        clientName: 'Aygün Məmmədova',
                        phone: '+994 (55) 345-67-89',
                        code: 'AYGUN10',
                        invitedCount: 5,
                        successfulCount: 4,
                        earnedBonus: 40.0,
                        lastInviteDate: '2026-09-29'
                    },
                    {
                        id: 'ref_3',
                        clientName: 'Samir Əliyev',
                        phone: '+994 (70) 567-89-01',
                        code: 'SAMIR07',
                        invitedCount: 4,
                        successfulCount: 3,
                        earnedBonus: 30.0,
                        lastInviteDate: '2026-09-20'
                    },
                    {
                        id: 'ref_4',
                        clientName: 'Elnur Həsənov',
                        phone: '+994 (51) 678-90-12',
                        code: 'ELNUR99',
                        invitedCount: 2,
                        successfulCount: 2,
                        earnedBonus: 20.0,
                        lastInviteDate: '2026-09-15'
                    },
                    {
                        id: 'ref_5',
                        clientName: 'Sevda Qasımova',
                        phone: '+994 (50) 789-01-23',
                        code: 'SEVDA12',
                        invitedCount: 2,
                        successfulCount: 1,
                        earnedBonus: 10.0,
                        lastInviteDate: '2026-09-10'
                    }
                ]
            },
            reviews: [
                {
                    id: 'rev_1',
                    clientName: 'Leyla Əliyeva',
                    phone: '+994 (50) 111-22-33',
                    serviceName: 'Saç kəsimi və ukladka',
                    masterName: 'Aygün Rzayeva',
                    rating: 5,
                    comment: 'Çox razı qaldım, saçım tam istədiyim kimi alındı! Salonun təmizliyi və münasibət də əla idi.',
                    reply: 'Dəyərli rəyiniz üçün təşəkkür edirik! Hər zaman yolunuzu gözləyirik.',
                    date: '2026-10-03 16:40',
                    status: 'published'
                },
                {
                    id: 'rev_2',
                    clientName: 'Rəşad Məmmədov',
                    phone: '+994 (55) 222-33-44',
                    serviceName: 'Saqqal korreksiyası',
                    masterName: 'Murad Qasımov',
                    rating: 5,
                    comment: 'Peşəkar yanaşma, dəqiq vaxtında qəbul etdilər. Təşəkkürlər!',
                    reply: 'Təşəkkür edirik Rəşad bəy! Sizə xidmət etməkdən məmnunuq.',
                    date: '2026-10-02 14:15',
                    status: 'published'
                },
                {
                    id: 'rev_3',
                    clientName: 'Günel İsmayılova',
                    phone: '+994 (70) 333-44-55',
                    serviceName: 'Klassik manikür və gel-lak',
                    masterName: 'Nərmin Məmmədova',
                    rating: 5,
                    comment: 'Dırnaqlarım çox səliqəli və keyfiyyətli oldu. Nərmin xanıma xüsusi təşəkkürlər!',
                    reply: 'Çox sağ olun Günel xanım, növbəti ziyarətinizdə görüşənədək!',
                    date: '2026-09-30 18:20',
                    status: 'published'
                },
                {
                    id: 'rev_4',
                    clientName: 'Fərid Əhmədov',
                    phone: '+994 (50) 444-55-66',
                    serviceName: 'Kişi saç kəsimi',
                    masterName: 'Kamran Əliyev',
                    rating: 4,
                    comment: 'Ümumilikdə yaxşıdır, kəsim bəyənildi. Sadəcə 10 dəqiqə gözləməli oldum.',
                    reply: 'Gözləmə üçün üzr istəyirik Fərid bəy, iş qrafikimizi daha da optimallaşdırırıq.',
                    date: '2026-09-28 11:30',
                    status: 'published'
                },
                {
                    id: 'rev_5',
                    clientName: 'Könül Babayeva',
                    phone: '+994 (55) 555-66-77',
                    serviceName: 'Spa üz baxımı',
                    masterName: 'Zemfira Quliyeva',
                    rating: 5,
                    comment: 'Möhtəşəm dincəldim, dərim parlaq və təravətli oldu. Hamıya tövsiyə edirəm!',
                    reply: '',
                    date: '2026-09-25 15:00',
                    status: 'published'
                }
            ]
        };

        if (this.storageKey('zeyvo_marketing_data_v1') !== 'zeyvo_marketing_data_v1') {
            initialData.campaigns = [];
            initialData.promocodes = [];
            initialData.reviews = [];
        }
        this.saveMarketingData(initialData);
        return initialData;
    },

    saveMarketingData: function(data) {
        localStorage.setItem(this.storageKey('zeyvo_marketing_data_v1'), JSON.stringify(data));
    },

    getMarketingBadgeCount: function() {
        const data = this.getMarketingData();
        const activeCampaigns = (data.campaigns || []).filter(c => c.status === 'active').length;
        const activePromos = (data.promocodes || []).filter(p => p.status === 'active').length;
        return activeCampaigns + activePromos;
    },

    refreshMarketingCanvas: function() {
        const container = document.getElementById('bizCanvasBody');
        if (container) {
            this.activeTab = 'marketing';
            container.innerHTML = this.renderMarketingModule();
        }
    },

    switchMarketingSubTab: function(subTab) {
        this.marketingActiveTab = subTab;
        window.location.hash = '#/business/marketing/' + subTab;
        this.refreshMarketingCanvas();

        const h1 = document.getElementById('bizCanvasTitle');
        if (h1) h1.textContent = this.getTabTitle();
        this.render();
    },

    /* =========================================================================
       MARKETING MAIN CONTAINER (5 SUB-TABS)
       ========================================================================= */

    renderMarketingModule: function() {
        const data = this.getMarketingData();
        const sub = this.marketingActiveTab || 'campaigns';

        const campaignsCount = (data.campaigns || []).filter(c => c.status === 'active').length;
        const promocodesCount = (data.promocodes || []).filter(p => p.status === 'active').length;
        const segmentsCount = (data.segments || []).length;
        const referrersCount = ((data.referral && data.referral.referrers) || []).length;
        const reviewsCount = (data.reviews || []).length;

        const subTabs = [
            { id: 'campaigns', label: 'Kampaniyalar və bildirişlər', badge: campaignsCount },
            { id: 'promocodes', label: 'Promokodlar', badge: promocodesCount },
            { id: 'segments', label: 'Müştəri seqmentləri', badge: segmentsCount },
            { id: 'referral', label: 'Referal proqramı', badge: referrersCount },
            { id: 'reviews', label: 'Rəylər və reputasiya', badge: reviewsCount }
        ];

        let contentHtml = '';
        if (sub === 'promocodes') {
            contentHtml = this.renderMarketingPromocodesSubTab(data);
        } else if (sub === 'segments') {
            contentHtml = this.renderMarketingSegmentsSubTab(data);
        } else if (sub === 'referral') {
            contentHtml = this.renderMarketingReferralSubTab(data);
        } else if (sub === 'reviews') {
            contentHtml = this.renderMarketingReviewsSubTab(data);
        } else {
            contentHtml = this.renderMarketingCampaignsSubTab(data);
        }

        return `
            <div class="max-w-7xl mx-auto px-4 py-5 sm:px-7 sm:py-7 space-y-6">
                <!-- SUB-TABS NAVIGATION (Unified Segmented Control) -->
                <div>
                    ${this.renderSegmentedTabs({
                        tabs: subTabs,
                        activeId: sub,
                        onSelect: 'BusinessDashboardView.switchMarketingSubTab'
                    })}
                </div>

                <!-- SUB-TAB CONTENT -->
                <div id="bizMarketingSubContent">
                    ${contentHtml}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 1: KAMPANİYALAR VƏ BİLDİRİŞLƏR (CAMPAIGNS & NOTIFICATIONS)
       ========================================================================= */

    renderMarketingCampaignsSubTab: function(data) {
        const campaigns = data.campaigns || [];

        // KPI metrics
        const activeCount = campaigns.filter(c => c.status === 'active').length;
        const totalSent = campaigns.reduce((sum, c) => sum + (c.sentCount || 0), 0);
        const totalDelivered = campaigns.reduce((sum, c) => sum + (c.deliveredCount || 0), 0);
        const deliveryRate = totalSent > 0 ? Math.round((totalDelivered / totalSent) * 100) : 100;
        const automatedCount = campaigns.filter(c => c.type === 'automated').length;

        // Search & Filters
        const query = (this.marketingCampaignSearch || '').toLowerCase().trim();
        const channelFilter = this.marketingCampaignChannelFilter || 'all';
        const typeFilter = this.marketingCampaignTypeFilter || 'all';
        const statusFilter = this.marketingCampaignStatusFilter || 'all';

        let activeFilterCount = 0;
        if (channelFilter !== 'all') activeFilterCount++;
        if (typeFilter !== 'all') activeFilterCount++;
        if (statusFilter !== 'all') activeFilterCount++;

        let filtered = campaigns.filter(item => {
            if (channelFilter !== 'all' && item.channel !== channelFilter) return false;
            if (typeFilter !== 'all' && item.type !== typeFilter) return false;
            if (statusFilter !== 'all' && item.status !== statusFilter) return false;
            if (!query) return true;
            return (item.name || '').toLowerCase().includes(query) || (item.messageText || '').toLowerCase().includes(query);
        });

        // Pagination
        const totalItems = filtered.length;
        const pageSize = this.marketingCampaignPageSize || 10;
        const currentPage = Math.min(this.marketingCampaignCurrentPage || 1, Math.max(1, Math.ceil(totalItems / pageSize)));
        const startIndex = (currentPage - 1) * pageSize;
        const paginated = filtered.slice(startIndex, startIndex + pageSize);

        return `
            <div class="space-y-6">
                <!-- 1. KPI SUMMARY CARDS -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Aktiv kampaniyalar</span>
                            <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${activeCount} <span class="text-xs font-sans font-semibold text-slate-500">ədəd</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">İşlək bildiriş kampaniyaları</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Cəmi bildiriş</span>
                            <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalSent} <span class="text-xs font-sans font-semibold text-slate-500">mesaj</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Müştərilərə göndərilib</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Çatdırılma nisbəti</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-emerald-700 leading-tight">
                                ${deliveryRate}%
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">${totalDelivered} mesaj uğurla çatdı</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Avtomatik zəncirlər</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${automatedCount} <span class="text-xs font-sans font-semibold text-slate-500">zəncir</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Avtomatik işləyən ssenarilər</p>
                        </div>
                    </div>
                </div>

                <!-- 2. FILTER & SEARCH TOOLBAR -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <!-- Search Input -->
                        <div class="relative flex-1">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="marketingCampaignSearchInput"
                                   placeholder="Kampaniya adı və ya mətni ilə axtarın..."
                                   value="${this.escapeHtml(this.marketingCampaignSearch || '')}"
                                   oninput="BusinessDashboardView.onMarketingCampaignSearch(this.value)"
                                   class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                            ${this.marketingCampaignSearch ? `
                                <button type="button" onclick="BusinessDashboardView.clearMarketingCampaignSearch()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer" title="Təmizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            ` : ''}
                        </div>

                        <!-- Filter Modal Trigger Button -->
                        <button type="button" onclick="BusinessDashboardView.openMarketingCampaignFilterModal()" class="h-11 px-4 rounded-2xl bg-white border ${activeFilterCount > 0 ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 bg-amber-50/20' : 'border-slate-200/80 hover:border-slate-300'} text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0">
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
                    ${(activeFilterCount > 0 || this.marketingCampaignSearch) ? `
                        <div class="flex items-center gap-2 flex-wrap pt-1 text-xs">
                            <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                            ${channelFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 text-purple-900 border border-purple-200/70 font-semibold text-[11px]">
                                    <span>Kanal: ${channelFilter === 'whatsapp' ? 'WhatsApp' : 'SMS'}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterMarketingCampaignChannel('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${typeFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Növ: ${typeFilter === 'automated' ? 'Avtomatik zəncir' : 'Kütləvi göndəriş'}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterMarketingCampaignType('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${statusFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/70 font-semibold text-[11px]">
                                    <span>Status: ${statusFilter === 'active' ? 'Aktiv' : (statusFilter === 'inactive' ? 'Qeyri-aktiv' : 'Qaralama')}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterMarketingCampaignStatus('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${this.marketingCampaignSearch ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-[11px]">
                                    <span>Axtarış: "${this.escapeHtml(this.marketingCampaignSearch)}"</span>
                                    <button type="button" onclick="BusinessDashboardView.clearMarketingCampaignSearch()" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            <button type="button" onclick="BusinessDashboardView.resetMarketingCampaignFilters()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer ml-1">
                                Hamısını sıfırla
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- 3. CAMPAIGNS TABLE -->
                <div class="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-slate-600 min-w-[960px]">
                            <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold whitespace-nowrap">
                                <tr>
                                    <th class="py-3 px-4 sm:px-5">Kampaniyanın adı</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Kanal</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Növü</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Hədəf auditoriya</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Çatdırılma</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Status</th>
                                    <th class="py-3 px-4 sm:px-5 text-right whitespace-nowrap">Əməliyyatlar</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-medium">
                                ${paginated.length === 0 ? `
                                    <tr>
                                        <td colspan="7" class="py-12 text-center text-slate-400 text-xs">
                                            Axtarışa uyğun bildiriş kampaniyası tapılmadı
                                        </td>
                                    </tr>
                                ` : paginated.map(item => {
                                    const isWA = item.channel === 'whatsapp';
                                    const isAuto = item.type === 'automated';
                                    const sent = item.sentCount || 0;
                                    const delivered = item.deliveredCount || 0;

                                    return `
                                        <tr class="hover:bg-slate-50/70 transition">
                                            <td class="py-3.5 px-4 sm:px-5 cursor-pointer" onclick="BusinessDashboardView.openAddMarketingCampaignModal('${item.id}')">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-9 h-9 rounded-xl ${isWA ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60' : 'bg-blue-50 text-blue-600 border border-blue-200/60'} flex items-center justify-center shrink-0 shadow-2xs">
                                                        ${isWA ? `
                                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 10-9-9c0 1.61.42 3.12 1.16 4.43L3 21l4.74-1.12A8.96 8.96 0 0012 21z"/></svg>
                                                        ` : `
                                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                                                        `}
                                                    </div>
                                                    <div class="min-w-0">
                                                        <div class="font-bold text-slate-900 hover:text-amber-800 transition text-xs truncate max-w-xs">${this.escapeHtml(item.name)}</div>
                                                        <div class="text-[11px] text-slate-400 truncate max-w-xs">${this.escapeHtml(item.messageText || '')}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${isWA ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60' : 'bg-blue-50 text-blue-800 border border-blue-200/60'} whitespace-nowrap">
                                                    ${isWA ? 'WhatsApp' : 'SMS'}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${isAuto ? 'bg-purple-50 text-purple-700 border border-purple-200/60' : 'bg-slate-100 text-slate-700 border border-slate-200'} whitespace-nowrap">
                                                    ${isAuto ? 'Avtomatik zəncir' : 'Kütləvi göndəriş'}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="text-xs font-semibold text-slate-800 whitespace-nowrap">${item.targetName || item.target || 'Bütün müştərilər'}</span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="font-mono text-xs text-slate-800">
                                                    <strong class="text-emerald-700">${delivered}</strong> <span class="text-slate-400">/ ${sent}</span>
                                                </div>
                                                <div class="text-[10px] text-slate-400 font-normal">Dönüşüm: ${item.convertedCount || 0} nəfər</div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold select-none whitespace-nowrap ${item.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : (item.status === 'draft' ? 'bg-amber-50 text-amber-700 border border-amber-200/60' : 'bg-slate-100 text-slate-600 border border-slate-200')}">
                                                    <span class="w-1.5 h-1.5 rounded-full ${item.status === 'active' ? 'bg-emerald-500' : (item.status === 'draft' ? 'bg-amber-500' : 'bg-slate-400')}"></span>
                                                    <span>${item.status === 'active' ? 'Aktiv' : (item.status === 'draft' ? 'Qaralama' : 'Qeyri-aktiv')}</span>
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                                                <div class="flex items-center justify-end gap-1">
                                                    <button type="button" onclick="BusinessDashboardView.openAddMarketingCampaignModal('${item.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.deleteMarketingCampaign('${item.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Kampaniyanı sil">
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

                    ${this.renderTablePagination({
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        onPageChange: 'BusinessDashboardView.setMarketingCampaignPage',
                        onPageSizeChange: 'BusinessDashboardView.setMarketingCampaignPageSize',
                        itemName: 'kampaniya'
                    })}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 2: PROMOKODLAR VƏ AKSİYALAR (PROMO CODES & PROMOTIONS)
       ========================================================================= */

    renderMarketingPromocodesSubTab: function(data) {
        const promocodes = data.promocodes || [];

        // KPI metrics
        const activeCount = promocodes.filter(p => p.status === 'active').length;
        const totalUsed = promocodes.reduce((sum, p) => sum + (p.usedCount || 0), 0);
        const totalLimit = promocodes.reduce((sum, p) => sum + (p.maxUsageCount || 0), 0);
        const expiredCount = promocodes.filter(p => p.status === 'expired').length;

        // Search & Filters
        const query = (this.marketingPromoSearch || '').toLowerCase().trim();
        const discountTypeFilter = this.marketingPromoDiscountTypeFilter || 'all';
        const statusFilter = this.marketingPromoStatusFilter || 'all';

        let activeFilterCount = 0;
        if (discountTypeFilter !== 'all') activeFilterCount++;
        if (statusFilter !== 'all') activeFilterCount++;

        let filtered = promocodes.filter(p => {
            if (discountTypeFilter !== 'all' && p.discountType !== discountTypeFilter) return false;
            if (statusFilter !== 'all' && p.status !== statusFilter) return false;
            if (!query) return true;
            return (p.code || '').toLowerCase().includes(query) || (p.name || '').toLowerCase().includes(query);
        });

        // Pagination
        const totalItems = filtered.length;
        const pageSize = this.marketingPromoPageSize || 10;
        const currentPage = Math.min(this.marketingPromoCurrentPage || 1, Math.max(1, Math.ceil(totalItems / pageSize)));
        const startIndex = (currentPage - 1) * pageSize;
        const paginated = filtered.slice(startIndex, startIndex + pageSize);

        return `
            <div class="space-y-6">
                <!-- 1. KPI SUMMARY CARDS -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Aktiv promokodlar</span>
                            <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${activeCount} <span class="text-xs font-sans font-semibold text-slate-500">kod</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">İstifadəyə hazır aktiv promokodlar</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Cəmi istifadə</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalUsed} <span class="text-xs font-sans font-semibold text-slate-500">dəfə</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Müştərilər tərəfindən tətbiq edilib</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Maksimum limit</span>
                            <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalLimit} <span class="text-xs font-sans font-semibold text-slate-500">ümumi</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Müəyyən edilmiş ümumi kvota</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Müddəti bitənlər</span>
                            <div class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${expiredCount} <span class="text-xs font-sans font-semibold text-slate-500">kod</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Vaxtı və ya limiti tamamlanıb</p>
                        </div>
                    </div>
                </div>

                <!-- 2. FILTER & SEARCH TOOLBAR -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <!-- Search Input -->
                        <div class="relative flex-1">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="marketingPromoSearchInput"
                                   placeholder="Promokod adı və ya təsviri ilə axtarın..."
                                   value="${this.escapeHtml(this.marketingPromoSearch || '')}"
                                   oninput="BusinessDashboardView.onMarketingPromoSearch(this.value)"
                                   class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                            ${this.marketingPromoSearch ? `
                                <button type="button" onclick="BusinessDashboardView.clearMarketingPromoSearch()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer" title="Təmizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            ` : ''}
                        </div>

                        <!-- Filter Modal Trigger Button -->
                        <button type="button" onclick="BusinessDashboardView.openMarketingPromoFilterModal()" class="h-11 px-4 rounded-2xl bg-white border ${activeFilterCount > 0 ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 bg-amber-50/20' : 'border-slate-200/80 hover:border-slate-300'} text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0">
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
                    ${(activeFilterCount > 0 || this.marketingPromoSearch) ? `
                        <div class="flex items-center gap-2 flex-wrap pt-1 text-xs">
                            <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                            ${discountTypeFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Endirim: ${discountTypeFilter === 'percent' ? 'Faizlə (%)' : 'Sabit məbləğ (₼)'}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterMarketingPromoDiscountType('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${statusFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/70 font-semibold text-[11px]">
                                    <span>Status: ${statusFilter === 'active' ? 'Aktiv' : (statusFilter === 'expired' ? 'Müddəti bitib' : 'Qeyri-aktiv')}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterMarketingPromoStatus('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${this.marketingPromoSearch ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-[11px]">
                                    <span>Axtarış: "${this.escapeHtml(this.marketingPromoSearch)}"</span>
                                    <button type="button" onclick="BusinessDashboardView.clearMarketingPromoSearch()" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            <button type="button" onclick="BusinessDashboardView.resetMarketingPromoFilters()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer ml-1">
                                Hamısını sıfırla
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- 3. PROMOCODES TABLE -->
                <div class="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-slate-600 min-w-[960px]">
                            <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold whitespace-nowrap">
                                <tr>
                                    <th class="py-3 px-4 sm:px-5">Promokod</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Endirim dəyəri</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Şərtlər</th>
                                    <th class="py-3 px-4 whitespace-nowrap">İstifadə / Limit</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Keçərlilik müddəti</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Status</th>
                                    <th class="py-3 px-4 sm:px-5 text-right whitespace-nowrap">Əməliyyatlar</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-medium">
                                ${paginated.length === 0 ? `
                                    <tr>
                                        <td colspan="7" class="py-12 text-center text-slate-400 text-xs">
                                            Axtarışa uyğun promokod tapılmadı
                                        </td>
                                    </tr>
                                ` : paginated.map(p => {
                                    const isPercent = p.discountType === 'percent';
                                    const discountText = isPercent ? `-${p.discountValue}%` : `-${parseFloat(p.discountValue).toFixed(2)} ₼`;
                                    const usagePercent = p.maxUsageCount > 0 ? Math.min(100, Math.round((p.usedCount / p.maxUsageCount) * 100)) : 0;

                                    return `
                                        <tr class="hover:bg-slate-50/70 transition">
                                            <td class="py-3.5 px-4 sm:px-5 cursor-pointer" onclick="BusinessDashboardView.openAddMarketingPromocodeModal('${p.id}')">
                                                <div class="flex items-center gap-2.5">
                                                    <span class="px-2.5 py-1 rounded-lg bg-slate-900 text-[#FFDD2D] font-mono font-bold text-xs border border-slate-800 shadow-2xs">
                                                        ${p.code}
                                                    </span>
                                                    <div class="min-w-0">
                                                        <div class="font-bold text-slate-900 hover:text-amber-800 transition text-xs truncate max-w-xs">${this.escapeHtml(p.name || 'Endirim kampaniyası')}</div>
                                                        <div class="text-[11px] text-slate-400 font-normal">${p.serviceScope === 'specific' ? 'Xüsusi xidmətlər' : 'Bütün xidmətlər'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center px-2.5 py-1 rounded-lg font-mono font-bold text-xs ${isPercent ? 'bg-purple-50 text-purple-700 border border-purple-200/60' : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'} whitespace-nowrap">
                                                    ${discountText}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="text-xs text-slate-800 font-semibold whitespace-nowrap">Min. ${parseFloat(p.minOrderAmount || 0).toFixed(0)} ₼ sifariş</div>
                                                <div class="text-[11px] text-slate-400 font-normal whitespace-nowrap">${p.serviceScope === 'specific' ? 'Təyin edilmiş xidmətlər' : 'Bütün xidmət növləri'}</div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="font-mono text-xs text-slate-800 whitespace-nowrap">
                                                    <strong>${p.usedCount || 0}</strong> <span class="text-slate-400">/ ${p.maxUsageCount > 0 ? p.maxUsageCount : 'Limitsiz'}</span>
                                                </div>
                                                <div class="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
                                                    <div class="h-full bg-emerald-500 rounded-full" style="width: ${usagePercent}%"></div>
                                                </div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="text-xs font-mono text-slate-800 whitespace-nowrap">${p.startDate ? this.formatDateDisplay(p.startDate) : '—'} — ${p.endDate ? this.formatDateDisplay(p.endDate) : '—'}</div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold select-none whitespace-nowrap ${p.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : (p.status === 'expired' ? 'bg-slate-100 text-slate-500 border border-slate-200' : 'bg-rose-50 text-rose-700 border border-rose-200/60')}">
                                                    <span class="w-1.5 h-1.5 rounded-full ${p.status === 'active' ? 'bg-emerald-500' : (p.status === 'expired' ? 'bg-slate-400' : 'bg-rose-500')}"></span>
                                                    <span>${p.status === 'active' ? 'Aktiv' : (p.status === 'expired' ? 'Müddəti bitib' : 'Qeyri-aktiv')}</span>
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                                                <div class="flex items-center justify-end gap-1">
                                                    <button type="button" onclick="BusinessDashboardView.copyPromoCode('${p.code}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Kodu kopyala">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.openAddMarketingPromocodeModal('${p.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.deleteMarketingPromocode('${p.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Promokodu sil">
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

                    ${this.renderTablePagination({
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        onPageChange: 'BusinessDashboardView.setMarketingPromoPage',
                        onPageSizeChange: 'BusinessDashboardView.setMarketingPromoPageSize',
                        itemName: 'promokod'
                    })}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 3: MÜŞTƏRİ SEQMENTLƏRİ (CUSTOMER SEGMENTS)
       ========================================================================= */

    renderMarketingSegmentsSubTab: function(data) {
        const segments = data.segments || [];

        // KPI metrics
        const totalSegments = segments.length;
        const totalClients = segments.reduce((sum, s) => sum + (s.clientCount || 0), 0);
        const vipClients = (segments.find(s => s.id === 'seg_vip') || {}).clientCount || 0;
        const inactiveClients = (segments.find(s => s.id === 'seg_inactive') || {}).clientCount || 0;

        const colorMap = {
            purple: { bg: 'bg-purple-50', border: 'border-purple-200/70', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800' },
            emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200/70', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800' },
            amber: { bg: 'bg-amber-50', border: 'border-amber-200/70', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-900' },
            rose: { bg: 'bg-rose-50', border: 'border-rose-200/70', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800' },
            blue: { bg: 'bg-blue-50', border: 'border-blue-200/70', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' }
        };

        return `
            <div class="space-y-6">
                <!-- 1. KPI SUMMARY CARDS -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Müştəri seqmentləri</span>
                            <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalSegments} <span class="text-xs font-sans font-semibold text-slate-500">qrup</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Avtomatik hesablanan RFM seqmentləri</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Seqmentlənmiş auditoriya</span>
                            <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalClients} <span class="text-xs font-sans font-semibold text-slate-500">nəfər</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Baza üzrə qruplaşdırılmış müştərilər</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">VIP müştərilər</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-emerald-700 leading-tight">
                                ${vipClients} <span class="text-xs font-sans font-semibold text-slate-500">nəfər</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Ən yüksək gəlir gətirən qrup</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Risk qrupu (Passivlər)</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-amber-800 leading-tight">
                                ${inactiveClients} <span class="text-xs font-sans font-semibold text-slate-500">nəfər</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Qaytarılma aksiyası tələb olunur</p>
                        </div>
                    </div>
                </div>

                <!-- 2. SEGMENT CARDS GRID -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${segments.map(s => {
                        const style = colorMap[s.color] || colorMap.purple;
                        return `
                            <div class="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition">
                                <div class="space-y-2.5">
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs font-bold ${style.text} ${style.bg} px-2.5 py-1 rounded-lg border ${style.border}">
                                            ${s.name}
                                        </span>
                                        <span class="font-mono font-bold text-slate-900 text-sm">
                                            ${s.clientCount} nəfər
                                        </span>
                                    </div>
                                    <p class="text-xs text-slate-500 leading-relaxed font-normal">
                                        ${s.description}
                                    </p>
                                    <div class="text-[11px] text-slate-400 pt-1 font-mono">
                                        Şərt: <span class="text-slate-600 font-semibold">${s.criteria}</span>
                                    </div>
                                </div>

                                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        <div class="text-[10px] text-slate-400 font-semibold">Orta çek</div>
                                        <div class="font-mono font-bold text-slate-800 text-xs">${parseFloat(s.avgCheck).toFixed(2)} ₼</div>
                                    </div>
                                    <div>
                                        <div class="text-[10px] text-slate-400 font-semibold">Cəmi gəlir</div>
                                        <div class="font-mono font-bold text-slate-900 text-xs">${parseFloat(s.totalRevenue).toFixed(2)} ₼</div>
                                    </div>
                                    <button type="button" onclick="BusinessDashboardView.openAddMarketingCampaignModal(null, '${s.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-[#FFDD2D] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                                        <span>Kampaniya</span>
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 4: REFERAL PROQRAMI («DOSTUNU GƏTİR»)
       ========================================================================= */

    renderMarketingReferralSubTab: function(data) {
        const referral = data.referral || { enabled: true, referrerReward: 10, refereeDiscount: 15, minOrderAmount: 25, referrers: [] };
        const referrers = referral.referrers || [];

        // KPI metrics
        const totalInvited = referrers.reduce((sum, r) => sum + (r.invitedCount || 0), 0);
        const totalSuccessful = referrers.reduce((sum, r) => sum + (r.successfulCount || 0), 0);
        const totalBonusPaid = referrers.reduce((sum, r) => sum + (r.earnedBonus || 0), 0);
        const conversionRate = totalInvited > 0 ? Math.round((totalSuccessful / totalInvited) * 100) : 0;

        // Search
        const query = (this.marketingReferralSearch || '').toLowerCase().trim();
        let filtered = referrers.filter(r => {
            if (!query) return true;
            return (r.clientName || '').toLowerCase().includes(query) || (r.code || '').toLowerCase().includes(query) || (r.phone || '').includes(query);
        });

        // Pagination
        const totalItems = filtered.length;
        const pageSize = this.marketingReferralPageSize || 10;
        const currentPage = Math.min(this.marketingReferralCurrentPage || 1, Math.max(1, Math.ceil(totalItems / pageSize)));
        const startIndex = (currentPage - 1) * pageSize;
        const paginated = filtered.slice(startIndex, startIndex + pageSize);

        return `
            <div class="space-y-6">
                <!-- 1. REFERRAL PROGRAM SETTINGS BANNER -->
                <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="space-y-1.5">
                        <div class="flex items-center gap-2">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${referral.enabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}">
                                ${referral.enabled ? 'Proqram aktivdir' : 'Deaktivdir'}
                            </span>
                            <h3 class="text-sm sm:text-base font-bold text-white">«Dostunu gətir» referal proqramı</h3>
                        </div>
                        <p class="text-xs text-slate-300 font-normal">
                            Dəvət edən müştəri: <strong class="text-[#FFDD2D] font-mono">${parseFloat(referral.referrerReward).toFixed(2)} ₼ bonus</strong> • Dəvət olunan dost: <strong class="text-[#FFDD2D] font-mono">${referral.refereeDiscount}% endirim</strong> (Min. sifariş: ${parseFloat(referral.minOrderAmount).toFixed(0)} ₼)
                        </p>
                    </div>

                    <button onclick="BusinessDashboardView.openEditReferralRulesModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        <span>Qaydaları redaktə et</span>
                    </button>
                </div>

                <!-- 2. KPI SUMMARY CARDS -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Cəmi dəvətlər</span>
                            <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalInvited} <span class="text-xs font-sans font-semibold text-slate-500">nəfər</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Dost linki ilə göndərilib</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Uğurlu qəbullar</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-emerald-700 leading-tight">
                                ${totalSuccessful} <span class="text-xs font-sans font-semibold text-slate-500">müştəri</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Salona gəlib xidmət aldı</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Ödənilmiş bonuslar</span>
                            <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalBonusPaid.toFixed(2)} ₼
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Dəvət edənlərin balansına köçürüldü</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Dönüşüm nisbəti</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${conversionRate}%
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Dəvətin real müştəriyə çevrilməsi</p>
                        </div>
                    </div>
                </div>

                <!-- 3. TOP REFERRERS TABLE -->
                <div class="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <div class="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h4 class="font-bold text-slate-900 text-sm">Fəal referal müştərilər</h4>
                            <p class="text-xs text-slate-400 font-normal">Dostlarını ən çox salona dəvət edən müştərilərin siyahısı</p>
                        </div>

                        <div class="relative w-full sm:w-64">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text" value="${this.marketingReferralSearch || ''}" oninput="BusinessDashboardView.onMarketingReferralSearch(this.value)" placeholder="Müştəri adı və ya kod ilə axtarış..." class="w-full h-9 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-black focus:bg-white transition">
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-slate-600 min-w-[750px]">
                            <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold whitespace-nowrap">
                                <tr>
                                    <th class="py-3 px-4 sm:px-5">Müştəri</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Referal kodu</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Dəvət sayı</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Uğurlu qəbul</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Qazanılan bonus</th>
                                    <th class="py-3 px-4 sm:px-5 text-right whitespace-nowrap">Son dəvət</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-medium">
                                ${paginated.length === 0 ? `
                                    <tr>
                                        <td colspan="6" class="py-12 text-center text-slate-400 text-xs">
                                            Axtarışa uyğun referal tapılmadı
                                        </td>
                                    </tr>
                                ` : paginated.map(r => `
                                    <tr class="hover:bg-slate-50/70 transition">
                                        <td class="py-3.5 px-4 sm:px-5">
                                            <div class="font-bold text-slate-900 text-xs">${this.escapeHtml(r.clientName)}</div>
                                            <div class="text-[11px] text-slate-400 font-mono font-normal">${r.phone || '—'}</div>
                                        </td>
                                        <td class="py-3.5 px-4 whitespace-nowrap">
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono font-bold text-xs border border-slate-200">
                                                ${r.code}
                                            </span>
                                        </td>
                                        <td class="py-3.5 px-4 whitespace-nowrap">
                                            <span class="font-mono font-bold text-slate-900 text-xs">${r.invitedCount || 0} nəfər</span>
                                        </td>
                                        <td class="py-3.5 px-4 whitespace-nowrap">
                                            <span class="inline-flex items-center gap-1 font-mono font-bold text-emerald-700 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                                                ${r.successfulCount || 0} nəfər
                                            </span>
                                        </td>
                                        <td class="py-3.5 px-4 whitespace-nowrap">
                                            <span class="font-mono font-bold text-slate-900 text-xs">${parseFloat(r.earnedBonus || 0).toFixed(2)} ₼</span>
                                        </td>
                                        <td class="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                                            <span class="text-xs text-slate-500 font-mono">${r.lastInviteDate ? this.formatDateDisplay(r.lastInviteDate) : '—'}</span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    ${this.renderTablePagination({
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        onPageChange: 'BusinessDashboardView.setMarketingReferralPage',
                        onPageSizeChange: 'BusinessDashboardView.setMarketingReferralPageSize',
                        itemName: 'referal'
                    })}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 5: RƏYLƏR VƏ REPUTASİYA (REVIEWS & RATINGS)
       ========================================================================= */

    renderMarketingReviewsSubTab: function(data) {
        const reviews = data.reviews || [];

        // KPI metrics
        const totalReviews = reviews.length;
        const avgRating = totalReviews > 0 ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / totalReviews).toFixed(1) : '5.0';
        const fiveStarCount = reviews.filter(r => r.rating === 5).length;
        const fiveStarPercent = totalReviews > 0 ? Math.round((fiveStarCount / totalReviews) * 100) : 100;
        const repliedCount = reviews.filter(r => r.reply && r.reply.trim().length > 0).length;
        const repliedPercent = totalReviews > 0 ? Math.round((repliedCount / totalReviews) * 100) : 0;

        // Search & Filter
        const query = (this.marketingReviewSearch || '').toLowerCase().trim();
        const ratingFilter = this.marketingReviewRatingFilter || 'all';
        const statusFilter = this.marketingReviewStatusFilter || 'all';

        let activeFilterCount = 0;
        if (ratingFilter !== 'all') activeFilterCount++;
        if (statusFilter !== 'all') activeFilterCount++;

        let filtered = reviews.filter(r => {
            if (ratingFilter === '5' && r.rating !== 5) return false;
            if (ratingFilter === '4' && r.rating !== 4) return false;
            if (ratingFilter === 'low' && r.rating > 3) return false;
            if (statusFilter === 'replied' && (!r.reply || !r.reply.trim())) return false;
            if (statusFilter === 'pending' && r.reply && r.reply.trim()) return false;
            if (!query) return true;
            return (r.clientName || '').toLowerCase().includes(query) || (r.comment || '').toLowerCase().includes(query) || (r.serviceName || '').toLowerCase().includes(query) || (r.masterName || '').toLowerCase().includes(query);
        });

        // Pagination
        const totalItems = filtered.length;
        const pageSize = this.marketingReviewPageSize || 10;
        const currentPage = Math.min(this.marketingReviewCurrentPage || 1, Math.max(1, Math.ceil(totalItems / pageSize)));
        const startIndex = (currentPage - 1) * pageSize;
        const paginated = filtered.slice(startIndex, startIndex + pageSize);

        return `
            <div class="space-y-6">
                <!-- 1. KPI SUMMARY CARDS -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Ortalama reytinq</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <svg class="w-4 h-4 fill-amber-400 text-amber-500" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${avgRating} <span class="text-xs font-sans font-semibold text-slate-400">/ 5.0</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Ümumi müştəri məmnuniyyəti</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Cəmi rəy</span>
                            <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalReviews} <span class="text-xs font-sans font-semibold text-slate-500">rəy</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Müştərilərdən toplanıb</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">5 ulduz nisbəti</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-emerald-700 leading-tight">
                                ${fiveStarPercent}%
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">${fiveStarCount} rəy 5 ulduzdur</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Cavablandırılma faizi</span>
                            <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${repliedPercent}%
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">${repliedCount} rəyə rəsmi cavab verilib</p>
                        </div>
                    </div>
                </div>

                <!-- 2. FILTER & SEARCH TOOLBAR -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <!-- Search Input -->
                        <div class="relative flex-1">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="marketingReviewSearchInput"
                                   placeholder="Müştəri, rəy mətni və ya usta adı ilə axtarın..."
                                   value="${this.escapeHtml(this.marketingReviewSearch || '')}"
                                   oninput="BusinessDashboardView.onMarketingReviewSearch(this.value)"
                                   class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                            ${this.marketingReviewSearch ? `
                                <button type="button" onclick="BusinessDashboardView.clearMarketingReviewSearch()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer" title="Təmizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            ` : ''}
                        </div>

                        <!-- Filter Modal Trigger Button -->
                        <button type="button" onclick="BusinessDashboardView.openMarketingReviewFilterModal()" class="h-11 px-4 rounded-2xl bg-white border ${activeFilterCount > 0 ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 bg-amber-50/20' : 'border-slate-200/80 hover:border-slate-300'} text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0">
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
                    ${(activeFilterCount > 0 || this.marketingReviewSearch) ? `
                        <div class="flex items-center gap-2 flex-wrap pt-1 text-xs">
                            <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                            ${ratingFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Reytinq: ${ratingFilter === '5' ? '5 ulduz' : (ratingFilter === '4' ? '4 ulduz' : '≤ 3 ulduz')}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterMarketingReviewRating('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${statusFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/70 font-semibold text-[11px]">
                                    <span>Status: ${statusFilter === 'replied' ? 'Cavablandırılıb' : 'Cavab gözləyir'}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterMarketingReviewStatus('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${this.marketingReviewSearch ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-[11px]">
                                    <span>Axtarış: "${this.escapeHtml(this.marketingReviewSearch)}"</span>
                                    <button type="button" onclick="BusinessDashboardView.clearMarketingReviewSearch()" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            <button type="button" onclick="BusinessDashboardView.resetMarketingReviewFilters()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer ml-1">
                                Hamısını sıfırla
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- 3. REVIEWS TABLE -->
                <div class="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-slate-600 min-w-[960px]">
                            <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold whitespace-nowrap">
                                <tr>
                                    <th class="py-3 px-4 sm:px-5">Müştəri</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Xidmət & Usta</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Qiymətləndirmə</th>
                                    <th class="py-3 px-4">Rəy və cavab</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Tarix</th>
                                    <th class="py-3 px-4 sm:px-5 text-right whitespace-nowrap">Əməliyyatlar</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-medium">
                                ${paginated.length === 0 ? `
                                    <tr>
                                        <td colspan="6" class="py-12 text-center text-slate-400 text-xs">
                                            Axtarışa uyğun rəy tapılmadı
                                        </td>
                                    </tr>
                                ` : paginated.map(rev => {
                                    const rating = rev.rating || 5;
                                    const hasReply = rev.reply && rev.reply.trim().length > 0;

                                    return `
                                        <tr class="hover:bg-slate-50/70 transition">
                                            <td class="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                                                <div class="font-bold text-slate-900 text-xs">${this.escapeHtml(rev.clientName)}</div>
                                                <div class="text-[11px] text-slate-400 font-mono">${rev.phone || '—'}</div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="font-semibold text-slate-800 text-xs">${this.escapeHtml(rev.serviceName || '—')}</div>
                                                <div class="text-[11px] text-slate-400 font-normal">Usta: ${this.escapeHtml(rev.masterName || '—')}</div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="flex items-center gap-1 text-amber-500">
                                                    ${[1,2,3,4,5].map(star => `
                                                        <svg class="w-3.5 h-3.5 ${star <= rating ? 'fill-amber-400 text-amber-500' : 'text-slate-200 fill-slate-100'}" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                        </svg>
                                                    `).join('')}
                                                    <span class="font-mono font-bold text-xs text-slate-800 ml-1">${rating}.0</span>
                                                </div>
                                            </td>
                                            <td class="py-3.5 px-4 max-w-sm">
                                                <div class="text-xs text-slate-800 italic">"${this.escapeHtml(rev.comment || '')}"</div>
                                                ${hasReply ? `
                                                    <div class="mt-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600">
                                                        <span class="font-bold text-slate-800 block">Salonun cavabı:</span>
                                                        ${this.escapeHtml(rev.reply)}
                                                    </div>
                                                ` : `
                                                    <div class="mt-1">
                                                        <span class="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">Cavab gözləyir</span>
                                                    </div>
                                                `}
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500 font-mono">
                                                ${rev.date ? this.formatDateDisplay(rev.date) : '—'}
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                                                <div class="flex items-center justify-end gap-1">
                                                    <button type="button" onclick="BusinessDashboardView.openReplyReviewModal('${rev.id}')" class="px-2.5 py-1 rounded-lg text-xs font-semibold ${hasReply ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold'} transition cursor-pointer">
                                                        ${hasReply ? 'Cavabı redaktə et' : 'Cavab ver'}
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.deleteMarketingReview('${rev.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Rəyi sil">
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

                    ${this.renderTablePagination({
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        onPageChange: 'BusinessDashboardView.setMarketingReviewPage',
                        onPageSizeChange: 'BusinessDashboardView.setMarketingReviewPageSize',
                        itemName: 'rəy'
                    })}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       MARKETING MODAL HANDLERS & CRUD OPERATIONS
       ========================================================================= */

    openAddMarketingCampaignModal: function(campaignId, defaultTarget) {
        const modal = document.getElementById('bizMarketingCampaignModal');
        if (!modal) return;

        const titleEl = document.getElementById('mktCampaignModalTitle');
        const subtitleEl = document.getElementById('mktCampaignModalSubtitle');
        const editIdInput = document.getElementById('mktCampaignEditId');
        const nameInput = document.getElementById('mktCampaignName');
        const channelInput = document.getElementById('mktCampaignChannel');
        const typeInput = document.getElementById('mktCampaignType');
        const targetInput = document.getElementById('mktCampaignTarget');
        const messageInput = document.getElementById('mktCampaignMessage');
        const scheduleInput = document.getElementById('mktCampaignSchedule');
        const statusInput = document.getElementById('mktCampaignStatus');

        if (campaignId) {
            const data = this.getMarketingData();
            const item = (data.campaigns || []).find(c => c.id === campaignId);
            if (item) {
                if (titleEl) titleEl.textContent = 'Kampaniyanı Redaktə Et';
                if (subtitleEl) subtitleEl.textContent = 'Bildiriş kampaniyasının parametrlərini yeniləyin';
                if (editIdInput) editIdInput.value = item.id;
                if (nameInput) nameInput.value = item.name || '';
                if (channelInput) channelInput.value = item.channel || 'whatsapp';
                if (typeInput) typeInput.value = item.type || 'automated';
                if (targetInput) targetInput.value = item.target || 'all';
                if (messageInput) messageInput.value = item.messageText || '';
                if (scheduleInput) scheduleInput.value = item.schedule || 'auto';
                if (statusInput) statusInput.value = item.status || 'active';
            }
        } else {
            if (titleEl) titleEl.textContent = 'Yeni Kampaniya';
            if (subtitleEl) subtitleEl.textContent = 'SMS və WhatsApp bildiriş kampaniyasının parametrləri';
            if (editIdInput) editIdInput.value = '';
            if (nameInput) nameInput.value = '';
            if (channelInput) channelInput.value = 'whatsapp';
            if (typeInput) typeInput.value = 'automated';
            if (targetInput) targetInput.value = defaultTarget || 'all';
            if (messageInput) messageInput.value = '';
            if (scheduleInput) scheduleInput.value = 'auto';
            if (statusInput) statusInput.value = 'active';
        }

        modal.classList.remove('hidden');
    },

    closeMarketingCampaignModal: function() {
        const modal = document.getElementById('bizMarketingCampaignModal');
        if (modal) modal.classList.add('hidden');
    },

    insertMarketingVariable: function(varText) {
        const textarea = document.getElementById('mktCampaignMessage');
        if (!textarea) return;
        const start = textarea.selectionStart || 0;
        const end = textarea.selectionEnd || 0;
        const val = textarea.value;
        textarea.value = val.substring(0, start) + varText + val.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + varText.length, start + varText.length);
    },

    handleSaveMarketingCampaign: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const editId = (document.getElementById('mktCampaignEditId') || {}).value;
        const name = ((document.getElementById('mktCampaignName') || {}).value || '').trim();
        const channel = (document.getElementById('mktCampaignChannel') || {}).value || 'whatsapp';
        const type = (document.getElementById('mktCampaignType') || {}).value || 'automated';
        const target = (document.getElementById('mktCampaignTarget') || {}).value || 'all';
        const messageText = ((document.getElementById('mktCampaignMessage') || {}).value || '').trim();
        const schedule = (document.getElementById('mktCampaignSchedule') || {}).value || 'auto';
        const status = (document.getElementById('mktCampaignStatus') || {}).value || 'active';

        if (!name || !messageText) {
            this.showToast('Zəhmət olmasa kampaniyanın adını və mesaj mətnini daxil edin');
            return;
        }

        const targetNames = {
            all: 'Bütün müştərilər',
            birthday: 'Ad günü olanlar',
            inactive_45: 'Passiv müştərilər (45+ gün)',
            vip: 'VIP daimi müştərilər',
            new: 'Yeni qeydiyyatdan keçənlər'
        };

        const data = this.getMarketingData();
        if (!data.campaigns) data.campaigns = [];

        if (editId) {
            const idx = data.campaigns.findIndex(c => c.id === editId);
            if (idx !== -1) {
                data.campaigns[idx] = {
                    ...data.campaigns[idx],
                    name,
                    channel,
                    type,
                    target,
                    targetName: targetNames[target] || target,
                    messageText,
                    schedule,
                    status
                };
            }
        } else {
            const newId = 'cmp_' + Date.now();
            data.campaigns.unshift({
                id: newId,
                name,
                channel,
                type,
                target,
                targetName: targetNames[target] || target,
                messageText,
                schedule,
                status,
                sentCount: 0,
                deliveredCount: 0,
                convertedCount: 0,
                createdAt: new Date().toISOString().split('T')[0]
            });
        }

        this.saveMarketingData(data);
        this.closeMarketingCampaignModal();
        this.refreshMarketingCanvas();
        this.render();
        this.showToast(editId ? 'Kampaniya uğurla yeniləndi' : 'Yeni bildiriş kampaniyası yaradıldı');
    },

    deleteMarketingCampaign: function(campaignId) {
        const data = this.getMarketingData();
        const campaign = (data.campaigns || []).find(c => c.id === campaignId);
        const title = campaign ? campaign.title : 'Kampaniya';

        this.openDeleteConfirmModal({
            title: 'Kampaniyanı sil',
            message: `<strong>"${title}"</strong> kampaniyasını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                data.campaigns = (data.campaigns || []).filter(c => c.id !== campaignId);
                this.saveMarketingData(data);
                this.refreshMarketingCanvas();
                this.render();
                this.showToast('Kampaniya uğurla silindi');
            }
        });
    },

    onMarketingCampaignSearch: function(val) {
        this.marketingCampaignSearch = val;
        this.marketingCampaignCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    clearMarketingCampaignSearch: function() {
        this.marketingCampaignSearch = '';
        this.marketingCampaignCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    filterMarketingCampaignChannel: function(val) {
        this.marketingCampaignChannelFilter = val;
        this.marketingCampaignCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    filterMarketingCampaignType: function(val) {
        this.marketingCampaignTypeFilter = val;
        this.marketingCampaignCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    filterMarketingCampaignStatus: function(val) {
        this.marketingCampaignStatusFilter = val;
        this.marketingCampaignCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    setMarketingCampaignPage: function(p) {
        this.marketingCampaignCurrentPage = p;
        this.refreshMarketingCanvas();
    },

    setMarketingCampaignPageSize: function(s) {
        this.marketingCampaignPageSize = parseInt(s) || 10;
        this.marketingCampaignCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    openMarketingCampaignFilterModal: function() {
        const modal = document.getElementById('bizMarketingCampaignFilterModal');
        if (!modal) return;
        this.selectMarketingCampaignFilterChannel(this.marketingCampaignChannelFilter || 'all');
        this.selectMarketingCampaignFilterType(this.marketingCampaignTypeFilter || 'all');
        this.selectMarketingCampaignFilterStatus(this.marketingCampaignStatusFilter || 'all');
        modal.classList.remove('hidden');
    },

    closeMarketingCampaignFilterModal: function() {
        const modal = document.getElementById('bizMarketingCampaignFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectMarketingCampaignFilterChannel: function(val) {
        this.tempMktCampaignChannel = val;
        ['all', 'whatsapp', 'sms'].forEach(c => {
            const btn = document.getElementById(`mktFilterChannelBtn_${c}`);
            if (btn) {
                if (c === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    selectMarketingCampaignFilterType: function(val) {
        this.tempMktCampaignType = val;
        ['all', 'automated', 'broadcast'].forEach(t => {
            const btn = document.getElementById(`mktFilterTypeBtn_${t}`);
            if (btn) {
                if (t === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    selectMarketingCampaignFilterStatus: function(val) {
        this.tempMktCampaignStatus = val;
        ['all', 'active', 'inactive', 'draft'].forEach(s => {
            const btn = document.getElementById(`mktFilterStatusBtn_${s}`);
            if (btn) {
                if (s === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    applyMarketingCampaignFilters: function() {
        this.marketingCampaignChannelFilter = this.tempMktCampaignChannel || 'all';
        this.marketingCampaignTypeFilter = this.tempMktCampaignType || 'all';
        this.marketingCampaignStatusFilter = this.tempMktCampaignStatus || 'all';
        this.marketingCampaignCurrentPage = 1;
        this.closeMarketingCampaignFilterModal();
        this.refreshMarketingCanvas();
    },

    resetMarketingCampaignFilters: function() {
        this.marketingCampaignSearch = '';
        this.marketingCampaignChannelFilter = 'all';
        this.marketingCampaignTypeFilter = 'all';
        this.marketingCampaignStatusFilter = 'all';
        this.marketingCampaignCurrentPage = 1;
        this.closeMarketingCampaignFilterModal();
        this.refreshMarketingCanvas();
    },

    // PROMOCODES HANDLERS
    openAddMarketingPromocodeModal: function(promoId) {
        const modal = document.getElementById('bizMarketingPromocodeModal');
        if (!modal) return;

        const titleEl = document.getElementById('mktPromoModalTitle');
        const subtitleEl = document.getElementById('mktPromoModalSubtitle');
        const editIdInput = document.getElementById('mktPromoEditId');
        const codeInput = document.getElementById('mktPromoCode');
        const nameInput = document.getElementById('mktPromoName');
        const typeInput = document.getElementById('mktPromoDiscountType');
        const valueInput = document.getElementById('mktPromoDiscountValue');
        const minOrderInput = document.getElementById('mktPromoMinOrder');
        const maxUsageInput = document.getElementById('mktPromoMaxUsage');
        const startDateInput = document.getElementById('mktPromoStartDate');
        const endDateInput = document.getElementById('mktPromoEndDate');
        const scopeInput = document.getElementById('mktPromoServiceScope');
        const statusInput = document.getElementById('mktPromoStatus');

        if (promoId) {
            const data = this.getMarketingData();
            const p = (data.promocodes || []).find(item => item.id === promoId);
            if (p) {
                if (titleEl) titleEl.textContent = 'Promokodu Redaktə Et';
                if (subtitleEl) subtitleEl.textContent = 'Promokodun parametrlərini və limitini yeniləyin';
                if (editIdInput) editIdInput.value = p.id;
                if (codeInput) codeInput.value = p.code || '';
                if (nameInput) nameInput.value = p.name || '';
                if (typeInput) typeInput.value = p.discountType || 'percent';
                if (valueInput) valueInput.value = p.discountValue !== undefined ? p.discountValue : 15;
                if (minOrderInput) minOrderInput.value = p.minOrderAmount !== undefined ? p.minOrderAmount : 25;
                if (maxUsageInput) maxUsageInput.value = p.maxUsageCount !== undefined ? p.maxUsageCount : 100;
                if (startDateInput) startDateInput.value = p.startDate || '2026-10-01';
                if (endDateInput) endDateInput.value = p.endDate || '2026-12-31';
                if (scopeInput) scopeInput.value = p.serviceScope || 'all';
                if (statusInput) statusInput.value = p.status || 'active';
                this.onPromoDiscountTypeChange(p.discountType || 'percent');
            }
        } else {
            if (titleEl) titleEl.textContent = 'Yeni Promokod';
            if (subtitleEl) subtitleEl.textContent = 'Endirim promokodunun şərtləri və istifadə limiti';
            if (editIdInput) editIdInput.value = '';
            if (codeInput) codeInput.value = '';
            if (nameInput) nameInput.value = '';
            if (typeInput) typeInput.value = 'percent';
            if (valueInput) valueInput.value = '15';
            if (minOrderInput) minOrderInput.value = '25';
            if (maxUsageInput) maxUsageInput.value = '100';
            if (startDateInput) startDateInput.value = '2026-10-01';
            if (endDateInput) endDateInput.value = '2026-12-31';
            if (scopeInput) scopeInput.value = 'all';
            if (statusInput) statusInput.value = 'active';
            this.onPromoDiscountTypeChange('percent');
        }

        ['mktPromoStartDate', 'mktPromoEndDate'].forEach(id => {
            const inp = document.getElementById(id);
            const txt = document.getElementById(id + 'Text');
            if (!inp) return;
            this.initCustomDatePicker(id, inp.value);
            if (txt) txt.textContent = this.formatDateDisplay(inp.value);
        });

        modal.classList.remove('hidden');
    },

    closeMarketingPromocodeModal: function() {
        const modal = document.getElementById('bizMarketingPromocodeModal');
        if (modal) modal.classList.add('hidden');
    },

    onPromoDiscountTypeChange: function(type) {
        const label = document.getElementById('mktPromoDiscountLabel');
        const input = document.getElementById('mktPromoDiscountValue');
        if (!label || !input) return;
        if (type === 'percent') {
            label.innerHTML = 'Endirim miqdarı (%) <span class="text-rose-500">*</span>';
            input.max = 100;
        } else {
            label.innerHTML = 'Endirim məbləği (₼) <span class="text-rose-500">*</span>';
            input.removeAttribute('max');
        }
    },

    handleSaveMarketingPromocode: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const editId = (document.getElementById('mktPromoEditId') || {}).value;
        const code = ((document.getElementById('mktPromoCode') || {}).value || '').trim();
        const name = ((document.getElementById('mktPromoName') || {}).value || '').trim();
        const discountType = (document.getElementById('mktPromoDiscountType') || {}).value || 'percent';
        const discountValue = parseFloat((document.getElementById('mktPromoDiscountValue') || {}).value) || 0;
        const minOrderAmount = parseFloat((document.getElementById('mktPromoMinOrder') || {}).value) || 0;
        const maxUsageCount = parseInt((document.getElementById('mktPromoMaxUsage') || {}).value) || 0;
        const startDate = (document.getElementById('mktPromoStartDate') || {}).value || '';
        const endDate = (document.getElementById('mktPromoEndDate') || {}).value || '';
        const serviceScope = (document.getElementById('mktPromoServiceScope') || {}).value || 'all';
        const status = (document.getElementById('mktPromoStatus') || {}).value || 'active';

        if (!code) {
            this.showToast('Zəhmət olmasa promokod adını daxil edin');
            return;
        }

        const data = this.getMarketingData();
        if (!data.promocodes) data.promocodes = [];

        if (editId) {
            const idx = data.promocodes.findIndex(p => p.id === editId);
            if (idx !== -1) {
                data.promocodes[idx] = {
                    ...data.promocodes[idx],
                    code,
                    name,
                    discountType,
                    discountValue,
                    minOrderAmount,
                    maxUsageCount,
                    startDate,
                    endDate,
                    serviceScope,
                    status
                };
            }
        } else {
            const newId = 'pc_' + Date.now();
            data.promocodes.unshift({
                id: newId,
                code,
                name: name || `${code} Endirim Kampaniyası`,
                discountType,
                discountValue,
                minOrderAmount,
                maxUsageCount,
                usedCount: 0,
                startDate,
                endDate,
                serviceScope,
                status,
                createdAt: new Date().toISOString().split('T')[0]
            });
        }

        this.saveMarketingData(data);
        this.closeMarketingPromocodeModal();
        this.refreshMarketingCanvas();
        this.render();
        this.showToast(editId ? 'Promokod uğurla yeniləndi' : 'Yeni promokod uğurla yaradıldı');
    },

    deleteMarketingPromocode: function(promoId) {
        const data = this.getMarketingData();
        const promo = (data.promocodes || []).find(p => p.id === promoId);
        const code = promo ? promo.code : 'Promokod';

        this.openDeleteConfirmModal({
            title: 'Promokodu sil',
            message: `<strong>"${code}"</strong> promokodunu silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                data.promocodes = (data.promocodes || []).filter(p => p.id !== promoId);
                this.saveMarketingData(data);
                this.refreshMarketingCanvas();
                this.render();
                this.showToast('Promokod uğurla silindi');
            }
        });
    },

    copyPromoCode: function(code) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(() => {
                this.showToast(`Promokod kopyalandı: ${code}`);
            }).catch(() => {
                this.showToast(`Promokod: ${code}`);
            });
        } else {
            this.showToast(`Promokod: ${code}`);
        }
    },

    onMarketingPromoSearch: function(val) {
        this.marketingPromoSearch = val;
        this.marketingPromoCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    clearMarketingPromoSearch: function() {
        this.marketingPromoSearch = '';
        this.marketingPromoCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    filterMarketingPromoDiscountType: function(val) {
        this.marketingPromoDiscountTypeFilter = val;
        this.marketingPromoCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    filterMarketingPromoStatus: function(val) {
        this.marketingPromoStatusFilter = val;
        this.marketingPromoCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    setMarketingPromoPage: function(p) {
        this.marketingPromoCurrentPage = p;
        this.refreshMarketingCanvas();
    },

    setMarketingPromoPageSize: function(s) {
        this.marketingPromoPageSize = parseInt(s) || 10;
        this.marketingPromoCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    openMarketingPromoFilterModal: function() {
        const modal = document.getElementById('bizMarketingPromoFilterModal');
        if (!modal) return;
        this.selectMarketingPromoFilterDiscountType(this.marketingPromoDiscountTypeFilter || 'all');
        this.selectMarketingPromoFilterStatus(this.marketingPromoStatusFilter || 'all');
        modal.classList.remove('hidden');
    },

    closeMarketingPromoFilterModal: function() {
        const modal = document.getElementById('bizMarketingPromoFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectMarketingPromoFilterDiscountType: function(val) {
        this.tempMktPromoDiscountType = val;
        ['all', 'percent', 'fixed'].forEach(t => {
            const btn = document.getElementById(`mktFilterPromoTypeBtn_${t}`);
            if (btn) {
                if (t === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    selectMarketingPromoFilterStatus: function(val) {
        this.tempMktPromoStatus = val;
        ['all', 'active', 'expired', 'inactive'].forEach(s => {
            const btn = document.getElementById(`mktFilterPromoStatusBtn_${s}`);
            if (btn) {
                if (s === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    applyMarketingPromoFilters: function() {
        this.marketingPromoDiscountTypeFilter = this.tempMktPromoDiscountType || 'all';
        this.marketingPromoStatusFilter = this.tempMktPromoStatus || 'all';
        this.marketingPromoCurrentPage = 1;
        this.closeMarketingPromoFilterModal();
        this.refreshMarketingCanvas();
    },

    resetMarketingPromoFilters: function() {
        this.marketingPromoSearch = '';
        this.marketingPromoDiscountTypeFilter = 'all';
        this.marketingPromoStatusFilter = 'all';
        this.marketingPromoCurrentPage = 1;
        this.closeMarketingPromoFilterModal();
        this.refreshMarketingCanvas();
    },

    // REFERRAL RULES MODAL
    openEditReferralRulesModal: function() {
        const modal = document.getElementById('bizMarketingReferralRulesModal');
        if (!modal) return;

        const data = this.getMarketingData();
        const ref = data.referral || { enabled: true, referrerReward: 10, refereeDiscount: 15, minOrderAmount: 25 };

        const enabledInput = document.getElementById('mktReferralEnabled');
        const rewardInput = document.getElementById('mktReferralReward');
        const discountInput = document.getElementById('mktRefereeDiscount');
        const minOrderInput = document.getElementById('mktReferralMinOrder');

        if (enabledInput) enabledInput.value = ref.enabled ? 'true' : 'false';
        if (rewardInput) rewardInput.value = ref.referrerReward !== undefined ? ref.referrerReward : 10;
        if (discountInput) discountInput.value = ref.refereeDiscount !== undefined ? ref.refereeDiscount : 15;
        if (minOrderInput) minOrderInput.value = ref.minOrderAmount !== undefined ? ref.minOrderAmount : 25;

        modal.classList.remove('hidden');
    },

    closeEditReferralRulesModal: function() {
        const modal = document.getElementById('bizMarketingReferralRulesModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveReferralRules: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const enabled = (document.getElementById('mktReferralEnabled') || {}).value === 'true';
        const referrerReward = parseFloat((document.getElementById('mktReferralReward') || {}).value) || 10;
        const refereeDiscount = parseInt((document.getElementById('mktRefereeDiscount') || {}).value) || 15;
        const minOrderAmount = parseFloat((document.getElementById('mktReferralMinOrder') || {}).value) || 25;

        const data = this.getMarketingData();
        if (!data.referral) data.referral = {};

        data.referral.enabled = enabled;
        data.referral.referrerReward = referrerReward;
        data.referral.refereeDiscount = refereeDiscount;
        data.referral.minOrderAmount = minOrderAmount;

        this.saveMarketingData(data);
        this.closeEditReferralRulesModal();
        this.refreshMarketingCanvas();
        this.render();
    },

    onMarketingReferralSearch: function(val) {
        this.marketingReferralSearch = val;
        this.marketingReferralCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    clearMarketingReferralSearch: function() {
        this.marketingReferralSearch = '';
        this.marketingReferralCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    setMarketingReferralPage: function(p) {
        this.marketingReferralCurrentPage = p;
        this.refreshMarketingCanvas();
    },

    setMarketingReferralPageSize: function(s) {
        this.marketingReferralPageSize = parseInt(s) || 10;
        this.marketingReferralCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    // REVIEW REPLY MODAL
    openReplyReviewModal: function(reviewId) {
        const modal = document.getElementById('bizMarketingReviewReplyModal');
        if (!modal) return;

        const data = this.getMarketingData();
        const rev = (data.reviews || []).find(r => r.id === reviewId);
        if (!rev) return;

        const editIdInput = document.getElementById('mktReviewEditId');
        const clientNameEl = document.getElementById('mktReviewClientName');
        const starsEl = document.getElementById('mktReviewRatingStars');
        const serviceInfoEl = document.getElementById('mktReviewServiceInfo');
        const commentEl = document.getElementById('mktReviewCommentText');
        const replyInput = document.getElementById('mktReviewReplyText');

        if (editIdInput) editIdInput.value = rev.id;
        if (clientNameEl) clientNameEl.textContent = rev.clientName || 'Müştəri';
        if (serviceInfoEl) serviceInfoEl.textContent = (rev.serviceName || '') + (rev.masterName ? (' • Usta: ' + rev.masterName) : '');
        if (commentEl) commentEl.textContent = '"' + (rev.comment || '') + '"';
        if (replyInput) replyInput.value = rev.reply || '';

        if (starsEl) {
            const rating = rev.rating || 5;
            starsEl.innerHTML = [1,2,3,4,5].map(star => `
                <svg class="w-3.5 h-3.5 ${star <= rating ? 'fill-amber-400 text-amber-500' : 'text-slate-200 fill-slate-100'}" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            `).join('');
        }

        modal.classList.remove('hidden');
    },

    closeReplyReviewModal: function() {
        const modal = document.getElementById('bizMarketingReviewReplyModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveReviewReply: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const editId = (document.getElementById('mktReviewEditId') || {}).value;
        const replyText = ((document.getElementById('mktReviewReplyText') || {}).value || '').trim();

        if (!editId || !replyText) {
            this.showToast('Zəhmət olmasa rəsmi cavabınızı qeyd edin');
            return;
        }

        const data = this.getMarketingData();
        const idx = (data.reviews || []).findIndex(r => r.id === editId);
        if (idx !== -1) {
            data.reviews[idx].reply = replyText;
            this.saveMarketingData(data);
        }

        this.closeReplyReviewModal();
        this.refreshMarketingCanvas();
        this.render();
        this.showToast('Rəyə rəsmi cavab uğurla göndərildi');
    },

    deleteMarketingReview: function(reviewId) {
        const data = this.getMarketingData();
        const rev = (data.reviews || []).find(r => r.id === reviewId);
        const author = rev ? rev.author : 'Müştəri rəyi';

        this.openDeleteConfirmModal({
            title: 'Rəyi sil',
            message: `<strong>"${author}"</strong> tərəfindən yazılmış rəyi silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                data.reviews = (data.reviews || []).filter(r => r.id !== reviewId);
                this.saveMarketingData(data);
                this.refreshMarketingCanvas();
                this.render();
                this.showToast('Müştəri rəyi uğurla silindi');
            }
        });
    },

    onMarketingReviewSearch: function(val) {
        this.marketingReviewSearch = val;
        this.marketingReviewCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    clearMarketingReviewSearch: function() {
        this.marketingReviewSearch = '';
        this.marketingReviewCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    filterMarketingReviewRating: function(val) {
        this.marketingReviewRatingFilter = val;
        this.marketingReviewCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    filterMarketingReviewStatus: function(val) {
        this.marketingReviewStatusFilter = val;
        this.marketingReviewCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    setMarketingReviewPage: function(p) {
        this.marketingReviewCurrentPage = p;
        this.refreshMarketingCanvas();
    },

    setMarketingReviewPageSize: function(s) {
        this.marketingReviewPageSize = parseInt(s) || 10;
        this.marketingReviewCurrentPage = 1;
        this.refreshMarketingCanvas();
    },

    openMarketingReviewFilterModal: function() {
        const modal = document.getElementById('bizMarketingReviewFilterModal');
        if (!modal) return;
        this.selectMarketingReviewFilterRating(this.marketingReviewRatingFilter || 'all');
        this.selectMarketingReviewFilterStatus(this.marketingReviewStatusFilter || 'all');
        modal.classList.remove('hidden');
    },

    closeMarketingReviewFilterModal: function() {
        const modal = document.getElementById('bizMarketingReviewFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectMarketingReviewFilterRating: function(val) {
        this.tempMktReviewRating = val;
        ['all', '5', '4', 'low'].forEach(r => {
            const btn = document.getElementById(`mktFilterReviewRatingBtn_${r}`);
            if (btn) {
                if (r === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    selectMarketingReviewFilterStatus: function(val) {
        this.tempMktReviewStatus = val;
        ['all', 'replied', 'pending'].forEach(s => {
            const btn = document.getElementById(`mktFilterReviewStatusBtn_${s}`);
            if (btn) {
                if (s === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    applyMarketingReviewFilters: function() {
        this.marketingReviewRatingFilter = this.tempMktReviewRating || 'all';
        this.marketingReviewStatusFilter = this.tempMktReviewStatus || 'all';
        this.marketingReviewCurrentPage = 1;
        this.closeMarketingReviewFilterModal();
        this.refreshMarketingCanvas();
    },

    resetMarketingReviewFilters: function() {
        this.marketingReviewSearch = '';
        this.marketingReviewRatingFilter = 'all';
        this.marketingReviewStatusFilter = 'all';
        this.marketingReviewCurrentPage = 1;
        this.closeMarketingReviewFilterModal();
        this.refreshMarketingCanvas();
    },
});
