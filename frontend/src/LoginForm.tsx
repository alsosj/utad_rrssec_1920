import React, {Component} from "react";
import axios from "axios";
import {AuthenticationService} from "./services";

type LoginFormProps = {
    on_login: any;
    history: any
}

type LoginFormState = {
    username: string;
    password: string;
}

class LoginForm extends Component<LoginFormProps, LoginFormState> {
    state = {
        username: '',
        password: ''
    };

    onSubmit = (event: any) => {
        event.preventDefault();
        AuthenticationService.login(this.state.username, this.state.password).then(() => {
            this.props.history.push('');
        });
    };

    onChangeTextField = (event: any) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name === 'username') {
            this.setState({
                username: value,
            });
        } else if (name === 'password') {
            this.setState({
                password: value,
            });
        }
    };

    render() {
        return (
            <form onSubmit={event => {this.onSubmit(event)}}>
                <input
                    type="text"
                    name="username"
                    onChange={this.onChangeTextField}
                />
                <input
                    type="password"
                    name="password"
                    onChange={this.onChangeTextField}
                />
                <input type="submit"/>
            </form>

        );
    }
}
export default LoginForm;