import React from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { LandmarksList } from "./components/LandmarksList";
import {searchFourSquare, formatResults, listFavorites, toggleFavoriteLandmark} from './utils'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            landmarks: [],
            userFavorites: [],
            location: undefined
        };
        this.search = this.search.bind(this);
        this.checkLandmarkStatus = this.checkLandmarkStatus.bind(this);
        this.toggleLandmark = this.toggleLandmark.bind(this);
    }

    search(location, section) {
        searchFourSquare(location, section).then(
            response => {
                const formattedResults = formatResults(response).map(
                    res => {
                        const copy = Object.assign({}, res);
                        copy.isFavorite = this.checkLandmarkStatus(res);
                        return copy;
                    }
                );
                this.setState({landmarks: formattedResults, location: location});
            }
        );
    }

    componentDidMount() {
        listFavorites().then(
            favorites => {
                this.setState({userFavorites: favorites.landmarks})
            }
        )
    }

    checkLandmarkStatus(landmark) {
        return this.state.userFavorites.filter(element => element.id === landmark.id).length
    }

    toggleLandmark(landmark) {
        const favoriteStatus = this.state.userFavorites.filter(fav => fav.id === landmark.id).length;
        const method = favoriteStatus? 'DELETE': 'POST';
        toggleFavoriteLandmark(landmark, method).then(
            response => {
                this.setState(state => {
                    let newFavorites;
                    if (favoriteStatus) {
                        newFavorites = state.userFavorites.filter(el => el.id !== landmark.id)
                    } else {
                        newFavorites = [...state.userFavorites, landmark]
                    }
                    const newResults = state.landmarks.map(res => {
                        if (res === landmark) {
                            res.isFavorite = !landmark.isFavorite;
                            return res
                        } else {
                            return res
                        }
                    });
                    return {userFavorites: newFavorites, landmarks: newResults}
                });
                console.log(`${favoriteStatus? 'Removed': 'Added'} ${response} ${favoriteStatus? 'from': 'to'} favorites!`)
            }
        )
    }

    render() {
    return (
      <div className="App">
        <div className="Search-bar">
          <SearchBar search={this.search}/>
        </div>
          <div className="Landmark-results">
              <LandmarksList title={this.state.location? `Places in ${this.state.location}`: ''} landmarks={this.state.landmarks} onClick={this.toggleLandmark}/>
          </div>
      </div>
    );
    }
}

export default App;
