import React from 'react';
import { Landmark } from "./Landmark";
import { toggleFavoriteLandmark } from "../utils";


export class LandmarksList extends React.Component {
    constructor(props) {
        super(props);
        this.toggleLandmark = this.toggleLandmark.bind(this);
    }

    toggleLandmark(landmark) {
        toggleFavoriteLandmark(landmark).then(
            response => {
                console.log(`Added ${response} to favorites!`)
            }
        )
    }
    render() {
        let list;
        if (this.props.landmarks.length) {
            list = this.props.landmarks.map(
                landmark => {
                    return <Landmark favorite={this.toggleLandmark} landmark={landmark} />
                }
            );
        } else {
            list = []
        }
        return list;
    }
}
