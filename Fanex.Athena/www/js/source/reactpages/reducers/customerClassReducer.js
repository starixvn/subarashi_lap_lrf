import * as types from '../actions/types'
import createReducer from '../lib/createReducer.js'


export const selectedCustomerClass = createReducer({}, {
    [types.SET_SELECTED_CUSTOMERCLASS](state, action) {
        return action.data
    }
});

export const selectedRiskLevel = createReducer({}, {
    [types.SET_SELECTED_RISKLEVEL](state, action) {
        return action.data
    }
});

