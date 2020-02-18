import { combineReducers } from 'redux';
import * as loaderReducer from '@jsroot/reducers/loaderReducer'
import * as filterReducer from './filterReducer';
import * as playerDataReducer from '../../../actions/playerDataAction';
import * as gridHandlerReducer from '../../../reducers/gridHandlerReducer';

export default combineReducers(Object.assign(
    loaderReducer,
    filterReducer,
    playerDataReducer, 
    gridHandlerReducer
));