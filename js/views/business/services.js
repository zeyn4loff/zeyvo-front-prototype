// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {
    // MODULE: SERVICES & PRICING (XİDMƏTLƏR VƏ QİYMƏT)
    // ==========================================

    // Staff data & Master Management methods
    getDefaultStaffList: function() {
        return [
            {
                id: 'st_1',
                name: 'Samir Əliyev',
                role: 'Top Stilist',
                specialization: 'Saç kəsimi & Stil',
                phone: '+994 50 234-56-78',
                email: 'samir.aliyev@zeyvo.az',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
                bio: '10+ il peşəkar təcrübə. Avropa stilistika akademiyasının məzunu, fərdi saç dizaynı və dəbli kişi-qadın kəsimləri üzrə ekspert.',
                status: 'active',
                rating: 4.95,
                reviewsCount: 142,
                isOnlineBooking: true,
                serviceIds: ['srv_1', 'srv_2', 'srv_6', 'srv_14', 'srv_15'],
                customPricing: {
                    srv_1: { price: 30, duration: 45 }
                },
                workSchedule: {
                    type: 'weekly',
                    days: {
                        mon: { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' },
                        tue: { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' },
                        wed: { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' },
                        thu: { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' },
                        fri: { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' },
                        sat: { enabled: true, start: '10:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' },
                        sun: { enabled: false, start: '10:00', end: '18:00' }
                    }
                },
                salaryScheme: {
                    type: 'commission',
                    serviceCommission: 40,
                    productCommission: 10,
                    fixedSalary: 0
                },
                permissions: {
                    role: 'specialist',
                    canViewCalendar: true,
                    canEditSchedule: false,
                    canViewRevenue: false
                },
                branchId: 'br_1',
                color: '#FFDD2D'
            },
            {
                id: 'st_2',
                name: 'Aygün Məmmədova',
                role: 'Nail Master',
                specialization: 'Dırnaq servisi & Shellac',
                phone: '+994 55 345-67-89',
                email: 'aygun.m@zeyvo.az',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
                bio: 'Aparat manikür və dırnaq incəsənəti üzrə beynəlxalq dərəcəli mütəxəssis. Yüksək gigiyenik standartlar və steril alətlər.',
                status: 'active',
                rating: 4.92,
                reviewsCount: 98,
                isOnlineBooking: true,
                serviceIds: ['srv_3', 'srv_4', 'srv_8'],
                customPricing: {},
                workSchedule: {
                    type: 'weekly',
                    days: {
                        mon: { enabled: true, start: '10:00', end: '20:00', breakStart: '14:00', breakEnd: '15:00' },
                        tue: { enabled: true, start: '10:00', end: '20:00', breakStart: '14:00', breakEnd: '15:00' },
                        wed: { enabled: true, start: '10:00', end: '20:00', breakStart: '14:00', breakEnd: '15:00' },
                        thu: { enabled: true, start: '10:00', end: '20:00', breakStart: '14:00', breakEnd: '15:00' },
                        fri: { enabled: true, start: '10:00', end: '20:00', breakStart: '14:00', breakEnd: '15:00' },
                        sat: { enabled: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' },
                        sun: { enabled: false, start: '10:00', end: '18:00' }
                    }
                },
                salaryScheme: {
                    type: 'commission',
                    serviceCommission: 45,
                    productCommission: 12,
                    fixedSalary: 0
                },
                permissions: {
                    role: 'specialist',
                    canViewCalendar: true,
                    canEditSchedule: false,
                    canViewRevenue: false
                },
                branchId: 'br_1',
                color: '#EC4899'
            },
            {
                id: 'st_3',
                name: 'Kamran Bağırov',
                role: 'Master Barber',
                specialization: 'Kişi saç və saqqal stilizasiyası',
                phone: '+994 70 876-54-32',
                email: 'kamran.b@zeyvo.az',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
                bio: 'Klassik və müasir barber sənəti, saqqal dizaynı və isti dəsmal ilə ənənəvi təraş ustası. 8 il təcrübə.',
                status: 'active',
                rating: 4.88,
                reviewsCount: 115,
                isOnlineBooking: true,
                serviceIds: ['srv_5', 'srv_10', 'srv_11'],
                customPricing: {},
                workSchedule: {
                    type: 'weekly',
                    days: {
                        mon: { enabled: false, start: '09:00', end: '19:00' },
                        tue: { enabled: true, start: '09:00', end: '20:00', breakStart: '13:30', breakEnd: '14:30' },
                        wed: { enabled: true, start: '09:00', end: '20:00', breakStart: '13:30', breakEnd: '14:30' },
                        thu: { enabled: true, start: '09:00', end: '20:00', breakStart: '13:30', breakEnd: '14:30' },
                        fri: { enabled: true, start: '09:00', end: '20:00', breakStart: '13:30', breakEnd: '14:30' },
                        sat: { enabled: true, start: '09:00', end: '20:00', breakStart: '13:30', breakEnd: '14:30' },
                        sun: { enabled: true, start: '10:00', end: '18:00', breakStart: '14:00', breakEnd: '15:00' }
                    }
                },
                salaryScheme: {
                    type: 'fixed_plus_commission',
                    serviceCommission: 35,
                    productCommission: 10,
                    fixedSalary: 500
                },
                permissions: {
                    role: 'specialist',
                    canViewCalendar: true,
                    canEditSchedule: false,
                    canViewRevenue: false
                },
                branchId: 'br_1',
                color: '#3B82F6'
            },
            {
                id: 'st_4',
                name: 'Nigar Quliyeva',
                role: 'Kolorist / Kosmetoloq',
                specialization: 'Mürəkkəb saç boyama & Estetik kosmetologiya',
                phone: '+994 51 654-98-70',
                email: 'nigar.q@zeyvo.az',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
                bio: 'AirTouch, Balayage və Shatush texnikaları üzrə sertifikatlı mütəxəssis, estetik dərinin təmizlənməsi və qulluq üzrə ekspert.',
                status: 'active',
                rating: 4.98,
                reviewsCount: 164,
                isOnlineBooking: true,
                serviceIds: ['srv_2', 'srv_7', 'srv_9', 'srv_12', 'srv_15'],
                customPricing: {},
                workSchedule: {
                    type: 'weekly',
                    days: {
                        mon: { enabled: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' },
                        tue: { enabled: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' },
                        wed: { enabled: false, start: '10:00', end: '19:00' },
                        thu: { enabled: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' },
                        fri: { enabled: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' },
                        sat: { enabled: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' },
                        sun: { enabled: false, start: '10:00', end: '18:00' }
                    }
                },
                salaryScheme: {
                    type: 'commission',
                    serviceCommission: 45,
                    productCommission: 15,
                    fixedSalary: 0
                },
                permissions: {
                    role: 'senior',
                    canViewCalendar: true,
                    canEditSchedule: true,
                    canViewRevenue: false
                },
                branchId: 'br_1',
                color: '#10B981'
            }
        ];
    },

    getStaffList: function() {
        const defaults = this.getDefaultStaffList();
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_staff_v1'));
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length === 0) return [];
                if (Array.isArray(parsed) && parsed.length > 0) {
                    let updated = false;
                    parsed.forEach(p => {
                        if (!p.avatar && !p.photo) {
                            const def = defaults.find(d => d.id === p.id || d.name === p.name);
                            if (def && (def.avatar || def.photo)) {
                                p.avatar = def.avatar || def.photo;
                                updated = true;
                            }
                        }
                    });
                    if (updated) {
                        this.saveStaffList(parsed);
                    }
                    return parsed;
                }
            } catch (e) {
                console.error("Error reading staff list:", e);
            }
        }
        if (this.storageKey('zeyvo_business_staff_v1') !== 'zeyvo_business_staff_v1') return [];
        this.saveStaffList(defaults);
        return defaults;
    },

    saveStaffList: function(list) {
        localStorage.setItem(this.storageKey('zeyvo_business_staff_v1'), JSON.stringify(list));
    },

    // Master Modal State
    activeMasterModalTab: 'info',
    editingMasterId: null,
    tempMasterServices: [],
    tempMasterCustomPricing: {},
    tempMasterSchedule: {},
    tempMasterScheduleExceptions: [],
    masterReviewsVisibleLimit: 3,

    getDefaultMasterSchedule: function() {
        return {
            type: 'weekly',
            days: {
                mon: { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' },
                tue: { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' },
                wed: { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' },
                thu: { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' },
                fri: { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' },
                sat: { enabled: true, start: '10:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' },
                sun: { enabled: false, start: '10:00', end: '18:00' }
            }
        };
    },

    openCreateMasterModal: function(masterId = null, defaultTab = 'info') {
        const modal = document.getElementById('bizMasterModal');
        if (!modal) return;

        this.editingMasterId = masterId;
        const staffList = this.getStaffList();
        const master = masterId ? staffList.find(s => s.id === masterId) : null;

        const titleEl = document.getElementById('masterModalTitle');
        const subEl = document.getElementById('masterModalSubtitle');
        const editIdInput = document.getElementById('masterFormEditId');
        const nameInput = document.getElementById('masterFormName');
        const roleInput = document.getElementById('masterFormRole');
        const specInput = document.getElementById('masterFormSpec');
        const statusSelect = document.getElementById('masterFormStatus');
        const phoneInput = document.getElementById('masterFormPhone');
        const emailInput = document.getElementById('masterFormEmail');
        const avatarInput = document.getElementById('masterFormAvatar');
        const avatarPreview = document.getElementById('masterFormAvatarPreview');
        const colorInput = document.getElementById('masterFormColor');
        const bioInput = document.getElementById('masterFormBio');
        const onlineBookingCheckbox = document.getElementById('masterFormOnlineBooking');
        const ratingInput = document.getElementById('masterFormRating');
        const reviewsCountInput = document.getElementById('masterFormReviewsCount');
        const ratingDisplay = document.getElementById('masterFormRatingDisplay');
        const reviewsDisplay = document.getElementById('masterFormReviewsDisplay');
        const onlineNoteInput = document.getElementById('masterFormOnlineNote');
        const salaryTypeSelect = document.getElementById('masterFormSalaryType');
        const srvCommissionInput = document.getElementById('masterFormServiceCommission');
        const prodCommissionInput = document.getElementById('masterFormProductCommission');
        const fixedSalaryInput = document.getElementById('masterFormFixedSalary');
        const rolePermSelect = document.getElementById('masterFormRolePermission');
        const deleteBtn = document.getElementById('masterFormDeleteBtn');
        const dismissBtn = document.getElementById('masterFormDismissBtn');
        const rehireBtn = document.getElementById('masterFormRehireBtn');
        const dismissedBanner = document.getElementById('masterDismissedBanner');
        const dismissedBannerText = document.getElementById('masterDismissedBannerText');

            if (master) {
            if (titleEl) titleEl.textContent = `${master.name} — Redaktə`;
            if (subEl) subEl.textContent = `${master.role || 'Mütəxəssis'} • Profil parametrləri və qrafik`;
            if (editIdInput) editIdInput.value = master.id;
            if (nameInput) nameInput.value = master.name || '';
            this.populateMasterRoleSelect(master.role || '');
            if (specInput) specInput.value = master.specialization || '';
            if (statusSelect) statusSelect.value = master.status || 'active';
            const cleanPhone = (master.phone || '').replace('+994', '').trim();
            if (phoneInput) phoneInput.value = cleanPhone;
            if (emailInput) emailInput.value = master.email || '';
            this.updateMasterAvatarUI(master.avatar || '', master.name || '');
            if (colorInput) colorInput.value = master.color || '#FFDD2D';
            if (bioInput) bioInput.value = master.bio || '';
            if (onlineBookingCheckbox) onlineBookingCheckbox.checked = master.isOnlineBooking !== false;
            if (ratingInput) ratingInput.value = master.rating || 5.0;
            if (reviewsCountInput) reviewsCountInput.value = master.reviewsCount || 0;
            if (ratingDisplay) ratingDisplay.textContent = (master.rating !== undefined && master.rating !== null) ? Number(master.rating).toFixed(1) : '5.0';
            if (reviewsDisplay) reviewsDisplay.textContent = master.reviewsCount || '0';
            if (onlineNoteInput) onlineNoteInput.value = master.onlineNote || '';

            const displayName = document.getElementById('masterCardDisplayName');
            const displayRole = document.getElementById('masterCardDisplayRole');
            const displayPhone = document.getElementById('masterCardDisplayPhone');
            if (displayName) displayName.textContent = master.name || 'Usta adı';
            if (displayRole) displayRole.textContent = master.role || 'Mütəxəssis';
            if (displayPhone) displayPhone.textContent = master.phone || '+994 50 000-00-00';
            this.selectMasterGender(master.gender || 'male');

            const curSalaryType = master.salaryScheme?.type || 'commission';
            if (salaryTypeSelect) salaryTypeSelect.value = curSalaryType;
            if (srvCommissionInput) srvCommissionInput.value = master.salaryScheme?.serviceCommission !== undefined ? master.salaryScheme.serviceCommission : 40;
            if (prodCommissionInput) prodCommissionInput.value = master.salaryScheme?.productCommission !== undefined ? master.salaryScheme.productCommission : 10;
            if (fixedSalaryInput) fixedSalaryInput.value = master.salaryScheme?.fixedSalary || 0;

            const rentDetails = master.salaryScheme?.rentDetails || {};
            const rentalTypeInput = document.getElementById('masterFormRentalType');
            const rentalAmountInput = document.getElementById('masterFormRentalAmount');
            const rentalProdCommInput = document.getElementById('masterFormRentalProductComm');
            const rentalCardCommInput = document.getElementById('masterFormRentalCardComm');
            if (rentalTypeInput) rentalTypeInput.value = rentDetails.rentalType || 'monthly';
            if (rentalAmountInput) rentalAmountInput.value = rentDetails.rentalAmount !== undefined ? rentDetails.rentalAmount : 300;
            if (rentalProdCommInput) rentalProdCommInput.value = rentDetails.productCommission !== undefined ? rentDetails.productCommission : 10;
            if (rentalCardCommInput) rentalCardCommInput.value = rentDetails.cardCommission !== undefined ? rentDetails.cardCommission : 0;
            this.onMasterRentalTypeChange(rentDetails.rentalType || 'monthly');

            this.onMasterSalarySchemeChange(curSalaryType);
            if (rolePermSelect) rolePermSelect.value = master.permissions?.role || 'specialist';
            this.initMasterPermissionsUI(master.permissions || { role: 'specialist' });

            const allServicesList = this.getServices ? this.getServices() : [];
            const srvIdsSet = new Set(Array.isArray(master.serviceIds) ? master.serviceIds : []);
            allServicesList.forEach(s => {
                if (Array.isArray(s.staffIds) && s.staffIds.includes(master.id)) {
                    srvIdsSet.add(s.id);
                }
            });
            this.tempMasterServices = Array.from(srvIdsSet);
            this.tempMasterCustomPricing = master.customPricing ? JSON.parse(JSON.stringify(master.customPricing)) : {};
            this.tempMasterSchedule = master.workSchedule ? JSON.parse(JSON.stringify(master.workSchedule)) : this.getDefaultMasterSchedule();
            this.tempMasterScheduleExceptions = Array.isArray(master.scheduleExceptions) ? JSON.parse(JSON.stringify(master.scheduleExceptions)) : [];
            this.masterReviewsVisibleLimit = 3;
            this.tempMasterReviews = this.getMasterReviews(master.id, master);

            if (master.status === 'dismissed') {
                if (dismissedBanner) dismissedBanner.classList.remove('hidden');
                if (dismissedBannerText) {
                    const r = master.dismissalInfo?.reason || 'Qeyd olunmayıb';
                    const d = master.dismissalInfo?.date ? ` • ${master.dismissalInfo.date}` : '';
                    dismissedBannerText.textContent = `Səbəb: ${r}${d}`;
                }
                if (dismissBtn) dismissBtn.classList.add('hidden');
                if (rehireBtn) rehireBtn.classList.remove('hidden');
            } else {
                if (dismissedBanner) dismissedBanner.classList.add('hidden');
                if (dismissBtn) dismissBtn.classList.remove('hidden');
                if (rehireBtn) rehireBtn.classList.add('hidden');
            }

            if (deleteBtn) deleteBtn.classList.remove('hidden');
        } else {
            if (titleEl) titleEl.textContent = 'Yeni usta əlavə et';
            if (subEl) subEl.textContent = 'Mütəxəssis profili, iş saatları, təyin olunmuş xidmətlər və komissiya';
            if (editIdInput) editIdInput.value = '';
            if (nameInput) nameInput.value = '';
            this.populateMasterRoleSelect('Top Stilist');
            if (specInput) specInput.value = '';
            if (statusSelect) statusSelect.value = 'active';
            if (phoneInput) phoneInput.value = '';
            if (emailInput) emailInput.value = '';
            this.updateMasterAvatarUI('', '');
            if (colorInput) colorInput.value = '#FFDD2D';
            if (bioInput) bioInput.value = '';
            if (onlineBookingCheckbox) onlineBookingCheckbox.checked = true;
            if (ratingInput) ratingInput.value = 5.0;
            if (reviewsCountInput) reviewsCountInput.value = 0;
            if (ratingDisplay) ratingDisplay.textContent = '5.0';
            if (reviewsDisplay) reviewsDisplay.textContent = '0';
            if (onlineNoteInput) onlineNoteInput.value = '';

            const displayName = document.getElementById('masterCardDisplayName');
            const displayRole = document.getElementById('masterCardDisplayRole');
            const displayPhone = document.getElementById('masterCardDisplayPhone');
            if (displayName) displayName.textContent = 'Usta adı';
            if (displayRole) displayRole.textContent = 'Top Stilist';
            if (displayPhone) displayPhone.textContent = '+994 50 000-00-00';
            this.selectMasterGender('male');

            const rentalTypeInput = document.getElementById('masterFormRentalType');
            const rentalAmountInput = document.getElementById('masterFormRentalAmount');
            const rentalProdCommInput = document.getElementById('masterFormRentalProductComm');
            const rentalCardCommInput = document.getElementById('masterFormRentalCardComm');
            if (rentalTypeInput) rentalTypeInput.value = 'monthly';
            if (rentalAmountInput) rentalAmountInput.value = 300;
            if (rentalProdCommInput) rentalProdCommInput.value = 10;
            if (rentalCardCommInput) rentalCardCommInput.value = 0;
            this.onMasterRentalTypeChange('monthly');

            if (salaryTypeSelect) salaryTypeSelect.value = 'commission';
            if (srvCommissionInput) srvCommissionInput.value = 40;
            if (prodCommissionInput) prodCommissionInput.value = 10;
            if (fixedSalaryInput) fixedSalaryInput.value = 0;
            this.onMasterSalarySchemeChange('commission');
            if (rolePermSelect) rolePermSelect.value = 'specialist';
            this.initMasterPermissionsUI({ role: 'specialist' });

            this.tempMasterServices = [];
            this.tempMasterCustomPricing = {};
            this.tempMasterSchedule = this.getDefaultMasterSchedule();
            this.tempMasterScheduleExceptions = [];
            this.masterReviewsVisibleLimit = 3;
            this.tempMasterReviews = [];

            if (dismissedBanner) dismissedBanner.classList.add('hidden');
            if (dismissBtn) dismissBtn.classList.add('hidden');
            if (rehireBtn) rehireBtn.classList.add('hidden');
            if (deleteBtn) deleteBtn.classList.add('hidden');
        }

        this.renderMasterColorSwatches(colorInput ? colorInput.value : '#FFDD2D');
        this.renderMasterReviewsList();
        this.renderMasterModalTabs();
        this.renderMasterModalServicesTab();
        this.renderMasterScheduleDaysTab();
        this.renderMasterScheduleExceptionsList();
        this.switchMasterScheduleSubTab('base');
        this.switchMasterModalTab(defaultTab || 'info');

        modal.classList.remove('hidden');
        if (nameInput) setTimeout(() => nameInput.focus(), 50);
    },

    closeCreateMasterModal: function() {
        this.closeZeyvoTimePicker();
        this.closeAllCustomDatePickers();
        const modal = document.getElementById('bizMasterModal');
        if (modal) modal.classList.add('hidden');
    },

    renderMasterModalTabs: function() {
        const container = document.getElementById('bizMasterTabsContainer');
        if (!container) return;

        const srvCount = (this.tempMasterServices || []).length;
        const revCount = (this.tempMasterReviews || []).length;
        const tabs = [
            { id: 'info', label: 'Şəxsi məlumatlar' },
            { id: 'online', label: 'Onlayn qəbul', badge: revCount > 0 ? revCount : null },
            { id: 'services', label: 'Xidmətlər', badge: srvCount > 0 ? srvCount : null },
            { id: 'schedule', label: 'İş qrafiki' },
            { id: 'salary', label: 'Əməkhaqqı' },
            { id: 'permissions', label: 'İcazələr' }
        ];

        const activeId = this.activeMasterModalTab || 'info';

        container.innerHTML = `
            <div class="flex rounded-xl bg-slate-100 p-1 gap-1 overflow-x-auto no-scrollbar shadow-2xs">
                ${tabs.map(t => {
                    const isActive = t.id === activeId;
                    const activeClass = 'bg-white shadow-xs text-slate-900 font-bold';
                    const inactiveClass = 'text-slate-500 hover:text-slate-900 font-semibold';
                    const badgeHtml = (t.badge !== undefined && t.badge !== null)
                        ? `<span class="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-200 text-slate-600'} font-black">${t.badge}</span>`
                        : '';
                    return `
                        <button type="button" onclick="BusinessDashboardView.switchMasterModalTab('${t.id}')" class="shrink-0 py-2 px-3 rounded-lg text-xs transition flex items-center justify-center whitespace-nowrap text-center ${isActive ? activeClass : inactiveClass} cursor-pointer">
                            <span>${t.label}</span>
                            ${badgeHtml}
                        </button>
                    `;
                }).join('')}
            </div>
        `;
    },

    switchMasterModalTab: function(tabKey) {
        this.closeZeyvoTimePicker();
        this.activeMasterModalTab = tabKey;
        this.renderMasterModalTabs();
        const tabs = ['info', 'online', 'services', 'schedule', 'salary', 'permissions'];
        tabs.forEach(t => {
            const pane = document.getElementById(`masterPane_${t}`);
            if (pane) {
                if (t === tabKey) {
                    pane.classList.remove('hidden');
                } else {
                    pane.classList.add('hidden');
                }
            }
        });
        const scrollPane = document.getElementById('bizMasterPanesScroll');
        if (scrollPane) scrollPane.scrollTop = 0;
        if (tabKey === 'online') {
            this.renderMasterReviewsList();
        }
        if (tabKey === 'services') {
            this.renderMasterModalServicesTab();
        }
        if (tabKey === 'schedule') {
            this.renderMasterScheduleDaysTab();
        }
    },

    // Master Reviews & Salon Replies
    tempMasterReviews: [],
    activeReplyReviewIdx: null,

    getMasterReviews: function(masterId, masterObj = null) {
        let master = masterObj;
        if (!master && masterId) {
            const staffList = this.getStaffList ? this.getStaffList() : [];
            master = staffList.find(s => s.id === masterId);
        }
        let list = (master && Array.isArray(master.reviews) && master.reviews.length > 0)
            ? JSON.parse(JSON.stringify(master.reviews))
            : [];

        const masterName = master ? master.name : 'Usta';
        const defaultPool = [
            {
                id: 'rev_1',
                author: 'Nərmin Qasımova',
                rating: 5,
                date: '28 sentyabr 2026',
                service: 'Saç kəsimi və stil',
                text: `${masterName} əsl peşəkardır! Hər şey çox səliqəli və yüksək səviyyədə oldu. Çox razı qaldım.`,
                reply: 'Nərmin xanım, xoş sözləriniz üçün minnətdarıq! Sizi hər zaman salonda məmnuniyyətlə gözləyirik.',
                replyDate: '29 sentyabr 2026'
            },
            {
                id: 'rev_2',
                author: 'Rəşad Əliyev',
                rating: 5,
                date: '24 sentyabr 2026',
                service: 'Kişi saç və saqqal baxımı',
                text: 'Dəqiq vaxtında qəbul etdi, detallara xüsusi diqqət yetirir. Hər kəsə tövsiyə edirəm!',
                reply: '',
                replyDate: ''
            },
            {
                id: 'rev_3',
                author: 'Aysel Mahmudova',
                rating: 4,
                date: '20 sentyabr 2026',
                service: 'Saç rəngləmə və tonlama',
                text: 'Rəng tam istədiyim kimi alındı! Sadəcə qrafikdə 10 dəqiqə gecikmə oldu, amma xidmət səviyyəsi əladır.',
                reply: '',
                replyDate: ''
            },
            {
                id: 'rev_4',
                author: 'Kənan Quliyev',
                rating: 5,
                date: '15 sentyabr 2026',
                service: 'Kişi saç kəsimi',
                text: 'Həmişəki kimi əla nəticə! İllərdir yalnız bu ustaya müraciət edirəm.',
                reply: 'Kənan bəy, sadiqliyiniz və xoş sözləriniz üçün çox təşəkkür edirik!',
                replyDate: '16 sentyabr 2026'
            },
            {
                id: 'rev_5',
                author: 'Leyla Məmmədova',
                rating: 5,
                date: '10 sentyabr 2026',
                service: 'Gəlin saç düzümü',
                text: 'Toy günüm üçün saçımı hazırladı. Hər kəs heyran qaldı, əlləriniz var olsun!',
                reply: '',
                replyDate: ''
            },
            {
                id: 'rev_6',
                author: 'Murad İsmayılov',
                rating: 5,
                date: '5 sentyabr 2026',
                service: 'Saqqal korreksiyası',
                text: 'Çox dəqiq və səliqəli iş gördü. Nəticədən tam razıyam.',
                reply: 'Murad bəy, təşəkkür edirik! Hər zaman xidmətinizdəyik.',
                replyDate: '6 sentyabr 2026'
            },
            {
                id: 'rev_7',
                author: 'Günel Həsənova',
                rating: 5,
                date: '1 sentyabr 2026',
                service: 'Saç baxımı və spa',
                text: 'Möhtəşəm xidmət və peşəkar yanaşma! Saçlarım canlandı, çox təşəkkürlər.',
                reply: '',
                replyDate: ''
            }
        ];

        // Ensure minimum 7 reviews so the load more button is always functional and visible
        if (list.length < 6) {
            const existingAuthors = new Set(list.map(r => r.author));
            defaultPool.forEach(dp => {
                if (!existingAuthors.has(dp.author)) {
                    list.push(dp);
                }
            });
        }
        return list;
    },

    loadMoreMasterReviews: function() {
        this.masterReviewsVisibleLimit = (this.masterReviewsVisibleLimit || 3) + 5;
        this.renderMasterReviewsList();
    },

    renderMasterReviewsList: function() {
        const container = document.getElementById('masterReviewsListContainer');
        const badge = document.getElementById('masterReviewsCountHeaderBadge');
        const ratingDisplay = document.getElementById('masterFormRatingDisplay');
        const reviewsDisplay = document.getElementById('masterFormReviewsDisplay');

        const reviews = Array.isArray(this.tempMasterReviews) ? this.tempMasterReviews : [];

        if (badge) {
            badge.textContent = `${reviews.length} rəy`;
        }

        if (reviews.length > 0) {
            const avg = (reviews.reduce((acc, r) => acc + (parseFloat(r.rating) || 5), 0) / reviews.length).toFixed(1);
            if (ratingDisplay) ratingDisplay.textContent = avg;
            if (reviewsDisplay) reviewsDisplay.textContent = String(reviews.length);
        }

        if (!container) return;

        if (reviews.length === 0) {
            container.innerHTML = `
                <div class="text-center py-6 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                    <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-1.5 text-slate-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div class="text-xs font-bold text-slate-700">Hələ ki rəy yoxdur</div>
                    <div class="text-[11px] text-slate-400 mt-0.5">Müştərilər onlayn qeydiyyatdan sonra rəy bildirdikdə burada əks olunacaq.</div>
                </div>
            `;
            return;
        }

        const renderStars = (rating) => {
            const num = Math.round(parseFloat(rating) || 5);
            let s = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= num) {
                    s += '<svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
                } else {
                    s += '<svg class="w-3 h-3 text-slate-200 fill-slate-200 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
                }
            }
            return s;
        };

        const getInitials = (name) => {
            if (!name) return 'M';
            return name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
        };

        const visibleLimit = this.masterReviewsVisibleLimit || 3;
        const visibleReviews = reviews.slice(0, visibleLimit);

        let reviewsHtml = visibleReviews.map((r, idx) => {
            const isEditingReply = (this.activeReplyReviewIdx === idx);
            const hasReply = !!(r.reply && r.reply.trim());

            return `
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5 transition">
                    <div class="flex items-start justify-between gap-2">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <div class="w-8 h-8 rounded-full bg-[#FFDD2D] text-slate-900 font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                                ${getInitials(r.author)}
                            </div>
                            <div class="min-w-0">
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    <span class="font-bold text-xs text-slate-900 truncate">${this.escapeHtml(r.author || 'Anonim müştəri')}</span>
                                    <span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200 flex items-center gap-0.5">
                                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                                        Təsdiqlənmiş müştəri
                                    </span>
                                </div>
                                <div class="text-[10px] text-slate-400 mt-0.5">${r.date ? this.formatDateDisplay(r.date) : 'Son günlər'}</div>
                            </div>
                        </div>

                        <div class="flex flex-col items-end shrink-0 gap-1">
                            <div class="flex items-center gap-0.5">${renderStars(r.rating)}</div>
                            ${r.service ? `<span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">${this.escapeHtml(r.service)}</span>` : ''}
                        </div>
                    </div>

                    <p class="text-xs text-slate-700 font-normal leading-relaxed">
                        ${this.escapeHtml(r.text || '')}
                    </p>

                    <!-- Salon Official Reply Section -->
                    ${isEditingReply ? `
                        <div class="mt-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                            <div class="flex items-center justify-between text-[11px] font-bold text-slate-800">
                                <span class="flex items-center gap-1.5">
                                    <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6m-6-6 6-6"/></svg>
                                    Salon adından rəsmi cavab
                                </span>
                                <button type="button" onclick="BusinessDashboardView.closeReplyForm()" class="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer">✕</button>
                            </div>
                            <div class="flex flex-wrap gap-1">
                                <button type="button" onclick="BusinessDashboardView.applyReplyTemplate(${idx}, 'Təşəkkür edirik! Sizi yenidən salonda görməyə çox şad olarıq!')" class="px-2 py-0.5 rounded-md bg-white hover:bg-amber-100 text-slate-700 text-[10px] font-medium border border-amber-200 cursor-pointer">Təşəkkür edirik</button>
                                <button type="button" onclick="BusinessDashboardView.applyReplyTemplate(${idx}, 'Xoş sözləriniz və bizi seçdiyiniz üçün minnətdarıq!')" class="px-2 py-0.5 rounded-md bg-white hover:bg-amber-100 text-slate-700 text-[10px] font-medium border border-amber-200 cursor-pointer">Minnətdarıq</button>
                                <button type="button" onclick="BusinessDashboardView.applyReplyTemplate(${idx}, 'Fikriniz bizim üçün dəyərlidir, xidmətimizi daim təkmilləşdiririk.')" class="px-2 py-0.5 rounded-md bg-white hover:bg-amber-100 text-slate-700 text-[10px] font-medium border border-amber-200 cursor-pointer">Fikriniz dəyərlidir</button>
                            </div>
                            <textarea id="replyInput_${idx}" rows="2" placeholder="Müştəriyə cavabınızı yazın..." class="w-full p-2.5 rounded-lg bg-white border border-amber-300 text-xs font-normal text-slate-900 outline-none focus:border-slate-900 resize-none">${this.escapeHtml(r.reply || '')}</textarea>
                            <div class="flex justify-end gap-1.5">
                                <button type="button" onclick="BusinessDashboardView.closeReplyForm()" class="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer">Ləğv et</button>
                                <button type="button" onclick="BusinessDashboardView.saveReviewReply(${idx})" class="px-3.5 py-1 rounded-lg bg-[#FFDD2D] hover:bg-[#FCC520] text-slate-900 text-xs font-bold shadow-xs cursor-pointer">Dərc et</button>
                            </div>
                        </div>
                    ` : hasReply ? `
                        <div class="mt-2 p-3 rounded-xl bg-amber-50/40 border border-amber-200/70 space-y-1.5">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-[11px] text-slate-900 flex items-center gap-1.5">
                                    <span class="w-4 h-4 rounded-full bg-[#FFDD2D] text-slate-900 text-[9px] font-black flex items-center justify-center">Z</span>
                                    <span>Salonun rəsmi cavabı</span>
                                </span>
                                <div class="flex items-center gap-2">
                                    <span class="text-[10px] text-slate-400">${r.replyDate || 'Cavablandırılıb'}</span>
                                    <button type="button" onclick="BusinessDashboardView.openReplyForm(${idx})" class="text-[11px] font-bold text-amber-700 hover:text-amber-900 cursor-pointer" title="Cavabı redaktə et">Redaktə</button>
                                    <button type="button" onclick="BusinessDashboardView.removeReviewReply(${idx})" class="text-[11px] font-bold text-rose-500 hover:text-rose-700 cursor-pointer" title="Cavabı sil">Sil</button>
                                </div>
                            </div>
                            <p class="text-xs text-slate-700 font-normal leading-relaxed">${this.escapeHtml(r.reply)}</p>
                        </div>
                    ` : `
                        <div class="mt-1 flex items-center justify-between pt-1 border-t border-slate-100">
                            <button type="button" onclick="BusinessDashboardView.openReplyForm(${idx})" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
                                <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6m-6-6 6-6"/></svg>
                                <span>Cavab yaz</span>
                            </button>
                            <button type="button" onclick="BusinessDashboardView.deleteMasterReview(${idx})" class="text-slate-400 hover:text-rose-600 text-[11px] font-medium transition cursor-pointer" title="Rəyi sil">
                                Rəyi sil
                            </button>
                        </div>
                    `}
                </div>
            `;
        }).join('');

        if (reviews.length > visibleLimit) {
            const remaining = reviews.length - visibleLimit;
            reviewsHtml += `
                <div class="pt-3 pb-1 text-center">
                    <button type="button" onclick="BusinessDashboardView.loadMoreMasterReviews()" class="w-full sm:w-auto h-10 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition inline-flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95">
                        <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                        <span>Daha çox rəy göstər (${remaining})</span>
                    </button>
                </div>
            `;
        } else if (reviews.length > 0) {
            reviewsHtml += `
                <div class="pt-2 text-center text-[11px] text-slate-400 font-medium">
                    Bütün rəylər göstərildi (${reviews.length} rəy)
                </div>
            `;
        }

        container.innerHTML = reviewsHtml;
    },

    toggleAddMasterReviewForm: function(show = null) {
        const box = document.getElementById('masterAddReviewFormContainer');
        if (!box) return;
        const isHidden = box.classList.contains('hidden');
        const targetState = show !== null ? show : isHidden;
        if (targetState) {
            box.classList.remove('hidden');
            const authorInp = document.getElementById('newReviewAuthor');
            if (authorInp) authorInp.focus();
        } else {
            box.classList.add('hidden');
        }
    },

    handleCreateMasterReview: function(event) {
        if (event && event.preventDefault) event.preventDefault();

        const authorInp = document.getElementById('newReviewAuthor');
        const serviceInp = document.getElementById('newReviewService');
        const ratingSel = document.getElementById('newReviewRating');
        const textInp = document.getElementById('newReviewText');

        const author = authorInp ? authorInp.value.trim() : '';
        const service = serviceInp ? serviceInp.value.trim() : '';
        const rating = ratingSel ? parseFloat(ratingSel.value) || 5 : 5;
        const text = textInp ? textInp.value.trim() : '';

        if (!author || !text) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa müştərinin adını və rəy mətnini daxil edin');
            return;
        }

        const now = new Date();
        const dateStr = `${now.getDate()} ${['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'][now.getMonth()]} ${now.getFullYear()}`;

        const newReview = {
            id: 'rev_' + Date.now(),
            author: author,
            service: service || 'Ümumi xidmət',
            rating: rating,
            text: text,
            date: dateStr,
            reply: '',
            replyDate: ''
        };

        if (!Array.isArray(this.tempMasterReviews)) this.tempMasterReviews = [];
        this.tempMasterReviews.unshift(newReview);

        if (this.editingMasterId) {
            const list = this.getStaffList();
            const master = list.find(s => s.id === this.editingMasterId);
            if (master) {
                master.reviews = [...this.tempMasterReviews];
                master.reviewsCount = master.reviews.length;
                master.rating = parseFloat((master.reviews.reduce((acc, r) => acc + (parseFloat(r.rating) || 5), 0) / master.reviews.length).toFixed(2));
                this.saveStaffList(list);
            }
        }

        if (authorInp) authorInp.value = '';
        if (serviceInp) serviceInp.value = '';
        if (textInp) textInp.value = '';
        this.toggleAddMasterReviewForm(false);

        this.renderMasterReviewsList();
        this.renderMasterModalTabs();

        if (typeof App !== 'undefined') App.showToast('Yeni müştəri rəyi əlavə edildi!');
    },

    openReplyForm: function(reviewIdx) {
        this.activeReplyReviewIdx = reviewIdx;
        this.renderMasterReviewsList();
        setTimeout(() => {
            const inp = document.getElementById(`replyInput_${reviewIdx}`);
            if (inp) {
                inp.focus();
                inp.setSelectionRange(inp.value.length, inp.value.length);
            }
        }, 50);
    },

    closeReplyForm: function() {
        this.activeReplyReviewIdx = null;
        this.renderMasterReviewsList();
    },

    applyReplyTemplate: function(reviewIdx, text) {
        const inp = document.getElementById(`replyInput_${reviewIdx}`);
        if (inp) {
            inp.value = text;
            inp.focus();
        }
    },

    saveReviewReply: function(reviewIdx) {
        const inp = document.getElementById(`replyInput_${reviewIdx}`);
        const text = inp ? inp.value.trim() : '';
        if (!text) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa cavab mətnini daxil edin');
            return;
        }

        if (!Array.isArray(this.tempMasterReviews) || !this.tempMasterReviews[reviewIdx]) return;

        const now = new Date();
        const dateStr = `${now.getDate()} ${['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'][now.getMonth()]} ${now.getFullYear()}`;

        this.tempMasterReviews[reviewIdx].reply = text;
        this.tempMasterReviews[reviewIdx].replyDate = dateStr;

        if (this.editingMasterId) {
            const list = this.getStaffList();
            const master = list.find(s => s.id === this.editingMasterId);
            if (master) {
                master.reviews = [...this.tempMasterReviews];
                this.saveStaffList(list);
            }
        }

        this.activeReplyReviewIdx = null;
        this.renderMasterReviewsList();
        if (typeof App !== 'undefined') App.showToast('Cavabınız uğurla dərc olundu!');
    },

    removeReviewReply: function(reviewIdx) {
        if (!Array.isArray(this.tempMasterReviews) || !this.tempMasterReviews[reviewIdx]) return;
        this.tempMasterReviews[reviewIdx].reply = '';
        this.tempMasterReviews[reviewIdx].replyDate = '';

        if (this.editingMasterId) {
            const list = this.getStaffList();
            const master = list.find(s => s.id === this.editingMasterId);
            if (master) {
                master.reviews = [...this.tempMasterReviews];
                this.saveStaffList(list);
            }
        }

        this.renderMasterReviewsList();
        if (typeof App !== 'undefined') App.showToast('Cavab silindi');
    },

    deleteMasterReview: function(reviewIdx) {
        if (!Array.isArray(this.tempMasterReviews) || !this.tempMasterReviews[reviewIdx]) return;
        this.tempMasterReviews.splice(reviewIdx, 1);

        if (this.editingMasterId) {
            const list = this.getStaffList();
            const master = list.find(s => s.id === this.editingMasterId);
            if (master) {
                master.reviews = [...this.tempMasterReviews];
                master.reviewsCount = master.reviews.length;
                master.rating = master.reviews.length > 0
                    ? parseFloat((master.reviews.reduce((acc, r) => acc + (parseFloat(r.rating) || 5), 0) / master.reviews.length).toFixed(2))
                    : 5.00;
                this.saveStaffList(list);
            }
        }

        this.renderMasterReviewsList();
        this.renderMasterModalTabs();
        if (typeof App !== 'undefined') App.showToast('Rəy silindi');
    },

    // Master Services Tab in Modal
    masterModalServicesSearch: '',
    filterMasterModalServices: function(query) {
        this.masterModalServicesSearch = (query || '').toLowerCase().trim();
        this.renderMasterModalServicesTab();
    },

    navigateToServicesFromMasterModal: function() {
        this.closeCreateMasterModal();
        this.switchTab('services');
    },

    openServiceFromMasterModal: function(srvId) {
        this.closeCreateMasterModal();
        this.switchTab('services');
        setTimeout(() => {
            if (typeof this.openCreateServiceModal === 'function') {
                this.openCreateServiceModal(srvId);
                if (typeof this.switchServiceModalTab === 'function') {
                    this.switchServiceModalTab('staff');
                }
            }
        }, 150);
    },

    renderMasterModalServicesTab: function() {
        const container = document.getElementById('masterModalServicesListContainer');
        if (!container) return;

        const allServices = this.getServices ? this.getServices() : [];
        const categories = this.getServiceCategories ? this.getServiceCategories() : [];
        const assignedIds = Array.isArray(this.tempMasterServices) ? this.tempMasterServices : [];
        const search = this.masterModalServicesSearch;

        // Strictly show ONLY services assigned to this master
        const assignedServices = allServices.filter(s => assignedIds.includes(s.id));

        if (assignedServices.length === 0) {
            container.innerHTML = `
                <div class="py-8 px-4 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs space-y-3">
                    <div class="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mx-auto shadow-2xs">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    </div>
                    <div class="space-y-1">
                        <p class="font-bold text-slate-800 text-xs">Bu ustaya hələ heç bir xidmət təyin edilməyib</p>
                        <p class="text-[11px] text-slate-400">Xidməti təyin etmək üçün «Xidmətlər» bölməsinə keçərək istənilən xidmətin daxilində bu ustanı heyət siyahısından seçin.</p>
                    </div>
                    <button type="button" onclick="BusinessDashboardView.navigateToServicesFromMasterModal()" class="px-3.5 py-2 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs transition shadow-xs cursor-pointer inline-flex items-center gap-1.5 active:scale-95">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        <span>Xidmətlər bölməsinə keç</span>
                    </button>
                </div>
            `;
            return;
        }

        let filteredServices = assignedServices;
        if (search) {
            filteredServices = assignedServices.filter(s => {
                const sName = (s.name || '').toLowerCase();
                const sDesc = (s.description || '').toLowerCase();
                return sName.includes(search) || sDesc.includes(search);
            });
        }

        if (filteredServices.length === 0) {
            container.innerHTML = `
                <div class="py-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs space-y-1">
                    <p class="font-medium text-slate-700">«${BusinessDashboardView.escapeHtml(search)}» üzrə təyin olunmuş xidmət tapılmadı</p>
                    <p class="text-[11px] text-slate-400">Axtarış sorğusunu dəyişin və ya filtri təmizləyin</p>
                </div>
            `;
            return;
        }

        // Group by category
        let html = '';
        categories.forEach(cat => {
            const catServices = filteredServices.filter(s => s.categoryId === cat.id);
            if (catServices.length === 0) return;

            html += `
                <div class="space-y-2">
                    <div class="text-xs font-semibold text-slate-600 px-1 pt-1 flex items-center justify-between">
                        <div class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            <span>${BusinessDashboardView.escapeHtml(cat.name)}</span>
                        </div>
                        <span class="text-[10px] text-slate-400 font-normal">${catServices.length} xidmət</span>
                    </div>
                    <div class="space-y-1.5">
                        ${catServices.map(srv => {
                            const custom = (this.tempMasterCustomPricing && this.tempMasterCustomPricing[srv.id]) || {};
                            const hasCustomPrice = custom.price !== undefined && custom.price !== '' && parseFloat(custom.price) !== parseFloat(srv.price);
                            const hasCustomDuration = custom.duration !== undefined && custom.duration !== '' && parseInt(custom.duration) !== parseInt(srv.duration);

                            return `
                                <div class="p-3 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 transition shadow-2xs flex items-center justify-between gap-3">
                                    <div class="min-w-0 flex-1">
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold text-xs text-slate-900 truncate">${BusinessDashboardView.escapeHtml(srv.name)}</span>
                                            ${srv.isCombo ? `<span class="px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 font-bold text-[9px]">Kompleks</span>` : ''}
                                        </div>
                                        <div class="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 flex-wrap">
                                            <span>Baza: <b>${srv.price} ₼</b></span>
                                            <span>•</span>
                                            <span>${srv.duration || '30 dəq'}</span>
                                            ${hasCustomPrice ? `<span class="text-amber-700 font-semibold">• Fərdi qiymət: ${custom.price} ₼</span>` : ''}
                                            ${hasCustomDuration ? `<span class="text-amber-700 font-semibold">• Fərdi vaxt: ${custom.duration} dəq</span>` : ''}
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-2 shrink-0">
                                        <span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-bold">
                                            Təyin edilib
                                        </span>
                                        <button type="button" onclick="BusinessDashboardView.openServiceFromMasterModal('${srv.id}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition cursor-pointer flex items-center gap-1 shadow-2xs" title="Xidməti «Xidmətlər» bölməsində redaktə et">
                                            <span>Xidmətə bax</span>
                                            <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });

        // Uncategorized services
        const uncategorized = filteredServices.filter(s => !s.categoryId || !categories.some(c => c.id === s.categoryId));
        if (uncategorized.length > 0) {
            html += `
                <div class="space-y-2 pt-2">
                    <div class="text-xs font-semibold text-slate-600 px-1 flex items-center justify-between">
                        <span>Digər xidmətlər</span>
                        <span class="text-[10px] text-slate-400 font-normal">${uncategorized.length} xidmət</span>
                    </div>
                    <div class="space-y-1.5">
                        ${uncategorized.map(srv => {
                            const custom = (this.tempMasterCustomPricing && this.tempMasterCustomPricing[srv.id]) || {};
                            const hasCustomPrice = custom.price !== undefined && custom.price !== '' && parseFloat(custom.price) !== parseFloat(srv.price);
                            const hasCustomDuration = custom.duration !== undefined && custom.duration !== '' && parseInt(custom.duration) !== parseInt(srv.duration);

                            return `
                                <div class="p-3 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 transition shadow-2xs flex items-center justify-between gap-3">
                                    <div class="min-w-0 flex-1">
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold text-xs text-slate-900 truncate">${BusinessDashboardView.escapeHtml(srv.name)}</span>
                                        </div>
                                        <div class="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 flex-wrap">
                                            <span>Baza: <b>${srv.price} ₼</b></span>
                                            <span>•</span>
                                            <span>${srv.duration || '30 dəq'}</span>
                                            ${hasCustomPrice ? `<span class="text-amber-700 font-semibold">• Fərdi qiymət: ${custom.price} ₼</span>` : ''}
                                            ${hasCustomDuration ? `<span class="text-amber-700 font-semibold">• Fərdi vaxt: ${custom.duration} dəq</span>` : ''}
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-2 shrink-0">
                                        <span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-bold">
                                            Təyin edilib
                                        </span>
                                        <button type="button" onclick="BusinessDashboardView.openServiceFromMasterModal('${srv.id}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition cursor-pointer flex items-center gap-1 shadow-2xs" title="Xidməti «Xidmətlər» bölməsində redaktə et">
                                            <span>Xidmətə bax</span>
                                            <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
    },

    // Master Schedule Tab in Modal
    dayNamesMap: [
        { key: 'mon', name: 'Bazar ertəsi', short: 'B.e' },
        { key: 'tue', name: 'Çərşənbə axşamı', short: 'Ç.a' },
        { key: 'wed', name: 'Çərşənbə', short: 'Çər' },
        { key: 'thu', name: 'Cümə axşamı', short: 'C.a' },
        { key: 'fri', name: 'Cümə', short: 'Cüm' },
        { key: 'sat', name: 'Şənbə', short: 'Şən' },
        { key: 'sun', name: 'Bazar', short: 'Baz' }
    ],

    renderMasterScheduleDaysTab: function() {
        const container = document.getElementById('masterScheduleDaysContainer');
        if (!container) return;

        const schedule = this.tempMasterSchedule?.days || {};

        container.innerHTML = this.dayNamesMap.map(day => {
            const d = schedule[day.key] || { enabled: false, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' };
            const isWorking = !!d.enabled;

            return `
                <div class="p-3 rounded-2xl border transition ${isWorking ? 'bg-white border-slate-200/90 shadow-2xs' : 'bg-slate-50/70 border-slate-200/60 opacity-80'}">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <!-- Day Label & Switch -->
                        <div class="flex items-center gap-3 min-w-[170px]">
                            <label class="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" onchange="BusinessDashboardView.toggleMasterScheduleDay('${day.key}')" ${isWorking ? 'checked' : ''} class="sr-only peer">
                                <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FFDD2D]"></div>
                            </label>
                            <div>
                                <span class="font-bold text-xs ${isWorking ? 'text-slate-900' : 'text-slate-400'}">${day.name}</span>
                                <div class="text-[10px] ${isWorking ? 'text-emerald-600 font-semibold' : 'text-slate-400'}">${isWorking ? 'İş günü' : 'İstirahət'}</div>
                            </div>
                        </div>

                        <!-- Hours Inputs -->
                        ${isWorking ? `
                            <div class="flex items-center gap-3 flex-wrap flex-1 justify-end">
                                <!-- Shift Hours -->
                                <div class="flex items-center gap-1.5">
                                    <span class="text-[10px] text-slate-400 font-medium">Növbə:</span>
                                    <button type="button" onclick="BusinessDashboardView.openZeyvoTimePicker(this, '${day.key}', 'start', '${d.start || '09:00'}')" class="h-8 px-2.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold font-mono text-slate-800 flex items-center gap-1.5 transition outline-none focus:border-slate-900 focus:ring-2 focus:ring-tbank-yellow/40 cursor-pointer shadow-2xs">
                                        <span>${d.start || '09:00'}</span>
                                        <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    </button>
                                    <span class="text-slate-400 text-xs">–</span>
                                    <button type="button" onclick="BusinessDashboardView.openZeyvoTimePicker(this, '${day.key}', 'end', '${d.end || '19:00'}')" class="h-8 px-2.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold font-mono text-slate-800 flex items-center gap-1.5 transition outline-none focus:border-slate-900 focus:ring-2 focus:ring-tbank-yellow/40 cursor-pointer shadow-2xs">
                                        <span>${d.end || '19:00'}</span>
                                        <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    </button>
                                </div>

                                <!-- Break Hours -->
                                <div class="flex items-center gap-1.5 pl-2 border-l border-slate-200">
                                    <span class="text-[10px] text-slate-400 font-medium">Fasilə:</span>
                                    <button type="button" onclick="BusinessDashboardView.openZeyvoTimePicker(this, '${day.key}', 'breakStart', '${d.breakStart || '13:00'}')" class="h-8 px-2.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold font-mono text-slate-800 flex items-center gap-1.5 transition outline-none focus:border-slate-900 focus:ring-2 focus:ring-tbank-yellow/40 cursor-pointer shadow-2xs">
                                        <span>${d.breakStart || '13:00'}</span>
                                        <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    </button>
                                    <span class="text-slate-400 text-xs">–</span>
                                    <button type="button" onclick="BusinessDashboardView.openZeyvoTimePicker(this, '${day.key}', 'breakEnd', '${d.breakEnd || '14:00'}')" class="h-8 px-2.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold font-mono text-slate-800 flex items-center gap-1.5 transition outline-none focus:border-slate-900 focus:ring-2 focus:ring-tbank-yellow/40 cursor-pointer shadow-2xs">
                                        <span>${d.breakEnd || '14:00'}</span>
                                        <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    </button>
                                </div>
                            </div>
                        ` : `
                            <div class="text-[11px] text-slate-400 italic">Qəbul yoxdur</div>
                        `}
                    </div>
                </div>
            `;
        }).join('');
    },

    toggleMasterScheduleDay: function(dayKey) {
        if (!this.tempMasterSchedule) this.tempMasterSchedule = this.getDefaultMasterSchedule();
        if (!this.tempMasterSchedule.days) this.tempMasterSchedule.days = {};
        if (!this.tempMasterSchedule.days[dayKey]) {
            this.tempMasterSchedule.days[dayKey] = { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' };
        } else {
            this.tempMasterSchedule.days[dayKey].enabled = !this.tempMasterSchedule.days[dayKey].enabled;
        }
        this.renderMasterScheduleDaysTab();
    },

    updateMasterScheduleTime: function(dayKey, field, val) {
        if (!this.tempMasterSchedule) this.tempMasterSchedule = this.getDefaultMasterSchedule();
        if (!this.tempMasterSchedule.days) this.tempMasterSchedule.days = {};
        if (!this.tempMasterSchedule.days[dayKey]) {
            this.tempMasterSchedule.days[dayKey] = { enabled: true, start: '09:00', end: '19:00', breakStart: '13:00', breakEnd: '14:00' };
        }
        this.tempMasterSchedule.days[dayKey][field] = val;
    },

    applyMasterSchedulePreset: function(presetType) {
        if (!this.tempMasterSchedule) this.tempMasterSchedule = this.getDefaultMasterSchedule();
        if (!this.tempMasterSchedule.days) this.tempMasterSchedule.days = {};

        if (presetType === '5_2') {
            ['mon', 'tue', 'wed', 'thu', 'fri'].forEach(k => {
                this.tempMasterSchedule.days[k] = { enabled: true, start: '09:00', end: '18:00', breakStart: '13:00', breakEnd: '14:00' };
            });
            ['sat', 'sun'].forEach(k => {
                this.tempMasterSchedule.days[k] = { enabled: false, start: '10:00', end: '18:00' };
            });
            if (typeof App !== 'undefined') App.showToast('5/2 şablonu tətbiq edildi (B.e – Cümə: 09:00 – 18:00)');
        } else if (presetType === '6_1') {
            ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].forEach(k => {
                this.tempMasterSchedule.days[k] = { enabled: true, start: '10:00', end: '19:00', breakStart: '14:00', breakEnd: '15:00' };
            });
            this.tempMasterSchedule.days['sun'] = { enabled: false, start: '10:00', end: '18:00' };
            if (typeof App !== 'undefined') App.showToast('6/1 şablonu tətbiq edildi (B.e – Şənbə: 10:00 – 19:00)');
        } else if (presetType === 'all') {
            ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach(k => {
                this.tempMasterSchedule.days[k] = { enabled: true, start: '10:00', end: '20:00', breakStart: '14:00', breakEnd: '15:00' };
            });
            if (typeof App !== 'undefined') App.showToast('Bütün günlər aktiv edildi (10:00 – 20:00)');
        }

        this.renderMasterScheduleDaysTab();
    },

    // Master Schedule Exceptions State & Methods
    switchMasterScheduleSubTab: function(subTab) {
        const paneBase = document.getElementById('masterSchedulePane_base');
        const paneEx = document.getElementById('masterSchedulePane_exceptions');
        const btnBase = document.getElementById('masterScheduleSubTab_base');
        const btnEx = document.getElementById('masterScheduleSubTab_exceptions');

        if (subTab === 'exceptions') {
            if (paneBase) paneBase.classList.add('hidden');
            if (paneEx) paneEx.classList.remove('hidden');
            if (btnBase) {
                btnBase.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900 transition flex items-center justify-center gap-1.5 cursor-pointer";
            }
            if (btnEx) {
                btnEx.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 bg-white text-slate-900 shadow-xs cursor-pointer";
            }
            this.renderMasterScheduleExceptionsList();
        } else {
            if (paneBase) paneBase.classList.remove('hidden');
            if (paneEx) paneEx.classList.add('hidden');
            if (btnBase) {
                btnBase.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 bg-white text-slate-900 shadow-xs cursor-pointer";
            }
            if (btnEx) {
                btnEx.className = "flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900 transition flex items-center justify-center gap-1.5 cursor-pointer";
            }
            this.renderMasterScheduleDaysTab();
        }
    },

    openAddExceptionDirect: function() {
        this.switchMasterScheduleSubTab('exceptions');
        this.toggleMasterExceptionForm(true);
    },

    setMasterExceptionQuickDate: function(presetKey) {
        const now = new Date();
        if (presetKey === 'tomorrow') {
            now.setDate(now.getDate() + 1);
        } else if (presetKey === 'next_friday') {
            const currentDay = now.getDay(); // 0 = Sun, 5 = Fri
            let diff = (5 + 7 - currentDay) % 7;
            if (diff === 0) diff = 7;
            now.setDate(now.getDate() + diff);
        } else if (presetKey === 'next_saturday') {
            const currentDay = now.getDay(); // 6 = Sat
            let diff = (6 + 7 - currentDay) % 7;
            if (diff === 0) diff = 7;
            now.setDate(now.getDate() + diff);
        }
        const iso = now.toISOString().split('T')[0];
        this.selectCustomDate('masterExceptionDate', iso);
    },

    setMasterExceptionMode: function(mode) {
        const typeHidden = document.getElementById('masterExceptionType');
        if (typeHidden) typeHidden.value = mode;

        const btnOff = document.getElementById('exceptionModeBtn_off');
        const btnCustom = document.getElementById('exceptionModeBtn_custom');
        const dotOff = document.getElementById('exceptionDot_off');
        const dotCustom = document.getElementById('exceptionDot_custom');
        const hoursBox = document.getElementById('masterExceptionCustomHoursContainer');

        if (mode === 'custom') {
            if (btnOff) btnOff.className = "p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2.5 cursor-pointer transition select-none";
            if (btnCustom) btnCustom.className = "p-2.5 rounded-xl border-2 border-slate-900 bg-white flex items-center gap-2.5 cursor-pointer transition select-none shadow-2xs";
            if (dotOff) dotOff.className = "w-1.5 h-1.5 rounded-full bg-transparent";
            if (dotCustom) dotCustom.className = "w-1.5 h-1.5 rounded-full bg-slate-900";
            if (hoursBox) hoursBox.classList.remove('hidden');
        } else {
            if (btnOff) btnOff.className = "p-2.5 rounded-xl border-2 border-slate-900 bg-white flex items-center gap-2.5 cursor-pointer transition select-none shadow-2xs";
            if (btnCustom) btnCustom.className = "p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2.5 cursor-pointer transition select-none";
            if (dotOff) dotOff.className = "w-1.5 h-1.5 rounded-full bg-slate-900";
            if (dotCustom) dotCustom.className = "w-1.5 h-1.5 rounded-full bg-transparent";
            if (hoursBox) hoursBox.classList.add('hidden');
        }
    },

    toggleMasterExceptionForm: function(show = null) {
        const box = document.getElementById('masterExceptionFormBox');
        if (!box) return;
        const isHidden = box.classList.contains('hidden');
        const shouldShow = show !== null ? show : isHidden;

        if (shouldShow) {
            box.classList.remove('hidden');
            const dateInput = document.getElementById('masterExceptionDate');
            let initialIso = '';
            if (dateInput && dateInput.value) {
                initialIso = dateInput.value;
            } else {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                initialIso = tomorrow.toISOString().split('T')[0];
            }
            this.initCustomDatePicker('masterExceptionDate', initialIso);
            this.setMasterExceptionMode('off');
            const noteInput = document.getElementById('masterExceptionNote');
            if (noteInput) noteInput.value = '';
        } else {
            box.classList.add('hidden');
            this.closeAllCustomDatePickers();
        }
    },

    onMasterExceptionTypeChange: function(val) {
        this.setMasterExceptionMode(val);
    },

    saveMasterException: function() {
        const dateInput = document.getElementById('masterExceptionDate');
        const typeHidden = document.getElementById('masterExceptionType');
        const startInput = document.getElementById('masterExceptionStart');
        const endInput = document.getElementById('masterExceptionEnd');
        const noteInput = document.getElementById('masterExceptionNote');

        const dateVal = dateInput ? dateInput.value : '';
        if (!dateVal) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa tarix seçin');
            return;
        }

        const type = typeHidden ? typeHidden.value : 'off';
        const start = startInput ? startInput.value : '10:00';
        const end = endInput ? endInput.value : '15:00';
        const note = noteInput ? noteInput.value.trim() : '';

        if (!Array.isArray(this.tempMasterScheduleExceptions)) {
            this.tempMasterScheduleExceptions = [];
        }

        const existingIdx = this.tempMasterScheduleExceptions.findIndex(e => e.date === dateVal);
        const item = {
            id: existingIdx >= 0 ? this.tempMasterScheduleExceptions[existingIdx].id : ('ex_' + Date.now()),
            date: dateVal,
            type: type,
            start: type === 'custom' ? start : '',
            end: type === 'custom' ? end : '',
            note: note
        };

        if (existingIdx >= 0) {
            this.tempMasterScheduleExceptions[existingIdx] = item;
        } else {
            this.tempMasterScheduleExceptions.push(item);
        }

        this.tempMasterScheduleExceptions.sort((a, b) => a.date.localeCompare(b.date));

        this.toggleMasterExceptionForm(false);
        this.renderMasterScheduleExceptionsList();

        if (typeof App !== 'undefined') {
            App.showToast(type === 'off' ? `${dateVal} üçün istirahət günü qeyd edildi` : `${dateVal} üçün ${start} – ${end} iş saatları qeyd edildi`);
        }
    },

    deleteMasterException: function(id) {
        if (!Array.isArray(this.tempMasterScheduleExceptions)) return;
        this.tempMasterScheduleExceptions = this.tempMasterScheduleExceptions.filter(e => e.id !== id);
        this.renderMasterScheduleExceptionsList();
        if (typeof App !== 'undefined') {
            App.showToast('Tarix istisnası silindi');
        }
    },

    renderMasterScheduleExceptionsList: function() {
        const container = document.getElementById('masterScheduleExceptionsList');
        const badge = document.getElementById('masterScheduleExceptionsCountBadge');
        const list = Array.isArray(this.tempMasterScheduleExceptions) ? this.tempMasterScheduleExceptions : [];

        if (badge) {
            if (list.length > 0) {
                badge.textContent = String(list.length);
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }

        const formatExceptionDate = (isoStr) => {
            if (!isoStr) return '';
            try {
                const parts = isoStr.split('-');
                const y = parseInt(parts[0]);
                const m = parseInt(parts[1]) - 1;
                const d = parseInt(parts[2]);
                const dt = new Date(y, m, d);
                const monthNames = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
                const dayNames = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];
                return `${d} ${monthNames[m]} ${y}, ${dayNames[dt.getDay()]}`;
            } catch (e) {
                return isoStr;
            }
        };

        // Also update notice box on the weekly base schedule
        const noticeBox = document.getElementById('masterActiveExceptionsNoticeBox');
        const noticeList = document.getElementById('masterActiveExceptionsNoticeList');
        if (noticeBox && noticeList) {
            if (list.length > 0) {
                noticeBox.classList.remove('hidden');
                noticeList.innerHTML = list.map(item => {
                    const isOff = item.type === 'off';
                    return `
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold ${isOff ? 'bg-white text-rose-800 border border-rose-200' : 'bg-white text-amber-900 border border-amber-200'}">
                            <span>${formatExceptionDate(item.date)}:</span>
                            <strong class="font-bold">${isOff ? 'İstirahət günü (İşləmir)' : `${item.start} – ${item.end}`}</strong>
                        </span>
                    `;
                }).join('');
            } else {
                noticeBox.classList.add('hidden');
            }
        }

        if (!container) return;

        if (list.length === 0) {
            container.innerHTML = `
                <div class="text-center py-7 px-4 bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                    <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2 text-slate-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
                    </div>
                    <div class="text-xs font-bold text-slate-700">Heç bir xüsusi tarix təyin edilməyib</div>
                    <div class="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">Əgər ustanın konkret tarixdə istirahət günü və ya qısaldılmış iş saatları olacaqsa, yuxarıdakı «+ Tarix əlavə et» düyməsi ilə qeyd edin.</div>
                </div>
            `;
            return;
        }

        container.innerHTML = list.map(item => {
            const isOff = item.type === 'off';
            return `
                <div class="p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${isOff ? 'bg-rose-50/40 border-rose-200/70' : 'bg-amber-50/40 border-amber-200/70'}">
                    <div class="flex items-start gap-3 min-w-0">
                        <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isOff ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'}">
                            ${isOff ? `
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                            ` : `
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            `}
                        </div>
                        <div class="min-w-0">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="font-bold text-xs text-slate-900">${formatExceptionDate(item.date)}</span>
                                ${isOff ? `
                                    <span class="px-2 py-0.5 rounded-md bg-rose-100/80 text-rose-800 text-[10px] font-bold">İstirahət günü (İşləmir)</span>
                                ` : `
                                    <span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">İş saatları: ${item.start} – ${item.end}</span>
                                `}
                            </div>
                            ${item.note ? `<div class="text-[11px] text-slate-500 mt-1">${this.escapeHtml(item.note)}</div>` : ''}
                        </div>
                    </div>

                    <button type="button" onclick="BusinessDashboardView.deleteMasterException('${item.id}')" class="p-1.5 text-slate-400 hover:text-rose-600 transition shrink-0 cursor-pointer rounded-lg hover:bg-white" title="İstisnanı sil">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                </div>
            `;
        }).join('');
    },

    // Custom Zeyvo Time Picker (Two-Column Hours & Minutes in Brand Style)
    ztpCurrentDayKey: null,
    ztpCurrentField: null,
    ztpCurrentHour: '09',
    ztpCurrentMinute: '00',
    ztpTriggerEl: null,
    ztpListenerBound: false,

    openZeyvoTimePicker: function(triggerEl, dayKey, field, currentVal) {
        this.ztpTriggerEl = triggerEl;
        this.ztpCurrentDayKey = dayKey;
        this.ztpCurrentField = field;

        if (!field && triggerEl && triggerEl.tagName === 'INPUT') {
            this.ztpCurrentField = 'input';
            currentVal = currentVal || triggerEl.value;
        }

        const val = currentVal || '09:00';
        const parts = val.split(':');
        this.ztpCurrentHour = (parts[0] || '09').padStart(2, '0');
        this.ztpCurrentMinute = (parts[1] || '00').padStart(2, '0');

        let popover = document.getElementById('zeyvoTimePickerPopover');
        if (!popover) {
            popover = document.createElement('div');
            popover.id = 'zeyvoTimePickerPopover';
            document.body.appendChild(popover);
        }

        if (!this.ztpListenerBound) {
            this.ztpListenerBound = true;
            document.addEventListener('click', (e) => {
                const pop = document.getElementById('zeyvoTimePickerPopover');
                if (!pop || pop.classList.contains('hidden')) return;
                if (!pop.contains(e.target) && !this.ztpTriggerEl?.contains(e.target)) {
                    this.closeZeyvoTimePicker();
                }
            });
        }

        this.renderZeyvoTimePickerContent();

        // Calculate position relative to trigger button
        const rect = triggerEl.getBoundingClientRect();
        popover.className = "fixed z-[100] w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 select-none text-xs";
        
        let top = rect.bottom + 6;
        if (top + 320 > window.innerHeight) {
            top = Math.max(10, rect.top - 326);
        }
        let left = rect.left;
        if (left + 260 > window.innerWidth) {
            left = Math.max(10, window.innerWidth - 270);
        }

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
        popover.classList.remove('hidden');

        // Scroll active hour and minute into view smoothly
        setTimeout(() => {
            const activeHourEl = document.getElementById(`ztpHourBtn_${this.ztpCurrentHour}`);
            const activeMinEl = document.getElementById(`ztpMinBtn_${this.ztpCurrentMinute}`);
            if (activeHourEl) activeHourEl.scrollIntoView({ block: 'nearest' });
            if (activeMinEl) activeMinEl.scrollIntoView({ block: 'nearest' });
        }, 40);
    },

    closeZeyvoTimePicker: function() {
        const popover = document.getElementById('zeyvoTimePickerPopover');
        if (popover) popover.classList.add('hidden');
    },

    selectZeyvoTimeHour: function(hourStr) {
        this.ztpCurrentHour = hourStr;
        this.applyZeyvoTimeSelection();
        this.renderZeyvoTimePickerContent();
    },

    selectZeyvoTimeMinute: function(minStr) {
        this.ztpCurrentMinute = minStr;
        this.applyZeyvoTimeSelection();
        this.renderZeyvoTimePickerContent();
    },

    applyZeyvoTimePreset: function(val) {
        const parts = val.split(':');
        this.ztpCurrentHour = parts[0];
        this.ztpCurrentMinute = parts[1];
        this.applyZeyvoTimeSelection();
        this.renderZeyvoTimePickerContent();
    },

    applyZeyvoTimeSelection: function() {
        const newTime = `${this.ztpCurrentHour}:${this.ztpCurrentMinute}`;
        if (this.ztpCurrentField === 'input' && this.ztpCurrentDayKey) {
            const input = document.getElementById(this.ztpCurrentDayKey);
            if (input) input.value = newTime;
            if (this.ztpTriggerEl) {
                if (this.ztpTriggerEl.tagName === 'INPUT') {
                    this.ztpTriggerEl.value = newTime;
                }
                const label = this.ztpTriggerEl.querySelector('span');
                if (label) label.textContent = newTime;
                this.ztpTriggerEl.setAttribute('onclick', `BusinessDashboardView.openZeyvoTimePicker(this, '${this.ztpCurrentDayKey}', 'input', '${newTime}')`);
            }
        } else if (this.ztpCurrentDayKey && this.ztpCurrentField) {
            this.updateMasterScheduleTime(this.ztpCurrentDayKey, this.ztpCurrentField, newTime);
            if (this.ztpTriggerEl) {
                const label = this.ztpTriggerEl.querySelector('span');
                if (label) label.textContent = newTime;
                this.ztpTriggerEl.setAttribute('onclick', `BusinessDashboardView.openZeyvoTimePicker(this, '${this.ztpCurrentDayKey}', '${this.ztpCurrentField}', '${newTime}')`);
            }
        }
    },

    renderZeyvoTimePickerContent: function() {
        const popover = document.getElementById('zeyvoTimePickerPopover');
        if (!popover) return;

        const curH = this.ztpCurrentHour;
        const curM = this.ztpCurrentMinute;
        const curTime = `${curH}:${curM}`;

        const hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push(String(i).padStart(2, '0'));
        }

        const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
        if (!minutes.includes(curM)) {
            minutes.push(curM);
            minutes.sort();
        }

        popover.innerHTML = `
            <div class="space-y-2.5">
                <!-- Header with Brand Accent -->
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-[#FFDD2D] ring-2 ring-amber-300"></span>
                        <span class="font-bold text-slate-800 text-[11px]">Vaxt seçimi</span>
                    </div>
                    <div class="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900 text-white font-mono font-black text-sm tracking-wide shadow-xs">
                        <span class="text-[#FFDD2D]">${curH}</span>
                        <span class="text-slate-400">:</span>
                        <span class="text-white">${curM}</span>
                    </div>
                </div>

                <!-- Quick Presets -->
                <div class="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 text-[10px]">
                    <span class="text-slate-400 font-bold shrink-0">Tez seçim:</span>
                    ${['09:00', '10:00', '13:00', '14:00', '18:00', '19:00', '20:00'].map(p => `
                        <button type="button" onclick="BusinessDashboardView.applyZeyvoTimePreset('${p}')" class="px-1.5 py-0.5 rounded-md font-bold transition shrink-0 cursor-pointer ${p === curTime ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                            ${p}
                        </button>
                    `).join('')}
                </div>

                <!-- Two-Column Picker: Hours & Minutes in Zeyvo Style -->
                <div class="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <!-- Hours Column -->
                    <div class="space-y-1">
                        <div class="text-[11px] font-semibold text-slate-500 text-center pb-0.5">Saat</div>
                        <div class="h-44 overflow-y-auto pr-1 space-y-1 no-scrollbar" id="ztpHoursScrollContainer">
                            ${hours.map(h => {
                                const isSel = h === curH;
                                return `
                                    <button type="button" id="ztpHourBtn_${h}" onclick="BusinessDashboardView.selectZeyvoTimeHour('${h}')" class="w-full py-1.5 px-2 rounded-xl text-center text-xs font-mono font-bold transition cursor-pointer ${isSel ? 'bg-[#FFDD2D] text-[#101114] shadow-xs ring-1 ring-amber-400 scale-[1.02]' : 'text-slate-700 hover:bg-white hover:shadow-2xs'}">
                                        ${h}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Minutes Column -->
                    <div class="space-y-1 border-l border-slate-200/80 pl-2">
                        <div class="text-[11px] font-semibold text-slate-500 text-center pb-0.5">Dəqiqə</div>
                        <div class="h-44 overflow-y-auto pr-1 space-y-1 no-scrollbar" id="ztpMinutesScrollContainer">
                            ${minutes.map(m => {
                                const isSel = m === curM;
                                return `
                                    <button type="button" id="ztpMinBtn_${m}" onclick="BusinessDashboardView.selectZeyvoTimeMinute('${m}')" class="w-full py-1.5 px-2 rounded-xl text-center text-xs font-mono font-bold transition cursor-pointer ${isSel ? 'bg-[#FFDD2D] text-[#101114] shadow-xs ring-1 ring-amber-400 scale-[1.02]' : 'text-slate-700 hover:bg-white hover:shadow-2xs'}">
                                        ${m}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>

                <!-- Footer button -->
                <div class="flex items-center justify-between pt-1">
                    <button type="button" onclick="BusinessDashboardView.closeZeyvoTimePicker()" class="text-slate-400 hover:text-slate-700 font-semibold text-[11px] cursor-pointer">Bağla</button>
                    <button type="button" onclick="BusinessDashboardView.closeZeyvoTimePicker()" class="h-7 px-3 rounded-xl bg-slate-900 hover:bg-black text-[#FFDD2D] font-bold text-xs shadow-xs transition cursor-pointer flex items-center gap-1 active:scale-95">
                        <span>Tamam</span>
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    </button>
                </div>
            </div>
        `;
    },

    // Master Profile & Identity Helpers
    masterSelectedGender: 'male',

    selectMasterGender: function(gender) {
        this.masterSelectedGender = gender;
        const hiddenInput = document.getElementById('masterFormGender');
        if (hiddenInput) hiddenInput.value = gender;

        const btnFemale = document.getElementById('masterGenderBtnFemale');
        const btnMale = document.getElementById('masterGenderBtnMale');
        const badge = document.getElementById('masterCardGenderBadge');

        if (btnFemale && btnMale) {
            if (gender === 'female') {
                btnFemale.className = "h-10 px-3 rounded-xl border-2 border-pink-500 bg-pink-50 text-pink-700 font-black text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer";
                btnMale.className = "h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100 cursor-pointer";
            } else {
                btnFemale.className = "h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100 cursor-pointer";
                btnMale.className = "h-10 px-3 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer";
            }
        }

        if (badge) {
            if (gender === 'female') {
                badge.textContent = 'Qadın';
                badge.className = "text-[10px] font-black px-1.5 py-0.2 rounded bg-pink-500/80 text-white shrink-0";
            } else {
                badge.textContent = 'Kişi';
                badge.className = "text-[10px] font-black px-1.5 py-0.2 rounded bg-blue-500/80 text-white shrink-0";
            }
        }
    },

    updateMasterAvatarUI: function(avatarUrl, masterName) {
        const input = document.getElementById('masterFormAvatar');
        const preview = document.getElementById('masterFormAvatarPreview');
        const fallback = document.getElementById('masterFormAvatarFallback');
        const deleteBtn = document.getElementById('masterFormDeleteAvatarBtn');
        const name = masterName || (document.getElementById('masterFormName')?.value) || 'Usta';
        const initials = (name.trim() || 'UA').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

        if (input) input.value = avatarUrl || '';

        if (avatarUrl) {
            if (preview) {
                preview.src = avatarUrl;
                preview.classList.remove('hidden');
            }
            if (fallback) fallback.classList.add('hidden');
            if (deleteBtn) deleteBtn.classList.remove('hidden');
        } else {
            if (preview) {
                preview.src = '';
                preview.classList.add('hidden');
            }
            if (fallback) {
                fallback.textContent = initials || 'UA';
                fallback.classList.remove('hidden');
            }
            if (deleteBtn) deleteBtn.classList.add('hidden');
        }
    },

    removeMasterAvatar: function() {
        this.updateMasterAvatarUI('');
        const fileInput = document.getElementById('masterAvatarFileInput');
        if (fileInput) fileInput.value = '';
        if (typeof App !== 'undefined') {
            App.showToast("Usta fotosu silindi");
        }
    },

    handleMasterAvatarFileUpload: function(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa şəkil faylı seçin (PNG, JPG, WebP).");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            if (typeof App !== 'undefined') App.showToast("Şəkil faylı 5MB-dan böyük ola bilməz.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Img = e.target.result;
            this.updateMasterAvatarUI(base64Img);

            if (typeof App !== 'undefined') {
                App.showToast("Usta fotosu uğurla seçildi!");
            }
        };
        reader.readAsDataURL(file);
    },

    onMasterNameInput: function(val) {
        const displayName = document.getElementById('masterCardDisplayName');
        if (displayName) displayName.textContent = (val && val.trim()) ? val.trim() : 'Usta adı';
        const fallback = document.getElementById('masterFormAvatarFallback');
        const input = document.getElementById('masterFormAvatar');
        if (fallback && (!input || !input.value)) {
            const initials = ((val && val.trim()) ? val.trim() : 'UA').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            fallback.textContent = initials || 'UA';
        }
    },

    getRoleIconSvg: function(iconKey, extraClass = 'w-4 h-4') {
        const key = (iconKey || 'briefcase').toString().toLowerCase().trim();
        if (key === 'scissors' || key === 'stylist' || key === 'hair' || key === '\u2702' || key === '\u2702\uFE0F' || key === '✂️') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`;
        }
        if (key === 'barber' || key === 'beard' || key === '💈' || key === '🧔') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 3h10v18H7z"/><path d="m7 7 10 5M7 12l10 5M7 17l10 5"/><rect x="5" y="2" width="14" height="20" rx="2"/></svg>`;
        }
        if (key === 'nail' || key === 'manicure' || key === 'pedicure' || key === '💅') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;
        }
        if (key === 'colorist' || key === 'palette' || key === '🎨') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z"/></svg>`;
        }
        if (key === 'cosmetologist' || key === 'spa' || key === 'cosmetics' || key === '✨' || key === '💆') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/><path d="M18 11c1.5 0 3 .5 3 2s-1.5 2-3 2"/><path d="M6 11C4.5 11 3 11.5 3 13s1.5 2 3 2"/></svg>`;
        }
        if (key === 'brow_lash' || key === 'eye' || key === 'lash' || key === 'brow' || key === '👁️' || key === '👁') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
        }
        if (key === 'massage' || key === 'therapy' || key === 'therapist') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
        }
        if (key === 'makeup' || key === 'lipstick' || key === '💄') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m14 10 7-7"/><path d="m10 14-7 7"/><circle cx="17.5" cy="6.5" r="2.5"/><path d="m3 21 3-3 5 5-3 3z"/></svg>`;
        }
        if (key === 'star' || key === 'vip' || key === 'senior' || key === '⭐') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
        }
        if (key === 'user' || key === 'specialist' || key === '👤') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
        }
        if (key === 'shield' || key === 'manager' || key === 'admin' || key === '🛡️' || key === '🛡') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
        }
        if (key === 'crown' || key === 'owner' || key === '👑') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`;
        }
        // Default briefcase
        return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
    },

    defaultMasterRoles: [
        { id: 'role_top_stylist', name: 'Top Stilist', icon: 'scissors', description: 'Yüksək təcrübəli baş saç ustası', defaultCommission: 40, isDefault: true },
        { id: 'role_stylist', name: 'Stilist', icon: 'scissors', description: 'Saç kəsimi və forma ustası', defaultCommission: 40, isDefault: true },
        { id: 'role_master_barber', name: 'Master Barber', icon: 'barber', description: 'Kişi salonu üzrə baş bərbər', defaultCommission: 45, isDefault: true },
        { id: 'role_barber', name: 'Barber', icon: 'barber', description: 'Kişi saç və saqqal ustası', defaultCommission: 40, isDefault: true },
        { id: 'role_nail_master', name: 'Nail Master', icon: 'nail', description: 'Manikür və pedikür mütəxəssisi', defaultCommission: 50, isDefault: true },
        { id: 'role_colorist', name: 'Kolorist', icon: 'colorist', description: 'Saç boyama və rəng mütəxəssisi', defaultCommission: 40, isDefault: true },
        { id: 'role_cosmetologist', name: 'Kosmetoloq', icon: 'cosmetologist', description: 'Dəri və estetika mütəxəssisi', defaultCommission: 45, isDefault: true },
        { id: 'role_brow_lash', name: 'Qaş & Kirpik Ustası', icon: 'brow_lash', description: 'Laminasiya, arxitektura və vizaj', defaultCommission: 40, isDefault: true },
        { id: 'role_massage', name: 'Masajist / Terapevt', icon: 'massage', description: 'Bədən qulluğu və masaj mütəxəssisi', defaultCommission: 40, isDefault: true },
        { id: 'role_makeup', name: 'Vizajist', icon: 'makeup', description: 'Makiyaj və qrim ustası', defaultCommission: 40, isDefault: true }
    ],

    getMasterRoles: function() {
        const emojiMap = {
            '✂️': 'scissors', '💇': 'scissors', '💈': 'barber', '🧔': 'barber',
            '💅': 'nail', '🎨': 'colorist', '✨': 'cosmetologist', '👁️': 'brow_lash',
            '💆': 'massage', '💄': 'makeup', '💼': 'briefcase', '⭐': 'star', '👤': 'user'
        };
        try {
            const raw = localStorage.getItem(this.storageKey('zeyvo_business_roles'));
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed.map(r => ({
                        ...r,
                        icon: emojiMap[r.icon] || r.icon || 'briefcase'
                    }));
                }
            }
        } catch (e) {
            console.error('Error loading master roles:', e);
        }
        return JSON.parse(JSON.stringify(this.defaultMasterRoles));
    },

    saveMasterRoles: function(roles) {
        try {
            localStorage.setItem(this.storageKey('zeyvo_business_roles'), JSON.stringify(roles));
        } catch (e) {
            console.error('Error saving master roles:', e);
        }
    },

    openMasterRolesModal: function() {
        this.switchStaffTab('roles');
    },

    closeMasterRolesModal: function() {
        this.closeCreateMasterRoleModal();
    },

    openCreateMasterRoleModal: function(editRoleId) {
        const modal = document.getElementById('bizMasterRoleEditModal');
        if (!modal) return;

        const editIdInput = document.getElementById('masterRoleFormEditId');
        const titleEl = document.getElementById('masterRoleModalTitle');
        const submitBtn = document.getElementById('masterRoleModalSubmitBtn');
        const nameInput = document.getElementById('masterRoleFormName');
        const iconInput = document.getElementById('masterRoleFormIcon');
        const commInput = document.getElementById('masterRoleFormCommission');
        const descInput = document.getElementById('masterRoleFormDesc');

        if (editRoleId) {
            const roles = this.getMasterRoles();
            const role = roles.find(r => r.id === editRoleId);
            if (role) {
                if (editIdInput) editIdInput.value = role.id;
                if (titleEl) titleEl.textContent = 'Vəzifəni redaktə et';
                if (submitBtn) submitBtn.textContent = 'Dəyişiklikləri saxla';
                if (nameInput) nameInput.value = role.name || '';
                const roleIcon = role.icon || 'briefcase';
                if (iconInput) iconInput.value = roleIcon;
                if (commInput) commInput.value = role.defaultCommission !== undefined ? role.defaultCommission : 40;
                if (descInput) descInput.value = role.description || '';
            }
        } else {
            if (editIdInput) editIdInput.value = '';
            if (titleEl) titleEl.textContent = 'Yeni vəzifə yarat';
            if (submitBtn) submitBtn.textContent = 'Vəzifəni saxla';
            if (nameInput) nameInput.value = '';
            if (iconInput) iconInput.value = 'briefcase';
            if (commInput) commInput.value = 40;
            if (descInput) descInput.value = '';
        }

        modal.classList.remove('hidden');
    },

    closeCreateMasterRoleModal: function() {
        const modal = document.getElementById('bizMasterRoleEditModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveMasterRole: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const editIdInput = document.getElementById('masterRoleFormEditId');
        const nameInput = document.getElementById('masterRoleFormName');
        const iconInput = document.getElementById('masterRoleFormIcon');
        const commInput = document.getElementById('masterRoleFormCommission');
        const descInput = document.getElementById('masterRoleFormDesc');

        const editId = (editIdInput ? editIdInput.value : '').trim();
        const name = (nameInput ? nameInput.value : '').trim();
        if (!name) {
            if (typeof App !== 'undefined') App.showToast('Vəzifə adını qeyd edin');
            return;
        }

        const roles = this.getMasterRoles();

        if (editId) {
            const roleIdx = roles.findIndex(r => r.id === editId);
            if (roleIdx === -1) return;
            const oldName = roles[roleIdx].name;

            if (name.toLowerCase() !== oldName.toLowerCase() && roles.some(r => r.id !== editId && r.name.toLowerCase() === name.toLowerCase())) {
                if (typeof App !== 'undefined') App.showToast(`«${name}» adlı başqa vəzifə artıq mövcuddur`);
                return;
            }

            roles[roleIdx].name = name;
            roles[roleIdx].icon = iconInput ? iconInput.value : 'briefcase';
            roles[roleIdx].defaultCommission = commInput ? (parseInt(commInput.value, 10) || 40) : 40;
            roles[roleIdx].description = (descInput ? descInput.value : '').trim();

            this.saveMasterRoles(roles);

            if (name !== oldName) {
                const staffList = this.getStaffList();
                let updatedCount = 0;
                staffList.forEach(s => {
                    if ((s.role || '').trim().toLowerCase() === oldName.trim().toLowerCase()) {
                        s.role = name;
                        updatedCount++;
                    }
                });
                if (updatedCount > 0) {
                    this.saveStaffList(staffList);
                }
            }

            if (typeof App !== 'undefined') App.showToast(`«${name}» vəzifəsi uğurla yeniləndi!`);
        } else {
            if (roles.some(r => r.name.toLowerCase() === name.toLowerCase())) {
                if (typeof App !== 'undefined') App.showToast(`«${name}» vəzifəsi artıq mövcuddur`);
                return;
            }

            const newRole = {
                id: 'role_' + Date.now(),
                name: name,
                icon: iconInput ? iconInput.value : 'briefcase',
                description: (descInput ? descInput.value : '').trim(),
                defaultCommission: commInput ? (parseInt(commInput.value, 10) || 40) : 40,
                isDefault: false
            };

            roles.push(newRole);
            this.saveMasterRoles(roles);
            if (typeof App !== 'undefined') App.showToast(`«${name}» vəzifəsi əlavə edildi!`);
        }

        this.closeCreateMasterRoleModal();
        this.refreshStaffTabContent();
        const roleSelect = document.getElementById('masterFormRole');
        if (roleSelect) {
            this.populateMasterRoleSelect(name);
        }
    },

    deleteMasterRole: function(roleId) {
        const roles = this.getMasterRoles();
        const role = roles.find(r => r.id === roleId);
        if (!role) return;

        const staffList = this.getStaffList();
        const count = staffList.filter(s => (s.role || '').trim().toLowerCase() === (role.name || '').trim().toLowerCase()).length;

        const message = count > 0
            ? `«<strong>${this.escapeHtml(role.name)}</strong>» vəzifəsi hal-hazırda <strong>${count} ustaya</strong> təyin olunub.<br><br>Bu vəzifəni silmək istədiyinizə əminsiniz?`
            : `«<strong>${this.escapeHtml(role.name)}</strong>» vəzifəsini silmək istədiyinizə əminsiniz?`;

        this.openDeleteConfirmModal({
            title: 'Vəzifəni sil',
            message: message,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const filtered = roles.filter(r => r.id !== roleId);
                this.saveMasterRoles(filtered);
                if (typeof App !== 'undefined') App.showToast(`«${role.name}» vəzifəsi silindi`);
                this.refreshStaffTabContent();
                const curVal = document.getElementById('masterFormRole')?.value;
                this.populateMasterRoleSelect(curVal === role.name ? '' : curVal);
            }
        });
    },

    populateMasterRoleSelect: function(selectedRole) {
        const select = document.getElementById('masterFormRole');
        if (!select) return;

        const roles = this.getMasterRoles();
        const defaults = roles.filter(r => r.isDefault);
        const customs = roles.filter(r => !r.isDefault);

        let html = `<option value="" disabled ${!selectedRole ? 'selected' : ''}>Vəzifə seçin...</option>`;

        if (defaults.length > 0) {
            html += `<optgroup label="Standart Şablonlar">`;
            defaults.forEach(r => {
                const isSel = selectedRole === r.name;
                html += `<option value="${this.escapeHtml(r.name)}" ${isSel ? 'selected' : ''}>${this.escapeHtml(r.name)} (${r.defaultCommission || 40}%)</option>`;
            });
            html += `</optgroup>`;
        }

        if (customs.length > 0) {
            html += `<optgroup label="Fərdi Vəzifələr">`;
            customs.forEach(r => {
                const isSel = selectedRole === r.name;
                html += `<option value="${this.escapeHtml(r.name)}" ${isSel ? 'selected' : ''}>${this.escapeHtml(r.name)} (${r.defaultCommission || 40}%)</option>`;
            });
            html += `</optgroup>`;
        }

        // If existing master has a custom legacy role not found in roles list
        if (selectedRole && !roles.some(r => r.name === selectedRole)) {
            html += `<optgroup label="Cari Vəzifə">`;
            html += `<option value="${this.escapeHtml(selectedRole)}" selected>${this.escapeHtml(selectedRole)}</option>`;
            html += `</optgroup>`;
        }

        html += `<option value="__create_new__" class="font-bold text-amber-600">+ Yeni vəzifə əlavə et...</option>`;

        select.innerHTML = html;
        if (selectedRole) {
            select.value = selectedRole;
            this.onMasterRoleSelect(selectedRole);
        }
    },

    onMasterRoleSelect: function(val) {
        if (val === '__create_new__') {
            this.openMasterRolesModal();
            return;
        }
        const displayRole = document.getElementById('masterCardDisplayRole');
        if (displayRole) displayRole.textContent = (val && val.trim()) ? val.trim() : 'Top Stilist';

        // Auto-suggest standard commission if user hasn't set one yet or is creating a new master
        const editIdInput = document.getElementById('masterFormEditId');
        if (!editIdInput || !editIdInput.value) {
            const roleObj = this.getMasterRoles().find(r => r.name === val);
            const srvCommissionInput = document.getElementById('masterFormServiceCommission');
            if (roleObj && roleObj.defaultCommission !== undefined && srvCommissionInput) {
                srvCommissionInput.value = roleObj.defaultCommission;
            }
        }
    },

    onMasterRoleInput: function(val) {
        this.onMasterRoleSelect(val);
    },

    onMasterRentalTypeChange: function(val) {
        const label = document.getElementById('masterFormRentalAmountLabel');
        const unit = document.getElementById('masterFormRentalUnitText');
        if (val === 'daily') {
            if (label) label.textContent = 'Günlük icarə haqqı (₼)';
            if (unit) unit.textContent = '₼ / gün';
        } else {
            if (label) label.textContent = 'Aylıq icarə haqqı (₼)';
            if (unit) unit.textContent = '₼ / ay';
        }
    },

    onMasterSalarySchemeChange: function(type) {
        const commContainer = document.getElementById('masterSalaryCommissionFields');
        const fixedContainer = document.getElementById('masterSalaryFixedField');
        const rentalContainer = document.getElementById('masterSalaryRentalFields');
        const hintTextEl = document.getElementById('masterSalarySchemeHintText');

        const scheme = type || 'commission';

        if (scheme === 'fixed') {
            // Yalnız sabit aylıq əməkhaqqı
            if (commContainer) commContainer.classList.add('hidden');
            if (fixedContainer) fixedContainer.classList.remove('hidden');
            if (rentalContainer) rentalContainer.classList.add('hidden');
            if (hintTextEl) {
                hintTextEl.innerHTML = '<strong>Yalnız sabit əməkhaqqı:</strong> Usta göstərdiyi xidmətlərin və ya satışların həcmindən asılı olmayaraq hər ay yalnız göstərilən məbləğdə sabit maaş alır. Xidmət və məhsul satışından əlavə faiz hesablanmır.';
            }
        } else if (scheme === 'commission') {
            // Xalis faiz
            if (commContainer) commContainer.classList.remove('hidden');
            if (fixedContainer) fixedContainer.classList.add('hidden');
            if (rentalContainer) rentalContainer.classList.add('hidden');
            if (hintTextEl) {
                hintTextEl.innerHTML = '<strong>Xalis faiz:</strong> Ustanın qazancı yalnız faktiki yerinə yetirdiyi xidmətlərin və satdığı məhsulların faizi əsasında hesablanır. Sabit baza maaşı tətbiq edilmir.';
            }
        } else if (scheme === 'fixed_plus_commission') {
            // Sabit baza maaş + Komissiya faizi
            if (commContainer) commContainer.classList.remove('hidden');
            if (fixedContainer) fixedContainer.classList.remove('hidden');
            if (rentalContainer) rentalContainer.classList.add('hidden');
            if (hintTextEl) {
                hintTextEl.innerHTML = '<strong>Sabit baza + Komissiya:</strong> Usta hər ay zəmanətli sabit baza əməkhaqqı və əlavə olaraq göstərdiyi xidmət və satışlardan komissiya faizi əldə edir.';
            }
        } else if (scheme === 'booth_rental') {
            // Kreslo / Otaq icarəsi
            if (commContainer) commContainer.classList.add('hidden');
            if (fixedContainer) fixedContainer.classList.add('hidden');
            if (rentalContainer) rentalContainer.classList.remove('hidden');
            if (hintTextEl) {
                hintTextEl.innerHTML = '<strong>Kreslo / Otaq icarəsi:</strong> Usta salondan iş yeri (kreslo və ya ayrıca kabinet) icarəyə götürür və salona sabit icarə haqqı ödəyir. Ustanın müştərilərdən əldə etdiyi xidmət gəliri tam ustanın özünə qalır. Əlavə olaraq salon məhsullarının satışından faiz və ya POS-terminal ödəniş komissiyası qeyd edilə bilər.';
            }
        }
    },

    onMasterPhoneInput: function(val) {
        const displayPhone = document.getElementById('masterCardDisplayPhone');
        if (displayPhone) {
            const cleaned = (val || '').replace('+994', '').trim();
            displayPhone.textContent = cleaned ? ('+994 ' + cleaned) : '+994 50 000-00-00';
        }
    },

    // Master Avatar & Color Helpers
    selectMasterAvatarPreset: function(url) {
        const input = document.getElementById('masterFormAvatar');
        const preview = document.getElementById('masterFormAvatarPreview');
        if (input) input.value = url;
        if (preview) preview.src = url;
    },

    onMasterAvatarInput: function(val) {
        const preview = document.getElementById('masterFormAvatarPreview');
        if (preview) {
            preview.src = val ? val.trim() : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80';
        }
    },

    masterColorOptions: [
        '#FFDD2D', '#3B82F6', '#10B981', '#EC4899', '#8B5CF6', '#F97316', '#06B6D4', '#64748B'
    ],

    renderMasterColorSwatches: function(activeColor) {
        const container = document.getElementById('masterColorSwatchesContainer');
        if (!container) return;

        const cur = (activeColor || '#FFDD2D').toUpperCase();

        container.innerHTML = this.masterColorOptions.map(hex => {
            const isSel = hex.toUpperCase() === cur;
            return `
                <button type="button" onclick="BusinessDashboardView.selectMasterColorPreset('${hex}')" class="w-8 h-8 rounded-xl transition flex items-center justify-center cursor-pointer shadow-2xs hover:scale-110 active:scale-95 ring-2 ${isSel ? 'ring-slate-900 scale-105' : 'ring-transparent'}" style="background-color: ${hex}">
                    ${isSel ? `<svg class="w-4 h-4 ${['#FFDD2D'].includes(hex) ? 'text-black' : 'text-white'}" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                </button>
            `;
        }).join('');
    },

    selectMasterColorPreset: function(color) {
        const input = document.getElementById('masterFormColor');
        if (input) input.value = color;
        this.renderMasterColorSwatches(color);
    },

    copyMasterInviteLink: function() {
        const url = window.location.origin + window.location.pathname + '#/business/auth?invite=staff';
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                if (typeof App !== 'undefined') App.showToast('Usta dəvət linki kopyalandı');
            }).catch(() => {
                if (typeof App !== 'undefined') App.showToast('Dəvət linki: ' + url);
            });
        } else {
            if (typeof App !== 'undefined') App.showToast('Dəvət linki hazırlandı!');
        }
    },

    sendMasterWhatsAppInvite: function() {
        const name = (document.getElementById('masterFormName')?.value || 'Hörmətli Usta').trim();
        const phone = (document.getElementById('masterFormPhone')?.value || '').replace(/\D/g, '');
        const msg = encodeURIComponent(`Salam ${name}! Sizi Zeyvo Business tətbiqində usta profilinizi idarə etməyə dəvət edirik: ${window.location.origin + window.location.pathname}#/business/auth`);
        const waUrl = phone ? `https://wa.me/${phone}?text=${msg}` : `https://wa.me/?text=${msg}`;
        window.open(waUrl, '_blank');
    },

    // Master Role & Permissions Logic (Ready-made Templates + Custom Granular Controls)
    masterRoleTemplates: {
        specialist: {
            id: 'specialist',
            title: 'Usta / Mütəxəssis',
            badgeText: 'Usta',
            badgeClass: 'px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold',
            permissions: {
                canViewAllCalendar: false,
                canEditOthersBookings: false,
                canManageSchedule: false,
                canViewClientContacts: false,
                canExportClients: false,
                canCollectPayment: false,
                canApplyDiscounts: false,
                canViewRevenue: false,
                canViewStaffSalaries: false,
                canManageServices: false,
                canManageInventory: false
            }
        },
        senior: {
            id: 'senior',
            title: 'Baş Usta / Növbə rəhbəri',
            badgeText: 'Baş Usta',
            badgeClass: 'px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold',
            permissions: {
                canViewAllCalendar: true,
                canEditOthersBookings: true,
                canManageSchedule: true,
                canViewClientContacts: true,
                canExportClients: false,
                canCollectPayment: false,
                canApplyDiscounts: true,
                canViewRevenue: false,
                canViewStaffSalaries: false,
                canManageServices: false,
                canManageInventory: true
            }
        },
        manager: {
            id: 'manager',
            title: 'Administrator / Menecer',
            badgeText: 'Administrator',
            badgeClass: 'px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold',
            permissions: {
                canViewAllCalendar: true,
                canEditOthersBookings: true,
                canManageSchedule: true,
                canViewClientContacts: true,
                canExportClients: true,
                canCollectPayment: true,
                canApplyDiscounts: true,
                canViewRevenue: true,
                canViewStaffSalaries: false,
                canManageServices: true,
                canManageInventory: true
            }
        },
        owner: {
            id: 'owner',
            title: 'Tam İcazə (Super Admin)',
            badgeText: 'Tam İcazə',
            badgeClass: 'px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold',
            permissions: {
                canViewAllCalendar: true,
                canEditOthersBookings: true,
                canManageSchedule: true,
                canViewClientContacts: true,
                canExportClients: true,
                canCollectPayment: true,
                canApplyDiscounts: true,
                canViewRevenue: true,
                canViewStaffSalaries: true,
                canManageServices: true,
                canManageInventory: true
            }
        },
        custom: {
            id: 'custom',
            title: 'Fərdi / Özəl rol',
            badgeText: 'Fərdi Rol',
            badgeClass: 'px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold',
            permissions: null
        }
    },

    selectMasterRoleTemplate: function(roleKey, notify = true) {
        const input = document.getElementById('masterFormRolePermission');
        if (input) input.value = roleKey;

        const allRoles = ['specialist', 'senior', 'manager', 'owner', 'custom'];
        allRoles.forEach(r => {
            const pill = document.getElementById(`roleCard_${r}`);
            if (!pill) return;
            if (r === roleKey) {
                pill.className = "py-2 px-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 bg-white text-slate-900 shadow-xs cursor-pointer" + (r === 'custom' ? ' col-span-2 sm:col-span-1' : '');
            } else {
                pill.className = "py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5 cursor-pointer" + (r === 'custom' ? ' col-span-2 sm:col-span-1' : '');
            }
        });

        const tmpl = this.masterRoleTemplates[roleKey] || this.masterRoleTemplates.specialist;
        const badgeEl = document.getElementById('masterRoleBadgeStatus');
        if (badgeEl) {
            badgeEl.textContent = tmpl.badgeText;
            badgeEl.className = tmpl.badgeClass;
        }

        const descEl = document.getElementById('masterRoleDescriptionText');
        if (descEl) {
            const descs = {
                specialist: 'Yalnız öz təqvimi, iş qrafiki və təyin olunmuş müştəriləri idarə edir.',
                senior: 'Öz qəbulları ilə yanaşı komandanın qrafikini və qəbullarını idarə edir.',
                manager: 'Bütün salon qəbulları, kassa, ödənişlər, endirimlər və müştəri bazasını idarə edir.',
                owner: 'Bütün bölmələr, maliyyə hesabatları, kassa və əməkhaqqı üzrə tam giriş hüququ.',
                custom: 'Hüquqlar aşağıdakı siyahıdan fərdi qaydada seçilib.'
            };
            descEl.textContent = descs[roleKey] || descs.specialist;
        }

        if (tmpl.permissions) {
            Object.keys(tmpl.permissions).forEach(permKey => {
                const chk = document.getElementById(`perm_${permKey}`);
                if (chk) chk.checked = !!tmpl.permissions[permKey];
            });
            if (notify && typeof App !== 'undefined') {
                App.showToast(`«${tmpl.title}» şablon icazələri tətbiq edildi`);
            }
        }
    },

    onMasterCustomPermissionChange: function() {
        const input = document.getElementById('masterFormRolePermission');
        if (input) input.value = 'custom';

        const allRoles = ['specialist', 'senior', 'manager', 'owner', 'custom'];
        allRoles.forEach(r => {
            const pill = document.getElementById(`roleCard_${r}`);
            if (!pill) return;
            if (r === 'custom') {
                pill.className = "py-2 px-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 bg-white text-slate-900 shadow-xs cursor-pointer col-span-2 sm:col-span-1";
            } else {
                pill.className = "py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5 cursor-pointer";
            }
        });

        const badgeEl = document.getElementById('masterRoleBadgeStatus');
        if (badgeEl) {
            badgeEl.textContent = 'Fərdi Rol';
            badgeEl.className = 'px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold';
        }

        const descEl = document.getElementById('masterRoleDescriptionText');
        if (descEl) {
            descEl.textContent = 'Hüquqlar aşağıdakı siyahıdan fərdi qaydada seçilib.';
        }
    },

    initMasterPermissionsUI: function(permissions) {
        const role = permissions?.role || 'specialist';
        const input = document.getElementById('masterFormRolePermission');
        if (input) input.value = role;

        this.selectMasterRoleTemplate(role, false);

        const permKeys = [
            'canViewAllCalendar', 'canEditOthersBookings', 'canManageSchedule',
            'canViewClientContacts', 'canExportClients',
            'canCollectPayment', 'canApplyDiscounts', 'canViewRevenue', 'canViewStaffSalaries',
            'canManageServices', 'canManageInventory'
        ];

        let hasExplicitCustomPerms = false;
        permKeys.forEach(key => {
            const chk = document.getElementById(`perm_${key}`);
            if (chk && permissions[key] !== undefined) {
                chk.checked = !!permissions[key];
                hasExplicitCustomPerms = true;
            }
        });

        if (role === 'custom' || (!this.masterRoleTemplates[role] && hasExplicitCustomPerms)) {
            this.onMasterCustomPermissionChange();
        }
    },

    // Save Master
    handleSaveMaster: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const editIdInput = document.getElementById('masterFormEditId');
        const nameInput = document.getElementById('masterFormName');
        const roleInput = document.getElementById('masterFormRole');
        const specInput = document.getElementById('masterFormSpec');
        const statusSelect = document.getElementById('masterFormStatus');
        const phoneInput = document.getElementById('masterFormPhone');
        const emailInput = document.getElementById('masterFormEmail');
        const avatarInput = document.getElementById('masterFormAvatar');
        const colorInput = document.getElementById('masterFormColor');
        const bioInput = document.getElementById('masterFormBio');
        const onlineBookingCheckbox = document.getElementById('masterFormOnlineBooking');
        const ratingInput = document.getElementById('masterFormRating');
        const reviewsCountInput = document.getElementById('masterFormReviewsCount');
        const onlineNoteInput = document.getElementById('masterFormOnlineNote');
        const salaryTypeSelect = document.getElementById('masterFormSalaryType');
        const srvCommissionInput = document.getElementById('masterFormServiceCommission');
        const prodCommissionInput = document.getElementById('masterFormProductCommission');
        const fixedSalaryInput = document.getElementById('masterFormFixedSalary');
        const rolePermSelect = document.getElementById('masterFormRolePermission');
        const genderInput = document.getElementById('masterFormGender');

        const name = (nameInput ? nameInput.value : '').trim();
        const role = (roleInput ? roleInput.value : '').trim();
        if (!name) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa ustanın ad və soyadını daxil edin');
            this.switchMasterModalTab('info');
            if (nameInput) nameInput.focus();
            return;
        }

        const editId = editIdInput ? editIdInput.value.trim() : '';
        const list = this.getStaffList();
        const masterId = editId || ('st_' + Date.now());
        const gender = genderInput ? genderInput.value : (this.masterSelectedGender || 'male');

        const rawPhone = phoneInput ? phoneInput.value.replace('+994', '').trim() : '';
        const formattedPhone = rawPhone ? (rawPhone.startsWith('+994') ? rawPhone : ('+994 ' + rawPhone)) : '';
        const revs = Array.isArray(this.tempMasterReviews) ? [...this.tempMasterReviews] : [];
        let calculatedRating = 5.00;
        if (revs.length > 0) {
            const sum = revs.reduce((acc, r) => acc + (parseFloat(r.rating) || 5), 0);
            calculatedRating = parseFloat((sum / revs.length).toFixed(2));
        } else if (ratingInput && parseFloat(ratingInput.value)) {
            calculatedRating = parseFloat(ratingInput.value);
        }

        const masterObj = {
            id: masterId,
            name: name,
            role: role || 'Mütəxəssis',
            gender: gender,
            specialization: specInput ? specInput.value.trim() : '',
            status: statusSelect ? statusSelect.value : 'active',
            phone: formattedPhone,
            email: emailInput ? emailInput.value.trim() : '',
            avatar: avatarInput ? avatarInput.value.trim() : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
            color: colorInput ? colorInput.value : '#FFDD2D',
            bio: bioInput ? bioInput.value.trim() : '',
            isOnlineBooking: onlineBookingCheckbox ? onlineBookingCheckbox.checked : true,
            rating: calculatedRating,
            reviewsCount: revs.length > 0 ? revs.length : (reviewsCountInput ? parseInt(reviewsCountInput.value) || 0 : 0),
            onlineNote: onlineNoteInput ? onlineNoteInput.value.trim() : '',
            reviews: revs,
            serviceIds: Array.isArray(this.tempMasterServices) ? [...this.tempMasterServices] : [],
            customPricing: this.tempMasterCustomPricing ? JSON.parse(JSON.stringify(this.tempMasterCustomPricing)) : {},
            workSchedule: this.tempMasterSchedule ? JSON.parse(JSON.stringify(this.tempMasterSchedule)) : this.getDefaultMasterSchedule(),
            scheduleExceptions: Array.isArray(this.tempMasterScheduleExceptions) ? [...this.tempMasterScheduleExceptions] : [],
            salaryScheme: {
                type: salaryTypeSelect ? salaryTypeSelect.value : 'commission',
                serviceCommission: (salaryTypeSelect && (salaryTypeSelect.value === 'fixed' || salaryTypeSelect.value === 'booth_rental')) ? 0 : (srvCommissionInput && !isNaN(parseFloat(srvCommissionInput.value)) ? parseFloat(srvCommissionInput.value) : 40),
                productCommission: (salaryTypeSelect && salaryTypeSelect.value === 'fixed') ? 0 : (salaryTypeSelect && salaryTypeSelect.value === 'booth_rental') ? (parseFloat(document.getElementById('masterFormRentalProductComm')?.value) || 0) : (prodCommissionInput && !isNaN(parseFloat(prodCommissionInput.value)) ? parseFloat(prodCommissionInput.value) : 10),
                fixedSalary: (salaryTypeSelect && (salaryTypeSelect.value === 'commission' || salaryTypeSelect.value === 'booth_rental')) ? 0 : (fixedSalaryInput && !isNaN(parseFloat(fixedSalaryInput.value)) ? parseFloat(fixedSalaryInput.value) : 0),
                rentDetails: (salaryTypeSelect && salaryTypeSelect.value === 'booth_rental') ? {
                    rentalType: document.getElementById('masterFormRentalType')?.value || 'monthly',
                    rentalAmount: parseFloat(document.getElementById('masterFormRentalAmount')?.value) || 0,
                    productCommission: parseFloat(document.getElementById('masterFormRentalProductComm')?.value) || 0,
                    cardCommission: parseFloat(document.getElementById('masterFormRentalCardComm')?.value) || 0
                } : null
            },
            permissions: {
                role: rolePermSelect ? rolePermSelect.value : 'specialist',
                canViewAllCalendar: !!document.getElementById('perm_canViewAllCalendar')?.checked,
                canEditOthersBookings: !!document.getElementById('perm_canEditOthersBookings')?.checked,
                canManageSchedule: !!document.getElementById('perm_canManageSchedule')?.checked,
                canViewClientContacts: !!document.getElementById('perm_canViewClientContacts')?.checked,
                canExportClients: !!document.getElementById('perm_canExportClients')?.checked,
                canCollectPayment: !!document.getElementById('perm_canCollectPayment')?.checked,
                canApplyDiscounts: !!document.getElementById('perm_canApplyDiscounts')?.checked,
                canViewRevenue: !!document.getElementById('perm_canViewRevenue')?.checked,
                canViewStaffSalaries: !!document.getElementById('perm_canViewStaffSalaries')?.checked,
                canManageServices: !!document.getElementById('perm_canManageServices')?.checked,
                canManageInventory: !!document.getElementById('perm_canManageInventory')?.checked,
                canViewCalendar: true,
                canEditSchedule: !!document.getElementById('perm_canManageSchedule')?.checked
            },
            updatedAt: new Date().toISOString()
        };

        const existingIdx = list.findIndex(s => s.id === masterId);
        if (existingIdx !== -1) {
            const oldMaster = list[existingIdx];
            if (masterObj.status === 'dismissed' && oldMaster.status !== 'dismissed') {
                masterObj.isOnlineBooking = false;
                if (!masterObj.dismissalInfo) {
                    masterObj.dismissalInfo = {
                        reason: 'İnzibatçı tərəfindən status dəyişdirildi',
                        date: new Date().toISOString().split('T')[0],
                        timestamp: Date.now()
                    };
                }
            } else if (masterObj.status !== 'dismissed' && oldMaster.status === 'dismissed') {
                masterObj.dismissalInfo = null;
            } else {
                masterObj.dismissalInfo = oldMaster.dismissalInfo || null;
            }
            masterObj.employmentHistory = Array.isArray(oldMaster.employmentHistory) ? oldMaster.employmentHistory : [];
            list[existingIdx] = Object.assign({}, oldMaster, masterObj);
        } else {
            masterObj.createdAt = new Date().toISOString();
            masterObj.employmentHistory = [];
            masterObj.dismissalInfo = null;
            list.push(masterObj);
        }

        this.saveStaffList(list);

        // Bi-directional synchronization with services (srv.staffIds and staffOverrides)
        if (this.getServices && this.saveServices) {
            const services = this.getServices();
            let changedServices = false;
            services.forEach(srv => {
                if (!Array.isArray(srv.staffIds)) srv.staffIds = [];
                if (!srv.staffOverrides) srv.staffOverrides = {};
                const shouldHave = masterObj.serviceIds.includes(srv.id);
                const hasIt = srv.staffIds.includes(masterId);
                if (shouldHave && !hasIt) {
                    srv.staffIds.push(masterId);
                    changedServices = true;
                } else if (!shouldHave && hasIt) {
                    srv.staffIds = srv.staffIds.filter(id => id !== masterId);
                    if (srv.staffOverrides[masterId]) {
                        delete srv.staffOverrides[masterId];
                    }
                    changedServices = true;
                }

                // Synchronize custom pricing if defined
                if (shouldHave && masterObj.customPricing && masterObj.customPricing[srv.id] !== undefined) {
                    const customPrice = parseFloat(masterObj.customPricing[srv.id]);
                    if (!srv.staffOverrides[masterId]) srv.staffOverrides[masterId] = {};
                    if (srv.staffOverrides[masterId].price !== customPrice) {
                        srv.staffOverrides[masterId].price = customPrice;
                        changedServices = true;
                    }
                }
            });
            if (changedServices) {
                this.saveServices(services);
            }
        }

        this.closeCreateMasterModal();
        this.refreshStaffTabContent();
        this.render(); // update sidebar counter

        if (typeof App !== 'undefined') {
            App.showToast(editId ? `«${masterObj.name}» məlumatları yeniləndi` : `Yeni usta «${masterObj.name}» uğurla əlavə edildi!`);
        }
    },

    onCurrentMasterDeleteClick: function() {
        if (!this.editingMasterId) return;
        this.deleteMaster(this.editingMasterId);
    },

    deleteMaster: function(masterId) {
        const list = this.getStaffList();
        const master = list.find(s => s.id === masterId);
        if (!master) return;

        const executeDelete = () => {
            const newList = list.filter(s => s.id !== masterId);
            this.saveStaffList(newList);

            // Clean references from services
            if (this.getServices && this.saveServices) {
                const services = this.getServices();
                services.forEach(srv => {
                    if (Array.isArray(srv.staffIds)) {
                        srv.staffIds = srv.staffIds.filter(id => id !== masterId);
                    }
                    if (srv.staffOverrides && srv.staffOverrides[masterId]) {
                        delete srv.staffOverrides[masterId];
                    }
                });
                this.saveServices(services);
            }

            this.closeCreateMasterModal();
            this.refreshStaffTabContent();
            this.render();

            if (typeof App !== 'undefined') {
                App.showToast(`«${master.name}» bazadan silindi`);
            }
        };

        if (this.openDeleteConfirmModal) {
            this.openDeleteConfirmModal({
                title: 'Ustanı sil',
                message: `<strong>"${master.name}"</strong> adlı mütəxəssisi bazadan silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Ustanın bütün cədvəli və xidmət təyinatları ləğv ediləcək.</span>`,
                confirmText: 'Bəli, sil',
                onConfirm: executeDelete
            });
        } else {
            executeDelete();
        }
    },

    // Master Dismissal & Rehire Operations
    openDismissMasterModal: function(masterId) {
        const modal = document.getElementById('bizDismissMasterModal');
        if (!modal) return;

        const staffList = this.getStaffList();
        const master = staffList.find(s => s.id === masterId);
        if (!master) return;

        const targetIdInput = document.getElementById('dismissMasterTargetId');
        if (targetIdInput) targetIdInput.value = master.id;

        const profileContainer = document.getElementById('dismissMasterTargetProfile');
        if (profileContainer) {
            profileContainer.innerHTML = `
                <div class="flex items-center gap-3 w-full">
                    ${master.avatar ? `
                        <img src="${master.avatar}" class="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0">
                    ` : `
                        <div class="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-slate-200">
                            ${(master.name || 'U').slice(0, 2).toUpperCase()}
                        </div>
                    `}
                    <div class="min-w-0 flex-1">
                        <div class="font-bold text-slate-900 text-xs truncate">${this.escapeHtml(master.name)}</div>
                        <div class="text-[11px] text-slate-500 truncate">${this.escapeHtml(master.role || 'Mütəxəssis')} • ${master.phone || 'Telefon yoxdur'}</div>
                    </div>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 shrink-0">Hal-hazırda aktiv</span>
                </div>
            `;
        }

        const todayIso = new Date().toISOString().split('T')[0];
        this.initCustomDatePicker('dismissMasterDate', todayIso);

        const reasonSelect = document.getElementById('dismissMasterReasonSelect');
        if (reasonSelect) reasonSelect.value = 'Öz istəyi ilə (Ərizə əsasında)';

        const docInput = document.getElementById('dismissMasterDocNo');
        if (docInput) docInput.value = '';

        const noteInput = document.getElementById('dismissMasterNote');
        if (noteInput) noteInput.value = '';

        modal.classList.remove('hidden');
    },

    closeDismissMasterModal: function() {
        this.closeAllCustomDatePickers();
        const modal = document.getElementById('bizDismissMasterModal');
        if (modal) modal.classList.add('hidden');
    },

    handleConfirmDismissMaster: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const targetIdInput = document.getElementById('dismissMasterTargetId');
        const masterId = targetIdInput ? targetIdInput.value : '';
        if (!masterId) return;

        const staffList = this.getStaffList();
        const masterIdx = staffList.findIndex(s => s.id === masterId);
        if (masterIdx === -1) return;

        const reasonSelect = document.getElementById('dismissMasterReasonSelect');
        const dateInput = document.getElementById('dismissMasterDate');
        const docInput = document.getElementById('dismissMasterDocNo');
        const noteInput = document.getElementById('dismissMasterNote');

        const reason = reasonSelect ? reasonSelect.value : 'Öz istəyi ilə (Ərizə əsasında)';
        const date = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
        const docNo = docInput ? docInput.value.trim() : '';
        const note = noteInput ? noteInput.value.trim() : '';

        const master = staffList[masterIdx];
        master.status = 'dismissed';
        master.isOnlineBooking = false;
        master.dismissalInfo = {
            reason: reason,
            date: date,
            docNo: docNo,
            note: note,
            timestamp: Date.now()
        };

        if (!Array.isArray(master.employmentHistory)) {
            master.employmentHistory = [];
        }
        master.employmentHistory.push({
            type: 'dismissed',
            reason: reason,
            date: date,
            docNo: docNo,
            note: note,
            timestamp: Date.now()
        });

        this.saveStaffList(staffList);
        this.closeDismissMasterModal();
        this.closeCreateMasterModal();
        this.refreshStaffTabContent();
        this.render();

        if (typeof App !== 'undefined') {
            App.showToast(`«${master.name}» işdən azad edildi`);
        }
    },

    openRehireMasterModal: function(masterId) {
        const modal = document.getElementById('bizRehireMasterModal');
        if (!modal) return;

        const staffList = this.getStaffList();
        const master = staffList.find(s => s.id === masterId);
        if (!master) return;

        const targetIdInput = document.getElementById('rehireMasterTargetId');
        if (targetIdInput) targetIdInput.value = master.id;

        const profileContainer = document.getElementById('rehireMasterTargetProfile');
        if (profileContainer) {
            const disReason = master.dismissalInfo?.reason || 'Qeyd olunmayıb';
            const disDate = master.dismissalInfo?.date || '';
            const disDoc = master.dismissalInfo?.docNo ? ` • Sənəd: ${master.dismissalInfo.docNo}` : '';
            const disNote = master.dismissalInfo?.note ? `<div class="text-[11px] text-slate-500 italic mt-1">«${this.escapeHtml(master.dismissalInfo.note)}»</div>` : '';

            profileContainer.innerHTML = `
                <div class="flex items-center gap-3">
                    ${master.avatar ? `
                        <img src="${master.avatar}" class="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0">
                    ` : `
                        <div class="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-slate-200">
                            ${(master.name || 'U').slice(0, 2).toUpperCase()}
                        </div>
                    `}
                    <div class="min-w-0 flex-1">
                        <div class="font-bold text-slate-900 text-xs truncate">${this.escapeHtml(master.name)}</div>
                        <div class="text-[11px] text-slate-500 truncate">${this.escapeHtml(master.role || 'Mütəxəssis')} • ${master.phone || 'Telefon yoxdur'}</div>
                    </div>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 shrink-0">İşdən azad edilib</span>
                </div>
                <div class="pt-2 border-t border-slate-200/70 text-[11px] text-slate-600">
                    <span class="font-semibold text-slate-700">Son xitam səbəbi:</span> ${this.escapeHtml(disReason)} ${disDate ? `<span class="text-slate-400 font-normal">(${disDate})</span>` : ''}${this.escapeHtml(disDoc)}
                    ${disNote}
                </div>
            `;
        }

        const todayIso = new Date().toISOString().split('T')[0];
        this.initCustomDatePicker('rehireMasterDate', todayIso);

        const roleSelect = document.getElementById('rehireMasterRoleSelect');
        if (roleSelect) {
            const roles = this.getMasterRoles ? this.getMasterRoles() : [];
            roleSelect.innerHTML = roles.map(r => `
                <option value="${this.escapeHtml(r.name)}" ${r.name === master.role ? 'selected' : ''}>${this.escapeHtml(r.name)}</option>
            `).join('');
            if (!roles.some(r => r.name === master.role) && master.role) {
                roleSelect.innerHTML += `<option value="${this.escapeHtml(master.role)}" selected>${this.escapeHtml(master.role)}</option>`;
            }
        }

        const onlineCheckbox = document.getElementById('rehireMasterOnlineBooking');
        if (onlineCheckbox) onlineCheckbox.checked = true;

        const noteInput = document.getElementById('rehireMasterNote');
        if (noteInput) noteInput.value = '';

        modal.classList.remove('hidden');
    },

    closeRehireMasterModal: function() {
        this.closeAllCustomDatePickers();
        const modal = document.getElementById('bizRehireMasterModal');
        if (modal) modal.classList.add('hidden');
    },

    handleConfirmRehireMaster: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const targetIdInput = document.getElementById('rehireMasterTargetId');
        const masterId = targetIdInput ? targetIdInput.value : '';
        if (!masterId) return;

        const staffList = this.getStaffList();
        const masterIdx = staffList.findIndex(s => s.id === masterId);
        if (masterIdx === -1) return;

        const dateInput = document.getElementById('rehireMasterDate');
        const roleSelect = document.getElementById('rehireMasterRoleSelect');
        const onlineCheckbox = document.getElementById('rehireMasterOnlineBooking');
        const noteInput = document.getElementById('rehireMasterNote');

        const date = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
        const role = roleSelect ? roleSelect.value : staffList[masterIdx].role;
        const isOnline = onlineCheckbox ? onlineCheckbox.checked : true;
        const note = noteInput ? noteInput.value.trim() : '';

        const master = staffList[masterIdx];
        master.status = 'active';
        master.role = role;
        master.isOnlineBooking = isOnline;

        if (!Array.isArray(master.employmentHistory)) {
            master.employmentHistory = [];
        }
        master.employmentHistory.push({
            type: 'rehire',
            date: date,
            role: role,
            note: note,
            previousDismissal: master.dismissalInfo ? Object.assign({}, master.dismissalInfo) : null,
            timestamp: Date.now()
        });
        master.dismissalInfo = null;

        this.saveStaffList(staffList);
        this.closeRehireMasterModal();
        this.closeDismissalDetailsModal();
        this.closeCreateMasterModal();
        this.refreshStaffTabContent();
        this.render();

        if (typeof App !== 'undefined') {
            App.showToast(`«${master.name}» yenidən işə qəbul edildi!`);
        }
    },

    openDismissalDetailsModal: function(masterId) {
        const modal = document.getElementById('bizDismissalDetailsModal');
        if (!modal) return;

        const staffList = this.getStaffList();
        const master = staffList.find(s => s.id === masterId);
        if (!master) return;

        const content = document.getElementById('dismissalDetailsContent');
        if (content) {
            const dis = master.dismissalInfo || {};
            const history = Array.isArray(master.employmentHistory) ? master.employmentHistory : [];

            content.innerHTML = `
                <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                    ${master.avatar ? `
                        <img src="${master.avatar}" class="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200 shrink-0">
                    ` : `
                        <div class="w-11 h-11 rounded-xl bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-slate-200">
                            ${(master.name || 'U').slice(0, 2).toUpperCase()}
                        </div>
                    `}
                    <div class="min-w-0 flex-1">
                        <div class="font-bold text-slate-900 text-sm truncate">${this.escapeHtml(master.name)}</div>
                        <div class="text-xs text-slate-500 truncate">${this.escapeHtml(master.role || 'Mütəxəssis')} • ${master.phone || 'Telefon yoxdur'}</div>
                    </div>
                </div>

                <div class="p-3.5 bg-rose-50/70 border border-rose-200/80 rounded-2xl space-y-2 text-xs">
                    <div class="flex items-center justify-between">
                        <span class="text-slate-500 font-medium">Status:</span>
                        <span class="font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">İşdən azad edilib</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-500 font-medium">Xitam tarixi:</span>
                        <span class="font-bold text-slate-800">${dis.date ? this.formatDateDisplay(dis.date) : 'Göstərilməyib'}</span>
                    </div>
                    ${dis.docNo ? `
                        <div class="flex items-center justify-between">
                            <span class="text-slate-500 font-medium">Əmr / Sənəd:</span>
                            <span class="font-semibold text-slate-800">${this.escapeHtml(dis.docNo)}</span>
                        </div>
                    ` : ''}
                    <div>
                        <span class="text-slate-500 font-medium block mb-1">Xitam səbəbi:</span>
                        <div class="font-bold text-slate-900 bg-white p-2.5 rounded-xl border border-rose-200/60">${this.escapeHtml(dis.reason || 'Qeyd olunmayıb')}</div>
                    </div>
                    ${dis.note ? `
                        <div>
                            <span class="text-slate-500 font-medium block mb-1">Əlavə qeydlər:</span>
                            <div class="text-slate-700 bg-white/80 p-2.5 rounded-xl border border-rose-200/50">${this.escapeHtml(dis.note)}</div>
                        </div>
                    ` : ''}
                </div>

                ${history.length > 0 ? `
                    <div class="pt-2">
                        <div class="text-[11px] font-bold text-slate-600 mb-1.5">Məşğulluq tarixçəsi (${history.length}):</div>
                        <div class="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                            ${history.slice().reverse().map(h => `
                                <div class="p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] flex items-start justify-between gap-2">
                                    <div>
                                        <span class="font-bold ${h.type === 'rehire' ? 'text-emerald-700' : 'text-rose-700'}">${h.type === 'rehire' ? 'İşə bərpa / qəbul' : 'Xitam'}</span>
                                        ${h.reason ? ` <span class="text-slate-500">(${this.escapeHtml(h.reason)})</span>` : ''}
                                        ${h.note ? `<p class="text-[10px] text-slate-400 mt-0.5">${this.escapeHtml(h.note)}</p>` : ''}
                                    </div>
                                    <span class="text-[10px] text-slate-400 shrink-0 font-mono">${h.date ? this.formatDateDisplay(h.date) : ''}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            `;
        }

        const rehireBtn = document.getElementById('dismissalDetailsRehireBtn');
        if (rehireBtn) {
            rehireBtn.onclick = () => {
                this.closeDismissalDetailsModal();
                this.openRehireMasterModal(master.id);
            };
        }

        modal.classList.remove('hidden');
    },

    closeDismissalDetailsModal: function() {
        const modal = document.getElementById('bizDismissalDetailsModal');
        if (modal) modal.classList.add('hidden');
    },

    // Master Schedule Matrix Overview Modal
    openMasterScheduleOverviewModal: function() {
        const modal = document.getElementById('bizMasterScheduleModal');
        if (!modal) return;
        this.renderMasterScheduleMatrix();
        modal.classList.remove('hidden');
    },

    closeMasterScheduleOverviewModal: function() {
        const modal = document.getElementById('bizMasterScheduleModal');
        if (modal) modal.classList.add('hidden');
    },

    getScheduleMatrixTableHtml: function() {
        const staffList = this.getStaffList();
        const days = this.dayNamesMap;

        return `
            <table class="w-full text-left text-xs border-collapse min-w-[950px]">
                <thead>
                    <tr class="bg-slate-50/80 border-y border-slate-200 text-slate-600 text-xs font-semibold">
                        <th class="p-3.5 sticky left-0 bg-slate-50 min-w-[180px] z-10">Usta</th>
                        ${days.map(d => `<th class="p-3.5 text-center min-w-[110px]">${d.name}<br><span class="text-[10px] text-slate-400 font-normal">(${d.short})</span></th>`).join('')}
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                    ${staffList.map(master => {
                        const sched = master.workSchedule?.days || {};
                        return `
                            <tr class="hover:bg-slate-50/60 transition">
                                <td class="p-3.5 sticky left-0 bg-white hover:bg-slate-50/60 z-10 border-r border-slate-100">
                                    <div class="flex items-center justify-between gap-2">
                                        <div class="flex items-center gap-2.5 min-w-0">
                                            <img src="${master.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}" class="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200 shrink-0">
                                            <div class="min-w-0">
                                                <div class="font-bold text-slate-900 truncate">${BusinessDashboardView.escapeHtml(master.name)}</div>
                                                <div class="text-[10px] text-slate-400 truncate">${BusinessDashboardView.escapeHtml(master.role || 'Mütəxəssis')}</div>
                                            </div>
                                        </div>
                                        <button type="button" onclick="BusinessDashboardView.closeMasterScheduleOverviewModal(); BusinessDashboardView.openCreateMasterModal('${master.id}', 'schedule')" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#FFDD2D] text-slate-600 hover:text-black flex items-center justify-center transition shrink-0 cursor-pointer" title="Qrafiki dəyiş">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                        </button>
                                    </div>
                                </td>
                                ${days.map(d => {
                                    const dayShift = sched[d.key];
                                    const isWorking = master.status === 'active' && dayShift && dayShift.enabled;
                                    if (master.status === 'vacation') {
                                        return `<td class="p-3 text-center"><span class="px-2 py-1 rounded-lg bg-amber-50 text-amber-800 text-[10px] font-bold">Məzuniyyət</span></td>`;
                                    }
                                    if (isWorking) {
                                        return `
                                            <td class="p-3 text-center">
                                                <div class="inline-block px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-bold text-[11px] font-mono shadow-2xs">
                                                    ${dayShift.start} – ${dayShift.end}
                                                </div>
                                            </td>
                                        `;
                                    } else {
                                        return `
                                            <td class="p-3 text-center">
                                                <span class="text-slate-300 text-[11px] font-medium">—</span>
                                            </td>
                                        `;
                                    }
                                }).join('')}
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    },

    renderMasterScheduleMatrix: function() {
        const container = document.getElementById('masterScheduleMatrixContainer');
        if (!container) return;
        container.innerHTML = this.getScheduleMatrixTableHtml();
    },

    // Categories storage
    getDefaultServiceCategories: function() {
        return [
            {
                id: 'scat_hair',
                name: 'Saç xidmətləri',
                icon: 'scissors',
                description: 'Qadın və kişi saç kəsimi, boyama, forma və qulluq prosedurları',
                createdAt: new Date().toISOString()
            },
            {
                id: 'scat_nail',
                name: 'Dırnaq servisi',
                icon: 'nail',
                description: 'Klassik və aparat manikür, pedikür, shellac və dırnaq dizaynı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'scat_skin',
                name: 'Dəri & Kosmetologiya',
                icon: 'spa',
                description: 'Dərinin təmizlənməsi, pilinq, estetik baxım və nəmləndirmə',
                createdAt: new Date().toISOString()
            },
            {
                id: 'scat_massage',
                name: 'Masaj & SPA',
                icon: 'heart',
                description: 'Bədən və üz masajı, bərpaedici və relaks terapiyalar',
                createdAt: new Date().toISOString()
            },
            {
                id: 'scat_barber',
                name: 'Barbershop',
                icon: 'user',
                description: 'Bərbər xidmətləri, saqqal stilizasiyası və ənənəvi təraş',
                createdAt: new Date().toISOString()
            }
        ];
    },

    getServiceCategories: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_service_categories_v1'));
        if (stored) {
            try {
                const list = JSON.parse(stored);
                if (Array.isArray(list) && list.length > 0) return list;
            } catch (e) {
                console.error("Error parsing service categories", e);
            }
        }
        const defaults = this.getDefaultServiceCategories();
        this.saveServiceCategories(defaults);
        return defaults;
    },

    saveServiceCategories: function(categories) {
        localStorage.setItem(this.storageKey('zeyvo_business_service_categories_v1'), JSON.stringify(categories));
    },

    // Services storage
    getDefaultServices: function() {
        return [
            {
                id: 'srv_1',
                name: 'Kişi Saç Kəsimi & Stil',
                categoryId: 'scat_barber',
                price: 35,
                priceType: 'fixed',
                duration: 45,
                gender: 'men',
                staffIds: ['st_1', 'st_3'],
                onlineBooking: true,
                description: 'Klassik və müasir bərbər kəsimi, saç yuma və stilizasiya.',
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_2',
                name: 'Kral Təraşı & Saqqal Dizaynı',
                categoryId: 'scat_barber',
                price: 25,
                priceType: 'fixed',
                duration: 30,
                gender: 'men',
                staffIds: ['st_3'],
                onlineBooking: true,
                description: 'İsti dəsmal kompresi, ülgüc təraşı və xüsusi saqqal yağı ilə qulluq.',
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_3',
                name: 'Qadın Saç Kəsimi & Fen',
                categoryId: 'scat_hair',
                price: 40,
                priceType: 'from',
                duration: 60,
                gender: 'women',
                staffIds: ['st_1', 'st_4'],
                onlineBooking: true,
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_4',
                name: 'Saç Boyama & Balayage',
                categoryId: 'scat_hair',
                price: 130,
                priceType: 'range',
                priceMax: 180,
                duration: 120,
                gender: 'women',
                staffIds: ['st_4'],
                onlineBooking: true,
                description: 'Müasir işıqlandırma texnikası (Airtouch, Balayage) və tonlaşdırma daxildir.',
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_5',
                name: 'Aparat Manikür & Shellac Gel',
                categoryId: 'scat_nail',
                price: 45,
                priceType: 'fixed',
                duration: 60,
                gender: 'women',
                staffIds: ['st_2'],
                onlineBooking: true,
                description: 'Kutikula təmizlənməsi, dırnaq lövhəsinin bərabərləşdirilməsi və gel boya.',
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_6',
                name: 'Smart Pedikür Kompleks',
                categoryId: 'scat_nail',
                price: 55,
                priceType: 'fixed',
                duration: 75,
                gender: 'all',
                staffIds: ['st_2'],
                onlineBooking: true,
                description: 'Smart disk texnologiyası ilə ayaq dabanlarının hamarlanması və dırnaq qulluğu.',
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_7',
                name: 'Ultrasonik Üz Təmizlənməsi',
                categoryId: 'scat_skin',
                price: 70,
                priceType: 'fixed',
                duration: 60,
                gender: 'all',
                staffIds: ['st_4'],
                onlineBooking: true,
                description: 'Məsamələrin dərindən təmizlənməsi, pilinq, sakitləşdirici alginat maskası.',
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_8',
                name: 'Üz Masajı & Nəmləndirici Spa',
                categoryId: 'scat_skin',
                price: 50,
                priceType: 'fixed',
                duration: 45,
                gender: 'women',
                staffIds: ['st_4'],
                onlineBooking: false,
                description: 'Liftinq və limfodrenaj üz masajı, serum və nəmləndirici bərpa kompleksi.',
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_9',
                name: 'Klassik Bədən Masajı',
                categoryId: 'scat_massage',
                price: 80,
                priceType: 'fixed',
                duration: 60,
                gender: 'all',
                staffIds: ['st_1'],
                onlineBooking: true,
                description: 'Əzələ gərginliyini azaldan və qan dövranını yaxşılaşdıran bədən masajı.',
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_10',
                name: 'Uşaq Saç Kəsimi',
                categoryId: 'scat_hair',
                price: 20,
                priceType: 'fixed',
                duration: 30,
                gender: 'kids',
                staffIds: ['st_1', 'st_3'],
                onlineBooking: true,
                description: '10 yaşadək uşaqlar üçün diqqətli və səliqəli saç formalaşdırma.',
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_11',
                name: 'Full Grooming Kompleksi (Saç + Saqqal)',
                categoryId: 'scat_barber',
                serviceFormat: 'combo',
                isCombo: true,
                comboItems: [
                    { serviceId: 'srv_1', name: 'Kişi Saç Kəsimi', duration: 45, price: 25 },
                    { serviceId: 'srv_2', name: 'Saqqal Qırxımı & Forma', duration: 30, price: 15 }
                ],
                price: 35,
                priceType: 'fixed',
                duration: 75,
                gender: 'men',
                staffIds: ['st_1', 'st_3'],
                onlineBooking: true,
                description: 'Kişi saç kəsimi və saqqal formalaşdırılması daxil tam baxım paketi.',
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_12',
                name: 'Ekspress Konsultasiya & Stil Seçimi',
                categoryId: null,
                serviceFormat: 'individual',
                price: 20,
                priceType: 'fixed',
                duration: 20,
                gender: 'all',
                staffIds: ['st_1', 'st_4'],
                onlineBooking: true,
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_13',
                name: 'Gözəllik Günü Paketi (Saç + Manikür)',
                categoryId: null,
                serviceFormat: 'combo',
                isCombo: true,
                comboItems: [
                    { serviceId: 'srv_3', name: 'Qadın Saç Kəsimi & Fen', duration: 60, price: 40 },
                    { serviceId: 'srv_5', name: 'Aparat Manikür & Shellac Gel', duration: 60, price: 45 }
                ],
                price: 70,
                priceType: 'fixed',
                duration: 120,
                breakTime: 15,
                bufferTime: 15,
                gender: 'women',
                staffIds: ['st_2', 'st_4'],
                onlineBooking: true,
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_14',
                name: 'Tam Üz Qulluğu Kompleksi (Təmizləmə + Masaj)',
                categoryId: 'scat_skin',
                serviceFormat: 'combo',
                isCombo: true,
                comboItems: [
                    { serviceId: 'srv_7', name: 'Ultrasonik Üz Təmizlənməsi', duration: 60, price: 70 },
                    { serviceId: 'srv_8', name: 'Üz Masajı & Nəmləndirici Spa', duration: 45, price: 50 }
                ],
                price: 100,
                priceType: 'fixed',
                duration: 105,
                breakTime: 10,
                bufferTime: 10,
                gender: 'women',
                staffIds: ['st_4'],
                onlineBooking: true,
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            },
            {
                id: 'srv_15',
                name: 'Qrup Spa & Aromaterapiya Paketi',
                categoryId: 'scat_skin',
                serviceFormat: 'group_combo',
                isGroup: true,
                isCombo: true,
                maxCapacity: 6,
                comboItems: [
                    { serviceId: 'srv_8', name: 'Üz Masajı & Nəmləndirici Spa', duration: 45, price: 40 },
                    { serviceId: 'srv_7', name: 'Ultrasonik Üz Təmizlənməsi', duration: 45, price: 50 }
                ],
                price: 85,
                priceType: 'fixed',
                duration: 90,
                breakTime: 15,
                bufferTime: 15,
                gender: 'all',
                staffIds: ['st_4'],
                onlineBooking: true,
                businessName: 'Baku Beauty Studio',
                branchName: 'Mərkəz Filialı',
                createdAt: new Date().toISOString()
            }
        ];
    },

    getServices: function() {
        const defaults = this.getDefaultServices();
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_services_v1'));
        if (stored) {
            try {
                let list = JSON.parse(stored);
                if (Array.isArray(list) && list.length === 0) return [];
                if (Array.isArray(list) && list.length > 0) {
                    let modified = false;
                    // Merge demo uncategorized services if missing
                    defaults.filter(d => !d.categoryId || d.categoryId === 'uncategorized').forEach(u => {
                        if (!list.some(s => s.id === u.id)) {
                            list.push(u);
                            modified = true;
                        }
                    });
                    // Merge demo combo services if missing
                    defaults.filter(d => d.serviceFormat === 'combo' || d.isCombo).forEach(c => {
                        if (!list.some(s => s.id === c.id)) {
                            list.push(c);
                            modified = true;
                        }
                    });
                    if (modified) {
                        this.saveServices(list);
                    }
                    return list;
                }
            } catch (e) {
                console.error("Error parsing services", e);
            }
        }
        if (this.storageKey('zeyvo_business_services_v1') !== 'zeyvo_business_services_v1') return [];
        this.saveServices(defaults);
        return defaults;
    },

    saveServices: function(services) {
        localStorage.setItem(this.storageKey('zeyvo_business_services_v1'), JSON.stringify(services));
    },

    // Filter states
    serviceSearchQuery: '',
    serviceCategoryFilter: 'all',
    serviceGenderFilter: 'all',
    serviceOnlineFilter: 'all',
    serviceFormatFilter: 'all',
    collapsedServiceCategories: {},

    toggleServiceCategoryCollapse: function(catId) {
        this.collapsedServiceCategories[catId] = !this.collapsedServiceCategories[catId];
        const isCollapsed = !!this.collapsedServiceCategories[catId];
        const list = document.getElementById(`srvCategoryList_${catId}`);
        const chevron = document.getElementById(`srvCatChevron_${catId}`);
        if (list) {
            if (isCollapsed) list.classList.add('hidden');
            else list.classList.remove('hidden');
        }
        if (chevron) {
            if (isCollapsed) {
                chevron.classList.add('-rotate-90');
                chevron.classList.remove('rotate-0');
            } else {
                chevron.classList.remove('-rotate-90');
                chevron.classList.add('rotate-0');
            }
        }
    },

    setServiceOnlineFilter: function(val) {
        this.serviceOnlineFilter = val;
        this.refreshServicesTab();
    },

    handleServiceSearch: function(val) {
        this.serviceSearchQuery = val || '';
        const grid = document.getElementById('srvCardsGrid');
        if (grid) grid.innerHTML = this.renderServiceCardsHtml();
        const bar = document.getElementById('srvFilterBarContainer');
        if (bar) bar.innerHTML = this.renderServiceFilterBarHtml();
    },

    getServiceGenderConfig: function(gender) {
        switch (gender) {
            case 'women':
                return { label: 'Qadın', badgeClass: 'bg-violet-50 text-violet-700 border-violet-200/80' };
            case 'men':
                return { label: 'Kişi', badgeClass: 'bg-blue-50 text-blue-800 border-blue-200/80' };
            case 'kids':
                return { label: 'Uşaq', badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80' };
            default:
                return { label: 'Hamısı', badgeClass: 'bg-slate-100 text-slate-700 border-slate-200/80' };
        }
    },

    formatServicePrice: function(srv) {
        const p = parseFloat(srv.price) || 0;
        const isGroup = (srv.serviceFormat === 'group' || srv.isGroup);
        const suffix = isGroup ? ' / nəfər' : '';
        if (srv.priceType === 'from') {
            return `${p} ₼+${suffix}`;
        }
        if (srv.priceType === 'range') {
            const pMax = parseFloat(srv.priceMax) || p;
            return `${p} – ${pMax} ₼${suffix}`;
        }
        return `${p} ₼${suffix}`;
    },

    renderServiceFilterBarHtml: function() {
        const categories = this.getServiceCategories();
        let activeFilterCount = 0;
        if (this.serviceCategoryFilter !== 'all') activeFilterCount++;
        if (this.serviceGenderFilter !== 'all') activeFilterCount++;
        if (this.serviceOnlineFilter !== 'all') activeFilterCount++;
        if (this.serviceFormatFilter !== 'all') activeFilterCount++;

        const currentCat = categories.find(c => c.id === this.serviceCategoryFilter);

        return `
            <div class="space-y-3">
                <div class="flex items-center gap-2 sm:gap-3">
                    <!-- Search Input -->
                    <div class="relative flex-1">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </span>
                        <input type="text"
                               placeholder="Xidmət və ya təsvir adı ilə axtarın..."
                               value="${this.serviceSearchQuery || ''}"
                               oninput="BusinessDashboardView.handleServiceSearch(this.value)"
                               class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                        ${this.serviceSearchQuery ? `
                            <button type="button" onclick="BusinessDashboardView.handleServiceSearch('')" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer" title="Təmizlə">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                            </button>
                        ` : ''}
                    </div>

                    <!-- Filter Modal Trigger Button -->
                    <button type="button" onclick="BusinessDashboardView.openServiceFilterModal()" class="h-11 px-4 rounded-2xl bg-white border ${activeFilterCount > 0 ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 bg-amber-50/20' : 'border-slate-200/80 hover:border-slate-300'} text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0">
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
                ${(activeFilterCount > 0 || this.serviceSearchQuery) ? `
                    <div class="flex items-center gap-2 flex-wrap pt-1 text-xs">
                        <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                        ${currentCat ? `
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                <span>Kateqoriya: ${currentCat.name}</span>
                                <button type="button" onclick="BusinessDashboardView.serviceCategoryFilter='all'; BusinessDashboardView.refreshServicesTab();" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                            </span>
                        ` : (this.serviceCategoryFilter === 'uncategorized' ? `
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                <span>Kateqoriya: Kateqoriyasız</span>
                                <button type="button" onclick="BusinessDashboardView.serviceCategoryFilter='all'; BusinessDashboardView.refreshServicesTab();" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                            </span>
                        ` : '')}

                        ${this.serviceGenderFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/70 font-semibold text-[11px]">
                                <span>Auditoriya: ${this.getServiceGenderConfig(this.serviceGenderFilter).label}</span>
                                <button type="button" onclick="BusinessDashboardView.serviceGenderFilter='all'; BusinessDashboardView.refreshServicesTab();" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                            </span>
                        ` : ''}

                        ${this.serviceOnlineFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200/70 font-semibold text-[11px]">
                                <span>${this.serviceOnlineFilter === 'online' ? 'Onlayn aktiv' : 'Yalnız salonda'}</span>
                                <button type="button" onclick="BusinessDashboardView.serviceOnlineFilter='all'; BusinessDashboardView.refreshServicesTab();" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                            </span>
                        ` : ''}

                        ${this.serviceFormatFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-900 border border-indigo-200/70 font-semibold text-[11px]">
                                <span>Format: ${this.serviceFormatFilter === 'combo' ? 'Kompleks (Paket)' : (this.serviceFormatFilter === 'group' ? 'Qrup xidməti' : 'Fərdi')}</span>
                                <button type="button" onclick="BusinessDashboardView.serviceFormatFilter='all'; BusinessDashboardView.refreshServicesTab();" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                            </span>
                        ` : ''}

                        ${this.serviceSearchQuery ? `
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-[11px]">
                                <span>Axtarış: "${this.serviceSearchQuery}"</span>
                                <button type="button" onclick="BusinessDashboardView.handleServiceSearch('')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                            </span>
                        ` : ''}

                        <button type="button" onclick="BusinessDashboardView.resetServiceFilters()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer ml-1">
                            Hamısını sıfırla
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    },

    renderServiceCardItemHtml: function(srv, staffList) {
        const genderConf = this.getServiceGenderConfig(srv.gender);
        const isOnline = srv.onlineBooking !== false;
        const assignedStaff = (srv.staffIds || []).map(id => (staffList || []).find(st => st.id === id)).filter(Boolean);

        return `
            <div class="relative group">
                <!-- Tree branch horizontal connector line -->
                <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>

                <div class="p-3 sm:p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/70 hover:bg-white hover:border-slate-300/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <!-- Left Info -->
                <div class="min-w-0 flex-1 flex items-start gap-3">
                    ${((srv.images && srv.images.length > 0) || srv.image) ? `
                        <div class="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100 shadow-2xs">
                            <img src="${(srv.images && srv.images[0]) || srv.image}" class="w-full h-full object-cover">
                            ${(srv.images && srv.images.length > 1) ? `
                                <span class="absolute bottom-0.5 right-0.5 px-1 py-0.2 bg-black/75 text-white text-[8px] font-black rounded">
                                    +${srv.images.length - 1}
                                </span>
                            ` : ''}
                        </div>
                    ` : ''}
                    <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="font-bold text-xs sm:text-sm text-tbank-graphite truncate">${srv.name}</span>
                            ${(srv.serviceFormat === 'combo' || srv.isCombo) ? `
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">
                                    <svg class="w-3 h-3 text-indigo-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                                    <span>Kompleks (${(srv.comboItems && srv.comboItems.length) || 0} xidmət)</span>
                                </span>
                            ` : ''}
                            ${(srv.serviceFormat === 'group' || srv.isGroup) ? `
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-200">
                                    <svg class="w-3 h-3 text-purple-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                                    <span>Qrup (${srv.maxCapacity || 6} nəfər)</span>
                                </span>
                            ` : ''}
                            <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold border ${genderConf.badgeClass}">
                                ${genderConf.label}
                            </span>
                            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${isOnline ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60' : 'bg-slate-100 text-slate-600 border-slate-200/60'}">
                                <span class="w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                                <span>${isOnline ? 'Onlayn qəbul' : 'Salonda'}</span>
                            </span>
                        </div>
                        ${(srv.serviceFormat === 'combo' || srv.isCombo) && srv.comboItems && srv.comboItems.length > 0 ? `
                            <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                                <span class="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100/80">Paket:</span>
                                ${srv.comboItems.map(item => `
                                    <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white border border-indigo-100 text-[10px] text-slate-700 font-medium shadow-2xs">
                                        <span>${item.name}</span>
                                        <span class="text-[9px] text-slate-400">(${item.duration} dəq${item.price !== undefined && item.price !== null ? ' • ' + item.price + ' ₼' : ''})</span>
                                    </span>
                                `).join('')}
                            </div>
                        ` : ''}
                        ${assignedStaff.length > 0 ? `
                            <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                                <span class="text-[10px] text-slate-400 font-medium">Ustalar:</span>
                                ${assignedStaff.map(st => {
                                    const ov = (srv.staffOverrides && srv.staffOverrides[st.id]) || {};
                                    const hasCustomPrice = (ov.price !== undefined && ov.price !== null && ov.price !== '');
                                    const hasCustomDur = (ov.duration !== undefined && ov.duration !== null && ov.duration !== '');
                                    const hasCustomMat = !!(ov.useCustomMaterials && ov.materials && ov.materials.length > 0);
                                    const customBadges = [];
                                    if (hasCustomPrice) customBadges.push(`${ov.price} ₼`);
                                    if (hasCustomDur) customBadges.push(`${ov.duration} dəq`);
                                    const hasAnyCustom = hasCustomPrice || hasCustomDur || hasCustomMat;
                                    return `
                                        <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white border ${hasAnyCustom ? 'border-amber-300 ring-1 ring-amber-200/50' : 'border-slate-200'} text-[10px] text-slate-700 font-medium shadow-2xs" title="${st.role}${customBadges.length ? ' • ' + customBadges.join(', ') : ''}${hasCustomMat ? ' • Fərdi xəritə' : ''}">
                                            <img src="${st.avatar}" class="w-3.5 h-3.5 rounded-full object-cover">
                                            <span>${st.name.split(' ')[0]}</span>
                                            ${customBadges.length > 0 ? `<span class="text-[9px] font-bold text-amber-800 bg-amber-50 px-1 rounded">${customBadges[0]}</span>` : ''}
                                        </span>
                                    `;
                                }).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Prices & Duration & Actions -->
                <div class="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
                    <!-- Duration Chip -->
                    <span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200/80 text-slate-700 flex items-center gap-1.5 shadow-2xs" title="${(srv.breakTime || srv.bufferTime) ? `Xidmət: ${srv.duration || 30} dəq + Fasilə: ${srv.breakTime || srv.bufferTime} dəq (Ümumi: ${(parseInt(srv.duration) || 30) + (parseInt(srv.breakTime || srv.bufferTime) || 0)} dəq)` : `${srv.duration || 30} dəqiqə`}">
                        <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/></svg>
                        <span>${srv.duration || 30} dəq${(srv.breakTime || srv.bufferTime) ? ` <span class="text-[10px] text-amber-700 bg-amber-50 px-1 py-0.5 rounded font-bold border border-amber-200/60">+${srv.breakTime || srv.bufferTime} dəq fasilə</span>` : ''}</span>
                    </span>

                    <!-- Price -->
                    <div class="text-right min-w-[70px]">
                        <div class="font-bold text-xs sm:text-sm text-slate-900">${this.formatServicePrice(srv)}</div>
                        ${srv.priceType === 'from' ? `
                            <div class="text-[9px] text-amber-700 font-medium">başlanğıc</div>
                        ` : (srv.priceType === 'range' ? `
                            <div class="text-[9px] text-blue-700 font-medium">aralıq</div>
                        ` : '')}
                    </div>

                    <!-- Edit / Delete -->
                    <div class="flex items-center gap-1">
                        <button type="button" onclick="BusinessDashboardView.openCreateServiceModal('${srv.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition cursor-pointer" title="Xidməti redaktə et">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                        </button>
                        <button type="button" onclick="BusinessDashboardView.deleteService('${srv.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition cursor-pointer" title="Xidməti sil">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    renderServiceCardsHtml: function() {
        const activeCtx = this.getActiveContext();
        let services = this.getServices().filter(s => {
            if (s.branchId) {
                return s.branchId === activeCtx.branchId || s.branchName === activeCtx.branchName;
            }
            return s.businessName === activeCtx.businessName;
        });

        const categories = this.getServiceCategories();
        const staffList = this.getStaffList();

        // 1. Search Query filter
        if (this.serviceSearchQuery && this.serviceSearchQuery.trim()) {
            const q = this.serviceSearchQuery.toLowerCase().trim();
            services = services.filter(s => {
                const name = (s.name || '').toLowerCase();
                const desc = (s.description || '').toLowerCase();
                return name.includes(q) || desc.includes(q);
            });
        }

        // 2. Category filter
        if (this.serviceCategoryFilter && this.serviceCategoryFilter !== 'all') {
            if (this.serviceCategoryFilter === 'uncategorized') {
                services = services.filter(s => !s.categoryId || s.categoryId === 'uncategorized' || !categories.some(c => c.id === s.categoryId));
            } else {
                services = services.filter(s => s.categoryId === this.serviceCategoryFilter);
            }
        }

        // 3. Gender filter
        if (this.serviceGenderFilter && this.serviceGenderFilter !== 'all') {
            services = services.filter(s => s.gender === this.serviceGenderFilter || s.gender === 'all');
        }

        // 4. Online Booking filter
        if (this.serviceOnlineFilter && this.serviceOnlineFilter !== 'all') {
            if (this.serviceOnlineFilter === 'online') {
                services = services.filter(s => s.onlineBooking !== false);
            } else if (this.serviceOnlineFilter === 'offline') {
                services = services.filter(s => s.onlineBooking === false);
            }
        }

        // 5. Service Format filter (individual vs group vs combo)
        if (this.serviceFormatFilter && this.serviceFormatFilter !== 'all') {
            if (this.serviceFormatFilter === 'combo') {
                services = services.filter(s => s.serviceFormat === 'combo' || s.isCombo);
            } else if (this.serviceFormatFilter === 'group') {
                services = services.filter(s => s.serviceFormat === 'group' || s.isGroup);
            } else if (this.serviceFormatFilter === 'individual') {
                services = services.filter(s => !s.isCombo && !s.isGroup && s.serviceFormat !== 'combo' && s.serviceFormat !== 'group');
            }
        }

        if (services.length === 0) {
            return `
                <div class="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-3 shadow-xs">
                    <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm text-tbank-graphite">Heç bir xidmət tapılmadı</h4>
                        <p class="text-xs text-slate-400 font-medium mt-1">Axtarış və ya filtr meyarlarını dəyişin, yaxud kateqoriya üzrə yeni xidmət əlavə edin</p>
                    </div>
                    <div class="pt-2 flex items-center justify-center gap-2 flex-wrap">
                        <button type="button" onclick="BusinessDashboardView.resetServiceFilters()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition active:scale-95 cursor-pointer">
                            Filtrləri sıfırla
                        </button>
                        ${ZeyvoUI.button({ label: "Yeni xidmət", onClick: "BusinessDashboardView.openCreateServiceModal(null, '')", size: "md", type: "button" })}
                        <button type="button" onclick="BusinessDashboardView.openCreateServiceCategoryModal()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition active:scale-95 cursor-pointer">
                            Yeni kateqoriya
                        </button>
                    </div>
                </div>
            `;
        }

        let html = '';

        categories.forEach(cat => {
            const catServices = services.filter(s => s.categoryId === cat.id);
            if (this.serviceCategoryFilter !== 'all' && this.serviceCategoryFilter !== cat.id) return;
            if (catServices.length === 0 && (this.serviceSearchQuery || this.serviceGenderFilter !== 'all' || this.serviceOnlineFilter !== 'all' || this.serviceFormatFilter !== 'all')) {
                return;
            }

            const isCollapsed = !!this.collapsedServiceCategories[cat.id];

            html += `
                <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    <div class="p-4 sm:p-5 hover:bg-slate-50/50 transition space-y-3">
                        <div class="flex items-center justify-between gap-4">
                            <!-- Left: Chevron + Icon + Name + Badge -->
                            <div class="min-w-0 flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                                    ${this.getCategoryIconSvg(cat.icon, 'w-5 h-5')}
                                </div>
                                <div class="min-w-0">
                                    <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                        <button type="button" onclick="BusinessDashboardView.toggleServiceCategoryCollapse('${cat.id}')" class="w-6 h-6 -ml-1 rounded-lg text-slate-400 hover:text-tbank-graphite hover:bg-slate-100 transition flex items-center justify-center shrink-0 cursor-pointer" title="${isCollapsed ? 'Xidmətləri göstər' : 'Xidmətləri qatla'}">
                                            <svg id="srvCatChevron_${cat.id}" class="w-3.5 h-3.5 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                            </svg>
                                        </button>
                                        <h4 onclick="BusinessDashboardView.toggleServiceCategoryCollapse('${cat.id}')" title="Xidmətləri açmaq/bağlamaq üçün klikləyin" class="font-bold text-sm text-tbank-graphite hover:underline cursor-pointer truncate">
                                            ${cat.name}
                                        </h4>
                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-100/70 text-amber-900 border border-amber-200/50">
                                            ${catServices.length} xidmət
                                        </span>
                                    </div>
                                    ${cat.description ? `
                                        <p class="text-[11px] text-slate-400 font-normal truncate mt-0.5">${cat.description}</p>
                                    ` : ''}
                                </div>
                            </div>

                            <!-- Right: Category Edit & Delete Buttons -->
                            <div class="flex items-center gap-1 shrink-0">
                                <button type="button" onclick="BusinessDashboardView.openCreateServiceCategoryModal('${cat.id}')" class="p-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-white transition text-xs font-medium flex items-center justify-center shadow-2xs cursor-pointer" title="Kateqoriyanı redaktə et">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                                </button>
                                <button type="button" onclick="BusinessDashboardView.deleteServiceCategory('${cat.id}')" class="p-1.5 rounded-xl border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition text-xs font-medium flex items-center justify-center cursor-pointer" title="Kateqoriyanı sil">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Service Rows Inside Category -->
                        <div id="srvCategoryList_${cat.id}" class="${isCollapsed ? 'hidden ' : ''}pt-1 transition-all">
                            <div class="relative ml-2 sm:ml-3 pl-4 sm:pl-5 border-l-2 border-slate-200/90 space-y-2 my-1">
                                ${catServices.length === 0 ? `
                                    <div class="py-3 text-center text-xs text-slate-400 font-medium">Bu kateqoriyaya hələ xidmət əlavə edilməyib.</div>
                                ` : catServices.map(srv => this.renderServiceCardItemHtml(srv, staffList)).join('')}

                                <!-- + Xidmət əlavə et düyməsi (Ağacın son budağı) -->
                                <div class="relative pt-0.5">
                                    <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>
                                    <button type="button" onclick="BusinessDashboardView.openCreateServiceModal(null, '${cat.id}')" class="w-full py-2 px-3 rounded-xl bg-slate-100/90 hover:bg-[#FFDD2D] text-slate-800 hover:text-[#101114] font-medium text-xs transition flex items-center justify-center gap-1.5 active:scale-[0.99] border border-slate-200/80 hover:border-amber-300 shadow-2xs cursor-pointer">
                                        <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                        <span>Xidmət əlavə et</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // 5. Uncategorized Services Section
        const uncategorizedServices = services.filter(s => !s.categoryId || s.categoryId === 'uncategorized' || !categories.some(c => c.id === s.categoryId));

        if (this.serviceCategoryFilter === 'all' || this.serviceCategoryFilter === 'uncategorized') {
            if (uncategorizedServices.length > 0 || this.serviceCategoryFilter === 'uncategorized' || categories.length === 0) {
                const isCollapsed = !!this.collapsedServiceCategories['uncategorized'];

                html += `
                    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                        <div class="p-4 sm:p-5 hover:bg-slate-50/50 transition space-y-3">
                            <div class="flex items-center justify-between gap-4">
                                <!-- Left: Chevron + Icon + Name + Badge -->
                                <div class="min-w-0 flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-700 flex items-center justify-center shrink-0">
                                        <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                            <button type="button" onclick="BusinessDashboardView.toggleServiceCategoryCollapse('uncategorized')" class="w-6 h-6 -ml-1 rounded-lg text-slate-400 hover:text-tbank-graphite hover:bg-slate-100 transition flex items-center justify-center shrink-0 cursor-pointer" title="${isCollapsed ? 'Xidmətləri göstər' : 'Xidmətləri qatla'}">
                                                <svg id="srvCatChevron_uncategorized" class="w-3.5 h-3.5 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            </button>
                                            <h4 onclick="BusinessDashboardView.toggleServiceCategoryCollapse('uncategorized')" title="Xidmətləri açmaq/bağlamaq üçün klikləyin" class="font-bold text-sm text-tbank-graphite hover:underline cursor-pointer truncate">
                                                Kateqoriyasız xidmətlər
                                            </h4>
                                            <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                                ${uncategorizedServices.length} xidmət
                                            </span>
                                        </div>
                                        <p class="text-[11px] text-slate-400 font-normal truncate mt-0.5">Xüsusi kateqoriyaya təyin edilməmiş xidmətlər</p>
                                    </div>
                                </div>

                                <!-- Right: Quick Add Button -->
                                <div class="flex items-center gap-1 shrink-0">
                                    <button type="button" onclick="BusinessDashboardView.openCreateServiceModal(null, '')" class="h-8 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 bg-white transition text-xs font-semibold flex items-center gap-1 shadow-2xs cursor-pointer" title="Kateqoriyasız xidmət əlavə et">
                                        <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                        <span class="hidden sm:inline">Xidmət əlavə et</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Service Rows Inside Uncategorized -->
                            <div id="srvCategoryList_uncategorized" class="${isCollapsed ? 'hidden ' : ''}pt-1 transition-all">
                                <div class="relative ml-2 sm:ml-3 pl-4 sm:pl-5 border-l-2 border-slate-200/90 space-y-2 my-1">
                                    ${uncategorizedServices.length === 0 ? `
                                        <div class="py-3 text-center text-xs text-slate-400 font-medium">Kateqoriyasız heç bir xidmət yoxdur.</div>
                                    ` : uncategorizedServices.map(srv => this.renderServiceCardItemHtml(srv, staffList)).join('')}

                                    <!-- + Kateqoriyasız xidmət əlavə et düyməsi (Ağacın son budağı) -->
                                    <div class="relative pt-0.5">
                                        <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>
                                        <button type="button" onclick="BusinessDashboardView.openCreateServiceModal(null, '')" class="w-full py-2 px-3 rounded-xl bg-slate-100/90 hover:bg-[#FFDD2D] text-slate-800 hover:text-[#101114] font-medium text-xs transition flex items-center justify-center gap-1.5 active:scale-[0.99] border border-slate-200/80 hover:border-amber-300 shadow-2xs cursor-pointer">
                                            <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                            <span>Kateqoriyasız xidmət əlavə et</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        return html;
    },

    // ==========================================
    // SERVICES MODULE METHODS (MODALS, CRUD, EVENTS)
    // ==========================================
    refreshServicesTab: function() {
        const body = document.getElementById('bizCanvasBody');
        if (body && this.activeTab === 'services') {
            body.innerHTML = this.renderServicesTab();
        } else {
            const grid = document.getElementById('srvCardsGrid');
            if (grid) grid.innerHTML = this.renderServiceCardsHtml();
            const bar = document.getElementById('srvFilterBarContainer');
            if (bar) bar.innerHTML = this.renderServiceFilterBarHtml();
        }
    },

    // Category Modal CRUD
    highlightServiceCategoryFormIcon: function(selectedKey) {
        const container = document.getElementById('srvCatIconOptions');
        if (!container) return;
        const buttons = container.querySelectorAll('button[data-icon]');
        buttons.forEach(b => {
            const key = b.getAttribute('data-icon');
            if (key === selectedKey) {
                b.className = 'w-9 h-9 rounded-xl border-2 border-slate-900 bg-white text-slate-950 transition flex items-center justify-center shadow-xs scale-105 cursor-pointer';
            } else {
                b.className = 'w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer';
            }
        });
    },

    selectServiceCategoryFormIcon: function(iconKey, btnEl) {
        const input = document.getElementById('srvCategoryFormIcon');
        if (input) input.value = iconKey;
        this.highlightServiceCategoryFormIcon(iconKey);
    },

    openCreateServiceCategoryModal: function(editCatId) {
        const modal = document.getElementById('bizCreateServiceCategoryModal');
        if (!modal) return;

        const editIdInput = document.getElementById('srvCategoryFormEditId');
        const titleEl = document.getElementById('srvCategoryModalTitle');
        const submitBtn = document.getElementById('srvCategoryModalSubmitBtn');
        const nameInput = document.getElementById('srvCategoryFormName');
        const iconInput = document.getElementById('srvCategoryFormIcon');
        const descInput = document.getElementById('srvCategoryFormDesc');

        let selectedIcon = 'scissors';

        if (editCatId) {
            const categories = this.getServiceCategories();
            const cat = categories.find(c => c.id === editCatId);
            if (cat) {
                selectedIcon = cat.icon || 'scissors';
                if (editIdInput) editIdInput.value = cat.id;
                if (titleEl) titleEl.textContent = 'Kateqoriyanı redaktə et';
                if (submitBtn) submitBtn.textContent = 'Dəyişiklikləri saxla';
                if (nameInput) nameInput.value = cat.name || '';
                if (iconInput) iconInput.value = selectedIcon;
                if (descInput) descInput.value = cat.description || '';
            }
        } else {
            if (editIdInput) editIdInput.value = '';
            if (titleEl) titleEl.textContent = 'Yeni xidmət kateqoriyası';
            if (submitBtn) submitBtn.textContent = 'Kateqoriyanı saxla';
            if (nameInput) nameInput.value = '';
            if (iconInput) iconInput.value = 'scissors';
            if (descInput) descInput.value = '';
        }

        this.highlightServiceCategoryFormIcon(selectedIcon);
        modal.classList.remove('hidden');
        if (nameInput) nameInput.focus();
    },

    closeCreateServiceCategoryModal: function() {
        const modal = document.getElementById('bizCreateServiceCategoryModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveServiceCategory: function(e) {
        if (e && e.preventDefault) e.preventDefault();
        const editIdInput = document.getElementById('srvCategoryFormEditId');
        const nameInput = document.getElementById('srvCategoryFormName');
        const iconInput = document.getElementById('srvCategoryFormIcon');
        const descInput = document.getElementById('srvCategoryFormDesc');

        const editId = editIdInput ? editIdInput.value.trim() : '';
        const name = nameInput ? nameInput.value.trim() : '';
        const icon = iconInput ? iconInput.value.trim() : 'scissors';
        const desc = descInput ? descInput.value.trim() : '';

        if (!name) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa kateqoriya adını daxil edin');
            return;
        }

        const categories = this.getServiceCategories();

        if (editId) {
            const idx = categories.findIndex(c => c.id === editId);
            if (idx !== -1) {
                categories[idx].name = name;
                categories[idx].icon = icon;
                categories[idx].description = desc;
                this.saveServiceCategories(categories);
                if (typeof App !== 'undefined') App.showToast('Kateqoriya yeniləndi!');
            }
        } else {
            const newCat = {
                id: 'scat_' + Date.now(),
                name: name,
                icon: icon,
                description: desc,
                createdAt: new Date().toISOString()
            };
            categories.push(newCat);
            this.saveServiceCategories(categories);
            if (typeof App !== 'undefined') App.showToast('Yeni kateqoriya yaradıldı!');
        }

        this.closeCreateServiceCategoryModal();
        this.refreshServicesTab();
    },

    deleteServiceCategory: function(catId) {
        const categories = this.getServiceCategories();
        const cat = categories.find(c => c.id === catId);
        if (!cat) return;

        const services = this.getServices();
        const attachedServices = services.filter(s => s.categoryId === catId);

        const confirmMsg = attachedServices.length > 0
            ? `<strong>"${cat.name}"</strong> kateqoriyasını silmək istədiyinizə əminsiniz?<br><span class="text-amber-600 mt-1.5 inline-block text-xs">Bu kateqoriyada <strong>${attachedServices.length} xidmət</strong> var. Onlar silinməyəcək, "Kateqoriyasız xidmətlər" bölməsinə keçiriləcək.</span>`
            : `<strong>"${cat.name}"</strong> kateqoriyasını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`;

        this.openDeleteConfirmModal({
            title: 'Kateqoriyanı sil',
            message: confirmMsg,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const remainingCats = categories.filter(c => c.id !== catId);
                this.saveServiceCategories(remainingCats);

                if (attachedServices.length > 0) {
                    const updatedServices = services.map(s => {
                        if (s.categoryId === catId) {
                            return { ...s, categoryId: null };
                        }
                        return s;
                    });
                    this.saveServices(updatedServices);
                }

                if (typeof App !== 'undefined') App.showToast('Kateqoriya silindi!');
                this.refreshServicesTab();
            }
        });
    },

    // Service Modal CRUD
    selectedServiceStaffIds: [],

    selectServiceFormPriceType: function(type) {
        const input = document.getElementById('srvFormPriceType');
        if (input) input.value = type;

        const btnFixed = document.getElementById('srvFormPriceTypeBtn_fixed');
        const btnFrom = document.getElementById('srvFormPriceTypeBtn_from');
        const btnRange = document.getElementById('srvFormPriceTypeBtn_range');
        const maxWrap = document.getElementById('srvFormPriceMaxWrap');
        const priceLabel = document.getElementById('srvFormPriceLabel');

        const activeClass = 'h-9 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold transition flex items-center justify-center shadow-xs cursor-pointer';
        const inactiveClass = 'h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer';

        if (btnFixed) btnFixed.className = type === 'fixed' ? activeClass : inactiveClass;
        if (btnFrom) btnFrom.className = type === 'from' ? activeClass : inactiveClass;
        if (btnRange) btnRange.className = type === 'range' ? activeClass : inactiveClass;

        if (maxWrap) {
            if (type === 'range') maxWrap.classList.remove('hidden');
            else maxWrap.classList.add('hidden');
        }

        const format = document.getElementById('srvFormFormat')?.value || 'individual';
        const isGroup = (format === 'group');
        const isCombo = !!document.getElementById('srvFormIsCombo')?.checked;

        if (priceLabel) {
            if (type === 'from') priceLabel.textContent = isGroup ? (isCombo ? 'Qrup paketi üçün başlanğıc qiymət (₼) *' : '1 nəfər üçün başlanğıc qiymət (₼) *') : (isCombo ? 'Paket üçün başlanğıc qiymət (₼) *' : 'Başlanğıc qiymət (₼) *');
            else if (type === 'range') priceLabel.textContent = isGroup ? (isCombo ? 'Qrup paketi üçün min. qiymət (₼) *' : '1 nəfər üçün min. qiymət (₼) *') : (isCombo ? 'Paket üçün min. qiymət (₼) *' : 'Minimum qiymət (₼) *');
            else priceLabel.textContent = isGroup ? (isCombo ? 'Qrup paketi qiyməti (₼) *' : '1 nəfər üçün qiymət (₼) *') : (isCombo ? 'Paket qiyməti (₼) *' : 'Qiymət (₼) *');
        }
    },

    selectedComboServices: [],

    selectServiceFormFormat: function(format) {
        const input = document.getElementById('srvFormFormat');
        if (input) input.value = format;

        const btnInd = document.getElementById('srvFormFormatBtn_individual');
        const btnGrp = document.getElementById('srvFormFormatBtn_group');
        const grpWrap = document.getElementById('srvFormGroupSettingsWrap');

        const activeClass = 'h-9 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-xs';
        const inactiveClass = 'h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center gap-1.5 cursor-pointer text-xs';

        if (btnInd) btnInd.className = format === 'individual' ? activeClass : inactiveClass;
        if (btnGrp) btnGrp.className = format === 'group' ? activeClass : inactiveClass;

        if (grpWrap) {
            if (format === 'group') grpWrap.classList.remove('hidden');
            else grpWrap.classList.add('hidden');
        }

        const priceType = document.getElementById('srvFormPriceType')?.value || 'fixed';
        this.selectServiceFormPriceType(priceType);
    },

    toggleServiceFormIsCombo: function() {
        const checkbox = document.getElementById('srvFormIsCombo');
        if (!checkbox) return;
        checkbox.checked = !checkbox.checked;
        this.onServiceFormIsComboChange(checkbox.checked);
    },

    onServiceFormIsComboChange: function(isChecked) {
        const cmbWrap = document.getElementById('srvFormComboSettingsWrap');
        const countBadge = document.getElementById('srvComboItemCountBadge');
        if (cmbWrap) {
            if (isChecked) {
                cmbWrap.classList.remove('hidden');
                this.renderComboItemsList();
            } else {
                cmbWrap.classList.add('hidden');
            }
        }
        if (countBadge) {
            const count = (this.selectedComboServices || []).length;
            countBadge.classList.toggle('hidden', !isChecked || count === 0);
            countBadge.textContent = `${count} xidmət`;
        }
        const priceType = document.getElementById('srvFormPriceType')?.value || 'fixed';
        this.selectServiceFormPriceType(priceType);
    },

    populateComboSelectOptions: function(excludeSrvId = null) {
        const select = document.getElementById('comboItemSelectService');
        if (!select) return;
        const allServices = this.getServices().filter(s => (!excludeSrvId || s.id !== excludeSrvId) && s.serviceFormat !== 'combo' && s.serviceFormat !== 'group_combo' && !s.isCombo);
        if (allServices.length === 0) {
            select.innerHTML = '<option value="">(Əlavə etmək üçün heç bir xidmət tapılmadı)</option>';
            return;
        }
        let opts = `<option value="">-- Kataloqdan xidmət seçin --</option>`;
        allServices.forEach(s => {
            const dur = s.duration || 30;
            const price = s.price || 0;
            opts += `<option value="${s.id}">${s.name} (${dur} dəq • ${price} ₼)</option>`;
        });
        select.innerHTML = opts;
    },

    openComboItemModal: function(editIndex = -1) {
        const modal = document.getElementById('bizComboItemModal');
        if (!modal) return;

        const editId = document.getElementById('srvFormEditId')?.value || null;
        this.populateComboSelectOptions(editId);

        const titleEl = document.getElementById('comboItemModalTitle');
        const subEl = document.getElementById('comboItemModalSubtitle');
        const submitBtn = document.getElementById('comboItemSubmitBtn');
        const indexInput = document.getElementById('comboItemEditIndex');
        const selectWrap = document.getElementById('comboItemSelectWrap');
        const selectEl = document.getElementById('comboItemSelectService');
        const durInput = document.getElementById('comboItemDurationInput');
        const priceInput = document.getElementById('comboItemPriceInput');

        if (indexInput) indexInput.value = editIndex;

        const items = this.selectedComboServices || [];

        if (editIndex >= 0 && items[editIndex]) {
            // EDIT MODE
            const item = items[editIndex];
            if (titleEl) titleEl.textContent = 'Paket xidmətini redaktə et';
            if (subEl) subEl.textContent = 'Xidmətin paket üçün müddət və qiymətini təyin edin';
            if (submitBtn) submitBtn.textContent = 'Dəyişiklikləri saxla';

            if (selectEl) selectEl.value = item.serviceId;
            if (selectWrap) selectWrap.classList.add('hidden');

            if (durInput) durInput.value = item.duration;
            if (priceInput) priceInput.value = item.price;

            this.showComboItemInfoCard(item.name, item.originalDuration || item.duration, item.originalPrice || item.price);
        } else {
            // ADD MODE
            if (titleEl) titleEl.textContent = 'Paketə xidmət əlavə et';
            if (subEl) subEl.textContent = 'Xidməti seçin, paket üçün fərdi müddət və qiymət təyin edin';
            if (submitBtn) submitBtn.textContent = 'Paketə əlavə et';

            if (selectWrap) selectWrap.classList.remove('hidden');
            if (selectEl) selectEl.value = '';

            const infoCard = document.getElementById('comboItemServiceInfoCard');
            if (infoCard) infoCard.classList.add('hidden');

            if (durInput) durInput.value = 30;
            if (priceInput) priceInput.value = 0;
        }

        this.onComboModalInputsChanged();
        modal.classList.remove('hidden');
    },

    closeComboItemModal: function() {
        const modal = document.getElementById('bizComboItemModal');
        if (modal) modal.classList.add('hidden');
    },

    showComboItemInfoCard: function(name, originalDur, originalPrice) {
        const infoCard = document.getElementById('comboItemServiceInfoCard');
        const nameEl = document.getElementById('comboItemInfoName');
        const durEl = document.getElementById('comboItemInfoOriginalDur');
        const priceEl = document.getElementById('comboItemInfoOriginalPrice');

        if (nameEl) nameEl.textContent = name;
        if (durEl) durEl.textContent = `${originalDur} dəq`;
        if (priceEl) priceEl.textContent = `${originalPrice} ₼`;
        if (infoCard) {
            infoCard.dataset.originalDur = originalDur;
            infoCard.dataset.originalPrice = originalPrice;
            infoCard.dataset.name = name;
            infoCard.classList.remove('hidden');
        }
    },

    onComboModalServiceSelected: function() {
        const select = document.getElementById('comboItemSelectService');
        if (!select || !select.value) {
            const infoCard = document.getElementById('comboItemServiceInfoCard');
            if (infoCard) infoCard.classList.add('hidden');
            return;
        }

        const srvId = select.value;
        const allServices = this.getServices();
        const found = allServices.find(s => s.id === srvId);
        if (!found) return;

        const dur = parseInt(found.duration) || 30;
        const price = parseFloat(found.price) || 0;

        const durInput = document.getElementById('comboItemDurationInput');
        const priceInput = document.getElementById('comboItemPriceInput');
        if (durInput) durInput.value = dur;
        if (priceInput) priceInput.value = price;

        this.showComboItemInfoCard(found.name, dur, price);
        this.onComboModalInputsChanged();
    },

    adjustComboModalDuration: function(delta) {
        const input = document.getElementById('comboItemDurationInput');
        if (!input) return;
        let cur = parseInt(input.value) || 30;
        cur = Math.max(5, Math.min(720, cur + delta));
        input.value = cur;
        this.onComboModalInputsChanged();
    },

    setComboModalDuration: function(mins) {
        const input = document.getElementById('comboItemDurationInput');
        if (input) input.value = mins;
        this.onComboModalInputsChanged();
    },

    resetComboItemDurationToOriginal: function() {
        const infoCard = document.getElementById('comboItemServiceInfoCard');
        const origDur = infoCard ? parseInt(infoCard.dataset.originalDur) : 30;
        const input = document.getElementById('comboItemDurationInput');
        if (input && origDur) {
            input.value = origDur;
            this.onComboModalInputsChanged();
        }
    },

    setComboModalPrice: function(price) {
        const input = document.getElementById('comboItemPriceInput');
        if (input) input.value = price;
        this.onComboModalInputsChanged();
    },

    applyComboPriceDiscount: function(percent) {
        const infoCard = document.getElementById('comboItemServiceInfoCard');
        const origPrice = infoCard ? (parseFloat(infoCard.dataset.originalPrice) || 0) : 0;
        const input = document.getElementById('comboItemPriceInput');
        if (input) {
            const discounted = Math.max(0, origPrice * (1 - percent / 100));
            input.value = Math.round(discounted * 100) / 100;
            this.onComboModalInputsChanged();
        }
    },

    resetComboItemPriceToOriginal: function() {
        const infoCard = document.getElementById('comboItemServiceInfoCard');
        const origPrice = infoCard ? (parseFloat(infoCard.dataset.originalPrice) || 0) : 0;
        const input = document.getElementById('comboItemPriceInput');
        if (input) {
            input.value = origPrice;
            this.onComboModalInputsChanged();
        }
    },

    onComboModalInputsChanged: function() {
        const infoCard = document.getElementById('comboItemServiceInfoCard');
        const origDur = infoCard && infoCard.dataset.originalDur !== undefined ? parseInt(infoCard.dataset.originalDur) : null;
        const origPrice = infoCard && infoCard.dataset.originalPrice !== undefined ? parseFloat(infoCard.dataset.originalPrice) : null;

        const durInput = document.getElementById('comboItemDurationInput');
        const priceInput = document.getElementById('comboItemPriceInput');
        const resetDurBtn = document.getElementById('comboItemResetDurBtn');
        const resetPriceBtn = document.getElementById('comboItemResetPriceBtn');
        const discountBadge = document.getElementById('comboItemDiscountBadge');

        const curDur = parseInt(durInput ? durInput.value : 0) || 0;
        const curPrice = parseFloat(priceInput ? priceInput.value : 0) || 0;

        if (resetDurBtn && origDur !== null) {
            if (curDur !== origDur) resetDurBtn.classList.remove('hidden');
            else resetDurBtn.classList.add('hidden');
        }

        if (resetPriceBtn && origPrice !== null) {
            if (curPrice !== origPrice) resetPriceBtn.classList.remove('hidden');
            else resetPriceBtn.classList.add('hidden');
        }

        if (discountBadge && origPrice !== null) {
            if (curPrice < origPrice) {
                const diff = origPrice - curPrice;
                const pct = origPrice > 0 ? Math.round((diff / origPrice) * 100) : 0;
                discountBadge.innerHTML = `<span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">Endirim: -${diff.toFixed(2).replace(/\.00$/, '')} ₼ (-${pct}%)</span>`;
            } else if (curPrice > origPrice) {
                const diff = curPrice - origPrice;
                discountBadge.innerHTML = `<span class="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">Fərq: +${diff.toFixed(2).replace(/\.00$/, '')} ₼</span>`;
            } else {
                discountBadge.innerHTML = `<span class="text-slate-500 font-medium">Əsas qiymət tətbiq olunub (${origPrice} ₼)</span>`;
            }
        }
    },

    saveComboItemFromModal: function() {
        const indexInput = document.getElementById('comboItemEditIndex');
        const editIndex = parseInt(indexInput ? indexInput.value : -1);

        const select = document.getElementById('comboItemSelectService');
        const durInput = document.getElementById('comboItemDurationInput');
        const priceInput = document.getElementById('comboItemPriceInput');

        if (!this.selectedComboServices) this.selectedComboServices = [];

        let srvId = '';
        let srvName = '';
        let origDur = 30;
        let origPrice = 0;

        if (editIndex >= 0 && this.selectedComboServices[editIndex]) {
            const existing = this.selectedComboServices[editIndex];
            srvId = existing.serviceId;
            srvName = existing.name;
            origDur = existing.originalDuration !== undefined ? existing.originalDuration : existing.duration;
            origPrice = existing.originalPrice !== undefined ? existing.originalPrice : existing.price;
        } else {
            if (!select || !select.value) {
                if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa əlavə etmək üçün xidmət seçin');
                return;
            }
            srvId = select.value;
            const allServices = this.getServices();
            const found = allServices.find(s => s.id === srvId);
            if (!found) return;

            const alreadyExists = this.selectedComboServices.some(item => item.serviceId === srvId);
            if (alreadyExists) {
                if (typeof App !== 'undefined') App.showToast('Bu xidmət artıq paketə əlavə edilib');
                return;
            }

            srvName = found.name;
            origDur = parseInt(found.duration) || 30;
            origPrice = parseFloat(found.price) || 0;
        }

        const customDur = Math.max(5, parseInt(durInput ? durInput.value : origDur) || origDur);
        const customPrice = Math.max(0, parseFloat(priceInput ? priceInput.value : origPrice) || 0);

        const itemObj = {
            serviceId: srvId,
            name: srvName,
            originalDuration: origDur,
            originalPrice: origPrice,
            duration: customDur,
            price: customPrice
        };

        if (editIndex >= 0 && this.selectedComboServices[editIndex]) {
            this.selectedComboServices[editIndex] = itemObj;
            if (typeof App !== 'undefined') App.showToast('Paket xidməti yeniləndi!');
        } else {
            this.selectedComboServices.push(itemObj);
            if (typeof App !== 'undefined') App.showToast('Xidmət paketə əlavə edildi!');
        }

        this.closeComboItemModal();
        this.renderComboItemsList();
    },

    removeComboService: function(index) {
        if (!this.selectedComboServices) return;
        this.selectedComboServices.splice(index, 1);
        this.renderComboItemsList();
    },

    renderComboItemsList: function() {
        const container = document.getElementById('srvComboItemsContainer');
        const countBadge = document.getElementById('srvComboItemCountBadge');
        const summaryBar = document.getElementById('srvComboSummaryBar');
        const durText = document.getElementById('srvComboTotalDurationText');
        const priceText = document.getElementById('srvComboTotalPriceText');
        const hintEl = document.getElementById('srvComboSavingsHint');

        if (!container) return;

        const items = this.selectedComboServices || [];
        if (countBadge) countBadge.textContent = `${items.length} xidmət`;

        if (items.length === 0) {
            container.innerHTML = `
                <div class="py-4 px-4 rounded-xl border border-dashed border-indigo-200 bg-white/70 text-center text-xs text-indigo-900/60 font-medium">
                    Paketə hələ heç bir xidmət əlavə edilməyib. Yuxarıdakı "+ Paketə xidmət əlavə et" düyməsinə klikləyin.
                </div>
            `;
            if (summaryBar) summaryBar.classList.add('hidden');
            return;
        }

        let totalDuration = 0;
        let totalPrice = 0;
        let totalOriginalPrice = 0;

        const html = items.map((item, index) => {
            const dur = parseInt(item.duration) || 0;
            const pr = parseFloat(item.price) || 0;
            const origDur = item.originalDuration !== undefined ? parseInt(item.originalDuration) : dur;
            const origPr = item.originalPrice !== undefined ? parseFloat(item.originalPrice) : pr;

            totalDuration += dur;
            totalPrice += pr;
            totalOriginalPrice += origPr;

            const isCustomDur = dur !== origDur;
            const isCustomPrice = pr !== origPr;

            return `
                <div class="p-2.5 sm:p-3 rounded-xl bg-white border border-indigo-200/80 shadow-2xs flex items-center justify-between gap-3 hover:border-indigo-300 transition">
                    <div class="min-w-0 flex items-center gap-2.5 flex-1 cursor-pointer" onclick="BusinessDashboardView.openComboItemModal(${index})" title="Fərdi müddət və qiyməti dəyişmək üçün klikləyin">
                        <span class="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-black flex items-center justify-center shrink-0">${index + 1}</span>
                        <div class="min-w-0 flex-1">
                            <div class="flex items-center gap-2 flex-wrap">
                                <h5 class="text-xs font-bold text-slate-800 truncate">${item.name}</h5>
                                ${(isCustomDur || isCustomPrice) ? `
                                    <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">Fərdi parametr</span>
                                ` : ''}
                            </div>
                            <div class="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5 flex-wrap">
                                <span>Müddət: <strong class="text-slate-800 font-bold">${dur} dəq</strong>${isCustomDur ? ` <span class="text-slate-400 line-through text-[9px]">(${origDur} dəq)</span>` : ''}</span>
                                <span>•</span>
                                <span>Qiymət: <strong class="text-slate-800 font-bold">${pr} ₼</strong>${isCustomPrice ? ` <span class="text-slate-400 line-through text-[9px]">(${origPr} ₼)</span>` : ''}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-1 shrink-0">
                        <button type="button" onclick="BusinessDashboardView.openComboItemModal(${index})" class="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer" title="Müddət və qiyməti redaktə et">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                        </button>
                        <button type="button" onclick="BusinessDashboardView.removeComboService(${index})" class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer" title="Paketdən çıxart">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;

        if (summaryBar) {
            summaryBar.classList.remove('hidden');
            const hours = Math.floor(totalDuration / 60);
            const mins = totalDuration % 60;
            const durFormatted = `${totalDuration} dəq${hours > 0 ? ` (${hours} saat${mins > 0 ? ' ' + mins + ' dəq' : ''})` : ''}`;
            if (durText) durText.textContent = durFormatted;
            if (priceText) priceText.textContent = `${totalPrice.toFixed(2).replace(/\.00$/, '')} ₼`;
            if (hintEl) {
                if (totalPrice < totalOriginalPrice) {
                    const diff = totalOriginalPrice - totalPrice;
                    hintEl.textContent = `Fərdi qiymətlərin cəmi: ${totalPrice} ₼ (Kataloq qiyməti: ${totalOriginalPrice} ₼, Qənaət: ${diff.toFixed(2).replace(/\.00$/, '')} ₼)`;
                } else {
                    hintEl.textContent = `Ayrı-ayrılıqda cəmi: ${totalPrice} ₼. Müştərilər üçün endirimli paket qiyməti təyin edə bilərsiniz.`;
                }
            }
        }
    },

    applyComboCalculationsToForm: function() {
        if (!this.selectedComboServices || this.selectedComboServices.length === 0) return;
        const totalDuration = this.selectedComboServices.reduce((sum, s) => sum + (parseInt(s.duration) || 0), 0);
        const totalPrice = this.selectedComboServices.reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0);

        const durInput = document.getElementById('srvFormDuration');
        const priceInput = document.getElementById('srvFormPrice');

        if (durInput) durInput.value = totalDuration;
        if (priceInput) priceInput.value = totalPrice;

        this.updateServiceTotalTimePreview();
        if (typeof App !== 'undefined') App.showToast('Müddət və cəmi qiymət formaya tətbiq edildi!');
    },

    setServiceFormCapacity: function(val) {
        const input = document.getElementById('srvFormMaxCapacity');
        if (input) input.value = Math.max(2, Math.min(100, parseInt(val) || 6));
    },

    adjustServiceFormCapacity: function(delta) {
        const input = document.getElementById('srvFormMaxCapacity');
        if (!input) return;
        let cur = parseInt(input.value) || 6;
        cur = Math.max(2, Math.min(100, cur + delta));
        input.value = cur;
    },

    setServiceFormDuration: function(mins) {
        const input = document.getElementById('srvFormDuration');
        if (input) input.value = mins;
        this.updateServiceTotalTimePreview();
    },

    adjustServiceFormDuration: function(delta) {
        const input = document.getElementById('srvFormDuration');
        if (!input) return;
        let cur = parseInt(input.value) || 45;
        cur = Math.max(5, Math.min(720, cur + delta));
        input.value = cur;
        this.updateServiceTotalTimePreview();
    },

    setServiceFormBuffer: function(mins) {
        const input = document.getElementById('srvFormBufferTime');
        if (input) input.value = mins;
        this.updateServiceTotalTimePreview();
    },

    adjustServiceFormBuffer: function(delta) {
        const input = document.getElementById('srvFormBufferTime');
        if (!input) return;
        let cur = parseInt(input.value) || 0;
        cur = Math.max(0, Math.min(180, cur + delta));
        input.value = cur;
        this.updateServiceTotalTimePreview();
    },

    updateServiceTotalTimePreview: function() {
        const durInput = document.getElementById('srvFormDuration');
        const bufInput = document.getElementById('srvFormBufferTime');
        const badge = document.getElementById('srvFormTotalTimeBadge');

        const duration = parseInt(durInput ? durInput.value : 45) || 45;
        const buffer = parseInt(bufInput ? bufInput.value : 0) || 0;

        [15, 30, 45, 60, 90, 120].forEach(d => {
            const btn = document.getElementById(`srvFormDurBtn_${d}`);
            if (btn) {
                if (d === duration) {
                    btn.className = 'h-6 rounded-lg bg-slate-900 text-white font-bold text-[10px] transition cursor-pointer flex items-center justify-center shadow-xs';
                } else {
                    btn.className = 'h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 font-semibold text-[10px] transition cursor-pointer flex items-center justify-center';
                }
            }
        });

        [0, 5, 10, 15, 20, 30].forEach(b => {
            const btn = document.getElementById(`srvFormBufferBtn_${b}`);
            if (btn) {
                if (b === buffer) {
                    btn.className = 'h-6 rounded-lg bg-slate-900 text-white font-bold text-[10px] transition cursor-pointer flex items-center justify-center shadow-xs';
                } else {
                    btn.className = 'h-6 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-slate-700 font-semibold text-[10px] transition cursor-pointer flex items-center justify-center';
                }
            }
        });

        if (badge) {
            if (buffer > 0) {
                badge.innerHTML = `Cəmi: <b>${duration + buffer} dəq</b> <span class="hidden sm:inline font-normal text-slate-600 text-[10px]">(${duration}+${buffer})</span>`;
            } else {
                badge.innerHTML = `Cəmi: <b>${duration} dəq</b>`;
            }
        }
    },

    selectServiceFormGender: function(gender) {
        const input = document.getElementById('srvFormGender');
        if (input) input.value = gender;

        ['all', 'women', 'men', 'kids'].forEach(g => {
            const btn = document.getElementById(`srvFormGenderBtn_${g}`);
            if (btn) {
                if (g === gender) {
                    btn.className = 'h-9 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold transition flex items-center justify-center shadow-xs cursor-pointer';
                } else {
                    btn.className = 'h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer';
                }
            }
        });
    },

    // Service Work Images / Portfolio
    serviceFormImages: [],

    renderServiceFormImages: function() {
        const grid = document.getElementById('srvFormImagesGrid');
        const countBadge = document.getElementById('srvFormImageCountBadge');
        const galleryCount = document.getElementById('srvFormGalleryCount');
        const clearBtn = document.getElementById('btnClearAllServicePhotos');

        const total = (this.serviceFormImages || []).length;
        if (countBadge) {
            countBadge.textContent = total === 1 ? '1 şəkil' : `${total} şəkil`;
        }
        if (galleryCount) galleryCount.textContent = total;
        if (clearBtn) clearBtn.classList.toggle('hidden', total === 0);

        if (!grid) return;

        if (total === 0) {
            grid.innerHTML = `
                <div class="col-span-2 sm:col-span-3 py-6 text-center text-slate-400 bg-slate-50/80 rounded-2xl border border-dashed border-slate-200">
                    <p class="text-xs font-medium">Hələ heç bir iş şəkli əlavə edilməyib</p>
                    <p class="text-[11px] text-slate-400 mt-0.5">Yuxarıdakı sahə ilə xidmət üzrə işlərin fotolarını yükləyə bilərsiniz</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.serviceFormImages.map((imgUrl, idx) => {
            const isCover = idx === 0;
            return `
                <div class="relative group rounded-xl overflow-hidden border ${isCover ? 'border-amber-400 ring-2 ring-amber-300/40' : 'border-slate-200'} bg-slate-100 aspect-video shadow-2xs">
                    <img src="${imgUrl}" alt="İş şəkli" class="w-full h-full object-cover">
                    <!-- Overlay with controls -->
                    <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                        ${!isCover ? `
                            <button type="button" onclick="BusinessDashboardView.setServiceCoverImage(${idx})" class="p-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-800 transition shadow-sm cursor-pointer" title="Əsas şəkil et">
                                <svg class="w-4 h-4 text-amber-500 fill-amber-500" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            </button>
                        ` : ''}
                        <button type="button" onclick="BusinessDashboardView.removeServiceImage(${idx})" class="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition shadow-sm cursor-pointer" title="Şəkli sil">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                    <!-- Cover badge -->
                    ${isCover ? `
                        <div class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-bold shadow-xs pointer-events-none flex items-center gap-1">
                            <svg class="w-3 h-3 text-slate-950 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            <span>Əsas</span>
                        </div>
                    ` : ''}
                    <!-- Mobile delete button -->
                    <div class="absolute top-1.5 right-1.5 sm:hidden">
                        <button type="button" onclick="BusinessDashboardView.removeServiceImage(${idx})" class="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs" title="Sil">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    clearAllServiceImages: function() {
        this.openDeleteConfirmModal({
            title: 'Şəkilləri sil',
            message: `<strong>Bütün iş şəkilləri</strong> silinsin?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            confirmClass: 'bg-red-600 hover:bg-red-700 text-white font-semibold',
            onConfirm: () => {
                this.serviceFormImages = [];
                this.renderServiceFormImages();
                this.renderServiceModalTabs();
            }
        });
    },

    handleServiceImageUpload: function(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        let processed = 0;
        files.forEach(file => {
            if (!file.type.startsWith('image/')) {
                processed++;
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                if (!this.serviceFormImages) this.serviceFormImages = [];
                this.serviceFormImages.push(event.target.result);
                processed++;
                if (processed === files.length) {
                    this.renderServiceFormImages();
                    this.renderServiceModalTabs();
                }
            };
            reader.readAsDataURL(file);
        });
        e.target.value = '';
    },

    addServiceImageByUrl: function() {
        const input = document.getElementById('srvFormImageUrlInput');
        const url = (input?.value || '').trim();
        if (!url) return;
        if (!this.serviceFormImages) this.serviceFormImages = [];
        this.serviceFormImages.push(url);
        if (input) input.value = '';
        this.renderServiceFormImages();
        this.renderServiceModalTabs();
    },

    removeServiceImage: function(idx) {
        if (!this.serviceFormImages) return;
        this.serviceFormImages.splice(idx, 1);
        this.renderServiceFormImages();
        this.renderServiceModalTabs();
    },

    setServiceCoverImage: function(idx) {
        if (!this.serviceFormImages || !this.serviceFormImages[idx]) return;
        const target = this.serviceFormImages.splice(idx, 1)[0];
        this.serviceFormImages.unshift(target);
        this.renderServiceFormImages();
    },

    activeServiceModalTab: 'general',

    renderServiceModalTabs: function() {
        const container = document.getElementById('bizServiceTabsContainer');
        if (!container) return;
        const staffCount = (this.selectedServiceStaffIds || []).length;
        const resCount = (this.selectedServiceResourceIds || []).length;
        const matCount = (this.selectedServiceMaterials || []).length;
        const photoCount = (this.serviceFormImages || []).length;
        const langCount = (this.activeServiceLanguages || []).length;

        const tabs = [
            { id: 'general', label: 'Əsas məlumatlar' },
            { id: 'online', label: 'Onlayn qəbul', badge: photoCount > 0 ? photoCount : null },
            { id: 'staff', label: 'Ustalar', badge: staffCount > 0 ? staffCount : null },
            { id: 'resources', label: 'Resurslar', badge: resCount > 0 ? resCount : null },
            { id: 'materials', label: 'Materiallar', badge: matCount > 0 ? matCount : null },
            { id: 'languages', label: 'Dillər', badge: langCount > 0 ? langCount : null },
            { id: 'notifications', label: 'Bildirişlər' }
        ];
        const activeId = this.activeServiceModalTab || 'general';

        container.innerHTML = `
            <div class="flex rounded-xl bg-slate-100 p-1 gap-1 overflow-x-auto no-scrollbar shadow-2xs">
                ${tabs.map(t => {
                    const isActive = t.id === activeId;
                    const activeClass = 'bg-white shadow-xs text-slate-900 font-bold';
                    const inactiveClass = 'text-slate-500 hover:text-slate-900 font-semibold';
                    const badgeHtml = (t.badge !== undefined && t.badge !== null)
                        ? `<span class="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-200 text-slate-600'} font-black">${t.badge}</span>`
                        : '';
                    return `
                        <button type="button" onclick="BusinessDashboardView.switchServiceModalTab('${t.id}')" class="shrink-0 py-2 px-3 rounded-lg text-xs transition flex items-center justify-center whitespace-nowrap text-center ${isActive ? activeClass : inactiveClass} cursor-pointer">
                            <span>${t.label}</span>
                            ${badgeHtml}
                        </button>
                    `;
                }).join('')}
            </div>
        `;
    },

    switchServiceModalTab: function(tabKey) {
        this.activeServiceModalTab = tabKey;
        this.renderServiceModalTabs();
        const tabs = ['general', 'online', 'staff', 'resources', 'materials', 'languages', 'notifications'];
        tabs.forEach(t => {
            const pane = document.getElementById(`srvPane_${t}`);
            if (pane) {
                if (t === tabKey) {
                    pane.classList.remove('hidden');
                } else {
                    pane.classList.add('hidden');
                }
            }
        });
        if (tabKey === 'staff') {
            this.renderServiceFormStaffOptions();
        }
        if (tabKey === 'resources') {
            this.renderServiceFormResourceOptions();
        }
        if (tabKey === 'materials') {
            this.renderServiceFormMaterialsList();
        }
        if (tabKey === 'languages') {
            this.renderServiceLanguagesTab();
        }
    },

    // Staff methods & Individual Overrides
    serviceStaffOverrides: {},
    tempStaffMaterials: [],
    activeStaffMaterialId: null,
    tempPickerStaffIds: [],

    // Staff Picker Modal Methods
    openStaffPickerModal: function() {
        const modal = document.getElementById('bizStaffPickerModal');
        if (!modal) return;
        this.tempPickerStaffIds = Array.isArray(this.selectedServiceStaffIds) ? [...this.selectedServiceStaffIds] : [];
        const searchInput = document.getElementById('staffPickerSearchInput');
        if (searchInput) searchInput.value = '';
        this.renderStaffPickerList('');
        modal.classList.remove('hidden');
        if (searchInput) searchInput.focus();
    },

    closeStaffPickerModal: function() {
        const modal = document.getElementById('bizStaffPickerModal');
        if (modal) modal.classList.add('hidden');
        this.tempPickerStaffIds = [];
    },

    filterStaffPickerList: function() {
        const searchInput = document.getElementById('staffPickerSearchInput');
        const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
        this.renderStaffPickerList(q);
    },

    togglePickerStaff: function(staffId) {
        if (!Array.isArray(this.tempPickerStaffIds)) this.tempPickerStaffIds = [];
        const idx = this.tempPickerStaffIds.indexOf(staffId);
        if (idx !== -1) {
            this.tempPickerStaffIds.splice(idx, 1);
        } else {
            this.tempPickerStaffIds.push(staffId);
        }
        const searchInput = document.getElementById('staffPickerSearchInput');
        const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
        this.renderStaffPickerList(q);
    },

    pickerSelectAllStaff: function() {
        const staffList = this.getStaffList();
        this.tempPickerStaffIds = staffList.map(s => s.id);
        const searchInput = document.getElementById('staffPickerSearchInput');
        const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
        this.renderStaffPickerList(q);
    },

    pickerClearAllStaff: function() {
        this.tempPickerStaffIds = [];
        const searchInput = document.getElementById('staffPickerSearchInput');
        const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
        this.renderStaffPickerList(q);
    },

    renderStaffPickerList: function(filterQuery = '') {
        const container = document.getElementById('staffPickerListContainer');
        const countLabel = document.getElementById('staffPickerCountLabel');
        if (!container) return;

        let staffList = this.getStaffList();
        if (filterQuery) {
            staffList = staffList.filter(s => 
                (s.name && s.name.toLowerCase().includes(filterQuery)) ||
                (s.role && s.role.toLowerCase().includes(filterQuery))
            );
        }

        const selectedCount = (this.tempPickerStaffIds || []).length;
        if (countLabel) countLabel.textContent = `Seçilib: ${selectedCount} usta`;

        if (staffList.length === 0) {
            container.innerHTML = `
                <div class="py-8 text-center text-slate-400 text-xs">
                    Axtarışa uyğun usta tapılmadı.
                </div>
            `;
            return;
        }

        container.innerHTML = staffList.map(st => {
            const isChecked = (this.tempPickerStaffIds || []).includes(st.id);
            return `
                <div onclick="BusinessDashboardView.togglePickerStaff('${st.id}')" class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${isChecked ? 'border-slate-900 bg-white ring-1 ring-slate-900/10 shadow-2xs' : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'}">
                    <div class="flex items-center gap-2.5 min-w-0">
                        <img src="${st.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}" class="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200">
                        <div class="min-w-0 text-left">
                            <div class="font-bold text-xs text-slate-900 truncate">${st.name}</div>
                            <div class="text-[11px] text-slate-400 truncate">${st.role || 'Mütəxəssis'}</div>
                        </div>
                    </div>
                    <div class="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition ${isChecked ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white'}">
                        ${isChecked ? '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>' : ''}
                    </div>
                </div>
            `;
        }).join('');
    },

    applyStaffPickerSelection: function() {
        this.selectedServiceStaffIds = [...(this.tempPickerStaffIds || [])];
        this.closeStaffPickerModal();
        this.renderServiceFormStaffOptions();
        this.renderServiceModalTabs();
    },

    removeServiceStaff: function(staffId) {
        this.selectedServiceStaffIds = (this.selectedServiceStaffIds || []).filter(id => id !== staffId);
        this.renderServiceFormStaffOptions();
        this.renderServiceModalTabs();
    },

    selectAllServiceStaff: function() {
        const staffList = this.getStaffList();
        this.selectedServiceStaffIds = staffList.map(s => s.id);
        this.renderServiceFormStaffOptions();
        this.renderServiceModalTabs();
    },

    clearAllServiceStaff: function() {
        this.selectedServiceStaffIds = [];
        this.renderServiceFormStaffOptions();
        this.renderServiceModalTabs();
    },

    toggleServiceFormStaff: function(staffId) {
        const idx = this.selectedServiceStaffIds.indexOf(staffId);
        if (idx !== -1) {
            this.selectedServiceStaffIds.splice(idx, 1);
        } else {
            this.selectedServiceStaffIds.push(staffId);
        }
        this.renderServiceFormStaffOptions();
        this.renderServiceModalTabs();
    },

    updateStaffOverride: function(staffId, field, val) {
        if (!this.serviceStaffOverrides) this.serviceStaffOverrides = {};
        if (!this.serviceStaffOverrides[staffId]) this.serviceStaffOverrides[staffId] = {};
        const cleanVal = (val === '' || val === null || val === undefined) 
            ? null 
            : (field === 'price' ? parseFloat(val) : parseInt(val));
        this.serviceStaffOverrides[staffId][field] = cleanVal;
    },

    staffMatSearchQuery: '',

    openStaffMaterialsModal: function(staffId) {
        const modal = document.getElementById('bizStaffMaterialsModal');
        if (!modal) return;

        this.activeStaffMaterialId = staffId;
        const staffList = this.getStaffList();
        const st = staffList.find(s => s.id === staffId);
        if (!st) return;

        const avatarEl = document.getElementById('staffMatModalAvatar');
        const titleEl = document.getElementById('staffMatModalTitle');
        const subEl = document.getElementById('staffMatModalSubtitle');
        const hiddenStaffId = document.getElementById('staffMatModalStaffId');
        const switchEl = document.getElementById('staffMatUseCustom');
        const searchInput = document.getElementById('staffMatTechCardSearchInput');

        if (avatarEl) avatarEl.src = st.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100';
        if (titleEl) titleEl.textContent = `${st.name} — Fərdi texnoloji xəritə`;
        if (subEl) subEl.textContent = `${st.role || 'Mütəxəssis'} üçün xüsusi texnoloji kart sərfiyyatı`;
        if (hiddenStaffId) hiddenStaffId.value = staffId;
        if (searchInput) searchInput.value = '';
        this.staffMatSearchQuery = '';

        if (!this.serviceStaffOverrides) this.serviceStaffOverrides = {};
        if (!this.serviceStaffOverrides[staffId]) this.serviceStaffOverrides[staffId] = {};
        const override = this.serviceStaffOverrides[staffId];
        const useCustom = !!override.useCustomMaterials;
        if (switchEl) switchEl.checked = useCustom;

        this.selectedStaffTechCardId = override.techCardId || null;

        if (Array.isArray(override.materials) && override.materials.length > 0) {
            this.tempStaffMaterials = JSON.parse(JSON.stringify(override.materials));
        } else if (this.selectedStaffTechCardId) {
            const techCards = (typeof this.getTechCards === 'function') ? this.getTechCards() : [];
            const tc = techCards.find(c => c.id === this.selectedStaffTechCardId);
            if (tc && tc.ingredients) {
                this.tempStaffMaterials = tc.ingredients.map(ing => ({
                    productId: ing.productId,
                    name: ing.productName || ing.name,
                    unit: ing.unit || 'ədəd',
                    costPrice: parseFloat(ing.costPerUnit || ing.costPrice || 0),
                    qty: parseFloat(ing.qty || 1)
                }));
            } else {
                this.tempStaffMaterials = [];
            }
        } else {
            this.tempStaffMaterials = [];
        }

        this.renderStaffTechCardsList();
        this.renderStaffMaterialsList();
        this.toggleStaffCustomMaterialsMode();

        modal.classList.remove('hidden');
    },

    closeStaffMaterialsModal: function() {
        const modal = document.getElementById('bizStaffMaterialsModal');
        if (modal) modal.classList.add('hidden');
        this.activeStaffMaterialId = null;
        this.selectedStaffTechCardId = null;
        this.tempStaffMaterials = [];
        this.staffMatSearchQuery = '';
    },

    toggleStaffCustomMaterialsMode: function() {
        const switchEl = document.getElementById('staffMatUseCustom');
        const customSection = document.getElementById('staffMatCustomSection');
        const defaultSection = document.getElementById('staffMatDefaultSection');
        const isCustom = switchEl ? !!switchEl.checked : false;

        if (customSection) {
            if (isCustom) customSection.classList.remove('hidden');
            else customSection.classList.add('hidden');
        }
        if (defaultSection) {
            if (isCustom) defaultSection.classList.add('hidden');
            else defaultSection.classList.remove('hidden');
        }
    },

    filterStaffTechCardsList: function() {
        const searchInput = document.getElementById('staffMatTechCardSearchInput');
        this.staffMatSearchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
        this.renderStaffTechCardsList();
    },

    renderStaffTechCardsList: function() {
        const container = document.getElementById('staffMatTechCardsContainer');
        const countLabel = document.getElementById('staffMatTechCardCountLabel');
        if (!container) return;

        const allTechCards = (typeof this.getTechCards === 'function') ? this.getTechCards() : [];
        const q = this.staffMatSearchQuery || '';

        let filtered = allTechCards;
        if (q) {
            filtered = filtered.filter(tc => {
                const name = (tc.name || '').toLowerCase();
                const srvName = (tc.serviceName || '').toLowerCase();
                const notes = (tc.notes || '').toLowerCase();
                const ings = (tc.ingredients || []).map(i => (i.productName || i.name || '').toLowerCase()).join(' ');
                return name.includes(q) || srvName.includes(q) || notes.includes(q) || ings.includes(q);
            });
        }

        if (countLabel) countLabel.textContent = `Mövcud texnoloji kartlar: ${filtered.length}`;

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="py-6 text-center text-slate-400 text-xs">
                    ${q ? 'Axtarışa uyğun texnoloji kart tapılmadı.' : 'Heç bir texnoloji kart tapılmadı.'}
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(tc => {
            const isSelected = (tc.id === this.selectedStaffTechCardId);
            const totalCost = parseFloat(tc.totalCost || 0).toFixed(2);
            const ingCount = (tc.ingredients || []).length;
            const ingPreview = (tc.ingredients || []).slice(0, 3).map(i => `${i.productName || i.name} (${i.qty} ${i.unit || 'ədəd'})`).join(', ') + (ingCount > 3 ? `, +${ingCount - 3} digər` : '');

            return `
                <div onclick="BusinessDashboardView.onSelectStaffTechCard('${tc.id}')" class="p-3 sm:p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${isSelected ? 'border-amber-400 bg-amber-50/30 shadow-xs' : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/60'}">
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <div class="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-amber-500 bg-[#FFDD2D] text-slate-900 shadow-2xs' : 'border-slate-300 bg-white'}">
                                ${isSelected ? `<div class="w-1.5 h-1.5 rounded-full bg-slate-900"></div>` : ''}
                            </div>
                            <div class="font-bold text-xs text-slate-900 truncate">${this.escapeHtml(tc.name)}</div>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">${ingCount} material</span>
                            <span class="text-xs font-bold font-mono text-slate-900">${totalCost} ₼</span>
                        </div>
                    </div>
                    ${tc.notes ? `<div class="text-[11px] text-slate-500 pl-6 leading-relaxed line-clamp-1">${this.escapeHtml(tc.notes)}</div>` : ''}
                    ${ingPreview ? `
                        <div class="text-[10px] text-slate-400 pl-6 flex items-center gap-1.5 truncate">
                            <svg class="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                            <span class="truncate">${this.escapeHtml(ingPreview)}</span>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    },

    onSelectStaffTechCard: function(techCardId) {
        this.selectedStaffTechCardId = techCardId || null;
        const techCards = (typeof this.getTechCards === 'function') ? this.getTechCards() : [];
        const tc = techCards.find(c => c.id === techCardId);

        if (!tc) {
            this.tempStaffMaterials = [];
            this.renderStaffTechCardsList();
            this.renderStaffMaterialsList();
            return;
        }

        this.tempStaffMaterials = (tc.ingredients || []).map(ing => ({
            productId: ing.productId,
            name: ing.productName || ing.name,
            unit: ing.unit || 'ədəd',
            costPrice: parseFloat(ing.costPerUnit || ing.costPrice || 0),
            qty: parseFloat(ing.qty || 1)
        }));

        this.renderStaffTechCardsList();
        this.renderStaffMaterialsList();
    },

    renderStaffMaterialsList: function() {
        const container = document.getElementById('staffMatList');
        const totalEl = document.getElementById('staffMatTotalCost');
        const countEl = document.getElementById('staffMatIngredientsCount');
        if (!container) return;

        let totalCost = 0;
        if (!this.tempStaffMaterials || this.tempStaffMaterials.length === 0) {
            container.innerHTML = `
                <div class="py-4 text-center text-slate-400 text-xs">
                    Zəhmət olmasa yuxarıdakı siyahıdan texnoloji kart seçin.
                </div>
            `;
            if (totalEl) totalEl.textContent = '0.00 ₼';
            if (countEl) countEl.textContent = '0 material';
            return;
        }

        if (countEl) countEl.textContent = `${this.tempStaffMaterials.length} növ material`;

        container.innerHTML = this.tempStaffMaterials.map((mat, idx) => {
            const lineCost = (parseFloat(mat.costPrice || 0) * parseFloat(mat.qty || 0));
            totalCost += lineCost;
            return `
                <div class="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs shadow-2xs">
                    <div class="min-w-0 flex-1">
                        <div class="font-bold text-slate-900 truncate">${this.escapeHtml(mat.name || '')}</div>
                        <div class="text-[11px] text-slate-400 font-mono">${parseFloat(mat.costPrice || 0).toFixed(2)} ₼ / ${this.escapeHtml(mat.unit || 'ədəd')}</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="number" min="0.01" step="0.1" value="${mat.qty}" onchange="BusinessDashboardView.updateStaffCustomMaterialQty(${idx}, this.value)" class="w-16 h-8 px-2 rounded-lg bg-slate-50 border border-slate-200 text-center font-bold text-xs outline-none focus:border-slate-900 transition">
                        <span class="text-slate-500 text-[11px] font-medium shrink-0">${this.escapeHtml(mat.unit || 'ədəd')}</span>
                        <div class="w-16 text-right font-bold text-slate-900 text-xs font-mono">${lineCost.toFixed(2)} ₼</div>
                        <button type="button" onclick="BusinessDashboardView.removeStaffCustomMaterial(${idx})" class="w-7 h-7 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition cursor-pointer" title="Sil">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        if (totalEl) totalEl.textContent = `${totalCost.toFixed(2)} ₼`;
    },

    removeStaffCustomMaterial: function(index) {
        if (this.tempStaffMaterials && this.tempStaffMaterials[index]) {
            this.tempStaffMaterials.splice(index, 1);
            this.renderStaffMaterialsList();
        }
    },

    updateStaffCustomMaterialQty: function(index, qtyVal) {
        const qty = parseFloat(qtyVal) || 0.1;
        if (this.tempStaffMaterials && this.tempStaffMaterials[index]) {
            this.tempStaffMaterials[index].qty = qty;
            this.renderStaffMaterialsList();
        }
    },

    saveStaffMaterialsModal: function() {
        const staffId = this.activeStaffMaterialId || (document.getElementById('staffMatModalStaffId') ? document.getElementById('staffMatModalStaffId').value : null);
        if (!staffId) {
            this.closeStaffMaterialsModal();
            return;
        }
        const switchEl = document.getElementById('staffMatUseCustom');
        const useCustom = switchEl ? !!switchEl.checked : false;

        if (!this.serviceStaffOverrides) this.serviceStaffOverrides = {};
        if (!this.serviceStaffOverrides[staffId]) this.serviceStaffOverrides[staffId] = {};
        
        const techCards = (typeof this.getTechCards === 'function') ? this.getTechCards() : [];
        const tc = techCards.find(c => c.id === this.selectedStaffTechCardId);

        this.serviceStaffOverrides[staffId].useCustomMaterials = useCustom;
        this.serviceStaffOverrides[staffId].techCardId = useCustom && tc ? tc.id : null;
        this.serviceStaffOverrides[staffId].techCardName = useCustom && tc ? tc.name : null;
        this.serviceStaffOverrides[staffId].materials = useCustom ? [...(this.tempStaffMaterials || [])] : [];

        this.closeStaffMaterialsModal();
        this.renderServiceFormStaffOptions();
        if (typeof App !== 'undefined') App.showToast('Usta üçün fərdi texnoloji xəritə qeydə alındı');
    },

    getEffectiveServiceForStaff: function(service, staffId) {
        if (!service) return { price: 0, duration: 45, breakTime: 0, bufferTime: 0, totalDuration: 45, materials: [] };
        const staffKeyMap = {
            'samir': 'st_1',
            'aygun': 'st_2',
            'kamran': 'st_3',
            'nigar': 'st_4',
            'st_1': 'st_1',
            'st_2': 'st_2',
            'st_3': 'st_3',
            'st_4': 'st_4'
        };
        const resolvedId = staffKeyMap[staffId] || staffId;
        const override = (service.staffOverrides && (service.staffOverrides[resolvedId] || service.staffOverrides[staffId])) || {};

        let masterCustomPrice = null;
        try {
            const staffList = (typeof this.getStaffList === 'function') ? this.getStaffList() : [];
            const master = staffList.find(s => s.id === resolvedId || s.id === staffId);
            if (master && master.customPricing && master.customPricing[service.id] !== undefined) {
                masterCustomPrice = parseFloat(master.customPricing[service.id]);
            }
        } catch (e) {}

        const price = (override.price !== undefined && override.price !== null && override.price !== '')
            ? parseFloat(override.price)
            : (masterCustomPrice !== null && !isNaN(masterCustomPrice))
                ? masterCustomPrice
                : (parseFloat(service.price) || 0);
        const duration = (override.duration !== undefined && override.duration !== null && override.duration !== '')
            ? parseInt(override.duration)
            : (parseInt(service.duration) || 45);
        const breakTime = parseInt(override.breakTime !== undefined ? override.breakTime : (override.bufferTime !== undefined ? override.bufferTime : (service.breakTime || service.bufferTime || 0))) || 0;
        const materials = (override.useCustomMaterials && Array.isArray(override.materials))
            ? override.materials
            : (Array.isArray(service.materials) ? service.materials : []);
        return { price, duration, breakTime, bufferTime: breakTime, totalDuration: duration + breakTime, materials };
    },

    renderServiceFormStaffOptions: function() {
        const container = document.getElementById('srvFormStaffOptions');
        const subhead = document.getElementById('srvFormStaffSubhead');
        const clearBtn = document.getElementById('srvFormStaffClearBtn');
        if (!container) return;

        const basePriceInput = document.getElementById('srvFormPrice');
        const baseDurationInput = document.getElementById('srvFormDuration');
        const basePrice = basePriceInput ? basePriceInput.value : '';
        const baseDuration = baseDurationInput ? baseDurationInput.value : '45';

        const staffList = this.getStaffList();
        const assignedIds = this.selectedServiceStaffIds || [];
        const assignedStaff = assignedIds.map(id => staffList.find(s => s.id === id)).filter(Boolean);

        // Update header subtitle and clear button
        if (subhead) {
            subhead.textContent = assignedStaff.length > 0 
                ? `${assignedStaff.length} usta bu xidmətə təyin edilib`
                : 'Xidmət üzrə hələ heç bir usta təyin edilməyib';
        }
        if (clearBtn) {
            if (assignedStaff.length > 0) clearBtn.classList.remove('hidden');
            else clearBtn.classList.add('hidden');
        }

        // Empty state when no masters are selected
        if (assignedStaff.length === 0) {
            container.innerHTML = `
                <div class="py-7 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2.5">
                    <div class="w-10 h-10 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path stroke-linecap="round" stroke-linejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div>
                        <div class="font-bold text-xs text-slate-800">Hələ heç bir usta təyin edilməyib</div>
                        <p class="text-[11px] text-slate-400 mt-0.5">Xidmət üzrə müştəri qəbul edəcək ustaları heyətdən əlavə edin</p>
                    </div>
                    <button type="button" onclick="BusinessDashboardView.openStaffPickerModal()" class="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-2xs transition active:scale-95 cursor-pointer">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                        <span>Usta əlavə et</span>
                    </button>
                </div>
            `;
            return;
        }

        // Render sleek compact rows for assigned staff members
        container.innerHTML = `
            <!-- Table Column Header for sm+ -->
            <div class="hidden sm:grid sm:grid-cols-12 sm:items-center gap-3 px-3 py-1 text-[11px] font-semibold text-slate-400">
                <div class="sm:col-span-4">Usta</div>
                <div class="sm:col-span-2 text-right">Fərdi qiymət</div>
                <div class="sm:col-span-2 text-center">Fərdi müddət</div>
                <div class="sm:col-span-3 text-center">Texnoloji xəritə</div>
                <div class="sm:col-span-1 text-right"></div>
            </div>

            <!-- Master Rows -->
            <div class="space-y-1.5">
                ${assignedStaff.map(st => {
                    const override = (this.serviceStaffOverrides && this.serviceStaffOverrides[st.id]) || {};
                    const customPrice = (override.price !== undefined && override.price !== null) ? override.price : '';
                    const customDuration = (override.duration !== undefined && override.duration !== null) ? override.duration : '';
                    const useCustomMaterials = !!override.useCustomMaterials;
                    const matCount = Array.isArray(override.materials) ? override.materials.length : 0;

                    return `
                        <div class="p-2.5 sm:p-2 sm:px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-2xs flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-2.5 sm:gap-3">
                            <!-- Col 1: Master Info (4 cols) -->
                            <div class="sm:col-span-4 flex items-center justify-between sm:justify-start gap-2.5 min-w-0">
                                <div class="flex items-center gap-2.5 min-w-0">
                                    <img src="${st.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}" class="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-100">
                                    <div class="min-w-0 text-left">
                                        <div class="font-bold text-xs text-slate-900 truncate">${st.name}</div>
                                        <div class="text-[10px] text-slate-400 truncate">${st.role || 'Mütəxəssis'}</div>
                                    </div>
                                </div>
                                <button type="button" onclick="BusinessDashboardView.removeServiceStaff('${st.id}')" class="sm:hidden p-1.5 text-slate-400 hover:text-red-600 transition" title="Xidmətdən çıxar">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </div>

                            <!-- Col 2: Price (2 cols) -->
                            <div class="sm:col-span-2 flex items-center justify-between sm:justify-end gap-2">
                                <span class="sm:hidden text-[11px] text-slate-500 font-medium">Fərdi qiymət:</span>
                                <div class="relative w-28 sm:w-full">
                                    <input type="number" step="0.5" min="0" placeholder="${basePrice ? basePrice + ' ₼' : '0 ₼'}" value="${customPrice}" 
                                        oninput="BusinessDashboardView.updateStaffOverride('${st.id}', 'price', this.value)"
                                        class="w-full h-8 px-2 pr-6 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs text-right outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition">
                                    <span class="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 text-xs font-bold pointer-events-none">₼</span>
                                </div>
                            </div>

                            <!-- Col 3: Duration (2 cols) -->
                            <div class="sm:col-span-2 flex items-center justify-between sm:justify-center gap-2">
                                <span class="sm:hidden text-[11px] text-slate-500 font-medium">Fərdi müddət:</span>
                                <div class="relative w-24 sm:w-full">
                                    <input type="number" step="5" min="5" placeholder="${baseDuration ? baseDuration + ' dəq' : '45 dəq'}" value="${customDuration}" 
                                        oninput="BusinessDashboardView.updateStaffOverride('${st.id}', 'duration', this.value)"
                                        class="w-full h-8 px-2 pr-7 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs text-center outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition">
                                    <span class="absolute inset-y-0 right-0 pr-1.5 flex items-center text-slate-400 text-[10px] font-medium pointer-events-none">dəq</span>
                                </div>
                            </div>

                            <!-- Col 4: Tech Map Button (3 cols) -->
                            <div class="sm:col-span-3 flex items-center justify-between sm:justify-center gap-2">
                                <span class="sm:hidden text-[11px] text-slate-500 font-medium">Xəritə:</span>
                                <button type="button" onclick="BusinessDashboardView.openStaffMaterialsModal('${st.id}')" 
                                    class="h-8 px-2.5 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-2xs ${useCustomMaterials ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300 hover:text-slate-900'}"
                                    title="${useCustomMaterials ? (override.techCardName || 'Fərdi texnoloji xəritə') : 'Standart xidmət xəritəsi'}">
                                    <svg class="w-3.5 h-3.5 ${useCustomMaterials ? 'text-amber-700' : 'text-slate-400'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                    <span class="truncate max-w-[130px]">${useCustomMaterials ? (override.techCardName || `Fərdi (${matCount})`) : 'Standart xəritə'}</span>
                                </button>
                            </div>

                            <!-- Col 5: Remove Button on sm+ (1 col) -->
                            <div class="hidden sm:flex sm:col-span-1 items-center justify-end">
                                <button type="button" onclick="BusinessDashboardView.removeServiceStaff('${st.id}')" class="w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition cursor-pointer" title="Xidmətdən çıxar">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <!-- Footer note -->
            <div class="pt-2 text-[10px] text-slate-400 flex items-center gap-1">
                <span>*</span>
                <span>Fərdi qiymət və ya müddət xanaları boş saxlanıldıqda, xidmətin standart parametrləri tətbiq olunacaq.</span>
            </div>
        `;
    },

    // Resources methods & Resource Picker Modal
    selectedServiceResourceIds: [],
    tempPickerResourceIds: [],
    activeResourcePickerCategory: 'all',

    openResourcePickerModal: function() {
        const modal = document.getElementById('bizResourcePickerModal');
        if (!modal) return;
        this.tempPickerResourceIds = Array.isArray(this.selectedServiceResourceIds) ? [...this.selectedServiceResourceIds] : [];
        this.activeResourcePickerCategory = 'all';
        const searchInput = document.getElementById('resourcePickerSearchInput');
        if (searchInput) searchInput.value = '';
        this.renderResourcePickerCategories();
        this.renderResourcePickerList();
        modal.classList.remove('hidden');
        if (searchInput) searchInput.focus();
    },

    closeResourcePickerModal: function() {
        const modal = document.getElementById('bizResourcePickerModal');
        if (modal) modal.classList.add('hidden');
        this.tempPickerResourceIds = [];
    },

    renderResourcePickerCategories: function() {
        const container = document.getElementById('resourcePickerCategoryTabs');
        if (!container) return;
        const allResources = (this.getResources ? this.getResources() : []);
        const categories = (this.getResourceCategories ? this.getResourceCategories() : []);
        const activeCat = this.activeResourcePickerCategory || 'all';

        let html = `
            <button type="button" onclick="BusinessDashboardView.filterResourcePickerCategory('all')" class="px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition cursor-pointer ${activeCat === 'all' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}">
                Hamısı (${allResources.length})
            </button>
        `;

        categories.forEach(cat => {
            const count = allResources.filter(r => r.categoryId === cat.id).length;
            if (count === 0) return;
            const isActive = activeCat === cat.id;
            html += `
                <button type="button" onclick="BusinessDashboardView.filterResourcePickerCategory('${cat.id}')" class="px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition cursor-pointer ${isActive ? 'bg-slate-900 text-white font-bold shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}">
                    ${cat.name} (${count})
                </button>
            `;
        });

        // Other / Uncategorized
        const uncategorizedCount = allResources.filter(r => !r.categoryId || !categories.find(c => c.id === r.categoryId)).length;
        if (uncategorizedCount > 0) {
            const isActive = activeCat === 'uncategorized';
            html += `
                <button type="button" onclick="BusinessDashboardView.filterResourcePickerCategory('uncategorized')" class="px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition cursor-pointer ${isActive ? 'bg-slate-900 text-white font-bold shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}">
                    Digər (${uncategorizedCount})
                </button>
            `;
        }

        container.innerHTML = html;
    },

    filterResourcePickerCategory: function(catId) {
        this.activeResourcePickerCategory = catId;
        this.renderResourcePickerCategories();
        this.renderResourcePickerList();
    },

    filterResourcePickerList: function() {
        this.renderResourcePickerList();
    },

    renderResourcePickerList: function() {
        const container = document.getElementById('resourcePickerListContainer');
        const countLabel = document.getElementById('resourcePickerCountLabel');
        if (!container) return;

        const allResources = (this.getResources ? this.getResources() : []);
        const categories = (this.getResourceCategories ? this.getResourceCategories() : []);
        const activeCat = this.activeResourcePickerCategory || 'all';

        const searchInput = document.getElementById('resourcePickerSearchInput');
        const q = searchInput ? searchInput.value.toLowerCase().trim() : '';

        let filtered = allResources;

        if (activeCat !== 'all') {
            if (activeCat === 'uncategorized') {
                filtered = filtered.filter(r => !r.categoryId || !categories.find(c => c.id === r.categoryId));
            } else {
                filtered = filtered.filter(r => r.categoryId === activeCat);
            }
        }

        if (q) {
            filtered = filtered.filter(r => {
                const name = (r.name || '').toLowerCase();
                const notes = (r.notes || '').toLowerCase();
                const cat = categories.find(c => c.id === r.categoryId);
                const catName = cat ? cat.name.toLowerCase() : '';
                return name.includes(q) || notes.includes(q) || catName.includes(q);
            });
        }

        const selectedCount = (this.tempPickerResourceIds || []).length;
        if (countLabel) countLabel.textContent = `Seçilib: ${selectedCount} resurs`;

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="py-8 text-center text-slate-400 text-xs">
                    Seçilmiş kateqoriyada və ya axtarışa uyğun resurs tapılmadı.
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(res => {
            const isChecked = (this.tempPickerResourceIds || []).includes(res.id);
            const typeConf = this.getResourceTypeConfig(res.type);
            const cat = categories.find(c => c.id === res.categoryId);
            const catName = cat ? cat.name : 'Ümumi';

            return `
                <div onclick="BusinessDashboardView.togglePickerResource('${res.id}')" class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${isChecked ? 'border-slate-900 bg-white ring-1 ring-slate-900/10 shadow-2xs' : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'}">
                    <div class="flex items-center gap-2.5 min-w-0">
                        <div class="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${typeConf.badgeBg}">
                            ${typeConf.iconSvg}
                        </div>
                        <div class="min-w-0 text-left">
                            <div class="font-bold text-xs text-slate-900 truncate">${res.name}</div>
                            <div class="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                                <span class="font-medium text-slate-600">${typeConf.label}</span>
                                <span>•</span>
                                <span class="truncate">${catName}</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition ${isChecked ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white'}">
                        ${isChecked ? '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>' : ''}
                    </div>
                </div>
            `;
        }).join('');
    },

    togglePickerResource: function(resId) {
        if (!Array.isArray(this.tempPickerResourceIds)) this.tempPickerResourceIds = [];
        const idx = this.tempPickerResourceIds.indexOf(resId);
        if (idx !== -1) {
            this.tempPickerResourceIds.splice(idx, 1);
        } else {
            this.tempPickerResourceIds.push(resId);
        }
        this.renderResourcePickerList();
    },

    pickerSelectAllResources: function() {
        const allResources = (this.getResources ? this.getResources() : []);
        const categories = (this.getResourceCategories ? this.getResourceCategories() : []);
        const activeCat = this.activeResourcePickerCategory || 'all';

        const searchInput = document.getElementById('resourcePickerSearchInput');
        const q = searchInput ? searchInput.value.toLowerCase().trim() : '';

        let filtered = allResources;
        if (activeCat !== 'all') {
            if (activeCat === 'uncategorized') {
                filtered = filtered.filter(r => !r.categoryId || !categories.find(c => c.id === r.categoryId));
            } else {
                filtered = filtered.filter(r => r.categoryId === activeCat);
            }
        }
        if (q) {
            filtered = filtered.filter(r => {
                const name = (r.name || '').toLowerCase();
                const notes = (r.notes || '').toLowerCase();
                const cat = categories.find(c => c.id === r.categoryId);
                const catName = cat ? cat.name.toLowerCase() : '';
                return name.includes(q) || notes.includes(q) || catName.includes(q);
            });
        }

        if (!Array.isArray(this.tempPickerResourceIds)) this.tempPickerResourceIds = [];
        filtered.forEach(r => {
            if (!this.tempPickerResourceIds.includes(r.id)) {
                this.tempPickerResourceIds.push(r.id);
            }
        });
        this.renderResourcePickerList();
    },

    pickerClearAllResources: function() {
        this.tempPickerResourceIds = [];
        this.renderResourcePickerList();
    },

    applyResourcePickerSelection: function() {
        this.selectedServiceResourceIds = Array.isArray(this.tempPickerResourceIds) ? [...this.tempPickerResourceIds] : [];
        this.renderServiceFormResourceOptions();
        this.renderServiceModalTabs();
        this.closeResourcePickerModal();
    },

    removeServiceFormResource: function(resId) {
        if (!Array.isArray(this.selectedServiceResourceIds)) this.selectedServiceResourceIds = [];
        const idx = this.selectedServiceResourceIds.indexOf(resId);
        if (idx !== -1) {
            this.selectedServiceResourceIds.splice(idx, 1);
            this.renderServiceFormResourceOptions();
            this.renderServiceModalTabs();
        }
    },

    clearAllServiceResources: function() {
        this.selectedServiceResourceIds = [];
        this.renderServiceFormResourceOptions();
        this.renderServiceModalTabs();
    },

    renderServiceFormResourceOptions: function() {
        const container = document.getElementById('srvFormResourceOptions');
        const subhead = document.getElementById('srvFormResourcesSubhead');
        const clearBtn = document.getElementById('srvFormResourceClearBtn');
        if (!container) return;

        const allResources = (this.getResources ? this.getResources() : []);
        const categories = (this.getResourceCategories ? this.getResourceCategories() : []);
        const selectedIds = Array.isArray(this.selectedServiceResourceIds) ? this.selectedServiceResourceIds : [];
        const selectedResources = selectedIds.map(id => allResources.find(r => r.id === id)).filter(Boolean);

        if (selectedResources.length === 0) {
            if (clearBtn) clearBtn.classList.add('hidden');
            if (subhead) subhead.textContent = 'Xidmət üçün tələb olunan kabinetlər, kreslolar və aparatlar';
            container.innerHTML = `
                <div class="py-8 px-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-center flex flex-col items-center justify-center">
                    <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mb-2 shadow-2xs">
                        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>
                    </div>
                    <div class="text-xs font-bold text-slate-700">Resurs təyin edilməyib</div>
                    <p class="text-[11px] text-slate-400 mt-0.5 max-w-xs">Xidmətin icrası üçün kreslo, xüsusi kabinet və ya aparat tələb olunursa, əlavə edin.</p>
                    <button type="button" onclick="BusinessDashboardView.openResourcePickerModal()" class="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                        <span>Resurs seç</span>
                    </button>
                </div>
            `;
            return;
        }

        if (clearBtn) clearBtn.classList.remove('hidden');
        if (subhead) subhead.textContent = `${selectedResources.length} resurs təyin edilib`;

        container.innerHTML = `
            <div class="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
                ${selectedResources.map(res => {
                    const typeConf = this.getResourceTypeConfig(res.type);
                    const cat = categories.find(c => c.id === res.categoryId);
                    const catName = cat ? cat.name : 'Ümumi';
                    return `
                        <div class="p-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition">
                            <div class="flex items-center gap-2.5 min-w-0">
                                <div class="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${typeConf.badgeBg}">
                                    ${typeConf.iconSvg}
                                </div>
                                <div class="min-w-0 text-left">
                                    <div class="font-bold text-xs text-slate-900 truncate">${res.name}</div>
                                    <div class="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                                        <span class="font-medium text-slate-600">${typeConf.label}</span>
                                        <span>•</span>
                                        <span class="truncate">${catName}</span>
                                    </div>
                                </div>
                            </div>
                            <button type="button" onclick="BusinessDashboardView.removeServiceFormResource('${res.id}')" class="p-1.5 rounded-lg border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer shrink-0" title="Resursu xidmətdən çıxar">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    // Materials & Technological Card methods for Service
    selectedServiceMaterials: [],
    selectedServiceTechCardId: null,
    selectedServiceTechCardName: null,
    tempSelectedServiceTechCardId: null,

    populateServiceTechCardsSelect: function(selectedTechCardId) {
        const select = document.getElementById('srvFormTechCardSelect');
        if (!select) return;

        const techCards = (typeof this.getTechCards === 'function') ? this.getTechCards() : [];
        if (techCards.length === 0) {
            select.innerHTML = '<option value="">Texnoloji kart yoxdur (əvvəlcə kart yaradın)</option>';
            return;
        }

        select.innerHTML = `
            <option value="">-- Texnoloji kart seçilməyib --</option>
            ${techCards.map(tc => {
                const count = (tc.ingredients || []).length;
                const cost = parseFloat(tc.totalCost || 0).toFixed(2);
                const isSel = (tc.id === selectedTechCardId);
                return `<option value="${tc.id}" ${isSel ? 'selected' : ''}>${this.escapeHtml(tc.name)} (${count} material · ${cost} ₼)</option>`;
            }).join('')}
        `;
    },

    onSelectServiceTechCard: function(techCardId) {
        this.selectedServiceTechCardId = techCardId || null;
        const techCards = (typeof this.getTechCards === 'function') ? this.getTechCards() : [];
        const tc = techCards.find(c => c.id === techCardId);

        if (tc) {
            this.selectedServiceTechCardName = tc.name;
            this.selectedServiceMaterials = (tc.ingredients || []).map(ing => ({
                productId: ing.productId,
                name: ing.productName || ing.name || 'Məhsul',
                qty: parseFloat(ing.qty) || 1,
                unit: ing.unit || 'ədəd',
                costPrice: parseFloat(ing.costPerUnit || ing.costPrice || 0),
                totalCost: parseFloat(ing.totalCost) || (parseFloat(ing.qty || 1) * parseFloat(ing.costPerUnit || ing.costPrice || 0))
            }));
        } else {
            this.selectedServiceTechCardName = null;
            this.selectedServiceMaterials = [];
        }

        this.populateServiceTechCardsSelect(this.selectedServiceTechCardId);
        this.renderServiceFormMaterialsList();
        this.renderServiceModalTabs();
    },

    openServiceMaterialPickerModal: function() {
        const modal = document.getElementById('bizServiceMaterialPickerModal');
        if (!modal) return;

        this.tempSelectedServiceTechCardId = this.selectedServiceTechCardId || null;

        const searchInput = document.getElementById('serviceMaterialPickerSearchInput');
        if (searchInput) searchInput.value = '';

        this.renderServiceMaterialPickerList();
        modal.classList.remove('hidden');
        if (searchInput) searchInput.focus();
    },

    closeServiceMaterialPickerModal: function() {
        const modal = document.getElementById('bizServiceMaterialPickerModal');
        if (modal) modal.classList.add('hidden');
        this.tempSelectedServiceTechCardId = null;
    },

    filterServiceMaterialPickerList: function() {
        this.renderServiceMaterialPickerList();
    },

    renderServiceMaterialPickerList: function() {
        const container = document.getElementById('serviceMaterialPickerListContainer');
        const countLabel = document.getElementById('serviceMaterialPickerCountLabel');
        const selectedNameEl = document.getElementById('serviceMaterialPickerSelectedName');
        const costPreview = document.getElementById('serviceMaterialPickerCostPreview');
        if (!container) return;

        const allTechCards = (typeof this.getTechCards === 'function') ? this.getTechCards() : [];
        const searchInput = document.getElementById('serviceMaterialPickerSearchInput');
        const q = searchInput ? searchInput.value.toLowerCase().trim() : '';

        let filtered = allTechCards;
        if (q) {
            filtered = filtered.filter(tc => {
                const name = (tc.name || '').toLowerCase();
                const srvName = (tc.serviceName || '').toLowerCase();
                const notes = (tc.notes || '').toLowerCase();
                const ings = (tc.ingredients || []).map(i => (i.productName || i.name || '').toLowerCase()).join(' ');
                return name.includes(q) || srvName.includes(q) || notes.includes(q) || ings.includes(q);
            });
        }

        if (countLabel) countLabel.textContent = `Mövcud kartlar: ${filtered.length}`;

        // Selected card preview
        const currentSel = allTechCards.find(c => c.id === this.tempSelectedServiceTechCardId);
        if (selectedNameEl) {
            selectedNameEl.textContent = currentSel ? currentSel.name : 'Seçilməyib';
        }
        if (costPreview) {
            costPreview.textContent = currentSel ? `(${parseFloat(currentSel.totalCost || 0).toFixed(2)} ₼)` : '';
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="py-8 text-center text-slate-400 text-xs">
                    ${q ? 'Axtarışa uyğun texnoloji kart tapılmadı.' : 'Hələ heç bir texnoloji kart yaradılmayıb.'}
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(tc => {
            const isSelected = (tc.id === this.tempSelectedServiceTechCardId);
            const totalCost = parseFloat(tc.totalCost || 0).toFixed(2);
            const ingCount = (tc.ingredients || []).length;
            const ingPreview = (tc.ingredients || []).slice(0, 3).map(i => `${i.productName || i.name} (${i.qty} ${i.unit || 'ədəd'})`).join(', ') + (ingCount > 3 ? `, +${ingCount - 3} digər` : '');

            return `
                <div onclick="BusinessDashboardView.selectTechCardInPicker('${tc.id}')" class="p-3 sm:p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${isSelected ? 'border-amber-400 bg-amber-50/30 shadow-xs' : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/60'}">
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <div class="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-amber-500 bg-[#FFDD2D] text-slate-900 shadow-2xs' : 'border-slate-300 bg-white'}">
                                ${isSelected ? `<div class="w-1.5 h-1.5 rounded-full bg-slate-900"></div>` : ''}
                            </div>
                            <div class="font-bold text-xs text-slate-900 truncate">${this.escapeHtml(tc.name)}</div>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">${ingCount} material</span>
                            <span class="text-xs font-bold font-mono text-slate-900">${totalCost} ₼</span>
                        </div>
                    </div>
                    ${tc.notes ? `<div class="text-[11px] text-slate-500 pl-6 leading-relaxed line-clamp-1">${this.escapeHtml(tc.notes)}</div>` : ''}
                    ${ingPreview ? `
                        <div class="text-[10px] text-slate-400 pl-6 flex items-center gap-1.5 truncate">
                            <svg class="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                            <span class="truncate">${this.escapeHtml(ingPreview)}</span>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    },

    selectTechCardInPicker: function(techCardId) {
        this.tempSelectedServiceTechCardId = techCardId;
        this.renderServiceMaterialPickerList();
    },

    applyServiceMaterialPickerSelection: function() {
        if (this.tempSelectedServiceTechCardId) {
            this.onSelectServiceTechCard(this.tempSelectedServiceTechCardId);
        } else {
            this.clearAllServiceMaterials();
        }
        this.closeServiceMaterialPickerModal();
    },

    removeServiceFormMaterial: function(index) {
        if (this.selectedServiceMaterials && this.selectedServiceMaterials[index]) {
            this.selectedServiceMaterials.splice(index, 1);
            this.renderServiceFormMaterialsList();
            this.renderServiceModalTabs();
        }
    },

    clearAllServiceMaterials: function() {
        this.selectedServiceTechCardId = null;
        this.selectedServiceTechCardName = null;
        this.selectedServiceMaterials = [];
        this.populateServiceTechCardsSelect(null);
        this.renderServiceFormMaterialsList();
        this.renderServiceModalTabs();
    },

    updateServiceFormMaterialQty: function(index, qtyVal) {
        const qty = Math.max(0.01, parseFloat(qtyVal) || 0.1);
        if (this.selectedServiceMaterials && this.selectedServiceMaterials[index]) {
            this.selectedServiceMaterials[index].qty = qty;
            this.renderServiceFormMaterialsList();
        }
    },

    adjustServiceFormMaterialQty: function(index, delta) {
        if (!this.selectedServiceMaterials || !this.selectedServiceMaterials[index]) return;
        const cur = parseFloat(this.selectedServiceMaterials[index].qty) || 1;
        const next = Math.max(0.01, parseFloat((cur + delta).toFixed(2)));
        this.selectedServiceMaterials[index].qty = next;
        this.renderServiceFormMaterialsList();
    },

    renderServiceFormMaterialsList: function() {
        const container = document.getElementById('srvFormMaterialList');
        const costEl = document.getElementById('srvFormMaterialCostTotal');
        const subhead = document.getElementById('srvFormMaterialsSubhead');
        const headerPickerBtn = document.getElementById('srvFormMaterialHeaderPickerBtn');
        const clearBtn = document.getElementById('srvFormMaterialClearBtn');
        const costSummary = document.getElementById('srvFormMaterialCostSummary');
        const pickerBtnLabel = document.getElementById('srvFormMaterialPickerBtnLabel');
        if (!container) return;

        const techCards = (typeof this.getTechCards === 'function') ? this.getTechCards() : [];
        const activeTc = techCards.find(c => c.id === this.selectedServiceTechCardId);

        let totalCost = 0;
        if (!this.selectedServiceMaterials || this.selectedServiceMaterials.length === 0) {
            if (headerPickerBtn) headerPickerBtn.classList.add('hidden');
            if (clearBtn) clearBtn.classList.add('hidden');
            if (costSummary) costSummary.classList.add('hidden');
            if (subhead) subhead.textContent = 'Xidmət üzrə standart anbar sərfiyyatı. Ustanın fərdi xəritəsi olmadıqda tətbiq olunur.';

            container.innerHTML = `
                <div class="py-10 px-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-center flex flex-col items-center justify-center">
                    <div class="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mb-2.5 shadow-2xs">
                        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    </div>
                    <div class="text-xs font-bold text-slate-800">Baza texnoloji kartı təyin edilməyib</div>
                    <p class="text-[11px] text-slate-400 mt-0.5 max-w-xs">Xidmət üçün standart sərfiyyat normasını texnoloji kartlar siyahısından seçin.</p>
                    <button type="button" onclick="BusinessDashboardView.openServiceMaterialPickerModal()" class="mt-3.5 px-4 py-2 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-slate-900 font-bold text-xs transition shadow-xs cursor-pointer active:scale-95 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                        <span>Texnoloji kart seç</span>
                    </button>
                </div>
            `;
            if (costEl) costEl.textContent = '0.00 ₼';
            return;
        }

        if (headerPickerBtn) {
            headerPickerBtn.classList.remove('hidden');
            if (pickerBtnLabel) pickerBtnLabel.textContent = 'Kartı dəyiş';
        }
        if (clearBtn) clearBtn.classList.remove('hidden');
        if (costSummary) costSummary.classList.remove('hidden');

        const cardTitle = this.selectedServiceTechCardName || (activeTc ? activeTc.name : 'Standart kart');
        if (subhead) subhead.textContent = `«${cardTitle}» üzrə ${this.selectedServiceMaterials.length} material təyin edilib`;

        this.selectedServiceMaterials.forEach(mat => {
            const costPrice = parseFloat(mat.costPrice) || 0;
            const qty = parseFloat(mat.qty) || 1;
            totalCost += (costPrice * qty);
        });

        container.innerHTML = `
            <!-- Selected Tech Card Banner -->
            <div class="p-3.5 rounded-2xl border-2 border-amber-400 bg-amber-50/30 shadow-xs flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-9 h-9 rounded-xl border border-amber-500 bg-[#FFDD2D] text-slate-900 flex items-center justify-center shrink-0 shadow-2xs">
                        <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    </div>
                    <div class="min-w-0">
                        <div class="font-bold text-xs text-slate-900 truncate">«${this.escapeHtml(cardTitle)}»</div>
                        <div class="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>${this.selectedServiceMaterials.length} material</span>
                            <span>•</span>
                            <span>Maya dəyəri: <b class="text-slate-900 font-mono">${totalCost.toFixed(2)} ₼</b></span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <button type="button" onclick="BusinessDashboardView.openServiceMaterialPickerModal()" class="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer">
                        Dəyiş
                    </button>
                    <button type="button" onclick="BusinessDashboardView.clearAllServiceMaterials()" class="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:text-red-600 text-slate-400 transition shadow-2xs cursor-pointer" title="Kartı təmizlə">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                </div>
            </div>

            <!-- Materials Items List -->
            <div class="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
                ${this.selectedServiceMaterials.map((mat, idx) => {
                    const costPrice = parseFloat(mat.costPrice) || 0;
                    const qty = parseFloat(mat.qty) || 1;
                    const lineCost = (costPrice * qty);

                    return `
                        <div class="p-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition">
                            <div class="flex items-center gap-2.5 min-w-0 flex-1">
                                <div class="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                </div>
                                <div class="min-w-0 text-left">
                                    <div class="font-bold text-xs text-slate-900 truncate">${this.escapeHtml(mat.name || '')}</div>
                                    <div class="text-[10px] text-slate-400 mt-0.5 font-mono">${costPrice.toFixed(2)} ₼ / ${this.escapeHtml(mat.unit || 'ədəd')}</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-2.5 shrink-0">
                                <div class="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden h-8">
                                    <button type="button" onclick="BusinessDashboardView.adjustServiceFormMaterialQty(${idx}, -1)" class="w-6 h-full flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-200 transition font-bold cursor-pointer">-</button>
                                    <input type="number" min="0.01" step="any" value="${mat.qty}" onchange="BusinessDashboardView.updateServiceFormMaterialQty(${idx}, this.value)" class="w-12 h-full text-center text-xs font-bold bg-white outline-none text-slate-900 border-x border-slate-200">
                                    <button type="button" onclick="BusinessDashboardView.adjustServiceFormMaterialQty(${idx}, 1)" class="w-6 h-full flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-200 transition font-bold cursor-pointer">+</button>
                                </div>
                                <span class="text-slate-500 text-[11px] font-medium w-8 truncate">${this.escapeHtml(mat.unit || 'ədəd')}</span>
                                <div class="w-16 text-right font-bold text-slate-900 text-xs font-mono">${lineCost.toFixed(2)} ₼</div>
                                <button type="button" onclick="BusinessDashboardView.removeServiceFormMaterial(${idx})" class="p-1.5 rounded-lg border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer shrink-0" title="Sil">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        if (costEl) costEl.textContent = `${totalCost.toFixed(2)} ₼`;
    },

    // Online booking helpers
    toggleServiceOnlineBookingFields: function(forceState) {
        const chk = document.getElementById('srvFormOnlineBooking');
        const wrap = document.getElementById('srvFormOnlineDetailsWrap');
        const banner = document.getElementById('srvFormOnlineDisabledBanner');
        if (!chk) return;

        const isOnline = (forceState !== undefined) ? !!forceState : !!chk.checked;
        chk.checked = isOnline;

        if (wrap) {
            if (isOnline) {
                wrap.classList.remove('opacity-40', 'pointer-events-none', 'select-none');
                wrap.removeAttribute('aria-disabled');
                wrap.querySelectorAll('input, select, textarea, button').forEach(el => {
                    el.disabled = false;
                });
            } else {
                wrap.classList.add('opacity-40', 'pointer-events-none', 'select-none');
                wrap.setAttribute('aria-disabled', 'true');
                wrap.querySelectorAll('input, select, textarea, button').forEach(el => {
                    el.disabled = true;
                });
            }
        }
        if (banner) {
            if (isOnline) {
                banner.classList.add('hidden');
            } else {
                banner.classList.remove('hidden');
            }
        }
    },

    selectServiceFormDepositType: function(type) {
        const hidden = document.getElementById('srvFormDepositType');
        if (hidden) hidden.value = type;

        ['none', 'fixed', 'percent'].forEach(t => {
            const btn = document.getElementById(`srvFormDepositBtn_${t}`);
            if (btn) {
                if (t === type) {
                    btn.className = 'h-9 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold transition flex items-center justify-center shadow-xs cursor-pointer';
                } else {
                    btn.className = 'h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer';
                }
            }
        });

        const wrap = document.getElementById('srvFormDepositValueWrap');
        const label = document.getElementById('srvFormDepositValueLabel');
        if (wrap) {
            if (type === 'none') {
                wrap.classList.add('hidden');
            } else {
                wrap.classList.remove('hidden');
                if (label) {
                    label.textContent = type === 'fixed' ? 'Depozit məbləği (₼)' : 'Depozit faizi (%)';
                }
            }
        }
    },

    // Multilingual helpers
    activeServiceLanguages: [],
    serviceTranslationsData: {},
    availableServiceLanguages: [
        { code: 'az', name: 'Azərbaycan (AZ)', fullTitle: 'Azərbaycan dili (AZ)' },
        { code: 'ru', name: 'Русский (RU)', fullTitle: 'Rus dili (Русский)' },
        { code: 'tr', name: 'Türkçe (TR)', fullTitle: 'Türk dili (Türkçe)' },
        { code: 'en', name: 'English (EN)', fullTitle: 'İngilis dili (English)' }
    ],

    escapeHtml: function(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    toggleServiceLanguage: function(langKey) {
        if (!Array.isArray(this.activeServiceLanguages)) {
            this.activeServiceLanguages = [];
        }
        if (this.activeServiceLanguages.includes(langKey)) {
            this.removeServiceLanguage(langKey);
        } else {
            this.addServiceLanguage(langKey);
        }
    },

    addServiceLanguage: function(langKey) {
        if (!Array.isArray(this.activeServiceLanguages)) {
            this.activeServiceLanguages = [];
        }
        if (!this.activeServiceLanguages.includes(langKey)) {
            this.activeServiceLanguages.push(langKey);
        }
        if (!this.serviceTranslationsData) {
            this.serviceTranslationsData = {};
        }
        if (!this.serviceTranslationsData[langKey]) {
            this.serviceTranslationsData[langKey] = { name: '', description: '' };
        }
        this.renderServiceLanguagesTab();
        this.renderServiceModalTabs();
        setTimeout(() => {
            const input = document.getElementById(`srvFormLangName_${langKey}`);
            if (input) input.focus();
        }, 50);
    },

    removeServiceLanguage: function(langKey) {
        const curData = (this.serviceTranslationsData && this.serviceTranslationsData[langKey]) || {};
        const hasContent = (curData.name && curData.name.trim()) || (curData.description && curData.description.trim());
        const executeRemove = () => {
            this.activeServiceLanguages = (this.activeServiceLanguages || []).filter(l => l !== langKey);
            if (this.serviceTranslationsData) {
                delete this.serviceTranslationsData[langKey];
            }
            this.renderServiceLanguagesTab();
            this.renderServiceModalTabs();
        };

        if (hasContent) {
            const langObj = this.availableServiceLanguages.find(l => l.code === langKey);
            const langTitle = langObj ? langObj.name : langKey.toUpperCase();
            this.openDeleteConfirmModal({
                title: 'Tərcüməni sil',
                message: `<strong>"${langTitle}"</strong> dili üzrə daxil edilmiş tərcümə məlumatlarını silmək istədiyinizə əminsiniz?`,
                confirmText: 'Bəli, sil',
                onConfirm: executeRemove
            });
        } else {
            executeRemove();
        }
    },

    copyFromMainToLanguage: function(code) {
        const mainName = (document.getElementById('srvFormName')?.value || '').trim();
        const mainDesc = (document.getElementById('srvFormDescription')?.value || '').trim();
        if (!this.serviceTranslationsData) this.serviceTranslationsData = {};
        if (!this.serviceTranslationsData[code]) this.serviceTranslationsData[code] = { name: '', description: '' };
        if (mainName) this.serviceTranslationsData[code].name = mainName;
        if (mainDesc) this.serviceTranslationsData[code].description = mainDesc;
        const nameInput = document.getElementById(`srvFormLangName_${code}`);
        const descInput = document.getElementById(`srvFormLangDesc_${code}`);
        if (nameInput && mainName) nameInput.value = mainName;
        if (descInput && mainDesc) descInput.value = mainDesc;
        if (typeof App !== 'undefined') App.showToast('Əsas ad və təsvir köçürüldü');
    },

    onServiceLanguageInput: function(langKey, field, value) {
        if (!this.serviceTranslationsData) {
            this.serviceTranslationsData = {};
        }
        if (!this.serviceTranslationsData[langKey]) {
            this.serviceTranslationsData[langKey] = { name: '', description: '' };
        }
        this.serviceTranslationsData[langKey][field] = value;
    },

    renderServiceLanguagesTab: function() {
        const container = document.getElementById('srvFormLanguageContainer');
        if (!container) return;

        const languages = this.availableServiceLanguages || [];
        const activeLangs = this.activeServiceLanguages || [];

        let html = `
            <div class="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div class="flex items-center justify-between">
                    <label class="block text-xs font-bold text-slate-800">Tərcümə əlavə etmək istədiyiniz dili seçin:</label>
                    <span class="text-[11px] text-slate-400 font-medium">${activeLangs.length > 0 ? `${activeLangs.length} dil seçilib` : 'Dil seçilməyib'}</span>
                </div>
                <div class="flex items-center gap-2 flex-wrap">
                    ${languages.map(lang => {
                        const isActive = activeLangs.includes(lang.code);
                        if (isActive) {
                            return `
                                <button type="button" onclick="BusinessDashboardView.toggleServiceLanguage('${lang.code}')" class="h-9 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition hover:bg-slate-800">
                                    <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white">${lang.code.toUpperCase()}</span>
                                    <span>${lang.name}</span>
                                    <svg class="w-3.5 h-3.5 text-[#FFDD2D]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                                </button>
                            `;
                        } else {
                            return `
                                <button type="button" onclick="BusinessDashboardView.toggleServiceLanguage('${lang.code}')" class="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-2 cursor-pointer transition hover:border-slate-300">
                                    <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">${lang.code.toUpperCase()}</span>
                                    <span>+ ${lang.name}</span>
                                </button>
                            `;
                        }
                    }).join('')}
                </div>
            </div>
        `;

        if (activeLangs.length === 0) {
            html += `
                <div class="py-8 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/40">
                    <div class="w-12 h-12 mx-auto mb-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                    </div>
                    <div class="text-xs font-bold text-slate-800 mb-1">Fərdi dil tərcüməsi seçilməyib</div>
                    <p class="text-[11px] text-slate-400 max-w-sm mx-auto">«Əsas məlumatlar» bölməsində daxil edilmiş ad və təsvir avtomatik olaraq bütün dillərdə (Azərbaycan, Rus, Türk, İngilis) istifadə olunacaq. Hər hansı dildə xüsusi tərcümə təyin etmək üçün yuxarıdakı düymələrlə həmin dili aktivləşdirin.</p>
                </div>
            `;
        } else {
            html += `
                <div class="space-y-4">
                    ${activeLangs.map(code => {
                        const langInfo = languages.find(l => l.code === code) || { name: code, fullTitle: code };
                        const curData = this.serviceTranslationsData[code] || {};
                        const valName = this.escapeHtml(curData.name || '');
                        const valDesc = this.escapeHtml(curData.description || '');
                        const placeholderName =
                            code === 'az' ? 'Məsələn: Qadın Saç Kəsimi & Stil' :
                            code === 'ru' ? 'Например: Женская стрижка и укладка' :
                            code === 'tr' ? 'Örnek: Kadın Saç Kesimi & Fön' :
                            "E.g: Women's Haircut & Styling";
                        const placeholderDesc =
                            code === 'az' ? 'Azərbaycan dilində xidmət təsviri (boş buraxıldıqda əsas təsvir istifadə olunur)...' :
                            code === 'ru' ? 'Описание услуги на русском языке (если пусто, используется основное)...' :
                            code === 'tr' ? 'Türkçe hizmet açıklaması (boş bırakılırsa ana açıklama kullanılır)...' :
                            'Service description in English (if empty, main description is used)...';

                        return `
                            <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                                <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
                                    <div class="flex items-center gap-2">
                                        <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">${code.toUpperCase()}</span>
                                        <span class="font-bold text-xs text-slate-900">${langInfo.fullTitle}</span>
                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">Aktiv tərcümə</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button type="button" onclick="BusinessDashboardView.copyFromMainToLanguage('${code}')" class="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold transition flex items-center gap-1 cursor-pointer">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                                            Əsas addan köçür
                                        </button>
                                        <button type="button" onclick="BusinessDashboardView.removeServiceLanguage('${code}')" class="text-xs font-semibold text-rose-500 hover:text-rose-700 transition flex items-center gap-1 cursor-pointer ml-1">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                            Dili sil
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex items-center justify-between mb-1.5">
                                        <label class="block text-slate-700 font-medium text-xs">Xidmətin adı (${langInfo.name})</label>
                                        <span class="text-[10px] text-slate-400">Boş buraxıldıqda əsas ad istifadə olunur</span>
                                    </div>
                                    <input type="text" id="srvFormLangName_${code}" value="${valName}" oninput="BusinessDashboardView.onServiceLanguageInput('${code}', 'name', this.value)" placeholder="${placeholderName}" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-medium">
                                </div>
                                <div>
                                    <div class="flex items-center justify-between mb-1.5">
                                        <label class="block text-slate-700 font-medium text-xs">Təsvir (${langInfo.name})</label>
                                        <span class="text-[10px] text-slate-400">Boş buraxıldıqda əsas təsvir istifadə olunur</span>
                                    </div>
                                    <textarea id="srvFormLangDesc_${code}" rows="3" oninput="BusinessDashboardView.onServiceLanguageInput('${code}', 'description', this.value)" placeholder="${placeholderDesc}" class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition text-xs font-normal resize-none leading-relaxed">${valDesc}</textarea>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        container.innerHTML = html;
    },

    activeServiceLanguageTab: 'ru',
    switchServiceLanguageTab: function(langKey) {
        this.activeServiceLanguageTab = langKey;
    },

    // Notifications helpers
    selectServiceFormNotifTiming: function(timing) {
        const hidden = document.getElementById('srvFormNotifTiming');
        if (hidden) hidden.value = timing;
        ['24h', '2h', '1h'].forEach(t => {
            const btn = document.getElementById(`srvFormNotifTimingBtn_${t}`);
            if (btn) {
                if (t === timing) {
                    btn.className = 'h-9 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold transition flex items-center justify-center shadow-xs cursor-pointer';
                } else {
                    btn.className = 'h-9 rounded-xl border border-slate-200 bg-transparent text-slate-600 font-medium hover:bg-white transition flex items-center justify-center cursor-pointer';
                }
            }
        });
    },

    insertServiceNotifTag: function(tag) {
        const textarea = document.getElementById('srvFormNotifTemplate');
        if (!textarea) return;
        const start = textarea.selectionStart || textarea.value.length;
        const end = textarea.selectionEnd || textarea.value.length;
        const text = textarea.value;
        textarea.value = text.substring(0, start) + tag + text.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + tag.length, start + tag.length);
    },

    toggleServiceRepeatNotifBlock: function() {
        const checkbox = document.getElementById('srvFormNotifRepeatEnabled');
        const container = document.getElementById('srvFormNotifRepeatContainer');
        if (!container || !checkbox) return;
        if (checkbox.checked) {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    },

    selectServiceRepeatNotifDays: function(days) {
        const input = document.getElementById('srvFormNotifRepeatDays');
        if (input) input.value = days;
        [14, 21, 30, 45, 60].forEach(d => {
            const btn = document.getElementById(`srvFormRepeatBtn_${d}`);
            if (btn) {
                if (d === days) {
                    btn.className = 'h-8 px-3 rounded-lg border border-slate-900 bg-slate-900 text-white font-bold text-xs transition cursor-pointer shadow-xs';
                } else {
                    btn.className = 'h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-xs hover:border-slate-900 transition cursor-pointer';
                }
            }
        });
    },

    onServiceRepeatDaysCustomInput: function(val) {
        const days = parseInt(val) || 0;
        [14, 21, 30, 45, 60].forEach(d => {
            const btn = document.getElementById(`srvFormRepeatBtn_${d}`);
            if (btn) {
                if (d === days) {
                    btn.className = 'h-8 px-3 rounded-lg border border-slate-900 bg-slate-900 text-white font-bold text-xs transition cursor-pointer shadow-xs';
                } else {
                    btn.className = 'h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-xs hover:border-slate-900 transition cursor-pointer';
                }
            }
        });
    },

    insertServiceRepeatNotifTag: function(tag) {
        const textarea = document.getElementById('srvFormNotifRepeatTemplate');
        if (!textarea) return;
        const start = textarea.selectionStart || textarea.value.length;
        const end = textarea.selectionEnd || textarea.value.length;
        const text = textarea.value;
        textarea.value = text.substring(0, start) + tag + text.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + tag.length, start + tag.length);
    },

    setServiceRepeatNotifState: function(enabled, days, template) {
        const checkbox = document.getElementById('srvFormNotifRepeatEnabled');
        const container = document.getElementById('srvFormNotifRepeatContainer');
        const textarea = document.getElementById('srvFormNotifRepeatTemplate');
        if (checkbox) checkbox.checked = !!enabled;
        if (container) {
            if (enabled) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        }
        this.selectServiceRepeatNotifDays(days || 30);
        if (textarea) textarea.value = template || '';
    },

    toggleServiceReminderFields: function(forceState) {
        const chk = document.getElementById('srvFormNotifEnabled');
        const wrap = document.getElementById('srvFormNotifDetailsWrap');
        if (!chk) return;
        const isEnabled = (forceState !== undefined) ? !!forceState : !!chk.checked;
        chk.checked = isEnabled;
        if (wrap) {
            if (isEnabled) {
                wrap.classList.remove('opacity-40', 'pointer-events-none', 'select-none');
                wrap.removeAttribute('aria-disabled');
                wrap.querySelectorAll('input, select, textarea, button').forEach(el => { el.disabled = false; });
            } else {
                wrap.classList.add('opacity-40', 'pointer-events-none', 'select-none');
                wrap.setAttribute('aria-disabled', 'true');
                wrap.querySelectorAll('input, select, textarea, button').forEach(el => { el.disabled = true; });
            }
        }
    },

    openCreateServiceModal: function(editId = null, defaultCatId = null) {
        const modal = document.getElementById('bizCreateServiceModal');
        if (!modal) return;

        const categories = this.getServiceCategories();

        const editIdInput = document.getElementById('srvFormEditId');
        const catIdHidden = document.getElementById('srvFormCategoryId');
        const titleEl = document.getElementById('srvModalTitle');
        const submitBtn = document.getElementById('srvModalSubmitBtn');
        const nameInput = document.getElementById('srvFormName');
        const priceInput = document.getElementById('srvFormPrice');
        const priceMaxInput = document.getElementById('srvFormPriceMax');
        const durationInput = document.getElementById('srvFormDuration');
        const descInput = document.getElementById('srvFormDescription');

        // Online elements
        const onlineInput = document.getElementById('srvFormOnlineBooking');
        const onlineTitleInput = document.getElementById('srvFormOnlineTitle');
        const depositValueInput = document.getElementById('srvFormDepositValue');
        const cancelRuleSelect = document.getElementById('srvFormCancelRule');
        const clientNoteInput = document.getElementById('srvFormClientNote');

        // Notification elements
        const notifEnabledInput = document.getElementById('srvFormNotifEnabled');
        const notifTemplateInput = document.getElementById('srvFormNotifTemplate');
        const notifReviewInput = document.getElementById('srvFormNotifReview');

        const catBlock = document.getElementById('srvFormCategoryBlock');
        const catSelect = document.getElementById('srvFormCategory');

        if (catSelect) {
            let catOptions = `<option value="">-- Kateqoriyasız --</option>`;
            catOptions += categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
            catSelect.innerHTML = catOptions;
        }

        if (editId) {
            // EDIT MODE
            const services = this.getServices();
            const srv = services.find(s => s.id === editId);
            if (!srv) return;

            if (editIdInput) editIdInput.value = srv.id;
            if (catIdHidden) catIdHidden.value = srv.categoryId || '';
            if (titleEl) titleEl.textContent = 'Xidməti redaktə et';
            if (submitBtn) submitBtn.textContent = 'Dəyişiklikləri saxla';

            if (nameInput) nameInput.value = srv.name || '';
            if (priceInput) priceInput.value = srv.price || '';
            if (priceMaxInput) priceMaxInput.value = srv.priceMax || '';
            if (durationInput) durationInput.value = srv.duration || 45;
            const bufferInput = document.getElementById('srvFormBufferTime');
            if (bufferInput) bufferInput.value = (srv.breakTime !== undefined ? srv.breakTime : (srv.bufferTime !== undefined ? srv.bufferTime : 0));
            this.updateServiceTotalTimePreview();
            if (descInput) descInput.value = srv.description || '';

            // Online fields
            const isOnline = srv.onlineBooking !== false;
            if (onlineInput) onlineInput.checked = isOnline;
            this.toggleServiceOnlineBookingFields(isOnline);
            if (onlineTitleInput) onlineTitleInput.value = (srv.onlineSettings && srv.onlineSettings.title) || '';
            const depType = (srv.onlineSettings && srv.onlineSettings.depositType) || 'none';
            this.selectServiceFormDepositType(depType);
            if (depositValueInput) depositValueInput.value = (srv.onlineSettings && srv.onlineSettings.depositValue) || '';
            if (cancelRuleSelect) cancelRuleSelect.value = (srv.onlineSettings && srv.onlineSettings.cancelRule) || 'free_2h';
            if (clientNoteInput) clientNoteInput.value = (srv.onlineSettings && srv.onlineSettings.clientNote) || '';

            // Language fields
            this.serviceTranslationsData = (srv.translations && typeof srv.translations === 'object') ? JSON.parse(JSON.stringify(srv.translations)) : {};
            this.activeServiceLanguages = Object.keys(this.serviceTranslationsData).filter(k => {
                const item = this.serviceTranslationsData[k];
                return item && (item.name || item.description);
            });

            // Notification fields
            const isNotifOn = !srv.notifications || srv.notifications.enabled !== false;
            if (notifEnabledInput) notifEnabledInput.checked = isNotifOn;
            this.toggleServiceReminderFields(isNotifOn);
            this.selectServiceFormNotifTiming((srv.notifications && srv.notifications.timing) || '24h');
            if (notifTemplateInput) notifTemplateInput.value = (srv.notifications && srv.notifications.template) || '';
            if (notifReviewInput) notifReviewInput.checked = !srv.notifications || srv.notifications.reviewRequest !== false;
            const repeatCfg = srv.notifications && srv.notifications.repeatVisit;
            this.setServiceRepeatNotifState(
                !!(repeatCfg && repeatCfg.enabled),
                (repeatCfg && repeatCfg.days) || 30,
                (repeatCfg && repeatCfg.template) || ''
            );

            // In edit mode: show category dropdown
            if (catBlock) catBlock.classList.remove('hidden');
            if (catSelect) catSelect.value = srv.categoryId || '';

            this.selectServiceFormPriceType(srv.priceType || 'fixed');
            this.selectServiceFormGender(srv.gender || 'all');
            this.selectedComboServices = Array.isArray(srv.comboItems) ? JSON.parse(JSON.stringify(srv.comboItems)) : [];
            const isGrp = !!(srv.isGroup || srv.serviceFormat === 'group' || srv.serviceFormat === 'group_combo');
            const isCmb = !!(srv.isCombo || srv.serviceFormat === 'combo' || srv.serviceFormat === 'group_combo');
            this.selectServiceFormFormat(isGrp ? 'group' : 'individual');
            const comboCheckbox = document.getElementById('srvFormIsCombo');
            if (comboCheckbox) comboCheckbox.checked = isCmb;
            this.onServiceFormIsComboChange(isCmb);
            const capInputEdit = document.getElementById('srvFormMaxCapacity');
            if (capInputEdit) capInputEdit.value = srv.maxCapacity || 6;
            this.selectedServiceStaffIds = Array.isArray(srv.staffIds) ? [...srv.staffIds] : [];
            this.serviceStaffOverrides = (srv.staffOverrides && typeof srv.staffOverrides === 'object') ? JSON.parse(JSON.stringify(srv.staffOverrides)) : {};
            this.selectedServiceResourceIds = Array.isArray(srv.resourceIds) ? [...srv.resourceIds] : [];
            this.selectedServiceTechCardId = srv.techCardId || null;
            this.selectedServiceTechCardName = srv.techCardName || null;
            this.selectedServiceMaterials = Array.isArray(srv.materials) ? JSON.parse(JSON.stringify(srv.materials)) : [];
            if (!this.selectedServiceTechCardId && this.selectedServiceMaterials.length > 0) {
                const techCards = (typeof this.getTechCards === 'function') ? this.getTechCards() : [];
                const match = techCards.find(tc => tc.serviceName === srv.name || tc.name === srv.name);
                if (match) {
                    this.selectedServiceTechCardId = match.id;
                    this.selectedServiceTechCardName = match.name;
                }
            }
            this.serviceFormImages = Array.isArray(srv.images) ? [...srv.images] : (srv.image ? [srv.image] : []);
        } else {
            // CREATE MODE
            const targetCatId = (defaultCatId !== undefined && defaultCatId !== null) ? defaultCatId : '';

            if (editIdInput) editIdInput.value = '';
            if (catIdHidden) catIdHidden.value = targetCatId;
            if (titleEl) titleEl.textContent = 'Yeni xidmət əlavə et';
            if (submitBtn) submitBtn.textContent = 'Xidməti Saxla';

            if (nameInput) nameInput.value = '';
            if (priceInput) priceInput.value = '';
            if (priceMaxInput) priceMaxInput.value = '';
            if (durationInput) durationInput.value = 45;
            const bufferInput = document.getElementById('srvFormBufferTime');
            if (bufferInput) bufferInput.value = 0;
            this.updateServiceTotalTimePreview();
            if (descInput) descInput.value = '';

            // Online fields
            if (onlineInput) onlineInput.checked = true;
            this.toggleServiceOnlineBookingFields(true);
            if (onlineTitleInput) onlineTitleInput.value = '';
            this.selectServiceFormDepositType('none');
            if (depositValueInput) depositValueInput.value = '';
            if (cancelRuleSelect) cancelRuleSelect.value = 'free_2h';
            if (clientNoteInput) clientNoteInput.value = '';

            // Language fields
            this.serviceTranslationsData = {};
            this.activeServiceLanguages = [];

            // Notification fields
            if (notifEnabledInput) notifEnabledInput.checked = true;
            this.toggleServiceReminderFields(true);
            this.selectServiceFormNotifTiming('24h');
            if (notifTemplateInput) notifTemplateInput.value = '';
            if (notifReviewInput) notifReviewInput.checked = true;
            this.setServiceRepeatNotifState(false, 30, '');

            // In create mode: category can be selected freely or left uncategorized
            if (catBlock) catBlock.classList.remove('hidden');
            if (catSelect) catSelect.value = targetCatId;

            this.selectServiceFormPriceType('fixed');
            this.selectServiceFormGender('all');
            this.selectedComboServices = [];
            this.selectServiceFormFormat('individual');
            const comboCheckbox = document.getElementById('srvFormIsCombo');
            if (comboCheckbox) comboCheckbox.checked = false;
            this.onServiceFormIsComboChange(false);
            const capInputNew = document.getElementById('srvFormMaxCapacity');
            if (capInputNew) capInputNew.value = 6;
            this.selectedServiceStaffIds = [];
            this.serviceStaffOverrides = {};
            this.selectedServiceResourceIds = [];
            this.selectedServiceTechCardId = null;
            this.selectedServiceTechCardName = null;
            this.selectedServiceMaterials = [];
            this.serviceFormImages = [];
        }

        this.populateComboSelectOptions(editId);
        this.renderComboItemsList();
        this.renderServiceFormStaffOptions();
        this.renderServiceFormResourceOptions();
        this.populateServiceTechCardsSelect(this.selectedServiceTechCardId);
        this.renderServiceFormMaterialsList();
        this.renderServiceLanguagesTab();
        this.renderServiceFormImages();

        this.activeServiceModalTab = 'general';
        this.renderServiceModalTabs();
        this.switchServiceModalTab('general');
        modal.classList.remove('hidden');
        if (nameInput) nameInput.focus();
    },

    closeCreateServiceModal: function() {
        const modal = document.getElementById('bizCreateServiceModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveService: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const editIdInput = document.getElementById('srvFormEditId');
        const catIdHidden = document.getElementById('srvFormCategoryId');
        const catSelect = document.getElementById('srvFormCategory');
        const nameInput = document.getElementById('srvFormName');
        const priceInput = document.getElementById('srvFormPrice');
        const priceMaxInput = document.getElementById('srvFormPriceMax');
        const durationInput = document.getElementById('srvFormDuration');
        const priceTypeInput = document.getElementById('srvFormPriceType');
        const genderInput = document.getElementById('srvFormGender');
        const descInput = document.getElementById('srvFormDescription');

        // Online fields
        const onlineInput = document.getElementById('srvFormOnlineBooking');
        const onlineTitleInput = document.getElementById('srvFormOnlineTitle');
        const depositTypeInput = document.getElementById('srvFormDepositType');
        const depositValueInput = document.getElementById('srvFormDepositValue');
        const cancelRuleSelect = document.getElementById('srvFormCancelRule');
        const clientNoteInput = document.getElementById('srvFormClientNote');

        // Notification fields
        const notifEnabledInput = document.getElementById('srvFormNotifEnabled');
        const notifTimingInput = document.getElementById('srvFormNotifTiming');
        const notifTemplateInput = document.getElementById('srvFormNotifTemplate');
        const notifReviewInput = document.getElementById('srvFormNotifReview');

        const formatInput = document.getElementById('srvFormFormat');
        const isGroup = (formatInput && formatInput.value === 'group');
        const comboCheckbox = document.getElementById('srvFormIsCombo');
        const isCombo = comboCheckbox ? !!comboCheckbox.checked : false;
        const serviceFormat = isCombo ? (isGroup ? 'group_combo' : 'combo') : (isGroup ? 'group' : 'individual');
        const maxCapacityInput = document.getElementById('srvFormMaxCapacity');
        const maxCapacity = isGroup ? (parseInt(maxCapacityInput ? maxCapacityInput.value : 6) || 6) : 1;
        const comboItems = isCombo ? [...(this.selectedComboServices || [])] : [];

        const editId = editIdInput ? editIdInput.value.trim() : '';
        const name = nameInput ? nameInput.value.trim() : '';
        const price = parseFloat(priceInput ? priceInput.value : 0) || 0;
        const priceMax = priceMaxInput && priceMaxInput.value ? parseFloat(priceMaxInput.value) : null;
        const duration = parseInt(durationInput ? durationInput.value : 45) || 45;
        const bufferInput = document.getElementById('srvFormBufferTime');
        const breakTime = parseInt(bufferInput ? bufferInput.value : 0) || 0;
        const priceType = priceTypeInput ? priceTypeInput.value : 'fixed';
        const gender = genderInput ? genderInput.value : 'all';
        const desc = descInput ? descInput.value.trim() : '';

        // Category selection
        let categoryId = catSelect ? catSelect.value : (catIdHidden ? catIdHidden.value : '');
        if (!categoryId || categoryId === 'uncategorized') {
            categoryId = null;
        }

        if (!name) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa xidmət adını daxil edin');
            this.switchServiceModalTab('general');
            if (nameInput) nameInput.focus();
            return;
        }
        if (price <= 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa xidmət qiymətini qeyd edin');
            this.switchServiceModalTab('general');
            if (priceInput) priceInput.focus();
            return;
        }
        if (isCombo && comboItems.length === 0) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa kompleks paketə ən azı bir xidmət əlavə edin');
            this.switchServiceModalTab('general');
            return;
        }

        const onlineBooking = onlineInput ? !!onlineInput.checked : true;
        const onlineSettings = {
            title: onlineTitleInput ? onlineTitleInput.value.trim() : '',
            depositType: depositTypeInput ? depositTypeInput.value : 'none',
            depositValue: depositValueInput ? parseFloat(depositValueInput.value) || 0 : 0,
            cancelRule: cancelRuleSelect ? cancelRuleSelect.value : 'free_2h',
            clientNote: clientNoteInput ? clientNoteInput.value.trim() : ''
        };

        const translations = {};
        (this.activeServiceLanguages || []).forEach(lang => {
            const data = (this.serviceTranslationsData && this.serviceTranslationsData[lang]) || {};
            const nameEl = document.getElementById(`srvFormLangName_${lang}`);
            const descEl = document.getElementById(`srvFormLangDesc_${lang}`);
            const nameVal = (nameEl ? nameEl.value : (data.name || '')).trim();
            const descVal = (descEl ? descEl.value : (data.description || '')).trim();
            if (nameVal || descVal) {
                translations[lang] = {
                    name: nameVal,
                    description: descVal
                };
            }
        });

        const repeatEnabledInput = document.getElementById('srvFormNotifRepeatEnabled');
        const repeatDaysInput = document.getElementById('srvFormNotifRepeatDays');
        const repeatTemplateInput = document.getElementById('srvFormNotifRepeatTemplate');

        const notifications = {
            enabled: notifEnabledInput ? !!notifEnabledInput.checked : true,
            timing: notifTimingInput ? notifTimingInput.value : '24h',
            template: notifTemplateInput ? notifTemplateInput.value.trim() : '',
            reviewRequest: notifReviewInput ? !!notifReviewInput.checked : true,
            repeatVisit: {
                enabled: repeatEnabledInput ? !!repeatEnabledInput.checked : false,
                days: repeatDaysInput ? (parseInt(repeatDaysInput.value) || 30) : 30,
                template: repeatTemplateInput ? repeatTemplateInput.value.trim() : ''
            }
        };

        const activeCtx = this.getActiveContext();
        const services = this.getServices();

        const serviceImages = Array.isArray(this.serviceFormImages) ? [...this.serviceFormImages] : [];
        const serviceCoverImage = serviceImages[0] || '';

        if (editId) {
            const idx = services.findIndex(s => s.id === editId);
            if (idx !== -1) {
                services[idx] = {
                    ...services[idx],
                    name: name,
                    categoryId: categoryId,
                    serviceFormat: serviceFormat,
                    isGroup: isGroup,
                    isCombo: isCombo,
                    comboItems: comboItems,
                    maxCapacity: maxCapacity,
                    price: price,
                    priceType: priceType,
                    priceMax: priceType === 'range' ? priceMax : null,
                    duration: duration,
                    breakTime: breakTime,
                    bufferTime: breakTime,
                    gender: gender,
                    description: desc,
                    onlineBooking: onlineBooking,
                    onlineSettings: onlineSettings,
                    images: serviceImages,
                    image: serviceCoverImage,
                    staffIds: [...this.selectedServiceStaffIds],
                    staffOverrides: JSON.parse(JSON.stringify(this.serviceStaffOverrides || {})),
                    resourceIds: [...this.selectedServiceResourceIds],
                    techCardId: this.selectedServiceTechCardId || null,
                    techCardName: this.selectedServiceTechCardName || null,
                    materials: [...this.selectedServiceMaterials],
                    translations: translations,
                    notifications: notifications
                };
                this.saveServices(services);
                if (typeof App !== 'undefined') App.showToast('Xidmət uğurla yeniləndi!');
            }
        } else {
            const newSrv = {
                id: 'srv_' + Date.now(),
                name: name,
                categoryId: categoryId,
                serviceFormat: serviceFormat,
                isGroup: isGroup,
                isCombo: isCombo,
                comboItems: comboItems,
                maxCapacity: maxCapacity,
                price: price,
                priceType: priceType,
                priceMax: priceType === 'range' ? priceMax : null,
                duration: duration,
                breakTime: breakTime,
                bufferTime: breakTime,
                gender: gender,
                description: desc,
                onlineBooking: onlineBooking,
                onlineSettings: onlineSettings,
                images: serviceImages,
                image: serviceCoverImage,
                staffIds: [...this.selectedServiceStaffIds],
                staffOverrides: JSON.parse(JSON.stringify(this.serviceStaffOverrides || {})),
                resourceIds: [...this.selectedServiceResourceIds],
                techCardId: this.selectedServiceTechCardId || null,
                techCardName: this.selectedServiceTechCardName || null,
                materials: [...this.selectedServiceMaterials],
                translations: translations,
                notifications: notifications,
                branchId: activeCtx.branchId,
                branchName: activeCtx.branchName,
                businessName: activeCtx.businessName,
                createdAt: new Date().toISOString()
            };
            services.push(newSrv);
            this.saveServices(services);
            if (typeof App !== 'undefined') App.showToast('Yeni xidmət uğurla əlavə edildi!');
        }

        this.closeCreateServiceModal();
        this.refreshServicesTab();
    },

    deleteService: function(srvId) {
        const services = this.getServices();
        const srv = services.find(s => s.id === srvId);
        if (!srv) return;

        this.openDeleteConfirmModal({
            title: 'Xidməti sil',
            message: `<strong>"${srv.name}"</strong> xidmətini silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const updated = services.filter(s => s.id !== srvId);
                this.saveServices(updated);
                if (typeof App !== 'undefined') App.showToast('Xidmət silindi!');
                this.refreshServicesTab();
            }
        });
    },

    // Service Filter Modal Methods
    openServiceFilterModal: function() {
        const modal = document.getElementById('bizServiceFilterModal');
        if (!modal) return;

        const categories = this.getServiceCategories();
        const catSelect = document.getElementById('srvFilterModalCategory');
        if (catSelect) {
            let catOptions = `<option value="all">Bütün kateqoriyalar</option>`;
            categories.forEach(c => {
                const isSelected = this.serviceCategoryFilter === c.id;
                catOptions += `<option value="${c.id}" ${isSelected ? 'selected' : ''}>${c.name}</option>`;
            });
            catOptions += `<option value="uncategorized" ${this.serviceCategoryFilter === 'uncategorized' ? 'selected' : ''}>Kateqoriyasız xidmətlər</option>`;
            catSelect.innerHTML = catOptions;
        }

        this.selectServiceFilterGender(this.serviceGenderFilter || 'all');
        this.selectServiceFilterOnline(this.serviceOnlineFilter || 'all');
        this.selectServiceFilterFormat(this.serviceFormatFilter || 'all');

        modal.classList.remove('hidden');
    },

    closeServiceFilterModal: function() {
        const modal = document.getElementById('bizServiceFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    filterModalTempGender: 'all',
    filterModalTempOnline: 'all',
    filterModalTempFormat: 'all',

    selectServiceFilterGender: function(val) {
        this.filterModalTempGender = val;
        ['all', 'women', 'men', 'kids'].forEach(g => {
            const btn = document.getElementById(`srvFilterGenderBtn_${g}`);
            if (btn) {
                if (g === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer';
                }
            }
        });
    },

    selectServiceFilterOnline: function(val) {
        this.filterModalTempOnline = val;
        ['all', 'online', 'offline'].forEach(o => {
            const btn = document.getElementById(`srvFilterOnlineBtn_${o}`);
            if (btn) {
                if (o === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer';
                }
            }
        });
    },

    selectServiceFilterFormat: function(val) {
        this.filterModalTempFormat = val;
        ['all', 'individual', 'group', 'combo'].forEach(f => {
            const btn = document.getElementById(`srvFilterFormatBtn_${f}`);
            if (btn) {
                if (f === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer';
                }
            }
        });
    },

    applyServiceFilterModal: function() {
        const catSelect = document.getElementById('srvFilterModalCategory');
        if (catSelect) this.serviceCategoryFilter = catSelect.value;
        this.serviceGenderFilter = this.filterModalTempGender || 'all';
        this.serviceOnlineFilter = this.filterModalTempOnline || 'all';
        this.serviceFormatFilter = this.filterModalTempFormat || 'all';

        this.closeServiceFilterModal();
        this.refreshServicesTab();
    },

    resetServiceFilters: function() {
        this.serviceSearchQuery = '';
        this.serviceCategoryFilter = 'all';
        this.serviceGenderFilter = 'all';
        this.serviceOnlineFilter = 'all';
        this.serviceFormatFilter = 'all';
        this.closeServiceFilterModal();
        this.refreshServicesTab();
    },

    // ==========================================
});
