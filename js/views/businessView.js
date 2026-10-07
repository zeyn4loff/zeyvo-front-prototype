// ========================================================
// BUSINESS VIEW: ZEYVO FOR SALON OWNERS & MASTERS
// ========================================================
const BusinessView = {
    render: function() {
        return `
            <div class="space-y-10">
                <!-- Business Hero Banner -->
                <div class="rounded-4xl bg-tbank-graphite text-white p-8 sm:p-14 relative overflow-hidden shadow-xl">
                    <div class="absolute -right-24 -bottom-24 w-[480px] h-[480px] rounded-full border-[80px] border-white/[0.04] pointer-events-none"></div>

                    <div class="max-w-2xl relative">
                        <span class="inline-block px-3 py-1 rounded-lg bg-tbank-yellow text-tbank-graphite text-xs font-bold mb-4">
                            Zeyvo Business platforması
                        </span>
                        <h1 class="text-3xl sm:text-5xl font-black tracking-[-0.04em] leading-[1.05] text-white">
                            Salonunuzu rəqəmsallaşdırın və gəlirinizi artırın
                        </h1>
                        <p class="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed font-medium">
                            Gözəllik salonları, bərbərxanalar, SPA və fərdi ustalar üçün ən müasir onlayn qeydiyyat, işçi cədvəli və müştəri idarəetmə proqramı.
                        </p>

                        <div class="mt-8 flex flex-wrap items-center gap-3">
                            <button onclick="App.openBusinessInquiry()" class="h-12 px-6 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs transition shadow-sm">
                                14 gün pulsuz yoxlayın
                            </button>
                            <button onclick="App.openBusinessInquiry()" class="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition">
                                Mütəxəssis zəngi sifariş et
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Key Business Pillars -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div class="p-6 rounded-3xl bg-white border border-tbank-border/80 shadow-sm space-y-3">
                        <div class="w-12 h-12 rounded-2xl bg-tbank-yellow flex items-center justify-center text-tbank-graphite font-black">
                            <svg class="w-6 h-6 text-tbank-graphite" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                        <h3 class="font-extrabold text-base text-tbank-graphite">24/7 onlayn qeydiyyat</h3>
                        <p class="text-xs text-slate-500 font-medium leading-relaxed">
                            Müştəriləriniz gecə və ya iş vaxtından sonra belə administratoru narahat etmədən boş saatlara yazıla bilər.
                        </p>
                    </div>

                    <div class="p-6 rounded-3xl bg-white border border-tbank-border/80 shadow-sm space-y-3">
                        <div class="w-12 h-12 rounded-2xl bg-tbank-green text-white flex items-center justify-center font-black">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                        </div>
                        <h3 class="font-extrabold text-base text-tbank-graphite">Avtomatik WhatsApp bildirişləri</h3>
                        <p class="text-xs text-slate-500 font-medium leading-relaxed">
                            Gəlməyən müştəri sayını sıfıra endirin. Sistem ziyarətə 2 saat qalmış avtomatik xatırlatma mesajı göndərir.
                        </p>
                    </div>

                    <div class="p-6 rounded-3xl bg-white border border-tbank-border/80 shadow-sm space-y-3">
                        <div class="w-12 h-12 rounded-2xl bg-tbank-graphite text-white flex items-center justify-center font-black">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                        </div>
                        <h3 class="font-extrabold text-base text-tbank-graphite">Maaş və maliyyə analitikası</h3>
                        <p class="text-xs text-slate-500 font-medium leading-relaxed">
                            Ustaların faiz və maaşlarını avtomatik hesablayın. Gündəlik, aylıq kassa dövriyyəsini canlı izləyin.
                        </p>
                    </div>
                </div>

                <!-- Registration Form Section -->
                <div class="p-8 sm:p-12 rounded-4xl bg-white border border-tbank-border/80 shadow-tbank max-w-2xl mx-auto">
                    <h2 class="text-2xl font-black tracking-[-0.04em] text-tbank-graphite text-center">
                        Biznesinizi indi qoşun
                    </h2>
                    <p class="text-xs text-slate-500 text-center mt-1 font-medium">Qeydiyyatdan keçin, komandamız sistemi 1 saat ərzində salonunuza quraşdırsın</p>

                    <div class="mt-6 space-y-3 text-xs font-semibold">
                        <div>
                            <label class="block text-slate-500 mb-1">Salon və ya obyektin adı *</label>
                            <input id="bizPageName" type="text" placeholder="Məs: Diamond Beauty Studio" class="w-full h-11 px-3.5 rounded-xl border border-tbank-border outline-none font-bold" />
                        </div>
                        <div>
                            <label class="block text-slate-500 mb-1">Əlaqədar şəxsin adı *</label>
                            <input id="bizPagePerson" type="text" placeholder="Adınız və soyadınız" class="w-full h-11 px-3.5 rounded-xl border border-tbank-border outline-none font-bold" />
                        </div>
                        <div>
                            <label class="block text-slate-500 mb-1">Telefon nömrəniz (WhatsApp) *</label>
                            <div class="h-11 bg-white rounded-xl border border-tbank-border flex items-center overflow-hidden focus-within:border-tbank-graphite transition">
                                <div class="flex items-center gap-1.5 px-3 bg-slate-50 border-r border-slate-200 h-full select-none shrink-0">
                                    <span class="inline-flex items-center justify-center w-5 h-3.5 rounded-[2px] overflow-hidden shrink-0 shadow-xs border border-slate-200">
                                        <svg viewBox="0 0 1200 600" class="w-full h-full object-cover">
                                            <rect width="1200" height="200" fill="#00B5E2"/>
                                            <rect y="200" width="1200" height="200" fill="#EF3340"/>
                                            <rect y="400" width="1200" height="200" fill="#509E2F"/>
                                            <circle cx="585" cy="300" r="60" fill="#ffffff"/>
                                            <circle cx="600" cy="300" r="48" fill="#EF3340"/>
                                            <polygon points="630,300 645,304 656,295 655,308 668,312 656,316 655,329 645,320 630,324 639,312" fill="#ffffff"/>
                                        </svg>
                                    </span>
                                    <span class="text-xs font-bold text-tbank-graphite tracking-tight">+994</span>
                                </div>
                                <input id="bizPagePhone" type="tel" maxlength="15" placeholder="(50) 123-45-67" oninput="App.formatAzPhone(this)" class="w-full h-full px-3.5 bg-transparent font-bold outline-none" />
                            </div>
                        </div>
                        <button onclick="BusinessView.submitApplication()" class="w-full h-12 mt-3 rounded-xl bg-tbank-graphite hover:bg-tbank-graphiteHover text-white font-extrabold text-xs transition shadow-sm">
                            Müraciəti təsdiqlə
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    submitApplication: function() {
        const name = document.getElementById('bizPageName').value.trim();
        const phone = document.getElementById('bizPagePhone').value.trim();
        if (!name || !phone) {
            App.showToast("Zəhmət olmasa xanaları doldurun");
            return;
        }
        App.showToast("Müraciətiniz qəbul edildi! Yaxın zamanda əlaqə saxlayacağıq.");
        document.getElementById('bizPageName').value = '';
        document.getElementById('bizPagePhone').value = '';
    },
    afterRender: function() {}
};
