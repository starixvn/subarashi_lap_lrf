import * as types from './types.js'

export const setSelectedPlatform = (value) => {
    return {
        type: types.SET_PLATFORM,
        data: value
    }
}