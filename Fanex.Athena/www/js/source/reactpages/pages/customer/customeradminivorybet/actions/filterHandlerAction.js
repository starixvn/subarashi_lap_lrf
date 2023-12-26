import { SET_USERNAME, SET_SUBMITTED, SET_HISTORY_OPTION } from './types';

export const setUsername = (data) => {
    return {
        type: SET_USERNAME,
        data
    }
}

export const setSubmitted= (data) => {
    return {
        type: SET_SUBMITTED,
        data
    }
}

export const setHistoryOption = (value) => {
    return {
        type: SET_HISTORY_OPTION,
        data: value
    }
}