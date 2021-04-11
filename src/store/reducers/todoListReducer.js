import {initialState} from "../states/initialState";
import {CLEAR_ERROR, CLEAR_MESSAGE, SET_MESSAGE} from "../actions/actionTypes";

const handlers = {
    [CLEAR_ERROR]: (state) => ({...state, error: null}),
    [SET_MESSAGE]: (state, action) => ({...state, message: action.message}),
    [CLEAR_MESSAGE]: (state) => ({...state, message: null}),
    DEFAULT: state => state
};

export const todoListReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}
