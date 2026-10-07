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
                headerBg: 'bg-purple-100 text-purple-900 font-semibold',
                headerText: 'text-purple-900',
                border: 'border-purple-300/80 hover:border-purple-400',
                cardBorder: 'border-purple-300/80 hover:border-purple-400',
                bg: 'bg-purple-100 hover:bg-purple-200/70',
                cardBg: 'bg-purple-100 hover:bg-purple-200/70',
                timeColor: 'text-purple-950 font-bold font-mono',
                titleColor: 'text-purple-950 font-bold group-hover:text-purple-900',
                serviceColor: 'text-purple-900/80 font-medium',
                subColor: 'text-purple-800/80',
                priceColor: 'text-purple-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-purple-800 border border-purple-300/80 shadow-2xs',
                dividerColor: 'border-purple-200/80',
                stripeBar: 'bg-purple-500',
                statusBadgeText: 'text-purple-800',
                backgroundColor: '#f3e8ff',
                borderColor: '#d8b4fe',
                textColor: '#3b0764',
                accentColor: '#9333ea'
            },
            blue: {
                key: 'blue',
                name: 'Mavi (Синий)',
                headerBg: 'bg-sky-100 text-sky-900 font-semibold',
                headerText: 'text-sky-900',
                border: 'border-sky-300/80 hover:border-sky-400',
                cardBorder: 'border-sky-300/80 hover:border-sky-400',
                bg: 'bg-sky-100 hover:bg-sky-200/70',
                cardBg: 'bg-sky-100 hover:bg-sky-200/70',
                timeColor: 'text-sky-950 font-bold font-mono',
                titleColor: 'text-sky-950 font-bold group-hover:text-sky-900',
                serviceColor: 'text-sky-900/80 font-medium',
                subColor: 'text-sky-800/80',
                priceColor: 'text-sky-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-sky-800 border border-sky-300/80 shadow-2xs',
                dividerColor: 'border-sky-200/80',
                stripeBar: 'bg-sky-500',
                statusBadgeText: 'text-sky-800',
                backgroundColor: '#e0f2fe',
                borderColor: '#7dd3fc',
                textColor: '#082f49',
                accentColor: '#0284c7'
            },
            emerald: {
                key: 'emerald',
                name: 'Zümrüd / Yaşıl (Зелёный)',
                headerBg: 'bg-emerald-100 text-emerald-900 font-semibold',
                headerText: 'text-emerald-900',
                border: 'border-emerald-300/80 hover:border-emerald-400',
                cardBorder: 'border-emerald-300/80 hover:border-emerald-400',
                bg: 'bg-emerald-100 hover:bg-emerald-200/70',
                cardBg: 'bg-emerald-100 hover:bg-emerald-200/70',
                timeColor: 'text-emerald-950 font-bold font-mono',
                titleColor: 'text-emerald-950 font-bold group-hover:text-emerald-900',
                serviceColor: 'text-emerald-900/80 font-medium',
                subColor: 'text-emerald-800/80',
                priceColor: 'text-emerald-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-emerald-800 border border-emerald-300/80 shadow-2xs',
                dividerColor: 'border-emerald-200/80',
                stripeBar: 'bg-emerald-500',
                statusBadgeText: 'text-emerald-800',
                backgroundColor: '#d1fae5',
                borderColor: '#6ee7b7',
                textColor: '#022c22',
                accentColor: '#059669'
            },
            teal: {
                key: 'teal',
                name: 'Sakit Yaşıl / Firuzəyi (Спокойный зелёный)',
                headerBg: 'bg-teal-100 text-teal-900 font-semibold',
                headerText: 'text-teal-900',
                border: 'border-teal-300/80 hover:border-teal-400',
                cardBorder: 'border-teal-300/80 hover:border-teal-400',
                bg: 'bg-teal-100 hover:bg-teal-200/70',
                cardBg: 'bg-teal-100 hover:bg-teal-200/70',
                timeColor: 'text-teal-950 font-bold font-mono',
                titleColor: 'text-teal-950 font-bold group-hover:text-teal-900',
                serviceColor: 'text-teal-900/80 font-medium',
                subColor: 'text-teal-800/80',
                priceColor: 'text-teal-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-teal-800 border border-teal-300/80 shadow-2xs',
                dividerColor: 'border-teal-200/80',
                stripeBar: 'bg-teal-500',
                statusBadgeText: 'text-teal-800',
                backgroundColor: '#ccfbf1',
                borderColor: '#5eead4',
                textColor: '#042f2e',
                accentColor: '#0d9488'
            },
            amber: {
                key: 'amber',
                name: 'Kəhrəba / Sarı (Жёлтый/Оранжевый)',
                headerBg: 'bg-amber-100 text-amber-950 font-semibold',
                headerText: 'text-amber-950',
                border: 'border-amber-300/80 hover:border-amber-400',
                cardBorder: 'border-amber-300/80 hover:border-amber-400',
                bg: 'bg-amber-100 hover:bg-amber-200/70',
                cardBg: 'bg-amber-100 hover:bg-amber-200/70',
                timeColor: 'text-amber-950 font-bold font-mono',
                titleColor: 'text-amber-950 font-bold group-hover:text-amber-900',
                serviceColor: 'text-amber-900/80 font-medium',
                subColor: 'text-amber-900/80',
                priceColor: 'text-amber-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-amber-900 border border-amber-300/80 shadow-2xs',
                dividerColor: 'border-amber-200/80',
                stripeBar: 'bg-amber-500',
                statusBadgeText: 'text-amber-900',
                backgroundColor: '#fef3c7',
                borderColor: '#fcd34d',
                textColor: '#451a03',
                accentColor: '#f59e0b'
            },
            indigo: {
                key: 'indigo',
                name: 'İndiqo / Zeyvo Bənövşəyi (Индиго)',
                headerBg: 'bg-indigo-100 text-indigo-900 font-semibold',
                headerText: 'text-indigo-900',
                border: 'border-indigo-300/80 hover:border-indigo-400',
                cardBorder: 'border-indigo-300/80 hover:border-indigo-400',
                bg: 'bg-indigo-100 hover:bg-indigo-200/70',
                cardBg: 'bg-indigo-100 hover:bg-indigo-200/70',
                timeColor: 'text-indigo-950 font-bold font-mono',
                titleColor: 'text-indigo-950 font-bold group-hover:text-indigo-900',
                serviceColor: 'text-indigo-900/80 font-medium',
                subColor: 'text-indigo-800/80',
                priceColor: 'text-indigo-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-indigo-800 border border-indigo-300/80 shadow-2xs',
                dividerColor: 'border-indigo-200/80',
                stripeBar: 'bg-indigo-500',
                statusBadgeText: 'text-indigo-800',
                backgroundColor: '#e0e7ff',
                borderColor: '#a5b4fc',
                textColor: '#1e1b4b',
                accentColor: '#4f39f6'
            },
            rose: {
                key: 'rose',
                name: 'Qırmızı (Красный)',
                headerBg: 'bg-rose-100 text-rose-900 font-semibold',
                headerText: 'text-rose-900',
                border: 'border-rose-300/80 hover:border-rose-400',
                cardBorder: 'border-rose-300/80 hover:border-rose-400',
                bg: 'bg-rose-100 hover:bg-rose-200/70',
                cardBg: 'bg-rose-100 hover:bg-rose-200/70',
                timeColor: 'text-rose-950 font-bold font-mono',
                titleColor: 'text-rose-950 font-bold group-hover:text-rose-900',
                serviceColor: 'text-rose-900/80 font-medium',
                subColor: 'text-rose-800/80',
                priceColor: 'text-rose-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-rose-800 border border-rose-300/80 shadow-2xs',
                dividerColor: 'border-rose-200/80',
                stripeBar: 'bg-rose-500',
                statusBadgeText: 'text-rose-800',
                backgroundColor: '#ffe4e6',
                borderColor: '#fda4af',
                textColor: '#4c0519',
                accentColor: '#f43f5e'
            },
            darkred: {
                key: 'darkred',
                name: 'Tünd Qırmızı (Тёмно-красный)',
                headerBg: 'bg-red-100 text-red-900 font-semibold',
                headerText: 'text-red-900',
                border: 'border-red-300/80 hover:border-red-400',
                cardBorder: 'border-red-300/80 hover:border-red-400',
                bg: 'bg-red-100 hover:bg-red-200/70',
                cardBg: 'bg-red-100 hover:bg-red-200/70',
                timeColor: 'text-red-950 font-bold font-mono',
                titleColor: 'text-red-950 font-bold group-hover:text-red-900',
                serviceColor: 'text-red-900/80 font-medium',
                subColor: 'text-red-800/80',
                priceColor: 'text-red-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-red-900 border border-red-300/80 shadow-2xs',
                dividerColor: 'border-red-200/80',
                stripeBar: 'bg-red-700',
                statusBadgeText: 'text-red-900',
                backgroundColor: '#fee2e2',
                borderColor: '#fca5a5',
                textColor: '#450a0a',
                accentColor: '#991b1b'
            },
            pink: {
                key: 'pink',
                name: 'Çəhrayı (Розовый)',
                headerBg: 'bg-pink-100 text-pink-900 font-semibold',
                headerText: 'text-pink-900',
                border: 'border-pink-300/80 hover:border-pink-400',
                cardBorder: 'border-pink-300/80 hover:border-pink-400',
                bg: 'bg-pink-100 hover:bg-pink-200/70',
                cardBg: 'bg-pink-100 hover:bg-pink-200/70',
                timeColor: 'text-pink-950 font-bold font-mono',
                titleColor: 'text-pink-950 font-bold group-hover:text-pink-900',
                serviceColor: 'text-pink-900/80 font-medium',
                subColor: 'text-pink-800/80',
                priceColor: 'text-pink-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-pink-800 border border-pink-300/80 shadow-2xs',
                dividerColor: 'border-pink-200/80',
                stripeBar: 'bg-pink-500',
                statusBadgeText: 'text-pink-800',
                backgroundColor: '#fce7f3',
                borderColor: '#f472b6',
                textColor: '#500724',
                accentColor: '#db2777'
            },
            orange: {
                key: 'orange',
                name: 'Narıncı (Оранжевый)',
                headerBg: 'bg-orange-100 text-orange-950 font-semibold',
                headerText: 'text-orange-950',
                border: 'border-orange-300/80 hover:border-orange-400',
                cardBorder: 'border-orange-300/80 hover:border-orange-400',
                bg: 'bg-orange-100 hover:bg-orange-200/70',
                cardBg: 'bg-orange-100 hover:bg-orange-200/70',
                timeColor: 'text-orange-950 font-bold font-mono',
                titleColor: 'text-orange-950 font-bold group-hover:text-orange-900',
                serviceColor: 'text-orange-900/80 font-medium',
                subColor: 'text-orange-800/80',
                priceColor: 'text-orange-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-orange-800 border border-orange-300/80 shadow-2xs',
                dividerColor: 'border-orange-200/80',
                stripeBar: 'bg-orange-500',
                statusBadgeText: 'text-orange-800',
                backgroundColor: '#ffedd5',
                borderColor: '#fdba74',
                textColor: '#431407',
                accentColor: '#ea580c'
            },
            yellow: {
                key: 'yellow',
                name: 'Zeyvo Sarı (Жёлтый)',
                headerBg: 'bg-amber-100 text-amber-950 font-semibold',
                headerText: 'text-amber-950',
                border: 'border-amber-300/80 hover:border-amber-400',
                cardBorder: 'border-amber-300/80 hover:border-amber-400',
                bg: 'bg-amber-100 hover:bg-amber-200/70',
                cardBg: 'bg-amber-100 hover:bg-amber-200/70',
                timeColor: 'text-amber-950 font-bold font-mono',
                titleColor: 'text-amber-950 font-bold group-hover:text-amber-900',
                serviceColor: 'text-amber-900/80 font-medium',
                subColor: 'text-amber-900/80',
                priceColor: 'text-amber-950 font-bold font-mono',
                badgeBg: 'bg-white/90 text-amber-900 border border-amber-300/80 shadow-2xs',
                dividerColor: 'border-amber-200/80',
                stripeBar: 'bg-[#FFDD2D]',
                statusBadgeText: 'text-amber-900',
                backgroundColor: '#fef3c7',
                borderColor: '#fcd34d',
                textColor: '#451a03',
                accentColor: '#FFDD2D'
            },
            blocked: {
                key: 'blocked',
                name: 'Fasilə / Məşğul (Перерыв / Блок)',
                headerBg: 'bg-slate-200 text-slate-800 font-semibold',
                headerText: 'text-slate-800',
                border: 'border-slate-300 hover:border-slate-400',
                cardBorder: 'border-slate-300 hover:border-slate-400',
                bg: 'bg-slate-100 hover:bg-slate-200/70',
                cardBg: 'bg-slate-100 hover:bg-slate-200/70',
                stripedStyle: 'background-image: repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 8px, #e2e8f0 8px, #e2e8f0 16px);',
                timeColor: 'text-slate-800 font-bold font-mono',
                titleColor: 'text-slate-800 font-bold',
                serviceColor: 'text-slate-600 font-medium',
                subColor: 'text-slate-500',
                priceColor: 'text-slate-700 font-bold font-mono',
                badgeBg: 'bg-white/90 text-slate-700 border border-slate-300 shadow-2xs',
                dividerColor: 'border-slate-200',
                stripeBar: 'bg-slate-400',
                statusBadgeText: 'text-slate-700',
                backgroundColor: '#f1f5f9',
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
