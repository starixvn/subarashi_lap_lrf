import * as types from './types'

export const setSportList = (data) => {
    return {
        type: types.SET_SPORT_LIST,
        data: data
    }
}