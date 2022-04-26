import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const React = require('react');
const client = require('./client');
const follow = require('./follow')


export function IssueView() {

    const nav = useNavigate();
    const searchParams = useParams();
    const [issue, setIssue] = useState(null)

    useEffect(() => {
        client({
            method: "GET",
            path: "/api/issues/" + searchParams.id
        }).done(response => {
            setIssue(response.entity);
        })
    }, [searchParams])

    return (
        issue == null ? <div></div> :
            <Container>
                <Paper>
                    <Typography variant="h5">{issue.title}</Typography>
                    <Typography>{issue.description}</Typography>
                </Paper>
                <Button onClick={() => {
                    nav("/issue/" + issue.id + "/edit/")
                }}>Edit</Button>
                <Button onClick={() => {
                    client({
                        method: "DELETE",
                        path: "/api/issues/" + searchParams.id
                    }).done(response => {
                        nav("/")
                    })
                }}>Delete</Button>
            </Container>
    )

}