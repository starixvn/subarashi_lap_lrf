import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'
import { ExchangeMode } from '../lib/constants';

export const selectedTimeZone = createReducer({}, {
    [types.TIME_ZONE](state, action) {
        return action.data
    }
});

export const selectedExchangeMode = createReducer(ExchangeMode.Running, {
    [types.EXCHANGE_MODE](state, action) {
        return action.data
    }
})