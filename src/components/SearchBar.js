import React from 'react';
import './SearchBar.css';
import { TextField, Button, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';


export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: "", searchSection: "food"};
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSectionChange = this.handleSectionChange.bind(this);
    }

    handleSearch(e) {
        this.props.search(this.state.searchTerm, this.state.searchSection);
        e.preventDefault();
    }

    handleTextChange(e) {
        this.setState({searchTerm: e.target.value});
    }

    handleSectionChange(e) {
        this.setState({searchSection: e.target.value})
    }

    render() {
        return (
            <React.Fragment>
              <TextField onChange={this.handleTextChange} style={{width: 500}} variant="outlined" placeholder="Where ya off to?"/>
              <br/>
              <div className="Search-section">
              <RadioGroup row name="search-section" value={this.state.searchSection} onChange={this.handleSectionChange}>
                <FormControlLabel control={<Radio color="primary"/>} value={'food'} label={'Food'} labelPlacement={'top'}/>
                <FormControlLabel control={<Radio color="primary"/>} value={'drinks'} label={'Drinks'} labelPlacement={'top'}/>
                <FormControlLabel control={<Radio color="primary"/>} value={'outdoors'} label={'Outdoors'} labelPlacement={'top'}/>
              </RadioGroup>
              </div>
              <div className="Search-button">
                <Button variant="contained" onClick={this.handleSearch}>Search</Button>
              </div>
            </React.Fragment>
        );
    }
}
