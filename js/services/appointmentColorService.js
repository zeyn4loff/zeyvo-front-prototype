/**
 * AppointmentColorService
 * Centralized color-coding service for Zeyvo appointments and journal cards.
 *
 * Requirements:
 * - Color modes: 'status' (default), 'service', 'staff'
 * - Status colors:
 *   - Запланировано / Pending (Gözlənilir) -> фиолетовый (purple)
 *   - Подтверждено / Confirmed (Təsdiqləndi) -> синий (blue)
 *   - Клиент пришёл / Arrived (Gəldi / Salondadır) -> зелёный (emerald/green)
 *   - Завершено / Completed (Tamamlandı) -> спокойный зелёный (teal/calm green)
 *   - Ожидает подтверждения -> жёлтый/оранжевый (amber/yellow)
 *   - В процессе (Xidmət göstərilir) -> индиго (indigo)
 *   - Отменено / Cancelled (Ləğv edildi) -> красный (rose/red)
 *   - Не пришёл / No show (Gəlmədi) -> тёмно-красный (darkred)
 *   - Fasilə / Məşğul (Blocked/Break) -> серый полосатый (blocked)
 * - Returns: { backgroundColor, borderColor, textColor, headerBg, border, bg, badgeBg, ... }
 */

(function(window) {
    'use strict';

    const AppointmentColorService = {
        STORAGE_KEY_MODE: 'zeyvo_appointment_color_mode',
        STORAGE_KEY_SERVICES: 'zeyvo_service_colors',
        STORAGE_KEY_STAFF: 'zeyvo_staff_colors',

        PALETTE: {
            purple: {
                key: 'purple',
                name: 'Bənövşəyi (Фиолетовый)',
                headerBg: 'bg-purple-50 text-purple-800 font-semibold',
                headerText: 'text-purple-800',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-purple-50 text-purple-700 border border-purple-200/80',
                stripeBar: 'bg-purple-500',
                statusBadgeText: 'text-purple-700',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#9333ea'
            },
            blue: {
                key: 'blue',
                name: 'Mavi (Синий)',
                headerBg: 'bg-sky-50 text-sky-800 font-semibold',
                headerText: 'text-sky-800',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-sky-50 text-sky-700 border border-sky-200/80',
                stripeBar: 'bg-sky-500',
                statusBadgeText: 'text-sky-700',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#0284c7'
            },
            emerald: {
                key: 'emerald',
                name: 'Zümrüd / Yaşıl (Зелёный)',
                headerBg: 'bg-emerald-50 text-emerald-800 font-semibold',
                headerText: 'text-emerald-800',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
                stripeBar: 'bg-emerald-500',
                statusBadgeText: 'text-emerald-700',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#059669'
            },
            teal: {
                key: 'teal',
                name: 'Sakit Yaşıl / Firuzəyi (Спокойный зелёный)',
                headerBg: 'bg-teal-50 text-teal-800 font-semibold',
                headerText: 'text-teal-800',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-teal-50 text-teal-700 border border-teal-200/80',
                stripeBar: 'bg-teal-500',
                statusBadgeText: 'text-teal-700',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#0d9488'
            },
            amber: {
                key: 'amber',
                name: 'Kəhrəba / Sarı (Жёлтый/Оранжевый)',
                headerBg: 'bg-amber-50 text-amber-900 font-semibold',
                headerText: 'text-amber-900',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-amber-50 text-amber-800 border border-amber-200/80',
                stripeBar: 'bg-amber-400',
                statusBadgeText: 'text-amber-800',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#f59e0b'
            },
            indigo: {
                key: 'indigo',
                name: 'İndiqo / Zeyvo Bənövşəyi (Индиго)',
                headerBg: 'bg-indigo-50 text-indigo-800 font-semibold',
                headerText: 'text-indigo-800',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80',
                stripeBar: 'bg-indigo-500',
                statusBadgeText: 'text-indigo-700',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#4f39f6'
            },
            rose: {
                key: 'rose',
                name: 'Qırmızı (Красный)',
                headerBg: 'bg-rose-50 text-rose-800 font-semibold',
                headerText: 'text-rose-800',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-rose-50 text-rose-700 border border-rose-200/80',
                stripeBar: 'bg-rose-500',
                statusBadgeText: 'text-rose-700',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#f43f5e'
            },
            darkred: {
                key: 'darkred',
                name: 'Tünd Qırmızı (Тёмно-красный)',
                headerBg: 'bg-red-50 text-red-900 font-semibold',
                headerText: 'text-red-900',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-red-50 text-red-800 border border-red-200/80',
                stripeBar: 'bg-red-700',
                statusBadgeText: 'text-red-800',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#991b1b'
            },
            pink: {
                key: 'pink',
                name: 'Çəhrayı (Розовый)',
                headerBg: 'bg-pink-50 text-pink-800 font-semibold',
                headerText: 'text-pink-800',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-pink-50 text-pink-700 border border-pink-200/80',
                stripeBar: 'bg-pink-500',
                statusBadgeText: 'text-pink-700',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#db2777'
            },
            orange: {
                key: 'orange',
                name: 'Narıncı (Оранжевый)',
                headerBg: 'bg-orange-50 text-orange-800 font-semibold',
                headerText: 'text-orange-800',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-orange-50 text-orange-700 border border-orange-200/80',
                stripeBar: 'bg-orange-500',
                statusBadgeText: 'text-orange-700',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#ea580c'
            },
            yellow: {
                key: 'yellow',
                name: 'Zeyvo Sarı (Жёлтый)',
                headerBg: 'bg-amber-50 text-amber-950 font-semibold',
                headerText: 'text-amber-950',
                border: 'border-slate-200/90',
                bg: 'bg-white',
                titleColor: 'text-slate-900',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-900 font-bold',
                badgeBg: 'bg-amber-50 text-amber-900 border border-amber-300/80',
                stripeBar: 'bg-[#FFDD2D]',
                statusBadgeText: 'text-amber-900',
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                textColor: '#0f172a',
                accentColor: '#FFDD2D'
            },
            blocked: {
                key: 'blocked',
                name: 'Fasilə / Məşğul (Перерыв / Блок)',
                headerBg: 'bg-slate-100 text-slate-700 font-semibold',
                headerText: 'text-slate-700',
                border: 'border-slate-200',
                bg: 'bg-slate-50',
                stripedStyle: 'background-image: repeating-linear-gradient(45deg, #f8fafc, #f8fafc 8px, #f1f5f9 8px, #f1f5f9 16px);',
                titleColor: 'text-slate-800',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-600',
                badgeBg: 'bg-slate-200 text-slate-700 border border-slate-300',
                stripeBar: 'bg-slate-400',
                statusBadgeText: 'text-slate-700',
                backgroundColor: '#f8fafc',
                borderColor: '#cbd5e1',
                textColor: '#334155',
                accentColor: '#64748b'
            }
        },

        // Get color mode (strictly 'status' by default)
        getColorMode: function() {
            return 'status';
        },

        setColorMode: function(mode) {
            try {
                localStorage.setItem(this.STORAGE_KEY_MODE, 'status');
            } catch (e) {}
        },

        getServiceColors: function() {
            try {
                return JSON.parse(localStorage.getItem(this.STORAGE_KEY_SERVICES) || '{}');
            } catch (e) {
                return {};
            }
        },

        setServiceColor: function(serviceId, colorKey) {
            try {
                const map = this.getServiceColors();
                if (!colorKey) {
                    delete map[serviceId];
                } else {
                    map[serviceId] = colorKey;
                }
                localStorage.setItem(this.STORAGE_KEY_SERVICES, JSON.stringify(map));
            } catch (e) {}
        },

        getStaffColors: function() {
            try {
                return JSON.parse(localStorage.getItem(this.STORAGE_KEY_STAFF) || '{}');
            } catch (e) {
                return {};
            }
        },

        setStaffColor: function(staffId, colorKey) {
            try {
                const map = this.getStaffColors();
                if (!colorKey) {
                    delete map[staffId];
                } else {
                    map[staffId] = colorKey;
                }
                localStorage.setItem(this.STORAGE_KEY_STAFF, JSON.stringify(map));
            } catch (e) {}
        },

        /**
         * Resolves color theme when mode === 'status'
         */
        resolveByStatus: function(appointment) {
            if (!appointment) return this.PALETTE.blue;
            const status = (appointment.status || '').toLowerCase().trim();
            const source = (appointment.source || '').toLowerCase();

            // 1. Completed / Завершено / Tamamlandı -> Calm green / teal
            if (status.includes('tamam') || status.includes('complet') || status.includes('заверш')) {
                return this.PALETTE.teal;
            }

            // 2. Arrived / Клиент пришёл / Gəldi / Salondadır -> Vibrant green
            if (status.includes('gəldi') || status.includes('salondadır') || status.includes('arriv') || status.includes('пришёл') || status.includes('пришел')) {
                return this.PALETTE.emerald;
            }

            // 3. Confirmed / Подтверждено / Təsdiqləndi -> Blue
            if (status.includes('təsdiq') || status.includes('confirm') || status.includes('подтвержд')) {
                return this.PALETTE.blue;
            }

            // 4. In progress / В процессе / Xidmət göstərilir -> Indigo
            if (status.includes('göstərilir') || status.includes('progress') || status.includes('процесс')) {
                return this.PALETTE.indigo;
            }

            // 5. Cancelled / Отменено / Ləğv edildi -> Red / Rose
            if (status.includes('ləğv') || status.includes('cancel') || status.includes('отмен')) {
                return this.PALETTE.rose;
            }

            // 6. No show / Не пришёл / Gəlmədi -> Dark red
            if (status.includes('gəlmədi') || status.includes('no show') || status.includes('noshow') || status.includes('не приш')) {
                return this.PALETTE.darkred;
            }

            // 7. Awaiting confirmation / Ожидает подтверждения (online pending) -> Yellow / Amber
            if (source === 'online' || status.includes('onlayn') || status.includes('gözləmə') || status.includes('ожида')) {
                return this.PALETTE.amber;
            }

            // 8. Planned / Pending / Запланировано / Gözlənilir -> Purple
            if (status.includes('gözlənilir') || status.includes('pending') || status.includes('plan') || status.includes('запланир')) {
                return this.PALETTE.purple;
            }

            // Fallback default
            return this.PALETTE.blue;
        },

        /**
         * Resolves color theme when mode === 'service'
         */
        resolveByService: function(appointment) {
            if (!appointment) return this.PALETTE.indigo;

            const serviceId = appointment.serviceId || appointment.service;
            const customMap = this.getServiceColors();
            if (serviceId && customMap[serviceId] && this.PALETTE[customMap[serviceId]]) {
                return this.PALETTE[customMap[serviceId]];
            }

            if (appointment.color && this.PALETTE[appointment.color.toLowerCase()]) {
                return this.PALETTE[appointment.color.toLowerCase()];
            }

            const srvName = (appointment.service || '').toLowerCase();
            if (srvName.includes('dırnaq') || srvName.includes('manikür') || srvName.includes('pedikür') || srvName.includes('nail')) {
                return this.PALETTE.pink;
            }
            if (srvName.includes('saç') || srvName.includes('kəsim') || srvName.includes('fen') || srvName.includes('hair') || srvName.includes('kolorist') || srvName.includes('boyama')) {
                return this.PALETTE.purple;
            }
            if (srvName.includes('saqqal') || srvName.includes('barber') || srvName.includes('kişi')) {
                return this.PALETTE.blue;
            }
            if (srvName.includes('üz') || srvName.includes('dəri') || srvName.includes('kosmetoloq') || srvName.includes('facial') || srvName.includes('təmizlən')) {
                return this.PALETTE.emerald;
            }
            if (srvName.includes('masaj') || srvName.includes('spa') || srvName.includes('bədən')) {
                return this.PALETTE.teal;
            }
            if (srvName.includes('makiyaj') || srvName.includes('vizaj') || srvName.includes('qaş') || srvName.includes('kirpik')) {
                return this.PALETTE.orange;
            }

            // Neutral brand color default
            return this.PALETTE.indigo;
        },

        /**
         * Resolves color theme when mode === 'staff'
         */
        resolveByStaff: function(appointment) {
            if (!appointment) return this.PALETTE.blue;

            const masterId = appointment.masterId || appointment.masterKey || appointment.masterName;
            const customMap = this.getStaffColors();
            if (masterId && customMap[masterId] && this.PALETTE[customMap[masterId]]) {
                return this.PALETTE[customMap[masterId]];
            }

            const name = (appointment.masterName || appointment.masterKey || '').toLowerCase();
            if (name.includes('samir')) return this.PALETTE.blue;
            if (name.includes('aygün') || name.includes('aygun')) return this.PALETTE.pink;
            if (name.includes('nigar')) return this.PALETTE.purple;
            if (name.includes('kamran')) return this.PALETTE.teal;
            if (name.includes('aynur')) return this.PALETTE.orange;
            if (name.includes('leyla')) return this.PALETTE.emerald;

            // Deterministic hash over master name
            const paletteKeys = ['blue', 'purple', 'emerald', 'teal', 'orange', 'pink', 'indigo', 'amber'];
            let hash = 0;
            for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
            const chosenKey = paletteKeys[Math.abs(hash) % paletteKeys.length];
            return this.PALETTE[chosenKey] || this.PALETTE.blue;
        },

        /**
         * Centralized function to obtain the full color scheme of an appointment.
         *
         * @param {Object} appointment
         * @param {string} [colorMode] - 'status' | 'service' | 'staff' (optional, uses current setting if omitted)
         * @returns {Object} Complete theme with Tailwind classes and explicit color codes
         */
        getAppointmentColor: function(appointment, colorMode) {
            if (!appointment) {
                return Object.assign({}, this.PALETTE.blue, { mode: 'status', isBlocked: false });
            }

            const status = (appointment.status || '').toLowerCase();
            const masterKey = (appointment.masterKey || '').toLowerCase();
            const colorKey = (appointment.color || '').toLowerCase();
            const isBlocked = appointment.isBlocked || status === 'fasilə' || status === 'məşğul' || status === 'blocked' || masterKey === 'breaks' || colorKey === 'blocked';

            if (isBlocked) {
                return Object.assign({}, this.PALETTE.blocked, {
                    mode: 'blocked',
                    isBlocked: true
                });
            }

            // Card colors strictly resolve by status by default
            const theme = this.resolveByStatus(appointment);

            return Object.assign({}, theme, {
                mode: 'status',
                isBlocked: false
            });
        },

        /**
         * Returns list of predefined status preview items for legend and settings
         */
        getStatusPreviews: function() {
            return [
                {
                    status: 'Gözlənilir',
                    labelAz: 'Gözlənilir / Planlaşdırılıb',
                    labelRu: 'Запланировано / Pending',
                    colorKey: 'purple',
                    theme: this.PALETTE.purple,
                    description: 'Qeydiyyatdan keçmiş, vaxtı təyin olunmuş qəbullar'
                },
                {
                    status: 'Təsdiqləndi',
                    labelAz: 'Təsdiqləndi',
                    labelRu: 'Подтверждено / Confirmed',
                    colorKey: 'blue',
                    theme: this.PALETTE.blue,
                    description: 'Müştəri və ya admin tərəfindən dəqiqləşdirilmiş qəbullar'
                },
                {
                    status: 'Gəldi',
                    labelAz: 'Gəldi (Salondadır)',
                    labelRu: 'Клиент пришёл / Arrived',
                    colorKey: 'emerald',
                    theme: this.PALETTE.emerald,
                    description: 'Müştəri artıq salona daxil olub və gözləmə zonasındadır'
                },
                {
                    status: 'Xidmət göstərilir',
                    labelAz: 'Xidmət göstərilir',
                    labelRu: 'В процессе / In Progress',
                    colorKey: 'indigo',
                    theme: this.PALETTE.indigo,
                    description: 'Usta hazırda müştəriyə xidmət göstərir'
                },
                {
                    status: 'Tamamlandı',
                    labelAz: 'Tamamlandı',
                    labelRu: 'Завершено / Completed',
                    colorKey: 'teal',
                    theme: this.PALETTE.teal,
                    description: 'Xidmət başa çatıb və hesablaşma qeydə alınıb'
                },
                {
                    status: 'Təsdiq gözləyir',
                    labelAz: 'Onlayn müraciət',
                    labelRu: 'Ожидает подтверждения',
                    colorKey: 'amber',
                    theme: this.PALETTE.amber,
                    description: 'Saytdan və ya tətbiqdən göndərilmiş təsdiq tələb edən rezervasiya'
                },
                {
                    status: 'Ləğv edildi',
                    labelAz: 'Ləğv edildi',
                    labelRu: 'Отменено / Cancelled',
                    colorKey: 'rose',
                    theme: this.PALETTE.rose,
                    description: 'Müştəri və ya salon tərəfindən ləğv olunmuş qəbullar'
                },
                {
                    status: 'Gəlmədi',
                    labelAz: 'Gəlmədi',
                    labelRu: 'Не пришёл / No show',
                    colorKey: 'darkred',
                    theme: this.PALETTE.darkred,
                    description: 'Xəbərdarlıq etmədən qəbula gəlməyən müştərilər'
                }
            ];
        }
    };

    try {
        localStorage.setItem(AppointmentColorService.STORAGE_KEY_MODE, 'status');
    } catch (e) {}

    window.AppointmentColorService = AppointmentColorService;

})(typeof window !== 'undefined' ? window : this);
