import * as types from '../actions/types'
import createReducer from '../lib/createReducer.js'

export const selectedReason = createReducer({}, {
    [types.SET_REASON_LIST](state, action) {
        return action.data
    }
});