import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const React = require('react');
const client = require('./client');
const follow = require('./follow')

export function IssueList(props) {

    const [issues, setIssues] = useState([]);
    const [view, setView] = useState("by_stage")

    useEffect(() => {
        client({method: 'GET', path: "/api/issues?assignee=" + props.appData.currentUser.id}).done(response => {
            setIssues(response.entity.content);
        });
    }, []);

    let issueCards = issues.map(issue =>
        <IssueCard key={issue.id} issue={issue}/>
    );
    return (
        <Grid container spacing={2} padding={2}
              alignItems="stretch"
        >
            {issueCards}
        </Grid>
    )
}

export function IssueCard(props) {

    const nav = useNavigate();

    return (
        <Grid item>
            <Card sx={{maxWidth: 345}} onClick={() => {
                nav("/issue/" + props.issue.id + "/view")
            }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.issue.title}
                    </Typography>

                    <Typography component="div">
                        <Chip label={props.issue.priority.description} sx={{background: props.issue.priority.color}}/>
                        <Chip variant="outlined" label={props.issue.stage.description}/>
                    </Typography>

                    <Typography component="div">
                        Assignee: {props.issue.assignee.firstName + " " + props.issue.assignee.lastName}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
