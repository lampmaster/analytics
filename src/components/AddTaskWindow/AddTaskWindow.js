import {Component} from "react";
import classes from './AddTaskWindow.module.scss'
import {Button, Input} from "@material-ui/core";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import {updateTaskList} from "../../store/actions/todoListActions";
import {connect} from "react-redux";
import {copy} from "../../utils/utils";
import moment from "moment";


class AddTaskWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: Math.round(Math.random() * 1000000),
            title: null,
            date: null
        }
    }


    get formIsValid() {
        return this.state.title !== null && this.state.date !== null && moment(this.state.date).isValid()
    }

    handleDateChange(event) {
        this.setState({date: event.unix() * 1000})
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value})
    }

    save() {
        const newList = copy(this.props.currentTasks)
        newList.push(this.state)
        console.log(newList)
        this.props.updateTaskList(newList)

        this.props.cancel()
    }


    render() {
        console.log(this.state)
        return (
            <div className={classes.backdrop}>
                <div className={classes.window}>
                    <Input onChange={(event) => this.handleTitleChange(event)}/>
                    <div className={classes.row}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={this.state.date}
                                onChange={(event) => this.handleDateChange(event)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <div>
                            <Button disabled={!this.formIsValid} onClick={() => this.save()}>Save</Button>
                            <Button onClick={() => this.props.cancel()}>Cancel</Button>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentTasks: state.currentTasks,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateTaskList: (tasksList) => dispatch(updateTaskList(tasksList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskWindow)
