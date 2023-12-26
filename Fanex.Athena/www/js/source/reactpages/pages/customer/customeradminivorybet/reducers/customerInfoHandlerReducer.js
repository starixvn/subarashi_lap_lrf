import createReducer from '@jsroot/lib/createReducer.js';
import { SET_USERINFO } from '../actions/types.js';

export const userInfo = createReducer({}, {
    [SET_USERINFO](preState, action) {
        return {...action.data};
    }
})
