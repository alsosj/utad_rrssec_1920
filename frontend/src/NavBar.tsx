import React from 'react';
import {AppBar, Typography, Toolbar, Button} from "@material-ui/core";

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
                <a href="/">Home</a>
                <a href="/login">Login</a>
                <a href="/register">Registro</a>
            </Toolbar>
        </AppBar>
    );
};

export default  NavBar;