import React from 'react';
import { hardCodedUser, listFavorites, toggleFavoriteLandmark } from "./utils";
import { LandmarksList } from "./components/LandmarksList";
import './UserSpace.css';

class UserSpace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {landmarks: []};
        this.unFavoriteLandmark = this.unFavoriteLandmark.bind(this);
    }

    componentDidMount() {
        listFavorites(hardCodedUser).then(
            response => {
                let landmarks = response.landmarks;
                landmarks.forEach(lm => {lm.isFavorite = true});
                this.setState({landmarks: response.landmarks});
            }
        );
    };

    unFavoriteLandmark(landmark) {
        toggleFavoriteLandmark(landmark, 'DELETE').then(
            response => {
                this.setState(state => {
                        return {landmarks: state.landmarks.filter(el => el.id !== landmark.id)};
                });
                console.log(`Removed ${response} from favorites!`)
            }
        )
    }

    render() {
        let addLandmarksPrompt;
        let landmarksByCityList;

        if (this.state.landmarks.length) {
            addLandmarksPrompt = '';
	        const landmarksByCity = this.state.landmarks.reduce((groups, element) => {
	        const city = element.city;
	        if (!groups.hasOwnProperty(city)) {
	            groups[city] = []
	        }
	        groups[city].push(element);
	        return groups;
	        }, {});

	        landmarksByCityList = Object.keys(landmarksByCity).map(
	        city => {
	            return <li><LandmarksList title={city} landmarks={landmarksByCity[city]} onClick={this.unFavoriteLandmark}/></li>
	        }
            )

        } else {
            addLandmarksPrompt = <h3>You haven't favorited any landmarks yet...</h3>
            landmarksByCityList = [];
        }
        return (
            <div className="User-list">
              <h2>Your Places</h2>
                <ul className="Landmarks-list-by-city">
                    {landmarksByCityList}
                </ul>
                {addLandmarksPrompt}
            </div>
        )
    }
}

export default UserSpace;
