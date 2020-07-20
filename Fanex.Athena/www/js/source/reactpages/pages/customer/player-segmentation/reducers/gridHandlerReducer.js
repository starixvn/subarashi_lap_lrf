
import createReducer from '@jsroot/lib/createReducer.js'
import { SET_SWEET_ALERT_OPTION, SET_PAGING_OPTION, SET_SELECTED_PLAYER } from '../actions/types.js'

export const sweetAlertOption = createReducer(null, {
    [SET_SWEET_ALERT_OPTION](prevState, action) {
        return action.data && {...action.data };
    }
})

export const pagingOption = createReducer(null, {
    [SET_PAGING_OPTION](prevState, action) {
        return action.data && {...action.data };
    }
})

export const selectedPlayer = createReducer(null, {
    [SET_SELECTED_PLAYER](prevState, action) {
        return action.data;
    }
})

