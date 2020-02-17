import * as types from './types';
import * as dateRangeAction from '@jsroot/actions/dateRangeAction';
import * as currencyAction from '@jsroot/actions/currencyAction';
import * as usernameAction from '@jsroot/actions/usernameAction'
import * as paramHanlderAction from '../../../actions/paramHanlderAction';

export const changeIsGetAll = isGetAll => {
    return {
        type: types.SET_IS_GET_ALL,
        data: isGetAll
    }
}

export const setDateRange = dateRangeAction.setDateRange;
export const setSelectedCurrency =  currencyAction.setSelectedCurrency;
export const setUsername =  usernameAction.setUsername;

export const setSelectedParams =  paramHanlderAction.setSelectedParams;
