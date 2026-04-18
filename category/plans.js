(function () {

  /* ══ CPU Chip SVG generator ══════════════════════════════════════ */
  var BRAND_CFG = {
    intel:   { bg: '#0071C5', die: '#003f8a', pin: '#0071C5', label: 'intel\u00AE', sub1: 'XEON GOLD',  tc: '#90d4ff' },
    amd:     { bg: '#ED1C24', die: '#7f0000', pin: '#ED1C24', label: 'AMD',         sub1: 'Ryzen\u2122 9', tc: '#ffaaaa' },
    kvm:     { bg: '#1a2eb8', die: '#0a1560', pin: '#1a2eb8', label: 'intel\u00AE', sub1: 'XEON',        tc: '#adc8ff' },
    nvme:    { bg: '#7c3aed', die: '#3b0e8a', pin: '#7c3aed', label: 'AMD',         sub1: 'Ryzen\u2122 9', tc: '#ddd6fe' },
    storage: { bg: '#334155', die: '#1e293b', pin: '#475569', label: 'intel\u00AE', sub1: 'XEON',        tc: '#cbd5e1' },
    offer:   { bg: '#d97706', die: '#78350f', pin: '#d97706', label: 'OFFER',       sub1: 'LIMITED',     tc: '#fde68a' },
    web:     { bg: '#059669', die: '#065f46', pin: '#059669', label: 'WEB',         sub1: 'HOSTING',     tc: '#a7f3d0' },
    discord: { bg: '#5865F2', die: '#2d3a8c', pin: '#5865F2', label: 'BOT',         sub1: 'DISCORD',     tc: '#c7d2fe' }
  };

  function chipSVG(brand, model) {
    var c = BRAND_CFG[brand] || BRAND_CFG.intel;
    var p = c.pin;
    function pins() {
      return [
        /* top */    '<rect x="17" y="2"  width="4" height="8" rx="1" fill="'+p+'"/>',
                     '<rect x="27" y="2"  width="4" height="8" rx="1" fill="'+p+'"/>',
                     '<rect x="37" y="2"  width="4" height="8" rx="1" fill="'+p+'"/>',
                     '<rect x="47" y="2"  width="4" height="8" rx="1" fill="'+p+'"/>',
        /* bottom */ '<rect x="17" y="62" width="4" height="8" rx="1" fill="'+p+'"/>',
                     '<rect x="27" y="62" width="4" height="8" rx="1" fill="'+p+'"/>',
                     '<rect x="37" y="62" width="4" height="8" rx="1" fill="'+p+'"/>',
                     '<rect x="47" y="62" width="4" height="8" rx="1" fill="'+p+'"/>',
        /* left */   '<rect x="2"  y="17" width="8" height="4" rx="1" fill="'+p+'"/>',
                     '<rect x="2"  y="27" width="8" height="4" rx="1" fill="'+p+'"/>',
                     '<rect x="2"  y="37" width="8" height="4" rx="1" fill="'+p+'"/>',
                     '<rect x="2"  y="47" width="8" height="4" rx="1" fill="'+p+'"/>',
        /* right */  '<rect x="62" y="17" width="8" height="4" rx="1" fill="'+p+'"/>',
                     '<rect x="62" y="27" width="8" height="4" rx="1" fill="'+p+'"/>',
                     '<rect x="62" y="37" width="8" height="4" rx="1" fill="'+p+'"/>',
                     '<rect x="62" y="47" width="8" height="4" rx="1" fill="'+p+'"/>'
      ].join('');
    }
    var tc = c.tc;
    return '<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">'
      + pins()
      + '<rect x="10" y="10" width="52" height="52" rx="6" fill="'+c.bg+'"/>'
      + '<rect x="19" y="19" width="34" height="34" rx="3" fill="'+c.die+'"/>'
      /* circuit grid lines on die */
      + '<line x1="19" y1="25" x2="53" y2="25" stroke="'+tc+'" stroke-width="0.5" opacity="0.25"/>'
      + '<line x1="19" y1="31" x2="53" y2="31" stroke="'+tc+'" stroke-width="0.5" opacity="0.25"/>'
      + '<line x1="19" y1="42" x2="53" y2="42" stroke="'+tc+'" stroke-width="0.5" opacity="0.25"/>'
      + '<line x1="19" y1="47" x2="53" y2="47" stroke="'+tc+'" stroke-width="0.5" opacity="0.25"/>'
      + '<line x1="25" y1="19" x2="25" y2="53" stroke="'+tc+'" stroke-width="0.5" opacity="0.25"/>'
      + '<line x1="47" y1="19" x2="47" y2="53" stroke="'+tc+'" stroke-width="0.5" opacity="0.25"/>'
      /* heat spreader corner marks */
      + '<rect x="11" y="11" width="6" height="6" rx="1" fill="'+tc+'" opacity="0.18"/>'
      + '<rect x="55" y="11" width="6" height="6" rx="1" fill="'+tc+'" opacity="0.18"/>'
      + '<rect x="11" y="55" width="6" height="6" rx="1" fill="'+tc+'" opacity="0.18"/>'
      + '<rect x="55" y="55" width="6" height="6" rx="1" fill="'+tc+'" opacity="0.18"/>'
      /* brand label */
      + '<text x="36" y="33" font-family="Arial,sans-serif" font-size="7.5" font-weight="900" fill="white" text-anchor="middle">'+c.label+'</text>'
      + '<text x="36" y="42" font-family="Arial,sans-serif" font-size="4.8" fill="'+tc+'" text-anchor="middle" letter-spacing="0.3">'+c.sub1+'</text>'
      + '<text x="36" y="49" font-family="Arial,sans-serif" font-size="3.8" fill="'+tc+'" text-anchor="middle" opacity="0.9">'+model+'</text>'
      + '</svg>';
  }

  /* ── Mini chip for tabs (24×24 viewBox, same design) */
  function miniChipSVG(brand) {
    var c = BRAND_CFG[brand] || BRAND_CFG.intel;
    return '<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:22px;height:22px;border-radius:4px;">'
      + '<rect x="10" y="10" width="52" height="52" rx="6" fill="'+c.bg+'"/>'
      + '<rect x="20" y="20" width="32" height="32" rx="3" fill="'+c.die+'"/>'
      + '<text x="36" y="36" font-family="Arial,sans-serif" font-size="8" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle">'+c.label+'</text>'
      + '</svg>';
  }

  /* ══ Feature icon SVGs ══════════════════════════════════════════ */
  var ICONS = {
    cpu: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><rect x="4" y="4" width="12" height="12" rx="1.5" stroke="#0071C5" stroke-width="1.6"/><rect x="7" y="7" width="6" height="6" rx="0.8" stroke="#0071C5" stroke-width="1.2"/><line x1="1" y1="7" x2="4" y2="7" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="1" y1="10" x2="4" y2="10" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="1" y1="13" x2="4" y2="13" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="16" y1="7" x2="19" y2="7" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="16" y1="10" x2="19" y2="10" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="16" y1="13" x2="19" y2="13" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="7" y1="1" x2="7" y2="4" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="10" y1="1" x2="10" y2="4" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="13" y1="1" x2="13" y2="4" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="7" y1="16" x2="7" y2="19" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="10" y1="16" x2="10" y2="19" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/><line x1="13" y1="16" x2="13" y2="19" stroke="#0071C5" stroke-width="1.4" stroke-linecap="round"/></svg>',

    ram: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><rect x="1" y="7" width="18" height="7" rx="1.5" stroke="#7c3aed" stroke-width="1.5"/><rect x="4" y="9" width="2" height="3" rx="0.5" fill="#7c3aed"/><rect x="7.5" y="9" width="2" height="3" rx="0.5" fill="#7c3aed"/><rect x="11" y="9" width="2" height="3" rx="0.5" fill="#7c3aed"/><rect x="14.5" y="9" width="2" height="3" rx="0.5" fill="#7c3aed"/><line x1="5" y1="14" x2="5" y2="17" stroke="#7c3aed" stroke-width="1.2" stroke-linecap="round"/><line x1="8.5" y1="14" x2="8.5" y2="17" stroke="#7c3aed" stroke-width="1.2" stroke-linecap="round"/><line x1="12" y1="14" x2="12" y2="17" stroke="#7c3aed" stroke-width="1.2" stroke-linecap="round"/><line x1="15.5" y1="14" x2="15.5" y2="17" stroke="#7c3aed" stroke-width="1.2" stroke-linecap="round"/></svg>',

    ssd: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><rect x="2" y="5.5" width="16" height="9" rx="2" stroke="#475569" stroke-width="1.5"/><circle cx="14.5" cy="10" r="2" stroke="#475569" stroke-width="1.3"/><line x1="5" y1="8.5" x2="10.5" y2="8.5" stroke="#475569" stroke-width="1.2" stroke-linecap="round"/><line x1="5" y1="11.5" x2="9" y2="11.5" stroke="#475569" stroke-width="1.2" stroke-linecap="round"/><rect x="5" y="8" width="1" height="1" rx="0.3" fill="#475569" opacity="0.4"/></svg>',

    hdd: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><rect x="3" y="3.5" width="14" height="13" rx="2" stroke="#64748b" stroke-width="1.5"/><circle cx="10" cy="10" r="3.5" stroke="#64748b" stroke-width="1.3"/><circle cx="10" cy="10" r="1.2" fill="#64748b"/><circle cx="14.5" cy="6.5" r="0.8" fill="#64748b"/></svg>',

    vcpu: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="9" rx="1.5" stroke="#3959ff" stroke-width="1.5"/><line x1="7" y1="3" x2="7" y2="12" stroke="#3959ff" stroke-width="1" opacity="0.4"/><line x1="13" y1="3" x2="13" y2="12" stroke="#3959ff" stroke-width="1" opacity="0.4"/><line x1="3" y1="7.5" x2="17" y2="7.5" stroke="#3959ff" stroke-width="1" opacity="0.4"/><line x1="5" y1="15" x2="5" y2="17" stroke="#3959ff" stroke-width="1.4" stroke-linecap="round"/><line x1="10" y1="15" x2="10" y2="17" stroke="#3959ff" stroke-width="1.4" stroke-linecap="round"/><line x1="15" y1="15" x2="15" y2="17" stroke="#3959ff" stroke-width="1.4" stroke-linecap="round"/><line x1="5" y1="12" x2="5" y2="15" stroke="#3959ff" stroke-width="1" opacity="0.5"/><line x1="10" y1="12" x2="10" y2="15" stroke="#3959ff" stroke-width="1" opacity="0.5"/><line x1="15" y1="12" x2="15" y2="15" stroke="#3959ff" stroke-width="1" opacity="0.5"/></svg>',

    bandwidth: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.6 2 2 5.6 2 10s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" stroke="#0d9488" stroke-width="1.5"/><path d="M10 2c0 0-3 3.5-3 8s3 8 3 8" stroke="#0d9488" stroke-width="1.5"/><path d="M10 2c0 0 3 3.5 3 8s-3 8-3 8" stroke="#0d9488" stroke-width="1.5"/><line x1="2" y1="10" x2="18" y2="10" stroke="#0d9488" stroke-width="1.5"/></svg>',

    ip: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#059669" stroke-width="1.5"/><path d="M2 10h16M10 2v16M4.5 5.5C6 7 8 8 10 8s4-1 5.5-2.5M4.5 14.5C6 13 8 12 10 12s4 1 5.5 2.5" stroke="#059669" stroke-width="1.2" stroke-linecap="round"/></svg>',

    ddos: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><path d="M10 2.3L3.2 5.1v4.7c0 4.3 2.9 7.7 6.8 8.9 3.9-1.2 6.8-4.6 6.8-8.9V5.1L10 2.3z" stroke="#f59e0b" stroke-width="1.5" fill="none"/><path d="M7 10.2l1.9 2L13 8" stroke="#f59e0b" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',

    backup: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><path d="M15.5 13.5H5a4 4 0 010-8c.2-2.3 2.1-4 4.5-4 2.4 0 4.3 1.7 4.5 4 1.9.3 3 1.8 3 3.5 0 1-.4 1.9-1 2.5" stroke="#3959ff" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="11" x2="10" y2="18" stroke="#3959ff" stroke-width="1.5" stroke-linecap="round"/><polyline points="7,15 10,18 13,15" stroke="#3959ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',

    db: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><ellipse cx="10" cy="6" rx="7" ry="2.5" stroke="#7c3aed" stroke-width="1.4"/><path d="M3 6v4c0 1.4 3.1 2.5 7 2.5S17 11.4 17 10V6" stroke="#7c3aed" stroke-width="1.4"/><path d="M3 10v4c0 1.4 3.1 2.5 7 2.5S17 15.4 17 14v-4" stroke="#7c3aed" stroke-width="1.4"/></svg>',

    splits: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="5" rx="1.5" stroke="#1a9e5c" stroke-width="1.4"/><rect x="2" y="12" width="16" height="5" rx="1.5" stroke="#1a9e5c" stroke-width="1.4"/><circle cx="15" cy="5.5" r="1" fill="#1a9e5c"/><circle cx="15" cy="14.5" r="1" fill="#1a9e5c"/><line x1="5" y1="5.5" x2="11" y2="5.5" stroke="#1a9e5c" stroke-width="1.2" stroke-linecap="round"/><line x1="5" y1="14.5" x2="11" y2="14.5" stroke="#1a9e5c" stroke-width="1.2" stroke-linecap="round"/></svg>',

    support: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><path d="M4.5 12.5V9.2C4.5 6 7 3.5 10 3.5s5.5 2.5 5.5 5.7v3.3" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/><rect x="2.5" y="11" width="3" height="5" rx="1.5" stroke="#f59e0b" stroke-width="1.4"/><rect x="14.5" y="11" width="3" height="5" rx="1.5" stroke="#f59e0b" stroke-width="1.4"/><path d="M15.5 16C15.5 17.1 13.5 18 10 18" stroke="#f59e0b" stroke-width="1.4" stroke-linecap="round"/></svg>',

    check: '<svg class="xp-fi" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#dcfce7"/><path d="M6.5 10.5L9 13 13.5 7.5" stroke="#1a9e5c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ══ Inject chips into .xp-chip placeholders ══════════════════ */
  document.querySelectorAll('.xp-chip[data-brand]').forEach(function (el) {
    el.innerHTML = chipSVG(el.dataset.brand, el.dataset.model || '');
  });

  /* ══ Inject mini chips into .xp-tab-chip placeholders ══════════ */
  document.querySelectorAll('.xp-tab-chip[data-brand]').forEach(function (el) {
    el.innerHTML = miniChipSVG(el.dataset.brand);
  });

  /* ══ Inject feature icons ════════════════════════════════════════ */
  document.querySelectorAll('.xp-f[data-icon]').forEach(function (el) {
    var icon = ICONS[el.dataset.icon] || ICONS.check;
    el.insertAdjacentHTML('afterbegin', icon);
  });

  /* ══ Filter logic ════════════════════════════════════════════════ */
  var headings = {
    intel:   { title: 'Intel Minecraft Plans',       sub: 'Intel Xeon Gold 5412U · DDR5 ECC Memory · Enterprise NVMe Storage' },
    ryzen:   { title: 'Ryzen Minecraft Plans',        sub: 'AMD Ryzen 9 Series · High-Clock Gaming · NVMe Storage' },
    offer:   { title: 'Special Offer Plans',          sub: 'Limited-time discounts on top-tier Minecraft hardware' },
    kvm:     { title: 'KVM VPS Plans',               sub: 'Intel Xeon · KVM Virtualization · Full Root Access · SSD Storage' },
    nvme:    { title: 'Ryzen NVMe VPS Plans',        sub: 'AMD Ryzen · Gen4 NVMe · Ultra-Low Latency · Full Root Access' },
    storage: { title: 'Storage VPS Plans',           sub: 'High-Capacity Storage · RAID-Protected · Ideal for Backups & Media' }
  };

  var activeTab = (document.querySelector('.xp-tab.active') || {}).dataset && document.querySelector('.xp-tab.active').dataset.tab;
  var activeLoc = 'all';

  function render() {
    if (!activeTab) return;
    var visible = 0;
    document.querySelectorAll('.xp-card').forEach(function (c) {
      var t = c.dataset.plantype;
      var locs = c.dataset.locations ? c.dataset.locations.split(',') : [];
      var show = t === activeTab && (activeLoc === 'all' || locs.indexOf(activeLoc) !== -1);
      c.classList.toggle('hidden', !show);
      if (show) {
        visible++;
        c.classList.remove('xy-visible');
        window.requestAnimationFrame(function () {
          c.classList.add('xy-visible');
        });
      }
    });
    var empty = document.getElementById('xp-empty');
    if (empty) empty.classList.toggle('show', visible === 0);
    var h = headings[activeTab];
    if (h) {
      var t = document.getElementById('xp-title'); if (t) t.textContent = h.title;
      var s = document.getElementById('xp-sub');   if (s) s.textContent = h.sub;
    }
  }

  document.querySelectorAll('.xp-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.xp-tab').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeTab = btn.dataset.tab;
      activeLoc = 'all';
      document.querySelectorAll('.xp-loc').forEach(function (b) { b.classList.remove('active'); });
      var allBtn = document.querySelector('.xp-loc[data-loc="all"]');
      if (allBtn) allBtn.classList.add('active');
      render();
    });
  });

  document.querySelectorAll('.xp-loc').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.xp-loc').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeLoc = btn.dataset.loc;
      render();
    });
  });

  render();
})();
