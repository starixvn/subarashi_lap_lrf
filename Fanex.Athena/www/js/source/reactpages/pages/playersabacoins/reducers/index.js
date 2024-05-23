import { combineReducers } from 'redux';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer';
import * as reportTitleReducer from '@jsroot/reducers/reportTitleReducer';
import * as gridDataReducer from '@jsroot/reducers/gridDataReducer';
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer';
import * as usernameReducer from '@jsroot/reducers/usernameReducer';
import * as currencyReducer from '@jsroot/reducers/currencyReducer';
import * as dataReducer from './dataReducer';
import * as subsidiaryReducer from '@jsroot/reducers/subsidiaryReducer';
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer';

export default combineReducers(Object.assign(
    loaderReducer,
    requestParamReducer,
    reportTitleReducer,
    dateRangeReducer,
    usernameReducer,
    currencyReducer,
    gridDataReducer,
    dataReducer,
    subsidiaryReducer,
    userGuideReducer
));