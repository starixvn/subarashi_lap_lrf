import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'
import AppData from '@jsroot/lib/AppData'

export const selectedCashOutMode = createReducer({}, {
    [types.SET_SELECTED_CASH_OUT_MODE](state, action) {
        return action.data
    }
});

export const isEnableCashOutFilter = createReducer({}, {
    [types.SET_ENABLE_CASH_OUT_MODE](state, action) {
        return action.data
    }
});

export const productList = createReducer(AppData.productList, {
    [types.SET_PRODUCT_LIST](state, action) {
        return action.data;
    }
});

export const sweetAlertOption = createReducer(null, {
    [types.SET_SWEET_ALERT_OPTION](prevState, action) {
        return action.data && {...action.data };
    }
})