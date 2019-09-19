import { combineReducers } from 'redux';
import * as requestParamReducer from '@jsroot/reducers/requestParamReducer';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';

export default combineReducers(Object.assign({},
    loaderReducer,
    requestParamReducer
));