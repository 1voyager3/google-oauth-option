import React, {Component} from "react";

class GoogleOAuth extends Component {

    state = {isSignedIn: null};

    componentDidMount() {
        // first argument is a module (Google displays confirmation screen to user in popup window) invokes by Google's JS API lib
        // second argument is a callback in our React/Redux app, it invokes by Google's JS API lib
        // the lib is pointed in index.html
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                // it works only with http://localhost:3000 or http://localhost:3001
                clientId: "886170201545-ogqm3a985b4bva0gp69un8p2p4ij4ce6.apps.googleusercontent.com",
                scope: "email"
            }).then( () => {
                // get our reference to the auth lib itself or auth object
                this.auth = window.gapi.auth2.getAuthInstance();
                // we're going to update our component level state with this new property isSignedIn
                this.setState({isSignedIn: this.auth.isSignedIn.get() });
                // to show status isSignedIn or not without refreshing the webpage
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // because onAuthChange function is called as callback it needs to be bound as arrow function
    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get() })
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    // helper method
    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button
                    onClick={this.onSignOutClick}
                    className="ui blue basic button"
                >
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui green basic button"
                >
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            )
        }
    }


    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

export default GoogleOAuth;