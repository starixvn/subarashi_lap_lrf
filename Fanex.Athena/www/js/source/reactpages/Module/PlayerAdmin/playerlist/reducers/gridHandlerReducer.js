import createReducer from '../../../../lib/createReducer.js';
import { SET_DISPLAYED_COLUMN_LIST } from '../actions/types';
import { columnList } from '../lib/constants';

const defaultColumnList = columnList.map(item => ({...item }));
export const displayedColumnList = createReducer(defaultColumnList, {
    [SET_DISPLAYED_COLUMN_LIST](preState, action) {
        return [...action.data];
    }
})