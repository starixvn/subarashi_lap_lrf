import * as types from '../actions/types'
import createReducer from '../lib/createReducer.js'


export const selectedCustomerClass = createReducer({}, {
    [types.SET_SELECTED_CUSTOMERCLASS](state, action) {
        return action.data
    }
});

