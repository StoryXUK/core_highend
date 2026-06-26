const icons = {
  bookings: '<svg viewBox="0 0 24 24"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="m9 16 2 2 4-4"/></svg>',
  payments: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  memberships: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  clients: '<svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/></svg>',
  website: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>',
  vouchers: '<svg viewBox="0 0 24 24"><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Z"/><path d="M12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z"/></svg>'
};

const features = [
  { title: 'Bookings', icon: 'bookings', copy: 'Set your schedule, share what you offer and give people a clear route to book.' },
  { title: 'Payments', icon: 'payments', copy: 'Take payments online and in person, so buying from you feels as professional as training with you.' },
  { title: 'Memberships', icon: 'memberships', copy: 'Sell services, classes, packs and memberships that keep clients moving with you.' },
  { title: 'Clients', icon: 'clients', copy: 'Manage client records and messages in one place, so every relationship has room to grow.' },
  { title: 'Website', icon: 'website', copy: 'Get a website and booking URL that gives clients a place to find you, book you and back you.' },
  { title: 'Vouchers', icon: 'vouchers', copy: 'Sell gift vouchers and create more ways for new clients to discover your work.' }
];

const packages = [
  {
    id: 'client-app',
    title: 'Client App',
    kicker: 'Keep clients close.',
    icon: '▯',
    accent: '#9b5cff',
    copy: 'Put your business in their pocket. Make booking, returning and staying connected feel effortless.',
    bullets: ['Client booking app', 'Repeat bookings', 'Push-ready experience', 'Apple + Android route']
  },
  {
    id: 'marketing',
    title: 'Marketing',
    kicker: 'Keep your diary moving.',
    icon: '✉',
    accent: '#2488d4',
    copy: 'Create offers, send campaigns and bring clients back when the next opportunity lands.',
    bullets: ['Email campaigns', 'Customer segmentation', 'Promotional offers', 'Campaign reporting']
  },
  {
    id: 'reach',
    title: 'Reach',
    kicker: 'Reach more clients.',
    icon: '⌕',
    accent: '#34c987',
    copy: 'Put your business in front of people looking for what you do — beyond your own followers.',
    bullets: ['Lead capture', 'Referral tools', 'Discovery channels', 'Growth insights']
  },
  {
    id: 'video',
    title: 'Video',
    kicker: 'Earn beyond the room.',
    icon: '▷',
    accent: '#ff8a1f',
    copy: 'Go live. Sell on-demand. Turn your expertise into something people can buy again and again.',
    bullets: ['On-demand content', 'Live streaming', 'Digital memberships', 'Video library']
  },
  {
    id: 'content',
    title: 'Content',
    kicker: 'Keep clients switched on.',
    icon: '▤',
    accent: '#20c7b5',
    copy: 'Share plans, timetables and content that keeps your value high between sessions.',
    bullets: ['Timetables', 'Meal plans', 'Exercise plans', 'Screen advertising']
  }
];

const bundlePricing = {
  0: 0,
  1: 20,
  2: 30,
  3: 37.5,
  4: 40,
  5: 47.5
};

const baseCorePrice = 25;

const formatGBP = value => {
  const formatted = Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2);
  return `£${formatted}`;
};

function renderFeatureCards() {
  const grid = document.getElementById('featureGrid');
  if (!grid) return;
  grid.innerHTML = features.map(feature => `
    <article class="feature-card">
      ${icons[feature.icon]}
      <h3>${feature.title}</h3>
      <p>${feature.copy}</p>
    </article>
  `).join('');
}

function renderPackageCards() {
  const grid = document.getElementById('moduleGrid');
  if (!grid) return;

  grid.innerHTML = packages.map(item => `
    <article class="module-card" style="--module-accent:${item.accent}" data-module-card="${item.id}">
      <div class="module-top">
        <span class="module-icon">${item.icon}</span>
        <span class="module-price">£20 / month</span>
      </div>
      <span class="package-kicker">${item.kicker}</span>
      <h3>${item.title}</h3>
      <p>${item.copy}</p>
      <ul>
        ${item.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
      </ul>
      <label class="module-select">
        <input type="checkbox" value="${item.id}" data-module-input>
        <span></span>
        <b>Add package</b>
      </label>
    </article>
  `).join('');
}

function getSelectedPackageIds() {
  return Array.from(document.querySelectorAll('[data-module-input]:checked')).map(input => input.value);
}

function updateBundleBuilder() {
  const selectedIds = getSelectedPackageIds();
  const selectedPackages = packages.filter(item => selectedIds.includes(item.id));
  const count = selectedPackages.length;
  const packageTotal = bundlePricing[count] || 0;
  const monthlyTotal = baseCorePrice + packageTotal;
  const individualTotal = count * 20;
  const saving = Math.max(0, individualTotal - packageTotal);

  document.querySelectorAll('[data-module-card]').forEach(card => {
    card.classList.toggle('is-selected', selectedIds.includes(card.dataset.moduleCard));
  });

  const selectedCount = document.getElementById('selectedCount');
  const summaryList = document.getElementById('summaryList');
  const monthlyTotalEl = document.getElementById('monthlyTotal');
  const savingBadge = document.getElementById('savingBadge');

  if (selectedCount) selectedCount.textContent = String(count);
  if (monthlyTotalEl) monthlyTotalEl.textContent = formatGBP(monthlyTotal);

  if (summaryList) {
    if (!selectedPackages.length) {
      summaryList.innerHTML = `<p class="empty-summary">CORE only. Add packages whenever you need more power.</p>`;
    } else {
      const perPackage = packageTotal / count;
      summaryList.innerHTML = selectedPackages.map(item => `
        <div class="summary-item">
          <span><i style="background:${item.accent}"></i>${item.title}</span>
          <strong>${formatGBP(perPackage)}</strong>
        </div>
      `).join('');
    }
  }

  if (savingBadge) {
    savingBadge.classList.toggle('has-saving', saving > 0);
    savingBadge.innerHTML = `<span>You save</span><strong>${formatGBP(saving)}</strong><small>/ month</small>`;
  }
}

function bindBundleBuilder() {
  document.querySelectorAll('[data-module-input]').forEach(input => {
    input.addEventListener('change', updateBundleBuilder);
  });

  document.querySelectorAll('[data-bundle-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.bundleAction;
      document.querySelectorAll('[data-module-input]').forEach(input => {
        input.checked = action === 'all';
      });
      updateBundleBuilder();
    });
  });

  updateBundleBuilder();
}

function bindMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
  });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  items.forEach(item => observer.observe(item));
}

function bindMagneticButtons() {
  document.querySelectorAll('.btn, .header-cta, .package-card, .feature-card').forEach(el => {
    el.addEventListener('pointermove', event => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

function initBrushScriptGlitch() {
  const brushScript = document.querySelector('.brush-script');
  if (!brushScript) return;

  const originalText = brushScript.textContent;
  const offerText = 'Only £25.';
  brushScript.dataset.text = originalText;

  window.setTimeout(() => {
    brushScript.textContent = offerText;
    brushScript.dataset.text = offerText;
    brushScript.classList.add('is-glitching', 'is-offer');

    window.setTimeout(() => {
      brushScript.classList.remove('is-glitching', 'is-offer');
      brushScript.textContent = originalText;
      brushScript.dataset.text = originalText;
    }, 1000);
  }, 1500);
}

function initPage() {
  renderFeatureCards();
  renderPackageCards();
  bindBundleBuilder();
  bindMobileNav();
  initReveal();
  bindMagneticButtons();
  initBrushScriptGlitch();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
