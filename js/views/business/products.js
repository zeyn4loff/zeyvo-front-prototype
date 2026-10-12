// CRM module; loaded after businessDashboardView.js.
Object.assign(BusinessDashboardView, {
    // MODULE: MƏHSULLAR (PRODUCTS & INVENTORY)
    // Categories, Retail items, Consumables & Stock
    // ==========================================
    getDefaultProductCategories: function() {
        return [
            {
                id: 'pcat_hair',
                name: 'Saç qulluğu və stilləşdirmə',
                icon: 'scissors',
                description: 'Şampunlar, maskalar, zərdablar və professional stilləşdirmə məhsulları.'
            },
            {
                id: 'pcat_skin',
                name: 'Dəri baxımı və kosmetologiya',
                icon: 'spa',
                description: 'Nəmləndirici kremlər, günəşdən qoruyucular və dərini bərpa edən vasitələr.'
            },
            {
                id: 'pcat_nails',
                name: 'Manikür və dırnaq materialları',
                icon: 'nail',
                description: 'Baza, top, gel boyaları, qulluq yağları və aksessuarlar.'
            },
            {
                id: 'pcat_consumables',
                name: 'Sərfiyyat və gigiyena',
                icon: 'sparkles',
                description: 'Birdəfəlik əlcəklər, sterilizasiya məhlulları və gigiyenik materiallar.'
            },
            {
                id: 'pcat_medical',
                name: 'Tibbi və stomatoloji vasitələr',
                icon: 'medical',
                description: 'Diş pastaları, fırçalar, anesteziya materialları və gigiyenik dəstlər.'
            }
        ];
    },

    getProductCategories: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_product_categories_v1'));
        if (stored) {
            try {
                const list = JSON.parse(stored);
                if (Array.isArray(list) && list.length > 0) return list;
            } catch (e) {
                console.error("Error parsing product categories", e);
            }
        }
        const defaults = this.getDefaultProductCategories();
        this.saveProductCategories(defaults);
        return defaults;
    },

    saveProductCategories: function(categories) {
        localStorage.setItem(this.storageKey('zeyvo_business_product_categories_v1'), JSON.stringify(categories));
    },

    getDefaultProducts: function() {
        return [
            {
                id: 'prod_1',
                name: 'Kerastase Nutritive Magistral Şampun 250ml',
                type: 'retail',
                categoryId: 'pcat_hair',
                sku: 'KRT-NUT-250',
                barcode: '3474636382645',
                costPrice: 28,
                salePrice: 45,
                stock: 14,
                minStock: 4,
                unit: 'ədəd',
                status: 'in_stock',
                branchId: 'br_bbs_1',
                branchName: 'Mərkəz Filialı',
                businessName: 'Baku Beauty Studio',
                notes: 'Quru və zədələnmiş saçlar üçün intensiv qidalandırıcı şampun. Salonda satış üçün.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'prod_2',
                name: 'Olaplex No.3 Hair Perfector 100ml',
                type: 'retail',
                categoryId: 'pcat_hair',
                sku: 'OLP-03-100',
                barcode: '850018802209',
                costPrice: 34,
                salePrice: 58,
                stock: 3,
                minStock: 5,
                unit: 'ədəd',
                status: 'low_stock',
                branchId: 'br_bbs_1',
                branchName: 'Mərkəz Filialı',
                businessName: 'Baku Beauty Studio',
                notes: 'Boya sonrası saç bağlarını bərpa edən eliksir. Həm kabinetdə tətbiq olunur, həm satılır.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'prod_3',
                name: 'La Roche-Posay Anthelios SPF50+ Fluide 50ml',
                type: 'retail',
                categoryId: 'pcat_skin',
                sku: 'LRP-SPF50-FL',
                barcode: '3337875706599',
                costPrice: 24,
                salePrice: 42,
                stock: 19,
                minStock: 4,
                unit: 'ədəd',
                status: 'in_stock',
                branchId: 'br_bbs_1',
                branchName: 'Mərkəz Filialı',
                businessName: 'Baku Beauty Studio',
                notes: 'Kosmetoloji prosedurlardan sonra dərinin SPF müdafiəsi üçün məhsul.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'prod_4',
                name: 'Birdəfəlik steril nitril əlcək (Qara, M)',
                type: 'internal',
                categoryId: 'pcat_consumables',
                sku: 'GLV-NIT-BK-M',
                barcode: '476008123001',
                costPrice: 9.5,
                salePrice: 0,
                stock: 2,
                minStock: 5,
                unit: 'qutu',
                status: 'low_stock',
                branchId: 'br_bbs_1',
                branchName: 'Mərkəz Filialı',
                businessName: 'Baku Beauty Studio',
                notes: '100 ədədlik qutu. Prosedurlar zamanı daxili sərfiyyat üçün istifadə olunur.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'prod_5',
                name: 'Kodi Professional Kauçuk Baza 15ml',
                type: 'internal',
                categoryId: 'pcat_nails',
                sku: 'KD-BASE-15',
                barcode: '482017688301',
                costPrice: 14,
                salePrice: 25,
                stock: 9,
                minStock: 3,
                unit: 'ədəd',
                status: 'in_stock',
                branchId: 'br_bbs_2',
                branchName: 'Gənclik Filialı',
                businessName: 'Baku Beauty Studio',
                notes: 'Dırnaq ustalığı kabineti üçün peşəkar gel əsası.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'prod_6',
                name: 'Alətlər üçün sürətli dezinfeksiya spreyi 1L',
                type: 'internal',
                categoryId: 'pcat_consumables',
                sku: 'DES-SPR-1000',
                barcode: '476009944112',
                costPrice: 11,
                salePrice: 0,
                stock: 0,
                minStock: 2,
                unit: 'ədəd',
                status: 'out_of_stock',
                branchId: 'br_bbs_2',
                branchName: 'Gənclik Filialı',
                businessName: 'Baku Beauty Studio',
                notes: 'Səthlərin və metal alətlərin dezinfeksiyası üçün məhlul.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'prod_7',
                name: 'Curaprox Ultra Soft 5460 Diş fırçası',
                type: 'retail',
                categoryId: 'pcat_medical',
                sku: 'CURA-5460',
                barcode: '761241242301',
                costPrice: 8,
                salePrice: 16,
                stock: 15,
                minStock: 5,
                unit: 'ədəd',
                status: 'in_stock',
                branchId: 'br_bbs_1',
                branchName: 'Mərkəz Filialı',
                businessName: 'Baku Beauty Studio',
                notes: 'Stomatoloji pasiyentlər üçün premium profilaktik diş fırçası.',
                createdAt: new Date().toISOString()
            }
        ];
    },

    getProducts: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_products_v1'));
        if (stored) {
            try {
                let list = JSON.parse(stored);
                if (Array.isArray(list) && list.length === 0) return [];
                if (Array.isArray(list) && list.length > 0) {
                    let modified = false;
                    const categories = this.getProductCategories();
                    const defaultCatId = categories[0]?.id || 'pcat_hair';
                    list = list.map(p => {
                        let updated = { ...p };
                        if (updated.type === 'both') {
                            updated.type = 'retail';
                            modified = true;
                        }
                        if (!updated.categoryId) {
                            updated.categoryId = defaultCatId;
                            modified = true;
                        }
                        return updated;
                    });
                    if (modified) this.saveProducts(list);
                    return list;
                }
            } catch (e) {
                console.error("Error parsing products", e);
            }
        }
        if (this.storageKey('zeyvo_business_products_v1') !== 'zeyvo_business_products_v1') return [];
        const defaults = this.getDefaultProducts();
        this.saveProducts(defaults);
        return defaults;
    },

    saveProducts: function(products) {
        localStorage.setItem(this.storageKey('zeyvo_business_products_v1'), JSON.stringify(products));
    },

    // Products filters & state
    productSearchQuery: '',
    productTypeFilter: 'all', // 'all', 'retail', 'internal', 'both'
    productCategoryFilter: 'all',
    productStockFilter: 'all', // 'all', 'in_stock', 'low_stock', 'out_of_stock'
    collapsedProductCategories: {},

    toggleProductCategoryCollapse: function(catId) {
        this.collapsedProductCategories[catId] = !this.collapsedProductCategories[catId];
        const isCollapsed = !!this.collapsedProductCategories[catId];
        const list = document.getElementById(`prodCategoryList_${catId}`);
        const chevron = document.getElementById(`prodCatChevron_${catId}`);
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

    getProductTypeConfig: function(type) {
        switch (type) {
            case 'retail':
                return {
                    label: 'Satış üçün',
                    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
                    dotClass: 'bg-amber-500'
                };
            case 'internal':
                return {
                    label: 'Sərfiyyat',
                    badgeClass: 'bg-blue-50 text-blue-800 border-blue-200/80',
                    dotClass: 'bg-blue-500'
                };
            case 'both':
                return {
                    label: 'Hər ikisi',
                    badgeClass: 'bg-purple-50 text-purple-800 border-purple-200/80',
                    dotClass: 'bg-purple-500'
                };
            default:
                return {
                    label: 'Standart',
                    badgeClass: 'bg-slate-50 text-slate-700 border-slate-200',
                    dotClass: 'bg-slate-400'
                };
        }
    },

    getProductStockStatus: function(prod) {
        const stock = parseInt(prod.stock) || 0;
        const minStock = parseInt(prod.minStock) || 3;
        if (stock <= 0) {
            return {
                key: 'out_of_stock',
                label: 'Bitib',
                badgeClass: 'bg-rose-50 text-rose-700 border-rose-200/80',
                dotClass: 'bg-rose-500'
            };
        }
        if (stock <= minStock) {
            return {
                key: 'low_stock',
                label: 'Kritik qalıq',
                badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
                dotClass: 'bg-amber-500'
            };
        }
        return {
            key: 'in_stock',
            label: 'Stokda var',
            badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
            dotClass: 'bg-emerald-500'
        };
    },

    // Helper for European standard date format (DD.MM.YYYY, e.g. 12.02.2026)
    formatDateDisplay: function(dateStr) {
        if (!dateStr) return '';
        const trimmed = String(dateStr).trim();
        // If already DD.MM.YYYY
        if (/^\d{2}\.\d{2}\.\d{4}$/.test(trimmed)) return trimmed;
        // If YYYY-MM-DD or ISO timestamp (e.g. 2026-10-01 or 2026-09-01 14:00)
        if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
            const timePart = trimmed.includes(' ') ? ' ' + trimmed.split(' ')[1] : '';
            const clean = trimmed.split('T')[0].split(' ')[0];
            const parts = clean.split('-');
            if (parts.length === 3) {
                return `${parts[2]}.${parts[1]}.${parts[0]}${timePart}`;
            }
        }
        try {
            const d = new Date(trimmed);
            if (!isNaN(d.getTime())) {
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}.${month}.${year}`;
            }
        } catch (e) {}
        return trimmed;
    },

    showToast: function(msg) {
        if (typeof App !== 'undefined' && App.showToast) {
            App.showToast(msg);
        } else {
            const toast = document.getElementById('toast');
            const text = document.getElementById('toastText');
            if (toast && text) {
                text.textContent = msg;
                toast.classList.remove('hidden');
                if (window._zeyvoToastTimer) clearTimeout(window._zeyvoToastTimer);
                window._zeyvoToastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
            }
        }
    },

    // Products and Inventory sub-tabs state
    balanceSearchQuery: '',
    balanceWarehouseFilter: 'all',
    balanceStockFilter: 'all',
    balanceCategoryFilter: 'all',
    balanceCurrentPage: 1,
    balancePageSize: 10,
    tempBalanceWarehouse: null,
    tempBalanceStock: null,
    techCardSearchQuery: '',
    operationTypeFilter: 'all',
    operationsCurrentPage: 1,
    operationsPageSize: 10,
    auditsCurrentPage: 1,
    auditsPageSize: 10,

    renderProductsModule: function() {
        const sub = this.productsActiveTab || 'balances';
        const products = this.getProducts();
        const warehouses = this.getWarehouses();
        const techCards = this.getTechCards();
        const operations = this.getInventoryOperations();
        const audits = this.getInventoryAudits();
        const suppliers = this.getSuppliers();

        const subTabs = [
            { id: 'balances', label: 'Qalıqlar', badge: products.length },
            { id: 'warehouses', label: 'Anbarlar', badge: warehouses.length },
            { id: 'catalog', label: 'Bütün məhsullar', badge: products.length },
            { id: 'techcards', label: 'Texnoloji kartlar', badge: techCards.length },
            { id: 'operations', label: 'Anbar əməliyyatları', badge: operations.length },
            { id: 'inventory', label: 'İnventarizasiya', badge: audits.length },
            { id: 'suppliers', label: 'Təchizatçılar', badge: suppliers.length }
        ];

        return `
            <div class="max-w-5xl mx-auto px-4 py-5 sm:px-7 sm:py-7 space-y-6">
                <!-- SUB-TABS NAVIGATION (Unified Segmented Control) -->
                <div>
                    ${this.renderSegmentedTabs({
                        tabs: subTabs,
                        activeId: sub,
                        isLink: true,
                        linkPrefix: '#/business/products/'
                    })}
                </div>

                <!-- SUB-TAB CONTENT -->
                <div id="bizProductsSubContent">
                    ${this.renderProductsSubTabContent(sub)}
                </div>
            </div>
        `;
    },

    renderProductsSubTabContent: function(sub) {
        switch (sub) {
            case 'balances':
                return this.renderProductsBalancesSection();
            case 'warehouses':
                return this.renderProductsWarehousesSection();
            case 'catalog':
                return this.renderProductsCatalogSection();
            case 'techcards':
                return this.renderProductsTechCardsSection();
            case 'operations':
                return this.renderProductsOperationsSection();
            case 'inventory':
                return this.renderProductsInventorySection();
            case 'suppliers':
                return this.renderProductsSuppliersSection();
            default:
                return this.renderProductsBalancesSection();
        }
    },

    // 1. Qalıqlar (Stock balances across warehouses / fast inventory)
    renderProductsBalancesSection: function() {
        const activeCtx = this.getActiveContext();
        let products = this.getProducts().filter(p => {
            if (p.branchId) {
                return p.branchId === activeCtx.branchId || p.branchName === activeCtx.branchName;
            }
            return p.businessName === activeCtx.businessName;
        });

        const warehouses = this.getWarehouses();

        const totalCount = products.length;
        const inStockCount = products.filter(p => (parseInt(p.stock) || 0) > (parseInt(p.minStock) || 3)).length;
        const lowStockCount = products.filter(p => {
            const s = parseInt(p.stock) || 0;
            return s > 0 && s <= (parseInt(p.minStock) || 3);
        }).length;
        const outOfStockCount = products.filter(p => (parseInt(p.stock) || 0) <= 0).length;
        const totalCostValue = products.reduce((acc, p) => acc + ((parseFloat(p.costPrice) || 0) * (parseInt(p.stock) || 0)), 0);

        if (this.balanceSearchQuery && this.balanceSearchQuery.trim()) {
            const q = this.balanceSearchQuery.toLowerCase().trim();
            products = products.filter(p => {
                const name = (p.name || '').toLowerCase();
                const sku = (p.sku || '').toLowerCase();
                const barcode = (p.barcode || '').toLowerCase();
                return name.includes(q) || sku.includes(q) || barcode.includes(q);
            });
        }

        if (this.balanceStockFilter && this.balanceStockFilter !== 'all') {
            products = products.filter(p => {
                const status = this.getProductStockStatus(p).key;
                return status === this.balanceStockFilter;
            });
        }

        if (this.balanceCategoryFilter && this.balanceCategoryFilter !== 'all') {
            products = products.filter(p => {
                if (this.balanceCategoryFilter === 'uncategorized') return !p.categoryId;
                return p.categoryId === this.balanceCategoryFilter;
            });
        }

        if (this.balanceWarehouseFilter && this.balanceWarehouseFilter !== 'all') {
            products = products.filter(p => {
                const pWhId = p.warehouseId || 'wh_1';
                return pWhId === this.balanceWarehouseFilter;
            });
        }

        return `
            <div class="space-y-5">
                <!-- TOP METRIC CARDS -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <button type="button" onclick="BusinessDashboardView.setBalanceStockFilter('all')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${this.balanceStockFilter === 'all' && this.balanceWarehouseFilter === 'all' && this.balanceCategoryFilter === 'all' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Ümumi çeşid</span>
                            <span class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-[#FFDD2D] group-hover:text-black transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${totalCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Bütün anbarlar üzrə</div>
                    </button>

                    <button type="button" onclick="BusinessDashboardView.setBalanceStockFilter('in_stock')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${this.balanceStockFilter === 'in_stock' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Kifayət qədər</span>
                            <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${inStockCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Normal qalıq səviyyəsi</div>
                    </button>

                    <button type="button" onclick="BusinessDashboardView.setBalanceStockFilter('low_stock')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${this.balanceStockFilter === 'low_stock' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Kritik qalıq</span>
                            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-100 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-amber-600">${lowStockCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">${outOfStockCount} bitmiş məhsul</div>
                    </button>

                    <div class="text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Qalıq maya dəyəri</span>
                            <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </span>
                        </div>
                        <div class="text-xl sm:text-2xl font-bold text-slate-900">${totalCostValue.toFixed(2)} ₼</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Maya qiyməti ilə cəmi</div>
                    </div>
                </div>

                <!-- FILTER TOOLBAR (Unified Zeyvo Filter Bar with Modal) -->
                <div class="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    ${this.renderBalanceFilterBarHtml()}
                </div>

                <!-- BALANCES TABLE -->
                <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    ${products.length === 0 ? `
                        <div class="p-8 sm:p-12 text-center space-y-3">
                            <div class="w-12 h-12 mx-auto rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                            </div>
                            <h4 class="font-bold text-sm text-slate-900">Qalıq məlumatı tapılmadı</h4>
                            <p class="text-xs text-slate-400">Axtarış meyarlarını dəyişin və ya yeni məhsul əlavə edin</p>
                        </div>
                    ` : (() => {
                        const pageSize = this.balancePageSize || 10;
                        const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
                        if (this.balanceCurrentPage > totalPages) this.balanceCurrentPage = totalPages;
                        if (this.balanceCurrentPage < 1) this.balanceCurrentPage = 1;
                        const startIndex = (this.balanceCurrentPage - 1) * pageSize;
                        const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

                        return `
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-xs min-w-[780px]">
                                    <thead>
                                        <tr class="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-semibold text-xs">
                                            <th class="py-3 px-4 sm:px-5">Məhsul və artikol</th>
                                            <th class="py-3 px-3">Anbar</th>
                                            <th class="py-3 px-3 text-center">Min. norma</th>
                                            <th class="py-3 px-3 text-center">Cari qalıq</th>
                                            <th class="py-3 px-3 text-center">Status</th>
                                            <th class="py-3 px-3 text-right">Maya dəyəri</th>
                                            <th class="py-3 px-4 sm:px-5 text-right">Cəmi məbləğ</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100 text-slate-800">
                                        ${paginatedProducts.map(p => {
                                            const stockStatus = this.getProductStockStatus(p);
                                            const stock = parseInt(p.stock) || 0;
                                            const cost = parseFloat(p.costPrice) || 0;
                                            const lineTotal = (stock * cost).toFixed(2);
                                            const pWhId = p.warehouseId || (warehouses[0]?.id || 'wh_1');
                                            const whObj = warehouses.find(w => w.id === pWhId) || warehouses[0];
                                            const wh = whObj ? whObj.name : 'Əsas anbar';

                                            return `
                                                <tr class="hover:bg-slate-50/60 transition">
                                                    <td class="py-3.5 px-4 sm:px-5">
                                                        <div class="font-bold text-slate-900 text-xs">${p.name}</div>
                                                        <div class="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                            <span>${p.sku || 'SKU yoxdur'}</span>
                                                            ${p.barcode ? `<span>• ${p.barcode}</span>` : ''}
                                                        </div>
                                                    </td>
                                                    <td class="py-3.5 px-3">
                                                        <span class="inline-flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                                                            <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                                            <span>${wh}</span>
                                                        </span>
                                                    </td>
                                                    <td class="py-3.5 px-3 text-center text-slate-500 font-medium">
                                                        ${p.minStock || 3} ${p.unit || 'ədəd'}
                                                    </td>
                                                    <td class="py-3.5 px-3 text-center font-bold text-xs text-slate-900">
                                                        <span>${stock}</span> <span class="text-slate-500 font-normal text-[11px]">${p.unit || 'ədəd'}</span>
                                                    </td>
                                                    <td class="py-3.5 px-3 text-center">
                                                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${stockStatus.badgeClass}">
                                                            <span class="w-1.5 h-1.5 rounded-full ${stockStatus.dotClass}"></span>
                                                            <span>${stockStatus.label}</span>
                                                        </span>
                                                    </td>
                                                    <td class="py-3.5 px-3 text-right font-medium text-slate-700">
                                                        ${cost.toFixed(2)} ₼
                                                    </td>
                                                    <td class="py-3.5 px-4 sm:px-5 text-right font-bold text-slate-900">
                                                        ${lineTotal} ₼
                                                    </td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                            ${this.renderTablePagination({
                                totalItems: products.length,
                                currentPage: this.balanceCurrentPage,
                                pageSize: this.balancePageSize,
                                onPageChange: 'BusinessDashboardView.setBalancePage',
                                onPageSizeChange: 'BusinessDashboardView.setBalancePageSize',
                                itemName: 'məhsul'
                            })}
                        `;
                    })()}
                </div>
            </div>
        `;
    },

    // 2. Anbarlar (Warehouses & storage locations)
    renderProductsWarehousesSection: function() {
        const warehouses = this.getWarehouses();
        const products = this.getProducts();

        return `
            <div class="space-y-5">
                <!-- WAREHOUSES GRID -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${warehouses.map(wh => {
                        const whProducts = products.length;
                        const typeBadge = wh.type === 'main' 
                            ? 'bg-amber-50 text-amber-900 border-amber-200' 
                            : (wh.type === 'cabinet' ? 'bg-blue-50 text-blue-900 border-blue-200' : 'bg-slate-100 text-slate-800 border-slate-200');

                        return `
                            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition flex flex-col justify-between space-y-4">
                                <div class="space-y-3">
                                    <div class="flex items-start justify-between gap-2">
                                        <div class="flex items-center gap-3 min-w-0">
                                            <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                            </div>
                                            <div class="min-w-0">
                                                <h4 class="font-bold text-sm text-slate-900 truncate">${wh.name}</h4>
                                                <span class="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${typeBadge}">
                                                    ${wh.typeName || 'Anbar'}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="flex items-center gap-1 shrink-0">
                                            <button type="button" onclick="BusinessDashboardView.openCreateWarehouseModal('${wh.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                            </button>
                                            ${!wh.isDefault ? `
                                                <button type="button" onclick="BusinessDashboardView.deleteWarehouse('${wh.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sil">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            ` : ''}
                                        </div>
                                    </div>

                                    <div class="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
                                        <div class="flex items-center gap-2">
                                            <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                            <span class="text-slate-500">Məsul:</span>
                                            <span class="font-semibold text-slate-800 truncate">${wh.responsible || 'Təyin edilməyib'}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 21s-6-5.686-6-10a6 6 0 0 1 12 0c0 4.314-6 10-6 10z"/><circle cx="12" cy="11" r="2.5"/></svg>
                                            <span class="text-slate-500">Ünvan:</span>
                                            <span class="font-medium text-slate-700 truncate">${wh.address || 'Ünvan qeyd edilməyib'}</span>
                                        </div>
                                    </div>

                                    ${wh.notes ? `
                                        <p class="text-[11px] text-slate-500 font-normal line-clamp-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                            ${wh.notes}
                                        </p>
                                    ` : ''}
                                </div>

                                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                                    <span class="text-slate-500">Saxlanılan məhsul:</span>
                                    <span class="font-bold text-slate-900">${whProducts} növ</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    // 3. Bütün məhsullar (Full product catalog & categories)
    renderProductsCatalogSection: function() {
        const activeCtx = this.getActiveContext();
        const allProducts = this.getProducts();
        const products = allProducts.filter(p => {
            if (p.branchId) {
                return p.branchId === activeCtx.branchId || p.branchName === activeCtx.branchName;
            }
            return p.businessName === activeCtx.businessName;
        });

        const categories = this.getProductCategories();
        const totalCount = products.length;
        const inStockCount = products.filter(p => (parseInt(p.stock) || 0) > (parseInt(p.minStock) || 3)).length;
        const lowStockCount = products.filter(p => {
            const s = parseInt(p.stock) || 0;
            return s > 0 && s <= (parseInt(p.minStock) || 3);
        }).length;
        const outOfStockCount = products.filter(p => (parseInt(p.stock) || 0) <= 0).length;
        const totalCostValue = products.reduce((acc, p) => acc + ((parseFloat(p.costPrice) || 0) * (parseInt(p.stock) || 0)), 0);
        const totalRetailValue = products.reduce((acc, p) => acc + ((parseFloat(p.salePrice) || 0) * (parseInt(p.stock) || 0)), 0);
        const currentStockFilter = this.productStockFilter || 'all';

        return `
            <div class="space-y-6">
                <!-- TOP METRIC CARDS -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <button type="button" onclick="BusinessDashboardView.setProductStockFilter('all')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${currentStockFilter === 'all' && this.productTypeFilter === 'all' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Ümumi məhsullar</span>
                            <span class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-[#FFDD2D] group-hover:text-black transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${totalCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 truncate">
                            <span class="text-amber-600 font-semibold">${categories.length} kateqoriya</span>
                        </div>
                    </button>

                    <button type="button" onclick="BusinessDashboardView.setProductStockFilter('in_stock')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${currentStockFilter === 'in_stock' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Stokda var</span>
                            <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${inStockCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Kifayət qədər qalıq</div>
                    </button>

                    <button type="button" onclick="BusinessDashboardView.setProductStockFilter('low_stock')" class="text-left p-4 sm:p-5 rounded-2xl bg-white border ${currentStockFilter === 'low_stock' ? 'border-tbank-graphite ring-2 ring-tbank-yellow/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'} transition group shadow-xs cursor-pointer">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Kritik qalıq</span>
                            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-100 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-amber-600">${lowStockCount}</div>
                        <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 truncate">
                            <span class="${outOfStockCount > 0 ? 'text-rose-600 font-semibold' : ''}">${outOfStockCount} bitmiş</span>
                        </div>
                    </button>

                    <div class="text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Stok dəyəri</span>
                            <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </span>
                        </div>
                        <div class="text-xl sm:text-2xl font-bold text-slate-900">${totalCostValue.toFixed(2)} ₼</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">
                            Satış: <span class="text-slate-700 font-semibold">${totalRetailValue.toFixed(2)} ₼</span>
                        </div>
                    </div>
                </div>

                <!-- FILTER BAR (CLEAN SEARCH & MODAL TRIGGER) -->
                <div id="prodFilterBarContainer">
                    ${this.renderProductFilterBarHtml()}
                </div>

                <!-- TREE LIST CONTAINER (CATEGORIZED PRODUCTS) -->
                <div id="prodCardsGrid" class="space-y-4">
                    ${this.renderProductCardsHtml()}
                </div>
            </div>
        `;
    },

    // 4. Texnoloji kartlar (Tech cards / service consumption recipes)
    renderProductsTechCardsSection: function() {
        let techCards = this.getTechCards();

        if (this.techCardSearchQuery && this.techCardSearchQuery.trim()) {
            const q = this.techCardSearchQuery.toLowerCase().trim();
            techCards = techCards.filter(tc => {
                const name = (tc.name || '').toLowerCase();
                const srv = (tc.serviceName || '').toLowerCase();
                const notes = (tc.notes || '').toLowerCase();
                return name.includes(q) || srv.includes(q) || notes.includes(q);
            });
        }

        return `
            <div class="space-y-5">
                <!-- SEARCH -->
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </span>
                    <input type="text"
                           placeholder="Texnoloji kart və ya xidmət adı ilə axtarın..."
                           value="${this.techCardSearchQuery || ''}"
                           oninput="BusinessDashboardView.handleTechCardSearch(this.value)"
                           class="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition shadow-xs">
                </div>

                <!-- CARDS GRID -->
                ${techCards.length === 0 ? `
                    <div class="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-3 shadow-xs">
                        <div class="w-12 h-12 mx-auto rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </div>
                        <h4 class="font-bold text-sm text-slate-900">Texnoloji kart tapılmadı</h4>
                        <p class="text-xs text-slate-400">Xidmətlər üçün material sərfiyyat normasını müəyyən etmək üçün yeni kart əlavə edin</p>
                        <div class="pt-2">
                            ${ZeyvoUI.button({ label: "Yeni texnoloji kart əlavə et", onClick: "BusinessDashboardView.openCreateTechCardModal()", size: "md", type: "button" })}
                        </div>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        ${techCards.map(tc => {
                            const ingredients = tc.ingredients || [];
                            const totalCost = tc.totalCost || ingredients.reduce((sum, ing) => sum + (parseFloat(ing.totalCost) || (parseFloat(ing.qty) * parseFloat(ing.costPerUnit)) || 0), 0);

                            return `
                                <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition space-y-4 flex flex-col justify-between">
                                    <div class="space-y-3">
                                        <div class="flex items-start justify-between gap-3">
                                            <div class="min-w-0">
                                                <h4 class="font-bold text-sm text-slate-900 truncate">${tc.name}</h4>
                                                <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                                                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60 text-[11px] font-semibold">
                                                        <svg class="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242 3 3 0 014.242 0z"/></svg>
                                                        <span>${tc.serviceName || 'Xidmət təyin edilməyib'}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="flex items-center gap-1 shrink-0">
                                                <button type="button" onclick="BusinessDashboardView.openCreateTechCardModal('${tc.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                </button>
                                                <button type="button" onclick="BusinessDashboardView.deleteTechCard('${tc.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sil">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <!-- INGREDIENTS LIST -->
                                        <div class="space-y-1.5 pt-2">
                                            <div class="text-xs font-semibold text-slate-500">Sərfiyyat tərkibi (${ingredients.length} növ məhsul)</div>
                                            <div class="divide-y divide-slate-100 rounded-xl bg-slate-50/70 border border-slate-200/60 overflow-hidden">
                                                ${ingredients.map(ing => `
                                                    <div class="p-2 sm:px-3 flex items-center justify-between text-xs">
                                                        <span class="font-medium text-slate-800 truncate">${ing.productName || 'Məhsul'}</span>
                                                        <span class="text-slate-500 font-semibold shrink-0 ml-2">${ing.qty} ${ing.unit || 'ədəd'}</span>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>

                                        ${tc.notes ? `
                                            <p class="text-[11px] text-slate-500 font-normal leading-relaxed">
                                                <span class="font-semibold text-slate-700">Qeyd:</span> ${tc.notes}
                                            </p>
                                        ` : ''}
                                    </div>

                                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                                        <span class="text-xs text-slate-500">Xidmət üzrə sərfiyyat maya dəyəri:</span>
                                        <span class="px-2.5 py-1 rounded-xl bg-[#FFDD2D]/20 text-[#101114] font-black text-xs border border-amber-300/60">
                                            ${Number(totalCost).toFixed(2)} ₼
                                        </span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            </div>
        `;
    },

    // 5. Anbar əməliyyatları (Warehouse transactions: Inflow, Outflow, Transfer, Audit)
    renderProductsOperationsSection: function() {
        let allOperations = this.getInventoryOperations();
        let operations = allOperations;

        // 1. Type filter
        if (this.operationTypeFilter && this.operationTypeFilter !== 'all') {
            operations = operations.filter(op => op.type === this.operationTypeFilter);
        }

        // 2. Search query filter
        if (this.operationSearchQuery && this.operationSearchQuery.trim()) {
            const q = this.operationSearchQuery.toLowerCase().trim();
            operations = operations.filter(op => {
                const doc = (op.docNumber || '').toLowerCase();
                const wh = (op.warehouseName || '').toLowerCase();
                const sup = (op.supplier || '').toLowerCase();
                const notes = (op.notes || '').toLowerCase();
                const itemsMatch = op.items && op.items.some(it => (it.name || '').toLowerCase().includes(q));
                return doc.includes(q) || wh.includes(q) || sup.includes(q) || notes.includes(q) || itemsMatch;
            });
        }

        // 3. Warehouse filter
        if (this.operationWarehouseFilter && this.operationWarehouseFilter !== 'all') {
            const warehouses = this.getWarehouses();
            const whObj = warehouses.find(w => w.id === this.operationWarehouseFilter);
            const targetWhName = whObj ? whObj.name.toLowerCase() : '';
            operations = operations.filter(op => {
                const opWh = (op.warehouseName || '').toLowerCase();
                return opWh.includes(targetWhName) || op.warehouseId === this.operationWarehouseFilter;
            });
        }

        // 4. Date period filter
        if (this.operationDateFilter && this.operationDateFilter !== 'all') {
            const now = new Date();
            const nowDay = now.getDate();
            const nowMonth = now.getMonth();
            const nowYear = now.getFullYear();

            operations = operations.filter(op => {
                if (!op.date) return false;
                const dStr = op.date.includes('-') ? this.formatDateDisplay(op.date) : op.date;
                const parts = dStr.split('.');
                if (parts.length === 3) {
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1;
                    const year = parseInt(parts[2], 10);
                    const opDate = new Date(year, month, day);

                    if (this.operationDateFilter === 'today') {
                        return day === nowDay && month === nowMonth && year === nowYear;
                    }
                    if (this.operationDateFilter === 'week') {
                        const diffTime = now.getTime() - opDate.getTime();
                        const diffDays = diffTime / (1000 * 3600 * 24);
                        return diffDays >= -1 && diffDays <= 7;
                    }
                    if (this.operationDateFilter === 'month') {
                        return month === nowMonth && year === nowYear;
                    }
                    if (this.operationDateFilter === 'custom') {
                        let matchesStart = true;
                        let matchesEnd = true;
                        if (this.operationCustomStartDate) {
                            const sParts = this.operationCustomStartDate.split('-');
                            if (sParts.length === 3) {
                                const sDate = new Date(parseInt(sParts[0], 10), parseInt(sParts[1], 10) - 1, parseInt(sParts[2], 10));
                                matchesStart = opDate.getTime() >= sDate.getTime();
                            }
                        }
                        if (this.operationCustomEndDate) {
                            const eParts = this.operationCustomEndDate.split('-');
                            if (eParts.length === 3) {
                                const eDate = new Date(parseInt(eParts[0], 10), parseInt(eParts[1], 10) - 1, parseInt(eParts[2], 10));
                                matchesEnd = opDate.getTime() <= eDate.getTime();
                            }
                        }
                        return matchesStart && matchesEnd;
                    }
                }
                return true;
            });
        }

        // 5. Status filter
        if (this.operationStatusFilter && this.operationStatusFilter !== 'all') {
            operations = operations.filter(op => (op.status || 'completed') === this.operationStatusFilter);
        }

        return `
            <div class="space-y-4">
                <!-- FILTER TOOLBAR -->
                <div class="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    ${this.renderOperationsFilterBarHtml()}
                </div>

                <!-- OPERATIONS TABLE -->
                <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    ${operations.length === 0 ? `
                        <div class="p-8 sm:p-12 text-center space-y-3">
                            <div class="w-12 h-12 mx-auto rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                            </div>
                            <h4 class="font-bold text-sm text-slate-900">Sənəd tapılmadı</h4>
                            <p class="text-xs text-slate-400">Bu filtr meyarlarına uyğun heç bir anbar əməliyyatı qeydə alınmayıb</p>
                            <div class="pt-2 flex items-center justify-center gap-2">
                                <button type="button" onclick="BusinessDashboardView.resetAllOperationFilters()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition cursor-pointer">
                                    Filtrləri sıfırla
                                </button>
                                ${ZeyvoUI.button({ label: "Yeni əməliyyat yarat", onClick: "BusinessDashboardView.openCreateOperationModal()", size: "md", type: "button" })}
                            </div>
                        </div>
                    ` : (() => {
                        const pageSize = this.operationsPageSize || 10;
                        const totalPages = Math.max(1, Math.ceil(operations.length / pageSize));
                        if (this.operationsCurrentPage > totalPages) this.operationsCurrentPage = totalPages;
                        if (this.operationsCurrentPage < 1) this.operationsCurrentPage = 1;
                        const startIndex = (this.operationsCurrentPage - 1) * pageSize;
                        const paginatedOperations = operations.slice(startIndex, startIndex + pageSize);

                        return `
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-xs min-w-[820px]">
                                    <thead>
                                        <tr class="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-semibold text-xs">
                                            <th class="py-3 px-4 sm:px-5">Sənəd № və tarix</th>
                                            <th class="py-3 px-3">Əməliyyat növü</th>
                                            <th class="py-3 px-3">Anbar / Kontragent</th>
                                            <th class="py-3 px-3 text-center">Məhsul sayı</th>
                                            <th class="py-3 px-3 text-right">Məbləğ</th>
                                            <th class="py-3 px-3 text-center">Status</th>
                                            <th class="py-3 px-4 sm:px-5 text-right">Fəaliyyət</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100 text-slate-800">
                                        ${paginatedOperations.map(op => {
                                            let badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                                            if (op.type === 'writeoff') badgeColor = 'bg-rose-50 text-rose-800 border-rose-200';
                                            if (op.type === 'transfer') badgeColor = 'bg-blue-50 text-blue-800 border-blue-200';
                                            if (op.type === 'audit') badgeColor = 'bg-purple-50 text-purple-800 border-purple-200';

                                            return `
                                                <tr class="hover:bg-slate-50/60 transition">
                                                    <td class="py-3.5 px-4 sm:px-5">
                                                        <div class="font-bold text-slate-900 text-xs">${op.docNumber}</div>
                                                        <div class="text-[11px] text-slate-400 mt-0.5">${this.formatDateDisplay(op.date)}</div>
                                                    </td>
                                                    <td class="py-3.5 px-3">
                                                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold border ${badgeColor}">
                                                            ${op.typeName || op.type}
                                                        </span>
                                                    </td>
                                                    <td class="py-3.5 px-3">
                                                        <div class="font-medium text-slate-900 text-xs">${op.warehouseName || 'Əsas anbar'}</div>
                                                        <div class="text-[11px] text-slate-400 truncate mt-0.5">${op.supplier || op.notes || 'Qeyd yoxdur'}</div>
                                                    </td>
                                                    <td class="py-3.5 px-3 text-center font-medium text-slate-700">
                                                        ${op.itemsCount || (op.items ? op.items.length : 1)} növ
                                                    </td>
                                                    <td class="py-3.5 px-3 text-right font-bold text-slate-900">
                                                        ${(parseFloat(op.totalAmount) || 0).toFixed(2)} ₼
                                                    </td>
                                                    <td class="py-3.5 px-3 text-center">
                                                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                            <span>${op.statusLabel || 'Tamamlandı'}</span>
                                                        </span>
                                                    </td>
                                                    <td class="py-3.5 px-4 sm:px-5 text-right">
                                                        <button type="button" onclick="BusinessDashboardView.deleteInventoryOperation('${op.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sənədi sil">
                                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                            ${this.renderTablePagination({
                                totalItems: operations.length,
                                currentPage: this.operationsCurrentPage,
                                pageSize: this.operationsPageSize,
                                onPageChange: 'BusinessDashboardView.setOperationsPage',
                                onPageSizeChange: 'BusinessDashboardView.setOperationsPageSize',
                                itemName: 'əməliyyat'
                            })}
                        `;
                    })()}
                </div>
            </div>
        `;
    },

    // 6. İnventarizasiya (Inventory auditing & stock-taking)
    renderProductsInventorySection: function() {
        const audits = this.getInventoryAudits();
        const warehouses = this.getWarehouses();
        const products = this.getProducts();

        const totalAuditedItems = products.length;
        const lastAudit = audits[0] ? this.formatDateDisplay(audits[0].date) : '01.10.2026';
        const totalDiscrepancies = audits.reduce((sum, a) => sum + (a.discrepancyCount || 0), 0);
        const accuracyRate = totalDiscrepancies === 0 ? '100%' : '98.5%';

        return `
            <div class="space-y-5">
                <!-- TOP METRIC CARDS -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Sonuncu sayım</span>
                            <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            </span>
                        </div>
                        <div class="text-xl sm:text-2xl font-bold text-slate-900">${lastAudit}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Planlı dövri yoxlama</div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Yoxlanan çeşid</span>
                            <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-slate-900">${totalAuditedItems}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Bütün aktiv nomenklatura</div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Uyğunluq faizi</span>
                            <span class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold text-emerald-600">${accuracyRate}</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Faktiki və sistem nisbəti</div>
                    </div>

                    <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-semibold text-slate-500">Kənarlaşma</span>
                            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                            </span>
                        </div>
                        <div class="text-2xl sm:text-3xl font-bold ${totalDiscrepancies === 0 ? 'text-slate-900' : 'text-rose-600'}">0.00 ₼</div>
                        <div class="text-[11px] text-slate-400 mt-1 truncate">Son sayımda fərq yoxdur</div>
                    </div>
                </div>

                <!-- AUDITS TABLE -->
                <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    ${audits.length === 0 ? `
                        <div class="p-8 sm:p-12 text-center space-y-3">
                            <div class="w-12 h-12 mx-auto rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                            </div>
                            <h4 class="font-bold text-sm text-slate-900">İnventarizasiya aktı tapılmadı</h4>
                            <p class="text-xs text-slate-400">Anbarda faktiki qalıqları yoxlamaq üçün yeni inventarizasiya başladın</p>
                            <div class="pt-2">
                                ${ZeyvoUI.button({ label: "Yeni inventarizasiya apar", onClick: "BusinessDashboardView.openCreateAuditModal()", size: "md", type: "button" })}
                            </div>
                        </div>
                    ` : (() => {
                        const pageSize = this.auditsPageSize || 10;
                        const totalPages = Math.max(1, Math.ceil(audits.length / pageSize));
                        if (this.auditsCurrentPage > totalPages) this.auditsCurrentPage = totalPages;
                        if (this.auditsCurrentPage < 1) this.auditsCurrentPage = 1;
                        const startIndex = (this.auditsCurrentPage - 1) * pageSize;
                        const paginatedAudits = audits.slice(startIndex, startIndex + pageSize);

                        return `
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-xs min-w-[820px]">
                                    <thead>
                                        <tr class="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-semibold text-xs">
                                            <th class="py-3 px-4 sm:px-5">Sənəd № və tarix</th>
                                            <th class="py-3 px-3">Anbar</th>
                                            <th class="py-3 px-3">Məsul şəxs</th>
                                            <th class="py-3 px-3 text-center">Yoxlanılan çeşid</th>
                                            <th class="py-3 px-3">Nəticə</th>
                                            <th class="py-3 px-3 text-center">Status</th>
                                            <th class="py-3 px-4 sm:px-5 text-right">Fəaliyyət</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100 text-slate-800">
                                        ${paginatedAudits.map(aud => {
                                            const hasDiff = aud.discrepancyCount && aud.discrepancyCount !== 0;
                                            return `
                                                <tr class="hover:bg-slate-50/60 transition">
                                                    <td class="py-3.5 px-4 sm:px-5">
                                                        <div class="font-bold text-slate-900 text-xs">${aud.docNumber}</div>
                                                        <div class="text-[11px] text-slate-400 mt-0.5">${this.formatDateDisplay(aud.date)}</div>
                                                    </td>
                                                    <td class="py-3.5 px-3">
                                                        <span class="inline-flex items-center gap-1 text-slate-800 font-medium text-xs">
                                                            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                                            <span>${aud.warehouseName || 'Əsas anbar'}</span>
                                                        </span>
                                                    </td>
                                                    <td class="py-3.5 px-3 text-slate-600 font-medium">
                                                        ${aud.responsible || 'Komissiya'}
                                                    </td>
                                                    <td class="py-3.5 px-3 text-center font-bold text-slate-900">
                                                        ${aud.itemsCount || (aud.items ? aud.items.length : 0)} növ
                                                    </td>
                                                    <td class="py-3.5 px-3">
                                                        ${hasDiff ? `
                                                            <span class="inline-flex items-center gap-1 text-rose-600 font-bold text-xs">
                                                                <span>${aud.discrepancyCount} ədəd (${(parseFloat(aud.discrepancyAmount) || 0).toFixed(2)} ₼)</span>
                                                            </span>
                                                        ` : `
                                                            <span class="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                                                                <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                                <span>Kənarlaşma yoxdur (100%)</span>
                                                            </span>
                                                        `}
                                                    </td>
                                                    <td class="py-3.5 px-3 text-center">
                                                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                            <span>${aud.statusLabel || 'Tamamlandı'}</span>
                                                        </span>
                                                    </td>
                                                    <td class="py-3.5 px-4 sm:px-5 text-right">
                                                        <button type="button" onclick="BusinessDashboardView.deleteInventoryAudit('${aud.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Aktı sil">
                                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                            ${this.renderTablePagination({
                                totalItems: audits.length,
                                currentPage: this.auditsCurrentPage,
                                pageSize: this.auditsPageSize,
                                onPageChange: 'BusinessDashboardView.setAuditsPage',
                                onPageSizeChange: 'BusinessDashboardView.setAuditsPageSize',
                                itemName: 'sayım aktı'
                            })}
                        `;
                    })()}
                </div>
            </div>
        `;
    },

    // 7. Təchizatçılar (Suppliers & Counterparties directory)
    suppliersSearchQuery: '',
    supplierStatusFilter: 'all', // 'all', 'active', 'inactive'
    supplierOpsFilter: 'all',    // 'all', 'with_ops', 'no_ops'
    supplierVoenFilter: 'all',   // 'all', 'with_voen', 'without_voen'
    tempSupplierFilters: null,

    renderProductsSuppliersSection: function() {
        const suppliers = this.getSuppliers();
        const operations = this.getInventoryOperations();
        const q = (this.suppliersSearchQuery || '').toLowerCase().trim();

        const statusFilter = this.supplierStatusFilter || 'all';
        const opsFilter = this.supplierOpsFilter || 'all';
        const voenFilter = this.supplierVoenFilter || 'all';

        const filtered = suppliers.filter(s => {
            if (q) {
                const match = (s.name || '').toLowerCase().includes(q) ||
                              (s.contactPerson || '').toLowerCase().includes(q) ||
                              (s.phone || '').toLowerCase().includes(q) ||
                              (s.voen || '').toLowerCase().includes(q) ||
                              (s.address || '').toLowerCase().includes(q);
                if (!match) return false;
            }

            if (statusFilter === 'active' && s.status === 'inactive') return false;
            if (statusFilter === 'inactive' && s.status !== 'inactive') return false;

            const sName = (s.name || '').trim().toLowerCase();
            const opsCount = operations.filter(o => {
                const oSup = (o.supplier || '').trim().toLowerCase();
                return (oSup && oSup === sName) || (o.supplierId && o.supplierId === s.id);
            }).length;
            if (opsFilter === 'with_ops' && opsCount === 0) return false;
            if (opsFilter === 'no_ops' && opsCount > 0) return false;

            const hasVoen = !!(s.voen && s.voen.trim().length > 0);
            if (voenFilter === 'with_voen' && !hasVoen) return false;
            if (voenFilter === 'without_voen' && hasVoen) return false;

            return true;
        });

        const totalSuppliers = suppliers.length;
        const totalOpsWithSuppliers = operations.filter(o => o.type === 'inflow').length;
        const hasActiveFilters = (this.supplierStatusFilter && this.supplierStatusFilter !== 'all') ||
                                 (this.supplierOpsFilter && this.supplierOpsFilter !== 'all') ||
                                 (this.supplierVoenFilter && this.supplierVoenFilter !== 'all') ||
                                 (this.suppliersSearchQuery && this.suppliersSearchQuery.trim().length > 0);

        return `
            <div class="space-y-5">
                <!-- TOP STATS -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                        <div class="text-[11px] font-medium text-slate-400">Ümumi təchizatçılar</div>
                        <div class="text-xl font-bold text-slate-900">${totalSuppliers} <span class="text-xs font-normal text-slate-400">kontragent</span></div>
                    </div>
                    <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                        <div class="text-[11px] font-medium text-slate-400">Aktiv tərəfdaşlar</div>
                        <div class="text-xl font-bold text-emerald-700">${suppliers.filter(s => s.status !== 'inactive').length} <span class="text-xs font-normal text-slate-400">şirkət</span></div>
                    </div>
                    <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                        <div class="text-[11px] font-medium text-slate-400">Mədaxil əməliyyatları</div>
                        <div class="text-xl font-bold text-slate-900">${totalOpsWithSuppliers} <span class="text-xs font-normal text-slate-400">sənəd</span></div>
                    </div>
                </div>

                <!-- FILTER TOOLBAR -->
                <div class="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    ${this.renderSuppliersFilterBarHtml()}
                </div>

                <!-- SUPPLIERS GRID -->
                ${filtered.length === 0 ? `
                    <div class="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-white space-y-3">
                        <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-800">${hasActiveFilters ? 'Filtrlərə və ya axtarışa uyğun təchizatçı tapılmadı' : 'Təchizatçı siyahısı boşdur'}</h4>
                            <p class="text-xs text-slate-400 mt-0.5">${hasActiveFilters ? 'Seçilmiş filtrləri sıfırlayaraq yenidən yoxlayın' : 'Yeni təchizatçı əlavə edərək anbar mədaxilində birbaşa seçə bilərsiniz'}</p>
                        </div>
                        ${hasActiveFilters ? `
                            <button type="button" onclick="BusinessDashboardView.resetAllSupplierFilters()" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition active:scale-95 cursor-pointer">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                <span>Filtrləri sıfırla</span>
                            </button>
                        ` : `
                            <button type="button" onclick="BusinessDashboardView.openCreateSupplierModal()" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs shadow-2xs transition active:scale-95 cursor-pointer">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                                <span>İlk təchizatçını əlavə et</span>
                            </button>
                        `}
                    </div>
                ` : `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${filtered.map(s => {
                            const initials = (s.name || 'T')
                                .split(' ')
                                .slice(0, 2)
                                .map(w => w.charAt(0).toUpperCase())
                                .join('');
                            const sName = (s.name || '').trim().toLowerCase();
                            const opsCount = operations.filter(o => {
                                const oSup = (o.supplier || '').trim().toLowerCase();
                                return (oSup && oSup === sName) || (o.supplierId && o.supplierId === s.id);
                            }).length;

                            return `
                                <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition flex flex-col justify-between space-y-4">
                                    <div class="space-y-3">
                                        <!-- Header -->
                                        <div class="flex items-start justify-between gap-3">
                                            <div class="flex items-center gap-3 min-w-0">
                                                <div class="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                                                    ${initials || 'TS'}
                                                </div>
                                                <div class="min-w-0">
                                                    <h4 class="font-bold text-sm text-slate-900 truncate" title="${s.name}">${s.name}</h4>
                                                    ${s.voen ? `
                                                        <span class="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                                            VÖEN: ${s.voen}
                                                        </span>
                                                    ` : `
                                                        <span class="inline-block mt-0.5 text-[10px] text-slate-400">Kontragent</span>
                                                    `}
                                                </div>
                                            </div>

                                            <div class="flex items-center gap-1 shrink-0">
                                                <button type="button" onclick="BusinessDashboardView.openCreateSupplierModal('${s.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Redaktə et">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                </button>
                                                <button type="button" onclick="BusinessDashboardView.deleteSupplier('${s.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Sil">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Contact details -->
                                        <div class="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                                            ${s.contactPerson ? `
                                                <div class="flex items-center gap-2">
                                                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                    <span class="text-slate-400">Şəxs:</span>
                                                    <span class="font-semibold text-slate-800 truncate">${s.contactPerson}</span>
                                                </div>
                                            ` : ''}

                                            ${s.phone ? `
                                                <div class="flex items-center gap-2">
                                                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                                    <span class="text-slate-400">Tel:</span>
                                                    <a href="tel:${s.phone}" class="font-medium text-slate-800 hover:text-amber-700 transition truncate">${s.phone}</a>
                                                </div>
                                            ` : ''}

                                            ${s.email ? `
                                                <div class="flex items-center gap-2">
                                                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                                    <span class="text-slate-400">E-poçt:</span>
                                                    <a href="mailto:${s.email}" class="font-medium text-slate-800 hover:text-amber-700 transition truncate">${s.email}</a>
                                                </div>
                                            ` : ''}

                                            ${s.address ? `
                                                <div class="flex items-center gap-2">
                                                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 21s-6-5.686-6-10a6 6 0 0 1 12 0c0 4.314-6 10-6 10z"/><circle cx="12" cy="11" r="2.5"/></svg>
                                                    <span class="text-slate-400">Ünvan:</span>
                                                    <span class="font-medium text-slate-700 truncate" title="${s.address}">${s.address}</span>
                                                </div>
                                            ` : ''}
                                        </div>

                                        ${s.notes ? `
                                            <p class="text-[11px] text-slate-500 font-normal line-clamp-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                                ${s.notes}
                                            </p>
                                        ` : ''}
                                    </div>

                                    <!-- Footer & Action -->
                                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                                        <div class="text-slate-500">
                                            Sənədlər: <strong class="text-slate-800 font-semibold">${opsCount}</strong>
                                        </div>
                                        <button type="button" onclick="BusinessDashboardView.openCreateOperationModalWithSupplier('${s.name}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#FFDD2D] text-slate-700 hover:text-[#101114] font-semibold text-[11px] transition cursor-pointer flex items-center gap-1 active:scale-95">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                                            <span>Mədaxil et</span>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            </div>
        `;
    },

    renderSuppliersFilterBarHtml: function() {
        const hasActiveFilters = (this.supplierStatusFilter && this.supplierStatusFilter !== 'all') ||
                                 (this.supplierOpsFilter && this.supplierOpsFilter !== 'all') ||
                                 (this.supplierVoenFilter && this.supplierVoenFilter !== 'all') ||
                                 (this.suppliersSearchQuery && this.suppliersSearchQuery.trim().length > 0);

        const statusLabels = {
            all: 'Hamısı',
            active: 'Aktiv',
            inactive: 'Qeyri-aktiv'
        };

        const opsLabels = {
            all: 'Hamısı',
            with_ops: 'Mədaxil sənədləri var',
            no_ops: 'Sənədsiz'
        };

        const voenLabels = {
            all: 'Hamısı',
            with_voen: 'VÖEN qeyd olunub',
            without_voen: 'VÖEN qeyd olunmayıb'
        };

        const activeCount = (this.supplierStatusFilter !== 'all' ? 1 : 0) +
                            (this.supplierOpsFilter !== 'all' ? 1 : 0) +
                            (this.supplierVoenFilter !== 'all' ? 1 : 0) +
                            (this.suppliersSearchQuery ? 1 : 0);

        return `
            <div class="space-y-2.5">
                <div class="flex items-center gap-2">
                    <!-- Search Input -->
                    <div class="relative flex-1 min-w-0">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </span>
                        <input type="text"
                               id="suppliersSearchInput"
                               placeholder="Təchizatçı adı, VÖEN, əlaqədar şəxs və ya nömrə ilə axtarın..."
                               value="${this.suppliersSearchQuery || ''}"
                               oninput="BusinessDashboardView.handleSupplierSearch(this.value)"
                               class="w-full h-10 pl-9 pr-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition">
                        <button type="button"
                                id="suppliersSearchClearBtn"
                                onclick="BusinessDashboardView.clearSupplierSearch()"
                                class="${this.suppliersSearchQuery ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                                title="Təmizlə">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <!-- Filter Button -->
                    <button type="button"
                            onclick="BusinessDashboardView.openSupplierFilterModal()"
                            class="h-10 px-4 rounded-xl border ${hasActiveFilters ? 'border-slate-900 bg-slate-900 text-white shadow-xs' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:border-slate-300'} text-xs font-semibold flex items-center gap-2 transition shrink-0 active:scale-95 cursor-pointer"
                            title="Filtrlər pəncərəsi">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                        <span>Filtr</span>
                        ${hasActiveFilters && activeCount > 0 ? `
                            <span class="w-5 h-5 rounded-full bg-[#FFDD2D] text-[#101114] text-[10px] font-black flex items-center justify-center">
                                ${activeCount}
                            </span>
                        ` : ''}
                    </button>
                </div>

                <!-- Active Filter Badges Pill Row -->
                ${hasActiveFilters ? `
                    <div class="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                        <span class="text-[11px] text-slate-400 font-medium">Aktiv filtrlər:</span>

                        ${this.supplierStatusFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                                <span>Status: <strong>${statusLabels[this.supplierStatusFilter] || this.supplierStatusFilter}</strong></span>
                                <button type="button" onclick="BusinessDashboardView.setSupplierStatusFilter('all')" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        ${this.supplierOpsFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
                                <span>Sənəd: <strong>${opsLabels[this.supplierOpsFilter] || this.supplierOpsFilter}</strong></span>
                                <button type="button" onclick="BusinessDashboardView.setSupplierOpsFilter('all')" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        ${this.supplierVoenFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
                                <span>VÖEN: <strong>${voenLabels[this.supplierVoenFilter] || this.supplierVoenFilter}</strong></span>
                                <button type="button" onclick="BusinessDashboardView.setSupplierVoenFilter('all')" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        ${this.suppliersSearchQuery ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
                                <span>Axtarış: <strong>"${this.suppliersSearchQuery}"</strong></span>
                                <button type="button" onclick="BusinessDashboardView.clearSupplierSearch()" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        <button type="button" onclick="BusinessDashboardView.resetAllSupplierFilters()" class="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 transition ml-1 cursor-pointer">
                            Hamısını təmizlə
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    },

    handleSupplierSearch: function(val) {
        this.suppliersSearchQuery = val || '';
        this.refreshSuppliersSection();
        const input = document.getElementById('suppliersSearchInput');
        if (input) {
            input.focus();
            const len = input.value.length;
            input.setSelectionRange(len, len);
        }
    },

    clearSupplierSearch: function() {
        this.suppliersSearchQuery = '';
        this.refreshSuppliersSection();
    },

    refreshSuppliersSection: function() {
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'suppliers') {
            container.innerHTML = this.renderProductsSuppliersSection();
        }
    },

    openSupplierFilterModal: function() {
        const modal = document.getElementById('bizSupplierFilterModal');
        if (!modal) return;

        this.tempSupplierFilters = {
            status: this.supplierStatusFilter || 'all',
            ops: this.supplierOpsFilter || 'all',
            voen: this.supplierVoenFilter || 'all'
        };

        this.updateSupplierFilterModalButtons();
        modal.classList.remove('hidden');
    },

    closeSupplierFilterModal: function() {
        const modal = document.getElementById('bizSupplierFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectSupplierFilterStatus: function(status) {
        if (!this.tempSupplierFilters) this.tempSupplierFilters = {};
        this.tempSupplierFilters.status = status;
        this.updateSupplierFilterModalButtons();
    },

    selectSupplierFilterOps: function(ops) {
        if (!this.tempSupplierFilters) this.tempSupplierFilters = {};
        this.tempSupplierFilters.ops = ops;
        this.updateSupplierFilterModalButtons();
    },

    selectSupplierFilterVoen: function(voen) {
        if (!this.tempSupplierFilters) this.tempSupplierFilters = {};
        this.tempSupplierFilters.voen = voen;
        this.updateSupplierFilterModalButtons();
    },

    updateSupplierFilterModalButtons: function() {
        const curStatus = (this.tempSupplierFilters && this.tempSupplierFilters.status) || this.supplierStatusFilter || 'all';
        ['all', 'active', 'inactive'].forEach(s => {
            const btn = document.getElementById(`supFilterStatusBtn_${s}`);
            if (btn) {
                if (s === curStatus) {
                    btn.className = "p-2 sm:p-2.5 rounded-xl border-2 border-slate-900 bg-white text-slate-900 font-bold flex flex-col items-center justify-center gap-1 transition text-center shadow-xs cursor-pointer";
                } else {
                    btn.className = "p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer";
                }
            }
        });

        const curOps = (this.tempSupplierFilters && this.tempSupplierFilters.ops) || this.supplierOpsFilter || 'all';
        ['all', 'with_ops', 'no_ops'].forEach(o => {
            const btn = document.getElementById(`supFilterOpsBtn_${o}`);
            if (btn) {
                if (o === curOps) {
                    btn.className = "p-2 sm:p-2.5 rounded-xl border-2 border-slate-900 bg-white text-slate-900 font-bold flex flex-col items-center justify-center gap-1 transition text-center shadow-xs cursor-pointer";
                } else {
                    btn.className = "p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer";
                }
            }
        });

        const curVoen = (this.tempSupplierFilters && this.tempSupplierFilters.voen) || this.supplierVoenFilter || 'all';
        ['all', 'with_voen', 'without_voen'].forEach(v => {
            const btn = document.getElementById(`supFilterVoenBtn_${v}`);
            if (btn) {
                if (v === curVoen) {
                    btn.className = "p-2 sm:p-2.5 rounded-xl border-2 border-slate-900 bg-white text-slate-900 font-bold flex flex-col items-center justify-center gap-1 transition text-center shadow-xs cursor-pointer";
                } else {
                    btn.className = "p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer";
                }
            }
        });
    },

    applySupplierFilterModal: function() {
        if (this.tempSupplierFilters) {
            if (this.tempSupplierFilters.status) this.supplierStatusFilter = this.tempSupplierFilters.status;
            if (this.tempSupplierFilters.ops) this.supplierOpsFilter = this.tempSupplierFilters.ops;
            if (this.tempSupplierFilters.voen) this.supplierVoenFilter = this.tempSupplierFilters.voen;
            this.tempSupplierFilters = null;
        }
        this.closeSupplierFilterModal();
        this.refreshSuppliersSection();
    },

    setSupplierStatusFilter: function(val) {
        this.supplierStatusFilter = val || 'all';
        this.refreshSuppliersSection();
    },

    setSupplierOpsFilter: function(val) {
        this.supplierOpsFilter = val || 'all';
        this.refreshSuppliersSection();
    },

    setSupplierVoenFilter: function(val) {
        this.supplierVoenFilter = val || 'all';
        this.refreshSuppliersSection();
    },

    resetAllSupplierFilters: function() {
        this.supplierStatusFilter = 'all';
        this.supplierOpsFilter = 'all';
        this.supplierVoenFilter = 'all';
        this.suppliersSearchQuery = '';
        this.tempSupplierFilters = null;
        this.closeSupplierFilterModal();
        this.refreshSuppliersSection();
    },

    // Handlers for sub-tabs filtering
    handleBalanceSearch: function(val) {
        this.balanceSearchQuery = val || '';
        this.balanceCurrentPage = 1;
        const clearBtn = document.getElementById('balanceSearchClearBtn');
        if (clearBtn) {
            if (this.balanceSearchQuery) clearBtn.classList.remove('hidden');
            else clearBtn.classList.add('hidden');
        }
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'balances') {
            container.innerHTML = this.renderProductsBalancesSection();
        }
    },

    clearBalanceSearch: function() {
        this.balanceSearchQuery = '';
        this.balanceCurrentPage = 1;
        const input = document.getElementById('balanceSearchInput');
        if (input) input.value = '';
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'balances') {
            container.innerHTML = this.renderProductsBalancesSection();
        }
    },

    setBalanceWarehouseFilter: function(val) {
        this.balanceWarehouseFilter = val || 'all';
        this.balanceCurrentPage = 1;
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'balances') {
            container.innerHTML = this.renderProductsBalancesSection();
        }
    },

    setBalanceStockFilter: function(val) {
        this.balanceStockFilter = val || 'all';
        this.balanceCurrentPage = 1;
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'balances') {
            container.innerHTML = this.renderProductsBalancesSection();
        }
    },

    setBalanceCategoryFilter: function(val) {
        this.balanceCategoryFilter = val || 'all';
        this.balanceCurrentPage = 1;
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'balances') {
            container.innerHTML = this.renderProductsBalancesSection();
        }
    },

    resetAllBalanceFilters: function() {
        this.balanceWarehouseFilter = 'all';
        this.balanceStockFilter = 'all';
        this.balanceCategoryFilter = 'all';
        this.balanceSearchQuery = '';
        this.balanceCurrentPage = 1;
        this.tempBalanceWarehouse = null;
        this.tempBalanceStock = null;
        this.closeBalanceFilterModal();
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'balances') {
            container.innerHTML = this.renderProductsBalancesSection();
        }
    },

    renderBalanceFilterBarHtml: function() {
        const hasActiveFilters = (this.balanceWarehouseFilter && this.balanceWarehouseFilter !== 'all') ||
                                 (this.balanceStockFilter && this.balanceStockFilter !== 'all') ||
                                 (this.balanceCategoryFilter && this.balanceCategoryFilter !== 'all') ||
                                 (this.balanceSearchQuery && this.balanceSearchQuery.trim().length > 0);

        const warehouses = this.getWarehouses();
        const activeWhObj = warehouses.find(w => w.id === this.balanceWarehouseFilter);
        const activeWhName = activeWhObj ? activeWhObj.name : '';

        const categories = this.getProductCategories();
        const activeCatObj = categories.find(c => c.id === this.balanceCategoryFilter);
        const activeCatName = activeCatObj ? activeCatObj.name : '';

        const stockLabels = {
            in_stock: 'Stokda var',
            low_stock: 'Kritik qalıq',
            out_of_stock: 'Bitib'
        };

        const activeCount = (this.balanceWarehouseFilter !== 'all' ? 1 : 0) +
                            (this.balanceStockFilter !== 'all' ? 1 : 0) +
                            (this.balanceCategoryFilter !== 'all' ? 1 : 0) +
                            (this.balanceSearchQuery ? 1 : 0);

        return `
            <div class="space-y-2.5">
                <div class="flex items-center gap-2">
                    <!-- Search Input -->
                    <div class="relative flex-1 min-w-0">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </span>
                        <input type="text"
                               id="balanceSearchInput"
                               placeholder="Qalıqlarda məhsul adı, artikol və ya barkod ilə axtarın..."
                               value="${this.balanceSearchQuery || ''}"
                               oninput="BusinessDashboardView.handleBalanceSearch(this.value)"
                               class="w-full h-10 pl-9 pr-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition">
                        <button type="button"
                                id="balanceSearchClearBtn"
                                onclick="BusinessDashboardView.clearBalanceSearch()"
                                class="${this.balanceSearchQuery ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                                title="Təmizlə">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <!-- Filter Button -->
                    <button type="button"
                            onclick="BusinessDashboardView.openBalanceFilterModal()"
                            class="h-10 px-4 rounded-xl border ${hasActiveFilters ? 'border-slate-900 bg-slate-900 text-white shadow-xs' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:border-slate-300'} text-xs font-semibold flex items-center gap-2 transition shrink-0 active:scale-95 cursor-pointer"
                            title="Filtrlər pəncərəsi">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                        <span>Filtr</span>
                        ${hasActiveFilters ? `
                            <span class="w-5 h-5 rounded-full bg-[#FFDD2D] text-[#101114] text-[10px] font-black flex items-center justify-center">
                                ${activeCount}
                            </span>
                        ` : ''}
                    </button>
                </div>

                <!-- Active Filter Badges Pill Row -->
                ${hasActiveFilters ? `
                    <div class="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                        <span class="text-[11px] text-slate-400 font-medium">Aktiv filtrlər:</span>

                        ${this.balanceWarehouseFilter !== 'all' && activeWhName ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium">
                                <span>Anbar: <strong>${activeWhName}</strong></span>
                                <button type="button" onclick="BusinessDashboardView.setBalanceWarehouseFilter('all')" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        ${this.balanceStockFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
                                <span>Stok: <strong>${stockLabels[this.balanceStockFilter] || this.balanceStockFilter}</strong></span>
                                <button type="button" onclick="BusinessDashboardView.setBalanceStockFilter('all')" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        ${this.balanceCategoryFilter !== 'all' && activeCatName ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
                                <span>Kateqoriya: <strong>${activeCatName}</strong></span>
                                <button type="button" onclick="BusinessDashboardView.setBalanceCategoryFilter('all')" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        ${this.balanceSearchQuery ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
                                <span>Axtarış: <strong>"${this.balanceSearchQuery}"</strong></span>
                                <button type="button" onclick="BusinessDashboardView.clearBalanceSearch()" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        <button type="button" onclick="BusinessDashboardView.resetAllBalanceFilters()" class="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 transition ml-1 cursor-pointer">
                            Hamısını təmizlə
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    },

    openBalanceFilterModal: function() {
        const modal = document.getElementById('bizBalanceFilterModal');
        if (!modal) return;

        this.tempBalanceWarehouse = this.balanceWarehouseFilter;
        this.tempBalanceStock = this.balanceStockFilter;

        // Populate warehouses buttons
        const whContainer = document.getElementById('balanceFilterWarehouseButtons');
        if (whContainer) {
            const warehouses = this.getWarehouses();
            const curWh = this.tempBalanceWarehouse !== null ? this.tempBalanceWarehouse : this.balanceWarehouseFilter;
            whContainer.innerHTML = `
                <button type="button" id="balFilterWhBtn_all" onclick="BusinessDashboardView.selectBalanceFilterWarehouse('all')" class="p-2.5 rounded-xl border ${curWh === 'all' ? 'border-2 border-slate-900 bg-white text-slate-900 font-bold shadow-xs' : 'border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700'} flex items-center justify-center gap-1.5 transition text-center cursor-pointer col-span-1 sm:col-span-2">
                    <span class="text-[11px]">Bütün anbarlar (Hamısı)</span>
                </button>
                ${warehouses.map(w => `
                    <button type="button" id="balFilterWhBtn_${w.id}" onclick="BusinessDashboardView.selectBalanceFilterWarehouse('${w.id}')" class="p-2.5 rounded-xl border ${curWh === w.id ? 'border-2 border-slate-900 bg-white text-slate-900 font-bold shadow-xs' : 'border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700'} flex items-center justify-center gap-1.5 transition text-center cursor-pointer">
                        <span class="text-[11px] truncate">${w.name}</span>
                    </button>
                `).join('')}
            `;
        }

        // Populate category dropdown
        const catSelect = document.getElementById('balFilterModalCategory');
        if (catSelect) {
            const categories = this.getProductCategories();
            catSelect.innerHTML = `
                <option value="all">Bütün kateqoriyalar</option>
                ${categories.map(c => `
                    <option value="${c.id}" ${this.balanceCategoryFilter === c.id ? 'selected' : ''}>${c.name}</option>
                `).join('')}
            `;
        }

        this.updateBalanceFilterModalButtons();
        modal.classList.remove('hidden');
    },

    closeBalanceFilterModal: function() {
        const modal = document.getElementById('bizBalanceFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    selectBalanceFilterWarehouse: function(whId) {
        this.tempBalanceWarehouse = whId;
        const warehouses = this.getWarehouses();
        const allKeys = ['all', ...warehouses.map(w => w.id)];
        allKeys.forEach(k => {
            const btn = document.getElementById(`balFilterWhBtn_${k}`);
            if (btn) {
                if (k === whId) {
                    btn.className = "p-2.5 rounded-xl border-2 border-slate-900 bg-white text-slate-900 font-bold flex items-center justify-center gap-1.5 transition text-center shadow-xs cursor-pointer" + (k === 'all' ? ' col-span-1 sm:col-span-2' : '');
                } else {
                    btn.className = "p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex items-center justify-center gap-1.5 transition text-center cursor-pointer" + (k === 'all' ? ' col-span-1 sm:col-span-2' : '');
                }
            }
        });
    },

    selectBalanceFilterStock: function(status) {
        this.tempBalanceStock = status;
        this.updateBalanceFilterModalButtons();
    },

    updateBalanceFilterModalButtons: function() {
        const curStock = this.tempBalanceStock !== null ? this.tempBalanceStock : this.balanceStockFilter;
        ['all', 'in_stock', 'low_stock', 'out_of_stock'].forEach(s => {
            const btn = document.getElementById(`balFilterStockBtn_${s}`);
            if (btn) {
                if (s === curStock) {
                    btn.className = "p-2.5 rounded-xl border-2 border-slate-900 bg-white text-slate-900 font-bold flex flex-col items-center justify-center gap-1 transition text-center shadow-xs cursor-pointer";
                } else {
                    btn.className = "p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer";
                }
            }
        });
    },

    applyBalanceFilterModal: function() {
        if (this.tempBalanceWarehouse !== null) {
            this.balanceWarehouseFilter = this.tempBalanceWarehouse;
            this.tempBalanceWarehouse = null;
        }
        if (this.tempBalanceStock !== null) {
            this.balanceStockFilter = this.tempBalanceStock;
            this.tempBalanceStock = null;
        }
        const catSelect = document.getElementById('balFilterModalCategory');
        if (catSelect) {
            this.balanceCategoryFilter = catSelect.value;
        }
        this.balanceCurrentPage = 1;
        this.closeBalanceFilterModal();
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'balances') {
            container.innerHTML = this.renderProductsBalancesSection();
        }
    },

    setBalancePage: function(page) {
        this.balanceCurrentPage = Math.max(1, page);
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'balances') {
            container.innerHTML = this.renderProductsBalancesSection();
        }
    },

    setBalancePageSize: function(size) {
        this.balancePageSize = size || 10;
        this.balanceCurrentPage = 1;
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'balances') {
            container.innerHTML = this.renderProductsBalancesSection();
        }
    },

    setOperationsPage: function(page) {
        this.operationsCurrentPage = Math.max(1, page);
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'operations') {
            container.innerHTML = this.renderProductsOperationsSection();
        }
    },

    setOperationsPageSize: function(size) {
        this.operationsPageSize = size || 10;
        this.operationsCurrentPage = 1;
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'operations') {
            container.innerHTML = this.renderProductsOperationsSection();
        }
    },

    setAuditsPage: function(page) {
        this.auditsCurrentPage = Math.max(1, page);
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'inventory') {
            container.innerHTML = this.renderProductsInventorySection();
        }
    },

    setAuditsPageSize: function(size) {
        this.auditsPageSize = size || 10;
        this.auditsCurrentPage = 1;
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'inventory') {
            container.innerHTML = this.renderProductsInventorySection();
        }
    },

    renderTablePagination: function(options) {
        return ZeyvoUI.tablePagination(options);
    },

    handleTechCardSearch: function(val) {
        this.techCardSearchQuery = val || '';
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'techcards') {
            container.innerHTML = this.renderProductsTechCardsSection();
        }
    },

    operationTypeFilter: 'all',
    operationSearchQuery: '',
    operationWarehouseFilter: 'all',
    operationDateFilter: 'all',
    operationCustomStartDate: '',
    operationCustomEndDate: '',
    operationStatusFilter: 'all',

    setOperationTypeFilter: function(val) {
        this.operationTypeFilter = val || 'all';
        this.operationsCurrentPage = 1;
        this.refreshOperationsSection();
    },

    setOperationWarehouseFilter: function(val) {
        this.operationWarehouseFilter = val || 'all';
        this.operationsCurrentPage = 1;
        this.refreshOperationsSection();
    },

    setOperationDateFilter: function(val) {
        this.operationDateFilter = val || 'all';
        if (this.operationDateFilter === 'all') {
            this.operationCustomStartDate = '';
            this.operationCustomEndDate = '';
        }
        this.operationsCurrentPage = 1;
        this.refreshOperationsSection();
    },

    setOperationStatusFilter: function(val) {
        this.operationStatusFilter = val || 'all';
        this.operationsCurrentPage = 1;
        this.refreshOperationsSection();
    },

    handleOperationSearch: function(val) {
        this.operationSearchQuery = val || '';
        this.operationsCurrentPage = 1;
        this.refreshOperationsSection();
    },

    clearOperationSearch: function() {
        this.operationSearchQuery = '';
        this.operationsCurrentPage = 1;
        this.refreshOperationsSection();
    },

    resetAllOperationFilters: function() {
        this.operationTypeFilter = 'all';
        this.operationSearchQuery = '';
        this.operationWarehouseFilter = 'all';
        this.operationDateFilter = 'all';
        this.operationCustomStartDate = '';
        this.operationCustomEndDate = '';
        this.operationStatusFilter = 'all';
        this.operationsCurrentPage = 1;
        this.tempOpFilters = null;
        this.closeAllCustomDatePickers();
        this.closeOperationsFilterModal();
        this.refreshOperationsSection();
    },

    refreshOperationsSection: function() {
        const container = document.getElementById('bizProductsSubContent');
        if (container && this.productsActiveTab === 'operations') {
            container.innerHTML = this.renderProductsOperationsSection();
        }
    },

    openOperationsFilterModal: function() {
        const modal = document.getElementById('bizOperationsFilterModal');
        if (!modal) return;

        const todayIso = new Date().toISOString().split('T')[0];
        if (!this.tempOpFilters) {
            this.tempOpFilters = {};
        }
        if (!this.tempOpFilters.warehouse) this.tempOpFilters.warehouse = this.operationWarehouseFilter || 'all';
        if (!this.tempOpFilters.type) this.tempOpFilters.type = this.operationTypeFilter || 'all';
        if (!this.tempOpFilters.period) this.tempOpFilters.period = this.operationDateFilter || 'all';
        if (!this.tempOpFilters.startDate) this.tempOpFilters.startDate = this.operationCustomStartDate || todayIso;
        if (!this.tempOpFilters.endDate) this.tempOpFilters.endDate = this.operationCustomEndDate || todayIso;
        if (!this.tempOpFilters.status) this.tempOpFilters.status = this.operationStatusFilter || 'all';

        // 1. Warehouse buttons
        const whContainer = document.getElementById('opFilterWarehouseButtons');
        if (whContainer) {
            const warehouses = this.getWarehouses();
            whContainer.innerHTML = `
                <button type="button" onclick="BusinessDashboardView.selectOpFilterWarehouse('all')" class="p-2.5 rounded-xl border ${this.tempOpFilters.warehouse === 'all' ? 'border-tbank-graphite bg-white ring-2 ring-tbank-yellow/40 shadow-xs' : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'} transition text-left cursor-pointer">
                    <div class="font-bold text-xs text-slate-900">Bütün anbarlar</div>
                    <div class="text-[10px] text-slate-400">Filtrsiz</div>
                </button>
                ${warehouses.map(w => `
                    <button type="button" onclick="BusinessDashboardView.selectOpFilterWarehouse('${w.id}')" class="p-2.5 rounded-xl border ${this.tempOpFilters.warehouse === w.id ? 'border-tbank-graphite bg-white ring-2 ring-tbank-yellow/40 shadow-xs' : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'} transition text-left cursor-pointer">
                        <div class="font-bold text-xs text-slate-900 truncate">${w.name}</div>
                        <div class="text-[10px] text-slate-400 truncate">${w.location || 'Əsas zona'}</div>
                    </button>
                `).join('')}
            `;
        }

        // 2. Type buttons
        const typeContainer = document.getElementById('opFilterTypeButtons');
        if (typeContainer) {
            const types = [
                { key: 'all', label: 'Hamısı' },
                { key: 'inflow', label: 'Mədaxil' },
                { key: 'writeoff', label: 'Məxaric' },
                { key: 'transfer', label: 'Yerdəyişmə' },
                { key: 'audit', label: 'İnventar' }
            ];
            typeContainer.innerHTML = types.map(t => `
                <button type="button" onclick="BusinessDashboardView.selectOpFilterType('${t.key}')" class="p-2.5 rounded-xl border ${this.tempOpFilters.type === t.key ? 'border-tbank-graphite bg-white ring-2 ring-tbank-yellow/40 shadow-xs' : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'} text-center font-bold text-xs whitespace-nowrap transition cursor-pointer">
                    ${t.label}
                </button>
            `).join('');
        }

        // 3. Period buttons
        const periodContainer = document.getElementById('opFilterPeriodButtons');
        if (periodContainer) {
            const periods = [
                { key: 'all', label: 'Bütün dövr' },
                { key: 'today', label: 'Bu gün' },
                { key: 'week', label: 'Son 7 gün' },
                { key: 'month', label: 'Bu ay' },
                { key: 'custom', label: 'Təqvim' }
            ];
            periodContainer.innerHTML = periods.map(p => {
                const isActive = this.tempOpFilters.period === p.key;
                return `
                    <button type="button" onclick="BusinessDashboardView.selectOpFilterPeriod('${p.key}')" class="p-2.5 rounded-xl border ${isActive ? 'border-tbank-graphite bg-white ring-2 ring-tbank-yellow/40 shadow-xs' : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'} text-center font-bold text-xs whitespace-nowrap transition cursor-pointer ${p.key === 'custom' ? 'col-span-2 sm:col-span-1' : ''}">
                        ${p.key === 'custom' ? `
                            <span class="inline-flex items-center justify-center gap-1.5">
                                <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                <span>${p.label}</span>
                            </span>
                        ` : p.label}
                    </button>
                `;
            }).join('');
        }

        const customDateBox = document.getElementById('opFilterCustomDateContainer');
        if (customDateBox) {
            if (this.tempOpFilters.period === 'custom') {
                customDateBox.classList.remove('hidden');
                const sDate = this.tempOpFilters.startDate || todayIso;
                const eDate = this.tempOpFilters.endDate || todayIso;
                this.initCustomDatePicker('opFilterStartDate', sDate);
                this.initCustomDatePicker('opFilterEndDate', eDate);
            } else {
                customDateBox.classList.add('hidden');
            }
        }

        // 4. Status buttons
        const statusContainer = document.getElementById('opFilterStatusButtons');
        if (statusContainer) {
            const statuses = [
                { key: 'all', label: 'Hamısı' },
                { key: 'completed', label: 'Tamamlandı' },
                { key: 'draft', label: 'Qaralama' },
                { key: 'cancelled', label: 'Ləğv edildi' }
            ];
            statusContainer.innerHTML = statuses.map(s => `
                <button type="button" onclick="BusinessDashboardView.selectOpFilterStatus('${s.key}')" class="p-2.5 rounded-xl border ${this.tempOpFilters.status === s.key ? 'border-tbank-graphite bg-white ring-2 ring-tbank-yellow/40 shadow-xs' : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'} text-center font-bold text-xs whitespace-nowrap transition cursor-pointer">
                    ${s.label}
                </button>
            `).join('');
        }

        modal.classList.remove('hidden');
    },

    closeOperationsFilterModal: function() {
        const modal = document.getElementById('bizOperationsFilterModal');
        if (modal) modal.classList.add('hidden');
        this.closeAllCustomDatePickers();
    },

    selectOpFilterWarehouse: function(whId) {
        if (!this.tempOpFilters) this.tempOpFilters = {};
        this.tempOpFilters.warehouse = whId;
        this.openOperationsFilterModal();
    },

    selectOpFilterType: function(type) {
        if (!this.tempOpFilters) this.tempOpFilters = {};
        this.tempOpFilters.type = type;
        this.openOperationsFilterModal();
    },

    selectOpFilterPeriod: function(period) {
        if (!this.tempOpFilters) this.tempOpFilters = {};
        this.tempOpFilters.period = period;
        if (period === 'custom') {
            const todayIso = new Date().toISOString().split('T')[0];
            if (!this.tempOpFilters.startDate) this.tempOpFilters.startDate = this.operationCustomStartDate || todayIso;
            if (!this.tempOpFilters.endDate) this.tempOpFilters.endDate = this.operationCustomEndDate || todayIso;
        }
        this.openOperationsFilterModal();
    },

    selectOpFilterStatus: function(status) {
        if (!this.tempOpFilters) this.tempOpFilters = {};
        this.tempOpFilters.status = status;
        this.openOperationsFilterModal();
    },

    applyOperationsFilterModal: function() {
        if (this.tempOpFilters) {
            this.operationWarehouseFilter = this.tempOpFilters.warehouse || 'all';
            this.operationTypeFilter = this.tempOpFilters.type || 'all';
            this.operationDateFilter = this.tempOpFilters.period || 'all';
            if (this.operationDateFilter === 'custom') {
                const sInput = document.getElementById('opFilterStartDate');
                const eInput = document.getElementById('opFilterEndDate');
                this.operationCustomStartDate = (sInput && sInput.value) ? sInput.value : (this.tempOpFilters.startDate || '');
                this.operationCustomEndDate = (eInput && eInput.value) ? eInput.value : (this.tempOpFilters.endDate || '');
            } else {
                this.operationCustomStartDate = '';
                this.operationCustomEndDate = '';
            }
            this.operationStatusFilter = this.tempOpFilters.status || 'all';
        }
        this.closeAllCustomDatePickers();
        this.operationsCurrentPage = 1;
        this.closeOperationsFilterModal();
        this.refreshOperationsSection();
    },

    renderOperationsFilterBarHtml: function() {
        const hasActiveFilters = (this.operationWarehouseFilter && this.operationWarehouseFilter !== 'all') ||
                                 (this.operationDateFilter && this.operationDateFilter !== 'all') ||
                                 (this.operationStatusFilter && this.operationStatusFilter !== 'all') ||
                                 (this.operationTypeFilter && this.operationTypeFilter !== 'all') ||
                                 (this.operationSearchQuery && this.operationSearchQuery.trim().length > 0);

        const warehouses = this.getWarehouses();
        const activeWhObj = warehouses.find(w => w.id === this.operationWarehouseFilter);
        const activeWhName = activeWhObj ? activeWhObj.name : '';

        const typeLabels = {
            inflow: 'Mədaxil',
            writeoff: 'Məxaric',
            transfer: 'Yerdəyişmə',
            audit: 'İnventarizasiya'
        };

        const periodLabels = {
            today: 'Bu gün',
            week: 'Son 7 gün',
            month: 'Bu ay'
        };

        const statusLabels = {
            completed: 'Tamamlandı',
            draft: 'Qaralama',
            cancelled: 'Ləğv edildi'
        };

        const activeCount = (this.operationWarehouseFilter !== 'all' ? 1 : 0) +
                            (this.operationDateFilter !== 'all' ? 1 : 0) +
                            (this.operationStatusFilter !== 'all' ? 1 : 0) +
                            (this.operationTypeFilter !== 'all' ? 1 : 0) +
                            (this.operationSearchQuery ? 1 : 0);

        return `
            <div class="space-y-3">
                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <!-- Search Input -->
                    <div class="relative flex-1 min-w-0">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </span>
                        <input type="text"
                               id="operationSearchInput"
                               placeholder="Sənəd №, anbar və ya məhsul axtarışı..."
                               value="${this.operationSearchQuery || ''}"
                               oninput="BusinessDashboardView.handleOperationSearch(this.value)"
                               class="w-full h-10 pl-9 pr-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition">
                        <button type="button"
                                id="operationSearchClearBtn"
                                onclick="BusinessDashboardView.clearOperationSearch()"
                                class="${this.operationSearchQuery ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                                title="Təmizlə">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <!-- Filter Modal Button -->
                    <button type="button"
                            onclick="BusinessDashboardView.openOperationsFilterModal()"
                            class="h-10 px-3.5 sm:px-4 rounded-xl border ${hasActiveFilters ? 'border-slate-900 bg-slate-900 text-white shadow-xs' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:border-slate-300'} text-xs font-semibold flex items-center gap-1.5 transition shrink-0 active:scale-95 cursor-pointer"
                            title="Filtrlər">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                        <span>Filtr</span>
                        ${hasActiveFilters && activeCount > 0 ? `
                            <span class="w-5 h-5 rounded-full bg-[#FFDD2D] text-[#101114] text-[10px] font-black flex items-center justify-center">
                                ${activeCount}
                            </span>
                        ` : ''}
                    </button>
                </div>

                <!-- Active Filter Badges Pill Row -->
                ${hasActiveFilters ? `
                    <div class="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                        <span class="text-[11px] text-slate-400 font-medium">Aktiv filtrlər:</span>

                        ${this.operationWarehouseFilter !== 'all' && activeWhName ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium">
                                <span>Anbar: <strong>${activeWhName}</strong></span>
                                <button type="button" onclick="BusinessDashboardView.setOperationWarehouseFilter('all')" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        ${this.operationDateFilter !== 'all' ? (() => {
                            let label = periodLabels[this.operationDateFilter] || this.operationDateFilter;
                            if (this.operationDateFilter === 'custom') {
                                if (this.operationCustomStartDate && this.operationCustomEndDate) {
                                    label = this.operationCustomStartDate === this.operationCustomEndDate
                                        ? this.formatDateDisplay(this.operationCustomStartDate)
                                        : `${this.formatDateDisplay(this.operationCustomStartDate)} — ${this.formatDateDisplay(this.operationCustomEndDate)}`;
                                } else if (this.operationCustomStartDate) {
                                    label = `≥ ${this.formatDateDisplay(this.operationCustomStartDate)}`;
                                } else if (this.operationCustomEndDate) {
                                    label = `≤ ${this.formatDateDisplay(this.operationCustomEndDate)}`;
                                } else {
                                    label = 'Təqvim';
                                }
                            }
                            return `
                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
                                    <span>Tarix: <strong>${label}</strong></span>
                                    <button type="button" onclick="BusinessDashboardView.setOperationDateFilter('all')" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                    </button>
                                </span>
                            `;
                        })() : ''}

                        ${this.operationStatusFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
                                <span>Status: <strong>${statusLabels[this.operationStatusFilter] || this.operationStatusFilter}</strong></span>
                                <button type="button" onclick="BusinessDashboardView.setOperationStatusFilter('all')" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        ${this.operationTypeFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
                                <span>Növ: <strong>${typeLabels[this.operationTypeFilter] || this.operationTypeFilter}</strong></span>
                                <button type="button" onclick="BusinessDashboardView.setOperationTypeFilter('all')" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        ${this.operationSearchQuery ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
                                <span>Axtarış: "<strong>${this.operationSearchQuery}</strong>"</span>
                                <button type="button" onclick="BusinessDashboardView.clearOperationSearch()" class="hover:text-rose-600 transition ml-0.5 cursor-pointer" title="Sil">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                </button>
                            </span>
                        ` : ''}

                        <button type="button"
                                onclick="BusinessDashboardView.resetAllOperationFilters()"
                                class="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition cursor-pointer">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                            <span>Filtrləri sıfırla</span>
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    },

    renderProductFilterBarHtml: function() {
        const hasActiveFilters = (this.productTypeFilter && this.productTypeFilter !== 'all') ||
                                 (this.productCategoryFilter && this.productCategoryFilter !== 'all') ||
                                 (this.productStockFilter && this.productStockFilter !== 'all') ||
                                 (this.productSearchQuery && this.productSearchQuery.trim().length > 0);

        const categories = this.getProductCategories();
        const activeCatObj = categories.find(c => c.id === this.productCategoryFilter);
        const activeCatName = activeCatObj ? activeCatObj.name : '';

        return `
            <div class="space-y-2.5">
                <div class="flex items-center gap-2">
                    <!-- Search Input -->
                    <div class="relative flex-1 min-w-0">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </span>
                        <input type="text"
                               id="prodSearchInput"
                               placeholder="Məhsul adı, artikol və ya barkod ilə axtarın..."
                               value="${this.productSearchQuery || ''}"
                               oninput="BusinessDashboardView.handleProductSearch(this.value)"
                               class="w-full h-10 pl-9 pr-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-xs font-medium outline-none focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition">
                        <button type="button"
                                id="prodSearchClearBtn"
                                onclick="BusinessDashboardView.clearProductSearch()"
                                class="${this.productSearchQuery ? '' : 'hidden'} absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                                title="Təmizlə">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <!-- Filter Button -->
                    <button type="button"
                            onclick="BusinessDashboardView.openProductFilterModal()"
                            class="h-10 px-4 rounded-xl border ${hasActiveFilters ? 'border-slate-900 bg-slate-900 text-white shadow-xs' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:border-slate-300'} text-xs font-semibold flex items-center gap-2 transition shrink-0 active:scale-95"
                            title="Filtrlər pəncərəsi">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                        <span>Filtr</span>
                        ${hasActiveFilters ? `
                            <span class="w-5 h-5 rounded-full bg-[#FFDD2D] text-[#101114] text-[10px] font-black flex items-center justify-center">
                                ${(this.productTypeFilter !== 'all' ? 1 : 0) + (this.productCategoryFilter !== 'all' ? 1 : 0) + (this.productStockFilter !== 'all' ? 1 : 0) + (this.productSearchQuery ? 1 : 0)}
                            </span>
                        ` : ''}
                    </button>
                </div>

                <!-- Active Filter Badges Pill Row -->
                ${hasActiveFilters ? `
                    <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                        <span class="text-[11px] text-slate-400 font-medium mr-1">Aktiv filtrlər:</span>

                        ${this.productTypeFilter && this.productTypeFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200">
                                <span>Təyinat: ${this.getProductTypeConfig(this.productTypeFilter).label}</span>
                                <button type="button" onclick="BusinessDashboardView.setProductTypeFilter('all')" class="hover:text-rose-600 transition" title="Sil"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                            </span>
                        ` : ''}

                        ${this.productStockFilter && this.productStockFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200">
                                <span>Stok: ${this.productStockFilter === 'in_stock' ? 'Stokda var' : (this.productStockFilter === 'low_stock' ? 'Kritik qalıq' : 'Bitib')}</span>
                                <button type="button" onclick="BusinessDashboardView.setProductStockFilter('all')" class="hover:text-rose-600 transition" title="Sil"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                            </span>
                        ` : ''}

                        ${this.productCategoryFilter && this.productCategoryFilter !== 'all' ? `
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200">
                                <span>Kateqoriya: ${activeCatName || this.productCategoryFilter}</span>
                                <button type="button" onclick="BusinessDashboardView.setProductCategoryFilter('all')" class="hover:text-rose-600 transition" title="Sil"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                            </span>
                        ` : ''}

                        <button type="button" onclick="BusinessDashboardView.resetAllProductFilters()" class="text-[11px] font-medium text-rose-600 hover:text-rose-700 hover:underline ml-1">
                            Hamısını sıfırla
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    },

    renderProductCardsHtml: function() {
        const activeCtx = this.getActiveContext();
        let products = this.getProducts().filter(p => {
            if (p.branchId) {
                return p.branchId === activeCtx.branchId || p.branchName === activeCtx.branchName;
            }
            return p.businessName === activeCtx.businessName;
        });

        // 1. Filter by Search Query
        if (this.productSearchQuery && this.productSearchQuery.trim()) {
            const q = this.productSearchQuery.toLowerCase().trim();
            products = products.filter(p => {
                const name = (p.name || '').toLowerCase();
                const sku = (p.sku || '').toLowerCase();
                const barcode = (p.barcode || '').toLowerCase();
                const notes = (p.notes || '').toLowerCase();
                return name.includes(q) || sku.includes(q) || barcode.includes(q) || notes.includes(q);
            });
        }

        // 2. Filter by Product Type
        if (this.productTypeFilter && this.productTypeFilter !== 'all') {
            products = products.filter(p => p.type === this.productTypeFilter);
        }

        // 3. Filter by Stock Status
        if (this.productStockFilter && this.productStockFilter !== 'all') {
            products = products.filter(p => {
                const stockStatus = this.getProductStockStatus(p).key;
                return stockStatus === this.productStockFilter;
            });
        }

        // 4. Filter by Category
        if (this.productCategoryFilter && this.productCategoryFilter !== 'all') {
            products = products.filter(p => p.categoryId === this.productCategoryFilter);
        }

        const categories = this.getProductCategories();

        if (products.length === 0) {
            return `
                <div class="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-3 shadow-xs">
                    <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm text-tbank-graphite">Heç bir məhsul tapılmadı</h4>
                        <p class="text-xs text-slate-400 font-medium mt-1">Axtarış və ya filtr meyarlarını dəyişin, yaxud yeni məhsul əlavə edin</p>
                    </div>
                    <div class="pt-2 flex items-center justify-center gap-2">
                        <button type="button" onclick="BusinessDashboardView.openCreateProductCategoryModal()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition active:scale-95">
                            Yeni kateqoriya
                        </button>
                        ${ZeyvoUI.button({ label: "Məhsul əlavə et", onClick: "BusinessDashboardView.openCreateProductModal()", size: "md", type: "button" })}
                    </div>
                </div>
            `;
        }

        let html = '';

        // Iterate categories
        categories.forEach(cat => {
            const catProducts = products.filter(p => p.categoryId === cat.id);
            if (this.productCategoryFilter !== 'all' && this.productCategoryFilter !== cat.id) return;
            if (catProducts.length === 0 && (this.productSearchQuery || this.productTypeFilter !== 'all' || this.productStockFilter !== 'all')) {
                return;
            }

            const isCollapsed = !!this.collapsedProductCategories[cat.id];

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
                                        <button type="button" onclick="BusinessDashboardView.toggleProductCategoryCollapse('${cat.id}')" class="w-6 h-6 -ml-1 rounded-lg text-slate-400 hover:text-tbank-graphite hover:bg-slate-100 transition flex items-center justify-center shrink-0 cursor-pointer" title="${isCollapsed ? 'Məhsulları göstər' : 'Məhsulları qatla'}">
                                            <svg id="prodCatChevron_${cat.id}" class="w-3.5 h-3.5 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                            </svg>
                                        </button>
                                        <h4 onclick="BusinessDashboardView.toggleProductCategoryCollapse('${cat.id}')" title="Məhsulları açmaq/bağlamaq üçün klikləyin" class="font-bold text-sm text-tbank-graphite hover:underline cursor-pointer truncate">
                                            ${cat.name}
                                        </h4>
                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-100/70 text-amber-900 border border-amber-200/50">
                                            ${catProducts.length} məhsul
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: Category Edit & Delete Buttons -->
                            <div class="flex items-center gap-1 shrink-0">
                                <button type="button" onclick="BusinessDashboardView.openCreateProductCategoryModal('${cat.id}')" class="p-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-white transition text-xs font-medium flex items-center justify-center shadow-2xs" title="Kateqoriyanı redaktə et">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                                </button>
                                <button type="button" onclick="BusinessDashboardView.deleteProductCategory('${cat.id}')" class="p-1.5 rounded-xl border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition text-xs font-medium flex items-center justify-center" title="Kateqoriyanı sil">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Product Rows Inside Category -->
                        <div id="prodCategoryList_${cat.id}" class="${isCollapsed ? 'hidden' : ''} pt-2 space-y-2">
                            ${catProducts.map(prod => {
                                const typeConf = this.getProductTypeConfig(prod.type);
                                const stockConf = this.getProductStockStatus(prod);
                                const salePrice = parseFloat(prod.salePrice) || 0;
                                const costPrice = parseFloat(prod.costPrice) || 0;
                                const prodCode = prod.sku || prod.barcode || '';
                                return `
                                    <div class="p-3 sm:p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-200/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                                        <!-- Left Info -->
                                        <div class="min-w-0 flex-1">
                                            <div class="flex items-center gap-2 flex-wrap">
                                                <span class="font-bold text-xs sm:text-sm text-tbank-graphite truncate">${prod.name}</span>
                                                <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold border ${typeConf.badgeClass}">
                                                    ${typeConf.label}
                                                </span>
                                            </div>
                                            ${prodCode ? `
                                                <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                                                    ${prodCode}
                                                </div>
                                            ` : ''}
                                        </div>

                                        <!-- Prices & Stock & Actions -->
                                        <div class="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
                                            <!-- Price -->
                                            <div class="text-right">
                                                ${salePrice > 0 ? `
                                                    <div class="font-bold text-xs sm:text-sm text-slate-900">${salePrice.toFixed(2)} ₼</div>
                                                ` : `
                                                    <div class="text-[11px] text-slate-400 font-medium">—</div>
                                                `}
                                                ${costPrice > 0 ? `
                                                    <div class="text-[10px] text-slate-400">Maya: ${costPrice.toFixed(2)} ₼</div>
                                                ` : ''}
                                            </div>

                                            <!-- Stock Status Badge -->
                                            <span class="px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${stockConf.badgeClass} min-w-[76px] justify-center shadow-2xs">
                                                <span class="w-1.5 h-1.5 rounded-full ${stockConf.dotClass}"></span>
                                                <span>${prod.stock || 0} ${prod.unit || 'ədəd'}</span>
                                            </span>

                                            <!-- Edit / Delete -->
                                            <div class="flex items-center gap-1">
                                                <button type="button" onclick="BusinessDashboardView.openEditProductModal('${prod.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition" title="Məhsulu redaktə et">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                                                </button>
                                                <button type="button" onclick="BusinessDashboardView.deleteProduct('${prod.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition" title="Məhsulu sil">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}

                            <!-- Add Product to Category Bottom Button -->
                            <div class="pt-1">
                                <button type="button" onclick="BusinessDashboardView.openCreateProductModal(null, '${cat.id}')" class="w-full py-2 px-3 rounded-xl bg-slate-100/90 hover:bg-[#FFDD2D] text-slate-800 hover:text-[#101114] font-medium text-xs transition flex items-center justify-center gap-1.5 active:scale-[0.99] border border-slate-200/80 hover:border-amber-300 shadow-2xs">
                                    <svg class="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                                    <span>Məhsul əlavə et</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        return html;
    },

    quickAdjustProductStock: function(prodId, delta) {
        const products = this.getProducts();
        const prod = products.find(p => p.id === prodId);
        if (!prod) return;

        let currentStock = parseInt(prod.stock) || 0;
        currentStock = Math.max(0, currentStock + delta);
        prod.stock = currentStock;

        const minStock = parseInt(prod.minStock) || 3;
        if (currentStock <= 0) {
            prod.status = 'out_of_stock';
        } else if (currentStock <= minStock) {
            prod.status = 'low_stock';
        } else {
            prod.status = 'in_stock';
        }

        this.saveProducts(products);
        if (typeof App !== 'undefined') {
            App.showToast(`Stok yeniləndi: ${prod.name} (${currentStock} ${prod.unit || 'ədəd'})`);
        }
        this.refreshProductsModule();
    },

    handleProductSearch: function(val) {
        this.productSearchQuery = val || '';
        const clearBtn = document.getElementById('prodSearchClearBtn');
        if (clearBtn) {
            if (this.productSearchQuery.trim()) clearBtn.classList.remove('hidden');
            else clearBtn.classList.add('hidden');
        }
        this.refreshProductCards();
    },

    clearProductSearch: function() {
        this.productSearchQuery = '';
        const input = document.getElementById('prodSearchInput');
        if (input) input.value = '';
        const clearBtn = document.getElementById('prodSearchClearBtn');
        if (clearBtn) clearBtn.classList.add('hidden');
        this.refreshProductCards();
    },

    setProductTypeFilter: function(type) {
        this.productTypeFilter = type;
        this.refreshProductsModule();
    },

    setProductStockFilter: function(status) {
        this.productStockFilter = status;
        this.refreshProductsModule();
    },

    setProductCategoryFilter: function(catId) {
        this.productCategoryFilter = catId;
        this.refreshProductsModule();
    },

    resetAllProductFilters: function() {
        this.productSearchQuery = '';
        this.productTypeFilter = 'all';
        this.productCategoryFilter = 'all';
        this.productStockFilter = 'all';
        this.closeProductFilterModal();
        this.refreshProductsModule();
        if (typeof App !== 'undefined') App.showToast("Bütün filtrlər sıfırlandı");
    },

    refreshProductCards: function() {
        const grid = document.getElementById('prodCardsGrid');
        if (grid) grid.innerHTML = this.renderProductCardsHtml();
    },

    refreshProductsModule: function() {
        const container = document.getElementById('bizCanvasBody');
        if (container && this.activeTab === 'products') {
            container.innerHTML = this.renderProductsModule();
        }
    },

    // Category Modal Methods
    highlightProductCategoryFormIcon: function(iconKey) {
        const container = document.getElementById('prodCatIconOptions');
        if (!container) return;
        const normalized = iconKey || 'package';
        container.querySelectorAll('button[data-icon]').forEach(b => {
            if (b.getAttribute('data-icon') === normalized) {
                b.className = 'w-9 h-9 rounded-xl border-2 border-slate-900 bg-white text-slate-950 transition flex items-center justify-center shadow-xs scale-105 cursor-pointer';
            } else {
                b.className = 'w-9 h-9 rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer';
            }
        });
    },

    selectProductCategoryFormIcon: function(iconKey, btnEl) {
        const input = document.getElementById('prodCategoryFormIcon');
        if (input) input.value = iconKey;
        this.highlightProductCategoryFormIcon(iconKey);
    },

    openCreateProductCategoryModal: function(editCatId) {
        const modal = document.getElementById('bizCreateProductCategoryModal');
        if (!modal) return;

        const editIdInput = document.getElementById('prodCategoryFormEditId');
        const titleEl = document.getElementById('prodCategoryModalTitle');
        const submitBtn = document.getElementById('prodCategoryModalSubmitBtn');
        const nameInput = document.getElementById('prodCategoryFormName');
        const iconInput = document.getElementById('prodCategoryFormIcon');
        const descInput = document.getElementById('prodCategoryFormDesc');

        let selectedIcon = 'package';

        if (editCatId) {
            const categories = this.getProductCategories();
            const cat = categories.find(c => c.id === editCatId);
            if (cat) {
                selectedIcon = cat.icon || 'package';
                if (editIdInput) editIdInput.value = cat.id;
                if (titleEl) titleEl.textContent = 'Kateqoriyanı redaktə et';
                if (submitBtn) submitBtn.textContent = 'Dəyişiklikləri saxla';
                if (nameInput) nameInput.value = cat.name || '';
                if (iconInput) iconInput.value = selectedIcon;
                if (descInput) descInput.value = cat.description || '';
            }
        } else {
            if (editIdInput) editIdInput.value = '';
            if (titleEl) titleEl.textContent = 'Yeni məhsul kateqoriyası';
            if (submitBtn) submitBtn.textContent = 'Kateqoriyanı saxla';
            if (nameInput) nameInput.value = '';
            if (iconInput) iconInput.value = 'package';
            if (descInput) descInput.value = '';
        }

        this.highlightProductCategoryFormIcon(selectedIcon);
        modal.classList.remove('hidden');
    },

    closeCreateProductCategoryModal: function() {
        const modal = document.getElementById('bizCreateProductCategoryModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveProductCategory: function(e) {
        if (e) e.preventDefault();
        const editId = document.getElementById('prodCategoryFormEditId')?.value?.trim();
        const name = document.getElementById('prodCategoryFormName')?.value?.trim();
        const icon = document.getElementById('prodCategoryFormIcon')?.value?.trim() || 'package';
        const desc = document.getElementById('prodCategoryFormDesc')?.value?.trim() || '';

        if (!name) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa kateqoriyanın adını qeyd edin");
            return;
        }

        const categories = this.getProductCategories();

        if (editId) {
            const idx = categories.findIndex(c => c.id === editId);
            if (idx !== -1) {
                categories[idx] = {
                    ...categories[idx],
                    name,
                    icon,
                    description: desc
                };
                if (typeof App !== 'undefined') App.showToast("Məhsul kateqoriyası yeniləndi");
            }
        } else {
            const newCat = {
                id: 'pcat_' + Date.now(),
                name,
                icon,
                description: desc
            };
            categories.push(newCat);
            if (typeof App !== 'undefined') App.showToast("Yeni məhsul kateqoriyası yaradıldı!");
        }

        this.saveProductCategories(categories);
        this.closeCreateProductCategoryModal();
        this.refreshProductsModule();
    },

    deleteProductCategory: function(catId) {
        const categories = this.getProductCategories();
        const cat = categories.find(c => c.id === catId);
        if (!cat) return;

        if (categories.length <= 1) {
            if (typeof App !== 'undefined') App.showToast("Ən azı bir kateqoriya qalmalıdır");
            return;
        }

        const remainingCats = categories.filter(c => c.id !== catId);
        const fallbackCat = remainingCats[0];

        this.openDeleteConfirmModal({
            title: 'Kateqoriyanı sil',
            message: `<strong>"${cat.name}"</strong> kateqoriyasını silmək istədiyinizə əminsiniz?<br><span class="text-amber-600 mt-1.5 inline-block text-xs">Bu kateqoriyadakı məhsullar "${fallbackCat.name}" kateqoriyasına köçürüləcək.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                this.saveProductCategories(remainingCats);

                // Update products with this category to fallback category
                const products = this.getProducts();
                products.forEach(p => {
                    if (p.categoryId === catId) p.categoryId = fallbackCat.id;
                });
                this.saveProducts(products);

                if (typeof App !== 'undefined') App.showToast("Kateqoriya silindi, məhsullar köçürüldü");
                this.refreshProductsModule();
            }
        });
    },

    // Product Modal Methods
    populateProductWarehouseOptions: function(selectedWhId) {
        const select = document.getElementById('prodFormWarehouse');
        if (!select) return;
        const warehouses = this.getWarehouses();
        select.innerHTML = warehouses.map(wh => {
            const isSelected = selectedWhId ? (selectedWhId === wh.id) : (wh.isDefault || wh.id === 'wh_1');
            return `<option value="${wh.id}" ${isSelected ? 'selected' : ''}>${wh.name} (${wh.typeName || 'Anbar'})</option>`;
        }).join('');
    },

    populateProductCategoryOptions: function(selectedCatId) {
        const select = document.getElementById('prodFormCategory');
        if (!select) return;
        const categories = this.getProductCategories();
        select.innerHTML = `
            ${categories.map(cat => {
                const isSelected = selectedCatId && selectedCatId === cat.id;
                return `<option value="${cat.id}" ${isSelected ? 'selected' : ''}>${cat.name}</option>`;
            }).join('')}
        `;
    },

    selectProductFormType: function(type) {
        const normType = (type === 'internal') ? 'internal' : 'retail';
        ['retail', 'internal'].forEach(t => {
            const card = document.getElementById(`prodTypeCard_${t}`);
            const radio = card ? card.querySelector('input[type="radio"]') : null;
            if (card) {
                if (t === normType) {
                    card.className = "p-3 rounded-2xl border-2 transition cursor-pointer flex items-center gap-3 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs";
                    if (radio) radio.checked = true;
                } else {
                    card.className = "p-3 rounded-2xl border-2 transition cursor-pointer flex items-center gap-3 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300";
                    if (radio) radio.checked = false;
                }
            }
        });

        const saleContainer = document.getElementById('prodFormSalePriceContainer');
        const hintEl = document.getElementById('prodFormInternalPriceHint');
        const saleInput = document.getElementById('prodFormSalePrice');

        if (normType === 'internal') {
            if (saleContainer) saleContainer.classList.add('hidden');
            if (hintEl) hintEl.classList.remove('hidden');
            if (saleInput) saleInput.value = '';
        } else {
            if (saleContainer) saleContainer.classList.remove('hidden');
            if (hintEl) hintEl.classList.add('hidden');
        }
    },

    adjustProductFormStock: function(delta) {
        const input = document.getElementById('prodFormStock');
        if (!input) return;
        let val = parseInt(input.value) || 0;
        val = Math.max(0, val + delta);
        input.value = val;
    },

    adjustProductFormMinStock: function(delta) {
        const input = document.getElementById('prodFormMinStock');
        if (!input) return;
        let val = parseInt(input.value) || 0;
        val = Math.max(0, val + delta);
        input.value = val;
    },

    openCreateProductModal: function(editProdId, defaultCatId) {
        const modal = document.getElementById('bizCreateProductModal');
        if (!modal) return;

        const categories = this.getProductCategories();
        if (categories.length === 0) {
            if (typeof App !== 'undefined') App.showToast("Məhsul əlavə etmək üçün əvvəlcə kateqoriya yaradın");
            this.openCreateProductCategoryModal();
            return;
        }

        const editIdInput = document.getElementById('prodFormEditId');
        const titleEl = document.getElementById('prodModalTitle');
        const submitBtn = document.getElementById('prodModalSubmitBtn');
        const nameInput = document.getElementById('prodFormName');
        const catSelect = document.getElementById('prodFormCategory');
        const catBadgeWrap = document.getElementById('prodFormCategoryBadgeWrap');
        const catSelectWrap = document.getElementById('prodFormCategorySelectWrap');
        const catBadgeText = document.getElementById('prodFormCategoryBadgeText');
        const skuInput = document.getElementById('prodFormSku');
        const costPriceInput = document.getElementById('prodFormCostPrice');
        const salePriceInput = document.getElementById('prodFormSalePrice');
        const stockInput = document.getElementById('prodFormStock');
        const unitSelect = document.getElementById('prodFormUnit');
        const minStockInput = document.getElementById('prodFormMinStock');
        const descInput = document.getElementById('prodFormDesc');

        let prod = null;
        if (editProdId) {
            const products = this.getProducts();
            prod = products.find(p => p.id === editProdId);
        }

        this.populateProductWarehouseOptions(prod ? prod.warehouseId : (this.productWarehouseFilter && this.productWarehouseFilter !== 'all' ? this.productWarehouseFilter : null));

        if (prod) {
            // EDITING PRODUCT: Show category select so user can reassign if needed
            this.populateProductCategoryOptions(prod.categoryId || categories[0].id);
            if (catBadgeWrap) catBadgeWrap.classList.add('hidden');
            if (catSelectWrap) catSelectWrap.classList.remove('hidden');

            if (editIdInput) editIdInput.value = prod.id;
            if (titleEl) titleEl.textContent = 'Məhsulu redaktə et';
            if (submitBtn) submitBtn.textContent = 'Dəyişiklikləri saxla';
            if (nameInput) nameInput.value = prod.name || '';
            if (catSelect) catSelect.value = prod.categoryId || categories[0].id;
            if (skuInput) skuInput.value = prod.sku || '';
            if (costPriceInput) costPriceInput.value = prod.costPrice !== undefined ? prod.costPrice : '';
            if (salePriceInput) salePriceInput.value = prod.salePrice !== undefined ? prod.salePrice : '';
            if (stockInput) stockInput.value = prod.stock !== undefined ? prod.stock : 0;
            if (unitSelect) unitSelect.value = prod.unit || 'ədəd';
            if (minStockInput) minStockInput.value = prod.minStock !== undefined ? prod.minStock : 3;
            if (descInput) descInput.value = prod.notes || '';
            this.selectProductFormType(prod.type || 'retail');
        } else {
            // CREATING PRODUCT: Category is FIXED from the category card clicked, NO dropdown ("выборку убери при создании")
            const targetCatId = defaultCatId || (this.productCategoryFilter && this.productCategoryFilter !== 'all' ? this.productCategoryFilter : categories[0].id);
            const targetCat = categories.find(c => c.id === targetCatId) || categories[0];

            this.populateProductCategoryOptions(targetCat.id);
            if (catBadgeWrap) catBadgeWrap.classList.remove('hidden');
            if (catSelectWrap) catSelectWrap.classList.add('hidden');
            if (catBadgeText) catBadgeText.textContent = targetCat.name;

            if (editIdInput) editIdInput.value = '';
            if (titleEl) titleEl.textContent = 'Yeni məhsul əlavə et';
            if (submitBtn) submitBtn.textContent = 'Məhsulu əlavə et';
            if (nameInput) nameInput.value = '';
            if (catSelect) catSelect.value = targetCat.id;
            if (skuInput) skuInput.value = '';
            if (costPriceInput) costPriceInput.value = '';
            if (salePriceInput) salePriceInput.value = '';
            if (stockInput) stockInput.value = 1;
            if (unitSelect) unitSelect.value = 'ədəd';
            if (minStockInput) minStockInput.value = 3;
            if (descInput) descInput.value = '';
            this.selectProductFormType('retail');
        }

        modal.classList.remove('hidden');
    },

    openEditProductModal: function(prodId) {
        this.openCreateProductModal(prodId);
    },

    closeCreateProductModal: function() {
        const modal = document.getElementById('bizCreateProductModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveProduct: function(e) {
        if (e) e.preventDefault();
        const editId = document.getElementById('prodFormEditId')?.value?.trim();
        const warehouseId = document.getElementById('prodFormWarehouse')?.value || 'wh_1';
        const name = document.getElementById('prodFormName')?.value?.trim();
        const categoryId = document.getElementById('prodFormCategory')?.value || '';
        const sku = document.getElementById('prodFormSku')?.value?.trim() || '';
        const costPrice = parseFloat(document.getElementById('prodFormCostPrice')?.value) || 0;
        const salePrice = parseFloat(document.getElementById('prodFormSalePrice')?.value) || 0;
        const stock = Math.max(0, parseInt(document.getElementById('prodFormStock')?.value) || 0);
        const unit = document.getElementById('prodFormUnit')?.value || 'ədəd';
        const minStock = Math.max(0, parseInt(document.getElementById('prodFormMinStock')?.value) || 0);
        const notes = document.getElementById('prodFormDesc')?.value?.trim() || '';

        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === warehouseId);
        const warehouseName = whObj ? whObj.name : 'Əsas anbar';

        let type = 'retail';
        const checkedType = document.querySelector('input[name="prodType"]:checked');
        if (checkedType) type = checkedType.value;

        if (!name) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa məhsulun adını qeyd edin");
            return;
        }

        const categories = this.getProductCategories();
        let finalCategoryId = categoryId;
        if (!finalCategoryId) {
            if (categories.length > 0) {
                finalCategoryId = categories[0].id;
            } else {
                if (typeof App !== 'undefined') App.showToast("Məhsul əlavə etmək üçün əvvəlcə kateqoriya yaradın");
                return;
            }
        }

        let status = 'in_stock';
        if (stock <= 0) status = 'out_of_stock';
        else if (stock <= minStock) status = 'low_stock';

        const activeCtx = this.getActiveContext();
        const branchId = activeCtx.branchId;
        const branchName = activeCtx.branchName;
        const businessName = activeCtx.businessName;

        const products = this.getProducts();

        if (editId) {
            const idx = products.findIndex(p => p.id === editId);
            if (idx !== -1) {
                products[idx] = {
                    ...products[idx],
                    warehouseId,
                    warehouseName,
                    name,
                    type,
                    categoryId: finalCategoryId,
                    sku,
                    costPrice,
                    salePrice,
                    stock,
                    unit,
                    minStock,
                    status,
                    notes,
                    updatedAt: new Date().toISOString()
                };
                if (typeof App !== 'undefined') App.showToast("Məhsul məlumatları yeniləndi");
            }
        } else {
            const newProd = {
                id: 'prod_' + Date.now(),
                warehouseId,
                warehouseName,
                name,
                type,
                categoryId: finalCategoryId,
                sku,
                barcode: '',
                costPrice,
                salePrice,
                stock,
                unit,
                minStock,
                status,
                branchId,
                branchName,
                businessName,
                notes,
                createdAt: new Date().toISOString()
            };
            products.push(newProd);
            if (typeof App !== 'undefined') App.showToast("Yeni məhsul uğurla əlavə edildi!");
        }

        this.saveProducts(products);
        this.closeCreateProductModal();
        this.refreshProductsModule();
    },

    deleteProduct: function(prodId) {
        const products = this.getProducts();
        const prod = products.find(p => p.id === prodId);
        if (!prod) return;

        this.openDeleteConfirmModal({
            title: 'Məhsulu sil',
            message: `<strong>"${prod.name}"</strong> məhsulunu silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const updated = products.filter(p => p.id !== prodId);
                this.saveProducts(updated);
                if (typeof App !== 'undefined') App.showToast("Məhsul silindi");
                this.refreshProductsModule();
            }
        });
    },

    // Product Filter Modal Methods
    openProductFilterModal: function() {
        const modal = document.getElementById('bizProductFilterModal');
        if (!modal) return;

        // Populate category dropdown
        const catSelect = document.getElementById('prodFilterModalCategory');
        if (catSelect) {
            const categories = this.getProductCategories();
            catSelect.innerHTML = `
                <option value="all">Bütün kateqoriyalar</option>
                ${categories.map(c => `
                    <option value="${c.id}" ${this.productCategoryFilter === c.id ? 'selected' : ''}>${c.name}</option>
                `).join('')}
            `;
        }

        // Highlight type and stock buttons
        this.updateFilterModalButtons();
        modal.classList.remove('hidden');
    },

    closeProductFilterModal: function() {
        const modal = document.getElementById('bizProductFilterModal');
        if (modal) modal.classList.add('hidden');
    },

    tempFilterType: null,
    tempFilterStock: null,

    selectProductFilterType: function(type) {
        this.tempFilterType = type;
        this.updateFilterModalButtons();
    },

    selectProductFilterStock: function(status) {
        this.tempFilterStock = status;
        this.updateFilterModalButtons();
    },

    updateFilterModalButtons: function() {
        const curType = this.tempFilterType !== null ? this.tempFilterType : this.productTypeFilter;
        const curStock = this.tempFilterStock !== null ? this.tempFilterStock : this.productStockFilter;

        ['all', 'retail', 'internal'].forEach(t => {
            const btn = document.getElementById(`prodFilterTypeBtn_${t}`);
            if (btn) {
                if (t === curType) {
                    btn.className = "p-2.5 rounded-xl border-2 border-slate-900 bg-white text-slate-900 font-bold flex flex-col items-center justify-center gap-1 transition text-center shadow-xs cursor-pointer";
                } else {
                    btn.className = "p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer";
                }
            }
        });

        ['all', 'in_stock', 'low_stock', 'out_of_stock'].forEach(s => {
            const btn = document.getElementById(`prodFilterStockBtn_${s}`);
            if (btn) {
                if (s === curStock) {
                    btn.className = "p-2.5 rounded-xl border-2 border-slate-900 bg-white text-slate-900 font-bold flex flex-col items-center justify-center gap-1 transition text-center shadow-xs cursor-pointer";
                } else {
                    btn.className = "p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer";
                }
            }
        });
    },

    applyProductFilterModal: function() {
        if (this.tempFilterType !== null) {
            this.productTypeFilter = this.tempFilterType;
            this.tempFilterType = null;
        }
        if (this.tempFilterStock !== null) {
            this.productStockFilter = this.tempFilterStock;
            this.tempFilterStock = null;
        }
        const catSelect = document.getElementById('prodFilterModalCategory');
        if (catSelect) {
            this.productCategoryFilter = catSelect.value;
        }
        this.closeProductFilterModal();
        this.refreshProductsModule();
    },

    // ==========================================
    // SUPPLIERS DATA & MODAL METHODS
    // ==========================================
    getSuppliers: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_suppliers_v1'));
        if (stored) {
            try {
                const list = JSON.parse(stored);
                if (Array.isArray(list) && list.length > 0) return list;
            } catch (e) {
                console.error("Error parsing suppliers", e);
            }
        }
        const defaults = this.getDefaultSuppliers();
        this.saveSuppliers(defaults);
        return defaults;
    },

    saveSuppliers: function(list) {
        localStorage.setItem(this.storageKey('zeyvo_business_suppliers_v1'), JSON.stringify(list));
    },

    getDefaultSuppliers: function() {
        return [
            {
                id: 'sup_1',
                name: 'Beauty Trade MMC',
                contactPerson: 'Emin Məmmədov',
                phone: '+994 50 211 44 55',
                email: 'orders@beautytrade.az',
                voen: '1402847291',
                address: 'Bakı ş., Nərimanov r-nu, Əhməd Rəcəbli 19',
                notes: "L'Oréal, Matrix və Kérastase rəsmi distribütoru",
                status: 'active'
            },
            {
                id: 'sup_2',
                name: "L'Oréal Azerbaijan MMC",
                contactPerson: 'Leyla Babayeva',
                phone: '+994 12 498 70 80',
                email: 'supply@loreal.az',
                voen: '9900012341',
                address: 'Bakı ş., Səbail r-nu, Nizami küç. 203',
                notes: 'Birbaşa korporativ təchizat müqaviləsi',
                status: 'active'
            },
            {
                id: 'sup_3',
                name: 'Wella Professionals Baku',
                contactPerson: 'Kamran Əliyev',
                phone: '+994 55 330 12 34',
                email: 'baku@wellaprof.com',
                voen: '2001928371',
                address: 'Bakı ş., Xocalı pr. 11',
                notes: 'Saç boyaları və salon qulluq vasitələri',
                status: 'active'
            },
            {
                id: 'sup_4',
                name: 'Estel Professional',
                contactPerson: 'Nərgiz Rüstəmova',
                phone: '+994 50 710 99 88',
                email: 'info@estel.az',
                voen: '1500392811',
                address: 'Bakı ş., C. Məmmədquluzadə 102',
                notes: 'Oksidantlar, texniki vasitələr və aksesuarlar',
                status: 'active'
            }
        ];
    },

    supplierModalCallerQuick: false,

    openCreateSupplierModal: function(editId = null, isQuick = false) {
        this.supplierModalCallerQuick = !!isQuick;
        const modal = document.getElementById('bizCreateSupplierModal');
        if (!modal) return;

        const editIdInput = document.getElementById('supplierFormEditId');
        const nameInput = document.getElementById('supplierFormName');
        const contactInput = document.getElementById('supplierFormContact');
        const phoneInput = document.getElementById('supplierFormPhone');
        const emailInput = document.getElementById('supplierFormEmail');
        const voenInput = document.getElementById('supplierFormVoen');
        const addressInput = document.getElementById('supplierFormAddress');
        const notesInput = document.getElementById('supplierFormNotes');
        const titleEl = document.getElementById('supplierModalTitle');
        const submitBtn = document.getElementById('supplierModalSubmitBtn');

        if (editId) {
            const list = this.getSuppliers();
            const s = list.find(x => x.id === editId);
            if (s) {
                if (editIdInput) editIdInput.value = s.id;
                if (nameInput) nameInput.value = s.name || '';
                if (contactInput) contactInput.value = s.contactPerson || '';
                if (phoneInput) {
                    let cleanPhone = (s.phone || '').replace('+994', '').trim();
                    phoneInput.value = cleanPhone;
                    if (typeof App !== 'undefined' && App.formatAzPhone) App.formatAzPhone(phoneInput);
                }
                if (emailInput) emailInput.value = s.email || '';
                if (voenInput) voenInput.value = s.voen || '';
                if (addressInput) addressInput.value = s.address || '';
                if (notesInput) notesInput.value = s.notes || '';
                if (titleEl) titleEl.textContent = 'Təchizatçını redaktə et';
                if (submitBtn) submitBtn.textContent = 'Yadda saxla';
            }
        } else {
            if (editIdInput) editIdInput.value = '';
            if (nameInput) nameInput.value = '';
            if (contactInput) contactInput.value = '';
            if (phoneInput) phoneInput.value = '';
            if (emailInput) emailInput.value = '';
            if (voenInput) voenInput.value = '';
            if (addressInput) addressInput.value = '';
            if (notesInput) notesInput.value = '';
            if (titleEl) titleEl.textContent = 'Yeni təchizatçı əlavə et';
            if (submitBtn) submitBtn.textContent = 'Təchizatçını saxla';
        }

        modal.classList.remove('hidden');
        if (nameInput) setTimeout(() => nameInput.focus(), 50);
    },

    closeCreateSupplierModal: function() {
        const modal = document.getElementById('bizCreateSupplierModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveSupplier: function(e) {
        if (e) e.preventDefault();
        const editId = document.getElementById('supplierFormEditId')?.value;
        const name = document.getElementById('supplierFormName')?.value?.trim();
        const contactPerson = document.getElementById('supplierFormContact')?.value?.trim() || '';
        const rawPhone = document.getElementById('supplierFormPhone')?.value?.trim() || '';
        let phone = '';
        if (rawPhone) {
            phone = rawPhone.startsWith('+994') ? rawPhone : `+994 ${rawPhone}`;
        }
        const email = document.getElementById('supplierFormEmail')?.value?.trim() || '';
        const voen = document.getElementById('supplierFormVoen')?.value?.trim() || '';
        const address = document.getElementById('supplierFormAddress')?.value?.trim() || '';
        const notes = document.getElementById('supplierFormNotes')?.value?.trim() || '';

        if (!name) {
            this.showToast('Zəhmət olmasa təchizatçının adını qeyd edin');
            return;
        }

        const suppliers = this.getSuppliers();
        let targetSupplierName = name;

        if (editId) {
            const idx = suppliers.findIndex(x => x.id === editId);
            if (idx !== -1) {
                suppliers[idx] = {
                    ...suppliers[idx],
                    name,
                    contactPerson,
                    phone,
                    email,
                    voen,
                    address,
                    notes,
                    updatedAt: new Date().toISOString()
                };
            }
        } else {
            const newId = 'sup_' + Date.now();
            suppliers.push({
                id: newId,
                name,
                contactPerson,
                phone,
                email,
                voen,
                address,
                notes,
                status: 'active',
                createdAt: new Date().toISOString()
            });
        }

        this.saveSuppliers(suppliers);
        this.closeCreateSupplierModal();

        // If called from create operation modal quick button
        if (this.supplierModalCallerQuick) {
            this.populateOpSupplierOptions(this.selectedOpType || 'inflow', targetSupplierName);
        }

        // If currently on suppliers tab, refresh
        this.refreshSuppliersSection();
        this.renderCanvas(); // updates badge counts
    },

    deleteSupplier: function(id) {
        const suppliers = this.getSuppliers();
        const s = suppliers.find(x => x.id === id);
        if (!s) return;

        const operations = this.getInventoryOperations();
        const sName = (s.name || '').trim().toLowerCase();
        const opsCount = operations.filter(o => {
            const oSup = (o.supplier || '').trim().toLowerCase();
            return (oSup && oSup === sName) || (o.supplierId && o.supplierId === s.id);
        }).length;

        const msg = opsCount > 0
            ? `<strong>"${s.name}"</strong> təchizatçısını silmək istədiyinizə əminsiniz?<br><span class="text-amber-600 mt-1.5 inline-block text-xs">Bu təchizatçıya bağlı <strong>${opsCount} ədəd</strong> mədaxil sənədi mövcuddur.</span>`
            : `<strong>"${s.name}"</strong> təchizatçısını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`;

        this.openDeleteConfirmModal({
            title: 'Təchizatçını sil',
            message: msg,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const updated = suppliers.filter(x => x.id !== id);
                this.saveSuppliers(updated);
                if (typeof App !== 'undefined') App.showToast('Təchizatçı silindi!');
                this.refreshSuppliersSection();
                this.renderCanvas();
            }
        });
    },

    openCreateOperationModalWithSupplier: function(supplierName) {
        this.openCreateOperationModal('inflow', supplierName);
    },

    // ==========================================
    // WAREHOUSES DATA & MODAL METHODS
    // ==========================================
    getWarehouses: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_warehouses_v1'));
        if (stored) {
            try {
                const list = JSON.parse(stored);
                if (Array.isArray(list) && list.length > 0) return list;
            } catch (e) {
                console.error("Error parsing warehouses", e);
            }
        }
        const defaults = this.getDefaultWarehouses();
        this.saveWarehouses(defaults);
        return defaults;
    },

    saveWarehouses: function(list) {
        localStorage.setItem(this.storageKey('zeyvo_business_warehouses_v1'), JSON.stringify(list));
    },

    getDefaultWarehouses: function() {
        return [
            { id: 'wh_1', name: 'Əsas anbar', type: 'main', typeName: 'Mərkəzi anbar', address: 'Nizami küç. 142', responsible: 'Rauf Əliyev', notes: 'Mərkəzi təchizat və qəbul anbarı', isDefault: true },
            { id: 'wh_2', name: 'Kabinet və vitrin anbarı', type: 'cabinet', typeName: 'Kabinet vitrini', address: 'Gənclik filialı, 2-ci mərtəbə', responsible: 'Aysel Qasımova', notes: 'Usta və mütəxəssislərin gündəlik sərfiyyatı üçün', isDefault: false },
            { id: 'wh_3', name: 'Gənclik filial anbarı', type: 'branch', typeName: 'Filial anbarı', address: 'Atatürk pr. 45', responsible: 'Samir Kərimov', notes: 'Gənclik filialının ehtiyat anbarı', isDefault: false }
        ];
    },

    openCreateWarehouseModal: function(editId) {
        const modal = document.getElementById('bizCreateWarehouseModal');
        if (!modal) return;

        const editIdInput = document.getElementById('warehouseFormEditId');
        const nameInput = document.getElementById('warehouseFormName');
        const respInput = document.getElementById('warehouseFormResponsible');
        const addrInput = document.getElementById('warehouseFormAddress');
        const notesInput = document.getElementById('warehouseFormNotes');
        const titleEl = document.getElementById('warehouseModalTitle');
        const submitBtn = document.getElementById('warehouseModalSubmitBtn');

        if (editId) {
            const warehouses = this.getWarehouses();
            const wh = warehouses.find(w => w.id === editId);
            if (wh) {
                if (editIdInput) editIdInput.value = wh.id;
                if (nameInput) nameInput.value = wh.name || '';
                if (respInput) respInput.value = wh.responsible || '';
                if (addrInput) addrInput.value = wh.address || '';
                if (notesInput) notesInput.value = wh.notes || '';
                if (titleEl) titleEl.textContent = "Anbarı redaktə et";
                if (submitBtn) submitBtn.textContent = "Dəyişiklikləri saxla";
            }
        } else {
            if (editIdInput) editIdInput.value = '';
            if (nameInput) nameInput.value = '';
            if (respInput) respInput.value = '';
            if (addrInput) addrInput.value = '';
            if (notesInput) notesInput.value = '';
            if (titleEl) titleEl.textContent = "Yeni anbar əlavə et";
            if (submitBtn) submitBtn.textContent = "Anbarı saxla";
        }

        modal.classList.remove('hidden');
    },

    closeCreateWarehouseModal: function() {
        const modal = document.getElementById('bizCreateWarehouseModal');
        if (modal) modal.classList.add('hidden');
    },

    handleSaveWarehouse: function(e) {
        if (e) e.preventDefault();
        const editId = document.getElementById('warehouseFormEditId')?.value?.trim();
        const name = document.getElementById('warehouseFormName')?.value?.trim();
        const responsible = document.getElementById('warehouseFormResponsible')?.value?.trim() || '';
        const address = document.getElementById('warehouseFormAddress')?.value?.trim() || '';
        const notes = document.getElementById('warehouseFormNotes')?.value?.trim() || '';

        if (!name) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa anbarın adını daxil edin");
            return;
        }

        const warehouses = this.getWarehouses();

        if (editId) {
            const idx = warehouses.findIndex(w => w.id === editId);
            if (idx !== -1) {
                warehouses[idx] = {
                    ...warehouses[idx],
                    name,
                    responsible,
                    address,
                    notes,
                    updatedAt: new Date().toISOString()
                };
                if (typeof App !== 'undefined') App.showToast("Anbar məlumatları yeniləndi");
            }
        } else {
            const newWh = {
                id: 'wh_' + Date.now(),
                name,
                type: 'branch',
                typeName: 'Filial anbarı',
                responsible,
                address,
                notes,
                isDefault: false,
                createdAt: new Date().toISOString()
            };
            warehouses.push(newWh);
            if (typeof App !== 'undefined') App.showToast("Yeni anbar uğurla əlavə edildi");
        }

        this.saveWarehouses(warehouses);
        this.closeCreateWarehouseModal();
        this.refreshProductsModule();
    },

    deleteWarehouse: function(whId) {
        const warehouses = this.getWarehouses();
        const wh = warehouses.find(w => w.id === whId);
        if (!wh) return;

        if (wh.isDefault) {
            if (typeof App !== 'undefined') App.showToast("Əsas anbar silinə bilməz");
            return;
        }

        this.openDeleteConfirmModal({
            title: 'Anbarı sil',
            message: `<strong>"${wh.name}"</strong> anbarını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const updated = warehouses.filter(w => w.id !== whId);
                this.saveWarehouses(updated);
                if (typeof App !== 'undefined') App.showToast("Anbar silindi");
                this.refreshProductsModule();
            }
        });
    },

    // ==========================================
    // TECH CARDS DATA & MODAL METHODS
    // ==========================================
    getTechCards: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_tech_cards_v1'));
        if (stored) {
            try {
                const list = JSON.parse(stored);
                if (Array.isArray(list) && list.length > 0) return list;
            } catch (e) {
                console.error("Error parsing tech cards", e);
            }
        }
        const defaults = this.getDefaultTechCards();
        this.saveTechCards(defaults);
        return defaults;
    },

    saveTechCards: function(list) {
        localStorage.setItem(this.storageKey('zeyvo_business_tech_cards_v1'), JSON.stringify(list));
    },

    getDefaultTechCards: function() {
        return [
            {
                id: 'tc_1',
                name: 'Saç boyama və rəngləmə',
                serviceName: 'Saç boyama və tonlaşdırma',
                notes: 'Standart orta uzunluqlu saçlar üçün xidmət sərfiyyat norması.',
                totalCost: 12.65,
                ingredients: [
                    { productId: 'prod_1', productName: "L'Oréal Professionnel Şampun", qty: 25, unit: 'ml', costPerUnit: 0.05, totalCost: 1.25 },
                    { productId: 'prod_3', productName: 'Saç boyası (Qara / Təbii)', qty: 60, unit: 'ml', costPerUnit: 0.15, totalCost: 9.00 },
                    { productId: 'prod_4', productName: 'Oksidləşdirici krem 6%', qty: 60, unit: 'ml', costPerUnit: 0.04, totalCost: 2.40 }
                ]
            },
            {
                id: 'tc_2',
                name: 'Üz pilinqi və dərinin təmizlənməsi',
                serviceName: 'Dərinin dərindən təmizlənməsi',
                notes: 'Kosmetoloji prosedur üçün birdəfəlik norma.',
                totalCost: 1.38,
                ingredients: [
                    { productId: 'prod_5', productName: 'Antiseptik dəri losyonu', qty: 15, unit: 'ml', costPerUnit: 0.06, totalCost: 0.90 },
                    { productId: 'prod_2', productName: 'Birdəfəlik qoruyucu salfetlər', qty: 4, unit: 'ədəd', costPerUnit: 0.12, totalCost: 0.48 }
                ]
            },
            {
                id: 'tc_3',
                name: 'Diş ağardılması proseduru',
                serviceName: 'Lazerlə diş ağardılması',
                notes: 'Həkim-stomatoloq kabineti üçün standart sərfiyyat norması.',
                totalCost: 12.24,
                ingredients: [
                    { productId: 'prod_6', productName: 'Ağardıcı gel konsentratı', qty: 5, unit: 'ml', costPerUnit: 2.40, totalCost: 12.00 },
                    { productId: 'prod_2', productName: 'Birdəfəlik qoruyucu salfetlər', qty: 2, unit: 'ədəd', costPerUnit: 0.12, totalCost: 0.24 }
                ]
            }
        ];
    },

    techCardIngredients: [],
    tcServicePickerCategory: 'all',
    tcServicePickerSearchQuery: '',
    tcProductPickerSelectedMap: {},
    tcProductPickerSearchQuery: '',

    getSalonServices: function() {
        if (this._salonServicesCache) return this._salonServicesCache;
        const list = [
            { id: 'srv_1', name: 'Saç boyanması və stilləşdirmə', category: 'Saç', duration: '90 dəq', price: 65.00 },
            { id: 'srv_2', name: 'Saç kəsimi və ukladka', category: 'Saç', duration: '45 dəq', price: 35.00 },
            { id: 'srv_3', name: 'Saç laminasiyası və bərpa', category: 'Saç', duration: '75 dəq', price: 80.00 },
            { id: 'srv_4', name: 'Keratin saç düzləşdirilməsi', category: 'Saç', duration: '120 dəq', price: 110.00 },
            { id: 'srv_5', name: 'Kişi saç və saqqal kəsimi', category: 'Bərbər', duration: '40 dəq', price: 30.00 },
            { id: 'srv_6', name: 'Aparat manikürü və shellac', category: 'Dırnaq', duration: '60 dəq', price: 40.00 },
            { id: 'srv_7', name: 'Klassik pedikür və daban baxımı', category: 'Dırnaq', duration: '60 dəq', price: 45.00 },
            { id: 'srv_8', name: 'Dırnaq qaynağı (gel/akril)', category: 'Dırnaq', duration: '90 dəq', price: 70.00 },
            { id: 'srv_9', name: 'Qaş memarlığı və laminasiya', category: 'Qaş & Kirpik', duration: '40 dəq', price: 25.00 },
            { id: 'srv_10', name: 'Kirpik laminasiyası və botoks', category: 'Qaş & Kirpik', duration: '60 dəq', price: 45.00 },
            { id: 'srv_11', name: 'Dərinin dərindən təmizlənməsi', category: 'Kosmetologiya', duration: '60 dəq', price: 55.00 },
            { id: 'srv_12', name: 'Biorevitalizasiya və mezoterapiya', category: 'Kosmetologiya', duration: '45 dəq', price: 85.00 },
            { id: 'srv_13', name: 'Lazerlə diş ağardılması', category: 'Stomatologiya', duration: '45 dəq', price: 150.00 },
            { id: 'srv_14', name: 'Diş daşlarının təmizlənməsi (AirFlow)', category: 'Stomatologiya', duration: '40 dəq', price: 60.00 }
        ];

        if (typeof ZeyvoData !== 'undefined' && Array.isArray(ZeyvoData.salons)) {
            ZeyvoData.salons.forEach(s => {
                if (Array.isArray(s.services)) {
                    s.services.forEach(item => {
                        if (!list.some(d => d.name.toLowerCase() === item.name.toLowerCase())) {
                            list.push({
                                id: 'srv_' + (item.id || Math.random().toString(36).substr(2, 5)),
                                name: item.name,
                                category: s.tag || 'Gözəllik',
                                duration: item.duration || '45 dəq',
                                price: item.price || 30
                            });
                        }
                    });
                }
            });
        }
        this._salonServicesCache = list;
        return list;
    },

    openCreateTechCardModal: function(editId) {
        const modal = document.getElementById('bizCreateTechCardModal');
        if (!modal) return;

        const editIdInput = document.getElementById('techCardFormEditId');
        const nameInput = document.getElementById('techCardFormName');
        const srvHidden = document.getElementById('techCardFormService');
        const srvText = document.getElementById('techCardSelectedServiceText');
        const clearSrvBtn = document.getElementById('techCardClearServiceBtn');
        const notesInput = document.getElementById('techCardFormNotes');
        const titleEl = document.getElementById('techCardModalTitle');
        const submitBtn = document.getElementById('techCardModalSubmitBtn');

        this.techCardIngredients = [];

        const whSelect = document.getElementById('techCardFormWarehouse');
        if (whSelect) {
            const warehouses = this.getWarehouses();
            whSelect.innerHTML = warehouses.map(w => `<option value="${w.id}">${w.name} (${w.typeName || 'Anbar'})</option>`).join('');
            whSelect.value = warehouses[0]?.id || 'wh_1';
        }

        if (editId) {
            const cards = this.getTechCards();
            const tc = cards.find(c => c.id === editId);
            if (tc) {
                if (editIdInput) editIdInput.value = tc.id;
                if (nameInput) nameInput.value = tc.name || '';
                if (srvHidden) srvHidden.value = tc.serviceName || '';
                if (whSelect && tc.warehouseId) whSelect.value = tc.warehouseId;
                if (srvText) {
                    srvText.textContent = tc.serviceName || 'Kataloqdan xidmət seçin...';
                    srvText.className = tc.serviceName ? 'text-xs font-bold text-slate-900 truncate' : 'text-xs font-semibold text-slate-400 truncate';
                }
                if (clearSrvBtn) {
                    if (tc.serviceName) clearSrvBtn.classList.remove('hidden');
                    else clearSrvBtn.classList.add('hidden');
                }
                if (notesInput) notesInput.value = tc.notes || '';
                if (titleEl) titleEl.textContent = "Texnoloji kartı redaktə et";
                if (submitBtn) submitBtn.textContent = "Dəyişiklikləri saxla";

                if (Array.isArray(tc.ingredients) && tc.ingredients.length > 0) {
                    this.techCardIngredients = tc.ingredients.map(ing => ({ ...ing }));
                }
            }
        } else {
            if (editIdInput) editIdInput.value = '';
            if (nameInput) nameInput.value = '';
            if (srvHidden) srvHidden.value = '';
            if (srvText) {
                srvText.textContent = 'Kataloqdan xidmət seçin...';
                srvText.className = 'text-xs font-semibold text-slate-400 truncate';
            }
            if (clearSrvBtn) clearSrvBtn.classList.add('hidden');
            if (notesInput) notesInput.value = '';
            if (titleEl) titleEl.textContent = "Yeni texnoloji kart";
            if (submitBtn) submitBtn.textContent = "Kartı saxla";
        }

        this.renderTechCardIngredientsTable();
        modal.classList.remove('hidden');
    },

    onTechCardWarehouseChange: function(whId) {
        this.tcProductPickerWarehouseId = whId;
    },

    closeCreateTechCardModal: function() {
        const modal = document.getElementById('bizCreateTechCardModal');
        if (modal) modal.classList.add('hidden');
        this.closeTechCardServicePickerModal();
        this.closeTechCardProductPickerModal();
    },

    renderTechCardIngredientsTable: function() {
        const container = document.getElementById('techCardIngredientsContainer');
        if (!container) return;

        if (!this.techCardIngredients || this.techCardIngredients.length === 0) {
            container.innerHTML = `
                <div class="p-6 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 space-y-2">
                    <div class="w-10 h-10 mx-auto rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    </div>
                    <div class="text-xs font-bold text-slate-800">Sərfiyyat materialı əlavə edilməyib</div>
                    <p class="text-[11px] text-slate-400">Xidmət zamanı istifadə olunan boya, preparat, şampun və ya birdəfəlik vasitələri əlavə edin</p>
                    <div class="pt-1">
                        <button type="button" onclick="BusinessDashboardView.openTechCardProductPickerModal()" class="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-900 font-bold text-xs text-slate-800 transition shadow-2xs active:scale-95 cursor-pointer">
                            + Məhsul seç
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        const totalCost = this.techCardIngredients.reduce((sum, item) => sum + (parseFloat(item.totalCost) || 0), 0);

        container.innerHTML = `
            <div class="rounded-2xl border border-slate-200/80 bg-white overflow-hidden divide-y divide-slate-100 shadow-2xs">
                ${this.techCardIngredients.map((item, idx) => `
                    <div class="p-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition">
                        <div class="min-w-0 flex-1">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="font-bold text-xs text-slate-900 truncate">${item.productName}</span>
                                <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium flex items-center gap-1 shrink-0">
                                    <svg class="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                    <span>${item.warehouseName || 'Əsas anbar'}</span>
                                </span>
                            </div>
                            <div class="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                                <span>Maya dəyəri: <strong>${(item.costPerUnit || 0).toFixed(2)} ₼</strong> / ${item.unit || 'ədəd'}</span>
                                <span>•</span>
                                <span class="text-amber-800 font-bold">Cəmi: ${(item.totalCost || (item.qty * item.costPerUnit)).toFixed(2)} ₼</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <div class="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden h-8">
                                <button type="button" onclick="BusinessDashboardView.changeTechCardIngredientQty(${idx}, -1)" class="w-7 h-full flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-200 transition font-bold cursor-pointer">-</button>
                                <input type="number" step="any" min="0.01" value="${item.qty}" onchange="BusinessDashboardView.setTechCardIngredientQty(${idx}, this.value)" class="w-14 h-full text-center text-xs font-bold bg-transparent outline-none text-slate-900">
                                <button type="button" onclick="BusinessDashboardView.changeTechCardIngredientQty(${idx}, 1)" class="w-7 h-full flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-200 transition font-bold cursor-pointer">+</button>
                            </div>
                            <span class="text-[11px] font-semibold text-slate-500 w-10 text-center truncate">${item.unit || 'ədəd'}</span>
                            <button type="button" onclick="BusinessDashboardView.removeTechCardIngredient(${idx})" class="w-8 h-8 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer" title="Sil">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Total Cost Summary -->
            <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-[#FFDD2D] text-[#101114] flex items-center justify-center font-bold text-[11px]">
                        ${this.techCardIngredients.length}
                    </span>
                    <span class="font-bold text-amber-950">Xidmət üzrə materialların cəmi maya dəyəri:</span>
                </div>
                <span class="font-black text-amber-950 text-sm font-mono">${totalCost.toFixed(2)} ₼</span>
            </div>
        `;
    },

    changeTechCardIngredientQty: function(idx, delta) {
        if (!this.techCardIngredients || !this.techCardIngredients[idx]) return;
        const cur = parseFloat(this.techCardIngredients[idx].qty) || 1;
        const next = Math.max(0.01, parseFloat((cur + delta).toFixed(2)));
        this.techCardIngredients[idx].qty = next;
        this.techCardIngredients[idx].totalCost = parseFloat((next * (this.techCardIngredients[idx].costPerUnit || 0)).toFixed(2));
        this.renderTechCardIngredientsTable();
    },

    setTechCardIngredientQty: function(idx, val) {
        if (!this.techCardIngredients || !this.techCardIngredients[idx]) return;
        const next = Math.max(0.01, parseFloat(val) || 1);
        this.techCardIngredients[idx].qty = next;
        this.techCardIngredients[idx].totalCost = parseFloat((next * (this.techCardIngredients[idx].costPerUnit || 0)).toFixed(2));
        this.renderTechCardIngredientsTable();
    },

    removeTechCardIngredient: function(idx) {
        if (!this.techCardIngredients) return;
        this.techCardIngredients.splice(idx, 1);
        this.renderTechCardIngredientsTable();
    },

    // ==========================================
    // TECH CARD: SERVICE PICKER MODAL METHODS
    // ==========================================
    openTechCardServicePickerModal: function() {
        const modal = document.getElementById('bizTechCardServicePickerModal');
        if (!modal) return;

        this.tcServicePickerSearchQuery = '';
        this.tcServicePickerCategory = 'all';

        const searchInput = document.getElementById('tcServicePickerSearchInput');
        if (searchInput) searchInput.value = '';

        this.renderTcServicePickerList();
        modal.classList.remove('hidden');
    },

    closeTechCardServicePickerModal: function() {
        const modal = document.getElementById('bizTechCardServicePickerModal');
        if (modal) modal.classList.add('hidden');
    },

    onTcServicePickerSearch: function(val) {
        this.tcServicePickerSearchQuery = (val || '').toLowerCase().trim();
        this.renderTcServicePickerList();
    },

    setTcServiceCategory: function(cat) {
        this.tcServicePickerCategory = cat || 'all';
        this.renderTcServicePickerList();
    },

    renderTcServicePickerList: function() {
        const container = document.getElementById('tcServiceListContainer');
        const pillsContainer = document.getElementById('tcServiceCategoryPills');
        const countHint = document.getElementById('tcServiceCountHint');
        if (!container) return;

        const allServices = this.getSalonServices();

        // Extract categories
        const categories = ['all'];
        allServices.forEach(s => {
            const cat = s.category || 'Digər';
            if (!categories.includes(cat)) categories.push(cat);
        });

        // Render category filter pills
        if (pillsContainer) {
            pillsContainer.innerHTML = categories.map(cat => {
                const isSelected = this.tcServicePickerCategory === cat;
                const label = cat === 'all' ? 'Bütün xidmətlər' : cat;
                return `
                    <button type="button" onclick="BusinessDashboardView.setTcServiceCategory('${cat}')" class="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${isSelected ? 'bg-slate-900 text-white shadow-2xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
                        ${label}
                    </button>
                `;
            }).join('');
        }

        // Filter services
        let filtered = allServices;
        if (this.tcServicePickerCategory !== 'all') {
            filtered = filtered.filter(s => (s.category || 'Digər') === this.tcServicePickerCategory);
        }
        if (this.tcServicePickerSearchQuery) {
            const q = this.tcServicePickerSearchQuery;
            filtered = filtered.filter(s => (s.name || '').toLowerCase().includes(q) || (s.category || '').toLowerCase().includes(q));
        }

        if (countHint) {
            countHint.textContent = `${filtered.length} xidmət tapıldı`;
        }

        const currentServiceName = document.getElementById('techCardFormService')?.value || '';

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center text-slate-400 space-y-1">
                    <svg class="w-8 h-8 mx-auto text-slate-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <div class="font-bold text-xs text-slate-700">Axtarışa uyğun xidmət tapılmadı</div>
                    <div class="text-[11px]">Başqa açar söz daxil edin</div>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(s => {
            const isSelected = currentServiceName && currentServiceName.toLowerCase() === s.name.toLowerCase();
            return `
                <div onclick="BusinessDashboardView.selectTechCardService('${s.id}')" class="p-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-amber-50/50 transition cursor-pointer ${isSelected ? 'bg-amber-50/70 border-l-4 border-[#FFDD2D]' : ''}">
                    <div class="flex items-center gap-3 min-w-0">
                        <div class="w-9 h-9 rounded-xl ${isSelected ? 'bg-[#FFDD2D] text-[#101114]' : 'bg-slate-100 text-slate-700'} flex items-center justify-center shrink-0">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        </div>
                        <div class="min-w-0">
                            <div class="font-bold text-xs text-slate-900 truncate">${s.name}</div>
                            <div class="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                                <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">${s.category || 'Xidmət'}</span>
                                <span>•</span>
                                <span>${s.duration || '45 dəq'}</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2.5 shrink-0">
                        <span class="font-mono font-bold text-xs text-slate-900">${(parseFloat(s.price) || 0).toFixed(2)} ₼</span>
                        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-[#FFDD2D] text-slate-800 hover:text-black'}">
                            ${isSelected ? 'Seçildi' : 'Seç'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    selectTechCardService: function(serviceId) {
        const allServices = this.getSalonServices();
        const s = allServices.find(x => x.id === serviceId);
        if (!s) return;

        const srvHidden = document.getElementById('techCardFormService');
        const srvText = document.getElementById('techCardSelectedServiceText');
        const clearBtn = document.getElementById('techCardClearServiceBtn');
        const nameInput = document.getElementById('techCardFormName');

        if (srvHidden) srvHidden.value = s.name;
        if (srvText) {
            srvText.textContent = s.name;
            srvText.className = 'text-xs font-bold text-slate-900 truncate';
        }
        if (clearBtn) clearBtn.classList.remove('hidden');

        // Suggest name if currently empty
        if (nameInput && !nameInput.value.trim()) {
            nameInput.value = `${s.name} (sərfiyyat norması)`;
        }

        this.closeTechCardServicePickerModal();
    },

    clearTechCardService: function() {
        const srvHidden = document.getElementById('techCardFormService');
        const srvText = document.getElementById('techCardSelectedServiceText');
        const clearBtn = document.getElementById('techCardClearServiceBtn');

        if (srvHidden) srvHidden.value = '';
        if (srvText) {
            srvText.textContent = 'Kataloqdan xidmət seçin...';
            srvText.className = 'text-xs font-semibold text-slate-400 truncate';
        }
        if (clearBtn) clearBtn.classList.add('hidden');
    },

    // ==========================================
    // TECH CARD: PRODUCT PICKER MODAL METHODS
    // ==========================================
    tcProductPickerWarehouseId: 'all',

    openTechCardProductPickerModal: function() {
        const modal = document.getElementById('bizTechCardProductPickerModal');
        if (!modal) return;

        const tcWhSelect = document.getElementById('techCardFormWarehouse');
        const defaultWhId = tcWhSelect ? tcWhSelect.value : 'wh_1';
        this.tcProductPickerWarehouseId = defaultWhId || 'wh_1';

        // Populate warehouse selector in picker
        const pickerWhSelect = document.getElementById('tcProductPickerWarehouseSelect');
        if (pickerWhSelect) {
            const warehouses = this.getWarehouses();
            pickerWhSelect.innerHTML = `
                <option value="all">Bütün anbarlar üzrə</option>
                ${warehouses.map(w => `<option value="${w.id}">${w.name} (${w.typeName || 'Anbar'})</option>`).join('')}
            `;
            pickerWhSelect.value = this.tcProductPickerWarehouseId;
        }

        this.tcProductPickerSearchQuery = '';
        const searchInput = document.getElementById('tcProductPickerSearchInput');
        if (searchInput) searchInput.value = '';

        // Pre-fill selection map from existing techCardIngredients
        this.tcProductPickerSelectedMap = {};
        if (Array.isArray(this.techCardIngredients)) {
            this.techCardIngredients.forEach(ing => {
                this.tcProductPickerSelectedMap[ing.productId] = {
                    qty: ing.qty || 1,
                    cost: ing.costPerUnit || 0,
                    unit: ing.unit || 'ədəd',
                    warehouseId: ing.warehouseId || 'wh_1',
                    warehouseName: ing.warehouseName || 'Əsas anbar'
                };
            });
        }

        this.renderTcProductPickerList();
        modal.classList.remove('hidden');
    },

    closeTechCardProductPickerModal: function() {
        const modal = document.getElementById('bizTechCardProductPickerModal');
        if (modal) modal.classList.add('hidden');
    },

    onTcProductPickerWarehouseChange: function(whId) {
        this.tcProductPickerWarehouseId = whId || 'all';
        this.renderTcProductPickerList();
    },

    onTcProductPickerSearch: function(val) {
        this.tcProductPickerSearchQuery = (val || '').toLowerCase().trim();
        this.renderTcProductPickerList();
    },

    toggleTcProductPickerSelectAll: function(selectAll) {
        const products = this.getProducts();
        const warehouses = this.getWarehouses();
        let targetProducts = products;
        if (this.tcProductPickerWarehouseId && this.tcProductPickerWarehouseId !== 'all') {
            targetProducts = targetProducts.filter(p => (p.warehouseId || 'wh_1') === this.tcProductPickerWarehouseId);
        }

        if (selectAll) {
            targetProducts.forEach(p => {
                if (!this.tcProductPickerSelectedMap[p.id]) {
                    const pWhId = p.warehouseId || this.tcProductPickerWarehouseId || 'wh_1';
                    const whObj = warehouses.find(w => w.id === pWhId);
                    this.tcProductPickerSelectedMap[p.id] = {
                        qty: 1,
                        cost: parseFloat(p.costPrice) || 0,
                        unit: p.unit || 'ədəd',
                        warehouseId: pWhId,
                        warehouseName: whObj ? whObj.name : 'Əsas anbar'
                    };
                }
            });
        } else {
            this.tcProductPickerSelectedMap = {};
        }
        this.renderTcProductPickerList();
    },

    toggleTcProductPickerItem: function(prodId, isChecked) {
        if (isChecked) {
            if (!this.tcProductPickerSelectedMap[prodId]) {
                const p = this.getProducts().find(x => x.id === prodId);
                const warehouses = this.getWarehouses();
                const pWhId = p ? (p.warehouseId || 'wh_1') : (this.tcProductPickerWarehouseId || 'wh_1');
                const whObj = warehouses.find(w => w.id === pWhId);
                this.tcProductPickerSelectedMap[prodId] = {
                    qty: 1,
                    cost: p ? (parseFloat(p.costPrice) || 0) : 0,
                    unit: p ? (p.unit || 'ədəd') : 'ədəd',
                    warehouseId: pWhId,
                    warehouseName: whObj ? whObj.name : 'Əsas anbar'
                };
            }
        } else {
            delete this.tcProductPickerSelectedMap[prodId];
        }
        this.renderTcProductPickerList();
    },

    changeTcProductPickerRowQty: function(prodId, delta, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (!this.tcProductPickerSelectedMap[prodId]) {
            this.toggleTcProductPickerItem(prodId, true);
        }
        const cur = parseFloat(this.tcProductPickerSelectedMap[prodId]?.qty) || 1;
        const next = Math.max(0.01, parseFloat((cur + delta).toFixed(2)));
        this.tcProductPickerSelectedMap[prodId].qty = next;
        this.renderTcProductPickerList();
    },

    updateTcProductPickerRowQty: function(prodId, val) {
        if (!this.tcProductPickerSelectedMap[prodId]) return;
        const next = Math.max(0.01, parseFloat(val) || 1);
        this.tcProductPickerSelectedMap[prodId].qty = next;
        this.renderTcProductPickerList();
    },

    renderTcProductPickerList: function() {
        const container = document.getElementById('tcProductPickerListContainer');
        const counterBadge = document.getElementById('tcProductPickerCounterBadge');
        const btnCount = document.getElementById('tcProductPickerBtnCount');
        const costPreview = document.getElementById('tcProductPickerCostPreview');
        if (!container) return;

        const allProducts = this.getProducts();
        const warehouses = this.getWarehouses();

        let filtered = allProducts;
        if (this.tcProductPickerWarehouseId && this.tcProductPickerWarehouseId !== 'all') {
            filtered = filtered.filter(p => (p.warehouseId || 'wh_1') === this.tcProductPickerWarehouseId);
        }

        if (this.tcProductPickerSearchQuery) {
            const q = this.tcProductPickerSearchQuery;
            filtered = filtered.filter(p => {
                const name = (p.name || '').toLowerCase();
                const sku = (p.sku || '').toLowerCase();
                const cat = (p.category || '').toLowerCase();
                return name.includes(q) || sku.includes(q) || cat.includes(q);
            });
        }

        const selectedCount = Object.keys(this.tcProductPickerSelectedMap).length;
        if (counterBadge) counterBadge.textContent = `${selectedCount} məhsul seçilib`;
        if (btnCount) btnCount.textContent = selectedCount;

        // Calculate total cost
        let totalCostSum = 0;
        Object.keys(this.tcProductPickerSelectedMap).forEach(id => {
            const item = this.tcProductPickerSelectedMap[id];
            const p = allProducts.find(x => x.id === id);
            const cost = p ? (parseFloat(p.costPrice) || 0) : (parseFloat(item.cost) || 0);
            totalCostSum += (parseFloat(item.qty) || 1) * cost;
        });
        if (costPreview) costPreview.textContent = `${totalCostSum.toFixed(2)} ₼`;

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center text-slate-400 space-y-1">
                    <svg class="w-8 h-8 mx-auto text-slate-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <div class="font-bold text-xs text-slate-700">Seçilmiş anbarda axtarışa uyğun məhsul tapılmadı</div>
                    <div class="text-[11px]">Başqa anbar seçin və ya açar sözü dəyişin</div>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(p => {
            const isSelected = this.tcProductPickerSelectedMap.hasOwnProperty(p.id);
            const selectedData = this.tcProductPickerSelectedMap[p.id] || { qty: 1 };
            const costPrice = parseFloat(p.costPrice) || 0;
            const lineTotal = (selectedData.qty * costPrice).toFixed(2);
            const pWhId = p.warehouseId || 'wh_1';
            const whObj = warehouses.find(w => w.id === pWhId);
            const whName = whObj ? whObj.name : 'Əsas anbar';

            return `
                <div class="p-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition ${isSelected ? 'bg-amber-50/40' : ''}">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <label class="flex items-center cursor-pointer shrink-0">
                            <input type="checkbox"
                                   ${isSelected ? 'checked' : ''}
                                   onchange="BusinessDashboardView.toggleTcProductPickerItem('${p.id}', this.checked)"
                                   class="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer">
                        </label>
                        <div class="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 font-bold text-xs overflow-hidden">
                            ${p.image ? `<img src="${p.image}" class="w-full h-full object-cover">` : `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`}
                        </div>
                        <div class="min-w-0">
                            <div class="font-bold text-xs text-slate-900 truncate">${p.name}</div>
                            <div class="text-[11px] text-slate-400 mt-0.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium text-[10px] flex items-center gap-1">
                                    <svg class="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                    <span>${whName}</span>
                                </span>
                                <span>•</span>
                                <span>Stok: <strong class="text-slate-700 font-mono">${p.stock !== undefined ? p.stock : 0} ${p.unit || 'ədəd'}</strong></span>
                                <span>•</span>
                                <span>Maya: <strong>${costPrice.toFixed(2)} ₼</strong></span>
                                ${isSelected ? `<span class="text-amber-800 font-bold">• Cəmi: ${lineTotal} ₼</span>` : ''}
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 shrink-0">
                        <div class="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden h-8">
                            <button type="button"
                                    onclick="BusinessDashboardView.changeTcProductPickerRowQty('${p.id}', -1, event)"
                                    class="w-7 h-full flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition font-bold cursor-pointer">-</button>
                            <input type="number"
                                   step="any"
                                   min="0.01"
                                   value="${selectedData.qty}"
                                   onchange="BusinessDashboardView.updateTcProductPickerRowQty('${p.id}', this.value)"
                                   class="w-12 h-full text-center text-xs font-bold bg-transparent outline-none text-slate-900">
                            <button type="button"
                                    onclick="BusinessDashboardView.changeTcProductPickerRowQty('${p.id}', 1, event)"
                                    class="w-7 h-full flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition font-bold cursor-pointer">+</button>
                        </div>
                        <span class="text-[11px] font-semibold text-slate-500 w-10 text-center truncate">${p.unit || 'ədəd'}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    applyTechCardProductPicker: function() {
        const products = this.getProducts();
        const warehouses = this.getWarehouses();
        const selectedIds = Object.keys(this.tcProductPickerSelectedMap);

        const newIngredients = selectedIds.map(prodId => {
            const p = products.find(x => x.id === prodId);
            const data = this.tcProductPickerSelectedMap[prodId] || {};
            const qty = parseFloat(data.qty) || 1;
            const costPerUnit = p ? (parseFloat(p.costPrice) || 0) : (parseFloat(data.cost) || 0);
            const unit = p ? (p.unit || 'ədəd') : (data.unit || 'ədəd');
            const totalCost = parseFloat((qty * costPerUnit).toFixed(2));
            const pWhId = p?.warehouseId || data.warehouseId || this.tcProductPickerWarehouseId || 'wh_1';
            const whObj = warehouses.find(w => w.id === pWhId);
            return {
                productId: prodId,
                productName: p ? p.name : (data.name || 'Məhsul'),
                warehouseId: pWhId,
                warehouseName: whObj ? whObj.name : 'Əsas anbar',
                qty,
                unit,
                costPerUnit,
                totalCost
            };
        });

        this.techCardIngredients = newIngredients;
        this.closeTechCardProductPickerModal();
        this.renderTechCardIngredientsTable();
    },

    handleSaveTechCard: function(e) {
        if (e) e.preventDefault();
        const editId = document.getElementById('techCardFormEditId')?.value?.trim();
        const name = document.getElementById('techCardFormName')?.value?.trim();
        const serviceName = document.getElementById('techCardFormService')?.value?.trim();
        const warehouseId = document.getElementById('techCardFormWarehouse')?.value || 'wh_1';
        const notes = document.getElementById('techCardFormNotes')?.value?.trim() || '';

        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === warehouseId);
        const warehouseName = whObj ? whObj.name : 'Əsas anbar';

        if (!name) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa texnoloji kartın adını daxil edin");
            return;
        }

        if (!serviceName) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa aid olduğu xidməti seçin");
            return;
        }

        if (!this.techCardIngredients || this.techCardIngredients.length === 0) {
            if (typeof App !== 'undefined') App.showToast("Zəhmət olmasa ən azı bir sərfiyyat məhsulu əlavə edin");
            return;
        }

        const totalCost = this.techCardIngredients.reduce((sum, ing) => sum + (parseFloat(ing.totalCost) || 0), 0);

        const cards = this.getTechCards();

        if (editId) {
            const idx = cards.findIndex(c => c.id === editId);
            if (idx !== -1) {
                cards[idx] = {
                    ...cards[idx],
                    name,
                    serviceName,
                    warehouseId,
                    warehouseName,
                    notes,
                    ingredients: this.techCardIngredients,
                    totalCost: parseFloat(totalCost.toFixed(2)),
                    updatedAt: new Date().toISOString()
                };
                if (typeof App !== 'undefined') App.showToast("Texnoloji kart yeniləndi");
            }
        } else {
            const newTc = {
                id: 'tc_' + Date.now(),
                name,
                serviceName,
                warehouseId,
                warehouseName,
                notes,
                ingredients: this.techCardIngredients,
                totalCost: parseFloat(totalCost.toFixed(2)),
                createdAt: new Date().toISOString()
            };
            cards.push(newTc);
            if (typeof App !== 'undefined') App.showToast("Yeni texnoloji kart əlavə edildi");
        }

        this.saveTechCards(cards);
        this.closeCreateTechCardModal();
        this.refreshProductsModule();
    },

    deleteTechCard: function(tcId) {
        const cards = this.getTechCards();
        const tc = cards.find(c => c.id === tcId);
        if (!tc) return;

        this.openDeleteConfirmModal({
            title: 'Texnoloji kartı sil',
            message: `<strong>"${tc.name}"</strong> texnoloji kartını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const updated = cards.filter(c => c.id !== tcId);
                this.saveTechCards(updated);
                if (typeof App !== 'undefined') App.showToast("Texnoloji kart silindi");
                this.refreshProductsModule();
            }
        });
    },

    // ==========================================
    // INVENTORY OPERATIONS DATA & MODAL METHODS
    // ==========================================
    getInventoryOperations: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_inventory_operations_v1'));
        if (stored) {
            try {
                const list = JSON.parse(stored);
                if (Array.isArray(list) && list.length > 0) {
                    list.forEach(op => {
                        if (op.date) op.date = this.formatDateDisplay(op.date);
                    });
                    return list;
                }
            } catch (e) {
                console.error("Error parsing operations", e);
            }
        }
        const defaults = this.getDefaultInventoryOperations();
        this.saveInventoryOperations(defaults);
        return defaults;
    },

    saveInventoryOperations: function(list) {
        localStorage.setItem(this.storageKey('zeyvo_business_inventory_operations_v1'), JSON.stringify(list));
    },

    getDefaultInventoryOperations: function() {
        return [
            {
                id: 'op_1',
                docNumber: 'MED-0042',
                type: 'inflow',
                typeName: 'Mədaxil',
                date: '28.09.2026',
                warehouseName: 'Əsas anbar',
                supplier: 'Beauty Trade MMC',
                itemsCount: 4,
                totalAmount: 480.00,
                status: 'completed',
                statusLabel: 'Tamamlandı',
                notes: 'Payız partiyası üzrə tədarük',
                items: [
                    { name: "L'Oréal Professionnel Şampun", qty: 20, unit: 'ədəd', price: 14.00, total: 280.00 },
                    { name: 'Oksidləşdirici krem 6%', qty: 20, unit: 'ədəd', price: 10.00, total: 200.00 }
                ]
            },
            {
                id: 'op_2',
                docNumber: 'YER-0018',
                type: 'transfer',
                typeName: 'Yerdəyişmə',
                date: '29.09.2026',
                warehouseName: 'Əsas anbar → Kabinet anbarı',
                supplier: 'Daxili transfer',
                itemsCount: 2,
                totalAmount: 110.00,
                status: 'completed',
                statusLabel: 'Tamamlandı',
                notes: 'Kabinetlər üçün material köçürməsi',
                items: [
                    { name: "L'Oréal Professionnel Şampun", qty: 5, unit: 'ədəd', price: 14.00, total: 70.00 },
                    { name: 'Birdəfəlik qoruyucu salfetlər', qty: 10, unit: 'qutu', price: 4.00, total: 40.00 }
                ]
            },
            {
                id: 'op_3',
                docNumber: 'MEX-0031',
                type: 'writeoff',
                typeName: 'Məxaric',
                date: '30.09.2026',
                warehouseName: 'Kabinet və vitrin anbarı',
                supplier: 'Xidmət sərfiyyatı aktı',
                itemsCount: 3,
                totalAmount: 64.50,
                status: 'completed',
                statusLabel: 'Tamamlandı',
                notes: 'Gündəlik xidmət sərfiyyatı silinməsi',
                items: [
                    { name: 'Saç boyası (Qara / Təbii)', qty: 3, unit: 'ədəd', price: 15.00, total: 45.00 },
                    { name: 'Antiseptik dəri losyonu', qty: 3, unit: 'ədəd', price: 6.50, total: 19.50 }
                ]
            },
            {
                id: 'op_4',
                docNumber: 'INV-0005',
                type: 'audit',
                typeName: 'İnventarizasiya',
                date: '01.10.2026',
                warehouseName: 'Əsas anbar',
                supplier: 'Planlı dövri sayım',
                itemsCount: 12,
                totalAmount: 0.00,
                status: 'completed',
                statusLabel: 'Tamamlandı',
                notes: 'Aylıq planlı inventarizasiya tamamlandı, kənarlaşma yoxdur',
                items: [
                    { name: 'Ümumi nomenklatura yoxlaması', qty: 12, unit: 'növ', price: 0, total: 0 }
                ]
            }
        ];
    },

    selectedOpType: 'inflow',

    selectOperationType: function(type) {
        this.selectedOpType = type;
        const radios = document.querySelectorAll('input[name="opType"]');
        radios.forEach(r => {
            r.checked = (r.value === type);
        });

        const types = ['inflow', 'writeoff', 'transfer'];
        types.forEach(t => {
            const card = document.getElementById(`opTypeCard_${t}`);
            if (card) {
                if (t === type) {
                    card.className = "p-2.5 rounded-xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1 border-tbank-graphite bg-white ring-2 ring-tbank-yellow/30 shadow-xs";
                } else {
                    card.className = "p-2.5 rounded-xl border-2 transition cursor-pointer flex flex-col items-center text-center gap-1 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300";
                }
            }
        });

        this.populateOpSupplierOptions(type);
    },

    populateOpSupplierOptions: function(type, preselectValue = '') {
        const supplierLabel = document.getElementById('opSupplierLabel');
        const supplierSelect = document.getElementById('opFormSupplierSelect');
        const supplierInput = document.getElementById('opFormSupplier');
        const quickBtn = document.getElementById('opNewSupplierQuickBtn');

        if (!supplierSelect || !supplierInput) return;

        if (type === 'inflow') {
            if (supplierLabel) supplierLabel.textContent = "Təchizatçı / Kontragent";
            if (quickBtn) quickBtn.classList.remove('hidden');

            const suppliers = this.getSuppliers();
            let html = `<option value="">Təchizatçını siyahıdan seçin...</option>`;
            suppliers.forEach(s => {
                const contactHint = s.phone ? ` (${s.phone})` : '';
                html += `<option value="${s.name}">${s.name}${contactHint}</option>`;
            });
            html += `<option value="__custom__">+ Sərbəst daxil et...</option>`;
            supplierSelect.innerHTML = html;

            if (preselectValue) {
                const match = suppliers.find(s => s.name === preselectValue);
                if (match) {
                    supplierSelect.value = match.name;
                    supplierInput.value = match.name;
                    supplierInput.classList.add('hidden');
                } else {
                    supplierSelect.value = '__custom__';
                    supplierInput.value = preselectValue;
                    supplierInput.classList.remove('hidden');
                }
            } else if (suppliers.length > 0) {
                supplierSelect.value = suppliers[0].name;
                supplierInput.value = suppliers[0].name;
                supplierInput.classList.add('hidden');
            } else {
                supplierSelect.value = '__custom__';
                supplierInput.classList.remove('hidden');
            }
            supplierInput.placeholder = "Məs: Beauty Trade MMC və ya L'Oréal Paris";

        } else if (type === 'writeoff') {
            if (supplierLabel) supplierLabel.textContent = "Silinmə əsası və ya səbəb";
            if (quickBtn) quickBtn.classList.add('hidden');

            const reasons = [
                'Xidmət sərfiyyatı aktı',
                'İstifadə müddəti bitmiş (Yararsız)',
                'Zay olma / Qüsur',
                'Sınaq və ya master-klass',
                'Daxili ehtiyaclar üçün silinmə'
            ];
            let html = `<option value="">Silinmə səbəbini seçin...</option>`;
            reasons.forEach(r => {
                html += `<option value="${r}">${r}</option>`;
            });
            html += `<option value="__custom__">+ Sərbəst qeyd et...</option>`;
            supplierSelect.innerHTML = html;

            if (preselectValue) {
                if (reasons.includes(preselectValue)) {
                    supplierSelect.value = preselectValue;
                    supplierInput.value = preselectValue;
                    supplierInput.classList.add('hidden');
                } else {
                    supplierSelect.value = '__custom__';
                    supplierInput.value = preselectValue;
                    supplierInput.classList.remove('hidden');
                }
            } else {
                supplierSelect.value = reasons[0];
                supplierInput.value = reasons[0];
                supplierInput.classList.add('hidden');
            }
            supplierInput.placeholder = "Məs: Xidmət sərfiyyatı aktı və ya zay olma";

        } else if (type === 'transfer') {
            if (supplierLabel) supplierLabel.textContent = "Təyinat anbarı və ya kabinet";
            if (quickBtn) quickBtn.classList.add('hidden');

            const warehouses = this.getWarehouses();
            let html = `<option value="">Təyinat anbarını seçin...</option>`;
            warehouses.forEach(w => {
                html += `<option value="${w.name}">${w.name} (${w.typeName || 'Anbar'})</option>`;
            });
            html += `<option value="__custom__">+ Sərbəst qeyd et...</option>`;
            supplierSelect.innerHTML = html;

            if (preselectValue) {
                const match = warehouses.find(w => w.name === preselectValue);
                if (match) {
                    supplierSelect.value = match.name;
                    supplierInput.value = match.name;
                    supplierInput.classList.add('hidden');
                } else {
                    supplierSelect.value = '__custom__';
                    supplierInput.value = preselectValue;
                    supplierInput.classList.remove('hidden');
                }
            } else if (warehouses.length > 1) {
                supplierSelect.value = warehouses[1].name;
                supplierInput.value = warehouses[1].name;
                supplierInput.classList.add('hidden');
            } else {
                supplierSelect.value = warehouses[0]?.name || '';
                supplierInput.value = warehouses[0]?.name || '';
                supplierInput.classList.add('hidden');
            }
            supplierInput.placeholder = "Məs: Kabinet və vitrin anbarı";
        }
    },

    onOpSupplierSelectChange: function(val) {
        const supplierInput = document.getElementById('opFormSupplier');
        if (!supplierInput) return;
        if (val === '__custom__') {
            supplierInput.value = '';
            supplierInput.classList.remove('hidden');
            supplierInput.focus();
        } else {
            supplierInput.value = val;
            supplierInput.classList.add('hidden');
        }
    },

    operationItems: [],
    opPickerSelectedMap: {},
    opPickerSearchQuery: '',

    openCreateOperationModal: function(defaultType = 'inflow', preselectedSupplier = '') {
        const modal = document.getElementById('bizCreateOperationModal');
        if (!modal) return;

        const whSelect = document.getElementById('opFormWarehouse');
        if (whSelect) {
            const warehouses = this.getWarehouses();
            if (whSelect.tagName === 'SELECT') {
                whSelect.innerHTML = warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('');
            } else {
                whSelect.value = this.opPickerWarehouseId || (warehouses[0] ? warehouses[0].id : 'wh_1');
            }
        }

        this.initCustomDatePicker('opFormDate', new Date().toISOString().split('T')[0]);

        const notesInput = document.getElementById('opFormNotes');
        if (notesInput) notesInput.value = '';

        this.operationItems = [];
        this.renderOperationItemsList();

        this.selectOperationType(defaultType);
        if (preselectedSupplier) {
            this.populateOpSupplierOptions(defaultType, preselectedSupplier);
        }
        modal.classList.remove('hidden');
    },

    closeCreateOperationModal: function() {
        const modal = document.getElementById('bizCreateOperationModal');
        if (modal) modal.classList.add('hidden');
        this.closeAllCustomDatePickers();
        this.closeOperationProductPickerModal();
    },

    addOperationProductRow: function() {
        this.openOperationProductPickerModal();
    },

    // ==========================================
    // OPERATION PRODUCT PICKER MODAL METHODS
    // ==========================================
    opPickerWarehouseId: 'wh_1',

    openOperationProductPickerModal: function() {
        const pickerModal = document.getElementById('bizOperationProductPickerModal');
        if (!pickerModal) return;

        const whSelect = document.getElementById('opFormWarehouse');
        const whId = whSelect ? whSelect.value : 'wh_1';
        this.opPickerWarehouseId = whId;

        // Populate picker warehouse select
        const pickerWhSelect = document.getElementById('opPickerWarehouseSelect');
        if (pickerWhSelect) {
            const warehouses = this.getWarehouses();
            pickerWhSelect.innerHTML = warehouses.map(w => `<option value="${w.id}">${w.name} (${w.typeName || 'Anbar'})</option>`).join('');
            pickerWhSelect.value = whId;
        }

        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === whId);

        const hint = document.getElementById('opPickerWarehouseHint');
        if (hint && whObj) hint.textContent = `Anbar: ${whObj.name}`;

        const searchInput = document.getElementById('opPickerSearchInput');
        if (searchInput) searchInput.value = '';
        this.opPickerSearchQuery = '';

        // Pre-populate opPickerSelectedMap from existing operationItems
        this.opPickerSelectedMap = {};
        this.operationItems.forEach(item => {
            this.opPickerSelectedMap[item.productId] = {
                qty: item.qty || 1,
                price: item.price !== undefined ? item.price : 0
            };
        });

        this.renderOpPickerList();
        pickerModal.classList.remove('hidden');
    },

    closeOperationProductPickerModal: function() {
        const pickerModal = document.getElementById('bizOperationProductPickerModal');
        if (pickerModal) pickerModal.classList.add('hidden');
    },

    onOpPickerWarehouseChange: function(whId) {
        this.opPickerWarehouseId = whId;
        const opWhSelect = document.getElementById('opFormWarehouse');
        if (opWhSelect) opWhSelect.value = whId;

        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === whId);
        const hint = document.getElementById('opPickerWarehouseHint');
        if (hint && whObj) hint.textContent = `Anbar: ${whObj.name}`;

        this.renderOpPickerList();
    },

    onOpPickerSearch: function(val) {
        this.opPickerSearchQuery = (val || '').toLowerCase().trim();
        this.renderOpPickerList();
    },

    toggleOpPickerSelectAll: function(selectAll) {
        const whId = this.opPickerWarehouseId || document.getElementById('opFormWarehouse')?.value || 'wh_1';
        const products = this.getAuditWarehouseProducts(whId);

        if (selectAll) {
            products.forEach(p => {
                if (!this.opPickerSelectedMap[p.id]) {
                    this.opPickerSelectedMap[p.id] = {
                        qty: 1,
                        price: parseFloat(p.costPrice) || 0
                    };
                }
            });
        } else {
            this.opPickerSelectedMap = {};
        }
        this.renderOpPickerList();
    },

    toggleOpPickerItem: function(prodId, isChecked) {
        if (isChecked) {
            if (!this.opPickerSelectedMap[prodId]) {
                const products = this.getProducts();
                const p = products.find(x => x.id === prodId);
                this.opPickerSelectedMap[prodId] = {
                    qty: 1,
                    price: p ? (parseFloat(p.costPrice) || 0) : 0
                };
            }
        } else {
            delete this.opPickerSelectedMap[prodId];
        }
        this.updateOpPickerCounters();
        this.renderOpPickerList();
    },

    toggleOpPickerRowClick: function(prodId, event) {
        if (event && (event.target.tagName === 'INPUT' || event.target.tagName === 'BUTTON' || event.target.closest('button'))) return;
        const isChecked = !this.opPickerSelectedMap.hasOwnProperty(prodId);
        this.toggleOpPickerItem(prodId, isChecked);
    },

    changeOpPickerRowQty: function(prodId, delta, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (!this.opPickerSelectedMap[prodId]) {
            this.toggleOpPickerItem(prodId, true);
        }
        const cur = parseFloat(this.opPickerSelectedMap[prodId]?.qty) || 1;
        const next = Math.max(0.01, parseFloat((cur + delta).toFixed(2)));
        this.opPickerSelectedMap[prodId].qty = next;
        this.renderOpPickerList();
    },

    updateOpPickerRowQty: function(prodId, val) {
        if (!this.opPickerSelectedMap[prodId]) return;
        const next = Math.max(0.01, parseFloat(val) || 1);
        this.opPickerSelectedMap[prodId].qty = next;
        this.renderOpPickerList();
    },

    updateOpPickerCounters: function() {
        const count = Object.keys(this.opPickerSelectedMap).length;
        const badge = document.getElementById('opPickerCounterBadge');
        if (badge) badge.textContent = `${count} məhsul seçilib`;

        const btnCount = document.getElementById('opPickerBtnCount');
        if (btnCount) btnCount.textContent = count;
    },

    renderOpPickerList: function() {
        const container = document.getElementById('opPickerProductsContainer');
        if (!container) return;

        const whId = this.opPickerWarehouseId || document.getElementById('opFormWarehouse')?.value || 'wh_1';
        const products = this.getAuditWarehouseProducts(whId);
        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === whId);
        const whName = whObj ? whObj.name : 'Əsas anbar';

        this.updateOpPickerCounters();

        let filtered = products;
        if (this.opPickerSearchQuery) {
            const q = this.opPickerSearchQuery;
            filtered = filtered.filter(p => {
                const name = (p.name || '').toLowerCase();
                const sku = (p.sku || '').toLowerCase();
                const barcode = (p.barcode || '').toLowerCase();
                return name.includes(q) || sku.includes(q) || barcode.includes(q);
            });
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center space-y-1.5 bg-white">
                    <p class="font-bold text-xs text-slate-800">Seçilmiş anbarda məhsul tapılmadı</p>
                    <p class="text-[11px] text-slate-400">Başqa anbar seçin və ya axtarış sorğusunu dəyişin</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(p => {
            const isChecked = this.opPickerSelectedMap.hasOwnProperty(p.id);
            const itemData = this.opPickerSelectedMap[p.id] || { qty: 1, price: parseFloat(p.costPrice) || 0 };
            const stock = parseInt(p.stock) || 0;
            return `
                <div class="p-3 ${isChecked ? 'bg-amber-50/40 border-l-4 border-l-[#FFDD2D]' : 'bg-white hover:bg-slate-50 border-l-4 border-l-transparent'} flex items-center justify-between gap-3 text-xs transition select-none">
                    <div class="flex items-center gap-3 min-w-0 flex-1 cursor-pointer" onclick="BusinessDashboardView.toggleOpPickerRowClick('${p.id}', event)">
                        <input type="checkbox"
                                id="opPickerCheck_${p.id}"
                                ${isChecked ? 'checked' : ''}
                                onchange="BusinessDashboardView.toggleOpPickerItem('${p.id}', this.checked)"
                                class="w-4 h-4 rounded text-amber-500 border-slate-300 focus:ring-amber-400 cursor-pointer shrink-0">
                        <div class="min-w-0 flex-1">
                            <div class="font-bold text-slate-900 truncate">${p.name}</div>
                            <div class="text-[11px] text-slate-400 mt-0.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium text-[10px] flex items-center gap-1">
                                    <svg class="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                    <span>${whName}</span>
                                </span>
                                <span>•</span>
                                <span>Qalıq: <strong class="text-slate-700 font-semibold">${stock} ${p.unit || 'ədəd'}</strong></span>
                                ${p.sku ? `<span class="text-slate-300">•</span><span>${p.sku}</span>` : ''}
                                <span class="text-slate-300">•</span>
                                <span>${p.costPrice || 0} ₼</span>
                            </div>
                        </div>
                    </div>

                    <div class="shrink-0 flex items-center gap-2">
                        ${isChecked ? `
                            <div class="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden h-8">
                                <button type="button"
                                        onclick="BusinessDashboardView.changeOpPickerRowQty('${p.id}', -1, event)"
                                        class="w-7 h-full flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition font-bold cursor-pointer">-</button>
                                <input type="number"
                                       step="any"
                                       min="0.01"
                                       value="${itemData.qty}"
                                       onclick="event.stopPropagation()"
                                       onchange="BusinessDashboardView.updateOpPickerRowQty('${p.id}', this.value)"
                                       class="w-12 h-full text-center text-xs font-bold bg-transparent outline-none text-slate-900">
                                <button type="button"
                                        onclick="BusinessDashboardView.changeOpPickerRowQty('${p.id}', 1, event)"
                                        class="w-7 h-full flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition font-bold cursor-pointer">+</button>
                            </div>
                        ` : `
                            <button type="button" onclick="BusinessDashboardView.toggleOpPickerItem('${p.id}', true)" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#FFDD2D] text-slate-700 font-semibold text-[11px] transition cursor-pointer">
                                Seç
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');
    },

    applyOperationProductPicker: function() {
        const whId = this.opPickerWarehouseId || document.getElementById('opFormWarehouse')?.value || 'wh_1';
        const whSelect = document.getElementById('opFormWarehouse');
        if (whSelect) whSelect.value = whId;
        const products = this.getAuditWarehouseProducts(whId);

        const newItems = [];
        products.forEach(p => {
            if (this.opPickerSelectedMap.hasOwnProperty(p.id)) {
                const data = this.opPickerSelectedMap[p.id];
                newItems.push({
                    productId: p.id,
                    name: p.name,
                    sku: p.sku || '',
                    unit: p.unit || 'ədəd',
                    stock: parseInt(p.stock) || 0,
                    qty: parseFloat(data.qty) || 1,
                    price: data.price !== undefined ? parseFloat(data.price) : (parseFloat(p.costPrice) || 0)
                });
            }
        });

        this.operationItems = newItems;
        this.closeOperationProductPickerModal();
        this.renderOperationItemsList();
    },

    // ==========================================
    // OPERATION ITEMS IN DOCUMENT METHODS
    // ==========================================
    renderOperationItemsList: function() {
        const container = document.getElementById('opProductRowsContainer');
        if (!container) return;

        if (this.operationItems.length === 0) {
            container.innerHTML = `
                <div class="p-5 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 space-y-2">
                    <div class="w-9 h-9 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    </div>
                    <div class="text-xs font-bold text-slate-800">Heç bir məhsul əlavə edilməyib</div>
                    <p class="text-[11px] text-slate-400">Sənədə daxil etmək üçün məhsul seçimi modalını açın</p>
                    <button type="button" onclick="BusinessDashboardView.openOperationProductPickerModal()" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs shadow-2xs transition active:scale-95 cursor-pointer mt-1">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                        <span>Məhsul seçin</span>
                    </button>
                </div>
            `;
            return;
        }

        let totalAmount = 0;
        let totalQty = 0;

        const itemsHtml = this.operationItems.map(item => {
            const lineTotal = (item.qty || 1) * (item.price || 0);
            totalAmount += lineTotal;
            totalQty += (item.qty || 1);

            return `
                <div class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 text-xs">
                    <div class="flex items-center justify-between gap-2">
                        <div class="min-w-0 flex-1">
                            <div class="font-bold text-slate-900 truncate">${item.name}</div>
                            <div class="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                                <span>Qalıq: <strong class="text-slate-700 font-semibold">${item.stock || 0} ${item.unit || 'ədəd'}</strong></span>
                                ${item.sku ? `<span class="text-slate-300">•</span><span>${item.sku}</span>` : ''}
                            </div>
                        </div>
                        <button type="button" onclick="BusinessDashboardView.removeOperationItem('${item.productId}')" class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer shrink-0" title="Sil">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <div class="flex items-center justify-between gap-3 pt-1 border-t border-slate-100 flex-wrap">
                        <div class="flex items-center gap-1.5">
                            <span class="text-[11px] text-slate-500 font-medium">Miqdar:</span>
                            <div class="flex items-center rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                                <button type="button" onclick="BusinessDashboardView.changeOperationItemQty('${item.productId}', -1)" class="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition font-bold text-xs cursor-pointer select-none">-</button>
                                <input type="number" step="any" min="0.01" value="${item.qty}" onchange="BusinessDashboardView.updateOperationItemQty('${item.productId}', this.value)" class="w-12 h-7 text-center text-xs font-bold text-slate-900 bg-white border-x border-slate-200 outline-none">
                                <button type="button" onclick="BusinessDashboardView.changeOperationItemQty('${item.productId}', 1)" class="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition font-bold text-xs cursor-pointer select-none">+</button>
                            </div>
                            <span class="text-[11px] text-slate-400 font-medium">${item.unit || 'ədəd'}</span>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="flex items-center gap-1">
                                <span class="text-[11px] text-slate-500 font-medium">Qiymət:</span>
                                <input type="number" step="any" min="0" value="${item.price}" onchange="BusinessDashboardView.updateOperationItemPrice('${item.productId}', this.value)" class="w-16 h-7 px-2 text-right text-xs font-bold text-slate-900 rounded-lg bg-white border border-slate-200 outline-none focus:border-slate-900">
                                <span class="text-[11px] text-slate-400 font-semibold">₼</span>
                            </div>
                            <div class="text-right min-w-[70px]">
                                <div class="text-xs font-bold text-slate-900">${lineTotal.toFixed(2)} ₼</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const warehouses = this.getWarehouses();
        const curWhId = this.opPickerWarehouseId || document.getElementById('opFormWarehouse')?.value || 'wh_1';
        const curWh = warehouses.find(w => w.id === curWhId);
        const whName = curWh ? curWh.name : 'Əsas anbar';

        container.innerHTML = `
            <div class="space-y-2">
                ${itemsHtml}
            </div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-medium text-slate-600 flex-wrap gap-2">
                <div class="flex items-center gap-2">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-bold text-[10px] tracking-wide">
                        <svg class="w-3 h-3 text-amber-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                        ${whName}
                    </span>
                    <span>Cəmi: <strong class="text-slate-900 font-bold">${this.operationItems.length}</strong> məhsul (${totalQty} ədəd)</span>
                </div>
                <span>Yekun: <strong class="text-slate-900 font-bold text-sm">${totalAmount.toFixed(2)} ₼</strong></span>
            </div>
        `;
    },

    changeOperationItemQty: function(prodId, delta) {
        const item = this.operationItems.find(x => x.productId === prodId);
        if (!item) return;
        item.qty = Math.max(0.01, parseFloat(((item.qty || 1) + delta).toFixed(2)));
        this.renderOperationItemsList();
    },

    updateOperationItemQty: function(prodId, val) {
        const item = this.operationItems.find(x => x.productId === prodId);
        if (!item) return;
        item.qty = Math.max(0.01, parseFloat(val) || 1);
        this.renderOperationItemsList();
    },

    updateOperationItemPrice: function(prodId, val) {
        const item = this.operationItems.find(x => x.productId === prodId);
        if (!item) return;
        item.price = Math.max(0, parseFloat(val) || 0);
        this.renderOperationItemsList();
    },

    removeOperationItem: function(prodId) {
        this.operationItems = this.operationItems.filter(x => x.productId !== prodId);
        this.renderOperationItemsList();
    },

    handleSaveOperation: function(e) {
        if (e) e.preventDefault();
        const type = this.selectedOpType || 'inflow';
        const whId = this.opPickerWarehouseId || document.getElementById('opFormWarehouse')?.value || 'wh_1';
        const date = document.getElementById('opFormDate')?.value || new Date().toISOString().split('T')[0];
        const supplierSelect = document.getElementById('opFormSupplierSelect');
        const supplierInput = document.getElementById('opFormSupplier');
        let supplier = '';
        if (supplierSelect && supplierSelect.value && supplierSelect.value !== '__custom__') {
            supplier = supplierSelect.value;
        } else if (supplierInput) {
            supplier = supplierInput.value.trim();
        }
        const notes = document.getElementById('opFormNotes')?.value?.trim() || '';

        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === whId);
        const warehouseName = whObj ? whObj.name : 'Əsas anbar';

        if (!this.operationItems || this.operationItems.length === 0) {
            this.showToast('Zəhmət olmasa sənədə ən azı bir məhsul əlavə edin');
            return;
        }

        const items = [];
        let totalAmount = 0;
        this.operationItems.forEach(it => {
            const lineTotal = (it.qty || 1) * (it.price || 0);
            totalAmount += lineTotal;
            items.push({
                productId: it.productId,
                name: it.name,
                qty: it.qty,
                unit: it.unit || 'ədəd',
                price: it.price || 0,
                total: parseFloat(lineTotal.toFixed(2))
            });
        });

        const typePrefixes = {
            inflow: 'MED',
            writeoff: 'MEX',
            transfer: 'YER',
            audit: 'INV'
        };

        const typeLabels = {
            inflow: 'Mədaxil',
            writeoff: 'Məxaric',
            transfer: 'Yerdəyişmə',
            audit: 'İnventarizasiya'
        };

        const docNum = (typePrefixes[type] || 'DOC') + '-' + Math.floor(1000 + Math.random() * 9000);

        const newOp = {
            id: 'op_' + Date.now(),
            docNumber: docNum,
            type,
            typeName: typeLabels[type] || type,
            date: this.formatDateDisplay(date),
            warehouseName,
            supplier,
            itemsCount: items.length || 1,
            totalAmount: parseFloat(totalAmount.toFixed(2)),
            status: 'completed',
            statusLabel: 'Tamamlandı',
            notes,
            items,
            createdAt: new Date().toISOString()
        };

        const operations = this.getInventoryOperations();
        operations.unshift(newOp);
        this.saveInventoryOperations(operations);

        // Adjust stocks for products
        if (items.length > 0) {
            const products = this.getProducts();
            items.forEach(it => {
                const prod = products.find(p => p.id === it.productId);
                if (prod) {
                    let cur = parseInt(prod.stock) || 0;
                    if (type === 'inflow') cur += it.qty;
                    else if (type === 'writeoff') cur = Math.max(0, cur - it.qty);
                    prod.stock = cur;
                    const min = parseInt(prod.minStock) || 3;
                    if (cur <= 0) prod.status = 'out_of_stock';
                    else if (cur <= min) prod.status = 'low_stock';
                    else prod.status = 'in_stock';
                }
            });
            this.saveProducts(products);
        }

        this.closeCreateOperationModal();
        if (typeof App !== 'undefined') App.showToast(`Sənəd təsdiqləndi: ${docNum}`);
        this.refreshProductsModule();
    },

    deleteInventoryOperation: function(opId) {
        const operations = this.getInventoryOperations();
        const op = operations.find(o => o.id === opId);
        if (!op) return;

        this.openDeleteConfirmModal({
            title: 'Əməliyyatı sil',
            message: `<strong>"${op.docNumber}"</strong> saylı əməliyyat sənədini silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const updated = operations.filter(o => o.id !== opId);
                this.saveInventoryOperations(updated);
                if (typeof App !== 'undefined') App.showToast("Sənəd silindi");
                this.refreshProductsModule();
            }
        });
    },

    // ==========================================
    // INVENTORY AUDITS (SAYIM VƏ İNVENTARİZASİYA)
    // ==========================================
    getInventoryAudits: function() {
        const stored = localStorage.getItem(this.storageKey('zeyvo_business_inventory_audits_v1'));
        if (stored) {
            try {
                const list = JSON.parse(stored);
                if (Array.isArray(list) && list.length > 0) {
                    list.forEach(aud => {
                        if (aud.date) aud.date = this.formatDateDisplay(aud.date);
                    });
                    return list;
                }
            } catch (e) {
                console.error("Error parsing audits", e);
            }
        }
        const defaults = this.getDefaultInventoryAudits();
        this.saveInventoryAudits(defaults);
        return defaults;
    },

    saveInventoryAudits: function(list) {
        localStorage.setItem(this.storageKey('zeyvo_business_inventory_audits_v1'), JSON.stringify(list));
    },

    getDefaultInventoryAudits: function() {
        return [
            {
                id: 'aud_1',
                docNumber: 'INV-2026-001',
                date: '01.10.2026',
                warehouseId: 'wh_1',
                warehouseName: 'Əsas anbar',
                responsible: 'Rauf Əliyev (Baş anbardar)',
                itemsCount: 7,
                discrepancyCount: 0,
                discrepancyAmount: 0.00,
                status: 'completed',
                statusLabel: 'Tamamlandı',
                notes: 'Aylıq planlı inventarizasiya. Bütün məhsul sayımları sistemlə 100% uyğundur.',
                items: [
                    { productId: 'prod_1', name: "L'Oréal Professionnel Şampun", systemStock: 12, physicalStock: 12, diff: 0, unit: 'ədəd' },
                    { productId: 'prod_2', name: 'Estel Professional Saç Maskası 500ml', systemStock: 8, physicalStock: 8, diff: 0, unit: 'ədəd' },
                    { productId: 'prod_3', name: 'Olaplex No.3 Hair Perfector 100ml', systemStock: 2, physicalStock: 2, diff: 0, unit: 'ədəd' },
                    { productId: 'prod_4', name: 'Birdəfəlik qoruyucu yaxalıqlar (100 əd)', systemStock: 4, physicalStock: 4, diff: 0, unit: 'qutu' },
                    { productId: 'prod_5', name: 'Kodi Professional Kauçuk Baza 15ml', systemStock: 9, physicalStock: 9, diff: 0, unit: 'ədəd' },
                    { productId: 'prod_6', name: 'Alətlər üçün sürətli dezinfeksiya spreyi 1L', systemStock: 0, physicalStock: 0, diff: 0, unit: 'ədəd' },
                    { productId: 'prod_7', name: 'Curaprox Ultra Soft 5460 Diş fırçası', systemStock: 15, physicalStock: 15, diff: 0, unit: 'ədəd' }
                ]
            },
            {
                id: 'aud_2',
                docNumber: 'INV-2026-002',
                date: '15.09.2026',
                warehouseId: 'wh_2',
                warehouseName: 'Kabinet və vitrin anbarı',
                responsible: 'Aysel Qasımova',
                itemsCount: 4,
                discrepancyCount: -1,
                discrepancyAmount: -14.00,
                status: 'completed',
                statusLabel: 'Tamamlandı',
                notes: 'Kabinet vitrini üzrə növbədənkənar yoxlama. 1 ədəd baza silinmə aktı ilə bərabərləşdirildi.',
                items: [
                    { productId: 'prod_1', name: "L'Oréal Professionnel Şampun", systemStock: 5, physicalStock: 5, diff: 0, unit: 'ədəd' },
                    { productId: 'prod_5', name: 'Kodi Professional Kauçuk Baza 15ml', systemStock: 4, physicalStock: 3, diff: -1, unit: 'ədəd' }
                ]
            }
        ];
    },

    auditItems: [],
    pickerSelectedIds: new Set(),
    pickerSearchQuery: '',

    getAuditWarehouseProducts: function(whId) {
        const activeCtx = this.getActiveContext();
        let products = this.getProducts().filter(p => {
            if (p.branchId) {
                return p.branchId === activeCtx.branchId || p.branchName === activeCtx.branchName;
            }
            return p.businessName === activeCtx.businessName;
        });
        if (whId) {
            const whProducts = products.filter(p => (p.warehouseId || 'wh_1') === whId);
            return whProducts.length > 0 ? whProducts : products;
        }
        return products;
    },

    openCreateAuditModal: function() {
        const modal = document.getElementById('bizCreateAuditModal');
        if (!modal) return;

        const whSelect = document.getElementById('auditFormWarehouse');
        if (whSelect) {
            const warehouses = this.getWarehouses();
            whSelect.innerHTML = warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('');
        }

        this.initCustomDatePicker('auditFormDate', new Date().toISOString().split('T')[0]);

        const respInput = document.getElementById('auditFormResponsible');
        if (respInput) respInput.value = '';

        const notesInput = document.getElementById('auditFormNotes');
        if (notesInput) notesInput.value = '';

        this.auditItems = [];
        this.renderAuditItemsTable();
        modal.classList.remove('hidden');
    },

    closeCreateAuditModal: function() {
        const modal = document.getElementById('bizCreateAuditModal');
        if (modal) modal.classList.add('hidden');
        this.closeAuditProductPickerModal();
        this.closeAllCustomDatePickers();
    },

    onAuditWarehouseChange: function() {
        // If items are in audit table, ask or keep, and update picker hint
        const whSelect = document.getElementById('auditFormWarehouse');
        const whId = whSelect ? whSelect.value : 'wh_1';
        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === whId);
        const hint = document.getElementById('auditPickerWarehouseHint');
        if (hint && whObj) hint.textContent = `Anbar: ${whObj.name}`;
    },

    // ==========================================
    // AUDIT PRODUCT PICKER MODAL METHODS
    // ==========================================
    auditPickerWarehouseId: 'wh_1',

    openAuditProductPickerModal: function() {
        const pickerModal = document.getElementById('bizAuditProductPickerModal');
        if (!pickerModal) return;

        const whSelect = document.getElementById('auditFormWarehouse');
        const whId = whSelect ? whSelect.value : 'wh_1';
        this.auditPickerWarehouseId = whId;

        // Populate picker warehouse select
        const pickerWhSelect = document.getElementById('auditPickerWarehouseSelect');
        if (pickerWhSelect) {
            const warehouses = this.getWarehouses();
            pickerWhSelect.innerHTML = warehouses.map(w => `<option value="${w.id}">${w.name} (${w.typeName || 'Anbar'})</option>`).join('');
            pickerWhSelect.value = whId;
        }

        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === whId);

        const hint = document.getElementById('auditPickerWarehouseHint');
        if (hint && whObj) hint.textContent = `Anbar: ${whObj.name}`;

        const searchInput = document.getElementById('auditPickerSearchInput');
        if (searchInput) searchInput.value = '';
        this.pickerSearchQuery = '';

        // Pre-select any items that are already in auditItems
        this.pickerSelectedIds = new Set(this.auditItems.map(i => i.productId));

        this.renderAuditPickerList();
        pickerModal.classList.remove('hidden');
    },

    closeAuditProductPickerModal: function() {
        const pickerModal = document.getElementById('bizAuditProductPickerModal');
        if (pickerModal) pickerModal.classList.add('hidden');
    },

    onAuditPickerWarehouseChange: function(whId) {
        this.auditPickerWarehouseId = whId;
        const auditWhSelect = document.getElementById('auditFormWarehouse');
        if (auditWhSelect) auditWhSelect.value = whId;

        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === whId);
        const hint = document.getElementById('auditPickerWarehouseHint');
        if (hint && whObj) hint.textContent = `Anbar: ${whObj.name}`;

        this.renderAuditPickerList();
    },

    onAuditPickerSearch: function(val) {
        this.pickerSearchQuery = (val || '').toLowerCase().trim();
        this.renderAuditPickerList();
    },

    togglePickerSelectAll: function(selectAll) {
        const whId = this.auditPickerWarehouseId || document.getElementById('auditFormWarehouse')?.value || 'wh_1';
        const products = this.getAuditWarehouseProducts(whId);

        if (selectAll) {
            products.forEach(p => this.pickerSelectedIds.add(p.id));
        } else {
            this.pickerSelectedIds.clear();
        }
        this.renderAuditPickerList();
    },

    togglePickerItem: function(prodId, isChecked) {
        if (isChecked) {
            this.pickerSelectedIds.add(prodId);
        } else {
            this.pickerSelectedIds.delete(prodId);
        }
        this.updatePickerCounters();
    },

    togglePickerRowClick: function(prodId, event) {
        if (event && event.target && event.target.tagName === 'INPUT') return;
        const isChecked = !this.pickerSelectedIds.has(prodId);
        this.togglePickerItem(prodId, isChecked);
        const chk = document.getElementById(`pickerCheck_${prodId}`);
        if (chk) chk.checked = isChecked;
        this.renderAuditPickerList();
    },

    updatePickerCounters: function() {
        const selectedCount = this.pickerSelectedIds.size;
        const badge = document.getElementById('auditPickerCounterBadge');
        if (badge) badge.textContent = `${selectedCount} məhsul seçilib`;

        const btnCount = document.getElementById('auditPickerBtnCount');
        if (btnCount) btnCount.textContent = selectedCount;
    },

    renderAuditPickerList: function() {
        const container = document.getElementById('auditPickerProductsContainer');
        if (!container) return;

        const whId = this.auditPickerWarehouseId || document.getElementById('auditFormWarehouse')?.value || 'wh_1';
        const products = this.getAuditWarehouseProducts(whId);
        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === whId);
        const whName = whObj ? whObj.name : 'Əsas anbar';

        this.updatePickerCounters();

        let filtered = products;
        if (this.pickerSearchQuery) {
            const q = this.pickerSearchQuery;
            filtered = filtered.filter(p => {
                const name = (p.name || '').toLowerCase();
                const sku = (p.sku || '').toLowerCase();
                const barcode = (p.barcode || '').toLowerCase();
                return name.includes(q) || sku.includes(q) || barcode.includes(q);
            });
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center space-y-1.5 bg-white">
                    <p class="font-bold text-xs text-slate-800">Seçilmiş anbarda məhsul tapılmadı</p>
                    <p class="text-[11px] text-slate-400">Başqa anbar seçin və ya axtarış sorğusunu dəyişin</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(p => {
            const isChecked = this.pickerSelectedIds.has(p.id);
            const stock = parseInt(p.stock) || 0;
            return `
                <div onclick="BusinessDashboardView.togglePickerRowClick('${p.id}', event)" class="p-3 ${isChecked ? 'bg-purple-50/40 border-l-4 border-l-purple-600' : 'bg-white hover:bg-slate-50 border-l-4 border-l-transparent'} flex items-center justify-between gap-3 text-xs transition cursor-pointer select-none">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <input type="checkbox"
                               id="pickerCheck_${p.id}"
                               ${isChecked ? 'checked' : ''}
                               onchange="BusinessDashboardView.togglePickerItem('${p.id}', this.checked)"
                               class="w-4 h-4 rounded text-purple-600 border-slate-300 focus:ring-purple-500 cursor-pointer shrink-0">
                        <div class="min-w-0 flex-1">
                            <div class="font-bold text-slate-900 truncate">${p.name}</div>
                            <div class="text-[11px] text-slate-400 mt-0.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium text-[10px] flex items-center gap-1">
                                    <svg class="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                    <span>${whName}</span>
                                </span>
                                <span>•</span>
                                <span>Qalıq: <strong class="text-slate-700 font-semibold">${stock} ${p.unit || 'ədəd'}</strong></span>
                                ${p.sku ? `<span class="text-slate-300">•</span><span>${p.sku}</span>` : ''}
                            </div>
                        </div>
                    </div>

                    <div class="shrink-0 text-right">
                        <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${stock > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">
                            ${stock > 0 ? 'Stokda var' : 'Bitib'}
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    },

    applyAuditProductPicker: function() {
        const whSelect = document.getElementById('auditFormWarehouse');
        const whId = whSelect ? whSelect.value : 'wh_1';
        const products = this.getAuditWarehouseProducts(whId);

        // Keep current physical quantities if already present
        const currentQtyMap = {};
        this.auditItems.forEach(item => {
            currentQtyMap[item.productId] = item.physicalStock;
        });

        const newItems = [];
        products.forEach(p => {
            if (this.pickerSelectedIds.has(p.id)) {
                const stock = parseInt(p.stock) || 0;
                newItems.push({
                    productId: p.id,
                    name: p.name,
                    sku: p.sku || '',
                    unit: p.unit || 'ədəd',
                    costPrice: parseFloat(p.costPrice) || 0,
                    systemStock: stock,
                    physicalStock: currentQtyMap[p.id] !== undefined ? currentQtyMap[p.id] : stock
                });
            }
        });

        this.auditItems = newItems;
        this.closeAuditProductPickerModal();
        this.renderAuditItemsTable();
    },

    // ==========================================
    // AUDIT ITEMS TABLE METHODS
    // ==========================================
    addAllWarehouseProductsToAudit: function() {
        const whSelect = document.getElementById('auditFormWarehouse');
        const whId = whSelect ? whSelect.value : 'wh_1';
        const products = this.getAuditWarehouseProducts(whId);

        const currentQtyMap = {};
        this.auditItems.forEach(item => {
            currentQtyMap[item.productId] = item.physicalStock;
        });

        this.auditItems = products.map(p => {
            const stock = parseInt(p.stock) || 0;
            return {
                productId: p.id,
                name: p.name,
                sku: p.sku || '',
                unit: p.unit || 'ədəd',
                costPrice: parseFloat(p.costPrice) || 0,
                systemStock: stock,
                physicalStock: currentQtyMap[p.id] !== undefined ? currentQtyMap[p.id] : stock
            };
        });

        this.renderAuditItemsTable();
        if (typeof App !== 'undefined') App.showToast(`Bütün anbar məhsulları əlavə edildi (${this.auditItems.length} məhsul)`);
    },

    removeAuditItem: function(prodId) {
        this.auditItems = this.auditItems.filter(i => i.productId !== prodId);
        this.renderAuditItemsTable();
    },

    clearAuditItemsTable: function() {
        this.auditItems = [];
        this.renderAuditItemsTable();
    },

    onAuditItemQtyChange: function(prodId, val) {
        const item = this.auditItems.find(i => i.productId === prodId);
        if (!item) return;

        item.physicalStock = Math.max(0, parseInt(val) || 0);
        const diff = item.physicalStock - item.systemStock;
        const diffEl = document.getElementById(`auditItemDiff_${prodId}`);
        if (!diffEl) return;

        if (diff === 0) {
            diffEl.innerHTML = `<span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">0 ${item.unit || 'ədəd'}</span>`;
        } else if (diff < 0) {
            diffEl.innerHTML = `<span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">${diff} ${item.unit || 'ədəd'}</span>`;
        } else {
            diffEl.innerHTML = `<span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">+${diff} ${item.unit || 'ədəd'}</span>`;
        }
    },

    stepAuditItemQty: function(prodId, delta) {
        const item = this.auditItems.find(i => i.productId === prodId);
        if (!item) return;

        const currentVal = parseInt(item.physicalStock) || 0;
        const newVal = Math.max(0, currentVal + delta);
        item.physicalStock = newVal;

        const inputEl = document.getElementById(`auditItemQty_${prodId}`);
        if (inputEl) inputEl.value = newVal;

        this.onAuditItemQtyChange(prodId, newVal);
    },

    renderAuditItemsTable: function() {
        const container = document.getElementById('auditProductsContainer');
        const countBadge = document.getElementById('auditItemsCountBadge');
        if (countBadge) countBadge.textContent = `${this.auditItems.length} məhsul`;

        const clearBtn = document.getElementById('auditClearTableBtn');
        if (clearBtn) {
            if (this.auditItems.length > 0) clearBtn.classList.remove('hidden');
            else clearBtn.classList.add('hidden');
        }

        if (!container) return;

        if (this.auditItems.length === 0) {
            container.innerHTML = `
                <div class="p-8 sm:p-10 text-center space-y-3 bg-white">
                    <div class="w-12 h-12 mx-auto rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    </div>
                    <div>
                        <p class="font-bold text-sm text-slate-800">Sayım üçün məhsul seçilməyib</p>
                        <p class="text-xs text-slate-400 font-normal mt-0.5">2-3 məhsul seçmək üçün <strong>"Məhsul seç"</strong> və ya anbardakı bütün malları əlavə etmək üçün <strong>"Bütün anbarı doldur"</strong> düyməsinə klikləyin</p>
                    </div>
                    <div class="flex items-center justify-center gap-2 pt-1">
                        <button type="button" onclick="BusinessDashboardView.openAuditProductPickerModal()" class="px-4 py-2 rounded-xl bg-[#FFDD2D] hover:bg-[#FCC520] text-[#101114] font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14"/></svg>
                            <span>Məhsul seç</span>
                        </button>
                        <button type="button" onclick="BusinessDashboardView.addAllWarehouseProductsToAudit()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition active:scale-95 cursor-pointer">
                            Bütün anbarı doldur
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs min-w-[550px]">
                    <thead>
                        <tr class="bg-slate-50/80 border-b border-slate-100 text-slate-600 font-semibold text-xs">
                            <th class="py-2.5 px-3">Məhsul və artikol</th>
                            <th class="py-2.5 px-3 text-center">Sistem qalığı</th>
                            <th class="py-2.5 px-3 text-center">Faktiki sayım</th>
                            <th class="py-2.5 px-3 text-center">Fərq</th>
                            <th class="py-2.5 px-3 text-right">Sil</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-slate-800">
                        ${this.auditItems.map(item => {
                            const diff = item.physicalStock - item.systemStock;
                            let diffBadge = '';
                            if (diff === 0) {
                                diffBadge = `<span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">0 ${item.unit || 'ədəd'}</span>`;
                            } else if (diff < 0) {
                                diffBadge = `<span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">${diff} ${item.unit || 'ədəd'}</span>`;
                            } else {
                                diffBadge = `<span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">+${diff} ${item.unit || 'ədəd'}</span>`;
                            }

                            return `
                                <tr class="hover:bg-slate-50/50 transition">
                                    <td class="py-2.5 px-3">
                                        <div class="font-bold text-slate-900 text-xs">${item.name}</div>
                                        <div class="text-[11px] text-slate-400 mt-0.5">${item.sku || 'SKU yoxdur'}</div>
                                    </td>
                                    <td class="py-2.5 px-3 text-center font-semibold text-slate-700">
                                        ${item.systemStock} ${item.unit || 'ədəd'}
                                    </td>
                                    <td class="py-2.5 px-3 text-center">
                                        <div class="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5 shadow-2xs">
                                            <button type="button"
                                                    onclick="BusinessDashboardView.stepAuditItemQty('${item.productId}', -1)"
                                                    class="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/70 flex items-center justify-center font-bold text-xs shadow-2xs transition active:scale-90 cursor-pointer select-none"
                                                    title="Azalt">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
                                            </button>
                                            <input type="number"
                                                   id="auditItemQty_${item.productId}"
                                                   step="1"
                                                   min="0"
                                                   value="${item.physicalStock}"
                                                   oninput="BusinessDashboardView.onAuditItemQtyChange('${item.productId}', this.value)"
                                                   class="w-12 h-7 text-center bg-transparent border-0 text-slate-900 font-bold text-xs outline-none focus:ring-0">
                                            <button type="button"
                                                    onclick="BusinessDashboardView.stepAuditItemQty('${item.productId}', 1)"
                                                    class="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/70 flex items-center justify-center font-bold text-xs shadow-2xs transition active:scale-90 cursor-pointer select-none"
                                                    title="Artır">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14"/></svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="py-2.5 px-3 text-center" id="auditItemDiff_${item.productId}">
                                        ${diffBadge}
                                    </td>
                                    <td class="py-2.5 px-3 text-right">
                                        <button type="button" onclick="BusinessDashboardView.removeAuditItem('${item.productId}')" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="Siyahıdan çıxart">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    handleSaveAudit: function(e) {
        if (e) e.preventDefault();
        const whId = document.getElementById('auditFormWarehouse')?.value || 'wh_1';
        const date = document.getElementById('auditFormDate')?.value || new Date().toISOString().split('T')[0];
        const responsible = document.getElementById('auditFormResponsible')?.value?.trim() || 'İnventarizasiya komissiyası';
        const notes = document.getElementById('auditFormNotes')?.value?.trim() || '';

        const warehouses = this.getWarehouses();
        const whObj = warehouses.find(w => w.id === whId);
        const warehouseName = whObj ? whObj.name : 'Əsas anbar';

        if (!this.auditItems || this.auditItems.length === 0) {
            if (typeof App !== 'undefined') App.showToast("Sayım üçün ən azı 1 məhsul əlavə edilməlidir");
            return;
        }

        const allProducts = this.getProducts();
        const items = [];
        let discrepancyCount = 0;
        let discrepancyAmount = 0;

        this.auditItems.forEach(item => {
            const prod = allProducts.find(p => p.id === item.productId);
            if (!prod) return;

            const sysStock = parseInt(prod.stock) || 0;
            const physical = Math.max(0, parseInt(item.physicalStock) || 0);
            const diff = physical - sysStock;
            const cost = parseFloat(prod.costPrice) || 0;

            if (diff !== 0) {
                discrepancyCount += diff;
                discrepancyAmount += diff * cost;
            }

            prod.stock = physical;
            const min = parseInt(prod.minStock) || 3;
            if (physical <= 0) prod.status = 'out_of_stock';
            else if (physical <= min) prod.status = 'low_stock';
            else prod.status = 'in_stock';

            items.push({
                productId: item.productId,
                name: prod.name,
                systemStock: sysStock,
                physicalStock: physical,
                diff,
                unit: prod.unit || 'ədəd'
            });
        });

        this.saveProducts(allProducts);

        const docNum = 'INV-2026-' + Math.floor(100 + Math.random() * 900);
        const displayDate = this.formatDateDisplay(date);
        const newAudit = {
            id: 'aud_' + Date.now(),
            docNumber: docNum,
            date: displayDate,
            warehouseId: whId,
            warehouseName,
            responsible,
            itemsCount: items.length,
            discrepancyCount,
            discrepancyAmount: parseFloat(discrepancyAmount.toFixed(2)),
            status: 'completed',
            statusLabel: 'Tamamlandı',
            notes,
            items,
            createdAt: new Date().toISOString()
        };

        const audits = this.getInventoryAudits();
        audits.unshift(newAudit);
        this.saveInventoryAudits(audits);

        // Also add operation entry in inventory operations
        const operations = this.getInventoryOperations();
        operations.unshift({
            id: 'op_' + Date.now(),
            docNumber: docNum,
            type: 'audit',
            typeName: 'İnventarizasiya',
            date: displayDate,
            warehouseName,
            supplier: responsible,
            itemsCount: items.length,
            totalAmount: Math.abs(parseFloat(discrepancyAmount.toFixed(2))),
            status: 'completed',
            statusLabel: 'Tamamlandı',
            notes: notes || 'Planlı sayım tamamlandı',
            createdAt: new Date().toISOString()
        });
        this.saveInventoryOperations(operations);

        this.closeCreateAuditModal();
        if (typeof App !== 'undefined') App.showToast(`İnventarizasiya təsdiqləndi: ${docNum} (${items.length} məhsul)`);
        this.refreshProductsModule();
    },

    deleteInventoryAudit: function(audId) {
        const audits = this.getInventoryAudits();
        const aud = audits.find(a => a.id === audId);
        if (!aud) return;

        this.openDeleteConfirmModal({
            title: 'İnventarizasiya aktını sil',
            message: `<strong>"${aud.docNumber}"</strong> saylı inventarizasiya aktını silmək istədiyinizə əminsiniz?<br><span class="text-rose-500 mt-1.5 inline-block text-xs">Bu əməliyyat geri qaytarıla bilməz.</span>`,
            confirmText: 'Bəli, sil',
            onConfirm: () => {
                const updated = audits.filter(a => a.id !== audId);
                this.saveInventoryAudits(updated);
                if (typeof App !== 'undefined') App.showToast("İnventarizasiya aktı silindi");
                this.refreshProductsModule();
            }
        });
    },

    datePickerState: {},

    initCustomDatePicker: function(inputId, initialIsoDate) {
        if (!this.datePickerState) this.datePickerState = {};
        const todayIso = new Date().toISOString().split('T')[0];
        const hiddenInput = document.getElementById(inputId);
        const allowEmpty = !!(hiddenInput && hiddenInput.dataset.allowEmpty === '1');
        const existing = hiddenInput ? hiddenInput.value : '';
        const targetIso = initialIsoDate !== undefined && initialIsoDate !== null
            ? initialIsoDate
            : (existing || (allowEmpty ? '' : todayIso));

        const baseIso = targetIso || (hiddenInput && hiddenInput.dataset.defaultView) || todayIso;
        const parts = baseIso.split('-');
        const year = parseInt(parts[0], 10) || new Date().getFullYear();
        const parsedMonth = parseInt(parts[1], 10) - 1;
        const month = isNaN(parsedMonth) ? new Date().getMonth() : parsedMonth;

        this.datePickerState[inputId] = {
            year,
            month,
            selectedIso: targetIso,
            view: 'days',
            yearPageStart: year - (year % 12)
        };

        if (hiddenInput) hiddenInput.value = targetIso;

        const textSpan = document.getElementById(inputId + 'Text');
        if (textSpan) {
            if (targetIso) {
                textSpan.textContent = this.formatDateDisplay(targetIso);
                textSpan.classList.remove('text-slate-400');
            } else {
                textSpan.textContent = (hiddenInput && hiddenInput.dataset.placeholder) || 'Tarix seçin';
                textSpan.classList.add('text-slate-400');
            }
        }
    },

    /**
     * Shared Zeyvo date field markup (hidden input + trigger button + dropdown).
     * inputId MUST end with "Date" so global close handlers work.
     */
    renderZeyvoDateField: function(opts) {
        const o = Object.assign({ id: '', value: '', allowEmpty: false, placeholder: 'Tarix seçin', heightClass: 'h-10', bgClass: 'bg-slate-50', defaultView: '' }, opts || {});
        const val = o.value || '';
        const text = val ? this.formatDateDisplay(val) : o.placeholder;
        return `
            <div class="relative" id="${o.id}Wrapper">
                <input type="hidden" id="${o.id}" value="${val}" ${o.allowEmpty ? 'data-allow-empty="1"' : ''} data-placeholder="${this.escapeHtml(o.placeholder)}" ${o.defaultView ? `data-default-view="${o.defaultView}"` : ''}>
                <button type="button" id="${o.id}Display" onclick="BusinessDashboardView.toggleCustomDatePicker('${o.id}', event)" class="w-full ${o.heightClass} px-3.5 rounded-xl ${o.bgClass} border border-slate-200 text-slate-900 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition font-semibold text-xs flex items-center justify-between cursor-pointer text-left">
                    <span id="${o.id}Text" class="${val ? 'text-slate-900' : 'text-slate-400'} font-semibold truncate">${this.escapeHtml(text)}</span>
                    <svg class="w-4 h-4 text-slate-400 pointer-events-none shrink-0 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </button>
                <div id="${o.id}Dropdown" onclick="event.stopPropagation()" class="hidden absolute top-full left-0 mt-1.5 z-50 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200 shadow-2xl p-3.5 space-y-3"></div>
            </div>`;
    },

    /** Shared Zeyvo time field markup (readonly input opening the brand time picker). */
    renderZeyvoTimeField: function(opts) {
        const o = Object.assign({ id: '', value: '09:00', heightClass: 'h-10', bgClass: 'bg-slate-50', extraClass: 'w-full' }, opts || {});
        return `<input type="text" readonly id="${o.id}" value="${o.value}" onclick="BusinessDashboardView.openZeyvoTimePicker(this, this.id, 'input', this.value)" class="${o.extraClass} ${o.heightClass} px-3 rounded-xl ${o.bgClass} border border-slate-200 text-xs font-semibold text-slate-900 outline-none cursor-pointer focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 transition">`;
    },

    setCustomDatePickerView: function(inputId, view, event) {
        if (event) { event.stopPropagation(); event.preventDefault(); }
        if (!this.datePickerState || !this.datePickerState[inputId]) this.initCustomDatePicker(inputId);
        const st = this.datePickerState[inputId];
        st.view = view;
        st.yearPageStart = st.year - (st.year % 12);
        this.renderCustomDatePickerPopup(inputId);
    },

    shiftCustomDatePickerYears: function(inputId, delta, event) {
        if (event) { event.stopPropagation(); event.preventDefault(); }
        const st = this.datePickerState && this.datePickerState[inputId];
        if (!st) return;
        st.yearPageStart += delta * 12;
        this.renderCustomDatePickerPopup(inputId);
    },

    pickCustomDatePickerYear: function(inputId, year, event) {
        if (event) { event.stopPropagation(); event.preventDefault(); }
        const st = this.datePickerState && this.datePickerState[inputId];
        if (!st) return;
        st.year = year;
        st.view = 'months';
        this.renderCustomDatePickerPopup(inputId);
    },

    pickCustomDatePickerMonth: function(inputId, month, event) {
        if (event) { event.stopPropagation(); event.preventDefault(); }
        const st = this.datePickerState && this.datePickerState[inputId];
        if (!st) return;
        st.month = month;
        st.view = 'days';
        this.renderCustomDatePickerPopup(inputId);
    },

    clearCustomDate: function(inputId, event) {
        if (event) { event.stopPropagation(); event.preventDefault(); }
        const hiddenInput = document.getElementById(inputId);
        if (hiddenInput) hiddenInput.value = '';
        if (this.datePickerState && this.datePickerState[inputId]) this.datePickerState[inputId].selectedIso = '';
        const textSpan = document.getElementById(inputId + 'Text');
        if (textSpan) {
            textSpan.textContent = (hiddenInput && hiddenInput.dataset.placeholder) || 'Tarix seçin';
            textSpan.classList.add('text-slate-400');
        }
        const dropdown = document.getElementById(inputId + 'Dropdown');
        if (dropdown) dropdown.classList.add('hidden');
    },

    toggleCustomDatePicker: function(inputId, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        const dropdown = document.getElementById(inputId + 'Dropdown');
        if (!dropdown) return;

        const isCurrentlyHidden = dropdown.classList.contains('hidden');
        this.closeAllCustomDatePickers();

        if (isCurrentlyHidden) {
            this.initCustomDatePicker(inputId);
            this.renderCustomDatePickerPopup(inputId);
            dropdown.classList.remove('hidden');

            // Dynamic boundary check to prevent clipping by parent scroll container or viewport
            requestAnimationFrame(() => {
                const parentModal = dropdown.closest('.overflow-y-auto') || dropdown.closest('[id$="Modal"]');
                const rect = dropdown.getBoundingClientRect();
                const boundaryRight = parentModal ? parentModal.getBoundingClientRect().right - 10 : window.innerWidth - 10;
                if (rect.right > boundaryRight) {
                    dropdown.classList.remove('left-0');
                    dropdown.classList.add('right-0');
                }
            });
        }
    },

    closeAllCustomDatePickers: function() {
        document.querySelectorAll('[id$="DateDropdown"]').forEach(el => {
            el.classList.add('hidden');
        });
    },

    changeCustomDatePickerMonth: function(inputId, delta, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (!this.datePickerState) this.datePickerState = {};
        if (!this.datePickerState[inputId]) {
            this.initCustomDatePicker(inputId);
        }
        const state = this.datePickerState[inputId];
        state.month += delta;
        if (state.month < 0) {
            state.month = 11;
            state.year -= 1;
        } else if (state.month > 11) {
            state.month = 0;
            state.year += 1;
        }
        this.renderCustomDatePickerPopup(inputId);
    },

    selectCustomDate: function(inputId, isoDate, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        const hiddenInput = document.getElementById(inputId);
        if (hiddenInput) hiddenInput.value = isoDate;

        const textSpan = document.getElementById(inputId + 'Text');
        if (textSpan) {
            textSpan.textContent = this.formatDateDisplay(isoDate);
            textSpan.classList.remove('text-slate-400');
        }

        if (!this.datePickerState) this.datePickerState = {};
        if (!this.datePickerState[inputId]) {
            this.initCustomDatePicker(inputId, isoDate);
        } else {
            this.datePickerState[inputId].selectedIso = isoDate;
            const parts = isoDate.split('-');
            this.datePickerState[inputId].year = parseInt(parts[0], 10);
            this.datePickerState[inputId].month = parseInt(parts[1], 10) - 1;
        }

        if (this.tempOpFilters) {
            if (inputId === 'opFilterStartDate') this.tempOpFilters.startDate = isoDate;
            if (inputId === 'opFilterEndDate') this.tempOpFilters.endDate = isoDate;
        }

        const dropdown = document.getElementById(inputId + 'Dropdown');
        if (dropdown) dropdown.classList.add('hidden');
    },

    selectCustomDateToday: function(inputId, event) {
        const todayIso = new Date().toISOString().split('T')[0];
        this.selectCustomDate(inputId, todayIso, event);
    },

    renderCustomDatePickerPopup: function(inputId) {
        const dropdown = document.getElementById(inputId + 'Dropdown');
        if (!dropdown) return;

        if (!this.datePickerState) this.datePickerState = {};
        if (!this.datePickerState[inputId]) {
            this.initCustomDatePicker(inputId);
        }

        const state = this.datePickerState[inputId];
        const monthNames = [
            'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
            'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
        ];
        const dayNames = ['B.e', 'Ç.a', 'Ç.', 'C.a', 'C.', 'Ş.', 'B.'];
        const hiddenEl = document.getElementById(inputId);
        const allowEmpty = !!(hiddenEl && hiddenEl.dataset.allowEmpty === '1');
        const navBtn = (onclick, title, path) => `
            <button type="button" onclick="${onclick}" class="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 transition cursor-pointer" title="${title}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="${path}"/></svg>
            </button>`;

        if (state.view === 'years' || state.view === 'months') {
            const selYear = state.selectedIso ? parseInt(state.selectedIso.slice(0, 4), 10) : null;
            const selMonth = state.selectedIso ? parseInt(state.selectedIso.slice(5, 7), 10) - 1 : null;
            const nowYear = new Date().getFullYear();
            let header, grid;
            if (state.view === 'years') {
                const start = state.yearPageStart;
                header = `
                    <span class="font-bold text-xs text-slate-900">${start} – ${start + 11}</span>
                    <div class="flex items-center gap-1">
                        ${navBtn(`BusinessDashboardView.shiftCustomDatePickerYears('${inputId}', -1, event)`, 'Əvvəlki illər', 'M15 19l-7-7 7-7')}
                        ${navBtn(`BusinessDashboardView.shiftCustomDatePickerYears('${inputId}', 1, event)`, 'Növbəti illər', 'M9 5l7 7-7 7')}
                    </div>`;
                grid = Array.from({ length: 12 }, (_, i) => start + i).map(y => `
                    <button type="button" onclick="BusinessDashboardView.pickCustomDatePickerYear('${inputId}', ${y}, event)" class="h-10 rounded-xl text-xs transition cursor-pointer active:scale-95 ${y === selYear ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-2xs' : (y === nowYear ? 'border border-amber-300 bg-amber-50/70 text-slate-900 font-bold hover:bg-amber-100' : 'text-slate-700 hover:bg-slate-100 font-medium')}">${y}</button>`).join('');
            } else {
                header = `
                    <button type="button" onclick="BusinessDashboardView.setCustomDatePickerView('${inputId}', 'years', event)" class="font-bold text-xs text-slate-900 hover:text-amber-700 transition cursor-pointer flex items-center gap-1">
                        <span>${state.year}</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                    </button>`;
                grid = monthNames.map((mn, i) => `
                    <button type="button" onclick="BusinessDashboardView.pickCustomDatePickerMonth('${inputId}', ${i}, event)" class="h-10 rounded-xl text-xs transition cursor-pointer active:scale-95 ${(state.year === selYear && i === selMonth) ? 'bg-[#FFDD2D] text-[#101114] font-bold shadow-2xs' : 'text-slate-700 hover:bg-slate-100 font-medium'}">${mn}</button>`).join('');
            }
            dropdown.innerHTML = `
                <div class="flex items-center justify-between pb-2 border-b border-slate-100">${header}</div>
                <div class="grid grid-cols-3 gap-1.5">${grid}</div>
                <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button type="button" onclick="BusinessDashboardView.setCustomDatePickerView('${inputId}', 'days', event)" class="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer">Günlərə qayıt</button>
                    ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeAllCustomDatePickers()", size: "md", type: "button" })}
                </div>
            `;
            return;
        }

        const curYear = state.year;
        const curMonth = state.month;
        const selectedIso = state.selectedIso;
        const todayIso = new Date().toISOString().split('T')[0];

        // First day of month (0 = Sun, 1 = Mon, ..., 6 = Sat)
        const firstDayOfWeek = new Date(curYear, curMonth, 1).getDay();
        // Convert to Mon-based index (0 = Mon, ..., 6 = Sun)
        const startDayIndex = (firstDayOfWeek + 6) % 7;

        // Days in current month
        const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
        // Days in previous month
        const daysInPrevMonth = new Date(curYear, curMonth, 0).getDate();

        let daysHtml = '';

        // Previous month filler days
        for (let i = startDayIndex - 1; i >= 0; i--) {
            const d = daysInPrevMonth - i;
            daysHtml += `<div class="h-8 flex items-center justify-center text-xs text-slate-300 font-normal select-none">${d}</div>`;
        }

        // Current month days
        for (let d = 1; d <= daysInMonth; d++) {
            const mStr = String(curMonth + 1).padStart(2, '0');
            const dStr = String(d).padStart(2, '0');
            const thisIso = `${curYear}-${mStr}-${dStr}`;

            const isSelected = thisIso === selectedIso;
            const isToday = thisIso === todayIso;

            let cellClasses = 'h-8 flex items-center justify-center text-xs rounded-xl cursor-pointer transition select-none ';
            if (isSelected) {
                cellClasses += 'bg-[#FFDD2D] text-[#101114] font-bold shadow-2xs active:scale-95';
            } else if (isToday) {
                cellClasses += 'border border-amber-300 bg-amber-50/70 text-slate-900 font-bold hover:bg-amber-100 active:scale-95';
            } else {
                cellClasses += 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium active:scale-95';
            }

            daysHtml += `<button type="button" onclick="BusinessDashboardView.selectCustomDate('${inputId}', '${thisIso}', event)" class="${cellClasses}">${d}</button>`;
        }

        // Next month filler days to complete 7 columns grid rows
        const totalCells = startDayIndex + daysInMonth;
        const remainingCells = (7 - (totalCells % 7)) % 7;
        for (let d = 1; d <= remainingCells; d++) {
            daysHtml += `<div class="h-8 flex items-center justify-center text-xs text-slate-300 font-normal select-none">${d}</div>`;
        }

        dropdown.innerHTML = `
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                <button type="button" onclick="BusinessDashboardView.setCustomDatePickerView('${inputId}', 'months', event)" class="font-bold text-xs text-slate-900 hover:text-amber-700 transition cursor-pointer flex items-center gap-1" title="Ay və il seçin">
                    <span>${monthNames[curMonth]} ${curYear}</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div class="flex items-center gap-1">
                    <button type="button" onclick="BusinessDashboardView.changeCustomDatePickerMonth('${inputId}', -1, event)" class="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 transition cursor-pointer" title="Əvvəlki ay">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button type="button" onclick="BusinessDashboardView.changeCustomDatePickerMonth('${inputId}', 1, event)" class="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 transition cursor-pointer" title="Növbəti ay">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 py-0.5">
                ${dayNames.map(dn => `<div>${dn}</div>`).join('')}
            </div>
            <div class="grid grid-cols-7 gap-1">
                ${daysHtml}
            </div>
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button type="button" onclick="BusinessDashboardView.selectCustomDateToday('${inputId}', event)" class="px-2.5 py-1 text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition cursor-pointer">Bugün</button>
                ${allowEmpty ? `<button type="button" onclick="BusinessDashboardView.clearCustomDate('${inputId}', event)" class="px-2.5 py-1 text-[11px] font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer">Təmizlə</button>` : ''}
                ${ZeyvoUI.button({ label: "Bağla", variant: "secondary", onClick: "BusinessDashboardView.closeAllCustomDatePickers()", size: "md", type: "button" })}
            </div>
        `;
    },

    // ==========================================
});
