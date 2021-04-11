import React, {Component} from "react";
import {Task} from "../../components/Task/Task";
import {Chart} from "../../components/Chart/Chart";
import {connect} from "react-redux";
import {completeTask, updateTaskList} from "../../store/actions/todoListActions";
import {copy} from "../../utils/utils";
import classes from './ArchiveList.module.scss'
import AddTaskWindow from "../../components/AddTaskWindow/AddTaskWindow";
import moment from "moment";

export class ArchiveList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addTask: false
        }
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


    delete(index) {
        const tasksList = copy(this.props.currentTasks)
        tasksList.splice(index, 1)
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
        const taskList = this.props.completedTasks.map((task, index, arr) => {
            const revertIndex = arr.length - 1 - index
            return (
                <Task
                    data={arr[revertIndex]}
                    index={revertIndex}
                    key={revertIndex}
                    delete={() => this.delete(revertIndex)}
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

    render() {
        const taskList = this.generateTasks()

        return (
            <React.Fragment>
                {this.state.addTask ? <AddTaskWindow cancel={() => this.openCloseWindow()}/> : null}
                <div className={classes.btn}>
                    <div>Weekly progress</div>
                </div>
                <Chart data={this.currentWeekTasks} size={[200,800]}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveList)
