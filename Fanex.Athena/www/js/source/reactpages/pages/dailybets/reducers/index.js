import { combineReducers } from 'redux';
import * as gridDataReducer from '@jsroot/reducers/gridDataReducer.js';
import * as productReducer from '@jsroot/reducers/productReducer';
import * as currencyReducer from '@jsroot/reducers/currencyReducer';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer';
import * as reportTitleReducer from '@jsroot/reducers/reportTitleReducer';

import createReducer from '@jsroot/lib/createReducer.js';
import { SET_DATE } from '../actions/types';

export const selectedDate = createReducer(false, {
    [SET_DATE](preState, action) {
        return action.data;
    }
})

export const dateConstraint = createReducer({}, {});

export default combineReducers(Object.assign(
    gridDataReducer,
    productReducer,
    currencyReducer,
    loaderReducer,
    requestParamReducer,
    reportTitleReducer, { selectedDate, dateConstraint }
));