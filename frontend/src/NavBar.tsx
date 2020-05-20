import React from 'react';
import {AppBar, Typography, Toolbar, Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {AuthenticationService} from "./services";
import {makeStyles} from "@material-ui/core/styles"

function logout() {
    AuthenticationService.logout();
    //this.props.history.push('/');
}

const useStyles = makeStyles(t => ({
    title: {
        flexGrow: 1
    }
}));

const NavBar = () => {
    const session = AuthenticationService.getSession();
    const classes = useStyles();

    let headerStr = "Hola, anónimo";
    let authPart = <div><Typography variant="h6" className={classes.title}><Link to="/login">Login</Link></Typography><Typography variant="h6" className={classes.title}><Link to="/register">Registro</Link></Typography></div>;
    if (session !== null) {
        headerStr = "Hola, " + session.user.username;
        authPart =
            <Typography variant="h6" className={classes.title}>
                <Link to="/" onClick={() => {AuthenticationService.logout();}}>Logout</Link>
            </Typography>;
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {headerStr}
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/">Home</Link>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/twitter">Twitter</Link>
                </Typography>
                {authPart}
                <Typography variant="h6" className={classes.title}>
                    <Link to="/chat">Chat</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default  NavBar;