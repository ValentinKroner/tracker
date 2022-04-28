const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const follow = require('./follow')

import {useEffect, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";

import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {IssueForm} from "./issue_form";
import {IssueCardView} from "./issue_list";
import {IssueView} from "./issue_view";

function App() {

    const [appData, setAppData] = useState(null);

    const [users, setUsers] = useState(null);
    const [priorities, setPriorities] = useState(null);
    const [stages, setStages] = useState(null);
    const [projects, setProjects] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    //Initial load calls
    useEffect(() => {
        client({method: 'GET', path: '/api/users'}).done(response => {
            //TODO use auth system when available
            setCurrentUser(response.entity.content[0]);
            setUsers(response.entity.content);
        });
        client({
            method: "GET",
            path: "/api/issuePriorities"
        }).done(response => {
            setPriorities(response.entity.content);
        })
        client({
            method: "GET",
            path: "/api/issueStages"
        }).done(response => {
            setStages(response.entity.content);
        })
        client({
            method: "GET",
            path: "/api/projects"
        }).done(response => {
            setProjects(response.entity.content);
        })
    }, []);

    //Once loads are complete, set appData as single fixed entity
    useEffect(() => {

        if (users == null || priorities == null || stages == null || projects == null)
            return;

        setAppData({
            "users": users,
            "currentUser": currentUser,
            "priorities": priorities,
            "stages": stages,
            "projects": projects,
        })

    }, [users, priorities, stages, projects])


    return (
        appData == null ? <div/> :
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <ButtonHome/>
                        <ButtonNew/>
                    </Toolbar>
                </AppBar>

                <Routes>
                    <Route path="/" element={
                        <IssueCardView
                            appData={appData}
                        />
                    }/>
                    <Route path="issue/:id/view" element={
                        <IssueView appData={appData}/>
                    }/>
                    <Route path="issue/:id/edit" element={
                        <IssueForm appData={appData} mode="edit"/>
                    }/>
                    <Route path="issue/new" element={
                        <IssueForm appData={appData} mode="new"/>
                    }/>
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
        nav("/issue/new")
    }}>New</Button>
}


ReactDOM.render(
    <BrowserRouter><App/></BrowserRouter>,
    document.getElementById('react')
)