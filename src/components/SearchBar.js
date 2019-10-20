import React from 'react';
import { TextField, Button } from '@material-ui/core';


export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: ""};
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSearch(e) {
        this.props.search(this.state.searchTerm);
        e.preventDefault();
    }

    handleChange(e) {
        this.setState({searchTerm: e.target.value});
    }

    render() {
        return (
            <React.Fragment>
              <TextField onChange={this.handleChange} style={{width: 500}} variant="outlined" placeholder="Search by Location"/>
              <br/>
              <Button variant="contained" onClick={this.handleSearch}>Search</Button>
            </React.Fragment>
        );
    }
}
