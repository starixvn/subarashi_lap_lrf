import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import dataReducer from './dataReducer';
import promotionTypeReducer from './promotionTypeReducer';
import * as productReducer from '@jsroot/reducers/productReducer'
import * as currencyReducer from '@jsroot/reducers/currencyReducer'
import * as baseCurrencyReducer from '@jsroot/reducers/baseCurrencyReducer'
import * as loaderReducer from '@jsroot/reducers/loaderReducer'
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer'
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer'
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer'
import * as reportTitleReducer from '@jsroot/reducers/reportTitleReducer'

export default combineReducers(Object.assign(
    filterReducer,
    dataReducer,
    productReducer,
    currencyReducer,
    baseCurrencyReducer,
    loaderReducer,
    userGuideReducer,
    promotionTypeReducer,
    dateRangeReducer,
    requestParamReducer,
    reportTitleReducer
))
