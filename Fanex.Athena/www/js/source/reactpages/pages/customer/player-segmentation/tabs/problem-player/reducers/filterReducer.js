import * as types from '../actions/types';
import createReducer from '@jsroot/lib/createReducer.js';
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer';

export const isGetAll = createReducer({}, {
    [types.SET_IS_GET_ALL](state, action) {
        return action.data
    }
});

export const dateRange = dateRangeReducer.dateRange;