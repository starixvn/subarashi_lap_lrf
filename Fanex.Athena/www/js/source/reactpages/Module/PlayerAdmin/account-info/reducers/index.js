import { combineReducers } from 'redux';
import * as subtabReducer from './subtabReducer';
import * as widgetsReducer from './widgetsReducer';
import * as commonReducer from './commonReducer';

export default combineReducers({
    ...subtabReducer,
    ...commonReducer
});