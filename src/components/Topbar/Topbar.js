import React from "react";
import classes from './Topbar.module.scss'
import {NavLink} from "react-router-dom";

export const TopBar = () => (
    <div className={classes.TopBar}>
        <div className={classes.Container}>
            <div className={classes.logo}>
                <div className={classes.icon}/>DoTo
            </div>
            <div className={classes.navigate}>
                <NavLink exact to="/" activeClassName={classes.selected}>Current</NavLink>
                <NavLink to="/archive" activeClassName={classes.selected}>Archive</NavLink>
            </div>
        </div>
    </div>
);

