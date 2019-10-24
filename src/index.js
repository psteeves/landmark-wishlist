import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import UserSpace from './UserSpace.js';
import NotFound from './NotFound.js';
import './index.css';

require('dotenv').config();

const routing = (
  <Router>
    <div className="Router">
      <ul className="Router-links">
        <li className="Router-link">
          <Link to="/">Home</Link>
        </li>
        <li className="Router-link">
          <Link to="/account">Account</Link>
        </li>
      </ul>
      <h1>Landmark WishList</h1>
      </div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/account" component={UserSpace} />
        <Route component={NotFound} />
      </Switch>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);
