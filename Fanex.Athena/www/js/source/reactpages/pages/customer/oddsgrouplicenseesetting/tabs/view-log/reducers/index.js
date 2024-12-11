import { combineReducers } from 'redux';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';
import * as filterReducer from './filterReducer';
import * as dataHandlerReducer from '../../../reducers/dataHandlerReducer';
import * as dateRangeReducer from '@jsroot/reducers/dateRangeReducer'


export default combineReducers(Object.assign(
    loaderReducer,
    filterReducer,
    dataHandlerReducer,
    dateRangeReducer
));