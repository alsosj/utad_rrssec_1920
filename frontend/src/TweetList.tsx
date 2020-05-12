import React from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

const THead = (props: any) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Foto</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Contenido</TableCell>
            </TableRow>
        </TableHead>
    );
};

const TBody = (props: any) => {
    let {data} = props;

    data = data.map((e: any, i: number) => {
        return (
            <TableRow key={e.id}>
                <TableCell><img src={e.user.profile_image_url} alt='Avatar'/> </TableCell>
                <TableCell>{e.user.name}</TableCell>
                <TableCell>{e.created_at}</TableCell>
                <TableCell>{e.text}</TableCell>
            </TableRow>
        );
    });


    return (
        <TableBody>
            {data}
        </TableBody>
    );
};

const TweetList = (props: any) => {
    const { data, on_click_delete } = props;

    return (
        <Table>
            <THead/>
            <TBody data={data} />
        </Table>
    );

};
export default TweetList;