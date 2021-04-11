import React, {Component} from "react";
import classes from './Task.module.scss'
import {Button, IconButton, Input} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {copy, unixToString} from "../../utils/utils";

export class Task extends Component {

    constructor(props) {
        super(props);

        this.initTaskStat = {
            completed: this.props.data.completed,
            id: this.props.data.id,
            title: this.props.data.title,
            date: this.props.data.date
        }

        this.state = {
            isEdit: false,
            task: this.initTaskStat
        }
    }

    editTitle(event) {
        const task = copy(this.state.task)

        task.title = event.target.value
        this.setState({task})
    }

    save() {
        this.props.edit(copy(this.state), this.props.index)
        this.changeEditMode()
    }

    cancel() {
        this.setState({task: this.initTaskStat})
        this.changeEditMode()
    }

    changeEditMode() {
        if (!this.state.task.completed) {
            this.setState({isEdit: !this.state.isEdit})
        }
    }

    render() {
        return (

                <div className={classes.task}>
                    {!this.state.task.completed
                        ? <div className={classes.checkbox} onClick={() => this.props.complete(this.props.index)}/>
                        : null
                    }
                    <div className={classes.main}>
                        {this.state.isEdit
                            ? <Input value={this.state.task.title} onInput={(event => this.editTitle(event))}/>
                            : <div onClick={() => this.changeEditMode()} className={classes.title}>{this.state.task.title}</div>
                        }

                        <div className={classes.spaceBetween}>
                            <div className={classes.date}>{unixToString(this.state.task.date)}</div>
                            <div className={classes.btn}>
                                {this.state.isEdit
                                    ? (
                                        <React.Fragment>
                                            <Button onClick={() => this.save()}>Save</Button>
                                            <Button onClick={() => this.cancel()}>Cancel</Button>
                                        </React.Fragment>
                                    )
                                    : (
                                        <React.Fragment>
                                            <IconButton
                                                disabled={this.state.task.completed}
                                                onClick={() => this.changeEditMode()}
                                                aria-label='edit'
                                                className={classes.space}>
                                                <EditIcon fontSize="small"/>
                                            </IconButton>
                                            <IconButton
                                                disabled={this.state.task.completed}
                                                aria-label='delete'
                                                className={classes.space}
                                                onClick={() => this.props.delete(this.props.index)}
                                            > <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                        </React.Fragment>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
