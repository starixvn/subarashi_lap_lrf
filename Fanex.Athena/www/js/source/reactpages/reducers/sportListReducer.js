import * as types from '../actions/types'
import createReducer from '../lib/createReducer.js'

export const sportList = createReducer({}, {
    [types.SET_SPORT_LIST](state, action) {
        return action.data
    }
});