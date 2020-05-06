import React from 'react';
import {AppBar, Typography, Toolbar, Button} from "@material-ui/core";
import {Link} from "react-router-dom";

type NavBarProps = {
    logged_in: boolean;
}

const NavBar = (props: NavBarProps) => {

  let { logged_in } = props;
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    {
                        logged_in ? 'Hola, ' + localStorage.getItem('username') : 'Hola anónimo'
                    }
                </Typography>
                <Link to="/">Home</Link>
                <Link to="/twitter">Twitter</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Registro</Link>
                <Link to="/chat">Chat</Link>
            </Toolbar>
        </AppBar>
    );
};

export default  NavBar;