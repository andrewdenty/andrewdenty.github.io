/* Page footer */

var Header = React.createClass({
    render: function () {
        return (
            <div className="page-header">
            <div className="container">
            <div className="row">
            <div className="col-sm-6">
                    <p className="logo"><a href="index.html">Andrew Denty</a></p>
                </div>
                <div className="col-sm-6">
                    <span className="pull-right">
                    <p>
                       <a href="portfolio.html">Portfolio</a> {'\u00A0'}{'\u00A0'}{'\u00A0'}•{'\u00A0'}{'\u00A0'}{'\u00A0'}  <a href="https://andrewdenty.tumblr.com">Thoughts on UX</a>  {'\u00A0'}{'\u00A0'}{'\u00A0'}•{'\u00A0'}{'\u00A0'}{'\u00A0'}  <a href="http://www.parttimebackpacker.com">Blog</a>
                    </p></span>
                </div>
            </div>
            </div>
            </div>
        );
    }
});


/*


<p><a href="index.html"><span style="font-weight:600; font-size: 24px; color: #222;">Andrew Denty</span></a><p/>
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
  InTheBox: {
    href: '/redgate-in-the-box.html',
    imgsrc: 'assets/img/in-the-box-thumb.svg',
    description: 'Redgate in the Box with Visual Studio'
  },
  Honeycomb: {
    href: '/honeycomb-design-system.html',
    imgsrc: 'assets/img/honeycomb-thumb.svg',
    description: 'Redgate Honeycomb design system'
  },
  ThreeT: {
    href: '/3t-software-labs.html',
    imgsrc: 'assets/img/3t-thumb.svg',
    description: '3T Software Labs icons'
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
            
                        return <div key={name} className="col-xs-4">
                                <a href={links[name].href}>
                                    <img className="img-responsive light-grey" src={links[name].imgsrc} alt={links[name].description} />
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
                <div className="col-sm-4">
                    <h3>Find me here –</h3>
                    <p><a href="http://andrewdenty.tumblr.com/" target="_blank">Thoughts on UX</a>
                        <br/>
                        <a href="http://www.parttimebackpacker.com/" target="_blank">Personal blog</a>
                        <br/>
                        <a href="https://twitter.com/andrewdenty" target="_blank">Twitter</a>
                        <br/>
                        <a href="https://uk.linkedin.com/in/andrewdenty/" target="_blank">Linkedin</a></p>
                </div>
                <div className="col-sm-6">
                    <h3>Let's work together –</h3>
                    <p>
                        <a href="mailto:andrewdenty@gmail.com">andrewdenty@gmail.com</a>
                    </p>
                </div>
            </div>
            <div className="spacer"></div>
            <p className="small">Copyright © 2019 Andrew Denty</p>
            <div className="spacer"></div>
            </div>
        );
    }
});