import createReducer from '../../../../lib/createReducer.js'
import { SET_SELECTED_PLAYER, SET_SELECTED_PLAYERID_LIST } from '../actions/types.js'

export const selectedPlayer = createReducer(null, {
    [SET_SELECTED_PLAYER](preState, action) {
        return action.data && {...action.data };
    }
})

export const selectedPlayerIdList = createReducer([], {
    [SET_SELECTED_PLAYERID_LIST](preState, action) {
        return [...action.data];
    }
})