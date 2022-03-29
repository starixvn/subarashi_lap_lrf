import * as types from '../actions/types'
import createReducer from '../lib/createReducer.js'

export const username = createReducer(null, {
    [types.SET_USERNAME](state, action) {
        return action.data;
    }
})