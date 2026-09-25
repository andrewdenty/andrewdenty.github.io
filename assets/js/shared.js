/* ==========================================================================
   Shared page chrome and behaviour. Loaded on every page.
   Pages call renderHeader(), renderFooter(), and either renderWork()
   (homepage) or renderMoreWork('Key') (case studies).
   ========================================================================== */

/* Projects, in display order. `featured` projects are shown as cards on the
   homepage; the rest appear in the "Earlier work" list. */
var projects = [
  {
    key: 'Thingtesting',
    featured: true,
    title: 'Thingtesting',
    company: 'Thingtesting',
    years: '2022–Now',
    href: '/thingtesting-overview.html',
    img: '/assets/img/thingtesting-thumb.webp',
    alt: 'The Thingtesting homepage',
    desc: 'Leading design for a platform that helps people discover and review new brands.'
  },
  {
    key: 'TryIt',
    featured: true,
    title: 'Try It by Thingtesting',
    company: 'Thingtesting',
    years: '2023–2025',
    href: '/thingtesting-try-it.html',
    img: '/assets/img/try-it-branding-1.webp',
    alt: 'Try It campaign artwork',
    desc: 'Turning product testing into a revenue stream that helps brands grow in retail.',
    contain: true,
    well: '#f3f3f3'
  },
  {
    key: 'AirtameHomescreen',
    featured: true,
    title: 'Airtame home screen',
    company: 'Airtame',
    years: '2018–2019',
    href: '/airtame-homescreen.html',
    img: '/assets/img/airtame-homescreen-thumb.webp',
    alt: 'The Airtame home screen in a meeting room',
    desc: 'Redesigning the screen people see when they walk into a room with an Airtame.'
  },
  {
    key: 'AirtameApp',
    featured: true,
    title: 'Airtame app',
    company: 'Airtame',
    years: '2019–2020',
    href: '/airtame-desktop-app.html',
    img: '/assets/img/airtame-desktop-app-thumb.webp',
    alt: 'The Airtame desktop app',
    desc: 'Making screen sharing easier for first-time users, from finding the app to presenting.'
  },
  {
    key: 'Honeycomb',
    title: 'Honeycomb design system',
    company: 'Redgate',
    years: '2015–2018',
    href: '/honeycomb-design-system.html',
    img: '/assets/img/honeycomb-thumb.svg',
    alt: 'Components from the Honeycomb design system',
    desc: 'Building Redgate’s first shared component library across a suite of developer tools.'
  },
  {
    key: 'ReadyRoll',
    title: 'ReadyRoll set-up experience',
    company: 'Redgate',
    years: '2017',
    href: '/readyroll-getting-started.html',
    img: '/assets/img/readyroll-getting-started-thumb.svg',
    alt: 'The ReadyRoll set-up flow',
    desc: 'Turning a steep learning curve into a guided, three-step set-up.'
  },
  {
    key: 'InTheBox',
    title: 'Redgate in Visual Studio',
    company: 'Redgate',
    years: '2017',
    href: '/redgate-in-the-box.html',
    img: '/assets/img/in-the-box-thumb.svg',
    alt: 'Visual Studio and Redgate logos',
    desc: 'A joined-up experience for the Redgate tools shipped with Visual Studio.'
  }
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

var icons = {
  arrow: '<path d="M3.5 8h9M8.5 4l4 4-4 4"/>',
  external: '<path d="M5 11l6-6M6 5h5v5"/>',
  up: '<path d="M8 12.5v-9M4 7.5l4-4 4 4"/>'
};

function icon(name) {
  return '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' + icons[name] + '</svg>';
}

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

function cardHTML(p) {
  var style = p.well ? ' style="--well:' + p.well + '"' : '';
  return '<a class="card' + (p.contain ? ' card--contain' : '') + '" href="' + p.href + '"' + style + '>' +
    '<div class="card-media"><img src="' + p.img + '" alt="' + p.alt + '" loading="lazy" decoding="async"></div>' +
    '<div class="card-head">' +
      '<h3 class="card-title">' + p.title + icon('arrow') + '</h3>' +
      '<span class="card-year">' + p.years + '</span>' +
    '</div>' +
    '<p class="card-desc">' + p.desc + '</p>' +
  '</a>';
}

/* Header ------------------------------------------------------------------- */

function renderHeader() {
  var el = document.getElementById('Header');
  if (!el) return;
  var base = isHome() ? '' : '/';
  el.innerHTML =
    '<header class="site-header" id="top">' +
      '<div class="wrap grid">' +
        '<a class="site-name" href="/">Andrew Denty</a>' +
        '<p class="site-role">Product designer</p>' +
        '<p class="site-place">Copenhagen, <span data-clock>' + copenhagenTime() + '</span></p>' +
        '<nav class="site-nav" aria-label="Sections">' +
          '<a href="' + base + '#work">Work</a>' +
          '<a href="' + base + '#experience">Experience</a>' +
          '<a href="' + base + '#writing">Writing</a>' +
          '<a href="#contact">Contact</a>' +
        '</nav>' +
      '</div>' +
    '</header>';
}

/* Homepage work ------------------------------------------------------------ */

function renderWork() {
  var el = document.getElementById('Work');
  if (!el) return;
  var featured = projects.filter(function (p) { return p.featured; });
  var earlier = projects.filter(function (p) { return !p.featured; });

  var html = '<div class="work-grid">' + featured.map(cardHTML).join('') + '</div>';

  if (earlier.length) {
    html +=
      '<div class="grid section-grid section-sub">' +
        '<h3 class="section-label">Earlier work</h3>' +
        '<ul class="list section-body">' +
          earlier.map(function (p) {
            return '<li><a class="entry" href="' + p.href + '" data-preview="' + p.img + '">' +
              '<span class="entry-title">' + p.title + icon('arrow') + '</span>' +
              '<span class="entry-meta">' + p.company + '</span>' +
              '<span class="entry-year">' + p.years + '</span>' +
            '</a></li>';
          }).join('') +
        '</ul>' +
      '</div>';
  }

  el.innerHTML = html;
}

/* Case studies: the next three projects after this one --------------------- */

function renderMoreWork(page) {
  var el = document.getElementById('MoreWork');
  if (!el) return;
  var start = 0;
  for (var i = 0; i < projects.length; i++) {
    if (projects[i].key === page) { start = i + 1; break; }
  }
  var picks = [];
  for (var j = 0; picks.length < 3 && j < projects.length; j++) {
    var p = projects[(start + j) % projects.length];
    if (p.key !== page) picks.push(p);
  }
  el.className = '';
  el.innerHTML =
    '<section class="section" aria-labelledby="more-work-title">' +
      '<div class="wrap">' +
        '<div class="grid section-grid">' +
          '<h2 class="section-label" id="more-work-title">More work</h2>' +
        '</div>' +
        '<div class="work-grid work-grid--three">' + picks.map(cardHTML).join('') + '</div>' +
      '</div>' +
    '</section>';
}

/* Footer ------------------------------------------------------------------- */

function renderFooter() {
  var el = document.getElementById('Footer');
  if (!el) return;
  el.className = '';
  el.innerHTML =
    '<footer class="site-footer" id="contact">' +
      '<div class="wrap">' +
        '<div class="grid section-grid">' +
          '<h2 class="section-label">Contact</h2>' +
          '<div class="section-body contact">' +
            '<p class="contact-lead">Always happy to talk about design, products and teams.</p>' +
            '<div class="contact-email">' +
              '<a class="u" href="mailto:' + contact.email + '">' + contact.email + '</a>' +
              '<button class="copy-btn" type="button" data-copy="' + contact.email + '" aria-live="polite" hidden>Copy</button>' +
            '</div>' +
            '<ul class="contact-links">' +
              contact.links.map(function (l) {
                var attrs = l.external ? ' target="_blank" rel="noopener"' : '';
                return '<li><a href="' + l.href + '"' + attrs + '>' + l.label + icon('external') + '</a></li>';
              }).join('') +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="grid footer-bar">' +
          '<p>© ' + new Date().getFullYear() + ' Andrew Denty</p>' +
          '<p>Set in Inter</p>' +
          '<a class="footer-top" href="#top">Back to top' + icon('up') + '</a>' +
        '</div>' +
      '</div>' +
    '</footer>';
}

/* Behaviour ---------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function () {
  initClock();
  initCopy();
  initReveal();
  initPreview();
  initScrollReveal();
  initLightbox();
});

// Live Copenhagen time in the header
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

// Floating image preview when hovering "Earlier work" rows (fine pointers only)
function initPreview() {
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var rows = document.querySelectorAll('[data-preview]');
  if (!rows.length) return;

  var box = document.createElement('div');
  box.className = 'preview';
  box.setAttribute('aria-hidden', 'true');
  var img = document.createElement('img');
  img.alt = '';
  box.appendChild(img);
  document.body.appendChild(box);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var w = 300, h = w * 9 / 16;
  var x = 0, y = 0, tx = 0, ty = 0, raf = 0, active = false;

  function aim(e) {
    tx = e.clientX + 28;
    if (tx + w > window.innerWidth - 16) tx = e.clientX - 28 - w;
    ty = Math.max(16, Math.min(e.clientY - h / 2, window.innerHeight - h - 16));
  }

  function frame() {
    var k = reduce ? 1 : 0.2;
    x += (tx - x) * k;
    y += (ty - y) * k;
    box.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    raf = (active || Math.abs(tx - x) + Math.abs(ty - y) > 0.5) ? requestAnimationFrame(frame) : 0;
  }

  function hide() {
    active = false;
    box.classList.remove('is-visible');
  }

  Array.prototype.forEach.call(rows, function (row) {
    row.addEventListener('mouseenter', function (e) {
      img.src = row.getAttribute('data-preview');
      aim(e);
      if (!box.classList.contains('is-visible')) { x = tx; y = ty; }
      active = true;
      box.classList.add('is-visible');
      if (!raf) raf = requestAnimationFrame(frame);
    });
    row.addEventListener('mousemove', aim);
    row.addEventListener('mouseleave', hide);
  });

  window.addEventListener('scroll', function () { if (active) hide(); }, { passive: true });
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
