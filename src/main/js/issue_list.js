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

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pagination from "@mui/material/Pagination";

export function IssueCardView(props) {

    const [view, setView] = useState("stage")
    const [ordering, setOrdering] = useState("priority.value,desc")
    const [reload, setReload] = useState(false)

    const [priorities, setPriorities] = useState(null);
    const [stages, setStages] = useState(null);

    const [tracks, setTracks] = useState(null);

    useEffect(() => {
        if (props.appData.currentProject == null)
            return;

        client({
            method: "GET",
            path: "/api/issuePriorities?project=" + props.appData.currentProject.id
        }).done(response => {
            setPriorities(response.entity.content);
        });

        client({
            method: "GET",
            path: "/api/issueStages?project=" + props.appData.currentProject.id
        }).done(response => {
            setStages(response.entity.content);
        });
    }, [props.appData.currentProject]);

    useEffect(() => {
        if(stages == null || priorities == null)
            return;
        let references = view === "stage" ? stages : priorities;
        references = references.filter(ref => {
            return ref.hiddenByDefault !== true
        }).map(
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
        setTracks(references);
    }, [priorities, stages, reload])

    function refreshView() {

        console.log("yep");
        setReload(!reload);
    }

    return (
        <Container>
            <Grid container gap={1} sx={{marginBottom: 2, marginTop: 2}}>
                <Button variant="outlined" onClick={() => {
                    setView("stage");
                    setOrdering("priority.value,desc");
                }}>Sort: Stage</Button>
                <Button variant="outlined" onClick={() => {
                    setView("priority");
                    setOrdering("stage.ordinal");
                }}>Sort: Priority</Button>
            </Grid>

            <Grid container direction={"column"} gap={4}>
                {tracks}
            </Grid>
        </Container>
    )
}


export function IssueTrack(props) {

    const [issues, setIssues] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    function reloadIssues() {
        let path = `/api/issues?assignee=${props.appData.currentUser.id}&` +
            `${props.filter}=${props.filterReference.id}&` +
            `hidden=false&` +
            `sort=${props.ordering}&page=${currentPage - 1}&size=${pageSize}`
        client({
            method: 'GET',
            path: path
        }).done(response => {
            setIssues(response.entity.content);
            setTotalPages(response.entity.totalPages);
        });
    }

    useEffect(() => {
        reloadIssues();
    }, [props.filter, props.appData, props.filterReference, props.ordering, props.reload, currentPage, pageSize]);

    let issueCards = issues.map(issue =>
        <IssueCard key={issue.id} issue={issue} refreshView={props.refreshView}/>
    );

    function handlePagination(event, value) {
        setCurrentPage(value)
    }

    return (
        <Grid container gap={1}>
            <Chip variant="outlined"
                  label={props.filter.charAt(0).toUpperCase() + props.filter.slice(1) + ": " + props.filterReference.description}
                  sx={{background: props.filterReference.color}}
            />
            <Grid container spacing={2} gap={1}
                  alignItems="stretch"
            >
                {issueCards}
            </Grid>
            <Pagination count={totalPages} page={currentPage} siblingCount={3} onChange={handlePagination}/>
        </Grid>
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

    function increasePriority(e) {
        client({
            path: "/api/issues/increase/" + props.issue.id,
            method: "GET"
        }).then((response) => {
            props.refreshView();
        });
        setMenuAnchor(null);
    }

    function decreasePriority(e) {
        client({
            path: "/api/issues/decrease/" + props.issue.id,
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

    function editIssue(e) {
        nav("/issue/" + props.issue.id + "/edit");
    }

    return (
        <Grid item>
            <Card sx={{width: 250}}>
                <CardContent>

                    <Grid container rowSpacing={1}>

                        <Grid item container direction="row">
                            <Grid item>
                                <Chip size="small" label={props.issue.priority.description}
                                      sx={{marginRight: 1, width: 70, background: props.issue.priority.color}}
                                />
                            </Grid>
                            <Grid item>
                                <Chip variant="outlined" size="small" label={props.issue.stage.description}
                                      sx={{width: 70}}
                                />
                            </Grid>
                            <Grid item container justifyContent="flex-end" sx={{width: 70, marginTop: -1}}>
                                <IconButton onClick={openMenu}><MoreVertIcon></MoreVertIcon></IconButton>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Typography variant={"h6"} sx={{height: "3em", fontSize: "1em", cursor: "pointer",}}
                                        onClick={viewIssue}>
                                {props.issue.title}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography variant={"body2"}>
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
                    <MenuItem onClick={editIssue}>
                        Edit Issue
                    </MenuItem>
                    <MenuItem onClick={advanceStage}>
                        Next Stage
                    </MenuItem>
                    <MenuItem onClick={revertStage}>
                        Previous Stage
                    </MenuItem>
                    <MenuItem onClick={increasePriority}>
                        Increase Priority
                    </MenuItem>
                    <MenuItem onClick={decreasePriority}>
                        Decrease Priority
                    </MenuItem>
                </Menu>

            </Card>
        </Grid>
    )
}
