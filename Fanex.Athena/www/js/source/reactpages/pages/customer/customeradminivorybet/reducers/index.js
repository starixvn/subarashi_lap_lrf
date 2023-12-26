import { combineReducers } from 'redux';
import * as filterHandlerReducer from './filterHandlerReducer.js';
import * as customerInfoHandlerReducer from './customerInfoHandlerReducer.js';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';
import * as tabHandlerReducers from './tabHandlerReducers.js';
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer';

export default combineReducers(Object.assign({},
    filterHandlerReducer,
    loaderReducer,
    customerInfoHandlerReducer,
    tabHandlerReducers,
    dateRangeReducer,
));
