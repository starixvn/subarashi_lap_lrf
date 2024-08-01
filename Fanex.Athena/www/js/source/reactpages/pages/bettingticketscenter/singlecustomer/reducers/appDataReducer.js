import * as types from '../actions/types'
import createReducer from '@jsroot/lib/createReducer.js'
import AppData from '@jsroot/lib/AppData'

export const productList = createReducer(AppData.productList, {
    [types.SET_PRODUCT_LIST](state, action) {
        return action.data;
    }
});