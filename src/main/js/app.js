
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
import {IssueList} from "./issue_list";
import {IssueView} from "./issue_view";

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
                <Route path="issue/:id/view" element={
                    <IssueView></IssueView>
                }></Route>
                <Route path="issue/:id/edit" element={
                    <IssueForm mode="edit"></IssueForm>
                }></Route>
                <Route path="issue/new" element={
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
        nav("/issue/new")
    }}>New</Button>
}


ReactDOM.render(
    <BrowserRouter><App/></BrowserRouter>,
    document.getElementById('react')
)