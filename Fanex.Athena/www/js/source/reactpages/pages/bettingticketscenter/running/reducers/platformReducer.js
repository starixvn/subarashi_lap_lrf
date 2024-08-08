import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'

export const selectedPlatform = createReducer({}, {
    [types.SET_PLATFORM](state, action) {
        return action.data
    }
});