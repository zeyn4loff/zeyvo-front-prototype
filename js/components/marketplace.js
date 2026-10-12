// Reusable marketplace cards. Views prepare data; this module owns their markup.
const MarketplaceUI = {
    favoriteButton({ id, type, variant = 'catalog' }) {
        const kind = type === 'company' ? 'salon' : type === 'specialist' ? 'master' : type;
        const classes = {
            salon: 'absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md shadow-md z-10',
            compact: 'w-7 h-7 rounded-lg hover:bg-rose-50',
            directory: 'w-7 h-7 rounded-lg bg-slate-50 hover:bg-rose-50',
            catalog: 'w-8 h-8 rounded-lg hover:bg-rose-50 shrink-0',
            mobile: 'sm:hidden w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0',
            detail: 'w-10 h-10 rounded-xl border border-tbank-border hover:bg-slate-50'
        };
        const active = App.isFavorite(kind, id);
        return `<button type="button" onclick="App.toggleFavorite(${Number(id)}, '${kind}', event)" class="fav-btn-${kind}-${Number(id)} inline-flex items-center justify-center text-slate-500 hover:text-rose-500 transition active:scale-90 ${classes[variant] || classes.catalog}" data-id="${Number(id)}" data-type="${kind}" aria-label="Seçilmişlər" aria-pressed="${active}" title="Seçilmişlər"><svg class="w-4 h-4 ${active ? 'text-rose-500 fill-current' : 'fill-none stroke-current'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>`;
    },
    salonCard(salon) {
        const publicBadge = salon.badge && !/zeyvo|awards/i.test(salon.badge) ? salon.badge : '';
        return `
            <article class="product-card bg-white rounded-3xl border border-tbank-border/80 overflow-hidden flex flex-col justify-between">
                <!-- Photo Header -->
                <div class="relative h-44 overflow-hidden bg-slate-100 cursor-pointer" onclick="Router.navigate('/salon/${salon.id}')">
                    <img src="${salon.image}" alt="${salon.name}" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    <div class="absolute top-3 left-3 flex items-center gap-1.5">
                        ${publicBadge ? `<span class="px-2.5 py-1 rounded-lg bg-tbank-graphite text-tbank-yellow text-[10px] font-black tracking-wide">${publicBadge}</span>` : ''}
                        ${salon.discount ? `<span class="px-2 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-extrabold">${salon.discount}</span>` : ''}
                    </div>

                    ${this.favoriteButton({ id: salon.id, type: 'salon', variant: 'salon' })}

                    <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span class="text-[11px] font-semibold text-white/90 truncate max-w-[200px]">${salon.branchCount > 1 ? `${salon.branchCount} filial · ${salon.branchName}` : salon.location}</span>
                        <span class="px-2 py-0.5 rounded-md bg-white text-tbank-graphite font-black text-[11px] flex items-center gap-1"><svg class="w-3 h-3 text-amber-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${salon.rating}</span>
                    </div>
                </div>

                <!-- Body -->
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <a href="#/salon/${salon.id}" class="block group">
                            <h3 class="font-black text-base text-tbank-graphite group-hover:text-black transition">${salon.name}</h3>
                            <div class="text-xs text-slate-400 mt-0.5 font-medium">${salon.tag} • ${salon.reviewsCount} rəy${salon.branchCount > 1 ? ` • ${salon.branchCount} filial` : ''}</div>
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
                        <div class="text-[11px] font-bold text-slate-500 mb-2">${salon.branchCount > 1 ? 'Vaxtları görmək üçün filialı seçin:' : 'Bu gün boş vaxtlar:'}</div>
                        <div class="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                            ${salon.branchCount > 1 ? `<span class="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold">${salon.branchCount} filial mövcuddur</span>` : salon.slots.map(slot => `
                                <button onclick="App.startBooking(${salon.id}, '${slot}')" class="shrink-0 px-2.5 py-1 rounded-lg bg-tbank-bg hover:bg-tbank-yellow text-tbank-graphite text-[11px] font-bold transition">
                                    ${slot}
                                </button>
                            `).join('')}
                        </div>

                        <div class="mt-3.5 flex items-center gap-2">
                            <button onclick="${salon.branchCount > 1 ? `Router.navigate('/salon/${salon.id}')` : `App.startBooking(${salon.id})`}" class="flex-1 h-10 rounded-xl bg-tbank-graphite hover:bg-tbank-graphiteHover text-white text-xs font-bold transition">
                                ${salon.branchCount > 1 ? 'Filial seç' : 'Yazıl'}
                            </button>
                            <a href="#/salon/${salon.id}" class="h-10 px-3.5 rounded-xl border border-tbank-border hover:bg-tbank-bg text-tbank-graphite flex items-center justify-center transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        `;
    },
    masterCard(m, variant = 'compact') {
        return variant === 'directory' ? this.directoryMasterCard(m) : this.compactMasterCard(m);
    },
    compactMasterCard(m) {
        return `
            <div class="p-3.5 rounded-2xl bg-white border border-tbank-border/70 shadow-sm flex items-center gap-3 hover:shadow-md transition">
                <a href="#/master/${m.id}" class="shrink-0 group">
                    <img src="${m.photo}" alt="${m.name}" class="w-12 h-12 rounded-xl object-cover group-hover:opacity-90 transition" />
                </a>
                <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-1">
                        <a href="#/master/${m.id}" class="font-extrabold text-xs sm:text-sm text-tbank-graphite truncate hover:underline">${m.name}</a>
                        <div class="flex items-center gap-1 shrink-0">
                            <span class="text-[10px] font-black text-tbank-graphite bg-tbank-bg px-1.5 py-0.5 rounded flex items-center gap-0.5"><svg class="w-2.5 h-2.5 text-amber-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${m.rating}</span>
                            ${this.favoriteButton({ id: m.id, type: 'master', variant: 'compact' })}
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
        `;
    },
    directoryMasterCard(m) {
        return `
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
                                            ${this.favoriteButton({ id: m.id, type: 'master', variant: 'directory' })}
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
                    `;
    },
    catalogCard(item) {
        const publicBadge = item.badge && !/zeyvo|awards/i.test(item.badge) ? item.badge : '';
        return `
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
                        ${this.favoriteButton({ id: item.id, type: item.type, variant: 'catalog' })}
                    </div>

                    <p class="text-[11px] text-slate-400 truncate mt-0.5">
                        ${item.branchCount > 1 ? `${item.branchCount} filial · ${item.branchName}` : item.location}
                    </p>

                    <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span class="text-[11px] font-black text-amber-500 flex items-center gap-0.5">
                            <svg class="w-3 h-3 text-amber-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>${item.rating} <span class="text-[10px] text-slate-400 font-normal">(${item.reviewsCount})</span>
                        </span>
                        ${publicBadge ? `
                            <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                ${publicBadge}
                            </span>
                        ` : ''}
                        <span class="text-[9px] font-semibold text-slate-400">
                            • ${item.type === 'company' ? (item.branchCount > 1 ? 'Biznes şəbəkəsi' : 'Məkan') : 'Usta'}
                        </span>
                    </div>

                    <div class="mt-2 flex items-center justify-between">
                        <div class="text-[11px] font-bold text-tbank-graphite">
                            ${item.price > 0 ? `dan ${item.price} ₼` : 'Onlayn qəbul'}
                        </div>
                        <button onclick="${item.type === 'company' ? (item.branchCount > 1 ? `Router.navigate('/salon/${item.id}')` : `App.startBooking(${item.id})`) : `App.bookMaster('${item.name}', '${item.salonName}')`}"
                                class="px-3.5 py-1.5 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-[11px] shadow-sm transition whitespace-nowrap">
                            ${item.type === 'company' && item.branchCount > 1 ? 'Filial seç' : 'Qəbula yazıl'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};
window.MarketplaceUI = MarketplaceUI;
