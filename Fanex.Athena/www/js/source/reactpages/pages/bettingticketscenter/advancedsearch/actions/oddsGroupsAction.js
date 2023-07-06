import * as types from './types.js'

export const setSelectedOddsGroup = (value) => {
    return {
        type: types.SET_OODS_GROUP,
        data: value
    }
}