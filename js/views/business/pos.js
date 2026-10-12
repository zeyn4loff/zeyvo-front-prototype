// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {
    // ==========================================
    // POS (POINT OF SALE / KASSA SATIŞI) MODULE
    // ==========================================
    posCart: [],
    posSelectedClientId: '',
    posSelectedSellerId: '',
    posDiscountAmount: 0,
    posDiscountPercent: 0,
    posDiscountType: 'percent', // 'percent' | 'fixed'
    posPaymentMethod: 'cash',   // 'cash' | 'terminal' | 'deposit' | 'bonus'
    posSelectedAccountId: 'acc_cash',
    posSearchQuery: '',
    posCategoryFilter: 'all',
    posNote: '',
    lastCompletedSaleReceipt: null,

    getPosAvailableProducts: function() {
        const allProducts = this.getProducts ? this.getProducts() : [];
        return allProducts.filter(p => {
            const price = Number(p.salePrice || p.price || 0);
            if (p.type === 'internal' && price <= 0) return false;
            return price > 0;
        });
    },

    openPosModal: function() {
        const modal = document.getElementById('bizPosModal');
        if (!modal) return;

        // Reset state
        this.posCart = [];
        this.posSelectedClientId = '';
        this.posClientSearchQuery = '';
        this.posSelectedSellerId = '';
        this.posDiscountAmount = 0;
        this.posDiscountPercent = 0;
        this.posDiscountType = 'percent';
        this.posPaymentMethod = 'cash';
        this.posSelectedAccountId = 'acc_cash';
        this.posSearchQuery = '';
        this.posCategoryFilter = 'all';
        this.posNote = '';

        // Initialize searchable client trigger
        this.renderPosClientTriggerUi();
        this.togglePosClientDropdown(false);

        // Populate sellers dropdown (active staff)
        const sellerSel = document.getElementById('posSellerSelect');
        if (sellerSel) {
            const staffList = this.getStaffList ? this.getStaffList() : [];
            const activeStaff = staffList.filter(s => s.status !== 'inactive');
            sellerSel.innerHTML = `
                <option value="">Növbətçi kassir / Admin</option>
                ${activeStaff.map(s => `
                    <option value="${s.id}">${this.escapeHtml(s.name)} (${this.escapeHtml(s.roleTitle || s.role || 'Usta')})</option>
                `).join('')}
            `;
            sellerSel.value = '';
        }

        // Populate accounts dropdown
        const accSel = document.getElementById('posAccountSelect');
        if (accSel) {
            const fData = this.getFinanceData ? this.getFinanceData() : { accounts: [] };
            const accounts = fData.accounts || [];
            accSel.innerHTML = accounts.map(a => `
                <option value="${a.id}">${this.escapeHtml(a.name)} (${Number(a.balance || 0).toFixed(2)} ₼)</option>
            `).join('');
            if (accounts.length > 0) {
                accSel.value = accounts[0].id;
                this.posSelectedAccountId = accounts[0].id;
            }
        }

        // Clear search input
        const searchInput = document.getElementById('posSearchInput');
        if (searchInput) searchInput.value = '';

        // Reset discount input
        const discountInput = document.getElementById('posDiscountInput');
        if (discountInput) discountInput.value = '';

        // Reset category scroll position
        const catContainer = document.getElementById('posCategoryPills');
        if (catContainer) catContainer.scrollLeft = 0;

        // Render categories & product grid & cart
        this.renderPosCategoriesHtml();
        this.renderPosProductsGridHtml();
        this.renderPosCartUi();

        modal.classList.remove('hidden');
    },

    closePosModal: function() {
        const modal = document.getElementById('bizPosModal');
        if (modal) modal.classList.add('hidden');
    },

    renderPosCategoriesHtml: function() {
        const container = document.getElementById('posCategoryPills');
        if (!container) return;
        const categories = this.getProductCategories ? this.getProductCategories() : [];
        const availableProducts = this.getPosAvailableProducts();
        const activeCat = this.posCategoryFilter || 'all';

        const validCategories = categories.filter(c => availableProducts.some(p => p.categoryId === c.id));

        const pills = [
            { id: 'all', name: 'Bütün məhsullar', count: availableProducts.length },
            ...validCategories.map(c => ({
                id: c.id,
                name: c.name,
                count: availableProducts.filter(p => p.categoryId === c.id).length
            }))
        ];

        container.innerHTML = pills.map(p => {
            const isActive = activeCat === p.id;
            return `
                <button type="button" onclick="BusinessDashboardView.setPosCategoryFilter('${p.id}')" class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 ${isActive ? 'bg-[#101114] text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
                    <span>${this.escapeHtml(p.name)}</span>
                    <span class="ml-1 text-[10px] opacity-70">(${p.count})</span>
                </button>
            `;
        }).join('');
    },

    setPosCategoryFilter: function(catId) {
        this.posCategoryFilter = catId || 'all';
        this.renderPosCategoriesHtml();
        this.renderPosProductsGridHtml();
    },

    onPosSearch: function(val) {
        this.posSearchQuery = val || '';
        this.renderPosProductsGridHtml();
    },

    renderPosProductsGridHtml: function() {
        const grid = document.getElementById('posProductsGrid');
        if (!grid) return;

        let products = this.getPosAvailableProducts();

        // 1. Category filter
        if (this.posCategoryFilter && this.posCategoryFilter !== 'all') {
            products = products.filter(p => p.categoryId === this.posCategoryFilter);
        }

        // 2. Search query filter
        if (this.posSearchQuery && this.posSearchQuery.trim()) {
            const q = this.posSearchQuery.toLowerCase().trim();
            products = products.filter(p => {
                const n = (p.name || '').toLowerCase();
                const sku = (p.sku || '').toLowerCase();
                const b = (p.barcode || '').toLowerCase();
                return n.includes(q) || sku.includes(q) || b.includes(q);
            });
        }

        if (products.length === 0) {
            grid.innerHTML = `
                <div class="col-span-2 sm:col-span-3 py-12 text-center text-slate-400 space-y-2">
                    <svg class="w-10 h-10 mx-auto text-slate-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    <p class="text-xs font-medium">Heç bir satış məhsulu tapılmadı</p>
                </div>
            `;
            return;
        }

        const categories = this.getProductCategories ? this.getProductCategories() : [];

        grid.innerHTML = products.map(p => {
            const stock = Number(p.stock) || 0;
            const price = Number(p.salePrice || p.price || 0);
            const inCart = this.posCart.find(it => it.productId === p.id);
            const cat = categories.find(c => c.id === p.categoryId);
            const catName = cat ? cat.name : (p.category || '');
            const isOutOfStock = stock <= 0;

            let stockBadge = '';
            if (stock > 5) {
                stockBadge = `<span class="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">Qalıq: ${stock} ${this.escapeHtml(p.unit || 'ədəd')}</span>`;
            } else if (stock > 0) {
                stockBadge = `<span class="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">Qalıq: ${stock} ${this.escapeHtml(p.unit || 'ədəd')}</span>`;
            } else {
                stockBadge = `<span class="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">Bitib</span>`;
            }

            return `
                <div onclick="${isOutOfStock ? '' : `BusinessDashboardView.addToPosCart('${p.id}')`}" class="p-3 rounded-2xl border transition-all text-left flex flex-col justify-between ${isOutOfStock ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200' : inCart ? 'cursor-pointer bg-amber-50/25 border-amber-400 shadow-xs active:scale-[0.98] group' : 'cursor-pointer bg-white border-slate-200/90 hover:border-amber-400 hover:shadow-xs active:scale-[0.98] group'}">
                    <div>
                        <div class="flex items-start justify-between gap-1.5 mb-1.5">
                            <span class="text-[10px] text-slate-400 font-medium truncate">${this.escapeHtml(catName)}</span>
                            ${inCart ? `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FFDD2D] text-[#101114] shadow-2xs shrink-0">Səbətdə: ${inCart.qty}</span>` : ''}
                        </div>
                        <h4 class="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition line-clamp-2 leading-snug">${this.escapeHtml(p.name)}</h4>
                        ${p.sku ? `<span class="text-[10px] text-slate-400 font-mono block mt-0.5">${this.escapeHtml(p.sku)}</span>` : ''}
                    </div>

                    <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                        <span class="text-xs font-black text-slate-900 font-mono">${price.toFixed(2)} ₼</span>
                        ${stockBadge}
                    </div>
                </div>
            `;
        }).join('');
    },

    addToPosCart: function(prodId) {
        const products = this.getProducts ? this.getProducts() : [];
        const prod = products.find(p => p.id === prodId);
        if (!prod) return;

        const maxStock = Number(prod.stock) || 0;
        if (maxStock <= 0) {
            if (typeof App !== 'undefined') App.showToast("Bu məhsul stokda bitib");
            return;
        }

        const existing = this.posCart.find(it => it.productId === prodId);
        if (existing) {
            if (existing.qty >= maxStock) {
                if (typeof App !== 'undefined') App.showToast(`Maksimal stok həddi (${maxStock} ${prod.unit || 'ədəd'})`);
                return;
            }
            existing.qty += 1;
        } else {
            this.posCart.push({
                productId: prod.id,
                name: prod.name,
                price: Number(prod.salePrice || prod.price || 0),
                costPrice: Number(prod.costPrice || 0),
                qty: 1,
                maxStock: maxStock,
                unit: prod.unit || 'ədəd',
                sku: prod.sku || '',
                barcode: prod.barcode || ''
            });
        }

        this.renderPosProductsGridHtml();
        this.renderPosCartUi();
    },

    updatePosCartQty: function(prodId, newQty) {
        const item = this.posCart.find(it => it.productId === prodId);
        if (!item) return;

        const qty = parseInt(newQty, 10);
        if (isNaN(qty) || qty <= 0) {
            this.removeFromPosCart(prodId);
            return;
        }

        if (qty > item.maxStock) {
            item.qty = item.maxStock;
            if (typeof App !== 'undefined') App.showToast(`Maksimal stok həddi (${item.maxStock} ${item.unit})`);
        } else {
            item.qty = qty;
        }

        this.renderPosProductsGridHtml();
        this.renderPosCartUi();
    },

    removeFromPosCart: function(prodId) {
        this.posCart = this.posCart.filter(it => it.productId !== prodId);
        this.renderPosProductsGridHtml();
        this.renderPosCartUi();
    },

    clearPosCart: function() {
        this.posCart = [];
        this.renderPosProductsGridHtml();
        this.renderPosCartUi();
    },

    posClientSearchQuery: '',

    renderPosClientTriggerUi: function() {
        const contentEl = document.getElementById('posClientTriggerContent');
        if (!contentEl) return;
        const clients = this.getClientsData ? this.getClientsData() : [];
        const client = clients.find(c => c.id === this.posSelectedClientId);

        if (client) {
            contentEl.innerHTML = `
                <div class="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-[10px] font-bold shrink-0">
                    ${this.escapeHtml((client.name || 'M').charAt(0))}
                </div>
                <div class="min-w-0 flex-1">
                    <span class="text-xs font-bold text-slate-900 truncate block leading-tight">${this.escapeHtml(client.name)}</span>
                    <span class="text-[10px] text-slate-400 font-mono block leading-tight">${this.escapeHtml(client.phone || 'Nömrəsiz')}</span>
                </div>
                <button type="button" onclick="event.stopPropagation(); BusinessDashboardView.selectPosClient('')" class="w-5 h-5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-rose-500 flex items-center justify-center shrink-0 cursor-pointer" title="Seçimi təmizlə">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            `;
        } else {
            contentEl.innerHTML = `
                <div class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-semibold shrink-0">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                </div>
                <div class="min-w-0 flex-1">
                    <span class="text-xs font-semibold text-slate-700 truncate block">Anonim müştəri</span>
                    <span class="text-[10px] text-slate-400 block">Walk-in / Qonaq</span>
                </div>
            `;
        }
    },

    togglePosClientDropdown: function(forceState) {
        const dd = document.getElementById('posClientDropdown');
        if (!dd) return;
        const isHidden = dd.classList.contains('hidden');
        const shouldShow = forceState !== undefined ? forceState : isHidden;

        if (shouldShow) {
            dd.classList.remove('hidden');
            const searchInput = document.getElementById('posClientSearchInput');
            if (searchInput) {
                searchInput.value = this.posClientSearchQuery || '';
                setTimeout(() => searchInput.focus(), 50);
            }
            this.renderPosClientDropdownList();
        } else {
            dd.classList.add('hidden');
        }
    },

    onPosClientSearch: function(val) {
        this.posClientSearchQuery = val || '';
        this.renderPosClientDropdownList();
    },

    renderPosClientDropdownList: function() {
        const container = document.getElementById('posClientListContainer');
        if (!container) return;
        const clients = this.getClientsData ? this.getClientsData() : [];
        const q = (this.posClientSearchQuery || '').toLowerCase().trim();

        let filtered = clients;
        if (q) {
            filtered = clients.filter(c => {
                const nameMatch = (c.name || '').toLowerCase().includes(q);
                const phoneDigits = (c.phone || '').replace(/\D/g, '');
                const qDigits = q.replace(/\D/g, '');
                const phoneMatch = qDigits.length > 0 && phoneDigits.includes(qDigits);
                return nameMatch || phoneMatch;
            });
        }

        let html = '';

        // Option 1: Walk-in / Anonim
        html += `
            <div onclick="BusinessDashboardView.selectPosClient('')" class="p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition flex items-center justify-between ${!this.posSelectedClientId ? 'bg-amber-50/50' : ''}">
                <div class="flex items-center gap-2 min-w-0">
                    <div class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-semibold shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                    </div>
                    <div class="min-w-0">
                        <span class="text-xs font-semibold text-slate-800 block">Anonim müştəri</span>
                        <span class="text-[10px] text-slate-400">Walk-in / Qonaq alıcı</span>
                    </div>
                </div>
                ${!this.posSelectedClientId ? '<svg class="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
            </div>
        `;

        if (filtered.length === 0) {
            html += `
                <div class="py-4 text-center text-slate-400 space-y-1.5">
                    <p class="text-xs font-medium">Müştəri tapılmadı</p>
                    ${q ? `
                        <button type="button" onclick="BusinessDashboardView.openPosQuickAddClientModal('${this.escapeHtml(q)}')" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition cursor-pointer">
                            + "${this.escapeHtml(q)}" kimi əlavə et
                        </button>
                    ` : ''}
                </div>
            `;
        } else {
            filtered.forEach(c => {
                const isSelected = this.posSelectedClientId === c.id;
                html += `
                    <div onclick="BusinessDashboardView.selectPosClient('${c.id}')" class="p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition flex items-center justify-between ${isSelected ? 'bg-amber-50/50' : ''}">
                        <div class="flex items-center gap-2 min-w-0">
                            <div class="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-[10px] font-bold shrink-0">
                                ${this.escapeHtml((c.name || 'M').charAt(0))}
                            </div>
                            <div class="min-w-0">
                                <span class="text-xs font-bold text-slate-900 block truncate">${this.escapeHtml(c.name)}</span>
                                <span class="text-[10px] text-slate-400 font-mono block">${this.escapeHtml(c.phone || 'Nömrəsiz')}</span>
                            </div>
                        </div>
                        ${isSelected ? '<svg class="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                    </div>
                `;
            });
        }

        container.innerHTML = html;
    },

    selectPosClient: function(clientId) {
        this.posSelectedClientId = clientId || '';
        this.renderPosClientTriggerUi();
        this.togglePosClientDropdown(false);
    },

    setPosClient: function(clientId) {
        this.selectPosClient(clientId);
    },

    openPosQuickAddClientModal: function(prefilledName) {
        this.togglePosClientDropdown(false);
        const modal = document.getElementById('bizPosQuickClientModal');
        if (!modal) return;

        const nameInput = document.getElementById('posNewClientName');
        const phoneInput = document.getElementById('posNewClientPhone');
        const catSelect = document.getElementById('posNewClientCategory');

        if (nameInput) nameInput.value = prefilledName || this.posClientSearchQuery || '';
        if (phoneInput) phoneInput.value = '';
        if (catSelect) catSelect.value = 'new';

        modal.classList.remove('hidden');
        setTimeout(() => {
            if (nameInput) nameInput.focus();
        }, 50);
    },

    closePosQuickAddClientModal: function() {
        const modal = document.getElementById('bizPosQuickClientModal');
        if (modal) modal.classList.add('hidden');
    },

    savePosQuickAddClient: function() {
        const nameInput = document.getElementById('posNewClientName');
        const phoneInput = document.getElementById('posNewClientPhone');
        const catSelect = document.getElementById('posNewClientCategory');

        const name = (nameInput ? nameInput.value : '').trim();
        const phoneDigits = typeof App !== 'undefined' && App.getCleanAzPhone
            ? App.getCleanAzPhone(phoneInput ? phoneInput.value : '')
            : (phoneInput ? phoneInput.value : '').replace(/\D/g, '').slice(-9);
        const phone = phoneDigits
            ? `+994 ${typeof App !== 'undefined' && App.formatDisplayAzPhone ? App.formatDisplayAzPhone(phoneDigits) : phoneInput.value.trim()}`
            : '';
        const category = catSelect ? catSelect.value : 'new';

        if (!name) {
            if (typeof App !== 'undefined') App.showToast("Müştərinin adını daxil edin");
            return;
        }
        if (phoneDigits.length !== 9) {
            if (typeof App !== 'undefined') App.showToast("9 rəqəmli mobil nömrə daxil edin");
            return;
        }

        let clients = this.getClientsData ? this.getClientsData() : [];
        const newClient = {
            id: 'CLI-' + Math.floor(1000 + Math.random() * 9000),
            name: name,
            phone: phone,
            email: '',
            gender: 'female',
            category: category,
            totalVisits: 0,
            totalSpent: 0,
            createdAt: new Date().toISOString(),
            history: []
        };

        clients.unshift(newClient);
        this.saveClientsData(clients);

        this.closePosQuickAddClientModal();
        this.selectPosClient(newClient.id);

        if (typeof App !== 'undefined') {
            App.showToast(`Yeni müştəri əlavə edildi: ${newClient.name}`);
        }
    },

    setPosSeller: function(staffId) {
        this.posSelectedSellerId = staffId || '';
    },

    setPosDiscountType: function(type) {
        this.posDiscountType = type || 'percent';
        this.renderPosCartUi();
    },

    setPosDiscountValue: function(val) {
        const raw = String(val !== undefined && val !== null ? val : '').trim();
        if (!raw) {
            this.posDiscountPercent = 0;
            this.posDiscountAmount = 0;
        } else {
            const num = Math.max(0, parseFloat(raw) || 0);
            if (this.posDiscountType === 'percent') {
                this.posDiscountPercent = Math.min(100, num);
            } else {
                this.posDiscountAmount = num;
            }
        }
        this.renderPosCartUi();
    },

    setPosPaymentMethod: function(method) {
        this.posPaymentMethod = method || 'cash';
        // Auto-select corresponding account if available
        const fData = this.getFinanceData ? this.getFinanceData() : { accounts: [] };
        const accounts = fData.accounts || [];
        if (method === 'cash') {
            const cashAcc = accounts.find(a => a.type === 'cash' || a.id === 'acc_cash');
            if (cashAcc) this.posSelectedAccountId = cashAcc.id;
        } else if (method === 'terminal') {
            const posAcc = accounts.find(a => a.type === 'pos' || a.id === 'acc_pos');
            if (posAcc) this.posSelectedAccountId = posAcc.id;
        }
        const accSel = document.getElementById('posAccountSelect');
        if (accSel && this.posSelectedAccountId) {
            accSel.value = this.posSelectedAccountId;
        }
        this.renderPosCartUi();
    },

    setPosAccount: function(accId) {
        this.posSelectedAccountId = accId;
    },

    renderPosCartUi: function() {
        const listEl = document.getElementById('posCartItemsList');
        const subtotalEl = document.getElementById('posSubtotalDisplay');
        const discountRowEl = document.getElementById('posDiscountRowDisplay');
        const finalTotalEl = document.getElementById('posFinalTotalDisplay');
        const submitBtn = document.getElementById('posSubmitBtn');
        const submitBtnText = document.getElementById('posSubmitBtnText');
        const itemsCountBadge = document.getElementById('posCartCountBadge');

        if (!listEl) return;

        let subtotal = 0;
        this.posCart.forEach(it => {
            subtotal += (it.qty * it.price);
        });

        let discountVal = 0;
        if (this.posDiscountType === 'percent') {
            discountVal = subtotal * (this.posDiscountPercent / 100);
        } else {
            discountVal = Math.min(subtotal, this.posDiscountAmount);
        }

        const finalTotal = Math.max(0, subtotal - discountVal);

        if (itemsCountBadge) {
            itemsCountBadge.textContent = this.posCart.reduce((acc, it) => acc + it.qty, 0);
        }

        // Synchronize discount type toggle buttons in DOM
        const btnPercent = document.getElementById('posDiscTypePercent');
        const btnFixed = document.getElementById('posDiscTypeFixed');
        if (btnPercent && btnFixed) {
            if (this.posDiscountType === 'percent') {
                btnPercent.className = 'px-2 py-0.5 rounded bg-[#FFDD2D] text-[#101114] font-bold cursor-pointer transition';
                btnFixed.className = 'px-2 py-0.5 rounded text-slate-600 hover:text-slate-900 font-bold cursor-pointer transition';
            } else {
                btnPercent.className = 'px-2 py-0.5 rounded text-slate-600 hover:text-slate-900 font-bold cursor-pointer transition';
                btnFixed.className = 'px-2 py-0.5 rounded bg-[#FFDD2D] text-[#101114] font-bold cursor-pointer transition';
            }
        }

        // Synchronize discount input if not active element
        const discInput = document.getElementById('posDiscountInput');
        if (discInput && document.activeElement !== discInput) {
            const currentVal = this.posDiscountType === 'percent' ? this.posDiscountPercent : this.posDiscountAmount;
            discInput.value = currentVal > 0 ? currentVal : '';
        }

        if (this.posCart.length === 0) {
            listEl.innerHTML = `
                <div class="py-8 text-center text-slate-400 space-y-2">
                    <svg class="w-8 h-8 mx-auto text-slate-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                    <p class="text-xs font-semibold text-slate-600">Səbət boşdur</p>
                    <p class="text-[11px] text-slate-400">Sol tərəfdən məhsul seçin və ya axtarın</p>
                </div>
            `;
            if (submitBtn) submitBtn.disabled = true;
        } else {
            listEl.innerHTML = this.posCart.map(it => {
                const lineTotal = it.qty * it.price;
                return `
                    <div class="py-2.5 flex flex-col gap-1 border-b border-slate-100 last:border-b-0">
                        <div class="flex items-start justify-between gap-2">
                            <h5 class="text-xs font-bold text-slate-900 leading-snug line-clamp-2">${this.escapeHtml(it.name)}</h5>
                            <button type="button" onclick="BusinessDashboardView.removeFromPosCart('${it.productId}')" class="text-slate-300 hover:text-rose-500 transition p-1 cursor-pointer shrink-0" title="Sil">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>
                        <div class="flex items-center justify-between text-xs pt-0.5">
                            <span class="text-[11px] text-slate-400 font-mono">${it.price.toFixed(2)} ₼ / ${this.escapeHtml(it.unit)}</span>
                            <div class="flex items-center gap-3">
                                <div class="flex items-center gap-1 shrink-0 bg-slate-100 rounded-lg p-0.5">
                                    <button type="button" onclick="BusinessDashboardView.updatePosCartQty('${it.productId}', ${it.qty - 1})" class="w-5 h-5 rounded bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs transition cursor-pointer">-</button>
                                    <span class="w-6 text-center text-xs font-bold text-slate-900 font-mono">${it.qty}</span>
                                    <button type="button" onclick="BusinessDashboardView.updatePosCartQty('${it.productId}', ${it.qty + 1})" class="w-5 h-5 rounded bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs transition cursor-pointer">+</button>
                                </div>
                                <span class="text-xs font-bold text-slate-900 font-mono min-w-[55px] text-right">${lineTotal.toFixed(2)} ₼</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            if (submitBtn) submitBtn.disabled = false;
        }

        if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)} ₼`;
        if (discountRowEl) {
            if (discountVal > 0) {
                discountRowEl.classList.remove('hidden');
                const discText = discountRowEl.querySelector('#posDiscountAmountText');
                if (discText) discText.textContent = `- ${discountVal.toFixed(2)} ₼`;
            } else {
                discountRowEl.classList.add('hidden');
            }
        }
        if (finalTotalEl) finalTotalEl.textContent = `${finalTotal.toFixed(2)} ₼`;
        if (submitBtnText) submitBtnText.textContent = `Ödənişi tamamla (${finalTotal.toFixed(2)} ₼)`;

        // Highlight active payment method pill
        ['cash', 'terminal', 'deposit', 'bonus'].forEach(m => {
            const btn = document.getElementById(`posPayMethod_${m}`);
            if (btn) {
                if (this.posPaymentMethod === m) {
                    btn.className = "py-1.5 px-1 rounded-xl border border-[#101114] bg-[#101114] text-white text-center text-xs font-bold transition shadow-2xs cursor-pointer";
                } else {
                    btn.className = "py-1.5 px-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-center text-xs font-semibold transition cursor-pointer";
                }
            }
        });
    },

    completePosSale: function() {
        if (this.posCart.length === 0) {
            if (typeof App !== 'undefined') App.showToast("Səbət boşdur");
            return;
        }

        let products = this.getProducts ? this.getProducts() : [];
        let financeData = this.getFinanceData ? this.getFinanceData() : { accounts: [], transactions: [] };
        let operations = this.getInventoryOperations ? this.getInventoryOperations() : [];
        let clients = this.getClientsData ? this.getClientsData() : [];
        let staffList = this.getStaffList ? this.getStaffList() : [];

        // 1. Stock verification
        for (let it of this.posCart) {
            const p = products.find(x => x.id === it.productId);
            if (!p || (Number(p.stock) || 0) < it.qty) {
                if (typeof App !== 'undefined') App.showToast(`Kifayət qədər qalıq yoxdur: ${it.name}`);
                return;
            }
        }

        // Calculate totals
        let subtotal = 0;
        this.posCart.forEach(it => { subtotal += (it.qty * it.price); });
        let discountVal = 0;
        if (this.posDiscountType === 'percent') {
            discountVal = subtotal * (this.posDiscountPercent / 100);
        } else {
            discountVal = Math.min(subtotal, this.posDiscountAmount);
        }
        const finalTotal = Math.max(0, subtotal - discountVal);

        const now = new Date();
        const dateIso = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
        const receiptDocNum = 'SAT-' + String(Date.now()).slice(-5);

        // Find client & seller
        const clientObj = clients.find(c => c.id === this.posSelectedClientId);
        const clientName = clientObj ? clientObj.name : 'Anonim alıcı';
        const clientPhone = clientObj ? (clientObj.phone || '') : '';

        if (this.posPaymentMethod === 'deposit' || this.posPaymentMethod === 'bonus') {
            if (!clientObj) {
                if (typeof App !== 'undefined') App.showToast('Depozit və bonus ilə ödəniş üçün müştəri seçin');
                return;
            }
            const available = Number(this.posPaymentMethod === 'deposit' ? clientObj.depositBalance : clientObj.cashbackBalance) || 0;
            if (available < finalTotal) {
                if (typeof App !== 'undefined') App.showToast('Müştəri balansında kifayət qədər vəsait yoxdur');
                return;
            }
        }

        const sellerObj = staffList.find(s => s.id === this.posSelectedSellerId);
        const sellerName = sellerObj ? sellerObj.name : 'Növbətçi kassir';

        const paymentMethodNames = {
            cash: 'Nağd',
            terminal: 'POS-Terminal (Kart)',
            deposit: 'Depozit',
            bonus: 'Keşbek / Bonus'
        };
        const payMethodLabel = paymentMethodNames[this.posPaymentMethod] || 'Nağd';

        // 2. Reduce stock & record inventory operation
        for (let it of this.posCart) {
            const p = products.find(x => x.id === it.productId);
            if (p) {
                p.stock = Math.max(0, (Number(p.stock) || 0) - it.qty);
                if (p.stock === 0) {
                    p.status = 'out_of_stock';
                } else if (p.stock <= (Number(p.minStock) || 5)) {
                    p.status = 'low_stock';
                } else {
                    p.status = 'in_stock';
                }
            }
        }
        this.saveProducts(products);

        // Record inventory write-off operation
        const newOp = {
            id: 'op_' + Date.now(),
            docNumber: receiptDocNum,
            type: 'writeoff',
            typeName: 'Kassa satışı',
            date: dateIso,
            warehouseId: 'wh_main',
            warehouseName: 'Əsas anbar (Salon)',
            supplier: clientName,
            notes: `Pərakəndə satış çeki #${receiptDocNum}. Satıcı: ${sellerName}. Ödəniş: ${payMethodLabel}`,
            items: this.posCart.map(it => ({
                id: 'item_' + Math.random().toString(36).substr(2, 6),
                productId: it.productId,
                name: it.name,
                sku: it.sku,
                qty: it.qty,
                price: it.price,
                total: it.qty * it.price
            })),
            createdAt: now.toISOString()
        };
        operations.unshift(newOp);
        this.saveInventoryOperations(operations);

        // 3. Record Finance transaction & update account balance
        const balancePayment = this.posPaymentMethod === 'deposit' || this.posPaymentMethod === 'bonus';
        const targetAccId = balancePayment ? '' : (this.posSelectedAccountId || (this.posPaymentMethod === 'terminal' ? 'acc_pos' : 'acc_cash'));
        const acc = (financeData.accounts || []).find(a => a.id === targetAccId);
        if (acc && !balancePayment) {
            acc.balance = (Number(acc.balance) || 0) + finalTotal;
        }

        // If shift is open, update shift turnover
        if (!balancePayment && financeData.shift && financeData.shift.status === 'open') {
            if (this.posPaymentMethod === 'cash') {
                financeData.shift.cashTurnover = (Number(financeData.shift.cashTurnover) || 0) + finalTotal;
            } else {
                financeData.shift.cardTurnover = (Number(financeData.shift.cardTurnover) || 0) + finalTotal;
            }
            financeData.shift.totalTurnover = (Number(financeData.shift.totalTurnover) || 0) + finalTotal;
        }

        const newTx = {
            id: 'tx_' + Date.now(),
            date: dateIso,
            time: timeStr,
            type: 'income',
            accountId: targetAccId,
            categoryId: 'cat_inc_product',
            amount: finalTotal,
            title: `Məhsul satışı (${this.posCart.length} adda)`,
            counterparty: clientName,
            note: `Çek #${receiptDocNum} • ${payMethodLabel} • Satıcı: ${sellerName}`
        };
        if (!financeData.transactions) financeData.transactions = [];
        financeData.transactions.unshift(newTx);
        this.saveFinanceData(financeData);

        // 4. Update Client History if registered client
        if (clientObj) {
            if (this.posPaymentMethod === 'deposit') clientObj.depositBalance = (Number(clientObj.depositBalance) || 0) - finalTotal;
            if (this.posPaymentMethod === 'bonus') clientObj.cashbackBalance = (Number(clientObj.cashbackBalance) || 0) - finalTotal;
            if (!clientObj.history) clientObj.history = [];
            clientObj.history.unshift({
                date: dateIso,
                serviceName: `Məhsul satışı: ${this.posCart.map(i => i.name).join(', ')}`,
                staffName: sellerName,
                cost: finalTotal,
                status: 'Tamamlandı'
            });
            clientObj.totalVisits = (Number(clientObj.totalVisits) || 0) + 1;
            clientObj.totalSpent = (Number(clientObj.totalSpent) || 0) + finalTotal;
            this.saveClientsData(clients);
            if (this.posPaymentMethod === 'bonus') {
                const loyalty = this.getLoyaltyData();
                const record = (loyalty.clients || []).find(c => c.id === clientObj.id);
                if (record) {
                    record.bonusBalance = clientObj.cashbackBalance;
                    this.saveLoyaltyData(loyalty);
                }
            }
        }

        // 5. Build receipt object
        const activeCtx = this.getActiveContext ? this.getActiveContext() : {};
        const receiptData = {
            docNumber: receiptDocNum,
            date: dateIso,
            time: timeStr,
            businessName: activeCtx.businessName || 'Zeyvo Salon Studio',
            branchName: activeCtx.branchName || 'Mərkəz Filialı',
            clientName: clientName,
            clientPhone: clientPhone,
            sellerName: sellerName,
            paymentMethod: payMethodLabel,
            accountName: balancePayment ? payMethodLabel : (acc ? acc.name : 'Əsas kassa'),
            items: JSON.parse(JSON.stringify(this.posCart)),
            subtotal: subtotal,
            discount: discountVal,
            finalTotal: finalTotal
        };

        this.lastCompletedSaleReceipt = receiptData;

        // Close POS Modal
        this.closePosModal();

        // Refresh views
        this.refreshFinanceCanvas();
        this.refreshProductsModule();

        if (typeof App !== 'undefined') {
            App.showToast(`Satış uğurla tamamlandı: ${finalTotal.toFixed(2)} ₼`);
        }

        // Open Receipt Dialog
        this.openPosReceiptModal(receiptData);
    },

    openPosReceiptModal: function(receipt) {
        const modal = document.getElementById('bizPosReceiptModal');
        const content = document.getElementById('bizPosReceiptContent');
        if (!modal || !content || !receipt) return;

        content.innerHTML = `
            <div class="bg-white border border-slate-200 rounded-2xl p-5 font-mono text-xs text-slate-800 space-y-3 shadow-xs">
                <!-- Receipt Top -->
                <div class="text-center pb-3 border-b border-dashed border-slate-300 space-y-0.5">
                    <h4 class="font-bold text-sm text-slate-900">${this.escapeHtml(receipt.businessName)}</h4>
                    <p class="text-[11px] text-slate-500">${this.escapeHtml(receipt.branchName)}</p>
                    <p class="text-[10px] text-slate-400 font-semibold mt-1">Kassa çeki • ${this.escapeHtml(receipt.docNumber)}</p>
                </div>

                <!-- Meta -->
                <div class="text-[11px] space-y-1 text-slate-600">
                    <div class="flex justify-between">
                        <span class="text-slate-400">Tarix & Vaxt:</span>
                        <span class="font-bold text-slate-800">${receipt.date} ${receipt.time}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Satıcı / Kassir:</span>
                        <span class="font-bold text-slate-800">${this.escapeHtml(receipt.sellerName)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Alıcı:</span>
                        <span class="font-bold text-slate-800">${this.escapeHtml(receipt.clientName)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Ödəniş üsulu:</span>
                        <span class="font-bold text-slate-800">${this.escapeHtml(receipt.paymentMethod)}</span>
                    </div>
                </div>

                <!-- Items -->
                <div class="pt-2 border-t border-dashed border-slate-300">
                    <div class="text-[10px] text-slate-400 flex justify-between pb-1 font-semibold">
                        <span>Ad / Miqdar</span>
                        <span>Məbləğ</span>
                    </div>
                    <div class="space-y-1.5 pt-1">
                        ${receipt.items.map(it => `
                            <div class="flex justify-between items-start text-[11px]">
                                <div class="pr-2">
                                    <div class="font-bold text-slate-900 leading-snug">${this.escapeHtml(it.name)}</div>
                                    <div class="text-[10px] text-slate-400">${it.qty} x ${it.price.toFixed(2)} ₼</div>
                                </div>
                                <div class="font-bold text-slate-900 shrink-0">${(it.qty * it.price).toFixed(2)} ₼</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Totals -->
                <div class="pt-2.5 border-t border-dashed border-slate-300 space-y-1">
                    <div class="flex justify-between text-[11px]">
                        <span class="text-slate-500">Məhsul cəmi:</span>
                        <span class="font-bold">${receipt.subtotal.toFixed(2)} ₼</span>
                    </div>
                    ${receipt.discount > 0 ? `
                        <div class="flex justify-between text-[11px] text-amber-700">
                            <span>Endirim:</span>
                            <span class="font-bold">- ${receipt.discount.toFixed(2)} ₼</span>
                        </div>
                    ` : ''}
                    <div class="flex justify-between text-sm font-black pt-1.5 border-t border-slate-200 text-slate-900">
                        <span>YEKUN ÖDƏNİŞ:</span>
                        <span>${receipt.finalTotal.toFixed(2)} ₼</span>
                    </div>
                </div>

                <!-- Footer note -->
                <div class="pt-3 border-t border-dashed border-slate-300 text-center text-[10px] text-slate-400">
                    Bizi seçdiyiniz üçün təşəkkür edirik!
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    },

    closePosReceiptModal: function() {
        const modal = document.getElementById('bizPosReceiptModal');
        if (modal) modal.classList.add('hidden');
    },

    printPosReceipt: function() {
        window.print();
    },

    // Render POS Modals (Strictly compliant with GEMINI.md Rule 5: NO icons in modal headers!)
    renderPosModals: function() {
        return `
            <!-- ==========================================
                 1. POS TERMINAL / KASSA SATIŞI MODAL
                 (GEMINI.md Rule 5 compliant: Clean header, no icons)
            =========================================== -->
            <div id="bizPosModal" class="hidden fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
                <div class="bg-white rounded-3xl max-w-6xl w-full h-[88vh] max-h-[820px] min-h-[560px] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <!-- Clean Header (Strictly compliant with GEMINI.md - Rule 5) -->
                    ${ZeyvoUI.modalHeader({ title: "Kassa satışı (POS terminal)", description: "Məhsulların sürətli pərakəndə satışı və kassa mədaxili", onClose: "BusinessDashboardView.closePosModal()" })}

                    <!-- Body 2-Column Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                        <!-- LEFT: Catalog & Products (7 cols) -->
                        <div class="lg:col-span-7 flex flex-col h-full min-h-0 overflow-hidden p-4 sm:p-5 space-y-3">
                            <!-- Search & Filter Bar -->
                            <div class="space-y-2 shrink-0">
                                <div class="relative">
                                    <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                    <input type="text" id="posSearchInput" oninput="BusinessDashboardView.onPosSearch(this.value)" placeholder="Məhsul adı, barkod və ya artikul..." class="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#FFDD2D] focus:ring-1 focus:ring-[#FFDD2D] outline-none bg-slate-50/50 focus:bg-white transition" />
                                </div>
                                <div id="posCategoryPills" class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none shrink-0">
                                    <!-- Populated dynamically -->
                                </div>
                            </div>

                            <!-- Products Grid -->
                            <div id="posProductsGrid" class="flex-1 min-h-0 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2.5 pr-1 content-start">
                                <!-- Populated dynamically -->
                            </div>
                        </div>

                        <!-- RIGHT: Cart & Checkout (5 cols) -->
                        <div class="lg:col-span-5 flex flex-col h-full min-h-0 overflow-hidden p-4 sm:p-5 bg-slate-50/40 space-y-3">
                            <!-- Customer & Seller Selectors -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
                                <!-- Searchable Client Combobox -->
                                <div class="relative" id="posClientSelectorWrapper">
                                    <div class="flex items-center justify-between mb-1">
                                        <label class="block text-[11px] font-bold text-slate-600">Alıcı (Müştəri)</label>
                                        <button type="button" onclick="BusinessDashboardView.openPosQuickAddClientModal()" class="text-[10px] text-amber-700 hover:text-amber-800 font-bold hover:underline cursor-pointer flex items-center gap-0.5" title="Yeni müştəri əlavə et">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                            <span>Yeni</span>
                                        </button>
                                    </div>
                                    <div id="posClientTrigger" onclick="BusinessDashboardView.togglePosClientDropdown()" class="w-full h-9 px-2 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition flex items-center justify-between cursor-pointer shadow-2xs">
                                        <div id="posClientTriggerContent" class="min-w-0 flex-1 flex items-center gap-1.5 text-left">
                                            <!-- Dynamically populated -->
                                        </div>
                                        <svg class="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                                    </div>

                                    <!-- Searchable Dropdown Popover -->
                                    <div id="posClientDropdown" class="hidden absolute top-full left-0 right-0 mt-1 z-40 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 space-y-2 animate-in fade-in zoom-in-95 duration-100">
                                        <div class="relative">
                                            <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                            <input type="text" id="posClientSearchInput" oninput="BusinessDashboardView.onPosClientSearch(this.value)" placeholder="Ad və ya nömrə ilə axtar..." class="w-full h-8 pl-8 pr-2.5 rounded-lg border border-slate-200 text-xs outline-none focus:border-amber-400 bg-slate-50 focus:bg-white" />
                                        </div>

                                        <button type="button" onclick="BusinessDashboardView.openPosQuickAddClientModal()" class="w-full py-1.5 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-between transition cursor-pointer">
                                            <span>+ Yeni müştəri əlavə et</span>
                                            <span class="text-[10px] text-amber-600 font-semibold">Sürətli</span>
                                        </button>

                                        <div id="posClientListContainer" class="max-h-44 overflow-y-auto divide-y divide-slate-100">
                                            <!-- Populated dynamically -->
                                        </div>
                                    </div>
                                </div>

                                <!-- Seller / Staff Selector -->
                                <div>
                                    <label class="block text-[11px] font-bold text-slate-600 mb-1">Satıcı / Kassir</label>
                                    <select id="posSellerSelect" onchange="BusinessDashboardView.setPosSeller(this.value)" class="w-full h-9 px-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 outline-none">
                                        <!-- Populated dynamically -->
                                    </select>
                                </div>
                            </div>

                            <!-- Cart Items Box -->
                            <div class="flex-1 min-h-0 flex flex-col overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-3 shadow-2xs space-y-1.5">
                                <div class="flex items-center justify-between shrink-0 pb-1.5 border-b border-slate-100">
                                    <div class="flex items-center gap-1.5">
                                        <span class="text-xs font-bold text-slate-800">Səbət</span>
                                        <span id="posCartCountBadge" class="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-[#FFDD2D] text-[#101114]">0</span>
                                    </div>
                                    <button type="button" onclick="BusinessDashboardView.clearPosCart()" class="text-[11px] text-slate-400 hover:text-rose-600 transition font-medium cursor-pointer">
                                        Təmizlə
                                    </button>
                                </div>
                                <div id="posCartItemsList" class="flex-1 min-h-0 overflow-y-auto divide-y divide-slate-100 pr-1">
                                    <!-- Populated dynamically -->
                                </div>
                            </div>

                            <!-- Checkout Controls (Pinned at bottom) -->
                            <div class="shrink-0 space-y-2">
                                <!-- Totals & Discount -->
                                <div class="bg-white rounded-2xl border border-slate-200/80 p-3 space-y-1.5">
                                    <div class="flex items-center justify-between text-xs text-slate-500">
                                        <span>Məhsul cəmi:</span>
                                        <span id="posSubtotalDisplay" class="font-bold text-slate-800 font-mono">0.00 ₼</span>
                                    </div>

                                    <div class="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                                        <span class="text-xs font-semibold text-slate-600 shrink-0">Endirim:</span>
                                        <div class="flex items-center gap-1">
                                            <input type="number" min="0" step="any" id="posDiscountInput" oninput="BusinessDashboardView.setPosDiscountValue(this.value)" placeholder="0" class="w-20 h-7 px-2 rounded-lg border border-slate-200 text-xs font-mono font-bold text-right outline-none focus:border-amber-400" />
                                            <div class="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-[10px] font-bold">
                                                <button type="button" id="posDiscTypePercent" onclick="BusinessDashboardView.setPosDiscountType('percent')" class="px-2 py-0.5 rounded bg-[#FFDD2D] text-[#101114] font-bold cursor-pointer transition">%</button>
                                                <button type="button" id="posDiscTypeFixed" onclick="BusinessDashboardView.setPosDiscountType('fixed')" class="px-2 py-0.5 rounded text-slate-600 hover:text-slate-900 font-bold cursor-pointer transition">₼</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="posDiscountRowDisplay" class="hidden flex items-center justify-between text-xs text-amber-700">
                                        <span>Tətbiq edilən endirim:</span>
                                        <span id="posDiscountAmountText" class="font-bold font-mono">- 0.00 ₼</span>
                                    </div>

                                    <div class="flex items-center justify-between pt-1.5 border-t border-slate-200">
                                        <span class="text-xs sm:text-sm font-bold text-slate-900">Yekun məbləğ</span>
                                        <span id="posFinalTotalDisplay" class="text-lg sm:text-xl font-black text-slate-900 font-mono">0.00 ₼</span>
                                    </div>
                                </div>

                                <!-- Payment Method Selector -->
                                <div class="space-y-1.5">
                                    <div class="grid grid-cols-4 gap-1.5">
                                        <button type="button" id="posPayMethod_cash" onclick="BusinessDashboardView.setPosPaymentMethod('cash')" class="py-1.5 px-1 rounded-xl border border-[#101114] bg-[#101114] text-white text-center text-xs font-bold transition shadow-2xs cursor-pointer">
                                            Nağd
                                        </button>
                                        <button type="button" id="posPayMethod_terminal" onclick="BusinessDashboardView.setPosPaymentMethod('terminal')" class="py-1.5 px-1 rounded-xl border border-slate-200 bg-white text-slate-700 text-center text-xs font-semibold transition cursor-pointer">
                                            Terminal
                                        </button>
                                        <button type="button" id="posPayMethod_deposit" onclick="BusinessDashboardView.setPosPaymentMethod('deposit')" class="py-1.5 px-1 rounded-xl border border-slate-200 bg-white text-slate-700 text-center text-xs font-semibold transition cursor-pointer">
                                            Depozit
                                        </button>
                                        <button type="button" id="posPayMethod_bonus" onclick="BusinessDashboardView.setPosPaymentMethod('bonus')" class="py-1.5 px-1 rounded-xl border border-slate-200 bg-white text-slate-700 text-center text-xs font-semibold transition cursor-pointer">
                                            Bonus
                                        </button>
                                    </div>

                                    <div>
                                        <select id="posAccountSelect" aria-label="Ödəniş hesabı" onchange="BusinessDashboardView.setPosAccount(this.value)" class="w-full h-8 px-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-none">
                                            <!-- Populated dynamically -->
                                        </select>
                                    </div>
                                </div>

                                <!-- Submit / Pay Button -->
                                <div>
                                    <button type="button" id="posSubmitBtn" onclick="BusinessDashboardView.completePosSale()" class="w-full h-11 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs sm:text-sm transition shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                        <span id="posSubmitBtnText">Ödənişi tamamla (0.00 ₼)</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 2. POS RECEIPT MODAL (ÇEK)
                 (GEMINI.md Rule 5 compliant: Clean header, no icons)
            =========================================== -->
            <div id="bizPosReceiptModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
                <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                    ${ZeyvoUI.modalHeader({ title: "Satış qəbzi", description: "Kassa əməliyyatı təsdiqləndi", onClose: "BusinessDashboardView.closePosReceiptModal()" })}

                    <div id="bizPosReceiptContent">
                        <!-- Populated dynamically -->
                    </div>

                    <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                        ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closePosReceiptModal()", size: "md", type: "button" })}
                        <div class="flex items-center gap-2">
                            <button type="button" onclick="BusinessDashboardView.closePosReceiptModal(); BusinessDashboardView.openPosModal();" class="px-4 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer">
                                Yeni satış
                            </button>
                            <button type="button" onclick="BusinessDashboardView.printPosReceipt()" class="px-4 h-10 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                                <span>Çap et</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 3. POS QUICK ADD CLIENT MODAL
                 (GEMINI.md Rule 5 compliant: Clean header, no icons)
            =========================================== -->
            <div id="bizPosQuickClientModal" class="hidden fixed inset-0 z-60 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
                <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                    ${ZeyvoUI.modalHeader({ title: 'Yeni müştəri əlavə et', description: 'Sürətli qeydiyyat və kassa satışına bağlama', onClose: 'BusinessDashboardView.closePosQuickAddClientModal()' })}

                    <form id="posQuickAddClientForm" onsubmit="event.preventDefault(); BusinessDashboardView.savePosQuickAddClient();" class="space-y-3.5">
                        ${ZeyvoUI.textField({ id: 'posNewClientName', label: 'Ad və Soyad', placeholder: 'Məs: Aysel Məmmədova', required: true })}

                        ${ZeyvoUI.textField({ id: 'posNewClientPhone', label: 'Əlaqə nömrəsi', type: 'tel', placeholder: '+994 (50) 000-00-00', required: true })}

                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Kateqoriya / Qrup</label>
                            <select id="posNewClientCategory" class="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-medium outline-none">
                                <option value="new">Yeni müştəri</option>
                                <option value="regular">Daimi müştəri</option>
                                <option value="vip">VIP müştəri</option>
                            </select>
                        </div>

                        <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                            ${ZeyvoUI.button({ label: "Ləğv et", variant: "secondary", onClick: "BusinessDashboardView.closePosQuickAddClientModal()", size: "md", type: "button" })}
                            ${ZeyvoUI.button({ label: "Yadda saxla və seç", type: "submit" })}
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    afterRender: function() {
        // Any post-render initializations
        if (!window._zeyvoDatePickerListenerAttached) {
            window._zeyvoDatePickerListenerAttached = true;
            document.addEventListener('click', (e) => {
                if (!e.target.closest('[id$="DatePickerWrapper"]') && !e.target.closest('[id$="DateWrapper"]')) {
                    if (window.BusinessDashboardView && typeof window.BusinessDashboardView.closeAllCustomDatePickers === 'function') {
                        window.BusinessDashboardView.closeAllCustomDatePickers();
                    }
                }
                if (!e.target.closest('#posClientSelectorWrapper') && !e.target.closest('#bizPosQuickClientModal')) {
                    if (window.BusinessDashboardView && typeof window.BusinessDashboardView.togglePosClientDropdown === 'function') {
                        window.BusinessDashboardView.togglePosClientDropdown(false);
                    }
                }
            });
        }
    }
});
