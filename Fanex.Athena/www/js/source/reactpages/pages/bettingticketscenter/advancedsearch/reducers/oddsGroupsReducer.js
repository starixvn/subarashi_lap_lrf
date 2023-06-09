import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'

export const selectedOddsGroup = createReducer({}, {
    [types.SET_OODS_GROUP](state, action) {
        return action.data
    }
});