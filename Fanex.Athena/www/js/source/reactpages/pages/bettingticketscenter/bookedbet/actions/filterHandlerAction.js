import * as types from './types.js'

export const setSearchingId = (value) => {
    return {
        type: types.SET_SEARCHING_ID,
        data: value
    }
}

export const setSearchingIdOption = (value) => {
    return {
        type: types.SET_SEARCHING_ID_OPTION,
        data: value
    }
}