import * as types from '../actions/types';
import createReducer from '@jsroot/lib/createReducer.js';
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer';
import * as currencyReducer from '@jsroot/reducers/currencyReducer';
import * as usernameReducer from '@jsroot/reducers/usernameReducer';
import * as subsidiaryReducer from '@jsroot/reducers/subsidiaryReducer'
import * as paramHandlerReducer from '../../../reducers/paramHandlerReducer';

export const selectedVipOption = createReducer({}, {
    [types.SET_SELECTED_VIP_OPTION](state, action) {
        return action.data
    }
}); 

export const selectedCustomerClass = createReducer({}, {
    [types.SET_SELECTED_CUSTOMERCLASS](state, action) {
        return action.data
    }
});

export const dateRange = dateRangeReducer.dateRange;
export const selectedCurrency = currencyReducer.selectedCurrency;
export const username = usernameReducer.username;
export const selectedSubsidiary = subsidiaryReducer.selectedSubsidiary;
export const subsidiarySearch = subsidiaryReducer.subsidiarySearch;
export const selectedParams = paramHandlerReducer.selectedParams;
