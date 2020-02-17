import * as types from '../actions/types';
import createReducer from '@jsroot/lib/createReducer.js';
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer';
import * as currencyReducer from '@jsroot/reducers/currencyReducer';
import * as usernameReducer from '@jsroot/reducers/usernameReducer';
import * as paramHandlerReducer from '../../../reducers/paramHandlerReducer';

export const isGetAll = createReducer({}, {
    [types.SET_IS_GET_ALL](state, action) {
        return action.data
    }
});

export const dateRange = dateRangeReducer.dateRange;
export const selectedCurrency = currencyReducer.selectedCurrency;
export const username = usernameReducer.username;

export const selectedParams = paramHandlerReducer.selectedParams;
