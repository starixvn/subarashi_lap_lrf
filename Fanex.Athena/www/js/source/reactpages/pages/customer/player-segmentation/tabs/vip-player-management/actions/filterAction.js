import * as types from './types';
import * as dateRangeAction from '@jsroot/actions/dateRangeAction';
import * as currencyAction from '@jsroot/actions/currencyAction';
import * as usernameAction from '@jsroot/actions/usernameAction'
import * as paramHanlderAction from '../../../actions/paramHanlderAction';

export const setSelectedVipOption = option => {
    return {
        type: types.SET_SELECTED_VIP_OPTION,
        data: option
    }
}

export const setDateRange = dateRangeAction.setDateRange;
export const setSelectedCurrency =  currencyAction.setSelectedCurrency;
export const setUsername =  usernameAction.setUsername;
export const setSelectedParams =  paramHanlderAction.setSelectedParams;
