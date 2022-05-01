import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

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

            <Container sx={{padding: 1}}>
                <Paper sx={{padding: 1, marginBottom: 1}}>
                    <Grid direction={"column"} container gap={2}>
                        <div>
                            <Chip size="small" label={"Priority: " + issue.priority.description}
                                  sx={{marginRight: 1, background: issue.priority.color}}/>
                            <Chip variant="outlined" size="small" label={"Stage: " + issue.stage.description}/>
                        </div>

                        <Typography variant="h5" sx={{height: "3em"}}>{issue.title}</Typography>

                        <div>
                            <Typography variant="subtitle2">Project</Typography>
                            <Typography>{issue.project.name}</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2">Assignee</Typography>
                            <Typography>{issue.assignee.firstName + " " + issue.assignee.lastName}</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2">Issue Description</Typography>
                            <Typography>{issue.description}</Typography>
                        </div>
                    </Grid>
                </Paper>


                <Grid direction={"row"} container gap={2}>
                    <Button variant={"contained"} onClick={() => {
                        nav("/issue/" + issue.id + "/edit/")
                    }}>Edit</Button>
                    <Button variant={"contained"} onClick={() => {
                        client({
                            method: "DELETE",
                            path: "/api/issues/" + searchParams.id
                        }).done(response => {
                            nav("/")
                        })
                    }}>Delete</Button>
                </Grid>
            </Container>
    )

}