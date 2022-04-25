
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const follow = require('./follow')

import {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";

import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {IssueForm} from "./issue_form";
import {IssueCard} from "./issue_list";

function App() {

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        client({method: 'GET', path: '/api/users'}).done(response => {
            setUsers(response.entity.content);
            //TODO use auth system when available
            setCurrentUser(response.entity.content[0]);
        });
    }, [])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <ButtonHome></ButtonHome>
                    <ButtonNew></ButtonNew>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={
                    <IssueList
                        users={users}
                        currentUser={currentUser}
                    />
                }></Route>
                <Route path="new" element={
                    <IssueForm mode="new"></IssueForm>
                }></Route>
            </Routes>

        </div>
    )
}

function ButtonHome() {

    const nav = useNavigate();
    return <Button color="inherit" onClick={() => {
        nav("/")
    }}>Home</Button>
}

function ButtonNew() {

    const nav = useNavigate();
    return <Button color="inherit" onClick={() => {
        nav("new")
    }}>New</Button>
}

function IssueList(props) {

    const [issues, setIssues] = useState([]);
    const [view, setView] = useState("by_stage")

    useEffect(() => {
        if (props.currentUser.id == null) {
            setIssues([]);
            return;
        }

        client({method: 'GET', path: "/api/issues?assignee=" + props.currentUser.id}).done(response => {
            setIssues(response.entity.content);
        });
    }, [props.currentUser])

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


ReactDOM.render(
    <BrowserRouter><App/></BrowserRouter>,
    document.getElementById('react')
)