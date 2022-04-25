import Select from "@mui/material/Select";

const React = require('react');
const client = require('./client');

import {useNavigate} from "react-router-dom";
import {Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";

export function IssueForm(props) {

    const nav = useNavigate();
    const issue = {};

    const [priorities, setPriorities] = useState([]);
    const [stages, setStages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        client({
            method: "GET",
            path: "api/users"
        }).done(response => {
            setUsers(response.entity.content);
        })
        client({
            method: "GET",
            path: "api/issuePriorities"
        }).done(response => {
            setPriorities(response.entity.content);
        })
        client({
            method: "GET",
            path: "api/issueStages"
        }).done(response => {
            setStages(response.entity.content);
        })
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        client({
            method: 'POST',
            path: "api/issues",
            entity: issue,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            nav("/");
        });
    }

    function handleFieldChange(e) {
        let key = e.target.id;
        issue[key] = e.target.value;
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
                defaultValue=""
                onChange={handleFieldChange}
            />
            <TextField
                required
                id="description"
                label="Issue Description"
                defaultValue=""
                multiline
                maxRows={20}
                onChange={handleFieldChange}
            />
            <Select
                required
                id="priority"
                label="Priority"
                value={priorities[0]}
                onChange={e => {
                    issue["priority"] = e.target.value;
                }}
            >
                {priorities.map(priority => <MenuItem value={priority}>{priority.description}</MenuItem>)}
            </Select>
            <Select
                required
                id="assignee"
                label="Assignee"
                value={users[0]}
                onChange={e => {
                    issue["assignee"] = e.target.value;
                }}
            >
                {users.map(user => <MenuItem value={user}>{user.firstName} {user.lastName}</MenuItem>)}
            </Select>
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </Stack>
    )

}