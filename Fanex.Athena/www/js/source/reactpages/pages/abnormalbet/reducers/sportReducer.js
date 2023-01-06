import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'

const selectedSport= createReducer({}, {
    [types.SET_SELECTED_SPORT](state, action) {
        return action.data
    }
});

export default {
    selectedSport
 }