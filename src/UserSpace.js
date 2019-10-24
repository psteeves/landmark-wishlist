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
        if (this.state.landmarks.length) {
            addLandmarksPrompt = ''
        } else {
            addLandmarksPrompt = <h3>You haven't favorited any landmarks yet...</h3>
        }
        return (
            <div className="User-list">
              <h1>Your Places</h1>
                <LandmarksList landmarks={this.state.landmarks} onClick={this.unFavoriteLandmark}/>
                {addLandmarksPrompt}
            </div>
        )
    }
}

export default UserSpace;
