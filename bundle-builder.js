/* ==========================================================
   CORE Bundle Builder JS
   Include this file after the HTML for the bundle section.
   ========================================================== */

(function () {
  const baseCorePrice = 25;
  const bundlePricing = { 0: 0, 1: 20, 2: 30, 3: 37.5, 4: 40, 5: 47.5 };

  const packageData = [
    {
      id: 'client-app',
      title: 'Client App',
      kicker: 'Keep clients close',
      priceLabel: 'from £20',
      accent: '#9b5cff',
      icon: '<svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2M10 5h4"/></svg>',
      copy: 'Your business in every client\'s pocket. Make booking, returning and staying connected feel effortless.',
      bullets: ['Client booking app', 'Apple + Android route', 'Push-ready experience', 'Repeat booking flow']
    },
    {
      id: 'marketing',
      title: 'Marketing',
      kicker: 'Keep your diary moving',
      priceLabel: 'from £20',
      accent: '#2488d4',
      icon: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
      copy: 'Create offers, send campaigns and bring clients back when the next opportunity lands.',
      bullets: ['Email campaigns', 'Customer segmentation', 'Promotional offers', 'Campaign reporting']
    },
    {
      id: 'reach',
      title: 'Reach',
      kicker: 'Reach more clients',
      priceLabel: 'from £20',
      accent: '#34c987',
      icon: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/><path d="M11 8v6M8 11h6"/></svg>',
      copy: 'Show up beyond your own followers, with discovery, referrals and lead capture built around your business.',
      bullets: ['Lead capture', 'Referral tools', 'Discovery channels', 'Growth insights']
    },
    {
      id: 'video',
      title: 'Video',
      kicker: 'Earn beyond the room',
      priceLabel: 'from £20',
      accent: '#ff8a1f',
      icon: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3Z"/></svg>',
      copy: 'Go live. Sell on-demand. Turn your expertise into something people can buy again and again.',
      bullets: ['On-demand content', 'Live streaming', 'Online classes', 'Video library']
    },
    {
      id: 'content',
      title: 'Content',
      kicker: 'Keep clients switched on',
      priceLabel: 'from £20',
      accent: '#20c7b5',
      icon: '<svg viewBox="0 0 24 24"><path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
      copy: 'Share plans, timetables and content that keeps your value high between sessions.',
      bullets: ['Timetables', 'Meal plans', 'Exercise plans', 'Screen advertising']
    }
  ];

  const formatGBP = (value) => {
    const number = Number(value);
    return `£${Number.isInteger(number) ? number.toFixed(0) : number.toFixed(2)}`;
  };

  const getPackageTotal = (count) => bundlePricing[count] || 0;

  function animateNumber(el, nextValue) {
    if (!el) return;
    const previous = Number(el.dataset.value || '25');
    const start = performance.now();
    const duration = 420;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = previous + (nextValue - previous) * eased;
      el.textContent = formatGBP(Math.round(current * 100) / 100);
      if (progress < 1) requestAnimationFrame(tick);
      else {
        el.textContent = formatGBP(nextValue);
        el.dataset.value = String(nextValue);
      }
    }

    requestAnimationFrame(tick);
  }

  function renderPackageCards() {
    const grid = document.getElementById('moduleGrid');
    if (!grid) return;

    grid.innerHTML = packageData.map((item) => `
      <article class="module-card" style="--module-accent:${item.accent}" data-module-card="${item.id}" tabindex="0" role="button" aria-pressed="false">
        <div class="module-top">
          <span class="module-icon" aria-hidden="true">${item.icon}</span>
          <span class="module-price">${item.priceLabel}</span>
        </div>
        <span class="package-kicker">${item.kicker}</span>
        <h3>${item.title}</h3>
        <p>${item.copy}</p>
        <ul>${item.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}</ul>
        <label class="module-select" onclick="event.stopPropagation()">
          <input type="checkbox" value="${item.id}" data-module-input aria-label="Add ${item.title} to CORE">
          <span aria-hidden="true"></span>
          <b>Add to CORE</b>
        </label>
      </article>
    `).join('');
  }

  function getSelectedIds() {
    return Array.from(document.querySelectorAll('[data-module-input]:checked')).map((input) => input.value);
  }

  function setSelectedIds(ids) {
    document.querySelectorAll('[data-module-input]').forEach((input) => {
      input.checked = ids.includes(input.value);
    });
    updateBundleBuilder();
  }

  function updateBundleBuilder() {
    const selectedIds = getSelectedIds();
    const selectedPackages = packageData.filter((item) => selectedIds.includes(item.id));
    const count = selectedPackages.length;
    const packageTotal = getPackageTotal(count);
    const monthlyTotal = baseCorePrice + packageTotal;
    const individualTotal = count * 20;
    const saving = Math.max(0, individualTotal - packageTotal);
    const perPackage = count ? packageTotal / count : 0;
    const meterPercent = Math.round((count / packageData.length) * 100);

    document.querySelectorAll('[data-module-card]').forEach((card) => {
      const selected = selectedIds.includes(card.dataset.moduleCard);
      card.classList.toggle('is-selected', selected);
      card.setAttribute('aria-pressed', String(selected));
      const label = card.querySelector('.module-select b');
      if (label) label.textContent = selected ? 'Added to CORE' : 'Add to CORE';
    });

    document.querySelectorAll('[data-ladder-count]').forEach((row) => {
      row.classList.toggle('is-active', Number(row.dataset.ladderCount) === count);
    });

    const selectedCount = document.getElementById('selectedCount');
    const summaryList = document.getElementById('summaryList');
    const summarySubline = document.getElementById('summarySubline');
    const monthlyTotalEl = document.getElementById('monthlyTotal');
    const savingBadge = document.getElementById('savingBadge');
    const meterFill = document.getElementById('meterFill');
    const meterLabel = document.getElementById('meterLabel');
    const meterPercentEl = document.getElementById('meterPercent');
    const meterHelp = document.getElementById('meterHelp');

    if (selectedCount) selectedCount.textContent = String(count);
    animateNumber(monthlyTotalEl, monthlyTotal);

    if (summarySubline) {
      summarySubline.textContent = count
        ? `${count} package${count === 1 ? '' : 's'} added. Bundle rate applied.`
        : 'CORE only. Add packages when you are ready.';
    }

    if (summaryList) {
      if (!selectedPackages.length) {
        summaryList.innerHTML = '<p class="empty-summary">CORE only. Bookings, payments, CRM, website, messages, vouchers and subscriptions are already included.</p>';
      } else {
        summaryList.innerHTML = selectedPackages.map((item, index) => `
          <div class="summary-item" style="animation-delay:${index * 35}ms">
            <span><i style="background:${item.accent}; color:${item.accent}"></i>${item.title}</span>
            <strong>${formatGBP(perPackage)}</strong>
          </div>
        `).join('');
      }
    }

    if (savingBadge) {
      savingBadge.classList.toggle('has-saving', saving > 0);
      savingBadge.innerHTML = `
        <span>${saving > 0 ? 'Bundle advantage' : 'Bundle advantage'}</span>
        <strong>${formatGBP(saving)}</strong>
        <small>/ month</small>
      `;
    }

    if (meterFill) meterFill.style.width = `${meterPercent}%`;
    if (meterPercentEl) meterPercentEl.textContent = `${meterPercent}%`;
    if (meterLabel) {
      meterLabel.textContent = count === 0 ? 'CORE only' : count === 5 ? 'Complete CORE setup' : `${count}/5 packages active`;
    }
    if (meterHelp) {
      meterHelp.textContent = count < 2
        ? 'Add more packages to improve the bundle value.'
        : count === 5
          ? 'All five packages selected. Best bundle value active.'
          : 'Bundle pricing is active and your setup is growing.';
    }
  }

  function bindInteractions() {
    document.querySelectorAll('[data-module-input]').forEach((input) => {
      input.addEventListener('change', updateBundleBuilder);
    });

    document.querySelectorAll('[data-module-card]').forEach((card) => {
      card.addEventListener('click', () => {
        const input = card.querySelector('[data-module-input]');
        if (!input) return;
        input.checked = !input.checked;
        updateBundleBuilder();
      });

      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        card.click();
      });

      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    });

    document.querySelectorAll('[data-bundle-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.bundleAction;
        setSelectedIds(action === 'all' ? packageData.map((item) => item.id) : []);
      });
    });
  }

  function initBundleBuilder() {
    if (!document.getElementById('moduleGrid')) return;
    renderPackageCards();
    bindInteractions();
    updateBundleBuilder();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBundleBuilder);
  } else {
    initBundleBuilder();
  }
})();
