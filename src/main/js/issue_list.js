import {Button, Container, Grid, Toolbar} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const React = require('react');
const client = require('./client');
const follow = require('./follow')

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";

export function IssueCardView(props) {

    const [view, setView] = useState("stage")
    const [ordering, setOrdering] = useState("priority.value")
    const [reload, setReload] = useState(false)

    function refreshView() {
        setReload(!reload);
    }

    let references = view === "stage" ? props.appData.stages : props.appData.priorities;
    let issueTracks = references.map(
        ref => <IssueTrack
            key={ref.id}
            appData={props.appData}
            filter={view}
            refreshView={refreshView}
            reload={reload}
            filterReference={ref}
            ordering={ordering}
        />
    );


    return (
        <Container>
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

            <Container sx={{paddingLeft: -2}}>
                {issueTracks}
            </Container>
        </Container>
    )
}


export function IssueTrack(props) {

    const [issues, setIssues] = useState([]);

    function reloadIssues() {
        let path = `/api/issues?assignee=${props.appData.currentUser.id}&${props.filter}=${props.filterReference.id}&sort=${props.ordering}`
        client({method: 'GET', path: path}).done(response => {
            setIssues(response.entity.content);
        });
    }

    useEffect(() => {
        reloadIssues();
    }, [props.filter, props.appData, props.filterReference, props.ordering, props.reload]);

    let issueCards = issues.map(issue =>
        <IssueCard key={issue.id} issue={issue} refreshView={props.refreshView}/>
    );

    return (
        <div>
            <Chip variant="outlined"
                  label={props.filter.charAt(0).toUpperCase() + props.filter.slice(1) + ": " + props.filterReference.description}
                  sx={{background: props.filterReference.color}}
            />
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

    const [menuAnchor, setMenuAnchor] = useState(null);

    function advanceStage(e) {
        client({
            path: "/api/issues/advance/" + props.issue.id,
            method: "GET"
        }).then((response) => {
            props.refreshView();
        });
        setMenuAnchor(null);
    }

    function revertStage(e) {
        client({
            path: "/api/issues/revert/" + props.issue.id,
            method: "GET"
        }).then((response) => {
            props.refreshView();
        });
        setMenuAnchor(null);
    }

    function openMenu(e) {
        setMenuAnchor(e.target);
    }

    function closeMenu(e) {
        setMenuAnchor(null);
    }

    function viewIssue(e) {
        nav("/issue/" + props.issue.id + "/view");
    }

    return (
        <Grid item>
            <Card sx={{width: 300}}>
                <CardContent>

                    <Grid container rowSpacing={1}>

                        <Grid item container direction="row">
                            <Grid item>
                                <Chip size="small" label={props.issue.priority.description}
                                      sx={{marginRight: 1, width: 90, background: props.issue.priority.color}}
                                />
                            </Grid>
                            <Grid item>
                                <Chip variant="outlined" size="small" label={props.issue.stage.description}
                                      sx={{width: 90}}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={openMenu}><MenuIcon></MenuIcon></IconButton>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Typography variant="h6" sx={{height: "4em"}} onClick={viewIssue}>
                                {props.issue.title}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography>
                                Assignee: {props.issue.assignee.firstName + " " + props.issue.assignee.lastName}
                            </Typography>
                        </Grid>

                    </Grid>

                </CardContent>

                <Menu
                    open={menuAnchor != null}
                    anchorEl={menuAnchor}
                    onClose={closeMenu}
                    keepMounted
                >
                    <MenuItem onClick={viewIssue}>
                        View Issue
                    </MenuItem>
                    <MenuItem onClick={advanceStage}>
                        Next Stage
                    </MenuItem>
                    <MenuItem onClick={revertStage}>
                        Previous Stage
                    </MenuItem>
                </Menu>

            </Card>
        </Grid>
    )
}
