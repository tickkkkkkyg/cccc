(function () {
  var loadingClass = 'xy-loading';
  var readyClass = 'xy-ready';
  var revealSelector = [
    '.section',
    '.section-hero',
    '.xyle-why-section',
    '.solutions',
    '.xp-card',
    '.sm-card',
    '.datacenter-card',
    '.blog-card',
    '.company-card'
  ].join(',');

  function createSkeleton() {
    if (document.querySelector('.xy-skeleton-loader')) return null;

    var loader = document.createElement('div');
    loader.className = 'xy-skeleton-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = [
      '<div class="xy-skeleton-wrap">',
      '<div class="xy-skeleton-nav"></div>',
      '<div class="xy-skeleton-hero">',
      '<span class="xy-skeleton-line xy-skeleton-title"></span>',
      '<span class="xy-skeleton-line xy-skeleton-text"></span>',
      '<span class="xy-skeleton-line xy-skeleton-text"></span>',
      '<span class="xy-skeleton-pill"></span>',
      '</div>',
      '<div class="xy-skeleton-grid">',
      '<div class="xy-skeleton-card"></div>',
      '<div class="xy-skeleton-card"></div>',
      '<div class="xy-skeleton-card"></div>',
      '</div>',
      '</div>'
    ].join('');
    document.body.prepend(loader);
    document.body.classList.add(loadingClass);
    return loader;
  }

  function hideSkeleton() {
    var loader = document.querySelector('.xy-skeleton-loader');
    document.body.classList.remove(loadingClass);
    document.body.classList.add(readyClass);
    if (!loader) return;
    loader.classList.add('xy-hide');
    window.setTimeout(function () {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    }, 360);
  }

  function optimizeImages() {
    document.querySelectorAll('img').forEach(function (img) {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
      if (!img.hasAttribute('fetchpriority')) img.setAttribute('fetchpriority', 'low');
    });

    var firstHeroImage = document.querySelector('.section-hero img, .hero img, img');
    if (firstHeroImage) {
      firstHeroImage.setAttribute('loading', 'eager');
      firstHeroImage.setAttribute('fetchpriority', 'high');
    }
  }

  function initScrollReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(revealSelector));
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('xy-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('xy-visible');
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.08
    });

    items.forEach(function (item, index) {
      item.classList.add('xy-reveal', 'xy-smooth-card');
      item.style.transitionDelay = Math.min(index % 6, 5) * 35 + 'ms';
      observer.observe(item);
    });
  }

  function initFastLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, { passive: false });
    });
  }

  window.XyleSkeleton = {
    show: createSkeleton,
    hide: hideSkeleton,
    wrap: function (promise) {
      createSkeleton();
      return Promise.resolve(promise).finally(hideSkeleton);
    },
    simulate: function (milliseconds) {
      createSkeleton();
      window.setTimeout(hideSkeleton, milliseconds || 700);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    createSkeleton();
    optimizeImages();
    initScrollReveal();
    initFastLinks();
    window.requestAnimationFrame(function () {
      window.setTimeout(hideSkeleton, 450);
    });
  });

  window.addEventListener('load', function () {
    window.setTimeout(hideSkeleton, 80);
  }, { once: true });
})();