var links = {
  AirtameApp: {
    href: '/airtame-desktop-app.html',
    imgsrc: 'assets/img/airtame-desktop-app-thumb.png',
    description: 'Making the Airtame app easier to use'
  },
  Honeycomb: {
    href: '/honeycomb-design-system.html',
    imgsrc: 'assets/img/honeycomb-thumb.svg',
    description: 'Redgate Honeycomb design system'
  },
  AirtameHomescreen: {
    href: '/airtame-homescreen.html',
    imgsrc: 'assets/img/airtame-homescreen-thumb.jpg',
    description: 'Designing the Airtame home screen'
  },
  Thingtesting: {
    href: '/thingtesting-overview.html',
    imgsrc: 'assets/img/thingtesting-thumb.png',
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
    '      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">',
    '        <span class="navbar-toggler-icon"></span>',
    '      </button>',
    '      <div class="collapse navbar-collapse" id="navbarSupportedContent">',
    '        <ul class="navbar-nav ml-auto">',
    '          <li class="nav-item active">',
    '            <a class="nav-link" href="portfolio.html">Portfolio <span class="sr-only">(current)</span></a>',
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
    '  <p class="small">Copyright \u00a9 2025 Andrew Denty</p>',
    '  <div class="spacer"></div>',
    '</div>'
  ].join('\n');
}
