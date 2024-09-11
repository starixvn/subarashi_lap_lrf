import { combineReducers } from 'redux';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer';
import * as gridDataReducer from '@jsroot/reducers/gridDataReducer';
import * as filterReducer from "./filterReduce";
import * as baseCurrencyReducer from '@jsroot/reducers/baseCurrencyReducer';
import * as currencyReducer from '@jsroot/reducers/currencyReducer';
import * as isConvertAllReducer from '@jsroot/reducers/convertAllReducer';

import createReducer from '@jsroot/lib/createReducer.js';

export const dateConstraint = createReducer({}, {});

export default combineReducers(Object.assign(
    loaderReducer,
    requestParamReducer,
    gridDataReducer, 
    baseCurrencyReducer,
    currencyReducer,
    isConvertAllReducer,
    { dateConstraint },
    filterReducer
));