import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'

export const selectedTimeZone = createReducer({}, {
    [types.TIME_ZONE](state, action) {
        return action.data
    }
});