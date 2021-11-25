import * as types from './types';
import * as dateRangeAction from '@jsroot/actions/dateRangeAction';
import * as currencyAction from '@jsroot/actions/currencyAction';
import * as usernameAction from '@jsroot/actions/usernameAction'
import * as paramHanlderAction from '../../../actions/paramHanlderAction';
import * as subsidiaryAction from '@jsroot/actions/subsidiaryAction'

export const changeIsGetAll = isGetAll => {
    return {
        type: types.SET_IS_GET_ALL,
        data: isGetAll
    }
}

export const setReason = selectedReasons => {
    return {
        type: types.SET_SELECTED_REASON,
        data: selectedReasons
    }
}

export const setSelectedCustomerClass = selectedCustomerClass => {
    return {
        type: types.SET_SELECTED_CUSTOMERCLASS,
        data: selectedCustomerClass
    }
}

export const setDateRange = dateRangeAction.setDateRange;
export const setSelectedCurrency =  currencyAction.setSelectedCurrency;
export const setUsername =  usernameAction.setUsername;
export const setSubsidiaryList = subsidiaryAction.setSubsidiaryList;
export const setSubsidiarySearch = subsidiaryAction.setSubsidiarySearch;
export const setSelectedParams =  paramHanlderAction.setSelectedParams;
