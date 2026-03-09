var links = {
  AirtameApp: {
    href: '/airtame-desktop-app.html',
    imgsrc: 'assets/img/airtame-desktop-app-thumb.webp',
    description: 'Making the Airtame app easier to use'
  },
  Honeycomb: {
    href: '/honeycomb-design-system.html',
    imgsrc: 'assets/img/honeycomb-thumb.svg',
    description: 'Redgate Honeycomb design system'
  },
  AirtameHomescreen: {
    href: '/airtame-homescreen.html',
    imgsrc: 'assets/img/airtame-homescreen-thumb.webp',
    description: 'Designing the Airtame home screen'
  },
  Thingtesting: {
    href: '/thingtesting-overview.html',
    imgsrc: 'assets/img/thingtesting-thumb.webp',
    description: 'Thingtesting'
  }
};

function renderHeader() {
  var el = document.getElementById('Header');
  if (!el) return;
  el.innerHTML = [
    '<div class="page-header">',
    '  <div class="container">',
    '    <nav class="navbar navbar-expand-md navbar-light bg-light">',
    '      <a class="navbar-brand" href="index.html">Andrew Denty</a>',
    '      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">',
    '        <span class="navbar-toggler-icon"></span>',
    '      </button>',
    '      <div class="collapse navbar-collapse" id="navbarSupportedContent">',
    '        <ul class="navbar-nav ms-auto">',
    '          <li class="nav-item active">',
    '            <a class="nav-link" href="work.html">Work <span class="visually-hidden">(current)</span></a>',
    '          </li>',
    '          <li class="nav-item">',
    '            <a class="nav-link" href="https://www.andrewdenty.com/blog">Thoughts on design</a>',
    '          </li>',
    '          <li class="nav-item">',
    '            <a class="nav-link" href="https://www.parttimebackpacker.com">Personal blog</a>',
    '          </li>',
    '        </ul>',
    '      </div>',
    '    </nav>',
    '  </div>',
    '</div>'
  ].join('\n');
}

function renderMoreWork(page) {
  var el = document.getElementById('MoreWork');
  if (!el) return;
  var html = '<div><h3>More work \u2013</h3><div class="row">';
  Object.keys(links).forEach(function(name) {
    if (name === page) return;
    var link = links[name];
    html += '<div class="col-4">' +
      '<a href="' + link.href + '">' +
      '<img class="img-fluid light-grey" src="' + link.imgsrc + '" alt="' + link.description + '" />' +
      '<p class="small">' + link.description + '</p>' +
      '</a></div>';
  });
  html += '</div></div>';
  el.innerHTML = html;
}

function renderFooter() {
  var el = document.getElementById('Footer');
  if (!el) return;
  el.innerHTML = [
    '<div>',
    '  <div class="footer-line"></div>',
    '  <div class="row">',
    '    <div class="col-md-4">',
    '      <h3>Find me here \u2013</h3>',
    '      <p>',
    '        <a href="http://www.parttimebackpacker.com/" target="_blank">Personal blog</a>',
    '        <br/>',
    '        <a href="https://uk.linkedin.com/in/andrewdenty/" target="_blank">Linkedin</a>',
    '      </p>',
    '    </div>',
    '    <div class="col-md-6">',
    '      <h3>Let\'s work together \u2013</h3>',
    '      <p><a href="mailto:andrewdenty@gmail.com">andrewdenty@gmail.com</a></p>',
    '    </div>',
    '  </div>',
    '  <div class="spacer"></div>',
    '  <p class="small">Copyright \u00a9 2026 Andrew Denty</p>',
    '  <div class="spacer"></div>',
    '</div>'
  ].join('\n');
}

/* Lightbox */
document.addEventListener('DOMContentLoaded', function () {

  // --- Scroll-reveal animation ---
  (function initScrollReveal() {
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
  })();

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

});
