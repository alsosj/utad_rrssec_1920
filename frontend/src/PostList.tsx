import React, {Component} from 'react';
import './App.css';
import Tabla from './Tabla';
import axios from 'axios';
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

let config = {
    headers: {
        Authorization: `JWT ${localStorage.getItem("session")}`
    }
};
class PostList extends Component {

    state = {
        posts: [],
        tf_title: '',
        tf_content: '',
    };

    componentDidMount(): void {

        console.log(axios.defaults);
        axios.get('/api/post/', config).then((r) => {
            console.log(r);
            this.setState({
                posts: r.data,
            });
        });
    }


    onChangeTextField = (event: any) => {
        let id = event.target.id;
        let value = event.target.value;

        this.setState({
            [id]: value,
        });
    };

    onDeletePost = (postId: number) => {
        axios.delete('/api/post/' + postId +'/', config).then(r => {
            if (r.status === 200) {
                const new_posts = this.state.posts.filter((p: any) => {
                    return p.id !== postId;
                });

                this.setState({
                    posts: new_posts
                });
            }
        });
    };

    render () {
        return (
            <div>
                <Tabla data={this.state.posts} on_click_delete={this.onDeletePost}/>
                <form noValidate autoComplete="off">
                    <TextField id="tf_title" label="Title" onChange={this.onChangeTextField}/>
                    <TextField id="tf_content" label="Content" onChange={this.onChangeTextField} />
                </form>
                <Button variant="contained" color="primary" onClick={() => {
                    // Enviar los datos al servidor
                    // Recopilar los datos

                    // Petición
                    axios.post('/api/post/', {
                        title: this.state['tf_title'],
                        content: this.state['tf_content']
                    }, config).then(r => {
                        console.log(r);
                        this.setState({
                            posts: [...this.state.posts, r.data]
                        });
                    });
                }}>
                    Publicar
                </Button>
            </div>
        );
    }
}

export default PostList;