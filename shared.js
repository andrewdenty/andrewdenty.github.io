var AndrewsComponent = React.createClass ({
                    doSomething: function() {
                        alert("The text displaying is:" + this.props.children);
                    },
                    render: function() {
                        return(
                            <div>
                <h3>{this.props.user}</h3>
                <a onClick={this.doSomething} href="#">Click me</a>
                </div>
                        );
                    }
                    
                });