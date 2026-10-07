// ========================================================
// MASTERS VIEW: VERIFIED SPECIALISTS DIRECTORY
// ========================================================
const MastersView = {
    render: function() {
        return `
            <div class="space-y-6">
                <!-- Page Breadcrumbs & Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tbank-border">
                    <div>
                        <div class="text-xs text-slate-400 font-semibold mb-1">
                            <a href="#/" class="hover:text-tbank-graphite">Əsas səhifə</a> / <span class="text-tbank-graphite">Ustalar</span>
                        </div>
                        <h1 class="text-3xl font-black tracking-[-0.04em] text-tbank-graphite">
                            Mütəxəssislər və ustalar
                        </h1>
                        <p class="text-xs text-slate-500 mt-1 font-medium">Baxış, reytinq və müştəri rəylərinə görə seçilmiş mütəxəssislər</p>
                    </div>

                    <span class="h-10 px-4 rounded-xl bg-white border border-tbank-border text-xs font-extrabold flex items-center shadow-sm">
                        ${ZeyvoData.masters.length} aktiv usta
                    </span>
                </div>

                <!-- Masters Cards Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    ${ZeyvoData.masters.map(m => `
                        <div class="product-card p-4 rounded-2xl bg-white border border-tbank-border/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                            <div class="flex items-center gap-3.5">
                                <a href="#/master/${m.id}" class="shrink-0 group">
                                    <img src="${m.photo}" alt="${m.name}" class="w-14 h-14 rounded-xl object-cover group-hover:opacity-90 transition" />
                                </a>
                                <div class="min-w-0 flex-1">
                                    <div class="flex items-center justify-between gap-1">
                                        <a href="#/master/${m.id}" class="font-extrabold text-sm text-tbank-graphite truncate hover:underline">${m.name}</a>
                                        <div class="flex items-center gap-1.5 shrink-0">
                                            <span class="text-[11px] font-black text-tbank-graphite bg-tbank-bg px-2 py-0.5 rounded-lg flex items-center gap-1"><svg class="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> <span>${m.rating}</span></span>
                                            <button onclick="App.toggleFavorite(${m.id}, 'master', event)" class="fav-btn-master-${m.id} w-7 h-7 rounded-lg bg-slate-50 hover:bg-rose-50 flex items-center justify-center text-slate-400 hover:text-rose-500 transition active:scale-90" title="Seçilmişlər">
                                                <svg class="w-3.5 h-3.5 ${App.isFavorite('master', m.id) ? 'text-rose-500 fill-current' : 'fill-none stroke-current'}" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="text-xs text-slate-600 font-extrabold mt-0.5 truncate">${m.title}</div>
                                    <div class="text-xs text-slate-400 mt-0.5 truncate">Məkan: <a href="#/salon/${m.salonId}" class="hover:underline font-semibold text-slate-600">${m.salonName}</a></div>
                                    <div class="text-[11px] text-slate-400 font-medium">${m.experience}</div>
                                </div>
                            </div>

                            <div class="mt-5 pt-4 border-t border-tbank-border flex items-center justify-between gap-2">
                                <a href="#/master/${m.id}" class="h-10 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-tbank-graphite text-xs font-bold transition flex items-center justify-center">
                                    Profilə bax
                                </a>
                                <button onclick="App.bookMaster('${m.name}', '${m.salonName}')" class="h-10 px-4 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite text-xs font-black transition shadow-sm">
                                    Qəbula yazıl
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    afterRender: function() {}
};
