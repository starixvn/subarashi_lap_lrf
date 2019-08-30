import { combineReducers } from 'redux';
import * as widgetsReducer from './widgetsReducer';
import * as commonReducer from './commonReducer';

export default combineReducers({
    ...commonReducer
});