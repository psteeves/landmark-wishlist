import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './AuthForm.css';

export class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', error_message: '', success: false};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSwitchPurpose = this.handleSwitchPurpose.bind(this);
        this.validateInputFields = this.validateInputFields.bind(this);
        this.error_displays = {
            register: 'Please pick a different username',
            login: 'Invalid username or password'
        };
    }

    handleUsernameChange(e) {
        const username = e.target.value;
        this.setState({username: username})
    }

    handlePasswordChange(e) {
        const password = e.target.value;
        this.setState({password: password})
    }

    validateInputFields() {
        if (this.props.purpose === 'register') {
            if (this.state.username.length < 8) {
                this.setState({error_message: 'Usernames must be at least 8 characters'});
                return false;
            } else if (this.state.password.length < 8) {
                this.setState({error_message: 'Choose a password that\'s at least 8 characters'});
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    handleClick(e) {
        this.setState({error_message: ''});
        if (this.validateInputFields()) {
            this.props.authenticate(this.state.username, this.state.password).then(
                response => {
                    if ('error' in response) {
                        this.setState({error_message: this.error_displays[this.props.purpose]});
                    } else {
                        if (this.props.purpose === 'register') {
                            this.props.switchAuth();
                        } else {
                            console.log('Logged in!');
                            this.setState({success: true})
                        }
                    }
                }
            )
        }
    }

    handleSwitchPurpose(e) {
        this.props.switchAuth();
        this.setState({error_message: ''})
    }

    render() {
        const success = this.state.success;
        if (success) {
            return <Redirect to={"/"}/>
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5">
                        {this.props.purpose === 'login' ? 'Sign in' : 'Register'}
                    </Typography>
                    <form noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            onChange={this.handleUsernameChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={this.handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            href="#"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.handleClick}
                        >
                            {this.props.purpose === 'register' ? 'Register' : 'Login'}
                        </Button>
                        <div className="Error-message">
                            <Typography>{this.state.error_message}</Typography>
                        </div>
                    </form>
                    <div className="Switch-auth">
                        <Button size="small" href="#" onClick={this.handleSwitchPurpose}>
                            {this.props.purpose === 'register' ? 'Already have an account? Login!' : 'Need to register?'}
                        </Button>
                    </div>
                </Container>
            );
        }
    };
}