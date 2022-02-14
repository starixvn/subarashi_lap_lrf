import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'

export const ip = createReducer("", {
    [types.SET_IP](state, action) {
        return action.data
    }
});