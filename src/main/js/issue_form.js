import Select from "@mui/material/Select";

const React = require('react');
const client = require('./client');

import {useNavigate, useParams} from "react-router-dom";
import {Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export function IssueForm(props) {

    const [issueExtant, setIssueExtant] = useState(null);
    const nav = useNavigate();
    const params = useParams();

    //Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");
    const [project, setProject] = useState("");

    useEffect(() => {

        if (props.mode === "edit") {
            client({
                method: "GET",
                path: "/api/issues/" + params.id
            }).done(response => {
                setIssueExtant(response.entity)
            })
        }

    }, [])

    function resolveById(id, collection) {
        let filtered = collection.filter((a) => {
            return a.id === id
        });

        console.log(filtered);
        return filtered.length > 0 ? filtered[0] : null;
    }

    useEffect(() => {
        if (issueExtant == null)
            return;
        setTitle(issueExtant.title);
        setDescription(issueExtant.description);

        setAssignee(resolveById(issueExtant.assignee.id, props.appData.users));
        setPriority(resolveById(issueExtant.priority.id, props.appData.priorities));
        setProject(resolveById(issueExtant.project.id, props.appData.projects));
    }, [issueExtant]);

    function handleSubmit(e) {
        e.preventDefault();

        let issueData = {
            "description": description,
            "title": title,
            "assignee": assignee,
            "priority": priority,
            "project": project
        }

        if (props.mode === "edit")
            issueData.id = issueExtant.id

        client({
            method: props.mode === "new" ? "POST" : "PUT",
            path: "/api/issues",
            entity: issueData,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            nav("/");
        });
    }

    return (

        <Container>
            <Stack
                spacing={1}
                padding={1}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    required
                    id="title"
                    label="Issue Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />

                <Grid container sx={{gap: 1}}>

                    <FormControl required sx={{flexGrow: 1, minWidth:250}}>
                        <InputLabel>Project</InputLabel>
                        <Select
                            required
                            id="project"
                            label="Project"
                            value={project}
                            onChange={(e) => {
                                setProject(e.target.value)
                            }}
                        >
                            {props.appData.projects.map(project => <MenuItem key={project.id}
                                                                             value={project}>{project.name}</MenuItem>)}
                        </Select>
                    </FormControl>


                    <FormControl required sx={{flexGrow: 1, minWidth:250}}>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            required
                            id="priority"
                            label="Priority"
                            value={priority}
                            onChange={(e) => {
                                setPriority(e.target.value)
                            }}
                        >
                            {props.appData.priorities.map(priority => <MenuItem key={priority.id}
                                                                                value={priority}>{priority.description}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl required sx={{flexGrow: 1, minWidth:250}}>
                        <InputLabel>Assignee</InputLabel>
                        <Select
                            required
                            id="assignee"
                            label="Assignee"
                            value={assignee}
                            onChange={(e) => {
                                setAssignee(e.target.value)
                            }}
                        >
                            {props.appData.users.map(user => <MenuItem key={user.id}
                                                                       value={user}>{user.firstName} {user.lastName}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>

                <TextField
                    required
                    id="description"
                    label="Issue Description"
                    value={description}
                    multiline
                    maxRows={20}
                    minRows={20}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                />

                <Button variant="contained" sx={{width:100}} onClick={handleSubmit}>
                    Submit
                </Button>
            </Stack>
        </Container>
    )

}