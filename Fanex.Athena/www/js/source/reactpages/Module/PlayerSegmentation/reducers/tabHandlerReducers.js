import createReducer from '@jsroot/lib/createReducer.js'
import { SET_SELECTED_TAB } from '../actions/types.js'

export const selectedTab = createReducer(null, {
    [SET_SELECTED_TAB](prevState, action) {
        return action.data && {...action.data };
    }
})