import { SET_USERNAME, SET_SUBMITTED } from './types';

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