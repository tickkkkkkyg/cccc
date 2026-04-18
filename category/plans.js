(function () {
  var tab = document.querySelector('.xp-tab.active')
    ? document.querySelector('.xp-tab.active').dataset.tab
    : document.querySelector('.xp-tab') ? document.querySelector('.xp-tab').dataset.tab : null;
  var loc = 'all';

  var headings = {
    intel:   { title: 'Intel Minecraft Plans',       sub: 'Intel Xeon Gold 5412U · DDR5 ECC Memory · Enterprise NVMe Storage' },
    ryzen:   { title: 'Ryzen Minecraft Plans',        sub: 'AMD Ryzen 9 Series · High-Clock Gaming Performance · NVMe Storage' },
    offer:   { title: 'Special Offer Plans',          sub: 'Limited-time discounts on top-tier Minecraft hardware' },
    kvm:     { title: 'KVM VPS Plans',               sub: 'Intel Xeon · KVM Virtualization · Full Root Access · SSD Storage' },
    nvme:    { title: 'Ryzen NVMe VPS Plans',        sub: 'AMD Ryzen · Gen4 NVMe · Ultra-Low Latency · Full Root Access' },
    storage: { title: 'Storage VPS Plans',           sub: 'High-Capacity Bulk Storage · RAID-Protected · Ideal for Backups & Media' }
  };

  function render() {
    if (!tab) return;
    var cards = document.querySelectorAll('.xp-card');
    var visible = 0;
    cards.forEach(function (c) {
      var t = c.dataset.plantype;
      var locs = c.dataset.locations ? c.dataset.locations.split(',') : [];
      var show = t === tab && (loc === 'all' || locs.indexOf(loc) !== -1);
      c.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    var empty = document.getElementById('xp-empty');
    if (empty) empty.classList.toggle('show', visible === 0);
    var titleEl = document.getElementById('xp-title');
    var subEl   = document.getElementById('xp-sub');
    if (headings[tab]) {
      if (titleEl) titleEl.textContent = headings[tab].title;
      if (subEl)   subEl.textContent   = headings[tab].sub;
    }
  }

  document.querySelectorAll('.xp-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.xp-tab').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      tab = btn.dataset.tab;
      loc = 'all';
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
      loc = btn.dataset.loc;
      render();
    });
  });

  render();
})();
