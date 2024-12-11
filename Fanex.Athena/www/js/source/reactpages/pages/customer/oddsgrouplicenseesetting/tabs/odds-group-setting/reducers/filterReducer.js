import * as types from '../actions/types';
import createReducer from '@jsroot/lib/createReducer.js'
import * as currencyReducer from '@jsroot/reducers/currencyReducer';
import * as subsidiaryReducer from '@jsroot/reducers/subsidiaryReducer'
import * as paramHandlerReducer from '../../../reducers/paramHandlerReducer';

export const selectedCurrency = currencyReducer.selectedCurrency;
export const selectedSubsidiary = subsidiaryReducer.selectedSubsidiary;
export const subsidiarySearch = subsidiaryReducer.subsidiarySearch;
export const selectedParams = paramHandlerReducer.selectedParams;

export const sweetAlertOption = createReducer(null, {
    [types.SET_SWEET_ALERT_OPTION](prevState, action) {
        return action.data && {...action.data };
    }
})