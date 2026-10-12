// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {
    // MODULE: INTEGRATIONS MARKETPLACE & WHATSAPP
    // ==========================================
    integrationsActiveCategory: 'all',
    integrationsSearchQuery: '',
    whatsAppModalActiveTab: 'settings',
    whatsAppSelectedRating: 5,

    getIntegrationsData: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_integrations_v1'));
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && typeof parsed === 'object') return parsed;
            } catch (e) {}
        }
        const defaults = {
            whatsapp: {
                id: 'whatsapp',
                name: 'WhatsApp Business & Bildirişlər',
                category: 'messengers',
                isFree: true,
                priceText: 'Pulsuz',
                installed: true,
                installedAt: '2025-01-15T10:00:00Z',
                rating: 4.95,
                reviewsCount: 38,
                phone: '+994 50 234 56 78',
                connectedState: 'connected',
                settings: {
                    notifyOnBookingCreated: true,
                    notifyReminder2Hours: true,
                    notifyOnBookingCancelled: true,
                    notifyMasterOnNewBooking: true,
                    notifyReviewRequest: true,
                    reminderTimeHours: 2,
                    customTemplate: 'Hörmətli {client_name}! {business_name} salonunda {master_name} tərəfindən {service_name} üçün qəbulunuz {date} saat {time} tarixinə təsdiqləndi. Ünvan: {address}. Sizi gözləyirik!'
                }
            }
        };
        this.saveIntegrationsData(defaults);
        return defaults;
    },

    saveIntegrationsData: function(data) {
        localStorage.setItem(this.storageKey('zeyvo_integrations_v1'), JSON.stringify(data));
    },

    getInstalledIntegrationsCount: function() {
        const data = this.getIntegrationsData();
        return Object.values(data).filter(item => item && item.installed).length;
    },

    formatWhatsAppReviewDate: function(dateStr) {
        if (!dateStr) return '';
        const trimmed = String(dateStr).trim();
        const monthNames = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];

        // YYYY-MM-DD or ISO string
        if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
            const parts = trimmed.split('T')[0].split('-');
            const y = parseInt(parts[0], 10);
            const m = parseInt(parts[1], 10) - 1;
            const d = parseInt(parts[2], 10);
            if (m >= 0 && m < 12) {
                return `${d} ${monthNames[m]} ${y}`;
            }
        }
        // DD.MM.YYYY
        if (/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(trimmed)) {
            const parts = trimmed.split('.');
            const d = parseInt(parts[0], 10);
            const m = parseInt(parts[1], 10) - 1;
            const y = parseInt(parts[2], 10);
            if (m >= 0 && m < 12) {
                return `${d} ${monthNames[m]} ${y}`;
            }
        }
        try {
            const dt = new Date(trimmed);
            if (!isNaN(dt.getTime())) {
                return `${dt.getDate()} ${monthNames[dt.getMonth()]} ${dt.getFullYear()}`;
            }
        } catch (e) {}
        return trimmed;
    },

    getWhatsAppReviews: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_integration_whatsapp_reviews_v1'));
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed.map(r => ({
                        ...r,
                        date: this.formatWhatsAppReviewDate(r.date)
                    }));
                }
            } catch (e) {}
        }
        const defaults = [
            {
                id: 'rev_1',
                userName: 'Leyla Qasımova',
                businessTitle: '«Gözəllik Dünyası» Salon Rəhbəri',
                rating: 5,
                date: '14 fevral 2025',
                comment: 'Müştərilərimiz artıq heç bir qəbulu unutmur, quraşdırmaq çox rahat oldu. Pulsuz olması isə böyük üstünlükdür!'
            },
            {
                id: 'rev_2',
                userName: 'Elmir Rəhimov',
                businessTitle: '«Gentleman Barber Club» Sahibkar',
                rating: 5,
                date: '28 fevral 2025',
                comment: 'WhatsApp xatırlatmaları avtomatik gedəndən sonra müştəri gəlməmə (no-show) halları 80% azaldı. Dəqiq vaxtında çatır.'
            },
            {
                id: 'rev_3',
                userName: 'Nigar Əliyeva',
                businessTitle: 'Estetik Kosmetologiya Mərkəzi',
                rating: 4.8,
                date: '10 mart 2025',
                comment: 'Xatırlatma mesajlarının vaxtını və şablonunu fərdiləşdirmək çox əlverişlidir. Zeyvo komandasına təşəkkürlər!'
            }
        ];
        this.saveWhatsAppReviews(defaults);
        return defaults;
    },

    saveWhatsAppReviews: function(list) {
        localStorage.setItem(this.storageKey('zeyvo_integration_whatsapp_reviews_v1'), JSON.stringify(list));
    },

    getWhatsAppRatingSummary: function() {
        const reviews = this.getWhatsAppReviews();
        if (reviews.length === 0) return { avg: 5.0, count: 0, stars: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
        const sum = reviews.reduce((acc, r) => acc + (parseFloat(r.rating) || 5), 0);
        const avg = parseFloat((sum / reviews.length).toFixed(2));
        const stars = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(r => {
            const rounded = Math.round(parseFloat(r.rating) || 5);
            if (stars[rounded] !== undefined) stars[rounded]++;
            else stars[5]++;
        });
        return { avg, count: reviews.length, stars };
    },

    selectIntegrationsCategory: function(cat) {
        this.integrationsActiveCategory = cat;
        this.refreshIntegrationsCanvas();
    },

    onIntegrationsSearch: function(query) {
        this.integrationsSearchQuery = (query || '').toLowerCase().trim();
        this.refreshIntegrationsCanvas();
    },

    refreshIntegrationsCanvas: function() {
        const container = document.getElementById('bizCanvasBody');
        if (container && this.activeTab === 'integrations') {
            container.innerHTML = this.renderIntegrationsModule();
        }
    },

    // Render Integrations Marketplace Main Module
    renderIntegrationsModule: function() {
        const data = this.getIntegrationsData();
        const wa = data.whatsapp || {};
        const summary = this.getWhatsAppRatingSummary();
        const installedCount = this.getInstalledIntegrationsCount();

        // Marketplace Catalog Items
        const allItems = [
            {
                id: 'whatsapp',
                name: 'WhatsApp Business & Bildirişlər',
                category: 'messengers',
                categoryLabel: 'Mesencerlər',
                badge: 'Aktiv',
                badgeColor: 'emerald',
                isFree: true,
                installed: true,
                rating: summary.avg || 4.9,
                reviewsCount: summary.count || 28,
                description: 'Qəbul zamanı təsdiq mesajı, 2 saat əvvəl avtomatik xatırlatma və xidmətdən sonra rəy sorğusunu WhatsApp ilə göndərin.',
                features: ['Avtomatik qəbul xatırlatması', 'Müştəri təsdiq bildirişi', 'Fərdiləşdirilmiş şablonlar'],
                isAvailable: true
            },
            {
                id: 'sms',
                name: 'SMS Bildiriş Şlüzü (Simurq / SMS.az)',
                category: 'messengers',
                categoryLabel: 'SMS Şlüz',
                badge: 'Qoşulub',
                badgeColor: 'amber',
                isFree: false,
                installed: true,
                rating: 4.8,
                reviewsCount: 19,
                description: 'Müştərilərə salonun adından rəsmi SMS bildirişləri və OTP birdəfəlik kodlarının göndərilməsi.',
                features: ['Brend adı ilə SMS (Alfa-ad)', 'Yüksək çatdırılma faizi', 'Real vaxt rejimində balans hesabatı'],
                isAvailable: true
            },
            {
                id: 'payments',
                name: 'Onlayn Kart Ödənişi (Kapital / ABB)',
                category: 'payments',
                categoryLabel: 'Ödənişlər',
                badge: 'Hazırdır',
                badgeColor: 'blue',
                isFree: false,
                installed: true,
                rating: 5.0,
                reviewsCount: 34,
                description: 'Müştərilərdən onlayn bron zamanı depozit və ya tam ödənişlərin bank kartı ilə qəbul edilməsi.',
                features: ['Bütün yerli və xarici kartlar', 'Avtomatik kassa mədaxili', '3D Secure təhlükəsizlik'],
                isAvailable: true
            },
            {
                id: 'instagram',
                name: 'İnstagram & Sayt Bron Vidceti',
                category: 'web',
                categoryLabel: 'Veb Alətlər',
                badge: 'Pulsuz',
                badgeColor: 'emerald',
                isFree: true,
                installed: true,
                rating: 4.9,
                reviewsCount: 52,
                description: 'İnstagram profilinizin "Bio" hissəsi və ya veb saytınız üçün interaktiv onlayn yazılış keçidi.',
                features: ['İnstagram birbaşa keçid linki', 'Sayta yerləşdirmək üçün HTML kod', 'Mobil uyğunlaşma'],
                isAvailable: true
            }
        ];

        // Filter items
        let filtered = allItems;
        if (this.integrationsActiveCategory === 'installed') {
            filtered = filtered.filter(item => item.installed);
        }

        // Sub-tabs (Unified Segmented Control like in Staff/Products)
        const subTabs = [
            { id: 'all', label: 'Bütün xidmətlər', badge: allItems.length },
            { id: 'installed', label: 'Qoşulanlar', badge: installedCount }
        ];

        return `
            <div class="p-4 sm:p-7 max-w-7xl mx-auto space-y-6">

                <!-- SUB-TABS NAVIGATION (Unified Segmented Control like in other modules) -->
                <div>
                    ${this.renderSegmentedTabs({
                        tabs: subTabs,
                        activeId: this.integrationsActiveCategory || 'all',
                        onSelect: 'BusinessDashboardView.selectIntegrationsCategory'
                    })}
                </div>

                <!-- Integrations Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                    ${filtered.map(item => this.renderIntegrationCardHtml(item)).join('')}
                </div>

                ${filtered.length === 0 ? `
                    <div class="text-center py-14 bg-slate-50 rounded-3xl border border-slate-200">
                        <svg class="w-10 h-10 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <h4 class="font-bold text-sm text-slate-700">Heç bir qoşulmuş inteqrasiya yoxdur</h4>
                        <p class="text-xs text-slate-400 mt-1">Hələ heç bir xidmət qoşulmayıb. Bütün xidmətlərə keçib WhatsApp-ı aktivləşdirə bilərsiniz</p>
                        <button type="button" onclick="BusinessDashboardView.selectIntegrationsCategory('all')" class="mt-3 px-4 py-2 rounded-xl bg-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-300 transition cursor-pointer">
                            Bütün xidmətləri göstər
                        </button>
                    </div>
                ` : ''}

            </div>
        `;
    },

    // Render Single Integration Card
    renderIntegrationCardHtml: function(item) {
        const isWhatsApp = item.id === 'whatsapp';

        // Clean Vector SVG for WhatsApp
        const iconSvg = `
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
                </svg>
            </div>
        `;

        const badgeHtml = item.isFree ? `
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                Pulsuz
            </span>
        ` : `
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                ${item.badge}
            </span>
        `;

        const statusPill = item.installed ? `
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Qoşulub</span>
            </span>
        ` : `
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500">
                <span>Qoşulmayıb</span>
            </span>
        `;

        return `
            <div class="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 hover:shadow-xs transition duration-150">
                
                <!-- Card Header -->
                <div class="space-y-3.5">
                    <div class="flex items-start justify-between gap-3">
                        ${iconSvg}
                        <div class="flex items-center gap-1.5">
                            ${badgeHtml}
                            ${statusPill}
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <h3 class="font-bold text-sm sm:text-base text-slate-900 leading-tight">${item.name}</h3>
                        </div>
                        <p class="text-[11px] text-slate-400 font-medium mt-0.5">${item.categoryLabel} • Zeyvo Core</p>
                    </div>

                    <p class="text-xs text-slate-600 font-normal leading-relaxed line-clamp-3">
                        ${item.description}
                    </p>

                    <!-- Rating & Reviews link -->
                    <div class="flex items-center justify-between pt-1">
                        <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                            <div class="flex items-center text-amber-400">
                                <svg class="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            </div>
                            <span>${item.rating}</span>
                            ${isWhatsApp ? `
                                <button type="button" onclick="BusinessDashboardView.openWhatsAppIntegrationModal('reviews')" class="text-slate-400 hover:text-slate-900 transition underline underline-offset-2 cursor-pointer font-normal">
                                    (${item.reviewsCount} rəy)
                                </button>
                            ` : `
                                <span class="text-slate-400 font-normal">(${item.reviewsCount} rəy)</span>
                            `}
                        </div>
                        <span class="text-[11px] text-slate-400">${item.isFree ? '0 ₼ limitsiz' : 'Standart tarif'}</span>
                    </div>

                    <!-- Bullet Features -->
                    <div class="space-y-1 pt-1.5 border-t border-slate-100">
                        ${item.features.map(f => `
                            <div class="flex items-center gap-1.5 text-[11px] text-slate-600">
                                <svg class="w-3 h-3 text-emerald-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                                <span class="truncate">${f}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Card Footer Actions -->
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    ${isWhatsApp ? `
                        <div class="flex items-center gap-2 w-full">
                            ${item.installed ? `
                                <button type="button" onclick="BusinessDashboardView.openWhatsAppIntegrationModal('connect')" class="flex-1 h-9 px-3 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                                    <span>Qoşulma statusu</span>
                                </button>
                                <button type="button" onclick="BusinessDashboardView.openWhatsAppIntegrationModal('reviews')" class="h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer" title="Rəy bildir və ya qiymətləndir">
                                    <svg class="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                                    <span>Rəy</span>
                                </button>
                            ` : `
                                <button type="button" onclick="BusinessDashboardView.openWhatsAppIntegrationModal('connect')" class="flex-1 h-9 px-3 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                                    <span>Qoşul (Pulsuz)</span>
                                </button>
                                <button type="button" onclick="BusinessDashboardView.openWhatsAppIntegrationModal('reviews')" class="h-9 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center justify-center cursor-pointer">
                                    Rəylər
                                </button>
                            `}
                        </div>
                    ` : `
                        <div class="flex items-center justify-between w-full">
                            <span class="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                                <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span>İnkişaf mərhələsində</span>
                            </span>
                            <button type="button" onclick="App.showToast('«${item.name}» tezliklə istifadəyə veriləcək')" class="h-8 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-semibold transition cursor-pointer">
                                Məlumat al
                            </button>
                        </div>
                    `}
                </div>

            </div>
        `;
    },

    // Modal Logic & Tabs
    openWhatsAppIntegrationModal: function(defaultTab = 'connect') {
        const modal = document.getElementById('bizWhatsAppIntegrationModal');
        if (!modal) return;
        if (defaultTab === 'settings') defaultTab = 'connect';
        this.whatsAppModalActiveTab = defaultTab || 'connect';
        this.renderWhatsAppModalTabs();
        this.renderWhatsAppModalTabContent();
        modal.classList.remove('hidden');
    },

    closeWhatsAppIntegrationModal: function() {
        const modal = document.getElementById('bizWhatsAppIntegrationModal');
        if (modal) modal.classList.add('hidden');
    },

    renderWhatsAppModalTabs: function() {
        const container = document.getElementById('whatsAppModalTabsContainer');
        if (!container) return;
        const summary = this.getWhatsAppRatingSummary();
        const activeTab = this.whatsAppModalActiveTab || 'connect';
        const tabs = [
            {
                id: 'connect',
                label: 'Qoşulma',
                iconSvg: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>'
            },
            {
                id: 'security',
                label: 'Təhlükəsizlik və Tövsiyələr',
                iconSvg: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>'
            },
            {
                id: 'reviews',
                label: 'Rəylər və Qiymət',
                badge: summary.count,
                iconSvg: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>'
            }
        ];

        container.innerHTML = this.renderSegmentedTabs({
            tabs,
            activeId: activeTab,
            onSelect: 'BusinessDashboardView.switchWhatsAppModalTab'
        });
    },

    switchWhatsAppModalTab: function(tab) {
        this.whatsAppModalActiveTab = tab;
        this.renderWhatsAppModalTabs();
        this.renderWhatsAppModalTabContent();
    },

    renderWhatsAppModalTabContent: function() {
        const body = document.getElementById('whatsAppModalBody');
        if (!body) return;

        this.renderWhatsAppModalTabs();

        const data = this.getIntegrationsData();
        const wa = data.whatsapp || {};
        const reviews = this.getWhatsAppReviews();
        const summary = this.getWhatsAppRatingSummary();

        let cleanPhone = (wa.phone || '(50) 234-56-78').replace('+994', '').trim();
        if (!cleanPhone.includes('(') && cleanPhone.replace(/\D/g, '').length >= 9) {
            const d = cleanPhone.replace(/\D/g, '').slice(-9);
            cleanPhone = `(${d.slice(0,2)}) ${d.slice(2,5)}-${d.slice(5,7)}-${d.slice(7,9)}`;
        }

        // 1. Connection Tab (Direct WhatsApp Web connection)
        if (this.whatsAppModalActiveTab === 'connect' || this.whatsAppModalActiveTab === 'settings') {
            body.innerHTML = `
                <div class="space-y-4">
                    <!-- Direct Connection Info Callout (How it works & Why it's free) -->
                    <div class="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                        <div class="w-8 h-8 rounded-xl bg-[#FFDD2D]/40 text-[#101114] border border-[#FFDD2D]/60 flex items-center justify-center shrink-0 mt-0.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>
                        </div>
                        <div class="text-xs text-slate-700 space-y-1">
                            <div class="font-bold text-slate-900 flex items-center gap-2">
                                <span>Necə işləyir və niyə tamamilə pulsuzdur?</span>
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">0 ₼ Mesaj haqqı yoxdur</span>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed">
                                Sistem kompüterdə WhatsApp Web istifadə etdiyiniz kimi, birbaşa salonun öz telefonuna qoşulur. Rəsmi Meta API vasitəçiləri olmadan, bildirişlər birbaşa şəxsi və ya biznes nömrənizdən göndərildiyi üçün hər mesaja görə heç bir ödəniş və ya aylıq komissiya tutulmur — limitsiz və pulsuzdur.
                            </p>
                        </div>
                    </div>

                    ${wa.installed ? `
                        <!-- Connected State Card -->
                        <div class="p-5 sm:p-6 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-4">
                            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div class="flex items-center gap-2.5">
                                    <span class="relative flex h-3 w-3">
                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </span>
                                    <div>
                                        <div class="font-bold text-xs sm:text-sm text-slate-900">WhatsApp nömrəniz aktivdir</div>
                                        <div class="text-[11px] text-emerald-600 font-medium">Bağlantı açıqdır və bildirişlər ödənişsiz çatdırılır</div>
                                    </div>
                                </div>
                                <span class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/80">
                                    Qoşulub
                                </span>
                            </div>

                            <!-- Connection Details Grid -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                                    <span class="text-[10px] text-slate-400 font-medium block">Bağlı WhatsApp nömrəsi</span>
                                    <span class="font-bold text-slate-900 text-sm mt-0.5 block">${this.escapeHtml(wa.phone || '+994 50 234 56 78')}</span>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                                    <span class="text-[10px] text-slate-400 font-medium block">Bağlantı növü</span>
                                    <span class="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">Birbaşa WhatsApp Web bağlantısı</span>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                                    <span class="text-[10px] text-slate-400 font-medium block">Mesaj tarifi</span>
                                    <span class="font-bold text-emerald-700 text-xs sm:text-sm mt-0.5 block">0 ₼ • Tamamilə pulsuz</span>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                                    <span class="text-[10px] text-slate-400 font-medium block">Cihaz vəziyyəti</span>
                                    <span class="font-bold text-emerald-700 text-xs mt-0.5 block flex items-center gap-1.5">
                                        <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>
                                        <span>Telefon onlayndır • WiFi aktiv</span>
                                    </span>
                                </div>
                            </div>

                            <!-- Caution Anti-ban Banner -->
                            <div class="p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-center justify-between gap-3">
                                <div class="flex items-center gap-2 text-xs text-amber-900">
                                    <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
                                    <span>Nömrənizin bloklanmaması üçün tövsiyələrə əməl edin</span>
                                </div>
                                <button type="button" onclick="BusinessDashboardView.switchWhatsAppModalTab('security')" class="px-3 py-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-bold text-[11px] shrink-0 transition cursor-pointer">
                                    Qaydaları oxu
                                </button>
                            </div>

                            <!-- Actions -->
                            <div class="pt-2 flex items-center justify-between gap-2">
                                <button type="button" onclick="BusinessDashboardView.reconnectWhatsAppInstance()" class="px-4 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer">
                                    <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
                                    <span>Sessiyanı yenilə</span>
                                </button>

                                <button type="button" onclick="BusinessDashboardView.toggleWhatsAppInstall(); BusinessDashboardView.renderWhatsAppModalTabContent();" class="px-4 h-9 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>
                                    <span>Qoşulmanı dayandır</span>
                                </button>
                            </div>
                        </div>
                    ` : `
                        <!-- Disconnected QR Code Scanner Section -->
                        <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                
                                <!-- Left: Step by step instructions -->
                                <div class="space-y-3.5">
                                    <div>
                                        <h4 class="font-bold text-sm text-slate-900">WhatsApp nömrənizi qoşun</h4>
                                        <p class="text-xs text-slate-400 mt-0.5">WhatsApp Web kimi telefonunuzla QR kodu skan edərək ödənişsiz bildirişləri başladın</p>
                                    </div>

                                    <div class="space-y-2.5 text-xs text-slate-700">
                                        <div class="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                                            <span class="w-5 h-5 rounded-full bg-[#FFDD2D] text-[#101114] font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                                            <span>Telefonunuzda <b>WhatsApp</b> tətbiqini açın</span>
                                        </div>
                                        <div class="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                                            <span class="w-5 h-5 rounded-full bg-[#FFDD2D] text-[#101114] font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                                            <span><b>Ayarlar (iOS)</b> və ya <b>Üç nöqtə (Android)</b> menyusuna daxil olun</span>
                                        </div>
                                        <div class="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                                            <span class="w-5 h-5 rounded-full bg-[#FFDD2D] text-[#101114] font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                                            <span><b>Bağlı cihazlar (Linked Devices)</b> bölməsini seçin</span>
                                        </div>
                                        <div class="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                                            <span class="w-5 h-5 rounded-full bg-[#FFDD2D] text-[#101114] font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
                                            <span><b>Cihazı bağlayın</b> düyməsinə toxunub kameranı sağdakı QR koda tutun</span>
                                        </div>
                                    </div>

                                    <!-- Phone Number Input -->
                                    <div class="pt-1 space-y-1">
                                        <label class="block text-xs font-bold text-slate-700">Qoşulacaq nömrə</label>
                                        <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center overflow-hidden focus-within:border-slate-800 focus-within:ring-2 focus-within:ring-[#FFDD2D]/40 focus-within:bg-white transition">
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
                                                <span class="text-xs font-bold text-slate-800 tracking-tight">+994</span>
                                            </div>
                                            <input type="tel" id="waFormPhone" value="${this.escapeHtml(cleanPhone)}" maxlength="15" placeholder="(50) 000-00-00" oninput="App.formatAzPhone ? App.formatAzPhone(this) : null" class="w-full h-full px-3 bg-transparent text-xs font-semibold text-slate-900 outline-none">
                                        </div>
                                    </div>
                                </div>

                                <!-- Right: QR Code Visual Box -->
                                <div class="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                                    <div id="waQrCodeBox" class="p-3 bg-white rounded-2xl shadow-xs border border-slate-200/80 transition relative">
                                        <!-- Clean Vector SVG QR Code Mockup with WhatsApp Icon in Center -->
                                        <svg class="w-44 h-44" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <!-- Background -->
                                            <rect width="200" height="200" rx="12" fill="white"/>
                                            
                                            <!-- QR Patterns & Corner Squares -->
                                            <!-- Top Left Finder -->
                                            <rect x="16" y="16" width="44" height="44" rx="6" stroke="#101114" stroke-width="6"/>
                                            <rect x="28" y="28" width="20" height="20" rx="3" fill="#101114"/>
                                            
                                            <!-- Top Right Finder -->
                                            <rect x="140" y="16" width="44" height="44" rx="6" stroke="#101114" stroke-width="6"/>
                                            <rect x="152" y="28" width="20" height="20" rx="3" fill="#101114"/>
                                            
                                            <!-- Bottom Left Finder -->
                                            <rect x="16" y="140" width="44" height="44" rx="6" stroke="#101114" stroke-width="6"/>
                                            <rect x="28" y="152" width="20" height="20" rx="3" fill="#101114"/>
                                            
                                            <!-- Timing Patterns & Data Dots -->
                                            <g fill="#101114">
                                                <rect x="68" y="20" width="8" height="8" rx="1"/>
                                                <rect x="84" y="20" width="8" height="8" rx="1"/>
                                                <rect x="100" y="20" width="8" height="8" rx="1"/>
                                                <rect x="116" y="20" width="8" height="8" rx="1"/>

                                                <rect x="68" y="36" width="8" height="8" rx="1"/>
                                                <rect x="100" y="36" width="8" height="8" rx="1"/>
                                                <rect x="124" y="36" width="8" height="8" rx="1"/>

                                                <rect x="68" y="52" width="8" height="8" rx="1"/>
                                                <rect x="84" y="52" width="8" height="8" rx="1"/>
                                                <rect x="116" y="52" width="8" height="8" rx="1"/>

                                                <rect x="20" y="68" width="8" height="8" rx="1"/>
                                                <rect x="36" y="68" width="8" height="8" rx="1"/>
                                                <rect x="52" y="68" width="8" height="8" rx="1"/>
                                                <rect x="68" y="68" width="8" height="8" rx="1"/>
                                                <rect x="84" y="68" width="8" height="8" rx="1"/>
                                                <rect x="108" y="68" width="8" height="8" rx="1"/>
                                                <rect x="124" y="68" width="8" height="8" rx="1"/>
                                                <rect x="140" y="68" width="8" height="8" rx="1"/>
                                                <rect x="164" y="68" width="8" height="8" rx="1"/>

                                                <rect x="20" y="84" width="8" height="8" rx="1"/>
                                                <rect x="36" y="84" width="8" height="8" rx="1"/>
                                                <rect x="52" y="84" width="8" height="8" rx="1"/>
                                                <rect x="140" y="84" width="8" height="8" rx="1"/>
                                                <rect x="156" y="84" width="8" height="8" rx="1"/>
                                                <rect x="172" y="84" width="8" height="8" rx="1"/>

                                                <rect x="20" y="100" width="8" height="8" rx="1"/>
                                                <rect x="52" y="100" width="8" height="8" rx="1"/>
                                                <rect x="140" y="100" width="8" height="8" rx="1"/>
                                                <rect x="172" y="100" width="8" height="8" rx="1"/>

                                                <rect x="20" y="116" width="8" height="8" rx="1"/>
                                                <rect x="36" y="116" width="8" height="8" rx="1"/>
                                                <rect x="52" y="116" width="8" height="8" rx="1"/>
                                                <rect x="68" y="116" width="8" height="8" rx="1"/>
                                                <rect x="124" y="116" width="8" height="8" rx="1"/>
                                                <rect x="156" y="116" width="8" height="8" rx="1"/>

                                                <rect x="68" y="140" width="8" height="8" rx="1"/>
                                                <rect x="84" y="140" width="8" height="8" rx="1"/>
                                                <rect x="100" y="140" width="8" height="8" rx="1"/>
                                                <rect x="140" y="140" width="8" height="8" rx="1"/>
                                                <rect x="156" y="140" width="8" height="8" rx="1"/>

                                                <rect x="68" y="156" width="8" height="8" rx="1"/>
                                                <rect x="108" y="156" width="8" height="8" rx="1"/>
                                                <rect x="124" y="156" width="8" height="8" rx="1"/>
                                                <rect x="172" y="156" width="8" height="8" rx="1"/>

                                                <rect x="68" y="172" width="8" height="8" rx="1"/>
                                                <rect x="84" y="172" width="8" height="8" rx="1"/>
                                                <rect x="100" y="172" width="8" height="8" rx="1"/>
                                                <rect x="140" y="172" width="8" height="8" rx="1"/>
                                                <rect x="164" y="172" width="8" height="8" rx="1"/>
                                            </g>

                                            <!-- Center WhatsApp Badge in QR -->
                                            <rect x="82" y="82" width="36" height="36" rx="8" fill="white" stroke="#25D366" stroke-width="2"/>
                                            <path d="M89 107l1.2-2.8a6.5 6.5 0 1 1 2.5 2.1L89 107z" stroke="#25D366" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>

                                    <div class="space-y-1">
                                        <span class="text-[11px] font-semibold text-slate-500 block">QR kod 60 saniyədən bir yenilənir</span>
                                        <div class="flex items-center justify-center gap-2">
                                            <button type="button" onclick="BusinessDashboardView.handleConnectWhatsAppViaQR()" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                                                <span>QR kodu skan etdim (Qoşul)</span>
                                            </button>
                                            <button type="button" onclick="BusinessDashboardView.reconnectWhatsAppInstance()" class="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer" title="Yenilə">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    `}
                </div>
            `;
        }

        // 2. Security & Anti-ban Guidelines Tab
        else if (this.whatsAppModalActiveTab === 'security') {
            body.innerHTML = `
                <div class="space-y-4">
                    <!-- Notice Banner -->
                    <div class="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-1.5">
                        <div class="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
                            <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
                            <span>Nömrənizin bloklanmaması üçün təhlükəsizlik qaydaları</span>
                        </div>
                        <p class="text-xs text-amber-800 font-normal leading-relaxed">
                            Bildirişlər birbaşa telefonunuzdakı WhatsApp Web bağlantısı vasitəsilə göndərildiyinə görə xidmət tamamilə pulsuzdur. Lakin WhatsApp-ın daxili təhlükəsizlik filtrləri qeyri-adi fəaliyyət hiss etdikdə nömrəni müvəqqəti məhdudlaşdıra bilər. Nömrənizin fasiləsiz və təhlükəsiz işləməsi üçün aşağıdakı sadə qaydalara mütləq riayət edin.
                        </p>
                    </div>

                    <!-- 7 Anti-Ban Rules Cards -->
                    <div class="space-y-2.5">
                        <!-- Rule 1 -->
                        <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-100">1</span>
                                <h4 class="font-bold text-xs sm:text-sm text-slate-900">Yeni SIM nömrəni qızdırın (Warm-up prosesi)</h4>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed pl-8">
                                Yeni alınmış SIM nömrələrin WhatsApp alqoritmləri qarşısında etibarı (trust score) sıfırdır. Nömrəni dərhal avtomatlaşdırmaya qoşub çoxsaylı mesaj göndərməyin. Ən azı 10–14 gün nömrədən adi insani söhbətlər aparın, dostlarla yazışın, WhatsApp qruplarına qoşulun. İlk günlər bildirişləri gündə maksimum 5–10 müştəri ilə məhdudlaşdırın.
                            </p>
                        </div>

                        <!-- Rule 2 -->
                        <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-100">2</span>
                                <h4 class="font-bold text-xs sm:text-sm text-slate-900">Yalnız real qəbul müştərilərinə göndərin (Spam qadağandır)</h4>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed pl-8">
                                Heç vaxt kənar bazalara, tanımadığınız insanlara və ya soyuq reklam kampaniyaları üçün kütləvi mesaj göndərməyin. Yalnız salondan xidmət sifariş edən və nömrəsini şəxsən qeyd edən müştərilərə xatırlatma göndərin. Bir neçə nəfərin «Şikayət et / Spam» (Report) düyməsinə basması bloklanmanın ən birinci səbəbidir.
                            </p>
                        </div>

                        <!-- Rule 3 -->
                        <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-100">3</span>
                                <h4 class="font-bold text-xs sm:text-sm text-slate-900">İkitərəfli dialoq qurun (Müştərinin cavab yazması)</h4>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed pl-8">
                                WhatsApp yalnız mesaj atan, lakin qarşı tərəfdən heç bir cavab almayan nömrələri robot hesab edir. Bildiriş şablonunun sonuna müştərini cavab yazmağa çağıran ifadə qoyun: «Qəbulunuzu təsdiqləmək üçün lütfən 'Bəli' və ya '1' yazın». Müştəri nömrəyə cavab verdikdə nömrənizin etibarlılıq balı kəskin yüksəlir.
                            </p>
                        </div>

                        <!-- Rule 4 -->
                        <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-100">4</span>
                                <h4 class="font-bold text-xs sm:text-sm text-slate-900">Nömrəni kontaktlara əlavə etdirmək</h4>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed pl-8">
                                Müştərilərinizdən salonun rəsmi WhatsApp nömrəsini telefon kitabçasına əlavə etmələrini xahiş edin (məsələn: «Zeyvo Beauty Lounge»). WhatsApp telefon kitabçasında qeydiyyatda olan nömrələrə göndərilən mesajları heç vaxt spam kimi qeydə almır.
                            </p>
                        </div>

                        <!-- Rule 5 -->
                        <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-100">5</span>
                                <h4 class="font-bold text-xs sm:text-sm text-slate-900">Dinamik dəyişənlər və unikal şablonlar</h4>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed pl-8">
                                Eyni mətni yüzlərlə insana təkrar-təkrar göndərmək spam filtrlərini aktivləşdirir. Mütləq mesaj şablonunda dinamik dəyişənlərdən ({client_name}, {time}, {master_name}, {service_name}) istifadə edin ki, hər göndərilən mesaj bir-birindən fərqli və unikal olsun.
                            </p>
                        </div>

                        <!-- Rule 6 -->
                        <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-100">6</span>
                                <h4 class="font-bold text-xs sm:text-sm text-slate-900">Təbii fasilələr və insan kimi gecikmə (Human-like delay)</h4>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed pl-8">
                                Bir anda eyni saniyədə yüzlərlə bildiriş buraxmaq olmaz. Zeyvo sistemi avtomatik olaraq mesajlar arasına 8–15 saniyəlik təbii fasilə qoyur ki, insan yazışmasını təqlid etsin.
                            </p>
                        </div>

                        <!-- Rule 7 -->
                        <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-100">7</span>
                                <h4 class="font-bold text-xs sm:text-sm text-slate-900">Sakit saatlar (Gecə bildirişlərinə qadağa)</h4>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed pl-8">
                                Saat 21:00-dan səhər 09:00-a qədər bildiriş göndərməyin. Narazı müştərilərin şikayət etmə ehtimalı gecə saatlarında kəskin yüksəlir.
                            </p>
                        </div>
                    </div>

                    <!-- Recovery Guide Box -->
                    <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <h4 class="font-bold text-xs sm:text-sm text-slate-900">Nömrə bloklandıqda nə etməli?</h4>
                        <div class="space-y-1.5 text-xs text-slate-600">
                            <p>1. WhatsApp tətbiqini açdıqda çıxan bildiriş pəncərəsində <b>«Sorğu göndər» (Request a review)</b> düyməsinə toxunun.</p>
                            <p>2. İzah mətnində rəsmi və nəzakətli şəkildə yazın:</p>
                            <div class="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] font-mono text-slate-700 select-all">
                                «Hörmətli WhatsApp Dəstək komandası! Bu nömrə rəsmi gözəllik salonunun müştəri qəbul xatırlatmaları üçün istifadə olunur və heç bir kütləvi spam yayılmayıb. Bütün mesajlar yalnız qəbula yazılmış şəxsi müştərilərimizə çatdırılır. Zəhmət olmasa nömrənin fəaliyyətini bərpa edin.»
                            </div>
                            <p>3. WhatsApp dəstək xidməti ilk müraciətdə adətən 12–24 saat ərzində nömrəni blokdan azad edir.</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // 3. Reviews & Ratings Tab
        else if (this.whatsAppModalActiveTab === 'reviews') {
            const partner = this.getPartnerUser ? this.getPartnerUser() : {};
            body.innerHTML = `
                <div class="space-y-5">
                    
                    <!-- Rating Summary Box -->
                    <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-5">
                        <div class="flex flex-col items-center justify-center shrink-0 sm:border-r sm:border-slate-200 sm:pr-6">
                            <span class="text-3xl sm:text-4xl font-black text-slate-900 font-mono">${summary.avg}</span>
                            <div class="flex items-center text-amber-400 my-1">
                                ${[1,2,3,4,5].map(() => `<svg class="w-4 h-4 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`).join('')}
                            </div>
                            <span class="text-xs text-slate-500 font-medium">${summary.count} təsdiqlənmiş rəy</span>
                        </div>

                        <!-- 5 Star Bars -->
                        <div class="flex-1 w-full space-y-1.5 text-xs text-slate-600">
                            ${[5, 4, 3, 2, 1].map(starsNum => {
                                const starCount = summary.stars[starsNum] || 0;
                                const pct = summary.count > 0 ? Math.round((starCount / summary.count) * 100) : (starsNum === 5 ? 100 : 0);
                                return `
                                    <div class="flex items-center gap-2">
                                        <span class="w-12 text-[11px] font-semibold text-slate-500">${starsNum} ulduz</span>
                                        <div class="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                                            <div class="h-full bg-amber-400 rounded-full" style="width: ${pct}%"></div>
                                        </div>
                                        <span class="w-8 text-[11px] text-right font-mono text-slate-400">${starCount}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Review Submission Form (Only if installed) -->
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                        ${wa.installed ? `
                            <div class="border-b border-slate-100 pb-2">
                                <h4 class="font-bold text-xs sm:text-sm text-slate-900">İnteqrasiyanı qiymətləndirin və rəy bildirin</h4>
                                <p class="text-[11px] text-slate-400 font-normal">Bu inteqrasiyanı quraşdırmısınız. Təcrübənizi digər salon sahibləri ilə bölüşün</p>
                            </div>

                            <form onsubmit="BusinessDashboardView.handleSubmitWhatsAppReview(event)" class="space-y-3">
                                <div>
                                    <label class="block text-xs font-semibold text-slate-700 mb-1">Qiymətiniz *</label>
                                    <div id="waRatingStarsSelector">
                                        ${this.renderRatingStarsPickerHtml(this.whatsAppSelectedRating || 5)}
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label class="block text-xs font-semibold text-slate-700 mb-1">Adınız *</label>
                                        <input type="text" id="waReviewAuthor" value="${this.escapeHtml(partner.ownerName || 'Fidan Həsənova')}" required class="w-full h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-black">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-slate-700 mb-1">Biznes / Salon adı</label>
                                        <input type="text" id="waReviewRole" value="${this.escapeHtml(partner.businessName || 'Zeyvo Salon Sahibi')}" class="w-full h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-black">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-xs font-semibold text-slate-700 mb-1">Rəyiniz və təəssüratınız *</label>
                                    <textarea id="waReviewComment" required rows="3" placeholder="İnteqrasiyanın işləməsi, müştərilərə təsiri və rahatlığı haqqında fikrinizi yazın..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-black focus:bg-white transition"></textarea>
                                </div>

                                <div class="flex items-center justify-end">
                                    <button type="submit" class="px-5 h-9 rounded-xl bg-[#101114] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5">
                                        <svg class="w-3.5 h-3.5 text-[#FFDD2D]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                                        <span>Rəyi dərc et</span>
                                    </button>
                                </div>
                            </form>
                        ` : `
                            <div class="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
                                <div>
                                    <span class="font-bold">Rəy bildirmək üçün əvvəlcə inteqrasiyanı qoşun.</span>
                                    <p class="text-[11px] text-amber-800 font-normal mt-0.5">Yalnız WhatsApp inteqrasiyasını quraşdıran bizneslər rəy bildirə bilər.</p>
                                </div>
                                <button type="button" onclick="BusinessDashboardView.toggleWhatsAppInstall(); BusinessDashboardView.renderWhatsAppModalTabContent();" class="px-4 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs">
                                    İndi qoşul
                                </button>
                            </div>
                        `}
                    </div>

                    <!-- Reviews List -->
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <h4 class="font-bold text-xs text-slate-800">İstifadəçi rəyləri (${reviews.length})</h4>
                            <span class="text-[11px] text-slate-400">Ən yenilər yuxarıda</span>
                        </div>

                        <div class="space-y-2.5">
                            ${reviews.map(r => `
                                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <div class="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center">
                                                ${(r.userName || 'U').slice(0, 1).toUpperCase()}
                                            </div>
                                            <div>
                                                <div class="font-bold text-xs text-slate-900">${this.escapeHtml(r.userName)}</div>
                                                <div class="text-[10px] text-slate-400">${this.escapeHtml(r.businessTitle || 'Biznes Sahibi')}</div>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-1.5">
                                            <div class="flex items-center text-amber-400">
                                                ${Array.from({ length: Math.round(parseFloat(r.rating) || 5) }).map(() => `
                                                    <svg class="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                                `).join('')}
                                            </div>
                                            <span class="text-[11px] text-slate-400 font-medium ml-1">${this.formatWhatsAppReviewDate(r.date)}</span>
                                        </div>
                                    </div>
                                    <p class="text-xs text-slate-700 font-normal leading-relaxed pl-9">
                                        «${this.escapeHtml(r.comment)}»
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                </div>
            `;
        }
    },

    selectWhatsAppRatingStar: function(rating) {
        this.whatsAppSelectedRating = rating;
        const container = document.getElementById('waRatingStarsSelector');
        if (container) {
            container.innerHTML = this.renderRatingStarsPickerHtml(rating);
        }
    },

    renderRatingStarsPickerHtml: function(currentRating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= currentRating;
            starsHtml += `
                <button type="button" onclick="BusinessDashboardView.selectWhatsAppRatingStar(${i})" class="p-1 transition hover:scale-110 focus:outline-none cursor-pointer" title="${i} ulduz">
                    <svg class="w-5 h-5 ${isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                    </svg>
                </button>
            `;
        }
        return `
            <div class="flex items-center gap-1">
                ${starsHtml}
                <span class="text-xs font-bold text-slate-700 ml-2">${currentRating} / 5</span>
            </div>
        `;
    },

    handleConnectWhatsAppViaQR: function() {
        const phoneInput = document.getElementById('waFormPhone');
        const rawDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '502345678';
        const cleanDigits = rawDigits.startsWith('994') ? rawDigits.slice(3) : rawDigits;
        const formattedPhone = cleanDigits.length >= 9
            ? `+994 (${cleanDigits.slice(0, 2)}) ${cleanDigits.slice(2, 5)}-${cleanDigits.slice(5, 7)}-${cleanDigits.slice(7, 9)}`
            : (phoneInput && phoneInput.value.trim() ? `+994 ${phoneInput.value.trim()}` : '+994 (50) 234-56-78');
        const data = this.getIntegrationsData();
        if (!data.whatsapp) data.whatsapp = {};
        data.whatsapp.phone = formattedPhone;
        data.whatsapp.installed = true;
        data.whatsapp.connectedState = 'connected';
        data.whatsapp.installedAt = new Date().toISOString();
        this.saveIntegrationsData(data);
        this.renderWhatsAppModalTabContent();
        this.refreshIntegrationsCanvas();
        this.render(); // update sidebar counters

        if (typeof App !== 'undefined') {
            App.showToast('WhatsApp hesabı uğurla qoşuldu!');
        }
    },

    reconnectWhatsAppInstance: function() {
        if (typeof App !== 'undefined') {
            App.showToast('QR kod və sessiya yeniləndi.');
        }
        const box = document.getElementById('waQrCodeBox');
        if (box) {
            box.classList.add('opacity-40');
            setTimeout(() => box.classList.remove('opacity-40'), 350);
        }
    },

    toggleWhatsAppInstall: function() {
        const data = this.getIntegrationsData();
        const item = data.whatsapp || {};
        item.installed = !item.installed;
        if (item.installed) {
            item.connectedState = 'connected';
            item.installedAt = new Date().toISOString();
        } else {
            item.connectedState = 'disconnected';
        }
        data.whatsapp = item;
        this.saveIntegrationsData(data);
        this.refreshIntegrationsCanvas();
        this.render(); // update sidebar counters

        if (typeof App !== 'undefined') {
            App.showToast(item.installed ? 'WhatsApp Business inteqrasiyası aktivləşdirildi!' : 'WhatsApp inteqrasiyası dayandırıldı');
        }
    },

    handleSaveWhatsAppSettings: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const phoneInput = document.getElementById('waFormPhone');
        const reminderSelect = document.getElementById('waFormReminderHours');
        const customTemplate = document.getElementById('waFormTemplate');

        const chkCreated = document.getElementById('waNotifyCreated');
        const chkReminder = document.getElementById('waNotifyReminder');
        const chkCancelled = document.getElementById('waNotifyCancelled');
        const chkMaster = document.getElementById('waNotifyMaster');
        const chkReview = document.getElementById('waNotifyReview');

        const data = this.getIntegrationsData();
        if (!data.whatsapp) data.whatsapp = {};
        if (!data.whatsapp.settings) data.whatsapp.settings = {};

        if (phoneInput && phoneInput.value.trim()) {
            data.whatsapp.phone = phoneInput.value.trim();
        }
        if (reminderSelect) {
            data.whatsapp.settings.reminderTimeHours = parseInt(reminderSelect.value) || 2;
        }
        if (customTemplate && customTemplate.value.trim()) {
            data.whatsapp.settings.customTemplate = customTemplate.value.trim();
        }

        if (chkCreated) data.whatsapp.settings.notifyOnBookingCreated = chkCreated.checked;
        if (chkReminder) data.whatsapp.settings.notifyReminder2Hours = chkReminder.checked;
        if (chkCancelled) data.whatsapp.settings.notifyOnBookingCancelled = chkCancelled.checked;
        if (chkMaster) data.whatsapp.settings.notifyMasterOnNewBooking = chkMaster.checked;
        if (chkReview) data.whatsapp.settings.notifyReviewRequest = chkReview.checked;

        this.saveIntegrationsData(data);
        this.closeWhatsAppIntegrationModal();
        this.refreshIntegrationsCanvas();

        if (typeof App !== 'undefined') {
            App.showToast('WhatsApp tənzimləmələri uğurla yadda saxlanıldı');
        }
    },

    handleSendWhatsAppTestMessage: function() {
        const data = this.getIntegrationsData();
        const phone = data.whatsapp?.phone || '+994 50 123-45-67';
        if (typeof App !== 'undefined') {
            App.showToast(`Test bildirişi göndərildi: ${phone}`);
        }
    },

    handleSubmitWhatsAppReview: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const data = this.getIntegrationsData();
        if (!data.whatsapp?.installed) {
            if (typeof App !== 'undefined') App.showToast('Rəy bildirmək üçün əvvəlcə inteqrasiyanı qoşun');
            return;
        }

        const nameInput = document.getElementById('waReviewAuthor');
        const roleInput = document.getElementById('waReviewRole');
        const commentInput = document.getElementById('waReviewComment');

        const comment = commentInput ? commentInput.value.trim() : '';
        if (!comment || comment.length < 5) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa rəyinizi ətraflı qeyd edin (minimum 5 simvol)');
            if (commentInput) commentInput.focus();
            return;
        }

        const partner = this.getPartnerUser ? this.getPartnerUser() : {};
        const authorName = (nameInput ? nameInput.value.trim() : '') || partner.ownerName || 'Fidan Həsənova';
        const authorRole = (roleInput ? roleInput.value.trim() : '') || partner.businessName || 'Zeyvo Business İstifadəçisi';
        const rating = this.whatsAppSelectedRating || 5;

        const now = new Date();
        const monthNames = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
        const formattedDate = `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

        const newReview = {
            id: 'rev_' + Date.now(),
            userName: authorName,
            businessTitle: authorRole,
            rating: rating,
            date: formattedDate,
            comment: comment
        };

        const reviews = this.getWhatsAppReviews();
        reviews.unshift(newReview);
        this.saveWhatsAppReviews(reviews);

        // Update avg rating on whatsapp integration
        const summary = this.getWhatsAppRatingSummary();
        data.whatsapp.rating = summary.avg;
        data.whatsapp.reviewsCount = summary.count;
        this.saveIntegrationsData(data);

        // Reset
        if (commentInput) commentInput.value = '';
        this.whatsAppSelectedRating = 5;

        // Re-render
        this.renderWhatsAppModalTabContent();
        this.refreshIntegrationsCanvas();

        if (typeof App !== 'undefined') {
            App.showToast('Təşəkkür edirik! Rəyiniz və qiymətiniz uğurla qeydə alındı.');
        }
    },
});
