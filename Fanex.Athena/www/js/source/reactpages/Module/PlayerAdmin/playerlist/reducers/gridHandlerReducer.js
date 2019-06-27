import createReducer from '../../../../lib/createReducer.js';
import { SET_DISPLAYED_COLUMN_LIST, SET_CURRENT_ACTIVE_PLAYER } from '../actions/types';

export const displayedColumnList = createReducer([], {
    [SET_DISPLAYED_COLUMN_LIST](preState, action) {
        return [...action.data];
    }
})

export const currentActivePlayer = createReducer(null, {
    [SET_CURRENT_ACTIVE_PLAYER](preState, action) {
        return action.data && {...action.data };
    }
})