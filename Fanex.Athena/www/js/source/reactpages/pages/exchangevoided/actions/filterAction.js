import * as types from './types.js'

export const setSelectedTimeZone = (value) => {
    return {
        type: types.TIME_ZONE,
        data: value
    }
}