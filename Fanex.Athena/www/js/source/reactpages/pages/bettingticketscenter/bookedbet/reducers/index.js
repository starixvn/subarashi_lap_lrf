import { combineReducers } from 'redux';
import * as gridDataReducer from '@jsroot/reducers/gridDataReducer.js'
import * as productReducer from '@jsroot/reducers/productReducer'
import * as baseCurrencyReducer from '@jsroot/reducers/baseCurrencyReducer'
import * as currencyReducer from '@jsroot/reducers/currencyReducer'
import * as statusReducer from '@jsroot/reducers/statusReducer'
import * as platformReducer from '@jsroot/reducers/platformReducer'
import * as loaderReducer from '@jsroot/reducers/loaderReducer'
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer'
import * as convertAllReducer from '@jsroot/reducers/convertAllReducer'
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer'
import * as reportTitleReducer from '@jsroot/reducers/reportTitleReducer'
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer'
import * as commonReducer from '../../common/components/reducer'
import * as filterHandlerReducer from './filterHandlerReducer.js'

export default combineReducers(Object.assign(
    gridDataReducer,
    productReducer,
    baseCurrencyReducer,
    currencyReducer,
    statusReducer,
    platformReducer,
    loaderReducer,
    dateRangeReducer,
    convertAllReducer,
    requestParamReducer,
    reportTitleReducer,
    userGuideReducer,
    filterHandlerReducer,
    commonReducer
));