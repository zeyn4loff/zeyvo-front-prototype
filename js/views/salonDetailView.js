// ========================================================
// SALON DETAIL VIEW (MOBILE FIRST + DIKIDI / FINTECH HYBRID)
// ========================================================
const SalonDetailView = {
    groupServices: function(services) {
        const categorized = services.some(service => service.category);
        if (!categorized) return [{ name: '', services }];
        const groups = new Map();
        services.forEach(service => {
            const name = service.category || 'Digər xidmətlər';
            if (!groups.has(name)) groups.set(name, []);
            groups.get(name).push(service);
        });
        return [...groups].map(([name, items]) => ({ name, services: items }));
    },

    renderUserReviews: function(salonId) {
        let reviews = [];
        try {
            reviews = JSON.parse(localStorage.getItem('zeyvo_user_reviews_v1') || '[]')
                .filter(review => Number(review.salonId) === Number(salonId));
        } catch (e) {}
        const safe = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
        return reviews.map(review => {
            const stars = Array.from({ length: 5 }, (_, index) => `<svg class="w-3 h-3 ${index < Number(review.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('');
            return `<div class="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-sm space-y-2"><div class="flex items-center justify-between gap-2"><div><div class="font-extrabold text-xs text-tbank-graphite">${safe(review.userName)}</div><div class="text-[10px] text-slate-400">${safe(review.date)}</div></div><div class="flex gap-0.5">${stars}</div></div><p class="text-xs text-slate-600 leading-relaxed font-medium">${safe(review.text)}</p></div>`;
        }).join('');
    },

    renderWorkingHours: function(schedule) {
        const days = [
            { key: 'mon', label: 'Bazar ertəsi' },
            { key: 'tue', label: 'Çərşənbə axşamı' },
            { key: 'wed', label: 'Çərşənbə' },
            { key: 'thu', label: 'Cümə axşamı' },
            { key: 'fri', label: 'Cümə' },
            { key: 'sat', label: 'Şənbə' },
            { key: 'sun', label: 'Bazar' }
        ];
        const groups = [];
        days.forEach(day => {
            const value = schedule[day.key] || { isOff: true, open: '09:00', close: '21:00' };
            const signature = value.isOff ? 'off' : `${value.open}-${value.close}`;
            const previous = groups[groups.length - 1];
            if (previous && previous.signature === signature) {
                previous.end = day;
            } else {
                groups.push({ start: day, end: day, signature, value });
            }
        });
        return groups.map(group => {
            const range = group.start.key === group.end.key
                ? group.start.label
                : `${group.start.label} – ${group.end.label}`;
            return `<div class="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-0"><span class="text-[11px] font-semibold text-slate-500">${range}</span>${group.value.isOff ? '<span class="text-[11px] font-bold text-rose-600">İstirahət günü</span>' : `<span class="text-[11px] font-black text-tbank-graphite whitespace-nowrap">${group.value.open} – ${group.value.close}</span>`}</div>`;
        }).join('');
    },

    render: function(params) {
        const id = Number.parseInt(params.id, 10);
        const salon = ZeyvoData.salons.find(s => s.id === id);
        if (!salon) {
            return `
                <div class="py-16 px-4 text-center bg-white rounded-3xl border border-tbank-border">
                    <h1 class="text-xl font-black text-tbank-graphite">Məkan tapılmadı</h1>
                    <p class="mt-2 text-xs text-slate-500">Bu məkan silinib və ya keçid yanlışdır.</p>
                    <a href="#/catalog" class="inline-flex mt-5 h-10 px-5 items-center rounded-xl bg-tbank-yellow text-tbank-graphite text-xs font-black">Kataloqa qayıt</a>
                </div>`;
        }
        const business = App.getMarketplaceBusiness(salon);
        const branchParam = new URLSearchParams((window.location.hash.split('?')[1] || '')).get('branch');
        if (branchParam && business.branches.some(branch => branch.id === branchParam)) {
            App.publicBranchSelections[salon.id] = branchParam;
        }
        const businessContext = App.getBookingBusinessContext(salon);
        const selectedBranch = business.branches.find(branch => branch.id === businessContext?.branchId) || business.branches[0] || null;
        const displayName = business.name || salon.name;
        const displayLocation = selectedBranch?.address || salon.location;
        const workingSchedule = App.getSalonSchedule(salon);
        const openStatus = App.getSalonOpenStatus(salon);
        const contact = App.getSalonContact(salon);
        const phoneDigits = String(contact.phone || '').replace(/\D/g, '');
        const whatsappDigits = String(contact.whatsapp || contact.phone || '').replace(/\D/g, '');
        const instagramUrl = contact.instagram ? (String(contact.instagram).startsWith('http') ? contact.instagram : `https://instagram.com/${String(contact.instagram).replace(/^@/, '')}`) : 'https://instagram.com';
        const facebookUrl = contact.facebook ? (String(contact.facebook).startsWith('http') ? contact.facebook : `https://facebook.com/${contact.facebook}`) : 'https://facebook.com';
        
        let salonMasters = ZeyvoData.masters.filter(m => m.salonId === salon.id);
        if (salonMasters.length === 0) {
            salonMasters = ZeyvoData.masters.filter(m => m.topCategory === salon.topCategory);
        }
        if (salonMasters.length === 0) {
            salonMasters = ZeyvoData.masters.slice(0, 4);
        }

        return `
            <div class="space-y-4 sm:space-y-6 pb-2 sm:pb-6">
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
                            <span class="text-tbank-graphite font-bold truncate">${displayName}</span>
                        </div>
                    </div>

                    <!-- Mobile Favorite Button in top bar -->
                    ${MarketplaceUI.favoriteButton({ id: salon.id, type: 'salon', variant: 'mobile' })}
                </div>

                <!-- 1. Top Header Card (Mobile First) -->
                <div class="bg-white rounded-3xl p-5 sm:p-7 border border-tbank-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div class="flex flex-col sm:flex-row items-start gap-4 min-w-0 flex-1">
                        <!-- Salon Logo Badge -->
                        <div class="w-full h-36 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 border border-tbank-border flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                            <img src="${salon.image}" alt="${displayName}" class="w-full h-full object-cover" />
                        </div>

                        <!-- Salon Info -->
                        <div class="min-w-0 flex-1">
                            <div class="flex flex-wrap items-center gap-2">
                                <h1 class="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-tbank-graphite">${displayName}</h1>
                                <span class="px-2 py-0.5 rounded-lg ${openStatus.isOpen ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'} text-[10px] font-extrabold border">${openStatus.label}</span>
                            </div>
                            <p class="text-xs text-slate-500 font-medium mt-1 truncate"><svg class="w-3.5 h-3.5 text-slate-400 shrink-0 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> ${selectedBranch?.name ? `${selectedBranch.name} · ` : ''}${displayLocation}</p>

                            <div class="flex flex-wrap items-center gap-3 mt-2 text-xs">
                                <a href="tel:+${phoneDigits}" class="flex items-center gap-1 text-slate-600 hover:text-tbank-graphite font-semibold">
                                    <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    <span>${contact.phone || '+994 (12) 500-20-26'}</span>
                                </a>
                                <div class="flex items-center gap-1.5" aria-label="Sosial şəbəkələr">
                                    <a href="${instagramUrl}" target="_blank" aria-label="Instagram" title="Instagram" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 flex items-center justify-center transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
                                    <a href="${facebookUrl}" target="_blank" aria-label="Facebook" title="Facebook" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 8h3V4.5c-.5-.1-1.8-.2-3.4-.2-3.3 0-5.6 2-5.6 5.8V13H4v4h4v7h5v-7h3.3l.7-4H13v-2.5C13 9.3 13.3 8 14 8Z"/></svg></a>
                                    <a href="https://wa.me/${whatsappDigits}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 flex items-center justify-center transition"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163A11.87 11.87 0 0 1 .157 11.89C.16 5.335 5.495 0 12.05 0a11.8 11.8 0 0 1 8.413 3.488 11.81 11.81 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24Zm6.597-3.807a9.85 9.85 0 0 0 5.392 1.592c5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.85 9.85 0 0 0 1.746 5.634l-.999 3.648 3.742-.981Zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg></a>
                                </div>
                            </div>

                            <div class="flex flex-wrap items-center gap-2 sm:gap-3 mt-2.5">
                                <div class="flex items-center gap-1">
                                    <span class="text-sm font-black text-tbank-graphite">${salon.rating}</span>
                                    <div class="flex text-amber-400 gap-0.5"><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><svg class="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                                    <span class="text-xs text-slate-400 font-medium">(${salon.reviewsCount})</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Action Buttons (Desktop buttons) -->
                    <div class="hidden sm:flex items-center gap-2 shrink-0">
                        ${MarketplaceUI.favoriteButton({ id: salon.id, type: 'salon', variant: 'detail' })}
                        <button onclick="App.startBooking(${salon.id})" class="h-10 px-6 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition">
                            Onlayn yazıl
                        </button>
                    </div>
                </div>

                ${business.branches.length > 1 ? `
                <section class="bg-white rounded-3xl p-4 sm:p-5 border border-tbank-border shadow-sm">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div>
                            <h2 class="font-black text-base text-tbank-graphite">Filialı seçin</h2>
                            <p class="text-[11px] leading-relaxed text-slate-500 mt-1">Ünvan, iş saatları və rezervasiya seçilmiş filiala aiddir</p>
                        </div>
                        <span class="shrink-0 inline-flex items-center h-7 px-2.5 rounded-lg bg-slate-100 text-[10px] font-black text-slate-600">${business.branches.length} filial</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${business.branches.map(branch => {
                            const active = branch.id === selectedBranch?.id;
                            return `<button type="button" aria-pressed="${active}" onclick="App.selectPublicBranch(${salon.id}, '${branch.id}')" class="relative overflow-hidden min-h-[104px] text-left p-3.5 rounded-2xl border transition-all duration-200 ${active ? 'border-tbank-graphite bg-tbank-graphite text-white shadow-md' : 'border-slate-200 bg-white text-tbank-graphite hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'}">
                                ${active ? '<span class="absolute inset-x-0 top-0 h-1 bg-tbank-yellow"></span>' : ''}
                                <span class="flex items-start justify-between gap-3">
                                    <span class="text-xs sm:text-sm font-black leading-tight">${branch.name}</span>
                                    <span class="w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${active ? 'bg-tbank-yellow text-tbank-graphite' : 'border border-slate-200 bg-slate-50 text-transparent'}">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 12 4 4L19 6"/></svg>
                                    </span>
                                </span>
                                <span class="flex items-start gap-1.5 mt-2 text-[10px] leading-relaxed ${active ? 'text-white/70' : 'text-slate-500'}">
                                    <svg class="w-3.5 h-3.5 shrink-0 mt-px" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    <span>${branch.address || 'Ünvan dəqiqləşdirilir'}</span>
                                </span>
                                <span class="flex items-center gap-1.5 mt-1.5 text-[10px] font-extrabold ${active ? 'text-white' : 'text-slate-700'}">
                                    <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 7v5l3 2"/></svg>
                                    <span>${branch.hours || '09:00 – 21:00'}</span>
                                </span>
                            </button>`;
                        }).join('')}
                    </div>
                </section>` : ''}

                <!-- 2. Two-Column Info: Description + On the map -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                    <!-- Description -->
                    <div class="md:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-tbank-border shadow-sm flex flex-col justify-between">
                        <div>
                            <h2 class="font-black text-sm sm:text-base text-tbank-graphite mb-2">Haqqında</h2>
                            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                ${business.description || salon.description} Yüksək sanitariya standartları, sertifikatlı avadanlıqlar və peşəkar komanda.
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
                            <span class="text-xs text-slate-400 font-medium">Seçilmiş filial</span>
                        </div>
                        
                        <div class="relative h-28 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                            <div class="absolute inset-0 opacity-40" style="background-image: radial-gradient(#94a3b8 1px, transparent 1px); background-size: 16px 16px;"></div>
                            <div class="relative z-10 flex flex-col items-center">
                                <div class="px-2.5 py-1 rounded-lg bg-tbank-graphite text-white font-extrabold text-[11px] shadow-md flex items-center gap-1">
                                    <span class="w-1.5 h-1.5 rounded-full bg-tbank-yellow"></span>
                                    <span>${selectedBranch?.name || displayName}</span>
                                </div>
                                <div class="w-2 h-2 bg-tbank-graphite rotate-45 -mt-1"></div>
                            </div>
                            <button onclick="App.showToast('Xəritə açılır...')" class="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-white/95 text-tbank-graphite text-[10px] font-black shadow-sm border border-black/5">
                                Xəritədə bax →
                            </button>
                        </div>
                        <div class="mt-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5">
                            <div class="flex items-center gap-2 pb-1.5 border-b border-slate-200/80">
                                <svg class="w-4 h-4 text-tbank-graphite" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 7v5l3 2"/></svg>
                                <h3 class="text-xs font-black text-tbank-graphite">İş saatları</h3>
                            </div>
                            ${this.renderWorkingHours(workingSchedule)}
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

                    <!-- Single-row photo carousel -->
                    <div id="salonGalleryGrid" class="flex gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory pb-2 pt-1" aria-label="Fotoqalereya">
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

                    <div class="space-y-4">
                        ${this.groupServices(salon.services).map(group => `<div>
                            ${group.name ? `<h3 class="mb-2 rounded-xl bg-tbank-bg px-3 py-2 text-xs font-black text-tbank-graphite">${group.name}</h3>` : ''}
                            <div class="divide-y divide-tbank-border/70">${group.services.map((srv) => `
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
                            `).join('')}</div>
                        </div>`).join('')}
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

                            ${ZeyvoUI.button({ label: "Rəy bildir", onClick: `App.handleReviewClick(${salon.id})`, size: "sm", fullWidth: true, className: "mt-4" })}
                        </div>

                        <!-- Reviews List -->
                        <div id="salonReviewsList" class="md:col-span-8 space-y-3">
                            ${this.renderUserReviews(salon.id)}
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
