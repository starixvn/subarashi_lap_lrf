import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'

export const selectedCustomerClass = createReducer({}, {
    [types.SET_CUSTOMER_CLASS](state, action) {
        return action.data
    }
});