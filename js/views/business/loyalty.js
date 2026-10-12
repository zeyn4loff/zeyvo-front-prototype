// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {
    /* =========================================================================
       LOYALTY MODULE (4 BÖLMƏ: LOYALLIQ KARTLARI VƏ CASHBACK, HƏDİYYƏ KARTLARI,
       ABUNƏLİKLƏR, MÜŞTƏRİ DEPOZİTLƏRİ)
       ========================================================================= */

    loyaltyActiveTab: 'cards_cashback',

    // Section 1: Loyalty Cards & Rules State
    loyaltyCardRuleSearch: '',
    loyaltyCardRuleTypeFilter: 'all',
    loyaltyCardRuleStatusFilter: 'all',
    loyaltyCardRuleCurrentPage: 1,
    loyaltyCardRulePageSize: 10,
    loyaltyCardSearch: '',
    loyaltyCardStatusFilter: 'all',
    loyaltyCardCurrentPage: 1,
    loyaltyCardPageSize: 10,
    loyaltyBonusSearch: '',
    loyaltyBonusCurrentPage: 1,
    loyaltyBonusPageSize: 10,

    // Section 2: Gift Cards State
    loyaltyGiftCardSearch: '',
    loyaltyGiftCardTypeFilter: 'all',
    loyaltyGiftCardSaleFilter: 'all',
    loyaltyGiftCardStatusFilter: 'all',
    loyaltyGiftCardCurrentPage: 1,
    loyaltyGiftCardPageSize: 10,
    tempGiftCardFilterType: 'all',
    tempGiftCardFilterSale: 'all',
    tempGiftCardFilterStatus: 'all',
    gcSelectedServiceIds: [],
    tempGcSelectedServiceIds: [],
    gcServicePickerSearchQuery: '',
    gcServicePickerCategory: 'all',
    loyaltyCertSearch: '',
    loyaltyCertStatusFilter: 'all',
    loyaltyCertCurrentPage: 1,
    loyaltyCertPageSize: 10,

    // Section 3: Subscriptions State
    loyaltySubSearch: '',
    loyaltySubStatusFilter: 'all',
    loyaltySubSaleFilter: 'all',
    loyaltySubOnlineFilter: 'all',
    loyaltySubCurrentPage: 1,
    loyaltySubPageSize: 10,
    tempSubFilterStatus: 'all',
    tempSubFilterSale: 'all',
    tempSubFilterOnline: 'all',
    subSelectedServiceIds: [],
    tempSubSelectedServiceIds: [],
    subServicePickerSearchQuery: '',
    subServicePickerCategory: 'all',

    // Section 4: Deposits State
    loyaltyDepositSearch: '',
    loyaltyDepositStatusFilter: 'all',
    loyaltyDepositCurrentPage: 1,
    loyaltyDepositPageSize: 10,

    getDefaultSubscriptions: function() {
        return [
            {
                id: 'sub_1',
                name: 'Kişi Saç & Saqqal Paketi (5 ziyarət)',
                visitsCount: 5,
                durationDays: 90,
                price: 90.0,
                onlyAssignedServices: true,
                serviceIds: ['srv_1', 'srv_2'],
                serviceNames: 'Klassik saç kəsimi, Saqqal korreksiyası',
                isAvailableOnline: true,
                rolloverUnusedVisits: true,
                isAvailableForSale: true,
                status: 'active',
                color: 'purple',
                soldCount: 14,
                createdAt: '2026-09-10'
            },
            {
                id: 'sub_2',
                name: 'Aylıq Manikür & Gel-lak Paketi',
                visitsCount: 4,
                durationDays: 30,
                price: 75.0,
                onlyAssignedServices: true,
                serviceIds: ['srv_3'],
                serviceNames: 'Klassik manikür, Gel örtük',
                isAvailableOnline: true,
                rolloverUnusedVisits: false,
                isAvailableForSale: true,
                status: 'active',
                color: 'amber',
                soldCount: 22,
                createdAt: '2026-09-15'
            },
            {
                id: 'sub_3',
                name: 'Premium Spa & Relax Masaj Kursu',
                visitsCount: 10,
                durationDays: 180,
                price: 320.0,
                onlyAssignedServices: true,
                serviceIds: ['srv_4', 'srv_5'],
                serviceNames: 'Aroma masaj, Relax bədən baxımı',
                isAvailableOnline: false,
                rolloverUnusedVisits: true,
                isAvailableForSale: true,
                status: 'active',
                color: 'emerald',
                soldCount: 8,
                createdAt: '2026-09-20'
            },
            {
                id: 'sub_4',
                name: 'Keratin & Saç Bərpası Kompleksi',
                visitsCount: 3,
                durationDays: 90,
                price: 150.0,
                onlyAssignedServices: false,
                serviceIds: [],
                serviceNames: 'Bütün bərbər və baxım xidmətləri',
                isAvailableOnline: true,
                rolloverUnusedVisits: false,
                isAvailableForSale: false,
                status: 'inactive',
                color: 'slate',
                soldCount: 5,
                createdAt: '2026-09-25'
            }
        ];
    },

    getLoyaltyData: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_loyalty_data_v2'));
        if (stored) {
            try {
                const data = JSON.parse(stored);
                if (data && (!data.loyaltyCards || data.loyaltyCards.length === 0)) {
                    data.loyaltyCards = [
                        {
                            id: 'lc_1',
                            name: 'Yeni Müştəri Xoş Gəldin Endirimi',
                            type: 'discount',
                            percent: 10,
                            minAmount: 30,
                            durationDays: 30,
                            target: 'new',
                            status: 'active',
                            color: 'rose',
                            createdAt: '2026-09-01'
                        },
                        {
                            id: 'lc_2',
                            name: 'Standart Keşbek Kartı',
                            type: 'cashback',
                            percent: 5,
                            minAmount: 0,
                            durationDays: 0,
                            target: 'all',
                            status: 'active',
                            color: 'slate',
                            createdAt: '2026-09-01'
                        },
                        {
                            id: 'lc_3',
                            name: 'Gümüş Loyallıq Kartı',
                            type: 'cashback',
                            percent: 7,
                            minAmount: 50,
                            durationDays: 180,
                            target: 'all',
                            status: 'active',
                            color: 'silver',
                            createdAt: '2026-09-10'
                        },
                        {
                            id: 'lc_4',
                            name: 'VIP Premium Endirim Kartı',
                            type: 'discount',
                            percent: 15,
                            minAmount: 100,
                            durationDays: 365,
                            target: 'all',
                            status: 'active',
                            color: 'purple',
                            createdAt: '2026-09-15'
                        }
                    ];
                }
                if (data && data.tiers) {
                    data.tiers.forEach(t => {
                        if (!t.status) t.status = 'active';
                        if (t.color === 'blue') t.color = 'silver';
                        if (!t.description) {
                            if (t.id === 'standard') t.description = 'İlkin qeydiyyatdan keçən bütün müştərilərə verilir';
                            else if (t.id === 'silver') t.description = '300 ₼ dövriyyə toplayan müştərilərə verilir';
                            else if (t.id === 'gold') t.description = '800 ₼ dövriyyə toplayan müştərilərə verilir';
                            else if (t.id === 'vip') t.description = '1500 ₼ dövriyyə toplayan VIP müştərilərə verilir';
                            else t.description = 'Xüsusi loyallıq imtiyazları';
                        }
                    });
                }
                if (data && data.giftCards && Array.isArray(data.giftCards)) {
                    let needsSave = false;
                    data.giftCards = data.giftCards.map((c, idx) => {
                        let cardId = c.id;
                        if (!cardId) {
                            cardId = c.code ? ('gc_' + c.code.toLowerCase().replace(/[^a-z0-9]/g, '')) : ('gc_' + (idx + 1));
                            needsSave = true;
                        }
                        const cardStatus = (c.status === 'used' || c.status === 'expired' || c.status === 'inactive') ? 'inactive' : 'active';
                        return {
                            id: String(cardId),
                            code: c.code || null,
                            name: c.name || (c.code ? `Hədiyyə kartı (${c.code})` : 'Hədiyyə kartı'),
                            type: c.type || (c.serviceId ? 'service' : 'general'),
                            serviceId: c.serviceId || null,
                            serviceIds: Array.isArray(c.serviceIds) ? c.serviceIds : (c.serviceId ? [c.serviceId] : []),
                            serviceName: c.serviceName || null,
                            nominal: parseFloat(c.nominal !== undefined ? c.nominal : (c.initialAmount !== undefined ? c.initialAmount : 50)),
                            salePrice: parseFloat(c.salePrice !== undefined ? c.salePrice : (c.nominal !== undefined ? c.nominal : (c.initialAmount !== undefined ? c.initialAmount : 50))),
                            durationDays: c.durationDays !== undefined ? parseInt(c.durationDays) : 90,
                            usageLimit: c.usageLimit || 'unlimited',
                            allowPartial: c.allowPartial !== undefined ? !!c.allowPartial : true,
                            isAvailableForSale: c.isAvailableForSale !== undefined ? !!c.isAvailableForSale : true,
                            status: cardStatus,
                            color: c.color || 'amber',
                            soldCount: c.soldCount !== undefined ? c.soldCount : (c.history ? c.history.length : 0),
                            createdAt: c.createdAt || '2026-09-15'
                        };
                    });
                    if (needsSave) {
                        try {
                            localStorage.setItem(this.storageKey('zeyvo_loyalty_data_v2'), JSON.stringify(data));
                        } catch (e) {}
                    }
                } else if (data && (!data.giftCards || data.giftCards.length === 0)) {
                    data.giftCards = [
                        {
                            id: 'gc_1',
                            name: 'Standart hədiyyə kartı 50 ₼',
                            type: 'general',
                            serviceId: null,
                            serviceIds: [],
                            serviceName: null,
                            nominal: 50.0,
                            salePrice: 50.0,
                            durationDays: 90,
                            usageLimit: 'unlimited',
                            allowPartial: true,
                            isAvailableForSale: true,
                            status: 'active',
                            color: 'amber',
                            soldCount: 18,
                            createdAt: '2026-09-15'
                        },
                        {
                            id: 'gc_2',
                            name: 'Premium hədiyyə kartı 100 ₼',
                            type: 'general',
                            serviceId: null,
                            serviceIds: [],
                            serviceName: null,
                            nominal: 100.0,
                            salePrice: 90.0,
                            durationDays: 180,
                            usageLimit: 'unlimited',
                            allowPartial: true,
                            isAvailableForSale: true,
                            status: 'active',
                            color: 'purple',
                            soldCount: 25,
                            createdAt: '2026-09-20'
                        },
                        {
                            id: 'gc_3',
                            name: 'Spa və saç baxımı hədiyyə kartı',
                            type: 'service',
                            serviceId: 'srv_1',
                            serviceIds: ['srv_1'],
                            serviceName: 'Spa saç baxımı',
                            nominal: 70.0,
                            salePrice: 65.0,
                            durationDays: 60,
                            usageLimit: '1',
                            allowPartial: false,
                            isAvailableForSale: true,
                            status: 'active',
                            color: 'emerald',
                            soldCount: 9,
                            createdAt: '2026-09-25'
                        },
                        {
                            id: 'gc_4',
                            name: 'VIP kompleks baxım kartı',
                            type: 'general',
                            serviceId: null,
                            serviceIds: [],
                            serviceName: null,
                            nominal: 200.0,
                            salePrice: 180.0,
                            durationDays: 365,
                            usageLimit: 'unlimited',
                            allowPartial: true,
                            isAvailableForSale: true,
                            status: 'active',
                            color: 'slate',
                            soldCount: 6,
                            createdAt: '2026-09-28'
                        },
                        {
                            id: 'gc_5',
                            name: 'Ekspres manikür hədiyyə kartı',
                            type: 'service',
                            serviceId: 'srv_2',
                            serviceIds: ['srv_2'],
                            serviceName: 'Klassik manikür',
                            nominal: 30.0,
                            salePrice: 30.0,
                            durationDays: 30,
                            usageLimit: '1',
                            allowPartial: false,
                            isAvailableForSale: false,
                            status: 'inactive',
                            color: 'rose',
                            soldCount: 3,
                            createdAt: '2026-10-01'
                        }
                    ];
                    try {
                        localStorage.setItem(this.storageKey('zeyvo_loyalty_data_v2'), JSON.stringify(data));
                    } catch (e) {}
                }

                if (data && data.subscriptions && Array.isArray(data.subscriptions)) {
                    let needsSave = false;
                    const isNewFormat = data.subscriptions.some(s => s.visitsCount !== undefined || s.onlyAssignedServices !== undefined);
                    if (!isNewFormat) {
                        data.subscriptions = this.getDefaultSubscriptions();
                        needsSave = true;
                    } else {
                        data.subscriptions = data.subscriptions.map((s, idx) => {
                            let subId = s.id;
                            if (!subId) {
                                subId = 'sub_' + (idx + 1);
                                needsSave = true;
                            }
                            return {
                                id: String(subId),
                                name: s.name || s.title || 'Abunəlik paketi',
                                visitsCount: parseInt(s.visitsCount !== undefined ? s.visitsCount : (s.totalVisits || 10)),
                                durationDays: parseInt(s.durationDays !== undefined ? s.durationDays : 90),
                                price: parseFloat(s.price !== undefined ? s.price : 100),
                                onlyAssignedServices: s.onlyAssignedServices !== undefined ? !!s.onlyAssignedServices : true,
                                serviceIds: Array.isArray(s.serviceIds) ? s.serviceIds : [],
                                serviceNames: s.serviceNames || s.services || 'Təyin edilmiş xidmətlər',
                                isAvailableOnline: s.isAvailableOnline !== undefined ? !!s.isAvailableOnline : true,
                                rolloverUnusedVisits: s.rolloverUnusedVisits !== undefined ? !!s.rolloverUnusedVisits : true,
                                isAvailableForSale: s.isAvailableForSale !== undefined ? !!s.isAvailableForSale : true,
                                status: s.status === 'inactive' ? 'inactive' : 'active',
                                color: s.color || 'purple',
                                soldCount: parseInt(s.soldCount !== undefined ? s.soldCount : 12),
                                createdAt: s.createdAt || '2026-09-10'
                            };
                        });
                    }
                    if (needsSave) {
                        try {
                            localStorage.setItem(this.storageKey('zeyvo_loyalty_data_v2'), JSON.stringify(data));
                        } catch (e) {}
                    }
                } else if (data && (!data.subscriptions || data.subscriptions.length === 0)) {
                    data.subscriptions = this.getDefaultSubscriptions();
                    try {
                        localStorage.setItem(this.storageKey('zeyvo_loyalty_data_v2'), JSON.stringify(data));
                    } catch (e) {}
                }
                return data;
            } catch (e) {
                console.error('Error parsing loyalty data v2:', e);
            }
        }

        const initialData = {
            program: {
                enabled: true,
                cashbackPercent: 5,
                pointValueAzn: 1.0,
                maxPayPercent: 50,
                expiryDays: 180,
                welcomeBonus: 10,
                birthdayBonus: 15
            },
            tiers: [
                { id: 'standard', name: 'Standart Kart', cashback: 3, minSpent: 0, color: 'slate', discount: 0, status: 'active', description: 'İlkin qeydiyyatdan keçən bütün müştərilərə verilir' },
                { id: 'silver', name: 'Gümüş Kart', cashback: 5, minSpent: 300, color: 'silver', discount: 2, status: 'active', description: '300 ₼ dövriyyə toplayan müştərilərə verilir' },
                { id: 'gold', name: 'Qızıl Kart', cashback: 7, minSpent: 800, color: 'amber', discount: 5, status: 'active', description: '800 ₼ dövriyyə toplayan müştərilərə verilir' },
                { id: 'vip', name: 'VIP Kart', cashback: 10, minSpent: 1500, color: 'purple', discount: 10, status: 'active', description: '1500 ₼ dövriyyə toplayan VIP müştərilərə verilir' }
            ],
            clients: [
                {
                    id: 'cl_1',
                    name: 'Nigar Quliyeva',
                    phone: '+994 (50) 234-56-78',
                    cardNumber: 'LC-802194',
                    tier: 'gold',
                    bonusBalance: 45.0,
                    totalSpent: 890.0,
                    visitsCount: 14,
                    lastVisit: '2026-09-28',
                    history: [
                        { id: 'h1', date: '2026-09-28 15:30', type: 'earn', amount: 6.5, note: 'Saç boyama və kəsim qəbulu (#BK-108)', balanceAfter: 45.0 },
                        { id: 'h2', date: '2026-09-10 12:15', type: 'redeem', amount: 15.0, note: 'Xidmət ödənişi üçün istifadə', balanceAfter: 38.5 },
                        { id: 'h3', date: '2026-08-14 18:00', type: 'earn', amount: 8.5, note: 'Keratin baxımı ödənişi (#BK-092)', balanceAfter: 53.5 }
                    ]
                },
                {
                    id: 'cl_2',
                    name: 'Aygün Məmmədova',
                    phone: '+994 (55) 345-67-89',
                    cardNumber: 'LC-671249',
                    tier: 'silver',
                    bonusBalance: 28.0,
                    totalSpent: 560.0,
                    visitsCount: 9,
                    lastVisit: '2026-10-02',
                    history: [
                        { id: 'h4', date: '2026-10-02 11:00', type: 'earn', amount: 4.0, note: 'Manikür və gel-lak qəbulu (#BK-114)', balanceAfter: 28.0 },
                        { id: 'h5', date: '2026-09-01 14:00', type: 'birthday', amount: 15.0, note: 'Ad günü bonusu', balanceAfter: 24.0 }
                    ]
                },
                {
                    id: 'cl_3',
                    name: 'Samir Əliyev',
                    phone: '+994 (70) 567-89-01',
                    cardNumber: 'LC-309124',
                    tier: 'standard',
                    bonusBalance: 18.0,
                    totalSpent: 360.0,
                    visitsCount: 6,
                    lastVisit: '2026-09-22',
                    history: [
                        { id: 'h6', date: '2026-09-22 17:45', type: 'earn', amount: 3.0, note: 'Saç və saqqal qulluğu (#BK-087)', balanceAfter: 18.0 },
                        { id: 'h7', date: '2026-08-05 13:20', type: 'welcome', amount: 10.0, note: 'Xoş gəldin bonusu', balanceAfter: 15.0 }
                    ]
                },
                {
                    id: 'cl_4',
                    name: 'Fərid Rzayev',
                    phone: '+994 (51) 890-12-34',
                    cardNumber: 'LC-994102',
                    tier: 'vip',
                    bonusBalance: 52.0,
                    totalSpent: 1640.0,
                    visitsCount: 18,
                    lastVisit: '2026-10-01',
                    history: [
                        { id: 'h8', date: '2026-10-01 19:10', type: 'earn', amount: 7.0, note: 'Kompleks xidmət paketi (#BK-112)', balanceAfter: 52.0 }
                    ]
                },
                {
                    id: 'cl_5',
                    name: 'Leyla Kərimova',
                    phone: '+994 (77) 678-90-12',
                    cardNumber: 'LC-441203',
                    tier: 'standard',
                    bonusBalance: 12.0,
                    totalSpent: 240.0,
                    visitsCount: 4,
                    lastVisit: '2026-09-15',
                    history: [
                        { id: 'h9', date: '2026-09-15 16:30', type: 'earn', amount: 2.0, note: 'Üz baxımı və masaj (#BK-079)', balanceAfter: 12.0 }
                    ]
                },
                {
                    id: 'cl_6',
                    name: 'Elnur Həsənov',
                    phone: '+994 (50) 412-34-56',
                    cardNumber: 'LC-552190',
                    tier: 'silver',
                    bonusBalance: 35.0,
                    totalSpent: 700.0,
                    visitsCount: 11,
                    lastVisit: '2026-09-30',
                    history: [
                        { id: 'h10', date: '2026-09-30 14:00', type: 'earn', amount: 5.0, note: 'Saç kəsimi və saç rəngləmə (#BK-105)', balanceAfter: 35.0 }
                    ]
                }
            ],
            giftCards: [
                {
                    id: 'gc_1',
                    name: 'Standart Hədiyyə Kartı 50 ₼',
                    type: 'general',
                    serviceId: null,
                    serviceName: null,
                    nominal: 50.0,
                    salePrice: 50.0,
                    durationDays: 90,
                    usageLimit: 'unlimited',
                    allowPartial: true,
                    isAvailableForSale: true,
                    status: 'active',
                    color: 'amber',
                    soldCount: 18,
                    createdAt: '2026-09-15'
                },
                {
                    id: 'gc_2',
                    name: 'Premium Hədiyyə Kartı 100 ₼',
                    type: 'general',
                    serviceId: null,
                    serviceName: null,
                    nominal: 100.0,
                    salePrice: 90.0,
                    durationDays: 180,
                    usageLimit: 'unlimited',
                    allowPartial: true,
                    isAvailableForSale: true,
                    status: 'active',
                    color: 'purple',
                    soldCount: 25,
                    createdAt: '2026-09-20'
                },
                {
                    id: 'gc_3',
                    name: 'Spa və Saç Baxımı Hədiyyə Kartı',
                    type: 'service',
                    serviceId: 'srv_1',
                    serviceName: 'Spa saç baxımı',
                    nominal: 70.0,
                    salePrice: 65.0,
                    durationDays: 60,
                    usageLimit: '1',
                    allowPartial: false,
                    isAvailableForSale: true,
                    status: 'active',
                    color: 'emerald',
                    soldCount: 9,
                    createdAt: '2026-09-25'
                },
                {
                    id: 'gc_4',
                    name: 'VIP Kompleks Baxım Kartı',
                    type: 'general',
                    serviceId: null,
                    serviceName: null,
                    nominal: 200.0,
                    salePrice: 180.0,
                    durationDays: 365,
                    usageLimit: 'unlimited',
                    allowPartial: true,
                    isAvailableForSale: true,
                    status: 'active',
                    color: 'slate',
                    soldCount: 6,
                    createdAt: '2026-09-28'
                },
                {
                    id: 'gc_5',
                    name: 'Ekspres Manikür Hədiyyə Kartı',
                    type: 'service',
                    serviceId: 'srv_2',
                    serviceName: 'Klassik manikür',
                    nominal: 30.0,
                    salePrice: 30.0,
                    durationDays: 30,
                    usageLimit: '1',
                    allowPartial: false,
                    isAvailableForSale: false,
                    status: 'inactive',
                    color: 'rose',
                    soldCount: 3,
                    createdAt: '2026-10-01'
                }
            ],
            subscriptions: this.getDefaultSubscriptions(),
            deposits: [
                {
                    id: 'dep_1',
                    clientName: 'Sevinc Qasımova',
                    clientPhone: '+994 (50) 450-80-90',
                    balance: 145.0,
                    totalDeposited: 400.0,
                    totalSpent: 255.0,
                    lastTransactionDate: '2026-10-02 12:45',
                    status: 'active',
                    note: 'Daimi VIP müştəri depozit hesabı',
                    history: [
                        { id: 'dh_1', date: '2026-09-01 10:00', type: 'topup', amount: 200.0, method: 'Bank kartı / Terminal', note: 'İlkin depozit ödənişi', balanceAfter: 200.0 },
                        { id: 'dh_2', date: '2026-09-15 15:20', type: 'spend', amount: 95.0, method: 'Depozit hesabı', note: 'Kompleks saç baxımı xidməti (#BK-102)', balanceAfter: 105.0 },
                        { id: 'dh_3', date: '2026-10-01 11:30', type: 'topup', amount: 200.0, method: 'Nağd', note: 'Balans artımı', balanceAfter: 305.0 },
                        { id: 'dh_4', date: '2026-10-02 12:45', type: 'spend', amount: 160.0, method: 'Depozit hesabı', note: 'Boya və keratin xidməti (#BK-125)', balanceAfter: 145.0 }
                    ]
                },
                {
                    id: 'dep_2',
                    clientName: 'Murad Babayev',
                    clientPhone: '+994 (55) 777-12-34',
                    balance: 60.0,
                    totalDeposited: 150.0,
                    totalSpent: 90.0,
                    lastTransactionDate: '2026-09-29 17:00',
                    status: 'active',
                    note: 'Ailəvi depozit hesabı',
                    history: [
                        { id: 'dh_5', date: '2026-09-10 14:00', type: 'topup', amount: 150.0, method: 'Bank kartı / Terminal', note: 'İlkin avans ödənişi', balanceAfter: 150.0 },
                        { id: 'dh_6', date: '2026-09-29 17:00', type: 'spend', amount: 90.0, method: 'Depozit hesabı', note: 'Usta Samir saç qulluğu (#BK-109)', balanceAfter: 60.0 }
                    ]
                },
                {
                    id: 'dep_3',
                    clientName: 'Nərgiz Məmmədli',
                    clientPhone: '+994 (77) 312-78-90',
                    balance: 0.0,
                    totalDeposited: 100.0,
                    totalSpent: 100.0,
                    lastTransactionDate: '2026-09-20 18:30',
                    status: 'empty',
                    note: 'Balans tam istifadə olunub',
                    history: [
                        { id: 'dh_7', date: '2026-08-20 12:00', type: 'topup', amount: 100.0, method: 'Nağd', note: 'Depozit mədaxili', balanceAfter: 100.0 },
                        { id: 'dh_8', date: '2026-09-20 18:30', type: 'spend', amount: 100.0, method: 'Depozit hesabı', note: 'Kosmetoloji qulluq (#BK-084)', balanceAfter: 0.0 }
                    ]
                },
                {
                    id: 'dep_4',
                    clientName: 'Vüsal İsmayılov',
                    clientPhone: '+994 (50) 901-23-45',
                    balance: 220.0,
                    totalDeposited: 500.0,
                    totalSpent: 280.0,
                    lastTransactionDate: '2026-10-01 16:15',
                    status: 'active',
                    note: 'Daimi korporativ depozit hesabı',
                    history: [
                        { id: 'dh_9', date: '2026-09-05 09:30', type: 'topup', amount: 500.0, method: 'Bank köçürməsi', note: 'Hesaba köçürmə yolu ilə depozit', balanceAfter: 500.0 },
                        { id: 'dh_10', date: '2026-10-01 16:15', type: 'spend', amount: 280.0, method: 'Depozit hesabı', note: 'Premium baxım xidmətləri', balanceAfter: 220.0 }
                    ]
                }
            ]
        };

        if (this.storageKey('zeyvo_loyalty_data_v2') !== 'zeyvo_loyalty_data_v2') {
            initialData.clients = [];
            initialData.giftCards = [];
            initialData.deposits = [];
        }
        this.saveLoyaltyData(initialData);
        return initialData;
    },

    saveLoyaltyData: function(data) {
        localStorage.setItem(this.storageKey('zeyvo_loyalty_data_v2'), JSON.stringify(data));
    },

    getLoyaltyBadgeCount: function() {
        const data = this.getLoyaltyData();
        const activeGiftCards = (data.giftCards || []).filter(c => c.status === 'active').length;
        const activeSubs = (data.subscriptions || []).filter(s => s.status === 'active').length;
        return activeGiftCards + activeSubs;
    },

    refreshLoyaltyCanvas: function() {
        const container = document.getElementById('bizCanvasBody');
        if (container) {
            this.activeTab = 'loyalty';
            container.innerHTML = this.renderLoyaltyModule();
        }
    },

    switchLoyaltySubTab: function(subTab) {
        this.loyaltyActiveTab = subTab;
        window.location.hash = '#/business/loyalty/' + subTab;
        this.refreshLoyaltyCanvas();

        // Refresh header action buttons and title
        const h1 = document.getElementById('bizCanvasTitle');
        if (h1) h1.textContent = this.getTabTitle();
        this.render();
    },

    /* =========================================================================
       LOYALTY MAIN CONTAINER (4 SUB-TABS)
       ========================================================================= */

    renderLoyaltyModule: function() {
        const data = this.getLoyaltyData();
        let sub = this.loyaltyActiveTab || 'cards_cashback';
        if (sub === 'deposits') sub = 'cards_cashback';

        const giftCardsCount = (data.giftCards || []).filter(c => c.status === 'active').length;
        const subscriptionsCount = (data.subscriptions || []).filter(s => s.status === 'active').length;
        const cardsCount = (data.loyaltyCards || []).length;
        const subTabs = [
            { id: 'cards_cashback', label: 'Loyallıq kartları və cashback', badge: cardsCount },
            { id: 'gift_cards', label: 'Hədiyyə kartları', badge: giftCardsCount },
            { id: 'subscriptions', label: 'Abunəliklər', badge: subscriptionsCount }
        ];

        let contentHtml = '';
        if (sub === 'gift_cards') {
            contentHtml = this.renderLoyaltyGiftCardsSubTab(data);
        } else if (sub === 'subscriptions') {
            contentHtml = this.renderLoyaltySubscriptionsSubTab(data);
        } else {
            contentHtml = this.renderLoyaltyCardsCashbackSubTab(data);
        }

        return `
            <div class="max-w-7xl mx-auto px-4 py-5 sm:px-7 sm:py-7 space-y-6">
                <!-- SUB-TABS NAVIGATION (Unified Segmented Control) -->
                <div>
                    ${this.renderSegmentedTabs({
                        tabs: subTabs,
                        activeId: sub,
                        onSelect: 'BusinessDashboardView.switchLoyaltySubTab'
                    })}
                </div>

                <!-- SUB-TAB CONTENT -->
                <div id="bizLoyaltySubContent">
                    ${contentHtml}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 1: LOYALLIQ KARTLARI VƏ CASHBACK (CARDS & CASHBACK RULES CRUD)
       ========================================================================= */

    renderLoyaltyCardsCashbackSubTab: function(data) {
        const cards = data.loyaltyCards || [];

        // KPI metrics
        const totalCards = cards.length;
        const activeCards = cards.filter(c => c.status === 'active');
        const activeCount = activeCards.length;
        const discountCount = cards.filter(c => c.type === 'discount').length;
        const cashbackCount = cards.filter(c => c.type === 'cashback').length;
        const newClientCount = cards.filter(c => c.target === 'new').length;

        // Filter and Search
        const query = (this.loyaltyCardRuleSearch || '').toLowerCase().trim();
        const typeFilter = this.loyaltyCardRuleTypeFilter || 'all';
        const statusFilter = this.loyaltyCardRuleStatusFilter || 'all';
        const targetFilter = this.loyaltyCardRuleTargetFilter || 'all';

        let activeFilterCount = 0;
        if (typeFilter !== 'all') activeFilterCount++;
        if (statusFilter !== 'all') activeFilterCount++;
        if (targetFilter !== 'all') activeFilterCount++;

        let filteredCards = cards.filter(card => {
            if (typeFilter !== 'all' && card.type !== typeFilter) return false;
            if (statusFilter !== 'all' && card.status !== statusFilter) return false;
            if (targetFilter !== 'all') {
                if (targetFilter === 'new' && card.target !== 'new') return false;
                if (targetFilter === 'all_clients' && card.target !== 'all' && card.target !== 'all_clients') return false;
            }
            if (!query) return true;
            const name = (card.name || '').toLowerCase();
            return name.includes(query);
        });

        // Pagination
        const totalItems = filteredCards.length;
        const pageSize = this.loyaltyCardRulePageSize || 10;
        const currentPage = Math.min(this.loyaltyCardRuleCurrentPage || 1, Math.max(1, Math.ceil(totalItems / pageSize)));
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedCards = filteredCards.slice(startIndex, startIndex + pageSize);

        const getCardGradient = (color) => {
            switch (color) {
                case 'silver':
                    return 'from-slate-400 via-slate-500 to-slate-600';
                case 'amber':
                    return 'from-amber-500 via-amber-600 to-amber-700';
                case 'purple':
                    return 'from-purple-700 via-purple-800 to-indigo-900';
                case 'emerald':
                    return 'from-emerald-600 via-emerald-700 to-teal-800';
                case 'rose':
                    return 'from-rose-500 via-rose-600 to-pink-700';
                case 'slate':
                default:
                    return 'from-slate-700 via-slate-800 to-slate-900';
            }
        };

        return `
            <div class="space-y-6">
                <!-- 1. KPI SUMMARY CARDS -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Aktiv kartlar & qaydalar</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${activeCount} <span class="text-xs font-sans font-semibold text-slate-500">/ ${totalCards} qayda</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">İstifadəyə aktiv loyallıq proqramı</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Endirim kartları</span>
                            <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m19 5-14 14M5 5h.01M19 19h.01"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${discountCount} <span class="text-xs font-sans font-semibold text-slate-500">kart</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Birbaşa servis endirimi</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Keşbek (bonus) qaydaları</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${cashbackCount} <span class="text-xs font-sans font-semibold text-slate-500">proqram</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Çekdən toplanan keşbek balları</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Yeni müştəri qaydaları</span>
                            <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${newClientCount} <span class="text-xs font-sans font-semibold text-slate-500">qayda</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">İlk gəliş üçün xüsusi imtiyaz</p>
                        </div>
                    </div>
                </div>

                <!-- 2. FILTER & SEARCH TOOLBAR (Services module style) -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <!-- Search Input -->
                        <div class="relative flex-1">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="loyaltyCardRuleSearchInput"
                                   placeholder="Kart və ya qayda adı ilə axtarın..."
                                   value="${this.escapeHtml(this.loyaltyCardRuleSearch || '')}"
                                   oninput="BusinessDashboardView.onLoyaltyCardRuleSearch(this.value)"
                                   class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                            ${this.loyaltyCardRuleSearch ? `
                                <button type="button" onclick="BusinessDashboardView.clearLoyaltyCardRuleSearch()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer" title="Təmizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            ` : ''}
                        </div>

                        <!-- Filter Modal Trigger Button -->
                        <button type="button" onclick="BusinessDashboardView.openLoyaltyCardRuleFilterModal()" class="h-11 px-4 rounded-2xl bg-white border ${activeFilterCount > 0 ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 bg-amber-50/20' : 'border-slate-200/80 hover:border-slate-300'} text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0">
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
                    ${(activeFilterCount > 0 || this.loyaltyCardRuleSearch) ? `
                        <div class="flex items-center gap-2 flex-wrap pt-1 text-xs">
                            <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                            ${typeFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Tip: ${typeFilter === 'discount' ? 'Endirim' : 'Keşbek'}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterLoyaltyCardRuleType('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${statusFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/70 font-semibold text-[11px]">
                                    <span>Status: ${statusFilter === 'active' ? 'Aktiv' : 'Qeyri-aktiv'}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterLoyaltyCardRuleStatus('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${targetFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 text-purple-900 border border-purple-200/70 font-semibold text-[11px]">
                                    <span>Auditoriya: ${targetFilter === 'new' ? 'Yalnız yeni' : 'Bütün müştərilər'}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterLoyaltyCardRuleTarget('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${this.loyaltyCardRuleSearch ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-[11px]">
                                    <span>Axtarış: "${this.escapeHtml(this.loyaltyCardRuleSearch)}"</span>
                                    <button type="button" onclick="BusinessDashboardView.clearLoyaltyCardRuleSearch()" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            <button type="button" onclick="BusinessDashboardView.resetLoyaltyCardRuleFilters()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer ml-1">
                                Hamısını sıfırla
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- 3. CARDS & RULES TABLE -->
                <div class="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <div class="overflow-x-auto">
                        <table class="w-full min-w-[960px] text-left text-xs text-slate-600">
                            <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold whitespace-nowrap">
                                <tr>
                                    <th class="py-3 px-4 sm:px-5">Kart / qayda adı</th>
                                    <th class="py-3 px-4">Proqram tipi</th>
                                    <th class="py-3 px-4">Faiz dərəcəsi</th>
                                    <th class="py-3 px-4">Minimum məbləğ</th>
                                    <th class="py-3 px-4">Müddət, gün</th>
                                    <th class="py-3 px-4">Kimlərə tətbiq olunur</th>
                                    <th class="py-3 px-4">Status</th>
                                    <th class="py-3 px-4 sm:px-5 text-right">Fəaliyyət</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-medium">
                                ${paginatedCards.length === 0 ? `
                                    <tr>
                                        <td colspan="8" class="py-12 text-center text-slate-400 text-xs">
                                            <div class="max-w-xs mx-auto space-y-2">
                                                <svg class="w-8 h-8 text-slate-300 mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                                                <div class="font-semibold text-slate-600">Axtarışa uyğun loyallıq kartı və ya qayda tapılmadı</div>
                                                <button type="button" onclick="BusinessDashboardView.openAddLoyaltyCardRuleModal()" class="mt-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer">
                                                    Yeni kart / qayda yarat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ` : paginatedCards.map(card => {
                                    const gradient = getCardGradient(card.color || 'slate');
                                    const isDiscount = card.type === 'discount';
                                    const minAmt = parseFloat(card.minAmount) || 0;
                                    const duration = parseInt(card.durationDays) || 0;
                                    const isNewClientOnly = card.target === 'new';

                                    return `
                                        <tr class="hover:bg-slate-50/70 transition">
                                            <td class="py-3.5 px-4 sm:px-5 cursor-pointer" onclick="BusinessDashboardView.openAddLoyaltyCardRuleModal('${card.id}')">
                                                <div class="flex items-center gap-3">
                                                    <!-- Mini Card Visual Preview -->
                                                    <div class="w-11 h-7 rounded-lg bg-gradient-to-br ${gradient} shadow-2xs shrink-0 flex items-center justify-center p-1 border border-white/20">
                                                        <div class="w-2.5 h-1.5 rounded-xs bg-white/30"></div>
                                                    </div>
                                                    <div class="min-w-0">
                                                        <div class="font-bold text-slate-900 hover:text-amber-800 transition">${card.name}</div>
                                                        <div class="text-[11px] text-slate-400">
                                                            ${card.createdAt ? 'Yaradılıb: ' + this.formatDateDisplay(card.createdAt) : 'Loyallıq kartı'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                ${isDiscount ? `
                                                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 whitespace-nowrap">
                                                        Endirim
                                                    </span>
                                                ` : `
                                                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60 whitespace-nowrap">
                                                        Keşbek (bonuslar)
                                                    </span>
                                                `}
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                ${isDiscount ? `
                                                    <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs border border-blue-200/60 whitespace-nowrap">
                                                        -${card.percent}% Endirim
                                                    </span>
                                                ` : `
                                                    <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs border border-emerald-200/60 whitespace-nowrap">
                                                        +${card.percent}% Keşbek
                                                    </span>
                                                `}
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="font-mono font-semibold text-slate-800 whitespace-nowrap">
                                                    ${minAmt > 0 ? `${minAmt.toFixed(2)} ₼` : 'Məhdudiyyətsiz'}
                                                </span>
                                                ${minAmt > 0 ? '<div class="text-[10px] text-slate-400 font-normal whitespace-nowrap">minimum çek</div>' : ''}
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="font-mono font-semibold text-slate-700 whitespace-nowrap">
                                                    ${duration > 0 ? `${duration} gün` : 'Müddətsiz'}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                ${isNewClientOnly ? `
                                                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200/60 whitespace-nowrap">
                                                        Yalnız yeni müştərilər
                                                    </span>
                                                ` : `
                                                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60 whitespace-nowrap">
                                                        Bütün müştərilər
                                                    </span>
                                                `}
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold select-none whitespace-nowrap ${card.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-100 text-slate-600 border border-slate-200'}">
                                                    <span class="w-1.5 h-1.5 rounded-full ${card.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                                                    <span>${card.status === 'active' ? 'Aktiv' : 'Qeyri-aktiv'}</span>
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                                                <div class="flex items-center justify-end gap-1">
                                                    <button type="button" onclick="BusinessDashboardView.openAddLoyaltyCardRuleModal('${card.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.deleteLoyaltyCardRule('${card.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sil">
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

                    <!-- Pagination -->
                    ${this.renderTablePagination({
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        onPageChange: 'BusinessDashboardView.setLoyaltyCardRulePage',
                        onPageSizeChange: 'BusinessDashboardView.setLoyaltyCardRulePageSize',
                        itemName: 'kart / qayda'
                    })}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 2: HƏDİYYƏ KARTLARI (GIFT CARDS)
       ========================================================================= */

    renderLoyaltyGiftCardsSubTab: function(data) {
        const giftCards = data.giftCards || [];

        // KPI metrics
        const totalCards = giftCards.length;
        const activeCards = giftCards.filter(c => c.status === 'active');
        const generalCards = giftCards.filter(c => c.type === 'general' || !c.type);
        const serviceCards = giftCards.filter(c => c.type === 'service');
        const forSaleCards = giftCards.filter(c => c.isAvailableForSale !== false);

        // Filter and Search
        const query = (this.loyaltyGiftCardSearch || '').toLowerCase().trim();
        const typeFilter = this.loyaltyGiftCardTypeFilter || 'all';
        const saleFilter = this.loyaltyGiftCardSaleFilter || 'all';
        const statusFilter = this.loyaltyGiftCardStatusFilter || 'all';

        let activeFilterCount = 0;
        if (typeFilter !== 'all') activeFilterCount++;
        if (saleFilter !== 'all') activeFilterCount++;
        if (statusFilter !== 'all') activeFilterCount++;

        let filteredCards = giftCards.filter(card => {
            if (typeFilter !== 'all') {
                const cType = card.type || 'general';
                if (cType !== typeFilter) return false;
            }
            if (saleFilter !== 'all') {
                const isSale = card.isAvailableForSale !== false;
                if (saleFilter === 'available' && !isSale) return false;
                if (saleFilter === 'unavailable' && isSale) return false;
            }
            if (statusFilter !== 'all' && card.status !== statusFilter) return false;
            if (!query) return true;
            const name = (card.name || '').toLowerCase();
            const srvName = (card.serviceName || '').toLowerCase();
            const nominal = (card.nominal !== undefined ? card.nominal : '').toString();
            const salePrice = (card.salePrice !== undefined ? card.salePrice : '').toString();
            return name.includes(query) || srvName.includes(query) || nominal.includes(query) || salePrice.includes(query);
        });

        // Pagination
        const totalItems = filteredCards.length;
        const pageSize = this.loyaltyGiftCardPageSize || 10;
        const currentPage = Math.min(this.loyaltyGiftCardCurrentPage || 1, Math.max(1, Math.ceil(totalItems / pageSize)));
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedCards = filteredCards.slice(startIndex, startIndex + pageSize);

        const getCardGradient = (color) => {
            switch (color) {
                case 'amber':
                    return 'from-amber-500 via-amber-600 to-amber-700';
                case 'purple':
                    return 'from-purple-700 via-purple-800 to-indigo-900';
                case 'emerald':
                    return 'from-emerald-600 via-emerald-700 to-teal-800';
                case 'rose':
                    return 'from-rose-500 via-rose-600 to-pink-700';
                case 'slate':
                default:
                    return 'from-slate-700 via-slate-800 to-slate-900';
            }
        };

        return `
            <div class="space-y-6">
                <!-- 1. KPI SUMMARY CARDS -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Aktiv hədiyyə kartları</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${activeCards.length} <span class="text-xs font-sans font-semibold text-slate-500">ədəd</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">İstifadəyə hazır və aktiv kartlar</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Ümumi kartlar</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${generalCards.length} <span class="text-xs font-sans font-semibold text-slate-500">ədəd</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Bütün xidmətlər üçün keçərli</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Xüsusi xidmət kartları</span>
                            <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${serviceCards.length} <span class="text-xs font-sans font-semibold text-slate-500">ədəd</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Konkret xidmətlərə bağlı</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Satış üçün əlçatan</span>
                            <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-purple-700 leading-tight">
                                ${forSaleCards.length} <span class="text-xs font-sans font-semibold text-slate-500">ədəd</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Satışda aktiv olan kart növləri</p>
                        </div>
                    </div>
                </div>

                <!-- 2. FILTER & SEARCH TOOLBAR (Services module style) -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <!-- Search Input -->
                        <div class="relative flex-1">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="loyaltyGiftCardSearchInput"
                                   placeholder="Hədiyyə kartının adı, xidmət və ya qiymətlə axtarın..."
                                   value="${this.escapeHtml(this.loyaltyGiftCardSearch || '')}"
                                   oninput="BusinessDashboardView.onLoyaltyGiftCardSearch(this.value)"
                                   class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                            ${this.loyaltyGiftCardSearch ? `
                                <button type="button" onclick="BusinessDashboardView.clearLoyaltyGiftCardSearch()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer" title="Təmizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            ` : ''}
                        </div>

                        <!-- Filter Modal Trigger Button -->
                        <button type="button" onclick="BusinessDashboardView.openGiftCardFilterModal()" class="h-11 px-4 rounded-2xl bg-white border ${activeFilterCount > 0 ? 'border-slate-900 ring-2 ring-amber-400/40 bg-amber-50/20' : 'border-slate-200/80 hover:border-slate-300'} text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0">
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
                    ${(activeFilterCount > 0 || this.loyaltyGiftCardSearch) ? `
                        <div class="flex items-center gap-2 flex-wrap pt-1 text-xs">
                            <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                            ${typeFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Tip: ${typeFilter === 'service' ? 'Xüsusi xidmət' : 'Ümumi kart'}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterLoyaltyGiftCardType('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${saleFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 text-purple-900 border border-purple-200/70 font-semibold text-[11px]">
                                    <span>Satış: ${saleFilter === 'available' ? 'Satışda aktiv' : 'Satışda deyil'}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterLoyaltyGiftCardSale('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${statusFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/70 font-semibold text-[11px]">
                                    <span>Status: ${statusFilter === 'active' ? 'Aktiv' : 'Qeyri-aktiv'}</span>
                                    <button type="button" onclick="BusinessDashboardView.filterLoyaltyGiftCardStatus('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            ${this.loyaltyGiftCardSearch ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-[11px]">
                                    <span>Axtarış: "${this.escapeHtml(this.loyaltyGiftCardSearch)}"</span>
                                    <button type="button" onclick="BusinessDashboardView.clearLoyaltyGiftCardSearch()" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}

                            <button type="button" onclick="BusinessDashboardView.resetLoyaltyGiftCardFilters()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer ml-1">
                                Hamısını sıfırla
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- 3. GIFT CARDS TABLE -->
                <div class="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <div class="overflow-x-auto">
                        <table class="w-full min-w-[980px] text-left text-xs text-slate-600">
                            <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold whitespace-nowrap">
                                <tr>
                                    <th class="py-3 px-4 sm:px-5">Hədiyyə kartının adı</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Tipi</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Nominal</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Satış qiyməti</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Müddət, gün</th>
                                    <th class="py-3 px-4 whitespace-nowrap">İstifadə qaydası</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Satış vəziyyəti</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Status</th>
                                    <th class="py-3 px-4 sm:px-5 text-right whitespace-nowrap">Fəaliyyət</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-medium">
                                ${paginatedCards.length === 0 ? `
                                    <tr>
                                        <td colspan="9" class="py-12 text-center text-slate-400 text-xs">
                                            <div class="max-w-xs mx-auto space-y-2">
                                                <svg class="w-8 h-8 text-slate-300 mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                                                <div class="font-semibold text-slate-600">Axtarışa uyğun hədiyyə kartı tapılmadı</div>
                                                <button type="button" onclick="BusinessDashboardView.openAddCertificateModal()" class="mt-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer">
                                                    Yeni hədiyyə kartı yarat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ` : paginatedCards.map(card => {
                                    const gradient = getCardGradient(card.color || 'amber');
                                    const isService = card.type === 'service';
                                    const nominal = parseFloat(card.nominal) || 0;
                                    const salePrice = parseFloat(card.salePrice) || 0;
                                    const duration = parseInt(card.durationDays) || 0;
                                    const hasDiscount = salePrice < nominal;

                                    return `
                                        <tr class="hover:bg-slate-50/70 transition">
                                            <td class="py-3.5 px-4 sm:px-5 cursor-pointer" onclick="BusinessDashboardView.openAddCertificateModal('${card.id}')">
                                                <div class="flex items-center gap-3">
                                                    <!-- Mini Card Visual Preview -->
                                                    <div class="w-11 h-7 rounded-lg bg-gradient-to-br ${gradient} shadow-2xs shrink-0 flex items-center justify-center p-1 border border-white/20">
                                                        <div class="w-2.5 h-1.5 rounded-xs bg-white/30"></div>
                                                    </div>
                                                    <div class="min-w-0">
                                                        <div class="font-bold text-slate-900 hover:text-amber-800 transition">${this.escapeHtml(card.name)}</div>
                                                        <div class="text-[11px] text-slate-400 whitespace-nowrap">
                                                            ${card.createdAt ? 'Yaradılıb: ' + this.formatDateDisplay(card.createdAt) : 'Hədiyyə kartı'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                ${isService ? `
                                                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 whitespace-nowrap">
                                                        Xüsusi xidmət
                                                    </span>
                                                    <div class="text-[11px] text-slate-500 font-medium truncate max-w-[140px] mt-0.5 whitespace-nowrap" title="${this.escapeHtml(card.serviceName || '')}">
                                                        ${this.escapeHtml(card.serviceName || 'Təyin edilmiş xidmət')}
                                                    </div>
                                                ` : `
                                                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60 whitespace-nowrap">
                                                        Ümumi kart
                                                    </span>
                                                    <div class="text-[11px] text-slate-400 mt-0.5 whitespace-nowrap">Bütün xidmətlər</div>
                                                `}
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="font-mono font-bold text-slate-900 text-xs whitespace-nowrap">
                                                    ${nominal.toFixed(2)} ₼
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="flex items-center gap-1.5 flex-wrap whitespace-nowrap">
                                                    <span class="font-mono font-bold text-slate-800 text-xs whitespace-nowrap">
                                                        ${salePrice.toFixed(2)} ₼
                                                    </span>
                                                    ${hasDiscount ? `
                                                        <span class="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60 font-mono whitespace-nowrap">
                                                            -${(nominal - salePrice).toFixed(0)} ₼
                                                        </span>
                                                    ` : ''}
                                                </div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="font-mono font-semibold text-slate-700 whitespace-nowrap">
                                                    ${duration > 0 ? `${duration} gün` : 'Müddətsiz'}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="space-y-0.5 whitespace-nowrap">
                                                    <div class="text-xs text-slate-700 font-medium whitespace-nowrap">
                                                        ${card.usageLimit === 'unlimited' ? 'Limitsiz' : (card.usageLimit + ' dəfə')}
                                                    </div>
                                                    <div>
                                                        ${card.allowPartial !== false ? `
                                                            <span class="text-[11px] font-semibold text-emerald-700 whitespace-nowrap">Qalıq saxlanılır</span>
                                                        ` : `
                                                            <span class="text-[11px] font-normal text-slate-400 whitespace-nowrap">Birdəfəlik</span>
                                                        `}
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold select-none whitespace-nowrap ${card.isAvailableForSale !== false ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-100 text-slate-600 border border-slate-200'}">
                                                    <span class="w-1.5 h-1.5 rounded-full ${card.isAvailableForSale !== false ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                                                    <span>${card.isAvailableForSale !== false ? 'Satışda aktiv' : 'Satışda deyil'}</span>
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold select-none whitespace-nowrap ${card.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-100 text-slate-600 border border-slate-200'}">
                                                    <span class="w-1.5 h-1.5 rounded-full ${card.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                                                    <span>${card.status === 'active' ? 'Aktiv' : 'Qeyri-aktiv'}</span>
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                                                <div class="flex items-center justify-end gap-1">
                                                    <button type="button" onclick="BusinessDashboardView.openAddCertificateModal('${card.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.deleteCertificate('${card.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sil">
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

                    <!-- Pagination -->
                    ${this.renderTablePagination({
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        onPageChange: 'BusinessDashboardView.setLoyaltyGiftCardPage',
                        onPageSizeChange: 'BusinessDashboardView.setLoyaltyGiftCardPageSize',
                        itemName: 'hədiyyə kartı'
                    })}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 3: ABUNƏLİKLƏR (SUBSCRIPTIONS)
       ========================================================================= */

    renderLoyaltySubscriptionsSubTab: function(data) {
        const subscriptions = data.subscriptions || [];

        // KPI metrics
        const activeSubs = subscriptions.filter(s => s.status === 'active');
        const forSaleSubs = subscriptions.filter(s => s.isAvailableForSale !== false);
        const onlineSubs = subscriptions.filter(s => s.isAvailableOnline === true);
        const totalSold = subscriptions.reduce((sum, s) => sum + (parseInt(s.soldCount) || 0), 0);

        // Search & Filter
        const query = (this.loyaltySubSearch || '').toLowerCase().trim();
        const statusFilter = this.loyaltySubStatusFilter || 'all';
        const saleFilter = this.loyaltySubSaleFilter || 'all';
        const onlineFilter = this.loyaltySubOnlineFilter || 'all';

        let filteredSubs = subscriptions.filter(sub => {
            if (statusFilter !== 'all' && sub.status !== statusFilter) return false;
            if (saleFilter === 'available' && sub.isAvailableForSale === false) return false;
            if (saleFilter === 'unavailable' && sub.isAvailableForSale !== false) return false;
            if (onlineFilter === 'online' && !sub.isAvailableOnline) return false;
            if (onlineFilter === 'offline' && sub.isAvailableOnline) return false;
            if (!query) return true;

            const name = (sub.name || '').toLowerCase();
            const serv = (sub.serviceNames || '').toLowerCase();
            return name.includes(query) || serv.includes(query);
        });

        const activeFilterCount = (statusFilter !== 'all' ? 1 : 0) + (saleFilter !== 'all' ? 1 : 0) + (onlineFilter !== 'all' ? 1 : 0);

        // Pagination
        const totalItems = filteredSubs.length;
        const pageSize = this.loyaltySubPageSize || 10;
        const currentPage = Math.min(this.loyaltySubCurrentPage || 1, Math.max(1, Math.ceil(totalItems / pageSize)));
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedSubs = filteredSubs.slice(startIndex, startIndex + pageSize);

        const colorClasses = {
            purple: 'from-purple-600 to-indigo-800 text-white',
            amber: 'from-amber-500 to-amber-700 text-white',
            emerald: 'from-emerald-600 to-teal-800 text-white',
            rose: 'from-rose-500 to-pink-700 text-white',
            slate: 'from-slate-700 to-slate-900 text-white'
        };

        return `
            <div class="space-y-6">
                <!-- 1. KPI SUMMARY CARDS -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Aktiv abunəliklər</span>
                            <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${activeSubs.length} <span class="text-xs font-sans font-semibold text-slate-500">paket</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">İstifadəyə yararlı aktiv paketlər</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Satışda olan paketlər</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${forSaleSubs.length} <span class="text-xs font-sans font-semibold text-slate-500">paket</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Adminlər tərəfindən satıla bilən</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Onlayn sifarişə açıq</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-emerald-700 leading-tight">
                                ${onlineSubs.length} <span class="text-xs font-sans font-semibold text-slate-500">paket</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Onlayn qeydiyyatda əlçatan</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Cəmi satılan</span>
                            <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalSold} <span class="text-xs font-sans font-semibold text-slate-500">ədəd</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Müştərilərə satılmış abunəliklər</p>
                        </div>
                    </div>
                </div>

                <!-- 2. FILTER & SEARCH TOOLBAR (Full-width Services/Loyalty unified style) -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <!-- Search Input (Full width) -->
                        <div class="relative flex-1">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="loyaltySubSearchInput"
                                   value="${this.escapeHtml(this.loyaltySubSearch || '')}"
                                   oninput="BusinessDashboardView.onLoyaltySubSearch(this.value)"
                                   placeholder="Abunəlik adı və ya xidmətlərlə axtarış..."
                                   class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                            ${this.loyaltySubSearch ? `
                                <button type="button" onclick="BusinessDashboardView.clearLoyaltySubSearch()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer" title="Təmizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            ` : ''}
                        </div>

                        <!-- Filter Modal Button -->
                        <button type="button" onclick="BusinessDashboardView.openSubFilterModal()" class="h-11 px-4 rounded-2xl bg-white border ${activeFilterCount > 0 ? 'border-slate-900 ring-2 ring-amber-400/40 bg-amber-50/20' : 'border-slate-200/80 hover:border-slate-300'} text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0">
                            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                            <span class="hidden sm:inline">Filtrlər</span>
                            ${activeFilterCount > 0 ? `
                                <span class="w-5 h-5 rounded-full bg-[#101114] text-white text-[10px] font-bold flex items-center justify-center -mr-1">
                                    ${activeFilterCount}
                                </span>
                            ` : ''}
                        </button>
                    </div>

                    <!-- Active Filter Chips -->
                    ${(activeFilterCount > 0 || this.loyaltySubSearch) ? `
                        <div class="flex items-center gap-2 flex-wrap pt-1 text-xs">
                            <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                            ${saleFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Satış: ${saleFilter === 'available' ? 'Aktiv' : 'Deyil'}</span>
                                    <button type="button" onclick="BusinessDashboardView.removeSubFilter('sale')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}
                            ${onlineFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Onlayn: ${onlineFilter === 'online' ? 'Aktiv' : 'Daxili'}</span>
                                    <button type="button" onclick="BusinessDashboardView.removeSubFilter('online')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}
                            ${statusFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Status: ${statusFilter === 'active' ? 'Aktiv' : 'Qeyri-aktiv'}</span>
                                    <button type="button" onclick="BusinessDashboardView.removeSubFilter('status')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                                </span>
                            ` : ''}
                            <button type="button" onclick="BusinessDashboardView.resetSubModalFilters()" class="text-xs font-semibold text-rose-600 hover:underline px-1 cursor-pointer">Hamısını təmizlə</button>
                        </div>
                    ` : ''}
                </div>

                <!-- 3. SUBSCRIPTIONS TABLE -->
                <div class="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-slate-600 min-w-[980px]">
                            <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold whitespace-nowrap">
                                <tr>
                                    <th class="py-3 px-4 sm:px-5">Abunəlik adı</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Ziyarət sayı</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Müddət</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Qiymət</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Xidmət təyinatı</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Qaydalar</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Satış vəziyyəti</th>
                                    <th class="py-3 px-4 whitespace-nowrap">Status</th>
                                    <th class="py-3 px-4 sm:px-5 text-right whitespace-nowrap">Əməliyyatlar</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-medium">
                                ${paginatedSubs.length === 0 ? `
                                    <tr>
                                        <td colspan="9" class="py-12 text-center text-slate-400 text-xs">
                                            Axtarışa uyğun abunəlik paketi tapılmadı
                                        </td>
                                    </tr>
                                ` : paginatedSubs.map(sub => {
                                    const cardGradient = colorClasses[sub.color] || colorClasses.purple;
                                    const durationText = sub.durationDays > 0 ? `${sub.durationDays} gün` : 'Limitsiz';
                                    const isOnlyAssigned = sub.onlyAssignedServices !== false;

                                    return `
                                        <tr class="hover:bg-slate-50/70 transition">
                                            <td class="py-3.5 px-4 sm:px-5 cursor-pointer" onclick="BusinessDashboardView.openAddSubscriptionModal('${sub.id}')">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-10 h-7 rounded-lg bg-gradient-to-br ${cardGradient} p-1 flex items-center justify-center shrink-0 shadow-2xs">
                                                        <svg class="w-4 h-4 text-white/90" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
                                                    </div>
                                                    <div>
                                                        <div class="font-bold text-slate-900 hover:text-amber-800 transition text-xs">${this.escapeHtml(sub.name)}</div>
                                                        <div class="text-[11px] text-slate-400 font-normal whitespace-nowrap">Cəmi satılan: <strong class="text-slate-600 font-mono">${sub.soldCount || 0}</strong> ədəd</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-mono font-bold text-xs whitespace-nowrap">
                                                    ${sub.visitsCount || 0} ziyarət
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="text-xs font-semibold text-slate-800 whitespace-nowrap">${durationText}</span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="font-mono font-bold text-slate-900 text-xs whitespace-nowrap">${(parseFloat(sub.price) || 0).toFixed(2)} ₼</span>
                                            </td>
                                            <td class="py-3.5 px-4 max-w-xs whitespace-nowrap">
                                                ${isOnlyAssigned ? `
                                                    <div class="space-y-0.5 whitespace-nowrap">
                                                        <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/60 whitespace-nowrap">
                                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                                            <span>Yalnız təyin edilmiş</span>
                                                        </span>
                                                        <div class="text-[11px] text-slate-500 truncate max-w-[180px]" title="${sub.serviceNames || ''}">
                                                            ${sub.serviceNames || 'Xidmətlər seçilməyib'}
                                                        </div>
                                                    </div>
                                                ` : `
                                                    <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 whitespace-nowrap">
                                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                        <span>Bütün xidmətlər</span>
                                                    </span>
                                                `}
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <div class="flex flex-col gap-1 items-start whitespace-nowrap">
                                                    ${sub.isAvailableOnline ? `
                                                        <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded whitespace-nowrap">
                                                            <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                                            <span>Onlayn sifariş</span>
                                                        </span>
                                                    ` : `
                                                        <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                                                            <span>Yalnız daxili</span>
                                                        </span>
                                                    `}
                                                    ${sub.rolloverUnusedVisits ? `
                                                        <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded whitespace-nowrap">
                                                            <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                                            <span>Ziyarəti keçir</span>
                                                        </span>
                                                    ` : ''}
                                                </div>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold select-none whitespace-nowrap ${sub.isAvailableForSale !== false ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-100 text-slate-600 border border-slate-200'}">
                                                    <span class="w-1.5 h-1.5 rounded-full ${sub.isAvailableForSale !== false ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                                                    <span>${sub.isAvailableForSale !== false ? 'Satışda aktiv' : 'Satışda deyil'}</span>
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 whitespace-nowrap">
                                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold select-none whitespace-nowrap ${sub.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-100 text-slate-600 border border-slate-200'}">
                                                    <span class="w-1.5 h-1.5 rounded-full ${sub.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                                                    <span>${sub.status === 'active' ? 'Aktiv' : 'Qeyri-aktiv'}</span>
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
                                                <div class="flex items-center justify-end gap-1">
                                                    <button type="button" onclick="BusinessDashboardView.openAddSubscriptionModal('${sub.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.deleteSubscription('${sub.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Paketi sil">
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
                        onPageChange: 'BusinessDashboardView.setLoyaltySubPage',
                        onPageSizeChange: 'BusinessDashboardView.setLoyaltySubPageSize',
                        itemName: 'abunəlik'
                    })}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SUB-TAB 4: MÜŞTƏRİ DEPOZİTLƏRİ (CLIENT DEPOSITS / PREPAID BALANCES)
       ========================================================================= */

    renderLoyaltyDepositsSubTab: function(data) {
        const deposits = data.deposits || [];

        // KPI metrics
        const totalDepositBalance = deposits.reduce((sum, d) => sum + (parseFloat(d.balance) || 0), 0);
        const activeAccountsCount = deposits.filter(d => (parseFloat(d.balance) || 0) > 0).length;
        const totalTopups = deposits.reduce((sum, d) => sum + (parseFloat(d.totalDeposited) || 0), 0);
        const totalSpends = deposits.reduce((sum, d) => sum + (parseFloat(d.totalSpent) || 0), 0);

        // Search & Filter
        const query = (this.loyaltyDepositSearch || '').toLowerCase().trim();
        const statusFilter = this.loyaltyDepositStatusFilter || 'all';

        let filteredDeposits = deposits.filter(dep => {
            if (statusFilter === 'active' && (dep.balance || 0) <= 0) return false;
            if (statusFilter === 'empty' && (dep.balance || 0) > 0) return false;
            if (!query) return true;
            const name = (dep.clientName || '').toLowerCase();
            const phone = (dep.clientPhone || '').toLowerCase();
            const note = (dep.note || '').toLowerCase();
            return name.includes(query) || phone.includes(query) || note.includes(query);
        });

        // Pagination
        const totalItems = filteredDeposits.length;
        const pageSize = this.loyaltyDepositPageSize || 10;
        const currentPage = Math.min(this.loyaltyDepositCurrentPage || 1, Math.max(1, Math.ceil(totalItems / pageSize)));
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedDeposits = filteredDeposits.slice(startIndex, startIndex + pageSize);

        return `
            <div class="space-y-6">
                <!-- 1. KPI SUMMARY CARDS -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Ümumi depozit balansı</span>
                            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-emerald-700 leading-tight">
                                ${totalDepositBalance.toFixed(2)} ₼
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Müştərilərin avans hesabında</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Aktiv depozit sahibləri</span>
                            <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${activeAccountsCount} <span class="text-xs font-sans font-semibold text-slate-500">nəfər</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Balansı müsbət olan müştərilər</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Cəmi mədaxil</span>
                            <div class="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalTopups.toFixed(2)} ₼
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">İndiyə qədər depozitə yüklənib</p>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between text-slate-400">
                            <span class="text-xs font-semibold text-slate-500">Cəmi xərclənən</span>
                            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xl sm:text-2xl font-bold font-mono text-slate-900 leading-tight">
                                ${totalSpends.toFixed(2)} ₼
                            </div>
                            <p class="text-[11px] text-slate-400 font-normal mt-0.5">Xidmət haqqı üçün çıxılan</p>
                        </div>
                    </div>
                </div>

                <!-- 2. FILTER & ACTION BAR (Full-width unified style) -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <!-- Search Input (Full width) -->
                        <div class="relative flex-1 min-w-0">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="loyaltyDepositSearchInput"
                                   value="${this.escapeHtml(this.loyaltyDepositSearch || '')}"
                                   oninput="BusinessDashboardView.onLoyaltyDepositSearch(this.value)"
                                   placeholder="Müştəri adı və ya nömrə ilə axtarış..."
                                   class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                            ${this.loyaltyDepositSearch ? `
                                <button type="button" onclick="BusinessDashboardView.clearLoyaltyDepositSearch()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer" title="Təmizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            ` : ''}
                        </div>

                        <!-- Status Filter -->
                        <div class="relative shrink-0">
                            <select onchange="BusinessDashboardView.filterLoyaltyDepositStatus(this.value)" class="h-11 px-3 sm:px-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-900 transition shadow-2xs cursor-pointer">
                                <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>Bütün müştərilər</option>
                                <option value="active" ${statusFilter === 'active' ? 'selected' : ''}>Müsbət balanslılar</option>
                                <option value="empty" ${statusFilter === 'empty' ? 'selected' : ''}>Sıfır balanslılar</option>
                            </select>
                        </div>

                        <!-- Topup Button -->
                        <button onclick="BusinessDashboardView.openDepositTopupModal()" class="h-11 px-4 rounded-2xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-2xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer shrink-0">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                            <span class="hidden sm:inline">Depozit artır</span>
                            <span class="sm:hidden">Artır</span>
                        </button>
                    </div>
                </div>

                <!-- 3. DEPOSITS TABLE -->
                <div class="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-slate-600 min-w-[780px]">
                            <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold">
                                <tr>
                                    <th class="py-3 px-4 sm:px-5">Müştəri adı və telefon</th>
                                    <th class="py-3 px-4">Cari depozit balansı</th>
                                    <th class="py-3 px-4">Cəmi mədaxil</th>
                                    <th class="py-3 px-4">Cəmi xərclənən</th>
                                    <th class="py-3 px-4">Son əməliyyat</th>
                                    <th class="py-3 px-4">Qeyd</th>
                                    <th class="py-3 px-4 sm:px-5 text-right">Əməliyyatlar</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-medium">
                                ${paginatedDeposits.length === 0 ? `
                                    <tr>
                                        <td colspan="7" class="py-12 text-center text-slate-400 text-xs">
                                            Axtarışa uyğun müştəri depoziti tapılmadı
                                        </td>
                                    </tr>
                                ` : paginatedDeposits.map(dep => {
                                    return `
                                        <tr class="hover:bg-slate-50/70 transition">
                                            <td class="py-3.5 px-4 sm:px-5">
                                                <div class="font-bold text-slate-900">${dep.clientName}</div>
                                                <div class="text-[11px] text-slate-400 font-mono">${dep.clientPhone}</div>
                                            </td>
                                            <td class="py-3.5 px-4">
                                                <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs border border-emerald-200/60">
                                                    ${(dep.balance || 0).toFixed(2)} ₼
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 font-mono text-slate-700">
                                                +${(dep.totalDeposited || 0).toFixed(2)} ₼
                                            </td>
                                            <td class="py-3.5 px-4 font-mono text-slate-500">
                                                -${(dep.totalSpent || 0).toFixed(2)} ₼
                                            </td>
                                            <td class="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                                                ${this.formatDateDisplay(dep.lastTransactionDate) || '—'}
                                            </td>
                                            <td class="py-3.5 px-4 text-slate-500 text-xs truncate max-w-xs" title="${dep.note || ''}">
                                                ${dep.note || '—'}
                                            </td>
                                            <td class="py-3.5 px-4 sm:px-5 text-right">
                                                <div class="flex items-center justify-end gap-1.5">
                                                    <button type="button" onclick="BusinessDashboardView.openDepositTopupModal('${dep.id}')" title="Depozit artır (+)" class="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition cursor-pointer flex items-center gap-1 border border-emerald-200/60">
                                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                                                        <span>Artır</span>
                                                    </button>
                                                    ${(dep.balance || 0) > 0 ? `
                                                        <button type="button" onclick="BusinessDashboardView.openDepositSpendModal('${dep.id}')" title="Depozitdən çıx (-)" class="px-2.5 py-1.5 rounded-lg bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1 active:scale-95">
                                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
                                                            <span>Xərclə</span>
                                                        </button>
                                                    ` : ''}
                                                    <button type="button" onclick="BusinessDashboardView.openDepositHistoryModal('${dep.id}')" title="Əməliyyat tarixçəsi" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer">
                                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
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
                        onPageChange: 'BusinessDashboardView.setLoyaltyDepositPage',
                        onPageSizeChange: 'BusinessDashboardView.setLoyaltyDepositPageSize',
                        itemName: 'depozit hesabı'
                    })}
                </div>
            </div>
        `;
    },

    /* =========================================================================
       SEARCH & PAGINATION EVENT HANDLERS
       ========================================================================= */

    // Section 1: Loyalty Cards (Tiers)
    onLoyaltyCardSearch: function(query) {
        this.loyaltyCardSearch = query || '';
        this.loyaltyCardCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },
    filterLoyaltyCardStatus: function(status) {
        this.loyaltyCardStatusFilter = status || 'all';
        this.loyaltyCardCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },
    setLoyaltyCardPage: function(page) {
        this.loyaltyCardCurrentPage = parseInt(page) || 1;
        this.refreshLoyaltyCanvas();
    },
    setLoyaltyCardPageSize: function(size) {
        this.loyaltyCardPageSize = parseInt(size) || 10;
        this.loyaltyCardCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    // Bonus fallback handlers
    onLoyaltyBonusSearch: function(query) {
        this.loyaltyBonusSearch = query || '';
        this.loyaltyBonusCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },
    setLoyaltyBonusPage: function(page) {
        this.loyaltyBonusCurrentPage = parseInt(page) || 1;
        this.refreshLoyaltyCanvas();
    },
    setLoyaltyBonusPageSize: function(size) {
        this.loyaltyBonusPageSize = parseInt(size) || 10;
        this.loyaltyBonusCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    // Section 2: Gift Cards
    onLoyaltyCertSearch: function(query) {
        this.loyaltyCertSearch = query || '';
        this.loyaltyCertCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },
    filterLoyaltyCertStatus: function(status) {
        this.loyaltyCertStatusFilter = status || 'all';
        this.loyaltyCertCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },
    setLoyaltyCertPage: function(page) {
        this.loyaltyCertCurrentPage = parseInt(page) || 1;
        this.refreshLoyaltyCanvas();
    },
    setLoyaltyCertPageSize: function(size) {
        this.loyaltyCertPageSize = parseInt(size) || 10;
        this.loyaltyCertCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    // Section 3: Subscriptions
    onLoyaltySubSearch: function(query) {
        this.loyaltySubSearch = query || '';
        this.loyaltySubCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },
    filterLoyaltySubStatus: function(status) {
        this.loyaltySubStatusFilter = status || 'all';
        this.loyaltySubCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },
    setLoyaltySubPage: function(page) {
        this.loyaltySubCurrentPage = parseInt(page) || 1;
        this.refreshLoyaltyCanvas();
    },
    setLoyaltySubPageSize: function(size) {
        this.loyaltySubPageSize = parseInt(size) || 10;
        this.loyaltySubCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    // Section 4: Deposits
    onLoyaltyDepositSearch: function(query) {
        this.loyaltyDepositSearch = query || '';
        this.loyaltyDepositCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },
    clearLoyaltyDepositSearch: function() {
        this.loyaltyDepositSearch = '';
        this.loyaltyDepositCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },
    filterLoyaltyDepositStatus: function(status) {
        this.loyaltyDepositStatusFilter = status || 'all';
        this.loyaltyDepositCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },
    setLoyaltyDepositPage: function(page) {
        this.loyaltyDepositCurrentPage = parseInt(page) || 1;
        this.refreshLoyaltyCanvas();
    },
    setLoyaltyDepositPageSize: function(size) {
        this.loyaltyDepositPageSize = parseInt(size) || 10;
        this.loyaltyDepositCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    /* =========================================================================
       MODAL 0: CREATE / EDIT LOYALTY CARD (TIER) CRUD HANDLERS
       ========================================================================= */

    openAddLoyaltyTierCardModal: function(tierId) {
        const modal = document.getElementById('bizLoyaltyTierCardModal');
        if (!modal) return;

        const titleEl = document.getElementById('tierModalTitle');
        const subtitleEl = document.getElementById('tierModalSubtitle');
        const editIdInput = document.getElementById('tierEditId');
        const nameInput = document.getElementById('tierFormName');
        const colorInput = document.getElementById('tierFormColor');
        const cashbackInput = document.getElementById('tierFormCashback');
        const minSpentInput = document.getElementById('tierFormMinSpent');
        const discountInput = document.getElementById('tierFormDiscount');
        const statusInput = document.getElementById('tierFormStatus');
        const descInput = document.getElementById('tierFormDescription');

        if (tierId) {
            const data = this.getLoyaltyData();
            const tier = (data.tiers || []).find(t => t.id === tierId);
            if (tier) {
                if (titleEl) titleEl.textContent = 'Loyallıq Kartını Redaktə Et';
                if (subtitleEl) subtitleEl.textContent = 'Kartın parametrlərini və keşbek şərtlərini yeniləyin';
                if (editIdInput) editIdInput.value = tier.id;
                if (nameInput) nameInput.value = tier.name || '';
                if (colorInput) colorInput.value = tier.color || 'slate';
                if (cashbackInput) cashbackInput.value = tier.cashback !== undefined ? tier.cashback : 5;
                if (minSpentInput) minSpentInput.value = tier.minSpent !== undefined ? tier.minSpent : 0;
                if (discountInput) discountInput.value = tier.discount !== undefined ? tier.discount : 0;
                if (statusInput) statusInput.value = tier.status || 'active';
                if (descInput) descInput.value = tier.description || '';
            }
        } else {
            if (titleEl) titleEl.textContent = 'Yeni Loyallıq Kartı';
            if (subtitleEl) subtitleEl.textContent = 'Kartın adı, keşbek faizi, keçid həddi və imtiyazlar';
            if (editIdInput) editIdInput.value = '';
            if (nameInput) nameInput.value = '';
            if (colorInput) colorInput.value = 'amber';
            if (cashbackInput) cashbackInput.value = '5';
            if (minSpentInput) minSpentInput.value = '300';
            if (discountInput) discountInput.value = '0';
            if (statusInput) statusInput.value = 'active';
            if (descInput) descInput.value = '';
        }

        modal.classList.remove('hidden');
    },

    closeLoyaltyTierCardModal: function() {
        const modal = document.getElementById('bizLoyaltyTierCardModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveLoyaltyTierCard: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const editIdInput = document.getElementById('tierEditId');
        const nameInput = document.getElementById('tierFormName');
        const colorInput = document.getElementById('tierFormColor');
        const cashbackInput = document.getElementById('tierFormCashback');
        const minSpentInput = document.getElementById('tierFormMinSpent');
        const discountInput = document.getElementById('tierFormDiscount');
        const statusInput = document.getElementById('tierFormStatus');
        const descInput = document.getElementById('tierFormDescription');

        const editId = editIdInput ? editIdInput.value.trim() : '';
        const name = nameInput ? nameInput.value.trim() : '';
        const color = colorInput ? colorInput.value : 'slate';
        const cashback = parseFloat(cashbackInput ? cashbackInput.value : 0);
        const minSpent = parseFloat(minSpentInput ? minSpentInput.value : 0);
        const discount = parseFloat(discountInput ? discountInput.value : 0) || 0;
        const status = statusInput ? statusInput.value : 'active';
        const description = descInput ? descInput.value.trim() : '';

        if (!name || isNaN(cashback) || cashback <= 0 || isNaN(minSpent) || minSpent < 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa bütün tələb olunan xanaları düzgün doldurun');
            return;
        }

        const data = this.getLoyaltyData();
        if (!data.tiers) data.tiers = [];

        if (editId) {
            const tier = data.tiers.find(t => t.id === editId);
            if (tier) {
                tier.name = name;
                tier.color = color;
                tier.cashback = cashback;
                tier.minSpent = minSpent;
                tier.discount = discount;
                tier.status = status;
                tier.description = description;
            }
        } else {
            const newId = 'tier_' + Date.now();
            data.tiers.push({
                id: newId,
                name: name,
                color: color,
                cashback: cashback,
                minSpent: minSpent,
                discount: discount,
                status: status,
                description: description
            });
        }

        this.saveLoyaltyData(data);
        this.closeLoyaltyTierCardModal();
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(editId ? 'Loyallıq kartı uğurla yeniləndi' : 'Yeni loyallıq kartı növü uğurla əlavə edildi');
        }
    },

    deleteLoyaltyTierCard: function(tierId) {
        const data = this.getLoyaltyData();
        const tier = (data.tiers || []).find(t => t.id === tierId);
        const tierName = tier ? tier.name : 'Loyallıq kartı';

        this.openDeleteConfirmModal({
            title: 'Loyallıq kartını sil',
            message: `<strong>"${tierName}"</strong> kart növünü silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                data.tiers = (data.tiers || []).filter(t => t.id !== tierId);
                this.saveLoyaltyData(data);
                this.refreshLoyaltyCanvas();

                if (typeof App !== 'undefined') {
                    App.showToast('Loyallıq kartı uğurla silindi');
                }
            }
        });
    },

    toggleLoyaltyTierStatus: function(tierId) {
        const data = this.getLoyaltyData();
        const tier = (data.tiers || []).find(t => t.id === tierId);
        if (!tier) return;
        tier.status = (tier.status || 'active') === 'inactive' ? 'active' : 'inactive';
        this.saveLoyaltyData(data);
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(`Kart statusu dəyişdirildi: ${tier.status === 'active' ? 'Aktiv' : 'Qeyri-aktiv'}`);
        }
    },

    onToggleLoyaltyProgram: function(enabled) {
        const badge = document.getElementById('genLoyaltyStatusBadge');
        if (badge) {
            badge.textContent = enabled ? 'Aktiv' : 'Dayandırılıb';
            badge.className = `px-2.5 py-0.5 rounded-full text-xs font-bold ${enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-100 text-slate-600'}`;
        }
    },

    handleSaveLoyaltyGeneralSettings: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const data = this.getLoyaltyData();
        if (!data.program) data.program = {};

        const chkEnabled = document.getElementById('genLoyaltyProgramEnabled');
        const inpCashback = document.getElementById('genLoyaltyCashbackPercent');
        const inpPointValue = document.getElementById('genLoyaltyPointValue');
        const inpMaxPay = document.getElementById('genLoyaltyMaxPayPercent');
        const inpMinRedeem = document.getElementById('genLoyaltyMinRedeemPoints');
        const selExpiry = document.getElementById('genLoyaltyExpiryDays');
        const inpWelcome = document.getElementById('genLoyaltyWelcomeBonus');
        const inpBirthday = document.getElementById('genLoyaltyBirthdayBonus');
        const inpReview = document.getElementById('genLoyaltyReviewBonus');
        const chkAllowDiscounts = document.getElementById('genLoyaltyAllowOnDiscounts');
        const chkAllowCertificates = document.getElementById('genLoyaltyAllowOnCertificates');
        const chkNotifyEarn = document.getElementById('genLoyaltyNotifyOnEarn');
        const chkNotifyRedeem = document.getElementById('genLoyaltyNotifyOnRedeem');

        if (chkEnabled) data.program.enabled = chkEnabled.checked;
        if (inpCashback) data.program.cashbackPercent = parseFloat(inpCashback.value) || 5;
        if (inpPointValue) data.program.pointValueAzn = parseFloat(inpPointValue.value) || 1.0;
        if (inpMaxPay) data.program.maxPayPercent = parseInt(inpMaxPay.value) || 50;
        if (inpMinRedeem) data.program.minRedeemPoints = parseInt(inpMinRedeem.value) || 5;
        if (selExpiry) data.program.expiryDays = parseInt(selExpiry.value) || 0;
        if (inpWelcome) data.program.welcomeBonus = parseInt(inpWelcome.value) || 0;
        if (inpBirthday) data.program.birthdayBonus = parseInt(inpBirthday.value) || 0;
        if (inpReview) data.program.reviewBonus = parseInt(inpReview.value) || 0;
        if (chkAllowDiscounts) data.program.allowOnDiscounts = chkAllowDiscounts.checked;
        if (chkAllowCertificates) data.program.allowOnCertificates = chkAllowCertificates.checked;
        if (chkNotifyEarn) data.program.notifyOnEarn = chkNotifyEarn.checked;
        if (chkNotifyRedeem) data.program.notifyOnRedeem = chkNotifyRedeem.checked;

        // Save tier thresholds and perks
        if (data.tiers) {
            data.tiers.forEach(t => {
                const inpMinSpent = document.getElementById(`tier_minSpent_${t.id}`);
                const inpTierCashback = document.getElementById(`tier_cashback_${t.id}`);
                const inpTierDiscount = document.getElementById(`tier_discount_${t.id}`);

                if (inpMinSpent) t.minSpent = parseFloat(inpMinSpent.value) || 0;
                if (inpTierCashback) t.cashback = parseFloat(inpTierCashback.value) || 0;
                if (inpTierDiscount) t.discount = parseFloat(inpTierDiscount.value) || 0;
            });
        }

        this.saveLoyaltyData(data);
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast('Loyallıq və keşbek tənzimləmələri uğurla yadda saxlanıldı');
        }
    },

    /* =========================================================================
       MODAL: CREATE / EDIT LOYALTY CARD & RULE (CRUD CONTROLLERS)
       ========================================================================= */

    setCardRuleType: function(type) {
        const typeInput = document.getElementById('cardRuleType');
        if (typeInput) typeInput.value = type;

        const isDiscount = type === 'discount';
        const cardDisc = document.getElementById('cardRuleTypeCard_discount');
        const iconDisc = document.getElementById('cardRuleTypeIcon_discount');
        const checkDisc = document.getElementById('cardRuleTypeCheck_discount');

        const cardCash = document.getElementById('cardRuleTypeCard_cashback');
        const iconCash = document.getElementById('cardRuleTypeIcon_cashback');
        const checkCash = document.getElementById('cardRuleTypeCheck_cashback');

        if (cardDisc) {
            cardDisc.className = `p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between relative ${isDiscount ? 'bg-[#FFDD2D]/10 border-slate-900 ring-2 ring-tbank-yellow/50 shadow-xs' : 'bg-slate-50/70 border-slate-200/90 hover:bg-slate-100/70 hover:border-slate-300'}`;
        }
        if (iconDisc) {
            iconDisc.className = `w-8 h-8 rounded-xl flex items-center justify-center transition ${isDiscount ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-200/80 text-slate-500'}`;
        }
        if (checkDisc) {
            checkDisc.className = `w-5 h-5 rounded-full flex items-center justify-center transition ${isDiscount ? 'bg-slate-900 text-white' : 'bg-slate-200 text-transparent'}`;
        }

        if (cardCash) {
            cardCash.className = `p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between relative ${!isDiscount ? 'bg-[#FFDD2D]/10 border-slate-900 ring-2 ring-tbank-yellow/50 shadow-xs' : 'bg-slate-50/70 border-slate-200/90 hover:bg-slate-100/70 hover:border-slate-300'}`;
        }
        if (iconCash) {
            iconCash.className = `w-8 h-8 rounded-xl flex items-center justify-center transition ${!isDiscount ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-200/80 text-slate-500'}`;
        }
        if (checkCash) {
            checkCash.className = `w-5 h-5 rounded-full flex items-center justify-center transition ${!isDiscount ? 'bg-slate-900 text-white' : 'bg-slate-200 text-transparent'}`;
        }

        this.onCardRuleTypeChange(type);
    },

    onCardRuleTypeChange: function(type) {
        const label = document.getElementById('cardRulePercentLabel');
        const input = document.getElementById('cardRulePercent');
        if (type === 'cashback') {
            if (label) label.textContent = 'Keşbek faizi (%) *';
            if (input && !input.value) input.placeholder = '5';
        } else {
            if (label) label.textContent = 'Endirim faizi (%) *';
            if (input && !input.value) input.placeholder = '10';
        }
    },

    openAddLoyaltyCardRuleModal: function(cardId) {
        const modal = document.getElementById('bizLoyaltyCardRuleModal');
        if (!modal) return;

        const titleEl = document.getElementById('cardRuleModalTitle');
        const subtitleEl = document.getElementById('cardRuleModalSubtitle');
        const editIdInput = document.getElementById('cardRuleEditId');
        const nameInput = document.getElementById('cardRuleName');
        const typeInput = document.getElementById('cardRuleType');
        const percentInput = document.getElementById('cardRulePercent');
        const minAmountInput = document.getElementById('cardRuleMinAmount');
        const durationInput = document.getElementById('cardRuleDuration');
        const targetInput = document.getElementById('cardRuleTarget');
        const statusInput = document.getElementById('cardRuleStatus');
        const colorInput = document.getElementById('cardRuleColor');

        if (cardId) {
            const data = this.getLoyaltyData();
            const card = (data.loyaltyCards || []).find(c => c.id === cardId);
            if (card) {
                if (titleEl) titleEl.textContent = 'Kartı / Qaydanı Redaktə Et';
                if (subtitleEl) subtitleEl.textContent = 'Kartın parametrlərini və şərtlərini yeniləyin';
                if (editIdInput) editIdInput.value = card.id;
                if (nameInput) nameInput.value = card.name || '';
                if (typeInput) typeInput.value = card.type || 'discount';
                if (percentInput) percentInput.value = card.percent !== undefined ? card.percent : 10;
                if (minAmountInput) minAmountInput.value = card.minAmount !== undefined ? card.minAmount : 0;
                if (durationInput) durationInput.value = card.durationDays !== undefined ? card.durationDays : 0;
                if (targetInput) targetInput.value = card.target || 'all';
                if (statusInput) statusInput.value = card.status || 'active';
                if (colorInput) colorInput.value = card.color || 'slate';

                this.setCardRuleType(card.type || 'discount');
            }
        } else {
            if (titleEl) titleEl.textContent = 'Yeni Kart / Qayda';
            if (subtitleEl) subtitleEl.textContent = 'Endirim və ya keşbek kartının parametrləri';
            if (editIdInput) editIdInput.value = '';
            if (nameInput) nameInput.value = '';
            if (typeInput) typeInput.value = 'discount';
            if (percentInput) percentInput.value = '10';
            if (minAmountInput) minAmountInput.value = '0';
            if (durationInput) durationInput.value = '30';
            if (targetInput) targetInput.value = 'all';
            if (statusInput) statusInput.value = 'active';
            if (colorInput) colorInput.value = 'amber';

            this.setCardRuleType('discount');
        }

        modal.classList.remove('hidden');
    },

    closeLoyaltyCardRuleModal: function() {
        const modal = document.getElementById('bizLoyaltyCardRuleModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveLoyaltyCardRule: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const editIdInput = document.getElementById('cardRuleEditId');
        const nameInput = document.getElementById('cardRuleName');
        const typeInput = document.getElementById('cardRuleType');
        const percentInput = document.getElementById('cardRulePercent');
        const minAmountInput = document.getElementById('cardRuleMinAmount');
        const durationInput = document.getElementById('cardRuleDuration');
        const targetInput = document.getElementById('cardRuleTarget');
        const statusInput = document.getElementById('cardRuleStatus');
        const colorInput = document.getElementById('cardRuleColor');

        const editId = editIdInput ? editIdInput.value.trim() : '';
        const name = nameInput ? nameInput.value.trim() : '';
        const type = typeInput ? typeInput.value : 'discount';
        const percent = parseFloat(percentInput ? percentInput.value : 0);
        const minAmount = parseFloat(minAmountInput ? minAmountInput.value : 0) || 0;
        const durationDays = parseInt(durationInput ? durationInput.value : 0) || 0;
        const target = targetInput ? targetInput.value : 'all';
        const status = statusInput ? statusInput.value : 'active';
        const color = colorInput ? colorInput.value : 'slate';

        if (!name || isNaN(percent) || percent <= 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa kartın adını və faiz dərəcəsini daxil edin');
            return;
        }

        const data = this.getLoyaltyData();
        if (!data.loyaltyCards) data.loyaltyCards = [];

        if (editId) {
            const card = data.loyaltyCards.find(c => c.id === editId);
            if (card) {
                card.name = name;
                card.type = type;
                card.percent = percent;
                card.minAmount = minAmount;
                card.durationDays = durationDays;
                card.target = target;
                card.status = status;
                card.color = color;
            }
        } else {
            const newCard = {
                id: 'lc_' + Date.now(),
                name: name,
                type: type,
                percent: percent,
                minAmount: minAmount,
                durationDays: durationDays,
                target: target,
                status: status,
                color: color,
                createdAt: new Date().toISOString().slice(0, 10)
            };
            data.loyaltyCards.unshift(newCard);
        }

        this.saveLoyaltyData(data);
        this.closeLoyaltyCardRuleModal();
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(editId ? 'Kart / qayda uğurla yeniləndi' : 'Yeni kart / qayda uğurla yaradıldı');
        }
    },

    deleteLoyaltyCardRule: function(cardId) {
        const data = this.getLoyaltyData();
        const card = (data.loyaltyCards || []).find(c => c.id === cardId);
        if (!card) return;

        this.openDeleteConfirmModal({
            title: 'Qaydanı sil',
            message: `<strong>"${card.name}"</strong> qaydasını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                data.loyaltyCards = (data.loyaltyCards || []).filter(c => c.id !== cardId);
                this.saveLoyaltyData(data);
                this.refreshLoyaltyCanvas();
                if (typeof App !== 'undefined') {
                    App.showToast('Kart / qayda uğurla silindi');
                }
            }
        });
    },

    toggleLoyaltyCardRuleStatus: function(cardId) {
        const data = this.getLoyaltyData();
        const card = (data.loyaltyCards || []).find(c => c.id === cardId);
        if (!card) return;
        card.status = card.status === 'inactive' ? 'active' : 'inactive';
        this.saveLoyaltyData(data);
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(`Status dəyişdirildi: ${card.status === 'active' ? 'Aktiv' : 'Qeyri-aktiv'}`);
        }
    },

    onLoyaltyCardRuleSearch: function(query) {
        this.loyaltyCardRuleSearch = query || '';
        this.loyaltyCardRuleCurrentPage = 1;
        this.refreshLoyaltyCanvas();
        const input = document.getElementById('loyaltyCardRuleSearchInput');
        if (input) {
            input.focus();
            const len = input.value.length;
            input.setSelectionRange(len, len);
        }
    },

    clearLoyaltyCardRuleSearch: function() {
        this.loyaltyCardRuleSearch = '';
        this.loyaltyCardRuleCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    filterLoyaltyCardRuleType: function(type) {
        this.loyaltyCardRuleTypeFilter = type || 'all';
        this.loyaltyCardRuleCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    filterLoyaltyCardRuleStatus: function(status) {
        this.loyaltyCardRuleStatusFilter = status || 'all';
        this.loyaltyCardRuleCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    filterLoyaltyCardRuleTarget: function(target) {
        this.loyaltyCardRuleTargetFilter = target || 'all';
        this.loyaltyCardRuleCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    resetLoyaltyCardRuleFilters: function() {
        this.loyaltyCardRuleSearch = '';
        this.loyaltyCardRuleTypeFilter = 'all';
        this.loyaltyCardRuleStatusFilter = 'all';
        this.loyaltyCardRuleTargetFilter = 'all';
        this.loyaltyCardRuleCurrentPage = 1;
        this.closeLoyaltyCardRuleFilterModal();
        this.refreshLoyaltyCanvas();
    },

    // Filter Modal temp state & methods
    filterModalTempLcrType: 'all',
    filterModalTempLcrStatus: 'all',
    filterModalTempLcrTarget: 'all',

    openLoyaltyCardRuleFilterModal: function() {
        const modal = document.getElementById('bizLoyaltyCardRuleFilterModal');
        if (!modal) return;
        this.selectLcrFilterType(this.loyaltyCardRuleTypeFilter || 'all');
        this.selectLcrFilterStatus(this.loyaltyCardRuleStatusFilter || 'all');
        this.selectLcrFilterTarget(this.loyaltyCardRuleTargetFilter || 'all');
        modal.classList.remove('hidden');
    },

    closeLoyaltyCardRuleFilterModal: function() {
        const modal = document.getElementById('bizLoyaltyCardRuleFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectLcrFilterType: function(val) {
        this.filterModalTempLcrType = val;
        ['all', 'discount', 'cashback'].forEach(t => {
            const btn = document.getElementById(`lcrFilterTypeBtn_${t}`);
            if (btn) {
                if (t === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer';
                }
            }
        });
    },

    selectLcrFilterStatus: function(val) {
        this.filterModalTempLcrStatus = val;
        ['all', 'active', 'inactive'].forEach(s => {
            const btn = document.getElementById(`lcrFilterStatusBtn_${s}`);
            if (btn) {
                if (s === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer';
                }
            }
        });
    },

    selectLcrFilterTarget: function(val) {
        this.filterModalTempLcrTarget = val;
        ['all', 'all_clients', 'new'].forEach(tg => {
            const btn = document.getElementById(`lcrFilterTargetBtn_${tg}`);
            if (btn) {
                if (tg === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer';
                }
            }
        });
    },

    applyLcrModalFilters: function() {
        this.loyaltyCardRuleTypeFilter = this.filterModalTempLcrType || 'all';
        this.loyaltyCardRuleStatusFilter = this.filterModalTempLcrStatus || 'all';
        this.loyaltyCardRuleTargetFilter = this.filterModalTempLcrTarget || 'all';
        this.loyaltyCardRuleCurrentPage = 1;
        this.closeLoyaltyCardRuleFilterModal();
        this.refreshLoyaltyCanvas();
    },

    resetLcrModalFilters: function() {
        this.filterModalTempLcrType = 'all';
        this.filterModalTempLcrStatus = 'all';
        this.filterModalTempLcrTarget = 'all';
        this.selectLcrFilterType('all');
        this.selectLcrFilterStatus('all');
        this.selectLcrFilterTarget('all');
    },

    setLoyaltyCardRulePage: function(page) {
        this.loyaltyCardRuleCurrentPage = parseInt(page) || 1;
        this.refreshLoyaltyCanvas();
    },

    setLoyaltyCardRulePageSize: function(size) {
        this.loyaltyCardRulePageSize = parseInt(size) || 10;
        this.loyaltyCardRuleCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    /* =========================================================================
       MODAL 1: PROGRAM SETTINGS HANDLERS
       ========================================================================= */

    openLoyaltySettingsModal: function() {
        const modal = document.getElementById('bizLoyaltySettingsModal');
        if (!modal) return;
        const data = this.getLoyaltyData();
        const p = data.program || {};

        const chkEnabled = document.getElementById('loyaltySettingEnabled');
        const inpCashback = document.getElementById('loyaltySettingCashbackPercent');
        const inpPointValue = document.getElementById('loyaltySettingPointValue');
        const inpMaxPay = document.getElementById('loyaltySettingMaxPayPercent');
        const selExpiry = document.getElementById('loyaltySettingExpiryDays');
        const inpWelcome = document.getElementById('loyaltySettingWelcomeBonus');
        const inpBirthday = document.getElementById('loyaltySettingBirthdayBonus');

        if (chkEnabled) chkEnabled.checked = p.enabled !== false;
        if (inpCashback) inpCashback.value = p.cashbackPercent || 5;
        if (inpPointValue) inpPointValue.value = p.pointValueAzn || 1.0;
        if (inpMaxPay) inpMaxPay.value = p.maxPayPercent || 50;
        if (selExpiry) selExpiry.value = p.expiryDays !== undefined ? p.expiryDays : 180;
        if (inpWelcome) inpWelcome.value = p.welcomeBonus !== undefined ? p.welcomeBonus : 10;
        if (inpBirthday) inpBirthday.value = p.birthdayBonus !== undefined ? p.birthdayBonus : 15;

        modal.classList.remove('hidden');
    },

    closeLoyaltySettingsModal: function() {
        const modal = document.getElementById('bizLoyaltySettingsModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveLoyaltySettings: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const data = this.getLoyaltyData();
        if (!data.program) data.program = {};

        const chkEnabled = document.getElementById('loyaltySettingEnabled');
        const inpCashback = document.getElementById('loyaltySettingCashbackPercent');
        const inpPointValue = document.getElementById('loyaltySettingPointValue');
        const inpMaxPay = document.getElementById('loyaltySettingMaxPayPercent');
        const selExpiry = document.getElementById('loyaltySettingExpiryDays');
        const inpWelcome = document.getElementById('loyaltySettingWelcomeBonus');
        const inpBirthday = document.getElementById('loyaltySettingBirthdayBonus');

        data.program.enabled = chkEnabled ? chkEnabled.checked : true;
        data.program.cashbackPercent = inpCashback ? parseFloat(inpCashback.value) || 5 : 5;
        data.program.pointValueAzn = inpPointValue ? parseFloat(inpPointValue.value) || 1.0 : 1.0;
        data.program.maxPayPercent = inpMaxPay ? parseInt(inpMaxPay.value) || 50 : 50;
        data.program.expiryDays = selExpiry ? parseInt(selExpiry.value) || 0 : 180;
        data.program.welcomeBonus = inpWelcome ? parseInt(inpWelcome.value) || 0 : 10;
        data.program.birthdayBonus = inpBirthday ? parseInt(inpBirthday.value) || 0 : 15;

        this.saveLoyaltyData(data);
        this.closeLoyaltySettingsModal();
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast('Loyallıq proqramı qaydaları uğurla yadda saxlanıldı');
        }
    },

    /* =========================================================================
       MODAL 2: ADJUST BONUS HANDLERS
       ========================================================================= */

    openAdjustBonusModal: function(clientId) {
        const modal = document.getElementById('bizLoyaltyAdjustBonusModal');
        if (!modal) return;
        const data = this.getLoyaltyData();
        const client = (data.clients || []).find(c => c.id === clientId);
        if (!client) return;

        const idInput = document.getElementById('adjustBonusClientId');
        const nameEl = document.getElementById('adjustBonusClientName');
        const balanceEl = document.getElementById('adjustBonusClientBalance');
        const phoneEl = document.getElementById('adjustBonusClientPhone');
        const amountInput = document.getElementById('adjustBonusAmount');
        const reasonInput = document.getElementById('adjustBonusReason');

        if (idInput) idInput.value = client.id;
        if (nameEl) nameEl.textContent = client.name;
        if (balanceEl) balanceEl.textContent = `${(client.bonusBalance || 0).toFixed(1)} bal`;
        if (phoneEl) phoneEl.textContent = client.phone;
        if (amountInput) amountInput.value = '';
        if (reasonInput) reasonInput.value = '';

        modal.classList.remove('hidden');
    },

    closeAdjustBonusModal: function() {
        const modal = document.getElementById('bizLoyaltyAdjustBonusModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveBonusAdjustment: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const idInput = document.getElementById('adjustBonusClientId');
        const amountInput = document.getElementById('adjustBonusAmount');
        const reasonInput = document.getElementById('adjustBonusReason');
        const typeRadios = document.getElementsByName('adjustBonusType');

        let type = 'add';
        for (const r of typeRadios) {
            if (r.checked) {
                type = r.value;
                break;
            }
        }

        const clientId = idInput ? idInput.value : '';
        const amount = parseFloat(amountInput ? amountInput.value : 0);
        const reason = reasonInput ? reasonInput.value.trim() : '';

        if (!clientId || isNaN(amount) || amount <= 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün məbləğ daxil edin');
            return;
        }

        const data = this.getLoyaltyData();
        const client = (data.clients || []).find(c => c.id === clientId);
        if (!client) return;

        if (type === 'subtract' && client.bonusBalance < amount) {
            if (typeof App !== 'undefined') App.showToast('Müştərinin balansında kifayət qədər bal yoxdur');
            return;
        }

        const oldBalance = client.bonusBalance || 0;
        const newBalance = type === 'add' ? oldBalance + amount : Math.max(0, oldBalance - amount);
        client.bonusBalance = newBalance;

        if (!client.history) client.history = [];
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);

        client.history.unshift({
            id: 'h_' + Date.now(),
            date: dateStr,
            type: type === 'add' ? 'manual_add' : 'manual_sub',
            amount: amount,
            note: reason || (type === 'add' ? 'Manual bal artımı' : 'Manual bal silinməsi'),
            balanceAfter: newBalance
        });

        this.saveLoyaltyData(data);
        this.closeAdjustBonusModal();
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(`Müştərinin balansı uğurla yeniləndi: ${newBalance.toFixed(1)} bal`);
        }
    },

    /* =========================================================================
       MODAL 3: BONUS TRANSACTIONS HISTORY
       ========================================================================= */

    openBonusHistoryModal: function(clientId) {
        const modal = document.getElementById('bizLoyaltyBonusHistoryModal');
        if (!modal) return;
        const data = this.getLoyaltyData();
        const client = (data.clients || []).find(c => c.id === clientId);
        if (!client) return;

        const nameEl = document.getElementById('bonusHistoryClientName');
        const phoneEl = document.getElementById('bonusHistoryClientPhone');
        const balanceEl = document.getElementById('bonusHistoryCurrentBalance');
        const tbody = document.getElementById('bonusHistoryTableBody');

        if (nameEl) nameEl.textContent = client.name;
        if (phoneEl) phoneEl.textContent = client.phone;
        if (balanceEl) balanceEl.textContent = `${(client.bonusBalance || 0).toFixed(1)} bal`;

        if (tbody) {
            const history = client.history || [];
            if (history.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="4" class="p-8 text-center text-slate-400 text-xs">
                            Hələlik heç bir bonus əməliyyatı qeydə alınmayıb
                        </td>
                    </tr>
                `;
            } else {
                tbody.innerHTML = history.map(item => {
                    const isAdd = item.type === 'earn' || item.type === 'welcome' || item.type === 'birthday' || item.type === 'manual_add';
                    return `
                        <tr class="hover:bg-slate-50 transition">
                            <td class="p-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                                ${this.formatDateDisplay(item.date)}
                            </td>
                            <td class="p-3 text-slate-800">
                                <div>${item.note || 'Əməliyyat'}</div>
                            </td>
                            <td class="p-3 text-right font-mono font-bold ${isAdd ? 'text-emerald-700' : 'text-rose-600'}">
                                ${isAdd ? '+' : '-'}${parseFloat(item.amount).toFixed(1)} bal
                            </td>
                            <td class="p-3 text-right font-mono text-slate-700">
                                ${parseFloat(item.balanceAfter).toFixed(1)} bal
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        }

        modal.classList.remove('hidden');
    },

    closeBonusHistoryModal: function() {
        const modal = document.getElementById('bizLoyaltyBonusHistoryModal');
        if (modal) modal.classList.add('hidden');
    },

    /* =========================================================================
       MODAL 4: CREATE / EDIT GIFT CARD
       ========================================================================= */

    openAddCertificateModal: function(cardId) {
        const modal = document.getElementById('bizLoyaltyCertificateModal');
        if (!modal) return;

        const titleEl = document.getElementById('certModalTitle');
        const editIdInput = document.getElementById('certEditId');
        const nameInput = document.getElementById('certFormName');
        const nominalInput = document.getElementById('gcFormNominal');
        const salePriceInput = document.getElementById('gcFormSalePrice');
        const durationInput = document.getElementById('gcFormDuration');
        const limitSelect = document.getElementById('gcFormUsageLimit');
        const partialCheckbox = document.getElementById('gcFormAllowPartial');
        const saleCheckbox = document.getElementById('gcFormIsAvailableForSale');
        const statusCheckbox = document.getElementById('gcFormStatus');

        if (cardId) {
            const data = this.getLoyaltyData();
            const card = (data.giftCards || []).find(c => String(c.id) === String(cardId) || (c.code && String(c.code) === String(cardId)));
            if (card) {
                if (titleEl) titleEl.textContent = 'Hədiyyə kartını redaktə et';
                if (editIdInput) editIdInput.value = card.id;
                if (nameInput) nameInput.value = card.name || '';
                this.setGiftCardType(card.type || 'general');

                if (Array.isArray(card.serviceIds) && card.serviceIds.length > 0) {
                    this.gcSelectedServiceIds = [...card.serviceIds];
                } else if (card.serviceId) {
                    this.gcSelectedServiceIds = [card.serviceId];
                } else {
                    this.gcSelectedServiceIds = [];
                }
                this.updateGiftCardSelectedServicesUI();

                if (nominalInput) nominalInput.value = card.nominal !== undefined ? card.nominal : '';
                if (salePriceInput) salePriceInput.value = card.salePrice !== undefined ? card.salePrice : '';
                if (durationInput) durationInput.value = card.durationDays !== undefined ? card.durationDays : 90;
                if (limitSelect) limitSelect.value = card.usageLimit || 'unlimited';
                if (partialCheckbox) partialCheckbox.checked = card.allowPartial !== undefined ? !!card.allowPartial : true;
                if (saleCheckbox) saleCheckbox.checked = card.isAvailableForSale !== undefined ? !!card.isAvailableForSale : true;
                if (statusCheckbox) statusCheckbox.checked = card.status !== 'inactive';
                this.setCertColor(card.color || 'amber');
            }
        } else {
            if (titleEl) titleEl.textContent = 'Yeni hədiyyə kartı';
            if (editIdInput) editIdInput.value = '';
            if (nameInput) nameInput.value = '';
            this.setGiftCardType('general');
            this.gcSelectedServiceIds = [];
            this.updateGiftCardSelectedServicesUI();

            if (nominalInput) nominalInput.value = '50';
            if (salePriceInput) salePriceInput.value = '50';
            if (durationInput) durationInput.value = '90';
            if (limitSelect) limitSelect.value = 'unlimited';
            if (partialCheckbox) partialCheckbox.checked = true;
            if (saleCheckbox) saleCheckbox.checked = true;
            if (statusCheckbox) statusCheckbox.checked = true;
            this.setCertColor('amber');
        }

        modal.classList.remove('hidden');
    },

    closeCertificateModal: function() {
        const modal = document.getElementById('bizLoyaltyCertificateModal');
        if (modal) modal.classList.add('hidden');
    },

    setGiftCardType: function(type) {
        const hiddenType = document.getElementById('gcFormType');
        if (hiddenType) hiddenType.value = type;

        const btnGeneral = document.getElementById('gcTypeBtn_general');
        const btnService = document.getElementById('gcTypeBtn_service');
        const radioGeneral = document.getElementById('gcTypeRadio_general');
        const radioService = document.getElementById('gcTypeRadio_service');
        const srvContainer = document.getElementById('gcServiceSelectContainer');

        const isGeneral = type === 'general';

        if (btnGeneral) {
            btnGeneral.className = isGeneral
                ? 'p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer bg-white border-slate-900 shadow-xs'
                : 'p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer bg-slate-50/70 border-slate-200 hover:border-slate-300';
        }
        if (btnService) {
            btnService.className = !isGeneral
                ? 'p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer bg-white border-slate-900 shadow-xs'
                : 'p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer bg-slate-50/70 border-slate-200 hover:border-slate-300';
        }

        if (radioGeneral) {
            radioGeneral.className = isGeneral
                ? 'w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center mt-0.5 shrink-0'
                : 'w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center mt-0.5 shrink-0';
            radioGeneral.innerHTML = `<div class="w-2 h-2 rounded-full ${isGeneral ? 'bg-slate-900' : 'bg-transparent'}"></div>`;
        }
        if (radioService) {
            radioService.className = !isGeneral
                ? 'w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center mt-0.5 shrink-0'
                : 'w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center mt-0.5 shrink-0';
            radioService.innerHTML = `<div class="w-2 h-2 rounded-full ${!isGeneral ? 'bg-slate-900' : 'bg-transparent'}"></div>`;
        }

        if (srvContainer) {
            srvContainer.classList.toggle('hidden', isGeneral);
        }
    },

    /* ==========================================
       GIFT CARD: SERVICE PICKER MODAL METHODS
       ========================================== */

    openGiftCardServicePickerModal: function() {
        const modal = document.getElementById('bizGiftCardServicePickerModal');
        if (!modal) return;

        this.tempGcSelectedServiceIds = Array.isArray(this.gcSelectedServiceIds) ? [...this.gcSelectedServiceIds] : [];
        this.gcServicePickerSearchQuery = '';
        this.gcServicePickerCategory = 'all';

        const searchInput = document.getElementById('gcServicePickerSearchInput');
        if (searchInput) searchInput.value = '';

        this.renderGcServicePickerList();
        modal.classList.remove('hidden');
    },

    closeGiftCardServicePickerModal: function() {
        const modal = document.getElementById('bizGiftCardServicePickerModal');
        if (modal) modal.classList.add('hidden');
    },

    onGcServicePickerSearch: function(val) {
        this.gcServicePickerSearchQuery = (val || '').toLowerCase().trim();
        this.renderGcServicePickerList();
    },

    setGcServicePickerCategory: function(cat) {
        this.gcServicePickerCategory = cat || 'all';
        this.renderGcServicePickerList();
    },

    toggleGcServiceSelection: function(serviceId) {
        if (!this.tempGcSelectedServiceIds) this.tempGcSelectedServiceIds = [];
        const idx = this.tempGcSelectedServiceIds.indexOf(serviceId);
        if (idx >= 0) {
            this.tempGcSelectedServiceIds.splice(idx, 1);
        } else {
            this.tempGcSelectedServiceIds.push(serviceId);
        }
        this.renderGcServicePickerList();
    },

    renderGcServicePickerList: function() {
        const container = document.getElementById('gcServiceListContainer');
        const pillsContainer = document.getElementById('gcServiceCategoryPills');
        const summaryHint = document.getElementById('gcServiceSummaryHint');
        if (!container) return;

        const allServices = this.getSalonServices ? this.getSalonServices() : (this.getServices ? this.getServices() : []);

        // Categories
        const categories = ['all'];
        allServices.forEach(s => {
            const cat = s.category || 'Xidmət';
            if (!categories.includes(cat)) categories.push(cat);
        });

        if (pillsContainer) {
            pillsContainer.innerHTML = categories.map(cat => {
                const isSelected = this.gcServicePickerCategory === cat;
                const label = cat === 'all' ? 'Bütün xidmətlər' : cat;
                return `
                    <button type="button" onclick="BusinessDashboardView.setGcServicePickerCategory('${cat}')" class="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${isSelected ? 'bg-slate-900 text-white shadow-2xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
                        ${label}
                    </button>
                `;
            }).join('');
        }

        // Filtering
        let filtered = allServices;
        if (this.gcServicePickerCategory !== 'all') {
            filtered = filtered.filter(s => (s.category || 'Xidmət') === this.gcServicePickerCategory);
        }
        if (this.gcServicePickerSearchQuery) {
            const q = this.gcServicePickerSearchQuery;
            filtered = filtered.filter(s => (s.name || '').toLowerCase().includes(q) || (s.category || '').toLowerCase().includes(q));
        }

        const selectedIds = this.tempGcSelectedServiceIds || [];
        const selectedServices = allServices.filter(s => selectedIds.includes(s.id));
        const totalPrice = selectedServices.reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0);

        if (summaryHint) {
            summaryHint.innerHTML = selectedIds.length > 0
                ? `<span class="font-bold text-slate-900">${selectedIds.length}</span> xidmət seçilib • Cəmi: <span class="font-mono font-bold text-slate-900">${totalPrice.toFixed(2)} ₼</span>`
                : 'Hələlik heç bir xidmət seçilməyib';
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center text-slate-400 space-y-1">
                    <svg class="w-8 h-8 mx-auto text-slate-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <div class="font-bold text-xs text-slate-700">Axtarışa uyğun xidmət tapılmadı</div>
                    <div class="text-[11px]">Digər kateqoriyanı seçin və ya axtarış sorğusunu dəyişin</div>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(s => {
            const isSelected = selectedIds.includes(s.id);
            return `
                <div onclick="BusinessDashboardView.toggleGcServiceSelection('${s.id}')" class="p-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-amber-50/50 transition cursor-pointer ${isSelected ? 'bg-amber-50/70 border-l-4 border-[#FFDD2D]' : ''}">
                    <div class="flex items-center gap-3 min-w-0">
                        <!-- Clean Checkbox Indicator -->
                        <div class="w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${isSelected ? 'bg-[#101114] border-black text-white' : 'border-slate-300 bg-white'}">
                            ${isSelected ? `
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                            ` : ''}
                        </div>
                        <div class="min-w-0">
                            <div class="font-bold text-xs text-slate-900 truncate">${this.escapeHtml(s.name)}</div>
                            <div class="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                                <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[10px]">${this.escapeHtml(s.category || 'Xidmət')}</span>
                                <span>•</span>
                                <span>${s.duration || '30 dəq'}</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 shrink-0">
                        <span class="font-mono font-bold text-xs text-slate-900">${(parseFloat(s.price) || 0).toFixed(2)} ₼</span>
                        <button type="button" class="px-2.5 py-1 rounded-lg text-xs font-bold transition ${isSelected ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
                            ${isSelected ? 'Seçildi' : 'Seç'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    confirmGiftCardServiceSelection: function() {
        this.gcSelectedServiceIds = Array.isArray(this.tempGcSelectedServiceIds) ? [...this.tempGcSelectedServiceIds] : [];
        this.updateGiftCardSelectedServicesUI();

        // Auto-suggest nominal and sale price based on selected services sum if appropriate
        if (this.gcSelectedServiceIds.length > 0) {
            const allServices = this.getSalonServices ? this.getSalonServices() : (this.getServices ? this.getServices() : []);
            const selectedServices = allServices.filter(s => this.gcSelectedServiceIds.includes(s.id));
            const totalSelectedPrice = selectedServices.reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0);

            const nominalInput = document.getElementById('gcFormNominal');
            const saleInput = document.getElementById('gcFormSalePrice');
            if (nominalInput && (!nominalInput.value || nominalInput.value === '50' || parseFloat(nominalInput.value) <= 0)) {
                nominalInput.value = totalSelectedPrice.toFixed(2);
                if (saleInput) saleInput.value = totalSelectedPrice.toFixed(2);
            }

            const nameInput = document.getElementById('certFormName');
            if (nameInput && (!nameInput.value || nameInput.value.toLowerCase().includes('hədiyyə kartı') || nameInput.value.trim() === '')) {
                const names = selectedServices.map(s => s.name);
                nameInput.value = names.length === 1 ? `${names[0]} hədiyyə kartı` : `${names.slice(0, 2).join(' + ')} hədiyyə kartı`;
            }
        }

        this.closeGiftCardServicePickerModal();
    },

    updateGiftCardSelectedServicesUI: function() {
        const emptyBox = document.getElementById('gcServiceEmptyBox');
        const selectedBox = document.getElementById('gcServiceSelectedBox');
        const listContainer = document.getElementById('gcSelectedServicesList');
        const hiddenIdsInput = document.getElementById('gcFormServiceIds');
        const hiddenIdInput = document.getElementById('gcFormServiceId');
        const hiddenNameInput = document.getElementById('gcFormServiceName');

        const selectedIds = this.gcSelectedServiceIds || [];
        const allServices = this.getSalonServices ? this.getSalonServices() : (this.getServices ? this.getServices() : []);
        const selectedServices = allServices.filter(s => selectedIds.includes(s.id));

        if (selectedIds.length === 0) {
            if (emptyBox) emptyBox.classList.remove('hidden');
            if (selectedBox) selectedBox.classList.add('hidden');
            if (hiddenIdsInput) hiddenIdsInput.value = '';
            if (hiddenIdInput) hiddenIdInput.value = '';
            if (hiddenNameInput) hiddenNameInput.value = '';
            return;
        }

        if (emptyBox) emptyBox.classList.add('hidden');
        if (selectedBox) selectedBox.classList.remove('hidden');

        if (hiddenIdsInput) hiddenIdsInput.value = JSON.stringify(selectedIds);
        if (hiddenIdInput) hiddenIdInput.value = selectedIds[0] || '';
        if (hiddenNameInput) hiddenNameInput.value = selectedServices.map(s => s.name).join(', ');

        if (listContainer) {
            listContainer.innerHTML = selectedServices.map(s => {
                return `
                    <div class="p-2.5 rounded-xl bg-white border border-amber-200/80 shadow-2xs flex items-center justify-between gap-2.5">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <div class="w-7 h-7 rounded-lg bg-[#FFDD2D] text-[#101114] flex items-center justify-center shrink-0 font-bold">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="font-bold text-xs text-slate-900 truncate">${this.escapeHtml(s.name)}</div>
                                <div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                                    <span>${this.escapeHtml(s.category || 'Xidmət')}</span>
                                    <span>•</span>
                                    <span>${s.duration || '30 dəq'}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <span class="font-mono font-bold text-xs text-slate-900">${(parseFloat(s.price) || 0).toFixed(2)} ₼</span>
                            <button type="button" onclick="BusinessDashboardView.removeGiftCardService('${s.id}')" class="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Çıxar">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    },

    removeGiftCardService: function(serviceId) {
        if (!this.gcSelectedServiceIds) return;
        const idx = this.gcSelectedServiceIds.indexOf(serviceId);
        if (idx >= 0) {
            this.gcSelectedServiceIds.splice(idx, 1);
            this.updateGiftCardSelectedServicesUI();
        }
    },

    clearAllGiftCardServices: function() {
        this.gcSelectedServiceIds = [];
        this.updateGiftCardSelectedServicesUI();
    },

    onCertNominalInput: function(val) {
        const saleInput = document.getElementById('gcFormSalePrice');
        if (saleInput && (!saleInput.value || parseFloat(saleInput.value) <= 0)) {
            saleInput.value = val;
        }
    },

    setCertNominalQuick: function(amount) {
        const nominalInput = document.getElementById('gcFormNominal');
        const saleInput = document.getElementById('gcFormSalePrice');
        if (nominalInput) nominalInput.value = amount;
        if (saleInput) saleInput.value = amount;
    },

    setCertDurationQuick: function(days) {
        const durationInput = document.getElementById('gcFormDuration');
        if (durationInput) durationInput.value = days;
    },

    setCertColor: function(color) {
        const hiddenColor = document.getElementById('gcFormColor');
        if (hiddenColor) hiddenColor.value = color;

        const colors = ['amber', 'purple', 'emerald', 'rose', 'slate'];
        colors.forEach(c => {
            const btn = document.getElementById('gcColorBtn_' + c);
            if (btn) {
                if (c === color) {
                    btn.className = btn.className.replace(/ring-2 ring-slate-900 ring-offset-2|hover:ring-2 hover:ring-slate-400/g, '').trim() + ' ring-2 ring-slate-900 ring-offset-2';
                } else {
                    btn.className = btn.className.replace(/ring-2 ring-slate-900 ring-offset-2|hover:ring-2 hover:ring-slate-400/g, '').trim() + ' hover:ring-2 hover:ring-slate-400';
                }
            }
        });
    },

    handleSaveCertificate: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const editIdInput = document.getElementById('certEditId');
        const nameInput = document.getElementById('certFormName');
        const typeInput = document.getElementById('gcFormType');
        const nominalInput = document.getElementById('gcFormNominal');
        const salePriceInput = document.getElementById('gcFormSalePrice');
        const durationInput = document.getElementById('gcFormDuration');
        const limitInput = document.getElementById('gcFormUsageLimit');
        const partialInput = document.getElementById('gcFormAllowPartial');
        const saleAvailInput = document.getElementById('gcFormIsAvailableForSale');
        const colorInput = document.getElementById('gcFormColor');

        const name = nameInput ? nameInput.value.trim() : '';
        const type = typeInput ? typeInput.value : 'general';
        const nominal = parseFloat(nominalInput ? nominalInput.value : 0);
        const salePrice = parseFloat(salePriceInput ? salePriceInput.value : 0);
        const durationDays = parseInt(durationInput ? durationInput.value : 0);
        const usageLimit = limitInput ? limitInput.value : 'unlimited';
        const allowPartial = partialInput ? partialInput.checked : true;
        const isAvailableForSale = saleAvailInput ? saleAvailInput.checked : true;
        const color = colorInput ? colorInput.value : 'amber';
        const editId = editIdInput ? editIdInput.value : '';

        if (!name) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa hədiyyə kartının adını daxil edin');
            return;
        }

        if (isNaN(nominal) || nominal <= 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün nominal məbləğ daxil edin');
            return;
        }

        if (isNaN(salePrice) || salePrice < 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün satış qiyməti daxil edin');
            return;
        }

        let serviceIds = [];
        let serviceId = null;
        let serviceName = null;

        if (type === 'service') {
            if (!this.gcSelectedServiceIds || this.gcSelectedServiceIds.length === 0) {
                if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa ən azı bir bağlı xidmət seçin');
                return;
            }
            serviceIds = [...this.gcSelectedServiceIds];
            serviceId = serviceIds[0];
            const allServices = this.getSalonServices ? this.getSalonServices() : (this.getServices ? this.getServices() : []);
            const selectedServices = allServices.filter(s => serviceIds.includes(s.id));
            serviceName = selectedServices.map(s => s.name).join(', ');
        }

        const data = this.getLoyaltyData();
        if (!data.giftCards) data.giftCards = [];

        const statusCheckbox = document.getElementById('gcFormStatus');
        const status = statusCheckbox && !statusCheckbox.checked ? 'inactive' : 'active';

        if (editId) {
            const card = data.giftCards.find(c => String(c.id) === String(editId) || (c.code && String(c.code) === String(editId)));
            if (card) {
                card.name = name;
                card.type = type;
                card.serviceIds = type === 'service' ? serviceIds : [];
                card.serviceId = type === 'service' ? serviceId : null;
                card.serviceName = type === 'service' ? serviceName : null;
                card.nominal = nominal;
                card.salePrice = salePrice;
                card.durationDays = isNaN(durationDays) ? 0 : durationDays;
                card.usageLimit = usageLimit;
                card.allowPartial = allowPartial;
                card.isAvailableForSale = isAvailableForSale;
                card.status = status;
                card.color = color;
            }
        } else {
            const newCard = {
                id: 'gc_' + Date.now(),
                name: name,
                type: type,
                serviceIds: type === 'service' ? serviceIds : [],
                serviceId: type === 'service' ? serviceId : null,
                serviceName: type === 'service' ? serviceName : null,
                nominal: nominal,
                salePrice: salePrice,
                durationDays: isNaN(durationDays) ? 0 : durationDays,
                usageLimit: usageLimit,
                allowPartial: allowPartial,
                isAvailableForSale: isAvailableForSale,
                status: status,
                color: color,
                soldCount: 0,
                createdAt: new Date().toISOString().slice(0, 10)
            };
            data.giftCards.unshift(newCard);
        }

        this.saveLoyaltyData(data);
        this.closeCertificateModal();
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(editId ? 'Hədiyyə kartı uğurla yeniləndi' : 'Yeni hədiyyə kartı uğurla yaradıldı');
        }
    },

    deleteCertificate: function(cardId) {
        const data = this.getLoyaltyData();
        const card = (data.giftCards || []).find(c => String(c.id) === String(cardId) || (c.code && String(c.code) === String(cardId)));
        if (!card) return;

        const cardName = card.name || 'Hədiyyə kartı';

        this.openDeleteConfirmModal({
            title: 'Hədiyyə kartını sil',
            message: `<strong>"${cardName}"</strong> adlı hədiyyə kartını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                data.giftCards = (data.giftCards || []).filter(c => String(c.id) !== String(cardId) && (!c.code || String(c.code) !== String(cardId)));
                this.saveLoyaltyData(data);
                this.refreshLoyaltyCanvas();
                if (typeof App !== 'undefined') {
                    App.showToast('Hədiyyə kartı uğurla silindi');
                }
            }
        });
    },

    toggleGiftCardStatus: function(cardId) {
        const data = this.getLoyaltyData();
        const card = (data.giftCards || []).find(c => String(c.id) === String(cardId) || (c.code && String(c.code) === String(cardId)));
        if (!card) return;

        card.status = card.status === 'active' ? 'inactive' : 'active';
        this.saveLoyaltyData(data);
        this.activeTab = 'loyalty';
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(`Status dəyişdirildi: ${card.status === 'active' ? 'Aktiv' : 'Qeyri-aktiv'}`);
        }
    },

    toggleGiftCardForSale: function(cardId) {
        const data = this.getLoyaltyData();
        const card = (data.giftCards || []).find(c => String(c.id) === String(cardId) || (c.code && String(c.code) === String(cardId)));
        if (!card) return;

        card.isAvailableForSale = card.isAvailableForSale === false ? true : false;
        this.saveLoyaltyData(data);
        this.activeTab = 'loyalty';
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(`Satış vəziyyəti dəyişdirildi: ${card.isAvailableForSale ? 'Satışda aktiv' : 'Satışda deyil'}`);
        }
    },

    openGiftCardFilterModal: function() {
        const modal = document.getElementById('bizLoyaltyGiftCardFilterModal');
        if (!modal) return;

        this.tempGiftCardFilterType = this.loyaltyGiftCardTypeFilter || 'all';
        this.tempGiftCardFilterSale = this.loyaltyGiftCardSaleFilter || 'all';
        this.tempGiftCardFilterStatus = this.loyaltyGiftCardStatusFilter || 'all';

        this.updateGiftCardFilterModalUI();
        modal.classList.remove('hidden');
    },

    closeGiftCardFilterModal: function() {
        const modal = document.getElementById('bizLoyaltyGiftCardFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectGiftCardFilterType: function(type) {
        this.tempGiftCardFilterType = type;
        this.updateGiftCardFilterModalUI();
    },

    selectGiftCardFilterForSale: function(sale) {
        this.tempGiftCardFilterSale = sale;
        this.updateGiftCardFilterModalUI();
    },

    selectGiftCardFilterStatus: function(status) {
        this.tempGiftCardFilterStatus = status;
        this.updateGiftCardFilterModalUI();
    },

    updateGiftCardFilterModalUI: function() {
        ['all', 'general', 'service'].forEach(t => {
            const btn = document.getElementById('gcFilterTypeBtn_' + t);
            if (btn) {
                const isSel = this.tempGiftCardFilterType === t;
                btn.className = `p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold ${isSel ? 'bg-[#101114] text-white border-black' : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700'}`;
            }
        });

        ['all', 'available', 'unavailable'].forEach(s => {
            const btn = document.getElementById('gcFilterSaleBtn_' + s);
            if (btn) {
                const isSel = this.tempGiftCardFilterSale === s;
                btn.className = `p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold ${isSel ? 'bg-[#101114] text-white border-black' : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700'}`;
            }
        });

        ['all', 'active', 'inactive'].forEach(st => {
            const btn = document.getElementById('gcFilterStatusBtn_' + st);
            if (btn) {
                const isSel = this.tempGiftCardFilterStatus === st;
                btn.className = `p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold ${isSel ? 'bg-[#101114] text-white border-black' : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700'}`;
            }
        });
    },

    applyGiftCardModalFilters: function() {
        this.loyaltyGiftCardTypeFilter = this.tempGiftCardFilterType || 'all';
        this.loyaltyGiftCardSaleFilter = this.tempGiftCardFilterSale || 'all';
        this.loyaltyGiftCardStatusFilter = this.tempGiftCardFilterStatus || 'all';
        this.loyaltyGiftCardCurrentPage = 1;
        this.closeGiftCardFilterModal();
        this.refreshLoyaltyCanvas();
    },

    resetGiftCardModalFilters: function() {
        this.tempGiftCardFilterType = 'all';
        this.tempGiftCardFilterSale = 'all';
        this.tempGiftCardFilterStatus = 'all';
        this.updateGiftCardFilterModalUI();
    },

    onLoyaltyGiftCardSearch: function(query) {
        this.loyaltyGiftCardSearch = query || '';
        this.loyaltyGiftCardCurrentPage = 1;
        this.refreshLoyaltyCanvas();
        const input = document.getElementById('loyaltyGiftCardSearchInput');
        if (input) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        }
    },

    clearLoyaltyGiftCardSearch: function() {
        this.loyaltyGiftCardSearch = '';
        this.loyaltyGiftCardCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    filterLoyaltyGiftCardType: function(type) {
        this.loyaltyGiftCardTypeFilter = type || 'all';
        this.loyaltyGiftCardCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    filterLoyaltyGiftCardSale: function(sale) {
        this.loyaltyGiftCardSaleFilter = sale || 'all';
        this.loyaltyGiftCardCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    filterLoyaltyGiftCardStatus: function(status) {
        this.loyaltyGiftCardStatusFilter = status || 'all';
        this.loyaltyGiftCardCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    resetLoyaltyGiftCardFilters: function() {
        this.loyaltyGiftCardSearch = '';
        this.loyaltyGiftCardTypeFilter = 'all';
        this.loyaltyGiftCardSaleFilter = 'all';
        this.loyaltyGiftCardStatusFilter = 'all';
        this.loyaltyGiftCardCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    setLoyaltyGiftCardPage: function(page) {
        this.loyaltyGiftCardCurrentPage = parseInt(page) || 1;
        this.refreshLoyaltyCanvas();
    },

    setLoyaltyGiftCardPageSize: function(size) {
        this.loyaltyGiftCardPageSize = parseInt(size) || 10;
        this.loyaltyGiftCardCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    /* =========================================================================
       MODAL 5: USE / REDEEM GIFT CARD
       ========================================================================= */

    openUseCertificateModal: function(cardId) {
        const modal = document.getElementById('bizLoyaltyUseCertModal');
        if (!modal) return;
        const data = this.getLoyaltyData();
        const card = (data.giftCards || []).find(c => c.id === cardId);
        if (!card) return;

        const idInput = document.getElementById('useCertId');
        const codeDisplay = document.getElementById('useCertCodeDisplay');
        const balanceDisplay = document.getElementById('useCertBalanceDisplay');
        const clientDisplay = document.getElementById('useCertClientDisplay');
        const amountInput = document.getElementById('useCertAmount');
        const maxHint = document.getElementById('useCertMaxHint');
        const noteInput = document.getElementById('useCertNote');

        if (idInput) idInput.value = card.id;
        if (codeDisplay) codeDisplay.textContent = card.code;
        if (balanceDisplay) balanceDisplay.textContent = `Qalıq: ${(card.currentBalance || 0).toFixed(2)} ₼`;
        if (clientDisplay) clientDisplay.textContent = `Sahibi: ${card.clientName} (${card.clientPhone})`;
        if (amountInput) {
            amountInput.value = '';
            amountInput.max = card.currentBalance;
        }
        if (maxHint) maxHint.textContent = `Maksimum silinə bilən məbləğ: ${(card.currentBalance || 0).toFixed(2)} ₼`;
        if (noteInput) noteInput.value = '';

        modal.classList.remove('hidden');
    },

    closeUseCertificateModal: function() {
        const modal = document.getElementById('bizLoyaltyUseCertModal');
        if (modal) modal.classList.add('hidden');
    },

    handleApplyCertificate: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const idInput = document.getElementById('useCertId');
        const amountInput = document.getElementById('useCertAmount');
        const noteInput = document.getElementById('useCertNote');

        const cardId = idInput ? idInput.value : '';
        const amount = parseFloat(amountInput ? amountInput.value : 0);
        const note = noteInput ? noteInput.value.trim() : '';

        if (!cardId || isNaN(amount) || amount <= 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün məbləğ daxil edin');
            return;
        }

        const data = this.getLoyaltyData();
        const card = (data.giftCards || []).find(c => c.id === cardId);
        if (!card) return;

        if (amount > card.currentBalance) {
            if (typeof App !== 'undefined') App.showToast(`Məbləğ kartın qalıq balansından (${card.currentBalance.toFixed(2)} ₼) çox ola bilməz`);
            return;
        }

        card.currentBalance = Math.max(0, card.currentBalance - amount);
        if (card.currentBalance === 0) {
            card.status = 'used';
        }

        if (!card.history) card.history = [];
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);

        card.history.unshift({
            date: dateStr,
            amount: amount,
            note: note || 'Xidmət ödənişi',
            balanceAfter: card.currentBalance
        });

        this.saveLoyaltyData(data);
        this.closeUseCertificateModal();
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(`Hədiyyə kartından ${amount.toFixed(2)} ₼ uğurla silindi. Qalıq: ${card.currentBalance.toFixed(2)} ₼`);
        }
    },

    /* =========================================================================
       MODAL 6: CREATE / EDIT SUBSCRIPTION (ABUNƏLİK)
       ========================================================================= */

    openAddSubscriptionModal: function(subId) {
        const modal = document.getElementById('bizLoyaltySubscriptionModal');
        if (!modal) return;

        const titleEl = document.getElementById('subModalTitle');
        const subtitleEl = document.getElementById('subModalSubtitle');
        const editIdInput = document.getElementById('subEditId');
        const nameInput = document.getElementById('subFormName');
        const visitsInput = document.getElementById('subFormVisits');
        const durationInput = document.getElementById('subFormDuration');
        const priceInput = document.getElementById('subFormPrice');
        const onlyAssignedCheck = document.getElementById('subFormOnlyAssignedServices');
        const onlineCheck = document.getElementById('subFormOnline');
        const rolloverCheck = document.getElementById('subFormRollover');
        const forSaleCheck = document.getElementById('subFormForSale');
        const statusCheck = document.getElementById('subFormStatus');

        if (subId) {
            const data = this.getLoyaltyData();
            const sub = (data.subscriptions || []).find(s => s.id === subId);
            if (sub) {
                if (titleEl) titleEl.textContent = 'Abunəliyi redaktə et';
                if (subtitleEl) subtitleEl.textContent = 'Mövcud abunəlik parametrlərini və xidmətlərini dəyişdirin';
                if (editIdInput) editIdInput.value = sub.id;
                if (nameInput) nameInput.value = sub.name || '';
                if (visitsInput) visitsInput.value = sub.visitsCount || 5;
                if (durationInput) durationInput.value = sub.durationDays !== undefined ? sub.durationDays : 90;
                if (priceInput) priceInput.value = sub.price !== undefined ? sub.price : 80;
                if (onlyAssignedCheck) onlyAssignedCheck.checked = sub.onlyAssignedServices !== false;
                if (onlineCheck) onlineCheck.checked = sub.isAvailableOnline !== false;
                if (rolloverCheck) rolloverCheck.checked = sub.rolloverUnusedVisits !== false;
                if (forSaleCheck) forSaleCheck.checked = sub.isAvailableForSale !== false;
                if (statusCheck) statusCheck.checked = sub.status === 'active';

                this.setSubColor(sub.color || 'purple');
                this.subSelectedServiceIds = Array.isArray(sub.serviceIds) ? [...sub.serviceIds] : [];
                this.toggleSubOnlyAssignedServices(sub.onlyAssignedServices !== false);
            }
        } else {
            if (titleEl) titleEl.textContent = 'Yeni abunəlik';
            if (subtitleEl) subtitleEl.textContent = 'Müştərilər üçün abunəlik paketini tərtib edin';
            if (editIdInput) editIdInput.value = '';
            if (nameInput) nameInput.value = '';
            if (visitsInput) visitsInput.value = '5';
            if (durationInput) durationInput.value = '90';
            if (priceInput) priceInput.value = '80';
            if (onlyAssignedCheck) onlyAssignedCheck.checked = true;
            if (onlineCheck) onlineCheck.checked = true;
            if (rolloverCheck) rolloverCheck.checked = true;
            if (forSaleCheck) forSaleCheck.checked = true;
            if (statusCheck) statusCheck.checked = true;

            this.setSubColor('purple');
            this.subSelectedServiceIds = [];
            this.toggleSubOnlyAssignedServices(true);
        }

        this.updateSubSelectedServicesUI();
        modal.classList.remove('hidden');
    },

    closeSubscriptionModal: function() {
        const modal = document.getElementById('bizLoyaltySubscriptionModal');
        if (modal) modal.classList.add('hidden');
    },

    setSubColor: function(color) {
        const colorInput = document.getElementById('subFormColor');
        if (colorInput) colorInput.value = color;

        ['purple', 'amber', 'emerald', 'rose', 'slate'].forEach(c => {
            const btn = document.getElementById(`subColorBtn_${c}`);
            if (btn) {
                if (c === color) {
                    btn.className = btn.className.replace(/hover:ring-2 hover:ring-slate-400/g, '').trim();
                    if (!btn.classList.contains('ring-2')) {
                        btn.classList.add('ring-2', 'ring-slate-900', 'ring-offset-2');
                    }
                } else {
                    btn.classList.remove('ring-2', 'ring-slate-900', 'ring-offset-2');
                    if (!btn.classList.contains('hover:ring-2')) {
                        btn.classList.add('hover:ring-2', 'hover:ring-slate-400');
                    }
                }
            }
        });
    },

    setSubVisitsQuick: function(count) {
        const input = document.getElementById('subFormVisits');
        if (input) input.value = count;
    },

    setSubDurationQuick: function(days) {
        const input = document.getElementById('subFormDuration');
        if (input) input.value = days;
    },

    toggleSubOnlyAssignedServices: function(checked) {
        const container = document.getElementById('subAssignedServicesContainer');
        if (container) {
            if (checked) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        }
    },

    /* =========================================================================
       SUB-MODAL: SUBSCRIPTION SERVICE PICKER
       ========================================================================= */

    openSubServicePickerModal: function() {
        const modal = document.getElementById('bizSubServicePickerModal');
        if (!modal) return;

        this.tempSubSelectedServiceIds = Array.isArray(this.subSelectedServiceIds) ? [...this.subSelectedServiceIds] : [];
        this.subServicePickerSearchQuery = '';
        this.subServicePickerCategory = 'all';

        const searchInput = document.getElementById('subServicePickerSearchInput');
        if (searchInput) searchInput.value = '';

        this.renderSubServicePickerCategories();
        this.renderSubServicePickerList();
        this.updateSubServicePickerSummary();

        modal.classList.remove('hidden');
    },

    closeSubServicePickerModal: function() {
        const modal = document.getElementById('bizSubServicePickerModal');
        if (modal) modal.classList.add('hidden');
    },

    onSubServicePickerSearch: function(query) {
        this.subServicePickerSearchQuery = query || '';
        this.renderSubServicePickerList();
    },

    setSubServicePickerCategory: function(catId) {
        this.subServicePickerCategory = catId || 'all';
        this.renderSubServicePickerCategories();
        this.renderSubServicePickerList();
    },

    renderSubServicePickerCategories: function() {
        const container = document.getElementById('subServiceCategoryPills');
        if (!container) return;

        const allServices = this.getSalonServices ? this.getSalonServices() : (this.getServices ? this.getServices() : []);
        const categories = {};
        allServices.forEach(s => {
            const cat = s.category || 'Digər';
            categories[cat] = (categories[cat] || 0) + 1;
        });

        const currentCat = this.subServicePickerCategory || 'all';

        let html = `
            <button type="button" onclick="BusinessDashboardView.setSubServicePickerCategory('all')" class="px-3 py-1.5 rounded-full font-semibold transition shrink-0 cursor-pointer ${currentCat === 'all' ? 'bg-slate-900 text-white shadow-2xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
                Bütün (${allServices.length})
            </button>
        `;

        Object.keys(categories).forEach(cat => {
            const count = categories[cat];
            const isSelected = currentCat === cat;
            html += `
                <button type="button" onclick="BusinessDashboardView.setSubServicePickerCategory('${cat}')" class="px-3 py-1.5 rounded-full font-semibold transition shrink-0 cursor-pointer ${isSelected ? 'bg-slate-900 text-white shadow-2xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
                    ${cat} (${count})
                </button>
            `;
        });

        container.innerHTML = html;
    },

    renderSubServicePickerList: function() {
        const container = document.getElementById('subServiceListContainer');
        if (!container) return;

        const allServices = this.getSalonServices ? this.getSalonServices() : (this.getServices ? this.getServices() : []);
        const query = (this.subServicePickerSearchQuery || '').toLowerCase().trim();
        const currentCat = this.subServicePickerCategory || 'all';

        const filtered = allServices.filter(s => {
            if (currentCat !== 'all' && (s.category || 'Digər') !== currentCat) return false;
            if (!query) return true;
            const name = (s.name || '').toLowerCase();
            const desc = (s.description || '').toLowerCase();
            const cat = (s.category || '').toLowerCase();
            return name.includes(query) || desc.includes(query) || cat.includes(query);
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="py-10 text-center text-slate-400 text-xs">
                    Xidmət tapılmadı
                </div>
            `;
            return;
        }

        const selectedIds = this.tempSubSelectedServiceIds || [];

        container.innerHTML = filtered.map(s => {
            const isChecked = selectedIds.includes(s.id);
            const durationText = s.duration ? `${s.duration} dəq` : '';
            const priceText = s.price ? `${parseFloat(s.price).toFixed(2)} ₼` : '0.00 ₼';

            return `
                <label class="flex items-center justify-between p-3 hover:bg-white transition cursor-pointer select-none">
                    <div class="flex items-center gap-3 flex-1 min-w-0 pr-3">
                        <input type="checkbox"
                               ${isChecked ? 'checked' : ''}
                               onchange="BusinessDashboardView.toggleSubServiceSelection('${s.id}')"
                               class="w-4 h-4 rounded text-slate-900 focus:ring-0 cursor-pointer accent-[#FFDD2D]">
                        <div class="min-w-0 flex-1">
                            <div class="text-xs font-bold text-slate-900 truncate">${s.name}</div>
                            <div class="flex items-center gap-2 text-[11px] text-slate-400 font-normal">
                                <span>${s.category || 'Ümumi'}</span>
                                ${durationText ? `<span>•</span><span>${durationText}</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="font-mono font-bold text-xs text-slate-900 shrink-0">
                        ${priceText}
                    </div>
                </label>
            `;
        }).join('');
    },

    toggleSubServiceSelection: function(srvId) {
        if (!this.tempSubSelectedServiceIds) this.tempSubSelectedServiceIds = [];
        const idx = this.tempSubSelectedServiceIds.indexOf(srvId);
        if (idx >= 0) {
            this.tempSubSelectedServiceIds.splice(idx, 1);
        } else {
            this.tempSubSelectedServiceIds.push(srvId);
        }
        this.updateSubServicePickerSummary();
        this.renderSubServicePickerList();
    },

    updateSubServicePickerSummary: function() {
        const hint = document.getElementById('subServiceSummaryHint');
        if (!hint) return;
        const count = (this.tempSubSelectedServiceIds || []).length;
        hint.textContent = `${count} xidmət seçilib`;
    },

    confirmSubServiceSelection: function() {
        this.subSelectedServiceIds = Array.isArray(this.tempSubSelectedServiceIds) ? [...this.tempSubSelectedServiceIds] : [];
        this.updateSubSelectedServicesUI();
        this.closeSubServicePickerModal();
    },

    removeSubService: function(srvId) {
        if (!this.subSelectedServiceIds) return;
        this.subSelectedServiceIds = this.subSelectedServiceIds.filter(id => id !== srvId);
        this.updateSubSelectedServicesUI();
    },

    clearAllSubServices: function() {
        this.subSelectedServiceIds = [];
        this.updateSubSelectedServicesUI();
    },

    updateSubSelectedServicesUI: function() {
        const countEl = document.getElementById('subSelectedServicesCount');
        const listEl = document.getElementById('subSelectedServicesList');
        if (!listEl) return;

        const allServices = this.getSalonServices ? this.getSalonServices() : (this.getServices ? this.getServices() : []);
        const selectedIds = this.subSelectedServiceIds || [];

        if (countEl) countEl.textContent = selectedIds.length;

        if (selectedIds.length === 0) {
            listEl.innerHTML = `
                <div class="text-[11px] text-slate-400 italic py-1">
                    Heç bir xidmət seçilməyib. Zəhmət olmasa yuxarıdakı "Xidmətləri seç" düyməsindən xidmət əlavə edin.
                </div>
            `;
            return;
        }

        listEl.innerHTML = selectedIds.map(id => {
            const s = allServices.find(srv => srv.id === id);
            const name = s ? s.name : id;
            return `
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                    <span>${name}</span>
                    <button type="button" onclick="BusinessDashboardView.removeSubService('${id}')" class="text-slate-400 hover:text-rose-600 transition cursor-pointer" title="Sil">✕</button>
                </span>
            `;
        }).join('');
    },

    handleSaveSubscription: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const editIdInput = document.getElementById('subEditId');
        const nameInput = document.getElementById('subFormName');
        const visitsInput = document.getElementById('subFormVisits');
        const durationInput = document.getElementById('subFormDuration');
        const priceInput = document.getElementById('subFormPrice');
        const onlyAssignedCheck = document.getElementById('subFormOnlyAssignedServices');
        const onlineCheck = document.getElementById('subFormOnline');
        const rolloverCheck = document.getElementById('subFormRollover');
        const forSaleCheck = document.getElementById('subFormForSale');
        const statusCheck = document.getElementById('subFormStatus');
        const colorInput = document.getElementById('subFormColor');

        const editId = editIdInput ? editIdInput.value : '';
        const name = nameInput ? nameInput.value.trim() : '';
        const visitsCount = parseInt(visitsInput ? visitsInput.value : 0);
        const durationDays = parseInt(durationInput ? durationInput.value : 0);
        const price = parseFloat(priceInput ? priceInput.value : 0);
        const onlyAssignedServices = onlyAssignedCheck ? onlyAssignedCheck.checked : true;
        const isAvailableOnline = onlineCheck ? onlineCheck.checked : true;
        const rolloverUnusedVisits = rolloverCheck ? rolloverCheck.checked : true;
        const isAvailableForSale = forSaleCheck ? forSaleCheck.checked : true;
        const status = (statusCheck && statusCheck.checked) ? 'active' : 'inactive';
        const color = colorInput ? colorInput.value : 'purple';

        if (!name) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa abunəlik adını qeyd edin');
            return;
        }

        if (visitsCount <= 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün ziyarət sayı daxil edin');
            return;
        }

        if (isNaN(price) || price < 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün qiymət daxil edin');
            return;
        }

        const allServices = this.getSalonServices ? this.getSalonServices() : (this.getServices ? this.getServices() : []);
        const selectedIds = this.subSelectedServiceIds || [];

        let serviceNames = 'Bütün xidmətlər';
        if (onlyAssignedServices) {
            if (selectedIds.length > 0) {
                const names = selectedIds.map(id => {
                    const s = allServices.find(srv => srv.id === id);
                    return s ? s.name : id;
                });
                serviceNames = names.join(', ');
            } else {
                serviceNames = 'Xidmət təyin edilməyib';
            }
        }

        const data = this.getLoyaltyData();
        if (!data.subscriptions) data.subscriptions = [];

        if (editId) {
            const sub = data.subscriptions.find(s => s.id === editId);
            if (sub) {
                sub.name = name;
                sub.visitsCount = visitsCount;
                sub.durationDays = durationDays;
                sub.price = price;
                sub.onlyAssignedServices = onlyAssignedServices;
                sub.serviceIds = selectedIds;
                sub.serviceNames = serviceNames;
                sub.isAvailableOnline = isAvailableOnline;
                sub.rolloverUnusedVisits = rolloverUnusedVisits;
                sub.isAvailableForSale = isAvailableForSale;
                sub.status = status;
                sub.color = color;
            }
        } else {
            const newSub = {
                id: 'sub_' + Date.now(),
                name: name,
                visitsCount: visitsCount,
                durationDays: durationDays,
                price: price,
                onlyAssignedServices: onlyAssignedServices,
                serviceIds: selectedIds,
                serviceNames: serviceNames,
                isAvailableOnline: isAvailableOnline,
                rolloverUnusedVisits: rolloverUnusedVisits,
                isAvailableForSale: isAvailableForSale,
                status: status,
                color: color,
                soldCount: 0,
                createdAt: new Date().toISOString().slice(0, 10)
            };
            data.subscriptions.unshift(newSub);
        }

        this.saveLoyaltyData(data);
        this.closeSubscriptionModal();
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(editId ? 'Abunəlik paketi uğurla yeniləndi' : 'Yeni abunəlik paketi uğurla yaradıldı');
        }
    },

    deleteSubscription: function(subId) {
        const data = this.getLoyaltyData();
        const sub = (data.subscriptions || []).find(s => s.id === subId);
        if (!sub) return;

        this.openDeleteConfirmModal({
            title: 'Abunəlik paketini sil',
            message: `<strong>"${sub.name}"</strong> abunəlik paketini silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                data.subscriptions = (data.subscriptions || []).filter(s => s.id !== subId);
                this.saveLoyaltyData(data);
                this.refreshLoyaltyCanvas();
                if (typeof App !== 'undefined') {
                    App.showToast('Abunəlik paketi uğurla silindi');
                }
            }
        });
    },

    toggleSubscriptionStatus: function(subId) {
        const data = this.getLoyaltyData();
        const sub = (data.subscriptions || []).find(s => s.id === subId);
        if (!sub) return;

        sub.status = sub.status === 'active' ? 'inactive' : 'active';
        this.saveLoyaltyData(data);
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(`Status dəyişdirildi: ${sub.status === 'active' ? 'Aktiv' : 'Qeyri-aktiv'}`);
        }
    },

    toggleSubscriptionForSale: function(subId) {
        const data = this.getLoyaltyData();
        const sub = (data.subscriptions || []).find(s => s.id === subId);
        if (!sub) return;

        sub.isAvailableForSale = sub.isAvailableForSale === false ? true : false;
        this.saveLoyaltyData(data);
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(`Satış vəziyyəti dəyişdirildi: ${sub.isAvailableForSale ? 'Satışda aktiv' : 'Satışda deyil'}`);
        }
    },

    /* =========================================================================
       SUB-TAB FILTERS MODAL (ABUNƏLİK FİLTRLƏRİ)
       ========================================================================= */

    openSubFilterModal: function() {
        const modal = document.getElementById('bizLoyaltySubFilterModal');
        if (!modal) return;

        this.tempSubFilterSale = this.loyaltySubSaleFilter || 'all';
        this.tempSubFilterOnline = this.loyaltySubOnlineFilter || 'all';
        this.tempSubFilterStatus = this.loyaltySubStatusFilter || 'all';

        this.updateSubFilterModalUI();
        modal.classList.remove('hidden');
    },

    closeSubFilterModal: function() {
        const modal = document.getElementById('bizLoyaltySubFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectSubFilterSale: function(val) {
        this.tempSubFilterSale = val;
        this.updateSubFilterModalUI();
    },

    selectSubFilterOnline: function(val) {
        this.tempSubFilterOnline = val;
        this.updateSubFilterModalUI();
    },

    selectSubFilterStatus: function(val) {
        this.tempSubFilterStatus = val;
        this.updateSubFilterModalUI();
    },

    updateSubFilterModalUI: function() {
        ['all', 'available', 'unavailable'].forEach(s => {
            const btn = document.getElementById(`subFilterSaleBtn_${s}`);
            if (btn) {
                if (this.tempSubFilterSale === s) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-slate-900 text-white flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-bold shadow-2xs';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold';
                }
            }
        });

        ['all', 'online', 'offline'].forEach(o => {
            const btn = document.getElementById(`subFilterOnlineBtn_${o}`);
            if (btn) {
                if (this.tempSubFilterOnline === o) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-slate-900 text-white flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-bold shadow-2xs';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold';
                }
            }
        });

        ['all', 'active', 'inactive'].forEach(st => {
            const btn = document.getElementById(`subFilterStatusBtn_${st}`);
            if (btn) {
                if (this.tempSubFilterStatus === st) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-slate-900 text-white flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-bold shadow-2xs';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-semibold';
                }
            }
        });
    },

    applySubModalFilters: function() {
        this.loyaltySubSaleFilter = this.tempSubFilterSale || 'all';
        this.loyaltySubOnlineFilter = this.tempSubFilterOnline || 'all';
        this.loyaltySubStatusFilter = this.tempSubFilterStatus || 'all';
        this.loyaltySubCurrentPage = 1;

        this.closeSubFilterModal();
        this.refreshLoyaltyCanvas();
    },

    resetSubModalFilters: function() {
        this.loyaltySubSaleFilter = 'all';
        this.loyaltySubOnlineFilter = 'all';
        this.loyaltySubStatusFilter = 'all';
        this.loyaltySubCurrentPage = 1;

        this.closeSubFilterModal();
        this.refreshLoyaltyCanvas();
    },

    removeSubFilter: function(type) {
        if (type === 'sale') this.loyaltySubSaleFilter = 'all';
        else if (type === 'online') this.loyaltySubOnlineFilter = 'all';
        else if (type === 'status') this.loyaltySubStatusFilter = 'all';
        this.loyaltySubCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    clearLoyaltySubSearch: function() {
        this.loyaltySubSearch = '';
        this.loyaltySubCurrentPage = 1;
        this.refreshLoyaltyCanvas();
    },

    /* =========================================================================
       MODAL 8: TOP UP CLIENT DEPOSIT (MƏDAXİL)
       ========================================================================= */

    openDepositTopupModal: function(depId) {
        const modal = document.getElementById('bizLoyaltyDepositTopupModal');
        if (!modal) return;

        const idInput = document.getElementById('depositTopupClientId');
        const nameInput = document.getElementById('depositTopupClientName');
        const phoneInput = document.getElementById('depositTopupPhone');
        const amountInput = document.getElementById('depositTopupAmount');
        const methodSelect = document.getElementById('depositTopupMethod');
        const noteInput = document.getElementById('depositTopupNote');

        if (depId) {
            const data = this.getLoyaltyData();
            const dep = (data.deposits || []).find(d => d.id === depId);
            if (dep) {
                if (idInput) idInput.value = dep.id;
                if (nameInput) nameInput.value = dep.clientName;
                if (phoneInput) {
                    const cleanPhone = (dep.clientPhone || '').replace('+994', '').trim();
                    phoneInput.value = cleanPhone;
                }
            }
        } else {
            if (idInput) idInput.value = '';
            if (nameInput) nameInput.value = '';
            if (phoneInput) phoneInput.value = '';
        }

        if (amountInput) amountInput.value = '';
        if (methodSelect) methodSelect.value = 'Nağd';
        if (noteInput) noteInput.value = '';

        modal.classList.remove('hidden');
    },

    closeDepositTopupModal: function() {
        const modal = document.getElementById('bizLoyaltyDepositTopupModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveDepositTopup: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const idInput = document.getElementById('depositTopupClientId');
        const nameInput = document.getElementById('depositTopupClientName');
        const phoneInput = document.getElementById('depositTopupPhone');
        const amountInput = document.getElementById('depositTopupAmount');
        const methodSelect = document.getElementById('depositTopupMethod');
        const noteInput = document.getElementById('depositTopupNote');

        const depId = idInput ? idInput.value : '';
        const clientName = nameInput ? nameInput.value.trim() : '';
        const rawPhone = phoneInput ? phoneInput.value.trim() : '';
        const cleanDigits = rawPhone.replace(/\D/g, '');
        const formattedPhone = cleanDigits.length === 9
            ? `+994 (${cleanDigits.slice(0, 2)}) ${cleanDigits.slice(2, 5)}-${cleanDigits.slice(5, 7)}-${cleanDigits.slice(7, 9)}`
            : (rawPhone ? `+994 ${rawPhone}` : '+994 (50) 000-00-00');

        const amount = parseFloat(amountInput ? amountInput.value : 0);
        const method = methodSelect ? methodSelect.value : 'Nağd';
        const note = noteInput ? noteInput.value.trim() : '';

        if (!clientName || isNaN(amount) || amount <= 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün məbləğ və müştəri məlumatı daxil edin');
            return;
        }

        const data = this.getLoyaltyData();
        if (!data.deposits) data.deposits = [];

        let dep = null;
        if (depId) {
            dep = data.deposits.find(d => d.id === depId);
        } else {
            // Find existing by phone or name
            dep = data.deposits.find(d => d.clientPhone === formattedPhone || d.clientName.toLowerCase() === clientName.toLowerCase());
        }

        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);

        if (dep) {
            dep.balance = (parseFloat(dep.balance) || 0) + amount;
            dep.totalDeposited = (parseFloat(dep.totalDeposited) || 0) + amount;
            dep.lastTransactionDate = dateStr;
            dep.status = 'active';
            if (note) dep.note = note;
            if (!dep.history) dep.history = [];
            dep.history.unshift({
                id: 'dh_' + Date.now(),
                date: dateStr,
                type: 'topup',
                amount: amount,
                method: method,
                note: note || 'Depozit balansı artırıldı',
                balanceAfter: dep.balance
            });
        } else {
            const newDep = {
                id: 'dep_' + Date.now(),
                clientName: clientName,
                clientPhone: formattedPhone,
                balance: amount,
                totalDeposited: amount,
                totalSpent: 0,
                lastTransactionDate: dateStr,
                status: 'active',
                note: note || 'Yeni depozit hesabı',
                history: [
                    {
                        id: 'dh_' + Date.now(),
                        date: dateStr,
                        type: 'topup',
                        amount: amount,
                        method: method,
                        note: note || 'İlkin depozit ödənişi',
                        balanceAfter: amount
                    }
                ]
            };
            data.deposits.unshift(newDep);
            dep = newDep;
        }

        this.saveLoyaltyData(data);
        this.closeDepositTopupModal();
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(`Müştərinin depozit balansı +${amount.toFixed(2)} ₼ artırıldı. Cari balans: ${dep.balance.toFixed(2)} ₼`);
        }
    },

    /* =========================================================================
       MODAL 9: DEDUCT FROM CLIENT DEPOSIT (MƏXARİC)
       ========================================================================= */

    openDepositSpendModal: function(depId) {
        const modal = document.getElementById('bizLoyaltyDepositSpendModal');
        if (!modal) return;
        const data = this.getLoyaltyData();
        const dep = (data.deposits || []).find(d => d.id === depId);
        if (!dep) return;

        const idInput = document.getElementById('depositSpendId');
        const nameEl = document.getElementById('depositSpendClientName');
        const balanceEl = document.getElementById('depositSpendCurrentBalance');
        const phoneEl = document.getElementById('depositSpendClientPhone');
        const amountInput = document.getElementById('depositSpendAmount');
        const maxHint = document.getElementById('depositSpendMaxHint');
        const noteInput = document.getElementById('depositSpendNote');

        if (idInput) idInput.value = dep.id;
        if (nameEl) nameEl.textContent = dep.clientName;
        if (balanceEl) balanceEl.textContent = `Qalıq: ${(dep.balance || 0).toFixed(2)} ₼`;
        if (phoneEl) phoneEl.textContent = dep.clientPhone;
        if (amountInput) {
            amountInput.value = '';
            amountInput.max = dep.balance;
        }
        if (maxHint) maxHint.textContent = `Maksimum silinə bilən məbləğ: ${(dep.balance || 0).toFixed(2)} ₼`;
        if (noteInput) noteInput.value = '';

        modal.classList.remove('hidden');
    },

    closeDepositSpendModal: function() {
        const modal = document.getElementById('bizLoyaltyDepositSpendModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveDepositSpend: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const idInput = document.getElementById('depositSpendId');
        const amountInput = document.getElementById('depositSpendAmount');
        const noteInput = document.getElementById('depositSpendNote');

        const depId = idInput ? idInput.value : '';
        const amount = parseFloat(amountInput ? amountInput.value : 0);
        const note = noteInput ? noteInput.value.trim() : '';

        if (!depId || isNaN(amount) || amount <= 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa düzgün məbləğ daxil edin');
            return;
        }

        const data = this.getLoyaltyData();
        const dep = (data.deposits || []).find(d => d.id === depId);
        if (!dep) return;

        if (amount > dep.balance) {
            if (typeof App !== 'undefined') App.showToast(`Məbləğ müştərinin cari depozit balansından (${dep.balance.toFixed(2)} ₼) çox ola bilməz`);
            return;
        }

        dep.balance = Math.max(0, dep.balance - amount);
        dep.totalSpent = (parseFloat(dep.totalSpent) || 0) + amount;
        if (dep.balance === 0) dep.status = 'empty';

        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
        dep.lastTransactionDate = dateStr;

        if (!dep.history) dep.history = [];
        dep.history.unshift({
            id: 'dh_' + Date.now(),
            date: dateStr,
            type: 'spend',
            amount: amount,
            method: 'Depozit hesabı',
            note: note || 'Xidmət haqqı ödənişi',
            balanceAfter: dep.balance
        });

        this.saveLoyaltyData(data);
        this.closeDepositSpendModal();
        this.refreshLoyaltyCanvas();

        if (typeof App !== 'undefined') {
            App.showToast(`Depozitdən ${amount.toFixed(2)} ₼ uğurla çıxıldı. Qalıq balans: ${dep.balance.toFixed(2)} ₼`);
        }
    },

    /* =========================================================================
       MODAL 10: DEPOSIT TRANSACTION HISTORY
       ========================================================================= */

    openDepositHistoryModal: function(depId) {
        const modal = document.getElementById('bizLoyaltyDepositHistoryModal');
        if (!modal) return;
        const data = this.getLoyaltyData();
        const dep = (data.deposits || []).find(d => d.id === depId);
        if (!dep) return;

        const nameEl = document.getElementById('depHistoryClientName');
        const phoneEl = document.getElementById('depHistoryClientPhone');
        const balanceEl = document.getElementById('depHistoryCurrentBalance');
        const tbody = document.getElementById('depHistoryTableBody');

        if (nameEl) nameEl.textContent = dep.clientName;
        if (phoneEl) phoneEl.textContent = dep.clientPhone;
        if (balanceEl) balanceEl.textContent = `${(dep.balance || 0).toFixed(2)} ₼`;

        if (tbody) {
            const history = dep.history || [];
            if (history.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="4" class="p-8 text-center text-slate-400 text-xs">
                            Hələlik heç bir depozit əməliyyatı qeydə alınmayıb
                        </td>
                    </tr>
                `;
            } else {
                tbody.innerHTML = history.map(item => {
                    const isTopup = item.type === 'topup';
                    return `
                        <tr class="hover:bg-slate-50 transition">
                            <td class="p-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                                ${this.formatDateDisplay(item.date)}
                            </td>
                            <td class="p-3 text-slate-800">
                                <div>${item.note || (isTopup ? 'Mədaxil' : 'Məxaric')}</div>
                                <div class="text-[10px] text-slate-400">${item.method || '—'}</div>
                            </td>
                            <td class="p-3 text-right font-mono font-bold ${isTopup ? 'text-emerald-700' : 'text-rose-600'}">
                                ${isTopup ? '+' : '-'}${parseFloat(item.amount).toFixed(2)} ₼
                            </td>
                            <td class="p-3 text-right font-mono text-slate-700">
                                ${parseFloat(item.balanceAfter).toFixed(2)} ₼
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        }

        modal.classList.remove('hidden');
    },

    closeDepositHistoryModal: function() {
        const modal = document.getElementById('bizLoyaltyDepositHistoryModal');
        if (modal) modal.classList.add('hidden');
    },
});
