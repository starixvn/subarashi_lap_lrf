import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'

export const selectedCashOutMode = createReducer({}, {
    [types.SET_SELECTED_CASH_OUT_MODE](state, action) {
        return action.data
    }
});

export const isEnableCashOutFilter = createReducer({}, {
    [types.SET_ENABLE_CASH_OUT_MODE](state, action) {
        return action.data
    }
});
