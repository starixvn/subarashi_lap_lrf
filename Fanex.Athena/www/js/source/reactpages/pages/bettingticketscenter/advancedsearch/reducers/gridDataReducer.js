import createReducer from '@jsroot/lib/createReducer.js'
import * as types from '../actions/types'

export const gridData = createReducer({}, {
    [types.SET_GRID_DATA](state, action) {
        return action.data;
    }
});