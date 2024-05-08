import createReducer from '@jsroot/lib/createReducer.js'
import * as types from '../actions/types.js'

export const searchingId = createReducer({}, {
    [types.SET_SEARCHING_ID](state, action) {
        return action.data;
    }
})

export const searchingIdOption = createReducer({}, {
    [types.SET_SEARCHING_ID_OPTION](state, action) {
        return action.data;
    }
})