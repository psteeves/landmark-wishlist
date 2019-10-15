import React, { Component } from 'react';
import logo from "../public/favicon.jpeg"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <img className="App-logo" src={logo} alt="logo" />
          <h2>Welcome to the Landmark WishList!</h2>
        </div>
      </div>
    );
  }
}

export default App;
