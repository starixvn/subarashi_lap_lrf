import * as types from './types'

export const setReasonList = (data) => {
    return {
        type: types.SET_REASON_LIST,
        data: data
    }
}