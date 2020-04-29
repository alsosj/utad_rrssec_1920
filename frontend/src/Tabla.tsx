import React from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

const THead = (props: any) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Contenido</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Borrar</TableCell>
            </TableRow>
        </TableHead>
    );
};

const TBody = (props: any) => {
    let {posts, on_click_delete} = props;

    posts = posts.map((post: any, i: number) => {
        return (
            <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.author.username}</TableCell>
                <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => {on_click_delete(post.id)}}>
                        Borrar
                    </Button>
                </TableCell>
            </TableRow>
        );
    });


    return (
        <TableBody>
            {posts}
        </TableBody>
    );
};

const Tabla = (props: any) => {
    const { data, on_click_delete } = props;

    return (
        <Table>
            <THead/>
            <TBody posts={data} on_click_delete={on_click_delete} />
        </Table>
    );

};
export default Tabla;