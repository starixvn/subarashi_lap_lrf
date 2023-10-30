import createReducer from '@jsroot/lib/createReducer.js';
import { SET_USERNAME, SET_SUBMITTED } from '../actions/types.js';

export const username = createReducer('', {
    [SET_USERNAME](preState, action) {
        return action.data;
    }
})


export const isSubmitted = createReducer(false, {
    [SET_SUBMITTED](preState, action) {
        return action.data;
    }
})
