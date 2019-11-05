import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
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
        const image_path = `./${this.props.landmark.category}_landmark_pic.jpeg`;
        return (
            <div className="Landmark-card">
            <Card>
                <CardMedia
                  component="img"
                  alt="Landmark Image"
                  height="140"
                  image={require (image_path)}
                  title="Landmark Image"
                  style={{ height: 80, paddingTop: '0%'}}
                />
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
