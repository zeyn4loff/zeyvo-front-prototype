// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {
    // ==========================================
    // ==========================================
    // MODULE: STAFF & MASTERS (USTALAR VƏ HEYƏT)
    // ==========================================
    staffActiveTab: 'team',
    staffSearchQuery: '',
    staffRoleFilter: 'all',
    staffStatusFilter: 'all',
    staffShiftFilter: 'all',
    staffOnlineFilter: 'all',
    staffViewMode: 'table',
    staffCurrentPage: 1,
    staffPageSize: 10,

    rolesSearchQuery: '',
    rolesTypeFilter: 'all',

    getFilteredMasterRoles: function(roles, staffList) {
        const q = (this.rolesSearchQuery || '').toLowerCase().trim();
        const typeFilter = this.rolesTypeFilter || 'all';

        return (roles || []).filter(role => {
            if (q) {
                const match = (role.name || '').toLowerCase().includes(q) ||
                              (role.description || '').toLowerCase().includes(q);
                if (!match) return false;
            }
            const count = (staffList || []).filter(s => (s.role || '').trim().toLowerCase() === (role.name || '').trim().toLowerCase()).length;
            if (typeFilter === 'default' && !role.isDefault) return false;
            if (typeFilter === 'custom' && role.isDefault) return false;
            if (typeFilter === 'assigned' && count === 0) return false;
            if (typeFilter === 'unassigned' && count > 0) return false;
            return true;
        });
    },

    setRolesSearch: function(val) {
        this.rolesSearchQuery = val || '';
        const clearBtn = document.getElementById('rolesSearchClearBtn');
        if (clearBtn) {
            if (this.rolesSearchQuery.trim()) clearBtn.classList.remove('hidden');
            else clearBtn.classList.add('hidden');
        }
        const cardsContainer = document.getElementById('rolesCardsContainer');
        const chipsContainer = document.getElementById('rolesActiveChipsContainer');
        if (cardsContainer) {
            const roles = this.getMasterRoles();
            const staffList = this.getStaffList();
            const filtered = this.getFilteredMasterRoles(roles, staffList);
            cardsContainer.innerHTML = this.renderRolesCardsHtml(filtered, staffList);
            if (chipsContainer) {
                chipsContainer.innerHTML = this.renderRolesActiveChipsHtml();
            }
        } else {
            this.refreshRolesTabContent();
        }
    },

    clearRolesSearch: function() {
        this.rolesSearchQuery = '';
        const input = document.getElementById('rolesSearchInput');
        if (input) input.value = '';
        this.setRolesSearch('');
    },

    setRolesTypeFilter: function(type) {
        this.rolesTypeFilter = type || 'all';
        this.refreshRolesTabContent();
    },

    resetRolesFilters: function() {
        this.rolesSearchQuery = '';
        this.rolesTypeFilter = 'all';
        this.refreshRolesTabContent();
    },

    refreshRolesTabContent: function() {
        const container = document.getElementById('bizStaffSubContent');
        if (container && (this.staffActiveTab === 'roles')) {
            container.innerHTML = this.renderStaffRolesSection();
        }
    },

    renderRolesActiveChipsHtml: function() {
        const hasSearch = !!(this.rolesSearchQuery && this.rolesSearchQuery.trim());
        const hasFilter = !!(this.rolesTypeFilter && this.rolesTypeFilter !== 'all');
        if (!hasSearch && !hasFilter) return '';

        const typeLabels = {
            assigned: 'Təyin olunmuş heyət',
            unassigned: 'Təyin edilməmiş',
            default: 'Standart şablonlar',
            custom: 'Fərdi vəzifələr'
        };

        return `
            <div class="flex items-center gap-2 flex-wrap pt-1 text-xs">
                <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                ${hasFilter ? `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                        <span>Filtr: ${typeLabels[this.rolesTypeFilter] || this.rolesTypeFilter}</span>
                        <button type="button" onclick="BusinessDashboardView.setRolesTypeFilter('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                    </span>
                ` : ''}

                ${hasSearch ? `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/80 font-semibold text-[11px]">
                        <span>Axtarış: "${BusinessDashboardView.escapeHtml(this.rolesSearchQuery)}"</span>
                        <button type="button" onclick="BusinessDashboardView.clearRolesSearch()" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                    </span>
                ` : ''}

                <button type="button" onclick="BusinessDashboardView.resetRolesFilters()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer ml-1">
                    Hamısını sıfırla
                </button>
            </div>
        `;
    },

    renderRolesCardsHtml: function(filtered, staffList) {
        if (!filtered || filtered.length === 0) {
            return `
                <div class="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3 shadow-2xs">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                        <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    </div>
                    <h4 class="font-bold text-sm text-slate-900">Uyğun vəzifə tapılmadı</h4>
                    <p class="text-xs text-slate-400 font-normal">Axtarış sözünü dəyişin və ya filtri sıfırlayın</p>
                    <button type="button" onclick="BusinessDashboardView.resetRolesFilters()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer">
                        Filtrləri sıfırla
                    </button>
                </div>
            `;
        }

        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                ${filtered.map(role => {
                    const assignedMasters = (staffList || []).filter(s => (s.role || '').trim().toLowerCase() === (role.name || '').trim().toLowerCase());
                    const count = assignedMasters.length;
                    return `
                        <div class="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition flex flex-col justify-between space-y-3">
                            <div class="flex items-start justify-between gap-3">
                                <div class="flex items-start gap-3 min-w-0">
                                    <div class="w-10 h-10 rounded-xl bg-amber-50/80 border border-amber-200/50 flex items-center justify-center text-amber-900 shrink-0">
                                        ${this.getRoleIconSvg(role.icon, 'w-5 h-5 text-amber-900')}
                                    </div>
                                    <div class="min-w-0">
                                        <div class="flex items-center gap-2 flex-wrap">
                                            <h4 class="font-bold text-sm text-slate-900 truncate">${this.escapeHtml(role.name)}</h4>
                                            ${role.isDefault ? `
                                                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">Standart</span>
                                            ` : `
                                                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60">Fərdi</span>
                                            `}
                                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">${role.defaultCommission || 40}% komissiya</span>
                                        </div>
                                        <p class="text-xs text-slate-500 font-normal mt-1 line-clamp-2">${this.escapeHtml(role.description || 'Xüsusi qeyd yoxdur')}</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-1 shrink-0">
                                    <button type="button" onclick="BusinessDashboardView.openCreateMasterRoleModal('${role.id}')" class="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                    </button>
                                    <button type="button" onclick="BusinessDashboardView.deleteMasterRole('${role.id}')" class="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sil">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                    </button>
                                </div>
                            </div>

                            <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                                <div class="flex items-center gap-1.5 text-slate-500">
                                    <span>Təyin edilmiş heyət:</span>
                                    <span class="font-bold text-slate-900">${count} usta</span>
                                </div>
                                ${count > 0 ? `
                                    <div class="flex items-center -space-x-1.5 overflow-hidden">
                                        ${assignedMasters.slice(0, 4).map(m => m.avatar ? `<img src="${m.avatar}" class="w-6 h-6 rounded-full object-cover ring-2 ring-white">` : `<div class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-[9px] font-bold flex items-center justify-center ring-2 ring-white">${(m.name||'U')[0]}</div>`).join('')}
                                        ${count > 4 ? `<span class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-[9px] font-bold flex items-center justify-center ring-2 ring-white">+${count - 4}</span>` : ''}
                                    </div>
                                ` : `
                                    <span class="text-[11px] text-slate-400">Heç bir ustaya təyin edilməyib</span>
                                `}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    setStaffPage: function(page) {
        this.staffCurrentPage = Math.max(1, page);
        this.refreshStaffTabContent();
    },

    setStaffPageSize: function(size) {
        this.staffPageSize = size || 10;
        this.staffCurrentPage = 1;
        this.refreshStaffTabContent();
    },

    setStaffSearch: function(val) {
        this.staffSearchQuery = val || '';
        this.staffCurrentPage = 1;
        const clearBtn = document.getElementById('staffSearchClearBtn');
        if (clearBtn) {
            if (this.staffSearchQuery.trim()) clearBtn.classList.remove('hidden');
            else clearBtn.classList.add('hidden');
        }
        const contentContainer = document.getElementById('staffContentContainer');
        const chipsContainer = document.getElementById('staffActiveChipsContainer');
        if (contentContainer) {
            const staffList = this.getStaffList();
            const services = this.getServices ? this.getServices() : [];
            const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            const todayKey = dayKeys[new Date().getDay()];
            const filtered = this.getFilteredStaffList(staffList, todayKey);

            contentContainer.innerHTML = filtered.length === 0 ? this.renderStaffEmptyHtml() : this.renderStaffTableView(filtered, todayKey, services);
            if (chipsContainer) {
                chipsContainer.innerHTML = this.renderStaffActiveChipsHtml();
            }
        } else {
            this.refreshStaffTabContent();
        }
    },

    clearStaffSearch: function() {
        this.staffSearchQuery = '';
        this.staffCurrentPage = 1;
        const input = document.getElementById('staffSearchInput');
        if (input) input.value = '';
        this.setStaffSearch('');
    },

    setStaffRoleFilter: function(role) {
        this.staffRoleFilter = role || 'all';
        this.staffCurrentPage = 1;
        this.refreshStaffTabContent();
    },

    setStaffStatusFilter: function(status) {
        this.staffStatusFilter = status || 'all';
        this.staffCurrentPage = 1;
        this.refreshStaffTabContent();
    },

    setStaffShiftFilter: function(shift) {
        this.staffShiftFilter = shift || 'all';
        this.staffCurrentPage = 1;
        this.refreshStaffTabContent();
    },

    setStaffOnlineFilter: function(online) {
        this.staffOnlineFilter = online || 'all';
        this.staffCurrentPage = 1;
        this.refreshStaffTabContent();
    },

    resetStaffFilters: function() {
        this.staffSearchQuery = '';
        this.staffRoleFilter = 'all';
        this.staffStatusFilter = 'all';
        this.staffShiftFilter = 'all';
        this.staffOnlineFilter = 'all';
        this.staffFilterTempStatus = 'all';
        this.staffFilterTempShift = 'all';
        this.staffFilterTempOnline = 'all';
        this.staffCurrentPage = 1;
        this.closeStaffFilterModal();
        this.refreshStaffTabContent();
    },

    openStaffFilterModal: function() {
        const modal = document.getElementById('bizStaffFilterModal');
        if (!modal) return;

        const staffList = this.getStaffList();
        const configuredRoles = this.getMasterRoles ? this.getMasterRoles().map(r => r.name) : [];
        const staffRoles = staffList.map(s => s.role).filter(Boolean);
        const allRoles = Array.from(new Set([...configuredRoles, ...staffRoles]));
        const roleSelect = document.getElementById('staffFilterModalRole');
        if (roleSelect) {
            let roleOptions = `<option value="all">Bütün vəzifələr (${staffList.length})</option>`;
            allRoles.forEach(r => {
                const isSelected = this.staffRoleFilter === r;
                const count = staffList.filter(s => s.role === r).length;
                roleOptions += `<option value="${r}" ${isSelected ? 'selected' : ''}>${r} (${count})</option>`;
            });
            roleSelect.innerHTML = roleOptions;
        }

        this.selectStaffFilterStatus(this.staffStatusFilter || 'all');
        this.selectStaffFilterShift(this.staffShiftFilter || 'all');
        this.selectStaffFilterOnline(this.staffOnlineFilter || 'all');

        modal.classList.remove('hidden');
    },

    closeStaffFilterModal: function() {
        const modal = document.getElementById('bizStaffFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    staffFilterTempStatus: 'all',
    staffFilterTempShift: 'all',
    staffFilterTempOnline: 'all',

    selectStaffFilterStatus: function(val) {
        this.staffFilterTempStatus = val;
        ['all', 'active', 'vacation', 'inactive', 'dismissed'].forEach(s => {
            const btn = document.getElementById(`staffFilterStatusBtn_${s}`);
            if (btn) {
                if (s === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold ring-1 ring-slate-900';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer';
                }
            }
        });
    },

    selectStaffFilterShift: function(val) {
        this.staffFilterTempShift = val;
        ['all', 'working', 'off'].forEach(s => {
            const btn = document.getElementById(`staffFilterShiftBtn_${s}`);
            if (btn) {
                if (s === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold ring-1 ring-slate-900';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer';
                }
            }
        });
    },

    selectStaffFilterOnline: function(val) {
        this.staffFilterTempOnline = val;
        ['all', 'online', 'offline'].forEach(o => {
            const btn = document.getElementById(`staffFilterOnlineBtn_${o}`);
            if (btn) {
                if (o === val) {
                    btn.className = 'p-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer shadow-xs font-bold ring-1 ring-slate-900';
                } else {
                    btn.className = 'p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer';
                }
            }
        });
    },

    applyStaffFilterModal: function() {
        const roleSelect = document.getElementById('staffFilterModalRole');
        if (roleSelect) {
            this.staffRoleFilter = roleSelect.value || 'all';
        }
        this.staffStatusFilter = this.staffFilterTempStatus || 'all';
        this.staffShiftFilter = this.staffFilterTempShift || 'all';
        this.staffOnlineFilter = this.staffFilterTempOnline || 'all';

        this.closeStaffFilterModal();
        this.refreshStaffTabContent();
    },

    getFilteredStaffList: function(staffList, todayKey) {
        const search = (this.staffSearchQuery || '').toLowerCase().trim();
        const roleF = this.staffRoleFilter || 'all';
        const statusF = this.staffStatusFilter || 'all';
        const shiftF = this.staffShiftFilter || 'all';
        const onlineF = this.staffOnlineFilter || 'all';

        return staffList.filter(m => {
            if (roleF !== 'all' && m.role !== roleF) return false;
            if (statusF !== 'all' && m.status !== statusF) return false;
            if (shiftF && shiftF !== 'all') {
                const isWorking = m.status === 'active' && m.workSchedule?.days?.[todayKey]?.enabled;
                if (shiftF === 'working' && !isWorking) return false;
                if (shiftF === 'off' && isWorking) return false;
            }
            if (onlineF && onlineF !== 'all') {
                const isOnline = m.isOnlineBooking !== false && m.status === 'active';
                if (onlineF === 'online' && !isOnline) return false;
                if (onlineF === 'offline' && isOnline) return false;
            }
            if (search) {
                const mName = (m.name || '').toLowerCase();
                const mRole = (m.role || '').toLowerCase();
                const mSpec = (m.specialization || '').toLowerCase();
                const mPhone = (m.phone || '').toLowerCase();
                const mEmail = (m.email || '').toLowerCase();
                if (!mName.includes(search) && !mRole.includes(search) && !mSpec.includes(search) && !mPhone.includes(search) && !mEmail.includes(search)) {
                    return false;
                }
            }
            return true;
        });
    },

    renderStaffActiveChipsHtml: function() {
        let activeFilterCount = 0;
        if (this.staffRoleFilter !== 'all') activeFilterCount++;
        if (this.staffStatusFilter !== 'all') activeFilterCount++;
        if (this.staffShiftFilter && this.staffShiftFilter !== 'all') activeFilterCount++;
        if (this.staffOnlineFilter && this.staffOnlineFilter !== 'all') activeFilterCount++;

        const hasActiveFilters = activeFilterCount > 0 || (this.staffSearchQuery && this.staffSearchQuery.trim().length > 0);
        if (!hasActiveFilters) return '';

        const statusLabels = {
            active: 'Aktiv',
            vacation: 'Məzuniyyətdə',
            inactive: 'Qeyri-aktiv',
            dismissed: 'İşdən azad edilib'
        };
        const shiftLabels = {
            working: 'Bu gün növbədə',
            off: 'Bu gün istirahət'
        };
        const onlineLabels = {
            online: 'Onlayn aktiv',
            offline: 'Saytdan gizli'
        };

        return `
            <div class="flex items-center gap-2 flex-wrap pt-1 text-xs">
                <span class="text-[11px] font-medium text-slate-400">Aktiv:</span>

                ${this.staffRoleFilter !== 'all' ? `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/80 font-semibold text-[11px]">
                        <span>Vəzifə: ${BusinessDashboardView.escapeHtml(this.staffRoleFilter)}</span>
                        <button type="button" onclick="BusinessDashboardView.setStaffRoleFilter('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                    </span>
                ` : ''}

                ${this.staffStatusFilter !== 'all' ? `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200/70 font-semibold text-[11px]">
                        <span>Status: ${statusLabels[this.staffStatusFilter] || this.staffStatusFilter}</span>
                        <button type="button" onclick="BusinessDashboardView.setStaffStatusFilter('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                    </span>
                ` : ''}

                ${this.staffShiftFilter && this.staffShiftFilter !== 'all' ? `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/70 font-semibold text-[11px]">
                        <span>Növbə: ${shiftLabels[this.staffShiftFilter] || this.staffShiftFilter}</span>
                        <button type="button" onclick="BusinessDashboardView.setStaffShiftFilter('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                    </span>
                ` : ''}

                ${this.staffOnlineFilter && this.staffOnlineFilter !== 'all' ? `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 font-semibold text-[11px]">
                        <span>Onlayn: ${onlineLabels[this.staffOnlineFilter] || this.staffOnlineFilter}</span>
                        <button type="button" onclick="BusinessDashboardView.setStaffOnlineFilter('all')" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                    </span>
                ` : ''}

                ${this.staffSearchQuery ? `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-semibold text-[11px]">
                        <span>Axtarış: "${BusinessDashboardView.escapeHtml(this.staffSearchQuery)}"</span>
                        <button type="button" onclick="BusinessDashboardView.clearStaffSearch()" class="hover:text-rose-600 transition cursor-pointer">✕</button>
                    </span>
                ` : ''}

                <button type="button" onclick="BusinessDashboardView.resetStaffFilters()" class="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer ml-1">
                    Hamısını sıfırla
                </button>
            </div>
        `;
    },

    renderStaffFilterBarHtml: function(matchedCount, totalCount) {
        let activeFilterCount = 0;
        if (this.staffRoleFilter !== 'all') activeFilterCount++;
        if (this.staffStatusFilter !== 'all') activeFilterCount++;
        if (this.staffShiftFilter && this.staffShiftFilter !== 'all') activeFilterCount++;
        if (this.staffOnlineFilter && this.staffOnlineFilter !== 'all') activeFilterCount++;

        return `
            <div class="space-y-3">
                <div class="flex items-center gap-2 sm:gap-3">
                    <!-- Search Input -->
                    <div class="relative flex-1 min-w-0">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </span>
                        <input type="text"
                               id="staffSearchInput"
                               placeholder="Usta adı, vəzifə, telefon və ya email üzrə axtarış..."
                               value="${BusinessDashboardView.escapeHtml(this.staffSearchQuery || '')}"
                               oninput="BusinessDashboardView.setStaffSearch(this.value)"
                               class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                        <button type="button"
                                id="staffSearchClearBtn"
                                onclick="BusinessDashboardView.clearStaffSearch()"
                                class="${this.staffSearchQuery ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
                                title="Təmizlə">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <!-- Filter Button -->
                    <button type="button"
                            onclick="BusinessDashboardView.openStaffFilterModal()"
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

                <!-- Active Filter Badges Pill Row Container -->
                <div id="staffActiveChipsContainer">
                    ${this.renderStaffActiveChipsHtml()}
                </div>
            </div>
        `;
    },

    renderStaffEmptyHtml: function() {
        return `
            <div class="py-16 text-center bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
                <div class="w-16 h-16 mx-auto rounded-3xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                    <svg class="w-8 h-8 text-amber-900" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h4 class="text-sm font-bold text-slate-900">Usta tapılmadı</h4>
                <p class="text-xs text-slate-400 max-w-sm mx-auto">Axtarış sorğusuna və ya seçilmiş filtrlərə uyğun heç bir mütəxəssis tapılmadı.</p>
                <div class="flex items-center justify-center gap-2 pt-1">
                    <button type="button" onclick="BusinessDashboardView.resetStaffFilters()" class="h-9 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer">
                        Filtrləri sıfırla
                    </button>
                    <button type="button" onclick="BusinessDashboardView.openCreateMasterModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs inline-flex items-center gap-1.5 cursor-pointer">
                        <span>+ Yeni usta əlavə et</span>
                    </button>
                </div>
            </div>
        `;
    },

    setStaffViewMode: function(mode) {
        this.staffViewMode = 'table';
        this.refreshStaffTabContent();
    },

    refreshStaffTabContent: function() {
        const body = document.getElementById('bizCanvasBody');
        if (body && this.activeTab === 'staff') {
            body.innerHTML = this.renderStaffTab();
        }
    },

    toggleMasterOnlineBookingQuick: function(masterId, e) {
        if (e && e.stopPropagation) e.stopPropagation();
        const list = this.getStaffList();
        const idx = list.findIndex(m => m.id === masterId);
        if (idx !== -1) {
            list[idx].isOnlineBooking = !list[idx].isOnlineBooking;
            this.saveStaffList(list);
            this.refreshStaffTabContent();
            if (typeof App !== 'undefined') {
                App.showToast(list[idx].isOnlineBooking ? `«${list[idx].name}» onlayn sifarişə aktiv edildi` : `«${list[idx].name}» onlayn sifarişdən gizlədildi`);
            }
        }
    },

    renderStaffTab: function() {
        let sub = this.staffActiveTab || 'team';
        this.staffActiveTab = sub;
        const staffList = this.getStaffList();
        const roles = this.getMasterRoles();

        const subTabs = [
            { id: 'team', label: 'Ustalar', badge: staffList.length },
            { id: 'schedule', label: 'İş qrafiki & Smenlər' },
            { id: 'roles', label: 'Vəzifələr və rollar', badge: roles.length }
        ];

        return `
            <div class="max-w-7xl mx-auto px-4 py-5 sm:px-7 sm:py-7 space-y-6">
                <!-- SUB-TABS NAVIGATION (Unified Segmented Control like in Products) -->
                <div>
                    ${this.renderSegmentedTabs({
                        tabs: subTabs,
                        activeId: sub,
                        isLink: true,
                        linkPrefix: '#/business/staff/'
                    })}
                </div>

                <!-- SUB-TAB CONTENT -->
                <div id="bizStaffSubContent">
                    ${this.renderStaffSubTabContent(sub)}
                </div>
            </div>
        `;
    },

    renderStaffSubTabContent: function(sub) {
        switch (sub) {
            case 'team':
                return this.renderStaffTeamSection();
            case 'schedule':
                return this.renderStaffScheduleSection();
            case 'roles':
                return this.renderStaffRolesSection();
            default:
                return this.renderStaffTeamSection();
        }
    },

    staffScheduleWeekOffset: 0,

    navigateStaffScheduleWeek: function(delta) {
        this.staffScheduleWeekOffset = (this.staffScheduleWeekOffset || 0) + delta;
        const sub = document.getElementById('bizStaffSubContent');
        if (sub) sub.innerHTML = this.renderStaffScheduleSection();
    },

    toggleMasterShift: function(masterId, dayKey) {
        const staffList = this.getStaffList();
        const master = staffList.find(s => s.id === masterId);
        if (!master) return;

        if (!master.workSchedule) master.workSchedule = { days: {} };
        if (!master.workSchedule.days) master.workSchedule.days = {};
        if (!master.workSchedule.days[dayKey]) {
            master.workSchedule.days[dayKey] = { enabled: true, start: '09:00', end: '19:00' };
        } else {
            master.workSchedule.days[dayKey].enabled = !master.workSchedule.days[dayKey].enabled;
        }

        this.saveStaffList(staffList);
        const sub = document.getElementById('bizStaffSubContent');
        if (sub) sub.innerHTML = this.renderStaffScheduleSection();
        if (typeof App !== 'undefined') App.showToast(`${master.name} — növbə yeniləndi`);
    },

    applySchedulePreset: function(presetType) {
        const staffList = this.getStaffList();
        const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

        staffList.forEach(m => {
            if (!m.workSchedule) m.workSchedule = { days: {} };
            if (!m.workSchedule.days) m.workSchedule.days = {};

            dayKeys.forEach((d, idx) => {
                if (presetType === '5_2') {
                    // Monday to Friday working, weekend off
                    m.workSchedule.days[d] = { enabled: idx < 5, start: '09:00', end: '19:00' };
                } else if (presetType === 'everyday') {
                    m.workSchedule.days[d] = { enabled: true, start: '10:00', end: '20:00' };
                } else if (presetType === '2_2') {
                    m.workSchedule.days[d] = { enabled: (idx % 4) < 2, start: '09:00', end: '20:00' };
                }
            });
        });

        this.saveStaffList(staffList);
        const sub = document.getElementById('bizStaffSubContent');
        if (sub) sub.innerHTML = this.renderStaffScheduleSection();
        if (typeof App !== 'undefined') App.showToast(`«${presetType === '5_2' ? '5/2 rejimi' : (presetType === '2_2' ? '2/2 növbəsi' : 'Bütün günlər')}» cədvələ tətbiq edildi`);
    },

    renderStaffScheduleSection: function() {
        const staffList = this.getStaffList();
        const offset = this.staffScheduleWeekOffset || 0;

        // Generate 7 days for the current displayed week
        const now = new Date();
        const currentMonday = new Date(now);
        const dayOfWeek = (now.getDay() + 6) % 7; // 0 = Mon
        currentMonday.setDate(now.getDate() - dayOfWeek + (offset * 7));

        const days = [];
        const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const dayLabels = ['Bazar e.', 'Çərş. a.', 'Çərşənbə', 'Cümə a.', 'Cümə', 'Şənbə', 'Bazar'];

        for (let i = 0; i < 7; i++) {
            const d = new Date(currentMonday);
            d.setDate(currentMonday.getDate() + i);
            days.push({
                date: d,
                dateStr: d.toISOString().split('T')[0],
                dayKey: dayKeys[i],
                label: dayLabels[i],
                displayDate: `${d.getDate()} / ${d.getMonth() + 1}`,
                isToday: d.toDateString() === new Date().toDateString()
            });
        }

        return `
            <div class="space-y-4 sm:space-y-5">
                <!-- Schedule Controls & Presets -->
                <div class="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between flex-wrap gap-3">
                    <div class="flex items-center gap-2">
                        <div class="inline-flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200/60 shadow-2xs">
                            <button type="button" onclick="BusinessDashboardView.navigateStaffScheduleWeek(-1)" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer" title="Əvvəlki həftə">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                            </button>
                            <button type="button" onclick="BusinessDashboardView.staffScheduleWeekOffset = 0; BusinessDashboardView.navigateStaffScheduleWeek(0);" class="px-3 h-8 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition cursor-pointer">
                                Bu həftə
                            </button>
                            <button type="button" onclick="BusinessDashboardView.navigateStaffScheduleWeek(1)" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer" title="Növbəti həftə">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                            </button>
                        </div>
                        <span class="text-xs font-bold text-slate-800">${days[0].displayDate} — ${days[6].displayDate}</span>
                    </div>

                    <!-- Quick Presets -->
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-xs text-slate-400 font-medium">Şablon tətbiq et:</span>
                        <button type="button" onclick="BusinessDashboardView.applySchedulePreset('5_2')" class="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer">
                            5/2 rejimi
                        </button>
                        <button type="button" onclick="BusinessDashboardView.applySchedulePreset('2_2')" class="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer">
                            2/2 növbəsi
                        </button>
                        ${ZeyvoUI.button({ label: "Hər gün (tam qrafik)", onClick: "BusinessDashboardView.applySchedulePreset('everyday')", size: "sm", type: "button" })}
                    </div>
                </div>

                <!-- Schedule Matrix Table -->
                <div class="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-slate-50 border-b border-slate-200/80 text-slate-600">
                                <tr>
                                    <th class="py-3 px-4 font-bold min-w-[200px]">Usta / Mütəxəssis</th>
                                    ${days.map(d => `
                                        <th class="py-3 px-3 text-center min-w-[110px] ${d.isToday ? 'bg-amber-50/70 border-x border-amber-200/60' : ''}">
                                            <div class="font-bold text-slate-900">${d.label}</div>
                                            <div class="text-[10px] text-slate-400 font-mono mt-0.5">${d.displayDate}</div>
                                        </th>
                                    `).join('')}
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${staffList.map(m => {
                                    return `
                                        <tr class="hover:bg-slate-50/60 transition">
                                            <td class="py-3.5 px-4">
                                                <div class="flex items-center gap-2.5">
                                                    <div class="w-8 h-8 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                                                        ${(m.avatar || m.photo || m.image) ? `<img src="${m.avatar || m.photo || m.image}" class="w-full h-full object-cover">` : `<div class="w-full h-full flex items-center justify-center font-bold text-xs text-slate-600">${m.name ? m.name[0] : 'U'}</div>`}
                                                    </div>
                                                    <div class="min-w-0">
                                                        <div class="font-bold text-xs text-slate-900 truncate">${m.name}</div>
                                                        <div class="text-[10px] text-slate-400 truncate">${m.role || 'Mütəxəssis'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            ${days.map(d => {
                                                const dayConf = m.workSchedule?.days?.[d.dayKey];
                                                const isWorking = dayConf ? dayConf.enabled !== false : true;
                                                const hoursText = isWorking ? `${dayConf?.start || '09:00'} – ${dayConf?.end || '19:00'}` : 'İstirahət';

                                                return `
                                                    <td class="py-2.5 px-2 text-center ${d.isToday ? 'bg-amber-50/30 border-x border-amber-200/40' : ''}">
                                                        <button type="button" onclick="BusinessDashboardView.toggleMasterShift('${m.id}', '${d.dayKey}')" class="w-full py-1.5 px-1 rounded-xl transition cursor-pointer text-center text-[11px] ${isWorking ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100 font-semibold' : 'bg-slate-100 text-slate-400 border border-slate-200/60 hover:bg-slate-200 font-normal'}">
                                                            ${hoursText}
                                                        </button>
                                                    </td>
                                                `;
                                            }).join('')}
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    renderStaffTeamSection: function() {
        const staffList = this.getStaffList();
        const services = this.getServices ? this.getServices() : [];
        const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const todayKey = dayKeys[new Date().getDay()];

        // Metrics
        const totalStaff = staffList.length;
        const workingToday = staffList.filter(s => s.status === 'active' && s.workSchedule?.days?.[todayKey]?.enabled).length;
        const onlineCount = staffList.filter(s => s.isOnlineBooking !== false && s.status === 'active').length;
        const totalRatings = staffList.reduce((sum, s) => sum + (parseFloat(s.rating) || 5), 0);
        const avgRating = totalStaff > 0 ? (totalRatings / totalStaff).toFixed(2) : '5.00';

        const filtered = this.getFilteredStaffList(staffList, todayKey);
        const hasAnyActiveFilter = (this.staffRoleFilter !== 'all') || (this.staffStatusFilter !== 'all') || (this.staffShiftFilter && this.staffShiftFilter !== 'all') || (this.staffOnlineFilter && this.staffOnlineFilter !== 'all') || (this.staffSearchQuery && this.staffSearchQuery.length > 0);

        return `
            <div class="space-y-6">
                <!-- 1. Top Statistics Row -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <!-- Total Staff -->
                    <button type="button" onclick="BusinessDashboardView.resetStaffFilters()" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${!hasAnyActiveFilter ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-2xs space-y-1 cursor-pointer">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Cəmi heyət</span>
                            <div class="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-[#FFDD2D] group-hover:text-black transition flex items-center justify-center text-slate-700">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl sm:text-3xl font-black text-slate-900 font-mono">${totalStaff} <span class="text-xs font-semibold text-slate-400">usta</span></div>
                        <p class="text-[11px] text-slate-400">Bütün filiallar üzrə mütəxəssislər</p>
                    </button>

                    <!-- Working Today -->
                    <button type="button" onclick="BusinessDashboardView.setStaffShiftFilter(BusinessDashboardView.staffShiftFilter === 'working' ? 'all' : 'working')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${this.staffShiftFilter === 'working' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-2xs space-y-1 cursor-pointer">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Bu gün növbədə</span>
                            <div class="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            </div>
                        </div>
                        <div class="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">${workingToday} <span class="text-xs font-semibold text-slate-400">usta</span></div>
                        <p class="text-[11px] text-slate-400">Cədvəl üzrə bu gün işləyənlər</p>
                    </button>

                    <!-- Online Booking Available -->
                    <button type="button" onclick="BusinessDashboardView.setStaffOnlineFilter(BusinessDashboardView.staffOnlineFilter === 'online' ? 'all' : 'online')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${this.staffOnlineFilter === 'online' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-2xs space-y-1 cursor-pointer">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Onlayn qəbulda</span>
                            <div class="w-7 h-7 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl sm:text-3xl font-black text-[#101114] font-mono">${onlineCount} <span class="text-xs font-semibold text-slate-400">aktiv</span></div>
                        <p class="text-[11px] text-slate-400">Müştərilər saytdan seçə bilir</p>
                    </button>

                    <!-- Average Rating -->
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-500">Orta reytinq</span>
                            <div class="w-7 h-7 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-xs font-black">
                                <svg class="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </div>
                        </div>
                        <div class="text-2xl sm:text-3xl font-black text-slate-900 font-mono flex items-center gap-1.5">
                            <svg class="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span>${avgRating}</span>
                        </div>
                        <p class="text-[11px] text-slate-400">Müştəri rəylərinin yekun balı</p>
                    </div>
                </div>

                <!-- 2. Controls & Filter Bar -->
                <div id="staffFilterBarContainer">
                    ${this.renderStaffFilterBarHtml(filtered.length, staffList.length)}
                </div>

                <!-- 3. Masters Content (List / Table View Only) -->
                <div id="staffContentContainer">
                    ${filtered.length === 0 ? this.renderStaffEmptyHtml() : this.renderStaffTableView(filtered, todayKey, services)}
                </div>
            </div>
        `;
    },

    renderStaffRolesSection: function() {
        const roles = this.getMasterRoles();
        const staffList = this.getStaffList();
        const typeFilter = this.rolesTypeFilter || 'all';
        const filtered = this.getFilteredMasterRoles(roles, staffList);

        const totalRoles = roles.length;
        const defaultCount = roles.filter(r => r.isDefault).length;
        const customCount = roles.filter(r => !r.isDefault).length;
        const assignedRolesCount = roles.filter(r => {
            return staffList.some(s => (s.role || '').trim().toLowerCase() === (r.name || '').trim().toLowerCase());
        }).length;
        const unassignedRolesCount = Math.max(0, totalRoles - assignedRolesCount);

        return `
            <div class="space-y-6">
                <!-- TOP METRIC CARDS -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <button type="button" onclick="BusinessDashboardView.setRolesTypeFilter('all')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${typeFilter === 'all' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-2xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Ümumi vəzifələr</span>
                            <span class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-[#FFDD2D] group-hover:text-black transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-black text-slate-900 font-mono">${totalRoles}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Mövcud bütün ixtisaslar</div>
                    </button>

                    <button type="button" onclick="BusinessDashboardView.setRolesTypeFilter('assigned')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${typeFilter === 'assigned' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-2xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Təyin olunmuş</span>
                            <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">${assignedRolesCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Ustası olan vəzifələr</div>
                    </button>

                    <button type="button" onclick="BusinessDashboardView.setRolesTypeFilter('default')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${typeFilter === 'default' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-2xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Standart şablonlar</span>
                            <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition">
                                <span class="text-[10px] font-black">STD</span>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-black text-slate-900 font-mono">${defaultCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Sistem şablonları</div>
                    </button>

                    <button type="button" onclick="BusinessDashboardView.setRolesTypeFilter('custom')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${typeFilter === 'custom' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-2xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Fərdi vəzifələr</span>
                            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-100 transition">
                                <span class="text-[10px] font-black">FƏRDİ</span>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-black text-slate-900 font-mono">${customCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Salon tərəfindən yaradılan</div>
                    </button>
                </div>

                <!-- CONTROLS & FILTER BAR -->
                <div class="space-y-3">
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                        <div class="relative flex-1 min-w-0">
                            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </span>
                            <input type="text"
                                   id="rolesSearchInput"
                                   value="${this.escapeHtml(this.rolesSearchQuery || '')}"
                                   oninput="BusinessDashboardView.setRolesSearch(this.value)"
                                   placeholder="Vəzifə adı və ya təsvir üzrə axtarış..."
                                   class="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs">
                            <button type="button"
                                    id="rolesSearchClearBtn"
                                    onclick="BusinessDashboardView.clearRolesSearch()"
                                    class="${this.rolesSearchQuery ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
                                    title="Təmizlə">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                            </button>
                        </div>
                        <div class="shrink-0 sm:w-64">
                            <select id="rolesTypeFilterSelect"
                                    onchange="BusinessDashboardView.setRolesTypeFilter(this.value)"
                                    class="w-full h-11 pl-3.5 pr-9 rounded-2xl bg-white border ${typeFilter !== 'all' ? 'border-slate-900 ring-2 ring-tbank-yellow/40 font-bold text-slate-900' : 'border-slate-200/80 text-slate-700 font-semibold'} text-xs outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-2xs cursor-pointer">
                                <option value="all" ${typeFilter === 'all' ? 'selected' : ''}>Bütün vəzifələr (${totalRoles})</option>
                                <option value="assigned" ${typeFilter === 'assigned' ? 'selected' : ''}>Təyin olunmuş heyət (${assignedRolesCount})</option>
                                <option value="unassigned" ${typeFilter === 'unassigned' ? 'selected' : ''}>Təyin edilməmiş vəzifələr (${unassignedRolesCount})</option>
                                <option value="default" ${typeFilter === 'default' ? 'selected' : ''}>Standart şablonlar (${defaultCount})</option>
                                <option value="custom" ${typeFilter === 'custom' ? 'selected' : ''}>Fərdi vəzifələr (${customCount})</option>
                            </select>
                        </div>
                    </div>
                    <div id="rolesActiveChipsContainer">
                        ${this.renderRolesActiveChipsHtml()}
                    </div>
                </div>

                <!-- ROLES CARDS CONTAINER -->
                <div id="rolesCardsContainer">
                    ${this.renderRolesCardsHtml(filtered, staffList)}
                </div>
            </div>
        `;
    },

    renderStaffScheduleSection: function() {
        const staffList = this.getStaffList();
        const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const todayKey = dayKeys[new Date().getDay()];
        const workingToday = staffList.filter(s => s.status === 'active' && s.workSchedule?.days?.[todayKey]?.enabled).length;
        const restingToday = staffList.length - workingToday;

        return `
            <div class="space-y-6">
                <!-- SCHEDULE STATS -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                        <span class="text-xs font-semibold text-slate-500">Cəmi heyət</span>
                        <div class="text-2xl sm:text-3xl font-black text-slate-900 font-mono">${staffList.length}</div>
                        <p class="text-[11px] text-slate-400">Qrafikdə qeydiyyatda olanlar</p>
                    </div>
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                        <span class="text-xs font-semibold text-slate-500">Bu gün növbədə</span>
                        <div class="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">${workingToday}</div>
                        <p class="text-[11px] text-slate-400">Aktiv xidmət göstərənlər</p>
                    </div>
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                        <span class="text-xs font-semibold text-slate-500">İstirahət günü</span>
                        <div class="text-2xl sm:text-3xl font-black text-slate-500 font-mono">${restingToday}</div>
                        <p class="text-[11px] text-slate-400">Bu gün növbəsi olmayanlar</p>
                    </div>
                </div>

                <!-- SCHEDULE MATRIX TABLE -->
                <div class="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
                    <div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h4 class="font-bold text-sm text-slate-900">Həftəlik Növbə Cədvəli</h4>
                            <p class="text-xs text-slate-400 font-medium">Hər bir ustanın günlər üzrə iş saatları</p>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        ${this.getScheduleMatrixTableHtml ? this.getScheduleMatrixTableHtml() : ''}
                    </div>
                </div>
            </div>
        `;
    },

    renderStaffTableView: function(masters, todayKey, services) {
        const totalItems = (masters || []).length;
        const pageSize = this.staffPageSize || 10;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        if (this.staffCurrentPage > totalPages) this.staffCurrentPage = totalPages;
        if (this.staffCurrentPage < 1) this.staffCurrentPage = 1;
        const startIndex = (this.staffCurrentPage - 1) * pageSize;
        const paginatedMasters = (masters || []).slice(startIndex, startIndex + pageSize);

        const getSalaryLabel = (master) => {
            const s = master.salaryScheme;
            if (!s) return '40% faiz';
            if (s.type === 'fixed') return `${s.fixedSalary || 0} ₼ sabit`;
            if (s.type === 'fixed_plus_commission') return `${s.fixedSalary || 0} ₼ + ${s.serviceCommission !== undefined ? s.serviceCommission : 40}%`;
            if (s.type === 'booth_rental') {
                const rd = s.rentDetails || {};
                const typeLabel = rd.rentalType === 'daily' ? 'gün' : (rd.rentalType === 'weekly' ? 'həftə' : 'ay');
                return `Yer icarəsi: ${rd.rentalAmount || 0} ₼/${typeLabel}`;
            }
            return `${s.serviceCommission !== undefined ? s.serviceCommission : 40}% faiz`;
        };

        return `
            <div class="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <!-- 1. MOBILE CARD VIEW (< sm) -->
                <div class="block sm:hidden divide-y divide-slate-100">
                    ${paginatedMasters.map(master => {
                        const assignedCount = (master.serviceIds || []).length;
                        const todayShift = master.workSchedule?.days?.[todayKey];
                        const isWorking = master.status === 'active' && todayShift && todayShift.enabled;
                        const isDismissed = master.status === 'dismissed';
                        const salaryText = getSalaryLabel(master);

                        return `
                            <div class="p-4 space-y-3 hover:bg-slate-50/50 transition">
                                <!-- Top Row: Avatar + Name/Role + Online Toggle -->
                                <div class="flex items-start justify-between gap-3">
                                    <div class="flex items-center gap-3 min-w-0">
                                        <div class="relative shrink-0">
                                            ${master.avatar ? `
                                                <img src="${master.avatar}" class="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200">
                                            ` : `
                                                <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-sm ring-1 ring-slate-200">
                                                    ${(master.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                </div>
                                            `}
                                            <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${isDismissed ? 'bg-rose-500' : (isWorking ? 'bg-emerald-500' : 'bg-slate-300')}"></span>
                                        </div>
                                        <div class="min-w-0">
                                            <div class="font-bold text-slate-900 text-sm truncate leading-tight">${BusinessDashboardView.escapeHtml(master.name)}</div>
                                            <div class="text-xs text-amber-600 font-semibold truncate mt-0.5">${BusinessDashboardView.escapeHtml(master.role || 'Mütəxəssis')}</div>
                                            <div class="text-[11px] text-amber-500 font-bold flex items-center gap-1 mt-0.5">
                                                <svg class="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                                <span>${master.rating || '5.00'}</span>
                                                <span class="text-slate-400 font-normal">(${master.reviewsCount || 0} rəy)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Quick Online Toggle Button -->
                                    <button type="button" onclick="BusinessDashboardView.toggleMasterOnlineBookingQuick('${master.id}', event)" class="w-8 h-8 rounded-xl ${master.isOnlineBooking !== false ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-100 text-slate-400'} flex items-center justify-center shrink-0 transition active:scale-95 shadow-2xs cursor-pointer" title="${master.isOnlineBooking !== false ? 'Onlayn qəbul aktivdir' : 'Onlayn qəbul qapalıdır'}">
                                        ${master.isOnlineBooking !== false ? `
                                            <svg class="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                        ` : `
                                            <svg class="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                        `}
                                    </button>
                                </div>

                                <!-- Info Badges Row -->
                                <div class="flex flex-wrap items-center gap-2 text-xs">
                                    <!-- Status Badge -->
                                    ${isDismissed ? `
                                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 font-semibold border border-rose-200/80">
                                            <span class="w-2 h-2 rounded-full bg-rose-500"></span>
                                            <span>İşdən azad edilib</span>
                                        </span>
                                    ` : `
                                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl ${isWorking ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' : 'bg-slate-100 text-slate-600'} font-semibold">
                                            <span class="w-2 h-2 rounded-full ${isWorking ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                                            <span>${master.status === 'vacation' ? 'Məzuniyyət' : (isWorking ? `Növbədə (${todayShift.start})` : 'İstirahət günü')}</span>
                                        </span>
                                    `}

                                    <!-- Services Button -->
                                    <button type="button" onclick="BusinessDashboardView.openCreateMasterModal('${master.id}', 'services')" class="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer">
                                        ${assignedCount} xidmət
                                    </button>

                                    <!-- Salary text -->
                                    <span class="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 font-medium text-xs">
                                        ${salaryText}
                                    </span>
                                </div>

                                <!-- Contact & Dismissal Note -->
                                <div class="flex items-center justify-between text-xs text-slate-500 pt-0.5">
                                    ${master.phone ? `
                                        <a href="tel:${master.phone}" class="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-medium">
                                            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                            <span>${master.phone}</span>
                                        </a>
                                    ` : `<span>Telefon yoxdur</span>`}

                                    ${isDismissed && master.dismissalInfo?.reason ? `
                                        <button type="button" onclick="BusinessDashboardView.openDismissalDetailsModal('${master.id}')" class="text-rose-600 hover:underline font-semibold text-[11px] truncate max-w-[150px]">
                                            ${BusinessDashboardView.escapeHtml(master.dismissalInfo.reason)}
                                        </button>
                                    ` : ''}
                                </div>

                                <!-- Action Buttons Row -->
                                <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                                    ${isDismissed ? `
                                        <button type="button" onclick="BusinessDashboardView.openRehireMasterModal('${master.id}')" class="flex-1 h-9 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m19 11 2 2 4-4"/></svg>
                                            <span>İşə bərpa et</span>
                                        </button>
                                    ` : `
                                        <button type="button" onclick="BusinessDashboardView.openCreateMasterModal('${master.id}', 'schedule')" class="flex-1 h-9 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer" title="İş qrafiki">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                            <span>Qrafik</span>
                                        </button>
                                        <button type="button" onclick="BusinessDashboardView.openCreateMasterModal('${master.id}', 'info')" class="flex-1 h-9 px-2 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                            <span>Redaktə</span>
                                        </button>
                                        <button type="button" onclick="BusinessDashboardView.openDismissMasterModal('${master.id}')" class="h-9 px-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition flex items-center justify-center cursor-pointer" title="İşdən azad et">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
                                        </button>
                                    `}
                                    <button type="button" onclick="BusinessDashboardView.deleteMaster('${master.id}')" class="h-9 px-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition flex items-center justify-center cursor-pointer" title="Sil">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- 2. DESKTOP TABLE VIEW (>= sm) -->
                <div class="hidden sm:block overflow-x-auto">
                    <table class="w-full text-left text-xs min-w-[860px]">
                        <thead class="bg-slate-50/80 text-xs font-semibold text-slate-600 border-b border-slate-100">
                            <tr>
                                <th class="p-4">Usta</th>
                                <th class="p-4">Vəzifə və ixtisas</th>
                                <th class="p-4">Əlaqə</th>
                                <th class="p-4">Status və növbə</th>
                                <th class="p-4">Xidmətlər</th>
                                <th class="p-4">Əməkhaqqı / Faiz</th>
                                <th class="p-4 text-center">Onlayn</th>
                                <th class="p-4 text-right">Əməliyyatlar</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 font-medium text-slate-800">
                            ${paginatedMasters.map(master => {
                                const assignedCount = (master.serviceIds || []).length;
                                const todayShift = master.workSchedule?.days?.[todayKey];
                                const isWorking = master.status === 'active' && todayShift && todayShift.enabled;
                                const salaryText = getSalaryLabel(master);

                                return `
                                    <tr class="hover:bg-slate-50/70 transition">
                                        <td class="p-4">
                                            <div class="flex items-center gap-3">
                                                ${master.avatar ? `
                                                    <img src="${master.avatar}" class="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0">
                                                ` : `
                                                    <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-slate-200">
                                                        ${(master.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                    </div>
                                                `}
                                                <div>
                                                    <div class="font-bold text-slate-900">${BusinessDashboardView.escapeHtml(master.name)}</div>
                                                    <div class="text-[11px] text-amber-500 font-bold flex items-center gap-1"><svg class="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> <span>${master.rating || '5.00'}</span> <span class="text-slate-400 font-normal">(${master.reviewsCount || 0})</span></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="p-4">
                                            <div class="font-bold text-slate-900">${BusinessDashboardView.escapeHtml(master.role || '—')}</div>
                                            <div class="text-[11px] text-slate-400">${BusinessDashboardView.escapeHtml(master.specialization || 'Standart')}</div>
                                        </td>
                                        <td class="p-4 font-mono text-[11px]">
                                            <div><a href="tel:${master.phone}" class="hover:underline text-slate-800">${master.phone || '—'}</a></div>
                                            ${master.email ? `<div class="text-[10px] text-slate-400">${master.email}</div>` : ''}
                                        </td>
                                        <td class="p-4">
                                            ${master.status === 'dismissed' ? `
                                                <div class="flex flex-col gap-0.5">
                                                    <div class="flex items-center gap-1.5">
                                                        <span class="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                                                        <span class="text-xs font-semibold text-rose-700">İşdən azad edilib</span>
                                                    </div>
                                                    <button type="button" onclick="BusinessDashboardView.openDismissalDetailsModal('${master.id}')" class="text-[11px] text-slate-500 hover:text-slate-900 underline text-left cursor-pointer truncate max-w-[150px]" title="${BusinessDashboardView.escapeHtml(master.dismissalInfo?.reason || 'Xitam təfərrüatları')}">
                                                        ${BusinessDashboardView.escapeHtml(master.dismissalInfo?.reason || 'Səbəbə bax')}
                                                    </button>
                                                </div>
                                            ` : `
                                                <div class="flex items-center gap-1.5">
                                                    <span class="w-2 h-2 rounded-full ${isWorking ? 'bg-emerald-500' : 'bg-slate-300'} shrink-0"></span>
                                                    <span class="text-xs font-semibold ${isWorking ? 'text-emerald-700' : 'text-slate-500'}">${master.status === 'vacation' ? 'Məzuniyyət' : (isWorking ? `Növbədə (${todayShift.start})` : 'İstirahət')}</span>
                                                </div>
                                            `}
                                        </td>
                                        <td class="p-4">
                                            <button type="button" onclick="BusinessDashboardView.openCreateMasterModal('${master.id}', 'services')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer">
                                                ${assignedCount} xidmət
                                            </button>
                                        </td>
                                        <td class="p-4">
                                            <span class="font-bold text-slate-900">${salaryText}</span>
                                        </td>
                                        <td class="p-4 text-center">
                                            <button type="button" onclick="BusinessDashboardView.toggleMasterOnlineBookingQuick('${master.id}', event)" class="w-7 h-7 rounded-full ${master.isOnlineBooking !== false ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-100 text-slate-400'} flex items-center justify-center mx-auto transition active:scale-95 shadow-2xs cursor-pointer" title="${master.isOnlineBooking !== false ? 'Onlayn qəbul aktivdir' : 'Onlayn qəbul qapalıdır'}">
                                                ${master.isOnlineBooking !== false ? `
                                                    <svg class="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                ` : `
                                                    <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                                `}
                                            </button>
                                        </td>
                                        <td class="p-4 text-right">
                                            <div class="flex items-center justify-end gap-1.5">
                                                ${master.status === 'dismissed' ? `
                                                    <button type="button" onclick="BusinessDashboardView.openRehireMasterModal('${master.id}')" class="h-8 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 flex items-center gap-1.5 text-xs font-semibold transition cursor-pointer" title="Yenidən işə qəbul et">
                                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m19 11 2 2 4-4"/></svg>
                                                        <span class="hidden sm:inline">İşə bərpa et</span>
                                                    </button>
                                                ` : `
                                                    <button type="button" onclick="BusinessDashboardView.openCreateMasterModal('${master.id}', 'schedule')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer" title="İş qrafiki">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                                    </button>
                                                    <button type="button" onclick="BusinessDashboardView.openDismissMasterModal('${master.id}')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 flex items-center justify-center transition cursor-pointer" title="İşdən azad et">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
                                                    </button>
                                                `}
                                                <button type="button" onclick="BusinessDashboardView.openCreateMasterModal('${master.id}', 'info')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer" title="Redaktə et">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                                </button>
                                                <button type="button" onclick="BusinessDashboardView.deleteMaster('${master.id}')" class="w-8 h-8 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition cursor-pointer" title="Sil">
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
                    currentPage: this.staffCurrentPage,
                    pageSize: pageSize,
                    onPageChange: 'BusinessDashboardView.setStaffPage',
                    onPageSizeChange: 'BusinessDashboardView.setStaffPageSize',
                    itemName: 'usta'
                })}
            </div>
        `;
    },

    // ==========================================
    // TAB: FINANCE & CASH REGISTER
    // ==========================================
    renderFinanceTab: function() {
        return this.renderFinanceModule();
    },

    // ==========================================
    // TAB: BUSINESS USER PROFILE & SALON SETTINGS (6 SECTIONS)
    // ==========================================
    switchProfileTab: function(subTab) {
        this.profileActiveTab = subTab;
        const container = document.getElementById('bizCanvasBody');
        if (container) {
            container.innerHTML = this.renderActiveTabContent();
        } else {
            this.switchTab('profile');
        }
    },

    renderCanvasHeader: function() {
        if (this.activeTab === 'biznes') {
            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-4xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                Biznes
                            </h1>
                        </div>

                        <!-- Right: Actions -->
                        <div class="flex items-center gap-2">
                            <button type="button" onclick="BusinessDashboardView.openCreateBusinessModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-medium transition shadow-xs flex items-center gap-1.5 active:scale-95" title="Yeni biznes və ya fərdi usta əlavə et">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                <span>Yeni biznes və ya fərdi usta</span>
                            </button>
                        </div>
                    </div>
                </header>
            `;
        }

        if (this.activeTab === 'resources') {
            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-5xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                Resurslar
                            </h1>
                        </div>

                        <!-- Right: Actions -->
                        <div class="flex items-center gap-2">
                            <button type="button" onclick="BusinessDashboardView.openCreateResourceCategoryModal()" class="h-9 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition flex items-center gap-1.5 active:scale-95 shadow-2xs" title="Yeni kateqoriya yarat">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                <span>Yeni kateqoriya</span>
                            </button>
                            <button type="button" onclick="BusinessDashboardView.openCreateResourceModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-medium transition shadow-xs flex items-center gap-1.5 active:scale-95" title="Yeni resurs əlavə et">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                <span>Yeni resurs</span>
                            </button>
                        </div>
                    </div>
                </header>
            `;
        }

        if (this.activeTab === 'products') {
            const sub = this.productsActiveTab || 'balances';
            let titleText = 'Məhsullar';
            let subTitle = '';
            let actionsHtml = '';

            if (sub === 'balances') {
                titleText = 'Qalıqlar';
                subTitle = 'Stok və anbar qalıqları';
                actionsHtml = `
                    <button type="button" onclick="BusinessDashboardView.openPosModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-semibold transition shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer" title="Sürətli kassa satışı">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                        <span>Kassa satışı (POS)</span>
                    </button>
                `;
            } else if (sub === 'warehouses') {
                titleText = 'Anbarlar';
                subTitle = 'Saxlanc məntəqələri və zonalar';
                actionsHtml = `
                    <button type="button" onclick="BusinessDashboardView.openCreateWarehouseModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-medium transition shadow-xs flex items-center gap-1.5 active:scale-95" title="Yeni anbar əlavə et">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni anbar</span>
                    </button>
                `;
            } else if (sub === 'catalog') {
                titleText = 'Bütün məhsullar';
                subTitle = 'Nomenklatura və kateqoriyalar';
                actionsHtml = `
                    <button type="button" onclick="BusinessDashboardView.openCreateProductCategoryModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-medium transition shadow-xs flex items-center gap-1.5 active:scale-95" title="Yeni kateqoriya yarat">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni kateqoriya</span>
                    </button>
                `;
            } else if (sub === 'techcards') {
                titleText = 'Texnoloji kartlar';
                subTitle = 'Xidmət üzrə sərfiyyat reseptləri';
                actionsHtml = `
                    <button type="button" onclick="BusinessDashboardView.openCreateTechCardModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-medium transition shadow-xs flex items-center gap-1.5 active:scale-95" title="Yeni texnoloji kart əlavə et">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni texnoloji kart</span>
                    </button>
                `;
            } else if (sub === 'operations') {
                titleText = 'Anbar əməliyyatları';
                subTitle = 'Mədaxil, məxaric və transferlər';
                actionsHtml = `
                    <button type="button" onclick="BusinessDashboardView.openCreateOperationModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-medium transition shadow-xs flex items-center gap-1.5 active:scale-95" title="Yeni əməliyyat yarat">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni əməliyyat</span>
                    </button>
                `;
            } else if (sub === 'inventory') {
                titleText = 'İnventarizasiya';
                subTitle = 'Faktiki qalıqların yoxlanılması və sayım aktları';
                actionsHtml = `
                    <button type="button" onclick="BusinessDashboardView.openCreateAuditModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-semibold transition shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer" title="Yeni inventarizasiya apar">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni inventarizasiya</span>
                    </button>
                `;
            } else if (sub === 'suppliers') {
                titleText = 'Təchizatçılar';
                subTitle = 'Tərəfdaş şirkətlər və kontragentlər';
                actionsHtml = `
                    <button type="button" onclick="BusinessDashboardView.openCreateSupplierModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-semibold transition shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer" title="Yeni təchizatçı əlavə et">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni təchizatçı</span>
                    </button>
                `;
            }

            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-5xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <div>
                                <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                    ${titleText}
                                </h1>
                                ${subTitle ? `<p class="text-[11px] text-slate-400 font-normal hidden sm:block">${subTitle}</p>` : ''}
                            </div>
                        </div>

                        <!-- Right: Actions -->
                        <div class="flex items-center gap-2">
                            ${actionsHtml}
                        </div>
                    </div>
                </header>
            `;
        }

        if (this.activeTab === 'services') {
            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-5xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <div>
                                <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                    Xidmətlər
                                </h1>
                                <p class="text-[11px] text-slate-400 font-normal hidden sm:block">Xidmətlər, qiymət kataloqu və icra müddəti</p>
                            </div>
                        </div>

                        <!-- Right: Actions - Add Category & Add Service -->
                        <div class="flex items-center gap-2">
                            <button type="button" onclick="BusinessDashboardView.openCreateServiceCategoryModal()" class="h-9 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs" title="Yeni kateqoriya yarat">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                <span class="hidden sm:inline">Yeni kateqoriya</span>
                                <span class="sm:hidden">Kateqoriya</span>
                            </button>
                            <button type="button" onclick="BusinessDashboardView.openCreateServiceModal(null, '')" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-semibold transition shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer" title="Yeni xidmət əlavə et">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                <span>Yeni xidmət</span>
                            </button>
                        </div>
                    </div>
                </header>
            `;
        }

        if (this.activeTab === 'staff') {
            const sub = this.staffActiveTab || 'team';
            let titleText = 'Ustalar və Heyət';
            let subTitle = 'Mütəxəssislər, iş cədvəli və komissiyalar';
            let actionsHtml = `
                <button type="button" onclick="BusinessDashboardView.openMasterScheduleOverviewModal()" class="h-9 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs" title="Ümumi iş qrafikinə bax">
                    <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span class="hidden sm:inline">İş qrafiki</span>
                    <span class="sm:hidden">Qrafik</span>
                </button>
                <button type="button" onclick="BusinessDashboardView.openCreateMasterModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-semibold transition shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer" title="Yeni usta əlavə et">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                    <span>Yeni usta</span>
                </button>
            `;

            if (sub === 'roles') {
                titleText = 'Vəzifələr və Rollar';
                subTitle = 'Mütəxəssis vəzifələrinin siyahısı, standart komissiyalar və fərdi vəzifələr';
                actionsHtml = `
                    <button type="button" onclick="BusinessDashboardView.openCreateMasterRoleModal()" class="h-9 px-4 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-semibold transition shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer" title="Yeni vəzifə əlavə et">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni vəzifə</span>
                    </button>
                `;
            }

            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <div>
                                <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                    ${titleText}
                                </h1>
                                ${subTitle ? `<p class="text-[11px] text-slate-400 font-normal hidden sm:block">${subTitle}</p>` : ''}
                            </div>
                        </div>

                        <!-- Right: Actions -->
                        <div class="flex items-center gap-2">
                            ${actionsHtml}
                        </div>
                    </div>
                </header>
            `;
        }

        if (this.activeTab === 'clients') {
            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <div>
                                <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                    Müştərilər
                                </h1>
                                <p class="text-[11px] text-slate-400 font-normal hidden sm:block">Müştəri bazası, ziyarət tarixçəsi və fərdi balanslar</p>
                            </div>
                        </div>

                        <!-- Right: Actions -->
                        <div class="flex items-center gap-2">
                            <button type="button" onclick="BusinessDashboardView.openImportClientsModal()" class="px-3 sm:px-3.5 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer active:scale-95" title="Müştəriləri CSV faylından idxal et">
                                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4-4m0 0l4 4m-4-4v12"/></svg>
                                <span class="hidden sm:inline">İdxal</span>
                            </button>
                            <button type="button" onclick="BusinessDashboardView.openExportClientsModal()" class="px-3 sm:px-3.5 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer active:scale-95" title="Müştəri bazasını ixrac et">
                                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                <span class="hidden sm:inline">İxrac</span>
                            </button>
                            <button type="button" onclick="BusinessDashboardView.openClientModal()" class="px-3.5 sm:px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                <span>Yeni müştəri</span>
                            </button>
                        </div>
                    </div>
                </header>
            `;
        }

        if (this.activeTab === 'integrations') {
            const count = this.getInstalledIntegrationsCount ? this.getInstalledIntegrationsCount() : 1;
            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <div>
                                <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                    İnteqrasiyalar
                                </h1>
                                <p class="text-[11px] text-slate-400 font-normal hidden sm:block">WhatsApp, botlar və avtomatlaşdırma marketplace-i</p>
                            </div>
                        </div>

                        <!-- Right: Actions -->
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60 shadow-2xs">
                                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>${count} aktiv inteqrasiya</span>
                            </span>
                        </div>
                    </div>
                </header>
            `;
        }

        if (this.activeTab === 'loyalty') {
            const sub = this.loyaltyActiveTab || 'cards_cashback';
            let actionBtn = '';
            if (sub === 'gift_cards') {
                actionBtn = `
                    <button type="button" onclick="BusinessDashboardView.openAddCertificateModal()" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni hədiyyə kartı</span>
                    </button>
                `;
            } else if (sub === 'subscriptions') {
                actionBtn = `
                    <button type="button" onclick="BusinessDashboardView.openAddSubscriptionModal()" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni abunəlik</span>
                    </button>
                `;
            } else {
                actionBtn = `
                    <button type="button" onclick="BusinessDashboardView.openAddLoyaltyCardRuleModal()" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni kart / qayda</span>
                    </button>
                `;
            }

            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <div>
                                <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                    Loyallıq Proqramı
                                </h1>
                                <p class="text-[11px] text-slate-400 font-normal hidden sm:block">Loyallıq kartları, hədiyyə kartları və abunəliklər</p>
                            </div>
                        </div>

                        <!-- Right: Actions -->
                        <div class="flex items-center gap-2">
                            ${actionBtn}
                        </div>
                    </div>
                </header>
            `;
        }

        if (this.activeTab === 'marketing') {
            const sub = this.marketingActiveTab || 'campaigns';
            let actionBtn = '';
            if (sub === 'promocodes') {
                actionBtn = `
                    <button type="button" onclick="BusinessDashboardView.openAddMarketingPromocodeModal()" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni promokod</span>
                    </button>
                `;
            } else if (sub === 'referral') {
                actionBtn = `
                    <button type="button" onclick="BusinessDashboardView.openEditReferralRulesModal()" class="px-3.5 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                        <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        <span>Qaydaları redaktə et</span>
                    </button>
                `;
            } else if (sub === 'segments') {
                actionBtn = `
                    <button type="button" onclick="BusinessDashboardView.openAddMarketingCampaignModal(null, 'all')" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Kampaniya başlat</span>
                    </button>
                `;
            } else if (sub === 'reviews') {
                actionBtn = `
                    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200/60 shadow-2xs">
                        <svg class="w-3.5 h-3.5 text-amber-500 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        <span>Reytinq: 4.9 / 5.0</span>
                    </span>
                `;
            } else {
                actionBtn = `
                    <button type="button" onclick="BusinessDashboardView.openAddMarketingCampaignModal()" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni kampaniya</span>
                    </button>
                `;
            }

            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <div>
                                <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                    Marketinq
                                </h1>
                                <p class="text-[11px] text-slate-400 font-normal hidden sm:block">Kampaniyalar, bildirişlər, promokodlar, seqmentlər, referal və rəylər</p>
                            </div>
                        </div>

                        <!-- Right: Actions -->
                        <div class="flex items-center gap-2">
                            ${actionBtn}
                        </div>
                    </div>
                </header>
            `;
        }

        if (this.activeTab === 'finance') {
            const sub = this.financeActiveTab || 'accounts';
            let actionBtn = '';
            if (sub === 'transactions') {
                actionBtn = `
                    <button type="button" onclick="BusinessDashboardView.openFinanceTransactionModal()" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni əməliyyat</span>
                    </button>
                `;
            } else if (sub === 'payroll') {
                actionBtn = `
                    <button type="button" onclick="BusinessDashboardView.openFinancePayrollModal()" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Maaş / Avans ödə</span>
                    </button>
                `;
            } else if (sub === 'categories') {
                actionBtn = `
                    <button type="button" onclick="BusinessDashboardView.openFinanceCategoryModal()" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                        <span>Yeni kateqoriya</span>
                    </button>
                `;
            } else {
                actionBtn = `
                    <div class="flex items-center gap-2">
                        <button type="button" onclick="BusinessDashboardView.openPosModal()" class="px-4 h-9 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95" title="Kassa satışı aç">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                            <span>Kassa satışı (POS)</span>
                        </button>
                        <button type="button" onclick="BusinessDashboardView.openFinanceTransferModal()" class="px-3.5 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                            <span>Daxili köçürmə</span>
                        </button>
                        <button type="button" onclick="BusinessDashboardView.openFinanceAccountModal()" class="px-3.5 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                            <span>Yeni hesab</span>
                        </button>
                    </div>
                `;
            }

            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <div>
                                <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                    Maliyyə & Kassa
                                </h1>
                                <p class="text-[11px] text-slate-400 font-normal hidden sm:block">Kassa növbələri, nağd və qeyri-nağd hesablar, əməliyyatlar və maaş hesabatı</p>
                            </div>
                        </div>

                        <!-- Right: Actions -->
                        <div class="flex items-center gap-2">
                            ${actionBtn}
                        </div>
                    </div>
                </header>
            `;
        }


        if (this.activeTab === 'profile' || this.activeTab === 'settings') {
            const partner = this.getPartnerUser();
            return `
                <header class="border-b border-slate-100 shrink-0 bg-white">
                    <div class="max-w-4xl mx-auto px-4 sm:px-7 flex items-center justify-between py-3.5 sm:py-4">
                        <!-- Left: Profile Title & Account status -->
                        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                            <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </button>

                            <div>
                                <h1 class="text-lg sm:text-xl font-bold tracking-tight text-tbank-graphite truncate">
                                    İstifadəçi Profili & Tənzimləmələr
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>
            `;
        }



        let headerActions = '';

        return `
            <header class="px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-between border-b border-slate-100 shrink-0 bg-white">
                <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                    <button onclick="BusinessDashboardView.toggleSidebar(true)" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                    </button>
                    <h1 id="bizCanvasTitle" class="text-lg sm:text-xl font-bold tracking-tight text-slate-900 truncate">
                        ${this.getTabTitle()}
                    </h1>
                </div>
                ${headerActions ? `<div class="flex items-center gap-2">${headerActions}</div>` : ''}
            </header>
        `;
    },

    renderProfilePage: function() {
        const partner = this.getPartnerUser();
        const cleanPhone = (partner.phone || '').replace('+994', '').trim();
        const activeSub = this.profileActiveTab || 'personal';

        const subTabs = [
            { id: 'personal', label: 'Şəxsi məlumatlar' },
            { id: 'startpage', label: 'Başlanğıc səhifə' },
            { id: 'messengers', label: 'Mesencerlər' },
            { id: 'social', label: 'Sosial şəbəkələr' },
            { id: 'apps', label: 'Qoşulmuş tətbiqlər' },
            { id: 'security', label: 'Təhlükəsizlik' }
        ];

        return `
            <div class="max-w-4xl mx-auto px-4 py-5 sm:px-7 sm:py-7 space-y-5">
                <!-- 1. USER IDENTITY BANNER: EXACT STYLE FROM REGULAR SITE (#profileModal) -->
                <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-tbank-graphite via-[#2A2B30] to-[#121316] text-white flex items-center justify-between gap-4 shadow-md border border-black/10">
                    <div class="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        <!-- Squircle Avatar with Gold Border (Exact Regular Site Style) -->
                        <div class="relative group cursor-pointer shrink-0" onclick="document.getElementById('bizAvatarFileInput').click()" title="Foto yükləmək üçün klikləyin">
                            <div class="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-tbank-yellow/60 flex items-center justify-center text-2xl font-black text-tbank-yellow shadow-inner overflow-hidden relative">
                                ${partner.avatar ? `
                                    <img id="bizProfileAvatarPreview" 
                                         src="${partner.avatar}" 
                                         alt="${partner.ownerName}" 
                                         onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');" 
                                         class="w-full h-full object-cover">
                                    <div class="hidden w-full h-full flex items-center justify-center bg-[#FFDD2D] text-[#101114] text-xl font-black">
                                        ${(partner.ownerName || 'LM').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </div>
                                ` : `
                                    <div class="w-full h-full flex items-center justify-center bg-white/10 text-tbank-yellow text-xl font-black">
                                        ${(partner.ownerName || 'LM').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </div>
                                `}
                            </div>
                            <!-- Camera badge -->
                            <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-tbank-yellow text-tbank-graphite flex items-center justify-center shadow-md border-2 border-[#1F2024] group-hover:scale-110 transition"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div>
                            <!-- Delete button (matching regular profile exactly) -->
                            ${partner.avatar ? `
                                <button id="bizProfileDeleteAvatarBtn" type="button" onclick="event.stopPropagation(); BusinessDashboardView.removeAvatar()" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md border-2 border-[#1F2024] transition transform hover:scale-110" title="Şəkli sil"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                            ` : ''}
                            <input type="file" id="bizAvatarFileInput" accept="image/*" class="hidden" onchange="BusinessDashboardView.handleAvatarUpload(event)">
                        </div>

                        <div class="min-w-0">
                            <div class="flex items-center gap-1.5 flex-wrap">
                                <h3 id="bizProfileDisplayName" class="text-base sm:text-lg font-bold tracking-tight leading-tight truncate text-white">${partner.ownerName}</h3>
                                <span id="bizProfileGenderBadge" class="${partner.gender ? '' : 'hidden'} text-[10px] font-black px-1.5 py-0.2 rounded ${partner.gender === 'female' ? 'bg-pink-500/80 text-white' : 'bg-blue-500/80 text-white'} shrink-0">${partner.gender === 'female' ? 'Qadın' : (partner.gender === 'male' ? 'Kişi' : '')}</span>
                            </div>
                            <p id="bizProfileDisplayEmail" class="text-xs text-slate-300 font-medium truncate mt-0.5">${partner.email}</p>
                            <p class="text-[11px] text-slate-400 font-medium truncate mt-0.5">${partner.phone || '+994 50 234-56-78'}</p>
                        </div>
                    </div>
                </div>

                <!-- 2. NAVIGATION TABS WITH REAL ROUTES (SHARED REUSABLE COMPONENT) -->
                ${this.renderSegmentedTabs({
                    tabs: subTabs,
                    activeId: activeSub,
                    isLink: true,
                    linkPrefix: '#/business/profile/'
                })}

                <!-- 3. SUB-TAB CONTENT RENDERER -->
                <div id="bizProfileSubContent">
                    ${this.renderProfileSubTabContent(activeSub, partner, cleanPhone)}
                </div>
            </div>
        `;
    },

    renderProfileSubTabContent: function(activeSub, partner, cleanPhone) {
        switch (activeSub) {
            case 'personal':
                return this.renderSectionPersonal(partner, cleanPhone);
            case 'startpage':
                return this.renderSectionStartPage(partner);
            case 'messengers':
                return this.renderSectionMessengers(partner);
            case 'social':
                return this.renderSectionSocial(partner);
            case 'apps':
                return this.renderSectionApps(partner);
            case 'security':
                return this.renderSectionSecurity(partner);
            default:
                return this.renderSectionPersonal(partner, cleanPhone);
        }
    },

    // ----------------------------------------------------
    // SECTION 1: ŞƏXSİ MƏLUMATLAR (REGULAR SITE FORM STYLE)
    // ----------------------------------------------------
    renderSectionPersonal: function(partner, cleanPhone) {
        if (!this.partnerSelectedGender) {
            this.partnerSelectedGender = partner.gender || 'female';
        }
        const activeGender = this.partnerSelectedGender;
        const femaleClass = activeGender === 'female'
            ? 'h-10 px-3 rounded-xl border-2 border-pink-500 bg-pink-50 text-pink-700 font-black text-xs flex items-center justify-center gap-2 shadow-xs transition'
            : 'h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100';
        const maleClass = activeGender === 'male'
            ? 'h-10 px-3 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center gap-2 shadow-xs transition'
            : 'h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100';

        return `
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div class="pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-bold text-tbank-graphite">Şəxsi məlumatlar</h4>
                        <p class="text-xs text-slate-400 font-medium">Kabinet rəhbərinin əlaqə və profil rekvizitləri</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <!-- Cins (Gender Selection - profillə eyni) -->
                    <div class="sm:col-span-2">
                        <label class="block text-xs font-bold text-slate-500 mb-1.5">Cins</label>
                        <div class="grid grid-cols-2 gap-2 sm:max-w-xs">
                            <button type="button" id="bizProfGenderBtnFemale" onclick="BusinessDashboardView.selectPartnerGender('female')" class="${femaleClass}">
                                
                                <span>Qadın</span>
                            </button>
                            <button type="button" id="bizProfGenderBtnMale" onclick="BusinessDashboardView.selectPartnerGender('male')" class="${maleClass}">
                                
                                <span>Kişi</span>
                            </button>
                        </div>
                    </div>

                    <!-- 1. Ad və Soyad -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">Ad və Soyad *</label>
                        <input type="text" id="profOwnerName" value="${partner.ownerName || ''}" placeholder="Məs: Leyla Məmmədova" class="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition">
                    </div>

                    <!-- 2. E-poçt ünvanı -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">E-poçt ünvanı</label>
                        <input type="email" id="profEmail" value="${partner.email || 'demo@zeyvobusiness.az'}" readonly disabled class="w-full h-10 px-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs font-semibold text-slate-500 cursor-not-allowed select-none outline-none">
                    </div>

                    <!-- 3. Mobil nömrə -->
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
                            <input id="profPhone" type="tel" value="${cleanPhone}" maxlength="15" placeholder="(50) 000-00-00" oninput="App.formatAzPhone ? App.formatAzPhone(this) : null" class="w-full h-full px-3 bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                        </div>
                    </div>

                    <!-- 4. İnterfeys dili -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">İnterfeys dili</label>
                        <select id="profLanguage" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition">
                            <option value="az" ${(partner.language || 'az') === 'az' ? 'selected' : ''}>Azərbaycan dili (AZ)</option>
                            <option value="ru" ${partner.language === 'ru' ? 'selected' : ''}>Русский (RU)</option>
                            <option value="en" ${partner.language === 'en' ? 'selected' : ''}>English (EN)</option>
                        </select>
                    </div>

                    <!-- 5. Ölkə -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">Ölkə</label>
                        <div class="h-10 px-3.5 rounded-xl bg-slate-100/90 border border-slate-200 flex items-center gap-2 cursor-not-allowed select-none">
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

                    <!-- 6. Şəhər -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">Şəhər</label>
                        <select id="profCity" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition">
                            <option value="Bakı" ${(partner.city || 'Bakı') === 'Bakı' ? 'selected' : ''}>Bakı</option>
                            <option value="Sumqayıt" ${partner.city === 'Sumqayıt' ? 'selected' : ''}>Sumqayıt</option>
                            <option value="Gəncə" ${partner.city === 'Gəncə' ? 'selected' : ''}>Gəncə</option>
                            <option value="Xırdalan" ${partner.city === 'Xırdalan' ? 'selected' : ''}>Xırdalan</option>
                            <option value="Mingəçevir" ${partner.city === 'Mingəçevir' ? 'selected' : ''}>Mingəçevir</option>
                            <option value="Şəki" ${partner.city === 'Şəki' ? 'selected' : ''}>Şəki</option>
                            <option value="Quba" ${partner.city === 'Quba' ? 'selected' : ''}>Quba</option>
                            <option value="Lənkəran" ${partner.city === 'Lənkəran' ? 'selected' : ''}>Lənkəran</option>
                            <option value="Naxçıvan" ${partner.city === 'Naxçıvan' ? 'selected' : ''}>Naxçıvan</option>
                        </select>
                    </div>

                    <!-- 7. Haqqında -->
                    <div class="sm:col-span-2">
                        <label class="block text-xs font-bold text-slate-500 mb-1">Haqqında</label>
                        <textarea id="profBio" rows="3" placeholder="Özünüz və fəaliyyətiniz haqqında..." class="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition resize-none leading-relaxed">${partner.bio || 'Zeyvo Business partnyoru. Baku Beauty Studio baş admini.'}</textarea>
                    </div>
                </div>

                <div class="pt-2 flex justify-end">
                    ${ZeyvoUI.button({ label: "Dəyişiklikləri yadda saxla", onClick: "BusinessDashboardView.saveProfile()", size: "lg", fullWidth: true, className: "sm:w-auto" })}
                </div>
            </div>
        `;
    },

    // ----------------------------------------------------
    // SECTION 2: BAŞLANĞIC SƏHİFƏ
    // ----------------------------------------------------
    renderSectionStartPage: function(partner) {
        const currentView = (!partner.startView || partner.startView === 'calendar' || !['biznes', 'profile'].includes(partner.startView)) ? 'biznes' : partner.startView;
        const currentBiz = partner.startBusiness || 'baku_beauty';
        const currentBranch = partner.startBranch || 'center';

        const modules = [
            { 
                id: 'biznes', 
                title: 'Biznes modulu', 
                desc: 'Ümumi biznes idarəetməsi və filiallar', 
                svg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>` 
            },
            { 
                id: 'profile', 
                title: 'Sadəcə Profil', 
                desc: 'Şəxsi kabinet və tənzimləmələr', 
                svg: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` 
            }
        ];

        return `
            <div class="space-y-5">
                <!-- 1. Biznes və Filial Seçimi -->
                <div class="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                    <div class="pb-3 border-b border-slate-100">
                        <h4 class="text-sm font-bold text-tbank-graphite">Biznes və Filial Seçimi</h4>
                        <p class="text-xs text-slate-400 font-medium">Kabinetə daxil olarkən avtomatik açılacaq cari biznes və filial</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Başlanğıc biznes</label>
                            <select id="profStartBusiness" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition">
                                <option value="baku_beauty" ${currentBiz === 'baku_beauty' ? 'selected' : ''}>Baku Beauty Studio (Əsas biznes)</option>
                                <option value="lash_bar" ${currentBiz === 'lash_bar' ? 'selected' : ''}>Zeyvo Lash & Brow Bar</option>
                                <option value="spa_wellness" ${currentBiz === 'spa_wellness' ? 'selected' : ''}>Aura SPA & Wellness Center</option>
                                <option value="barber_club" ${currentBiz === 'barber_club' ? 'selected' : ''}>Zeyvo Barber Club</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Başlanğıc filial</label>
                            <select id="profStartBranch" class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition">
                                <option value="center" ${currentBranch === 'center' ? 'selected' : ''}>Mərkəz filialı (Nizami küç. 45)</option>
                                <option value="narimanov" ${currentBranch === 'narimanov' ? 'selected' : ''}>Nərimanov filialı (Təbriz küç. 12)</option>
                                <option value="yasamal" ${currentBranch === 'yasamal' ? 'selected' : ''}>Yasamal filialı (İnşaatçılar pr.)</option>
                                <option value="all" ${currentBranch === 'all' ? 'selected' : ''}>Bütün filiallar (Ümumi icmal)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- 2. Giriş Zamanı Başlanğıc Modul -->
                <div class="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                    <div class="pb-3 border-b border-slate-100">
                        <h4 class="text-sm font-bold text-tbank-graphite">Giriş zamanı başlanğıc modul</h4>
                        <p class="text-xs text-slate-400 font-medium">Kabinetə daxil olarkən ilk açılacaq bölməni və ya birbaşa profili seçin</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        ${modules.map(m => {
                            const isChecked = currentView === m.id;
                            return `
                                <label class="p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${isChecked ? 'border-2 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs' : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'}">
                                    <div class="flex items-center gap-2.5 min-w-0">
                                        <div class="w-8 h-8 rounded-lg ${isChecked ? 'bg-tbank-yellow text-tbank-graphite' : 'bg-slate-200/70 text-slate-600'} flex items-center justify-center shrink-0 transition">
                                            ${m.svg}
                                        </div>
                                        <div class="min-w-0">
                                            <div class="font-bold text-xs text-tbank-graphite truncate">${m.title}</div>
                                            <div class="text-[11px] text-slate-400 font-medium truncate">${m.desc}</div>
                                        </div>
                                    </div>
                                    <input type="radio" name="startView" value="${m.id}" ${isChecked ? 'checked' : ''} onchange="BusinessDashboardView.setStartView('${m.id}')" class="accent-tbank-graphite w-4 h-4 shrink-0 cursor-pointer">
                                </label>
                            `;
                        }).join('')}
                    </div>

                    <div class="pt-2 flex justify-end">
                        ${ZeyvoUI.button({ label: "Parametrləri yadda saxla", onClick: "BusinessDashboardView.saveProfile()", size: "lg", fullWidth: true, className: "sm:w-auto" })}
                    </div>
                </div>
            </div>
        `;
    },

    // ----------------------------------------------------
    // SECTION 3: MESENCERLƏR
    // ----------------------------------------------------
    renderSectionMessengers: function(partner) {
        let cleanPhone = (partner.phone || '').replace(/^\+994\s*/, '').trim();
        if (!cleanPhone) cleanPhone = '(50) 234-56-78';

        let cleanWa = (partner.whatsapp || cleanPhone).replace(/^\+994\s*/, '').trim();
        let cleanTg = (partner.telegram || 'bakubeautystudio').replace(/^@|^https:\/\/t\.me\//, '');

        return `
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div class="pb-3 border-b border-slate-100">
                    <h4 class="text-sm font-bold text-tbank-graphite">Mesencerlər</h4>
                    <p class="text-xs text-slate-400 font-medium">Müştərilərlə birbaşa əlaqə üçün WhatsApp və Telegram detalları</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- 1. WhatsApp -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">WhatsApp Nömrəsi</label>
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
                            <input id="profWhatsapp" type="tel" value="${cleanWa}" maxlength="15" placeholder="(50) 000-00-00" oninput="App.formatAzPhone ? App.formatAzPhone(this) : null" class="w-full h-full px-3 bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                        </div>
                    </div>

                    <!-- 2. Telegram -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">Telegram İstifadəçi Adı</label>
                        <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-1 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                            <span class="text-slate-400 font-bold text-xs">t.me/</span>
                            <input type="text" id="profTelegram" value="${cleanTg}" placeholder="istifadəçi_adı" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                        </div>
                    </div>
                </div>

                <div class="pt-2 flex justify-end">
                    ${ZeyvoUI.button({ label: "Yadda saxla", onClick: "BusinessDashboardView.saveProfile()", size: "lg", fullWidth: true, className: "sm:w-auto" })}
                </div>
            </div>
        `;
    },

    // ----------------------------------------------------
    // SECTION 4: SOSİAL ŞƏBƏKƏLƏR
    // ----------------------------------------------------
    renderSectionSocial: function(partner) {
        let cleanIg = (partner.instagram || 'bakubeautystudio').replace(/^@|^https?:\/\/(www\.)?instagram\.com\//, '').trim();
        let cleanFb = (partner.facebook || 'bakubeautystudio').replace(/^https?:\/\/(www\.)?facebook\.com\//, '').trim();
        let cleanTiktok = (partner.tiktok || 'bakubeautystudio').replace(/^@|^https?:\/\/(www\.)?tiktok\.com\/@?/, '').trim();
        let cleanLinkedin = (partner.linkedin || 'bakubeautystudio').replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/, '').trim();

        return `
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div class="pb-3 border-b border-slate-100">
                    <h4 class="text-sm font-bold text-tbank-graphite">Sosial Şəbəkələr</h4>
                    <p class="text-xs text-slate-400 font-medium">Müştərilərin sosial şəbəkələrdən birbaşa keçid etməsi üçün profil linkləri</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- 1. Instagram -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">Instagram Səhifəsi</label>
                        <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-1 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                            <span class="text-slate-400 font-bold text-xs select-none">instagram.com/</span>
                            <input type="text" id="profInstagram" value="${cleanIg}" placeholder="istifadəçi_adı" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                        </div>
                    </div>

                    <!-- 2. Facebook -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">Facebook Səhifəsi</label>
                        <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-1 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                            <span class="text-slate-400 font-bold text-xs select-none">facebook.com/</span>
                            <input type="text" id="profFacebook" value="${cleanFb}" placeholder="istifadəçi_adı" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                        </div>
                    </div>

                    <!-- 3. TikTok -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">TikTok Hesabı</label>
                        <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-1 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                            <span class="text-slate-400 font-bold text-xs select-none">tiktok.com/@</span>
                            <input type="text" id="profTiktok" value="${cleanTiktok}" placeholder="istifadəçi_adı" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                        </div>
                    </div>

                    <!-- 4. LinkedIn -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 mb-1">LinkedIn Səhifəsi</label>
                        <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-1 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                            <span class="text-slate-400 font-bold text-xs select-none">linkedin.com/in/</span>
                            <input type="text" id="profLinkedin" value="${cleanLinkedin}" placeholder="istifadəçi_adı" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                        </div>
                    </div>
                </div>

                <div class="pt-2 flex justify-end">
                    ${ZeyvoUI.button({ label: "Yadda saxla", onClick: "BusinessDashboardView.saveProfile()", size: "lg", fullWidth: true, className: "sm:w-auto" })}
                </div>
            </div>
        `;
    },

    // ----------------------------------------------------
    // SECTION 5: QOŞULMUŞ TƏTBİQLƏR
    // ----------------------------------------------------
    renderSectionApps: function(partner) {
        return `
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div class="pb-3 border-b border-slate-100">
                    <h4 class="text-sm font-bold text-tbank-graphite">Qoşulmuş Tətbiqlər</h4>
                    <p class="text-xs text-slate-400 font-medium">Xarici təqvim servisi və iş qrafiki ilə sinxronizasiya</p>
                </div>

                <div class="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-3.5">
                        <div class="w-12 h-12 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                            <img src="assets/google-calendar.png" alt="Google Calendar" class="w-full h-full object-contain">
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h5 class="text-sm font-bold text-tbank-graphite">Google Calendar</h5>
                                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    Aktivdir
                                </span>
                            </div>
                            <p class="text-xs text-slate-500 font-medium mt-0.5">zeyn4loff@gmail.com</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <button onclick="App.showToast('Google Calendar sinxronizasiyası yeniləndi')" class="w-full sm:w-auto h-9 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-tbank-graphite font-bold text-xs shadow-2xs transition active:scale-95">
                            Sinxron et
                        </button>
                        ${ZeyvoUI.button({ label: "Tənzimləmələr", onClick: "App.showToast('Google hesabı: zeyn4loff@gmail.com')", size: "sm", fullWidth: true, className: "sm:w-auto" })}
                    </div>
                </div>
            </div>
        `;
    },

    // ----------------------------------------------------
    // SECTION 6: TƏHLÜKƏSİZLİK
    // ----------------------------------------------------
    renderSectionSecurity: function(partner) {
        return `
            <div class="space-y-4">
                <div class="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                    <div class="pb-3 border-b border-slate-100">
                        <h4 class="text-sm font-bold text-tbank-graphite">Şifrənin Yenilənməsi</h4>
                        <p class="text-xs text-slate-400 font-medium">Kabinetə giriş təhlükəsizliyini təmin etmək üçün mütəmadi şifrəni yeniləyin</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <!-- 1. Hazırkı şifrə -->
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Hazırkı şifrə</label>
                            <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-2 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                <input type="password" id="profCurrentPass" placeholder="••••••••" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                <button type="button" onclick="BusinessDashboardView.togglePassword('profCurrentPass', this)" class="text-slate-400 hover:text-slate-600 p-1 shrink-0 transition" title="Şifrəni göstər/gizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                            </div>
                        </div>

                        <!-- 2. Yeni şifrə -->
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Yeni şifrə</label>
                            <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-2 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                <input type="password" id="profNewPass" placeholder="Ən azı 6 simvol" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                <button type="button" onclick="BusinessDashboardView.togglePassword('profNewPass', this)" class="text-slate-400 hover:text-slate-600 p-1 shrink-0 transition" title="Şifrəni göstər/gizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                            </div>
                        </div>

                        <!-- 3. Yeni şifrə təkrarı -->
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">Yeni şifrə təkrarı</label>
                            <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3.5 gap-2 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                <input type="password" id="profConfirmPass" placeholder="••••••••" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                <button type="button" onclick="BusinessDashboardView.togglePassword('profConfirmPass', this)" class="text-slate-400 hover:text-slate-600 p-1 shrink-0 transition" title="Şifrəni göstər/gizlə">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="pt-2 flex justify-end">
                        ${ZeyvoUI.button({ label: "Şifrəni yenilə", onClick: "BusinessDashboardView.saveProfile()", size: "lg", fullWidth: true, className: "sm:w-auto" })}
                    </div>
                </div>

                <!-- Danger Zone: Delete Profile -->
                <div class="bg-white rounded-2xl border border-rose-200/80 p-5 sm:p-6 shadow-xs">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h4 class="text-sm font-bold text-rose-600">Profili sil</h4>
                            <p class="text-xs text-slate-400 font-medium mt-0.5">Profil və biznes hesabınız sistemdən həmişəlik silinəcək və bərpa olunmayacaq</p>
                        </div>
                        <button type="button" onclick="BusinessDashboardView.openDeleteProfileModal()" class="w-full sm:w-auto h-11 sm:h-10 px-5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs shadow-2xs transition active:scale-95 shrink-0">
                            Profili sil
                        </button>
                    </div>
                </div>
            </div>


        `;
    },

    // ----------------------------------------------------
    renderSectionJournalSettings: function() {
        return '';
    },
    openDeleteProfileModal: function() {
        this.openDeleteConfirmModal({
            title: "Profili sil",
            message: `Profili silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs font-medium">Bu əməliyyat geri qaytarıla bilməz. Bütün biznes məlumatları, xidmətlər, işçilər və rezervasiyalar sistemdən həmişəlik silinəcək.</span>`,
            confirmText: "Bəli, sil",
            onConfirm: () => {
                this.confirmDeleteProfile();
            }
        });
    },

    closeDeleteProfileModal: function() {
        this.closeDeleteConfirmModal();
    },

    confirmDeleteProfile: function() {
        localStorage.removeItem('zeyvo_partner_user');
        localStorage.removeItem(this.storageKey('zeyvo_business_bookings_v3'));
        if (typeof App !== 'undefined') {
            App.partnerUser = null;
            App.showToast("Profiliniz və biznes hesabınız uğurla silindi");
        }
        window.location.hash = '/business/auth';
    },

    togglePassword: function(inputId, btn) {
        const input = document.getElementById(inputId);
        if (!input) return;
        if (input.type === 'password') {
            input.type = 'text';
            btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
        } else {
            input.type = 'password';
            btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
        }
    },

    setStartView: function(view) {
        const partner = this.getPartnerUser();
        partner.startView = view;
        localStorage.setItem('zeyvo_partner_user', JSON.stringify(partner));
        const labels = {
            biznes: 'Biznes modulu',
            profile: 'Sadəcə Profil'
        };
        if (typeof App !== 'undefined') {
            App.partnerUser = partner;
            App.showToast(`Başlanğıc modul: ${labels[view] || view} seçildi`);
        }
        if (this.container) {
            this.container.innerHTML = this.render({ tab: 'profile', subtab: 'startpage' });
            if (this.afterRender) this.afterRender({ tab: 'profile', subtab: 'startpage' });
        }
        window.location.hash = '#/business/profile/startpage';
    },

    handleAvatarUpload: function(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa şəkil faylı seçin (PNG, JPG, WebP).");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Img = e.target.result;
            const partner = this.getPartnerUser();
            partner.avatar = base64Img;
            localStorage.setItem('zeyvo_partner_user', JSON.stringify(partner));
            
            if (typeof App !== 'undefined') {
                App.partnerUser = partner;
                App.showToast("Profil şəkli uğurla yükləndi!");
            }

            const input = document.getElementById('bizAvatarFileInput');
            if (input) input.value = '';

            const sub = this.profileActiveTab || 'personal';
            if (this.container) {
                this.container.innerHTML = this.render({ tab: 'profile', subtab: sub });
                if (this.afterRender) this.afterRender({ tab: 'profile', subtab: sub });
            }
        };
        reader.readAsDataURL(file);
    },

    removeAvatar: function() {
        const partner = this.getPartnerUser();
        partner.avatar = null;
        localStorage.setItem('zeyvo_partner_user', JSON.stringify(partner));
        
        if (typeof App !== 'undefined') {
            App.partnerUser = partner;
            App.showToast("Profil şəkli silindi.");
        }

        const input = document.getElementById('bizAvatarFileInput');
        if (input) input.value = '';

        const sub = this.profileActiveTab || 'personal';
        if (this.container) {
            this.container.innerHTML = this.render({ tab: 'profile', subtab: sub });
            if (this.afterRender) this.afterRender({ tab: 'profile', subtab: sub });
        }
    },

    partnerSelectedGender: null,

    selectPartnerGender: function(gender) {
        this.partnerSelectedGender = gender;
        this.updatePartnerGenderButtonsUI();
    },

    updatePartnerGenderButtonsUI: function() {
        const btnFemale = document.getElementById('bizProfGenderBtnFemale');
        const btnMale = document.getElementById('bizProfGenderBtnMale');
        const badge = document.getElementById('bizProfileGenderBadge');

        const activeGender = this.partnerSelectedGender;

        if (btnFemale && btnMale) {
            if (activeGender === 'female') {
                btnFemale.className = "h-10 px-3 rounded-xl border-2 border-pink-500 bg-pink-50 text-pink-700 font-black text-xs flex items-center justify-center gap-2 shadow-xs transition";
                btnMale.className = "h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100";
            } else if (activeGender === 'male') {
                btnFemale.className = "h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100";
                btnMale.className = "h-10 px-3 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center gap-2 shadow-xs transition";
            } else {
                btnFemale.className = "h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100";
                btnMale.className = "h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100";
            }
        }

        if (badge) {
            if (activeGender === 'female') {
                badge.textContent = 'Qadın';
                badge.className = "text-[10px] font-black px-1.5 py-0.2 rounded bg-pink-500/80 text-white shrink-0";
                badge.classList.remove('hidden');
            } else if (activeGender === 'male') {
                badge.textContent = 'Kişi';
                badge.className = "text-[10px] font-black px-1.5 py-0.2 rounded bg-blue-500/80 text-white shrink-0";
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    },

    saveProfile: function() {
        const partner = this.getPartnerUser();
        
        const ownerName = document.getElementById('profOwnerName') ? document.getElementById('profOwnerName').value.trim() : null;
        const email = document.getElementById('profEmail') ? document.getElementById('profEmail').value.trim() : null;
        const phone = document.getElementById('profPhone') ? document.getElementById('profPhone').value.trim() : null;
        const role = document.getElementById('profRole') ? document.getElementById('profRole').value : null;
        const language = document.getElementById('profLanguage') ? document.getElementById('profLanguage').value : null;
        const city = document.getElementById('profCity') ? document.getElementById('profCity').value : null;
        const bio = document.getElementById('profBio') ? document.getElementById('profBio').value.trim() : null;
        const startBusiness = document.getElementById('profStartBusiness') ? document.getElementById('profStartBusiness').value : null;
        const startBranch = document.getElementById('profStartBranch') ? document.getElementById('profStartBranch').value : null;
        const startViewRadio = document.querySelector('input[name="startView"]:checked');
        const startView = startViewRadio ? startViewRadio.value : null;
        const whatsapp = document.getElementById('profWhatsapp') ? document.getElementById('profWhatsapp').value.trim() : null;
        const telegram = document.getElementById('profTelegram') ? document.getElementById('profTelegram').value.trim() : null;
        const bizName = document.getElementById('profBizName') ? document.getElementById('profBizName').value.trim() : null;
        const bizType = document.getElementById('profBizType') ? document.getElementById('profBizType').value : null;
        const address = document.getElementById('profAddress') ? document.getElementById('profAddress').value.trim() : null;
        const workingHours = document.getElementById('profWorkingHours') ? document.getElementById('profWorkingHours').value.trim() : null;
        const instagram = document.getElementById('profInstagram') ? document.getElementById('profInstagram').value.trim() : null;
        const facebook = document.getElementById('profFacebook') ? document.getElementById('profFacebook').value.trim() : null;
        const tiktok = document.getElementById('profTiktok') ? document.getElementById('profTiktok').value.trim() : null;
        const linkedin = document.getElementById('profLinkedin') ? document.getElementById('profLinkedin').value.trim() : null;
        const newPass = document.getElementById('profNewPass') ? document.getElementById('profNewPass').value : null;
        const confirmPass = document.getElementById('profConfirmPass') ? document.getElementById('profConfirmPass').value : null;

        if (this.partnerSelectedGender) partner.gender = this.partnerSelectedGender;
        if (ownerName) partner.ownerName = ownerName;
        if (email) partner.email = email;
        if (phone) partner.phone = phone.startsWith('+994') ? phone : '+994 ' + phone;
        if (language) partner.language = language;
        if (city) partner.city = city;
        if (bio !== null && bio !== undefined) partner.bio = bio;
        if (startBusiness) partner.startBusiness = startBusiness;
        if (startBranch) partner.startBranch = startBranch;
        if (startView) partner.startView = startView;
        if (whatsapp) partner.whatsapp = whatsapp.startsWith('+994') ? whatsapp : '+994 ' + whatsapp;
        if (telegram) partner.telegram = telegram.replace(/^@|^https:\/\/t\.me\//, '');
        if (role) partner.role = role;
        if (bizName) partner.businessName = bizName;
        if (bizType) partner.businessType = bizType;
        if (address) partner.address = address;
        if (workingHours) partner.workingHours = workingHours;
        if (instagram !== null) partner.instagram = instagram.replace(/^@|^https?:\/\/(www\.)?instagram\.com\//, '');
        if (facebook !== null) partner.facebook = facebook.replace(/^https?:\/\/(www\.)?facebook\.com\//, '');
        if (tiktok !== null) partner.tiktok = tiktok.replace(/^@|^https?:\/\/(www\.)?tiktok\.com\/@?/, '');
        if (linkedin !== null) partner.linkedin = linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/, '');

        if (newPass) {
            if (newPass.length < 6) {
                if (typeof App !== 'undefined') App.showToast("Yeni şifrə ən azı 6 simvoldan ibarət olmalıdır.");
                return;
            }
            if (confirmPass && newPass !== confirmPass) {
                if (typeof App !== 'undefined') App.showToast("Yeni şifrə ilə şifrənin təkrarı uyğun gəlmir.");
                return;
            }
            partner.password = newPass;
            if (typeof App !== 'undefined') {
                App.showToast("Təhlükəsizlik: Şifrəniz uğurla yeniləndi!");
            }
        }

        localStorage.setItem('zeyvo_partner_user', JSON.stringify(partner));
        if (typeof App !== 'undefined') {
            App.partnerUser = partner;
            App.showToast("Məlumatlar uğurla yadda saxlanıldı");
        }

        const sub = this.profileActiveTab || 'personal';
        if (this.container) {
            this.container.innerHTML = this.render({ tab: 'profile', subtab: sub });
            if (this.afterRender) this.afterRender({ tab: 'profile', subtab: sub });
        }
        window.location.hash = '#/business/profile/' + sub;
    },

    logout: function() {
        localStorage.removeItem('zeyvo_partner_user');
        if (typeof App !== 'undefined') {
            App.partnerUser = null;
            App.showToast("Sessiya sonlandırıldı.");
        }
        window.location.hash = '/business/auth';
    },

    // ==========================================
    // BUSINESS CRUD METHODS (Biznes / Fərdi usta)
    // ==========================================
    getDefaultBusinesses: function() {
        const partner = this.getPartnerUser();
        const baseName = partner.businessName || 'Baku Beauty Studio';
        return [
            // 1. Baku Beauty Studio (Biznes) - 3 Filial
            {
                id: 'biz_baku_beauty',
                type: 'business',
                name: baseName,
                description: '',
                branches: [
                    {
                        id: 'br_bbs_1',
                        name: 'Mərkəz Filialı',
                        category: 'beauty/hair',
                        categories: ['beauty/hair', 'beauty/nails'],
                        city: 'Bakı',
                        address: 'Nizami küç. 45',
                        phone: '+994 (12) 493-00-11',
                        phones: ['+994 (12) 493-00-11'],
                        hours: '09:00 – 21:00'
                    },
                    {
                        id: 'br_bbs_2',
                        name: 'Gənclik Filialı',
                        category: 'beauty/hair',
                        categories: ['beauty/hair', 'beauty/nails'],
                        city: 'Bakı',
                        address: 'Fətəli Xan Xoyski 83',
                        phone: '+994 (12) 564-20-30',
                        phones: ['+994 (12) 564-20-30'],
                        hours: '10:00 – 22:00'
                    },
                    {
                        id: 'br_bbs_3',
                        name: 'Yasamal Filialı',
                        category: 'beauty/hair',
                        categories: ['beauty/hair'],
                        city: 'Bakı',
                        address: 'Həsən bəy Zərdabi pr. 78',
                        phone: '+994 (12) 434-55-90',
                        phones: ['+994 (12) 434-55-90'],
                        hours: '09:00 – 20:00'
                    }
                ],
                createdAt: new Date().toISOString()
            },

            // 2. Grand Barber Lounge (Biznes) - 2 Filial
            {
                id: 'biz_grand_barber',
                type: 'business',
                name: 'Grand Barber Lounge',
                description: '',
                branches: [
                    {
                        id: 'br_gbl_1',
                        name: 'Port Baku Filialı',
                        category: 'beauty/barber',
                        categories: ['beauty/barber'],
                        city: 'Bakı',
                        address: 'Neftçilər pr. 153',
                        phone: '+994 (12) 404-77-88',
                        phones: ['+994 (12) 404-77-88'],
                        hours: '10:00 – 22:00'
                    },
                    {
                        id: 'br_gbl_2',
                        name: 'Sahil Filialı',
                        category: 'beauty/barber',
                        categories: ['beauty/barber'],
                        city: 'Bakı',
                        address: 'Xəqani küç. 18',
                        phone: '+994 (12) 498-10-20',
                        phones: ['+994 (12) 498-10-20'],
                        hours: '09:00 – 21:00'
                    }
                ],
                createdAt: new Date().toISOString()
            },

            // 3. DentEstet Stomatologiya (Biznes) - 1 Filial
            {
                id: 'biz_dent_estet',
                type: 'business',
                name: 'DentEstet Stomatologiya',
                description: '',
                branches: [
                    {
                        id: 'br_de_1',
                        name: 'Nərimanov Filialı',
                        category: 'health/dental',
                        categories: ['health/dental'],
                        city: 'Bakı',
                        address: 'Təbriz küç. 85',
                        phone: '+994 (12) 465-90-90',
                        phones: ['+994 (12) 465-90-90'],
                        hours: '09:00 – 20:00'
                    }
                ],
                createdAt: new Date().toISOString()
            },

            // 4. Samir Əliyev (Fərdi usta)
            {
                id: 'biz_samir_barber',
                type: 'individual',
                name: 'Samir Əliyev',
                category: 'beauty/hair',
                categories: ['beauty/hair'],
                city: 'Bakı',
                address: 'Nizami küç. 28',
                phone: '+994 (50) 311-22-33',
                phones: ['+994 (50) 311-22-33'],
                hours: '10:00 – 20:00',
                createdAt: new Date().toISOString()
            },

            // 5. Leyla Məmmədova (Fərdi usta)
            {
                id: 'biz_leyla_makeup',
                type: 'individual',
                name: 'Leyla Məmmədova',
                category: 'beauty/makeup',
                categories: ['beauty/makeup'],
                city: 'Bakı',
                address: 'Rəşid Behbudov küç. 35',
                phone: '+994 (55) 777-44-11',
                phones: ['+994 (55) 777-44-11'],
                hours: '10:00 – 19:00',
                createdAt: new Date().toISOString()
            },

            // 6. Dr. Nigar Qasımova (Fərdi usta)
            {
                id: 'biz_nigar_cosmo',
                type: 'individual',
                name: 'Dr. Nigar Qasımova',
                category: 'health/cosmetology',
                categories: ['health/cosmetology'],
                city: 'Bakı',
                address: 'İnşaatçılar pr. 12',
                phone: '+994 (50) 888-99-00',
                phones: ['+994 (50) 888-99-00'],
                hours: '09:00 – 18:00',
                createdAt: new Date().toISOString()
            }
        ];
    },

    getBusinesses: function() {
        try {
            const raw = localStorage.getItem('zeyvo_user_businesses_v3');
            if (raw) {
                const list = JSON.parse(raw);
                if (Array.isArray(list) && list.length > 0) {
                    return list;
                }
            }
        } catch(e) {}
        
        const defaults = this.getDefaultBusinesses();
        this.saveBusinesses(defaults);
        return defaults;
    },

    saveBusinesses: function(list) {
        try {
            localStorage.setItem('zeyvo_user_businesses_v3', JSON.stringify(list));
        } catch(e) {}
    },

    selectBusinessType: function(type) {
        const cardBiz = document.getElementById('bizTypeCard_business');
        const cardInd = document.getElementById('bizTypeCard_individual');
        const radioBiz = document.querySelector('input[name="bizType"][value="business"]');
        const radioInd = document.querySelector('input[name="bizType"][value="individual"]');
        const nameLabel = document.getElementById('bizFormNameLabel');
        const nameInput = document.getElementById('bizFormName');
        const submitBtn = document.getElementById('bizModalSubmitBtn');
        const editIdInput = document.getElementById('bizFormEditId');
        const isEdit = editIdInput && !!editIdInput.value;

        if (type === 'business') {
            if (radioBiz) radioBiz.checked = true;
            if (cardBiz) {
                cardBiz.className = "p-3.5 rounded-2xl border-2 transition cursor-pointer flex flex-col gap-2 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs";
            }
            if (cardInd) {
                cardInd.className = "p-3.5 rounded-2xl border-2 transition cursor-pointer flex flex-col gap-2 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300";
            }
            if (nameLabel) nameLabel.textContent = "Biznesin Adı *";
            if (nameInput) nameInput.placeholder = "Məs: Baku Beauty Studio";
            if (submitBtn && !isEdit) submitBtn.textContent = "Biznesi yarat";
        } else {
            if (radioInd) radioInd.checked = true;
            if (cardInd) {
                cardInd.className = "p-3.5 rounded-2xl border-2 transition cursor-pointer flex flex-col gap-2 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs";
            }
            if (cardBiz) {
                cardBiz.className = "p-3.5 rounded-2xl border-2 transition cursor-pointer flex flex-col gap-2 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300";
            }
            if (nameLabel) nameLabel.textContent = "Ad və Soyad (Fərdi usta) *";
            if (nameInput) nameInput.placeholder = "Məs: Samir Əliyev (Bərbər)";
            if (submitBtn && !isEdit) submitBtn.textContent = "Fərdi Ustanı Əlavə Et və Tənzimlə →";
        }
    },

    openCreateBusinessModal: function() {
        const modal = document.getElementById('bizCreateBusinessModal');
        if (!modal) return;
        const titleEl = document.getElementById('bizModalTitle');
        const submitBtn = document.getElementById('bizModalSubmitBtn');
        const editIdInput = document.getElementById('bizFormEditId');
        const nameInput = document.getElementById('bizFormName');
        const descInput = document.getElementById('bizFormDesc');

        if (titleEl) titleEl.textContent = 'Yeni Biznes və ya Fərdi Usta';
        if (submitBtn) submitBtn.textContent = 'Biznesi yarat';
        if (editIdInput) editIdInput.value = '';
        if (nameInput) nameInput.value = '';
        if (descInput) descInput.value = '';

        this.selectBusinessType('business');
        modal.classList.remove('hidden');
        if (nameInput) setTimeout(() => nameInput.focus(), 50);
    },

    openEditBusinessModal: function(id) {
        const businesses = this.getBusinesses();
        const item = businesses.find(b => b.id === id);
        if (!item) return;

        // If it is an individual master, open the comprehensive 6-tab modal!
        if (item.type === 'individual') {
            return this.openEditIndividualMasterModal(id);
        }

        const modal = document.getElementById('bizCreateBusinessModal');
        if (!modal) return;

        const titleEl = document.getElementById('bizModalTitle');
        const submitBtn = document.getElementById('bizModalSubmitBtn');
        const editIdInput = document.getElementById('bizFormEditId');
        const nameInput = document.getElementById('bizFormName');
        const descInput = document.getElementById('bizFormDesc');

        if (titleEl) titleEl.textContent = 'Məlumatları redaktə et';
        if (submitBtn) submitBtn.textContent = 'Yadda saxla';
        if (editIdInput) editIdInput.value = item.id;
        if (nameInput) nameInput.value = item.name || '';
        if (descInput) descInput.value = item.description || '';

        this.selectBusinessType(item.type || 'business');
        modal.classList.remove('hidden');
        if (nameInput) setTimeout(() => nameInput.focus(), 50);
    },

    closeCreateBusinessModal: function() {
        const modal = document.getElementById('bizCreateBusinessModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveBusiness: function(e) {
        if (e) e.preventDefault();
        const editId = (document.getElementById('bizFormEditId')?.value || '').trim();
        const typeRadio = document.querySelector('input[name="bizType"]:checked');
        const type = typeRadio ? typeRadio.value : 'business';
        const name = (document.getElementById('bizFormName')?.value || '').trim();
        const description = (document.getElementById('bizFormDesc')?.value || '').trim();

        if (!name) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa adı qeyd edin");
            return;
        }

        // If creating a new Fərdi usta: seamlessly transition to full 6-tab modal!
        if (!editId && type === 'individual') {
            this.closeCreateBusinessModal();
            this.openAddIndividualMasterModal(name, description);
            return;
        }

        const businesses = this.getBusinesses();
        if (editId) {
            const idx = businesses.findIndex(b => b.id === editId);
            if (idx !== -1) {
                businesses[idx].type = type;
                businesses[idx].name = name;
                businesses[idx].description = description;
                businesses[idx].updatedAt = new Date().toISOString();
            }
            if (typeof App !== 'undefined') App.showToast("Məlumatlar uğurla yeniləndi");
        } else {
            const newBiz = {
                id: 'biz_' + Date.now(),
                type: type,
                name: name,
                description: description,
                branches: [],
                createdAt: new Date().toISOString()
            };
            businesses.unshift(newBiz);
            if (typeof App !== 'undefined') App.showToast("Yeni biznes uğurla əlavə edildi!");
        }

        this.saveBusinesses(businesses);
        this.closeCreateBusinessModal();

        // Re-render active tab
        if (this.container) {
            this.container.innerHTML = this.render({ tab: this.activeTab });
            if (this.afterRender) this.afterRender({ tab: this.activeTab });
        }
    },

    pendingDeleteAction: null,

    openDeleteConfirmModal: function(options) {
        this.pendingDeleteAction = options && options.onConfirm ? options.onConfirm : null;
        const modal = document.getElementById('bizDeleteConfirmModal');
        if (!modal) return;
        const titleEl = document.getElementById('deleteConfirmTitle');
        const msgEl = document.getElementById('deleteConfirmMessage');
        const btn = document.getElementById('deleteConfirmBtn');

        if (titleEl) titleEl.textContent = options.title || 'Silinməni təsdiqləyin';
        if (msgEl) msgEl.innerHTML = options.message || 'Bu elementi silmək istədiyinizə əminsiniz?';
        if (btn) btn.textContent = options.confirmText || 'Bəli, sil';

        modal.classList.remove('hidden');
    },

    closeDeleteConfirmModal: function() {
        const modal = document.getElementById('bizDeleteConfirmModal');
        if (modal) modal.classList.add('hidden');
        this.pendingDeleteAction = null;
    },

    executeDeleteConfirm: function() {
        if (typeof this.pendingDeleteAction === 'function') {
            const action = this.pendingDeleteAction;
            this.closeDeleteConfirmModal();
            action();
        } else {
            this.closeDeleteConfirmModal();
        }
    },

    deleteBusiness: function(id) {
        const businesses = this.getBusinesses();
        const item = businesses.find(b => b.id === id);
        if (!item) return;

        const isBiz = (item.type || 'business') === 'business';
        const numBranches = Array.isArray(item.branches) ? item.branches.length : 0;
        const msg = isBiz && numBranches > 0 
            ? `<strong>"${item.name}"</strong> biznesini və ona aid <strong>${numBranches} filialı</strong> silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`
            : `<strong>"${item.name}"</strong> profilini silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`;

        this.openDeleteConfirmModal({
            title: isBiz ? 'Biznesi sil' : 'Fərdi ustanı sil',
            message: msg,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const filtered = businesses.filter(b => b.id !== id);
                this.saveBusinesses(filtered);

                // If active context was on this business, reset active context
                const activeCtx = this.getActiveContext();
                if (activeCtx.businessId === id) {
                    localStorage.removeItem('zeyvo_active_context_v1');
                    this.getActiveContext();
                }

                if (typeof App !== 'undefined') App.showToast(`"${item.name}" uğurla silindi`);

                if (this.container) {
                    this.container.innerHTML = this.render({ tab: this.activeTab });
                    if (this.afterRender) this.afterRender({ tab: this.activeTab });
                }
            }
        });
    },
});
