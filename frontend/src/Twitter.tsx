import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import TweetList from "./TweetList";

class Twitter extends Component {

    state = {
        tweets: [],
        tf_query: '',
    };

    componentDidMount(): void {

    }


    onChangeTextField = (event: any) => {
        let id = event.target.id;
        let value = event.target.value;

        this.setState({
            [id]: value,
        });
    };

    render () {
        console.log(this.state);
        return (
            <div>
                <TweetList data={this.state.tweets}/>
                <form noValidate autoComplete="off">
                    <TextField id="tf_query" label="Query" onChange={this.onChangeTextField}/>
                </form>
                <Button variant="contained" color="primary" onClick={() => {
                    // Enviar los datos al servidor
                    // Recopilar los datos

                    // Petición
                    axios.post('/twitter/', {
                        action: 'search',
                        payload: {query: this.state.tf_query}
                    }).then(r => {
                        console.log(r);
                        this.setState({tweets: r.data.statuses})
                    });

                }}>
                    Buscar
                </Button>
            </div>
        );
    }
}

export default Twitter;