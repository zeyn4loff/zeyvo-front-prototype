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
                headerBg: 'bg-purple-600 text-white font-semibold',
                headerText: 'text-white',
                border: 'border-purple-300/80',
                bg: 'bg-purple-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-purple-950/80',
                subColor: 'text-purple-700/80',
                priceColor: 'text-purple-950 font-bold',
                badgeBg: 'bg-purple-100 text-purple-900 font-semibold',
                stripeBar: 'bg-purple-600',
                statusBadgeText: 'text-purple-800',
                backgroundColor: '#faf5ff',
                borderColor: '#d8b4fe',
                textColor: '#581c87',
                accentColor: '#9333ea'
            },
            blue: {
                key: 'blue',
                name: 'Mavi (Синий)',
                headerBg: 'bg-sky-600 text-white font-semibold',
                headerText: 'text-white',
                border: 'border-sky-300/80',
                bg: 'bg-sky-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-sky-950/80',
                subColor: 'text-sky-700/80',
                priceColor: 'text-sky-950 font-bold',
                badgeBg: 'bg-sky-100 text-sky-900 font-semibold',
                stripeBar: 'bg-sky-600',
                statusBadgeText: 'text-sky-900',
                backgroundColor: '#f0f9ff',
                borderColor: '#7dd3fc',
                textColor: '#0c4a6e',
                accentColor: '#0284c7'
            },
            emerald: {
                key: 'emerald',
                name: 'Zümrüd / Yaşıl (Зелёный)',
                headerBg: 'bg-emerald-600 text-white font-semibold',
                headerText: 'text-white',
                border: 'border-emerald-300/80',
                bg: 'bg-emerald-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-emerald-950/80',
                subColor: 'text-emerald-700/80',
                priceColor: 'text-emerald-950 font-bold',
                badgeBg: 'bg-emerald-100 text-emerald-900 font-semibold',
                stripeBar: 'bg-emerald-600',
                statusBadgeText: 'text-emerald-900',
                backgroundColor: '#ecfdf5',
                borderColor: '#6ee7b7',
                textColor: '#064e3b',
                accentColor: '#059669'
            },
            teal: {
                key: 'teal',
                name: 'Sakit Yaşıl / Firuzəyi (Спокойный зелёный)',
                headerBg: 'bg-teal-600 text-white font-semibold',
                headerText: 'text-white',
                border: 'border-teal-300/80',
                bg: 'bg-teal-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-teal-950/80',
                subColor: 'text-teal-700/80',
                priceColor: 'text-teal-950 font-bold',
                badgeBg: 'bg-teal-100 text-teal-900 font-semibold',
                stripeBar: 'bg-teal-600',
                statusBadgeText: 'text-teal-900',
                backgroundColor: '#f0fdfa',
                borderColor: '#5eead4',
                textColor: '#134e4a',
                accentColor: '#0d9488'
            },
            amber: {
                key: 'amber',
                name: 'Kəhrəba / Sarı (Жёлтый/Оранжевый)',
                headerBg: 'bg-amber-400 text-amber-950 font-bold',
                headerText: 'text-amber-950',
                border: 'border-amber-300/80',
                bg: 'bg-amber-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-amber-950/80',
                subColor: 'text-amber-800/80',
                priceColor: 'text-amber-950 font-bold',
                badgeBg: 'bg-amber-200 text-amber-950 font-semibold',
                stripeBar: 'bg-amber-500',
                statusBadgeText: 'text-amber-950',
                backgroundColor: '#fffbeb',
                borderColor: '#fcd34d',
                textColor: '#78350f',
                accentColor: '#f59e0b'
            },
            indigo: {
                key: 'indigo',
                name: 'İndiqo / Zeyvo Bənövşəyi (Индиго)',
                headerBg: 'bg-[#4f39f6] text-white font-semibold',
                headerText: 'text-white',
                border: 'border-indigo-300/80',
                bg: 'bg-indigo-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-indigo-950/80',
                subColor: 'text-indigo-700/80',
                priceColor: 'text-indigo-950 font-bold',
                badgeBg: 'bg-indigo-100 text-indigo-900 font-semibold',
                stripeBar: 'bg-[#4f39f6]',
                statusBadgeText: 'text-indigo-900',
                backgroundColor: '#eef2ff',
                borderColor: '#a5b4fc',
                textColor: '#312e81',
                accentColor: '#4f39f6'
            },
            rose: {
                key: 'rose',
                name: 'Qırmızı (Красный)',
                headerBg: 'bg-rose-500 text-white font-semibold',
                headerText: 'text-white',
                border: 'border-rose-300/80',
                bg: 'bg-rose-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-rose-950/80',
                subColor: 'text-rose-700/80',
                priceColor: 'text-rose-950 font-bold',
                badgeBg: 'bg-rose-100 text-rose-900 font-semibold',
                stripeBar: 'bg-rose-500',
                statusBadgeText: 'text-rose-900',
                backgroundColor: '#fff1f2',
                borderColor: '#fda4af',
                textColor: '#881337',
                accentColor: '#f43f5e'
            },
            darkred: {
                key: 'darkred',
                name: 'Tünd Qırmızı (Тёмно-красный)',
                headerBg: 'bg-red-800 text-white font-semibold',
                headerText: 'text-white',
                border: 'border-red-400/80',
                bg: 'bg-red-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-red-950/80',
                subColor: 'text-red-700/80',
                priceColor: 'text-red-950 font-bold',
                badgeBg: 'bg-red-200 text-red-950 font-semibold',
                stripeBar: 'bg-red-800',
                statusBadgeText: 'text-red-950',
                backgroundColor: '#fef2f2',
                borderColor: '#f87171',
                textColor: '#450a0a',
                accentColor: '#991b1b'
            },
            pink: {
                key: 'pink',
                name: 'Çəhrayı (Розовый)',
                headerBg: 'bg-pink-600 text-white font-semibold',
                headerText: 'text-white',
                border: 'border-pink-300/80',
                bg: 'bg-pink-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-pink-950/80',
                subColor: 'text-pink-700/80',
                priceColor: 'text-pink-950 font-bold',
                badgeBg: 'bg-pink-100 text-pink-900 font-semibold',
                stripeBar: 'bg-pink-600',
                statusBadgeText: 'text-pink-900',
                backgroundColor: '#fdf2f8',
                borderColor: '#f472b6',
                textColor: '#831843',
                accentColor: '#db2777'
            },
            orange: {
                key: 'orange',
                name: 'Narıncı (Оранжевый)',
                headerBg: 'bg-orange-500 text-white font-semibold',
                headerText: 'text-white',
                border: 'border-orange-300/80',
                bg: 'bg-orange-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-orange-950/80',
                subColor: 'text-orange-700/80',
                priceColor: 'text-orange-950 font-bold',
                badgeBg: 'bg-orange-200 text-orange-950 font-semibold',
                stripeBar: 'bg-orange-500',
                statusBadgeText: 'text-orange-900',
                backgroundColor: '#fff7ed',
                borderColor: '#fdba74',
                textColor: '#7c2d12',
                accentColor: '#ea580c'
            },
            yellow: {
                key: 'yellow',
                name: 'Zeyvo Sarı (Жёлтый)',
                headerBg: 'bg-amber-400 text-amber-950 font-bold',
                headerText: 'text-amber-950',
                border: 'border-amber-300/80',
                bg: 'bg-amber-50/90',
                titleColor: 'text-slate-900',
                serviceColor: 'text-amber-950/80',
                subColor: 'text-amber-700/80',
                priceColor: 'text-amber-950 font-bold',
                badgeBg: 'bg-amber-200 text-amber-950 font-semibold',
                stripeBar: 'bg-amber-400',
                statusBadgeText: 'text-amber-950',
                backgroundColor: '#fffbeb',
                borderColor: '#fcd34d',
                textColor: '#78350f',
                accentColor: '#f59e0b'
            },
            blocked: {
                key: 'blocked',
                name: 'Fasilə / Məşğul (Перерыв / Блок)',
                headerBg: 'bg-slate-500 text-white font-semibold',
                headerText: 'text-white',
                border: 'border-slate-300',
                bg: 'bg-slate-50',
                stripedStyle: 'background-image: repeating-linear-gradient(45deg, #f8fafc, #f8fafc 8px, #e2e8f0 8px, #e2e8f0 16px);',
                titleColor: 'text-slate-800',
                serviceColor: 'text-slate-500',
                subColor: 'text-slate-400',
                priceColor: 'text-slate-600',
                badgeBg: 'bg-slate-200 text-slate-700',
                stripeBar: 'bg-slate-500',
                statusBadgeText: 'text-slate-700',
                backgroundColor: '#f8fafc',
                borderColor: '#cbd5e1',
                textColor: '#334155',
                accentColor: '#64748b'
            }
        },

        // Get saved mode ('status' | 'service' | 'staff')
        getColorMode: function() {
            try {
                return localStorage.getItem(this.STORAGE_KEY_MODE) || 'status';
            } catch (e) {
                return 'status';
            }
        },

        setColorMode: function(mode) {
            try {
                localStorage.setItem(this.STORAGE_KEY_MODE, mode || 'status');
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

            const mode = colorMode || this.getColorMode();
            let theme;

            if (mode === 'service') {
                theme = this.resolveByService(appointment);
            } else if (mode === 'staff') {
                theme = this.resolveByStaff(appointment);
            } else {
                theme = this.resolveByStatus(appointment);
            }

            return Object.assign({}, theme, {
                mode: mode,
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

    window.AppointmentColorService = AppointmentColorService;

})(typeof window !== 'undefined' ? window : this);
