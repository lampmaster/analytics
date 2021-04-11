import {CLEAR_ERROR, CLEAR_MESSAGE, SET_MESSAGE} from "./actionTypes";

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
