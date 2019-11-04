import React from 'react';
import { AuthForm } from "./components/AuthForm";
import { AuthService } from "./AuthService";


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {purpose: this.props.purpose};
        this.authenticate = this.authenticate.bind(this);
        this.switchPurpose = this.switchPurpose.bind(this);
    }

    authenticate(username, password) {
        if (this.state.purpose === 'register') {
            return AuthService.registerUser(username, password)
        } else {
            this.props.toggleLogInStatus();
            return AuthService.loginUser(username, password)
        }
    }

    switchPurpose(e) {
        if (this.state.purpose === 'register') {
            this.setState({purpose: 'login'})
        } else {
            this.setState({purpose: 'register'})
        }
    }

    render() {
    return (
      <div className="Auth">
        <div className="AuthForm">
          <AuthForm authenticate={this.authenticate} purpose={this.state.purpose} switchAuth={this.switchPurpose} />
        </div>
      </div>
    );
    }
}

export default Auth;
