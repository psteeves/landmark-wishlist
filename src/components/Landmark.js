import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import './Landmark.css';

export class Landmark extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick(this.props.landmark);
        e.preventDefault();
    }

    render() {
        return (
            <div className="Landmark-card">
            <Card>
                <CardContent>
                    <Typography>
                        {this.props.landmark.name}
                    </Typography>
                    <Typography>
                        {this.props.landmark.address}<br/>{this.props.landmark.city}, {this.props.landmark.state} {this.props.landmark.postalCode}
                    </Typography>
                    <div className="Favorite-button"><Button href="#" variant="contained" onClick={this.handleClick}>{this.props.landmark.isFavorite? 'Unfavorite': 'Favorite'}</Button></div>
                </CardContent>
            </Card>
            </div>
        )
    }
}
