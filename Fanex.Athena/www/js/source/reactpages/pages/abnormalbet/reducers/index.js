import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import dataReducer from './dataReducer';
import bettypeReducer from './bettypeReducer';
import sportReducer from './sportReducer';
import * as productReducer from '@jsroot/reducers/productReducer'
import * as currencyReducer from '@jsroot/reducers/currencyReducer'
import * as baseCurrencyReducer from '@jsroot/reducers/baseCurrencyReducer'
import * as statusReducer from '@jsroot/reducers/statusReducer'
import * as loaderReducer from '@jsroot/reducers/loaderReducer'
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer'
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer'
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer'
import * as reportTitleReducer from '@jsroot/reducers/reportTitleReducer'
import * as usernameReducer from '@jsroot/reducers/usernameReducer'
import * as reasonReducer from '@jsroot/reducers/reasonReducer'

export default combineReducers(Object.assign(
    filterReducer,
    dataReducer,
    productReducer,
    currencyReducer,
    baseCurrencyReducer,
    statusReducer,
    loaderReducer,
    userGuideReducer,
    bettypeReducer,
    sportReducer,
    dateRangeReducer,
    requestParamReducer,
    reportTitleReducer,
    usernameReducer,
    reasonReducer
))
