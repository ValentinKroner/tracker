import Select from "@mui/material/Select";

const React = require('react');
const client = require('./client');

import {useNavigate, useParams} from "react-router-dom";
import {Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";

export function IssueForm(props) {

    const [issueExtant, setIssueExtant] = useState(null);
    const nav = useNavigate();
    const params = useParams();

    //Selection options
    const [priorities, setPriorities] = useState([]);
    const [stages, setStages] = useState([]);
    const [users, setUsers] = useState([]);

    //Form state
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[assignee, setAssignee] = useState("");
    const[priority, setPriority] = useState("");

    useEffect(() => {
        client({
            method: "GET",
            path: "/api/users"
        }).done(response => {
            setUsers(response.entity.content);
        })
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

        if(props.mode === "edit") {
            client({
                method: "GET",
                path: "/api/issues/" + params.id
            }).done(response => {
                setIssueExtant(response.entity)
            })
        }

    }, [])


    useEffect(() => {
        if(issueExtant == null)
            return;
        setTitle(issueExtant.title);
        setDescription(issueExtant.description);
        setAssignee(issueExtant.assignee.id);
        setPriority(issueExtant.priority.id);
    }, [issueExtant]);

    function handleSubmit(e) {
        e.preventDefault();

        let issueData = {
            "description" : description,
            "title": title,
            "assignee": assignee,
            "priority": priority
        }

        if(props.mode === "edit")
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

        <Stack
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
                onChange= {(e) => {setTitle(e.target.value)}}
            />
            <TextField
                required
                id="description"
                label="Issue Description"
                value={description}
                multiline
                maxRows={20}
                onChange= {(e) => {setDescription(e.target.value)}}
            />
            <Select
                required
                id="priority"
                label="Priority"
                value={priority}
                onChange= {(e) => {setPriority(e.target.value)}}
            >
                {priorities.map(priority => <MenuItem key={priority.id} value={priority}>{priority.description}</MenuItem>)}
            </Select>
            <Select
                required
                id="assignee"
                label="Assignee"
                value={assignee}
                onChange= {(e) => {setAssignee(e.target.value)}}
            >
                {users.map(user => <MenuItem key={user.id}  value={user}>{user.firstName} {user.lastName}</MenuItem>)}
            </Select>
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </Stack>
    )

}