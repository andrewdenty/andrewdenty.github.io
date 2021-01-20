/* Header */
var Header = React.createClass({
    render: function () {
        return (
            <div className="page-header">
 <div className="container">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand" href="index.html">Andrew Denty</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="portfolio.html">Portfolio <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://www.andrewdenty.com/blog">Thoughts on design</a>
                  </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.parttimebackpacker.com">Personal blog</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
    </div>
        );
    }
});

/*
  ______
< more work >
  ------
         \   ^__^ 
          \  (oo)\_______
             (__)\       )\/\
                 ||----w |
                 ||     ||
    
*/

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
  ReadyRoll: {
    href: '/readyroll-getting-started.html',
    imgsrc: 'assets/img/readyroll-getting-started-thumb.svg',
    description: 'Redesigning the ReadyRoll set up process'
  }
};

var MoreWork = React.createClass({
    render: function () {
        var page = this.props.page;
        return (
            <div>
            <h3>More work –</h3>
                <div className="row">
                    {Object.keys(links).map(function(name) {
                        if (page === name) {
                            return null;
                        }
            
                        return <div key={name} className="col-4">
                                <a href={links[name].href}>
                                    <img className="img-fluid light-grey" src={links[name].imgsrc} alt={links[name].description} />
                                    <p className="small">{links[name].description}</p>
                                </a>
                            </div>;
                    })}
                </div>
            </div>
        );
    }
});


/* Page footer */

var Footer = React.createClass({
    render: function () {
        return (
            <div>
             <div className="footer-line"></div>
            <div className="row">
                <div className="col-md-4">
                    <h3>Find me here –</h3>
                    <p>
                        <a href="http://www.parttimebackpacker.com/" target="_blank">Personal blog</a>
                        <br/>
                        <a href="https://twitter.com/andrewdenty" target="_blank">Twitter</a>
                        <br/>
                        <a href="https://uk.linkedin.com/in/andrewdenty/" target="_blank">Linkedin</a></p>
                </div>
                <div className="col-md-6">
                    <h3>Let's work together –</h3>
                    <p>
                        <a href="mailto:andrewdenty@gmail.com">andrewdenty@gmail.com</a>
                    </p>
                </div>
            </div>
            <div className="spacer"></div>
            <p className="small">Copyright © 2021 Andrew Denty</p>
            <div className="spacer"></div>
            </div>
        );
    }
});


