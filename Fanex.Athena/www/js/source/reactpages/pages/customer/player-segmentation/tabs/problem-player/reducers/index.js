import { combineReducers } from 'redux';
import * as gridDataReducer from '@jsroot/reducers/gridDataReducer.js'
import * as loaderReducer from '@jsroot/reducers/loaderReducer'
import * as filterReducer from './filterReducer';

export default combineReducers(Object.assign(
    gridDataReducer,
    loaderReducer,
    filterReducer
));