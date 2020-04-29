import React, {Component} from "react";
import axios from "axios";

type RegistrationFormProps = {
    on_register: any;
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
        console.log(this.state);
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/user/', this.state).then(r => {
            console.log(r);
        });
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
export default RegistrationForm;