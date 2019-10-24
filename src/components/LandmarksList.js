import React from 'react';
import { Landmark } from "./Landmark";
import './LandmarksList.css';

export class LandmarksList extends React.Component {
    render() {
        let list;
        if (this.props.landmarks.length) {
            list = this.props.landmarks.map(
                landmark => {
                    return <li><Landmark key={landmark.id} onClick={this.props.onClick} landmark={landmark}/></li>
                }
            );
        } else {
            list = []
        }
        return <ul className="LandmarksList">{list}</ul>
    }
}
