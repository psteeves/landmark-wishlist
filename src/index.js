import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from "./NavBar";
import { AuthService } from "./AuthService";

// require('dotenv').config();

class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false};
    this.toggleLogInStatus = this.toggleLogInStatus.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    AuthService.checkLoginStatus().then(
        token => {
          const status = !!token;
          this.setState({loggedIn: status});
        }
    )
  }

  toggleLogInStatus() {
    this.setState(prevState => ({loggedIn: !prevState.loggedIn}))
  }

  logout() {
    AuthService.logOut();
    this.setState({loggedIn: false});
    console.log('Logged out!');
  }

  render() {
    return <NavBar loggedIn={this.state.loggedIn} toggleLogInStatus={this.toggleLogInStatus} logout={this.logout}/>
  }
}

ReactDOM.render(
  <Routing />,
  document.getElementById('root')
);
