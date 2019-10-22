import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';

export class Landmark extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.toggleLandmark(this.props.landmark);
        e.preventDefault();
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography>
                        {this.props.landmark.name}
                    </Typography>
                    <Typography>
                        {this.props.landmark.address}<br/>{this.props.landmark.city}, {this.props.landmark.state} {this.props.landmark.postalCode}
                    </Typography>
                    <Button href="#" variant="contained" onClick={this.handleClick}>{this.props.landmark.isFavorite? 'Unfavorite': 'Favorite'}</Button>
                </CardContent>
            </Card>
        )
    }
}
