import { combineReducers } from 'redux';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';
import * as filterReducer from './filterReducer';

export default combineReducers(Object.assign(
    loaderReducer,
    filterReducer
));