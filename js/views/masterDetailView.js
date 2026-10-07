// ========================================================
// MASTER DETAIL VIEW (MOBILE FIRST SPECIALIST PROFILE)
// ========================================================
const MasterDetailView = {
    render: function(params) {
        const id = parseInt(params.id) || 1;
        const master = ZeyvoData.masters.find(m => m.id === id) || ZeyvoData.masters[0];
        const salon = ZeyvoData.salons.find(s => s.id === master.salonId) || ZeyvoData.salons[0];

        // Ensure default services for this master if not defined
        const services = master.services || [
            { name: "Əsas xidmət (" + master.title + ")", duration: "45 dəq", price: 25 },
            { name: "Kompleks premium qulluq", duration: "60 dəq", price: 40 },
            { name: "Ekspress xidmət", duration: "30 dəq", price: 20 },
            { name: "Fərdi konsultasiya və dizayn", duration: "20 dəq", price: 15 }
        ];

        // Ensure default portfolio photos for this master
        const portfolio = master.portfolio || [
            { title: "Nümunə iş #1", image: master.photo, category: "Portfolio" },
            { title: "Nümunə iş #2", image: salon.image, category: "Nəticə" },
            { title: "Nümunə iş #3", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80", category: "Klassik" },
            { title: "Nümunə iş #4", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80", category: "Dizayn" }
        ];

        // Store portfolio for fullscreen lightbox modal
        MasterDetailView.currentPortfolio = portfolio.map(p => ({
            img: p.image,
            title: `${master.name} — ${p.title} (${p.category})`,
            type: 'portfolio'
        }));

        // Ensure default slots
        const slots = master.slots || ["10:30", "12:00", "14:30", "16:00", "17:30", "19:00"];

        // Ensure reviews
        const reviews = master.reviews || [
            { author: "Nərmin Qasımova", rating: 5, date: "28 sentyabr 2026", service: services[0].name, text: `${master.name} əsl peşəkardır! Hər şey çox səliqəli və yüksək səviyyədə oldu. Çox razı qaldım.` },
            { author: "Rəşad Əliyev", rating: 5, date: "24 sentyabr 2026", service: services[1].name, text: `Dəqiq vaxtında qəbul etdi, detallara xüsusi diqqət yetirir. Hər kəsə tövsiyə edirəm!` },
            { author: "Aysel M.", rating: 5, date: "20 sentyabr 2026", service: services[0].name, text: `Çox mehriban və təcrübəli ustadır. Artıq daimi müştərisiyəm.` }
        ];

        const reviewsCount = master.reviewsCount || reviews.length + 38;

        return `
            <div class="space-y-4 sm:space-y-6 pb-24 sm:pb-8">
                <!-- Breadcrumbs & Mobile Back (Azerbaijani) -->
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 min-w-0">
                        <button onclick="window.history.back()" class="sm:hidden inline-flex items-center gap-1 h-8 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-tbank-graphite shadow-xs active:scale-95 transition shrink-0">
                            <span>←</span>
                            <span>Geri</span>
                        </button>
                        <nav class="text-xs text-slate-500 font-medium flex items-center gap-1.5 truncate">
                            <a href="#/" class="hover:text-tbank-graphite hover:underline">Əsas səhifə</a>
                            <span>›</span>
                            <a href="#/masters" class="hover:text-tbank-graphite hover:underline">Ustalar</a>
                            <span>›</span>
                            <span class="text-tbank-graphite font-bold truncate">${master.name}</span>
                        </nav>
                    </div>

                    <!-- Mobile Favorite Button in top bar -->
                    <button onclick="App.toggleFavorite(${master.id}, 'master', event)" class="fav-btn-master-${master.id} sm:hidden w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-500 shadow-xs transition active:scale-90 shrink-0" title="Seçilmişlər">
                        <svg class="w-4 h-4 ${App.isFavorite('master', master.id) ? 'text-rose-500 fill-current' : 'fill-none stroke-current'}" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                </div>

                <!-- 1. Top Specialist Profile Card (Mobile First) -->
                <div class="bg-white rounded-3xl p-5 sm:p-7 border border-tbank-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div class="flex items-start gap-4 sm:gap-5">
                        <!-- Master Photo with Available Status -->
                        <div class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border border-tbank-border shadow-sm shrink-0">
                            <img src="${master.photo}" alt="${master.name}" class="w-full h-full object-cover" />
                            <div class="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" title="Aktivdir"></div>
                        </div>

                        <!-- Master Info -->
                        <div class="min-w-0 flex-1">
                            <div class="flex flex-wrap items-center gap-2">
                                <h1 class="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-tbank-graphite">${master.name}</h1>
                                <span class="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1"></span> Boş saatlar var
                                </span>
                            </div>

                            <div class="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                                ${master.title} • <span class="text-slate-500 font-medium">${master.experience}</span>
                            </div>

                            <!-- Workplace Salon link -->
                            <div class="mt-1.5">
                                <a href="#/salon/${salon.id}" class="inline-flex items-center gap-1.5 text-xs font-bold text-tbank-graphite hover:underline group">
                                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    <span class="group-hover:text-black">${salon.name}</span>
                                    <span class="text-slate-400 font-normal">(${salon.location})</span>
                                    <span class="text-[10px] text-slate-400">→</span>
                                </a>
                            </div>

                            <div class="flex flex-wrap items-center gap-2 sm:gap-3 mt-2.5">
                                <div class="flex items-center gap-1">
                                    <span class="text-sm font-black text-tbank-graphite">${master.rating}</span>
                                    <div class="flex text-amber-400 gap-0.5"><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                                    <span class="text-xs text-slate-400 font-medium">(${reviewsCount} rəy)</span>
                                </div>
                                <span class="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 text-[10px] font-black border border-amber-200">
                                    <svg class="w-3 h-3 text-amber-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34M18 4H6v7a6 6 0 0 0 12 0V4Z"/></svg>Top usta 2026
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Action Buttons (Desktop) -->
                    <div class="hidden sm:flex items-center gap-2 shrink-0">
                        <button onclick="App.toggleFavorite(${master.id}, 'master', event)" title="Sevimlilərə əlavə et" class="fav-btn-master-${master.id} w-10 h-10 rounded-xl border border-tbank-border hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-rose-500 transition active:scale-90">
                            <svg class="w-4 h-4 ${App.isFavorite('master', master.id) ? 'text-rose-500 fill-current' : 'fill-none stroke-current'}" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </button>
                        <button onclick="App.showToast('Çat açılır...')" title="Mesaj yaz" class="w-10 h-10 rounded-xl border border-tbank-border hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-black transition">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </button>
                        <button onclick="App.bookMaster('${master.name}', '${salon.name}')" class="h-10 px-6 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition">
                            Qəbula yazıl
                        </button>
                    </div>
                </div>

                <!-- 2. Main 2-Column Grid (Left: Content, Right: Booking Card) -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                    
                    <!-- LEFT COLUMN (Details, Services, Portfolio, Reviews) -->
                    <div class="lg:col-span-8 space-y-5">
                        
                        <!-- About the Master ("Haqqında") -->
                        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm space-y-3">
                            <h2 class="font-black text-sm sm:text-base text-tbank-graphite">Usta haqqında</h2>
                            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                ${master.bio || `${master.name} — sahəsində ${master.experience} malik peşəkar mütəxəssisdir. Hər bir müştəriyə fərdi yanaşır, ən son trendləri və gigiyena standartlarını tətbiq edir.`}
                            </p>
                            <div class="pt-3 border-t border-tbank-border/70 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
                                <span class="px-2.5 py-1 rounded-lg bg-tbank-bg"><svg class="w-3 h-3 text-emerald-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Beynəlxalq sertifikatlar</span>
                                <span class="px-2.5 py-1 rounded-lg bg-tbank-bg"><svg class="w-3 h-3 text-emerald-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>100% steril alətlər (avtoklav)</span>
                                <span class="px-2.5 py-1 rounded-lg bg-tbank-bg"><svg class="w-3 h-3 text-emerald-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Premium materiallar</span>
                                <span class="px-2.5 py-1 rounded-lg bg-tbank-bg"><svg class="w-3 h-3 text-emerald-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Fərdi dizayn seçimi</span>
                            </div>
                        </div>

                        <!-- Workplace Salon Card ("İşlədiyi məkan") -->
                        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm">
                            <div class="flex items-center justify-between mb-3">
                                <h2 class="font-black text-sm sm:text-base text-tbank-graphite">İşlədiyi məkan</h2>
                                <a href="#/salon/${salon.id}" class="text-xs font-bold text-tbank-graphite hover:underline flex items-center gap-1">
                                    <span>Məkanın profilinə bax</span>
                                    <span>→</span>
                                </a>
                            </div>

                            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
                                <img src="${salon.image}" alt="${salon.name}" class="w-14 h-14 rounded-xl object-cover shrink-0">
                                <div class="min-w-0 flex-1">
                                    <h4 class="font-extrabold text-sm text-tbank-graphite truncate">${salon.name}</h4>
                                    <p class="text-xs text-slate-500 mt-0.5 truncate"><svg class="w-3.5 h-3.5 text-slate-400 shrink-0 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> ${salon.location}</p>
                                    <div class="text-[11px] text-slate-400 mt-0.5 font-medium">İş vaxtı: ${salon.workHours || '10:00 - 21:00'}</div>
                                </div>
                                <a href="#/salon/${salon.id}" class="h-9 px-3.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-tbank-graphite hover:bg-slate-100 flex items-center justify-center shrink-0 transition">
                                    Bax
                                </a>
                            </div>
                        </div>

                        <!-- Services & Price List ("Xidmətlər və qiymətlər") -->
                        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="font-black text-sm sm:text-base text-tbank-graphite">Xidmətlər və Qiymətlər</h2>
                                    <p class="text-xs text-slate-400 font-medium mt-0.5">Ustanın göstərdiyi xidmətlər üzrə dəqiq tariflər</p>
                                </div>
                                <span class="px-2 py-0.5 rounded-full bg-tbank-bg text-tbank-graphite font-bold text-xs">
                                    ${services.length} xidmət
                                </span>
                            </div>

                            <div class="divide-y divide-slate-100">
                                ${services.map(s => `
                                    <div class="py-3 sm:py-3.5 flex items-center justify-between gap-3">
                                        <div class="min-w-0">
                                            <div class="font-bold text-xs sm:text-sm text-tbank-graphite">${s.name}</div>
                                            <div class="text-[11px] text-slate-400 font-medium mt-0.5 flex items-center gap-2">
                                                <span>⏱️ ${s.duration}</span>
                                                <span>•</span>
                                                <span class="text-emerald-600 font-semibold">Təsdiq dərhal</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-3 shrink-0">
                                            <div class="font-black text-sm sm:text-base text-tbank-graphite">
                                                ${s.price} ₼
                                            </div>
                                            <button onclick="App.bookMaster('${master.name}', '${salon.name}', ${s.id})" 
                                                    class="h-8 sm:h-9 px-3.5 sm:px-4 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition">
                                                Yazıl
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Portfolio / Works Gallery ("Fotoqalereya & İş nümunələri") -->
                        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="font-black text-base text-tbank-graphite">İş nümunələri</h2>
                                    <p class="text-xs text-slate-400 font-medium mt-0.5">Ustanın əl işlərindən real fotolar</p>
                                </div>
                                <span class="px-2 py-0.5 rounded-full bg-tbank-bg text-tbank-graphite font-bold text-xs">
                                    ${portfolio.length} foto
                                </span>
                            </div>

                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                ${portfolio.map((item, idx) => `
                                    <div onclick="App.openMasterLightbox(${idx})" 
                                         class="group relative h-28 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-2xs hover:shadow-md transition">
                                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                                        <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                                        </div>
                                        <span class="absolute bottom-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                                            ${item.category}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Customer Reviews Section ("Müştəri rəyləri") -->
                        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm space-y-4">
                            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div>
                                    <h2 class="font-black text-base text-tbank-graphite">Müştəri rəyləri</h2>
                                    <p class="text-xs text-slate-400 font-medium mt-0.5">Ziyarət edən real müştərilərin şərhləri</p>
                                </div>
                                <div class="flex items-center gap-1.5">
                                    <span class="text-lg font-black text-tbank-graphite">${master.rating}</span>
                                    <div class="flex text-amber-400 gap-0.5"><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                                </div>
                            </div>

                            <div class="space-y-3">
                                ${reviews.map(r => `
                                    <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-2">
                                                <div class="w-7 h-7 rounded-full bg-tbank-yellow text-tbank-graphite font-black text-[10px] flex items-center justify-center">
                                                    ${r.author.split(' ').map(n=>n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div class="font-bold text-xs text-tbank-graphite">${r.author}</div>
                                                    <div class="text-[10px] text-slate-400">${r.date}</div>
                                                </div>
                                            </div>
                                            <div class="flex text-amber-400 gap-0.5"><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                                        </div>
                                        <div class="text-[11px] font-bold text-tbank-graphite">${r.service}</div>
                                        <p class="text-xs text-slate-600 leading-relaxed font-medium">
                                            ${r.text}
                                        </p>
                                        ${r.reply ? `
                                            <div class="mt-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 text-xs shadow-2xs space-y-1">
                                                <div class="flex items-center justify-between">
                                                    <span class="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                                                        <span class="w-3.5 h-3.5 rounded-full bg-[#FFDD2D] text-slate-900 text-[8px] font-black flex items-center justify-center">Z</span>
                                                        Salonun rəsmi cavabı
                                                    </span>
                                                    <span class="text-[10px] text-slate-400 font-medium">${r.replyDate || ''}</span>
                                                </div>
                                                <p class="text-slate-600 font-normal leading-relaxed text-[11px]">${r.reply}</p>
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT COLUMN: Desktop Booking Widget (Sticky) -->
                    <aside class="hidden lg:block lg:col-span-4 sticky top-20 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-5">
                        <div>
                            <div class="text-xs font-bold text-slate-400 mb-1">Onlayn rezervasiya</div>
                            <h3 class="text-lg font-black text-tbank-graphite">Ustanın qəbuluna yazıl</h3>
                            <p class="text-xs text-slate-500 font-medium mt-0.5">Zəng etmədən boş vaxtı dərhal bron edin</p>
                        </div>

                        <!-- Date Switcher -->
                        <div>
                            <label class="text-xs font-bold text-slate-500 block mb-1.5">Tarix seçin</label>
                            <div class="grid grid-cols-2 gap-2">
                                <button class="py-2 rounded-xl bg-tbank-graphite text-white font-bold text-xs shadow-sm text-center">
                                    Bu gün, 29 sentyabr
                                </button>
                                <button class="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs text-center transition">
                                    Sabah, 30 sentyabr
                                </button>
                            </div>
                        </div>

                        <!-- Time Slots Chips -->
                        <div>
                            <label class="text-xs font-bold text-slate-500 block mb-1.5">Boş saatlar</label>
                            <div class="grid grid-cols-3 gap-2">
                                ${slots.map((slot, i) => `
                                    <button onclick="App.bookMaster('${master.name}', '${salon.name}', null, '${slot}')" 
                                            class="py-2 rounded-xl border border-slate-200 hover:border-tbank-graphite hover:bg-tbank-yellow/30 text-xs font-bold text-tbank-graphite transition text-center ${i === 0 ? 'bg-tbank-yellow/20 border-tbank-graphite font-black' : 'bg-slate-50'}">
                                        ${slot}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Price Info -->
                        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div>
                                <div class="text-[10px] text-slate-400 font-bold">Xidmət haqqı</div>
                                <div class="text-lg font-black text-tbank-graphite">dan ${services[0].price} ₼</div>
                            </div>
                            <div class="text-right text-[11px] font-semibold text-emerald-600">
                                <span class="inline-flex items-center gap-1"><svg class="w-3 h-3 text-emerald-600 shrink-0 inline-block mr-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Dərhal təsdiq</span>
                            </div>
                        </div>

                        <!-- Book Button -->
                        <button onclick="App.bookMaster('${master.name}', '${salon.name}')" 
                                class="w-full h-11 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition flex items-center justify-center gap-2">
                            <span>Qəbula yazıl</span>
                            <span>→</span>
                        </button>

                        <div class="text-center text-[10px] text-slate-400 font-medium">
                            <span class="inline-flex items-center gap-1"><svg class="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> 100% pulsuz rezervasiya • Ödəniş məkanda edilir</span>
                        </div>
                    </aside>
                </div>

                <!-- 3. Fixed Mobile Floating Booking Bar (Thumb-Accessible) -->
                <div class="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl safe-pb">
                    <div>
                        <div class="text-[10px] text-slate-400 font-bold truncate max-w-[130px]">${master.name}</div>
                        <div class="text-sm font-black text-tbank-graphite">dan ${services[0].price} ₼</div>
                    </div>
                    <button onclick="App.bookMaster('${master.name}', '${salon.name}')" 
                            class="h-11 px-6 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm active:scale-95 transition">
                        Qəbula yazıl
                    </button>
                </div>
            </div>
        `;
    },

    afterRender: function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
