import React from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import App from './App';
import UserSpace from './UserSpace.js';
import NotFound from './NotFound.js';
import Auth from './Auth';
import './NavBar.css';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.logout()
  }

  render() {
    const loggedInLinks = (
        <ul className="Router-links">
              <li className="Router-link">
                <Link to="/">Travel</Link>
              </li>
              <li className="Router-link">
                <Link to="/account">Account</Link>
              </li>
              <li className="Router-link">
                <Link to="/logout">Logout</Link>
              </li>
        </ul>
    );
    const loggedOutLinks = (
        <ul className="Router-links">
          <li className="Router-link">
            <Link to="/authenticate">Authentication</Link>
          </li>
        </ul>
    );
    return (
        <Router>
          <div className="Router">
            {this.props.loggedIn? loggedInLinks: loggedOutLinks}
            <h1>Landmark WishList</h1>
          </div>
          <Switch>
            <Route exact path="/"  render={() => this.props.loggedIn? <App/>: <Auth toggleLogInStatus={this.props.toggleLogInStatus} purpose='login'/>} />
            <Route path="/account" render={() => this.props.loggedIn? <UserSpace/>: <Auth toggleLogInStatus={this.props.toggleLogInStatus} purpose='login'/>} />
            <Route path="/authenticate" render={() => <Auth toggleLogInStatus={this.props.toggleLogInStatus} purpose='register'/>} />
            <Route path="/logout" render={
              () => {
                this.logout();
                return <Redirect to='/authenticate'/>
              }
            } />
            <Route component={NotFound}/>
          </Switch>
        </Router>
    )
  }
}
