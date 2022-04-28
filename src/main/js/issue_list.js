import {Button, Grid, Toolbar} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const React = require('react');
const client = require('./client');
const follow = require('./follow')

export function IssueCardView(props) {

    const [view, setView] = useState("stage")
    const [ordering, setOrdering] = useState("priority.value")

    let references = view === "stage" ? props.appData.stages : props.appData.priorities;
    let issueTracks = references.map(
        ref => <IssueTrack key={ref.id} appData={props.appData} filter={view} filterReference={ref} ordering={ordering}/>
    );

    return (
        <div>
            <Toolbar>
                <Button variant="outlined" onClick={() => {
                    setView("stage");
                    setOrdering("priority.value");
                }}>Sort: Stage</Button>
                <Button variant="outlined" onClick={() => {
                    setView("priority");
                    setOrdering("stage.ordinal");
                }}>Sort: Priority</Button>
            </Toolbar>
            {issueTracks}
        </div>
    )
}


export function IssueTrack(props) {

    const [issues, setIssues] = useState([]);

    useEffect(() => {

        let path = `/api/issues?assignee=${props.appData.currentUser.id}&${props.filter}=${props.filterReference.id}&sort=${props.ordering}`

        client({method: 'GET', path: path}).done(response => {
            setIssues(response.entity.content);
        });
    }, [props.filter, props.appData, props.filterReference, props.ordering]);

    let issueCards = issues.map(issue =>
        <IssueCard key={issue.id} issue={issue}/>
    );

    return (
        <div>
            <Chip variant="outlined" label={props.filterReference.description}/>
            <Grid container spacing={2} padding={2}
                  alignItems="stretch"
            >
                {issueCards}
            </Grid>
        </div>
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
