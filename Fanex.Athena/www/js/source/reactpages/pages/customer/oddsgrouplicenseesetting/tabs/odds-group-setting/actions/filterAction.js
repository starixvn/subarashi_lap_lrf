import * as types from './types';
import * as currencyAction from '@jsroot/actions/currencyAction';
import * as paramHanlderAction from '../../../actions/paramHanlderAction';
import * as subsidiaryAction from '@jsroot/actions/subsidiaryAction'

export const setSelectedCurrency =  currencyAction.setSelectedCurrency;
export const setSubsidiaryList = subsidiaryAction.setSubsidiaryList;
export const setSubsidiarySearch = subsidiaryAction.setSubsidiarySearch;
export const setSelectedParams =  paramHanlderAction.setSelectedParams;


export const setSweetAlertOption = options => {
    return {
        type: types.SET_SWEET_ALERT_OPTION,
        data: options
    }
}