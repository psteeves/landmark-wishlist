import React from 'react';
import logo from "../public/favicon.jpeg"
import './App.css';
import { SearchBar } from './components/SearchBar';
import { LandmarksList } from "./components/LandmarksList";
import { searchFourSquare, formatResults } from './utils'

require('dotenv').config()

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {landmarks: []};
        this.search = this.search.bind(this);
    }

    search(location) {
        searchFourSquare(location, 'food').then(
            response => {
                const formattedResults = formatResults(response);
                this.setState({landmarks: formattedResults});
            }
        );
    }

    render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" src={logo} alt="logo" />
          <h2>Welcome to the Landmark WishList!</h2>
        </div>
        <div className="Search-bar">
          <SearchBar search={this.search}/>
        </div>
          <div className="Landmark-results">
              <LandmarksList landmarks={this.state.landmarks} />
          </div>
      </div>
    );
    }
}

export default App;
