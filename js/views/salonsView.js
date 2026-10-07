// ========================================================
// SALONS / CATALOG VIEW: DIKIDI STYLE 2-COLUMN CATALOG WITH FILTERS
// ========================================================
const SalonsView = {
    render: function(params = {}) {
        // Resolve active category and subcategory from route params
        const catId = params.category || App.currentTopCategory || 'beauty';
        const subId = params.subcategory || params.sub || App.currentSubcategory || 'all';
        App.currentTopCategory = catId;
        App.currentSubcategory = subId;

        const activeCat = ZeyvoData.topCategories.find(c => c.id === catId) || ZeyvoData.topCategories[0];
        const activeSub = activeCat.subcategories.find(s => s.id === subId) || activeCat.subcategories[0];
        const isAllSub = (!activeSub || activeSub.id === 'all');

        const pageTitle = isAllSub 
            ? `${activeCat.azName} — Bakı` 
            : `${activeSub.azName || activeSub.name} — Bakı`;

        return `
            <div class="space-y-4 pb-10">
                <!-- Top Category Selector Bar -->
                <section id="category-selector-section" class="pt-2">
                    ${HomeView.renderCategorySection()}
                </section>

                <!-- Breadcrumbs -->
                <nav class="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <a href="#/" class="hover:text-tbank-graphite hover:underline">Əsas səhifə</a>
                    <span>›</span>
                    <a href="#/catalog" class="hover:text-tbank-graphite hover:underline">Kataloq</a>
                    <span>›</span>
                    <a href="#/catalog/${activeCat.id}" class="text-tbank-graphite font-bold hover:underline">${activeCat.title}</a>
                    ${!isAllSub ? `<span>›</span><span class="text-tbank-graphite font-black">${activeSub.azName || activeSub.name}</span>` : ''}
                </nav>


                <!-- Page Header with Subcategory Image Rail -->
                <div class="bg-white p-4 sm:p-6 rounded-3xl border border-tbank-border/80 shadow-sm space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <div class="flex items-center gap-2.5">
                                <h1 class="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-tbank-graphite">
                                    ${pageTitle}
                                </h1>
                                <span id="catalogItemsCountBadge" class="bg-black/[0.06] text-tbank-graphite font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                                    Yüklənir...
                                </span>
                            </div>
                            <p class="text-xs text-slate-500 mt-1 font-medium">Bakıda peşəkar məkanlar və fərdi ustalar üçün zəngsiz onlayn rezervasiya</p>
                        </div>

                        <!-- Mobile Filter Button (Quick Trigger) -->
                        <div class="lg:hidden flex items-center gap-2">
                            <button onclick="App.openFilterModal()" class="flex-1 h-9 px-4 rounded-xl bg-tbank-graphite text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
                                <span>Filtrlər</span>
                                <span id="mobileActiveFiltersCount" class="w-4 h-4 rounded-full bg-white text-tbank-graphite text-[10px] font-black inline-flex items-center justify-center hidden">0</span>
                            </button>
                            <select onchange="App.sortCatalog(this.value)" class="h-9 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-tbank-graphite outline-none">
                                <option value="default">Sırala</option>
                                <option value="rating">Reytinqə görə</option>
                                <option value="price">Qiymətə görə</option>
                            </select>
                        </div>
                    </div>

                    <!-- Subcategories with Pictures (Visual Selection Rail) -->
                    <div class="pt-2 border-t border-slate-100">
                        <div class="text-xs font-bold text-slate-400 mb-2">
                            Alt-kateqoriyalar (${activeCat.subcategories.length})
                        </div>
                        <div class="flex items-center gap-2.5 overflow-x-auto no-scrollbar touch-snap-x pt-1.5 pb-2 -mx-2 px-2">
                            <!-- All Services Pill -->
                            <div onclick="Router.navigate('/catalog/${activeCat.id}/all')" 
                                 class="subcat-card touch-snap-start shrink-0 w-[92px] sm:w-[104px] p-2 rounded-2xl bg-white border cursor-pointer transition text-center group shadow-sm flex flex-col items-center justify-between ${isAllSub ? 'border-tbank-graphite bg-tbank-yellow/25 shadow-md ring-2 ring-tbank-yellow' : 'border-slate-200/90 hover:border-slate-300'}">
                                <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden mb-1.5 bg-gradient-to-br from-slate-800 to-slate-900 shadow-inner shrink-0 relative flex items-center justify-center text-white font-black text-xs">
                                    Hamısı
                                </div>
                                <div class="text-[10px] font-bold text-tbank-graphite leading-tight line-clamp-2 w-full">
                                    Bütün xidmətlər
                                </div>
                            </div>
                            ${activeCat.subcategories.map(sub => {
                                const isSubActive = (sub.id === subId);
                                return `
                                    <div onclick="Router.navigate('/catalog/${activeCat.id}/${sub.id}')" 
                                         class="subcat-card touch-snap-start shrink-0 w-[92px] sm:w-[104px] p-2 rounded-2xl bg-white border cursor-pointer transition text-center group shadow-sm flex flex-col items-center justify-between ${isSubActive ? 'border-tbank-graphite bg-tbank-yellow/25 shadow-md ring-2 ring-tbank-yellow' : 'border-slate-200/90 hover:border-slate-300'}">
                                        
                                        <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden mb-1.5 bg-slate-100 shadow-inner shrink-0 relative">
                                            <img src="${sub.image}" alt="${sub.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                                        </div>

                                        <div class="text-[10px] font-bold text-tbank-graphite leading-tight line-clamp-2 w-full">
                                            ${sub.azName || sub.name}
                                        </div>
                                    </div>
                                `;
                            }).join('')}


                        </div>
                    </div>
                </div>

                <!-- Main Content 2-Column Grid: LEFT (Cards) + RIGHT (DIKIDI Filter Sidebar) -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <!-- LEFT: 2-Column Cards Grid (Companies & Specialists) -->
                    <main class="lg:col-span-8 space-y-4">
                        <div id="catalogCardsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <!-- Populated dynamically by App.renderCatalogList -->
                        </div>

                        <!-- Load More / Pagination Button -->
                        <div id="catalogLoadMoreContainer" class="pt-4 text-center">
                            <button onclick="App.loadMoreCatalogItems()" class="px-8 py-2.5 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition inline-flex items-center gap-2">
                                <span>Daha çox göstər</span>
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                            </button>
                        </div>
                    </main>

                    <!-- RIGHT: Desktop Filter Sidebar (Exact DIKIDI layout from Screenshot) -->
                    <aside class="hidden lg:block lg:col-span-4 sticky top-20 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-5">
                        
                        <!-- Search Box -->
                        <div>
                            <label class="text-xs font-bold text-slate-400 block mb-1.5">Axtarış</label>
                            <div class="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3 gap-2">
                                <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
                                <input id="catalogSearchInput" type="text" placeholder="Xidmət, salon və ya usta..." class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none placeholder:text-slate-400" oninput="App.handleCatalogSearch(this.value)">
                            </div>
                        </div>

                        <!-- Sort By -->
                        <div>
                            <label class="text-xs font-bold text-slate-400 block mb-1.5">Sırala</label>
                            <select id="catalogSortSelect" onchange="App.sortCatalog(this.value)" class="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-tbank-graphite outline-none">
                                <option value="default">Populyarlığa görə</option>
                                <option value="rating">Reytinqə görə (yüksəkdən)</option>
                                <option value="price">Qiymətə görə (ucuzdan)</option>
                            </select>
                        </div>

                        <!-- City -->
                        <div>
                            <div class="flex items-center justify-between mb-1.5">
                                <label class="text-xs font-bold text-slate-400">Şəhər</label>
                                <button onclick="App.openCityModal()" class="text-xs font-black text-tbank-graphite hover:underline">Dəyiş</button>
                            </div>
                            <div class="flex items-center gap-2 text-xs font-bold text-tbank-graphite bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                                <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span id="catalogCityName">Bakı</span>
                            </div>
                        </div>

                        <!-- Active Category Chip -->
                        <div>
                            <div class="flex items-center justify-between mb-1.5">
                                <label class="text-xs font-bold text-slate-400">Kateqoriya</label>
                                <button onclick="App.openCategorySelectModal()" class="text-xs font-black text-tbank-graphite hover:underline">Kateqoriya seçin</button>
                            </div>
                            <div class="flex items-center justify-between p-2.5 rounded-xl bg-tbank-yellow/20 border border-tbank-yellow/60 text-tbank-graphite text-xs font-bold">
                                <span class="truncate pr-2">${activeCat.title}${!isAllSub ? `: ${activeSub.azName || activeSub.name}` : ''}</span>
                                <button onclick="App.resetCatalogCategory()" class="text-slate-500 hover:text-black p-0.5 shrink-0" title="Təmizlə"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                            </div>
                        </div>

                        <!-- Checkboxes: VIP & Awards -->
                        <div class="space-y-2.5 pt-1 border-t border-slate-100">
                            <label class="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-tbank-graphite select-none">
                                <input type="checkbox" id="filterVipDesktop" onchange="App.toggleFilterParam('vip', this.checked)" class="w-4 h-4 rounded border-slate-300 accent-amber-400">
                                <span>VIP status</span>
                            </label>
                            <label class="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-tbank-graphite select-none">
                                <input type="checkbox" id="filterAwardsDesktop" onchange="App.toggleFilterParam('awards', this.checked)" class="w-4 h-4 rounded border-slate-300 accent-amber-400">
                                <span>Zeyvo Mükafat Qalibləri</span>
                            </label>
                        </div>


                        <!-- Radio Type: All / Companies only / Only specialists -->
                        <div class="space-y-2 pt-1 border-t border-slate-100">
                            <label class="text-xs font-bold text-slate-400 block mb-1">Məkan növü</label>
                            <label class="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-tbank-graphite select-none">
                                <input type="radio" name="catalogTypeFilterDesktop" value="all" checked onchange="App.setCatalogTypeFilter(this.value)" class="w-4 h-4 border-slate-300 accent-amber-400">
                                <span>Hamısı</span>
                            </label>
                            <label class="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-tbank-graphite select-none">
                                <input type="radio" name="catalogTypeFilterDesktop" value="companies" onchange="App.setCatalogTypeFilter(this.value)" class="w-4 h-4 border-slate-300 accent-amber-400">
                                <span>Yalnız şirkətlər / salonlar</span>
                            </label>
                            <label class="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-tbank-graphite select-none">
                                <input type="radio" name="catalogTypeFilterDesktop" value="masters" onchange="App.setCatalogTypeFilter(this.value)" class="w-4 h-4 border-slate-300 accent-amber-400">
                                <span>Yalnız fərdi ustalar</span>
                            </label>
                        </div>


                        <!-- Mini Map Preview Widget -->
                        <div class="pt-2 border-t border-slate-100">
                            <div class="relative h-28 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group" onclick="App.showOnMap()">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90" alt="Map Preview">
                                <div class="absolute inset-0 bg-black/25 flex items-center justify-center">
                                    <span class="px-3.5 py-1.5 rounded-xl bg-white text-tbank-graphite font-black text-xs shadow-md flex items-center gap-1.5">
                                        <svg class="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/></svg>
                                        <span>Xəritədə göstər</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>

            <!-- Mobile Bottom Sheet Filter Modal -->
            <div id="catalogMobileFilterModal" class="hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 modal-fade">
                <div class="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 mobile-sheet space-y-4 max-h-[85vh] overflow-y-auto">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div class="font-black text-base text-tbank-graphite">Filtrlər</div>
                        <button onclick="App.closeFilterModal()" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center" title="Bağla"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
                    </div>

                    <!-- Search -->
                    <div>
                        <label class="text-xs font-bold text-slate-400 block mb-1">Axtarış</label>
                        <input id="mobileFilterSearch" type="text" placeholder="Xidmət, salon və ya usta..." class="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold" oninput="App.handleCatalogSearch(this.value)">
                    </div>

                    <!-- Checkboxes -->
                    <div class="space-y-3 pt-2">
                        <label class="flex items-center gap-2.5 text-xs font-bold text-tbank-graphite">
                            <input type="checkbox" id="filterVipMobile" onchange="App.toggleFilterParam('vip', this.checked)" class="w-4 h-4 rounded border-slate-300 accent-amber-400">
                            <span>VIP status</span>
                        </label>
                        <label class="flex items-center gap-2.5 text-xs font-bold text-tbank-graphite">
                            <input type="checkbox" id="filterAwardsMobile" onchange="App.toggleFilterParam('awards', this.checked)" class="w-4 h-4 rounded border-slate-300 accent-amber-400">
                            <span>Zeyvo Mükafat Qalibləri</span>
                        </label>

                    </div>

                    <!-- Type Filter -->
                    <div class="space-y-2 pt-2 border-t border-slate-100">
                        <label class="text-xs font-bold text-slate-400 block">Məkan növü</label>
                        <label class="flex items-center gap-2 text-xs font-bold text-tbank-graphite">
                            <input type="radio" name="mobileTypeFilter" value="all" checked onchange="App.setCatalogTypeFilter(this.value)" class="w-4 h-4 border-slate-300 accent-amber-400">
                            <span>Hamısı</span>
                        </label>
                        <label class="flex items-center gap-2 text-xs font-bold text-tbank-graphite">
                            <input type="radio" name="mobileTypeFilter" value="companies" onchange="App.setCatalogTypeFilter(this.value)" class="w-4 h-4 border-slate-300 accent-amber-400">
                            <span>Yalnız şirkətlər / salonlar</span>
                        </label>
                        <label class="flex items-center gap-2 text-xs font-bold text-tbank-graphite">
                            <input type="radio" name="mobileTypeFilter" value="masters" onchange="App.setCatalogTypeFilter(this.value)" class="w-4 h-4 border-slate-300 accent-amber-400">
                            <span>Yalnız fərdi ustalar</span>
                        </label>
                    </div>

                    <div class="pt-4">
                        <button onclick="App.closeFilterModal()" class="w-full h-11 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition">
                            Tətbiq et və nəticələrə bax
                        </button>
                    </div>

                </div>
            </div>
        `;
    },

    afterRender: function() {
        App.initCategoryScrollSync();
        App.renderCatalogList();
    }
};
