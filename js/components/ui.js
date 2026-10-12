// Shared presentational components for the customer site and Business CRM.
// Event expressions are supplied only by application code, never by user data.
const ZeyvoUI = {
    escape(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, char => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[char]);
    },

    button({ label = '', variant = 'primary', size = 'md', onClick = '', type = 'button', id = '', fullWidth = false, icon = '', disabled = false, className = '' } = {}) {
        const validVariant = ['primary', 'secondary', 'danger', 'ghost'].includes(variant) ? variant : 'primary';
        const validSize = ['sm', 'md', 'lg'].includes(size) ? size : 'md';
        return `<button type="${this.escape(type)}" ${id ? `id="${this.escape(id)}"` : ''} ${onClick ? `onclick="${this.escape(onClick)}"` : ''} ${disabled ? 'disabled' : ''} class="z-ui-button z-ui-button--${validVariant} z-ui-button--${validSize} ${fullWidth ? 'z-ui-button--full' : ''} ${className}">${icon}${this.escape(label)}</button>`;
    },

    azFlagSvg() {
        return `<svg viewBox="0 0 36 24" aria-hidden="true" focusable="false"><path fill="#00B5E2" d="M0 0h36v8H0z"/><path fill="#EF3340" d="M0 8h36v8H0z"/><path fill="#509E2F" d="M0 16h36v8H0z"/><circle cx="17" cy="12" r="3.25" fill="#fff"/><circle cx="18" cy="12" r="2.7" fill="#EF3340"/><path fill="#fff" d="m22.8 10.35.38 1.05 1.1-.34-.62.96.9.67-1.13.04.02 1.12-.67-.9-.65.92.32-1.08-1.09-.3 1.08-.32-.34-1.07.67.9.65-.91-.02 1.12z"/></svg>`;
    },

    formatPhoneValue(value = '') {
        let digits = String(value).replace(/\D/g, '');
        if (digits.startsWith('994')) digits = digits.slice(3);
        digits = digits.slice(0, 9);
        if (!digits) return '';
        let formatted = `(${digits.slice(0, 2)}`;
        if (digits.length >= 2) formatted += ') ';
        if (digits.length > 2) formatted += digits.slice(2, 5);
        if (digits.length > 5) formatted += `-${digits.slice(5, 7)}`;
        if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`;
        return formatted;
    },

    phoneField({ id, label = 'Mobil nömrə', value = '', required = false, placeholder = '(50) 000-00-00', onInput = '', className = '', wrapperClassName = '' } = {}) {
        const safeId = this.escape(id || '');
        const inputHandler = `if(window.App&&App.formatAzPhone)App.formatAzPhone(this);${onInput || ''}`;
        return `<div class="z-ui-phone-field ${wrapperClassName}"><label for="${safeId}" class="z-ui-phone-label">${this.escape(label)}${required ? ' <span aria-hidden="true">*</span>' : ''}</label><div class="z-ui-phone-control"><span class="z-ui-phone-prefix"><span class="z-ui-phone-flag">${this.azFlagSvg()}</span><span>+994</span></span><input id="${safeId}" type="tel" inputmode="tel" autocomplete="tel" maxlength="15" placeholder="${this.escape(placeholder)}" value="${this.escape(this.formatPhoneValue(value))}" ${required ? 'required' : ''} oninput="${this.escape(inputHandler)}" class="z-ui-phone-input ${className}"></div></div>`;
    },

    textField({ id, label, type = 'text', placeholder = '', value = '', required = false, onInput = '', className = '', wrapperClassName = '' } = {}) {
        if (type === 'tel') return this.phoneField({ id, label, placeholder: placeholder === '+994 (50) 000-00-00' ? '(50) 000-00-00' : placeholder, value, required, onInput, className, wrapperClassName });
        const safeId = this.escape(id || '');
        return `<div class="z-ui-field ${wrapperClassName}"><label for="${safeId}" class="z-ui-field-label">${this.escape(label)}${required ? ' <span aria-hidden="true">*</span>' : ''}</label><input id="${safeId}" type="${this.escape(type)}" placeholder="${this.escape(placeholder)}" value="${this.escape(value)}" ${required ? 'required' : ''} ${onInput ? `oninput="${this.escape(onInput)}"` : ''} class="z-ui-field-input ${className}"></div>`;
    },

    closeButton({ onClick, title = 'Bağla', className = '' } = {}) {
        return `<button type="button" onclick="${this.escape(onClick || '')}" aria-label="${this.escape(title)}" title="${this.escape(title)}" class="z-ui-close ${className}"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>`;
    },

    modalHeader({ title = '', titleId = '', description = '', descriptionId = '', onClose = '', className = '' } = {}) {
        return `<div class="z-ui-modal-header ${className}"><div class="min-w-0"><h3 ${titleId ? `id="${this.escape(titleId)}"` : ''} class="z-ui-modal-title">${this.escape(title)}</h3>${description ? `<p ${descriptionId ? `id="${this.escape(descriptionId)}"` : ''} class="z-ui-modal-description">${this.escape(description)}</p>` : ''}</div>${this.closeButton({ onClick: onClose })}</div>`;
    },

    segmentedTabs({ tabs = [], activeId = '', onSelect = '', isLink = false, linkPrefix = '', className = '', fullWidth = false } = {}) {
        const content = tabs.map(tab => {
            const active = tab.id === activeId;
            const cls = `z-ui-segment ${active ? 'z-ui-segment--active' : ''}`;
            const icon = tab.iconSvg ? `<span class="z-ui-segment-icon">${tab.iconSvg}</span>` : '';
            const badge = tab.badge !== undefined && tab.badge !== null ? `<span class="z-ui-segment-badge">${this.escape(tab.badge)}</span>` : '';
            const label = `<span>${this.escape(tab.label)}</span>`;
            if (isLink) return `<a href="${this.escape(linkPrefix + tab.id)}" class="${cls}" ${active ? 'aria-current="page"' : ''}>${icon}${label}${badge}</a>`;
            return `<button type="button" onclick="${this.escape(`${onSelect}('${tab.id}')`)}" id="branchTabBtn_${this.escape(tab.id)}" data-tab-id="${this.escape(tab.id)}" class="${cls}" aria-pressed="${active}">${icon}${label}${badge}</button>`;
        }).join('');
        return `<div class="z-ui-segments-wrap ${fullWidth ? 'z-ui-segments-wrap--full' : ''}"><div class="z-ui-segments ${className}" role="group">${content}</div></div>`;
    },

    tablePagination({ totalItems = 0, currentPage = 1, pageSize = 10, onPageChange = '', onPageSizeChange = '', itemName = 'qeyd' } = {}) {
        if (totalItems <= 0) return '';
        const pages = Math.max(1, Math.ceil(totalItems / pageSize));
        const page = Math.min(Math.max(1, currentPage), pages);
        const from = (page - 1) * pageSize + 1;
        const to = Math.min(page * pageSize, totalItems);
        const numbers = pages <= 7 ? Array.from({ length: pages }, (_, i) => i + 1)
            : page <= 3 ? [1, 2, 3, 4, '…', pages]
            : page >= pages - 2 ? [1, '…', pages - 3, pages - 2, pages - 1, pages]
            : [1, '…', page - 1, page, page + 1, '…', pages];
        const go = (target, label, disabled = false, active = false) => `<button type="button" onclick="${this.escape(`${onPageChange}(${target})`)}" class="z-ui-page-button ${active ? 'z-ui-page-button--active' : ''}" ${disabled ? 'disabled' : ''} ${active ? 'aria-current="page"' : ''}>${label}</button>`;
        const sizes = [10, 25, 50, 100];
        if (!sizes.includes(pageSize)) sizes.unshift(pageSize);
        const sizeSelect = onPageSizeChange ? `<label class="z-ui-page-size-label">Səhifədə: <select class="z-ui-page-size" onchange="${this.escape(`${onPageSizeChange}(parseInt(this.value, 10))`)}">${sizes.map(size => `<option value="${size}" ${pageSize === size ? 'selected' : ''}>${size}</option>`).join('')}</select></label>` : '';
        return `<div class="z-ui-pagination"><div class="z-ui-pagination-info">Cəmi <strong>${totalItems}</strong> ${this.escape(itemName)}dan <strong>${from}-${to}</strong> göstərilir ${sizeSelect}</div><nav class="z-ui-pagination-nav" aria-label="Səhifələr">${go(page - 1, '‹ Əvvəlki', page === 1)}${numbers.map(n => n === '…' ? '<span class="z-ui-page-ellipsis">…</span>' : go(n, n, false, n === page)).join('')}${go(page + 1, 'Növbəti ›', page === pages)}</nav></div>`;
    },

    emptyState({ title = '', description = '', action = '' } = {}) {
        return `<div class="z-ui-empty"><h3>${this.escape(title)}</h3>${description ? `<p>${this.escape(description)}</p>` : ''}${action}</div>`;
    },

    filterButton({ onClick = '', count = 0, title = 'Filtrlər pəncərəsi' } = {}) {
        const active = Number(count) > 0;
        return `<button type="button" onclick="${this.escape(onClick)}" title="${this.escape(title)}" aria-label="Filtrlər${active ? `, ${count} aktiv` : ''}" class="z-ui-filter-button ${active ? 'z-ui-filter-button--active' : ''}"><svg class="z-ui-filter-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4h18l-7 8v6l-4 2v-8L3 4Z"/></svg><span class="z-ui-filter-button-label">Filtrlər</span>${active ? `<span class="z-ui-filter-count">${this.escape(count)}</span>` : ''}</button>`;
    },

    enhanceFilters(root = document) {
        const scope = root?.nodeType === 1 || root === document ? root : document;
        const buttons = [...(scope.matches?.('button') ? [scope] : []), ...scope.querySelectorAll('button')]
            .filter(button => /^(Filtr|Filtrlər)(\s|\d|$)/.test(button.textContent.trim()) || /Filtrlər pəncərəsi/.test(button.title || ''));

        buttons.forEach(button => {
            button.classList.add('z-ui-filter-button');
            button.setAttribute('aria-label', 'Filtrlər');
            if (!button.dataset.zFilterEnhanced) {
                const icon = button.querySelector('svg');
                if (icon) {
                    icon.setAttribute('viewBox', '0 0 24 24');
                    icon.setAttribute('fill', 'none');
                    icon.setAttribute('stroke', 'currentColor');
                    icon.setAttribute('stroke-width', '2');
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3 4h18l-7 8v6l-4 2v-8L3 4Z"/>';
                }
                button.dataset.zFilterEnhanced = 'true';
            }
            const textSpan = [...button.querySelectorAll('span')].find(span => /^(Filtr|Filtrlər)$/.test(span.textContent.trim()));
            if (textSpan) {
                if (textSpan.textContent.trim() !== 'Filtrlər') textSpan.textContent = 'Filtrlər';
                textSpan.classList.add('z-ui-filter-button-label');
            }
            const countSpan = [...button.querySelectorAll('span')].find(span => /^\d+$/.test(span.textContent.trim()) && !span.classList.contains('hidden') && Number(span.textContent.trim()) > 0);
            button.classList.toggle('z-ui-filter-button--active', Boolean(countSpan));
            if (countSpan) {
                countSpan.classList.add('z-ui-filter-count');
                button.setAttribute('aria-label', `Filtrlər, ${countSpan.textContent.trim()} aktiv`);
            }

            const toolbar = button.parentElement;
            const search = toolbar?.querySelector('input[type="text"], input[type="search"]');
            if (toolbar && search) {
                toolbar.classList.add('z-ui-filter-toolbar');
                search.classList.add('z-ui-filter-search');
            }
        });

        const labels = [...(scope.matches?.('span') ? [scope] : []), ...scope.querySelectorAll('span')]
            .filter(span => /^(Aktiv:|Aktiv filtrlər:)$/.test(span.textContent.trim()));
        labels.forEach(label => {
            const summary = label.parentElement;
            if (!summary) return;
            if (label.textContent.trim() !== 'Aktiv filtrlər:') label.textContent = 'Aktiv filtrlər:';
            label.classList.add('z-ui-filter-summary-label');
            summary.classList.add('z-ui-filter-summary');
            [...summary.children].forEach(child => {
                if (child === label) return;
                const text = child.textContent.trim();
                if (child.tagName === 'SPAN' && child.querySelector('button')) child.classList.add('z-ui-filter-chip');
                if (child.tagName === 'BUTTON' && /^(Hamısını|Filtrləri)/.test(text)) {
                    if (text !== 'Hamısını sıfırla') child.textContent = 'Hamısını sıfırla';
                    child.classList.add('z-ui-filter-reset');
                }
            });
        });
    },

    enhancePhoneFields(root = document) {
        const scope = root?.nodeType === 1 || root === document ? root : document;
        const inputs = [...(scope.matches?.('input[type="tel"], #bmNewClientPhone') ? [scope] : []), ...scope.querySelectorAll('input[type="tel"], #bmNewClientPhone')];
        inputs.forEach(input => {
            if (input.type === 'hidden') return;
            input.type = 'tel';
            input.inputMode = 'tel';
            input.autocomplete = 'tel';
            input.maxLength = 15;
            input.placeholder = '(50) 000-00-00';
            input.classList.add('z-ui-phone-input');

            let control = input.parentElement;
            let prefix = control ? [...control.children].find(child => child !== input && /\+994/.test(child.textContent || '')) : null;
            if (!prefix) {
                control = document.createElement('div');
                control.className = 'z-ui-phone-control';
                prefix = document.createElement('span');
                prefix.className = 'z-ui-phone-prefix';
                prefix.innerHTML = `<span class="z-ui-phone-flag">${this.azFlagSvg()}</span><span>+994</span>`;
                input.parentNode.insertBefore(control, input);
                control.append(prefix, input);
            } else {
                control.classList.add('z-ui-phone-control');
                prefix.classList.add('z-ui-phone-prefix');
                const flag = prefix.querySelector('svg')?.parentElement;
                if (flag) flag.classList.add('z-ui-phone-flag');
            }

            if (!input.dataset.zPhoneEnhanced) {
                input.addEventListener('input', () => {
                    if (window.App?.formatAzPhone) window.App.formatAzPhone(input);
                });
                input.dataset.zPhoneEnhanced = 'true';
            }
            if (input.value && window.App?.formatAzPhone) window.App.formatAzPhone(input);
        });
    },

    enhanceModals(root = document) {
        const modals = [...(root.matches?.('[id$="Modal"]') ? [root] : []), ...root.querySelectorAll('[id$="Modal"]')];
        modals.forEach(modal => {
            if (!modal.querySelector('button, input, select, textarea')) return;
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.classList.add('z-ui-modal');
            const heading = modal.querySelector('.z-ui-modal-title, h2, h3, h4');
            if (heading) {
                if (!heading.id) heading.id = `${modal.id}-title`;
                modal.setAttribute('aria-labelledby', heading.id);
                let header = heading.parentElement;
                for (let depth = 0; header && header !== modal && depth < 4; depth++, header = header.parentElement) {
                    const close = [...header.children].find(child => child.tagName === 'BUTTON' && /close/i.test(child.getAttribute('onclick') || ''));
                    if (!close) continue;
                    header.classList.add('z-ui-modal-header');
                    heading.classList.add('z-ui-modal-title');
                    const description = header.querySelector('p');
                    if (description) {
                        description.classList.add('z-ui-modal-description');
                        if (!description.id) description.id = `${modal.id}-description`;
                        modal.setAttribute('aria-describedby', description.id);
                    }
                    if (!close.getAttribute('aria-label')) close.setAttribute('aria-label', 'Bağla');
                    break;
                }
            }
            modal.querySelectorAll('input:not([type="hidden"]), select, textarea').forEach(control => {
                if (control.labels?.length || control.hasAttribute('aria-label') || control.hasAttribute('aria-labelledby')) return;
                if (control.type === 'file' && control.classList.contains('hidden')) return;
                let wrapper = control.parentElement;
                for (let depth = 0; wrapper && wrapper !== modal && depth < 4; depth++, wrapper = wrapper.parentElement) {
                    const peers = wrapper.querySelectorAll('input:not([type="hidden"]):not([type="file"]), select, textarea');
                    const labels = wrapper.querySelectorAll('label');
                    if (peers.length !== 1 || labels.length !== 1 || labels[0].querySelector('input, select, textarea')) continue;
                    if (!control.id) control.id = `${modal.id}-field-${[...modal.querySelectorAll('input, select, textarea')].indexOf(control)}`;
                    labels[0].htmlFor = control.id;
                    break;
                }
                if (control.labels?.length) return;
                if (control.classList.contains('otp-box')) {
                    control.setAttribute('aria-label', `Kod rəqəmi ${[...modal.querySelectorAll('.otp-box')].indexOf(control) + 1}`);
                } else if (/^sched_(open|close)_(mon|tue|wed|thu|fri|sat|sun)$/.test(control.id)) {
                    const [, mode, day] = control.id.match(/^sched_(open|close)_(mon|tue|wed|thu|fri|sat|sun)$/);
                    const days = { mon: 'Bazar ertəsi', tue: 'Çərşənbə axşamı', wed: 'Çərşənbə', thu: 'Cümə axşamı', fri: 'Cümə', sat: 'Şənbə', sun: 'Bazar' };
                    control.setAttribute('aria-label', `${days[day]} ${mode === 'open' ? 'açılış' : 'bağlanış'} vaxtı`);
                } else if (control.placeholder) {
                    control.setAttribute('aria-label', control.placeholder);
                }
            });
        });
    },

    observeModals() {
        if (this._modalObserver || typeof MutationObserver === 'undefined') return;
        this.enhanceModals(document);
        this.enhanceFilters(document);
        this.enhancePhoneFields(document);
        this._modalObserver = new MutationObserver(records => {
            records.forEach(record => record.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    this.enhanceModals(node.closest('[id$="Modal"]') || node);
                    this.enhanceFilters(node);
                    this.enhancePhoneFields(node);
                }
            }));
        });
        this._modalObserver.observe(document.body, { childList: true, subtree: true });
    }
};

window.ZeyvoUI = ZeyvoUI;
