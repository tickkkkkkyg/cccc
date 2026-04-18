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
  var motion = {
    scrollTo: null
  };

  function createSkeleton() {
    if (document.querySelector('.xy-skeleton-loader')) return null;

    var loader = document.createElement('div');
    loader.className = 'xy-skeleton-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = [
      '<div class="xy-skeleton-wrap">',
      '<div class="xy-loader-brand">',
      '<div class="xy-loader-logo"><span></span></div>',
      '<div class="xy-loader-copy">',
      '<strong>Loading XyleHosting</strong>',
      '<em>Preparing a smooth experience</em>',
      '</div>',
      '</div>',
      '<div class="xy-loader-progress"><span></span></div>',
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
      img.classList.add('xy-img');
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('xy-img-ready');
      } else {
        img.addEventListener('load', function () {
          img.classList.add('xy-img-ready');
        }, { once: true });
      }
    });

    var firstHeroImage = document.querySelector('.section-hero img, .hero img, img');
    if (firstHeroImage) {
      firstHeroImage.setAttribute('loading', 'eager');
      firstHeroImage.setAttribute('fetchpriority', 'high');
    }
  }

  function initSmartPrefetch() {
    var prefetched = {};
    if (navigator.connection && navigator.connection.saveData) return;

    function normalizeHref(link) {
      try {
        var url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) return null;
        if (url.hash && url.pathname === window.location.pathname) return null;
        if (!/\/$|\.html$/.test(url.pathname)) return null;
        return url.pathname + url.search;
      } catch (error) {
        return null;
      }
    }

    function prefetch(link) {
      var href = normalizeHref(link);
      if (!href || prefetched[href]) return;
      prefetched[href] = true;
      var tag = document.createElement('link');
      tag.rel = 'prefetch';
      tag.href = href;
      tag.as = 'document';
      document.head.appendChild(tag);
    }

    document.querySelectorAll('a[href]').forEach(function (link) {
      link.addEventListener('mouseenter', function () { prefetch(link); }, { once: true, passive: true });
      link.addEventListener('touchstart', function () { prefetch(link); }, { once: true, passive: true });
    });
  }

  function initScrollReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(revealSelector));
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('xy-visible'); });
      return;
    }

    var pending = [];
    var ticking = false;

    function flushVisible() {
      ticking = false;
      pending.splice(0).forEach(function (item) {
        item.classList.add('xy-visible');
        item.style.transitionDelay = '';
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        pending.push(entry.target);
        observer.unobserve(entry.target);
      });
      if (!ticking && pending.length) {
        ticking = true;
        window.requestAnimationFrame(flushVisible);
      }
    }, {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.06
    });

    items.forEach(function (item, index) {
      item.classList.add('xy-reveal', 'xy-smooth-card');
      item.style.setProperty('--xy-delay', Math.min(index % 5, 4) * 28 + 'ms');
      observer.observe(item);
    });
  }

  function initFastLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset;
        if (motion.scrollTo) {
          motion.scrollTo(top);
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, { passive: false });
    });
  }

  function initSilkyScroll() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse || !('requestAnimationFrame' in window)) return;

    var current = window.pageYOffset || document.documentElement.scrollTop || 0;
    var target = current;
    var frame = null;
    var ease = 0.16;

    function maxScroll() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function clamp(value) {
      return Math.max(0, Math.min(maxScroll(), value));
    }

    function animate() {
      var distance = target - current;
      var dynamicEase = Math.min(0.24, ease + Math.abs(distance) / 8500);
      current += distance * dynamicEase;
      if (Math.abs(distance) < 0.3) {
        current = target;
        window.scrollTo(0, current);
        frame = null;
        document.body.classList.remove('xy-scrolling');
        return;
      }
      window.scrollTo(0, current);
      frame = window.requestAnimationFrame(animate);
    }

    function start() {
      document.body.classList.add('xy-scrolling');
      if (!frame) frame = window.requestAnimationFrame(animate);
    }

    function isBlockedTarget(targetElement) {
      return !!(targetElement && targetElement.closest && targetElement.closest('input, textarea, select, button, a, [role="button"], [contenteditable="true"], [data-native-scroll]'));
    }

    window.addEventListener('wheel', function (event) {
      if (event.ctrlKey || event.metaKey || event.shiftKey || isBlockedTarget(event.target)) return;
      if (!frame) {
        current = window.pageYOffset || document.documentElement.scrollTop || 0;
        target = current;
      }
      var mode = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
      var delta = Math.max(-120, Math.min(120, event.deltaY * mode));
      target = clamp(target + delta * 0.9);
      event.preventDefault();
      start();
    }, { passive: false });

    window.addEventListener('keydown', function (event) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || isBlockedTarget(event.target)) return;
      var delta = 0;
      if (event.key === 'ArrowDown') delta = 92;
      if (event.key === 'ArrowUp') delta = -92;
      if (event.key === 'PageDown' || event.key === ' ') delta = window.innerHeight * 0.82;
      if (event.key === 'PageUp') delta = -window.innerHeight * 0.82;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = maxScroll();
      if (delta) target = clamp(target + delta);
      if (!delta && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault();
      start();
    }, { passive: false });

    window.addEventListener('scroll', function () {
      if (frame) return;
      current = window.pageYOffset || document.documentElement.scrollTop || 0;
      target = current;
    }, { passive: true });

    window.addEventListener('resize', function () {
      target = clamp(target);
      current = clamp(current);
    }, { passive: true });

    motion.scrollTo = function (top) {
      target = clamp(top);
      start();
    };

    document.body.classList.add('xy-silky-scroll');
  }

  function initPageTransitions() {
    document.querySelectorAll('a[href]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.target || link.hasAttribute('download')) return;
        var url;
        try {
          url = new URL(link.href, window.location.href);
        } catch (error) {
          return;
        }
        if (url.origin !== window.location.origin) return;
        if (url.hash && url.pathname === window.location.pathname && url.search === window.location.search) return;
        if (!/\/$|\.html$/.test(url.pathname)) return;
        event.preventDefault();
        var loader = createSkeleton();
        if (loader) loader.classList.add('xy-page-transition');
        window.setTimeout(function () {
          window.location.href = url.href;
        }, 130);
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
    initSilkyScroll();
    initFastLinks();
    initSmartPrefetch();
    initPageTransitions();
    window.requestAnimationFrame(function () {
      window.setTimeout(hideSkeleton, 420);
    });
  });

  window.addEventListener('load', function () {
    window.setTimeout(hideSkeleton, 80);
  }, { once: true });
})();