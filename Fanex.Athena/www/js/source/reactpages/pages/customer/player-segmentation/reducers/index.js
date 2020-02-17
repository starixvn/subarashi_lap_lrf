import { combineReducers } from 'redux';
import * as tabHandlerReducer from './tabHandlerReducers';
import * as gridHandlerReducer from './gridHandlerReducer';

export default combineReducers({
    ...tabHandlerReducer,
    ...gridHandlerReducer
})
