import * as types from '../actions/types'
import createReducer from '../lib/createReducer.js'


export const selectedOddGroup = createReducer({}, {
    [types.SET_SELECTED_ODDGROUP](state, action) {
        return action.data
    }
});

