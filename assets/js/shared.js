/* ==========================================================================
   Shared page chrome and behaviour. Loaded on every page.
   Pages call renderHeader(), renderFooter(), and either renderWork()
   (homepage) or renderMoreWork('Key') (case studies).
   ========================================================================== */

/* Projects, in display order. Only `featured` projects are shown, as
   thumbnails on the homepage and in "More work" on case studies. */
var projects = [
  {
    key: 'Thingtesting',
    featured: true,
    title: 'Thingtesting',
    years: '2022–Now',
    href: '/thingtesting-overview.html',
    img: '/assets/img/thingtesting-thumb.webp'
  },
  {
    key: 'TryIt',
    featured: true,
    title: 'Try It by Thingtesting',
    years: '2023–2025',
    href: '/thingtesting-try-it.html',
    img: '/assets/img/try-it-branding-1.webp',
    contain: true,
    well: '#f3f3f3'
  },
  {
    key: 'AirtameHomescreen',
    featured: true,
    title: 'Airtame home screen',
    years: '2018–2019',
    href: '/airtame-homescreen.html',
    img: '/assets/img/airtame-homescreen-thumb.webp'
  },
  {
    key: 'AirtameApp',
    featured: true,
    title: 'Airtame app',
    years: '2019–2020',
    href: '/airtame-desktop-app.html',
    img: '/assets/img/airtame-desktop-app-thumb.webp'
  },
  {
    key: 'Honeycomb',
    title: 'Honeycomb design system',
    years: '2015–2018',
    href: '/honeycomb-design-system.html',
    img: '/assets/img/honeycomb-thumb.svg'
  },
  {
    key: 'ReadyRoll',
    title: 'ReadyRoll set-up experience',
    years: '2017',
    href: '/readyroll-getting-started.html',
    img: '/assets/img/readyroll-getting-started-thumb.svg'
  },
  {
    key: 'InTheBox',
    title: 'Redgate in Visual Studio',
    years: '2017',
    href: '/redgate-in-the-box.html',
    img: '/assets/img/in-the-box-thumb.svg'
  }
];

/* Sections in the fixed nav. Each id matches a section on the homepage. */
var sections = [
  ['intro', 'Intro'],
  ['work', 'Work'],
  ['approach', 'Approach'],
  ['background', 'Background'],
  ['writing', 'Writing'],
  ['about', 'About'],
  ['contact', 'Contact']
];

var contact = {
  email: 'andrewdenty@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrewdenty/', external: true },
    { label: 'Instagram', href: 'https://www.instagram.com/andrewdenty/', external: true },
    { label: 'Thoughts on design', href: 'https://www.andrewdenty.com/blog/' },
    { label: 'The Part-Time Backpacker', href: 'https://www.parttimebackpacker.com/' }
  ]
};

/* Helpers ------------------------------------------------------------------ */

function isHome() {
  var path = window.location.pathname;
  return path === '/' || /\/index\.html$/.test(path);
}

function copenhagenTime() {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Copenhagen'
    }).format(new Date());
  } catch (e) {
    return '';
  }
}

// Two staggered columns of thumbnails. --i keeps the original order when
// the columns collapse into one on small screens.
function thumbsHTML(list) {
  var cols = ['', ''];
  list.forEach(function (p, i) {
    var style = '--i:' + i + (p.well ? ';--thumb-well:' + p.well : '');
    cols[i % 2] +=
      '<a class="thumb' + (p.contain ? ' thumb--contain' : '') + '" href="' + p.href + '" style="' + style + '">' +
        '<span class="thumb-media"><img src="' + p.img + '" alt="' + p.title + '" loading="lazy" decoding="async"></span>' +
        '<span class="thumb-caption" aria-hidden="true"><span>' + p.title + '</span><span class="thumb-year">' + p.years + '</span></span>' +
      '</a>';
  });
  return '<div class="thumbs"><div class="thumbs-col">' + cols[0] + '</div><div class="thumbs-col">' + cols[1] + '</div></div>';
}

/* Monogram and section nav --------------------------------------------------- */

// On the homepage the current section is tracked as you scroll (initScrollSpy).
// Elsewhere pass the section to mark as current; case studies default to Work.
function renderHeader(current) {
  var el = document.getElementById('Header');
  if (!el) return;
  var home = isHome();
  if (current === undefined) current = home ? '' : 'work';
  var links = sections.map(function (s) {
    var href = s[0] === 'contact' ? '#contact' : (home ? '' : '/') + '#' + s[0];
    var attr = s[0] === current ? ' aria-current="true"' : '';
    return '<a href="' + href + '" data-section="' + s[0] + '"' + attr + '>' + s[1] + '</a>';
  }).join('');
  el.innerHTML =
    '<header class="site-header">' +
      '<a class="site-mark" href="/" aria-label="Andrew Denty, home">A</a>' +
      '<nav class="site-nav" aria-label="Sections">' + links + '</nav>' +
    '</header>';
}

/* Homepage work -------------------------------------------------------------- */

function renderWork() {
  var el = document.getElementById('Work');
  if (!el) return;
  el.innerHTML = thumbsHTML(projects.filter(function (p) { return p.featured; }));
}

/* Case studies: the other featured projects ----------------------------------- */

function renderMoreWork(page) {
  var el = document.getElementById('MoreWork');
  if (!el) return;
  var others = projects.filter(function (p) { return p.featured && p.key !== page; });
  el.className = '';
  el.innerHTML =
    '<section class="room" aria-labelledby="more-work-title">' +
      '<div class="frame grid">' +
        '<h2 class="c-main meta more-work-label" id="more-work-title">More work</h2>' +
        '<div class="c-main">' + thumbsHTML(others) + '</div>' +
      '</div>' +
    '</section>';
}

/* Contact -------------------------------------------------------------------- */

function renderFooter() {
  var el = document.getElementById('Footer');
  if (!el) return;
  el.className = '';
  el.innerHTML =
    '<footer class="room contact" id="contact">' +
      '<div class="frame grid">' +
        '<h2 class="room-label">Contact</h2>' +
        '<p class="display c-wide">Say hello.</p>' +
        '<div class="c-main">' +
          '<p class="contact-email title">' +
            '<a class="u" href="mailto:' + contact.email + '">' + contact.email + '</a>' +
            '<button class="copy-btn" type="button" data-copy="' + contact.email + '" aria-live="polite" hidden>Copy</button>' +
          '</p>' +
          '<ul class="contact-links">' +
            contact.links.map(function (l) {
              var attrs = l.external ? ' target="_blank" rel="noopener"' : '';
              return '<li><a href="' + l.href + '"' + attrs + '>' + l.label + '</a></li>';
            }).join('') +
          '</ul>' +
        '</div>' +
        '<p class="c-main colophon">' +
          '<span>© ' + new Date().getFullYear() + ' Andrew Denty</span>' +
          '<span>Set in Inter</span>' +
          '<span>Copenhagen, <span data-clock>' + copenhagenTime() + '</span></span>' +
        '</p>' +
      '</div>' +
    '</footer>';
}

/* Behaviour ---------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function () {
  initScrollSpy();
  initAudiences();
  initClock();
  initCopy();
  initReveal();
  initScrollReveal();
  initLightbox();
});

// Homepage: highlight the section in the middle of the viewport
function initScrollSpy() {
  if (!isHome() || !('IntersectionObserver' in window)) return;
  var links = document.querySelectorAll('.site-nav a[data-section]');
  var targets = [];
  Array.prototype.forEach.call(links, function (a) {
    var section = document.getElementById(a.getAttribute('data-section'));
    if (section) targets.push(section);
  });
  if (!targets.length) return;

  function setCurrent(id) {
    Array.prototype.forEach.call(links, function (a) {
      if (a.getAttribute('data-section') === id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setCurrent(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -54% 0px' });

  targets.forEach(function (t) { observer.observe(t); });
  setCurrent(targets[0].id);
}

// Homepage: the audience buttons swap the intro headline
function initAudiences() {
  var title = document.querySelector('[data-audience-title]');
  var buttons = document.querySelectorAll('[data-line]');
  if (!title || !buttons.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timer;

  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener('click', function () {
      if (btn.getAttribute('aria-pressed') === 'true') return;
      Array.prototype.forEach.call(buttons, function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      var swap = function () {
        title.textContent = btn.getAttribute('data-line');
        title.classList.remove('is-switching');
      };
      clearTimeout(timer);
      if (reduce) { swap(); return; }
      title.classList.add('is-switching');
      timer = setTimeout(swap, 250);
    });
  });
}

// Live Copenhagen time in the footer
function initClock() {
  var els = document.querySelectorAll('[data-clock]');
  if (!els.length) return;
  function tick() {
    var t = copenhagenTime();
    for (var i = 0; i < els.length; i++) els[i].textContent = t;
  }
  tick();
  setInterval(tick, 15000);
}

// Copy email address (only where the clipboard API is available)
function initCopy() {
  if (!navigator.clipboard || !window.isSecureContext) return;
  var buttons = document.querySelectorAll('[data-copy]');
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.hidden = false;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        btn.textContent = 'Copied';
        clearTimeout(btn._reset);
        btn._reset = setTimeout(function () { btn.textContent = 'Copy'; }, 1800);
      });
    });
  });
}

// Fade sections in as they enter the viewport (homepage)
function initReveal() {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  function show(el) { el.classList.add('is-revealed'); }
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(els, show);
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      show(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.01 });
  Array.prototype.forEach.call(els, function (el) { observer.observe(el); });
}

// Case studies: reveal images as they scroll into view
function initScrollReveal() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var images = document.querySelectorAll('img.img-fluid');
  var targets = [];
  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    if (img.closest('#Header') || img.closest('#MoreWork') || img.closest('#Footer')) continue;
    targets.push(img);
  }
  if (targets.length === 0) return;

  for (var i = 0; i < targets.length; i++) {
    // Remove lazy loading: Safari 18 can refuse to load opacity:0 images tagged
    // as lazy, creating a deadlock where images never load and never reveal.
    targets[i].removeAttribute('loading');
    targets[i].classList.add('scroll-reveal');
    // Wrap in a tight clip container so hover zoom is clipped at original bounds
    var clip = document.createElement('span');
    clip.className = 'img-zoom-clip';
    targets[i].parentNode.insertBefore(clip, targets[i]);
    clip.appendChild(targets[i]);
  }

  var isInitialCheck = true;

  function revealImage(img, instant) {
    var doReveal = function () {
      if (instant) {
        img.classList.add('scroll-revealed-instant');
      } else {
        img.classList.add('scroll-revealed');
      }
      if (!instant) {
        img.addEventListener('transitionend', function handler() {
          img.style.willChange = 'auto';
          img.removeEventListener('transitionend', handler);
        });
      } else {
        img.style.willChange = 'auto';
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      doReveal();
    } else {
      img.addEventListener('load', doReveal, { once: true });
      img.addEventListener('error', doReveal, { once: true });
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    var visible = [];
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) visible.push(entries[i].target);
    }

    for (var i = 0; i < visible.length; i++) {
      var img = visible[i];
      observer.unobserve(img);
      revealImage(img, isInitialCheck);
    }

    if (isInitialCheck) isInitialCheck = false;
  }, {
    rootMargin: '0px 0px 100px 0px',
    threshold: 0
  });

  for (var i = 0; i < targets.length; i++) {
    observer.observe(targets[i]);
  }

  // Safety net: after 3s reveal any images the observer may have missed
  setTimeout(function () {
    targets.forEach(function (img) {
      if (!img.classList.contains('scroll-revealed') && !img.classList.contains('scroll-revealed-instant')) {
        img.classList.add('scroll-revealed-instant');
      }
    });
  }, 3000);
}

// Case studies: lightbox for eligible .img-fluid images
function initLightbox() {
  // Collect eligible .img-fluid images, excluding structural sections,
  // device-frame images (.tv), and images inside anchors that don't link to image files.
  var allImgs = Array.prototype.filter.call(
    document.querySelectorAll('img.img-fluid'),
    function (img) {
      if (img.closest('#Header, #MoreWork, #Footer')) return false;
      if (img.classList.contains('tv')) return false;
      var a = img.closest('a');
      if (a) {
        var href = a.getAttribute('href') || '';
        if (!/\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/i.test(href)) return false;
      }
      return true;
    }
  );

  if (allImgs.length === 0) return;

  // Build index of { src, caption } for each eligible image.
  var lbItems = [];
  allImgs.forEach(function (img) {
    var src = img.getAttribute('src') || '';
    var a = img.closest('a');
    // Pattern D: use the larger linked image as the lightbox src
    if (a) src = a.getAttribute('href') || src;
    // Find caption: climb to nearest <p> or <a>, then look for next sibling p.caption
    // If image is wrapped in .img-zoom-clip span, use the span as fallback base
    var p = img.closest('p');
    var clip = (img.parentElement && img.parentElement.classList.contains('img-zoom-clip')) ? img.parentElement : null;
    var from = p || (a ? a : (clip || img));
    var capEl = null;
    var sib = from.nextElementSibling;
    while (sib) {
      if (sib.matches('p.caption')) { capEl = sib; break; }
      sib = sib.nextElementSibling;
    }
    var captionText = capEl ? capEl.textContent.trim() : (img.getAttribute('alt') || '');
    lbItems.push({ src: src, caption: captionText });
  });

  allImgs.forEach(function (img, i) {
    img.classList.add('lb-enabled');
    img.addEventListener('click', function (e) {
      if (img.closest('a')) e.preventDefault();
      lbOpen(i);
    });
  });

  // Inject lightbox DOM once into the page
  document.body.insertAdjacentHTML('beforeend',
    '<div id="lb-overlay" role="dialog" aria-modal="true" aria-label="Image lightbox" tabindex="-1">' +
      '<div id="lb-inner"><img id="lb-img" src="" alt=""><p id="lb-caption"></p></div>' +
      '<button id="lb-close" aria-label="Close lightbox">Close <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>' +
      '<button id="lb-prev" aria-label="Previous image"><svg width="9" height="16" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9L9 17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<button id="lb-next" aria-label="Next image"><svg width="9" height="16" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L9 9L1 17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
    '</div>'
  );

  var ov   = document.getElementById('lb-overlay');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-caption');
  var cur  = 0;

  function lbOpen(idx) {
    cur = idx;
    ov.classList.toggle('lb-single', lbItems.length <= 1);
    lbShow(cur, false);
    ov.classList.add('lb-open');
    void ov.offsetHeight; // force reflow so opacity transition fires
    ov.classList.add('lb-visible');
    document.body.classList.add('lb-scroll-lock');
    ov.focus();
  }

  function lbClose() {
    ov.classList.remove('lb-visible');
    setTimeout(function () {
      ov.classList.remove('lb-open');
      document.body.classList.remove('lb-scroll-lock');
      lbImg.setAttribute('src', '');
    }, 200);
  }

  function lbShow(idx, fade) {
    var item = lbItems[idx];
    if (!item) return;
    if (fade) lbImg.classList.add('lb-img-loading');
    var t = new Image();
    t.onload = t.onerror = function () {
      lbImg.setAttribute('src', item.src);
      lbImg.setAttribute('alt', item.caption);
      lbCap.textContent = item.caption;
      lbImg.classList.remove('lb-img-loading');
    };
    t.src = item.src;
  }

  function lbPrev() { cur = (cur - 1 + lbItems.length) % lbItems.length; lbShow(cur, true); }
  function lbNext() { cur = (cur + 1) % lbItems.length; lbShow(cur, true); }

  document.getElementById('lb-close').addEventListener('click', function (e) { e.stopPropagation(); lbClose(); });
  document.getElementById('lb-prev').addEventListener('click',  function (e) { e.stopPropagation(); lbPrev(); });
  document.getElementById('lb-next').addEventListener('click',  function (e) { e.stopPropagation(); lbNext(); });
  ov.addEventListener('click', function (e) { if (e.target === ov) lbClose(); });

  document.addEventListener('keydown', function (e) {
    if (!ov.classList.contains('lb-open')) return;
    if (e.key === 'Escape')     lbClose();
    if (e.key === 'ArrowLeft')  lbPrev();
    if (e.key === 'ArrowRight') lbNext();
  });

  // Touch swipe: horizontal swipe navigates between images
  var tx = 0, ty = 0;
  ov.addEventListener('touchstart', function (e) {
    tx = e.changedTouches[0].clientX;
    ty = e.changedTouches[0].clientY;
  }, { passive: true });
  ov.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0) lbNext(); else lbPrev();
  }, { passive: true });
}
