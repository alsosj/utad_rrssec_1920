import React, {Component} from 'react';
import './App.css';
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import PostList from "./PostList";
import axios from 'axios';
import Chat from "./Chat";
import Twitter from "./Twitter";

class App extends Component {
    state = {
        loggedIn: false
    };
    componentDidMount(): void {
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
        if (localStorage.getItem('session') !== null) {
            axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem("session")}`;
        } else {
            delete(axios.defaults.headers.common['Authorization']);

        }

        axios.get('/api/post/').then((r) => {
            console.log('LOGUEADO!');
            this.setState({loggedIn: true});
        }).catch((e) => {
            console.log('NO LOGUEADO!');

            this.setState({loggedIn: false});
            localStorage.removeItem('session');
            delete(axios.defaults.headers.common['Authorization']);
        });
    }

    render () {
        return (
            <BrowserRouter>
                <NavBar logged_in={this.state.loggedIn}/>
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