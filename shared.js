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
  Cake: {
    href: '/cake.html',
    imgsrc: 'https://unsplash.it/300/200/?random',
    description: 'This is a cake'
  },
  Brownies: {
    href: '/brownies.html',
    imgsrc: 'https://unsplash.it/300/200/?random',
    description: 'These are brownies'
  },
  Cookies: {
    href: '/cookies.html',
    imgsrc: 'https://unsplash.it/300/200/?random',
    description: 'Here are some tasty cookies'
  },
  Flapjack: {
    href: '/flapjack.html',
    imgsrc: 'https://unsplash.it/300/200/?random',
    description: 'Here is some stale flapjack'
  }
};

var Footer = React.createClass({
    render: function () {
        var page = this.props.page;
        return (
            <div>
            <h3>Cake Menu-</h3>
                <div className="row">
                    {Object.keys(links).map(function(name) {
                        if (page === name) {
                            return null;
                        }
            
                        return <div key={name} className="col-xs-4">
                                <a href={links[name].href}>
                                    <img className="img-responsive" src={links[name].imgsrc} alt={links[name].description} />
                                    <p>{links[name].description}</p>
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
