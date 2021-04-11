import React from "react";
import classes from './Task.module.scss'
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export const Task = () => (
    <div className={classes.task}>
        <div className={classes.title}>Some task</div>
        <div className={classes.spaceBetween}>
            <div className={classes.date}>14.04.2021k</div>
            <div className={classes.btn}>
                <IconButton aria-label='edit' className={classes.space}>
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label='delete' className={classes.space}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    </div>
)
