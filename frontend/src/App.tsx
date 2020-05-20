import React, {Component} from 'react';
import './App.css';
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import PostList from "./PostList";
import axios from 'axios';
import {AuthenticationService} from "./services";
import Chat from "./Chat";
import Twitter from "./Twitter";

class App extends Component {
    state = {
        user: null
    };
    componentDidMount(): void {
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    }

    render () {
        return (
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route path="/register" component={RegistrationForm}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/twitter" component={Twitter}/>
                    <Route path="/" component={PostList}/>
                </Switch>
            </BrowserRouter>
        );
    }
}



export default App;