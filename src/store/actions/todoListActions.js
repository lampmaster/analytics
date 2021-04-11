import {CLEAR_ERROR, CLEAR_MESSAGE, UPDATE_TASK_LIST, SET_MESSAGE, COMPLETE_TASK} from "./actionTypes";

export function completeTask(task) {
    return (dispatch, getState) => {
        const completedTasks = getState().completedTasks

        completedTasks.push(task)
        dispatch(updateCompletedTaskList(completedTasks))
        dispatch(setMessage('Task moved to archive'))
    }
}

export function updateCompletedTaskList(completedTasks) {
    return {
        type: COMPLETE_TASK,
        completedTasks
    }
}

export function updateTaskList(tasks) {
    return {
        type: UPDATE_TASK_LIST,
        currentTasks: tasks
    }
}

export function setMessage(message) {
    return {
        type: SET_MESSAGE,
        message
    }
}

export function clearMessage() {
    return {
        type: CLEAR_MESSAGE
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR
    }
}
