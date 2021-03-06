import Select from "@mui/material/Select";

const React = require('react');
const client = require('./client');

import {useNavigate, useParams} from "react-router-dom";
import {Stack, TextField, Typography} from "@mui/material";
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

    const [priorities, setPriorities] = useState(null);
    const [stages, setStages] = useState(null);

    //Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [stage, setStage] = useState("");
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


    useEffect(() => {
        if (project == null)
            return;

        client({
            method: "GET",
            path: "/api/issuePriorities?project=" + project.id
        }).done(response => {
            setPriorities(response.entity.content);
        });

        client({
            method: "GET",
            path: "/api/issueStages?project=" + project.id
        }).done(response => {
            setStages(response.entity.content);
        });
    }, [project]);

    function resolveById(id, collection) {
        let filtered = collection.filter((a) => {
            return a.id === id
        });
        return filtered.length > 0 ? filtered[0] : null;
    }

    useEffect(() => {
        if (issueExtant == null)
            return;
        setTitle(issueExtant.title);
        setDescription(issueExtant.description);

        setAssignee(resolveById(issueExtant.assignee.id, props.appData.users));
        setProject(resolveById(issueExtant.project.id, props.appData.projects));
        setPriority(resolveById(issueExtant.priority.id, priorities));
        setStage(resolveById(issueExtant.stage.id, stages));
    }, [issueExtant, stages, priorities]);

    function handleSubmit(e) {
        e.preventDefault();

        let issueData = {
            "description": description,
            "title": title,
            "assignee": assignee,
            "priority": priority,
            "project": project
        }

        if (props.mode === "edit") {
            issueData.id = issueExtant.id;
            issueData.stage = stage;
        }

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
        (priorities == null || stages == null) ? <div></div> :
        <Container>
            <Stack
                spacing={1}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography variant={"h4"}>{issueExtant == null ? "New Issue" : "Editing"}</Typography>
                <TextField
                    required
                    id="title"
                    label="Issue Title"
                    value={title}
                    inputProps={{maxLength: 40}}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />

                <Grid container sx={{gap: 1}}>

                    <FormControl required sx={{flexGrow: 1, minWidth: 250}}>
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


                    <FormControl required sx={{flexGrow: 1, minWidth: 250}}>
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
                            {priorities.map(priority => <MenuItem key={priority.id}
                                                                                value={priority}>{priority.description}</MenuItem>)}
                        </Select>
                    </FormControl>

                    {props.mode === "edit" ?
                        <FormControl required
                                     sx={{flexGrow: 1, minWidth: 250}}>
                            <InputLabel>Stage</InputLabel>
                            <Select
                                required
                                id="stage"
                                label="Stage"
                                value={stage}
                                onChange={(e) => {
                                    setStage(e.target.value)
                                }}
                            >
                                {stages.map(stage => <MenuItem key={stage.id}
                                                                             value={stage}>{stage.description}</MenuItem>)}
                            </Select>
                        </FormControl> : <div></div>
                    }

                    <FormControl required sx={{flexGrow: 1, minWidth: 250}}>
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

                <Button variant="contained" sx={{width: 100}} onClick={handleSubmit}>
                    Submit
                </Button>
            </Stack>
        </Container>
    )

}