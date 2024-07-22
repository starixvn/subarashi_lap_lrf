import * as types from './types.js'

export const setIp = (value) => {
    return {
        type: types.SET_IP,
        data: value
    }
}