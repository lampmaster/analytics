import React, {Component} from "react";
import {Task} from "../../components/Task/Task";
import {Chart} from "../../components/Chart/Chart";
import {connect} from "react-redux";
import {completeTask, updateTaskList} from "../../store/actions/todoListActions";
import {copy} from "../../utils/utils";
import {Button} from "@material-ui/core";
import classes from './TodoList.module.scss'
import AddTaskWindow from "../../components/AddTaskWindow/AddTaskWindow";
import moment from "moment";

export class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addTask: false
        }
    }

    get isArchive() {
        return this.props.match.path === '/archive'
    }

    get currentWeekTasks() {
        const currentWeekStatistic = Array(7).fill(0)

        this.props.completedTasks.forEach(task => {
            const isSameWeek = moment(task.date).isSame(new Date(), "week")

            if (isSameWeek) {
                const dayIndex = moment(task.date).day()
                currentWeekStatistic[dayIndex] += 1
            }
        })

        return currentWeekStatistic
    }

    getTasksList(task) {
        console.log('tasks', this.props[task])
        const taskList = this.props[task].map((task, index, arr) => {
            console.log(task);
            return (
                <Task
                    data={task}
                    index={index}
                    key={Math.random() * index * 1000}
                    delete={() => this.delete(index)}
                    edit={(task, index) => this.edit(task, index)}
                    complete={(index) => this.complete(index)}
                />
            )
        })

        return (
            <div className={classes.classList}>
                {taskList}
            </div>
        )
    }

    delete(index) {
        const tasksList = copy(this.props.currentTasks)
        tasksList.splice(index, 1)
        console.log('asdf', tasksList);
        this.props.updateTaskList(tasksList)
    }

    edit(task, index) {
        const tasksList = copy(this.props.currentTasks)
        tasksList[index] = task
        this.props.updateTaskList(tasksList)
    }

    complete(index) {
        const taskList = copy(this.props.currentTasks)
        const completedTask = taskList[index]
        completedTask.completed = true

        this.delete(index)
        this.props.completeTask(completedTask)
    }

    openCloseWindow() {
        this.setState({addTask: !this.state.addTask})
    }

    generateTasks() {
        if (this.isArchive) {
            console.log('archive')
            return this.getTasksList('completedTasks')
        } else {
            return this.getTasksList('currentTasks')
        }
    }

    render() {
        const chart = this.props.match.path === '/archive'
            ? <Chart data={this.currentWeekTasks} size={[200,800]}/>
            : null

        const taskList = this.generateTasks()

        return (
            <React.Fragment>
                {this.state.addTask ? <AddTaskWindow cancel={() => this.openCloseWindow()}/> : null}
                <div className={classes.btn}>
                    <Button onClick={() => this.openCloseWindow()}>Add task</Button>
                </div>
                {chart}
                {taskList}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        completedTasks: state.completedTasks,
        currentTasks: state.currentTasks,
        loading: state.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateTaskList: (tasksList) => dispatch(updateTaskList(tasksList)),
        completeTask: (completedTask) => dispatch(completeTask(completedTask))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
