// ========================================================
// CLIENT-SIDE HASH ROUTER (MOBILE FIRST ROUTING)
// ========================================================
const Router = {
    routes: {
        '/': HomeView,
        '/catalog': SalonsView,
        '/catalog/:category': SalonsView,
        '/catalog/:category/:subcategory': SalonsView,
        '/salons': SalonsView,
        '/salons/:category': SalonsView,
        '/salons/:category/:subcategory': SalonsView,
        '/masters': MastersView,
        '/master/:id': MasterDetailView,
        '/business': BusinessDashboardView,
        '/business/auth': BusinessAuthView,
        '/business/biznes': BusinessDashboardView,
        '/business/resources': BusinessDashboardView,
        '/business/resurslar': BusinessDashboardView,
        '/business/products': BusinessDashboardView,
        '/business/products/:tab': BusinessDashboardView,
        '/business/mehsullar': BusinessDashboardView,
        '/business/mehsullar/:tab': BusinessDashboardView,
        '/business/calendar': BusinessDashboardView,
        '/business/services': BusinessDashboardView,
        '/business/xidmetler': BusinessDashboardView,
        '/business/clients': BusinessDashboardView,
        '/business/clients/:tab': BusinessDashboardView,
        '/business/musteriler': BusinessDashboardView,
        '/business/musteriler/:tab': BusinessDashboardView,
        '/business/staff': BusinessDashboardView,
        '/business/staff/:tab': BusinessDashboardView,
        '/business/ustalar': BusinessDashboardView,
        '/business/ustalar/:tab': BusinessDashboardView,
        '/business/loyalty': BusinessDashboardView,
        '/business/loyalty/:tab': BusinessDashboardView,
        '/business/loyalliq': BusinessDashboardView,
        '/business/loyalliq/:tab': BusinessDashboardView,
        '/business/marketing': BusinessDashboardView,
        '/business/marketing/:tab': BusinessDashboardView,
        '/business/marketinq': BusinessDashboardView,
        '/business/marketinq/:tab': BusinessDashboardView,
        '/business/integrations': BusinessDashboardView,
        '/business/integrations/:id': BusinessDashboardView,
        '/business/inteqrasiyalar': BusinessDashboardView,
        '/business/inteqrasiyalar/:id': BusinessDashboardView,
        '/business/finance': BusinessDashboardView,
        '/business/finance/:tab': BusinessDashboardView,
        '/business/maliyye': BusinessDashboardView,
        '/business/maliyye/:tab': BusinessDashboardView,
        '/business/profile': BusinessDashboardView,
        '/business/profile/:tab': BusinessDashboardView,
        '/business/settings': BusinessDashboardView,
        '/business/settings/:tab': BusinessDashboardView,
        '/salon/:id': SalonDetailView
    },

    init: function() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
        this.handleRoute();
    },

    getCurrentRoute: function() {
        let hash = window.location.hash.slice(1) || '/';
        if (!hash.startsWith('/')) hash = '/' + hash;
        return hash;
    },

    navigate: function(path) {
        window.location.hash = path;
    },

    handleRoute: function() {
        let hash = window.location.hash.slice(1) || '/';
        if (!hash.startsWith('/')) hash = '/' + hash;

        if (hash === '/profile') {
            setTimeout(() => {
                if (typeof App !== 'undefined' && App.handleProfileClick) {
                    App.handleProfileClick();
                }
            }, 50);
            hash = '/';
        }

        const cleanPath = hash.split('?')[0].replace(/\/+$/, '') || '/';

        // Auto-redirect logged-in partners to their selected startView
        if (cleanPath === '/business' || cleanPath === '/business/auth') {
            if (localStorage.getItem('zeyvo_partner_user')) {
                try {
                    const partner = JSON.parse(localStorage.getItem('zeyvo_partner_user') || '{}');
                    const target = partner.startView === 'profile' ? '/business/profile' : (partner.startView && partner.startView !== 'calendar' ? '/business/' + partner.startView : '/business/biznes');
                    window.location.hash = target;
                } catch (e) {
                    window.location.hash = '/business/biznes';
                }
                return;
            } else if (cleanPath === '/business') {
                window.location.hash = '/business/auth';
                return;
            }
        }

        // Control Hero Search Bar Visibility immediately: ONLY show on home page ('/')
        const heroSection = document.getElementById('hero-banner');
        if (heroSection) {
            if (cleanPath === '/' || cleanPath === '') {
                heroSection.classList.remove('hidden');
            } else {
                heroSection.classList.add('hidden');
            }
        }

        // Control Dedicated SaaS Mode for Business CRM
        const isBusinessRoute = cleanPath.startsWith('/business');
        const isDetailPage = cleanPath.startsWith('/salon/') || cleanPath.startsWith('/master/');
        const mainHeader = document.getElementById('mainHeader');
        const mainFooter = document.getElementById('mainFooter');
        const mainContainer = document.getElementById('mainContainer');
        const mobileBottomNav = document.getElementById('mobileBottomNav');

        if (isBusinessRoute) {
            if (mainHeader) mainHeader.classList.add('hidden');
            if (mainFooter) mainFooter.classList.add('hidden');
            if (mobileBottomNav) mobileBottomNav.classList.add('hidden');
            if (mainContainer) {
                mainContainer.className = "w-full p-0 m-0";
            }
            document.body.classList.remove('pb-24', 'bg-[#FFDD2D]', 'bg-[#F4F5F7]');
            document.body.classList.add('bg-[#101114]');
        } else {
            document.body.classList.remove('bg-[#101114]', 'bg-[#FFDD2D]', 'bg-[#F4F5F7]');
            document.body.classList.add('pb-24');
            if (mainHeader) mainHeader.classList.remove('hidden');
            if (mainFooter) mainFooter.classList.remove('hidden');
            if (mainContainer) {
                mainContainer.className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6";
            }
            if (mobileBottomNav) {
                if (isDetailPage) {
                    mobileBottomNav.classList.add('hidden');
                } else {
                    mobileBottomNav.classList.remove('hidden');
                }
            }
        }

        const routeResult = this.matchRoute(cleanPath) || this.matchRoute(hash);
        const appContainer = document.getElementById('app-view');

        if (!routeResult) {
            if (cleanPath.startsWith('/business') && cleanPath !== '/business/auth' && typeof BusinessDashboardView !== 'undefined') {
                try {
                    appContainer.innerHTML = BusinessDashboardView.render({});
                    if (BusinessDashboardView.afterRender) {
                        BusinessDashboardView.afterRender({});
                    }
                    this.updateNavHighlight(cleanPath);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                } catch (e) {
                    console.error("Fallback render error:", e);
                }
            }

            appContainer.innerHTML = `
                <div class="text-center py-16 bg-white rounded-3xl border border-tbank-border">
                    <h2 class="text-xl sm:text-2xl font-black text-tbank-graphite">404 - Səhifə tapılmadı</h2>
                    <p class="text-xs text-slate-500 mt-2">Axtardığınız səhifə mövcud deyil</p>
                    <a href="#/" class="inline-block mt-4 px-5 py-2.5 rounded-xl bg-tbank-graphite text-white font-bold text-xs">Əsas səhifəyə qayıt</a>
                </div>
            `;
            return;
        }

        const { view, params } = routeResult;
        
        try {
            // Render View
            appContainer.innerHTML = view.render(params);
            if (view.afterRender) {
                view.afterRender(params);
            }
        } catch (err) {
            console.error("Router view render error:", err);
        }

        // Highlight Desktop & Mobile Nav
        this.updateNavHighlight(cleanPath);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    matchRoute: function(hash) {
        let cleanHash = hash || '/';
        let queryParams = {};
        if (cleanHash.includes('?')) {
            const parts = cleanHash.split('?');
            cleanHash = parts[0];
            const searchParams = new URLSearchParams(parts[1]);
            for (const [k, v] of searchParams.entries()) {
                queryParams[k] = v;
            }
        }

        cleanHash = cleanHash.replace(/\/+$/, '') || '/';

        for (const pattern in this.routes) {
            const patternParts = pattern.split('/');
            const hashParts = cleanHash.split('/');

            if (patternParts.length !== hashParts.length) continue;

            let matches = true;
            let params = { ...queryParams };

            for (let i = 0; i < patternParts.length; i++) {
                if (patternParts[i].startsWith(':')) {
                    const paramName = patternParts[i].slice(1);
                    params[paramName] = hashParts[i];
                } else if (patternParts[i] !== hashParts[i]) {
                    matches = false;
                    break;
                }
            }

            if (matches) {
                return { view: this.routes[pattern], params };
            }
        }

        // Dedicated fallback for any /business sub-routes
        if (cleanHash.startsWith('/business') && cleanHash !== '/business/auth' && typeof BusinessDashboardView !== 'undefined') {
            return { view: BusinessDashboardView, params: queryParams };
        }

        return null;
    },

    updateNavHighlight: function(hash) {
        // Desktop nav highlight
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === '#' + hash || (hash === '/' && linkHref === '#/')) {
                link.classList.add('bg-black/[0.08]');
            } else {
                link.classList.remove('bg-black/[0.08]');
            }
        });

        // Mobile bottom dock highlight
        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            const route = btn.getAttribute('data-route');
            const isActive = (route === hash || (hash === '/' && route === '/')) ||
                             (route === '/salons' && (hash.startsWith('/catalog') || hash.startsWith('/salons'))) ||
                             (route === '/masters' && hash === '/masters');
            if (isActive) {
                btn.className = "mobile-nav-btn flex flex-col items-center gap-1 text-[10px] font-black text-tbank-graphite";
            } else {
                btn.className = "mobile-nav-btn flex flex-col items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-tbank-graphite";
            }
        });
    }
};
