import * as types from '../actions/types'
import createReducer from '../lib/createReducer.js'

export const viewSabaCoins = createReducer({}, {
    [types.CHANGE_VIEW_SABA_COINS](state, action) {
        return action.data;
    }
})