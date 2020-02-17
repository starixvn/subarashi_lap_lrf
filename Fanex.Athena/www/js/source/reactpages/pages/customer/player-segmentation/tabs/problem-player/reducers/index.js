import { combineReducers } from 'redux';
import * as gridDataReducer from '@jsroot/reducers/gridDataReducer.js'
import * as loaderReducer from '@jsroot/reducers/loaderReducer'
import * as filterReducer from './filterReducer';
import * as playerDataReducer from './playerDataReducer';
import * as gridHandlerReducer from '../../../reducers/gridHandlerReducer';

export default combineReducers(Object.assign(
    gridDataReducer,
    loaderReducer,
    filterReducer,
    playerDataReducer, 
    gridHandlerReducer
));