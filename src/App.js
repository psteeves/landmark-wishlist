import React, { Component } from 'react';
import logo from "../public/favicon.jpeg"
import './App.css';
import { SearchBar } from "./components/SearchBar"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" src={logo} alt="logo" />
          <h2>Welcome to the Landmark WishList!</h2>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;
