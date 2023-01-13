import createReducer from '@jsroot/lib/createReducer.js'
import * as types from '../actions/types';

const selectedSport= createReducer({}, {
    [types.SET_SELECTED_SPORT](state, action) {
        return action.data
    }
});

export default {
    selectedSport
 }