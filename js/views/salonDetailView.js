// ========================================================
// SALON DETAIL VIEW (MOBILE FIRST + DIKIDI / FINTECH HYBRID)
// ========================================================
const SalonDetailView = {
    render: function(params) {
        const id = parseInt(params.id) || 1;
        const salon = ZeyvoData.salons.find(s => s.id === id) || ZeyvoData.salons[0];
        
        let salonMasters = ZeyvoData.masters.filter(m => m.salonId === salon.id);
        if (salonMasters.length === 0) {
            salonMasters = ZeyvoData.masters.filter(m => m.topCategory === salon.topCategory);
        }
        if (salonMasters.length === 0) {
            salonMasters = ZeyvoData.masters.slice(0, 4);
        }

        return `
            <div class="space-y-4 sm:space-y-6 pb-20 sm:pb-6">
                <!-- Breadcrumbs & Mobile Back Navigation -->
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 min-w-0">
                        <button onclick="window.history.back()" class="sm:hidden inline-flex items-center gap-1 h-8 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-tbank-graphite shadow-xs active:scale-95 transition shrink-0">
                            <span>←</span>
                            <span>Geri</span>
                        </button>
                        <div class="text-xs text-slate-400 font-semibold flex items-center gap-1.5 truncate">
                            <a href="#/" class="hover:text-tbank-graphite">Əsas səhifə</a>
                            <span>/</span>
                            <a href="#/salons" class="hover:text-tbank-graphite">Kataloq</a>
                            <span>/</span>
                            <span class="text-tbank-graphite font-bold truncate">${salon.name}</span>
                        </div>
                    </div>

                    <!-- Mobile Favorite Button in top bar -->
                    <button onclick="App.toggleFavorite(${salon.id}, 'salon', event)" class="fav-btn-salon-${salon.id} sm:hidden w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-500 shadow-xs transition active:scale-90 shrink-0" title="Seçilmişlər">
                        <svg class="w-4 h-4 ${App.isFavorite('salon', salon.id) ? 'text-rose-500 fill-current' : 'fill-none stroke-current'}" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                </div>

                <!-- 1. Top Header Card (Mobile First) -->
                <div class="bg-white rounded-3xl p-5 sm:p-7 border border-tbank-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div class="flex items-start gap-4">
                        <!-- Salon Logo Badge -->
                        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 border border-tbank-border flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                            <img src="${salon.image}" alt="${salon.name}" class="w-full h-full object-cover" />
                        </div>

                        <!-- Salon Info -->
                        <div class="min-w-0 flex-1">
                            <div class="flex flex-wrap items-center gap-2">
                                <h1 class="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-tbank-graphite">${salon.name}</h1>
                                <span class="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">Açıqdır</span>
                            </div>
                            <p class="text-xs text-slate-500 font-medium mt-1 truncate"><svg class="w-3.5 h-3.5 text-slate-400 shrink-0 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> ${salon.location}</p>

                            <div class="flex flex-wrap items-center gap-3 mt-2 text-xs">
                                <a href="tel:+994125002026" class="flex items-center gap-1 text-slate-600 hover:text-tbank-graphite font-semibold">
                                    <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    <span>+994 (12) 500-20-26</span>
                                </a>
                                <a href="https://instagram.com" target="_blank" class="flex items-center gap-1 text-rose-600 hover:underline font-semibold">
                                    <span>@${salon.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}</span>
                                </a>
                            </div>

                            <div class="flex flex-wrap items-center gap-2 sm:gap-3 mt-2.5">
                                <div class="flex items-center gap-1">
                                    <span class="text-sm font-black text-tbank-graphite">${salon.rating}</span>
                                    <div class="flex text-amber-400 gap-0.5"><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                                    <span class="text-xs text-slate-400 font-medium">(${salon.reviewsCount})</span>
                                </div>
                                <span class="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 text-[10px] font-black border border-amber-200">
                                    <svg class="w-3 h-3 text-amber-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34M18 4H6v7a6 6 0 0 0 12 0V4Z"/></svg>Zeyvo Awards
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Action Buttons (Desktop buttons) -->
                    <div class="hidden sm:flex items-center gap-2 shrink-0">
                        <button onclick="App.toggleFavorite(${salon.id}, 'salon', event)" title="Sevimlilər" class="fav-btn-salon-${salon.id} w-10 h-10 rounded-xl border border-tbank-border hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-rose-500 transition active:scale-90">
                            <svg class="w-4 h-4 ${App.isFavorite('salon', salon.id) ? 'text-rose-500 fill-current' : 'fill-none stroke-current'}" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </button>
                        <button onclick="App.showToast('Çat açılır...')" title="Mesaj" class="w-10 h-10 rounded-xl border border-tbank-border hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-black transition">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </button>
                        <button onclick="App.startBooking(${salon.id})" class="h-10 px-6 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition">
                            Onlayn yazıl
                        </button>
                    </div>
                </div>

                <!-- 2. Two-Column Info: Description + On the map -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                    <!-- Description -->
                    <div class="md:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm flex flex-col justify-between">
                        <div>
                            <h2 class="font-black text-sm sm:text-base text-tbank-graphite mb-2">Haqqında</h2>
                            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                ${salon.description} Yüksək sanitariya standartları, sertifikatlı avadanlıqlar və peşəkar komanda.
                            </p>
                        </div>
                        <div class="mt-4 pt-3 border-t border-tbank-border/70 flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-600">
                            <span class="px-2 py-1 rounded-lg bg-tbank-bg"><svg class="w-3 h-3 text-emerald-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Pulsuz Wi-Fi</span>
                            <span class="px-2 py-1 rounded-lg bg-tbank-bg"><svg class="w-3 h-3 text-emerald-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Kartla ödəniş</span>
                            <span class="px-2 py-1 rounded-lg bg-tbank-bg"><svg class="w-3 h-3 text-emerald-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Çay / kofe</span>
                            <span class="px-2 py-1 rounded-lg bg-tbank-bg"><svg class="w-3 h-3 text-emerald-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Parkinq</span>
                            <span class="px-2 py-1 rounded-lg bg-tbank-bg"><svg class="w-3 h-3 text-emerald-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Steril alətlər</span>
                        </div>
                    </div>

                    <!-- On the map -->
                    <div class="md:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm flex flex-col justify-between">
                        <div class="flex items-center justify-between mb-2">
                            <h2 class="font-black text-sm sm:text-base text-tbank-graphite">Xəritədə</h2>
                            <span class="text-xs text-slate-400 font-medium">${salon.distance}</span>
                        </div>
                        
                        <div class="relative h-28 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                            <div class="absolute inset-0 opacity-40" style="background-image: radial-gradient(#94a3b8 1px, transparent 1px); background-size: 16px 16px;"></div>
                            <div class="relative z-10 flex flex-col items-center">
                                <div class="px-2.5 py-1 rounded-lg bg-tbank-graphite text-white font-extrabold text-[11px] shadow-md flex items-center gap-1">
                                    <span class="w-1.5 h-1.5 rounded-full bg-tbank-yellow"></span>
                                    <span>${salon.name.split(' ')[0]}</span>
                                </div>
                                <div class="w-2 h-2 bg-tbank-graphite rotate-45 -mt-1"></div>
                            </div>
                            <button onclick="App.showToast('Xəritə açılır...')" class="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-white/95 text-tbank-graphite text-[10px] font-black shadow-sm border border-black/5">
                                Xəritədə bax →
                            </button>
                        </div>
                        <div class="mt-2 text-xs text-slate-500 font-medium">
                            İş qrafiki: <span class="font-bold text-tbank-graphite">${salon.workHours}</span>
                        </div>
                    </div>
                </div>

                
                <!-- Photo Gallery Section (İnteryer & Görülən işlər) -->
                <div class="bg-white rounded-3xl p-5 sm:p-7 border border-tbank-border shadow-sm space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <div class="flex items-center gap-2">
                                <h2 class="font-black text-base sm:text-lg text-tbank-graphite">Fotoqalereya</h2>
                                <span id="galleryCountBadge" class="px-2 py-0.5 rounded-full bg-tbank-bg text-tbank-graphite font-bold text-xs">8 foto</span>
                            </div>
                            <p class="text-xs text-slate-400 font-medium mt-0.5">Məkanın ab-havası və ustaların real iş nümunələri</p>
                        </div>

                        <!-- Gallery Filter Tabs (Hamısı, İnteryer, İşlər) -->
                        <div class="flex items-center gap-1.5 bg-tbank-bg p-1 rounded-xl shrink-0 overflow-x-auto no-scrollbar">
                            <button onclick="App.filterGallery('all')" class="gallery-tab-btn active px-3 py-1.5 rounded-lg text-xs font-bold transition bg-white text-tbank-graphite shadow-sm" data-tab="all">
                                Hamısı
                            </button>
                            <button onclick="App.filterGallery('interior')" class="gallery-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold transition text-slate-500 hover:text-tbank-graphite" data-tab="interior">
                                <span class="inline-flex items-center gap-1"><svg class="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><circle cx="14" cy="12" r="1"/></svg> İnteryer</span>
                            </button>
                            <button onclick="App.filterGallery('works')" class="gallery-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold transition text-slate-500 hover:text-tbank-graphite" data-tab="works">
                                <span class="inline-flex items-center gap-1"><svg class="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> İş nümunələri</span>
                            </button>
                        </div>
                    </div>

                    <!-- Photo Grid / Carousel -->
                    <div id="salonGalleryGrid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
                        <!-- Populated dynamically by App.renderGallery -->
                    </div>
                </div>


                <!-- 3. Specialists (Mobile Touch Rail / Desktop Grid) -->
                <div class="bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <h2 class="font-black text-base sm:text-lg text-tbank-graphite">Mütəxəssislər</h2>
                            <span class="px-2 py-0.5 rounded-full bg-tbank-bg text-tbank-graphite font-bold text-xs">${salonMasters.length}</span>
                        </div>
                    </div>

                    <div class="flex gap-3 overflow-x-auto no-scrollbar touch-snap-x pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4">
                        ${salonMasters.map(m => `
                            <div class="touch-snap-start shrink-0 w-[140px] sm:w-auto p-3 rounded-2xl bg-tbank-bg/60 border border-tbank-border/70 text-center flex flex-col items-center justify-between hover:shadow-sm transition">
                                <a href="#/master/${m.id}" class="group block w-full">
                                    <img src="${m.photo}" alt="${m.name}" class="w-14 h-14 rounded-full mx-auto object-cover border-2 border-white shadow-sm group-hover:scale-105 transition" />
                                    <h4 class="font-extrabold text-xs text-tbank-graphite mt-2 truncate w-full group-hover:underline">${m.name}</h4>
                                    <div class="text-[10px] text-slate-400 font-semibold mt-0.5">${m.title}</div>
                                    <div class="mt-1 text-[10px] font-extrabold text-tbank-graphite flex items-center justify-center gap-1"><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>${m.rating}</span></div>
                                </a>
                                <div class="mt-3 w-full flex items-center gap-1.5">
                                    <a href="#/master/${m.id}" class="flex-1 h-7 rounded-lg bg-white hover:bg-slate-100 border border-tbank-border text-tbank-graphite font-bold text-[10px] flex items-center justify-center transition">
                                        Profil
                                    </a>
                                    <button onclick="App.bookMaster('${m.name}', '${salon.name}')" class="flex-1 h-7 rounded-lg bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-[10px] transition shadow-xs">
                                        Yazıl
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 4. Services List -->
                <div class="bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <h2 class="font-black text-base sm:text-lg text-tbank-graphite">Xidmətlər</h2>
                            <span class="px-2 py-0.5 rounded-full bg-tbank-bg text-tbank-graphite font-bold text-xs">${salon.services.length}</span>
                        </div>
                    </div>

                    <div class="divide-y divide-tbank-border/70">
                        ${salon.services.map((srv) => `
                            <div class="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                                <div class="min-w-0 flex-1">
                                    <h3 class="font-black text-xs sm:text-sm text-tbank-graphite truncate">${typeof App !== 'undefined' && App.getServiceName ? App.getServiceName(srv) : srv.name}</h3>
                                    <p class="text-[11px] text-slate-400 font-medium mt-0.5">${srv.duration}</p>
                                </div>

                                <div class="flex items-center gap-3 shrink-0">
                                    <div class="font-black text-sm sm:text-base text-tbank-graphite">${srv.price} ₼</div>
                                    <button onclick="App.startBooking(${salon.id}, null, null, ${srv.id})" class="h-8 px-4 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs transition shadow-sm">
                                        Yazıl
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 5. Reviews Section -->
                <div class="bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="font-black text-base sm:text-lg text-tbank-graphite">Müştəri rəyləri</h2>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <!-- Score Card -->
                        <div class="md:col-span-4 bg-tbank-bg/50 p-4 sm:p-5 rounded-2xl border border-tbank-border/80 flex flex-col justify-between">
                            <div>
                                <div class="flex items-baseline gap-2">
                                    <span class="text-3xl sm:text-4xl font-black text-tbank-graphite">5.0</span>
                                    <span class="text-xs font-bold text-slate-400">/ 5</span>
                                </div>
                                <div class="flex text-amber-400 gap-0.5"><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                                <p class="text-[11px] text-slate-500 font-medium mt-0.5">464 rəy əsasında</p>

                                <div class="mt-4 space-y-1.5 text-xs font-semibold text-slate-500">
                                    <div class="flex items-center gap-2">
                                        <span class="w-4 text-[11px]">5 ulduz</span>
                                        <div class="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                            <div class="h-full bg-amber-400 rounded-full w-[94%]"></div>
                                        </div>
                                        <span class="w-7 text-right text-[10px]">94%</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="w-4 text-[11px]">4 ulduz</span>
                                        <div class="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                            <div class="h-full bg-amber-400 rounded-full w-[5%]"></div>
                                        </div>
                                        <span class="w-7 text-right text-[10px]">5%</span>
                                    </div>
                                </div>
                            </div>

                            <button onclick="App.handleReviewClick()" class="mt-4 w-full h-9 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition">
                                Rəy bildir
                            </button>
                        </div>

                        <!-- Reviews List -->
                        <div class="md:col-span-8 space-y-3">
                            <div class="p-4 rounded-2xl border border-tbank-border bg-white shadow-sm space-y-2">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <div class="w-7 h-7 rounded-full bg-tbank-yellow text-tbank-graphite font-black text-[10px] flex items-center justify-center">AR</div>
                                        <div>
                                            <div class="font-extrabold text-xs text-tbank-graphite">Aygün R.</div>
                                            <div class="text-[10px] text-slate-400">27 sentyabr 2026</div>
                                        </div>
                                    </div>
                                    <div class="flex text-amber-400 gap-0.5"><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                                </div>
                                <div class="text-[11px] text-tbank-graphite font-black">Kombinə manikür</div>
                                <p class="text-xs text-slate-600 leading-relaxed font-medium">
                                    Hər şey çox səliqəli və sterildir. Çox razı qaldım.
                                </p>
                            </div>

                            <div class="p-4 rounded-2xl border border-tbank-border bg-white shadow-sm space-y-2">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <div class="w-7 h-7 rounded-full bg-slate-200 text-tbank-graphite font-black text-[10px] flex items-center justify-center">KM</div>
                                        <div>
                                            <div class="font-extrabold text-xs text-tbank-graphite">Kənan M.</div>
                                            <div class="text-[10px] text-slate-400">24 sentyabr 2026</div>
                                        </div>
                                    </div>
                                    <div class="flex text-amber-400 gap-0.5"><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                                </div>
                                <div class="text-[11px] text-tbank-graphite font-black">Saç kəsimi & Saqqal</div>
                                <p class="text-xs text-slate-600 leading-relaxed font-medium">
                                    Dəqiq vaxtında qəbul etdilər, atmosfer çox rahatdır.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- 6. Mobile Sticky Bottom Action Bar (Thumb-Accessible, Safe Area) -->
                <div class="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-tbank-border z-50 p-3 px-4 flex items-center justify-between shadow-2xl safe-pb">
                    <div>
                        <div class="text-[10px] font-bold text-slate-400">Başlanğıc qiymət:</div>
                        <div class="text-base font-black text-tbank-graphite">${salon.services[0]?.price || 25} ₼-dan</div>
                    </div>
                    <button onclick="App.startBooking(${salon.id})" class="h-11 px-8 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs transition shadow-sm active:scale-95">
                        Onlayn yazıl
                    </button>
                </div>

            </div>
        `;
    },
    afterRender: function(params) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const id = (params && params.id) ? (parseInt(params.id) || 1) : 1;
        App.initSalonGallery(id);
    }
};
