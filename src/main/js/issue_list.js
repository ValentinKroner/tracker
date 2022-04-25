import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const React = require('react');
const client = require('./client');
const follow = require('./follow')

export function IssueCard(props) {

    return (
        <Grid item>
            <Card sx={{maxWidth: 345}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.issue.title}
                    </Typography>

                    <Typography component="div">
                        <Chip label={props.issue.priority.description} sx={{background: props.issue.priority.color}}/>
                        <Chip variant="outlined" label={props.issue.stage.description}/>
                    </Typography>

                    <Typography component="div">
                        Assignee: {props.issue.assignee.firstName + " " + props.issue.assignee.lastName}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}