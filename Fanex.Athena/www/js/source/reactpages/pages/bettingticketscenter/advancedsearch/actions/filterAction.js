import * as types from './types.js'

export const setSelectedCashOutMode = (value) => {
    return {
        type: types.SET_SELECTED_CASH_OUT_MODE,
        data: value
    }
}

export const setEnableCashOutFilter = (value) => {
    return {
        type: types.SET_ENABLE_CASH_OUT_MODE,
        data: value
    }
}

export const setProductList = data => {
    return {
        type: types.SET_PRODUCT_LIST,
        data: data
    }
}