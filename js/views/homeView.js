// ========================================================
// HOME VIEW: MOBILE-FIRST COMPACT SWIPE RAILS & DYNAMIC VIEWS
// ========================================================
const HomeView = {
    renderCategoryIcon: function(categoryId) {
        const paths = {
            beauty: '<circle cx="8" cy="8" r="3"/><path d="M8 11v8M5 16h6M16 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm2-2 3-3m-3 0h3v3"/>',
            health: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/><path d="M7 12h3l1.5-3 2 6 1.5-3h2"/>',
            auto: '<path d="m5 11 1.5-5h11l1.5 5M3 11h18v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z"/><circle cx="7" cy="14" r="1.5"/><circle cx="17" cy="14" r="1.5"/>',
            entertainment: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m15 9 6-6m-3 0h3v3"/>',
            services: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18M10 13v2h4v-2"/>',
            education: '<path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11.5V17c2.5 2 9.5 2 12 0v-5.5M22 9v6"/>',
            rent: '<path d="M4 8.5 12 4l8 4.5V20H4V8.5Z"/><path d="M8 20v-7h8v7M9 9h6"/>',
            other: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
            sport: '<path d="m6.5 6.5 11 11M5 9 3 7l4-4 2 2m6 14 2 2 4-4-2-2M8 4l2 2m8 8 2 2M4 8l2 2m8 8 2 2"/>',
            animals: '<path d="M12 12c-2.4 0-4.5 2-4.5 4.5S9.6 20 12 20s4.5-1 4.5-3.5S14.4 12 12 12Z"/><ellipse cx="5.5" cy="10" rx="2" ry="2.5"/><ellipse cx="18.5" cy="10" rx="2" ry="2.5"/><ellipse cx="9.5" cy="5.5" rx="1.8" ry="2.2"/><ellipse cx="14.5" cy="5.5" rx="1.8" ry="2.2"/>',
            restaurants: '<path d="M7 3v7a3 3 0 0 1-3 3V3m3 0v18M18 3v18m0-10a3 3 0 0 0 3-3V3"/>',
            style: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3M8 10h3M8 14h3"/>',
            lawyers: '<path d="M12 3v18M4 7h16M7 21h10M4 7l-3 7h6L4 7Zm16 0-3 7h6l-3-7Z"/>'
        };
        const content = paths[categoryId] || paths.other;
        return `<span class="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 text-tbank-graphite flex items-center justify-center shrink-0"><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">${content}</svg></span>`;
    },

    render: function() {
        const activeCat = ZeyvoData.topCategories.find(c => c.id === App.currentTopCategory) || ZeyvoData.topCategories[0];

        return `
            <!-- Top Category Selector Bar (Mobile-first Swipe Rail / Desktop Grid) -->
            <section id="category-selector-section" class="pt-3 sm:pt-5 mb-3 sm:mb-4">
                ${this.renderCategorySection()}
            </section>

            <!-- Sub-navigation Bar (Azerbaijani) -->
            <div class="flex items-center gap-2 overflow-x-auto no-scrollbar touch-snap-x py-1 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0">
                <button onclick="App.openRecommended()" class="h-8 sm:h-9 px-4 rounded-xl bg-tbank-graphite text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 shrink-0">
                    <span>Tövsiyə olunan</span>
                </button>
                <a href="#/catalog/${activeCat.id}" class="h-8 sm:h-9 px-4 rounded-xl bg-black/[0.05] hover:bg-black/[0.08] text-slate-700 font-bold text-xs flex items-center gap-1.5 shrink-0 transition">
                    <span>Kataloq</span>
                </a>
                <button onclick="App.openOffers()" class="h-8 sm:h-9 px-4 rounded-xl bg-black/[0.05] hover:bg-black/[0.08] text-slate-700 font-bold text-xs flex items-center gap-1.5 shrink-0 transition">
                    <span>Təkliflər</span>
                </button>
                <button onclick="App.showOnMap()" class="h-8 sm:h-9 px-4 rounded-xl bg-black/[0.05] hover:bg-black/[0.08] text-slate-700 font-bold text-xs flex items-center gap-1.5 shrink-0 transition">
                    <span>Xəritədə</span>
                </button>
                <button onclick="App.openFavoritesModal()" class="h-8 sm:h-9 px-4 rounded-xl bg-black/[0.05] hover:bg-black/[0.08] text-slate-700 font-bold text-xs flex items-center gap-1.5 shrink-0 transition">
                    <svg class="w-3.5 h-3.5 text-rose-500 fill-rose-500" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span>Sevimlilər</span>
                </button>
                <button onclick="App.openBookingsModal()" class="h-8 sm:h-9 px-4 rounded-xl bg-black/[0.05] hover:bg-black/[0.08] text-slate-700 font-bold text-xs flex items-center gap-1.5 shrink-0 transition">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    <span>Yazılarım</span>
                </button>
            </div>

            <!-- Categories Section (5-column Photo Cards Grid) -->
            <section class="mb-7 sm:mb-9">
                <div class="mb-3.5">
                    <div>
                        <div class="flex flex-wrap items-center gap-2">
                            <h2 class="text-xl sm:text-2xl font-black text-tbank-graphite tracking-tight">
                                Kateqoriyalar
                            </h2>
                            <span id="dynamicSubcatBadge" class="bg-black/[0.06] text-tbank-graphite font-bold text-xs px-2.5 py-0.5 rounded-full">
                                ${activeCat.azName}
                            </span>
                        </div>
                        <p id="dynamicSubcatSubtitle" class="text-xs text-slate-500 font-medium mt-0.5">
                            Xidmət üzrə mütəxəssislər və salonlar tapın
                        </p>
                    </div>

                </div>


                <!-- 5-column Photo Grid -->
                <div id="subcategoriesContainer" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5">
                    ${this.renderSubcategoriesHtml(activeCat)}
                </div>
            </section>

            <!-- Dynamic Places Catalog Section -->
            <section id="salons" class="fade-in-swap space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                        <div class="flex items-center gap-2">
                            <h2 id="dynamicCatalogTitle" class="text-lg sm:text-2xl font-black tracking-tight text-tbank-graphite">
                                ${activeCat.azName} məkanları
                            </h2>
                            <span id="catalogCount" class="bg-black/[0.06] text-tbank-graphite font-bold text-xs px-2 py-0.5 rounded-full">
                                0 məkan
                            </span>
                        </div>
                        <p id="dynamicCatalogSubtitle" class="text-xs text-slate-500 mt-0.5 font-medium">Onlayn rezervasiya və zəngsiz dərhal təsdiqləmə</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <select id="sortSelect" onchange="App.sortSalons(this.value)" class="h-9 rounded-xl bg-white border border-tbank-border text-xs font-bold text-tbank-graphite outline-none shadow-sm hover:border-slate-300 transition">
                            <option value="default">Populyarlığa görə</option>
                            <option value="rating">Reytinqə görə (yüksəkdən)</option>
                            <option value="price">Qiymətə görə (ucuzdan)</option>
                        </select>
                    </div>
                </div>

                <div id="salonsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    <!-- Populated dynamically by App.renderSalons -->
                </div>
            </section>

            <!-- Dynamic Top Specialists for Active Category -->
            <section class="pt-2 fade-in-swap space-y-3">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 id="dynamicMastersTitle" class="text-lg sm:text-xl font-black tracking-tight text-tbank-graphite">
                            Seçilmiş mütəxəssislər (${activeCat.title})
                        </h2>
                        <p class="text-xs text-slate-500 font-medium">Müştərilərin ən çox tövsiyə etdiyi peşəkarlar</p>
                    </div>
                    <a href="#/masters" class="text-xs font-bold text-tbank-graphite hover:underline shrink-0">
                        Bütün ustalar →
                    </a>

                </div>

                <!-- Responsive Grid: 1 col on mobile, 2 sm, 4 lg -->
                <div id="mastersGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <!-- Populated dynamically by App.renderMasters -->
                </div>
            </section>

            <!-- Popular Networks / Brands (Mobile Scroll Rail) -->
            <section class="pt-2 space-y-3">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-lg sm:text-xl font-black tracking-tight text-tbank-graphite">Populyar şəbəkələr</h2>
                        <p class="text-xs text-slate-500 font-medium">Bakının aparıcı brend mərkəzləri</p>
                    </div>
                </div>

                <div class="flex gap-2.5 overflow-x-auto no-scrollbar touch-snap-x pt-2 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-6">
                    ${ZeyvoData.brands.map(b => `
                        <div onclick="App.searchService('${b.name.split(' ')[0]}')" class="brand-card touch-snap-start shrink-0 w-[130px] sm:w-auto p-3.5 rounded-2xl bg-white border border-tbank-border/70 cursor-pointer transition text-center shadow-sm">
                            <div class="w-11 h-11 mx-auto rounded-xl ${b.bg} ${b.text} flex items-center justify-center font-black text-[11px]">
                                ${b.label}
                            </div>
                            <div class="mt-2 font-bold text-xs text-tbank-graphite truncate">${b.name}</div>
                            <div class="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
                                <svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${b.rating} • ${b.tag}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderCategoryCard: function(cat, isActive) {
        const activeClass = isActive 
            ? 'bg-tbank-yellow text-tbank-graphite shadow-md border border-tbank-yellow ring-2 ring-tbank-graphite/10'
            : 'bg-white border border-slate-200/90 hover:border-slate-300 text-slate-700 shadow-sm';
            
        const titleColor = 'text-tbank-graphite';

        return `
            <div onclick="App.selectTopCategory('${cat.id}')" 
                 class="cat-card touch-snap-start shrink-0 w-[84px] sm:w-auto cursor-pointer rounded-2xl p-2 sm:p-3 text-center flex flex-col items-center justify-center gap-2 min-h-[78px] sm:min-h-[96px] relative transition-all duration-200 ${activeClass}">
                <div class="mt-1 flex items-center justify-center scale-90 sm:scale-100">
                    ${this.renderCategoryIcon(cat.id)}
                </div>
                <div class="mt-1 text-center w-full">
                    <div class="cat-title text-[9.5px] sm:text-xs font-bold truncate ${titleColor}">
                        ${cat.title}
                    </div>
                </div>
            </div>
        `;
    },

    renderDahaCoxCard: function() {
        return `
            <div onclick="App.toggleCategoriesExpand()" 
                 class="cat-card touch-snap-start shrink-0 w-[84px] sm:w-auto cursor-pointer bg-tbank-graphite hover:bg-black text-white rounded-2xl p-2 sm:p-3 border border-tbank-graphite text-center flex flex-col items-center justify-center gap-2 min-h-[78px] sm:min-h-[96px] shadow-sm transition-all duration-200 hover:shadow-md">
                <div class="mt-1 flex items-center justify-center scale-90 sm:scale-100">
                    <span class="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 text-tbank-graphite flex items-center justify-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="4" height="4" rx="1"/><rect x="10" y="4" width="4" height="4" rx="1"/><rect x="16" y="4" width="4" height="4" rx="1"/><rect x="4" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/><rect x="16" y="10" width="4" height="4" rx="1"/><rect x="4" y="16" width="4" height="4" rx="1"/><rect x="10" y="16" width="4" height="4" rx="1"/><rect x="16" y="16" width="4" height="4" rx="1"/></svg></span>
                </div>
                <div class="mt-1 text-center w-full">
                    <div class="text-[9.5px] sm:text-xs font-bold truncate text-white">
                        Daha çox
                    </div>
                </div>
            </div>
        `;
    },

    renderMinimizeCard: function() {
        return `
            <div onclick="App.toggleCategoriesExpand()" 
                 class="cat-card touch-snap-start shrink-0 w-[84px] sm:w-auto cursor-pointer bg-tbank-graphite hover:bg-black text-white rounded-2xl p-2 sm:p-3 border border-tbank-graphite text-center flex flex-col items-center justify-center gap-2 min-h-[78px] sm:min-h-[96px] shadow-md transition-all duration-200">
                <div class="mt-1 flex items-center justify-center scale-90 sm:scale-100">
                    <span class="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 text-tbank-graphite flex items-center justify-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="4" height="4" rx="1"/><rect x="10" y="4" width="4" height="4" rx="1"/><rect x="16" y="4" width="4" height="4" rx="1"/><rect x="4" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/><rect x="16" y="10" width="4" height="4" rx="1"/><path d="m7 18 2 2 4-4"/><path d="M16 18h4"/></svg></span>
                </div>
                <div class="mt-1 text-center w-full">
                    <div class="text-[9.5px] sm:text-xs font-bold truncate text-white">
                        Gizlət
                    </div>
                </div>
            </div>
        `;
    },



    renderCategorySection: function() {
        const isExpanded = App.isCategoriesExpanded;
        const row1 = ZeyvoData.topCategories.slice(0, 7); // beauty, health, auto, entertainment, services, education, rent
        const row2 = ZeyvoData.topCategories.slice(7, 13); // other, sport, animals, restaurants, style, lawyers

        if (!isExpanded) {
            // Collapsed: Row 1 with first 6 categories + MORE (matches media_1790682239184.png)
            const collapsedRow = row1.slice(0, 6);
            return `
                <div id="catRowCollapsed" class="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar touch-snap-x pt-2 pb-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-7">
                    ${collapsedRow.map(cat => this.renderCategoryCard(cat, cat.id === App.currentTopCategory)).join('')}
                    ${this.renderDahaCoxCard()}
                </div>
            `;
        }

        // Expanded: Row 1 (7 items) + Row 2 (6 items + MINIMIZE)
        return `
            <div class="space-y-2 sm:space-y-2.5 expand-slide-down">
                <!-- Row 1: 7 categories including RENT -->
                <div id="catRow1" class="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar touch-snap-x pt-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-7">
                    ${row1.map(cat => this.renderCategoryCard(cat, cat.id === App.currentTopCategory)).join('')}
                </div>
                <!-- Row 2: 6 categories + MINIMIZE -->
                <div id="catRow2" class="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar touch-snap-x pt-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-7">
                    ${row2.map(cat => this.renderCategoryCard(cat, cat.id === App.currentTopCategory)).join('')}
                    ${this.renderMinimizeCard()}
                </div>
            </div>
        `;
    },

    renderSubcategoriesHtml: function(cat) {
        if (!cat || !cat.subcategories) return '';
        const list = cat.subcategories.filter(s => s.id !== 'all');
        return list.map(sub => {
            return `
                <div onclick="Router.navigate('/catalog/${cat.id}/${sub.id}')" 
                     class="subcat-photo-card group relative h-24 sm:h-28 md:h-32 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    <!-- Photo Background -->
                    <img src="${sub.image}" alt="${sub.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out">
                    <!-- Dark Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30 group-hover:from-black/70 group-hover:via-black/35 transition-colors flex items-center justify-center p-2.5 sm:p-3 text-center">
                        <span class="text-white font-extrabold sm:font-black text-xs sm:text-sm md:text-[14px] leading-snug tracking-tight drop-shadow-md select-none text-center">
                            ${sub.azName || sub.name}
                        </span>
                    </div>

                </div>
            `;
        }).join('');
    },

    afterRender: function() {
        App.initCategoryScrollSync();
        App.renderSalons();
        App.renderMasters();
    }
};
