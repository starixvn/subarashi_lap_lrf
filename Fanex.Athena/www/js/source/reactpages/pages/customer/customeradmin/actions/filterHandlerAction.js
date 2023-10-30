import { SET_USERNAME, SET_SUBMITTED, SET_USERINFO } from './types';

export const setUsername = (data) => {
    return {
        type: SET_USERNAME,
        data
    }
}

export const setUserInfo = (data) => {
    return {
        type: SET_USERINFO,
        data
    }
}


export const setSubmitted= (data) => {
    return {
        type: SET_SUBMITTED,
        data
    }
}