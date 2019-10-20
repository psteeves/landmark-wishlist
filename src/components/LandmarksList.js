import React from 'react';
import { Landmark } from "./Landmark";
import { addFavoriteLandmark } from "../utils";


export class LandmarksList extends React.Component {
    constructor(props) {
        super(props);
        this.favoriteLandmark = this.favoriteLandmark.bind(this);
    }
    favoriteLandmark(landmark) {
        addFavoriteLandmark(landmark).then(
            response => {
                console.log(`Added ${response} to favorites!`)
            }
        )
    }
    render() {
        console.log(this.props.landmarks);
        let list;
        if (this.props.landmarks.length) {
            list = this.props.landmarks.map(
                landmark => {
                    return <Landmark favorite={this.favoriteLandmark} landmark={landmark} />
                }
            );
        } else {
            list = []
        }
        return list;
    }
}
