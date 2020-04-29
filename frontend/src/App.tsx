import React, {Component} from 'react';
import './App.css';
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import PostList from "./PostList";
import axios from 'axios';
import Chat from "./Chat";

class App extends Component {
    componentDidMount(): void {
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    }

    render () {
        return (
            <BrowserRouter>
                <NavBar logged_in={localStorage.getItem("username") !== null}/>
                <Switch>
                    <Route path="/register" component={RegistrationForm}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/" component={PostList}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;