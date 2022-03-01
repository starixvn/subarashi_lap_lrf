import { combineReducers } from 'redux';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';
import * as gridDataReducer from './gridDataReducer';

export default combineReducers({
    ...loaderReducer,
    ...gridDataReducer
});