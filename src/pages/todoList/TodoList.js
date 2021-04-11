import React, {Component} from "react";
import {Task} from "../../components/Task/Task";
import {Chart} from "../../components/Chart/Chart";
import {connect} from "react-redux";
import {completeTask, updateTaskList} from "../../store/actions/todoListActions";
import {copy} from "../../utils/utils";
import {Button} from "@material-ui/core";
import classes from './TodoList.module.scss'
import AddTaskWindow from "../../components/AddTaskWindow/AddTaskWindow";

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

    getTasksList(task) {
        const taskList = this.props[task].map((task, index, arr) => {
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
        if (this.isArchive) {
            return this.getTasksList('completedTasks')
        } else {
            return this.getTasksList('currentTasks')
        }
    }

    uploadHandler(file) {
        if (file[0].type !== 'application/json') {
            alert('Файл должен быть в формате json')
        } else {
            this.readFileAsync(file[0]).then((fileAsString) => {
                console.log(JSON.parse(JSON.stringify(fileAsString)));
            })
        }

    }

    readFileAsync(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsBinaryString(file);
        });
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
                    <Button
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={(event) => this.uploadHandler(event.target.files)}
                        />
                    </Button>
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
