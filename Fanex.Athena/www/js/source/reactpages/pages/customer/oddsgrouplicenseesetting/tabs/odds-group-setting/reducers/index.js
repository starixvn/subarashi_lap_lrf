import { combineReducers } from 'redux';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer';
import * as filterReducer from './filterReducer';
import * as dataHandlerReducer from '../../../reducers/dataHandlerReducer';


export default combineReducers(Object.assign(
    loaderReducer,
    userGuideReducer,
    filterReducer,
    dataHandlerReducer
));