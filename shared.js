/*
  ______
< footer >
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

var Footer = React.createClass({
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
                                    <img className="img-responsive" src={links[name].imgsrc} alt={links[name].description} />
                                    <p className="small">{links[name].description}</p>
                                </a>
                            </div>;
                    })}
                </div>
            </div>
        );
    }
});



/*
var Footer = React.createClass({
    render: function () {
        var page = this.props.page;
        return (
            <div>
                 <div className="row">
                    {page != 'Cake' &&
                        <div className="col-xs-6 ">
                        <h3>Cake</h3>
                        </div>
                    }
                    {page != 'Brownies' &&
            <div className="col-xs-6 ">
                        <h3>Brownies</h3>
            </div>
                    }
                    {page != 'Cookies' &&
            <div className="col-xs-6 ">
                        <h3>Cookies</h3>
            
            </div>
                    }
                </div>
            </div>
        );
    }
});
*/
