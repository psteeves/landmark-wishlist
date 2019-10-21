import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { listFavorites } from "../utils";

const user = 'pat2701';

export class Landmark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {favorite_status: 0};
        this.checkFavoriteStatus = this.checkFavoriteStatus.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        const match = await this.checkFavoriteStatus();
        this.setState({favorite_status: match})
    }

    checkFavoriteStatus() {
        return listFavorites(user).then(
            landmarks => {
                return landmarks.landmarks.filter(
                    landmark => landmark.id === this.props.landmark.id
                ).length;
            }
        )
    }

    handleClick(e) {
        this.props.favorite(this.props.landmark);
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
                    <Button href="#" variant="contained" onClick={this.handleClick}>{this.state.favorite_status? 'Unfavorite': 'Favorite'}</Button>
                </CardContent>
            </Card>
        )
    }
}
