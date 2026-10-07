// ========================================================
// ZEYVO MODAL ANIMATION ENGINE (UNIVERSAL SMOOTH OPEN & CLOSE)
// ========================================================
(function() {
    if (typeof window === 'undefined') return;

    try {
        const desc = Object.getOwnPropertyDescriptor(Element.prototype, 'classList');
        if (!desc || !desc.get) return;
        const origGet = desc.get;

        Object.defineProperty(Element.prototype, 'classList', {
            get: function() {
                const list = origGet.call(this);
                list._ownerElement = this;
                return list;
            },
            configurable: true
        });

        const origAdd = DOMTokenList.prototype.add;
        const origRemove = DOMTokenList.prototype.remove;
        const origContains = DOMTokenList.prototype.contains;

        function isModalElement(el) {
            if (!el || !(el instanceof Element)) return false;
            const cl = el.classList;
            if (!cl) return false;
            const hasOverlayClasses = (cl.contains('fixed') || cl.contains('absolute')) && 
                                      (cl.contains('inset-0') || cl.contains('w-screen') || cl.contains('h-screen'));
            const hasModalIdentity = (el.id && (el.id.endsWith('Modal') || el.id.includes('Modal'))) ||
                                     cl.contains('modal-fade') ||
                                     cl.contains('mobile-sheet');
            return hasOverlayClasses && hasModalIdentity;
        }

        DOMTokenList.prototype.add = function(...tokens) {
            const el = this._ownerElement;
            if (tokens.includes('hidden') && isModalElement(el)) {
                // If already hidden, apply normally
                if (origContains.call(this, 'hidden')) {
                    return origAdd.apply(this, tokens);
                }
                // If already in closing transition, ignore duplicate close requests
                if (origContains.call(this, 'modal-closing')) {
                    return;
                }

                // Start graceful closing transition
                origAdd.call(this, 'modal-closing');

                if (el._modalCloseTimer) {
                    clearTimeout(el._modalCloseTimer);
                }

                el._modalCloseTimer = setTimeout(() => {
                    el._modalCloseTimer = null;
                    origRemove.call(this, 'modal-closing');
                    origAdd.call(this, 'hidden');
                }, 180);

                const otherTokens = tokens.filter(t => t !== 'hidden');
                if (otherTokens.length) {
                    origAdd.apply(this, otherTokens);
                }
                return;
            }

            return origAdd.apply(this, tokens);
        };

        DOMTokenList.prototype.remove = function(...tokens) {
            const el = this._ownerElement;
            if (tokens.includes('hidden') && isModalElement(el)) {
                // If user re-opens while closing, cancel closing animation immediately
                if (el._modalCloseTimer) {
                    clearTimeout(el._modalCloseTimer);
                    el._modalCloseTimer = null;
                }
                origRemove.call(this, 'modal-closing');
            }
            return origRemove.apply(this, tokens);
        };

        DOMTokenList.prototype.contains = function(token) {
            if (token === 'hidden' && this._ownerElement && isModalElement(this._ownerElement)) {
                if (origContains.call(this, 'modal-closing')) {
                    return true;
                }
            }
            return origContains.call(this, token);
        };
    } catch (e) {
        console.warn('Zeyvo modal animation engine initialization error:', e);
    }
})();

// ========================================================
// CORE APPLICATION LOGIC, STATE & REACTIVE CATEGORY SWITCH
// ========================================================
const App = {
    currentCity: "Bakı",
    currentTopCategory: "beauty",
    currentSubcategory: "all",
    activeTag: "all",
    searchQuery: "",
    catalogFilterCategory: "all",
    bookings: JSON.parse(localStorage.getItem('zeyvo_user_bookings') || '[]'),
    partnerUser: JSON.parse(localStorage.getItem('zeyvo_partner_user') || 'null'),
    currentBooking: {
        salon: null,
        service: null,
        master: null,
        time: null
    },

    isCategoriesExpanded: false,

    init: function() {
        const savedBookings = localStorage.getItem('zeyvo_user_bookings');
        if (savedBookings) {
            try {
                let parsed = JSON.parse(savedBookings);
                if (Array.isArray(parsed)) {
                    parsed = parsed.filter(b => b.id !== 101);
                    this.bookings = parsed;
                    localStorage.setItem('zeyvo_user_bookings', JSON.stringify(this.bookings));
                } else {
                    this.bookings = [];
                }
            } catch (e) {
                this.bookings = [];
            }
        } else {
            this.bookings = [];
        }
        this.initFavorites();
        this.updateUserAuthState();
        this.updateBadge();
        this.updateFavoritesBadge();
        Router.init();

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#langDropdownContainerDesktop') && !e.target.closest('#langDropdownContainerMobile')) {
                this.closeLangDropdown();
            }
        });

        // Close modals when clicking on background overlay
        ['bookingModal', 'bookingsModal', 'authModal', 'profileModal', 'cityModal', 'favoritesModal', 'masterLightboxModal', 'catalogMobileFilterModal', 'legalModal'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('click', (e) => {
                    if (e.target === el) {
                        el.classList.add('hidden');
                    }
                });
            }
        });

        // Close modals and dropdowns on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                ['bookingModal', 'bookingsModal', 'authModal', 'profileModal', 'cityModal', 'favoritesModal', 'masterLightboxModal', 'catalogMobileFilterModal', 'legalModal'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el && !el.classList.contains('hidden')) {
                        el.classList.add('hidden');
                    }
                });
                // Also close any open dashboard modals
                document.querySelectorAll('[id$="Modal"]:not(.hidden), [id*="Modal"]:not(.hidden)').forEach(el => {
                    if (!el.classList.contains('hidden') && !el.classList.contains('modal-closing')) {
                        el.classList.add('hidden');
                    }
                });
                this.closeLangDropdown();
            }
        });
    },

    toggleCategoriesExpand: function() {
        this.isCategoriesExpanded = !this.isCategoriesExpanded;
        const section = document.getElementById('category-selector-section');
        if (section) {
            section.innerHTML = HomeView.renderCategorySection();
            this.initCategoryScrollSync();
        }
    },

    initCategoryScrollSync: function() {
        const r1 = document.getElementById('catRow1');
        const r2 = document.getElementById('catRow2');
        if (r1 && r2) {
            let isSyncing = false;
            r1.onscroll = () => {
                if (!isSyncing) {
                    isSyncing = true;
                    r2.scrollLeft = r1.scrollLeft;
                    requestAnimationFrame(() => { isSyncing = false; });
                }
            };
            r2.onscroll = () => {
                if (!isSyncing) {
                    isSyncing = true;
                    r1.scrollLeft = r2.scrollLeft;
                    requestAnimationFrame(() => { isSyncing = false; });
                }
            };
        }
    },

    handleCategoryClick: function(catId) {
        this.selectTopCategory(catId);
    },

    // Category Selector Handler (Image 2 style & DIKIDI reactive subcategories)
    selectTopCategory: function(catId) {
        this.currentTopCategory = catId;
        this.currentSubcategory = "all";

        const currentRoute = Router.getCurrentRoute();
        if (currentRoute.startsWith('/catalog') || currentRoute.startsWith('/salons')) {
            Router.navigate(`/catalog/${catId}`);
            return;
        }

        // 1. Re-render Top Category shelf so active category gets vibrant color!
        const catSelectorSection = document.getElementById('category-selector-section');
        if (catSelectorSection && typeof HomeView !== 'undefined' && HomeView.renderCategorySection) {
            catSelectorSection.innerHTML = HomeView.renderCategorySection();
            if (this.isCategoriesExpanded) {
                this.initCategoryScrollSync();
            }
        }

        const activeCat = ZeyvoData.topCategories.find(c => c.id === catId);

        // 2. Update Subcategories Photo Grid with smooth fade transition
        const subContainer = document.getElementById('subcategoriesContainer');
        if (subContainer && activeCat && typeof HomeView !== 'undefined' && HomeView.renderSubcategoriesHtml) {
            subContainer.innerHTML = HomeView.renderSubcategoriesHtml(activeCat);
            subContainer.classList.remove('fade-in-swap');
            void subContainer.offsetWidth; // trigger reflow
            subContainer.classList.add('fade-in-swap');
        }

        // 3. Update category badges and filter links
        const subBadgeEl = document.getElementById('dynamicSubcatBadge');
        if (subBadgeEl && activeCat) {
            subBadgeEl.textContent = activeCat.azName;
        }
        const subSubtitleEl = document.getElementById('dynamicSubcatSubtitle');
        if (subSubtitleEl && activeCat) {
            subSubtitleEl.textContent = `${activeCat.azName} xidmətləri üzrə mütəxəssislər və salonlar tapın`;
        }
        const catalogFilterLink = document.getElementById('catalogFilterLink');
        if (catalogFilterLink && activeCat) {
            catalogFilterLink.href = `#/catalog/${activeCat.id}`;
        }

        // 4. Update Headings
        const titleEl = document.getElementById('dynamicCatalogTitle');
        if (titleEl && activeCat) {
            titleEl.textContent = `${activeCat.azName} məkanları`;
        }
        const mastersTitleEl = document.getElementById('dynamicMastersTitle');
        if (mastersTitleEl && activeCat) {
            mastersTitleEl.textContent = `Seçilmiş mütəxəssislər (${activeCat.title})`;
        }

        // 5. Re-render Dynamic Salons & Masters with smooth fade
        this.renderSalons();
        this.renderMasters();

        const salonsSection = document.getElementById('salons');
        if (salonsSection) {
            salonsSection.classList.remove('fade-in-swap');
            void salonsSection.offsetWidth; // trigger reflow
            salonsSection.classList.add('fade-in-swap');
        }
    },

    selectSubcategory: function(subId) {
        this.currentSubcategory = subId;

        // Update subcategory buttons state
        const subContainer = document.getElementById('subcategoriesContainer');
        const activeCat = ZeyvoData.topCategories.find(c => c.id === this.currentTopCategory);
        if (subContainer && activeCat) {
            subContainer.innerHTML = HomeView.renderSubcategoriesHtml(activeCat);
        }

        this.renderSalons();
    },

    filterCatalogByCategory: function(catId) {
        this.catalogFilterCategory = catId;
        document.querySelectorAll('.catalog-tab-btn').forEach(btn => {
            btn.className = "catalog-tab-btn shrink-0 h-10 px-4 rounded-xl text-xs font-bold transition bg-white border border-tbank-border text-tbank-graphite hover:bg-slate-50";
        });
        const activeBtn = event ? event.target.closest('button') : null;
        if (activeBtn) {
            activeBtn.className = "catalog-tab-btn shrink-0 h-10 px-4 rounded-xl text-xs font-bold transition bg-tbank-graphite text-white";
        }
        this.renderSalons();
    },

    renderSalons: function() {
        const grid = document.getElementById('salonsGrid');
        if (!grid) return;

        let filtered = ZeyvoData.salons.filter(item => {
            // Check top category filter
            const isHomePage = (Router.getCurrentRoute() === '/' || Router.getCurrentRoute() === '');
            if (isHomePage) {
                if (item.topCategory !== this.currentTopCategory) return false;
                if (this.currentSubcategory !== 'all' && item.category !== this.currentSubcategory) return false;
            } else if (Router.getCurrentRoute() === '/salons') {
                if (this.catalogFilterCategory !== 'all' && item.topCategory !== this.catalogFilterCategory) return false;
            }

            // Quick tag filters (today, rating, discount)
            if (this.activeTag === 'today' && (!item.slots || item.slots.length === 0)) return false;
            if (this.activeTag === 'rating' && item.rating < 4.96) return false;
            if (this.activeTag === 'discount' && !item.discount) return false;

            // Search query filter
            if (this.searchQuery) {
                const q = this.searchQuery.toLowerCase();
                const n = item.name.toLowerCase().includes(q);
                const t = item.tag.toLowerCase().includes(q);
                const l = item.location.toLowerCase().includes(q);
                const s = item.services.some(srv => srv.name.toLowerCase().includes(q));
                if (!n && !t && !l && !s) return false;
            }
            return true;
        });

        const countEl = document.getElementById('catalogCount');
        if (countEl) countEl.textContent = `${filtered.length} məkan`;

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full p-10 text-center bg-white rounded-3xl border border-tbank-border">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2"><svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></div>
                    <div class="font-extrabold text-sm text-tbank-graphite">Bu kriteriyada nəticə tapılmadı</div>
                    <div class="text-xs text-slate-400 mt-1">Digər alt-kateqoriyanı seçin və ya axtarışı sıfırlayın</div>
                    <button onclick="App.selectSubcategory('all')" class="mt-4 px-4 py-2 rounded-xl bg-tbank-graphite text-white font-bold text-xs">Bütün alt-xidmətləri göstər</button>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(salon => `
            <article class="product-card bg-white rounded-3xl border border-tbank-border/80 overflow-hidden flex flex-col justify-between">
                <!-- Photo Header -->
                <div class="relative h-44 overflow-hidden bg-slate-100 cursor-pointer" onclick="Router.navigate('/salon/${salon.id}')">
                    <img src="${salon.image}" alt="${salon.name}" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    <div class="absolute top-3 left-3 flex items-center gap-1.5">
                        ${salon.badge ? `<span class="px-2.5 py-1 rounded-lg bg-tbank-graphite text-tbank-yellow text-[10px] font-black tracking-wide">${salon.badge}</span>` : ''}
                        ${salon.discount ? `<span class="px-2 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-extrabold">${salon.discount}</span>` : ''}
                    </div>

                    <button onclick="App.toggleFavorite(${salon.id}, 'salon', event)" class="fav-btn-salon-${salon.id} absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-md transition transform active:scale-90 z-10" title="Seçilmişlərə əlavə et">
                        <svg class="w-4 h-4 ${this.isFavorite('salon', salon.id) ? 'text-rose-500 fill-current' : 'text-slate-600 fill-none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>

                    <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span class="text-[11px] font-semibold text-white/90 truncate max-w-[200px]">${salon.location}</span>
                        <span class="px-2 py-0.5 rounded-md bg-white text-tbank-graphite font-black text-[11px] flex items-center gap-1"><svg class="w-3 h-3 text-amber-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${salon.rating}</span>
                    </div>
                </div>

                <!-- Body -->
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <a href="#/salon/${salon.id}" class="block group">
                            <h3 class="font-black text-base text-tbank-graphite group-hover:text-black transition">${salon.name}</h3>
                            <div class="text-xs text-slate-400 mt-0.5 font-medium">${salon.tag} • ${salon.reviewsCount} rəy</div>
                        </a>

                        <div class="mt-4 space-y-2 pt-3 border-t border-tbank-border">
                            ${salon.services.slice(0, 2).map(s => `
                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-slate-600 truncate max-w-[200px] font-medium">${s.name}</span>
                                    <span class="font-extrabold text-tbank-graphite shrink-0">${s.price} ₼</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="mt-5 pt-3 border-t border-tbank-border">
                        <div class="text-[11px] font-bold text-slate-500 mb-2">Bu gün boş vaxtlar:</div>
                        <div class="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                            ${salon.slots.map(slot => `
                                <button onclick="App.startBooking(${salon.id}, '${slot}')" class="shrink-0 px-2.5 py-1 rounded-lg bg-tbank-bg hover:bg-tbank-yellow text-tbank-graphite text-[11px] font-bold transition">
                                    ${slot}
                                </button>
                            `).join('')}
                        </div>

                        <div class="mt-3.5 flex items-center gap-2">
                            <button onclick="App.startBooking(${salon.id})" class="flex-1 h-10 rounded-xl bg-tbank-graphite hover:bg-tbank-graphiteHover text-white text-xs font-bold transition">
                                Yazıl
                            </button>
                            <a href="#/salon/${salon.id}" class="h-10 px-3.5 rounded-xl border border-tbank-border hover:bg-tbank-bg text-tbank-graphite flex items-center justify-center transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');
    },

    renderMasters: function() {
        const grid = document.getElementById('mastersGrid');
        if (!grid) return;

        let filtered = ZeyvoData.masters.filter(m => m.topCategory === this.currentTopCategory);
        if (filtered.length === 0) {
            filtered = ZeyvoData.masters.slice(0, 4);
        }

        grid.innerHTML = filtered.slice(0, 4).map(m => `
            <div class="p-3.5 rounded-2xl bg-white border border-tbank-border/70 shadow-sm flex items-center gap-3 hover:shadow-md transition">
                <a href="#/master/${m.id}" class="shrink-0 group">
                    <img src="${m.photo}" alt="${m.name}" class="w-12 h-12 rounded-xl object-cover group-hover:opacity-90 transition" />
                </a>
                <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-1">
                        <a href="#/master/${m.id}" class="font-extrabold text-xs sm:text-sm text-tbank-graphite truncate hover:underline">${m.name}</a>
                        <div class="flex items-center gap-1 shrink-0">
                            <span class="text-[10px] font-black text-tbank-graphite bg-tbank-bg px-1.5 py-0.5 rounded flex items-center gap-0.5"><svg class="w-2.5 h-2.5 text-amber-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${m.rating}</span>
                            <button onclick="App.toggleFavorite(${m.id}, 'master', event)" class="fav-btn-master-${m.id} p-1 text-slate-400 hover:text-rose-500 transition active:scale-90" title="Seçilmişlər">
                                <svg class="w-3.5 h-3.5 ${this.isFavorite('master', m.id) ? 'text-rose-500 fill-current' : 'fill-none stroke-current'}" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </button>
                        </div>
                    </div>
                    <div class="text-[11px] text-slate-500 truncate mt-0.5">${m.title}</div>
                    <div class="text-[10px] text-slate-400 truncate">
                        <a href="#/salon/${m.salonId}" class="hover:underline">${m.salonName}</a>
                    </div>
                    <div class="mt-1.5 flex items-center justify-between">
                        <a href="#/master/${m.id}" class="text-[11px] font-bold text-slate-500 hover:text-tbank-graphite">
                            Profilə bax
                        </a>
                        <button onclick="App.bookMaster('${m.name}', '${m.salonName}')" class="text-[11px] font-black text-tbank-graphite hover:underline">
                            Qəbula yazıl →
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    sortSalons: function(order) {
        if (order === 'rating') {
            ZeyvoData.salons.sort((a, b) => b.rating - a.rating);
        } else if (order === 'price') {
            ZeyvoData.salons.sort((a, b) => (a.services[0]?.price || 0) - (b.services[0]?.price || 0));
        } else {
            ZeyvoData.salons.sort((a, b) => b.reviewsCount - a.reviewsCount);
        }
        this.renderSalons();
    },

    setFilterTag: function(btn, tag) {
        this.activeTag = tag;
        document.querySelectorAll('.filter-pill').forEach(b => {
            b.className = "filter-pill shrink-0 h-9 px-3.5 rounded-xl bg-black/[0.07] hover:bg-black/[0.1] text-tbank-graphite text-xs font-bold transition";
        });
        btn.className = "filter-pill shrink-0 h-9 px-3.5 rounded-xl bg-tbank-graphite text-white text-xs font-bold transition";
        this.renderSalons();
    },

    handleSearchInput: function(val) {
        this.searchQuery = val.trim();
        const clearBtn = document.getElementById('clearSearchBtn');
        if (clearBtn) {
            clearBtn.classList.toggle('hidden', this.searchQuery.length === 0);
        }
        this.renderSalons();
    },

    clearSearch: function() {
        const input = document.getElementById('searchInput');
        if (input) input.value = '';
        this.searchQuery = '';
        const clearBtn = document.getElementById('clearSearchBtn');
        if (clearBtn) clearBtn.classList.add('hidden');
        this.renderSalons();
    },

    runSearch: function() {
        if (Router.getCurrentRoute() !== '/' && Router.getCurrentRoute() !== '') {
            Router.navigate('/');
            setTimeout(() => {
                document.getElementById('salons')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById('salons')?.scrollIntoView({ behavior: 'smooth' });
        }
    },

    searchService: function(term) {
        const input = document.getElementById('searchInput');
        if (input) input.value = term;
        this.handleSearchInput(term);
        this.runSearch();
    },

    // City Selection
    openCityModal: function() {
        document.getElementById('cityModal').classList.remove('hidden');
    },
    closeCityModal: function() {
        document.getElementById('cityModal').classList.add('hidden');
    },
    selectCity: function(cityName) {
        this.currentCity = cityName;
        document.getElementById('currentCityText').textContent = cityName;
        const mobile = document.getElementById('mobileCityText');
        if (mobile) mobile.textContent = cityName;
        this.closeCityModal();
        this.showToast(`Şəhər dəyişdirildi: ${cityName}`);
    },

    // Booking Wizard
    startBooking: function(salonId, defaultSlot = null, masterName = null, defaultServiceId = null) {
        const salon = ZeyvoData.salons.find(s => s.id === salonId);
        if (!salon) return;

        let master = null;
        if (masterName) {
            master = ZeyvoData.masters.find(m => m.name === masterName) || null;
        }
        if (!master) {
            master = ZeyvoData.masters.find(m => m.salonId === salonId) || ZeyvoData.masters[0];
        }

        const selectedService = (defaultServiceId ? salon.services.find(s => s.id === defaultServiceId) : null) || salon.services[0];

        this.currentBooking = {
            salon: salon,
            service: selectedService,
            master: master,
            time: defaultSlot || salon.slots[0]
        };

        const modalSalonName = document.getElementById('modalSalonName');
        const modalSalonLocation = document.getElementById('modalSalonLocation');
        if (modalSalonName) modalSalonName.textContent = salon.name;
        if (modalSalonLocation) modalSalonLocation.textContent = salon.location;

        const masterBadge = document.getElementById('modalMasterInfo');
        const masterNameEl = document.getElementById('modalMasterName');
        if (masterBadge && masterNameEl) {
            if (master && master.name) {
                masterNameEl.textContent = master.name;
                masterBadge.classList.remove('hidden');
            } else {
                masterBadge.classList.add('hidden');
            }
        }

        const sList = document.getElementById('bookingServiceList');
        if (sList) {
            sList.innerHTML = salon.services.map((s) => `
                <label class="flex items-center justify-between p-3 rounded-xl border ${s.id === this.currentBooking.service.id ? 'border-tbank-graphite bg-amber-50/40' : 'border-tbank-border'} cursor-pointer hover:bg-tbank-bg transition">
                    <div class="flex items-center gap-3">
                        <input type="radio" name="b_service" value="${s.id}" ${s.id === this.currentBooking.service.id ? 'checked' : ''} onchange="App.updateBookingService(${s.id})" class="accent-black w-4 h-4">
                        <div>
                            <div class="font-extrabold text-xs text-tbank-graphite">${s.name}</div>
                            <div class="text-[11px] text-slate-400">${s.duration}</div>
                        </div>
                    </div>
                    <div class="font-black text-xs text-tbank-graphite">${s.price} ₼</div>
                </label>
            `).join('');
        }

        const slotsList = document.getElementById('bookingSlotList');
        if (slotsList) {
            slotsList.innerHTML = salon.slots.map((slot) => `
                <button type="button" onclick="App.setBookingSlot(this, '${slot}')" class="slot-btn px-3 py-2 rounded-xl text-xs font-bold border transition ${slot === this.currentBooking.time ? 'bg-tbank-graphite text-white border-tbank-graphite' : 'bg-white border-tbank-border text-tbank-graphite hover:bg-tbank-bg'}">
                    ${slot}
                </button>
            `).join('');
        }

        if (this.currentUser) {
            const clientNameInput = document.getElementById('clientName');
            const clientPhoneInput = document.getElementById('clientPhone');
            if (clientNameInput && this.currentUser.name) clientNameInput.value = this.currentUser.name;
            if (clientPhoneInput && this.currentUser.phone) {
                clientPhoneInput.value = this.formatDisplayAzPhone(this.currentUser.phone);
            }
        }

        document.getElementById('bookingModal').classList.remove('hidden');
    },

    openBookingModal: function(id) {
        this.startBooking(id);
    },

    bookMaster: function(masterName, salonName, serviceId = null, slot = null) {
        const salon = ZeyvoData.salons.find(s => s.name === salonName) || ZeyvoData.salons[0];
        this.startBooking(salon.id, slot, masterName, serviceId);
    },

    closeBookingModal: function() {
        document.getElementById('bookingModal').classList.add('hidden');
    },

    updateBookingService: function(serviceId) {
        if (!this.currentBooking.salon) return;
        const s = this.currentBooking.salon.services.find(srv => srv.id === serviceId);
        if (s) {
            this.currentBooking.service = s;
            const sList = document.getElementById('bookingServiceList');
            if (sList) {
                sList.querySelectorAll('label').forEach(lbl => {
                    const input = lbl.querySelector('input[type="radio"]');
                    if (input && parseInt(input.value) === serviceId) {
                        lbl.className = "flex items-center justify-between p-3 rounded-xl border border-tbank-graphite bg-amber-50/40 cursor-pointer hover:bg-tbank-bg transition";
                    } else {
                        lbl.className = "flex items-center justify-between p-3 rounded-xl border border-tbank-border cursor-pointer hover:bg-tbank-bg transition";
                    }
                });
            }
        }
    },

    setBookingSlot: function(btn, slot) {
        this.currentBooking.time = slot;
        document.querySelectorAll('.slot-btn').forEach(b => {
            b.className = "slot-btn px-3 py-2 rounded-xl text-xs font-bold border transition bg-white border-tbank-border text-tbank-graphite hover:bg-tbank-bg";
        });
        btn.className = "slot-btn px-3 py-2 rounded-xl text-xs font-bold border transition bg-tbank-graphite text-white border-tbank-graphite";
    },

    submitBooking: function() {
        const nameInput = document.getElementById('clientName');
        const phoneInput = document.getElementById('clientPhone');

        const name = nameInput ? nameInput.value.trim() : "";
        const phoneVal = phoneInput ? phoneInput.value.trim() : "";
        const phoneDigits = this.getCleanAzPhone(phoneVal);

        if (!name) {
            this.showToast("Zəhmət olmasa ad və soyadınızı qeyd edin.");
            return;
        }

        if (!phoneDigits || phoneDigits.length < 9) {
            this.showToast("Zəhmət olmasa 9 rəqəmli mobil nömrənizi daxil edin (məs: 50 123 45 67).");
            return;
        }

        const phone = `+994 ${this.formatDisplayAzPhone(phoneDigits)}`;

        const newBooking = {
            id: Date.now(),
            salonId: this.currentBooking.salon?.id || 1,
            salonName: this.currentBooking.salon?.name || "Gözəllik Məkanı",
            masterName: this.currentBooking.master ? this.currentBooking.master.name : null,
            serviceName: this.currentBooking.service ? this.currentBooking.service.name : "Xidmət",
            price: this.currentBooking.service ? this.currentBooking.service.price : 30,
            time: this.currentBooking.time || "12:00",
            date: "Bugün",
            clientName: name,
            clientPhone: phone
        };

        this.bookings.unshift(newBooking);
        localStorage.setItem('zeyvo_user_bookings', JSON.stringify(this.bookings));

        // Sync with Business Appointments queue as pending online appointment
        try {
            const todayStr = new Date().toISOString().split('T')[0];
            const bizBookings = JSON.parse(localStorage.getItem('zeyvo_business_bookings_v3') || '[]');
            const bizBooking = {
                id: 'b_online_' + newBooking.id,
                clientName: name,
                phone: phone,
                service: newBooking.serviceName,
                serviceId: this.currentBooking.service?.id || '',
                masterName: newBooking.masterName || 'Samir Əliyev',
                masterKey: 'samir',
                date: todayStr,
                time: newBooking.time,
                startHour: parseInt(newBooking.time.split(':')[0]) || 12,
                durationMinutes: 45,
                durationHours: 0.75,
                price: newBooking.price,
                status: 'Gözlənilir',
                source: 'online',
                createdAt: new Date().toISOString(),
                note: 'Onlayn müştəri müraciəti (Zeyvo platformasından yazılıb)'
            };
            bizBookings.unshift(bizBooking);
            localStorage.setItem('zeyvo_business_bookings_v3', JSON.stringify(bizBookings));
        } catch(e) {}

        this.updateBadge();
        this.renderUserBookings();
        this.renderProfileBookings();
        this.closeBookingModal();
        this.showToast("Rezervasiyanız uğurla təsdiqləndi!");
    },

    // Bookings Drawer
    openBookingsModal: function() {
        if (!this.currentUser) {
            this.showToast("Yazılarınızı və tarixçənizi görmək üçün hesabınıza daxil olun");
            this.openAuthModal();
            return;
        }
        this.renderUserBookings();
        document.getElementById('bookingsModal').classList.remove('hidden');
    },
    closeBookingsModal: function() {
        document.getElementById('bookingsModal').classList.add('hidden');
    },
    renderUserBookings: function() {
        const list = document.getElementById('userBookingsList');
        if (!list) return;

        if (this.bookings.length === 0) {
            list.innerHTML = `
                <div class="p-8 text-center bg-tbank-bg rounded-2xl">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2"><svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>
                    <div class="font-extrabold text-sm text-tbank-graphite">Hələ heç bir rezervasiyanız yoxdur</div>
                    <div class="text-xs text-slate-400 mt-1">İstədiyiniz xidmət və ya salonu seçib yazılın</div>
                </div>
            `;
            return;
        }

        list.innerHTML = this.bookings.map(b => `
            <div class="p-4 rounded-2xl border border-tbank-border bg-white shadow-sm flex items-start justify-between gap-3">
                <div class="min-w-0 flex-1">
                    <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-tbank-green text-tbank-graphite mb-1.5">Təsdiqləndi</span>
                    <div class="font-black text-sm text-tbank-graphite truncate">${b.salonName}</div>
                    ${b.masterName ? `<div class="text-[11px] font-bold text-slate-500 mt-0.5 flex items-center gap-1"><svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span class="truncate">${b.masterName}</span></div>` : ''}
                    <div class="text-xs font-semibold text-slate-600 mt-0.5 truncate">${b.serviceName}</div>
                    <div class="text-xs text-slate-400 mt-2 font-medium flex items-center gap-2">
                        <span class="flex items-center gap-1"><svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${b.date}, ${b.time}</span>
                        <span>•</span>
                        <span class="font-extrabold text-tbank-graphite">${b.price} ₼</span>
                    </div>
                </div>
                <button onclick="App.cancelBooking(${b.id})" class="text-slate-400 hover:text-rose-600 p-1 text-xs shrink-0 transition" title="Ləğv et">Ləğv et</button>
            </div>
        `).join('');
    },
    cancelBooking: function(id) {
        this.bookings = this.bookings.filter(b => b.id !== id);
        localStorage.setItem('zeyvo_user_bookings', JSON.stringify(this.bookings));
        this.updateBadge();
        this.renderUserBookings();
        this.renderProfileBookings();
        this.showToast("Yazılma ləğv edildi");
    },
    updateBadge: function() {
        const count = this.currentUser ? ((this.bookings && this.bookings.length) || 0) : 0;
        const badge = document.getElementById('bookingCountBadge');
        if (badge) {
            badge.textContent = count;
            badge.classList.toggle('hidden', count === 0);
        }
        const mobileBadge = document.getElementById('mobileBookingBadge');
        if (mobileBadge) {
            mobileBadge.textContent = count;
            mobileBadge.classList.toggle('hidden', count === 0);
        }
        const profileBadge = document.getElementById('profileBookingsCountBadge');
        if (profileBadge) {
            profileBadge.textContent = count;
        }
    },

    // Auth State & Methods (Email + Password)
    currentUser: JSON.parse(localStorage.getItem('zeyvo_user') || 'null'),
    authMode: 'login', // 'login' | 'register'

    openAuthModal: function() {
        const modal = document.getElementById('authModal');
        if (!modal) return;
        this.clearAuthError();
        this.setAuthMode(this.authMode || 'login');
        modal.classList.remove('hidden');
    },

    closeAuthModal: function() {
        if (this.recoveryState && this.recoveryState.timer) {
            clearInterval(this.recoveryState.timer);
            this.recoveryState.timer = null;
        }
        const modal = document.getElementById('authModal');
        if (modal) modal.classList.add('hidden');
    },

    openLegalModal: function(tab = 'terms') {
        const modal = document.getElementById('legalModal');
        if (!modal) return;
        this.switchLegalTab(tab);
        modal.classList.remove('hidden');
    },

    closeLegalModal: function() {
        const modal = document.getElementById('legalModal');
        if (modal) modal.classList.add('hidden');
    },

    switchLegalTab: function(tab = 'terms') {
        this.currentLegalTab = tab;
        const tabTerms = document.getElementById('legalTabTerms');
        const tabPrivacy = document.getElementById('legalTabPrivacy');
        const tabSupport = document.getElementById('legalTabSupport');
        const titleEl = document.getElementById('legalModalTitle');
        const subtitleEl = document.getElementById('legalModalSubtitle');
        const contentEl = document.getElementById('legalModalContent');
        if (!contentEl) return;

        const activeClass = "flex-1 py-1.5 rounded-lg text-xs font-black transition bg-white shadow-sm text-tbank-graphite";
        const inactiveClass = "flex-1 py-1.5 rounded-lg text-xs font-bold transition text-slate-500 hover:text-tbank-graphite";

        if (tab === 'terms') {
            if (tabTerms) tabTerms.className = activeClass;
            if (tabPrivacy) tabPrivacy.className = inactiveClass;
            if (tabSupport) tabSupport.className = inactiveClass;
            if (titleEl) titleEl.textContent = "İstifadəçi Şərtləri";
            if (subtitleEl) subtitleEl.textContent = "Zeyvo platformasından istifadə qaydaları";
            contentEl.innerHTML = `
                <div class="space-y-3.5">
                    <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 class="font-extrabold text-xs text-tbank-graphite flex items-center gap-2 mb-1.5">
                            <span class="w-5 h-5 rounded-md bg-tbank-yellow text-tbank-graphite flex items-center justify-center text-[10px] font-black">1</span>
                            Ümumi müddəalar
                        </h4>
                        <p class="text-[11px] text-slate-600 leading-relaxed font-medium">
                            Zeyvo — gözəllik, sağlamlıq və xidmət sahələrində müştərilərlə salon və ustalar arasında onlayn rezervasiya və biznesin idarə olunmasını təmin edən rəqəmsal platformadır. Qeydiyyatdan keçməklə siz bu şərtləri tam və qeyd-şərtsiz qəbul etmiş olursunuz.
                        </p>
                    </div>

                    <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 class="font-extrabold text-xs text-tbank-graphite flex items-center gap-2 mb-1.5">
                            <span class="w-5 h-5 rounded-md bg-tbank-yellow text-tbank-graphite flex items-center justify-center text-[10px] font-black">2</span>
                            Hesab və Təhlükəsizlik
                        </h4>
                        <p class="text-[11px] text-slate-600 leading-relaxed font-medium">
                            İstifadəçi qeydiyyat zamanı daxil etdiyi şəxsi və ya biznes məlumatlarının (ad, telefon nömrəsi, e-poçt) doğruluğuna görə birbaşa məsuliyyət daşıyır. Hesabın şifrəsinin məxfi saxlanılması istifadəçinin şəxsi öhdəliyidir.
                        </p>
                    </div>

                    <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 class="font-extrabold text-xs text-tbank-graphite flex items-center gap-2 mb-1.5">
                            <span class="w-5 h-5 rounded-md bg-tbank-yellow text-tbank-graphite flex items-center justify-center text-[10px] font-black">3</span>
                            Onlayn Rezervasiya və Ləğvetmə
                        </h4>
                        <p class="text-[11px] text-slate-600 leading-relaxed font-medium">
                            Zeyvo vasitəsilə edilmiş hər bir rezervasiya təsdiqlənmiş qəbul sayılır. Xidmətə gəlmək mümkün olmadıqda müştəri rezervasiyanı ən azı 2 saat əvvəl şəxsi kabinetindən ləğv etməli və ya ustanı məlumatlandırmalıdır.
                        </p>
                    </div>

                    <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 class="font-extrabold text-xs text-tbank-graphite flex items-center gap-2 mb-1.5">
                            <span class="w-5 h-5 rounded-md bg-tbank-yellow text-tbank-graphite flex items-center justify-center text-[10px] font-black">4</span>
                            Biznes və Partnyor Qaydaları
                        </h4>
                        <p class="text-[11px] text-slate-600 leading-relaxed font-medium">
                            Zeyvo Business platformasından istifadə edən salonlar və ustalar göstərdikləri xidmətlərin keyfiyyəti, qiymətlərin düzgünlüyü və müştəri qəbulu qrafikinə riayət edilməsinə cavabdehdirlər.
                        </p>
                    </div>
                </div>
            `;
        } else if (tab === 'privacy') {
            if (tabTerms) tabTerms.className = inactiveClass;
            if (tabPrivacy) tabPrivacy.className = activeClass;
            if (tabSupport) tabSupport.className = inactiveClass;
            if (titleEl) titleEl.textContent = "Məxfilik Siyasəti";
            if (subtitleEl) subtitleEl.textContent = "Fərdi məlumatların qorunması və emalı";
            contentEl.innerHTML = `
                <div class="space-y-3.5">
                    <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 class="font-extrabold text-xs text-tbank-graphite flex items-center gap-2 mb-1.5">
                            <span class="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
                            Fərdi məlumatların toplanması
                        </h4>
                        <p class="text-[11px] text-slate-600 leading-relaxed font-medium">
                            Biz yalnız xidmətin keyfiyyətli təşkili üçün zəruri olan məlumatları toplayırıq: ad və soyad, mobil nömrə, e-poçt ünvanı və rezervasiya tarixçəniz. Bank kartı məlumatlarınız təhlükəsiz ödəniş şlüzlərində şifrələnmiş şəkildə emal olunur və serverlərimizdə saxlanılmır.
                        </p>
                    </div>

                    <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 class="font-extrabold text-xs text-tbank-graphite flex items-center gap-2 mb-1.5">
                            <span class="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></span>
                            Məlumatların istifadəsi və Bildirişlər
                        </h4>
                        <p class="text-[11px] text-slate-600 leading-relaxed font-medium">
                            Telefon nömrəniz rezervasiya təsdiqləri və avtomatik WhatsApp / SMS xatırlatmaları göndərmək üçün istifadə edilir. Məlumatlarınız heç bir halda üçüncü tərəflərə marketinq və ya reklam məqsədilə satılmır və ya ötürülmür.
                        </p>
                    </div>

                    <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 class="font-extrabold text-xs text-tbank-graphite flex items-center gap-2 mb-1.5">
                            <span class="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
                            Məlumatların qorunması və Təhlükəsizlik
                        </h4>
                        <p class="text-[11px] text-slate-600 leading-relaxed font-medium">
                            Bütün istifadəçi məlumatları müasir SSL/TLS şifrələmə protokolları ilə mühafizə olunur. İstifadəçi istədiyi an öz şəxsi məlumatlarının sistemdən tamamilə silinməsini tələb etmək hüququna malikdir.
                        </p>
                    </div>

                    <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 class="font-extrabold text-xs text-tbank-graphite flex items-center gap-2 mb-1.5">
                            <span class="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                            Əlaqə və Müraciətlər
                        </h4>
                        <p class="text-[11px] text-slate-600 leading-relaxed font-medium">
                            Məxfilik siyasəti ilə bağlı sualınız olduqda bizimlə <span class="font-bold text-tbank-graphite">privacy@zeyvo.az</span> və ya rəsmi WhatsApp dəstək xətti vasitəsilə əlaqə saxlaya bilərsiniz.
                        </p>
                    </div>
                </div>
            `;
        } else if (tab === 'support') {
            if (tabTerms) tabTerms.className = inactiveClass;
            if (tabPrivacy) tabPrivacy.className = inactiveClass;
            if (tabSupport) tabSupport.className = activeClass;
            if (titleEl) titleEl.textContent = "Dəstək 24/7";
            if (subtitleEl) subtitleEl.textContent = "Müştəri və tərəfdaş xidməti";
            contentEl.innerHTML = `
                <div class="space-y-3.5">
                    <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            </div>
                            <div>
                                <h4 class="font-extrabold text-xs text-tbank-graphite">Canlı WhatsApp Dəstəyi</h4>
                                <p class="text-[11px] text-emerald-800">Operatorlarımız 24/7 xidmətinizdədir</p>
                            </div>
                        </div>
                        <a href="https://wa.me/994503100020?text=Salam,%20Zeyvo%20ilə%20bağlı%20sualım%20var" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs transition shadow-sm shrink-0">
                            <span>WhatsApp ilə yazın</span>
                            <span>→</span>
                        </a>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-xl bg-white text-slate-700 shadow-2xs flex items-center justify-center"><svg class="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                            <div>
                                <div class="text-[10px] font-bold text-slate-400">Telefon qaynar xətt</div>
                                <a href="tel:+994503100020" class="text-xs font-black text-tbank-graphite hover:underline">+994 (50) 310-00-20</a>
                            </div>
                        </div>
                        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                            <span class="w-8 h-8 rounded-xl bg-white text-slate-700 shadow-2xs flex items-center justify-center"><svg class="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                            <div>
                                <div class="text-[10px] font-bold text-slate-400">Dəstək e-poçtu</div>
                                <a href="mailto:support@zeyvo.az" class="text-xs font-black text-tbank-graphite hover:underline">support@zeyvo.az</a>
                            </div>
                        </div>
                    </div>

                    <div class="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/60">
                        <h4 class="font-extrabold text-xs text-amber-900 flex items-center gap-1.5 mb-1">
                            <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18h6m-4 4h2m-7-10a6 6 0 1 1 12 0c0 3-2 4-2 6H9c0-2-2-3-2-6z"/></svg> 24/7 dəstək və kömək
                        </h4>
                        <p class="text-[11px] text-amber-800 leading-relaxed font-medium">
                            Rezervasiyalar, biznes qeydiyyatı və ya tərəfdaşlıqla bağlı hər hansı sualınız olduqda komandamız sizə operativ kömək etməyə hazırdır.
                        </p>
                    </div>
                </div>
            `;
        }
    },

    setAuthMode: function(mode) {
        this.authMode = mode;
        this.clearAuthError();

        const tabLogin = document.getElementById('authTabLogin');
        const tabRegister = document.getElementById('authTabRegister');
        const nameField = document.getElementById('authNameField');
        const phoneField = document.getElementById('authPhoneField');
        const confirmPasswordField = document.getElementById('authConfirmPasswordField');
        const termsField = document.getElementById('authTermsField');
        const forgotLink = document.getElementById('authForgotLink');
        const modalTitle = document.getElementById('authModalTitle');
        const modalSubtitle = document.getElementById('authModalSubtitle');
        const submitBtn = document.getElementById('authSubmitBtn');

        if (mode === 'login') {
            if (tabLogin) tabLogin.className = "flex-1 py-1.5 rounded-lg text-xs font-black transition bg-white shadow-sm text-tbank-graphite";
            if (tabRegister) tabRegister.className = "flex-1 py-1.5 rounded-lg text-xs font-bold transition text-slate-500 hover:text-tbank-graphite";
            if (nameField) nameField.classList.add('hidden');
            if (phoneField) phoneField.classList.add('hidden');
            if (confirmPasswordField) confirmPasswordField.classList.add('hidden');
            if (termsField) termsField.classList.add('hidden');
            if (forgotLink) forgotLink.classList.remove('hidden');
            if (modalTitle) modalTitle.textContent = "Zeyvo-ya daxil ol";
            if (modalSubtitle) modalSubtitle.textContent = "E-poçt və şifrənizi daxil edin";
            if (submitBtn) submitBtn.innerHTML = `<span>Daxil ol</span><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
        } else {
            if (tabLogin) tabLogin.className = "flex-1 py-1.5 rounded-lg text-xs font-bold transition text-slate-500 hover:text-tbank-graphite";
            if (tabRegister) tabRegister.className = "flex-1 py-1.5 rounded-lg text-xs font-black transition bg-white shadow-sm text-tbank-graphite";
            if (nameField) nameField.classList.remove('hidden');
            if (phoneField) phoneField.classList.remove('hidden');
            if (confirmPasswordField) confirmPasswordField.classList.remove('hidden');
            if (termsField) termsField.classList.remove('hidden');
            if (forgotLink) forgotLink.classList.add('hidden');
            if (modalTitle) modalTitle.textContent = "Yeni hesab yarat";
            if (modalSubtitle) modalSubtitle.textContent = "Qeydiyyatdan keçin və dərhal onlayn yazılın";
            if (submitBtn) submitBtn.innerHTML = `<span>Qeydiyyatı tamamla</span><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
        }
    },

    togglePasswordVisibility: function(inputId = 'authPasswordInput', eyeId = 'authEyeIcon') {
        const input = document.getElementById(inputId);
        const eye = document.getElementById(eyeId);
        if (!input) return;
        if (input.type === 'password') {
            input.type = 'text';
            if (eye) eye.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
        } else {
            input.type = 'password';
            if (eye) eye.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        }
    },

    showAuthError: function(msg) {
        const box = document.getElementById('authErrorMsg');
        if (box) {
            box.textContent = msg;
            box.classList.remove('hidden');
        }
    },

    clearAuthError: function() {
        const box = document.getElementById('authErrorMsg');
        if (box) box.classList.add('hidden');
    },

    submitEmailPasswordAuth: function(e) {
        if (e) e.preventDefault();
        this.clearAuthError();

        const email = document.getElementById('authEmailInput')?.value.trim();
        const password = document.getElementById('authPasswordInput')?.value.trim();
        const isRegister = (this.authMode === 'register');

        if (!email || !email.includes('@') || !email.includes('.')) {
            this.showAuthError("Zəhmət olmasa düzgün e-poçt ünvanı daxil edin.");
            return;
        }

        if (!password || password.length < 6) {
            this.showAuthError("Şifrə ən azı 6 simvoldan ibarət olmalıdır.");
            return;
        }

        if (isRegister) {
            const name = document.getElementById('authNameInput')?.value.trim();
            const phoneVal = document.getElementById('authPhoneInput')?.value.trim();
            const phoneDigits = this.getCleanAzPhone(phoneVal);
            const confirmPass = document.getElementById('authConfirmPasswordInput')?.value.trim();
            const termsChecked = document.getElementById('authTermsCheckbox')?.checked;

            if (!name || name.length < 2) {
                this.showAuthError("Zəhmət olmasa Ad və Soyadınızı daxil edin.");
                return;
            }

            if (!phoneDigits || phoneDigits.length < 9) {
                this.showAuthError("Zəhmət olmasa 9 rəqəmli mobil nömrənizi daxil edin (məs: 50 123 45 67).");
                return;
            }

            const phone = `+994 ${this.formatDisplayAzPhone(phoneDigits)}`;

            if (password !== confirmPass) {
                this.showAuthError("Daxil edilən şifrələr bir-biri ilə uyğun gəlmir.");
                return;
            }

            if (!termsChecked) {
                this.showAuthError("Davam etmək üçün istifadəçi şərtləri ilə razılaşmalısınız.");
                return;
            }

            const newUser = {
                name: name,
                email: email,
                phone: phone,
                city: 'Bakı',
                avatar: null,
                gender: null,
                registeredAt: new Date().toISOString()
            };

            localStorage.setItem('zeyvo_user', JSON.stringify(newUser));
            this.currentUser = newUser;
            this.updateUserAuthState();
            this.closeAuthModal();

            this.showToast(`Təbriklər, ${name}! Qeydiyyat uğurla tamamlandı.`);
            setTimeout(() => this.openProfileModal(), 350);
            return;
        }

        // Login Mode
        let existingUser = JSON.parse(localStorage.getItem('zeyvo_user') || 'null');
        if (!existingUser || existingUser.email !== email) {
            existingUser = {
                name: email.split('@')[0],
                email: email,
                phone: '+994 (50) 234-56-78',
                city: 'Bakı',
                avatar: null,
                gender: null,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('zeyvo_user', JSON.stringify(existingUser));
        }

        this.currentUser = existingUser;
        this.updateUserAuthState();
        this.closeAuthModal();
        this.showToast(`Xoş gəldiniz, ${existingUser.name}! Uğurla daxil oldunuz.`);
    },

    quickDemoLogin: function() {
        const emailInput = document.getElementById('authEmailInput');
        const passInput = document.getElementById('authPasswordInput');
        if (emailInput) emailInput.value = "demo@zeyvo.az";
        if (passInput) passInput.value = "zeyvo2026";
        this.setAuthMode('login');
        this.submitEmailPasswordAuth();
    },

    handleProfileClick: function() {
        if (this.currentUser) {
            this.openProfileModal();
        } else {
            this.setAuthMode('login');
            this.openAuthModal();
        }
    },

    openProfileModal: function() {
        if (!this.currentUser) {
            this.setAuthMode('login');
            this.openAuthModal();
            return;
        }

        const modal = document.getElementById('profileModal');
        if (!modal) return;

        // Populate fields
        const user = this.currentUser;
        const nameEl = document.getElementById('profileDisplayName');
        const emailEl = document.getElementById('profileDisplayEmail');
        const phoneEl = document.getElementById('profileDisplayPhone');
        const editName = document.getElementById('profileEditName');
        const editEmail = document.getElementById('profileEditEmail');
        const editPhone = document.getElementById('profileEditPhone');
        const editCity = document.getElementById('profileEditCity');

        if (nameEl) nameEl.textContent = user.name || 'İstifadəçi';
        if (emailEl) emailEl.textContent = user.email || '';
        if (phoneEl) phoneEl.textContent = user.phone || '+994 (50) 000-00-00';

        if (editName) editName.value = user.name || '';
        if (editEmail) editEmail.value = user.email || '';
        if (editPhone) editPhone.value = this.formatDisplayAzPhone(user.phone || '');
        if (editCity && user.city) editCity.value = user.city;

        // Gender & Avatar
        this.selectedGender = user.gender || null;
        this.updateGenderButtonsUI();
        this.updateProfileAvatarUI();

        this.renderProfileBookings();
        this.updateFavoritesBadge();
        this.setProfileTab('info');

        modal.classList.remove('hidden');
    },

    closeProfileModal: function() {
        const modal = document.getElementById('profileModal');
        if (modal) modal.classList.add('hidden');
    },

    setProfileTab: function(tab) {
        const tabInfo = document.getElementById('profileTabInfo');
        const tabBookings = document.getElementById('profileTabBookings');
        const tabFavorites = document.getElementById('profileTabFavorites');
        const tabSecurity = document.getElementById('profileTabSecurity');

        const secInfo = document.getElementById('profileSectionInfo');
        const secBookings = document.getElementById('profileSectionBookings');
        const secFavorites = document.getElementById('profileSectionFavorites');
        const secSecurity = document.getElementById('profileSectionSecurity');

        [tabInfo, tabBookings, tabFavorites, tabSecurity].forEach(btn => {
            if (btn) btn.className = "flex-1 py-1.5 rounded-lg text-xs font-bold transition text-slate-500 hover:text-tbank-graphite";
        });
        [secInfo, secBookings, secFavorites, secSecurity].forEach(sec => {
            if (sec) sec.classList.add('hidden');
        });

        if (tab === 'info') {
            if (tabInfo) tabInfo.className = "flex-1 py-1.5 rounded-lg text-xs font-black transition bg-white shadow-sm text-tbank-graphite";
            if (secInfo) secInfo.classList.remove('hidden');
        } else if (tab === 'bookings') {
            if (tabBookings) tabBookings.className = "flex-1 py-1.5 rounded-lg text-xs font-black transition bg-white shadow-sm text-tbank-graphite";
            if (secBookings) secBookings.classList.remove('hidden');
            this.renderProfileBookings();
        } else if (tab === 'favorites') {
            if (tabFavorites) tabFavorites.className = "flex-1 py-1.5 rounded-lg text-xs font-black transition bg-white shadow-sm text-tbank-graphite";
            if (secFavorites) secFavorites.classList.remove('hidden');
            this.renderProfileFavorites();
        } else if (tab === 'security') {
            if (tabSecurity) tabSecurity.className = "flex-1 py-1.5 rounded-lg text-xs font-black transition bg-white shadow-sm text-tbank-graphite";
            if (secSecurity) secSecurity.classList.remove('hidden');
        }
    },

    renderProfileBookings: function() {
        const container = document.getElementById('profileBookingsList');
        const badge = document.getElementById('profileBookingsCountBadge');
        if (!container) return;

        const bookings = this.bookings || [];
        if (badge) badge.textContent = bookings.length;

        if (bookings.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-slate-400">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2"><svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>
                    <div class="text-xs font-bold text-slate-600">Aktiv görüşünüz yoxdur</div>
                    <p class="text-[11px] text-slate-400 mt-0.5">Xidmət seçərək dərhal onlayn yazıla bilərsiniz</p>
                    <button onclick="App.closeProfileModal(); Router.navigate('/catalog');" class="mt-3 px-4 py-2 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition">
                        Kataloqa bax
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = bookings.map(b => `
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3">
                <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-xs text-tbank-graphite truncate">${b.salonName}</span>
                        <span class="bg-green-100 text-green-800 text-[9px] font-black px-1.5 py-0.2 rounded-full shrink-0">Təsdiqlənib</span>
                    </div>
                    ${b.masterName ? `<div class="text-[11px] font-bold text-slate-600 mt-0.5 truncate flex items-center gap-1"><svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>${b.masterName}</div>` : ''}
                    <div class="text-[11px] text-slate-500 font-medium mt-0.5 truncate">${b.serviceName}</div>
                    <div class="text-[11px] font-bold text-tbank-graphite mt-1 flex items-center gap-2">
                        <span class="flex items-center gap-1"><svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>${b.date}, ${b.time}</span>
                        <span class="font-black text-emerald-600 flex items-center gap-1"><svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 8v8m-4-4h8"/></svg>${b.price} AZN</span>
                    </div>
                </div>
                <button onclick="App.cancelBooking(${b.id})" class="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold shrink-0 transition" title="Ləğv et">
                    Ləğv et
                </button>
            </div>
        `).join('');
    },

    saveProfileChanges: function() {
        if (!this.currentUser) return;

        const name = document.getElementById('profileEditName')?.value.trim();
        const email = document.getElementById('profileEditEmail')?.value.trim();
        const phoneVal = document.getElementById('profileEditPhone')?.value.trim();
        const phoneDigits = this.getCleanAzPhone(phoneVal);
        const city = document.getElementById('profileEditCity')?.value;

        if (!name || !email) {
            this.showToast("Ad və E-poçt boş ola bilməz!");
            return;
        }

        const phone = phoneDigits ? `+994 ${this.formatDisplayAzPhone(phoneDigits)}` : '';

        this.currentUser.name = name;
        this.currentUser.email = email;
        this.currentUser.phone = phone;
        this.currentUser.city = city;
        if (this.selectedGender) {
            this.currentUser.gender = this.selectedGender;
        }

        localStorage.setItem('zeyvo_user', JSON.stringify(this.currentUser));
        this.updateUserAuthState();

        const nameEl = document.getElementById('profileDisplayName');
        const emailEl = document.getElementById('profileDisplayEmail');
        const phoneEl = document.getElementById('profileDisplayPhone');
        if (nameEl) nameEl.textContent = name;
        if (emailEl) emailEl.textContent = email;
        if (phoneEl) phoneEl.textContent = phone;

        this.showToast("Profil məlumatları uğurla yeniləndi!");
    },

    selectGender: function(gender) {
        this.selectedGender = gender;
        this.updateGenderButtonsUI();
        if (!this.currentUser?.avatar) {
            this.updateProfileAvatarUI();
        }
    },

    updateGenderButtonsUI: function() {
        const btnFemale = document.getElementById('genderBtnFemale');
        const btnMale = document.getElementById('genderBtnMale');
        const badge = document.getElementById('profileGenderBadge');

        if (btnFemale && btnMale) {
            if (this.selectedGender === 'female') {
                btnFemale.className = "h-10 px-3 rounded-xl border-2 border-pink-500 bg-pink-50 text-pink-700 font-black text-xs flex items-center justify-center gap-2 shadow-xs transition";
                btnMale.className = "h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100";
            } else if (this.selectedGender === 'male') {
                btnFemale.className = "h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100";
                btnMale.className = "h-10 px-3 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center gap-2 shadow-xs transition";
            } else {
                btnFemale.className = "h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100";
                btnMale.className = "h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition hover:bg-slate-100";
            }
        }

        if (badge) {
            if (this.selectedGender === 'female') {
                badge.textContent = 'Qadın';
                badge.className = "text-[10px] font-black px-1.5 py-0.5 rounded bg-pink-500/80 text-white shrink-0";
                badge.classList.remove('hidden');
            } else if (this.selectedGender === 'male') {
                badge.textContent = 'Kişi';
                badge.className = "text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-500/80 text-white shrink-0";
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    },

    updateProfileAvatarUI: function() {
        const avatarEl = document.getElementById('profileAvatar');
        const delBtn = document.getElementById('profileDeleteAvatarBtn');
        const user = this.currentUser || {};

        if (user.avatar) {
            if (avatarEl) avatarEl.innerHTML = `<img src="${user.avatar}" alt="Avatar" class="w-full h-full object-cover" />`;
            if (delBtn) delBtn.classList.remove('hidden');
        } else {
            if (avatarEl) avatarEl.innerHTML = '<svg class="w-12 h-12 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
            if (delBtn) delBtn.classList.add('hidden');
        }
    },

    handleAvatarUpload: function(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            this.showToast("Zəhmət olmasa şəkil formatı seçin!");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.showToast("Şəkil ölçüsü 5MB-dan kiçik olmalıdır!");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            if (!this.currentUser) {
                this.currentUser = { name: "İstifadəçi", email: "user@zeyvo.az" };
            }
            this.currentUser.avatar = base64;
            localStorage.setItem('zeyvo_user', JSON.stringify(this.currentUser));
            this.updateProfileAvatarUI();
            this.updateUserAuthState();
            this.showToast("Profil şəkli uğurla yükləndi!");
        };
        reader.readAsDataURL(file);
    },

    removeAvatar: function() {
        if (!this.currentUser) return;
        delete this.currentUser.avatar;
        localStorage.setItem('zeyvo_user', JSON.stringify(this.currentUser));
        this.updateProfileAvatarUI();
        this.updateUserAuthState();
        const input = document.getElementById('profileAvatarFileInput');
        if (input) input.value = '';
        this.showToast("Profil şəkli silindi.");
    },

    changeUserPassword: function() {
        const cur = document.getElementById('profileCurrentPassword')?.value.trim();
        const nxt = document.getElementById('profileNewPassword')?.value.trim();

        if (!nxt || nxt.length < 6) {
            this.showToast("Yeni şifrə ən azı 6 simvoldan ibarət olmalıdır!");
            return;
        }

        document.getElementById('profileCurrentPassword').value = '';
        document.getElementById('profileNewPassword').value = '';
        this.showToast("Şifrəniz uğurla yeniləndi!");
    },

    logout: function() {
        localStorage.removeItem('zeyvo_user');
        this.currentUser = null;
        this.updateUserAuthState();
        this.closeProfileModal();
        this.showToast("Hesabdan uğurla çıxış edildi.");
    },

    partnerLogout: function() {
        localStorage.removeItem('zeyvo_partner_user');
        this.partnerUser = null;
        this.showToast("Zeyvo Business hesabından çıxış edildi.");
        Router.navigate('/business/auth');
    },

    // Password Recovery State (3 steps: 1: Email, 2: 6-digit Code + Timer, 3: New Password)
    recoveryState: {
        step: 1,
        email: '',
        code: '',
        timer: null,
        timeLeft: 60
    },

    openForgotPassword: function(prefillEmail = null) {
        this.clearAuthError();
        const mainContainer = document.getElementById('authMainContainer');
        const forgotContainer = document.getElementById('authForgotContainer');
        const modalTitle = document.getElementById('authModalTitle');
        const modalSubtitle = document.getElementById('authModalSubtitle');

        if (mainContainer) mainContainer.classList.add('hidden');
        if (forgotContainer) forgotContainer.classList.remove('hidden');

        if (modalTitle) modalTitle.textContent = "Şifrənin bərpası";
        if (modalSubtitle) modalSubtitle.textContent = "Təhlükəsizlik kodu ilə şifrəni yeniləyin";

        const currentLoginEmail = document.getElementById('authEmailInput')?.value.trim();
        const emailToUse = prefillEmail || currentLoginEmail || '';
        const forgotEmailInput = document.getElementById('forgotEmailInput');
        if (forgotEmailInput) {
            forgotEmailInput.value = emailToUse;
        }

        this.goToForgotStep(1);
    },

    cancelForgotPassword: function() {
        if (this.recoveryState.timer) {
            clearInterval(this.recoveryState.timer);
            this.recoveryState.timer = null;
        }
        const mainContainer = document.getElementById('authMainContainer');
        const forgotContainer = document.getElementById('authForgotContainer');
        if (forgotContainer) forgotContainer.classList.add('hidden');
        if (mainContainer) mainContainer.classList.remove('hidden');

        this.setAuthMode('login');
    },

    forgotPassword: function() {
        this.openForgotPassword();
    },

    showForgotError: function(stepNum, msg) {
        const box = document.getElementById(`forgotError${stepNum}`);
        if (box) {
            box.textContent = msg;
            box.classList.remove('hidden');
        }
    },

    clearForgotError: function(stepNum) {
        if (stepNum) {
            const box = document.getElementById(`forgotError${stepNum}`);
            if (box) box.classList.add('hidden');
        } else {
            [1, 2, 3].forEach(s => {
                const box = document.getElementById(`forgotError${s}`);
                if (box) box.classList.add('hidden');
            });
        }
    },

    goToForgotStep: function(step) {
        this.recoveryState.step = step;
        this.clearForgotError();

        const s1 = document.getElementById('forgotStep1');
        const s2 = document.getElementById('forgotStep2');
        const s3 = document.getElementById('forgotStep3');

        if (s1) s1.classList.toggle('hidden', step !== 1);
        if (s2) s2.classList.toggle('hidden', step !== 2);
        if (s3) s3.classList.toggle('hidden', step !== 3);

        if (step === 1) {
            const emailInput = document.getElementById('forgotEmailInput');
            if (emailInput) setTimeout(() => emailInput.focus(), 100);
        } else if (step === 2) {
            const display = document.getElementById('forgotTargetEmailDisplay');
            if (display) display.textContent = this.recoveryState.email;
            this.clearOtpBoxes();
            setTimeout(() => {
                const firstBox = document.querySelector('#forgotOtpContainer .otp-box');
                if (firstBox) firstBox.focus();
            }, 100);
        } else if (step === 3) {
            const newPass = document.getElementById('forgotNewPasswordInput');
            if (newPass) {
                newPass.value = '';
                setTimeout(() => newPass.focus(), 100);
            }
            const confirmPass = document.getElementById('forgotConfirmPasswordInput');
            if (confirmPass) confirmPass.value = '';
        }
    },

    sendRecoveryCode: function() {
        this.clearForgotError(1);
        const emailInput = document.getElementById('forgotEmailInput');
        const email = emailInput?.value.trim();

        if (!email || !email.includes('@') || !email.includes('.')) {
            this.showForgotError(1, "Zəhmət olmasa düzgün e-poçt ünvanı daxil edin.");
            return;
        }

        this.recoveryState.email = email;
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        this.recoveryState.code = code;

        this.goToForgotStep(2);
        this.startForgotTimer();
        this.showToast(`Təsdiq kodu ${email} ünvanına göndərildi: ${code}`);
    },

    startForgotTimer: function() {
        if (this.recoveryState.timer) {
            clearInterval(this.recoveryState.timer);
            this.recoveryState.timer = null;
        }

        this.recoveryState.timeLeft = 60;
        const timerBox = document.getElementById('forgotTimerBox');
        const resendBtn = document.getElementById('forgotResendBtn');
        const countdownEl = document.getElementById('forgotCountdown');

        if (timerBox) timerBox.classList.remove('hidden');
        if (resendBtn) resendBtn.classList.add('hidden');
        if (countdownEl) countdownEl.textContent = "01:00";

        this.recoveryState.timer = setInterval(() => {
            this.recoveryState.timeLeft--;
            const rem = this.recoveryState.timeLeft;

            if (rem <= 0) {
                clearInterval(this.recoveryState.timer);
                this.recoveryState.timer = null;
                if (timerBox) timerBox.classList.add('hidden');
                if (resendBtn) resendBtn.classList.remove('hidden');
            } else {
                const sec = rem < 10 ? '0' + rem : rem;
                if (countdownEl) countdownEl.textContent = `00:${sec}`;
            }
        }, 1000);
    },

    resendRecoveryCode: function() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        this.recoveryState.code = code;
        this.clearOtpBoxes();
        this.clearForgotError(2);
        this.startForgotTimer();
        this.showToast(`Yeni təsdiq kodu göndərildi: ${code}`);
        const firstBox = document.querySelector('#forgotOtpContainer .otp-box');
        if (firstBox) firstBox.focus();
    },

    clearOtpBoxes: function() {
        document.querySelectorAll('#forgotOtpContainer .otp-box').forEach(box => {
            box.value = '';
        });
    },

    onOtpInput: function(el, index) {
        this.clearForgotError(2);
        el.value = el.value.replace(/\D/g, '').slice(-1);
        if (el.value) {
            const boxes = document.querySelectorAll('#forgotOtpContainer .otp-box');
            if (index < boxes.length - 1) {
                boxes[index + 1].focus();
            } else {
                let fullCode = '';
                boxes.forEach(b => fullCode += b.value);
                if (fullCode.length === 6) {
                    this.verifyRecoveryCode();
                }
            }
        }
    },

    onOtpKeydown: function(e, el, index) {
        if (e.key === 'Backspace' && !el.value) {
            const boxes = document.querySelectorAll('#forgotOtpContainer .otp-box');
            if (index > 0) {
                boxes[index - 1].focus();
            }
        }
    },

    onOtpPaste: function(e) {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text');
        const digits = pasteData.replace(/\D/g, '').slice(0, 6);
        if (!digits) return;
        const boxes = document.querySelectorAll('#forgotOtpContainer .otp-box');
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].value = digits[i] || '';
        }
        if (digits.length >= 6) {
            boxes[boxes.length - 1].focus();
            this.verifyRecoveryCode();
        } else if (digits.length > 0) {
            boxes[digits.length].focus();
        }
    },

    autoFillRecoveryCode: function() {
        const code = this.recoveryState.code || "123456";
        const boxes = document.querySelectorAll('#forgotOtpContainer .otp-box');
        for (let i = 0; i < boxes.length && i < code.length; i++) {
            boxes[i].value = code[i];
        }
        this.clearForgotError(2);
        this.showToast(`Kod daxil edildi: ${code}`);
        setTimeout(() => this.verifyRecoveryCode(), 200);
    },

    verifyRecoveryCode: function() {
        this.clearForgotError(2);
        let enteredCode = '';
        document.querySelectorAll('#forgotOtpContainer .otp-box').forEach(b => enteredCode += b.value.trim());

        if (enteredCode.length < 6) {
            this.showForgotError(2, "Zəhmət olmasa 6 rəqəmli kodu tam daxil edin.");
            return;
        }

        const validCode = this.recoveryState.code;
        if (enteredCode === validCode || enteredCode === "123456") {
            if (this.recoveryState.timer) {
                clearInterval(this.recoveryState.timer);
                this.recoveryState.timer = null;
            }
            this.goToForgotStep(3);
            this.showToast("Kod təsdiqləndi! Yeni şifrə təyin edin");
        } else {
            this.showForgotError(2, "Daxil edilmiş təsdiq kodu yanlışdır. Yenidən cəhd edin.");
        }
    },

    saveNewPassword: function() {
        this.clearForgotError(3);
        const newPass = document.getElementById('forgotNewPasswordInput')?.value.trim();
        const confirmPass = document.getElementById('forgotConfirmPasswordInput')?.value.trim();

        if (!newPass || newPass.length < 6) {
            this.showForgotError(3, "Yeni şifrə ən azı 6 simvoldan ibarət olmalıdır.");
            return;
        }

        if (newPass !== confirmPass) {
            this.showForgotError(3, "Daxil edilən şifrələr bir-biri ilə uyğun gəlmir.");
            return;
        }

        const email = this.recoveryState.email || "user@zeyvo.az";

        let existingUser = JSON.parse(localStorage.getItem('zeyvo_user') || 'null');
        if (!existingUser) {
            existingUser = {
                name: email.split('@')[0],
                email: email,
                phone: '+994 (50) 234-56-78',
                city: 'Bakı',
                avatar: null,
                gender: null,
                password: newPass,
                registeredAt: new Date().toISOString()
            };
        } else {
            existingUser.email = email;
            existingUser.password = newPass;
        }

        localStorage.setItem('zeyvo_user', JSON.stringify(existingUser));
        this.currentUser = existingUser;
        this.updateUserAuthState();

        this.cancelForgotPassword();
        this.closeAuthModal();

        this.showToast(`Şifrəniz uğurla yeniləndi! Xoş gəldiniz, ${existingUser.name}!`);
    },

    formatAzPhone: function(el) {
        if (!el) return;
        let digits = el.value.replace(/\D/g, '');
        if (digits.startsWith('994')) digits = digits.slice(3);
        digits = digits.slice(0, 9);

        let formatted = '';
        if (digits.length > 0) {
            formatted += '(' + digits.slice(0, 2);
            if (digits.length >= 2) formatted += ') ';
        }
        if (digits.length > 2) {
            formatted += digits.slice(2, 5);
        }
        if (digits.length > 5) {
            formatted += '-' + digits.slice(5, 7);
        }
        if (digits.length > 7) {
            formatted += '-' + digits.slice(7, 9);
        }
        el.value = formatted;
    },

    getCleanAzPhone: function(val) {
        if (!val) return '';
        let digits = String(val).replace(/\D/g, '');
        if (digits.startsWith('994')) digits = digits.slice(3);
        return digits.slice(0, 9);
    },

    formatDisplayAzPhone: function(digitsOrVal) {
        if (!digitsOrVal) return '';
        let digits = String(digitsOrVal).replace(/\D/g, '');
        if (digits.startsWith('994')) digits = digits.slice(3);
        digits = digits.slice(0, 9);
        if (digits.length === 0) return '';

        let formatted = '';
        if (digits.length > 0) {
            formatted += '(' + digits.slice(0, 2);
            if (digits.length >= 2) formatted += ') ';
        }
        if (digits.length > 2) formatted += digits.slice(2, 5);
        if (digits.length > 5) formatted += '-' + digits.slice(5, 7);
        if (digits.length > 7) formatted += '-' + digits.slice(7, 9);
        return formatted;
    },

    updateUserAuthState: function() {
        this.currentUser = JSON.parse(localStorage.getItem('zeyvo_user') || 'null');
        const authBtn = document.getElementById('authBtn');
        const profileHeader = document.getElementById('userProfileHeader');
        const headerEmail = document.getElementById('headerUserEmail');
        const mobileAuthBtn = document.getElementById('mobileAuthBtn');
        const headerAvatar = document.getElementById('headerAvatarSpan');
        const mobileAvatar = document.getElementById('mobileAvatarSpan');

        if (this.currentUser) {
            if (authBtn) authBtn.classList.add('hidden');
            if (profileHeader) profileHeader.classList.remove('hidden');
            if (headerEmail) headerEmail.textContent = this.currentUser.name || this.currentUser.email;

            // Render Header Avatar
            if (headerAvatar) {
                if (this.currentUser.avatar) {
                    headerAvatar.innerHTML = `<img src="${this.currentUser.avatar}" alt="Avatar" class="w-full h-full object-cover" />`;
                } else {
                    headerAvatar.innerHTML = '<svg class="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                }
            }

            // Render Mobile Avatar
            if (mobileAvatar) {
                if (this.currentUser.avatar) {
                    mobileAvatar.innerHTML = `<img src="${this.currentUser.avatar}" alt="Avatar" class="w-full h-full object-cover" />`;
                } else {
                    mobileAvatar.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`;
                }
            }

            if (mobileAuthBtn) {
                mobileAuthBtn.classList.remove('bg-tbank-graphite', 'text-white');
                mobileAuthBtn.classList.add('bg-tbank-yellow', 'text-tbank-graphite');
                mobileAuthBtn.title = this.currentUser.name;
            }
        } else {
            if (authBtn) authBtn.classList.remove('hidden');
            if (profileHeader) profileHeader.classList.add('hidden');
            if (mobileAuthBtn) {
                mobileAuthBtn.classList.remove('bg-tbank-yellow', 'text-tbank-graphite');
                mobileAuthBtn.classList.add('bg-tbank-graphite', 'text-white');
            }
            if (headerAvatar) headerAvatar.innerHTML = '<svg class="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
            if (mobileAvatar) mobileAvatar.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`;
        }

        // Sync header badges with auth status
        this.updateBadge();
        this.updateFavoritesBadge();

        // Update heart icons across the page according to login status
        document.querySelectorAll('[class*="fav-btn-"]').forEach(btn => {
            const svg = btn.querySelector('svg');
            if (svg) {
                const isLiked = btn.getAttribute('data-id') && btn.getAttribute('data-type') && this.isFavorite(btn.getAttribute('data-type'), btn.getAttribute('data-id'));
                if (isLiked) {
                    svg.classList.add('text-rose-500', 'fill-current');
                    svg.classList.remove('fill-none', 'text-slate-600', 'text-slate-400', 'text-slate-500', 'text-slate-300');
                } else {
                    svg.classList.remove('text-rose-500', 'fill-current');
                    svg.classList.add('fill-none');
                }
            }
        });
    },
    
    // More Categories Modal Handler
    openMoreCategoriesModal: function() {
        const modal = document.getElementById('moreCategoriesModal');
        const list = document.getElementById('moreCategoriesList');
        if (!modal || !list) return;

        this.renderMoreModalCategories();
        modal.classList.remove('hidden');
    },

    closeMoreCategoriesModal: function() {
        const modal = document.getElementById('moreCategoriesModal');
        if (modal) modal.classList.add('hidden');
    },

    renderMoreModalCategories: function(filterQuery = "") {
        const list = document.getElementById('moreCategoriesList');
        if (!list || !ZeyvoData.allCategoriesGrouped) return;

        const q = filterQuery.toLowerCase().trim();

        list.innerHTML = ZeyvoData.allCategoriesGrouped.map(group => {
            const matchingItems = group.items.filter(item => !q || item.toLowerCase().includes(q) || group.title.toLowerCase().includes(q));
            if (matchingItems.length === 0) return '';

            return `
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <div class="flex items-center gap-2 mb-2.5">
                        <span class="text-base">${group.icon}</span>
                        <h4 class="font-bold text-xs sm:text-sm text-tbank-graphite">${group.title}</h4>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                        ${matchingItems.map(item => `
                            <button onclick="App.selectFromMoreModal('${group.id}', '${item}')" 
                                    class="px-3 py-1.5 rounded-lg bg-white hover:bg-tbank-yellow border border-slate-200 text-xs font-semibold text-tbank-graphite transition shadow-2xs">
                                ${item}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    },

    filterMoreModalCategories: function(query) {
        this.renderMoreModalCategories(query);
    },

    selectFromMoreModal: function(topCatId, itemName) {
        this.closeMoreCategoriesModal();
        this.currentTopCategory = topCatId;
        this.searchQuery = itemName;
        
        const input = document.getElementById('searchInput');
        if (input) input.value = itemName;

        this.selectTopCategory(topCatId);
        this.showToast(`Seçildi: ${itemName}`);

        setTimeout(() => {
            document.getElementById('salons')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    },

    
    // Photo Gallery & Fullscreen Lightbox System
    currentSalonGallery: [],
    activeGalleryFilter: 'all',
    lightboxIndex: 0,

    initSalonGallery: function(salonId) {
        if (ZeyvoData.getSalonGallery) {
            this.currentSalonGallery = ZeyvoData.getSalonGallery(salonId);
        } else {
            this.currentSalonGallery = [];
        }
        this.activeGalleryFilter = 'all';
        this.renderGallery();
    },

    filterGallery: function(type) {
        this.activeGalleryFilter = type;
        document.querySelectorAll('.gallery-tab-btn').forEach(btn => {
            const isTab = btn.getAttribute('data-tab') === type;
            if (isTab) {
                btn.className = "gallery-tab-btn active px-3 py-1.5 rounded-lg text-xs font-bold transition bg-white text-tbank-graphite shadow-sm";
            } else {
                btn.className = "gallery-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold transition text-slate-500 hover:text-tbank-graphite";
            }
        });
        this.renderGallery();
    },

    renderGallery: function() {
        const grid = document.getElementById('salonGalleryGrid');
        if (!grid) return;

        const filtered = this.currentSalonGallery.filter(item => {
            if (this.activeGalleryFilter === 'all') return true;
            return item.type === this.activeGalleryFilter;
        });

        const badge = document.getElementById('galleryCountBadge');
        if (badge) badge.textContent = `${filtered.length} foto`;

        grid.innerHTML = filtered.map((item, idx) => {
            const actualIdx = this.currentSalonGallery.indexOf(item);
            const isInterior = item.type === 'interior';
            return `
                <div onclick="App.openLightbox(${actualIdx})" class="group relative h-36 sm:h-44 rounded-2xl overflow-hidden bg-slate-900 cursor-pointer shadow-sm border border-slate-100 hover:shadow-md transition">
                    <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition"></div>

                    <!-- Type Tag -->
                    <span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold ${isInterior ? 'bg-white/90 text-tbank-graphite backdrop-blur-sm' : 'bg-tbank-yellow text-tbank-graphite'}">
                        ${isInterior ? 'İnteryer' : 'İş nümunəsi'}
                    </span>

                    <!-- Title & Zoom Icon -->
                    <div class="absolute bottom-2.5 inset-x-2.5 text-white flex items-end justify-between gap-1">
                        <div class="text-[11px] font-bold leading-tight truncate flex-1">${item.title}</div>
                        <div class="w-6 h-6 rounded-lg bg-black/40 flex items-center justify-center shrink-0 group-hover:bg-black/60 transition">
                            <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/></svg>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    openMasterLightbox: function(idx) {
        if (typeof MasterDetailView !== 'undefined' && MasterDetailView.currentPortfolio) {
            this.currentSalonGallery = MasterDetailView.currentPortfolio;
            this.openLightbox(idx);
        }
    },

    openLightbox: function(idx) {
        if (!this.currentSalonGallery || this.currentSalonGallery.length === 0) return;
        this.lightboxIndex = idx;
        const modal = document.getElementById('photoLightboxModal');
        if (!modal) return;

        this.updateLightboxContent();
        modal.classList.remove('hidden');

        // Keyboard navigation
        window.onkeydown = (e) => {
            if (e.key === 'Escape') App.closeLightbox();
            if (e.key === 'ArrowRight') App.nextLightboxPhoto();
            if (e.key === 'ArrowLeft') App.prevLightboxPhoto();
        };
    },

    closeLightbox: function() {
        const modal = document.getElementById('photoLightboxModal');
        if (modal) modal.classList.add('hidden');
        window.onkeydown = null;
    },

    nextLightboxPhoto: function() {
        if (this.currentSalonGallery.length === 0) return;
        this.lightboxIndex = (this.lightboxIndex + 1) % this.currentSalonGallery.length;
        this.updateLightboxContent();
    },

    prevLightboxPhoto: function() {
        if (this.currentSalonGallery.length === 0) return;
        this.lightboxIndex = (this.lightboxIndex - 1 + this.currentSalonGallery.length) % this.currentSalonGallery.length;
        this.updateLightboxContent();
    },

    updateLightboxContent: function() {
        const item = this.currentSalonGallery[this.lightboxIndex];
        if (!item) return;

        const img = document.getElementById('lightboxImg');
        const tag = document.getElementById('lightboxTag');
        const counter = document.getElementById('lightboxCounter');
        const title = document.getElementById('lightboxTitle');

        if (img) img.src = item.img;
        if (tag) {
            tag.textContent = item.type === 'interior' ? 'İnteryer' : 'Görülən iş (portfel)';
            tag.className = item.type === 'interior' 
                ? 'px-2.5 py-1 rounded-lg bg-white/20 text-white font-bold text-xs'
                : 'px-2.5 py-1 rounded-lg bg-tbank-yellow text-tbank-graphite font-bold text-xs';
        }
        if (counter) counter.textContent = `${this.lightboxIndex + 1} / ${this.currentSalonGallery.length}`;
        if (title) title.textContent = item.title;
    },

    currentLang: 'az',
    languages: {
        az: { code: 'AZ', name: 'Azərbaycan' },
        ru: { code: 'RU', name: 'Русский' },
        tr: { code: 'TR', name: 'Türkçe' },
        en: { code: 'EN', name: 'English' }
    },

    getLangFlagSvg: function(code) {
        if (code === 'ru') {
            return `<svg viewBox="0 0 900 600" class="w-full h-full object-cover">
                <rect width="900" height="200" fill="#ffffff"/>
                <rect y="200" width="900" height="200" fill="#0039A6"/>
                <rect y="400" width="900" height="200" fill="#D52B1E"/>
            </svg>`;
        }
        if (code === 'tr') {
            return `<svg viewBox="0 0 1200 800" class="w-full h-full object-cover">
                <rect width="1200" height="800" fill="#E30A17"/>
                <circle cx="430" cy="400" r="200" fill="#ffffff"/>
                <circle cx="480" cy="400" r="160" fill="#E30A17"/>
                <polygon points="640,400 690,416 720,375 710,425 755,450 705,455 690,500 670,455 620,450 660,425" fill="#ffffff"/>
            </svg>`;
        }
        if (code === 'en') {
            return `<svg viewBox="0 0 60 30" class="w-full h-full object-cover">
                <clipPath id="ukClip"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
                <g clip-path="url(#ukClip)">
                    <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="3"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
                </g>
            </svg>`;
        }
        // Default AZ
        return `<svg viewBox="0 0 1200 600" class="w-full h-full object-cover">
            <rect width="1200" height="200" fill="#00B5E2"/>
            <rect y="200" width="1200" height="200" fill="#EF3340"/>
            <rect y="400" width="1200" height="200" fill="#509E2F"/>
            <circle cx="585" cy="300" r="60" fill="#ffffff"/>
            <circle cx="600" cy="300" r="48" fill="#EF3340"/>
            <polygon points="630,300 645,304 656,295 655,308 668,312 656,316 655,329 645,320 630,324 639,312" fill="#ffffff"/>
        </svg>`;
    },

    toggleLangDropdown: function(target = 'desktop', event) {
        if (event) event.stopPropagation();
        const menuId = (target === 'mobile') ? 'langDropdownMobile' : 'langDropdownDesktop';
        const chevronId = (target === 'mobile') ? 'langChevronMobile' : 'langChevronDesktop';
        const menu = document.getElementById(menuId);
        const chevron = document.getElementById(chevronId);
        if (!menu) return;

        const isHidden = menu.classList.contains('hidden');
        this.closeLangDropdown();

        if (isHidden) {
            menu.classList.remove('hidden');
            if (chevron) chevron.classList.add('rotate-180');
        }
    },

    closeLangDropdown: function() {
        ['langDropdownDesktop', 'langDropdownMobile'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        ['langChevronDesktop', 'langChevronMobile'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('rotate-180');
        });
    },

    selectLanguage: function(code) {
        if (!this.languages[code]) return;
        this.currentLang = code;
        const langObj = this.languages[code];

        // Update labels
        const desktopLabel = document.getElementById('langLabel');
        const mobileLabel = document.getElementById('mobileLangLabel');
        if (desktopLabel) desktopLabel.textContent = langObj.code;
        if (mobileLabel) mobileLabel.textContent = langObj.code;

        // Update flag badges
        const desktopFlag = document.getElementById('langFlagDesktop');
        const mobileFlag = document.getElementById('langFlagMobile');
        const svgHtml = this.getLangFlagSvg(code);
        if (desktopFlag) desktopFlag.innerHTML = svgHtml;
        if (mobileFlag) mobileFlag.innerHTML = svgHtml;

        // Update active checkmarks and background in dropdowns
        ['az', 'ru', 'tr', 'en'].forEach(langKey => {
            const isCurrent = (langKey === code);
            document.querySelectorAll(`.lang-opt-${langKey}`).forEach(btn => {
                if (isCurrent) {
                    btn.classList.add('bg-slate-50', 'font-bold');
                } else {
                    btn.classList.remove('bg-slate-50', 'font-bold');
                }
            });
            document.querySelectorAll(`.check-${langKey}`).forEach(chk => {
                if (isCurrent) {
                    chk.classList.remove('hidden');
                } else {
                    chk.classList.add('hidden');
                }
            });
        });

        this.closeLangDropdown();
        this.showToast(`Dil seçildi: ${langObj.name} (${langObj.code})`);
    },

    getServiceName: function(srv, lang = this.currentLang) {
        if (!srv) return '';
        if (srv.translations && srv.translations[lang] && srv.translations[lang].name && srv.translations[lang].name.trim()) {
            return srv.translations[lang].name.trim();
        }
        return srv.name || '';
    },

    getServiceDescription: function(srv, lang = this.currentLang) {
        if (!srv) return '';
        if (srv.translations && srv.translations[lang] && srv.translations[lang].description && srv.translations[lang].description.trim()) {
            return srv.translations[lang].description.trim();
        }
        return srv.description || '';
    },
    showToast: function(msg) {
        const toast = document.getElementById('toast');
        const text = document.getElementById('toastText');
        if (!toast || !text) return;
        text.textContent = msg;
        toast.classList.remove('hidden');
        if (this._toastTimer) clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
    },

    handleReviewClick: function() {
        if (this.currentUser) {
            this.showToast("Təşəkkür edirik! Rəyiniz qeydə alındı və yoxlanışdadır. ⭐");
        } else {
            this.setAuthMode('login');
            this.openAuthModal();
        }
    },

// ========================================================
    // DIKIDI-STYLE CATALOG VIEW LOGIC & FILTERS
    // ========================================================
    catalogFilter: {
        search: "",
        sort: "default",
        city: "Bakı",
        type: "all", // all, companies, masters
        vipOnly: false,
        awardsOnly: false,
        limit: 12
    },

    renderCatalogList: function() {
        const grid = document.getElementById('catalogCardsGrid');
        if (!grid) return;

        const catId = this.currentTopCategory || 'beauty';
        const subId = this.currentSubcategory || 'all';

        // 1. Filter Salons (Companies)
        let matchingSalons = ZeyvoData.salons.filter(s => {
            if (s.topCategory !== catId) return false;
            if (subId !== 'all' && s.category !== subId) return false;
            if (this.catalogFilter.vipOnly && s.badge !== 'Premium' && s.badge !== 'Lüks' && s.badge !== 'Top Detailing' && s.badge !== 'Top Klinika') return false;
            if (this.catalogFilter.awardsOnly && s.badge !== 'Zeyvo 2026' && s.badge !== 'Top Salon' && s.rating < 4.96) return false;
            if (this.catalogFilter.search) {
                const q = this.catalogFilter.search.toLowerCase();
                const m = s.name.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q) || s.location.toLowerCase().includes(q) || s.services.some(srv => srv.name.toLowerCase().includes(q));
                if (!m) return false;
            }
            return true;
        }).map(s => ({
            id: s.id,
            type: 'company',
            name: s.name,
            image: s.image,
            location: s.location,
            rating: s.rating,
            reviewsCount: s.reviewsCount,
            badge: s.badge,
            price: s.services[0]?.price || 0,
            tag: s.tag
        }));

        // 2. Filter Masters (Specialists)
        let matchingMasters = ZeyvoData.masters.filter(m => {
            if (m.topCategory !== catId) return false;
            if (this.catalogFilter.vipOnly && m.rating < 4.99) return false;
            if (this.catalogFilter.awardsOnly && m.rating < 5.0) return false;
            if (this.catalogFilter.search) {
                const q = this.catalogFilter.search.toLowerCase();
                const match = m.name.toLowerCase().includes(q) || m.title.toLowerCase().includes(q) || m.salonName.toLowerCase().includes(q);
                if (!match) return false;
            }
            return true;
        }).map(m => ({
            id: m.id,
            type: 'specialist',
            name: m.name,
            image: m.photo,
            location: m.salonName,
            rating: m.rating,
            reviewsCount: Math.floor(m.rating * 22) + 20,
            badge: m.title.includes('Top') || m.title.includes('Baş') ? 'AWARDS 2026' : null,
            price: 25,
            salonName: m.salonName,
            tag: m.title
        }));

        // 3. Combine according to Type filter
        let combined = [];
        if (this.catalogFilter.type === 'companies') {
            combined = matchingSalons;
        } else if (this.catalogFilter.type === 'masters') {
            combined = matchingMasters;
        } else {
            // Interleave companies and specialists
            const maxLen = Math.max(matchingSalons.length, matchingMasters.length);
            for (let i = 0; i < maxLen; i++) {
                if (i < matchingSalons.length) combined.push(matchingSalons[i]);
                if (i < matchingMasters.length) combined.push(matchingMasters[i]);
            }
        }

        // 4. Sort Items
        if (this.catalogFilter.sort === 'rating') {
            combined.sort((a, b) => b.rating - a.rating);
        } else if (this.catalogFilter.sort === 'price') {
            combined.sort((a, b) => a.price - b.price);
        } else {
            combined.sort((a, b) => b.reviewsCount - a.reviewsCount);
        }

        // 5. Update Count Badge
        const countBadge = document.getElementById('catalogItemsCountBadge');
        if (countBadge) {
            countBadge.textContent = `${combined.length} məkan və usta`;
        }

        // 6. Handle Empty State
        if (combined.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full p-10 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2"><svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></div>
                    <div class="font-extrabold text-sm text-tbank-graphite">Seçilmiş filtrlər üzrə heç nə tapılmadı</div>
                    <p class="text-xs text-slate-400 mt-1">Filtrləri təmizləyin və ya axtarış sorğusunu dəyişin</p>
                    <button onclick="App.resetCatalogFilters()" class="mt-4 px-5 py-2.5 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition">Filtrləri sıfırla</button>
                </div>
            `;
            const loadMore = document.getElementById('catalogLoadMoreContainer');
            if (loadMore) loadMore.classList.add('hidden');
            return;
        }

        // 7. Load More Container Visibility
        const loadMore = document.getElementById('catalogLoadMoreContainer');
        if (loadMore) {
            loadMore.classList.toggle('hidden', combined.length <= this.catalogFilter.limit);
        }

        const itemsToShow = combined.slice(0, this.catalogFilter.limit);

        // 8. Render Horizontal DIKIDI-style Cards
        grid.innerHTML = itemsToShow.map(item => `
            <div class="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 shadow-sm hover:shadow-md transition flex items-center gap-3 relative group">
                <!-- Photo Thumbnail -->
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer" 
                     onclick="${item.type === 'company' ? `Router.navigate('/salon/${item.id}')` : `Router.navigate('/master/${item.id}')`}">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                </div>

                <!-- Info -->
                <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-1">
                        <h4 class="font-extrabold text-xs sm:text-sm text-tbank-graphite truncate hover:text-black cursor-pointer"
                            onclick="${item.type === 'company' ? `Router.navigate('/salon/${item.id}')` : `Router.navigate('/master/${item.id}')`}">
                            ${item.name}
                        </h4>
                        <button onclick="App.toggleFavorite(${item.id}, '${item.type}', event)" class="fav-btn-${item.type === 'company' ? 'salon' : 'master'}-${item.id} transition p-1 shrink-0 active:scale-90" title="Seçilmişlərə əlavə et">
                            <svg class="w-4 h-4 ${this.isFavorite(item.type, item.id) ? 'text-rose-500 fill-current' : 'text-slate-300 hover:text-rose-500 fill-none stroke-current'}" stroke-width="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </button>
                    </div>

                    <p class="text-[11px] text-slate-400 truncate mt-0.5">
                        ${item.location}
                    </p>

                    <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span class="text-[11px] font-black text-amber-500 flex items-center gap-0.5">
                            <svg class="w-3 h-3 text-amber-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${item.rating} <span class="text-[10px] text-slate-400 font-normal">(${item.reviewsCount})</span>
                        </span>
                        ${item.badge ? `
                            <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                ${item.badge}
                            </span>
                        ` : ''}
                        <span class="text-[9px] font-semibold text-slate-400">
                            • ${item.type === 'company' ? 'Məkan' : 'Usta'}
                        </span>
                    </div>

                    <div class="mt-2 flex items-center justify-between">
                        <div class="text-[11px] font-bold text-tbank-graphite">
                            ${item.price > 0 ? `dan ${item.price} ₼` : 'Onlayn qəbul'}
                        </div>
                        <button onclick="${item.type === 'company' ? `App.startBooking(${item.id})` : `App.bookMaster('${item.name}', '${item.salonName}')`}" 
                                class="px-3.5 py-1.5 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-[11px] shadow-sm transition whitespace-nowrap">
                            Qəbula yazıl
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

    },

    handleCatalogSearch: function(val) {
        this.catalogFilter.search = val;
        this.renderCatalogList();
    },

    sortCatalog: function(val) {
        this.catalogFilter.sort = val;
        this.renderCatalogList();
    },

    setCatalogTypeFilter: function(val) {
        this.catalogFilter.type = val;
        // Sync desktop & mobile radios
        document.querySelectorAll('input[name="catalogTypeFilterDesktop"], input[name="mobileTypeFilter"]').forEach(r => {
            r.checked = (r.value === val);
        });
        this.renderCatalogList();
    },

    toggleFilterParam: function(param, checked) {
        if (param === 'vip') {
            this.catalogFilter.vipOnly = checked;
            const d = document.getElementById('filterVipDesktop');
            const m = document.getElementById('filterVipMobile');
            if (d) d.checked = checked;
            if (m) m.checked = checked;
        } else if (param === 'awards') {
            this.catalogFilter.awardsOnly = checked;
            const d = document.getElementById('filterAwardsDesktop');
            const m = document.getElementById('filterAwardsMobile');
            if (d) d.checked = checked;
            if (m) m.checked = checked;
        }
        this.renderCatalogList();
    },

    filterOnlyAwards: function() {
        this.catalogFilter.awardsOnly = !this.catalogFilter.awardsOnly;
        this.toggleFilterParam('awards', this.catalogFilter.awardsOnly);
    },

    resetCatalogCategory: function() {
        this.currentSubcategory = 'all';
        Router.navigate(`/catalog/${this.currentTopCategory}`);
    },

    resetCatalogFilters: function() {
        this.catalogFilter = {
            search: "",
            sort: "default",
            city: "Bakı",
            type: "all",
            vipOnly: false,
            awardsOnly: false,
            limit: 12
        };
        const s1 = document.getElementById('catalogSearchInput');
        if (s1) s1.value = '';
        const s2 = document.getElementById('mobileFilterSearch');
        if (s2) s2.value = '';
        this.toggleFilterParam('vip', false);
        this.toggleFilterParam('awards', false);
        this.setCatalogTypeFilter('all');
        this.renderCatalogList();
    },

    openFilterModal: function() {
        const m = document.getElementById('catalogMobileFilterModal');
        if (m) m.classList.remove('hidden');
    },

    closeFilterModal: function() {
        const m = document.getElementById('catalogMobileFilterModal');
        if (m) m.classList.add('hidden');
    },

    loadMoreCatalogItems: function() {
        this.catalogFilter.limit += 8;
        this.renderCatalogList();
    },

    favorites: {
        salons: [],
        masters: []
    },
    favoritesFilter: 'all',

    initFavorites: function() {
        try {
            const raw = localStorage.getItem('zeyvo_favorites');
            if (raw) {
                const parsed = JSON.parse(raw);
                let salons = Array.isArray(parsed.salons) ? parsed.salons : [];
                let masters = Array.isArray(parsed.masters) ? parsed.masters : [];
                // Clean old hardcoded demo defaults if legacy flag not present
                if (localStorage.getItem('zeyvo_fav_clean_v2') !== 'done') {
                    if (salons.length === 2 && salons.includes(1) && salons.includes(3) && masters.length === 1 && masters.includes(1)) {
                        salons = [];
                        masters = [];
                        localStorage.setItem('zeyvo_favorites', JSON.stringify({ salons, masters }));
                    }
                    localStorage.setItem('zeyvo_fav_clean_v2', 'done');
                }
                this.favorites = { salons, masters };
            } else {
                this.favorites = { salons: [], masters: [] };
            }
        } catch (e) {
            this.favorites = { salons: [], masters: [] };
        }
        this.updateFavoritesBadge();
    },

    saveFavorites: function() {
        localStorage.setItem('zeyvo_favorites', JSON.stringify(this.favorites));
        this.updateFavoritesBadge();
    },

    isFavorite: function(type, id) {
        if (!this.currentUser) return false;
        id = parseInt(id);
        if (type === 'salon' || type === 'company') {
            return (this.favorites.salons || []).includes(id);
        } else if (type === 'master' || type === 'specialist') {
            return (this.favorites.masters || []).includes(id);
        }
        return false;
    },

    toggleFavorite: function(id, type = 'salon', event) {
        if (event) event.stopPropagation();
        if (!this.currentUser) {
            this.showToast("Bəyəndiyiniz məkanları yadda saxlamaq üçün hesabınıza daxil olun");
            this.openAuthModal();
            return;
        }
        id = parseInt(id);
        const isMaster = (type === 'master' || type === 'specialist');
        const listKey = isMaster ? 'masters' : 'salons';
        if (!this.favorites[listKey]) this.favorites[listKey] = [];
        const arr = this.favorites[listKey];
        const idx = arr.indexOf(id);

        let added = false;
        if (idx > -1) {
            arr.splice(idx, 1);
            added = false;
            this.showToast("Seçilmişlərdən çıxarıldı");
        } else {
            arr.push(id);
            added = true;
            this.showToast("Seçilmişlərə əlavə edildi");
        }

        this.saveFavorites();

        // Update all heart icons in active DOM matching this item
        const itemKey = isMaster ? 'master' : 'salon';
        document.querySelectorAll(`.fav-btn-${itemKey}-${id}`).forEach(btn => {
            const svg = btn.querySelector('svg');
            if (svg) {
                if (added) {
                    svg.classList.add('text-rose-500', 'fill-current');
                    svg.classList.remove('fill-none', 'text-slate-600', 'text-slate-400', 'text-slate-500', 'text-slate-300');
                } else {
                    svg.classList.remove('text-rose-500', 'fill-current');
                    svg.classList.add('fill-none');
                }
            }
        });

        this.renderFavoritesList();
        this.renderProfileFavorites();
    },

    updateFavoritesBadge: function() {
        const total = this.currentUser ? ((this.favorites.salons?.length || 0) + (this.favorites.masters?.length || 0)) : 0;
        const headerBadge = document.getElementById('favoritesCountBadge');
        const mobileBadge = document.getElementById('mobileFavoritesBadge');
        const profileBadge = document.getElementById('profileFavoritesCountBadge');
        const favCountAll = document.getElementById('favCountAll');
        const favCountSalons = document.getElementById('favCountSalons');
        const favCountMasters = document.getElementById('favCountMasters');

        if (headerBadge) {
            headerBadge.textContent = total;
            headerBadge.classList.toggle('hidden', total === 0);
        }
        if (mobileBadge) {
            mobileBadge.textContent = total;
            mobileBadge.classList.toggle('hidden', total === 0);
        }
        if (profileBadge) {
            profileBadge.textContent = total;
        }
        if (favCountAll) favCountAll.textContent = total;
        if (favCountSalons) favCountSalons.textContent = this.currentUser ? (this.favorites.salons?.length || 0) : 0;
        if (favCountMasters) favCountMasters.textContent = this.currentUser ? (this.favorites.masters?.length || 0) : 0;
    },

    openFavoritesModal: function() {
        if (!this.currentUser) {
            this.showToast("Seçilmişləri görmək üçün hesabınıza daxil olun");
            this.openAuthModal();
            return;
        }
        this.renderFavoritesList();
        const modal = document.getElementById('favoritesModal');
        if (modal) modal.classList.remove('hidden');
    },

    closeFavoritesModal: function() {
        const modal = document.getElementById('favoritesModal');
        if (modal) modal.classList.add('hidden');
    },

    setFavoritesFilter: function(filter) {
        this.favoritesFilter = filter;
        const bAll = document.getElementById('favTabAll');
        const bSalons = document.getElementById('favTabSalons');
        const bMasters = document.getElementById('favTabMasters');

        [bAll, bSalons, bMasters].forEach(b => {
            if (b) b.className = "flex-1 py-1.5 rounded-lg text-xs font-bold transition text-slate-500 hover:text-tbank-graphite";
        });

        if (filter === 'all' && bAll) bAll.className = "flex-1 py-1.5 rounded-lg text-xs font-black transition bg-white shadow-sm text-tbank-graphite";
        if (filter === 'salons' && bSalons) bSalons.className = "flex-1 py-1.5 rounded-lg text-xs font-black transition bg-white shadow-sm text-tbank-graphite";
        if (filter === 'masters' && bMasters) bMasters.className = "flex-1 py-1.5 rounded-lg text-xs font-black transition bg-white shadow-sm text-tbank-graphite";

        this.renderFavoritesList();
    },

    getFavoriteItemsData: function(filter = 'all') {
        if (!this.currentUser) return [];
        let items = [];

        if (filter === 'all' || filter === 'salons') {
            (this.favorites.salons || []).forEach(sId => {
                const s = ZeyvoData.salons.find(item => item.id === sId);
                if (s) {
                    items.push({
                        type: 'salon',
                        id: s.id,
                        name: s.name,
                        image: s.image,
                        subtitle: s.location,
                        tag: s.tag,
                        rating: s.rating,
                        reviewsCount: s.reviewsCount
                    });
                }
            });
        }

        if (filter === 'all' || filter === 'masters') {
            (this.favorites.masters || []).forEach(mId => {
                const m = ZeyvoData.masters.find(item => item.id === mId);
                if (m) {
                    items.push({
                        type: 'master',
                        id: m.id,
                        name: m.name,
                        image: m.photo,
                        subtitle: `${m.title} • ${m.salonName}`,
                        tag: m.experience,
                        rating: m.rating,
                        reviewsCount: Math.floor(m.rating * 22) + 20,
                        salonName: m.salonName
                    });
                }
            });
        }

        return items;
    },

    renderFavoritesList: function() {
        const container = document.getElementById('favoritesList');
        if (!container) return;

        const items = this.getFavoriteItemsData(this.favoritesFilter);

        if (items.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-2"><svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                    <div class="font-bold text-xs text-tbank-graphite">Hələ ki heç nə seçilməyib</div>
                    <p class="text-[11px] text-slate-400 mt-1">Salon və ya ustaların üzərindəki ürək ikonuna klikləyərək bura əlavə edə bilərsiniz.</p>
                    <button onclick="App.closeFavoritesModal(); Router.navigate('/catalog')" class="mt-3.5 px-4 py-2 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition">
                        Kataloqa keç →
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between gap-3 group hover:border-slate-300 transition">
                <div class="flex items-center gap-3 min-w-0 cursor-pointer flex-1" onclick="App.closeFavoritesModal(); Router.navigate('${item.type === 'salon' ? `/salon/${item.id}` : `/master/${item.id}`}');">
                    <div class="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img src="${item.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" alt="${item.name}" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <div class="font-black text-xs sm:text-sm text-tbank-graphite truncate">${item.name}</div>
                        <div class="text-[11px] text-slate-500 truncate mt-0.5">${item.subtitle}</div>
                        <div class="text-[10px] font-black text-amber-500 mt-1 flex items-center gap-1">
                            <svg class="w-3 h-3 text-amber-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${item.rating} <span class="text-slate-400 font-normal">(${item.tag})</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-1.5 shrink-0">
                    <button onclick="${item.type === 'salon' ? `App.closeFavoritesModal(); App.startBooking(${item.id})` : `App.closeFavoritesModal(); App.bookMaster('${item.name}', '${item.salonName}')`}" 
                            class="px-3 py-1.5 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite text-xs font-black transition shadow-xs">
                        Yazıl
                    </button>
                    <button onclick="App.toggleFavorite(${item.id}, '${item.type}', event)" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center justify-center transition" title="Seçilmişlərdən sil">
                        <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
            </div>
        `).join('');
    },

    renderProfileFavorites: function() {
        const container = document.getElementById('profileFavoritesList');
        if (!container) return;

        const items = this.getFavoriteItemsData('all');
        if (items.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-2"><svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                    <div class="font-bold text-xs text-tbank-graphite">Seçilmiş salon və usta yoxdur</div>
                    <p class="text-[11px] text-slate-400 mt-1">Kataloqdan bəyəndiyiniz məkanları ürək işarəsi ilə seçin.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition">
                <div class="flex items-center gap-3 min-w-0 cursor-pointer flex-1" onclick="App.closeProfileModal(); Router.navigate('${item.type === 'salon' ? `/salon/${item.id}` : `/master/${item.id}`}');">
                    <img src="${item.image}" class="w-12 h-12 rounded-xl object-cover shrink-0" alt="${item.name}" />
                    <div class="min-w-0">
                        <div class="font-black text-xs text-tbank-graphite truncate">${item.name}</div>
                        <div class="text-[10px] text-slate-400 truncate">${item.subtitle}</div>
                        <div class="text-[10px] font-bold text-amber-500 mt-0.5 flex items-center gap-1"><svg class="w-2.5 h-2.5 text-amber-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${item.rating} • ${item.type === 'salon' ? 'Salon' : 'Usta'}</div>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <button onclick="${item.type === 'salon' ? `App.closeProfileModal(); App.startBooking(${item.id})` : `App.closeProfileModal(); App.bookMaster('${item.name}', '${item.salonName}')`}" 
                            class="px-2.5 py-1.5 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite text-[11px] font-black transition">
                        Yazıl
                    </button>
                    <button onclick="App.toggleFavorite(${item.id}, '${item.type}', event)" class="w-7 h-7 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center justify-center transition" title="Sil">
                        <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
            </div>
        `).join('');
    },

    showOnMap: function() {
        this.showToast("Xəritə baxışı aktivləşdirilir");
    },
};

window.addEventListener('DOMContentLoaded', () => {
    App.init();
});
