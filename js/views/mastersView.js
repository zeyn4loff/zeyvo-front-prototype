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
                    ${ZeyvoData.masters.map(m => MarketplaceUI.masterCard(m, 'directory')).join('')}
                </div>
            </div>
        `;
    },
    afterRender: function() {}
};
