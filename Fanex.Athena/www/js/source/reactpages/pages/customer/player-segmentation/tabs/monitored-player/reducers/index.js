import { combineReducers } from 'redux';
import createReducer from '@jsroot/lib/createReducer.js';
import { SET_CURRENT_USER_ACTION } from '../actions/types';
import * as loaderReducer from '@jsroot/reducers/loaderReducer';
import * as userGuideReducer from '@jsroot/reducers/userGuideReducer';
import * as filterReducer from './filterReducer';
import * as gridHandlerReducer from '../../../reducers/gridHandlerReducer';
import * as playerDataReducer from '../../../reducers/playerDataReducer';

export const currentUserAction = createReducer(null, {
    [SET_CURRENT_USER_ACTION](state, action) {
        return action.data
    }
});

export const supportedReachedDateRange = createReducer({ fromDate: null, toDate: null }, {});
export const permissions = createReducer({ canEdit: false, showVipPlayer: false, showProblemPlayer: false }, {});

export default combineReducers(Object.assign(
    loaderReducer,
    userGuideReducer,
    filterReducer,
    gridHandlerReducer,
    playerDataReducer,
    { currentUserAction, supportedReachedDateRange, permissions },
));