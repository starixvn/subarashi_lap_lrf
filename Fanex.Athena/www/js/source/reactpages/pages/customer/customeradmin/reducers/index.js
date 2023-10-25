import { combineReducers } from 'redux';
import * as filterHandlerReducer from './filterHandlerReducer.js';
import * as playerDetailHandlerReducer from './playerDetailHandlerReducer';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';
import * as tabHandlerReducers from './tabHandlerReducers.js';
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer'

export default combineReducers(Object.assign({},
    filterHandlerReducer,
    loaderReducer,
    playerDetailHandlerReducer,
    tabHandlerReducers,
    dateRangeReducer
));
