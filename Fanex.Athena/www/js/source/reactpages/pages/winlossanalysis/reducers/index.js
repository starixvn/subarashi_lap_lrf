import { combineReducers } from 'redux';
import * as gridDataReducer from '@jsroot/reducers/gridDataReducer.js'
import * as productReducer from '@jsroot/reducers/productReducer'
import * as currencyReducer from '@jsroot/reducers/currencyReducer'
import * as baseCurrencyReducer from '@jsroot/reducers/baseCurrencyReducer'
import * as statusReducer from '@jsroot/reducers/statusReducer'
import * as liveStatusReducer from '@jsroot/reducers/liveStatusReducer'
import * as loaderReducer from '@jsroot/reducers/loaderReducer'
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer'
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer'
import * as reportTitleReducer from '@jsroot/reducers/reportTitleReducer'
import * as sportReducer from './sportReducer'
import * as bettypeReducer from './bettypeReducer'
import * as usernameReducer from '@jsroot/reducers/usernameReducer'
import * as convertAllReducer from '@jsroot/reducers/convertAllReducer'
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer'
import * as subsidiaryReducer from '@jsroot/reducers/subsidiaryReducer';
import * as platformReducer from '@jsroot/reducers/platformReducer';
import * as customerClassReducer from '@jsroot/reducers/customerClassReducer';
import * as filterReducer from './filterReducer';
import * as dataReducer from './dataReducer';

export default combineReducers(Object.assign(
    gridDataReducer,
    productReducer,
    currencyReducer,
    baseCurrencyReducer,
    statusReducer,
    liveStatusReducer,
    loaderReducer,
    dateRangeReducer,
    requestParamReducer,
    reportTitleReducer,
    sportReducer,
    bettypeReducer,
    usernameReducer,
    convertAllReducer,
    userGuideReducer,
    subsidiaryReducer,
    platformReducer,
    filterReducer,
    customerClassReducer,
    dataReducer
));