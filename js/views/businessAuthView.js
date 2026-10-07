// ========================================================
// BUSINESS SAAS AUTH VIEW: ZEYVO BUSINESS CRM AUTHENTICATION
// (Brand-consistent Light Theme: Yellow #FFDD2D & Graphite #1F2024)
// ========================================================
const BusinessAuthView = {
    currentMode: 'login', // 'login' | 'register' | 'forgot'

    render: function() {
        return `
            <div class="min-h-screen bg-[#F6F7F9] text-tbank-graphite flex flex-col justify-between font-sans antialiased selection:bg-[#FFDD2D] selection:text-[#1F2024]">
                <!-- Top SaaS Brand Bar (Yellow Zeyvo Style) -->
                <header class="w-full bg-tbank-yellow border-b border-black/[0.08] sticky top-0 z-40 shadow-xs">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
                        <div class="flex items-center gap-3">
                            <a href="#/business/auth" class="flex items-center gap-2 group">
                                <span class="text-2xl font-black tracking-[-0.055em] text-tbank-graphite flex items-center gap-0.5">
                                    <span>zeyvo</span>
                                    <span class="w-2 h-2 rounded-full bg-tbank-graphite inline-block mb-1"></span>
                                </span>
                                <span class="px-2 py-0.5 rounded-lg bg-tbank-graphite text-tbank-yellow text-[10px] font-bold shadow-xs">
                                    Business
                                </span>
                            </a>
                        </div>

                        <div class="flex items-center gap-2">
                            <a href="#/" class="text-xs font-bold text-tbank-graphite/80 hover:text-black flex items-center gap-1.5 transition px-3 py-1.5 rounded-xl bg-black/[0.06] hover:bg-black/[0.10]">
                                <span>←</span>
                                <span class="hidden sm:inline">Müştəri platformasına</span> qayıt
                            </a>
                        </div>
                    </div>
                </header>

                <!-- Main SaaS Container (Centered Auth Card) -->
                <main class="flex-1 flex items-center justify-center p-4 sm:p-8">
                    <div class="w-full max-w-xl">
                        <!-- Clean White Auth Card -->
                        <div class="w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-9 shadow-lg relative">
                                
                                <!-- Mode Selector Tabs -->
                                <div class="flex rounded-2xl bg-slate-100 p-1 mb-6">
                                    <button id="bizAuthTabLogin" onclick="BusinessAuthView.switchMode('login')" class="flex-1 py-2 rounded-xl text-xs font-black transition bg-tbank-yellow text-tbank-graphite shadow-sm">
                                        Giriş
                                    </button>
                                    <button id="bizAuthTabRegister" onclick="BusinessAuthView.switchMode('register')" class="flex-1 py-2 rounded-xl text-xs font-bold transition text-slate-500 hover:text-tbank-graphite">
                                        Qeydiyyat
                                    </button>
                                </div>

                                <!-- Error Alert Box -->
                                <div id="bizAuthErrorBox" class="hidden mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                                    <svg class="w-4 h-4 text-rose-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                    <span id="bizAuthErrorMsg">Xəta baş verdi</span>
                                </div>

                                <!-- FORM 1: LOGIN -->
                                <form id="bizLoginForm" onsubmit="BusinessAuthView.handleLogin(event)" class="space-y-4">
                                    <div>
                                        <label class="block text-xs font-bold text-slate-600 mb-1.5">İş e-poçt ünvanı</label>
                                        <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3 gap-2.5 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                            <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
                                            <input type="email" id="bizLoginEmail" required placeholder="salon@domain.com" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none">
                                        </div>
                                    </div>

                                    <div>
                                        <div class="flex items-center justify-between mb-1.5">
                                            <label class="text-xs font-bold text-slate-600">Şifrə</label>
                                            <button type="button" onclick="BusinessAuthView.switchMode('forgot')" class="text-[11px] font-bold text-tbank-graphite hover:underline">Şifrəni unutmusunuz?</button>
                                        </div>
                                        <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3 gap-2.5 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition relative">
                                            <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                            <input type="password" id="bizLoginPassword" required minlength="6" placeholder="••••••••" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none">
                                            <button type="button" onclick="BusinessAuthView.togglePassword('bizLoginPassword', this)" class="text-slate-400 hover:text-slate-600 p-1">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-between text-xs text-slate-500 pt-1">
                                        <label class="flex items-center gap-2 cursor-pointer select-none">
                                            <input type="checkbox" checked class="rounded border-slate-300 accent-amber-400">
                                            <span class="font-medium">Məni yadda saxla</span>
                                        </label>
                                    </div>

                                    <button type="submit" class="w-full h-11 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition flex items-center justify-center gap-2">
                                        <span>Zeyvo Business-ə daxil ol</span>
                                        <span>→</span>
                                    </button>

                                    <!-- Quick 1-Click Demo Partner Login -->
                                    <div class="pt-3 border-t border-slate-100 text-center">
                                        <button type="button" onclick="BusinessAuthView.quickDemoLogin()" class="w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-tbank-graphite border border-slate-200 font-bold text-xs transition flex items-center justify-center gap-2">
                                            <svg class="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                            <span>Demo salon girişi (Baku Beauty Studio)</span>
                                        </button>
                                        <p class="text-[10px] text-slate-400 mt-2 font-medium">Test rejimində dərhal biznes idarəetməsi ilə tanış olun</p>
                                    </div>
                                </form>

                                <!-- FORM 2: REGISTER -->
                                <form id="bizRegisterForm" onsubmit="BusinessAuthView.handleRegister(event)" class="hidden space-y-3.5">
                                    <!-- Name field -->
                                    <div>
                                        <label class="block text-xs font-bold text-slate-600 mb-1.5">Ad və soyad</label>
                                        <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3 gap-2.5 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                            <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
                                            <input id="bizRegName" type="text" required placeholder="Məs: Əli Əliyev" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none">
                                        </div>
                                    </div>

                                    <!-- Phone field -->
                                    <div>
                                        <label class="block text-xs font-bold text-slate-600 mb-1.5">Mobil nömrə</label>
                                        <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center overflow-hidden focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                            <div class="flex items-center gap-1.5 px-3 bg-slate-100 border-r border-slate-200 h-full select-none shrink-0">
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
                                            <input id="bizRegPhone" type="tel" maxlength="15" required placeholder="(50) 000-00-00" oninput="App.formatAzPhone(this)" class="w-full h-full px-3 bg-transparent text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none">
                                        </div>
                                    </div>

                                    <!-- Email field -->
                                    <div>
                                        <label class="block text-xs font-bold text-slate-600 mb-1.5">E-poçt ünvanı (Email)</label>
                                        <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3 gap-2.5 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition">
                                            <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
                                            <input id="bizRegEmail" type="email" required placeholder="ad@domain.com" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none">
                                        </div>
                                    </div>

                                    <!-- Password field -->
                                    <div>
                                        <label class="block text-xs font-bold text-slate-600 mb-1.5">Şifrə</label>
                                        <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3 gap-2.5 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition relative">
                                            <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                            <input id="bizRegPass" type="password" required minlength="6" placeholder="Minimum 6 simvol" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none">
                                            <button type="button" onclick="BusinessAuthView.togglePassword('bizRegPass', this)" class="text-slate-400 hover:text-slate-600 p-1" title="Şifrəni göstər/gizlə">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Confirm Password field -->
                                    <div>
                                        <label class="block text-xs font-bold text-slate-600 mb-1.5">Şifrənin təkrarı</label>
                                        <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3 gap-2.5 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition relative">
                                            <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                            <input id="bizRegPassConfirm" type="password" required minlength="6" placeholder="Şifrəni təkrar yazın" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none">
                                            <button type="button" onclick="BusinessAuthView.togglePassword('bizRegPassConfirm', this)" class="text-slate-400 hover:text-slate-600 p-1" title="Şifrəni göstər/gizlə">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Terms checkbox -->
                                    <div class="flex items-start gap-2 pt-1 text-slate-600">
                                        <input type="checkbox" id="bizRegTerms" checked class="mt-0.5 rounded border-slate-300 accent-amber-400">
                                        <label class="text-[11px] leading-tight select-none">
                                            <span onclick="BusinessAuthView.openTerms('terms')" class="text-tbank-graphite font-bold hover:underline cursor-pointer">İstifadəçi şərtləri</span> və <span onclick="BusinessAuthView.openTerms('privacy')" class="text-tbank-graphite font-bold hover:underline cursor-pointer">Məxfilik siyasəti</span> ilə razıyam.
                                        </label>
                                    </div>

                                    <!-- Submit Button -->
                                    <button type="submit" class="w-full h-11 mt-2 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs shadow-sm transition flex items-center justify-center gap-2">
                                        <span>Qeydiyyatı tamamla</span>
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </button>
                                </form>

                                <!-- FORM 3: FORGOT PASSWORD (MULTI-STEP) -->
                                <div id="bizForgotForm" class="hidden space-y-4">
                                    <!-- Step 1: Email Input -->
                                    <div id="bizForgotStep1" class="space-y-4">
                                        <div class="text-center">
                                            <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center mx-auto mb-2 text-amber-700">
                                                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3M18.5 4.5l3 3"/></svg>
                                            </div>
                                            <h3 class="font-black text-base text-tbank-graphite">Şifrənin bərpası</h3>
                                            <p class="text-xs text-slate-500 mt-1">İş e-poçt ünvanınızı qeyd edin, 6 rəqəmli təsdiq kodu göndərək.</p>
                                        </div>

                                        <div>
                                            <label class="block text-xs font-bold text-slate-600 mb-1.5">İş e-poçtu</label>
                                            <input type="email" id="bizForgotEmail" placeholder="salon@domain.com" class="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-tbank-graphite placeholder:text-slate-400 outline-none focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 focus:bg-white transition">
                                        </div>

                                        <button type="button" onclick="BusinessAuthView.sendRecoveryCode()" class="w-full h-11 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs transition shadow-sm flex items-center justify-center gap-2">
                                            <span>Kodu göndər</span>
                                            <span>→</span>
                                        </button>

                                        <div class="text-center pt-1">
                                            <button type="button" onclick="BusinessAuthView.switchMode('login')" class="text-xs font-bold text-slate-500 hover:text-tbank-graphite transition">
                                                ← Giriş pəncərəsinə qayıt
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Step 2: 6-digit Code + Timer -->
                                    <div id="bizForgotStep2" class="hidden space-y-4">
                                        <div class="text-center">
                                            <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center mx-auto mb-2 text-amber-700">
                                                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
                                            </div>
                                            <h3 class="font-black text-base text-tbank-graphite">Təsdiq kodunu daxil edin</h3>
                                            <p class="text-xs text-slate-500 mt-1">6 rəqəmli kod <span id="bizForgotTargetEmail" class="font-bold text-tbank-graphite break-all"></span> ünvanına göndərildi.</p>
                                        </div>

                                        <!-- 6 OTP Boxes -->
                                        <div class="flex items-center justify-center gap-1.5 sm:gap-2 my-2" id="bizOtpContainer">
                                            <input type="text" maxlength="1" inputmode="numeric" class="biz-otp-box w-10 sm:w-11 h-12 text-center text-lg font-black rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 outline-none transition" oninput="BusinessAuthView.onOtpInput(this, 0)" onkeydown="BusinessAuthView.onOtpKeydown(event, this, 0)" onpaste="BusinessAuthView.onOtpPaste(event)">
                                            <input type="text" maxlength="1" inputmode="numeric" class="biz-otp-box w-10 sm:w-11 h-12 text-center text-lg font-black rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 outline-none transition" oninput="BusinessAuthView.onOtpInput(this, 1)" onkeydown="BusinessAuthView.onOtpKeydown(event, this, 1)">
                                            <input type="text" maxlength="1" inputmode="numeric" class="biz-otp-box w-10 sm:w-11 h-12 text-center text-lg font-black rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 outline-none transition" oninput="BusinessAuthView.onOtpInput(this, 2)" onkeydown="BusinessAuthView.onOtpKeydown(event, this, 2)">
                                            <span class="text-slate-300 font-bold select-none">-</span>
                                            <input type="text" maxlength="1" inputmode="numeric" class="biz-otp-box w-10 sm:w-11 h-12 text-center text-lg font-black rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 outline-none transition" oninput="BusinessAuthView.onOtpInput(this, 3)" onkeydown="BusinessAuthView.onOtpKeydown(event, this, 3)">
                                            <input type="text" maxlength="1" inputmode="numeric" class="biz-otp-box w-10 sm:w-11 h-12 text-center text-lg font-black rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 outline-none transition" oninput="BusinessAuthView.onOtpInput(this, 4)" onkeydown="BusinessAuthView.onOtpKeydown(event, this, 4)">
                                            <input type="text" maxlength="1" inputmode="numeric" class="biz-otp-box w-10 sm:w-11 h-12 text-center text-lg font-black rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-tbank-graphite focus:ring-2 focus:ring-tbank-yellow/40 outline-none transition" oninput="BusinessAuthView.onOtpInput(this, 5)" onkeydown="BusinessAuthView.onOtpKeydown(event, this, 5)">
                                        </div>

                                        <div class="text-center">
                                            <button type="button" onclick="BusinessAuthView.autoFillCode()" class="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-lg transition inline-flex items-center gap-1.5">
                                                <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                                <span>Kodu daxil et (Demo)</span>
                                            </button>
                                        </div>

                                        <!-- Timer & Resend Button -->
                                        <div class="text-center py-1">
                                            <div id="bizForgotTimerBox" class="text-xs font-semibold text-slate-400 flex items-center justify-center gap-1.5">
                                                <span>Kodu yenidən göndər:</span>
                                                <span id="bizForgotCountdown" class="font-mono font-black text-tbank-graphite bg-slate-100 px-2 py-0.5 rounded-md">01:00</span>
                                            </div>
                                            <button id="bizForgotResendBtn" type="button" onclick="BusinessAuthView.resendRecoveryCode()" class="hidden text-xs font-black text-tbank-graphite hover:underline transition">
                                                Kodu yenidən göndər ↻
                                            </button>
                                        </div>

                                        <button type="button" onclick="BusinessAuthView.verifyRecoveryCode()" class="w-full h-11 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs transition shadow-sm flex items-center justify-center gap-2">
                                            <span>Təsdiq et</span>
                                            <span>→</span>
                                        </button>

                                        <div class="text-center pt-1">
                                            <button type="button" onclick="BusinessAuthView.goToForgotStep(1)" class="text-xs font-bold text-slate-500 hover:text-tbank-graphite transition">
                                                ← E-poçt ünvanını dəyiş
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Step 3: New Password & Confirmation -->
                                    <div id="bizForgotStep3" class="hidden space-y-4">
                                        <div class="p-3 bg-green-50 rounded-2xl border border-green-200/70 flex items-start gap-2.5">
                                            <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                            <div>
                                                <div class="text-xs font-bold text-tbank-graphite">Yeni şifrə təyini</div>
                                                <p class="text-[11px] text-slate-600 mt-0.5 leading-relaxed">Kod təsdiqləndi. Hesabınız üçün yeni şifrə təyin edin və təkrarlayın.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <label class="block text-xs font-bold text-slate-600 mb-1.5">Yeni şifrə</label>
                                            <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3 gap-2.5 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition relative">
                                                <input type="password" id="bizForgotNewPass" required minlength="6" placeholder="Minimum 6 simvol" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                                <button type="button" onclick="BusinessAuthView.togglePassword('bizForgotNewPass', this)" class="text-slate-400 hover:text-slate-600 p-1">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label class="block text-xs font-bold text-slate-600 mb-1.5">Yeni şifrənin təkrarı</label>
                                            <div class="h-11 bg-slate-50 rounded-xl border border-slate-200 flex items-center px-3 gap-2.5 focus-within:border-tbank-graphite focus-within:ring-2 focus-within:ring-tbank-yellow/40 focus-within:bg-white transition relative">
                                                <input type="password" id="bizForgotConfirmPass" required minlength="6" placeholder="Şifrəni təkrar daxil edin" class="w-full bg-transparent text-xs font-semibold text-tbank-graphite outline-none">
                                                <button type="button" onclick="BusinessAuthView.togglePassword('bizForgotConfirmPass', this)" class="text-slate-400 hover:text-slate-600 p-1">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <button type="button" onclick="BusinessAuthView.saveNewPassword()" class="w-full h-11 rounded-xl bg-tbank-yellow hover:bg-tbank-yellowHover text-tbank-graphite font-black text-xs transition shadow-sm flex items-center justify-center gap-2">
                                            <span>Şifrəni yenilə və daxil ol</span>
                                            <span>→</span>
                                        </button>

                                        <div class="text-center pt-1">
                                            <button type="button" onclick="BusinessAuthView.switchMode('login')" class="text-xs font-bold text-slate-500 hover:text-tbank-graphite transition">
                                                Ləğv et
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-6 pt-5 border-t border-slate-100">
                                    <a href="https://wa.me/994503100020?text=Salam%2C%20Zeyvo%20Business%20haqq%C4%B1nda%20sual%C4%B1m%20var" target="_blank" rel="noopener noreferrer" class="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group active:scale-[0.99]">
                                        <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                        </svg>
                                        <span>Sualınız var? Bizə yazın.</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                </main>

                <!-- Clean SaaS Footer -->
                <footer class="w-full bg-white border-t border-slate-200/90 py-5">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                        <div>© 2026 Zeyvo Technologies LLC. Bütün hüquqlar qorunur.</div>
                        <div class="flex items-center gap-5 sm:gap-6 text-xs font-bold text-slate-500">
                            <button type="button" onclick="App.openLegalModal('terms')" class="hover:text-tbank-graphite transition cursor-pointer">Şərtlər</button>
                            <button type="button" onclick="App.openLegalModal('privacy')" class="hover:text-tbank-graphite transition cursor-pointer">Məxfilik</button>
                        </div>
                    </div>
                </footer>
            </div>
        `;
    },

    openTerms: function(tab = 'terms') {
        if (typeof App !== 'undefined' && App.openLegalModal) {
            App.openLegalModal(tab);
        }
    },

    afterRender: function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.switchMode(this.currentMode || 'login');
    },

    switchMode: function(mode) {
        this.currentMode = mode;
        this.clearError();

        const tabLogin = document.getElementById('bizAuthTabLogin');
        const tabReg = document.getElementById('bizAuthTabRegister');
        const formLogin = document.getElementById('bizLoginForm');
        const formReg = document.getElementById('bizRegisterForm');
        const formForgot = document.getElementById('bizForgotForm');

        if (!formLogin || !formReg || !formForgot) return;

        if (mode === 'login') {
            tabLogin.className = "flex-1 py-2 rounded-xl text-xs font-black transition bg-tbank-yellow text-tbank-graphite shadow-sm";
            tabReg.className = "flex-1 py-2 rounded-xl text-xs font-bold transition text-slate-500 hover:text-tbank-graphite";
            formLogin.classList.remove('hidden');
            formReg.classList.add('hidden');
            formForgot.classList.add('hidden');
        } else if (mode === 'register') {
            tabLogin.className = "flex-1 py-2 rounded-xl text-xs font-bold transition text-slate-500 hover:text-tbank-graphite";
            tabReg.className = "flex-1 py-2 rounded-xl text-xs font-black transition bg-tbank-yellow text-tbank-graphite shadow-sm";
            formLogin.classList.add('hidden');
            formReg.classList.remove('hidden');
            formForgot.classList.add('hidden');
        } else if (mode === 'forgot') {
            tabLogin.className = "flex-1 py-2 rounded-xl text-xs font-bold transition text-slate-500 hover:text-tbank-graphite";
            tabReg.className = "flex-1 py-2 rounded-xl text-xs font-bold transition text-slate-500 hover:text-tbank-graphite";
            formLogin.classList.add('hidden');
            formReg.classList.add('hidden');
            formForgot.classList.remove('hidden');
        }
    },

    showError: function(msg) {
        const box = document.getElementById('bizAuthErrorBox');
        const text = document.getElementById('bizAuthErrorMsg');
        if (box && text) {
            text.textContent = msg;
            box.classList.remove('hidden');
        }
    },

    clearError: function() {
        const box = document.getElementById('bizAuthErrorBox');
        if (box) box.classList.add('hidden');
    },

    togglePassword: function(inputId, btn) {
        const input = document.getElementById(inputId);
        if (!input) return;
        if (input.type === 'password') {
            input.type = 'text';
            btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
        } else {
            input.type = 'password';
            btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
        }
    },

    handleLogin: function(e) {
        if (e) e.preventDefault();
        this.clearError();

        const email = document.getElementById('bizLoginEmail')?.value.trim();
        const pass = document.getElementById('bizLoginPassword')?.value.trim();

        if (!email || !email.includes('@')) {
            this.showError("Zəhmət olmasa düzgün iş e-poçt ünvanı daxil edin.");
            return;
        }

        if (!pass || pass.length < 6) {
            this.showError("Şifrə minimum 6 simvoldan ibarət olmalıdır.");
            return;
        }

        let partner = JSON.parse(localStorage.getItem('zeyvo_partner_user') || 'null');
        if (!partner || partner.email !== email) {
            partner = {
                id: 'biz_' + Date.now(),
                businessName: "Baku Beauty Studio",
                businessType: "beauty",
                ownerName: email.split('@')[0],
                email: email,
                phone: "+994 (50) 111-22-33",
                city: "Bakı",
                role: "owner",
                plan: "Pro (14 gün sınaq)",
                token: "biz_token_" + Date.now()
            };
        }

        localStorage.setItem('zeyvo_partner_user', JSON.stringify(partner));
        if (typeof App !== 'undefined') {
            App.partnerUser = partner;
            App.showToast(`Xoş gəldiniz, ${partner.ownerName}! Zeyvo Business kabinetinə daxil oldunuz`);
        }

        setTimeout(() => {
            const target = partner.startView === 'profile' ? '/business/profile' : (partner.startView && partner.startView !== 'calendar' ? '/business/' + partner.startView : '/business/biznes');
            window.location.hash = target;
        }, 400);
    },

    handleRegister: function(e) {
        if (e) e.preventDefault();
        this.clearError();

        const name = document.getElementById('bizRegName')?.value.trim();
        const phoneVal = document.getElementById('bizRegPhone')?.value.trim();
        const email = document.getElementById('bizRegEmail')?.value.trim();
        const pass = document.getElementById('bizRegPass')?.value.trim();
        const passConfirm = document.getElementById('bizRegPassConfirm')?.value.trim();
        const terms = document.getElementById('bizRegTerms')?.checked;

        if (!name || name.length < 2) {
            this.showError("Zəhmət olmasa ad və soyadınızı daxil edin.");
            return;
        }

        const phoneDigits = App.getCleanAzPhone(phoneVal);
        if (!phoneDigits || phoneDigits.length < 9) {
            this.showError("Zəhmət olmasa 9 rəqəmli mobil nömrənizi daxil edin.");
            return;
        }

        if (!email || !email.includes('@') || !email.includes('.')) {
            this.showError("Zəhmət olmasa düzgün e-poçt ünvanı daxil edin.");
            return;
        }

        if (!pass || pass.length < 6) {
            this.showError("Şifrə minimum 6 simvoldan ibarət olmalıdır.");
            return;
        }

        if (pass !== passConfirm) {
            this.showError("Daxil edilən şifrələr bir-biri ilə eyni deyil.");
            return;
        }

        if (!terms) {
            this.showError("Davam etmək üçün istifadəçi şərtləri ilə razılaşmalısınız.");
            return;
        }

        const newPartner = {
            id: 'biz_' + Date.now(),
            name: name,
            ownerName: name,
            businessName: name + " Studiyası",
            email: email,
            phone: `+994 ${App.formatDisplayAzPhone(phoneDigits)}`,
            role: "owner",
            plan: "Pro (14 gün sınaq)",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('zeyvo_partner_user', JSON.stringify(newPartner));
        if (typeof App !== 'undefined') {
            App.partnerUser = newPartner;
            App.showToast(`Xoş gəldiniz, ${name}! Qeydiyyat uğurla tamamlandı!`);
        }

        setTimeout(() => {
            const target = newPartner.startView === 'profile' ? '/business/profile' : (newPartner.startView && newPartner.startView !== 'calendar' ? '/business/' + newPartner.startView : '/business/biznes');
            window.location.hash = target;
        }, 400);
    },

    quickDemoLogin: function() {
        const demoEmail = "demo@zeyvobusiness.az";
        const emailInput = document.getElementById('bizLoginEmail');
        const passInput = document.getElementById('bizLoginPassword');
        if (emailInput) emailInput.value = demoEmail;
        if (passInput) passInput.value = "zeyvobiz2026";

        const existing = JSON.parse(localStorage.getItem('zeyvo_partner_user') || '{}');
        const demoPartner = {
            id: 'biz_demo_101',
            businessName: existing.businessName || "Baku Beauty Studio",
            businessType: existing.businessType || "beauty",
            ownerName: existing.ownerName || "Leyla Məmmədova",
            email: demoEmail,
            phone: existing.phone || "+994 (50) 234-56-78",
            city: existing.city || "Bakı",
            role: "owner",
            plan: "Pro Enterprise",
            avatar: existing.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            startBusiness: existing.startBusiness || "baku_beauty",
            startBranch: existing.startBranch || "center",
            startView: existing.startView && existing.startView !== 'calendar' ? existing.startView : "biznes",
            isDemo: true
        };

        localStorage.setItem('zeyvo_partner_user', JSON.stringify(demoPartner));
        if (typeof App !== 'undefined') {
            App.partnerUser = demoPartner;
            App.showToast("Demo salon girişi: «Baku Beauty Studio» kabinetinə daxil oldunuz!");
        }

        setTimeout(() => {
            const target = demoPartner.startView === 'profile' ? '/business/profile' : (demoPartner.startView && demoPartner.startView !== 'calendar' ? '/business/' + demoPartner.startView : '/business/biznes');
            window.location.hash = target;
        }, 400);
    },

    recoveryState: {
        step: 1,
        email: '',
        code: '',
        timer: null,
        timeLeft: 60
    },

    goToForgotStep: function(step) {
        this.recoveryState.step = step;
        this.clearError();

        const s1 = document.getElementById('bizForgotStep1');
        const s2 = document.getElementById('bizForgotStep2');
        const s3 = document.getElementById('bizForgotStep3');

        if (s1) s1.classList.toggle('hidden', step !== 1);
        if (s2) s2.classList.toggle('hidden', step !== 2);
        if (s3) s3.classList.toggle('hidden', step !== 3);

        if (step === 1) {
            const emailInput = document.getElementById('bizForgotEmail');
            if (emailInput) setTimeout(() => emailInput.focus(), 100);
        } else if (step === 2) {
            const display = document.getElementById('bizForgotTargetEmail');
            if (display) display.textContent = this.recoveryState.email;
            this.clearOtpBoxes();
            setTimeout(() => {
                const firstBox = document.querySelector('#bizOtpContainer .biz-otp-box');
                if (firstBox) firstBox.focus();
            }, 100);
        } else if (step === 3) {
            const newPass = document.getElementById('bizForgotNewPass');
            if (newPass) {
                newPass.value = '';
                setTimeout(() => newPass.focus(), 100);
            }
            const confirmPass = document.getElementById('bizForgotConfirmPass');
            if (confirmPass) confirmPass.value = '';
        }
    },

    sendRecoveryCode: function() {
        this.clearError();
        const emailInput = document.getElementById('bizForgotEmail');
        const email = emailInput?.value.trim();

        if (!email || !email.includes('@') || !email.includes('.')) {
            this.showError("Zəhmət olmasa düzgün iş e-poçt ünvanı daxil edin.");
            return;
        }

        this.recoveryState.email = email;
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        this.recoveryState.code = code;

        this.goToForgotStep(2);
        this.startForgotTimer();
        if (typeof App !== 'undefined') {
            App.showToast(`Təsdiq kodu ${email} ünvanına göndərildi: ${code}`);
        }
    },

    startForgotTimer: function() {
        if (this.recoveryState.timer) {
            clearInterval(this.recoveryState.timer);
            this.recoveryState.timer = null;
        }

        this.recoveryState.timeLeft = 60;
        const timerBox = document.getElementById('bizForgotTimerBox');
        const resendBtn = document.getElementById('bizForgotResendBtn');
        const countdownEl = document.getElementById('bizForgotCountdown');

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
        this.clearError();
        this.startForgotTimer();
        if (typeof App !== 'undefined') {
            App.showToast(`Yeni təsdiq kodu göndərildi: ${code}`);
        }
        const firstBox = document.querySelector('#bizOtpContainer .biz-otp-box');
        if (firstBox) firstBox.focus();
    },

    clearOtpBoxes: function() {
        document.querySelectorAll('#bizOtpContainer .biz-otp-box').forEach(box => {
            box.value = '';
        });
    },

    onOtpInput: function(el, index) {
        this.clearError();
        el.value = el.value.replace(/\D/g, '').slice(-1);
        if (el.value) {
            const boxes = document.querySelectorAll('#bizOtpContainer .biz-otp-box');
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
            const boxes = document.querySelectorAll('#bizOtpContainer .biz-otp-box');
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
        const boxes = document.querySelectorAll('#bizOtpContainer .biz-otp-box');
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

    autoFillCode: function() {
        const code = this.recoveryState.code || "123456";
        const boxes = document.querySelectorAll('#bizOtpContainer .biz-otp-box');
        for (let i = 0; i < boxes.length && i < code.length; i++) {
            boxes[i].value = code[i];
        }
        this.clearError();
        if (typeof App !== 'undefined') {
            App.showToast(`Kod daxil edildi: ${code}`);
        }
        setTimeout(() => this.verifyRecoveryCode(), 200);
    },

    verifyRecoveryCode: function() {
        this.clearError();
        let enteredCode = '';
        document.querySelectorAll('#bizOtpContainer .biz-otp-box').forEach(b => enteredCode += b.value.trim());

        if (enteredCode.length < 6) {
            this.showError("Zəhmət olmasa 6 rəqəmli təsdiq kodunu tam daxil edin.");
            return;
        }

        const validCode = this.recoveryState.code;
        if (enteredCode === validCode || enteredCode === "123456") {
            if (this.recoveryState.timer) {
                clearInterval(this.recoveryState.timer);
                this.recoveryState.timer = null;
            }
            this.goToForgotStep(3);
            if (typeof App !== 'undefined') {
                App.showToast("Kod təsdiqləndi! Yeni şifrə təyin edin");
            }
        } else {
            this.showError("Daxil edilmiş təsdiq kodu yanlışdır. Yenidən cəhd edin.");
        }
    },

    saveNewPassword: function() {
        this.clearError();
        const newPass = document.getElementById('bizForgotNewPass')?.value.trim();
        const confirmPass = document.getElementById('bizForgotConfirmPass')?.value.trim();

        if (!newPass || newPass.length < 6) {
            this.showError("Yeni şifrə ən azı 6 simvoldan ibarət olmalıdır.");
            return;
        }

        if (newPass !== confirmPass) {
            this.showError("Daxil edilən şifrələr bir-biri ilə eyni deyil.");
            return;
        }

        const email = this.recoveryState.email || "business@zeyvo.az";

        let partner = JSON.parse(localStorage.getItem('zeyvo_partner_user') || 'null');
        if (!partner) {
            partner = {
                id: 'biz_' + Date.now(),
                name: email.split('@')[0],
                ownerName: email.split('@')[0],
                businessName: "Yeni salon",
                email: email,
                phone: "+994 (50) 234-56-78",
                role: "owner",
                password: newPass
            };
        } else {
            partner.email = email;
            partner.password = newPass;
        }

        localStorage.setItem('zeyvo_partner_user', JSON.stringify(partner));
        if (typeof App !== 'undefined') {
            App.partnerUser = partner;
            App.showToast(`Şifrəniz uğurla yeniləndi! Xoş gəldiniz!`);
        }

        if (this.recoveryState.timer) {
            clearInterval(this.recoveryState.timer);
            this.recoveryState.timer = null;
        }

        this.switchMode('login');
    }
};

window.BusinessAuthView = BusinessAuthView;
