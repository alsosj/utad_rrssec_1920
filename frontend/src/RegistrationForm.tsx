import React, {Component} from "react";
import axios from "axios";
import {AuthenticationService} from "./services";

type RegistrationFormProps = {
    on_register: any;
    history: any;
}

type RegistrationFormState = {
    username: string;
    password: string;
}

class RegistrationForm extends Component<RegistrationFormProps, RegistrationFormState> {
    state = {
        username: '',
        password: ''
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


    onSubmit = (event: any) => {
        event.preventDefault();
        AuthenticationService.register(this.state.username, this.state.password).then(() => {
            AuthenticationService.login(this.state.username, this.state.password).then(() => {
                this.props.history.push('');
            });
        });};


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
export default RegistrationForm;