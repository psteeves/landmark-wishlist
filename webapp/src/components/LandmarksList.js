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
        return (
            <div>
                <h3 className="Landmarks-list-title">{this.props.title}</h3>
                <ul className="Landmarks-list">{list}</ul>
            </div>
        )
    }
}
