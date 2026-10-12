// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {
    // ==========================================
    calendarViewMode: 'daily', // 'daily' | 'weekly' | 'pending_online'
    calendarSelectedDate: (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })(),
    calendarMasterFilter: 'all',
    calendarStatusFilter: 'all',
    calendarSearchQuery: '',
    pendingOnlineTab: 'all', // 'all' | 'all_pending' | 'today' | 'confirmed' | 'custom'
    pendingOnlineSearchQuery: '',
    pendingOnlineStatusFilter: 'all',
    pendingOnlineDateFilter: 'all',
    pendingOnlineMasterFilter: 'all',
    pendingOnlineSortBy: 'date_asc',
    pendingOnlinePage: 1,
    pendingOnlinePageSize: 10,
    calendarPage: 1,
    calendarPageSize: 10,
    bookingEditingId: null,

    renderCalendarWeeklyGrid: function() {
        return this.renderCalendarModule();
    },

    setCalendarViewMode: function(mode) {
        this.calendarViewMode = mode;
        this.refreshCalendar();
    },

    setCalendarMasterFilter: function(mId) {
        this.calendarMasterFilter = mId;
        this.refreshCalendar();
    },

    setCalendarStatusFilter: function(st) {
        this.calendarStatusFilter = st;
        this.refreshCalendar();
    },

    setPendingOnlineSearch: function(val) {
        this.pendingOnlineSearchQuery = val || '';
        this.pendingOnlinePage = 1;
        this.refreshCalendar();
    },

    clearPendingOnlineSearch: function() {
        this.pendingOnlineSearchQuery = '';
        this.pendingOnlinePage = 1;
        this.refreshCalendar();
    },

    setPendingOnlineTab: function(tab) {
        this.pendingOnlineTab = tab;
        if (tab === 'today') {
            this.pendingOnlineStatusFilter = 'Gözlənilir';
            this.pendingOnlineDateFilter = 'today';
        } else if (tab === 'all_pending') {
            this.pendingOnlineStatusFilter = 'Gözlənilir';
            this.pendingOnlineDateFilter = 'all';
        } else if (tab === 'confirmed') {
            this.pendingOnlineStatusFilter = 'Təsdiqləndi';
            this.pendingOnlineDateFilter = 'all';
        } else {
            this.pendingOnlineStatusFilter = 'all';
            this.pendingOnlineDateFilter = 'all';
        }
        this.pendingOnlinePage = 1;
        this.refreshCalendar();
    },

    setPendingOnlinePage: function(p) {
        this.pendingOnlinePage = p;
        this.refreshCalendar();
    },

    setPendingOnlinePageSize: function(sz) {
        this.pendingOnlinePageSize = parseInt(sz, 10);
        this.pendingOnlinePage = 1;
        this.refreshCalendar();
    },

    openPendingOnlineFilterModal: function() {
        const modal = document.getElementById('bizPendingOnlineFilterModal');
        if (!modal) return;

        this.pendingOnlineTempStatus = this.pendingOnlineStatusFilter || 'all';
        this.pendingOnlineTempDate = this.pendingOnlineDateFilter || 'all';
        this.pendingOnlineTempMaster = this.pendingOnlineMasterFilter || 'all';
        this.pendingOnlineTempSort = this.pendingOnlineSortBy || 'date_asc';

        this.selectPendingOnlineFilterStatus(this.pendingOnlineTempStatus);
        this.selectPendingOnlineFilterDate(this.pendingOnlineTempDate);
        this.selectPendingOnlineFilterSort(this.pendingOnlineTempSort);

        const masterSelect = document.getElementById('poFilterMasterSelect');
        if (masterSelect) {
            masterSelect.value = this.pendingOnlineTempMaster;
        }

        modal.classList.remove('hidden');
    },

    closePendingOnlineFilterModal: function() {
        const modal = document.getElementById('bizPendingOnlineFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectPendingOnlineFilterStatus: function(val) {
        this.pendingOnlineTempStatus = val;
        ['all', 'Gözlənilir', 'Təsdiqləndi', 'Ləğv edildi'].forEach(st => {
            const btn = document.getElementById('poFilterStatusBtn_' + st);
            if (btn) {
                if (st === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold ring-1 ring-slate-900';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    selectPendingOnlineFilterDate: function(val) {
        this.pendingOnlineTempDate = val;
        ['all', 'today', 'tomorrow', 'this_week'].forEach(d => {
            const btn = document.getElementById('poFilterDateBtn_' + d);
            if (btn) {
                if (d === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold ring-1 ring-slate-900';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium';
                }
            }
        });
    },

    selectPendingOnlineFilterSort: function(val) {
        this.pendingOnlineTempSort = val;
        ['date_asc', 'date_desc', 'price_desc', 'price_asc', 'name_asc'].forEach(s => {
            const btn = document.getElementById('poFilterSortBtn_' + s);
            if (btn) {
                if (s === val) {
                    btn.className = 'w-full p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex items-center justify-between text-left transition cursor-pointer shadow-xs font-bold ring-1 ring-slate-900';
                } else {
                    btn.className = 'w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium';
                }
            }
        });
    },

    applyPendingOnlineFilterModal: function() {
        this.pendingOnlineStatusFilter = this.pendingOnlineTempStatus || 'all';
        this.pendingOnlineDateFilter = this.pendingOnlineTempDate || 'all';
        this.pendingOnlineSortBy = this.pendingOnlineTempSort || 'date_asc';

        const masterSelect = document.getElementById('poFilterMasterSelect');
        if (masterSelect) {
            this.pendingOnlineMasterFilter = masterSelect.value || 'all';
        }

        if (this.pendingOnlineStatusFilter === 'Gözlənilir' && this.pendingOnlineDateFilter === 'today') {
            this.pendingOnlineTab = 'today';
        } else if (this.pendingOnlineStatusFilter === 'Gözlənilir' && this.pendingOnlineDateFilter === 'all') {
            this.pendingOnlineTab = 'all_pending';
        } else if (this.pendingOnlineStatusFilter === 'Təsdiqləndi' && this.pendingOnlineDateFilter === 'all') {
            this.pendingOnlineTab = 'confirmed';
        } else if (this.pendingOnlineStatusFilter === 'all' && this.pendingOnlineDateFilter === 'all') {
            this.pendingOnlineTab = 'all';
        } else {
            this.pendingOnlineTab = 'custom';
        }

        this.pendingOnlinePage = 1;
        this.closePendingOnlineFilterModal();
        this.refreshCalendar();
    },

    resetPendingOnlineModalFilters: function() {
        this.selectPendingOnlineFilterStatus('all');
        this.selectPendingOnlineFilterDate('all');
        this.selectPendingOnlineFilterSort('date_asc');
        const masterSelect = document.getElementById('poFilterMasterSelect');
        if (masterSelect) masterSelect.value = 'all';
    },

    resetAllPendingOnlineFilters: function() {
        this.pendingOnlineStatusFilter = 'all';
        this.pendingOnlineDateFilter = 'all';
        this.pendingOnlineMasterFilter = 'all';
        this.pendingOnlineSortBy = 'date_asc';
        this.pendingOnlineSearchQuery = '';
        this.pendingOnlineTab = 'all';
        this.pendingOnlinePage = 1;
        this.refreshCalendar();
    },

    clearPendingOnlineFilter: function(key) {
        if (key === 'status') {
            this.pendingOnlineStatusFilter = 'all';
            if (this.pendingOnlineTab === 'all_pending' || this.pendingOnlineTab === 'confirmed') {
                this.pendingOnlineTab = 'all';
            }
        } else if (key === 'date') {
            this.pendingOnlineDateFilter = 'all';
            if (this.pendingOnlineTab === 'today') {
                this.pendingOnlineTab = 'all';
            }
        } else if (key === 'master') {
            this.pendingOnlineMasterFilter = 'all';
        } else if (key === 'sort') {
            this.pendingOnlineSortBy = 'date_asc';
        }
        this.pendingOnlinePage = 1;
        this.refreshCalendar();
    },

    setCalendarDate: function(dateStr) {
        if (!dateStr) return;
        this.calendarSelectedDate = dateStr;
        this.refreshCalendar();
    },

    navigateCalendarDate: function(daysDelta) {
        const d = new Date(this.calendarSelectedDate || new Date().toISOString().split('T')[0]);
        d.setDate(d.getDate() + (this.calendarViewMode === 'weekly' ? daysDelta * 7 : daysDelta));
        this.calendarSelectedDate = d.toISOString().split('T')[0];
        this.refreshCalendar();
    },

    goCalendarToday: function() {
        this.calendarSelectedDate = new Date().toISOString().split('T')[0];
        this.refreshCalendar();
        if (typeof App !== 'undefined') App.showToast('Bugünkü cədvələ keçid edildi');
    },

    refreshCalendar: function() {
        const body = document.getElementById('bizCanvasBody');
        if (body && this.activeTab === 'calendar') {
            body.innerHTML = this.renderCalendarModule();
        }
    },

    getFormattedSelectedDate: function() {
        const d = new Date(this.calendarSelectedDate || new Date().toISOString().split('T')[0]);
        const dayNames = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];
        const monthNames = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
        return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}, ${dayNames[d.getDay()]}`;
    },

    renderCalendarModule: function() {
        const bookings = this.getBookings();
        const staffList = this.getStaffList ? this.getStaffList() : [];
        const activeStaff = staffList.filter(s => s.status !== 'inactive');
        const activeCtx = this.getActiveContext();

        const selDate = this.calendarSelectedDate || new Date().toISOString().split('T')[0];

        // Ensure bookings have date if legacy
        const dateBookings = bookings.filter(b => {
            if (b.date) return b.date === selDate;
            return true;
        });

        // Computed KPIs
        const totalCount = dateBookings.length;
        const confirmedCount = dateBookings.filter(b => b.status === 'Təsdiqləndi' || b.status === 'confirmed').length;
        const completedCount = dateBookings.filter(b => b.status === 'Tamamlandı' || b.status === 'completed').length;
        const totalDayRevenue = dateBookings.reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);
        const pendingOnlineCount = bookings.filter(b => b.status === 'Gözlənilir' || (b.source === 'online' && b.status === 'Gözlənilir')).length;

        return `
            <div class="space-y-4 sm:space-y-5">
                <!-- TOP CONTROL BAR: Date Navigation, View Switcher & Action Buttons -->
                <div class="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <!-- Left: Date Navigator -->
                    <div class="flex items-center gap-2 flex-wrap">
                        <div class="inline-flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200/60 shadow-2xs">
                            <button type="button" onclick="BusinessDashboardView.navigateCalendarDate(-1)" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer" title="Əvvəlki">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                            </button>
                            <button type="button" onclick="BusinessDashboardView.goCalendarToday()" class="px-3 h-8 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition cursor-pointer">
                                Bu gün
                            </button>
                            <button type="button" onclick="BusinessDashboardView.navigateCalendarDate(1)" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer" title="Növbəti">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                            </button>
                        </div>

                        <!-- Date Picker & Human readable date -->
                        <div class="flex items-center gap-2">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="date" value="${selDate}" onchange="BusinessDashboardView.setCalendarDate(this.value)" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                                <div class="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-slate-800 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs">
                                    <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    <span>${this.getFormattedSelectedDate()}</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Center & Right: View Switcher, Filter & New Booking Button -->
                    <div class="flex items-center gap-2 sm:gap-3 flex-wrap justify-between sm:justify-end">
                        <!-- View Switcher -->
                        <div class="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
                            <button type="button" onclick="BusinessDashboardView.setCalendarViewMode('daily')" class="px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${this.calendarViewMode === 'daily' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900 font-medium'}">
                                Günlük (Ustalar)
                            </button>
                            <button type="button" onclick="BusinessDashboardView.setCalendarViewMode('weekly')" class="px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${this.calendarViewMode === 'weekly' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900 font-medium'}">
                                Həftəlik
                            </button>
                            <button type="button" onclick="BusinessDashboardView.setCalendarViewMode('pending_online')" class="px-3 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ${this.calendarViewMode === 'pending_online' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900 font-medium'}">
                                <span>Onlayn müraciətlər</span>
                                ${pendingOnlineCount > 0 ? `<span class="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">${pendingOnlineCount}</span>` : ''}
                            </button>
                        </div>

                        <!-- Master Filter Dropdown -->
                        <div>
                            <select onchange="BusinessDashboardView.setCalendarMasterFilter(this.value)" class="h-9 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold focus:outline-none focus:border-amber-400 cursor-pointer shadow-2xs">
                                <option value="all" ${this.calendarMasterFilter === 'all' ? 'selected' : ''}>Bütün ustalar</option>
                                ${activeStaff.map(m => `
                                    <option value="${m.id}" ${this.calendarMasterFilter === m.id ? 'selected' : ''}>${m.name}</option>
                                `).join('')}
                            </select>
                        </div>


                        <!-- New Booking Button -->
                        <button type="button" onclick="BusinessDashboardView.openBookingModal(null, '${selDate}', '10:00')" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition inline-flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                            <span>Yeni qəbul</span>
                        </button>
                    </div>
                </div>


                <!-- MAIN VIEW CONTENT -->
                <div class="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
                    ${this.calendarViewMode === 'weekly'
                        ? this.renderCalendarWeeklyOverview(bookings)
                        : (this.calendarViewMode === 'pending_online'
                            ? this.renderCalendarPendingOnlineView(bookings)
                            : this.renderCalendarDailyTimeline(dateBookings, activeStaff))}
                </div>
            </div>
        `;
    },

    // Master matching helper for calendar bookings
    isBookingForMaster: function(b, m) {
        if (!b || !m) return false;
        // Direct ID match
        if (b.masterId && (b.masterId === m.id || b.masterId === m.key)) return true;
        // Direct Name match
        if (b.masterName && m.name && (b.masterName.trim().toLowerCase() === m.name.trim().toLowerCase())) return true;
        // MasterKey match (only if non-empty string)
        if (b.masterKey && typeof b.masterKey === 'string' && b.masterKey.trim()) {
            const bk = b.masterKey.trim().toLowerCase();
            if (m.key && m.key.toLowerCase() === bk) return true;
            if (m.id && m.id.toLowerCase().includes(bk)) return true;
            if (m.name && m.name.toLowerCase().includes(bk)) return true;
        }
        // Service title mention of master name (e.g. "Samir Ə. — Kişi Saç Kəsimi")
        if (b.service && m.name) {
            const mFirst = m.name.split(' ')[0].toLowerCase();
            if (mFirst.length >= 3 && b.service.toLowerCase().startsWith(mFirst)) return true;
        }
        return false;
    },

    // APPOINTMENT COLOR CODING SERVICE INTEGRATION
    getAppointmentColor: function(appointment, colorMode) {
        if (typeof AppointmentColorService !== 'undefined') {
            return AppointmentColorService.getAppointmentColor(appointment, colorMode);
        }
        return {
            key: 'blue',
            isBlocked: false,
            headerBg: 'bg-sky-100 text-sky-900 font-semibold',
            headerText: 'text-sky-900',
            border: 'border-sky-300/80 hover:border-sky-400',
            cardBorder: 'border-sky-300/80 hover:border-sky-400',
            bg: 'bg-sky-100 hover:bg-sky-200/70',
            cardBg: 'bg-sky-100 hover:bg-sky-200/70',
            timeColor: 'text-sky-950 font-bold font-mono',
            titleColor: 'text-sky-950 font-bold group-hover:text-sky-900',
            serviceColor: 'text-sky-900/80 font-medium',
            subColor: 'text-sky-800/80',
            priceColor: 'text-sky-950 font-bold font-mono',
            badgeBg: 'bg-white/90 text-sky-800 border border-sky-300/80 shadow-2xs',
            dividerColor: 'border-sky-200/80',
            stripeBar: 'bg-sky-500',
            statusBadgeText: 'text-sky-800',
            backgroundColor: '#e0f2fe',
            borderColor: '#7dd3fc',
            textColor: '#082f49',
            accentColor: '#0284c7'
        };
    },

    getAppointmentColorMode: function() {
        return 'status';
    },

    setAppointmentColorMode: function(mode) {
        if (typeof AppointmentColorService !== 'undefined') {
            AppointmentColorService.setColorMode('status');
        }
        this.refreshCalendar();
    },

    setServiceColor: function(serviceId, colorKey) {
        this.refreshCalendar();
    },

    setStaffColor: function(staffId, colorKey) {
        this.refreshCalendar();
    },

    openCalendarSettingsModal: function() {
        // Disabled - colors strictly default to status
    },

    closeCalendarSettingsModal: function() {
        // Disabled - colors strictly default to status
    },

    refreshCalendarSettingsModal: function() {
        // Disabled - colors strictly default to status
    },

    renderCalendarSettingsModalHtml: function() {
        return '';
    },

    getBookingColorTheme: function(booking) {
        return this.getAppointmentColor(booking);
    },

    getBookingTimeRange: function(b) {
        if (!b) return '10:00 – 10:30';
        if (b.time && (b.time.includes('–') || b.time.includes(' - '))) {
            return b.time.replace(' - ', ' – ');
        }
        
        let startH = 10;
        let startM = 0;
        if (b.time && b.time.includes(':')) {
            const parts = b.time.split(':');
            startH = parseInt(parts[0]) || 10;
            startM = parseInt(parts[1]) || 0;
        } else if (b.startHour !== undefined) {
            startH = Math.floor(b.startHour);
            startM = Math.round((b.startHour - startH) * 60);
        }

        const durMin = b.durationMinutes || (b.durationHours ? Math.round(b.durationHours * 60) : 30);
        const totalStartMin = startH * 60 + startM;
        const totalEndMin = totalStartMin + durMin;

        const endH = Math.floor(totalEndMin / 60);
        const endM = totalEndMin % 60;

        const sStr = `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
        const eStr = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
        return `${sStr} – ${eStr}`;
    },

    getBookingStatusIconSvg: function(status) {
        const st = (status || '').toLowerCase();
        if (st.includes('tamam') || st.includes('completed')) {
            return `<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
        }
        if (st.includes('gözlənilir') || st.includes('pending') || st.includes('plan')) {
            return `<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
        }
        if (st.includes('ləğv') || st.includes('cancel')) {
            return `<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
        }
        if (st.includes('gəldi') || st.includes('salondadır')) {
            return `<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`;
        }
        return `<svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`;
    },

    // ----------------------------------------------------
    // TIME & DOUBLE-BOOKING CONFLICT PREVENTION
    // ----------------------------------------------------
    parseTimeToMinutes: function(tStr) {
        if (!tStr) return 0;
        const clean = tStr.split('–')[0].split('-')[0].trim();
        const parts = clean.split(':');
        return (parseInt(parts[0], 10) || 0) * 60 + (parseInt(parts[1], 10) || 0);
    },

    formatMinutesToTime: function(min) {
        const h = Math.floor(min / 60);
        const m = min % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    },

    findBookingTimeConflict: function(masterId, date, time, durationMinutes, excludeBookingId) {
        if (!date || !time) return null;
        const staffList = this.getStaffList ? this.getStaffList() : [];
        const masterObj = staffList.find(m => m.id === masterId) || { id: masterId, name: 'Usta' };

        const reqStart = this.parseTimeToMinutes(time);
        const reqDur = parseInt(durationMinutes, 10) || 30;
        const reqEnd = reqStart + reqDur;

        const bookings = this.getBookings();
        for (const b of bookings) {
            if (excludeBookingId && b.id === excludeBookingId) continue;
            if (b.date !== date) continue;
            if (b.status === 'Ləğv edildi') continue;

            // Check if for this master
            if (!this.isBookingForMaster(b, masterObj)) continue;

            const bStart = this.parseTimeToMinutes(b.time);
            const bDur = b.durationMinutes || (b.durationHours ? Math.round(b.durationHours * 60) : 30);
            const bEnd = bStart + bDur;

            // Overlap check: reqStart < bEnd && reqEnd > bStart
            if (reqStart < bEnd && reqEnd > bStart) {
                return {
                    conflictingBooking: b,
                    timeRange: this.getBookingTimeRange(b),
                    clientName: b.clientName || 'Müştəri',
                    service: b.service || 'Xidmət',
                    masterName: masterObj.name || (b.masterName || 'Usta')
                };
            }
        }
        return null;
    },

    checkBookingConflictRealtime: function() {
        const masterEl = document.getElementById('bmMasterId');
        const dateEl = document.getElementById('bmDate');
        const timeEl = document.getElementById('bmTime');
        const durEl = document.getElementById('bmDuration');
        const warningBox = document.getElementById('bmConflictWarning');
        const submitBtn = document.getElementById('bmSubmitBtn');

        if (!masterEl || !dateEl || !timeEl || !durEl) return;

        const conflict = this.findBookingTimeConflict(
            masterEl.value,
            dateEl.value,
            timeEl.value,
            parseInt(durEl.value, 10) || 30,
            this.bookingEditingId
        );

        if (warningBox) {
            if (conflict) {
                warningBox.innerHTML = `
                    <div class="flex items-start gap-2.5">
                        <svg class="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <div class="leading-tight">
                            <span class="font-bold text-rose-900 block">Bu vaxt aralığında ustanın artıq qəbulu var!</span>
                            <span class="text-rose-700 block mt-1 text-[11px]">${conflict.timeRange} — ${conflict.clientName} (${conflict.service})</span>
                            <span class="text-rose-600 font-medium block mt-1 text-[10px]">Bir vaxtda eyni ustaya iki seans yazmaq olmaz. Zəhmət olmasa başqa saat və ya başqa usta seçin.</span>
                        </div>
                    </div>
                `;
                warningBox.classList.remove('hidden');
                timeEl.classList.add('border-rose-400', 'bg-rose-50/30');
            } else {
                warningBox.innerHTML = '';
                warningBox.classList.add('hidden');
                timeEl.classList.remove('border-rose-400', 'bg-rose-50/30');
            }
        }

        if (submitBtn) {
            if (conflict) {
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
                submitBtn.title = 'Seçilmiş saatda ustanın artıq qəbulu var';
            } else {
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                submitBtn.title = '';
            }
        }
    },

    computeOverlappingColumns: function(bookings) {
        if (!bookings || bookings.length === 0) return [];
        const items = bookings.map(b => {
            const bStartHour = b.startHour !== undefined ? Math.floor(b.startHour) : (b.time ? parseInt(b.time.split(':')[0]) : 9);
            const bStartMin = (b.time && b.time.includes(':')) ? parseInt(b.time.split(':')[1]) : (b.startMin !== undefined ? b.startMin : (b.startHour ? Math.round((b.startHour - Math.floor(b.startHour)) * 60) : 0));
            const durMin = b.durationMinutes || (b.durationHours ? Math.round(b.durationHours * 60) : 30);
            const start = bStartHour * 60 + bStartMin;
            const end = start + durMin;
            return { booking: b, start, end, col: 0, totalCols: 1 };
        });

        items.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

        const clusters = [];
        let currentCluster = [];
        let clusterEnd = -1;

        items.forEach(item => {
            if (currentCluster.length === 0 || item.start < clusterEnd) {
                currentCluster.push(item);
                clusterEnd = Math.max(clusterEnd, item.end);
            } else {
                clusters.push(currentCluster);
                currentCluster = [item];
                clusterEnd = item.end;
            }
        });
        if (currentCluster.length > 0) {
            clusters.push(currentCluster);
        }

        clusters.forEach(cluster => {
            const columns = [];
            cluster.forEach(item => {
                let placed = false;
                for (let c = 0; c < columns.length; c++) {
                    if (columns[c] <= item.start) {
                        item.col = c;
                        columns[c] = item.end;
                        placed = true;
                        break;
                    }
                }
                if (!placed) {
                    item.col = columns.length;
                    columns.push(item.end);
                }
            });
            const total = columns.length;
            cluster.forEach(item => {
                item.totalCols = total;
            });
        });

        return items;
    },

    // 1. DAILY MASTERS TIMELINE VIEW (EASYWEEK STYLE)
    renderCalendarDailyTimeline: function(dateBookings, activeStaff) {
        let masters = activeStaff;
        if (this.calendarMasterFilter !== 'all') {
            masters = activeStaff.filter(s => s.id === this.calendarMasterFilter);
        }
        if (masters.length === 0) masters = activeStaff.slice(0, 4);

        const startHour = 8;
        const endHour = 22;
        const hours = [];
        for (let h = startHour; h <= endHour; h++) {
            hours.push(h);
        }

        const slotHeight = 64; // px per hour
        const selDate = this.calendarSelectedDate || new Date().toISOString().split('T')[0];

        // Red live timeline position for today
        const now = new Date();
        const isViewingToday = selDate === now.toISOString().split('T')[0];
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const showRedLine = isViewingToday && currentHour >= startHour && currentHour <= endHour;
        const redLineTop = showRedLine ? ((currentHour - startHour) * slotHeight + (currentMinute / 60) * slotHeight) : -100;

        const timelineMinWidth = Math.max(860, 80 + masters.length * 220);

        return `
            <div class="overflow-auto max-h-[calc(100vh-210px)] min-h-[520px] relative scroll-smooth rounded-2xl">
                <div class="select-none relative" style="min-width: ${timelineMinWidth}px;">
                    <!-- TIMELINE HEADER ROW: Masters list (Sticky Top at all times) -->
                    <div class="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs flex text-xs font-semibold text-slate-500">
                        <div class="w-16 sm:w-20 shrink-0 py-3 px-3 text-center font-bold text-[11px] text-slate-500 border-r border-slate-200/70 bg-slate-50/95 sticky left-0 top-0 z-40">
                            Saat
                        </div>

                        <div class="flex-1 grid" style="grid-template-columns: repeat(${masters.length}, minmax(220px, 1fr));">
                            ${masters.map(m => {
                                const mBookings = dateBookings.filter(b => this.isBookingForMaster(b, m));
                                const mRev = mBookings.reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);
                                const mAvatar = m.avatar || m.photo || m.image || '';
                                const initials = (m.name || 'U').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
                                return `
                                    <div class="p-2.5 sm:p-3 border-r border-slate-200/70 flex items-center gap-2.5 min-w-0 bg-slate-50/95">
                                        <div class="w-9 h-9 rounded-xl bg-white overflow-hidden shrink-0 border border-slate-200 shadow-2xs relative flex items-center justify-center ring-1 ring-black/5">
                                            ${mAvatar ? `
                                                <img src="${mAvatar}" alt="${m.name}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');">
                                                <div class="hidden w-full h-full flex items-center justify-center font-bold text-xs text-slate-700 bg-slate-100">
                                                    ${initials}
                                                </div>
                                            ` : `
                                                <div class="w-full h-full flex items-center justify-center font-bold text-xs text-slate-700 bg-slate-100">
                                                    ${initials}
                                                </div>
                                            `}
                                        </div>
                                        <div class="min-w-0">
                                            <div class="font-bold text-xs text-slate-900 truncate">${m.name}</div>
                                            <div class="text-[10px] text-slate-400 font-normal truncate">${m.role || 'Mütəxəssis'} • ${mBookings.length} qəbul</div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- TIMELINE GRID BODY -->
                    <div class="relative flex">
                        <!-- Left Time Scale (Sticky Left on horizontal scroll) -->
                        <div class="w-16 sm:w-20 shrink-0 border-r border-slate-200/70 divide-y divide-slate-100 bg-slate-50/95 sticky left-0 z-20">
                            ${hours.map(h => `
                                <div class="h-16 flex items-start justify-center pt-1.5 text-[11px] font-mono font-semibold text-slate-400">
                                    ${h.toString().padStart(2, '0')}:00
                                </div>
                            `).join('')}
                        </div>

                        <!-- Master Columns Grid -->
                        <div class="flex-1 grid relative divide-x divide-slate-200/70" style="grid-template-columns: repeat(${masters.length}, minmax(220px, 1fr));">
                            ${showRedLine ? `
                                <div class="absolute inset-x-0 z-30 pointer-events-none flex items-center" style="top: ${redLineTop}px;">
                                    <div class="w-2.5 h-2.5 rounded-full bg-rose-500 -ml-1"></div>
                                    <div class="flex-1 h-[2px] bg-rose-500"></div>
                                </div>
                            ` : ''}

                            ${masters.map(m => {
                                const mBookings = dateBookings.filter(b => this.isBookingForMaster(b, m));

                                return `
                                    <div class="relative divide-y divide-slate-100/90" style="height: ${hours.length * slotHeight}px;">
                                        <!-- Hour Clickable Slots -->
                                        ${hours.map(h => `
                                            <div class="h-16 hover:bg-amber-50/30 transition group cursor-pointer relative" onclick="BusinessDashboardView.openBookingModal(null, '${selDate}', '${h.toString().padStart(2, '0')}:00', '${m.id}')" title="Qəbul yaz: ${m.name} (${h}:00)">
                                                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-[10px] text-amber-700 font-bold">
                                                    + Qəbul
                                                </div>
                                            </div>
                                        `).join('')}

                                        <!-- Rendered Bookings in this Master Column (Non-overlapping & Overlap-safe) -->
                                        ${(() => {
                                            const layoutItems = this.computeOverlappingColumns(mBookings);
                                            return layoutItems.map(item => {
                                                const b = item.booking;
                                                const bStartHour = b.startHour !== undefined ? Math.floor(b.startHour) : (b.time ? parseInt(b.time.split(':')[0]) : 9);
                                                const bStartMin = (b.time && b.time.includes(':')) ? parseInt(b.time.split(':')[1]) : (b.startMin !== undefined ? b.startMin : (b.startHour ? Math.round((b.startHour - Math.floor(b.startHour)) * 60) : 0));
                                                const durationH = b.durationHours || (b.durationMinutes ? b.durationMinutes / 60 : 0.75);
                                                const topOffset = Math.max(0, (bStartHour - startHour) * slotHeight + (bStartMin / 60) * slotHeight);
                                                const blockHeight = Math.max(52, durationH * slotHeight - 4);

                                                const theme = this.getBookingColorTheme(b);
                                                const timeRange = this.getBookingTimeRange(b);
                                                const statusIcon = this.getBookingStatusIconSvg(b.status);

                                                const totalCols = item.totalCols || 1;
                                                const colIdx = item.col || 0;
                                                const colWidthPercent = 100 / totalCols;
                                                const leftPercent = colIdx * colWidthPercent;
                                                const stylePosition = totalCols > 1
                                                    ? `top: ${topOffset}px; height: ${blockHeight}px; left: calc(${leftPercent}% + 2px); width: calc(${colWidthPercent}% - 4px);`
                                                    : `top: ${topOffset}px; height: ${blockHeight}px; left: 4px; right: 4px;`;

                                                 return `
                                                    <div style="${stylePosition} background-color: ${theme.backgroundColor || '#e0f2fe'}; border-color: ${theme.borderColor || '#7dd3fc'};"
                                                         class="absolute rounded-xl border ${theme.cardBorder || theme.border || 'border-slate-200'} ${theme.cardBg || theme.bg || 'bg-white'} shadow-2xs hover:shadow-md transition cursor-pointer overflow-hidden z-10 group flex"
                                                         onclick="event.stopPropagation(); BusinessDashboardView.openBookingModal('${b.id}')">
                                                        
                                                        <!-- Left Status Stripe Bar -->
                                                        <div class="w-1.5 shrink-0 ${theme.stripeBar || 'bg-sky-500'} self-stretch"></div>

                                                        <!-- Clean Zeyvo Card Body -->
                                                        <div class="p-1.5 sm:p-2 flex-1 flex flex-col justify-between min-w-0 overflow-hidden" ${theme.isBlocked ? `style="${theme.stripedStyle}"` : ''}>
                                                            <!-- Header row: Time & Status Pill Badge -->
                                                            <div class="flex items-center justify-between gap-1 min-w-0">
                                                                <span class="text-[10px] sm:text-[11px] font-bold font-mono ${theme.timeColor || 'text-slate-800'} tracking-tight shrink-0">${timeRange}</span>
                                                                <div class="flex items-center gap-1 shrink-0 ml-auto min-w-0">
                                                                    ${totalCols > 1 ? `<span class="text-[9px] bg-rose-100 text-rose-800 border border-rose-300 px-1 py-0.2 rounded font-bold" title="Vaxt toqquşması!">Toqquşma</span>` : ''}
                                                                    ${b.note ? `<svg class="w-2.5 h-2.5 opacity-60 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" title="${b.note}"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>` : ''}
                                                                    <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md text-[9px] font-semibold shrink-0 ${theme.badgeBg}">
                                                                        ${statusIcon}
                                                                        <span class="truncate max-w-[65px]">${b.status || 'Təsdiqləndi'}</span>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <!-- Middle row: Client Name & Price -->
                                                            <div class="min-w-0 my-0.5">
                                                                <div class="flex items-baseline justify-between gap-1">
                                                                    <span class="text-[11px] sm:text-xs font-bold truncate leading-tight ${theme.titleColor || 'text-slate-900'}">${b.clientName || 'Müştəri'}</span>
                                                                    ${b.price ? `<span class="text-[10px] sm:text-[11px] font-bold font-mono ${theme.priceColor || 'text-slate-900'} shrink-0">${b.price} ₼</span>` : ''}
                                                                </div>
                                                                <div class="text-[10px] ${theme.serviceColor || 'text-slate-600'} font-medium truncate mt-0.5">
                                                                    ${b.service || 'Xidmət'}
                                                                </div>
                                                            </div>

                                                            <!-- Bottom row: Phone / Master / Extra info -->
                                                            ${blockHeight >= 62 ? `
                                                                <div class="flex items-center justify-between text-[9px] ${theme.subColor || 'text-slate-500'} font-mono pt-1 border-t ${theme.dividerColor || 'border-slate-200/60'}">
                                                                    <span class="truncate">${b.masterName ? b.masterName.split(' ')[0] : (b.phone || '')}</span>
                                                                    ${b.source === 'online' ? `<span class="text-[9px] text-amber-900 font-sans font-semibold bg-white/90 px-1 rounded border border-amber-300">Onlayn</span>` : ''}
                                                                </div>
                                                            ` : ''}
                                                        </div>
                                                    </div>
                                                `;
                                            }).join('');
                                        })()}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // 2. WEEKLY OVERVIEW (EASYWEEK STYLE)
    renderCalendarWeeklyOverview: function(bookings) {
        let weeklyBookings = bookings;
        if (this.calendarMasterFilter !== 'all') {
            const staffList = this.getStaffList ? this.getStaffList() : [];
            const selectedMaster = staffList.find(s => s.id === this.calendarMasterFilter);
            if (selectedMaster) {
                weeklyBookings = bookings.filter(b => this.isBookingForMaster(b, selectedMaster));
            }
        }

        const days = [
            { id: 'mon', label: 'B.e', name: 'Bazar ertəsi' },
            { id: 'tue', label: 'Ç.a', name: 'Çərşənbə axşamı' },
            { id: 'wed', label: 'Ç',   name: 'Çərşənbə' },
            { id: 'thu', label: 'C.a', name: 'Cümə axşamı' },
            { id: 'fri', label: 'C',   name: 'Cümə' },
            { id: 'sat', label: 'Ş',   name: 'Şənbə' },
            { id: 'sun', label: 'B',   name: 'Bazar' }
        ];

        return `
            <div class="p-4 sm:p-5 overflow-x-auto">
                <div class="min-w-[980px] grid grid-cols-7 gap-3">
                    ${days.map((d, dayIdx) => {
                        const dayBookings = weeklyBookings.filter(b => (b.day && b.day.toLowerCase().includes(d.id)) || (b.date && new Date(b.date).getDay() === (dayIdx === 6 ? 0 : dayIdx + 1)));
                        return `
                            <div class="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3 min-h-[340px] flex flex-col space-y-2">
                                <div class="flex items-center justify-between pb-2 border-b border-slate-200/60 font-semibold text-xs text-slate-700">
                                    <span>${d.name}</span>
                                    <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">${dayBookings.length}</span>
                                </div>
                                <div class="flex-1 space-y-2 overflow-y-auto no-scrollbar">
                                    ${dayBookings.length === 0 ? `
                                        <div class="h-28 flex items-center justify-center text-slate-400 text-[11px] italic">Qəbul yoxdur</div>
                                    ` : dayBookings.map(b => {
                                        const theme = this.getBookingColorTheme(b);
                                        const timeRange = this.getBookingTimeRange(b);
                                        const statusIcon = this.getBookingStatusIconSvg(b.status);
                                        return `
                                            <div onclick="BusinessDashboardView.openBookingModal('${b.id}')"
                                                 style="background-color: ${theme.backgroundColor || '#e0f2fe'}; border-color: ${theme.borderColor || '#7dd3fc'};"
                                                 class="relative rounded-xl border ${theme.cardBorder || theme.border || 'border-slate-200'} ${theme.cardBg || theme.bg || 'bg-white'} shadow-2xs hover:shadow-md transition cursor-pointer overflow-hidden flex group">
                                                
                                                <!-- Left Status Stripe Bar -->
                                                <div class="w-1.5 shrink-0 ${theme.stripeBar || 'bg-sky-500'} self-stretch"></div>

                                                <!-- Clean Zeyvo Card Body -->
                                                <div class="p-2 space-y-1 flex-1 min-w-0" ${theme.isBlocked ? `style="${theme.stripedStyle}"` : ''}>
                                                    <!-- Top row: Time & Status Pill -->
                                                    <div class="flex items-center justify-between gap-1 text-[11px] min-w-0">
                                                        <span class="font-bold font-mono ${theme.timeColor || 'text-slate-800'} tracking-tight shrink-0">${timeRange}</span>
                                                        <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md text-[9px] font-semibold shrink-0 ${theme.badgeBg}">
                                                            ${statusIcon}
                                                            <span class="truncate max-w-[60px]">${b.status || 'Təsdiqləndi'}</span>
                                                        </span>
                                                    </div>

                                                    <!-- Middle row: Client & Price -->
                                                    <div class="flex items-baseline justify-between gap-1 text-xs">
                                                        <span class="font-bold ${theme.titleColor || 'text-slate-900'} truncate">${b.clientName || 'Müştəri'}</span>
                                                        ${b.price ? `<span class="font-mono font-bold ${theme.priceColor || 'text-slate-900'} shrink-0 text-[11px]">${b.price} ₼</span>` : ''}
                                                    </div>

                                                    <!-- Service -->
                                                    <div class="text-[10px] ${theme.serviceColor || 'text-slate-600'} font-medium truncate">${b.service || 'Xidmət'}</div>

                                                    <!-- Bottom row: Phone / Master -->
                                                    <div class="flex items-center justify-between text-[9px] ${theme.subColor || 'text-slate-500'} font-mono pt-1 border-t ${theme.dividerColor || 'border-slate-200/60'}">
                                                        <span class="truncate">${b.phone || (b.masterName ? b.masterName.split(' ')[0] : '')}</span>
                                                        ${b.note ? `<svg class="w-2.5 h-2.5 opacity-60 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" title="${b.note}"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>` : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    // ==========================================
    // 3. PENDING ONLINE CLIENT BOOKINGS VIEW
    // ==========================================
    confirmOnlineBooking: function(id) {
        const bookings = this.getBookings();
        const b = bookings.find(x => x.id === id);
        if (!b) return;

        b.status = 'Təsdiqləndi';
        this.saveBookings(bookings);

        // Auto-register client in CRM if not already present
        const allClients = this.getClientsData();
        const cleanDigits = this.getCleanPhoneDigits(b.phone);
        const normName = (b.clientName || '').trim().toLowerCase();
        let existingClient = allClients.find(c => {
            const cDigits = this.getCleanPhoneDigits(c.phone);
            if (cleanDigits && cDigits && cleanDigits === cDigits) return true;
            if (normName && (c.name || '').trim().toLowerCase() === normName) return true;
            return false;
        });

        if (!existingClient) {
            existingClient = {
                id: 'c_' + Date.now(),
                name: b.clientName,
                phone: b.phone,
                category: 'normal',
                depositBalance: 0,
                cashbackBalance: 0,
                totalVisits: 0,
                totalSpent: 0,
                history: [],
                createdAt: new Date().toISOString()
            };
            allClients.unshift(existingClient);
            this.saveClientsData(allClients);
        }

        this.refreshCalendar();
        if (typeof App !== 'undefined') {
            App.showToast(`Qəbul təsdiqləndi: ${b.clientName} (${b.time})`);
        }
    },

    rejectOnlineBooking: function(id) {
        const bookings = this.getBookings();
        const b = bookings.find(x => x.id === id);
        if (!b) return;

        if (!confirm(`${b.clientName} tərəfindən göndərilən qəbul müraciətini ləğv etmək istəyirsiniz?`)) return;

        b.status = 'Ləğv edildi';
        this.saveBookings(bookings);
        this.refreshCalendar();
        if (typeof App !== 'undefined') {
            App.showToast('Onlayn müraciət ləğv edildi');
        }
    },

    renderCalendarPendingOnlineView: function(bookings) {
        const todayStr = new Date().toISOString().split('T')[0];

        // Find all online or pending requests
        let onlineList = bookings.filter(b => b.status === 'Gözlənilir' || b.source === 'online');

        const pendingCount = onlineList.filter(b => b.status === 'Gözlənilir').length;
        const todayPendingCount = onlineList.filter(b => b.status === 'Gözlənilir' && b.date === todayStr).length;
        const confirmedOnlineCount = onlineList.filter(b => b.status === 'Təsdiqləndi').length;

        // Apply filters
        let filtered = onlineList.filter(b => {
            // Status filter
            if (this.pendingOnlineStatusFilter === 'Gözlənilir' && b.status !== 'Gözlənilir') return false;
            if (this.pendingOnlineStatusFilter === 'Təsdiqləndi' && b.status !== 'Təsdiqləndi') return false;
            if (this.pendingOnlineStatusFilter === 'Ləğv edildi' && b.status !== 'Ləğv edildi') return false;

            // Date filter
            if (this.pendingOnlineDateFilter === 'today' && b.date !== todayStr) return false;
            if (this.pendingOnlineDateFilter === 'tomorrow') {
                const tom = new Date();
                tom.setDate(tom.getDate() + 1);
                const tomStr = tom.toISOString().split('T')[0];
                if (b.date !== tomStr) return false;
            }
            if (this.pendingOnlineDateFilter === 'this_week') {
                const d = new Date(b.date);
                const now = new Date();
                const dayOfWeek = now.getDay() || 7;
                const mon = new Date(now);
                mon.setDate(now.getDate() - dayOfWeek + 1);
                mon.setHours(0, 0, 0, 0);
                const sun = new Date(mon);
                sun.setDate(mon.getDate() + 6);
                sun.setHours(23, 59, 59, 999);
                if (d < mon || d > sun) return false;
            }

            // Master filter
            if (this.pendingOnlineMasterFilter && this.pendingOnlineMasterFilter !== 'all') {
                const qm = this.pendingOnlineMasterFilter.toLowerCase();
                const mName = (b.masterName || '').toLowerCase();
                if (!mName.includes(qm)) return false;
            }

            // Search query
            if (this.pendingOnlineSearchQuery) {
                const q = this.pendingOnlineSearchQuery.toLowerCase().trim();
                const mClient = (b.clientName && b.clientName.toLowerCase().includes(q));
                const mPhone = (b.phone && b.phone.includes(q));
                const mService = (b.service && b.service.toLowerCase().includes(q));
                const mMaster = (b.masterName && b.masterName.toLowerCase().includes(q));
                if (!mClient && !mPhone && !mService && !mMaster) return false;
            }

            return true;
        });

        // Sorting
        filtered.sort((a, b) => {
            if (this.pendingOnlineSortBy === 'date_desc') {
                return (b.date + ' ' + (b.time || '')) > (a.date + ' ' + (a.time || '')) ? 1 : -1;
            } else if (this.pendingOnlineSortBy === 'price_desc') {
                return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
            } else if (this.pendingOnlineSortBy === 'price_asc') {
                return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
            } else if (this.pendingOnlineSortBy === 'name_asc') {
                return (a.clientName || '').localeCompare(b.clientName || '');
            } else {
                return (a.date + ' ' + (a.time || '')) > (b.date + ' ' + (b.time || '')) ? 1 : -1;
            }
        });

        let activeFilterCount = 0;
        if (this.pendingOnlineStatusFilter && this.pendingOnlineStatusFilter !== 'all') activeFilterCount++;
        if (this.pendingOnlineDateFilter && this.pendingOnlineDateFilter !== 'all') activeFilterCount++;
        if (this.pendingOnlineMasterFilter && this.pendingOnlineMasterFilter !== 'all') activeFilterCount++;
        if (this.pendingOnlineSortBy && this.pendingOnlineSortBy !== 'date_asc') activeFilterCount++;

        const totalPendingAmount = filtered.reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);
        const allClients = this.getClientsData();
        const staffList = this.getStaffList ? this.getStaffList() : [];

        const pageSize = this.pendingOnlinePageSize || 10;
        const totalPages = Math.ceil(filtered.length / pageSize) || 1;
        const currentPage = Math.min(this.pendingOnlinePage || 1, totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const pageItems = filtered.slice(startIndex, startIndex + pageSize);

        return `
            <div class="p-4 sm:p-6 space-y-5">
                <!-- Header & Stats -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="text-base font-bold text-slate-900">Onlayn müraciətlər və gözləyənlər</h3>
                            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                                ${pendingCount} təsdiq gözləyir
                            </span>
                        </div>
                        <p class="text-xs text-slate-500 font-medium mt-0.5">Müştərilər tərəfindən platformadan göndərilən rezervasiya istəkləri</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <div class="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-600">
                            Cəmi məbləğ: <span class="font-bold text-slate-900">${totalPendingAmount.toFixed(2)} ₼</span>
                        </div>
                    </div>
                </div>

                <!-- 1. SUB-TABS (Segmented Control) -->
                <div class="overflow-x-auto pb-0.5">
                    <div class="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-2xs text-xs font-semibold">
                        <button type="button" onclick="BusinessDashboardView.setPendingOnlineTab('all')" class="px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${this.pendingOnlineTab === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                            Bütün müraciətlər (${onlineList.length})
                        </button>
                        <button type="button" onclick="BusinessDashboardView.setPendingOnlineTab('all_pending')" class="px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${this.pendingOnlineTab === 'all_pending' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                            Təsdiq gözləyənlər (${pendingCount})
                        </button>
                        <button type="button" onclick="BusinessDashboardView.setPendingOnlineTab('today')" class="px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${this.pendingOnlineTab === 'today' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                            Bugünkü (${todayPendingCount})
                        </button>
                        <button type="button" onclick="BusinessDashboardView.setPendingOnlineTab('confirmed')" class="px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${this.pendingOnlineTab === 'confirmed' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                            Təsdiqlənmişlər (${confirmedOnlineCount})
                        </button>
                    </div>
                </div>

                <!-- 2. SEARCH & FILTERS BAR (Standard across all modules) -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <!-- Search Input -->
                        <div class="relative flex-1 min-w-0">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="pendingOnlineSearchInput"
                                   placeholder="Müştəri adı, telefon, xidmət və ya usta üzrə axtarış..."
                                   value="${this.escapeHtml(this.pendingOnlineSearchQuery || '')}"
                                   oninput="BusinessDashboardView.setPendingOnlineSearch(this.value)"
                                   class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs" />
                            ${this.pendingOnlineSearchQuery ? `
                                <button type="button"
                                        onclick="BusinessDashboardView.clearPendingOnlineSearch()"
                                        class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
                                        title="Təmizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            ` : ''}
                        </div>

                        <!-- Filter Button -->
                        <button type="button"
                                onclick="BusinessDashboardView.openPendingOnlineFilterModal()"
                                class="h-11 px-4 rounded-2xl bg-white border ${activeFilterCount > 0 ? 'border-slate-900 ring-2 ring-amber-400/40 bg-amber-50/20' : 'border-slate-200/80 hover:border-slate-300'} text-slate-700 text-xs font-semibold transition flex items-center gap-2 shadow-2xs cursor-pointer shrink-0"
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

                    <!-- Active Filter Chips / Pills -->
                    ${(activeFilterCount > 0 || this.pendingOnlineSearchQuery) ? `
                        <div class="flex items-center gap-2 flex-wrap pt-0.5 text-xs">
                            <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                            ${this.pendingOnlineSearchQuery ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-medium text-[11px]">
                                    <span>Axtarış: "${this.escapeHtml(this.pendingOnlineSearchQuery)}"</span>
                                    <button type="button" onclick="BusinessDashboardView.clearPendingOnlineSearch()" class="text-slate-400 hover:text-rose-600 transition cursor-pointer flex items-center" title="Sil">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                    </button>
                                </span>
                            ` : ''}

                            ${this.pendingOnlineStatusFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                                    <span>Status: ${this.pendingOnlineStatusFilter}</span>
                                    <button type="button" onclick="BusinessDashboardView.clearPendingOnlineFilter('status')" class="text-amber-500 hover:text-rose-600 transition cursor-pointer flex items-center" title="Sil">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                    </button>
                                </span>
                            ` : ''}

                            ${this.pendingOnlineDateFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-[11px]">
                                    <span>Tarix: ${this.pendingOnlineDateFilter === 'today' ? 'Bugünkü' : (this.pendingOnlineDateFilter === 'tomorrow' ? 'Sabahkı' : 'Bu həftə')}</span>
                                    <button type="button" onclick="BusinessDashboardView.clearPendingOnlineFilter('date')" class="text-slate-400 hover:text-rose-600 transition cursor-pointer flex items-center" title="Sil">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                    </button>
                                </span>
                            ` : ''}

                            ${this.pendingOnlineMasterFilter !== 'all' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-[11px]">
                                    <span>Usta: ${this.escapeHtml(this.pendingOnlineMasterFilter)}</span>
                                    <button type="button" onclick="BusinessDashboardView.clearPendingOnlineFilter('master')" class="text-slate-400 hover:text-rose-600 transition cursor-pointer flex items-center" title="Sil">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                    </button>
                                </span>
                            ` : ''}

                            ${this.pendingOnlineSortBy !== 'date_asc' ? `
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-[11px]">
                                    <span>Sıralama: ${this.pendingOnlineSortBy === 'date_desc' ? 'Ən son' : (this.pendingOnlineSortBy === 'price_desc' ? 'Yüksək qiymət' : (this.pendingOnlineSortBy === 'price_asc' ? 'Aşağı qiymət' : 'Ad A-Z'))}</span>
                                    <button type="button" onclick="BusinessDashboardView.clearPendingOnlineFilter('sort')" class="text-slate-400 hover:text-rose-600 transition cursor-pointer flex items-center" title="Sil">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                    </button>
                                </span>
                            ` : ''}

                            <button type="button" onclick="BusinessDashboardView.resetAllPendingOnlineFilters()" class="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer ml-1">
                                Filtrləri sıfırla
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- Table List View -->
                ${filtered.length === 0 ? `
                    <div class="py-12 px-4 text-center">
                        <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                        <h4 class="font-bold text-sm text-slate-800">Müraciət tapılmadı</h4>
                        <p class="text-xs text-slate-500 mt-1">Seçilmiş filtrlərə və ya axtarışa uyğun heç bir onlayn qəbul müraciəti tapılmadı.</p>
                        ${(activeFilterCount > 0 || this.pendingOnlineSearchQuery) ? `
                            <button type="button" onclick="BusinessDashboardView.resetAllPendingOnlineFilters()" class="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">
                                Filtrləri sıfırla
                            </button>
                        ` : ''}
                    </div>
                ` : `
                    <div class="pending-online-table-wrap overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
                        <table class="pending-online-table w-full text-left text-xs text-slate-600">
                            <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200/80">
                                <tr>
                                    <th class="py-3 px-4">Tarix & Vaxt</th>
                                    <th class="py-3 px-4">Müştəri</th>
                                    <th class="py-3 px-4">Xidmət & Usta</th>
                                    <th class="py-3 px-4 text-right">Məbləğ & Müddət</th>
                                    <th class="py-3 px-4 text-center">Status</th>
                                    <th class="py-3 px-4 text-right">Əməliyyat</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${pageItems.map(b => {
                                    const isPending = b.status === 'Gözlənilir';
                                    const cleanDigits = this.getCleanPhoneDigits(b.phone);
                                    const normName = (b.clientName || '').trim().toLowerCase();
                                    const existingClient = allClients.find(c => {
                                        const cDigits = this.getCleanPhoneDigits(c.phone);
                                        if (cleanDigits && cDigits && cleanDigits === cDigits) return true;
                                        if (normName && (c.name || '').trim().toLowerCase() === normName) return true;
                                        return false;
                                    });

                                    return `
                                        <tr class="hover:bg-slate-50/70 transition ${isPending ? 'bg-amber-50/15' : ''}">
                                            <!-- Tarix & Vaxt -->
                                            <td data-label="Tarix & Vaxt" class="py-3 px-4 whitespace-nowrap">
                                                <div class="flex items-center gap-2.5">
                                                    <div class="w-8 h-8 rounded-xl ${isPending ? 'bg-amber-100/70 text-amber-900' : 'bg-slate-100 text-slate-600'} flex items-center justify-center shrink-0">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                                    </div>
                                                    <div>
                                                        <div class="font-bold text-slate-900 font-mono text-xs">${this.escapeHtml(b.date || '—')}</div>
                                                        <div class="text-[11px] text-slate-500 font-semibold font-mono">${this.escapeHtml(b.time || '—')}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <!-- Müştəri -->
                                            <td data-label="Müştəri" class="py-3 px-4">
                                                <div class="flex items-center gap-2.5">
                                                    <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                                                        ${this.escapeHtml((b.clientName || 'M').charAt(0))}
                                                    </div>
                                                    <div class="min-w-0">
                                                        <div class="font-bold text-slate-900 text-xs flex items-center gap-1.5 flex-wrap">
                                                            <span class="truncate">${this.escapeHtml(b.clientName || 'Adsız')}</span>
                                                            ${existingClient ? `
                                                                <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shrink-0">Mövcud</span>
                                                            ` : `
                                                                <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 shrink-0">Yeni</span>
                                                            `}
                                                        </div>
                                                        <div class="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                                            <a href="tel:${this.escapeHtml(b.phone || '')}" class="font-mono text-slate-600 hover:text-amber-600 font-medium transition">${this.escapeHtml(b.phone || '')}</a>
                                                            ${existingClient && (parseFloat(existingClient.depositBalance) > 0 || parseFloat(existingClient.cashbackBalance) > 0) ? `
                                                                <span class="text-emerald-700 font-semibold text-[10px]">Depozit: ${(parseFloat(existingClient.depositBalance) || 0).toFixed(2)} ₼</span>
                                                            ` : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <!-- Xidmət & Usta -->
                                            <td data-label="Xidmət & Usta" class="py-3 px-4">
                                                <div class="font-bold text-slate-900 text-xs line-clamp-1">${this.escapeHtml(b.service || '—')}</div>
                                                <div class="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                                    <span class="text-slate-400">Usta:</span>
                                                    <span class="font-semibold text-slate-700 truncate">${this.escapeHtml(b.masterName || 'İstənilən usta')}</span>
                                                </div>
                                                ${b.note ? `<div class="text-[10px] text-slate-400 italic truncate max-w-xs mt-0.5" title="${this.escapeHtml(b.note)}">Qeyd: ${this.escapeHtml(b.note)}</div>` : ''}
                                            </td>

                                            <!-- Məbləğ & Müddət -->
                                            <td data-label="Məbləğ & Müddət" class="py-3 px-4 text-right whitespace-nowrap">
                                                <div class="font-bold text-slate-900 font-mono text-xs">${b.price ? b.price + ' ₼' : '0.00 ₼'}</div>
                                                <div class="text-[11px] text-slate-400 font-medium">${b.durationMinutes || 30} dəq</div>
                                            </td>

                                            <!-- Status -->
                                            <td data-label="Status" class="py-3 px-4 text-center whitespace-nowrap">
                                                ${isPending ? `
                                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                                                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                                        Təsdiq gözləyir
                                                    </span>
                                                ` : (b.status === 'Təsdiqləndi' ? `
                                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Təsdiqlənib
                                                    </span>
                                                ` : `
                                                    <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                                                        ${this.escapeHtml(b.status || 'Gözlənilir')}
                                                    </span>
                                                `)}
                                                <div class="mt-0.5">
                                                    <span class="text-[10px] font-medium text-blue-600 bg-blue-50/70 px-1.5 py-0.2 rounded border border-blue-200/50">Onlayn qəbul</span>
                                                </div>
                                            </td>

                                            <!-- Əməliyyat -->
                                            <td data-label="Əməliyyat" class="py-3 px-4 text-right whitespace-nowrap">
                                                <div class="flex items-center justify-end gap-1.5">
                                                    ${isPending ? `
                                                        <button type="button" onclick="BusinessDashboardView.confirmOnlineBooking('${b.id}')" class="h-8 px-3 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs transition shadow-2xs cursor-pointer inline-flex items-center gap-1.5 active:scale-95">
                                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                            <span>Təsdiqlə</span>
                                                        </button>
                                                        <button type="button" onclick="BusinessDashboardView.openBookingModal('${b.id}')" class="h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer inline-flex items-center gap-1" title="Redaktə et">
                                                            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                                            <span>Redaktə</span>
                                                        </button>
                                                        <button type="button" onclick="BusinessDashboardView.rejectOnlineBooking('${b.id}')" class="h-8 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs transition cursor-pointer inline-flex items-center gap-1" title="İmtina et">
                                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                                            <span>İmtina</span>
                                                        </button>
                                                    ` : `
                                                        <span class="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold px-2.5 py-1 bg-emerald-50 rounded-xl border border-emerald-200/60">
                                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                            Cədvəldədir
                                                        </span>
                                                        <button type="button" onclick="BusinessDashboardView.openBookingModal('${b.id}')" class="h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer inline-flex items-center gap-1">
                                                            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                                            <span>Bax</span>
                                                        </button>
                                                    `}
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
                        totalItems: filtered.length,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        onPageChange: 'BusinessDashboardView.setPendingOnlinePage',
                        onPageSizeChange: 'BusinessDashboardView.setPendingOnlinePageSize',
                        itemName: 'müraciət'
                    })}
                `}

                <!-- ==========================================
                     MODAL: ONLINE BOOKINGS FILTER MODAL
                =========================================== -->
                <div id="bizPendingOnlineFilterModal" onclick="if(event.target === this) BusinessDashboardView.closePendingOnlineFilterModal()" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-fade">
                    <div class="bg-white border-t sm:border border-slate-200 rounded-t-[28px] sm:rounded-[28px] max-w-md w-full p-5 sm:p-7 shadow-2xl space-y-4 text-slate-800 max-h-[92vh] overflow-y-auto">
                        <div class="sm:hidden w-10 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2.5 shrink-0"></div>
                        
                        <!-- Clean Modal Header (GEMINI.md Rule 5: NO ICONS in modal headers) -->
                        ${ZeyvoUI.modalHeader({ title: "Müraciət filtrləri", description: "Status, tarix, mütəxəssis və sıralama meyarları", onClose: "BusinessDashboardView.closePendingOnlineFilterModal()" })}

                        <!-- Modal Filter Body -->
                        <div class="space-y-4 text-xs font-normal">
                            <!-- 1. Status Filter -->
                            <div class="space-y-2">
                                <label class="block text-slate-700 font-medium">Müraciət statusu</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <button type="button" id="poFilterStatusBtn_all" onclick="BusinessDashboardView.selectPendingOnlineFilterStatus('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                        <span class="text-[11px] font-semibold">Bütün statuslar</span>
                                    </button>
                                    <button type="button" id="poFilterStatusBtn_Gözlənilir" onclick="BusinessDashboardView.selectPendingOnlineFilterStatus('Gözlənilir')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                        <span class="text-[11px] font-semibold text-amber-700">Təsdiq gözləyir</span>
                                    </button>
                                    <button type="button" id="poFilterStatusBtn_Təsdiqləndi" onclick="BusinessDashboardView.selectPendingOnlineFilterStatus('Təsdiqləndi')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                        <span class="text-[11px] font-semibold text-emerald-700">Təsdiqlənib</span>
                                    </button>
                                    <button type="button" id="poFilterStatusBtn_Ləğv edildi" onclick="BusinessDashboardView.selectPendingOnlineFilterStatus('Ləğv edildi')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                        <span class="text-[11px] font-semibold text-rose-700">İmtina edilib</span>
                                    </button>
                                </div>
                            </div>

                            <!-- 2. Tarix / Dövr Filter -->
                            <div class="space-y-2">
                                <label class="block text-slate-700 font-medium">Tarix və dövr</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <button type="button" id="poFilterDateBtn_all" onclick="BusinessDashboardView.selectPendingOnlineFilterDate('all')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                        <span class="text-[11px] font-semibold">Bütün tarixlər</span>
                                    </button>
                                    <button type="button" id="poFilterDateBtn_today" onclick="BusinessDashboardView.selectPendingOnlineFilterDate('today')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                        <span class="text-[11px] font-semibold">Bugünkü</span>
                                    </button>
                                    <button type="button" id="poFilterDateBtn_tomorrow" onclick="BusinessDashboardView.selectPendingOnlineFilterDate('tomorrow')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                        <span class="text-[11px] font-semibold">Sabahkı</span>
                                    </button>
                                    <button type="button" id="poFilterDateBtn_this_week" onclick="BusinessDashboardView.selectPendingOnlineFilterDate('this_week')" class="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer font-medium">
                                        <span class="text-[11px] font-semibold">Bu həftə</span>
                                    </button>
                                </div>
                            </div>

                            <!-- 3. Mütəxəssis (Usta) -->
                            <div class="space-y-1.5">
                                <label class="block text-slate-700 font-medium">Təyin olunan mütəxəssis</label>
                                <div class="relative">
                                    <select id="poFilterMasterSelect" class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 outline-none appearance-none cursor-pointer focus:border-slate-900 focus:bg-white transition">
                                        <option value="all">Bütün mütəxəssislər</option>
                                        ${staffList.map(st => `
                                            <option value="${this.escapeHtml(st.name)}" ${this.pendingOnlineMasterFilter === st.name ? 'selected' : ''}>${this.escapeHtml(st.name)} (${this.escapeHtml(st.role || 'Usta')})</option>
                                        `).join('')}
                                    </select>
                                    <svg class="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>

                            <!-- 4. Sıralama -->
                            <div class="space-y-2">
                                <label class="block text-slate-700 font-medium">Sıralama qaydası</label>
                                <div class="space-y-1.5">
                                    <button type="button" id="poFilterSortBtn_date_asc" onclick="BusinessDashboardView.selectPendingOnlineFilterSort('date_asc')" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium">
                                        <span>Tarix və vaxt (ən tez birinci)</span>
                                    </button>
                                    <button type="button" id="poFilterSortBtn_date_desc" onclick="BusinessDashboardView.selectPendingOnlineFilterSort('date_desc')" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium">
                                        <span>Tarix və vaxt (ən son birinci)</span>
                                    </button>
                                    <button type="button" id="poFilterSortBtn_price_desc" onclick="BusinessDashboardView.selectPendingOnlineFilterSort('price_desc')" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium">
                                        <span>Məbləğ (yüksəkdən aşağıya)</span>
                                    </button>
                                    <button type="button" id="poFilterSortBtn_name_asc" onclick="BusinessDashboardView.selectPendingOnlineFilterSort('name_asc')" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-between text-left transition cursor-pointer font-medium">
                                        <span>Müştəri adı (A-Z)</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Modal Actions Footer -->
                        <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                            <button type="button" onclick="BusinessDashboardView.resetPendingOnlineModalFilters()" class="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold transition cursor-pointer">
                                Sıfırla
                            </button>
                            <div class="flex items-center gap-2">
                                ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closePendingOnlineFilterModal()", size: "md", type: "button" })}
                                ${ZeyvoUI.button({ label: "Tətbiq et", onClick: "BusinessDashboardView.applyPendingOnlineFilterModal()", size: "md", type: "button" })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // 4. JOURNAL TABLE LIST VIEW
    renderCalendarJournalList: function(bookings) {
        let filtered = bookings;
        if (this.calendarStatusFilter !== 'all') {
            filtered = filtered.filter(b => b.status === this.calendarStatusFilter);
        }
        if (this.calendarSearchQuery) {
            const q = this.calendarSearchQuery.toLowerCase();
            filtered = filtered.filter(b => (b.clientName && b.clientName.toLowerCase().includes(q)) || (b.phone && b.phone.includes(q)) || (b.service && b.service.toLowerCase().includes(q)));
        }

        const pageSize = this.calendarPageSize || 10;
        const totalPages = Math.ceil(filtered.length / pageSize) || 1;
        const currentPage = Math.min(this.calendarPage || 1, totalPages);
        const startIndex = (currentPage - 1) * pageSize;
        const pageItems = filtered.slice(startIndex, startIndex + pageSize);

        return `
            <div class="p-4 sm:p-5 space-y-4">
                <!-- Search & Filters -->
                <div class="flex items-center justify-between gap-3 flex-wrap">
                    <div class="relative flex-1 min-w-[240px]">
                        <input type="text" placeholder="Müştəri adı, telefon və ya xidmət üzrə axtarış..." value="${this.calendarSearchQuery || ''}" oninput="BusinessDashboardView.calendarSearchQuery = this.value; BusinessDashboardView.refreshCalendar();" class="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-400 transition" />
                        <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    </div>

                    <div class="flex items-center gap-2">
                        <select onchange="BusinessDashboardView.setCalendarStatusFilter(this.value)" class="h-9 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700">
                            <option value="all">Bütün statuslar</option>
                            <option value="Təsdiqləndi" ${this.calendarStatusFilter === 'Təsdiqləndi' ? 'selected' : ''}>Təsdiqləndi</option>
                            <option value="Gözlənilir" ${this.calendarStatusFilter === 'Gözlənilir' ? 'selected' : ''}>Gözlənilir</option>
                            <option value="Tamamlandı" ${this.calendarStatusFilter === 'Tamamlandı' ? 'selected' : ''}>Tamamlandı</option>
                            <option value="Ləğv edildi" ${this.calendarStatusFilter === 'Ləğv edildi' ? 'selected' : ''}>Ləğv edildi</option>
                        </select>
                    </div>
                </div>

                <!-- Table -->
                <div class="overflow-x-auto rounded-xl border border-slate-200/80">
                    <table class="w-full text-left text-xs text-slate-600">
                        <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200/80">
                            <tr>
                                <th class="py-3 px-4">Tarix & Vaxt</th>
                                <th class="py-3 px-4">Müştəri</th>
                                <th class="py-3 px-4">Xidmət</th>
                                <th class="py-3 px-4">Mütəxəssis</th>
                                <th class="py-3 px-4 text-right">Qiymət</th>
                                <th class="py-3 px-4 text-center">Status</th>
                                <th class="py-3 px-4 text-right">Əməliyyat</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${pageItems.length === 0 ? `
                                <tr>
                                    <td colspan="7" class="py-8 text-center text-slate-400 italic">Heç bir qəbul qeydi tapılmadı</td>
                                </tr>
                            ` : pageItems.map(b => `
                                <tr class="hover:bg-slate-50/60 transition">
                                    <td class="py-3 px-4 font-mono font-medium text-slate-800 whitespace-nowrap">
                                        ${b.date || b.day || '—'} <span class="text-slate-400 font-normal">(${b.time || '—'})</span>
                                    </td>
                                    <td class="py-3 px-4">
                                        <div class="font-bold text-slate-900">${b.clientName}</div>
                                        <div class="text-[11px] text-slate-400 font-mono">${b.phone || ''}</div>
                                    </td>
                                    <td class="py-3 px-4 font-medium text-slate-800">${b.service || '—'}</td>
                                    <td class="py-3 px-4 text-slate-700">${b.masterName || b.masterKey || 'Təyin edilməyib'}</td>
                                    <td class="py-3 px-4 text-right font-mono font-bold text-slate-900">${b.price ? b.price + ' ₼' : '0.00 ₼'}</td>
                                    <td class="py-3 px-4 text-center">
                                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${b.status === 'Tamamlandı' ? 'bg-emerald-100 text-emerald-800' : (b.status === 'Gözlənilir' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700')}">
                                            ${b.status || 'Təsdiqləndi'}
                                        </span>
                                    </td>
                                    <td class="py-3 px-4 text-right whitespace-nowrap">
                                        <div class="flex items-center justify-end gap-1.5">
                                            <button type="button" onclick="BusinessDashboardView.openBookingModal('${b.id}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">
                                                Bax / Redaktə
                                            </button>
                                            <button type="button" onclick="BusinessDashboardView.deleteBooking('${b.id}')" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sil">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                ${this.renderTablePagination({
                    totalItems: filtered.length,
                    currentPage: currentPage,
                    pageSize: pageSize,
                    onPageChange: 'BusinessDashboardView.setCalendarPage',
                    onPageSizeChange: 'BusinessDashboardView.setCalendarPageSize',
                    itemName: 'qəbul'
                })}
            </div>
        `;
    },

    setCalendarPage: function(p) {
        this.calendarPage = p;
        this.refreshCalendar();
    },

    setCalendarPageSize: function(s) {
        this.calendarPageSize = parseInt(s) || 10;
        this.calendarPage = 1;
        this.refreshCalendar();
    },

    // ==========================================
    // UNIFIED BOOKING MODAL (NEW & EDIT / CHECKOUT)
    // ==========================================
    openBookingModal: function(bookingId = null, defaultDate = null, defaultTime = null, defaultMasterId = null, defaultClient = null) {
        this.bookingEditingId = bookingId;
        const modal = document.getElementById('bizNewBookingModal');
        const container = document.getElementById('bizBookingModalContainer');
        if (!modal || !container) return;

        const bookings = this.getBookings();
        const booking = bookingId ? bookings.find(b => b.id === bookingId) : null;

        container.innerHTML = this.renderBookingModalHtml(booking, defaultDate, defaultTime, defaultMasterId, defaultClient);
        modal.classList.remove('hidden');
        this.checkBookingConflictRealtime();
    },

    closeBookingModal: function() {
        const modal = document.getElementById('bizNewBookingModal');
        if (modal) modal.classList.add('hidden');
        this.bookingEditingId = null;
    },

    openEventDetails: function(id) {
        this.openBookingModal(id);
    },

    closeEventDetails: function() {
        this.closeBookingModal();
    },

    openNewBookingModal: function(date, time, client = null, masterId = null) {
        this.openBookingModal(null, date, time, masterId, client);
    },

    closeNewBookingModal: function() {
        this.closeBookingModal();
    },

    deleteBooking: function(id) {
        if (!confirm('Bu qəbul qeydini silmək istədiyinizdən əminsiniz?')) return;
        let bookings = this.getBookings();
        const booking = bookings.find(b => b.id === id);
        if (booking && booking.source === 'online') booking.status = 'Ləğv edildi';
        else bookings = bookings.filter(b => b.id !== id);
        this.saveBookings(bookings);
        this.closeBookingModal();
        this.refreshCalendar();
        if (typeof App !== 'undefined') App.showToast('Qəbul uğurla silindi');
    },

    deleteEvent: function(id) {
        this.deleteBooking(id);
    },

    renderBookingModalHtml: function(booking, defaultDate, defaultTime, defaultMasterId, defaultClient = null) {
        const isEdit = !!booking;
        const allClients = this.getClientsData();
        const services = this.getServices ? this.getServices() : [];
        const staffList = this.getStaffList ? this.getStaffList() : [];
        const resources = this.getResources ? this.getResources() : [];

        const curDate = booking ? (booking.date || booking.day || '') : (defaultDate || this.calendarSelectedDate || new Date().toISOString().split('T')[0]);
        const curTime = booking ? (booking.time ? booking.time.split(' – ')[0] : '10:00') : (defaultTime || '10:00');
        const curDuration = booking ? (booking.durationMinutes || (booking.durationHours ? booking.durationHours * 60 : 30)) : 30;
        const curMasterId = booking ? (booking.masterId || booking.masterKey || '') : (defaultMasterId || (staffList[0] ? staffList[0].id : ''));
        const curPrice = booking ? (booking.price || 0) : (services[0] ? (services[0].price || 0) : 0);
        const curStatus = booking ? (booking.status || 'Təsdiqləndi') : 'Təsdiqləndi';
        const curPaymentMethod = booking ? (booking.paymentMethod || 'cash') : 'cash';
        const defaultTheme = booking ? this.getBookingColorTheme(booking) : null;
        const curColor = booking ? (booking.color || (defaultTheme ? defaultTheme.key : 'yellow')) : 'yellow';

        // Find linked client if exists
        let client = defaultClient || null;
        if (!client && booking) {
            const cleanDigits = this.getCleanPhoneDigits(booking.phone);
            const normName = (booking.clientName || '').trim().toLowerCase();
            client = allClients.find(c => {
                const cDigits = this.getCleanPhoneDigits(c.phone);
                if (cleanDigits && cDigits && cleanDigits === cDigits) return true;
                if (normName && (c.name || '').trim().toLowerCase() === normName) return true;
                return false;
            });
        }

        // Determine initial client mode: 'existing' vs 'new'
        let initialClientMode = 'existing';
        if (booking && !client) {
            initialClientMode = 'new';
        } else if (!booking && allClients.length === 0) {
            initialClientMode = 'new';
        }
        this.bookingClientMode = initialClientMode;

        const clientDeposit = client ? (parseFloat(client.depositBalance) || 0) : 0;
        const clientCashback = client ? (parseFloat(client.cashbackBalance) || 0) : 0;

        // Generate Time Select Options (08:00 to 21:30)
        const timeOptions = [];
        for (let h = 8; h <= 21; h++) {
            const hh = h.toString().padStart(2, '0');
            timeOptions.push(`${hh}:00`, `${hh}:15`, `${hh}:30`, `${hh}:45`);
        }

        // Group services by category if possible
        const serviceCategories = {};
        services.forEach(s => {
            const cat = s.categoryName || s.category || 'Xidmətlər';
            if (!serviceCategories[cat]) serviceCategories[cat] = [];
            serviceCategories[cat].push(s);
        });

        return `
            <!-- CLEAN MODAL HEADER (No icon container, plain h3 and p) -->
            ${ZeyvoUI.modalHeader({ title: isEdit ? 'Qəbul məlumatları və idarəetmə' : 'Yeni qəbul əlavə et', description: isEdit ? ((booking.clientName || 'Müştəri') + ' • ' + curDate) : 'Müştəri, xidmət və vaxt detallarını daxil edin', onClose: 'BusinessDashboardView.closeBookingModal()' })}

            <!-- FORM BODY -->
            <form onsubmit="BusinessDashboardView.handleSaveBooking(event)" class="space-y-4 pt-1 text-xs">
                <!-- 1. Client Selection (Mövcud müştəri və ya Yeni müştəri) -->
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                    <div class="flex items-center justify-between">
                        <label class="font-bold text-slate-800 text-xs">Müştəri *</label>
                        <!-- Segmented Switcher for Client Mode -->
                        <div class="inline-flex bg-slate-200/80 p-0.5 rounded-lg text-[11px] font-semibold">
                            <button type="button" id="bmClientTabExisting" onclick="BusinessDashboardView.setBookingClientMode('existing')" class="px-2.5 py-1 rounded-md transition cursor-pointer ${initialClientMode === 'existing' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900 font-semibold'}">
                                Mövcud müştəri
                            </button>
                            <button type="button" id="bmClientTabNew" onclick="BusinessDashboardView.setBookingClientMode('new')" class="px-2.5 py-1 rounded-md transition cursor-pointer ${initialClientMode === 'new' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900 font-semibold'}">
                                + Yeni müştəri
                            </button>
                        </div>
                    </div>

                    <!-- Mode A: Existing Client Selection Dropdown -->
                    <div id="bmExistingClientContainer" class="${initialClientMode === 'existing' ? '' : 'hidden'} space-y-2">
                        <select id="bmClientSelect" onchange="BusinessDashboardView.onSelectBookingClient(this.value)" class="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 outline-none focus:border-amber-400 cursor-pointer text-xs">
                            <option value="">-- Siyahıdan müştəri seçin (${allClients.length} müştəri) --</option>
                            ${allClients.map(c => {
                                const isSel = client && (client.id === c.id || (client.name === c.name && client.phone === c.phone));
                                return `<option value="${c.id}" ${isSel ? 'selected' : ''}>${c.name} — ${c.phone || 'Nömrəsiz'} (Ziyarət: ${c.totalVisits || 0})</option>`;
                            }).join('')}
                        </select>

                        <!-- Selected Client Quick Info Card -->
                        <div id="bmSelectedClientCard" class="${client ? '' : 'hidden'} flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/90 text-[11px]">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span id="bmSelectedClientPhoneBadge" class="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">${client ? (client.phone || 'Nömrəsiz') : ''}</span>
                                <span id="bmSelectedClientDepositBadge" class="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">Depozit: ${clientDeposit.toFixed(2)} ₼</span>
                                <span id="bmSelectedClientCashbackBadge" class="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">Keşbek: ${clientCashback.toFixed(2)} ₼</span>
                            </div>
                            <button type="button" onclick="BusinessDashboardView.openClientModalFromBooking()" class="text-slate-500 hover:text-slate-900 font-semibold underline cursor-pointer text-[11px]">
                                Profilə bax
                            </button>
                        </div>
                    </div>

                    <!-- Mode B: New Client Inputs -->
                    <div id="bmNewClientContainer" class="${initialClientMode === 'new' ? '' : 'hidden'} space-y-2">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                                <label class="block text-[11px] font-semibold text-slate-600 mb-1">Müştərinin adı və soyadı *</label>
                                <input id="bmNewClientName" type="text" placeholder="Məs: Aysel Məmmədova" value="${booking && !client ? (booking.clientName || '') : ''}" oninput="BusinessDashboardView.syncClientInputs()" class="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 outline-none focus:border-amber-400 text-xs" />
                            </div>
                            ${ZeyvoUI.phoneField({ id: 'bmNewClientPhone', label: 'Əlaqə nömrəsi', value: booking && !client ? (booking.phone || '') : '', required: true, onInput: 'BusinessDashboardView.syncClientInputs()' })}
                        </div>
                        <p class="text-[11px] text-slate-500">Yeni müştəri avtomatik olaraq müştərilər bazasına əlavə olunacaq.</p>
                    </div>

                    <!-- Hidden inputs preserving values for form submission -->
                    <input type="hidden" id="bmClientName" value="${booking ? (booking.clientName || '') : (client ? client.name : '')}" />
                    <input type="hidden" id="bmClientPhone" value="${booking ? (booking.phone || '') : (client ? client.phone : '')}" />
                </div>

                <!-- 2. Service & Master Selection (Clean native selects without duplicate overlay arrows) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="space-y-1">
                        <label class="font-semibold text-slate-700">Xidmət *</label>
                        <select id="bmServiceId" onchange="BusinessDashboardView.onBookingServiceChanged(this.value)" class="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 outline-none focus:border-amber-400 cursor-pointer">
                            <option value="">-- Xidmət seçin --</option>
                            ${Object.keys(serviceCategories).length > 1 ? `
                                ${Object.keys(serviceCategories).map(catName => `
                                    <optgroup label="${catName}">
                                        ${serviceCategories[catName].map(s => {
                                            const isSel = booking && (booking.serviceId === s.id || booking.service === s.name);
                                            return `<option value="${s.id}" data-price="${s.price || 0}" data-duration="${s.duration || s.durationMinutes || 30}" ${isSel ? 'selected' : ''}>${s.name} — ${s.price || 0} ₼ (${s.duration || s.durationMinutes || 30} dəq)</option>`;
                                        }).join('')}
                                    </optgroup>
                                `).join('')}
                            ` : `
                                ${services.map(s => {
                                    const isSel = booking && (booking.serviceId === s.id || booking.service === s.name);
                                    return `<option value="${s.id}" data-price="${s.price || 0}" data-duration="${s.duration || s.durationMinutes || 30}" ${isSel ? 'selected' : ''}>${s.name} — ${s.price || 0} ₼ (${s.duration || s.durationMinutes || 30} dəq)</option>`;
                                }).join('')}
                            `}
                        </select>
                    </div>

                    <div class="space-y-1">
                        <label class="font-semibold text-slate-700">Mütəxəssis (Usta) *</label>
                        <select id="bmMasterId" onchange="BusinessDashboardView.updateBookingEndTimeBadge()" class="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 outline-none focus:border-amber-400 cursor-pointer">
                            ${staffList.map(m => {
                                const isSel = curMasterId === m.id || curMasterId === m.key;
                                return `<option value="${m.id}" ${isSel ? 'selected' : ''}>${m.name} (${m.role || 'Usta'})</option>`;
                            }).join('')}
                        </select>
                    </div>
                </div>

                <!-- 3. Date, Time & Duration -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div class="space-y-1">
                        <label class="font-semibold text-slate-700">Tarix *</label>
                        <input id="bmDate" type="date" required value="${curDate}" onchange="BusinessDashboardView.updateBookingEndTimeBadge()" class="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 outline-none focus:border-amber-400" />
                    </div>

                    <div class="space-y-1">
                        <label class="font-semibold text-slate-700">Başlama vaxtı *</label>
                        <select id="bmTime" onchange="BusinessDashboardView.updateBookingEndTimeBadge()" class="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 outline-none focus:border-amber-400 cursor-pointer">
                            ${timeOptions.map(t => `<option value="${t}" ${t === curTime ? 'selected' : ''}>${t}</option>`).join('')}
                        </select>
                    </div>

                    <div class="space-y-1">
                        <label class="font-semibold text-slate-700">Müddət (dəq)</label>
                        <select id="bmDuration" onchange="BusinessDashboardView.updateBookingEndTimeBadge()" class="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 outline-none focus:border-amber-400 cursor-pointer">
                            <option value="15" ${curDuration === 15 ? 'selected' : ''}>15 dəq</option>
                            <option value="30" ${curDuration === 30 ? 'selected' : ''}>30 dəq</option>
                            <option value="45" ${curDuration === 45 ? 'selected' : ''}>45 dəq</option>
                            <option value="60" ${curDuration === 60 ? 'selected' : ''}>1 saat (60 dəq)</option>
                            <option value="90" ${curDuration === 90 ? 'selected' : ''}>1.5 saat (90 dəq)</option>
                            <option value="120" ${curDuration === 120 ? 'selected' : ''}>2 saat (120 dəq)</option>
                            <option value="180" ${curDuration === 180 ? 'selected' : ''}>3 saat (180 dəq)</option>
                        </select>
                    </div>
                </div>

                <!-- 3.1 Real-time Collision Warning Banner -->
                <div id="bmConflictWarning" class="hidden p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold"></div>

                <!-- 4. Price & Status -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="space-y-1">
                        <label class="font-semibold text-slate-700">Məbləğ (₼) *</label>
                        <input id="bmPrice" type="number" step="0.5" required value="${curPrice}" class="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-bold font-mono text-slate-900 outline-none focus:border-amber-400" />
                    </div>

                    <div class="space-y-1">
                        <label class="font-semibold text-slate-700">Qəbul statusu</label>
                        <select id="bmStatus" onchange="BusinessDashboardView.onBookingStatusChanged(this.value)" class="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900 outline-none focus:border-amber-400 cursor-pointer">
                            <option value="Təsdiqləndi" ${curStatus === 'Təsdiqləndi' ? 'selected' : ''}>Təsdiqləndi</option>
                            <option value="Gözlənilir" ${curStatus === 'Gözlənilir' ? 'selected' : ''}>Gözlənilir</option>
                            <option value="Gəldi" ${curStatus === 'Gəldi' ? 'selected' : ''}>Gəldi (Salondadır)</option>
                            <option value="Xidmət göstərilir" ${curStatus === 'Xidmət göstərilir' ? 'selected' : ''}>Xidmət göstərilir</option>
                            <option value="Tamamlandı" ${curStatus === 'Tamamlandı' ? 'selected' : ''}>Tamamlandı</option>
                            <option value="Gəlmədi" ${curStatus === 'Gəlmədi' ? 'selected' : ''}>Gəlmədi</option>
                            <option value="Ləğv edildi" ${curStatus === 'Ləğv edildi' ? 'selected' : ''}>Ləğv edildi</option>
                        </select>
                    </div>
                </div>

                <input type="hidden" id="bmColor" value="${curColor}" />

                <!-- 5. Payment Checkout Section (Shown on edit or when status is Tamamlandı) -->
                ${(!isEdit && curStatus !== 'Tamamlandı') ? `
                    <div id="bmCheckoutNotice" class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600">
                        <span>Ödəniş qəbul tamamlandıqda qeyd edilir</span>
                        <button type="button" onclick="BusinessDashboardView.toggleBookingCheckoutSection()" class="text-amber-700 hover:text-amber-800 font-semibold underline cursor-pointer">
                            İndi ödəniş qeyd et
                        </button>
                    </div>
                ` : ''}

                <div id="bmCheckoutSection" class="${(isEdit || curStatus === 'Tamamlandı') ? '' : 'hidden'} p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-800">Ödəniş üsulu</span>
                        <span class="text-[11px] text-slate-500 font-medium">Hesablaşma kanalı</span>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <label class="cursor-pointer">
                            <input type="radio" name="bmPaymentMethod" value="cash" ${(curPaymentMethod === 'cash' || !curPaymentMethod) ? 'checked' : ''} class="peer sr-only" />
                            <div class="p-2.5 rounded-xl border border-slate-200 bg-white peer-checked:border-amber-400 peer-checked:bg-amber-50/50 text-center transition font-semibold text-slate-800 shadow-2xs">
                                Nağd
                            </div>
                        </label>

                        <label class="cursor-pointer">
                            <input type="radio" name="bmPaymentMethod" value="terminal" ${curPaymentMethod === 'terminal' ? 'checked' : ''} class="peer sr-only" />
                            <div class="p-2.5 rounded-xl border border-slate-200 bg-white peer-checked:border-amber-400 peer-checked:bg-amber-50/50 text-center transition font-semibold text-slate-800 shadow-2xs">
                                POS-Terminal
                            </div>
                        </label>

                        <label class="cursor-pointer">
                            <input type="radio" name="bmPaymentMethod" value="deposit" ${curPaymentMethod === 'deposit' ? 'checked' : ''} class="peer sr-only" />
                            <div class="p-2.5 rounded-xl border border-slate-200 bg-white peer-checked:border-amber-400 peer-checked:bg-amber-50/50 text-center transition font-semibold text-slate-800 shadow-2xs">
                                Depozit
                            </div>
                        </label>

                        <label class="cursor-pointer">
                            <input type="radio" name="bmPaymentMethod" value="bonus" ${curPaymentMethod === 'bonus' ? 'checked' : ''} class="peer sr-only" />
                            <div class="p-2.5 rounded-xl border border-slate-200 bg-white peer-checked:border-amber-400 peer-checked:bg-amber-50/50 text-center transition font-semibold text-slate-800 shadow-2xs">
                                Keşbek / Bonus
                            </div>
                        </label>
                    </div>
                </div>

                <!-- 6. Notes -->
                <div class="space-y-1">
                    <label class="font-semibold text-slate-700">Qeyd və şərhlər</label>
                    <textarea id="bmNotes" rows="2" placeholder="Xüsusi istəklər, allergiyalar və ya qeydlər..." class="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:border-amber-400 text-xs text-slate-800 outline-none transition">${booking ? (booking.note || '') : ''}</textarea>
                </div>

                <!-- FOOTER ACTIONS -->
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                    <div>
                        ${isEdit ? `
                            <button type="button" onclick="BusinessDashboardView.deleteBooking('${booking.id}')" class="px-3.5 h-10 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold transition cursor-pointer">
                                Sil
                            </button>
                        ` : `
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closeBookingModal()", size: "md", type: "button" })}
                        `}
                    </div>

                    <div class="flex items-center gap-2">
                        ${isEdit && client ? `
                            <button type="button" onclick="BusinessDashboardView.openClientModalFromBooking('${this.escapeHtml(booking.clientName)}', '${this.escapeHtml(booking.phone)}')" class="px-3.5 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <span>Müştəri kartı</span>
                            </button>
                        ` : ''}

                        ${isEdit && curStatus !== 'Tamamlandı' ? `
                            <button type="button" onclick="BusinessDashboardView.quickCompleteCurrentBooking()" class="px-4 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-2xs cursor-pointer active:scale-95 flex items-center gap-1.5">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                <span>Tamamla</span>
                            </button>
                        ` : ''}

                        <button type="submit" id="bmSubmitBtn" class="px-5 h-10 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold transition shadow-2xs cursor-pointer active:scale-95">
                            ${isEdit ? 'Yadda saxla' : 'Qəbula əlavə et'}
                        </button>
                    </div>
                </div>
            </form>
        `;
    },

    setBookingColor: function(colorKey) {
        const inp = document.getElementById('bmColor');
        if (inp) inp.value = colorKey;
        const btns = document.querySelectorAll('.bm-color-btn');
        btns.forEach(btn => {
            const c = btn.getAttribute('data-color');
            if (c === colorKey) {
                btn.className = 'bm-color-btn relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-900 bg-white ring-2 ring-amber-500 text-slate-900 shadow-2xs font-bold transition cursor-pointer';
            } else {
                btn.className = 'bm-color-btn relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white/80 hover:bg-white text-slate-600 font-semibold transition cursor-pointer';
            }
        });
    },

    bookingClientMode: 'existing',

    setBookingClientMode: function(mode) {
        this.bookingClientMode = mode;
        const existCont = document.getElementById('bmExistingClientContainer');
        const newCont = document.getElementById('bmNewClientContainer');
        const tabExist = document.getElementById('bmClientTabExisting');
        const tabNew = document.getElementById('bmClientTabNew');

        if (mode === 'existing') {
            if (existCont) existCont.classList.remove('hidden');
            if (newCont) newCont.classList.add('hidden');
            if (tabExist) {
                tabExist.className = 'px-2.5 py-1 rounded-md transition cursor-pointer bg-white text-slate-900 shadow-2xs font-bold';
            }
            if (tabNew) {
                tabNew.className = 'px-2.5 py-1 rounded-md transition cursor-pointer text-slate-600 hover:text-slate-900 font-semibold';
            }
            const sel = document.getElementById('bmClientSelect');
            if (sel) this.onSelectBookingClient(sel.value);
        } else {
            if (existCont) existCont.classList.add('hidden');
            if (newCont) newCont.classList.remove('hidden');
            if (tabNew) {
                tabNew.className = 'px-2.5 py-1 rounded-md transition cursor-pointer bg-white text-slate-900 shadow-2xs font-bold';
            }
            if (tabExist) {
                tabExist.className = 'px-2.5 py-1 rounded-md transition cursor-pointer text-slate-600 hover:text-slate-900 font-semibold';
            }
            this.syncClientInputs();
        }
    },

    onSelectBookingClient: function(clientId) {
        const allClients = this.getClientsData();
        const client = allClients.find(c => c.id === clientId);
        const nameHidden = document.getElementById('bmClientName');
        const phoneHidden = document.getElementById('bmClientPhone');
        const card = document.getElementById('bmSelectedClientCard');
        const phoneBadge = document.getElementById('bmSelectedClientPhoneBadge');
        const depBadge = document.getElementById('bmSelectedClientDepositBadge');
        const cbBadge = document.getElementById('bmSelectedClientCashbackBadge');

        if (client) {
            if (nameHidden) nameHidden.value = client.name;
            if (phoneHidden) phoneHidden.value = client.phone || '';
            if (card) card.classList.remove('hidden');
            if (phoneBadge) phoneBadge.textContent = client.phone || 'Nömrəsiz';
            if (depBadge) depBadge.textContent = `Depozit: ${(parseFloat(client.depositBalance) || 0).toFixed(2)} ₼`;
            if (cbBadge) cbBadge.textContent = `Keşbek: ${(parseFloat(client.cashbackBalance) || 0).toFixed(2)} ₼`;
        } else {
            if (nameHidden) nameHidden.value = '';
            if (phoneHidden) phoneHidden.value = '';
            if (card) card.classList.add('hidden');
        }
    },

    syncClientInputs: function() {
        if (this.bookingClientMode !== 'new') return;
        const newName = document.getElementById('bmNewClientName');
        const newPhone = document.getElementById('bmNewClientPhone');
        const nameHidden = document.getElementById('bmClientName');
        const phoneHidden = document.getElementById('bmClientPhone');
        if (nameHidden && newName) nameHidden.value = newName.value.trim();
        if (newPhone && window.App?.formatAzPhone) window.App.formatAzPhone(newPhone);
        if (phoneHidden && newPhone) {
            const digits = window.App?.getCleanAzPhone ? window.App.getCleanAzPhone(newPhone.value) : newPhone.value.replace(/\D/g, '').slice(-9);
            phoneHidden.value = digits ? `+994 ${window.App?.formatDisplayAzPhone ? window.App.formatDisplayAzPhone(digits) : newPhone.value.trim()}` : '';
        }
    },

    openClientModalFromBooking: function(clientName = null, clientPhone = null) {
        const nameVal = clientName || (document.getElementById('bmClientName') ? document.getElementById('bmClientName').value : '');
        const phoneVal = clientPhone || (document.getElementById('bmClientPhone') ? document.getElementById('bmClientPhone').value : '');
        const allClients = this.getClientsData();
        const cleanDigits = this.getCleanPhoneDigits(phoneVal);
        const normName = (nameVal || '').trim().toLowerCase();
        const client = allClients.find(c => {
            const cDigits = this.getCleanPhoneDigits(c.phone);
            if (cleanDigits && cDigits && cleanDigits === cDigits) return true;
            if (normName && (c.name || '').trim().toLowerCase() === normName) return true;
            return false;
        });
        if (client && this.openClientModal) {
            this.closeBookingModal();
            this.openClientModal(client.id, 'info');
        } else {
            if (typeof App !== 'undefined') App.showToast('Bu müştəri üçün kart tapılmadı');
        }
    },

    onBookingClientNameChanged: function(nameVal) {
        if (!nameVal) return;
        const allClients = this.getClientsData();
        const matched = allClients.find(c => c.name.toLowerCase() === nameVal.toLowerCase());
        if (matched) {
            const phoneInp = document.getElementById('bmClientPhone');
            if (phoneInp && !phoneInp.value) phoneInp.value = matched.phone || '';
        }
    },

    onBookingServiceChanged: function(serviceId) {
        const services = this.getServices ? this.getServices() : [];
        const srv = services.find(s => s.id === serviceId);
        if (!srv) return;

        const priceEl = document.getElementById('bmPrice');
        if (priceEl) priceEl.value = srv.price || 0;

        const durEl = document.getElementById('bmDuration');
        if (durEl) {
            const dur = srv.duration || srv.durationMinutes || 30;
            durEl.value = dur;
            if (!durEl.value) {
                const opt = document.createElement('option');
                opt.value = dur;
                opt.textContent = `${dur} dəq`;
                opt.selected = true;
                durEl.appendChild(opt);
            }
        }
        this.updateBookingEndTimeBadge();
    },

    updateBookingEndTimeBadge: function() {
        this.checkBookingConflictRealtime();
    },

    onBookingStatusChanged: function(st) {
        const checkoutSec = document.getElementById('bmCheckoutSection');
        const checkoutNotice = document.getElementById('bmCheckoutNotice');
        if (checkoutSec) {
            if (st === 'Tamamlandı') {
                checkoutSec.classList.remove('hidden');
                if (checkoutNotice) checkoutNotice.classList.add('hidden');
            } else if (!this.bookingEditingId) {
                checkoutSec.classList.add('hidden');
                if (checkoutNotice) checkoutNotice.classList.remove('hidden');
            }
        }
    },

    toggleBookingCheckoutSection: function() {
        const checkoutSec = document.getElementById('bmCheckoutSection');
        const checkoutNotice = document.getElementById('bmCheckoutNotice');
        if (checkoutSec) {
            checkoutSec.classList.toggle('hidden');
            if (checkoutNotice) checkoutNotice.classList.toggle('hidden');
        }
    },

    handleSaveBooking: function(e) {
        if (e && e.preventDefault) e.preventDefault();

        const nameInp = document.getElementById('bmClientName');
        const phoneInp = document.getElementById('bmClientPhone');
        const newNameInp = document.getElementById('bmNewClientName');
        const newPhoneInp = document.getElementById('bmNewClientPhone');
        const srvSelect = document.getElementById('bmServiceId');
        const masterSelect = document.getElementById('bmMasterId');
        const dateInput = document.getElementById('bmDate');
        const timeSelect = document.getElementById('bmTime');
        const durSelect = document.getElementById('bmDuration');
        const priceInp = document.getElementById('bmPrice');
        const statusSelect = document.getElementById('bmStatus');
        const notesInp = document.getElementById('bmNotes');

        let clientName = (nameInp ? nameInp.value.trim() : '') || (newNameInp ? newNameInp.value.trim() : '');
        let phone = (phoneInp ? phoneInp.value.trim() : '') || (newPhoneInp ? newPhoneInp.value.trim() : '');

        // If in existing mode and client select has value, ensure client data matches
        const allClients = this.getClientsData();
        if (this.bookingClientMode === 'existing') {
            const clientSel = document.getElementById('bmClientSelect');
            if (clientSel && clientSel.value) {
                const cObj = allClients.find(c => c.id === clientSel.value);
                if (cObj) {
                    clientName = cObj.name;
                    phone = cObj.phone || '';
                }
            }
        }

        const serviceId = srvSelect ? srvSelect.value : '';
        const masterId = masterSelect ? masterSelect.value : '';
        const date = dateInput ? dateInput.value : this.calendarSelectedDate;
        const time = timeSelect ? timeSelect.value : '10:00';
        const duration = durSelect ? parseInt(durSelect.value) || 30 : 30;
        const price = priceInp ? parseFloat(priceInp.value) || 0 : 0;
        const status = statusSelect ? statusSelect.value : 'Təsdiqləndi';
        const notes = notesInp ? notesInp.value.trim() : '';
        const colorInp = document.getElementById('bmColor');
        const color = colorInp ? colorInp.value : 'yellow';

        // Selected payment method radio
        const payMethodEl = document.querySelector('input[name="bmPaymentMethod"]:checked');
        const paymentMethod = payMethodEl ? payMethodEl.value : 'cash';

        if (!clientName || !phone) {
            if (typeof App !== 'undefined') App.showToast('Zəhmət olmasa müştərini seçin və ya yeni müştəri məlumatlarını daxil edin');
            return;
        }

        // Auto-register client in clients database if not present yet
        const cleanDigits = this.getCleanPhoneDigits(phone);
        const normName = clientName.trim().toLowerCase();
        let existingClient = allClients.find(c => {
            const cDigits = this.getCleanPhoneDigits(c.phone);
            if (cleanDigits && cDigits && cleanDigits === cDigits) return true;
            if (normName && (c.name || '').trim().toLowerCase() === normName) return true;
            return false;
        });

        if (!existingClient) {
            existingClient = {
                id: 'c_' + Date.now(),
                name: clientName,
                phone: phone,
                category: 'normal',
                depositBalance: 0,
                cashbackBalance: 0,
                totalVisits: 0,
                totalSpent: 0,
                history: [],
                createdAt: new Date().toISOString()
            };
        }

        const services = this.getServices ? this.getServices() : [];
        const staffList = this.getStaffList ? this.getStaffList() : [];
        const srvObj = services.find(s => s.id === serviceId);
        const masterObj = staffList.find(m => m.id === masterId);

        // Conflict check: strictly prevent recording two sessions at the same time for the same master!
        const conflict = this.findBookingTimeConflict(masterId, date, time, duration, this.bookingEditingId);
        if (conflict) {
            if (typeof App !== 'undefined') {
                App.showToast(`Xəta: ${conflict.masterName} üçün ${conflict.timeRange} saatında artıq qəbul var (${conflict.clientName}). Bir vaxta iki qəbul yazmaq olmaz!`, 'error');
            }
            this.checkBookingConflictRealtime();
            return;
        }

        if (!allClients.some(c => c.id === existingClient.id)) {
            allClients.unshift(existingClient);
            this.saveClientsData(allClients);
        }

        let bookings = this.getBookings();

        if (this.bookingEditingId) {
            const b = bookings.find(x => x.id === this.bookingEditingId);
            if (b) {
                const wasCompleted = b.status === 'Tamamlandı';
                if (wasCompleted) b.completionApplied = true;
                b.clientName = clientName;
                b.phone = phone;
                b.service = srvObj ? srvObj.name : b.service;
                b.serviceId = serviceId;
                b.masterId = masterId;
                b.masterName = masterObj ? masterObj.name : b.masterName;
                b.date = date;
                b.time = time;
                b.startHour = parseInt(time.split(':')[0]) || 10;
                b.durationMinutes = duration;
                b.durationHours = duration / 60;
                b.price = price;
                b.status = status;
                b.note = notes;
                b.paymentMethod = paymentMethod;
                b.color = color;

                if (status === 'Tamamlandı' && !b.completionApplied) {
                    this.applyBookingCompletionToClient(b, paymentMethod);
                    b.completionApplied = true;
                }
            }
        } else {
            const newBooking = {
                id: 'b_' + Date.now(),
                clientName: clientName,
                phone: phone,
                service: srvObj ? srvObj.name : 'Standart Xidmət',
                serviceId: serviceId,
                masterId: masterId,
                masterName: masterObj ? masterObj.name : 'Usta',
                date: date,
                time: time,
                startHour: parseInt(time.split(':')[0]) || 10,
                durationMinutes: duration,
                durationHours: duration / 60,
                price: price,
                status: status,
                note: notes,
                paymentMethod: paymentMethod,
                color: color
            };
            bookings.unshift(newBooking);

            if (status === 'Tamamlandı') {
                this.applyBookingCompletionToClient(newBooking, paymentMethod);
                newBooking.completionApplied = true;
            }
        }

        this.saveBookings(bookings);
        this.closeBookingModal();
        this.refreshCalendar();

        if (typeof App !== 'undefined') {
            App.showToast(this.bookingEditingId ? 'Qəbul məlumatları yeniləndi' : `Yeni qəbul cədvələ əlavə edildi: ${clientName} (${time})`);
        }
    },

    quickCompleteCurrentBooking: function() {
        if (!this.bookingEditingId) return;
        const statusEl = document.getElementById('bmStatus');
        if (statusEl) statusEl.value = 'Tamamlandı';
        const form = document.querySelector('#bizBookingModalContainer form');
        if (form) this.handleSaveBooking({ preventDefault: () => {} });
    },

    applyBookingCompletionToClient: function(booking, paymentMethod) {
        const allClients = this.getClientsData();
        const cleanDigits = this.getCleanPhoneDigits(booking.phone);
        const normName = (booking.clientName || '').trim().toLowerCase();

        let client = allClients.find(c => {
            const cDigits = this.getCleanPhoneDigits(c.phone);
            if (cleanDigits && cDigits && cleanDigits === cDigits) return true;
            if (normName && (c.name || '').trim().toLowerCase() === normName) return true;
            return false;
        });

        if (!client) {
            // Auto create client record if new
            client = {
                id: 'c_' + Date.now(),
                name: booking.clientName,
                phone: booking.phone,
                category: 'normal',
                depositBalance: 0,
                cashbackBalance: 0,
                totalVisits: 0,
                totalSpent: 0,
                history: []
            };
            allClients.unshift(client);
        }

        if (!Array.isArray(client.history)) client.history = [];
        client.history.unshift({
            id: 'v_' + Date.now(),
            date: booking.date || new Date().toISOString().split('T')[0],
            time: booking.time || '12:00',
            service: booking.service || 'Xidmət',
            master: booking.masterName || 'Usta',
            price: parseFloat(booking.price) || 0,
            paymentMethod: paymentMethod || 'cash',
            status: 'Tamamlandı'
        });

        client.totalVisits = (client.totalVisits || 0) + 1;
        client.totalSpent = (parseFloat(client.totalSpent) || 0) + (parseFloat(booking.price) || 0);
        client.lastVisitDate = booking.date || new Date().toISOString().split('T')[0];

        // Deduct from deposit if payment method is deposit
        if (paymentMethod === 'deposit') {
            const curDep = parseFloat(client.depositBalance) || 0;
            client.depositBalance = Math.max(0, curDep - (parseFloat(booking.price) || 0));
            if (!Array.isArray(client.depositHistory)) client.depositHistory = [];
            client.depositHistory.unshift({
                id: 'dh_' + Date.now(),
                date: new Date().toISOString(),
                type: 'spend',
                amount: parseFloat(booking.price) || 0,
                method: 'deposit',
                note: `Qəbul ödənişi: ${booking.service}`,
                balanceAfter: client.depositBalance
            });
        }

        this.saveClientsData(allClients);
    },

    toggleSidebar: function(open) {
        this.sidebarOpen = open !== undefined ? open : !this.sidebarOpen;
        const sidebar = document.getElementById('bizSidebar');
        const backdrop = document.getElementById('bizSidebarBackdrop');
        if (sidebar) {
            if (this.sidebarOpen) {
                sidebar.classList.remove('-translate-x-full');
            } else {
                sidebar.classList.add('-translate-x-full');
            }
        }
        if (backdrop) {
            if (this.sidebarOpen) {
                backdrop.classList.remove('hidden');
            } else {
                backdrop.classList.add('hidden');
            }
        }
    },

    toggleUserMenu: function() {
        const menu = document.getElementById('bizUserMenu');
        if (menu) menu.classList.toggle('hidden');
    },

    switchTab: function(tab) {
        if (tab === 'calendar' || tab === 'teqvim' || tab === 'qebullar') {
            window.location.hash = '#/business/calendar';
        } else if (tab === 'profile' || tab === 'settings') {
            window.location.hash = '#/business/profile/' + (this.profileActiveTab || 'personal');
        } else if (tab === 'products' || tab === 'mehsullar') {
            window.location.hash = '#/business/products/' + (this.productsActiveTab || 'balances');
        } else if (tab === 'staff' || tab === 'ustalar') {
            window.location.hash = '#/business/staff/' + (this.staffActiveTab || 'team');
        } else if (tab === 'integrations' || tab === 'inteqrasiyalar') {
            window.location.hash = '#/business/integrations';
        } else if (tab === 'loyalty' || tab === 'loyalliq') {
            window.location.hash = '#/business/loyalty/' + (this.loyaltyActiveTab || 'cards_cashback');
        } else if (tab === 'marketing' || tab === 'marketinq') {
            window.location.hash = '#/business/marketing/' + (this.marketingActiveTab || 'campaigns');
        } else if (tab === 'finance' || tab === 'maliyye') {
            window.location.hash = '#/business/finance/' + (this.financeActiveTab || 'accounts');
        } else if (tab === 'clients' || tab === 'musteriler') {
            window.location.hash = '#/business/clients';
        } else {
            window.location.hash = '#/business/' + tab;
        }
    },


    switchClientsTab: function(subTab) {
        this.clientsActiveTab = subTab;
        this.clientsPage = 1;
        window.location.hash = '#/business/clients/' + subTab;
        if (this.activeTab === 'clients') {
            this.refreshClientsCanvas();
        }
    },

    switchFinanceSubTab: function(subTab) {
        this.financeActiveTab = subTab;
        window.location.hash = '#/business/finance/' + subTab;
        if (this.activeTab === 'finance') {
            this.refreshFinanceCanvas();
        }
    },

    switchProductsTab: function(subTab) {
        this.productsActiveTab = subTab;
        window.location.hash = '#/business/products/' + subTab;
    },

    switchStaffTab: function(subTab) {
        this.staffActiveTab = subTab;
        window.location.hash = '#/business/staff/' + subTab;
    },

    switchProfileTab: function(subTab) {
        this.profileActiveTab = subTab;
        window.location.hash = '#/business/profile/' + subTab;
    },

    getTabTitle: function() {
        const titles = {
            biznes: "Biznes",
            resources: "Resurslar",
            products: "Məhsullar",
            calendar: "Qəbullar & Təqvim",
            clients: "Müştəri Bazası (CRM)",
            services: "Xidmətlər",
            staff: "Ustalar & Heyət",
            loyalty: "Loyallıq Proqramı",
            marketing: "Marketinq",
            integrations: "İnteqrasiyalar",
            finance: "Maliyyə & Kassa",
            settings: "Profil & Parametrlər",
            profile: "İstifadəçi Profili"
        };
        return titles[this.activeTab] || "Biznes";
    },

    renderActiveTabContent: function() {
        switch (this.activeTab) {
            case 'biznes':       return this.renderBusinessModule();
            case 'resources':    return this.renderResourcesModule();
            case 'products':     return this.renderProductsModule();
            case 'calendar':     return this.renderCalendarWeeklyGrid();
            case 'clients':      return this.renderClientsTab();
            case 'services':     return this.renderServicesTab();
            case 'staff':        return this.renderStaffTab();
            case 'loyalty':      return this.renderLoyaltyModule();
            case 'marketing':    return this.renderMarketingModule();
            case 'integrations': return this.renderIntegrationsModule();
            case 'finance':      return this.renderFinanceTab();
            case 'settings':
            case 'profile':      return this.renderProfilePage();
            default:             return this.renderBusinessModule();
        }
    },

    collapsedBusinesses: {},

    toggleBusinessCollapse: function(bizId) {
        this.collapsedBusinesses[bizId] = !this.collapsedBusinesses[bizId];
        const isCollapsed = !!this.collapsedBusinesses[bizId];
        const tree = document.getElementById(`bizBranchesTree_${bizId}`);
        const chevron = document.getElementById(`bizChevron_${bizId}`);
        if (tree) {
            if (isCollapsed) {
                tree.classList.add('hidden');
            } else {
                tree.classList.remove('hidden');
            }
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

    // ==========================================
    // TAB: BİZNES (PRIMARY BUSINESS OVERVIEW)
    // ==========================================
        // ==========================================
    // BUSINESS BRANCHES & NETWORK STRUCTURE
    // ==========================================
        renderBusinessModule: function() {
        const businesses = this.getBusinesses();
        const activeCtx = this.getActiveContext();

        return `
            <div class="max-w-4xl mx-auto px-4 py-5 sm:px-7 sm:py-7 space-y-5">
                <!-- Bizneslər və Fərdi Ustalar Siyahısı -->
                <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    ${businesses.length === 0 ? `
                        <div class="p-8 sm:p-12 text-center space-y-3">
                            <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                            </div>
                            <div>
                                <h4 class="font-bold text-sm text-tbank-graphite">Hələ heç bir profil tapılmadı</h4>
                                <p class="text-xs text-slate-400 font-medium mt-1">İlk biznesinizi və ya fərdi fəaliyyətinizi əlavə edin</p>
                            </div>
                            <div class="pt-2">
                                <button onclick="BusinessDashboardView.openCreateBusinessModal()" class="px-5 py-2.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-medium transition active:scale-95 shadow-xs inline-flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                    <span>Yeni profil yarat</span>
                                </button>
                            </div>
                        </div>
                    ` : `
                        <div class="divide-y divide-slate-100">
                            ${businesses.map(b => {
                                const isBiz = (b.type || 'business') === 'business';
                                const branches = Array.isArray(b.branches) ? b.branches : [];
                                const isCollapsed = !!this.collapsedBusinesses[b.id];
                                const catName = !isBiz && b.category ? (this.getCategoryInfo(b.category).name || b.category) : '';
                                return `
                                    <div class="p-4 sm:p-5 hover:bg-slate-50/50 transition space-y-3">
                                        <div class="flex items-center justify-between gap-4">
                                            <div class="min-w-0 flex items-center gap-3">
                                                ${!isBiz ? `
                                                    ${b.logo ? `
                                                        <img src="${b.logo}" alt="${b.name}" class="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0">
                                                    ` : `
                                                        <div class="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
                                                    `}
                                                ` : ''}
                                                <div class="min-w-0">
                                                    <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                                        ${isBiz ? `
                                                            <button type="button" onclick="BusinessDashboardView.toggleBusinessCollapse('${b.id}')" class="w-6 h-6 -ml-1 rounded-lg text-slate-400 hover:text-tbank-graphite hover:bg-slate-100 transition flex items-center justify-center shrink-0 cursor-pointer" title="${isCollapsed ? 'Filialları göstər' : 'Filialları qatla'}">
                                                                <svg id="bizChevron_${b.id}" class="w-3.5 h-3.5 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                                                </svg>
                                                            </button>
                                                        ` : ''}
                                                        <h4 onclick="${isBiz ? `BusinessDashboardView.toggleBusinessCollapse('${b.id}')` : `BusinessDashboardView.openEditIndividualMasterModal('${b.id}')`}" title="${isBiz ? 'Filialları açmaq/bağlamaq üçün klikləyin' : 'Profilini redaktə etmək üçün klikləyin'}" class="font-bold text-sm text-tbank-graphite hover:underline cursor-pointer truncate">
                                                            ${b.name}
                                                        </h4>
                                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold ${isBiz ? 'bg-amber-100/70 text-amber-900 border border-amber-200/50' : 'bg-blue-100/70 text-blue-900 border border-blue-200/50'}">
                                                            ${isBiz ? 'Biznes' : 'Fərdi usta'}
                                                        </span>
                                                        ${isBiz ? `
                                                            <button type="button" onclick="BusinessDashboardView.toggleBusinessCollapse('${b.id}')" class="text-[11px] text-slate-400 hover:text-slate-600 font-normal transition cursor-pointer select-none">
                                                                (${branches.length} filial)
                                                            </button>
                                                        ` : ''}
                                                    </div>
                                                    ${!isBiz ? `
                                                        <div class="text-[11px] text-slate-400 pt-0.5 truncate">
                                                            ${catName ? catName : ''}${b.address ? ` • ${b.address}` : ''}${b.phone ? ` • ${b.phone}` : ''}${b.hours ? ` • ${b.hours}` : ''}
                                                        </div>
                                                    ` : ''}
                                                </div>
                                            </div>

                                            <div class="flex items-center gap-1.5 text-xs font-medium shrink-0">
                                                <button onclick="${isBiz ? `BusinessDashboardView.openEditBusinessModal('${b.id}')` : `BusinessDashboardView.openEditIndividualMasterModal('${b.id}')`}" class="p-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-white transition text-xs font-medium flex items-center justify-center shadow-2xs" title="Redaktə et">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                </button>
                                                <button onclick="BusinessDashboardView.deleteBusiness('${b.id}')" class="p-1.5 rounded-xl border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition text-xs font-medium flex items-center justify-center" title="Sil">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Filiallar Ağac Strukturu (Tree Structure) -->
                                        ${isBiz ? `
                                            <div id="bizBranchesTree_${b.id}" class="${isCollapsed ? 'hidden ' : ''}pt-1 transition-all">
                                                <div class="relative ml-2 sm:ml-3 pl-4 sm:pl-5 border-l-2 border-slate-200/90 space-y-2 my-1">
                                                    ${branches.map((br, brIdx) => {
                                                        return `
                                                            <div class="relative group">
                                                                <!-- Tree branch horizontal connector line -->
                                                                <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>
                                                                
                                                                <div class="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/70 border-slate-200/70 border transition flex items-center justify-between gap-3 text-xs">
                                                                    <div class="min-w-0 flex items-center gap-2">
                                                                        <span class="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                                                                        <div class="min-w-0 flex items-center gap-2 flex-wrap">
                                                                            <span class="font-bold text-xs text-tbank-graphite">${br.name}</span>
                                                                            ${br.address ? `<span class="text-[11px] text-slate-400 truncate">• ${br.address}</span>` : ''}
                                                                            ${br.phone ? `<span class="text-[11px] text-slate-400 truncate hidden sm:inline">• ${br.phone}</span>` : ''}
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex items-center gap-1.5 shrink-0">
                                                                        <button type="button" onclick="BusinessDashboardView.openEditBranchModal('${b.id}', ${brIdx})" class="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition" title="Filialı redaktə et">
                                                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                                        </button>
                                                                        <button type="button" onclick="BusinessDashboardView.deleteBranch('${b.id}', ${brIdx})" class="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition" title="Filialı sil">
                                                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        `;
                                                    }).join('')}

                                                    <!-- + Filial əlavə et düyməsi (Ağacın son budağı) -->
                                                    <div class="relative pt-0.5">
                                                        <div class="absolute -left-[18px] sm:-left-[22px] top-1/2 -translate-y-1/2 w-4 sm:w-5 h-[2px] bg-slate-200/90"></div>
                                                        <button type="button" onclick="BusinessDashboardView.openAddBranchModal('${b.id}')" class="w-full py-2 px-3 rounded-xl bg-slate-100/90 hover:bg-[#FFDD2D] text-slate-800 hover:text-[#101114] font-medium text-xs transition flex items-center justify-center gap-1.5 active:scale-[0.99] border border-slate-200/80 hover:border-amber-300 shadow-2xs">
                                                            <span class="text-sm font-medium leading-none">+</span>
                                                            <span>Filial əlavə et</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `}
                </div>
            </div>
        `;
    },

    renderClientsTab: function() {
        return this.renderClientsModule();
    },

    // ==========================================
    // TAB: SERVICES (XİDMƏTLƏR VƏ QİYMƏT KATALOQU)
    // ==========================================
    renderServicesTab: function() {
        const activeCtx = this.getActiveContext();
        const allServices = this.getServices();
        const services = allServices.filter(s => {
            if (s.branchId) {
                return s.branchId === activeCtx.branchId || s.branchName === activeCtx.branchName;
            }
            return s.businessName === activeCtx.businessName;
        });

        const categories = this.getServiceCategories();
        const totalServices = services.length;
        const uncategorizedCount = services.filter(s => !s.categoryId || s.categoryId === 'uncategorized' || !categories.some(c => c.id === s.categoryId)).length;
        const comboCount = services.filter(s => s.serviceFormat === 'combo' || s.isCombo).length;
        const onlineCount = services.filter(s => s.onlineBooking !== false).length;
        const avgPrice = totalServices > 0 ? (services.reduce((acc, s) => acc + (parseFloat(s.price) || 0), 0) / totalServices) : 0;
        const minPrice = totalServices > 0 ? Math.min(...services.map(s => parseFloat(s.price) || 0)) : 0;
        const maxPrice = totalServices > 0 ? Math.max(...services.map(s => parseFloat(s.price) || 0)) : 0;
        const avgDuration = totalServices > 0 ? Math.round(services.reduce((acc, s) => acc + (parseInt(s.duration) || 30), 0) / totalServices) : 0;

        return `
            <div class="max-w-5xl mx-auto px-4 py-5 sm:px-7 sm:py-7 space-y-6">
                <!-- TOP METRIC CARDS -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <!-- 1. Ümumi xidmətlər -->
                    <div class="text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Ümumi xidmətlər</span>
                            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${totalServices}</div>
                        <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 flex-wrap">
                            <span class="text-amber-700 font-semibold">${categories.length} kateqoriya</span>
                            ${uncategorizedCount > 0 ? `<span class="text-slate-400">•</span><span class="text-slate-500 font-semibold">${uncategorizedCount} kateqoriyasız</span>` : ''}
                            ${comboCount > 0 ? `<span class="text-slate-400">•</span><span class="text-indigo-600 font-semibold">${comboCount} kompleks</span>` : ''}
                        </div>
                    </div>

                    <!-- 2. Onlayn qəbul -->
                    <button type="button" onclick="BusinessDashboardView.setServiceOnlineFilter('${this.serviceOnlineFilter === 'online' ? 'all' : 'online'}')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${this.serviceOnlineFilter === 'online' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Onlayn qəbul</span>
                            <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${onlineCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">
                            <span class="text-emerald-700 font-semibold">${totalServices > 0 ? Math.round((onlineCount / totalServices) * 100) : 0}% aktiv</span>
                        </div>
                    </button>

                    <!-- 3. Orta qiymət -->
                    <div class="text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Orta qiymət</span>
                            <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </span>
                        </div>
                        <div class="text-xl sm:text-2xl font-bold text-slate-900">${avgPrice.toFixed(2)} ₼</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">
                            ${minPrice} ₼ – ${maxPrice} ₼ aralığında
                        </div>
                    </div>

                    <!-- 4. Orta müddət -->
                    <div class="text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Orta müddət</span>
                            <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/></svg>
                            </span>
                        </div>
                        <div class="text-xl sm:text-2xl font-bold text-slate-900">${avgDuration} dəq</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">
                            İcra və xidmət vaxtı
                        </div>
                    </div>
                </div>

                <!-- FILTER & SEARCH TOOLBAR -->
                <div id="srvFilterBarContainer">
                    ${this.renderServiceFilterBarHtml()}
                </div>

                <!-- CATEGORIES ACCORDION CARDS CONTAINER -->
                <div id="srvCardsGrid" class="space-y-4">
                    ${this.renderServiceCardsHtml()}
                </div>
            </div>
        `;
    },
});
