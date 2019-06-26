import createReducer from '../../../../lib/createReducer.js';
import { SET_DISPLAYED_COLUMN_LIST } from '../actions/types';

export const displayedColumnList = createReducer([], {
    [SET_DISPLAYED_COLUMN_LIST](preState, action) {
        return [...action.data];
    }
})