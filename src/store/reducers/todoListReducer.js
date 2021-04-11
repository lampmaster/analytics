import {initialState} from "../states/initialState";
import {CLEAR_ERROR, CLEAR_MESSAGE, UPDATE_TASK_LIST, SET_MESSAGE, COMPLETE_TASK} from "../actions/actionTypes";

const handlers = {
    [UPDATE_TASK_LIST]: (state, action) => ({...state, currentTasks: action.currentTasks}),
    [COMPLETE_TASK]: (state, action) => ({...state, completedTasks: action.completedTasks}),
    [CLEAR_ERROR]: (state) => ({...state, error: null}),
    [SET_MESSAGE]: (state, action) => ({...state, message: action.message}),
    [CLEAR_MESSAGE]: (state) => ({...state, message: null}),
    DEFAULT: state => state
};

export const todoListReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}
