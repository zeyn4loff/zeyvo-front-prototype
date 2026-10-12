// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {

    // ==========================================
    // REUSABLE UI COMPONENTS (Segmented Tabs, etc.)
    // ==========================================
    renderSegmentedTabs: function(options) {
        return ZeyvoUI.segmentedTabs(options);
    },

    // ==========================================
    // BRANCH & INDIVIDUAL MASTER METHODS (Filiallar və Fərdi Ustalar)
    // ==========================================
    tempBranchPhotos: [],
    activeBranchTab: 'main',
    isIndividualMasterMode: false,

    updateModalModeUI: function() {
        const isMaster = !!this.isIndividualMasterMode;
        
        const subtitleEl = document.getElementById('bizBranchModalSubtitle');
        if (subtitleEl) {
            subtitleEl.textContent = isMaster
                ? 'Fərdi ustanın profili, xidmətləri, ünvanı, portfolio şəkilləri və iş qrafiki'
                : 'Filial məlumatlarını, interyer şəkillərini və iş rejimini daxil edin';
        }
        
        const logoLabel = document.getElementById('bizBranchLogoLabel');
        if (logoLabel) logoLabel.textContent = isMaster ? 'Ustanın Fotosu / Loqo' : 'Filial loqosu';

        const logoSub = document.getElementById('bizBranchLogoSubtitle');
        if (logoSub) logoSub.textContent = isMaster
            ? 'Ustanın profil fotosu və ya loqosu (PNG, JPG, WebP)'
            : 'Müştərilərin tanıması üçün loqo və ya foto (PNG, JPG, WebP)';

        const nameLabel = document.getElementById('bizBranchNameLabel');
        if (nameLabel) nameLabel.textContent = isMaster ? 'Ustanın Adı və Soyadı *' : 'Filialın Adı *';

        const nameInput = document.getElementById('bizBranchName');
        if (nameInput) nameInput.placeholder = isMaster ? 'Məs: Samir Əliyev (Bərbər)' : 'Məs: Nizami Filialı';

        const descLabel = document.getElementById('bizBranchDescLabel');
        if (descLabel) descLabel.textContent = isMaster ? 'Usta Haqqında Qısa Məlumat' : 'Filial Haqqında Qısa Məlumat';

        const descInput = document.getElementById('bizBranchDesc');
        if (descInput) descInput.placeholder = isMaster ? 'Təcrübə, xidmət yanaşması və ya qeydlər...' : 'Filial haqqında qısa təsvir və ya qeydlər...';

        const uploadText = document.getElementById('bizBranchInteriorUploadText');
        if (uploadText) uploadText.textContent = isMaster ? 'Portfolio şəkillərini yükləmək üçün klikləyin' : 'İnteryer şəkillərini yükləmək üçün klikləyin';

        const countLabel = document.getElementById('bizBranchInteriorCountLabel');
        if (countLabel) {
            countLabel.innerHTML = isMaster
                ? 'Portfolio Şəkilləri (<span id="branchInteriorGalleryCount">0</span>)'
                : 'Yüklənmiş Şəkillər (<span id="branchInteriorGalleryCount">0</span>)';
        }
    },

    branchTabsList: [
        { id: 'main', label: 'Əsas' },
        { id: 'address', label: 'Ünvan' },
        { id: 'interior', label: 'İnteryer', badge: 0 },
        { id: 'schedule', label: 'İş qrafiki' },
        { id: 'messengers', label: 'Mesencerlər' },
        { id: 'socials', label: 'Sosial şəbəkələr' }
    ],

    renderBranchTabs: function() {
        const container = document.getElementById('bizBranchTabsContainer');
        if (!container) return;
        const photoCount = Array.isArray(this.tempBranchPhotos) ? this.tempBranchPhotos.length : 0;
        const isMaster = !!this.isIndividualMasterMode;
        const tabsWithBadge = this.branchTabsList.map(t => {
            if (t.id === 'interior') {
                return { ...t, label: isMaster ? 'Portfolio' : 'İnteryer', badge: photoCount };
            }
            return t;
        });
        container.innerHTML = this.renderSegmentedTabs({
            tabs: tabsWithBadge,
            activeId: this.activeBranchTab || 'main',
            onSelect: 'BusinessDashboardView.switchBranchTab'
        });
    },

    switchBranchTab: function(tabKey) {
        this.activeBranchTab = tabKey;
        this.renderBranchTabs();
        const tabs = ['main', 'address', 'interior', 'schedule', 'messengers', 'socials'];
        tabs.forEach(t => {
            const pane = document.getElementById(`branchPane_${t}`);
            if (pane) {
                if (t === tabKey) {
                    pane.classList.remove('hidden');
                } else {
                    pane.classList.add('hidden');
                }
            }
        });
        if (tabKey === 'address') {
            this.updateBranchMapPreview();
        }
    },

    tempBranchLogo: null,

    handleBranchLogoUpload: function(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa şəkil faylı seçin (PNG, JPG, WebP).");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            if (typeof App !== 'undefined') App.showToast("Şəkil ölçüsü 5MB-dan kiçik olmalıdır!");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.tempBranchLogo = e.target.result;
            this.updateBranchLogoUI();
            if (typeof App !== 'undefined') App.showToast("Filial loqosu yükləndi!");
        };
        reader.readAsDataURL(file);
        event.target.value = '';
    },

    removeBranchLogo: function() {
        this.tempBranchLogo = null;
        const fileInput = document.getElementById('bizBranchLogoFileInput');
        if (fileInput) fileInput.value = '';
        this.updateBranchLogoUI();
        if (typeof App !== 'undefined') App.showToast("Filial loqosu silindi.");
    },

    updateBranchLogoUI: function() {
        const previewEl = document.getElementById('bizBranchLogoPreview');
        const delBtn = document.getElementById('bizBranchDeleteLogoBtn');
        if (!previewEl) return;

        if (this.tempBranchLogo) {
            previewEl.innerHTML = `<img src="${this.tempBranchLogo}" alt="Loqo" class="w-full h-full object-cover">`;
            previewEl.className = "w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-2xs overflow-hidden flex items-center justify-center transition";
            if (delBtn) delBtn.classList.remove('hidden');
        } else {
            previewEl.innerHTML = this.isIndividualMasterMode ? '<svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' : '<svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>';
            previewEl.className = "w-14 h-14 rounded-2xl bg-white border-2 border-dashed border-slate-300 group-hover:border-amber-400 group-hover:bg-amber-50/20 flex items-center justify-center text-xl font-bold text-slate-400 shadow-2xs overflow-hidden transition";
            if (delBtn) delBtn.classList.add('hidden');
        }
    },

    handleBranchPhotosUpload: function(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        let processed = 0;
        files.forEach(file => {
            if (!file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                this.tempBranchPhotos.push(event.target.result);
                processed++;
                if (processed === files.length) {
                    this.renderBranchPhotos();
                }
            };
            reader.readAsDataURL(file);
        });
        e.target.value = '';
    },

    addBranchPhotoByUrl: function() {
        const input = document.getElementById('bizBranchPhotoUrlInput');
        const url = (input?.value || '').trim();
        if (!url) return;
        this.tempBranchPhotos.push(url);
        if (input) input.value = '';
        this.renderBranchPhotos();
    },

    deleteBranchPhoto: function(index) {
        if (index >= 0 && index < this.tempBranchPhotos.length) {
            this.tempBranchPhotos.splice(index, 1);
            this.renderBranchPhotos();
        }
    },

    clearAllBranchPhotos: function() {
        const label = this.isIndividualMasterMode ? 'Bütün portfolio şəkilləri' : 'Bütün interyer şəkilləri';
        this.openDeleteConfirmModal({
            title: 'Şəkilləri sil',
            message: `<strong>${label}</strong> silinsin?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                this.tempBranchPhotos = [];
                this.renderBranchPhotos();
            }
        });
    },

    renderBranchPhotos: function() {
        const grid = document.getElementById('branchPhotosGrid');
        const countBadge = document.getElementById('branchInteriorTabBadge');
        const galleryCount = document.getElementById('branchInteriorGalleryCount');
        const clearBtn = document.getElementById('btnClearAllPhotos');

        const total = this.tempBranchPhotos.length;
        if (countBadge) countBadge.textContent = total;
        if (galleryCount) galleryCount.textContent = total;
        if (clearBtn) clearBtn.classList.toggle('hidden', total === 0);
        this.renderBranchTabs();

        if (!grid) return;

        if (total === 0) {
            grid.innerHTML = `
                <div class="col-span-2 sm:col-span-3 py-6 text-center text-slate-400 bg-slate-50/80 rounded-2xl border border-dashed border-slate-200">
                    <p class="text-xs font-medium">${this.isIndividualMasterMode ? 'Hələ heç bir portfolio şəkli əlavə edilməyib' : 'Hələ heç bir interyer şəkli əlavə edilməyib'}</p>
                    <p class="text-[11px] text-slate-400 mt-0.5">${this.isIndividualMasterMode ? 'Yuxarıdakı sahə ilə ustanın əl işlərinin şəkillərini yükləyə bilərsiniz' : 'Yuxarıdakı sahə ilə filialın şəkillərini yükləyə bilərsiniz'}</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.tempBranchPhotos.map((photo, idx) => `
            <div class="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video shadow-2xs">
                <img src="${photo}" alt="Filial interyeri" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <button type="button" onclick="BusinessDashboardView.deleteBranchPhoto(${idx})" class="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition shadow-sm" title="Şəkli sil">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                </div>
                <div class="absolute top-1.5 right-1.5 sm:hidden">
                    <button type="button" onclick="BusinessDashboardView.deleteBranchPhoto(${idx})" class="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs" title="Sil"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                </div>
            </div>
        `).join('');
    },

    toggleDayOff: function(dayKey) {
        const isOff = document.getElementById(`sched_off_${dayKey}`)?.checked || false;
        const openInput = document.getElementById(`sched_open_${dayKey}`);
        const closeInput = document.getElementById(`sched_close_${dayKey}`);
        if (openInput) openInput.disabled = isOff;
        if (closeInput) closeInput.disabled = isOff;
    },

    applyQuickSchedulePreset: function(preset) {
        const input = document.getElementById('bizBranchHours');
        if (input) input.value = preset;
    },

    applyScheduleToAllDays: function() {
        const firstOpen = document.getElementById('sched_open_mon')?.value || '09:00';
        const firstClose = document.getElementById('sched_close_mon')?.value || '21:00';
        const firstOff = document.getElementById('sched_off_mon')?.checked || false;

        const days = ['tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        days.forEach(d => {
            const o = document.getElementById(`sched_open_${d}`);
            const c = document.getElementById(`sched_close_${d}`);
            const off = document.getElementById(`sched_off_${d}`);
            if (o) o.value = firstOpen;
            if (c) c.value = firstClose;
            if (off) {
                off.checked = firstOff;
                this.toggleDayOff(d);
            }
        });
        if (typeof App !== 'undefined') App.showToast("Bazar ertəsinin qrafiki bütün günlərə tətbiq edildi");
    },

    // ==========================================
    // DYNAMIC BRANCH PHONE NUMBERS (Bayraq + +994 və Dinamik Siyahı)
    // ==========================================
    getPhoneInputRowHtml: function(value = '', canDelete = true) {
        let cleanVal = (value || '').replace(/^\+994\s*/, '').trim();
        return `
            <div class="flex items-center gap-2 biz-branch-phone-row">
                <div class="flex-1 h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center overflow-hidden focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
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
                    <input type="tel" maxlength="15" value="${cleanVal}" placeholder="(50) 000-00-00" oninput="App.formatAzPhone ? App.formatAzPhone(this) : null" class="biz-branch-phone-field w-full h-full px-3 bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                </div>
                <button type="button" onclick="BusinessDashboardView.removeBranchPhoneRow(this)" class="w-10 h-11 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center transition shrink-0 ${canDelete ? '' : 'hidden'}" title="Nömrəni sil">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </div>
        `;
    },

    addBranchPhoneRow: function(value = '') {
        const container = document.getElementById('bizBranchPhonesContainer');
        if (!container) return;
        const temp = document.createElement('div');
        temp.innerHTML = this.getPhoneInputRowHtml(value, true);
        const el = temp.firstElementChild;
        container.appendChild(el);
        this.updatePhoneDeleteButtons();
        const inp = el.querySelector('input');
        if (inp && !value) inp.focus();
    },

    removeBranchPhoneRow: function(btn) {
        const row = btn.closest('.biz-branch-phone-row');
        if (row) {
            row.remove();
            this.updatePhoneDeleteButtons();
        }
    },

    updatePhoneDeleteButtons: function() {
        const container = document.getElementById('bizBranchPhonesContainer');
        if (!container) return;
        const rows = container.querySelectorAll('.biz-branch-phone-row');
        rows.forEach(r => {
            const btn = r.querySelector('button');
            if (btn) {
                if (rows.length <= 1) {
                    btn.classList.add('hidden');
                } else {
                    btn.classList.remove('hidden');
                }
            }
        });
    },

    setBranchPhones: function(phones = []) {
        const container = document.getElementById('bizBranchPhonesContainer');
        if (!container) return;
        container.innerHTML = '';
        const list = Array.isArray(phones) && phones.length > 0 ? phones : [''];
        list.forEach(p => {
            const temp = document.createElement('div');
            temp.innerHTML = this.getPhoneInputRowHtml(p, list.length > 1);
            container.appendChild(temp.firstElementChild);
        });
        this.updatePhoneDeleteButtons();
    },

    getBranchPhones: function() {
        const container = document.getElementById('bizBranchPhonesContainer');
        if (!container) return [];
        const inputs = container.querySelectorAll('.biz-branch-phone-field');
        const phones = [];
        inputs.forEach(inp => {
            const val = (inp.value || '').trim();
            if (val) {
                phones.push(val.startsWith('+994') ? val : `+994 ${val}`);
            }
        });
        return phones;
    },

    branchCatSearchQuery: '',
    selectedBranchCategories: ['beauty/hair'],

    getCategoryEmoji: function(catId) {
        const svgs = {
            beauty: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>',
            health: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
            auto: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 3c-.1.2-.1.5-.1.8v5.3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
            entertainment: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
            services: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
            education: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
            rent: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3M18.5 4.5l3 3"/></svg>',
            sport: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
            animals: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="14" r="4"/><circle cx="6.5" cy="9.5" r="2.5"/><circle cx="17.5" cy="9.5" r="2.5"/><circle cx="8" cy="4" r="2"/><circle cx="16" cy="4" r="2"/></svg>',
            restaurants: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
            style: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
            lawyers: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
            other: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>'
        };
        return svgs[catId] || '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r=".5" fill="currentColor"/></svg>';
    },

    getCategoryInfo: function(id) {
        if (!id) return { id: '', name: '', icon: this.getCategoryEmoji('other'), parentName: '' };
        const topCats = (typeof ZeyvoData !== 'undefined' && ZeyvoData.topCategories) ? ZeyvoData.topCategories : [];
        
        let catId = '';
        let subId = id;
        if (id.includes('/')) {
            const parts = id.split('/');
            catId = parts[0];
            subId = parts[1];
        }

        // Search subcategories
        for (const cat of topCats) {
            if (catId && cat.id !== catId) continue;
            const sub = (cat.subcategories || []).find(s => s.id === subId);
            if (sub) {
                return {
                    id: `${cat.id}/${sub.id}`,
                    subId: sub.id,
                    catId: cat.id,
                    name: sub.azName || sub.name,
                    icon: this.getCategoryEmoji(cat.id),
                    parentName: cat.azName || cat.title
                };
            }
        }

        // Search top categories
        const top = topCats.find(c => c.id === id || c.id === catId);
        if (top) {
            return {
                id: top.id,
                subId: null,
                catId: top.id,
                name: top.azName || top.title,
                icon: this.getCategoryEmoji(top.id),
                parentName: top.azName || top.title
            };
        }

        return { id: id, name: id, icon: this.getCategoryEmoji('other'), parentName: '' };
    },

    isCategorySelected: function(catId, subId) {
        if (!Array.isArray(this.selectedBranchCategories)) return false;
        const composite = `${catId}/${subId}`;
        return this.selectedBranchCategories.includes(composite) || this.selectedBranchCategories.includes(subId);
    },

    toggleBranchSubcategory: function(catId, subId) {
        if (!Array.isArray(this.selectedBranchCategories)) {
            this.selectedBranchCategories = [];
        }
        const composite = `${catId}/${subId}`;
        const isSel = this.isCategorySelected(catId, subId);

        if (isSel) {
            if (this.selectedBranchCategories.length <= 1) {
                if (typeof App !== 'undefined') App.showToast("Ən azı 1 kateqoriya seçilməlidir");
                return;
            }
            this.selectedBranchCategories = this.selectedBranchCategories.filter(
                c => c !== composite && c !== subId
            );
        } else {
            this.selectedBranchCategories.push(composite);
        }
        this.renderBranchCategoriesUI();
    },

    toggleAllInCat: function(catId) {
        const topCats = (typeof ZeyvoData !== 'undefined' && ZeyvoData.topCategories) ? ZeyvoData.topCategories : [];
        const cat = topCats.find(c => c.id === catId);
        if (!cat || !Array.isArray(cat.subcategories)) return;

        if (!Array.isArray(this.selectedBranchCategories)) {
            this.selectedBranchCategories = [];
        }

        const allSelected = cat.subcategories.every(s => this.isCategorySelected(catId, s.id));
        if (allSelected) {
            const subIds = cat.subcategories.map(s => s.id);
            const compositeIds = cat.subcategories.map(s => `${catId}/${s.id}`);
            const remaining = this.selectedBranchCategories.filter(
                c => !subIds.includes(c) && !compositeIds.includes(c)
            );
            if (remaining.length === 0) {
                if (typeof App !== 'undefined') App.showToast("Ən azı 1 kateqoriya seçilməlidir");
                return;
            }
            this.selectedBranchCategories = remaining;
        } else {
            cat.subcategories.forEach(s => {
                if (!this.isCategorySelected(catId, s.id)) {
                    this.selectedBranchCategories.push(`${catId}/${s.id}`);
                }
            });
        }
        this.renderBranchCategoriesUI();
    },

    removeSelectedCategory: function(id) {
        if (!Array.isArray(this.selectedBranchCategories)) return;
        if (this.selectedBranchCategories.length <= 1) {
            if (typeof App !== 'undefined') App.showToast("Ən azı 1 kateqoriya seçilməlidir");
            return;
        }
        const rawSub = id.includes('/') ? id.split('/')[1] : id;
        this.selectedBranchCategories = this.selectedBranchCategories.filter(c => c !== id && c !== rawSub);
        this.renderBranchCategoriesUI();
    },

    handleBranchCatSearch: function(val) {
        this.branchCatSearchQuery = (val || '').trim().toLowerCase();
        const clearBtn = document.getElementById('bizBranchCatClearSearchBtn');
        if (clearBtn) {
            clearBtn.classList.toggle('hidden', !this.branchCatSearchQuery);
        }
        this.renderBranchCategoriesTree();
    },

    clearBranchCatSearch: function() {
        this.branchCatSearchQuery = '';
        const searchInput = document.getElementById('bizBranchCatSearch');
        if (searchInput) searchInput.value = '';
        const clearBtn = document.getElementById('bizBranchCatClearSearchBtn');
        if (clearBtn) clearBtn.classList.add('hidden');
        this.renderBranchCategoriesTree();
    },

    renderBranchSelectedChips: function() {
        const container = document.getElementById('bizBranchSelectedChipsContainer');
        const countEl = document.getElementById('branchSelectedCatCount');
        if (!container) return;

        const list = Array.isArray(this.selectedBranchCategories) ? this.selectedBranchCategories : [];
        if (countEl) countEl.textContent = list.length;

        if (list.length === 0) {
            container.innerHTML = `<span class="text-[11px] text-slate-400 font-normal italic py-1">Heç bir kateqoriya seçilməyib. Aşağıdakı siyahıdan seçin və ya axtarın.</span>`;
            return;
        }

        container.innerHTML = list.map(cId => {
            const info = this.getCategoryInfo(cId);
            return `
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFDD2D] text-[#101114] text-xs font-semibold border border-amber-300 shadow-2xs">
                    <span>${info.icon}</span>
                    <span>${info.name}</span>
                    <button type="button" onclick="BusinessDashboardView.removeSelectedCategory('${cId}')" class="w-4 h-4 rounded-full hover:bg-black/15 flex items-center justify-center text-black/70 hover:text-black transition" title="Sil"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                </span>
            `;
        }).join('');
    },

    renderBranchCategoriesTree: function() {
        const container = document.getElementById('bizBranchCategoriesTreeContainer');
        if (!container) return;

        const topCats = (typeof ZeyvoData !== 'undefined' && ZeyvoData.topCategories) ? ZeyvoData.topCategories : [];
        const query = this.branchCatSearchQuery;

        let visibleCats = topCats.map(cat => {
            const catMatches = (cat.azName || '').toLowerCase().includes(query) || (cat.title || '').toLowerCase().includes(query);
            const matchingSubs = (cat.subcategories || []).filter(sub => {
                if (!query) return true;
                if (catMatches) return true;
                const subAz = (sub.azName || '').toLowerCase();
                const subEn = (sub.name || '').toLowerCase();
                return subAz.includes(query) || subEn.includes(query);
            });
            return {
                ...cat,
                filteredSubs: matchingSubs
            };
        }).filter(cat => cat.filteredSubs.length > 0);

        if (visibleCats.length === 0) {
            container.innerHTML = `
                <div class="py-8 text-center text-slate-400">
                    <p class="text-xs font-semibold text-slate-600">"${query}" üzrə heç bir xidmət tapılmadı</p>
                    <p class="text-[11px] text-slate-400 mt-1">Axtarış sözünü dəyişin və ya axtarışı sıfırlayın</p>
                </div>
            `;
            return;
        }

        container.innerHTML = visibleCats.map(cat => {
            const emoji = this.getCategoryEmoji(cat.id);
            const totalSubs = cat.subcategories.length;
            const selectedInCat = cat.subcategories.filter(s => this.isCategorySelected(cat.id, s.id)).length;
            const allSelected = totalSubs > 0 && selectedInCat === totalSubs;

            return `
                <div class="rounded-xl bg-white border border-slate-200/80 p-2.5 space-y-2 shadow-2xs">
                    <!-- Main Category Header -->
                    <div class="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100">
                        <div class="flex items-center gap-1.5 min-w-0">
                            <span class="text-sm">${emoji}</span>
                            <span class="font-bold text-xs text-tbank-graphite">${cat.azName}</span>
                            <span class="text-[10px] text-slate-400 font-medium">(${selectedInCat}/${totalSubs})</span>
                        </div>
                        <button type="button" onclick="BusinessDashboardView.toggleAllInCat('${cat.id}')" class="text-[10px] font-semibold text-slate-600 hover:text-black hover:underline transition">
                            ${allSelected ? 'Seçimi ləğv et' : '+ Hamısını seç'}
                        </button>
                    </div>

                    <!-- Subcategories Interactive Chips -->
                    <div class="flex flex-wrap gap-1.5 pt-0.5">
                        ${cat.filteredSubs.map(sub => {
                            const isSelected = this.isCategorySelected(cat.id, sub.id);
                            return `
                                <button type="button" onclick="BusinessDashboardView.toggleBranchSubcategory('${cat.id}', '${sub.id}')" class="px-2.5 py-1 rounded-lg text-xs transition flex items-center gap-1.5 active:scale-95 ${isSelected ? 'bg-[#FFDD2D] text-[#101114] border border-amber-300 font-semibold shadow-2xs' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 font-medium'}">
                                    <span>${sub.azName || sub.name}</span>
                                    ${isSelected ? '<svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>' : ''}
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    },

    renderBranchCategoriesUI: function() {
        this.renderBranchSelectedChips();
        this.renderBranchCategoriesTree();
    },

    debounceMapTimer: null,
    debounceMapUpdate: function() {
        if (this.debounceMapTimer) clearTimeout(this.debounceMapTimer);
        this.debounceMapTimer = setTimeout(() => {
            this.updateBranchMapPreview();
        }, 350);
    },

    updateBranchMapPreview: function() {
        const city = (document.getElementById('bizBranchCity')?.value || 'Bakı').trim();
        const address = (document.getElementById('bizBranchAddress')?.value || '').trim();
        const landmark = (document.getElementById('bizBranchLandmark')?.value || '').trim();
        const mapIframe = document.getElementById('bizBranchGoogleMapIframe');
        const openBtn = document.getElementById('bizBranchOpenGoogleMapsBtn');
        const mapUrlInput = document.getElementById('bizBranchMapUrl');

        let query = address ? `${address}, ${city}, Azərbaycan` : `${city}, Azərbaycan`;
        if (address && landmark) {
            query = `${address} (${landmark}), ${city}, Azərbaycan`;
        }

        const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        const directUrl = `https://maps.google.com/?q=${encodeURIComponent(query)}`;

        if (mapIframe && mapIframe.src !== embedUrl) {
            mapIframe.src = embedUrl;
        }
        if (openBtn) {
            openBtn.href = directUrl;
        }
        if (mapUrlInput) {
            mapUrlInput.value = directUrl;
        }
    },

    openAddBranchModal: function(bizId) {
        const modal = document.getElementById('bizCreateBranchModal');
        if (!modal) return;

        this.isIndividualMasterMode = false;
        this.updateModalModeUI();

        const titleEl = document.getElementById('bizBranchModalTitle');
        const submitBtn = document.getElementById('bizBranchSubmitBtn');
        if (titleEl) titleEl.textContent = 'Yeni Filial Əlavə Et';
        if (submitBtn) submitBtn.textContent = 'Filialı Əlavə Et';

        const targetInput = document.getElementById('bizBranchTargetBizId');
        const editIndexInput = document.getElementById('bizBranchEditIndex');
        if (targetInput) targetInput.value = bizId || '';
        if (editIndexInput) editIndexInput.value = '';

        // Tab 1: Əsas
        this.tempBranchLogo = null;
        const logoFileInput = document.getElementById('bizBranchLogoFileInput');
        if (logoFileInput) logoFileInput.value = '';
        this.updateBranchLogoUI();

        const nameInput = document.getElementById('bizBranchName');
        const descInput = document.getElementById('bizBranchDesc');
        if (nameInput) nameInput.value = '';
        if (descInput) descInput.value = '';

        // Xidmət Kateqoriyaları və Alt-xidmətlər (Multi-select)
        this.selectedBranchCategories = ['beauty/hair'];
        this.clearBranchCatSearch();
        this.renderBranchCategoriesUI();

        // Dinamik Nömrələr (1 boş nömrə sətri ilə başlayır)
        this.setBranchPhones(['']);

        // Tab 2: Ünvan
        const cityInput = document.getElementById('bizBranchCity');
        const landmarkInput = document.getElementById('bizBranchLandmark');
        const addrInput = document.getElementById('bizBranchAddress');
        const mapUrlInput = document.getElementById('bizBranchMapUrl');
        if (cityInput) cityInput.value = 'Bakı';
        if (landmarkInput) landmarkInput.value = '';
        if (addrInput) addrInput.value = '';
        if (mapUrlInput) mapUrlInput.value = '';
        this.updateBranchMapPreview();

        // Tab 3: İnteryer
        this.tempBranchPhotos = [];
        this.renderBranchPhotos();

        // Tab 4: İş qrafiki
        const hoursInput = document.getElementById('bizBranchHours');
        if (hoursInput) hoursInput.value = '09:00 – 21:00';
        const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        dayKeys.forEach(k => {
            const offEl = document.getElementById(`sched_off_${k}`);
            const openEl = document.getElementById(`sched_open_${k}`);
            const closeEl = document.getElementById(`sched_close_${k}`);
            if (offEl) offEl.checked = false;
            if (openEl) {
                openEl.value = (k === 'sat' || k === 'sun') ? '10:00' : '09:00';
                openEl.disabled = false;
            }
            if (closeEl) {
                closeEl.value = (k === 'sat' || k === 'sun') ? '20:00' : '21:00';
                closeEl.disabled = false;
            }
        });

        // Tab 5: Mesencerlər
        const waInput = document.getElementById('bizBranchWhatsapp');
        const tgInput = document.getElementById('bizBranchTelegram');
        if (waInput) waInput.value = '';
        if (tgInput) tgInput.value = '';

        // Tab 6: Sosial şəbəkələr
        const igInput = document.getElementById('bizBranchInstagram');
        const fbInput = document.getElementById('bizBranchFacebook');
        const ttInput = document.getElementById('bizBranchTiktok');
        const liInput = document.getElementById('bizBranchLinkedin');
        if (igInput) igInput.value = '';
        if (fbInput) fbInput.value = '';
        if (ttInput) ttInput.value = '';
        if (liInput) liInput.value = '';

        this.switchBranchTab('main');
        modal.classList.remove('hidden');
        if (nameInput) setTimeout(() => nameInput.focus(), 50);
    },

    openEditBranchModal: function(bizId, branchIndex) {
        const modal = document.getElementById('bizCreateBranchModal');
        if (!modal) return;
        const businesses = this.getBusinesses();
        const targetBiz = businesses.find(b => b.id === bizId);
        if (!targetBiz || !Array.isArray(targetBiz.branches) || !targetBiz.branches[branchIndex]) return;

        const branch = targetBiz.branches[branchIndex];
        this.isIndividualMasterMode = false;
        this.updateModalModeUI();

        const titleEl = document.getElementById('bizBranchModalTitle');
        const submitBtn = document.getElementById('bizBranchSubmitBtn');
        if (titleEl) titleEl.textContent = 'Filialı redaktə et';
        if (submitBtn) submitBtn.textContent = 'Yadda saxla';

        const targetInput = document.getElementById('bizBranchTargetBizId');
        const editIndexInput = document.getElementById('bizBranchEditIndex');
        if (targetInput) targetInput.value = bizId || '';
        if (editIndexInput) editIndexInput.value = String(branchIndex);

        // Tab 1: Əsas
        this.tempBranchLogo = branch.logo || null;
        const logoFileInput = document.getElementById('bizBranchLogoFileInput');
        if (logoFileInput) logoFileInput.value = '';
        this.updateBranchLogoUI();

        const nameInput = document.getElementById('bizBranchName');
        const descInput = document.getElementById('bizBranchDesc');
        if (nameInput) nameInput.value = branch.name || '';
        if (descInput) descInput.value = branch.description || '';

        // Xidmət Kateqoriyaları və Alt-xidmətlər (Multi-select)
        if (Array.isArray(branch.categories) && branch.categories.length > 0) {
            this.selectedBranchCategories = [...branch.categories];
        } else if (branch.category) {
            this.selectedBranchCategories = [branch.category];
        } else {
            this.selectedBranchCategories = ['beauty/hair'];
        }
        this.clearBranchCatSearch();
        this.renderBranchCategoriesUI();

        // Dinamik Nömrələr (mövcud bütün nömrələri yükləyir)
        const existingPhones = Array.isArray(branch.phones) && branch.phones.length > 0
            ? branch.phones
            : [branch.phone, branch.phoneSecondary].filter(Boolean);
        this.setBranchPhones(existingPhones);

        // Tab 2: Ünvan
        const cityInput = document.getElementById('bizBranchCity');
        const landmarkInput = document.getElementById('bizBranchLandmark');
        const addrInput = document.getElementById('bizBranchAddress');
        const mapUrlInput = document.getElementById('bizBranchMapUrl');
        if (cityInput) cityInput.value = branch.city || 'Bakı';
        if (landmarkInput) landmarkInput.value = branch.landmark || '';
        if (addrInput) addrInput.value = branch.address || '';
        if (mapUrlInput) mapUrlInput.value = branch.mapUrl || '';
        this.updateBranchMapPreview();

        // Tab 3: İnteryer
        this.tempBranchPhotos = Array.isArray(branch.photos) ? [...branch.photos] : [];
        this.renderBranchPhotos();

        // Tab 4: İş qrafiki
        const hoursInput = document.getElementById('bizBranchHours');
        if (hoursInput) hoursInput.value = branch.hours || '09:00 – 21:00';
        const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const sched = branch.scheduleDays || {};
        dayKeys.forEach(k => {
            const dayData = sched[k];
            const offEl = document.getElementById(`sched_off_${k}`);
            const openEl = document.getElementById(`sched_open_${k}`);
            const closeEl = document.getElementById(`sched_close_${k}`);
            if (dayData) {
                if (offEl) offEl.checked = !!dayData.isOff;
                if (openEl) {
                    openEl.value = dayData.open || '09:00';
                    openEl.disabled = !!dayData.isOff;
                }
                if (closeEl) {
                    closeEl.value = dayData.close || (k === 'sat' || k === 'sun' ? '20:00' : '21:00');
                    closeEl.disabled = !!dayData.isOff;
                }
            } else {
                if (offEl) offEl.checked = false;
                if (openEl) {
                    openEl.value = (k === 'sat' || k === 'sun') ? '10:00' : '09:00';
                    openEl.disabled = false;
                }
                if (closeEl) {
                    closeEl.value = (k === 'sat' || k === 'sun') ? '20:00' : '21:00';
                    closeEl.disabled = false;
                }
            }
        });

        // Tab 5: Mesencerlər
        const waInput = document.getElementById('bizBranchWhatsapp');
        const tgInput = document.getElementById('bizBranchTelegram');
        if (waInput) waInput.value = (branch.whatsapp || '').replace(/^\+994\s*/, '').trim();
        if (tgInput) tgInput.value = (branch.telegram || '').replace(/^@|^https?:\/\/t\.me\//, '').trim();

        // Tab 6: Sosial şəbəkələr
        const igInput = document.getElementById('bizBranchInstagram');
        const fbInput = document.getElementById('bizBranchFacebook');
        const ttInput = document.getElementById('bizBranchTiktok');
        const liInput = document.getElementById('bizBranchLinkedin');
        if (igInput) igInput.value = (branch.instagram || '').replace(/^@|^https?:\/\/(www\.)?instagram\.com\//, '').trim();
        if (fbInput) fbInput.value = (branch.facebook || '').replace(/^https?:\/\/(www\.)?facebook\.com\//, '').trim();
        if (ttInput) ttInput.value = (branch.tiktok || '').replace(/^@|^https?:\/\/(www\.)?tiktok\.com\/@?/, '').trim();
        if (liInput) liInput.value = (branch.linkedin || '').replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/, '').trim();

        this.switchBranchTab('main');
        modal.classList.remove('hidden');
        if (nameInput) setTimeout(() => nameInput.focus(), 50);
    },

    openAddIndividualMasterModal: function(initialName = '', initialDesc = '') {
        const modal = document.getElementById('bizCreateBranchModal');
        if (!modal) return;

        this.isIndividualMasterMode = true;
        this.updateModalModeUI();

        const titleEl = document.getElementById('bizBranchModalTitle');
        const submitBtn = document.getElementById('bizBranchSubmitBtn');
        if (titleEl) titleEl.textContent = 'Yeni Fərdi Usta Əlavə Et';
        if (submitBtn) submitBtn.textContent = 'Fərdi Ustanı Yarat';

        const targetInput = document.getElementById('bizBranchTargetBizId');
        const editIndexInput = document.getElementById('bizBranchEditIndex');
        if (targetInput) targetInput.value = '';
        if (editIndexInput) editIndexInput.value = 'individual_new';

        // Tab 1: Əsas
        this.tempBranchLogo = null;
        const logoFileInput = document.getElementById('bizBranchLogoFileInput');
        if (logoFileInput) logoFileInput.value = '';
        this.updateBranchLogoUI();

        const nameInput = document.getElementById('bizBranchName');
        const descInput = document.getElementById('bizBranchDesc');
        if (nameInput) nameInput.value = initialName || '';
        if (descInput) descInput.value = initialDesc || '';

        // Xidmət Kateqoriyaları və Alt-xidmətlər (Multi-select)
        this.selectedBranchCategories = ['beauty/hair'];
        this.clearBranchCatSearch();
        this.renderBranchCategoriesUI();

        // Dinamik Nömrələr (1 boş nömrə sətri ilə başlayır)
        this.setBranchPhones(['']);

        // Tab 2: Ünvan
        const cityInput = document.getElementById('bizBranchCity');
        const landmarkInput = document.getElementById('bizBranchLandmark');
        const addrInput = document.getElementById('bizBranchAddress');
        const mapUrlInput = document.getElementById('bizBranchMapUrl');
        if (cityInput) cityInput.value = 'Bakı';
        if (landmarkInput) landmarkInput.value = '';
        if (addrInput) addrInput.value = '';
        if (mapUrlInput) mapUrlInput.value = '';
        this.updateBranchMapPreview();

        // Tab 3: Portfolio
        this.tempBranchPhotos = [];
        this.renderBranchPhotos();

        // Tab 4: İş qrafiki
        const hoursInput = document.getElementById('bizBranchHours');
        if (hoursInput) hoursInput.value = '10:00 – 20:00';
        const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        dayKeys.forEach(k => {
            const offEl = document.getElementById(`sched_off_${k}`);
            const openEl = document.getElementById(`sched_open_${k}`);
            const closeEl = document.getElementById(`sched_close_${k}`);
            if (offEl) offEl.checked = (k === 'sun');
            if (openEl) {
                openEl.value = '10:00';
                openEl.disabled = (k === 'sun');
            }
            if (closeEl) {
                closeEl.value = '20:00';
                closeEl.disabled = (k === 'sun');
            }
        });

        // Tab 5: Mesencerlər
        const waInput = document.getElementById('bizBranchWhatsapp');
        const tgInput = document.getElementById('bizBranchTelegram');
        if (waInput) waInput.value = '';
        if (tgInput) tgInput.value = '';

        // Tab 6: Sosial şəbəkələr
        const igInput = document.getElementById('bizBranchInstagram');
        const fbInput = document.getElementById('bizBranchFacebook');
        const ttInput = document.getElementById('bizBranchTiktok');
        const liInput = document.getElementById('bizBranchLinkedin');
        if (igInput) igInput.value = '';
        if (fbInput) fbInput.value = '';
        if (ttInput) ttInput.value = '';
        if (liInput) liInput.value = '';

        this.switchBranchTab('main');
        modal.classList.remove('hidden');
        if (nameInput) setTimeout(() => nameInput.focus(), 50);
    },

    openEditIndividualMasterModal: function(masterId) {
        const modal = document.getElementById('bizCreateBranchModal');
        if (!modal) return;
        const businesses = this.getBusinesses();
        const master = businesses.find(b => b.id === masterId);
        if (!master) return;

        this.isIndividualMasterMode = true;
        this.updateModalModeUI();

        const titleEl = document.getElementById('bizBranchModalTitle');
        const submitBtn = document.getElementById('bizBranchSubmitBtn');
        if (titleEl) titleEl.textContent = 'Fərdi usta profilini redaktə et';
        if (submitBtn) submitBtn.textContent = 'Yadda saxla';

        const targetInput = document.getElementById('bizBranchTargetBizId');
        const editIndexInput = document.getElementById('bizBranchEditIndex');
        if (targetInput) targetInput.value = masterId;
        if (editIndexInput) editIndexInput.value = 'individual';

        // Tab 1: Əsas
        this.tempBranchLogo = master.logo || master.avatar || null;
        const logoFileInput = document.getElementById('bizBranchLogoFileInput');
        if (logoFileInput) logoFileInput.value = '';
        this.updateBranchLogoUI();

        const nameInput = document.getElementById('bizBranchName');
        const descInput = document.getElementById('bizBranchDesc');
        if (nameInput) nameInput.value = master.name || '';
        if (descInput) descInput.value = master.description || '';

        // Xidmət Kateqoriyaları və Alt-xidmətlər (Multi-select)
        if (Array.isArray(master.categories) && master.categories.length > 0) {
            this.selectedBranchCategories = [...master.categories];
        } else if (master.category) {
            this.selectedBranchCategories = [master.category];
        } else {
            this.selectedBranchCategories = ['beauty/hair'];
        }
        this.clearBranchCatSearch();
        this.renderBranchCategoriesUI();

        // Dinamik Nömrələr (mövcud bütün nömrələri yükləyir)
        const existingPhones = Array.isArray(master.phones) && master.phones.length > 0
            ? master.phones
            : [master.phone, master.phoneSecondary].filter(Boolean);
        this.setBranchPhones(existingPhones.length > 0 ? existingPhones : ['']);

        // Tab 2: Ünvan
        const cityInput = document.getElementById('bizBranchCity');
        const landmarkInput = document.getElementById('bizBranchLandmark');
        const addrInput = document.getElementById('bizBranchAddress');
        const mapUrlInput = document.getElementById('bizBranchMapUrl');
        if (cityInput) cityInput.value = master.city || 'Bakı';
        if (landmarkInput) landmarkInput.value = master.landmark || '';
        if (addrInput) addrInput.value = master.address || '';
        if (mapUrlInput) mapUrlInput.value = master.mapUrl || '';
        this.updateBranchMapPreview();

        // Tab 3: Portfolio
        this.tempBranchPhotos = Array.isArray(master.photos) ? [...master.photos] : (Array.isArray(master.portfolio) ? [...master.portfolio] : []);
        this.renderBranchPhotos();

        // Tab 4: İş qrafiki
        const hoursInput = document.getElementById('bizBranchHours');
        if (hoursInput) hoursInput.value = master.hours || '10:00 – 20:00';
        const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const sched = master.scheduleDays || {};
        dayKeys.forEach(k => {
            const dayData = sched[k];
            const offEl = document.getElementById(`sched_off_${k}`);
            const openEl = document.getElementById(`sched_open_${k}`);
            const closeEl = document.getElementById(`sched_close_${k}`);
            if (dayData) {
                if (offEl) offEl.checked = !!dayData.isOff;
                if (openEl) {
                    openEl.value = dayData.open || '10:00';
                    openEl.disabled = !!dayData.isOff;
                }
                if (closeEl) {
                    closeEl.value = dayData.close || '20:00';
                    closeEl.disabled = !!dayData.isOff;
                }
            } else {
                if (offEl) offEl.checked = (k === 'sun');
                if (openEl) {
                    openEl.value = '10:00';
                    openEl.disabled = (k === 'sun');
                }
                if (closeEl) {
                    closeEl.value = '20:00';
                    closeEl.disabled = (k === 'sun');
                }
            }
        });

        // Tab 5: Mesencerlər
        const waInput = document.getElementById('bizBranchWhatsapp');
        const tgInput = document.getElementById('bizBranchTelegram');
        if (waInput) waInput.value = (master.whatsapp || '').replace(/^\+994\s*/, '').trim();
        if (tgInput) tgInput.value = (master.telegram || '').replace(/^@|^https?:\/\/t\.me\//, '').trim();

        // Tab 6: Sosial şəbəkələr
        const igInput = document.getElementById('bizBranchInstagram');
        const fbInput = document.getElementById('bizBranchFacebook');
        const ttInput = document.getElementById('bizBranchTiktok');
        const liInput = document.getElementById('bizBranchLinkedin');
        if (igInput) igInput.value = (master.instagram || '').replace(/^@|^https?:\/\/(www\.)?instagram\.com\//, '').trim();
        if (fbInput) fbInput.value = (master.facebook || '').replace(/^https?:\/\/(www\.)?facebook\.com\//, '').trim();
        if (ttInput) ttInput.value = (master.tiktok || '').replace(/^@|^https?:\/\/(www\.)?tiktok\.com\/@?/, '').trim();
        if (liInput) liInput.value = (master.linkedin || '').replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/, '').trim();

        this.switchBranchTab('main');
        modal.classList.remove('hidden');
        if (nameInput) setTimeout(() => nameInput.focus(), 50);
    },

    closeAddBranchModal: function() {
        const modal = document.getElementById('bizCreateBranchModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveBranch: function(e) {
        if (e) e.preventDefault();
        const bizId = (document.getElementById('bizBranchTargetBizId')?.value || '').trim();
        const editIndexVal = document.getElementById('bizBranchEditIndex')?.value;
        const isEdit = editIndexVal !== '' && editIndexVal !== null && editIndexVal !== undefined;

        // Collect fields
        const name = (document.getElementById('bizBranchName')?.value || '').trim();
        const phones = this.getBranchPhones();
        const primaryPhone = phones[0] || '';
        const phoneSecondary = phones[1] || '';
        const description = (document.getElementById('bizBranchDesc')?.value || '').trim();

        const city = (document.getElementById('bizBranchCity')?.value || '').trim();
        const landmark = (document.getElementById('bizBranchLandmark')?.value || '').trim();
        const address = (document.getElementById('bizBranchAddress')?.value || '').trim();
        const mapUrl = (document.getElementById('bizBranchMapUrl')?.value || '').trim();

        // Schedule days
        const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const scheduleDays = {};
        dayKeys.forEach(k => {
            scheduleDays[k] = {
                isOff: document.getElementById(`sched_off_${k}`)?.checked || false,
                open: document.getElementById(`sched_open_${k}`)?.value || '09:00',
                close: document.getElementById(`sched_close_${k}`)?.value || '21:00'
            };
        });

        let hours = (document.getElementById('bizBranchHours')?.value || '').trim();
        if (!hours) {
            if (scheduleDays.mon && !scheduleDays.mon.isOff) {
                hours = `${scheduleDays.mon.open} – ${scheduleDays.mon.close}`;
            } else {
                const firstWorking = dayKeys.map(k => scheduleDays[k]).find(d => !d.isOff);
                hours = firstWorking ? `${firstWorking.open} – ${firstWorking.close}` : 'İstirahət';
            }
        }

        // Messengers
        const rawWa = (document.getElementById('bizBranchWhatsapp')?.value || '').trim();
        const whatsapp = rawWa ? (rawWa.startsWith('+994') ? rawWa : `+994 ${rawWa}`) : '';
        const rawTg = (document.getElementById('bizBranchTelegram')?.value || '').trim();
        const telegram = rawTg ? rawTg.replace(/^@|^https?:\/\/t\.me\//, '') : '';

        // Socials
        const rawIg = (document.getElementById('bizBranchInstagram')?.value || '').trim();
        const instagram = rawIg ? rawIg.replace(/^@|^https?:\/\/(www\.)?instagram\.com\//, '') : '';
        const rawFb = (document.getElementById('bizBranchFacebook')?.value || '').trim();
        const facebook = rawFb ? rawFb.replace(/^https?:\/\/(www\.)?facebook\.com\//, '') : '';
        const rawTt = (document.getElementById('bizBranchTiktok')?.value || '').trim();
        const tiktok = rawTt ? rawTt.replace(/^@|^https?:\/\/(www\.)?tiktok\.com\/@?/, '') : '';
        const rawLi = (document.getElementById('bizBranchLinkedin')?.value || '').trim();
        const linkedin = rawLi ? rawLi.replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/, '') : '';

        const isMaster = this.isIndividualMasterMode || editIndexVal === 'individual' || editIndexVal === 'individual_new';

        // Validations
        if (!name) {
            this.switchBranchTab('main');
            const nameEl = document.getElementById('bizBranchName');
            if (nameEl) nameEl.focus();
            if (typeof App !== 'undefined') App.showToast(isMaster ? "Zəhmət olmasa ustanın adını qeyd edin" : "Zəhmət olmasa filialın adını qeyd edin");
            return;
        }

        if (!address) {
            this.switchBranchTab('address');
            const addrEl = document.getElementById('bizBranchAddress');
            if (addrEl) addrEl.focus();
            if (typeof App !== 'undefined') App.showToast(isMaster ? "Zəhmət olmasa ustanın iş ünvanını qeyd edin" : "Zəhmət olmasa filialın ünvanını qeyd edin");
            return;
        }

        const businesses = this.getBusinesses();

        // 1. EDIT EXISTING INDIVIDUAL MASTER
        if (editIndexVal === 'individual') {
            const masterIdx = businesses.findIndex(b => b.id === bizId);
            if (masterIdx !== -1) {
                businesses[masterIdx] = {
                    ...businesses[masterIdx],
                    type: 'individual',
                    name: name,
                    logo: this.tempBranchLogo || businesses[masterIdx].logo || '',
                    category: (this.selectedBranchCategories && this.selectedBranchCategories[0]) || businesses[masterIdx].category || 'beauty',
                    categories: Array.isArray(this.selectedBranchCategories) && this.selectedBranchCategories.length > 0 ? [...this.selectedBranchCategories] : ['beauty'],
                    phone: primaryPhone,
                    phoneSecondary: phoneSecondary,
                    phones: phones,
                    description: description,
                    city: city,
                    landmark: landmark,
                    address: address,
                    mapUrl: mapUrl,
                    photos: [...this.tempBranchPhotos],
                    hours: hours || '10:00 – 20:00',
                    scheduleDays: scheduleDays,
                    whatsapp: whatsapp,
                    telegram: telegram,
                    instagram: instagram,
                    facebook: facebook,
                    tiktok: tiktok,
                    linkedin: linkedin,
                    updatedAt: new Date().toISOString()
                };
                if (typeof App !== 'undefined') App.showToast("Fərdi usta məlumatları uğurla yeniləndi");
            }
            this.saveBusinesses(businesses);
            this.closeAddBranchModal();
            if (this.container) {
                this.container.innerHTML = this.render({ tab: this.activeTab });
                if (this.afterRender) this.afterRender({ tab: this.activeTab });
            }
            return;
        }

        // 2. CREATE NEW INDIVIDUAL MASTER
        if (editIndexVal === 'individual_new') {
            const newMaster = {
                id: 'biz_' + Date.now(),
                type: 'individual',
                name: name,
                logo: this.tempBranchLogo || '',
                category: (this.selectedBranchCategories && this.selectedBranchCategories[0]) || 'beauty',
                categories: Array.isArray(this.selectedBranchCategories) && this.selectedBranchCategories.length > 0 ? [...this.selectedBranchCategories] : ['beauty'],
                phone: primaryPhone,
                phoneSecondary: phoneSecondary,
                phones: phones,
                description: description,
                city: city,
                landmark: landmark,
                address: address,
                mapUrl: mapUrl,
                photos: [...this.tempBranchPhotos],
                hours: hours || '10:00 – 20:00',
                scheduleDays: scheduleDays,
                whatsapp: whatsapp,
                telegram: telegram,
                instagram: instagram,
                facebook: facebook,
                tiktok: tiktok,
                linkedin: linkedin,
                createdAt: new Date().toISOString()
            };
            businesses.unshift(newMaster);
            if (typeof App !== 'undefined') App.showToast("Yeni fərdi usta uğurla əlavə edildi!");
            this.saveBusinesses(businesses);
            this.closeAddBranchModal();
            if (this.container) {
                this.container.innerHTML = this.render({ tab: this.activeTab });
                if (this.afterRender) this.afterRender({ tab: this.activeTab });
            }
            return;
        }

        // 3. BRANCH LOGIC
        const targetBiz = businesses.find(b => b.id === bizId);
        if (!targetBiz) {
            if (typeof App !== 'undefined') App.showToast("Biznes tapılmadı");
            return;
        }

        if (!Array.isArray(targetBiz.branches)) {
            targetBiz.branches = [];
        }

        const branchPayload = {
            name: name,
            logo: this.tempBranchLogo || '',
            category: (this.selectedBranchCategories && this.selectedBranchCategories[0]) || 'beauty',
            categories: Array.isArray(this.selectedBranchCategories) && this.selectedBranchCategories.length > 0 ? [...this.selectedBranchCategories] : ['beauty'],
            phone: primaryPhone,
            phoneSecondary: phoneSecondary,
            phones: phones,
            description: description,
            city: city,
            landmark: landmark,
            address: address,
            mapUrl: mapUrl,
            photos: [...this.tempBranchPhotos],
            hours: hours || '09:00 – 21:00',
            scheduleDays: scheduleDays,
            whatsapp: whatsapp,
            telegram: telegram,
            instagram: instagram,
            facebook: facebook,
            tiktok: tiktok,
            linkedin: linkedin
        };

        if (isEdit) {
            const idx = parseInt(editIndexVal, 10);
            if (targetBiz.branches[idx]) {
                targetBiz.branches[idx] = {
                    ...targetBiz.branches[idx],
                    ...branchPayload,
                    updatedAt: new Date().toISOString()
                };
            }
            if (typeof App !== 'undefined') App.showToast("Filial məlumatları uğurla yeniləndi");
        } else {
            targetBiz.branches.push({
                id: 'br_' + Date.now(),
                ...branchPayload,
                createdAt: new Date().toISOString()
            });
            if (typeof App !== 'undefined') App.showToast("Yeni filial uğurla əlavə edildi!");
        }

        this.saveBusinesses(businesses);
        this.closeAddBranchModal();

        if (this.container) {
            this.container.innerHTML = this.render({ tab: this.activeTab });
            if (this.afterRender) this.afterRender({ tab: this.activeTab });
        }
    },

    deleteBranch: function(bizId, branchIndex) {
        const businesses = this.getBusinesses();
        const targetBiz = businesses.find(b => b.id === bizId);
        if (!targetBiz || !Array.isArray(targetBiz.branches)) return;

        const branch = targetBiz.branches[branchIndex];
        const branchName = branch?.name || 'Filial';

        this.openDeleteConfirmModal({
            title: 'Filialı sil',
            message: `<strong>"${branchName}"</strong> filialını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                targetBiz.branches.splice(branchIndex, 1);
                this.saveBusinesses(businesses);

                // If active context was on this branch, switch to fallback
                const activeCtx = this.getActiveContext();
                if (activeCtx.businessId === bizId && (activeCtx.branchId === branch?.id || activeCtx.branchId === branch?.name)) {
                    localStorage.removeItem('zeyvo_active_context_v1');
                    this.getActiveContext();
                }

                if (typeof App !== 'undefined') App.showToast(`"${branchName}" filialı silindi`);

                if (this.container) {
                    this.container.innerHTML = this.render({ tab: this.activeTab });
                    if (this.afterRender) this.afterRender({ tab: this.activeTab });
                }
            }
        });
    },
    
    // ==========================================
    // MODULE: ACTIVE BUSINESS & BRANCH CONTEXT
    // Global active context drives bookings, resources, finance, etc.
    // ==========================================
    getActiveContext: function() {
        const stored = localStorage.getItem('zeyvo_active_context_v1');
        if (stored) {
            try {
                const ctx = JSON.parse(stored);
                if (ctx && ctx.businessId && ctx.branchId) {
                    return ctx;
                }
            } catch (e) {}
        }
        const businesses = this.getBusinesses();
        if (businesses.length > 0) {
            const firstBiz = businesses[0];
            const isInd = (firstBiz.type || 'business') === 'individual';
            const firstBranch = (!isInd && Array.isArray(firstBiz.branches) && firstBiz.branches.length > 0) ? firstBiz.branches[0] : null;
            const ctx = {
                businessId: firstBiz.id,
                businessName: firstBiz.name,
                branchId: firstBranch ? firstBranch.id : firstBiz.id,
                branchName: firstBranch ? firstBranch.name : (firstBiz.name || 'Fərdi usta'),
                type: isInd ? 'individual' : 'business',
                address: firstBranch ? firstBranch.address : (firstBiz.address || ''),
                phone: firstBranch ? firstBranch.phone : (firstBiz.phone || '')
            };
            this.setActiveContext(ctx.businessId, ctx.branchId, false);
            return ctx;
        }
        return {
            businessId: 'biz_baku_beauty',
            businessName: 'Baku Beauty Studio',
            branchId: 'br_bbs_1',
            branchName: 'Mərkəz Filialı',
            type: 'business',
            address: 'Nizami küç. 45',
            phone: '+994 (12) 493-00-11'
        };
    },

    setActiveContext: function(businessId, branchId, triggerRender = true) {
        const businesses = this.getBusinesses();
        const biz = businesses.find(b => b.id === businessId);
        if (!biz) return;

        const isInd = (biz.type || 'business') === 'individual';
        let branch = null;
        if (!isInd && Array.isArray(biz.branches)) {
            branch = biz.branches.find(br => br.id === branchId || br.name === branchId) || biz.branches[0];
        }

        const ctx = {
            businessId: biz.id,
            businessName: biz.name,
            branchId: branch ? branch.id : biz.id,
            branchName: branch ? branch.name : (biz.name || 'Fərdi usta'),
            type: isInd ? 'individual' : 'business',
            address: branch ? branch.address : (biz.address || ''),
            phone: branch ? branch.phone : (biz.phone || '')
        };

        localStorage.setItem('zeyvo_active_context_v1', JSON.stringify(ctx));
        this.activeContext = ctx;

        // If on resources tab, auto-switch branch filter
        if (this.activeTab === 'resources') {
            this.resourceBranchFilter = ctx.branchId;
        }

        if (triggerRender) {
            this.closeSwitchContextModal();
            if (typeof App !== 'undefined') {
                App.showToast(`Aktiv filial: ${ctx.branchName} (${ctx.businessName})`);
            }
            if (this.container) {
                this.container.innerHTML = this.render({ tab: this.activeTab });
                if (this.afterRender) this.afterRender({ tab: this.activeTab });
            }
        }
    },

    openSwitchContextModal: function() {
        const modal = document.getElementById('bizSwitchContextModal');
        if (!modal) return;
        const searchInput = document.getElementById('bizSwitchSearchInput');
        if (searchInput) searchInput.value = '';
        const list = document.getElementById('bizSwitchListContainer');
        if (list) list.innerHTML = this.renderSwitchContextListHtml();
        modal.classList.remove('hidden');
    },

    closeSwitchContextModal: function() {
        const modal = document.getElementById('bizSwitchContextModal');
        if (modal) modal.classList.add('hidden');
    },

    filterSwitchContextList: function(val) {
        const list = document.getElementById('bizSwitchListContainer');
        if (list) list.innerHTML = this.renderSwitchContextListHtml(val);
    },

    renderSwitchContextListHtml: function(searchQuery = '') {
        const businesses = this.getBusinesses();
        const activeCtx = this.getActiveContext();
        const q = (searchQuery || '').toLowerCase().trim();

        const filtered = businesses.filter(b => {
            if (!q) return true;
            const matchBiz = (b.name || '').toLowerCase().includes(q);
            const matchBranch = Array.isArray(b.branches) && b.branches.some(br => (br.name || '').toLowerCase().includes(q) || (br.address || '').toLowerCase().includes(q));
            return matchBiz || matchBranch;
        });

        if (filtered.length === 0) {
            return `
                <div class="py-8 text-center text-slate-400 text-xs">
                    Uyğun biznes və ya filial tapılmadı.
                </div>
            `;
        }

        return filtered.map(b => {
            const isInd = (b.type || 'business') === 'individual';
            const branches = Array.isArray(b.branches) ? b.branches : [];

            if (isInd) {
                const isActive = activeCtx.businessId === b.id;
                return `
                    <div onclick="BusinessDashboardView.setActiveContext('${b.id}', '${b.id}')" class="p-3.5 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between gap-3 ${isActive ? 'border-[#FFDD2D] bg-amber-50/40 ring-2 ring-[#FFDD2D]/40 shadow-xs' : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/60'}">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-10 h-10 rounded-2xl ${isActive ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-100 text-slate-700'} flex items-center justify-center shrink-0 shadow-2xs"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg></div>
                            <div class="min-w-0">
                                <div class="flex items-center gap-1.5 flex-wrap">
                                    <h4 class="font-bold text-xs sm:text-sm text-slate-900 truncate">${b.name}</h4>
                                    <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-100/80 text-blue-900 border border-blue-200/50">Fərdi usta</span>
                                </div>
                                <p class="text-[11px] text-slate-400 truncate mt-0.5">${b.address || 'Ünvan qeyd edilməyib'} ${b.phone ? '• ' + b.phone : ''}</p>
                            </div>
                        </div>

                        <div class="shrink-0 flex items-center gap-2">
                            ${isActive ? `
                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span>Aktivdir</span>
                                </span>
                            ` : `
                                <span class="px-2.5 py-1 rounded-xl bg-slate-100 group-hover:bg-slate-200 text-slate-700 text-xs font-medium">
                                    Seç →
                                </span>
                            `}
                        </div>
                    </div>
                `;
            }

            // Business with branches
            return `
                <div class="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs">
                    <!-- Business Header Bar -->
                    <div class="p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between gap-3">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <div class="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg></div>
                            <div class="min-w-0">
                                <h4 class="font-bold text-xs sm:text-sm text-slate-900 truncate">${b.name}</h4>
                            </div>
                        </div>
                        <span class="text-[11px] text-slate-400 font-medium shrink-0">${branches.length} filial</span>
                    </div>

                    <!-- Branches List -->
                    <div class="divide-y divide-slate-100 p-1.5 space-y-1">
                        ${branches.map(br => {
                            const isBranchActive = activeCtx.businessId === b.id && (activeCtx.branchId === br.id || activeCtx.branchId === br.name);
                            return `
                                <div onclick="BusinessDashboardView.setActiveContext('${b.id}', '${br.id}')" class="p-2.5 sm:p-3 rounded-xl transition cursor-pointer flex items-center justify-between gap-3 ${isBranchActive ? 'bg-amber-50/60 border border-[#FFDD2D] ring-1 ring-[#FFDD2D]/40' : 'hover:bg-slate-50 border border-transparent'}">
                                    <div class="flex items-center gap-2.5 min-w-0">
                                        <span class="w-2 h-2 rounded-full ${isBranchActive ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-slate-300'} shrink-0"></span>
                                        <div class="min-w-0">
                                            <div class="font-bold text-xs text-slate-900 truncate">${br.name}</div>
                                            <div class="text-[11px] text-slate-400 truncate mt-0.5">${br.address || 'Ünvan qeyd edilməyib'} ${br.phone ? '• ' + br.phone : ''}</div>
                                        </div>
                                    </div>

                                    <div class="shrink-0 flex items-center gap-2">
                                        ${isBranchActive ? `
                                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                <span>Aktiv filial</span>
                                            </span>
                                        ` : `
                                            <button type="button" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition">
                                                Seç
                                            </button>
                                        `}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    },

    // ==========================================
    // MODULE: RESURSLAR (SALON RESOURCES & ASSETS)
    // Categories, Chairs, Rooms, Devices & Tree List
    // ==========================================
    getCategoryIconSvg: function(iconKey, extraClass = 'w-4 h-4') {
        if (!iconKey) {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`;
        }
        if (iconKey === 'folder') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`;
        }
        if (iconKey === 'medical' || iconKey === 'stethoscope' || iconKey === 'doctor' || iconKey === 'clinic') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`;
        }
        if (iconKey === 'dental' || iconKey === 'tooth') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 7.5 2 11 .3 2 2.5 3 4 3s3.7-1 4-3c.5-3.5 2-7.5 2-11 0-3.5-2.5-6-6-6Z"/><path d="M12 2v6"/></svg>`;
        }
        if (iconKey === 'heart' || iconKey === 'cardiology' || iconKey === 'pulse') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M7 11h2.5l1.5-3 2 6 1.5-3H17"/></svg>`;
        }
        if (iconKey === 'scissors' || iconKey === 'barber' || iconKey === '\u2702\uFE0F') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`;
        }
        if (iconKey === 'spa' || iconKey === 'cosmetics' || iconKey === '\u{1F486}') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/><path d="M18 11c1.5 0 3 .5 3 2s-1.5 2-3 2"/><path d="M6 11C4.5 11 3 11.5 3 13s1.5 2 3 2"/></svg>`;
        }
        if (iconKey === 'laser' || iconKey === 'bolt' || iconKey === 'device' || iconKey === '\u26A1') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
        }
        if (iconKey === 'nail' || iconKey === 'nails' || iconKey === '\u{1F485}') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;
        }
        if (iconKey === 'chair' || iconKey === '\u{1FA91}' || iconKey === '\u{1F4BA}') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5Z"/><path d="M6 18v3M18 18v3"/></svg>`;
        }
        if (iconKey === 'room' || iconKey === 'door' || iconKey === '\u{1F6AA}') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><circle cx="14" cy="12" r="1"/></svg>`;
        }
        if (iconKey === 'bed' || iconKey === 'couch') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`;
        }
        if (iconKey === 'wrench' || iconKey === 'tool' || iconKey === 'repair') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
        }
        if (iconKey === 'car' || iconKey === 'auto') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M5 11l1.5-5h11l1.5 5"/><rect x="3" y="11" width="18" height="6" rx="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`;
        }
        if (iconKey === 'dumbbell' || iconKey === 'gym' || iconKey === 'fitness' || iconKey === 'sport') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m6.5 6.5 11 11M5 9l-2-2 4-4 2 2M15 19l2 2 4-4-2-2M8 4l2 2M18 14l2 2M4 8l2 2M14 18l2 2"/></svg>`;
        }
        if (iconKey === 'book' || iconKey === 'education') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>`;
        }
        if (iconKey === 'paw' || iconKey === 'vet' || iconKey === 'pet') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="15" r="4"/><circle cx="7" cy="8" r="2"/><circle cx="17" cy="8" r="2"/><circle cx="10" cy="4" r="1.8"/><circle cx="14" cy="4" r="1.8"/></svg>`;
        }
        if (iconKey === 'sparkles' || iconKey === 'star' || iconKey === 'vip') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
        }
        if (iconKey === 'package' || iconKey === 'box' || iconKey === 'product') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>`;
        }
        if (iconKey === 'tag' || iconKey === 'price') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r=".5" fill="currentColor"/></svg>`;
        }
        if (iconKey === 'shopping-bag' || iconKey === 'bag' || iconKey === 'retail') {
            return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
        }
        return `<svg class="${extraClass}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`;
    },
    getDefaultResourceCategories: function() {
        return [
            {
                id: 'rcat_1',
                name: 'Bərbər və saç zalı',
                icon: 'scissors',
                description: 'Kişi və qadın saç kəsimi, fen və saç baxımı zonası.'
            },
            {
                id: 'rcat_2',
                name: 'Kosmetologiya və dəri baxımı',
                icon: 'spa',
                description: 'Dəri müalicələri, təmizləmə və kosmetoloji prosedurlar üçün kabinetlər.'
            },
            {
                id: 'rcat_3',
                name: 'Lazer və epilyasiya şöbəsi',
                icon: 'laser',
                description: 'Lazer cihazları və epilyasiya avadanlıqları.'
            },
            {
                id: 'rcat_4',
                name: 'Dırnaq xidməti (Nail Art)',
                icon: 'nail',
                description: 'Manikür və pedikür stansiyaları.'
            }
        ];
    },

    getResourceCategories: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_resource_categories_v1'));
        if (stored) {
            try {
                const list = JSON.parse(stored);
                if (Array.isArray(list) && list.length > 0) {
                    return list;
                }
            } catch (e) {
                console.error("Error parsing resource categories", e);
            }
        }
        const defaults = this.getDefaultResourceCategories();
        this.saveResourceCategories(defaults);
        return defaults;
    },

    saveResourceCategories: function(categories) {
        localStorage.setItem(this.storageKey('zeyvo_business_resource_categories_v1'), JSON.stringify(categories));
    },

    getDefaultResources: function() {
        return [
            {
                id: 'res_1',
                name: 'Kreslo #1 (Barber)',
                type: 'chair',
                status: 'active',
                branchId: 'br_bbs_1',
                branchName: 'Mərkəz Filialı',
                businessName: 'Baku Beauty Studio',
                categoryId: 'rcat_1',
                notes: 'Master kreslosu, hidravlik tənzimləmə və dəri üzlüklə təchiz edilib.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'res_2',
                name: 'Kreslo #2 (Kolorist)',
                type: 'chair',
                status: 'busy',
                branchId: 'br_bbs_1',
                branchName: 'Mərkəz Filialı',
                businessName: 'Baku Beauty Studio',
                categoryId: 'rcat_1',
                notes: 'Boya və fen bölməsi üçün xüsusi işıqlandırma və alət arabası mövcuddur.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'res_3',
                name: 'Manikür Masası #1',
                type: 'chair',
                status: 'active',
                branchId: 'br_bbs_2',
                branchName: 'Gənclik Filialı',
                businessName: 'Baku Beauty Studio',
                categoryId: 'rcat_4',
                notes: 'Daxili tozsoran və LED qurutma lampası ilə təmin edilib.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'res_4',
                name: 'VIP Kabinet (Kosmetologiya)',
                type: 'room',
                status: 'active',
                branchId: 'br_bbs_1',
                branchName: 'Mərkəz Filialı',
                businessName: 'Baku Beauty Studio',
                categoryId: 'rcat_2',
                notes: 'Ayrı sanitar qovşağı, duş kabini və kosmetoloji kuşetka ilə təchiz olunub.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'res_5',
                name: 'Masaj və SPA Otağı',
                type: 'room',
                status: 'busy',
                branchId: 'br_bbs_3',
                branchName: 'Yasamal Filialı',
                businessName: 'Baku Beauty Studio',
                categoryId: 'rcat_2',
                notes: 'Aromaterapiya diffuzoru, sakitləşdirici musiqi sistemi və qızdırılan masaj stolu.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'res_6',
                name: 'Candela GentleLase Pro (Lazer)',
                type: 'device',
                status: 'active',
                branchId: 'br_bbs_1',
                branchName: 'Mərkəz Filialı',
                businessName: 'Baku Beauty Studio',
                categoryId: 'rcat_3',
                notes: 'Aleksandrit lazer cihazı. Dinamik soyutma sistemi (DCD) ilə təchiz edilib.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'res_7',
                name: 'Hydrafacial Elite MD',
                type: 'device',
                status: 'maintenance',
                branchId: 'br_bbs_2',
                branchName: 'Gənclik Filialı',
                businessName: 'Baku Beauty Studio',
                categoryId: 'rcat_3',
                notes: 'Dərin təmizləmə aparatı. Planlı filtr dəyişimi və profilaktik baxış aparılır.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'res_8',
                name: 'Premium Barber Kreslosu #1',
                type: 'chair',
                status: 'active',
                branchId: 'br_gbl_1',
                branchName: 'Port Baku Filialı',
                businessName: 'Grand Barber Lounge',
                categoryId: 'rcat_1',
                notes: 'Klassik dəri barber kreslosu, baş dayağı ilə.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'res_9',
                name: 'Diş Həkimliyi Kabineti #1',
                type: 'room',
                status: 'active',
                branchId: 'br_de_1',
                branchName: 'Nərimanov Filialı',
                businessName: 'DentEstet Stomatologiya',
                categoryId: '',
                notes: 'Stomatoloji kreslo və rentgen cihazı ilə təchiz olunub.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'res_10',
                name: 'Usta Kreslosu & Stansiyası',
                type: 'chair',
                status: 'active',
                branchId: 'biz_samir_barber',
                branchName: 'Samir Əliyev',
                businessName: 'Fərdi Usta',
                categoryId: '',
                notes: 'Samir Əliyevin fərdi iş stansiyası.',
                createdAt: new Date().toISOString()
            }
        ];
    },

    getResources: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_resources_v1'));
        if (stored) {
            try {
                let list = JSON.parse(stored);
                if (Array.isArray(list) && list.length === 0) return [];
                if (Array.isArray(list) && list.length > 0) {
                    let changed = false;
                    list = list.map(r => {
                        if (r.branchId === 'br_1') {
                            r.branchId = 'br_bbs_1';
                            r.branchName = 'Mərkəz Filialı';
                            changed = true;
                        } else if (r.branchId === 'br_2') {
                            r.branchId = 'br_bbs_2';
                            r.branchName = 'Gənclik Filialı';
                            changed = true;
                        }
                        if (r.categoryId === undefined) {
                            r.categoryId = '';
                            changed = true;
                        }
                        return r;
                    });
                    if (changed) this.saveResources(list);
                    return list;
                }
            } catch (e) {
                console.error("Error parsing resources", e);
            }
        }
        if (this.storageKey('zeyvo_business_resources_v1') !== 'zeyvo_business_resources_v1') return [];
        const defaults = this.getDefaultResources();
        this.saveResources(defaults);
        return defaults;
    },

    saveResources: function(resources) {
        localStorage.setItem(this.storageKey('zeyvo_business_resources_v1'), JSON.stringify(resources));
    },

    getResourceTypeConfig: function(type) {
        const configs = {
            chair: { 
                label: 'Kreslo', 
                iconSvg: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5Z"/><path d="M6 18v3M18 18v3"/></svg>', 
                badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' 
            },
            room: { 
                label: 'Otaq / kabinet', 
                iconSvg: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><circle cx="14" cy="12" r="1"/></svg>', 
                badgeBg: 'bg-purple-50 text-purple-700 border-purple-200' 
            },
            device: { 
                label: 'Aparat / cihaz', 
                iconSvg: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>', 
                badgeBg: 'bg-amber-50 text-amber-700 border-amber-200' 
            }
        };
        return configs[type] || { 
            label: 'Resurs', 
            iconSvg: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>', 
            badgeBg: 'bg-slate-100 text-slate-700 border-slate-200' 
        };
    },

    getResourceStatusConfig: function(status) {
        const configs = {
            active: {
                label: 'Aktiv / Boş',
                dot: 'bg-emerald-500',
                badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
                next: 'busy'
            },
            busy: {
                label: 'Məşğul',
                dot: 'bg-amber-500 animate-pulse',
                badgeBg: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
                next: 'maintenance'
            },
            maintenance: {
                label: 'Təmirdə',
                dot: 'bg-rose-500',
                badgeBg: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
                next: 'active'
            }
        };
        return configs[status] || configs.active;
    },

    getBranchOptionsList: function() {
        const businesses = this.getBusinesses();
        const options = [];
        businesses.forEach(b => {
            const isMaster = (b.type || 'business') === 'master';
            if (isMaster) {
                options.push({
                    id: b.id,
                    branchName: b.name || b.masterName || 'Fərdi Usta',
                    businessName: 'Fərdi Usta'
                });
            } else if (Array.isArray(b.branches) && b.branches.length > 0) {
                b.branches.forEach(br => {
                    options.push({
                        id: br.id || br.name,
                        branchName: br.name,
                        businessName: b.name
                    });
                });
            } else {
                options.push({
                    id: b.id,
                    branchName: b.name || 'Əsas Filial',
                    businessName: b.name
                });
            }
        });
        return options;
    },

    renderBranchFilterOptionsHtml: function() {
        const options = this.getBranchOptionsList();
        return `
            <option value="all">Bütün filiallar (${options.length})</option>
            ${options.map(opt => `
                <option value="${opt.id}" ${this.resourceBranchFilter === opt.id ? 'selected' : ''}>${opt.branchName} (${opt.businessName})</option>
            `).join('')}
        `;
    },

    renderCategoryFilterOptionsHtml: function() {
        const categories = this.getResourceCategories();
        return `
            <option value="all" ${this.resourceCategoryFilter === 'all' ? 'selected' : ''}>Bütün kateqoriyalar (${categories.length})</option>
            <option value="uncategorized" ${this.resourceCategoryFilter === 'uncategorized' ? 'selected' : ''}>Kateqoriyasız resurslar</option>
            ${categories.map(cat => `
                <option value="${cat.id}" ${this.resourceCategoryFilter === cat.id ? 'selected' : ''}>${cat.name}</option>
            `).join('')}
        `;
    },

    getResourceTypeFilterLabel: function(type) {
        if (type === 'chair') return 'Kreslo';
        if (type === 'room') return 'Otaq';
        if (type === 'device') return 'Aparat';
        return 'Hamısı';
    },

    getResourceCategoryFilterLabel: function(catId) {
        if (catId === 'all') return 'Bütün kateqoriyalar';
        if (catId === 'uncategorized') return 'Kateqoriyasız';
        const cat = this.getResourceCategories().find(c => c.id === catId);
        return cat ? cat.name : catId;
    },

    getResourceBranchFilterLabel: function(branchId) {
        if (branchId === 'all') return 'Bütün filiallar';
        const opt = this.getBranchOptionsList().find(b => b.id === branchId);
        return opt ? opt.branchName : branchId;
    },

    getActiveFilterCount: function() {
        let count = 0;
        if (this.resourceTypeFilter && this.resourceTypeFilter !== 'all') count++;
        if (this.resourceCategoryFilter && this.resourceCategoryFilter !== 'all') count++;
        return count;
    },

    openResourceFilterModal: function() {
        const modal = document.getElementById('bizResourceFilterModal');
        if (!modal) return;
        this.tempFilterType = this.resourceTypeFilter || 'all';
        this.selectFilterModalType(this.tempFilterType);

        const catSelect = document.getElementById('resFilterModalCategory');
        if (catSelect) {
            catSelect.innerHTML = this.renderCategoryFilterOptionsHtml();
            catSelect.value = this.resourceCategoryFilter || 'all';
        }

        modal.classList.remove('hidden');
    },

    closeResourceFilterModal: function() {
        const modal = document.getElementById('bizResourceFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectFilterModalType: function(type) {
        this.tempFilterType = type;
        ['all', 'chair', 'room', 'device'].forEach(t => {
            const btn = document.getElementById('resFilterTypeBtn_' + t);
            if (btn) {
                if (t === type) {
                    btn.className = "p-3 rounded-2xl border-2 border-slate-900 bg-slate-900 text-white flex flex-col items-center justify-center gap-1.5 transition text-center shadow-xs cursor-pointer";
                    const svg = btn.querySelector('svg');
                    if (svg) svg.className = "w-5 h-5 text-[#FFDD2D]";
                } else {
                    btn.className = "p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1.5 transition text-center cursor-pointer";
                    const svg = btn.querySelector('svg');
                    if (svg) svg.className = "w-5 h-5 text-slate-500";
                }
            }
        });
    },

    applyResourceFilterModal: function() {
        this.resourceTypeFilter = this.tempFilterType || 'all';
        const catSelect = document.getElementById('resFilterModalCategory');
        if (catSelect) {
            this.resourceCategoryFilter = catSelect.value || 'all';
        }
        this.closeResourceFilterModal();
        this.refreshResourcesView();
    },

    resetAllResourceFilters: function() {
        this.resourceTypeFilter = 'all';
        this.resourceCategoryFilter = 'all';
        this.resourceBranchFilter = 'all';
        this.resourceSearchQuery = '';
        const searchInput = document.getElementById('resSearchInput');
        if (searchInput) searchInput.value = '';
        this.closeResourceFilterModal();
        this.refreshResourcesView();
    },

    clearResourceSearch: function() {
        this.resourceSearchQuery = '';
        const searchInput = document.getElementById('resSearchInput');
        if (searchInput) searchInput.value = '';
        this.refreshResourcesView();
    },

    setResourceSearch: function(query) {
        this.resourceSearchQuery = query;
        const container = document.getElementById('resCardsGrid');
        if (container) {
            container.innerHTML = this.renderResourceCardsHtml();
        }
        const clearBtn = document.getElementById('resSearchClearBtn');
        if (clearBtn) {
            clearBtn.classList.toggle('hidden', !query);
        }
    },

    setResourceTypeFilter: function(type) {
        this.resourceTypeFilter = type;
        this.refreshResourcesView();
    },

    setResourceBranchFilter: function(branchId) {
        this.resourceBranchFilter = branchId;
        this.refreshResourcesView();
    },

    setResourceCategoryFilter: function(catId) {
        this.resourceCategoryFilter = catId;
        this.refreshResourcesView();
    },

    toggleResourceCategoryCollapse: function(catId) {
        this.collapsedResourceCategories[catId] = !this.collapsedResourceCategories[catId];
        const treeEl = document.getElementById('resCategoryTree_' + catId);
        const chevronEl = document.getElementById('resCatChevron_' + catId);
        if (treeEl) {
            if (this.collapsedResourceCategories[catId]) {
                treeEl.classList.add('hidden');
            } else {
                treeEl.classList.remove('hidden');
            }
        }
        if (chevronEl) {
            if (this.collapsedResourceCategories[catId]) {
                chevronEl.classList.add('-rotate-90');
                chevronEl.classList.remove('rotate-0');
            } else {
                chevronEl.classList.remove('-rotate-90');
                chevronEl.classList.add('rotate-0');
            }
        }
    },

    renderResourceFilterBarHtml: function() {
        const hasActiveFilters = (this.resourceTypeFilter && this.resourceTypeFilter !== 'all') ||
                                 (this.resourceCategoryFilter && this.resourceCategoryFilter !== 'all');
        const activeCount = this.getActiveFilterCount();

        return `
            <div class="bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 shadow-xs space-y-2.5">
                <div class="flex items-center gap-2.5">
                    <!-- Search Input -->
                    <div class="relative flex-1">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </span>
                        <input type="text" id="resSearchInput" value="${this.resourceSearchQuery || ''}" oninput="BusinessDashboardView.setResourceSearch(this.value)" placeholder="Resurs adı və ya qeydlər üzrə axtarış..." class="w-full h-10 pl-10 pr-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition text-xs font-medium">
                        <button type="button" id="resSearchClearBtn" onclick="BusinessDashboardView.clearResourceSearch()" class="${this.resourceSearchQuery ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition" title="Təmizlə">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <!-- Filter Button (Opens Modal) -->
                    <button type="button" onclick="BusinessDashboardView.openResourceFilterModal()" class="h-10 px-4 rounded-xl border ${hasActiveFilters ? 'border-slate-900 bg-slate-900 text-white shadow-xs' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:border-slate-300'} text-xs font-semibold flex items-center gap-2 transition shrink-0 active:scale-95" title="Filtrlər pəncərəsi">
                        <svg class="w-4 h-4 ${hasActiveFilters ? 'text-[#FFDD2D]' : 'text-slate-500'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                        <span>Filtrlər</span>
                        ${activeCount > 0 ? `<span class="px-1.5 py-0.5 rounded-full ${hasActiveFilters ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-900 text-white'} text-[10px] font-black">${activeCount}</span>` : ''}
                    </button>
                </div>

                <!-- Active Filter Tags Strip -->
                ${hasActiveFilters ? `
                <div class="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100 text-xs">
                    <span class="text-slate-400 text-[11px] font-medium mr-1">Aktiv filtrlər:</span>
                    ${this.resourceTypeFilter !== 'all' ? `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-800 text-[11px] font-medium">
                        <span>Növ: ${this.getResourceTypeFilterLabel(this.resourceTypeFilter)}</span>
                        <button type="button" onclick="BusinessDashboardView.setResourceTypeFilter('all')" class="hover:text-rose-600 transition" title="Sil">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </span>` : ''}
                    ${this.resourceCategoryFilter !== 'all' ? `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-800 text-[11px] font-medium">
                        <span>Kateqoriya: ${this.getResourceCategoryFilterLabel(this.resourceCategoryFilter)}</span>
                        <button type="button" onclick="BusinessDashboardView.setResourceCategoryFilter('all')" class="hover:text-rose-600 transition" title="Sil">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </span>` : ''}
                    <button type="button" onclick="BusinessDashboardView.resetAllResourceFilters()" class="text-[11px] font-medium text-rose-600 hover:text-rose-700 hover:underline ml-1">
                        Filtrləri sıfırla
                    </button>
                </div>` : ''}
            </div>
        `;
    },

    refreshResourcesView: function() {
        const barEl = document.getElementById('resFilterBarContainer');
        if (barEl) {
            barEl.innerHTML = this.renderResourceFilterBarHtml();
        }
        const container = document.getElementById('resCardsGrid');
        if (container) {
            container.innerHTML = this.renderResourceCardsHtml();
        }
        const currentType = this.resourceTypeFilter || 'all';
        ['all', 'chair', 'room', 'device'].forEach(t => {
            const topCard = document.getElementById('resTopCard_' + t);
            if (topCard) {
                if (currentType === t) {
                    topCard.className = "text-left p-4 sm:p-5 rounded-2xl bg-white border border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm transition group shadow-xs";
                } else {
                    topCard.className = "text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition group shadow-xs";
                }
            }
        });
    },

    refreshResourceCards: function() {
        this.refreshResourcesView();
    },

    renderResourceCardsHtml: function() {
        const activeCtx = this.getActiveContext();
        const allResources = this.getResources();
        // Yan menyuda seçilmiş aktiv filialın resursları
        const resources = allResources.filter(r => {
            if (r.branchId) {
                return r.branchId === activeCtx.branchId || r.branchName === activeCtx.branchName;
            }
            return r.businessName === activeCtx.businessName;
        });
        const categories = this.getResourceCategories();
        const typeFilter = this.resourceTypeFilter || 'all';
        const categoryFilter = this.resourceCategoryFilter || 'all';
        const search = (this.resourceSearchQuery || '').toLowerCase().trim();

        // Filter resources
        const filteredResources = resources.filter(res => {
            if (typeFilter !== 'all' && res.type !== typeFilter) return false;
            if (search) {
                const matchName = (res.name || '').toLowerCase().includes(search);
                const matchNotes = (res.notes || '').toLowerCase().includes(search);
                if (!matchName && !matchNotes) return false;
            }
            return true;
        });

        // Determine which categories to show
        let displayCategories = categories;
        if (categoryFilter === 'uncategorized') {
            displayCategories = [];
        } else if (categoryFilter !== 'all') {
            displayCategories = categories.filter(c => c.id === categoryFilter);
        }

        // If search or type filter is active, only show categories that have matching resources OR match category name
        if (search || typeFilter !== 'all') {
            displayCategories = displayCategories.filter(cat => {
                const hasMatches = filteredResources.some(r => r.categoryId === cat.id);
                const matchCatName = (cat.name || '').toLowerCase().includes(search);
                return hasMatches || matchCatName;
            });
        }

        const uncategorizedResources = filteredResources.filter(r => !r.categoryId || r.categoryId === '');
        const showUncategorized = (categoryFilter === 'all' || categoryFilter === 'uncategorized') && 
            (uncategorizedResources.length > 0 || categoryFilter === 'uncategorized');

        if (displayCategories.length === 0 && !showUncategorized) {
            return `
                <div class="col-span-full py-16 px-4 text-center bg-white border border-dashed border-slate-200 rounded-3xl shadow-xs">
                    <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center"><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>
                    <h4 class="font-bold text-sm text-slate-800">Heç bir resurs və ya kateqoriya tapılmadı</h4>
                    <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Axtarış filtrinizi dəyişin və ya yeni kateqoriya və resurs əlavə edin.</p>
                    <div class="mt-4 flex items-center justify-center gap-2.5">
                        <button type="button" onclick="BusinessDashboardView.openCreateResourceCategoryModal()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition active:scale-95">
                            + Yeni kateqoriya
                        </button>
                        ${ZeyvoUI.button({ label: "+ Yeni resurs", onClick: "BusinessDashboardView.openCreateResourceModal()", size: "md", type: "button" })}
                    </div>
                </div>
            `;
        }

        let html = '';

        // 1. Render Categories with Tree List (matching Business module)
        displayCategories.forEach(cat => {
            const catResources = filteredResources.filter(r => r.categoryId === cat.id);
            const isCollapsed = !!this.collapsedResourceCategories[cat.id];

            html += `
                <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    <div class="p-4 sm:p-5 hover:bg-slate-50/50 transition space-y-3">
                        <div class="flex items-center justify-between gap-4">
                            <!-- Left: Chevron + Icon + Name + Badge + Description -->
                            <div class="min-w-0 flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                                    ${this.getCategoryIconSvg(cat.icon, 'w-5 h-5')}
                                </div>
                                <div class="min-w-0">
                                    <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                        <button type="button" onclick="BusinessDashboardView.toggleResourceCategoryCollapse('${cat.id}')" class="w-6 h-6 -ml-1 rounded-lg text-slate-400 hover:text-tbank-graphite hover:bg-slate-100 transition flex items-center justify-center shrink-0 cursor-pointer" title="${isCollapsed ? 'Resursları göstər' : 'Resursları qatla'}">
                                            <svg id="resCatChevron_${cat.id}" class="w-3.5 h-3.5 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                            </svg>
                                        </button>
                                        <h4 onclick="BusinessDashboardView.toggleResourceCategoryCollapse('${cat.id}')" title="Resursları açmaq/bağlamaq üçün klikləyin" class="font-bold text-sm text-tbank-graphite hover:underline cursor-pointer truncate">
                                            ${cat.name}
                                        </h4>
                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-100/70 text-amber-900 border border-amber-200/50">
                                            ${catResources.length} resurs
                                        </span>
                                    </div>
                                    ${cat.description ? `
                                        <div class="text-[11px] text-slate-400 pt-0.5 truncate max-w-xl">
                                            ${cat.description}
                                        </div>
                                    ` : ''}
                                </div>
                            </div>

                            <!-- Right Actions: Edit Category, Delete Category -->
                            <div class="flex items-center gap-1.5 text-xs font-medium shrink-0">
                                <button type="button" onclick="BusinessDashboardView.openCreateResourceCategoryModal('${cat.id}')" class="p-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-white transition text-xs font-medium flex items-center justify-center shadow-2xs" title="Kateqoriyanı redaktə et">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                </button>
                                <button type="button" onclick="BusinessDashboardView.deleteResourceCategory('${cat.id}')" class="p-1.5 rounded-xl border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition text-xs font-medium flex items-center justify-center" title="Kateqoriyanı sil">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Tree of Resources inside Category -->
                        <div id="resCategoryTree_${cat.id}" class="${isCollapsed ? 'hidden ' : ''}pt-1 transition-all">
                            <div class="relative ml-2 sm:ml-3 pl-4 sm:pl-5 border-l-2 border-slate-200/90 space-y-2 my-1">
                                ${catResources.map(res => {
                                    const typeConf = this.getResourceTypeConfig(res.type);
                                    const statusConf = this.getResourceStatusConfig(res.status);
                                    return `
                                        <div class="relative group">
                                            <!-- Tree branch horizontal connector line -->
                                            <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>
                                            
                                            <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/70 transition flex items-center justify-between gap-3 text-xs">
                                                <div class="min-w-0 flex items-center gap-2.5">
                                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${typeConf.badgeBg} shrink-0">
                                                        <span>${typeConf.iconSvg}</span>
                                                        <span class="hidden sm:inline">${typeConf.label}</span>
                                                    </span>
                                                    <div class="min-w-0 flex items-center gap-2">
                                                        <span class="font-bold text-xs text-tbank-graphite truncate">${res.name}</span>
                                                        <span class="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 shrink-0">${res.quantity || 1} ədəd</span>
                                                    </div>
                                                </div>

                                                <div class="flex items-center gap-1.5 shrink-0">
                                                    <!-- Status Badge -->
                                                    <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold border ${statusConf.badgeBg}">
                                                        <span class="w-1.5 h-1.5 rounded-full ${statusConf.dot}"></span>
                                                        <span>${statusConf.label}</span>
                                                    </span>
                                                    
                                                    <button type="button" onclick="BusinessDashboardView.openEditResourceModal('${res.id}')" class="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition" title="Resursu redaktə et">
                                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.deleteResource('${res.id}')" class="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition" title="Resursu sil">
                                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}

                                <!-- + Resurs əlavə et düyməsi (Ağacın son budağı) -->
                                <div class="relative pt-0.5">
                                    <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>
                                    <button type="button" onclick="BusinessDashboardView.openCreateResourceModal(null, '${cat.id}')" class="w-full py-2 px-3 rounded-xl bg-slate-100/90 hover:bg-[#FFDD2D] text-slate-800 hover:text-[#101114] font-medium text-xs transition flex items-center justify-center gap-1.5 active:scale-[0.99] border border-slate-200/80 hover:border-amber-300 shadow-2xs">
                                        <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                        <span>Resurs əlavə et</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // 2. Render Uncategorized Resources (Kateqoriyasız resurslar)
        if (showUncategorized) {
            const isUncatCollapsed = !!this.collapsedResourceCategories['uncategorized'];

            html += `
                <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    <div class="p-4 sm:p-5 hover:bg-slate-50/50 transition space-y-3">
                        <div class="flex items-center justify-between gap-4">
                            <!-- Left -->
                            <div class="min-w-0 flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg></div>
                                <div class="min-w-0">
                                    <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                        <button type="button" onclick="BusinessDashboardView.toggleResourceCategoryCollapse('uncategorized')" class="w-6 h-6 -ml-1 rounded-lg text-slate-400 hover:text-tbank-graphite hover:bg-slate-100 transition flex items-center justify-center shrink-0 cursor-pointer" title="${isUncatCollapsed ? 'Resursları göstər' : 'Resursları qatla'}">
                                            <svg id="resCatChevron_uncategorized" class="w-3.5 h-3.5 transition-transform duration-200 ${isUncatCollapsed ? '-rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                            </svg>
                                        </button>
                                        <h4 onclick="BusinessDashboardView.toggleResourceCategoryCollapse('uncategorized')" title="Resursları açmaq/bağlamaq üçün klikləyin" class="font-bold text-sm text-tbank-graphite hover:underline cursor-pointer truncate">
                                            Kateqoriyasız resurslar
                                        </h4>
                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                            ${uncategorizedResources.length} resurs
                                        </span>
                                        <span class="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">Sərbəst resurslar</span>
                                    </div>
                                    <div class="text-[11px] text-slate-400 pt-0.5 truncate max-w-xl">
                                        Heç bir kateqoriyaya təyin edilməmiş sərbəst kreslo, kabinet və ya avadanlıqlar
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- Tree of Uncategorized Resources -->
                        <div id="resCategoryTree_uncategorized" class="${isUncatCollapsed ? 'hidden ' : ''}pt-1 transition-all">
                            <div class="relative ml-2 sm:ml-3 pl-4 sm:pl-5 border-l-2 border-slate-200/90 space-y-2 my-1">
                                ${uncategorizedResources.map(res => {
                                    const typeConf = this.getResourceTypeConfig(res.type);
                                    const statusConf = this.getResourceStatusConfig(res.status);
                                    return `
                                        <div class="relative group">
                                            <!-- Tree connector line -->
                                            <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>
                                            
                                            <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/70 transition flex items-center justify-between gap-3 text-xs">
                                                <div class="min-w-0 flex items-center gap-2.5">
                                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${typeConf.badgeBg} shrink-0">
                                                        <span>${typeConf.iconSvg}</span>
                                                        <span class="hidden sm:inline">${typeConf.label}</span>
                                                    </span>
                                                    <div class="min-w-0 flex items-center gap-2">
                                                        <span class="font-bold text-xs text-tbank-graphite truncate">${res.name}</span>
                                                        <span class="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 shrink-0">${res.quantity || 1} ədəd</span>
                                                    </div>
                                                </div>

                                                <div class="flex items-center gap-1.5 shrink-0">
                                                    <!-- Status Badge -->
                                                    <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold border ${statusConf.badgeBg}">
                                                        <span class="w-1.5 h-1.5 rounded-full ${statusConf.dot}"></span>
                                                        <span>${statusConf.label}</span>
                                                    </span>
                                                    
                                                    <button type="button" onclick="BusinessDashboardView.openEditResourceModal('${res.id}')" class="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition" title="Resursu redaktə et">
                                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.deleteResource('${res.id}')" class="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition" title="Resursu sil">
                                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}

                                <!-- + Resurs əlavə et düyməsi (Ağacın son budağı) -->
                                <div class="relative pt-0.5">
                                    <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>
                                    <button type="button" onclick="BusinessDashboardView.openCreateResourceModal(null, '')" class="w-full py-2 px-3 rounded-xl bg-slate-100/90 hover:bg-[#FFDD2D] text-slate-800 hover:text-[#101114] font-medium text-xs transition flex items-center justify-center gap-1.5 active:scale-[0.99] border border-slate-200/80 hover:border-amber-300 shadow-2xs">
                                        <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                        <span>Resurs əlavə et</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        return html;
    },

    renderResourcesModule: function() {
        const activeCtx = this.getActiveContext();
        const allResources = this.getResources();
        // Filial üzrə filtrləmə yan menyudakı aktiv filial ilə avtomatik aparılır
        const resources = allResources.filter(r => {
            if (r.branchId) {
                return r.branchId === activeCtx.branchId || r.branchName === activeCtx.branchName;
            }
            return r.businessName === activeCtx.businessName;
        });
        const categories = this.getResourceCategories();
        const chairCount = resources.filter(r => r.type === 'chair').length;
        const roomCount = resources.filter(r => r.type === 'room').length;
        const deviceCount = resources.filter(r => r.type === 'device').length;
        const activeCount = resources.filter(r => r.status === 'active').length;
        const busyCount = resources.filter(r => r.status === 'busy').length;
        const maintCount = resources.filter(r => r.status === 'maintenance').length;

        const currentType = this.resourceTypeFilter || 'all';

        return `
            <div class="max-w-5xl mx-auto px-4 py-5 sm:px-7 sm:py-7 space-y-6">
                <!-- TOP METRIC CARDS -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <!-- Total -->
                    <button type="button" id="resTopCard_all" onclick="BusinessDashboardView.setResourceTypeFilter('all')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${currentType === 'all' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Ümumi</span>
                            <span class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-[#FFDD2D] group-hover:text-black transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg></span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${resources.length}</div>
                        <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                            <span class="text-emerald-600 font-semibold">${activeCount} aktiv</span>
                            <span>•</span>
                            <span class="text-amber-600 font-semibold">${categories.length} kateqoriya</span>
                        </div>
                    </button>

                    <!-- Chairs -->
                    <button type="button" id="resTopCard_chair" onclick="BusinessDashboardView.setResourceTypeFilter('chair')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${currentType === 'chair' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Kreslolar</span>
                            <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5Z"/><path d="M6 18v3M18 18v3"/></svg></span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${chairCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1">İş yerləri & masalar</div>
                    </button>

                    <!-- Rooms -->
                    <button type="button" id="resTopCard_room" onclick="BusinessDashboardView.setResourceTypeFilter('room')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${currentType === 'room' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Otaqlar</span>
                            <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-100 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><circle cx="14" cy="12" r="1"/></svg></span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${roomCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1">Kabinetlər & zonalar</div>
                    </button>

                    <!-- Devices -->
                    <button type="button" id="resTopCard_device" onclick="BusinessDashboardView.setResourceTypeFilter('device')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${currentType === 'device' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Aparatlar</span>
                            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-100 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${deviceCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1">Avadanlıq & cihazlar</div>
                    </button>
                </div>

                <!-- FILTER BAR (CLEAN SEARCH & MODAL TRIGGER) -->
                <div id="resFilterBarContainer">
                    ${this.renderResourceFilterBarHtml()}
                </div>

                <!-- TREE LIST CONTAINER (SAME STYLE AS BUSINESS MODULE) -->
                <div id="resCardsGrid" class="space-y-4">
                    ${this.renderResourceCardsHtml()}
                </div>
            </div>
        `;
    },

    populateResourceBranchOptions: function(selectedId) {
        const select = document.getElementById('resFormBranch');
        if (!select) return;
        const options = this.getBranchOptionsList();
        select.innerHTML = options.map(opt => {
            const isSelected = selectedId && (selectedId === opt.id || selectedId === opt.branchName);
            return `<option value="${opt.id}" data-branch-name="${opt.branchName}" data-biz-name="${opt.businessName}" ${isSelected ? 'selected' : ''}>${opt.branchName} (${opt.businessName})</option>`;
        }).join('');
    },

    populateResourceCategoryOptions: function(selectedCatId) {
        const select = document.getElementById('resFormCategory');
        if (!select) return;
        const categories = this.getResourceCategories();
        select.innerHTML = `
            <option value="">— Kateqoriyasız (Sərbəst resurs) —</option>
            ${categories.map(cat => {
                const isSelected = selectedCatId && selectedCatId === cat.id;
                return `<option value="${cat.id}" ${isSelected ? 'selected' : ''}>${cat.name}</option>`;
            }).join('')}
        `;
    },

    selectResourceFormType: function(type) {
        const types = ['chair', 'room', 'device'];
        types.forEach(t => {
            const card = document.getElementById('resTypeCard_' + t);
            const radio = card ? card.querySelector('input[type="radio"]') : null;
            if (card) {
                if (t === type) {
                    card.className = "p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1.5 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs";
                    if (radio) radio.checked = true;
                } else {
                    card.className = "p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1.5 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300";
                    if (radio) radio.checked = false;
                }
            }
        });

        const nameInput = document.getElementById('resFormName');
        const nameLabel = document.getElementById('resFormNameLabel');
        if (nameInput) {
            if (type === 'chair') {
                if (nameLabel) nameLabel.textContent = "Kreslonun / iş yerinin adı *";
                nameInput.placeholder = "Məs: Kreslo #1 (Barber) və ya Qrim Masası";
            } else if (type === 'room') {
                if (nameLabel) nameLabel.textContent = "Otağın / kabinetin adı *";
                nameInput.placeholder = "Məs: VIP Kabinet #2 və ya Kosmetologiya Otağı";
            } else if (type === 'device') {
                if (nameLabel) nameLabel.textContent = "Aparatın / cihazın adı *";
                nameInput.placeholder = "Məs: Candela GentleLase Pro və ya Hydrafacial MD";
            }
        }
    },

    selectResourceFormStatus: function(status) {
        const statuses = ['active', 'busy', 'maintenance'];
        statuses.forEach(s => {
            const card = document.getElementById('resStatusCard_' + s);
            const radio = card ? card.querySelector('input[type="radio"]') : null;
            if (card) {
                if (s === status) {
                    card.className = "p-2.5 sm:p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1.5 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs";
                    if (radio) radio.checked = true;
                } else {
                    card.className = "p-2.5 sm:p-3 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1.5 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300";
                    if (radio) radio.checked = false;
                }
            }
        });
        const hiddenInput = document.getElementById('resFormStatus');
        if (hiddenInput) hiddenInput.value = status;
    },

    adjustResourceQuantity: function(delta) {
        const input = document.getElementById('resFormQuantity');
        if (!input) return;
        let val = parseInt(input.value) || 1;
        val = Math.max(1, val + delta);
        input.value = val;
    },

    highlightCategoryFormIcon: function(iconKey) {
        const container = document.getElementById('resCatIconOptions');
        if (!container) return;
        const normalized = iconKey || 'folder';
        container.querySelectorAll('button[data-icon]').forEach(b => {
            if (b.getAttribute('data-icon') === normalized) {
                b.className = 'w-9 h-9 rounded-xl border-2 border-slate-900 bg-white text-slate-950 transition flex items-center justify-center shadow-xs scale-105 cursor-pointer';
            } else {
                b.className = 'w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer';
            }
        });
    },

    selectCategoryFormIcon: function(iconKey, btnEl) {
        const input = document.getElementById('resCategoryFormIcon');
        if (input) input.value = iconKey;
        this.highlightCategoryFormIcon(iconKey);
    },

    openCreateResourceCategoryModal: function(editCatId) {
        const modal = document.getElementById('bizCreateResourceCategoryModal');
        if (!modal) return;

        const editIdInput = document.getElementById('resCategoryFormEditId');
        const titleEl = document.getElementById('resCategoryModalTitle');
        const submitBtn = document.getElementById('resCategoryModalSubmitBtn');
        const nameInput = document.getElementById('resCategoryFormName');
        const iconInput = document.getElementById('resCategoryFormIcon');
        const descInput = document.getElementById('resCategoryFormDesc');

        let selectedIcon = 'folder';

        if (editCatId) {
            const categories = this.getResourceCategories();
            const cat = categories.find(c => c.id === editCatId);
            if (cat) {
                selectedIcon = cat.icon || 'folder';
                if (editIdInput) editIdInput.value = cat.id;
                if (titleEl) titleEl.textContent = 'Kateqoriyanı redaktə et';
                if (submitBtn) submitBtn.textContent = 'Dəyişiklikləri saxla';
                if (nameInput) nameInput.value = cat.name || '';
                if (iconInput) iconInput.value = selectedIcon;
                if (descInput) descInput.value = cat.description || '';
            }
        } else {
            if (editIdInput) editIdInput.value = '';
            if (titleEl) titleEl.textContent = 'Yeni resurs kateqoriyası';
            if (submitBtn) submitBtn.textContent = 'Kateqoriyanı yarat';
            if (nameInput) nameInput.value = '';
            if (iconInput) iconInput.value = 'folder';
            if (descInput) descInput.value = '';
        }

        this.highlightCategoryFormIcon(selectedIcon);
        modal.classList.remove('hidden');
    },

    closeCreateResourceCategoryModal: function() {
        const modal = document.getElementById('bizCreateResourceCategoryModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveResourceCategory: function(e) {
        if (e) e.preventDefault();
        const editId = document.getElementById('resCategoryFormEditId')?.value?.trim();
        const name = document.getElementById('resCategoryFormName')?.value?.trim();
        const icon = document.getElementById('resCategoryFormIcon')?.value?.trim() || 'folder';
        const desc = document.getElementById('resCategoryFormDesc')?.value?.trim() || '';

        if (!name) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa kateqoriyanın adını qeyd edin");
            return;
        }

        const categories = this.getResourceCategories();

        if (editId) {
            const idx = categories.findIndex(c => c.id === editId);
            if (idx !== -1) {
                categories[idx] = {
                    ...categories[idx],
                    name,
                    icon,
                    description: desc
                };
                if (typeof App !== 'undefined') App.showToast("Kateqoriya yeniləndi");
            }
        } else {
            const newCat = {
                id: 'rcat_' + Date.now(),
                name,
                icon,
                description: desc
            };
            categories.push(newCat);
            if (typeof App !== 'undefined') App.showToast("Yeni kateqoriya yaradıldı!");
        }

        this.saveResourceCategories(categories);
        this.closeCreateResourceCategoryModal();

        if (this.container) {
            this.container.innerHTML = this.render({ tab: this.activeTab });
            if (this.afterRender) this.afterRender({ tab: this.activeTab });
        }
    },

    deleteResourceCategory: function(catId) {
        const categories = this.getResourceCategories();
        const cat = categories.find(c => c.id === catId);
        if (!cat) return;

        this.openDeleteConfirmModal({
            title: 'Kateqoriyanı sil',
            message: `<strong>"${cat.name}"</strong> kateqoriyasını silmək istədiyinizə əminsiniz?<br><span class="text-amber-600 mt-1.5 inline-block text-xs">Bu kateqoriyadakı resurslar silinməyəcək, "Kateqoriyasız" bölməsinə keçiriləcək.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                // Move any resources in this category to uncategorized
                const resources = this.getResources();
                let resourcesChanged = false;
                resources.forEach(r => {
                    if (r.categoryId === catId) {
                        r.categoryId = '';
                        resourcesChanged = true;
                    }
                });
                if (resourcesChanged) this.saveResources(resources);

                // Remove category
                const updatedCategories = categories.filter(c => c.id !== catId);
                this.saveResourceCategories(updatedCategories);
                if (typeof App !== 'undefined') App.showToast(`"${cat.name}" kateqoriyası silindi`);

                if (this.container) {
                    this.container.innerHTML = this.render({ tab: this.activeTab });
                    if (this.afterRender) this.afterRender({ tab: this.activeTab });
                }
            }
        });
    },

    openCreateResourceModal: function(preselectedBranchId, preselectedCategoryId) {
        if (!preselectedBranchId) {
            const activeCtx = this.getActiveContext();
            preselectedBranchId = activeCtx.branchId;
        }
        const modal = document.getElementById('bizCreateResourceModal');
        if (!modal) return;

        const editIdInput = document.getElementById('resFormEditId');
        if (editIdInput) editIdInput.value = '';

        const titleEl = document.getElementById('resModalTitle');
        if (titleEl) titleEl.textContent = 'Yeni resurs əlavə et';

        const submitBtn = document.getElementById('resModalSubmitBtn');
        if (submitBtn) submitBtn.textContent = 'Resursu əlavə et';

        const nameInput = document.getElementById('resFormName');
        if (nameInput) nameInput.value = '';

        const descInput = document.getElementById('resFormDesc');
        if (descInput) descInput.value = '';

        this.selectResourceFormStatus('active');

        const quantityInput = document.getElementById('resFormQuantity');
        if (quantityInput) quantityInput.value = '1';

        const activeCtx = this.getActiveContext();
        const branchInput = document.getElementById('resFormBranch');
        if (branchInput) branchInput.value = activeCtx.branchId;
        this.populateResourceCategoryOptions(preselectedCategoryId !== undefined ? preselectedCategoryId : '');
        this.selectResourceFormType('chair');

        modal.classList.remove('hidden');
    },

    openEditResourceModal: function(resId) {
        const modal = document.getElementById('bizCreateResourceModal');
        if (!modal) return;

        const resources = this.getResources();
        const res = resources.find(r => r.id === resId);
        if (!res) return;

        const editIdInput = document.getElementById('resFormEditId');
        if (editIdInput) editIdInput.value = res.id;

        const titleEl = document.getElementById('resModalTitle');
        if (titleEl) titleEl.textContent = 'Resursu redaktə et';

        const submitBtn = document.getElementById('resModalSubmitBtn');
        if (submitBtn) submitBtn.textContent = 'Dəyişiklikləri saxla';

        const nameInput = document.getElementById('resFormName');
        if (nameInput) nameInput.value = res.name || '';

        const descInput = document.getElementById('resFormDesc');
        if (descInput) descInput.value = res.notes || '';

        const branchInput = document.getElementById('resFormBranch');
        if (branchInput) branchInput.value = res.branchId || '';
        this.populateResourceCategoryOptions(res.categoryId || '');

        this.selectResourceFormStatus(res.status || 'active');

        const quantityInput = document.getElementById('resFormQuantity');
        if (quantityInput) quantityInput.value = res.quantity || 1;

        this.selectResourceFormType(res.type || 'chair');

        modal.classList.remove('hidden');
    },

    closeCreateResourceModal: function() {
        const modal = document.getElementById('bizCreateResourceModal');
        if (modal) modal.classList.add('hidden');
    },

    deleteResource: function(resId) {
        const resources = this.getResources();
        const res = resources.find(r => r.id === resId);
        if (!res) return;

        this.openDeleteConfirmModal({
            title: 'Resursu sil',
            message: `<strong>"${res.name}"</strong> resursunu silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const updated = resources.filter(r => r.id !== resId);
                this.saveResources(updated);
                if (typeof App !== 'undefined') App.showToast(`"${res.name}" silindi`);

                if (this.container) {
                    this.container.innerHTML = this.render({ tab: this.activeTab });
                    if (this.afterRender) this.afterRender({ tab: this.activeTab });
                }
            }
        });
    },

    cycleResourceStatus: function(resId, e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const resources = this.getResources();
        const res = resources.find(r => r.id === resId);
        if (!res) return;

        const statusConfig = this.getResourceStatusConfig(res.status);
        res.status = statusConfig.next || 'active';
        this.saveResources(resources);

        const newConf = this.getResourceStatusConfig(res.status);
        if (typeof App !== 'undefined') App.showToast(`Status dəyişdirildi: ${newConf.label}`);

        this.refreshResourceCards();
    },

    handleSaveResource: function(e) {
        if (e) e.preventDefault();
        const editId = document.getElementById('resFormEditId')?.value?.trim();
        const name = document.getElementById('resFormName')?.value?.trim();
        const activeCtx = this.getActiveContext();
        const branchId = activeCtx.branchId;
        const branchName = activeCtx.branchName;
        const businessName = activeCtx.businessName;
        const categoryId = document.getElementById('resFormCategory')?.value || '';
        const status = document.getElementById('resFormStatus')?.value || 'active';
        const quantity = Math.max(1, parseInt(document.getElementById('resFormQuantity')?.value) || 1);
        const notes = document.getElementById('resFormDesc')?.value?.trim() || '';

        let type = 'chair';
        const checkedType = document.querySelector('input[name="resType"]:checked');
        if (checkedType) type = checkedType.value;

        if (!name) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa resursun adını qeyd edin");
            return;
        }

        const resources = this.getResources();

        if (editId) {
            const idx = resources.findIndex(r => r.id === editId);
            if (idx !== -1) {
                resources[idx] = {
                    ...resources[idx],
                    name,
                    type,
                    branchId,
                    branchName,
                    businessName,
                    categoryId,
                    status,
                    quantity,
                    notes,
                    updatedAt: new Date().toISOString()
                };
                if (typeof App !== 'undefined') App.showToast("Resurs məlumatları yeniləndi");
            }
        } else {
            const newRes = {
                id: 'res_' + Date.now(),
                name,
                type,
                branchId,
                branchName,
                businessName,
                categoryId,
                status,
                quantity,
                notes,
                createdAt: new Date().toISOString()
            };
            resources.push(newRes);
            if (typeof App !== 'undefined') App.showToast("Yeni resurs uğurla əlavə edildi!");
        }

        this.saveResources(resources);
        this.closeCreateResourceModal();

        if (this.container) {
            this.container.innerHTML = this.render({ tab: this.activeTab });
            if (this.afterRender) this.afterRender({ tab: this.activeTab });
        }
    },
    
    // ==========================================
});
