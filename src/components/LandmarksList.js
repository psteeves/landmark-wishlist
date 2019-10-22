import React from 'react';
import { Landmark } from "./Landmark";


export class LandmarksList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let list;
        if (this.props.landmarks.length) {
            list = this.props.landmarks.map(
                landmark => {
                    return <Landmark toggleLandmark={this.props.toggleLandmark} landmark={landmark} />
                }
            );
        } else {
            list = []
        }
        return list;
    }
}
