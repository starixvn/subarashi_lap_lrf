import createReducer from '../../../../lib/createReducer.js';
import { SET_ACCOUNT_PROFILE, SET_BANK_INFO, SET_ACTIVITY_RECORD } from '../actions/types.js';

export const accountProfile = createReducer(null, {
    [SET_ACCOUNT_PROFILE](prevState, action) {
        return action.data && {...action.data };
    }
})

export const bankInfo = createReducer(null, {
    [SET_BANK_INFO](prevState, action) {
        return action.data && {...action.data };
    }
})

export const activityRecord = createReducer(null, {
    [SET_ACTIVITY_RECORD](prevState, action) {
        return action.data && {...action.data };
    }
})