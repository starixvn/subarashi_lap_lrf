import {SET_USERINFO } from './types';

export const setUserInfo = (data) => {
    return {
        type: SET_USERINFO,
        data
    }
}
