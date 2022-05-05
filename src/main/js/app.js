import {Container} from "@mui/material";

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const follow = require('./follow')

import {useEffect, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';

import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {IssueForm} from "./issue_form";
import {IssueCardView} from "./issue_list";
import {IssueView} from "./issue_view";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function App() {

    const [appData, setAppData] = useState(null);

    const [projects, setProjects] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);

    const [users, setUsers] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        client({
            method: "GET",
            path: "/api/projects"
        }).done(response => {
            setProjects(response.entity.content);
            setCurrentProject(response.entity.content[0]);
        });
        client({method: 'GET', path: '/api/users'}).done(response => {
            setUsers(response.entity.content);
        });
        client({method: 'GET', path: '/api/users/current'}).done(response => {
            setCurrentUser(response.entity);
        });
    }, []);

    //Once loads are complete, set appData as single fixed entity
    useEffect(() => {

        if (users == null || currentUser == null || currentProject == null || projects == null)
            return;

        setAppData({
            "users": users,
            "currentUser": currentUser,
            "currentProject": currentProject,
            "projects": projects,
        })

    }, [users, currentUser, currentProject, projects])

    return (
        appData == null ? <div/> :
            <div style={{marginBottom:100}}>
                <AppBar position="static" sx={{marginBottom: 4}}>
                    <Toolbar>
                        <Container>
                            <Grid container sx={{columnGap: 1}}>
                                <ButtonHome/>
                                <ButtonNew/>
                                <Grid item sx={{flexGrow: 1}}></Grid>
                                <ProjectSelect appData={appData} setCurrentProject={setCurrentProject}/>
                            </Grid>
                        </Container>
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

function ProjectSelect(props) {
    return <FormControl required>
        <InputLabel sx={{color: "inherit"}}>Project</InputLabel>
        <Select
            sx={{minWidth: 150, height: "2.5em", color: "inherit", borderColor: 'inherit'}}
            required
            id="stage"
            label="Stage"
            value={props.appData.currentProject}
            onChange={(e) => {
                props.setCurrentProject(e.target.value)
            }}
        >
            {props.appData.projects.map(project => <MenuItem size="small" key={project.id}
                                                             value={project}>{project.name}</MenuItem>)}
        </Select>
    </FormControl>
}

function ButtonHome() {

    const nav = useNavigate();
    return <Button variant="outlined" color="inherit" onClick={() => {
        nav("/")
    }}><HomeIcon/></Button>
}

function ButtonNew() {

    const nav = useNavigate();
    return <Button
        variant="outlined" color="inherit" onClick={() => {
        nav("/issue/new")
    }}
    >
        <AddBoxIcon></AddBoxIcon>
        New
    </Button>
}


ReactDOM.render(
    <BrowserRouter><App/></BrowserRouter>
    ,
    document.getElementById('react')
)