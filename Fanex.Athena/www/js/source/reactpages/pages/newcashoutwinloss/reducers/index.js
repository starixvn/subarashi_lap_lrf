import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import dataReducer from './dataReducer';
import sportReducer from './sportReducer';
import * as currencyReducer from '@jsroot/reducers/currencyReducer'
import * as baseCurrencyReducer from '@jsroot/reducers/baseCurrencyReducer'
import * as loaderReducer from '@jsroot/reducers/loaderReducer'
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer'
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer'
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer'
import * as reportTitleReducer from '@jsroot/reducers/reportTitleReducer'
import * as subsidiaryReducer from '@jsroot/reducers/subsidiaryReducer'

export default combineReducers(Object.assign(
    filterReducer,
    dataReducer,
    sportReducer,
    currencyReducer,
    baseCurrencyReducer,
    loaderReducer,
    userGuideReducer,
    dateRangeReducer,
    requestParamReducer,
    reportTitleReducer,
    subsidiaryReducer
))
