import createReducer from '@jsroot/lib/createReducer.js';
import { historyMode } from '../lib/constants.js';
import { SET_USERNAME, SET_SUBMITTED, SET_HISTORY_OPTION } from '../actions/types.js';

export const username = createReducer('', {
    [SET_USERNAME](preState, action) {
        return action.data;
    }
})


export const isSubmitted = createReducer(false, {
    [SET_SUBMITTED](preState, action) {
        return action.data;
    }
})

export const historyOption = createReducer(historyMode.Deposit, {
    [SET_HISTORY_OPTION](state, action) {
        return action.data
    }
});